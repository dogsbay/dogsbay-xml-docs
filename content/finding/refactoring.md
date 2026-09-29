---
title: Refactoring
description: Rename, move, split, and restructure content without breaking its references.
type: how-to
---

# Refactoring

Files in a documentation set depend on one another. When you rename a file,
key, or element ID, references in other files must change too. The editor's
refactoring commands update those references.

## The rule that makes them safe

Every refactoring prints a plan and changes nothing. You read the plan, then
run the same command again with `--apply`.

```bash
dogsbay-xml rename-key product-name product --root .
dogsbay-xml rename-key product-name product --root . --apply
```

In the editor the same plan appears as a table you review before it runs.

> [!NOTE]
> Two commands work the other way round. `edit-map` and `edit-reltable` write
> unless you pass `--dry-run`, and so does `metadata-set`. They are editors
> rather than refactorings.

## Before you change anything

Ask what depends on it:

```bash
dogsbay-xml where-used topics/installing-audacity.dita \
  --root . --map audacity-guide.ditamap
```

With `--map`, the report includes references that reach the file indirectly
through a key, which are the ones a search would miss.

## What each refactoring is for

### Moving and renaming

| Command | Use it when |
|---|---|
| `rename-file` | A file's name or location is wrong. |
| `rename-key` | A key's name is wrong, or you are aligning a naming scheme. |
| `rename-element-id` | An element ID is wrong and conrefs point at it. |
| `rename-profile-value` | A condition value changes, such as `mac` becoming `macos`. |
| `delete-file` | A file should go. It reports inbound references first, so you find out before rather than after. |
| `retarget` | Two files should become one: point every reference from one at the other. |

### Changing how content is referenced

| Command | Use it when |
|---|---|
| `keyify` | A file is referenced by path in many places and should be a key. |
| `inline-key` | A key is not earning its indirection. |
| `extract-conref` | The same content is repeated and should be reused from one place. |
| `inline-conref` | Reused content should become a local copy again. |
| `create-keydef` | You want a text key, such as a product name, defined once. |
| `merge-keydefs` | A map's closure defines the same key more than once and only the first can win. |

### Restructuring

| Command | Use it when |
|---|---|
| `split-topic` | A topic has grown into several. Each top-level section becomes a topic, and the map is updated to include them. |

## A worked example

This example turns a hardcoded product name into a key. It fixes one of the
problems in the sample project.

:::steps
1. **Define the key**
   The key name and the text it resolves to are the two arguments; the map
   that receives the definition is an option.
   ```bash
   dogsbay-xml create-keydef product-name Audacity \
     --map keydefs-product.ditamap --apply
   ```

2. **Replace the hardcoded text as well**
   `--replace-in` rewrites whole-word occurrences of the text under a root
   into key references, which is the part that would otherwise be a hundred
   manual edits.
   ```bash
   dogsbay-xml create-keydef product-name Audacity \
     --map keydefs-product.ditamap --replace-in topics
   ```

3. **Apply it**
   Run the same command with `--apply` once the plan looks right.

4. **Check the result**
   ```bash
   dogsbay-xml project-health .
   ```
:::

## Setting one attribute everywhere

Select **Refactor > Set Attribute…** to set an attribute on a selected element
in each file within a scope. For example, you can add `xml:lang` to topic root
elements or set `outputclass` on a `conbody` element.

Enter the attribute name, value, element selector, and scope. The selector can
be an XPath expression or `#id`; `/*` selects the root element. **Only where
the attribute is missing** is selected by default and preserves existing
attribute values.

Review the proposed changes before applying them. The operation rewrites
only the selected element's start tag and preserves the rest of each file.

To preview the changes from the command line, run:

```bash
dogsbay-xml set-attribute . --name xml:lang --value en --only-if-absent
```

After reviewing the plan, run the same command with `--apply`. The command
checks DITA documents by default. Use `--map` or `--scope` to specify a file
set, and `--select` to select an element other than the root. On the command
line, you must include `--only-if-absent` to preserve existing attribute values.

## Finding what to refactor

Select **Refactor > Find Broken References and Orphans** to list broken
references, undefined keys, unused keys, and orphan topics. Double-click a
finding to open the file at the reported line. Select **Refresh** to run the
checks again after making changes. The command-line equivalent is
`dogsbay-xml health .`.

Use the refactoring commands to address findings as appropriate. For example,
use **Retarget References** to update a reference or **Create Key from Selected
Text** to define a key. Review unused keys and orphan topics before removing
them; they might be needed by another publication.

For project validation, a build, and output-link checks, select **Project >
Check Project**, or run `dogsbay-xml check .`. To run only the project health
report, use `dogsbay-xml project-health .`. See [Validating a
project](./validation).

## When a refactoring refuses

If a refactoring would create a broken reference, it reports the problem
instead of making the change. Review the plan to find unsafe changes before
they affect the output.

## Related

:::cards
- **[Validating a project](./validation)** {icon="check"}
  Find what needs fixing, and confirm the result.

- **[Keys and reuse](/authoring/keys-and-reuse)** {icon="key"}
  The mechanisms these refactorings move between.
:::
