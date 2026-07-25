# In-text References

NewRecruit links names inside rules text. When a rule's text mentions the name of
another rule, ability, or entry, NewRecruit turns it into a reference the player
can look up. It does this from an index of the named nodes in the system, so the
names you give things, and the ones you exclude, control what gets linked.

## Aliases

A node is matched by its name. To also match other spellings or short forms, give
it an **alias** — a list of alternative names. Text matching any alias links to
the node. Use this for abbreviations or a rule that gets referred to by more than
one name.

## Excluding a node with noindex

To keep a node's name out of the index so it is never auto-linked, set
**noindex** on it. Use this for names that are common words, which would otherwise
turn ordinary text into links everywhere.

## The two-character minimum

A name needs at least two letters or digits to be indexed, so a single-character
rule name will not auto-link. Give it an alias of two or more characters.

## Formatting text

Text fields render Markdown: `*italic*`, `**bold**`, `^^small caps^^`, and tables.
The formatting shows in NewRecruit's display and in exports.

## Category descriptions

A category entry can carry a description. Its text takes part in the same
auto-linking, and the description itself renders as a reference where applicable,
so a category can point players at a related rule.

## Shared rules

For a rule used in many places, define it once and reference it with an info link
rather than copying the text, so every use stays in sync. See
[Links & Shared Entries](/guide/concepts/links).
