# Core Concepts

NewRecruit data is built from a small set of pieces.

- Game system (`.gst`) — the ruleset foundation: cost types, profile shapes,
  categories, and the forces that structure an army. One per game.
- Catalogue (`.cat`) — a faction's content: its units, wargear, and rules. A
  system usually has many catalogues.
- Selection entries — the things a player picks: units, models, weapons,
  upgrades. They nest into groups and reference each other with links.
- Profiles and characteristics — the stat blocks (Move, Save, Range) attached
  to entries.
- Categories — tags used both for grouping units in the builder and for logic.
  Every unit needs one primary category.
- Constraints — limits (min/max, exactly, percentages) on what can be taken.
- Conditions — tests that turn other rules on or off.
- Modifiers — changes to values (cost, name, characteristics) applied when
  conditions are met.

The ideas that take the most getting used to have their own pages:

- [Scope & Context](/guide/concepts/scope) — which part of the army a condition
  or constraint looks at.
- [Links & Shared Entries](/guide/concepts/links) — defining something once and
  using it in many places.
- [Associations](/guide/concepts/associations) — attaching one selection to
  another, such as a leader joining a unit.
- [Relative Modifiers](/guide/concepts/relative-modifiers) — a modifier on one
  node that changes others.
