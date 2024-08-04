import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { IconNews, IconRun, IconShare } from "@tabler/icons-react";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or select..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem className="flex gap-2 items-center">
            <IconRun stroke={1} className="h-4 w-4" />
            Run
          </CommandItem>
          <CommandItem className="flex gap-2 items-center">
            <IconNews stroke={1} className="h-4 w-4" />
            Format
          </CommandItem>
          <CommandItem className="flex gap-2 items-center">
            <IconShare stroke={1} className="h-4 w-4" />
            Share
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
