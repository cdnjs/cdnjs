"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interval_arithmetic_eval_1 = __importStar(require("interval-arithmetic-eval"));
const eval_1 = require("../helpers/eval");
const utils_1 = __importDefault(require("../utils"));
interval_arithmetic_eval_1.default.policies.disableRounding();
function interval1d(samplerParams) {
    const xCoords = utils_1.default.space(samplerParams.xAxis, samplerParams.range, samplerParams.nSamples);
    const xScale = samplerParams.xScale;
    const yScale = samplerParams.yScale;
    const yMin = yScale.domain()[0];
    const yMax = yScale.domain()[1];
    const samples = [];
    let i;
    for (i = 0; i < xCoords.length - 1; i += 1) {
        const x = { lo: xCoords[i], hi: xCoords[i + 1] };
        const y = (0, eval_1.interval)(samplerParams.d, 'fn', { x });
        if (!interval_arithmetic_eval_1.Interval.isEmpty(y) && !interval_arithmetic_eval_1.Interval.isWhole(y)) {
            samples.push([x, y]);
        }
        if (interval_arithmetic_eval_1.Interval.isWhole(y)) {
            // means that the next and prev intervals need to be fixed
            samples.push(null);
        }
    }
    // asymptote determination
    for (i = 1; i < samples.length - 1; i += 1) {
        if (!samples[i]) {
            const prev = samples[i - 1];
            const next = samples[i + 1];
            if (prev && next && !interval_arithmetic_eval_1.Interval.intervalsOverlap(prev[1], next[1])) {
                // case:
                //
                //   |
                //
                //     |
                //
                //   p n
                if (prev[1].lo > next[1].hi) {
                    prev[1].hi = Math.max(yMax, prev[1].hi);
                    next[1].lo = Math.min(yMin, next[1].lo);
                }
                // case:
                //
                //     |
                //
                //   |
                //
                //   p n
                if (prev[1].hi < next[1].lo) {
                    prev[1].lo = Math.min(yMin, prev[1].lo);
                    next[1].hi = Math.max(yMax, next[1].hi);
                }
            }
        }
    }
    ;
    samples.scaledDx = xScale(xCoords[1]) - xScale(xCoords[0]);
    return [samples];
}
let rectEps;
function smallRect(x, y) {
    return interval_arithmetic_eval_1.Interval.width(x) < rectEps;
}
function quadTree(x, y, d) {
    const sample = (0, eval_1.interval)(d, 'fn', { x, y });
    const fulfills = interval_arithmetic_eval_1.Interval.zeroIn(sample);
    if (!fulfills) {
        return this;
    }
    if (smallRect(x, y)) {
        this.push([x, y]);
        return this;
    }
    const midX = x.lo + (x.hi - x.lo) / 2;
    const midY = y.lo + (y.hi - y.lo) / 2;
    const east = { lo: midX, hi: x.hi };
    const west = { lo: x.lo, hi: midX };
    const north = { lo: midY, hi: y.hi };
    const south = { lo: y.lo, hi: midY };
    quadTree.call(this, east, north, d);
    quadTree.call(this, east, south, d);
    quadTree.call(this, west, north, d);
    quadTree.call(this, west, south, d);
}
function interval2d(samplerParams) {
    const xScale = samplerParams.xScale;
    const xDomain = samplerParams.xScale.domain();
    const yDomain = samplerParams.yScale.domain();
    const x = { lo: xDomain[0], hi: xDomain[1] };
    const y = { lo: yDomain[0], hi: yDomain[1] };
    const samples = [];
    // 1 px
    rectEps = xScale.invert(1) - xScale.invert(0);
    quadTree.call(samples, x, y, samplerParams.d);
    samples.scaledDx = 1;
    return [samples];
}
const sampler = function sampler(samplerParams) {
    const fnTypes = {
        implicit: interval2d,
        linear: interval1d
    };
    if (!Object.hasOwn(fnTypes, samplerParams.d.fnType)) {
        throw Error(samplerParams.d.fnType + ' is not supported in the `interval` sampler');
    }
    // @ts-ignore
    return fnTypes[samplerParams.d.fnType].apply(null, arguments);
};
exports.default = sampler;
//# sourceMappingURL=interval.js.map