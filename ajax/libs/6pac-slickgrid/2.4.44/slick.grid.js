/**
 * @license
 * (c) 2009-2016 Michael Leibman
 * michael{dot}leibman{at}gmail{dot}com
 * http://github.com/mleibman/slickgrid
 *
 * Distributed under MIT license.
 * All rights reserved.
 *
 * SlickGrid v2.4
 *
 * NOTES:
 *     Cell/row DOM manipulations are done directly bypassing jQuery's DOM manipulation methods.
 *     This increases the speed dramatically, but can only be done safely because there are no event handlers
 *     or data associated with any cell/row DOM nodes.  Cell editors must make sure they implement .destroy()
 *     and do proper cleanup.
 */

// make sure required JavaScript modules are loaded
if (typeof jQuery === "undefined") {
  throw new Error("SlickGrid requires jquery module to be loaded");
}
if (!jQuery.fn.drag) {
  throw new Error("SlickGrid requires jquery.event.drag module to be loaded");
}
if (typeof Slick === "undefined") {
  throw new Error("slick.core.js not loaded");
}


(function ($) {
  "use strict";
  // shared across all grids on the page
  var scrollbarDimensions;
  var maxSupportedCssHeight;  // browser's breaking point

  //////////////////////////////////////////////////////////////////////////////////////////////
  // SlickGrid class implementation (available as Slick.Grid)

  /**
   * Creates a new instance of the grid.
   * @class SlickGrid
   * @constructor
   * @param {Node}              container   Container node to create the grid in.
   * @param {Array,Object}      data        An array of objects for databinding.
   * @param {Array}             columns     An array of column definitions.
   * @param {Object}            options     Grid options.
   **/
  function SlickGrid(container, data, columns, options) {
    // settings
    var defaults = {
      alwaysShowVerticalScroll: false,
      alwaysAllowHorizontalScroll: false,
      explicitInitialization: false,
      rowHeight: 25,
      defaultColumnWidth: 80,
      enableAddRow: false,
      leaveSpaceForNewRows: false,
      editable: false,
      autoEdit: true,
      suppressActiveCellChangeOnEdit: false,
      enableCellNavigation: true,
      enableColumnReorder: true,
      asyncEditorLoading: false,
      asyncEditorLoadDelay: 100,
      forceFitColumns: false,
      enableAsyncPostRender: false,
      asyncPostRenderDelay: 50,
      enableAsyncPostRenderCleanup: false,
      asyncPostRenderCleanupDelay: 40,
      autoHeight: false,
      editorLock: Slick.GlobalEditorLock,
      showColumnHeader: true,
      showHeaderRow: false,
      headerRowHeight: 25,
      createFooterRow: false,
      showFooterRow: false,
      footerRowHeight: 25,
      createPreHeaderPanel: false,
      showPreHeaderPanel: false,
      preHeaderPanelHeight: 25,
      showTopPanel: false,
      topPanelHeight: 25,
      formatterFactory: null,
      editorFactory: null,
      cellFlashingCssClass: "flashing",
      selectedCellCssClass: "selected",
      multiSelect: true,
      enableTextSelectionOnCells: false,
      dataItemColumnValueExtractor: null,
      frozenBottom: false,
      frozenColumn: -1,
      frozenRow: -1,
      frozenRightViewportMinWidth: 100,
      fullWidthRows: false,
      multiColumnSort: false,
      numberedMultiColumnSort: false,
      tristateMultiColumnSort: false,
      sortColNumberInSeparateSpan: false,
      defaultFormatter: defaultFormatter,
      forceSyncScrolling: false,
      addNewRowCssClass: "new-row",
      preserveCopiedSelectionOnPaste: false,
      showCellSelection: true,
      viewportClass: null,
      minRowBuffer: 3,
      emulatePagingWhenScrolling: true, // when scrolling off bottom of viewport, place new row at top of viewport
      editorCellNavOnLRKeys: false,
      enableMouseWheelScrollHandler: true,
      doPaging: true,
      autosizeColsMode: Slick.GridAutosizeColsMode.LegacyOff,
      autosizeColPaddingPx: 4,
      autosizeTextAvgToMWidthRatio: 0.75,
      viewportSwitchToScrollModeWidthPercent: undefined,
      viewportMinWidthPx: undefined,
      viewportMaxWidthPx: undefined,
      suppressCssChangesOnHiddenInit: false
    };

    var columnDefaults = {
      name: "",
      resizable: true,
      sortable: false,
      minWidth: 30,
      maxWidth: undefined,
      rerenderOnResize: false,
      headerCssClass: null,
      defaultSortAsc: true,
      focusable: true,
      selectable: true,
    };

    var columnAutosizeDefaults = {
      ignoreHeaderText: false,
      colValueArray: undefined,
      allowAddlPercent: undefined,
      formatterOverride: undefined,
      autosizeMode: Slick.ColAutosizeMode.ContentIntelligent,
      rowSelectionModeOnInit: undefined,
      rowSelectionMode: Slick.RowSelectionMode.FirstNRows,
      rowSelectionCount: 100,
      valueFilterMode: Slick.ValueFilterMode.None,
      widthEvalMode: Slick.WidthEvalMode.CanvasTextSize,
      sizeToRemaining: undefined,
      widthPx: undefined,
      colDataTypeOf: undefined
    };

    // scroller
    var th;   // virtual height
    var h;    // real scrollable height
    var ph;   // page height
    var n;    // number of pages
    var cj;   // "jumpiness" coefficient

    var page = 0;       // current page
    var offset = 0;     // current page offset
    var vScrollDir = 1;

    // private
    var initialized = false;
    var $container;
    var uid = "slickgrid_" + Math.round(1000000 * Math.random());
    var self = this;
    var $focusSink, $focusSink2;
    var $groupHeaders = $();
    var $headerScroller;
    var $headers;
    var $headerRow, $headerRowScroller, $headerRowSpacerL, $headerRowSpacerR;
    var $footerRow, $footerRowScroller, $footerRowSpacerL, $footerRowSpacerR;
    var $preHeaderPanel, $preHeaderPanelScroller, $preHeaderPanelSpacer;
    var $preHeaderPanelR, $preHeaderPanelScrollerR, $preHeaderPanelSpacerR;
    var $topPanelScroller;
    var $topPanel;
    var $viewport;
    var $canvas;
    var $style;
    var $boundAncestors;
    var treeColumns;
    var stylesheet, columnCssRulesL, columnCssRulesR;
    var viewportH, viewportW;
    var canvasWidth, canvasWidthL, canvasWidthR;
    var headersWidth, headersWidthL, headersWidthR;
    var viewportHasHScroll, viewportHasVScroll;
    var headerColumnWidthDiff = 0, headerColumnHeightDiff = 0, // border+padding
        cellWidthDiff = 0, cellHeightDiff = 0, jQueryNewWidthBehaviour = false;
    var absoluteColumnMinWidth;
    var hasFrozenRows = false;
    var frozenRowsHeight = 0;
    var actualFrozenRow = -1;
    var paneTopH = 0;
    var paneBottomH = 0;
    var viewportTopH = 0;
    var viewportBottomH = 0;
    var topPanelH = 0;
    var headerRowH = 0;
    var footerRowH = 0;

    var tabbingDirection = 1;
    var $activeCanvasNode;
    var $activeViewportNode;
    var activePosX;
    var activeRow, activeCell;
    var activeCellNode = null;
    var currentEditor = null;
    var serializedEditorValue;
    var editController;

    var rowsCache = {};
    var renderedRows = 0;
    var numVisibleRows = 0;
    var prevScrollTop = 0;
    var scrollTop = 0;
    var lastRenderedScrollTop = 0;
    var lastRenderedScrollLeft = 0;
    var prevScrollLeft = 0;
    var scrollLeft = 0;

    var selectionModel;
    var selectedRows = [];

    var plugins = [];
    var cellCssClasses = {};

    var columnsById = {};
    var sortColumns = [];
    var columnPosLeft = [];
    var columnPosRight = [];

    var pagingActive = false;
    var pagingIsLastPage = false;

    var scrollThrottle = ActionThrottle(render, 50);

    // async call handles
    var h_editorLoader = null;
    var h_render = null;
    var h_postrender = null;
    var h_postrenderCleanup = null;
    var postProcessedRows = {};
    var postProcessToRow = null;
    var postProcessFromRow = null;
    var postProcessedCleanupQueue = [];
    var postProcessgroupId = 0;

    // perf counters
    var counter_rows_rendered = 0;
    var counter_rows_removed = 0;

    var $paneHeaderL;
    var $paneHeaderR;
    var $paneTopL;
    var $paneTopR;
    var $paneBottomL;
    var $paneBottomR;

    var $headerScrollerL;
    var $headerScrollerR;

    var $headerL;
    var $headerR;

    var $groupHeadersL;
    var $groupHeadersR;

    var $headerRowScrollerL;
    var $headerRowScrollerR;

    var $footerRowScrollerL;
    var $footerRowScrollerR;

    var $headerRowL;
    var $headerRowR;

    var $footerRowL;
    var $footerRowR;

    var $topPanelScrollerL;
    var $topPanelScrollerR;

    var $topPanelL;
    var $topPanelR;

    var $viewportTopL;
    var $viewportTopR;
    var $viewportBottomL;
    var $viewportBottomR;

    var $canvasTopL;
    var $canvasTopR;
    var $canvasBottomL;
    var $canvasBottomR;

    var $viewportScrollContainerX;
    var $viewportScrollContainerY;
    var $headerScrollContainer;
    var $headerRowScrollContainer;
    var $footerRowScrollContainer;

    // store css attributes if display:none is active in container or parent
    var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
    var $hiddenParents;
    var oldProps = [];
    var columnResizeDragging = false;

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Initialization

    function init() {
      if (container instanceof jQuery) {
        $container = container;
      } else {
        $container = $(container);
      }
      if ($container.length < 1) {
        throw new Error("SlickGrid requires a valid container, " + container + " does not exist in the DOM.");
      }

      // calculate these only once and share between grid instances
      maxSupportedCssHeight = maxSupportedCssHeight || getMaxSupportedCssHeight();

      options = $.extend({}, defaults, options);
      validateAndEnforceOptions();
      columnDefaults.width = options.defaultColumnWidth;

      if (!options.suppressCssChangesOnHiddenInit) { cacheCssForHiddenInit(); }

      treeColumns = new Slick.TreeColumns(columns);
      columns = treeColumns.extractColumns();

      updateColumnProps();

      // validate loaded JavaScript modules against requested options
      if (options.enableColumnReorder && !$.fn.sortable) {
        throw new Error("SlickGrid's 'enableColumnReorder = true' option requires jquery-ui.sortable module to be loaded");
      }

      editController = {
        "commitCurrentEdit": commitCurrentEdit,
        "cancelCurrentEdit": cancelCurrentEdit
      };

      $container
          .empty()
          .css("overflow", "hidden")
          .css("outline", 0)
          .addClass(uid)
          .addClass("ui-widget");

      // set up a positioning container if needed
      if (!(/relative|absolute|fixed/).test($container.css("position"))) {
        $container.css("position", "relative");
      }

      $focusSink = $("<div tabIndex='0' hideFocus style='position:fixed;width:0;height:0;top:0;left:0;outline:0;'></div>").appendTo($container);

      // Containers used for scrolling frozen columns and rows
      $paneHeaderL = $("<div class='slick-pane slick-pane-header slick-pane-left' tabIndex='0' />").appendTo($container);
      $paneHeaderR = $("<div class='slick-pane slick-pane-header slick-pane-right' tabIndex='0' />").appendTo($container);
      $paneTopL = $("<div class='slick-pane slick-pane-top slick-pane-left' tabIndex='0' />").appendTo($container);
      $paneTopR = $("<div class='slick-pane slick-pane-top slick-pane-right' tabIndex='0' />").appendTo($container);
      $paneBottomL = $("<div class='slick-pane slick-pane-bottom slick-pane-left' tabIndex='0' />").appendTo($container);
      $paneBottomR = $("<div class='slick-pane slick-pane-bottom slick-pane-right' tabIndex='0' />").appendTo($container);

      if (options.createPreHeaderPanel) {
        $preHeaderPanelScroller = $("<div class='slick-preheader-panel ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($paneHeaderL);
        $preHeaderPanel = $("<div />").appendTo($preHeaderPanelScroller);
        $preHeaderPanelSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
            .appendTo($preHeaderPanelScroller);

        $preHeaderPanelScrollerR = $("<div class='slick-preheader-panel ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($paneHeaderR);
        $preHeaderPanelR = $("<div />").appendTo($preHeaderPanelScrollerR);
        $preHeaderPanelSpacerR = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
            .appendTo($preHeaderPanelScrollerR);

        if (!options.showPreHeaderPanel) {
          $preHeaderPanelScroller.hide();
          $preHeaderPanelScrollerR.hide();
        }
      }

      // Append the header scroller containers
      $headerScrollerL = $("<div class='slick-header ui-state-default slick-header-left' />").appendTo($paneHeaderL);
      $headerScrollerR = $("<div class='slick-header ui-state-default slick-header-right' />").appendTo($paneHeaderR);

      // Cache the header scroller containers
      $headerScroller = $().add($headerScrollerL).add($headerScrollerR);

      if (treeColumns.hasDepth()) {
        $groupHeadersL = [];
        $groupHeadersR = [];
        for (var index = 0; index < treeColumns.getDepth() - 1; index++) {
          $groupHeadersL[index] = $("<div class='slick-group-header-columns slick-group-header-columns-left' style='left:-1000px' />").appendTo($headerScrollerL);
          $groupHeadersR[index] = $("<div class='slick-group-header-columns slick-group-header-columns-right' style='left:-1000px' />").appendTo($headerScrollerR);
        }

        $groupHeaders = $().add($groupHeadersL).add($groupHeadersR);
      }

      // Append the columnn containers to the headers
      $headerL = $("<div class='slick-header-columns slick-header-columns-left' style='left:-1000px' />").appendTo($headerScrollerL);
      $headerR = $("<div class='slick-header-columns slick-header-columns-right' style='left:-1000px' />").appendTo($headerScrollerR);

      // Cache the header columns
      $headers = $().add($headerL).add($headerR);

      $headerRowScrollerL = $("<div class='slick-headerrow ui-state-default' />").appendTo($paneTopL);
      $headerRowScrollerR = $("<div class='slick-headerrow ui-state-default' />").appendTo($paneTopR);

      $headerRowScroller = $().add($headerRowScrollerL).add($headerRowScrollerR);

      $headerRowSpacerL = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
        .appendTo($headerRowScrollerL);
      $headerRowSpacerR = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
        .appendTo($headerRowScrollerR);


      $headerRowL = $("<div class='slick-headerrow-columns slick-headerrow-columns-left' />").appendTo($headerRowScrollerL);
      $headerRowR = $("<div class='slick-headerrow-columns slick-headerrow-columns-right' />").appendTo($headerRowScrollerR);

      $headerRow = $().add($headerRowL).add($headerRowR);

      // Append the top panel scroller
      $topPanelScrollerL = $("<div class='slick-top-panel-scroller ui-state-default' />").appendTo($paneTopL);
      $topPanelScrollerR = $("<div class='slick-top-panel-scroller ui-state-default' />").appendTo($paneTopR);

      $topPanelScroller = $().add($topPanelScrollerL).add($topPanelScrollerR);

      // Append the top panel
      $topPanelL = $("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScrollerL);
      $topPanelR = $("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScrollerR);

      $topPanel = $().add($topPanelL).add($topPanelR);

      if (!options.showColumnHeader) {
        $headerScroller.hide();
      }

      if (!options.showTopPanel) {
        $topPanelScroller.hide();
      }

      if (!options.showHeaderRow) {
        $headerRowScroller.hide();
      }

      // Append the viewport containers
      $viewportTopL = $("<div class='slick-viewport slick-viewport-top slick-viewport-left' tabIndex='0' hideFocus />").appendTo($paneTopL);
      $viewportTopR = $("<div class='slick-viewport slick-viewport-top slick-viewport-right' tabIndex='0' hideFocus />").appendTo($paneTopR);
      $viewportBottomL = $("<div class='slick-viewport slick-viewport-bottom slick-viewport-left' tabIndex='0' hideFocus />").appendTo($paneBottomL);
      $viewportBottomR = $("<div class='slick-viewport slick-viewport-bottom slick-viewport-right' tabIndex='0' hideFocus />").appendTo($paneBottomR);

      // Cache the viewports
      $viewport = $().add($viewportTopL).add($viewportTopR).add($viewportBottomL).add($viewportBottomR);


      // Default the active viewport to the top left
      $activeViewportNode = $viewportTopL;

      // Append the canvas containers
      $canvasTopL = $("<div class='grid-canvas grid-canvas-top grid-canvas-left' tabIndex='0' hideFocus />").appendTo($viewportTopL);
      $canvasTopR = $("<div class='grid-canvas grid-canvas-top grid-canvas-right' tabIndex='0' hideFocus />").appendTo($viewportTopR);
      $canvasBottomL = $("<div class='grid-canvas grid-canvas-bottom grid-canvas-left' tabIndex='0' hideFocus />").appendTo($viewportBottomL);
      $canvasBottomR = $("<div class='grid-canvas grid-canvas-bottom grid-canvas-right' tabIndex='0' hideFocus />").appendTo($viewportBottomR);
      if (options.viewportClass) $viewport.toggleClass(options.viewportClass, true);

      // Cache the canvases
      $canvas = $().add($canvasTopL).add($canvasTopR).add($canvasBottomL).add($canvasBottomR);

      scrollbarDimensions = scrollbarDimensions || measureScrollbar();

      // Default the active canvas to the top left
      $activeCanvasNode = $canvasTopL;

      // pre-header
      if ($preHeaderPanelSpacer) $preHeaderPanelSpacer.css("width", getCanvasWidth() + scrollbarDimensions.width + "px");
      $headers.width(getHeadersWidth());
      $headerRowSpacerL.css("width", getCanvasWidth() + scrollbarDimensions.width + "px");
      $headerRowSpacerR.css("width", getCanvasWidth() + scrollbarDimensions.width + "px");

      // footer Row
      if (options.createFooterRow) {
        $footerRowScrollerR = $("<div class='slick-footerrow ui-state-default' />").appendTo($paneTopR);
        $footerRowScrollerL = $("<div class='slick-footerrow ui-state-default' />").appendTo($paneTopL);

        $footerRowScroller = $().add($footerRowScrollerL).add($footerRowScrollerR);

        $footerRowSpacerL = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
          .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
          .appendTo($footerRowScrollerL);
        $footerRowSpacerR = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
          .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
          .appendTo($footerRowScrollerR);


        $footerRowL = $("<div class='slick-footerrow-columns slick-footerrow-columns-left' />").appendTo($footerRowScrollerL);
        $footerRowR = $("<div class='slick-footerrow-columns slick-footerrow-columns-right' />").appendTo($footerRowScrollerR);

        $footerRow = $().add($footerRowL).add($footerRowR);

        if (!options.showFooterRow) {
          $footerRowScroller.hide();
        }
      }

      $focusSink2 = $focusSink.clone().appendTo($container);

      if (!options.explicitInitialization) {
        finishInitialization();
      }
    }

    function finishInitialization() {
      if (!initialized) {
        initialized = true;

        getViewportWidth();
        getViewportHeight();

        // header columns and cells may have different padding/border skewing width calculations (box-sizing, hello?)
        // calculate the diff so we can set consistent sizes
        measureCellPaddingAndBorder();

        // for usability reasons, all text selection in SlickGrid is disabled
        // with the exception of input and textarea elements (selection must
        // be enabled there so that editors work as expected); note that
        // selection in grid cells (grid body) is already unavailable in
        // all browsers except IE
        disableSelection($headers); // disable all text selection in header (including input and textarea)

        if (!options.enableTextSelectionOnCells) {
          // disable text selection in grid cells except in input and textarea elements
          // (this is IE-specific, because selectstart event will only fire in IE)
          $viewport.on("selectstart.ui", function (event) {
            return $(event.target).is("input,textarea");
          });
        }

        setFrozenOptions();
        setPaneVisibility();
        setScroller();
        setOverflow();

        updateColumnCaches();
        createColumnHeaders();
        createColumnGroupHeaders();
        createColumnFooter();
        setupColumnSort();
        createCssRules();
        resizeCanvas();
        bindAncestorScrollEvents();

        $container
            .on("resize.slickgrid", resizeCanvas);
        $viewport
            .on("scroll", handleScroll);

        if (jQuery.fn.mousewheel && options.enableMouseWheelScrollHandler) {
          $viewport.on("mousewheel", handleMouseWheel);
        }

        $headerScroller
            //.on("scroll", handleHeaderScroll)
            .on("contextmenu", handleHeaderContextMenu)
            .on("click", handleHeaderClick)
            .on("mouseenter", ".slick-header-column", handleHeaderMouseEnter)
            .on("mouseleave", ".slick-header-column", handleHeaderMouseLeave);
        $headerRowScroller
            .on("scroll", handleHeaderRowScroll);

        if (options.showHeaderRow) {
          $headerRow
            .on("mouseenter", ".slick-headerrow-column", handleHeaderRowMouseEnter)
            .on("mouseleave", ".slick-headerrow-column", handleHeaderRowMouseLeave);
        }

        if (options.createFooterRow) {
          $footerRow
            .on("contextmenu", handleFooterContextMenu)
            .on("click", handleFooterClick);

          $footerRowScroller
              .on("scroll", handleFooterRowScroll);
        }

        if (options.createPreHeaderPanel) {
          $preHeaderPanelScroller
              .on("scroll", handlePreHeaderPanelScroll);
        }

        $focusSink.add($focusSink2)
            .on("keydown", handleKeyDown);
        $canvas
            .on("keydown", handleKeyDown)
            .on("click", handleClick)
            .on("dblclick", handleDblClick)
            .on("contextmenu", handleContextMenu)
            .on("draginit", handleDragInit)
            .on("dragstart", {distance: 3}, handleDragStart)
            .on("drag", handleDrag)
            .on("dragend", handleDragEnd)
            .on("mouseenter", ".slick-cell", handleMouseEnter)
            .on("mouseleave", ".slick-cell", handleMouseLeave);

        if (!options.suppressCssChangesOnHiddenInit) { restoreCssFromHiddenInit(); }
      }
    }

    function cacheCssForHiddenInit() {
      // handle display:none on container or container parents
      $hiddenParents = $container.parents().addBack().not(':visible');
      $hiddenParents.each(function() {
        var old = {};
        for ( var name in cssShow ) {
          old[ name ] = this.style[ name ];
          this.style[ name ] = cssShow[ name ];
        }
        oldProps.push(old);
      });
    }

    function restoreCssFromHiddenInit() {
      // finish handle display:none on container or container parents
      // - put values back the way they were
      $hiddenParents.each(function(i) {
        var old = oldProps[i];
        for ( var name in cssShow ) {
          this.style[ name ] = old[ name ];
        }
      });
    }

    function hasFrozenColumns() {
      return options.frozenColumn > -1;
    }

    function registerPlugin(plugin) {
      plugins.unshift(plugin);
      plugin.init(self);
    }

    function unregisterPlugin(plugin) {
      for (var i = plugins.length; i >= 0; i--) {
        if (plugins[i] === plugin) {
          if (plugins[i].destroy) {
            plugins[i].destroy();
          }
          plugins.splice(i, 1);
          break;
        }
      }
    }

    function getPluginByName(name) {
      for (var i = plugins.length-1; i >= 0; i--) {
        if (plugins[i].pluginName === name) {
          return plugins[i];
        }
      }
      return undefined;
    }

    function setSelectionModel(model) {
      if (selectionModel) {
        selectionModel.onSelectedRangesChanged.unsubscribe(handleSelectedRangesChanged);
        if (selectionModel.destroy) {
          selectionModel.destroy();
        }
      }

      selectionModel = model;
      if (selectionModel) {
        selectionModel.init(self);
        selectionModel.onSelectedRangesChanged.subscribe(handleSelectedRangesChanged);
      }
    }

    function getSelectionModel() {
      return selectionModel;
    }

    function getCanvasNode(columnIdOrIdx, rowIndex) {
      return _getContainerElement(getCanvases(), columnIdOrIdx, rowIndex);
    }

    function getActiveCanvasNode(element) {
      setActiveCanvasNode(element);

      return $activeCanvasNode[0];
    }

    function getCanvases() {
      return $canvas;
    }

    function setActiveCanvasNode(element) {
      if (element) {
        $activeCanvasNode = $(element.target).closest('.grid-canvas');
      }
    }

    function getViewportNode(columnIdOrIdx, rowIndex) {
      return _getContainerElement(getViewports(), columnIdOrIdx, rowIndex);
    }

    function getViewports() {
      return $viewport;
    }

    function getActiveViewportNode(element) {
      setActiveViewportNode(element);

      return $activeViewportNode[0];
    }

    function setActiveViewportNode(element) {
      if (element) {
        $activeViewportNode = $(element.target).closest('.slick-viewport');
      }
    }

    function _getContainerElement($targetContainers, columnIdOrIdx, rowIndex) {
      if (!$targetContainers) { return }
      if (!columnIdOrIdx) { columnIdOrIdx = 0; }
      if (!rowIndex) { rowIndex = 0; }

      var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));

      var isBottomSide = hasFrozenRows && rowIndex >= actualFrozenRow + (options.frozenBottom ? 0 : 1);
      var isRightSide = hasFrozenColumns() && idx > options.frozenColumn;

      return $targetContainers[(isBottomSide ? 2 : 0) + (isRightSide ? 1 : 0)];
    }

    function measureScrollbar() {
      var $outerdiv = $('<div class="' + $viewport.className + '" style="position:absolute; top:-10000px; left:-10000px; overflow:auto; width:100px; height:100px;"></div>').appendTo('body');
      var $innerdiv = $('<div style="width:200px; height:200px; overflow:auto;"></div>').appendTo($outerdiv);
      var dim = {
        width: $outerdiv[0].offsetWidth - $outerdiv[0].clientWidth,
        height: $outerdiv[0].offsetHeight - $outerdiv[0].clientHeight
      };
      $innerdiv.remove();
      $outerdiv.remove();
      return dim;
    }

    function getHeadersWidth() {
      headersWidth = headersWidthL = headersWidthR = 0;
      var includeScrollbar = !options.autoHeight;

      for (var i = 0, ii = columns.length; i < ii; i++) {
        var width = columns[ i ].width;

        if (( options.frozenColumn ) > -1 && ( i > options.frozenColumn )) {
          headersWidthR += width;
        } else {
          headersWidthL += width;
        }
      }

      if (includeScrollbar) {
        if (( options.frozenColumn ) > -1 && ( i > options.frozenColumn )) {
          headersWidthR += scrollbarDimensions.width;
        } else {
          headersWidthL += scrollbarDimensions.width;
        }
      }

      if (hasFrozenColumns()) {
        headersWidthL = headersWidthL + 1000;

        headersWidthR = Math.max(headersWidthR, viewportW) + headersWidthL;
        headersWidthR += scrollbarDimensions.width;
      } else {
        headersWidthL += scrollbarDimensions.width;
        headersWidthL = Math.max(headersWidthL, viewportW) + 1000;
      }

      headersWidth = headersWidthL + headersWidthR;
      return Math.max(headersWidth, viewportW) + 1000;
    }

    function getHeadersWidthL() {
      headersWidthL =0;

      columns.forEach(function(column, i) {
        if (!(( options.frozenColumn ) > -1 && ( i > options.frozenColumn )))
          headersWidthL += column.width;
      });

      if (hasFrozenColumns()) {
        headersWidthL += 1000;
      } else {
        headersWidthL += scrollbarDimensions.width;
        headersWidthL = Math.max(headersWidthL, viewportW) + 1000;
      }

      return headersWidthL;
    }

    function getHeadersWidthR() {
      headersWidthR =0;

      columns.forEach(function(column, i) {
        if (( options.frozenColumn ) > -1 && ( i > options.frozenColumn ))
          headersWidthR += column.width;
      });

      if (hasFrozenColumns()) {
        headersWidthR = Math.max(headersWidthR, viewportW) + getHeadersWidthL();
        headersWidthR += scrollbarDimensions.width;
      }

      return headersWidthR;
    }

    function getCanvasWidth() {
      var availableWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
      var i = columns.length;

      canvasWidthL = canvasWidthR = 0;

      while (i--) {
        if (hasFrozenColumns() && (i > options.frozenColumn)) {
          canvasWidthR += columns[i].width;
        } else {
          canvasWidthL += columns[i].width;
        }
      }
      var totalRowWidth = canvasWidthL + canvasWidthR;
      return options.fullWidthRows ? Math.max(totalRowWidth, availableWidth) : totalRowWidth;
    }

    function updateCanvasWidth(forceColumnWidthsUpdate) {
      var oldCanvasWidth = canvasWidth;
      var oldCanvasWidthL = canvasWidthL;
      var oldCanvasWidthR = canvasWidthR;
      var widthChanged;
      canvasWidth = getCanvasWidth();

      widthChanged = canvasWidth !== oldCanvasWidth || canvasWidthL !== oldCanvasWidthL || canvasWidthR !== oldCanvasWidthR;

      if (widthChanged || hasFrozenColumns() || hasFrozenRows) {
        $canvasTopL.width(canvasWidthL);

        getHeadersWidth();

        $headerL.width(headersWidthL);
        $headerR.width(headersWidthR);

        if (hasFrozenColumns()) {
          $canvasTopR.width(canvasWidthR);

          $paneHeaderL.width(canvasWidthL);
          $paneHeaderR.css('left', canvasWidthL);
          $paneHeaderR.css('width', viewportW - canvasWidthL);

          $paneTopL.width(canvasWidthL);
          $paneTopR.css('left', canvasWidthL);
          $paneTopR.css('width', viewportW - canvasWidthL);

          $headerRowScrollerL.width(canvasWidthL);
          $headerRowScrollerR.width(viewportW - canvasWidthL);

          $headerRowL.width(canvasWidthL);
          $headerRowR.width(canvasWidthR);

          if (options.createFooterRow) {
            $footerRowScrollerL.width(canvasWidthL);
            $footerRowScrollerR.width(viewportW - canvasWidthL);

            $footerRowL.width(canvasWidthL);
            $footerRowR.width(canvasWidthR);
          }
          if (options.createPreHeaderPanel) {
            $preHeaderPanel.width(canvasWidth);
          }
          $viewportTopL.width(canvasWidthL);
          $viewportTopR.width(viewportW - canvasWidthL);

          if (hasFrozenRows) {
            $paneBottomL.width(canvasWidthL);
            $paneBottomR.css('left', canvasWidthL);

            $viewportBottomL.width(canvasWidthL);
            $viewportBottomR.width(viewportW - canvasWidthL);

            $canvasBottomL.width(canvasWidthL);
            $canvasBottomR.width(canvasWidthR);
          }
        } else {
          $paneHeaderL.width('100%');
          $paneTopL.width('100%');
          $headerRowScrollerL.width('100%');
          $headerRowL.width(canvasWidth);

          if (options.createFooterRow) {
            $footerRowScrollerL.width('100%');
            $footerRowL.width(canvasWidth);
          }

          if (options.createPreHeaderPanel) {
            $preHeaderPanel.width('100%');
            $preHeaderPanel.width(canvasWidth);
          }
          $viewportTopL.width('100%');

          if (hasFrozenRows) {
            $viewportBottomL.width('100%');
            $canvasBottomL.width(canvasWidthL);
          }
        }

        viewportHasHScroll = (canvasWidth >= viewportW - scrollbarDimensions.width);
      }

      $headerRowSpacerL.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
      $headerRowSpacerR.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));

      if (options.createFooterRow) {
        $footerRowSpacerL.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
        $footerRowSpacerR.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
      }

      if (widthChanged || forceColumnWidthsUpdate) {
        applyColumnWidths();
      }
    }

    function disableSelection($target) {
      if ($target && $target.jquery) {
        $target
            .attr("unselectable", "on")
            .css("MozUserSelect", "none")
            .on("selectstart.ui", function () {
              return false;
            }); // from jquery:ui.core.js 1.7.2
      }
    }

    function getMaxSupportedCssHeight() {
      var supportedHeight = 1000000;
      // FF reports the height back but still renders blank after ~6M px
      var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 6000000 : 1000000000;
      var div = $("<div style='display:none' />").appendTo(document.body);

      while (true) {
        var test = supportedHeight * 2;
        div.css("height", test);
        if (test > testUpTo || div.height() !== test) {
          break;
        } else {
          supportedHeight = test;
        }
      }

      div.remove();
      return supportedHeight;
    }

    function getUID() {
      return uid;
    }

    function getHeaderColumnWidthDiff() {
      return headerColumnWidthDiff;
    }

    function getScrollbarDimensions() {
      return scrollbarDimensions;
    }

    function getDisplayedScrollbarDimensions() {
      return {
        width: viewportHasVScroll ? scrollbarDimensions.width : 0,
        height: viewportHasHScroll ? scrollbarDimensions.height : 0
      };
    }

    function getAbsoluteColumnMinWidth() {
      return absoluteColumnMinWidth;
    }

    // TODO:  this is static.  need to handle page mutation.
    function bindAncestorScrollEvents() {
      var elem = (hasFrozenRows && !options.frozenBottom) ? $canvasBottomL[0] : $canvasTopL[0];
      while ((elem = elem.parentNode) != document.body && elem != null) {
        // bind to scroll containers only
        if (elem == $viewportTopL[0] || elem.scrollWidth != elem.clientWidth || elem.scrollHeight != elem.clientHeight) {
          var $elem = $(elem);
          if (!$boundAncestors) {
            $boundAncestors = $elem;
          } else {
            $boundAncestors = $boundAncestors.add($elem);
          }
          $elem.on("scroll." + uid, handleActiveCellPositionChange);
        }
      }
    }

    function unbindAncestorScrollEvents() {
      if (!$boundAncestors) {
        return;
      }
      $boundAncestors.off("scroll." + uid);
      $boundAncestors = null;
    }

    function updateColumnHeader(columnId, title, toolTip) {
      if (!initialized) { return; }
      var idx = getColumnIndex(columnId);
      if (idx == null) {
        return;
      }

      var columnDef = columns[idx];
      var $header = $headers.children().eq(idx);
      if ($header) {
        if (title !== undefined) {
          columns[idx].name = title;
        }
        if (toolTip !== undefined) {
          columns[idx].toolTip = toolTip;
        }

        trigger(self.onBeforeHeaderCellDestroy, {
          "node": $header[0],
          "column": columnDef,
          "grid": self
        });

        $header
            .attr("title", toolTip || "")
            .children().eq(0).html(title);

        trigger(self.onHeaderCellRendered, {
          "node": $header[0],
          "column": columnDef,
          "grid": self
        });
      }
    }

    function getHeader(columnDef) {
      if (!columnDef) {
        return hasFrozenColumns() ? $headers : $headerL;
      }
      var idx = getColumnIndex(columnDef.id);
      return hasFrozenColumns() ? ((idx <= options.frozenColumn) ? $headerL : $headerR) : $headerL;
    }

    function getHeaderColumn(columnIdOrIdx) {
      var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));
      var targetHeader = hasFrozenColumns() ? ((idx <= options.frozenColumn) ? $headerL : $headerR) : $headerL;
      var targetIndex = hasFrozenColumns() ? ((idx <= options.frozenColumn) ? idx : idx - options.frozenColumn - 1) : idx;
      var $rtn = targetHeader.children().eq(targetIndex);
      return $rtn && $rtn[0];
    }

    function getHeaderRow() {
      return hasFrozenColumns() ? $headerRow : $headerRow[0];
    }

    function getFooterRow() {
      return hasFrozenColumns() ? $footerRow : $footerRow[0];
    }

    function getPreHeaderPanel() {
      return $preHeaderPanel[0];
    }

    function getPreHeaderPanelRight() {
      return $preHeaderPanelR[0];
    }

    function getHeaderRowColumn(columnIdOrIdx) {
      var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));

      var $headerRowTarget;

      if (hasFrozenColumns()) {
        if (idx <= options.frozenColumn) {
          $headerRowTarget = $headerRowL;
        } else {
          $headerRowTarget = $headerRowR;
          idx -= options.frozenColumn + 1;
        }
      } else {
        $headerRowTarget = $headerRowL;
      }

      var $header = $headerRowTarget.children().eq(idx);
      return $header && $header[0];
    }

    function getFooterRowColumn(columnIdOrIdx) {
      var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));

      var $footerRowTarget;

      if (hasFrozenColumns()) {
        if (idx <= options.frozenColumn) {
          $footerRowTarget = $footerRowL;
        } else {
          $footerRowTarget = $footerRowR;

          idx -= options.frozenColumn + 1;
        }
      } else {
        $footerRowTarget = $footerRowL;
      }

      var $footer = $footerRowTarget && $footerRowTarget.children().eq(idx);
      return $footer && $footer[0];
    }

    function createColumnFooter() {
      if (options.createFooterRow) {
        $footerRow.find(".slick-footerrow-column")
          .each(function () {
            var columnDef = $(this).data("column");
            if (columnDef) {
              trigger(self.onBeforeFooterRowCellDestroy, {
                "node": this,
                "column": columnDef,
                "grid": self
              });
            }
          });

        $footerRowL.empty();
        $footerRowR.empty();

        for (var i = 0; i < columns.length; i++) {
          var m = columns[i];

          var footerRowCell = $("<div class='ui-state-default slick-footerrow-column l" + i + " r" + i + "'></div>")
            .data("column", m)
            .addClass(hasFrozenColumns() && i <= options.frozenColumn? 'frozen': '')
            .appendTo(hasFrozenColumns() && (i > options.frozenColumn)? $footerRowR: $footerRowL);

          trigger(self.onFooterRowCellRendered, {
            "node": footerRowCell[0],
            "column": m,
            "grid": self
          });
        }
      }
    }

    function createColumnGroupHeaders() {
      var columnsLength = 0;
      var frozenColumnsValid = false;

      if (!treeColumns.hasDepth())
        return;

      for (var index = 0; index < $groupHeadersL.length; index++) {

        $groupHeadersL[index].empty();
        $groupHeadersR[index].empty();

        var groupColumns = treeColumns.getColumnsInDepth(index);

        for (var indexGroup in groupColumns) {
          var m = groupColumns[indexGroup];

          columnsLength += m.extractColumns().length;

          if (hasFrozenColumns() && index === 0 && (columnsLength-1) === options.frozenColumn)
            frozenColumnsValid = true;

          $("<div class='ui-state-default slick-group-header-column' />")
            .html("<span class='slick-column-name'>" + m.name + "</span>")
            .attr("id", "" + uid + m.id)
            .attr("title", m.toolTip || "")
            .data("column", m)
            .addClass(m.headerCssClass || "")
            .addClass(hasFrozenColumns() && (columnsLength - 1) > options.frozenColumn? 'frozen': '')
            .appendTo(hasFrozenColumns() && (columnsLength - 1) > options.frozenColumn? $groupHeadersR[index]: $groupHeadersL[index]);
        }

        if (hasFrozenColumns() && index === 0 && !frozenColumnsValid) {
          $groupHeadersL[index].empty();
          $groupHeadersR[index].empty();
          alert("All columns of group should to be grouped!");
          break;
        }
      }

      applyColumnGroupHeaderWidths();
    }

    function createColumnHeaders() {
      function onMouseEnter() {
        $(this).addClass("ui-state-hover");
      }

      function onMouseLeave() {
        $(this).removeClass("ui-state-hover");
      }

      $headers.find(".slick-header-column")
        .each(function() {
          var columnDef = $(this).data("column");
          if (columnDef) {
            trigger(self.onBeforeHeaderCellDestroy, {
              "node": this,
              "column": columnDef,
              "grid": self
            });
          }
        });

      $headerL.empty();
      $headerR.empty();

      getHeadersWidth();

      $headerL.width(headersWidthL);
      $headerR.width(headersWidthR);

      $headerRow.find(".slick-headerrow-column")
        .each(function() {
          var columnDef = $(this).data("column");
          if (columnDef) {
            trigger(self.onBeforeHeaderRowCellDestroy, {
              "node": this,
              "column": columnDef,
              "grid": self
            });
          }
        });

      $headerRowL.empty();
      $headerRowR.empty();

      if (options.createFooterRow) {
        $footerRowL.find(".slick-footerrow-column")
          .each(function() {
            var columnDef = $(this).data("column");
            if (columnDef) {
              trigger(self.onBeforeFooterRowCellDestroy, {
                "node": this,
                "column": columnDef,
                "grid": self
              });
            }
          });
        $footerRowL.empty();

        if (hasFrozenColumns()) {
          $footerRowR.find(".slick-footerrow-column")
            .each(function() {
              var columnDef = $(this).data("column");
              if (columnDef) {
                trigger(self.onBeforeFooterRowCellDestroy, {
                  "node": this,
                  "column": columnDef,
                  "grid": self
                });
              }
            });
          $footerRowR.empty();
        }
      }

      for (var i = 0; i < columns.length; i++) {
        var m = columns[i];

        var $headerTarget = hasFrozenColumns() ? ((i <= options.frozenColumn) ? $headerL : $headerR) : $headerL;
        var $headerRowTarget = hasFrozenColumns() ? ((i <= options.frozenColumn) ? $headerRowL : $headerRowR) : $headerRowL;

        var header = $("<div class='ui-state-default slick-header-column' />")
            .html("<span class='slick-column-name'>" + m.name + "</span>")
            .width(m.width - headerColumnWidthDiff)
            .attr("id", "" + uid + m.id)
            .attr("title", m.toolTip || "")
            .data("column", m)
            .addClass(m.headerCssClass || "")
            .addClass(hasFrozenColumns() && i <= options.frozenColumn? 'frozen': '')
            .appendTo($headerTarget);

        if (options.enableColumnReorder || m.sortable) {
          header
            .on('mouseenter', onMouseEnter)
            .on('mouseleave', onMouseLeave);
        }

        if(m.hasOwnProperty('headerCellAttrs') && m.headerCellAttrs instanceof Object) {
          for (var key in m.headerCellAttrs) {
            if (m.headerCellAttrs.hasOwnProperty(key)) {
              header.attr(key, m.headerCellAttrs[key]);
            }
          }
        }

        if (m.sortable) {
          header.addClass("slick-header-sortable");
          header.append("<span class='slick-sort-indicator"
            + (options.numberedMultiColumnSort && !options.sortColNumberInSeparateSpan ? " slick-sort-indicator-numbered" : "" ) + "' />");
          if (options.numberedMultiColumnSort && options.sortColNumberInSeparateSpan) { header.append("<span class='slick-sort-indicator-numbered' />"); }
        }

        trigger(self.onHeaderCellRendered, {
          "node": header[0],
          "column": m,
          "grid": self
        });

        if (options.showHeaderRow) {
          var headerRowCell = $("<div class='ui-state-default slick-headerrow-column l" + i + " r" + i + "'></div>")
              .data("column", m)
              .addClass(hasFrozenColumns() && i <= options.frozenColumn? 'frozen': '')
              .appendTo($headerRowTarget);

          trigger(self.onHeaderRowCellRendered, {
            "node": headerRowCell[0],
            "column": m,
            "grid": self
          });
        }
        if (options.createFooterRow && options.showFooterRow) {
          var footerRowCell = $("<div class='ui-state-default slick-footerrow-column l" + i   + " r" + i + "'></div>")
              .data("column", m)
              .appendTo($footerRow);

          trigger(self.onFooterRowCellRendered, {
            "node": footerRowCell[0],
            "column": m,
            "grid": self
          });
        }
      }

      setSortColumns(sortColumns);
      setupColumnResize();
      if (options.enableColumnReorder) {
        if (typeof options.enableColumnReorder == 'function') {
            options.enableColumnReorder(self, $headers, headerColumnWidthDiff, setColumns, setupColumnResize, columns, getColumnIndex, uid, trigger);
        } else {
            setupColumnReorder();
        }
      }
    }

    function setupColumnSort() {
      $headers.click(function (e) {
        if (columnResizeDragging) return;
        // temporary workaround for a bug in jQuery 1.7.1 (http://bugs.jquery.com/ticket/11328)
        e.metaKey = e.metaKey || e.ctrlKey;

        if ($(e.target).hasClass("slick-resizable-handle")) {
          return;
        }

        var $col = $(e.target).closest(".slick-header-column");
        if (!$col.length) {
          return;
        }

        var column = $col.data("column");
        if (column.sortable) {
          if (!getEditorLock().commitCurrentEdit()) {
            return;
          }

          var previousSortColumns = $.extend(true, [], sortColumns);
          var sortColumn = null;
          var i = 0;
          for (; i < sortColumns.length; i++) {
            if (sortColumns[i].columnId == column.id) {
              sortColumn = sortColumns[i];
              sortColumn.sortAsc = !sortColumn.sortAsc;
              break;
            }
          }
          var hadSortCol = !!sortColumn;

          if (options.tristateMultiColumnSort) {
              if (!sortColumn) {
                sortColumn = { columnId: column.id, sortAsc: column.defaultSortAsc };
              }
              if (hadSortCol && sortColumn.sortAsc) {
                // three state: remove sort rather than go back to ASC
                sortColumns.splice(i, 1);
                sortColumn = null;
              }
              if (!options.multiColumnSort) { sortColumns = []; }
              if (sortColumn && (!hadSortCol || !options.multiColumnSort)) {
                sortColumns.push(sortColumn);
              }
          } else {
              // legacy behaviour
              if (e.metaKey && options.multiColumnSort) {
                if (sortColumn) {
                  sortColumns.splice(i, 1);
                }
              }
              else {
                if ((!e.shiftKey && !e.metaKey) || !options.multiColumnSort) {
                  sortColumns = [];
                }

                if (!sortColumn) {
                  sortColumn = { columnId: column.id, sortAsc: column.defaultSortAsc };
                  sortColumns.push(sortColumn);
                } else if (sortColumns.length === 0) {
                  sortColumns.push(sortColumn);
                }
              }
          }

          var onSortArgs;
          if (!options.multiColumnSort) {
            onSortArgs = {
              multiColumnSort: false,
              previousSortColumns: previousSortColumns,
              columnId: (sortColumns.length > 0 ? column.id : null),
              sortCol: (sortColumns.length > 0 ? column : null),
              sortAsc: (sortColumns.length > 0 ? sortColumns[0].sortAsc : true)
            };
          } else {
            onSortArgs = {
              multiColumnSort: true,
              previousSortColumns: previousSortColumns,
              sortCols: $.map(sortColumns, function(col) {
                return {columnId: columns[getColumnIndex(col.columnId)].id, sortCol: columns[getColumnIndex(col.columnId)], sortAsc: col.sortAsc };
              })
            };
          }

          if (trigger(self.onBeforeSort, onSortArgs, e) !== false) {
            setSortColumns(sortColumns);
            trigger(self.onSort, onSortArgs, e);
          }
        }
      });
    }

    function currentPositionInHeader(id) {
      var currentPosition = 0;
      $headers.find('.slick-header-column').each(function (i) {
        if (this.id == id) {
          currentPosition = i;
          return false;
        }
      });

      return currentPosition;
    }

    function limitPositionInGroup(idColumn) {
      var groupColumnOfPreviousPosition,
        startLimit = 0,
        endLimit = 0;

      treeColumns
        .getColumnsInDepth($groupHeadersL.length - 1)
        .some(function (groupColumn) {
          startLimit = endLimit;
          endLimit += groupColumn.columns.length;

          groupColumn.columns.some(function (column) {

            if (column.id === idColumn)
              groupColumnOfPreviousPosition = groupColumn;

            return groupColumnOfPreviousPosition;
          });

          return groupColumnOfPreviousPosition;
        });

      endLimit--;

      return {
        start: startLimit,
        end: endLimit,
        group: groupColumnOfPreviousPosition
      };
    }

    function remove(arr, elem) {
      var index = arr.lastIndexOf(elem);
      if(index > -1) {
        arr.splice(index, 1);
        remove(arr, elem);
      }
    }

    function columnPositionValidInGroup($item) {
      var currentPosition = currentPositionInHeader($item[0].id);
      var limit = limitPositionInGroup($item.data('column').id);
      var positionValid = limit.start <= currentPosition && currentPosition <= limit.end;

      return {
    	limit: limit,
        valid: positionValid,
        message: positionValid? '': 'Column "'.concat($item.text(), '" can be reordered only within the "', limit.group.name, '" group!')
      };
    }

    function setupColumnReorder() {
      $headers.filter(":ui-sortable").sortable("destroy");
      var columnScrollTimer = null;

      function scrollColumnsRight() {
        $viewportScrollContainerX[0].scrollLeft = $viewportScrollContainerX[0].scrollLeft + 10;
      }

      function scrollColumnsLeft() {
        $viewportScrollContainerX[0].scrollLeft = $viewportScrollContainerX[0].scrollLeft - 10;
      }

      var canDragScroll;
      $headers.sortable({
        containment: "parent",
        distance: 3,
        axis: "x",
        cursor: "default",
        tolerance: "intersection",
        helper: "clone",
        placeholder: "slick-sortable-placeholder ui-state-default slick-header-column",
        start: function (e, ui) {
          ui.placeholder.width(ui.helper.outerWidth() - headerColumnWidthDiff);
          canDragScroll = !hasFrozenColumns() ||
            (ui.placeholder.offset().left + ui.placeholder.width()) > $viewportScrollContainerX.offset().left;
	      $(ui.helper).addClass("slick-header-column-active");
        },
        beforeStop: function (e, ui) {
          $(ui.helper).removeClass("slick-header-column-active");
        },
        sort: function (e, ui) {
          if (canDragScroll && e.originalEvent.pageX > $container[0].clientWidth) {
            if (!(columnScrollTimer)) {
              columnScrollTimer = setInterval(
                scrollColumnsRight, 100);
            }
          } else if (canDragScroll && e.originalEvent.pageX < $viewportScrollContainerX.offset().left) {
            if (!(columnScrollTimer)) {
              columnScrollTimer = setInterval(
                scrollColumnsLeft, 100);
            }
          } else {
            clearInterval(columnScrollTimer);
            columnScrollTimer = null;
          }
        },
        stop: function (e, ui) {
          var cancel = false;
          clearInterval(columnScrollTimer);
          columnScrollTimer = null;
          var limit = null;

          if (treeColumns.hasDepth()) {
            var validPositionInGroup = columnPositionValidInGroup(ui.item);
            limit = validPositionInGroup.limit;

            cancel = !validPositionInGroup.valid;

            if (cancel)
              alert(validPositionInGroup.message);
          }

          if (cancel || !getEditorLock().commitCurrentEdit()) {
            $(this).sortable("cancel");
            return;
          }

          var reorderedIds = $headerL.sortable("toArray");
          reorderedIds = reorderedIds.concat($headerR.sortable("toArray"));

          var reorderedColumns = [];
          for (var i = 0; i < reorderedIds.length; i++) {
            reorderedColumns.push(columns[getColumnIndex(reorderedIds[i].replace(uid, ""))]);
          }
          setColumns(reorderedColumns);

          trigger(self.onColumnsReordered, { impactedColumns : getImpactedColumns( limit ) });
          e.stopPropagation();
          setupColumnResize();
        }
      });
    }

    function getImpactedColumns( limit ) {
    	var impactedColumns = [];

    	if( limit ) {

	   		for( var i = limit.start; i <= limit.end; i++ ) {
	   			impactedColumns.push( columns[i] );
	   		}
    	}
    	else {

    		impactedColumns = columns;
    	}

   		return impactedColumns;
    }

    function setupColumnResize() {
      var $col, j, k, c, pageX, columnElements, minPageX, maxPageX, firstResizable, lastResizable;
      var frozenLeftColMaxWidth = 0;
      columnElements = $headers.children();
      columnElements.find(".slick-resizable-handle").remove();
      columnElements.each(function (i, e) {
        if (i >= columns.length) { return; }
        if (columns[i].resizable) {
          if (firstResizable === undefined) {
            firstResizable = i;
          }
          lastResizable = i;
        }
      });
      if (firstResizable === undefined) {
        return;
      }
      columnElements.each(function (i, e) {
        if (i >= columns.length) { return; }
        if (i < firstResizable || (options.forceFitColumns && i >= lastResizable)) {
          return;
        }
        $col = $(e);
        $("<div class='slick-resizable-handle' />")
            .appendTo(e)
            .on("dragstart", function (e, dd) {
              if (!getEditorLock().commitCurrentEdit()) {
                return false;
              }
              pageX = e.pageX;
              frozenLeftColMaxWidth = 0;
              $(this).parent().addClass("slick-header-column-active");
              var shrinkLeewayOnRight = null, stretchLeewayOnRight = null;
              // lock each column's width option to current width
              columnElements.each(function (i, e) {
                if (i >= columns.length) { return; }
                columns[i].previousWidth = $(e).outerWidth();
              });
              if (options.forceFitColumns) {
                shrinkLeewayOnRight = 0;
                stretchLeewayOnRight = 0;
                // colums on right affect maxPageX/minPageX
                for (j = i + 1; j < columns.length; j++) {
                  c = columns[j];
                  if (c.resizable) {
                    if (stretchLeewayOnRight !== null) {
                      if (c.maxWidth) {
                        stretchLeewayOnRight += c.maxWidth - c.previousWidth;
                      } else {
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
                c = columns[j];
                if (c.resizable) {
                  if (stretchLeewayOnLeft !== null) {
                    if (c.maxWidth) {
                      stretchLeewayOnLeft += c.maxWidth - c.previousWidth;
                    } else {
                      stretchLeewayOnLeft = null;
                    }
                  }
                  shrinkLeewayOnLeft += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                }
              }
              if (shrinkLeewayOnRight === null) {
                shrinkLeewayOnRight = 100000;
              }
              if (shrinkLeewayOnLeft === null) {
                shrinkLeewayOnLeft = 100000;
              }
              if (stretchLeewayOnRight === null) {
                stretchLeewayOnRight = 100000;
              }
              if (stretchLeewayOnLeft === null) {
                stretchLeewayOnLeft = 100000;
              }
              maxPageX = pageX + Math.min(shrinkLeewayOnRight, stretchLeewayOnLeft);
              minPageX = pageX - Math.min(shrinkLeewayOnLeft, stretchLeewayOnRight);
            })
            .on("drag", function (e, dd) {
              columnResizeDragging = true;
              var actualMinWidth, d = Math.min(maxPageX, Math.max(minPageX, e.pageX)) - pageX, x;
              var newCanvasWidthL = 0, newCanvasWidthR = 0;
              var viewportWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;

              if (d < 0) { // shrink column
                x = d;

                for (j = i; j >= 0; j--) {
                  c = columns[j];
                  if (c.resizable) {
                    actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                    if (x && c.previousWidth + x < actualMinWidth) {
                      x += c.previousWidth - actualMinWidth;
                      c.width = actualMinWidth;
                    } else {
                      c.width = c.previousWidth + x;
                      x = 0;
                    }
                  }
                }

                for (k = 0; k <= i; k++) {
                  c = columns[k];

                  if (hasFrozenColumns() && (k > options.frozenColumn)) {
                    newCanvasWidthR += c.width;
                  } else {
                    newCanvasWidthL += c.width;
                  }
                }

                if (options.forceFitColumns) {
                  x = -d;
                  for (j = i + 1; j < columns.length; j++) {
                    c = columns[j];
                    if (c.resizable) {
                      if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                        x -= c.maxWidth - c.previousWidth;
                        c.width = c.maxWidth;
                      } else {
                        c.width = c.previousWidth + x;
                        x = 0;
                      }

                      if (hasFrozenColumns() && (j > options.frozenColumn)) {
                        newCanvasWidthR += c.width;
                      } else {
                        newCanvasWidthL += c.width;
                      }
                    }
                  }
                } else {
                  for (j = i + 1; j < columns.length; j++) {
                    c = columns[j];

                    if (hasFrozenColumns() && (j > options.frozenColumn)) {
                      newCanvasWidthR += c.width;
                    } else {
                      newCanvasWidthL += c.width;
                    }
                  }
                }

                if (options.forceFitColumns) {
                  x = -d;
                  for (j = i + 1; j < columns.length; j++) {
                    c = columns[j];
                    if (c.resizable) {
                      if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                        x -= c.maxWidth - c.previousWidth;
                        c.width = c.maxWidth;
                      } else {
                        c.width = c.previousWidth + x;
                        x = 0;
                      }
                    }
                  }
                }
              } else { // stretch column
                x = d;

                newCanvasWidthL = 0;
                newCanvasWidthR = 0;

                for (j = i; j >= 0; j--) {
                  c = columns[j];
                  if (c.resizable) {
                    if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                      x -= c.maxWidth - c.previousWidth;
                      c.width = c.maxWidth;
                    } else {
                      var newWidth = c.previousWidth + x;
                      var resizedCanvasWidthL = canvasWidthL + x;

                      if (hasFrozenColumns() && (j <= options.frozenColumn)) {
                        // if we're on the left frozen side, we need to make sure that our left section width never goes over the total viewport width
                        if (newWidth > frozenLeftColMaxWidth && resizedCanvasWidthL < (viewportWidth - options.frozenRightViewportMinWidth)) {
                          frozenLeftColMaxWidth = newWidth; // keep max column width ref, if we go over the limit this number will stop increasing
                        }
                        c.width = ((resizedCanvasWidthL + options.frozenRightViewportMinWidth) > viewportWidth) ? frozenLeftColMaxWidth : newWidth;
                      } else {
                        c.width = newWidth;
                      }
                      x = 0;
                    }
                  }
                }

                for (k = 0; k <= i; k++) {
                  c = columns[k];

                  if (hasFrozenColumns() && (k > options.frozenColumn)) {
                    newCanvasWidthR += c.width;
                  } else {
                    newCanvasWidthL += c.width;
                  }
                }

                if (options.forceFitColumns) {
                  x = -d;
                  for (j = i + 1; j < columns.length; j++) {
                    c = columns[j];
                    if (c.resizable) {
                      actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                      if (x && c.previousWidth + x < actualMinWidth) {
                        x += c.previousWidth - actualMinWidth;
                        c.width = actualMinWidth;
                      } else {
                        c.width = c.previousWidth + x;
                        x = 0;
                      }

                      if (hasFrozenColumns() && (j > options.frozenColumn)) {
                        newCanvasWidthR += c.width;
                      } else {
                        newCanvasWidthL += c.width;
                      }
                    }
                  }
                } else {
                  for (j = i + 1; j < columns.length; j++) {
                    c = columns[j];

                    if (hasFrozenColumns() && (j > options.frozenColumn)) {
                      newCanvasWidthR += c.width;
                    } else {
                      newCanvasWidthL += c.width;
                    }
                  }
                }
              }

              if (hasFrozenColumns() && newCanvasWidthL != canvasWidthL) {
                $headerL.width(newCanvasWidthL + 1000);
                $paneHeaderR.css('left', newCanvasWidthL);
              }

              applyColumnHeaderWidths();
              applyColumnGroupHeaderWidths();
              if (options.syncColumnCellResize) {
                applyColumnWidths();
              }
              trigger(self.onColumnsDrag, {
                triggeredByColumn: $(this).parent().attr("id").replace(uid, ""),
                resizeHandle: $(this)
              });
            })
            .on("dragend", function (e, dd) {
              $(this).parent().removeClass("slick-header-column-active");

              var triggeredByColumn = $(this).parent().attr("id").replace(uid, "");
              if (trigger(self.onBeforeColumnsResize, { triggeredByColumn: triggeredByColumn }) === true) {
                applyColumnHeaderWidths();
                applyColumnGroupHeaderWidths();
              }
              var newWidth;
              for (j = 0; j < columns.length; j++) {
                c = columns[j];
                newWidth = $(columnElements[j]).outerWidth();

                if (c.previousWidth !== newWidth && c.rerenderOnResize) {
                  invalidateAllRows();
                }
              }
              updateCanvasWidth(true);
              render();
              trigger(self.onColumnsResized, { triggeredByColumn: triggeredByColumn });
              setTimeout(function () { columnResizeDragging = false; }, 300);
            })
            .on("dblclick", function () {
              var triggeredByColumn = $(this).parent().attr("id").replace(uid, "");
              trigger(self.onColumnsResizeDblClick, { triggeredByColumn: triggeredByColumn });
            });
      });
    }

    function getVBoxDelta($el) {
      var p = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
      var delta = 0;
      if ($el && typeof $el.css === 'function') {
        $.each(p, function (n, val) {
          delta += parseFloat($el.css(val)) || 0;
        });
      }
      return delta;
    }

    function setFrozenOptions() {
      options.frozenColumn = (options.frozenColumn >= 0 && options.frozenColumn < columns.length)
        ? parseInt(options.frozenColumn)
        : -1;

      if (options.frozenRow > -1) {
        hasFrozenRows = true;
        frozenRowsHeight = ( options.frozenRow ) * options.rowHeight;

        var dataLength = getDataLength();

        actualFrozenRow = ( options.frozenBottom )
          ? ( dataLength - options.frozenRow )
          : options.frozenRow;
      } else {
        hasFrozenRows = false;
      }
    }

    function setPaneVisibility() {
      if (hasFrozenColumns()) {
        $paneHeaderR.show();
        $paneTopR.show();

        if (hasFrozenRows) {
          $paneBottomL.show();
          $paneBottomR.show();
        } else {
          $paneBottomR.hide();
          $paneBottomL.hide();
        }
      } else {
        $paneHeaderR.hide();
        $paneTopR.hide();
        $paneBottomR.hide();

        if (hasFrozenRows) {
          $paneBottomL.show();
        } else {
          $paneBottomR.hide();
          $paneBottomL.hide();
        }
      }
    }

    function setOverflow() {
      $viewportTopL.css({
        'overflow-x': ( hasFrozenColumns() ) ? ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'scroll' ) : ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'auto' ),
        'overflow-y': (!hasFrozenColumns() && options.alwaysShowVerticalScroll) ? "scroll" : (( hasFrozenColumns() ) ? ( hasFrozenRows ? 'hidden' : 'hidden' ) : ( hasFrozenRows ? 'scroll' : 'auto' ))
      });

      $viewportTopR.css({
        'overflow-x': ( hasFrozenColumns() ) ? ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'scroll' ) : ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'auto' ),
        'overflow-y': options.alwaysShowVerticalScroll ? "scroll" : (( hasFrozenColumns() ) ? ( hasFrozenRows ? 'scroll' : 'auto'   ) : ( hasFrozenRows ? 'scroll' : 'auto' ))
      });

      $viewportBottomL.css({
        'overflow-x': ( hasFrozenColumns() ) ? ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'scroll' : 'auto'   ): ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'auto' : 'auto'   ),
        'overflow-y': (!hasFrozenColumns() && options.alwaysShowVerticalScroll) ? "scroll" : (( hasFrozenColumns() ) ? ( hasFrozenRows ? 'hidden' : 'hidden' ): ( hasFrozenRows ? 'scroll' : 'auto' ))
      });

      $viewportBottomR.css({
        'overflow-x': ( hasFrozenColumns() ) ? ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'scroll' : 'auto' ) : ( hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'auto' : 'auto' ),
        'overflow-y': options.alwaysShowVerticalScroll ? "scroll" : (( hasFrozenColumns() ) ? ( hasFrozenRows ? 'auto' : 'auto'   ) : ( hasFrozenRows ? 'auto' : 'auto' ))
      });
      if (options.viewportClass) {
        $viewportTopL.toggleClass(options.viewportClass, true);
        $viewportTopR.toggleClass(options.viewportClass, true);
        $viewportBottomL.toggleClass(options.viewportClass, true);
        $viewportBottomR.toggleClass(options.viewportClass, true);
      }
    }

    function setScroller() {
      if (hasFrozenColumns()) {
        $headerScrollContainer = $headerScrollerR;
        $headerRowScrollContainer = $headerRowScrollerR;
        $footerRowScrollContainer = $footerRowScrollerR;

        if (hasFrozenRows) {
          if (options.frozenBottom) {
            $viewportScrollContainerX = $viewportBottomR;
            $viewportScrollContainerY = $viewportTopR;
          } else {
            $viewportScrollContainerX = $viewportScrollContainerY = $viewportBottomR;
          }
        } else {
          $viewportScrollContainerX = $viewportScrollContainerY = $viewportTopR;
        }
      } else {
        $headerScrollContainer = $headerScrollerL;
        $headerRowScrollContainer = $headerRowScrollerL;
        $footerRowScrollContainer = $footerRowScrollerL;

        if (hasFrozenRows) {
          if (options.frozenBottom) {
            $viewportScrollContainerX = $viewportBottomL;
            $viewportScrollContainerY = $viewportTopL;
          } else {
            $viewportScrollContainerX = $viewportScrollContainerY = $viewportBottomL;
          }
        } else {
          $viewportScrollContainerX = $viewportScrollContainerY = $viewportTopL;
        }
      }
    }

    function measureCellPaddingAndBorder() {
      var el;
      var h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
      var v = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];

      // jquery prior to version 1.8 handles .width setter/getter as a direct css write/read
      // jquery 1.8 changed .width to read the true inner element width if box-sizing is set to border-box, and introduced a setter for .outerWidth
      // so for equivalent functionality, prior to 1.8 use .width, and after use .outerWidth
      var verArray = $.fn.jquery.split('.');
      jQueryNewWidthBehaviour = (verArray[0]==1 && verArray[1]>=8) ||  verArray[0] >=2;

      el = $("<div class='ui-state-default slick-header-column' style='visibility:hidden'>-</div>").appendTo($headers);
      headerColumnWidthDiff = headerColumnHeightDiff = 0;
      if (el.css("box-sizing") != "border-box" && el.css("-moz-box-sizing") != "border-box" && el.css("-webkit-box-sizing") != "border-box") {
        $.each(h, function (n, val) {
          headerColumnWidthDiff += parseFloat(el.css(val)) || 0;
        });
        $.each(v, function (n, val) {
          headerColumnHeightDiff += parseFloat(el.css(val)) || 0;
        });
      }
      el.remove();

      var r = $("<div class='slick-row' />").appendTo($canvas);
      el = $("<div class='slick-cell' id='' style='visibility:hidden'>-</div>").appendTo(r);
      cellWidthDiff = cellHeightDiff = 0;
      if (el.css("box-sizing") != "border-box" && el.css("-moz-box-sizing") != "border-box" && el.css("-webkit-box-sizing") != "border-box") {
        $.each(h, function (n, val) {
          cellWidthDiff += parseFloat(el.css(val)) || 0;
        });
        $.each(v, function (n, val) {
          cellHeightDiff += parseFloat(el.css(val)) || 0;
        });
      }
      r.remove();

      absoluteColumnMinWidth = Math.max(headerColumnWidthDiff, cellWidthDiff);
    }

    function createCssRules() {
      $style = $("<style type='text/css' rel='stylesheet' />").appendTo($("head"));
      var rowHeight = (options.rowHeight - cellHeightDiff);
      var rules = [
        "." + uid + " .slick-group-header-column { left: 1000px; }",
        "." + uid + " .slick-header-column { left: 1000px; }",
        "." + uid + " .slick-top-panel { height:" + options.topPanelHeight + "px; }",
        "." + uid + " .slick-preheader-panel { height:" + options.preHeaderPanelHeight + "px; }",
        "." + uid + " .slick-headerrow-columns { height:" + options.headerRowHeight + "px; }",
        "." + uid + " .slick-footerrow-columns { height:" + options.footerRowHeight + "px; }",
        "." + uid + " .slick-cell { height:" + rowHeight + "px; }",
        "." + uid + " .slick-row { height:" + options.rowHeight + "px; }"
      ];

      for (var i = 0; i < columns.length; i++) {
        rules.push("." + uid + " .l" + i + " { }");
        rules.push("." + uid + " .r" + i + " { }");
      }

      if ($style[0].styleSheet) { // IE
        $style[0].styleSheet.cssText = rules.join(" ");
      } else {
        $style[0].appendChild(document.createTextNode(rules.join(" ")));
      }
    }

    function getColumnCssRules(idx) {
      var i;
      if (!stylesheet) {
        var sheets = document.styleSheets;
        for (i = 0; i < sheets.length; i++) {
          if ((sheets[i].ownerNode || sheets[i].owningElement) == $style[0]) {
            stylesheet = sheets[i];
            break;
          }
        }

        if (!stylesheet) {
          throw new Error("SlickGrid Cannot find stylesheet.");
        }

        // find and cache column CSS rules
        columnCssRulesL = [];
        columnCssRulesR = [];
        var cssRules = (stylesheet.cssRules || stylesheet.rules);
        var matches, columnIdx;
        for (i = 0; i < cssRules.length; i++) {
          var selector = cssRules[i].selectorText;
          if (matches = /\.l\d+/.exec(selector)) {
            columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
            columnCssRulesL[columnIdx] = cssRules[i];
          } else if (matches = /\.r\d+/.exec(selector)) {
            columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
            columnCssRulesR[columnIdx] = cssRules[i];
          }
        }
      }

      return {
        "left": columnCssRulesL[idx],
        "right": columnCssRulesR[idx]
      };
    }

    function removeCssRules() {
      $style.remove();
      stylesheet = null;
    }

    function destroy(shouldDestroyAllElements) {
      getEditorLock().cancelCurrentEdit();

      trigger(self.onBeforeDestroy, {});

      var i = plugins.length;
      while(i--) {
        unregisterPlugin(plugins[i]);
      }

      if (options.enableColumnReorder) {
          $headers.filter(":ui-sortable").sortable("destroy");
      }

      unbindAncestorScrollEvents();
      $container.off(".slickgrid");
      removeCssRules();

      $canvas.off();
      $viewport.off();
      $headerScroller.off();
      $headerRowScroller.off();
      if ($footerRow) {
        $footerRow.off();
      }
      if ($footerRowScroller) {
        $footerRowScroller.off();
      }
      if ($preHeaderPanelScroller) {
        $preHeaderPanelScroller.off();
      }
      $focusSink.off();
      $(".slick-resizable-handle").off();
      $(".slick-header-column").off();
      $container.empty().removeClass(uid);
      if (shouldDestroyAllElements) {
        destroyAllElements();
      }
    }

    function destroyAllElements() {
      $activeCanvasNode = null;
      $activeViewportNode = null;
      $boundAncestors = null;
      $canvas = null;
      $canvasTopL = null;
      $canvasTopR = null;
      $canvasBottomL = null;
      $canvasBottomR = null;
      $container = null;
      $focusSink = null;
      $focusSink2 = null;
      $groupHeaders = null;
      $groupHeadersL = null;
      $groupHeadersR = null;
      $headerL = null;
      $headerR = null;
      $headers = null;
      $headerRow = null;
      $headerRowL = null;
      $headerRowR = null;
      $headerRowSpacerL = null;
      $headerRowSpacerR = null;
      $headerRowScrollContainer = null;
      $headerRowScroller = null;
      $headerRowScrollerL = null;
      $headerRowScrollerR = null;
      $headerScrollContainer = null;
      $headerScroller = null;
      $headerScrollerL = null;
      $headerScrollerR = null;
      $hiddenParents = null;
      $footerRow = null;
      $footerRowL = null;
      $footerRowR = null;
      $footerRowSpacerL = null;
      $footerRowSpacerR = null;
      $footerRowScroller = null;
      $footerRowScrollerL = null;
      $footerRowScrollerR = null;
      $footerRowScrollContainer = null;
      $preHeaderPanel = null;
      $preHeaderPanelR = null;
      $preHeaderPanelScroller = null;
      $preHeaderPanelScrollerR = null;
      $preHeaderPanelSpacer = null;
      $preHeaderPanelSpacerR = null;
      $topPanel = null;
      $topPanelScroller = null;
      $style = null;
      $topPanelScrollerL = null;
      $topPanelScrollerR = null;
      $topPanelL = null;
      $topPanelR = null;
      $paneHeaderL = null;
      $paneHeaderR = null;
      $paneTopL = null;
      $paneTopR = null;
      $paneBottomL = null;
      $paneBottomR = null;
      $viewport = null;
      $viewportTopL = null;
      $viewportTopR = null;
      $viewportBottomL = null;
      $viewportBottomR = null;
      $viewportScrollContainerX = null;
      $viewportScrollContainerY = null;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Column Autosizing
    //////////////////////////////////////////////////////////////////////////////////////////////

    var canvas = null;
    var canvas_context = null;

    function autosizeColumn(columnOrIndexOrId, isInit) {
      var c = columnOrIndexOrId;
      if (typeof columnOrIndexOrId === 'number') {
        c = columns[columnOrIndexOrId];
      }
      else if (typeof columnOrIndexOrId === 'string') {
        for (var i = 0; i < columns.length; i++) {
          if (columns[i].Id === columnOrIndexOrId) { c = columns[i]; }
        }
      }
      var $gridCanvas = $(getCanvasNode(0, 0));
      getColAutosizeWidth(c, $gridCanvas, isInit);
    }

    function autosizeColumns(autosizeMode, isInit) {
      //LogColWidths();

      autosizeMode =  autosizeMode || options.autosizeColsMode;
      if (autosizeMode === Slick.GridAutosizeColsMode.LegacyForceFit
      || autosizeMode === Slick.GridAutosizeColsMode.LegacyOff) {
        legacyAutosizeColumns();
        return;
      }

      if (autosizeMode === Slick.GridAutosizeColsMode.None) {
        return;
      }

      // test for brower canvas support, canvas_context!=null if supported
      canvas = document.createElement("canvas");
      if (canvas && canvas.getContext) { canvas_context = canvas.getContext("2d"); }

      // pass in the grid canvas
      var $gridCanvas = $(getCanvasNode(0, 0));
      var viewportWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;

      // iterate columns to get autosizes
      var i, c, colWidth, reRender, totalWidth = 0, totalWidthLessSTR = 0, strColsMinWidth = 0, totalMinWidth = 0, totalLockedColWidth = 0;
      for (i = 0; i < columns.length; i++) {
        c = columns[i];
        getColAutosizeWidth(c, $gridCanvas, isInit);
        totalLockedColWidth += (c.autoSize.autosizeMode === Slick.ColAutosizeMode.Locked ? c.width : 0);
        totalMinWidth += (c.autoSize.autosizeMode === Slick.ColAutosizeMode.Locked ? c.width : c.minWidth);
        totalWidth += c.autoSize.widthPx;
        totalWidthLessSTR += (c.autoSize.sizeToRemaining ? 0 : c.autoSize.widthPx);
        strColsMinWidth += (c.autoSize.sizeToRemaining ? c.minWidth || 0 : 0);
      }
      var strColTotalGuideWidth = totalWidth - totalWidthLessSTR;

      if (autosizeMode === Slick.GridAutosizeColsMode.FitViewportToCols) {
        // - if viewport with is outside MinViewportWidthPx and MaxViewportWidthPx, then the viewport is set to
        //   MinViewportWidthPx or MaxViewportWidthPx and the FitColsToViewport algorithm is used
        // - viewport is resized to fit columns
        var setWidth = totalWidth + scrollbarDimensions.width;
        autosizeMode = Slick.GridAutosizeColsMode.IgnoreViewport;

        if (options.viewportMaxWidthPx && setWidth > options.viewportMaxWidthPx) {
          setWidth = options.viewportMaxWidthPx;
          autosizeMode = Slick.GridAutosizeColsMode.FitColsToViewport;
        } else if (options.viewportMinWidthPx && setWidth < options.viewportMinWidthPx) {
          setWidth = options.viewportMinWidthPx;
          autosizeMode = Slick.GridAutosizeColsMode.FitColsToViewport;
        } else {
          // falling back to IgnoreViewport will size the columns as-is, with render checking
          //for (i = 0; i < columns.length; i++) { columns[i].width = columns[i].autoSize.widthPx; }
        }
        $container.width(setWidth);
      }

      if (autosizeMode === Slick.GridAutosizeColsMode.FitColsToViewport) {
        if (strColTotalGuideWidth > 0 && totalWidthLessSTR < viewportWidth - strColsMinWidth) {
          // if addl space remains in the viewport and there are SizeToRemaining cols, just the SizeToRemaining cols expand proportionally to fill viewport
          for (i = 0; i < columns.length; i++) {
            c = columns[i];
            var totalSTRViewportWidth = viewportWidth - totalWidthLessSTR;
            if (c.autoSize.sizeToRemaining) {
              colWidth = totalSTRViewportWidth * c.autoSize.widthPx / strColTotalGuideWidth;
            } else {
              colWidth = c.autoSize.widthPx;
            }
            if (c.rerenderOnResize && c.width  != colWidth) { reRender = true; }
            c.width = colWidth;
          }
        } else if ((options.viewportSwitchToScrollModeWidthPercent && totalWidthLessSTR + strColsMinWidth > viewportWidth * options.viewportSwitchToScrollModeWidthPercent / 100)
          || (totalMinWidth > viewportWidth)) {
          // if the total columns width is wider than the viewport by switchToScrollModeWidthPercent, switch to IgnoreViewport mode
          autosizeMode = Slick.GridAutosizeColsMode.IgnoreViewport;
        } else {
          // otherwise (ie. no SizeToRemaining cols or viewport smaller than columns) all cols other than 'Locked' scale in proportion to fill viewport
          // and SizeToRemaining get minWidth
          var unallocatedColWidth = totalWidthLessSTR - totalLockedColWidth;
          var unallocatedViewportWidth = viewportWidth - totalLockedColWidth - strColsMinWidth;
          for (i = 0; i < columns.length; i++) {
            c = columns[i];
            colWidth = c.width;
            if (c.autoSize.autosizeMode !== Slick.ColAutosizeMode.Locked) {
              if (c.autoSize.sizeToRemaining) {
                colWidth = c.minWidth;
              } else {
                // size width proportionally to free space (we know we have enough room due to the earlier calculations)
                colWidth = unallocatedViewportWidth / unallocatedColWidth * c.autoSize.widthPx;
                if (colWidth < c.minWidth) { colWidth = c.minWidth; }

                // remove the just allocated widths from the allocation pool
                unallocatedColWidth -= c.autoSize.widthPx;
                unallocatedViewportWidth -= colWidth;
              }
            }
            if (c.rerenderOnResize && c.width  != colWidth) { reRender = true; }
            c.width = colWidth;
          }
        }
      }

      if (autosizeMode === Slick.GridAutosizeColsMode.IgnoreViewport) {
        // just size columns as-is
        for (i = 0; i < columns.length; i++) {
          colWidth = columns[i].autoSize.widthPx;
          if (columns[i].rerenderOnResize && columns[i].width != colWidth) {
            reRender = true;
          }
          columns[i].width = colWidth;
        }
      }

      //LogColWidths();
      reRenderColumns(reRender);
    }

    function LogColWidths () {
      var s =  "Col Widths:";
      for (var i = 0; i < columns.length; i++) { s += ' ' + columns[i].width; }
      console.log(s);
    }

    function getColAutosizeWidth(columnDef, $gridCanvas, isInit) {
      var autoSize = columnDef.autoSize;

      // set to width as default
      autoSize.widthPx = columnDef.width;
      if (autoSize.autosizeMode === Slick.ColAutosizeMode.Locked
      || autoSize.autosizeMode === Slick.ColAutosizeMode.Guide) {
        return;
      }

      var dl = getDataLength(); //getDataItem();

      // ContentIntelligent takes settings from column data type
      if (autoSize.autosizeMode === Slick.ColAutosizeMode.ContentIntelligent) {
        // default to column colDataTypeOf (can be used if initially there are no data rows)
        var colDataTypeOf = autoSize.colDataTypeOf;
        var colDataItem;
        if (dl > 0) {
          var tempRow = getDataItem(0);
          if (tempRow) {
            colDataItem = tempRow[columnDef.field];
            colDataTypeOf = typeof colDataItem;
            if (colDataTypeOf === 'object') {
              if (colDataItem instanceof Date) { colDataTypeOf = "date"; }
              if (typeof moment!=='undefined' && colDataItem instanceof moment) { colDataTypeOf = "moment"; }
            }
          }
        }
        if (colDataTypeOf === 'boolean') {
          autoSize.colValueArray = [ true, false ];
        }
        if (colDataTypeOf === 'number') {
          autoSize.valueFilterMode = Slick.ValueFilterMode.GetGreatestAndSub;
          autoSize.rowSelectionMode = Slick.RowSelectionMode.AllRows;
        }
        if (colDataTypeOf === 'string') {
          autoSize.valueFilterMode = Slick.ValueFilterMode.GetLongestText;
          autoSize.rowSelectionMode = Slick.RowSelectionMode.AllRows;
          autoSize.allowAddlPercent = 5;
        }
        if (colDataTypeOf === 'date') {
          autoSize.colValueArray = [ new Date(2009, 8, 30, 12, 20, 20) ]; // Sep 30th 2009, 12:20:20 AM
        }
        if (colDataTypeOf === 'moment' && typeof moment!=='undefined') {
          autoSize.colValueArray = [ moment([2009, 8, 30, 12, 20, 20]) ]; // Sep 30th 2009, 12:20:20 AM
        }
      }

      // at this point, the autosizeMode is effectively 'Content', so proceed to get size
      var colWidth = getColContentSize(columnDef, $gridCanvas, isInit);

      var addlPercentMultiplier = (autoSize.allowAddlPercent ? (1 + autoSize.allowAddlPercent/100) : 1);
      colWidth = colWidth * addlPercentMultiplier + options.autosizeColPaddingPx;
      if (columnDef.minWidth && colWidth < columnDef.minWidth) { colWidth = columnDef.minWidth; }
      if (columnDef.maxWidth && colWidth > columnDef.maxWidth) { colWidth = columnDef.maxWidth; }

      autoSize.widthPx = colWidth;
    }

    function getColContentSize(columnDef, $gridCanvas, isInit) {
      var autoSize = columnDef.autoSize;
      var widthAdjustRatio = 1;

      // at this point, the autosizeMode is effectively 'Content', so proceed to get size

      // get header width, if we are taking notice of it
      var i, ii;
      var maxColWidth = 0;
      var headerWidth = 0;
      if (!autoSize.ignoreHeaderText) {
        headerWidth = getColHeaderWidth(columnDef);
      }
      if (headerWidth === 0) {
        headerWidth = (columnDef.width ? columnDef.width
          : (columnDef.maxWidth ? columnDef.maxWidth
            : (columnDef.minWidth ? columnDef.minWidth : 20)
            )
        );
      }

      if (autoSize.colValueArray) {
        // if an array of values are specified, just pass them in instead of data
        maxColWidth = getColWidth(columnDef, $gridCanvas, autoSize.colValueArray);
        return Math.max(headerWidth, maxColWidth);
      }

      // select rows to evaluate using rowSelectionMode and rowSelectionCount
      var rows = getData();
      if (rows.getItems) { rows = rows.getItems(); }

      if (rows.length === 0) { return headerWidth; }

      var rowSelectionMode = (isInit ? autoSize.rowSelectionModeOnInit : undefined) || autoSize.rowSelectionMode;

      if (rowSelectionMode === Slick.RowSelectionMode.FirstRow) { rows = rows.slice(0,1); }
      if (rowSelectionMode === Slick.RowSelectionMode.LastRow) { rows = rows.slice(rows.length -1, rows.length); }
      if (rowSelectionMode === Slick.RowSelectionMode.FirstNRows) { rows = rows.slice(0, autoSize.rowSelectionCount); }

      // now use valueFilterMode to further filter selected rows
      if (autoSize.valueFilterMode === Slick.ValueFilterMode.DeDuplicate) {
        var rowsDict = {};
        for (i = 0, ii = rows.length; i < ii; i++) {
          rowsDict[rows[i][columnDef.field]] = true;
        }
        if (Object.keys) {
          rows = Object.keys(rowsDict);
        } else {
          rows = [];
          for (var i in rowsDict)  rows.push(i);
        }
      }

      if (autoSize.valueFilterMode === Slick.ValueFilterMode.GetGreatestAndSub) {
        // get greatest abs value in data
        var tempVal, maxVal = 0, maxAbsVal = 0;
        for (i = 0, ii = rows.length; i < ii; i++) {
          tempVal = rows[i][columnDef.field];
          if (Math.abs(tempVal) > maxAbsVal) { maxVal = tempVal; maxAbsVal = Math.abs(tempVal); }
        }
        // now substitute a '9' for all characters (to get widest width) and convert back to a number
        maxVal = '' + maxVal;
        maxVal = Array(maxVal.length + 1).join("9");
        maxVal = +maxVal;

        rows = [ maxVal ];
      }

      if (autoSize.valueFilterMode === Slick.ValueFilterMode.GetLongestTextAndSub) {
        // get greatest abs value in data
        var tempVal, maxLen = 0;
        for (i = 0, ii = rows.length; i < ii; i++) {
          tempVal = rows[i][columnDef.field];
          if ((tempVal || '').length > maxLen) { maxLen = tempVal.length; }
        }
        // now substitute a 'c' for all characters
        tempVal = Array(maxLen + 1).join("m");
        widthAdjustRatio = options.autosizeTextAvgToMWidthRatio;

        rows = [ tempVal ];
      }

      if (autoSize.valueFilterMode === Slick.ValueFilterMode.GetLongestText) {
        // get greatest abs value in data
        var tempVal = '', maxLen = 0, maxIndex = 0;
        for (i = 0, ii = rows.length; i < ii; i++) {
          tempVal = rows[i][columnDef.field];
          if ((tempVal || '').length > maxLen) { maxLen = tempVal.length; maxIndex = i; }
        }
        // now substitute a 'c' for all characters
        tempVal = rows[maxIndex][columnDef.field];

        rows = [ tempVal ];
      }

      maxColWidth = getColWidth(columnDef, $gridCanvas, rows) * widthAdjustRatio;
      return Math.max(headerWidth, maxColWidth);
    }

    function getColWidth(columnDef, $gridCanvas, data) {
        var colIndex = getColumnIndex(columnDef.id);

        var $rowEl = $('<div class="slick-row ui-widget-content"></div>');
        var $cellEl = $('<div class="slick-cell"></div>');
        $cellEl.css({
            "position": "absolute",
            "visibility": "hidden",
            "text-overflow": "initial",
            "white-space": "nowrap"
        });
        $rowEl.append($cellEl);

        $gridCanvas.append($rowEl);

        var len, max = 0, text, maxText, formatterResult, maxWidth = 0, val;

         // use canvas - very fast, but text-only
        if (canvas_context && columnDef.autoSize.widthEvalMode === Slick.WidthEvalMode.CanvasTextSize) {
          canvas_context.font = $cellEl.css("font-size") + " " + $cellEl.css("font-family");
          $(data).each(function (index, row) {
              // row is either an array or values or a single value
              val = (Array.isArray(row) ? row[columnDef.field] : row);
              text = '' + val;
              len = text ? canvas_context.measureText(text).width : 0;
              if (len > max) { max = len; maxText = text; }
          });

          $cellEl.html(maxText);
          len = $cellEl.outerWidth();

          $rowEl.remove();
          $cellEl = null;
          return len;
        }

        $(data).each(function (index, row) {
            val = (Array.isArray(row) ? row[columnDef.field] : row);
            if (columnDef.formatterOverride) {
              // use formatterOverride as first preference
              formatterResult = columnDef.formatterOverride(index, colIndex, val, columnDef, row, self);
            } else if (columnDef.formatter) {
              // otherwise, use formatter
              formatterResult = columnDef.formatter(index, colIndex, val, columnDef, row, self);
            } else {
              // otherwise, use plain text
              formatterResult = '' + val;
            }
            applyFormatResultToCellNode(formatterResult, $cellEl[0]);
            len = $cellEl.outerWidth();
            if (len > max) { max = len; }
         });

        $rowEl.remove();
        $cellEl = null;
        return max;
    }

    function getColHeaderWidth(columnDef) {
      var width = 0;
      //if (columnDef && (!columnDef.resizable || columnDef._autoCalcWidth === true)) return;
      var headerColElId = getUID() + columnDef.id;
      var headerColEl = document.getElementById(headerColElId);
      var dummyHeaderColElId = headerColElId + "_";
      if (headerColEl) {
        // headers have been created, use clone technique
        var clone = headerColEl.cloneNode(true);
        clone.id = dummyHeaderColElId;
        clone.style.cssText = 'position: absolute; visibility: hidden;right: auto;text-overflow: initial;white-space: nowrap;';
        headerColEl.parentNode.insertBefore(clone, headerColEl);
        width = clone.offsetWidth;
        clone.parentNode.removeChild(clone);
      } else {
        // headers have not yet been created, create a new node
        var header = getHeader(columnDef);
        headerColEl = $("<div class='ui-state-default slick-header-column' />")
          .html("<span class='slick-column-name'>" + columnDef.name + "</span>")
          .attr("id", dummyHeaderColElId)
          .css({ "position": "absolute", "visibility": "hidden", "right": "auto", "text-overflow:": "initial", "white-space": "nowrap" })
          .addClass(columnDef.headerCssClass || "")
          .appendTo(header);
        width = headerColEl[0].offsetWidth;
        header[0].removeChild(headerColEl[0]);
      }
      return width;
    }

    function legacyAutosizeColumns() {
      var i, c,
          widths = [],
          shrinkLeeway = 0,
          total = 0,
          prevTotal,
          availWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;

      for (i = 0; i < columns.length; i++) {
        c = columns[i];
        widths.push(c.width);
        total += c.width;
        if (c.resizable) {
          shrinkLeeway += c.width - Math.max(c.minWidth, absoluteColumnMinWidth);
        }
      }

      // shrink
      prevTotal = total;
      while (total > availWidth && shrinkLeeway) {
        var shrinkProportion = (total - availWidth) / shrinkLeeway;
        for (i = 0; i < columns.length && total > availWidth; i++) {
          c = columns[i];
          var width = widths[i];
          if (!c.resizable || width <= c.minWidth || width <= absoluteColumnMinWidth) {
            continue;
          }
          var absMinWidth = Math.max(c.minWidth, absoluteColumnMinWidth);
          var shrinkSize = Math.floor(shrinkProportion * (width - absMinWidth)) || 1;
          shrinkSize = Math.min(shrinkSize, width - absMinWidth);
          total -= shrinkSize;
          shrinkLeeway -= shrinkSize;
          widths[i] -= shrinkSize;
        }
        if (prevTotal <= total) {  // avoid infinite loop
          break;
        }
        prevTotal = total;
      }

      // grow
      prevTotal = total;
      while (total < availWidth) {
        var growProportion = availWidth / total;
        for (i = 0; i < columns.length && total < availWidth; i++) {
          c = columns[i];
          var currentWidth = widths[i];
          var growSize;

          if (!c.resizable || c.maxWidth <= currentWidth) {
            growSize = 0;
          } else {
            growSize = Math.min(Math.floor(growProportion * currentWidth) - currentWidth, (c.maxWidth - currentWidth) || 1000000) || 1;
          }
          total += growSize;
          widths[i] += (total <= availWidth ? growSize : 0);
        }
        if (prevTotal >= total) {  // avoid infinite loop
          break;
        }
        prevTotal = total;
      }

      var reRender = false;
      for (i = 0; i < columns.length; i++) {
        if (columns[i].rerenderOnResize && columns[i].width != widths[i]) {
          reRender = true;
        }
        columns[i].width = widths[i];
      }

      reRenderColumns(reRender);
    }

    function reRenderColumns(reRender) {
      applyColumnHeaderWidths();
      applyColumnGroupHeaderWidths();
      updateCanvasWidth(true);

      trigger(self.onAutosizeColumns, { "columns": columns});

      if (reRender) {
        invalidateAllRows();
        render();
      }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // General
    //////////////////////////////////////////////////////////////////////////////////////////////

    function trigger(evt, args, e) {
      e = e || new Slick.EventData();
      args = args || {};
      args.grid = self;
      return evt.notify(args, e, self);
    }

    function getEditorLock() {
      return options.editorLock;
    }

    function getEditController() {
      return editController;
    }

    function getColumnIndex(id) {
      return columnsById[id];
    }

    function applyColumnGroupHeaderWidths() {
      if (!treeColumns.hasDepth())
        return;

      for (var depth = $groupHeadersL.length - 1; depth >= 0; depth--) {

        var groupColumns = treeColumns.getColumnsInDepth(depth);

        $().add($groupHeadersL[depth]).add($groupHeadersR[depth]).each(function(i) {
          var $groupHeader = $(this),
            currentColumnIndex = 0;

          $groupHeader.width(i === 0? getHeadersWidthL(): getHeadersWidthR());

          $groupHeader.children().each(function() {
            var $groupHeaderColumn = $(this);

            var m = $(this).data('column');

            m.width = 0;

            m.columns.forEach(function() {
              var $headerColumn = $groupHeader.next().children(':eq(' + (currentColumnIndex++) + ')');
              m.width += $headerColumn.outerWidth();
            });

            $groupHeaderColumn.width(m.width - headerColumnWidthDiff);

          });

        });

      }
    }

    function applyColumnHeaderWidths() {
      if (!initialized) { return; }
      var h;

      for (var i = 0, headers = $headers.children(), ii = columns.length; i < ii; i++) {
        h = $(headers[i]);
        if (jQueryNewWidthBehaviour) {
            if (h.outerWidth() !== columns[i].width) {
              h.outerWidth(columns[i].width);
            }
        } else {
            if (h.width() !== columns[i].width - headerColumnWidthDiff) {
              h.width(columns[i].width - headerColumnWidthDiff);
            }
        }
      }

      updateColumnCaches();
    }

    function applyColumnWidths() {
      var x = 0, w, rule;
      for (var i = 0; i < columns.length; i++) {
        w = columns[i].width;

        rule = getColumnCssRules(i);
        rule.left.style.left = x + "px";
        rule.right.style.right = (((options.frozenColumn != -1 && i > options.frozenColumn) ? canvasWidthR : canvasWidthL) - x - w) + "px";

        // If this column is frozen, reset the css left value since the
        // column starts in a new viewport.
        if (options.frozenColumn == i) {
          x = 0;
        } else {
          x += columns[i].width;
        }
      }
    }

    function setSortColumn(columnId, ascending) {
      setSortColumns([{ columnId: columnId, sortAsc: ascending}]);
    }

    function setSortColumns(cols) {
      sortColumns = cols;
      var numberCols = options.numberedMultiColumnSort && sortColumns.length > 1;
      var headerColumnEls = $headers.children();
      headerColumnEls
        .removeClass("slick-header-column-sorted")
        .find(".slick-sort-indicator")
          .removeClass("slick-sort-indicator-asc slick-sort-indicator-desc");
      headerColumnEls
        .find(".slick-sort-indicator-numbered")
          .text('');

      $.each(sortColumns, function(i, col) {
        if (col.sortAsc == null) {
          col.sortAsc = true;
        }
        var columnIndex = getColumnIndex(col.columnId);
        if (columnIndex != null) {
          headerColumnEls.eq(columnIndex)
            .addClass("slick-header-column-sorted")
              .find(".slick-sort-indicator")
                .addClass(col.sortAsc ? "slick-sort-indicator-asc" : "slick-sort-indicator-desc");
          if (numberCols) {
            headerColumnEls.eq(columnIndex)
              .find(".slick-sort-indicator-numbered")
                .text(i+1);
          }
        }
      });
    }

    function getSortColumns() {
      return sortColumns;
    }

    function handleSelectedRangesChanged(e, ranges) {
      var previousSelectedRows = selectedRows.slice(0); // shallow copy previously selected rows for later comparison
      selectedRows = [];
      var hash = {};
      for (var i = 0; i < ranges.length; i++) {
        for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
          if (!hash[j]) {  // prevent duplicates
            selectedRows.push(j);
            hash[j] = {};
          }
          for (var k = ranges[i].fromCell; k <= ranges[i].toCell; k++) {
            if (canCellBeSelected(j, k)) {
              hash[j][columns[k].id] = options.selectedCellCssClass;
            }
          }
        }
      }

      setCellCssStyles(options.selectedCellCssClass, hash);

      if (simpleArrayEquals(previousSelectedRows, selectedRows)) {
        var caller = e && e.detail && e.detail.caller || 'click';
        var newSelectedAdditions = getSelectedRows().filter(function(i) { return previousSelectedRows.indexOf(i) < 0 });
        var newSelectedDeletions = previousSelectedRows.filter(function(i) { return getSelectedRows().indexOf(i) < 0 });

        trigger(self.onSelectedRowsChanged, {
          rows: getSelectedRows(),
          previousSelectedRows: previousSelectedRows,
          caller : caller,
          changedSelectedRows: newSelectedAdditions,
          changedUnselectedRows: newSelectedDeletions
        }, e);
      }
    }

    // compare 2 simple arrays (integers or strings only, do not use to compare object arrays)
    function simpleArrayEquals(arr1, arr2) {
      return Array.isArray(arr1) && Array.isArray(arr2) && arr2.sort().toString() !== arr1.sort().toString();
    }

    function getColumns() {
      return columns;
    }

    function updateColumnCaches() {
      // Pre-calculate cell boundaries.
      columnPosLeft = [];
      columnPosRight = [];
      var x = 0;
      for (var i = 0, ii = columns.length; i < ii; i++) {
        columnPosLeft[i] = x;
        columnPosRight[i] = x + columns[i].width;

        if (options.frozenColumn == i) {
          x = 0;
        } else {
          x += columns[i].width;
        }
      }
    }

    function updateColumnProps() {
      columnsById = {};
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].width) { columns[i].widthRequest = columns[i].width; }

        var m = columns[i] = $.extend({}, columnDefaults, columns[i]);
        m.autoSize = $.extend({}, columnAutosizeDefaults, m.autoSize);

        columnsById[m.id] = i;
        if (m.minWidth && m.width < m.minWidth) {
          m.width = m.minWidth;
        }
        if (m.maxWidth && m.width > m.maxWidth) {
          m.width = m.maxWidth;
        }
        if (!m.resizable) {
          // there is difference between user resizable and autoWidth resizable
          //m.autoSize.autosizeMode = Slick.ColAutosizeMode.Locked;
        }
      }
    }

    function setColumns(columnDefinitions) {
      trigger(self.onBeforeSetColumns, { previousColumns: columns, newColumns: columnDefinitions, grid: self });

      var _treeColumns = new Slick.TreeColumns(columnDefinitions);
      if (_treeColumns.hasDepth()) {
        treeColumns = _treeColumns;
        columns = treeColumns.extractColumns();
      } else {
        columns = columnDefinitions;
      }

      updateColumnProps();
      updateColumnCaches();

      if (initialized) {
        setPaneVisibility();
        setOverflow();

        invalidateAllRows();
        createColumnHeaders();
        createColumnGroupHeaders();
        createColumnFooter();
        removeCssRules();
        createCssRules();
        resizeCanvas();
        updateCanvasWidth();
        applyColumnHeaderWidths();
        applyColumnWidths();
        handleScroll();
      }
    }

    function getOptions() {
      return options;
    }

    function setOptions(args, suppressRender, suppressColumnSet, suppressSetOverflow) {
      if (!getEditorLock().commitCurrentEdit()) {
        return;
      }

      makeActiveCellNormal();

      if (args.showColumnHeader !== undefined) {
        setColumnHeaderVisibility(args.showColumnHeader);
      }

      if (options.enableAddRow !== args.enableAddRow) {
        invalidateRow(getDataLength());
      }

      var originalOptions = $.extend(true, {}, options);
      options = $.extend(options, args);
      trigger(self.onSetOptions, { "optionsBefore": originalOptions, "optionsAfter": options });

      validateAndEnforceOptions();

      $viewport.css("overflow-y", options.autoHeight ? "hidden" : "auto");
      if (!suppressRender) {
        render();
      }

      setFrozenOptions();
      setScroller();
      if (!suppressSetOverflow) {
        setOverflow();
      }

      if (!suppressColumnSet) {
        setColumns(treeColumns.extractColumns());
      }

      if (options.enableMouseWheelScrollHandler && $viewport && jQuery.fn.mousewheel) {
        var viewportEvents = $._data($viewport[0], "events");
        if (!viewportEvents || !viewportEvents.mousewheel) {
          $viewport.on("mousewheel", handleMouseWheel);
        }
      } else if (options.enableMouseWheelScrollHandler === false) {
        $viewport.off("mousewheel"); // remove scroll handler when option is disable
      }
    }

    function validateAndEnforceOptions() {
      if (options.autoHeight) {
        options.leaveSpaceForNewRows = false;
      }
      if (options.forceFitColumns) {
        options.autosizeColsMode = Slick.GridAutosizeColsMode.LegacyForceFit;
        console.log("forceFitColumns option is deprecated - use autosizeColsMode");
      }
    }

    function setData(newData, scrollToTop) {
      data = newData;
      invalidateAllRows();
      updateRowCount();
      if (scrollToTop) {
        scrollTo(0);
      }
    }

    function getData() {
      return data;
    }

    function getDataLength() {
      if (data.getLength) {
        return data.getLength();
      } else {
        return data && data.length || 0;
      }
    }

    function getDataLengthIncludingAddNew() {
      return getDataLength() + (!options.enableAddRow ? 0
        : (!pagingActive || pagingIsLastPage ? 1 : 0)
      );
    }

    function getDataItem(i) {
      if (data.getItem) {
        return data.getItem(i);
      } else {
        return data[i];
      }
    }

    function getTopPanel() {
      return $topPanel[0];
    }

    function setTopPanelVisibility(visible, animate) {
      var animated = (animate === false) ? false : true;

      if (options.showTopPanel != visible) {
        options.showTopPanel = visible;
        if (visible) {
          if (animated) {
            $topPanelScroller.slideDown("fast", resizeCanvas);
          } else {
            $topPanelScroller.show();
            resizeCanvas();
          }
        } else {
          if (animated) {
            $topPanelScroller.slideUp("fast", resizeCanvas);
          } else {
            $topPanelScroller.hide();
            resizeCanvas();
          }
        }
      }
    }

    function setHeaderRowVisibility(visible, animate) {
      var animated = (animate === false) ? false : true;

      if (options.showHeaderRow != visible) {
        options.showHeaderRow = visible;
        if (visible) {
          if (animated) {
            $headerRowScroller.slideDown("fast", resizeCanvas);
          } else {
            $headerRowScroller.show();
            resizeCanvas();
          }
        } else {
          if (animated) {
            $headerRowScroller.slideUp("fast", resizeCanvas);
          } else {
            $headerRowScroller.hide();
            resizeCanvas();
          }
        }
      }
    }

    function setColumnHeaderVisibility(visible, animate) {
      if (options.showColumnHeader != visible) {
        options.showColumnHeader = visible;
        if (visible) {
          if (animate) {
            $headerScroller.slideDown("fast", resizeCanvas);
          } else {
            $headerScroller.show();
            resizeCanvas();
          }
        } else {
          if (animate) {
            $headerScroller.slideUp("fast", resizeCanvas);
          } else {
            $headerScroller.hide();
            resizeCanvas();
          }
        }
      }
    }

    function setFooterRowVisibility(visible, animate) {
      var animated = (animate === false) ? false : true;

      if (options.showFooterRow != visible) {
        options.showFooterRow = visible;
        if (visible) {
          if (animated) {
            $footerRowScroller.slideDown("fast", resizeCanvas);
          } else {
            $footerRowScroller.show();
            resizeCanvas();
          }
        } else {
          if (animated) {
            $footerRowScroller.slideUp("fast", resizeCanvas);
          } else {
            $footerRowScroller.hide();
            resizeCanvas();
          }
        }
      }
    }

    function setPreHeaderPanelVisibility(visible, animate) {
      var animated = (animate === false) ? false : true;

      if (options.showPreHeaderPanel != visible) {
        options.showPreHeaderPanel = visible;
        if (visible) {
          if (animated) {
            $preHeaderPanelScroller.slideDown("fast", resizeCanvas);
            $preHeaderPanelScrollerR.slideDown("fast", resizeCanvas);
          } else {
            $preHeaderPanelScroller.show();
            $preHeaderPanelScrollerR.show();
            resizeCanvas();
          }
        } else {
          if (animated) {
            $preHeaderPanelScroller.slideUp("fast", resizeCanvas);
            $preHeaderPanelScrollerR.slideUp("fast", resizeCanvas);
          } else {
            $preHeaderPanelScroller.hide();
            $preHeaderPanelScrollerR.hide();
            resizeCanvas();
          }
        }
      }
    }

    function getContainerNode() {
      return $container.get(0);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Rendering / Scrolling

    function getRowTop(row) {
      return options.rowHeight * row - offset;
    }

    function getRowFromPosition(y) {
      return Math.floor((y + offset) / options.rowHeight);
    }

    function scrollTo(y) {
      y = Math.max(y, 0);
      y = Math.min(y, th - $viewportScrollContainerY.height() + ((viewportHasHScroll || hasFrozenColumns()) ? scrollbarDimensions.height : 0));

      var oldOffset = offset;

      page = Math.min(n - 1, Math.floor(y / ph));
      offset = Math.round(page * cj);
      var newScrollTop = y - offset;

      if (offset != oldOffset) {
        var range = getVisibleRange(newScrollTop);
        cleanupRows(range);
        updateRowPositions();
      }

      if (prevScrollTop != newScrollTop) {
        vScrollDir = (prevScrollTop + oldOffset < newScrollTop + offset) ? 1 : -1;
        lastRenderedScrollTop = ( scrollTop = prevScrollTop = newScrollTop );

        if (hasFrozenColumns()) {
          $viewportTopL[0].scrollTop = newScrollTop;
        }

        if (hasFrozenRows) {
          $viewportBottomL[0].scrollTop = $viewportBottomR[0].scrollTop = newScrollTop;
        }

        $viewportScrollContainerY[0].scrollTop = newScrollTop;

        trigger(self.onViewportChanged, {});
      }
    }

    function defaultFormatter(row, cell, value, columnDef, dataContext, grid) {
      if (value == null) {
        return "";
      } else {
        return (value + "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
      }
    }

    function getFormatter(row, column) {
      var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);

      // look up by id, then index
      var columnOverrides = rowMetadata &&
          rowMetadata.columns &&
          (rowMetadata.columns[column.id] || rowMetadata.columns[getColumnIndex(column.id)]);

      return (columnOverrides && columnOverrides.formatter) ||
          (rowMetadata && rowMetadata.formatter) ||
          column.formatter ||
          (options.formatterFactory && options.formatterFactory.getFormatter(column)) ||
          options.defaultFormatter;
    }

    function getEditor(row, cell) {
      var column = columns[cell];
      var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
      var columnMetadata = rowMetadata && rowMetadata.columns;

      if (columnMetadata && columnMetadata[column.id] && columnMetadata[column.id].editor !== undefined) {
        return columnMetadata[column.id].editor;
      }
      if (columnMetadata && columnMetadata[cell] && columnMetadata[cell].editor !== undefined) {
        return columnMetadata[cell].editor;
      }

      return column.editor || (options.editorFactory && options.editorFactory.getEditor(column));
    }

    function getDataItemValueForColumn(item, columnDef) {
      if (options.dataItemColumnValueExtractor) {
        return options.dataItemColumnValueExtractor(item, columnDef);
      }
      return item[columnDef.field];
    }

    function appendRowHtml(stringArrayL, stringArrayR, row, range, dataLength) {
      var d = getDataItem(row);
      var dataLoading = row < dataLength && !d;
      var rowCss = "slick-row" +
          (hasFrozenRows && row <= options.frozenRow? ' frozen': '') +
          (dataLoading ? " loading" : "") +
          (row === activeRow && options.showCellSelection ? " active" : "") +
          (row % 2 == 1 ? " odd" : " even");

      if (!d) {
        rowCss += " " + options.addNewRowCssClass;
      }

      var metadata = data.getItemMetadata && data.getItemMetadata(row);

      if (metadata && metadata.cssClasses) {
        rowCss += " " + metadata.cssClasses;
      }

      var frozenRowOffset = getFrozenRowOffset(row);

      var rowHtml = "<div class='ui-widget-content " + rowCss + "' style='top:"
        + (getRowTop(row) - frozenRowOffset )
        + "px'>";

      stringArrayL.push(rowHtml);

      if (hasFrozenColumns()) {
        stringArrayR.push(rowHtml);
      }

      var colspan, m;
      for (var i = 0, ii = columns.length; i < ii; i++) {
        m = columns[i];
        colspan = 1;
        if (metadata && metadata.columns) {
          var columnData = metadata.columns[m.id] || metadata.columns[i];
          colspan = (columnData && columnData.colspan) || 1;
          if (colspan === "*") {
            colspan = ii - i;
          }
        }

        // Do not render cells outside of the viewport.
        if (columnPosRight[Math.min(ii - 1, i + colspan - 1)] > range.leftPx) {
          if (!m.alwaysRenderColumn && columnPosLeft[i] > range.rightPx) {
            // All columns to the right are outside the range.
            break;
          }

          if (hasFrozenColumns() && ( i > options.frozenColumn )) {
            appendCellHtml(stringArrayR, row, i, colspan, d);
          } else {
            appendCellHtml(stringArrayL, row, i, colspan, d);
          }
        } else if (m.alwaysRenderColumn || (hasFrozenColumns() && i <= options.frozenColumn)) {
          appendCellHtml(stringArrayL, row, i, colspan, d);
        }

        if (colspan > 1) {
          i += (colspan - 1);
        }
      }

      stringArrayL.push("</div>");

      if (hasFrozenColumns()) {
        stringArrayR.push("</div>");
      }
    }

    function appendCellHtml(stringArray, row, cell, colspan, item) {
      // stringArray: stringBuilder containing the HTML parts
      // row, cell: row and column index
      // colspan: HTML colspan
      // item: grid data for row

      var m = columns[cell];
      var cellCss = "slick-cell l" + cell + " r" + Math.min(columns.length - 1, cell + colspan - 1) +
          (m.cssClass ? " " + m.cssClass : "");

      if (hasFrozenColumns() && cell <= options.frozenColumn) {
        cellCss += (" frozen");
      }

      if (row === activeRow && cell === activeCell && options.showCellSelection) {
        cellCss += (" active");
      }

      // TODO:  merge them together in the setter
      for (var key in cellCssClasses) {
        if (cellCssClasses[key][row] && cellCssClasses[key][row][m.id]) {
          cellCss += (" " + cellCssClasses[key][row][m.id]);
        }
      }

      var value = null, formatterResult = '';
      if (item) {
        value = getDataItemValueForColumn(item, m);
        formatterResult =  getFormatter(row, m)(row, cell, value, m, item, self);
        if (formatterResult === null || formatterResult === undefined) { formatterResult = ''; }
      }

      // get addl css class names from object type formatter return and from string type return of onBeforeAppendCell
      var addlCssClasses = trigger(self.onBeforeAppendCell, { row: row, cell: cell, value: value, dataContext: item }) || '';
      addlCssClasses += (formatterResult && formatterResult.addClasses ? (addlCssClasses ? ' ' : '') + formatterResult.addClasses : '');
      var toolTip = formatterResult && formatterResult.toolTip ? "title='" + formatterResult.toolTip + "'" : '';

      var customAttrStr = '';
      if(m.hasOwnProperty('cellAttrs') && m.cellAttrs instanceof Object) {
        for (var key in m.cellAttrs) {
          if (m.cellAttrs.hasOwnProperty(key)) {
            customAttrStr += ' ' + key + '="' + m.cellAttrs[key] + '" ';
          }
        }
      }

      stringArray.push("<div class='" + cellCss + (addlCssClasses ? ' ' + addlCssClasses : '') + "' " + toolTip + customAttrStr + ">");

      // if there is a corresponding row (if not, this is the Add New row or this data hasn't been loaded yet)
      if (item) {
        stringArray.push(Object.prototype.toString.call(formatterResult)  !== '[object Object]' ? formatterResult : formatterResult.text);
      }

      stringArray.push("</div>");

      rowsCache[row].cellRenderQueue.push(cell);
      rowsCache[row].cellColSpans[cell] = colspan;
    }


    function cleanupRows(rangeToKeep) {
      for (var i in rowsCache) {
        var removeFrozenRow = true;

        if (hasFrozenRows
          && ( ( options.frozenBottom && i >= actualFrozenRow ) // Frozen bottom rows
            || ( !options.frozenBottom && i <= actualFrozenRow ) // Frozen top rows
            )
          ) {
          removeFrozenRow = false;
        }

        if (( ( i = parseInt(i, 10)) !== activeRow )
          && ( i < rangeToKeep.top || i > rangeToKeep.bottom )
          && ( removeFrozenRow )
          ) {
          removeRowFromCache(i);
        }
      }
      if (options.enableAsyncPostRenderCleanup) { startPostProcessingCleanup(); }
    }

    function invalidate() {
      updateRowCount();
      invalidateAllRows();
      render();
    }

    function invalidateAllRows() {
      if (currentEditor) {
        makeActiveCellNormal();
      }
      for (var row in rowsCache) {
        removeRowFromCache(row);
      }
      if (options.enableAsyncPostRenderCleanup) { startPostProcessingCleanup(); }
    }

    function queuePostProcessedRowForCleanup(cacheEntry, postProcessedRow, rowIdx) {
      postProcessgroupId++;

      // store and detach node for later async cleanup
      for (var columnIdx in postProcessedRow) {
        if (postProcessedRow.hasOwnProperty(columnIdx)) {
          postProcessedCleanupQueue.push({
            actionType: 'C',
            groupId: postProcessgroupId,
            node: cacheEntry.cellNodesByColumnIdx[ columnIdx | 0],
            columnIdx: columnIdx | 0,
            rowIdx: rowIdx
          });
        }
      }
      postProcessedCleanupQueue.push({
        actionType: 'R',
        groupId: postProcessgroupId,
        node: cacheEntry.rowNode
      });
      cacheEntry.rowNode.detach();
    }

    function queuePostProcessedCellForCleanup(cellnode, columnIdx, rowIdx) {
      postProcessedCleanupQueue.push({
        actionType: 'C',
        groupId: postProcessgroupId,
        node: cellnode,
        columnIdx: columnIdx,
        rowIdx: rowIdx
      });
      $(cellnode).detach();
    }

    function removeRowFromCache(row) {
      var cacheEntry = rowsCache[row];
      if (!cacheEntry) {
        return;
      }

      if (options.enableAsyncPostRenderCleanup && postProcessedRows[row]) {
        queuePostProcessedRowForCleanup(cacheEntry, postProcessedRows[row], row);
      } else {
        cacheEntry.rowNode.each(function() {
          if (this.parentElement) {
            this.parentElement.removeChild(this);
          }
        });
      }

      delete rowsCache[row];
      delete postProcessedRows[row];
      renderedRows--;
      counter_rows_removed++;
    }

    function invalidateRows(rows) {
      var i, rl;
      if (!rows || !rows.length) {
        return;
      }
      vScrollDir = 0;
      rl = rows.length;
      for (i = 0;  i < rl; i++) {
        if (currentEditor && activeRow === rows[i]) {
          makeActiveCellNormal();
        }
        if (rowsCache[rows[i]]) {
          removeRowFromCache(rows[i]);
        }
      }
      if (options.enableAsyncPostRenderCleanup) { startPostProcessingCleanup(); }
    }

    function invalidateRow(row) {
      if (!row && row !== 0) { return; }
      invalidateRows([row]);
    }

    function applyFormatResultToCellNode(formatterResult, cellNode, suppressRemove) {
        if (formatterResult === null || formatterResult === undefined) { formatterResult = ''; }
        if (Object.prototype.toString.call(formatterResult)  !== '[object Object]') {
          cellNode.innerHTML = sanitizeHtmlString(formatterResult);
          return;
        }
        cellNode.innerHTML = sanitizeHtmlString(formatterResult.text);
        if (formatterResult.removeClasses && !suppressRemove) {
          $(cellNode).removeClass(formatterResult.removeClasses);
        }
        if (formatterResult.addClasses) {
          $(cellNode).addClass(formatterResult.addClasses);
        }
        if (formatterResult.toolTip) {
          $(cellNode).attr("title", formatterResult.toolTip);
        }
    }

    function updateCell(row, cell) {
      var cellNode = getCellNode(row, cell);
      if (!cellNode) {
        return;
      }

      var m = columns[cell], d = getDataItem(row);
      if (currentEditor && activeRow === row && activeCell === cell) {
        currentEditor.loadValue(d);
      } else {
        var formatterResult =  d ? getFormatter(row, m)(row, cell, getDataItemValueForColumn(d, m), m, d, self) : "";
        applyFormatResultToCellNode(formatterResult, cellNode);
        invalidatePostProcessingResults(row);
      }
    }

    function updateRow(row) {
      var cacheEntry = rowsCache[row];
      if (!cacheEntry) {
        return;
      }

      ensureCellNodesInRowsCache(row);

      var formatterResult, d = getDataItem(row);

      for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
        if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
          continue;
        }

        columnIdx = columnIdx | 0;
        var m = columns[columnIdx],
            node = cacheEntry.cellNodesByColumnIdx[columnIdx][0];

        if (row === activeRow && columnIdx === activeCell && currentEditor) {
          currentEditor.loadValue(d);
        } else if (d) {
          formatterResult =  getFormatter(row, m)(row, columnIdx, getDataItemValueForColumn(d, m), m, d, self);
          applyFormatResultToCellNode(formatterResult, node);
        } else {
          node.innerHTML = "";
        }
      }

      invalidatePostProcessingResults(row);
    }

    function getViewportHeight() {
      if (!options.autoHeight || options.frozenColumn != -1) {
        topPanelH = ( options.showTopPanel ) ? options.topPanelHeight + getVBoxDelta($topPanelScroller) : 0;
        headerRowH = ( options.showHeaderRow ) ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0;
        footerRowH = ( options.showFooterRow ) ? options.footerRowHeight + getVBoxDelta($footerRowScroller) : 0;
      }
      if (options.autoHeight) {
        var fullHeight = $paneHeaderL.outerHeight();
        fullHeight += ( options.showHeaderRow ) ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0;
        fullHeight += ( options.showFooterRow ) ? options.footerRowHeight + getVBoxDelta($footerRowScroller) : 0;
        fullHeight += (getCanvasWidth() > viewportW) ? scrollbarDimensions.height : 0;

        viewportH = options.rowHeight
          * getDataLengthIncludingAddNew()
          + ( ( options.frozenColumn == -1 ) ? fullHeight : 0 );
      } else {
        var columnNamesH = ( options.showColumnHeader ) ? parseFloat($.css($headerScroller[0], "height"))
          + getVBoxDelta($headerScroller) : 0;
        var preHeaderH = (options.createPreHeaderPanel && options.showPreHeaderPanel) ? options.preHeaderPanelHeight + getVBoxDelta($preHeaderPanelScroller) : 0;

        viewportH = parseFloat($.css($container[0], "height", true))
          - parseFloat($.css($container[0], "paddingTop", true))
          - parseFloat($.css($container[0], "paddingBottom", true))
          - columnNamesH
          - topPanelH
          - headerRowH
          - footerRowH
          - preHeaderH;
      }

      numVisibleRows = Math.ceil(viewportH / options.rowHeight);
      return viewportH;
    }

    function getViewportWidth() {
      viewportW = parseFloat($container.width());
    }

    function resizeCanvas() {
      if (!initialized) { return; }
      paneTopH = 0;
      paneBottomH = 0;
      viewportTopH = 0;
      viewportBottomH = 0;

      getViewportWidth();
      getViewportHeight();

      // Account for Frozen Rows
      if (hasFrozenRows) {
        if (options.frozenBottom) {
          paneTopH = viewportH - frozenRowsHeight - scrollbarDimensions.height;
          paneBottomH = frozenRowsHeight + scrollbarDimensions.height;
        } else {
          paneTopH = frozenRowsHeight;
          paneBottomH = viewportH - frozenRowsHeight;
        }
      } else {
        paneTopH = viewportH;
      }

      // The top pane includes the top panel and the header row
      paneTopH += topPanelH + headerRowH + footerRowH;

      if (hasFrozenColumns() && options.autoHeight) {
        paneTopH += scrollbarDimensions.height;
      }

      // The top viewport does not contain the top panel or header row
      viewportTopH = paneTopH - topPanelH - headerRowH - footerRowH;

      if (options.autoHeight) {
        if (hasFrozenColumns()) {
          $container.height(
              paneTopH
              + parseFloat($.css($headerScrollerL[0], "height"))
          );
        }

        $paneTopL.css('position', 'relative');
      }

      $paneTopL.css({
        'top': $paneHeaderL.height() || (options.showHeaderRow ? options.headerRowHeight : 0) + (options.showPreHeaderPanel ? options.preHeaderPanelHeight : 0),
        'height': paneTopH
      });

      var paneBottomTop = $paneTopL.position().top
        + paneTopH;

      if (!options.autoHeight) {
        $viewportTopL.height(viewportTopH);
      }

      if (hasFrozenColumns()) {
        $paneTopR.css({
          'top': $paneHeaderL.height(), 'height': paneTopH
        });

        $viewportTopR.height(viewportTopH);

        if (hasFrozenRows) {
          $paneBottomL.css({
            'top': paneBottomTop, 'height': paneBottomH
          });

          $paneBottomR.css({
            'top': paneBottomTop, 'height': paneBottomH
          });

          $viewportBottomR.height(paneBottomH);
        }
      } else {
        if (hasFrozenRows) {
          $paneBottomL.css({
            'width': '100%', 'height': paneBottomH
          });

          $paneBottomL.css('top', paneBottomTop);
        }
      }

      if (hasFrozenRows) {
        $viewportBottomL.height(paneBottomH);

        if (options.frozenBottom) {
          $canvasBottomL.height(frozenRowsHeight);

          if (hasFrozenColumns()) {
            $canvasBottomR.height(frozenRowsHeight);
          }
        } else {
          $canvasTopL.height(frozenRowsHeight);

          if (hasFrozenColumns()) {
            $canvasTopR.height(frozenRowsHeight);
          }
        }
      } else {
        $viewportTopR.height(viewportTopH);
      }

      if (!scrollbarDimensions || !scrollbarDimensions.width) {
        scrollbarDimensions = measureScrollbar();
      }

      if (options.autosizeColsMode === Slick.GridAutosizeColsMode.LegacyForceFit) {
        autosizeColumns();
      }

      updateRowCount();
      handleScroll();
      // Since the width has changed, force the render() to reevaluate virtually rendered cells.
      lastRenderedScrollLeft = -1;
      render();
    }

    function updatePagingStatusFromView( pagingInfo ) {
        pagingActive = (pagingInfo.pageSize !== 0);
        pagingIsLastPage = (pagingInfo.pageNum == pagingInfo.totalPages - 1);
    }

    function updateRowCount() {
      if (!initialized) { return; }

      var dataLength = getDataLength();
      var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
      var numberOfRows = 0;
      var oldH = ( hasFrozenRows && !options.frozenBottom ) ? $canvasBottomL.height() : $canvasTopL.height();

      if (hasFrozenRows ) {
        var numberOfRows = getDataLength() - options.frozenRow;
      } else {
        var numberOfRows = dataLengthIncludingAddNew + (options.leaveSpaceForNewRows ? numVisibleRows - 1 : 0);
      }

      var tempViewportH = $viewportScrollContainerY.height();
      var oldViewportHasVScroll = viewportHasVScroll;
      // with autoHeight, we do not need to accommodate the vertical scroll bar
      viewportHasVScroll = options.alwaysShowVerticalScroll || !options.autoHeight && (numberOfRows * options.rowHeight > tempViewportH);

      makeActiveCellNormal();

      // remove the rows that are now outside of the data range
      // this helps avoid redundant calls to .removeRow() when the size of the data decreased by thousands of rows
      var r1 = dataLength - 1;
      for (var i in rowsCache) {
        if (i > r1) {
          removeRowFromCache(i);
        }
      }
      if (options.enableAsyncPostRenderCleanup) { startPostProcessingCleanup(); }

      if (activeCellNode && activeRow > r1) {
        resetActiveCell();
      }

      var oldH = h;
      if (options.autoHeight) {
        h =  options.rowHeight * numberOfRows;
      } else {
        th = Math.max(options.rowHeight * numberOfRows, tempViewportH - scrollbarDimensions.height);
        if (th < maxSupportedCssHeight) {
          // just one page
          h = ph = th;
          n = 1;
          cj = 0;
        } else {
          // break into pages
          h = maxSupportedCssHeight;
          ph = h / 100;
          n = Math.floor(th / ph);
          cj = (th - h) / (n - 1);
        }
      }

      if (h !== oldH) {
        if (hasFrozenRows && !options.frozenBottom) {
          $canvasBottomL.css("height", h);

          if (hasFrozenColumns()) {
            $canvasBottomR.css("height", h);
          }
        } else {
          $canvasTopL.css("height", h);
          $canvasTopR.css("height", h);
        }

        scrollTop = $viewportScrollContainerY[0].scrollTop;
      }

      var oldScrollTopInRange = (scrollTop + offset <= th - tempViewportH);

      if (th == 0 || scrollTop == 0) {
        page = offset = 0;
      } else if (oldScrollTopInRange) {
        // maintain virtual position
        scrollTo(scrollTop + offset);
      } else {
        // scroll to bottom
        scrollTo(th - tempViewportH);
      }

      if (h != oldH && options.autoHeight) {
        resizeCanvas();
      }

      if (options.autosizeColsMode === Slick.GridAutosizeColsMode.LegacyForceFit && oldViewportHasVScroll != viewportHasVScroll) {
        autosizeColumns();
      }
      updateCanvasWidth(false);
    }

    function getVisibleRange(viewportTop, viewportLeft) {
      if (viewportTop == null) {
        viewportTop = scrollTop;
      }
      if (viewportLeft == null) {
        viewportLeft = scrollLeft;
      }

      return {
        top: getRowFromPosition(viewportTop),
        bottom: getRowFromPosition(viewportTop + viewportH) + 1,
        leftPx: viewportLeft,
        rightPx: viewportLeft + viewportW
      };
    }

    function getRenderedRange(viewportTop, viewportLeft) {
      var range = getVisibleRange(viewportTop, viewportLeft);
      var buffer = Math.round(viewportH / options.rowHeight);
      var minBuffer = options.minRowBuffer;

      if (vScrollDir == -1) {
        range.top -= buffer;
        range.bottom += minBuffer;
      } else if (vScrollDir == 1) {
        range.top -= minBuffer;
        range.bottom += buffer;
      } else {
        range.top -= minBuffer;
        range.bottom += minBuffer;
      }

      range.top = Math.max(0, range.top);
      range.bottom = Math.min(getDataLengthIncludingAddNew() - 1, range.bottom);

      range.leftPx -= viewportW;
      range.rightPx += viewportW;

      range.leftPx = Math.max(0, range.leftPx);
      range.rightPx = Math.min(canvasWidth, range.rightPx);

      return range;
    }

    function ensureCellNodesInRowsCache(row) {
      var cacheEntry = rowsCache[row];
      if (cacheEntry) {
        if (cacheEntry.cellRenderQueue.length) {
          var $lastNode = cacheEntry.rowNode.children().last();
          while (cacheEntry.cellRenderQueue.length) {
            var columnIdx = cacheEntry.cellRenderQueue.pop();

            cacheEntry.cellNodesByColumnIdx[columnIdx] = $lastNode;
            $lastNode = $lastNode.prev();

            // Hack to retrieve the frozen columns because
            if ($lastNode.length === 0) {
              $lastNode = $(cacheEntry.rowNode[0]).children().last();
            }
          }
        }
      }
    }

    function cleanUpCells(range, row) {
      // Ignore frozen rows
      if (hasFrozenRows
        && ( ( options.frozenBottom && row > actualFrozenRow ) // Frozen bottom rows
          || ( row <= actualFrozenRow )                     // Frozen top rows
          )
        ) {
        return;
      }

      var totalCellsRemoved = 0;
      var cacheEntry = rowsCache[row];

      // Remove cells outside the range.
      var cellsToRemove = [];
      for (var i in cacheEntry.cellNodesByColumnIdx) {
        // I really hate it when people mess with Array.prototype.
        if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(i)) {
          continue;
        }

        // This is a string, so it needs to be cast back to a number.
        i = i | 0;

        // Ignore frozen columns
        if (i <= options.frozenColumn) {
          continue;
        }

        // Ignore alwaysRenderedColumns
        if (Array.isArray(columns) && columns[i] && columns[i].alwaysRenderColumn){
          continue;
        }

        var colspan = cacheEntry.cellColSpans[i];
        if (columnPosLeft[i] > range.rightPx ||
          columnPosRight[Math.min(columns.length - 1, i + colspan - 1)] < range.leftPx) {
          if (!(row == activeRow && i == activeCell)) {
            cellsToRemove.push(i);
          }
        }
      }

      var cellToRemove, cellNode;
      while ((cellToRemove = cellsToRemove.pop()) != null) {
        cellNode = cacheEntry.cellNodesByColumnIdx[cellToRemove][0];

        if (options.enableAsyncPostRenderCleanup && postProcessedRows[row] && postProcessedRows[row][cellToRemove]) {
          queuePostProcessedCellForCleanup(cellNode, cellToRemove, row);
        } else {
          cellNode.parentElement.removeChild(cellNode);
        }

        delete cacheEntry.cellColSpans[cellToRemove];
        delete cacheEntry.cellNodesByColumnIdx[cellToRemove];
        if (postProcessedRows[row]) {
          delete postProcessedRows[row][cellToRemove];
        }
        totalCellsRemoved++;
      }
    }

    function cleanUpAndRenderCells(range) {
      var cacheEntry;
      var stringArray = [];
      var processedRows = [];
      var cellsAdded;
      var totalCellsAdded = 0;
      var colspan;

      for (var row = range.top, btm = range.bottom; row <= btm; row++) {
        cacheEntry = rowsCache[row];
        if (!cacheEntry) {
          continue;
        }

        // cellRenderQueue populated in renderRows() needs to be cleared first
        ensureCellNodesInRowsCache(row);

        cleanUpCells(range, row);

        // Render missing cells.
        cellsAdded = 0;

        var metadata = data.getItemMetadata && data.getItemMetadata(row);
        metadata = metadata && metadata.columns;

        var d = getDataItem(row);

        // TODO:  shorten this loop (index? heuristics? binary search?)
        for (var i = 0, ii = columns.length; i < ii; i++) {
          // Cells to the right are outside the range.
          if (columnPosLeft[i] > range.rightPx) {
            break;
          }

          // Already rendered.
          if ((colspan = cacheEntry.cellColSpans[i]) != null) {
            i += (colspan > 1 ? colspan - 1 : 0);
            continue;
          }

          colspan = 1;
          if (metadata) {
            var columnData = metadata[columns[i].id] || metadata[i];
            colspan = (columnData && columnData.colspan) || 1;
            if (colspan === "*") {
              colspan = ii - i;
            }
          }

          if (columnPosRight[Math.min(ii - 1, i + colspan - 1)] > range.leftPx) {
            appendCellHtml(stringArray, row, i, colspan, d);
            cellsAdded++;
          }

          i += (colspan > 1 ? colspan - 1 : 0);
        }

        if (cellsAdded) {
          totalCellsAdded += cellsAdded;
          processedRows.push(row);
        }
      }

      if (!stringArray.length) {
        return;
      }

      var x = document.createElement("div");
      x.innerHTML = sanitizeHtmlString(stringArray.join(""));

      var processedRow;
      var node;
      while ((processedRow = processedRows.pop()) != null) {
        cacheEntry = rowsCache[processedRow];
        var columnIdx;
        while ((columnIdx = cacheEntry.cellRenderQueue.pop()) != null) {
          node = x.lastChild;

          if (hasFrozenColumns() && (columnIdx > options.frozenColumn)) {
            cacheEntry.rowNode[1].appendChild(node);
          } else {
            cacheEntry.rowNode[0].appendChild(node);
          }
          cacheEntry.cellNodesByColumnIdx[columnIdx] = $(node);
        }
      }
    }

    function renderRows(range) {
      var stringArrayL = [],
        stringArrayR = [],
        rows = [],
        needToReselectCell = false,
        dataLength = getDataLength();

      for (var i = range.top, ii = range.bottom; i <= ii; i++) {
        if (rowsCache[i] || ( hasFrozenRows && options.frozenBottom && i == getDataLength() )) {
          continue;
        }
        renderedRows++;
        rows.push(i);

        // Create an entry right away so that appendRowHtml() can
        // start populatating it.
        rowsCache[i] = {
          "rowNode": null,

          // ColSpans of rendered cells (by column idx).
          // Can also be used for checking whether a cell has been rendered.
          "cellColSpans": [],

          // Cell nodes (by column idx).  Lazy-populated by ensureCellNodesInRowsCache().
          "cellNodesByColumnIdx": [],

          // Column indices of cell nodes that have been rendered, but not yet indexed in
          // cellNodesByColumnIdx.  These are in the same order as cell nodes added at the
          // end of the row.
          "cellRenderQueue": []
        };

        appendRowHtml(stringArrayL, stringArrayR, i, range, dataLength);
        if (activeCellNode && activeRow === i) {
          needToReselectCell = true;
        }
        counter_rows_rendered++;
      }

      if (!rows.length) { return; }

      var x = document.createElement("div"),
        xRight = document.createElement("div");

      x.innerHTML = sanitizeHtmlString(stringArrayL.join(""));
      xRight.innerHTML = sanitizeHtmlString(stringArrayR.join(""));

      for (var i = 0, ii = rows.length; i < ii; i++) {
        if (( hasFrozenRows ) && ( rows[i] >= actualFrozenRow )) {
            if (hasFrozenColumns()) {
                rowsCache[rows[i]].rowNode = $()
                    .add($(x.firstChild))
                    .add($(xRight.firstChild));
                $canvasBottomL[0].appendChild(x.firstChild);
                $canvasBottomR[0].appendChild(xRight.firstChild);
            } else {
                rowsCache[rows[i]].rowNode = $()
                    .add($(x.firstChild));
                $canvasBottomL[0].appendChild(x.firstChild);
            }
        } else if (hasFrozenColumns()) {
            rowsCache[rows[i]].rowNode = $()
                .add($(x.firstChild))
                .add($(xRight.firstChild));
            $canvasTopL[0].appendChild(x.firstChild);
            $canvasTopR[0].appendChild(xRight.firstChild);
        } else {
            rowsCache[rows[i]].rowNode = $()
                .add($(x.firstChild));
            $canvasTopL[0].appendChild(x.firstChild);
        }
      }

      if (needToReselectCell) {
        activeCellNode = getCellNode(activeRow, activeCell);
      }
    }

    function startPostProcessing() {
      if (!options.enableAsyncPostRender) {
        return;
      }
      clearTimeout(h_postrender);
      h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
    }

    function startPostProcessingCleanup() {
      if (!options.enableAsyncPostRenderCleanup) {
        return;
      }
      clearTimeout(h_postrenderCleanup);
      h_postrenderCleanup = setTimeout(asyncPostProcessCleanupRows, options.asyncPostRenderCleanupDelay);
    }

    function invalidatePostProcessingResults(row) {
      // change status of columns to be re-rendered
      for (var columnIdx in postProcessedRows[row]) {
        if (postProcessedRows[row].hasOwnProperty(columnIdx)) {
          postProcessedRows[row][columnIdx] = 'C';
        }
      }
      postProcessFromRow = Math.min(postProcessFromRow, row);
      postProcessToRow = Math.max(postProcessToRow, row);
      startPostProcessing();
    }

    function updateRowPositions() {
      for (var row in rowsCache) {
        var rowNumber = row ? parseInt(row) : 0;
        rowsCache[rowNumber].rowNode[0].style.top = getRowTop(rowNumber) + "px";
      }
    }

    function render() {
      if (!initialized) { return; }

      scrollThrottle.dequeue();

      var visible = getVisibleRange();
      var rendered = getRenderedRange();

      // remove rows no longer in the viewport
      cleanupRows(rendered);

      // add new rows & missing cells in existing rows
      if (lastRenderedScrollLeft != scrollLeft) {

    	  if ( hasFrozenRows ) {

    		  var renderedFrozenRows = jQuery.extend(true, {}, rendered);

    		  if (options.frozenBottom) {

    			 renderedFrozenRows.top=actualFrozenRow;
    			 renderedFrozenRows.bottom=getDataLength();
    		  }
    		  else {

	             renderedFrozenRows.top=0;
	             renderedFrozenRows.bottom=options.frozenRow;
    		  }

    		  cleanUpAndRenderCells(renderedFrozenRows);
    	  }

          cleanUpAndRenderCells(rendered);
      }

      // render missing rows
      renderRows(rendered);

      // Render frozen rows
      if (hasFrozenRows) {
	      if (options.frozenBottom) {
	        renderRows({
	          top: actualFrozenRow, bottom: getDataLength() - 1, leftPx: rendered.leftPx, rightPx: rendered.rightPx
	        });
	      }
	      else {
	          renderRows({
	           top: 0, bottom: options.frozenRow - 1, leftPx: rendered.leftPx, rightPx: rendered.rightPx
	          });
	        }
      }

      postProcessFromRow = visible.top;
      postProcessToRow = Math.min(getDataLengthIncludingAddNew() - 1, visible.bottom);
      startPostProcessing();

      lastRenderedScrollTop = scrollTop;
      lastRenderedScrollLeft = scrollLeft;
      h_render = null;
      trigger(self.onRendered, { startRow: visible.top, endRow: visible.bottom, grid: self });
    }

    function handleHeaderScroll() {
      handleElementScroll($headerScrollContainer[0]);
    }

    function handleHeaderRowScroll() {
      var scrollLeft = $headerRowScrollContainer[0].scrollLeft;
      if (scrollLeft != $viewportScrollContainerX[0].scrollLeft) {
        $viewportScrollContainerX[0].scrollLeft = scrollLeft;
      }
    }

    function handleFooterRowScroll() {
      var scrollLeft = $footerRowScrollContainer[0].scrollLeft;
      if (scrollLeft != $viewportScrollContainerX[0].scrollLeft) {
        $viewportScrollContainerX[0].scrollLeft = scrollLeft;
      }
    }

    function handlePreHeaderPanelScroll() {
      handleElementScroll($preHeaderPanelScroller[0]);
    }

    function handleElementScroll(element) {
      var scrollLeft = element.scrollLeft;
      if (scrollLeft != $viewportScrollContainerX[0].scrollLeft) {
        $viewportScrollContainerX[0].scrollLeft = scrollLeft;
      }
    }

    function handleScroll() {
      scrollTop = $viewportScrollContainerY[0].scrollTop;
      scrollLeft = $viewportScrollContainerX[0].scrollLeft;
      return _handleScroll(false);
    }

    function _handleScroll(isMouseWheel) {
      var maxScrollDistanceY = $viewportScrollContainerY[0].scrollHeight - $viewportScrollContainerY[0].clientHeight;
      var maxScrollDistanceX = $viewportScrollContainerY[0].scrollWidth - $viewportScrollContainerY[0].clientWidth;

      // Protect against erroneous clientHeight/Width greater than scrollHeight/Width.
      // Sometimes seen in Chrome.
      maxScrollDistanceY = Math.max(0, maxScrollDistanceY);
      maxScrollDistanceX = Math.max(0, maxScrollDistanceX);

      // Ceiling the max scroll values
      if (scrollTop > maxScrollDistanceY) {
        scrollTop = maxScrollDistanceY;
      }
      if (scrollLeft > maxScrollDistanceX) {
        scrollLeft = maxScrollDistanceX;
      }

      var vScrollDist = Math.abs(scrollTop - prevScrollTop);
      var hScrollDist = Math.abs(scrollLeft - prevScrollLeft);

      if (hScrollDist) {
        prevScrollLeft = scrollLeft;

        $viewportScrollContainerX[0].scrollLeft = scrollLeft;
        $headerScrollContainer[0].scrollLeft = scrollLeft;
        $topPanelScroller[0].scrollLeft = scrollLeft;
        $headerRowScrollContainer[0].scrollLeft = scrollLeft;
        if (options.createFooterRow) {
          $footerRowScrollContainer[0].scrollLeft = scrollLeft;
        }
        if (options.createPreHeaderPanel) {
          if (hasFrozenColumns()) {
            $preHeaderPanelScrollerR[0].scrollLeft = scrollLeft;
          } else {
            $preHeaderPanelScroller[0].scrollLeft = scrollLeft;
          }
        }

        if (hasFrozenColumns()) {
          if (hasFrozenRows) {
            $viewportTopR[0].scrollLeft = scrollLeft;
          }
        } else {
          if (hasFrozenRows) {
            $viewportTopL[0].scrollLeft = scrollLeft;
          }
        }
      }

      if (vScrollDist) {
        vScrollDir = prevScrollTop < scrollTop ? 1 : -1;
        prevScrollTop = scrollTop;

        if (isMouseWheel) {
          $viewportScrollContainerY[0].scrollTop = scrollTop;
        }

        if (hasFrozenColumns()) {
          if (hasFrozenRows && !options.frozenBottom) {
            $viewportBottomL[0].scrollTop = scrollTop;
          } else {
            $viewportTopL[0].scrollTop = scrollTop;
          }
        }

        // switch virtual pages if needed
        if (vScrollDist < viewportH) {
          scrollTo(scrollTop + offset);
        } else {
          var oldOffset = offset;
          if (h == viewportH) {
            page = 0;
          } else {
            page = Math.min(n - 1, Math.floor(scrollTop * ((th - viewportH) / (h - viewportH)) * (1 / ph)));
          }
          offset = Math.round(page * cj);
          if (oldOffset != offset) {
            invalidateAllRows();
          }
        }
      }

      if (hScrollDist || vScrollDist) {
        var dx = Math.abs(lastRenderedScrollLeft - scrollLeft);
        var dy = Math.abs(lastRenderedScrollTop - scrollTop);
        if (dx > 20 || dy > 20) {
          // if rendering is forced or scrolling is small enough to be "easy", just render
          if (options.forceSyncScrolling || (dy < viewportH && dx < viewportW)) {
            render();
          } else {
            // otherwise, perform "difficult" renders at a capped frequency
            scrollThrottle.enqueue();
          }

          trigger(self.onViewportChanged, {});
        }
      }

      trigger(self.onScroll, {scrollLeft: scrollLeft, scrollTop: scrollTop});

      if (hScrollDist || vScrollDist) return true;
      return false;
    }

    /*
    limits the frequency at which the provided action is executed.
    call enqueue to execute the action - it will execute either immediately or, if it was executed less than minPeriod_ms in the past, as soon as minPeriod_ms has expired.
    call dequeue to cancel any pending action.
    */
    function ActionThrottle(action, minPeriod_ms) {

      var blocked = false;
      var queued = false;

      function enqueue() {
        if (!blocked) {
          blockAndExecute();
        } else {
          queued = true;
        }
      }

      function dequeue() {
        queued = false;
      }

      function blockAndExecute() {
        blocked = true;
        setTimeout(unblock, minPeriod_ms);
        action();
      }

      function unblock() {
        if (queued) {
          dequeue();
          blockAndExecute();
        } else {
          blocked = false;
        }
      }

      return {
        enqueue: enqueue,
        dequeue: dequeue
      };
    }

    function asyncPostProcessRows() {
      var dataLength = getDataLength();
      while (postProcessFromRow <= postProcessToRow) {
        var row = (vScrollDir >= 0) ? postProcessFromRow++ : postProcessToRow--;
        var cacheEntry = rowsCache[row];
        if (!cacheEntry || row >= dataLength) {
          continue;
        }

        if (!postProcessedRows[row]) {
          postProcessedRows[row] = {};
        }

        ensureCellNodesInRowsCache(row);
        for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
          if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
            continue;
          }

          columnIdx = columnIdx | 0;

          var m = columns[columnIdx];
          var processedStatus = postProcessedRows[row][columnIdx]; // C=cleanup and re-render, R=rendered
          if (m.asyncPostRender && processedStatus !== 'R') {
            var node = cacheEntry.cellNodesByColumnIdx[columnIdx];
            if (node) {
              m.asyncPostRender(node, row, getDataItem(row), m, (processedStatus === 'C'));
            }
            postProcessedRows[row][columnIdx] = 'R';
          }
        }

        h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
        return;
      }
    }

    function asyncPostProcessCleanupRows() {
      if (postProcessedCleanupQueue.length > 0) {
        var groupId = postProcessedCleanupQueue[0].groupId;

        // loop through all queue members with this groupID
        while (postProcessedCleanupQueue.length > 0 && postProcessedCleanupQueue[0].groupId == groupId) {
          var entry = postProcessedCleanupQueue.shift();
          if (entry.actionType == 'R') {
            $(entry.node).remove();
          }
          if (entry.actionType == 'C') {
            var column = columns[entry.columnIdx];
            if (column.asyncPostRenderCleanup && entry.node) {
              // cleanup must also remove element
              column.asyncPostRenderCleanup(entry.node, entry.rowIdx, column);
            }
          }
        }

        // call this function again after the specified delay
        h_postrenderCleanup = setTimeout(asyncPostProcessCleanupRows, options.asyncPostRenderCleanupDelay);
      }
    }

    function updateCellCssStylesOnRenderedRows(addedHash, removedHash) {
      var node, columnId, addedRowHash, removedRowHash;
      for (var row in rowsCache) {
        removedRowHash = removedHash && removedHash[row];
        addedRowHash = addedHash && addedHash[row];

        if (removedRowHash) {
          for (columnId in removedRowHash) {
            if (!addedRowHash || removedRowHash[columnId] != addedRowHash[columnId]) {
              node = getCellNode(row, getColumnIndex(columnId));
              if (node) {
                $(node).removeClass(removedRowHash[columnId]);
              }
            }
          }
        }

        if (addedRowHash) {
          for (columnId in addedRowHash) {
            if (!removedRowHash || removedRowHash[columnId] != addedRowHash[columnId]) {
              node = getCellNode(row, getColumnIndex(columnId));
              if (node) {
                $(node).addClass(addedRowHash[columnId]);
              }
            }
          }
        }
      }
    }

    function addCellCssStyles(key, hash) {
      if (cellCssClasses[key]) {
        throw new Error("SlickGrid addCellCssStyles: cell CSS hash with key '" + key + "' already exists.");
      }

      cellCssClasses[key] = hash;
      updateCellCssStylesOnRenderedRows(hash, null);

      trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash, "grid": self });
    }

    function removeCellCssStyles(key) {
      if (!cellCssClasses[key]) {
        return;
      }

      updateCellCssStylesOnRenderedRows(null, cellCssClasses[key]);
      delete cellCssClasses[key];

      trigger(self.onCellCssStylesChanged, { "key": key, "hash": null, "grid": self });
    }

    function setCellCssStyles(key, hash) {
      var prevHash = cellCssClasses[key];

      cellCssClasses[key] = hash;
      updateCellCssStylesOnRenderedRows(hash, prevHash);

      trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash, "grid": self });
    }

    function getCellCssStyles(key) {
      return cellCssClasses[key];
    }

    function flashCell(row, cell, speed) {
      speed = speed || 100;

      function toggleCellClass($cell, times) {
        if (!times) {
          return;
        }

        setTimeout(function () {
          $cell.queue(function () {
            $cell.toggleClass(options.cellFlashingCssClass).dequeue();
            toggleCellClass($cell, times - 1);
          });
        }, speed);
      }

      if (rowsCache[row]) {
        var $cell = $(getCellNode(row, cell));

        toggleCellClass($cell, 4);
      }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Interactivity

    function handleMouseWheel(e, delta, deltaX, deltaY) {
      scrollTop = Math.max(0, $viewportScrollContainerY[0].scrollTop - (deltaY * options.rowHeight));
      scrollLeft = $viewportScrollContainerX[0].scrollLeft + (deltaX * 10);
      var handled = _handleScroll(true);
      if (handled) e.preventDefault();
    }

    function handleDragInit(e, dd) {
      var cell = getCellFromEvent(e);
      if (!cell || !cellExists(cell.row, cell.cell)) {
        return false;
      }

      var retval = trigger(self.onDragInit, dd, e);
      if (e.isImmediatePropagationStopped()) {
        return retval;
      }

      // if nobody claims to be handling drag'n'drop by stopping immediate propagation,
      // cancel out of it
      return false;
    }

    function handleDragStart(e, dd) {
      var cell = getCellFromEvent(e);
      if (!cell || !cellExists(cell.row, cell.cell)) {
        return false;
      }

      var retval = trigger(self.onDragStart, dd, e);
      if (e.isImmediatePropagationStopped()) {
        return retval;
      }

      return false;
    }

    function handleDrag(e, dd) {
      return trigger(self.onDrag, dd, e);
    }

    function handleDragEnd(e, dd) {
      trigger(self.onDragEnd, dd, e);
    }

    function handleKeyDown(e) {
      trigger(self.onKeyDown, {row: activeRow, cell: activeCell}, e);
      var handled = e.isImmediatePropagationStopped();
      var keyCode = Slick.keyCode;

      if (!handled) {
         if (!e.shiftKey && !e.altKey) {
            if (options.editable && currentEditor && currentEditor.keyCaptureList) {
               if (currentEditor.keyCaptureList.indexOf(e.which) > -1) {
                  return;
               }
            }
            if (e.which == keyCode.HOME) {
               handled = (e.ctrlKey) ? navigateTop() : navigateRowStart();
            } else if (e.which == keyCode.END) {
               handled = (e.ctrlKey) ? navigateBottom() : navigateRowEnd();
            }
         }
      }
      if (!handled) {
        if (!e.shiftKey && !e.altKey && !e.ctrlKey) {
          // editor may specify an array of keys to bubble
          if (options.editable && currentEditor && currentEditor.keyCaptureList) {
            if (currentEditor.keyCaptureList.indexOf( e.which ) > -1) {
                return;
            }
          }
          if (e.which == keyCode.ESCAPE) {
            if (!getEditorLock().isActive()) {
              return; // no editing mode to cancel, allow bubbling and default processing (exit without cancelling the event)
            }
            cancelEditAndSetFocus();
          } else if (e.which == keyCode.PAGE_DOWN) {
            navigatePageDown();
            handled = true;
          } else if (e.which == keyCode.PAGE_UP) {
            navigatePageUp();
            handled = true;
          } else if (e.which == keyCode.LEFT) {
            handled = navigateLeft();
          } else if (e.which == keyCode.RIGHT) {
            handled = navigateRight();
          } else if (e.which == keyCode.UP) {
            handled = navigateUp();
          } else if (e.which == keyCode.DOWN) {
            handled = navigateDown();
          } else if (e.which == keyCode.TAB) {
            handled = navigateNext();
          } else if (e.which == keyCode.ENTER) {
            if (options.editable) {
              if (currentEditor) {
                // adding new row
                if (activeRow === getDataLength()) {
                  navigateDown();
                } else {
                  commitEditAndSetFocus();
                }
              } else {
                if (getEditorLock().commitCurrentEdit()) {
                  makeActiveCellEditable(undefined, undefined, e);
                }
              }
            }
            handled = true;
          }
        } else if (e.which == keyCode.TAB && e.shiftKey && !e.ctrlKey && !e.altKey) {
          handled = navigatePrev();
        }
      }

      if (handled) {
        // the event has been handled so don't let parent element (bubbling/propagation) or browser (default) handle it
        e.stopPropagation();
        e.preventDefault();
        try {
          e.originalEvent.keyCode = 0; // prevent default behaviour for special keys in IE browsers (F3, F5, etc.)
        }
        // ignore exceptions - setting the original event's keycode throws access denied exception for "Ctrl"
        // (hitting control key only, nothing else), "Shift" (maybe others)
        catch (error) {
        }
      }
    }

    function handleClick(e) {
      if (!currentEditor) {
        // if this click resulted in some cell child node getting focus,
        // don't steal it back - keyboard events will still bubble up
        // IE9+ seems to default DIVs to tabIndex=0 instead of -1, so check for cell clicks directly.
	if (e.target != document.activeElement || $(e.target).hasClass("slick-cell")) {
          var selection = getTextSelection(); //store text-selection and restore it after
          setFocus();
          setTextSelection(selection);
        }
      }

      var cell = getCellFromEvent(e);
      if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
        return;
      }

      trigger(self.onClick, {row: cell.row, cell: cell.cell}, e);
      if (e.isImmediatePropagationStopped()) {
        return;
      }

      // this optimisation causes trouble - MLeibman #329
      //if ((activeCell != cell.cell || activeRow != cell.row) && canCellBeActive(cell.row, cell.cell)) {
      if (canCellBeActive(cell.row, cell.cell)) {
        if (!getEditorLock().isActive() || getEditorLock().commitCurrentEdit()) {
          scrollRowIntoView(cell.row, false);

          var preClickModeOn = (e.target && e.target.className === Slick.preClickClassName);
          var column = columns[cell.cell];
          var suppressActiveCellChangedEvent = !!(options.editable && column && column.editor && options.suppressActiveCellChangeOnEdit);
          setActiveCellInternal(getCellNode(cell.row, cell.cell), null, preClickModeOn, suppressActiveCellChangedEvent, e);
        }
      }
    }

    function handleContextMenu(e) {
      var $cell = $(e.target).closest(".slick-cell", $canvas);
      if ($cell.length === 0) {
        return;
      }

      // are we editing this cell?
      if (activeCellNode === $cell[0] && currentEditor !== null) {
        return;
      }

      trigger(self.onContextMenu, {}, e);
    }

    function handleDblClick(e) {
      var cell = getCellFromEvent(e);
      if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
        return;
      }

      trigger(self.onDblClick, {row: cell.row, cell: cell.cell}, e);
      if (e.isImmediatePropagationStopped()) {
        return;
      }

      if (options.editable) {
        gotoCell(cell.row, cell.cell, true, e);
      }
    }

    function handleHeaderMouseEnter(e) {
      trigger(self.onHeaderMouseEnter, {
        "column": $(this).data("column"),
        "grid": self
      }, e);
    }

    function handleHeaderMouseLeave(e) {
      trigger(self.onHeaderMouseLeave, {
        "column": $(this).data("column"),
        "grid": self
      }, e);
    }

    function handleHeaderRowMouseEnter(e) {
      trigger(self.onHeaderRowMouseEnter, {
        "column": $(this).data("column"),
        "grid": self
      }, e);
    }

    function handleHeaderRowMouseLeave(e) {
      trigger(self.onHeaderRowMouseLeave, {
        "column": $(this).data("column"),
        "grid": self
      }, e);
    }

    function handleHeaderContextMenu(e) {
      var $header = $(e.target).closest(".slick-header-column", ".slick-header-columns");
      var column = $header && $header.data("column");
      trigger(self.onHeaderContextMenu, {column: column}, e);
    }

    function handleHeaderClick(e) {
      if (columnResizeDragging) return;
      var $header = $(e.target).closest(".slick-header-column", ".slick-header-columns");
      var column = $header && $header.data("column");
      if (column) {
        trigger(self.onHeaderClick, {column: column}, e);
      }
    }

    function handleFooterContextMenu(e) {
      var $footer = $(e.target).closest(".slick-footerrow-column", ".slick-footerrow-columns");
      var column = $footer && $footer.data("column");
      trigger(self.onFooterContextMenu, {column: column}, e);
    }

    function handleFooterClick(e) {
      var $footer = $(e.target).closest(".slick-footerrow-column", ".slick-footerrow-columns");
      var column = $footer && $footer.data("column");
      trigger(self.onFooterClick, {column: column}, e);
    }

    function handleMouseEnter(e) {
      trigger(self.onMouseEnter, {}, e);
    }

    function handleMouseLeave(e) {
      trigger(self.onMouseLeave, {}, e);
    }

    function cellExists(row, cell) {
      return !(row < 0 || row >= getDataLength() || cell < 0 || cell >= columns.length);
    }

    function getCellFromPoint(x, y) {
      var row = getRowFromPosition(y);
      var cell = 0;

      var w = 0;
      for (var i = 0; i < columns.length && w < x; i++) {
        w += columns[i].width;
        cell++;
      }

      if (cell < 0) {
        cell = 0;
      }

      return {row: row, cell: cell - 1};
    }

    function getCellFromNode(cellNode) {
      // read column number from .l<columnNumber> CSS class
      var cls = /l\d+/.exec(cellNode.className);
      if (!cls) {
        throw new Error("SlickGrid getCellFromNode: cannot get cell - " + cellNode.className);
      }
      return parseInt(cls[0].substr(1, cls[0].length - 1), 10);
    }

    function getRowFromNode(rowNode) {
      for (var row in rowsCache) {
        for (var i in rowsCache[row].rowNode) {
          if (rowsCache[row].rowNode[i] === rowNode)
          return (row ? parseInt(row) : 0);
        }
      }
      return null;
    }

    function getFrozenRowOffset(row) {
      var offset =
        ( hasFrozenRows )
          ? ( options.frozenBottom )
          ? ( row >= actualFrozenRow )
          ? ( h < viewportTopH )
          ? ( actualFrozenRow * options.rowHeight )
          : h
          : 0
          : ( row >= actualFrozenRow )
          ? frozenRowsHeight
          : 0
          : 0;

      return offset;
    }

    function getCellFromEvent(e) {
      var row, cell;
      var $cell = $(e.target).closest(".slick-cell", $canvas);
      if (!$cell.length) {
        return null;
      }

      row = getRowFromNode($cell[0].parentNode);

      if (hasFrozenRows) {

        var c = $cell.parents('.grid-canvas').offset();

        var rowOffset = 0;
        var isBottom = $cell.parents('.grid-canvas-bottom').length;

        if (isBottom) {
          rowOffset = ( options.frozenBottom ) ? $canvasTopL.height() : frozenRowsHeight;
        }

        row = getCellFromPoint(e.clientX - c.left, e.clientY - c.top + rowOffset + $(document).scrollTop()).row;
      }

      cell = getCellFromNode($cell[0]);

      if (row == null || cell == null) {
        return null;
      } else {
        return {
          "row": row,
          "cell": cell
        };
      }
    }

    function getCellNodeBox(row, cell) {
      if (!cellExists(row, cell)) {
        return null;
      }

      var frozenRowOffset = getFrozenRowOffset(row);

      var y1 = getRowTop(row) - frozenRowOffset;
      var y2 = y1 + options.rowHeight - 1;
      var x1 = 0;
      for (var i = 0; i < cell; i++) {
        x1 += columns[i].width;

        if (options.frozenColumn == i) {
          x1 = 0;
        }
      }
      var x2 = x1 + columns[cell].width;

      return {
        top: y1,
        left: x1,
        bottom: y2,
        right: x2
      };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Cell switching

    function resetActiveCell() {
      setActiveCellInternal(null, false);
    }

    function setFocus() {
      if (tabbingDirection == -1) {
        $focusSink[0].focus();
      } else {
        $focusSink2[0].focus();
      }
    }

    function scrollCellIntoView(row, cell, doPaging) {
      scrollRowIntoView(row, doPaging);

      if (cell <= options.frozenColumn) {
        return;
      }

      var colspan = getColspan(row, cell);
      internalScrollColumnIntoView(columnPosLeft[cell], columnPosRight[cell + (colspan > 1 ? colspan - 1 : 0)]);
    }

    function internalScrollColumnIntoView(left, right) {
      var scrollRight = scrollLeft + $viewportScrollContainerX.width() - (viewportHasVScroll ? scrollbarDimensions.width : 0);

      if (left < scrollLeft) {
        $viewportScrollContainerX.scrollLeft(left);
        handleScroll();
        render();
      } else if (right > scrollRight) {
        $viewportScrollContainerX.scrollLeft(Math.min(left, right - $viewportScrollContainerX[0].clientWidth));
        handleScroll();
        render();
      }
    }

    function scrollColumnIntoView(cell) {
      internalScrollColumnIntoView(columnPosLeft[cell], columnPosRight[cell]);
    }

    function setActiveCellInternal(newCell, opt_editMode, preClickModeOn, suppressActiveCellChangedEvent, e) {
      if (activeCellNode !== null) {
        makeActiveCellNormal();
        $(activeCellNode).removeClass("active");
        if (rowsCache[activeRow]) {
          rowsCache[activeRow].rowNode.removeClass("active");
        }
      }

      var activeCellChanged = (activeCellNode !== newCell);
      activeCellNode = newCell;

      if (activeCellNode != null) {
        var $activeCellNode = $(activeCellNode);
        var $activeCellOffset = $activeCellNode.offset();

        var rowOffset = Math.floor($activeCellNode.parents('.grid-canvas').offset().top);
        var isBottom = $activeCellNode.parents('.grid-canvas-bottom').length;

        if (hasFrozenRows && isBottom) {
          rowOffset -= ( options.frozenBottom )
            ? $canvasTopL.height()
            : frozenRowsHeight;
        }

        var cell = getCellFromPoint($activeCellOffset.left, Math.ceil($activeCellOffset.top) - rowOffset);

        activeRow = cell.row;
        activeCell = activePosX = activeCell = activePosX = getCellFromNode(activeCellNode);

        if (opt_editMode == null) {
          opt_editMode = (activeRow == getDataLength()) || options.autoEdit;
        }

        if (options.showCellSelection) {
          $activeCellNode.addClass("active");
          if (rowsCache[activeRow]) {
            rowsCache[activeRow].rowNode.addClass("active");
          }
        }

        if (options.editable && opt_editMode && isCellPotentiallyEditable(activeRow, activeCell)) {
          clearTimeout(h_editorLoader);

          if (options.asyncEditorLoading) {
            h_editorLoader = setTimeout(function () {
              makeActiveCellEditable(undefined, preClickModeOn, e);
            }, options.asyncEditorLoadDelay);
          } else {
            makeActiveCellEditable(undefined, preClickModeOn, e);
          }
        }
      } else {
        activeRow = activeCell = null;
      }

      // this optimisation causes trouble - MLeibman #329
      //if (activeCellChanged) {
      if (!suppressActiveCellChangedEvent) { trigger(self.onActiveCellChanged, getActiveCell()); }
      //}
    }

    function clearTextSelection() {
      if (document.selection && document.selection.empty) {
        try {
          //IE fails here if selected element is not in dom
          document.selection.empty();
        } catch (e) { }
      } else if (window.getSelection) {
        var sel = window.getSelection();
        if (sel && sel.removeAllRanges) {
          sel.removeAllRanges();
        }
      }
    }

    function isCellPotentiallyEditable(row, cell) {
      var dataLength = getDataLength();
      // is the data for this row loaded?
      if (row < dataLength && !getDataItem(row)) {
        return false;
      }

      // are we in the Add New row?  can we create new from this cell?
      if (columns[cell].cannotTriggerInsert && row >= dataLength) {
        return false;
      }

      // does this cell have an editor?
      if (!getEditor(row, cell)) {
        return false;
      }

      return true;
    }

    function makeActiveCellNormal() {
      if (!currentEditor) {
        return;
      }
      trigger(self.onBeforeCellEditorDestroy, {editor: currentEditor});
      currentEditor.destroy();
      currentEditor = null;

      if (activeCellNode) {
        var d = getDataItem(activeRow);
        $(activeCellNode).removeClass("editable invalid");
        if (d) {
          var column = columns[activeCell];
          var formatter = getFormatter(activeRow, column);
          var formatterResult =  formatter(activeRow, activeCell, getDataItemValueForColumn(d, column), column, d, self);
          applyFormatResultToCellNode(formatterResult, activeCellNode);
          invalidatePostProcessingResults(activeRow);
        }
      }

      // if there previously was text selected on a page (such as selected text in the edit cell just removed),
      // IE can't set focus to anything else correctly
      if (navigator.userAgent.toLowerCase().match(/msie/)) {
        clearTextSelection();
      }

      getEditorLock().deactivate(editController);
    }

    function makeActiveCellEditable(editor, preClickModeOn, e) {
      if (!activeCellNode) {
        return;
      }
      if (!options.editable) {
        throw new Error("SlickGrid makeActiveCellEditable : should never get called when options.editable is false");
      }

      // cancel pending async call if there is one
      clearTimeout(h_editorLoader);

      if (!isCellPotentiallyEditable(activeRow, activeCell)) {
        return;
      }

      var columnDef = columns[activeCell];
      var item = getDataItem(activeRow);

      if (trigger(self.onBeforeEditCell, {row: activeRow, cell: activeCell, item: item, column: columnDef, target: 'grid' }) === false) {
        setFocus();
        return;
      }

      getEditorLock().activate(editController);
      $(activeCellNode).addClass("editable");

      var useEditor = editor || getEditor(activeRow, activeCell);

      // don't clear the cell if a custom editor is passed through
      if (!editor && !useEditor.suppressClearOnEdit) {
        activeCellNode.innerHTML = "";
      }

      var metadata = data.getItemMetadata && data.getItemMetadata(activeRow);
      metadata = metadata && metadata.columns;
      var columnMetaData = metadata && ( metadata[columnDef.id] || metadata[activeCell] );

      currentEditor = new useEditor({
        grid: self,
        gridPosition: absBox($container[0]),
        position: absBox(activeCellNode),
        container: activeCellNode,
        column: columnDef,
        columnMetaData: columnMetaData,
        item: item || {},
        event: e,
        commitChanges: commitEditAndSetFocus,
        cancelChanges: cancelEditAndSetFocus
      });

      if (item) {
        currentEditor.loadValue(item);
        if (preClickModeOn && currentEditor.preClick) {
          currentEditor.preClick();
        }
      }

      serializedEditorValue = currentEditor.serializeValue();

      if (currentEditor.position) {
        handleActiveCellPositionChange();
      }
    }

    function commitEditAndSetFocus() {
      // if the commit fails, it would do so due to a validation error
      // if so, do not steal the focus from the editor
      if (getEditorLock().commitCurrentEdit()) {
        setFocus();
        if (options.autoEdit) {
          navigateDown();
        }
      }
    }

    function cancelEditAndSetFocus() {
      if (getEditorLock().cancelCurrentEdit()) {
        setFocus();
      }
    }

    function absBox(elem) {
      var box = {
        top: elem.offsetTop,
        left: elem.offsetLeft,
        bottom: 0,
        right: 0,
        width: $(elem).outerWidth(),
        height: $(elem).outerHeight(),
        visible: true
      };
      box.bottom = box.top + box.height;
      box.right = box.left + box.width;

      // walk up the tree
      var offsetParent = elem.offsetParent;
      while ((elem = elem.parentNode) != document.body) {
        if (elem == null) break;

        if (box.visible && elem.scrollHeight != elem.offsetHeight && $(elem).css("overflowY") != "visible") {
          box.visible = box.bottom > elem.scrollTop && box.top < elem.scrollTop + elem.clientHeight;
        }

        if (box.visible && elem.scrollWidth != elem.offsetWidth && $(elem).css("overflowX") != "visible") {
          box.visible = box.right > elem.scrollLeft && box.left < elem.scrollLeft + elem.clientWidth;
        }

        box.left -= elem.scrollLeft;
        box.top -= elem.scrollTop;

        if (elem === offsetParent) {
          box.left += elem.offsetLeft;
          box.top += elem.offsetTop;
          offsetParent = elem.offsetParent;
        }

        box.bottom = box.top + box.height;
        box.right = box.left + box.width;
      }

      return box;
    }

    function getActiveCellPosition() {
      return absBox(activeCellNode);
    }

    function getGridPosition() {
      return absBox($container[0]);
    }

    function handleActiveCellPositionChange() {
      if (!activeCellNode) {
        return;
      }

      trigger(self.onActiveCellPositionChanged, {});

      if (currentEditor) {
        var cellBox = getActiveCellPosition();
        if (currentEditor.show && currentEditor.hide) {
          if (!cellBox.visible) {
            currentEditor.hide();
          } else {
            currentEditor.show();
          }
        }

        if (currentEditor.position) {
          currentEditor.position(cellBox);
        }
      }
    }

    function getCellEditor() {
      return currentEditor;
    }

    function getActiveCell() {
      if (!activeCellNode) {
        return null;
      } else {
        return {row: activeRow, cell: activeCell};
      }
    }

    function getActiveCellNode() {
      return activeCellNode;
    }

    //This get/set methods are used for keeping text-selection. These don't consider IE because they don't loose text-selection.
    //Fix for firefox selection. See https://github.com/mleibman/SlickGrid/pull/746/files
    function getTextSelection(){
      var textSelection = null;
      if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
          textSelection = selection.getRangeAt(0);
        }
      }
      return textSelection;
    }

    function setTextSelection(selection){
      if (window.getSelection && selection) {
        var target = window.getSelection();
        target.removeAllRanges();
        target.addRange(selection);
      }
    }

    function scrollRowIntoView(row, doPaging) {
	    if (!hasFrozenRows ||
	  	  ( !options.frozenBottom && row > actualFrozenRow - 1 ) ||
	  	  ( options.frozenBottom && row < actualFrozenRow - 1 ) ) {

	      var viewportScrollH = $viewportScrollContainerY.height();

	      // if frozen row on top
	      // subtract number of frozen row
	      var rowNumber = ( hasFrozenRows && !options.frozenBottom ? row - options.frozenRow : row );

	      var rowAtTop = rowNumber * options.rowHeight;
	      var rowAtBottom = (rowNumber + 1) * options.rowHeight
	        - viewportScrollH
	        + (viewportHasHScroll ? scrollbarDimensions.height : 0);

	      // need to page down?
	      if ((rowNumber + 1) * options.rowHeight > scrollTop + viewportScrollH + offset) {
	        scrollTo(doPaging ? rowAtTop : rowAtBottom);
	        render();
	      }
	      // or page up?
	      else if (rowNumber * options.rowHeight < scrollTop + offset) {
	        scrollTo(doPaging ? rowAtBottom : rowAtTop);
	        render();
	      }
	    }
    }

    function scrollRowToTop(row) {
      scrollTo(row * options.rowHeight);
      render();
    }

    function scrollPage(dir) {
      var deltaRows = dir * numVisibleRows;
        /// First fully visible row crosses the line with
        /// y == bottomOfTopmostFullyVisibleRow
      var bottomOfTopmostFullyVisibleRow = scrollTop + options.rowHeight - 1;
      scrollTo((getRowFromPosition(bottomOfTopmostFullyVisibleRow) + deltaRows) * options.rowHeight);
      render();

      if (options.enableCellNavigation && activeRow != null) {
        var row = activeRow + deltaRows;
        var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
        if (row >= dataLengthIncludingAddNew) {
          row = dataLengthIncludingAddNew - 1;
        }
        if (row < 0) {
          row = 0;
        }

        var cell = 0, prevCell = null;
        var prevActivePosX = activePosX;
        while (cell <= activePosX) {
          if (canCellBeActive(row, cell)) {
            prevCell = cell;
          }
          cell += getColspan(row, cell);
        }

        if (prevCell !== null) {
          setActiveCellInternal(getCellNode(row, prevCell));
          activePosX = prevActivePosX;
        } else {
          resetActiveCell();
        }
      }
    }

    function navigatePageDown() {
      scrollPage(1);
    }

    function navigatePageUp() {
       scrollPage(-1);
    }

    function navigateTop() {
       navigateToRow(0);
    }

    function navigateBottom() {
       navigateToRow(getDataLength()-1);
    }

    function navigateToRow(row) {
       var num_rows = getDataLength();
       if (!num_rows) return true;

       if (row < 0) row = 0;
       else if (row >= num_rows) row = num_rows - 1;

       scrollCellIntoView(row, 0, true);
       if (options.enableCellNavigation && activeRow != null) {
          var cell = 0, prevCell = null;
          var prevActivePosX = activePosX;
          while (cell <= activePosX) {
             if (canCellBeActive(row, cell)) {
                prevCell = cell;
             }
             cell += getColspan(row, cell);
          }

          if (prevCell !== null) {
             setActiveCellInternal(getCellNode(row, prevCell));
             activePosX = prevActivePosX;
          } else {
             resetActiveCell();
          }
       }
       return true;
    }

    function getColspan(row, cell) {
      var metadata = data.getItemMetadata && data.getItemMetadata(row);
      if (!metadata || !metadata.columns) {
        return 1;
      }

      var columnData = metadata.columns[columns[cell].id] || metadata.columns[cell];
      var colspan = (columnData && columnData.colspan);
      if (colspan === "*") {
        colspan = columns.length - cell;
      } else {
        colspan = colspan || 1;
      }

      return colspan;
    }

    function findFirstFocusableCell(row) {
      var cell = 0;
      while (cell < columns.length) {
        if (canCellBeActive(row, cell)) {
          return cell;
        }
        cell += getColspan(row, cell);
      }
      return null;
    }

    function findLastFocusableCell(row) {
      var cell = 0;
      var lastFocusableCell = null;
      while (cell < columns.length) {
        if (canCellBeActive(row, cell)) {
          lastFocusableCell = cell;
        }
        cell += getColspan(row, cell);
      }
      return lastFocusableCell;
    }

    function gotoRight(row, cell, posX) {
      if (cell >= columns.length) {
        return null;
      }

      do {
        cell += getColspan(row, cell);
      }
      while (cell < columns.length && !canCellBeActive(row, cell));

      if (cell < columns.length) {
        return {
          "row": row,
          "cell": cell,
          "posX": cell
        };
      }
      return null;
    }

    function gotoLeft(row, cell, posX) {
      if (cell <= 0) {
        return null;
      }

      var firstFocusableCell = findFirstFocusableCell(row);
      if (firstFocusableCell === null || firstFocusableCell >= cell) {
        return null;
      }

      var prev = {
        "row": row,
        "cell": firstFocusableCell,
        "posX": firstFocusableCell
      };
      var pos;
      while (true) {
        pos = gotoRight(prev.row, prev.cell, prev.posX);
        if (!pos) {
          return null;
        }
        if (pos.cell >= cell) {
          return prev;
        }
        prev = pos;
      }
    }

    function gotoDown(row, cell, posX) {
      var prevCell;
      var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
      while (true) {
        if (++row >= dataLengthIncludingAddNew) {
          return null;
        }

        prevCell = cell = 0;
        while (cell <= posX) {
          prevCell = cell;
          cell += getColspan(row, cell);
        }

        if (canCellBeActive(row, prevCell)) {
          return {
            "row": row,
            "cell": prevCell,
            "posX": posX
          };
        }
      }
    }

    function gotoUp(row, cell, posX) {
      var prevCell;
      while (true) {
        if (--row < 0) {
          return null;
        }

        prevCell = cell = 0;
        while (cell <= posX) {
          prevCell = cell;
          cell += getColspan(row, cell);
        }

        if (canCellBeActive(row, prevCell)) {
          return {
            "row": row,
            "cell": prevCell,
            "posX": posX
          };
        }
      }
    }

    function gotoNext(row, cell, posX) {
      if (row == null && cell == null) {
        row = cell = posX = 0;
        if (canCellBeActive(row, cell)) {
          return {
            "row": row,
            "cell": cell,
            "posX": cell
          };
        }
      }

      var pos = gotoRight(row, cell, posX);
      if (pos) {
        return pos;
      }

      var firstFocusableCell = null;
      var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();

      // if at last row, cycle through columns rather than get stuck in the last one
      if (row === dataLengthIncludingAddNew - 1) { row--; }

      while (++row < dataLengthIncludingAddNew) {
        firstFocusableCell = findFirstFocusableCell(row);
        if (firstFocusableCell !== null) {
          return {
            "row": row,
            "cell": firstFocusableCell,
            "posX": firstFocusableCell
          };
        }
      }
      return null;
    }

    function gotoPrev(row, cell, posX) {
      if (row == null && cell == null) {
        row = getDataLengthIncludingAddNew() - 1;
        cell = posX = columns.length - 1;
        if (canCellBeActive(row, cell)) {
          return {
            "row": row,
            "cell": cell,
            "posX": cell
          };
        }
      }

      var pos;
      var lastSelectableCell;
      while (!pos) {
        pos = gotoLeft(row, cell, posX);
        if (pos) {
          break;
        }
        if (--row < 0) {
          return null;
        }

        cell = 0;
        lastSelectableCell = findLastFocusableCell(row);
        if (lastSelectableCell !== null) {
          pos = {
            "row": row,
            "cell": lastSelectableCell,
            "posX": lastSelectableCell
          };
        }
      }
      return pos;
    }

    function gotoRowStart(row, cell, posX) {
       var newCell = findFirstFocusableCell(row);
       if (newCell === null) return null;

       return {
          "row": row,
          "cell": newCell,
          "posX": newCell
       };
    }

    function gotoRowEnd(row, cell, posX) {
       var newCell = findLastFocusableCell(row);
       if (newCell === null) return null;

       return {
          "row": row,
          "cell": newCell,
          "posX": newCell
       };
    }

    function navigateRight() {
      return navigate("right");
    }

    function navigateLeft() {
      return navigate("left");
    }

    function navigateDown() {
      return navigate("down");
    }

    function navigateUp() {
      return navigate("up");
    }

    function navigateNext() {
      return navigate("next");
    }

    function navigatePrev() {
       return navigate("prev");
    }

    function navigateRowStart() {
       return navigate("home");
    }

    function navigateRowEnd() {
       return navigate("end");
    }

    /**
     * @param {string} dir Navigation direction.
     * @return {boolean} Whether navigation resulted in a change of active cell.
     */
    function navigate(dir) {
      if (!options.enableCellNavigation) {
        return false;
      }

      if (!activeCellNode && dir != "prev" && dir != "next") {
        return false;
      }

      if (!getEditorLock().commitCurrentEdit()) {
        return true;
      }
      setFocus();

      var tabbingDirections = {
        "up": -1,
        "down": 1,
        "left": -1,
        "right": 1,
        "prev": -1,
        "next": 1,
        "home": -1,
        "end": 1
      };
      tabbingDirection = tabbingDirections[dir];

      var stepFunctions = {
        "up": gotoUp,
        "down": gotoDown,
        "left": gotoLeft,
        "right": gotoRight,
        "prev": gotoPrev,
        "next": gotoNext,
        "home": gotoRowStart,
        "end": gotoRowEnd
      };
      var stepFn = stepFunctions[dir];
      var pos = stepFn(activeRow, activeCell, activePosX);
      if (pos) {
        if (hasFrozenRows && options.frozenBottom & pos.row == getDataLength()) {
          return;
        }

        var isAddNewRow = (pos.row == getDataLength());

        if (( !options.frozenBottom && pos.row >= actualFrozenRow )
          || ( options.frozenBottom && pos.row < actualFrozenRow )
          ) {
          scrollCellIntoView(pos.row, pos.cell, !isAddNewRow && options.emulatePagingWhenScrolling);
        }
        setActiveCellInternal(getCellNode(pos.row, pos.cell));
        activePosX = pos.posX;
        return true;
      } else {
        setActiveCellInternal(getCellNode(activeRow, activeCell));
        return false;
      }
    }

    function getCellNode(row, cell) {
      if (rowsCache[row]) {
        ensureCellNodesInRowsCache(row);
        try {
          if (rowsCache[row].cellNodesByColumnIdx.length > cell) {
            return rowsCache[row].cellNodesByColumnIdx[cell][0];
          }
          else {
            return null;
          }
        } catch (e) {
          return rowsCache[row].cellNodesByColumnIdx[cell];
        }
      }
      return null;
    }

    function setActiveCell(row, cell, opt_editMode, preClickModeOn, suppressActiveCellChangedEvent) {
      if (!initialized) { return; }
      if (row > getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
        return;
      }

      if (!options.enableCellNavigation) {
        return;
      }

      scrollCellIntoView(row, cell, false);
      setActiveCellInternal(getCellNode(row, cell), opt_editMode, preClickModeOn, suppressActiveCellChangedEvent);
    }

    function setActiveRow(row, cell, suppressScrollIntoView) {
      if (!initialized) { return; }
      if (row > getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
        return;
      }

      activeRow = row;
      if (!suppressScrollIntoView) {
        scrollCellIntoView(row, cell || 0, false);
      }
    }

    function canCellBeActive(row, cell) {
      if (!options.enableCellNavigation || row >= getDataLengthIncludingAddNew() ||
          row < 0 || cell >= columns.length || cell < 0) {
        return false;
      }

      var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
      if (rowMetadata && typeof rowMetadata.focusable !== "undefined") {
        return !!rowMetadata.focusable;
      }

      var columnMetadata = rowMetadata && rowMetadata.columns;
      if (columnMetadata && columnMetadata[columns[cell].id] && typeof columnMetadata[columns[cell].id].focusable !== "undefined") {
        return !!columnMetadata[columns[cell].id].focusable;
      }
      if (columnMetadata && columnMetadata[cell] && typeof columnMetadata[cell].focusable !== "undefined") {
        return !!columnMetadata[cell].focusable;
      }

      return !!columns[cell].focusable;
    }

    function canCellBeSelected(row, cell) {
      if (row >= getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
        return false;
      }

      var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
      if (rowMetadata && typeof rowMetadata.selectable !== "undefined") {
        return !!rowMetadata.selectable;
      }

      var columnMetadata = rowMetadata && rowMetadata.columns && (rowMetadata.columns[columns[cell].id] || rowMetadata.columns[cell]);
      if (columnMetadata && typeof columnMetadata.selectable !== "undefined") {
        return !!columnMetadata.selectable;
      }

      return !!columns[cell].selectable;
    }

    function gotoCell(row, cell, forceEdit, e) {
      if (!initialized) { return; }
      if (!canCellBeActive(row, cell)) {
        return;
      }

      if (!getEditorLock().commitCurrentEdit()) {
        return;
      }

      scrollCellIntoView(row, cell, false);

      var newCell = getCellNode(row, cell);

      // if selecting the 'add new' row, start editing right away
      var column = columns[cell];
      var suppressActiveCellChangedEvent = !!(options.editable && column && column.editor && options.suppressActiveCellChangeOnEdit);
      setActiveCellInternal(newCell, (forceEdit || (row === getDataLength()) || options.autoEdit), null, suppressActiveCellChangedEvent, e);

      // if no editor was created, set the focus back on the grid
      if (!currentEditor) {
        setFocus();
      }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    // IEditor implementation for the editor lock

    function commitCurrentEdit() {
      var item = getDataItem(activeRow);
      var column = columns[activeCell];

      if (currentEditor) {
        if (currentEditor.isValueChanged()) {
          var validationResults = currentEditor.validate();

          if (validationResults.valid) {
            if (activeRow < getDataLength()) {
              var editCommand = {
                row: activeRow,
                cell: activeCell,
                editor: currentEditor,
                serializedValue: currentEditor.serializeValue(),
                prevSerializedValue: serializedEditorValue,
                execute: function () {
                  this.editor.applyValue(item, this.serializedValue);
                  updateRow(this.row);
                  trigger(self.onCellChange, {
                    command: 'execute',
                    row: this.row,
                    cell: this.cell,
                    item: item,
                    column: column
                  });
                },
                undo: function () {
                  this.editor.applyValue(item, this.prevSerializedValue);
                  updateRow(this.row);
                  trigger(self.onCellChange, {
                    command: 'undo',
                    row: this.row,
                    cell: this.cell,
                    item: item,
                    column: column
                  });
                }
              };

              if (options.editCommandHandler) {
                makeActiveCellNormal();
                options.editCommandHandler(item, column, editCommand);
              } else {
                editCommand.execute();
                makeActiveCellNormal();
              }

            } else {
              var newItem = {};
              currentEditor.applyValue(newItem, currentEditor.serializeValue());
              makeActiveCellNormal();
              trigger(self.onAddNewRow, {item: newItem, column: column});
            }

            // check whether the lock has been re-acquired by event handlers
            return !getEditorLock().isActive();
          } else {
            // Re-add the CSS class to trigger transitions, if any.
            $(activeCellNode).removeClass("invalid");
            $(activeCellNode).width();  // force layout
            $(activeCellNode).addClass("invalid");

            trigger(self.onValidationError, {
              editor: currentEditor,
              cellNode: activeCellNode,
              validationResults: validationResults,
              row: activeRow,
              cell: activeCell,
              column: column
            });

            currentEditor.focus();
            return false;
          }
        }

        makeActiveCellNormal();
      }
      return true;
    }

    function cancelCurrentEdit() {
      makeActiveCellNormal();
      return true;
    }

    function rowsToRanges(rows) {
      var ranges = [];
      var lastCell = columns.length - 1;
      for (var i = 0; i < rows.length; i++) {
        ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
      }
      return ranges;
    }

    function getSelectedRows() {
      if (!selectionModel) {
        throw new Error("SlickGrid Selection model is not set");
      }
      return selectedRows.slice(0);
    }

    function setSelectedRows(rows, caller) {
      if (!selectionModel) {
        throw new Error("SlickGrid Selection model is not set");
      }
      if (self && self.getEditorLock && !self.getEditorLock().isActive()) {
        selectionModel.setSelectedRanges(rowsToRanges(rows), caller || "SlickGrid.setSelectedRows");
      }
    }

    /** basic html sanitizer to avoid scripting attack */
    function sanitizeHtmlString(dirtyHtml) {
      var sanitizer = options.sanitizer || function (dirtyHtmlStr) {
        return dirtyHtmlStr.replace(/(\b)(on\S+)(\s*)=|javascript:([^>]*)[^>]*|(<\s*)(\/*)script([<>]*).*(<\s*)(\/*)script(>*)|(&lt;)(\/*)(script|script defer)(.*)(&gt;|&gt;">)/gi, '');
      }
      return typeof dirtyHtml === 'string' ? sanitizer(dirtyHtml) : dirtyHtml;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Debug

    this.debug = function () {
      var s = "";

      s += ("\n" + "counter_rows_rendered:  " + counter_rows_rendered);
      s += ("\n" + "counter_rows_removed:  " + counter_rows_removed);
      s += ("\n" + "renderedRows:  " + renderedRows);
      s += ("\n" + "numVisibleRows:  " + numVisibleRows);
      s += ("\n" + "maxSupportedCssHeight:  " + maxSupportedCssHeight);
      s += ("\n" + "n(umber of pages):  " + n);
      s += ("\n" + "(current) page:  " + page);
      s += ("\n" + "page height (ph):  " + ph);
      s += ("\n" + "vScrollDir:  " + vScrollDir);

      alert(s);
    };

    // a debug helper to be able to access private members
    this.eval = function (expr) {
      return eval(expr);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Public API

    $.extend(this, {
      "slickGridVersion": "2.4.44",

      // Events
      "onScroll": new Slick.Event(),
      "onBeforeSort": new Slick.Event(),
      "onSort": new Slick.Event(),
      "onHeaderMouseEnter": new Slick.Event(),
      "onHeaderMouseLeave": new Slick.Event(),
      "onHeaderRowMouseEnter": new Slick.Event(),
      "onHeaderRowMouseLeave": new Slick.Event(),
      "onHeaderContextMenu": new Slick.Event(),
      "onHeaderClick": new Slick.Event(),
      "onHeaderCellRendered": new Slick.Event(),
      "onBeforeHeaderCellDestroy": new Slick.Event(),
      "onHeaderRowCellRendered": new Slick.Event(),
      "onFooterRowCellRendered": new Slick.Event(),
      "onFooterContextMenu": new Slick.Event(),
      "onFooterClick": new Slick.Event(),
      "onBeforeHeaderRowCellDestroy": new Slick.Event(),
      "onBeforeFooterRowCellDestroy": new Slick.Event(),
      "onMouseEnter": new Slick.Event(),
      "onMouseLeave": new Slick.Event(),
      "onClick": new Slick.Event(),
      "onDblClick": new Slick.Event(),
      "onContextMenu": new Slick.Event(),
      "onKeyDown": new Slick.Event(),
      "onAddNewRow": new Slick.Event(),
      "onBeforeAppendCell": new Slick.Event(),
      "onValidationError": new Slick.Event(),
      "onViewportChanged": new Slick.Event(),
      "onColumnsReordered": new Slick.Event(),
      "onColumnsDrag": new Slick.Event(),
      "onColumnsResized": new Slick.Event(),
      "onColumnsResizeDblClick": new Slick.Event(),
      "onBeforeColumnsResize": new Slick.Event(),
      "onCellChange": new Slick.Event(),
      "onCompositeEditorChange": new Slick.Event(),
      "onBeforeEditCell": new Slick.Event(),
      "onBeforeCellEditorDestroy": new Slick.Event(),
      "onBeforeDestroy": new Slick.Event(),
      "onActiveCellChanged": new Slick.Event(),
      "onActiveCellPositionChanged": new Slick.Event(),
      "onDragInit": new Slick.Event(),
      "onDragStart": new Slick.Event(),
      "onDrag": new Slick.Event(),
      "onDragEnd": new Slick.Event(),
      "onSelectedRowsChanged": new Slick.Event(),
      "onCellCssStylesChanged": new Slick.Event(),
      "onAutosizeColumns": new Slick.Event(),
      "onBeforeSetColumns": new Slick.Event(),
      "onRendered": new Slick.Event(),
      "onSetOptions": new Slick.Event(),

      // Methods
      "registerPlugin": registerPlugin,
      "unregisterPlugin": unregisterPlugin,
      "getPluginByName": getPluginByName,
      "getColumns": getColumns,
      "setColumns": setColumns,
      "getColumnIndex": getColumnIndex,
      "updateColumnHeader": updateColumnHeader,
      "setSortColumn": setSortColumn,
      "setSortColumns": setSortColumns,
      "getSortColumns": getSortColumns,
      "autosizeColumns": autosizeColumns,
      "autosizeColumn": autosizeColumn,
      "getOptions": getOptions,
      "setOptions": setOptions,
      "getData": getData,
      "getDataLength": getDataLength,
      "getDataItem": getDataItem,
      "setData": setData,
      "getSelectionModel": getSelectionModel,
      "setSelectionModel": setSelectionModel,
      "getSelectedRows": getSelectedRows,
      "setSelectedRows": setSelectedRows,
      "getContainerNode": getContainerNode,
      "updatePagingStatusFromView": updatePagingStatusFromView,
      "applyFormatResultToCellNode": applyFormatResultToCellNode,

      "render": render,
      "reRenderColumns": reRenderColumns,
      "invalidate": invalidate,
      "invalidateRow": invalidateRow,
      "invalidateRows": invalidateRows,
      "invalidateAllRows": invalidateAllRows,
      "updateCell": updateCell,
      "updateRow": updateRow,
      "getViewport": getVisibleRange,
      "getRenderedRange": getRenderedRange,
      "resizeCanvas": resizeCanvas,
      "updateRowCount": updateRowCount,
      "scrollRowIntoView": scrollRowIntoView,
      "scrollRowToTop": scrollRowToTop,
      "scrollCellIntoView": scrollCellIntoView,
      "scrollColumnIntoView": scrollColumnIntoView,
      "getCanvasNode": getCanvasNode,
      "getUID": getUID,
      "getHeaderColumnWidthDiff": getHeaderColumnWidthDiff,
      "getScrollbarDimensions": getScrollbarDimensions,
      "getHeadersWidth": getHeadersWidth,
      "getCanvasWidth": getCanvasWidth,
      "getCanvases": getCanvases,
      "getActiveCanvasNode": getActiveCanvasNode,
      "setActiveCanvasNode": setActiveCanvasNode,
      "getViewportNode": getViewportNode,
      "getViewports": getViewports,
      "getActiveViewportNode": getActiveViewportNode,
      "setActiveViewportNode": setActiveViewportNode,
      "focus": setFocus,
      "scrollTo": scrollTo,
      "cacheCssForHiddenInit": cacheCssForHiddenInit,
      "restoreCssFromHiddenInit": restoreCssFromHiddenInit,

      "getCellFromPoint": getCellFromPoint,
      "getCellFromEvent": getCellFromEvent,
      "getActiveCell": getActiveCell,
      "setActiveCell": setActiveCell,
      "setActiveRow": setActiveRow,
      "getActiveCellNode": getActiveCellNode,
      "getActiveCellPosition": getActiveCellPosition,
      "resetActiveCell": resetActiveCell,
      "editActiveCell": makeActiveCellEditable,
      "getCellEditor": getCellEditor,
      "getCellNode": getCellNode,
      "getCellNodeBox": getCellNodeBox,
      "canCellBeSelected": canCellBeSelected,
      "canCellBeActive": canCellBeActive,
      "navigatePrev": navigatePrev,
      "navigateNext": navigateNext,
      "navigateUp": navigateUp,
      "navigateDown": navigateDown,
      "navigateLeft": navigateLeft,
      "navigateRight": navigateRight,
      "navigatePageUp": navigatePageUp,
      "navigatePageDown": navigatePageDown,
      "navigateTop": navigateTop,
      "navigateBottom": navigateBottom,
      "navigateRowStart": navigateRowStart,
      "navigateRowEnd": navigateRowEnd,
      "gotoCell": gotoCell,
      "getTopPanel": getTopPanel,
      "setTopPanelVisibility": setTopPanelVisibility,
      "getPreHeaderPanel": getPreHeaderPanel,
      "getPreHeaderPanelLeft": getPreHeaderPanel,
      "getPreHeaderPanelRight": getPreHeaderPanelRight,
      "setPreHeaderPanelVisibility": setPreHeaderPanelVisibility,
      "getHeader": getHeader,
      "getHeaderColumn": getHeaderColumn,
      "setHeaderRowVisibility": setHeaderRowVisibility,
      "getHeaderRow": getHeaderRow,
      "getHeaderRowColumn": getHeaderRowColumn,
      "setFooterRowVisibility": setFooterRowVisibility,
      "getFooterRow": getFooterRow,
      "getFooterRowColumn": getFooterRowColumn,
      "getGridPosition": getGridPosition,
      "flashCell": flashCell,
      "addCellCssStyles": addCellCssStyles,
      "setCellCssStyles": setCellCssStyles,
      "removeCellCssStyles": removeCellCssStyles,
      "getCellCssStyles": getCellCssStyles,
      "getFrozenRowOffset": getFrozenRowOffset,
      "setColumnHeaderVisibility": setColumnHeaderVisibility,
      "sanitizeHtmlString": sanitizeHtmlString,
      "getDisplayedScrollbarDimensions": getDisplayedScrollbarDimensions,
      "getAbsoluteColumnMinWidth": getAbsoluteColumnMinWidth,

      "init": finishInitialization,
      "destroy": destroy,

      // IEditor implementation
      "getEditorLock": getEditorLock,
      "getEditController": getEditController
    });

    init();
  }

  // exports
  $.extend(true, window, {
    Slick: {
      Grid: SlickGrid
    }
  });
}(jQuery));