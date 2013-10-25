/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/*
 * @include GeoExt/widgets/MapPanel.js
 * @require OpenLayers/Layer.js
 */

/** api: (define)
 *  module = GeoExt.tree
 *  class = LayerParamNode
 *  base_link = `Ext.tree.TreeNode <http://dev.sencha.com/deploy/dev/docs/?class=Ext.tree.TreeNode>`_
 */
Ext.namespace("GeoExt.tree");

/** api: constructor
 *  .. class:: LayerParamNode
 * 
 *  A subclass of ``Ext.tree.TreeNode`` that represents a value of a list of
 *  values provided as one of an ``OpenLayers.Layer.HTTPRequest``'s params.
 *  The default iconCls for this node's icon is "gx-tree-layerparam-icon".
 *  
 *  To use this node type in a ``TreePanel`` config, set ``nodeType`` to
 *  "gx_layerparam".
 */
GeoExt.tree.LayerParamNode = Ext.extend(Ext.tree.TreeNode, {
    
    /** api: config[layer]
     *  ``OpenLayers.Layer.HTTPRequest|String`` The layer that this node
     *  represents a subnode of. If provided as string, the string has to
     *  match the title of one of the records in the ``layerStore``.
     */
    
    /** private: property[layer]
     *  ``OpenLayers.Layer.HTTPRequest``
     */
    layer: null,
    
    /** api: config[layerStore]
     *  :class:`GeoExt.data.LayerStore` Only used if layer is provided as
     *  string. The store where we can find the layer. If not provided, the
     *  store of a map panel found by ``GeoExt.MapPanel::guess`` will be used.
     */
    
    /** api: config[param]
     *  ``String`` Key for a param (key-value pair in the params object of the
     *  layer) that this node represents an item of. The value can either be an
     *  ``Array`` or a ``String``, delimited by the character (or string)
     *  provided as ``delimiter`` config option.
     */
    
    /** private: property[param]
     *  ``String``
     */
    param: null,
    
    /** api: config[item]
     *  ``String`` The param's value's item that this node represents.
     */
    
    /** private: property[item]
     *  ``String``
     */
    item: null,
    
    /** api: config[delimiter]
     *  ``String`` Delimiter of the ``param``'s value's items. Default is
     *  ``,`` (comma). If the ``param``'s value is an array, this property
     *  has no effect.
     */
    
    /** private: property[delimiter]
     *  ``String``
     */
    delimiter: null,
    
    /** private: property[allItems]
     *  ``Array`` All items in the param value.
     */
    allItems: null,
    
    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(attributes) {
        var config = attributes || {};
        config.iconCls = config.iconCls || "gx-tree-layerparam-icon";
        config.text = config.text || config.item;
        
        this.param = config.param;
        this.item = config.item;
        this.delimiter = config.delimiter || ",";
        this.allItems = config.allItems;
                
        GeoExt.tree.LayerParamNode.superclass.constructor.apply(this, arguments);

        this.getLayer();

        if(this.layer) {

            // read items from layer if allItems isn't set
            // in the attributes
            if(!this.allItems) {
                this.allItems = this.getItemsFromLayer();
            }

            // if the "checked" attribute isn't set we derive
            // it from what we have in the layer. Else, we need
            // to update the layer param based on the value of
            // the "checked" attribute
            if(this.attributes.checked == null) {
                this.attributes.checked =
                    this.layer.getVisibility() &&
                    this.getItemsFromLayer().indexOf(this.item) >= 0;
            } else {
                this.onCheckChange(this, this.attributes.checked);
            }

            this.layer.events.on({
                "visibilitychanged": this.onLayerVisibilityChanged,
                scope: this
            });

            this.on({
                "checkchange": this.onCheckChange,
                scope: this
            });
        }
    },
    
    /** private: method[getLayer]
     *  :return: ``OpenLayers.Layer.HTTPRequest`` the layer
     *  
     *  Sets this.layer and returns the layer.
     */
    getLayer: function() {
        if(!this.layer) {
            var layer = this.attributes.layer;
            if(typeof layer == "string") {
                var store = this.attributes.layerStore ||
                    GeoExt.MapPanel.guess().layers;
                var i = store.findBy(function(o) {
                    return o.get("title") == layer;
                });
                layer = i != -1 ? store.getAt(i).getLayer() : null;
            }
            this.layer = layer;
        }
        return this.layer;
    },
    
    /** private: method[getItemsFromLayer]
     *  :return: ``Array`` the items of this node's layer's param
     */
    getItemsFromLayer: function() {
        var paramValue = this.layer.params[this.param];
        return paramValue instanceof Array ?
            paramValue :
            (paramValue ? paramValue.split(this.delimiter) : []);
    },
    
    /** private: method[createParams]
     *  :param items: ``Array``
     *  :return: ``Object`` The params object to pass to mergeNewParams
     */
    createParams: function(items) {
        var params = {};
        params[this.param] = this.layer.params[this.param] instanceof Array ?
            items :
            items.join(this.delimiter);
        return params;
    },

    /** private: method[onLayerVisibilityChanged]
     *  Handler for visibilitychanged events on the layer.
     */
    onLayerVisibilityChanged: function() {
        if(this.getItemsFromLayer().length === 0) {
            this.layer.mergeNewParams(this.createParams(this.allItems));
        }
        var visible = this.layer.getVisibility();
        if(visible && this.getItemsFromLayer().indexOf(this.item) !== -1) {
            this.getUI().toggleCheck(true);
        }
        if(!visible) {
            this.layer.mergeNewParams(this.createParams([]));
            this.getUI().toggleCheck(false);
        }
    },
    
    /** private: method[onCheckChange]
     *  :param node: :class:`GeoExt.tree.LayerParamNode``
     *  :param checked: ``Boolean``
     *
     *  Handler for checkchange events.
     */
    onCheckChange: function(node, checked) {
        var layer = this.layer;

        var newItems = [];
        var curItems = this.getItemsFromLayer();
        // if the layer is invisible, and a subnode is checked for the first
        // time, we need to pretend that no subnode param items are set.
        if(checked === true && layer.getVisibility() === false &&
                                curItems.length === this.allItems.length) {
            curItems = [];
            
        }
        Ext.each(this.allItems, function(item) {
            if((item !== this.item && curItems.indexOf(item) !== -1) ||
                            (checked === true && item === this.item)) {
                newItems.push(item);
            }
        }, this);
        
        var visible = (newItems.length > 0);
        // if there is something to display, we want to update the params
        // before the layer is turned on
        visible && layer.mergeNewParams(this.createParams(newItems));
        if(visible !== layer.getVisibility()) {
            layer.setVisibility(visible);
        }
        // if there is nothing to display, we want to update the params
        // when the layer is turned off, so we don't fire illegal requests
        // (i.e. param value being empty)
        (!visible) && layer.mergeNewParams(this.createParams([]));
    },
    
    /** private: method[destroy]
     */
    destroy: function() {
        var layer = this.layer;
        if (layer instanceof OpenLayers.Layer) {
            layer.events.un({
                "visibilitychanged": this.onLayerVisibilityChanged,
                scope: this
            });
        }
        delete this.layer;
        
        this.un("checkchange", this.onCheckChange, this);

        GeoExt.tree.LayerParamNode.superclass.destroy.apply(this, arguments);
    }
});

/**
 * NodeType: gx_layerparam
 */
Ext.tree.TreePanel.nodeTypes.gx_layerparam = GeoExt.tree.LayerParamNode;
