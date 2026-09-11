---
title: Building from source
description: Build the editor with Gradle and run the command line from a checkout or an all-in-one JAR file.
type: how-to
---

# Building from source

Use these instructions if you are working on the editor or running it where
you cannot use an installer, such as a build server, container, or CI job. To
use DogsBay XML without building it, [install a package](/getting-started/install).

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
| `./gradlew shadowJar` | Build the all-in-one JAR file |
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

Each release includes an all-in-one JAR file that contains the editor and its
dependencies. The file requires only JDK 25 on the machine, so it is suitable
for CI runners and containers that do not use an installer or desktop.

Download `dogsbay-editor-<version>-all.jar` from the
[releases page](https://github.com/dogsbay/dogsbay-xml/releases), then:

```bash
java -cp dogsbay-editor-4.0.0-beta.1-all.jar \
  com.dogsbay.dogsbayaieditor.cli.DogsBayCli project-health .
```

The JAR file starts the editor when you use `java -jar`. Name the CLI class to
run the command line instead. A shell alias shortens the command:

```bash
alias dogsbay-xml='java -cp /opt/dogsbay-editor-all.jar com.dogsbay.dogsbayaieditor.cli.DogsBayCli'
dogsbay-xml validate-deliverables .
```

All commands in [the command line reference](/reference/cli) work this way,
except commands that control a running editor.

## Related

:::cards
- **[Installing](/getting-started/install)** {icon="download"}
  The packaged installers, and the command line that comes with them.

- **[The command line](/reference/cli)** {icon="terminal"}
  Every command, grouped by what you are trying to do.
:::
