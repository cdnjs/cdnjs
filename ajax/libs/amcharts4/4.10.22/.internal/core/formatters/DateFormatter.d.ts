/**
 * Handles date and time formatting
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { Language, ILocaleProperties } from "../utils/Language";
import { BaseObject } from "../Base";
import * as $type from "../utils/Type";
/**
 * Interface describing parsed date format definition.
 */
export interface DateFormatInfo {
    "template": string;
    "parts": any[];
}
/**
 * Month names.
 */
export declare type MonthNames = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
/**
 * Short month names.
 *
 * @param {string}
 */
export declare type ShortMonthNames = "Jan" | "Feb" | "Mar" | "Apr" | "May(short)" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
/**
 * Weekedays.
 */
export declare type Weekdays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
/**
 * Short weekday names.
 */
export declare type ShortWeekdays = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
/**
 * Handles date and time formatting.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/} Tutorial on date/time formatting
 * @todo Better type casting of passed in date?
 * @todo Quarter support?
 * @todo When parsing named months make the search case-insensitive
 * @todo Escape a.m./p.m. properly when used in RegEx
 */
export declare class DateFormatter extends BaseObject {
    /**
     * Date format.
     */
    protected _dateFormat: string | Intl.DateTimeFormatOptions;
    /**
     * Locales to use when formatting using Intl.DateFormatter
     */
    protected _intlLocales: string;
    /**
     * Input date format.
     */
    protected _inputDateFormat: string;
    /**
     * Assume UTC time zone.
     */
    protected _utc: boolean;
    /**
     * Timezone offset.
     */
    protected _timezoneOffset: $type.Optional<number>;
    /**
     * Timezone.
     */
    protected _timezone: $type.Optional<string>;
    /**
     * If `timezone` is set, this will hold minute fraction of the timezone.
     *
     * @readonly
     * @ignore
     */
    timezoneMinutes: number;
    /**
     * First day of week.
     *
     * 0 - Sunday
     * 1 - Monday
     *
     * Etc.
     */
    protected _firstDayOfWeek: number;
    /**
     * A list of month names.
     */
    months: Array<MonthNames>;
    /**
     * A list of short month names.
     */
    monthsShort: Array<ShortMonthNames>;
    /**
     * A list of weekday names.
     */
    weekdays: Array<Weekdays>;
    /**
     * A list of short weekday names.
     */
    weekdaysShort: Array<ShortWeekdays>;
    /**
     * Output format to produce. If the format calls for applying color to the
     * formatted value, this setting will determine what markup to use: SVG or
     * HTML.
     *
     * Available options: svg, html.
     *
     * @default "svg"
     */
    protected _outputFormat: string;
    /**
     * Holds reference to parent [[Sprite]] object.
     */
    sprite: $type.Optional<Sprite>;
    /**
     * Holds reference to [[Language]] object.
     */
    _language: $type.Optional<Language>;
    /**
     * Should the first letter of the formatted date be capitalized?
     *
     * @default true
     */
    capitalize: boolean;
    /**
     * Constructor
     */
    constructor();
    /**
     * A reference to [[Language]] object.
     *
     * @param  value  Language
     */
    /**
    * @return Language
    */
    language: $type.Optional<Language>;
    /**
     * Formats the date value according to specified format.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/} Tutorial on date/time formatting
     * @param source  Date value
     * @param format  Format
     * @return Formatted date string
     */
    format(source: any, format?: string | Intl.DateTimeFormatOptions, applyTimezone?: boolean): string;
    /**
     * Parses format into structured infromation.
     *
     * @param format Format template
     */
    protected parseFormat(format: string): DateFormatInfo;
    /**
     * Applies format to Date.
     *
     * @param date      Date object
     * @param info      Parsed format information
     * @param language  Language
     * @return Formatted date string
     */
    protected applyFormat(date: Date, info: DateFormatInfo, language: Language): string;
    /**
     * Parses any input value into Date object.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/#Parsing_Dates} Tutorial on date/time parsing
     * @param source  Source value
     * @param format  Source format
     * @return Date object
     */
    parse(source: any, format?: string): Date;
    protected resolveTimezoneOffset(date: Date, zone: string): number;
    /**
     * Resolves month name (i.e. "December") into a month number (11).
     *
     * @param value  Month name
     * @return Month number
     */
    protected resolveMonth(value: MonthNames): number;
    /**
     * Resolves short month name (i.e. "Dec") into a month number.
     *
     * @param value  Short month name
     * @return Month number
     */
    protected resolveShortMonth(value: ShortMonthNames): number;
    /**
     * Checks if passed in string represents AM/PM notation in many of its
     * versions.
     *
     * @param value  Source string
     * @return Is it AM/PM?
     */
    protected isAm(value: string): boolean;
    /**
     * Invalidates related [[Sprite]] causing it to redraw.
     */
    protected invalidateSprite(): void;
    /**
     * Translates list of strings.
     *
     * @param list  Source strings
     * @return Translated strings
     */
    protected getStringList(list: Array<keyof ILocaleProperties>): Array<string>;
    /**
     * Date format to use.
     *
     * If format is not supplied in-line in the string, this setting will be
     * used.
     *
     * @default "yyyy-MM-dd"
     * @param value Date format
     */
    /**
    * @return Date format
    */
    dateFormat: string | Intl.DateTimeFormatOptions;
    /**
     * Date format to use when parsing dates.
     *
     * @default "yyyy-MM-dd"
     * @param value Date format
     */
    /**
    * @return Date format
    */
    inputDateFormat: string;
    /**
     * Locales if you are using date formats in `Intl.DateTimeFormatOptions` syntax.
     *
     * @param value Locales
     */
    /**
    * @return Date format
    */
    intlLocales: string;
    /**
     * Should formatter use UTC functions?
     *
     * If UTC is used, all date/time values will be independent on client's
     * time zone.
     *
     * @param value Use UTC?
     */
    /**
    * @return Use UTC?
    */
    utc: boolean;
    /**
     * If set, will apply specific offset in minutes before formatting the date
     * text.
     *
     * The value is a number of minutes from target time zone to UTC.
     *
     * E.g. `300` will recalculate Dates in "GMT-5" time zone.
     *
     * @param  value  Offset (minutes)
     */
    /**
    * @return Offset (minutes)
    */
    timezoneOffset: $type.Optional<number>;
    /**
     * If set, will format date/time in specific time zone.
     *
     * The value should be named time zone, e.g.:
     * `"America/Vancouver"`, `"Australia/Sydney"`, `"UTC"`.
     *
     * @since 4.10.1
     * @param  value  Timezone
     */
    /**
    * @return Timezone
    */
    timezone: $type.Optional<string>;
    /**
     * First day of the week:
     *
     * * 0 - Sunday
     * * 1 - Monday
     * * 2 - Tuesday
     *
     * Etc.
     *
     * @param value First day of week
     */
    /**
    * @return First day of week
    */
    firstDayOfWeek: number;
    /**
     * Output format for the formatted date.
     *
     * @ignore Exclude from docs
     * @param value  Format
     */
    /**
    * @ignore Exclude from docs
    * @return Format
    */
    outputFormat: string;
}
