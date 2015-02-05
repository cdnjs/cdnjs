/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Format/WMSDescribeLayer.js
 * @require OpenLayers/Format/WMSDescribeLayer/v1_1.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WMSDescribeLayerReader
 *  base_link = `Ext.data.DataReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataReader>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WMSDescribeLayerReader(meta, recordType)
 *  
 *      :param meta: ``Object`` Reader configuration.
 *      :param recordType: ``Array | Ext.data.Record`` An array of field
 *          configuration objects or a record object.  Default has
 *          fields for owsType, owsURL, and typeName.
 *   
 *      Data reader class to create an array of
 *      layer description objects from a WMS DescribeLayer
 *      response.
 */
GeoExt.data.WMSDescribeLayerReader = function(meta, recordType) {
    meta = meta || {};
    if(!meta.format) {
        meta.format = new OpenLayers.Format.WMSDescribeLayer();
    }
    if(!(typeof recordType === "function")) {
        recordType = Ext.data.Record.create(
            recordType || meta.fields || [
                {name: "owsType", type: "string"},
                {name: "owsURL", type: "string"},
                {name: "typeName", type: "string"}
            ]
        );
    }
    GeoExt.data.WMSDescribeLayerReader.superclass.constructor.call(
        this, meta, recordType
    );
};

Ext.extend(GeoExt.data.WMSDescribeLayerReader, Ext.data.DataReader, {

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
     *  :param data: ``DOMElement | Strint | Object`` A document element or XHR
     *      response string.  As an alternative to fetching layer description data
     *      from a remote source, an object representing the layer descriptions can
     *      be provided given that the structure mirrors that returned from the
     *      layer description parser.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     *  
     *  Create a data block containing Ext.data.Records from an XML document.
     */
    readRecords: function(data) {
        
        if(typeof data === "string" || data.nodeType) {
            data = this.meta.format.read(data);
        }
        var records = [], description;        
        for(var i=0, len=data.length; i<len; i++){
            description = data[i];
            if(description) {
                records.push(new this.recordType(description));
            }
        }

        return {
            totalRecords: records.length,
            success: true,
            records: records
        };

    }
});
