---
title: The agent, and what it may touch
description: How the built-in agent and hosted agents differ, which tools they get, and the limits that apply before any change reaches a file.
type: explanation
---

# The agent, and what it may touch

DogsBay XML can run two kinds of AI agent, and the difference matters more
than it first appears.

The **built-in agent** runs inside the editor. You choose a provider,
DogsBay XML holds the conversation, and the agent calls the editor's own
operations directly.

A **hosted agent** is a separate program that you already use, such as Claude Code, Codex, Gemini CLI, OpenCode or Goose. The editor starts it, talks to it over the Agent Client Protocol, and lends it the editor's DITA tools. It keeps its own sign-in and its own model, so your subscription to it applies.

[Which agent to use](./choosing) compares the two; this page is about what either of them may touch.

Both appear in the **AI Agent** panel on the right. The built-in agent is the
first tab; each hosted agent you start gets a tab of its own.

## Why the agent understands DITA

Whichever kind you use, the agent does not get a text editor and a folder of
files. It gets the operations the editor itself runs: validate this document
against its grammar, list the keys in this map's key space, find everything
that references this topic, rename a key across the project, audit the
project's health.

Two consequences follow. The agent can act on a whole project without opening
every file, and a change it makes goes through the same code as the equivalent
menu command, so it obeys the same rules.

## What limits an agent

Three mechanisms apply, in this order.

### Capability tier

You choose a tier when a hosted agent session opens. The agent never chooses
it.

| Tier | The agent can |
|---|---|
| **T1** | Call the editor's DITA commands. No file access. |
| **T2** | Also read project files through the editor, including unsaved buffers. |
| **T3** | Also write through the editor. Writes still pass the write gate. |

New hosted sessions default to T1. The tier shows as a badge on the session
so it is visible while you work.

> [!IMPORTANT]
> Some agents read and write the disk themselves, through their own tools,
> regardless of what the editor offers. Where that is true the session is
> Tier 3 by construction and the badge says so. The tier limits what the
> editor lends the agent; it cannot limit what the agent already has.

### The write gate

Every change from an agent session passes one checkpoint, which applies three
tests.

**Containment.** A hosted or external agent can only write inside the open
project. Symbolic links are resolved first, so a link out of the project does
not become a way around it.

**Conflict.** An agent may only write a document it has read during this
session, and only while that document still holds what the agent read. If the
file changed underneath it, the write is refused and the agent is told to read
again. The current content comes back with the refusal, so it can.

**Lease.** One agent session may hold a document at a time. Leases expire, so
an agent that crashes does not hold a file forever. You are never leased and
never refused.

### Proposals

When an agent edits a DITA file, the change is recorded as a tracked change
rather than applied silently. You accept or reject it in the **Proposals**
panel. See [Reviewing an agent's changes](./proposals).

## What is recorded

Agent commands are appended to an audit log in the project, at
`.dogsbay/agent-audit/commands.jsonl`. Each line records the time, the
session, its identity, the command, the files, whether it was a dry run, and
the outcome.

Your own commands are not recorded. Tokens are never written to it. The log
is excluded from version control on creation, so it does not reach the team
repository.

To read it, select **Project > Agent activity**, or run:

```bash
dogsbay-xml audit-log
```

### Session transcripts

The audit log records what the agent did. The transcript records the conversation it did it in, and the two answer different questions: the log says which command touched which file, the transcript says what you asked for and what it said back.

Each conversation with the built-in agent is a file in `~/.xagent/sessions`, outside the project, so nothing reaches the team repository.

Select **Sessions** in the AI Agent panel, or type `/sessions`, to see them: every session with its date and name, and buttons to resume one, start a new one, or delete one. The conversation in progress cannot be deleted — the agent is still writing to it.

A session is named after the first thing you asked it, so the list reads as a list of questions. To give one a name of your own, right-click or double-click the tab and select **Rename session**, or type `/rename Audacity cleanup`. A blank name restores the automatic one. The name is stored in the transcript, so it survives a restart, shows in the picker, and names the file when you export the conversation.

Transcripts are kept until you remove them. To have the editor clear out old ones, set an age in **File > Preferences > Server > Agent sessions**: transcripts last written longer ago than that are deleted when the editor starts. The default is to keep everything.

> [!NOTE]
> This is the built-in agent's history. A hosted agent keeps its own, and `dogsbay-xml sessions` is a different thing again: the sessions currently connected to a running editor, not the transcripts on disk.

## What each kind of agent needs

| | Built-in agent | Hosted agent |
|---|---|---|
| Sign-in | An API key, or a ChatGPT sign-in | Its own, as you already use it |
| Where the key is stored | Your operating system keychain | The agent's own configuration |
| Integration server | Not required | Required, for the editor's tools |
| Tier | Runs as you | You choose, T1 by default |

The integration server is off until you turn it on in **File > Preferences > Server**.

Subscriptions work on both sides, but not the same ones. The built-in agent can sign in to ChatGPT, which is the one subscription it understands; for Anthropic and Google it wants an API key. A hosted agent signs itself in however it already does, so a Claude Code or Codex subscription reaches the editor through the agent rather than through us. Where an agent offers both, the editor prefers the browser sign-in over an API key, and only passes a key you have saved if you ask it to.

## Related

:::cards
- **[Which agent to use](./choosing)** {icon="scale"}
  What each kind is good for, and when to run both.

- **[Using Claude Code, Codex or Gemini](./hosted-agents)** {icon="terminal"}
  Starting a hosted agent, and what it needs.
:::
