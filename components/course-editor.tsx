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
  IconCurrencySolana,
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
import { mapExtensionToLang } from "@/lib/map-extension-to-lang";
import { parseFileExtension } from "@/lib/parse-file-extension";
import { CommandMenu } from "./ui/command-palette";
import { useEffect, useState } from "react";
import ModeHeader from "./ui/mode-header";
import BasePreview from "./ui/preview";
import { CourseProgress } from "./ui/course-progress";
import { marked } from "marked";

interface CourseEditorProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function CourseEditor({
  progress,
  setProgress,
}: CourseEditorProps) {
  const [content, setContent] = useState<any>("");
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

  useEffect(() => {
    const getMd = async () => {
      const response = await fetch("/intro.md");
      const data = await response.text();
      setContent(await marked(data));
    };
    getMd();
  }, []);

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
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCurrencySolana className="h-6 w-6 text-[#FF25CF]/75" />
            <h1 className="text-xl font-semibold bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-transparent">
              Sample Course
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconHelpCircleFilled className="h-3 w-3 text-zinc-500" />
                </TooltipTrigger>
                <TooltipContent className="w-36 bg-black text-zinc-300">
                  <p>
                    Let's build a simple Solana app in 15 minutes using
                    Typescript & React!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-48">
            <CourseProgress progress={progress} setProgress={setProgress} />
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full border border-[var(--border)]/25"
        >
          <ResizablePanel defaultSize={40} minSize={25}>
            <div className="flex-grow h-full relative p-2">
              {content && (
                <article
                  className="prose prose-zinc lg:prose-lg dark:prose-headings:text-zinc-100 prose-h1:text-2xl prose-h2:text-xl prose-p:text-zinc-300 dark:prose-p:font-light prose-li:text-zinc-300 prose-ol:text-zinc-300 prose-a:text-pink-400 prose-code:text-pink-400"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60} minSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={30}>
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={20}>
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
                    <div className="flex-grow h-full relative">
                      <BaseEditor
                        doc={document}
                        onChange={onChange}
                        onScroll={onScroll}
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4" />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40} minSize={30}>
                <ModeHeader mode={mode} onModeChange={onModeChange} />
                <div className="w-full h-64">
                  <div
                    className={mode === "preview" ? "block h-full" : "hidden"}
                  >
                    <BasePreview previewSrc={previewSrc} />
                  </div>
                  <div
                    className={
                      mode === "terminal" ? "block p-2 h-full" : "hidden"
                    }
                  >
                    <BaseTerminal />
                  </div>
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
