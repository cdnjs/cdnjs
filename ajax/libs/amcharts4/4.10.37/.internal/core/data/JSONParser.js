/**
 * JSON parser.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { DataParser } from "./DataParser";
import * as $object from "../utils/Object";
import * as $type from "../utils/Type";
/**
 * A parser for JSON.
 *
 * @important
 */
var JSONParser = /** @class */ (function (_super) {
    __extends(JSONParser, _super);
    function JSONParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Content-type suitable for JSON format.
         */
        _this.contentType = "application/json";
        /**
         * Parser options.
         *
         * @see {@link IJSONOptions} for description of each option
         */
        _this.options = {};
        return _this;
    }
    /**
     * Tests if the data is valid JSON.
     *
     * @param data  Source data
     * @return Is it JSON?
     */
    JSONParser.isJSON = function (data) {
        try {
            // Try parsing JSON
            JSON.parse(data);
            // If we got to this point it means it's a valid JSON
            return true;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Parses and returns data.
     *
     * @param data  Unparsed data
     * @return Parsed data
     */
    JSONParser.prototype.parse = function (data) {
        var _this = this;
        // Init return
        var res;
        // Try parsing
        try {
            if ($type.hasValue(JSON)) {
                res = JSON.parse(data);
            }
        }
        catch (e) {
            return undefined;
        }
        // Do we need to cast some fields to numbers or dates?
        var empty = $type.hasValue(this.options.emptyAs);
        var numbers = this.parsableNumbers;
        var dates = this.parsableDates;
        if (Array.isArray(res) && (numbers || dates || empty)) {
            var _loop_1 = function (i, len) {
                var row = res[i];
                $object.each(row, function (key, value) {
                    if (empty) {
                        row[key] = _this.maybeToEmpty(row[key]);
                    }
                    if (numbers) {
                        row[key] = _this.maybeToNumber(key, row[key]);
                    }
                    if (dates) {
                        row[key] = _this.maybeToDate(key, row[key]);
                    }
                });
            };
            // Iterate through the data and check if it needs to be converted
            for (var i = 0, len = res.length; i < len; i++) {
                _loop_1(i, len);
            }
        }
        // Convert to array
        //return Array.isArray(res) ? res : [res];
        return res;
    };
    return JSONParser;
}(DataParser));
export { JSONParser };
//# sourceMappingURL=JSONParser.js.map