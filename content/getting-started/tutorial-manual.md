---
title: "Tutorial: Fixing a DITA project by hand"
description: Open a real DITA project that has problems in it, find them with the project tools, and fix one of them by hand.
type: tutorial
---

# Tutorial: Fixing a DITA project by hand

In this tutorial you inherit a documentation set that does not build cleanly, find out what is wrong with it, and fix part of it by hand.

The project is a DITA user guide for the Audacity audio editor. It ships with the editor, and it is deliberately broken: topics without descriptions, links that point nowhere, a hardcoded product name that should be a key, and conditions that the subject scheme disallows.

**Time:** about 30 minutes.
**You need:** DogsBay XML installed. See [Installing](./install). Nothing else: no agent, and no sign-in.

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

## Step 2: See what is wrong

Rather than opening individual files to look for problems, you can run the project health check from the command line:

```bash
dogsbay-xml project-health . --schematron house-style.sch
```

The report covers specific kinds of problems:

-   References that point at something missing
-   Keys that are used but never defined, or defined and never used
-   Topics that aren't included in any map
-   Files that fail validation against their grammar
-   Required metadata the project's policy says a topic must carry
-   House rules from `house-style.sch`, such as every topic needing a `shortdesc`

The last one needs the `--schematron` option. A rule like "every topic needs a shortdesc" cannot be expressed in a DTD, so it lives in a Schematron schema, and the health check only applies one when you name it.

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


## What you learned

- The sample project is a copy, so you can experiment freely.
- Problems are found at project level, not file by file.
- The Author view and the source view are two views of one document, and your place in it is carried across.

## Where to go next

:::cards
- **[Tutorial: Using an agent to fix a DITA project](./tutorial-agentic)** {icon="sparkles"}
  The same project, with the agent doing the repetitive part.

- **[Validating a project](/finding/validation)** {icon="check"}
  The checks behind the health report you ran.
:::
