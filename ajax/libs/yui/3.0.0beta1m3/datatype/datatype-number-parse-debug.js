YUI.add('datatype-number-parse', function(Y) {

/**
 * The DataType utility provides a set of utility functions to operate on native
 * JavaScript data types.
 *
 * @module datatype
 */
var LANG = Y.Lang;

/**
 * Parse number submodule.
 *
 * @class DataType.Number
 * @submodule datatype-number-format
 * @static
 */
Y.mix(Y.namespace("DataType.Number"), {
    /**
     * Converts data to type Number.
     *
     * @method parse
     * @param data {String | Number | Boolean} Data to convert. The following
     * values return as null: null, undefined, NaN, "".
     * @return {Number} A number, or null.
     * @static
     */
    parse: function(data) {
        var number = (data === null) ? data : +data;
        if(LANG.isNumber(number)) {
            return number;
        }
        else {
            Y.log("Could not parse data " + Y.dump(data) + " to type Number", "warn", "datatype-number");
            return null;
        }
    }
});

// Add Parsers shortcut
Y.namespace("Parsers").number = Y.DataType.Number.parse;



}, '@VERSION@' );
