---
title: Refactoring
description: Rename, move, split and restructure content without breaking the references that point at it.
type: how-to
---

# Refactoring

A documentation set is a graph. Renaming a file, a key or an element id
changes something other files point at, and the editor's refactorings exist so
that the pointers move with the thing they point at.

## The rule that makes them safe

Every refactoring prints a plan and changes nothing. You read the plan, then
run the same command again with `--apply`.

```bash
bin/dogsbay-xml rename-key product-name product --root .
bin/dogsbay-xml rename-key product-name product --root . --apply
```

In the editor the same plan appears as a table you review before it runs.

> [!NOTE]
> Two commands work the other way round. `edit-map` and `edit-reltable` write
> unless you pass `--dry-run`, and so does `metadata-set`. They are editors
> rather than refactorings.

## Before you change anything

Ask what depends on it:

```bash
bin/dogsbay-xml where-used topics/installing-audacity.dita \
  --root . --map audacity-guide.ditamap
```

With `--map`, the report includes references that reach the file indirectly
through a key, which are the ones a search would miss.

## What each refactoring is for

**Moving and renaming**

| Command | Use it when |
|---|---|
| `rename-file` | A file's name or location is wrong. |
| `rename-key` | A key's name is wrong, or you are aligning a naming scheme. |
| `rename-element-id` | An element id is wrong and conrefs point at it. |
| `rename-profile-value` | A condition value changes, such as `mac` becoming `macos`. |
| `delete-file` | A file should go. It reports inbound references first, so you find out before rather than after. |
| `retarget` | Two files should become one: point every reference from one at the other. |

**Changing how content is referenced**

| Command | Use it when |
|---|---|
| `keyify` | A file is referenced by path in many places and should be a key. |
| `inline-key` | A key is not earning its indirection. |
| `extract-conref` | The same content is repeated and should be reused from one place. |
| `inline-conref` | Reused content should become a local copy again. |
| `create-keydef` | You want a text key, such as a product name, defined once. |
| `merge-keydefs` | A map's closure defines the same key more than once and only the first can win. |

**Restructuring**

| Command | Use it when |
|---|---|
| `split-topic` | A topic has grown into several. Each top-level section becomes a topic, and the map is updated to include them. |

## A worked example

Turning a hardcoded product name into a key, which is one of the problems
planted in the sample project:

:::steps
1. **Define the key**
   The key name and the text it resolves to are the two arguments; the map
   that receives the definition is an option.
   ```bash
   bin/dogsbay-xml create-keydef product-name Audacity \
     --map keydefs-product.ditamap --apply
   ```

2. **Replace the hardcoded text as well**
   `--replace-in` rewrites whole-word occurrences of the text under a root
   into key references, which is the part that would otherwise be a hundred
   manual edits.
   ```bash
   bin/dogsbay-xml create-keydef product-name Audacity \
     --map keydefs-product.ditamap --replace-in topics
   ```

3. **Apply it**
   Run the same command with `--apply` once the plan looks right.

4. **Check the result**
   ```bash
   bin/dogsbay-xml project-health . --map audacity-guide.ditamap
   ```
:::

## When a refactoring refuses

A refactoring that would create a broken reference reports the problem instead
of doing it. That is the intended behaviour: the plan is the point, and a plan
that cannot be carried out safely is worth seeing before it runs rather than
finding in the output later.

## Related

:::cards
- **[Validating a project](./validation)** {icon="check"}
  Finding what needs fixing, and confirming it afterwards.

- **[Keys and reuse](/authoring/keys-and-reuse)** {icon="key"}
  The mechanisms these refactorings move between.
:::
