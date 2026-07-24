# API

NewRecruit is not a general-purpose data API, but there is one endpoint that data
authors use: forcing a refresh of a published system.

## Force a system update

```
GET https://newrecruit.eu/api/check-for-update/<system>
```

Systems on the built-in game list are re-checked automatically about once an
hour. This endpoint checks immediately instead, so a change can reach players as
soon as you publish rather than after the next scrape.

`<system>` identifies your system. NewRecruit matches it against the system's id,
short name, name, or repository URL, so any of those works.

It compares your repository's latest release (or commit, following the system's
configured ref) against the version NewRecruit currently has. If they differ, it
pulls the update and returns the result. If nothing changed, it returns the
current state:

```json
{ "updated_count": 0, "last_updated": "2 hours ago" }
```

This only applies to systems on the built-in list, which are the ones NewRecruit
tracks in its database. A system a player added themselves with **Add from
Github** updates when that player refreshes; see
[Publishing Your Data](/guide/publishing#updating-published-data).

## Use it from a GitHub Action

Call the endpoint at the end of your publish workflow so a release triggers an
immediate refresh. Established systems ship a workflow that does exactly this; for
a reference, see the `nr-refresh` workflow in the Horus Heresy 3 data repository.
