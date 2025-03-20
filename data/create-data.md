---
title: Creating Data from scratch
categories: [data]
tags: [guides]
---

1. Open the NR Data Editor
2. Select Create System, enter a name and select it. you should end up on a page that looks like this:
3. Create a new catalogue for each faction that is available in your game, these will be available as a choice in this selector:
4. Create Forces
   Open the game system, which is the file which has two cogs as an icon
   Force Entries should contraint an entry named Default Force, if it doesn't, right click on Force Entries and select "Force"
5. Create Categories
   In Category Entries, create the top-level categories that your units will be sorted in, eg: `Troops`, `Characters`, `Monsters` etc
6. Set Force available Categories
   Go back to your Force Entries and right click the Force within and select Category
   In the menu on the right, select one of the categories you added, this will cause all units with that category to be available as a choice within that Force
7. Create Units
   Now right click on Root Selection Entries and select "Entry" to add a new unit
8. Set Unit Primary Category
   By default they will show in the "Uncategorized" category, to fix that, add one of the categories which you made available in the Force to your new unit
   You then need to make that category "primary" which hints that it should be used for grouping the units in. An entry may only have one primary category.
   Other non-primary categories may be used for logic and displaying on datasheets.
9. Add child entries
14. Add min/max constraints on entries 
11. Add Points costs
   Set default cost limits
12. Add min/max constraints on force categories
13. Add profiles
