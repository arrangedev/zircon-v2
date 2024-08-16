"use client";

import { programDevTree, frontendDevTree } from "@/lib/tree-data";
import SkillTreePrimitive from "./ui/primitives/skill-tree";

export default function SkillTreeList() {
  const skillTrees = [
    {
      id: "program-dev",
      title: "Program Development",
      description: "Learn to build programs on Solana.",
      data: programDevTree,
    },
    {
      id: "frontend-dev",
      title: "Frontend Development",
      description: "Learn to build frontends on Solana.",
      data: frontendDevTree,
    },
  ];

  return (
    <div className="w-full h-full grid grid-cols-2 max-[1024px]:grid-cols-1">
      {skillTrees.map((skillTree) => (
        <div key={skillTree.id}>
          <SkillTreePrimitive
            data={skillTree.data}
            title={skillTree.title}
            id={skillTree.id}
            description={skillTree.description}
          />
        </div>
      ))}
    </div>
  );
}
