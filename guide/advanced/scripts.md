# Editor Scripts

The editor can run scripts against the loaded data, for bulk edits, tagging, or
finding problems. Click the triangle next to the system name to see the scripts
available.

Some ship with the editor, such as `find-duplicate-ids`, `find-duplicates-profiles`,
and `fix-profiles`. You can also write your own.

::: tip
Scripts run manually, and can also hook into paste to transform pasted text (see
[Paste hooks](#paste-hooks) below). The scripting feature is still evolving.
:::

## Writing a script

Create a folder named `scripts` in your data folder and add a `.js` file that
exports a default object:

```js
export default {
  name: "Display Selected",
  description: "Returns the currently selected node(s)",
  arguments: [
    { name: "catalogues", type: "catalogue[]" },
    { name: "query", type: "string", optional: true },
  ],
  run(catalogues, query) {
    return [
      `<span style="font-weight: bold">Selected nodes:</span>`,
      $store.get_selections(),
    ];
  },
};
```

A script returns one of, or an array of: `number`, `error`, `string`, `node[]`,
or `[node, string][]`. String output renders as HTML.

## What scripts can use

- `$store`: interact with the editor. The available actions are in
  [editorStore.ts](https://github.com/giloushaker/nr-editor/blob/master/stores/editorStore.ts).
  It is also available in the browser console.
- `$node`: read and write local files.

Example scripts (written in TypeScript, though only JS is supported for your own)
live in the editor's [default-scripts](https://github.com/giloushaker/nr-editor/tree/master/default-scripts).
If a script needs imports, bundle them into one `.js` file with rollup or webpack.

## Paste hooks

A script can intercept pasted text by exporting a `hooks.paste` handler. This is
how you build a custom importer: paste a block of stat-line or rules text and
turn it into entries. The shipped The Old World paste scripts do exactly this.

```js
export default {
  name: "Paste unit profile",
  hooks: {
    async paste(event, text) {
      // parse `text` and create entries via $store / $catalogue
    },
  },
};
```
