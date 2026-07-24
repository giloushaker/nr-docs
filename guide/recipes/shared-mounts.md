# Reuse a mount across characters

## The rule

Several characters can take the same mount, but each pays a different price for
it, and sometimes it sits in a different category.

## The structure

Build the mount once as a shared entry: `min 1`, `max 1` in parent, no points,
no category, with all of the mount's rules and profiles on it.

Then give each character a local "Mount" group, `max 1`, holding a small entry
that links the shared mount and carries that character's price and category. The
shared entry supplies the rules; the local link supplies the cost.

## Notes

- Keeping cost and category on the local link, not the shared entry, is what lets
  one mount definition serve characters who pay different amounts for it.
- The same shape works for any option that is mechanically identical across many
  units but priced differently.
- This is the mount case of the general rule in
  [Links & Shared Entries](/guide/concepts/links): define once, adjust per use
  with modifiers and local entries.
