# Relative Modifiers & `affects`

A normal modifier changes the node it is written on. A relative modifier is
written on one node but changes other nodes chosen relative to it. This is how
most "this unit buffs that unit" rules are built.

An example: taking an upgrade adds +1 Attack to every model in the unit. The
modifier sits on the upgrade, but it changes the models.

## The `affects` setting

A relative modifier has an `affects` setting that says what it changes. You pick
a scope and then what to target inside it:

- `self` — the node itself, which is just a normal modifier
- child selections — selections nested under the scope
- child forces — nested forces
- recursive — the whole subtree below the scope
- associated nodes — follow an [association](/guide/concepts/associations) to
  its target
- group associations — follow an association group, with a set traversal depth

A useful way to hold it in your head: scope travels up to find a starting point,
and `affects` travels down from there to the nodes that change.

Add a condition and the change becomes conditional, so a buff applies only when
its requirement is met, without copying the modifier onto every affected entry.

Relative modifiers need **"and all child selections"** ticked to reach nested
selections, even when the affected node has no children of its own. A relative
modifier that stops working after an edit is often missing this.

## Why it exists

Before relative modifiers, a rule that touched many entries meant putting a copy
of the modifier on each one, which broke as soon as the data changed. One
relative modifier with the right `affects` setting replaces all of those copies
and keeps working as the roster changes.

<!-- TODO: worked example — an upgrade granting +1 Attack to every model in its
unit via affects: child selections, recursive; screenshot of the affects panel -->
