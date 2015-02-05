/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/tips/ZoomSliderTip.js
 * @require OpenLayers/Util.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = ZoomSlider
 *  base_link = `Ext.slider.SingleSlider <http://dev.sencha.com/deploy/dev/docs/?class=Ext.slider.SingleSlider>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to render a slider outside the map viewport:
 * 
 *  .. code-block:: javascript
 *     
 *      var slider = new GeoExt.ZoomSlider({
 *          renderTo: document.body,
 *          width: 200,
 *          map: map
 *      });
 *     
 *  Sample code to add a slider to a map panel:
 * 
 *  .. code-block:: javascript
 * 
 *      var panel = new GeoExt.MapPanel({
 *          renderTo: document.body,
 *          height: 300,
 *          width: 400,
 *          map: {
 *              controls: [new OpenLayers.Control.Navigation()]
 *          },
 *          layers: [new OpenLayers.Layer.WMS(
 *              "Global Imagery",
 *              "http://maps.opengeo.org/geowebcache/service/wms",
 *              {layers: "bluemarble"}
 *          )],
 *          extent: [-5, 35, 15, 55],
 *          items: [{
 *              xtype: "gx_zoomslider",
 *              aggressive: true,
 *              vertical: true,
 *              height: 100,
 *              x: 10,
 *              y: 20
 *          }]
 *      });
 */

/** api: constructor
 *  .. class:: ZoomSlider(config)
 *   
 *      Create a slider for controlling a map's zoom level.
 */
GeoExt.ZoomSlider = Ext.extend(Ext.slider.SingleSlider, {
    
    /** api: config[map]
     *  ``OpenLayers.Map`` or :class:`GeoExt.MapPanel`
     *  The map that the slider controls.
     */
    map: null,
    
    /** api: config[baseCls]
     *  ``String``
     *  The CSS class name for the slider elements.  Default is "gx-zoomslider".
     */
    baseCls: "gx-zoomslider",

    /** api: config[aggressive]
     *  ``Boolean``
     *  If set to true, the map is zoomed as soon as the thumb is moved. Otherwise 
     *  the map is zoomed when the thumb is released (default).
     */
    aggressive: false,
    
    /** private: property[updating]
     *  ``Boolean``
     *  The slider position is being updated by itself (based on map zoomend).
     */
    updating: false,
    
    /** private: method[initComponent]
     *  Initialize the component.
     */
    initComponent: function() {
        GeoExt.ZoomSlider.superclass.initComponent.call(this);
        
        if(this.map) {
            if(this.map instanceof GeoExt.MapPanel) {
                this.map = this.map.map;
            }
            this.bind(this.map);
        }

        if (this.aggressive === true) {
            this.on('change', this.changeHandler, this);
        } else {
            this.on('changecomplete', this.changeHandler, this);
        }
        this.on("beforedestroy", this.unbind, this);        
    },
    
    /** private: method[onRender]
     *  Override onRender to set base css class.
     */
    onRender: function() {
        GeoExt.ZoomSlider.superclass.onRender.apply(this, arguments);
        this.el.addClass(this.baseCls);
    },

    /** private: method[afterRender]
     *  Override afterRender because the render event is fired too early
     *  to call update.
     */
    afterRender : function(){
        Ext.slider.SingleSlider.superclass.afterRender.apply(this, arguments);
        this.update();
    },
    
    /** private: method[addToMapPanel]
     *  :param panel: :class:`GeoExt.MapPanel`
     *  
     *  Called by a MapPanel if this component is one of the items in the panel.
     */
    addToMapPanel: function(panel) {
        this.on({
            render: function() {
                var el = this.getEl();
                el.setStyle({
                    position: "absolute",
                    zIndex: panel.map.Z_INDEX_BASE.Control
                });
                el.on({
                    mousedown: this.stopMouseEvents,
                    click: this.stopMouseEvents
                });
            },
            afterrender: function() {
                this.bind(panel.map);
            },
            scope: this
        });
    },
    
    /** private: method[stopMouseEvents]
     *  :param e: ``Object``
     */
    stopMouseEvents: function(e) {
        e.stopEvent();
    },
    
    /** private: method[removeFromMapPanel]
     *  :param panel: :class:`GeoExt.MapPanel`
     *  
     *  Called by a MapPanel if this component is one of the items in the panel.
     */
    removeFromMapPanel: function(panel) {
        var el = this.getEl();
        el.un("mousedown", this.stopMouseEvents, this);
        el.un("click", this.stopMouseEvents, this);
        this.unbind();
    },
    
    /** private: method[bind]
     *  :param map: ``OpenLayers.Map``
     */
    bind: function(map) {
        this.map = map;
        this.map.events.on({
            zoomend: this.update,
            changebaselayer: this.initZoomValues,
            scope: this
        });
        if(this.map.baseLayer) {
            this.initZoomValues();
            this.update();
        }
    },
    
    /** private: method[unbind]
     */
    unbind: function() {
        if(this.map && this.map.events) {
            this.map.events.un({
                zoomend: this.update,
                changebaselayer: this.initZoomValues,
                scope: this
            });
        }
    },
    
    /** private: method[initZoomValues]
     *  Set the min/max values for the slider if not set in the config.
     */
    initZoomValues: function() {
        var layer = this.map.baseLayer;
        if(this.initialConfig.minValue === undefined) {
            this.minValue = layer.minZoomLevel || 0;
        }
        if(this.initialConfig.maxValue === undefined) {
            this.maxValue = layer.minZoomLevel == null ?
                layer.numZoomLevels - 1 : layer.maxZoomLevel;
        }
    },
    
    /** api: method[getZoom]
     *  :return: ``Number`` The map zoom level.
     *  
     *  Get the zoom level for the associated map based on the slider value.
     */
    getZoom: function() {
        return this.getValue();
    },
    
    /** api: method[getScale]
     *  :return: ``Number`` The map scale denominator.
     *  
     *  Get the scale denominator for the associated map based on the slider value.
     */
    getScale: function() {
        return OpenLayers.Util.getScaleFromResolution(
            this.map.getResolutionForZoom(this.getValue()),
            this.map.getUnits()
        );
    },
    
    /** api: method[getResolution]
     *  :return: ``Number`` The map resolution.
     *  
     *  Get the resolution for the associated map based on the slider value.
     */
    getResolution: function() {
        return this.map.getResolutionForZoom(this.getValue());
    },
    
    /** private: method[changeHandler]
     *  Registered as a listener for slider changecomplete.  Zooms the map.
     */
    changeHandler: function() {
        if(this.map && !this.updating) {
            this.map.zoomTo(this.getValue());
        }
    },
    
    /** private: method[update]
     *  Registered as a listener for map zoomend.  Updates the value of the slider.
     */
    update: function() {
        if(this.rendered && this.map) {
            this.updating = true;
            this.setValue(this.map.getZoom());
            this.updating = false;
        }
    }

});

/** api: xtype = gx_zoomslider */
Ext.reg('gx_zoomslider', GeoExt.ZoomSlider);
