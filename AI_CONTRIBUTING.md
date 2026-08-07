# Contributing (AI agents)

Style rules for AI assistants editing these docs. For repo mechanics (preview,
adding pages, sidebar) see [CONTRIBUTING.md](CONTRIBUTING.md).

Facts about engine or editor behavior must be checked against the code
(nuxt-nr / nr-editor) or confirmed by the maintainer before being asserted;
when in doubt, say so.

## Style guide

Write for a reader whose first language may not be English.

### Terms

- **One name for one thing.** Use the editor's UI label for anything the
  reader must find (Affects, No Index, Show tracker, Child ID). Never
  introduce a synonym for an established term: it is always the force, never
  "the detachment".
- Conditions **pass** or **fail**; constraints are **met** or **not met**.
  Never "broken", "satisfied", "valid", or "holds" for either.
- Use the short common word: use (not utilize), before (not prior to), after
  (not subsequent to), about (not regarding), get (not obtain), show (not
  demonstrate), also (not additionally), help (not facilitate).
- No marketing adjectives: seamless, robust, powerful, effortless.
- American spelling, except domain terms with a fixed spelling (catalogue).

### Sentences

- Active voice: "the builder hides constant selections", not "constant
  selections are hidden by the builder".
- Use a verb for the action: "count the models", not "perform a count of the
  models".
- No stacked hedges: not "it is important to note that this may help to
  improve X"; write "this improves X".
- Keep sentences short in recipes, steps, and troubleshooting (about 20
  words). Concept pages may use normal explanatory prose.
- Prefer two sentences over a semicolon.
- One topic per paragraph.

### Punctuation

- No em dashes. In definition lists write `**Term:** description`; in prose
  use a comma, colon, parentheses, or a second sentence.
- Never two colons in one sentence.

### Procedures

- Numbered steps, imperative form, one action per step.
- Put the condition before the command: "If the unit has model entries, put
  the cost on the models."

### Voice

Contractions are fine: these docs teach, they are not an aircraft manual.
Keep the tone plain and direct, explain *why* a pattern works, and be honest
about rough edges.

### Before submitting

- A step sentence over ~20 words? Split it.
- The same thing named two ways? Pick one.
- Passive voice with a known actor? Make it active.
- A term the UI doesn't use? Replace it with the UI label, or define it once.
- An em dash anywhere? Rewrite it.
