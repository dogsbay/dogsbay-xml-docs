---
title: DogsBay XML
description: An XML and DITA editor with an AI agent that works on your content model and shows you every change before it lands.
type: explanation
---

# DogsBay XML

DogsBay XML is a desktop editor for DITA and other XML. It validates against
your grammar as you type, resolves keys and reuse across the whole project,
and refactors without breaking references.

It also has an AI agent. The difference from an agent added to a text editor
is that this one calls the editor's own DITA operations, and its edits arrive
as proposals that you accept or reject.

:::cards
- **[Start here](/getting-started/install)** {icon="rocket"}
  Install the editor, open the sample project, and fix a real DITA guide with
  the agent.

- **[Working with the agent](/agent/overview)** {icon="sparkles"}
  Built-in and hosted agents, what each one is allowed to touch, and how their
  changes are reviewed.

- **[Authoring DITA](/authoring/topics-and-maps)** {icon="file-text"}
  Topics, maps, keys, reuse and conditional content.

- **[Reference](/reference/cli)** {icon="book"}
  Commands, tools and configuration.
:::

## What it is built around

**One engine, three interfaces.** The editor's menus, the `dogsbay-xml`
command line, and the MCP server that AI assistants connect to are not
separate implementations. They run the same commands. A rule that fails
validation while you type fails the same way in a pipeline.

**Changes are reviewable before they land.** Refactorings report what they
would do and change nothing until you pass `--apply`. Edits an agent makes to
a DITA file arrive as tracked changes that you accept or reject, marked with
the identity that proposed them.

**The project, not the file.** Keys, conrefs, maps and relationship tables
describe how files relate to each other, so the operations that matter work
across all of them: find every reference to a topic, rename a key everywhere,
or check that a build's conditions use values your subject scheme allows.

> [!NOTE]
> The integration server that AI assistants and the live-editor commands
> connect to is turned off by default. Turn it on in **File > Preferences >
> Server** when you need it. The built-in agent does not require it.
