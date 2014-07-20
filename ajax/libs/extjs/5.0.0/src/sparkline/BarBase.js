/*
 * Base class for bar highlighting
 */
Ext.define('Ext.sparkline.BarBase', {
    extend: 'Ext.sparkline.Base',

    renderHighlight: function (region) {
        this.renderRegion(region, true);
    },

    renderGraph: function () {
        var me = this,
            values = me.values,
            canvas = me.canvas,
            regionShapes = me.regionShapes || (me.regionShapes = {}),
            shapes, ids, i, j;

        if (!me.callParent()) {
            return;
        }
        for (i = values.length; i--;) {
            shapes = me.renderRegion(i);
            if (shapes) {
                if (Ext.isArray(shapes)) {
                    ids = [];
                    for (j = shapes.length; j--;) {
                        shapes[j].append();
                        ids.push(shapes[j].id);
                    }
                    regionShapes[i] = ids;
                } else {
                    shapes.append();
                    regionShapes[i] = shapes.id; // store just the shapeid
                }
            } else {
                // null value
                regionShapes[i] = null;
            }
        }
        // If mouse is over, add the highlight sprite
        if (me.currentPageXY) {
            me.currentRegion = null;
            me.updateDisplay();
        }
        canvas.render();
    }
});