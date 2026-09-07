---
title: Validating a project
description: Check one document or a whole set against its grammar, business rules and references, and use the same checks as a build gate.
type: how-to
---

# Validating a project

Validation in DogsBay XML answers three separate questions, and it is worth
keeping them apart because they fail for different reasons.

**Is this well-formed and legal?** The document parses and matches its
grammar, whether that is a DTD, an XML Schema or RelaxNG.

**Does it follow our rules?** Business rules a grammar cannot express: every
topic has a short description, no hardcoded product names, metadata is
present. This is Schematron.

**Does it hold together?** References resolve, keys are defined, no topic is
orphaned. This is a property of the project, not of any file.

## One document

Grammar validation resolves catalogs, so a DITA topic validates against the
grammar its DOCTYPE names. A DITA file with no explicit schema falls back to
the bundled DITA grammars, which means it validates the same way in the editor
and headless.

```bash
bin/dogsbay-xml validate topics/installing-audacity.dita
```

In the editor, problems appear in the margin as you type and in the error
pane.

## A whole set

```bash
bin/dogsbay-xml validate-project . --map audacity-guide.ditamap
```

The scope decides what is checked. With `--map`, it is that map's publication
set, which is what a build would include. With `--scope` you can point at a
glob or the project root instead.

It exits with a non-zero status when any file is invalid.

## Business rules with Schematron

Schematron expresses the rules your house style cares about. The sample
project ships one, `house-style.sch`, which requires a short description on
every topic and forbids hardcoded product names in prose.

```bash
bin/dogsbay-xml schematron topics/installing-audacity.dita house-style.sch
bin/dogsbay-xml schematron-project . house-style.sch
```

A rule that fails here fails the same way in a pipeline, because it is the
same engine.

## The whole picture

`project-health` runs the reference and key analysis, grammar validation and
the conref element-id audit together, and reports open agent proposals:

```bash
bin/dogsbay-xml project-health . --map audacity-guide.ditamap
```

A clean result is the publish-ready gate. Adding `--map` enables key analysis
and scopes validation to the publication set, which is usually what you want:
without it, files no map includes are validated too, and orphans are reported
rather than skipped.

## What static validation cannot catch

A key reference can be well-formed, legal and still fail to resolve at build
time, because resolution depends on the map, the conditions and the scopes.
The only way to be sure is to run the resolution:

```bash
bin/dogsbay-xml validate-ot .
```

That runs DITA-OT preprocessing per deliverable and reports what it cannot
resolve. It needs DITA-OT, and it is slower than everything above, which is
why it is a separate command rather than part of `project-health`.

## Using these as a gate

Each of these exits non-zero when it finds something, so a pipeline can be a
short list:

```bash
bin/dogsbay-xml validate-project . --map audacity-guide.ditamap
bin/dogsbay-xml schematron-project . house-style.sch
bin/dogsbay-xml metadata-audit . --map audacity-guide.ditamap
bin/dogsbay-xml validate-conditions . --map audacity-guide.ditamap
bin/dogsbay-xml project-health . --map audacity-guide.ditamap
```

Run the cheap checks first. `validate-ot` belongs at the end, or on a
schedule, rather than on every commit.

## Related

:::cards
- **[Refactoring](./refactoring)** {icon="wand"}
  Fixing what validation finds, without breaking references.

- **[Metadata](/authoring/metadata)** {icon="tag"}
  Auditing against the metadata policy.
:::
