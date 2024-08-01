"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconCodeDots,
  IconCommand,
  IconDashboard,
  IconSandbox,
  IconSchool,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { usePathname } from "next/navigation";

export default function SiteAside({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    {
      label: "Home",
      href: "/home",
      icon: (
        <IconDashboard
          stroke={1}
          className={`text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Challenges",
      href: "/challenges",
      icon: (
        <IconCodeDots
          stroke={1}
          className={`text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Learn",
      href: "/learn",
      icon: (
        <IconSchool
          stroke={1}
          className={`text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Sandbox",
      href: "/sandbox",
      icon: (
        <IconSandbox
          stroke={1}
          className={`text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft
          stroke={1}
          className={`text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-black w-full flex-1 min-h-screen mx-auto overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 h-screen">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink className={`font-neue p-1 rounded-md ${pathname === link.href ? "bg-[#FF25CF]/25" : "hover:bg-[#FF25CF]/10"}`} key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              className=""
              link={{
                label: "Joey Meere",
                href: "#",
                icon: (
                  <Image
                    src="/knux.jpeg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src="./zircon-logo.svg"
        className="h-6"
      />
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src="./zircon-icon.svg" className="h-5 w-6 flex-shrink-0" />
    </Link>
  );
};
