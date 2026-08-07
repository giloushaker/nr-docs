# Sorting

By default the editor lists a group's children alphabetically. You can override
that, either by hand or with a small sort configuration that applies a rule to
every child at once.

## Manual order

Type a number in the **Position** field next to an entry's name to set its order;
lower numbers come first. Some nodes can also be re-ordered by right-clicking.

**No Sorting** is a separate setting, an option in the sorting dropdown in the
node-tree panel. It turns off the automatic alphabetical sort so you can order the
underlying data by hand. That changes how entries sit in the stored file, which
may or may not matter to you.

## Sort configuration

The sort configuration is the **Childs Order** fieldset in the right-hand panel
of the entry that contains the children (it appears once the entry has more
than one child). If you are looking at a link, follow it to its target to reach
the configuration.

For anything larger than a handful of entries, the editor can mass-sort a group's
children from a small configuration. Each line is one rule, and rules stack: the
**top line is the primary sort**, with lower lines breaking ties.

**Sort keys** (order everything by a value):

- `name`: alphabetical by name.
- `cost:<name>`: by the value of that cost, ascending. For points this is
  usually `cost:points`.

**Grouping conditions** (pull matching entries to the top):

- `type:group`, `type:entry`: groups first, or entries first.
- `type:model`, `type:unit`, `type:upgrade`: a specific entry type first.
- `name:/regex/`: names matching the regular expression first. Combine it with
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
