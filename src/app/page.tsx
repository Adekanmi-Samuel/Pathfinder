import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { ProblemStatement } from "@/components/landing/ProblemStatement";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SampleRoadmap } from "@/components/landing/SampleRoadmap";
import { Pricing } from "@/components/landing/Pricing";
import { ClosingCTA } from "@/components/landing/ClosingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <HowItWorks />
        <SampleRoadmap />
        <Pricing />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
