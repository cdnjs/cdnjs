/**
 * @class Ext.chart.LegendBase
 */
Ext.define('Ext.chart.LegendBase', {
    extend: 'Ext.view.View',
    config: {
        tpl: [
            '<div class="', Ext.baseCSSPrefix, 'legend-container">',
                '<tpl for=".">',
                    '<div class="', Ext.baseCSSPrefix, 'legend-item">',
                        '<span ',
                            'class="', Ext.baseCSSPrefix, 'legend-item-marker {[ values.disabled ? Ext.baseCSSPrefix + \'legend-inactive\' : \'\' ]}" ',
                            'style="background:{mark};">',
                        '</span>{name}',
                    '</div>',
                '</tpl>',
            '</div>'
        ],
        nodeContainerSelector: 'div.' + Ext.baseCSSPrefix + 'legend-container',
        itemSelector: 'div.' + Ext.baseCSSPrefix + 'legend-item',
        docked: 'bottom'
    },

    setDocked: function (docked) {
        var panel = this.ownerCt,
            layout;

        this.docked = docked;

        switch (docked) {
            case 'top':
            case 'bottom':
                this.addCls('x-horizontal');
                layout = 'hbox';
                break;
            case 'left':
            case 'right':
                this.removeCls('x-horizontal');
                layout = 'vbox';
                break;
        }

        if (panel) {
            panel.setDocked(docked);
        }
    },

    setStore: function (store) {
        this.bindStore(store);
    },

    onItemClick: function (record, item, index, e) {
        this.callParent(arguments);
        this.toggleItem(index);
    }
});
