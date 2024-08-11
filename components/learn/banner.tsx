"use client";

import { IconSchool } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function LearnBanner() {
  return (
    <section id="hero" className="relative px-6 md:px-8">
      <div className="flex gap-4 items-center">
        <IconSchool stroke={1} className="h-12 w-12" />
        <div>
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
            Learn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.5, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-2 text-zinc-300"
          >
            Start building on Solana with 15min courses.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
