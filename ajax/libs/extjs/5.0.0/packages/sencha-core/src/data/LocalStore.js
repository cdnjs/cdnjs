/**
 * A mixin that provides common store methods for Ext.data.Store & Ext.data.ChainedStore.
 * @private
 */
Ext.define('Ext.data.LocalStore', {
	extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'localstore'
    },

    constructDataCollection: function() {
        var data = new Ext.util.Collection({
            rootProperty: 'data',
            extraKeys: {
                byInternalId: {
                    property: 'internalId',
                    rootProperty: ''
                }
            }
        }),
        sorters;

        sorters = data.getSorters();
        sorters.setSorterConfigure(this.addFieldTransform, this);
        return data;
    },

    createFiltersCollection: function() {
        return this.getData().getFilters();
    },

    createSortersCollection: function() {
        return this.getData().getSorters();
    },

    // When the collection informs us that it has sorted, this LocalStore must react.
    // AbstractStore#onSorterEndUpdate does the correct thing (fires a refresh) if remote sorting is false
    onCollectionSort: function() {
        this.onSorterEndUpdate();
    },

    // When the collection informs us that it has filtered, this LocalStore must react.
    // AbstractStore#onFilterEndUpdate does the correct thing (fires a refresh) if remote sorting is false
    onCollectionFilter: function() {
        this.onFilterEndUpdate();
    },

    notifySorterChange: function() {
        this.getData().onSorterChange();
    },
    
    forceLocalSort: function() {
        this.getData().onSortChange();
    },

    // Inherit docs
    contains: function(record) {
        return this.indexOf(record) > -1;
    },

    /**
     * Calls the specified function for each {@link Ext.data.Model record} in the store.
     *
     * When store is filtered, only loops over the filtered records.
     *
     * @param {Function} fn The function to call. The {@link Ext.data.Model Record} is passed as the first parameter.
     * Returning `false` aborts and exits the iteration.
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to the current {@link Ext.data.Model record} in the iteration.
     */
    each: function(fn, scope) {
        var data = this.data.items,
            len = data.length,
            record, i;

        for (i = 0; i < len; ++i) {
            record = data[i];
            if (fn.call(scope || record, record, i, len) === false) {
                break;
            }
        }
    },
    
    /**
     * Collects unique values for a particular dataIndex from this store.
     *
     * @param {String} dataIndex The property to collect
     * @param {Boolean} [allowNull] Pass true to allow null, undefined or empty string values
     * @param {Boolean} [bypassFilter] Pass true to collect from all records, even ones which are filtered.
     * @return {Object[]} An array of the unique values
     */
    collect: function(dataIndex, allowNull, bypassFilter) {
        var me = this,
            data = me.getData();
        
        if (bypassFilter === true && data.filtered) {
            data = data.getSource();
        }

        return data.collect(dataIndex, 'data', allowNull);
    },

    /**
     * Get the Record with the specified id.
     *
     * This method is not affected by filtering, lookup will be performed from all records
     * inside the store, filtered or not.
     *
     * @param {Mixed} id The id of the Record to find.
     * @return {Ext.data.Model} The Record with the passed id. Returns null if not found.
     */
    getById: function(id) {
        var data = this.getData();
        
        if (data.filtered) {
            data = data.getSource();
        }
        return data.get(id) || null;
    },

    /**
     * @private
     * Get the Record with the specified internalId.
     *
     * This method is not effected by filtering, lookup will be performed from all records
     * inside the store, filtered or not.
     *
     * @param {Mixed} internalId The id of the Record to find.
     * @return {Ext.data.Model} The Record with the passed internalId. Returns null if not found.
     */
    getByInternalId: function(internalId) {
        var data = this.getData();
        
        if (data.filtered) {
            data = data.getSource();
        }
        
        return data.byInternalId.get(internalId) || null;
    },
    
    /**
     * Get the index of the record within the store.
     *
     * When store is filtered, records outside of filter will not be found.
     *
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf: function(record) {
        return this.getData().indexOf(record);
    },

    /**
     * Get the index within the store of the Record with the passed id.
     *
     * Like #indexOf, this method is effected by filtering.
     *
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId: function(id) {
        return this.indexOf(this.getById(id));
    },
    
    /**
     * Query all the cached records in this Store using a filtering function. The specified function
     * will be called with each record in this Store. If the function returns `true` the record is
     * included in the results.
     *
     * This method is not affected by filtering, it will always search *all* records in the store
     * regardless of filtering.
     *
     * @param {Function} fn The function to be called. It will be passed the following parameters:
     *  @param {Ext.data.Model} fn.record The record to test for filtering. Access field values
     *  using {@link Ext.data.Model#get}.
     *  @param {Object} fn.id The ID of the Record passed.
     * @param {Object} [scope] The scope (this reference) in which the function is executed
     * Defaults to this Store.
     * @return {Ext.util.Collection} Returns an Ext.util.Collection of the matched records
     */
    queryBy: function(fn, scope) {
        var data = this.getData();

        return (data.getSource() || data).createFiltered(fn, scope);
    },

    /**
     * Query all the cached records in this Store by name/value pair.
     * The parameters will be used to generated a filter function that is given
     * to the queryBy method.
     *
     * This method complements queryBy by generating the query function automatically.
     *
     * This method is not affected by filtering, it will always search *all* records in the store
     * regardless of filtering.
     *
     * @param {String} property The property to create the filter function for
     * @param {String/RegExp} value The string/regex to compare the property value to
     * @param {Boolean} [anyMatch=false] True to match any part of the string, not just the
     * beginning.
     * @param {Boolean} [caseSensitive=false] `true` to create a case-sensitive regex.
     * @param {Boolean} [exactMatch=false] True to force exact match (^ and $ characters
     * added to the regex). Ignored if `anyMatch` is `true`.
     * @return {Ext.util.Collection} Returns an Ext.util.Collection of the matched records
     */
    query: function(property, value, anyMatch, caseSensitive, exactMatch) {
        var data = this.getData();

        return (data.getSource() || data).createFiltered(property, value, anyMatch, caseSensitive, exactMatch);
    },

    /**
     * Convenience function for getting the first model instance in the store.
     *
     * When store is filtered, will return first item within the filter.
     *
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the first record being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Ext.data.Model/undefined} The first model instance in the store, or undefined
     */
    first: function(grouped) {
        return this.getData().first(grouped) || null;
    },

    /**
     * Convenience function for getting the last model instance in the store.
     *
     * When store is filtered, will return last item within the filter.
     *
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the last record being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Ext.data.Model/undefined} The last model instance in the store, or undefined
     */
    last: function(grouped) {
        return this.getData().last(grouped) || null;
    },

    /**
     * Sums the value of `field` for each {@link Ext.data.Model record} in store
     * and returns the result.
     *
     * When store is filtered, only sums items within the filter.
     *
     * @param {String} field A field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the sum for that group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Number} The sum
     */
    sum: function(field, grouped) {
        var data = this.getData();
        return (grouped && this.isGrouped()) ? data.sumByGroup(field) : data.sum(field);
    },

    /**
     * Gets the count of items in the store.
     *
     * When store is filtered, only items within the filter are counted.
     *
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the count for each group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Number} the count
     */
    count: function(grouped) {
        var data = this.getData();
        return (grouped && this.isGrouped()) ? data.countByGroup() : data.count();
    },

    /**
     * Gets the minimum value in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {String} field The field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the minimum in the group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Object} The minimum value, if no items exist, undefined.
     */
    min: function(field, grouped) {
        var data = this.getData();
        return (grouped && this.isGrouped()) ? data.minByGroup(field) : data.min(field);
    },

    /**
     * Gets the maximum value in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {String} field The field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the maximum in the group being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Object} The maximum value, if no items exist, undefined.
     */
    max: function(field, grouped) {
        var data = this.getData();
        return (grouped && this.isGrouped()) ? data.maxByGroup(field) : data.max(field);
    },

    /**
     * Gets the average value in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {String} field The field in each record
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the group average being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @return {Object} The average value, if no items exist, 0.
     */
    average: function(field, grouped) {
        var data = this.getData();
        return (grouped && this.isGrouped()) ? data.averageByGroup(field) : data.average(field);
    },

    /**
     * Runs the aggregate function for all the records in the store.
     *
     * When store is filtered, only items within the filter are aggregated.
     *
     * @param {Function} fn The function to execute. The function is called with a single parameter,
     * an array of records for that group.
     * @param {Object} [scope] The scope to execute the function in. Defaults to the store.
     * @param {Boolean} [grouped] True to perform the operation for each group
     * in the store. The value returned will be an object literal with the key being the group
     * name and the group average being the value. The grouped parameter is only honored if
     * the store has a groupField.
     * @param {String} field The field to get the value from
     * @return {Object} An object literal with the group names and their appropriate values.
     */
    aggregate: function(fn, scope, grouped, field) {
        var me = this,
            groups, len, out, group, i;
        
        if (grouped && me.isGrouped()) {
            groups = me.getGroups().items;
            len = groups.length;
            out = {};

            for (i = 0; i < len; ++i) {
                group = groups[i];
                out[group.getGroupKey()] = me.getAggregate(fn, scope || me, group.items, field);
            }
            return out;
        } else {
            return me.getAggregate(fn, scope, me.getData().items, field);
        }
    },

    getAggregate: function(fn, scope, records, field){
        var values = [],
            len = records.length,
            i;

        //TODO EXTJSIV-12307 - not the right way to call fn
        for (i = 0; i < len; ++i) {
            values[i] = records[i].get(field);
        }
        
        return fn.call(scope || this, records, values);
    },

    addObserver: function (observer) {
        var observers = this.observers;

        if (!observers) {
            this.observers = observers = new Ext.util.Collection();
        }

        observers.add(observer);
    },
    
    removeObserver: function (observer) {
        var observers = this.observers;

        if (observers) {
            observers.remove(observer);
        }
    },
    
    callObservers: function(action, args) {
        var observers = this.observers,
            len, items, i, methodName, item;
        
        if (observers) {
            items = observers.items;
            if (args) {
                args.unshift(this);
            } else {
                args = [this];
            }
            for (i = 0, len = items.length; i < len; ++i) {
                item = items[i];
                methodName = 'onSource' + action;
                if (item[methodName]) {
                    item[methodName].apply(item, args);
                }
            }
        }
    }
});