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
- A default or auto-check can set the association automatically when the rules
  leave only one valid target.

## Association groups

Related associations can be collected into a group. A rule can then traverse the
group, following the relationship to apply a modifier or test a condition across
the associated selections.

## Reaching across an association

Associations combine with [relative modifiers](/guide/concepts/relative-modifiers).
A modifier can follow an association, with a set traversal depth, to change the
selection on the other side. This is how a character grants an aura or buff to
the unit it joined. The relative modifiers page covers the mechanics.

<!-- TODO: worked example — a Leader that associates with Infantry, one
association constraint, and a modifier that applies a buff to the joined unit;
screenshots of the association panel -->
