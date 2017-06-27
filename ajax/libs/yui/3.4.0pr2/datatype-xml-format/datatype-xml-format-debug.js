YUI.add('datatype-xml-format', function(Y) {

/**
 * Format XML submodule.
 *
 * @module datatype
 * @submodule datatype-xml-format
 */

/**
 * XML submodule.
 *
 * @module datatype
 * @submodule datatype-xml
 */

/**
 * DataType.XML provides a set of utility functions to operate against XML documents.
 *
 * @class DataType.XML
 * @static
 */
var LANG = Y.Lang;

Y.mix(Y.namespace("DataType.XML"), {
    /**
     * Converts data to type XMLDocument.
     *
     * @method format
     * @param data {XMLDoc} Data to convert.
     * @return {String} String.
     */
    format: function(data) {
        try {
            if(!LANG.isUndefined(XMLSerializer)) {
                return (new XMLSerializer()).serializeToString(data);
            }
        }
        catch(e) {
            if(data && data.xml) {
                return data.xml;
            }
            else {
                Y.log("Could not format data " + Y.dump(data) + " from type XML", "warn", "datatype-xml");
                return (LANG.isValue(data) && data.toString) ? data.toString() : "";
            }
        }
    }
});



}, '@VERSION@' );
