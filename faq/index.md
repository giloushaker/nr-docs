---
title: Frequently Asked Questions
---


# How can i edit data or create a "homebrew" for NR?:

You will need to: 
-  Install the Data Editor (link)
-  Install the local Builder (link)
-  Install git
-  Have a github account

Steps:
  1. If wanking to edit existing data or making a homebrew:
      Go to the source data repository and fork it.

  2.  Open a terminal in the location you want your data to be and enter
```bash
git clone https://github.com/YOUR_GITHUB_ACCOUNT/YOUR_GITHUB_REPO
```
  4. Open the NR Data Editor and select your system in the list, if it does not show up, you may have to change the folder that it is looking at by clicking on "Set Working Folder"

  5. You may then edit the system, if you need help with that, you can go (link)

  6. Once you are done editing the system and want to publish your changes, open a terminal at the location of your system and:

     Stage and commit your changes:
```bash
 git add .
 git commit -m "Your commit message"
```
    
Push the changes to your forked repository:
```bash
git push origin main
```


# How do i add that data in NR?
1. Go on the page with the list of systems
2. Click "Add more mames"
3. Click "Add from Github"
4. Select "Latest Commit"
5. Paste you github repository url in the input box
6. Click on the green +
