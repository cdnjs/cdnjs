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

Ext.namespace("GeoExt.tree");

/** private: constructor
 *  .. class:: LayerNodeUI
 *
 *      Place in a separate file if this should be documented.
 */
GeoExt.tree.LayerNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    
    /** private: method[constructor]
     */
    constructor: function(config) {
        GeoExt.tree.LayerNodeUI.superclass.constructor.apply(this, arguments);
    },
    
    /** private: method[render]
     *  :param bulkRender: ``Boolean``
     */
    render: function(bulkRender) {
        var a = this.node.attributes;
        if (a.checked === undefined) {
            a.checked = this.node.layer.getVisibility();
        }
        GeoExt.tree.LayerNodeUI.superclass.render.apply(this, arguments);
        var cb = this.checkbox;
        if(a.checkedGroup) {
            // replace the checkbox with a radio button
            var radio = Ext.DomHelper.insertAfter(cb,
                ['<input type="radio" name="', a.checkedGroup,
                '_checkbox" class="', cb.className,
                cb.checked ? '" checked="checked"' : '',
                '"></input>'].join(""));
            radio.defaultChecked = cb.defaultChecked;
            Ext.get(cb).remove();
            this.checkbox = radio;
        }
        this.enforceOneVisible();
    },
    
    /** private: method[onClick]
     *  :param e: ``Object``
     */
    onClick: function(e) {
        if(e.getTarget('.x-tree-node-cb', 1)) {
            this.toggleCheck(this.isChecked());
        } else {
            GeoExt.tree.LayerNodeUI.superclass.onClick.apply(this, arguments);
        }
    },
    
    /** private: method[toggleCheck]
     * :param value: ``Boolean``
     */
    toggleCheck: function(value) {
        value = (value === undefined ? !this.isChecked() : value);
        GeoExt.tree.LayerNodeUI.superclass.toggleCheck.call(this, value);
        
        this.enforceOneVisible();
    },
    
    /** private: method[enforceOneVisible]
     * 
     *  Makes sure that only one layer is visible if checkedGroup is set.
     */
    enforceOneVisible: function() {
        var attributes = this.node.attributes;
        var group = attributes.checkedGroup;
        // If we are in the baselayer group, the map will take care of
        // enforcing visibility.
        if(group && group !== "gx_baselayer") {
            var layer = this.node.layer;
            var checkedNodes = this.node.getOwnerTree().getChecked();
            var checkedCount = 0;
            // enforce "not more than one visible"
            Ext.each(checkedNodes, function(n){
                var l = n.layer
                if(!n.hidden && n.attributes.checkedGroup === group) {
                    checkedCount++;
                    if(l != layer && attributes.checked) {
                        l.setVisibility(false);
                    }
                }
            });
            // enforce "at least one visible"
            if(checkedCount === 0 && attributes.checked == false) {
                layer.setVisibility(true);
            }
        }
    },
    
    /** private: method[appendDDGhost]
     *  :param ghostNode ``DOMElement``
     *  
     *  For radio buttons, makes sure that we do not use the option group of
     *  the original, otherwise only the original or the clone can be checked 
     */
    appendDDGhost : function(ghostNode){
        var n = this.elNode.cloneNode(true);
        var radio = Ext.DomQuery.select("input[type='radio']", n);
        Ext.each(radio, function(r) {
            r.name = r.name + "_clone";
        });
        ghostNode.appendChild(n);
    }
});


/** api: (define)
 *  module = GeoExt.tree
 *  class = LayerNode
 *  base_link = `Ext.tree.TreeNode <http://dev.sencha.com/deploy/dev/docs/?class=Ext.tree.TreeNode>`_
 */

/** api: constructor
 *  .. class:: LayerNode(config)
 * 
 *      A subclass of ``Ext.tree.TreeNode`` that is connected to an
 *      ``OpenLayers.Layer`` by setting the node's layer property. Checking or
 *      unchecking the checkbox of this node will directly affect the layer and
 *      vice versa. The default iconCls for this node's icon is
 *      "gx-tree-layer-icon", unless it has children.
 * 
 *      Setting the node's layer property to a layer name instead of an object
 *      will also work. As soon as a layer is found, it will be stored as layer
 *      property in the attributes hash.
 * 
 *      The node's text property defaults to the layer name.
 *      
 *      If the node has a checkedGroup attribute configured, it will be
 *      rendered with a radio button instead of the checkbox. The value of
 *      the checkedGroup attribute is a string, identifying the options group
 *      for the node.
 * 
 *      To use this node type in a ``TreePanel`` config, set ``nodeType`` to
 *      "gx_layer".
 */
GeoExt.tree.LayerNode = Ext.extend(Ext.tree.AsyncTreeNode, {
    
    /** api: config[layer]
     *  ``OpenLayers.Layer or String``
     *  The layer that this layer node will
     *  be bound to, or the name of the layer (has to match the layer's
     *  name property). If a layer name is provided, ``layerStore`` also has
     *  to be provided.
     */

    /** api: property[layer]
     *  ``OpenLayers.Layer``
     *  The layer this node is bound to.
     */
    layer: null,
    
    /** api: config[layerStore]
     *  :class:`GeoExt.data.LayerStore` ``or "auto"``
     *  The layer store containing the layer that this node represents.  If set
     *  to "auto", the node will query the ComponentManager for a
     *  :class:`GeoExt.MapPanel`, take the first one it finds and take its layer
     *  store. This property is only required if ``layer`` is provided as a
     *  string.
     */
    layerStore: null,
    
    /** api: config[checkedGroup]
     *  ``String`` If provided, nodes will be rendered with a radio button
     *  instead of a checkbox. All layers represented by nodes with the same
     *  checkedGroup are considered mutually exclusive - only one can be
     *  visible at a time.
     */
    
    /** api: config[loader]
     *  ``Ext.tree.TreeLoader|Object`` If provided, subnodes will be added to
     *  this LayerNode. Obviously, only loaders that process an
     *  ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord` (like
     *  :class:`GeoExt.tree.LayerParamsLoader`) will actually generate child
     *  nodes here. If provided as ``Object``, a
     *  :class:`GeoExt.tree.LayerParamLoader` instance will be created, with
     *  the provided object as configuration.
     */
    
    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        config.leaf = config.leaf || !(config.children || config.loader);
        
        if(!config.iconCls && !config.children) {
            config.iconCls = "gx-tree-layer-icon";
        }
        if(config.loader && !(config.loader instanceof Ext.tree.TreeLoader)) {
            config.loader = new GeoExt.tree.LayerParamLoader(config.loader);
        }
        
        this.defaultUI = this.defaultUI || GeoExt.tree.LayerNodeUI;
        
        Ext.apply(this, {
            layer: config.layer,
            layerStore: config.layerStore
        });
        if (config.text) {
            this.fixedText = true;
        }
        GeoExt.tree.LayerNode.superclass.constructor.apply(this, arguments);
    },

    /** private: method[render]
     *  :param bulkRender: ``Boolean``
     */
    render: function(bulkRender) {
        var layer = this.layer instanceof OpenLayers.Layer && this.layer;
        if(!layer) {
            // guess the store if not provided
            if(!this.layerStore || this.layerStore == "auto") {
                this.layerStore = GeoExt.MapPanel.guess().layers;
            }
            // now we try to find the layer by its name in the layer store
            var i = this.layerStore.findBy(function(o) {
                return o.get("title") == this.layer;
            }, this);
            if(i != -1) {
                // if we found the layer, we can assign it and everything
                // will be fine
                layer = this.layerStore.getAt(i).getLayer();
            }
        }
        if (!this.rendered || !layer) {
            var ui = this.getUI();
            
            if(layer) {
                this.layer = layer;
                // no DD and radio buttons for base layers
                if(layer.isBaseLayer) {
                    this.draggable = false;
                    Ext.applyIf(this.attributes, {
                        checkedGroup: "gx_baselayer"
                    });
                }
                if(!this.text) {
                    this.text = layer.name;
                }
                
                ui.show();
                this.addVisibilityEventHandlers();
            } else {
                ui.hide();
            }
            
            if(this.layerStore instanceof GeoExt.data.LayerStore) {
                this.addStoreEventHandlers(layer);
            }            
        }
        GeoExt.tree.LayerNode.superclass.render.apply(this, arguments);
    },
    
    /** private: method[addVisibilityHandlers]
     *  Adds handlers that sync the checkbox state with the layer's visibility
     *  state
     */
    addVisibilityEventHandlers: function() {
        this.layer.events.on({
            "visibilitychanged": this.onLayerVisibilityChanged,
            scope: this
        }); 
        this.on({
            "checkchange": this.onCheckChange,
            scope: this
        });
    },
    
    /** private: method[onLayerVisiilityChanged
     *  handler for visibilitychanged events on the layer
     */
    onLayerVisibilityChanged: function() {
        if(!this._visibilityChanging) {
            this.getUI().toggleCheck(this.layer.getVisibility());
        }
    },
    
    /** private: method[onCheckChange]
     *  :param node: ``GeoExt.tree.LayerNode``
     *  :param checked: ``Boolean``
     *
     *  handler for checkchange events 
     */
    onCheckChange: function(node, checked) {
        if(checked != this.layer.getVisibility()) {
            this._visibilityChanging = true;
            var layer = this.layer;
            if(checked && layer.isBaseLayer && layer.map) {
                layer.map.setBaseLayer(layer);
            } else {
                layer.setVisibility(checked);
            }
            delete this._visibilityChanging;
        }
    },
    
    /** private: method[addStoreEventHandlers]
     *  Adds handlers that make sure the node disappeares when the layer is
     *  removed from the store, and appears when it is re-added.
     */
    addStoreEventHandlers: function() {
        this.layerStore.on({
            "add": this.onStoreAdd,
            "remove": this.onStoreRemove,
            "update": this.onStoreUpdate,
            scope: this
        });
    },
    
    /** private: method[onStoreAdd]
     *  :param store: ``Ext.data.Store``
     *  :param records: ``Array(Ext.data.Record)``
     *  :param index: ``Number``
     *
     *  handler for add events on the store 
     */
    onStoreAdd: function(store, records, index) {
        var l;
        for(var i=0; i<records.length; ++i) {
            l = records[i].getLayer();
            if(this.layer == l) {
                this.getUI().show();
                break;
            } else if (this.layer == l.name) {
                // layer is a string, which means the node has not yet
                // been rendered because the layer was not found. But
                // now we have the layer and can render.
                this.render();
                break;
            }
        }
    },
    
    /** private: method[onStoreRemove]
     *  :param store: ``Ext.data.Store``
     *  :param record: ``Ext.data.Record``
     *  :param index: ``Number``
     *
     *  handler for remove events on the store 
     */
    onStoreRemove: function(store, record, index) {
        if(this.layer == record.getLayer()) {
            this.getUI().hide();
        }
    },

    /** private: method[onStoreUpdate]
     *  :param store: ``Ext.data.Store``
     *  :param record: ``Ext.data.Record``
     *  :param operation: ``String``
     *  
     *  Listener for the store's update event.
     */
    onStoreUpdate: function(store, record, operation) {
        var layer = record.getLayer();
        if(!this.fixedText && (this.layer == layer && this.text !== layer.name)) {
            this.setText(layer.name);
        }
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
        var layerStore = this.layerStore;
        if(layerStore) {
            layerStore.un("add", this.onStoreAdd, this);
            layerStore.un("remove", this.onStoreRemove, this);
            layerStore.un("update", this.onStoreUpdate, this);
        }
        delete this.layerStore;
        this.un("checkchange", this.onCheckChange, this);

        GeoExt.tree.LayerNode.superclass.destroy.apply(this, arguments);
    }
});

/**
 * NodeType: gx_layer
 */
Ext.tree.TreePanel.nodeTypes.gx_layer = GeoExt.tree.LayerNode;
