import type { RangeType } from './types.js';
/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export declare function getBegin(rangeType: RangeType, date: Date): Date;
/**
 * Returns the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export declare function getEnd(rangeType: RangeType, date: Date): Date;
