---
title: Connecting an AI assistant
description: Expose the editor's DITA operations to Claude Code, Claude Desktop or Cursor over MCP.
type: how-to
---

# Connecting an AI assistant

The editor can offer its operations to an AI assistant over the Model Context
Protocol. The assistant then works on your project through the same commands
the editor and the command line use, rather than by reading and rewriting
files as text.

This is different from the agents inside the editor. Here the assistant is
somewhere else, in a terminal or a desktop app, and the editor is the tool
provider.

## Turn on the server

The integration server is off by default.

:::steps
1. **Open the preferences**
   Select **File > Preferences**.

2. **Enable the server**
   Go to the **Server** page and turn it on.

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

## What the assistant can do

The tools cover the same ground as the command line, grouped roughly as:

- **Reading and validating** documents, including Schematron and project-wide
  validation.
- **Asking about the project**: where a file is used, what a key resolves to,
  which references are broken, overall health.
- **Refactoring**: renaming files, keys and ids, converting between direct
  references and keys, extracting and inlining reuse, splitting topics.
- **Editing maps and relationship tables** structurally.
- **Driving the editor**: opening documents, moving the cursor, selecting
  elements, reading the outline.
- **Reviewing**: listing proposals, commenting, reading the audit log.

Every call is attributed to a session, so the audit log records which
assistant did what.

## If the token changes

Regenerating the token invalidates any client configured with the old one:

```bash
dogsbay-xml status --reset-token
```

The editor must be restarted afterwards, and clients need the new
configuration.

## Related

:::cards
- **[The agent, and what it may touch](/agent/overview)** {icon="shield"}
  Tiers, the write gate and the audit log, which apply here too.

- **[The command line](/reference/cli)** {icon="terminal"}
  The same operations, without a client.
:::
