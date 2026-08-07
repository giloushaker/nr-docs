# Associations

An association attaches one selection to another. The common case is a leader or
character that joins a unit: the two stay separate selections, but they are
linked so rules, points, and export can treat them as connected.

If your game has characters joining units, assigned mounts, or bodyguard rules,
associations are how you model them.

## What an association does

An entry can declare that it may associate with other selections that match a
filter. In the builder the player picks the target, and the association is
recorded. Rules on either side can then react to it.

- Association constraints limit how many things can associate, for example one
  leader per unit.
- Association conditions test whether an association exists, and can refer back
  to the source, meaning the selection that attached.
- A filter restricts what a selection is allowed to associate with.
- Required associations (with a minimum) are auto-filled from the available
  valid targets, so the player only has to pick when they want a different
  target than the default.

## Grouped associations

Related associations can be collected into a group. A rule can then traverse the
grouped associations, following the relationship to apply a modifier or test a
condition across the associated selections.

## Reaching across an association

Associations combine with [relative modifiers](/guide/concepts/modifiers#relative-modifiers-affects).
A modifier can follow an association, with a set traversal depth, to change the
selection on the other side. This is how a character grants an aura or buff to
the unit it joined. The relative modifiers page covers the mechanics.

When a query reaches across associations or grouped associations, the
"and all child ..." flags (**And all child Selections**, **And all child
Forces**) are not supported: leave them unchecked, or the query will not work
as expected.

<!-- TODO: worked example — a Leader that associates with Infantry, one
association constraint, and a modifier that applies a buff to the joined unit;
screenshots of the association panel -->
