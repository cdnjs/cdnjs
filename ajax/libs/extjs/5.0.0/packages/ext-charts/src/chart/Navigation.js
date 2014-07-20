/**
 * @class Ext.chart.Navigation
 *
 * Handles panning and zooming capabilities.
 *
 * Used as mixin by Ext.chart.Chart.
 */
Ext.define('Ext.chart.Navigation', {
    mixinId: 'navigation',

    /**
     * Zooms the chart to the specified selection range.
     * Can be used with a selection mask. For example:
     *
     *     items: {
     *         xtype: 'chart',
     *         animate: true,
     *         store: store1,
     *         mask: 'horizontal',
     *         listeners: {
     *             select: {
     *                 fn: function(me, selection) {
     *                     me.setZoom(selection);
     *                     me.mask.hide();
     *                 }
     *             }
     *         }
     *     }
     *
     * @param {Object} [zoomConfig] The config to set the zoom area to.
     * This object is then used on the axis {@link Ext.chart.axis.Axis#minimum} and {@link Ext.chart.axis.Axis#maximum} and then the chart is redrawn.
     * @param {Number} zoomConfig.x The x coordinate to zoom
     * @param {Number} zoomConfig.y The y coordinate to zoom
     * @param {Number} zoomConfig.width The width of the zoom area
     * @param {Number} zoomConfig.height The height of the zoom area
     */
    setZoom: function(zoomConfig) {
        var me = this,
            axesItems = me.axes.items,
            i, ln, axis,
            bbox = me.chartBBox,
            xScale = bbox.width,
            yScale = bbox.height,
            zoomArea = {
                x : zoomConfig.x - me.el.getX(),
                y : zoomConfig.y - me.el.getY(),
                width : zoomConfig.width,
                height : zoomConfig.height
            },
            zoomer, ends, from, to, store, count, step, length, horizontal;

        for (i = 0, ln = axesItems.length; i < ln; i++) {
            axis = axesItems[i];
            horizontal = (axis.position == 'bottom' || axis.position == 'top');
            if (axis.type == 'Category') {
                if (!store) {
                    store = me.getChartStore();
                    count = store.data.items.length;
                }
                zoomer = zoomArea;
                length = axis.length;
                step = Math.round(length / count);
                if (horizontal) {
                    from = (zoomer.x ? Math.floor(zoomer.x / step) + 1 : 0);
                    to = (zoomer.x + zoomer.width) / step;
                } else {
                    from = (zoomer.y ? Math.floor(zoomer.y / step) + 1 : 0);
                    to = (zoomer.y + zoomer.height) / step;
                }
            }
            else {
                zoomer = {
                    x : zoomArea.x / xScale,
                    y : zoomArea.y / yScale,
                    width : zoomArea.width / xScale,
                    height : zoomArea.height / yScale
                };
                ends = axis.calcEnds();
                if (horizontal) {
                    from = (ends.to - ends.from) * zoomer.x + ends.from;
                    to = (ends.to - ends.from) * zoomer.width + from;
                } else {
                    to = (ends.to - ends.from) * (1 - zoomer.y) + ends.from;
                    from = to - (ends.to - ends.from) * zoomer.height;
                }
            }
            axis.minimum = from;
            axis.maximum = to;
            if (horizontal) {
                if (axis.doConstrain && me.maskType != 'vertical') {
                    axis.doConstrain();
                }
            }
            else {
                if (axis.doConstrain && me.maskType != 'horizontal') {
                    axis.doConstrain();
                }
            }
        }
        me.redraw(false);
    },

    /**
     * Restores the zoom to the original value. This can be used to reset
     * the previous zoom state set by `setZoom`. For example:
     *
     *     myChart.restoreZoom();
     */
    restoreZoom: function() {
        var me = this,
            axesItems = me.axes.items,
            i, ln, axis;

        me.setSubStore(null);
        for (i = 0, ln = axesItems.length; i < ln; i++) {
            axis = axesItems[i];
            delete axis.minimum;
            delete axis.maximum;
        }
        me.redraw(false);
    }

});
