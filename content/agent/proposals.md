---
title: Reviewing an agent's changes
description: Review agent edits to DITA files as tracked changes, and accept, reject, or comment on them.
type: how-to
---

# Reviewing an agent's changes

When an agent edits a DITA file, it does not overwrite your content. The
editor records the edit as a tracked change, attributes it to the agent that
proposed it, and waits for your decision.

Your own edits are never marked this way.

## Reviewing in the Proposals panel

:::steps
1. **Open the Proposals panel**
   Open **Proposals** in the right sidebar. Each entry shows the kind of change
   is and who proposed it.

2. **Select a proposal**
   The editor moves to the affected part of the document and highlights the
   change in place so that you can review it in context.

3. **Decide**
   Select **Accept** to keep the change or **Reject** to discard it. Use
   **Accept all** or **Reject all** to act on the whole set.
:::

## Kinds of proposal

| Kind | What it means |
|---|---|
| Insert | Content the agent wants to add |
| Delete | Content it wants to remove |
| Changed | Content it wants to replace |
| Comment | A remark on the content, changing nothing |

A comment is not an edit. Use **Resolve** to settle one without removing it
from the document, which keeps the record of the discussion.

## Reviewing from the command line

The same operations are available headless, which is useful when reviewing a
batch or scripting a gate in a pipeline:

```bash
dogsbay-xml review list topic.dita
dogsbay-xml review accept topic.dita insert@1234
dogsbay-xml review reject topic.dita delete@5678
dogsbay-xml review accept topic.dita --all
dogsbay-xml review accept topic.dita --all --author ai:claude-acp
dogsbay-xml review comment topic.dita "Check this term" --after "normalize"
```

The proposal ID comes from `review list`. `--all` acts on every change and
leaves comments alone. `--author` narrows it to one agent, which matters when
two have worked on the same file. A comment is placed either after the first
occurrence of some text, with `--after`, or as the first child of an element,
with `--in`.

`project-health` also reports open proposals, so a project with unreviewed
agent changes does not look publish-ready.

## What happens to a rejected change

Rejecting removes the proposed content and restores what was there. Accepting
removes the markup and keeps the content. Either way the document is left as
ordinary DITA, with no trace of the review in what you publish.

## Publishing while proposals are open

Deleted spans remain in the file until you accept the deletion. A property on
each span enables DITAVAL to filter it. A build can therefore exclude proposed
deletions before you resolve every proposal.

## Two protections worth knowing

**An agent cannot quietly remove another author's proposal.** A write that
would delete someone else's open proposal is refused, and the agent is told
why.

**The editor does not silently apply a change that is too large to mark.** If
the editor cannot express the edit as tracked changes, it uses a plain write
only when no one else has open proposals in that file.

## Turning proposals off

Proposals are on by default. The setting is `review-agent-proposals` in the
editor configuration. Turning it off means agent edits are written directly,
with no review step, which is worth considering only for a project where an
agent has no write access anyway.
