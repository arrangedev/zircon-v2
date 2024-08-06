import HomeBanner from "@/components/home/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Zircon",
  description:
    "Find courses, challenges, and resources to help you start building on Solana.",
};

export default async function Page() {
  return (
    <div className="p-12">
      <HomeBanner />
    </div>
  );
}
