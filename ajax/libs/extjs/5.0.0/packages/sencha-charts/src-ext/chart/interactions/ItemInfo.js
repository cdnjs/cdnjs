/**
 * The ItemInfo interaction allows displaying detailed information about a series data
 * point in a popup panel.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.AbstractChart#interactions interactions} config with the `iteminfo` type:
 *
 *     new Ext.chart.AbstractChart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'iteminfo',
 *             listeners: {
 *                 show: function(me, item, panel) {
 *                     panel.setHtml('Stock Price: $' + item.record.get('price'));
 *                 }
 *             }
 *         }]
 *     });
 */
Ext.define('Ext.chart.interactions.ItemInfo', {

    extend: 'Ext.chart.interactions.Abstract',

    type: 'iteminfo',
    alias: 'interaction.iteminfo',

    /**
     * @event show
     * Fires when the info panel is shown.
     * @param {Ext.chart.interactions.ItemInfo} this The interaction instance
     * @param {Object} item The item whose info is being displayed
     * @param {Ext.Panel} panel The panel for displaying the info
     */

    config: {
        /**
         * @cfg {Object} extjsGestures
         * Defines the gestures that should trigger the item info panel to be displayed in ExtJS.
         */
        extjsGestures: {
            'start' : { event: 'click',      handler: 'onInfoGesture'},
            'move'  : { event: 'mousemove',  handler: 'onInfoGesture'},
            'end'   : { event: 'mouseleave', handler: 'onInfoGesture'}
        }

        // TODO:ps The trigger above should be 'itemclick', not 'click'.
    },

    item: null,

    onInfoGesture: function (e, element) {
        var me = this,
            item = me.getItemForEvent(e),
            tooltip = item && item.series.tooltip;

        if (tooltip) {
            tooltip.onMouseMove.call(tooltip, e);            
        }
        if (item !== me.item) {
            if (item) {
                item.series.showTip(item);
            } else {
                me.item.series.hideTip(me.item);
            }
            me.item = item;
        }
        return false;
    }

});
