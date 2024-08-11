import { IconHelpCircleFilled, IconSandbox } from "@tabler/icons-react";
import { LanguageDropdown } from "../ui/language-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { EditorDocument } from "@tutorialkit/components-react/core";

interface SandboxEditorHeaderProps {
  changeDocuments: (documents: Record<string, EditorDocument>) => void;
}

export default function SandboxEditorHeader({
  changeDocuments,
}: SandboxEditorHeaderProps) {
  return (
    <div className="p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-transparent">
          🏝 Sandbox
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
  );
}
