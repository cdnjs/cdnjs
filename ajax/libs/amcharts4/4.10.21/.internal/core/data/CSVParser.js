/**
 * CSV parser.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { DataParser } from "./DataParser";
import * as $type from "../utils/Type";
import * as $array from "../utils/Array";
/**
 * Define possible separators.
 */
var separators = [",", ";", "\t"];
/**
 * A parser for CSV format.
 *
 * @important
 */
var CSVParser = /** @class */ (function (_super) {
    __extends(CSVParser, _super);
    function CSVParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Content-type suitable for CSV format.
         */
        _this.contentType = "text/csv";
        /**
         * Parser options.
         *
         * @see {@link ICSVOptions} for description of each option
         */
        _this.options = {
            delimiter: "",
            reverse: false,
            skipRows: 0,
            skipEmpty: true,
            useColumnNames: false
        };
        return _this;
    }
    /**
     * Tests if the format is CSV.
     *
     * @param data  Source data
     * @return Is it CSV?
     */
    CSVParser.isCSV = function (data) {
        return CSVParser.getDelimiterFromData(data) ? true : false;
    };
    /**
     * Tries to determine a column separator.
     *
     * @param data  Source data
     * @return Separator
     */
    CSVParser.getDelimiterFromData = function (data) {
        // We're going to take first few lines of the CSV with different
        // possible separators and check if it results in same number of columns.
        // If it does, we're going to assume it's a CSV
        var lines = data.split("\n");
        var len = lines.length;
        var separator;
        $array.each(separators, function (sep) {
            var columns = 0, lineColums = 0;
            // TODO replace with iterators
            for (var i = 0; i < len; ++i) {
                // Get number of columns in a line
                columns = lines[i].split(sep).length;
                if (columns > 1) {
                    // More than one column - possible candidate
                    if (lineColums === 0) {
                        // First line
                        lineColums = columns;
                    }
                    else if (columns != lineColums) {
                        // Incorrect number of columns, give up on this separator
                        lineColums = 0;
                        break;
                    }
                }
                else {
                    // Not this separator
                    // Not point in continuing
                    lineColums = 0;
                    break;
                }
            }
            // Check if we have a winner
            if (lineColums) {
                separator = sep;
            }
        });
        return separator;
    };
    /**
     * Parses and returns data.
     *
     * @param data  Unparsed data
     * @return Parsed data
     */
    CSVParser.prototype.parse = function (csv) {
        // Check if we have delimiter set
        if (!this.options.delimiter) {
            this.options.delimiter = CSVParser.getDelimiterFromData(csv);
        }
        // Get CSV data as array
        var data = this.CSVToArray(csv, this.options.delimiter);
        // Do we need to cast some fields to numbers?
        var empty = $type.hasValue(this.options.emptyAs);
        var numbers = this.parsableNumbers;
        var dates = this.parsableDates;
        // Init resuling array
        var res = [], cols = [], col, i;
        // Skip rows
        for (i = 0; i < this.options.skipRows; i++) {
            data.shift();
        }
        // First row holds column names?
        if (this.options.useColumnNames) {
            cols = data.shift();
            // Normalize column names
            for (var x = 0; x < cols.length; x++) {
                // trim
                col = $type.hasValue(cols[x]) ? cols[x].replace(/^\s+|\s+$/gm, "") : "";
                // Check for empty
                if ("" === col) {
                    col = "col" + x;
                }
                cols[x] = col;
            }
        }
        // Iterate through the result set
        var row;
        while (true) {
            row = this.options.reverse ? data.pop() : data.shift();
            if (!row) {
                break;
            }
            if (this.options.skipEmpty && row.length === 1 && row[0] === "") {
                continue;
            }
            var dataPoint = {};
            for (i = 0; i < row.length; i++) {
                col = undefined === cols[i] ? "col" + i : cols[i];
                dataPoint[col] = row[i] === "" ? this.options.emptyAs : row[i];
                // Convert
                if (empty) {
                    dataPoint[col] = this.maybeToEmpty(dataPoint[col]);
                }
                if (numbers) {
                    dataPoint[col] = this.maybeToNumber(col, dataPoint[col]);
                }
                if (dates) {
                    dataPoint[col] = this.maybeToDate(col, dataPoint[col]);
                }
            }
            res.push(dataPoint);
        }
        return res;
    };
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
    CSVParser.prototype.CSVToArray = function (data, delimiter) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        delimiter = (delimiter || ',');
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp((
        // Delimiters.
        "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + delimiter + "\\r\\n]*))"), "gi");
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [
            []
        ];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (true) {
            arrMatches = objPattern.exec(data);
            if (!arrMatches) {
                break;
            }
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length &&
                (strMatchedDelimiter !== delimiter)) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            var strMatchedValue = void 0;
            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
            }
            else {
                // We found a non-quoted value.
                strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        // Return the parsed data.
        return (arrData);
    };
    return CSVParser;
}(DataParser));
export { CSVParser };
//# sourceMappingURL=CSVParser.js.map