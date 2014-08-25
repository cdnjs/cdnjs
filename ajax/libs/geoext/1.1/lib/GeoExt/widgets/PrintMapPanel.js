/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @requires GeoExt/widgets/MapPanel.js
 * @include GeoExt/data/PrintProvider.js
 * @include GeoExt/data/PrintPage.js
 */
Ext.namespace("GeoExt");

/** api: (define)
 *  module = GeoExt
 *  class = PrintMapPanel
 */

/** api: (extends)
 * GeoExt/widgets/MapPanel.js
 */

/** api: example
 *  A map with a "Print..." button. If clicked, a dialog containing a
 *  PrintMapPanel will open, with a "Create PDF" button.
 * 
 *  .. code-block:: javascript
 *     
 *      var mapPanel = new GeoExt.MapPanel({
 *          renderTo: "map",
 *          layers: [new OpenLayers.Layer.WMS("Tasmania State Boundaries",
 *              "http://demo.opengeo.org/geoserver/wms",
 *              {layers: "topp:tasmania_state_boundaries"}, {singleTile: true})],
 *          center: [146.56, -41.56],
 *          zoom: 6,
 *          bbar: [{
 *              text: "Print...",
 *              handler: function() {
 *                  var printDialog = new Ext.Window({
 *                      autoHeight: true,
 *                      width: 350,
 *                      items: [new GeoExt.PrintMapPanel({
 *                          sourceMap: mapPanel,
 *                          printProvider: {
 *                              capabilities: printCapabilities
 *                          }
 *                      })],
 *                      bbar: [{
 *                          text: "Create PDF",
 *                          handler: function() {
 *                              printDialog.items.get(0).print();
 *                          }
 *                      }]
 *                  });
 *                  printDialog.show();
 *              }
 *          }]
 *      });
 */

/** api: constructor
 *  .. class:: PrintMapPanel
 * 
 *  A map panel that controls scale and center of a print page. Based on the
 *  current view (i.e. layers and extent) of a source map, this panel will be
 *  sized according to the aspect ratio of the print page. As the user zooms
 *  and pans in the :class:`GeoExt.PrintMapPanel`, the print page will update
 *  its scale and center accordingly. If the scale on the print page changes
 *  (e.g. by setting it using a combo box with a
 *  :class:`GeoExt.plugins.PrintPageField`), the extent of the
 *  :class:`GeoExt.PrintMapPanel` will be updated to match the page bounds.
 *  
 *  .. note:: The ``zoom``, ``center`` and ``extent`` config options will have
 *      no affect, as they will be determined by the ``sourceMap``.
 */
GeoExt.PrintMapPanel = Ext.extend(GeoExt.MapPanel, {
    
    /** api: config[map]
     *  ``Object`` Optional configuration for the ``OpenLayers.Map`` object
     *  that this PrintMapPanel creates. Useful e.g. to configure a map with a
     *  custom set of controls, or to add a ``preaddlayer`` listener for
     *  filtering out layer types that cannot be printed.
     */
    
    /** api: config[sourceMap]
     *  :class:`GeoExt.MapPanel` or ``OpenLayers.Map`` The map that is to be
     *  printed.
     */
    
    /** private: property[sourceMap]
     *  ``OpenLayers.Map``
     */
    sourceMap: null,
    
    /** api: config[printProvider]
     *  :class:`GeoExt.data.PrintProvider` or ``Object`` PrintProvider to use
     *  for printing. If an ``Object`` is provided, a new PrintProvider will
     *  be created and configured with the object.
     *  
     *  .. note:: The PrintMapPanel requires the printProvider's capabilities
     *    to be available upon initialization. This means that a PrintMapPanel
     *    configured with an ``Object`` as ``printProvider`` will only work
     *    when ``capabilities`` is provided in the printProvider's
     *    configuration object. If ``printProvider`` is provided as an instance
     *    of :class:`GeoExt.data.PrintProvider`, the capabilities must be
     *    loaded before PrintMapPanel initialization.
     */
    
    /** api: property[printProvider]
     *  :class:`GeoExt.data.PrintProvider` PrintProvider for this
     *  PrintMapPanel.
     */
    printProvider: null,
    
    /** api: property[printPage]
     *  :class:`GeoExt.data.PrintPage` PrintPage for this PrintMapPanel.
     *  Read-only.
     */
    printPage: null,
    
    /** api: config[limitScales]
     *  ``Boolean`` If set to true, the printPage cannot be set to scales that
     *  would generate a preview in this :class:`GeoExt.PrintMapPanel` with a
     *  completely different extent than the one that would appear on the
     *  printed map. Default is false.
     */
     
    /** api: property[previewScales]
     *  ``Ext.data.Store`` A data store with a subset of the printProvider's
     *  scales. By default, this contains all the scales of the printProvider.
     *  If ``limitScales`` is set to true, it will only contain print scales
     *  that can properly be previewed with this :class:`GeoExt.PrintMapPanel`.
     */
    previewScales: null,
    
    /** api: config[center]
     *  ``OpenLayers.LonLat`` or ``Array(Number)``  A location for the map
     *  center. Do not set, as this will be overridden with the ``sourceMap``
     *  center.
     */
    center: null,

    /** api: config[zoom]
     *  ``Number``  An initial zoom level for the map. Do not set, because the
     *  initial extent will be determined by the ``sourceMap``.
     */
    zoom: null,

    /** api: config[extent]
     *  ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map.
     *  Do not set, because the initial extent will be determined by the
     *  ``sourceMap``.
     */
    extent: null,
    
    /** private: property[currentZoom]
     *  ``Number``
     */
    currentZoom: null,
    
    /**
     * private: method[initComponent]
     * private override
     */
    initComponent: function() {
        if(this.sourceMap instanceof GeoExt.MapPanel) {
            this.sourceMap = this.sourceMap.map;
        }

        if (!this.map) {
            this.map = {};
        }
        Ext.applyIf(this.map, {
            projection: this.sourceMap.getProjection(),
            maxExtent: this.sourceMap.getMaxExtent(),
            maxResolution: this.sourceMap.getMaxResolution(),
            units: this.sourceMap.getUnits()
        });
        
        if(!(this.printProvider instanceof GeoExt.data.PrintProvider)) {
            this.printProvider = new GeoExt.data.PrintProvider(
                this.printProvider);
        }
        this.printPage = new GeoExt.data.PrintPage({
            printProvider: this.printProvider
        });
        
        this.previewScales = new Ext.data.Store();
        this.previewScales.add(this.printProvider.scales.getRange());

        this.layers = [];
        var layer;
        Ext.each(this.sourceMap.layers, function(layer) {
            layer.getVisibility() === true && this.layers.push(layer.clone());
        }, this);

        this.extent = this.sourceMap.getExtent();
        
        GeoExt.PrintMapPanel.superclass.initComponent.call(this);
    },
    
    /** private: method[bind]
     */
    bind: function() {
        this.printPage.on("change", this.fitZoom, this);
        this.printProvider.on("layoutchange", this.syncSize, this);
        this.map.events.register("moveend", this, this.updatePage);

        this.printPage.fit(this.sourceMap);

        if (this.initialConfig.limitScales === true) {
            this.on("resize", this.calculatePreviewScales, this);
            this.calculatePreviewScales();
        }
    },
    
    /** private: method[afterRender]
     *  Private method called after the panel has been rendered.
     */
    afterRender: function() {
        GeoExt.PrintMapPanel.superclass.afterRender.apply(this, arguments);
        this.syncSize();
        if (!this.ownerCt) {
            this.bind();
        } else {
            this.ownerCt.on({
                "afterlayout": {
                    fn: this.bind,
                    scope: this,
                    single: true
                }
            });
        }
    },
    
    /** private: method[adjustSize]
     *  :param width: ``Number`` If not provided or 0, initialConfig.width will
     *      be used.
     *  :param height: ``Number`` If not provided or 0, initialConfig.height
     *      will be used.
     *  Private override - sizing this component always takes the aspect ratio
     *  of the print page into account.
     */
    adjustSize: function(width, height) {        
        var printSize = this.printProvider.layout.get("size");
        var ratio = printSize.width / printSize.height;
        // respect width & height when sizing according to the print page's
        // aspect ratio - do not exceed either, but don't take values for
        // granted if container is configured with autoWidth or autoHeight.
        var ownerCt = this.ownerCt;
        var targetWidth = (ownerCt && ownerCt.autoWidth) ? 0 :
            (width || this.initialConfig.width);
        var targetHeight = (ownerCt && ownerCt.autoHeight) ? 0 :
            (height || this.initialConfig.height);
        if (targetWidth) {
            height = targetWidth / ratio;
            if (targetHeight && height > targetHeight) {
                height = targetHeight;
                width = height * ratio;
            } else {
                width = targetWidth;
            }
        } else if (targetHeight) {
            width = targetHeight * ratio;
            height = targetHeight;
        }

        return {width: width, height: height};
    },
    
    /** private: method[fitZoom]
     *  Fits this PrintMapPanel's zoom to the print scale.
     */
    fitZoom: function() {
        if (!this._updating && this.printPage.scale) {
            this._updating = true;
            var printBounds = this.printPage.getPrintExtent(this.map);
            this.currentZoom = this.map.getZoomForExtent(printBounds);
            this.map.zoomToExtent(printBounds);
            delete this._updating;
        }
    },

    /** private: method[updatePage]
     *  updates the print page to match this PrintMapPanel's center and scale.
     */
    updatePage: function() {
        if (!this._updating) {
            var zoom = this.map.getZoom();
            this._updating = true;
            if (zoom === this.currentZoom) {
                this.printPage.setCenter(this.map.getCenter());
            } else {
                this.printPage.fit(this.map);
            }
            delete this._updating;
            this.currentZoom = zoom;
        }
    },
    
    /** private: method[calculatePreviewScales]
     */
    calculatePreviewScales: function() {
        this.previewScales.removeAll();

        this.printPage.suspendEvents();
        var scale = this.printPage.scale;

        // group print scales by the zoom level they would be previewed at
        var viewSize = this.map.getSize();
        var scalesByZoom = {};
        var zooms = [];
        this.printProvider.scales.each(function(rec) {
            this.printPage.setScale(rec);
            var extent = this.printPage.getPrintExtent(this.map);
            var zoom = this.map.getZoomForExtent(extent);

            var idealResolution = Math.max(
                extent.getWidth() / viewSize.w,
                extent.getHeight() / viewSize.h
            );
            var resolution = this.map.getResolutionForZoom(zoom);
            // the closer to the ideal resolution, the better the fit
            var diff = Math.abs(idealResolution - resolution);
            if (!(zoom in scalesByZoom) || scalesByZoom[zoom].diff > diff) {
                scalesByZoom[zoom] = {
                    rec: rec,
                    diff: diff
                };
                zooms.indexOf(zoom) == -1 && zooms.push(zoom);
            }
        }, this);
        
        // add only the preview scales that closely fit print extents
        for (var i=0, ii=zooms.length; i<ii; ++i) {
            this.previewScales.add(scalesByZoom[zooms[i]].rec);
        }

        scale && this.printPage.setScale(scale);
        this.printPage.resumeEvents();

        if (scale && this.previewScales.getCount() > 0) {
            var maxScale = this.previewScales.getAt(0);
            var minScale = this.previewScales.getAt(this.previewScales.getCount()-1);
            if (scale.get("value") < minScale.get("value")) {
                this.printPage.setScale(minScale);
            } else if (scale.get("value") > maxScale.get("value")) {
                this.printPage.setScale(maxScale);
            }
        }

        this.fitZoom();
    },
    
    /** api: method[print]
     *  :param options: ``Object`` options for
     *      the :class:`GeoExt.data.PrintProvider` :: ``print``  method.
     *  
     *  Convenience method for printing the map, without the need to
     *  interact with the printProvider and printPage.
     */
    print: function(options) {
        this.printProvider.print(this.map, [this.printPage], options);
    },
    
    /** private: method[beforeDestroy]
     */
    beforeDestroy: function() {
        this.map.events.unregister("moveend", this, this.updatePage);
        this.printPage.un("change", this.fitZoom, this);
        this.printProvider.un("layoutchange", this.syncSize, this);
        GeoExt.PrintMapPanel.superclass.beforeDestroy.apply(this, arguments);
    }
});

/** api: xtype = gx_printmappanel */
Ext.reg('gx_printmappanel', GeoExt.PrintMapPanel); 

