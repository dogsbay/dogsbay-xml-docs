---
title: Previewing and publishing
description: See a styled preview while you write, then build deliverables with DITA-OT.
type: how-to
---

# Previewing and publishing

A preview is immediate and approximate, so you can check your work as you
write. A build is the final output that DITA-OT creates from a
deliverable's map, conditions, and parameters.

## Previewing while you write

Select **View > Preview in Tab**, or **View > Preview in Split** to keep the
source beside it. The preview refreshes as you edit.

The preview is not a plain rendering of the file you have open. It resolves
conrefs, so reused content appears where it is pulled in, and it resolves key
references when it knows which map provides the context.

From the command line:

```bash
dogsbay-xml preview topics/installing-audacity.dita \
  --map audacity-guide.ditamap --output preview.html
```

Two options change what you see:

| Option | Effect |
|---|---|
| `--ditaval` | Apply a filter, so you preview one audience or platform. |
| `--show-changes` | Render open agent proposals as insertions, deletions, and comments instead of the document as it would read with everything accepted. |

Without `--output` the HTML goes to standard output.

## Deliverables

A deliverable defines one output: a map, a transform type, a DITAVAL, parameters,
and an output directory. A project usually has several, such as an HTML guide
for each platform and a PDF for print.

Deliverables come from a DITA project file, which is a standard rather than
something this editor invented, so the same definitions work with DITA-OT
directly.

When a project has no project file, DogsBay XML uses the default root map. You
can therefore build a documentation set that is not yet formalized.

## Building

```bash
dogsbay-xml build .
dogsbay-xml build . html-guide
```

The first builds every deliverable; the second builds one by name. The command
exits with a nonzero status when any build reports errors, so it works as a
pipeline step.

Two options are worth knowing:

| Option | Effect |
|---|---|
| `--dita-ot` | Use a different DITA-OT than the one the project configures. |
| `--output` | Put the output somewhere else, each deliverable under its own subdirectory. |
| `--keep-temp` | Keep DITA-OT's temporary files. See [Keeping temporary files](#keeping-temporary-files). |

Building requires DITA-OT. The sample project is configured with one already.

## Output types

The bundled DITA-OT includes plugins for the following output types.

| Transtype | Produces |
|---|---|
| `html5` | DITA-OT's HTML output. |
| `pdf` | A PDF rendered by Apache FOP. See [PDF](#pdf). |
| `dogsbay` | A dogsbay site project in the output folder: a Markdown page per topic, `index.md`, `nav.yml`, and `dogsbay.config.yml`. The pages match what `html5` shows. |
| `dogsbay-site` | The same project, then the built site in `astro/dist`. It installs the site's packages from npm, so it needs network access and takes longer. |

The two dogsbay types need **Node.js 20 or later**; `dogsbay-site` also needs
the dogsbay CLI. If the requested output type is unavailable, the build
reports an error and lists the available types.

### PDF

A deliverable with transtype `pdf` uses the bundled Apache FOP renderer.
No separate renderer installation is required. The editor, command line,
and agent use the same renderer.

PDFs embed Liberation Serif, Liberation Sans, and Liberation Mono fonts.
These fonts are metric-compatible with Times New Roman, Arial, and Courier
New. They also support Hebrew, Cyrillic, Greek, the minus sign, and arrows
that the built-in PostScript fonts do not support.

The renderer selects a font for each text run. Characters that the selected
font does not support can be omitted from the output. Embedded fonts allow
PDF viewers to use the same fonts on different computers.

To use the built-in fonts, copy DITA-OT's font mapping into a PDF
customization directory:

```bash
mkdir -p mypdf/fo
cp "<framework>/dita-ot/plugins/org.dita.pdf2/cfg/fo/font-mappings-base14.xml" \
   mypdf/fo/font-mappings.xml
```

Then set `customization.dir` to `mypdf` in the deliverable's publication
parameters.

To include an index in the PDF, add `<indexlist/>` to the bookmap.
The build report summarizes rendering warnings, such as missing characters,
overflowing text, and changes to table layout.

## Live preview

Select **Project > Live Preview** to build and serve a `dogsbay` deliverable.
When you save a topic, the preview rebuilds and reloads the browser page.

```bash
dogsbay-xml live-preview start -d site .   # in the background
dogsbay-xml live-preview status .          # every preview of this project
dogsbay-xml live-preview stop -d site .    # or --all
dogsbay-xml live-preview run -d site .     # in the foreground; Ctrl+C stops it
```

You can run multiple previews of a project with different filters, such as
macOS and Windows editions of a guide. The editor, command line, and agents
can list and stop previews on the same computer, regardless of which
interface started them. Agents use `live_preview` to start a preview and
`live_preview_status` to check its status.

Live preview requires Node.js 20 or later and the dogsbay CLI. Search is
available only in a production build. Publish with `dogsbay-site` to include
search.

## Keeping temporary files

DITA-OT normally deletes its temporary files when a build finishes. These are the preprocessed files it publishes from, with conrefs, keys, and filtering already applied, so they show exactly what DITA-OT resolved. Keep them when output is missing content or a condition does not filter the way you expect.

To keep them for a deliverable, open **Project > Project Tools > Manage Deliverables**, edit the deliverable, and select **Keep temporary files**. This sets the standard DITA-OT parameter `clean.temp` to `no`, so the setting also works when you build with DITA-OT directly. To keep them for one build only, use `dogsbay-xml build . --keep-temp`.

The files are kept in `.dogsbay/temp/<deliverable>` in the project. Each build replaces its deliverable's previous temporary files, and the folder is ignored by Git. After a build, select **Open Temp Folder** in the results to open it. To remove every kept folder, select **Project > Project Tools > Clear Temporary Build Files**.

Agents can ask for the files with the `keepTemp` option of the `build_deliverables` tool, then read them to find out why a build did not produce what you expected.

## Checking before you publish

A build that succeeds can still be missing content, because a key that fails
to resolve does not always stop the build.

```bash
dogsbay-xml validate-deliverables .
dogsbay-xml validate-ot .
```

`validate-deliverables` validates each deliverable with its own map and
conditions. It lists each invalid file once, with the deliverables it breaks. `validate-ot` goes further and runs DITA-OT preprocessing, which
is the only way to catch a key or conref that resolves in one build and not in
another.

Use `project-health` for source checks, or `check` to include the build and
output-link checks:

```bash
dogsbay-xml project-health .   # the health report on its own
dogsbay-xml check .            # health, then the build, then the built output
```

In the editor, select **Project > Check Project** to run `check`. Its final
stage checks the output folder for links to missing pages, fragments, and
images. To check an output folder separately, run
`dogsbay-xml check-output-links out/`.

For PDF output, this stage checks that the deliverable produced a nonempty
file. It does not validate links within the PDF.

## Related

:::cards
- **[Conditional content](/authoring/conditional-content)** {icon="filter"}
  What each deliverable's DITAVAL includes and excludes.

- **[Validating a project](/finding/validation)** {icon="check"}
  The checks worth running before a build.
:::
