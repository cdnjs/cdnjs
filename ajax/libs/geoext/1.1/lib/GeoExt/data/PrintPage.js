/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Feature/Vector.js
 * @require OpenLayers/Geometry.js
 * @require OpenLayers/Util.js
 * @require OpenLayers/BaseTypes/Bounds.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = PrintPage
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: PrintPage
 * 
 *  Provides a representation of a print page for
 *  :class:`GeoExt.data.PrintProvider`. The extent of the page is stored as
 *  ``OpenLayers.Feature.Vector``. Widgets can use this to display the print
 *  extent on the map.
 */
GeoExt.data.PrintPage = Ext.extend(Ext.util.Observable, {
    
    /** api:config[printProvider]
     * :class:`GeoExt.data.PrintProvider` The print provider to use with
     * this page.
     */
    
    /** private: property[printProvider]
     *  :class:`GeoExt.data.PrintProvider`
     */
    printProvider: null,
    
    /** api: property[feature]
     *  ``OpenLayers.Feature.Vector`` Feature representing the page extent. To
     *  get the extent of the print page for a specific map, use
     *  ``getPrintExtent``.
     *  Read-only.
     */
    feature: null,
    
    /** api: property[center]
     *  ``OpenLayers.LonLat`` The current center of the page. Read-only.
     */
    center: null,
    
    /** api: property[scale]
     *  ``Ext.data.Record`` The current scale record of the page. Read-only.
     */
    scale: null,
    
    /** api: property[rotation]
     *  ``Float`` The current rotation of the page. Read-only.
     */
    rotation: 0,
    
    /** api:config[customParams]
     *  ``Object`` Key-value pairs of additional parameters that the
     *  printProvider will send to the print service for this page.
     */

    /** api: property[customParams]
     *  ``Object`` Key-value pairs of additional parameters that the
     *  printProvider will send to the print service for this page.
     */
    customParams: null,
    
    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        this.initialConfig = config;
        Ext.apply(this, config);
        
        if(!this.customParams) {
            this.customParams = {};
        }
        
        this.addEvents(
            /** api: event[change]
             *  Triggered when any of the page properties have changed
             *  
             *  Listener arguments:
             *
             *  * printPage - :class:`GeoExt.data.PrintPage` this printPage
             *  * modifications - ``Object`` Object with one or more of
             *      ``scale``, ``center`` and ``rotation``, notifying
             *      listeners of the changed properties.
             */
            "change"
        );

        GeoExt.data.PrintPage.superclass.constructor.apply(this, arguments);

        this.feature = new OpenLayers.Feature.Vector(
            OpenLayers.Geometry.fromWKT("POLYGON((-1 -1,1 -1,1 1,-1 1,-1 -1))"));

        if(this.printProvider.capabilities) {
            this.setScale(this.printProvider.scales.getAt(0));
        } else {
            this.printProvider.on({
                "loadcapabilities": function() {
                    this.setScale(this.printProvider.scales.getAt(0));
                },
                scope: this,
                single: true
            });
        }

        this.printProvider.on({
            "layoutchange": this.onLayoutChange,
            scope: this
        });
    },
    
    /** api: method[getPrintExtent]
     *  :param map: ``OpenLayers.Map`` or :class:`GeoExt.MapPanel` the map to
     *      get the print extent for. 
     *  :returns: ``OpenLayers.Bounds``
     *
     *  Gets this page's print extent for the provided map.
     */
    getPrintExtent: function(map) {
        map = map instanceof GeoExt.MapPanel ? map.map : map;
        return this.calculatePageBounds(this.scale, map.getUnits());
    },

    /** api: method[setScale]
     *  :param scale: ``Ext.data.Record`` The new scale record.
     *  :param units: ``String`` map units to use for the scale calculation.
     *      Optional if the ``feature`` is on a layer which is added to a map.
     *      If not found, "dd" will be assumed.
     * 
     *  Updates the page geometry to match a given scale. Since this takes the
     *  current layout of the printProvider into account, this can be used to
     *  update the page geometry feature when the layout has changed.
     */
    setScale: function(scale, units) {
        var bounds = this.calculatePageBounds(scale, units);
        var geom = bounds.toGeometry();
        var rotation = this.rotation;
        if(rotation != 0) {
            geom.rotate(-rotation, geom.getCentroid());
        }
        this.updateFeature(geom, {scale: scale});
    },
    
    /** api: method[setCenter]
     *  :param center: ``OpenLayers.LonLat`` The new center.
     * 
     *  Moves the page extent to a new center.
     */
    setCenter: function(center) {
        var geom = this.feature.geometry;
        var oldCenter = geom.getBounds().getCenterLonLat();
        var dx = center.lon - oldCenter.lon;
        var dy = center.lat - oldCenter.lat;
        geom.move(dx, dy);
        this.updateFeature(geom, {center: center});
    },
    
    /** api: method[setRotation]
     *  :param rotation: ``Float`` The new rotation.
     *  :param force: ``Boolean`` If set to true, the rotation will also be
     *      set when the layout does not support it. Default is false.
     *  
     *  Sets a new rotation for the page geometry.
     */
    setRotation: function(rotation, force) {
        if(force || this.printProvider.layout.get("rotation") === true) {
            var geom = this.feature.geometry;
            geom.rotate(this.rotation - rotation, geom.getCentroid());
            this.updateFeature(geom, {rotation: rotation});
        }
    },
    
    /** api: method[fit]
     *  :param fitTo: :class:`GeoExt.MapPanel` or ``OpenLayers.Map`` or ``OpenLayers.Feature.Vector``
     *      The map or feature to fit the page to.
     *  :param options: ``Object`` Additional options to determine how to fit
     *
     *  Fits the page layout to a map or feature extent. If the map extent has
     *  not been centered yet, this will do nothing.
     * 
     *  Available options:
     *
     *  * mode - ``String`` How to calculate the print extent? If "closest",
     *    the closest matching print extent will be chosen. If "printer", the
     *    chosen print extent will be the closest one that can show the entire
     *    ``fitTo`` extent on the printer. If "screen", it will be the closest
     *    one that is entirely visible inside the ``fitTo`` extent. Default is
     *    "printer".
     * 
     */
    fit: function(fitTo, options) {
        options = options || {};
        var map = fitTo, extent;
        if(fitTo instanceof GeoExt.MapPanel) {
            map = fitTo.map;
        } else if(fitTo instanceof OpenLayers.Feature.Vector) {
            map = fitTo.layer.map;
            extent = fitTo.geometry.getBounds();
        }
        if(!extent) {
            extent = map.getExtent();
            if(!extent) {
                return;
            }
        }
        this._updating = true;
        var center = extent.getCenterLonLat();
        this.setCenter(center);
        var units = map.getUnits();
        var scale = this.printProvider.scales.getAt(0);
        var closest = Number.POSITIVE_INFINITY;
        var mapWidth = extent.getWidth();
        var mapHeight = extent.getHeight();
        this.printProvider.scales.each(function(rec) {
            var bounds = this.calculatePageBounds(rec, units);
            if (options.mode == "closest") {
                var diff = 
                    Math.abs(bounds.getWidth() - mapWidth) +
                    Math.abs(bounds.getHeight() - mapHeight);
                if (diff < closest) {
                    closest = diff;
                    scale = rec;
                }
            } else {
                var contains = options.mode == "screen" ?
                    !extent.containsBounds(bounds) :
                    bounds.containsBounds(extent);
                if (contains || (options.mode == "screen" && !contains)) {
                    scale = rec;
                }
                return contains;
            }
        }, this);
        this.setScale(scale, units);
        delete this._updating;
        this.updateFeature(this.feature.geometry, {
            center: center,
            scale: scale
        });
    },

    /** private: method[updateFeature]
     *  :param geometry: ``OpenLayers.Geometry`` New geometry for the feature.
     *      If not provided, the existing geometry will be left unchanged.
     *  :param mods: ``Object`` An object with one or more of ``scale``,
     *      ``center`` and ``rotation``, reflecting the page properties to
     *      update.
     *      
     *  Updates the page feature with a new geometry and notifies listeners
     *  of changed page properties.
     */
    updateFeature: function(geometry, mods) {
        var f = this.feature;
        var modified = f.geometry !== geometry;
        geometry.id = f.geometry.id;
        f.geometry = geometry;
        
        if(!this._updating) {
            for(var property in mods) {
                if(mods[property] === this[property]) {
                    delete mods[property];
                } else {
                    this[property] = mods[property];
                    modified = true;
                }
            }
            Ext.apply(this, mods);
            
            f.layer && f.layer.drawFeature(f);
            modified && this.fireEvent("change", this, mods);
        }
    },    
    
    /** private: method[calculatePageBounds]
     *  :param scale: ``Ext.data.Record`` Scale record to calculate the page
     *      bounds for.
     *  :param units: ``String`` Map units to use for the scale calculation.
     *      Optional if ``feature`` is added to a layer which is added to a
     *      map. If not provided, "dd" will be assumed.
     *  :return: ``OpenLayers.Bounds``
     *  
     *  Calculates the page bounds for a given scale.
     */
    calculatePageBounds: function(scale, units) {
        var s = scale.get("value");
        var f = this.feature;
        var geom = this.feature.geometry;
        var center = geom.getBounds().getCenterLonLat();

        var size = this.printProvider.layout.get("size");
        var units = units ||
            (f.layer && f.layer.map && f.layer.map.getUnits()) ||
            "dd";
        var unitsRatio = OpenLayers.INCHES_PER_UNIT[units];
        var w = size.width / 72 / unitsRatio * s / 2;
        var h = size.height / 72 / unitsRatio * s / 2;
        
        return new OpenLayers.Bounds(center.lon - w, center.lat - h,
            center.lon + w, center.lat + h);
    },
    
    /** private: method[onLayoutChange]
     *  Handler for the printProvider's layoutchange event.
     */
    onLayoutChange: function() {
        if(this.printProvider.layout.get("rotation") === false) {
            this.setRotation(0, true);
        }
        // at init time the print provider triggers layoutchange
        // before loadcapabilities, i.e. before we set this.scale
        // to the first scale in the scales store, we need to
        // guard against that
        this.scale && this.setScale(this.scale);
    },
    
    /** private: method[destroy]
     */
    destroy: function() {
        this.printProvider.un("layoutchange", this.onLayoutChange, this);
    }

});
