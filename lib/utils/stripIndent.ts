import { minIndent } from "./minIndent";

export function stripIndent(string: string) {
  const indent = minIndent(string.slice(1));

  if (indent === 0) {
    return string;
  }

  const regex = new RegExp(`^[ \\t]{${indent}}`, "gm");

  return string.replace(regex, "").trim();
}
