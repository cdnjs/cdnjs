/**
 * @private
 */
Ext.define('Ext.util.GroupCollection', {
    extend: 'Ext.util.Collection',
    
    requires: [
        'Ext.util.Group',

        // Since Collection uses sub-collections of various derived types we step up to
        // list all the requirements of Collection. The idea being that instead of a
        // "requires" of Ext.util.Collection (which cannot pull everything) you instead
        // do a "requires" of Ext.util.GroupCollection and it will.
        'Ext.util.SorterCollection',
        'Ext.util.FilterCollection'
    ],

    isGroupCollection: true,

    config: {
        itemRoot: null
    },

    observerPriority: -100,

    //-------------------------------------------------------------------------
    // Calls from the source Collection:

    onCollectionAdd: function (source, details) {
        this.addItemsToGroups(source, details.items);
    },

    onCollectionBeforeItemChange: function (source, details) {
        var me = this,
            item = details.item,
            newKey = source.getKey(item);

        // Drop the next add, remove and updatekey event
        me.onCollectionAdd =
        me.onCollectionRemove =
        me.onCollectionUpdateKey = null;

        me.syncItemGrouping(source, item, newKey, details.oldKey);
    },

    onCollectionBeginUpdate: function () {
        this.beginUpdate();
    },

    onCollectionEndUpdate: function () {
        this.endUpdate();
    },

    onCollectionItemChange: function (source, details) {
        delete this.onCollectionAdd;
        delete this.onCollectionRemove;
        delete this.onCollectionUpdateKey;
    },

    onCollectionRefresh: function (source) {
        this.removeAll();
        this.addItemsToGroups(source, source.items);
    },

    onCollectionRemove: function (source, details) {
        var me = this,
            entries = me.groupItems(source, details.items, false),
            entry, group, i, n, removeGroups;

        for (i = 0, n = entries.length; i < n; ++i) {
            group = (entry = entries[i]).group;

            if (group) {
                group.remove(entry.items);
                if (!group.length) {
                    (removeGroups || (removeGroups = [])).push(group);
                }
            }
        }

        if (removeGroups) {
            me.remove(removeGroups);
        }
    },

    // If the SorterCollection instance is not changing, the Group will react to
    // changes inside the SorterCollection, but if the instance changes we need
    // to sync the Group to the new SorterCollection.
    onCollectionSort: function (source) {
        // sorting the collection effectively sorts the items in each group...
        var me = this,
            sorters = source.getSorters(),
            items = me.items,
            length = me.length,
            i, group;

        for (i = 0; i < length; ++i) {
            group = items[i];
            if (group.getSorters() !== sorters) {
                group.setSorters(sorters);
            }
        }
    },

    onCollectionUpdateKey: function (source, details) {
        this.syncItemGrouping(source, details.item, details.newKey, details.oldKey);
    },

    //-------------------------------------------------------------------------
    // Private

    addItemsToGroups: function (source, items) {
        var me = this,
            entries = me.groupItems(source, items, true),
            entry, i, n;

        for (i = 0, n = entries.length; i < n; ++i) {
            entry = entries[i];
            entry.group.add(entry.items);
        }
    },

    groupItems: function (source, items, adding) {
        var me = this,
            byGroup = {},
            entries = [],
            grouper = source.getGrouper(),
            groupKeys = me.itemGroupKeys,
            entry, group, groupKey, i, item, itemKey, n, newGroups;

        for (i = 0, n = items.length; i < n; ++i) {
            groupKey = grouper.getGroupString(item = items[i]);
            itemKey = source.getKey(item);

            if (adding) {
                (groupKeys || (me.itemGroupKeys = groupKeys = {}))[itemKey] = groupKey;
            } else if (groupKeys) {
                delete groupKeys[itemKey];
            }

            if (!(entry = byGroup[groupKey])) {
                if (!(group = me.getByKey(groupKey)) && adding) {
                    (newGroups || (newGroups = [])).push(group = me.createGroup(source, groupKey));
                }

                entries.push(byGroup[groupKey] = entry = {
                    group: group,
                    items: []
                });
            }

            entry.items.push(item);
        }

        if (newGroups) {
            me.add(newGroups);
        }

        return entries;
    },

    syncItemGrouping: function (source, item, itemKey, oldKey) {
        var me = this,
            itemGroupKeys = me.itemGroupKeys || (me.itemGroupKeys = {}),
            grouper = source.getGrouper(),
            groupKey = grouper.getGroupString(item),
            removeGroups = 0,
            addGroups, group, oldGroup, oldGroupKey;

        if (oldKey) {
            oldGroupKey = itemGroupKeys[oldKey];
            delete itemGroupKeys[oldKey];
        } else {
            oldGroupKey = itemGroupKeys[itemKey];
        }

        itemGroupKeys[itemKey] = groupKey;

        if (!(group = me.get(groupKey))) {
            group = me.createGroup(source, groupKey);
            addGroups = [group];
        }

        if (group.get(itemKey) !== item) {
            group.add(item);
        } else {
            group.itemChanged(item);
        }

        if (groupKey !== oldGroupKey && (oldGroupKey === 0 || oldGroupKey)) {
            oldGroup = me.get(oldGroupKey);
            if (oldGroup) {
                oldGroup.remove(item);
                if (!oldGroup.length) {
                    removeGroups = [oldGroup];
                }
            }
        }

        if (addGroups) {
            me.splice(0, removeGroups, addGroups);
        } else if (removeGroups) {
            me.splice(0, removeGroups);
        }
    },
    
    createGroup: function(source, key) {
        var group = new Ext.util.Group({
            groupKey: key,
            rootProperty: this.getItemRoot(),
            sorters: source.getSorters()
        });
        return group;
    },
    
    getKey: function(item) {
        return item.getGroupKey();
    },

    getGroupByRecord: function(record) {
        var items = this.items,
            len = items.length,
            item, i;

        for (i = 0; i < len; i++) {
            item = items[i];
            if (item.indexOf(record)) {
                return item;
            }
        }

        return null;
    }
});
