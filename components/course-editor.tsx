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
import { IconHelpCircleFilled } from "@tabler/icons-react";
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
import { useCourse } from "@/lib/hooks/useCourse";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/courses";

interface CourseEditorProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  course: Course;
}

export default function CourseEditor({
  progress,
  setProgress,
  step,
  setStep,
  course,
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
    setTerminal,
  } = useCourse({
    initialDocuments: course.initialCode,
    installOnStartup: course.installOnStartup,
  });

  useEffect(() => {
    const getMd = async () => {
      const response = await fetch(`/sample-course/intro-${step + 1}.md`);
      const data = await response.text();
      setContent(await marked(data));
    };
    getMd();
  }, [step]);

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
            {course.icon}
            <h1 className="text-xl font-semibold bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-transparent">
              {course.title}
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
            <CourseProgress progress={((step + 1) / course.maxSteps) * 100} />
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full border-r border-t border-b border-[var(--border)]/25 max-h-[calc(100vh-4.1rem)]"
        >
          <ResizablePanel defaultSize={40} minSize={25} className="relative h-full">
            <div className="h-full p-2 overflow-y-scroll">
              {content && (
                <div className="flex-grow overflow-y-auto">
                <motion.article
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "fadeInOut",
                  }}
                  className="prose prose-zinc lg:prose-lg dark:prose-headings:text-zinc-100 prose-h1:text-3xl prose-h2:text-2xl prose-p:text-zinc-300 dark:prose-p:font-regular prose-li:text-zinc-300 prose-ol:text-zinc-300 prose-a:text-pink-400 prose-code:text-pink-400"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                </div>
              )}
              <div className="flex items-center justify-between mt-6 px-1 z-50">
                <button
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "text-sm"
                  )}
                  onClick={() =>
                    setStep((prev) => {
                      if (prev <= 0) {
                        return 0;
                      } else {
                        return prev - 1;
                      }
                    })
                  }
                >
                  Prev
                </button>
                <button
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "text-sm"
                  )}
                  onClick={() =>
                    setStep((prev) => {
                      if (prev >= course.maxSteps - 1) {
                        return course.maxSteps - 1;
                      } else {
                        return prev + 1;
                      }
                    })
                  }
                >
                  Next
                </button>
              </div>
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
                    <BaseTerminal setTerminal={setTerminal} />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="relative w-full flex items-center justify-between z-50">
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
          <div className="bg-[#FF25CF] text-xs p-1">
            <i>Course</i> Mode
          </div>
        </div>
      </motion.div>
    </>
  );
}
