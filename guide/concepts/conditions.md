# Conditions

A condition is a test. Modifiers, constraints, and availability can be gated on
conditions so they only take effect when the test passes. "Give +1 to Attacks if
the unit has a banner" is a modifier gated on a condition.

## What a condition checks

A condition counts or tests something in a scope and compares it to a value. Its
parts:

- **Scope** — where to look. See [Scope & Context](/guide/concepts/scope).
- **What it counts** — usually selections of a given entry or category, but it
  can also read forces, associations, or a points total.
- **Comparison and value** — the test and the number, for example "at least 1".
- **"and all child selections"** — recurse below the scope, needed when the
  things being counted are nested. See [Scope](/guide/concepts/scope).

## Condition types

| Type | Passes when |
|------|-------------|
| `atLeast` | the count is at least the value |
| `atMost` | the count is at most the value |
| `equalTo` | the count equals the value |
| `notEqualTo` | the count does not equal the value |
| `greaterThan` | the count is greater than the value |
| `lessThan` | the count is less than the value |
| `instanceOf` | the node is (or sits within) a given entry or category |
| `notInstanceOf` | the node is not |
| `always` / `never` | always passes / never passes |
| `before` | used only in local condition groups; tests instance position (see below) |

## Combining conditions: condition groups

A condition group holds several conditions and combines them:

- `and` — all must pass
- `or` — any must pass
- `not` — none must pass
- `count` — a number of the child conditions pass, with a `min`/`max`

Groups can nest, so you can build "A and (B or C)".

## Local condition groups

A local condition group runs its own query with its own scope, which lets it test
several things about the **same** target at once. For example, "is there a unit
that is both INFANTRY and a HERO" cannot be written as two separate conditions,
because those would be satisfied by two different units; a local condition group
checks both against one unit.

A local condition group also doubles as a repeat, so it can drive a rule once per
matching target.

The `before` condition works only inside a local condition group, where it tests
an instance's position in the repeat. This is what lets a rule apply from a
certain instance onwards — for example, making the third and later of a unit cost
more than the first two.
