export var clamp = function(value, min, max) {
    return Math.max(min, Math.min(value, max));
};
export function precisionRound(number) {
    var precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
/**
 * Решение скопировано без изменений у MUI:
 * https://github.com/mui/material-ui/blob/v5.13.7/packages/mui-base/src/useSlider/useSlider.ts#L89-L105
 */ function getDecimalPrecision(num) {
    // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
    // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
    if (Math.abs(num) < 1) {
        var parts = num.toExponential().split("e-");
        var matissaDecimalPart = parts[0].split(".")[1];
        return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
    }
    var decimalPart = num.toString().split(".")[1];
    return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
    var nearest = Math.round((value - min) / step) * step + min;
    return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function decimatedClamp(val, min, max, step) {
    if (step == null || step <= 0) {
        return clamp(val, min, max);
    }
    var roundedValue = roundValueToStep(val, step, min);
    return clamp(roundedValue, min, max);
}
export function rescale(value, from, to) {
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var scaled = (value - from[0]) / (from[1] - from[0]) * (to[1] - to[0]) + to[0];
    return decimatedClamp(scaled, to[0], to[1], options.step);
}

//# sourceMappingURL=math.js.map