YUI.add('datatype-date-parse', function(Y) {

/**
 * Parse number submodule.
 *
 * @module datatype
 * @submodule datatype-date-parse
 * @for DataType.Date
 */
var LANG = Y.Lang;

Y.mix(Y.namespace("DataType.Date"), {
    /**
     * Converts data to type Date.
     *
     * @method parse
     * @param data {String | Number} Data to convert. Values supported by the Date constructor are supported.
     * @return {Date} A Date, or null.
     */
    parse: function(data) {
        var date = null;

        //Convert to date
        if(!(LANG.isDate(data))) {
            date = new Date(data);
        }
        else {
            return date;
        }

        // Validate
        if(LANG.isDate(date) && (date != "Invalid Date") && !isNaN(date)) { // Workaround for bug 2527965
            return date;
        }
        else {
            Y.log("Could not convert data " + LANG.dump(date) + " to type Date", "warn", "date");
            return null;
        }
    }
});

// Add Parsers shortcut
Y.namespace("Parsers").date = Y.DataType.Date.parse;


}, '@VERSION@' );
