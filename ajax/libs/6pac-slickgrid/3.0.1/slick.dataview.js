(function ($) {
  /***
   * A sample Model implementation.
   * Provides a filtered view of the underlying data.
   *
   * Relies on the data item having an "id" property uniquely identifying it.
   */
  function DataView(options) {
    var self = this;

    var defaults = {
      groupItemMetadataProvider: null,
      inlineFilters: false
    };

    // private
    var idProperty = "id";          // property holding a unique row id
    var items = [];                 // data by index
    var rows = [];                  // data by row
    var idxById = new Slick.Map();   // indexes by id
    var rowsById = null;            // rows by id; lazy-calculated
    var filter = null;              // filter function
    var updated = null;             // updated item ids
    var suspend = false;            // suspends the recalculation
    var isBulkSuspend = false;      // delays various operations like the
                                    // index update and delete to efficient
                                    // versions at endUpdate
    var bulkDeleteIds = new Slick.Map();
    var sortAsc = true;
    var fastSortField;
    var sortComparer;
    var refreshHints = {};
    var prevRefreshHints = {};
    var filterArgs;
    var filteredItems = [];
    var compiledFilter;
    var compiledFilterWithCaching;
    var filterCache = [];
    var _grid = null;

    // grouping
    var groupingInfoDefaults = {
      getter: null,
      formatter: null,
      comparer: function (a, b) {
        return (a.value === b.value ? 0 :
          (a.value > b.value ? 1 : -1)
        );
      },
      predefinedValues: [],
      aggregators: [],
      aggregateEmpty: false,
      aggregateCollapsed: false,
      aggregateChildGroups: false,
      collapsed: false,
      displayTotalsRow: true,
      lazyTotalsCalculation: false
    };
    var groupingInfos = [];
    var groups = [];
    var toggledGroupsByLevel = [];
    var groupingDelimiter = ':|:';
    var selectedRowIds = null;

    var pagesize = 0;
    var pagenum = 0;
    var totalRows = 0;

    // events
    var onSetItemsCalled = new Slick.Event();
    var onRowCountChanged = new Slick.Event();
    var onRowsChanged = new Slick.Event();
    var onRowsOrCountChanged = new Slick.Event();
    var onBeforePagingInfoChanged = new Slick.Event();
    var onPagingInfoChanged = new Slick.Event();
    var onGroupExpanded = new Slick.Event();
    var onGroupCollapsed = new Slick.Event();

    options = $.extend(true, {}, defaults, options);

    /***
     * Begins a bached update of the items in the data view.
     * @param bulkUpdate {Boolean} if set to true, most data view modifications
     * including deletes and the related events are postponed to the endUpdate call.
     * As certain operations are postponed during this update, some methods might not
     * deliver fully consistent information.
     */
    function beginUpdate(bulkUpdate) {
      suspend = true;
      isBulkSuspend = bulkUpdate === true;
    }

    function endUpdate() {
      var wasBulkSuspend = isBulkSuspend;
      isBulkSuspend = false;
      suspend = false;
      if (wasBulkSuspend) {
        processBulkDelete();
        ensureIdUniqueness();
      }
      refresh();
    }

    function destroy() {
      items = [];
      idxById = null;
      rowsById = null;
      filter = null;
      updated = null;
      sortComparer = null;
      filterCache = [];
      filteredItems = [];
      compiledFilter = null;
      compiledFilterWithCaching = null;

      if (_grid && _grid.onSelectedRowsChanged && _grid.onCellCssStylesChanged) {
        _grid.onSelectedRowsChanged.unsubscribe();
        _grid.onCellCssStylesChanged.unsubscribe();
      }
      if (self.onRowsOrCountChanged) {
        self.onRowsOrCountChanged.unsubscribe();
      }
    }

    function setRefreshHints(hints) {
      refreshHints = hints;
    }

    function setFilterArgs(args) {
      filterArgs = args;
    }

    /***
     * Processes all delete requests placed during bulk update
     * by recomputing the items and idxById members.
     */
    function processBulkDelete() {
      // the bulk update is processed by
      // recomputing the whole items array and the index lookup in one go.
      // this is done by placing the not-deleted items
      // from left to right into the array and shrink the array the the new
      // size afterwards.
      // see https://github.com/6pac/SlickGrid/issues/571 for further details.

      var id, item, newIdx = 0;
      for (var i = 0, l = items.length; i < l; i++) {
        item = items[i];
        id = item[idProperty];
        if (id === undefined) {
          throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
        }

        // if items have been marked as deleted we skip them for the new final items array
        // and we remove them from the lookup table.
        if(bulkDeleteIds.has(id)) {
          idxById.delete(id);
        } else {
          // for items which are not deleted, we add them to the
          // next free position in the array and register the index in the lookup.
          items[newIdx] = item;
          idxById.set(id, newIdx);
          ++newIdx;
        }
      }

      // here we shrink down the full item array to the ones actually
      // inserted in the cleanup loop above.
      items.length = newIdx;
      // and finally cleanup the deleted ids to start cleanly on the next update.
      bulkDeleteIds = new Slick.Map();
    }

    function updateIdxById(startingIndex) {
      if (isBulkSuspend) { // during bulk update we do not reorganize
        return;
      }
      startingIndex = startingIndex || 0;
      var id;
      for (var i = startingIndex, l = items.length; i < l; i++) {
        id = items[i][idProperty];
        if (id === undefined) {
          throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
        }
        idxById.set(id, i);
      }
    }

    function ensureIdUniqueness() {
      if (isBulkSuspend) { // during bulk update we do not reorganize
        return;
      }
      var id;
      for (var i = 0, l = items.length; i < l; i++) {
        id = items[i][idProperty];
        if (id === undefined || idxById.get(id) !== i) {
          throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
        }
      }
    }

    function getItems() {
      return items;
    }

    function getIdPropertyName() {
      return idProperty;
    }

    function setItems(data, objectIdProperty) {
      if (objectIdProperty !== undefined) {
        idProperty = objectIdProperty;
      }
      items = filteredItems = data;
      onSetItemsCalled.notify({ idProperty: objectIdProperty, itemCount: items.length }, null, self);
      idxById = new Slick.Map();
      updateIdxById();
      ensureIdUniqueness();
      refresh();
    }

    function setPagingOptions(args) {
      if (onBeforePagingInfoChanged.notify(getPagingInfo(), null, self) !== false) {
        if (args.pageSize != undefined) {
          pagesize = args.pageSize;
          pagenum = pagesize ? Math.min(pagenum, Math.max(0, Math.ceil(totalRows / pagesize) - 1)) : 0;
        }

        if (args.pageNum != undefined) {
          pagenum = Math.min(args.pageNum, Math.max(0, Math.ceil(totalRows / pagesize) - 1));
        }

        onPagingInfoChanged.notify(getPagingInfo(), null, self);

        refresh();
      }
    }

    function getPagingInfo() {
      var totalPages = pagesize ? Math.max(1, Math.ceil(totalRows / pagesize)) : 1;
      return { pageSize: pagesize, pageNum: pagenum, totalRows: totalRows, totalPages: totalPages, dataView: self };
    }

    function sort(comparer, ascending) {
      sortAsc = ascending;
      sortComparer = comparer;
      fastSortField = null;
      if (ascending === false) {
        items.reverse();
      }
      items.sort(comparer);
      if (ascending === false) {
        items.reverse();
      }
      idxById = new Slick.Map();
      updateIdxById();
      refresh();
    }

    /***
     * Provides a workaround for the extremely slow sorting in IE.
     * Does a [lexicographic] sort on a give column by temporarily overriding Object.prototype.toString
     * to return the value of that field and then doing a native Array.sort().
     */
    function fastSort(field, ascending) {
      sortAsc = ascending;
      fastSortField = field;
      sortComparer = null;
      var oldToString = Object.prototype.toString;
      Object.prototype.toString = (typeof field == "function") ? field : function () {
        return this[field];
      };
      // an extra reversal for descending sort keeps the sort stable
      // (assuming a stable native sort implementation, which isn't true in some cases)
      if (ascending === false) {
        items.reverse();
      }
      items.sort();
      Object.prototype.toString = oldToString;
      if (ascending === false) {
        items.reverse();
      }
      idxById = new Slick.Map();
      updateIdxById();
      refresh();
    }

    function reSort() {
      if (sortComparer) {
        sort(sortComparer, sortAsc);
      } else if (fastSortField) {
        fastSort(fastSortField, sortAsc);
      }
    }

    function getFilteredItems() {
      return filteredItems;
    }

    function getFilteredItemCount() {
      return filteredItems.length;
    }

    function getFilter() {
      return filter;
    }

    function setFilter(filterFn) {
      filter = filterFn;
      if (options.inlineFilters) {
        compiledFilter = compileFilter();
        compiledFilterWithCaching = compileFilterWithCaching();
      }
      refresh();
    }

    function getGrouping() {
      return groupingInfos;
    }

    function setGrouping(groupingInfo) {
      if (!options.groupItemMetadataProvider) {
        options.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
      }

      groups = [];
      toggledGroupsByLevel = [];
      groupingInfo = groupingInfo || [];
      groupingInfos = (groupingInfo instanceof Array) ? groupingInfo : [groupingInfo];

      for (var i = 0; i < groupingInfos.length; i++) {
        var gi = groupingInfos[i] = $.extend(true, {}, groupingInfoDefaults, groupingInfos[i]);
        gi.getterIsAFn = typeof gi.getter === "function";

        // pre-compile accumulator loops
        gi.compiledAccumulators = [];
        var idx = gi.aggregators.length;
        while (idx--) {
          gi.compiledAccumulators[idx] = compileAccumulatorLoop(gi.aggregators[idx]);
        }

        toggledGroupsByLevel[i] = {};
      }

      refresh();
    }

    /**
     * @deprecated Please use {@link setGrouping}.
     */
    function groupBy(valueGetter, valueFormatter, sortComparer) {
      if (valueGetter == null) {
        setGrouping([]);
        return;
      }

      setGrouping({
        getter: valueGetter,
        formatter: valueFormatter,
        comparer: sortComparer
      });
    }

    /**
     * @deprecated Please use {@link setGrouping}.
     */
    function setAggregators(groupAggregators, includeCollapsed) {
      if (!groupingInfos.length) {
        throw new Error("[SlickGrid DataView] At least one grouping must be specified before calling setAggregators().");
      }

      groupingInfos[0].aggregators = groupAggregators;
      groupingInfos[0].aggregateCollapsed = includeCollapsed;

      setGrouping(groupingInfos);
    }

    function getItemByIdx(i) {
      return items[i];
    }

    function getIdxById(id) {
      return idxById.get(id);
    }

    function ensureRowsByIdCache() {
      if (!rowsById) {
        rowsById = {};
        for (var i = 0, l = rows.length; i < l; i++) {
          rowsById[rows[i][idProperty]] = i;
        }
      }
    }

    function getRowByItem(item) {
      ensureRowsByIdCache();
      return rowsById[item[idProperty]];
    }

    function getRowById(id) {
      ensureRowsByIdCache();
      return rowsById[id];
    }

    function getItemById(id) {
      return items[idxById.get(id)];
    }

    function mapItemsToRows(itemArray) {
      var rows = [];
      ensureRowsByIdCache();
      for (var i = 0, l = itemArray.length; i < l; i++) {
        var row = rowsById[itemArray[i][idProperty]];
        if (row != null) {
          rows[rows.length] = row;
        }
      }
      return rows;
    }

    function mapIdsToRows(idArray) {
      var rows = [];
      ensureRowsByIdCache();
      for (var i = 0, l = idArray.length; i < l; i++) {
        var row = rowsById[idArray[i]];
        if (row != null) {
          rows[rows.length] = row;
        }
      }
      return rows;
    }

    function mapRowsToIds(rowArray) {
      var ids = [];
      for (var i = 0, l = rowArray.length; i < l; i++) {
        if (rowArray[i] < rows.length) {
          ids[ids.length] = rows[rowArray[i]][idProperty];
        }
      }
      return ids;
    }

    /***
     * Performs the update operations of a single item by id without
     * triggering any events or refresh operations.
     * @param id The new id of the item.
     * @param item The item which should be the new value for the given id.
     */
    function updateSingleItem(id, item) {
      // see also https://github.com/mleibman/SlickGrid/issues/1082
      if (!idxById.has(id)) {
        throw new Error("[SlickGrid DataView] Invalid id");
      }

      // What if the specified item also has an updated idProperty?
      // Then we'll have to update the index as well, and possibly the `updated` cache too.
      if (id !== item[idProperty]) {
        // make sure the new id is unique:
        var newId = item[idProperty];
        if (newId == null) {
          throw new Error("[SlickGrid DataView] Cannot update item to associate with a null id");
        }
        if (idxById.has(newId)) {
          throw new Error("[SlickGrid DataView] Cannot update item to associate with a non-unique id");
        }
        idxById.set(newId, idxById.get(id));
        idxById.delete(id);

        // Also update the `updated` hashtable/markercache? Yes, `recalc()` inside `refresh()` needs that one!
        if (updated && updated[id]) {
          delete updated[id];
        }

        // Also update the row indexes? no need since the `refresh()`, further down, blows away the `rowsById[]` cache!

        id = newId;
      }
      items[idxById.get(id)] = item;

      // Also update the rows? no need since the `refresh()`, further down, blows away the `rows[]` cache and recalculates it via `recalc()`!

      if (!updated) {
        updated = {};
      }
      updated[id] = true;
    }

    /***
     * Updates a single item in the data view given the id and new value.
     * @param id The new id of the item.
     * @param item The item which should be the new value for the given id.
     */
    function updateItem(id, item) {
      updateSingleItem(id, item);
      refresh();
    }

    /***
     * Updates multiple items in the data view given the new ids and new values.
     * @param id {Array} The array of new ids which is in the same order as the items.
     * @param newItems {Array} The new items that should be set in the data view for the given ids.
     */
    function updateItems(ids, newItems) {
      if(ids.length !== newItems.length) {
        throw new Error("[SlickGrid DataView] Mismatch on the length of ids and items provided to update");
      }
      for (var i = 0, l = newItems.length; i < l; i++) {
        updateSingleItem(ids[i], newItems[i]);
      }
      refresh();
    }

    /***
     * Inserts a single item into the data view at the given position.
     * @param insertBefore {Number} The 0-based index before which the item should be inserted.
     * @param item The item to insert.
     */
    function insertItem(insertBefore, item) {
      items.splice(insertBefore, 0, item);
      updateIdxById(insertBefore);
      refresh();
    }

    /***
     * Inserts multiple items into the data view at the given position.
     * @param insertBefore {Number} The 0-based index before which the items should be inserted.
     * @param newItems {Array}  The items to insert.
     */
    function insertItems(insertBefore, newItems) {
      Array.prototype.splice.apply(items, [insertBefore, 0].concat(newItems));
      updateIdxById(insertBefore);
      refresh();
    }

    /***
     * Adds a single item at the end of the data view.
     * @param item The item to add at the end.
     */
    function addItem(item) {
      items.push(item);
      updateIdxById(items.length - 1);
      refresh();
    }

    /***
     * Adds multiple items at the end of the data view.
     * @param newItems {Array} The items to add at the end.
     */
    function addItems(newItems) {
      items = items.concat(newItems);
      updateIdxById(items.length - newItems.length);
      refresh();
    }

    /***
     * Deletes a single item identified by the given id from the data view.
     * @param id The id identifying the object to delete.
     */
    function deleteItem(id) {
      if (isBulkSuspend) {
        bulkDeleteIds.set(id, true);
      } else {
        var idx = idxById.get(id);
        if (idx === undefined) {
          throw new Error("[SlickGrid DataView] Invalid id");
        }
        idxById.delete(id);
        items.splice(idx, 1);
        updateIdxById(idx);
        refresh();
      }
    }

    /***
     * Deletes multiple item identified by the given ids from the data view.
     * @param ids {Array} The ids of the items to delete.
     */
    function deleteItems(ids) {
      if (ids.length === 0) {
        return;
      }

      if (isBulkSuspend) {
        for (var i = 0, l = ids.length; i < l; i++) {
          var id = ids[i];
          var idx = idxById.get(id);
          if (idx === undefined) {
            throw new Error("[SlickGrid DataView] Invalid id");
          }
          bulkDeleteIds.set(id, true);
        }
      } else {
        // collect all indexes
        var indexesToDelete = [];
        for (var i = 0, l = ids.length; i < l; i++) {
          var id = ids[i];
          var idx = idxById.get(id);
          if (idx === undefined) {
            throw new Error("[SlickGrid DataView] Invalid id");
          }
          idxById.delete(id);
          indexesToDelete.push(idx);
        }

        // Remove from back to front
        indexesToDelete.sort();
        for (var i = indexesToDelete.length - 1; i >= 0; --i) {
          items.splice(indexesToDelete[i], 1);
        }

        // update lookup from front to back
        updateIdxById(indexesToDelete[0]);
        refresh();
      }
    }

    function sortedAddItem(item) {
      if (!sortComparer) {
        throw new Error("[SlickGrid DataView] sortedAddItem() requires a sort comparer, use sort()");
      }
      insertItem(sortedIndex(item), item);
    }

    function sortedUpdateItem(id, item) {
      if (!idxById.has(id) || id !== item[idProperty]) {
        throw new Error("[SlickGrid DataView] Invalid or non-matching id " + idxById.get(id));
      }
      if (!sortComparer) {
        throw new Error("[SlickGrid DataView] sortedUpdateItem() requires a sort comparer, use sort()");
      }
      var oldItem = getItemById(id);
      if (sortComparer(oldItem, item) !== 0) {
        // item affects sorting -> must use sorted add
        deleteItem(id);
        sortedAddItem(item);
      }
      else { // update does not affect sorting -> regular update works fine
        updateItem(id, item);
      }
    }

    function sortedIndex(searchItem) {
      var low = 0, high = items.length;

      while (low < high) {
        var mid = low + high >>> 1;
        if (sortComparer(items[mid], searchItem) === -1) {
          low = mid + 1;
        }
        else {
          high = mid;
        }
      }
      return low;
    }

    function getItemCount() {
      return items.length;
    }

    function getLength() {
      return rows.length;
    }

    function getItem(i) {
      var item = rows[i];

      // if this is a group row, make sure totals are calculated and update the title
      if (item && item.__group && item.totals && !item.totals.initialized) {
        var gi = groupingInfos[item.level];
        if (!gi.displayTotalsRow) {
          calculateTotals(item.totals);
          item.title = gi.formatter ? gi.formatter(item) : item.value;
        }
      }
      // if this is a totals row, make sure it's calculated
      else if (item && item.__groupTotals && !item.initialized) {
        calculateTotals(item);
      }

      return item;
    }

    function getItemMetadata(i) {
      var item = rows[i];
      if (item === undefined) {
        return null;
      }

      // overrides for grouping rows
      if (item.__group) {
        return options.groupItemMetadataProvider.getGroupRowMetadata(item);
      }

      // overrides for totals rows
      if (item.__groupTotals) {
        return options.groupItemMetadataProvider.getTotalsRowMetadata(item);
      }

      return null;
    }

    function expandCollapseAllGroups(level, collapse) {
      if (level == null) {
        for (var i = 0; i < groupingInfos.length; i++) {
          toggledGroupsByLevel[i] = {};
          groupingInfos[i].collapsed = collapse;

          if (collapse === true) {
            onGroupCollapsed.notify({ level: i, groupingKey: null });
          } else {
            onGroupExpanded.notify({ level: i, groupingKey: null });
          }
        }
      } else {
        toggledGroupsByLevel[level] = {};
        groupingInfos[level].collapsed = collapse;

        if (collapse === true) {
          onGroupCollapsed.notify({ level: level, groupingKey: null });
        } else {
          onGroupExpanded.notify({ level: level, groupingKey: null });
        }
      }
      refresh();
    }

    /**
     * @param level {Number} Optional level to collapse.  If not specified, applies to all levels.
     */
    function collapseAllGroups(level) {
      expandCollapseAllGroups(level, true);
    }

    /**
     * @param level {Number} Optional level to expand.  If not specified, applies to all levels.
     */
    function expandAllGroups(level) {
      expandCollapseAllGroups(level, false);
    }

    function expandCollapseGroup(level, groupingKey, collapse) {
      toggledGroupsByLevel[level][groupingKey] = groupingInfos[level].collapsed ^ collapse;
      refresh();
    }

    /**
     * @param varArgs Either a Slick.Group's "groupingKey" property, or a
     *     variable argument list of grouping values denoting a unique path to the row.  For
     *     example, calling collapseGroup('high', '10%') will collapse the '10%' subgroup of
     *     the 'high' group.
     */
    function collapseGroup(varArgs) {
      var args = Array.prototype.slice.call(arguments);
      var arg0 = args[0];
      var groupingKey;
      var level;

      if (args.length === 1 && arg0.indexOf(groupingDelimiter) !== -1) {
        groupingKey = arg0;
        level = arg0.split(groupingDelimiter).length - 1;
      } else {
        groupingKey = args.join(groupingDelimiter);
        level = args.length - 1;
      }

      expandCollapseGroup(level, groupingKey, true);
      onGroupCollapsed.notify({ level: level, groupingKey: groupingKey });
    }

    /**
     * @param varArgs Either a Slick.Group's "groupingKey" property, or a
     *     variable argument list of grouping values denoting a unique path to the row.  For
     *     example, calling expandGroup('high', '10%') will expand the '10%' subgroup of
     *     the 'high' group.
     */
    function expandGroup(varArgs) {
      var args = Array.prototype.slice.call(arguments);
      var arg0 = args[0];
      var groupingKey;
      var level;

      if (args.length === 1 && arg0.indexOf(groupingDelimiter) !== -1) {
        level = arg0.split(groupingDelimiter).length - 1;
        groupingKey = arg0;
      } else {
        level = args.length - 1;
        groupingKey = args.join(groupingDelimiter);
      }

      expandCollapseGroup(level, groupingKey, false);
      onGroupExpanded.notify({ level: level, groupingKey: groupingKey });
    }

    function getGroups() {
      return groups;
    }

    function extractGroups(rows, parentGroup) {
      var group;
      var val;
      var groups = [];
      var groupsByVal = {};
      var r;
      var level = parentGroup ? parentGroup.level + 1 : 0;
      var gi = groupingInfos[level];

      for (var i = 0, l = gi.predefinedValues.length; i < l; i++) {
        val = gi.predefinedValues[i];
        group = groupsByVal[val];
        if (!group) {
          group = new Slick.Group();
          group.value = val;
          group.level = level;
          group.groupingKey = (parentGroup ? parentGroup.groupingKey + groupingDelimiter : '') + val;
          groups[groups.length] = group;
          groupsByVal[val] = group;
        }
      }

      for (var i = 0, l = rows.length; i < l; i++) {
        r = rows[i];
        val = gi.getterIsAFn ? gi.getter(r) : r[gi.getter];
        group = groupsByVal[val];
        if (!group) {
          group = new Slick.Group();
          group.value = val;
          group.level = level;
          group.groupingKey = (parentGroup ? parentGroup.groupingKey + groupingDelimiter : '') + val;
          groups[groups.length] = group;
          groupsByVal[val] = group;
        }

        group.rows[group.count++] = r;
      }

      if (level < groupingInfos.length - 1) {
        for (var i = 0; i < groups.length; i++) {
          group = groups[i];
          group.groups = extractGroups(group.rows, group);
        }
      }

      if(groups.length) {
        addTotals(groups, level);
      }

      groups.sort(groupingInfos[level].comparer);

      return groups;
    }

    function calculateTotals(totals) {
      var group = totals.group;
      var gi = groupingInfos[group.level];
      var isLeafLevel = (group.level == groupingInfos.length);
      var agg, idx = gi.aggregators.length;

      if (!isLeafLevel && gi.aggregateChildGroups) {
        // make sure all the subgroups are calculated
        var i = group.groups.length;
        while (i--) {
          if (!group.groups[i].totals.initialized) {
            calculateTotals(group.groups[i].totals);
          }
        }
      }

      while (idx--) {
        agg = gi.aggregators[idx];
        agg.init();
        if (!isLeafLevel && gi.aggregateChildGroups) {
          gi.compiledAccumulators[idx].call(agg, group.groups);
        } else {
          gi.compiledAccumulators[idx].call(agg, group.rows);
        }
        agg.storeResult(totals);
      }
      totals.initialized = true;
    }

    function addGroupTotals(group) {
      var gi = groupingInfos[group.level];
      var totals = new Slick.GroupTotals();
      totals.group = group;
      group.totals = totals;
      if (!gi.lazyTotalsCalculation) {
        calculateTotals(totals);
      }
    }

    function addTotals(groups, level) {
      level = level || 0;
      var gi = groupingInfos[level];
      var groupCollapsed = gi.collapsed;
      var toggledGroups = toggledGroupsByLevel[level];
      var idx = groups.length, g;
      while (idx--) {
        g = groups[idx];

        if (g.collapsed && !gi.aggregateCollapsed) {
          continue;
        }

        // Do a depth-first aggregation so that parent group aggregators can access subgroup totals.
        if (g.groups) {
          addTotals(g.groups, level + 1);
        }

        if (gi.aggregators.length && (
          gi.aggregateEmpty || g.rows.length || (g.groups && g.groups.length))) {
          addGroupTotals(g);
        }

        g.collapsed = groupCollapsed ^ toggledGroups[g.groupingKey];
        g.title = gi.formatter ? gi.formatter(g) : g.value;
      }
    }

    function flattenGroupedRows(groups, level) {
      level = level || 0;
      var gi = groupingInfos[level];
      var groupedRows = [], rows, gl = 0, g;
      for (var i = 0, l = groups.length; i < l; i++) {
        g = groups[i];
        groupedRows[gl++] = g;

        if (!g.collapsed) {
          rows = g.groups ? flattenGroupedRows(g.groups, level + 1) : g.rows;
          for (var j = 0, jj = rows.length; j < jj; j++) {
            groupedRows[gl++] = rows[j];
          }
        }

        if (g.totals && gi.displayTotalsRow && (!g.collapsed || gi.aggregateCollapsed)) {
          groupedRows[gl++] = g.totals;
        }
      }
      return groupedRows;
    }

    function getFunctionInfo(fn) {
      var fnStr = fn.toString();
      var usingEs5 = fnStr.indexOf('function') >= 0; // with ES6, the word function is not present
      var fnRegex = usingEs5 ? /^function[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/ : /^[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/;
      var matches = fn.toString().match(fnRegex);
      return {
        params: matches[1].split(","),
        body: matches[2]
      };
    }

    function compileAccumulatorLoop(aggregator) {
      if (aggregator.accumulate) {
        var accumulatorInfo = getFunctionInfo(aggregator.accumulate);
        var fn = new Function(
          "_items",
          "for (var " + accumulatorInfo.params[0] + ", _i=0, _il=_items.length; _i<_il; _i++) {" +
          accumulatorInfo.params[0] + " = _items[_i]; " +
          accumulatorInfo.body +
          "}"
        );
        var fnName = "compiledAccumulatorLoop";
        fn.displayName = fnName;
        fn.name = setFunctionName(fn, fnName);
        return fn;
      } else {
        return function noAccumulator() {
        }
      }
    }

    function compileFilter() {
      var filterInfo = getFunctionInfo(filter);

      var filterPath1 = "{ continue _coreloop; }$1";
      var filterPath2 = "{ _retval[_idx++] = $item$; continue _coreloop; }$1";
      // make some allowances for minification - there's only so far we can go with RegEx
      var filterBody = filterInfo.body
        .replace(/return false\s*([;}]|\}|$)/gi, filterPath1)
        .replace(/return!1([;}]|\}|$)/gi, filterPath1)
        .replace(/return true\s*([;}]|\}|$)/gi, filterPath2)
        .replace(/return!0([;}]|\}|$)/gi, filterPath2)
        .replace(/return ([^;}]+?)\s*([;}]|$)/gi,
          "{ if ($1) { _retval[_idx++] = $item$; }; continue _coreloop; }$2");

      // This preserves the function template code after JS compression,
      // so that replace() commands still work as expected.
      var tpl = [
        //"function(_items, _args) { ",
        "var _retval = [], _idx = 0; ",
        "var $item$, $args$ = _args; ",
        "_coreloop: ",
        "for (var _i = 0, _il = _items.length; _i < _il; _i++) { ",
        "$item$ = _items[_i]; ",
        "$filter$; ",
        "} ",
        "return _retval; "
        //"}"
      ].join("");
      tpl = tpl.replace(/\$filter\$/gi, filterBody);
      tpl = tpl.replace(/\$item\$/gi, filterInfo.params[0]);
      tpl = tpl.replace(/\$args\$/gi, filterInfo.params[1]);

      var fn = new Function("_items,_args", tpl);
      var fnName = "compiledFilter";
      fn.displayName = fnName;
      fn.name = setFunctionName(fn, fnName);
      return fn;
    }

    function compileFilterWithCaching() {
      var filterInfo = getFunctionInfo(filter);

      var filterPath1 = "{ continue _coreloop; }$1";
      var filterPath2 = "{ _cache[_i] = true;_retval[_idx++] = $item$; continue _coreloop; }$1";
      // make some allowances for minification - there's only so far we can go with RegEx
      var filterBody = filterInfo.body
        .replace(/return false\s*([;}]|\}|$)/gi, filterPath1)
        .replace(/return!1([;}]|\}|$)/gi, filterPath1)
        .replace(/return true\s*([;}]|\}|$)/gi, filterPath2)
        .replace(/return!0([;}]|\}|$)/gi, filterPath2)
        .replace(/return ([^;}]+?)\s*([;}]|$)/gi,
          "{ if ((_cache[_i] = $1)) { _retval[_idx++] = $item$; }; continue _coreloop; }$2");

      // This preserves the function template code after JS compression,
      // so that replace() commands still work as expected.
      var tpl = [
        //"function(_items, _args, _cache) { ",
        "var _retval = [], _idx = 0; ",
        "var $item$, $args$ = _args; ",
        "_coreloop: ",
        "for (var _i = 0, _il = _items.length; _i < _il; _i++) { ",
        "$item$ = _items[_i]; ",
        "if (_cache[_i]) { ",
        "_retval[_idx++] = $item$; ",
        "continue _coreloop; ",
        "} ",
        "$filter$; ",
        "} ",
        "return _retval; "
        //"}"
      ].join("");
      tpl = tpl.replace(/\$filter\$/gi, filterBody);
      tpl = tpl.replace(/\$item\$/gi, filterInfo.params[0]);
      tpl = tpl.replace(/\$args\$/gi, filterInfo.params[1]);

      var fn = new Function("_items,_args,_cache", tpl);
      var fnName = "compiledFilterWithCaching";
      fn.displayName = fnName;
      fn.name = setFunctionName(fn, fnName);
      return fn;
    }

    /**
     * In ES5 we could set the function name on the fly but in ES6 this is forbidden and we need to set it through differently
     * We can use Object.defineProperty and set it the property to writable, see MDN for reference
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
     * @param {string} fn
     * @param {string} fnName
     */
    function setFunctionName(fn, fnName) {
      try {
        Object.defineProperty(fn, 'name', {
          writable: true,
          value: fnName
        });
      } catch (err) {
        fn.name = fnName;
      }
    }

    function uncompiledFilter(items, args) {
      var retval = [], idx = 0;

      for (var i = 0, ii = items.length; i < ii; i++) {
        if (filter(items[i], args)) {
          retval[idx++] = items[i];
        }
      }

      return retval;
    }

    function uncompiledFilterWithCaching(items, args, cache) {
      var retval = [], idx = 0, item;

      for (var i = 0, ii = items.length; i < ii; i++) {
        item = items[i];
        if (cache[i]) {
          retval[idx++] = item;
        } else if (filter(item, args)) {
          retval[idx++] = item;
          cache[i] = true;
        }
      }

      return retval;
    }

    function getFilteredAndPagedItems(items) {
      if (filter) {
        var batchFilter = options.inlineFilters ? compiledFilter : uncompiledFilter;
        var batchFilterWithCaching = options.inlineFilters ? compiledFilterWithCaching : uncompiledFilterWithCaching;

        if (refreshHints.isFilterNarrowing) {
          filteredItems = batchFilter(filteredItems, filterArgs);
        } else if (refreshHints.isFilterExpanding) {
          filteredItems = batchFilterWithCaching(items, filterArgs, filterCache);
        } else if (!refreshHints.isFilterUnchanged) {
          filteredItems = batchFilter(items, filterArgs);
        }
      } else {
        // special case:  if not filtering and not paging, the resulting
        // rows collection needs to be a copy so that changes due to sort
        // can be caught
        filteredItems = pagesize ? items : items.concat();
      }

      // get the current page
      var paged;
      if (pagesize) {
        if (filteredItems.length <= pagenum * pagesize) {
          if (filteredItems.length === 0) {
            pagenum = 0;
          } else {
            pagenum = Math.floor((filteredItems.length - 1) / pagesize);
          }
        }
        paged = filteredItems.slice(pagesize * pagenum, pagesize * pagenum + pagesize);
      } else {
        paged = filteredItems;
      }
      return { totalRows: filteredItems.length, rows: paged };
    }

    function getRowDiffs(rows, newRows) {
      var item, r, eitherIsNonData, diff = [];
      var from = 0, to = Math.max(newRows.length, rows.length);

      if (refreshHints && refreshHints.ignoreDiffsBefore) {
        from = Math.max(0,
          Math.min(newRows.length, refreshHints.ignoreDiffsBefore));
      }

      if (refreshHints && refreshHints.ignoreDiffsAfter) {
        to = Math.min(newRows.length,
          Math.max(0, refreshHints.ignoreDiffsAfter));
      }

      for (var i = from, rl = rows.length; i < to; i++) {
        if (i >= rl) {
          diff[diff.length] = i;
        } else {
          item = newRows[i];
          r = rows[i];

          if (!item || (groupingInfos.length && (eitherIsNonData = (item.__nonDataRow) || (r.__nonDataRow)) &&
            item.__group !== r.__group ||
            item.__group && !item.equals(r))
            || (eitherIsNonData &&
              // no good way to compare totals since they are arbitrary DTOs
              // deep object comparison is pretty expensive
              // always considering them 'dirty' seems easier for the time being
              (item.__groupTotals || r.__groupTotals))
            || item[idProperty] != r[idProperty]
            || (updated && updated[item[idProperty]])
          ) {
            diff[diff.length] = i;
          }
        }
      }
      return diff;
    }

    function recalc(_items) {
      rowsById = null;

      if (refreshHints.isFilterNarrowing != prevRefreshHints.isFilterNarrowing ||
        refreshHints.isFilterExpanding != prevRefreshHints.isFilterExpanding) {
        filterCache = [];
      }

      var filteredItems = getFilteredAndPagedItems(_items);
      totalRows = filteredItems.totalRows;
      var newRows = filteredItems.rows;

      groups = [];
      if (groupingInfos.length) {
        groups = extractGroups(newRows);
        if (groups.length) {
          newRows = flattenGroupedRows(groups);
        }
      }

      var diff = getRowDiffs(rows, newRows);

      rows = newRows;

      return diff;
    }

    function refresh() {
      if (suspend) {
        return;
      }

      var previousPagingInfo = $.extend(true, {}, getPagingInfo());

      var countBefore = rows.length;
      var totalRowsBefore = totalRows;

      var diff = recalc(items, filter); // pass as direct refs to avoid closure perf hit

      // if the current page is no longer valid, go to last page and recalc
      // we suffer a performance penalty here, but the main loop (recalc) remains highly optimized
      if (pagesize && totalRows < pagenum * pagesize) {
        pagenum = Math.max(0, Math.ceil(totalRows / pagesize) - 1);
        diff = recalc(items, filter);
      }

      updated = null;
      prevRefreshHints = refreshHints;
      refreshHints = {};

      if (totalRowsBefore !== totalRows) {
        // use the previously saved paging info
        if (onBeforePagingInfoChanged.notify(previousPagingInfo, null, self) !== false) {
          onPagingInfoChanged.notify(getPagingInfo(), null, self);
        }
      }
      if (countBefore !== rows.length) {
        onRowCountChanged.notify({ previous: countBefore, current: rows.length, itemCount: items.length, dataView: self, callingOnRowsChanged: (diff.length > 0) }, null, self);
      }
      if (diff.length > 0) {
        onRowsChanged.notify({ rows: diff, itemCount: items.length, dataView: self, calledOnRowCountChanged: (countBefore !== rows.length) }, null, self);
      }
      if (countBefore !== rows.length || diff.length > 0) {
        onRowsOrCountChanged.notify({
          rowsDiff: diff, previousRowCount: countBefore, currentRowCount: rows.length, itemCount: items.length,
          rowCountChanged: countBefore !== rows.length, rowsChanged: diff.length > 0, dataView: self
        }, null, self);
      }
    }
    /***
     * Wires the grid and the DataView together to keep row selection tied to item ids.
     * This is useful since, without it, the grid only knows about rows, so if the items
     * move around, the same rows stay selected instead of the selection moving along
     * with the items.
     *
     * NOTE:  This doesn't work with cell selection model.
     *
     * @param grid {Slick.Grid} The grid to sync selection with.
     * @param preserveHidden {Boolean} Whether to keep selected items that go out of the
     *     view due to them getting filtered out.
     * @param preserveHiddenOnSelectionChange {Boolean} Whether to keep selected items
     *     that are currently out of the view (see preserveHidden) as selected when selection
     *     changes.
     * @return {Slick.Event} An event that notifies when an internal list of selected row ids
     *     changes.  This is useful since, in combination with the above two options, it allows
     *     access to the full list selected row ids, and not just the ones visible to the grid.
     * @method syncGridSelection
     */
    function syncGridSelection(grid, preserveHidden, preserveHiddenOnSelectionChange) {
      var self = this;
      _grid = grid;
      var inHandler;
      selectedRowIds = self.mapRowsToIds(grid.getSelectedRows());
      var onSelectedRowIdsChanged = new Slick.Event();

      function setSelectedRowIds(rowIds) {
        if (selectedRowIds.join(",") == rowIds.join(",")) {
          return;
        }

        selectedRowIds = rowIds;

        onSelectedRowIdsChanged.notify({
          "grid": grid,
          "ids": selectedRowIds,
          "dataView": self
        }, new Slick.EventData(), self);
      }

      function update() {
        if (selectedRowIds.length > 0) {
          inHandler = true;
          var selectedRows = self.mapIdsToRows(selectedRowIds);
          if (!preserveHidden) {
            setSelectedRowIds(self.mapRowsToIds(selectedRows));
          }
          grid.setSelectedRows(selectedRows);
          inHandler = false;
        }
      }

      grid.onSelectedRowsChanged.subscribe(function (e, args) {
        if (inHandler) { return; }
        var newSelectedRowIds = self.mapRowsToIds(grid.getSelectedRows());
        if (!preserveHiddenOnSelectionChange || !grid.getOptions().multiSelect) {
          setSelectedRowIds(newSelectedRowIds);
        } else {
          // keep the ones that are hidden
          var existing = $.grep(selectedRowIds, function (id) { return self.getRowById(id) === undefined; });
          // add the newly selected ones
          setSelectedRowIds(existing.concat(newSelectedRowIds));
        }
      });

      this.onRowsOrCountChanged.subscribe(update);

      return onSelectedRowIdsChanged;
    }

    /** Get all selected IDs */
    function getAllSelectedIds(){
      return selectedRowIds;
    }

    /** Get all selected dataContext items */
    function getAllSelectedItems() {
      var selectedData = [];
      var selectedIds = getAllSelectedIds();
      selectedIds.forEach(function (id) {
          selectedData.push(self.getItemById(id));
      });
      return selectedData;
    }

    function syncGridCellCssStyles(grid, key) {
      var hashById;
      var inHandler;

      // since this method can be called after the cell styles have been set,
      // get the existing ones right away
      storeCellCssStyles(grid.getCellCssStyles(key));

      function storeCellCssStyles(hash) {
        hashById = {};
        for (var row in hash) {
          var id = rows[row][idProperty];
          hashById[id] = hash[row];
        }
      }

      function update() {
        if (hashById) {
          inHandler = true;
          ensureRowsByIdCache();
          var newHash = {};
          for (var id in hashById) {
            var row = rowsById[id];
            if (row != undefined) {
              newHash[row] = hashById[id];
            }
          }
          grid.setCellCssStyles(key, newHash);
          inHandler = false;
        }
      }

      grid.onCellCssStylesChanged.subscribe(function (e, args) {
        if (inHandler) { return; }
        if (key != args.key) { return; }
        if (args.hash) {
          storeCellCssStyles(args.hash);
        } else {
          grid.onCellCssStylesChanged.unsubscribe();
          self.onRowsOrCountChanged.unsubscribe(update);
        }
      });

      this.onRowsOrCountChanged.subscribe(update);
    }

    $.extend(this, {
      // methods
      "beginUpdate": beginUpdate,
      "endUpdate": endUpdate,
      "destroy": destroy,
      "setPagingOptions": setPagingOptions,
      "getPagingInfo": getPagingInfo,
      "getIdPropertyName": getIdPropertyName,
      "getItems": getItems,
      "setItems": setItems,
      "setFilter": setFilter,
      "getFilter": getFilter,
      "getFilteredItems": getFilteredItems,
      "getFilteredItemCount": getFilteredItemCount,
      "sort": sort,
      "fastSort": fastSort,
      "reSort": reSort,
      "setGrouping": setGrouping,
      "getGrouping": getGrouping,
      "groupBy": groupBy,
      "setAggregators": setAggregators,
      "collapseAllGroups": collapseAllGroups,
      "expandAllGroups": expandAllGroups,
      "collapseGroup": collapseGroup,
      "expandGroup": expandGroup,
      "getGroups": getGroups,
      "getAllSelectedIds": getAllSelectedIds,
      "getAllSelectedItems": getAllSelectedItems,
      "getIdxById": getIdxById,
      "getRowByItem": getRowByItem,
      "getRowById": getRowById,
      "getItemById": getItemById,
      "getItemByIdx": getItemByIdx,
      "mapItemsToRows": mapItemsToRows,
      "mapRowsToIds": mapRowsToIds,
      "mapIdsToRows": mapIdsToRows,
      "setRefreshHints": setRefreshHints,
      "setFilterArgs": setFilterArgs,
      "refresh": refresh,
      "updateItem": updateItem,
      "updateItems": updateItems,
      "insertItem": insertItem,
      "insertItems": insertItems,
      "addItem": addItem,
      "addItems": addItems,
      "deleteItem": deleteItem,
      "deleteItems": deleteItems,
      "sortedAddItem": sortedAddItem,
      "sortedUpdateItem": sortedUpdateItem,
      "syncGridSelection": syncGridSelection,
      "syncGridCellCssStyles": syncGridCellCssStyles,

      // data provider methods
      "getItemCount": getItemCount,
      "getLength": getLength,
      "getItem": getItem,
      "getItemMetadata": getItemMetadata,

      // events
      "onSetItemsCalled": onSetItemsCalled,
      "onRowCountChanged": onRowCountChanged,
      "onRowsChanged": onRowsChanged,
      "onRowsOrCountChanged": onRowsOrCountChanged,
      "onBeforePagingInfoChanged": onBeforePagingInfoChanged,
      "onPagingInfoChanged": onPagingInfoChanged,
      "onGroupExpanded": onGroupExpanded,
      "onGroupCollapsed": onGroupCollapsed,
    });
  }

  function AvgAggregator(field) {
    this.field_ = field;

    this.init = function () {
      this.count_ = 0;
      this.nonNullCount_ = 0;
      this.sum_ = 0;
    };

    this.accumulate = function (item) {
      var val = item[this.field_];
      this.count_++;
      if (val != null && val !== "" && !isNaN(val)) {
        this.nonNullCount_++;
        this.sum_ += parseFloat(val);
      }
    };

    this.storeResult = function (groupTotals) {
      if (!groupTotals.avg) {
        groupTotals.avg = {};
      }
      if (this.nonNullCount_ !== 0) {
        groupTotals.avg[this.field_] = this.sum_ / this.nonNullCount_;
      }
    };
  }

  function MinAggregator(field) {
    this.field_ = field;

    this.init = function () {
      this.min_ = null;
    };

    this.accumulate = function (item) {
      var val = item[this.field_];
      if (val != null && val !== "" && !isNaN(val)) {
        if (this.min_ == null || val < this.min_) {
          this.min_ = val;
        }
      }
    };

    this.storeResult = function (groupTotals) {
      if (!groupTotals.min) {
        groupTotals.min = {};
      }
      groupTotals.min[this.field_] = this.min_;
    };
  }

  function MaxAggregator(field) {
    this.field_ = field;

    this.init = function () {
      this.max_ = null;
    };

    this.accumulate = function (item) {
      var val = item[this.field_];
      if (val != null && val !== "" && !isNaN(val)) {
        if (this.max_ == null || val > this.max_) {
          this.max_ = val;
        }
      }
    };

    this.storeResult = function (groupTotals) {
      if (!groupTotals.max) {
        groupTotals.max = {};
      }
      groupTotals.max[this.field_] = this.max_;
    };
  }

  function SumAggregator(field) {
    this.field_ = field;

    this.init = function () {
      this.sum_ = null;
    };

    this.accumulate = function (item) {
      var val = item[this.field_];
      if (val != null && val !== "" && !isNaN(val)) {
        this.sum_ += parseFloat(val);
      }
    };

    this.storeResult = function (groupTotals) {
      if (!groupTotals.sum) {
        groupTotals.sum = {};
      }
      groupTotals.sum[this.field_] = this.sum_;
    };
  }

  function CountAggregator(field) {
    this.field_ = field;

    this.init = function () {
    };

    this.storeResult = function (groupTotals) {
      if (!groupTotals.count) {
        groupTotals.count = {};
      }
      groupTotals.count[this.field_] = groupTotals.group.rows.length;
    };
  }

  // TODO:  add more built-in aggregators
  // TODO:  merge common aggregators in one to prevent needles iterating

  // exports
  $.extend(true, window, {
    Slick: {
      Data: {
        DataView: DataView,
        Aggregators: {
          Avg: AvgAggregator,
          Min: MinAggregator,
          Max: MaxAggregator,
          Sum: SumAggregator,
          Count: CountAggregator
        }
      }
    }
  });
})(jQuery);
