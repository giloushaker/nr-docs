# Modifiers

A modifier changes a value when its conditions are met. Modifiers are how points,
stats, names, availability, and limits react to what is in the list. Taking an
upgrade might raise a unit's cost, grant +1 to a stat, or unlock another option;
each of those is a modifier.

## The parts of a modifier

- **Type** — the operation to perform, such as set or increment.
- **Field** — what it changes: a cost, a characteristic, the name, the hidden
  flag, a constraint's value, the primary category, and so on.
- **Value** — what to set, add, append, and so on.
- **Conditions** — when it applies. A modifier with no conditions always
  applies; add [conditions](/guide/concepts/conditions) to gate it.

## Operation types

Setting and counting:

- `set` — set the field to the value.
- `increment` / `decrement` — add to or subtract from a number.

Arithmetic, for numeric fields:

- `multiply`, `divide`, `modulo`, `power`, `exponent`
- `floor`, `ceil` — round down or up
- `triangular` — triangular scaling, for stepped tables

Text, for the name and other text fields:

- `append` / `prepend` — add text after or before, with an optional separator
- `replace` — replace matched text, optionally only at a given position

Availability and structure:

- `set-primary` / `unset-primary` — set or clear the primary category
- `add` — add something, including an **error, warning, or info message** that
  surfaces on the roster for data-driven validation
- `remove`

Cumulative, which combine across repeated applications:

- `cumulative-add`, `cumulative-multiply`, `cumulative-power`

All of these are selectable from the modifier-type dropdown in the editor.

## Fields

Which fields a modifier can target depends on what it sits on — an entry, a
profile, a rule, a force. The full set:

- **costs** — a price
- **characteristics** — a stat on a profile; works on string stats like `4+` too
- **name** — the displayed name
- **annotation** — a parenthetical shown after the name, as `Name (Annotation)`
- **description** — the body text of a rule or profile
- **page** — the page reference
- **hidden** — whether it shows in the builder
- **category** — add or remove a category (use the `set-primary` / `unset-primary`
  operations to change the primary category)
- **constraints** — a min, max, or limit value
- **defaultAmount** — how many of an entry a unit starts with
- **defaultSelectionEntryId** — which option a group starts on
- **error** / **warning** / **info** — a validation message shown on the roster
- **readme** — the readme text on a force

## When modifiers apply

Without conditions a modifier always applies. With conditions it applies only
when they pass. Modifiers run in an order set by their type and their order in
the data; where the order matters, turn off sorting and arrange them by hand (see
[Sorting](/guide/advanced/sorting)).

## Relative modifiers (`affects`)

A normal modifier changes the node it is written on. A **relative modifier** is
written on one node but changes **other** nodes chosen relative to it. This is
how most "this unit buffs that unit" rules are built: a modifier on an upgrade
that adds +1 Attack to every model in the unit sits on the upgrade but changes
the models.

A relative modifier has an **`affects`** setting that says what it changes: a
scope plus a target within it.

- `self` — the node itself, which is just a normal modifier
- child selections — selections nested under the scope
- child forces — nested forces
- recursive — the whole subtree below the scope
- associated nodes — follow an [association](/guide/concepts/associations) to its
  target
- group associations — follow an association group, with a set traversal depth

A useful way to hold it in your head: scope travels **up** to find a starting
point, and `affects` travels **down** from there to the nodes that change. Add a
condition and the change becomes conditional, without copying the modifier onto
every affected entry.

Relative modifiers need **"and all child selections"** ticked to reach nested
selections, even when the affected node has no children of its own. A relative
modifier that stops working after an edit is often missing this.

<!-- TODO: worked example — an upgrade granting +1 Attack to every model in its
unit via affects: child selections, recursive; screenshot of the affects panel -->
