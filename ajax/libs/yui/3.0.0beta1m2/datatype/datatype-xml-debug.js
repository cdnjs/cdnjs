YUI.add('datatype-xml', function(Y) {

/**
 * The DataType utility provides a set of utility functions to operate on native
 * JavaScript data types.
 *
 * @module datatype
 */
var LANG = Y.Lang,

/**
 * XML submodule.
 *
 * @class DataType.XML
 * @static
 */
XML = {
    /**
     * Returns string name.
     *
     * @method toString
     * @return {String} String representation for this object.
     */
    toString: function() {
        return "DataType.XML";
    },

    /**
     * Converts data to type XMLDocument.
     *
     * @method parse
     * @param data {String} Data to convert.
     * @return {XMLDoc} XML Document.
     * @static
     */
    parse: function(data) {
        var xmlDoc = null;
        if(LANG.isString(data)) {
            try {
                if(!LANG.isUndefined(DOMParser)) {
                    xmlDoc = new DOMParser().parseFromString(data, "text/xml");
                }
            }
            catch(e) {
                try {
                    if(!LANG.isUndefined(ActiveXObject)) {
                            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                            xmlDoc.async = false;
                            xmlDoc.loadXML(data);
                    }
                }
                catch(e) {
                    Y.log("Could not parse data " + Y.dump(data) + " to type XML Document: " + e.message, "warn", Number.toString());
                }
            }
        }
        return xmlDoc;
    }
};

Y.namespace("DataType").XML = XML;
Y.namespace("Parsers").xml = XML.parse;



}, '@VERSION@' ,{requires:['??']});
