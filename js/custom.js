/**
 * Jx Blog - Premium Anime Effects
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bg-video');
    if (video) {
      video.addEventListener('error', function () {
        video.style.display = 'none';
        document.body.style.background = '#080c16';
      });
    }

    var trails = [], mx = -100, my = -100, ticking = false;
    for (var i = 0; i < 5; i++) {
      var dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;border-radius:50%;' +
        'width:' + (5 - i * 0.5) + 'px;height:' + (5 - i * 0.5) + 'px;' +
        'opacity:' + ((1 - i / 5) * 0.25) + ';' +
        'background:radial-gradient(circle,rgba(255,180,170,0.45),transparent);' +
        'box-shadow:0 0 8px rgba(255,180,170,0.2);transform:translate(-50%,-50%);';
      document.body.appendChild(dot);
      trails.push({ el: dot, x: -100, y: -100 });
    }

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!ticking) {
        requestAnimationFrame(function () {
          ticking = false;
          for (var i = trails.length - 1; i > 0; i--) {
            trails[i].x = trails[i - 1].x;
            trails[i].y = trails[i - 1].y;
          }
          trails[0].x = mx;
          trails[0].y = my;
          for (var j = 0; j < trails.length; j++) {
            trails[j].el.style.left = trails[j].x + 'px';
            trails[j].el.style.top = trails[j].y + 'px';
          }
        });
        ticking = true;
      }
    });

    var colors = ['#fde2e8', '#fcd5e0', '#f8c4d4', '#f4b8c8', '#fde8ee', '#fad4de', '#f0bcc8', '#fce0e6'];
    function petalSvg(c) {
      return 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 26%27%3E%3Cdefs%3E%3CradialGradient id=%27g%27 cx=%2740%25%27 cy=%2730%25%27%3E%3Cstop offset=%270%25%27 stop-color=%27%23fff%27 stop-opacity=%270.5%27/%3E%3Cstop offset=%27100%25%27 stop-color=%27%23' + c.replace('#', '') + '%27 stop-opacity=%270.8%27/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d=%27M10 2 C4 4 0.5 8 0.5 13 C0.5 19 4.5 23 10 25 C15.5 23 19.5 19 19.5 13 C19.5 8 16 4 10 2Z%27 fill=%27url(%23g)%27/%3E%3C/svg%3E")';
    }

    var layers = [
      { cls: 'near', n: 15, dMin: 10, dMax: 18, sw: 60, sz: [1, 1.4] },
      { cls: 'mid', n: 25, dMin: 14, dMax: 24, sw: 40, sz: [0.7, 1] },
      { cls: 'far', n: 20, dMin: 18, dMax: 30, sw: 25, sz: [0.4, 0.6] }
    ];

    layers.forEach(function (layer) {
      for (var i = 0; i < layer.n; i++) {
        var petal = document.createElement('div');
        petal.className = 'sakura-fall ' + layer.cls;
        var dur = layer.dMin + Math.random() * (layer.dMax - layer.dMin);
        var swing = (Math.random() < 0.5 ? 1 : -1) * (layer.sw + Math.random() * layer.sw * 0.8);
        var size = layer.sz[0] + Math.random() * (layer.sz[1] - layer.sz[0]);
        petal.style.left = Math.random() * 105 + '%';
        petal.style.top = Math.random() * 100 + '%';
        petal.style.animationDuration = dur + 's';
        petal.style.animationDelay = -(Math.random() * dur) + 's';
        petal.style.setProperty('--swing', swing + 'px');
        petal.style.setProperty('--petal-rotate', (Math.random() * 360) + 'deg');
        petal.style.setProperty('--petal-svg', petalSvg(colors[Math.floor(Math.random() * colors.length)]));
        petal.style.setProperty('--petal-opacity', (0.3 + Math.random() * 0.4));
        petal.style.setProperty('--peak-opacity', (0.35 + Math.random() * 0.35));
        petal.style.setProperty('--easing', 'cubic-bezier(' + (0.35 + Math.random() * 0.15) + ',0,' + (0.55 + Math.random() * 0.1) + ',1)');
        petal.style.transform = 'scale(' + size + ')';
        document.body.appendChild(petal);
      }
    });

    var clickPetals = ['*', '+', '.', 'o'];
    document.addEventListener('click', function (e) {
      if (e.target.closest('a, button, input, pre, figure, .code-copy-btn, img')) return;
      var count = 5 + Math.floor(Math.random() * 4);
      for (var i = 0; i < count; i++) {
        var petal = document.createElement('span');
        petal.className = 'click-petal';
        petal.textContent = clickPetals[Math.floor(Math.random() * clickPetals.length)];
        petal.style.left = (e.clientX + (Math.random() - 0.5) * 50) + 'px';
        petal.style.top = (e.clientY + (Math.random() - 0.5) * 30) + 'px';
        petal.style.fontSize = (10 + Math.random() * 14) + 'px';
        petal.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
        document.body.appendChild(petal);
        petal.addEventListener('animationend', function () {
          this.remove();
        });
      }
    });

    document.querySelectorAll('figure.highlight code, pre code, code').forEach(function (el) {
      if (el.innerHTML.match(/flag\{|Flag\{|FLAG\{|redrock\{|Redrock\{|REDROCK\{|palu\{|Palu\{/i)) {
        el.innerHTML = el.innerHTML.replace(
          /(flag\{[^}]+\}|Flag\{[^}]+\}|FLAG\{[^}]+\}|redrock\{[^}]+\}|Redrock\{[^}]+\}|REDROCK\{[^}]+\}|palu\{[^}]+\})/gi,
          '<span style="color:#fbbf24;text-shadow:0 0 6px rgba(251,191,36,0.4);font-weight:600">$1</span>'
        );
      }
    });
  });
})();
