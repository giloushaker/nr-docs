# NR data-editor / engine feature timeline & BS-vs-NR adjudication

Scope: separates what NewRecruit (NR) actually supports today from legacy BattleScribe (BS)
behavior. Primary authority: `nr-editor-releases.md` (release changelog). Secondary:
`git-history.md` and direct `git log` on `nr-editor` / `nuxt-nr`. Every verdict cites a
release version+date or commit hash.

Convention: `vX.Y.Z (date)` = nr-editor release. `(nuxt HASH)` = builder/engine repo.
`(editor HASH)` = nr-editor repo.

---

## Part A — Chronological timeline of notable NR data-authoring features

### 2022 (builder/engine, pre-editor)
- Associations subsystem exists in the builder (nuxt `896b49b4e`) — leaders/attachments.
- Reactive constraint checking: `checkConstraints` cached + recomputed only on
  invalidation (nuxt `c8f51dd13`, `f906363f8`, 2022-03/04). This is the architectural
  reason NR does **not** have BS's "recompute the whole catalogue" cost.
- Scope-by-entry-id constraints (nuxt `8cf6328`); `atLeast 0 scope=self` BS bug emulated
  for compat (nuxt `20ed1697e`).

### 2023 — editor launch & core authoring
- 2023-02 (nuxt `0c55a30f4`): **lazy-load of hidden groups & headers** — hidden content
  is not fully materialized in memory.
- v1.0.0–v1.1.19 (2023-05/06): editor ships. Tree edit, cut/copy/paste with ID scrambling,
  undo/redo, references panel, **JSON / XML / zipped catalogue formats** from day one.
- v1.1.60 (2023-06-19): **increment/decrement modifiers on characteristics** (works on
  string stats like `5+`).
- v1.1.65–67 (2023-06-23): **`defaultAmount`** field, **modifiable `defaultSelectionEntryId`**,
  **`exactly`** constraint. `defaultCostLimit` (v1.1.42/46).
- v1.1.68/69 (2023-06): condition `childId` error checking; **removed the warning when
  incrementing a non-numeric characteristic**.
- v1.1.89 (2023-12-13): **Change File Format** button (convert whole system XML↔zip↔JSON).

### 2024 — reordering, aliases, scripting, relative modifiers
- v1.1.92/93 (2024-01-05): **`noAlphabeticalSort`** field, `prepend` modifier.
- v1.1.102/104 (2024-01): **`sortIndex` field + manual drag-reorder UI**; entries render
  in sortIndex order. Link-id→targetId childId handling removed (link-targeting fix).
- v1.1.123 (2024-03-15): **`alias`** UI. Markdown in text fields: tables/`<br>`
  (nuxt `758db467f`, 2024-04-06), smallcaps ext later.
- v1.1.124/125 (2024-04): **user script system + paste hooks**.
- v1.1.128/129 (2024-04-30): **`defaultAmount` comma-separated multi-stacks (`1,2,3`)**.
- v1.1.131–133 (2024-05-14): full parent/generic scope choices; **type scopes**
  `unit`/`model`/`upgrade`/`model-or-unit`/`root-entry` (nuxt `dd256e02f`).
- v1.1.135 (2024-05-16): **`negative` constraint flag** (so `-1` is not ignored);
  negatives/floats allowed in inputs.
- v1.1.139 (2024-07-05): **comment-prefix lints** (`todo:`/`warning:`/`error:`).
- v1.1.140 (2024-08-04): **`defaultAmount` modifier**.
- v1.1.144 (2024-08-16): **`noindex`** field (disable rules auto-linking).
- v1.1.147–150 (2024-09-05): **custom error modifier**, modifier scope combinations
  (parents/childs/profiles), annotation modifier.
- v1.1.155 (2024-01-01→ listed 2025-01-01): **Warning/Info modifiers**, force cost modifiers.
- Relative modifiers land (nuxt `9841e9d1d`, editor `b5da173`, 2024-09).

### 2025 — automatic constraints, local condition groups, math
- v1.1.157/158 (2025-01-09): **Local Condition Groups** (multi-category checks; double as
  repeats).
- v1.1.159 (2025-01-12): **`always`/`never`** conditions.
- v1.1.160 (2025-01-23): **`affects` query UI** for relative modifiers.
- v1.1.164/165 (2025-02-06): position field on increment/replace modifiers.
- v1.1.168 (2025-02-13): **attributes** (hidden characteristics) on profiles.
- v1.1.170/171 (2025-02-21): **`automatic` constraint flag**.
- v1.1.172 (2025-02-27): **manual `sortIndex` input box**, **`floor`/`ceil` modifiers**.
- v1.3.19 (2025-07-25): sharedForceEntries & forceEntryLinks (nested child forces).
- v1.3.23 (2025-09-12): **`multiply`/`divide`/`modulo` modifiers**.
- v1.3.25 (2025-11-19): **`COUNT` and `NOT` condition-group types**; `Kind` on
  profile/characteristic types.
- v1.3.28 (2025-12-31): **arithmetic condition-group types** (`add`/`subtract`/`multiply`/
  `divide`/`modulo`/`power`/`min`/`max` + comparisons), **`before` condition**
  (position-dependent cost), **`power` modifier**.
- v1.3.29/30 (2026-01): **cumulative modifiers**; repeats & sort UI in condition groups.

### 2026 — associations, category costs, group affects
- v1.3.31 / listed changelog (2026-04-06): **`triangular` & `exponent` modifiers**;
  **association `action`/`splittingBehavior` (`group` = leader)**; association filter-by;
  characteristicType **`defaultValue`/`formatRules`**; constraint **`message`** field;
  category `description` + editable category costs.
- v1.4.2 (2026-04-09): **`step`** field on entries; `childId` on self-scope constraints.
- v1.4.8/9 (2026-06-19): **follow associations for relative modifiers**.
- v1.4.10 (2026-06-23): association conditions/ordering; `defaultSelectionEntryId` on
  associations.
- v1.4.11 (2026-06-27): **relative modifiers directly on profiles/rules/infoGroups/infoLinks**;
  **"Affect group associations" flag** (constraints/conditions/relative modifiers).
- `non-upgrade-entry` scope (nuxt `ea473a0fa`, 2026-06); **`-self` / include-self scope
  variants** (nuxt `b7342f551`, `6f7d8c748`, 2026-07); markdown smallcaps in wiki fields
  (nuxt `acc38b9b9`, 2026-07-08).

---

## Part B — Adjudication table

| # | Behavior | Verdict | Evidence | Doc implication |
|---|----------|---------|----------|-----------------|
| 1 | Conditions/constraints only check one level down unless `includeChildSelections` | **NR-CURRENT** | NR honors the field; `includeChildSelections` implicitly pulls child forces (nuxt `b90611ffa`), respected in scope-by-id (nuxt `89caf617c`) | Document `includeChildSelections` as required to reach nested selections — it is live NR behavior, not a bug. |
| 2 | Default-loadout trick: min-1 constraint + modifier setting min to 0 | **NR-FIXED** | Native `defaultAmount` (v1.1.67, 2023-06-23) and modifiable `defaultSelectionEntryId` (v1.1.65) replace it | Teach `defaultAmount` for preselected-but-removable loadouts; present the min/modifier trick only as legacy. |
| 3 | `defaultAmount` field, incl. comma-separated stacks & negative opt-out | **NR-CURRENT** (NR-only) | Added v1.1.67 (2023-06-23); comma-separated multi-stacks v1.1.128/129 (2024-04-30); modifier v1.1.140 (2024-08-04) | Document as an NR-only field; note BS ignores it. |
| 4 | `-1` used to disable a constraint / mark unlimited | **NR-CURRENT** | Default keeps BS semantics (`-1` ignored); NR adds `negative` flag to opt back in (v1.1.135, 2024-05-16) | Explain `-1` = "no limit" by default, and the `negative` flag when you actually mean minus one. |
| 5 | "primary catalogue is Instance Of" reloads whole catalogue (perf) | **BS-ONLY** | NR uses cached, invalidation-driven `checkConstraints` (nuxt `c8f51dd13`, `f906363f8`, 2022-03/04), not full recompute | Confirmed: NR does not have this problem; drop the workaround guidance entirely. |
| 6 | Conditions/filters targeting a LINK id silently fail | **NR-FIXED** | Editor drops link-id→targetId rewriting and surfaces invalid `childId` errors (v1.1.102 2024-01-18; childId errors v1.1.68; instanceof fix v1.1.32) | Note the editor now flags bad `childId`s instead of failing silently. |
| 7 | Sorting is alphabetical-only; needs leading-space/insertion hacks | **NR-FIXED** | `sortIndex` field + drag-reorder UI (v1.1.102/104, 2024-01); `noAlphabeticalSort` (v1.1.92/93); manual sortIndex box (v1.1.172, 2025-02-27) | Recommend `sortIndex` / `noAlphabeticalSort`; retire leading-space hacks. |
| 8 | Non-numeric characteristics (`6"`, `5+`→`4+`) can't be incremented | **NR-CURRENT** | increment/decrement modifiers on characteristics (v1.1.60, 2023-06-19); non-numeric warning removed (v1.1.69, 2023-06-28) | Document that increment/decrement works on string stats. |
| 9 | Prefer "set error" over "set hidden"; error/warning/info modifiers + custom text | **NR-CURRENT** | Custom error modifier (v1.1.148, 2024-09); Warning/Info modifiers (v1.1.155); constraint `message` field (v1.3.31, 2026-04-06) | Recommend error/warning/info modifiers + `message` over hidden-based hacks. |
| 10 | `automatic` constraint flag (auto-resolve, disables +/- on fixed units) | **NR-CURRENT** (NR-only) | Added v1.1.170 (2025-02-21); UI text v1.1.171; engine nuxt `bd863c201` | Document `automatic` as an NR-only flag for fixed-size units. |
| 11 | Scope semantics: self=entry not profile; ancestor=all parents & instance-of only; parent skips groups | **NR-CURRENT** (ancestor detail flagged) | Classic scopes live; ancestor tuned re self-matching (nuxt `4e637119f`, `b88d7dabb`, `5b2909817`) | Document self/parent/ancestor as current; verify the exact "parent skips selection groups" nuance against engine before asserting. |
| 12 | Type scopes: unit/model/model-or-unit/upgrade/non-upgrade-entry/root-entry + include-self | **NR-CURRENT** (NR-only) | unit/model/model-or-unit/upgrade/root-entry v1.1.131–133 (2024-05, nuxt `dd256e02f`); non-upgrade-entry 2026-06 (nuxt `ea473a0fa`); include-self variants 2026-07 (nuxt `b7342f551`) | Document each type scope with its landing date; all NR-only. |
| 13 | Associations: `action="group"`/`splittingBehavior`, `traverseAssociationGroup`, association conditions/filters | **NR-CURRENT** (NR-only) | Builder since 2022 (nuxt `896b49b4e`); editor UI 2024-01; action/splittingBehavior/group v1.3.31 (2026-04-06); traverse-group + affect-group v1.4.11 (2026-06-27) | Document associations as a whole NR-only subsystem; no BS equivalent. |
| 14 | Modifier operators multiply/divide/floor/ceil/modulo/triangular/exponent/power — UI or type-field only? | **NR-CURRENT, in editor UI** | floor/ceil v1.1.172 (2025-02); multiply/divide/modulo v1.3.23 (2025-09); power v1.3.28 (2025-12); triangular/exponent v1.3.31 (2026-04) | All selectable in the modifier-type dropdown; triangular/exponent are niche (T9A tables). |
| 15 | Markdown in text fields (*italic*, **bold**, ^^smallcaps^^, tables) | **NR-CURRENT** | Markdown render incl. tables/`<br>` (nuxt `758db467f`, 2024-04-06); smallcaps ext (nuxt `acc38b9b9`, 2026-07-08) | Document supported markdown; note it renders in NR, not BS. |
| 16 | `alias` / `noindex` fields for rules auto-linking | **NR-CURRENT** (NR-only) | `alias` UI v1.1.123 (2024-03-15); `noindex` v1.1.144 (2024-08-16) | Document both as NR-only reference-matching controls. |
| 17 | Relative modifiers + `affects`; needing `includeChildSelections` even with no child entries | **NR-CURRENT** (NR-only) | Relative modifiers 2024-09 (nuxt `9841e9d1d`); `affects` UI v1.1.160 (2025-01-23); on info nodes + group-affects v1.4.11 (2026-06-27) | Document relative modifiers/`affects` as a major NR-only mechanic; note the includeChildSelections quirk. |
| 18 | Hidden ≠ not loaded; every shared entry duplicated per instance (memory/perf) | **NR-FIXED (partial)** | NR lazy-loads hidden groups & headers (nuxt `0c55a30f4`, 2023-02; re-added `87cef76a1`); `lazy` field (nuxt `0bb7370a1`, 2025-08) | Update the claim: hidden content is lazy-loaded; per-instance instantiation of *visible* shared entries still applies. |
| 19 | JSON catalogue format + Change File Format tool; cleaner git diffs | **NR-CURRENT** (NR-only) | JSON from launch (2023-05); Change File Format button v1.1.89 (2023-12-13); JSON now pretty-printed not minified (v1.3.18, 2025-07-22) | Document JSON format + Change File Format; note pretty JSON gives clean diffs. |
| 20 | "Hidden currency / cost as a variable" workaround for arithmetic | **NR-FIXED** | Native arithmetic condition-group types + `before` (v1.3.28, 2025-12-31); math modifiers multiply/divide/modulo/power/floor/ceil (2025-09→12); cumulative modifiers (v1.3.29) | Replace the hidden-currency workaround with native arithmetic condition groups / math modifiers. |

Uncertainties to resolve before publishing: (11) exact "parent skips selection groups"
semantics; (17) precise conditions under which `includeChildSelections` is required with
no child entries. Everything else is cited to a release or commit.
