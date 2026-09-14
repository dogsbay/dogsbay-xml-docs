---
title: Mapping a project and writing reports
description: See how maps, topics, and keys connect, and write standalone HTML pages that anyone can open.
type: how-to
---

# Mapping a project and writing reports

A documentation set is easier to fix when you can see it. The editor can describe how every map, topic, key, and DITAVAL file connects, and turn that, or any other check, into a standalone HTML page. The page is a single file that opens from disk in any browser, with no internet connection, so you can attach it to a ticket or keep it next to the content.

## Write a relationship map

```bash
dogsbay-xml report project-graph . -o docs/relationship-map.html
```

The page has three tabs:

- **Graph** draws maps as squares, topics as circles, keys as diamonds, and DITAVAL files as chevrons. Select a node to see what it references and what references it. Choose a deliverable to see only what that deliverable ships, and turn relationship kinds on and off.
- **Table** lists every relationship, with the line it is on and, for a key, the map that defined it.
- **Issues** lists broken references, undefined keys, keys that resolve in some deliverables but not others, shadowed and unused keys, orphaned topics, files that fail grammar validation, and reuse references to missing element IDs. Select a file to find it in the graph.

A broken reference or a missing file is drawn in the error color and labeled, so the problem is visible without relying on color.

To map one deliverable or one root map:

```bash
dogsbay-xml report project-graph . -o beginner-map.html --arg deliverable=beginner-mac
dogsbay-xml report project-graph . -o guide-map.html --arg map=audacity-guide.ditamap
```

## Write a health report

```bash
dogsbay-xml report project-health . -o health.html --arg map=audacity-guide.ditamap
```

The page shows whether the project is clean, then one table per check. A rule that fails in many files appears once, with a count and the list of files.

## Ask the agent for a page

The agent and connected assistants use the same operation. Ask for the page you want, for example *write a relationship map of this project to docs/relationship-map.html*. The agent reads the project with the editor's own checks, so the page matches what `project-health` reports.

## Use your own template

The built-in templates are `relationship-map` and `health`. A project can add its own: save an HTML file in `.dogsbay/reports/` and name it with `--template`:

```bash
dogsbay-xml report project-graph . -o coverage.html --template .dogsbay/reports/coverage.html
```

A template is an ordinary HTML page with one empty `<script id="report-data" type="application/json"></script>` element. The command fills that element with the command's JSON output. The page's own script reads it with `JSON.parse`, and the result is still a single file.

To see the data a template receives, run the command on its own:

```bash
dogsbay-xml project-graph .
```

Every field is described in the [project graph reference](/reference/project-graph).

## Related

:::cards
- **[Validating a project](/finding/validation)** {icon="check"}
  The checks behind the health report, and how to use them as a build gate.

- **[The command line](/reference/cli)** {icon="terminal"}
  Every command, including `project-graph` and `report`.
:::
