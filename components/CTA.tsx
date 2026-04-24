import React from 'react'
import { Button } from './ui/button'

export default function CTA({
    text,
    mobile,
    compact,
}: {
    text: string;
    mobile?: boolean;
    compact?: boolean;
}) {
    const visibility = mobile
        ? "inline-flex w-full"
        : compact
            ? "inline-flex"
            : "hidden md:inline-flex";
    const sizing = compact ? "px-4 py-5 text-sm" : "p-6 text-base";

    return (
        <Button className={`rounded-full bg-primary ${sizing} capitalize font-medium text-white transition-transform duration-160 ease-out hover:bg-gold active:scale-[0.97] tracking-tighter ${visibility}`}>
            {text}
        </Button>
    )
}
