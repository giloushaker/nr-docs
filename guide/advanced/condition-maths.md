# Condition-Group Maths

Condition groups can compute numbers, not just combine tests. Alongside `and`,
`or`, `not`, and `count`, a group can be an arithmetic operation — `add`,
`subtract`, `multiply`, `divide`, `modulo`, `power`, `min`, `max` — or a
comparison — `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `equal`,
`notEqual`. The conditions inside contribute the numbers their queries count,
the group combines or compares them, and the result gates whatever the group
sits on, like any other condition.

::: warning Rough edges
This is honestly a clunky tool: assembling anything beyond a single comparison
is fiddly, and the result is hard to read back. Use it for simple computed
checks and keep a comment nearby. It is still **dramatically** better than the
old workaround shown at the bottom of this page.
:::

## Worked example: "no more X than Y"

**Rule: "You may not select more Poxwalker units than Plague Marine units."**

1. On the relevant entry, add an **error** modifier with the text
   "You may not select more Poxwalker units than Plague Marine units."
2. Gate it on a condition group of type **greater** containing two conditions:
   - the count of Poxwalker selections in `Roster`
   - the count of Plague Marine selections in `Roster`

The group compares the two counts and the error appears only while the first
exceeds the second. The same shape handles ratios and derived values: compute
with an arithmetic group, compare with a comparison group, nest as needed.

## The old way (don't do this anymore)

::: details How this rule had to be built before arithmetic groups
An `or` group under the error modifier, containing one `and` group for **every
possible combination** where Poxwalkers exceed Marines. With both being Troops
in a 6-slot army:

- 1 Poxwalker, 0 Marines
- 2 Poxwalkers, 0 Marines
- 3 Poxwalkers, 0 Marines
- 4 Poxwalkers, 0 Marines
- 5 Poxwalkers, 0 Marines
- 6 Poxwalkers, 0 Marines
- 2 Poxwalkers, 1 Marine
- …and so on, twelve groups in all.

Not elegant, but it worked. If you maintain data that still contains this
pattern, a single `greater` group replaces the whole pile.
:::

## Notes

- Keep computed logic simple; multi-step formulas are possible but hard to
  follow. If a rule needs elaborate maths, it may not be worth forcing into
  the data — see [Known Limitations](/guide/limitations#complex-maths-is-awkward).
- Local condition groups and the `before` condition combine well with this for
  position-dependent rules; see
  [Conditions](/guide/concepts/conditions#local-condition-groups).
