---
title: "Tutorial: Using an agent to fix a DITA project"
description: Open a real DITA project that has problems in it, find them with the project tools, and fix them with the AI agent.
type: tutorial
---

# Tutorial: Using an agent to fix a DITA project

In this tutorial you inherit a documentation set that does not build cleanly,
find out what is wrong with it, and fix part of it with the AI agent.

The project is a DITA user guide for the Audacity audio editor. It ships with the editor, and it is deliberately broken: topics without descriptions, links that point nowhere, a hardcoded product name that should be a key, and conditions that the subject scheme disallows.

**Time:** about 30 minutes.
**You need:** DogsBay XML installed. See [Installing](./install). A subscription or API key for the agent section is useful but not required until then.

## Step 1: Open the sample project

:::steps
1. **Select File > Open Sample Project**
   The editor asks where to put it.

2. **Choose a location**
   The sample is copied into a new `audacity-demo` folder inside the location
   you choose. It never uses the folder you chose as the project itself, and
   it never overwrites anything: if `audacity-demo` exists, the copy becomes
   `audacity-demo-2`.

3. **Wait for the project to open**
   The Topic Map explorer loads `audacity-guide.ditamap`, and publishing is
   configured, without you setting anything up.
:::

You now have your own copy to break further and repair.

## Step 2: Open the agent

:::steps
1. **Open the AI Agent panel**
   It is on the right-hand sidebar. The first tab is the built-in agent, which runs as you and needs no integration server.

2. **Choose a provider and sign in**
   Use the provider bar at the top of the panel. The key is stored in your operating system keychain, not in the project.
:::

If you would rather drive Claude Code, Codex or Gemini from the panel instead, see [using a hosted agent](/agent/hosted-agents). A hosted session opens at tier T1 and needs the integration server; the built-in agent needs neither.

## Step 3: Ask it to find and fix the problems

Fixing thirty topics by hand is the wrong tool. This is what the agent is for.

:::steps
1. **Ask for the survey first**
   Something like: *Run a project health check on this project, applying house-style.sch, and summarise what is wrong, grouped by kind.* The agent calls the same `project-health` operation the command line does, so the answer is the project's, not a guess from reading a few files. Naming the schema matters: the missing shortdescs are a house rule, and the check only applies one when it is given.

2. **Pick one kind of problem**
   *Add a one-sentence shortdesc to every topic that has none.* Naming one kind at a time keeps the review in the next step manageable.

3. **Watch the panel while it works**
   Each operation it calls is listed as it runs, so you can see it is calling the editor's DITA commands rather than rewriting files as text.
:::

The agent works across the project rather than opening each file in turn, because it has the editor's project operations available to it.

## Step 4: Review what it proposes

The agent's edits do not overwrite your files. They arrive as tracked changes.

:::steps
1. **Open the Proposals panel**
   Each proposed change is listed with the identity that made it.

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
- Problems are found at project level, not file by file.
- The agent calls the editor's own DITA operations rather than editing text.
- Its changes are reviewable before they land: it proposes, you decide.

## Where to go next

:::cards
- **[The agent, and what it may touch](/agent/overview)** {icon="sparkles"}
  Tiers, the write gate, and the audit log.

- **[Reviewing an agent's changes](/agent/proposals)** {icon="check"}
  Proposals in more detail, including comments.
:::
