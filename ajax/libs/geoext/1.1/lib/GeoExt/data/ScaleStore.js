/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/MapPanel.js
 * @require OpenLayers/Util.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = ScaleStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: ScaleStore
 *
 *      A store that contains a cache of available zoom levels.  The store can
 *      optionally be kept synchronized with an ``OpenLayers.Map`` or
 *      :class:`GeoExt.MapPanel` object.
 *
 *      Records have the following fields:
 *
 *      * level - ``Number``  The zoom level.
 *      * scale - ``Number`` The scale denominator.
 *      * resolution - ``Number`` The map units per pixel.
 */
GeoExt.data.ScaleStore = Ext.extend(Ext.data.Store, {

    /** api: config[map]
     *  ``OpenLayers.Map`` or :class:`GeoExt.MapPanel`
     *  Optional map or map panel from which to derive scale values.
     */
    map: null,

    /** private: method[constructor]
     *  Construct a ScaleStore from a configuration.  The ScaleStore accepts
     *  some custom parameters addition to the fields accepted by Ext.Store.
     */
    constructor: function(config) {
        var map = (config.map instanceof GeoExt.MapPanel ? config.map.map : config.map);
        delete config.map;
        config = Ext.applyIf(config, {reader: new Ext.data.JsonReader({}, [
            "level",
            "resolution",
            "scale"
        ])});

        GeoExt.data.ScaleStore.superclass.constructor.call(this, config);

        if (map) {
            this.bind(map);
        }
    },

    /** api: method[bind]
     *  :param map: :class:`GeoExt.MapPanel` or ``OpenLayers.Map`` Panel or map
     *      to which we should bind.
     *  
     *  Bind this store to a map; that is, maintain the zoom list in sync with
     *  the map's current configuration.  If the map does not currently have a
     *  set scale list, then the store will remain empty until the map is
     *  configured with one.
     */
    bind: function(map, options) {
        this.map = (map instanceof GeoExt.MapPanel ? map.map : map);
        this.map.events.register('changebaselayer', this, this.populateFromMap);
        if (this.map.baseLayer) {
            this.populateFromMap();
        } else {
            this.map.events.register('addlayer', this, this.populateOnAdd);
        }
    },

    /** api: method[unbind]
     *  Un-bind this store from the map to which it is currently bound.  The
     *  currently stored zoom levels will remain, but no further changes from
     *  the map will affect it.
     */
    unbind: function() {
        if (this.map) {
            this.map.events.unregister('addlayer', this, this.populateOnAdd);
            this.map.events.unregister('changebaselayer', this, this.populateFromMap);
            delete this.map;
        }
    },

    /** private: method[populateOnAdd]
     *  :param evt: ``Object``
     *  
     *  This method handles the case where we have bind() called on a
     *  not-fully-configured map so that the zoom levels can be detected when a
     *  baselayer is finally added.
     */
    populateOnAdd: function(evt) {
        if (evt.layer.isBaseLayer) {
            this.populateFromMap();
            this.map.events.unregister('addlayer', this, this.populateOnAdd);
        }
    },

    /** private: method[populateFromMap]
     *  This method actually loads the zoom level information from the
     *  OpenLayers.Map and converts it to Ext Records.
     */
    populateFromMap: function() {
        var zooms = [];
        var resolutions = this.map.baseLayer.resolutions;
        var units = this.map.baseLayer.units;

        for (var i=resolutions.length-1; i >= 0; i--) {
            var res = resolutions[i];
            zooms.push({
                level: i,
                resolution: res,
                scale: OpenLayers.Util.getScaleFromResolution(res, units)
            });
        }

        this.loadData(zooms);
    },

    /** private: method[destroy]
     */
    destroy: function() {
        this.unbind();
        GeoExt.data.ScaleStore.superclass.destroy.apply(this, arguments);
    }
});
