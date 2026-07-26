# Best Practices

Patterns that keep data maintainable and avoid breaking rosters players have
already saved.

## Keep IDs stable across releases

Saved rosters reference the IDs of your entries, not their names. If you
regenerate the ID of an entry that is already published, every roster that used
it breaks.

- Do not regenerate IDs on entries that are already live.
- Renaming is safe, since names are not the identity, but keep the IDs.
- Keep `.gst` and `.cat` filenames stable after release as well.

## Define once, link everywhere

Put weapons, rules, and other reusable pieces under Shared Entries, or in a
shared library catalogue, and [link](/guide/concepts/links) to them. There is
then one definition to update instead of many copies to keep in sync. Every
major BSData repo follows this pattern.

To move an existing entry into Shared Entries, right-click it and choose **Move
To**. Moving an entry from Root Selection Entries into Shared leaves a link in its
place, so the entry keeps working while its definition becomes reusable.

## Put each profile on the entry it describes

A profile belongs on the thing it describes: a model's stats on the model, a
weapon's stats on the weapon. Don't tack every profile onto the unit.

```
No:
Unit  [model stats, weapon stats]

Yes:
Unit
└─ Model     [model stats]
   └─ Weapon [weapon stats]
```

This is not just tidiness. Export and datasheet tools read the entry hierarchy to
lay out their output, so a weapon profile parked on the unit instead of the
weapon can render under the wrong heading, in the wrong place, or not at all.
Building the tree correctly is what makes exports come out right.

The same applies to third-party tools. [YellowScribe](https://yellowscribe.link/)
imports a NewRecruit list into Tabletop Simulator, reading the datasheet output to
build the models and their stat tooltips — so a homebrew unit only comes through
correctly there if its profiles sit on the right entries.

## Scope rules as narrowly as the rule

Most rules should use the tightest scope that fits, usually `parent`, `unit`, or
`model` rather than `force` or `roster`. A scope wider than the rule needs is the
usual cause of an option applying to the whole army instead of one unit. See
[Scope & Context](/guide/concepts/scope).

## Make a freshly added unit legal

When a unit is first added it should already satisfy its own constraints. Give
mandatory choices a default with the `defaultAmount` field so the player starts
from a legal state and changes it from there, rather than seeing errors on a
brand new unit.

## Prefer a visible error over hiding

When something is not allowed, prefer telling the player why over making it
vanish. Two good options: forbid it with a `max 0` constraint so the entry stays
visible, or attach an **error, warning, or info message modifier** that explains
the problem when it applies. NewRecruit surfaces these messages on the roster, so
the player sees "X is not allowed with Y" instead of an option quietly
disappearing. Reach for hiding only when the option genuinely does not belong in
that context at all.

A constraint can also carry a custom `message`, shown when it is broken, so the
player reads a plain-language reason instead of a generic limit error.

## Working in the editor

A few operations that make editing faster:

- **Move To** — right-click a node to relocate it, for example into Shared
  Entries (see above).
- **Ctrl+click** to select multiple nodes, then copy, paste, or move them
  together.
- To control the order entries appear in, see [Sorting](/guide/advanced/sorting).

## Leave TODOs and warnings in the data

A node comment starting with `todo:`, `warning:`, or `error:` shows up as an
annotation on that node in the editor. It gives you a lightweight to-do and lint
system inside the data itself, so reminders and known issues travel with the file
instead of living in your head.

## Save catalogues as JSON for clean diffs

NewRecruit reads `.gst`/`.cat` as XML, zipped XML, or JSON. For a repository that
several people edit, JSON produces far cleaner git diffs and merges than XML.
Convert a whole system with the **Change File Format** button in the editor. NR
pretty-prints the JSON, so changes show up line by line instead of as one
rewritten blob.

## Test before publishing

Load the data in the builder and build a list with it before you publish. The
fast hot-reload loop (**Add from folder** on a Chromium browser) is described in
[Testing your data](/guide/install#testing-your-data).

The [local offline builder](https://github.com/giloushaker/nr-builder) is
another option, meant for testing data rather than making real rosters.

Don't confuse this with the website's "offline mode", which is a separate
setting that controls whether NewRecruit pre-downloads data for use without an
internet connection. It is not about local testing.

<!-- TODO: screenshots and concrete examples per section -->
