# Sorting

Two different orders are easy to mix up here:

- **The editor's display order.** The node tree sorts a group's children
  alphabetically so they are easy to find. This is only the editor's view; it
  changes nothing in the data.
- **The data order.** How the children actually sit in the stored file. This
  is the order that decides ties between
  [modifiers of the same step](/guide/concepts/modifiers#when-modifiers-apply).

## Changing the data order

Type a number in the **Position** field next to an entry's name; lower numbers
come first. Some nodes can also be re-ordered by right-clicking.

To see the data order while you arrange it, pick **No Sorting** in the sorting
dropdown of the node-tree panel. The tree then stops sorting alphabetically
and shows the children as they sit in the file.

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
