# Child forces

## The rule

An ability grants an extra force within the army, such as a sub-force or an
allied detachment that has its own slots but belongs to a parent force. Age of
Sigmar 4 and Horus Heresy 3 use this.

## The structure

Model the extra forces as **child forces**: several small forces nested under a
parent force that ties them together. Reach for this when you need multiple small
forces with a shared parent that carries an attribute uniting them, rather than
one flat force.

## Hiding child forces that don't belong

A child force should only appear in the catalogue it belongs to. Set the child
forces **hidden** by default, then set hidden to false with a condition that its
`primary-catalogue` and parent match the catalogue you want it in. Otherwise
every child force shows up everywhere.

## Notes

- Child forces are one of the more complicated features. If a simpler structure
  (categories and constraints within a single force) expresses the rule, prefer
  that.
- See [Sub-factions and allegiances](/guide/recipes/sub-factions) for choices
  that unlock content without adding a whole force.
