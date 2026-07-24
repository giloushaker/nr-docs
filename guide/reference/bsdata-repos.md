# BSData Repositories

[BSData](https://github.com/BSData) is the community organization hosting game
data repositories. As of July 2026 it has **169 repositories (92 active, 77
archived)**. These are useful as **reference examples** — real, maintained data
you can open in the NR editor to see how established systems model their rules.

::: tip Browse the live list
This snapshot will drift. Browse the current set at
[github.com/orgs/BSData/repositories](https://github.com/orgs/BSData/repositories).
:::

## Game data repos worth studying

Larger, actively-maintained systems make the best reference material — they've
hit the edge cases you'll hit. Sorted roughly by popularity/activity:

| Repo | Game |
|---|---|
| [wh40k-10e](https://github.com/BSData/wh40k-10e) | Warhammer 40,000: 10th Edition |
| [wh40k-11e](https://github.com/BSData/wh40k-11e) · [wh40k-11e-mfm](https://github.com/BSData/wh40k-11e-mfm) | Warhammer 40,000: 11th Edition (+ MFM points snapshots) |
| [wh40k-killteam](https://github.com/BSData/wh40k-killteam) | Warhammer 40,000: Kill Team |
| [horus-heresy-2nd-edition](https://github.com/BSData/horus-heresy-2nd-edition) · [3rd](https://github.com/BSData/horus-heresy-3rd-edition) · [1st](https://github.com/BSData/horus-heresy-1st-edition) | Horus Heresy |
| [warhammer-age-of-sigmar](https://github.com/BSData/warhammer-age-of-sigmar) · [age-of-sigmar-4th](https://github.com/BSData/age-of-sigmar-4th) | Age of Sigmar |
| [warhammer-age-of-sigmar-warcry](https://github.com/BSData/warhammer-age-of-sigmar-warcry) | AoS: Warcry |
| [whfb](https://github.com/BSData/whfb) | Warhammer Fantasy |
| [The-9th-Age](https://github.com/BSData/The-9th-Age) · [essence-of-war](https://github.com/BSData/the-9th-age-essence-of-war) | The 9th Age |
| [middle-earth](https://github.com/BSData/middle-earth) | Middle-earth SBG |
| [bloodbowl](https://github.com/BSData/bloodbowl) · [third-season](https://github.com/BSData/bloodbowl-third-season) | Blood Bowl |
| [mordheim](https://github.com/BSData/mordheim) | Mordheim |
| [adeptus-titanicus](https://github.com/BSData/adeptus-titanicus) · [at-2018](https://github.com/BSData/at-2018) | Adeptus Titanicus |
| [Horus-Heresy-Legions-Imperialis](https://github.com/BSData/Horus-Heresy-Legions-Imperialis) | Legions Imperialis |
| [battlefleetgothic](https://github.com/BSData/battlefleetgothic) | Battlefleet Gothic |
| [bloodbowl](https://github.com/BSData/bloodbowl), [star-wars-armada](https://github.com/BSData/star-wars-armada), [swxwing](https://github.com/BSData/swxwing) | Other GW / FFG systems |

Dozens more cover smaller games (Bushido, Argatoria, Deadzone, Frostgrave,
Gaslands, Bolt Action, Flames of War, Kings of War, Conquest, Marvel Crisis
Protocol, and many others). See the full org list for those.

## The one non-game repo worth knowing

[catalogue-development](https://github.com/BSData/catalogue-development) — its
wiki (Getting Started, Data Author Guide, Common Catalogue Patterns) is the most
complete authoring reference that exists today. It's BattleScribe-era and
partly outdated, but the core modeling concepts still apply.

::: warning Ignore the BSData publishing machinery
The rest of BSData's tooling — `gallery`, `TemplateDataRepo`, `schemas`, and
the CI actions (`publish-catpkg`, `process-release-command`, `check-datafiles`)
— targets the dead BattleScribe distribution model and is outdated/broken. For
NewRecruit you need none of it: a repo with `.gst`/`.cat` at the root loads
directly. See [Publishing Your Data](/guide/publishing).
:::
