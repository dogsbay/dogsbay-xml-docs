---
title: Installing
description: Install DogsBay XML, put its command line on your PATH, and turn on the integration server.
type: how-to
---

# Installing

DogsBay XML runs on Linux, macOS, and Windows.

## Installing from a package

Each installer bundles its own Java runtime, so no separate JDK is required.

:::steps
1. **Download the installer for your platform**
   Go to the [releases page](https://github.com/dogsbay/dogsbay-xml/releases)
   and download the `.deb` or `.rpm` package for Linux, the `.dmg` for macOS,
   or the Windows installer.

2. **Install it the usual way for your platform**
   On Linux, install the package with your package manager. On macOS, open the
   disk image and drag the application to the Applications folder. On Windows, run the
   installer.

3. **Start the editor**
   The Welcome tab opens. From there you can open the sample project, which is
   where the [tutorial](./tutorial-manual) starts.
:::

## The command line

The installers put a `dogsbay-xml` executable beside the editor, so the command
line requires neither a JDK nor a running editor.

Add its directory to your `PATH` to run it by name:

:::tabs
Linux
:   ```bash
    export PATH="/opt/dogsbay-xml-editor/bin:$PATH"
    dogsbay-xml --version
    ```

    Add the `export` line to `~/.bashrc` or `~/.zshrc` to keep it.

macOS
:   ```bash
    export PATH="/Applications/DogsBay-XML-Editor.app/Contents/MacOS:$PATH"
    dogsbay-xml --version
    ```

    Add the `export` line to `~/.zshrc` to keep it.

Windows
:   ```powershell
    $env:Path += ";C:\Program Files\DogsBay-XML-Editor"
    dogsbay-xml --version
    ```

    That lasts for the session. To keep it, add the folder under
    **Settings > System > About > Advanced system settings >
    Environment Variables**.
:::

Some commands work entirely on files and need nothing else. Commands that
control a running editor, such as `open` or `screenshot`, also need the
integration server.

To build the editor or run the command line where you cannot use an installer,
see [Building from source](/developers/build-from-source).

## Uninstalling

Removing the application leaves your settings and the agent's history in place, so that reinstalling puts you back where you were.

:::tabs
Linux
:   ```bash
    sudo apt remove dogsbay-xml-editor       # or: sudo dnf remove dogsbay-xml-editor
    ```

macOS
:   ```bash
    rm -rf /Applications/DogsBay-XML-Editor.app
    ```

Windows
:   Remove **DogsBay XML** in **Settings > Apps > Installed apps**.
:::

### Removing your data as well

> [!WARNING]
> `~/.xagent/sessions` holds every conversation you have had with the agent. Deleting it cannot be undone and no reinstall brings those transcripts back. If you want to keep any of them, export them first with `/export` in the agent panel, or copy the directory somewhere else.

Deleting `~/.dogsbay` also discards the integration server's access token, so any AI assistant you had configured needs the new one.

:::tabs
Linux
:   ```bash
    rm -rf ~/.dogsbay ~/.cache/dogsbay ~/.xagent
    ```

macOS
:   ```bash
    rm -rf ~/.dogsbay ~/Library/Caches/dogsbay ~/.xagent
    ```

Windows
:   ```powershell
    Remove-Item -Recurse "$HOME\.dogsbay", "$HOME\.xagent", "$env:LOCALAPPDATA\dogsbay"
    ```
:::

### Where your sign-ins are kept

The agent stores your ChatGPT sign-in and any API keys in one of two places, and which one depends on the machine.

**The operating system's credential store**, when there is one. This is the usual case, and it survives removing the application, so deleting the directories above does not sign you out.

**Files under `~/.xagent`**, when no credential store is available. This happens on a machine with no keyring running, and on some headless and remote sessions. The ChatGPT sign-in goes to `~/.xagent/auth.json`, and an API key you asked the editor to remember goes to `~/.xagent/settings.json` **in plain text**. The agent tells you which it used at the time it saves a key.

The quickest way to clear a credential is from inside the editor: open the AI Agent panel, select the gear, and use **Forget all sign-ins**. The same dialog tells you what is stored for the selected provider, and **Forget key** (or **Sign out** for ChatGPT) removes just that one. Your sessions are not touched.

Those buttons cover both places, so you do not need to know which one your machine used.

To clear the credential store directly, without the editor:

:::tabs
Linux
:   ```bash
    secret-tool search --all service dogsbay-agent    # see what is stored
    secret-tool clear service dogsbay-agent account oauth-tokens
    secret-tool clear service dogsbay-agent account anthropic
    secret-tool clear service dogsbay-agent account openai
    secret-tool clear service dogsbay-agent account gemini
    ```

    The Passwords and Keys application (Seahorse) shows the same entries if you prefer to look before you delete.

macOS
:   ```bash
    security delete-generic-password -s dogsbay-agent
    ```

    Run it once per stored item; it removes one each time and reports when none are left.

Windows
:   Open **Credential Manager**, select **Windows Credentials**, and remove the entries beginning with `dogsbay-agent`.
:::

> [!NOTE]
> This is why the agent can still answer after what looks like a clean install: the settings are gone, but the sign-in is not.

### What each directory holds

| Directory | What is in it |
|---|---|
| `~/.dogsbay` | Your settings, in `settings.xml`, plus the bundled DITA grammars, imported frameworks, and the integration server's token. |
| `~/.cache/dogsbay` | The snapshot of which agents are available to run as [hosted agents](/agent/hosted-agents). The editor rebuilds it, so you can delete it at any time. |
| `~/.xagent` | The built-in agent: your provider and model choice in `settings.json`, every conversation transcript in `sessions/`, and, on a machine with no credential store, your sign-in in `auth.json` and a remembered API key in `settings.json`. |


Projects keep their own state, which you can remove per project:

| Directory | What is in it |
|---|---|
| `<project>/.dogsbay` | Project settings, the agent audit log, and hosted agent session names. |
| `<project>/.xagent` | The agent's undo checkpoints for the last turn. |

### Starting fresh without uninstalling

To see what a new reader sees, keep the application and delete the settings:

```bash
rm -rf ~/.dogsbay ~/.cache/dogsbay
```

The editor writes a new `~/.dogsbay/settings.xml` on the next start, and re-extracts the grammars it needs. Leave `~/.xagent` alone to keep your sign-in and your conversations.

## Turning on the integration server

AI assistants and live-editor commands connect to the integration server. The
server is off until you turn it on.

:::steps
1. **Open the settings**
   Select **File > Settings**.

2. **Turn the server on**
   Select **Server**, and then enable the server.

3. **Check that it is listening**
   Run `dogsbay-xml status`.
:::

> [!NOTE]
> The built-in AI agent does not need the integration server. It calls the
> editor's operations directly, inside the same process.
