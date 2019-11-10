/***
 * A simple observer pattern implementation.
 */
function EventHelper() {
    this.handlers = [];

    this.subscribe = function(fn) {
        this.handlers.push(fn);
    };

    this.notify = function(args) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i].call(this, args);
        }
    };

    return this;
}


(function($) {
    /***
     * A sample Model implementation.
     * Provides a filtered view of the underlying data.
     *
     * Relies on the data item having an "id" property uniquely identifying it.
     */
    function DataView() {
        var self = this;

        // private
        var idProperty = "id";  // property holding a unique row id
        var items = [];			// data by index
        var rows = [];			// data by row
        var idxById = {};		// indexes by id
        var rowsById = null;	// rows by id; lazy-calculated
        var filter = null;		// filter function
        var updated = null; 	// updated item ids
        var suspend = false;	// suspends the recalculation
        var sortAsc = true;
        var sortComparer = null;
        var fastSortField = null;

        var pagesize = 0;
        var pagenum = 0;
        var totalRows = 0;

        // events
        var onRowCountChanged = new EventHelper();
        var onRowsChanged = new EventHelper();
        var onPagingInfoChanged = new EventHelper();


        function beginUpdate() {
            suspend = true;
        }

        function endUpdate() {
            suspend = false;
            refresh();
        }

        function refreshIdxById() {
            idxById = {};
            for (var i = 0,l = items.length; i < l; i++) {
                var id = items[i][idProperty];
                if (id == undefined || idxById[id] != undefined)
                    throw "Each data element must implement a unique 'id' property";
                idxById[id] = i;
            }
        }

        function getItems() {
            return items;
        }

        function setItems(data, objectIdProperty) {
            if (objectIdProperty !== undefined) idProperty = objectIdProperty;
            items = data;
            refreshIdxById();
            refresh();
        }

        function setPagingOptions(args) {
            if (args.pageSize != undefined)
                pagesize = args.pageSize;

            if (args.pageNum != undefined)
                pagenum = Math.min(args.pageNum, Math.ceil(totalRows / pagesize));

            onPagingInfoChanged.notify(getPagingInfo());

            refresh();
        }

        function getPagingInfo() {
            return {pageSize:pagesize, pageNum:pagenum, totalRows:totalRows};
        }

        function sort(comparer, ascending) {
            sortAsc = ascending;
            sortComparer = comparer;
            fastSortField = null;
            if (ascending === false) items.reverse();
            items.sort(comparer);
            if (ascending === false) items.reverse();
            refreshIdxById();
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
            Object.prototype.toString = (typeof field == "function")?field:function() { return this[field] };
            // an extra reversal for descending sort keeps the sort stable
            // (assuming a stable native sort implementation, which isn't true in some cases)
            if (ascending === false) items.reverse();
            items.sort();
            Object.prototype.toString = oldToString;
            if (ascending === false) items.reverse();
            refreshIdxById();
            refresh();
        }

        function reSort() {
            if (sortComparer)
                sort(sortComparer,sortAsc);
            else if (fastSortField)
                fastSort(fastSortField,sortAsc);
        }

        function setFilter(filterFn) {
            filter = filterFn;
            refresh();
        }

        function getItemByIdx(i) {
            return items[i];
        }

        function getIdxById(id) {
            return idxById[id];
        }

        // calculate the lookup table on first call
        function getRowById(id) {
            if (!rowsById) {
                rowsById = {};
                for (var i = 0, l = rows.length; i < l; ++i) {
                    rowsById[rows[i][idProperty]] = i;
                }
            }

            return rowsById[id];
        }

        function getItemById(id) {
            return items[idxById[id]];
        }

        function updateItem(id, item) {
            if (idxById[id] === undefined || id !== item[idProperty])
                throw "Invalid or non-matching id";
            items[idxById[id]] = item;
            if (!updated) updated = {};
            updated[id] = true;
            refresh();
        }

        function insertItem(insertBefore, item) {
            items.splice(insertBefore, 0, item);
            refreshIdxById();  // TODO:  optimize
            refresh();
        }

        function addItem(item) {
            items.push(item);
            refreshIdxById();  // TODO:  optimize
            refresh();
        }

        function deleteItem(id) {
            if (idxById[id] === undefined)
                throw "Invalid id";
            items.splice(idxById[id], 1);
            refreshIdxById();  // TODO:  optimize
            refresh();
        }

        function recalc(_items, _rows, _filter, _updated) {
            var diff = [];
            var items = _items, rows = _rows, filter = _filter, updated = _updated; // cache as local vars

            rowsById = null;

            // go over all items remapping them to rows on the fly
            // while keeping track of the differences and updating indexes
            var rl = rows.length;
            var currentRowIndex = 0;
            var currentPageIndex = 0;
            var item,id;

            for (var i = 0, il = items.length; i < il; ++i) {
                item = items[i];

                if (!filter || filter(item)) {
                    id = item[idProperty];

                    if (!pagesize || (currentRowIndex >= pagesize * pagenum && currentRowIndex < pagesize * (pagenum + 1))) {
                        if (currentPageIndex >= rl || id != rows[currentPageIndex][idProperty] || (updated && updated[id])) {
                            diff[diff.length] = currentPageIndex;
                            rows[currentPageIndex] = item;
                        }

                        currentPageIndex++;
                    }

                    currentRowIndex++;
                }
            }

            if (rl > currentPageIndex)
                rows.splice(currentPageIndex, rl - currentPageIndex);

            totalRows = currentRowIndex;

            return diff;
        }

        function refresh() {
            if (suspend) return;

            var countBefore = rows.length;
            var totalRowsBefore = totalRows;

            var diff = recalc(items, rows, filter, updated); // pass as direct refs to avoid closure perf hit

            // if the current page is no longer valid, go to last page and recalc
            // we suffer a performance penalty here, but the main loop (recalc) remains highly optimized
            if (pagesize && totalRows < pagenum * pagesize) {
                pagenum = Math.floor(totalRows / pagesize);
                diff = recalc(items, rows, filter, updated);
            }

            updated = null;

            if (totalRowsBefore != totalRows) onPagingInfoChanged.notify(getPagingInfo());
            if (countBefore != rows.length) onRowCountChanged.notify({previous:countBefore, current:rows.length});
            if (diff.length > 0) onRowsChanged.notify(diff);
        }


        return {
            // properties
            "rows":             rows,  // note: neither the array or the data in it should be modified directly

            // methods
            "beginUpdate":      beginUpdate,
            "endUpdate":        endUpdate,
            "setPagingOptions": setPagingOptions,
            "getPagingInfo":    getPagingInfo,
            "getItems":         getItems,
            "setItems":         setItems,
            "setFilter":        setFilter,
            "sort":             sort,
            "fastSort":         fastSort,
            "reSort":           reSort,
            "getIdxById":       getIdxById,
            "getRowById":       getRowById,
            "getItemById":      getItemById,
            "getItemByIdx":     getItemByIdx,
            "refresh":          refresh,
            "updateItem":       updateItem,
            "insertItem":       insertItem,
            "addItem":          addItem,
            "deleteItem":       deleteItem,

            // events
            "onRowCountChanged":    onRowCountChanged,
            "onRowsChanged":        onRowsChanged,
            "onPagingInfoChanged":  onPagingInfoChanged
        };
    }

    // Slick.Data.DataView
    $.extend(true, window, { Slick: { Data: { DataView: DataView }}});
})(jQuery);