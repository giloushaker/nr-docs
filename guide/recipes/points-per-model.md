# Points that scale per model

## The rule

A unit is bought at a size and costs more as you add models. A 5-model squad at
100 points becomes 200 points at 10 models.

## The structure

Build the unit as a shared entry of type `unit` containing a model entry for
each distinct kind of model. Even a single-model unit gets a model entry, so the
model count stays accurate.

Put the cost on the models, not the unit:

- A model entry for the basic trooper, with a `min`/`max in parent` constraint
  for the allowed unit size.
- A flat cost on that model entry. A model's cost is multiplied by its amount
  automatically, so 10 models at 10 pts cost 100; no modifier needed.

For an upgrade priced per model (a banner that costs 2 pts per body, say), put
an increment-cost modifier on the **upgrade** with a repeat of "1 per model in
parent"; the repeat scales the increment by the model count. Do not put that
repeat on the model entry itself: a model's cost already scales with its
amount, so the repeat would double-count.

The unit entry itself carries the base cost for the minimum-size unit, or no
cost at all if every body is counted the same way.

## Notes

- To make a unit buy models in fixed blocks (five at a time, say), set the `step`
  field <Badge type="tip" text="v1.4.2" /> on the model entry so its amount
  changes in that increment.