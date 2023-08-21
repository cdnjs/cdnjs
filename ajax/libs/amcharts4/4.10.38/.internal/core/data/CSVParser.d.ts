/**
 * CSV parser.
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
 * Defines options for CSV format parser
 */
export interface ICSVOptions extends IDataParserOptions {
    /**
     * A delimiter character for columns.
     *
     * @default ','
     */
    delimiter?: string;
    /**
     * The data is in reverse order.
     *
     * If iset to `true`, parser will invert the order of the data items before
     * passing back the data.
     *
     * @default false
     */
    reverse?: boolean;
    /**
     * Skip a number of rows from the beginning of the data.
     *
     * Useful if your data contains non-data headers, such as column names or
     * empty rows.
     *
     * @default 0
     */
    skipRows?: number;
    /**
     * Skip empty rows.
     *
     * If set to `false`, parser will generate empty data points for empty rows
     * in data.
     *
     * @default true
     */
    skipEmpty?: boolean;
    /**
     * Use the first row in data to generte column names.
     *
     * Normally, parser will name each column `col0`, `col1`, etc.
     *
     * Setting this to `true` will make the parser look at the first row, for
     * actual column names.
     *
     * Please note that if you use it with `skipRows`, the specified number of
     * rows will be removed, then the parser will look for column names in the
     * first row of what's left.
     *
     * @default false
     */
    useColumnNames?: boolean;
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
 * A parser for CSV format.
 *
 * @important
 */
export declare class CSVParser extends DataParser {
    /**
     * Tests if the format is CSV.
     *
     * @param data  Source data
     * @return Is it CSV?
     */
    static isCSV(data: string): boolean;
    /**
     * Tries to determine a column separator.
     *
     * @param data  Source data
     * @return Separator
     */
    static getDelimiterFromData(data: string): string;
    /**
     * Content-type suitable for CSV format.
     */
    contentType: string;
    /**
     * Parser options.
     *
     * @see {@link ICSVOptions} for description of each option
     */
    options: ICSVOptions;
    /**
     * Parses and returns data.
     *
     * @param data  Unparsed data
     * @return Parsed data
     */
    parse(csv: string): any[];
    /**
     * Converts CSV into array.
     *
     * The functionality of this function is taken from here:
     * http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
     *
     * @param data       Source data
     * @param delimiter  Column delimiter
     * @return Parsed array
     */
    CSVToArray(data: string, delimiter: string): any[];
}
