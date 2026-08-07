# Recipes

Each recipe takes a rule you might need to model and shows the entry structure
that implements it, with the tradeoffs worth knowing. They follow the
conventions used across the established BSData catalogues, so data built this way
matches what other authors expect.

A few terms used throughout:

- **Shared entry** — a definition kept once and reused by [link](/guide/concepts/links).
- **Model entry** — a selection entry of type `model`, one per distinct kind of
  model in a unit.
- **Group** — a selection group that holds a set of choices, with `min`/`max`
  controlling how many can be picked.
- **Upgrade entry** — a selection entry of type `upgrade`, used for options and
  for the per-model increments that scale points.

## The recipes

- [Points that scale per model](/guide/recipes/points-per-model)
- [Weapon options](/guide/recipes/weapon-options)
- [Show or hide an option based on another choice](/guide/recipes/conditional-options)
- [Sub-factions and allegiances](/guide/recipes/sub-factions)
- [Army-wide limits](/guide/recipes/army-limits)

For sub-forces and allied detachments, see
[Forces § Child forces](/guide/concepts/forces#child-forces). For one shared
option priced differently per unit (a mount several characters can take, say),
see [Links & Shared Entries](/guide/concepts/links#when-you-want-to-override-part-of-a-definition).
