---
title: Project configuration
description: The files in a project's .dogsbay folder, what each element means, and which ones to commit.
type: reference
---

# Project configuration

A project keeps its own configuration in a `.dogsbay` folder at the root of the project. The settings there travel with the content, so everyone who clones the project gets the same root map, framework, metadata policy and formatting. Settings that apply to every project, such as the editor theme and key bindings, are described in the [settings reference](/reference/settings).

## The .dogsbay folder

| File | Shared | Holds |
|---|---|---|
| `config.xml` | Yes, commit it | The project type, default root map, framework, default deliverable, metadata policy, formatting house style, and whether to format on save. |
| `local.xml` | No | Your personal overrides for this machine: a DITA-OT path and the deliverable you have selected. |
| `.gitignore` | Yes, commit it | Created with `config.xml`. It lists `local.xml` so personal settings stay out of the repository. |

Every file is optional. A missing file, or one that is not well-formed XML, is treated as if it were empty, and the editor falls back to what it can detect.

## Creating the configuration

When you open a folder that has no `config.xml` and the editor recognizes it as a DITA project, it writes a `config.xml` with the project type, the root map it detected, and the framework it chose. Commit the file if the choices are right, or change them and save again.

These actions write to `config.xml` and keep the parts they do not change:

| Action | Writes |
|---|---|
| **Project > Save Project Settings...** | The project type, framework, and default root map, and the selected deliverable as the default deliverable. |
| **Project > Metadata > Edit Policy...** | The metadata policy. |
| **Save to project (.dogsbay/config.xml)...** on the [Format](/reference/settings#format) settings page | The formatting house style and the format-on-save setting. |

Selecting a deliverable writes it to `local.xml`. You can also edit either file by hand. After editing by hand, open the project folder again so the editor picks up every change.

## config.xml

The root element is `dogsbay-project`. Each child element is optional.

| Element | Content | Meaning |
|---|---|---|
| `project-type` | `DITA`, `DocBook` or `None` | The kind of content in the project. |
| `default-root-map` | A path relative to the project root | The map used for validation, key resolution, and publishing. |
| `framework` | A framework name, such as `DITA-OT 4.3.5` | The framework the project requires, by name. Each person's editor finds its own installed framework with that name, so the file contains no machine paths. |
| `default-deliverable` | Attributes `file` and `name` | The deliverable selected when someone opens the project for the first time. `file` is the DITA-OT project file, relative to the project root, and `name` is a deliverable defined in it. |
| `metadata-policy` | `rule` elements | The metadata that topics must contain. See [Metadata policy](#metadata-policy). |
| `format-style` | Attributes, and optional `preserve-space` elements | The formatting house style. See [Format style](#format-style). |
| `format-on-save` | `true` | Reformats documents when they are saved. When the element is absent, format on save is off. |

The deliverables themselves are defined in the DITA-OT project file (`project.json`, `project.xml` or `project.yaml`), not in `config.xml`.

### Metadata policy

Each `rule` element in `metadata-policy` requires, recommends or forbids one metadata field. The [metadata audit](/authoring/metadata) checks topics against these rules.

| Attribute | Values | Default | Meaning |
|---|---|---|---|
| `field` | A field name from the table below | Required | The metadata field the rule checks. A rule with an unknown field is ignored. |
| `presence` | `required`, `recommended` or `forbidden` | `required` | Whether the field must be present, should be present, or must not be present. |
| `topic-type` | A topic type, such as `task` or `concept` | Any type | Limits the rule to topics of that type. |
| `allowed-values` | Values separated by spaces | Any value | The only values the field may have. |
| `pattern` | A regular expression | Any value | A pattern that the value must match. |

For an allowed value that contains spaces, add a `value` child element for it instead of using `allowed-values`. You can use both together.

The field names are `author`, `source`, `publisher`, `copyryear`, `copyrholder`, `created`, `created-golive`, `created-expiry`, `revised`, `revised-golive`, `revised-expiry`, `permissions`, `audience`, `audience-job`, `audience-experiencelevel`, `category`, `keyword`, `indexterm`, `prodname`, and `vrm-version`. A name with a suffix checks an attribute of the element: for example, `created` checks the `date` attribute of `<created>` and `created-golive` checks its `golive` attribute.

### Format style

The `format-style` attributes set the house style used by **Format Document**, by format on save, and by the `dogsbay-xml format` command. An attribute that is missing takes its default value.

| Attribute | Values | Default | Meaning |
|---|---|---|---|
| `indent` | `spaces` or `tabs` | `spaces` | The character used for one level of indentation. |
| `size` | A number | `2` | Spaces per indentation level, or the display width of a tab. |
| `max-line-width` | A number | `0` | The column at which prose is wrapped. `0` never wraps prose, which keeps diffs small. |
| `preserve-mixed` | `true` or `false` | `true` | Keeps elements that mix text and markup, such as a paragraph with inline elements, on their existing lines. |
| `newline` | `lf`, `crlf` or `platform` | `lf` | The line ending. `platform` uses the line ending of the computer doing the formatting. |
| `final-newline` | `true` or `false` | `true` | Ends the file with a newline. |
| `preserve-text-breaks` | `true` or `false` | `true` | Keeps the line breaks you typed in prose, so one sentence per line survives formatting. |
| `preserve-blank-lines` | `true` or `false` | `true` | Keeps one blank line where you left blank lines, and removes the extras. |
| `text-continuation` | `block` or `flush` | `block` | Where the continuation lines of wrapped text start. `block` aligns them with the element's indentation, and `flush` starts them at the first column, so moving an element does not re-indent its text. |
| `trim-whitespace` | `true` or `false` | `true` | Removes whitespace at the ends of lines. |

The contents of `codeblock`, `pre`, `lines` and `screen` elements are never reformatted. To protect other elements in the same way, add a `preserve-space` child element for each one, containing the element name.

If a project has no `format-style`, the editor uses the style on the [Format](/reference/settings#format) settings page.

## local.xml

The root element is `dogsbay-project-local`. The file is ignored by Git.

| Element | Content | Meaning |
|---|---|---|
| `dita-ot-path` | An absolute path | The DITA-OT installation to use for this project on this machine. It overrides the framework named in `config.xml`. |
| `active-deliverable` | Attributes `file` and `name` | The deliverable you last selected. It overrides `default-deliverable` for you. |

## How the DITA-OT is found

The editor uses the first DITA-OT installation that it finds in this order:

1. The `dita-ot-path` in `local.xml`.
2. The installed framework whose name matches `framework` in `config.xml`.
3. The first installed framework that has a DITA-OT path.

## Example

This is the `config.xml` from the sample project:

```xml
<dogsbay-project>
  <project-type>DITA</project-type>
  <default-root-map>audacity-guide.ditamap</default-root-map>
  <framework>DITA-OT 4.3.5</framework>
  <default-deliverable file="project.json" name="full"/>
  <metadata-policy>
    <rule topic-type="task" field="created" presence="required" pattern="\d{4}-\d\d-\d\d"/>
    <rule field="author" presence="recommended"/>
    <rule field="keyword" presence="required"/>
  </metadata-policy>
  <format-style indent="spaces" size="2" max-line-width="0" preserve-mixed="true" newline="lf" final-newline="true" preserve-text-breaks="true" preserve-blank-lines="true" text-continuation="block" trim-whitespace="true"/>
</dogsbay-project>
```

The policy requires every task to record a creation date in the form `2026-01-31`, requires a keyword in every topic, and recommends an author. Format on save is off because the file has no `format-on-save` element.

## Related

- [Settings reference](/reference/settings)
- [Metadata](/authoring/metadata)
- [The command line](/reference/cli)
