/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {Date} value Value to return.
 * @param {Date} min Minimum return value.
 * @param {Date} max Maximum return value.
 * @returns {Date} Value between min and max.
 */
export declare function between<T extends Date>(value: T, min?: T | null, max?: T | null): T;
export declare function safeMin(...args: unknown[]): number;
export declare function safeMax(...args: unknown[]): number;
