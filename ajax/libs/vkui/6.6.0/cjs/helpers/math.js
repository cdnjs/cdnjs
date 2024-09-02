"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    clamp: function() {
        return clamp;
    },
    precisionRound: function() {
        return precisionRound;
    },
    rescale: function() {
        return rescale;
    }
});
const clamp = (value, min, max)=>Math.max(min, Math.min(value, max));
function precisionRound(number, precision = 1) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
/**
 * Решение скопировано без изменений у MUI:
 * https://github.com/mui/material-ui/blob/v5.13.7/packages/mui-base/src/useSlider/useSlider.ts#L89-L105
 */ function getDecimalPrecision(num) {
    // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
    // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
    if (Math.abs(num) < 1) {
        const parts = num.toExponential().split('e-');
        const matissaDecimalPart = parts[0].split('.')[1];
        return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
    }
    const decimalPart = num.toString().split('.')[1];
    return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
    const nearest = Math.round((value - min) / step) * step + min;
    return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function decimatedClamp(val, min, max, step) {
    if (step == null || step <= 0) {
        return clamp(val, min, max);
    }
    const roundedValue = roundValueToStep(val, step, min);
    return clamp(roundedValue, min, max);
}
function rescale(value, from, to, options = {}) {
    const scaled = (value - from[0]) / (from[1] - from[0]) * (to[1] - to[0]) + to[0];
    return decimatedClamp(scaled, to[0], to[1], options.step);
}

//# sourceMappingURL=math.js.map