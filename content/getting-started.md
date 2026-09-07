---
title: Getting started
description: Quick orientation for new contributors.
---

# Getting started

Three minutes to your first edit. Powered by
[Dogsbay](https://github.com/dogsbay/dogsbay).

## 1. Edit a page

Open `content/index.md` in your editor and change something.
Save — the dev server reloads automatically.

## 2. Add a page

Create a new file like `content/about.md`:

```md
---
title: About
---

# About

Whatever you want to say here.
```

Then add it to `content/nav.yml` so it appears in the sidebar.
Each entry is a single-key map — key = label, value = file path:

```yaml
- About: about.md
```

External URLs work the same way:

```yaml
- GitHub: https://github.com/your-org/your-repo
```

## 3. Group pages

To create a section in the sidebar, give the entry a list of
children instead of a single file:

```yaml
- Guides:
    - Configuration: guides/configuration.md
    - Deployment: guides/deployment.md
```

The folder structure under `content/` doesn't have to match the
nav — but it usually does, because it makes URLs predictable.
