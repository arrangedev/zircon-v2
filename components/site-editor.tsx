"use client"
import { useSimpleEditor } from "@/lib/hooks/useEditor";
import { CodeMirrorEditor, FileTree } from "@tutorialkit/components-react/core";
import dynamic from "next/dynamic";
import { Suspense, lazy, useEffect, useState } from "react";

const Terminal = lazy(() => import('@tutorialkit/components-react/core/Terminal'));

export default function SiteEditor() {
  const [domLoaded, setDomLoaded] = useState(false);
  const {
    setTerminal,
    previewSrc,
    document,
    files,
    onChange,
    onScroll,
    selectedFile,
    setSelectedFile,
  } = useSimpleEditor();

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="mt-4 h-screen flex flex-col overflow-hidden">
      <div className="flex h-1/2">
        <FileTree
          className="w-1/4 flex-shrink-0 text-sm"
          files={files}
          hideRoot
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
        />
        <div className="w-px flex-shrink-0 h-full bg-[var(--ec-brdCol)]" />
        <div className="flex-grow h-full max-w-[calc(75%-1px)] relative bg-[var(--cm-backgroundColor)]">
          <CodeMirrorEditor
            theme={`dark`}
            doc={document}
            onChange={onChange}
            onScroll={onScroll}
            className="h-full text-[13px]"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--cm-backgroundColor)]" />
        </div>
      </div>
      <div className="h-px bg-[var(--ec-brdCol)]" />
      <div className="flex p-0 m-0 h-1/2">
        <div className="w-1/2 h-full">
        {domLoaded && (
            <Suspense>
              <Terminal className="h-full" readonly={false} theme={`dark`} onTerminalReady={setTerminal} />
            </Suspense>
          )}
        </div>
        <div className="w-px flex-shrink-0 h-full bg-[var(--ec-brdCol)]" />
        <div className="w-1/2 h-full">
          <iframe
            className="bg-white border-none w-full h-full"
            src={previewSrc}
          />
        </div>
      </div>
    </div>
  );
}
