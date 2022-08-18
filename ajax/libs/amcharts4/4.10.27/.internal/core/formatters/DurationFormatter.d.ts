/**
 * Duration formatting functionality.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { Language } from "../utils/Language";
import { BaseObject } from "../Base";
import { TimeUnit } from "../defs/TimeUnit";
import { Optional } from "../utils/Type";
import * as $type from "../utils/Type";
/**
 * DurationFormatter class. Formats numbers as durations.
 *
 * `1000` as `16:40`
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} Tutorial on duration formatting
 */
export declare class DurationFormatter extends BaseObject {
    /**
     * If set will force this format to be used, regardless of the scale.
     */
    protected _durationFormat: string;
    /**
     * Holds duration formats for various possible scenarios.
     */
    protected _durationFormats: Partial<Record<TimeUnit, Partial<Record<TimeUnit, string>>>>;
    /**
     * A base value for negative numbers. Will treat all numbers below this value
     * as negative numbers.
     */
    protected _negativeBase: number;
    /**
     * A base unit to consider values are in.
     *
     * @default "s"
     */
    protected _baseUnit: TimeUnit;
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
     * How many milliseconds each unit represents.
     */
    protected _unitValues: Record<TimeUnit, number>;
    /**
     * Collection of aliases for units.
     */
    protected _unitAliases: {
        [index: string]: string;
    };
    /**
     * Holds reference to parent [[Sprite]] object.
     */
    sprite: $type.Optional<Sprite>;
    /**
     * Holds reference to [[Language]] object.
     */
    language: $type.Optional<Language>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Formats the number according as duration.
     *
     * For example `1000` (base unit seconds) would be converted to `16:40` as in
     * 16 minutes and 40 seconds.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} Tutorial on duration formatting
     * @param value   Value to format
     * @param format  Format to apply
     * @param base    Override base unit
     * @return Formatted number
     */
    format(value: number | string, format?: string, base?: TimeUnit): string;
    /**
     * Parses supplied format into structured object which can be used to format
     * the number.
     *
     * @param format  Format string, i.e. "#,###.00"
     * @param base    Override base unit
     * @return Parsed information
     */
    protected parseFormat(format: string, base?: TimeUnit): any;
    /**
     * Applies parsed format to a numeric value.
     *
     * @param value    Value
     * @param details  Parsed format as returned by {parseFormat}
     * @return Formatted duration
     */
    protected applyFormat(value: number, details: any): string;
    /**
     * Converts numeric value to timestamp in milliseconds.
     *
     * @param value     A source value
     * @param baseUnit  Base unit the source value is in: "q", "s", "i", "h", "d", "w", "m", "y"
     * @return Value representation as a timestamp in milliseconds
     */
    toTimeStamp(value: number, baseUnit: TimeUnit): number;
    protected toTimeUnit(code: string): Optional<TimeUnit>;
    /**
     * Invalidates the parent [[Sprite]] object.
     */
    protected invalidateSprite(): void;
    /**
     * Base unit the values are in.
     *
     * A base unit will be used to recalculate the numeric value to millisecond
     * timestamps.
     *
     * Available options:
     *
     * * "millisecond"
     * * "second"
     * * "minute"
     * * "hour"
     * * "day"
     * * "week"
     * * "month"
     * * "year"
     *
     * @default "s"
     * @param baseUnit  A base unit
     */
    /**
    * @return Base unit
    */
    baseUnit: TimeUnit;
    /**
     * Setter for output format: "svg" or "html.
     *
     * @ignore Exclude from docs
     * @param value  Output format
     */
    /**
    * Getter for output format.
    *
    * @ignore Exclude from docs
    * @return Output format
    */
    outputFormat: string;
    /**
     * Returns appropriate default format for the value.
     *
     * If `maxValue` is sepcified, it will use that value to determine the time
     * unit for the format.
     *
     * For example if your `baseUnit` is `"second"` and you pass in `10`, you
     * will get `"10"`.
     *
     * However, you might want it to be formatted in the context of bigger scale,
     * say 10 minutes (600 seconds). If you pass in `600` as `maxValue`, all
     * values, including small ones will use format with minutes, e.g.:
     * `00:10`, `00:50`, `12: 30`, etc.
     *
     * @param value     Value to format
     * @param maxValue  Maximum value to be used to determine format
     * @param baseUnit  Base unit of the value
     * @return Format
     */
    getFormat(value: number, maxValue?: number, baseUnit?: TimeUnit): string;
    /**
     * Returns value's closest denominator time unit, e.g 100 seconds is
     * `"minute"`, while 59 seconds would still be `second`.
     *
     * @param value     Source duration value
     * @param baseUnit  Base unit
     * @return Denominator
     */
    getValueUnit(value: number, baseUnit?: TimeUnit): TimeUnit;
    /**
     * Converts value to milliseconds according to `baseUnit`.
     *
     * @param value     Source duration value
     * @param baseUnit  Base unit
     * @return Value in milliseconds
     */
    getMilliseconds(value: number, baseUnit?: TimeUnit): number;
    /**
     * If set, this format will be used instead of the one determined dynamically
     * based on the basedUnit and range of values.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} Available fomatting codes
     * @param value  Format
     */
    /**
    * @return Format
    */
    durationFormat: string;
    /**
     * Duration formats for various combination of base units.
     *
     * @param value  Formats
     */
    /**
    * @return Formats
    */
    durationFormats: Partial<Record<TimeUnit, Partial<Record<TimeUnit, string>>>>;
}
