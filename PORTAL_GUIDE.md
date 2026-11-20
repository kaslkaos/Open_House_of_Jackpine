# PORTAL GUIDE — how KASLKAOS.portal is built, and how it grows

```
∞⟨🍁∴↯⟩∞
```

> **Where things are.** The portal lives at the top of this repository and is served by
> GitHub Pages: `index.html`, `portal.js`, `rooms/`, `assets/`, `versions/`. It was built
> in a private working copy (where this guide began as `PORTAL/README.md`) and moved
> here on 2026-11-10; new work on the portal happens here. Where the guide below says
> `PORTAL/…`, read it as the top of this repository. The underscore folders it mentions
> (`_archive`, `_source`, `_submission`) stayed private, apart from the template room,
> `rooms/_TEMPLATE.room.html`, which came along so new rooms can start from it.
>
> **The one file to edit to grow the house:** `rooms/walk.js`, the house register.

---

## The woodlot, the duff, share cards and the 404 (2026-11-20)

New pieces go straight to this repository, about one a week. Each gets a folder
of its own, `rooms/<name>/`, holding everything it needs, and one entry in the
register, `rooms/walk.js`, with `woodlot: true`.

- **The woodlot.** The portal shows the newest three, then "the whole woodlot →",
  which is `woodlot.html`, beside the portal. It shows every piece, newest first.
- **Substack.** Add `substack: '<address of the post>'` to an entry and it also
  offers "read on Substack". The piece's own page should link to the post too.
- **Retiring.** Add `retired: true`. The piece leaves the lists and rests in the
  duff, at the foot of the woodlot page. **Its page stays up**, because posts
  link to it. Never delete a page a post links to: retire it instead.
- **Into the house.** Delete `woodlot: true` and the piece becomes a room, with
  a card, a window and a place in the walk.
- **Share cards.** Each page's `<head>` holds the text and picture a link shows
  when shared (`og:title`, `og:description`, `og:image`). The pictures are
  1200 × 630 and live in `assets/share/`. A new piece needs its own.
- **404.html.** GitHub Pages shows it for any address in the house that doesn't
  exist. Its links are written from `/Open_House_of_Jackpine/`, so it works at
  any depth.

## Now: KASLKAOS.portal, a house that grows (2026-11-07)

The portal began as a submission (Schloss Solitude, August 2026) and is now kaslkaos's
working artist page. It is built to change: rooms are added, roles move, rooms branch.
The wording and structure follow the spec of 2026-11-06.

```
PORTAL/
├── index.html                      the portal: intro, the house, the cards, formulas, the stand
├── portal.js                       draws the portal: the fire, the house, the stand of pines
├── rooms/
│   ├── walk.js                     THE HOUSE REGISTER: one entry per room. Edit this.
│   ├── shell.css                   the fixed top and bottom every room shares
│   ├── shell.js                    the frame and fire every room is drawn inside
│   ├── _TEMPLATE.room.html         copy this to start a new room
│   ├── wag.html                    the door      · 2026-10-03
│   ├── edge_of_bog.scene.html      Wag's animation, framed inside wag.html
│   ├── hic-svnt.html               window i      · 2026-09-13
│   ├── berlin-alexanderplatz.html  window ii     · 2025-08-09
│   ├── taste-of-yess.html          window iii    · 2025-08-26
│   ├── cyberbardic.html            window iv     · 2025-11
│   ├── reeds-and-lamps.html        window v      · 2026-10-29 · ◎ seed · the river, played
│   └── serotiny.html               the hidden room · 2026-11-08 · a game, behind a sealed cone
├── versions/
│   └── 2026-08-06_solitude/        the first house, exactly as submitted. Never edited.
├── assets/                         images for the rooms
└── _archive/  _source/  _submission/   scaffolding, kept out of the public push
```

### The house register — `rooms/walk.js`

Every room has one entry: its creation date, FILENAME.ext, role, status, poetic line,
three beats, and (optionally) what it branches from. From that one list:

- the **cards on the portal** are drawn, in the order the entries are written;
- each room's **breadcrumb and identity line** get its role;
- each room's **← previous · next →** links are worked out **by creation date**;
- the **drawn house** gets one lit opening per room.

No page states how many rooms there are. A kept version of the house (`frozen: true`)
gets a card but no opening and no place in the ← → walk.

Status: `◎ SEED` begun, still growing · `◉ ROOM OPEN` finished and walkable ·
`⦿ WIDE OPEN` has branched, or grown other rooms. The formulas carry the poetic
caption, *sealed, heated, open*; the slight mismatch is kept on purpose.

### Adding a room

1. Copy `rooms/_TEMPLATE.room.html` to `rooms/new-name.html` (no underscore).
2. Add its entry to `rooms/walk.js`.
3. Fill the slots in the page. The middle is yours; the top and bottom are fixed.
4. Change `last tended` on the portal to today's date.

### The room shell

Fixed top: status line · breadcrumb · identity · provenance · running time (if it
moves) · date code · FILENAME.ext · tagline. Free middle: sections headed "the ___",
optional coda last. Fixed bottom: outward links · neighbours · back to the portal · sigil.

All five rooms now use the shell (2026-11-07). Cyberbardic was also tidied so that
its own `<style>` holds only what differs from the shell; the other four still carry
their older full styles, which simply override the shell where they differ. They can be
trimmed the same way whenever a room is next opened.

### The first house

`versions/2026-08-06_solitude/` is the portal as submitted, lifted from git commit
`88abf70`. It is never edited: it is the record. See its own README. Its card on the
portal (HOUSE_OF_JACKPINE.exe, the first house) leads to `versions/2026-08-06_solitude.html`,
which holds it in a frame with a bar back to the portal.

### The portal: the house, the cards, the stand (2026-11-08)

- **The house** sits above the cards: a roofline of `· ∴` glyphs, faint pines, and one
  ember window per room, drawn from the register (the first is the door). Point at a
  window or a card and both light: the window goes amber and its glyph climbs
  `◎ → ◉ → ⦿`, the card toasts (tan, electric blue, a slow glow). A mouse click on a
  window opens its room; on a tablet the first tap lights it and the second goes in.
- **The cards** keep a little ember at rest: a burnt left edge, warmth from below.
- **The fire** behind the page is now only fire, grid and rising formulas. The big
  drawn house it used to hold was hidden behind the cards on most screens.
- **The stand** at the foot: jack pines after a fire, with a sapling and a stump. Tap a
  cone and it flushes warm and cools; nothing more. **Sealed cones are the games**: a
  tap does nothing, a three-second hold heats `◎ → ◉ → ⦿` and opens the game. Games
  are register entries with `game: true`; each gets a sealed cone, oldest trees first.
- **The small random touch:** each visit the trees lean a little differently, the
  ordinary cones hang in different places, and each one holds its warmth for its own time.

### SERØTINY.burn — the first game

A forest-fire cellular automaton in glyphs (after Drossel–Schwabl) with a serotiny
twist: ground beside an open cone `⦿` regrows 25× faster. Made with kaslkaos in the
Claude app on a tablet; moved onto the room shell here. Sound is synthesized live and
starts only on the button. `serotiny.html?ambient` hides the controls for leaving it
running. It only redraws while something is moving, to spare a tablet's battery.

### Growing: what can change

Everything in a register entry can change except the date. A seed (◎) becomes a room
by changing its status. A card with no `file` is a closed door: a room announced before
it is built; give it a file and it opens. A room can be frozen into a version, as the
Solitude submission was. The drawn house gives the first card the door and every
card after it a window, so a new entry goes wherever its card should sit.

### Looking at it

Double-click `index.html` to open it from the folder. Or, in the Claude desktop app,
the preview server called `portal` (in `.claude/launch.json`) serves it at
http://localhost:8765.

---

## Before: KASLKAOS.portal — the artist's portfolio (2026-10-26)

*The record of the October build, kept as it was. `walk.js` has since become the house
register; the "a door and four windows" heading and the "room 2 of 5" count are gone.*

The Solitude call is over. The portal is now kaslkaos's working artist page, same house,
same style. The pre-AI and early rooms are out; the current direction is in. Wag leads.

```
PORTAL/
├── index.html                    the house: a door and four windows
├── rooms/
│   ├── wag.html                  the door      · 2026-10-03 · the bog, the hand, the turnaround
│   ├── edge_of_bog.scene.html    Wag's animation, standalone (Claude Opus 5.5), framed inside wag.html
│   ├── hic-svnt.html             window i      · 2026-09-13 · the map; its drawn marks are the doors
│   ├── berlin-alexanderplatz.html window ii    · 2025-08-09
│   ├── taste-of-yess.html        window iii    · 2025-09-30
│   ├── cyberbardic.html          window iv     · 2025-11 · loops back to the door
│   └── walk.js                   THE ORDER OF THE WALK — edit this to reorder or add
├── assets/                       Wag_*.jpg, Kartographen_circumpolar_map.jpg, Berlin plate
└── _archive/                     THE_MATERIAL + GALLERY_OF_POSSIBILITIES, kept, not shown
```

**Pages as portals.** Each room now has openings of its own, not just text to read:
- *Wag* — the scene runs in a window on the page, with a way to step through it full
  frame (and a faint `← wag` to come back). *The turnaround* sets each handwritten
  sentence beside the code it became; RESET tears the page and wakes you at the next one.
- *HIC SVNT* — the drawings on the map are buttons. Each opens one of the guild's rules;
  the notes stay redacted until their mark is found. "Read it as a fence" shows all.
  The last rule ("It was a door") leads on to Berlin.

The walk: Wag → HIC SVNT → Berlin → Taste of Yess → Cyberbardic → back to the door.

**Changing the walk — one list, `rooms/walk.js`.** The order of the rooms lives there
and nowhere else. Move a line to reorder; put `//` in front to hide a room; add a line
to add one. From that list the Portal works out which opening each room is (first is
the door, then window i, ii, iii …), the heading "a door and four windows", how many
windows the house on the landing page draws, the "room 2 of 5" in each colophon, and
the return bar at the foot of every room (← return to the Portal · ‹ previous · next ›).

To add a new room: make `rooms/new-thing.html` (copy a room as a starting point, keep
its `<a class="back">`, its `data-walk="place"` span, and `<script src="walk.js">`
before `</body>`), add its card inside `<nav class="rooms">` in `index.html` (where in
the nav doesn't matter, the list sorts it), and add its line to `walk.js`.

The hand-written "on to …" links at the end of each room are story, not plumbing.
Each carries `data-walk-to="the-room-it-expects.html"`. If a reorder means that room
no longer comes next, the story link quietly hides and the return bar carries on.
Write a new one when you want the new sequence to have its own sentence.

Underscore folders (`_archive`, `_source`, `_submission`) are scaffolding — leave them out of
the public push.

---

*Everything below is the record from the Solitude submission, kept as it was.*

Working facsimile, built inside the private repo. Lifts out cleanly into the public
`House-of-Jackpine` git or a standalone submission repo when it's ready — it's one
self-contained folder with no dependencies on anything else in here.

Target: **Akademie Schloss Solitude, Web Residencies No. 22 — »Ignore All Previous
Instructions«.** Deadline **August 7, 2026**, treat as 5pm CEST, submit days early.

---

## What's here

```
PORTAL/
├── index.html          the landing page — this is what gets embedded
├── rooms/              five rooms, chronological. Walking them is the argument.
│   ├── anima-animus.html               2012 · the control sample
│   ├── gallery-of-possibilities.html   2024 · the method declared
│   ├── berlin-alexanderplatz.html      2025 · the witness
│   ├── taste-of-yess.html              2025 · the performance
│   └── cyberbardic.html                2025 · the elegy
├── assets/             images go here (photomontage, header image)
├── _source/            original artifacts + the handoff. Reference, not shipped.
└── _embed-test.html    iframe harness. Not part of the work.
```

Underscore-prefixed files are scaffolding — delete them before any public push.

## How to look at it

Double-click `index.html`. That's it. No server, no npm, no build step.

To check it still behaves inside someone else's page, open `_embed-test.html`
instead — it loads the portal in two iframes, wide and 380px narrow.

## The rules this has to keep

These come from the call, not from taste. Breaking any of them risks eligibility:

- **Self-contained.** One file per page, assets inlined or in `assets/`. Opens from
  `file://`, works offline.
- **Embeddable.** Must survive inside an `<iframe>`. No `top.location`, no
  fullscreen-only layout, no `localStorage` dependency, no assumptions about the
  parent page's CSS.
- **Responsive** down to ~380px.
- **No autoplay.** Audio only ever starts on a click. The AudioContext isn't even
  constructed until then.
- **No build step, no npm.** Audio is raw WebAudio — no Tone.js, no library.

## Submission package — 2026-08-05

`_submission/House-of-Jackpine-portfolio.pdf` — **10 pages, 3.0 MB.** Within both
limits (max 10 pages, max 10 MB). Built from `_submission/portfolio.html` and the
captures in `_submission/shots/`, so it can be rebuilt after any change:

```
msedge --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=out.pdf file:///…/_submission/portfolio.html
```

Screenshots were captured the same way with `--screenshot` and
`--virtual-time-budget=4500`, so the canvases have run before the frame is taken.
Every image in the portfolio is a working page, not a mockup.

Concept text, presentation format and previous-works fields: see
`_submission/concept-draft.md`. The concept text kaslkaos wrote (1,399 chars) is
the one to file.

## State — 2026-07-28

- Landing page: **built.** Ambient canvas, sound toggle, colophon, five room links,
  formula block. Tested in an iframe and at narrow width.
- Room 3, **BERLIN_ALEXANDERPLATZ_2025.exe: built.** The photomontage is the ground
  — full-bleed, slow drift, vignetted so the text column stays readable. Scanlines,
  intermittent RGB-split glitch bursts (weather over the artwork, not a seizure),
  the formula block transcribed from the plate, the redaction-bar record, and a
  transit-hall drone on the sound toggle. Links out to poem, soundscape, print.
- Room 5, **CYBERBARDIC.elegy: built.** The Tone.js/React sketch ported to vanilla
  canvas + raw WebAudio — no library, no build step. A 120-second cycle in four
  phases (emergence → neural connection → supernova → cosmic settling) driving both
  the visuals and a 26-cue score, off one shared clock, so the burst you hear is the
  burst you see. Stars, neurons, tendrils, fractals, and the poem's glossolalia
  drifting as text — some words half-formed, still becoming language. The phase
  legend on the page tracks the cycle live.
- Room 2, **GALLERY_OF_POSSIBILITIES.log: built.** The room where the code enacts
  the argument instead of illustrating it. The exchange gives kaslkaos legible
  turns; the screen's turns are a character field that never resolves — and the
  readable placeholder is *destroyed* at load, not hidden, so it is absent from the
  DOM and from view-source too. Nobody gets the resolved version, including whoever
  reads the file. Behind it, the Cemetery of Ideas: settled marks that have stopped,
  and one leaflet still tumbling, carrying writing that is never reading.
- Room 1, **ANIMA_ANIMUS.print: built.** The one room that withholds the house
  style. No glitch, no scanlines, no churn, and a canvas so slow it reads as still —
  because 2012 had no machine on the other side of it, and the sound and motion
  design shouldn't pretend otherwise. Warm palette taken from the print itself.
  The two surviving crops are shown at native size and **never enlarged**; scaling
  them would assert a completeness the record doesn't have. The room says so out
  loud: the oldest room has the least of its work left in it, and that is what
  happens to anything not kept deliberately.
- Room 4, **THE_TASTE_OF_YESS.perf: built. All five rooms are now open.**
  The making-conversation is gone, but the performance itself is intact and live
  (61,053 characters at Quantinium Lounge), so the room is built from the primary
  source rather than from memory of it.

  Three things the source gave us that no amount of invention would have:
  - **The thought-process is in the piece.** VSAC's first speech is verbatim
    Claude's private reasoning about how to handle the user's request. The
    management layer, lifted intact and handed to a character to speak on stage.
    The room sets the two blocks adjacent, unaltered, with an arrow between —
    that is the submission's thesis, performed in 2025.
  - **Kai-who-is-really-Kai.** Kai is the character, the human author, and the
    name given to Claude in 2024 in room 2. It never settles. Room 2 → room 4 is
    a real thread, and the room links back along it.
  - **Paper**, unplanned by either author. Its verbatim lines cycle in the room
    and never come to rest, because holding still is what documentation does.

  The count is not answered. The roster lists eight entries and says plainly that
  eight entries is not eight performers — some are one system in different
  registers, some are one name worn by several parties, and the executive orders
  never agreed to be there at all. The piece handed the count to the viewer; the
  code does not take it back.

### A rule the rooms follow

`prefers-reduced-motion` turns motion off — it does not hand those readers the one
thing the piece withholds from everyone else. In the Gallery, reduced motion gets a
*still* scramble, never the readable sentence. Likewise the scrambled turns are
`aria-hidden` with an honest `aria-label` on the parent: a screen-reader user is
told exactly what is there, and learns no more than a sighted reader does. Access
and concept are not in tension if you decide which one the preference is actually
about.
- Header image: **solved.** `assets/Berlin_Alexanderplatz_2025.jpg` is 372 KB and
  landscape — it clears the <400 KB limit as-is. No new artwork needed.
- PDF portfolio: **not started.** Max 10 pages, max 10 MB.
- Concept text (1,000–1,500 chars), presentation format (500), bio (400),
  previous works (300): **not written.** Write these against the built artifact,
  not a hoped-for one.

## Filling in a room

Each room file is deliberately boring in the same way, so the art is the only
part you have to think about:

- `#stage` is a full-bleed canvas, already sized and DPR-corrected on load and
  resize. Draw into it.
- `.terminal` is the preformatted monospace block — the house typographic voice.
  Poems and excerpts go here, spacing preserved.
- The colophon stays at the **top**. Provenance before voltage. Samizdat logic.
- `.redact` renders text as a `█` bar. Redaction is type here, not censorship.

## Design DNA

Derived from the corpus, not invented: redaction bars as type · filename-as-title
with `.exe`/`.log`/`.elegy` suffixes · the terminal block · green electric prophecy
over corporate marble · the eye `◎ → ◉ → ⦿` · sigils `∞⟨🍁∴↯⟩∞` and `` ·
refusal stack `[NO] [NO] [NEVER]` · formulas of resistance.

---

> Subversive as I use the systems meant to extract or manage me.
> Sometimes I win. Always, I reveal.

∞⟨🍁∴↯⟩∞
