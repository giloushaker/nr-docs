# Contributing

These docs are for NewRecruit data authors, and contributions of any size are
welcome and appreciated. Especially anything that makes starting out easier:
if something confused you while learning, chances are it confuses everyone
else too.

Spotted a typo or a wrong fact? Every page on the site has an "Edit this page
on GitHub" link; a quick PR from there is fine.

Found something wrong or confusing but don't want to write the fix yourself?
[Open an issue](https://github.com/giloushaker/nr-docs/issues) describing what
confused you; that alone is useful.

Questions about contributing, or about how something in NewRecruit works,
are welcome on the [NewRecruit Discord](https://discord.gg/cCtqGbugwb).

## Previewing locally

```
npm install
npm run dev
```

## Adding a new page

1. Create the `.md` file in the right folder under `guide/`:
   - `guide/concepts/`: what a feature is and how it behaves
   - `guide/recipes/`: how to build a specific rule, step by step
   - `guide/advanced/`: niche or power-user topics
   - `guide/reference/`: lists and lookup material
2. Add it to the sidebar in `.vitepress/config.ts` (find the matching section
   and copy a neighboring entry).
3. If the section has an index page that lists its pages (recipes has
   `guide/recipes/index.md`), add a link there too.
4. Link to other pages with absolute paths: `/guide/concepts/modifiers`.

If you're not sure a page idea fits, open an issue or a draft PR and ask.

## Style

Many readers are not native English speakers, so the docs favor plain, direct
writing. The main things to aim for:

- **One name for one thing.** Use the editor's UI label for anything the
  reader must find (Affects, No Index, Show tracker, Child ID), and don't
  switch between synonyms for an established term.
- **Short common words.** Use, not utilize; before, not prior to; about, not
  regarding; show, not demonstrate. Skip marketing words like seamless or
  powerful.
- **Active voice, concrete verbs.** "The builder hides constant selections",
  not "constant selections are hidden by the builder". "Count the models",
  not "perform a count of the models".
- **Short sentences in instructions.** In recipes, steps, and
  troubleshooting, keep step sentences to roughly 20 words and one action
  each, with the condition first: "If the unit has model entries, put the
  cost on the models." Concept pages can use normal explanatory prose.
- American spelling, except domain terms with a fixed spelling (catalogue).
