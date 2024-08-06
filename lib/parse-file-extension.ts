export function parseFileExtension(filePath: string) {
  const segments = filePath.split(".");
  const fileName = segments.at(-1);
  const extension = fileName?.split(".").at(-1);

  return extension;
}