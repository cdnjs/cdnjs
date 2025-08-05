"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBegin = getBegin;
exports.getEnd = getEnd;
const date_utils_1 = require("@wojtekmaj/date-utils");
/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of the range.
 */
function getBegin(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return (0, date_utils_1.getDecadeStart)(date);
        case 'year':
            return (0, date_utils_1.getYearStart)(date);
        case 'month':
            return (0, date_utils_1.getMonthStart)(date);
        case 'day':
            return (0, date_utils_1.getDayStart)(date);
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
function getEnd(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return (0, date_utils_1.getDecadeEnd)(date);
        case 'year':
            return (0, date_utils_1.getYearEnd)(date);
        case 'month':
            return (0, date_utils_1.getMonthEnd)(date);
        case 'day':
            return (0, date_utils_1.getDayEnd)(date);
        default:
            throw new Error(`Invalid rangeType: ${rangeType}`);
    }
}
