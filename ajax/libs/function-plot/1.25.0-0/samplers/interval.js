import intervalArithmeticEval, { Interval } from 'interval-arithmetic-eval';
import { interval as evaluate } from './eval.mjs';
import { infinity, space, interval2dTypedArray } from '../utils.mjs';
import globals from '../globals.mjs';
intervalArithmeticEval.policies.disableRounding();
async function asyncInterval1d({ d, xAxis, range, nSamples, nGroups, xScale, yScale }) {
    const workerPoolInterval = globals.workerPool;
    const absLo = range[0];
    const absHi = range[1];
    nGroups = nGroups || 4;
    // if nSamples = 4
    //
    // lo                 hi
    // [#     #     #     #]
    //   =====  <-- step
    //
    // See more useful math in the utils tests
    const step = (absHi - absLo) / (nSamples - 1);
    const groupSize = (nSamples - 1) / nGroups;
    const promises = [];
    const interval2dTypedArrayGroups = interval2dTypedArray(nSamples, nGroups);
    for (let i = 0; i < nGroups; i += 1) {
        const nGroup = i;
        const lo = absLo + step * groupSize * i;
        const hi = absLo + step * groupSize * (i + 1);
        // Transfers the typed arrays to the worker threads.
        promises.push(workerPoolInterval.queue({
            nGroup,
            d,
            lo,
            hi,
            n: Math.ceil(groupSize),
            interval2d: interval2dTypedArrayGroups[i]
        }));
    }
    const allWorkersDone = await Promise.all(promises);
    // Transfer the typed arrays back to the main thread.
    for (let i = 0; i < allWorkersDone.length; i += 1) {
        interval2dTypedArrayGroups[i] = new Float32Array(allWorkersDone[i]);
    }
    const samples = [];
    for (let i = 0; i < interval2dTypedArrayGroups.length; i += 1) {
        const group = interval2dTypedArrayGroups[i];
        for (let j = 0; j < group.length; j += 4) {
            const x = { lo: group[j + 0], hi: group[j + 1] };
            const y = { lo: group[j + 2], hi: group[j + 3] };
            if (y.lo === Infinity && y.hi === -Infinity) {
                // interval is empty
                continue;
            }
            else if (y.lo === -Infinity && y.hi === Infinity) {
                // skip whole interval
                continue;
            }
            else {
                samples.push([x, y]);
            }
        }
    }
    // asymptote determination
    const yMin = yScale.domain()[0] - infinity();
    const yMax = yScale.domain()[1] + infinity();
    for (let i = 1; i < samples.length - 1; i += 1) {
        if (!samples[i]) {
            const prev = samples[i - 1];
            const next = samples[i + 1];
            if (prev && next && !Interval.intervalsOverlap(prev[1], next[1])) {
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
    samples.scaledDx = xScale(absLo + step) - xScale(absLo);
    return [samples];
}
function interval1d({ d, xAxis, range, nSamples, xScale, yScale }) {
    const xCoords = space(xAxis, range, nSamples);
    const samples = [];
    for (let i = 0; i < xCoords.length - 1; i += 1) {
        const x = { lo: xCoords[i], hi: xCoords[i + 1] };
        const y = evaluate(d, 'fn', { x });
        if (!Interval.isEmpty(y) && !Interval.isWhole(y)) {
            samples.push([x, y]);
        }
        if (Interval.isWhole(y)) {
            // means that the next and prev intervals need to be fixed
            samples.push(null);
        }
    }
    // asymptote determination
    const yMin = yScale.domain()[0] - infinity();
    const yMax = yScale.domain()[1] + infinity();
    for (let i = 1; i < samples.length - 1; i += 1) {
        if (!samples[i]) {
            const prev = samples[i - 1];
            const next = samples[i + 1];
            if (prev && next && !Interval.intervalsOverlap(prev[1], next[1])) {
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
function smallRect(x, _) {
    return Interval.width(x) < rectEps;
}
function quadTree(x, y, d) {
    const sample = evaluate(d, 'fn', { x, y });
    const fulfills = Interval.zeroIn(sample);
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
const syncSamplerInterval = function sampler(samplerParams) {
    switch (samplerParams.d.fnType) {
        case 'linear':
            return interval1d(samplerParams);
        case 'implicit':
            return interval2d(samplerParams);
        default:
            throw new Error(samplerParams.d.fnType + ' is not supported in the `interval` sync sampler');
    }
};
const asyncSamplerInterval = async function sampler(samplerParams) {
    switch (samplerParams.d.fnType) {
        case 'linear':
            return asyncInterval1d(samplerParams);
        default:
            throw new Error(samplerParams.d.fnType + ' is not supported in the `interval` async sampler');
    }
};
export { syncSamplerInterval, asyncSamplerInterval };
//# sourceMappingURL=interval.js.map