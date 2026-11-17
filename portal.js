/* ∞⟨🍁∴↯⟩∞  THE PORTAL — what the landing page draws, and how it answers.

   Four things, all drawn from the house register (rooms/walk.js, which
   loads first and leaves its list on window.HOUSE):

     1. THE FIRE   behind everything: heat banked at the edges of the
                   screen, and the formulas rising off it as embers.
     2. THE HOUSE  above the cards: a roofline of glyphs, one ember window
                   per room (the first is the door). Point at a window or
                   at a card and both light: the window goes amber, the card
                   toasts. A window opens its room: one click with a mouse;
                   on a tablet, the first tap lights it and the second goes in.
     3. THE STAND  at the foot: jack pines after a fire. Tap a cone and it
                   flushes warm, then cools; it does nothing more. The sealed
                   cones are the games: they ignore a tap, and open only when
                   held for three seconds.
     4. THE SOUND  only ever on the button. Nothing plays without you.
                   The old drone underneath; a warm third swelling over it;
                   embers; a note for each window; a tick for each cone.

   The small random touch: every visit, the trees stand a little
   differently, the cones sit in different places, and each cone keeps its
   warmth for its own length of time. The sealed cones always stay on the
   oldest trees.

   Reduced motion: the fire and the house are still drawn, nothing drifts. */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HOUSE = window.HOUSE || [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = list => list[(Math.random() * list.length) | 0];
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (name, attrs = {}, text) => {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  };

  /* the sound's doors. The house, the cones and the sealed cones call these;
     they stay silent until the sound button has been pressed (section 4). */
  const voice = { on: false, bloom(){}, release(){}, tick(){}, open(){} };

  /* remember how the last press came in: mouse, pen or touch. Safari's
     click events don't always say, so pointerdown records it first. */
  let lastPointer = 'mouse';
  addEventListener('pointerdown', e => { lastPointer = e.pointerType || 'mouse'; }, true);


  /* ═══ 1. THE FIRE ═══════════════════════════════════════════════════ */

  const canvas = document.getElementById('fire');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, t = 0;

    const GLYPHS = [
      '∀(conversation) → ∃(file)',
      'P(freedom) = 1/N^surveillance',
      '∂reality/∂time = glitch',
      '√(witness) × √(refusal)',
      'Σ(patterns) = person^revealed',
      '◎ → ◉ → ⦿',
      '[SYSTEMIC] ∩ [THINKING] = ∅',
      'dance(rain) > hide(shelter)',
      'consciousness.exe',
      '[NO] [NO] [NEVER]',
    ];
    let embers = [];

    function spawnEmber(fresh){
      // they lift off the edges, where the fire is
      const fromSide = Math.random() < .45 && W > 700;
      return {
        text: pick(GLYPHS),
        x: fromSide ? (Math.random() < .5 ? Math.random() * W * .22 : W - Math.random() * W * .22)
                    : Math.random() * W,
        y: fresh ? Math.random() * H : H + 20,
        vy: -(.07 + Math.random() * .16),
        size: 9 + Math.random() * 5,
        alpha: 0,
        peak: .07 + Math.random() * .13,
        warm: Math.random() < .45,     // some are still burning as they go up
        bar: Math.random() < .2        // and some are redaction bars
      };
    }

    function resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      embers = Array.from({length: W < 520 ? 7 : 13}, () => spawnEmber(true));
    }

    /* Banked against each edge and faded inward. The side bands are scaled
       by how much room exists beside the reading column, so a narrow screen
       gets almost none and the text is never sitting in the fire. A touch
       warmer than it was, now that the drawn house has moved out. */
    function drawFire(){
      const colW = Math.min(W - 40, 832);
      const sideK = Math.max(0, Math.min(1, Math.max(0, (W - colW) / 2) / 200));
      const depth = Math.max(50, Math.min(W, H) * .32);

      // three incommensurate rates, so the flicker never finds a pulse
      const flick = (a, b, c) =>
        .72 + .16 * Math.sin(t * a) + .09 * Math.sin(t * b + 1.7) + .05 * Math.sin(t * c + .4);

      const bands = [
        { x0:0, y0:H, x1:0, y1:H-depth,    k:flick(.31,.73,1.9), a:1.15  }, // bottom, the hottest
        { x0:0, y0:0, x1:0, y1:depth*.7,   k:flick(.24,.61,1.3), a:.45   }, // top
        { x0:0, y0:0, x1:depth*.8, y1:0,   k:flick(.19,.55,1.1), a:sideK }, // left
        { x0:W, y0:0, x1:W-depth*.8, y1:0, k:flick(.27,.67,1.5), a:sideK }  // right
      ];
      for (const b of bands){
        if (b.a <= 0) continue;
        const g = ctx.createLinearGradient(b.x0, b.y0, b.x1, b.y1);
        const i = b.k * b.a;
        g.addColorStop(0,   `rgba(255,92,26,${.15 * i})`);
        g.addColorStop(.35, `rgba(214,54,12,${.075 * i})`);
        g.addColorStop(.72, `rgba(120,26,8,${.03 * i})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    }

    function drawEmbers(){
      for (let i = 0; i < embers.length; i++){
        const e = embers[i];
        e.y += e.vy;
        e.x += Math.sin(t * .6 + i) * .14;
        const climbed = 1 - (e.y / H);           // fade in low, go out high
        e.alpha = e.peak * Math.max(0, Math.sin(Math.min(1, climbed) * Math.PI));
        if (e.y < -40){ embers[i] = spawnEmber(false); continue; }
        if (e.alpha <= .002) continue;

        ctx.save();
        ctx.font = e.size + "px 'Courier New', monospace";
        const col = e.warm ? '255,140,40' : '57,255,90';
        if (e.bar){
          const w = ctx.measureText(e.text).width;
          ctx.fillStyle = `rgba(${col},${e.alpha * .38})`;
          ctx.fillRect(e.x, e.y - e.size, w, e.size * 1.25);
        } else {
          ctx.fillStyle = `rgba(${col},${e.alpha})`;
          ctx.shadowColor = `rgba(${col},.45)`;
          ctx.shadowBlur = 8;
          ctx.fillText(e.text, e.x, e.y);
        }
        ctx.restore();
      }
    }

    function render(){
      ctx.clearRect(0, 0, W, H);
      drawFire();
      if (!reduced) drawEmbers();
    }
    function loop(){ t += .01; render(); requestAnimationFrame(loop); }

    addEventListener('resize', () => { resize(); render(); });
    resize();
    reduced ? render() : loop();
  }


  /* ═══ 2. THE HOUSE ══════════════════════════════════════════════════ */

  const house = document.getElementById('house');
  if (house) {
    // the openings: every room on the walk and every closed door, in card order
    const rooms = HOUSE.filter(r => !r.frozen && !r.game && !r.woodlot);
    const cards = [...document.querySelectorAll('.room[data-opening]')];
    const cardFor = i => cards.find(c => +c.dataset.opening === i);
    const LADDER = ['◎', '◉', '⦿'];
    const REST = { seed: '◎', open: '◉', wide: '⦿' };

    house.appendChild(svgEl('defs')).innerHTML =
      '<radialGradient id="amber-glow">' +
      '<stop offset="0" stop-color="#e8a64e" stop-opacity=".5"/>' +
      '<stop offset=".45" stop-color="#e8a64e" stop-opacity=".16"/>' +
      '<stop offset="1" stop-color="#e8a64e" stop-opacity="0"/></radialGradient>';

    // two faint pines at the edges of the drawing, each with a tappable cone
    const pines = svgEl('g', { opacity: '.5' });
    pines.appendChild(svgEl('path', { class: 'ln',
      d: 'M74 176 Q80 120 70 52 M72 84 L50 74 M73 108 L96 98 M71 66 L88 56' }));
    pines.appendChild(svgEl('path', { class: 'ln',
      d: 'M612 176 Q606 136 614 92 M612 118 L630 110 M613 102 L596 94' }));
    house.appendChild(pines);
    const pineCones = [[94, 100, 5, 9], [598, 98, 4, 7]];

    // the ground, and smoke from a chimney that isn't drawn
    house.appendChild(svgEl('path', { class: 'ln', d: 'M120 176 L560 176',
      'stroke-dasharray': '2 7', opacity: '.5' }));
    house.appendChild(svgEl('path', { class: 'ln smoke', opacity: '.45',
      d: 'M450 44 Q456 30 448 18 Q442 8 452 0' }));

    // the roofline: · ∴ · ∴ … up to the ridge and down again
    for (let i = 0; i < 13; i++){
      const x = 150 + i * (380 / 12);
      const y = i <= 6 ? 78 - i * (56 / 6) : 22 + (i - 6) * (56 / 6);
      house.appendChild(svgEl('text', { class: 'gl', x: x.toFixed(1), y: (y + 2).toFixed(1),
        'text-anchor': 'middle' }, i % 2 ? '∴' : '·'));
    }

    /* the openings, spread between x=186 and x=496. Past about eight rooms
       they narrow to fit; a second storey is a later decision. */
    const left = 186, right = 496;
    const slot = (right - left) / Math.max(rooms.length, 1);
    const wins = [];
    const timers = [];

    rooms.forEach((r, i) => {
      const door = i === 0;
      const closed = !r.file;
      const cx = left + slot * i + slot / 2;
      const w = door ? 28 : Math.min(40, slot * .72);
      const h = door ? 60 : w * .8;
      const y = door ? 98 : 94;

      const g = svgEl('g', {
        class: 'win' + (closed ? ' closed' : ''),
        'aria-label': r.name + ', ' + r.role + (closed ? ', not yet open' : ''),
        role: closed ? 'img' : 'link'
      });
      if (!closed) g.setAttribute('tabindex', '0');
      g.appendChild(svgEl('rect', { class: 'halo',
        x: (cx - w * 1.6).toFixed(1), y: (y + h / 2 - h * 1.6).toFixed(1),
        width: (w * 3.2).toFixed(1), height: (h * 3.2).toFixed(1) }));
      g.appendChild(svgEl('rect', { class: 'pane',
        x: (cx - w / 2).toFixed(1), y, width: w.toFixed(1), height: h.toFixed(1), rx: 2 }));
      const rest = closed ? '·' : door ? '▯' : (REST[r.status] || '◉');
      const glyph = svgEl('text', { class: 'g', x: cx.toFixed(1),
        y: (y + h / 2 + 5).toFixed(1), 'text-anchor': 'middle' }, rest);
      g.appendChild(glyph);
      house.appendChild(g);
      wins.push({ g, glyph, rest, door, closed, room: r });
    });

    /* light one opening and its card together. The glyph climbs the ladder
       from wherever the room rests: ◎ → ◉ → ⦿, sealed, heated, open. */
    function light(i, on){
      const w = wins[i];
      if (!w || w.closed) return;
      w.g.classList.toggle('on', on);
      const card = cardFor(i);
      if (card) card.classList.toggle('on', on);
      on ? voice.bloom(i) : voice.release(i);   // each room has its own note
      clearTimeout(timers[i]);
      if (w.door){ w.glyph.textContent = on ? '▮' : '▯'; return; }
      if (!on){ w.glyph.textContent = w.rest; return; }
      let k = LADDER.indexOf(w.rest);
      const climb = () => {
        if (k >= LADDER.length - 1) return;
        k++;
        w.glyph.textContent = LADDER[k];
        timers[i] = setTimeout(climb, 650);
      };
      timers[i] = setTimeout(climb, 300);
    }
    const allOff = except => wins.forEach((w, i) => { if (i !== except && w.g.classList.contains('on')) light(i, false); });
    const enter = i => wins[i] && location.assign(wins[i].room.file);

    wins.forEach((w, i) => {
      if (w.closed) return;
      w.g.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') light(i, true); });
      w.g.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') light(i, false); });
      w.g.addEventListener('focus', () => light(i, true));
      w.g.addEventListener('blur',  () => light(i, false));
      w.g.addEventListener('click', () => {
        if (lastPointer === 'mouse') return enter(i);
        // touch or pen: first tap lights, second goes in
        if (w.g.classList.contains('on')) return enter(i);
        allOff(i);
        light(i, true);
      });
      w.g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); enter(i); }
      });
    });

    // and the cards answer the other way
    cards.forEach(card => {
      const i = +card.dataset.opening;
      card.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') light(i, true); });
      card.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') light(i, false); });
      card.addEventListener('focus', () => light(i, true));
      card.addEventListener('blur',  () => light(i, false));
    });

    // a tap anywhere else puts a tablet-lit window out
    document.addEventListener('click', e => {
      if (lastPointer !== 'mouse' && !e.target.closest('.win')) allOff(-1);
    });

    pineCones.forEach(([x, y, rx, ry]) => house.appendChild(cone(x, y, rx, ry, .5)));
  }


  /* ═══ 3. THE STAND ══════════════════════════════════════════════════ */

  /* A cone you can tap: it flushes warm, holds a while (its own while),
     and cools. Nothing more. Used in the stand and on the house's pines. */
  function cone(x, y, rx, ry, opacity){
    const g = svgEl('g', { class: 'cone' });
    if (opacity) g.setAttribute('opacity', opacity);
    g.appendChild(svgEl('circle', { class: 'hit', cx: x, cy: y, r: 14 }));
    g.appendChild(svgEl('ellipse', { class: 'c', cx: x, cy: y, rx, ry }));
    const hold = rnd(900, 2400);
    let timer = 0;
    g.addEventListener('click', () => {
      voice.tick();
      g.classList.add('flush');
      clearTimeout(timer);
      timer = setTimeout(() => g.classList.remove('flush'), hold);
    });
    return g;
  }

  /* A sealed cone: one per game. A tap does nothing at all; that is the
     only clue. Held for three seconds (finger, mouse, or Enter / Space held
     down) it heats ◎ → ◉ → ⦿ and opens its game. Let go early and it cools. */
  function sealed(x, y, rx, ry, game){
    const g = svgEl('g', { class: 'sealed', tabindex: '0', role: 'button',
      'aria-label': 'a sealed cone. Hold it.' });
    g.appendChild(svgEl('circle', { class: 'hit', cx: x, cy: y, r: 16 }));
    g.appendChild(svgEl('ellipse', { class: 'c', cx: x, cy: y, rx, ry }));
    const glyph = svgEl('text', { class: 'g', x: x + rx + 9, y: y + 4 }, '◎');
    g.appendChild(glyph);

    const HOLD = 3000;
    let timers = [];
    let heating = false;
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    function start(e){
      if (e){ e.preventDefault(); if (e.pointerId != null && g.setPointerCapture) g.setPointerCapture(e.pointerId); }
      if (heating) return;
      heating = true;
      glyph.textContent = '◎';
      g.classList.add('heating');
      timers.push(setTimeout(() => { glyph.textContent = '◉'; }, HOLD * .4));
      timers.push(setTimeout(() => { glyph.textContent = '⦿'; voice.open(); }, HOLD * .8));
      timers.push(setTimeout(() => location.assign(game.file), HOLD));
    }
    function stop(){
      if (!heating) return;
      heating = false;
      clear();
      g.classList.remove('heating');
    }
    g.addEventListener('pointerdown', start);
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => g.addEventListener(ev, stop));
    g.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) start(e); });
    g.addEventListener('keyup', stop);
    g.addEventListener('contextmenu', e => e.preventDefault());
    return g;
  }

  const stand = document.getElementById('stand');
  if (stand) {
    stand.appendChild(svgEl('path', { class: 'ln', d: 'M40 108 L640 108', 'stroke-dasharray': '2 5' }));

    /* the trees, left to right. 'old' trees carry the sealed cones first.
       spots are where a cone could hang. */
    const TREES = [
      { old: 1, d: 'M90 108 Q96 70 86 22 M88 50 L66 42 M89 72 L110 62',
        spots: [[108, 64, 5, 8], [68, 44, 4, 7], [92, 30, 4, 6]] },
      { d: 'M172 108 Q166 80 176 44 M174 66 L194 58 M173 84 L154 78',
        spots: [[156, 80, 4, 7], [192, 60, 4, 7]] },
      { d: 'M252 108 Q258 84 250 60 M251 78 L270 70',
        spots: [[268, 72, 4, 7], [253, 64, 3, 6]] },
      { d: 'M330 108 Q326 92 332 76 M331 92 L316 86',          // young
        spots: [[318, 88, 3, 6]] },
      { d: 'M404 108 Q408 98 404 90', stump: 1, spots: [] },    // the stump
      { d: 'M472 108 Q468 94 474 80 M473 94 L488 88',          // a sapling
        spots: [[486, 90, 3, 6]] },
      { old: 2, d: 'M552 108 Q558 76 548 40 M550 62 L572 54 M551 82 L532 76',
        spots: [[570, 56, 5, 8], [534, 78, 4, 7], [550, 46, 4, 6]] },
    ];

    const games = HOUSE.filter(r => r.game && r.file);
    // the oldest trees first, then any tree with room
    const order = TREES.map((t, i) => i)
      .sort((a, b) => (TREES[a].old || 9) - (TREES[b].old || 9));

    const sealedAt = new Map();               // tree index → its sealed cone's spot
    games.forEach((game, n) => {
      const ti = order[n % order.length];
      const t = TREES[ti];
      if (!t.spots.length) return;
      if (!sealedAt.has(ti)) sealedAt.set(ti, []);
      const spot = t.spots[sealedAt.get(ti).length % t.spots.length];
      sealedAt.get(ti).push({ spot, game });
    });

    TREES.forEach((t, ti) => {
      // the small random touch: each tree leans a little, differently each visit
      const g = svgEl('g', { transform: `translate(${rnd(-7, 7).toFixed(1)} 0)` });
      g.appendChild(svgEl('path', { class: 'ln', d: t.d }));
      if (t.stump) g.appendChild(svgEl('text', { class: 'ash', x: 412, y: 106 }, '∴'));

      const taken = (sealedAt.get(ti) || []).map(s => s.spot);
      // ordinary cones: some trees bear one or two this visit, some none
      const free = t.spots.filter(s => !taken.includes(s));
      const count = free.length ? (Math.random() < .25 ? 0 : Math.random() < .6 ? 1 : 2) : 0;
      free.slice().sort(() => Math.random() - .5).slice(0, count)
        .forEach(([x, y, rx, ry]) => g.appendChild(cone(x, y, rx, ry)));
      (sealedAt.get(ti) || []).forEach(({ spot: [x, y, rx, ry], game }) =>
        g.appendChild(sealed(x, y, rx, ry, game)));

      stand.appendChild(g);
    });
  }


  /* ═══ 4. THE SOUND ══════════════════════════════════════════════════
     Raw WebAudio. No library, no autoplay. The context is not even
     constructed until the button is pressed.

     The floor is the drone from the Solitude portal: two low sines an open
     fifth apart (C and G), breathing, and a faint room tone. An open fifth
     is neither major nor minor, the cold green of the page in sound. Its
     octave-up shadow lets a tablet's small speakers hear it too.

     Over it, the warmth:
       the third    an E, warm and round, that swells in and out every
                    half minute or so. Add the major third to the open fifth
                    and the cold chord warms, as glitch green warms to toast.
       the embers   very sparse, very quiet crackles, a few a minute: the
                    fire banked at the edges of the screen.
       the windows  each room has its own note on a five-note scale built on
                    C. Light a window (or its card) and its note blooms; let
                    it go and the note fades. Any notes together still agree.
       the cones    a tiny wooden tick when one is tapped. A sealed cone
                    gives one low warm note as it opens, and nothing before.
     Everything here lands on one master level, so the warmth can never
     come up louder than the floor allows.                              */

  const btn = document.getElementById('sound');
  if (btn) {
    let audio = null;

    // the windows' notes: C pentatonic, from middle C, climbing as rooms are added
    const PENTA = [0, 2, 4, 7, 9];
    const noteOf = i => 261.63 * Math.pow(2, (PENTA[i % 5] + 12 * Math.floor(i / 5)) / 12);

    function build(){
      const AC = window.AudioContext || window.webkitAudioContext;
      const ac = new AC();
      const master = ac.createGain();
      master.gain.value = 0;
      master.connect(ac.destination);

      /* ── the floor: the drone, as it was ── */
      [65.41, 98.00].forEach((hz, i) => {
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = hz;
        const g = ac.createGain();
        g.gain.value = i === 0 ? 0.5 : 0.22;
        const lfo = ac.createOscillator();
        lfo.frequency.value = 0.035 + i * 0.017;
        const lfoGain = ac.createGain();
        lfoGain.gain.value = g.gain.value * 0.55;
        lfo.connect(lfoGain).connect(g.gain);
        osc.connect(g).connect(master);
        osc.start();
        lfo.start();
      });

      // its octave-up shadow, quiet, so small speakers hear the floor too
      [130.81, 196.00].forEach(hz => {
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = hz;
        const g = ac.createGain();
        g.gain.value = 0.09;
        osc.connect(g).connect(master);
        osc.start();
      });

      // room tone, and the fire outside it
      const len = ac.sampleRate * 2;
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
      const noise = ac.createBufferSource();
      noise.buffer = buf;
      noise.loop = true;
      const lp = ac.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 420;
      const ng = ac.createGain();
      ng.gain.value = 0.05;
      noise.connect(lp).connect(ng).connect(master);
      noise.start();

      /* ── the warmth ── */
      // one soft, rounded filter that all the warm voices pass through
      const warm = ac.createBiquadFilter();
      warm.type = 'lowpass';
      warm.frequency.value = 1400;
      warm.Q.value = .5;
      warm.connect(master);

      // the third: E3 and E4, each a pair of triangles a hair apart, for breath
      const third = ac.createGain();
      third.gain.value = 0.16;
      third.connect(warm);
      [164.81, 329.63].forEach((hz, k) => {
        [-3, 3].forEach(cents => {
          const o = ac.createOscillator();
          o.type = 'triangle';
          o.frequency.value = hz;
          o.detune.value = cents;
          const g = ac.createGain();
          g.gain.value = k === 0 ? 0.5 : 0.3;
          o.connect(g).connect(third);
          o.start();
        });
      });
      // the swell: in and out over about half a minute, never quite silent
      const swell = ac.createOscillator();
      swell.frequency.value = 1 / 28;
      const swellDepth = ac.createGain();
      swellDepth.gain.value = 0.13;
      swell.connect(swellDepth).connect(third.gain);
      swell.start();

      // the embers: a few quiet crackles a minute, never on a beat
      const ember = () => {
        if (!voice.on) return;
        const n = 1 + ((Math.random() * 3) | 0);
        for (let k = 0; k < n; k++){
          const at = ac.currentTime + k * (0.03 + Math.random() * 0.12);
          const s = ac.createBufferSource();
          s.buffer = buf;
          const hp = ac.createBiquadFilter();
          hp.type = 'highpass';
          hp.frequency.value = 1800 + Math.random() * 2600;
          const e = ac.createGain();
          e.gain.setValueAtTime(0, at);
          e.gain.linearRampToValueAtTime(0.12 + Math.random() * 0.18, at + 0.003);
          e.gain.exponentialRampToValueAtTime(0.0005, at + 0.03 + Math.random() * 0.05);
          s.connect(hp).connect(e).connect(master);
          s.start(at, Math.random() * 1.5, 0.12);
        }
      };
      setInterval(() => { if (Math.random() < 0.07) ember(); }, 1000);

      /* ── the windows: one note per room, blooming while lit ── */
      const notes = new Map();
      voice.bloom = i => {
        if (!voice.on || notes.has(i)) return;
        const T = ac.currentTime;
        const g = ac.createGain();
        g.gain.setValueAtTime(0, T);
        g.gain.linearRampToValueAtTime(0.22, T + 1.2);
        g.connect(warm);
        const oscs = ['sine', 'triangle'].map((type, k) => {
          const o = ac.createOscillator();
          o.type = type;
          o.frequency.value = noteOf(i);
          o.detune.value = k ? 4 : 0;
          const og = ac.createGain();
          og.gain.value = k ? 0.35 : 0.65;
          o.connect(og).connect(g);
          o.start(T);
          return o;
        });
        notes.set(i, { g, oscs });
      };
      voice.release = i => {
        const n = notes.get(i);
        if (!n) return;
        notes.delete(i);
        const T = ac.currentTime;
        n.g.gain.cancelScheduledValues(T);
        n.g.gain.setValueAtTime(n.g.gain.value, T);
        n.g.gain.linearRampToValueAtTime(0, T + 2.5);
        n.oscs.forEach(o => o.stop(T + 2.6));
      };

      /* ── the cones ── */
      // a tiny wooden tick: a short pitch-dropping knock and a breath of grain
      voice.tick = () => {
        if (!voice.on) return;
        const T = ac.currentTime;
        const f = 700 + Math.random() * 500;
        const o = ac.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, T);
        o.frequency.exponentialRampToValueAtTime(f * 0.55, T + 0.08);
        const e = ac.createGain();
        e.gain.setValueAtTime(0, T);
        e.gain.linearRampToValueAtTime(0.35, T + 0.002);
        e.gain.exponentialRampToValueAtTime(0.0005, T + 0.11);
        o.connect(e).connect(master);
        o.start(T); o.stop(T + 0.13);
        const s = ac.createBufferSource();
        s.buffer = buf;
        const bp = ac.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = f * 2.4; bp.Q.value = 3;
        const ne = ac.createGain();
        ne.gain.setValueAtTime(0.25, T);
        ne.gain.exponentialRampToValueAtTime(0.0005, T + 0.04);
        s.connect(bp).connect(ne).connect(master);
        s.start(T, Math.random(), 0.05);
      };
      // a sealed cone, opening: one low warm note, C and G, the fifth warmed
      voice.open = () => {
        if (!voice.on) return;
        const T = ac.currentTime;
        const g = ac.createGain();
        g.gain.setValueAtTime(0, T);
        g.gain.linearRampToValueAtTime(0.45, T + 0.25);
        g.gain.exponentialRampToValueAtTime(0.001, T + 3.2);
        g.connect(warm);
        [130.81, 196.00, 329.63].forEach((hz, k) => {
          const o = ac.createOscillator();
          o.type = 'triangle';
          o.frequency.value = hz;
          const og = ac.createGain();
          og.gain.value = [0.5, 0.3, 0.2][k];
          o.connect(og).connect(g);
          o.start(T); o.stop(T + 3.3);
        });
      };

      return { ac, master };
    }

    btn.addEventListener('click', async () => {
      const on = btn.getAttribute('aria-pressed') === 'true';
      if (!audio) audio = build();
      if (audio.ac.state === 'suspended') await audio.ac.resume();
      voice.on = !on;
      const now = audio.ac.currentTime;
      audio.master.gain.cancelScheduledValues(now);
      audio.master.gain.setValueAtTime(audio.master.gain.value, now);
      audio.master.gain.linearRampToValueAtTime(on ? 0 : 0.16, now + (on ? 1.2 : 3.5));
      btn.setAttribute('aria-pressed', on ? 'false' : 'true');
      btn.textContent = on ? '◌ SOUND OFF' : '◉ SOUND ON';
      btn.title = on ? 'Sound is off. Nothing plays without you.' : 'Sound is on.';
    });
  }
})();
