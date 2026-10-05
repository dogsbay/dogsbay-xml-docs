---
title: Driving the editor
description: Automate the editor interface for screen recordings, end-to-end tests, and scripted demonstrations by locating controls by name.
type: how-to
---

# Driving the editor

Use the integration server to open menus, click buttons, enter text, and scroll
panels from a script. You can automate the editor interface for screen
recordings, end-to-end tests, and scripted demonstrations.

To run DITA operations through an AI assistant, see
[Connecting an AI assistant](/automation/mcp).

## Enabling interface automation

Methods that run menu commands, enter text, or execute terminal commands require
`--allow-driving`. The server token alone does not authorize these methods.

:::steps
1. **Start the editor with interface automation enabled.**
   ```bash
   dogsbay-xml gui --allow-driving
   ```

2. **Verify that the integration server is enabled.**
   Enable the server in **File > Settings > Server** or in the project settings.
:::

The following table lists the methods and their requirements:

| Method | Description | Requires `--allow-driving` |
|---|---|---|
| `locate` | Returns the location of an interface element | No |
| `reveal` | Scrolls an interface element into view and returns its location | No |
| `locateRange` | Returns the on-screen rectangles for a range of the open document | No |
| `clickButton` | Clicks a button by its label or returns its location | Only to click |
| `invokeAction` | Runs a menu command by its ID | Yes |
| `typeText` | Enters text through the component's key handling | Yes |
| `terminalRun` | Runs a command in the editor's terminal | Yes |
| `setCursor`, `selectElement`, `selectPanel`, `switchSidebar` | Changes the cursor position, selection, or visible panel | No |
| `waitIdle` | Waits until the interface stops changing | No |
| `screenshot` | Captures the window | No |

`invokeAction` and `clickButton` return before the action completes. This behavior
allows a script to interact with a modal dialog that the action opens. The server
checks for unknown action IDs, unknown buttons, and disabled controls before
scheduling the action. To verify the result, call `waitIdle` or query the
interface element that you expect to change.

## Locating controls by name

Use `locate` to find a control by its displayed text and type. Its position can
change with the window manager, theme, font, display scaling, or dialog content.
Coordinates copied from a screenshot can therefore target the wrong control.

The following request returns the screen bounds of the row labeled **topics**:

```json
{"method": "locate", "params": {"what": "row", "text": "topics"}}
```

| Type (`what`) | Matching criteria |
|---|---|
| `button` | Button label, tooltip, or accessible name, in that order |
| `menu` | Menu in the window's menu bar |
| `item` | Item in an open menu, including a context menu |
| `tab` | Tab in a tabbed pane |
| `row` | Displayed text of a row in a list, table, or tree |
| `field` | Label associated with a text field |
| `combo` | Currently displayed option in a drop-down list |
| `option` | Item in an open drop-down list |
| `text` | Text in the open document |
| `cell` | Table cell identified by `column` and `row`, including an empty cell |
| `status` | Tooltip of a status bar segment |

Matching ignores leading and trailing whitespace, case, a trailing ellipsis,
and a trailing colon. For example, `Add` matches **Add…**, and `Value` matches
the field labeled **Value:**.

The `what` parameter is required because the same text can identify different
types of controls, such as a row and a field label. Use the following parameters
to refine a match:

- `nth`: Selects a match by its position, starting at 1. Set `nth` to `0` to
  require a unique match.
- `column` and `row`: Identify a table cell by position. The `row` parameter
  accepts a number starting at 1 or `last`.
- `offset`: Specifies a position within a text match when `what` is `"text"`.

If no control matches, the error lists the available names. If several controls
match, the error lists their locations. A menu item in a closed menu returns a
"not on screen" error. Open the menu before locating the item.

## Scrolling controls into view

Use `reveal` when a control is outside the visible area. It supports the same
types as `locate` and returns the control's location after scrolling. To scroll a
panel to its beginning or end, specify `"what": "panel"` and set `to` to `"start"`
or `"end"`.

```json
{"method": "reveal", "params": {"what": "panel", "panel": "Project Validation", "to": "end"}}
```

`reveal` preserves the cursor position, selection, and document content.

## Highlighting part of a document

Use `locateRange` to get the rectangles covering a range of characters in the
open document. Specify `start` and `end` as character offsets. Use this to draw
an annotation over a phrase, an element, or an attribute — for example, to
highlight what a narrator is describing in a screen recording.

```json
{"method": "locateRange", "params": {"start": 120, "end": 154}}
```

The response contains `start`, `end`, the `text` of the range, a `visibility`
value, and one rectangle per line as the line appears on screen. Each rectangle
includes its centre point. A paragraph that the editor wraps returns one
rectangle per wrapped row, not one rectangle for the whole paragraph.

`visibility` is `visible`, `partly`, or `hidden`. A range that is scrolled out of
the visible area returns `hidden` with no rectangles; call `reveal` and request
the range again. A range inside a collapsed fold returns an error, because
scrolling cannot make it visible.

Both offsets are required and must be whole numbers. A fractional offset returns
an error rather than being rounded. A range covering more than 400 lines returns
an error.

`locateRange` reports positions only. It does not scroll, move the cursor, or
change the selection.

## Clicking a button

Use `clickButton` to match a dialog button by its label and click it. To return
the button's location without clicking it, set `"press": false`. This setting
does not require `--allow-driving`.

For a recording that shows pointer movement, set `"press": false`, then use your
recording script to move the pointer to the button's center and click it.

The method selects a window in the following order:

1. The window that you specify
2. The active window
3. The only open dialog
4. The only open window

If multiple buttons match, or if multiple dialogs are open and none is active,
specify the button or window in your request.

## Setting the initial state

Use the following options to configure a reproducible session:

| Option | Description |
|---|---|
| `--settings DIR` | Uses a separate settings profile |
| `--project DIR` | Opens the specified folder as the project |
| `--window WxH` | Sets the window size |
| `--title TEXT` | Sets the window title, which you can use to identify the window in `locate` requests |
| `--terminal-font [FAMILY,]SIZE` | Sets the terminal font for recordings |
| `--no-welcome` | Hides the welcome screen |
| `--no-session-restore` | Prevents files from the previous session from reopening |
| `--no-change-marks` | Hides change marks in the margin |

If `--window` specifies a size as large as the screen, the editor opens without
window decorations, such as a title bar.

## Recording and testing guidelines

Use the following practices when you record or test the interface:

- **Verify positions on a display.** A capture from the component tree can omit
  window decorations and report positions that differ from those on the screen.
- **Use a window manager for recordings.** Xvfb alone does not draw window
  frames, title bars, or shadows. Use the window manager that your audience uses.
- **Account for window decorations.** Differences between the window manager
  and the toolkit can offset positions by the height of a title bar. A
  screen-sized window without decorations avoids this offset.
- **Locate controls by name.** Fixed coordinates can become incorrect when the
  display environment changes.
- **Use the text displayed in each row.** It can differ from the text stored in
  the underlying data model.
- **Verify the result of each click.** Query the cursor position after clicking
  in a document, or check the dialog title after clicking a button.
- **Keep pointer movement within the menu.** Move from the menu title into the
  menu, then down to the item. A diagonal movement can cross another menu title
  and open that menu.
- **Open drop-down lists by clicking their arrows.** Clicking the text area of
  an editable drop-down list places the text cursor there.
- **Check for interrupted text entry.** `typeText` stops if focus changes during
  text entry, preventing the remaining text from being entered in another control.
- **Finalize shared settings before recording.** Changes to file saving or
  pointer behavior can require you to record earlier steps again.
- **Run one recording at a time.** Build the editor before recording. Concurrent
  builds or recordings can slow the interface and affect narration timing.
- **Close the editor after each run.** Unused editor processes retain file
  watch handles and can cause later tests to exceed system limits.

## Limitations

- Interface automation requires a running editor window. The headless server
  rejects these methods.
- `locate` cannot identify controls inside the HTML preview. Use coordinates to
  click or scroll within the preview.
- `locate` identifies displayed controls and text. It does not support XPath
  targets.
- These methods are available only through the integration server. They are not
  exposed as MCP tools.

## Related information

:::cards
- **[Connecting an AI assistant](/automation/mcp)** {icon="sparkles"}
  Run DITA operations through the integration server.

- **[The command line](/reference/cli)** {icon="terminal"}
  Configure the initial state of an editor session.

- **[Settings](/reference/settings)** {icon="menu"}
  Enable the integration server.
:::
