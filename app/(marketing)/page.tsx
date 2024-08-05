import Client from "@/components/landing/Clients";
import CallToAction from "@/components/landing/CallToAction";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";

import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";

export default async function Page() {
  return (
    <>
      <Hero />
      <Client />
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
