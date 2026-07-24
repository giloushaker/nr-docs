# Git-history research: NewRecruit editor & engine features for data authors

Sources: local repos `nr-editor` (1,362 commits, 2023-05 → 2026-06) and `nuxt-nr` (builder; only data-author-relevant commits mined). Hashes are short SHAs; `(editor)` = nr-editor, `(nuxt)` = nuxt-nr, `(shared)` = assets/shared submodule.

---

## 1. Data-author-facing editor features

### Editing operations

| Feature | Landed | Notes |
|---|---|---|
| Core tree editing: cut/copy/paste with automatic ID scrambling on paste | 2023-05 (editor `32dee49`, `2bf2e1a`) | Pasting duplicated entries re-generates IDs; scope relations in constraints are preserved (`c22d433`, `cf3fba1` array-aware scramble). ID scrambling is skipped when pasting constraints alone (`8e94...` 2023-06). |
| Duplicate (Ctrl+D), Move To, move up/down (with hotkeys) | 2023-05 (`ac3b155`, `f98c380`), 2024-08 (`ff1aebd`) | Full keyboard-driven reordering; move up/down marks the catalogue dirty (`35ec197`). |
| Paste-as-link (Ctrl+L) | 2024-01 (`6556099`) | Copies an entry, pastes a link pointing at the copied target. |
| Flatten groups | 2024-01 (`55cb95a`, `6cb7f62`) | Flatten a group's children into the parent, works on links too. |
| Mass sort / sort children on groups / sort by type | 2024-01 (`5ea4702`, `b00d765`, `2f76f65`) | Bulk alphabetical sorting; editable `sortIndex` field added 2025-02 (`5c58e26`). |
| Quick conditions & quick modifiers | 2023-06 (`0395b49`); expanded to local condition groups and condition groups 2026-06 (`026e094`, `e569b15`) | One-click creation of common condition/modifier patterns. |
| Categories editing UI v2 | 2023-10/11 (`ce8ec4f`, `26ca605`) | Optional bulk category assignment view with revision-increment prompt. |
| Global search across catalogues | 2023-07 (`e0bfc41`) | Search the whole system, with full-path display option (`bb2959e`). |
| References panel + alt-click goto/follow | 2023-05/06 (`891419f`, `8ed9914`) | See every place an entry is referenced (incl. from constraints), navigate cross-catalogue (`045b02f`). Broken links get a dedicated icon (2025-05, `a7b82b7`). |
| Default Amount incl. multiple stacks (`1,2,3`) and string patterns | 2023-06 (`f4a932d`), 2024-04 (`f24b7bf`, `2ecc7bf`), 2024-08 (`061cf4f`) | Controls how many of an entry are added by default; comma-separated for multiple stacks. |
| `step` field on entries | 2026-04 (`e440889`) | Force selection amounts to increment in steps (e.g. units bought 5 at a time). |
| Position field on `replace` modifiers | 2025-02 (`291db68`) | Replace only at a given position in the string. |
| Profile/characteristic tooling | 2023-06 → | Auto-update profiles when profile type changes (`ff16320`), "fix profiles" script (`bed236a` attributes-aware), increment/decrement characteristics (`6a3616e`), paste HTML decoded into characteristics (`0918f2c`). |
| Window/session comfort | ongoing | Save window position (`81180fa`), sticky scroll (`3a36d91`), collapse-deepest (`dd1c9b7`), indent guides (`0971c1e`). |

### Validation

- **Live error checking** with per-node error icons from 2023-06 (`731d633`, `6138c1c`): link-without-target errors (`49f3c94`), condition `childId` errors (`a5e2c87`), bad category links shown and removable (`9bf2e15`, `7f8f153`), duplicate-constraint detection on links (`5cd86d8`). Undo updates errors (`239c7c9`).
- **Comment-driven annotations** (2024-07, `51428e2`; logic in shared `bs_main_catalogue.ts`): a node comment starting with `todo:`, `warning:` or `error:` surfaces as an editor todo/warning/error on that node. Effectively an author-facing TODO/lint system inside the data files.
- **Duplicate-finder scripts** (2025-09, `eef4437`): `find-duplicate-ids`, `find-duplicates-profiles` shipped as default scripts.
- **Save failure notifications** (`99923d8`, 2023-09) and **external-file-change detection** (`2ba0d1f`, `b7d27fc`, 2023-10/11) — the editor warns when a file was modified outside (e.g. by git pull).
- **Revision management**: prompt to auto-increment catalogue revision on save (`26ca605`), setting to disable auto-increment (`14d1b04`), no prompt for newly created files (`fbabc6a`).

### Import / export / file formats

- XML (.gst/.cat), zipped (.gstz/.catz) and **JSON catalogue format** supported from the start (2023-05, `03f03e0`, `52b1cd4`); new catalogues take the same extension family as the game system (`77912dc`).
- **Change File Format** button on a system (2023-12, `462d090`): converts a whole system between `.gstz/.catz` (zipped XML), `.gst/.cat` (XML) and `.json`, optionally deleting the old files.
- Download/export single files as XML (2023-05, `e663131`, `9a67d95`).
- Create/delete game systems in both desktop and web versions (2023-06, `6470162`, `a6181d3`, `74dec38`).
- Game-specific importers: **T9A JSON army-book import scripts** (2025-05 → 2025-06, `e279cd9`, `48db1a0`, `20f39f7`), TOW paste-parsers (below).

### GitHub integration

- **Import a system straight from a GitHub repo** (2023-05, `d8aad57`, `1ecfcb8`).
- **GitHub publish integration** (2023-06, `fb5cf33`); since 2023-10 it works from any local `.git` folder without needing a "publication" configured (`5810067`); loaded automatically when uploading files (`c414801`, 2024-01).
- The desktop editor saves straight to the local filesystem (2023-05, `67af130`), so a normal git workflow (repo folder + commits) is the intended loop.

### Scripting / automation

- **User script system** (2024-04, `5fa9b3f`, `de776eb`): JS/TS scripts with a UI for typed arguments (`ScriptArgument.vue`), run against the loaded catalogue object model; node-compatible globals so scripts also run outside the app (`5b974a7`, `429...`); helpers to create nodes from scripts (`1e7d14d`).
- **Paste hooks** (2024-04, `de776eb`): scripts can intercept pasted text — shipped examples parse The Old World equipment/weapon/special-rule text blocks into entries (`default-scripts/tow/paste-*.js`).
- Shipped default scripts: `find-duplicate-ids`, `find-duplicates-profiles`, `fix-profiles`, `fix-link-names`, `list-refs`, `select`, plus T9A importer suites (`default-scripts/t9a`, `default-scripts/nrt9a`).

---

## 2. Engine / format capabilities a data author needs explained

These are visible in both repos (editor UI + nuxt engine) and most are NewRecruit extensions beyond classic BattleScribe.

### Scopes & queries
- Classic scopes: `self`, `parent`, `force`, `roster`, `ancestor` (checks all parents), `primary-catalogue`, `primary-category`.
- **Type scopes** (2024-05, editor `8ce9e46`/`4d7d5b7`, nuxt `dd256e02f`): `root-entry`, `unit`, `model`, `upgrade`, `model-or-unit` — scope a condition/constraint to the nearest node of a given entry type.
- **`non-upgrade-entry` scope** (2026-06, editor `b86a4d8`, nuxt `ea473a0fa`): nearest ancestor that is an entry and not an upgrade.
- **`-self` scope variants / "include self" flag** (2026-07, nuxt `b7342f551`, `6f7d8c748`): type scopes that count the anchor node itself.
- Scope-by-entry-id constraints (nuxt `8cf6328`, 2022-11) — constraints scoped to an arbitrary entry by its ID.

### Constraints
- Flags: `percentValue`, **`negative`** (2024-05, `a520976`), **`automatic`** (2025-02, editor `2a5edd2`, nuxt `bd863c201`): automatic constraints make the builder auto-add/adjust selections to satisfy the constraint, incl. when loading a roster (`cf1809eed`), with dedup and nested handling (`68dd06c01`, `6a3422e56`) and infinite-loop short-circuiting (`aad06dc89`, 2026-05).
- "Exactly" quick constraint (2023-09, `3561459`).
- `defaultCostLimit` (2023-06, `514e68c`); cost limits usable in conditions and point-type-to-point-type modifiers (nuxt `2db80702f`, 2025-07).
- Constraints on `associations` field with childId and filter-by (2026-03/04, nuxt `767954cc5`, editor `43bd3dd`).

### Conditions
- `instanceOf` (2023-06), **`always` / `never`** (2025-01, `402f628`), **`before`** (2025-12, nuxt `be889dd04`) condition types.
- **Condition group types beyond and/or: `not` and `count` (with min/max)** (2025-11/12, editor `054c19c`, `4890c0c`).
- **Local condition groups** (2025-01, editor `ea35f28`, nuxt `239b26ac6`): a condition group with its own query/scope that also **functions as a repeat** (`86229e9`, nuxt `ed7c4c067`), supports scopes (`f3b851de0`) and nested groups (`a1820ba57`).
- Sortable condition-group children UI (2026-01, `0e544fe`).

### Modifiers
- Operations: set / increment / decrement / append / prepend / replace (with position), multiply / divide / **modulo**, **floor / ceil** (2025-02, `9874bd8`), **power** (2025-12, editor `46c4d29`, nuxt `be889dd04`), replaceAt semantics on replace/increment (nuxt `c0edbc29c`).
- Targets beyond BS: `defaultSelectionEntryId` (2023-06, `b6f4e6e`; `"none"` supported for groups — `c3537bc` 2024-09, associations 2026-06 `379ee55`), `defaultAmount` (`061cf4f`), constraints values, set/unset primary category, costs of **primary categories** (2026-04, `be479e8`), annotation accepts numbers (2025-11, `318fa44`).
- **`error` / `warning` / `info` message modifiers** (2024-12 → 2025-01, editor `1326f97`, nuxt `e48838526`): data can push validation messages ("{this} is not allowed") onto the roster conditionally. Message/InfoText modifier types extended 2026-02/03 (`92e0be0`, `4af3f2f`).
- **Cumulative modifiers** (2026-01, editor `1f6567a`, nuxt `8c8a6f9f9` with `combineCosts`; order fix `2fed5c831`).
- Modifier ordering semantics were tuned repeatedly (nuxt `fcd9931f2`, `116f449e7`, `34af72c20` init modifiers before conditions) — worth documenting evaluation order.

### Relative modifiers & the `affects` field (NR-only, major)
- **Relative modifiers** (2024-09, editor `b5da173`, nuxt `9841e9d1d`): modifiers that live on one node but affect *other* nodes selected relative to it.
- **`affects` query UI** (2025-01, editor `d0e5214`, nuxt `d2921813a`): choose scope + what to affect (self / child selections / child forces / recursive / associated nodes / group associations).
- Extended 2026: relative modifiers on info nodes (nuxt `6053efa68`), following associations with traversal **depth & action** (editor `6c78ebf`, nuxt `62d9d547c`, `aea8a6438`), group-affects flag (nuxt `c15a88901`), UI in info panel (`5e6710d`).

### Associations (NR-only subsystem)
- Long-lived NR extension (builder support since 2022, `896b49b4e`; editor UI 2024-01, `e799941`): entries can *associate* with other selections (e.g. 40k Leaders attached to units), with association constraints, auto-check, and export handling.
- 2026 expansion: association conditions (`92e0be0`), conditions can refer to the association **source** (nuxt `5443955ef`), filter-by on candidates (`6179b34`), sortable (`a26917f`), include-child-forces flag (`59fcd4d`, nuxt `431f7e03b`), **association groups** with `traverseAssociationGroup` flag on relative modifiers/conditions/constraints (editor `dfeb711`, nuxt `af097d523`), `defaultSelectionEntryId="none"` (`379ee55`).
- The generic "Leaders" feature is driven by system functions across game systems (nuxt `d821e6a88`, 2026-06).

### Data-format extras (NR schema extensions)
- **`alias`** (list of strings) and **`noindex`** on named nodes (2024-03/04, editor `57e37ee`, nuxt `0f0437a6f`; noindex `7c8d916` 2024-08): aliases add extra names for in-text reference matching (rules text auto-linking); noindex removes a node's name from that index.
- **`formatRules` and `defaultValue` on characteristicTypes, `childName` on filters** (2026-03, `4d542d7`, `f91f519`).
- **Attributes & attributeTypes on profiles** (2025-02, `560700b`) — a second characteristic-like axis with its own icons (`30fd645`/`30414a8` icons 2025-10).
- Profile `subType` ("crew"/"mount", 2024-01, `cd4f637`); unit-group entry type (2024-02, `11db9fb`).
- Repeats: `roundUp` default (2023-06, `77e5e9f`), `childId` default "any" (`1546947`).
- Force entries: force links / nested child forces (2025-07, `0237392`, `5814d32`), child-forces label (`16f04e0`).
- `[export-as-ability]` tag readable from data (nuxt `cc66310bd`, 2025-12) — controls how an entry exports.
- Header flag & "triangular" modifier for T9A-style tables (nuxt `cf7a72da1`, 2026-04).

### Builder-side systems a data author interacts with
- **GitHub game systems**: the builder can load a system directly from any GitHub repo (2024-04, nuxt `62258135f`, `657532322`, server `7557fb89a`), auto-updates within ~1 min via GitHub notifications (`d34e920ae`), supports custom refs/branches and multiple URL formats (`db54e49c6`, `7628647be`, 2025-08), shareable **install links** (`d7dc3aff3`, 2025-07; `d0cc7777f` 2026-04), zip-proxy to avoid API limits (`1e45156b0`).
- **Export templates**: custom text/HTML export templates with variables (nuxt `65fa6db61`, 2024-11), saved templates (`6ced2634e`, 2025-02), string-manipulation helpers (`760fd1aff`), `groupBy` (`4f8b78b16`), notes (`c376425f7`), scope-inspection helper (`41ffe65b5`), and **JS/scripts allowed inside templates** (`01afa7f07` 2025-05, `3705fb5b2` 2025-07); community templates repo linked in-app (`404538aa3`). Stable object references so scripts can add fields (`7c1caac07`).
- Roster import: `.ros`/`.rosz` BattleScribe roster import (2022, `dd45f39`; relabeled 2025-12 `29aca75bb`), JSON rosters (`e57654dd3`, 2024-03), T9A legacy text-list import/export on the BS engine (2026-07, `49c4d0340`).
- Engine fixes with author-visible semantics: BS `atLeast 0 scope=self` bug emulated (2022, `20ed1697e`); "forces" conditions no longer forced to roster scope (2025-08, editor `0c82d7c`); force loading survives data devs changing IDs (2026-07, nuxt `fd410ba73`).

---

## 3. Likely undocumented features (not in old BSData wiki / community tutorials)

Highest value for new docs, roughly ordered:

1. **Relative modifiers / `affects` queries** — entire NR-only mechanic (2024-09 → 2026), incl. association traversal depth/group flags. No BS equivalent.
2. **Associations & association groups** — NR-only; constraints, source-referencing conditions, groups + traversal flags all landed 2026.
3. **Automatic constraints** (`automatic` flag, 2025-02) — auto-adding selections; only flagged behavior, invisible in BS docs.
4. **Local condition groups** that double as repeats (2025-01).
5. **`count` / `not` condition groups** and **`always` / `never` / `before` conditions** (2025-01 → 2025-12).
6. **Error/warning/info message modifiers** — data-driven validation messages (2024-12).
7. **Comment-prefix lints** — `todo:` / `warning:` / `error:` comments become editor annotations (2024-07).
8. **Type scopes** (`unit`, `model`, `upgrade`, `model-or-unit`, `root-entry`, `non-upgrade-entry`, `-self` variants) (2024-05 → 2026-07).
9. **`alias` / `noindex` fields** for in-text rule reference matching (2024-03).
10. **Editor scripting system + paste hooks** (2024-04) — including writing custom import parsers.
11. **JSON catalogue format & Change File Format tool** (2023-12).
12. **Export templates with embedded JS** and the templates repo (2024-11 → 2025-07).
13. **GitHub systems**: loading, custom branches/refs, install links, ~1-min auto-update (2024-04 → 2025-08).
14. **`step` on entries** (2026-04) and multi-stack `defaultAmount` (`1,2,3`).
15. **Cumulative modifiers + combineCosts** (2026-01) and modifier operations `power`/`floor`/`ceil`/`modulo`.
16. **Attributes on profiles**, `formatRules`/`defaultValue` on characteristic types, `childName` on filters (2025-02 → 2026-03).
17. **Negative constraints** flag (2024-05) and constraints on the `associations` field with childId (2026-03/04).
18. **Force links / nested child forces** (2025-07) and cost modifiers for primary categories (2026-04).
