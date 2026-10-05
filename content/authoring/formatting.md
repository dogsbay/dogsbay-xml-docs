---
title: Formatting and encodings
description: Format documents to your project's house style, reflow prose one sentence per line, and keep every character your files contain.
type: how-to
---

# Formatting and encodings

Formatting lays a document out to your project's house style. It changes how the
file reads in a text editor and in a diff; it does not change what a reader of
the published output sees.

## Formatting a document

**XML ▸ Format Document** (or `F4`) formats the open document. **Format on save**
does it every time you save — turn it on in **File ▸ Settings ▸ Format**.

**XML ▸ Format Project** formats every XML file in the project. If any open
document has unsaved changes, it offers to save them first, so what it formats is
what you have been editing rather than what is on disk.

On the command line:

```bash
dogsbay-xml format --write topics/*.dita   # format the files in place
dogsbay-xml format topics/install.dita     # print the result, leave the file alone
dogsbay-xml format --check topics/*.dita   # list files that are not in house style
```

`--check` writes nothing and exits non-zero when a file would change, which is
what you want in CI. The editor and the command line use the same house style, so
they produce the same file.

## Reflowing prose

**XML ▸ Reflow Sentences** (or `dogsbay-xml reflow`) breaks prose so each sentence
starts on its own line. That keeps a diff to the sentences you actually changed
instead of re-wrapping a whole paragraph.

It is a separate, deliberate pass rather than part of formatting, because
detecting where a sentence ends is a guess. Verbatim blocks are left alone.

## What formatting never changes

Formatting is meant to be safe to run on anything, at any time. It leaves alone:

- the contents of `codeblock`, `pre`, `lines` and `screen`, and of any element
  with `xml:space="preserve"`, or any element you list under
  [`preserve-space`](/reference/project-config#format-style)
- the line breaks you typed in prose, so one sentence per line survives
- one blank line wherever you left blank lines
- the spaces around an inline element, a comment, or a processing instruction in
  the middle of a sentence
- your file's encoding, and the characters in it

Running it twice changes nothing the second time. If it does, that is a bug worth
reporting.

## Encodings

A file is read and written in the encoding its XML declaration names — `UTF-8`,
`ISO-8859-1`, `windows-1252`, `Shift_JIS` and the rest — and the declaration is
left saying the same thing. Accented and non-Latin text (`café`, `naïve`,
`こんにちは`) comes back exactly as you wrote it, however many times you format.

### A character your encoding cannot hold

If your text contains a character the file's encoding has no room for — an arrow
or an emoji in a Latin-1 file, say — it is written as a numeric character
reference (`&#8594;`) rather than being dropped. That is the same character,
spelled a way the encoding can carry, and every XML tool reads it back as the
original.

A `CDATA` section holding such a character is written out as ordinary escaped text
instead, which says the same thing to a reader. You may see a `<![CDATA[…]]>`
section you wrote appear as escaped text; the content is unchanged. This only
happens when there is something to rescue — otherwise your `CDATA` is left exactly
as you wrote it.

### The one place a character cannot be kept

Nothing can spell an arrow inside `<!-- a comment -->` or a processing
instruction: a character reference there is literal text, not the character. So if
your file's encoding has no room for it:

- **in the editor**, the save goes ahead and a message names the character, so you
  can decide
- **from an AI assistant or the command line**, the save is refused rather than
  done, because nothing would be there to notice the loss

Either way, the fix is to save the file as UTF-8 — change the declaration to
`encoding="UTF-8"` — or to move the text out of the comment.

### Byte-order marks

Some editors start a file with a short invisible marker (a "BOM"). Formatting
leaves it exactly as it found it: present if it was present, absent if it was not.

## Known limitation

Two inline elements written directly against each other, with no text beside them
in the same element, are laid out on separate lines:

```xml
<p><uicontrol>Save</uicontrol><uicontrol>Exit</uicontrol></p>
```

A reader of the published output sees `Save Exit` rather than `SaveExit`, because
the line break between them becomes a space. Where the paragraph also contains
prose — which is almost always — the spacing is preserved correctly.

If this affects your content, keep those elements on one line and do not format
that file, or put the text in a single element.

## Related

- [Format style](/reference/project-config#format-style) — the attributes a
  project can set, including sorting attributes
- [Format settings](/reference/settings#format) — your own default style
- [The command line](/reference/cli) — `format`, `reflow`, and `--check`
