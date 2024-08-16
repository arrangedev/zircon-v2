"use client";

import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from "beautiful-skill-tree";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const theme = {
  border: "1px solid rgb(127,127,127)",
  treeBackgroundColor: "black",
  heading: {
    font: fontSans.variable,
  },
  headingFontSize: "18px",
  nodeBackgroundColor: "#1E1E20",
  nodeActiveBackgroundColor: "#FF25CF",
  nodeHoverBorderColor: `linear-gradient(
        to right,
        #ffffff 0%,
        #ffffff 100%
      )`,
  nodeIconWidth: "5px",
  borderRadius: "5px 5px 5px 5px",
  edgeBorder: "1px solid #71717a",
};

interface SkillTreeProps {
  data: SkillType[];
  title: string;
  id: string;
  description: string;
}

export default function SkillTreePrimitive({ data, title, id, description }: SkillTreeProps) {
  return (
    <SkillProvider>
      <SkillTreeGroup theme={theme}>
        {({ skillCount }: SkillGroupDataType) => (
          <SkillTree
            treeId={id}
            title={title}
            data={data}
            description={description}
            collapsible
          />
        )}
      </SkillTreeGroup>
    </SkillProvider>
  );
}
