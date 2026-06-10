"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import TickerLabel from "./TickerLabel";
import type { Stock } from "./types";
import { sentimentOf } from "./types";

const RADIUS = 2;
const ICO_DETAIL = 3;

const COLOR_UP = new THREE.Color("#3ddc84");
const COLOR_DOWN = new THREE.Color("#ff4d4d");
const COLOR_FLAT = new THREE.Color("#A0AEC0");
const CORE_COLOR = new THREE.Color("#2F80ED");

type NodeDatum = {
  stock: Stock;
  position: THREE.Vector3;
};

type Props = {
  stocks: Stock[];
  interactive: boolean;
  paused: boolean;
  reducedMotion: boolean;
  hoveredTicker: string | null;
  selectedTicker: string | null;
  onHover: (stock: Stock | null, screenPos: { x: number; y: number } | null) => void;
  onSelect: (stock: Stock) => void;
};

function sentimentColor(stock: Stock): THREE.Color {
  const s = sentimentOf(stock);
  if (s === "up") return COLOR_UP;
  if (s === "down") return COLOR_DOWN;
  return COLOR_FLAT;
}

export default function GlobeMesh({
  stocks,
  interactive,
  paused,
  reducedMotion,
  hoveredTicker,
  selectedTicker,
  onHover,
  onSelect,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const nodeRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const { gl } = useThree();

  // ── Deduped icosphere geometry (unique vertices + triangle index) ────────
  const dedupedGeometry = useMemo(() => {
    const raw = new THREE.IcosahedronGeometry(RADIUS, ICO_DETAIL);
    return mergeVertices(raw, 1e-4);
  }, []);

  // ── Unique-vertex array as Vector3[] for math + node placement ───────────
  const uniqueVerts = useMemo<THREE.Vector3[]>(() => {
    const pos = dedupedGeometry.getAttribute("position") as THREE.BufferAttribute;
    const out: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      out.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
    }
    return out;
  }, [dedupedGeometry]);

  // ── Node positions: stride through deduped verts for an even spread ──────
  const nodes = useMemo<NodeDatum[]>(() => {
    if (uniqueVerts.length === 0 || stocks.length === 0) return [];
    const stride = Math.max(1, Math.floor(uniqueVerts.length / stocks.length));
    return stocks.map((stock, i) => ({
      stock,
      position: uniqueVerts[(i * stride) % uniqueVerts.length].clone(),
    }));
  }, [uniqueVerts, stocks]);

  // ── Manual wireframe build with sentiment-tinted vertex colors ───────────
  // WireframeGeometry strips custom attributes, so we build edges by walking
  // the triangle index and inverse-distance-weighting each endpoint's color
  // against the 3 nearest labeled stock nodes.
  const edgeGeometry = useMemo(() => {
    const index = dedupedGeometry.getIndex();
    if (!index || nodes.length === 0) return new THREE.BufferGeometry();

    const idx = index.array;
    const edgeSet = new Set<string>();
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < idx.length; i += 3) {
      const a = idx[i], b = idx[i + 1], c = idx[i + 2];
      for (const [u, v] of [[a, b], [b, c], [c, a]] as [number, number][]) {
        const key = u < v ? `${u}_${v}` : `${v}_${u}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([u, v]);
        }
      }
    }

    const positions = new Float32Array(edges.length * 2 * 3);
    const colors = new Float32Array(edges.length * 2 * 3);

    const vertColorCache = new Map<number, THREE.Color>();
    const colorForVertex = (vIdx: number): THREE.Color => {
      const cached = vertColorCache.get(vIdx);
      if (cached) return cached;
      const v = uniqueVerts[vIdx];
      const ranked = nodes
        .map((n) => ({ n, d: n.position.distanceTo(v) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 3);
      let r = 0, g = 0, b = 0, wSum = 0;
      for (const { n, d } of ranked) {
        const w = 1 / (d * d + 0.05);
        const c = sentimentColor(n.stock);
        r += c.r * w;
        g += c.g * w;
        b += c.b * w;
        wSum += w;
      }
      const out = new THREE.Color(r / wSum, g / wSum, b / wSum);
      vertColorCache.set(vIdx, out);
      return out;
    };

    edges.forEach(([u, v], i) => {
      const pu = uniqueVerts[u], pv = uniqueVerts[v];
      const cu = colorForVertex(u), cv = colorForVertex(v);
      const o = i * 6;
      positions[o + 0] = pu.x; positions[o + 1] = pu.y; positions[o + 2] = pu.z;
      positions[o + 3] = pv.x; positions[o + 4] = pv.y; positions[o + 5] = pv.z;
      colors[o + 0] = cu.r; colors[o + 1] = cu.g; colors[o + 2] = cu.b;
      colors[o + 3] = cv.r; colors[o + 4] = cv.g; colors[o + 5] = cv.b;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [dedupedGeometry, nodes, uniqueVerts]);

  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      }),
    [],
  );

  // Shared node sphere geometry - 25 nodes is small, plain meshes are fine.
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.05, 16, 16), []);
  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.55, 2), []);

  // Note: we intentionally do NOT add a manual dispose effect here.
  // In React Strict Mode (Next.js dev), the cleanup fires during the simulated
  // unmount/remount cycle and disposes geometries that get re-attached on the
  // next mount, causing the globe to flash and then vanish. R3F + three.js
  // dispose attached resources automatically when the Canvas tears down.

  // ── Frame loop: rotation, breathing pulse, hover scale lerp ──────────────
  const elapsedRef = useRef(0);
  useFrame((_, dt) => {
    if (groupRef.current && !paused) {
      // Auto-rotate even with prefers-reduced-motion (slow continuous rotation,
      // not a flicker/flash) - only the breathing pulse is gated below.
      const speed = reducedMotion ? 0.04 : 0.14;
      groupRef.current.rotation.y += dt * speed;
      groupRef.current.rotation.x = Math.sin(elapsedRef.current * 0.15) * 0.05;
    }
    elapsedRef.current += dt;

    if (coreMatRef.current && !reducedMotion) {
      coreMatRef.current.emissiveIntensity =
        0.85 + Math.sin(elapsedRef.current * 1.4) * 0.25;
    }

    nodeRefs.current.forEach((mesh, ticker) => {
      const isHover = ticker === hoveredTicker;
      const isSelected = ticker === selectedTicker;
      const target = isHover || isSelected ? 1.6 : 1;
      mesh.scale.lerp(new THREE.Vector3(target, target, target), 0.18);
    });
  });

  const handlePointerOver = (stock: Stock) => (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    gl.domElement.style.cursor = "pointer";
    onHover(stock, { x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (stock: Stock) => (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    onHover(stock, { x: e.clientX, y: e.clientY });
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    gl.domElement.style.cursor = "auto";
    onHover(null, null);
  };

  const handleClick = (stock: Stock) => (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    onSelect(stock);
  };

  return (
    <group ref={groupRef}>
      {/* Core glow - Bloom picks this up for the central light */}
      <mesh geometry={coreGeometry}>
        <meshStandardMaterial
          ref={coreMatRef}
          color={CORE_COLOR}
          emissive={CORE_COLOR}
          emissiveIntensity={1.1}
          transparent
          opacity={0.32}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Wireframe edges - single LineSegments, per-vertex sentiment color */}
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} />

      {/* Node spheres at each labeled vertex */}
      {nodes.map(({ stock, position }) => {
        const color = sentimentColor(stock);
        return (
          <mesh
            key={stock.ticker}
            ref={(m) => {
              if (m) nodeRefs.current.set(stock.ticker, m);
              else nodeRefs.current.delete(stock.ticker);
            }}
            position={position}
            geometry={nodeGeometry}
            onPointerOver={handlePointerOver(stock)}
            onPointerMove={handlePointerMove(stock)}
            onPointerOut={handlePointerOut}
            onClick={handleClick(stock)}
          >
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {/* Floating ticker labels - render in both modes so the hero shows
          ticker symbols and prices just like the /globe page */}
      {nodes.map(({ stock, position }) => (
        <TickerLabel key={`label-${stock.ticker}`} stock={stock} position={position} />
      ))}
    </group>
  );
}
