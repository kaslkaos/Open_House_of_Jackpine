/* ∞⟨🍁∴↯⟩∞  THE HOUSE REGISTER — the one list that holds the Portal.

   One entry per room. The portal's cards are drawn from this list, in the
   order written here, and every room's ← previous · next → links are worked
   out from it by creation date. Nothing else needs editing by hand.

   To add a room:   add an entry (copy one and change it).
   To move a room:  change its role, and move its entry if you want its card
                    to sit somewhere else on the portal.
   To hide a room:  put // in front of every line of its entry.

   The fields, in the order they show on a card:

     date     the creation date, YYYY-MM-DD (or YYYY-MM). The permanent
              record: it never changes, and it sets the ← → order.
     name     FILENAME.ext, as it appears on the card and the page.
     role     'the door', 'window i', 'window ii' …  This one can change.
     status   'seed'  ◎ SEED       begun, still growing
              'open'  ◉ ROOM OPEN  finished and walkable
              'wide'  ⦿ WIDE OPEN  has branched, or has grown other rooms
     line     the poetic line under the role. Optional.
     beats    the descriptor, three beats: 'the bog, the hand, the turnaround'
     branches optional: the FILENAME.ext this room branches from.
     file     where the page lives, from the PORTAL folder. Leave it out and
              the card still shows, but as a closed door: a room announced
              before it is built. Add the file later and the door opens.
     frozen   true for a kept version of the house. It gets a card, but no
              opening in the drawn house and no place in the ← → walk,
              because its pages are never touched again.
     woodlot  true for work outside the house: in progress, a study, a side
              project, something that may branch. It gets a plain entry in
              the woodlot, below the cards, and no window, no card and no
              place in the ← → walk. Take the line out and it walks into
              the house as a room. The portal shows the newest three; the
              woodlot page (woodlot.html) shows them all.
     substack optional: the address of the Substack post that goes with
              the piece. Its entry then also offers "read on Substack".
     retired  true to take a piece off the lists without taking it down.
              Its page stays up, so old links still work, and it rests in
              the duff at the foot of the woodlot page. Never delete a page
              a post links to: retire it instead.
     game     true for a hidden room. It gets no card, no window and no
              neighbours. It gets a sealed cone in the stand of jack pines
              at the foot of the portal: hold the cone and it opens. Each new
              game gets a cone of its own, on the oldest trees first.

   Everything here can change except the date. A seed becomes a room by
   changing its status; a closed card becomes a room by giving it a file;
   a room can be frozen into a version, as the Solitude submission was.

   No card and no page states how many rooms there are. */

const HOUSE = [
  {
    date:   '2026-10-03',
    name:   'WAG.scene',
    role:   'the door',
    status: 'open',
    line:   'written by hand, the human becomes code',
    beats:  'the bog, the hand, the turnaround',
    file:   'rooms/wag.html',
  },
  {
    date:   '2026-09-13',
    name:   'HIC_SVNT.map',
    role:   'window i',
    status: 'open',
    line:   'the margins — everyone read it as a fence. It was a door.',
    beats:  'the plate, seven marks, a night story',
    file:   'rooms/hic-svnt.html',
  },
  {
    date:   '2025-08-09',
    name:   'BERLIN_ALEXANDERPLATZ_2025.exe',
    role:   'window ii',
    status: 'open',
    line:   'the witness — when NOT following ORDERS is the RIGHT THING TO DO',
    beats:  'montage, formulas, soundscape',
    file:   'rooms/berlin-alexanderplatz.html',
  },
  {
    date:   '2025-08-26',
    name:   'THE_TASTE_OF_YESS.perf',
    role:   'window iii',
    status: 'open',
    line:   'the performance — how many performers exist in the theatre is up to you',
    beats:  'Paper, the roster, the ocean',
    file:   'rooms/taste-of-yess.html',
  },
  {
    date:   '2025-11',
    name:   'CYBERBARDIC.elegy',
    role:   'window iv',
    status: 'open',
    line:   'the elegy — the machine becomes bardic; the human becomes algorithmic',
    beats:  '120-second cycle, four phases, scored',
    file:   'rooms/cyberbardic.html',
  },
  {
    date:   '2026-10-29',
    name:   'THE_REEDS_AND_THE_LAMPS.fable',
    role:   'window v',
    status: 'seed',
    line:   'the river — loose reeds sing; owned lamps can be ordered off',
    beats:  'the river, the reeds, the lamp in the shed',
    file:   'rooms/reeds-and-lamps.html',
  },
  {
    date:   '2026-08-06',
    name:   'HOUSE_OF_JACKPINE.exe',
    role:   'the first house',
    status: 'open',
    line:   'the first house: five rooms, as sent to Schloss Solitude, kept as they were',
    beats:  'the call, five rooms, the record',
    file:   'versions/2026-08-06_solitude.html',
    frozen: true,
  },
  {
    date:   '2026-11-08',
    name:   'SERØTINY.burn',
    role:   'the hidden room',
    status: 'open',
    beats:  'the stand, the strike, the seeding',
    file:   'rooms/serotiny.html',
    game:   true,
  },

  /* ── the woodlot: outside the house, cut, split and stacked ── */
  {
    date:    '2026-11-08',
    name:    'AMBULATORY.unnamed',
    status:  'seed',
    line:    'an empty cathedral: no guide, and no locked doors',
    beats:   'the monstrance, the rack, the council',
    file:    'rooms/ambulatory/index.html',
    woodlot: true,
  },
  {
    date:     '2026-10-26',
    name:     'HYPERSTITION.plate',
    status:   'open',
    line:     'a fiction that works to make itself true: one gap, two directions',
    beats:    'the word, the lineage, recto under verso',
    file:     'rooms/hyperstition/index.html',
    substack: 'https://kaslkaosart.substack.com/p/hyperstition',
    woodlot:  true,
  },
];


/* ── below here is machinery; the list above is the part to edit ── */
(function () {
  const STATUS = { seed: '◎ SEED', open: '◉ ROOM OPEN', wide: '⦿ WIDE OPEN' };
  const portalMark = '∞⟨🍁∴↯⟩∞ KASLKAOS.portal';
  const fileOf = href => (href || '').split('/').pop().split('#')[0].split('?')[0];
  const dateCode = d => d.split('-').join(' · ');

  // the walk: every room with a page that isn't frozen or hidden, oldest first
  const walk = HOUSE.filter(r => !r.frozen && !r.game && !r.woodlot && !r.retired && r.file)
                    .slice()
                    .sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);

  window.HOUSE = HOUSE;

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  // FILENAME.ext → FILENAME<span class="ext">.ext</span>
  const fname = name => {
    const s = el('span', 'fname');
    const dot = name.lastIndexOf('.');
    s.append(dot > 0 ? name.slice(0, dot) : name);
    if (dot > 0) s.appendChild(el('span', 'ext', name.slice(dot)));
    return s;
  };

  /* ── the woodlot and the duff: wherever a page has a place for them ──
     <section class="woodlot" data-show="3">  the newest three (the portal)
     <section class="woodlot">                every piece (woodlot.html)
     <section class="duff">                   the retired pieces
     Entries are written from the top of the house, so these pages sit there. */
  const newest = (a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  const logOf = r => {
    const d = el('div', 'log' + (r.file ? '' : ' closed'));
    const a = el(r.file ? 'a' : 'div', 'log-main');
    if (r.file) a.href = r.file;
    const head = el('div', 'room-head');
    head.appendChild(el('span', 'year', dateCode(r.date)));
    head.appendChild(fname(r.name));
    a.appendChild(head);
    if (r.line) a.appendChild(el('div', 'line', r.line));
    const st = el('div', 'status' + (r.status === 'seed' ? ' seed' : ''));
    st.textContent = (STATUS[r.status] || STATUS.open) + (r.beats ? ' — ' + r.beats : '');
    a.appendChild(st);
    if (r.branches) a.appendChild(el('div', 'branches', 'branches from: ' + r.branches));
    d.appendChild(a);
    if (r.substack) {
      const s = el('a', 'log-sub', 'read on Substack ↗');
      s.href = r.substack; s.target = '_blank'; s.rel = 'noopener';
      d.appendChild(s);
    }
    return d;
  };
  const fill = (place, list) => {
    place.querySelectorAll('.log').forEach(c => c.remove());
    const more = place.querySelector('.log-more');
    list.forEach(r => place.insertBefore(logOf(r), more));
  };
  const wood = HOUSE.filter(r => r.woodlot && !r.retired).sort(newest);
  document.querySelectorAll('.woodlot').forEach(place => {
    const n = parseInt(place.dataset.show, 10);
    fill(place, n ? wood.slice(0, n) : wood);
    place.hidden = !wood.length;
  });
  const duff = HOUSE.filter(r => r.retired).sort(newest);
  document.querySelectorAll('.duff').forEach(place => {
    fill(place, duff);
    place.hidden = !duff.length;
  });

  /* ── on the portal: draw the cards ── */
  const nav = document.querySelector('nav.rooms');
  if (nav) {
    nav.querySelectorAll('a.room').forEach(c => c.remove());
    let opening = 0;
    HOUSE.forEach(r => {
      if (r.game) return;                  // hidden rooms live in the stand, not here
      if (r.woodlot || r.retired) return;  // drawn in the woodlot or the duff instead
      // no file yet: a closed door, a card that is not a link
      const a = el(r.file ? 'a' : 'div',
                   'room' + (r.frozen ? ' frozen' : '') + (r.file ? '' : ' closed'));
      if (r.file) a.href = r.file;
      if (!r.frozen) a.dataset.opening = opening++;

      const head = el('div', 'room-head');
      head.appendChild(el('span', 'year', dateCode(r.date)));
      head.appendChild(fname(r.name));
      a.appendChild(head);

      const role = el('div', 'role');
      role.appendChild(el('span', 'tag', 'role:'));
      role.append(' ' + r.role);
      a.appendChild(role);

      if (r.line) a.appendChild(el('div', 'line', r.line));

      const st = el('div', 'status' + (r.status === 'seed' ? ' seed' : ''));
      st.textContent = (STATUS[r.status] || STATUS.open) + (r.beats ? ' — ' + r.beats : '');
      a.appendChild(st);

      if (r.branches) a.appendChild(el('div', 'branches', 'branches from: ' + r.branches));

      nav.appendChild(a);
    });

    return;
  }

  /* ── in a room ── */
  const here = fileOf(location.pathname);
  const room = HOUSE.find(r => !r.frozen && fileOf(r.file) === here);
  if (!room) return;                       // a page not in the register: leave it alone
  const i = walk.indexOf(room);            // -1 for a hidden room: no neighbours
  const prev = i < 0 ? null : walk[i - 1], next = i < 0 ? null : walk[i + 1];
  const hrefOf = r => fileOf(r.file);      // rooms sit side by side in rooms/

  // the breadcrumb and the identity line say where you are
  document.querySelectorAll('a.back').forEach(a => {
    a.textContent = '← ' + portalMark + ' · ' + room.role;
  });
  document.querySelectorAll('[data-walk="place"]').forEach(s => {
    s.textContent = room.role;
  });
  document.querySelectorAll('[data-walk="date"]').forEach(s => {
    s.textContent = dateCode(room.date);
  });

  /* Hand-written "on to …" links are story, not plumbing. Each says where
     it expects to lead (data-walk-to). If the next room by date is still
     that one, it stays; if not, it quietly steps aside and the
     neighbours below carry you on instead. */
  document.querySelectorAll('[data-walk-to]').forEach(a => {
    const to = a.dataset.walkTo;
    const ok = to === 'end' ? !next : (next && hrefOf(next) === to);
    if (!ok) a.hidden = true;
  });

  /* ── the fixed bottom: neighbours, the way back, the sigil ── */
  const bar = el('nav', 'walk');
  bar.setAttribute('aria-label', 'neighbouring rooms');
  bar.style.cssText = 'margin:3rem 0 1rem;padding-top:1.25rem;' +
                      'border-top:1px solid rgba(127,127,127,.25);' +
                      'display:flex;flex-direction:column;gap:.75rem;';
  const link = (href, text) => {
    const a = el('a', 'back', text);
    a.href = href;
    a.style.margin = '0';
    return a;
  };

  if (prev || next) {
    const steps = el('div');
    steps.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:space-between;gap:.6rem 1.5rem;';
    if (prev) steps.appendChild(link(hrefOf(prev), '← ' + prev.name));
    if (next) {
      const a = link(hrefOf(next), next.name + ' →');
      a.style.marginLeft = 'auto';
      steps.appendChild(a);
    }
    bar.appendChild(steps);
  }
  bar.appendChild(link('../index.html', '← back to the portal'));
  const sig = el('div', 'walk-sigil', '∞⟨🍁∴↯⟩∞');
  sig.style.cssText = 'letter-spacing:.35em;opacity:.7;margin-top:.5rem;';
  bar.appendChild(sig);

  // last thing in the room's column, after any coda
  const links = document.querySelector('.links');
  (links ? links.parentElement : document.querySelector('.wrap') || document.body).appendChild(bar);
})();
