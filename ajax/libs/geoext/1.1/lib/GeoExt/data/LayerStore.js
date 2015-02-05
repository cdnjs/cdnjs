/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/LayerReader.js
 * @include GeoExt/widgets/MapPanel.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = LayerStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/** private: constructor
 *  .. class:: LayerStoreMixin
 *      A store that synchronizes a layers array of an {OpenLayers.Map} with a
 *      layer store holding {<GeoExt.data.LayerRecord>} entries.
 * 
 *      This class can not be instantiated directly. Instead, it is meant to
 *      extend ``Ext.data.Store`` or a subclass of it.
 */

/** private: example
 *  Sample code to extend a store with the LayerStoreMixin.
 *
 *  .. code-block:: javascript
 *  
 *      var store = new (Ext.extend(Ext.data.Store, new GeoExt.data.LayerStoreMixin))({
 *          map: myMap,
 *          layers: myLayers
 *      });
 * 
 *  For convenience, a :class:`GeoExt.data.LayerStore` class is available as a
 *  shortcut to the ``Ext.extend`` sequence in the above code snippet.
 */

GeoExt.data.LayerStoreMixin = function() {
    return {
        /** api: config[map]
         *  ``OpenLayers.Map``
         *  Map that this store will be in sync with. If not provided, the
         *  store will not be bound to a map.
         */
        
        /** api: property[map]
         *  ``OpenLayers.Map``
         *  Map that the store is synchronized with, if any.
         */
        map: null,
        
        /** api: config[layers]
         *  ``Array(OpenLayers.Layer)``
         *  Layers that will be added to the store (and the map, depending on the
         *  value of the ``initDir`` option.
         */
        
        /** api: config[initDir]
         *  ``Number``
         *  Bitfields specifying the direction to use for the initial sync between
         *  the map and the store, if set to 0 then no initial sync is done.
         *  Defaults to ``GeoExt.data.LayerStore.MAP_TO_STORE|GeoExt.data.LayerStore.STORE_TO_MAP``
         */

        /** api: config[fields]
         *  ``Array``
         *  If provided a custom layer record type with additional fields will be
         *  used. Default fields for every layer record are `layer`
         *  (``OpenLayers.Layer``) `title` (``String``). The value of this option is
         *  either a field definition objects as passed to the
         *  :meth:`GeoExt.data.LayerRecord.create` function or a
         *  :class:`GeoExt.data.LayerRecord` constructor created using
         *  :meth:`GeoExt.data.LayerRecord.create`.
         */

        /** api: config[reader]
         *  ``Ext.data.DataReader`` The reader used to produce
         *  :class:`GeoExt.data.LayerRecord` objects from ``OpenLayers.Layer``
         *  objects.  If not provided, a :class:`GeoExt.data.LayerReader` will be
         *  used.
         */
        reader: null,

        /** private: method[constructor]
         */
        constructor: function(config) {
            config = config || {};
            config.reader = config.reader ||
                            new GeoExt.data.LayerReader({}, config.fields);
            delete config.fields;
            // "map" option
            var map = config.map instanceof GeoExt.MapPanel ?
                      config.map.map : config.map;
            delete config.map;
            // "layers" option - is an alias to "data" option
            if(config.layers) {
                config.data = config.layers;
            }
            delete config.layers;
            // "initDir" option
            var options = {initDir: config.initDir};
            delete config.initDir;
            arguments.callee.superclass.constructor.call(this, config);
            
            this.addEvents(
                /** api:event[bind]
                 *  Fires when the store is bound to a map.
                 *
                 *  Listener arguments:
                 *  * :class:`GeoExt.data.LayerStore`
                 *  * ``OpenLayers.Map``
                 */
                "bind"
            );
            
            if(map) {
                this.bind(map, options);
            }
        },

        /** private: method[bind]
         *  :param map: ``OpenLayers.Map`` The map instance.
         *  :param options: ``Object``
         *  
         *  Bind this store to a map instance, once bound the store
         *  is synchronized with the map and vice-versa.
         */
        bind: function(map, options) {
            if(this.map) {
                // already bound
                return;
            }
            this.map = map;
            options = options || {};

            var initDir = options.initDir;
            if(options.initDir == undefined) {
                initDir = GeoExt.data.LayerStore.MAP_TO_STORE |
                          GeoExt.data.LayerStore.STORE_TO_MAP;
            }

            // create a snapshot of the map's layers
            var layers = map.layers.slice(0);

            if(initDir & GeoExt.data.LayerStore.STORE_TO_MAP) {
                this.each(function(record) {
                    this.map.addLayer(record.getLayer());
                }, this);
            }
            if(initDir & GeoExt.data.LayerStore.MAP_TO_STORE) {
                this.loadData(layers, true);
            }

            map.events.on({
                "changelayer": this.onChangeLayer,
                "addlayer": this.onAddLayer,
                "removelayer": this.onRemoveLayer,
                scope: this
            });
            this.on({
                "load": this.onLoad,
                "clear": this.onClear,
                "add": this.onAdd,
                "remove": this.onRemove,
                "update": this.onUpdate,
                scope: this
            });
            this.data.on({
                "replace" : this.onReplace,
                scope: this
            });
            this.fireEvent("bind", this, map);
        },

        /** private: method[unbind]
         *  Unbind this store from the map it is currently bound.
         */
        unbind: function() {
            if(this.map) {
                this.map.events.un({
                    "changelayer": this.onChangeLayer,
                    "addlayer": this.onAddLayer,
                    "removelayer": this.onRemoveLayer,
                    scope: this
                });
                this.un("load", this.onLoad, this);
                this.un("clear", this.onClear, this);
                this.un("add", this.onAdd, this);
                this.un("remove", this.onRemove, this);

                this.data.un("replace", this.onReplace, this);

                this.map = null;
            }
        },
        
        /** private: method[onChangeLayer]
         *  :param evt: ``Object``
         * 
         *  Handler for layer changes.  When layer order changes, this moves the
         *  appropriate record within the store.
         */
        onChangeLayer: function(evt) {
            var layer = evt.layer;
            var recordIndex = this.findBy(function(rec, id) {
                return rec.getLayer() === layer;
            });
            if(recordIndex > -1) {
                var record = this.getAt(recordIndex);
                if(evt.property === "order") {
                    if(!this._adding && !this._removing) {
                        var layerIndex = this.map.getLayerIndex(layer);
                        if(layerIndex !== recordIndex) {
                            this._removing = true;
                            this.remove(record);
                            delete this._removing;
                            this._adding = true;
                            this.insert(layerIndex, [record]);
                            delete this._adding;
                        }
                    }
                } else if(evt.property === "name") {
                    record.set("title", layer.name);
                } else {
                    this.fireEvent("update", this, record, Ext.data.Record.EDIT);
                }
            }
        },
       
        /** private: method[onAddLayer]
         *  :param evt: ``Object``
         *  
         *  Handler for a map's addlayer event
         */
        onAddLayer: function(evt) {
            if(!this._adding) {
                var layer = evt.layer;
                this._adding = true;
                this.loadData([layer], true);
                delete this._adding;
            }
        },
        
        /** private: method[onRemoveLayer]
         *  :param evt: ``Object``
         * 
         *  Handler for a map's removelayer event
         */
        onRemoveLayer: function(evt){
            //TODO replace the check for undloadDestroy with a listener for the
            // map's beforedestroy event, doing unbind(). This can be done as soon
            // as http://trac.openlayers.org/ticket/2136 is fixed.
            if(this.map.unloadDestroy) {
                if(!this._removing) {
                    var layer = evt.layer;
                    this._removing = true;
                    this.remove(this.getById(layer.id));
                    delete this._removing;
                }
            } else {
                this.unbind();
            }
        },
        
        /** private: method[onLoad]
         *  :param store: ``Ext.data.Store``
         *  :param records: ``Array(Ext.data.Record)``
         *  :param options: ``Object``
         * 
         *  Handler for a store's load event
         */
        onLoad: function(store, records, options) {
            if (!Ext.isArray(records)) {
                records = [records];
            }
            if (options && !options.add) {
                this._removing = true;
                for (var i = this.map.layers.length - 1; i >= 0; i--) {
                    this.map.removeLayer(this.map.layers[i]);
                }
                delete this._removing;

                // layers has already been added to map on "add" event
                var len = records.length;
                if (len > 0) {
                    var layers = new Array(len);
                    for (var j = 0; j < len; j++) {
                        layers[j] = records[j].getLayer();
                    }
                    this._adding = true;
                    this.map.addLayers(layers);
                    delete this._adding;
                }
            }
        },
        
        /** private: method[onClear]
         *  :param store: ``Ext.data.Store``
         * 
         *  Handler for a store's clear event
         */
        onClear: function(store) {
            this._removing = true;
            for (var i = this.map.layers.length - 1; i >= 0; i--) {
                this.map.removeLayer(this.map.layers[i]);
            }
            delete this._removing;
        },
        
        /** private: method[onAdd]
         *  :param store: ``Ext.data.Store``
         *  :param records: ``Array(Ext.data.Record)``
         *  :param index: ``Number``
         * 
         *  Handler for a store's add event
         */
        onAdd: function(store, records, index) {
            if(!this._adding) {
                this._adding = true;
                var layer;
                for(var i=records.length-1; i>=0; --i) {
                    layer = records[i].getLayer();
                    this.map.addLayer(layer);
                    if(index !== this.map.layers.length-1) {
                        this.map.setLayerIndex(layer, index);
                    }
                }
                delete this._adding;
            }
        },
        
        /** private: method[onRemove]
         *  :param store: ``Ext.data.Store``
         *  :param record: ``Ext.data.Record``
         *  :param index: ``Number``
         * 
         *  Handler for a store's remove event
         */
        onRemove: function(store, record, index){
            if(!this._removing) {
                var layer = record.getLayer();
                if (this.map.getLayer(layer.id) != null) {
                    this._removing = true;
                    this.removeMapLayer(record);
                    delete this._removing;
                }
            }
        },
        
        /** private: method[onUpdate]
         *  :param store: ``Ext.data.Store``
         *  :param record: ``Ext.data.Record``
         *  :param operation: ``Number``
         * 
         *  Handler for a store's update event
         */
        onUpdate: function(store, record, operation) {
            if(operation === Ext.data.Record.EDIT) {
                if (record.modified && record.modified.title) {
                    var layer = record.getLayer();
                    var title = record.get("title");
                    if(title !== layer.name) {
                        layer.setName(title);
                    }
                }
            }
        },

        /** private: method[removeMapLayer]
         *  :param record: ``Ext.data.Record``
         *  
         *  Removes a record's layer from the bound map.
         */
        removeMapLayer: function(record){
            this.map.removeLayer(record.getLayer());
        },

        /** private: method[onReplace]
         *  :param key: ``String``
         *  :param oldRecord: ``Object`` In this case, a record that has been
         *      replaced.
         *  :param newRecord: ``Object`` In this case, a record that is replacing
         *      oldRecord.

         *  Handler for a store's data collections' replace event
         */
        onReplace: function(key, oldRecord, newRecord){
            this.removeMapLayer(oldRecord);
        },
        
        /** api: method[getByLayer]
         *  :param layer: ``OpenLayers.Layer``
         *  :return: :class:`GeoExt.data.LayerRecord` or undefined if not found
         *  
         *  Get the record for the specified layer
         */
        getByLayer: function(layer) {
            var index = this.findBy(function(r) {
                return r.getLayer() === layer;
            });
            if(index > -1) {
                return this.getAt(index);
            }
        },
        
        /** private: method[destroy]
         */
        destroy: function() {
            this.unbind();
            GeoExt.data.LayerStore.superclass.destroy.call(this);
        }
    };
};

/** api: example
 *  Sample to create a new store containing a cache of
 *  :class:`GeoExt.data.LayerRecord` instances derived from map layers.
 *
 *  .. code-block:: javascript
 *  
 *      var store = new GeoExt.data.LayerStore({
 *          map: myMap,
 *          layers: myLayers
 *      });
 */

/** api: constructor
 *  .. class:: LayerStore
 *
 *      A store that contains a cache of :class:`GeoExt.data.LayerRecord`
 *      objects.
 */
GeoExt.data.LayerStore = Ext.extend(
    Ext.data.Store,
    new GeoExt.data.LayerStoreMixin
);

/**
 * Constant: GeoExt.data.LayerStore.MAP_TO_STORE
 * {Integer} Constant used to make the store be automatically updated
 * when changes occur in the map.
 */
GeoExt.data.LayerStore.MAP_TO_STORE = 1;

/**
 * Constant: GeoExt.data.LayerStore.STORE_TO_MAP
 * {Integer} Constant used to make the map be automatically updated
 * when changes occur in the store.
 */
GeoExt.data.LayerStore.STORE_TO_MAP = 2;
