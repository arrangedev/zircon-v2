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
  IconHelpCircleFilled,
  IconSandbox,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LanguageDropdown } from "./language-dropdown";
import { mapExtensionToLang } from "@/lib/map-extension-to-lang";
import { parseFileExtension } from "@/lib/parse-file-extension";
import { CommandMenu } from "./command-palette";

export default function SiteEditor() {
  const {
    changeDocuments,
    document,
    files,
    onChange,
    onScroll,
    selectedFile,
    setSelectedFile,
  } = useSimpleEditor();

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
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconSandbox className="h-6 w-6 text-[#FF25CF]/75" />
            <h1 className="text-xl font-semibold bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-transparent">
              Sandbox
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconHelpCircleFilled className="h-3 w-3 text-zinc-500" />
                </TooltipTrigger>
                <TooltipContent className="w-36 bg-black text-zinc-500">
                  <p>
                    Build with Solana, run it in browser, and share it with the
                    world.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="">
            <LanguageDropdown setDocuments={changeDocuments} />
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full border border-[var(--border)]/25"
        >
          <ResizablePanel defaultSize={20}>
            <div className="flex gap-2 items-center justify-end border-b border-[var(--border)]/25 p-1">
              <IconFilePlus
                stroke={1}
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
              <ResizablePanel defaultSize={70}>
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
              <ResizablePanel defaultSize={30}>
                <div className="w-1/2 h-full p-2">
                  <BaseTerminal />
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
