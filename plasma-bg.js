(function () {
  function init() {
    const canvas = document.getElementById('plasma-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const P = 30;
    const Wfreq = (2 * Math.PI) / P;
    const GAIN = 0.32;
    let cols = 0, rows = 0, cellW = 10, cellH = 10, X, Y;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    function plasmaColor(k) {
      const h = (210 + 120 * k) % 360;
      const s = 75;
      const l = 20 + 26 * k;
      return `hsl(${h} ${s}% ${l}%)`;
    }

    function resize() {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCell = w < 700 ? 12 : 10;
      cols = Math.max(32, Math.ceil(w / targetCell));
      rows = Math.max(18, Math.ceil(h / targetCell));
      cellW = w / cols;
      cellH = h / rows;
      X = Float32Array.from({ length: cols }, (_, c) => c + 0.5 - cols / 2);
      Y = Float32Array.from({ length: rows }, (_, r) => (r + 0.5 - rows / 2) * 2);
      if (!pointer.active) {
        pointer.x = pointer.tx = 0;
        pointer.y = pointer.ty = 0;
      }
    }

    function setPointer(clientX, clientY) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (clientX / w - 0.5) * 2;
      const ny = (clientY / h - 0.5) * 2;
      pointer.tx = nx * (cols * 0.35);
      pointer.ty = ny * (rows * 0.35);
      pointer.active = true;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => setPointer(e.clientX, e.clientY), { passive: true });
    window.addEventListener('pointerdown', (e) => setPointer(e.clientX, e.clientY), { passive: true });
    window.addEventListener('pointerleave', () => { pointer.active = false; });
    resize();

    function render(t) {
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      if (!pointer.active) {
        pointer.tx *= 0.96;
        pointer.ty *= 0.96;
      }
      const a = Wfreq * t;
      const ca = Math.cos(a), sa = Math.sin(a);
      const cx = 14 * Math.sin(a) + pointer.x;
      const cy = 9 * Math.cos(2 * a) + pointer.y;
      const shift = pointer.x * 0.04;
      for (let r = 0; r < rows; r++) {
        const y = Y[r];
        for (let c = 0; c < cols; c++) {
          const x = X[c];
          let v = Math.sin(x * 0.11 + 3 * a + shift);
          v += Math.sin(y * 0.13 - 2 * a - pointer.y * 0.03);
          v += Math.sin((x * ca + y * sa) * 0.09 + 4 * a);
          v += Math.sin(Math.hypot(x - cx, y - cy) * 0.17 - 5 * a);
          const u = v * GAIN + a / Math.PI;
          const k = Math.abs(u - 2 * Math.floor(u / 2 + 0.5));
          ctx.fillStyle = plasmaColor(k);
          ctx.fillRect(c * cellW, r * cellH, cellW + 1, cellH + 1);
        }
      }
    }

    if (reduce) { render(0); return; }
    let start = performance.now();
    function loop(now) {
      render((now - start) / 1000);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
