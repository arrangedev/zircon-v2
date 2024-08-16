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
import { IconFilePlus, IconFolderPlus } from "@tabler/icons-react";
import { mapExtensionToLang } from "@/lib/map-extension-to-lang";
import { parseFileExtension } from "@/lib/parse-file-extension";
import { CommandMenu } from "./ui/command-palette";
import { useState } from "react";
import ModeHeader from "./ui/mode-header";
import BasePreview from "./ui/preview";
import SandboxEditorHeader from "./sandbox/header";

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
    setTerminal,
    preset,
    setPreset,
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
          className="w-full h-full border-r border-t border-b border-[var(--border)]/25 max-h-[calc(100vh-4.75rem)]"
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
                <div className="w-full h-full overflow-y-scroll">
                  <div
                    className={mode === "preview" ? "block h-full" : "hidden"}
                  >
                    <BasePreview previewSrc={previewSrc} />
                  </div>
                  <div
                    className={
                      mode === "terminal" ? "block p-2 h-[60%]" : "hidden"
                    }
                  >
                    <BaseTerminal setTerminal={setTerminal} />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="relative w-full flex items-center justify-between z-50">
          {document && (
            <div className="flex items-center justify-between gap-2 p-1">
              <p className="text-xs font-regular text-white">
                {mapExtensionToLang(
                  parseFileExtension(document.filePath as string) as string
                )}
              </p>
              <p className="text-xs font-light italic text-white">
                .{document.filePath}
              </p>
            </div>
          )}
          <div className="bg-orange-600 text-xs p-1">
            <i>Sandbox</i> Mode
          </div>
        </div>
      </motion.div>
    </>
  );
}
