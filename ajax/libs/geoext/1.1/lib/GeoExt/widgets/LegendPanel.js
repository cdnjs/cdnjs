/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/MapPanel.js
 * @include GeoExt/widgets/LayerLegend.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = LegendPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Panel>`_
 */

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: LegendPanel(config)
 *
 *  A panel showing legends of all layers in a layer store.
 *  Depending on the layer type, a legend renderer will be chosen.
 *
 *  The LegendPanel will include legends for all the layers in the
 *  ``layerStore`` it is configured with, unless the layer is configured with
 *  ``displayInLayerSwitcher: false``, or a layer record has a
 *  ``hideInLegend`` field with a value of ``true``. Additional filtering can
 *  be done by configuring a ``filter`` on the LegendPanel.
 */
GeoExt.LegendPanel = Ext.extend(Ext.Panel, {

    /** api: config[dynamic]
     *  ``Boolean``
     *  If false the LegendPanel will not listen to the add, remove and change 
     *  events of the LayerStore. So it will load with the initial state of
     *  the LayerStore and not change anymore. 
     */
    dynamic: true,
    
    /** api: config[layerStore]
     *  ``GeoExt.data.LayerStore``
     *  The layer store containing layers to be displayed in the legend 
     *  container. If not provided it will be taken from the MapPanel.
     */
    layerStore: null,
    
    /** api: config[preferredTypes]
     *  ``Array(String)`` An array of preferred legend types.
     */
    
    /** private: property[preferredTypes]
     */
    preferredTypes: null,

    /** api: config[filter]
     *  ``Function``
     *  A function, called in the scope of the legend panel, with a layer record
     *  as argument. Is expected to return true for layers to be displayed, false
     *  otherwise. By default, all layers will be displayed.
     *
     *  .. code-block:: javascript
     *
     *      filter: function(record) {
     *          return record.getLayer().isBaseLayer;
     *      }
     */
    filter: function(record) {
        return true;
    },

    /** private: method[initComponent]
     *  Initializes the legend panel.
     */
    initComponent: function() {
        GeoExt.LegendPanel.superclass.initComponent.call(this);
    },
    
    /** private: method[onRender]
     *  Private method called when the legend panel is being rendered.
     */
    onRender: function() {
        GeoExt.LegendPanel.superclass.onRender.apply(this, arguments);
        if(!this.layerStore) {
            this.layerStore = GeoExt.MapPanel.guess().layers;
        }
        this.layerStore.each(function(record) {
                this.addLegend(record);
            }, this);
        if (this.dynamic) {
            this.layerStore.on({
                "add": this.onStoreAdd,
                "remove": this.onStoreRemove,
                "clear": this.onStoreClear,
                scope: this
            });
        }
    },

    /** private: method[recordIndexToPanelIndex]
     *  Private method to get the panel index for a layer represented by a
     *  record.
     *
     *  :param index ``Integer`` The index of the record in the store.
     *
     *  :return: ``Integer`` The index of the sub panel in this panel.
     */
    recordIndexToPanelIndex: function(index) {
        var store = this.layerStore;
        var count = store.getCount();
        var panelIndex = -1;
        var legendCount = this.items ? this.items.length : 0;
        var record, layer;
        for(var i=count-1; i>=0; --i) {
            record = store.getAt(i);
            layer = record.getLayer();
            var types = GeoExt.LayerLegend.getTypes(record);
            if(layer.displayInLayerSwitcher && types.length > 0 &&
                (store.getAt(i).get("hideInLegend") !== true)) {
                    ++panelIndex;
                    if(index === i || panelIndex > legendCount-1) {
                        break;
                    }
            }
        }
        return panelIndex;
    },
    
    /** private: method[getIdForLayer]
     *  :arg layer: ``OpenLayers.Layer``
     *  :returns: ``String``
     *
     *  Generate an element id that is unique to this panel/layer combo.
     */
    getIdForLayer: function(layer) {
        return this.id + "-" + layer.id;
    },

    /** private: method[onStoreAdd]
     *  Private method called when a layer is added to the store.
     *
     *  :param store: ``Ext.data.Store`` The store to which the record(s) was 
     *      added.
     *  :param record: ``Ext.data.Record`` The record object(s) corresponding
     *      to the added layers.
     *  :param index: ``Integer`` The index of the inserted record.
     */
    onStoreAdd: function(store, records, index) {
        var panelIndex = this.recordIndexToPanelIndex(index+records.length-1);
        for (var i=0, len=records.length; i<len; i++) {
            this.addLegend(records[i], panelIndex);
        }
        this.doLayout();
    },

    /** private: method[onStoreRemove]
     *  Private method called when a layer is removed from the store.
     *
     *  :param store: ``Ext.data.Store`` The store from which the record(s) was
     *      removed.
     *  :param record: ``Ext.data.Record`` The record object(s) corresponding
     *      to the removed layers.
     *  :param index: ``Integer`` The index of the removed record.
     */
    onStoreRemove: function(store, record, index) {
        this.removeLegend(record);            
    },

    /** private: method[removeLegend]
     *  Remove the legend of a layer.
     *  :param record: ``Ext.data.Record`` The record object from the layer 
     *      store to remove.
     */
    removeLegend: function(record) {
        if (this.items) {
            var legend = this.getComponent(this.getIdForLayer(record.getLayer()));
            if (legend) {
                this.remove(legend, true);
                this.doLayout();
            }
        }
    },

    /** private: method[onStoreClear]
     *  Private method called when a layer store is cleared.
     *
     *  :param store: ``Ext.data.Store`` The store from which was cleared.
     */
    onStoreClear: function(store) {
        this.removeAllLegends();
    },

    /** private: method[removeAllLegends]
     *  Remove all legends from this legend panel.
     */
    removeAllLegends: function() {
        this.removeAll(true);
        this.doLayout();
    },

    /** private: method[addLegend]
     *  Add a legend for the layer.
     *
     *  :param record: ``Ext.data.Record`` The record object from the layer 
     *      store.
     *  :param index: ``Integer`` The position at which to add the legend.
     */
    addLegend: function(record, index) {
        if (this.filter(record) === true) {
            var layer = record.getLayer();
            index = index || 0;
            var legend;
            var types = GeoExt.LayerLegend.getTypes(record,
                this.preferredTypes);
            if(layer.displayInLayerSwitcher && !record.get('hideInLegend') &&
                types.length > 0) {
                this.insert(index, {
                    xtype: types[0],
                    id: this.getIdForLayer(layer),
                    layerRecord: record,
                    hidden: !((!layer.map && layer.visibility) ||
                        (layer.getVisibility() && layer.calculateInRange()))
                });
            }
        }
    },

    /** private: method[onDestroy]
     *  Private method called during the destroy sequence.
     */
    onDestroy: function() {
        if(this.layerStore) {
            this.layerStore.un("add", this.onStoreAdd, this);
            this.layerStore.un("remove", this.onStoreRemove, this);
            this.layerStore.un("clear", this.onStoreClear, this);
        }
        GeoExt.LegendPanel.superclass.onDestroy.apply(this, arguments);
    }
});

/** api: xtype = gx_legendpanel */
Ext.reg('gx_legendpanel', GeoExt.LegendPanel);
