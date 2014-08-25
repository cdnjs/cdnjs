/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/*
 * @require OpenLayers/Layer/HTTPRequest.js
 */

/** api: (define)
 *  module = GeoExt.tree
 *  class = LayerParamLoader
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */
Ext.namespace("GeoExt.tree");

/** api: constructor
 *  .. class:: LayerParamLoader
 * 
 *      A loader that creates children from its node's layer
 *      (``OpenLayers.Layer.HTTPRequest``) by items in one of the values in
 *      the layer's params object.
 */
GeoExt.tree.LayerParamLoader = function(config) {
    Ext.apply(this, config);
    this.addEvents(
    
        /** api: event[beforeload]
         *  Triggered before loading children. Return false to avoid
         *  loading children.
         *  
         *  Listener arguments:
         *  
         *  * loader - :class:`GeoExt.tree.LayerLoader` this loader
         *  * node - ``Ex.tree.TreeNode`` the node that this loader is
         *      configured with
         */
        "beforeload",
        
        /** api: event[load]
         *  Triggered after children were loaded.
         *  
         *  Listener arguments:
         *  
         *  * loader - :class:`GeoExt.tree.LayerLoader` this loader
         *  * node - ``Ex.tree.TreeNode`` the node that this loader is
         *      configured with
         */
        "load"
    );

    GeoExt.tree.LayerParamLoader.superclass.constructor.call(this);
};

Ext.extend(GeoExt.tree.LayerParamLoader, Ext.util.Observable, {
    
    /** api: config[param]
     *  ``String`` Key for a param (key-value pair in the params object of the
     *  layer) that this loader uses to create childnodes from its items. The
     *  value can either be an ``Array`` or a ``String``, delimited by the
     *  character (or string) provided as ``delimiter`` config option.
     */
    
    /** private: property[param]
     *  ``String``
     */
    param: null,
    
    /** api: config[delimiter]
     *  ``String`` Delimiter of the ``param``'s value's items. Default is
     *  ``,`` (comma). If the ``param``'s value is an array, this property has
     *  no effect.
     */
    
    /** private: property[delimiter]
     *  ``String``
     */
    delimiter: ",",

    /** private: method[load]
     *  :param node: ``Ext.tree.TreeNode`` The node to add children to.
     *  :param callback: ``Function``
     */
    load: function(node, callback) {
        if(this.fireEvent("beforeload", this, node)) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            
            var paramValue =
                (node.layer instanceof OpenLayers.Layer.HTTPRequest) &&
                node.layer.params[this.param];
            if(paramValue) {
                var items = (paramValue instanceof Array) ?
                    paramValue.slice() :
                    paramValue.split(this.delimiter);

                Ext.each(items, function(item, index, allItems) {
                    this.addParamNode(item, allItems, node);
                }, this);
            }
    
            if(typeof callback == "function"){
                callback();
            }
            
            this.fireEvent("load", this, node);
        }
    },
    
    /** private: method[addParamNode]
     *  :param paramItem: ``String`` The param item that the child node will
     *      represent.
     *  :param allParamItems: ``Array`` The full list of param items.
     *  :param node: :class:`GeoExt.tree.LayerNode`` The node that the param
     *      node will be added to as child.
     *  
     *  Adds a child node representing a param value of the layer
     */
    addParamNode: function(paramItem, allParamItems, node) {
        var child = this.createNode({
            layer: node.layer,
            param: this.param,
            item: paramItem,
            allItems: allParamItems,
            delimiter: this.delimiter
        });
        var sibling = node.item(0);
        if(sibling) {
            node.insertBefore(child, sibling);
        } else {
            node.appendChild(child);
        }
    },

    /** api: method[createNode]
     *  :param attr: ``Object`` attributes for the new node
     *
     *  Override this function for custom TreeNode node implementation, or to
     *  modify the attributes at creation time.
     */
    createNode: function(attr){
        if(this.baseAttrs){
            Ext.apply(attr, this.baseAttrs);
        }
        if(typeof attr.uiProvider == 'string'){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        attr.nodeType = attr.nodeType || "gx_layerparam";

        return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
    }
});
