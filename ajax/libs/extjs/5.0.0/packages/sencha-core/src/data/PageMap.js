/**
 * @class Ext.data.PageMap
 * @extends Ext.util.LruCache
 * Private class for use by only Store when configured `buffered: true`.
 * @private
 */
Ext.define('Ext.data.PageMap', {
    extend: 'Ext.util.LruCache',

    config: {
        /**
         * @cfg {Number} pageSize
         * The size of pages in this map.
         */
        pageSize: 0,

        /**
         * @cfg {String} rootProperty
         * The root property to use for aggregation, filtering and sorting. By default
         * this is `null` but when containing things like {@link Ext.data.Model records}
         * this config would likely be set to "data" so that property names are applied
         * to the fields of each record.
         */
        rootProperty: ''
    },

    // Maintain a generation counter, so that the Store can reject incoming pages destined for the previous generation
    clear: function(initial) {
        var me = this;
        me.pageMapGeneration = (me.pageMapGeneration || 0) + 1;
        me.callParent(arguments);
    },

    forEach: function(fn, scope) {
        var me = this,
            pageNumbers = Ext.Object.getKeys(me.map),
            pageCount = pageNumbers.length,
            pageSize = me.getPageSize(),
            i, j,
            pageNumber,
            page,
            len;

        for (i = 0; i < pageCount; i++) {
            pageNumbers[i] = Number(pageNumbers[i]);
        }
        Ext.Array.sort(pageNumbers);
        scope = scope || me;
        for (i = 0; i < pageCount; i++) {
            pageNumber = pageNumbers[i];
            page = me.getPage(pageNumber);
            len = page.length;
            for (j = 0; j < len; j++) {
                if (fn.call(scope, page[j], (pageNumber - 1) * pageSize + j) === false) {
                    return;
                }
            }
        }
    },

    /**
    * Returns the first record in this page map which elicits a true return value from the
    * passed selection function.
    *
    * **IMPORTANT
    * This can ONLY find records which happen to be cached in the page cache. This will be parts of the dataset around the currently
    * visible zone, or recently visited zones if the pages have not yet been purged from the cache.
    * 
    * This CAN NOT find records which have not been loaded into the cache.**
    *
    * If full client side searching is required, do not use a buffered store, instead use a regular, fully loaded store and
    * use the {@link Ext.grid.plugin.BufferedRenderer BufferedRenderer} plugin to minimize DOM footprint.
    * @param {Function} fn The selection function to execute for each item.
    *  @param {Mixed} fn.rec The record.
    *  @param {Mixed} fn.index The index in the total dataset of the record.
    * @param {Object} [scope] The scope (`this` reference) in which the function is executed. Defaults to this PageMap.
    * @return {Object} The first record in this page map which returned true from the selection
    * function, or null if none was found.
    */
    findBy: function(fn, scope) {
        var me = this,
            result = null;

        scope = scope || me;
        me.forEach(function(rec, index) {
            if (fn.call(scope, rec, index)) {
                result = rec;
                return false;
            }
        });
        return result;
    },

    /**
    * Returns the index *in the whole dataset* of the first record in this page map which elicits a true return value from the
    * passed selection function.
    *
    * **IMPORTANT
    * This can ONLY find records which happen to be cached in the page cache. This will be parts of the dataset around the currently
    * visible zone, or recently visited zones if the pages have not yet been purged from the cache.
    * 
    * This CAN NOT find records which have not been loaded into the cache.**
    *
    * If full client side searching is required, do not use a buffered store, instead use a regular, fully loaded store and
    * use the {@link Ext.grid.plugin.BufferedRenderer BufferedRenderer} plugin to minimize DOM footprint.
    * @param {Function} fn The selection function to execute for each item.
    *  @param {Mixed} fn.rec The record.
    *  @param {Mixed} fn.index The index in the total dataset of the record.
    * @param {Object} [scope] The scope (`this` reference) in which the function is executed. Defaults to this PageMap.
    * @return {Number} The index first record in this page map which returned true from the selection
    * function, or -1 if none was found.
    */
    findIndexBy: function(fn, scope) {
        var me = this,
            result = -1;

        scope = scope || me;
        me.forEach(function(rec, index) {
            if (fn.call(scope, rec)) {
                result = index;
                return false;
            }
        });
        return result;
    },

    find: function (property, value, start, startsWith, endsWith, ignoreCase) {
        if (Ext.isEmpty(value, false)) {
            return null;
        }

        var regex = Ext.String.createRegex(value, startsWith, endsWith, ignoreCase),
            root = this.getRootProperty();

        return this.findBy(function (item) {
            return item && regex.test((root ? item[root] : item)[property]);
        }, null, start);
    },

    findIndex: function (property, value, start, startsWith, endsWith, ignoreCase) {
        if (Ext.isEmpty(value, false)) {
            return null;
        }

        var regex = Ext.String.createRegex(value, startsWith, endsWith, ignoreCase),
            root = this.getRootProperty();

        return this.findIndexBy(function (item) {
            return item && regex.test((root ? item[root] : item)[property]);
        }, null, start);
    },

    getPageFromRecordIndex: function(index) {
        return Math.floor(index / this.getPageSize()) + 1;
    },

    addAll: function(records) {
        //<debug>
        if (this.getCount()) {
            Ext.Error.raise('Cannot addAll to a non-empty PageMap');
        }
        //</debug>
        this.addPage(1, records);
    },

    addPage: function(pageNumber, records) {
        var me = this,
            pageSize = me.getPageSize(),
            lastPage = pageNumber + Math.floor((records.length - 1) / pageSize),
            startIdx,
            page;

        // Account for being handed a block of records spanning several pages.
        // This can happen when loading from a MemoryProxy before a viewSize has been determined.
        for (startIdx = 0; pageNumber <= lastPage; pageNumber++, startIdx += pageSize) {
            page = Ext.Array.slice(records, startIdx, startIdx + pageSize);
            me.add(pageNumber, page);
            me.fireEvent('pageadded', pageNumber, page);
        }
    },

    getCount: function() {
        var result = this.callParent();
        if (result) {
            result = (result - 1) * this.getPageSize() + this.last.value.length;
        }
        return result;
    },

    indexOf: function(record) {
        return record ? record.index : -1;
    },

    insert: function() {
        //<debug>
        Ext.Error.raise('insert operation not suppported into buffered Store');
        //</debug>
    },

    remove: function() {
        //<debug>
        Ext.Error.raise('remove operation not suppported from buffered Store');
        //</debug>
    },

    removeAt: function() {
        //<debug>
        Ext.Error.raise('removeAt operation not suppported from buffered Store');
        //</debug>
    },

    removeAtKey: function (page) {
        var thePage = this.getPage(page);

        if (thePage && thePage.value) {
            thePage.value.length = 0;
        }
        return this.callParent(arguments);
    },

    getPage: function(pageNumber) {
        return this.get(pageNumber);
    },

    hasRange: function(start, end) {
        var pageNumber = this.getPageFromRecordIndex(start),
            endPageNumber = this.getPageFromRecordIndex(end);

        for (; pageNumber <= endPageNumber; pageNumber++) {
            if (!this.hasPage(pageNumber)) {
                return false;
            }
        }
        return true;
    },

    hasPage: function(pageNumber) {
        // We must use this.get to trigger an access so that the page which is checked for presence is not eligible for pruning
        return !!this.get(pageNumber);
    },

    getAt: function(index) {
        return this.getRange(index, index + 1)[0];
    },

    getRange: function(start, end) {
        // Store's backing Collection now uses EXCLUSIVE endIndex
        // So store will always pass the endIndex+1
        end--;

        if (!this.hasRange(start, end)) {
            Ext.Error.raise('PageMap asked for range which it does not have');
        }
        var me = this,
            pageSize = me.getPageSize(),
            startPageNumber = me.getPageFromRecordIndex(start),
            endPageNumber = me.getPageFromRecordIndex(end),
            dataStart = (startPageNumber - 1) * pageSize,
            dataEnd = (endPageNumber * pageSize) - 1,
            pageNumber = startPageNumber,
            result = [],
            sliceBegin, sliceEnd, doSlice,
            i = 0, len;

        for (; pageNumber <= endPageNumber; pageNumber++) {

            // First and last pages will need slicing to cut into the actual wanted records
            if (pageNumber === startPageNumber) {
                sliceBegin = start - dataStart;
                doSlice = true;
            } else {
                sliceBegin = 0;
                doSlice = false;
            }
            if (pageNumber === endPageNumber) {
                sliceEnd = pageSize - (dataEnd - end);
                doSlice = true;
            }

            // First and last pages will need slicing
            if (doSlice) {
                Ext.Array.push(result, Ext.Array.slice(me.getPage(pageNumber), sliceBegin, sliceEnd));
            } else {
                Ext.Array.push(result, me.getPage(pageNumber));
            }
        }

        // Inject the dataset ordinal position into the record as the index
        for (len = result.length; i < len; i++) {
            result[i].index = start++;
        }
        return result;
    }
});