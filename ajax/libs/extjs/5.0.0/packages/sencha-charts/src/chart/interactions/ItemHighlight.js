/**
 * @class Ext.chart.interactions.ItemHighlight
 * @extends Ext.chart.interactions.Abstract
 *
 * The ItemHighlight interaction allows the user to highlight series items in the chart.
 */
Ext.define('Ext.chart.interactions.ItemHighlight', {

    extend: 'Ext.chart.interactions.Abstract',

    type: 'itemhighlight',
    alias: 'interaction.itemhighlight',

    config: {
        //@inheritdoc
        gestures: {
            tap: 'onHighlightGesture',
            mousemove: 'onMouseMoveGesture',
            mouseenter: 'onMouseEnterGesture',
            mouseleave: 'onMouseLeaveGesture',
            mousedown: 'onMouseDownGesture',
            mouseup: 'onMouseUpGesture'
        }
    },

    highlightItem: null,

    onMouseMoveGesture: function (e) {
        var me = this,
            item, tooltip, chart;

        if (me.isDragging) {
            if (me.tipItem) {
                me.tipItem.series.hideTip(me.tipItem);
                me.tipItem = null;
            }
        } else if (!me.highlightItem) {
            item = me.getItemForEvent(e);
            chart = me.getChart();
            chart.setHighlightItem(item);
            me.sync();

            if (this.isMousePointer) {
                if ( me.tipItem && (!item || me.tipItem.field !== item.field || me.tipItem.record !== item.record) ) {
                    me.tipItem.series.hideTip(me.tipItem);
                    me.tipItem = null;
                }
                if (item && (tooltip = item.series.getTooltip())) {
                    if (tooltip.trackMouse || !me.tipItem) {
                        item.series.showTip(item, e.getXY());
                    }
                    me.tipItem = item;
                }
            }
            return false;
        }
    },

    showTip: function (e, item) {
        item.series.showTip(item, e.getXY());
        this.tipItem = item;
    },

    onMouseEnterGesture: function () {
        this.isMousePointer = true;
    },

    onMouseLeaveGesture: function () {
        this.isMousePointer = false;
    },

    onMouseDownGesture: function () {
        this.isDragging = true;
    },

    onMouseUpGesture: function () {
        this.isDragging = false;
    },

    onHighlightGesture: function (e) {
        // A click/tap on an item makes its highlight sticky. It requires another click/tap to unhighlight.
        var me = this,
            item = me.getItemForEvent(e);
        if (me.highlightItem && item && (me.highlightItem.index === item.index)) {
            item = null;
        }
        me.highlightItem = item;
        me.getChart().setHighlightItem(item);
    }
});
