---
title: DogsBay XML
description: An XML and DITA editor with an AI agent that works on your content model and shows you every change before it lands.
type: explanation
---

# DogsBay XML

DogsBay XML is an agentic editor for DITA and other XML formats. It validates against your grammar as you type, resolves keys and reuse across the whole project, and refactors without breaking references.

It has three interfaces that run the same commands through one core engine:

-   MCP server for AI assistants
-   CLI for automation
-   UI with menus and panels

You can use the built-in agent or bring an agent that you already use, such as Claude Code, Codex, or OpenCode. You do not have to learn a new agent interface to be productive.

The editor tracks an agent's edits to a DITA file as changes that you accept or reject. Refactoring commands run as dry runs and require an explicit instruction before they apply changes.

> [!NOTE]
> The integration server that AI assistants and the live-editor commands
> use is off by default. Turn it on in **File > Settings >
> Server** when you need it. The built-in agent does not require it.

While the editor is primarily for XML, it also supports authoring and previewing in Markdown and AsciiDoc.

:::cards
- **[Start here](/getting-started/install)** {icon="rocket"}
  Install the editor, open the sample project, and fix a real DITA guide with
  the agent.

- **[Working with the agent](/agent/choosing)** {icon="sparkles"}
  Compare the built-in agent with agents you already use, learn what each can touch, and review their changes.

- **[Authoring DITA](/authoring/topics-and-maps)** {icon="file-text"}
  Topics, maps, keys, reuse, and conditional content.

- **[Reference](/reference/cli)** {icon="book"}
  Commands, tools, and configuration.
:::
