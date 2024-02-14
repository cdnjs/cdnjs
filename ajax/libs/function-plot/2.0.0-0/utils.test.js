import { describe, expect, it } from '@jest/globals';
import { linspace, logspace, interval2dTypedArray } from './utils.mjs';
describe('utils', function () {
    it('linspace should create n equally separated points', () => {
        const numbers = linspace(0, 10, 11);
        expect(numbers.length).toEqual(11);
        expect(numbers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    it('logspace should create n log separated points', () => {
        const numbers = logspace(Math.log10(10), Math.log10(100), 11);
        expect(numbers.length).toEqual(11);
        expect(numbers[0]).toEqual(10);
        expect(numbers[numbers.length - 1]).toEqual(100);
    });
    it('interval2d typed array should create a container for 2d intervals', () => {
        // if we call linspace(0, 23, nSamples) we should have 0, 1, 2, ..., 23
        const fourGroups = interval2dTypedArray(24, 4);
        // we should have 4 typed arrays (`nGroups`)
        expect(fourGroups.length).toEqual(4);
        // each one should have 4 (2 intervals) * 6 (split of nSamples into a single group) elements
        expect(fourGroups[0].length).toEqual(4 * 6);
        expect(fourGroups[1].length).toEqual(4 * 6);
        expect(fourGroups[2].length).toEqual(4 * 6);
        expect(fourGroups[3].length).toEqual(4 * 6);
        const oneGroup = interval2dTypedArray(24, 1);
        // we should have 1 typed arrays (`nGroups`)
        expect(oneGroup.length).toEqual(1);
        // it should have space for 4 (2 intervals) * 24
        expect(oneGroup[0].length).toEqual(24 * 4);
    });
    it('interesting math for interval2dTypedArray bucketing', () => {
        const absLo = 0;
        const absHi = 24;
        const nSamples = 25;
        const numbers = linspace(absLo, absHi, nSamples);
        expect(numbers.length).toEqual(25);
        expect(numbers[0]).toEqual(0);
        expect(numbers[numbers.length - 1]).toEqual(24);
        const step = (absHi - absLo) / (nSamples - 1);
        expect(absLo + step * (nSamples - 1)).toEqual(absHi);
        // bucketing into 4 groups (each one should have 6 elements)
        const nGroups = 4;
        const groupSize = (nSamples - 1) / nGroups;
        expect([absLo + step * groupSize * 0, absLo + step * groupSize * 1]).toEqual([0, 6]);
        expect([absLo + step * groupSize * 1, absLo + step * groupSize * 2]).toEqual([6, 12]);
        expect([absLo + step * groupSize * 2, absLo + step * groupSize * 3]).toEqual([12, 18]);
        expect([absLo + step * groupSize * 3, absLo + step * groupSize * 4]).toEqual([18, 24]);
    });
});
//# sourceMappingURL=utils.test.js.map