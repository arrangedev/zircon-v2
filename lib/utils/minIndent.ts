export function minIndent(string: string) {
  const match = string.match(/^[ \t]*(?=\S)/gm);

  if (!match) {
    return 0;
  }

  return match.reduce((acc, curr) => Math.min(acc, curr.length), Infinity);
}
