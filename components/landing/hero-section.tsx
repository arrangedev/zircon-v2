"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import TextShimmer from "@/components/magicui/text-shimmer";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';

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
      <a 
        className="backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0"
        href="https://x.com/zirconwtf"
        target="_blank"
        rel="noreferrer noopener"
      >
        <TextShimmer className="inline-flex items-center justify-center">
          <span className="text-white/70">Follow us on</span>{" "}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" className="w-[15px] ml-0.5"><g fill="#bbbbbb" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M6.91992,6l14.2168,20.72656l-14.9082,17.27344h3.17773l13.13867,-15.22266l10.44141,15.22266h10.01367l-14.87695,-21.6875l14.08008,-16.3125h-3.17578l-12.31055,14.26172l-9.7832,-14.26172z"></path></g></g></svg>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </a>
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Level up your
        <br className="hidden md:block" /> Solana dev skills.
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Challenges, in-depth courses, and a weekly newsletter to
        <br className="hidden md:block" /> help you become the best Solana developer possible.
      </p>
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
          onClick={handleNewsletterSignup}
        >
          <span className="block sm:hidden">Newsletter</span>
          <span className="hidden sm:block">Join the newsletter</span>
          <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </Button>
      </div>
      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${inView ? "before:animate-image-glow" : ""
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
