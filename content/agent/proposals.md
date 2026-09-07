---
title: Reviewing an agent's changes
description: Agent edits to DITA files arrive as tracked changes. Accept them, reject them, or comment on them.
type: how-to
---

# Reviewing an agent's changes

When an agent edits a DITA file, the change is not written over your content.
It is recorded as a tracked change, attributed to the agent that proposed it,
and left for you to decide on.

Your own edits are never marked this way.

## Reviewing in the Proposals panel

:::steps
1. **Open the Proposals panel**
   It is on the right-hand sidebar. Each entry shows what kind of change it
   is and who proposed it.

2. **Select a proposal**
   The editor moves to the affected part of the document and highlights the
   change in place, so you see it in context rather than as a diff out of
   context.

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
bin/dogsbay-xml review list topic.dita
bin/dogsbay-xml review accept topic.dita insert@1234
bin/dogsbay-xml review reject topic.dita delete@5678
bin/dogsbay-xml review accept topic.dita --all
bin/dogsbay-xml review accept topic.dita --all --author ai:claude-acp
bin/dogsbay-xml review comment topic.dita "Check this term" --after "normalize"
```

The proposal id comes from `review list`. `--all` acts on every change and
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

Deleted spans stay in the file until you accept the deletion, so they would
otherwise still publish. They carry a property that DITAVAL can filter on,
which lets a build exclude proposed deletions without you having to resolve
every proposal first.

## Two protections worth knowing

**An agent cannot quietly remove another author's proposal.** A write that
would delete someone else's open proposal is refused, and the agent is told
why.

**A change too large to mark is not silently forced through.** If the edit
cannot be expressed as tracked changes, it falls back to a plain write only
when nobody else has open proposals in that file.

## Turning proposals off

Proposals are on by default. The setting is `review-agent-proposals` in the
editor configuration. Turning it off means agent edits are written directly,
with no review step, which is worth considering only for a project where an
agent has no write access anyway.
