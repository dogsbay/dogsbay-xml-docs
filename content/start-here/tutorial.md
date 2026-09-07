---
title: "Tutorial: fixing a DITA guide"
description: Open a real DITA project that has problems in it, find them with the project tools, and fix some of them with the AI agent.
type: tutorial
---

# Tutorial: fixing a DITA guide

In this tutorial you inherit a documentation set that does not build cleanly,
find out what is wrong with it, and fix part of it with the AI agent.

The project is a DITA user guide for the Audacity audio editor. It ships with
the editor, and it is deliberately broken: topics without descriptions, links
that point nowhere, a hardcoded product name that should be a key, and
conditions that no subject scheme allows.

**Time:** about 30 minutes.
**You need:** DogsBay XML installed. See [Installing](./install). An API key
for the agent section is useful but not required until then.

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
   The Map Explorer loads `audacity-guide.ditamap`, and publishing is
   configured, without you setting anything up.
:::

You now have your own copy to break further and repair.

## Step 2: See what is wrong

Rather than opening files to look for problems, ask the project.

Run the health check from the command line:

```bash
bin/dogsbay-xml project-health .
```

The report covers three kinds of problem at once: references that point at
something missing, keys that are used but never defined or defined but never
used, topics that no map includes, and files that fail validation against
their grammar.

Read the output before you change anything. The point of this step is that
the answer is a property of the project, not of the file you happen to have
open.

> [!TIP]
> `check-links` and `health` are narrower and faster if you only want one
> part of that picture.

## Step 3: Fix one problem by hand

Pick a topic that has no short description.

:::steps
1. **Open the topic**
   Select it in the Explorer.

2. **Switch to the Author view**
   Select **View > Document Views > Author**, or use the view buttons in the
   menu bar. The topic is shown as blocks rather than as tags.

3. **Add a short description**
   Put the cursor after the title and use the insert menu to add a
   `shortdesc`, then write one sentence that says what the topic is for.

4. **Save**
   Select **File > Save**. The XML is written back with your formatting
   intact.
:::

Now switch back with **View > Document Views > Editor** and confirm the
element is where you expect. The two views are the same document, and your
place in it is carried across.

## Step 4: Let the agent do the rest

Fixing thirty topics by hand is the wrong tool. This is what the agent is for.

:::steps
1. **Open the AI Agent panel**
   It is on the right-hand sidebar.

2. **Choose a provider and sign in**
   Use the provider bar at the top of the panel. The key is stored in your
   operating system keychain, not in the project.

3. **Ask for the change**
   Type: `Add a short description to every topic that has none. Keep them to
   one sentence and lead with what the topic is for.`
:::

The agent works across the project rather than opening each file in turn,
because it has the editor's project operations available to it.

## Step 5: Review what it proposes

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

## Step 6: Check the project again

```bash
bin/dogsbay-xml project-health .
```

Fewer problems should remain. What is left is the more interesting work: the
hardcoded product name that should be a key, the conditions that are not in
the subject scheme, and the topic that is too long and should be split.

## What you learned

- The sample project is a copy, so you can experiment freely.
- Problems are found at project level, not file by file.
- The Author view and the source view are two views of one document.
- The agent works across a project, and its changes are reviewable before
  they land.

## Where to go next

:::cards
- **[The agent, and what it may touch](/agent/overview)** {icon="sparkles"}
  Tiers, the write gate, and the audit log.

- **[Reviewing an agent's changes](/agent/proposals)** {icon="check"}
  Proposals in more detail, including comments.
:::
