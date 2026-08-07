# Core Concepts

NewRecruit data is built from a small set of pieces.

- Game system: the ruleset foundation of cost types, profile shapes, categories,
  and the forces that structure an army. One per game.
- Catalogue: a faction's content, its units, wargear, and rules. A system
  usually has many catalogues.
- Library catalogue: a catalogue marked as a **library**, holding shared content
  that other catalogues import rather than a playable faction. See
  [Library catalogues](/guide/concepts/links#library-catalogues).

Each is stored as XML (`.gst` for a system, `.cat` for a catalogue), zipped XML,
or JSON. The format is your choice and doesn't change the data; JSON gives the
cleanest git history (see [Best Practices](/guide/best-practices#save-catalogues-as-json-for-clean-diffs)).
- Selection entries: the things a player picks (units, models, weapons,
  upgrades). They nest into groups and reference each other with links.
- Profiles and characteristics: the stat blocks (Move, Save, Range) attached
  to entries.
- Categories: tags used both for grouping units in the builder and for logic.
  Every unit needs one primary category.
- Constraints: limits (min/max, exactly, percentages) on what can be taken.
- Conditions: tests that turn other rules on or off.
- Modifiers: changes to values (cost, name, characteristics) applied when
  conditions pass.

A note on finding things in the editor: when these pages name a field or flag
(Collective, Aliases, Show tracker, Affects...), it lives in the **right-hand
panel** shown when the node is selected in the tree. Creating things and
structural actions (new entries, Move To, References) are on the node's
**right-click menu**.

The ideas that take the most getting used to have their own pages:

- [Forces](/guide/concepts/forces): the containers an army is built from, and
  how categories make units available in them.
- [Scope & Context](/guide/concepts/scope): which part of the army a condition
  or constraint looks at.
- [Links & Shared Entries](/guide/concepts/links): defining something once and
  using it in many places.
- [Profiles & Rules](/guide/concepts/profiles): stat blocks, rules text, and
  how their type controls display.
- [Conditions](/guide/concepts/conditions): tests that gate rules on and off.
- [Constraints](/guide/concepts/constraints): limits on what can be taken,
  including automatic constraints.
- [Modifiers](/guide/concepts/modifiers): changes to values, including relative
  modifiers that affect other nodes.
- [Associations](/guide/concepts/associations): attaching one selection to
  another, such as a leader joining a unit.
- [Collective](/guide/concepts/collective): how identical models in a unit are
  shown and counted.
- [In-text References](/guide/concepts/in-text-references): auto-linking names in
  rules text.
