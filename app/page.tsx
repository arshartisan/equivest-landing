import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero";
import RegulationSection from "@/components/sections/regulation";
import LiquidityArchitectureSection from "@/components/sections/liquidity-architecture";
import ExecutionPerformanceSection from "@/components/sections/execution-performance";
import LiquiditySolutionsSection from "@/components/sections/liquidity-solutions";
import ExecutionModelSection from "@/components/sections/execution-model";
import TechnologySection from "@/components/sections/technology";
import PlatformsSection from "@/components/sections/platforms";
import WhyEquivestSection from "@/components/sections/why-equivest";
import OnboardingSection from "@/components/sections/onboarding";
import FinalCtaSection from "@/components/sections/final-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <HeroSection />
        <RegulationSection />
        <LiquidityArchitectureSection />
        <ExecutionPerformanceSection />
        <LiquiditySolutionsSection />
        <ExecutionModelSection />
        <TechnologySection />
        <PlatformsSection />
        <WhyEquivestSection />
        <OnboardingSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
