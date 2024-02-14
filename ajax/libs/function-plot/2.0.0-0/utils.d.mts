export function linspace(lo: any, hi: any, n: any): any[];
export function logspace(lo: any, hi: any, n: any): number[];
export function isValidNumber(v: any): boolean;
export function space(axis: any, range: any, n: any): any[];
/**
 * Creates `n` number of samples between `lo` and `hi` where consecutive
 * numbers are bucketed in `nGroups` groups.
 */
export function spaceWithGroups(axis: any, lo: any, hi: any, n: any, nGroups: any): any[][];
export function interval2dTypedArray(n: any, nGroups: any): Float32Array[];
export function getterSetter(config: any, option: any): void;
export class getterSetter {
    constructor(config: any, option: any);
}
export function sgn(v: any): 1 | 0 | -1;
export function clamp(v: any, vMin: any, vMax: any): any;
export function color(data: any, index: any): any;
/**
 * Infinity is a value that is close to Infinity but not Infinity, it can fit in a JS number.
 */
export function infinity(): number;
