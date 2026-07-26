# Known Limitations

A few things the data format currently can't do. Knowing them up front saves
time spent trying to make them work.

## Costs can't go on a group

A selection group can't carry a cost. Put the cost on the selection entries
inside the group instead.

## Rules and profiles can't carry costs or constraints

Constraints can sit on selection entries, groups, forces, and categories, and
costs on entries, forces, and categories — but a rule or a profile can't have
either directly. If you need a cost or a limit tied to a rule, wrap it in a
selection entry and put the cost or constraint on that entry. This one catches
people out often, so reach for a selection entry whenever something needs a
price or a limit.

## A condition can't read a characteristic value

Conditions can't read the numeric value of a characteristic. A rule can count how
many of something are selected, or test categories, but it can't branch on a stat
such as a model's Wounds or Strength.

## Complex maths is awkward

Condition groups can do arithmetic — add, multiply, min/max, and comparisons — so
simple calculations and checks are possible. But there is no easy way to express
anything complex: multi-step formulas are fiddly to assemble and hard to follow.
Keep computed logic simple; if a rule needs elaborate maths, it is probably not
worth forcing into the data.
