# Army-wide limits

## The rule

Some limits apply across the whole army rather than one unit: one relic per
character, at most a third of your points on a category, only one general, at
least two Troops, no more than three of the same unit.

## One of X per army

Put a category on the entries that share the limit, then add a constraint on
that category set to `max N selections in roster`. For "one artefact per hero"
the constraint sits per hero; for "one general" it is `max 1` in the roster.

When the counted entries are nested, tick **"and all child selections"** so the
constraint sees them.

## Category slots (minimums and maximums)

Games that build an army from role slots — like 2 to 6 Troops, 0 to 3 Elites, at
least 1 HQ — put `min` and `max` constraints on the category in the force. A
minimum makes the army illegal until it is met; a maximum caps the slot. This is
the usual battlefield-role structure.

To keep a slot visible even while it is empty, tick **Show tracker**
<Badge type="tip" text="new 2026-07" /> on the category (or its link in the
force). The builder then always displays the
category with its count and limits, so players can see "Troops 0/6" before
adding anything.

## Cap duplicates (the "rule of three")

To limit how many of the same unit an army may include, put a `max N selections
in roster` constraint on the entry itself. For a limit that spans several units
at once, give them a shared category and cap that category in the roster instead.

## N per M (ratios)

For "one special weapon per five models" or "one Elite per Troop", start the
option at `max 0` and add a **repeating modifier** that raises the max by 1 for
every M of the other thing. The repeat is what scales the allowance as the army
grows. See also [Points that scale per model](/guide/recipes/points-per-model)
for the same repeat idea applied to cost.

## Percentage caps

For "no more than X% of points on a category", add a percentage constraint on
that category in the roster, for example `max 50%`.

A percentage is measured against one of two things: the points **currently
spent** in the roster, or the roster's **cost limit**, meaning the game size the
player set (1000, 2000, and so on). The constraint's field selects which: each
cost type has a limit variant in the field dropdown — `pts Limit` measures
against the cost limit, plain `pts` measures against current spend.

Use `pts Limit`. "Max 50% on Elites" means half the game size. With `pts` it
would mean half of whatever is currently in the list, which changes with every
unit added. The game-size side always comes from the roster, whatever the
constraint's scope; the scope only decides what is counted against it.

The same works for a **minimum** percentage, such as "at least 25% on Core": use
a `min` percentage constraint against `pts Limit`.

To make the cap dynamic, for example raised when a particular unit or the general
is present, change the limit with a modifier on the category link or root entry,
gated on a condition that tests for that unit.

## Notes

- A **category entry can carry a cost** that applies when the category is linked
  into a force — useful for a per-slot or per-detachment fee.
- Keep army-specific categories in the catalogue and only truly shared ones in
  the game system. Putting every category in the system file makes limits harder
  to reason about.
- For constraint mechanics — `automatic`, the `-1` = no-limit value, custom
  messages — see [Constraints](/guide/concepts/constraints).
- A limit that should stop an illegal build but still let the player see the
  entries is usually better as a constraint than as a hide; see
  [Show or hide an option](/guide/recipes/conditional-options).
