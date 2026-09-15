---
title: Previewing and publishing
description: See a styled preview while you write, then build deliverables with DITA-OT.
type: how-to
---

# Previewing and publishing

A preview is immediate and approximate, so you can check your work as you
write. A build is the final output that DITA-OT creates from a
deliverable's map, conditions, and parameters.

## Previewing while you write

Select **View > Preview in Tab**, or **View > Preview in Split** to keep the
source beside it. The preview refreshes as you edit.

The preview is not a plain rendering of the file you have open. It resolves
conrefs, so reused content appears where it is pulled in, and it resolves key
references when it knows which map provides the context.

From the command line:

```bash
dogsbay-xml preview topics/installing-audacity.dita \
  --map audacity-guide.ditamap --output preview.html
```

Two options change what you see:

| Option | Effect |
|---|---|
| `--ditaval` | Apply a filter, so you preview one audience or platform. |
| `--show-changes` | Render open agent proposals as insertions, deletions, and comments instead of the document as it would read with everything accepted. |

Without `--output` the HTML goes to standard output.

## Deliverables

A deliverable defines one output: a map, a transform type, a DITAVAL, parameters,
and an output directory. A project usually has several, such as an HTML guide
for each platform and a PDF for print.

Deliverables come from a DITA project file, which is a standard rather than
something this editor invented, so the same definitions work with DITA-OT
directly.

When a project has no project file, DogsBay XML uses the default root map. You
can therefore build a documentation set that is not yet formalized.

## Building

```bash
dogsbay-xml build .
dogsbay-xml build . html-guide
```

The first builds every deliverable; the second builds one by name. The command
exits with a nonzero status when any build reports errors, so it works as a
pipeline step.

Two options are worth knowing:

| Option | Effect |
|---|---|
| `--dita-ot` | Use a different DITA-OT than the one the project configures. |
| `--output` | Put the output somewhere else, each deliverable under its own subdirectory. |
| `--keep-temp` | Keep DITA-OT's temporary files. See [Keeping temporary files](#keeping-temporary-files). |

Building requires DITA-OT. The sample project is configured with one already.

## Keeping temporary files

DITA-OT normally deletes its temporary files when a build finishes. These are the preprocessed files it publishes from, with conrefs, keys, and filtering already applied, so they show exactly what DITA-OT resolved. Keep them when output is missing content or a condition does not filter the way you expect.

To keep them for a deliverable, open **Project > Manage Deliverables**, edit the deliverable, and select **Keep temporary files**. This sets the standard DITA-OT parameter `clean.temp` to `no`, so the setting also works when you build with DITA-OT directly. To keep them for one build only, use `dogsbay-xml build . --keep-temp`.

The files are kept in `.dogsbay/temp/<deliverable>` in the project. Each build replaces its deliverable's previous temporary files, and the folder is ignored by Git. After a build, select **Open Temp Folder** in the results to open it. To remove every kept folder, select **Project > Clear Temporary Build Files**.

Agents can ask for the files with the `keepTemp` option of the `build_deliverables` tool, then read them to find out why a build did not produce what you expected.

## Checking before you publish

A build that succeeds can still be missing content, because a key that fails
to resolve does not always stop the build.

```bash
dogsbay-xml validate-deliverables .
dogsbay-xml validate-ot .
```

`validate-deliverables` validates each deliverable with its own map and
conditions. It lists each invalid file once, with the deliverables it breaks. `validate-ot` goes further and runs DITA-OT preprocessing, which
is the only way to catch a key or conref that resolves in one build and not in
another.

Before either, the cheaper check:

```bash
dogsbay-xml project-health . --map audacity-guide.ditamap
```

## Related

:::cards
- **[Conditional content](/authoring/conditional-content)** {icon="filter"}
  What each deliverable's DITAVAL includes and excludes.

- **[Validating a project](/finding/validation)** {icon="check"}
  The checks worth running before a build.
:::
