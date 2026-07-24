# Discord mining — BSData #40k-development (data-author documentation research)

Source: filtered/condensed export of BSData Developers `#40k-development` (2019-03 → 2026-07),
~2600 lines, keyword-filtered to authoring/format/editor content. Read in full.
Date: 2026-07-22.

This channel is 40k catalogue maintainers (Windstorm, Mad Spy, Dr. Toboggan, Acebaur, Dunamis55,
Amadeusz/Amis, Thairne, Techno, Fital Shell, FarseerV, Jon K "Alphalas") plus the BattleScribe dev
(Jonskichov) and, from mid-2023 on, the New Recruit devs (Flammy, Giloushaker). It skews to specific
40k bugs; below is only what generalizes. Because the export is choppy and one-line-per-message,
anything I couldn't fully pin down is flagged **[uncertain]**.

**Key context for our docs:** from ~June 2023 the whole 40k team migrated off the BattleScribe data
editor onto the **New Recruit editor**, and much of the richest material is NR adding features the BS
format never had (upstream-aware shared entries, `type:` scopes, profile-hunting/relative modifiers,
`exactly` constraint, `Set Error` modifier, associations, `Move To`). Those are marked **[NR-specific]**
— they are prime concept/recipe material precisely because they are undocumented and NR-only. Behaviours
common to the BS format are marked **[BS format]**.

---

## 1. Modeling techniques & patterns (→ concept + recipe pages)

### 1.1 Shared profiles vs local profiles — the central recurring debate
The most-argued modeling decision in the whole channel. Two camps, both worth documenting as a tradeoff.
- Share when reused, keep local when single-use: *"generally in a shared profile, but if it's the only
  instance of that profile I put it inside the unit to save linecount"* (Windstorm, 2019-08-27). Rationale
  for sharing: *"if a bolter suddenly becomes ap -1 you have a LOT of entries to check. As a shared profile
  - one and done"* (Thairne, 2019-08-27); *"a single place to find and update profiles ... easy to re-use"*
  (Amadeusz, 2021-01-14).
- Counter-camp (don't over-share): *"Don't share profiles unless you really need to ... 196 shared profiles
  -> 9 after removing all the orphans from the migration and all the single use ones"* (Mad Spy, 2021-01-14);
  *"if a profile is only used by one unit, why does it need to be shared?"*. Migrations leave orphaned shared
  profiles.
- The killer objection when GW changes one unit's copy of a weapon: *"when GW change the profile on a single
  unit rather than the entire weapon, you've got to create a new profile anyway"* (Mad Spy, 2023-06-12);
  FarseerV, 2023-06-15: shared same-name-different-stats profiles are *"uncomfortable"* for exactly this reason.
- **Doc takeaway:** a concept page "Shared vs local profiles/entries" with the maintenance-vs-duplication
  tradeoff, plus the hard rule below (1.2).

### 1.2 Same-name profiles collide in output — a hard constraint on naming
*"profiles of the same name (even different GUIDs) will overwrite"* (Dr. Toboggan, 2020-11-05); *"BS has
always collapsed profiles with the same name into a single entry when outputting a summary"* (Mad Spy,
2020-09-22). So if you give one unit a modified copy of a shared weapon you MUST rename it. Common fixes:
append the unit name to the profile — *"Weapon Name [Unit Name]"* stored in shared profiles used as a
sorting bucket (Dr. Toboggan, 2023-06-12), or a rename modifier on the Sgt copy (Dunamis55, 2025-03-07).
This is a **[BS format]** display rule that generalizes to every game; belongs in a "Profiles" concept page
and a troubleshooting entry ("two profiles merged into one on the roster/summary").

### 1.3 "Keep everything a shared entry"
*"that's why I keep everything I can a shared entry"* / *"Always shared entries"* (Dr. Toboggan). Historic
reason: *"validation could only run on SSEs"* (Mad Spy, 2021-01-14) — units had to be shared entries to be
targetable by constraints. Scope has since improved so this is less forced, but shared entries remain the
recommended building block for anything you need to reference or bulk-fix.

### 1.4 Rules vs Profiles vs abilities — where a rule "lives"
No single policy, but consistent heuristics worth surfacing:
- *"Generally if it's on the datasheet I go profile"* (Jon, 2022-12-27). Profiles render per-unit like
  weapons; rules render in the Rules block.
- Ability profiles are usually attached directly to the model/unit rather than having their own SE
  (GenWilhelm, 2021-03-05).
- Army-level rules → Rules section; unit-level rules → Abilities section (Dunamis55, 2023-06-13, offered as
  a convention).
- Weapon USRs / special rules: put the rule text in the weapon profile's abilities box, not as a separate
  ability profile (Dr. Toboggan, Mad Spy, repeatedly 2020-07). *"no, just literally in the 'abilities' box
  on the weapon profile ... not an ability profile"* (Mad Spy, 2020-07-22).

### 1.5 Custom profile types for degrading/oddball statlines
Define your own ProfileType instead of reusing a generic one for degrading stats, invuln, "damaged"
brackets, etc. *"i defined my own profile types for the old stat degradation, rather than using the gst one"*
(GenWilhelm, 2022-04-22); *"I made a new ProfileType for Fell Bonds"* (Mad Spy, 2022-05-20). Note the
edition shift: an old **"wound tracker" profile type** that let stats degrade was abandoned in favor of just
defining the profile 2-3 times to match the printed codex blocks (Techno, 2022-04-22). Good concept material
on ProfileTypes and why authors sometimes hand-roll them.

### 1.6 "Min 0, modify to Min 1" — make something required but keep a "None"
*"Min 0 with modifier to Min 1 makes it a requirement but keeps the 'None' option present"* (Dr. Toboggan,
2020-07-30). Same shape used for named characters: hidden by default, then `min 1` when they become Warlord
(Mad Spy, 2021-02-15). This is a clean, generalizable recipe.

### 1.7 Radio-button vs checkbox behavior is driven by constraints
A SEG with min/max 1 renders as radio buttons; otherwise checkboxes. Order matters: *"You'll probably need
to do it the other way around (set max 2 and mod back to max 1) or BS won't show checkboxes instead of radios"*
(Mad Spy, 2022-05-24). Windstorm later proposed codifying it: *"any entrygroup with a min/max of 1 in parent
SHALL always be read as a radio control"* (2023-06-17). Worth a note in the SEG concept page + a troubleshooting
entry ("my options show as radio buttons / checkboxes unexpectedly").

### 1.8 "X per Y" quantities → use a repeat, not an if
*"it should be a repeat, not an if ... Repeat for each Force instance of <thing>"* (Windstorm, 2021-10-29).
Caveat: *"If the PL/model isn't constant, repeat won't help you"* (Amadeusz, 2020-10-09). Pattern for "1
free apothecary per company vets unit": `max 0`, then increment on a repeat over the depended-on entry
(Mad Spy, 2020-10-03). A repeat can also start from a base and add per instance (base PL 3, +1 per infil).

### 1.9 Category-swap instead of show/hide for dual-role units
For a unit that can be Troops or Fast Attack, change its primary category rather than maintaining two
hidden links: *"we do a change primary category instead of doing a show/hide of different links"* (car_tag,
2020-06-07). Requires modifier-set categories (see 3 and the gotcha in 4.3).

### 1.10 No-slot / "counts as N slots" units via category + per-child modifier
NFO ("No Force Org") handling: instead of one overloaded category, give the unit an HQ primary + an `NFO`
category, then *"the HQ category entry has a modifier that increases max in force 1 per 1 child with NFO"*
(Amadeusz, 2020-02-04). General pattern for "this selection unlocks an extra slot elsewhere."

### 1.11 Libraries (import-only catalogues)
Heavily used architecture: a catalogue flagged as a **library** (checkbox) can't be picked to start a roster,
only imported into other catalogues (*"Libraries are just catalogs that can be imported into other catalogs"*,
Windstorm, 2019-08-26; *"Libraries can't be selected to be a primary cat"*, Fital, 2022-12-01). Two import
knobs on the catalogue link: **Import root entries** (pull in the roots or not) and per-SE **Import** flag.
Recommended recipe for shared units used across many armies: keep the unit as a shared entry in the library,
uncheck "Import root entries," and create a local Root link (RSE) in each consumer catalogue so you can add
local modifiers/categories (Mad Spy on Inquisitors, 2019-12-18; Amadeusz: *"you can just uncheck 'Import root
entries' on the catalogue link itself"*). This is the core "code reuse" story and deserves a dedicated concept
page (Libraries) + recipe ("share a unit across catalogues").

### 1.12 Points on links vs modifiers, and the "0-point base + link cost" idea
*"Points on links < explicit modifiers"* / *"modifiers get evaluated last"* (Mad Spy, 2021-01-12). Practical
consequences: a link's cost is overridden by any explicit `set cost` modifier; use in-link default costs, not
explicit modifiers, when you just want a default (Mad Spy, 2020-10-08). Proposed convention: enter every weapon
profile at 0 pts and add the cost on each reference link (FarseerV, 2021-03-30). Good "how costs resolve"
concept material.

### 1.13 Separate catalogue vs conditionals-in-a-library — an architecture tradeoff
Recurring judgment call: split a sub-faction into its own catalogue, or keep it in a shared library gated by
conditionals. Windstorm repeatedly found a **separate catalogue simpler** than cross-library conditionals
(Ynnari, 2023-06-16: *"the logic using a catalog is just massively easier than having to reference a specific
selector"*). The library route avoids duplicating roots but forces "hide if primary catalogue" logic
everywhere. Also note the recurring pain: **a library can't 'see' selections made in a catalogue that imports
it**, so restrictions that must trigger off a consumer-catalogue choice can't live in the library
(FarseerV, 2021-04-04, 2023-02-03). Worth a concept page on "where does logic have to live" (import direction
is one-way, downstream can't be read upstream — except see NR upstream-aware entries, 3.1).

---

## 2. "Hidden by default is brittle" — a design principle worth stating

Strong, repeated team norm against hiding things by default:
- *"Nothing should be hidden by default unless there's no other way ... Failsafe for conditionals failing.
  Users can still utilize the data ... hidden by default, they can't use the data"* (Dr. Toboggan, 2020-05-07).
- *"hidden by default is not something we like doing since it is more brittle, if something breaks, then
  they'll stay hidden"* (Windstorm, 2023-06-30).
- Codified in guidelines: *"Root selection entries SHOULD NOT be hidden by default"* (#17, cited 2022-02-12).
- Discoverability counter-pressure: *"I'm generally trying to not hide things. It's bad for discoverability"*
  (Amadeusz, 2020-07-29). But note an opposing user-expectation datapoint: some users complain when invalid
  options ARE hidden (Kal, 2023-03-25). Net: prefer validation errors over hiding; if you hide, hide the
  narrow invalid thing, not roots.

This is a genuine authoring principle (fail visible, not silent) and should be a short concept/best-practice page.

---

## 3. Undocumented / notable features & behaviors

### 3.1 [NR-specific] Upstream-aware shared entries — constraints/modifiers that "see up the tree"
Biggest NR capability jump. A shared entry now "knows" where it is linked, so one shared entry can carry
constraints/modifiers that vary by the unit it's linked into: *"NR just introduced functionality to allow
constraints and modifier conditions to see 'up the tree' on shared entries ... The shared chainfist 'knows'
that it's linked into the Termies"* (Mad Spy, 2024-05-14). Enables putting a `max 1 in unit` on the shared
entry itself instead of on every link (*"All the limits can go on shared entries now, not the links, because
NR knows what things link to"*, 2024-10-20). This directly reverses the old BS limitation (4.1). Prime concept
material.

### 3.2 [NR-specific] `type:` query scopes (traverse up to an ancestor of a given type)
Giloushaker's canonical definition (2024-08-30), quote near-verbatim — this belongs verbatim in the scopes
concept page:
> `type: model` travels up to the first entry that has type model; `type: unit` → first `unit`; `type: upgrade`
> → first `upgrade`; `type: model or unit` → first of either; `root entry` → the top-level (root) entries.
This makes generic conditions/constraints on a shared entry resolve against "the unit it ends up in" without
per-unit wiring (Mad Spy, 2024-05-15: *"it will traverse up until it finds the 'unit', and then check in that
scope"*). Ties to the guideline that entry **Type** (model/unit/upgrade) must be set correctly (1.x, and the
guideline quoted 2020-10-12: model = a physical model, unit = contains ≥1 model, upgrade = everything else).

### 3.3 [NR-specific] Profile-hunting / relative modifiers
A single modifier on an entry that walks the hierarchy, finds the right profile type, and modifies a
characteristic — replacing hundreds of per-profile modifiers: *"NewRecruit now allows modifiers to be set on
an entry, so that the entry directly modifies profiles ... rather than needing hundreds of modifiers ... you
just have a dozen ones in the gst"* (Dunamis55, 2025-02-22). Underlying mechanic is `scope` + `affects`
fields on the modifier (Giloushaker, 2024-08-30: e.g. *"increment Weapon.AP 1 in parent"*). This is the
enabler that let them do Crusade/battle-honours stat buffs cleanly. Concept + recipe candidate.

### 3.4 [NR-specific] `exactly` constraint (min and max at once)
Requested by Amadeusz (2023-06-15), added by NR. Note interop trap: *"exactly constraints ... wouldn't have
worked properly in BS anyway"* (Mad Spy, 2023-09-11) — NR converts them to min/max on load.

### 3.5 [NR-specific] `Set Error` modifier — custom validation messages
Emit a friendly custom error via a condition instead of silently clamping. Used to replace unit-size
`set max` juggling: *"set the max to the 10 model limit, then set an error if there are more of the model than
the 5 model limit"* (Mad Spy, 2024-12-29); *"a 'You can't have an Ethereal and Farsight in the same army'
message rather than just a Set Max to 0"* (2025-01-18). Directly addresses the perennial "I can't add X models
to my max-size unit" user confusion. Strong recipe/troubleshooting material.

### 3.6 [NR-specific] Automatic constraints & associations
- **Automatic constraints:** *"constraints that will be automatically applied when their state changes"* for
  unit-wide weapon selections applied to a squad-leader model (Mad Spy, 2025-02-22).
- **Associations:** tag a unit-level wargear SE as assignable to a specific model in the unit, keeping the
  selection at unit level (Mad Spy, 2024-02-06 on). Flammy's case taxonomy (2024-07-14) is excellent recipe
  scaffolding: Case 1 all-models (nothing to do), Case 2 one-model icon (simple association), Case 3 mixed
  (e.g. Intercessor grenade launchers — association can't split between sgt and body, needs restructure).
  Leader/attachment modeling uses associations + hidden categories (Mad Spy, 2026-01-16, 2026-06-23:
  *"max 1 associations in self of Leader/Support"*). Note limitation: *"You just can't look for 'associated
  unit' in a condition to trigger a modifier"* (2026-01-16) — but a modifier can `affect` the associated unit
  (Gilou, 2026-06-15). Associations are a genuinely NR concept with no BS equivalent — needs its own page.

### 3.7 [NR-specific] `Move To`, string-number increment, default-selection modifier
- **`Move To`** in NR editor moves an entry to shared/root/library/gst, maintains all links, and leaves a
  link behind where it was (Dunamis55, 2026-03-11) — the safe refactor primitive. Great recipe: "promote a
  local entry to shared/library."
- **Increment/decrement on numeric substrings** of text (NR/BlueScribe): `"4+ Invuln"` with `decrement 1`
  → `"3+"` (BlueWinds, 2023-06-29). Enables editing embedded numbers in ability text.
- **`defaultSelectionEntryId` modifier** — set/change a SEG's default via modifier; a feature requested since
  ~2015 that BS never shipped (Thairne, 2020-01-23 / 2021-02-12) and NR added (Gilou, 2023-06-24). Windstorm
  proposed standardizing it: *"entry group links SHALL ALLOW modifiers to override the default selection"*
  (2023-06-20).

### 3.8 [BS format] Older features that surprised authors
- **Modifiers can set/unset categories, including primary** (added 2019-08). Before this, category swaps
  weren't possible — a lot of legacy structure ("primary on Root, other categories on SE") exists only because
  of that history (Dr. Toboggan, 2020-07-18).
- **Hidden costs** (2020-06-07) — a cost that isn't shown; now used for enhancement/detachment CP.
- **"In child selections too"** on constraints (2019-04-03).
- **`Self` query scope** for profile modifiers gave a big win on Blood Bowl profile mods (Jonskichov relaying
  Dr. Toboggan, 2020-05-31).
- **Open-topped transport modifiers affect embarked models** (2022-07-04).
- **Collective flag** collapses identical selections into one line (referenced 2020-11-01, 2021-02-06).

---

## 4. Recurring format/editor gotchas that generalize (→ troubleshooting)

### 4.1 Conditions/constraints targeting a LINK instead of the underlying entry silently fail
The single most recurring bug across the whole log. A condition whose target is an EntryLink (an RSE/SEG link)
rather than the real shared entry does not trigger.
- *"conditions treat the use of links ... they don't work any more ... points to a link, rather than the actual
  SSE. This prevents the condition from triggering"* (Mad Spy, 2019-10-31); specifically hit `InstanceOf` /
  `NotInstanceOf` and `PrimaryCatalogue` conditions.
- *"BS just doesn't like triggering conditions that rely on linked entries"* (Jon, 2019-12-24); *"conditions on
  links sometimes are fuckywucky ... use it on the se itself and not the seg"* (Thairne, 2021-10-07); *"using
  links in the conditional on every unit, but only failed to work on the Disco Lord"* (Mad Spy, 2022-01-18).
- Fix: point the condition at the actual entry, not the link. **Doc it prominently** — this is version-fragile
  and easy to hit in any game.

### 4.2 `Instance of Primary Catalogue` reloads the entire target catalogue (perf trap)
A landmark finding (2021-04-27 thread, confirmed by profiler dumps). Every evaluation of an
`instance of primary catalogue` condition **loads the whole referenced catalogue again**: *"EVERY use of
'instance of primary catalog' loads the entire catalog file again"* (Windstorm, 2023-06-01); *"So I guess each
primary catalogue check is loading the catalogue"* (Techno). At Space Marine scale (hundreds of such checks)
this ballooned load time/RAM. Workaround adopted team-wide: **replace primary-catalogue checks with a keyword/
category tag** placed on the RSE per catalogue, then test `if <keyword> in force/roster` (Windstorm's PC:XX
scheme, 2021-04-27; Techno, 2027-07-27: *"set hidden to false if greater than 0 of <keyword> in roster"*).
Generalizable lesson: prefer category/keyword checks over cross-catalogue identity checks. (Root cause per
Techno 2021-07-24: *"parent-catalogue returns an entire force entry instance with every link"* whereas other
queries return just links.) **[uncertain]** whether this specific perf bug exists in NR's engine — the team
kept avoiding it regardless.

### 4.3 Categories added by a modifier are invisible to conditions
*"the category is added by a modifier, which conditions can't see. i ran into this ... implementing vigilus"*
(GenWilhelm, 2021-10-07); FarseerV: *"any method of changing category will require a modifier, and if the
conditions cannot see those categories they cannot trigger logic"*. Also *"you cant validate off a category
that was added via modifier"* (GenWilhelm, 2020-02-17). Consequence: if you swap a category by modifier and
then want to gate logic on it, you can't — restructure so the category is on the SE or on the ancestor. Key
scope-concept clarification.

### 4.4 A category on a SE (via selection) only lands at the model's top level, not truly at Ancestor scope
*"If a category is added to a model by virtue of it making a selection (i.e. the category is on that SE) it is
only applied to the top level of the model on the output. It is not actually applied at the Ancestor scope even
though it appears to be"* (Mad Spy, 2022-06-02). Fix: use `1 selection of` conditions, or add the category
directly to the Ancestor. Important, subtle scope clarification for the docs.

### 4.5 Parent-of-a-profile is the SE it sits in — you can't reach the model from a shared weapon's profile
*"the Parent of a Profile is the SE it is within. There's no way to reference the SE above that. So ...
Model->Shared Weapon with Profile, you can't change the Profile based on selections made in the Model"* — it
only works if the profile link is placed in the model's context: `Model -> Shared Weapon -> Shared Profile`
(Mad Spy, 2019-09-27). Related recurring mistake: condition scope set to **Parent** when it should be **Self**
or a specific entry (Rowboat's CP bonus, 2020-08-02). Core scope-concept material.

### 4.6 Scope choice: Roster vs Force vs Parent for army-wide uniqueness
Many "only 1 per army" WLT/relic checks must be **Roster** scope, not Force: *"changing scope to roster DID
fix"* (Jon, 2020-04-27); *"its constraint should be at the Roster level"* (Mad Spy, 2021-05-27); a Cadian
warlord check *"checking for 1 in force instead of roster"* mis-fired (Techno, 2021-11-03). Straightforward
scope guidance with concrete failure mode.

### 4.7 The `shared` checkbox on constraints
*"a shared constraint is validated across multiple separate instances of the entry"* (GenWilhelm, 2022-06-28).
Default is on for unit min/max. Two recurring issues:
- A 2020 BS release **broke shared constraints** so default unit-size min/max stopped validating (Thairne,
  2020-01-07) — version fragility.
- Sometimes you must **uncheck** shared to get per-instance behavior, e.g. two bolt pistols in one SEG, or a
  `max 1 in Force` NFO copy: *"take the shared checkbox off the constraints for the bolt pistols in the SEGs
  or you'll get errors"* (Mad Spy, 2021-06-09); *"unchecked the 'shared' box on the 'max 1 in Force' constraint
  for the NFO version"* (FarseerV, 2023-01-21). But Amadeusz cautions the majority *should* stay shared
  (2020-01-18). Good concept + troubleshooting pairing.

### 4.8 "And all child selections / child forces" boxes on conditions
Unchecked by default **on purpose, for performance**: *"Checking those boxes expands the scope of selections
... The more selections considered, the longer it takes. So those boxes should only be checked if you need
them"* (Jonskichov, 2020-03-28). But the flip side bit them repeatedly: roster/force-scope **hide** logic
needs "and all child selections" checked or it silently stops working (Windstorm, 2023-08-06:
*"make sure your show/hide logic has the 'and all child selections' box checked, or it will no longer function
correctly if it is roster or force scope"*). Document both the perf reason and the show/hide requirement.

### 4.9 Modifier evaluation order & override rules
- Modifiers evaluate **last**, after link/base values; link costs are not modifiers (Mad Spy, 2021-01-12).
- **Order of modifiers in the file matters**: an unconditional modifier can override a conditional one
  depending on which comes first — *"on the pistols the unconditional modifier comes first"* was the bug
  (GenWilhelm, 2020-10-08); reaffirmed generally by Dunamis55 (2024-03-07): *"the order of conditional stuff
  matters ... things done first can be overwritten by conditional logic placed below it."* Concept material
  for a "how modifiers resolve" page.

### 4.10 Primary category double-set cancels out → entry vanishes
*"if you have primary set on imported links and on the se, they cancel eachother out and the entry is hidden"*
(Jon, 2020-07-28); *"Remove the doubled Primary Category ... you have it on root and shared entry"*
(Dr. Toboggan, 2019-08-24). Troubleshooting entry: "my unit disappeared after setting a primary category."

### 4.11 Hiding profiles / hidden categories don't work as expected (BS)
- Long-standing: you can't reliably **hide a profile on a shared entry based on a selection in the unit**
  (Mad Spy, 2020-06-05), and there was no "replace profile" — hiding a profile leaves an orphaned selection
  (Mad Spy, 2020-08-25). Team wanted true profile hide/replace for years (many mentions). **[uncertain]** how
  much of this NR fixed — later Mad Spy just uses separate show/hide profiles (2024-06-11).
- **Hidden flag on categories historically did nothing** on output, and marking a category hidden made force
  constraints stop working (*"when you mark Hidden on the category, force constraints just cease to work"*,
  Dr. Toboggan, 2020-08-02). Later "hidden categories" became a real, heavily-used tool (restrict wargear via
  a hidden category; NR turns them into mutually-exclusive options — Mad Spy, 2024-08-13, flagged as a quirk).

### 4.12 Name modifiers don't render in the editor preview pane
*"you are aware that name modifiers dont resolve in the right-hand pane?"* (GenWilhelm, 2020-11-09). Prevents
a lot of "my rename modifier isn't working" confusion — the modifier is fine, the preview just doesn't apply
it. Small but high-value troubleshooting note.

### 4.13 Editor stability: catalogue links, copy/paste, duplicate IDs
Mostly BS-editor-specific but the underlying format lessons generalize:
- **Manipulating catalogue links crashes the BS data editor** (right-click especially). Workaround: hand-edit
  the `<catalogueLink ... importRootEntries="false"/>` in XML (Thairne, 2020-07-05; Mad Spy reported to Jon).
- **Copy/pasting entries that carry conditions/modifiers** could produce an uneditable/broken conditional in
  BS — you had to delete and recreate it (Thairne, 2020-07-05). In NR, copy/paste of modifiers/conditions was
  buggy early on and often needed an editor restart (Windstorm/Mad Spy, 2023-07-10) — since fixed.
- **Duplicate IDs across catalogues** block adding a catalogue link, and importing a library into two catalogues
  then one into the other yields duplicate-ID errors (Mad Spy, 2019-05-02; Amadeusz, 2020-07-09). Fix:
  regenerate IDs. Generalizable: IDs must be globally unique across a load set.

### 4.14 NR↔BS interop caveats (relevant because our data must load in both)
- NR omits some attributes BS adds (e.g. `hidden` on loaded files, XMLNS on new catalogues) — re-saving in BS
  "irons out" differences (Amadeusz, Mad Spy, 2023-06). *"open and re-save the datafile in BS Data Editor."*
- NR-only constructs (`exactly`, upstream-aware constraints, profile-hunting modifiers, `Set Error`,
  associations) **won't validate/behave in BS** — teams add a "this catalogue needs New Recruit" disclaimer
  entry when they rely on them (Mad Spy, 2024-05-14 onward).
- NR is stricter/different on scope validation: *"NR editor doesn't flag when you copy paste a 'unit'-scoped
  modifier/constraint to a different unit"* (Mad Spy, 2023-07-18) vs BS does — and conversely Gilou's scope
  checker *"actually checks to see if the target is valid for the scope"* which BS didn't (2023-07-19). Useful
  for a "validation differences" doc.

---

## 5. Small clarifications worth folding into concept pages

- **`shared` on a constraint** = validated across all instances of the entry (GenWilhelm, 2022-06-28). Uncheck
  for per-instance limits.
- **Import controls are two-level**: catalogue-link `importRootEntries` and per-SE `import` flag; you can leave
  SE `import` checked and just uncheck root import on the link (Amadeusz, 2019-12-18).
- **Entry Type (model/unit/upgrade) is load-bearing**, not cosmetic: it drives `type:` scope traversal (3.2),
  model-counting in the builder, and TTS/export ("to appear in TTS it has to be a Model", Mad Spy, 2024-12-29).
  Guideline text quoted 2020-10-12.
- **Output order = file order.** Selections/profiles appear in the order they sit in the XML (= link order in
  the editor); you reorder by moving them in the force/XML (GenWilhelm, 2018-08-19 [sic 2020]; Mad Spy,
  2020-07-01). NR added the ability to bump profile order like category links.
- **`percentValue` / "Value is percentage?"** makes sense on a constraint (e.g. max 25% of roster) but its
  meaning on a condition/repeat was unclear even to experienced authors (Amadeusz, 2019-11-14) — **[uncertain]**,
  worth documenting clearly if NR supports it.
- **A weapon can hold multiple profiles** (combi-melta = a "boltgun" profile + a "meltagun" profile); the
  summary lists profile names, so multi-profile weapons and same-name collapsing interact (GenWilhelm,
  2021-06-08).
- **Multiply modifier** for doubling allowances (e.g. Battleline unit doubling its slot count under a
  condition): *"you can use the multiply modifier to double the allowance"* (Mad Spy, 2026-06-10).
- **`is before` / self-counting conditions** for "Nth of the same unit costs more": a condition checks whether
  an earlier instance of self of the same name exists, then applies a modifier (Mad Spy, 2026-06-28). Niche but
  a nice recipe for progressive/scaling costs.

---

## 6. Suggested doc mapping (quick index)

- **Concept — Scopes:** 3.2 (`type:` scopes), 4.3, 4.4, 4.5, 4.6 (Roster/Force/Parent/Self), 4.8, 5.
- **Concept — Constraints:** 1.7 (radio/checkbox), 4.7 (`shared`), 3.4 (`exactly`), 4.13.
- **Concept — Modifiers:** 4.9 (order/override), 3.3 (relative/profile-hunting), 3.7, 1.12 (costs), 4.12.
- **Concept — Profiles/ProfileTypes:** 1.1, 1.2 (name collision), 1.4, 1.5.
- **Concept — Links & Libraries & imports:** 1.11, 1.13, 5 (import flags), 4.10.
- **Concept — Associations (NR):** 3.6.
- **Concept — Conditions/hidden & best practice:** Section 2 (fail-visible), 4.1, 4.11.
- **Recipe pages:** 1.6 (min0→min1 required-with-None), 1.8 (X-per-Y repeat), 1.9 (dual-role category swap),
  1.10 (no-slot unlock), 1.11 (share a unit across catalogues), 3.5 (`Set Error` friendly validation),
  3.7 (`Move To` refactor), 3.6 (associations/leaders).
- **Troubleshooting:** 4.1 (link-target conditions), 4.2 (primary-catalogue perf), 4.3 (modifier categories
  invisible), 4.10 (disappearing entry), 4.11 (profile/category hide), 4.12 (name preview), 1.2 (merged
  profiles), 1.7 (unexpected radio/checkbox), 4.13 (editor crashes/dup IDs), 4.14 (NR↔BS interop).
