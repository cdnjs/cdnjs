/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Layer/Vector.js
 * @require OpenLayers/Control/TransformFeature.js
 * @require OpenLayers/BaseTypes/LonLat.js
 */

/** api: (define)
 *  module = GeoExt.plugins
 *  class = PrintExtent
 */
Ext.namespace("GeoExt.plugins");

/** api: example
 *  Sample code to create a MapPanel with a PrintExtent, and print it
 *  immediately:
 * 
 *  .. code-block:: javascript
 *
 *      var printExtent = new GeoExt.plugins.PrintExtent({
 *          printProvider: new GeoExt.data.PrintProvider({
 *              capabilities: printCapabilities
 *          })
 *      });
 *     
 *      var mapPanel = new GeoExt.MapPanel({
 *          border: false,
 *          renderTo: "div-id",
 *          layers: [new OpenLayers.Layer.WMS("Tasmania", "http://demo.opengeo.org/geoserver/wms",
 *              {layers: "topp:tasmania_state_boundaries"}, {singleTile: true})],
 *          center: [146.56, -41.56],
 *          zoom: 6,
 *          plugins: printExtent
 *      });
 *
 *      printExtent.addPage();
 *
 *      // print the map
 *      printExtent.print();
 */

/** api: constructor
 *  .. class:: PrintExtent
 * 
 *  Provides a way to show and modify the extents of print pages on the map. It
 *  uses a layer to render the page extent and handle features of print pages,
 *  and provides a control to modify them. Must be set as a plugin to a
 *  :class:`GeoExt.MapPanel`.
 */
GeoExt.plugins.PrintExtent = Ext.extend(Ext.util.Observable, {

    /** private: initialConfig
     *  ``Object`` Holds the initial config object passed to the
     *  constructor.
     */
    initialConfig: null,

    /** api: config[printProvider]
     *  :class:`GeoExt.data.PrintProvider` The print provider this form
     *  is connected to. Optional if pages are provided.
     */
    /** api: property[printProvider]
     *  :class:`GeoExt.data.PrintProvider` The print provider this form
     *  is connected to. Read-only.
     */
    printProvider: null,
    
    /** private: property[map]
     *  ``OpenLayers.Map`` The map the layer and control are added to.
     */
    map: null,
    
    /** api: config[layer]
     *  ``OpenLayers.Layer.Vector`` The layer used to render extent and handle
     *  features to. Optional, will be created if not provided.
     */
    /** private: property[layer]
     *  ``OpenLayers.Layer.Vector`` The layer used to render extent and handle
     *  features to.
     */
    layer: null,
    
    /** private: property[control]
     *  ``OpenLayers.Control.TransformFeature`` The control used to change
     *      extent, center, rotation and scale.
     */
    control: null,
    
    /** api: config[pages]
     *  Array of :class:`GeoExt.data.PrintPage` The pages that this plugin
     *  controls. Optional. If not provided, it will be created with one page
     *  that is completely contained within the visible map extent.
     *  
     *  .. note:: All pages must use the same PrintProvider.
     */
    /** api: property[pages]
     *  Array of :class:`GeoExt.data.PrintPage` The pages that this component
     *  controls. Read-only.
     */
    pages: null,

    /** api: property[page]
     *  :class:`GeoExt.data.PrintPage` The page currently set for
     *  transformation.
     */
    page: null,

    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        config = config || {};

        Ext.apply(this, config);
        this.initialConfig = config;

        if(!this.printProvider) {
            this.printProvider = this.pages[0].printProvider;
        }

        if(!this.pages) {
            this.pages = [];
        }
        
        this.addEvents(
            /** api: event[selectpage]
             *  Triggered when a page has been selected using the control
             *  
             *  Listener arguments:
             *  * printPage - :class:`GeoExt.data.PrintPage` this printPage
             */
            "selectpage"
        );

        GeoExt.plugins.PrintExtent.superclass.constructor.apply(this, arguments);
    },

    /** api: method[print]
     *  :param options: ``Object`` Options to send to the PrintProvider's
     *      print method. See :class:`GeoExt.data.PrintProvider` :: ``print``.
     *  
     *  Prints all pages as shown on the map.
     */
    print: function(options) {
        this.printProvider.print(this.map, this.pages, options);
    },

    /** private: method[init]
     *  :param mapPanel: class:`GeoExt.MapPanel`
     *  
     *  Initializes the plugin.
     */
    init: function(mapPanel) {
        this.map = mapPanel.map;
        mapPanel.on("destroy", this.onMapPanelDestroy, this);

        if (!this.layer) {
            this.layer = new OpenLayers.Layer.Vector(null, {
                displayInLayerSwitcher: false
            });
        }
        this.createControl();

        for(var i=0, len=this.pages.length; i<len; ++i) {
            this.addPage(this.pages[i]);
        }
        this.show();
    },

    /** api: method[addPage]
     *  :param page: :class:`GeoExt.data.PrintPage` The page to add
     *       to this plugin. If not provided, a page that fits the current
     *       extent is created.
     *  :return: page :class:``GeoExt.data.PrintPage``
     *  
     *  Adds a page to the list of pages that this plugin controls.
     */
    addPage: function(page) {
        page = page || new GeoExt.data.PrintPage({
            printProvider: this.printProvider
        });
        if(this.pages.indexOf(page) === -1) {
            this.pages.push(page);
        }
        this.layer.addFeatures([page.feature]);
        page.on("change", this.onPageChange, this);

        this.page = page;
        var map = this.map;
        if(map.getCenter()) {
            this.fitPage();
        } else {
            map.events.register("moveend", this, function() {
                map.events.unregister("moveend", this, arguments.callee);
                this.fitPage();
            });
        }
        return page;
    },

    /** api: method[removePage]
     *  :param page: :class:`GeoExt.data.PrintPage` The page to remove
     *       from this plugin.
     *       
     *  Removes a page from the list of pages that this plugin controls.
     */
    removePage: function(page) {
        this.pages.remove(page);
        if (page.feature.layer) {
            this.layer.removeFeatures([page.feature]);
        }
        page.un("change", this.onPageChange, this);
    },
    
    /** api: method[selectPage]
     *  :param page: :class:`GeoExt.data.PrintPage` The page to select
     *  
     *  Selects the given page (ie. calls the setFeature on the modify feature
     *  control)
     */
    selectPage: function(page) {
        this.control.active && this.control.setFeature(page.feature);
        // FIXME raise the feature up so that it is on top
    },

    /** api: method[show]
     * 
     *  Sets up the plugin, initializing the ``OpenLayers.Layer.Vector``
     *  layer and ``OpenLayers.Control.TransformFeature``, and centering
     *  the first page if no pages were specified in the configuration.
     */
    show: function() {
        this.map.addLayer(this.layer);
        this.map.addControl(this.control);
        this.control.activate();

        // if we have a page and if the map has a center then update the
        // transform box for that page, in case the transform control
        // was deactivated when fitPage (and therefore onPageChange)
        // was called.
        if (this.page && this.map.getCenter()) {
            this.updateBox();
        }
    },

    /** api: method[hide]
     * 
     *  Tear downs the plugin, removing the
     *  ``OpenLayers.Control.TransformFeature`` control and
     *  the ``OpenLayers.Layer.Vector`` layer.
     */
    hide: function() {
        // note: we need to be extra cautious when destroying OpenLayers
        // objects here (the tests will fail if we're not cautious anyway).
        // We use obj.events to test whether an OpenLayers object is
        // destroyed or not.

        var map = this.map, layer = this.layer, control = this.control;

        if(control && control.events) {
            control.deactivate();
            if(map && map.events && control.map) {
                map.removeControl(control);
            }
        }

        if(map && map.events && layer && layer.map) {
            map.removeLayer(layer);
        }
    },

    /** private: method[onMapPanelDestroy]
     */
    onMapPanelDestroy: function() {

        var map = this.map;

        for(var len = this.pages.length - 1, i = len; i>=0; i--) {
            this.removePage(this.pages[i]);
        }

        this.hide();

        var control = this.control;
        if(map && map.events &&
           control && control.events) {
            control.destroy();
        }

        var layer = this.layer;
        if(!this.initialConfig.layer &&
           map && map.events &&
           layer && layer.events) {
            layer.destroy();
        }

        delete this.layer;
        delete this.control;
        delete this.page;
        this.map = null;
    },
    
    /** private: method[createControl]
     */
    createControl: function() {
        this.control = new OpenLayers.Control.TransformFeature(this.layer, {
            preserveAspectRatio: true,
            eventListeners: {
                "beforesetfeature": function(e) {
                    for(var i=0, len=this.pages.length; i<len; ++i) {
                        if(this.pages[i].feature === e.feature) {
                            this.page = this.pages[i];
                            e.object.rotation = -this.pages[i].rotation;
                            break;
                        }
                    }
                },
                "setfeature": function(e) {
                    for(var i=0, len=this.pages.length; i<len; ++i) {
                        if(this.pages[i].feature === e.feature) {
                            this.fireEvent("selectpage", this.pages[i]);
                            break;
                        }
                    }
                },
                "beforetransform": function(e) {
                    this._updating = true;
                    var page = this.page;
                    if(e.rotation) {
                        if(this.printProvider.layout.get("rotation")) {
                            page.setRotation(-e.object.rotation);
                        } else {
                            e.object.setFeature(page.feature);
                        }
                    } else if(e.center) {
                        page.setCenter(OpenLayers.LonLat.fromString(
                            e.center.toShortString()
                        ));
                    } else {
                        page.fit(e.object.box, {mode: "closest"});
                        var minScale = this.printProvider.scales.getAt(0);
                        var maxScale = this.printProvider.scales.getAt(
                            this.printProvider.scales.getCount() - 1);
                        var boxBounds = e.object.box.geometry.getBounds();
                        var pageBounds = page.feature.geometry.getBounds();
                        var tooLarge = page.scale === minScale &&
                            boxBounds.containsBounds(pageBounds);
                        var tooSmall = page.scale === maxScale &&
                            pageBounds.containsBounds(boxBounds);
                        if(tooLarge === true || tooSmall === true) {
                            this.updateBox();
                        }
                    }
                    delete this._updating;
                    return false;
                },
                "transformcomplete": this.updateBox,
                scope: this
            }
        });
    },

    /** private: method[fitPage]
     *  Fits the current print page to the map.
     */
    fitPage: function() {
        if(this.page) {
            this.page.fit(this.map, {mode: "screen"});
        }
    },

    /** private: method[updateBox]
     *  Updates the transformation box after setting a new scale or
     *  layout, or to fit the box to the extent feature after a tranform.
     */
    updateBox: function() {
        var page = this.page;
        this.control.active &&
            this.control.setFeature(page.feature, {rotation: -page.rotation});
    },

    /** private: method[onPageChange]
     *  Handler for a page's change event.
     */
    onPageChange: function(page, mods) {
        if(!this._updating) {
            this.control.active &&
                this.control.setFeature(page.feature, {rotation: -page.rotation});
        }
    }
});

/** api: ptype = gx_printextent */
Ext.preg("gx_printextent", GeoExt.plugins.PrintExtent);
