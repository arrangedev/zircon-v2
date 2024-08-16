import SkillTreeList from "@/components/skill-tree-list";
import SkillTreesBanner from "@/components/skill-trees/banner";
import SkillTreePrimitive from "@/components/ui/primitives/skill-tree";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Trees | Zircon",
  description:
    "Find the skills you need to be a Solana developer in any vertical.",
};

export default async function Page() {
  return (
    <div className="">
      <SkillTreesBanner />
      <section className="p-12">
        <SkillTreeList />
      </section>
    </div>
  );
}
