# What's New

Features land in NewRecruit faster than most authors hear about them. Each line
below is one data-authoring feature, newest first, linking to the page that
explains it. Skim it top to bottom once in a while — the point of this page is
finding tools you didn't know existed.

## 2026

- **Show tracker on categories** (2026-07) — always display a category with its
  count and limits, even while not having any available or selected units within ("Prime Elites 0/6").
  → [Army-wide limits](/guide/recipes/army-limits#category-slots-minimums-and-maximums)
- **Include-self scope variants** (2026-07) — type scopes that count the
  starting node too. → [Scope](/guide/concepts/scope#type-scopes)
- **Relative modifiers on profiles, rules, and info nodes** (v1.4.11, 2026-06) —
  Affects works from info nodes, not just entries.
  → [Modifiers](/guide/concepts/modifiers#relative-modifiers-affects)
- **Affect grouped associations** (v1.4.11, 2026-06) — constraints, conditions,
  and relative modifiers can traverse grouped associations.
  → [Associations](/guide/concepts/associations)
- **Follow associations from relative modifiers** (v1.4.8, 2026-06) — buff the
  unit a character joined.
  → [Modifiers](/guide/concepts/modifiers#relative-modifiers-affects)
- **Association conditions and default targets** (v1.4.10, 2026-06).
  → [Associations](/guide/concepts/associations)
- **`Entry & Type: Not Upgrade` scope** (2026-06).
  → [Scope](/guide/concepts/scope#type-scopes)
- **Step** (v1.4.2, 2026-04) — an entry's amount changes in fixed increments,
  for units bought five models at a time.
  → [Points per model](/guide/recipes/points-per-model)
- **Child ID on self-scope constraints** (v1.4.2, 2026-04) — constrain one
  specific child from the node itself.
  → [Constraints](/guide/concepts/constraints)
- **Filter association targets with conditions** (v1.3.31, 2026-04) — restrict
  what an association may attach to.
  → [Associations](/guide/concepts/associations)
- **Constrain by associations** (v1.3.31, 2026-04) — constraints can count a
  node's associated selections.
  → [Associations](/guide/concepts/associations)
- **The `header` child ID** (v1.3.31, 2026-04) — with instance-of and `Self`
  scope, hides a configuration entry from the add-unit list once it is taken.
  → [Show or hide an option](/guide/recipes/conditional-options#hide-a-configuration-unit-once-its-added)
- **Constraint messages** (v1.3.31, 2026-04) — plain-language text with
  placeholders shown when a limit is broken.
  → [Constraints](/guide/concepts/constraints#custom-messages)
- **Triangular and exponent modifiers** (v1.3.31, 2026-04) — stepped-table
  scaling. → [Modifiers](/guide/concepts/modifiers#operation-types)
- **Formatting Rules and Default Value on characteristic types** (v1.3.31,
  2026-04). → [Profiles & Rules](/guide/concepts/profiles#characteristic-formatting)
- **Category descriptions and category costs** (v1.3.31, 2026-04) — a category
  can explain itself and carry a per-slot cost.
  → [In-text References](/guide/concepts/in-text-references#category-descriptions),
  [Army-wide limits](/guide/recipes/army-limits)
- **Leader-style association groups** (v1.3.31, 2026-04) — action and splitting
  behavior on associations. → [Associations](/guide/concepts/associations)
- **Repeats on condition groups** (v1.3.30, 2026-01) — any condition group can
  repeat, not just local ones.
  → [Conditions](/guide/concepts/conditions#combining-conditions-condition-groups)
- **Primary-category cost modifiers** (2026-04) — modifiers can change the
  cost of a unit's primary category.
  → [Army-wide limits](/guide/recipes/army-limits)
- **Cumulative modifiers** (v1.3.29, 2026-01) — add/multiply/power that combine
  across repeated applications.
  → [Modifiers](/guide/concepts/modifiers#operation-types)

## 2025

- **Arithmetic condition groups** (v1.3.28, 2025-12) — add, subtract, multiply,
  divide, modulo, power, min, max, plus comparisons: compute values inside
  logic natively. Retires the old hidden-cost workaround.
  → [Condition-Group Maths](/guide/advanced/condition-maths)
- **The `before` condition** (v1.3.28, 2025-12) — position-dependent rules,
  such as the third copy costing more.
  → [Conditions](/guide/concepts/conditions#local-condition-groups)
- **`count` and `not` condition groups** (v1.3.25, 2025-11).
  → [Conditions](/guide/concepts/conditions#combining-conditions-condition-groups)
- **Kind on profile and characteristic types** (v1.3.25, 2025-11) — tag
  profiles so exports recognise them.
  → [Profiles & Rules](/guide/concepts/profiles#the-profile-type-kind)
- **Force readme** (v1.3.25, 2025-11) — a readme text on forces, changeable by
  modifiers. → [Modifiers](/guide/concepts/modifiers#fields)
- **The `exportable` field** (v1.3.24, 2025-09) — control whether an entry
  appears in exports.
  → [Custom Export Templates](/guide/advanced/export-templates)
- **Multiply, divide, and modulo modifiers** (v1.3.23, 2025-09).
  → [Modifiers](/guide/concepts/modifiers#operation-types)
- **Duplicate-finder scripts** (v1.3.22, 2025-09) — shipped
  `find-duplicate-ids` and `find-duplicates-profiles`.
  → [Editor Scripts](/guide/advanced/scripts)
- **Cost limits in conditions; cost-to-cost modifiers** (2025-07) — read the
  roster's cost limit inside logic; modify one point type from another.
  → [Conditions](/guide/concepts/conditions)
- **Shared force entries and force links** (v1.3.19, 2025-07) — define a force
  once under Shared Force Entries, link it wherever it appears; enables nested
  child forces. → [Forces](/guide/concepts/forces)
- **Custom export templates** (2024-11 → 2025-07) — XML/HTML/CSS templates with
  roster queries, string helpers, grouping, and embedded JavaScript; community
  template repository.
  → [Custom Export Templates](/guide/advanced/export-templates)
- **Pretty-printed JSON** (v1.3.18, 2025-07) — clean line-by-line git diffs.
  → [Best Practices](/guide/best-practices#save-catalogues-as-json-for-clean-diffs)
- **Floor and ceil modifiers; manual sort-index box** (v1.1.172, 2025-02).
  → [Modifiers](/guide/concepts/modifiers#operation-types),
  [Sorting](/guide/advanced/sorting)
- **Position on increment/replace modifiers** (v1.1.164, 2025-02) — target a
  specific number or spot inside a string value, like the `3` in `D6+3`.
  → [Modifiers](/guide/concepts/modifiers#operation-types)
- **Associations reach into child forces** (v1.1.162, 2025-02).
  → [Associations](/guide/concepts/associations)
- **Automatic constraints** (v1.1.170, 2025-02) — NR resolves the selection
  itself and locks add/remove on fixed-size units.
  → [Constraints](/guide/concepts/constraints#automatic-constraints)
- **Attributes on profiles** (v1.1.168, 2025-02) — hidden characteristics for
  exports and scripts.
  → [Profiles & Rules](/guide/concepts/profiles#attributes)
- **The Affects query UI** (v1.1.160, 2025-01) — point a modifier at other
  nodes. → [Modifiers](/guide/concepts/modifiers#relative-modifiers-affects)
- **Cost modifiers on forces** (v1.1.155, 2025-01) — change costs at the force
  level. → [Modifiers](/guide/concepts/modifiers#fields)
- **`always` / `never` conditions** (v1.1.159, 2025-01).
  → [Conditions](/guide/concepts/conditions#condition-types)
- **Local condition groups** (v1.1.157, 2025-01) — test several things about
  the same target; double as repeats.
  → [Conditions](/guide/concepts/conditions#local-condition-groups)

## 2024

- **Relative modifiers** (2024-09) — a modifier on one node that changes other
  nodes;
  → [Modifiers](/guide/concepts/modifiers#relative-modifiers-affects)
- **Error, warning, and info modifiers** (2024-09 → 2025-01) — data-driven
  validation messages on the roster.
  → [Best Practices](/guide/best-practices#prefer-a-visible-error-over-hiding)
- **Default a group to nothing** (v1.1.151, 2024-09) — a group's Default
  Selection can be explicitly `none`.
  → [Weapon options](/guide/recipes/weapon-options)
- **Modifier fan-out scopes** (v1.1.148, 2024-09) — one modifier can target its
  parents, children, profiles, or profiles of a given type.
  → [Modifiers](/guide/concepts/modifiers)
- **Annotation modifiers** (v1.1.148, 2024-09) — show a parenthetical after a
  node's name, as `Name (Annotation)`.
  → [Modifiers](/guide/concepts/modifiers#fields)
- **Separator control on append/prepend** (v1.1.148, 2024-09) — set or remove
  the joining string (default space).
  → [Modifiers](/guide/concepts/modifiers#operation-types)
- **Renameable "Child Forces" label** (v1.1.148, 2024-09).
  → [Forces](/guide/concepts/forces#child-forces)
- **Hidden modifiers on cost types** (v1.1.145, 2024-08) — conditionally hide a
  cost type. → [Modifiers](/guide/concepts/modifiers#fields)
- **No Index** (v1.1.144, 2024-08) — keep a name out of rules auto-linking.
  → [In-text References](/guide/concepts/in-text-references)
- **`defaultAmount` as a modifier target** (v1.1.140, 2024-08).
  → [Modifiers](/guide/concepts/modifiers#fields)
- **Comment lints** (v1.1.139, 2024-07) — `todo:` / `warning:` / `error:`
  comments show as annotations in the editor.
  → [Best Practices](/guide/best-practices#leave-todos-and-warnings-in-the-data)
- **The `negative` constraint flag** (v1.1.135, 2024-05) — `-1` means "no
  limit" unless you opt in to a real negative.
  → [Constraints](/guide/concepts/constraints#the-value--1)
- **Type scopes** (v1.1.131, 2024-05) — count within the nearest unit, model,
  or upgrade, whatever the nesting.
  → [Scope](/guide/concepts/scope#type-scopes)
- **Multi-stack default amounts** (v1.1.128, 2024-04) — `defaultAmount` takes
  comma-separated values like `1,2,3`.
  → [Weapon options](/guide/recipes/weapon-options#giving-a-model-several-default-weapons)
- **Scripts and paste hooks** (v1.1.124, 2024-04) — bulk edits, lints, and
  custom paste importers written in JavaScript.
  → [Editor Scripts](/guide/advanced/scripts)
- **Add from Github** (2024-04 onward) — players load a system straight from
  any repository, with install links and automatic updates.
  → [Publishing](/guide/publishing)
- **Markdown in text fields** (2024-03/04) — bold, italics, tables, and
  `^^small caps^^`.
  → [Profiles & Rules](/guide/concepts/profiles#formatting-text)
- **Aliases** (v1.1.123, 2024-03) — alternative names for rules auto-linking.
  → [In-text References](/guide/concepts/in-text-references)
- **Manual ordering** (v1.1.92–104, 2024-01) — sort index with drag-reorder,
  and no-alphabetical-sort. → [Sorting](/guide/advanced/sorting)
- **`replace` and `prepend` operations** (v1.1.93–111, 2024-01).
  → [Modifiers](/guide/concepts/modifiers#operation-types)
- **Paste as link (Ctrl+L); flatten groups** (2024-01) — paste a copied entry
  as a link to it; flatten a group's children into its parent.
  → [Links & Shared Entries](/guide/concepts/links)
- **Profile subType** (v1.1.95, 2024-01/02) — `crew`, `mount`, and
  `unit-group` sub-typing on model profiles.
  → [Profiles & Rules](/guide/concepts/profiles)
- **Sort profile types** (v1.1.94, 2024-01) — a popup to reorder a system's
  profile types. → [Sorting](/guide/advanced/sorting)

## 2023

- **The data editor itself** (v1.0, 2023-05) — tree editing, copy/paste with ID
  scrambling, undo/redo, the References panel; JSON, XML, and zipped formats
  supported from day one.
- **Change File Format** (v1.1.89, 2023-12) — convert a whole system between
  XML, zip, and JSON.
  → [Best Practices](/guide/best-practices#save-catalogues-as-json-for-clean-diffs)
- **GitHub publish with automatic revision bumps** (v1.1.27, 2023-06) — publish
  from the editor; catalogue revisions increment on their own against the
  repository. → [Publishing](/guide/publishing)
- **Increment/decrement on string stats** (v1.1.60, 2023-06) — `5+` becomes
  `4+` with a plain increment modifier.
  → [Modifiers](/guide/concepts/modifiers#fields)
- **Default amounts, default group options, `exactly` constraints, default
  cost limits** (2023-06) — the basics of making a fresh unit legal.
  → [Weapon options](/guide/recipes/weapon-options),
  [Your First Game System](/guide/first-system)

## Before the editor

- **Associations** (2022) — leaders joining units have been in the builder
  since before the editor existed.
  → [Associations](/guide/concepts/associations)
