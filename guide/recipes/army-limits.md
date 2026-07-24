# Army-wide limits

## The rule

Some limits apply across the whole army rather than one unit: one relic per
character, at most a third of your points on a category, only one general.

## One of X per army

Put a category on the entries that share the limit, then add a constraint on
that category set to `max N selections in roster`. For "one artefact per hero"
the constraint sits per hero; for "one general" it is `max 1` in the roster.

When the counted entries are nested, tick **"and all child selections"** so the
constraint sees them.

## Percentage caps

For "no more than X% of points on a category", add a percentage constraint on
that category in the roster, for example `max 50%`.

A percentage is measured against one of two things: the points **currently
spent** in the roster, or the roster's **cost limit**, meaning the game size the
player set (1000, 2000, and so on). The constraint's field selects which:
`pts limit` measures against the cost limit, plain `pts` measures against current
spend.

Use `pts limit`. "Max 50% on Elites" means half the game size. With `pts` it
would mean half of whatever is currently in the list, which changes with every
unit added.

Constraints that read the game size only work at **roster** scope.

To make the cap dynamic, for example raised when a particular unit or the general
is present, change the limit with a modifier on the category link or root entry,
gated on a condition that tests for that unit.

## Notes

- Keep army-specific categories in the catalogue and only truly shared ones in
  the game system. Putting every category in the system file makes limits harder
  to reason about.
- A limit that should stop an illegal build but still let the player see the
  entries is usually better as a constraint than as a hide; see
  [Show or hide an option](/guide/recipes/conditional-options).
