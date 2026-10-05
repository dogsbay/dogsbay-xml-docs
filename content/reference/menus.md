---
title: Menu reference
description: Find every editor menu and learn what each command does.
type: reference
---

# Menu reference

This reference lists every menu bar command in the order that it appears. Items marked
**DITA** come from the DITA plugin and appear only when that plugin is
enabled.

The menu bar contains **File**, **Edit**, **View**, **Project**, **XML**,
**Refactor**, **Utilities**, and **Help**.

Some menus change with the document. Preview entries are enabled only for a
document that can be previewed, and the Document Views submenu lists the views
the current document supports.

In the menus, a command that opens a dialog ends in an ellipsis. The tables
below omit it. **Schematron** is the one command whose ellipsis comes and
goes: it becomes **Schematron…** only when no default schema is configured and
you must select one.

## File

| Item | What it does |
|---|---|
| New File | Create a document. |
| New Project | Create a project. |
| Open File | Open a document. |
| Open Project Folder | Open a folder as the project. |
| Open Sample Project | Copy the bundled Audacity DITA sample into a new folder and open it. Disabled while the sample is already open. See the [tutorial](/getting-started/tutorial-manual). |
| Open Recent | Recently opened files and projects, in two groups. |
| Save, Save As, Save All | Write the document, under a new name, or every modified document. |
| Settings | Editor settings, on eight pages. See the [settings reference](/reference/settings). The **Server** page turns on the [integration server](/automation/mcp) and holds the agent defaults, including how long [session transcripts](/agent/overview#session-transcripts) are kept; **Bindings** is where you change a [keyboard shortcut](/reference/shortcuts). |
| Close, Close All | Close the document, or all of them. |
| Exit | Leave the editor. |

## Edit

| Item | What it does |
|---|---|
| Undo, Redo | Step back and forward. Shared between the source and Author views of a document. |
| Cut, Copy, Paste | Cut, copy, or paste content. |
| Find, Replace | Search within the current document. |
| Find in Files, Replace in Files | Search across the project. |

## View

| Item | What it does |
|---|---|
| Preview in Tab | Open the styled preview in its own tab. See [previewing](/publishing/publishing). |
| Preview in Split | Open it beside the source. |
| Document Views | Switch this document between Editor, Author, and the split views. |
| Appearance | Full screen, which toolbars are shown, and the three sidebar toggles. |
| Editor Layout | Split the tab area horizontally or vertically, unsplit it, and synchronize splits on XPath. |
| Editor Properties | Margins, tag completion, smart indentation, error highlighting, and soft wrapping. |
| Viewer Properties | What the tree view shows: namespaces, attributes, comments, content, processing instructions, and whether mixed content is inlined. |
| Select document | Jump to an open document. |

### Appearance

Full Screen; the Standard, Editor, and Fragment toolbars; and Toggle Primary
Sidebar, Toggle Bottom Panel, and Toggle Secondary Sidebar.

### Editor Properties

Show Annotation Margin, line number margin, folding margin, and overview
margin; tag completion and end-tag completion; smart indentation; error
highlighting; and soft wrapping.

## Project

Use the Project menu to validate, build, preview, and configure a project.

| Item | What it does |
|---|---|
| Check Project **DITA** | Run project health checks, build deliverables, and check output links. See [Validating a project](/finding/validation#is-the-project-ready). |
| Validate Files | Run individual project-wide checks. See [Validate Files](#project-validate-files). |
| Build Deliverables **DITA** | Build with DITA-OT. See [publishing](/publishing/publishing). |
| Live Preview **DITA** | Build a deliverable and serve it, rebuilding as you save. |
| Metadata **DITA** | Edit Policy, Audit, Normalize, and Export Policy as Schematron. See [metadata](/authoring/metadata). |
| Map **DITA** | Edit Structure and Edit Relationship Tables on the active deliverable's map. Inspect key definitions with [Key Space](/authoring/keys-and-reuse#seeing-the-key-space) and allowed profiling values with [Controlled Values](/authoring/conditional-content#controlling-values-with-a-subject-scheme). |
| Manage Projects | Add, edit, and remove projects. |
| Project Tools | Save settings, format files, manage deliverables, remove temporary build files, and view agent activity. See [Project Tools](#project-project-tools). |

### Project > Validate Files

Select a command to run an individual project-wide check.

| Item | What it does |
|---|---|
| With DTD | Validate every file in scope against its grammar. |
| With Schematron | Apply the default Schematron schema across the project. If none is configured, select a schema when prompted. |
| With DITA-OT — Current Map, All Deliverables **DITA** | Run DITA-OT preprocessing and report validation errors. |
| Controlled Values (Subject Scheme) **DITA** | Report profiling values the subject scheme does not allow. See [conditional content](/authoring/conditional-content). |

To check the current document, use **XML > Check Well-Formedness**,
**XML > Validate**, or **XML > Schematron**.

### Project > Project Tools

| Item | What it does |
|---|---|
| Save Project Settings | Write the current setup into the project's `.dogsbay` folder so it is shared. See [project configuration](/reference/project-config). |
| Format Project, Reflow Project | Apply the house style across the project. If an open document has unsaved changes, Format Project offers to save them first. See [Formatting and encodings](/authoring/formatting). |
| Manage Deliverables **DITA** | Edit the project's deliverables. |
| Clear Temporary Build Files **DITA** | Remove the DITA-OT temporary folders that deliverables kept. |
| Agent activity | The audit log of what agents changed. See [the agent](/agent/overview). |

## XML

Use the XML menu to validate and edit markup in the current document.

| Item | What it does |
|---|---|
| Check Well-Formedness | Parse the document and report syntax errors. |
| Validate | Validate against the document's grammar. See [validating](/finding/validation). |
| Schematron | Apply the default Schematron schema to the current document. If none is configured, select a schema when prompted. |
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
| Change Case | Capitalize, decapitalize, uppercase, or lowercase element and attribute names. |
| Namespaces | Move declarations to the root or to where they are first used, rename a prefix, or remove unused declarations. |
| Nodes | Add, remove, rename, convert, or sort nodes; set their value; or add them to a namespace. |

## Refactor

Every command here reports a plan you review before it runs. The same
operations are available from the [command line](./cli), and are described in
[refactoring](/finding/refactoring).

Commands are grouped by files and references, keys, content reuse, and
attributes. **Find Broken References and Orphans** reports problems without
changing files.

| Item | Command-line equivalent |
|---|---|
| Rename/Move File with References | `rename-file` |
| Retarget References | `retarget` |
| Split Topic by Sections | `split-topic` |
| Create Key from Selected Text | `create-keydef` |
| Rename Key | `rename-key` |
| Merge Duplicate Keydefs | `merge-keydefs` |
| Extract Element to Conref | `extract-conref` |
| Rename Element Id | `rename-element-id` |
| Rename Profiling Value | `rename-profile-value` |
| Set Attribute | `set-attribute` |
| Find Broken References and Orphans | `health` |

**Find Broken References and Orphans** reports broken references, undefined
keys, unused keys, and orphan topics. Review each finding to determine
whether a refactoring is needed.

For project validation, a build, and output-link checks, select **Project >
Check Project**, or run `dogsbay-xml check .`. To run only the project health
report, use `dogsbay-xml project-health .`.

## Utilities

Use the Utilities menu to manage grammars, frameworks, templates, transforms,
and bookmarks.

| Item | What it does |
|---|---|
| Types | Create Type, Set Type, Type Properties, and Manage Types: the grammars the editor validates against. |
| Frameworks | Import Framework and Manage Frameworks — support for a vocabulary that is not DITA. |
| Templates | Save As Template and Manage Templates: use a document as the starting point for new ones. |
| Transforms | Run XSLT and XSL-FO as reusable scenarios: Execute Simple XSLT, Execute Advanced XSLT, Execute FO, the default scenario, Manage Scenarios, and Execute Previous. |
| Bookmarks | Toggle Bookmark and Select Bookmark: mark a place and return to it. |

## Help

**Documentation** opens this site, **Welcome** reopens the welcome tab, and
**About** shows information about the editor.

## Beyond the menu bar

Not everything is in a menu.

**The view buttons** in the menu bar switch the current document between the
Editor and Author views.

**The sidebars** hold the panels: Explorer, Search, Git, Topic Maps, XPath Query, Where Used, and Bookmarks on the left; AI Agent, Proposals, Outline, Properties, Navigator, Helper, and Metadata on the right. The three toggles in **View > Appearance** show and hide them.

**The bottom panel** holds output, validation errors, the Inspector, and the
Terminal.

**The status bar** shows the project, the Git branch, and the active deliverable. Select the branch to switch to another, create one, merge one into the branch you are on, or delete one.

**Right-click** in the editor to access clipboard and markup commands. Right-click
a selection to access **Send selection to AI Agent**.
