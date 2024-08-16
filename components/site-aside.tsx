"use client";
import React, { useEffect, useState } from "react";
import {
  IconCodeDots,
  IconDashboard,
  IconLogout,
  IconSandbox,
  IconSchool,
  IconTree,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/client";
import { getRandomAvatar } from "@/lib/get-random-avatar";
import { logout } from "@/app/(auth)/login/actions";

export default function SiteAside({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      console.log(user, user.user?.user_metadata.email);
      setUser(user.user);
    };

    getUser();
  }, []);

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
      label: "Skill Trees",
      href: "/skill-trees",
      icon: (
        <IconTree
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
                <SidebarLink
                  className={`font-neue p-1 rounded-md ${
                    pathname === link.href
                      ? "bg-[#FF25CF]/25"
                      : "hover:bg-[#FF25CF]/10"
                  }`}
                  key={idx}
                  link={link}
                />
              ))}
            </div>
          </div>
          {user ? (
            <div className="flex gap-2 items-center justify-between">
              <SidebarLink
                className=""
                link={{
                  label: user.user_metadata.user_name
                    ? user.user_metadata.user_name
                    : user?.user_metadata?.email,
                  href: `/profile/${user?.user_metadata?.user_name}`,
                  icon: (
                    <Image
                      src={
                        user.user_metadata.avatar_url
                          ? user.user_metadata.avatar_url
                          : getRandomAvatar(user?.user_metadata?.email)
                      }
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
              <IconLogout
                onClick={() => logout()}
                stroke={1}
                className={`text-zinc-500 hover:text-zinc-200 h-5 w-5 ${
                  !open && "hidden"
                }`}
              />
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-between">
              <SidebarLink
                className=""
                link={{
                  label: "Log in",
                  href: "/login",
                  icon: (
                    <IconUserCircle
                      stroke={1}
                      className="h-7 w-7 flex-shrink-0"
                    />
                  ),
                }}
              />
            </div>
          )}
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
      <motion.img src={`/zircon-logo.svg`} className="h-6" />
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src={`/zircon-icon.svg`} className="h-5 w-6 flex-shrink-0" />
    </Link>
  );
};
