/* ∞⟨🍁∴↯⟩∞  THE ROOM SHELL — the part every room draws the same way.

   INSIDE THE HOUSE
   The portal draws the house from outside: an elevation with fire banked
   around it and one opening per room. In a room you are standing behind
   one of those openings, so the same two things return from the other
   side: the frame you are at, and the fire still burning past it.

   A room asks for it with one line, and tunes it there:

     <canvas id="frame" data-accent="57,255,90" data-heat="1"></canvas>

     data-accent  the room's light, as r,g,b
     data-heat    how hot the fire past the frame burns, 0 to 1

   Corner brackets and a sill rather than a closed rectangle: brackets read
   as a drawing of an opening, which is what the portal is drawing too.
   Same three-rate flicker as the portal, so the pages burn at the same
   temperature. Reduced motion gets the frame and the fire, standing still. */

(function () {
  const c = document.getElementById('frame');
  if (!c) return;
  const ctx = c.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ACCENT = c.dataset.accent || '57,255,90';
  const HEAT   = parseFloat(c.dataset.heat || '1');

  let W = 0, H = 0, t = 0;

  function resize(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = c.clientWidth; H = c.clientHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);

    const ix = Math.min(W * .055, 46);
    const iy = Math.min(H * .06, 42);

    // fire, in the margin outside the frame
    const flick = (a, b, cc) =>
      .74 + .15 * Math.sin(t * a) + .08 * Math.sin(t * b + 1.7) + .05 * Math.sin(t * cc + .4);

    const bands = [
      { x0:0, y0:H, x1:0, y1:H - iy * 3.1, k:flick(.31,.73,1.9), a:1   },
      { x0:0, y0:0, x1:0, y1:iy * 2.3,     k:flick(.24,.61,1.3), a:.5  },
      { x0:0, y0:0, x1:ix * 2.6, y1:0,     k:flick(.19,.55,1.1), a:.75 },
      { x0:W, y0:0, x1:W - ix * 2.6, y1:0, k:flick(.27,.67,1.5), a:.75 }
    ];

    for (const b of bands){
      const g = ctx.createLinearGradient(b.x0, b.y0, b.x1, b.y1);
      const i = b.k * b.a * HEAT;
      g.addColorStop(0,   `rgba(255,92,26,${.11 * i})`);
      g.addColorStop(.4,  `rgba(214,54,12,${.05 * i})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // the opening, drafted
    const arm = Math.min(W, H) * .055;
    ctx.save();
    ctx.strokeStyle = `rgba(${ACCENT},.16)`;
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';

    const corner = (x, y, dx, dy) => {
      ctx.beginPath();
      ctx.moveTo(x + dx * arm, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * arm);
      ctx.stroke();
    };
    corner(ix,     iy,     +1, +1);
    corner(W - ix, iy,     -1, +1);
    corner(ix,     H - iy, +1, -1);
    corner(W - ix, H - iy, -1, -1);

    // sill: the edge you would lean on
    ctx.strokeStyle = `rgba(${ACCENT},.1)`;
    ctx.beginPath();
    ctx.moveTo(ix + arm * 1.3, H - iy);
    ctx.lineTo(W - ix - arm * 1.3, H - iy);
    ctx.stroke();
    ctx.restore();
  }

  function loop(){ t += .01; draw(); requestAnimationFrame(loop); }

  addEventListener('resize', () => { resize(); draw(); });
  resize();
  reduced ? draw() : loop();
})();
