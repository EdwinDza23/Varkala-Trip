/* TAB SWITCH */
    function switchTab(id, btn) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('tab-' + id).classList.add('active');
      btn.classList.add('active');
      window.scrollTo({ top: document.querySelector('.nav-wrap').offsetTop, behavior: 'smooth' });
      if (id === 'packing') upc();
    }

    /* PACKING */
    function tp(el) { el.classList.toggle('ck'); upc(); }
    function upc() {
      const tot = document.querySelectorAll('.pitem').length;
      const ck = document.querySelectorAll('.pitem.ck').length;
      const el = document.getElementById('pctr');
      if (el) el.innerHTML = `<strong>${ck}</strong> of ${tot} items packed${ck === tot ? ' — You\'re ready! 🎉' : ''}`;
    }
    upc();

    /* PARALLAX */
    const himg = document.getElementById('himg');
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', function (e) {
      const r = this.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      himg.style.transform = `scale(1.1) translate(${dx * -14}px,${dy * -9}px)`;
    });
    hero.addEventListener('mouseleave', function () {
      himg.style.transition = 'transform 1.2s ease';
      himg.style.transform = 'scale(1.08) translate(0,0)';
      setTimeout(() => himg.style.transition = 'transform 0.08s linear', 1200);
    });

    /* WAVE ANIMATION */
    (function () {
      const w1 = document.getElementById('wv1'), w2 = document.getElementById('wv2');
      let t = 0;
      (function loop() {
        t += 0.012;
        const a = Math.sin(t) * 20, b = Math.cos(t * 0.65) * 15, c = Math.sin(t * 1.3) * 10;
        w1.setAttribute('d', `M0,${50 + a} C240,${88 - a} 480,${12 + b} 720,${50 + a} C960,${88 - a} 1200,${12 + b} 1440,${50 + c} L1440,100 L0,100 Z`);
        w2.setAttribute('d', `M0,${68 - b} C200,${32 + a} 460,${80 - a} 720,${58 + b} C980,${36 - b} 1240,${74 + c} 1440,${58 - a} L1440,100 L0,100 Z`);
        requestAnimationFrame(loop);
      })();
    })();

    /* PARTICLES */
    (function () {
      const cv = document.getElementById('ptcl'), ctx = cv.getContext('2d');
      let W, H, pts = [];
      function rsz() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; }
      rsz(); window.addEventListener('resize', rsz);
      function mk() { return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.2, vx: (Math.random() - .5) * .35, vy: -(Math.random() * .25 + .05), a: Math.random() * .55 + .1, lf: Math.random() * 220 + 80, age: 0 }; }
      for (let i = 0; i < 90; i++)pts.push(mk());
      (function draw() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p, i) => {
          p.age++;
          const fade = Math.min(p.age / 25, 1) * Math.max(1 - (p.age - p.lf + 25) / 25, 0);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.a * fade})`; ctx.fill();
          p.x += p.vx; p.y += p.vy;
          if (p.age > p.lf) pts[i] = mk();
        });
        requestAnimationFrame(draw);
      })();
    })();

    /* COUNT-UP */
    (function () {
      const cfgs = [{ id: 's0', val: 3, pre: '' }, { id: 's1', val: 1200, pre: '~' }, { id: 's3', val: 6, pre: '' }];
      setTimeout(() => {
        cfgs.forEach(c => {
          const el = document.getElementById(c.id); if (!el) return;
          let cur = 0; const step = Math.ceil(c.val / 40);
          const t = setInterval(() => { cur = Math.min(cur + step, c.val); el.textContent = c.pre + cur; if (cur >= c.val) clearInterval(t); }, 28);
        });
      }, 1300);
    })();