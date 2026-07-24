# GitHub issue mining — NR data-author documentation research

Sources: giloushaker/nr-editor (all 31 issues, all closed), BSData/catalogue-development (~250 issues + wiki),
targeted `gh search issues` across BSData game repos for "New Recruit"/"NR editor" mentions, giloushaker's other repos.
Date: 2026-07-21.

Note: nr-editor has no discussions and an empty wiki. BSData game-repo issues are ~95% end-user roster bug
reports (not author questions); the author-side signal concentrates in nr-editor issues, BSData/catalogue-development,
and the BSData wiki. Most live authoring Q&A happens on Discord — nearly every "how do I" issue gets redirected there
(e.g. cat-dev #78, #91), which is itself evidence that written docs are missing.

## 1. Recurring data-author confusions (ranked by frequency)

### 1.1 Scope / context of conditions & constraints (most frequent)
Authors consistently misunderstand what "in Force / in Parent / in Roster" means, and which entries are
"visible" to a condition. This is the single biggest conceptual gap.
- "hide weapon until a skill is selected" — worked, but any character's skill unlocked it for the whole roster;
  fix was Parent scope + restructuring into shared selection entries so items can reference each other:
  https://github.com/BSData/catalogue-development/issues/78
- "How do I implement a cost constraint across two child forces?" — multi-force scope question:
  https://github.com/BSData/catalogue-development/issues/91
- Percentage cost modifier + rounding done wrong (increment/decrement semantics misunderstood):
  https://github.com/BSData/catalogue-development/issues/94
- Editor UI: "Unable to see and set Scope on constraints": https://github.com/giloushaker/nr-editor/issues/1
- "Refs" display doesn't count condition/constraint references, confusing authors auditing usage:
  https://github.com/giloushaker/nr-editor/issues/24

### 1.2 Links vs shared entries ("am I editing the base template?")
- "Is it possible to get a class and extend it without modifying the reference?" — author expected
  OOP-style inheritance; answer explains: blue text = editing the shared base, you can add children to a
  link directly, but the format cannot remove/override base children except via conditional modifiers:
  https://github.com/giloushaker/nr-editor/issues/32
- HH2 wiki codifies the pattern: create everything under Shared Entries and link to it
  (https://github.com/BSData/horus-heresy-2nd-edition/wiki/Data-File-Tips-Tricks)
- Pattern-level debate: one link + "set primary category" modifiers vs multiple hidden links:
  https://github.com/BSData/horus-heresy-2nd-edition/issues/3248
- Link creation confusion/bugs: link not displaying (#10), typed entry disappears in link search (#6),
  incomplete catalogueLink type attribute (#3): https://github.com/giloushaker/nr-editor/issues/10

### 1.3 BattleScribe interoperability anxieties
Authors work in NR but must stay backward-compatible with the (dead but still used) BS app.
- The adoption thread: "New Recruit - Army Builder and Data Editor" — devs using NR editor while keeping
  files BS-compatible: https://github.com/BSData/horus-heresy-2nd-edition/issues/2970
- NR saved ints where BS saved decimals (noisy diffs when both editors used):
  https://github.com/giloushaker/nr-editor/issues/20
- InfoGroups created in NR unreadable by BS and vice versa (fixed, but shows the risk class):
  https://github.com/giloushaker/nr-editor/issues/16
- Renaming released files breaks legacy BS (leaves old files, causes ID conflicts) — download used XML
  name instead of filename: https://github.com/giloushaker/nr-editor/issues/19

### 1.4 Imports, catalogue links, publications
- Adding a library to fix a missing import doesn't take effect until the system is reloaded:
  https://github.com/giloushaker/nr-editor/issues/28
- Publications from imported catalogues couldn't be selected (#12); publication couldn't be reset to
  blank (#14); PublisherID truncated (#11): https://github.com/giloushaker/nr-editor/issues/12

### 1.5 Editor mechanics authors didn't know existed (feature requests later shipped)
Each of these is now a feature that needs documenting because users couldn't find/didn't expect it:
- Global search (added 1.1.80, loop icon in catalogues view): https://github.com/giloushaker/nr-editor/issues/23
- Jump-to-definition from condition "filter by" (added 1.1.81): https://github.com/giloushaker/nr-editor/issues/27
- Regenerate UUID for an entry (added 1.1.70): https://github.com/giloushaker/nr-editor/issues/15
- Sorting/insert-paste behaviors: #13, #26, #25

## 2. Publishing / hosting workflow pain points

This is where new authors hit the hardest walls (all in BSData/catalogue-development):
- Release workflow produced only zip files — root cause: author uploaded .bsr instead of raw .cat/.gst:
  https://github.com/BSData/catalogue-development/issues/212
- Same author, second failure: GitHub Actions "Workflow permissions" default changed to read-only, breaking
  the publish-catpkg workflow; wiki had to be updated to mention it:
  https://github.com/BSData/catalogue-development/issues/213
- "I released yesterday — how long until it's available in the app?" (propagation confusion):
  https://github.com/BSData/catalogue-development/issues/142
- Repo not appearing in the datafile list: https://github.com/BSData/catalogue-development/issues/119
- BS app not seeing repositories at all (appspot feed flakiness; answer: use Gallery):
  https://github.com/BSData/catalogue-development/issues/233
- .bsi index fails to parse when added by URL: https://github.com/BSData/catalogue-development/issues/248
- Homebrew/fanmade hosting policy — BSData won't host it; the modern answer is NR "Add from Github":
  https://github.com/BSData/catalogue-development/issues/86
- The wiki itself documents the NR-first path now: any GitHub repo with .gst/.cat at the root loads via
  "Add or Remove games → Add from Github"; getting listed in NR's official game list requires asking on
  NR Discord (English, maintained, non-homebrew-of-existing-system):
  https://github.com/BSData/catalogue-development/wiki/Hosting-repositories

Key takeaway: NR publishing is drastically simpler than the BS pipeline (no .bsi/.bsr/releases/workflows
needed), but no NR-owned doc states this — the best explanation lives in BSData's wiki.

## 3. Existing authoring resources discovered

| Resource | URL | Assessment |
|---|---|---|
| BSData catalogue-development wiki | https://github.com/BSData/catalogue-development/wiki | The most complete authoring resource (Getting Started, Data Author Guide, Data structure overview, Common Catalogue Patterns, Catalogue Guidelines, Hosting repositories, Forking Guide, Joining Repository); BS-era with NR bolted on, self-admittedly outdated (issues [#16](https://github.com/BSData/catalogue-development/issues/16), [#249](https://github.com/BSData/catalogue-development/issues/249)). |
| Hosting-repositories wiki page | https://github.com/BSData/catalogue-development/wiki/Hosting-repositories | Best current NR + BS publishing walkthrough; NR section is 2 paragraphs, BS section is 7 steps of legacy pipeline. |
| giloushaker/nr-docs | https://github.com/giloushaker/nr-docs | Abandoned early docs attempt: FAQ (fork/clone/git homebrew workflow, Add-from-Github steps), a 12-step "create data from scratch" outline with missing screenshots/links, and an empty "editing existing data" page. Good skeleton to mine, not shippable. |
| nr-editor README | https://github.com/giloushaker/nr-editor | Install instructions only (incl. macOS xattr workaround); no authoring docs. |
| giloushaker/nr-templates | https://github.com/giloushaker/nr-templates | Solid reference for the export-template language (node expansion + {{placeholders}}, available fields per list type); niche but genuinely documented. |
| giloushaker/nr-builder README | https://github.com/giloushaker/nr-builder | Local offline builder for TESTING data (explicitly not for making rosters); one page, adequate. |
| HH2 CONTRIBUTING.md | https://github.com/BSData/horus-heresy-2nd-edition/blob/main/CONTRIBUTING.md | Real-world unit-authoring conventions (shared entries, model constraints, wargear placement) — written for the BS editor, needs NR translation. |
| HH2 wiki Data-File-Tips-Tricks | https://github.com/BSData/horus-heresy-2nd-edition/wiki/Data-File-Tips-Tricks | One paragraph (shared-entries-plus-link pattern); shows appetite, not substance. |
| BSData/gallery | https://github.com/BSData/gallery | BS data-source index; relevant only for legacy BS distribution. |
| BSData/TemplateDataRepo | https://github.com/BSData/TemplateDataRepo | Template repo with publish workflows for the legacy BS pipeline. |
| BSData Discord / NR Discord | https://www.bsdata.net/discord, https://discord.gg/YCF7aMRYhD | Where all real Q&A happens; every GitHub "how do I" gets redirected there. |

## 4. Doc topics justified by this evidence

### Tutorial
- "Create a game system from scratch" — finish what nr-docs/data/create-data.md started (system → catalogues →
  forces → categories → primary category → units → constraints → costs → profiles). Evidence: the stub itself,
  cat-dev #237/"new game system" repo requests, #131.
- "Publish your data on GitHub and load it in NR" — repo with .gst/.cat at root, Add from Github, updating via
  commits, getting listed in NR. Evidence: cat-dev #86, #212, #213, #142; Hosting-repositories wiki.
- "Contribute to an existing BSData game" — fork, clone, set working folder, PR etiquette (ask codeowner first).
  Evidence: Getting-Started wiki, HH2 CONTRIBUTING, nr-docs FAQ.

### Concepts
- Scope & context in conditions/constraints (self/parent/force/roster; what "shared" means for visibility).
  Evidence: cat-dev #78, #91, #94; nr-editor #1, #24. Highest-value single page.
- Links, shared entries, and the "base template" (blue text = editing the base; what a link can add;
  what it cannot override; modifier workarounds). Evidence: nr-editor #32; HH2 #3248 + wiki tip.
- Catalogue imports & catalogue links (library vs catalogue, when a reload is needed). Evidence: nr-editor #3, #28.
- Publications & page references. Evidence: nr-editor #11, #12, #14.
- BattleScribe compatibility notes (what to avoid if BS users must still load your files; file naming and
  ID stability across releases). Evidence: nr-editor #16, #19, #20; HH2 #2970.

### Recipes
- Conditional hide/show of an option based on another selection (the Parent-scope pattern). (cat-dev #78)
- Percentage cost increase with rounding via modifiers. (cat-dev #94)
- Constraints spanning multiple forces / child forces. (cat-dev #91)
- Roster-level cost caps and cost types. (cat-dev #49, #55)
- Aliases for rules and when to use info links vs profiles. (nr-editor #31; HH2 CONTRIBUTING)
- Regenerate a UUID / fix duplicate IDs. (nr-editor #15)

### Troubleshooting
- "My release only produced zip files / workflow failed" → upload .cat/.gst not .bsr; enable read-write
  workflow permissions. (cat-dev #212, #213)
- "My game doesn't show up in NR / BS after release" → propagation, Gallery vs appspot, Add-from-Github.
  (cat-dev #119, #142, #233, #248)
- "Missing import" error after adding a library → reload the system. (nr-editor #28)
- "I edited a linked entry and it changed everywhere" → you edited the base; see links concept page.
  (nr-editor #32)
- "Entry shows 0 refs but is used" → refs vs condition references. (nr-editor #24)
