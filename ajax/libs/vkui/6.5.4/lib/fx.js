/**
 * ease function
 * @param x absolute progress of the animation in bounds 0 (beginning) and 1 (end)
 */ export function easeInOutSine(x) {
    return 0.5 * (1 - Math.cos(Math.PI * x));
}
export function cubicBezier(x1, x2) {
    return function(progress) {
        const t = progress;
        const cx = 3 * x1;
        const bx = 3 * (x2 - x1) - cx;
        const ax = 1 - cx - bx;
        const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t;
        return x;
    };
}

//# sourceMappingURL=fx.js.map