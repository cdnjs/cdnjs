/**
 * Number formatting-related functionality.
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
import * as $type from "../utils/Type";
/**
 * @ignore
 */
export interface INumberSuffix {
    number: number;
    suffix: string;
}
/**
 * NumberFormatter class. Formats numbers according to specified formats.
 *
 * @todo Apply translations to suffixes/prefixes
 */
export declare class NumberFormatter extends BaseObject {
    /**
     * A base value for negative numbers. Will treat all numbers below this value
     * as negative numbers.
     */
    protected _negativeBase: number;
    /**
     * Holds number format.
     *
     * @default #,###.#####
     */
    protected _numberFormat: string | Intl.NumberFormatOptions;
    /**
     * Locales to use when formatting using Intl.NumberFormatter
     */
    protected _intlLocales: string;
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
     * Holds big number prefixes to apply to numbers if `a` modifier is used in
     * format.
     */
    protected _bigNumberPrefixes: INumberSuffix[];
    /**
     * Holds small number prefixes to apply to numbers if `a` modifier is used in
     * format.
     */
    protected _smallNumberPrefixes: INumberSuffix[];
    /**
     * Any number smaller than this will be considered "small" number, which will
     * trigger special formatting if "a" format modifier is used.
     */
    protected _smallNumberThreshold: number;
    /**
     * Holds prefixes to apply to data size numbers if `b` modifier is used in
     * format.
     */
    protected _bytePrefixes: INumberSuffix[];
    protected _forceLTR: boolean;
    /**
     * Holds reference to parent [[Sprite]] object.
     */
    sprite: $type.Optional<Sprite>;
    /**
     * Holds reference to [[Language]] object.
     */
    private _language;
    /**
     * Constructor
     */
    constructor();
    dispose(): void;
    /**
     * A reference to [[Language]] instance.
     *
     * Formatter will use language to translate various items, like number
     * suffixes, etc.
     *
     * @param value  Language
     */
    /**
    * @return Language
    */
    language: Language;
    /**
     * Formats the number according to specific format.
     *
     * @param value   Value to format
     * @param format  Format to apply
     * @return Formatted number
     */
    format(value: number | string, format?: string | Intl.NumberFormatOptions, precision?: number): string;
    /**
     * Parses supplied format into structured object which can be used to format
     * the number.
     *
     * @param format Format string, i.e. "#,###.00"
     * @param language Language
     */
    protected parseFormat(format: string, language: Language): any;
    /**
     * Applies parsed format to a numeric value.
     *
     * @param value    Value
     * @param details  Parsed format as returned by parseFormat()
     * @return Formatted number
     */
    protected applyFormat(value: number, details: any): string;
    /**
     * Chooses appropriate prefix and suffix based on the passed in rules.
     *
     * @param  value     Value
     * @param  prefixes  Prefix array
     * @param  force     Force application of a first prefix (@sice 4.5.4)
     * @return Result
     */
    protected applyPrefix(value: number, prefixes: any[], force?: boolean): any[];
    /**
     * Invalidates the parent [[Sprite]] object.
     */
    protected invalidateSprite(): void;
    /**
     * Number format.
     *
     * @default "#,###.#####"
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/} Tutorial on number formatting
     * @param format  A format to use for number formatting
     */
    /**
    * @return A format to use for number formatting
    */
    numberFormat: string | Intl.NumberFormatOptions;
    /**
     * Locales if you are using date formats in `Intl.NumberFormatOptions` syntax.
     *
     * @see (@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) about using Intl for number formatting
     * @param value Locales
     */
    /**
    * @return Date format
    */
    intlLocales: string;
    /**
     * Negative base for negative numbers.
     *
     * @default 0
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/} Tutorial on number formatting
     * @param format  A format to use for number formatting
     */
    /**
    * @return A format to use for number formatting
    */
    negativeBase: number;
    /**
     * Prefixes for big numbers.
     *
     * It's an array of objects of number/prefix pairs.
     *
     * ```JSON
     * [
     *   { "number": 1e+3, "suffix": "K" },
     *   { "number": 1e+6, "suffix": "M" },
     *   { "number": 1e+9, "suffix": "G" },
     *   { "number": 1e+12, "suffix": "T" },
     *   { "number": 1e+15, "suffix": "P" },
     *   { "number": 1e+18, "suffix": "E" },
     *   { "number": 1e+21, "suffix": "Z" },
     *   { "number": 1e+24, "suffix": "Y" }
     * ]
     * ```
     *
     * If the number is bigger than the `number` ir will be converted to the
     * appropriate bigger number with prefix.
     *
     * E.g. as per above `1500` will be converted to `1.5K`.
     *
     * Please note that for this transformation to be enabled, you need to
     * enable it specific modifier in your format setting.
     *
     * The modifier for big/small number modification is "a":
     *
     * ```Text
     * {myfield.formatNumber("#,###.00a")}
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/} Tutorial on number formatting
     * @param prefixes  Prefixes for big numbers
     */
    /**
    * @return Prefixes for big numbers
    */
    bigNumberPrefixes: INumberSuffix[];
    /**
     * Prefixes for big numbers.
     *
     * It's an array of objects of number/prefix pairs.
     *
     * ```JSON
     * [
     *   { "number": 1e-24, "suffix": "y" },
     *   { "number": 1e-21, "suffix": "z" },
     *   { "number": 1e-18, "suffix": "a" },
     *   { "number": 1e-15, "suffix": "f" },
     *   { "number": 1e-12, "suffix": "p" },
     *   { "number": 1e-9, "suffix": "n" },
     *   { "number": 1e-6, "suffix": "μ" },
     *   { "number": 1e-3, "suffix": "m" }
     * ]
     * ```
     *
     * If the number is smaller than the `number` ir will be converted to the
     * appropriate smaller number with prefix.
     *
     * E.g. as per above `0.0015` will be converted to `1.5m`.
     *
     * Please note that for this transformation to be enabled, you need to
     * enable it specific modifier in your format setting.
     *
     * The modifier for big/small number modification is "a":
     *
     * ```Text
     * {myfield.formatNumber("#,###.00a")}
     * ```
     *
     * IMPORTANT: The order of the suffixes is important. The list must start
     * from the smallest number and work towards bigger ones.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/} Tutorial on number formatting
     * @param prefixes  Prefixes for small numbers
     */
    /**
    * @return Prefixes for small numbers
    */
    smallNumberPrefixes: INumberSuffix[];
    /**
     * Any number smaller than this will be considered "small" number, which will
     * trigger special formatting if "a" format modifier is used.
     *
     * @since 4.6.8
     * @param  value  Small number threshold
     */
    /**
    * @return Small number threshold
    */
    smallNumberThreshold: number;
    /**
     * Basically the same as `bigNumberPrefixes`, except base for calculation
     * is not thousand but byte (1024).
     *
     * The modifier is "b".
     *
     *  ```Text
     * {myfield.formatNumber("#,###.00b")}
     * ```
     *
     * The above `2048` will change to `2K`.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/} Tutorial on number formatting
     * @param prefixes  Prefixes for byte-size formatting
     */
    /**
    * @return Prefixes for byte-size formatting
    */
    bytePrefixes: INumberSuffix[];
    /**
     * Ooutput format: "svg" or "html".
     *
     * @ignore Exclude from docs
     * @param value  Output format
     */
    /**
    * @ignore Exclude from docs
    * @return Output format
    */
    outputFormat: string;
    forceLTR: boolean;
    /**
     * Replaces brackets with temporary placeholders.
     *
     * @ignore Exclude from docs
     * @param text  Input text
     * @return Escaped text
     */
    escape(text: string): string;
    /**
     * Replaces placeholders back to brackets.
     *
     * @ignore Exclude from docs
     * @param text  Escaped text
     * @return Unescaped text
     */
    unescape(text: string): string;
}
