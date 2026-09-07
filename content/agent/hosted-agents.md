---
title: Using Claude Code, Codex or Gemini
description: Run an agent you already have inside the editor, and lend it the editor's DITA tools.
type: how-to
---

# Using Claude Code, Codex or Gemini

The editor can run an agent you already use as a separate program, and lend it
the editor's DITA operations. The agent keeps its own sign-in and its own
model; the editor supplies the tools and the limits.

This works with any agent that speaks the Agent Client Protocol. Claude Code,
Codex and Gemini CLI are the ones most people have.

## Before you start

Turn on the integration server, which is how the agent reaches the editor's
tools. Select **File > Preferences > Server** and enable it.

## Starting a session

:::steps
1. **Open the AI Agent panel**
   It is on the right-hand sidebar. The first tab is the built-in agent.

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
| **T1** | Call the editor's DITA commands, and nothing else |
| **T2** | Also read project files through the editor, unsaved buffers included |
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

Right-click a tab to rename it, export the transcript, copy it, or close it.
Closing the tab ends the session.

Sessions are remembered. When you start an agent that supports resuming, the
editor offers the earlier session and the agent replays its history into the
tab.

## Installing an agent

Some agents are distributed as a binary rather than run through `npx`. The
editor can download those for you, into a folder under your home directory,
verifying the checksum where the registry provides one.

Nothing is added to your `PATH`. Deleting the folder uninstalls the agent.

## Seeing what it did

Every command from a hosted agent is recorded in the project's audit log, with
the session that ran it. Select **Project > Agent activity**, or:

```bash
bin/dogsbay-xml audit-log
bin/dogsbay-xml sessions
```

## Related

:::cards
- **[The agent, and what it may touch](./overview)** {icon="shield"}
  Tiers, the write gate and the audit log in full.

- **[Reviewing an agent's changes](./proposals)** {icon="check"}
  What happens to the edits it makes.
:::
