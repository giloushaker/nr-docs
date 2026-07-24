# Points that scale per model

## The rule

A unit is bought at a size and costs more as you add models. A 5-model squad at
100 points becomes 200 points at 10 models.

## The structure

Build the unit as a shared entry of type `unit` containing a model entry for
each distinct kind of model. Even a single-model unit gets a model entry, so the
model count stays accurate.

Put the cost on the models, not the unit. Adding bodies is done with an upgrade
entry priced per model:

- A model entry for the basic trooper, with a `min`/`max in parent` constraint
  for the allowed unit size.
- The per-model cost set by an increment-points modifier on that model, applied
  once per model through the default repeat "1 per model in parent".

The unit entry itself carries the base cost for the minimum-size unit, or no
cost at all if every body is counted the same way.

## Notes

- Pricing per model rather than per unit is what makes ally and points-limit
  rules count correctly, since the roster can see how many models are present.
- Age of Sigmar goes one step further: the unit starts at its minimum cost,
  decrements to zero when the model increment is present, then re-increments per
  model, so ally point caps compute from a clean per-model figure. Use this only
  if your system has ally caps that need it.
- Keep the increment at 0 base points and let the modifier set the cost, so the
  same model entry copies cleanly between units.
