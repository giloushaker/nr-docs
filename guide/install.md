# Installing the Tools

The tools you need to create data, and how to get past the security prompts each
platform shows for an app it doesn't recognise.

## The NewRecruit Data Editor and Builder

Download both from the [NewRecruit download page](https://www.newrecruit.eu/download/):

- The **Data Editor** is where you create and edit data.
- The **Builder** (offline desktop version) is for testing your data.

The apps are not signed with a paid certificate, so Windows and macOS warn about
an unrecognised developer the first time you run them. The steps below clear that.

### Windows

Running the installer shows a blue **"Windows protected your PC"** SmartScreen
prompt. Click **More info**, then **Run anyway**. This appears because the app is
from an unrecognised publisher, not because anything is wrong.

Windows 8.1 and earlier are not supported.

### macOS

macOS blocks unsigned apps with a message that the app is **"damaged and can't be
opened"** or from an unidentified developer. Move the app into `Applications`,
then remove the quarantine flag from a Terminal:

```bash
xattr -c /Applications/NewRecruit.app
```

Then open the app normally. (If the app has a different name, adjust the path.)
macOS support is not a priority, so expect the occasional rough edge.

### Linux

Builds are on the download page. Note the desktop builder is not tested on Linux;
the website builder works in any Chromium-based browser.

## Git and GitHub

Publishing your data, and editing an existing system, both use a normal git
workflow, so install one way to work with git:

- [Git for Windows](https://git-scm.com/download/win)
- [GitHub Desktop](https://desktop.github.com/) — friendlier if you're new to git
- Or the git client built into an IDE

You also need a [GitHub](https://github.com) account to host and publish your
data. See [Publishing Your Data](/guide/publishing).

## Next

Once the editor is installed, [Your First Game System](/guide/first-system) walks
through building one from scratch.
