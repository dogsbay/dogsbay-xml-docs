---
title: Menu reference
description: Every menu in the editor, in order, with what each command does and where it is documented in full.
type: reference
---

# Menu reference

Every command the menu bar offers, in the order it appears. Items marked
**DITA** come from the DITA plugin and appear only when that plugin is
enabled.

Some menus change with the document. Preview entries are enabled only for a
document that can be previewed, and the Document Views submenu lists the views
the current document supports.

## File

| Item | What it does |
|---|---|
| New File | Create a document. |
| New Project | Create a project. |
| Open File | Open a document. |
| Open Project Folder | Open a folder as the project. |
| Open Sample Project | Copy the bundled Audacity DITA sample into a new folder and open it. Disabled while the sample is already open. See the [tutorial](/getting-started/tutorial). |
| Open Recent | Recently opened files and projects, in two groups. |
| Save, Save As, Save All | Write the document, under a new name, or every modified document. |
| Preferences | Editor settings, including the **Server** page that turns on the [integration server](/automation/mcp). |
| Import Framework | Add support for a non-DITA vocabulary. |
| Manage Frameworks | Review and remove imported frameworks. |
| Close, Close All | Close the document, or all of them. |
| Exit | Leave the editor. |

## Edit

| Item | What it does |
|---|---|
| Undo, Redo | Step back and forward. Shared between the source and Author views of a document. |
| Cut, Copy, Paste | The usual clipboard operations. |
| Find, Replace | Search within the current document. |
| Find in Files, Replace in Files | Search across the project. |

## View

| Item | What it does |
|---|---|
| Preview in Tab | Open the styled preview in its own tab. See [previewing](/publishing/publishing). |
| Preview in Split | Open it beside the source. |
| Document Views | Switch this document between Editor, Author and the split views. |
| Appearance | Full screen, which toolbars are shown, and the three sidebar toggles. |
| Editor Layout | Split the tab area horizontally or vertically, unsplit it, and synchronise splits on XPath. |
| Editor Properties | Margins, tag completion, smart indentation, error highlighting and soft wrapping. |
| Viewer Properties | What the tree view shows: namespaces, attributes, comments, content, processing instructions, and whether mixed content is inlined. |
| Select document | Jump to an open document. |

### Appearance

Full Screen; the Standard, Editor and Fragment toolbars; and Toggle Primary
Sidebar, Toggle Bottom Panel and Toggle Secondary Sidebar.

### Editor Properties

Show Annotation Margin, line number margin, folding margin and overview
margin; tag completion and end-tag completion; smart indentation; error
highlighting; and soft wrapping.

## XML

Commands that work on markup rather than on text.

| Item | What it does |
|---|---|
| Check Well-Formedness | Parse the document and report syntax errors. |
| Validate | Validate against the document's grammar. See [validating](/finding/validation). |
| Select Element, Select Element Content | Select the element at the cursor, or only what is inside it. |
| Split Element | Split the element at the cursor into two. |
| Insert Special Character | Insert a character by name. |
| Convert Entities to Characters, Convert Characters to Entities | Move between the two forms. |
| Strip Tags | Remove markup from the selection, keeping the text. |
| Tag, Repeat last Tag | Wrap the selection in an element, or repeat the last one used. |
| Rename Element | Rename the element at the cursor, and its end tag. |
| Expand Empty Element | Turn a self-closing element into a start and end tag. |
| Comment, CDATA | Wrap the selection as a comment or a CDATA section. |
| Unlock | Remove protection from a region. |
| Format | Pretty-print to the project's house style. |
| Reflow Sentences | One sentence per line, leaving verbatim blocks alone. |
| Goto Start Tag, Goto End Tag | Move between the two ends of an element. |
| Goto Previous, Goto Next Attribute Value | Move between attribute values. |
| Strip Text | Remove text content from selected nodes. |
| Change Case | Capitalise, decapitalise, uppercase or lowercase element and attribute names. |
| Namespaces | Move declarations to the root or to where first used, rename a prefix, remove unused declarations. |
| Nodes | Add, remove, rename, convert or sort nodes, set their value, or add them to a namespace. |

## Project

| Item | What it does |
|---|---|
| Manage Projects | Add, edit and remove projects. |
| Save Project Settings | Write the current setup into the project's `.dogsbay` folder so it is shared. |
| Validate | Project-wide validation, described below. |
| Agent activity | The audit log of what agents changed. See [the agent](/agent/overview). |
| Build Deliverables **DITA** | Build with DITA-OT. See [publishing](/publishing/publishing). |
| Manage Deliverables **DITA** | Edit the project's deliverables. |
| Edit Structure **DITA** | Structural map editing. |
| Edit Relationship Tables **DITA** | Edit reltables. |
| Metadata: Audit, Normalize, Edit Policy, Export Policy as Schematron **DITA** | See [metadata](/authoring/metadata). |
| Format Project, Reflow Project | Apply the house style across the project. |

### Project > Validate

Every project-wide check lives in one submenu rather than being spread across
the menu bar.

| Item | What it does |
|---|---|
| Project | Validate every file in scope against its grammar. |
| Project with Schematron | Apply a Schematron schema across the project. |
| Document with Schematron | Apply one to the current document. |
| Controlled Values (Subject Scheme) **DITA** | Report profiling values the subject scheme does not allow. See [conditional content](/authoring/conditional-content). |
| With DITA-OT — Current Map, All Deliverables **DITA** | Deep validation by running DITA-OT preprocessing. |

## Types

Grammar management: Create Type, Set Type, Type Properties and Manage Types.

## Transform

XSLT, XQuery and XSL-FO, run as reusable scenarios: Execute Simple XSLT,
Execute Advanced XSLT, Execute FO, the default scenario, Manage Scenarios, and
Execute Previous.

## Refactor

Every command here reports a plan you review before it runs. The same
operations are available from the [command line](./cli), and are described in
[refactoring](/finding/refactoring).

| Item | Command-line equivalent |
|---|---|
| Rename/Move File with References | `rename-file` |
| Retarget References | `retarget` |
| Rename Key | `rename-key` |
| Split Topic by Sections | `split-topic` |
| Extract Element to Conref | `extract-conref` |
| Create Key from Selected Text | `create-keydef` |
| Rename Element Id | `rename-element-id` |
| Merge Duplicate Keydefs | `merge-keydefs` |
| Rename Profiling Value | `rename-profile-value` |
| Project Health Report | `project-health` |

## Utilities

| Item | What it does |
|---|---|
| XML Diff and Merge | Compare two documents structurally. |
| Start Browser | Open the document in your system browser. |
| Resolve XIncludes | Replace XInclude references with the content they pull in. |
| Save As Template, Manage Templates | Reuse a document as a starting point. |
| Insert Fragment | Insert a saved markup fragment. |
| Toggle Bookmark, Select Bookmark | Mark a place and return to it. |

## Help

Documentation, which opens this site; Welcome, which reopens the welcome tab;
and About.

## Beyond the menu bar

Not everything is in a menu.

**The view buttons** in the menu bar switch the current document between the
Editor and Author views, and are the fastest way to move between them.

**The sidebars** hold the panels: Explorer, Search, Git, Topic Maps, XPath
Query, Where Used and Bookmarks on the left; Outline, AI Agent, Proposals,
Properties, Navigator, Helper and Metadata on the right. The three toggles in
**View > Appearance** show and hide them.

**The bottom panel** holds output, validation errors, the Inspector and the
Terminal.

**The status bar** shows the project, the git branch with a switcher, and the
active deliverable.

**Right-click** in the editor for clipboard and markup commands, and on a
selection for **Send selection to AI Agent**.
