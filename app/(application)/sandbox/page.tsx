"use client"
import SiteEditor from "@/components/site-editor";
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
