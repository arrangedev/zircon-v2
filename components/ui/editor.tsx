"use client";

import type {
  EditorDocument,
  EditorUpdate,
  OnChangeCallback,
  ScrollPosition,
} from "@tutorialkit/components-react/core";
import CodeMirrorEditor from "@tutorialkit/components-react/core/CodeMirrorEditor";

interface BaseEditorProps {
  doc?: EditorDocument;
  onChange?: OnChangeCallback;
  onScroll?: (scroll: ScrollPosition) => void;
}

export default function BaseEditor({ doc, onChange, onScroll }: BaseEditorProps) {
  return (
    <CodeMirrorEditor
      theme={`dark`}
      doc={doc}
      onChange={onChange}
      onScroll={onScroll}
      debounceChange={500}
      debounceScroll={500}
      className="h-full text-sm w-[100%] bg-zinc-950"
    />
  );
}
