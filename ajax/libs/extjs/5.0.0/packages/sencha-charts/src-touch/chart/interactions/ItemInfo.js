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
         * @cfg {Object} gestures
         * Defines the gestures that should trigger the item info panel to be displayed.
         */
        gestures: {
            'start' : { event: 'tap', handler: 'onInfoGesture'}
        },

        // TODO:ps The trigger above should be 'itemtap', not 'tap'.

        /**
         * @cfg {Object} panel
         * An optional set of configuration overrides for the {@link Ext.Panel} that gets
         * displayed. This object will be merged with the default panel configuration.
         */
        panel: {
            modal: true,
            centered: true,
            width: 300,
            height: 200,
            styleHtmlContent: true,
            scrollable: 'vertical',
            hideOnMaskTap: true,
            fullscreen: false,
            hidden: false,
            zIndex: 30
        }
    },

    item: null,

    applyPanel: function (panel, oldPanel) {
        return Ext.factory(panel, 'Ext.Panel', oldPanel);
    },

    updatePanel: function (panel, oldPanel) {
        if (panel) {
            panel.on('hide', "reset", this);
        }
        if (oldPanel) {
            oldPanel.un('hide', "reset", this);
        }
    },

    onInfoGesture: function (e, element) {
        var me = this,
            panel = me.getPanel(),
            item = me.getItemForEvent(e);
        if (item) {
            me.item = item;
            me.fireEvent('show', me, item, panel);
            Ext.Viewport.add(panel);
            panel.show('pop');
            item.series.setAttributesForItem(item, { highlighted: true });
            me.sync();
        }
        return false;
    },

    reset: function () {
        var me = this,
            item = me.item;
        if (item) {
            item.series.setAttributesForItem(item, { highlighted: false });
            delete me.item;
            me.sync();
        }
    }
});
