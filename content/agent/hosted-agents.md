---
title: Using Claude Code, Codex, or Gemini
description: Run an agent you already use inside the editor and give it access to the editor's DITA tools.
type: how-to
---

# Using Claude Code, Codex, or Gemini

The editor can run an agent you already use as a separate program and give it
access to the editor's DITA operations. The agent keeps its own sign-in and its own
model; the editor supplies the tools and the limits.

This setup works with any agent that supports the Agent Client Protocol. Claude Code, Codex, and Gemini CLI are common choices. OpenCode and Goose also support the protocol, and you can configure either to use a local model.

If you are deciding between this and the agent that ships with the editor, see [which agent to use](./choosing).

## Before you start

Turn on the integration server, which is how the agent reaches the editor's tools. Select **File > Settings > Server** and enable it.

Do this before you start the session. A hosted agent is handed its tools when the session starts, and the protocol has no way to add more later, so a session started while the server was off can never pick it up. Enabling it changes nothing for that tab. If you find yourself in that position, the session says so; open a new session and it will have the tools.

## Starting a session

:::steps
1. **Open the AI Agent panel**
   Open **AI Agent** at the top of the right sidebar. The first tab is the built-in agent.

2. **Select the add button**
   The editor lists the agents it can run on this machine. Agents already
   installed are shown as ready; others can still start, but the first run
   downloads them.

3. **Choose a capability tier**
   The tier decides what the editor lends the agent. New sessions default to
   the most restricted.

4. **Work in the tab**
   Each hosted agent gets its own tab, with its tier shown as a badge.
:::

## What the agent can reach

The editor passes its tools to the agent when the session starts, so the agent
can validate documents, resolve keys, find references and run the project
audits without you configuring anything.

The tier decides the rest:

| Tier | The agent can |
|---|---|
| **T1** | Call the editor's DITA commands and nothing else |
| **T2** | Also read project files through the editor, including unsaved buffers |
| **T3** | Also write through the editor, subject to the write gate |

> [!IMPORTANT]
> Some agents read and write files with their own tools, whatever the editor
> offers. Where that is true, the session is Tier 3 in practice and the badge
> says so. The tier governs what the editor lends, not what the agent already
> has.

## Signing in

If the agent needs authentication, a sign-in control appears in its tab. The
editor can also hand the agent an API key you have already saved for the same
vendor, so you do not enter it twice.

## Managing sessions

Right-click a tab to rename or close the session, or to copy or export its transcript.
Closing the tab ends the session.

Sessions are remembered. When you start an agent that supports resuming, the
editor offers the earlier session and the agent replays its history into the
tab.

## Installing an agent

Some agents are distributed as binaries instead of running through `npx`. The
editor can download them to a folder in your home directory. If the registry
provides a checksum, the editor verifies it.

Nothing is added to your `PATH`. Deleting the folder uninstalls the agent.

## Seeing what it did

Every command from a hosted agent is recorded in the project's audit log, with
the session that ran it. Select **Project > Agent activity**, or:

```bash
dogsbay-xml audit-log
dogsbay-xml sessions
```

## Related

:::cards
- **[Which agent to use](./choosing)** {icon="scale"}
  This or the built-in agent, and when to run both.

- **[The agent, and what it may touch](./overview)** {icon="shield"}
  Tiers, the write gate, and the audit log in full.

- **[Reviewing an agent's changes](./proposals)** {icon="check"}
  What happens to the edits it makes.
:::
