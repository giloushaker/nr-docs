# Collective

Collective controls how identical models in a unit are shown and counted. It is a
common source of confusion, because turning it on or off changes both how the unit
looks in the builder and how its options behave.

## What it does

Mark a selection **collective** and identical copies collapse into a single line
with a count, like "10× Trooper", and the builder shows a counter instead of
separate add and remove buttons for each model. Without it, each model is its own
stack that the player adds and configures individually.

## Identical models: make everything collective

If every model in a unit is the same, with no per-model choices, mark all of the
model's wargear collective. The unit then shows as one clean line, and the
redundant per-model add, remove, and new-stack buttons disappear.

For a model to collapse this way, **all** of its child selections must be
collective. A single non-collective option is enough to keep the models split
into separate stacks.

## Models that differ: leave one option non-collective

If models in the unit can be equipped differently, for example a squad where each
model chooses its own weapon, leave at least one of those options **non-collective**.
That tells the builder to split the models into individually configurable stacks,
so the player can give each its own loadout. Making every weapon collective groups
all the models together and takes that choice away.

## The all-or-none effect

Collective also ties counts together. When an option is collective, every model
under the same parent holds the **same** count of it, so taking it on one takes it
on all. This is the tool for "every model in the unit takes this upgrade", but it
surprises authors who mark something collective without meaning to link its count
across the whole unit.
