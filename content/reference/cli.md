---
title: The command line
description: What bin/dogsbay-xml can do, grouped by what you are trying to find out or change.
type: reference
---

# The command line

`bin/dogsbay-xml` runs the same operations as the editor's menus. Most
commands work on files and need nothing running. A few drive an editor that is
already open, and those need the integration server.

Run `bin/dogsbay-xml --help` for the full list, and
`bin/dogsbay-xml <command> --help` for one command's options.

> [!IMPORTANT]
> The refactoring commands print a plan and change nothing until you add
> `--apply`. The structural editors, `edit-map` and `edit-reltable`, work the
> other way round: they write unless you pass `--dry-run`.

## Reading a document

| Command | What it does |
|---|---|
| `validate` | Validate against XSD, DTD or RelaxNG, resolving catalogs. DITA files fall back to the bundled DITA grammars. |
| `parse` | Print the root element, namespace and encoding. |
| `info` | Report encoding, grammar, root element and size. |
| `query` | Run an XPath expression over a file or a glob. |
| `transform` | Apply an XSLT stylesheet. |
| `format` | Pretty-print using the project's house style. |
| `reflow` | Reflow prose to one sentence per line, leaving verbatim blocks alone. |
| `preview` | Render the styled DITA preview to HTML. |

## Asking about the project

These are the ones that answer questions a single file cannot.

| Command | What it answers |
|---|---|
| `where-used` | What references this file? |
| `keys` | What keys does this root map define, and what do they resolve to? |
| `check-links` | Which references point at something missing? |
| `conref-audit` | Which reuse references name an element id that no longer exists? |
| `health` | Broken references, undefined and unused keys, orphan topics. |
| `project-health` | All of that, plus grammar validation and open proposals. |

`check-links`, `health` and `project-health` exit with a non-zero status when
they find something, so they work as a pipeline gate.

```bash
bin/dogsbay-xml project-health .
```

## Validating a set

| Command | What it does |
|---|---|
| `validate-project` | Validate every file in a scope: a map's publication set, a glob, or a folder. |
| `validate-deliverables` | Validate each deliverable, with its own map and conditions. |
| `validate-ot` | Run DITA-OT preprocessing per deliverable, which catches key and conref resolution failures that static validation cannot. Requires DITA-OT. |
| `schematron` | Apply a Schematron schema to one document. |
| `schematron-project` | Apply one across a scope. |
| `validate-conditions` | Report profiling values that the subject scheme does not sanction. |

## Metadata

| Command | What it does |
|---|---|
| `metadata-audit` | Report where required metadata is missing or wrong. |
| `metadata-set` | Set, fill, append or remove fields in bulk, preserving the rest of the prolog. |
| `metadata-export-schematron` | Compile the metadata policy to ISO Schematron, so the same rules run anywhere. |

## Surveying DITA features

Each of these reports on one DITA mechanism across the project:
`reltable-audit`, `list-branches`, `list-subjects`, `keyword-audit`,
`index-audit`, `glossary-audit`, `conref-push-audit`, `chunk-audit` and
`specialization-info`.

## Changing files

Reference-safe edits. All are dry-run first.

| Command | What it does |
|---|---|
| `rename-file` | Rename a file and every reference to it. |
| `rename-key` | Rename a key and every use of it. |
| `rename-element-id` | Rename an element id, updating conrefs that point at it. |
| `rename-profile-value` | Rename a profiling value, such as a platform or audience. |
| `delete-file` | Delete safely, reporting inbound references first. |
| `retarget` | Point every reference from one file at another. |
| `keyify` | Convert direct references to key references, adding the key definitions. |
| `inline-key` | The reverse: turn a key reference back into a direct one. |
| `extract-conref` | Move an element into a reuse topic and leave a conref behind. |
| `inline-conref` | Replace a conref with a copy of the content it pulls in. |
| `create-keydef` | Add a text key definition. |
| `merge-keydefs` | Remove duplicate key definitions that are shadowed anyway. |
| `split-topic` | Split a topic at its sections, adding the new topics to the map. |

Structural editing of maps and relationship tables preserves formatting and
keeps references intact: `edit-map` and `edit-reltable`. Both take an
operation as their second argument, and both write unless you pass
`--dry-run`.

## Publishing

| Command | What it does |
|---|---|
| `build` | Build one deliverable or all of them with DITA-OT, with the transform type, conditions and parameters the project defines. |

## Driving a running editor

These need the integration server, which you turn on in **File > Preferences >
Server**.

| Command | What it does |
|---|---|
| `open`, `close`, `list`, `save` | Manage open documents. |
| `selection`, `goto-line`, `cursor`, `select-element`, `wrap` | Move around and edit at the cursor. |
| `author` | Drive the Author view: `outline`, `switch`, `insert`, `set-text`, `issues`. |
| `screenshot` | Capture the editor window. |
| `status` | Report whether the editor is reachable, and print MCP configuration for AI assistants. |

## Agents and review

| Command | What it does |
|---|---|
| `review` | List, accept, reject or comment on agent proposals in a document. |
| `sessions` | List the agent sessions connected to the editor. |
| `agents` | List Agent Client Protocol agents and whether this machine can run them. |
| `audit-log` | Show what agents changed in this project, newest first. |

## Projects

`project create`, `project open`, `project list` and `project info` manage
projects from the command line.
