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
| `self` | the entry the rule sits on |
| `parent` | the entry above, skipping selection groups |
| `force` | the force or detachment |
| `roster` | the whole army |
| `ancestor` | this node and every parent above it; used for instance-of (keyword) checks |
| `primary-catalogue` | the node's catalogue |
| `primary-category` | the node's primary category |

Two details matter here:

- `self` is the entry the rule is attached to, not a profile on it. A condition
  on a profile still resolves `self` to the profile's entry.
- `parent` skips over selection groups and stops at the entry above, so a rule
  inside a "Weapons" group sees the model, not the group.

## Count nested selections: "and all child selections"

A condition or constraint only looks one level down from its scope by default. If
the entries it should count sit deeper in the tree, tick **"and all child
selections"** so the check recurses. A rule that looks correct but does nothing
is, more often than not, missing this tick. Turning it on is the usual fix, and
authors tend to leave it on by default.

## A common mistake

A weapon hidden until a character takes a skill can leak across the army. If the
condition is scoped to `roster`, it counts the skill anywhere, so taking it on one
character reveals the weapon on all of them. Scoping to `parent` limits it to each
character's own skills. Most leaks of this kind come from a scope set wider than
the rule needs.

Where narrowing the scope is not enough, the options usually need to sit under the
same parent so one can see the other.

## Type scopes

`force` and `roster` stop at structural nodes. A type scope instead walks up to
the nearest node of a chosen kind: `unit`, `model`, `model-or-unit`, `upgrade`,
`non-upgrade-entry`, or `root-entry`.

For example, "at least 1 per `model`" counts within the nearest model, whatever
the nesting looks like. This is the usual way to write per-model wargear limits.
Some type scopes also have a variant that includes the starting node in the
count.

## Scope on shared entries

When a rule lives on a [shared entry](/guide/concepts/links), its scope is
resolved at each place the entry is used, not where it is defined. A
`parent`-scoped rule on a shared weapon means "the unit that took this weapon",
which will be different every time the weapon is linked.

<!-- TODO: screenshot of the scope dropdown; per-model constraint example -->
