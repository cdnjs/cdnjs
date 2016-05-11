YUI.add('datasource-jsonparser', function(Y) {

/**
 * Extends DataSource with schema-based JSON parsing functionality.
 *
 * @module datasource
 * @submodule datasource-dataparser
 */

/**
 * Adds parsability to the YUI DataSource utility.
 * @class DataSourceJSONParser
 * @extends Plugin
 */    
var DataSourceJSONParser = function() {
    DataSourceJSONParser.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceJSONParser, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "parser"
     */
    NS: "parser",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "DataSourceJSONParser"
     */
    NAME: "DataSourceJSONParser",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceCache Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        parser: {
            readOnly: true,
            value: Y.DataParser.JSON,
            useRef: true
        },
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceJSONParser, Y.Plugin, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defDataFn", this._beforeDefDataFn);
    },

    /**
     * Parses raw data into a normalized response.
     *
     * @method _beforeDefDataFn
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e) {
        var data = ((this._owner instanceof Y.DataSource.XHR) && Y.Lang.isString(e.data.responseText)) ? e.data.responseText : e.data,
            response = (this.get("parser").parse(this.get("schema"), data));
            
        // Default
        if(!response) {
            response = {
                meta: {},
                results: data
            };
        }
        
        this._owner.fire("response", Y.mix({response:response}, e));
        return new Y.Do.Halt("DataSourceJSONParser plugin halted _defDataFn");
    }
});
    
Y.namespace('plugin').DataSourceJSONParser = DataSourceJSONParser;



}, '@VERSION@' ,{requires:['plugin', 'datasource-base', 'dataparser-json']});
