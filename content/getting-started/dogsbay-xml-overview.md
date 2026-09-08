---
title: DogsBay XML overview
description: What the editor does, who it is for, and the three ideas that shape it.
type: explanation
---

# DogsBay XML overview

DogsBay XML is an agentic desktop editor for DITA and other XML formats, aimed at writers who maintain complex documentation sets.

-   Validates against your grammar as you type
-   Resolves keys and reuse across the project
-   Refactors without breaking references
-   Publishes through DITA-OT
-   Runs an AI agent that exposes all the features of the editor.

## Who it is for

A technical writer working in DITA or another docset large enough that the relationships between files matter:

-   Keys that resolve differently in different maps
-   Topics reused by conref in three places
-   Conditionals that decide what a build contains


## One engine, three interfaces

The editor's UI menus, the `dogsbay-xml` command line, and the MCP server that AI assistants connect to all run the exact same commands.


## Nothing changes until you say so

Refactorings are implemented as a dry run by default and just report what they would do. You pass `--apply` when you are happy with the plan. In the editor the same plan appears as a table you review before you execute it.

The same principle governs the agent. Its edits to DITA files arrive as tracked changes attributed to it, and you accept or reject the changes.

## The project is the unit

Keys, conrefs, maps and relationship tables describe how files relate. So the operations that matter work across all of them at once. Every reference to a topic, every use of a key, every condition value that the subject scheme disallows, every topic no map includes.

That is also why the agent is useful here. It is not simply editing text in a file - it is calling operations that already understand the project.


## Where to start

:::cards
- **[Installing](./install)** {icon="download"}
  Packages for Linux, macOS and Windows, or build from source.

- **[Tutorial: fixing a DITA project by hand](./tutorial-manual)** {icon="rocket"}
  Thirty minutes to find the issues in a real, deliberately broken project and fix one yourself.

- **[Tutorial: using an agent to fix a DITA project](./tutorial-agentic)** {icon="sparkles"}
  The same project, with the agent doing the repetitive part.
:::
