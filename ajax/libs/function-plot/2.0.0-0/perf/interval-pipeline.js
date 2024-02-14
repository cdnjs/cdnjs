/**
 * interval-pipeline evaluates the performance of the compile, eval, render pipeline,
 * the design is at /design/pipeline.md
 */
import { Bench } from 'tinybench';
import { scaleLinear } from 'd3-scale';
import globals from '../globals.mjs';
import { IntervalWorkerPool, BackpressureStrategy } from '../samplers/interval_worker_pool.js';
import { createPathD } from '../graph-types/interval.js';
import { asyncSamplerInterval, syncSamplerInterval } from '../samplers/interval.js';
async function createData(nSamples, nGroups, async) {
    const width = 500;
    const height = 300;
    const xDomain = [-5, 5];
    const yDomain = [-5, 5];
    const xScale = scaleLinear().domain(xDomain).range([0, width]);
    const yScale = scaleLinear().domain(yDomain).range([height, 0]);
    const d = {
        fn: '1/x',
        fnType: 'linear',
        index: 1
    };
    const xAxis = { type: 'linear' };
    const yAxis = { type: 'linear' };
    const samplerParams = {
        d,
        range: xDomain,
        xScale,
        yScale,
        xAxis,
        yAxis,
        nSamples,
        nGroups
    };
    let data;
    if (async) {
        data = await asyncSamplerInterval(samplerParams);
    }
    else {
        data = syncSamplerInterval(samplerParams);
    }
    return { data, xScale, yScale };
}
async function compileAndEval() {
    const nSamplesToTest = [350, 750, 1800, 3600];
    const nGroupsToTest = [4, 8, 12];
    for (const nSamples of nSamplesToTest) {
        const bench = new Bench();
        for (const nGroups of nGroupsToTest) {
            bench.add(`nSamples=${nSamples} nGroups=${nGroups} compile and eval sync`, async function () {
                await createData(nSamples, nGroups, false);
            });
            bench.add(`nSamples=${nSamples} nGroups=${nGroups} compile and eval async`, async function () {
                await createData(nSamples, nGroups, true);
            });
        }
        await bench.run();
        console.table(bench.table());
    }
}
/**
 * consecutiveEval tests the scenario seen only in prod wherewe issue lots of
 * eval operations consecutively putting a lot of pressure on the task queue.
 */
async function consecutiveEval() {
    const bench = new Bench();
    const nSamples = 1000;
    const nGroups = 16;
    const iterations = 64;
    const backpressure = [
        BackpressureStrategy.InvalidateSeenLimit,
        BackpressureStrategy.InvalidateSeenScan,
        BackpressureStrategy.None,
        BackpressureStrategy.InvalidateSeenMap
    ];
    for (const bp of backpressure) {
        bench.add(`nSamples=${nSamples} nGroups=${nGroups} iterations=${iterations} backpressure=${bp} consecutive eval`, async function () {
            globals.workerPool.setBackpressure(bp);
            const promises = [];
            for (let i = 0; i < iterations; i += 1) {
                promises.push(createData(nSamples, nGroups, true));
            }
            await Promise.all(promises);
        });
    }
    await bench.run();
    console.table(bench.table());
}
async function drawPath() {
    const bench = new Bench();
    const nSamples = 1000;
    const { xScale, yScale, data } = await createData(nSamples, 4, false);
    bench.add(`drawPath ${nSamples}`, function () {
        createPathD(xScale, yScale, 1 /* minWidthHeight, dummy = 1 */, data[0], false /* closed */);
    });
    await bench.run();
    console.table(bench.table());
}
async function main() {
    globals.workerPool = new IntervalWorkerPool(8);
    await compileAndEval();
    await consecutiveEval();
    await drawPath();
    await globals.workerPool.terminate();
}
main();
//# sourceMappingURL=interval-pipeline.js.map