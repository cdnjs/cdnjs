import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { expect } from '@jest/globals';
import builtIn from './builtIn.js';
const width = 200;
const height = 100;
const xDomain = [-5, 5];
const yDomain = [-5, 5];
const xScale = d3ScaleLinear().domain(xDomain).range([0, width]);
const yScale = d3ScaleLinear().domain(yDomain).range([height, 0]);
function toBeCloseTo(got, want, eps = 1e-3) {
    if (!Array.isArray(got) || !Array.isArray(want)) {
        throw new Error('Got and Want must be arrays');
    }
    if (Math.abs(got[0] - want[0]) > eps || Math.abs(got[1] - want[1]) > eps) {
        return {
            message: () => `expected ${this.utils.printReceived(got)} to be within range of ${this.utils.printReceived(want)}`,
            pass: false
        };
    }
    return { pass: true };
}
expect.extend({ toBeCloseTo });
describe('builtIn sampler', () => {
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
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group of points (all connected) */
            expect(data[0].length).toEqual(nSamples); /* the group should have 101 points */
            expect(data[0][0]).toEqual([-5, -5000000]);
            expect(data[0][1]).toEqual([5, 5000000]);
        });
        it('should render 101 points for x^2', () => {
            const nSamples = 101;
            // map the screen coordinates [0, width] to the domain [-5, 5]
            const samplerParams = {
                d: { fn: 'x^2', fnType: 'linear' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group of points (all connected) */
            expect(data[0].length).toEqual(nSamples); /* the group should have 101 points */
            expect(data[0][0]).toEqual([-5, 25]); /* f(-5) = [-5, 25] */
            expect(data[0][50]).toEqual([0, 0]); /* f(0) = [0, 0] */
            expect(data[0][100]).toEqual([5, 25]); /* f(5) = [5, 25] */
        });
        it('should render 2 groups for 1/x', () => {
            const nSamples = 1000;
            // map the screen coordinates [0, width] to the domain [-5, 5]
            const samplerParams = {
                d: { fn: '1/x', fnType: 'linear' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(2); /* we expect 2 group of points (left of 0, right of 0) */
            expect(data[0].length).toEqual(nSamples / 2); /* the 1st group should have 50 points */
            expect(data[1].length).toEqual(nSamples / 2); /* the 2nd group should have 50 points */
        });
        it('should render 0 groups for sqrt(x)', () => {
            const nSamples = 1000;
            const xDomain = [-100, -95];
            const yDomain = [-5, 5];
            const xScale = d3ScaleLinear().domain(xDomain).range([0, width]);
            const yScale = d3ScaleLinear().domain(yDomain).range([height, 0]);
            const samplerParams = {
                // The square root of any point in the range [-100, -99, ..., -95] isn't
                // defined so the evaluation should return 0 points.
                d: { fn: 'sqrt(x)', fnType: 'linear' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(0); /* we expect 0 group of points */
        });
    });
    describe('with parametric sampler', () => {
        it('should render a circle of radius 1', () => {
            const nSamples = 1001;
            const samplerParams = {
                d: { x: 'cos(t)', y: 'sin(t)', fnType: 'parametric' },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 2 group of points (left of 0, right of 0) */
            expect(data[0].length).toEqual(nSamples); /* the 1st group should have 50 points */
            expect(data[0][0]).toBeCloseTo([1, 0]);
            expect(data[0][250]).toBeCloseTo([0, 1]);
            expect(data[0][500]).toBeCloseTo([-1, 0]);
            expect(data[0][750]).toBeCloseTo([0, -1]);
            expect(data[0][1000]).toBeCloseTo([1, 0]);
        });
    });
    describe('with points sampler', () => {
        it('should render a cube', () => {
            const nSamples = 4;
            const samplerParams = {
                d: {
                    points: [
                        [1, 1],
                        [2, 1],
                        [2, 2],
                        [1, 2]
                    ],
                    fnType: 'points'
                },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group */
            expect(data[0].length).toEqual(nSamples); /* to have 4 points */
            expect(data[0][0]).toBeCloseTo([1, 1]);
            expect(data[0][1]).toBeCloseTo([2, 1]);
            expect(data[0][2]).toBeCloseTo([2, 2]);
            expect(data[0][3]).toBeCloseTo([1, 2]);
        });
    });
    describe('with vector sampler', () => {
        it('should render a vector', () => {
            const nSamples = 2;
            const samplerParams = {
                d: {
                    vector: [2, 1],
                    offset: [1, 2],
                    fnType: 'vector'
                },
                range: xDomain,
                xScale,
                yScale,
                xAxis: { type: 'linear' },
                nSamples
            };
            const data = builtIn(samplerParams);
            expect(data instanceof Array).toEqual(true);
            expect(data.length).toEqual(1); /* we expect 1 group */
            expect(data[0].length).toEqual(nSamples); /* to have 2 points */
            expect(data[0][0]).toBeCloseTo([1, 2]);
            expect(data[0][1]).toBeCloseTo([3, 3]);
        });
    });
});
//# sourceMappingURL=builtIn.test.js.map