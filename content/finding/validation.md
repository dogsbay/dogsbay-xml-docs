---
title: Validating a project
description: Check a document or documentation set against its grammar, business rules, and references. Use the checks as a build gate.
type: how-to
---

# Validating a project

Validation in DogsBay XML answers three separate questions, and it is worth
keeping them apart because they fail for different reasons.

**Is this well-formed and valid?** The document parses and matches its
grammar, whether that grammar is a DTD, an XML Schema, or RELAX NG.

**Does it follow the project rules?** Schematron checks business rules that a
grammar cannot express. For example, every topic has a short description,
product names are not hardcoded, and metadata is present.

**Does the project hold together?** References resolve, keys are defined, and
every topic belongs to a map. These qualities apply to the project, not to an
individual file.

## One document

Grammar validation resolves catalogs, so a DITA topic validates against the
grammar its DOCTYPE names. A DITA file with no explicit schema falls back to
the bundled DITA grammars, which means it validates the same way in the editor
and headless.

```bash
dogsbay-xml validate topics/installing-audacity.dita
```

In the editor, problems appear in the margin as you type and in the error
pane.

## A whole set

```bash
dogsbay-xml validate-project . --map audacity-guide.ditamap
```

The scope decides what is checked. With `--map`, it is that map's publication
set, which is what a build would include. With `--scope` you can point at a
glob or the project root instead.

The command exits with a nonzero status when any file is invalid.

## Business rules with Schematron

Schematron expresses the rules your house style cares about. The sample
project ships one, `house-style.sch`, which requires a short description on
every topic and forbids hardcoded product names in prose.

```bash
dogsbay-xml schematron topics/installing-audacity.dita house-style.sch
dogsbay-xml schematron-project . house-style.sch
```

The editor and a pipeline report rule failures in the same way because they
use the same engine.

## The whole picture

`project-health` runs reference and key analysis, grammar validation, the conref element-ID audit, and the required-metadata policy. It also reports open agent proposals:

```bash
dogsbay-xml project-health . --map audacity-guide.ditamap --schematron house-style.sch
```

A clean result is the publish-ready gate. Adding `--map` enables key analysis and limits validation to the publication set. Without this option, the command also validates files that no map includes and reports orphaned topics.

`--schematron` adds the project's house rules to the run and its result. Without this option, the gate cannot check those rules. A DTD cannot express a rule such as "every topic needs a shortdesc," so the rule lives in a Schematron schema that the command applies when you name it.

### Reading the result

Every finding is printed, and the run ends with the counts:

```
Summary
  Broken references             1
  Broken element ids            1
  House rules                  30  in 15 of 36 files
    Every topic needs a shortdesc (a one- or two-sentence descrip…   14
    Use uicontrol for UI labels (and drop decorative bold); do no…    7
    Do not hardcode the product name "Audacity" in prose; use a k…    5
  Metadata policy              49  in 21 of 29 files (28 error(s), 21 warning(s))
    recommended <author> is missing                                  21
    missing required <keyword>                                       21
  Invalid files                 3  of 36
```

The summary appears last, where it remains visible in a terminal. The command groups house rules and the metadata policy by rule, with the most frequent first. Instead of 30 separate problems, you see "14 missing shortdescs, seven bold labels, and five hardcoded product names," which gives you a practical work plan.

`--summary` prints only that block when you want an overview instead of the full list:

```bash
dogsbay-xml project-health . --map audacity-guide.ditamap --schematron house-style.sch --summary
```

A healthy project prints one line either way.

## What static validation cannot catch

A key reference can be well-formed and valid but still fail to resolve at build
time because resolution depends on the map, conditions, and scopes.
The only way to be sure is to run the resolution:

```bash
dogsbay-xml validate-ot .
```

The command runs DITA-OT preprocessing for each deliverable and reports what
it cannot resolve. It requires DITA-OT and runs more slowly than the preceding
checks, so it is separate from `project-health`.

## Using these as a gate

Each command exits with a nonzero status when it finds a problem, so a pipeline
can use a short list:

```bash
dogsbay-xml validate-project . --map audacity-guide.ditamap
dogsbay-xml validate-conditions . --map audacity-guide.ditamap
dogsbay-xml project-health . --map audacity-guide.ditamap --schematron house-style.sch
```

`project-health` covers what `schematron-project` and `metadata-audit` report. Add those two commands separately only when you want independent failures. Run the fast checks first. Run `validate-ot` at the end or on a schedule instead of on every commit.

## Related

:::cards
- **[Refactoring](./refactoring)** {icon="wand"}
  Fix what validation finds without breaking references.

- **[Metadata](/authoring/metadata)** {icon="tag"}
  Auditing against the metadata policy.
:::
