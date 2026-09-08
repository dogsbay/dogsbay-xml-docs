---
title: Panel reference
description: Every panel in the sidebars and the bottom bar, what it shows, and what you can do in it.
type: reference
---

# Panel reference

The editor's work happens in panels: two sidebars and a bottom bar. Show and
hide them from **View > Appearance**, with Toggle Primary Sidebar, Toggle
Bottom Panel and Toggle Secondary Sidebar.

Most panels come from plugins, and each can be turned off individually in
**File > Preferences > Plugins**. A panel whose plugin is disabled does not
appear at all.

## Left sidebar

### Explorer

The file tree for the open folder. Always present; it is not a plugin.

Open, rename, move and delete files, and drag a file onto an agent's chat box
to attach it.

### Search

Find and replace across the project.

| Control | Effect |
|---|---|
| Match Case | Distinguish upper and lower case. |
| Match Whole Word | Require whole-word matches. |
| Use Regular Expression | Treat the term as a regular expression. |
| Toggle Replace | Show the replacement field. |
| Preserve Case | Keep the case of what is replaced. |
| Toggle Search Details | Show the include and exclude filters. |

Filters take comma-separated globs, such as `*.xml,*.java` to include, or
`target/**,*.class` to exclude.

### Git

Version control for the project. The panel lists changed files and stages
them individually or together.

Available actions: Stage All, Commit, Commit All, Commit Staged, Amend Last
Commit, Discard All Changes, Fetch, Pull, Push, Stash and Pop Stash, plus
Create Branch and Checkout Branch.

Authentication uses your system git configuration, so a repository you can
already push to from a terminal works here.

### Topic Maps

The DITA map as a tree: topic references, nested maps and relationship
tables. Comes from the DITA plugin.

Buttons: Open DITA Map, Refresh Map, Collapse All, and Publish DITA Map,
which builds through DITA-OT.

### XPath Query

Run an XPath expression across files and list the matches. Takes the same
comma-separated glob filters as Search, with Stop and Clear for long runs.

### Where Used

What depends on a file or a key, which is the question to ask before renaming
anything.

| Control | Effect |
|---|---|
| Active Document | Find everything that references the document in front. |
| Key | Inspect one key: its definition and every use. Press Enter to run. |
| Rebuild | Re-scan the project and rebuild the link index. |

The index covers references from maps, conrefs, links and images. With a root
map configured it also finds references that reach a file indirectly through a
key, which a text search cannot.

### Bookmarks

Places you marked, with Delete Bookmark to remove them. Mark and unmark from
**Utilities > Toggle Bookmark**.

## Right sidebar

### Outline

The structure of the document in front, as a tree you can click to navigate.
It follows the document type, so a Markdown file outlines by heading and an
XML file by element.

### AI Agent

The agent panel, as tabs. The first is the built-in agent; each hosted agent
you start gets its own, with its capability tier shown as a badge.

Per-tab actions, from the tab's context menu: Rename session, Export
transcript, Copy transcript, and Close session. The add button lists agents
this machine can run, with Refresh agent registry and an install action.

The built-in agent's tab has a **Sessions** button, which lists every past
conversation with its date and name: resume one, start a new one, or delete
one. Right-click or double-click the tab to rename the conversation. See
[session transcripts](/agent/overview#session-transcripts).

See [the agent](/agent/overview).

### Proposals

Changes an agent has proposed, waiting for your decision: Accept, Reject,
Accept all, Reject all, and Resolve for comments. Selecting one moves the
editor to the affected part of the document.

See [reviewing an agent's changes](/agent/proposals).

### Metadata

The metadata on the current topic, with Refresh, and Normalize to bring it in
line with the project's policy. Comes from the DITA plugin. See
[metadata](/authoring/metadata).

### Properties, Navigator and Helper

Document properties, navigation aids, and context-sensitive help for the
markup at the cursor.

## Bottom panel

The tabs are Errors, Project Validation, Terminal and Inspector.

### Errors

Validation results for the document in front. Selecting an entry jumps to the
place it refers to.

### Project Validation

Results from a project-wide run, such as **Project > Validate > Project**, and
output from long-running operations including DITA-OT builds.

### Inspector

Two tabs. **Link Checker** reports references that do not resolve.
**Changes** shows what has changed in the document, with a count in the tab
label.

### Terminal

A real terminal in the project folder, with as many tabs as you need. Kill
Process stops what is running; the tab's close button ends the session.

The first terminal opens in the project folder, or in the folder shown in the
Explorer when no project is open.

## Related

:::cards
- **[Menu reference](./menus)** {icon="menu"}
  Every command in the menu bar.

- **[The command line](./cli)** {icon="terminal"}
  The same operations without the interface.
:::
