# Sub-factions and allegiances

## The rule

An army picks one sub-faction, allegiance, or detachment, and that choice
unlocks its own traits, artefacts, or special units.

## The structure

Give the catalogue a single shared "Allegiance" entry, set `min 1`, `max 1` in
the force, so every army must choose exactly one. Inside it put a group holding
one entry per sub-faction.

Hang the sub-faction-specific content off that choice:

- Keep each set of traits, artefacts, or spells in its own container group.
- Hide each container by default and reveal it with a modifier whose condition
  tests that its sub-faction is the one selected.

Because the containers are nested under the allegiance choice, tick **"and all
child selections"** on those conditions.

## Notes

- Define the sub-faction choice once and link to it where needed, rather than
  repeating the list.
- If a sub-faction changes which battlefield role a unit takes, drive that with
  a modifier on the unit rather than duplicating the unit; see
  [Army-wide limits](/guide/recipes/army-limits) and
  [Scope & Context](/guide/concepts/scope) for the conditions involved.
- Large systems keep shared sub-faction content in a separate library catalogue
  the faction files link to, which keeps each file smaller.
