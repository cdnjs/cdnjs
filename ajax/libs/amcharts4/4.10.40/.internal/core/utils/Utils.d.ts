/**
 * A collection of universal utility functions.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { IPoint } from "../defs/IPoint";
import { IRectangle } from "../defs/IRectangle";
import { Percent } from "./Percent";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MISC FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Marks a value as being used (e.g. because the value has side effects).
 */
export declare function used<A>(value: A): void;
/**
 * Copies all properties of one object to the other, omitting undefined.
 *
 * @param fromObject  Source object
 * @param toObject    Target object
 * @return Updated target object
 * @todo Maybe consolidate with utils.copy?
 */
export declare function copyProperties(source: Object, target: Object): Object;
/**
 * Removes target from url
 */
export declare function stripHash(url: string): string;
export declare function getBaseURI(): string;
/**
 * Copies all properties of one object to the other, omitting undefined, but only if property in target object doesn't have a value set.
 *
 * @param fromObject  Source object
 * @param toObject    Target object
 * @return Updated target object
 * @todo Maybe consolidate with utils.copy?
 */
export declare function softCopyProperties(source: Object, target: Object): Object;
/**
 * Copies all properties of one object to the other.
 *
 * @param source     Source object
 * @param recipient  Target object
 * @return Updated target object
 */
export declare function copy(source: Object, target: Object): Object;
/**
 * Checks if value is not empty (undefined or zero-length string).
 *
 * @param value  Value to check
 * @return `true` if value is not "empty"
 */
export declare function isNotEmpty(value: $type.Optional<string>): value is string;
/**
 * [relativeToValue description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param percent  [description]
 * @param full     [description]
 * @return [description]
 */
export declare function relativeToValue(percent: $type.Optional<number | Percent>, full: number): number;
/**
 * [relativeRadiusToValue description]
 *
 * Differs from relativeToValue so that if a value is negative, it subtracts
 * it from full value.
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param percent             [description]
 * @param full                [description]
 * @param subtractIfNegative  [description]
 * @return [description]
 */
export declare function relativeRadiusToValue(percent: $type.Optional<number | Percent>, full: number, subtractIfNegative?: boolean): $type.Optional<number>;
/**
 * [valueToRelative description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param value  [description]
 * @param full   [description]
 * @return [description]
 */
export declare function valueToRelative(value: number | Percent, full: number): number;
/**
 * Returns pixel ratio of the current screen (used on retina displays).
 *
 * @return Pixel ratio
 */
export declare function getPixelRatio(): number;
/**
 * ============================================================================
 * STRING FORMATTING FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Converts camelCased text to dashed version:
 * ("thisIsString" > "this-is-string")
 *
 * @param str  Input
 * @return Output
 */
export declare function camelToDashed(str: string): string;
/**
 * Converts tring to uppercase.
 *
 * @param str  String to convert
 * @return uppercased string
 * @todo Maybe make it better
 */
export declare function capitalize(str: string): string;
/**
 * Converts any value into its string representation.
 *
 * @param value  Value
 * @return String represantation of the value
 */
export declare function stringify(value: any): string;
/**
 * Escapes string so it can safely be used in a Regex.
 *
 * @param value  Unsescaped string
 * @return Escaped string
 */
export declare function escapeForRgex(value: string): string;
/**
 * Splits the text into multiple lines, respecting maximum character count.
 * Prioretizes splitting on spaces and punctuation. Falls back on splitting
 * mid-word if there's no other option.
 *
 * @param text      Text
 * @param maxChars  Maximum number of characters per line
 * @return An array of split text
 */
export declare function splitTextByCharCount(text: string, maxChars: number, fullWords?: boolean, rtl?: boolean, fullWordFallback?: boolean): string[];
/**
 * Truncates the text to certain character count.
 *
 * Will add ellipsis if the string is truncated. Optionally, can truncate on
 * full words only.
 *
 * For RTL support, pass in the fifth parameter as `true`.
 *
 * @param text       Input text
 * @param maxChars   Maximum character count of output
 * @param ellipsis   Ellipsis string, i.e. "..."
 * @param fullWords  If `true`, will not break mid-word, unless there's a single word and it does not with into `maxChars`
 * @param rtl        Is this an RTL text?
 * @return Truncated text
 */
export declare function truncateWithEllipsis(text: string, maxChars: number, ellipsis: string, fullWords?: boolean, rtl?: boolean): string;
/**
 * Removes whitespace from beginning and end of the string.
 *
 * @param str  Input
 * @return Output
 */
export declare function trim(str: string): string;
/**
 * Removes whitespace from end of the string.
 *
 * @param str  Input
 * @return Output
 */
export declare function rtrim(str: string): string;
/**
 * Removes whitespace from beginning of the string.
 *
 * @param str  Input
 * @return Output
 */
export declare function ltrim(str: string): string;
/**
 * Reverses string.
 *
 * @param str  Input
 * @return Output
 */
export declare function reverseString(str: string): string;
/**
 * Removes quotes from the string.
 *
 * @param str  Input
 * @return Output
 */
export declare function unquote(str: string): string;
/**
 * Pads a string with additional characters to certain length.
 *
 * @param value  A numeric value
 * @param len    Result string length in characters
 * @param char   A character to use for padding
 * @return Padded value as string
 */
export declare function padString(value: any, len?: number, char?: string): string;
/**
 * Tries to determine format type.
 *
 * @ignore Exclude from docs
 * @param format  Format string
 * @return Format type ("string" | "number" | "date" | "duration")
 */
export declare function getFormat(format: string): string;
/**
 * Cleans up format:
 * * Strips out formatter hints
 *
 * @ignore Exclude from docs
 * @param format  Format
 * @return Cleaned format
 */
export declare function cleanFormat(format: string): string;
/**
 * Strips all tags from the string.
 *
 * @param text  Source string
 * @return String without tags
 */
export declare function stripTags(text: string): string;
/**
 * Removes new lines and tags from a string.
 *
 * @param text  String to conver
 * @return Converted string
 */
export declare function plainText(text: string): string;
/**
 * ============================================================================
 * TYPE CONVERSION FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Converts numeric value into string. Deals with large or small numbers that
 * would otherwise use exponents.
 *
 * @param value  Numeric value
 * @return Numeric value as string
 */
export declare function numberToString(value: number): string;
/**
 * Converts anything to Date object.
 *
 * @param value  A value of any type
 * @return Date object representing a value
 */
export declare function anyToDate(value: Date | number | string): Date;
/**
 * Tries converting any value to a number.
 *
 * @param value  Source value
 * @return Number
 */
export declare function anyToNumber(value: Date | number | string): $type.Optional<number>;
/**
 * ============================================================================
 * DATE-RELATED FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Returns a year day.
 *
 * @param date  Date
 * @param utc   Assume UTC dates?
 * @return Year day
 * @todo Account for UTC
 */
export declare function getYearDay(date: Date, utc?: boolean): number;
/**
 * Returns week number for a given date.
 *
 * @param date  Date
 * @param utc   Assume UTC dates?
 * @return Week number
 * @todo Account for UTC
 */
export declare function getWeek(date: Date, _utc?: boolean): number;
/**
 * Returns a week number in the month.
 *
 * @param date  Source Date
 * @param utc   Assume UTC dates?
 * @return Week number in month
 */
export declare function getMonthWeek(date: Date, utc?: boolean): number;
/**
 * Returns a year day out of the given week number.
 *
 * @param week     Week
 * @param year     Year
 * @param weekday  Weekday
 * @param utc      Assume UTC dates
 * @return Day in a year
 */
export declare function getDayFromWeek(week: number, year: number, weekday?: number, utc?: boolean): number;
/**
 * Returns 12-hour representation out of the 24-hour hours.
 *
 * @param hours  24-hour number
 * @return 12-hour number
 */
export declare function get12Hours(hours: number, base?: number): number;
/**
 * Returns a string name of the tome zone.
 *
 * @param date     Date object
 * @param long     Should return long ("Pacific Standard Time") or short abbreviation ("PST")
 * @param savings  Include information if it's in daylight savings mode
 * @param utc      Assume UTC dates
 * @return Time zone name
 */
export declare function getTimeZone(date: Date, long?: boolean, savings?: boolean, utc?: boolean): string;
/**
 * Returns a "week year" of the given date.
 *
 * @param date  Date
 * @param utc   Assume UTC dates?
 * @return Year of week
 */
export declare function getWeekYear(date: Date, _utc?: boolean): number;
/**
 * ============================================================================
 * NUMBER-RELATED FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Returns a random number between `from` and `to`.
 *
 * @param from  From number
 * @param to    To number
 * @return Random number
 */
export declare function random(from: number, to: number): number;
/**
 * Fits the number into specific `min` and `max` bounds.
 *
 * @param value  Input value
 * @param min    Minimum value
 * @param max    Maximum value
 * @return Possibly adjusted value
 */
export declare function fitNumber(value: number, min: number, max: number): number;
/**
 * Fits the number into specific `min` and `max` bounds.
 *
 * If the value is does not fit withing specified range, it "wraps" around the
 * values.
 *
 * For example, if we have input value 10 with min set at 1 and max set at 8,
 * the value will not fit. The remainder that does not fit (2) will be added
 * to `min`, resulting in 3.
 *
 * The output of regular `fitNumber()` would return 8 instead.
 *
 * @param value  Input value
 * @param min    Minimum value
 * @param max    Maximum value
 * @return Possibly adjusted value
 */
export declare function fitNumberRelative(value: number, min: number, max: number): number;
/**
 * ============================================================================
 * SPRITE-RELATED FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Converts SVG element coordinates to coordinates within specific [[Sprite]].
 *
 * @param point   SVG coordinates
 * @param sprite  Sprite
 * @return Sprite coordinates
 */
export declare function svgPointToSprite(point: IPoint, sprite: Sprite): IPoint;
/**
 * Converts coordinates within [[Sprite]] to coordinates relative to the whole
 * SVG element.
 *
 * @param point   Sprite coordinates
 * @param sprite  Sprite
 * @return SVG coordinates
 */
export declare function spritePointToSvg(point: IPoint, sprite: Sprite): IPoint;
/**
 * Converts coordinates of one sprite to another.
 *
 * @param point   Sprite coordinates
 * @param sprite  Sprite
 * @param toSprite  Sprite
 * @return converted coordinates
 */
export declare function spritePointToSprite(point: IPoint, sprite: Sprite, toSprite: Sprite): IPoint;
/**
 * Converts a rectangle expressed in SVG element coordinates to coordinates
 * within specific [[Sprite]].
 *
 * @param rect    SVG rectangle
 * @param sprite  Sprite
 * @return Sprite rectangle
 */
export declare function svgRectToSprite(rect: IRectangle, sprite: Sprite): IRectangle;
/**
 * Converts a rectangle expressed in [[Sprite]] coordinates to SVG coordinates.
 *
 * @param rect    Sprite rectangle
 * @param sprite  Sprite
 * @return SVG rectangle
 */
export declare function spriteRectToSvg(rect: IRectangle, sprite: Sprite): IRectangle;
/**
 * Converts global document-wide coordinates to coordinates within SVG element.
 *
 * @param point         Global coordinates
 * @param svgContainer  SVG element
 * @return SVG coordinates
 */
export declare function documentPointToSvg(point: IPoint, svgContainer: HTMLElement, cssScale?: number): IPoint;
/**
 * Converts SVG coordinates to global document-wide coordinates.
 *
 * @param point         SVG coordinates
 * @param svgContainer  SVG element
 * @return Global coordinates
 */
export declare function svgPointToDocument(point: IPoint, svgContainer: HTMLElement): IPoint;
/**
 * Converts document-wide global coordinates to coordinates within specific
 * [[Sprite]].
 *
 * @param point   Global coordinates
 * @param sprite  Sprite
 * @return Sprite coordinates
 */
export declare function documentPointToSprite(point: IPoint, sprite: Sprite): IPoint;
/**
 * Converts coordinates within [[Sprite]] to global document coordinates.
 *
 * @param point   Sprite coordinates
 * @param sprite  Sprite
 * @return Global coordinates
 */
export declare function spritePointToDocument(point: IPoint, sprite: Sprite): IPoint;
/**
 * ============================================================================
 * DEPRECATED FUNCTIONS
 * @todo Review and remove
 * ============================================================================
 * @hidden
 */
/**
 * Returns element's width.
 *
 * @ignore Exclude from docs
 * @param element  Element
 * @return Width (px)
 * @deprecated Not used anywhere
 */
export declare function width(element: HTMLElement): number;
/**
 * Returns element's height.
 *
 * @ignore Exclude from docs
 * @param element  Element
 * @return Height (px)
 * @deprecated Not used anywhere
 */
export declare function height(element: HTMLElement): number;
/**
 * Returns number of decimals
 *
 * @ignore Exclude from docs
 * @param number  Input number
 * @return Number of decimals
 */
export declare function decimalPlaces(number: number): number;
/**
 * A parsed URL
 *
 * @ignore Exclude from docs
 */
export interface Url {
    protocol: string;
    separator: string;
    authority: string;
    domain: string;
    port: string;
    path: string;
    query: string;
    hash: string;
}
/**
 * Parses a URL
 *
 * @ignore Exclude from docs
 */
export declare function parseUrl(url: string): Url;
/**
 * Serializes a Url into a string
 *
 * @ignore Exclude from docs
 */
export declare function serializeUrl(url: Url): string;
/**
 * Joins together two URLs, resolving relative URLs correctly
 *
 * @ignore Exclude from docs
 */
export declare function joinUrl(left: string, right: string): string;
/**
 * Detects MSIE.
 *
 * @return Is IE?
 */
export declare function isIE(): boolean;
