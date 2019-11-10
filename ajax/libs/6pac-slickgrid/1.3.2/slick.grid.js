/*jslint white: false, onevar: false, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */// Force JSLinq (http://jslint.com/) "Good Parts" flags - (strict whitespace, one var per function, disallow ++/--)
/*global $: false, jQuery: false, window: false, console: false, document: false, alert: false, setTimeout: false, clearTimeout: false, Slick: false */// Define recognized globals for JSLint
/*global commitCurrentEdit: true, cancelCurrentEdit: false, measureCellPaddingAndBorder: false, createColumnHeaders: false, setupRowReordering: false, createCssRules: false, resizeCanvas: false, autosizeColumns: false, render: false, handleScroll: false, handleKeyDown: false, handleClick: false, handleDblClick: false, handleContextMenu: false, handleHeaderContextMenu: false, setupColumnSort: false, setupColumnResize: false, setupColumnReorder: false, removeAllRows: false, removeCssRules: false, setupColumnResize: false, removeAllRows: false, updateColumnWidth: false, setSelectedRows: false, getSelectedRows: false, makeSelectedCellNormal: false, removeRow: false, removeRowFromCache: false, invalidatePostProcessingResults: false, asyncPostProcessRows: false, gotoDir: false, makeSelectedCellEditable: false, setSelectedCellAndRow: false, gotoCell: false, scrollSelectedCellIntoView: false, isCellPotentiallyEditable: false, styleColumnWidth: false */
"use strict";


/**
 * @license
 * (c) 2009-2010 Michael Leibman (michael.leibman@gmail.com)
 * All rights reserved.
 *
 * SlickGrid v1.3.2
 *
 * TODO:
 * - frozen columns
 * - consistent events (EventHelper?  jQuery events?)
 *
 *
 * OPTIONS:
 *     rowHeight                - (default 25px) Row height in pixels.
 *     enableAddRow             - (default false) If true, a blank row will be displayed at the bottom - typing values in that row will add a new one.
 *     leaveSpaceForNewRows     - (default false)
 *     editable                 - (default false) If false, no cells will be switched into edit mode.
 *     autoEdit                 - (default true) Cell will not automatically go into edit mode when selected.
 *     enableCellNavigation     - (default true) If false, no cells will be selectable.
 *     defaultColumnWidth       - (default 80px) Default column width in pixels (if columns[cell].width is not specified).
 *     enableColumnReorder      - (default true) Allows the user to reorder columns.
 *     asyncEditorLoading       - (default false) Makes cell editors load asynchronously after a small delay.
 *                                This greatly increases keyboard navigation speed.
 *     asyncEditorLoadDelay     - (default 100msec) Delay after which cell editor is loaded. Ignored unless asyncEditorLoading is true.
 *     forceFitColumns          - (default false) Force column sizes to fit into the viewport (avoid horizontal scrolling).
 *     enableAsyncPostRender    - (default false) If true, async post rendering will occur and asyncPostRender delegates on columns will be called.
 *     asyncPostRenderDelay     - (default 60msec) Delay after which async post renderer delegate is called.
 *     autoHeight               - (default false) If true, vertically resizes to fit all rows.
 *     editorLock               - (default Slick.GlobalEditorLock) A Slick.EditorLock instance to use for controlling concurrent data edits.
 *     showSecondaryHeaderRow   - (default false) If true, an extra blank (to be populated externally) row will be displayed just below the header columns.
 *     secondaryHeaderRowHeight - (default 25px) The height of the secondary header row.
 *     syncColumnCellResize     - (default false) Synchronously resize column cells when column headers are resized
 *     rowCssClasses            - (default null) A function which (given a row's data item as an argument) returns a space-delimited string of CSS classes that will be applied to the slick-row element. Note that this should be fast, as it is called every time a row is displayed.
 *
 *
 * COLUMN DEFINITION (columns) OPTIONS:
 *     id                  - Column ID.
 *     name                - Column name to put in the header.
 *     toolTip             - Tooltip (if different from name).
 *     field               - Property of the data context to bind to.
 *     formatter           - (default 'return value || ""') Function responsible for rendering the contents of a cell. Signature: function formatter(row, cell, value, columnDef, dataContext) { ... return "..."; }
 *     editor              - An Editor class.
 *     validator           - An extra validation function to be passed to the editor.
 *     unselectable        - If true, the cell cannot be selected (and therefore edited).
 *     cannotTriggerInsert - If true, a new row cannot be created from just the value of this cell.
 *     setValueHandler     - If true, this handler will be called to set field value instead of context[field].
 *     width               - Width of the column in pixels.
 *     resizable           - (default true) If false, the column cannot be resized.
 *     sortable            - (default false) If true, the column can be sorted (onSort will be called).
 *     minWidth            - Minimum allowed column width for resizing.
 *     maxWidth            - Maximum allowed column width for resizing.
 *     cssClass            - A CSS class to add to the cell.
 *     rerenderOnResize    - Rerender the column when it is resized (useful for columns relying on cell width or adaptive formatters).
 *     asyncPostRender     - Function responsible for manipulating the cell DOM node after it has been rendered (called in the background).
 *     behavior            - Configures the column with one of several available predefined behaviors:  "select", "move", "selectAndMove".
 *
 *
 * EVENTS:
 *     onSort                -
 *     onHeaderContextMenu   -
 *     onClick               -
 *     onDblClick            -
 *     onContextMenu         -
 *     onKeyDown             -
 *     onAddNewRow           -
 *     onValidationError     -
 *     onViewportChanged     -
 *     onSelectedRowsChanged -
 *     onColumnsReordered    -
 *     onColumnsResized      -
 *     onBeforeMoveRows      -
 *     onMoveRows            -
 *     onCellChange          -  Raised when cell has been edited.   Args: row,cell,dataContext.
 *     onBeforeEditCell      -  Raised before a cell goes into edit mode.  Return false to cancel.  Args: row,cell,dataContext.
 *     onBeforeCellEditorDestroy    - Raised before a cell editor is destroyed.  Args: current cell editor.
 *     onBeforeDestroy       -  Raised just before the grid control is destroyed (part of the destroy() method).
 *
 *
 * NOTES:
 *     Cell/row DOM manipulations are done directly bypassing jQuery's DOM manipulation methods.
 *     This increases the speed dramatically, but can only be done safely because there are no event handlers
 *     or data associated with any cell/row DOM nodes.  Cell editors must make sure they implement .destroy()
 *     and do proper cleanup.
 *
 *
 * @param {jQuery}            $container  Container object to create the grid in.
 * @param {Array} or {Object} data        An array of objects for databinding.
 * @param {Array}             columns     An array of column definitions.
 * @param {Object}            options     Grid options.
 */

// make sure required JavaScript modules are loaded
if (typeof jQuery === "undefined") {
    throw new Error("SlickGrid requires jquery module to be loaded");
}
if (!jQuery.rule) {
    throw new Error("SlickGrid requires jquery.rule module to be loaded");
}
if (!jQuery.fn.drag) {
    throw new Error("SlickGrid requires jquery.event.drag module to be loaded");
}

(function($) {
    var scrollbarDimensions; // shared across all grids on this page


    //////////////////////////////////////////////////////////////////////////////////////////////
    // EditorLock class implementation (available as Slick.EditorLock)

    /** @constructor */
    function EditorLock() {
        /// <summary>
        /// Track currently active edit controller and ensure
        /// that onle a single controller can be active at a time.
        /// Edit controller is an object that is responsible for
        /// gory details of looking after editor in the browser,
        /// and allowing EditorLock clients to either accept
        /// or cancel editor changes without knowing any of the
        /// implementation details. SlickGrid instance is used
        /// as edit controller for cell editors.
        /// </summary>

        var currentEditController = null;

        this.isActive = function isActive(editController) {
            /// <summary>
            /// Return true if the specified editController
            /// is currently active in this lock instance
            /// (i.e. if that controller acquired edit lock).
            /// If invoked without parameters ("editorLock.isActive()"),
            /// return true if any editController is currently
            /// active in this lock instance.
            /// </summary>
            return (editController ? currentEditController === editController : currentEditController !== null);
        };

        this.activate = function activate(editController) {
            /// <summary>
            /// Set the specified editController as the active
            /// controller in this lock instance (acquire edit lock).
            /// If another editController is already active,
            /// an error will be thrown (i.e. before calling
            /// this method isActive() must be false,
            /// afterwards isActive() will be true).
            /// </summary>
            if (editController === currentEditController) { // already activated?
                return;
            }
            if (currentEditController !== null) {
                throw "SlickGrid.EditorLock.activate: an editController is still active, can't activate another editController";
            }
            if (!editController.commitCurrentEdit) {
                throw "SlickGrid.EditorLock.activate: editController must implement .commitCurrentEdit()";
            }
            if (!editController.cancelCurrentEdit) {
                throw "SlickGrid.EditorLock.activate: editController must implement .cancelCurrentEdit()";
            }
            currentEditController = editController;
        };

        this.deactivate = function deactivate(editController) {
            /// <summary>
            /// Unset the specified editController as the active
            /// controller in this lock instance (release edit lock).
            /// If the specified editController is not the editController
            /// that is currently active in this lock instance,
            /// an error will be thrown.
            /// </summary>
            if (currentEditController !== editController) {
                throw "SlickGrid.EditorLock.deactivate: specified editController is not the currently active one";
            }
            currentEditController = null;
        };

        this.commitCurrentEdit = function commitCurrentEdit() {
            /// <summary>
            /// Invoke the "commitCurrentEdit" method on the
            /// editController that is active in this lock
            /// instance and return the return value of that method
            /// (if no controller is active, return true).
            /// "commitCurrentEdit" is expected to return true
            /// to indicate successful commit, false otherwise.
            /// </summary>
            return (currentEditController ? currentEditController.commitCurrentEdit() : true);
        };

        this.cancelCurrentEdit = function cancelCurrentEdit() {
            /// <summary>
            /// Invoke the "cancelCurrentEdit" method on the
            /// editController that is active in this lock
            /// instance (if no controller is active, do nothing).
            /// Returns true if the edit was succesfully cancelled.
            /// </summary>
            return (currentEditController ? currentEditController.cancelCurrentEdit() : true);
        };
    } // end of EditorLock function (class)



    //////////////////////////////////////////////////////////////////////////////////////////////
    // SlickGrid class implementation (available as Slick.Grid)

    /** @constructor */
    function SlickGrid($container,data,columns,options) {
        /// <summary>
        /// Create and manage virtual grid in the specified $container,
        /// connecting it to the specified data source. Data is presented
        /// as a grid with the specified columns and data.length rows.
        /// Options alter behaviour of the grid.
        /// </summary>

        // settings
        var defaults = {
            rowHeight: 25,
            defaultColumnWidth: 80,
            enableAddRow: false,
            leaveSpaceForNewRows: false,
            editable: false,
            autoEdit: true,
            enableCellNavigation: true,
            enableColumnReorder: true,
            asyncEditorLoading: false,
            asyncEditorLoadDelay: 100,
            forceFitColumns: false,
            enableAsyncPostRender: false,
            asyncPostRenderDelay: 60,
            autoHeight: false,
            editorLock: Slick.GlobalEditorLock,
            showSecondaryHeaderRow: false,
            secondaryHeaderRowHeight: 25,
            syncColumnCellResize: false,
            enableAutoTooltips: true
        },
        gridData, gridDataGetLength, gridDataGetItem;

        var columnDefaults = {
            resizable: true,
            sortable: false,
            minWidth: 30,
            formatter: function defaultFormatter(row, cell, value, columnDef, dataContext) {
                return (value === null || value === undefined) ? "" : value;
            }
        };

        // consts
        var CAPACITY = 50;
        var MIN_BUFFER = 5;
        var BUFFER = MIN_BUFFER;  // will be set to equal one page

        // private
        var uid = "slickgrid_" + Math.round(1000000 * Math.random());
        var self = this;
        var $headerScroller;
        var $headers;
        var $secondaryHeaderScroller;
        var $secondaryHeaders;
        var $viewport;
        var $canvas;
        var viewportH, viewportW;
        var headerColumnWidthDiff, headerColumnHeightDiff, cellWidthDiff, cellHeightDiff;  // padding+border
        var absoluteColumnMinWidth;

        var currentRow, currentCell;
        var currentCellNode = null;
        var currentEditor = null;
        var editController;

        var rowsCache = {};
        var renderedRows = 0;
        var numVisibleRows;
        var lastRenderedScrollTop = 0;
        var currentScrollTop = 0;
        var currentScrollLeft = 0;
        var scrollDir = 1;
        var avgRowRenderTime = 10;

        var selectedRows = [];
        var selectedRowsLookup = {};
        var columnsById = {};

        // async call handles
        var h_editorLoader = null;
        var h_render = null;
        var h_postrender = null;
        var postProcessedRows = {};
        var postProcessToRow = null;
        var postProcessFromRow = null;

        // perf counters
        var counter_rows_rendered = 0;
        var counter_rows_removed = 0;


        //////////////////////////////////////////////////////////////////////////////////////////////
        // Initialization

        function measureScrollbar() {
            /// <summary>
            /// Measure width of a vertical scrollbar
            /// and height of a horizontal scrollbar.
            /// </summary
            /// <returns>
            /// { width: pixelWidth, height: pixelHeight }
            /// </returns>
            var $c = $("<div style='position:absolute; top:-10000px; left:-10000px; width:100px; height:100px; overflow:scroll;'></div>").appendTo("body");
            var dim = { width: $c.width() - $c[0].clientWidth, height: $c.height() - $c[0].clientHeight };
            $c.remove();
            return dim;
        }

        function disableSelection($target) {
            /// <summary>
            /// Disable text selection (using mouse) in
            /// the specified target.
            /// </summary
            if ($target && $target.jquery) {
                if ($target.disableSelection) { // if jquery:ui.core has been loaded, use it
                    $target.disableSelection();
                }
                else { // otherwise, use "stolen" implementation :)
                    $target.attr('unselectable', 'on').css('MozUserSelect', 'none').bind('selectstart.ui', function() { return false; }); // from jquery:ui.core.js 1.7.2
                }
            }
        }



        function defaultGetLength() {
            /// <summary>
            /// Default implementation of getLength method
            /// returns the length of the array.
            /// </summary
            return gridData.length;
        }

        function defaultGetItem(i) {
            /// <summary>
            /// Default implementation of getItem method
            /// returns the item at specified position in
            /// the array.
            /// </summary
            return gridData[i];
        }

        function init() {
            /// <summary>
            /// Initialize 'this' (self) instance of a SlickGrid.
            /// This function is called by the constructor.
            /// </summary>

            gridData = data;
            gridDataGetLength = gridData.getLength || defaultGetLength;
            gridDataGetItem = gridData.getItem || defaultGetItem;

            scrollbarDimensions = scrollbarDimensions || measureScrollbar(); // skip measurement if already have dimensions
            options = $.extend({},defaults,options);
            columnDefaults.width = options.defaultColumnWidth;

            // validate loaded JavaScript modules against requested options
            if (options.enableColumnReorder && !$.fn.sortable) {
                throw new Error("SlickGrid's \"enableColumnReorder = true\" option requires jquery-ui.sortable module to be loaded");
            }

            editController = {
                "commitCurrentEdit": commitCurrentEdit,
                "cancelCurrentEdit": cancelCurrentEdit
            };

            $container
                .empty()
                .attr("tabIndex",0)
                .attr("hideFocus",true)
                .css("overflow","hidden")
                .css("outline",0)
                .addClass(uid)
                .addClass("ui-widget");

            switch ($container.css("position")) {
                case "absolute": // if the container is already positioning origin, keep it as it is
                case "relative":
                case "fixed":
                    break;
                default: // container is not a positioning origin, convert it to one
                    $container.css("position","relative");
                    break;
            }

            $headerScroller = $("<div class='slick-header ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
            $headers = $("<div class='slick-header-columns' style='width:100000px; left:-10000px' />").appendTo($headerScroller);

            $secondaryHeaderScroller = $("<div class='slick-header-secondary ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
            $secondaryHeaders = $("<div class='slick-header-columns-secondary' style='width:100000px' />").appendTo($secondaryHeaderScroller);

            if (!options.showSecondaryHeaderRow) {
                $secondaryHeaderScroller.hide();
            }

            // with autoHeight, we can set the mainscroller's y-overflow to auto, since the scroll bar will not appear
            var msStyle = "width:100%;overflow-x:auto;outline:0;position:relative;overflow-y:auto;"
            $viewport = $("<div class='slick-viewport' tabIndex='0' hideFocus style='" + msStyle + "'>").appendTo($container);
            $canvas = $("<div class='grid-canvas' tabIndex='0' hideFocus style='overflow:hidden' />").appendTo($viewport);

            // header columns and cells may have different padding/border skewing width calculations (box-sizing, hello?)
            // calculate the diff so we can set consistent sizes
            measureCellPaddingAndBorder();

            $viewport.height(
                $container.innerHeight() -
                $headerScroller.outerHeight() -
                (options.showSecondaryHeaderRow ? $secondaryHeaderScroller.outerHeight() : 0));

            // for usability reasons, all text selection in SlickGrid is disabled
            // with the exception of input and textarea elements (selection must
            // be enabled there so that editors work as expected); note that
            // selection in grid cells (grid body) is already unavailable in
            // all browsers except IE
            disableSelection($headers); // disable all text selection in header (including input and textarea)
            $viewport.bind("selectstart.ui", function (event) { return $(event.target).is("input,textarea"); }); // disable text selection in grid cells except in input and textarea elements (this is IE-specific, because selectstart event will only fire in IE)

            createColumnHeaders();
            setupRowReordering();
            createCssRules();

            resizeAndRender();

            $viewport.bind("scroll", handleScroll);
            $container.bind("resize", resizeAndRender);
            $canvas.bind("keydown", handleKeyDown);
            $canvas.bind("click", handleClick);
            $canvas.bind("dblclick", handleDblClick);
            $canvas.bind("contextmenu", handleContextMenu);
            $canvas.bind("mouseover", handleHover);
            $headerScroller.bind("contextmenu", handleHeaderContextMenu);
        }

        function createColumnHeaders() {
            var i;

            function hoverBegin() {
                $(this).addClass('ui-state-hover');
            }
            function hoverEnd() {
                $(this).removeClass('ui-state-hover');
            }

            for (i = 0; i < columns.length; i++) {
                var m = columns[i] = $.extend({},columnDefaults,columns[i]);
                columnsById[m.id] = i;

                var header = $("<div class='ui-state-default slick-header-column' cell=" + i + " id='" + m.id + "' />")
                    .html("<span class='slick-column-name'>" + m.name + "</span>")
                    .width(m.width - headerColumnWidthDiff)
                    .attr('title', m.toolTip || m.name)
                    .appendTo($headers);

                if (m.hidden) {
                    header.css("display","none");
                }

                if (options.enableColumnReorder || m.sortable) {
                    header.hover(hoverBegin, hoverEnd);
                }

                if (m.sortable) {
                    header.append("<span class='slick-sort-indicator' />");
                }
            }

            setupColumnSort();
            setupColumnResize();
            if (options.enableColumnReorder) {
                setupColumnReorder();
            }
        }

        // Set .slick-header-column cell to indicate sort state
        //      $col - jQuery selector for header DOM object, or null to clear all sort styles
        //      ascending  - true for ascending style, else false.
        function setSortHeaderStyle($col, ascending) {
            $headers.children().removeClass("slick-header-column-sorted");
            $headers.find(".slick-sort-indicator").removeClass("slick-sort-indicator-asc slick-sort-indicator-desc");
            if ($col) {
                $col.addClass("slick-header-column-sorted");
                $col.find(".slick-sort-indicator").addClass(ascending ? "slick-sort-indicator-asc" : "slick-sort-indicator-desc");
            }
        }

        function setupColumnSort() {
            $headers.click(function(e) {
                if ($(e.target).hasClass("slick-resizable-handle")) {
                    return;
                }
                var $col = $(e.target).closest(".slick-header-column");

                if (!$col.length || !columns[columnsById[$col.attr("id")]].sortable) {
                    return;
                }
                if (!options.editorLock.commitCurrentEdit()) { return; }

                if ($col.is(".slick-header-column-sorted")) {
                    $col.find(".slick-sort-indicator").toggleClass("slick-sort-indicator-asc").toggleClass("slick-sort-indicator-desc");
                } else {
                    setSortHeaderStyle($col, true);
                }

                if (self.onSort) {
                    self.onSort(columns[columnsById[$col.attr("id")]], $col.find(".slick-sort-indicator").hasClass("slick-sort-indicator-asc"));
                }
            });
        }

        // Rebuild and re-render columns in newly established order.
        function rebuildColumns() {
            var newOrder = $headers.sortable("toArray"), lookup = {};
            for (i=0; i<columns.length; i++) {
                lookup[columns[i].id] = columns[i];
            }

            for (i=0; i<newOrder.length; i++) {
                $headers.children()[i].setAttribute('cell', i);
                columnsById[newOrder[i]] = i;
                columns[i] = lookup[newOrder[i]];
            }
            removeAllRows();
            removeCssRules();
            createCssRules();
            render();
        }

        function setupColumnReorder() {
            $headers.sortable({
                containment: 'parent',
                axis: "x",
                cursor: "default",
                tolerance: "intersection",
                helper: "clone",
                placeholder: "slick-sortable-placeholder ui-state-default slick-header-column",
                forcePlaceholderSize: true,
                start: function(e, ui) { $(ui.helper).addClass("slick-header-column-active"); },
                beforeStop: function(e, ui) { $(ui.helper).removeClass("slick-header-column-active"); },
                stop: function(e) {
                    var i;

                    if (!options.editorLock.commitCurrentEdit()) {
                        $(this).sortable("cancel");
                        return;
                    }

                    rebuildColumns();

                    if (self.onColumnsReordered) {
                        self.onColumnsReordered();
                    }
                    e.stopPropagation();
                    setupColumnResize();
                }
            });
        }

        function setupColumnResize() {
            var $col, j, c, pageX, columnElements, minPageX, maxPageX, firstResizable, lastResizable, originalCanvasWidth;
            columnElements = $headers.find(".slick-header-column:visible");
            columnElements.find('.slick-resizable-handle').remove();
            columnElements.each(function(i,e) {
                c = columns[e.getAttribute('cell')];
                if (c.resizable) {
                    if (firstResizable === undefined) { firstResizable = i; }
                    lastResizable = i;
                }
            });
            columnElements.each(function(i,e) {
                if ((firstResizable !== undefined && i < firstResizable) || (options.forceFitColumns && i >= lastResizable)) { return; }
                $col = $(e);
                $("<div class='slick-resizable-handle' />")
                    .appendTo(e)
                    .bind("dragstart", function(e) {
                        if (!options.editorLock.commitCurrentEdit()) { return false; }
                        pageX = e.pageX;
                        $col.addClass("slick-header-column-active");
                        var shrinkLeewayOnRight = null, stretchLeewayOnRight = null;
                        // lock each column's width option to current width
                        columnElements.each(function(i,e) {
                            columns[e.getAttribute('cell')].previousWidth = $(e).outerWidth();
                        });
                        if (options.forceFitColumns) {
                            shrinkLeewayOnRight = 0;
                            stretchLeewayOnRight = 0;
                            // colums on right affect maxPageX/minPageX
                            for (j = i + 1; j < columnElements.length; j++) {
                                c = columns[columnElements[j].getAttribute('cell')];
                                if (c.resizable) {
                                    if (stretchLeewayOnRight !== null) {
                                        if (c.maxWidth) {
                                            stretchLeewayOnRight += c.maxWidth - c.previousWidth;
                                        }
                                        else {
                                            stretchLeewayOnRight = null;
                                        }
                                    }
                                    shrinkLeewayOnRight += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                                }
                            }
                        }
                        var shrinkLeewayOnLeft = 0, stretchLeewayOnLeft = 0;
                        for (j = 0; j <= i; j++) {
                            // columns on left only affect minPageX
                            c = columns[columnElements[j].getAttribute('cell')];
                            if (c.resizable) {
                                if (stretchLeewayOnLeft !== null) {
                                    if (c.maxWidth) {
                                        stretchLeewayOnLeft += c.maxWidth - c.previousWidth;
                                    }
                                    else {
                                        stretchLeewayOnLeft = null;
                                    }
                                }
                                shrinkLeewayOnLeft += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                            }
                        }
                        if (shrinkLeewayOnRight === null) { shrinkLeewayOnRight = 100000; }
                        if (shrinkLeewayOnLeft === null) { shrinkLeewayOnLeft = 100000; }
                        if (stretchLeewayOnRight === null) { stretchLeewayOnRight = 100000; }
                        if (stretchLeewayOnLeft === null) { stretchLeewayOnLeft = 100000; }
                        maxPageX = pageX + Math.min(shrinkLeewayOnRight, stretchLeewayOnLeft);
                        minPageX = pageX - Math.min(shrinkLeewayOnLeft, stretchLeewayOnRight);
                        originalCanvasWidth = $canvas.width();
                    })
                    .bind("drag", function(e) {
                        var actualMinWidth, d = Math.min(maxPageX, Math.max(minPageX, e.pageX)) - pageX, x, ci;
                        if (d < 0) { // shrink column
                            x = d;
                            for (j = i; j >= 0; j--) {
                                ci = columnElements[j].getAttribute('cell');
                                c = columns[ci];
                                if (c.resizable) {
                                    actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                                    if (x && c.previousWidth + x < actualMinWidth) {
                                        x += c.previousWidth - actualMinWidth;
                                        styleColumnWidth(ci, actualMinWidth, options.syncColumnCellResize);
                                    } else {
                                        styleColumnWidth(ci, c.previousWidth + x, options.syncColumnCellResize);
                                        x = 0;
                                    }
                                }
                            }

                            if (options.forceFitColumns) {
                                x = -d;
                                for (j = i + 1; j < columnElements.length; j++) {
                                    ci = columnElements[j].getAttribute('cell');
                                    c = columns[ci];
                                    if (c.resizable) {
                                        if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                            x -= c.maxWidth - c.previousWidth;
                                            styleColumnWidth(ci, c.maxWidth, options.syncColumnCellResize);
                                        } else {
                                            styleColumnWidth(ci, c.previousWidth + x, options.syncColumnCellResize);
                                            x = 0;
                                        }
                                    }
                                }
                            } else if (options.syncColumnCellResize) {
                                $canvas.width(originalCanvasWidth + d);
                            }
                        } else { // stretch column
                            x = d;
                            for (j = i; j >= 0; j--) {
                                ci = columnElements[j].getAttribute('cell');
                                c = columns[ci];
                                if (c.resizable) {
                                    if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                        x -= c.maxWidth - c.previousWidth;
                                        styleColumnWidth(ci, c.maxWidth, options.syncColumnCellResize);
                                    } else {
                                        styleColumnWidth(ci, c.previousWidth + x, options.syncColumnCellResize);
                                        x = 0;
                                    }
                                }
                            }

                            if (options.forceFitColumns) {
                                x = -d;
                                for (j = i + 1; j < columnElements.length; j++) {
                                    ci = columnElements[j].getAttribute('cell');
                                    c = columns[ci];
                                    if (c.resizable) {
                                        actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                                        if (x && c.previousWidth + x < actualMinWidth) {
                                            x += c.previousWidth - actualMinWidth;
                                            styleColumnWidth(ci, actualMinWidth, options.syncColumnCellResize);
                                        } else {
                                            styleColumnWidth(ci, c.previousWidth + x, options.syncColumnCellResize);
                                            x = 0;
                                        }
                                    }
                                }
                            } else if (options.syncColumnCellResize) {
                                $canvas.width(originalCanvasWidth + d);
                            }
                        }
                    })
                    .bind("dragend", function(e) {
                        var newWidth;
                        $col.removeClass("slick-header-column-active");
                        for (j = 0; j < columnElements.length; j++) {
                            var columnIndex = columnElements[j].getAttribute('cell');
                            c = columns[columnIndex];
                            newWidth = $(columnElements[j]).outerWidth();
                            if (c.previousWidth !== newWidth && c.rerenderOnResize) {
                                removeAllRows();
                            }
                            if (options.forceFitColumns) {
                                c.width = Math.floor(c.width * (newWidth - c.previousWidth) / c.previousWidth) + c.width;
                            } else {
                                c.width = newWidth;
                            }
                            if (!options.syncColumnCellResize) {
                                styleColumnWidth(columnIndex, newWidth, true);
                            }
                        }
                        resizeCanvas();
                        if (self.onColumnsResized) {
                            self.onColumnsResized();
                        }
                    });
                });
        }

        function setupRowReordering() {
            $canvas
                .bind("beforedragstart", function(e) {
                    var $cell = $(e.target).closest(".slick-cell");
                    if ($cell.length === 0) { return false; }
                    if (parseInt($cell.parent().attr("row"), 10) >= gridDataGetLength()) { return false; }
                    var colDef = columns[$cell.attr("cell")];
                    if (colDef.behavior !== "move" && colDef.behavior !== "selectAndMove") { return false; }
                })
                .bind("dragstart", function(e) {
                    if (!options.editorLock.commitCurrentEdit()) { return false; }

                    var row = parseInt($(e.target).closest(".slick-row").attr("row"), 10);

                    if (!selectedRowsLookup[row]) {
                        setSelectedRows([row]);
                    }

                    var $selectionProxy = $("<div class='slick-reorder-proxy'/>");
                    $selectionProxy
                        .css("position", "absolute")
                        .css("zIndex", "99999")
                        .css("width", $(this).innerWidth())
                        .css("height", options.rowHeight*selectedRows.length)
                        .appendTo($viewport);

                    $(this)
                        .data("selectionProxy", $selectionProxy)
                        .data("insertBefore", -1);

                    var $guide = $("<div class='slick-reorder-guide'/>");
                    $guide
                        .css("position", "absolute")
                        .css("zIndex", "99998")
                        .css("width", $(this).innerWidth())
                        .css("top", -1000)
                        .appendTo($viewport);

                    return $guide;
                })
                .bind("drag", function(e) {
                    var top = e.clientY - $(this).offset().top;
                    $(this).data("selectionProxy").css("top",top-5);

                    var insertBefore = Math.max(0,Math.min(Math.round(top/options.rowHeight),gridDataGetLength()));
                    if (insertBefore !== $(this).data("insertBefore")) {
                        if (self.onBeforeMoveRows && self.onBeforeMoveRows(getSelectedRows(),insertBefore) === false) {
                            $(e.dragProxy).css("top", -1000).data("canMove",false);
                        }
                        else {
                            $(e.dragProxy).css("top",insertBefore*options.rowHeight).data("canMove",true);
                        }
                        $(this).data("insertBefore", insertBefore);
                    }
                })
                .bind("dragend", function(e) {
                    var canMove = $(e.dragProxy).data("canMove");
                    $(e.dragProxy).remove();
                    $(this).data("selectionProxy").remove();
                    var insertBefore = $(this).data("insertBefore");
                    $(this).removeData("selectionProxy").removeData("insertBefore");
                    if (self.onMoveRows && canMove) { self.onMoveRows(getSelectedRows(),insertBefore); }
                });
        }

        function measureCellPaddingAndBorder() {
            var tmp = $("<div class='ui-state-default slick-header-column' cell='' id='' style='visibility:hidden'>-</div>").appendTo($headers);
            headerColumnWidthDiff = tmp.outerWidth() - tmp.width();
            headerColumnHeightDiff = tmp.outerHeight() - tmp.height();
            tmp.remove();

            var r = $("<div class='slick-row' />").appendTo($canvas);
            tmp = $("<div class='slick-cell' cell='' id='' style='visibility:hidden'>-</div>").appendTo(r);
            cellWidthDiff = tmp.outerWidth() - tmp.width();
            cellHeightDiff = tmp.outerHeight() - tmp.height();
            r.remove();

            absoluteColumnMinWidth = Math.max(headerColumnWidthDiff,cellWidthDiff);
        }

        function createCssRules() {
            var $style = $("<style type='text/css' rel='stylesheet' lib='slickgrid" + uid + "' />").appendTo($("head"));
            var rowHeight = (options.rowHeight - cellHeightDiff);
            $.rule("." + uid + " .slick-header-column { left: 10000px; }").appendTo($style);
            $.rule("." + uid + " .slick-header-columns-secondary {  height:" + options.secondaryHeaderRowHeight + "px; }").appendTo($style);
            $.rule("." + uid + " .slick-cell { height:" + rowHeight + "px; line-height:" + rowHeight + "px; }").appendTo($style);

            for (var i = 0; i < columns.length; i++) {
                $.rule(
                    "." + uid + " .c" + i + " { " +
                    "width:" + ((columns[i].currentWidth || columns[i].width) - cellWidthDiff) + "px; " +
                    "display: " + (columns[i].hidden ? "none" : "block") +
                    " }").appendTo($style);
            }
        }

        function removeCssRules() {
            $("style[lib=slickgrid" + uid + "]").remove();
        }

        function destroy() {
            options.editorLock.cancelCurrentEdit();

            if (self.onBeforeDestroy) { self.onBeforeDestroy(); }
            if ($headers.sortable) { $headers.sortable("destroy"); }
            $container.unbind("resize", resizeCanvas);
            removeCssRules();

            $container.empty().removeClass(uid);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////
        // General

        function getEditController() {
            return editController;
        }

        function getColumnIndex(id) {
            return columnsById[id];
        }

        function autosizeColumns() {
            var i, c,
                widths = [],
                visibleColumns = [],
                shrinkLeeway = 0,
                availWidth = (options.autoHeight ? viewportW : viewportW - scrollbarDimensions.width), // with AutoHeight, we do not need to accomodate the vertical scroll bar
                total = 0,
                existingTotal = 0;

            for (i = 0; i < columns.length; i++) {
                if (!columns[i].hidden) {
                    c = columns[i];
                    visibleColumns.push(c);
                    widths.push(c.width);
                    existingTotal += c.width;
                    shrinkLeeway += c.width - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                }
            }

            total = existingTotal;

            removeAllRows();

            // shrink
            while (total > availWidth) {
                if (!shrinkLeeway) { return; }
                var shrinkProportion = (total - availWidth) / shrinkLeeway;
                for (i = 0; i < visibleColumns.length && total > availWidth; i++) {
                    c = visibleColumns[i];
                    if (!c.resizable || c.minWidth === c.width || c.width === absoluteColumnMinWidth) { continue; }
                    var shrinkSize = Math.floor(shrinkProportion * (c.width - Math.max(c.minWidth || 0, absoluteColumnMinWidth))) || 1;
                    total -= shrinkSize;
                    widths[i] -= shrinkSize;
                }
            }

            // grow
            var previousTotal = total;
            while (total < availWidth) {
                var growProportion = availWidth / total;
                for (i = 0; i < visibleColumns.length && total < availWidth; i++) {
                    c = visibleColumns[i];
                    if (!c.resizable || c.maxWidth <= c.width) { continue; }
                    var growSize = Math.min(Math.floor(growProportion * c.width) - c.width, (c.maxWidth - c.width) || 1000000) || 1;
                    total += growSize;
                    widths[i] += growSize;
                }
                if (previousTotal == total) break; // if total is not changing, will result in infinite loop
                previousTotal = total;
            }

            for (i=0; i<columns.length; i++) {
                if (columns[i] === visibleColumns[0]) {
                    var newWidth = widths.shift();
                    visibleColumns.shift().currentWidth = newWidth;
                    styleColumnWidth(i, newWidth, true);
                }
            }

            resizeCanvas();
        }

        function styleColumnWidth(index,width,styleCells) {
            var c = columns[index];
            c.currentWidth = width;
            $headers.find(".slick-header-column[id=" + c.id + "]").css("width", width - headerColumnWidthDiff);
            if (styleCells) {
                $.rule("." + uid + " .c" + index, "style[lib=slickgrid" + uid + "]").css("width", width - cellWidthDiff);
            }
        }

        function setColumnVisibility(column,visible) {
            var index = columnsById[column.id];
            columns[index].hidden = !visible;
            var header = $headers.find("[id=" + columns[index].id + "]");
            header.css("display", visible?"block":"none");
            $.rule("." + uid + " .c" + index, "style[lib=slickgrid" + uid + "]").css("display", visible?"block":"none");
            resizeCanvas();

            if (options.forceFitColumns) {
                autosizeColumns();
            }

            setupColumnResize();
        }

        // Rearrange columns in specified order.
        //  columnIDs = (partial) array of existing columns IDs, in desired order.
        //      Specified columns are moved to the front of the column list.  Any
        //      remainder is shifted toward the end.
        //  todo: Refactor. This logic relies on IDs in the DOM, which is something we're trying to move away from.
        function reorderColumns(columnIds) {
            for (var i = columnIds.length-1; i >=0; i--) {
                if ($headers.children().first().attr("id") == columnIds[i]) {   // already in correct place?
                    continue;
                }
                $headers.children().first().before($headers.find("#" + $.escapeSelectorMetachars(columnIds[i])));
            }
            rebuildColumns();
        }

        // Set specified column to indicate the sort style.  Does NOT trigger the onSort message.
        function setSortColumn(columnId, ascending) {
            $sortcol = columnId ? $headers.find("#" + columnId) : null;
            setSortHeaderStyle($sortcol, ascending);
        }

        function getSelectedRows() {
            return selectedRows.concat();
        }

        function setSelectedRows(rows) {
            var i, row;
            // there are 3 possible states: a) editor lock is inactive: OK, b) editor lock is active and this SlickGrid is the controller: OK, c) editor lock is active but some other controller locked it: throw
            //if (options.editorLock.isActive() && !options.editorLock.isActive(editController)) {
            //    throw "Grid : setSelectedRows : cannot set selected rows when somebody else has an edit lock";
            //}

            var lookup = {};
            for (i=0; i<rows.length; i++) {
                lookup[rows[i]] = true;
            }

            // unselect old rows
            for (i=0; i<selectedRows.length; i++) {
                row = selectedRows[i];
                if (rowsCache[row] && !lookup[row]) {
                    $(rowsCache[row]).removeClass("ui-state-active selected");
                }
            }

            // select new ones
            for (i=0; i<rows.length; i++) {
                row = rows[i];
                if (rowsCache[row] && !selectedRowsLookup[row]) {
                    $(rowsCache[row]).addClass("ui-state-active selected");
                }
            }

            selectedRows = rows.concat();
            selectedRowsLookup = lookup;
        }

        function getOptions(args) {
            return options;
        }

        function setOptions(args) {
            if (!options.editorLock.commitCurrentEdit()) {
                return;
            }

            makeSelectedCellNormal();

            if (options.enableAddRow !== args.enableAddRow) {
                removeRow(gridDataGetLength());
            }

            options = $.extend(options,args);

            render();
        }

        function setData(newData,scrollToTop) {
            removeAllRows();
            data = newData;
            gridData = data;
            gridDataGetLength = gridData.getLength || defaultGetLength;
            gridDataGetItem = gridData.getItem || defaultGetItem;
            if (scrollToTop) {
                $viewport.scrollTop(0);
            }
        }

        function getSecondaryHeaderRow() {
            return $secondaryHeaders[0];
        }

        function showSecondaryHeaderRow() {
            options.showSecondaryHeaderRow = true;
            $secondaryHeaderScroller.slideDown("fast", resizeCanvas);
        }

        function hideSecondaryHeaderRow() {
            options.showSecondaryHeaderRow = false;
            $secondaryHeaderScroller.slideUp("fast", resizeCanvas);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////
        // Rendering / Scrolling

        function appendRowHtml(stringArray,row) {
            var d = gridDataGetItem(row);
            var dataLoading = row < gridDataGetLength() && !d;
            var css = "slick-row " +
                (dataLoading ? " loading" : "") +
                (selectedRowsLookup[row] ? " selected ui-state-active" : "") +
                (row % 2 == 1 ? ' odd' : ' even');

            // if the user has specified a function to provide additional per-row css classes, call it here
            if (options.rowCssClasses) {
                css += ' ' + options.rowCssClasses(d);
            }

            stringArray.push("<div class='ui-widget-content " + css + "' row='" + row + "' style='top:" + (options.rowHeight*row) + "px'>");

            for (var i=0, cols=columns.length; i<cols; i++) {
                var m = columns[i];
                if (m.hidden) continue;

                stringArray.push("<div " + (m.unselectable ? "tabIndex=-1 " : "hideFocus tabIndex=0 ") + "class='slick-cell c" + i + (m.cssClass ? " " + m.cssClass : "") + "' cell=" + i + ">");

                // if there is a corresponding row (if not, this is the Add New row or this data hasn't been loaded yet)
                if (d && row < gridDataGetLength()) {
                    stringArray.push(m.formatter(row, i, d[m.field], m, d));
                }

                stringArray.push("</div>");
            }

            stringArray.push("</div>");
        }

        function cleanupRows(visibleFrom,visibleTo) {
            for (var i in rowsCache) {
                if (((i = parseInt(i, 10)) !== currentRow) && (i < visibleFrom || i > visibleTo)) {
                    removeRowFromCache(i);
                }
            }
        }

        function removeAllRows() {
            $canvas[0].innerHTML = "";
            rowsCache= {};
            postProcessedRows = {};
            counter_rows_removed += renderedRows;
            renderedRows = 0;
        }

        function removeRowFromCache(row) {
            var node = rowsCache[row];
            if (!node) { return; }
            node.parentNode.removeChild(node);
            delete rowsCache[row];
            delete postProcessedRows[row];
            renderedRows--;
            counter_rows_removed++;
        }

        function removeRows(rows) {
            var i, rl, nl;
            if (!rows || !rows.length) { return; }
            scrollDir = 0;
            var nodes = [];
            for (i=0, rl=rows.length; i<rl; i++) {
                if (currentEditor && currentRow === i) {
                    throw "Grid : removeRow : Cannot remove a row that is currently in edit mode";
                }

                if (rowsCache[rows[i]]) {
                    nodes.push(rows[i]);
                }
            }

            if (renderedRows > 10 && nodes.length === renderedRows) {
                removeAllRows();
            }
            else {
                for (i=0, nl=nodes.length; i<nl; i++) {
                    removeRowFromCache(nodes[i]);
                }
            }
        }

        function removeRow(row) {
            removeRows([row]);
        }

        function updateCell(row,cell) {
            if (!rowsCache[row]) { return; }
            var $cell = $(rowsCache[row]).find(".slick-cell[cell=" + cell + "]");
            if ($cell.length === 0) { return; }

            var m = columns[cell], d = gridDataGetItem(row);
            if (currentEditor && currentRow === row && currentCell === cell) {
                currentEditor.setValue(d[m.field]);
            }
            else {
                $cell[0].innerHTML = d ? m.formatter(row, cell, d[m.field], m, d) : "";
                invalidatePostProcessingResults(row);
            }
        }

        function updateRow(row) {
            if (!rowsCache[row]) { return; }

            // todo:  perf:  iterate over direct children?
            $(rowsCache[row]).find(".slick-cell").each(function(i) {
                var m = columns[i];
                if (row === currentRow && i === currentCell && currentEditor) {
                    currentEditor.setValue(gridDataGetItem(currentRow)[m.field]);
                }
                else if (gridDataGetItem(row)) {
                    this.innerHTML = m.formatter(row, i, gridDataGetItem(row)[m.field], m, gridDataGetItem(row));
                }
                else {
                    this.innerHTML = "";
                }
            });

            invalidatePostProcessingResults(row);
        }

        function resizeCanvas() {
            var newHeight = options.rowHeight * (gridDataGetLength() + (options.enableAddRow ? 1 : 0) + (options.leaveSpaceForNewRows? numVisibleRows - 1 : 0));
            if (options.autoHeight) { // use computed height to set both canvas _and_ divMainScroller, effectively hiding scroll bars.
                $viewport.height(newHeight);
            }
            else {
            $viewport.height(
                    $container.innerHeight() -
                    $headerScroller.outerHeight() -
                    (options.showSecondaryHeaderRow ? $secondaryHeaderScroller.outerHeight() : 0));            }

            viewportW = $viewport.innerWidth();
            viewportH = $viewport.innerHeight();
            BUFFER = numVisibleRows = Math.ceil(viewportH / options.rowHeight);
            CAPACITY = Math.max(50, numVisibleRows + 2*BUFFER);

            var totalWidth = 0;
            $headers.find('.slick-header-column:visible').each(function () {
                totalWidth += $(this).outerWidth();
            });
            $canvas.width(totalWidth);

            // browsers sometimes do not adjust scrollTop/scrollHeight when the height of contained objects changes
            newHeight = Math.max(newHeight, viewportH - scrollbarDimensions.height);
            if ($viewport.scrollTop() > newHeight - $viewport.height() + scrollbarDimensions.height) {
                $viewport.scrollTop(newHeight - $viewport.height() + scrollbarDimensions.height);
            }

            $canvas.height(newHeight);
            render();
        }

        function resizeAndRender() {
            if (options.forceFitColumns) {
                autosizeColumns();
            } else {
                resizeCanvas();
            }
        }

        function updateRowCount() {
            // remove the rows that are now outside of the data range
            // this helps avoid redundant calls to .removeRow() when the size of the data decreased by thousands of rows
            var l = options.enableAddRow ? gridDataGetLength() : gridDataGetLength() - 1;
            for (var i in rowsCache) {
                if (i >= l) {
                    removeRowFromCache(i);
                }
            }

            var newHeight = Math.max(options.rowHeight * (gridDataGetLength() + (options.enableAddRow?1:0) + (options.leaveSpaceForNewRows?numVisibleRows-1:0)), viewportH - scrollbarDimensions.height);

            // browsers sometimes do not adjust scrollTop/scrollHeight when the height of contained objects changes
            if ($viewport.scrollTop() > newHeight - $viewport.height() + scrollbarDimensions.height) {
                $viewport.scrollTop(newHeight - $viewport.height() + scrollbarDimensions.height);
            }
            $canvas.height(newHeight);

            if (options.autoHeight) {
                resizeCanvas();
            }
        }

        function getViewport() {
            return {
                top:    Math.floor(currentScrollTop / options.rowHeight),
                bottom: Math.floor((currentScrollTop + viewportH) / options.rowHeight)
            };
        }

        function renderRows(from,to) {
            var i, l,
                parentNode = $canvas[0],
                rowsBefore = renderedRows,
                stringArray = [],
                rows =[],
                startTimestamp = new Date(),
                needToReselectCell = false;

            for (i = from; i <= to; i++) {
                if (rowsCache[i]) { continue; }
                renderedRows++;
                rows.push(i);
                appendRowHtml(stringArray,i);
                if (currentCellNode && currentRow === i)
                    needToReselectCell = true;
                counter_rows_rendered++;
            }

            var x = document.createElement("div");
            x.innerHTML = stringArray.join("");

            for (i = 0, l = x.childNodes.length; i < l; i++) {
                rowsCache[rows[i]] = parentNode.appendChild(x.firstChild);
            }

            if (needToReselectCell) {
                currentCellNode = $(rowsCache[currentRow]).find(".slick-cell[cell=" + currentCell + "]")[0];
                setSelectedCell(currentCellNode,false,false);
            }

            if (renderedRows - rowsBefore > MIN_BUFFER) {
                avgRowRenderTime = (new Date() - startTimestamp) / (renderedRows - rowsBefore);
            }
        }

        function startPostProcessing() {
            if (!options.enableAsyncPostRender) { return; }
            clearTimeout(h_postrender);
            h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay, "JavaScript");
        }

        function invalidatePostProcessingResults(row) {
            delete postProcessedRows[row];
            postProcessFromRow = Math.min(postProcessFromRow,row);
            postProcessToRow = Math.max(postProcessToRow,row);
            startPostProcessing();
        }

        function render() {
            var vp = getViewport();
            var from = Math.max(0, vp.top - (scrollDir >= 0 ? MIN_BUFFER : BUFFER));
            var to = Math.min(options.enableAddRow ? gridDataGetLength() : gridDataGetLength() - 1, vp.bottom + (scrollDir > 0 ? BUFFER : MIN_BUFFER));

            if (renderedRows > 10 && Math.abs(lastRenderedScrollTop - currentScrollTop) > options.rowHeight*CAPACITY) {
                removeAllRows();
            }
            else {
                cleanupRows(from,to);
            }

            renderRows(from,to);

            postProcessFromRow = Math.max(0,vp.top-MIN_BUFFER);
            postProcessToRow = Math.min(options.enableAddRow ? gridDataGetLength() : gridDataGetLength() - 1, vp.bottom+MIN_BUFFER);
            startPostProcessing();

            lastRenderedScrollTop = currentScrollTop;
            h_render = null;
        }

        function invalidate() {
            updateRowCount(gridDataGetLength());
            removeAllRows();
            render();
        }

        function handleScroll() {
            currentScrollTop = $viewport[0].scrollTop;
            var scrollDistance = Math.abs(lastRenderedScrollTop - currentScrollTop);
            var scrollLeft = $viewport[0].scrollLeft;

            if (scrollLeft !== currentScrollLeft) {
                $headerScroller[0].scrollLeft = currentScrollLeft = scrollLeft;
                $secondaryHeaderScroller[0].scrollLeft = currentScrollLeft = scrollLeft;
            }

            // min scroll distance = 25% of the viewport or MIN_BUFFER rows (whichever is smaller)
            if (scrollDistance < Math.min(viewportH/4, MIN_BUFFER*options.rowHeight)) { return; }

            if (lastRenderedScrollTop === currentScrollTop) {
                scrollDir = 0;
            }
            else if (lastRenderedScrollTop < currentScrollTop) {
                scrollDir = 1;
            }
            else {
                scrollDir = -1;
            }

            if (h_render) {
                clearTimeout(h_render);
            }

            if (scrollDistance < numVisibleRows*options.rowHeight) {
                render();
            }
            else {
                h_render = setTimeout(render, 50, "JavaScript");
            }

            if (self.onViewportChanged) {
                self.onViewportChanged();
            }
        }

        function asyncPostProcessRows() {
            while (postProcessFromRow <= postProcessToRow) {
                var row = (scrollDir >= 0) ? postProcessFromRow++ : postProcessToRow--;
                var rowNode = rowsCache[row];
                if (!rowNode || postProcessedRows[row] || row>=gridDataGetLength()) { continue; }

                var d = gridDataGetItem(row), cellNodes = rowNode.childNodes;
                for (var i=0, j=0, l=columns.length; i<l; ++i) {
                    var m = columns[i];
                    if (m.hidden) { continue; }
                    if (m.asyncPostRender) { m.asyncPostRender(cellNodes[j], postProcessFromRow, d, m); }
                    ++j;
                }

                postProcessedRows[row] = true;
                h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay, "JavaScript");
                return;
            }
        }


        //////////////////////////////////////////////////////////////////////////////////////////////
        // Interactivity

        function handleKeyDown(e) {
            // give registered handler chance to process the keyboard event
            var handled = (self.onKeyDown && // a handler must be registered
                gridDataGetItem(currentRow) && // grid must be non-empty, have cell navigation enabled and have valid row selected as current
                !options.editorLock.isActive() && // grid must not be in edit mode;
                self.onKeyDown(e, currentRow, currentCell)); // handler must return truthy-value to indicate it handled the event

            if (!handled) {
                switch (e.which) {
                case 27:  // esc
                    if (!options.editorLock.isActive()) {
                        return; // no editing mode to cancel, allow bubbling and default processing (exit without cancelling the event)
                    }
                    options.editorLock.cancelCurrentEdit();
                    if (currentCellNode) {
                        currentCellNode.focus();
                    }
                    break;

                case 9:  // tab
                    gotoDir(0, (e.shiftKey) ? -1 : 1, true);
                    break;

                case 37:  // left
                    gotoDir(0, -1, false);
                    break;

                case 39:  // right
                    gotoDir(0, 1, false);
                    break;

                case 38:  // up
                    gotoDir(-1, 0, false);
                    break;

                case 40:  // down
                    gotoDir(1, 0, false);
                    break;

                case 13:  // enter
                    if (options.autoEdit) {
                        gotoDir(1, 0, false);
                    }
                    else if (options.editable) {
                        if (currentEditor) {
                            // adding new row
                            if (currentRow === data.length) {
                                gotoDir(1, 0, false);
                            }
                            else {
                                // if the commit fails, it would do so due to a validation error
                                // if so, do not steal the focus from the editor
                                if (options.editorLock.commitCurrentEdit()) {
                                    currentCellNode.focus();
                                }
                            }
                        } else {
                            if (options.editorLock.commitCurrentEdit()) {
                                makeSelectedCellEditable();
                            }
                        }

                    }
                    break;

                default:
                    return; // allow bubbling and default processing (exit without cancelling the event)
                }
            }

            // the event has been handled so don't let parent element (bubbling/propagation) or browser (default) handle it
            e.stopPropagation();
            e.preventDefault();
            try {
                e.originalEvent.keyCode = 0; // prevent default behaviour for special keys in IE browsers (F3, F5, etc.)
            }
            catch (error) {} // ignore exceptions - setting the original event's keycode throws access denied exception for "Ctrl" (hitting control key only, nothing else), "Shift" (maybe others)
        }

        function handleClick(e) {
            var $cell = $(e.target).closest(".slick-cell");
            if ($cell.length === 0) { return; }

            // are we editing this cell?
            if (currentCellNode === $cell[0] && currentEditor !== null) { return; }

            var row = parseInt($cell.parent().attr("row"), 10);
            var cell = parseInt($cell.attr("cell"), 10);
            var validated = null;
            var c = columns[cell];

            // is this a 'select' column?
            if (gridDataGetItem(row) && (c.behavior === "selectAndMove" || c.behavior === "select")) {
                // grid must not be in edit mode
                validated = options.editorLock.commitCurrentEdit();
                if (validated) {
                    var selection = getSelectedRows();
                    var idx = $.inArray(row, selection);

                    if (!e.ctrlKey && !e.shiftKey) {
                        selection = [row];
                    }
                    else if (idx === -1 && e.ctrlKey) {
                        selection.push(row);
                    }
                    else if (idx !== -1 && e.ctrlKey) {
                        selection = $.grep(selection, function(o, i) { return (o !== row); });
                    }
                    else if (selection.length && e.shiftKey) {
                        var last = selection.pop();
                        var from = Math.min(row, last);
                        var to = Math.max(row, last);
                        selection = [];
                        for (var i = from; i <= to; i++) {
                            if (i !== last) {
                                selection.push(i);
                            }
                        }
                        selection.push(last);
                    }

                    setSelectedRows(selection);
                    if (self.onSelectedRowsChanged) {
                        self.onSelectedRowsChanged();
                    }
                    return false;
                }
            }

            // do we have any registered handlers?
            if (gridDataGetItem(row) && self.onClick) {
                // grid must not be in edit mode
                validated = options.editorLock.commitCurrentEdit();
                if (validated) {
                    // handler will return true if the event was handled
                    if (self.onClick(e, row, cell)) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    }
                }
            }

            if (options.enableCellNavigation && !columns[cell].unselectable) {
                // commit current edit before proceeding
                if (validated === true || (validated === null && options.editorLock.commitCurrentEdit())) {
                    setSelectedCellAndRow($cell[0], (row === data.length) || options.autoEdit, false);
                }
            }
        }

        function handleContextMenu(e) {
            var $cell = $(e.target).closest(".slick-cell");
            if ($cell.length === 0) { return; }

            // are we editing this cell?
            if (currentCellNode === $cell[0] && currentEditor !== null) { return; }

            var row = parseInt($cell.parent().attr("row"), 10);
            var cell = parseInt($cell.attr("cell"), 10);
            var validated = null;

            // do we have any registered handlers?
            if (gridDataGetItem(row) && self.onContextMenu) {
                // grid must not be in edit mode
                validated = options.editorLock.commitCurrentEdit();
                if (validated) {
                    // handler will return true if the event was handled
                    if (self.onContextMenu(e, row, cell)) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    }
                }
            }
        }

        function handleDblClick(e) {
            var $cell = $(e.target).closest(".slick-cell");
            if ($cell.length === 0) { return; }

            // are we editing this cell?
            if (currentCellNode === $cell[0] && currentEditor !== null) { return; }

            var row = parseInt($cell.parent().attr("row"), 10);
            var cell = parseInt($cell.attr("cell"), 10);
            var validated = null;

            // do we have any registered handlers?
            if (gridDataGetItem(row) && self.onDblClick) {
                // grid must not be in edit mode
                validated = options.editorLock.commitCurrentEdit();
                if (validated) {
                    // handler will return true if the event was handled
                    if (self.onDblClick(e, row, cell)) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    }
                }
            }

            if (options.editable) {
                gotoCell(row, cell, true);
            }
        }

        function handleHeaderContextMenu(e) {
            if (self.onHeaderContextMenu && options.editorLock.commitCurrentEdit()) {
                e.preventDefault();
                // TODO:  figure out which column was acted on and pass it as a param to the handler
                self.onHeaderContextMenu(e);
            }
        }

        // TODO: PERF: throttle event
        function handleHover(e) {
            if (!options.enableAutoTooltips) return;
            var $cell = $(e.target).closest(".slick-cell",$canvas);
            if ($cell && $cell.length) {
                if ($cell.innerWidth() < $cell[0].scrollWidth) {
                    $cell.attr("title", $.trim($cell.text()));
                }
                else {
                    $cell.attr("title","");
                }
            }
        }

        function getCellFromPoint(x,y) {
            var row = Math.floor(y/options.rowHeight);
            var cell = 0;

            var w = 0;
            for (var i=0; i<columns.length && w<y; i++) {
                w += columns[i].width;
                cell++;
            }

            return {row:row,cell:cell-1};
        }


        //////////////////////////////////////////////////////////////////////////////////////////////
        // Cell switching
        function resetCurrentCell() {
            setSelectedCell(null,false,false);
        }

        function setSelectedCell(newCell,editMode,doPaging) {
            if (currentCellNode !== null) {
                makeSelectedCellNormal();
                $(currentCellNode).removeClass("selected");
            }

            currentCellNode = newCell;

            if (currentCellNode !== null) {
                currentRow = parseInt($(currentCellNode).parent().attr("row"), 10);
                currentCell = parseInt($(currentCellNode).attr("cell"), 10);

                $(currentCellNode).addClass("selected");

                scrollSelectedCellIntoView(doPaging);

                if (options.editable && editMode && isCellPotentiallyEditable(currentRow,currentCell)) {
                    clearTimeout(h_editorLoader);

                    if (options.asyncEditorLoading) {
                        h_editorLoader = setTimeout(makeSelectedCellEditable, options.asyncEditorLoadDelay, "JavaScript");
                    }
                    else {
                        makeSelectedCellEditable();
                    }
                }
                else {
                    currentCellNode.focus();
                }
            }
            else {
                currentRow = null;
                currentCell = null;
            }
        }

        function setSelectedCellAndRow(newCell,editMode,doPaging) {
            setSelectedCell(newCell,editMode,doPaging);

            if (newCell) {
                setSelectedRows([currentRow]);
            }
            else {
                setSelectedRows([]);
            }

            if (self.onSelectedRowsChanged) {
                self.onSelectedRowsChanged();
            }
        }

        function clearTextSelection() {
            if (document.selection && document.selection.empty) {
                document.selection.empty();
            }
            else if (window.getSelection) {
                var sel = window.getSelection();
                if (sel && sel.removeAllRanges) {
                    sel.removeAllRanges();
                }
            }
        }

        function isCellPotentiallyEditable(row,cell) {
            // is the data for this row loaded?
            if (row < gridDataGetLength() && !gridDataGetItem(row)) {
                return false;
            }

            // are we in the Add New row?  can we create new from this cell?
            if (columns[cell].cannotTriggerInsert && row >= gridDataGetLength()) {
                return false;
            }

            // does this cell have an editor?
            if (!columns[cell].editor) {
                return false;
            }

            return true;
        }

        function makeSelectedCellNormal() {
            if (!currentEditor) { return; }

            if (self.onBeforeCellEditorDestroy) {
                self.onBeforeCellEditorDestroy(currentEditor);
            }
            currentEditor.destroy();
            $(currentCellNode).removeClass("editable invalid");

            if (gridDataGetItem(currentRow)) {
                currentCellNode.innerHTML = columns[currentCell].formatter(currentRow, currentCell, gridDataGetItem(currentRow)[columns[currentCell].field], columns[currentCell], gridDataGetItem(currentRow));
                invalidatePostProcessingResults(currentRow);
            }

            currentEditor = null;

            // if there previously was text selected on a page (such as selected text in the edit cell just removed),
            // IE can't set focus to anything else correctly
            if ($.browser.msie) { clearTextSelection(); }

            options.editorLock.deactivate(editController);
        }

        function makeSelectedCellEditable() {
            if (!currentCellNode) { return; }
            if (!options.editable) {
                throw "Grid : makeSelectedCellEditable : should never get called when options.editable is false";
            }

            // cancel pending async call if there is one
            clearTimeout(h_editorLoader);

            if (!isCellPotentiallyEditable(currentRow,currentCell)) {
                return;
            }



            if (self.onBeforeEditCell && self.onBeforeEditCell(currentRow,currentCell,gridDataGetItem(currentRow)) === false) {
                currentCellNode.focus();
                return;
            }

            options.editorLock.activate(editController);
            $(currentCellNode).addClass("editable");

            var value = null;

            // if there is a corresponding row
            if (gridDataGetItem(currentRow)) {
                value = gridDataGetItem(currentRow)[columns[currentCell].field];
            }

            currentCellNode.innerHTML = "";

            currentEditor = new columns[currentCell].editor($(currentCellNode), columns[currentCell], value, gridDataGetItem(currentRow), function() {
                // if the commit fails, it would do so due to a validation error
                // if so, do not steal the focus from the editor
                if (options.editorLock.commitCurrentEdit()) {
                    currentCellNode.focus();
                }
            });
        }

        function getCellEditor() {
            return currentEditor;
        }

        function getCurrentCell() {
            if (!currentCellNode)
                return null;
            else
                return {row: currentRow, cell: currentCell};
        }

        function getCurrentCellNode() {
            return currentCellNode;
        }

        function scrollRowIntoView(row, doPaging) {
            var scrollTop = $viewport[0].scrollTop;

            // need to page down?
            if ((row + 1) * options.rowHeight > scrollTop + viewportH) {
                $viewport[0].scrollTop = doPaging
                                            ? row * options.rowHeight
                                            : (row + 1) * options.rowHeight - viewportH;
                handleScroll();
            }

            // or page up?
            else if (row * options.rowHeight < scrollTop) {
                $viewport[0].scrollTop = doPaging
                                            ? (row + 1) * options.rowHeight - viewportH
                                            : row * options.rowHeight;
                handleScroll();
            }
        }

        function scrollSelectedCellIntoView(doPaging) {
            if (!currentCellNode) { return; }
            scrollRowIntoView(currentRow,doPaging);
        }

        function gotoDir(dy, dx, rollover) {
            if (!currentCellNode || !options.enableCellNavigation) { return; }
            if (!options.editorLock.commitCurrentEdit()) { return; }

            var nextRow = rowsCache[currentRow + dy];
            var nextCell = nextRow ? $(nextRow).find(".slick-cell[cell=" + (currentCell + dx) + "]") : null;
            if (nextCell && !nextCell.is("[tabIndex=0]:visible")) {
                nextCell = (dx>0)?nextCell.nextAll("[tabIndex=0]:visible:first"):nextCell.prevAll("[tabIndex=0]:visible:first");
            }

            if (rollover && dy === 0 && !(nextRow && nextCell && nextCell.length)) {
                if (!nextCell || !nextCell.length) {
                    if (dx > 0) {
                        nextRow = rowsCache[currentRow + dy + 1];
                        nextCell = nextRow ? $(nextRow).find(".slick-cell[cell]:first") : null;
                    }
                    else {
                        nextRow = rowsCache[currentRow + dy - 1];
                        nextCell = nextRow ? $(nextRow).find(".slick-cell[cell]:last") : null;
                    }
                    if (nextCell && !nextCell.is("[tabIndex=0]:visible")) {
                        nextCell = (dx>0)?nextCell.nextAll("[tabIndex=0]:visible:first"):nextCell.prevAll("[tabIndex=0]:visible:first");
                    }
                }
            }

            if (nextRow && nextCell && nextCell.length) {
                // if selecting the 'add new' row, start editing right away
                var row = parseInt($(nextRow).attr("row"), 10);
                setSelectedCellAndRow(nextCell[0], (row === data.length) || options.autoEdit, true);

                // if no editor was created, set the focus back on the cell
                if (!currentEditor) {
                    currentCellNode.focus();
                }
            }
            else {
                currentCellNode.focus();
            }
        }

        function gotoCell(row, cell, forceEdit) {
            if (row > gridDataGetLength() || row < 0 || cell >= columns.length || cell < 0) { return; }
            if (!options.enableCellNavigation || columns[cell].unselectable) { return; }

            if (!options.editorLock.commitCurrentEdit()) { return; }

            if (!rowsCache[row]) {
                renderRows(row,row);
            }

            cell = $(rowsCache[row]).find(".slick-cell[cell=" + cell + "][tabIndex=0]:visible")[0];

            // if selecting the 'add new' row, start editing right away
            setSelectedCellAndRow(cell, forceEdit || (row === data.length) || options.autoEdit, false);

            // if no editor was created, set the focus back on the cell
            if (!currentEditor) {
                currentCellNode.focus();
            }
        }


        //////////////////////////////////////////////////////////////////////////////////////////////
        // IEditor implementation for the editor lock

        function commitCurrentEdit() {
            if (currentEditor) {
                if (currentEditor.isValueChanged()) {
                    var validationResults = currentEditor.validate();

                    if (validationResults.valid) {
                        var value = currentEditor.getValue();

                        if (currentRow < gridDataGetLength()) {
                            if (columns[currentCell].setValueHandler) {
                                makeSelectedCellNormal();
                                columns[currentCell].setValueHandler(value, columns[currentCell], gridDataGetItem(currentRow));
                            }
                            else {
                                gridDataGetItem(currentRow)[columns[currentCell].field] = value;
                                makeSelectedCellNormal();
                            }

                            if (self.onCellChange) {
                                self.onCellChange(currentRow,currentCell,gridDataGetItem(currentRow));
                            }
                        }
                        else if (self.onAddNewRow) {
                            makeSelectedCellNormal();
                            self.onAddNewRow(columns[currentCell], value);
                        }

                        // check whether the lock has been re-acquired by event handlers
                        return !options.editorLock.isActive();
                    }
                    else {
                        $(currentCellNode).addClass("invalid");
                        $(currentCellNode).stop(true,true).effect("highlight", {color:"red"}, 300);

                        if (self.onValidationError) {
                            self.onValidationError(currentCellNode, validationResults, currentRow, currentCell, columns[currentCell]);
                        }

                        currentEditor.focus();
                        return false;
                    }
                }

                makeSelectedCellNormal();
            }
            return true;
        }

        function cancelCurrentEdit() {
            makeSelectedCellNormal();
            return true;
        }




        //////////////////////////////////////////////////////////////////////////////////////////////
        // Debug

        this.debug = function() {
            var s = "";

            s += ("\n" + "counter_rows_rendered:  " + counter_rows_rendered);
            s += ("\n" + "counter_rows_removed:  " + counter_rows_removed);
            s += ("\n" + "renderedRows:  " + renderedRows);
            s += ("\n" + "numVisibleRows:  " + numVisibleRows);
            s += ("\n" + "CAPACITY:  " + CAPACITY);
            s += ("\n" + "BUFFER:  " + BUFFER);
            s += ("\n" + "avgRowRenderTime:  " + avgRowRenderTime);

            alert(s);
        };

        this.benchmark_render_200 = function() {
            removeAllRows();

            // render 200 rows in the viewport
            renderRows(0, 200);

            cleanupRows(0, 200);
        };

        this.stressTest = function() {
            console.time("benchmark-stress");

            renderRows(0,500);

            cleanupRows(0, 500);

            console.timeEnd("benchmark-stress");

            setTimeout(self.stressTest, 50, "JavaScript");
        };

        this.benchmarkFn = function(fn) {
            var s = new Date();

            var args = new Array(arguments);
            args.splice(0,1);

            self[fn].call(this,args);

            alert("Grid : benchmarkFn : " + fn + " : " + (new Date() - s) + "ms");
        };




        init();


        //////////////////////////////////////////////////////////////////////////////////////////////
        // Public API

        $.extend(this, {
            "slickGridVersion": "1.3.2",

            // Events
            "onSort":                null,
            "onHeaderContextMenu":   null,
            "onClick":               null,
            "onDblClick":            null,
            "onContextMenu":         null,
            "onKeyDown":             null,
            "onAddNewRow":           null,
            "onValidationError":     null,
            "onViewportChanged":     null,
            "onSelectedRowsChanged": null,
            "onColumnsReordered":    null,
            "onColumnsResized":      null,
            "onBeforeMoveRows":      null,
            "onMoveRows":            null,
            "onCellChange":          null,
            "onBeforeEditCell":      null,
            "onBeforeCellEditorDestroy":    null,
            "onBeforeDestroy":       null,

            // Methods
            "getOptions":          getOptions,
            "setOptions":          setOptions,
            "setData":             setData,
            "destroy":             destroy,
            "getColumnIndex":      getColumnIndex,
            "setColumnVisibility": setColumnVisibility,
            "autosizeColumns":     autosizeColumns,
            "updateCell":          updateCell,
            "updateRow":           updateRow,
            "removeRow":           removeRow,
            "removeRows":          removeRows,
            "removeAllRows":       removeAllRows,
            "render":              render,
            "invalidate":          invalidate,
            "getViewport":         getViewport,
            "resizeCanvas":        resizeCanvas,
            "updateRowCount":      updateRowCount,
            "getCellFromPoint":    getCellFromPoint,
            "getCurrentCell":      getCurrentCell,
            "getCurrentCellNode":  getCurrentCellNode,
            "resetCurrentCell":    resetCurrentCell,
            "gotoCell":            gotoCell,
            "editCurrentCell":     makeSelectedCellEditable,
            "getCellEditor":       getCellEditor,
            "scrollRowIntoView":   scrollRowIntoView,
            "getSelectedRows":     getSelectedRows,
            "setSelectedRows":     setSelectedRows,
            "getSecondaryHeaderRow":    getSecondaryHeaderRow,
            "showSecondaryHeaderRow":   showSecondaryHeaderRow,
            "hideSecondaryHeaderRow":   hideSecondaryHeaderRow,
            "reorderColumns":      reorderColumns,
            "setSortColumn":       setSortColumn,

            // IEditor implementation
            "getEditController":    getEditController
        });
    }

    // Slick.Grid
    $.extend(true, window, {
        Slick: {
            Grid: SlickGrid,
            EditorLock: EditorLock,
            GlobalEditorLock: new EditorLock()
        }
    });
}(jQuery));
