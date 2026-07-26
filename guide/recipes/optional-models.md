# Optional squad models

## The rule

A squad can add optional models with their own name and rules, such as a
champion, musician, or standard bearer. Each can be taken once.

## The structure

Two approaches, depending on how different the optional model is.

If it is a normal squad member with a small rules bump, make it a shared entry
with a `max 1 in parent` constraint and give it a short abilities profile. The
player adds it to the unit like any other model, but no more than one.

If it is a distinct kind of model that should sit under its own role or
category, make it a separate model entry with its own root link and primary
category, rather than an option on the base model. Kill Team does this: each
model kind is its own entry, and the role comes from which root link is used.

## Notes

- Keep the option priced per model the same way as the rest of the unit; see
  [Points that scale per model](/guide/recipes/points-per-model).
- How models group into one line or split into separate stacks is controlled by
  the [collective](/guide/concepts/collective) flag.
- A *mandatory* model (`min 1`, `max 1`, no choices) is hidden from the options
  as a constant selection; see
  [Troubleshooting](/guide/troubleshooting#a-mandatory-option-doesnt-show-the-sergeant-is-missing).
