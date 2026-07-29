# Links & Shared Entries

A weapon, rule, or unit is usually defined once and used in many places. Instead
of copying the definition, you define it once and point at it with a link.

## Definitions and links

The real definition is a shared entry. By convention these live under a group
called Shared Entries, or in a separate shared library catalogue.

A link is a reference to that definition. The editor shows links in blue text.
When the builder loads a link, it pulls in the target's children, profiles,
constraints, and rules as if they were written in place.

## Editing a link edits the definition

If you edit a blue (linked) entry, you are editing the shared definition, so the
change shows up everywhere that links to it. This is intended, but it catches
people out.

A link can still add things of its own:

- extra child entries, which apply only to that link
- its own conditions, constraints, and modifiers

A link cannot remove or replace the children that come from the definition.

## When you want to override part of a definition

The format has no true inheritance, so you cannot link an entry and override a
piece of it directly. But some of it needs no workaround at all:

- **A different cost needs no modifier.** A link carries its own costs, and a
  cost set on the link overrides the definition's cost of the same type for
  that use. This is how one mount definition serves characters who pay
  different prices: the shared entry supplies the rules and profiles, each
  character's link supplies the price and category.
- A link can likewise add its own constraints, conditions, and child entries
  for that use only.

For the rest:

- A link's own **name field does nothing** (inherited legacy behavior from BS) — to rename the entry for one use,
  put a `set` name modifier on the link.
- Put a conditional modifier on the link for anything conditional, or for
  values the link cannot carry directly — changing a characteristic, or hiding
  an option that comes from the definition.
- Or split the definition into smaller shared pieces and link only the parts
  you want, rather than one large entry you wish you could edit.

## Library catalogues

To share entries across several catalogues, put them in a **library**
catalogue. Marking a catalogue as a library keeps it out of the builder's
faction list, so players cannot start an army from it directly.

Other catalogues import a library with a **catalogue link**. The library's
shared entries, profiles, and rules then become linkable from the importing
catalogue, which adds its own root links for the pieces it offers. Ticking
**Import Root Entries** on the catalogue link pulls in the library's root
entries directly instead.

The rule of thumb for where things live: the **game system** holds what every
catalogue needs (cost types, profile types, categories, forces); a **library**
holds what several factions share; a **catalogue** holds one faction's content.
One direction to keep in mind: when authoring, a library cannot reference
specific entries that live in the catalogues importing it — it doesn't know
them. At runtime its rules resolve where they are used, so scope- or
category-based conditions on a library entry still count the importing
roster's selections normally.

## Seeing what links to what

Right-click an entry and choose **References** (the item shows the count) — the
right-hand panel then lists every place the entry is used, and you can follow a
link to jump to its target. The panel shows two lists: structural links, and
uses from conditions, constraints, modifiers, and repeats. The reference count
on a node includes both, so a rule that mentions an entry counts toward it.

<!-- TODO: worked example — one shared weapon on two units, one with a cost
change via a conditional modifier; screenshot of blue links and the References
panel -->
