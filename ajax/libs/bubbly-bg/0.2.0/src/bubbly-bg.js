window.bubbly = function (config) {
    let c = config || {};
    let r = () => Math.random();
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    let gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, c.colorStart || "#25A6E1");
    gradient.addColorStop(1, c.colorStop || "#176EB5");
    let nrBubbles = c.bubbles || Math.floor((canvas.width + canvas.height) * 0.02);
    let bubbles = [];
    for (let i = 0; i < nrBubbles; i++) {
        bubbles.push({
            fill: (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(),
            xPos: r() * canvas.width,
            yPos: r() * canvas.height,
            radius: 4 + (r() * canvas.width / 25),
            angle: r() * Math.PI * 2,
            velocity: 0.1 + r() * 0.5
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
        context.shadowColor = c.shadowColor || "#fff";
        bubbles.forEach(b => {
            context.beginPath();
            context.arc(b.xPos, b.yPos, b.radius, 0, Math.PI * 2);
            context.fillStyle = b.fill;
            context.shadowBlur = c.blur || (2 + r() * 5);
            context.fill();
            // update positions for next draw
            b.xPos += Math.cos(b.angle) * b.velocity;
            b.yPos += Math.sin(b.angle) * b.velocity;
            if (b.xPos - b.radius > canvas.width) {
                b.xPos = -b.radius;
            }
            if (b.xPos + b.radius < 0) {
                b.xPos = canvas.width + b.radius;
            }
            if (b.yPos - b.radius > canvas.height) {
                b.yPos = -b.radius;
            }
            if (b.yPos + b.radius < 0) {
                b.yPos = canvas.height + b.radius;
            }
        });
    })();
};
