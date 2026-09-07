---
title: Welcome
description: Edit content/index.md to get started.
---

# Welcome

This is the starting point of DogsBay XML, built with
[Dogsbay](https://github.com/dogsbay/dogsbay). Replace this
content with your own — every `.md` file under `content/` becomes
a page.

> [!TIP]
> Edit this file (`content/index.md`) and save. The dev server
> reloads automatically.

## Get started in 60 seconds

:::steps
1. **Edit a page**
   Open `content/index.md` and change something. Save — the
   preview updates live.

2. **Add a page**
   Create `content/about.md` with frontmatter and a heading.

3. **Wire it in**
   Add the new page to `content/nav.yml` so it shows up in the
   sidebar.
:::

## Where to go next

:::cards
- **[Getting started](/getting-started)** {icon="rocket"}
  Three-minute orientation to editing, adding, and grouping pages.

- **[Configuration](/getting-started)** {icon="settings"}
  Site name, theme, base path, and per-source settings live in
  `dogsbay.config.yml`.

- **[Source on GitHub](https://github.com/dogsbay/dogsbay)** {icon="github"}
  Star, browse, file an issue, or follow the roadmap.

- **[Plugins](https://github.com/dogsbay/dogsbay/tree/main/docs)** {icon="puzzle"}
  Image zoom, TypeDoc, and your own — the plugin API is small,
  typed, and explicit.
:::

## Markdown that does more

Cards, steps, tabs, callouts, fenced code — Dogsbay markdown is
a small superset of CommonMark with directives for the components
docs sites need most. Here's the same config in two formats:

:::tabs
YAML
:   ```yaml
    site:
      name: DogsBay XML
      url: https://example.com
    content:
      sources:
        - path: ./content
          from: dogsbay-md
    ```

JSON
:   ```json
    {
      "site": { "name": "DogsBay XML" },
      "content": {
        "sources": [{ "path": "./content", "from": "dogsbay-md" }]
      }
    }
    ```
:::

For the full markdown reference, see
[github.com/dogsbay/dogsbay](https://github.com/dogsbay/dogsbay).
