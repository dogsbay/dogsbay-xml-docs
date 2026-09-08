---
title: Installing
description: Install DogsBay XML from a packaged installer, or build it from source.
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
   where the [tutorial](./tutorial) starts.
:::

## Building from source

You need a JDK. You do not need to install Gradle: the `gradlew` script in the
repository downloads the version the build expects, and the build downloads
the JDK 25 toolchain it compiles against if your JDK is a different version.

```bash
git clone https://github.com/dogsbay/dogsbay-xml
cd dogsbay-xml
./gradlew run
```

The first run takes noticeably longer than later ones, because it is
fetching Gradle, possibly a JDK, and the project's dependencies.

Other tasks:

| Task | Result |
|---|---|
| `./gradlew run` | Start the editor |
| `./gradlew test` | Run the test suite |
| `./gradlew shadowJar` | Build a self-contained JAR |
| `./gradlew jpackage` | Build a native installer for the current platform |

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

### On a machine with no installer

For a build server or a container, download the `-all.jar` from the
[releases page](https://github.com/dogsbay/dogsbay-xml/releases) and run it
with any JDK 25:

```bash
java -cp dogsbay-xml-all.jar com.dogsbay.dogsbayaieditor.cli.DogsBayCli \
  project-health .
```

### From a source checkout

The `bin/dogsbay-xml` script in the repository runs the CLI out of a build
tree, so it needs the classes compiled and the libraries copied into `lib/`:

```bash
./gradlew syncLib classes
bin/dogsbay-xml --help
```

Some commands work entirely on files and need nothing else. Commands that
drive a running editor, such as `open` or `screenshot`, also need the
integration server.

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
