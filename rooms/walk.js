/* ∞⟨🍁∴↯⟩∞  THE WALK — the one list that orders the Portal.

   To reorder the rooms, move lines up or down.
   To add a room, add a line here (and its card in ../index.html).
   To hide a room without deleting it, put // in front of its line.

   Everything else follows from this list: which opening each room is
   (the first is the door, the rest are windows i, ii, iii …), the
   "room 2 of 5" in each colophon, the light in the house on the
   landing page, and the return-to-the-Portal bar at the foot of
   every room. Nothing else needs renumbering by hand. */

const WALK = [
  { file: 'wag.html',                    name: 'WAG.scene' },
  { file: 'hic-svnt.html',               name: 'HIC_SVNT.map' },
  { file: 'berlin-alexanderplatz.html',  name: 'BERLIN_ALEXANDERPLATZ_2025.exe' },
  { file: 'taste-of-yess.html',          name: 'THE_TASTE_OF_YESS.perf' },
  { file: 'cyberbardic.html',            name: 'CYBERBARDIC.elegy' },
];


/* ── below here is machinery; the list above is the part to edit ── */
(function () {
  const ROMAN = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
                 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'];
  const COUNT = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
                 'nine', 'ten', 'eleven', 'twelve'];
  const opening = i => i === 0 ? 'the door' : 'window ' + (ROMAN[i] || i);
  const fileOf = href => (href || '').split('/').pop().split('#')[0];
  const portalMark = '∞⟨🍁∴↯⟩∞ KASLKAOS.portal';

  window.WALK = WALK;
  window.walkOpening = opening;

  /* ── on the landing page: put the room cards in walk order ── */
  const nav = document.querySelector('nav.rooms');
  if (nav) {
    const cards = [...nav.querySelectorAll('a.room')];
    cards.forEach(c => c.remove());
    let placed = 0;                        // a room on the list with no card yet is skipped
    WALK.forEach(w => {
      const card = cards.find(c => fileOf(c.getAttribute('href')) === w.file);
      if (!card) return;
      card.dataset.opening = placed;
      const o = card.querySelector('.opening');
      if (o) o.textContent = opening(placed);
      nav.appendChild(card);
      placed++;
    });
    const rule = document.querySelector('[data-walk="rule"]');
    const windows = placed - 1;
    if (rule) rule.textContent = 'a door and ' + (COUNT[windows] || windows) +
                                 ' window' + (windows === 1 ? '' : 's');
    return;
  }

  /* ── in a room ── */
  const here = fileOf(location.pathname);
  const i = WALK.findIndex(w => w.file === here);
  if (i < 0) return;                       // a page not on the walk: leave it alone
  const n = WALK.length;
  const prev = WALK[i - 1], next = WALK[i + 1];

  // the top link and the colophon say where you are
  document.querySelectorAll('a.back').forEach(a => {
    a.textContent = '← ' + portalMark + ' · ' + opening(i);
  });
  document.querySelectorAll('[data-walk="place"]').forEach(s => {
    s.textContent = 'room ' + (i + 1) + ' of ' + n + ', ' + opening(i);
  });

  /* Hand-written "on to …" links are story, not plumbing. Each says where
     it expects to lead (data-walk-to). If the walk still goes there, it
     stays; if the order changed, it quietly steps aside and the bar
     below carries you on instead. */
  document.querySelectorAll('[data-walk-to]').forEach(a => {
    const to = a.dataset.walkTo;
    const ok = to === 'end' ? !next : (next && next.file === to);
    if (!ok) a.hidden = true;
  });

  // the return bar at the foot of every room
  const bar = document.createElement('nav');
  bar.className = 'walk';
  bar.setAttribute('aria-label', 'the walk');
  bar.style.cssText = 'margin:3rem 0 1rem;padding-top:1.25rem;' +
                      'border-top:1px solid currentColor;border-color:rgba(127,127,127,.25);' +
                      'display:flex;flex-direction:column;gap:.6rem;';
  const link = (href, text) => {
    const a = document.createElement('a');
    a.className = 'back';
    a.href = href;
    a.textContent = text;
    a.style.margin = '0';
    return a;
  };
  bar.appendChild(link('../index.html', '← ' + portalMark + ' · return to the Portal'));
  const steps = document.createElement('div');
  steps.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:space-between;gap:.6rem 1.5rem;';
  if (prev) steps.appendChild(link(prev.file, '‹ ' + opening(i - 1) + ' · ' + prev.name));
  if (next) {
    const a = link(next.file, opening(i + 1) + ' · ' + next.name + ' ›');
    a.style.marginLeft = 'auto';
    steps.appendChild(a);
  } else {
    const a = link('../index.html', 'back to the door ›');
    a.style.marginLeft = 'auto';
    steps.appendChild(a);
  }
  bar.appendChild(steps);

  // last thing in the room's column, after any coda
  const links = document.querySelector('.links');
  (links ? links.parentElement : document.body).appendChild(bar);
})();
