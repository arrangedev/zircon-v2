import ChallengesBanner from "@/components/challenges/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges | Zircon",
  description:
    "Test your skills and asset yourself among the upper-echelon of the Solana developer community.",
};

export default async function Page() {
  return (
    <div className="">
      <ChallengesBanner />
      <section className="p-12"></section>
    </div>
  );
}
