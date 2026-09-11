---
title: Settings reference
description: Every page in File > Settings, and what each one controls.
type: reference
---

# Settings reference

**File > Settings** opens the editor's settings. The pages are listed down the left; a change applies when you select **OK**, and **Cancel** discards everything you changed since the dialog opened.

Settings are stored in `~/.dogsbay/settings.xml` and apply to every project. Settings that belong to a project, such as its type, root map, framework and formatting house style, live in that project's own `.dogsbay/config.xml`, which you can commit and share. See [Format](#format) below for how to write the current formatting into it.

## Server

The integration server, and the defaults for agents.

**Enable integration server (MCP / CLI / REST)** lets external tools drive the editor over localhost: the MCP endpoint for AI assistants, the `dogsbay-xml` command line's editor commands, and the REST API. It is off until you turn it on. The in-app agent does not need it; a [hosted agent](/agent/hosted-agents) does. When the server is running, the page shows the address it is on.

| Setting | What it does |
|---|---|
| Port (0 = automatic) | The port to bind. Zero picks a free one. |
| Expose MCP endpoint (/mcp) | Serves the editor's tools to AI assistants. |
| Expose JSON-RPC endpoint (/rpc) | Serves the command line's editor commands. |
| Copy MCP install command | Copies a ready-to-paste `claude mcp add` command, with the access token, to the clipboard. |
| Regenerate token | Issues a new access token. Existing MCP and CLI clients must be reconfigured with it. |

**Hosted agents** sets what a new hosted agent session starts with. **Default tier for a new agent** is the preselected answer: T1 (commands only), T2 (read files) or T3 (read and write files). You are still asked each time a session starts. **Agent edits to DITA documents land as proposals for review** keeps an agent's changes as tracked [proposals](/agent/proposals) rather than direct edits.

**Agent sessions** controls how long the built-in agent's transcripts are kept in `~/.xagent/sessions`: Forever, or 90, 60, 30, 14 or 7 days. Older ones are deleted when the editor starts.

## Plugins

Every plugin the editor has loaded, with its license, and a switch for each. Most panels come from a plugin, and turning one off removes its panel entirely. **Open Plugins Folder** opens the directory plugins are installed into.

## Bindings

Every command in the editor and the key it answers to. See the [keyboard shortcut reference](/reference/shortcuts) for the defaults.

Filter the list by typing in the box. With a command selected:

| Button | What it does |
|---|---|
| Change… | Asks for a key. Press the combination you want; Escape on its own cancels. |
| Bind nothing | Leaves the command with no key. |
| Reset | Puts the command back to its default. |
| Reset all | Puts every command back to its default. |

Only the commands you change are stored, so a default that improves in a later release reaches you. A key already taken by another command is reported when you choose it.

## Text

How the editor draws text.

Choose the **font** and **size** for the editor. Fonts marked ★ are bundled with the editor and look the same on every machine.

The list below sets the **color and style of each kind of markup**: element names, attribute names and values, comments, CDATA, entity references, DTD declarations, DITA and AsciiDoc constructs, and the rest. Select a kind to change its color and whether it is bold or italic.

**Antialiase Text** smooths glyph edges. **Convert to Spaces** inserts spaces when you press Tab rather than a tab character.

## Views

How documents open and behave.

| Group | Setting |
|---|---|
| General | Synchronise Selection between Views; Open multiple occurrences of the same Document; Scroll Document Tabs; Reopen files from previous session |
| XML Types | Check for Type opening Document; Prompt to create a Type when no Type found; Validate Document on opening; Set Schema or DTD defined in Document |
| Scenario Execution | Hide Scenario Execution Dialog when complete |
| XInclude | Open Resolve XInclude in New Document |
| XPath Editor | Generate Unique XPath |
| Project | Show full Path for Documents |

## XML

Parsing and catalogs.

Three groups:

**Non Validating Feature** holds **Load DTD Grammar**, which loads the DTD even when the document is not being validated, so content completion knows the vocabulary.

**Catalogs** lists the OASIS catalog files used to resolve public identifiers and URIs. The DITA catalogs ship with the editor and are already here; **Add …** registers your own and **Delete** removes the selected one. **Prefer Public Identifiers** resolves by public identifier before system identifier.

**Prefix Namespace Mappings** is a table of the prefixes the editor uses for known namespaces, so generated markup and XPath expressions use the prefix you expect.

## Format

The house style used by **Format Document**, by format-on-save, and by the `dogsbay-xml format` command, so every route produces the same file.

| Setting | What it does |
|---|---|
| Indent | Spaces or tabs, and how many. |
| Max line width | Where to wrap. Zero never hard-wraps prose. |
| Newline | Platform, LF or CRLF. |
| Final newline | Ends the file with a newline. |
| Preserve mixed content | Keeps inline markup inline rather than breaking it onto its own lines. |
| Preserve blank lines | Keeps one blank line and collapses the extras. |
| Semantic line breaks | Keeps one sentence per line. |
| Sentence continuation indent | How a wrapped sentence is indented. |
| Format on save | Reformats a document whenever you save it. |

**Save to project (.dogsbay/config.xml)…** writes the current style into the open project so everyone working on it formats identically.

## System

The machine, rather than the editing.

| Group | What it controls |
|---|---|
| Look And Feel | The editor's theme. |
| Browser | Which browser opens external links. Linux and other Unix systems only; macOS and Windows use the system default and the group is not shown. |
| Proxy Configuration | Host address and port for a proxy, and whether to use one. |
| Extensions | Extra jars and directories added to the editor's classpath. **Add Jar …**, **Add Dir …** and **Delete**. |
