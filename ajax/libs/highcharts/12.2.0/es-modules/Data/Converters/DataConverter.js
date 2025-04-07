/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Sebastian Bochan
 *  - Gøran Slettemark
 *  - Torstein Hønsi
 *  - Wojciech Chmiel
 *  - Jomar Hønsi
 *
 * */
'use strict';
import DataTable from '../DataTable.js';
import U from '../../Core/Utilities.js';
const { addEvent, fireEvent, isNumber, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Base class providing an interface and basic methods for a DataConverter
 *
 * @private
 */
class DataConverter {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the DataConverter.
     *
     * @param {DataConverter.UserOptions} [options]
     * Options for the DataConverter.
     */
    constructor(options) {
        /* *
         *
         *  Properties
         *
         * */
        /**
         * A collection of available date formats.
         */
        this.dateFormats = {
            'YYYY/mm/dd': {
                regex: /^(\d{4})([\-\.\/])(\d{1,2})\2(\d{1,2})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[1], match[3] - 1, +match[4]) :
                        NaN);
                }
            },
            'dd/mm/YYYY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{4})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[4], match[3] - 1, +match[1]) :
                        NaN);
                },
                alternative: 'mm/dd/YYYY' // Different format with the same regex
            },
            'mm/dd/YYYY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{4})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[4], match[1] - 1, +match[3]) :
                        NaN);
                }
            },
            'dd/mm/YY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{2})$/,
                parser: function (match) {
                    const d = new Date();
                    if (!match) {
                        return NaN;
                    }
                    let year = +match[4];
                    if (year > (d.getFullYear() - 2000)) {
                        year += 1900;
                    }
                    else {
                        year += 2000;
                    }
                    return Date.UTC(year, match[3] - 1, +match[1]);
                },
                alternative: 'mm/dd/YY' // Different format with the same regex
            },
            'mm/dd/YY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{2})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[4] + 2000, match[1] - 1, +match[3]) :
                        NaN);
                }
            }
        };
        const mergedOptions = merge(DataConverter.defaultOptions, options);
        let regExpPoint = mergedOptions.decimalPoint;
        if (regExpPoint === '.' || regExpPoint === ',') {
            regExpPoint = regExpPoint === '.' ? '\\.' : ',';
            this.decimalRegExp =
                new RegExp('^(-?[0-9]+)' + regExpPoint + '([0-9]+)$');
        }
        this.options = mergedOptions;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Converts a value to a boolean.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {boolean}
     * Converted value as a boolean.
     */
    asBoolean(value) {
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string') {
            return value !== '' && value !== '0' && value !== 'false';
        }
        return !!this.asNumber(value);
    }
    /**
     * Converts a value to a Date.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {globalThis.Date}
     * Converted value as a Date.
     */
    asDate(value) {
        let timestamp;
        if (typeof value === 'string') {
            timestamp = this.parseDate(value);
        }
        else if (typeof value === 'number') {
            timestamp = value;
        }
        else if (value instanceof Date) {
            return value;
        }
        else {
            timestamp = this.parseDate(this.asString(value));
        }
        return new Date(timestamp);
    }
    /**
     * Casts a string value to it's guessed type
     *
     * @param {*} value
     * The value to examine.
     *
     * @return {number|string|Date}
     * The converted value.
     */
    asGuessedType(value) {
        const converter = this, typeMap = {
            'number': converter.asNumber,
            'Date': converter.asDate,
            'string': converter.asString
        };
        return typeMap[converter.guessType(value)].call(converter, value);
    }
    /**
     * Converts a value to a number.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {number}
     * Converted value as a number.
     */
    asNumber(value) {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        if (typeof value === 'string') {
            const decimalRegex = this.decimalRegExp;
            if (value.indexOf(' ') > -1) {
                value = value.replace(/\s+/g, '');
            }
            if (decimalRegex) {
                if (!decimalRegex.test(value)) {
                    return NaN;
                }
                value = value.replace(decimalRegex, '$1.$2');
            }
            return parseFloat(value);
        }
        if (value instanceof Date) {
            return value.getDate();
        }
        if (value) {
            return value.getRowCount();
        }
        return NaN;
    }
    /**
     * Converts a value to a string.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {string}
     * Converted value as a string.
     */
    asString(value) {
        return '' + value;
    }
    /**
     * Tries to guess the date format
     *  - Check if either month candidate exceeds 12
     *  - Check if year is missing (use current year)
     *  - Check if a shortened year format is used (e.g. 1/1/99)
     *  - If no guess can be made, the user must be prompted
     * data is the data to deduce a format based on
     * @private
     *
     * @param {Array<string>} data
     * Data to check the format.
     *
     * @param {number} limit
     * Max data to check the format.
     *
     * @param {boolean} save
     * Whether to save the date format in the converter options.
     */
    deduceDateFormat(data, limit, save) {
        const parser = this, stable = [], max = [];
        let format = 'YYYY/mm/dd', thing, guessedFormat = [], i = 0, madeDeduction = false, 
        /// candidates = {},
        elem, j;
        if (!limit || limit > data.length) {
            limit = data.length;
        }
        for (; i < limit; i++) {
            if (typeof data[i] !== 'undefined' &&
                data[i] && data[i].length) {
                thing = data[i]
                    .trim()
                    .replace(/[\-\.\/]/g, ' ')
                    .split(' ');
                guessedFormat = [
                    '',
                    '',
                    ''
                ];
                for (j = 0; j < thing.length; j++) {
                    if (j < guessedFormat.length) {
                        elem = parseInt(thing[j], 10);
                        if (elem) {
                            max[j] = (!max[j] || max[j] < elem) ? elem : max[j];
                            if (typeof stable[j] !== 'undefined') {
                                if (stable[j] !== elem) {
                                    stable[j] = false;
                                }
                            }
                            else {
                                stable[j] = elem;
                            }
                            if (elem > 31) {
                                if (elem < 100) {
                                    guessedFormat[j] = 'YY';
                                }
                                else {
                                    guessedFormat[j] = 'YYYY';
                                }
                                /// madeDeduction = true;
                            }
                            else if (elem > 12 &&
                                elem <= 31) {
                                guessedFormat[j] = 'dd';
                                madeDeduction = true;
                            }
                            else if (!guessedFormat[j].length) {
                                guessedFormat[j] = 'mm';
                            }
                        }
                    }
                }
            }
        }
        if (madeDeduction) {
            // This handles a few edge cases with hard to guess dates
            for (j = 0; j < stable.length; j++) {
                if (stable[j] !== false) {
                    if (max[j] > 12 &&
                        guessedFormat[j] !== 'YY' &&
                        guessedFormat[j] !== 'YYYY') {
                        guessedFormat[j] = 'YY';
                    }
                }
                else if (max[j] > 12 && guessedFormat[j] === 'mm') {
                    guessedFormat[j] = 'dd';
                }
            }
            // If the middle one is dd, and the last one is dd,
            // the last should likely be year.
            if (guessedFormat.length === 3 &&
                guessedFormat[1] === 'dd' &&
                guessedFormat[2] === 'dd') {
                guessedFormat[2] = 'YY';
            }
            format = guessedFormat.join('/');
            // If the caculated format is not valid, we need to present an
            // error.
        }
        // Save the deduced format in the converter options.
        if (save) {
            parser.options.dateFormat = format;
        }
        return format;
    }
    /**
     * Emits an event on the DataConverter instance.
     *
     * @param {DataConverter.Event} [e]
     * Event object containing additional event data
     */
    emit(e) {
        fireEvent(this, e.type, e);
    }
    /**
     * Initiates the data exporting. Should emit `exportError` on failure.
     *
     * @param {DataConnector} connector
     * Connector to export from.
     *
     * @param {DataConverter.Options} [options]
     * Options for the export.
     */
    export(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    connector, options
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ) {
        this.emit({
            type: 'exportError',
            columns: [],
            headers: []
        });
        throw new Error('Not implemented');
    }
    /**
     * Getter for the data table.
     *
     * @return {DataTable}
     * Table of parsed data.
     */
    getTable() {
        throw new Error('Not implemented');
    }
    /**
     * Guesses the potential type of a string value for parsing CSV etc.
     *
     * @param {*} value
     * The value to examine.
     *
     * @return {'number'|'string'|'Date'}
     * Type string, either `string`, `Date`, or `number`.
     */
    guessType(value) {
        const converter = this;
        let result = 'string';
        if (typeof value === 'string') {
            const trimedValue = converter.trim(`${value}`), decimalRegExp = converter.decimalRegExp;
            let innerTrimedValue = converter.trim(trimedValue, true);
            if (decimalRegExp) {
                innerTrimedValue = (decimalRegExp.test(innerTrimedValue) ?
                    innerTrimedValue.replace(decimalRegExp, '$1.$2') :
                    '');
            }
            const floatValue = parseFloat(innerTrimedValue);
            if (+innerTrimedValue === floatValue) {
                // String is numeric
                value = floatValue;
            }
            else {
                // Determine if a date string
                const dateValue = converter.parseDate(value);
                result = isNumber(dateValue) ? 'Date' : 'string';
            }
        }
        if (typeof value === 'number') {
            // Greater than milliseconds in a year assumed timestamp
            result = value > 365 * 24 * 3600 * 1000 ? 'Date' : 'number';
        }
        return result;
    }
    /**
     * Registers a callback for a specific event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.Callback} callback
     * Function to register for an modifier callback.
     *
     * @return {Function}
     * Function to unregister callback from the modifier event.
     */
    on(type, callback) {
        return addEvent(this, type, callback);
    }
    /**
     * Initiates the data parsing. Should emit `parseError` on failure.
     *
     * @param {DataConverter.UserOptions} options
     * Options of the DataConverter.
     */
    parse(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options) {
        this.emit({
            type: 'parseError',
            columns: [],
            headers: []
        });
        throw new Error('Not implemented');
    }
    /**
     * Parse a date and return it as a number.
     *
     * @param {string} value
     * Value to parse.
     *
     * @param {string} dateFormatProp
     * Which of the predefined date formats
     * to use to parse date values.
     */
    parseDate(value, dateFormatProp) {
        const converter = this, options = converter.options;
        let dateFormat = dateFormatProp || options.dateFormat, result = NaN, key, format, match;
        if (options.parseDate) {
            result = options.parseDate(value);
        }
        else {
            // Auto-detect the date format the first time
            if (!dateFormat) {
                for (key in converter.dateFormats) { // eslint-disable-line guard-for-in
                    format = converter.dateFormats[key];
                    match = value.match(format.regex);
                    if (match) {
                        // `converter.options.dateFormat` = dateFormat = key;
                        dateFormat = key;
                        // `converter.options.alternativeFormat` =
                        // format.alternative || '';
                        result = format.parser(match);
                        break;
                    }
                }
                // Next time, use the one previously found
            }
            else {
                format = converter.dateFormats[dateFormat];
                if (!format) {
                    // The selected format is invalid
                    format = converter.dateFormats['YYYY/mm/dd'];
                }
                match = value.match(format.regex);
                if (match) {
                    result = format.parser(match);
                }
            }
            // Fall back to Date.parse
            if (!match) {
                match = Date.parse(value);
                // External tools like Date.js and MooTools extend Date object
                // and returns a date.
                if (typeof match === 'object' &&
                    match !== null &&
                    match.getTime) {
                    result = (match.getTime() -
                        match.getTimezoneOffset() *
                            60000);
                    // Timestamp
                }
                else if (isNumber(match)) {
                    result = match - (new Date(match)).getTimezoneOffset() * 60000;
                    if ( // Reset dates without year in Chrome
                    value.indexOf('2001') === -1 &&
                        (new Date(result)).getFullYear() === 2001) {
                        result = NaN;
                    }
                }
            }
        }
        return result;
    }
    /**
     * Trim a string from whitespaces.
     *
     * @param {string} str
     * String to trim.
     *
     * @param {boolean} [inside=false]
     * Remove all spaces between numbers.
     *
     * @return {string}
     * Trimed string
     */
    trim(str, inside) {
        if (typeof str === 'string') {
            str = str.replace(/^\s+|\s+$/g, '');
            // Clear white space insdie the string, like thousands separators
            if (inside && /^[\d\s]+$/.test(str)) {
                str = str.replace(/\s/g, '');
            }
        }
        return str;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Default options
 */
DataConverter.defaultOptions = {
    dateFormat: '',
    alternativeFormat: '',
    startColumn: 0,
    endColumn: Number.MAX_VALUE,
    startRow: 0,
    endRow: Number.MAX_VALUE,
    firstRowAsNames: true,
    switchRowsAndColumns: false
};
/* *
 *
 *  Class Namespace
 *
 * */
/**
 * Additionally provided types for events and conversion.
 */
(function (DataConverter) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Registry as a record object with connector names and their class.
     */
    DataConverter.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a converter class to the registry.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the converter class.
     *
     * @param {DataConverterTypes} DataConverterClass
     * Connector class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a converter registered with this key.
     */
    function registerType(key, DataConverterClass) {
        return (!!key &&
            !DataConverter.types[key] &&
            !!(DataConverter.types[key] = DataConverterClass));
    }
    DataConverter.registerType = registerType;
    /**
     * Converts an array of columns to a table instance. Second dimension of the
     * array are the row cells.
     *
     * @param {Array<DataTable.Column>} [columns]
     * Array to convert.
     *
     * @param {Array<string>} [headers]
     * Column names to use.
     *
     * @return {DataTable}
     * Table instance from the arrays.
     */
    function getTableFromColumns(columns = [], headers = []) {
        const table = new DataTable();
        for (let i = 0, iEnd = Math.max(headers.length, columns.length); i < iEnd; ++i) {
            table.setColumn(headers[i] || `${i}`, columns[i]);
        }
        return table;
    }
    DataConverter.getTableFromColumns = getTableFromColumns;
})(DataConverter || (DataConverter = {}));
/* *
 *
 *  Default Export
 *
 * */
export default DataConverter;
