---
title: Installing
description: Install DogsBay XML, put its command line on your PATH, and turn on the integration server.
type: how-to
---

# Installing

DogsBay XML runs on Linux, macOS and Windows.

## Installing from a package

Each installer bundles its own Java runtime, so no separate JDK is required.

:::steps
1. **Download the installer for your platform**
   Go to the [releases page](https://github.com/dogsbay/dogsbay-xml/releases)
   and download the `.deb` or `.rpm` package for Linux, the `.dmg` for macOS,
   or the Windows installer.

2. **Install it the usual way for your platform**
   On Linux, install the package with your package manager. On macOS, open the
   disk image and drag the application to Applications. On Windows, run the
   installer.

3. **Start the editor**
   The Welcome tab opens. From there you can open the sample project, which is
   where the [tutorial](./tutorial-manual) starts.
:::

## The command line

The installers put a `dogsbay-xml` executable beside the editor, so the command
line needs nothing else installed — not a JDK, and not the editor running.

Add its directory to your `PATH` to run it by name:

:::tabs
Linux
:   ```bash
    export PATH="/opt/dogsbay-xml/bin:$PATH"
    dogsbay-xml --version
    ```

    Add the `export` line to `~/.bashrc` or `~/.zshrc` to keep it.

macOS
:   ```bash
    export PATH="/Applications/DogsBay-XML.app/Contents/MacOS:$PATH"
    dogsbay-xml --version
    ```

    Add the `export` line to `~/.zshrc` to keep it.

Windows
:   ```powershell
    $env:Path += ";C:\Program Files\DogsBay-XML"
    dogsbay-xml --version
    ```

    That lasts for the session. To keep it, add the folder under
    **Settings > System > About > Advanced system settings >
    Environment Variables**.
:::

Some commands work entirely on files and need nothing else. Commands that
drive a running editor, such as `open` or `screenshot`, also need the
integration server, below.

Building the editor yourself, or running the command line where no installer
can go, is on [building from source](/developers/build-from-source).

## Turning on the integration server

The integration server is what AI assistants and the live-editor commands
connect to. It is off until you turn it on.

:::steps
1. **Open the preferences**
   Select **File > Preferences**.

2. **Turn the server on**
   Go to the **Server** page and enable the server.

3. **Check that it is listening**
   Run `dogsbay-xml status`.
:::

> [!NOTE]
> The built-in AI agent does not need the integration server. It calls the
> editor's operations directly, inside the same process.
