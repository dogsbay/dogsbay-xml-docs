---
title: Metadata
description: Define required topic metadata, audit the project, and fill in missing fields.
type: how-to
---

# Metadata

Metadata in a documentation set is useful only when it is consistent. A policy
defines the fields that topics must contain. The editor audits the content
against the policy and fills in missing fields without changing the rest of
the prolog.

## Where the policy lives

The required-metadata policy is part of the project configuration, in
`.dogsbay/config.xml`. Because it is a file in the project, it is shared with
everyone who clones it and changes with the content. For the rule attributes and field names, see [Project configuration](/reference/project-config#metadata-policy).

You can point at a different policy for one run with `--policy`.

## Auditing

```bash
dogsbay-xml metadata-audit . --map audacity-guide.ditamap
```

The command reports where required fields are missing or contain a value that
the policy does not allow. It exits with a nonzero status on any error-level
violation, so it works as a pipeline gate.

Use `--scope` to audit something other than a map's publication set, such as a
glob or the project root.

## Filling in what is missing

`metadata-set` applies changes in bulk and preserves the fields it is not
asked to touch.

```bash
dogsbay-xml metadata-set . --map audacity-guide.ditamap \
  --fill audience=user --dry-run
```

The four operations differ in a way worth getting right:

| Option | Effect |
|---|---|
| `--fill` | Set the field only where it is absent. Existing values are left alone. |
| `--set` | Overwrite the field everywhere in scope. |
| `--append` | Add a value to a list field, keeping what is there. |
| `--remove` | Remove a field, or one value from a list field. |

Repeat an option to change several fields in one pass.

> [!IMPORTANT]
> `metadata-set` writes unless you pass `--dry-run`. That is the opposite of
> the refactoring commands, which do nothing until you pass `--apply`. Check
> with `--dry-run` first on a scope you have not touched before.

## Enforcing the policy outside the editor

The same policy can be compiled to ISO Schematron, so a build system that has
no DogsBay XML can still check it:

```bash
dogsbay-xml metadata-export-schematron . --output metadata-policy.sch
```

Run the result anywhere Schematron runs, including here:

```bash
dogsbay-xml schematron-project . metadata-policy.sch
```

## A useful order

:::steps
1. **Audit before you change anything**
   `metadata-audit` tells you the size of the problem.

2. **Fill the gaps**
   Use `metadata-set --fill` for fields with a standard default. Check with
   `--dry-run` first.

3. **Fix the rest by hand**
   What is left usually needs a human, which is the point of separating fill
   from set.

4. **Gate it**
   Add `metadata-audit` to the pipeline so the gap does not reopen.
:::

## Related

:::cards
- **[Validating a project](/finding/validation)** {icon="check"}
  Grammar, Schematron, and project-wide checks.

- **[Conditional content](./conditional-content)** {icon="filter"}
  Controlled values for profiling attributes.
:::
