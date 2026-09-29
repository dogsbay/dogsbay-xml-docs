---
title: Connecting an AI assistant
description: Provide the editor's DITA operations to Claude Code, Claude Desktop, or Cursor over MCP.
type: how-to
---

# Connecting an AI assistant

The editor can provide its operations to an AI assistant over the Model Context
Protocol. The assistant then works on your project through the same commands
the editor and the command line use, rather than by reading and rewriting
files as text.

This setup differs from using an agent inside the editor. The assistant runs
in a terminal or desktop application, and the editor provides the tools.

You can connect through the running editor or start an MCP server for a
project folder without opening the editor. Both modes provide document and
project operations. Tools that control the editor require a running editor.

## Turn on the server

The integration server is off by default.

:::steps
1. **Open the settings**
   Select **File > Settings**.

2. **Enable the server**
   Select **Server**, and then enable the server.

3. **Confirm it is listening**
   ```bash
   dogsbay-xml status
   ```
:::

The server binds to localhost and requires a token, which is written to a
discovery file in your home directory so local clients can find it.

## Connect a client

The editor prints the configuration for you:

```bash
dogsbay-xml status --mcp-config
```

For Claude Code, it can print the command that registers it:

```bash
dogsbay-xml status --mcp-install
```

Paste the configuration into the client's MCP settings, or run the command.

## Without the editor

The same tools run with no editor open, on the files of a project folder:

```bash
claude mcp add dogsbay -- dogsbay-xml mcp --root /path/to/project
```

Alternatively, add the following configuration to `.mcp.json`:

```json
{
  "mcpServers": {
    "dogsbay": {
      "command": "dogsbay-xml",
      "args": ["mcp", "--root", "/path/to/project"]
    }
  }
}
```

When the server runs without the editor:

- The agent can read and write only within the specified project folder. It
  cannot switch projects.
- The agent must read a file before editing it. The server rejects the edit
  if the file has changed since that read.
- Edits are recorded as proposals attributed to the client. Accept or reject
  them later in the editor or with `dogsbay-xml review`. To apply edits
  without proposal markup, pass `--no-proposals` and review the changes in
  version control.
- Tools for the cursor, selection, open documents, Author view, and
  screenshots are unavailable.
- The server does not write to files that have unsaved changes in a running
  editor.

The server writes the audit log to the project's `.dogsbay/agent-audit/`
directory.

To run a single tool from a terminal or script, use
`dogsbay-xml tool <name> '<json>'`. The command prints the tool's JSON result.

## What the assistant can do

The tools support the same operations as the command line:

- **Read and validate** documents, including Schematron and project-wide
  validation
- **Inspect the project** to find where a file is used, what a key resolves to,
  which references are broken, and the project's overall health
- **Map the project** in one call: every map, topic, key, and DITAVAL file, how they connect, and what each deliverable ships
- **Write reports** as standalone HTML pages, such as a relationship map or a health report
- **Refactor** by renaming files, keys, and IDs; converting between direct
  references and keys; extracting and inlining reuse; and splitting topics
- **Edit** the structure of maps and relationship tables
- **Control the editor** by opening documents, moving the cursor, selecting
  elements, and reading the outline
- **Review** proposals, add comments, revert what an agent wrote, and read the
  audit log
- **Publish** deliverables and start or stop a live preview

When a client connects, the server tells the assistant where to start: the project health check for any validation or audit question, the project graph for structure, and the report tool for a page. An assistant that follows it finds the checks the editor already has instead of writing its own.

Every call is attributed to a session, so the audit log records which
assistant did what.

## If the token changes

Regenerating the token invalidates any client configured with the old one:

```bash
dogsbay-xml status --reset-token
```

Restart the editor, and give clients the new configuration.

## Related

:::cards
- **[The agent, and what it may touch](/agent/overview)** {icon="shield"}
  Tiers, the write gate, and the audit log, which also apply here.

- **[The command line](/reference/cli)** {icon="terminal"}
  The same operations, without a client.
:::
