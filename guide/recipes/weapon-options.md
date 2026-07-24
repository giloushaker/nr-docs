# Weapon options

## The rule

A model comes with a default weapon and can swap it for one of several
alternatives. It ends up with exactly one weapon from the list.

## The structure

Make each weapon a selection entry carrying its own weapon profile. Put the
weapons in a group set to `min 1`, `max 1`, so exactly one is chosen. Mark the
default weapon as the group's default, so a freshly added model is already legal
and already armed.

Name the group after the choice it presents, for example "Weapon", not "One
choice only". The name should tell the player what they are picking.

## Giving a model several default weapons

If a model starts with more than one weapon by default (a pistol and a blade,
say), set the **default amount** on each weapon that should start equipped. NR's
`defaultAmount` field preselects a weapon while leaving the player free to remove
it, and it accepts comma-separated values for multiple default stacks. This is
the NewRecruit way and is cleaner than the older BattleScribe trick of forcing
each weapon with a `min 1` constraint and relaxing it with a modifier.

## Every model takes the same weapon

If a choice must be identical across a whole unit rather than per model, mark the
constraint **automatic**. NewRecruit then resolves the selection itself and locks
the per-model add/remove buttons, so the unit can't be built into an illegal
mix. `automatic` is NewRecruit-only.

## Notes

- Each weapon holds its own profile, so the stat line follows the choice
  automatically.
- If a weapon's profile refers to a separate ability or a damage table, leave
  that characteristic as `*` and let the referenced rule supply the detail.
- Reuse the same weapon across units by defining it once as a
  [shared entry](/guide/concepts/links) and linking it.
