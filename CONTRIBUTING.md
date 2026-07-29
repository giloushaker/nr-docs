# Contributing

These docs are for NewRecruit data authors. Every page on the site has an
"Edit this page on GitHub" link — pull requests are welcome, from typo fixes
to new recipes.

To preview locally: `npm install`, then `npm run dev`.

Facts about engine or editor behavior should be checked against the code
(nuxt-nr / nr-editor) before being asserted; when in doubt, say so in the PR.

## Style guide

Write for a reader whose first language may not be English.

### Terms

- **One name for one thing.** Use the editor's UI label for anything the
  reader must find (Affects, No Index, Show tracker, Child ID). Never
  introduce a synonym for an established term — it is always the force, never
  "the detachment".
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
  improve X" — write "this improves X".
- Keep sentences short in recipes, steps, and troubleshooting (about 20
  words). Concept pages may use normal explanatory prose.
- Prefer two sentences over a semicolon.
- One topic per paragraph.

### Procedures

- Numbered steps, imperative form, one action per step.
- Put the condition before the command: "If the unit has model entries, put
  the cost on the models."

### Voice

Contractions are fine — these docs teach, they are not an aircraft manual.
Keep the tone plain and direct, explain *why* a pattern works, and be honest
about rough edges.

### Before submitting

- A step sentence over ~20 words? Split it.
- The same thing named two ways? Pick one.
- Passive voice with a known actor? Make it active.
- A term the UI doesn't use? Replace it with the UI label, or define it once.
