# Modifiers

A modifier changes a value when its conditions are met. Modifiers are how points,
stats, names, availability, and limits react to what is in the list. Taking an
upgrade might raise a unit's cost, grant +1 to a stat, or unlock another option;
each of those is a modifier.

## The parts of a modifier

- **Type:** the operation to perform, such as set or increment.
- **Field:** what it changes, such as a cost, a characteristic, the name, the
  hidden flag, a constraint's value, or the primary category.
- **Value:** what to set, add, append, and so on.
- **Conditions:** when it applies. A modifier with no conditions always
  applies; add [conditions](/guide/concepts/conditions) to gate it.

## Operation types

Setting and counting:

- `set`: set the field to the value.
- `increment` / `decrement`: add to or subtract from a number. A `position` can
  pick which number to change inside a string value, for example the `3` in
  `D6+3`.

Arithmetic, for numeric fields:

- `multiply`, `divide`, `modulo`, `power`, `exponent`
- `floor`, `ceil`: clamp to a minimum or maximum; if the value falls below the
  floor or above the ceiling, it is set to that bound (not decimal rounding)
- `triangular`: triangular scaling, for stepped tables

Text, for the name and other text fields:

- `append` / `prepend`: add text after or before, with an optional separator.
  The **unless present** flag (`skipIfPresent`) skips the modifier when the
  text is already in the value.
- `replace`: replace matched text, optionally only at a given position. If the
  text to find is empty, it applies only when the whole value is empty, so it
  can fill in an empty field.

Availability and structure:

- `set-primary` / `unset-primary`: set or clear the primary category
- `add`: add something, including an **error, warning, or info message** that
  surfaces on the roster for data-driven validation
- `remove`

Cumulative, which combine across repeated applications:

- `cumulative-add`, `cumulative-multiply`, `cumulative-power`

All of these are selectable from the modifier-type dropdown in the editor.

## Fields

Which fields a modifier can target depends on what it sits on (an entry, a
profile, a rule, a force). The full set:

- **costs:** a price
- **characteristics:** a stat on a profile; works on string stats like `4+` too
- **name:** the displayed name
- **annotation:** a parenthetical shown after the name, as `Name (Annotation)`
- **description:** the body text of a rule or profile
- **page:** the page reference
- **hidden:** whether it shows in the builder
- **category:** add or remove a category (use the `set-primary` / `unset-primary`
  operations to change the primary category)
- **constraints:** a min, max, or limit value
- **defaultAmount:** how many of an entry a unit starts with
- **defaultSelectionEntryId:** which option a group starts on
- **error** / **warning** / **info:** a validation message shown on the roster
- **readme:** the readme text on a force

## When modifiers apply

Without conditions a modifier always applies. With conditions it applies only
when they pass.

Modifiers run in the order they are listed, but first they are re-ordered by
operation type into these steps:

1. `set`, `add`, `remove`, `set-primary`, `unset-primary`
2. `append`, `prepend`
3. `increment`, `decrement` and the arithmetic operations (`multiply`, `divide`,
   `modulo`, `power`, `exponent`, `triangular`)
4. `floor`, `ceil`
5. the cumulative operations and `replace`

So a `set` always runs before an `increment`, no matter how the modifiers are
arranged: the base value is set first, then adjusted, then clamped. Within the
same step, the listed order is kept, so re-arranging modifiers (turn off
sorting, see [Sorting](/guide/advanced/sorting)) only decides order between
modifiers of the same step.

## Repeats

A modifier can **repeat**, applying once for every N of something instead of a
single time. A repeat has its own scope and query, for example "1 per model in
parent", and the modifier runs that many times. This is what scales per-model
costs and ratio limits: an increment-cost modifier that repeats once per model
raises the price for each model. See
[Points that scale per model](/guide/recipes/points-per-model) and the
[N per M](/guide/recipes/army-limits#n-per-m-ratios) limit.

A modifier can have more than one repeat; their counts add together, so the
modifier applies the combined number of times. Each repeat counts down by its own
value ("once per N") and rounds down unless set to round up.

## Relative modifiers (`affects`)

A normal modifier changes the node it is written on. A **relative modifier** is
written on one node but changes **other** nodes chosen relative to it. This is
how most "this unit buffs that unit" rules are built: a modifier on an upgrade
that adds +1 Attack to every model in the unit sits on the upgrade but changes
the models.

A relative modifier has an **Affects** setting that says what it changes: a
scope plus a target within it. That is the label to look for in the editor, a
field in the modifier's query panel; "relative modifier" is this guide's name
for the pattern, not something the UI displays.

- `self`: the node itself, which is just a normal modifier
- child selections: selections nested under the scope
- child forces: nested forces
- recursive: the whole subtree below the scope
- associated nodes: follow an [association](/guide/concepts/associations) to
  its target, with a set traversal depth
- grouped associations: reach every member of the group

A useful way to hold it in your head: scope travels **up** to find a starting
point, and `affects` travels **down** from there to the nodes that change. Add a
condition and the change becomes conditional, without copying the modifier onto
every affected entry.

Relative modifiers need **"and all child selections"** ticked to reach nested
selections, even when the affected node has no children of its own.

<!-- TODO: worked example — an upgrade granting +1 Attack to every model in its
unit via affects: child selections, recursive; screenshot of the affects panel -->
