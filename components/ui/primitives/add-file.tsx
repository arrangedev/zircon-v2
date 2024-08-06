// Component to add a new file, where th user inputs the name and clicks enter to add the file

import { useState } from "react";
import { IconFilePlus } from "@tabler/icons-react";
import { File, Folder } from "./file-tree-primitive";

interface AddFileProps {
  onFileSelect: (filePath: string) => void;
}

export function AddFile({ onFileSelect }: AddFileProps) {
  const [fileName, setFileName] = useState("");

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onFileSelect(fileName);
      setFileName("");
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (event.relatedTarget === null || event.relatedTarget === undefined) {
      if (fileName) {
        onFileSelect(fileName);
        setFileName("");
      }
    }
  }

  return (
    <div className="flex gap-2 items-center justify-end border-b border-[var(--border)]/25 p-1">
      <IconFilePlus
        stroke={1}
        className="h-5 w-5 text-zinc-500 hover:text-zinc-200"
      />
      <input
        type="text"
        value={fileName}
        onChange={(event) => setFileName(event.target.value)}
        onKeyDown={handleEnter}
        onBlur={handleBlur}
        className="w-full bg-transparent text-zinc-500 outline-none"
      />
    </div>
  );
}