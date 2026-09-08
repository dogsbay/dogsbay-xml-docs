---
title: Building from source
description: Build the editor with Gradle, and run the command line from a checkout or from the uber-jar on a machine with no installer.
type: how-to
---

# Building from source

You need this page only if you are working on the editor itself, or running it
somewhere an installer cannot go — a build server, a container, a CI job. If
you just want to use DogsBay XML, [install a package](/start-here/install).

## Building

You need a JDK. You do not need to install Gradle: the `gradlew` script in the
repository downloads the version the build expects, and the build downloads the
JDK 25 toolchain it compiles against if your JDK is a different version.

```bash
git clone https://github.com/dogsbay/dogsbay-xml
cd dogsbay-xml
./gradlew run
```

The first run takes noticeably longer than later ones, because it is fetching
Gradle, possibly a JDK, and the project's dependencies.

| Task | Result |
|---|---|
| `./gradlew run` | Start the editor |
| `./gradlew test` | Run the test suite |
| `./gradlew shadowJar` | Build the uber-jar |
| `./gradlew jpackage` | Build a native installer for the current platform |

## Running the command line from a checkout

The `bin/dogsbay-xml` script runs the CLI out of the build tree, so it needs
the classes compiled and the libraries copied into `lib/`:

```bash
./gradlew syncLib classes
bin/dogsbay-xml --help
```

Both are needed. `syncLib` alone copies the dependencies but compiles nothing,
and the script runs from `build/classes`.

## Running on a machine with no installer

Each release attaches an uber-jar, which carries the editor and every
dependency in one file and needs only a JDK 25 on the machine. This is the
route for CI runners and containers, where an installer and a desktop are
beside the point.

Download `dogsbay-editor-<version>-all.jar` from the
[releases page](https://github.com/dogsbay/dogsbay-xml/releases), then:

```bash
java -cp dogsbay-editor-4.0.0-beta.1-all.jar \
  com.dogsbay.dogsbayaieditor.cli.DogsBayCli project-health .
```

The jar starts the editor under `java -jar`, so naming the CLI class is what
selects the command line instead. A shell alias keeps it readable:

```bash
alias dogsbay-xml='java -cp /opt/dogsbay-editor-all.jar com.dogsbay.dogsbayaieditor.cli.DogsBayCli'
dogsbay-xml validate-deliverables .
```

Everything in [the command line reference](/reference/cli) works this way,
except the commands that drive a running editor.

## Related

:::cards
- **[Installing](/start-here/install)** {icon="download"}
  The packaged installers, and the command line that comes with them.

- **[The command line](/reference/cli)** {icon="terminal"}
  Every command, grouped by what you are trying to do.
:::
