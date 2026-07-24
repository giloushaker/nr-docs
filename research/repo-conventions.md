# BSData / BattleScribe Authoring Conventions — Cross-Repo Research

Research date: 2026-07-21. Source: BSData GitHub repos + wikis (authenticated `gh`).
Goal: extract concrete, real modeling patterns data authors actually follow, to feed a "recipes" cookbook and best-practices docs.

Abbreviations used throughout (BSData standard, from AoS wiki):
`SE` Selection Entry · `SSE` Shared Selection Entry · `SGE` Selection (Entry) Group · `SSEG` Shared Selection Entry Group · `RSE` Root Selection Entry · `PC` Primary Category · GST game system file · CAT catalogue file.

---

## The canonical shared reference: BSData/catalogue-development wiki

Every repo README/CONTRIBUTING points here as the org-wide authoring reference:
<https://github.com/BSData/catalogue-development/wiki>

Key pages (extracted):

- **Catalogue-Guidelines** — the "Three Rules for Everyone":
  1. *Keep in line with other catalogues* for the same system (consistency over personal preference).
  2. *Enable any legal roster.* If a condition can't be implemented exactly, prefer leaving room for illegal builds over throwing errors on legal ones.
  3. *Simplicity* — use **default** entries in groups so adding a unit yields a legal roster with no forced choices; name Entry Groups so the user knows contents + count, e.g. `"Weapons - choose 2"`, `"Drones - up to 2 per member"`.
  <https://github.com/BSData/catalogue-development/wiki/Catalogue-Guidelines>

- **Data-structure-overview** — the definitive glossary of the data model (Catalogue, Category Entry, Cost Type, Force Entry, Profile/Profile Type, Rule, SE, SEG, links [Entry/Info/Category], Constraint, Modifier, Condition, Condition Group, Repeat, Collective, Shared?). Use this for exact field semantics (e.g. Constraint `Field`/`Scope`/`Shared?`/`And all child selections?`; Modifier types `Increment|Decrement|Set|Append`; Condition types `less/greater/equal/at least/at most/instance of`).
  <https://github.com/BSData/catalogue-development/wiki/Data-structure-overview>

- **Collective-Entries** (a.k.a. Help:-Collective-Entries) — what the `Collective` flag does: (1) if all of an entry's children are collective they collapse into one roster line, and the unit is chosen by spinner not "+Add"; (2) marking one option collective forces *all* siblings under a shared parent to hold the same count (e.g. "if one Ninja takes Climbing Claws, all do"). Warns of the footgun: collective on a whole unit will sync counts across every same-parent instance in the force.
  <https://github.com/BSData/catalogue-development/wiki/Collective-Entries>

- **Common-Catalogue-Patterns** — reference implementations for non-obvious problems. Documented: "Multiple Defaults in a Group" (Tau Commander default of 2 weapons: group has no default; `min 1` constraints auto-pick the entries, then modifiers relax the constraint).
  <https://github.com/BSData/catalogue-development/wiki/Common-Catalogue-Patterns>

- **Data-Author-Guide** — workflow + "Most Common Mistakes": don't commit compressed `.gstz/.catz` (save as `.gst/.cat`); don't commit `index.xml`/`index.bsi`; don't commit BattleScribe `backups/`; **never rename released files**; **always increment the file's internal `revision`** or the update won't reach users; mention issue # in commits (`closes #93`); release tag convention `vMAJOR.MINOR.PATCH` (major = new rulebook/edition, minor = more than bugfixes, patch = bugfixes).
  <https://github.com/BSData/catalogue-development/wiki/Data-Author-Guide>

---

## Per-repo findings

### BSData/wh40k-10e — Warhammer 40,000 10th Edition
- **CONTRIBUTING:** none at root. **Wiki:** disabled. Only README (bug-report boilerplate, links to bsdata.net homepage).
- **Structure convention visible from file layout:** faction split into a public catalogue plus a `... Library.cat` (e.g. `Aeldari - Aeldari Library.cat`, `Imperium - Astra Militarum - Library.cat`, `Imperium - Imperial Knights - Library.cat`). Library catalogues hold shared entries (weapons, abilities, common units) that the faction and its sub-factions link to — the org "shared entries + link" pattern applied at *file* granularity.
- No codified style docs; conventions are enforced by CODEOWNERS review and by matching existing files (per the org "keep in line" rule).

### BSData/horus-heresy-2nd-edition — Horus Heresy 2nd ed.
- **CONTRIBUTING.md:** yes, detailed. **Wiki:** yes (Home, Data-File-Tips-Tricks, Catalogue-Keepers, Horus-Heresy-Book-Abbreviations). **README:** has a "Standards" section.
  <https://github.com/BSData/horus-heresy-2nd-edition/blob/main/CONTRIBUTING.md> · <https://github.com/BSData/horus-heresy/wiki>
- Codified conventions:
  - **Unit = SSE of type `Unit` containing a `model`-type SE per model kind**; unit size via `min/max in parent` constraints on the model. Always make a model entry even for single-model units (accurate model count + consistency).
  - **Naming:** drop the "Legion" prefix from unit names unless there's a non-Legion equivalent (e.g. keep "Legion Baneblade").
  - **Points modeling:** do NOT put the full unit cost on the unit; put the *per-additional-model* / sergeant-delta cost and scale with per-model increments.
  - **Universal special rules = Info Links, not copied profiles.**
  - **Wargear:** gear all models must take → under the unit; per-model gear → under the model. Option lists = SGE / SGE-link. Prefer shared option lists tuned per-unit with `set pts` / `set hidden` modifiers gated on `ancestor instance of <model>`, grouping multiple conditions under `or` groups. "Terminators in the Legiones Astartes file" cited as the reference example.
  - **Hidden/RSE pattern:** units default hidden, a modifier sets Hidden=false when exactly 1 selection of the force is present (with "and all child selections" checked); upgrades default visible and are hidden when their "off" option is chosen.
  - **New-unit claiming** via a tracking issue (#2070) and a **Catalogue-Keepers** wiki table assigning each catalogue to an author (prevents commit collisions).
  - Data-File-Tips-Tricks: "any new entry should be under Shared Entries with a link created to it as an unshared entry" — versatility for future formations + easier updates.
  - Tooling note: `.cattemplate` files + `template_id_` comments are for **BSCopy** (<https://github.com/nstephenh/BSCopy>), used to replicate the 18 Legions from one implementation.
  - **Tests:** GitHub Actions loads `.test` rosters (exported `.ros` renamed) from `tests/` and asserts expected outcomes.

### BSData/warhammer-age-of-sigmar — Age of Sigmar 3.0
- **CONTRIBUTING:** none at root. **Wiki:** yes and it's the **most detailed implementation guide of any repo.** Pages: Implementation-Guidelines, Implementation:-QA-Checks, Creating-Rosters-with-multiple-Factions, Catalogue-Maintainers.
  <https://github.com/BSData/warhammer-age-of-sigmar/wiki/Implementation-Guidelines> · <https://github.com/BSData/warhammer-age-of-sigmar/wiki/Implementation:-QA-Checks>
- Codified conventions ("Rules of One"): **one entry per entity** — reuse via SSE + link (does not apply to profiles/rules). Concrete rules:
  - **Allegiance:** every catalogue MUST have an "Allegiance" SSE, min1/max1 in Force, wrapping an SGE (min1/max1) of every allegiance (incl. ones that only trigger Battlefield-Role switches).
  - **General:** every catalogue has a "General" SSE, max1, carrying the GST `General` category, linked onto units that need it (e.g. to switch another unit's role).
  - **Unit = SSE, type Unit, KEYWORD categories applied, no primary category, never hidden.** For Ally point limits to work, a *unit* SSE starts at minimum-size cost, decrements to 0 when the model-increment is present, then re-increments per model; a single-model unit just carries the model cost.
  - **Model-count increments MUST be Upgrade SEs at 0 pts** with min/max-in-parent.
  - **Weapons = SEs with a Weapon profile;** weapon *choice* = SGE min1/max1 of the weapon SEs; profile chars that reference an ability/damage-table = `*`.
  - **Optional models (Musician/Standard/Champion) = SSE with maxN-in-parent** + a "Unit Abilities" profile.
  - **Keywords = Categories in book order, ALL CAPS;** shared keywords (CREW, DAEMON, HERO, MONSTER, PRIEST, TOTEM, WAR MACHINE, WIZARD) live in the GST and are reused.
  - **Command Traits / Artefacts / Spells / Prayers** each have a documented container-SSEG pattern (max1), with per-allegiance sub-SSEGs hidden unless that allegiance + General/HERO conditions are met; artefact/trait SEs numbered by their dice roll, profile omits the number.
  - **Battlefield Role via RSEs:** most units 1 RSE; "battleline" and role-switching units get 2 RSEs (a switched-role one + an "Other"/ally one) toggled by Hidden modifiers keyed on `instance of Allies` — all such constraints have "and all child selections" checked.
  - **QA-Checks** page = a literal reviewer checklist (weapons as SEs? keywords on unit? traits hide when not General? only one Artefact per HERO? points/profiles filled?).

### BSData/age-of-sigmar-4th — Age of Sigmar 4th
- **CONTRIBUTING:** none at root. **Wiki:** enabled but **empty** (no pages authored yet) — authors inherit the 3.0 wiki + org wiki.
- **Structure convention from file layout:** each faction is split into `Faction.cat` + `Faction - Library.cat` (e.g. `Beasts of Chaos - Library.cat`), plus separate CATs per "Regiment of Renown"/battle-formation (e.g. `Blades of Khorne - The Baleful Lords.cat`) and `[LEGENDS]`-tagged legacy CATs. Library-file pattern matches wh40k-10e.
- Author signal: issue #13 "Path to Glory: Ascension - Implementation thread" (`enhancement`) — implementation decisions coordinated in a pinned thread.
  <https://github.com/BSData/age-of-sigmar-4th/issues/13>

### BSData/wh40k-killteam — Warhammer 40,000: Kill Team
- **CONTRIBUTING:** none at root. **Wiki:** yes — Structure-of-the-game-system, Catalogue-recommendations, Home.
  <https://github.com/BSData/wh40k-killteam/wiki/Structure-of-the-game-system> · <https://github.com/BSData/wh40k-killteam/wiki/Catalogue-recommendations>
- Codified conventions (model-centric, not unit-centric):
  - Four profile types only: `Ability`, `Model`, `Wargear`, `Weapon`. One cost type `pts`. `Max` deliberately omitted from Model profile — enforced by constraints instead.
  - **Every kind of model = its own SSE** (e.g. Pathfinder / Pathfinder Gunner / Pathfinder Shas'ui), none with a preselected PC; **root links carry the PC** (Leader / Specialist / Non-specialist) — the same model gets multiple root links, one per role, and role-specific links are hidden per game-mode category.
  - **Game-mode driven visibility:** `List: *` and `Style: *` categories (Campaign/Matched/Open) drive hide/show and constraint activation; the doc gives an explicit truth table of which categories each list configuration sets. **All such constraints must have "and all child selections" checked** (entries are nested under the List Configuration).
  - Wargear reused in ≥2 places must be extracted to a shared entry.
  - Force = single `Kill Team List` with one `List Configuration` entry that triggers most validation.

### BSData/The-9th-Age — Fantasy Battles: The 9th Age
- **CONTRIBUTING:** none at root. **Wiki:** yes — Conventions, How-To, Home. **README:** links to org Getting-Started wiki.
  <https://github.com/BSData/The-9th-Age/wiki/Conventions> · <https://github.com/BSData/The-9th-Age/wiki/How-To>
- Codified conventions:
  - **Never set a category on an option by default** (only for a deliberate reason, usually mounts). **Don't use "One Choice Only" / "May/Must Become"** group labels — use a meaningful label like "Weapon", "Wizard Level".
  - Models of a unit are typed `model` (not upgrade); per-model cost via the default repeat clause "by models in parent".
  - **Categories belong in the CAT when army-specific, in the GST only when truly shared** ("all categories in the GST is bad design").
  - **Forces defined in the CAT, not GST** (a GST force shows up for every army even when nonsensical).
  - **Category % limits:** prefer `max X% pts limit in Roster` over the old repeat-increment hack. Dynamic limits changed via modifiers on category-links/root-entries keyed on presence of a specific unit/General.
  - **Per-model equipment recipe:** model SEs typed `model`; option = an `upgrade` SE at 0 pts + increment-pts modifier + repeat "1 per 1 selection of model in parent" (copies cleanly, cleaner file than binding to the specific unit).
  - **Mount reuse recipe:** build mount as SSE (min1/max1 in parent, 0 pts, no category, all rules/profiles on it); each character gets a local "Mount" SGE (max1) with local per-mount SEs carrying the right cost/category, each linking the shared mount.
  - **Path of Magic / radio lists:** min1/max1 on an SGE; special "Essence of a Free Mind" edge case handled by a hidden min2/max2 duplicate.
  - **Forbid via `max 0` constraint rather than hiding** — keeps the entry visible so users understand why and can compare.
  - Author-facing issues confirm shared-entry discipline: #818 "Create Hand Weapon in BRB then reference in character entries", #794 "Reference the BRB entries of Army General and BSB then add min 1", #830 "Pull CG options out of shared selection entries to make them available as single entities", #817 disallow illegal mundane-weapon + enchantment combos, #1202 "Figure out how to do collective updates".

### BSData/whfb — Warhammer Fantasy
- **CONTRIBUTING:** none. **Wiki:** disabled (repo flag true but no wiki repo). **README:** org boilerplate → Getting-Started wiki.
- No repo-specific style docs; inherits org conventions. **Naming convention visible in filenames:** edition-tagged files `Army - <rulebook>BRB_<armybook>AB.cat` (e.g. `Dark Elves - 8thBRB_8thAB.cat`, `Empire - 8thBRB_7thAB.cat`) encoding which core rulebook + army book combo the catalogue targets — a real, if repo-local, versioning-by-filename convention.

### BSData/middle-earth — Middle-earth SBG
- **CONTRIBUTING.md:** yes, excellent and pattern-focused. **Wiki:** disabled → defers to org wiki. **README** links Contributing + Code of Conduct.
  <https://github.com/BSData/middle-earth/blob/master/CONTRIBUTING.md>
- Codified conventions:
  - **Prefer Shared Entries over repetition** — shared wargear/armour/weapons, hero wargear shared across a hero's variants (e.g. Andúril across both Aragorn entries), models shared across army lists. Shared Rules + Shared Profiles too, reusable in custom list entries.
  - **"Modifiers are your friends" — the include-shared-optional recipe:** shared wargear is stored with `max in parent = 1` and a Hero-Point cost; to include it as standard, add the Entry Link + a modifier setting cost to 0 + a `min in parent = 1` constraint so it auto-selects. To offer it as an optional purchase, link it and add a modifier fixing the point cost.
  - **`(Included)` shared entries:** armour/shields that adjust Defence use a normal entry that edits the stat-line when chosen; but where the bonus is already baked into the model's printed stat-line, use the `ArmourType (Included)` shared entry (0 pts, min-in-parent to auto-add, bonus rule not displayed to avoid double-counting confusion).
  - **"Don't forget the Leader":** every hero above Minor Hero gets a Leader entry-link so any can be army Leader; the option auto-hides in the roster editor when a higher-tier hero is present.

---

## Common conventions across repos (synthesis)

1. **Shared-entry + link is the universal law.** Define an entity once as a Shared Selection Entry (or Shared Profile/Rule) and reference it with an Entry Link / Info Link everywhere else. Stated explicitly by AoS ("Rules of One"), middle-earth ("Prefer Shared Entries over Repetition"), horus-heresy ("new entries under Shared Entries with a link"), kill-team ("wargear used in ≥2 places must be a shared entry"), and 9th-Age issues. Rationale everywhere: fix a bug once, fix it everywhere; and future formations can re-link existing units. Exception (AoS): profiles/rules need not be shared — no perf benefit and same-named abilities differ.

2. **Unit → Model → Wargear tree.** A unit is an SSE (type `Unit`) containing a `model`-type SE per distinct model kind, even for single-model units, so model counts and per-model scaling are accurate. Wargear all models take sits on the unit; per-model gear sits on the model.

3. **Points scale per model, not per unit.** Repeated across HH, AoS, 9th-Age: the top entry carries the base (min-size / delta) cost; adding bodies is a **0-pt Upgrade SE with an increment-pts modifier + repeat "1 per model in parent"**. AoS additionally decrements the unit to 0 and re-increments so Ally point caps compute correctly.

4. **Groups (SGE/SSEG) model "choose N of these".** min1/max1 = pick exactly one (weapon choice, wizard level, allegiance); maxN = optional extras; give the group a **default** so a freshly added unit is legal; name the group to state the choice and count ("Weapons - choose 2"). Multiple defaults achieved via child `min 1` constraints, not a group default.

5. **Categories = keywords/tags, in book order, CAPS; shared ones in the GST.** Categories drive conditional counting/limits and role logic. Army-specific categories stay in the CAT; only truly shared ones go in the GST (9th-Age, AoS, kill-team all agree). Don't set a category on an option by default (9th-Age).

6. **Conditional modifiers do the heavy lifting.** Hidden toggles, cost changes, stat-line swaps, and category/limit changes are all done with Modifiers gated on Conditions (`instance of <ancestor>`, `≥N selections in force/roster of <category/entry>`), grouped with `and/or` Condition Groups. The recurring gotcha, called out in AoS and kill-team: **check "and all child selections"** when the counted entries are nested.

7. **Prefer permissive over error-throwing** and **forbid with `max 0` rather than hiding** — keep illegal-but-visible over legal-but-blocked; keep forbidden entries visible so users understand and can compare (org guideline + 9th-Age).

8. **Forces/RSEs express army structure & battlefield roles.** Forces defined in the CAT (not GST) so they only appear for the right army; role-switching units get multiple Root Selection Entries toggled by Hidden modifiers.

9. **Repo hygiene:** never commit `.catz/.gstz`, `index.*`, or `backups/`; never rename a released file; always bump the internal `revision`; reference issue numbers in commits; semver-ish release tags. One-catalogue-per-maintainer "keepers" lists to avoid collisions (HH).

10. **File-level sharding as scale grows:** big systems split each faction into `Faction.cat` + `Faction - Library.cat` (wh40k-10e, AoS-4th), with `[LEGENDS]` and per-formation CATs — the shared-entry principle applied at file granularity.

---

## Concrete RECIPE candidates (grounded in what these repos actually do)

Each is directly attested above; citation in parentheses.

- **Model a unit whose size scales in points** — 0-pt model-increment Upgrade SE + increment-pts modifier + repeat "1 per model in parent". (9th-Age How-To; AoS; HH)
- **Model a unit that can swap its default weapon** — weapon-choice SGE min1/max1 with a default; weapon SEs each carry their own profile/abilities. (AoS Weapon Entries; catalogue-dev "Multiple Defaults")
- **Give a model multiple default weapons** — group with no default, child `min 1` constraints auto-select, modifiers relax the constraint (Tau Commander). (Common-Catalogue-Patterns)
- **Include standard wargear for free but offer it as a paid option elsewhere** — one shared max-1 wargear entry; auto-include via cost-0 + min-1 modifiers, or link + cost modifier as an option. (middle-earth "Modifiers are your friends")
- **"Included" stat bonus without double-counting** — `(Item) (Included)` shared entry, 0 pts, min-in-parent, bonus rule hidden. (middle-earth)
- **Reuse a mount/steed across many characters at different costs** — shared mount SSE (rules on it, 0 pts, no category) linked from each character's local "Mount" SGE with per-character cost/category. (9th-Age How-To)
- **Optional squad models (Champion/Musician/Standard/Sergeant)** — maxN-in-parent SSE + Unit Abilities profile; or a distinct model-kind SSE with its own root link/PC. (AoS; kill-team)
- **Sub-factions / allegiances / detachments** — an Allegiance SSE (min1/max1 in Force) wrapping an SGE of all sub-factions; sub-faction choice unlocks trait/artefact/spell container SSEGs via Hidden modifiers. (AoS Implementation-Guidelines)
- **"One of X per army/roster" limits** — Category on the SE + `max N selections in roster` constraint (with "and all child selections"); e.g. one Artefact per HERO, one General. (AoS; catalogue-dev)
- **Percentage-of-army category caps** — `max X% pts limit in Roster` constraint; dynamic version modified by presence of a specific unit/General. (9th-Age How-To)
- **Battlefield-role / battleline-if switching** — dual RSEs (switched-role + Other/Ally) toggled by Hidden modifiers on `instance of Allies`; or set-primary-category modifier gated on allegiance+General. (AoS)
- **Game-mode-conditional entries** — `Style:`/`List:` categories drive hide/show and constraint activation via modifiers with "and all child selections". (kill-team)
- **Collective wargear (all-or-none across a squad)** — mark the option Collective so selecting it on one model selects it on all. (Collective-Entries)
- **Collapse identically-equipped models into one roster line** — mark shared children Collective. (Collective-Entries)
- **Radio-button single choice with a rules exception** (e.g. two magic paths via one artefact) — min1/max1 SGE plus a hidden min2/max2 duplicate revealed by the exception. (9th-Age How-To)
- **Restrict a hero from being army Leader / auto-hide lower leaders** — add Leader entry-link to every eligible hero; option auto-hides when a higher-tier leader exists. (middle-earth)
- **Auto-select a force so a unit becomes visible** — units default Hidden; modifier sets Hidden=false when exactly 1 selection of the force is present. (HH README Standards)
- **Table/dice-roll abilities as profiles** — custom Profile Type named after the ability, one main row + N numbered effect rows (prefix single digits with 0 to keep 2D6 order). (AoS Unit Abilities)
- **Universal special rules** — model as Info Links to shared Rules, never copied profile text. (HH)

---

## Doc inventory (quick reference)

| Repo | CONTRIBUTING | Wiki | Style/impl docs | Best source |
|---|---|---|---|---|
| catalogue-development | — | ✔ (org-wide) | Catalogue-Guidelines, Data-structure-overview, Collective-Entries, Common-Catalogue-Patterns, Data-Author-Guide | **canonical reference** |
| wh40k-10e | — | ✖ | — (Library-file pattern only) | README + file layout |
| horus-heresy-2nd-edition | ✔ detailed | ✔ | README "Standards", Data-File-Tips-Tricks, Catalogue-Keepers | CONTRIBUTING + README |
| warhammer-age-of-sigmar | — | ✔ richest | Implementation-Guidelines, QA-Checks | **Implementation-Guidelines** |
| age-of-sigmar-4th | — | empty | — (inherits AoS 3.0 + org) | issue #13 thread |
| wh40k-killteam | — | ✔ | Structure-of-the-game-system, Catalogue-recommendations | both wiki pages |
| The-9th-Age | — | ✔ | Conventions, How-To | **How-To** (recipe-rich) |
| whfb | — | ✖ | — (edition-tagged filenames) | org wiki |
| middle-earth | ✔ pattern-focused | ✖ | — (defers to org) | CONTRIBUTING |
