---
title: Keys and reuse
description: Resolve keys across a map, convert direct references to keys, and move shared content into reuse topics.
type: how-to
---

# Keys and reuse

DITA has two mechanisms for not repeating yourself: keys, which give a name to
a target so the reference does not carry a path, and conrefs, which pull
content from one topic into another. Both create relationships the editor can
show you and change safely.

## Seeing the key space

A map's key space is every key its topics can use, including keys defined in
the maps it includes.

```bash
dogsbay-xml keys audacity-guide.ditamap
```

To ask what one key resolves to:

```bash
dogsbay-xml keys audacity-guide.ditamap --resolve product-name
```

Two things change what a key resolves to, and both are options here.

**Conditions.** A DITAVAL can exclude a key definition, so the same key
resolves differently in different builds:

```bash
dogsbay-xml keys audacity-guide.ditamap --ditaval filters/platform-macos.ditaval
```

**Key scopes.** DITA 1.3 lets a map declare a scope, so a key can mean
different things in different branches of the same map:

```bash
dogsbay-xml keys audacity-guide.ditamap --resolve intro --scope podcaster
```

> [!TIP]
> A key that resolves in the editor but not in a build is usually a
> conditions or scope difference, not a broken key. Resolve it with the same
> DITAVAL the build uses before looking anywhere else.

## Converting direct references to keys

A file referenced by path in twenty topics is twenty edits when it moves. The
`keyify` command converts all of them to key references and adds the key
definition to a map you choose.

```bash
dogsbay-xml keyify topics/installing-audacity.dita installing \
  --root . --map keydefs-product.ditamap
```

That prints the plan. Add `--apply` to make the change.

The reverse, when a key is not earning its indirection:

```bash
dogsbay-xml inline-key installing --root . --map audacity-guide.ditamap --apply
```

The map is needed because it is what resolves the key to the path that
replaces it.

## Moving shared content into a reuse topic

When the same note, step or paragraph appears in several topics, move it once
into a reuse topic and conref it everywhere else.

```bash
dogsbay-xml extract-conref topics/installing-audacity.dita note-backup \
  --to shared/common-notes.dita
```

The element is moved into the reuse topic, which is created if it does not
exist, and a conref stub is left in its place. Add `--apply` to run it.

To undo that relationship, replacing conrefs with a copy of the content:

```bash
dogsbay-xml inline-conref shared/common-notes.dita note-backup --root . --apply
```

Use `--file` to inline only the instances in one topic rather than all of
them.

## Checking that reuse still resolves

Two audits answer different questions.

```bash
dogsbay-xml check-links .
dogsbay-xml conref-audit .
```

`check-links` reports references whose target file is missing, and keys used
but never defined. `conref-audit` is narrower and catches the failure that is
easy to create by accident: the target file exists, but the element id the
conref names is no longer in it.

An element id disappears when someone renames it or deletes the element it was
on, which is why renaming ids is a command rather than an edit:

```bash
dogsbay-xml rename-element-id shared/common-notes.dita note-backup backup-note --apply
```

## Tidying key definitions

When maps are merged or copied, the same key often ends up defined more than
once. Only the first definition wins, so the rest are noise:

```bash
dogsbay-xml merge-keydefs audacity-guide.ditamap --apply
```

## Related

:::cards
- **[Topics and maps](./topics-and-maps)** {icon="file-text"}
  Assembling topics, and renaming without breaking references.

- **[Conditional content](./conditional-content)** {icon="filter"}
  Conditions, branch filtering and controlled values.
:::
