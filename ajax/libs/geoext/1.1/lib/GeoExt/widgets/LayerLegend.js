/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt
 *  class = LayerLegend
 *  base_link = `Ext.Container <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Container>`_
 */

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: LayerLegend(config)
 *
 *      Base class for components of :class:`GeoExt.LegendPanel`.
 */
GeoExt.LayerLegend = Ext.extend(Ext.Container, {

    /** api: config[layerRecord]
     *  :class:`GeoExt.data.LayerRecord`  The layer record for the legend
     */
    layerRecord: null,

    /** api: config[showTitle]
     *  ``Boolean``
     *  Whether or not to show the title of a layer. This can be overridden
     *  on the LayerStore record using the hideTitle property.
     */
    showTitle: true,
    
    /** api: config[legendTitle]
     *  ``String``
     *  Optional title to be displayed instead of the layer title.  If this is
     *  set, the value of ``showTitle`` will be ignored (assumed to be true).
     */
    legendTitle: null,

    /** api: config[labelCls]
     *  ``String``
     *  Optional css class to use for the layer title labels.
     */
    labelCls: null,
    
    /** private: property[layerStore]
     *  :class:`GeoExt.data.LayerStore`
     */
    layerStore: null,

    /** private: method[initComponent]
     */
    initComponent: function() {
        GeoExt.LayerLegend.superclass.initComponent.call(this);
        this.autoEl = {};
        this.add({
            xtype: "label",
            html: this.getLayerTitle(this.layerRecord),
            cls: 'x-form-item x-form-item-label' +
                (this.labelCls ? ' ' + this.labelCls : '')
        });
        if (this.layerRecord && this.layerRecord.store) {
            this.layerStore = this.layerRecord.store;
            this.layerStore.on("update", this.onStoreUpdate, this);
            this.layerStore.on("add", this.onStoreAdd, this);
            this.layerStore.on("remove", this.onStoreRemove, this);
        }
    },

    /** private: method[getText]
     *  :returns: ``String``
     *
     *  Get the label text of the legend.
     */
    getLabel: function() {
        var label = this.items.get(0);
        return label.rendered ? label.el.dom.innerHTML : label.html;
    },

    /** private: method[onStoreRemove]
     *  Handler for remove event of the layerStore
     *
     *  :param store: ``Ext.data.Store`` The store from which the record was
     *      removed.
     *  :param record: ``Ext.data.Record`` The record object corresponding
     *      to the removed layer.
     *  :param index: ``Integer`` The index in the store at which the record
     *      was remvoed.
     */
    onStoreRemove: function(store, record, index) {
        // to be implemented by subclasses if needed
    },

    /** private: method[onStoreAdd]
     *  Handler for add event of the layerStore
     *
     *  :param store: ``Ext.data.Store`` The store to which the record was
     *      added.
     *  :param record: ``Ext.data.Record`` The record object corresponding
     *      to the added layer.
     *  :param index: ``Integer`` The index in the store at which the record
     *      was added.
     */
    onStoreAdd: function(store, record, index) {
        // to be implemented by subclasses if needed
    },

    /** private: method[onStoreUpdate]
     *  Update a the legend. Gets called when the store fires the update event.
     *  This usually means the visibility of the layer, its style or title
     *  has changed.
     *
     *  :param store: ``Ext.data.Store`` The store in which the record was
     *      changed.
     *  :param record: ``Ext.data.Record`` The record object corresponding
     *      to the updated layer.
     *  :param operation: ``String`` The type of operation.
     */
    onStoreUpdate: function(store, record, operation) {
        // if we don't have items, we are already awaiting garbage
        // collection after being removed by LegendPanel::removeLegend, and
        // updating will cause errors
        if (record === this.layerRecord && this.items.getCount() > 0) {
            var layer = record.getLayer();
            this.setVisible(layer.getVisibility() &&
                layer.calculateInRange() && layer.displayInLayerSwitcher &&
                !record.get('hideInLegend'));
            this.update();
        }
    },

    /** private: method[update]
     *  Updates the legend.
     */
    update: function() {
        var title = this.getLayerTitle(this.layerRecord);
        var item = this.items.get(0);
        if (item instanceof Ext.form.Label && this.getLabel() !== title) {
            // we need to update the title
            item.setText(title, false);
        }
    },
    
    /** private: method[getLayerTitle]
     *  :arg record: :class:GeoExt.data.LayerRecord
     *  :returns: ``String``
     *
     *  Get a title for the layer.  If the record doesn't have a title, use the 
     *  name.
     */
    getLayerTitle: function(record) {
        var title = this.legendTitle || "";
        if (this.showTitle && !title) {
            if (record && !record.get("hideTitle")) {
                title = record.get("title") || 
                    record.get("name") || 
                    record.getLayer().name || "";
            }
        }
        return title;
    },
    
    /** private: method[beforeDestroy]
     */
    beforeDestroy: function() {
        if (this.layerStore) {
            this.layerStore.un("update", this.onStoreUpdate, this);
            this.layerStore.un("remove", this.onStoreRemove, this);
            this.layerStore.un("add", this.onStoreAdd, this);
        }
        GeoExt.LayerLegend.superclass.beforeDestroy.apply(this, arguments);
    },

    /** private: method[onDestroy]
     */
    onDestroy: function() {
        this.layerRecord = null;
        this.layerStore = null;
        GeoExt.LayerLegend.superclass.onDestroy.apply(this, arguments);
    }

});

/** class: method[getTypes]
 *  :param layerRecord: class:`GeoExt.data.LayerRecord` A layer record to get
 *      legend types for. If not provided, all registered types will be
 *      returned.
 *  :param preferredTypes: ``Array(String)`` Types that should be considered.
 *      first. If not provided, all registered legend types will be returned
 *      in the order of their score for support of the provided layerRecord.
 *  :return: ``Array(String)`` xtypes of legend types that can be used with
 *      the provided ``layerRecord``.
 *  
 *  Gets an array of legend xtypes that support the provided layer record,
 *  with optionally provided preferred types listed first.
 */
GeoExt.LayerLegend.getTypes = function(layerRecord, preferredTypes) {
    var types = (preferredTypes || []).concat(),
        scoredTypes = [], score, type;
    for (type in GeoExt.LayerLegend.types) {
        score = GeoExt.LayerLegend.types[type].supports(layerRecord);
        if(score > 0) {
            // add to scoredTypes if not preferred
            if (types.indexOf(type) == -1) {
                scoredTypes.push({
                    type: type,
                    score: score
                });
            }
        } else {
            // preferred, but not supported
            types.remove(type);
        }
    }
    scoredTypes.sort(function(a, b) {
        return a.score < b.score ? 1 : (a.score == b.score ? 0 : -1);
    });
    var len = scoredTypes.length, goodTypes = new Array(len);
    for (var i=0; i<len; ++i) {
        goodTypes[i] = scoredTypes[i].type;
    }
    // take the remaining preferred types, and add other good types 
    return types.concat(goodTypes);
};
    
/** private: method[supports]
 *  :param layerRecord: :class:`GeoExt.data.LayerRecord` The layer record
 *      to check support for.
 *  :return: ``Integer`` score indicating how good the legend supports the
 *      provided record. 0 means not supported.
 *  
 *  Checks whether this legend type supports the provided layerRecord.
 */
GeoExt.LayerLegend.supports = function(layerRecord) {
    // to be implemented by subclasses
};

/** class: constant[GeoExt.LayerLegend.types]
 *  An object containing a name-class mapping of LayerLegend subclasses.
 *  To register as LayerLegend, a subclass should add itself to this object:
 *  
 *  .. code-block:: javascript
 *  
 *      GeoExt.GetLegendGraphicLegend = Ext.extend(GeoExt.LayerLegend, {
 *      });
 *      
 *      GeoExt.LayerLegend.types["getlegendgraphic"] =
 *          GeoExt.GetLegendGraphicLegend;
 */
GeoExt.LayerLegend.types = {};
