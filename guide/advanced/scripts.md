# Editor Scripts

The editor can run scripts against the loaded data, for bulk edits, tagging, or
finding problems. Click the triangle next to the system name to see the scripts
available.

Some ship with the editor, such as `find-duplicate-ids`, `find-duplicates-profiles`,
and `fix-profiles`. You can also write your own.

::: warning
Scripting is not finished. Scripts currently run manually only; hooks (on paste,
on change, on load) may come later.
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

- `$store` — interact with the editor. The available actions are in
  [editorStore.ts](https://github.com/giloushaker/nr-editor/blob/master/stores/editorStore.ts).
  It is also available in the browser console.
- `$node` — read and write local files.

Example scripts (written in TypeScript, though only JS is supported for your own)
live in the editor's [default-scripts](https://github.com/giloushaker/nr-editor/tree/master/default-scripts).
If a script needs imports, bundle them into one `.js` file with rollup or webpack.
