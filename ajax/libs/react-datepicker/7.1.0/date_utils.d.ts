import { addDays } from "date-fns/addDays";
import { addHours } from "date-fns/addHours";
import { addMinutes } from "date-fns/addMinutes";
import { addMonths } from "date-fns/addMonths";
import { addQuarters } from "date-fns/addQuarters";
import { addSeconds } from "date-fns/addSeconds";
import { addWeeks } from "date-fns/addWeeks";
import { addYears } from "date-fns/addYears";
import { getDate } from "date-fns/getDate";
import { getDay } from "date-fns/getDay";
import { getHours } from "date-fns/getHours";
import { getMinutes } from "date-fns/getMinutes";
import { getMonth } from "date-fns/getMonth";
import { getQuarter } from "date-fns/getQuarter";
import { getSeconds } from "date-fns/getSeconds";
import { getTime } from "date-fns/getTime";
import { getYear } from "date-fns/getYear";
import { isAfter } from "date-fns/isAfter";
import { isBefore } from "date-fns/isBefore";
import { isDate } from "date-fns/isDate";
import { set } from "date-fns/set";
import { setHours } from "date-fns/setHours";
import { setMinutes } from "date-fns/setMinutes";
import { setMonth } from "date-fns/setMonth";
import { setQuarter } from "date-fns/setQuarter";
import { setYear } from "date-fns/setYear";
import { subDays } from "date-fns/subDays";
import { subMonths } from "date-fns/subMonths";
import { subQuarters } from "date-fns/subQuarters";
import { subWeeks } from "date-fns/subWeeks";
import { subYears } from "date-fns/subYears";
import type { Day, Locale as DateFnsLocale } from "date-fns";
export type DateNumberType = Day;
interface LocaleObj extends Pick<DateFnsLocale, "options" | "formatLong" | "localize" | "match"> {
}
export type Locale = string | LocaleObj;
export declare enum KeyType {
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",
    PageUp = "PageUp",
    PageDown = "PageDown",
    Home = "Home",
    End = "End",
    Enter = "Enter",
    Space = " ",
    Tab = "Tab",
    Escape = "Escape",
    Backspace = "Backspace",
    X = "x"
}
export declare const DEFAULT_YEAR_ITEM_NUMBER = 12;
export declare function newDate(value?: string | Date | number | null): Date;
/**
 * Parses a date.
 *
 * @param value - The string representing the Date in a parsable form, e.g., ISO 1861
 * @param dateFormat - The date format.
 * @param locale - The locale.
 * @param strictParsing - The strict parsing flag.
 * @param minDate - The minimum date.
 * @returns - The parsed date or null.
 */
export declare function parseDate(value: string, dateFormat: string | string[], locale: Locale | undefined, strictParsing: boolean, minDate?: Date): Date | null;
export { isDate, set };
/**
 * Checks if a given date is valid and not before the minimum date.
 * @param date - The date to be checked.
 * @param minDate - The minimum date allowed. If not provided, defaults to "1/1/1800".
 * @returns A boolean value indicating whether the date is valid and not before the minimum date.
 */
export declare function isValid(date: Date, minDate?: Date): boolean;
/**
 * Formats a date.
 *
 * @param date - The date.
 * @param formatStr - The format string.
 * @param locale - The locale.
 * @returns - The formatted date.
 */
export declare function formatDate(date: Date, formatStr: string, locale?: Locale): string;
/**
 * Safely formats a date.
 *
 * @param date - The date.
 * @param options - An object containing the dateFormat and locale.
 * @returns - The formatted date or an empty string.
 */
export declare function safeDateFormat(date: Date | null | undefined, { dateFormat, locale }: {
    dateFormat: string | string[];
    locale?: Locale;
}): string;
/**
 * Safely formats a date range.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @param props - The props.
 * @returns - The formatted date range or an empty string.
 */
export declare function safeDateRangeFormat(startDate: Date | null | undefined, endDate: Date | null | undefined, props: {
    dateFormat: string | string[];
    locale?: Locale;
}): string;
/**
 * Safely formats multiple dates.
 *
 * @param dates - The dates.
 * @param props - The props.
 * @returns - The formatted dates or an empty string.
 */
export declare function safeMultipleDatesFormat(dates: Date[], props: {
    dateFormat: string | string[];
    locale?: Locale;
}): string;
/**
 * Sets the time for a given date.
 *
 * @param date - The date.
 * @param time - An object containing the hour, minute, and second.
 * @returns - The date with the time set.
 */
export declare function setTime(date: Date, { hour, minute, second }: {
    hour?: number | undefined;
    minute?: number | undefined;
    second?: number | undefined;
}): Date;
export { setMinutes, setHours, setMonth, setQuarter, setYear };
export { getSeconds, getMinutes, getHours, getMonth, getQuarter, getYear, getDay, getDate, getTime, };
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
export declare function getWeek(date: Date): number;
/**
 * Gets the day of the week code for a given day.
 *
 * @param day - The day.
 * @param locale - The locale.
 * @returns - The day of the week code.
 */
export declare function getDayOfWeekCode(day: Date, locale?: Locale): string;
/**
 * Gets the start of the day for a given date.
 *
 * @param date - The date.
 * @returns - The start of the day.
 */
export declare function getStartOfDay(date: Date): Date;
/**
 * Gets the start of the week for a given date.
 *
 * @param date - The date.
 * @param locale - The locale.
 * @param calendarStartDay - The day the calendar starts on.
 * @returns - The start of the week.
 */
export declare function getStartOfWeek(date: Date, locale?: Locale, calendarStartDay?: Day): Date;
/**
 * Gets the start of the month for a given date.
 *
 * @param date - The date.
 * @returns - The start of the month.
 */
export declare function getStartOfMonth(date: Date): Date;
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
export declare function getStartOfYear(date: Date): Date;
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
export declare function getStartOfQuarter(date: Date): Date;
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
export declare function getStartOfToday(): Date;
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
export declare function getEndOfDay(date: Date): Date;
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
export declare function getEndOfWeek(date: Date): Date;
/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
export declare function getEndOfMonth(date: Date): Date;
export { addSeconds, addMinutes, addDays, addWeeks, addMonths, addQuarters, addYears, };
export { addHours, subDays, subWeeks, subMonths, subQuarters, subYears };
export { isBefore, isAfter };
/**
 * Checks if two dates are in the same year.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same year, false otherwise.
 */
export declare function isSameYear(date1: Date | null, date2: Date | null): boolean;
/**
 * Checks if two dates are in the same month.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same month, false otherwise.
 */
export declare function isSameMonth(date1: Date | null, date2?: Date | null): boolean;
/**
 * Checks if two dates are in the same quarter.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same quarter, false otherwise.
 */
export declare function isSameQuarter(date1: Date | null, date2: Date | null): boolean;
/**
 * Checks if two dates are on the same day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are on the same day, false otherwise.
 */
export declare function isSameDay(date1?: Date | null, date2?: Date | null): boolean;
/**
 * Checks if two dates are equal.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are equal, false otherwise.
 */
export declare function isEqual(date1: Date | null | undefined, date2: Date | null | undefined): boolean;
/**
 * Checks if a day is within a date range.
 *
 * @param day - The day to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns - True if the day is within the range, false otherwise.
 */
export declare function isDayInRange(day: Date, startDate: Date, endDate: Date): boolean;
/**
 * Gets the difference in days between two dates.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - The difference in days.
 */
export declare function getDaysDiff(date1: Date, date2: Date): number;
/**
 * Registers a locale.
 *
 * @param localeName - The name of the locale.
 * @param localeData - The data of the locale.
 */
export declare function registerLocale(localeName: string, localeData: LocaleObj): void;
/**
 * Sets the default locale.
 *
 * @param localeName - The name of the locale.
 */
export declare function setDefaultLocale(localeName?: string): void;
/**
 * Gets the default locale.
 *
 * @returns - The default locale.
 */
export declare function getDefaultLocale(): string | undefined;
/**
 * Gets the locale object.
 *
 * @param localeSpec - The locale specification.
 * @returns - The locale object.
 */
export declare function getLocaleObject(localeSpec?: Locale): LocaleObj | undefined;
/**
 * Formats the weekday in a given locale.
 *
 * @param date - The date to format.
 * @param formatFunc - The formatting function.
 * @param locale - The locale to use for formatting.
 * @returns - The formatted weekday.
 */
export declare function getFormattedWeekdayInLocale(date: Date, formatFunc: (date: string) => string, locale?: Locale): string;
/**
 * Gets the minimum weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The minimum weekday.
 */
export declare function getWeekdayMinInLocale(date: Date, locale?: Locale): string;
/**
 * Gets the short weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short weekday.
 */
export declare function getWeekdayShortInLocale(date: Date, locale?: Locale): string;
/**
 * Gets the month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The month.
 */
export declare function getMonthInLocale(month: number, locale?: Locale): string;
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
export declare function getMonthShortInLocale(month: number, locale?: Locale): string;
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
export declare function getQuarterShortInLocale(quarter: number, locale?: Locale): string;
export interface DateFilterOptions {
    minDate?: Date;
    maxDate?: Date;
    excludeDates?: {
        date: Date;
        message?: string;
    }[] | Date[];
    excludeDateIntervals?: {
        start: Date;
        end: Date;
    }[];
    includeDates?: Date[];
    includeDateIntervals?: {
        start: Date;
        end: Date;
    }[];
    filterDate?: (date: Date) => boolean;
    yearItemNumber?: number;
}
/**
 * Checks if a day is disabled.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is disabled, false otherwise.
 */
export declare function isDayDisabled(day: Date, { minDate, maxDate, excludeDates, excludeDateIntervals, includeDates, includeDateIntervals, filterDate, }?: DateFilterOptions): boolean;
/**
 * Checks if a day is excluded.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is excluded, false otherwise.
 */
export declare function isDayExcluded(day: Date, { excludeDates, excludeDateIntervals, }?: Pick<DateFilterOptions, "excludeDates" | "excludeDateIntervals">): boolean;
export declare function isMonthDisabled(month: Date, { minDate, maxDate, excludeDates, includeDates, filterDate, }?: Pick<DateFilterOptions, "minDate" | "maxDate" | "excludeDates" | "includeDates" | "filterDate">): boolean;
export declare function isMonthInRange(startDate: Date, endDate: Date, m: number, day: Date): boolean;
/**
 * To check if a date's month and year are disabled/excluded
 * @param date Date to check
 * @returns {boolean} true if month and year are disabled/excluded, false otherwise
 */
export declare function isMonthYearDisabled(date: Date, { minDate, maxDate, excludeDates, includeDates, }?: Pick<DateFilterOptions, "minDate" | "maxDate" | "excludeDates" | "includeDates">): boolean;
export declare function isQuarterDisabled(quarter: Date, { minDate, maxDate, excludeDates, includeDates, filterDate, }?: Pick<DateFilterOptions, "minDate" | "maxDate" | "excludeDates" | "includeDates" | "filterDate">): boolean;
export declare function isYearInRange(year: number, start?: Date | null, end?: Date | null): boolean;
export declare function isYearDisabled(year: number, { minDate, maxDate, excludeDates, includeDates, filterDate, }?: Pick<DateFilterOptions, "minDate" | "maxDate" | "excludeDates" | "includeDates" | "filterDate">): boolean;
export declare function isQuarterInRange(startDate: Date, endDate: Date, q: number, day: Date): boolean;
export declare function isOutOfBounds(day: Date, { minDate, maxDate }?: Pick<DateFilterOptions, "minDate" | "maxDate">): boolean;
export declare function isTimeInList(time: Date, times: Date[]): boolean;
export interface TimeFilterOptions {
    minTime?: Date;
    maxTime?: Date;
    excludeTimes?: Date[];
    includeTimes?: Date[];
    filterTime?: (time: Date) => boolean;
}
export declare function isTimeDisabled(time: Date, { excludeTimes, includeTimes, filterTime, }?: Pick<TimeFilterOptions, "excludeTimes" | "includeTimes" | "filterTime">): boolean;
export declare function isTimeInDisabledRange(time: Date, { minTime, maxTime }: Pick<TimeFilterOptions, "minTime" | "maxTime">): boolean;
export declare function monthDisabledBefore(day: Date, { minDate, includeDates, }?: Pick<DateFilterOptions, "minDate" | "includeDates">): boolean;
export declare function monthDisabledAfter(day: Date, { maxDate, includeDates, }?: Pick<DateFilterOptions, "maxDate" | "includeDates">): boolean;
export declare function quarterDisabledBefore(date: Date, { minDate, includeDates, }?: Pick<DateFilterOptions, "minDate" | "includeDates">): boolean;
export declare function quarterDisabledAfter(date: Date, { maxDate, includeDates, }?: Pick<DateFilterOptions, "maxDate" | "includeDates">): boolean;
export declare function yearDisabledBefore(day: Date, { minDate, includeDates, }?: Pick<DateFilterOptions, "minDate" | "includeDates">): boolean;
export declare function yearsDisabledBefore(day: Date, { minDate, yearItemNumber, }?: Pick<DateFilterOptions, "minDate" | "yearItemNumber">): boolean;
export declare function yearDisabledAfter(day: Date, { maxDate, includeDates, }?: Pick<DateFilterOptions, "maxDate" | "includeDates">): boolean;
export declare function yearsDisabledAfter(day: Date, { maxDate, yearItemNumber, }?: Pick<DateFilterOptions, "maxDate" | "yearItemNumber">): boolean;
export declare function getEffectiveMinDate({ minDate, includeDates, }: Pick<DateFilterOptions, "minDate" | "includeDates">): Date | undefined;
export declare function getEffectiveMaxDate({ maxDate, includeDates, }: Pick<DateFilterOptions, "maxDate" | "includeDates">): Date | undefined;
export interface HighlightDate {
    [className: string]: Date[];
}
/**
 * Get a map of highlighted dates with their corresponding classes.
 * @param highlightDates The dates to highlight.
 * @param defaultClassName The default class to use for highlighting.
 * @returns A map with dates as keys and arrays of class names as values.
 */
export declare function getHighLightDaysMap(highlightDates?: (Date | HighlightDate)[], defaultClassName?: string): Map<string, string[]>;
/**
 * Compare the two arrays
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @returns true, if the passed arrays are equal, false otherwise.
 */
export declare function arraysAreEqual<T>(array1: T[], array2: T[]): boolean;
export interface HolidayItem {
    date: Date;
    holidayName: string;
}
interface ClassNamesObj {
    className: string;
    holidayNames: string[];
}
export type HolidaysMap = Map<string, ClassNamesObj>;
/**
 * Assign the custom class to each date
 * @param holidayDates array of object containing date and name of the holiday
 * @param defaultClassName className to be added.
 * @returns Map containing date as key and array of className and holiday name as value
 */
export declare function getHolidaysMap(holidayDates?: HolidayItem[], defaultClassName?: string): HolidaysMap;
/**
 * Determines the times to inject after a given start of day, current time, and multiplier.
 * @param startOfDay The start of the day.
 * @param currentTime The current time.
 * @param currentMultiplier The current multiplier.
 * @param intervals The intervals.
 * @param injectedTimes The times to potentially inject.
 * @returns An array of times to inject.
 */
export declare function timesToInjectAfter(startOfDay: Date, currentTime: Date, currentMultiplier: number, intervals: number, injectedTimes: Date[]): Date[];
/**
 * Adds a leading zero to a number if it's less than 10.
 * @param i The number to add a leading zero to.
 * @returns The number as a string, with a leading zero if it was less than 10.
 */
export declare function addZero(i: number): string;
/**
 * Gets the start and end years for a period.
 * @param date The date to get the period for.
 * @param yearItemNumber The number of years in the period. Defaults to DEFAULT_YEAR_ITEM_NUMBER.
 * @returns An object with the start and end years for the period.
 */
export declare function getYearsPeriod(date: Date, yearItemNumber?: number): {
    startPeriod: number;
    endPeriod: number;
};
/**
 * Gets the number of hours in a day.
 * @param d The date to get the number of hours for.
 * @returns The number of hours in the day.
 */
export declare function getHoursInDay(d: Date): number;
/**
 * Returns the start of the minute for the given date
 *
 * NOTE: this function is a DST and timezone-safe analog of `date-fns/startOfMinute`
 * do not make changes unless you know what you're doing
 *
 * See comments on https://github.com/Hacker0x01/react-datepicker/pull/4244
 * for more details
 *
 * @param d date
 * @returns start of the minute
 */
export declare function startOfMinute(d: Date): Date;
/**
 * Returns whether the given dates are in the same minute
 *
 * This function is a DST and timezone-safe analog of `date-fns/isSameMinute`
 *
 * @param d1
 * @param d2
 * @returns
 */
export declare function isSameMinute(d1: Date, d2: Date): boolean;
/**
 * Returns a new datetime object representing the input date with midnight time
 * @param date The date to get the midnight time for
 * @returns A new datetime object representing the input date with midnight time
 */
export declare function getMidnightDate(date: Date): Date;
/**
 * Is the first date before the second one?
 * @param date The date that should be before the other one to return true
 * @param dateToCompare The date to compare with
 * @returns The first date is before the second date
 *
 * Note:
 *  This function considers the mid-night of the given dates for comparison.
 *  It evaluates whether date is before dateToCompare based on their mid-night timestamps.
 */
export declare function isDateBefore(date: Date, dateToCompare: Date): boolean;
/**
 * Checks if the space key was pressed down.
 *
 * @param event - The keyboard event.
 * @returns - Returns true if the space key was pressed down, false otherwise.
 */
export declare function isSpaceKeyDown(event: React.KeyboardEvent<HTMLDivElement>): boolean;
