/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Private record store class which takes the place of the view's data store to provide a grouped
 * view of the data when the Grouping feature is used.
 * 
 * Relays granular mutation events from the underlying store as refresh events to the view.
 * 
 * On mutation events from the underlying store, updates the summary rows by firing update events on the corresponding
 * summary records.
 * @private
 */
Ext.define('Ext.grid.feature.GroupStore', {
    extend: 'Ext.util.Observable',

    isStore: true,

    constructor: function(groupingFeature, store) {
        var me = this;

        me.superclass.constructor.apply(me, arguments);
        me.groupingFeature = groupingFeature;
        me.bindStore(store);
        me.processStore(store);
        me.view.dataSource = me;
    },

    bindStore: function(store) {
        var me = this;

        if (me.store) {
            Ext.destroy(me.storeListeners);
            me.store = null;
        }
        if (store) {
            me.storeListeners = store.on({
                bulkremove: me.onBulkRemove,
                add: me.onAdd,
                update: me.onUpdate,
                refresh: me.onRefresh,
                clear: me.onClear,
                scope: me,
                destroyable: true
            });
            me.store = store;
        }
    },

    processStore: function(store) {
        var me = this,
            groups = store.getGroups(),
            groupCount = groups.length,
            i,
            group,
            groupPlaceholder,
            data = me.data,
            oldGroupCache = me.groupingFeature.groupCache,
            groupCache = me.groupingFeature.clearGroupCache(),
            collapseAll = me.groupingFeature.startCollapsed;

        if (data) {
            data.clear();
        } else {
            data = me.data = new Ext.util.MixedCollection(false, Ext.data.Store.recordIdFn);
        }

        if (store.getCount()) {

            // Upon first process of a loaded store, clear the "always" collapse" flag
            me.groupingFeature.startCollapsed = false;

            for (i = 0; i < groupCount; i++) {

                // group contains eg
                // { children: [childRec0, childRec1...], name: <group field value for group> }
                group = groups[i];

                // Cache group information by group name
                groupCache[group.name] = group;
                group.isCollapsed = collapseAll || (oldGroupCache[group.name] && oldGroupCache[group.name].isCollapsed);

                // If group is collapsed, then represent it by one dummy row which is never visible, but which acts
                // as a start and end group trigger.
                if (group.isCollapsed) {
                    group.placeholder = groupPlaceholder = new store.model(null, 'group-' + group.name + '-placeholder');
                    groupPlaceholder.set(me.getGroupField(), group.name);
                    groupPlaceholder.rows = groupPlaceholder.children = group.children;
                    groupPlaceholder.isCollapsedPlaceholder = true;
                    data.add(groupPlaceholder);
                }

                // Expanded group - add the group's child records.
                else {
                    data.insert(me.data.length, group.children);
                }
            }
        }
    },

    isCollapsed: function(name) {
        return this.groupingFeature.groupCache[name].isCollapsed; 
    },

    isInCollapsedGroup: function(record) {
        var groupData;

        if (this.store.isGrouped() && (groupData = this.groupingFeature.groupCache[record.get(this.getGroupField())])) {
            return groupData.isCollapsed || false;
        }
        return false;
    },

    getCount: function() {
        return this.data.getCount();
    },

    getTotalCount: function() {
        return this.data.getCount();
    },

    // This class is only created for fully loaded, non-buffered stores
    rangeCached: function(start, end) {
        return end < this.getCount();
    },

    getRange: function(start, end, options) {
        var result = this.data.getRange(start, end);

        if (options && options.callback) {
            options.callback.call(options.scope || this, result, start, end, options);
        }
        return result;
    },

    getAt: function(index) {
        return this.getRange(index, index)[0];
    },

    getById: function(id) {
        return this.store.getById(id);
    },

    expandGroup: function(group) {
        var me = this,
            startIdx;

        if (typeof group === 'string') {
            group = me.groupingFeature.groupCache[group];
        }

        if (group && group.children.length && (startIdx = me.indexOf(group.children[0], true, true)) !== -1) {

            // Any event handlers must see the new state
            group.isCollapsed = false;
            me.isExpandingOrCollapsing = 1;
            
            // Remove the collapsed group placeholder record
            me.data.removeAt(startIdx);
            me.fireEvent('bulkremove', me, [me.getGroupPlaceholder(group)], [startIdx]);

            // Insert the child records in its place
            me.data.insert(startIdx, group.children);
            me.fireEvent('add', me, group.children, startIdx);

            me.fireEvent('groupexpand', me, group);
            me.isExpandingOrCollapsing = 0;
        }
    },

    collapseGroup: function(group) {
        var me = this,
            startIdx,
            placeholder,
            i, j, len,
            removeIndices;

        if (typeof group === 'string') {
            group = me.groupingFeature.groupCache[group];
        }

        if (group && (len = group.children.length) && (startIdx = me.indexOf(group.children[0], true)) !== -1) {

            // Any event handlers must see the new state
            group.isCollapsed = true;
            me.isExpandingOrCollapsing = 2;

            // Remove the group child records
            me.data.removeRange(startIdx, len);

            // Indices argument is mandatory and used by views - we MUST build it.
            removeIndices = new Array(len);
            for (i = 0, j = startIdx; i < len; i++, j++) {
                removeIndices[i] = j;
            }
            me.fireEvent('bulkremove', me, group.children, removeIndices);

            // Insert a placeholder record in their place
            me.data.insert(startIdx, placeholder = me.getGroupPlaceholder(group));
            me.fireEvent('add', me, [placeholder], startIdx);

            me.fireEvent('groupcollapse', me, group);
            me.isExpandingOrCollapsing = 0;
        }
    },

    getGroupPlaceholder: function(group) {
        if (!group.placeholder) {
            var groupPlaceholder = group.placeholder = new this.store.model(null, 'group-' + group.name + '-placeholder');
            groupPlaceholder.set(this.getGroupField(), group.name);
            groupPlaceholder.rows = groupPlaceholder.children = group.children;
            groupPlaceholder.isCollapsedPlaceholder = true;
        }
        return group.placeholder;
    },

    // Find index of record in group store.
    // If it's in a collapsed group, then it's -1, not present
    // Otherwise, loop through groups keeping tally of intervening records.
    indexOf: function(record, viewOnly, includeCollapsed) {
        var me = this,
            groups,
            groupCount,
            i,
            group,
            groupIndex,
            result = 0;

        if (record && (includeCollapsed || !me.isInCollapsedGroup(record))) {
            groups = me.store.getGroups();
            groupCount = groups.length;
            for (i = 0; i < groupCount; i++) {

                // group contains eg
                // { children: [childRec0, childRec1...], name: <group field value for group> }
                group = groups[i];
                if (group.name === this.store.getGroupString(record)) {
                    groupIndex = Ext.Array.indexOf(group.children, record);
                    return result + groupIndex;
                }

                result += (viewOnly && me.isCollapsed(group.name)) ? 1 : group.children.length;
            }
        }
        return -1;
    },

    /**
     * Get the index within the entire dataset. From 0 to the totalCount.
     *
     * Like #indexOf, this method is effected by filtering.
     *
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOfTotal: function(record) {
        var index = record.index;
        if (index || index === 0) {
            return index;
        }
        return this.istore.ndexOf(record);
    },

    onRefresh: function(store) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onBulkRemove: function(store, records, indices) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onClear: function(store, records, startIndex) {
        this.processStore(this.store);
        this.fireEvent('clear', this);
    },

    onAdd: function(store, records, startIndex) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onUpdate: function(store, record, operation, modifiedFieldNames) {
        var me = this,
            groupInfo = me.groupingFeature.getRecordGroup(record),
            firstRec, lastRec;

        // The grouping field value has been modified.
        // This could either move a record from one group to another, or introduce a new group.
        // Either way, we have to refresh the grid
        if (store.isGrouped()) {
            if (modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, me.groupingFeature.getGroupField())) {
                return me.onRefresh(me.store);
            }

            // Fire an update event on the collapsed group placeholder record
            if (groupInfo.isCollapsed) {
                me.fireEvent('update', me, groupInfo.placeholder);
            }

            // Not in a collapsed group, fire update event on the modified record
            // and, if in a grouped store, on the first and last records in the group.
            else {
                Ext.suspendLayouts();

                // Propagate the record's update event
                me.fireEvent('update', me, record, operation, modifiedFieldNames);

                // Fire update event on first and last record in group (only once if a single row group)
                // So that custom header TPL is applied, and the summary row is updated
                firstRec = groupInfo.children[0];
                lastRec = groupInfo.children[groupInfo.children.length - 1];

                // Do not pass modifiedFieldNames so that the TableView's shouldUpdateCell call always returns true.
                if (firstRec !== record) {
                    me.fireEvent('update', me, firstRec, 'edit');
                }
                if (lastRec !== record && lastRec !== firstRec) {
                    me.fireEvent('update', me, lastRec, 'edit');
                }
                Ext.resumeLayouts(true);
            }
        } else {
            // Propagate the record's update event
            me.fireEvent('update', me, record, operation, modifiedFieldNames);
        }
    }
});