# Your First Game System

This tutorial builds a small but complete game system from scratch: a system
file, one faction catalogue, a unit with options and points, and force
constraints. At the end you load it in the builder and see it work.

Screenshots are still to come; the steps describe where to click.

## 1. Create the system

Open the [NR Data Editor](https://github.com/giloushaker/nr-editor/releases),
select `Create System`, and enter a name.

## 2. Add factions

Create a new catalogue for each faction available in your game. Each catalogue
becomes a choice in the builder's faction selector.

## 3. Add forces

Open the game system (the file with the two-cogs icon). `Force Entries` should
contain an entry named "Default Force". If it doesn't, right click
`Force Entries` and select `Force` to create one.

## 4. Add categories

In `Category Entries`, create the top-level categories your units sort into, for
example "Troops", "Characters", "Monsters".

## 5. Make categories available in the force

Back in `Force Entries`, right click the force and select `Category`. In the
right-hand menu, pick one of your categories under `Link` > `Target`. Units with
that category become available as choices within that force.

## 6. Create units

Right click `Root Selection Entries` and select `Entry` to add a unit.

Many systems define the unit under `Shared Selection Entries` and then add a link
to it under `Root Selection Entries`, so the same unit can be reused. There is a
shortcut: right-click a node and choose **Move To**. Moving an entry from Root
into Shared Selection Entries leaves a link behind for you. For a first system you
can create it directly in root; see [Links & Shared Entries](/guide/concepts/links)
for why sharing helps later.

## 7. Set the unit's primary category

New units show under "Uncategorized" by default. Add one of the categories you
made available in the force, then mark it **primary**. The primary category is
what groups the unit in the builder. An entry has exactly one primary category;
other categories are used for logic and datasheet display.

## 8. Add options

Options are the choices a player makes on the unit, such as a weapon or an
upgrade. Add a child entry under the unit for each option.

For a "pick one of these" choice, add a **selection group** under the unit, set
it to `min 1`, `max 1`, and put the choices inside it. Name the group after the
choice, for example "Weapon". See [Weapon options](/guide/recipes/weapon-options)
for the full pattern.

## 9. Add constraints

Constraints limit how many of something can be taken. On an entry or group, add a
constraint and set its `min` and `max`.

- Unit size: a `min`/`max in parent` constraint on the model entry.
- Pick exactly one: `min 1`, `max 1` on a selection group.
- A default so a fresh unit is legal: set the `defaultAmount` field on the entry
  that should start selected, rather than forcing it with a constraint.

See [Scope & Context](/guide/concepts/scope) for what a constraint counts.

## 10. Add points costs

Points need a cost type. In the game system, under `Cost Types`, create one named
`pts` (or `Points`). This is the currency the whole system uses.

Set a cost on an entry by adding a cost of that type and a value. To make a unit
cost more as it grows, price the models rather than the unit; see
[Points that scale per model](/guide/recipes/points-per-model).

To give the game a default army size, set a `defaultCostLimit` on the cost type.

## 11. Add force limits

Limits on how much of each category an army may take live on the force's category
links. Select a category under the force and add a constraint, such as `max 6
selections`.

Percentage limits like "max 50% of a category" are common. Base the percentage on
the **cost limit** (the game size) by setting the field to `pts limit`, not on the
points currently spent. See
[Army-wide limits](/guide/recipes/army-limits#percentage-caps).

## 12. Add profiles

Profiles are the stat blocks. They need a profile type first. In the game system,
under `Profile Types`, create one (for example "Unit") and add its characteristics
(Move, Save, and so on).

Then add a profile of that type to the entry it describes and fill in the
characteristics. Put the stat line on the **model**, not the unit: where a unit
has model entries, each model carries its own stats, even though the profile type
is often named "Unit". A weapon's profile goes on the weapon. A profile sits
directly on the unit only when the unit has no separate model entries beneath it.
See [Put each profile on the entry it describes](/guide/best-practices#put-each-profile-on-the-entry-it-describes).

## 13. Test it in the builder

Load the system in NewRecruit and build a list to check it behaves.

The quickest loop is on a Chromium-based browser (Chrome, Edge): use **Add from
folder** to point the website at your working folder. It hot-reloads as you save,
so you can edit in the data editor and see the build update without committing or
re-importing. Firefox and Safari do not support this.

The desktop builder also loads a local folder and hot-reloads. It is not tested on
Linux or macOS, and it often lags behind the website version, so prefer the
website loop where you can.

If a unit doesn't show up, work through the
[Troubleshooting](/guide/troubleshooting#my-unit-doesnt-appear-in-the-builder)
checklist.
