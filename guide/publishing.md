# Publishing Your Data

Any GitHub repository with your game system and catalogue files at the root can
be loaded directly into NewRecruit, whether they are XML (`.gst`/`.cat`) or JSON.
No release pipeline is required.

## Publish a new system

1. Create a GitHub repository and push your data files to its root (XML
   `.gst`/`.cat`, or JSON).
2. In NewRecruit, open the systems list and click **Add more games**.
3. Click **Add from Github**.
4. Paste the repository URL and click the green **+**.

## Releases or commits

When NewRecruit loads a system from a repository, it uses the latest **release**
if the repository has any, and the latest **commit** otherwise. Cutting a GitHub
release therefore lets you keep working on the main branch without players
seeing changes until you publish the next release. A repository with no releases
simply tracks its latest commit. When adding a system, the player can also choose
between latest release and latest commit.

For the release path, NewRecruit asks GitHub for the latest release, which GitHub
picks by date, so a normal release flow just works. Tagging consistently as
`vX.Y.Z` is still good practice: it matters most if a system is configured to
track the latest tag instead of releases, since GitHub's tag ordering is not
reliably by date.

## Homebrew: editing an existing system

To modify existing data (a "homebrew"):

1. Fork the source data repository on GitHub (the repo URL is in the system's
   info panel in NR).
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_ACCOUNT/YOUR_FORK
   ```
3. Open the NR Data Editor and select the system. If it doesn't show up, click
   **Set Working Folder** and point it at your clone.
4. Edit, then commit and push:
   ```bash
   git add .
   git commit -m "describe your change"
   git push
   ```
5. Add your fork to NR via **Add from Github** (see above).

## Updating published data

How an update reaches players depends on how they got the system:

- **Systems on the built-in game list** are re-checked by the NewRecruit server
  roughly hourly, so pushing a commit (or cutting a release) reaches players on
  its own.
- **Systems a player added themselves** with **Add from Github** are only checked
  when first added. The player has to refresh NewRecruit (or fully close and
  reopen on mobile) to pull your changes.

If you keep the repository URL on the game system as a publication named
`github`, the editor auto-increments the catalogue revision once per change
against the repository, so you do not have to bump it by hand.

## Sharing with an install link

Instead of walking players through **Add from Github**, you can share a link that
adds the repository in one step. Post it in a Discord channel or a README and
players install by clicking it.

To get the link, open the system's info panel (for a system added from GitHub)
and click the **share** icon to copy the URL. It is also shown in a read-only box
during the **Add from Github** flow.

The link looks like this:

```
https://newrecruit.eu/app/MySystems?addSystem=ORG%2FREPO&ref=HEAD
```

## Getting listed in NewRecruit

Adding a system from GitHub is enough for anyone to load it by URL or install
link. Getting it into NewRecruit's built-in game list, where players find it
without a link, is a separate step: ask on the
[NewRecruit Discord](https://discord.gg/cCtqGbugwb).

A system is expected to roughly meet these before it is listed:

- **Maintained** — kept up to date as the game's rules and points change.
- **In English** — the built-in list is English.
- **Not a homebrew of an existing system** — a variant or house-rules fork of a
  game already covered belongs as its own shared repository, not a second entry
  in the list. New games and original systems are fine.

