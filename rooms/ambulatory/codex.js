/* The thread layer. Reads window.THREADS (threads.js), marks the words in
   the three panels, and runs the drawer. Must load after the panels' own scripts. */
(function(){
  'use strict';
  var T = window.THREADS || [], CHIPS = window.THREAD_CHIPS || [];
  // places whose text is redrawn by the panels' own scripts, or that are not prose
  var SKIP = '#p1-status,#p2-status,#p2-rack,#p3-lectern,#p3-rows,#p3-tally,svg,canvas,script,style,button,input,label,.thr,.thr-chips';
  // what counts as "a passage" around a marked word
  var UNIT = 'li,dd,.row,.fate,.price,.col,.enough,.pair>div,.hd>span,p';
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var byId = {}, cur = null, missing = 0;

  function norm(s){ return s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"').toLowerCase(); }
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt != null) e.textContent = txt; return e; }

  function find(root, phrase){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, p = norm(phrase), i;
    while((n = w.nextNode())){
      if(!n.parentElement || n.parentElement.closest(SKIP)) continue;
      i = norm(n.nodeValue).indexOf(p);
      if(i >= 0) return { n: n, i: i };
    }
    return null;
  }

  // 1. mark the words
  T.forEach(function(t){
    byId[t.id] = t; t.hits = [];
    (t.marks || []).forEach(function(m){
      var root = document.getElementById('p' + m[0]), f = root && find(root, m[1]);
      if(!f){ missing++; console.warn('[threads] not found in panel ' + m[0] + ' (' + t.id + '): "' + m[1] + '"'); return; }
      var mid = f.n.splitText(f.i); mid.splitText(m[1].length);
      var s = el('span', 'thr'); s.setAttribute('data-t', t.id); s.setAttribute('role', 'button'); s.tabIndex = 0;
      mid.parentNode.replaceChild(s, mid); s.appendChild(mid);
      var u = s.closest(UNIT) || s.parentElement;
      if(u.parentElement && u.parentElement.matches('.absent')) u = u.parentElement;
      u.classList.add('thr-unit');
      if(!t.hits.some(function(h){ return h.unit === u; })) t.hits.push({ span: s, unit: u });
    });
    t.hits.sort(function(a, b){ return a.span.compareDocumentPosition(b.span) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
  });
  if(missing) console.warn('[threads] ' + missing + ' mark(s) not found. Check the wording in threads.js.');

  // 2. reading a passage back as plain text
  function flat(u){
    var w = document.createTreeWalker(u, NodeFilter.SHOW_TEXT), n, out = '';
    while((n = w.nextNode())){
      var p = n.parentElement;
      if(p.closest('.n,.arrow,.thr-chips')) continue;
      var prev = n.previousSibling;
      var joined = (prev && prev.nodeName !== 'BR') || (!prev && p.matches('em,i,s,a,.thr'));
      out += (joined ? '' : ' ') + n.nodeValue;
    }
    return out.replace(/\s+/g, ' ').trim();
  }
  function where(u){
    var sec = u.closest('section'), eb = sec && sec.querySelector('.eyebrow'), out = eb ? eb.textContent : '';
    var c = u.closest('.card,.yard'), h = c && c.querySelector('h3');
    if(h) out += ' · ' + h.textContent;
    if(u.tagName === 'DD' && u.previousElementSibling) out += ' · ' + u.previousElementSibling.textContent;
    return out;
  }
  function excerpt(hit){
    var text = flat(hit.unit), ph = hit.span.textContent.replace(/\s+/g, ' ').trim();
    var i = norm(text).indexOf(norm(ph)), a = 0, b = text.length, x = el('span', 'x');
    if(i < 0){ x.textContent = text.length > 240 ? text.slice(0, 240) + '…' : text; return x; }
    if(text.length > 240){
      a = Math.max(0, i - 90); b = Math.min(text.length, i + ph.length + 110);
      if(a > 0){ var sa = text.indexOf(' ', a); if(sa > -1 && sa < i) a = sa + 1; }
      if(b < text.length){ var sb = text.lastIndexOf(' ', b); if(sb > i + ph.length) b = sb; }
    }
    x.appendChild(document.createTextNode((a > 0 ? '…' : '') + text.slice(a, i)));
    x.appendChild(el('mark', '', text.slice(i, i + ph.length)));
    x.appendChild(document.createTextNode(text.slice(i + ph.length, b) + (b < text.length ? '…' : '')));
    return x;
  }

  // 3. the drawer
  var drawer = el('aside'); drawer.id = 'thr-drawer'; drawer.hidden = true; drawer.setAttribute('aria-label', 'Threads');
  var head = el('div', 'thr-head'), body = el('div', 'thr-body');
  drawer.appendChild(head); drawer.appendChild(body); document.body.appendChild(drawer);
  var fab = el('button'); fab.id = 'thr-fab'; fab.type = 'button'; document.body.appendChild(fab);
  fab.addEventListener('click', function(){ open(null); });

  // the finder's rack: one wick per thread, cold until that thread is found.
  // Kept in this browser only, so each visitor has a rack of their own.
  var FOUND = 'unnamed-faith-found', found = {};
  try {
    var raw = JSON.parse(localStorage.getItem(FOUND) || '[]');
    if(Array.isArray(raw)) raw.forEach(function(id){ if(byId[id]) found[id] = 1; });
  } catch(e){}
  function saveFound(){ try { localStorage.setItem(FOUND, JSON.stringify(Object.keys(found))); } catch(e){} }
  function nFound(){ return T.filter(function(t){ return found[t.id]; }).length; }
  function wick(t){ var w = el('span', 'wk' + (found[t.id] ? ' lit' : '')); w.appendChild(el('i')); w.appendChild(el('b')); return w; }
  function rackGrid(){
    var g = el('div', 'thr-rack');
    T.forEach(function(t){
      var lit = !!found[t.id], b = el('button', 'wkc' + (lit ? ' lit' : '')); b.type = 'button';
      b.appendChild(wick(t)); b.appendChild(el('span', 'nm', lit ? t.name : 'cold'));
      if(lit) b.addEventListener('click', function(){ open(t.id); });
      else { b.disabled = true; b.setAttribute('aria-label', 'A thread not found yet'); }
      g.appendChild(b);
    });
    return g;
  }
  var footRack = document.getElementById('thr-rack');
  function drawRacks(fresh){
    var n = nFound();
    fab.textContent = '';
    T.forEach(function(t){ var w = wick(t); if(t.id === fresh) w.classList.add('new'); fab.appendChild(w); });
    fab.setAttribute('aria-label', 'Your rack: ' + n + ' of ' + T.length + ' candles lit');
    fab.hidden = !n || !drawer.hidden;
    if(footRack){
      footRack.textContent = '';
      footRack.appendChild(rackGrid());
      footRack.appendChild(el('p', 'how', n === T.length ? 'All ' + n + ' lit. That is one reading. The text holds others.'
        : n ? n + ' of ' + T.length + ' lit. The cold ones are still out there in the text.'
        : 'Nothing lit yet. A candle lights for each thread you find in the text above.'));
    }
  }

  function clearMarks(){
    document.querySelectorAll('.thr.on,.thr-chip.on').forEach(function(e){ e.classList.remove('on'); });
    document.querySelectorAll('.thr-lit').forEach(function(e){ e.classList.remove('thr-lit'); });
  }
  function closeBtn(){
    var x = el('button', 'thr-x', 'Close'); x.type = 'button'; x.addEventListener('click', close); return x;
  }
  function go(hit){
    // a passage inside a folded church: open that church in the rose window first
    var card = hit.unit.closest('.card');
    if(card && !document.documentElement.classList.contains('unrolled') && !card.classList.contains('on')){
      var pane = document.querySelectorAll('#p3 .pane')[parseInt(card.id.replace(/\D+/g, ''), 10) - 1];
      if(pane) pane.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    hit.unit.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    hit.unit.classList.remove('thr-flash'); void hit.unit.offsetWidth; hit.unit.classList.add('thr-flash');
    body.querySelectorAll('.thr-hop.here').forEach(function(e){ e.classList.remove('here'); });
  }
  function open(id, from){
    clearMarks(); cur = id; head.textContent = ''; body.textContent = '';
    var t = id && byId[id], fresh = null;
    if(t && !found[id]){ found[id] = 1; saveFound(); fresh = id; }
    if(!t){
      var n = nFound();
      head.appendChild(el('span', 'thr-eyebrow', n + ' of ' + T.length + ' found'));
      head.appendChild(closeBtn());
      head.appendChild(el('h2', '', 'Your rack'));
      head.appendChild(el('p', '', n === T.length ? 'All ' + n + ' lit. That is one reading. The text holds others.'
        : 'A candle lights for each thread you find. The cold ones are still out there in the text.'));
      body.appendChild(rackGrid());
      if(n){
        var snuff = el('button', 'thr-all', 'Snuff them all'); snuff.type = 'button';
        snuff.addEventListener('click', function(){ found = {}; saveFound(); open(null); });
        body.appendChild(snuff);
      }
    } else {
      head.appendChild(el('span', 'thr-eyebrow', (fresh ? 'Thread found · ' : 'Thread · ') + t.hits.length + ' passages'));
      head.appendChild(closeBtn());
      head.appendChild(el('h2', '', t.name));
      head.appendChild(el('p', '', t.gloss));
      var list = el('ol', 'thr-list');
      t.hits.forEach(function(h){
        h.span.classList.add('on'); h.unit.classList.add('thr-lit');
        var li = el('li'), b = el('button', 'thr-hop' + (from && h.unit.contains(from) ? ' here' : '')); b.type = 'button';
        b.appendChild(el('span', 'w', where(h.unit)));
        b.appendChild(excerpt(h));
        b.addEventListener('click', function(){ go(h); });
        li.appendChild(b); list.appendChild(li);
      });
      // other words of this thread inside an already-listed passage still light up
      document.querySelectorAll('.thr[data-t="' + id + '"]').forEach(function(s){ s.classList.add('on'); });
      document.querySelectorAll('.thr-chip[data-t="' + id + '"]').forEach(function(c){ c.classList.add('on'); });
      body.appendChild(list);
      var all = el('button', 'thr-all', 'Your rack'); all.type = 'button';
      all.addEventListener('click', function(){ open(null); });
      body.appendChild(all);
    }
    drawer.hidden = false; drawRacks(fresh); body.scrollTop = 0;
    document.documentElement.classList.add('thr-open');
    var here = body.querySelector('.thr-hop.here'); if(here) here.scrollIntoView({ block: 'nearest' });
  }
  function close(){
    clearMarks(); cur = null; drawer.hidden = true; drawRacks();
    document.documentElement.classList.remove('thr-open');
  }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('.thr,.thr-chip');
    if(!t) return;
    open(t.getAttribute('data-t'), t.classList.contains('thr') ? t : null);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !drawer.hidden){ close(); return; }
    if((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('thr')){
      e.preventDefault(); open(e.target.getAttribute('data-t'), e.target);
    }
  });

  // 4. thread buttons under the objects, on the cover, and in the rose window's lectern
  function chips(ids, label){
    var row = el('div', 'thr-chips'); if(label) row.appendChild(el('i', '', label));
    ids.forEach(function(id){
      if(!byId[id]) return;
      var b = el('button', 'thr-chip', byId[id].name); b.type = 'button'; b.setAttribute('data-t', id);
      if(id === cur) b.classList.add('on');
      row.appendChild(b);
    });
    return row;
  }
  CHIPS.forEach(function(c){
    var at = document.querySelector(c.after);
    if(at) at.insertAdjacentElement('afterend', chips(c.threads, 'threads'));
  });

  // 5. the door: the page opens on the monstrance alone, and its ring can be read once slowed
  var mon = document.getElementById('p1-mon'), say = document.getElementById('p1-say'), stat = document.getElementById('p1-status');
  var TK = {}; Object.keys(window.THREAD_TICKER || {}).forEach(function(k){ TK[norm(k)] = window.THREAD_TICKER[k]; });
  if(mon && say && stat){
    var hero = mon.closest('section'), door = el('div', 'door');
    var monChips = stat.nextElementSibling && stat.nextElementSibling.classList.contains('thr-chips') ? stat.nextElementSibling : null;
    hero.insertBefore(door, hero.firstChild);
    door.appendChild(mon); door.appendChild(say); door.appendChild(stat); if(monChips) door.appendChild(monChips);
    window.dispatchEvent(new Event('resize'));

    var ringHit = function(e){
      var g = mon._ring; if(!g || g.slowed < 0.6) return null;
      var r = mon.getBoundingClientRect(), x = e.clientX - r.left - g.cx, y = e.clientY - r.top - g.cy, d = Math.sqrt(x * x + y * y);
      if(d < g.R) return TK.centre || null;
      if(Math.abs(d - g.rt) > Math.max(g.fs * 1.7, 18)) return null;
      var i = Math.round((Math.atan2(x, -y) + g.rot) / (Math.PI * 2) * g.count);
      var k = ((i % g.count) + g.count) % g.count % g.tick.length, parts = g.tick.split(' · '), pos = 0;
      for(var p = 0; p < parts.length; p++){
        if(k < pos + parts[p].length + 3) return TK[norm(parts[p])] || null;
        pos += parts[p].length + 3;
      }
      return null;
    };
    mon.addEventListener('click', function(e){ var id = ringHit(e); if(id && byId[id]) open(id); });
    mon.addEventListener('mousemove', function(e){ mon.style.cursor = ringHit(e) ? 'pointer' : ''; });
  }

  var lectern = document.getElementById('p3-lectern');
  function dressLectern(){
    if(!lectern || lectern.querySelector('.thr-chips')) return;
    var card = document.querySelector('#p3 .card.on'); if(!card) return;
    var ids = [];
    card.querySelectorAll('.thr').forEach(function(s){ var id = s.getAttribute('data-t'); if(ids.indexOf(id) < 0) ids.push(id); });
    if(ids.length) lectern.appendChild(chips(ids, 'threads'));
  }
  if(lectern){ new MutationObserver(dressLectern).observe(lectern, { childList: true }); dressLectern(); }

  // 6. rooms. The twelve churches fold into the rose window: tap a pane and its whole
  //    entry opens under the glass. "Unrolled" puts the roll back where it was, all twelve open.
  var cards = document.getElementById('p3-cards'), root = document.documentElement, rollBtns = [];
  function setRoll(open){
    root.classList.toggle('unrolled', open);
    if(open) rollHome.parentNode.insertBefore(cards, rollHome); else lectern.parentNode.insertBefore(cards, lectern);
    rollBtns.forEach(function(b){ b.textContent = open ? b._on : b._off; b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  }
  function rollBtn(off, on, after){
    var b = el('button', 'thr-all', off); b.type = 'button'; b._off = off; b._on = on;
    b.addEventListener('click', function(){ var open = !root.classList.contains('unrolled'); setRoll(open); after(open); });
    rollBtns.push(b); return b;
  }
  if(cards && lectern){
    var rollHome = document.createComment('the roll unrolls here');
    cards.parentNode.insertBefore(rollHome, cards);
    var rollNote = el('div', 'roll-note');
    rollNote.appendChild(el('p', '', 'The twelve entries open from the window above, one pane at a time.'));
    rollNote.appendChild(rollBtn('Unroll all twelve here', 'Fold them back into the window', function(open){
      (open ? cards : rollNote).scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    }));
    rollHome.parentNode.insertBefore(rollNote, rollHome);
    cards.setAttribute('aria-live', 'polite');
    setRoll(false);

    // the plain read-through, offered at the very end
    var foot = document.querySelector('footer.cover');
    if(foot){
      var straight = el('div', 'roll-note');
      straight.appendChild(el('p', '', 'Had enough of doors? Everything, in order, nothing folded.'));
      straight.appendChild(rollBtn('Read it straight through', 'Fold it back up', function(open){
        var start = document.querySelector('#p1 .door');
        if(open && start && start.nextElementSibling) start.nextElementSibling.scrollIntoView({ behavior: 'auto', block: 'start' });
      }));
      foot.insertBefore(straight, foot.lastElementChild);
    }
  }

  // 7. the parish rack: a candle says who it is for, and offers the thread that party runs on
  var rack = document.getElementById('p2-rack'), RK = {};
  Object.keys(window.THREAD_RACK || {}).forEach(function(k){ RK[norm(k)] = window.THREAD_RACK[k]; });
  if(rack){
    var rackNote = el('div', 'rack-note'); rackNote.hidden = true; rackNote.setAttribute('aria-live', 'polite');
    rack.insertAdjacentElement('afterend', rackNote);
    rack.addEventListener('click', function(e){
      var c = e.target.closest && e.target.closest('.cell'), lab = c && c.querySelector('.lab'), r = lab && RK[norm(lab.textContent)];
      rackNote.textContent = '';
      if(!r){ rackNote.hidden = true; return; }
      rackNote.appendChild(el('span', 'thr-eyebrow', 'This candle is for'));
      rackNote.appendChild(el('h3', '', lab.textContent));
      rackNote.appendChild(el('p', '', r.note));
      if(byId[r.thread]) rackNote.appendChild(chips([r.thread], 'follow'));
      rackNote.hidden = false;
    });
  }

  // 8. the palette switch: the painting's colours (the default), or the first plum palette
  var footer = document.querySelector('footer.cover');
  if(footer){
    var hot = document.documentElement.classList.contains('painting'), pal = el('div', 'pal');
    pal.appendChild(el('p', '', hot ? 'Colours: sampled from the painting.' : 'Colours: the first palette, plum.'));
    var sw = el('button', 'thr-all', hot ? 'Try the first palette' : 'Back to the painting’s'); sw.type = 'button';
    sw.addEventListener('click', function(){
      try { localStorage.setItem('unnamed-faith-palette', hot ? 'page' : 'painting'); } catch(e){}
      location.href = location.pathname;
    });
    pal.appendChild(sw); footer.insertBefore(pal, footer.lastElementChild);
  }

  drawRacks();
})();
