"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Terminal as XTerm } from "@xterm/xterm";
import { useWebContainer } from "@/lib/hooks/useWebContainer";
import dynamic from "next/dynamic";
import { useSimpleEditor } from "@/lib/hooks/useEditor";

const Terminal = dynamic(
  async () =>
    (await import("@tutorialkit/components-react/core/Terminal")).Terminal
);

export default function BaseTerminal({ setTerminal }: { setTerminal: any }) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    domLoaded && (
      <Suspense>
        <Terminal
          className="w-full h-full"
          readonly={false}
          theme={`dark`}
          onTerminalReady={setTerminal}
        />
      </Suspense>
    )
  );
}

function useTerminal() {
  const webcontainerPromise = useWebContainer();
  const [terminal, setTerminal] = useState<XTerm | null>(null);

  useEffect(() => {
    if (!terminal) {
      return;
    }

    run(terminal);

    async function run(terminal: XTerm) {
      const webcontainer = await webcontainerPromise;
      const process = await webcontainer.spawn("jsh", {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
            terminal.write("hello!")
          },
        })
      );

      const shellWriter = process.input.getWriter();

      terminal.onData((data) => {
        shellWriter.write(data);
      });
    }
  }, [terminal]);

  return {
    terminal,
    setTerminal,
  };
}
