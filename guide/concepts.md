# Core Concepts

NewRecruit data is built from a small set of pieces.

- Game system — the ruleset foundation: cost types, profile shapes, categories,
  and the forces that structure an army. One per game.
- Catalogue — a faction's content: its units, wargear, and rules. A system
  usually has many catalogues.

Each is stored as XML (`.gst` for a system, `.cat` for a catalogue), zipped XML,
or JSON. The format is your choice and doesn't change the data; JSON gives the
cleanest git history (see [Best Practices](/guide/best-practices#save-catalogues-as-json-for-clean-diffs)).
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
- [Profiles & Rules](/guide/concepts/profiles) — stat blocks, rules text, and
  how their type controls display.
- [Conditions](/guide/concepts/conditions) — tests that gate rules on and off.
- [Constraints](/guide/concepts/constraints) — limits on what can be taken,
  including automatic constraints.
- [Modifiers](/guide/concepts/modifiers) — changes to values, including relative
  modifiers that affect other nodes.
- [Associations](/guide/concepts/associations) — attaching one selection to
  another, such as a leader joining a unit.
- [Collective](/guide/concepts/collective) — how identical models in a unit are
  shown and counted.
- [In-text References](/guide/concepts/in-text-references) — auto-linking names in
  rules text.
