import Clients from "@/components/landing/clients";
import Features from "@/components/landing/features";
import Testimonials from "@/components/landing/testimonials";
import CallToAction from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";

import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <Clients />
      <SphereMask />
      <Features />
      {/* <Stats /> */}
      <Testimonials />
      <CallToAction />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
