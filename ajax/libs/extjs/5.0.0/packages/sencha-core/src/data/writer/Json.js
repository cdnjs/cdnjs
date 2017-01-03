/**
 * This class is used to write {@link Ext.data.Model} data to the server in a JSON format.
 * The {@link #allowSingle} configuration can be set to false to force the records to always
 * be encoded in an array, even if there is only a single record being sent.
 */
Ext.define('Ext.data.writer.Json', {
    extend: 'Ext.data.writer.Writer',
    alternateClassName: 'Ext.data.JsonWriter',
    alias: 'writer.json',
    
    config: {
        /**
        * @cfg {String} rootProperty The HTTP parameter name by which JSON encoded records will be passed to the server if the
        * {@link #encode} option is `true`.
        */
        rootProperty: undefined,
    
        /**
        * @cfg {Boolean} [encode=false] Configure `true` to send record data (all record fields if {@link #writeAllFields} is `true`)
        * as a JSON encoded HTTP parameter named by the {@link #rootProperty} configuration.
        * 
        * The encode option should only be set to true when a {@link #rootProperty} is defined, because the values will be
        * sent as part of the request parameters as opposed to a raw post. The root will be the name of the parameter
        * sent to the server.
        */
        encode: false,
    
        /**
        * @cfg {Boolean} [allowSingle=true] Configure with `false` to ensure that records are always wrapped in an array, even if there is only
        * one record being sent. When there is more than one record, they will always be encoded into an array.
        */
        allowSingle: true,
    
        /**
        * @cfg {Boolean} [expandData=false] By default, when dot-delimited field {@link #nameProperty mappings} are
        * used (e.g. `name: 'myProperty', mapping: 'my.nested.property'`) the writer will simply output a flat data
        * object containing the mapping string literal as the property name (e.g. `{ 'my.nested.property': 'foo' }`).
        * 
        * Mappings are used to map incoming nested JSON to flat Ext models. In many case, the data output by the
        * writer should preferrably match the original nested data format. Setting this config to `true` will ensure
        * that the output will instead look like `{ my: { nested: { property: 'foo' }}}`. The output is generated
        * by {@link #getExpandedData}, which can optionally be overridden to apply more customized logic.
        */
        expandData: false
    },
    
    //<debug>
    constructor: function(config) {
        if (config && config.hasOwnProperty('root')) {
            config = Ext.apply({}, config);
            config.rootProperty = config.root;
            delete config.root;
            Ext.log.warn('Ext.data.writer.Json: Using the deprecated "root" configuration. Use "rootProperty" instead.');
        }
        this.callParent([config]);
    },
    //</debug>
    
    /**
     * @protected
     * The Reader classes support dot-delimited data mappings for extracting nested raw data into fields, so the
     * writer must support converting the flat {@link Ext.data.Model} structure back into the original nested data
     * format. Using the same mappings when available, the Writer will simply split each delimiter into a nested
     * object in the output, which should exactly match the input format. For example, record data like this:
     * 
     *     my.nested.property: 'foo',
     *     my.nested.another: 'bar',
     *     my.somethingElse: 123
     * 
     * should write out as...
     * 
     *     my: {
     *         nested: {
     *             property: 'foo',
     *             another: 'bar
     *         },
     *         somethingElse: 123
     *     }
     *
     * This behavior is governed by the {@link #expandData} config. By default, this option is `false` for
     * compatibility reasons, and will output a flat structure matching the flat record format. Setting this config
     * to `true` will enable the expanded mapping behavior as shown here. This method could also be overridden
     * to provide an even more customized output data structure.
     */
    getExpandedData: function(data) {
        var dataLength = data.length,
            i = 0,
            item,
            prop,
            nameParts,
            j,
            tempObj,
            
            toObject = function(name, value) {
                var o = {};
                o[name] = value;
                return o;
            };
        
        for (; i < dataLength; i++) {
            item = data[i];
            
            for (prop in item) {
                if (item.hasOwnProperty(prop)) {
                    // e.g. my.nested.property: 'foo'
                    nameParts = prop.split('.');
                    j = nameParts.length - 1;
                    
                    if (j > 0) {
                        // Initially this will be the value 'foo'.
                        // Equivalent to rec['my.nested.property']
                        tempObj = item[prop];
                        
                        for (; j > 0; j--) {
                            // Starting with the value above, we loop inside out, assigning the
                            // current object as the value for the parent name. Work all
                            // the way up until only the root name is left to assign.
                            tempObj = toObject(nameParts[j], tempObj);
                        }
                        
                        // At this point we'll have all child properties rolled up into a single
                        // object like `{ nested: { property: 'foo' }}`. Now add the root name
                        // (e.g. 'my') to the record data if needed (do not overwrite existing):
                        item[nameParts[0]] = item[nameParts[0]] || {};
                        // Since there could be duplicate names at any level of the nesting be sure
                        // to merge rather than assign when setting the object as the value:
                        Ext.Object.merge(item[nameParts[0]], tempObj);
                        // Finally delete the original mapped property from the record
                        delete item[prop];
                    }
                }
            }
        }
        return data;
    },
    
    writeRecords: function(request, data) {
        var me = this,
            root = me.getRootProperty(),
            json, single, transform;
        
        if (me.getExpandData()) {
            data = me.getExpandedData(data);
        }
        
        if (me.getAllowSingle() && data.length === 1) {
            // convert to single object format
            data = data[0];
            single = true;
        }
        
        transform = this.getTransform();
        if (transform) {
            data = transform(data, request);
            request.setJsonData(data);
        }
        
        if (me.getEncode()) {
            if (root) {
                // sending as a param, need to encode
                request.setParam(root, Ext.encode(data));
            } else {
                //<debug>
                Ext.Error.raise('Must specify a root when using encode');
                //</debug>
            }
        } else if (single || (data && data.length)) {
            // send as jsonData
            json = request.getJsonData() || {};
            if (root) {
                json[root] = data;
            } else {
                json = data;
            }
            request.setJsonData(json);
        }
        return request;
    }
});
