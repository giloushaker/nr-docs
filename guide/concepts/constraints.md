# Constraints

A constraint is a limit — a minimum or maximum — on what can be taken. The
builder checks constraints as the list is built and flags the roster when one is
broken.

## How a constraint is measured

A constraint uses the same query model as a
[condition](/guide/concepts/conditions): a **scope** (where to look), **what it
counts** (selections of an entry or category, or a value such as points, or the
roster's cost limit), and **"and all child selections"** to reach nested
entries. Constraint evaluation works the same way as condition evaluation, so
everything on the [Scope & Context](/guide/concepts/scope) page applies here too.

A `self`-scoped constraint can also target a specific **childId**, so it limits a
particular entry within the node itself rather than the node as a whole.

## Minimum and maximum

The core constraints are `min` and `max` on a field, usually selections and
sometimes points. A minimum makes the roster illegal until it is met; a maximum
caps it. Percentages are supported — measure against the game size by picking
the cost type's **Limit** field (shown as `pts Limit` in the field dropdown)
rather than the cost itself. For the common shapes (slots, ratios,
duplicates, percentage caps) see [Army-wide limits](/guide/recipes/army-limits).

## The value -1

A constraint value of `-1` means **no limit** — it is ignored, not treated as
minus one. If you genuinely need a negative value, set the constraint's
`negative` flag.

## Automatic constraints

Mark a constraint **automatic** and NewRecruit resolves the selection itself to
satisfy it, auto-adding or adjusting the choice rather than only flagging an
error. This is what makes forced selections (equal `min` and `max`) safe: the
builder fills them in itself instead of reporting an error the player has to
fix. Use it where the correct selection is unambiguous, not on everything.

## Custom messages <Badge type="tip" text="v1.3.31" />

A constraint can carry a `message` shown when it is broken, so the player reads a
plain-language reason instead of a generic limit error.

The message supports substitution placeholders written in `{...}`, filled in when
it is shown:

- `{current}` — the current count in scope
- `{value}` — the constraint's value (the limit as written)
- `{total}` — the resolved limit, for example the points a percentage works out to
- `{difference}` — how far the count is from the limit
- `{of}` — the thing being counted
- `{scope}` — the name of the scope
- `{field}` — the field being counted (selections, points, and so on)
- `{%}` — a percent sign when the constraint is a percentage
- `{self}`, `{parent}`, `{group}`, `{unit}`, `{model}`, `{roster}` and other
  scope names — replaced with the matching node's name
- `{<id>}` — any entry or field id, replaced with its name

Text wrapped in `**double asterisks**` is highlighted, and line breaks are kept.
