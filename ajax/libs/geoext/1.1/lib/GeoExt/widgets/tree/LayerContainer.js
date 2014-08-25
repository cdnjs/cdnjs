/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/tree/LayerLoader.js
 */
Ext.namespace("GeoExt.tree");

/** api: (define)
 *  module = GeoExt.tree
 *  class = LayerContainer
 *  base_link = `Ext.tree.AsyncTreeNode <http://dev.sencha.com/deploy/dev/docs/?class=Ext.tree.AsyncTreeNode>`_
 */

/** api: constructor
 *  .. class:: LayerContainer
 * 
 *      A subclass of ``Ext.tree.AsyncTreeNode`` that will collect all layers of an
 *      OpenLayers map. Only layers that have displayInLayerSwitcher set to true
 *      will be included. The childrens' iconCls defaults to
 *      "gx-tree-layer-icon" and this node' text defaults to "Layers".
 *      
 *      Note: if this container is loaded by an ``Ext.tree.TreeLoader``, the
 *      ``applyLoader`` config option of that loader needs to be set to
 *      "false". Also note that the list of available uiProviders will be
 *      taken from the ownerTree if this container's loader is configured
 *      without one.
 * 
 *      To use this node type in ``TreePanel`` config, set nodeType to
 *      "gx_layercontainer".
 */
GeoExt.tree.LayerContainer = Ext.extend(Ext.tree.AsyncTreeNode, {
    
    /** api: config[loader]
     *  :class:`GeoExt.tree.LayerLoader` or ``Object`` The loader to use with
     *  this container. If an ``Object`` is provided, a
     *  :class:`GeoExt.tree.LayerLoader`, configured with the the properties
     *  from the provided object, will be created. 
     */
    
    /** api: config[layerStore]
     *  :class:`GeoExt.data.LayerStore` The layer store containing layers to be
     *  displayed in the container. If loader is not provided or provided as
     *  ``Object``, this property will be set as the store option of the
     *  loader. Otherwise it will be ignored.
     */

    /** private: property[text]
     *  ``String`` The text for this node.
     */
    text: 'Layers',
    
    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        config = Ext.applyIf(config || {}, {
            text: this.text
        });
        this.loader = config.loader instanceof GeoExt.tree.LayerLoader ?
            config.loader :
            new GeoExt.tree.LayerLoader(Ext.applyIf(config.loader || {}, {
                store: config.layerStore
            }));
        
        GeoExt.tree.LayerContainer.superclass.constructor.call(this, config);
    },
    
    /** private: method[recordIndexToNodeIndex]
     *  :param index: ``Number`` The record index in the layer store.
     *  :return: ``Number`` The appropriate child node index for the record.
     */
    recordIndexToNodeIndex: function(index) {
        var store = this.loader.store;
        var count = store.getCount();
        var nodeCount = this.childNodes.length;
        var nodeIndex = -1;
        for(var i=count-1; i>=0; --i) {
            if(this.loader.filter(store.getAt(i)) === true) {
                ++nodeIndex;
                if(index === i || nodeIndex > nodeCount-1) {
                    break;
                }
            }
        }
        return nodeIndex;
    },
    
    /** private: method[destroy]
     */
    destroy: function() {
        delete this.layerStore;
        GeoExt.tree.LayerContainer.superclass.destroy.apply(this, arguments);
    }
});
    
/**
 * NodeType: gx_layercontainer
 */
Ext.tree.TreePanel.nodeTypes.gx_layercontainer = GeoExt.tree.LayerContainer;
