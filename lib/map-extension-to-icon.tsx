import { IconArtboard, IconBrandCss3, IconBrandHtml5, IconBrandJavascript, IconBrandReact, IconBrandRust, IconBrandTypescript, IconFile, IconJson, IconMarkdown, IconSettings } from "@tabler/icons-react";
import { cn } from "./utils";

export function mapExtensionToIcon(extension: string) {
  switch (extension) {
    case "js":
      return <IconBrandJavascript className={`w-3 h-3 !text-yellow-400`} />;
    case "ts":
      return <IconBrandTypescript className={`w-3 h-3 !text-blue-600`} />;
    case "jsx":
      return <IconBrandReact className={`w-3 h-3 !text-cyan-600`} />;
    case "tsx":
      return <IconBrandReact className={`w-3 h-3 !text-cyan-600`} />;
    case "json":
      return <IconJson className={`w-3 h-3 !text-yellow-400`} />;
    case "css":
      return <IconBrandCss3 className={`w-3 h-3 !text-purple-600`} />;
    case "html":
      return <IconBrandHtml5 className={`w-3 h-3 !text-red-600`} />;
    case "md":
      return <IconMarkdown className={`w-3 h-3 text-zinc-600`} />;
    case "rs":
      return <IconBrandRust className={`w-3 h-3 text-orange-600`} />;
    case "toml":
      return <IconSettings className={`w-3 h-3 text-zinc-600`} />;
    case "png":
      return <IconArtboard className={`w-3 h-3 text-zinc-600`} />;
    case "jpg":
      return <IconArtboard className={`w-3 h-3 text-zinc-600`} />;
    case "jpeg":
      return <IconArtboard className={`w-3 h-3 text-zinc-600`} />;
    case "gif":
      return <IconArtboard className={`w-3 h-3 text-zinc-600`} />;
    case "svg":
      return <IconArtboard className={`w-3 h-3 text-zinc-600`} />;
    default:
      return <IconFile className={`w-3 h-3 text-zinc-600`} />;
  }
}

export function getColorForExtension(extension: string) {
  const lowercaseExtension = extension.toLowerCase().trim();
  switch (lowercaseExtension) {
    case "js":
      return "text-yellow-400";
    case "ts":
      return "text-blue-600";
    case "jsx":
      return "text-cyan-600";
    case "tsx":
      return "text-cyan-600";
    case "json":
      return "text-yellow-400";
    case "css":
      return "text-purple-600";
    case "html":
      return "text-orange-500";
    case "md":
      return "text-zinc-600";
    case "rs":
      return "text-red-600";
    case "png":
      return "text-zinc-600";
    case "jpg":
      return "text-zinc-600";
    case "jpeg":
      return "text-zinc-600";
    case "gif":
      return "text-zinc-600";
    case "svg":
      return "text-zinc-600";
    default:
      return "text-zinc-600";
  }
}
