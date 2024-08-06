import { IconEye, IconSquareToggle, IconTerminal } from "@tabler/icons-react";

interface ModeHeaderProps {
  mode: "preview" | "terminal";
  onModeChange: () => void;
}

export default function ModeHeader({ mode, onModeChange }: ModeHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)]/25 p-1">
      <div className="flex items-center gap-2">
        {mode === "preview" ? (
          <IconEye stroke={1} className="h-3 w-3" />
        ) : (
          <IconTerminal stroke={1} className="h-3 w-3" />
        )}
        <p className="text-xs">{mode === "preview" ? "Preview" : "Terminal"}</p>
      </div>
      <button
        onClick={() => onModeChange()}
        className="inline-flex gap-2 items-center p-1.5 bg-zinc-700 hover:bg-zinc-500 rounded-md text-xs"
      >
        <IconSquareToggle stroke={1} className="h-3 w-3" />
        Show {mode === "preview" ? "Terminal" : "Preview"}
      </button>
    </div>
  );
}
