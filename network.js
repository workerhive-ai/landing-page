(function () {
  var canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var NODE_COUNT = 55;
  var MAX_DIST = 160;
  var nodes = [];
  var width, height;
  var animId;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function initNodes() {
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          var alpha = (1 - dist / MAX_DIST) * 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(90, 140, 220, ' + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140, 185, 255, 0.75)';
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () {
    cancelAnimationFrame(animId);
    resize();
    initNodes();
    draw();
  });

  resize();
  initNodes();
  draw();
})();
