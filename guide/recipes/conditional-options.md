# Show or hide an option based on another choice

## The rule

An option only becomes available once something else is selected. A weapon
unlocks after a model takes a particular skill, or an upgrade appears only for a
certain sub-faction.

## The structure

Leave the option visible by default and hide it with a modifier, or the reverse,
gated on a condition:

- A `set Hidden` modifier on the option.
- A condition that tests for the trigger, for example "at least 1 selection of
  the skill" within the right scope.

When the counted entries are nested below the node the condition runs on, tick
**"and all child selections"** on the condition. Without it the condition only
looks one level down and the rule appears not to fire.

## Getting the scope right

This is where the option most often leaks. If the condition is scoped to the
whole roster, taking the skill on one model unlocks the option everywhere. Scope
it to the unit or model that should react, usually `parent`, `unit`, or `model`.
See [Scope & Context](/guide/concepts/scope) for the full explanation.

## Forbid instead of hide

If the point is that an option is not allowed rather than not yet relevant,
consider a `max 0` constraint instead of hiding it. The player still sees the
entry and understands why it is unavailable, which several established
catalogues prefer over an option that silently disappears.
