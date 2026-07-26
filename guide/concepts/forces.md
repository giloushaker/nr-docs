# Forces

A force is the container an army is built from. The roster holds one or more
forces, and every selection lives inside one:

```
Roster
└─ Force
   └─ Unit
      └─ ...
```

When starting a list, the player adds a force and picks the catalogue (faction)
it draws from. Rules that need "which faction is this force" test the
`Primary Catalogue` scope; see [Scope & Context](/guide/concepts/scope).

## Force entries

Forces are defined as **force entries**, normally in the game system under
`Force Entries`. Each force entry becomes a choice the player can add. A small
game often has a single "Default Force"; games with detachments or allied
contingents define several.

Forces can be shared and reused like selection entries: define a force under
**Shared Force Entries** and point at it with a **force entry link** wherever
it appears.

## Categories make units available

A unit becomes selectable in a force through its category: link category
entries into the force, and units whose primary category matches appear as
choices under that slot. Constraints on the category link set the slot's
minimum and maximum; see
[Army-wide limits](/guide/recipes/army-limits#category-slots-minimums-and-maximums).
A category (or its link) can also carry a cost, and **Show tracker** keeps the
slot visible with its count and limits even while empty.

## What a force can carry

Besides category links, a force entry can have:

- **Constraints** — for example limiting how many of the force the roster may
  take.
- **Costs** — a price for taking the force itself, changeable by modifiers.
- **Modifiers** — a force is a valid modifier target: name, hidden, costs,
  constraints, error/warning/info, and the **readme** text shown to the player.

## Child forces

Forces can nest: a parent force can offer **child forces** — sub-forces or
allied detachments with their own slots, nested under a parent force that
carries whatever unites them. Age of Sigmar 4 and Horus Heresy 3 use this
structure. The section label ("Child Forces") can be renamed on the force
entry.

Child forces are one of the more complicated features. If a simpler structure
(categories and constraints within a single force) expresses the rule, prefer
that; for choices that unlock content without adding a whole force, see
[Sub-factions and allegiances](/guide/recipes/sub-factions).

### Hiding child forces that don't belong

Force entries are defined once in the game system, so by default every
faction's parent force offers **every** child force — pick one faction and you
would still see the sub-forces belonging to all the others.

To make a child force appear only for its own faction:

1. Set the child force **hidden** by default.
2. Add a modifier that sets hidden to false, gated on an instance-of condition
   at `Primary Catalogue` scope matching that faction's catalogue — in words,
   "unhide when this force's selected catalogue is X".

If the same child force sits under more than one parent force, add a condition
on the parent as well, so it only unhides in the right place.
