---
title: Previewing and publishing
description: See a styled preview while you write, then build deliverables with DITA-OT.
type: how-to
---

# Previewing and publishing

There are two different things here. A preview is immediate and approximate,
for checking as you write. A build is the real output, produced by DITA-OT
from a deliverable's map, conditions and parameters.

## Previewing while you write

Select **View > Preview in Tab**, or **View > Preview in Split** to keep the
source beside it. The preview refreshes as you edit.

The preview is not a plain rendering of the file you have open. It resolves
conrefs, so reused content appears where it is pulled in, and it resolves key
references when it knows which map provides the context.

From the command line:

```bash
bin/dogsbay-xml preview topics/installing-audacity.dita \
  --map audacity-guide.ditamap --output preview.html
```

Two options change what you see:

| Option | Effect |
|---|---|
| `--ditaval` | Apply a filter, so you preview one audience or platform. |
| `--show-changes` | Render open agent proposals as insertions, deletions and comments, instead of the document as it would read with everything accepted. |

Without `--output` the HTML goes to standard output.

## Deliverables

A deliverable is one output: a map, a transform type, a DITAVAL, parameters
and an output directory. A project usually has several, such as an HTML guide
for each platform and a PDF for print.

Deliverables come from a DITA project file, which is a standard rather than
something this editor invented, so the same definitions work with DITA-OT
directly.

When a project has no project file, the default root map is used, which is
enough to get a build out of a set that has not been formalised yet.

## Building

```bash
bin/dogsbay-xml build .
bin/dogsbay-xml build . html-guide
```

The first builds every deliverable; the second builds one by name. The command
exits with a non-zero status when any build reports errors, so it works as a
pipeline step.

Two options are worth knowing:

| Option | Effect |
|---|---|
| `--dita-ot` | Use a different DITA-OT than the one the project configures. |
| `--output` | Put the output somewhere else, each deliverable under its own subdirectory. |

Building requires DITA-OT. The sample project is configured with one already.

## Checking before you publish

A build that succeeds can still be missing content, because a key that fails
to resolve does not always stop the build.

```bash
bin/dogsbay-xml validate-deliverables .
bin/dogsbay-xml validate-ot .
```

`validate-deliverables` validates each deliverable with its own map and
conditions. `validate-ot` goes further and runs DITA-OT preprocessing, which
is the only way to catch a key or conref that resolves in one build and not in
another.

Before either, the cheaper check:

```bash
bin/dogsbay-xml project-health . --map audacity-guide.ditamap
```

## Related

:::cards
- **[Conditional content](/authoring/conditional-content)** {icon="filter"}
  What each deliverable's DITAVAL includes and excludes.

- **[Validating a project](/finding/validation)** {icon="check"}
  The checks worth running before a build.
:::
