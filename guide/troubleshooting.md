# Troubleshooting

Find the behaviour you are seeing and the likely cause. These are the problems
data authors hit most often.

## My unit doesn't appear in the builder

Usually one of the links between the unit and the force is missing:

- The unit has no **primary category**. A unit with no primary category is not
  placed anywhere and often does not show.
- That category is not **made available in the force**. A category only appears
  as a slot once the force has a category entry pointing at it.
- The unit is not under **Root Selection Entries**, or the root link is missing,
  so nothing references it.

Work back along that chain: unit has a primary category, the force offers that
category, and the unit is reachable from a root entry. See
[Your First Game System](/guide/first-system) for the full setup.

## I edited a linked entry and it changed everywhere

You edited the shared definition, not a local copy. Blue text in the editor
means you are looking at the shared base, and changes to it apply everywhere it
is linked. To change one use only, put a conditional modifier on the link
instead. See [Links & Shared Entries](/guide/concepts/links).

## An option unlocked for the whole army

A condition scoped too widely counts matches anywhere in the roster, so taking
the trigger on one unit affects all of them. Narrow the scope to the unit or
model that should react. See [Scope & Context](/guide/concepts/scope) and
[Show or hide an option](/guide/recipes/conditional-options).

## A rule isn't firing

First check **"and all child selections"**. A condition or constraint only looks
one level down from its scope by default, so if the entries it should count sit
deeper, tick "and all child selections" to make it recurse. A rule that looks
correct but does nothing is usually missing this.

::: details If that is not it: inspect the selection with the browser console
In the builder, middle-click the selection to load it into a debug variable,
then open the browser's dev tools console (in Chrome, More tools → Developer
tools → Console). Assign `let state = $debugOption.state` and the console
autocompletes the node's properties. Two useful calls:

- `state.print_modifiers()` — the modifiers applied to the node
- `state.print_extra_constraints()` — the constraints applied to it

This shows what the engine actually computed, which usually points at the wrong
scope, the missing recurse flag, or a condition that never matched.
:::

## My data doesn't update for players

A few causes, in order of likelihood:

- The repository has a **release**, and you only pushed a commit. NewRecruit uses
  the latest release when one exists, so cut a new release or the commit won't
  show.
- The player **added the system themselves** with Add from Github. Those only
  update when the player refreshes NewRecruit (or closes and reopens on mobile).

See [Publishing Your Data](/guide/publishing).

## My edits don't show up in the builder

The builder loads the game system and its imported catalogues from the folder it
is pointed at, which may not be where you opened your file. Point the editor at
your working folder with **Set Working Folder**, or **Add from folder** in the
browser builder, and work only from that copy so edits and tests use the same
files.

## The editor shows errors that aren't real

Phantom "no target" or "Unknown" links, duplicate-ID complaints, or a tree that
disagrees with the options panel are usually stale editor state. Close and reopen
the editor and they clear. If duplicate-ID and no-target errors keep appearing
across other catalogues while you edit, turn off the **"check for duplicate IDs
across all catalogues"** setting, which is a known cause.

## "Cannot be selected while hidden"

You hid an option that a constraint also requires, so the builder can't select
it. Rather than hiding a required option, preselect it with `defaultAmount`, or
make the constraint **automatic** so NewRecruit resolves it, or invert the logic
so the option is shown rather than hidden when it applies.

## A mandatory option doesn't show ("the sergeant is missing")

The builder hides **constant** selections — options the player has no decision
to make about. A selection is constant when its amount is forced by equal `min`
and `max` constraints (in parent, not `-1`) and everything beneath it is
constant too. A mandatory squad leader with `min 1`, `max 1` and no choices of
its own is the classic case: it is still in the unit, still counted, priced,
and exported — just not shown as an option.

Players can reveal these from the unit's menu with **Show Constant Options**.
Nothing is wrong with the data; if you want the entry to always be visible,
give it an actual choice to make.

## A unit's models stack or split oddly

Extra per-model add and remove buttons, models that won't combine into one line,
or options that can't be set per model are usually the
[collective](/guide/concepts/collective) flag. Mark every option on a model
collective to group identical models into one line; leave one option
non-collective to let each model be configured on its own.

## Costs aren't adding up

Most often the unit is priced as a flat cost instead of per model, so adding
bodies does not change the total. Price the models, not the unit. See
[Points that scale per model](/guide/recipes/points-per-model).

## Profile characteristics print in the wrong order

The editor can't reorder characteristics from the UI. Edit the characteristic
order in the profile's XML, then run the shipped **fix profiles** script, which
rewrites them in order. NewRecruit assumes characteristics are stored in order
and can otherwise output them wrongly.

## The datasheet or export looks wrong

Export output follows the entry hierarchy. A profile attached at the wrong level,
for example on the unit when it should sit on a model or a weapon, can render in
the wrong place or not at all. Check that each profile lives on the entry it
describes; see [Put each profile on the entry it describes](/guide/best-practices#put-each-profile-on-the-entry-it-describes).
