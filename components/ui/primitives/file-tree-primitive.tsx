import { getColorForExtension, mapExtensionToIcon } from "@/lib/map-extension-to-icon";
import { parseFileExtension } from "@/lib/parse-file-extension";
import { cn } from "@/lib/utils";
import { IconFolder, IconFolderOpen } from "@tabler/icons-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const NODE_PADDING_LEFT = 12;
const DEFAULT_HIDDEN_FILES = [/\/node_modules\//];

interface Props {
  files: string[];
  selectedFile?: string;
  onFileSelect?: (filePath: string) => void;
  hideRoot: boolean;
  scope?: string;
  hiddenFiles?: Array<string | RegExp>;
  className?: string;
}

export function FileTree({
  files,
  onFileSelect,
  selectedFile,
  hideRoot,
  scope,
  hiddenFiles,
  className,
}: Props) {
  const computedHiddenFiles = useMemo(
    () => [...DEFAULT_HIDDEN_FILES, ...(hiddenFiles ?? [])],
    [hiddenFiles]
  );

  const fileList = useMemo(
    () => buildFileList(files, hideRoot, scope, computedHiddenFiles),
    [files, hideRoot, scope, computedHiddenFiles]
  );

  const [collapsedFolders, setCollapsedFolders] = useState(
    () => new Set<number>()
  );

  // reset collapsed folders when the list of files changes
  useEffect(() => {
    setCollapsedFolders(new Set<number>());
  }, [files]);

  const filteredFileList = useMemo(() => {
    const list = [];

    let lastDepth = Number.MAX_SAFE_INTEGER;

    for (const fileOrFolder of fileList) {
      const depth = fileOrFolder.depth;

      // if the depth is equal we reached the end of the collaped group
      if (lastDepth === depth) {
        lastDepth = Number.MAX_SAFE_INTEGER;
      }

      // ignore collapsed folders
      if (collapsedFolders.has(fileOrFolder.id)) {
        lastDepth = Math.min(lastDepth, depth);
      }

      // ignore files and folders below the last collapsed folder
      if (lastDepth < depth) {
        continue;
      }

      list.push(fileOrFolder);
    }

    return list;
  }, [fileList, collapsedFolders]);

  function toggleCollapseState(id: number) {
    setCollapsedFolders((prevSet) => {
      const newSet = new Set(prevSet);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  }

  return (
    <div
      className={cn(
        className,
        "transition-theme bg-tk-elements-fileTree-backgroundColor"
      )}
    >
      {filteredFileList.map((fileOrFolder) => {
        switch (fileOrFolder.kind) {
          case "file": {
            return (
              <File
                key={fileOrFolder.id}
                selected={selectedFile === fileOrFolder.fullPath}
                file={fileOrFolder}
                onClick={() => onFileSelect?.(fileOrFolder.fullPath)}
                icon={mapExtensionToIcon(
                  parseFileExtension(fileOrFolder.fullPath as string) as string
                )}
              />
            );
          }
          case "folder": {
            return (
              <Folder
                key={fileOrFolder.id}
                folder={fileOrFolder}
                collapsed={collapsedFolders.has(fileOrFolder.id)}
                onClick={() => toggleCollapseState(fileOrFolder.id)}
                icon={collapsedFolders.has(fileOrFolder.id) ? <IconFolder className="h-4 w-4" /> : <IconFolderOpen className="h-4 w-4" />}
              />
            );
          }
        }
      })}
    </div>
  );
}

export default FileTree;

interface FolderProps {
  folder: FolderNode;
  collapsed: boolean;
  onClick: () => void;
  icon: ReactNode;
}

export function Folder({
  folder: { depth, name },
  collapsed,
  onClick,
  icon,
}: FolderProps) {
  return (
    <div className="flex items-center justify-center">
      <NodeButton
        className="group !flex !items-center transition-theme font-light"
        depth={depth}
        iconClasses={""}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <span className="mr-2 flex-shrink-0">{icon}</span>
          {name}
        </div>
      </NodeButton>
    </div>
  );
}

interface FileProps {
  file: FileNode;
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
}

export function File({ file: { depth, name, fullPath }, onClick, selected, icon }: FileProps) {
  return (
    <div className="flex items-center gap-2">
      <NodeButton
        className={cn(
          "group transition-theme !inline-flex !items-center font-light",
          {
            "": !selected,
            "bg-zinc-700/50 rounded-r-md": selected,
          }
        )}
        depth={depth}
        iconClasses={""}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <span className={`mr-2 flex-shrink-0 ${getColorForExtension(parseFileExtension(fullPath as string) as string)}`}>{icon}</span>
          {name}
        </div>
      </NodeButton>
    </div>
  );
}

interface ButtonProps {
  depth: number;
  iconClasses: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function NodeButton({
  depth,
  iconClasses,
  onClick,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center w-full pr-2 border-2 border-transparent",
        className
      )}
      style={{ paddingLeft: `${12 + depth * NODE_PADDING_LEFT}px` }}
      onClick={() => onClick?.()}
    >
      <span>{children}</span>
    </button>
  );
}

type Node = FileNode | FolderNode;

interface BaseNode {
  id: number;
  depth: number;
  name: string;
}

interface FileNode extends BaseNode {
  kind: "file";
  fullPath: string;
}

interface FolderNode extends BaseNode {
  kind: "folder";
}

function buildFileList(
  files: string[],
  hideRoot: boolean,
  scope: string | undefined,
  hiddenFiles: Array<string | RegExp>
): Node[] {
  const folderPaths = new Set<string>();
  const fileList: Node[] = [];
  const defaultDepth = hideRoot ? 0 : 1;

  if (!hideRoot) {
    fileList.push({ kind: "folder", name: "/", depth: 0, id: 0 });
  }

  for (const filePath of files) {
    if (scope && !filePath.startsWith(scope)) {
      continue;
    }

    const segments = filePath.split("/").filter((s) => s);
    const fileName = segments.at(-1);

    if (!fileName || isHiddenFile(filePath, fileName, hiddenFiles)) {
      continue;
    }

    let currentPath = "";

    for (let depth = 0; depth < segments.length; ++depth) {
      const name = segments[depth];
      const fullPath = (currentPath += `/${name}`);

      if (depth === segments.length - 1) {
        fileList.push({
          kind: "file",
          id: fileList.length,
          name,
          fullPath,
          depth: depth + defaultDepth,
        });
      } else if (!folderPaths.has(fullPath)) {
        folderPaths.add(fullPath);

        fileList.push({
          kind: "folder",
          id: fileList.length,
          name,
          depth: depth + defaultDepth,
        });
      }
    }
  }

  return fileList;
}

function isHiddenFile(
  filePath: string,
  fileName: string,
  hiddenFiles: Array<string | RegExp>
) {
  return hiddenFiles.some((pathOrRegex) => {
    if (typeof pathOrRegex === "string") {
      return fileName === pathOrRegex;
    }

    return pathOrRegex.test(filePath);
  });
}
