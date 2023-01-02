/**
 * Data parser module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { DateFormatter } from "../formatters/DateFormatter";
import * as $utils from "../utils/Utils";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class for the data parsers.
 */
var DataParser = /** @class */ (function () {
    function DataParser() {
    }
    /**
     * A "placeholder" function for real parsers to override.
     *
     * @ignore Exclude from docs
     * @param data  Source data
     * @return Parsed data (empty)
     */
    DataParser.prototype.parse = function (data) {
        return [];
    };
    ;
    Object.defineProperty(DataParser.prototype, "parsableNumbers", {
        /**
         * Checks if there are any numeric fields that need to be converted to
         * numbers.
         *
         * @return Numeric fields?
         */
        get: function () {
            return this.options.numberFields && (this.options.numberFields.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts a value to 'number' if it is in `numberFields`.
     *
     * @param field  Field name
     * @param value  Value
     * @return Parsed or original value
     */
    DataParser.prototype.maybeToNumber = function (field, value) {
        if (this.options.numberFields.indexOf(field) !== -1) {
            return $utils.anyToNumber(value);
        }
        return value;
    };
    Object.defineProperty(DataParser.prototype, "parsableDates", {
        /**
         * Checks if there are any date fields that need to be converted to `Date`
         * objects.
         *
         * @return Date fields?
         */
        get: function () {
            return this.options.dateFields && (this.options.dateFields.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts a value to `Date` if it is in `dateFields`.
     *
     * @param field  Field name
     * @param value  Value
     * @return Parsed or original value
     */
    DataParser.prototype.maybeToDate = function (field, value) {
        if (this.options.dateFields.indexOf(field) !== -1) {
            return this.options.dateFormatter.parse(value, this.dateFormat);
        }
        return value;
    };
    /**
     * Replaces empty value with something else.
     *
     * @param value  Source value
     * @return Source value or replacement
     */
    DataParser.prototype.maybeToEmpty = function (value) {
        if ((!$type.hasValue(value) || value == "") && $type.hasValue(this.options.emptyAs)) {
            return this.options.emptyAs;
        }
        return value;
    };
    Object.defineProperty(DataParser.prototype, "dateFormatter", {
        /**
         * [[DateFormatter]] object for date parsing.
         *
         * If there was not [[DateFormatter]] supplied in parser options, a new one
         * is created.
         *
         * @return Date formatter
         * @see {@link DateFormatter}
         */
        get: function () {
            if (!this.options.dateFormatter) {
                this.options.dateFormatter = new DateFormatter;
                if (this.options.dateFormat) {
                    this.options.dateFormat = this.options.dateFormat;
                }
            }
            return this.options.dateFormatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataParser.prototype, "dateFormat", {
        /**
         * A date format to use when parsing dates.
         *
         * @return Date format
         * @see {@link DateFormatter}
         */
        get: function () {
            return this.options.dateFormat || this.dateFormatter.inputDateFormat;
        },
        enumerable: true,
        configurable: true
    });
    return DataParser;
}());
export { DataParser };
//# sourceMappingURL=DataParser.js.map