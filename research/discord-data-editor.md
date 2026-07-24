# #data-editor Channel Mining — Signal for NewRecruit Data-Authoring Docs

Source: NewRecruit Discord `#data-editor`, ~5,924 messages, 2023-06 to 2026-07.
Read in full. Below: recurring confusions (ranked by recurrence), the answers/workarounds
developers and experienced authors actually gave, undocumented behaviors, bug-vs-intended
distinctions, and the publishing workflow. Doc-topic mapping at the end.

Cast note: `Giloushaker`/`Flammy`/`Ballot` = developers. `Dunamis55`, `Mad_Spy`, `Noah H
(nstephenh)`, `Kemp`, `Madi`, `Tidomann`, `Fital Shell`, `Kothra` = experienced data authors
who answer most questions.

---

## 1. Recurring confusions (ranked)

### #1 — "Is there a tutorial / how do I even start?" (the single most common message)
Dozens of near-identical first-posts across the whole span.
- `[2024-06-27] Xino: Is there some kind of tutorial/documentation for getting started with this`
- `[2024-10-21] DrNegative15: ...I don't know what I'm looking at. Everything seems very cluttered... The BSData wiki really doesn't help.`
- `[2025-05-18] Portalmaster18: ...is there, like, any documentation for someone who has never used this stuff?`

**Answers given (consistent):**
- There is **no official NR tutorial**. The wiki (`BSData/catalogue-development`) is "massively out of date" (Dunamis55).
- Canonical pointers repeated for two years: Noah's unfinished Google-doc guide, and **Scoots' community wiki tutorial** (`github.com/DerTanteKethe/custom40k-homebrew-system/wiki/NewRecruit-Data-Author-Tutorial`), pinned 2025-08-29. Even that is now flagged out-of-date (2026-01-08, 2026-03-21) because the editor UI changed (e.g. Profile-Type "Add" button became a right-click "characteristic").
- Universal advice: **"download a system you know and look at how it's done"** — `[2024-12-03] Madi: easiest way to learn imo is pull down a system you're familiar with and look through that`. Kemp's `NRDataExamples/SimpleForce` repo is a repeatedly-shared minimal example.

### #2 — Scope: self / parent / ancestor / root-entry / force / roster (+ "include child selections")
The most recurring *technical* confusion; appears in easily 40+ threads.
- `[2024-04-28] CanapéLit: ...the delimitation of "parents", "self" and others are not very clear for me yet`
- `[2026-01-16] Dunamis55: A lot of it has been trial and error... [nobody] documented the quirks`

**Answers / the actual rules (Giloushaker, 2024-10-03, authoritative):**
- **ancestor** = all parents; **only works with `instanceOf`**. (`ancestor with all child selections is basically roster`.)
- **parent** = the parent entry, **goes up and skips groups**.
- **root-entry** = top-level entry = "the units you can select in the builder".
- **self** on a profile/constraint = the entry it sits on, **not the profile itself** (repeated gotcha, e.g. Dracen 2024-09-12: "Self isn't the profile. It's the thing the profile is attached to.").
- **"and all child selections" (`includeChildSelections`) is the fix for ~half of "my condition/constraint isn't working"** — it makes the check recurse instead of only looking at the top level. Devs suggest it constantly.
- Analogy authors reuse (Dunamis55): "files and folders — parent is a level up at the folder level, self is the same level."
- Gotcha: a 2024-11 scope **bugfix broke lots of previously-working data** that used `parent` where it needed `ancestor` (Tidomann/Koetjeboe 2024-11-29). This is a behavior change, not an editor bug.

### #3 — "My unit doesn't show up in the builder"
Very common; several root causes, each with a stock answer.
- `[2024-08-31] Dunamis55: There's no Root Entry. So the builder can never find the unit`
- `[2024-10-04] Mad_Spy: Root entries appear in the Roster Builder if their Primary Category is linked into a Force Entry.`

**Checklist authors give:**
1. Needs a **root selection entry link** (not just the shared entry).
2. The root entry needs a **primary category** that is **linked into a Force Entry**.
3. Catalogue **incorrectly marked as a library** hides it (`[2024-07-22] Giloushaker: space marines is incorrectly marked as a library`).
4. A **force with no categories/units is filtered out entirely** (`[2026-03-20] Giloushaker: The force is filtered out because it has no categories... Likely because there are no units`).
5. Profile missing characteristics throws an exception and the option silently fails (Xino 2024-07-04).

### #4 — Collective flag / per-model loadouts / "x3" and extra +/- buttons
Extremely recurring, especially from newcomers building squads.
- `[2024-07-04] Flammy: if individual models can each have a different weapon combo you need to uncheck collective on at least one of the weapons... if all weapons are collective, all your models will be grouped together`
- `[2024-12-14] Mad_Spy: If the model has no options, then check "collective" on all the wargear.`

**Rules:**
- **Non-collective** on at least one option ⇒ models split into individually-configurable stacks (press the down-arrow to make a new stack).
- **All options collective** ⇒ models group into one line AND the redundant add/remove/new-stack buttons disappear (repeated fix, e.g. CorpseStarch 2026-06-27, Jelly 2024-12-18).
- `defaultAmount` with **comma-separated values** creates multiple default stacks (Giloushaker 2024-07-09).

### #5 — Editor stale state / phantom errors → "restart the editor"
One of the most frequent *bug-shaped* reports; almost always resolved by reopening.
- `[2024-08-26] Kemp: ...the link is left named "Unknown" and is flagged as having no target... the client correctly follows the link`
- `[2024-05-30] Dunamis55: Have you tried just closing and reopening the editor?`

**Known triggers & fixes:**
- Creating a link right after moving a rule/entry → "no target"/"Unknown"; **close & reopen** fixes it.
- **Root cause found for one class:** the **"Check for duplicate IDs across all catalogues" setting** produces bogus duplicate-ID and no-target errors across *other* catalogues while editing; turning it off stopped it (Kemp 2024-09-05).
- Modifier tree vs. options-panel mismatch, category links vanishing after Duplicate, ghost errors pointing at empty Root Selection Entries — all "reopen the editor."
- Builder doesn't refresh an already-open unit panel; **close and reopen the unit** (Flammy 2024-08-08).

### #6 — Shared vs Root entries, and the link workflow
- `[2024-07-01] Dunamis55: Whatever is in the Root Selection Entries will actually show up in the roster editor... Shared Selection Entries can be linked to without showing up`
- `[2026-04-08] Giloushaker: root selection entries should be links to entries instead of entries`

**Best-practice authors teach:** build the unit in **Shared**, then create a **root link** (right-click → make root link, or move root→shared auto-creates a link). Root links **inherit the shared entry's categories**; add faction keywords on the link. Note a subtle bug: moving shared→root just *moves* it; move root→shared creates the link (Madi 2023-10-28).

### #7 — Points/percentage limits (`pts` vs `pts limit`, % of current total vs game size)
- `[2024-06-10] Paheej: ...I want it to say I need 250 pts of Core; right now it will use the current army value instead of the limit`
- `[2024-06-10] Giloushaker: select pts limit instead of pts`

**Rules:** percentages default to the *current* points total; select **`limit::points` / "pts limit"** to base % on the game size the user set. Constraints that reference the game size only appear at **roster scope**. There are **no constraints directly on the roster** ("root constraints"), which is why authors put them on a force + modifier, or on a category. `[2025-01-22] Kemp: forces aren't processed at all unless added to the roster` — so you can't enforce a minimum force count from inside the force.

### #8 — Constraint recipes: "X per N", mutually-exclusive, dynamic min/max
Constantly asked ("1 special per 3 troops", "half your models", "2 at a time", "only one of these").
Stock answers:
- **"X per N": max 0 + increment via modifier with a repeat** ("for every N selections of ...") — the single most-repeated pattern in the channel.
- **Mutually exclusive / pick-one: put entries in a selection group with `max 1`** (or exactly-1). A "None" option appears automatically in a group.
- **`-1` disables a constraint** (`[2024-12-19] Giloushaker: set it to -1`; also used for "unlimited unless a limit exists").
- **`automatic` flag** on a constraint: enforces it AND lets NR **auto-set the actual selection** (not just the min/max) — a big UX win added 2025-02-21. Devs warn "don't put this on everything." Also the fix for "up/down buttons let me break a fixed-size unit" (Nord 2026-04-05).

### #9 — Modifiers: affects/scope, hidden default, ordering, missing operators
Advanced but recurring.
- `[2024-09-05] Giloushaker: scope travels up and affects travels down` (relative modifiers).
- **`includeChildSelections` must be checked on relative modifiers** even when there are no child SEs, or they silently stop working (Kemp 2025-09-29 — a format change broke old ones).
- **Default value must be `< 0` (e.g. `-1`) for a min-constraint to be ignored by modifiers / not auto-preselect** (`[2024-09-07] Giloushaker: its default value needs to be less than 0 for it to ignore modifiers`).
- **`multiply`, `floor`, `ceil`, `prepend`, `triangular`, `exponent`, `modulo`, `divide` modifier types exist but several are NOT in the editor dropdown** — you copy a modifier, edit the `type` field in a text editor / JSON, and paste back (Madi & Giloushaker, repeatedly). `floor`/`ceil` added 2025-02-27; `triangular`/`exponent` 2026-04-06.
- Modifier **application order = order found in XML** for a given type, and **type has an intended precedence**; link-target modifiers apply before link modifiers, and modifier-groups apply after direct modifiers (Giloushaker 2025-12-26). Reorder via "disable sorting" then move up/down.

### #10 — Publishing / GitHub / update workflow (see §5 for full detail)
Recurring: "how do I share this", "why isn't my change showing", "how do I get on the game list".

### #11 — Ordering entries / categories / profiles / forces
- **Builder's add-unit list is alphabetical only** (`[2024-10-22] Giloushaker: no its alphabetical only`). `Position`/`sortIndex` does not override it there.
- **Child order:** disable sorting or drag/drop in the "Childs Order" section on the **group** (not the entry).
- **Force categories:** no drag/drop — **cut and paste** in the order you want (Dunamis55, repeatedly).
- **Profiles of the same type:** reorder in tree with sorting off, then run the **"Fix profiles & characteristics" script**; characteristic order requires editing `characteristicTypes` order in XML then the script.
- **Forces:** use the `Position` field next to the name.
- BattleScribe orders everything alphabetically; NR added an `order`/`sortIndex` field BS ignores (Flammy 2024-07-04).

### #12 — Hidden ≠ disabled; hidden flag "not working"
- Hidden only affects the builder, and needs the right scope + `includeChildSelections` to un-hide (`[2024-08-10] Giloushaker: did you check includeChildSelections?`).
- **You cannot select a hidden entry** → "cannot be selected while hidden" error is a frequent trap when authors hide a min-1 option. Fix: invert hidden + set-hidden condition, use `defaultAmount`, or make the constraint `automatic` so it can auto-unselect.
- `[2024-12-14] xetolosch: hiding as it is is much more a disabling than actually hiding` — there is no "present but invisible" state for logic; use a **hidden category** or **hidden cost** instead to carry logic.

### #13 — Testing data locally (builder vs editor vs web)
- **Offline desktop builder (Electron) has hot-reload on save**; the online/app builder does not (`[2024-05-28] Flammy: it updates automatically when you save a file in the editor`).
- Online builder: **"Add from folder" shows folders, not files — select the folder** (classic confusion, The Wildchild 2024-05-12: "I thought I had to upload files not folders").
- Browser build has **no filesystem access**; the desktop (Electron) build does.

### #14 — Mac "App is damaged and can't be opened"
Recurring, unfixable (unsigned app). Answer: `xattr -c <path>` or `xattr -d com.apple.quarantine <path>` (Giloushaker, several times). "Having it work on Mac isn't much of a priority."

### #15 — Smaller repeat items
- **You can't put a cost or constraint on a rule/profile** — only on selection entries; wrap the rule in an SE (`[2025-09-09] Fital: Have it be a selection, with a rule in the selection`).
- **Markdown in text:** `*italic*`, `**bold**`, `^^smallcaps^^`, and tables. Small caps were added on request for AoS keywords (2025-02-04).
- **Single-letter rule names don't auto-link** — indexing requires ≥2 letters; use an `alias` (Giloushaker 2024-08-11).
- **`.catz` vs `.cat`:** the editor keeps whatever format you opened; unzip the catz and edit the `.cat` inside. No format toggle.
- **Half/decimal points** are supported (box turns red but saves).

---

## 2. Undocumented features / tricks a new author wouldn't find

- **`$debugOption`** — middle-click a node in the builder, open console (`Ctrl+Shift+I`), type `$debugOption` (or `$debugOption.state.print_modifiers()`) to inspect applied modifiers/conditions (Noah 2024-08-07, Giloushaker 2025-12-24).
- **`Ctrl+Shift+I` console** for all "silent failure" debugging; Application→Storage→"clear site data" to fix stuck web caches.
- **"Self is Header" childId** modifier (`set hidden true`, condition `self is Header` + `1+ in force/roster`) — **hides a configuration unit from the left panel once it's added** (2026-04-08).
- **`defaultAmount`** (NR-only): equivalent to "min 0 but pre-selected"; comma-separated for multiple default stacks; `< 0` to opt out of default selection.
- **`automatic` constraint flag** — auto-resolves the actual selection, not just min/max; also disables the stack +/- buttons on fixed-size units.
- **Leading spaces in cost names** control cost display order (builder strips them) — hack for otherwise-alphabetical cost ordering (Fantastic Mr. Fox 2026-04-16).
- **Hidden cost** + a `set-hidden false` modifier = a numeric "variable" you can compare (>0) — the standard workaround for arbitrary arithmetic/"transport capacity ≥ infantry", per-model carry limits, magic-resistance stacking, etc.
- **`alias` / `noIndex`** on profiles/rules to control auto-linking; **`annotation`** field renders `Name (Annotation)` and is separately modifiable.
- **`localConditionGroups`** — check multiple conditions on a *single* unit (e.g. "an INFANTRY HERO exists" vs. two separate units) — Madi 2025-05-28. Numeric **GREATER / condition-group operators** (add/minus/lessThan) compare two computed values (newer, thinly documented).
- **`always`/`instanceOf` shortcuts, `model-or-unit` scope** (stops at first model or unit), and `header` childId.
- **decrement/increment work on string stats** — `5+` → `4+`, and you can target a specific index (modify the `3` in `d6+3`) (Madi 2025-08-18).
- **Associations** — assign an "X per squad" wargear item to a chosen model (see 40k Thousand Sons / Chaos icons). Newer: **`action: group` / `splittingBehavior`** for leader attachment; associations can now filter targets via conditions and carry `associations`/`message` on constraints. Still very limited (no per-association modifiers/conditions, self appears in its own target list = bug).
- **Wound/dead-model tracker**: create a `W` characteristic and set entry type to **`model`**; a `characteristic kind = Wound` is being added so it needn't be named exactly `W`. Community wants generic "trackable in game mode" attributes (mana, ammo, hull, disorder).
- **Run-script feature** inside the editor with a `$store` file read/write API (docs live behind the Scripts → info page in-editor). Good for bulk edits, tagging, cost calc.
- **`attributeTypes`/`attributes`** = like characteristics but invisible to users, readable by exports.
- **Category `description`** renders as a hyperlink; **costs can be put on category entries** (only affect the category when linked in forces). **`readme`/`childForcesLabel`** text fields on forces.
- **Custom export templates** (`giloushaker/nr-templates`): press **Y** in the builder for the popup + editable template; HTML/CSS wrapped in template tags. This is how "pretty PDF" is customized (it is **not** system-specific in the code).
- **"Pretty" export hides configuration categories** — units in `uncategorized`, `configuration`, `game options`, `rites of war`, `allegiance`, `tournament options`, `allied detachment`, `scenery`, `malign sorcery`, etc. won't render as units (Giloushaker 2024-07-19).
- **Profile-type `kind`** field (model/unit/stats/vehicle/ship/weapon, or description/long-text) drives the 40k card-style export and 1-vs-2-column layout for other systems; `formatRules` regex and `defaultValue` on characteristic types.
- **Publication/page** on profiles shows as a hover tooltip on PC.

---

## 3. Bug vs. intended (things that trip people up)

- **Copy/pasted constraints & modifiers sharing an ID** — *intended* for modifiers (Giloushaker), but **duplicate constraint IDs break BattleScribe and rosters**. Long saga (Fital/Madi 2023); later NR unsets/regenerates on paste. Noah's 2025-08 audit found thousands of duplicate pasted link IDs; devs: "only a problem when it's a selectionEntry, but best avoided."
- **`exactly N` splits into `min N` + `max N` on save** — *intended* (BS compatibility), not a bug (2025-03-15).
- **min-1/max-1 "constant" selections hidden by default in the builder** — *intended* ("hide constants"); trips people who want them visible. Workaround: put something under it (shows as a title), or set every *other* option to max 0.
- **Space inserted by append/prepend** — *intended*; suppress via a "nospace" comment / "separate by" field (2024-09).
- **relative modifiers needing `includeChildSelections`, and self-scope oddities** — behavior/gotcha, repeatedly mistaken for a bug.
- **root-entry can't find a unit that has no primary category at all** — real bug (Giloushaker 2025-01-19).
- **The scope bugfix that broke old data** (§1 #2) — intended correction; old "working" data was relying on the bug.
- **`instanceOf` where scope is accidentally set to a catalogue** → hard editor crash / `Zn.isforce`/`isProfile`/`getTypeId is not a function` on load. Recurring self-inflicted corruption (chacolah, daichead) — fix by editing the offending condition in a text editor.
- **Checking "if keyword" on the thing that grants the keyword crashes NR** (Madi 2025-12-21) — must not be recursive.
- **"Add Force" button appearing on single-force systems** — a per-system toggle the dev sets manually; the auto-hide condition (single force type, min1/max1) drifted out of sync with the create-list screen.
- **Two files (`.cat` + `.catz`) for the same catalogue, or two systems sharing an ID**, confuses loading — keep one `.cat`.

---

## 4. Publishing / GitHub / hot-reload / releases-vs-commits (consolidated)

This is a whole workflow the docs should own; the same questions recur monthly.

- **To share at all:** put the files in a **public GitHub repo** (any org; **BSData membership is NOT required** — Mad_Spy 2024-09-02). Then in NR: **Add More Games → Add from GitHub**, entering `org/repo`. NR can also generate a share link: `newrecruit.eu/app/MySystems?addSystem=ORG%2FREPO&ref=HEAD`.
- **To get on the official in-app game list:** just **@ a developer with the repo URL**; they add it manually. Requirements: **must be in English** and **not confusable with an existing game** (Giloushaker 2025/26); **no homebrews of official systems** on the official list. The repo name should resemble the system name.
- **Releases vs commits:** if the repo **has GitHub releases, NR uses the latest release by default**; otherwise the latest commit. Add-from-GitHub lets the user pick "latest release" or "latest commit."
- **Tag-ordering bug:** GitHub's API doesn't return tags sorted by date, so a mis-named tag (e.g. missing the `v` prefix, or `1.3` after `v1.4`) makes NR download the wrong "latest" (Boff 2024-07-21, Used Quar 2026-06-19). Use consistent `vX.Y.Z` tags.
- **Update propagation, two different behaviors (important):**
  - **Official-list systems:** the **NR server re-scrapes GitHub ~hourly** (unless the repo reads from releases). There's an API to force it (see `hh3`'s `.github/workflows/nr-refresh.yml`).
  - **User "Add from GitHub" systems:** **NR only checks on initial load** — the user must **refresh NR (or fully close/reopen on mobile)**; the NR server just proxies to GitHub and is subject to rate limits (Giloushaker 2026-05-07). **New *catalogues* aren't picked up on refresh — the system must be re-added** (placeholder catalogues up front avoid this).
- **Auto-increment of catalogue revision:** if you add a publication named **`github`** with the repo, the editor auto-increments the revision **once per change vs. repo HEAD** (so work on a dev branch = one bump). Many authors turn it off and bump manually.
- **Legacy CI failures:** BSData repos ship `wham`-based `ci.yml` / `publish-catpkg.yml` GitHub Actions that now **fail on NR-only schema (prepend, etc.)** and email errors. **NR does not use them — delete those workflow files** (Dunamis55/Mad_Spy/Noah, repeatedly). NR has never used AppSpot/catpkg the way BattleScribe did.
- **JSON is now the preferred repo format** — `.cat/.gst` are converted to JSON internally anyway; JSON on GitHub gives far cleaner git diffs/merges. First real-world JSON repo user hit an early conversion bug that was fixed (Swampy Turtle 2026-03-26). Merge conflicts on JSON/XML branches are a known pain with no tooling beyond "careful planning."
- **Hot-reload for dev:** use the **desktop Electron builder** (saves in editor reflect immediately). Editor writes local files directly — no "download/export" step. Point the builder at your data folder via Options → Development, or "Add from folder."
- **The editor & builder auto-update is flaky** — distribution moved off GitHub to `newrecruit.eu/download/`; updates are often manual and the desktop builder lags the website. Only Flammy can push the Play Store app (review delay).

---

## 5. Suggested doc topics (mapped)

**Tutorial (getting-started, the #1 gap):**
- "Your first game system" end-to-end: profile types & characteristics → categories → shared entry → root link → primary category → force entry → it shows in the builder. Explicitly cover the "nothing shows up" checklist (§1 #3).
- "Edit an existing game for personal use": fork on GitHub, change system ID, add a **separate `.cat` that imports the vanilla catalogue** (community-agreed best practice for painless merges).
- "Test your data locally": desktop builder + hot reload; Add-from-folder selects the *folder*.

**Concepts (the mental model authors lack):**
- **Scope reference** (self/parent/ancestor/root-entry/force/roster) with the "files & folders" analogy, the `instanceOf`-only rule for ancestor, and when `includeChildSelections` is required — this is the highest-value single page.
- **Shared vs Root entries and links**; libraries; catalogue links + "import root entries"; three-tier gst/library/catalogue structure and why (Dunamis55's 2026-03-11 explanation is a ready-made draft).
- **Collective flag** and how models stack/split.
- **Costs/limits**: `pts` vs `pts limit`, percentages, why there are no roster-level constraints, hidden costs as pseudo-variables.
- **Modifiers**: scope-up/affects-down, `automatic`, `defaultAmount`, default `< 0`, the full operator list incl. the ones only reachable via XML.

**Recipes (cookbook — these exact questions repeat monthly):**
- "X per N models/points" (max 0 + increment + repeat).
- "Pick one of / up to K of" (selection group + max).
- "Two weapons at 30 then 25 each" (unit base cost + per-model cost).
- "First one cheaper" / duplicate-tax (triangular, or hidden count).
- "Unit A unlocks/requires Unit B" (category + modified constraint).
- "Detachment changes force-org limits" (hidden categories + modifiers on force-entry constraints).
- "Same weapon on every model in the unit" (automatic constraints).
- "Custom error messages" (`Add → Error` modifier / constraint `message` field, with `{current} {value} {total} {scope} {field}` placeholders — not exposed in editor UI yet).
- "Multiply / floor a stat or cost" (XML-edit the modifier type).
- "Reorder units/profiles/forces" (alphabetical limitation + Position/sortIndex + Fix-profiles script + cut-paste forces).
- "Custom export template / pretty PDF" (nr-templates, press Y).

**Troubleshooting:**
- "Restart the editor" catalog: phantom no-target/Unknown links, duplicate-ID errors, panel/tree mismatch, disappearing category links — and the **"Check duplicate IDs across catalogues" setting** as a root cause.
- "Cannot be selected while hidden" and how to un-set hidden selections (invert, `automatic`, `defaultAmount`).
- Editor won't load / infinite spin: recursive catalogue links, huge non-data files (PDFs) in the repo, a `<comment>` that is a bare number, an `instanceOf` whose scope is a catalogue.
- Mac "app is damaged": `xattr -c`.
- "My GitHub change isn't showing": refresh vs. re-add, releases-vs-commits, tag ordering, hourly scrape (official only).
- Legacy CI email failures: delete the BS workflow files.
