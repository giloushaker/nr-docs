# Profiles

A profile is a stat block — a set of characteristics such as Move, Save, or
Range — of a given profile type, attached to an entry.

## Profile types

A profile type defines which characteristics a profile has: its columns. Create
profile types in the game system before adding profiles. A weapon profile type
might have Range, Attacks, and Strength; a unit profile type Move, Save, and
Wounds.

## Put a profile on the entry it describes

A profile belongs on the thing it describes — a model's stats on the model, a
weapon's on the weapon. This matters for how exports lay out; see
[Put each profile on the entry it describes](/guide/best-practices#put-each-profile-on-the-entry-it-describes).

## The profile type `kind`

A profile type's `kind` tags what the profile represents — `weapon`, `model`,
`ability`, `spell` — so exports and system-agnostic tools can recognise it and
place it accordingly. The builder also uses it to filter which profiles show
where. Layout within a profile is driven by the characteristic types instead: a
characteristic whose kind is long text renders as a full-width description cell
rather than a stat column.

## Characteristic formatting

Characteristic types support two display helpers:

- **Formatting Rules** (`formatRules`) — how a value is shown, for example
  appending a unit like the `"` on a movement value.
- **Default Value** (`defaultValue`) — a value the editor prefills for a new
  profile.

## Attributes

Attributes are a second, hidden characteristic-like axis on profiles, defined by
attribute types. They are not shown to players but can be read by exports and
scripts — useful for values a template or script needs without adding them to the
visible stat line.

## Reordering characteristics

The editor cannot reorder characteristics from the UI. Edit the order in the
profile's XML and run the shipped **fix profiles** script; see
[Troubleshooting](/guide/troubleshooting#profile-characteristics-print-in-the-wrong-order).
