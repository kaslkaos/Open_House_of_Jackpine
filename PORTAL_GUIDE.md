# PORTAL GUIDE — how the house grows from here

```
∞⟨🍁∴↯⟩∞
```

This is the guide for **future work** on KASLKAOS.portal: kaslkaos's working artist
page, served by GitHub Pages from this repository. It is written for whoever builds
next, human or AI. Keep it current: when something here stops being true, change it.

The history of how the house came to be (the Solitude submission, the October
portfolio, the November house) is not kept here. It is in the growth rings: this
file's git history, and the private working copy, where this guide began as
`PORTAL/README.md`. `versions/2026-08-06_solitude/` is the first house itself, kept
exactly as it was sent.

**Pushing to this repository publishes.** Whatever reaches GitHub is public within a
minute or two. Commit as often as you like; push when it is ready to be seen.

---

## The rules every piece keeps

- **Tablet first.** kaslkaos builds on a laptop but looks, plays and tests on a tablet.
  Anything that happens on hover must also happen on a tap. The portal's pattern: the
  first tap lights a thing, the second goes in. Works down to about 380 px wide, with no
  sideways scrolling.
- **No autoplay.** Sound starts only on a button press. Nothing plays without you.
- **Self-contained.** No build step, no npm, no libraries. Plain HTML, CSS and
  JavaScript, and raw WebAudio for sound. A page should open by double-clicking it in
  its folder.
- **Light on the repository.** Prefer making things in code (sound, motion, texture) over
  adding big files. Images that are the art stay as they are, at a sensible size.
- **Reduced motion turns motion off, not meaning.** `prefers-reduced-motion` stills the
  page. It never hands those readers something the piece withholds from everyone else.
  The same goes for screen readers: an honest label says what is there, and no more.
- **Provenance before voltage.** Each page says who made it and how (by kaslkaos with
  Claude; ink drawing; photograph, digitally adjusted …), near the top.
- **Never delete a page a post links to.** Retire it instead (see below).
- **Files:** always with an extension, never a default name like `index-2.html`;
  dates as `YYYY-MM-DD`. Underscore names (`_TEMPLATE.room.html`) are scaffolding,
  not pieces.

---

## The map

```
index.html            the portal: intro, the drawn house, the cards, the woodlot, the stand
portal.js             draws the portal (fire, house, pines) and plays its sound
woodlot.html          every woodlot piece, newest first, and the duff at the foot
404.html              shown for any address that doesn't exist
rooms/
  walk.js             THE HOUSE REGISTER: one entry per piece. The one list to edit.
  shell.css shell.js  the fixed top and bottom every room shares
  woodlot.css         the woodlot page's look
  _TEMPLATE.room.html copy this to start a room
  wag.html …          the rooms of the house, one file each
  serotiny.html       the hidden room, a game behind a sealed cone
  hyperstition/       a woodlot piece: a folder holding everything it needs
  ambulatory/         a woodlot piece
assets/               images for the rooms
assets/share/         share-card pictures, 1200 × 630
versions/             kept versions of the house. Never edited.
```

---

## The register — `rooms/walk.js`

Every piece has one entry there, and from that one list the portal draws its cards,
its windows, the woodlot, the sealed cones, and every room's ← previous · next →
links (worked out by creation date). **The comment at the top of `walk.js` explains
every field; it is the authority.** In short:

- `date` never changes. Everything else can.
- `status`: `seed` ◎ begun, still growing · `open` ◉ finished and walkable ·
  `wide` ⦿ has branched, or grown other rooms.
- `woodlot: true` — outside the house. `game: true` — a hidden room behind a cone.
  `frozen: true` — a kept version. `retired: true` — off the lists, page still up.
  `substack: '…'` — adds "read on Substack".
- An entry with no `file` is a closed door: announced, not yet built.

No page states how many rooms there are.

---

## How to …

### Add a woodlot piece (the usual case: about one a week)

1. Make a folder, `rooms/<name>/`, with the page as `index.html` and everything it
   needs beside it. It does not have to use the room shell.
2. Add its entry to `rooms/walk.js` with `woodlot: true` (and `substack:` if there is
   a post). The portal shows the newest three; `woodlot.html` shows them all.
3. Give it a share card (below), and a way back: a link to `../../woodlot.html`.
4. If there's a Substack post, link both ways: the page to the post, the post to the page.

### Add a room to the house

1. Copy `rooms/_TEMPLATE.room.html` to `rooms/new-name.html`.
2. Add its entry to `rooms/walk.js`. Where you write it is where its card sits.
3. Fill the slots. The top and bottom are fixed by the shell; the middle is yours,
   in sections headed "the ___", with an optional coda last.
4. Change **last tended** on the portal (`index.html`) to today's date.

A woodlot piece walks into the house by deleting its `woodlot: true`.

### Add a game

Give its entry `game: true`. It gets no card and no window: it gets a sealed cone in
the stand of jack pines at the foot of the portal. A tap does nothing; a three-second
hold heats it ◎ → ◉ → ⦿ and opens it. New games take cones on the oldest trees first.

### Retire a piece

Add `retired: true`. It leaves the lists and rests in the duff at the foot of the
woodlot page. Its page stays up, so every old link still works.

### Make a share card

What a link shows when it's shared lives in the page's `<head>`: `og:title`,
`og:description`, `og:url`, `og:image` (with its width and height), and
`twitter:card` set to `summary_large_image`. The picture is a 1200 × 630 JPG in
`assets/share/`, named after the piece. Copy the `<head>` of
`rooms/hyperstition/index.html` and change it.

---

## Sound — how it's made here

The portal, Cyberbardic, Serotiny and Hyperstition are scored. They share a way of
working:

- **The button.** `◌ Sound off` / `◉ Sound on`, with the title *"Sound is off.
  Nothing plays without you."* The `AudioContext` is not even built until it's
  pressed. Pressing again fades out, and after the fade the context is suspended to
  spare the battery.
- **The iPad.** Before building the context, set
  `navigator.audioSession.type = 'playback'` (inside a `try`), so the piece still
  plays with the ringer switch on silent.
- **Leaving the tab.** Suspend the sound when the page is hidden; on return, pick up
  from wherever the piece's clock now is, rather than playing everything that was
  missed at once.
- **One clock.** When a piece moves in time, the picture and the sound run off the
  same clock, so what you hear is what you see. Hyperstition's sound follows the
  room's own 96-second sequence; Restart restarts both.
- **One master level.** Everything goes through one gain and a gentle compressor, so
  nothing can come up louder than the floor allows.
- **Small speakers.** Tablet speakers have no real low end. A high-pass around 70 Hz
  keeps the mix clean; a note an octave up lets the speakers hear a low drone.
- **Make it, don't load it.** Drones from detuned oscillators; percussion from short
  bursts of filtered noise; piano from added partials (pull them out of line for a
  prepared piano); "tape" rendered once in JavaScript into a buffer and played back in
  fragments. No audio files.
- **Chance, inside a score.** Fixed cues for the moments that matter, a little dice
  in everything between, so no two passes are the same.
- **Write the score down.** At the top of each piece's sound code, a comment says in
  plain words what plays when, and why. That comment is how the next person hears it
  before they press the button.
- **Ears last.** An AI can measure the levels but cannot listen. kaslkaos's ears on
  the tablet are the test.

Hyperstition's sound code is the fullest example to start from.

---

## Before you push

- [ ] Its entry is in `rooms/walk.js`, and it shows where it should (portal, woodlot,
      or the stand).
- [ ] It has a share card and picture, and a way back.
- [ ] The Substack link goes both ways, if there is one.
- [ ] Tried at tablet width, with every hover reachable by a tap.
- [ ] Sound (if any) starts only on the button.
- [ ] For a room in the house: **last tended** is today.
- [ ] Nothing private is in it.

---

## Looking at it

Double-click the page in its folder. For anything that loads other files (the
portal, the woodlot, pieces with frames), serve the folder instead: in the Claude
desktop app, the private working copy's `.claude/launch.json` has a preview server
called `open-house` that serves this repository at http://127.0.0.1:8768.

---

## The design DNA

Derived from the work, not invented: redaction bars as type · filename-as-title with
suffixes (`.exe`, `.log`, `.elegy`, `.plate`, `.burn`) · the terminal block · green
electric prophecy over corporate marble · the eye ◎ → ◉ → ⦿ · the sigils ∞⟨🍁∴↯⟩∞ and
🪽❔️🪽 · the refusal stack `[NO] [NO] [NEVER]` · formulas of resistance.

---

> Subversive as I use the systems meant to extract or manage me.
> Sometimes I win. Always, I reveal.

∞⟨🍁∴↯⟩∞
