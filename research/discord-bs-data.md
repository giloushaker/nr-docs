# Discord Mining: #bs-data — Findings for NR Data-Authoring Docs

Source: NewRecruit server `#bs-data` channel export (~5,500 msgs, 2023-09 → 2026-07).
Participants: NR devs (Flammy = product/UI/business, Giloushaker = core engine/editor),
plus data authors (Mad_Spy 40k, Dunamis55 40k/LI, Madi AoS, Noah/nstephenh Heresy,
Mayegelt HH, Tidomann ToW, Kemp, Acebaur, Ballot 40k-expert/community, mal20k KillTeam,
Koetjeboe AT, Morrigan, Sneki).

This channel is a private data-author back-channel. It is the single richest source of
"how do I actually author this" knowledge for NR's BattleScribe-compatible format. Most
answers come directly from the engine dev (Giloushaker), so they are authoritative.

Legend for doc mapping: **[T]** tutorial · **[C]** concepts · **[R]** recipe · **[X]** troubleshooting.

---

## 1. Recurring questions / confusions (ranked by frequency)

### 1.1 Model & weapon structure — "weapon profiles on the model/unit" and "models named after their weapon"
The single most persistent data-structure topic across the whole log.

> "Instead of having a 'Model' named Cultist with Autopistol…, the weapon profiles are directly on the model" — Flammy, 2023-11-30
> "There is an issue with some models that are named as weapons, instead of being named Terminator w/ Heavy weapon… This messes up the exports because there is no way of knowing the name of the model" — Flammy, 2025-12-27

**Correct structure (devs' agreed convention):** a unit contains model-type SEs; each model
contains weapon SEs (selection entries), and weapon *profiles* live under those weapon SEs —
**not** weapon profiles directly under a model or unit entry. Dunamis55 called weapon-profiles-on-unit
"a data standards bug" (2023-11-30). Flammy wrote detection passes and even a hidden
"Weapon Profile Problems" button to enumerate offenders (2023-12-01).

**Why authors deviate:** naming a model `Terminator w/ Combi-bolter, accursed weapon` gets long,
so authors name the entry after just the weapons and rely on incrementing a count instead of
splitting models (fewer clicks for the user). See §1.2.

**Resolutions offered:**
- Give every weapon an explicit SE (needed for Yellowscribe/40k TTS and clean NR text export).
- For short display names, put the export/model name in the **comment** field: `[export-name:Chaos Terminator]` (Flammy, 2026-01-19 — the settled solution after profile-name and unit-name-inference workarounds both broke other units).
- A model must not share a profile *name* with a different model (e.g. Leman Russ variants) or exports mis-name it (Mad_Spy, 2026-01-22).

### 1.2 Reinforcing units / model "stacks" — the biggest live UX pain (esp. AoS, mobile)
> "if you have three units of reinforced clanrats… that's 60 clicks just to get your clanrats in the list" — Madi, 2024-11-20
> "there's no way to create a stack of models with 0 models, is there?" — Madi, 2025-05-19

Root problem: NR groups identical non-collective models into "stacks". A unit of 3 with one
each of champion/musician/standard has no "normal" stack, so reinforcing to 6 requires the
user to *create a new stack*, which is unintuitive — and on **mobile the `+` button was not
implemented** ("due to 'its ugly'", Madi 2025-10-28), so users could only split an existing
stack. This produced a steady stream of "squad leader missing / not enough models" reports
that authors repeatedly had to explain were **not bugs**.

**Techniques discussed:** `defaultAmount` supports comma splitting `"1,1,3"` for sub-units
(Giloushaker, 2024-04-30); `type="crew"` = a model that doesn't increment the count
(display/export only, 2024-04-05); auto-bounding of amounts when constraints change; and the
long-term fix Giloushaker landed in 2026-07 — reinforcing fills stacks top-down and the sub-unit
UI was reworked (still imperfect: fills the wrong default command models).

### 1.3 Associations — "how do they actually work?"
Asked by nearly every author at least once; almost no shared documentation existed.

> "I have no clue what they are. Can someone give me a tldr of how they work" — Fital Shell, 2024-07-11

**Concept:** associations let a selection point at another entry/unit ("this icon is on that
model"; "these units belong to this battalion"; in 11th, "this Leader attaches to that unit").
Originally built for AoS battalions, later abused for 40k icon-on-model and 11th Leaders.

**Key facts collected across the log:**
- Associations are **ignored by BattleScribe** → safe to add without breaking BS compat (Mad_Spy, 2024-06-05).
- Target with a specific id, or with **`model`**, or with a **category** if `model` is too broad (Giloushaker, 2024-10-22).
- Put **conditions on the association** to filter valid targets (acts as if copy-pasted onto every candidate); check "Evaluate from self instead of target" to test the source entry (2026-06-08/09).
- `action="group"` is required for the Leader UI treatment; a `traverseAssociationGroup` flag on modifiers/constraints makes them span the leader+followers group (e.g. "max 1 Enhancement across the attached unit") (2026-06-27/28).
- Historically **stripped on release** by the BS packager — see §4.

### 1.4 Child forces (regiments / allies / detachments) — adding them & hiding illegal ones
> "otherwise there's going to be an influx of bug reports saying 'where are the units???' because they did not realize they had to add regiments" — Madi, 2024-06-06

- A child force is "a force within a force"; used by AoS4 (Regiments/Auxiliary), 9e 40k, HH3.
- **Renaming the child-force label** dramatically cut "how add regiment" reports (Madi, 2025-06-13). Setting a **`min 1 forces`** constraint puts an error icon on the `+`/dropdown to guide users (Giloushaker, 2025-08-10).
- **Hiding illegal child forces:** copy The Old World's approach — condition per force; `instanceOf` on ancestor works and isn't limited to `primary-catalogue` (2024-04-04). BattleScribe cannot hide forces at all.
- No force *links* / shared forces exist → authors duplicate child forces and **share IDs** so conditions treat them identically (hacky; caused one dup-id bug, later hardened in NR).

### 1.5 Constant options / hidden models — "why is my model/leader missing?"
> "We're constantly getting reports that the squad leaders are missing or that squads don't have enough models." — Mad_Spy, 2025-10-02
> "I don't understand why people would want to see stuff that cannot be changed" — Flammy, 2025-10-08

An entry is treated as **constant (and hidden from the unit editor)** only if: its amount is
forced by constraints (min==max, min!=-1, max!=-1), those constraints have **no modifiers**,
and **all sub-options are also constant** (Flammy/Giloushaker, 2024-04-05/24). Users toggle
**Unit Options → Show Constant Options** to see them. This is *intended* but the top UX
complaint in 40k; devs debated (never fully resolved) whether to always show model-type entries.

### 1.6 Scopes & conditions — ancestor vs root-entry vs self vs unit/model
> "Ancestor is equivalent to all parents, should probably be renamed in the editor" — Giloushaker, 2026-04-30

- **`root-entry`** = the top of the unit only; **`ancestor`** = every parent up the tree; entry-type scopes (`unit`, `model`, `crew`, `mount`) climb to the nearest ancestor of that type. Flammy later added an **"include self"** checkbox because those scopes skip the node they're on (2026-07-09).
- **`instanceOf` / `notInstanceOf` never work with "and all child selections"** — deliberate BS-compat quirk (Flammy, 2026-04-30). `ancestor` scope should only be used with instanceOf/notInstanceOf.
- No native multi-category AND check ("is one entry both KROOT and HERO"); long avoided for perf. Later Giloushaker shipped **local condition groups** with AND/OR + a `repeats` field and `always`/`never`/`before` condition types (2025-01) — powerful but "very likely to have performance issues and might be confusing to use".
- No NOT logic on the modifier **Filter By** yet (must tag a helper category on the non-matching entries) (2025-08-28).
- No condition based on a profile's presence/value in an entry (2025-09-05).

### 1.7 Inline rule/keyword auto-linking in text
Introduced ~2024-03; many follow-up questions.
- NR auto-links any text that **exactly matches** a rule/profile/category **name** in a *loaded*
catalogue; case-insensitive; **longest match wins**; shows all if multiple share a name
(Giloushaker, 2024-03-15). No author markup needed.
- **Aliases**: `<alias>${text}</alias>` in xml lets one rule match extra strings and display the alias text; separator between multiple aliases is a **newline** (2024-10-30).
- **Escape an unwanted link**: wrap the text in a **code block** (backticks); or check **"no index"** on the target rule to stop it matching anything (2025-02-03). All-caps handling was special-cased to reduce keyword mismatches.

### 1.8 Text formatting / markdown
- Supported in offline builder/pretty export: **smallcaps `^^text^^`**, bold, italics, tables,
strikethrough, nested bullet lists (**4 spaces** to nest), underline via **`<ins>…</ins>`**
(2024-03-15, 2026-06-19). Not all render in the direct-PDF export. BattleScribe dropped markdown years ago.

### 1.9 Points/costs mechanics
- **Cost on a group/SEG does nothing in BattleScribe** (Mad_Spy, 2024-02-12).
- Set a cost on a **force** by pasting a `{ "type":"set", "field":"points", "value":100 }` modifier (2024-12-03).
- **Spam tax (11th "stepped costs")**: increment cost only from the Nth identical unit onward using a **`before`** condition in a local condition group with target **Self** (2026-06-17). `cumulative-add`/`cumulative-power`/**triangular** modifiers exist for scaling costs.
- 25%-of-army unit cap (ToW/HH): `max points in self = 0`, then `+1 per 4 pts limit in roster` (Mayegelt, 2026-03-26).
- `min 0` was treated like null (`-1`) so negatives didn't error; a **negative flag** was added so `-1` constraints aren't skipped (2024-05-16 / 2024-08-08).

### 1.10 Editor/session gotchas that look like data bugs
- Editor showing only part of a file / units missing → often a **stray character left in the search box**, or a **bad git merge**, or **needs an editor restart / re-pull of local data** (recurring: 2025-02, 2026-01).
- **Illegal chars in a catalogue filename** (e.g. `:`) silently create a broken file that can't be saved on Windows (Madi, 2024-12-30). Linux/Mac authors can publish such a file and break Windows clones.
- **Duplicate force IDs** had no handling and produced ghost constraints/modifiers.

---

## 2. Undocumented features / behaviors / gotchas revealed

- **`app:` comment flag** for per-app behavior: if a condition's comment starts with `app:`, NR checks whether the comment contains "newrecruit" instead of evaluating the condition; BS still evaluates it normally. To make something NR-only, write a condition that is false in BS + `app: NewRecruit`; for BS-only, true in BS + `app: BattleScribe` (Giloushaker, 2024-05-16, with a full JSON example in the log).
- **`type="crew"`** = model that doesn't increment model count (display/export only). **`mount`** subType only affects NR (BS sees a model). subType is a free string.
- **`upgrades: <model id>`** in a comment marks an upgrade as an upgraded model (affects "My Miniatures" matching / Warhall).
- **Profile "kind"** (Long Text, Annotation) and **Attributes** (invisible, export-only characteristics) — feed system-agnostic export templates; **characteristicType format rules** apply regex replaces at display time (empty→`-`, `D6+0`→`D6`, sign formatting) so authors can leave weapon-keyword ranges blank instead of hardcoding `-` (2025-11 / 2026-03-18).
- **Info Groups** now regroup profiles in the builder (with the group name in parentheses); previously invisible outside the editor (Flammy, 2024-05-24). Profiles with different columns can't be merged into one group.
- **`readme`** set via a `set readme` modifier on a Force shows unmissable text on an empty/loaded list (used to teach "add a Crusade Army / add a regiment").
- **Custom error messages** on constraints (and a substitutions popup) existed "for a while" but most authors never noticed until 2026-06 — big reaction.
- **Force flag "not for play"** (Play Mode) proposed for Crusade; Crusade Force was later made non-exportable, which itself generated reports.
- **`exactly` constraint** auto-translates to min/max 1 for BS compat (was split into two for compat).
- **Miniature-matching premium feature** needs explicit model entries; premium features were enabled in the desktop builder.
- **Profile ordering**: turn off "sort" in the editor, then right-click move up/down or `Alt+↑/↓`. A sort-index makes xml order impossible to control.
- **Debugging console** (`Ctrl+Shift+I`): `$debugOption`, `$debugOption.state.print_extra_constraints()`, `.findOption(id).instances`, `.findRecursive(predicate)`, `.forEach`/`forEachIncludeInactive`. **Select-nodes scripts**: `self(o => …)`, `.child()`, `o.profilesIterator()`, `o.getType()`, `o.isProfile()` — used for bulk data audits.
- **Force a spell/special export**: `$debugOption.getBook().getSystem().spells = true` in console.

---

## 3. Publishing / GitHub / hosting workflow

- **Getting a system listed on NR:** give the devs the GitHub repo URL; they add it manually ("Just tell us the url… and we can add it" — Flammy, 2025-09-27). This applies to homebrew too — Mad_Spy flagged the need to distinguish "official" vs derivative systems (e.g. "40k reforged" topping the add list, 2026-04-27).
- **Two update models:** releases (default; NR prioritizes GitHub Releases) **or CI/head** (pull straight from `main`). 40k switched to head because the BS release build process was broken (2025-03-18). Toggle release-vs-head is a per-repo server setting the devs flip on request.
- **Update latency:** NR checks GitHub roughly **every hour** (was "every 10 mins" in 2023). Force an immediate server refresh via `https://www.newrecruit.eu/api/check-for-update/BSData/<repo>` — Heresy wired this into a **GitHub Action on every push to main** (2025-08-15).
- **Revision auto-increment** works via the editor's GitHub integration only if `shortName` contains a slash, e.g. `BSData/horus-heresy` (Giloushaker, 2024-01-02). NR itself keys off the file's update **date**, not the revision number, so resetting versions is safe.
- **catpkg / wham "Publish catpkg" action strips unknown nodes** (associations, aliases) — this silently disabled associations for months. Fixed by having NR pull data **outside** the release/action pipeline (directly from GitHub) (2024-03 → 2024-04-30). Legacy `publish-catpkg`, `ci`, `chatops` workflows are BS-only and can be deleted if you're not shipping for BS (2026-05-29).
- **Offline/desktop:** "Offline version" at the bottom of the system list downloads all selected games' BSData for web/Android/desktop; on Android it's "Update all games" (JS ships inside the app, only updates on an app release). 40k ships offline out-of-the-box on Android first startup.
- **Multiple editions in one repo:** publish multiple `.gst` files flat in the repo root (Kill Team 2018/2021/2024) — NR shows both; **no subdirectory support**.
- **System IDs:** must be unique across *official* NR systems; forks should change the game-system id (and the `gameSystemId` in every catalogue) — catalogue ids can stay. Local/GitHub-added systems don't collide.
- **Sharing a list** auto-installs a missing *NR* system silently, but a shared list always pulls the **official** data, never a user's private GitHub fork — so it can't be used to sneak edited points past a TO.
- **Merge pain** is the dominant reason authors fear contributions: XML merges silently mis-merge (put nodes in wrong place, re-introduce deleted content). **JSON** (selectable in editor settings, convertible back and forth) merges much better because each characteristic is on its own line — 40k moved to JSON in 2026. `git bisect` / branch protection / auto-deploy actions recommended.
- **Points-source policy (40k):** printed MFM is authoritative, app/leaks are secondary/"lies until released", FOMO-box content is withheld until general release. Flammy repeatedly forked to push points faster than authors, causing friction — the standing compromise: authors own the data, NR devs don't edit it (also a legal-separation argument). 11th: Flammy built a script (and later AI) to auto-apply MFM points + faction packs; authors resisted AI touching files.

---

## 4. Bugs vs intended behavior (explicitly distinguished)

**Confirmed bugs (fixed in NR, not data):**
- min-1 group auto-selecting the first option for non-collective entries (2023-10-30) — Flammy: "this is not intended", fixed engine-side.
- Associations stripped on release (build-pipeline bug, 2024-03).
- Empty xml node parsed as a string → unit vanished from editor (2023-10-31).
- Association couldn't be put on a link / didn't set the display name (2024-01, 2024-05-14) — "that's a bug".
- Standard-bearer sub-option re-initialised twice using only the last value on units-of-3 (2025-02-12).
- Regimental-leader / set-primary-category infinite loop froze NR (2025-07 / 2026-04-28); the data was "relying on a bug", so the engine fix froze AoS until reworked — a case where a data pattern depended on buggy behavior.
- Backtick `` ` `` left in copied codex text → infinite loop searching for a code-block end, crashing the eye popup (2024-08-13) — fixed in NR so the *data* didn't need changing.
- Mobile missing `+`/model-add button (2025-10 / 2026-04-28) — genuinely broken on mobile at times, but *also* an intentional omission ("it's ugly") at others; authors had to distinguish per report.
- `autoUpdateData` DB setting stuck on for ~5,000 users with no UI, causing 30-90s loads (2025-03-23).

**Intended behavior often mistaken for bugs:**
- Constant options hidden in the unit editor (§1.5).
- Units cannot be removed by constraints ("if anything it being half-removed at all is a bug") — use nesting instead (2026-03-05).
- `instanceOf` not working with "and all child selections" — deliberate BS-compat mirror.
- "False" invalid-scope errors on links that only appear after **reloading** the file (valid when added via editor) (2025-12-05) — known cosmetic false error.
- Cost 0 when no costed items are selected by default (matches BS; old workaround: cost the unit then decrement).

**Data issues frequently misfiled as NR bugs (and vice-versa):**
- Stratagems (pulled from Wahapedia, later from faction packs) reported as data errors; missing keywords added only by a Detachment; app/Wahapedia inaccuracies (e.g. Ynnari keyword) reported against BSData. Authors repeatedly asked for a way to gate/label reports; Flammy reordered the report picker and put "New Recruit issue" last because "99% of reports are data issues" (2025-05-19).

---

## 5. Suggested doc topics (mapped)

**Tutorials [T]**
- "Model a unit correctly": unit → model SEs → weapon SEs → weapon profiles; when to use collective; naming (and the `[export-name:…]` comment). Covers §1.1, the #1 recurring theme.
- "Add a child force (regiment/allies/detachment) & guide the user to it": labels, `min 1 forces` error icon, hiding illegal child forces. §1.4.
- "Publish a system on NewRecruit end-to-end": repo layout, get it listed, releases vs pull-from-main, the check-for-update webhook + GitHub Action, offline download. §3.

**Concepts [C]**
- Scopes reference: self / parent / ancestor / root-entry / entry-type (unit/model/crew/mount) + "include self"; the instanceOf × "child selections" rule. §1.6.
- Constraints & modifiers: shared flag on link constraints, includeChildSelections, min0-vs-`-1` + negative flag, `exactly`, modifier ordering (sets before increments; no guaranteed order otherwise), cost/points modifiers, cumulative/triangular. §1.9, §1.6.
- Constant options & the "why is my model hidden" model. §1.5.
- Associations end-to-end (targets, conditions, `action="group"`, `traverseAssociationGroup`, Leaders in 11th). §1.3.
- NR-vs-BattleScribe differences: what BS ignores (associations, aliases, group costs, force hiding, markdown) and the `app:` comment flag. §2.

**Recipes [R]**
- Inline rule/keyword linking + aliases + escaping (code block / no-index). §1.7.
- Text formatting: smallcaps, bold/italics, tables, nested bullets, underline. §1.8.
- Custom export templates: nr-templates repo, `<profiles include/exclude>`, `<if field type=equals value>`, `<groupBy>/<by>`, first/last/index fields, CSS ordering/commas. (See §2 and 2025-05/2026-01 exchanges.)
- Points patterns: force cost, spam/stepped tax via `before`, 25%-cap, weapon-priced upgrades.
- characteristicType format rules & profile kinds/attributes for clean cross-system exports. §2.

**Troubleshooting [X]**
- "My model/leader/weapon is missing" (constant options; mobile stack-splitting; min1 not applied). §1.2, §1.5.
- "Huge/garbage git diff or bad merge" (line-endings git setting; JSON vs XML; branch hygiene). §3.
- "Editor won't load / file half-shows / can't save" (stray search char; illegal filename char; restart & re-pull; duplicate ids). §1.10.
- "Associations disappeared after release" (catpkg strip → pull-from-github). §4.
- Editor debug console cheatsheet ($debugOption, print_extra_constraints, select-nodes scripts). §2.
- "It works in the offline builder but not the website" (offline builder often lags web releases; recurring). Multiple dates.

**Process/community docs (out of scope for format, but referenced constantly)**
- A pinned "When is the update? / data-dev vs NR-dev / iOS(PWA) / Crusade / Leaders" FAQ (Ballot drafted one, 2024-12-14). Report-channel etiquette: report against printed GW sources, check GitHub/release date first.
