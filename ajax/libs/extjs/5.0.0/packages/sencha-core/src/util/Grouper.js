/**
 * Represents a grouping of items. The grouper works in a similar fashion as the
 * `Ext.util.Sorter` except that groups must be able to extract a value by which all items
 * in the group can be collected. By default this is derived from the `property` config
 * but can be customized using the `groupFn` if necessary.
 *
 * All items with the same group value compare as equal. If the group values do not compare
 * equally, the sort can be controlled further by setting `sortProperty` or `sorterFn`.
 */
Ext.define('Ext.util.Grouper', {
    extend: 'Ext.util.Sorter',

    isGrouper: true,

    config: {
        /**
         * @cfg {Function} groupFn This function is called for each item in the collection
         * to determine the group to which it belongs. By default the `property` value is
         * used to group items.
         * @cfg {Object} groupFn.item The current item from the collection.
         * @cfg {String} groupFn.return The group identifier for the item.
         */
        groupFn: null,

        /**
         * @cfg {String} sortProperty You can set this configuration if you want the groups
         * to be sorted on something other then the group string returned by the `groupFn`.
         * This serves the same role as `property` on a normal `Ext.util.Sorter`.
         */
        sortProperty: null
    },

    constructor: function(config) {
        //<debug>
        if (config) {
            if (config.getGroupString) {
                Ext.Error.raise("Cannot set getGroupString - use groupFn instead");
            }
        }
        //</debug>
        this.callParent(arguments);
    },

    /**
     * Returns the value for grouping to be used.
     * @param {Ext.data.Model} item The Model instance
     * @return {String}
     */
    getGroupString: function (item) {
        var group = this._groupFn(item);
        return (group != null) ? String(group) : '';
    },

    sortFn: function (item1, item2) {
        var me = this,
            lhs = me._groupFn(item1),
            rhs = me._groupFn(item2),
            property = me._sortProperty, // Sorter's sortFn uses "_property"
            root = me._root,
            sorterFn = me._sorterFn,
            transform = me._transform;

        // Items with the same groupFn result must be equal... otherwise we sort them
        // by sorterFn or sortProperty.
        if (lhs === rhs) {
            return 0;
        }

        if (property || sorterFn) {
            if (sorterFn) {
                return sorterFn.call(this, item1, item2);
            }

            if (root) {
                item1 = item1[root];
                item2 = item2[root];
            }

            lhs = item1[property];
            rhs = item2[property];

            if (transform) {
                lhs = transform(lhs);
                rhs = transform(rhs);
            }
        }

        return (lhs > rhs) ? 1 : (lhs < rhs ? -1 : 0);
    },

    standardGroupFn: function (item) {
        var root = this._root;
        return (root ? item[root] : item)[this._property];
    },

    updateSorterFn: function () {
        // don't callParent here - we don't want to smash sortFn w/sorterFn
    },

    updateProperty: function () {
        // we don't callParent since that is related to sorterFn smashing sortFn
        if (!this.getGroupFn()) {
            this.setGroupFn(this.standardGroupFn);
        }
    }
});
