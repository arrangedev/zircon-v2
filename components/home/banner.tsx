"use client";

import { motion } from "framer-motion";

export default function HomeBanner() {
  return (
    <section
      id="hero"
      className="relative px-6 md:px-8"
    >
      <motion.h1
        initial={{ opacity: 0.5, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-5xl font-medium"
      >
        Home
      </motion.h1>
    </section>
  );
}
