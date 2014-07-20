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

    // Number of records to load into a buffered grid before it has been bound to a view of known size
    defaultViewSize: 100,

    // Use this property moving forward for all feature stores. It will be used to ensure
    // that the correct object is used to call various APIs. See EXTJSIV-10022.
    isFeatureStore: true,

    constructor: function(groupingFeature, store) {
        var me = this;

        me.callParent();
        me.groupingFeature = groupingFeature;
        me.bindStore(store);
    },

    bindStore: function(store) {
        var me = this;

        if (me.store) {
            Ext.destroy(me.storeListeners);
            me.store = null;
        }
        if (store) {
            me.storeListeners = store.on({
                groupchange: me.onGroupChange,
                remove: me.onRemove,
                add: me.onAdd,
                update: me.onUpdate,
                refresh: me.onRefresh,
                clear: me.onClear,
                scope: me,
                destroyable: true
            });
            me.store = store;
            me.processStore(store);
        }
    },

    processStore: function(store) {
        var me = this,
            groups = store.getGroups(),
            groupCount = groups ? groups.length : 0,
            i,
            group,
            groupPlaceholder,
            data = me.data,
            oldGroupCache = me.groupingFeature.groupCache,
            groupCache = me.groupingFeature.clearGroupCache(),
            collapseAll = me.groupingFeature.startCollapsed, 
            groupField = store.getGroupField(),
            key, modelData, Model;

        if (data) {
            data.clear();
        } else {
            data = me.data = new Ext.util.Collection({
                rootProperty: 'data',
                extraKeys: {
                    byInternalId: {
                        property: 'internalId',
                        rootProperty: ''
                    }
                }
            });
        }

        if (store.getCount()) {

            // Upon first process of a loaded store, clear the "always" collapse" flag
            me.groupingFeature.startCollapsed = false;

            if (groupCount > 0) {
                for (i = 0; i < groupCount; i++) {
                    group = groups.getAt(i);

                    // Cache group information by group name
                    key = group.getGroupKey();
                    groupCache[key] = group;
                    group.isCollapsed = collapseAll || (oldGroupCache[key] && oldGroupCache[key].isCollapsed);

                    // If group is collapsed, then represent it by one dummy row which is never visible, but which acts
                    // as a start and end group trigger.
                    if (group.isCollapsed) {
                        Model = store.getModel();
                        modelData = {};
                        modelData[Model.idProperty] = 'group-' + key + '-placeholder';
                        modelData[groupField] = key;
                        group.placeholder = groupPlaceholder = new Model(modelData);
                        groupPlaceholder.isNonData = groupPlaceholder.isCollapsedPlaceholder = true;
                        data.add(groupPlaceholder);
                    }

                    // Expanded group - add the group's child records.
                    else {
                        data.insert(me.data.length, group.items);
                    }
                }
            } else {
                data.add(store.getRange());
            }
        }
    },

    isCollapsed: function(name) {
        return this.groupingFeature.groupCache[name].isCollapsed; 
    },

    isInCollapsedGroup: function(record) {
        var store = this.store,
            groupData;

        if (store.isGrouped() && (groupData = this.groupingFeature.groupCache[record.get(store.getGroupField())])) {
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
        // Collection's getRange is exclusive. Do NOT mutate the value: it is passed to the callback.
        var result = this.data.getRange(start, Ext.isNumber(end) ? end + 1 : end);

        if (options && options.callback) {
            options.callback.call(options.scope || this, result, start, end, options);
        }
        return result;
    },

    getAt: function(index) {
        return this.data.getAt(index);
    },

    getById: function(id) {
        return this.store.getById(id);
    },

    getByInternalId: function(internalId) {
        return this.data.byInternalId.get(internalId) || null;
    },

    expandGroup: function(group) {
        var me = this,
            startIdx, items;

        if (typeof group === 'string') {
            group = me.groupingFeature.groupCache[group];
        }
        
        if (group) {
            items = group.items;
        }

        if (items.length && (startIdx = me.data.indexOf(group.placeholder)) !== -1) {

            // Any event handlers must see the new state
            group.isCollapsed = false;
            me.isExpandingOrCollapsing = 1;
            
            // Remove the collapsed group placeholder record
            me.data.removeAt(startIdx);

            // Insert the child records in its place
            me.data.insert(startIdx, group.items);

            // Update views
            me.fireEvent('replace', me, startIdx, [group.placeholder], group.items);

            me.fireEvent('groupexpand', me, group);
            me.isExpandingOrCollapsing = 0;
        }
    },

    collapseGroup: function(group) {
        var me = this,
            startIdx,
            placeholder,
            len, items;

        if (typeof group === 'string') {
            group = me.groupingFeature.groupCache[group];
        }
        
        if (group) {
            items = group.items;
        }

        if (items && (len = items.length) && (startIdx = me.data.indexOf(items[0])) !== -1) {

            // Any event handlers must see the new state
            group.isCollapsed = true;
            me.isExpandingOrCollapsing = 2;

            // Remove the group child records
            me.data.removeAt(startIdx, len);

            // Insert a placeholder record in their place
            me.data.insert(startIdx, placeholder = me.getGroupPlaceholder(group));

            // Update views
            me.fireEvent('replace', me, startIdx, items, [placeholder]);

            me.fireEvent('groupcollapse', me, group);
            me.isExpandingOrCollapsing = 0;
        }
    },

    getGroupPlaceholder: function(group) {
        if (!group.placeholder) {
            var store = this.store,
                Model = store.getModel(),
                modelData = {},
                key = group.getGroupKey(),
                groupPlaceholder;
            
            modelData[Model.idProperty] = 'group-' + key + '-placeholder';
            modelData[store.getGroupField()] = key;
            groupPlaceholder = group.placeholder = new Model(modelData);
            groupPlaceholder.isNonData = groupPlaceholder.isCollapsedPlaceholder = true;
        }
        return group.placeholder;
    },

    // Find index of record in group store.
    // If it's in a collapsed group, then it's -1, not present
    indexOf: function(record) {
        if (!record.isCollapsedPlaceholder) {
            return this.data.indexOf(record);
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
        return this.store.indexOf(record);
    },

    onRefresh: function(store) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onRemove: function(store, records, index, isMove) {
        this.processStore(this.store);
        this.fireEvent('refresh', this);
    },

    onClear: function(store, records, startIndex) {
        this.processStore(this.store);
        this.fireEvent('clear', this);
    },

    onAdd: function(store, records, startIndex) {
        this.processStore(this.store);

        // Use indexOf to find the index of the records added.
        // It will be different in this store, and this store is what the View sees.
        this.fireEvent('replace', this, this.indexOf(records[0]), [], records);
    },

    onUpdate: function(store, record, operation, modifiedFieldNames) {
        var me = this,
            groupInfo,
            firstRec, lastRec, items;

        // The grouping field value has been modified.
        // This could either move a record from one group to another, or introduce a new group.
        // Either way, we have to refresh the grid
        if (store.isGrouped()) {
            // Updating a single record, attach the group to the record for Grouping.setupRowData to use.
            groupInfo = record.group = me.groupingFeature.getRecordGroup(record);

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
                items = groupInfo.items;
                firstRec = items[0];
                lastRec = items[items.length - 1];

                // Fire an update on the first and last row in the group (ensure we don't refire update on the modified record).
                // This is to give interested Features the opportunity to update the first item (a wrapped group header + data row),
                // and last item (a wrapped data row + group summary)
                if (firstRec !== record) {
                    firstRec.group = groupInfo;
                    me.fireEvent('update', me, firstRec, 'edit', modifiedFieldNames);
                    delete firstRec.group;
                }
                if (lastRec !== record && lastRec !== firstRec && me.groupingFeature.showSummaryRow) {
                    lastRec.group = groupInfo;
                    me.fireEvent('update', me, lastRec, 'edit', modifiedFieldNames);
                    delete lastRec.group;
                }
                Ext.resumeLayouts(true);
            }

            delete record.group;
        } else {
            // Propagate the record's update event
            me.fireEvent('update', me, record, operation, modifiedFieldNames);
        }
    },

    // Relay the groupchange event
    onGroupChange: function(store) {
        this.fireEvent('groupchange', store);
    }
});
