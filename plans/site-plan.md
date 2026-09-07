# Building the DogsBay XML documentation site

The plan for `dogsbay-xml-docs`: what it contains, how it is organised, how it
is written, and how each claim in it is kept true. Written 2026-09-07.

## What this site is for

A reader arrives with one of four needs, and Diátaxis names them: to learn by
doing, to get a job done, to look something up, or to understand why the
product works the way it does. Every page serves exactly one of those, and
says which in its frontmatter.

Two audiences matter, and they are not the same person on the same day:

- **A technical writer evaluating the product.** Their first hour decides
  everything. They should reach a working DITA project and a useful agent
  edit inside it without reading a reference page.
- **A writer who already uses it** and wants one thing done: a refactoring,
  a conditional build, a key that resolves.

## What makes this product worth documenting well

The differentiator is not that there is an AI agent in an XML editor. It is
that the agent works on the content model rather than on text, and that every
edit it makes is reviewable before it lands. That story runs through
proposals, the write gate, permission tiers and the audit trail. It appears
early, in the tutorial, not in a chapter at the back.

The second differentiator is that the GUI, the CLI and the MCP server are
three interfaces to one command engine, so a rule enforced while typing is
the same rule CI enforces. The earlier documentation attempt put this well
and it is worth carrying forward in substance.

## Structure

Nav is grouped by task, because that is how people look for things. Diátaxis
governs the shape of each page, declared as `type:` in frontmatter. The two
are not in conflict: the reader navigates by goal, the writer is disciplined
by category.

Planned top level, subject to what the code inventory says exists:

1. **Start here** — what it is, install, and the tutorial.
2. **Working with the agent** — early and prominent.
3. **Authoring DITA** — topics, maps, keys, reuse, conditions.
4. **Finding and changing** — search, where-used, refactoring, validation.
5. **Publishing** — preview, DITA-OT, deliverables.
6. **Automation** — CLI, MCP, CI.
7. **Reference** — commands, shortcuts, configuration.

### Getting started is the Audacity tutorial

`dogsbay-xml-dita-tutorial` is a complete, deliberately broken Audacity user
guide. It is the getting-started path: open the sample, see what is wrong with
it, and fix some of it with the agent. The reader ends the tutorial with a
project that builds and a clear idea of what the product is for.

That repository ships in the editor as the bundled sample project, so the
tutorial's first step is a menu item rather than a download.

## Style

**The IBM Style Guide governs the prose.** In particular:

- Second person, present tense, active voice. "Select **File > Open**", not
  "the file can be opened".
- Sentence-style capitalisation in headings. Task titles are gerunds
  ("Validating a project"); concept titles are nouns ("Key spaces").
- One action per numbered step. The result of a step goes in the same step.
- No Latin abbreviations: "for example", not "e.g.".
- No "simply", "just", "easy", "obviously". They are false for the reader who
  is stuck, which is the reader reading.
- "Might" for possibility, not "may", which reads as permission.
- One name per thing, used every time. If the panel is the Map Explorer, it is
  never also the DITA Explorer.

This differs from the register used in the repository's own commit messages
and design notes, deliberately. Documentation is not commentary.

## Every claim is checked against the code

The previous attempt drifted, and the drift was structural rather than
careless: menu paths and counts were retyped on many pages, and when the
product moved they were all wrong at once. Two audits five days apart
recorded it, and the second found that the first had introduced a fresh
error.

So:

- **The code is the source of truth.** The existing `docs/` in the editor
  repository is a guide to what exists, not evidence that it works that way.
  A claim that came from a doc gets verified before it is repeated.
- **Verify volatile facts, always.** Menu paths, keyboard shortcuts, command
  names and flags, panel names, counts and version numbers. Every one of these
  is a claim about code that can be checked in the code.
- **Do not write counts.** "Twenty-three commands" is wrong the day a command
  is added. Name the ones that matter and link the reference.

Already found by checking rather than trusting: the existing docs send the
reader to **Utilities > Preview in Tab**, and `MenuBuilder` adds those actions
to the **View** menu.

## Illustration

Screenshots where the interface is the subject, and nowhere else. The
existing Author view page has nine and is better for it; the previous attempt
had none across forty-six pages and was worse for it. Screenshots are
expensive to keep true, so each one has to earn its place.

## Build and deploy

Settled, and working, from the `dogsbay-ai-blog` precedent:

- Content is Markdown in `content/`; `dogsbay site build` generates `astro/`.
- `astro/` is committed. Cloudflare Workers Builds runs `pnpm build` there and
  never runs `dogsbay site build`, so regenerate locally and commit the result.
- `dist/`, `node_modules/` and `.dogsbay/` are not committed. The previous
  attempt committed a stale half-built `dist/`, which is worse than none.
- Worker name, repository name and site path are all `dogsbay-xml-docs`. They
  must match or the build fails.
- `astro/.npmrc` sets `node-linker=hoisted` and is load-bearing.
- `dogsbay site check` runs before publishing; it catches broken links and
  missing metadata.

## Order of work

1. Landing page and nav skeleton, so the shape is visible.
2. The tutorial, end to end, tested by following it.
3. The agent pages, which are the reason to choose this product.
4. DITA authoring, then finding and changing.
5. Reference, largely derived from the CLI and MCP surfaces.
6. Publishing and automation.

Each phase ends with `site build`, `site check`, and reading the pages in a
browser.

## Not in scope

Migrating the editor's `docs-dev/` design notes. They are contributor
material and belong with the code, not on a product site.
