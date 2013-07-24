/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/LayerStore.js
 * @require OpenLayers/Map.js
 * @require OpenLayers/BaseTypes/LonLat.js
 * @require OpenLayers/BaseTypes/Bounds.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = MapPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Panel>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a panel with a new map:
 * 
 *  .. code-block:: javascript
 *     
 *      var mapPanel = new GeoExt.MapPanel({
 *          border: false,
 *          renderTo: "div-id",
 *          map: {
 *              maxExtent: new OpenLayers.Bounds(-90, -45, 90, 45)
 *          }
 *      });
 *     
 *  Sample code to create a map panel with a bottom toolbar in a Window:
 * 
 *  .. code-block:: javascript
 * 
 *      var win = new Ext.Window({
 *          title: "My Map",
 *          items: [{
 *              xtype: "gx_mappanel",
 *              bbar: new Ext.Toolbar()
 *          }]
 *      });
 */

/** api: constructor
 *  .. class:: MapPanel(config)
 *   
 *      Create a panel container for a map. The map contained by this panel
 *      will initially be zoomed to either the center and zoom level configured
 *      by the ``center`` and ``zoom`` configuration options, or the configured
 *      ``extent``, or - if neither are provided - the extent returned by the
 *      map's ``getExtent()`` method.
 */
GeoExt.MapPanel = Ext.extend(Ext.Panel, {

    /** api: config[map]
     *  ``OpenLayers.Map or Object``  A configured map or a configuration object
     *  for the map constructor.  A configured map will be available after
     *  construction through the :attr:`map` property.
     */

    /** api: property[map]
     *  ``OpenLayers.Map`` or ``Object``  A map or map configuration.
     */
    map: null,
    
    /** api: config[layers]
     *  ``GeoExt.data.LayerStore or GeoExt.data.GroupingStore or Array(OpenLayers.Layer)``
     *  A store holding records. The layers provided here will be added to this
     *  MapPanel's map when it is rendered.
     */
    
    /** api: property[layers]
     *  :class:`GeoExt.data.LayerStore`  A store containing
     *  :class:`GeoExt.data.LayerRecord` objects.
     */
    layers: null,
    
    /** api: config[center]
     *  ``OpenLayers.LonLat or Array(Number)``  A location for the initial map
     *  center.  If an array is provided, the first two items should represent
     *  x & y coordinates.
     */
    center: null,

    /** api: config[zoom]
     *  ``Number``  An initial zoom level for the map.
     */
    zoom: null,

    /** api: config[extent]
     *  ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map (used
     *  if center and zoom are not provided.  If an array, the first four items
     *  should be minx, miny, maxx, maxy.
     */
    extent: null,
    
    /** api: config[prettyStateKeys]
     *  ``Boolean`` Set this to true if you want pretty strings in the MapPanel's
     *  state keys. More specifically, layer.name instead of layer.id will be used
     *  in the state keys if this option is set to true. But in that case you have
     *  to make sure you don't have two layers with the same name. Defaults to 
     *  false.
     */
    prettyStateKeys: false,

    /** private: property[stateEvents]
     *  ``Array(String)`` Array of state events
     */
    stateEvents: ["aftermapmove",
                  "afterlayervisibilitychange",
                  "afterlayeropacitychange",
                  "afterlayerorderchange",
                  "afterlayernamechange",
                  "afterlayeradd",
                  "afterlayerremove"],

    /** private: method[initComponent]
     *  Initializes the map panel. Creates an OpenLayers map if
     *  none was provided in the config options passed to the
     *  constructor.
     */
    initComponent: function(){
        if(!(this.map instanceof OpenLayers.Map)) {
            this.map = new OpenLayers.Map(
                Ext.applyIf(this.map || {}, {allOverlays: true})
            );
        }
        var layers = this.layers;
        if(!layers || layers instanceof Array) {
            this.layers = new GeoExt.data.LayerStore({
                layers: layers,
                map: this.map.layers.length > 0 ? this.map : null
            });
        }
        
        if(typeof this.center == "string") {
            this.center = OpenLayers.LonLat.fromString(this.center);
        } else if(this.center instanceof Array) {
            this.center = new OpenLayers.LonLat(this.center[0], this.center[1]);
        }
        if(typeof this.extent == "string") {
            this.extent = OpenLayers.Bounds.fromString(this.extent);
        } else if(this.extent instanceof Array) {
            this.extent = OpenLayers.Bounds.fromArray(this.extent);
        }
        
        GeoExt.MapPanel.superclass.initComponent.call(this);

        this.addEvents(
            /** private: event[aftermapmove]
             *  Fires after the map is moved.
             */
            "aftermapmove",

            /** private: event[afterlayervisibilitychange]
             *  Fires after a layer changed visibility.
             */
            "afterlayervisibilitychange",

            /** private: event[afterlayeropacitychange]
             *  Fires after a layer changed opacity.
             */
            "afterlayeropacitychange",

            /** private: event[afterlayerorderchange]
             *  Fires after a layer order changed.
             */
            "afterlayerorderchange",

            /** private: event[afterlayernamechange]
             *  Fires after a layer name changed.
             */
            "afterlayernamechange",

            /** private: event[afterlayeradd]
             *  Fires after a layer added to the map.
             */
            "afterlayeradd",

            /** private: event[afterlayerremove]
             *  Fires after a layer removed from the map.
             */
            "afterlayerremove"
        );
        this.map.events.on({
            "moveend": this.onMoveend,
            "changelayer": this.onChangelayer,
            "addlayer": this.onAddlayer,
            "removelayer": this.onRemovelayer,
            scope: this
        });
    },

    /** private: method[onMoveend]
     *
     *  The "moveend" listener.
     */
    onMoveend: function() {
        this.fireEvent("aftermapmove");
    },

    /** private: method[onChangelayer]
     *  :param e: ``Object``
     *
     * The "changelayer" listener.
     */
    onChangelayer: function(e) {
        if(e.property) {
            if(e.property === "visibility") {
                this.fireEvent("afterlayervisibilitychange");
            } else if(e.property === "order") {
                this.fireEvent("afterlayerorderchange");
            } else if(e.property === "name") {
                this.fireEvent("afterlayernamechange");
            } else if(e.property === "opacity") {
                this.fireEvent("afterlayeropacitychange");
            }
        }
    },

    /** private: method[onAddlayer]
     */
    onAddlayer: function() {
        this.fireEvent("afterlayeradd");
    },

    /** private: method[onRemovelayer]
     */
    onRemovelayer: function() {
        this.fireEvent("afterlayerremove");
    },

    /** private: method[applyState]
     *  :param state: ``Object`` The state to apply.
     *
     *  Apply the state provided as an argument.
     */
    applyState: function(state) {

        // if we get strings for state.x, state.y or state.zoom
        // OpenLayers will take care of converting them to the
        // appropriate types so we don't bother with that
        this.center = new OpenLayers.LonLat(state.x, state.y);
        this.zoom = state.zoom;

        // set layer visibility and opacity
        var i, l, layer, layerId, visibility, opacity;
        var layers = this.map.layers;
        for(i=0, l=layers.length; i<l; i++) {
            layer = layers[i];
            layerId = this.prettyStateKeys ? layer.name : layer.id;
            visibility = state["visibility_" + layerId];
            if(visibility !== undefined) {
                // convert to boolean
                visibility = (/^true$/i).test(visibility);
                if(layer.isBaseLayer) {
                    if(visibility) {
                        this.map.setBaseLayer(layer);
                    }
                } else {
                    layer.setVisibility(visibility);
                }
            }
            opacity = state["opacity_" + layerId];
            if(opacity !== undefined) {
                layer.setOpacity(opacity);
            }
        }
    },

    /** private: method[getState]
     *  :return:  ``Object`` The state.
     *
     *  Returns the current state for the map panel.
     */
    getState: function() {
        var state;

        // Ext delays the call to getState when a state event
        // occurs, so the MapPanel may have been destroyed
        // between the time the event occurred and the time
        // getState is called
        if(!this.map) {
            return;
        }

        // record location and zoom level
        var center = this.map.getCenter();
        // map may not be centered yet, because it may still have zero
        // dimensions or no layers
        state = center ? {
            x: center.lon,
            y: center.lat,
            zoom: this.map.getZoom()
        } : {};

        // record layer visibility and opacity
        var i, l, layer, layerId, layers = this.map.layers;
        for(i=0, l=layers.length; i<l; i++) {
            layer = layers[i];
            layerId = this.prettyStateKeys ? layer.name : layer.id;
            state["visibility_" + layerId] = layer.getVisibility();
            state["opacity_" + layerId] = layer.opacity == null ?
                1 : layer.opacity;
        }

        return state;
    },

    /** private: method[updateMapSize]
     *  Tell the map that it needs to recalculate its size and position.
     */
    updateMapSize: function() {
        if(this.map) {
            this.map.updateSize();
        }
    },

    /** private: method[renderMap]
     *  Private method called after the panel has been rendered or after it
     *  has been laid out by its parent's layout.
     */
    renderMap: function() {
        var map = this.map;
        map.render(this.body.dom);

        this.layers.bind(map);

        if (map.layers.length > 0) {
            this.setInitialExtent();
        } else {
            this.layers.on("add", this.setInitialExtent, this, {single: true});
        }
    },
    
    /** private: method[setInitialExtent]
     *  Sets the initial extent of this panel's map
     */
    setInitialExtent: function() {
        var map = this.map;
        if(this.center || this.zoom != null) {
            // both do not have to be defined
            map.setCenter(this.center, this.zoom);
        } else if(this.extent) {
            map.zoomToExtent(this.extent);
        } else {
            map.zoomToMaxExtent();
        }
    },
    
    /** private: method[afterRender]
     *  Private method called after the panel has been rendered.
     */
    afterRender: function() {
        GeoExt.MapPanel.superclass.afterRender.apply(this, arguments);
        if(!this.ownerCt) {
            this.renderMap();
        } else {
            this.ownerCt.on("move", this.updateMapSize, this);
            this.ownerCt.on({
                "afterlayout": this.afterLayout,
                scope: this
            });
        }
    },
    
    /** private: method[afterLayout]
     *  Private method called after owner container has been laid out until
     *  this panel has dimensions greater than zero.
     */
    afterLayout: function() {
        var width = this.getInnerWidth() -
                                this.body.getBorderWidth("lr");
        var height = this.getInnerHeight() -
                                this.body.getBorderWidth("tb");
        if (width > 0 && height > 0) {
            this.ownerCt.un("afterlayout", this.afterLayout, this);
            this.renderMap();
        }
    },

    /** private: method[onResize]
     *  Private method called after the panel has been resized.
     */
    onResize: function() {
        GeoExt.MapPanel.superclass.onResize.apply(this, arguments);
        this.updateMapSize();
    },
    
    /** private: method[onBeforeAdd]
     *  Private method called before a component is added to the panel.
     */
    onBeforeAdd: function(item) {
        if(typeof item.addToMapPanel === "function") {
            item.addToMapPanel(this);
        }
        GeoExt.MapPanel.superclass.onBeforeAdd.apply(this, arguments);
    },
    
    /** private: method[remove]
     *  Private method called when a component is removed from the panel.
     */
    remove: function(item, autoDestroy) {
        if(typeof item.removeFromMapPanel === "function") {
            item.removeFromMapPanel(this);
        }
        GeoExt.MapPanel.superclass.remove.apply(this, arguments);
    },

    /** private: method[beforeDestroy]
     *  Private method called during the destroy sequence.
     */
    beforeDestroy: function() {
        if(this.ownerCt) {
            this.ownerCt.un("move", this.updateMapSize, this);
        }
        if(this.map && this.map.events) {
            this.map.events.un({
                "moveend": this.onMoveend,
                "changelayer": this.onChangelayer,
                "addlayer": this.onAddlayer,
                "removelayer": this.onRemovelayer,
                scope: this
            });
        }
        // if the map panel was passed a map instance, this map instance
        // is under the user's responsibility
        if(!this.initialConfig.map ||
           !(this.initialConfig.map instanceof OpenLayers.Map)) {
            // we created the map, we destroy it
            if(this.map && this.map.destroy) {
                this.map.destroy();
            }
        }
        delete this.map;
        GeoExt.MapPanel.superclass.beforeDestroy.apply(this, arguments);
    }
    
});

/** api: function[guess]
 *  :return: ``GeoExt.MapPanel`` The first map panel found by the Ext
 *      component manager.
 *  
 *  Convenience function for guessing the map panel of an application. This
 *     can reliably be used for all applications that just have one map panel
 *     in the viewport.
 */
GeoExt.MapPanel.guess = function() {
    return Ext.ComponentMgr.all.find(function(o) { 
        return o instanceof GeoExt.MapPanel; 
    }); 
};


/** api: xtype = gx_mappanel */
Ext.reg('gx_mappanel', GeoExt.MapPanel); 
