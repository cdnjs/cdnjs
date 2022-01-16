/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { TimeUnit } from "../defs/TimeUnit";
import * as $type from "../utils/Type";
/**
 * Maps time period names to their numeric representations in milliseconds.
 *
 * @ignore Exclude from docs
 */
export declare let timeUnitDurations: {
    [Key in TimeUnit]: number;
};
/**
 * Returns the next time unit that goes after source `unit`.
 *
 * E.g. "hour" is the next unit after "minute", etc.
 *
 * @ignore Exclude from docs
 * @param unit  Source time unit
 * @return Next time unit
 */
export declare function getNextUnit(unit: TimeUnit): $type.Optional<TimeUnit>;
/**
 * Returns number of milliseconds in the `count` of time `unit`.
 *
 * Available units: "millisecond", "second", "minute", "hour", "day", "week",
 * "month", and "year".
 *
 * @ignore Exclude from docs
 * @param unit   Time unit
 * @param count  Number of units
 * @return Milliseconds
 */
export declare function getDuration(unit: TimeUnit, count?: number): number;
/**
 * Returns current `Date` object.
 *
 * @return Current date
 */
export declare function now(): Date;
/**
 * Returns current timestamp.
 *
 * @return Current timestamp
 */
export declare function getTime(): number;
/**
 * Returns a copy of the `Date` object.
 *
 * @ignore Exclude from docs
 * @param date  Source date
 * @return Copy
 */
export declare function copy(date: Date): Date;
/**
 * Checks if the `unit` part of two `Date` objects do not match. Two dates
 * represent a "range" of time, rather the same time date.
 *
 * @ignore Exclude from docs
 * @param dateOne  Date 1
 * @param dateTwo  Date 2
 * @param unit     Time unit to check
 * @return Range?
 */
export declare function checkChange(dateOne: Date, dateTwo: Date, unit: TimeUnit, utc?: boolean): boolean;
/**
 * Adds `count` of time `unit` to the source date. Returns a modified `Date` object.
 *
 * @ignore Exclude from docs
 * @param date   Source date
 * @param unit   Time unit
 * @param count  Number of units to add
 * @return Modified date
 */
export declare function add(date: Date, unit: TimeUnit, count: number, utc?: boolean): Date;
/**
 * "Rounds" the date to specific time unit.
 *
 * @ignore Exclude from docs
 * @param date             Source date
 * @param unit             Time unit
 * @param count            Number of units to round to
 * @param firstDateOfWeek  First day of week
 * @param roundMinutes     Minutes to round to (some timezones use non-whole hour)
 * @param timezone         Use specific named timezone when rounding
 * @return New date
 */
export declare function round(date: Date, unit: TimeUnit, count: number, firstDateOfWeek?: number, utc?: boolean, firstDate?: Date, roundMinutes?: number, timezone?: string): Date;
/**
 * Returns a new `Date` object which corresponds to the source date in a
 * specific timezone.
 *
 * @since 4.10.1
 * @param   date      Source date
 * @param   timezone  Timezone identifier
 * @return            Recalculated new Date
 */
export declare function setTimezone(date: Date, timezone: string): Date;
/**
 * Returns minute fraction of the set timezone.
 *
 * @since 4.10.12
 * @param  timezone  Timezone identifier
 * @return           Minutes
 */
export declare function getTimezoneMinutes(timezone: string): number;
