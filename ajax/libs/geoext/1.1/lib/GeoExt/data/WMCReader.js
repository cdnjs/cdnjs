/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/LayerRecord.js
 * @require OpenLayers/Format/WMC.js
 * @require OpenLayers/Format/WMC/v1_1_0.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WMCReader
 *  base_link = `Ext.data.DataReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataReader>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WMCReader(meta, recordType)
 *  
 *      :param meta: ``Object`` Reader configuration.
 *      :param recordType: ``Array | Ext.data.Record`` An array of field
 *          configuration objects or a record object.  Default is
 *          :class:`GeoExt.data.LayerRecord`.
 *   
 *      Data reader class to create an array of
 *      :class:`GeoExt.data.LayerRecord` objects from a WMS GetCapabilities
 *      response.
 */
GeoExt.data.WMCReader = function(meta, recordType) {
    meta = meta || {};
    if(!meta.format) {
        meta.format = new OpenLayers.Format.WMC();
    }
    if(!(typeof recordType === "function")) {
        recordType = GeoExt.data.LayerRecord.create(
            recordType || meta.fields || [
                // give only non-OpenLayers fields as default recordType
                {name: "abstract", type: "string"},
                {name: "metadataURL", type: "string"},
                {name: "queryable", type: "boolean"},
                {name: "formats"}, // array
                {name: "styles"} // array
            ]
        );
    }
    GeoExt.data.WMCReader.superclass.constructor.call(
        this, meta, recordType
    );
};

Ext.extend(GeoExt.data.WMCReader, Ext.data.DataReader, {

    /** private: method[read]
     *  :param request: ``Object`` The XHR object which contains the parsed XML
     *      document.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     */
    read: function(request) {
        var data = request.responseXML;
        if(!data || !data.documentElement) {
            data = request.responseText;
        }
        return this.readRecords(data);
    },

    /** private: method[readRecords]
     *  :param data: ``DOMElement | String | Object`` A document element or XHR
     *      response string.  As an alternative to fetching capabilities data
     *      from a remote source, an object representing the capabilities can
     *      be provided given that the structure mirrors that returned from the
     *      capabilities parser.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     *  
     *  Create a data block containing Ext.data.Records from an XML document.
     */
    readRecords: function(data) {
        var format = this.meta.format;
        if(typeof data === "string" || data.nodeType) {
            data = format.read(data);
        }
        var layersContext = data ? data.layersContext : undefined;
        var records = [];        

        if(layersContext) {
            var recordType = this.recordType, fields = recordType.prototype.fields;
            var i, lenI, j, lenJ, layerContext, values, field, v;
            for (i = 0, lenI = layersContext.length; i < lenI; i++) {
                layerContext = layersContext[i];
                values = {};
                for(j = 0, lenJ = fields.length; j < lenJ; j++){
                    field = fields.items[j];
                    v = layerContext[field.mapping || field.name] ||
                        field.defaultValue;
                    v = field.convert(v);
                    values[field.name] = v;
                }
                values.layer = format.getLayerFromContext(layerContext);
                records.push(new this.recordType(values, values.layer.id));
            }
        }
        
        return {
            totalRecords: records.length,
            success: true,
            records: records
        };

    }

});

