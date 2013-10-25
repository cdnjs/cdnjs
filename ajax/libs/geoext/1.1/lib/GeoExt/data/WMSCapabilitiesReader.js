/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/LayerRecord.js
 * @require OpenLayers/Format/WMSCapabilities.js
 * @require OpenLayers/Format/WMSCapabilities/v1_1_1.js
 * @require OpenLayers/Util.js
 * @require OpenLayers/Layer/WMS.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WMSCapabilitiesReader
 *  base_link = `Ext.data.DataReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataReader>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WMSCapabilitiesReader(meta, recordType)
 *  
 *      :param meta: ``Object`` Reader configuration from which:
 *          ``layerOptions`` is an optional object passed as default options
 *          to the ``OpenLayers.Layer.WMS`` constructor.
 *          ``layerParams`` is an optional set of parameters to pass into the
 *          ``OpenLayers.Layer.WMS`` constructor.
 *      :param recordType: ``Array | Ext.data.Record`` An array of field
 *          configuration objects or a record object.  Default is
 *          :class:`GeoExt.data.LayerRecord` with the following fields:
 *          name, title, abstract, queryable, opaque, noSubsets, cascaded,
 *          fixedWidth, fixedHeight, minScale, maxScale, prefix, formats,
 *          styles, srs, dimensions, bbox, llbbox, attribution, keywords,
 *          identifiers, authorityURLs, metadataURLs, infoFormats.
 *          The type of these fields is the same as for the matching fields in
 *          the object returned from
 *          ``OpenLayers.Format.WMSCapabilities::read()``.
 *   
 *      Data reader class to create an array of
 *      :class:`GeoExt.data.LayerRecord` objects from a WMS GetCapabilities
 *      response.
 */
GeoExt.data.WMSCapabilitiesReader = function(meta, recordType) {
    meta = meta || {};
    if(!meta.format) {
        meta.format = new OpenLayers.Format.WMSCapabilities();
    }
    if(typeof recordType !== "function") {
        recordType = GeoExt.data.LayerRecord.create(
            recordType || meta.fields || [
                {name: "name", type: "string"},
                {name: "title", type: "string"},
                {name: "abstract", type: "string"},
                {name: "queryable", type: "boolean"},
                {name: "opaque", type: "boolean"},
                {name: "noSubsets", type: "boolean"},
                {name: "cascaded", type: "int"},
                {name: "fixedWidth", type: "int"},
                {name: "fixedHeight", type: "int"},
                {name: "minScale", type: "float"},
                {name: "maxScale", type: "float"},
                {name: "prefix", type: "string"},
                {name: "formats"}, // array
                {name: "styles"}, // array
                {name: "srs"}, // object
                {name: "dimensions"}, // object
                {name: "bbox"}, // object
                {name: "llbbox"}, // array
                {name: "attribution"}, // object
                {name: "keywords"}, // array
                {name: "identifiers"}, // object
                {name: "authorityURLs"}, // object
                {name: "metadataURLs"}, // array
                {name: "infoFormats"} // array
            ]
        );
    }
    GeoExt.data.WMSCapabilitiesReader.superclass.constructor.call(
        this, meta, recordType
    );
};

Ext.extend(GeoExt.data.WMSCapabilitiesReader, Ext.data.DataReader, {


    /** api: config[attributionCls]
     *  ``String`` CSS class name for the attribution DOM elements.
     *  Element class names append "-link", "-image", and "-title" as
     *  appropriate.  Default is "gx-attribution".
     */
    attributionCls: "gx-attribution",

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
    
    /** private: method[serviceExceptionFormat]
     *  :param formats: ``Array`` An array of service exception format strings.
     *  :return: ``String`` The (supposedly) best service exception format.
     */
    serviceExceptionFormat: function(formats) {
        if (OpenLayers.Util.indexOf(formats, 
            "application/vnd.ogc.se_inimage")>-1) {
            return "application/vnd.ogc.se_inimage";
        }
        if (OpenLayers.Util.indexOf(formats, 
            "application/vnd.ogc.se_xml")>-1) {
            return "application/vnd.ogc.se_xml";
        }
        return formats[0];
    },
    
    /** private: method[imageFormat]
     *  :param layer: ``Object`` The layer's capabilities object.
     *  :return: ``String`` The (supposedly) best mime type for requesting 
     *      tiles.
     */
    imageFormat: function(layer) {
        var formats = layer.formats;
        if (layer.opaque && 
            OpenLayers.Util.indexOf(formats, "image/jpeg")>-1) {
            return "image/jpeg";
        }
        if (OpenLayers.Util.indexOf(formats, "image/png")>-1) {
            return "image/png";
        }
        if (OpenLayers.Util.indexOf(formats, "image/png; mode=24bit")>-1) {
            return "image/png; mode=24bit";
        }
        if (OpenLayers.Util.indexOf(formats, "image/gif")>-1) {
            return "image/gif";
        }
        return formats[0];
    },

    /** private: method[imageTransparent]
     *  :param layer: ``Object`` The layer's capabilities object.
     *  :return: ``Boolean`` The TRANSPARENT param.
     */
    imageTransparent: function(layer) {
        return layer.opaque == undefined || !layer.opaque;
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
        if(typeof data === "string" || data.nodeType) {
            data = this.meta.format.read(data);
        }
        if (!!data.error) {
            throw new Ext.data.DataReader.Error("invalid-response", data.error);
        }
        var version = data.version;
        var capability = data.capability || {};
        var url = capability.request && capability.request.getmap &&
            capability.request.getmap.href; 
        var layers = capability.layers; 
        var formats = capability.exception ? capability.exception.formats : [];
        var exceptions = this.serviceExceptionFormat(formats);
        var records = [];
        
        if(url && layers) {
            var fields = this.recordType.prototype.fields; 
            var layer, values, options, params, field, v;

            for(var i=0, lenI=layers.length; i<lenI; i++){
                layer = layers[i];
                if(layer.name) {
                    values = {};
                    for(var j=0, lenJ=fields.length; j<lenJ; j++) {
                        field = fields.items[j];
                        v = layer[field.mapping || field.name] ||
                        field.defaultValue;
                        v = field.convert(v);
                        values[field.name] = v;
                    }
                    options = {
                        attribution: layer.attribution ?
                            this.attributionMarkup(layer.attribution) :
                            undefined,
                        minScale: layer.minScale,
                        maxScale: layer.maxScale
                    };
                    if(this.meta.layerOptions) {
                        Ext.apply(options, this.meta.layerOptions);
                    }
                    params = {
                            layers: layer.name,
                            exceptions: exceptions,
                            format: this.imageFormat(layer),
                            transparent: this.imageTransparent(layer),
                            version: version
                    };
                    if (this.meta.layerParams) {
                        Ext.apply(params, this.meta.layerParams);
                    }
                    values.layer = new OpenLayers.Layer.WMS(
                        layer.title || layer.name, url, params, options
                    );
                    records.push(new this.recordType(values, values.layer.id));
                }
            }
        }
        
        return {
            totalRecords: records.length,
            success: true,
            records: records
        };

    },

    /** private: method[attributionMarkup]
     *  :param attribution: ``Object`` The attribution property of the layer
     *      object as parsed from a WMS Capabilities document
     *  :return: ``String`` HTML markup to display attribution
     *      information.
     *  
     *  Generates attribution markup using the Attribution metadata
     *      from WMS Capabilities
     */
    attributionMarkup : function(attribution){
        var markup = [];
        
        if (attribution.logo){
            markup.push("<img class='"+this.attributionCls+"-image' "
                        + "src='" + attribution.logo.href + "' />");
        }
        
        if (attribution.title) {
            markup.push("<span class='"+ this.attributionCls + "-title'>"
                        + attribution.title
                        + "</span>");
        }
        
        if(attribution.href){
            for(var i = 0; i < markup.length; i++){
                markup[i] = "<a class='"
              + this.attributionCls + "-link' "
                    + "href="
                    + attribution.href
                    + ">"
                    + markup[i]
                    + "</a>";
            }
        }

        return markup.join(" ");
    }
});
