"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
const eval_1 = require("../helpers/eval");
function checkAsymptote(d0, d1, d, sign, level) {
    if (!level) {
        return { asymptote: true, d0, d1 };
    }
    const n = 10;
    const x0 = d0[0];
    const x1 = d1[0];
    const samples = utils_1.default.linspace(x0, x1, n);
    let oldY, oldX;
    for (let i = 0; i < n; i += 1) {
        const x = samples[i];
        const y = (0, eval_1.builtIn)(d, 'fn', { x });
        if (oldY) {
            const deltaY = y - oldY;
            const newSign = utils_1.default.sgn(deltaY);
            if (newSign === sign) {
                return checkAsymptote([oldX, oldY], [x, y], d, sign, level - 1);
            }
        }
        oldY = y;
        oldX = x;
    }
    return { asymptote: false, d0, d1 };
}
/**
 * Splits the evaluated data into arrays, each array is separated by any asymptote found
 * through the process of detecting slope/sign brusque changes
 *
 * @returns {Array[]}
 */
function split(d, data, yScale) {
    let oldSign;
    const evalResult = [];
    const yMin = yScale.domain()[0] - utils_1.default.infinity();
    const yMax = yScale.domain()[1] + utils_1.default.infinity();
    let evalGroup = [data[0]];
    let i = 1;
    let deltaX = utils_1.default.infinity();
    while (i < data.length) {
        const yOld = data[i - 1][1];
        const yNew = data[i][1];
        const deltaY = yNew - yOld;
        const newSign = utils_1.default.sgn(deltaY);
        // make a new set if:
        if (
        // we have at least 2 entries (so that we can compute deltaY)
        evalGroup.length >= 2 &&
            // utils.sgn(y1) * utils.sgn(y0) < 0 && // there's a change in the evaluated values sign
            // there's a change in the slope sign
            oldSign !== newSign &&
            // the slope is bigger to some value (according to the current zoom scale)
            Math.abs(deltaY / deltaX) > 1) {
            // retest this section again and determine if it's an asymptote
            const check = checkAsymptote(data[i - 1], data[i], d, newSign, 3);
            if (check.asymptote) {
                // data[i-1] has an updated [x,y], it was already added to a group (in a previous iteration)
                // we just need to update the yCoordinate
                data[i - 1][0] = check.d0[0];
                data[i - 1][1] = utils_1.default.clamp(check.d0[1], yMin, yMax);
                evalResult.push(evalGroup);
                // data[i] has an updated [x,y], create a new group with it.
                data[i][0] = check.d1[0];
                data[i][1] = utils_1.default.clamp(check.d1[1], yMin, yMax);
                evalGroup = [data[i]];
            }
            else {
                // false alarm, it's not an asymptote
                evalGroup.push(data[i]);
            }
        }
        else {
            evalGroup.push(data[i]);
        }
        // wait for at least 2 entries in the group before computing deltaX.
        if (evalGroup.length > 1) {
            deltaX = evalGroup[evalGroup.length - 1][0] - evalGroup[evalGroup.length - 2][0];
            oldSign = newSign;
        }
        ++i;
    }
    if (evalGroup.length) {
        evalResult.push(evalGroup);
    }
    return evalResult;
}
function linear(samplerParams) {
    const allX = utils_1.default.space(samplerParams.xAxis, samplerParams.range, samplerParams.nSamples);
    const yDomain = samplerParams.yScale.domain();
    // const yDomainMargin = yDomain[1] - yDomain[0]
    const yMin = yDomain[0] - utils_1.default.infinity();
    const yMax = yDomain[1] + utils_1.default.infinity();
    const data = [];
    for (let i = 0; i < allX.length; i += 1) {
        const x = allX[i];
        let y = (0, eval_1.builtIn)(samplerParams.d, 'fn', { x });
        if (utils_1.default.isValidNumber(x) && utils_1.default.isValidNumber(y)) {
            y = utils_1.default.clamp(y, yMin, yMax);
            data.push([x, y]);
        }
    }
    const splitData = split(samplerParams.d, data, samplerParams.yScale);
    return splitData;
}
function parametric(samplerParams) {
    // range is mapped to canvas coordinates from the input
    // for parametric plots the range will tell the start/end points of the `t` param
    const parametricRange = samplerParams.d.range || [0, 2 * Math.PI];
    const tCoords = utils_1.default.space(samplerParams.xAxis, parametricRange, samplerParams.nSamples);
    const samples = [];
    for (let i = 0; i < tCoords.length; i += 1) {
        const t = tCoords[i];
        const x = (0, eval_1.builtIn)(samplerParams.d, 'x', { t });
        const y = (0, eval_1.builtIn)(samplerParams.d, 'y', { t });
        samples.push([x, y]);
    }
    return [samples];
}
function polar(samplerParams) {
    // range is mapped to canvas coordinates from the input
    // for polar plots the range will tell the start/end points of the `theta` param
    const polarRange = samplerParams.d.range || [-Math.PI, Math.PI];
    const thetaSamples = utils_1.default.space(samplerParams.xAxis, polarRange, samplerParams.nSamples);
    const samples = [];
    for (let i = 0; i < thetaSamples.length; i += 1) {
        const theta = thetaSamples[i];
        const r = (0, eval_1.builtIn)(samplerParams.d, 'r', { theta });
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        samples.push([x, y]);
    }
    return [samples];
}
function points(samplerParams) {
    return [samplerParams.d.points];
}
function vector(sampleParams) {
    const d = sampleParams.d;
    d.offset = d.offset || [0, 0];
    return [[d.offset, [d.vector[0] + d.offset[0], d.vector[1] + d.offset[1]]]];
}
const sampler = function sampler(samplerParams) {
    const fnTypes = {
        parametric,
        polar,
        points,
        vector,
        linear
    };
    if (!(samplerParams.d.fnType in fnTypes)) {
        throw Error(samplerParams.d.fnType + ' is not supported in the `builtIn` sampler');
    }
    // @ts-ignore
    return fnTypes[samplerParams.d.fnType].apply(null, arguments);
};
exports.default = sampler;
//# sourceMappingURL=builtIn.js.map