YUI.add('dataparser-base', function(Y) {

/**
 * The DataParser utility provides a common configurable interface for widgets to
 * parse a variety of data against a given schema.
 *
 * @module dataparser
 */

/**
 * Base class for the YUI DataParser utility.
 * @class DataParser.Base
 * @static
 */
var DPBase = {
    /**
     * Abstract overridable parse method returns data as-is.
     *
     * @method _parse
     * @param schema {Object} Schema to parse against.
     * @param data {Object} Data to parse.
     * @return {Object} Schema-parsed data.
     * @static
     * @protected
     */
   _parse: function(schema, data) {
        return data;
    },

    /**
     * Parses data against schema.
     *
     * @method parse
     * @param schema {Object} Schema to parse against.
     * @param data {Object} Data to parse.
     * @return {Object} Schema-parsed data.
     * @static
     */
    parse: function(schema, data) {
        return this._parse(schema, data);
    }
};

Y.namespace("DataParser");
Y.DataParser.Base = DPBase;


    
    
    
    




}, '@VERSION@' ,{requires:['base']});
