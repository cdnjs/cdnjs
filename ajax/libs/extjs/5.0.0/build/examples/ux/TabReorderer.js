/**
 * This plugin allow you to reorder tabs of a TabPanel.
 */
Ext.define('Ext.ux.TabReorderer', {

    extend: 'Ext.ux.BoxReorderer',
    alias: 'plugin.tabreorderer',

    itemSelector: '.' + Ext.baseCSSPrefix + 'tab',

    init: function(tabPanel) {
        var me = this;
        
        me.callParent([tabPanel.getTabBar()]);

        // Ensure reorderable property is copied into dynamically added tabs
        tabPanel.onAdd = Ext.Function.createSequence(tabPanel.onAdd, me.onAdd);
    },

    onBoxReady: function() {
        var tabs,
            len,
            i = 0,
            tab;

        this.callParent(arguments);

        // Copy reorderable property from card into tab
        for (tabs = this.container.items.items, len = tabs.length; i < len; i++) {
            tab = tabs[i];
            if (tab.card) {
                tab.reorderable = tab.card.reorderable;
            }
        }
    },

    onAdd: function(card, index) {
        card.tab.reorderable = card.reorderable;
    },

    afterBoxReflow: function() {
        var me = this;

        // Cannot use callParent, this is not called in the scope of this plugin, but that of its Ext.dd.DD object
        Ext.ux.BoxReorderer.prototype.afterBoxReflow.apply(me, arguments);

        // Move the associated card to match the tab order
        if (me.dragCmp) {
            me.container.tabPanel.setActiveTab(me.dragCmp.card);
            me.container.tabPanel.move(me.startIndex, me.curIndex);
        }
    }
});