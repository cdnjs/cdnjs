/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/LegendImage.js
 * @requires GeoExt/widgets/LayerLegend.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = UrlLegend
 */

/** api: (extends)
 * GeoExt/widgets/LayerLegend.js
 */

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: UrlLegend(config)
 *
 *      Show a legend image in a BoxComponent and make sure load errors are 
 *      dealt with.
 */
GeoExt.UrlLegend = Ext.extend(GeoExt.LayerLegend, {

    /** private: method[initComponent]
     *  Initializes the legend image component. 
     */
    initComponent: function() {
        GeoExt.UrlLegend.superclass.initComponent.call(this);
        this.add(new GeoExt.LegendImage({
            url: this.layerRecord.get("legendURL")
        }));
    },
    
    /** private: method[update]
     *  Private override
     */
    update: function() {
        GeoExt.UrlLegend.superclass.update.apply(this, arguments);
        this.items.get(1).setUrl(this.layerRecord.get("legendURL"));
    }

});

/** private: method[supports]
 *  Private override
 */
GeoExt.UrlLegend.supports = function(layerRecord) {
    return layerRecord.get("legendURL") == null ? 0 : 10;
};

/** api: legendtype = gx_urllegend */
GeoExt.LayerLegend.types["gx_urllegend"] = GeoExt.UrlLegend;

/** api: xtype = gx_urllegend */
Ext.reg('gx_urllegend', GeoExt.UrlLegend);
