/**
 * @class Ext.chart.LegendItem
 * A single item of a legend (marker plus label)
 */
Ext.define('Ext.chart.LegendItem', {

    /* Begin Definitions */

    extend: 'Ext.draw.CompositeSprite',

    requires: ['Ext.chart.Shape'],

    /* End Definitions */

    // Controls Series visibility
    hiddenSeries: false,
    
    // These are cached for quick lookups
    label: undefined,
    
    // Position of the item, relative to the upper-left corner of the legend box
    x: 0,
    y: 0,
    zIndex: 500,

    // checks to make sure that a unit size follows the bold keyword in the font style value
    boldRe: /bold\s\d{1,}.*/i,

    constructor: function(config) {
        this.callParent(arguments);
        this.createLegend(config);
    },

    /**
     * Creates all the individual sprites for this legend item
     */
    createLegend: function(config) {
        var me = this,
            series = me.series,
            index = config.yFieldIndex;
            
        me.label = me.createLabel(config);
        me.createSeriesMarkers(config);
        
        me.setAttributes({
            hidden: false
        }, true);
        
        me.yFieldIndex = index;

        // Add event listeners
        me.on('mouseover', me.onMouseOver, me);
        me.on('mouseout',  me.onMouseOut,  me);
        me.on('mousedown', me.onMouseDown, me);
        
        if (!series.visibleInLegend(index)) {
            me.hiddenSeries = true;
            me.label.setAttributes({
               opacity: 0.5
            }, true);
        }

        // Relative to 0,0 at first so that the bbox is calculated correctly
        me.updatePosition({ x: 0, y: 0 }); 
    },
    
    /**
     * @private Retrieves text to be displayed as item label.
     */
    getLabelText: function() {
        var me = this,
            series = me.series,
            idx = me.yFieldIndex;

        function getSeriesProp(name) {
            var val = series[name];
            return (Ext.isArray(val) ? val[idx] : val);
        }
        
        return getSeriesProp('title') || getSeriesProp('yField');
    },
    
    /**
     * @private Creates label sprite.
     */
    createLabel: function(config) {
        var me = this,
            legend = me.legend;
        
        return me.add('label', me.surface.add({
            type: 'text',
            x: 20,
            y: 0,
            zIndex: (me.zIndex || 0) + 2,
            fill: legend.labelColor,
            font: legend.labelFont,
            text: me.getLabelText(),
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Creates Series marker Sprites.
     */
    createSeriesMarkers: function(config) {
        var me = this,
            index = config.yFieldIndex,
            series = me.series,
            seriesType = series.type,
            surface = me.surface,
            z = me.zIndex;

        // Line series - display as short line with optional marker in the middle
        if (seriesType === 'line' || seriesType === 'scatter') {
            if(seriesType === 'line') {
                var seriesStyle = Ext.apply(series.seriesStyle, series.style);
                me.drawLine(0.5, 0.5, 16.5, 0.5, z, seriesStyle, index);
            }
            
            if (series.showMarkers || seriesType === 'scatter') {
                var markerConfig = Ext.apply(series.markerStyle, series.markerConfig || {}, {
                    fill: series.getLegendColor(index)
                });
                me.drawMarker(8.5, 0.5, z, markerConfig);
            }
        }
        // All other series types - display as filled box
        else {
            me.drawFilledBox(12, 12, z, index);
        }
    },
    
    /**
     * @private Creates line sprite for Line series.
     */
    drawLine: function(fromX, fromY, toX, toY, z, seriesStyle, index) {
        var me = this,
            surface = me.surface,
            series = me.series;
        
        return me.add('line', surface.add({
            type: 'path',
            path: 'M' + fromX + ',' + fromY + 'L' + toX + ',' + toY,
            zIndex: (z || 0) + 2,
            "stroke-width": series.lineWidth,
            "stroke-linejoin": "round",
            "stroke-dasharray": series.dash,
            stroke: seriesStyle.stroke || series.getLegendColor(index) || '#000',
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Creates series-shaped marker for Line and Scatter series.
     */
    drawMarker: function(x, y, z, markerConfig) {
        var me = this,
            surface = me.surface,
            series = me.series;

        return me.add('marker', Ext.chart.Shape[markerConfig.type](surface, {
            fill: markerConfig.fill,
            x: x,
            y: y,
            zIndex: (z || 0) + 2,
            radius: markerConfig.radius || markerConfig.size,
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Creates box-shaped marker for all series but Line and Scatter.
     */
    drawFilledBox: function(width, height, z, index) {
        var me = this,
            surface = me.surface,
            series = me.series;
            
        return me.add('box', surface.add({
            type: 'rect',
            zIndex: (z || 0) + 2,
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: series.getLegendColor(index),
            style: {
                cursor: 'pointer'
            }
        }));
    },
    
    /**
     * @private Draws label in bold when mouse cursor is over the item.
     */
    onMouseOver: function() {
        var me = this;
        
        me.label.setStyle({
            'font-weight': 'bold'
        });
        me.series._index = me.yFieldIndex;
        me.series.highlightItem();
    },
    
    /**
     * @private Draws label in normal when mouse cursor leaves the item.
     */
    onMouseOut: function() {
        var me = this,
            legend = me.legend,
            boldRe = me.boldRe;

        me.label.setStyle({
            'font-weight': legend.labelFont && boldRe.test(legend.labelFont) ? 'bold' : 'normal'
        });
        me.series._index = me.yFieldIndex;
        me.series.unHighlightItem();
    },
    
    /**
     * @private Toggles Series visibility upon mouse click on the item.
     */
    onMouseDown: function() {
        var me = this,
            index = me.yFieldIndex;

        if (!me.hiddenSeries) {
            me.series.hideAll(index);
            me.label.setAttributes({
                opacity: 0.5
            }, true);
        } else {
            me.series.showAll(index);
            me.label.setAttributes({
                opacity: 1
            }, true);
        }
        me.hiddenSeries = !me.hiddenSeries; 
        me.legend.chart.redraw();
    },

    /**
     * Update the positions of all this item's sprites to match the root position
     * of the legend box.
     * @param {Object} relativeTo (optional) If specified, this object's 'x' and 'y' values will be used
     *                 as the reference point for the relative positioning. Defaults to the Legend.
     */
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            currentX = me.x,
            currentY = me.y,
            item, i, x, y, translate, o,
            relativeX, relativeY;
            
        if (!relativeTo) {
            relativeTo = me.legend;
        }
        
        relativeX = relativeTo.x;
        relativeY = relativeTo.y;
        for (i = 0; i < ln; i++) {
            translate = true;
            item = items[i];
            switch (item.type) {
                case 'text':
                    x = 20 + relativeX + currentX;
                    y = relativeY + currentY;
                    translate = false;
                    break;
                case 'rect':
                    x = relativeX + currentX;
                    y = relativeY + currentY - 6;
                    break;
                default:
                    x = relativeX + currentX;
                    y = relativeY + currentY;
            }
            
            o = {
                x: x,
                y: y
            };
            item.setAttributes(translate ? {
                translate: o
            } : o, true);
        }
    }
});
