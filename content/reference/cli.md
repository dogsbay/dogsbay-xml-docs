---
title: The command line
description: Find the dogsbay-xml command for the information or change that you need.
type: reference
---

# The command line

`dogsbay-xml` runs the same operations as the editor's menus. The editor
installation includes the command. See [The command line](/getting-started/install#the-command-line)
to find it or to run it on a machine where you cannot use an installer.

Most commands work on files and need nothing running. A few drive an editor
that is already open, and those need the integration server.

Run `dogsbay-xml --help` for the full list, and
`dogsbay-xml <command> --help` for one command's options.

> [!IMPORTANT]
> The refactoring commands print a plan and change nothing until you add
> `--apply`. The structural editors, `edit-map` and `edit-reltable`, work the
> other way round: they write unless you pass `--dry-run`.

## Reading a document

| Command | What it does |
|---|---|
| `validate` | Validate against XSD, DTD, or RELAX NG, resolving catalogs. DITA files fall back to the bundled DITA grammars. |
| `parse` | Print the root element, namespace, and encoding. |
| `info` | Report encoding, grammar, root element and size. |
| `query` | Run an XPath expression over a file or a glob. |
| `transform` | Apply an XSLT stylesheet. |
| `format` | Pretty-print using the project's house style. |
| `reflow` | Reflow prose to one sentence per line, leaving verbatim blocks alone. |
| `preview` | Render the styled DITA preview to HTML. |

## Asking about the project

These commands answer questions about more than one file.

| Command | What it answers |
|---|---|
| `where-used` | What references this file? |
| `keys` | What keys does this root map define, and what do they resolve to? |
| `check-links` | Which references point at something missing? |
| `conref-audit` | Which reuse references name an element ID that no longer exists? |
| `health` | Broken references, undefined and unused keys, and orphaned topics. |
| `project-health` | The full report: broken references, key problems, orphaned topics, grammar validation, element IDs, metadata policy, open proposals, conref push, index entries, house style, authoring leftovers, and controlled values. |
| `check` | Run project health checks, build deliverables, and check output links. Stop at the first failing stage and exit with status 1. The build stage also warns about key references a deliverable could not resolve. Add `-v` for DITA-OT's coded notes. |
| `check-output-links` | Check a build output folder for links to missing pages, fragments, and images. |
| `project-graph` | How do the maps, topics, keys, and DITAVAL files connect, and what does each deliverable ship? Prints JSON; see the [project graph reference](/reference/project-graph). |
| `report` | Write a standalone HTML page from another command's output, such as a relationship map or a health report. |

`check-links`, `health`, `project-health`, `check`, and `check-output-links`
exit with a nonzero status when they find a problem, so they work as pipeline
gates. Use `check` in CI to run the health report, build, and output-link
checks in sequence. It stops at the first failing stage.

```bash
dogsbay-xml check .                    # health, build, then the built output
dogsbay-xml check . --no-build         # stop after health
dogsbay-xml check . --deliverable web  # one deliverable rather than all
```

```bash
dogsbay-xml project-health . --schematron house-style.sch
```

`project-health` prints every finding and then a summary of the counts, with the house rules and the metadata policy broken down by rule. Add `--summary` for the counts alone, `--include` to run only some of the checks, and `--severity error` to leave out findings that do not block a clean result, such as unused keys. See [validating a project](/finding/validation#reading-the-result).

The `--include` option accepts these checks: `reuse`, `validation`, `elementIds`,
`metadata`, `schematron`, `proposals`, `conrefPush`, `index`, `format`,
`markers`, and `conditions`.

Both `check` and `project-health` use the project's default root map and
`<default-schematron>` schema unless you override them. Use `--map` or
`--schematron` to specify a different map or schema. Use `--map none` to check
without the default map, or `--schematron none` to skip the configured
Schematron rules.

To see the project as a page, see [Mapping a project and writing reports](/finding/reports).

## Validating a set

| Command | What it does |
|---|---|
| `validate-project` | Validate every file in a scope: a map's publication set, a glob, or a folder. |
| `validate-deliverables` | Validate each deliverable, with its own map and conditions. |
| `validate-ot` | Run DITA-OT preprocessing per deliverable, which catches key and conref resolution failures that static validation cannot. Requires DITA-OT. |
| `schematron` | Apply a Schematron schema to one document. |
| `schematron-project` | Apply one across a scope. |
| `validate-conditions` | Report profiling values that the subject scheme does not allow. |

## Metadata

| Command | What it does |
|---|---|
| `metadata-audit` | Report where required metadata is missing or wrong. |
| `metadata-set` | Set, fill, append, or remove fields in bulk, preserving the rest of the prolog. |
| `set-attribute` | Set one attribute on one element in every file of a scope — `xml:lang` on every topic — rewriting only that element's start tag. `--select` picks the element (default `/*`), `--only-if-absent` leaves a file that already has the attribute alone, and nothing is written until `--apply`. With no scope it keeps to DITA documents rather than every XML file under the root. |
| `metadata-export-schematron` | Compile the metadata policy to ISO Schematron, so the same rules run anywhere. |

## Surveying DITA features

Each of these reports on one DITA mechanism across the project:
`reltable-audit`, `list-branches`, `list-subjects`, `keyword-audit`,
`index-audit`, `glossary-audit`, `conref-push-audit`, `chunk-audit`, and
`specialization-info`.

## Changing files

Reference-safe edits. All are dry-run first.

| Command | What it does |
|---|---|
| `rename-file` | Rename a file and every reference to it. |
| `rename-key` | Rename a key and every use of it. |
| `rename-element-id` | Rename an element ID, updating conrefs that point at it. |
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
| `build` | Build one deliverable or all of them with DITA-OT, using the transform type, conditions, and parameters that the project defines. Add `--keep-temp` to keep DITA-OT's temporary files in `.dogsbay/temp/<deliverable>`, and `-v` for DITA-OT's warnings and coded notes. |
| `live-preview` | Publish a deliverable and serve it, republishing as you save. `start`, `status`, and `stop` manage previews; `run` stays in the foreground. Previews started by the editor or by a headless MCP server are listed and stopped here too. |

## Starting and driving the editor

`gui` opens the editor window. Use `--project DIR` to open a project folder,
`--settings DIR` to use a separate profile directory, `--window WxH` to set
the window size, and `--no-welcome` to skip the welcome screen.

A separate profile directory isolates settings, bundled grammars, templates,
and agent files from your usual profile. Use it for demonstrations,
recordings, or tests that require a specific configuration.

The following commands require the integration server, which you turn on in **File > Settings >
Server**.

| Command | What it does |
|---|---|
| `open`, `close`, `list`, `save` | Manage open documents. |
| `selection`, `goto-line`, `cursor`, `select-element`, `wrap` | Move around and edit at the cursor. |
| `author` | Drive the Author view: `outline`, `switch`, `insert`, `set-text`, `issues`. |
| `screenshot` | Capture the editor window. |
| `status` | Report whether the editor is reachable, and print MCP configuration for AI assistants. |

## Running the tools without the editor

| Command | What it does |
|---|---|
| `mcp` | Run the editor's tools as an MCP server over stdio, on a project folder, with no editor open. The agent reads and writes only inside that folder, must read a document before editing it, and its edits are recorded as review proposals unless you pass `--no-proposals`. |
| `tool` | Run any one of those tools by its MCP name with JSON arguments, and print the JSON result. Use this command to test a tool or call it from a script. With `--editor`, it runs through the running editor instead of on the files. |

```bash
claude mcp add dogsbay -- dogsbay-xml mcp --root /path/to/project
```

See [connecting an AI assistant](/automation/mcp).

## Agents and review

| Command | What it does |
|---|---|
| `review` | List, accept, reject, or comment on agent proposals in a document. |
| `sessions` | List the agent sessions connected to the editor. |
| `agents` | List Agent Client Protocol agents and whether this machine can run them. |
| `audit-log` | Show what agents changed in this project, newest first. |

## Projects

`project create`, `project open`, `project list`, and `project info` manage
projects from the command line.
