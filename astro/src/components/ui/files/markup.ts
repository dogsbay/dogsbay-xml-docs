/**
 * The `:::files` tree, written once for both pipelines: FileTree.astro renders it,
 * and dogsbay-ssg copies this file (scripts/sync-astro-styles.mjs) and calls it.
 * Each pipeline turns an entry's inline Markdown into `label` HTML itself.
 */

export interface FileTreeItem {
  /** The entry's label as HTML (already escaped). */
  label: string;
  /** A folder: it has entries, or its name ends in "/". */
  folder: boolean;
  children: FileTreeItem[];
}

const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" focusable="false">${body}</svg>`;
// Lucide folder and file (ISC licence).
const FOLDER = svg('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>');
const FILE = svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>');

function list(items: FileTreeItem[], nested: boolean): string {
  const cls = nested ? "m-0 ml-2 list-none border-l border-border pl-4" : "m-0 list-none p-0";
  return `<ul class="${cls}">${items
    .map(
      (it) =>
        `<li class="my-0.5" data-kind="${it.folder ? "folder" : "file"}"><span class="inline-flex items-center gap-1.5">${it.folder ? FOLDER : FILE}<span>${it.label}</span></span>${it.children.length ? list(it.children, true) : ""}</li>`,
    )
    .join("")}</ul>`;
}

/** The whole tree, in a bordered, monospaced box. */
export function fileTreeHtml(items: FileTreeItem[], extraClass = ""): string {
  return `<div class="not-prose my-4 overflow-x-auto rounded-lg border bg-card p-3 font-mono text-sm${extraClass ? ` ${extraClass}` : ""}" data-component="files">${list(items, false)}</div>`;
}
