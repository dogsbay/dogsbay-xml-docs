---
title: Formatting and encodings
description: Apply project formatting settings, reflow prose to one sentence per line, and handle characters that the file encoding cannot represent.
type: how-to
---

# Formatting and encodings

Formatting applies your project's settings for indentation, spacing, and line
breaks. These settings control the XML source layout. For an exception that
can affect published output, see [Known limitation](#known-limitation).

## Formatting a document

To format the open document, select **XML > Format**.
To format it each time you save, enable **Format on save** in
**File > Settings > Format**.

To format every XML file in the project, select
**Project > Project Tools > Format Project**.
If an open document has unsaved changes, the editor prompts you to save them
before formatting the files on disk.

Use the following commands to format files from the command line:

```bash
dogsbay-xml format --write topics/*.dita   # Format the files in place
dogsbay-xml format topics/install.dita     # Print the result without changing the file
dogsbay-xml format --check topics/*.dita   # List files that require formatting
```

The `--check` option leaves files unchanged and returns a nonzero exit status
if a file requires formatting. Use this option in continuous integration (CI)
checks. The editor and command line use the same project formatting settings.

## Reflowing prose

Select **XML > Reflow Sentences** or run `dogsbay-xml reflow` to start each
sentence on a separate line. This layout makes individual sentence changes
easier to review in a file comparison.

Reflow is a separate operation because sentence boundary detection can be
inaccurate. It preserves verbatim blocks.

## Formatting behavior

With the default settings, formatting preserves the following content and
layout:

- Content in `codeblock`, `pre`, `lines`, and `screen` elements, elements with
  `xml:space="preserve"`, and elements listed under
  [`preserve-space`](/reference/project-config#format-style)
- Existing line breaks in prose, including one sentence per line
- One blank line at each location that contains blank lines
- Spaces around inline elements, comments, and processing instructions within
  a sentence
- The file encoding, with the character handling described in [Encodings](#encodings)

Project settings can change how formatting handles line breaks and blank lines.
See [Format style](/reference/project-config#format-style).
Formatting an unchanged document a second time produces no further changes.

## Encodings

DogsBay XML reads and writes a file in the encoding specified by its XML
declaration, such as `UTF-8`, `ISO-8859-1`, `windows-1252`, or `Shift_JIS`.
Formatting preserves the encoding declaration and characters that the encoding
can represent, including accented and non-Latin text.

### Characters outside the file encoding

If the encoding cannot represent a character in text or an attribute value,
DogsBay XML writes a numeric character reference. For example, an arrow in a
Latin-1 file is written as `&#8594;`. An XML parser interprets this reference as
the original character.

If a `CDATA` section contains such a character, DogsBay XML converts the section
to escaped text to preserve its content. Other `CDATA` sections retain their
original form.

### Characters in comments and processing instructions

Character references in comments and processing instructions are literal text.
They cannot preserve characters that the file encoding cannot represent. The
save behavior depends on how you access the file:

- **In the editor**, saving continues, and a message identifies the affected
  character. The saved file loses that character.
- **Through an AI assistant or the command line**, saving fails with an error
  that identifies the affected character.

To preserve the character, change the XML declaration to `encoding="UTF-8"` and
save the file. For text in a comment, you can also move the text into element
content, where a character reference can represent it.

### Byte order marks

A byte order mark (BOM) is a marker at the beginning of some encoded files.
Formatting preserves an existing BOM and does not add one if it is absent.

## Known limitation

Formatting places adjacent inline elements on separate lines when their parent
element contains no text:

```xml
<p><uicontrol>Save</uicontrol><uicontrol>Exit</uicontrol></p>
```

The line break between the elements becomes a space in the published output,
producing `Save Exit` instead of `SaveExit`. Formatting preserves the spacing
when the parent element also contains prose.

If this limitation affects your content, keep the elements on one line and avoid
formatting that file, or combine the text in a single element.

## Related information

- [Format style](/reference/project-config#format-style): Project formatting
  settings, including attribute sorting
- [Format settings](/reference/settings#format): Default formatting settings
- [The command line](/reference/cli): The `format` and `reflow` commands and the
  `--check` option
