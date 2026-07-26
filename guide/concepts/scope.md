# Scope & Context

Every condition and constraint has a scope. The scope decides which part of the
army the rule looks at when it counts things.

Take a limit like "at least 1 Sergeant". On its own that is ambiguous: at least
1 per unit, per detachment, or in the whole army? The scope answers that.

## How it resolves

A rule starts at the node it is written on and walks up the tree to a boundary.
It then counts within that boundary.

```
Roster
└─ Force
   └─ Unit
      └─ Model
         └─ Weapon    (a rule written here)
```

The common scopes:

| Scope | Counts within |
|-------|---------------|
| `Self` | the entry the rule sits on |
| `Parent` | the entry above, skipping selection groups |
| `Force` | the force |
| `Roster` | the whole army |
| `Ancestor` | this node and every parent above it; used for instance-of (keyword) checks |
| `Primary Catalogue` | the catalogue selected for the node's force |
| `Primary Category` | the nearest category above the node (its containing selection's category slot) |

Two details matter here:

- `Self` is the entry the rule is attached to, not a profile on it. A condition
  on a profile still resolves `Self` to the profile's entry.
- `Parent` skips over selection groups and stops at the entry above, so a rule
  inside a "Weapons" group sees the model, not the group.

## Count nested selections: "and all child selections"

A condition or constraint only looks one level down from its scope by default. If
the entries it should count sit deeper in the tree, tick **"and all child
selections"** so the check recurses. A rule that looks correct but does nothing
is, more often than not, missing this tick. Turning it on is the usual fix, and
authors tend to leave it on by default.

## A common mistake

For example, a weapon is hidden until a character takes a skill. Scoped to
`Roster`, the condition counts that skill anywhere in the army, so taking it on
one character reveals the weapon on every character. Scoped to `Parent`, each
character reacts only to its own skills. This kind of mistake comes from a scope
set wider than the rule needs.

Where narrowing the scope is not enough, the options usually need to sit under the
same parent so one can see the other.

## Type scopes

`Force` and `Roster` stop at structural nodes. A type scope instead walks up to
the nearest node of a chosen kind — in the scope dropdown these are `Type: Unit`,
`Type: Model`, `Type: Model or Unit`, `Type: Upgrade`, `Entry & Type: Not
Upgrade`, and `Root Entry`.

For example, "at least 1 per `Type: Model`" counts within the nearest model, whatever
the nesting looks like. This is the usual way to write per-model wargear limits.
Some type scopes also have a variant that includes the starting node in the
count.

Type scopes work off the entry's **Type** field (`unit`, `model`, `upgrade`,
`mount`, `crew`), and Type is not cosmetic: it also drives model counting,
how exports and importers treat the entry, and play-mode features such as
wound tracking. Set `unit` on units, `model` on models, `upgrade` on wargear.

## Scope on shared entries

When a rule lives on a [shared entry](/guide/concepts/links), its scope is
resolved at each place the entry is used, not where it is defined. A
`Parent`-scoped rule on a shared weapon means "the unit that took this weapon",
which will be different every time the weapon is linked.

<!-- TODO: screenshot of the scope dropdown; per-model constraint example -->
