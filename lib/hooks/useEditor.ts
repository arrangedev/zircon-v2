"use client"
import type { FileSystemTree, DirectoryNode, WebContainerProcess } from '@webcontainer/api';
import type { Terminal as XTerm } from '@xterm/xterm';
import { EditorDocument, EditorUpdate, ScrollPosition } from "@tutorialkit/components-react/core";
import { useEffect, useState } from "react";
import { useWebContainer } from './useWebContainer';
import { ANCHOR_FILES, DEFAULT_FILES, REACT_FILES } from '../default-files';

export function useSimpleEditor() {
    const webcontainerPromise = useWebContainer();
    const [isClient, setIsClient] = useState(false);
    const [terminal, setTerminal] = useState<XTerm | null>(null);
    const [selectedFile, setSelectedFile] = useState('/node/src/index.ts');
    const [documents, setDocuments] = useState<Record<string, EditorDocument>>(DEFAULT_FILES);
    const [previewSrc, setPreviewSrc] = useState<string>('');
    const [currentWriter, setCurrentWriter] = useState<WritableStreamDefaultWriter<string> | null>(null);
    const [preset, setPreset] = useState<"node" | "react" | "anchor" | "asm">("node");
  
    const document = documents[selectedFile];

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient) return;

      (async () => {
        const webcontainer = await webcontainerPromise;
  
        webcontainer.on('server-ready', (_port, url) => {
          setPreviewSrc(url);
        });
  
        await webcontainer.mount(toFileTree({ ...DEFAULT_FILES, ...REACT_FILES, ...ANCHOR_FILES }));
      })();
    }, [isClient]);

    // Function to add a new file to the file tree and web container
    async function addFile(fileName: string) {
      // Determine what the file path should be based on the selected file, with filename as input
      const selectedFilePath = selectedFile.split("/").slice(0, -1).join("/");
      const newFilePath = `${selectedFilePath}/${fileName}`;

      // Create a new file with the given file path
      changeDocuments({
        ...documents,
        [newFilePath]: {
          filePath: newFilePath,
          loading: false,
          value: "",
        },
      });

      // Write the file to the web container
      const webcontainer = await webcontainerPromise;
      await webcontainer.fs.writeFile(newFilePath, "");
    }

    async function run(terminal: XTerm) {
      const webcontainer = await webcontainerPromise;
      const process = await webcontainer.spawn('jsh', ['--osc'], {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });

      let isInteractive = false;
      let resolveReady!: () => void;

      const jshReady = new Promise<void>((resolve) => {
        resolveReady = resolve;
      });

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            if (!isInteractive) {
              const [, osc] = data.match(/\x1b\]654;([^\x07]+)\x07/) || [];

              if (osc === 'interactive') {
                // wait until we see the interactive OSC
                isInteractive = true;

                resolveReady();
              }
            }

            terminal.write(data);
          },
        }),
      );

      const shellWriter = process.input.getWriter();

      terminal.onData((data) => {
        if (isInteractive) {
          shellWriter.write(data);
        }
      });

      await jshReady;
      
      shellWriter.write('cd node && npm install && npm start\n');
      setCurrentWriter(shellWriter);
    }

    async function changeDocuments(documents: Record<string, EditorDocument>) {
      setDocuments(documents);

      terminal?.focus();
      // Press CTRL+C to exit
      currentWriter?.write('\x03');
      const a = Object.keys(documents)[0];
      const b = a.match(/node|react|anchor|asm/)![0];
      currentWriter?.write(`cd ../${b} && npm install && npm ${
        b === "node" ? "start" : "run dev"
      }\n`);

      setSelectedFile(Object.keys(documents)[0]);
    }
  
    async function onChange({ content }: EditorUpdate) {
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [selectedFile]: {
          ...prevDocuments[selectedFile],
          value: content,
        },
      }));
  
      const webcontainer = await webcontainerPromise;
  
      await webcontainer.fs.writeFile(selectedFile, content);
    }
  
    function onScroll(scroll: ScrollPosition) {
      if (!isClient) return;
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [selectedFile]: {
          ...prevDocuments[selectedFile],
          scroll,
        },
      }));
    }
  
    useEffect(() => {
      if (!isClient || !terminal) return;
  
      run(terminal);
    }, [terminal]);
  
    return {
      terminal,
      setTerminal,
      previewSrc,
      documents,
      setDocuments,
      changeDocuments,
      selectedFile,
      setSelectedFile,
      addFile,
      onChange,
      onScroll,
      document,
      preset,
      setPreset,
      files: Object.keys(documents),
    };
  }
  
  /*
  const DEFAULT_FILES: Record<string, EditorDocument> = {
    '/src/index.ts': {
      filePath: '/src/index.ts',
      loading: false,
      value: stripIndent(`
        document.body.innerHTML = '<h1>Hello, world!</h1>';
      `),
    },
    '/src/index.html': {
      filePath: '/src/index.html',
      loading: false,
      value: stripIndent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello, world!</title>
        </head>
        <body>
          <h1>Hello, world!</h1>
        </body>
        </html>
      `),
    },
    '/src/assets/logo.svg': {
      filePath: '/src/assets/logo.svg',
      loading: false,
      value: stripIndent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="15" />
        </svg>
      `),
    },
    '/package.json': {
      filePath: '/package.json',
      loading: false,
      value: stripIndent(`
        {
          "name": "zircon",
          "version": "1.0.0",
          "description": "Generated by Zircon.",
          "main": "index.js",
          "scripts": {
            "start": "servor src/ --reload"
          },
          "dependencies": {
            "servor": "4.0.2",
            "typescript": "^5.2.2",
            "@sqds/multisig": "^2.1.2"
          }
        }
      `),
    },
  };
  */
  
  const FILE_PATHS = Object.keys(DEFAULT_FILES);
  
  export function stripIndent(string: string) {
    const indent = minIndent(string.slice(1));
  
    if (indent === 0) {
      return string;
    }
  
    const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');
  
    return string.replace(regex, '').trim();
  }
  
  export function minIndent(string: string) {
    const match = string.match(/^[ \t]*(?=\S)/gm);
  
    if (!match) {
      return 0;
    }
  
    return match.reduce((acc, curr) => Math.min(acc, curr.length), Infinity);
  }
  
  export function toFileTree(files: Record<string, EditorDocument>): FileSystemTree {
    const root: FileSystemTree = {};
  
    for (const filePath in files) {
      const segments = filePath.split('/').filter((segment) => segment);
  
      let currentTree: FileSystemTree = root;
  
      for (let i = 0; i < segments.length; ++i) {
        const name = segments[i];
  
        if (i === segments.length - 1) {
          currentTree[name] = {
            file: {
              contents: files[filePath].value,
            },
          };
        } else {
          let folder = currentTree[name] as DirectoryNode;
  
          if (!folder) {
            folder = {
              directory: {},
            };
  
            currentTree[name] = folder;
          }
  
          currentTree = folder.directory;
        }
      }
    }
  
    return root;
  }