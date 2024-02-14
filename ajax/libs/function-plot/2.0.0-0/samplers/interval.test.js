import { describe, expect, it } from '@jest/globals';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { Interval } from 'interval-arithmetic-eval';
import { syncSamplerInterval } from './interval.js';
const width = 200;
const height = 100;
const xDomain = [-5, 5];
const yDomain = [-5, 5];
const xScale = d3ScaleLinear().domain(xDomain).range([0, width]);
const yScale = d3ScaleLinear().domain(yDomain).range([height, 0]);
function toBeCloseToInterval(got, want, eps = 1e-3) {
    // @ts-ignore
    if (!Interval.isInterval(got) || !Interval.isInterval(want)) {
        throw new Error('got and want must be Intervals');
    }
    if (Math.abs(got.lo - want.lo) > eps || Math.abs(got.hi - want.hi) > eps) {
        return {
            message: () => `expected ${this.utils.printReceived(got)} to be within range of ${this.utils.printReceived(want)}`,
            pass: false
        };
    }
    return { pass: true };
}
// @ts-ignore
expect.extend({ toBeCloseToInterval });
describe('interval sampler', () => {
    describe('with linear sampler', () => {
        it('should render 2 points for x', () => {
            const nSamples = 2;
            // map the screen coordinates [0, width] to the domain [-5, 5]
            const samplerParams = {
                d: { fn: '1000000*x', fnType: 'linear' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                yAxis: { type: 'linear' },
                nSamples
            };
            // @ts-ignore
            const data = syncSamplerInterval(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group */
            expect(data[0].length).toEqual(1); /* the group should have 1 single result */
            expect(data[0][0].length).toEqual(2); /* the result should be an array of 2 intervals */
            // the the group should be evaluated at 2 points, however with intervals
            // we only need 2 pairs expressed in a single datum
            //
            // [x, y] where x = [x_lo, x_hi] and y = [y_lo, y_hi]
            //
            // The graphical way is to see the bounded rectangle
            // .......... y_hi
            // .        .
            // .        .
            // .        .
            // .......... y_lo
            // x_lo   x_hi
            // @ts-ignore
            expect(data[0][0][0]).toBeCloseToInterval({ lo: -5, hi: 5 }); /* the x_lo, x_hi tuple */
            // @ts-ignore
            expect(data[0][0][1]).toBeCloseToInterval({ lo: -5000000, hi: 5000000 }); /* the y_lo, y_hi tuple */
        });
        it('should render 100000 points for x^2', () => {
            const nSamples = 100001;
            // map the screen coordinates [0, width] to the domain [-5, 5]
            const samplerParams = {
                d: { fn: 'x^2', fnType: 'linear' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                yAxis: { type: 'linear' },
                nSamples
            };
            // @ts-ignore
            const data = syncSamplerInterval(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group */
            expect(data[0].length).toEqual(100000); /* the group should have nSamples - 1 single result */
            // @ts-ignore
            expect(data[0][0][0]).toBeCloseToInterval({ lo: -5, hi: -5 });
            // @ts-ignore
            expect(data[0][0][1]).toBeCloseToInterval({ lo: 25, hi: 25 });
            // @ts-ignore
            expect(data[0][50000][0]).toBeCloseToInterval({ lo: 0, hi: 0 });
            // @ts-ignore
            expect(data[0][50000][1]).toBeCloseToInterval({ lo: 0, hi: 0 });
            // @ts-ignore
            expect(data[0][99999][0]).toBeCloseToInterval({ lo: 5, hi: 5 });
            // @ts-ignore
            expect(data[0][99999][1]).toBeCloseToInterval({ lo: 25, hi: 25 });
        });
        it('should render 1 group for 1/x', () => {
            const nSamples = 4;
            // map the screen coordinates [0, width] to the domain [-5, 5]
            const samplerParams = {
                d: { fn: '1/x', fnType: 'linear' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                yAxis: { type: 'linear' },
                nSamples
            };
            // @ts-ignore
            const data = syncSamplerInterval(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group */
            expect(data[0].length).toEqual(3); /* the group should have nSamples - 1 single result */
            expect(data[0][1]).toEqual(null); /* the interval containing 1/0 should not be rendered */
        });
    });
});
//# sourceMappingURL=interval.test.js.map