export const clamp = (value, min, max)=>Math.max(min, Math.min(value, max));
export function precisionRound(number, precision = 1) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
function precision(number) {
    return (`${number}`.split('.')[1] || '').length;
}
function decimatedClamp(val, min, max, step) {
    if (step == null || step <= 0) {
        return clamp(val, min, max);
    }
    const prec = precision(step);
    // Round value to nearest min + k1 * step
    const decimatedOffset = precisionRound(Math.round((val - min) / step) * step, prec);
    // Round range length _down_ to nearest min + k2 * step
    const decimatedRange = precisionRound(Math.floor((max - min) / step) * step, prec);
    return min + clamp(decimatedOffset, 0, decimatedRange);
}
export function rescale(value, from, to, options = {}) {
    const scaled = (value - from[0]) / (from[1] - from[0]) * (to[1] - to[0]) + to[0];
    return decimatedClamp(scaled, to[0], to[1], options.step);
}

//# sourceMappingURL=math.js.map