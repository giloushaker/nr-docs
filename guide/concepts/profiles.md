# Profiles & Rules

A profile is a stat block — a set of characteristics such as Move, Save, or
Range — of a given profile type, attached to an entry. A rule is a block of
text — a special rule or ability — also attached to an entry.

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

A characteristic type has two optional fields worth knowing:

- **Formatting Rules** (`formatRules`) — control how values are displayed, for
  example appending a unit like the `"` on a movement value.
- **Default Value** (`defaultValue`) — what the editor prefills when you create
  a new profile.

## Characteristic kinds

A characteristic type can also carry a **Kind**, which tells NewRecruit what
the column *is*, not just how it looks:

- **Description / Long Text** (`longText`) — renders as a full-width text cell
  under the stat line instead of a stat column. Use it for ability text inside
  a profile. (A very long value gets this treatment automatically; the kind
  makes it explicit.)
- **Wound** — marks the wounds column, so play mode's wound tracking reads it.
  Works together with the entry's Type being `model`; see
  [entry types](/guide/concepts/scope#type-scopes).
- **Annotation** (`annotation`) — a short parenthetical value, read by exports
  rather than shown as a stat column.

Kinds exist at both levels: the profile type's kind says what the whole profile
is (weapon, ability — see [above](#the-profile-type-kind)), the characteristic
type's kind says what one column is.

## Attributes

Attributes are a second, hidden characteristic-like axis on profiles, defined by
attribute types. Players never see them; only export templates and scripts read
them.

Most data doesn't need them — if a value matters to the player, it belongs in a
characteristic, and if it drives rules, it belongs in the data model
(categories, costs, constraints). Reach for attributes only to encode
export-only metadata, such as a value a custom template needs to lay out a
card.

## Reordering characteristics

The editor cannot reorder characteristics from the UI. Edit the order in the
profile's XML and run the shipped **fix profiles** script; see
[Troubleshooting](/guide/troubleshooting#profile-characteristics-print-in-the-wrong-order).

## Formatting text

Text fields render Markdown: `*italic*`, `**bold**`, `^^small caps^^`, and
tables. The formatting shows in NewRecruit's display and in exports.

Tables use the usual pipe syntax — a header row, a separator row, then data
rows. Use `<br>` for a line break inside a cell:

```
| Roll | Result             |
|------|--------------------|
| 1-3  | Nothing            |
| 4-6  | +1 Attack<br>+1 Ld |
```

For a table without headings, leave the header cells empty:

```
|     |           |
|-----|-----------|
| 1-3 | Nothing   |
| 4-6 | +1 Attack |
```

## Shared rules and profiles

For a rule or profile used in many places, define it once and reference it with
an info link rather than copying it, so every use stays in sync. See
[Links & Shared Entries](/guide/concepts/links).
