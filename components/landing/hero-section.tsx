"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import TextShimmer from "@/components/magicui/text-shimmer";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [isSending, setIsSending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleNewsletterSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      setIsSending(false);
      return;
    }

    const url = "/api/newsletter";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        toast.success("Successfully signed up!");
      } else {
        toast.error(result.error || "An error occurred. Try again later.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Request failed.");
    } finally {
      setIsSending(false);
      setEmail("");
    }
  };

  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0">
        <TextShimmer className="inline-flex items-center justify-center">
          <span>💎 Introducing Zircon Challenges</span>{" "}
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Zircon is the dojo
        <br className="hidden md:block" /> for Solana developers.
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Challenges, guided courses, and general resources to help you become
        <br className="hidden md:block" /> the best Solana developer possible.
      </p>
      {process.env.NEXT_PUBLIC_LAUNCH_READY === "true" ? (
        <div
        className="flex gap-2 items-center justify-center ring-2 ring-white/20 h-14 px-1 rounded-lg max-w-md mx-auto translate-y-[-1rem] animate-fade-in opacity-0 ease-in-out [--animation-delay:600ms]"
      >
        <input
          className="w-full h-full rounded-lg bg-transparent focus:outline-none ring-none border-none pl-1"
          placeholder="Enter your email"
          type="emal"
          name="email"
          id="email"
          autoComplete="email"
          required
          onChange={event => setEmail(event.target.value)}
        />
        <Button
          className="rounded-lg mr-1 text-white dark:text-black"
          color="splendor"
          type="submit"
          disabled={isSending}
          // loading={isSending}
          //@ts-ignore
          onClick={handleNewsletterSignup}
        >
          <span className="block sm:hidden">Newsletter</span>
          <span className="hidden sm:block">Join the newsletter</span>
          <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </Button>
      </div>
      ) : (
      <div className="flex gap-2 items-center justify-center">
        <Link href="/home">
          <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg bg-stone-700 text-white hover:bg-stone-500  opacity-0 ease-in-out [--animation-delay:600ms]">
            <span>Get started</span>
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white dark:text-black opacity-0 ease-in-out [--animation-delay:600ms]">
            <span>Sign up for free </span>
            <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      )}
      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${
            inView ? "before:animate-image-glow" : ""
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <img
            src="/hero-dark.png"
            alt="Hero Image"
            className="hidden relative w-full h-full rounded-[inherit] border object-contain dark:block"
          />
          <img
            src="/hero-light.png"
            alt="Hero Image"
            className="block relative w-full h-full  rounded-[inherit] border object-contain dark:hidden"
          />
        </div>
      </div>
    </section>
  );
}
