import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Sandbox | Zircon",
  description: "Quickly build and run Solana scripts and programs in the browser.",
};

const DynamicSandboxEditor = dynamic(() => import("@/components/sandbox-editor"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <DynamicSandboxEditor />
    </>
  );
}
