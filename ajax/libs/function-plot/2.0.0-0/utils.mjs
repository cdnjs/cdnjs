import globals from './globals.mjs';
export function linspace(lo, hi, n) {
    const step = (hi - lo) / (n - 1);
    return Array.from({ length: n }, (_, i) => lo + step * i);
}
export function logspace(lo, hi, n) {
    return linspace(lo, hi, n).map((x) => Math.pow(10, x));
}
export function isValidNumber(v) {
    return typeof v === 'number' && !isNaN(v);
}
export function space(axis, range, n) {
    const lo = range[0];
    const hi = range[1];
    if (axis.type === 'log') {
        return logspace(Math.log10(lo), Math.log10(hi), n);
    }
    // default is linear
    return linspace(lo, hi, n);
}
/**
 * Creates `n` number of samples between `lo` and `hi` where consecutive
 * numbers are bucketed in `nGroups` groups.
 */
export function spaceWithGroups(axis, lo, hi, n, nGroups) {
    if (axis.type === 'log') {
        lo = Math.log10(lo);
        hi = Math.log10(hi);
    }
    const step = (hi - lo) / (n - 1);
    const groups = [];
    const maxInGroup = Math.ceil(n / nGroups);
    let group = [];
    groups.push(group);
    for (let i = 0; i < n; i += 1) {
        let v = lo + step * i;
        if (axis.type === 'log') {
            v = Math.pow(10, v);
        }
        group.push(v);
        if (group.length === maxInGroup && groups.length < nGroups) {
            group = [v];
            groups.push(group);
        }
    }
    return groups;
}
export function interval2dTypedArray(n, nGroups) {
    const groups = [];
    for (let i = 0; i < nGroups; i += 1) {
        groups.push(new Float32Array((n / nGroups) * 4));
    }
    return groups;
}
export function getterSetter(config, option) {
    const me = this;
    this[option] = function (value) {
        if (!arguments.length) {
            return config[option];
        }
        config[option] = value;
        return me;
    };
}
export function sgn(v) {
    if (v < 0) {
        return -1;
    }
    if (v > 0) {
        return 1;
    }
    return 0;
}
export function clamp(v, vMin, vMax) {
    if (v < vMin)
        return vMin;
    if (v > vMax)
        return vMax;
    return v;
}
export function color(data, index) {
    const indexModLenColor = index % globals.COLORS.length;
    return data.color || globals.COLORS[indexModLenColor].formatHex();
}
/**
 * Infinity is a value that is close to Infinity but not Infinity, it can fit in a JS number.
 */
export function infinity() {
    return 9007199254740991;
}
//# sourceMappingURL=utils.mjs.map