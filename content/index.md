---
title: DogsBay XML
description: An XML and DITA editor with an AI agent that works on your content model and shows you every change before it lands.
type: explanation
---

# DogsBay XML

DogsBay XML is an agentic editor for DITA and other XML formats. It validates against your grammar as you type, resolves keys and reuse across the whole project, and refactors without breaking references.

It has 3 separate interfaces that run the exact same commands across one core engine:

-   MCP server for AI assistants
-   CLI for automation
-   UI with menus and panels for humans

While there is a built-in agent with its own commands, you can also bring-your-own-agent like Claude Code, Codex or OpenCode so you don't have to learn a new harness to be productive.

Edits an agent makes to a DITA file are tracked as changes that you accept or reject. Refactorings are implemented as dry runs, requiring an explicit instruction before they are applied.

> [!NOTE]
> The integration server that AI assistants and the live-editor commands
> connect to is turned off by default. Turn it on in **File > Preferences >
> Server** when you need it. The built-in agent does not require it.

While the editor is primarily for XML, it also supports authoring and previewing in Markdown and AsciiDoc.

:::cards
- **[Start here](/getting-started/install)** {icon="rocket"}
  Install the editor, open the sample project, and fix a real DITA guide with
  the agent.

- **[Working with the agent](/agent/choosing)** {icon="sparkles"}
  The built-in agent or one you already use, what each is allowed to touch, and how their changes are reviewed.

- **[Authoring DITA](/authoring/topics-and-maps)** {icon="file-text"}
  Topics, maps, keys, reuse and conditional content.

- **[Reference](/reference/cli)** {icon="book"}
  Commands, tools and configuration.
:::
