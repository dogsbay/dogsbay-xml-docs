---
title: Which agent to use
description: Compare the built-in and hosted agents and learn when to run both.
type: explanation
---

# Which agent to use

DogsBay XML runs two kinds of agent for different kinds of work. The built-in agent knows your project. A hosted agent is one that you already use. Neither is a lesser version of the other.

Use the **built-in agent** when you want an agent that is already set up and already knows where you are.

- **Nothing else to install or enable.** It runs inside the editor, so you do not need to turn on the integration server or install another program. A hosted agent needs both.
- **It knows the document you are looking at.** Every turn includes the active file, its type and grammar, the active deliverable and its root map, and the documents you have open. A hosted agent must use tool calls to discover that context. Without it, the agent might respond to "add a shortdesc to this topic" by asking which topic you mean.
- **It integrates with the editor.** Drag a file onto the chat to attach it, open documents reload when a turn changes them on disk, and `/revert` undoes the file changes of the last turn from a checkpoint taken before it ran. The editor stores those copies in `.xagent/checkpoints`, replaces them at the start of each turn, and excludes them from version control. A hosted agent has no equivalent. To undo its work, use git or the agent's own undo.
- **You choose the model per conversation.** `/provider` and `/model` switch between Anthropic, OpenAI, Gemini, ChatGPT, and Ollama without leaving the panel.
- **The model can run on your machine.** With Ollama as the provider, your content is not sent to a model provider: inference happens locally. That is not the same as nothing leaving the machine. The agent can run shell commands, and any MCP servers or skills you configure run with it, so a tool you have given it can still reach a network. For a documentation set under a nondisclosure agreement (NDA), choosing Ollama settles where the model runs; what the agent is allowed to do is settled by the [capability tier](/agent/overview#capability-tier) and by which tools you configure.

Use a **hosted agent** when you want its own workflow and features.

- **You already use it and pay for it.** Claude Code, Codex, and Gemini CLI use their own sign-in, so your existing subscription applies.
- **You want that agent's features.** You can use its planning, file tools, and approach to large refactoring tasks.
- **You want to limit its editor access.** A hosted session starts at T1, and you decide which tools to provide. The built-in agent runs with your authority. See [Capability tier](./overview#capability-tier). An agent with its own file tools effectively operates at Tier 3 because the tier limits only what the editor provides.
- **You can also use a local model.** If the agent supports local models, configure it to use one. For example, OpenCode supports an OpenAI-compatible provider that points to Ollama, LM Studio, or llama.cpp, and Goose supports Ollama. Configure the model in the agent, not the editor.

You can use both kinds of agent. For example, use the built-in agent for DITA work, where the map, keys, and deliverable provide essential context. Use a hosted agent alongside it for code-related work.

## Related

:::cards
- **[The agent, and what it may touch](./overview)** {icon="shield"}
  Tiers, the write gate, and the audit log, which apply to both.

- **[Using Claude Code, Codex, or Gemini](./hosted-agents)** {icon="terminal"}
  Starting a hosted agent, signing it in, and what it needs.
:::
