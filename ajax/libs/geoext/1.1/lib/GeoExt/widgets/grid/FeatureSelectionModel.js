/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Control/SelectFeature.js
 * @require OpenLayers/Layer/Vector.js
 * @require OpenLayers/BaseTypes/Class.js
 */

/** api: (define)
 *  module = GeoExt.grid
 *  class = FeatureSelectionModel
 *  base_link = `Ext.grid.RowSelectionModel <http://dev.sencha.com/deploy/dev/docs/?class=Ext.grid.RowSelectionModel>`_
 */

Ext.namespace('GeoExt.grid');

/** api: constructor
 *  .. class:: FeatureSelectionModel
 *
 *      A row selection model which enables automatic selection of features
 *      in the map when rows are selected in the grid and vice-versa.
 */

/** api: example
 *  Sample code to create a feature grid with a feature selection model:
 *  
 *  .. code-block:: javascript
 *
 *       var gridPanel = new Ext.grid.GridPanel({
 *          title: "Feature Grid",
 *          region: "east",
 *          store: store,
 *          width: 320,
 *          columns: [{
 *              header: "Name",
 *              width: 200,
 *              dataIndex: "name"
 *          }, {
 *              header: "Elevation",
 *              width: 100,
 *              dataIndex: "elevation"
 *          }],
 *          sm: new GeoExt.grid.FeatureSelectionModel() 
 *      });
 */

GeoExt.grid.FeatureSelectionModelMixin = function() {
    return {
        /** api: config[autoActivateControl]
         *  ``Boolean`` If true the select feature control is activated and
         *  deactivated when binding and unbinding. Defaults to true.
         */
        autoActivateControl: true,

        /** api: config[layerFromStore]
         *  ``Boolean`` If true, and if the constructor is passed neither a
         *  layer nor a select feature control, a select feature control is
         *  created using the layer found in the grid's store. Set it to
         *  false if you want to manually bind the selection model to a
         *  layer. Defaults to true.
         */
        layerFromStore: true,

        /** api: config[selectControl]
         *
         *  ``OpenLayers.Control.SelectFeature`` A select feature control. If not
         *  provided one will be created.  If provided any "layer" config option
         *  will be ignored, and its "multiple" option will be used to configure
         *  the selectionModel.  If an ``Object`` is provided here, it will be
         *  passed as config to the SelectFeature constructor, and the "layer"
         *  config option will be used for the layer.
         */

        /** private: property[selectControl] 
         *  ``OpenLayers.Control.SelectFeature`` The select feature control 
         *  instance. 
         */ 
        selectControl: null, 
        
        /** api: config[layer]
         *  ``OpenLayers.Layer.Vector`` The vector layer used for the creation of
         *  the select feature control, it must already be added to the map. If not
         *  provided, the layer bound to the grid's store, if any, will be used.
         */

        /** private: property[bound]
         *  ``Boolean`` Flag indicating if the selection model is bound.
         */
        bound: false,
        
        /** private: property[superclass]
         *  ``Ext.grid.AbstractSelectionModel`` Our superclass.
         */
        superclass: null,
        
        /** private: property[selectedFeatures]
         *  ``Array`` An array to store the selected features.
         */
        selectedFeatures: [],
        
        /** api: config[autoPanMapOnSelection]
         *  ``Boolean`` If true the map will recenter on feature selection
         *  so that the selected features are visible. Defaults to false.
         */
        autoPanMapOnSelection: false,

        /** private */
        constructor: function(config) {
            config = config || {};
            if(config.selectControl instanceof OpenLayers.Control.SelectFeature) { 
                if(!config.singleSelect) {
                    var ctrl = config.selectControl;
                    config.singleSelect = !(ctrl.multiple || !!ctrl.multipleKey);
                }
            } else if(config.layer instanceof OpenLayers.Layer.Vector) {
                this.selectControl = this.createSelectControl(
                    config.layer, config.selectControl
                );
                delete config.layer;
                delete config.selectControl;
            }
            if (config.autoPanMapOnSelection) {
                this.autoPanMapOnSelection = true;
                delete config.autoPanMapOnSelection;
            }
            this.superclass = arguments.callee.superclass;
            this.superclass.constructor.call(this, config);
        },
        
        /** private: method[initEvents]
         *
         *  Called after this.grid is defined
         */
        initEvents: function() {
            this.superclass.initEvents.call(this);
            if(this.layerFromStore) {
                var layer = this.grid.getStore() && this.grid.getStore().layer;
                if(layer &&
                   !(this.selectControl instanceof OpenLayers.Control.SelectFeature)) {
                    this.selectControl = this.createSelectControl(
                        layer, this.selectControl
                    );
                }
            }
            if(this.selectControl) {
                this.bind(this.selectControl);
            }
        },

        /** private: createSelectControl
         *  :param layer: ``OpenLayers.Layer.Vector`` The vector layer.
         *  :param config: ``Object`` The select feature control config.
         *
         *  Create the select feature control.
         */
        createSelectControl: function(layer, config) {
            config = config || {};
            var singleSelect = config.singleSelect !== undefined ?
                               config.singleSelect : this.singleSelect;
            config = OpenLayers.Util.extend({
                toggle: true,
                multipleKey: singleSelect ? null :
                    (Ext.isMac ? "metaKey" : "ctrlKey")
            }, config);
            var selectControl = new OpenLayers.Control.SelectFeature(
                layer, config
            );
            layer.map.addControl(selectControl);
            return selectControl;
        },
        
        /** api: method[bind]
         *
         *  :param obj: ``OpenLayers.Layer.Vector`` or
         *      ``OpenLayers.Control.SelectFeature`` The object this selection model
         *      should be bound to, either a vector layer or a select feature
         *      control.
         *  :param options: ``Object`` An object with a "controlConfig"
         *      property referencing the configuration object to pass to the
         *      ``OpenLayers.Control.SelectFeature`` constructor.
         *  :return: ``OpenLayers.Control.SelectFeature`` The select feature
         *      control this selection model uses.
         *
         *  Bind the selection model to a layer or a SelectFeature control.
         */
        bind: function(obj, options) {
            if(!this.bound) {
                options = options || {};
                this.selectControl = obj;
                if(obj instanceof OpenLayers.Layer.Vector) {
                    this.selectControl = this.createSelectControl(
                        obj, options.controlConfig
                    );
                }
                if(this.autoActivateControl) {
                    this.selectControl.activate();
                }
                var layers = this.getLayers();
                for(var i = 0, len = layers.length; i < len; i++) {
                    layers[i].events.on({
                        featureselected: this.featureSelected,
                        featureunselected: this.featureUnselected,
                        scope: this
                    });
                }
                this.on("rowselect", this.rowSelected, this);
                this.on("rowdeselect", this.rowDeselected, this);
                this.bound = true;
            }
            return this.selectControl;
        },
        
        /** api: method[unbind]
         *  :return: ``OpenLayers.Control.SelectFeature`` The select feature
         *      control this selection model used.
         *
         *  Unbind the selection model from the layer or SelectFeature control.
         */
        unbind: function() {
            var selectControl = this.selectControl;
            if(this.bound) {
                var layers = this.getLayers();
                for(var i = 0, len = layers.length; i < len; i++) {
                    layers[i].events.un({
                        featureselected: this.featureSelected,
                        featureunselected: this.featureUnselected,
                        scope: this
                    });
                }
                this.un("rowselect", this.rowSelected, this);
                this.un("rowdeselect", this.rowDeselected, this);
                if(this.autoActivateControl) {
                    selectControl.deactivate();
                }
                this.selectControl = null;
                this.bound = false;
            }
            return selectControl;
        },
        
        /** private: method[featureSelected]
         *  :param evt: ``Object`` An object with a feature property referencing
         *                         the selected feature.
         */
        featureSelected: function(evt) {
            if(!this._selecting) {
                var store = this.grid.store;
                var row = store.findBy(function(record, id) {
                    return record.getFeature() == evt.feature;
                });
                if(row != -1 && !this.isSelected(row)) {
                    this._selecting = true;
                    this.selectRow(row, !this.singleSelect);
                    this._selecting = false;
                    // focus the row in the grid to ensure it is visible
                    this.grid.getView().focusRow(row);
                }
            }
        },
        
        /** private: method[featureUnselected]
         *  :param evt: ``Object`` An object with a feature property referencing
         *                         the unselected feature.
         */
        featureUnselected: function(evt) {
            if(!this._selecting) {
                var store = this.grid.store;
                var row = store.findBy(function(record, id) {
                    return record.getFeature() == evt.feature;
                });
                if(row != -1 && this.isSelected(row)) {
                    this._selecting = true;
                    this.deselectRow(row); 
                    this._selecting = false;
                    this.grid.getView().focusRow(row);
                }
            }
        },
        
        /** private: method[rowSelected]
         *  :param model: ``Ext.grid.RowSelectModel`` The row select model.
         *  :param row: ``Integer`` The row index.
         *  :param record: ``Ext.data.Record`` The record.
         */
        rowSelected: function(model, row, record) {
            var feature = record.getFeature();
            if(!this._selecting && feature) {
                var layers = this.getLayers();
                for(var i = 0, len = layers.length; i < len; i++) {
                    if(layers[i].selectedFeatures.indexOf(feature) == -1) {
                        this._selecting = true;
                        this.selectControl.select(feature);
                        this._selecting = false;
                        this.selectedFeatures.push(feature);
                        break;
                    }
                }
                if(this.autoPanMapOnSelection) {
                    this.recenterToSelectionExtent();
                }
             }
        },
        
        /** private: method[rowDeselected]
         *  :param model: ``Ext.grid.RowSelectModel`` The row select model.
         *  :param row: ``Integer`` The row index.
         *  :param record: ``Ext.data.Record`` The record.
         */
        rowDeselected: function(model, row, record) {
            var feature = record.getFeature();
            if(!this._selecting && feature) {
                var layers = this.getLayers();
                for(var i = 0, len = layers.length; i < len; i++) {
                    if(layers[i].selectedFeatures.indexOf(feature) != -1) {
                        this._selecting = true;
                        this.selectControl.unselect(feature);
                        this._selecting = false;
                        OpenLayers.Util.removeItem(this.selectedFeatures, feature);
                        break;
                    }
                }
                if(this.autoPanMapOnSelection && this.selectedFeatures.length > 0) {
                    this.recenterToSelectionExtent();
                }
            }
        },

        /** private: method[getLayers]
         *  Return the layers attached to the select feature control.
         */
        getLayers: function() {
            return this.selectControl.layers || [this.selectControl.layer];
        },
        
        /**
         * private: method[recenterToSelectionExtent]
         * centers the map in order to display all
         * selected features
         */
        recenterToSelectionExtent: function() {
            var map = this.selectControl.map;
            var selectionExtent = this.getSelectionExtent();
            var selectionExtentZoom = map.getZoomForExtent(selectionExtent, false);
            if(selectionExtentZoom > map.getZoom()) {
                map.setCenter(selectionExtent.getCenterLonLat());
            }
            else {
                map.zoomToExtent(selectionExtent);
            }
        },
        
        /** api: method[getSelectionExtent]
         *  :return: ``OpenLayers.Bounds`` or null if the layer has no features with
         *      geometries
         *
         *  Calculates the max extent which includes all selected features.
         */
        getSelectionExtent: function () {
            var maxExtent = null;
            var features = this.selectedFeatures;
            if(features && (features.length > 0)) {
                var geometry = null;
                for(var i=0, len=features.length; i<len; i++) {
                    geometry = features[i].geometry;
                    if (geometry) {
                        if (maxExtent === null) {
                            maxExtent = new OpenLayers.Bounds();
                        }
                        maxExtent.extend(geometry.getBounds());
                    }
                }
            }
            return maxExtent;
        }
    };
};

GeoExt.grid.FeatureSelectionModel = Ext.extend(
    Ext.grid.RowSelectionModel,
    new GeoExt.grid.FeatureSelectionModelMixin
);
