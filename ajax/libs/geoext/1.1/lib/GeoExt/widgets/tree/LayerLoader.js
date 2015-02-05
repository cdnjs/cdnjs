/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/MapPanel.js
 * @include GeoExt/widgets/tree/LayerNode.js
 * @include GeoExt/widgets/tree/LayerContainer.js
 */
Ext.namespace("GeoExt.tree");

/** api: (define)
 *  module = GeoExt.tree
 *  class = LayerLoader
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */

/** api: constructor
 *  .. class:: LayerLoader
 * 
 *      A loader that will load all layers of a :class:`GeoExt.data.LayerStore`
 *      By default, only layers that have displayInLayerSwitcher set to true
 *      will be included. The childrens' iconCls defaults to
 *      "gx-tree-layer-icon".
 */
GeoExt.tree.LayerLoader = function(config) {
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
         *  Triggered after children wer loaded.
         *  
         *  Listener arguments:
         *  
         *  * loader - :class:`GeoExt.tree.LayerLoader` this loader
         *  * node - ``Ex.tree.TreeNode`` the node that this loader is
         *      configured with
         */
        "load"
    );

    GeoExt.tree.LayerLoader.superclass.constructor.call(this);
};

Ext.extend(GeoExt.tree.LayerLoader, Ext.util.Observable, {

    /** api: config[store]
     *  :class:`GeoExt.data.LayerStore`
     *  The layer store containing layers to be added by this loader.
     */
    store: null,
    
    /** api: config[filter]
     *  ``Function``
     *  A function, called in the scope of this loader, with a layer record
     *  as argument. Is expected to return true for layers to be loaded, false
     *  otherwise. By default, the filter checks for displayInLayerSwitcher:
     *  
     *  .. code-block:: javascript
     *  
     *      filter: function(record) {
     *          return record.getLayer().displayInLayerSwitcher == true
     *      }
     */
    filter: function(record) {
        return record.getLayer().displayInLayerSwitcher == true;
    },
    
    /** api: config[baseAttrs]
     *  An object containing attributes to be added to all nodes created by
     *  this loader.
     */
    baseAttrs: null,
    
    /** api: config[uiProviders]
     *  ``Object``
     *  An optional object containing properties which specify custom
     *  GeoExt.tree.LayerNodeUI implementations. If the optional uiProvider
     *  attribute for child nodes is a string rather than a reference to a
     *  TreeNodeUI implementation, then that string value is used as a
     *  property name in the uiProviders object. If not provided, the
     *  uiProviders object will be taken from the ownerTree's loader.
     */
    uiProviders: null,
    
    /** private: method[load]
     *  :param node: ``Ext.tree.TreeNode`` The node to add children to.
     *  :param callback: ``Function``
     */
    load: function(node, callback) {
        if(this.fireEvent("beforeload", this, node)) {
            this.removeStoreHandlers();
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            
            if(!this.uiProviders) {
                this.uiProviders = node.getOwnerTree().getLoader().uiProviders;
            }
    
            if(!this.store) {
                this.store = GeoExt.MapPanel.guess().layers;
            }
            this.store.each(function(record) {
                this.addLayerNode(node, record);
            }, this);
            this.addStoreHandlers(node);
    
            if(typeof callback == "function"){
                callback();
            }
            
            this.fireEvent("load", this, node);
        }
    },
    
    /** private: method[onStoreAdd]
     *  :param store: ``Ext.data.Store``
     *  :param records: ``Array(Ext.data.Record)``
     *  :param index: ``Number``
     *  :param node: ``Ext.tree.TreeNode``
     *  
     *  Listener for the store's add event.
     */
    onStoreAdd: function(store, records, index, node) {
        if(!this._reordering) {
            var nodeIndex = node.recordIndexToNodeIndex(index+records.length-1);
            for(var i=0; i<records.length; ++i) {
                this.addLayerNode(node, records[i], nodeIndex);
            }
        }
    },
    
    /** private: method[onStoreRemove]
     *  :param store: ``Ext.data.Store``
     *  :param record: ``Ext.data.Record``
     *  :param index: ``Number``
     *  :param node: ``Ext.tree.TreeNode``
     *  
     *  Listener for the store's remove event.
     */
    onStoreRemove: function(store, record, index, node) {
        if(!this._reordering) {
            this.removeLayerNode(node, record);
        }
    },

    /** private: method[addLayerNode]
     *  :param node: ``Ext.tree.TreeNode`` The node that the layer node will
     *      be added to as child.
     *  :param layerRecord: ``Ext.data.Record`` The layer record containing the
     *      layer to be added.
     *  :param index: ``Number`` Optional index for the new layer.  Default is 0.
     *  
     *  Adds a child node representing a layer of the map
     */
    addLayerNode: function(node, layerRecord, index) {
        index = index || 0;
        if (this.filter(layerRecord) === true) {
            var child = this.createNode({
                nodeType: 'gx_layer',
                layer: layerRecord.getLayer(),
                layerStore: this.store
            });
            var sibling = node.item(index);
            if(sibling) {
                node.insertBefore(child, sibling);
            } else {
                node.appendChild(child);
            }
            child.on("move", this.onChildMove, this);
        }
    },

    /** private: method[removeLayerNode]
     *  :param node: ``Ext.tree.TreeNode`` The node that the layer node will
     *      be removed from as child.
     *  :param layerRecord: ``Ext.data.Record`` The layer record containing the
     *      layer to be removed.
     * 
     *  Removes a child node representing a layer of the map
     */
    removeLayerNode: function(node, layerRecord) {
        if (this.filter(layerRecord) === true) {
            var child = node.findChildBy(function(node) {
                return node.layer == layerRecord.getLayer();
            });
            if(child) {
                child.un("move", this.onChildMove, this);
                child.remove();
                node.reload();
            }
        }
    },
    
    /** private: method[onChildMove]
     *  :param tree: ``Ext.data.Tree``
     *  :param node: ``Ext.tree.TreeNode``
     *  :param oldParent: ``Ext.tree.TreeNode``
     *  :param newParent: ``Ext.tree.TreeNode``
     *  :param index: ``Number``
     *  
     *  Listener for child node "move" events.  This updates the order of
     *  records in the store based on new node order if the node has not
     *  changed parents.
     */
    onChildMove: function(tree, node, oldParent, newParent, index) {
        this._reordering = true;
        // remove the record and re-insert it at the correct index
        var record = this.store.getByLayer(node.layer);

        if(newParent instanceof GeoExt.tree.LayerContainer && 
                                    this.store === newParent.loader.store) {
            newParent.loader._reordering = true;
            this.store.remove(record);
            var newRecordIndex;
            if(newParent.childNodes.length > 1) {
                // find index by neighboring node in the same container
                var searchIndex = (index === 0) ? index + 1 : index - 1;
                newRecordIndex = this.store.findBy(function(r) {
                    return newParent.childNodes[searchIndex].layer === r.getLayer();
                });
                index === 0 && newRecordIndex++;
            } else if(oldParent.parentNode === newParent.parentNode){
                // find index by last node of a container above
                var prev = newParent;
                do {
                    prev = prev.previousSibling;
                } while (prev && !(prev instanceof GeoExt.tree.LayerContainer && prev.lastChild));
                if(prev) {
                    newRecordIndex = this.store.findBy(function(r) {
                        return prev.lastChild.layer === r.getLayer();
                    });
                } else {
                    // find indext by first node of a container below
                    var next = newParent;
                    do {
                        next = next.nextSibling;
                    } while (next && !(next instanceof GeoExt.tree.LayerContainer && next.firstChild));
                    if(next) {
                        newRecordIndex = this.store.findBy(function(r) {
                            return next.firstChild.layer === r.getLayer();
                        });
                    }
                    newRecordIndex++;
                }
            }
            if(newRecordIndex !== undefined) {
                this.store.insert(newRecordIndex, [record]);
                window.setTimeout(function() {
                    newParent.reload();
                    oldParent.reload();
                });
            } else {
                this.store.insert(oldRecordIndex, [record]);
            }
            delete newParent.loader._reordering;
        }
        delete this._reordering;
    },
    
    /** private: method[addStoreHandlers]
     *  :param node: :class:`GeoExt.tree.LayerNode`
     */
    addStoreHandlers: function(node) {
        if(!this._storeHandlers) {
            this._storeHandlers = {
                "add": this.onStoreAdd.createDelegate(this, [node], true),
                "remove": this.onStoreRemove.createDelegate(this, [node], true)
            };
            for(var evt in this._storeHandlers) {
                this.store.on(evt, this._storeHandlers[evt], this);
            }
        }
    },
    
    /** private: method[removeStoreHandlers]
     */
    removeStoreHandlers: function() {
        if(this._storeHandlers) {
            for(var evt in this._storeHandlers) {
                this.store.un(evt, this._storeHandlers[evt], this);
            }
            delete this._storeHandlers;
        }
    },

    /** api: method[createNode]
     *  :param attr: ``Object`` attributes for the new node
     *
     *  Override this function for custom TreeNode node implementation, or to
     *  modify the attributes at creation time.
     */
    createNode: function(attr) {
        if(this.baseAttrs){
            Ext.apply(attr, this.baseAttrs);
        }
        if(typeof attr.uiProvider == 'string'){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        attr.nodeType = attr.nodeType || "gx_layer";

        return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
    },

    /** private: method[destroy]
     */
    destroy: function() {
        this.removeStoreHandlers();
    }
});
