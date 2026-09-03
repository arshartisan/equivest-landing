import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/hero";
import RegulationSection from "@/components/sections/regulation";
import LiquidityArchitectureSection from "@/components/sections/liquidity-architecture";
import LiquiditySolutionsSection from "@/components/sections/liquidity-solutions";
import ExecutionModelSection from "@/components/sections/execution-model";
import LiquidityPartnersSection from "@/components/sections/liquidity-partners";
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
        <LiquidityArchitectureSection />
        <LiquiditySolutionsSection />
        <ExecutionModelSection />
        <LiquidityPartnersSection />
        {/* <TechnologySection /> */}
        {/* <PlatformsSection /> */}
        <WhyEquivestSection />
        <OnboardingSection />
        <RegulationSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
