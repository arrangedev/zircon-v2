import { useState } from 'react';
import FileTree from './primitives/file-tree-primitive';

interface BaseFileTreeProps {
  files: any;
  fileSelected: any;
  onFileSelect: (file: any) => void;
}

export default function BaseFileTree({ files, fileSelected, onFileSelect }: BaseFileTreeProps) {
  return (
    <FileTree
      files={files}
      hideRoot
      className="text-base"
      hiddenFiles={['package-lock.json', 'Cargo.lock']}
      selectedFile={fileSelected}
      onFileSelect={onFileSelect}
    />
  );
}