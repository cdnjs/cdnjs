/**
 * A simple custom row expander that does not add a "+" / "-" column.
 */
Ext.define('ExecDashboard.ux.plugin.RowExpander', {
    extend: 'Ext.grid.plugin.RowExpander',

    alias: 'plugin.ux-rowexpander',

    rowBodyTpl: [
        '<div class="text-wrapper">',
            '<div class="news-data">',
                '<div class="news-paragraph">{paragraph}</div>',
                '<div class="news-toggle collapse"><span>COLLAPSE</span><img src="resources/icons/collapse-news.png"></div>',
            '</div>',
        '</div>'
    ],

    // don't add the expander +/- because we will use a custom one instead
    addExpander: Ext.emptyFn,

    addCollapsedCls: {
        fn: function(out, values, parent) {
            var me = this.rowExpander;

            if (!me.recordsExpanded[values.record.internalId]) {
                values.itemClasses.push(me.rowCollapsedCls);
            } else {
                values.itemClasses.push('x-grid-row-expanded');
            }
            this.nextTpl.applyOut(values, out, parent);
        },

        syncRowHeights: function(lockedItem, normalItem) {
            this.rowExpander.syncRowHeights(lockedItem, normalItem);
        },

        // We need a high priority to get in ahead of the outerRowTpl
        // so we can setup row data
        priority: 20000
    }
});
