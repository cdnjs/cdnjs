window.bubbly = function (config) {
    const c = config || {};
    const r = () => Math.random();
    const canvas = c.canvas || document.createElement("canvas");
    let width = canvas.width;
    let height = canvas.height;
    if (canvas.parentNode === null) {
        canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
    }
    const context = canvas.getContext("2d");
    context.shadowColor = c.shadowColor || "#fff";
    context.shadowBlur = c.blur || 4;
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, c.colorStart || "#2AE");
    gradient.addColorStop(1, c.colorStop || "#17B");
    const nrBubbles = c.bubbles || Math.floor((width + height) * 0.02);
    const bubbles = [];
    for (let i = 0; i < nrBubbles; i++) {
        bubbles.push({
            f: (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(), // fillStyle
            x: r() * width, // x-position
            y: r() * height, // y-position
            r: 4 + (r() * width / 25), // radius
            a: r() * Math.PI * 2, // angle
            v: 0.1 + r() * 0.5 // velocity
        });
    }
    (function draw() {
        if (canvas.parentNode === null) {
            return cancelAnimationFrame(draw)
        }
        if (c.animate !== false) {
            requestAnimationFrame(draw);
        }
        context.globalCompositeOperation = "source-over";
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = c.compose || "lighter";
        bubbles.forEach(bubble => {
            context.beginPath();
            context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
            context.fillStyle = bubble.f;
            context.fill();
            // update positions for next draw
            bubble.x += Math.cos(bubble.a) * bubble.v;
            bubble.y += Math.sin(bubble.a) * bubble.v;
            if (bubble.x - bubble.r > width) {
                bubble.x = -bubble.r;
            }
            if (bubble.x + bubble.r < 0) {
                bubble.x = width + bubble.r;
            }
            if (bubble.y - bubble.r > height) {
                bubble.y = -bubble.r;
            }
            if (bubble.y + bubble.r < 0) {
                bubble.y = height + bubble.r;
            }
        });
    })();
};
