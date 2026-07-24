# Research: #new-data-developers (BSData Developers Discord)

Source: `#new-data-developers`, BSData Developers server (~11,000 msgs, Jun 2020 – Jul 2026).
This is the channel where **brand-new** data authors ask their first questions. It is the single
highest-value corpus for onboarding/beginner docs. Findings below are aggregated across the full
history and ranked by frequency.

> Note on tooling drift: from ~mid-2024 the community actively redirects newcomers off the
> abandoned **BattleScribe** editor onto the **New Recruit (NR) editor** (`github.com/giloushaker/nr-editor`).
> The *data model* (entries, links, categories, constraints, modifiers, scopes, forces) is unchanged,
> so nearly every confusion below still applies verbatim to NR. Where the app matters, it's called out.

---

## 1. Ranked beginner confusions (with representative quotes)

### #1 — "My unit doesn't appear in the Roster Editor" / shows as Uncategorised
The most common question in every year of the channel (40+ occurrences). Root cause is always one of:
no **Root Selection Entry (RSE)**, wrong/missing **Primary Category**, or the **Force Entry** lacks a
**category link** for that category. (The "Library" checkbox being ticked is a frequent secondary cause.)

- [2020-08-24] toasterfree: "when i assign them a primary [category] they disappear from my force"
- [2021-08-29] jodoon: "my entries... havnt appeared at all"
- [2022-10-18] Duncan Greystone: "all my models show up as uncategorized"
- [2024-10-07] chacolah: "When I put a selection entry into a category, it disappears from my roster editor"
- [2026-05-22] PRàL: "I have a couple unit created... they simply don't appear."

**Paired answer** (Mad Spy, repeated near-verbatim for years):
- "Root Entries are what appear in the Roster Editor. If whatever you've added doesn't have a link to the root, you won't see it." [2023-10-07]
- "Do you have links to the categories in your ForceEntry? The roster editor will only display categories it has access to in the Force." [2024-04-04]
- Practice: put the **Primary Category on the root link**, all other categories on the SSE; add a
  matching **categoryLink in the Force Entry**.

### #2 — "Is there a tutorial / where do I start?"
Asked 40+ times across all years. For most of the channel's life the honest answer was "there isn't one."

- [2020-08-09] Deleted User: "Is there a step-by-step guide to creating a new data file...?"
- [2021-08-03] Torben: "is there a 'step-by-step' guide that is current...?"
- [2022-10-18] Duncan Greystone: "jesus id love a user manual"
- [2024-06-27] Xino: "Is there any sort of documentation for getting started with the NR editor?" → Noah: "Not really."

**Paired answer** — the standard "how to learn" reply (Mad Spy, given ~30x):
- "There are no tutorials... We've all learned by getting stuck in, copying what already exists and playing around." [2022-04-10]
- The 5-step reverse-engineer recipe [2023-02-21]: "Learn Win+Shift+S [screenshot] · Open a catalogue file · Uncheck 'Show Imported Entries' · Find a unit · Copy and amend as needed."
- Community tutorials that eventually filled the gap: Noah's Google Doc guide (pinned 2025-07-14); Scoots' custom40k-homebrew wiki (2025-08-29, "most complete tutorial yet"); Kemp's "how to create a force" guide (2024-08-25).

### #3 — Modifiers/conditions "not firing" → the "and all child selections" checkbox
The most common *silent-failure* bug (~20+). A constraint/condition/modifier does nothing because
BS/NR only checks one level down from the query scope unless **"and all child selections"** (recursive)
is ticked.

- [2021-10-29] Karl: repeatedly missed the "and all child selections" checkbox.
- [2020-06-16] Mad Spy: "you need 'and child selections' checked."

**Paired answer**: "if 'includeChildren' is not checked, BS won't check that far down the hierarchy... Generally, it's best to _always_ check that option." (Mad Spy, [2022-08-11]/[2023-03-13]). `includeChildForces` "I'm not convinced it works properly, if at all."

### #4 — RSE vs SSE vs SSEG (what are the different Selection buckets?)
The core conceptual gap behind #1. New authors don't know why the editor has Root / Shared / Group
buckets, or why the same thing appears "duplicated."

- [2021-07-19] Leky: "Can someone explain what shared selection entries and entry groups are?"
- [2023-12-20] Bar0n_Chachatte: "why are there so many duplicates?"
- [2023-10-09] Carnage: "whats the difference between shared selection entries and root selection entries?"

**Paired answers** (the best mini-explanations):
- car_tag [2021-08-03]: "View SSEs as nouns — people, places, things. SSEGs would be collections of nouns."
- Mad Spy [2024-08-07]: "Anything that you use more than once could be a shared entry." + historical reason: "In BS it wasn't possible to make conditions reference Selection Entries directly in Root, so it was necessary to create an SSE and link it into the Root."
- TigerWraith [2024-08-07]: "create 1 SSE for bolt guns and then link... now you don't have to type Bolt Gun 50 times."
- "Linking is not sharing. Linking is making use of an already-existing entity." (Mad Spy, [2021-08-29]). **You cannot link to an RSE.**

### #5 — "My edits don't show up" → editing outside the data folder
Recurring (~10). BS/NR reads the **parent GST and imported catalogues from the installed data folder**,
not from wherever you opened your working file.

- Techno [2022-11-24]: "if you've opened a cat file in a folder that isn't your data folder, battlescribe will read parent catalogues from the data folder, regardless of the folder you opened the original one from"
- car_tag [2022-06-29]: "the game system pulls from the local installed repo, not the directory you're working from"

**Paired answer / best practice**: clone the repo directly into `BattleScribe/data/<gamesystem>`,
remove the official/released copy from Manage Data (or untick "load release version"), and work only
from the clone.

### #6 — Git / GitHub onboarding, and "how do I publish?"
Heavy across all years. Two distinct sub-problems: (a) git itself is intimidating; (b) pushing to a
repo does **not** publish — you must cut a **release**.

- [2021-08-10] Nakul: "I find github to be the most confusing website ever"
- [2024-04-12] Giefanarr: "never used git so I was scared... easier to keep everything on a google drive"
- [2023-11-08] skudfisher: pushed to repo but nothing appeared.

**Paired answers**:
- "Just pushing to the repo doesn't put it out for distribution" — you need a `/release` (chatops) or a GitHub Release. [2023-11-08]
- **GitHub Desktop** is recommended for novices repeatedly. CRLF/line-ending warnings: "You can ignore that message." [2024-06-08]
- **NR difference**: NR pulls the latest commit (HEAD) hourly, so with NR you often **don't need releases at all**. Appspot (BS) still needs a release and lags 12–24h; two releases within ~5 min can drop a repo from appspot.
- Noah's plain-English git primer [2025-09-26]: "you create a 'fork'... add your changes as a 'commit'... a 'pull request' copies your changes into the first repo."

### #7 — Force-org / category limits: "1 per X points", "1 in 4", ratios, "max 1 of each"
A repeated hard spot (~15). Beginners don't know the max-0 + repeating-increment idiom, or that
**points limits can only live on a Force**.

- [2021-03-05] Ragnarok494: upgrade "doubles the cost of each subsequent instance"
- [2022-06-10] lewis: "only 1 in 4 in the total force can be D or E. How do I build this rule?"
- [2024-11-29] skraaj: "1 selection per X number of points in the rooster?"

**Paired answer** — the canonical recipe (given ~10x):
- "Start with a max of 0 (constraint), then add a **repeating** modifier to increment by 1 for every N models/points." (Techno/Mad Spy)
- "If you add multiple repeats to a modifier they function as an OR." [2022-11-11]
- Percentages/points ratios: only via a **hidden cost/currency tracker** (see gotchas §5).
- "The scope of a Constraint is its Parent." Points restrictions can **only** be done in a Force entry. [2022-04-05]

### #8 — catz vs cat, duplicate IDs, "my file got deleted / moved to backup"
Recurring (~10). Two traps: (a) editing the zipped `.catz`/`.gstz` instead of the `.cat`/`.gst`;
(b) copying a catalogue without **regenerating its ID**, so BS treats it as the same file and may delete it.

- [2022-05-06] Techno: "All a catz is, is a zipped cat file" — open in editor, Save As `.cat`.
- [2022-06-21] Techno: "open the .cat and click the top line... there's a regenerate icon next to the cat id"

**Paired answer**: commit **unzipped** `.cat`/`.gst` to GitHub; the release workflow requires the
unzipped versions. After copy-pasting or duplicating a catalogue, regenerate the catalogue ID (and be
aware copy-paste inside the editor regenerates child IDs, but opening an existing file keeps them).
Changing the **GST id must be done in a text editor** and invalidates every existing roster.

### #9 — Conditions/filters pointing at a *link* instead of the real entry ID
Recurring silent failure (~8). A condition or filter aimed at an **entry-link id** or **SEG link** does
nothing; it must target the actual SE/SSEG id.

- Mad Spy [2022-11-14]: "Your 'filter by' is pointing to a link, not the entry itself... It needs to be the actual SSEG id, not a link id."
- Mad Spy [2023-01-14]: "You can't use links for any validation. They just resolve to the SE id."
- Also: conditions on SSEG children work-or-don't depending on BS version — "make sure you select the actual SSE in childId, not the link to it." (Amadeusz, [2020-07-23])

### #10 — Scope confusion: Self / Parent / Ancestor, and targeting model vs profile
Recurring (~10). Beginners attach constraints/modifiers to the wrong node (the profile ref, the SEG,
or "Self" meaning the entry itself).

- [2024-04-10] Giefanarr: "I was targeting the profile ref not the model itself."
- [2024-04-10] Mad Spy: "'Self' means the element you have set the constraint on."

**Paired answer** — the hierarchy vocabulary (Mad Spy, [2022-05-28], given repeatedly):
"Roster is the whole thing... Forces are the next level down (Detachments in 40k)... Parent is the
immediate parent... Ancestor is the highest level of Parent... A child is anything lower in the
hierarchy." Dr. Toboggan's mnemonic: **"selections check things, instances check categories."**

### #11 — Stat/profile modifiers look ugly (name-append) & can't be done cleanly
Recurring design frustration for skirmish/progression systems (~8). Every modifier that changes a
profile **appends the triggering selection's name** to the profile name in output, and there's no way
to hide it.

- [2020-07-23] fixmycode: "is there a way to avoid showing the modifiers that changed a profile in the profile name?"
- Answer: "no, it's not possible... one of the reasons games with volatile stats are not well-supported." (Mad Spy). Workarounds: switch whole profiles instead of modifying, or accept the ugliness.

### #12 — Import/hosting error: `Expected BEGIN_OBJECT but was STRING`
Recurring (~10) when people host `index.bsi` on Google Drive/Dropbox, or use "Add Data Source" with a
git URL. Drive/Dropbox serve an HTML page, not the raw file.

- Mad Spy [2022-08-15]: "you want **Import Data → Import data from URL/File**, *not* Add Data → Add Data Source." "you need to import a BSI file, not the .git."
- Fix: use **GitHub raw URLs** (`raw.githubusercontent.com/...`) or ship a self-contained `.bsr`. The old Data Indexer is obsolete — use the release workflow / Gallery.

---

## 2. Setup & tooling friction (consolidated)

- **Where is the Data Editor?** (~8) New users don't realise it installs alongside desktop BattleScribe and confuse **Roster Editor vs Data Editor**. On some downloads they "can only manage roster, not create data."
- **Which app?** Post-2024, redirect to the **NR editor** (`nr-editor`) + `nr-builder` for offline test-building. BattleScribe "was abandoned by its developer 4 years ago" (Mad Spy). The wiki lingered on BS Editor and was repeatedly flagged/updated.
- **Working folder discipline**: clone into `BattleScribe/data/<gamesystem>`; don't `import`; untick load-release-version; use GitHub Desktop. (See §1 #5.)
- **Publishing paths**: BSData org + `/release` chatops → Appspot (12–24h lag); **Gallery** picks up much faster (~15 min) and many didn't know it existed; **NR** pulls HEAD hourly (no release needed). Being in the BSData org is only required for Appspot — "more a historical artifact than a current requirement" (Kemp, [2024-07-28]).
- **Release mechanics gotchas**: `/release` must be a **comment** (not the issue description); title unversioned (BS appends version); must bump the tag or BS won't re-download; don't `/release` on the commit that deleted files. Workflow needs unzipped `.cat`/`.gst` and (for some repos) an access token added.
- **Mobile transfer** (recurring, all years): iOS effectively needs Dropbox (both desktop+phone linked, "include data" checked); Android = drop files into `Android/data/net.battlescribe.mobile.rostereditor/files/data/<gamesystem>`. Mobile does **not** delete repo files when you remove them from the list — delete manually.
- **Editor-install OS issues**: Windows 8.1 unsupported; Mac "damaged app" → `xattr -c`; catalogue-link operations bug out the editor (restart required).

---

## 3. Core-concept misunderstandings (feed the Concepts pages)

- **Categories are labels/metadata, not containers.** "Categories don't contain anything... you need to be checking the Force or Roster." (Mad Spy). They can't be nested; the sidebar is alphabetical. You check a **category with `Instance Of`**, and a **selection with `> 0 of`**.
- **Primary vs secondary categories.** Only the **Primary** decides which force-org slot a unit shows under. An entry has exactly one Primary; to appear in two slots you make **two root links with two Primaries** and remove the Primary from the underlying unit (or it double-counts). Kill Team: models can only be Leader/Operative as Primary to appear.
- **GST vs Library vs Catalogue.** "Stuff that must be in *every* catalogue (cost types, profile types, force orgs) → GST. Stuff used by >1 but not all → **Library** catalogues (a catalogue with the *library* flag, not user-selectable). Stuff used by 1 → standard catalogue." (Mad Spy). Libraries are imported via **Catalogue Links** and provide shared units/entries.
- **Links vs shared entries.** A link *reuses* an existing entry; it is not a copy. **You can't modify an imported (linked) entry** — put every variant in the library and trigger them from the catalogue. **You can't validate against a link** — conditions resolve to the underlying SE id.
- **Constraint scope changes meaning by context** (apple/orange, Mad Spy [2022-05-17]): a max on an **SE** limits copies of that entry; a max on an **SEG** limits total selections within the group; a **named-entry** constraint limits within that specific instance, while **Parent** scope limits across all copies. Nested groups give "4 total, max 2 each."
- **"Shared" checkbox** on a constraint/condition: checked = the value is summed across **all** instances of the entry in scope; unchecked = evaluated per entry-link instance. Reusing an SSEG? Uncheck Shared on its constraints or you can only ever have one in the whole unit.
- **Collective flag**: multiple identical entries **collapse into one "N × model" line**, and the builder shows a counter/slider instead of +/- buttons. **Every** selection entry on the model must be collective for it to collapse; options break collective. Unit-level collective (e.g. "every Commander needs a fusion blaster") behaves differently from model-level.
- **Hidden ≠ not loaded.** Every shared entry/group is duplicated in memory for **every** instance it's attached to, regardless of hidden state — the reason huge relic lists tank performance and why Space Marines was split into per-chapter catalogues. Use **constraints (max 0)** for legality, not hides, and keep things visible where possible.
- **`unit`/`model`/`upgrade` entry type is (almost) meaningless** — only changes the icon and is usable in conditions; it has no built-in behaviour.
- **Roster vs Force**: "A roster is the full list. A roster can contain multiple forces, like allies." (Noah). Nesting a Force inside a Force = cross-catalogue allies while keeping restrictions.

---

## 4. Undocumented features & gotchas (feed Troubleshooting/Recipes)

- **`-1` = null/unlimited/off.** Set max to -1 to disable a constraint; also required as a placeholder max so a modifier has something to modify ("you have to have an existing max to use any modifiers").
- **Default/auto-select loadout trick**: add **min 1**, then a modifier that sets min to **0** with no condition. BS evaluates constraints first (forces the pick), then modifiers (makes it removable). min-1 auto-adds only on **fresh roster creation**, not when a Force is added later.
- **`primary catalogue is Instance Of` conditions are performance poison** — each check loads a fresh catalogue instance; datasets with hundreds/thousands of them took 30s+ to load. Fix: put a **keyword/category** in the detachment and check `> 0 of that category` instead. (Flagged many times, worst gotcha in the corpus.)
- **Catalogue links bug out the editor** — add the link, save, close & reopen; "then never touch the catalogue link ever again via the editor." Recursive entry-group links hang/crash loading.
- **Movement `6"` can't be incremented** because it's non-numeric — strip the `"` from every profile (regex) to make it numeric, then re-append. Increment only works on purely numeric characteristics.
- **Sorting is alphabetical/insertion-order only.** Hacks: reorder `categoryLinks`/`forceEntry` in XML for the sidebar; reorder links for display order; **leading spaces** in a profile name control sort and get stripped in output; number/space prefixes. NR added right-click reorder + "No Sorting" for profiles (weapons must be Selection Entries).
- **Hidden categories / hidden costs / hidden forces don't fully work** — the checkboxes exist but hidden costs still show in output and hidden forces are a known BS bug; hidden categories "were asked for but will never be forthcoming." NR improves some of this.
- **You can't read a profile's stat values in conditions** — blocks e.g. "VP by Wounds." Workaround: a **hidden currency/cost used as a tracker** (Legions Imperialis transport capacity, Thrust, Cumbersome). This "hidden tracker" pattern recurs as the advanced-author answer to almost anything BS can't natively do.
- **You can't check for the presence of a rule** — "you need a category" (or a hidden cost) as a queryable proxy.
- **No auto-remove**: "There is no functionality to automatically remove selections" — the user must delete manually; you can only warn via constraint errors.
- **Prefer `set error` over `set hidden`** for conditional availability — "it's confusing for the user when options just disappear" (Mad Spy, [2026-07-06]). Errors on **groups** don't display — put them on the entry.
- **You can't rename a SEG in output** except via a set-name modifier that only affects the roster view, not the editor pane; **points on an SEG do nothing**; you **can't set name/points/hidden directly on a link** (use a modifier or set the shared entry).
- **Forking to a new game system** = change **all** catalogue, catalogue-link, and gamesystem IDs, and copy the new GST id into every `.cat`'s `gameSystemId` (find-and-replace). Undocumented; surprised even veterans.
- **NR conveniences**: setting the repo URL as a GST **publication named "GitHub"** makes NR auto-bump the catalogue revision to match master; NR fetches the **top GitHub tag**, but the API doesn't sort tags by date — odd tag names can outrank a newer version and hide the release. NR survives circular references (BS crashes); debug via NR console (Ctrl+Shift+I).
- **Never hand-author raw XML.** The Data Editor rewrites untouched lines (wrecking git diffs) but hand-editing new entries is a "crapshoot" — one missing `>` makes the whole cat unreadable and BS may silently delete an invalid file. Safe XML ops: find/replace, ID regeneration, block reordering.
- **BS/XML doesn't merge.** The format doesn't respect per-line commits, so parallel editing causes brutal conflicts — hence CODEOWNERS / "catalogue keeper" ownership and "take turns."

---

## 5. Suggested doc topics (mapped to structure)

### Tutorial (getting-started path — highest priority; the #2 request for 6 years)
1. **"Your first catalogue" end-to-end**: install NR editor → fork/clone into the data folder → open an existing catalogue → copy a unit → make it appear in the Roster Editor (RSE + Primary Category + Force categoryLink) → build-test in nr-builder → publish. This single path resolves confusions #1, #4, #5, #6 simultaneously.
2. **"Learn by reverse-engineering"** sidebar: the veteran-endorsed method — open a known game, uncheck "Show Imported Entries," copy & amend. Make it official instead of tribal.
3. **First game-system-from-scratch**: GST (cost types, profile types, one Force Entry) → first catalogue → first Force → publish.

### Concepts (feed from §3)
- Entry types & the tree: **Root vs Shared vs Group**, why links exist, "linking ≠ copying." (#4)
- **Categories are labels, not containers**; Primary vs secondary; how categories drive force-org display. (#1)
- **GST / Library / Catalogue** split and Catalogue Links.
- **Scope** page: Self / Parent / Ancestor / Force / Roster, the mnemonic, and the "and all child selections" recursion flag. (#3, #10)
- **Constraints**: context-dependent meaning (SE vs SEG vs named vs Parent), nested groups, the "Shared" checkbox. (#7)
- **Modifiers**: increment/set/decrement (no multiply), repeaters-as-OR, why they append names to profiles. (#11)
- **Collective**, and **Hidden ≠ not loaded** (with the performance story).

### Recipes / how-to (the repeated "how do I…")
- Default/auto-selected loadout (min-1-then-modify-to-0).
- "1 per X points" / "1 in N" / ratio & percentage limits (max-0 + repeating increment; hidden-currency tracker).
- Conditional availability ("show B only if A") — prefer `set error` / max-0 over hide.
- Per-model scaling weapon cost (collective + increment, in the library file).
- "4 total, max 2 each" via nested groups; radio-button vs checkbox (max 1 on both group and entry).
- Cross-faction allies via nested Force Entries.
- Hidden-currency/tracker pattern for anything the model can't natively express.

### Troubleshooting (map each to a symptom)
- "My unit doesn't appear / shows Uncategorised" → RSE / Primary / Force categoryLink / Library flag checklist. (#1)
- "My edits don't show" → working folder vs data folder. (#5)
- "My constraint/modifier does nothing" → "and all child selections" unchecked; condition points at a link not an entry. (#3, #9)
- `Expected BEGIN_OBJECT but was STRING` → import a BSI/raw URL, not a git/Drive/Dropbox URL. (#12)
- "File got deleted / moved to backup" → duplicate IDs; regenerate catalogue ID; catz vs cat. (#8)
- "Pushed to GitHub but nothing appears" → you must cut a release (or use NR's HEAD pull). (#6)
- Slow catalogue load → remove `primary catalogue is Instance Of` conditions.
- Editor crashes/hangs → catalogue-link handling; recursive group links; circular references.

### Reference
- **Publishing matrix**: Appspot vs Gallery vs NR (what each needs, lag, release syntax, BSData-org requirement).
- **Mobile install** (iOS Dropbox / Android data folder).
- **`-1` semantics**, entry-type-is-cosmetic, GST-id-change invalidates rosters, safe-vs-unsafe raw-XML ops.

---

## Notes on evidence
Findings synthesised from four full passes over the export (lines 1–11027). Primary answerers across
the whole history: **Mad Spy** (the overwhelming majority), with Dr. Toboggan, Techno, car_tag,
GenWilhelm, Acebaur, Windstorm, Amadeusz (hosting/workflow), and later **Noah stephenh**, **Kemp**,
**Dunamis55**, **TigerWraith**, and **Giloushaker** (NR dev, undocumented editor behaviour).
