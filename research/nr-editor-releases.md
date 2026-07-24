# nr-editor release notes (authoritative NR changelog)

## v1.4.12 — 2026-07-09

(no notes)

## v1.4.11 — 2026-06-27

Added "Affect group associations" flag on constraints/conditions
Added "Affect group associations" flag on relative modifiers
Added support for relative modifiers located directly on profiles/rules/infoGroups/infoLinks

## v1.4.10 — 2026-06-23

Fixed some issues making it difficult/slow to input conditions on associations
Fixed associations not being orderable
Added defaultSelectionEntryId to associations, wich can only select "none" or "unset"
Added text to indicate "relative to self" is checked on conditions
Added quick contitions on conditionGroups

## v1.4.9 — 2026-06-19

Added a way to follow Associations for relative modifiers

## v1.4.8 — 2026-06-19

Added a way to follow Associations for relative modifiers

## v1.4.7 — 2026-06-11

Improved layout of costs when there is many of them

## v1.4.6 — 2026-04-27

Fixed characteristics showing in the tree view

## v1.4.2 — 2026-04-09

Added "step" field on entries to specify allowed increments
Added ability to input a childId on constraints when scope is self, in order to limit another id

## v1.4.1 — 2026-04-06

Fixed conditions in associationLinks not having the evaluateFromSelf checkbox

## Changelog
##### :abacus: Modifier Types    
- Added new modifier types: **`triangular`** and **`exponent`**  

#### :jigsaw: Conditions
- Added **`header` childId** for use with `instanceof`  and scope=`self`
  Useful for hiding configuration units from the left panel once added.

#### :link: Associations
- Added **`associations`** field on constraints  
- Added ability to **filter potential association targets** using conditions (similar to `localConditionGroups`)  
- Added (WIP) **`action`** and **`splittingBehavior`** choices for associations  
  For leader behavior, select the **`group`** action.

#### :bricks: Characteristic Types
- Added **`defaultValue`**  
  Automatically fills a value in the editor when creating a profile.  
- Added **`formatRules`**  
  Applied right before displaying values to the user.

#### :warning: Constraints
- Added **`message`** field  
  Allows setting more understandable, user‑friendly error messages.

#### :books: Category Entries
- Added **`description`** field  
- NR now creates **hyperlinks** to the description where applicable.
- Added ability to modify **costs** on category entries, which only affects the category entry itself when linked in **forces**

## v1.3.31 — 2026-04-06

#### 🧮 Modifier Types
- Added new modifier types: **`triangular`** and **`exponent`**

#### 🧩 FilterBy Enhancements
- Added **`header` childId** for use with `instanceof`  
  Useful for hiding configuration units once added.

#### 🔗 Associations
- Added **`associations`** field on constraints  
- Added ability to **filter association potential targets** using conditions (similar to `localConditionGroups`)  
- Added **`action`** and **`splittingBehavior`** choices for associations  
  For leader behavior, select the **`group`** action.

#### 🧱 Characteristic Types
- Added **`defaultValue`**  
  Automatically fills a value in the editor when creating a profile.  
- Added **`formatRules`**  
  Applied right before displaying values to the user.

#### ⚠️ Constraints
- Added **`message`** field  
  Allows more understandable, user‑friendly error messages.

#### 📚 Category Entries
- Added **`description`** field  
- NR now creates **hyperlinks** to the description where applicable.
- Added ability to modify **costs** on category entries, which only affects categories linked in **forces**


## v1.3.30 — 2026-01-18

Added Repeats in Condition Groups
Added UI for sorting Condition Groups childs

## v1.3.29 — 2026-01-12

Added Cumulative modifiers type

## v1.3.28 — 2025-12-31

Added "add", "substract", "multiply", "divide", "modulo", "power", "min", "max" Condition Group types
Added "greater", "greaterOrEqual", "less", "lessOrEqual", "equal", "notEqual" Condition Group types
Added "before" condition type within local condition groups, allows different costs for an entry depending on its position in the roster
Added "power" modifier

## v1.3.25 — 2025-11-19

Added readme on force 
Added modifiers for readme on force
Added COUNT condition group type
Added NOT condition group type
Added Kind field to profileTypes and characteristicTypes, which should allow for better, system-agnostic exports
Made it so the script to fix issues with profiles is automatically run whenever a profile or characteristic is changed

Refactored the code to detect when a catalogue is changed



## v1.3.24 — 2025-09-17

Fixed primary-category being replaced primary-catalogue
Added exportable field
Fixed findDuplicatesProfiles default script not being visible

## v1.3.23 — 2025-09-12

Added some missing modifier types ("multiply", "divide", "modulo")

## v1.3.22 — 2025-09-02

Added default script to find duplicate IDs
Added default script to find duplicate profiles
Updated favicon on linux
Fixed "forces" conditions scope being set to "roster" when selecting them
Fixed categories having "type" field
Fixed changing primary state of a category not making catalogue as changed/saveable
Added sanitization for catalogue names on creation

## v1.3.21 — 2025-07-30

Fixed order of forceEntryLink

## v1.3.19 — 2025-07-25

Added sharedForceEntries & forceEntryLinks

## v1.3.18 — 2025-07-22

Fixed json being saved in a minified format
Revert attempt to make the editor non-destructive to unknown fields

## v1.3.16 — 2025-07-22

(no notes)

## v1.3.12 — 2025-06-11

(no notes)

## v1.1.179 — 2025-05-28

(no notes)

## v1.1.178 — 2025-03-14

Now remembers window position when opening/closing

## v1.1.172 — 2025-02-27

Added input box to manually set sortIndex on forces or entries
Added floor/ceil modifiers
Fixed modifier query being available when modifying profiles, costTypes and categories
Fixed issues when filling a field then removing it 
Fixed popups

## v1.1.171 — 2025-02-22

Added text to display if automatic flag is on a constraint

## v1.1.170 — 2025-02-21

Added automatic flag on constraints

## v1.1.169 — 2025-02-14

Fixed a bug causing scripts to hang

## v1.1.168 — 2025-02-13

Added attributes (hidden characteristics) for use in scripting / exports
Updated the script to fix profiles
Fixed link panel not displaying
Fixed category & force modifiers missing dropdowns
Fixed catalogue links being included as possible scopes

## v1.1.167 — 2025-02-13

Added attributes (hidden characteristics) for use in scripting / exports
Updated the script to fix profiles

## v1.1.166 — 2025-02-13

Added attributes (hidden characteristics) for use in scripting / exports
Updated the script to fix profiles

## v1.1.165 — 2025-02-06

Added position field on increment/replace modifiers
Removed position field when incrementing constraints

## v1.1.164 — 2025-02-06

Added position field on increment/replace modifiers

## v1.1.162 — 2025-02-05

Added include child forces flag in associations

## v1.1.161 — 2025-01-28

Fixed bug when reloading systems
Fixed modifier scope self and undefined to be the same

## v1.1.160 — 2025-01-23

Added UI for modifiers affects field
Fixed modifier type being reset when changing fields even if its still valid

## v1.1.159 — 2025-01-12

Added always/never conditions

## v1.1.158 — 2025-01-09

Added Local Condition Groups (makes checking for 2 categories on one entry possible)
They are not much tested and likely to have performance issues; do provide feedback on discord.

Added Repeat fields to Local Condition Groups 




## v1.1.157 — 2025-01-09

Added Local Condition Groups (makes checking for 2 categories on one entry possible)
They are not much tested and likely to have performance issues; do provide feedback on discord.

## v1.1.156 — 2025-01-07

Fixed display of warning/info modifiers
Categories comments now display when editing categories
Changed right-click menu to be able to specify what type of link/profile is added
Added support for systems nested in folders

## v1.1.155 — 2025-01-01

Added Warning/Info Modifiers
Added cost modifiers on Forces 
Changed some text input boxes of modifiers to allow multiple lines

## v1.1.153 — 2024-10-17

Fixed alias overwriting nodes name when saving


## v1.1.152 — 2024-10-07

Changed installer settings to allow choosing install location

## v1.1.151 — 2024-09-18

Fixed bug in fix profiles script
Added "none" option in selectionEntryGroups Default Selection

## v1.1.150 — 2024-09-05

Fixed empty strings being removed on load (for empty join)

-- Previous Changes --
Added ability to add custom errors using add error modifier
Added ability to scope modifiers to one of or combinations of: parents, childs, profiles, profiles.{type}
Added annotation modifier, which will add text between parentheses after the name
Added ability to rename the "Child Forces" Label in forceEntries
Added parent in possible costType modifier scopes
Improved append/prepend modifier to be able to specify or remove the join string (default is a space)

## v1.1.149 — 2024-09-05

Added back whitespace trimming to text nodes

-- Previous Changes -- 
Added ability to add custom errors using add error modifier
Added ability to scope modifiers to one of or combinations of: parents, childs, profiles, profiles.{type}
Added annotation modifier, which will add text between parentheses after the name
Added ability to rename the "Child Forces" Label in forceEntries
Added parent in possible costType modifier scopes
Improved append/prepend modifier to be able to specify or remove the join string (default is a space)

## v1.1.148 — 2024-09-05

Added ability to add custom errors using add error modifier
Added ability to scope modifiers to one of or combinations of: parents, childs, profiles, profiles.{type}
Added annotation modifier, which will add text between parentheses after the name
Added ability to rename the "Child Forces" Label in forceEntries
Added parent in possible costType modifier scopes
Improved append/prepend modifier to be able to specify or remove the join string (default is a space)

Attempted to fix some issues after editing catalogue links
Fixed link issues if you have Check for duplicate ids across all catalogues enabled
Minor fixes

## v1.1.147 — 2024-09-04

Added ability to add custom errors using add error modifier
Added ability to scope modifiers to one of or combinations of: parents, childs, profiles, profiles.{type}
Added annotation modifier, which will add text between parentheses after the name
Added ability to rename the "Child Forces" Label in forceEntries
Added parent in possible costType modifier scopes
Improved append/prepend modifier to be able to specify or remove the join string (default is a space)

Attempted to fix some issues after editing catalogue links
Fixed link issues if you have Check for duplicate ids across all catalogues enabled

## v1.1.146 — 2024-09-04

Added ability to add custom errors using add error modifier
Added ability to scope modifiers to one of or combinations of: parents, childs, profiles, profiles.{type}
Added annotation modifier, which will add text between parentheses after the name
Added ability to rename the "Child Forces" Label in forceEntries
Added parent in possible costType modifier scopes
Improved append/prepend modifier to be able to specify or remove the join string (default is a space)

Attempted to fix some issues after editing catalogue links
~~Fixed link issues if you have Check for duplicate ids across all catalogues enabled~~

## 1.1.145 — 2024-08-20

Added hidden modifiers on costTypes

## v1.1.144 — 2024-08-16

Fixed conditions on sharedRules
Added noindex field to disable automatic references (will be supported in next NR update)
Improve Move Up and Move Down with multi-selection


## v1.1.142 — 2024-08-06

Fix inverted condition
-- Previous Changes --
Added hotkeys for Move Up & Move Down
Fix Move Up & Move Down not marking file as changed

## v1.1.141 — 2024-08-06

Added hotkeys for Move Up & Move Down
Fix Move Up & Move Down not marking file as changed

## v1.1.140 — 2024-08-04

Added defaultAmount modifier

## v1.1.139 — 2024-07-05

Comments starting with `todo:` or `error:` or `warning:` now generate an error
Display a link icon next to checkboxes if its true on link target but false on self
Fixed display issue with characteristics modifiers when manually modifying characteristics


## v1.1.138 — 2024-07-03

Added option to create modifier in constraint right click
Fixed created profiles being invalid until a characteristic is modified

## v1.1.137 — 2024-06-06

Fixed aliases saving improperly (might have to re-enter them)
Fixed goto not working sometimes


## v1.1.136 — 2024-06-05

Added some lines to make indent level clearer

## v1.1.135 — 2024-05-16

Allow negative numbers and floats in inputs
Added negative flag on constraints, so that -1 constraints are not ignored

## v1.1.134 — 2024-05-16

(no notes)

## v1.1.133 — 2024-05-14

Fix missing new scopes on constraints  & repeats

-- Previous changes -- 
Fix errors not displaying properly
Add all possible parents in scope choice
Add generic scopes in scope choice
Fix Invalid Scope error to check all possible parents

## v1.1.132 — 2024-05-14

Fix missing new scopes on constraints  & repeats

-- Previous changes -- 
Fix errors not displaying properly
Add all possible parents in scope choice
Add generic scopes in scope choice
Fix Invalid Scope error to check all possible parents

## v1.1.131 — 2024-05-14

Fix errors not displaying properly
Add all possible parents in scope choice
Add generic scopes in scope choice
Fix Invalid Scope error to check all possible parents

## v1.1.130 — 2024-05-01

Fixed created profiles not having parent's name
-- previous changes --
Added sticky scroll (can be enabled in settings)
changed defaultAmount to be able to input numbers separated by ,
made profiles/characteristics typeId get autofilled on paste/creation in scripts

## v1.1.129 — 2024-04-30

Added sticky scroll (can be enabled in settings)
changed defaultAmount to be able to input numbers separated by ,
made profiles/characteristics typeId get autofilled on paste/creation in scripts

## v1.1.128 — 2024-04-30

Added sticky scroll (can be enabled in settings)
changed defaultAmount to be able to input numbers separated by `,`
made profiles/characteristics typeId get autofilled on paste/creation in scripts

## v1.1.127 — 2024-04-09

Fix imported entries not being in conditions Filter By dropdown

## v1.1.125 — 2024-04-08

Added paste hook for scripts. (`hooks.paste`: Function)
Fixed `Space` not toggling selections

## v1.1.124 — 2024-04-05

Added  some basic scripts
Added support for simple user scripts and
Fix loading of aliases

## v1.1.123 — 2024-03-15

Add aliases UI

## v1.1.120 — 2024-02-27

Fix invalid objects when pasting (fills in missing ids and other fields)

## v1.1.119 — 2024-02-17

Added `Space` keybind: 
  If you currently have a search, forces all childs to show (also added in the right click menu)
  Otherwise, opens or closes the currently selected nodes
Fixed scrolling issues
Fixed issues with the new keybind
Moved source code to the same repo as the releases

## v1.1.118 — 2024-02-17

Added Space keybind:
If you currently have a search, forces all childs to show (also added in the right click menu)
Otherwise, opens or closes the currently selected nodes
Fixed scrolling issues

## v1.1.117 — 2024-02-17

Added Space keybind:
If you currently have a search, forces all childs to show (also added in the right click menu)
Otherwise, opens or closes the currently selected nodes

## v1.1.116 — 2024-02-16

Added `Space` keybind: 
  If you currently have a search, forces all childs to show (also added in the right click menu)
  Otherwise, opens or closes the currently selected nodes

## v1.1.115 — 2024-02-16

Fixed issue creating nodes introduced in previous version

## v1.1.114 — 2024-02-16

Added option to display primary category
Fixed issues with scrolling
Fixed some issues with the new category UI

## v1.1.113 — 2024-02-16

Added option to display primary category
Fixed issues with scrolling
Fixed some issues with the new category UI

## v1.1.112 — 2024-02-04

Fixed leading + being removed from attributes
Fixed reactivity issues with right panel

## v1.1.111 — 2024-01-30

Added "replace" modifier (replaces `arg` with `value`)
Fixed issues with loading a system when there is json files in the same folder.

## v1.1.110 — 2024-01-30

Profile links now display their target's characteristics
Added a button to goto the currently selected entry (between Sort & Collapse)
Fixed the Save All button sometimes being stuck
Filter By now shows if an entry shares the same ancestor(top-level parent)


## v1.1.109 — 2024-01-26

Fixed being unable to create associations on links

## v1.1.108 — 2024-01-26

(no notes)

## v1.1.107 — 2024-01-25

Added associations in the right click menu

## v1.1.106 — 2024-01-24

Fixed issues with the category editing UI

## v1.1.105 — 2024-01-24

Pasting multiple entries now properly keeps their id-related relations
Changed Id Scrambling to attempt to re-use the existing entries id, this means that Cut + Paste should not change the ids.

## v1.1.104 — 2024-01-23

Entries are now ordered according to their sortIndex in the LeftPanel
Improved the Sort Childs drag & drop
Added an auto sort button that can be configured to quickly sort entries without needing a script.
Added settings to hide sortIndex, costs, refs in the left panel
Fixed a reactivity issue with modifiers
Fixed an issue when setting an invalid id as a link's targetId
Fixed the left panel state not being saved properly
Fixed issues with popups
Fixed using the new UI for categories not marking the catalogue as changed
 

## v1.1.103 — 2024-01-19

Fixed missing UI to re-order childs on groups

## v1.1.102 — 2024-01-18

Removed some old code that was causing childId's that are link ids to be replaced by their targetIds (also present in the builder)
Multi-line textboxes now decode pasted HTML Entities (eg: `&nbsp;`)
Added UI to re-order an entries childs using the new sortIndex field (not supported by BS)

## v1.1.100 — 2024-01-16

grouped sharedProfiles

## v1.1.99 — 2024-01-11

Fixed some stuff not rendering due to recent changes to display collective on links
Added a tooltip explaining "Shared"

## v1.1.98 — 2024-01-10

Fix (collective) not being displayed on links that point to a collective entry
Fixed link creation

## v1.1.97 — 2024-01-10

Fix (collective) not being displayed on links that point to a collective entry

## v1.1.95 — 2024-01-10

Fixed category input not working with enter
Changed type "crew" & "mount" to save as subType with type="model"
Added a popup to sort profileTypes, not implemented yet in NR.
Fixed changing profileTypes order not marking catalogues as changed

## v1.1.94 — 2024-01-10

Fixed category input not working with enter
Changed type "crew" & "mount" to save as subType with type="model"
Added a popup to sort profileTypes, not implemented yet in  NR.

## v1.1.93 — 2024-01-05

Added new field noAlphabeticalSort
Added "prepend" modifier type (not supported by BS)
Fixed prepend labeling
Fixed popup background

## v1.1.92 — 2024-01-05

Added new field `noAlphabeticalSort`
Added "prepend" modifier type (not supported by BS)
Fixed popup background

## v1.1.91 — 2024-01-04

Fixed context menu background

## 1.1.90 — 2024-01-02

Fixed publication shortName being required for GithHub integration
Fixed issue with popup prompt "do not show this again"

## v1.1.89 — 2023-12-13

Added button to change format
Fixed system creation



## v1.1.88 — 2023-11-12

Fix automatic revision increment not working with Save All

## v1.1.87 — 2023-11-06

Added a button to refresh the systems found
Added a context menu option on sharedSelectionEntries to create a root link
Added a new UI for selectionEntry categories, which can be enabled in the settings
Added a popup when saving asking to increment revision, also shown with the auto increment feature enabled if there is no internet
Added a goto {profileType} in profiles context menu
Added an checkbox to show the full node path in the search tab
Added a warning icon when a file is externally changed

Rename characteristics & profiles when changing characteristicTypes & profileTypes
Changed the way references are displayed to include the full path to an entry (especially usefull for conditions)
Include all refs in the number of refs displayed as ({n} refs)
Track references from condition scopes

Fixed profile references not being updated when creating/changing a profile
Fixed an issue with the XML parser with empty nodes that have no attributes

Removed the Bug/Feedback buttons

## v1.1.86 — 2023-09-20

Add exactly constraints in quick constraints
Fix some icon issues on the github pages version of the editor
Attempt to fix an issue with conditions query 

## v1.1.85 — 2023-09-14

Fix data not being abled to be saved on v1.1.84, Make sure to downgrade or update if you are on v1.1.84

## v1.1.83 — 2023-08-30

Fix some issues with bad links & errors when adding a catalogue link

## v1.1.82 — 2023-08-06

Fix categories not being visible in the data editor

## v1.1.81 — 2023-08-01

Change entry order so links are ordered like their target would be
Fix entry order being inverted
Add a right click on condition to goto child/filter by
Fix creating an entry when having a filter not forcefully showing it properly
Scroll to newly created entries
Fix profile links not having their type displayed in grey text

## v1.1.80 — 2023-07-28

Display the source catalogue for categories, and add a right click to goto them.
Add a global search function (accessed by clicking on the loop icon the catalogues view)

## v1.1.79 — 2023-07-26

Fix Regenerate Id button visual
Fix Some textboxes background #22 
Fix xmlns being saved as `<xmlns>...</xmlns>` instead of `xmlns="..."`
Change Icon color do differentiate builder & editor #21 


## v1.1.78 — 2023-07-21

Make copy pasting id scrambling a bit smarter, if within the pasted entries are a scope's id, the scope id will be changed to whatever the targeted id became (also works with fields & childIds)
Added the ability to recursively (un)collapse nodes when holding shift!
Fix a reactivity issue with condition's scope name

## v1.1.77 — 2023-07-20

Change download filename to match the existing one

## v1.1.76 — 2023-07-18

Display collective
Add error for invalid scope
Change modifiers dropdown to not reset value when possible
You can put an id in the search box now and it will show entries with that id
Fix download not having the correct filename
Show error count when hovering the (!) in the catalogues view

## v1.1.75 — 2023-07-10

change new constraints id unless they are child of an entry

## v1.1.74 — 2023-07-10

Fix errors causing the program to freeze indefinitely sometimes
Fix some issues with errors not updating properly when using move to


## v1.1.73 — 2023-07-10

Fix bug when deleting constraints on an entry with multiple constraints

## v1.1.72 — 2023-07-05

Fix duplicate constraint id error goto not working
Fix filtering on categories showing the categories which are enabled but filtered out as errors
Fix `sharedInfoGroups` childs

## v1.1.71 — 2023-07-04

#16 Fix "sharedInfoGroups" being saved & read as "infoGroups"
Fix errors on links not updating properly
Make invalid category links visible with an error icon next to them
Make the goto when clicking on an error bring to a visible parent if the source of the error is not visible (eg a categoryLink)
Add an error when multiple constraints have the same id

## v1.1.70 — 2023-07-04

#13 Fix pasting inside editable div
#14 Fix publication cannot be unset
#15 Add Regenerate ID button

## v1.1.69 — 2023-06-28

Make publication selection a searchable dropdown
Make modifiers category selection a searchable dropdown
Fix `defaultSelectionEntryId` modifier UI
Fix error when a profile has no type not going away
Fix typo in initially created force
Fix the resizing handle bar sometimes being invisible
Add errors for duplicate ids
Remove warning when incrementing/decrementing a characteristic which is not a pure number
Display the changelog when prompting to auto-update
Improved loading speed

## v1.1.68 — 2023-06-24

Add errors for invalid condition childIds, there may be invalid errors that go away if you press load all refs

## v1.1.67 — 2023-06-23

added `defaultAmount`, which is the amount that should be set when creating an entry, or the min/exactly from constraints, whichever of those is higher
changed some stuff to try to fix auto-update

## v1.1.65 — 2023-06-23

Create some default stuff when initially creating a system, hopefully will reduce confusion for new data devs
Display errors wich allow you to go to the source of them when clicking on error icon on the top of the leftpanel
modifiable `defaultSelectionEntryId` (supported in the 1.9.6 of the newrecruit builder & in bluescribe apparently)
`exactly` constraint (supported in the 1.9.6 of the newrecruit builder & will prevent you from saving if opened in bs)

## v1.1.64 — 2023-06-21

Fix copy pasting not including costs

## v1.1.63 — 2023-06-20

Fix clipboard properly

## v1.1.62 — 2023-06-20

Fix force categoryLinks cant chose a target

## v1.1.61 — 2023-06-19

(no notes)

## v1.1.60 — 2023-06-19

Add increment/decrement modifiers for characteristics (seems to work on BS.)

## v1.1.59 — 2023-06-19

Fix the fix for publications
Add some tooltip for confusing options such as collective & library

## 1.1.58 — 2023-06-17

Fix unziping files when importing trying to fetch them as if theyre a url
Fix imported publications not being selectable

## v1.1.57 — 2023-06-17

(no notes)

## v1.1.56 — 2023-06-16

Fix contextmenu copy/paste/cut 

## v1.1.55 — 2023-06-16

(no notes)

## v1.1.54 — 2023-06-16

Fix catalogueLinks creation
Fix selectionEntryGroup being selectable in root entry links

## v1.1.53 — 2023-06-15

should fix issue with entry links / costs

## v1.1.52 — 2023-06-15

(no notes)

## v1.1.51 — 2023-06-15

(no notes)

## v1.1.50 — 2023-06-15

Fix the search being wonky when switching catalogues

## v0.0.65 — 2023-06-23

test auto updater

## v1.1.49 — 2023-06-15

Fix missing allowed children (categoryLinks, characteristics, characteristicTypes)

## v1.1.48 — 2023-06-15

Add the same the same gray text there is in the tree view when looking for something to link to
Fix some missing scopes on repeats
Fix missing costs limit field 

## v1.1.46 — 2023-06-14

fix `defaultCostLimit` field not being saved

## v1.1.45 — 2023-06-14

Fix repeats not being being read correctly, losing the `repeats` field
Add default hidden=false to created entries

## v1.1.44 — 2023-06-14

Fix pasting/adding validation being inverted


## v1.1.43 — 2023-06-14

Fix loading bug

## v1.1.42 — 2023-06-14

Fix copy paste not caring if pasted childs are allowed or not
Fix info links bug #6 
Add an error icon on links with no target
Fix missing fields in save 
Add defaultCostLimit

## v1.1.40 — 2023-06-13

Fix `In both catalogues and game system files, the shared* root arrays should have elements that have "basic" names. For example, sharedRules->rule (currently it's sharedRules->sharedRule).`

## v1.1.39 — 2023-06-13

Fix a couple other jagged icons

## v1.1.38 — 2023-06-13

Fix jagged icons

## v1.1.37 — 2023-06-13

Add support for NR themes
Add settings, wich allow choosing between Dark & Light theme
Fix conditions not being deletable sometimes

## v1.1.36 — 2023-06-13

#5

## v1.1.35 — 2023-06-12

fix missing xmlns

## v1.1.34 — 2023-06-12

Fix missing infoLink childs

## v1.1.32 — 2023-06-12

Fix conditions with catalogues displaying the catalogue id instead of name
Fix instanceof conditions/filter by 
Fix some issues with scroll

## v1.1.31 — 2023-06-11

Fix catalogue links having no type (#3)

## v1.1.30 — 2023-06-11

Fix performance on filter by & links target selection
Change collapse last open level -> Collapse all
Add default profileType to profiles


## v1.1.29 — 2023-06-10

Fix missing costTypes on modifiers
Add Quick Conditions  on modifiers & modifierGroups
Add Quick Modifiers on constraints
Add Quick Constraints on categories

## v1.1.28 — 2023-06-10

Fix links

## 1.1.27 — 2023-06-10

Fix modifiers on profiles not having characteristics as choices
Make links (discord, github) open using the default browser

Add experimental github integration, right now it only auto-increments the revision
You can 'enable' github integration by creating a Publication in the .gst with these fields:
Name: `Github`
Short Name: `{owner}/{name}`, eg: `BSData/wh40k`
Publication Url: repo url, eg: `https://github.com/BSData/wh40k`
Save and then reload the system, 
A github icon should then show next to its name.


## v1.1.26 — 2023-06-10

Fix sorting by type not taking undefined into account (#2)

## v1.1.25 — 2023-06-10

Fix save all not working

## v1.1.24 — 2023-06-10

Add Undo & Redo buttons

## 1.1.23 — 2023-06-10

Fix copy/paste
Add missing checkboxes for shared, child selections, child forces

## 1.1.22 — 2023-06-09

Fix editing an imported entry not making its parent catalogue as unsaved
Fix horizontal scrollbar being thick
Fix profiles .typeName field not being set
Fix some issues with sorting
Add Type to sorting orders
Add info about how to return to the catalogue view within it
Links now shows their target's entries as greyed out childs

Display Costs to reduce confusion on Links without costs
Move To context menu option now allows you to chose wether to move to Shared or Root, and now works for categories, costs, etc.
Make it possible for a link to have an unset cost in order to use it's target cost instead, rather than defaulting to 0

## v1.1.21 — 2023-06-08

Add ability to disable sorting real quick
Fix modifiers on selectrionEntryGroups
Fix force categories sorting not being disabled

## v1.1.20 — 2023-06-08

Fix copy paste not working
Add alt-click to follow/goto or open the refs panel

## 1.1.19 — 2023-06-08

Add possiblity to create json/zipped systems
Fix copy pasting not working in textboxes

## v1.1.18 — 2023-06-08

Filter By results are now more similar to bs
Fix some reactivity issues
Reduce lag when clicking on entries wich have Filter By
Fix save all button being too big & showing up outside of catalogues view
Add ability to delete a system for browser version
Improve move to to work with info & nested entries

## v1.1.17 — 2023-06-05

Fix back button issue after having naviguated more than once

## v1.1.16 — 2023-06-05

Fix constraints ids beings scrambled when pasting, breaking modifiers.
Add back/forward button 
Fix Unsaved Changes popup showing up twice
Fix copy/paste/cut on mozilla
Fix default condition & selectionEntry not having a type
Fix adding and then removing an entry until there is none of that type left causing issues in the export/save
Fix Download button downloading an outdated version of the catalogue

## v1.1.15 — 2023-06-04

Add missing refs from modifiers, profileTypes, catalogue imports
Rename Load All to Load All Refs as that is its only use right now
Fix and display comment field
Fix Nested Modifiers not finding the parent properly
Fix you have unsaved changes popup not showing up when leaving from the catalogue list view
Fix Costs missing for Links
Fix Repeats not being editable
Fix collective not being editable on shared entries
Set "battleScribeVersion" to 2.03 when creating systems/catalogues


## v1.1.14 — 2023-06-02

Reduce lag on clicking Show Imported checkbox and fix bugs with displaying imported entries
Fix lag on opening profileTypes 
Fix created catalogues not having a path at all or not having .cat extension
Added a button to collapse the last open level (clicking it a few times effectively collapses everything)

## v1.1.13 — 2023-06-02

Fix some bugs with saving
Enable zip compression when saving .catz/.gstz
Fix issues with selection on nodes that have no id 
Display number of categories currently selected in entries

## v1.1.12 — 2023-06-02

Fix modifiers on force categories
Editing categoryLinks now reloads the catalogue
Added a create system button

## v1.1.11 — 2023-06-01

dummy release to test actions

## v1.1.10 — 2023-06-01

fix gameSystem not being selectable within the editor view

## v1.1.9 — 2023-06-01

make clipboard use json, so you can copy from a window to another, or from the browser to a window, or even view/edit the json
The issue that prevented opening the app multiples times has also been fixed
added a context menu option to move categories up or down

## v1.1.8 — 2023-06-01

Fixed forces not having category/force in the context menu
Disabled sorting on forces
Fix Alt F4 Unsaved Changes popup not showing up
Fix loading a system from the initial systems tab not unloading the currently loaded catalogues


## v1.1.7 — 2023-05-31

Fix some bugs with saving

## v1.1.6 — 2023-05-31

implement catalogueLink edition 
ignore profile/rules checkbox for the search


## v1.1.5 — 2023-05-31

Fix follow/goto not working in release

## v1.1.4 — 2023-05-31



## v1.1.3 — 2023-05-30

Show a list of systems to load on startup, taken from the ${homedir}/Battlescribe/data folder

## v1.1.2 — 2023-05-29



## v1.1.1 — 2023-05-29



## v1.1.0 — 2023-05-28

Now saves & imports from file system

## v1.0.0 — 2023-05-27



