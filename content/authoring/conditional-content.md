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

To see what a scheme allows:

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

Use `--scope` to limit the scan to one map, a glob, or the project root.

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
