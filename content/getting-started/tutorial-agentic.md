---
title: "Tutorial: Using an agent to fix a DITA project"
description: Open a DITA project with deliberate errors, find them with the project tools, and fix them with the AI agent.
type: tutorial
---

# Tutorial: Using an agent to fix a DITA project

In this tutorial, you inherit a documentation set that does not build cleanly,
find its problems, and fix some of them with the AI agent.

The project is a DITA user guide for the Audacity audio editor. It ships with the editor, and it is deliberately broken: topics without descriptions, links that point nowhere, a hardcoded product name that should be a key, and conditions that the subject scheme disallows.

**Time:** about 30 minutes.
**You need:** DogsBay XML. See [Installing](./install). You need a subscription or API key only when you reach the agent section.

## Step 1: Open the sample project

:::steps
1. **Select File > Open Sample Project**
   The editor asks where to put it.

2. **Choose a location**
   The editor copies the sample into a new `audacity-demo` folder inside the location
   you choose. It never uses the folder you chose as the project itself, and
   it never overwrites anything: if `audacity-demo` exists, the copy becomes
   `audacity-demo-2`.

3. **Wait for the project to open**
   The Topic Maps panel loads `audacity-guide.ditamap`. The sample already
   includes its publishing configuration.
:::

You now have your own copy to break further and repair.

## Step 2: Open the agent

:::steps
1. **Open the AI Agent panel**
   Open **AI Agent** at the top of the right sidebar. The first tab is the built-in agent,
   which runs with your authority and does not need the integration server.

2. **Choose a provider and sign in**
   Use the provider bar at the top of the panel. The key is stored in your operating system keychain, not in the project.
:::

If you prefer to control Claude Code, Codex, or Gemini from the panel, see [Using a hosted agent](/agent/hosted-agents). A hosted session opens at tier T1 and needs the integration server; the built-in agent needs neither.

## Step 3: Ask it to find and fix the problems

An agent can handle repetitive updates across many topics.

:::steps
1. **Ask for the survey first**
   For example: *Run a project health check on this project, apply house-style.sch, and summarize the problems by kind.* The agent calls the same `project-health` operation as the command line, so the results cover the project instead of a few files. Name the schema because missing short descriptions are a house rule, and the check applies a schema only when you provide one.

2. **Pick one kind of problem**
   *Add a one-sentence shortdesc to every topic that has none.* Naming one kind at a time keeps the review in the next step manageable.

3. **Watch the panel while it works**
   The panel lists each operation as it runs. You can verify that the agent is
   calling the editor's DITA commands instead of rewriting files as text.
:::

The agent works across the project rather than opening each file in turn, because it has the editor's project operations available to it.

## Step 4: Review what it proposes

The agent's edits do not overwrite your files. They arrive as tracked changes.

:::steps
1. **Open the Proposals panel**
   The panel lists each proposed change with the identity that made it.

2. **Select one**
   The editor jumps to the affected part of the document and shows the change
   in place.

3. **Accept or reject it**
   Use **Accept** or **Reject** for one change, or **Accept all** and
   **Reject all** when you have read enough to trust the batch.
:::

This is the part worth slowing down for. The agent proposes; you decide.

## Step 5: Check the project again

```bash
dogsbay-xml project-health . --schematron house-style.sch
```

Fewer problems should remain. What is left is the more interesting work: the
hardcoded product name that should be a key, the conditions that are not in
the subject scheme, and the topic that is too long and should be split.

## What you learned

- The sample project is a copy, so you can experiment freely.
- Project-level checks find problems across files.
- The agent calls the editor's own DITA operations rather than editing text.
- You review the agent's proposed changes and decide whether to accept them.

## Where to go next

:::cards
- **[The agent, and what it may touch](/agent/overview)** {icon="sparkles"}
  Tiers, the write gate, and the audit log.

- **[Reviewing an agent's changes](/agent/proposals)** {icon="check"}
  Proposals in more detail, including comments.
:::
