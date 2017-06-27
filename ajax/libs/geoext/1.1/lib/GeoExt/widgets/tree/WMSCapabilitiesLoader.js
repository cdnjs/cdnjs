/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt.tree
 *  class = WMSCapabilitiesLoader
 *  base_link = `Ext.tree.TreeLoader <http://www.dev.sencha.com/deploy/dev/docs/?class=Ext.tree.TreeLoader>`_
 */

/**
 * @require OpenLayers/Format/WMSCapabilities.js
 * @require OpenLayers/Format/WMSCapabilities/v1_1_1.js
 * @require OpenLayers/Layer/WMS.js
 * @require OpenLayers/BaseTypes/Class.js
 */

Ext.namespace("GeoExt.tree");

/** api: constructor
 *  .. class:: WMSCapabilitiesLoader
 *
 *      A loader that will load create a tree of all layers of a Web Map
 *      Service (WMS), maintaining its tree structure. Nodes created by this
 *      loader are instances of ``Ext.tree.TreeNode``. If the WMS Capabilities
 *      advertise a name for a layer, an OpenLayers.Layer.WMS instance will
 *      be set on the node in its ``layer`` attribute.
 */
GeoExt.tree.WMSCapabilitiesLoader = function(config) {
    Ext.apply(this, config);
    GeoExt.tree.WMSCapabilitiesLoader.superclass.constructor.call(this);
};

Ext.extend(GeoExt.tree.WMSCapabilitiesLoader, Ext.tree.TreeLoader, {

    /** api: config[url]
     *  ``String``
     *  The online resource of the Web Map Service.
     */
    url: null,

    /** api: config[layerOptions]
     *  ``Object``
     *  Optional options to set on the WMS layers which will be created by
     *  this loader.
     */
    layerOptions: null,

    /** api: config[layerParams]
     *  ``Object``
     *  Optional parameters to set on the WMS layers which will be created by
     *  this loader.
     */
    layerParams: null,

    /** private: property[requestMethod]
     *  ``String`` WMS GetCapabilities request needs to be done using HTTP GET
     */
    requestMethod: 'GET',

    /** private: method[getParams]
     *  Private getParams override.
     */
    getParams: function(node) {
        return {'service': 'WMS', 'request': 'GetCapabilities'};
    },

    /** private: method[processResponse]
     *  :param response: ``Object`` The XHR object
     *  :param node: ``Ext.tree.TreeNode``
     *  :param callback: ``Function``
     *  :param scope: ``Object``
     *
     *  Private processResponse override.
     */
    processResponse : function(response, node, callback, scope){
        var capabilities = new OpenLayers.Format.WMSCapabilities().read(
            response.responseXML || response.responseText);
        capabilities.capability && this.processLayer(capabilities.capability,
            capabilities.capability.request.getmap.href, node);
        if (typeof callback == "function") {
            callback.apply(scope || node, [node]);
        }
    },

    /** private: method[createWMSLayer]
     *  :param layer: ``Object`` The layer object from the WMS GetCapabilities
     *  parser
     *  :param url: ``String`` The online resource of the WMS
     *  :return: ``OpenLayers.Layer.WMS`` or ``null`` The WMS layer created or
     *  null.
     *
     *  Create a WMS layer which will be attached as an attribute to the
     *  node.
     */
    createWMSLayer: function(layer, url) {
        if (layer.name) {
            return new OpenLayers.Layer.WMS( layer.title, url,
                OpenLayers.Util.extend({formats: layer.formats[0], 
                    layers: layer.name}, this.layerParams),
                OpenLayers.Util.extend({minScale: layer.minScale,
                    queryable: layer.queryable, maxScale: layer.maxScale,
                    metadata: layer
                }, this.layerOptions));
        } else {
            return null;
        }
    },

    /** private: method[processLayer]
     *  :param layer: ``Object`` The layer object from the WMS GetCapabilities
     *  parser
     *  :param url: ``String`` The online resource of the WMS
     *  :param node: ``Ext.tree.TreeNode``
     *
     *  Recursive function to create the tree nodes for the layer structure
     *  of a WMS GetCapabilities response.
     */
    processLayer: function(layer, url, node) {
        Ext.each(layer.nestedLayers, function(el) {
            var n = this.createNode({text: el.title || el.name, 
                // use nodeType 'node' so no AsyncTreeNodes are created
                nodeType: 'node',
                layer: this.createWMSLayer(el, url),
                leaf: (el.nestedLayers.length === 0)});
            if(n){
                node.appendChild(n);
            }
            if (el.nestedLayers) {
                this.processLayer(el, url, n);
            }
        }, this);
    }

});
