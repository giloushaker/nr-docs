# Sorting

By default the editor lists a group's children alphabetically. You can override
that, either by hand or with a small sort configuration that applies a rule to
every child at once.

## Manual order

Turn on **No Sorting** for a group to arrange its children yourself. Right-click a
child and move it up or down; the order you set is remembered. Some nodes can be
re-ordered by right-click regardless of the sort setting.

## Sort configuration

For anything larger than a handful of entries, the editor can mass-sort a group's
children from a small configuration. Each line is one rule, and rules stack: the
**top line is the primary sort**, with lower lines breaking ties.

**Sort keys** (order everything by a value):

- `name` — alphabetical by name.
- `cost:<name>` — by the value of that cost, ascending. For points this is
  usually `cost:points`.

**Grouping conditions** (pull matching entries to the top):

- `type:group`, `type:entry` — groups first, or entries first.
- `type:model`, `type:unit`, `type:upgrade` — a specific entry type first.
- `name:/regex/` — names matching the regular expression first. Combine it with
  another rule using `&`, for example `type:entry & name:/^Sergeant/`.

### Examples

Groups first, then everything by points:

```
type:group
cost:points
```

Alphabetical, but with Sergeants pulled to the top:

```
type:entry & name:/^Sergeant/
name
```

Read it top-down: the first line decides the main order, and each line below
settles entries the lines above left equal.
