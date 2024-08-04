import { Suspense, useEffect, useState } from "react";
import type { Terminal as XTerm } from "@xterm/xterm";
import { useWebContainer } from "@/lib/hooks/useWebContainer";
import dynamic from "next/dynamic";

const Terminal = dynamic(
  () => import("@tutorialkit/components-react/core/Terminal")
);

export default function BaseTerminal() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setTerminal } = useTerminal();

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    domLoaded && (
      <Suspense>
        <Terminal
          className="h-32"
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
    setTerminal,
  };
}
