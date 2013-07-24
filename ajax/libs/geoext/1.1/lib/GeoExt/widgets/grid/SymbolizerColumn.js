/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/FeatureRenderer.js
 */

 /** api: (define)
  *  module = GeoExt.grid
  *  class = SymbolizerColumn
  *  base_link = `Ext.grid.Column <http://dev.sencha.com/deploy/dev/docs/?class=Ext.grid.Column>`_
  */

Ext.namespace('GeoExt.grid');

/** api: constructor
 *  .. class:: SymbolizerColumn(config)
 *
 *      Grid column for rendering a symbolizer or an array of symbolizers.
 */
GeoExt.grid.SymbolizerColumn = Ext.extend(Ext.grid.Column, {

    /** private: method[renderer]
     */ 
    renderer: function(value, meta) {
        if (value != null) {
            var id = Ext.id();
            window.setTimeout(function() {
                var ct = Ext.get(id);
                // ct for old field may not exist any more during a grid update
                if (ct) {
                    new GeoExt.FeatureRenderer({
                        symbolizers: value instanceof Array ? value : [value],
                        renderTo: ct
                    });
                }
            }, 0);
            meta.css = "gx-grid-symbolizercol";
            return '<div id="' + id + '"></div>';
        }
    }
});

/** api: xtype = gx_symbolizercolumn */
Ext.grid.Column.types.gx_symbolizercolumn = GeoExt.grid.SymbolizerColumn;
