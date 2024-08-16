"use client";

import { motion } from "framer-motion";
import { ShootingStars } from "../ui/shooting-stars";
import { StarsBackground } from "../ui/stars-background";

export default function SkillTreesBanner() {
  return (
    <section id="hero" className="relative bg-neutral-900 p-14">
      <div className="flex gap-6 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0.5, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-5xl leading-normal font-medium bg-clip-text text-transparent bg-gradient-to-br from-neutral-400 via-white to-white"
          >
            🌴 Skill Trees
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.5, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-2 text-zinc-100 font-light"
          >
            The skills you need to be a Solana developer in any vertical.
          </motion.p>
        </div>
      </div>
      <ShootingStars />
      <StarsBackground />
    </section>
  );
}
