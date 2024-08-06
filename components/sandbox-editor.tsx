"use client";
import { motion } from "framer-motion";
import BaseEditor from "./ui/editor";
import BaseFileTree from "./ui/file-tree";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import BaseTerminal from "./ui/terminal";
import { useSimpleEditor } from "@/lib/hooks/useEditor";
import {
  IconFilePlus,
  IconFolderPlus,
} from "@tabler/icons-react";
import { mapExtensionToLang } from "@/lib/map-extension-to-lang";
import { parseFileExtension } from "@/lib/parse-file-extension";
import { CommandMenu } from "./ui/command-palette";
import { useState } from "react";
import ModeHeader from "./ui/mode-header";
import BasePreview from "./ui/preview";
import SandboxEditorHeader from "./ui/sandbox/sb-editor-header";

export default function SandboxEditor() {
  const [mode, setMode] = useState<"preview" | "terminal">("terminal");
  const {
    previewSrc,
    changeDocuments,
    document,
    files,
    onChange,
    onScroll,
    selectedFile,
    setSelectedFile,
  } = useSimpleEditor();

  function onModeChange() {
    if (mode === "preview") {
      setMode("terminal");
    } else {
      setMode("preview");
    }
  }

  return (
    <>
      <CommandMenu />
      <motion.div
        initial={{ opacity: 0.5, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="h-full"
      >
        <SandboxEditorHeader changeDocuments={changeDocuments} />
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full border border-[var(--border)]/25"
        >
          <ResizablePanel defaultSize={20}>
            <div className="flex gap-2 items-center justify-end border-b border-[var(--border)]/25 p-1">
              <IconFilePlus
                stroke={1}
                onClick={() => {
                  // Add inject the add-file component in the corresponding location in the file tree
                }}
                className="h-5 w-5 text-zinc-500 hover:text-zinc-200"
              />
              <IconFolderPlus
                stroke={1}
                className="h-5 w-5 text-zinc-500 hover:text-zinc-200"
              />
            </div>
            <div className="flex h-1/2">
              <BaseFileTree
                files={files}
                fileSelected={selectedFile}
                onFileSelect={setSelectedFile}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <div className="flex-grow h-full relative">
                  <BaseEditor
                    doc={document}
                    onChange={onChange}
                    onScroll={onScroll}
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4" />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <ModeHeader mode={mode} onModeChange={onModeChange} />
                <div className="w-full h-48 p-2">
                  {mode === "preview" ? (
                    <BasePreview previewSrc={previewSrc} />
                  ) : (
                    <BaseTerminal />
                  )}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="relative p-1 w-full flex items-center justify-between z-50">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-regular text-white">
              {mapExtensionToLang(
                parseFileExtension(document.filePath as string) as string
              )}
            </p>
            <p className="text-xs font-light italic text-white">
              .{document.filePath}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
