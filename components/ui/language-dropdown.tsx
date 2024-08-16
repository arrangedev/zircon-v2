import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ANCHOR_FILES, DEFAULT_FILES, REACT_FILES } from "@/lib/default-files";
import { useSimpleEditor } from "@/lib/hooks/useEditor";
import {
  IconAnchor,
  IconAssembly,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
} from "@tabler/icons-react";
import { EditorDocument } from "@tutorialkit/components-react/core";
import { Dispatch, SetStateAction, useEffect } from "react";
import { set } from "react-hook-form";

interface LanguageDropdownProps {
  setDocuments: (documents: Record<string, EditorDocument>) => void;
}

export function LanguageDropdown({ setDocuments }: LanguageDropdownProps) {
  const { changeDocuments, setPreset } = useSimpleEditor();
  async function onValueChange(value: string) {
    if (value === "node") {
      setPreset("node");
      setDocuments(DEFAULT_FILES);
      await changeDocuments(DEFAULT_FILES);
    } else if (value === "anchor") {
      setPreset("anchor");
      setDocuments(ANCHOR_FILES);
      await changeDocuments(DEFAULT_FILES);
    } else if (value === "react") {
      setPreset("react");
      setDocuments(REACT_FILES);
      await changeDocuments(DEFAULT_FILES);
    }
  }

  return (
    <Select
      onValueChange={async (value) => await onValueChange(value)}
      defaultValue="node"
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select preset" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="node">
          <div className="flex items-center gap-2">
            <IconBrandNodejs stroke={1} className="w-4 h-4 text-green-500" />
            Node.js
          </div>
        </SelectItem>
        <SelectItem value="react">
          <div className="flex items-center gap-2">
            <IconBrandReact stroke={1} className="w-4 h-4 text-cyan-500" />
            React
          </div>
        </SelectItem>
        <SelectItem value="anchor">
          <div className="flex items-center gap-2">
            <IconAnchor stroke={1} className="w-4 h-4 text-blue-500" />
            Anchor
          </div>
        </SelectItem>
        <SelectItem value="python">
          <div className="flex items-center gap-2">
            <IconAssembly stroke={1} className="w-4 h-4 text-orange-500" />
            Assembly (eBPF)
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
