---
title: Topics and maps
description: Write topics in the source or Author view, assemble them into maps, and edit map structure without breaking references.
type: how-to
---

# Topics and maps

A DITA project is topics plus the maps that assemble them. The editor gives
you two ways to write a topic and two ways to change a map.

## Writing a topic

Each open document offers more than one view of the same file. Switch between
them with **View > Document Views**.

**Editor** shows the XML source. The document's declared grammar controls
completion, and the view provides folding and validation errors in the margin.

**Author** shows the topic as blocks rather than tags: titles, paragraphs,
notes, lists, tables, and figures, with the structure visible at the edge. The
insert menu offers only what the content model allows at the cursor, so a
topic that has its title is not offered a second one.

Both views edit the same document. Switching carries your place across, and
undo is shared, so a change made in one view can be undone in the other.

The Author view preserves markup that it does not visualize, such as
conditional attributes or unusual elements.

**Author split** shows source and blocks side by side, which is useful while
you are learning what a block corresponds to.

## Assembling a map

The **Topic Maps** panel in the left sidebar shows the map as a tree. Open a
map to see its topic references, nested maps and relationship tables.

To change the structure, edit the map in the panel, or use `edit-map` from the
command line for a change you want to script or repeat:

```bash
dogsbay-xml edit-map audacity-guide.ditamap insert \
  --parent / --href topics/new-topic.dita --navtitle "New topic"
```

The operation is `set-attr`, `insert`, `remove`, or `move`. Specify each target
as an element ID or a child path such as `/1/3`. Structural edits preserve
the file's formatting and keep references intact.

> [!NOTE]
> `edit-map` writes unless you pass `--dry-run`, which is the opposite of the
> refactoring commands. Those print a plan and do nothing until you pass
> `--apply`.

## Before you rename or move anything

Ask what depends on it first:

```bash
dogsbay-xml where-used topics/installing-audacity.dita --root .
```

The report covers references from maps, conrefs, links, and images. Add
`--map` to include references that reach the file indirectly through a key:

```bash
dogsbay-xml where-used topics/installing-audacity.dita \
  --root . --map audacity-guide.ditamap
```

Then let the editor do the rename, so the references follow:

```bash
dogsbay-xml rename-file topics/installing-audacity.dita topics/installing.dita
dogsbay-xml rename-file topics/installing-audacity.dita topics/installing.dita --apply
```

The first command shows what would change. The second does it.

> [!WARNING]
> Renaming a topic in a file manager leaves every reference to it pointing to
> a file that is no longer there. `check-links` finds those broken references
> after the fact, but renaming through the editor avoids creating them.

## Splitting a topic that grew

You can split a topic at its sections and update the map to include the new
files:

```bash
dogsbay-xml split-topic topics/editing-techniques.dita --apply
```

## Checking the result

```bash
dogsbay-xml project-health .
```

A clean report means references resolve, keys are defined and used, no topic
is orphaned, and every file validates against its grammar.
