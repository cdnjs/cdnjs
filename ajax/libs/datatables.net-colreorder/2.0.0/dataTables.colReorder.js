/*! ColReorder 2.0.0-dev
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;



(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * Mutate an array, moving a set of elements into a new index position
 *
 * @param arr Array to modify
 * @param from Start move index
 * @param count Number of elements to move
 * @param to Index where the start element will move to
 */
function arrayMove(arr, from, count, to) {
    var movers = arr.splice(from, count);
    // Add delete and start to the array, so we can use it for the `apply`
    movers.unshift(0); // splice delete param
    movers.unshift(to < from ? to : to - count + 1); // splice start param
    arr.splice.apply(arr, movers);
}
/**
 * Run finishing activities after one or more columns have been reordered.
 *
 * @param dt DataTable being operated on - must be a single table instance
 */
function finalise(dt) {
    // Cache invalidation. Always read from the data object rather
    // than reading back from the DOM since it could have been
    // changed by a renderer
    dt.rows().invalidate('data');
    // Redraw the header / footer. Its a little bit of a hack this, as DT
    // doesn't expose the header draw as an API method. It calls state
    // saving, so we don't need to here.
    dt.column(0).visible(dt.column(0).visible());
    dt.columns.adjust();
    // Fire an event so other plug-ins can update
    var order = dt.colReorder.order();
    dt.trigger('columns-reordered', [
        {
            order: order,
            mapping: invertKeyValues(order)
        }
    ]);
}
/**
 * Get the original indexes in their current order
 *
 * @param dt DataTable being operated on - must be a single table instance
 * @returns Original indexes in current order
 */
function getOrder(dt) {
    return dt.settings()[0].aoColumns.map(function (col) {
        return col._crOriginalIdx;
    });
}
/**
 * Manipulate a header / footer array in DataTables settings to reorder
 * the columns.
 */
function headerUpdate(structure, map, from, to) {
    var done = [];
    for (var i = 0; i < structure.length; i++) {
        var headerRow = structure[i];
        arrayMove(headerRow, from[0], from.length, to);
        for (var j = 0; j < headerRow.length; j++) {
            var cell = headerRow[j].cell;
            // Only work on a DOM element once, otherwise we risk remapping a
            // remapped value (etc).
            if (done.includes(cell)) {
                continue;
            }
            var indexes = cell.getAttribute('data-dt-column').split(',');
            var mapped = indexes
                .map(function (idx) {
                return map[idx];
            })
                .join(',');
            // Update data attributes for the new column position
            cell.setAttribute('data-dt-column', mapped);
            done.push(cell);
        }
    }
}
/**
 * Setup for ColReorder API operations
 *
 * @param dt DataTable(s) being operated on - might have multiple tables!
 */
function init(api) {
    // Assign the original column index to a parameter that we can lookup.
    // On the first pass (i.e. when the parameter hasn't yet been set), the
    // index order will be the original order, so this is quite a simple
    // assignment.
    api.columns().iterator('column', function (s, idx) {
        var columns = s.aoColumns;
        if (columns[idx]._crOriginalIdx === undefined) {
            columns[idx]._crOriginalIdx = idx;
        }
    });
}
/**
 * Switch the key value pairing of an index array to be value key (i.e. the old value is now the
 * key). For example consider [ 2, 0, 1 ] this would be returned as [ 1, 2, 0 ].
 *
 *  @param   array arr Array to switch around
 */
function invertKeyValues(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result[arr[i]] = i;
    }
    return result;
}
/**
 * Move one or more columns from one index to another.
 *
 * This method has a lot of knowledge about how DataTables works internally.
 * If DataTables changes how it handles cells, columns, etc, then this
 * method would need to be updated accordingly.
 *
 * @param dt DataTable being operated on - must be a single table instance
 * @param from Column indexes to move
 * @param to Destination index (starting if multiple)
 */
function move(dt, from, to) {
    var i, j;
    var settings = dt.settings()[0];
    var columns = settings.aoColumns;
    var newOrder = columns.map(function (col, idx) {
        return idx;
    });
    // The to column in already inside the from column(s) (might be the same)
    // no change required
    if (from.includes(to)) {
        return;
    }
    // A reverse index array so we can look up new indexes from old
    arrayMove(newOrder, from[0], from.length, to);
    var reverseIndexes = invertKeyValues(newOrder);
    // Main column
    arrayMove(columns, from[0], from.length, to);
    // Per row manipulations
    for (i = 0; i < settings.aoData.length; i++) {
        var data = settings.aoData[i];
        var cells = data.anCells;
        if (cells) {
            // Array of cells
            arrayMove(cells, from[0], from.length, to);
            for (j = 0; j < cells.length; j++) {
                // Reinsert into the document in the new order
                if (data.nTr && cells[j] && columns[j].bVisible) {
                    data.nTr.appendChild(cells[j]);
                }
                // Update lookup index
                if (cells[j] && cells[j]._DT_CellIndex) {
                    cells[j]._DT_CellIndex.column = j;
                }
            }
        }
    }
    // Per column manipulation
    for (i = 0; i < columns.length; i++) {
        var column = columns[i];
        // Data column sorting
        for (j = 0; j < column.aDataSort.length; j++) {
            column.aDataSort[j] = reverseIndexes[column.aDataSort[j]];
        }
        // Update the column indexes
        column.idx = reverseIndexes[column.idx];
        // Reorder the colgroup > col elements for the new order
        if (column.bVisible) {
            settings.colgroup.append(column.colEl);
        }
    }
    // Header and footer
    headerUpdate(settings.aoHeader, reverseIndexes, from, to);
    headerUpdate(settings.aoFooter, reverseIndexes, from, to);
    // Search - columns
    arrayMove(settings.aoPreSearchCols, from[0], from.length, to);
    // Ordering indexes update - note that the sort listener on the
    // header works out the index to apply on each draw, so it doesn't
    // need to be updated here.
    orderingIndexes(reverseIndexes, settings.aaSorting);
    if (Array.isArray(settings.aaSortingFixed)) {
        orderingIndexes(reverseIndexes, settings.aaSortingFixed);
    }
    else if (settings.aaSortingFixed.pre) {
        orderingIndexes(reverseIndexes, settings.aaSortingFixed.pre);
    }
    else if (settings.aaSortingFixed.post) {
        orderingIndexes(reverseIndexes, settings.aaSortingFixed.pre);
    }
    settings.aLastSort.forEach(function (el) {
        el.src = reverseIndexes[el.src];
    });
    // Fire an event so other plug-ins can update
    dt.trigger('column-reorder', [
        dt.settings()[0],
        {
            from: from,
            to: to,
            mapping: reverseIndexes
        }
    ]);
}
/**
 * Update the indexing for ordering arrays
 *
 * @param map Reverse index map
 * @param order Array to update
 */
function orderingIndexes(map, order) {
    for (var i = 0; i < order.length; i++) {
        var el = order[i];
        if (typeof el === 'number') {
            // Just a number
            order[i] = map[el];
        }
        else if ($.isPlainObject(el) && el.idx !== undefined) {
            // New index in an object style
            el.idx = map[el.idx];
        }
        else if (Array.isArray(el) && typeof el[0] === 'number') {
            // The good old fixes length array
            el[0] = map[el[0]];
        }
        // No need to update if in object + .name style
    }
}
/**
 * Take an index array for the current positioned, reordered to what you want
 * them to be.
 *
 * @param dt DataTable being operated on - must be a single table instance
 * @param order Indexes from current order, positioned as you want them to be
 */
function setOrder(dt, order, original) {
    var changed = false;
    var i;
    if (order.length !== dt.columns().count()) {
        dt.error('ColReorder - column count mismatch');
        return;
    }
    // The order given is based on the original indexes, rather than the
    // existing ones, so we need to translate from the original to current
    // before then doing the order
    if (original) {
        order = transpose(dt, order, 'toCurrent');
    }
    // The API is array index as the desired position, but our algorithm below is
    // for array index as the current position. So we need to invert for it to work.
    var setOrder = invertKeyValues(order);
    // Move columns, one by one with validation disabled!
    for (i = 0; i < setOrder.length; i++) {
        var currentIndex = setOrder.indexOf(i);
        if (i !== currentIndex) {
            // Reorder our switching error
            arrayMove(setOrder, currentIndex, 1, i);
            // Do the reorder
            move(dt, [currentIndex], i);
            changed = true;
        }
    }
    // Reorder complete
    if (changed) {
        finalise(dt);
    }
}
/**
 * Convert the DataTables header structure array into a 2D array where each
 * element has a reference to its TH/TD cell (regardless of spanning).
 *
 * @param structure Header / footer structure object
 * @returns 2D array of header cells
 */
function structureFill(structure) {
    var filledIn = [];
    for (var row = 0; row < structure.length; row++) {
        filledIn.push([]);
        for (var col = 0; col < structure[row].length; col++) {
            var cell = structure[row][col];
            if (cell) {
                for (var rowInner = 0; rowInner < cell.rowspan; rowInner++) {
                    for (var colInner = 0; colInner < cell.colspan; colInner++) {
                        filledIn[row + rowInner][col + colInner] = cell.cell;
                    }
                }
            }
        }
    }
    return filledIn;
}
/**
 * Convert the index type
 *
 * @param dt DataTable to work on
 * @param idx Index to transform
 * @param dir Transform direction
 * @returns Converted number(s)
 */
function transpose(dt, idx, dir) {
    var order = dt.colReorder.order();
    var columns = dt.settings()[0].aoColumns;
    if (dir === 'toCurrent' || dir === 'fromOriginal') {
        // Given an original index, want the current
        return !Array.isArray(idx)
            ? order.indexOf(idx)
            : idx.map(function (index) {
                return order.indexOf(index);
            });
    }
    // Given a current index, want the original
    return !Array.isArray(idx)
        ? columns[idx]._crOriginalIdx
        : idx.map(function (index) {
            return columns[index]._crOriginalIdx;
        });
}
/**
 * Validate that a requested move is okay. This includes bound checking
 * and that it won't split colspan'ed cells.
 *
 * @param table API instance
 * @param from Column indexes to move
 * @param to Destination index (starting if multiple)
 * @returns Validation result
 */
function validateMove(table, from, to) {
    var columns = table.columns().count();
    // Sanity and bound checking
    if (from[0] < to && to < from[from.length]) {
        return false;
    }
    if (from[0] < 0 && from[from.length - 1] > columns) {
        return false;
    }
    if (to < 0 && to > columns) {
        return false;
    }
    // No change - it's valid
    if (from.includes(to)) {
        return true;
    }
    if (!validateStructureMove(table.table().header.structure(), from, to)) {
        return false;
    }
    if (!validateStructureMove(table.table().footer.structure(), from, to)) {
        return false;
    }
    return true;
}
/**
 * For a given structure check that the move is valid.
 * @param structure
 * @param from
 * @param to
 * @returns
 */
function validateStructureMove(structure, from, to) {
    var header = structureFill(structure);
    var i;
    // Shuffle the header cells around
    for (i = 0; i < header.length; i++) {
        arrayMove(header[i], from[0], from.length, to);
    }
    // Sanity check that the headers are next to each other
    for (i = 0; i < header.length; i++) {
        var seen = [];
        for (var j = 0; j < header[i].length; j++) {
            var cell = header[i][j];
            if (!seen.includes(cell)) {
                // Hasn't been seen before
                seen.push(cell);
            }
            else if (seen[seen.length - 1] !== cell) {
                // Has been seen before and is not the previous cell - validation failed
                return false;
            }
        }
    }
    return true;
}

/**
 * This is one possible UI for column reordering in DataTables. In this case
 * columns are reordered by clicking and dragging a column header. It calculates
 * where columns can be dropped based on the column header used to start the drag
 * and then `colReorder.move()` method to alter the DataTable.
 */
var ColReorder = /** @class */ (function () {
    function ColReorder(dt, opts) {
        this.dom = {
            drag: null
        };
        this.c = {
            columns: null,
            enable: null,
            order: null
        };
        this.s = {
            dropZones: [],
            mouse: {
                absLeft: -1,
                offset: {
                    x: -1,
                    y: -1
                },
                start: {
                    x: -1,
                    y: -1
                },
                target: null,
                targets: []
            },
            scrollInterval: null
        };
        var that = this;
        var ctx = dt.settings()[0];
        // Check if ColReorder already has been initialised on this DataTable - only
        // one can exist.
        if (ctx._colReorder) {
            return;
        }
        dt.settings()[0]._colReorder = this;
        this.dt = dt;
        $.extend(this.c, ColReorder.defaults, opts);
        init(dt);
        dt.on('stateSaveParams', function (e, s, d) {
            d.colReorder = getOrder(dt);
        });
        dt.on('destroy', function () {
            dt.off('.colReorder');
            dt.colReorder.reset();
        });
        // Initial ordering / state restoring
        var loaded = dt.state.loaded();
        var order = this.c.order;
        if (loaded && loaded.colReorder) {
            order = loaded.colReorder;
        }
        if (order) {
            dt.ready(function () {
                setOrder(dt, order, true);
            });
        }
        dt.table()
            .header.structure()
            .forEach(function (row) {
            for (var i = 0; i < row.length; i++) {
                if (row[i] && row[i].cell) {
                    that._addListener(row[i].cell);
                }
            }
        });
    }
    ColReorder.prototype.disable = function () {
        this.c.enable = false;
        return this;
    };
    ColReorder.prototype.enable = function (flag) {
        if (flag === void 0) { flag = true; }
        if (flag === false) {
            return this.disable();
        }
        this.c.enable = true;
        return this;
    };
    /**
     * Attach the mouse down listener to an element to start a column reorder action
     *
     * @param el
     */
    ColReorder.prototype._addListener = function (el) {
        var that = this;
        $(el)
            .on('selectstart.colReorder', function () {
            return false;
        })
            .on('mousedown.colReorder touchstart.colReorder', function (e) {
            // Ignore middle and right click
            if (e.type === 'mousedown' && e.which !== 1) {
                return;
            }
            // Ignore if disabled
            if (!that.c.enable) {
                return;
            }
            that._mouseDown(e, this);
        });
    };
    /**
     * Create the element that is dragged around the page
     */
    ColReorder.prototype._createDragNode = function () {
        var origCell = this.s.mouse.target;
        var origTr = origCell.parent();
        var origThead = origTr.parent();
        var origTable = origThead.parent();
        var cloneCell = origCell.clone();
        // This is a slightly odd combination of jQuery and DOM, but it is the
        // fastest and least resource intensive way I could think of cloning
        // the table with just a single header cell in it.
        this.dom.drag = $(origTable[0].cloneNode(false))
            .addClass('dtcr-cloned')
            .append($(origThead[0].cloneNode(false)).append($(origTr[0].cloneNode(false)).append(cloneCell[0])) // Not sure why  it doesn't want to append a jQuery node
        )
            .css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: $(origCell).outerWidth(),
            height: $(origCell).outerHeight()
        })
            .appendTo('body');
    };
    /**
     * Get cursor position regardless of mouse or touch input
     *
     * @param e Event
     * @param prop Property name to get
     * @returns Value - assuming a number here
     */
    ColReorder.prototype._cursorPosition = function (e, prop) {
        return e.type.indexOf('touch') !== -1 ? e.originalEvent.touches[0][prop] : e[prop];
    };
    /**
     * Cache values at start
     *
     * @param e Triggering event
     * @param cell Cell that the action started on
     * @returns
     */
    ColReorder.prototype._mouseDown = function (e, cell) {
        var _this = this;
        var target = $(e.target).closest('th, td');
        var offset = target.offset();
        var moveableColumns = this.dt.columns(this.c.columns).indexes().toArray();
        var moveColumnIndexes = $(cell)
            .attr('data-dt-column')
            .split(',')
            .map(function (val) {
            return parseInt(val, 10);
        });
        // Don't do anything for columns which are not selected as moveable
        for (var j = 0; j < moveColumnIndexes.length; j++) {
            if (!moveableColumns.includes(moveColumnIndexes[j])) {
                return false;
            }
        }
        this.s.mouse.start.x = this._cursorPosition(e, 'pageX');
        this.s.mouse.start.y = this._cursorPosition(e, 'pageY');
        this.s.mouse.offset.x = this._cursorPosition(e, 'pageX') - offset.left;
        this.s.mouse.offset.y = this._cursorPosition(e, 'pageY') - offset.top;
        this.s.mouse.target = target;
        this.s.mouse.targets = moveColumnIndexes;
        // Classes to highlight the columns being moved
        for (var i = 0; i < moveColumnIndexes.length; i++) {
            var cells = this.dt
                .cells(null, moveColumnIndexes[i], { page: 'current' })
                .nodes()
                .to$();
            var klass = 'dtcr-moving';
            if (i === 0) {
                klass += ' dtcr-moving-first';
            }
            if (i === moveColumnIndexes.length - 1) {
                klass += ' dtcr-moving-last';
            }
            cells.addClass(klass);
        }
        this._regions(moveColumnIndexes);
        this._scrollRegions();
        /* Add event handlers to the document */
        $(document)
            .on('mousemove.colReorder touchmove.colReorder', function (e) {
            _this._mouseMove(e);
        })
            .on('mouseup.colReorder touchend.colReorder', function (e) {
            _this._mouseUp(e);
        });
    };
    ColReorder.prototype._mouseMove = function (e) {
        if (this.dom.drag === null) {
            // Only create the drag element if the mouse has moved a specific distance from the start
            // point - this allows the user to make small mouse movements when sorting and not have a
            // possibly confusing drag element showing up
            if (Math.pow(Math.pow(this._cursorPosition(e, 'pageX') - this.s.mouse.start.x, 2) +
                Math.pow(this._cursorPosition(e, 'pageY') - this.s.mouse.start.y, 2), 0.5) < 5) {
                return;
            }
            $(document.body).addClass('dtcr-dragging');
            this._createDragNode();
        }
        // Position the element - we respect where in the element the click occurred
        this.dom.drag.css({
            left: this._cursorPosition(e, 'pageX') - this.s.mouse.offset.x,
            top: this._cursorPosition(e, 'pageY') - this.s.mouse.offset.y
        });
        // Find cursor's left position relative to the table
        var tableOffset = $(this.dt.table().node()).offset().left;
        var cursorMouseLeft = this._cursorPosition(e, 'pageX') - tableOffset;
        var dropZone = this.s.dropZones.find(function (zone) {
            if (zone.left <= cursorMouseLeft && cursorMouseLeft <= zone.left + zone.width) {
                return true;
            }
            return false;
        });
        this.s.mouse.absLeft = this._cursorPosition(e, 'pageX');
        if (!dropZone) {
            return;
        }
        if (!dropZone.self) {
            this._move(dropZone, cursorMouseLeft);
        }
    };
    ColReorder.prototype._mouseUp = function (e) {
        $(document).off('.colReorder');
        $(document.body).removeClass('dtcr-dragging');
        if (this.dom.drag) {
            this.dom.drag.remove();
            this.dom.drag = null;
        }
        if (this.s.scrollInterval) {
            clearInterval(this.s.scrollInterval);
        }
        this.dt.cells('.dtcr-moving').nodes().to$().removeClass('dtcr-moving dtcr-moving-first dtcr-moving-last');
    };
    /**
     * Shift columns around
     *
     * @param dropZone Where to move to
     * @param cursorMouseLeft Cursor position, relative to the left of the table
     */
    ColReorder.prototype._move = function (dropZone, cursorMouseLeft) {
        var that = this;
        this.dt.colReorder.move(this.s.mouse.targets, dropZone.colIdx);
        // Update the targets
        this.s.mouse.targets = $(this.s.mouse.target)
            .attr('data-dt-column')
            .split(',')
            .map(function (val) {
            return parseInt(val, 10);
        });
        this._regions(this.s.mouse.targets);
        // If the column being moved is smaller than the column it is replacing,
        // the drop zones might need a correction to allow for this since, otherwise
        // we might immediately be changing the column order as soon as it was placed.
        // Find the drop zone for the first in the list of targets - is its
        // left greater than the mouse position. If so, it needs correcting
        var dz = this.s.dropZones.find(function (zone) {
            return zone.colIdx === that.s.mouse.targets[0];
        });
        var dzIdx = this.s.dropZones.indexOf(dz);
        if (dz.left > cursorMouseLeft) {
            var previousDiff = dz.left - cursorMouseLeft;
            var previousDz = this.s.dropZones[dzIdx - 1];
            dz.left -= previousDiff;
            dz.width += previousDiff;
            if (previousDz) {
                previousDz.width -= previousDiff;
            }
        }
        // And for the last in the list
        dz = this.s.dropZones.find(function (zone) {
            return zone.colIdx === that.s.mouse.targets[that.s.mouse.targets.length - 1];
        });
        if (dz.left + dz.width < cursorMouseLeft) {
            var nextDiff = cursorMouseLeft - (dz.left + dz.width);
            var nextDz = this.s.dropZones[dzIdx + 1];
            dz.width += nextDiff;
            if (nextDz) {
                nextDz.left += nextDiff;
                nextDz.width -= nextDiff;
            }
        }
    };
    /**
     * Determine the boundaries for where drops can happen and where they would
     * insert into.
     */
    ColReorder.prototype._regions = function (moveColumns) {
        var that = this;
        var dropZones = [];
        var totalWidth = 0;
        var negativeCorrect = 0;
        var allowedColumns = this.dt.columns(this.c.columns).indexes().toArray();
        var widths = this.dt.columns().widths();
        // Each column is a drop zone
        this.dt.columns().every(function (colIdx, tabIdx, i) {
            if (!this.visible()) {
                return;
            }
            var columnWidth = widths[colIdx];
            // Check that we are allowed to move into this column - if not, need
            // to offset the widths
            if (!allowedColumns.includes(colIdx)) {
                totalWidth += columnWidth;
                return;
            }
            var valid = validateMove(that.dt, moveColumns, colIdx);
            if (valid) {
                // New drop zone. Note that it might have it's offset moved
                // by the final condition in this logic set
                dropZones.push({
                    colIdx: colIdx,
                    left: totalWidth - negativeCorrect,
                    self: moveColumns[0] <= colIdx && colIdx <= moveColumns[moveColumns.length - 1],
                    width: columnWidth + negativeCorrect
                });
            }
            else if (colIdx < moveColumns[0]) {
                // Not valid and before the column(s) to be moved - the drop
                // zone for the previous valid drop point is extended
                if (dropZones.length) {
                    dropZones[dropZones.length - 1].width += columnWidth;
                }
            }
            else if (colIdx > moveColumns[moveColumns.length - 1]) {
                // Not valid and after the column(s) to be moved - the next
                // drop zone to be created will be extended
                negativeCorrect += columnWidth;
            }
            totalWidth += columnWidth;
        });
        this.s.dropZones = dropZones;
        // this._drawDropZones();
    };
    /**
     * Check if the table is scrolling or not. It is it the `table` isn't the same for
     * the header and body parents.
     *
     * @returns
     */
    ColReorder.prototype._isScrolling = function () {
        return this.dt.table().body().parentNode !== this.dt.table().header().parentNode;
    };
    /**
     * Set an interval clock that will check to see if the scrolling of the table body should be moved
     * as the mouse moves on the scroll (allowing a drag and drop to columns which aren't yet visible)
     */
    ColReorder.prototype._scrollRegions = function () {
        if (!this._isScrolling()) {
            // Not scrolling - nothing to do
            return;
        }
        var that = this;
        var tableLeft = $(this.dt.table().container()).position().left;
        var tableWidth = $(this.dt.table().container()).outerWidth();
        var mouseBuffer = 75;
        var scrollContainer = this.dt.table().body().parentElement.parentElement;
        this.s.scrollInterval = setInterval(function () {
            var mouseLeft = that.s.mouse.absLeft;
            if (mouseLeft < tableLeft + mouseBuffer && scrollContainer.scrollLeft) {
                scrollContainer.scrollLeft -= 5;
            }
            else if (mouseLeft > tableLeft + tableWidth - mouseBuffer &&
                scrollContainer.scrollLeft < scrollContainer.scrollWidth) {
                scrollContainer.scrollLeft += 5;
            }
        }, 25);
    };
    // This is handy for debugging where the drop zones actually are!
    // private _drawDropZones () {
    // 	let dropZones = this.s.dropZones;
    // 	$('div.allan').remove();
    // 	for (let i=0 ; i<dropZones.length ; i++) {
    // 		let zone = dropZones[i];
    // 		$(this.dt.table().container()).append(
    // 			$('<div>')
    // 				.addClass('allan')
    // 				.css({
    // 					position: 'absolute',
    // 					top: 0,
    // 					width: zone.width - 4,
    // 					height: 20,
    // 					left: zone.left + 2,
    // 					border: '1px solid red',
    // 				})
    // 		);
    // 	}
    // }
    ColReorder.defaults = {
        columns: '',
        enable: true,
        order: null
    };
    ColReorder.version = '2.0.0-dev';
    return ColReorder;
}());

/*! ColReorder 2.0.0-dev
 * © SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     ColReorder
 * @description Provide the ability to reorder columns in a DataTable
 * @version     2.0.0-dev
 * @author      SpryMedia Ltd
 * @contact     datatables.net
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
 // declare var DataTable: any;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * UI interaction class
 */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API integration
 */
/** Enable mouse column reordering */
DataTable.Api.register('colReorder.enable()', function (flag) {
    return this.iterator('table', function (ctx) {
        if (ctx._colReorder) {
            ctx._colReorder.enable(flag);
        }
    });
});
/** Disable mouse column reordering */
DataTable.Api.register('colReorder.disable()', function () {
    return this.iterator('table', function (ctx) {
        if (ctx._colReorder) {
            ctx._colReorder.disable();
        }
    });
});
/**
 * Change the ordering of the columns in the DataTable.
 */
DataTable.Api.register('colReorder.move()', function (from, to) {
    init(this);
    if (!Array.isArray(from)) {
        from = [from];
    }
    if (!validateMove(this, from, to)) {
        this.error('ColReorder - invalid move');
        return this;
    }
    return this.tables().every(function () {
        move(this, from, to);
        finalise(this);
    });
});
DataTable.Api.register('colReorder.order()', function (set, original) {
    init(this);
    if (!set) {
        return this.context.length ? getOrder(this) : null;
    }
    return this.tables().every(function () {
        setOrder(this, set, original);
    });
});
DataTable.Api.register('colReorder.reset()', function () {
    init(this);
    return this.tables().every(function () {
        var order = this.columns()
            .every(function (i) {
            return i;
        })
            .flatten()
            .toArray();
        setOrder(this, order, true);
    });
});
DataTable.Api.register('colReorder.transpose()', function (idx, dir) {
    init(this);
    if (!dir) {
        dir = 'toCurrent';
    }
    return transpose(this, idx, dir);
});
DataTable.ColReorder = ColReorder;
// Called when DataTables is going to load a state. That might be
// before the table is ready (state saving) or after (state restoring).
// Also note that it happens _before_ preInit (below).
$(document).on('stateLoadInit.dt', function (e, settings, state) {
    if (e.namespace !== 'dt') {
        return;
    }
    var dt = new DataTable.Api(settings);
    if (state.colReorder) {
        if (dt.ready()) {
            // Table is fully loaded - do the column reordering here
            // so that the stored indexes are in the correct place
            // e.g. column visibility
            setOrder(dt, state.colReorder, true);
        }
        else {
            // If the table is not ready, column reordering is done
            // after it becomes fully ready. That means that saved
            // column indexes need to be updated for where those columns
            // currently are.
            var map = invertKeyValues(state.colReorder);
            // State's ordering indexes
            orderingIndexes(map, state.order);
            // State's columns array - sort by restore index
            for (var i = 0; i < state.columns.length; i++) {
                state.columns[i]._cr_sort = state.colReorder[i];
            }
            state.columns.sort(function (a, b) {
                return a._cr_sort - b._cr_sort;
            });
        }
    }
});
$(document).on('preInit.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var init = settings.oInit.colReorder;
    var defaults = DataTable.defaults.colReorder;
    if (init || defaults) {
        var opts = $.extend({}, defaults, init);
        if (init !== false) {
            var dt = new DataTable.Api(settings);
            new ColReorder(dt, opts);
        }
    }
});


return DataTable;
}));


return DataTable;
}));
