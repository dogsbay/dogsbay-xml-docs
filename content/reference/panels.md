---
title: Panel reference
description: Find every panel in the sidebars and bottom bar, and learn what you can do in each panel.
type: reference
---

# Panel reference

The editor has two sidebars and a bottom bar. Use **View > Appearance** to
show or hide them with Toggle Primary Sidebar, Toggle Bottom Panel, and Toggle
Secondary Sidebar.

Most panels come from plugins. You can turn off each plugin individually in
**File > Settings > Plugins**. When you disable a panel's plugin, the panel does not
appear at all.

## Left sidebar

### Explorer

The file tree for the open folder. Always present; it is not a plugin.

Open, rename, move, and delete files, and drag a file onto an agent's chat box
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

Available actions include Stage All, Commit, Commit All, Commit Staged, Amend Last Commit, Discard All Changes, Fetch, Pull, Push, Stash, Pop Stash, Create Branch, Checkout Branch, Merge Branch, and Delete Branch. The branch actions are also on the branch name in the status bar, at the bottom left.

**Merge Branch** brings another local branch into the one you are on. This is the step after an agent has finished work on a branch and you have reviewed it. It refuses to start if the working tree has uncommitted changes, since a merge rewrites the files it brings in. A merge that ends in conflicts leaves the markers in the files and names them, for you to resolve, stage and commit; `git merge --abort` in the Terminal puts things back.

Right-click a file in the Changes list for **Open**, **Stage**, **Unstage** and **Discard Changes**. From the keyboard, select the file and press Shift+F10 or the Menu key.

**Discard Changes** puts a tracked file back to its last commit. A new file has no commit to go back to, so discarding it deletes it. The menu says **Delete New File** when that is all it would do, and the confirmation lists what is reverted and what is removed under separate headings. Conflicted files and staged deletions are left alone. A conflicted file holds a merge in progress, and a staged deletion is a tracked file whose removal you have staged, so its content is still in the last commit and the deletion is undone by unstaging rather than by discarding.

**Delete Branch** removes a local branch. When its commits are already in the branch you are on, it says so and deletes cleanly. When they are not, it says that instead and asks again, because deleting then loses that work.

Authentication uses your system Git configuration, so a repository you can already push to from a terminal works here.

### Topic Maps

The panel shows the DITA map as a tree of topic references, nested maps, and
relationship tables. The DITA plugin provides this panel.

Use Open DITA Map, Refresh Map, Collapse All, and Publish DITA Map. Publish
DITA Map builds through DITA-OT.

### XPath Query

Run an XPath expression across files and list the matches. The panel uses the same
comma-separated glob filters as Search, with Stop and Clear for long runs.

### Where Used

Find what depends on a file or key before you rename it.

| Control | Effect |
|---|---|
| Active Document | Find everything that references the document in front. |
| Key | Inspect one key: its definition and every use. Press Enter to run. |
| Rebuild | Re-scan the project and rebuild the link index. |

The index covers references from maps, conrefs, links, and images. With a root
map configured it also finds references that reach a file indirectly through a
key, which a text search cannot.

### Bookmarks

Places you marked, with Delete Bookmark to remove them. Mark and unmark from
**Utilities > Toggle Bookmark**.

## Right sidebar

The agent and its proposals are at the top, because that is where most work starts.

### AI Agent

The agent panel, as tabs. The first is the built-in agent; each hosted agent
you start gets its own, with its capability tier shown as a badge.

The tab's context menu contains Rename session, Export transcript, Copy
transcript, and Close session. The add button lists agents that this machine
can run and provides Refresh agent registry and an install action.

The built-in agent's tab has a **Sessions** button, which lists every past
conversation with its date and name. You can resume a conversation, start a
new one, or delete one. Right-click or double-click the tab to rename the conversation. See
[session transcripts](/agent/overview#session-transcripts).

See [the agent](/agent/overview).

### Proposals

Changes an agent has proposed, waiting for your decision: Accept, Reject,
Accept all, Reject all, and Resolve for comments. Selecting one moves the
editor to the affected part of the document.

See [reviewing an agent's changes](/agent/proposals).

### Outline

The panel shows the structure of the active document as a tree. Select an item
to navigate to it. The structure follows the document type, so a Markdown file
uses headings and an XML file uses elements.

### Metadata

The metadata on the current topic, with Refresh and Normalize to bring it in
line with the project's policy. This panel comes from the DITA plugin. See
[metadata](/authoring/metadata).

### Properties, Navigator, and Helper

These panels provide document properties, navigation aids, and
context-sensitive help for the markup at the cursor.

## Bottom panel

The tabs are Errors, Project Validation, Terminal, and Inspector.

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
