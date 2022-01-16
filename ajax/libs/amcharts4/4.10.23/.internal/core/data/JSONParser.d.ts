/**
 * JSON parser.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { DataParser, IDataParserOptions } from "./DataParser";
import { DateFormatter } from "../formatters/DateFormatter";
/**
 * Defines options for JSON format parser
 */
export interface IJSONOptions extends IDataParserOptions {
    /**
     * A list of fields that should be treaded as numeric.
     *
     * Any information container in such fields will be converted to `number`.
     */
    numberFields?: string[];
    /**
     * A list of fields that hold date/time infromation.
     *
     * Parser will try to convert such fields into `Date` objects.
     */
    dateFields?: string[];
    /**
     * A date formatted to be used when parsing dates.
     */
    dateFormatter?: DateFormatter;
}
/**
 * A parser for JSON.
 *
 * @important
 */
export declare class JSONParser extends DataParser {
    /**
     * Tests if the data is valid JSON.
     *
     * @param data  Source data
     * @return Is it JSON?
     */
    static isJSON(data: string): boolean;
    /**
     * Content-type suitable for JSON format.
     */
    contentType: string;
    /**
     * Parser options.
     *
     * @see {@link IJSONOptions} for description of each option
     */
    options: IJSONOptions;
    /**
     * Parses and returns data.
     *
     * @param data  Unparsed data
     * @return Parsed data
     */
    parse(data: string): any;
}
