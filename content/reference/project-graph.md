---
title: Project graph
description: What the project-graph command returns, field by field, and what counts as a relationship, a shipped file, or an issue.
type: reference
---

# Project graph

`project-graph` describes how a documentation set connects: every map, topic, key and DITAVAL file, and every reference between them, per deliverable. The relationship map page is built from this data, and connected assistants read the same data through the `project_graph` tool. To turn it into a page, see [Mapping a project and writing reports](/finding/reports).

```bash
dogsbay-xml project-graph .
```

The command prints JSON. For the same data as a page, see the [example relationship map](https://dogsbay.ai/dogsbay-xml-docs/examples/relationship-map.html).

## Options

| Option | What it does |
|---|---|
| `--map <file>` | Describe one root map, as a deliverable named after the map file without its extension. |
| `--deliverable <name>` | Describe one deliverable from the project file. |
| `--no-checks` | Report structure only. Skips grammar validation of the shipped files, the conref element ID audit, and the conref push audit. |

Without `--map` or `--deliverable`, the graph covers every deliverable in the project file (`project.json`, `project.xml` or `project.yaml`), plus every other DITA file under the project folder, so that files nothing references still appear. When the project defines no deliverables, each root map that no other map references is treated as one.

The assistant tool takes the same options as `map`, `deliverable` and `checks` (default true).

## The result

```json
{
  "generated": "2026-09-14T16:24:01Z",
  "root": "/home/me/audacity-demo",
  "scope": "all",
  "deliverables": [
    { "name": "beginner-mac", "map": "beginner-guide.ditamap",
      "ditavals": ["filters/mac-beginner.ditaval"],
      "ships": ["beginner-guide.ditamap", "topics/installing-audacity.dita"] }
  ],
  "nodes": [
    { "id": "topics/installing-audacity.dita", "kind": "topic", "type": "task",
      "title": "Installing Audacity", "ships": ["full", "beginner-mac"] },
    { "id": "key:start-here", "kind": "key" }
  ],
  "edges": [
    { "from": "beginner-guide.ditamap", "to": "topics/installing-audacity.dita",
      "kind": "topicref", "line": 13 },
    { "from": "key:start-here", "to": "topics/beginner-start.dita",
      "kind": "keytarget", "line": 9, "via": "beginner-guide.ditamap" }
  ],
  "issues": [
    { "severity": "warning", "rule": "shadowed-key", "file": "keydefs-glossary.ditamap",
      "line": 15, "message": "..." }
  ]
}
```

Optional fields with no value are left out; lists such as `ditavals` can be empty. All paths are relative to the project folder and use forward slashes.

### Deliverables

| Field | Meaning |
|---|---|
| `name` | The deliverable name from the project file, or the map file name without its extension for a map. |
| `map` | Its root map. |
| `ditavals` | The DITAVAL files the deliverable applies. |
| `ships` | The IDs of the files the deliverable publishes. See [What ships](#what-ships). |

### Nodes

| Field | Meaning |
|---|---|
| `id` | The file path, or `key:` followed by the key name. |
| `kind` | `map`, `topic`, `key` or `ditaval`. |
| `type` | The root element of a map or topic, such as `bookmap`, `task`, `concept` or `glossentry`. |
| `title` | The map or topic title. A key reference in a title with no text of its own appears as the key name in brackets, such as `What is [product-name]?`. |
| `missing` | `true` for a file that something references but that does not exist. |
| `ships` | The names of the deliverables that publish the file. |

There is one node per key name, however many maps define the key. Which definition applies depends on the deliverable; see `via` below.

### Edges

| Field | Meaning |
|---|---|
| `from`, `to` | Node IDs. |
| `kind` | The kind of relationship, below. |
| `line` | The line of the element that makes the reference. |
| `via` | For a `keytarget` edge, the map whose key definition made the binding. |
| `fragment` | For a conref or key reference to an element, the element ID part. |
| `broken` | `true` when the target does not exist. |
| `deliverable` | For a `profile` edge, the deliverable that applies the DITAVAL file. |

| Kind | From | To | Made by |
|---|---|---|---|
| `mapref` | map | map | A `mapref`, or a map reference to another map |
| `topicref` | map | topic | A `topicref`, `chapter` or similar placement in the table of contents |
| `reltable` | map | topic | A reference in a relationship table cell |
| `keydef` | map | key | A key definition |
| `keytarget` | key | file | The file a key definition points to, with `via` naming the map |
| `keyref` | map or topic | key | A `keyref` attribute |
| `conkeyref` | topic | key | A `conkeyref` attribute |
| `conref` | topic | topic | A `conref` attribute |
| `link` | topic | topic | An `xref` or `link` to a local file |
| `ditavalref` | map | DITAVAL | A `ditavalref` element |
| `profile` | map | DITAVAL | A deliverable applying a DITAVAL file to its root map |

A key defined by several maps has one `keytarget` edge for each distinct definition. The deliverable's key space decides which one applies: the first definition wins, as in DITA-OT.

References to images and other non-DITA files, and links to external URLs, are not included.

### What ships

A deliverable ships its root map, the maps it references, the topics placed in their tables of contents, the targets of conrefs from those files, and the files their keys resolve to in that deliverable's key space. A topic that is reached only through a cross-reference or a relationship table cell does not ship.

DITAVAL conditions are not applied to content, so a topic excluded by a filter still ships. Grammar validation covers only files that ship.

### Issues

| Rule | Severity | Meaning |
|---|---|---|
| `broken-reference` | error | A reference to a file that does not exist. |
| `undefined-key` | error | A key reference that no deliverable shipping the file can resolve. |
| `key-resolves-inconsistently` | warning | A key reference that resolves in some of the deliverables shipping the file and not in others. The message names them. |
| `shadowed-key` | warning | A key defined twice in one key space. The message names the definition that wins. |
| `unused-key` | info | A key defined in a map that ships, which nothing references. |
| `orphan-topic` | info | A `.dita` topic that nothing references. |
| `invalid-dtd` | error, or warning for a validator warning | A file that ships and fails grammar validation. Not reported with `--no-checks`. |
| `broken-element-id` | error | A reuse reference whose target file exists but lacks the element ID. Not reported with `--no-checks`. |
| `conref-push` | warning | A conref push with nothing to push into, or a mark with nothing pushed. Not reported with `--no-checks`. |

The issues describe the structure. For the full set of checks, including metadata and house rules, run [`project-health`](/finding/validation).

## Limits

- Each node is a file or a key. Elements are not nodes; a reference to an element carries its ID in `fragment`.
- The nesting of topic references is not recorded, only the map that places each topic and the line.
- Key scopes are resolved as far as the editor models them. See [Keys and reuse](/authoring/keys-and-reuse).

## Related

:::cards
- **[Mapping a project and writing reports](/finding/reports)** {icon="file-text"}
  Turn the graph into a relationship map or your own page.

- **[The command line](/reference/cli)** {icon="terminal"}
  Every command, including `report`.
:::
