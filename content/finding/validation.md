---
title: Validating a project
description: Check a document or documentation set against its grammar, business rules, and references. Use the checks as a build gate.
type: how-to
---

# Validating a project

DogsBay XML checks document syntax, project rules, and references. Use
`dogsbay-xml check` to run project health checks, build the deliverables, and
check links in the output. You can also run the checks separately.

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
pane. To check the current document, select **XML > Check Well-Formedness**,
**XML > Validate**, or **XML > Schematron**.

## A whole set

```bash
dogsbay-xml validate-project . --map audacity-guide.ditamap
```

The scope decides what is checked. With `--map`, it is that map's publication
set, which is what a build would include. With `--scope` you can point at a
glob or the project root instead.

The command exits with a nonzero status when any file is invalid.

In the editor, **Project > Validate Files** provides project-wide checks
using a DTD, Schematron, DITA-OT, or a subject scheme.

## Business rules with Schematron

Schematron expresses the rules your house style cares about. The sample
project ships one, `house-style.sch`, which requires a short description on
every topic and forbids hardcoded product names in prose.

```bash
dogsbay-xml schematron topics/installing-audacity.dita house-style.sch
dogsbay-xml schematron-project . house-style.sch
```

To set a default schema, specify
[`<default-schematron>`](/reference/project-config) in the project
configuration. The `schematron` and `schematron-project` commands use this
schema when you omit the schema argument. **XML > Schematron** and **Project >
Validate Files > With Schematron** also use it.

If no default schema is configured, the editor prompts you to select one.
The menu label ends in an ellipsis when the command opens this dialog.

The editor and a pipeline report rule failures in the same way because they
use the same engine.

## Is the project ready?

To check whether the project is ready to publish, run:

```bash
dogsbay-xml check .
```

The command runs the project health report, builds the deliverables, and
checks links in the built output. Each stage runs only if the preceding
stage passes. If a stage fails, the command identifies it and exits with
status 1.

The build stage reports something the health report cannot see: **a key
reference this deliverable could not resolve**, where the reference has no
`@href` to fall back on. Health resolves keys against the project's root map,
where a key is usually defined; a deliverable builds a narrower scope, and a
key missing from *that* scope loses a link in that deliverable alone. It is a
warning, printed against the deliverable it belongs to, and you do not need
`--verbose` to see it. In the editor it appears in the **Project Validation**
panel — select a row to open the topic at the line — and the summary counts
them, so "Ready" never stands alone over a set of links that will be missing.

In the editor, select **Project > Check Project**. Results appear in the
**Project Validation** tab.

Use `--no-build` to run only the health report or `--deliverable` to check a
single deliverable. Use `--map` or `--schematron` to override the project's
default root map or Schematron schema.

If no deliverables are defined, the command reports the project as unfinished.
You can run the individual stages described below to check specific aspects
of the project.

## The whole picture

`project-health` is the first stage on its own: reference and key analysis,
grammar validation, the conref element ID audit, the metadata policy, the
project's house rules, controlled values, conref push, index entries, house
style, and authoring leftovers. It also reports open agent proposals.

```bash
dogsbay-xml project-health .
```

The health report checks source files; it does not build deliverables or
check output links. The command uses the project's settings: its default root
map, and its `<default-schematron>` house rules. Use `--map` or `--schematron`
to specify a different map or schema. Use `--map none` to check without the
default map, or `--schematron none` to skip the configured Schematron rules.

A default root map from the project configuration enables key analysis only.
Naming a map with `--map` also scopes validation to that map's publication set.
Otherwise the command validates files that no map includes, and reports orphan
topics.

Two of the checks are reported as **warnings**, and never make a project
unclean on their own: files not in the project's house style, and authoring
leftovers — TODO, FIXME, or TBD in text or comments, `draft-comment`,
`required-cleanup`, and tasks with no steps.

### Reading the result

Every finding is printed, and the run ends with the counts:

```
Summary
  Broken references             1
  Broken element ids            1
  Controlled values             4  in 2 of 36 files
  House rules                  30  in 15 of 36 files
    Every topic needs a shortdesc (a one- or two-sentence descrip…   14
    Use uicontrol for UI labels (and drop decorative bold); do no…    7
    Do not hardcode the product name "Audacity" in prose; use a k…    5
  Metadata policy              49  in 21 of 29 files (28 error(s), 21 warning(s))
    recommended <author> is missing                                  21
    missing required <keyword>                                       21
  Invalid files                 3  of 36
  Not in house style            2  warnings
```

The summary appears last, where it remains visible in a terminal. The command groups house rules and the metadata policy by rule, with the most frequent first. Instead of 30 separate problems, you see "14 missing shortdescs, seven bold labels, and five hardcoded product names," which gives you a practical work plan.

`--summary` prints only that block when you want an overview instead of the full list, and `--severity error` leaves out what does not block a clean result — unused keys, orphans, warnings, and recommended metadata.

A healthy project prints a one-line result. If you use `--include` to limit
the checks, the result lists the checks performed. It does not report the
health of the entire project.

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

To run all three stages in a pipeline, use:

```bash
dogsbay-xml check .
```

The command stops at the first failing stage.

You can also run the stages in separate jobs. Each command exits with a
nonzero status if it finds a problem:

```bash
dogsbay-xml project-health .          # the health report
dogsbay-xml build .                   # the deliverables
dogsbay-xml check-output-links out/   # links in what the build wrote
```

`project-health` covers what `schematron-project`, `validate-conditions`, and
`metadata-audit` report, so add those separately only when you want them to
fail on their own. Run `validate-ot` at the end or on a schedule rather than on
every commit.

### Controlled values

`validate-conditions` reports profiling values that the subject scheme does
not allow. The `conditions` check in `project-health` performs the same
validation. Both use the project's default root map if you omit `--map`. If
no root map is configured, they search the project for `subjectScheme` maps.
The checks follow DITA-OT's subject scheme rules.

## Related

:::cards
- **[Refactoring](./refactoring)** {icon="wand"}
  Fix what validation finds without breaking references.

- **[Metadata](/authoring/metadata)** {icon="tag"}
  Auditing against the metadata policy.
:::
