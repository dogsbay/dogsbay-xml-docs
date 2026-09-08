---
title: What DogsBay XML is
description: What the editor does, who it is for, and the three ideas that shape it.
type: explanation
---

# What DogsBay XML is

DogsBay XML is a desktop editor for DITA and other XML, aimed at people who
maintain a documentation set rather than a single file.

It validates against your grammar as you type, resolves keys and reuse across
the project, refactors without breaking references, publishes through DITA-OT,
and runs an AI agent that works on the same model the editor does.

## Who it is for

A technical writer working in DITA, in a set large enough that the
relationships between files matter: keys that resolve differently in different
maps, topics reused by conref in three places, conditions that decide what a
build contains.

If your set is a handful of files, most of this is unnecessary. The features
earn their place when a rename can break something you cannot see from the
file you are editing.

## Three ideas

### One engine, three interfaces

The editor's menus, the `dogsbay-xml` command line and the MCP server that AI
assistants connect to are not separate implementations of the same ideas. They
run the same commands.

The consequence is worth stating plainly: a check that passes in the editor
passes the same way in a pipeline, because it is the same check. There is no
second implementation to drift.

### Nothing changes until you say so

Refactorings report what they would do and change nothing. You pass `--apply`
when the plan is right. In the editor the same plan appears as a table you
review before it runs.

The same principle governs the agent. Its edits to DITA files arrive as
tracked changes attributed to it, and you accept or reject them.

### The project is the unit

Keys, conrefs, maps and relationship tables describe how files relate. So the
operations that matter work across all of them at once: every reference to a
topic, every use of a key, every condition value that no subject scheme
allows, every topic no map includes.

That is also why the agent is useful here. It is not editing text in a file;
it is calling operations that already understand the project.

## What it is not

It is not a general-purpose text editor, and it is not a CMS. It edits files
on disk, in a folder you control, under whatever version control you already
use.

## Where to start

:::cards
- **[Installing](./install)** {icon="download"}
  Packages for Linux, macOS and Windows, or build from source.

- **[Tutorial: fixing a DITA guide](./tutorial)** {icon="rocket"}
  Thirty minutes with a real, deliberately broken project.
:::
