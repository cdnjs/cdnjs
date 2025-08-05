import { getDayEnd, getDayStart, getDecadeEnd, getDecadeStart, getMonthEnd, getMonthStart, getYearEnd, getYearStart, } from '@wojtekmaj/date-utils';
/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of the range.
 */
export function getBegin(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return getDecadeStart(date);
        case 'year':
            return getYearStart(date);
        case 'month':
            return getMonthStart(date);
        case 'day':
            return getDayStart(date);
        default:
            throw new Error(`Invalid rangeType: ${rangeType}`);
    }
}
/**
 * Returns the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of the range.
 */
export function getEnd(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return getDecadeEnd(date);
        case 'year':
            return getYearEnd(date);
        case 'month':
            return getMonthEnd(date);
        case 'day':
            return getDayEnd(date);
        default:
            throw new Error(`Invalid rangeType: ${rangeType}`);
    }
}
