---
title: DogsBay XML overview
description: What the editor does, who it is for, and the three ideas that shape it.
type: explanation
---

# DogsBay XML overview

DogsBay XML is an agentic desktop editor for DITA and other XML formats, aimed at writers who maintain complex documentation sets. The editor:

-   Validates against your grammar as you type
-   Resolves keys and reuse across the project
-   Refactors without breaking references
-   Publishes through DITA-OT
-   Runs AI agents that can use all the editor's features

## Who it is for

DogsBay XML is for technical writers who work in DITA or another documentation set where relationships between files matter. For example:

-   Keys that resolve differently in different maps
-   Topics reused by conref in three places
-   Conditionals that decide what a build contains


## One engine, three interfaces

The editor's UI menus, the command line, and the MCP server for agents all run the exact same commands.

## The project is the unit

Keys, conrefs, maps, and relationship tables describe how files relate. The operations that matter therefore work across all of them at once. They can find every reference to a topic, every use of a key, every condition value that the subject scheme disallows, and every topic that no map includes.

That project awareness also makes the agent useful. Instead of editing a file as plain text, the agent calls operations that already understand the project.

## Nothing changes until you say so

The modifications that an agent makes to DITA files arrive as tracked changes attributed to it, and you accept or reject the changes.

Refactoring commands run as dry runs by default and report what they would do. Pass `--apply` when you are satisfied with the plan. In the editor, review the same plan in a table before you run it.



## Where to start

:::cards
- **[Installing](./install)** {icon="download"}
  Install packages for Linux, macOS, and Windows, or build from source.

- **[Tutorial: fixing a DITA project by hand](./tutorial-manual)** {icon="rocket"}
  Thirty minutes to find the issues in a real, deliberately broken project and fix one yourself.

- **[Tutorial: using an agent to fix a DITA project](./tutorial-agentic)** {icon="sparkles"}
  The same project, with the agent doing the repetitive part.
:::
