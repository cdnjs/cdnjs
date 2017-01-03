/**
 * This abstract base class is used by grid filters that have a single
 * {@link Ext.data.Store#cfg-filters store filter}.
 * @protected
 */
Ext.define('Ext.grid.filters.filter.SingleFilter', {
    extend: 'Ext.grid.filters.filter.Base',

    constructor: function (config) {
        var me = this,
            statefulGrid, filter, value;

        me.callParent([config]);

        statefulGrid = me.grid.stateful;
        value = me.value;

        filter = me.getStoreFilter();

        if (filter) {
            // This filter was restored from stateful filters on the store so enforce it as active.
            me.active = true;
        } else {
            // Once we've reached this block, we know that this grid filter doesn't have a stateful filter, so if our
            // flag to begin saving future filter mutations is set we know that any configured filter must be nulled
            // out or it will replace our stateful filter.
            if (statefulGrid && me.store.saveStatefulFilters) {
                value = undefined;
            }

            // TODO: What do we mean by value === null ?
            me.active = !!value;

            // Now we're acting on user configs so let's not futz with any assumed settings.
            filter = me.createFilter({
                operator: me.operator,
                value: value
            });

            if (me.active) {
                me.addStoreFilter(filter);
            }
        }

        me.filter = filter;
    },

    activate: function (showingMenu) {
        if (showingMenu) {
            this.activateMenu();
        } else {
            this.addStoreFilter(this.filter);
        }
    },

    deactivate: function () {
        this.removeStoreFilter(this.filter);
    },

    onFilterRemove: function () {
        // Filters can be removed at any time, even before a column filter's menu has been created (i.e.,
        // store.clearFilter()).
        if (!this.menu || this.active) {
            this.active = false;
        }
    }
});
