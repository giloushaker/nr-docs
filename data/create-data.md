---
title: Creating Data from scratch
categories: [data]
tags: [guides]
---

## 1. Create System 
   Open the [NR Data Editor](https://github.com/giloushaker/nr-editor/releases)  
   Select `Create System`, enter a name and select it. you should end up on a page that looks like this:
## 2. Add Factions
   Create a new catalogue for each faction that is available in your game, these will end up being available as a choice in this selector:
## 3. Add Forces
   Open the game system, which is the file which has two cogs as an icon  
   `Force Entries` should contain an entry named "Default Force", if it doesn't, right click on `Force Entries` and select `Force` to create one.
## 4. Add Categories
   In `Category Entries`, create the top-level categories that your units will be sorted in, eg: "Troops", "Characters", "Monsters" etc
## 5. Set Force available Categories
   Go back to your `Force Entries` and right click the force within and select `Category`
   In the menu on the right, select one of the categories you added in `Link`>`Target`, this will cause all units with that category to be available as a choice within that force
## 6. Create Units
   Now right click on `Root Selection Entries` and select `Entry` to add a new unit
## 7. Set Unit Primary Category
   By default they will show in the "Uncategorized" category, to fix that, add one of the categories which you made available in the Force to your new unit  
   You then need to make that category "primary" which hints that it should be used for grouping the units in. An entry may only have one primary category.  
   Other non-primary categories may be used for logic and displaying on datasheets.  

## 8. Add child groups and entries
## 9. Add min/max constraints on entries 
## 10. Add Points costs
   Set default cost limits  
## 11. Add min/max constraints on force categories
## 12. Add profiles
