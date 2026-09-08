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

A **hosted agent** is a separate program that you already use, such as Claude
Code, Codex or Gemini CLI. The editor starts it, talks to it over the Agent
Client Protocol, and lends it the editor's DITA tools. It keeps its own
sign-in and its own model.

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

## What each kind of agent needs

| | Built-in agent | Hosted agent |
|---|---|---|
| Sign-in | An API key, or a ChatGPT sign-in for Codex | Its own, as you already use it |
| Where the key is stored | Your operating system keychain | The agent's own configuration |
| Integration server | Not required | Required, for the editor's tools |
| Tier | Runs as you | You choose, T1 by default |

The integration server is off until you turn it on in **File > Preferences >
Server**.
