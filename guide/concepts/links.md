# Links & Shared Entries

A weapon, rule, or unit is usually defined once and used in many places. Instead
of copying the definition, you define it once and point at it with a link.
Knowing what a link is, and what editing one changes, avoids a common surprise
where a change appears everywhere at once.

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
piece of it directly. Two approaches get the same result:

- Add a conditional modifier on the link to change a value, hide an option, or
  set a different cost for that use only.
- Split the definition into smaller shared pieces and link only the parts you
  want, rather than one large entry you wish you could edit.

## Seeing what links to what

The References panel lists every place an entry is used, and you can follow a
link to jump to its target. The panel shows two lists: structural links, and
uses from conditions, constraints, modifiers, and repeats. The reference count
on a node includes both, so a rule that mentions an entry counts toward it.

<!-- TODO: worked example — one shared weapon on two units, one with a cost
change via a conditional modifier; screenshot of blue links and the References
panel -->
