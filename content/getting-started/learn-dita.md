---
title: Learning DITA
description: The DITA tutorial builds the editor's sample project one feature at a time, in 27 stages, with written lessons and a video for each.
type: explanation
---

# Learning DITA

DogsBay XML is an editor, not a DITA course. If you are new to DITA, or new to a part of it, the tutorial is where to go: it builds a real user guide one feature at a time, and the project it ends with is the sample this editor ships.

## The tutorial

**[Learn DITA by building a user guide](https://dogsbay.ai/dogsbay-xml-dita-tutorial-docs/)** — 27 stages, from one topic to a filtered, indexed, key-driven publication set. Each stage adds one DITA feature, builds it, and checks it. Videos are being recorded, one per stage, linked from each lesson.

The lessons use DogsBay XML, but nothing in them depends on it. Any XML editor and DITA-OT will follow along.

## The sample project

**File** > **Open Sample Project** copies the finished guide — the result of the last stage — into a folder you choose, and opens it. It is a healthy project: **Project** > **Check Project** is clean, and every deliverable in its `project.json` builds. Use it to read a finished DITA project, to try a command on something real, or to compare against your own work.

Each stage is also a branch of [the tutorial repository](https://github.com/dogsbay/dogsbay-xml-dita-tutorial), from `tutorial/00-setup` to `tutorial/26-final`, so you can see any stage without Git: browse the branch on GitHub, or download it as a zip.

## Fixing a project you have inherited

Finding and repairing what is wrong with a DITA project someone else wrote — with the audits, and with the agent doing the repetitive part — is its own tutorial, over a project written to be broken. It is being prepared separately. In the meantime, [Validating a project](../finding/validation) covers the audits, and [The agent, and what it may touch](../agent/overview) covers what the agent is allowed to do.
