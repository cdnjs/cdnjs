window.bubbly = function (config) {
    const c = config || {};
    const r = () => Math.random();
    const canvas = document.createElement("canvas");
    canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas); // todo(tipsy): consider allowing custom canvas
    const context = canvas.getContext("2d");
    context.shadowColor = c.shadowColor || "#fff";
    context.shadowBlur = c.blur || 4;
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, c.colorStart || "#25A6E1");
    gradient.addColorStop(1, c.colorStop || "#176EB5");
    const nrBubbles = c.bubbles || Math.floor((canvas.width + canvas.height) * 0.02);
    const bubbles = [];
    for (let i = 0; i < nrBubbles; i++) {
        bubbles.push({
            f: (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(), // fillStyle
            x: r() * canvas.width, // x-position
            y: r() * canvas.height, // y-position
            r: 4 + (r() * canvas.width / 25), // radius
            a: r() * Math.PI * 2, // angle
            v: 0.1 + r() * 0.5 // velocity
        });
    }
    (function draw() {
        if (c.animate !== false) {
            requestAnimationFrame(draw);
        }
        context.globalCompositeOperation = "source-over";
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = c.compose || "lighter";
        bubbles.forEach(b => {
            context.beginPath();
            context.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            context.fillStyle = b.f;
            context.fill();
            // update positions for next draw
            b.x += Math.cos(b.a) * b.v;
            b.y += Math.sin(b.a) * b.v;
            if (b.x - b.r > canvas.width) {
                b.x = -b.r;
            }
            if (b.x + b.r < 0) {
                b.x = canvas.width + b.r;
            }
            if (b.y - b.r > canvas.height) {
                b.y = -b.r;
            }
            if (b.y + b.r < 0) {
                b.y = canvas.height + b.r;
            }
        });
    })();
};
