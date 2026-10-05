---
title: Driving the editor
description: Work the editor's interface from a script by naming what you click, and start from a known state, for recordings and end-to-end tests.
type: how-to
---

# Driving the editor

The integration server can work the editor's interface the way a person does:
open a menu, press a button in a dialog, type into the document, scroll a panel.
It is how a screen recording, an end-to-end test or a scripted walkthrough
drives a real editor rather than a mock of one.

This is a different job from [connecting an AI
assistant](/automation/mcp). An assistant asks for DITA operations and never
touches the interface. A driver clicks things, and most of what it needs to know
is *where they are*.

## Turn on driving

Reading the interface needs nothing beyond the server. The part that acts on it
is off unless you ask for it.

:::steps
1. **Start the editor with driving allowed**
   ```bash
   dogsbay-xml gui --allow-driving
   ```

2. **Check the server is on**
   Driving uses the same server as everything else, so turn it on under
   **File > Settings > Server** or leave it enabled in the project's
   settings.
:::

The gate is deliberate rather than cautious. A menu command does whatever that
command does, and a line in the editor's terminal can do anything at all, so
the capability is withheld instead of being fenced in. An assistant holding the
server's token gains none of it by default.

| Method | What it does | Needs `--allow-driving` |
|---|---|---|
| `locate` | Says where something on screen is | no |
| `reveal` | Scrolls something into view, then answers as `locate` does | no |
| `clickButton` | Presses a button by its label, or only says where it is | to press |
| `invokeAction` | Runs a menu command by its id, without opening a menu | yes |
| `typeText` | Types key by key, through the component's own key handling | yes |
| `terminalRun` | Runs a line in the editor's terminal | yes |
| `setCursor`, `selectElement`, `selectPanel`, `switchSidebar` | Moves the caret, the selection, the visible panel | no |
| `waitIdle` | Waits until the interface stops changing | no |
| `screenshot` | Captures the window | no |

`invokeAction` and `clickButton` **start** their work and return rather than
waiting for it to finish. A modal dialog runs its own event loop, so a call that
waited for the dialog's outcome would wait for as long as the dialog stayed
open — which, with nobody there to answer it, is forever. Everything such a call
can refuse is therefore checked before the click is posted: an unknown action
id, an unknown button, a disabled control. To find out what the click did, call
`waitIdle`, or ask for the thing you expect to have changed.

## Name what you click

Positions measured from a screenshot break for reasons that have nothing to do
with your script. They move when a window manager draws a title bar, when the
theme or the font changes, when the display's scaling changes, and when a dialog
gains a line of text. Worse, a script that mis-clicks does not usually fail — it
presses something else and carries on.

`locate` answers "where is the thing with this text?" with its box on screen.
Give it the text and the kind.

```json
{"method": "locate", "params": {"what": "row", "text": "topics"}}
```

| Kind | Found by |
|---|---|
| `button` | Its label, then its tooltip or accessible name |
| `menu` | A menu of the window's menu bar |
| `item` | An item of whatever menu is open now, a context menu included |
| `tab` | A tab of a tabbed pane |
| `row` | A row of a list, a table or a tree — by the text the renderer draws |
| `field` | The text field a label names |
| `combo` | A drop-down, by the option showing in it |
| `option` | An item of the open drop-down |
| `text` | A place in the open document, by the words there |
| `cell` | A cell of a table, by `column` and `row` — including an empty one |
| `status` | A segment of the status bar, by the tooltip it is known by |

Text is matched as a button's label is: trimmed, ignoring case, ignoring a
trailing ellipsis, and ignoring the colon a dialog puts after a field's label.
So `Add` finds **Add…**, and `Value` finds the field labelled **Value:**.

The kind is required. The text alone is ambiguous — a word can be both a row and
a label beside a field — and choosing between them by some fixed order would be
a coin toss.

Three parameters cover the rest:

- `nth` picks one when a name fits several. Two rows of the same text is
  ordinary in a table, so an ambiguity has to be something a caller can get
  past. `0` means "there should only be one".
- `column` and `row` address a cell by where it is, since the cells a script
  clicks are often empty and an empty cell has no text to be named by. `row`
  takes a 1-based number or `last`.
- `offset` aims at one word inside a longer match, for `what: "text"`.

**A refusal is the useful half.** A name that matches nothing is refused with
the names that do exist, and an ambiguous one with where each candidate is. A
mistake in a script surfaces as a one-line message on the first run instead of
as a misclick in a recording. An item of a menu that is not open yet is refused
as "not on screen" rather than reported missing, because a caller that names it
before opening its menu has the name right and the order wrong.

## Scroll with reveal

Being scrolled out of view is the one reason `locate` fails for something that
is really there. `reveal` is the cure: it takes the kinds `locate` takes, plus
`panel` with `to: "end"` or `to: "start"`, scrolls, and then answers as `locate`
would.

```json
{"method": "reveal", "params": {"what": "panel", "panel": "Project Validation", "to": "end"}}
```

It scrolls and does nothing else — no caret moved, no selection changed, no
document touched. That is also why it is a separate verb rather than a flag on
`locate`: `locate` can go on truthfully saying it changes nothing, which is what
keeps it outside the permission gate.

## Press a button

`clickButton` matches a dialog's button by its label and presses it.
`"press": false` asks only where it is, which needs no `--allow-driving`.

A recording usually wants `press: false`, then moves its own pointer to the
middle of the button and clicks there: the name found the target, and the
pointer did the part a viewer can see.

Ambiguity is refused rather than resolved. Two buttons of the same label, or no
active window and more than one dialog open, both come back asking you to say
which. The window is chosen by: the one you named, else the active window, else
the single dialog on screen, else the only window there is.

## Start from a known state

A run that starts from last week's session is not reproducible. These options
give the editor a stated starting point instead of a remembered one.

| Option | What it fixes |
|---|---|
| `--settings DIR` | A profile of its own, so your settings are not the editor's usual ones |
| `--project DIR` | Opens this folder as the project |
| `--window WxH` | A known window size |
| `--title TEXT` | A known window title, which is also how you name a window to `locate` |
| `--terminal-font [FAMILY,]SIZE` | A legible terminal in a capture |
| `--no-welcome` | No welcome screen in the way |
| `--no-session-restore` | None of the previous session's files reopened |
| `--no-change-marks` | No change marks in the margin |

A `--window` as large as the screen opens undecorated, so that the editor and
the window manager agree there is no title bar.

## Lessons from recording the DITA tutorial

The 27 narrated stages of the DITA tutorial were recorded by driving a real
editor. These are the things that cost time, and they generalise beyond
recordings.

- **Check on a real display, not only in the test suite.** A green suite hid
  several faults that one live run found at once. A screenshot taken from the
  component tree rather than the screen is the trap to know about: it will
  happily confirm a position that is wrong.
- **A recording environment needs a window manager.** Bare Xvfb draws no
  frames, so dialogs have no title bar, border or shadow and look broken. Use
  the window manager your readers use, not one whose frames match nothing.
- **When the window manager and the toolkit disagree about decorations,
  everything is off by the height of a title bar.** That is what the
  undecorated screen-sized window is for.
- **Positions break; names don't.** Every measured coordinate in the tutorial's
  cue sheets broke the day a window manager arrived. Nothing named broke.
- **Ask the renderer, not the model.** A row's name is the text drawn in it,
  which is not always what the underlying object would call itself.
- **Check that a click did what it should.** Read the cursor back after a click
  in the document; check a dialog's title after pressing a button. A silent
  misclick makes a run wrong without making it fail.
- **Move the pointer the way a person does.** Open a menu by its path — the
  title, then across into the menu, then down its left side to the row. A
  diagonal crosses other menu titles and opens them.
- **Drop-downs open from their arrow.** Clicking the middle of an editable
  drop-down only places a text cursor in it.
- **Typing is guarded, and that guard is a feature.** `typeText` stops if focus
  moves part-way through, so a popup cannot quietly receive the rest of a
  listing.
- **Collect the changes that affect every step before recording any of them.**
  Anything global — how files are saved, how the pointer behaves — means
  recording everything twice if you find it on stage 20.
- **Don't drive an editor that is being rebuilt**, and don't run two capturing
  runs at once. They compete for the processor, and the one you keep shows the
  interface lagging behind the narration.
- **Leave the machine as you found it.** Editors left running hold file-watch
  handles, and the next person's test suite fails on a limit rather than on a
  bug.

## Limits

- Driving needs a running editor with a window. The headless server refuses
  these methods, and the command line has no interface to drive.
- The HTML preview is a web view, and `locate` cannot see inside it yet. Clicks
  and scrolls there are still positional.
- Targets named by XPath are not available; `locate` works from what is drawn.
- Driving is reachable over the integration server only. These methods are not
  MCP tools, because they are not something an assistant should reach for.

## Related

:::cards
- **[Connecting an AI assistant](/automation/mcp)** {icon="sparkles"}
  The same server, for DITA operations rather than the interface.

- **[The command line](/reference/cli)** {icon="terminal"}
  The options that give a run its starting state.

- **[Settings](/reference/settings)** {icon="menu"}
  Where the integration server is turned on.
:::
