export function mapExtensionToLang(extension: string) {
  switch (extension) {
    case "js":
      return "Javascript";
    case "ts":
      return "Typescript";
    case "jsx":
      return "Javascript (React)";
    case "tsx":
      return "Typescript (React)";
    case "json":
      return "JSON";
    case "css":
      return "CSS";
    case "html":
      return "HTML";
    case "md":
      return "Markdown";
    case "rs":
      return "Rust";
    case "png":
      return "Image";
    case "jpg":
      return "Image";
    case "jpeg":
      return "Image";
    case "gif":
      return "Image";
    case "svg":
      return "SVG";
    default:
      return "Text";
  }
}
