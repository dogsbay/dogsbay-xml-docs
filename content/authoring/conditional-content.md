---
title: Conditional content
description: Profile content with conditions, filter it with DITAVAL, and keep the values under control with a subject scheme.
type: how-to
---

# Conditional content

Conditional content enables one source to produce several outputs, such as a
Windows guide and a macOS guide from the same topics, or beginner and expert
versions. You mark content with profiling attributes, and a DITAVAL file
decides what each build includes.

The challenge is keeping the values consistent.

## Marking content

Profiling attributes such as `platform`, `audience` and `product` go on any
element. The editor knows which values are in use in the project, so you are
choosing from what exists rather than typing a new one by accident.

## Filtering a build

A DITAVAL file lists which values to include and exclude. The sample project
keeps them in `filters/`:

```
filters/platform-macos.ditaval
filters/platform-windows.ditaval
filters/mac-beginner.ditaval
```

A DITAVAL affects more than the text that survives. It also conditions the key
space, so a key can resolve to different targets in different builds:

```bash
dogsbay-xml keys audacity-guide.ditamap --ditaval filters/platform-macos.ditaval
```

## Branch filtering

DITA 1.3 lets a map apply a DITAVAL to one branch, with `ditavalref`, so the
same topics appear more than once in one map under different conditions. That
is how one map produces a Windows chapter and a macOS chapter.

To see the variants a map produces:

```bash
dogsbay-xml list-branches audacity-guide.ditamap
```

Branch filtering is resolved by DITA-OT at build time. The editor shows you
the variants a map declares; it does not itself produce a filtered build.

## The problem with uncontrolled values

Nothing in DITA stops you from writing `platform="macos"` in one topic and
`platform="mac"` in another. Both are valid XML and both validate against the
grammar.

The build then silently drops the topic that uses the value your DITAVAL does
not mention. The build reports no error, but the output is missing a step. A
reader might be the first person to notice.

## Controlling values with a subject scheme

A subject scheme map declares which values an attribute may take. It turns a
typo from an invisible content loss into something you can find.

Select **Project > Map > Controlled Values…** to list the allowed values for
each profiling attribute governed by a subject scheme. The view uses the
active deliverable's map, then the map in the Map Explorer, then the project's
default root map. It reads subject schemes referenced by that map and its
included maps. Both this view and `validate-conditions` list attributes
alphabetically by name.

**Check Project** can also find subject schemes elsewhere in the project when
none is found through the default root map. It can therefore report values
that the view does not list. A value outside the allowed set causes **Check
Project** to fail; a DITA-OT build reports a warning.

From the command line:

```bash
dogsbay-xml list-subjects keydefs-glossary.ditamap
```

To find content that breaks it:

```bash
dogsbay-xml validate-conditions . --map audacity-guide.ditamap
```

The command scans the map's publication set and reports every profiling value
that the scheme does not allow. It exits with a nonzero status when it finds any,
so it works as a pipeline gate.

If you omit `--map`, the command looks for subject schemes through the
project's default root map. If no root map is configured, or that map provides
no subject scheme definitions, it searches the project for subject scheme
maps. An explicit `--map` limits scheme discovery to that map and its included
maps.

The command follows DITA-OT's subject scheme rules. It combines bindings from
multiple definitions. A subject referenced by an `enumerationdef` defines the
dimension; its child subjects define the allowed values.

Use `--scope` to limit the scan to one map, a glob, or the project root. The
`conditions` check in `project-health` runs the same validation. In the
editor, select **Project > Validate Files > Controlled Values (Subject Scheme)**.

## Renaming a value everywhere

When a value does need to change, change it as a refactoring rather than by
search and replace, so every use moves together:

```bash
dogsbay-xml rename-profile-value platform mac macos --root .
dogsbay-xml rename-profile-value platform mac macos --root . --apply
```

The first prints the plan; the second applies it.

## A useful order

:::steps
1. **Declare the vocabulary**
   Write the subject scheme first, so the values exist before content uses
   them.

2. **Check what is already there**
   Run `validate-conditions` over the existing content and fix what it finds
   with `rename-profile-value`.

3. **Add the check to your pipeline**
   It exits with a nonzero status, so a build fails on a new typo rather than shipping
   without the content.
:::

## Related

:::cards
- **[Keys and reuse](./keys-and-reuse)** {icon="key"}
  Why the same key resolves differently under different conditions.

- **[Publishing](/publishing/publishing)** {icon="package"}
  Deliverables, each with its own map and DITAVAL.
:::
