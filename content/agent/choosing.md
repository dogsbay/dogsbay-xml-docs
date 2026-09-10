---
title: Which agent to use
description: What the built-in agent is good at, what a hosted agent is good at, and why running both is a reasonable answer.
type: explanation
---

# Which agent to use

DogsBay XML runs two kinds of agent, and they are good at different things. The built-in agent knows your project; a hosted agent is the one you already use. Neither is a lesser version of the other.

Use the **built-in agent** when you want an agent that is already set up and already knows where you are.

- **Nothing else to install or enable.** It runs inside the editor, so there is no integration server to turn on and no other program to install. A hosted agent needs both.
- **It knows the document you are looking at.** Every turn carries the active file, its type and grammar, the active deliverable and its root map, and the documents you have open. A hosted agent has to spend tool calls discovering that, and often does not, which is the difference between "add a shortdesc to this topic" working immediately and being asked which topic you mean.
- **It is wired into the editor.** Drag a file onto the chat to attach it, open documents reload when a turn changes them on disk, and `/revert` undoes the file changes of the last turn from a checkpoint taken before it ran.
- **You choose the model per conversation.** `/provider` and `/model` switch between Anthropic, OpenAI, Gemini, ChatGPT and Ollama without leaving the panel.
- **It can run entirely on your machine.** With Ollama as the provider, nothing leaves the machine — which is sometimes the only acceptable answer for a documentation set under NDA.

Use a **hosted agent** when the agent itself is the reason.

- **You already use it, and already pay for it.** Claude Code, Codex and Gemini CLI bring their own sign-in, so your existing subscription applies.
- **You want that agent's harness**: its planning, its own file tools, its way of working through a large refactor.
- **You want a ceiling on it.** A hosted session starts at T1 and you decide what to lend it, where the built-in agent runs with your own authority. See [capability tier](./overview#capability-tier), and note the caveat there: an agent with its own file tools is Tier 3 by construction, and the tier limits only what the editor lends it.
- **Local is possible here too**, if the agent supports it: OpenCode takes an OpenAI-compatible provider pointed at Ollama, LM Studio or llama.cpp, and Goose has Ollama as a provider of its own. That is the agent's own configuration, not something the editor sets.

The two are not exclusive. The built-in agent is the first tab and a hosted agent gets its own, so a common arrangement is the built-in agent for the DITA work — where knowing the map, the keys and the deliverable is what makes the answer right — and a hosted agent alongside it for the work that is really about code.

## Related

:::cards
- **[The agent, and what it may touch](./overview)** {icon="shield"}
  Tiers, the write gate and the audit log, which apply to both.

- **[Using Claude Code, Codex or Gemini](./hosted-agents)** {icon="terminal"}
  Starting a hosted agent, signing it in, and what it needs.
:::
