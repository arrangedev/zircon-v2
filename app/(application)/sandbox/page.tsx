"use client";
import SiteEditor from "@/components/site-editor";
import { LanguageDropdown } from "@/components/language-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconCode, IconHelpCircle, IconSandbox } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const DynamicSiteEditor = dynamic(() => import("@/components/site-editor"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <DynamicSiteEditor />
    </>
  );
}
