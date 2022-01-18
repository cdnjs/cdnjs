"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clamp_1 = __importDefault(require("clamp"));
const utils_1 = __importDefault(require("../utils"));
const eval_1 = require("../helpers/eval");
function checkAsymptote(d0, d1, d, sign, level) {
    if (!level) {
        return {
            asymptote: true,
            d0: d0,
            d1: d1
        };
    }
    const n = 10;
    const x0 = d0[0];
    const x1 = d1[0];
    const samples = utils_1.default.linspace(x0, x1, n);
    let oldY, oldX;
    for (let i = 0; i < n; i += 1) {
        const x = samples[i];
        const y = eval_1.builtIn(d, 'fn', { x: x });
        if (i && oldY) {
            const deltaY = y - oldY;
            const newSign = utils_1.default.sgn(deltaY);
            if (newSign === sign) {
                return checkAsymptote([oldX, oldY], [x, y], d, sign, level - 1);
            }
        }
        oldY = y;
        oldX = x;
    }
    return {
        asymptote: false,
        d0: d0,
        d1: d1
    };
}
/**
 * Splits the evaluated data into arrays, each array is separated by any asymptote found
 * through the process of detecting slope/sign brusque changes
 * @param chart
 * @param d
 * @param data
 * @returns {Array[]}
 */
function split(chart, d, data) {
    let i, oldSign;
    let deltaX;
    let st = [];
    const sets = [];
    const domain = chart.meta.yScale.domain();
    const yMin = domain[0];
    const yMax = domain[1];
    if (data[0]) {
        st.push(data[0]);
        deltaX = data[1][0] - data[0][0];
        oldSign = utils_1.default.sgn(data[1][1] - data[0][1]);
    }
    function updateY(d) {
        d[1] = Math.min(d[1], yMax);
        d[1] = Math.max(d[1], yMin);
        return d;
    }
    i = 1;
    while (i < data.length) {
        const y0 = data[i - 1][1];
        const y1 = data[i][1];
        const deltaY = y1 - y0;
        const newSign = utils_1.default.sgn(deltaY);
        // make a new set if:
        if ( // utils.sgn(y1) * utils.sgn(y0) < 0 && // there's a change in the evaluated values sign
        // there's a change in the slope sign
        oldSign !== newSign &&
            // the slope is bigger to some value (according to the current zoom scale)
            Math.abs(deltaY / deltaX) > 1 / 1) {
            // retest this section again and determine if it's an asymptote
            const check = checkAsymptote(data[i - 1], data[i], d, newSign, 3);
            if (check.asymptote) {
                st.push(updateY(check.d0));
                sets.push(st);
                st = [updateY(check.d1)];
            }
        }
        oldSign = newSign;
        st.push(data[i]);
        ++i;
    }
    if (st.length) {
        sets.push(st);
    }
    return sets;
}
function linear(chart, d, range, n) {
    const allX = utils_1.default.space(chart, range, n);
    const yDomain = chart.meta.yScale.domain();
    const yDomainMargin = (yDomain[1] - yDomain[0]);
    const yMin = yDomain[0] - yDomainMargin * 1e5;
    const yMax = yDomain[1] + yDomainMargin * 1e5;
    let data = [];
    for (let i = 0; i < allX.length; i += 1) {
        const x = allX[i];
        const y = eval_1.builtIn(d, 'fn', { x: x });
        if (utils_1.default.isValidNumber(x) && utils_1.default.isValidNumber(y)) {
            data.push([x, clamp_1.default(y, yMin, yMax)]);
        }
    }
    data = split(chart, d, data);
    return data;
}
function parametric(chart, d, range, nSamples) {
    // range is mapped to canvas coordinates from the input
    // for parametric plots the range will tell the start/end points of the `t` param
    const parametricRange = d.range || [0, 2 * Math.PI];
    const tCoords = utils_1.default.space(chart, parametricRange, nSamples);
    const samples = [];
    for (let i = 0; i < tCoords.length; i += 1) {
        const t = tCoords[i];
        const x = eval_1.builtIn(d, 'x', { t: t });
        const y = eval_1.builtIn(d, 'y', { t: t });
        samples.push([x, y]);
    }
    return [samples];
}
function polar(chart, d, range, nSamples) {
    // range is mapped to canvas coordinates from the input
    // for polar plots the range will tell the start/end points of the `theta` param
    const polarRange = d.range || [-Math.PI, Math.PI];
    const thetaSamples = utils_1.default.space(chart, polarRange, nSamples);
    const samples = [];
    for (let i = 0; i < thetaSamples.length; i += 1) {
        const theta = thetaSamples[i];
        const r = eval_1.builtIn(d, 'r', { theta: theta });
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        samples.push([x, y]);
    }
    return [samples];
}
function points(chart, d, range, nSamples) {
    return [d.points];
}
function vector(chart, d, range, nSamples) {
    d.offset = d.offset || [0, 0];
    return [[
            d.offset,
            [d.vector[0] + d.offset[0], d.vector[1] + d.offset[1]]
        ]];
}
const sampler = function (chart, d, range, nSamples) {
    const fnTypes = {
        parametric: parametric,
        polar: polar,
        points: points,
        vector: vector,
        linear: linear
    };
    if (!(d.fnType in fnTypes)) {
        throw Error(d.fnType + ' is not supported in the `builtIn` sampler');
    }
    // @ts-ignore
    return fnTypes[d.fnType].apply(null, arguments);
};
exports.default = sampler;
//# sourceMappingURL=builtIn.js.map