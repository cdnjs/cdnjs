Ext.define('Ext.chart.LegendBase', {
    extend: 'Ext.dataview.DataView',
    config: {
        itemTpl: [
            '<span class=\"', Ext.baseCSSPrefix, 'legend-item-marker {[ values.disabled ? Ext.baseCSSPrefix + \'legend-inactive\' : \'\' ]}\" style=\"background:{mark};\"></span>{name}'
        ],
        inline: true,

        // TODO: horizontalHeight and verticalHeight names look awkward;
        // TODO: they might be originally selected to prevent conflict with the Grid's property 'itemHeight'
        // TODO: (which would be a more appropriate name), but this isn't a grid, so the reasoning isn't clear.
        horizontalHeight: 48,
        verticalHeight: 150
    },

    constructor: function () {
        this.callParent(arguments);

        var scroller = this.getScrollable().getScroller(),
            onDrag = scroller.onDrag;
        scroller.onDrag = function (e) {
            e.stopPropagation();
            onDrag.call(this, e);
        };
    },

    doSetDocked: function (docked) {
        this.callParent(arguments);
        if (docked === 'top' || docked === 'bottom') {
            this.setLayout({type: 'hbox', pack: 'center'});
            this.setInline(true);
            // TODO: Remove this when possible
            this.setWidth(null);
            this.setHeight(this.getHorizontalHeight());
            if (this.getScrollable()) {
                this.setScrollable({direction: 'horizontal'});
            }
        } else {
            this.setLayout({pack: 'center'});
            this.setInline(false);
            // TODO: Remove this when possible
            this.setWidth(this.getVerticalWidth());
            this.setHeight(null);
            if (this.getScrollable()) {
                this.setScrollable({direction: 'vertical'});
            }
        }
    },

    setDocked: function (docked) {
        this.callParent(arguments);
        if (docked === 'top' || docked === 'bottom') {
            this.setLayout({type: 'hbox', pack: 'center'});
            this.setInline(true);
            this.setWidth(null);
            this.setHeight(this.getHorizontalHeight());
        } else {
            this.setLayout({pack: 'center'});
            this.setInline(false);
            this.setWidth(this.getVerticalWidth());
            this.setHeight(null);
        }
    },

    onItemTap: function (container, target, index, e) {
        this.callParent(arguments);
        this.toggleItem(index);
    }
});
