/**
 * A generic set of mutation-free date functions.
 */
/**
 * now returns the current date without any time values
 *
 * @returns {Date}
 */
export declare function now(): Date;
/**
 * dateEq compares two dates
 *
 * @param {Date} date1 the first date
 * @param {Date} date2 the second date
 * @returns {boolean}
 */
export declare function datesEq(date1?: Date, date2?: Date): boolean;
/**
 * shiftDay shifts the specified date by n days
 *
 * @param {Date} dt
 * @param {number} n
 * @returns {Date}
 */
export declare function shiftDay(dt: Date, n: number): Date;
/**
 * shiftMonth shifts the specified date by a specified number of months
 *
 * @param {Date} dt
 * @param {number} n
 * @param {boolean} wrap optional, if true, does not change year
 *                       value, defaults to false
 * @returns {Date}
 */
export declare function shiftMonth(dt: Date, n: number, wrap?: boolean): Date;
/**
 * shiftYear shifts the specified date by n years
 *
 * @param {Date} dt
 * @param {number} n
 * @returns {Date}
 */
export declare function shiftYear(dt: Date, n: number): Date;
/**
 * setYear changes the specified date to the specified year
 *
 * @param {Date} dt
 * @param {number} year
 */
export declare function setYear(dt: Date, year: number): Date;
/**
 * setMonth changes the specified date to the specified month
 *
 * @param {Date} dt
 * @param {number} month
 */
export declare function setMonth(dt: Date, month: number): Date;
/**
 * constrainDate returns dt or min/max depending on whether dt is out of bounds (inclusive)
 *
 * @export
 * @param {Date} dt
 * @param {Date} min
 * @param {Date} max
 * @returns {Date}
 */
export declare function constrainDate(dt?: Date, min?: Date, max?: Date): Date | undefined;
//# sourceMappingURL=date-manip.d.ts.map