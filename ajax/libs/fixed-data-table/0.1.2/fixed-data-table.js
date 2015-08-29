/**
 * FixedDataTable v0.1.2 
 *
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var FixedDataTable =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(10);
	__webpack_require__(12);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRoot
	 */

	"use strict";

	if (false) {
	  var ExecutionEnvironment = require('ExecutionEnvironment');
	  if (ExecutionEnvironment.canUseDOM && window.top === window.self) {

	    if (!Object.assign) {
	      console.error(
	        'FixedDataTable expected an ES6 compatible `Object.assign` polyfill.'
	      );
	    }
	  }
	}

	var FixedDataTable = __webpack_require__(15);
	var FixedDataTableColumn = __webpack_require__(16);
	var FixedDataTableColumnGroup = __webpack_require__(17);

	var FixedDataTableRoot = {
	  Column: FixedDataTableColumn,
	  ColumnGroup: FixedDataTableColumnGroup,
	  Table: FixedDataTable,
	};

	FixedDataTableRoot.version = '0.1.2';

	module.exports = FixedDataTableRoot;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTable.react
	 * @typechecks
	 */

	/* jslint bitwise: true */

	var FixedDataTableHelper = __webpack_require__(20);
	var Locale = __webpack_require__(21);
	var React = __webpack_require__(19);
	var ReactComponentWithPureRenderMixin = __webpack_require__(22);
	var ReactWheelHandler = __webpack_require__(23);
	var Scrollbar = __webpack_require__(24);
	var FixedDataTableBufferedRows = __webpack_require__(25);
	var FixedDataTableColumnResizeHandle = __webpack_require__(26);
	var FixedDataTableRow = __webpack_require__(27);
	var FixedDataTableScrollHelper = __webpack_require__(28);
	var FixedDataTableWidthHelper = __webpack_require__(29);

	var cloneWithProps = __webpack_require__(30);
	var cx = __webpack_require__(31);
	var debounceCore = __webpack_require__(32);
	var emptyFunction = __webpack_require__(33);
	var invariant = __webpack_require__(34);
	var shallowEqual = __webpack_require__(35);
	var translateDOMPositionXY = __webpack_require__(36);

	var PropTypes = React.PropTypes;
	var ReactChildren = React.Children;

	var renderToString = FixedDataTableHelper.renderToString;
	var EMPTY_OBJECT = {};
	var COLUMN_SETTING_NAMES = [
	  'bodyFixedColumns',
	  'bodyScrollableColumns',
	  'headFixedColumns',
	  'headScrollableColumns',
	  'footFixedColumns',
	  'footScrollableColumns',
	];

	/**
	 * Data grid component with fixed or scrollable header and columns.
	 *
	 * The layout of the data table is as follow:
	 *
	 * ```
	 * +---------------------------------------------------+
	 * | Fixed Column Group    | Scrollable Column Group   |
	 * | Header                | Header                    |
	 * |                       |                           |
	 * +---------------------------------------------------+
	 * |                       |                           |
	 * | Fixed Header Columns  | Scrollable Header Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Body Columns    | Scrollable Body Columns   |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Footer Columns  | Scrollable Footer Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * ```
	 *
	 * - Fixed Column Group Header: These are the headers for a group
	 *   of columns if included in the table that do not scroll
	 *   vertically or horizontally.
	 *
	 * - Scrollable Column Group Header:  The header for a group of columns
	 *   that do not move while scrolling vertically, but move horizontally
	 *   with the horizontal scrolling.
	 *
	 * - Fixed Header Columns: The header columns that do not move while scrolling
	 *   vertically or horizontally.
	 *
	 * - Scrollable Header Columns: The header columns that do not move
	 *   while scrolling vertically, but move horizontally with the horizontal
	 *   scrolling.
	 *
	 * - Fixed Body Columns: The body columns that do not move while scrolling
	 *   horizontally, but move vertically with the vertical scrolling.
	 *
	 * - Scrollable Body Columns: The body columns that move while scrolling
	 *   vertically or horizontally.
	 */
	var FixedDataTable = React.createClass({displayName: "FixedDataTable",

	  propTypes: {

	    /**
	     * Pixel width of table. If all rows do not fit,
	     * a horizontal scrollbar will appear.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    height: PropTypes.number,

	    /**
	     * Maximum pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    maxHeight: PropTypes.number,

	    /**
	     * Pixel height of table's owner, This is used to make sure the footer
	     * and scrollbar of the table are visible when current space for table in
	     * view is smaller than final height of table. It allows to avoid resizing
	     * and reflowing table whan it is moving in the view.
	     *
	     * This is used if `ownerHeight < height`.
	     */
	    ownerHeight: PropTypes.number,

	    overflowX: PropTypes.oneOf(['hidden', 'auto']),
	    overflowY: PropTypes.oneOf(['hidden', 'auto']),

	    /**
	     * Number of rows in the table.
	     */
	    rowsCount: PropTypes.number.isRequired,

	    /**
	     * Pixel height of rows unless rowHeightGetter is specified and returns
	     * different value.
	     */
	    rowHeight: PropTypes.number.isRequired,

	    /**
	     * If specified, `rowHeightGetter(index)` is called for each row and the
	     * returned value overrides rowHeight for particular row.
	     */
	    rowHeightGetter: PropTypes.func,

	    /**
	     * To get rows to display in table, `rowGetter(index)`
	     * is called. rowGetter should be smart enough to handle async
	     * fetching of data and returning temporary objects
	     * while data is being fetched.
	     */
	    rowGetter: PropTypes.func.isRequired,

	    /**
	     * To get any additional css classes that should be added to a row,
	     * `rowClassNameGetter(index)` is called.
	     */
	    rowClassNameGetter: PropTypes.func,

	    /**
	     * Pixel height of the column group header.
	     */
	    groupHeaderHeight: PropTypes.number,

	    /**
	     * Pixel height of header.
	     */
	    headerHeight: PropTypes.number.isRequired,

	    /**
	     * Function that is called to get the data for the header row.
	     */
	    headerDataGetter: PropTypes.func,

	    /**
	     * Pixel height of footer.
	     */
	    footerHeight: PropTypes.number,

	    /**
	     * Data that will be passed to footer cell renderers.
	     */
	    footerData: PropTypes.oneOfType([
	      PropTypes.object,
	      PropTypes.array,
	    ]),

	    /**
	     * Value of horizontal scroll.
	     */
	    scrollLeft: PropTypes.number,

	    /**
	     * Index of column to scroll to.
	     */
	    scrollToColumn: PropTypes.number,

	    /**
	     * Value of vertical scroll.
	     */
	    scrollTop: PropTypes.number,

	    /**
	     * Index of row to scroll to.
	     */
	    scrollToRow: PropTypes.number,

	    /**
	     * Callback that is called when scrolling ends or stops with new horizontal
	     * and vertical scroll values.
	     */
	    onScrollEnd: PropTypes.func,

	    /**
	     * Callback that is called when `rowHeightGetter` returns a different height
	     * for a row than the `rowHeight` prop. This is necessary because initially
	     * table estimates heights of some parts of the content.
	     */
	    onContentHeightChange: PropTypes.func,

	    /**
	     * Callback that is called when a row is clicked.
	     */
	    onRowClick: PropTypes.func,

	    /**
	     * Callback that is called when mouse down event happens above a row.
	     */
	    onRowMouseDown: PropTypes.func,

	    /**
	     * Callback that is called when the mouse enters a row.
	     */
	    onRowMouseEnter: PropTypes.func,

	    /**
	     * Callback that is called when resizer has been released
	     * and column needs to be updated.
	     */
	    onColumnResizeEndCallback: PropTypes.func,

	    /**
	     * Whether a column is currently being resized.
	     */
	    isColumnResizing: PropTypes.bool,
	  },

	  getDefaultProps:function() /*object*/ {
	    return {
	      footerHeight: 0,
	      groupHeaderHeight: 0,
	      headerHeight: 0,
	      scrollLeft: 0,
	      scrollTop: 0,
	    };
	  },

	  getInitialState:function() /*object*/ {
	    var props = this.props;
	    var viewportHeight = props.height -
	      props.headerHeight -
	      props.footerHeight -
	      props.groupHeaderHeight;
	    this._scrollHelper = new FixedDataTableScrollHelper(
	      props.rowsCount,
	      props.rowHeight,
	      viewportHeight,
	      props.rowHeightGetter
	    );
	    if (props.scrollTop) {
	      this._scrollHelper.scrollTo(props.scrollTop);
	    }
	    this._didScrollStop = debounceCore(this._didScrollStop, 160, this);

	    return this._calculateState(this.props);
	  },

	  componentWillMount:function() {
	    var scrollToRow = this.props.scrollToRow;
	    if (scrollToRow !== undefined && scrollToRow !== null) {
	      this._rowToScrollTo = scrollToRow;
	    }
	    var scrollToColumn = this.props.scrollToColumn;
	    if (scrollToColumn !== undefined && scrollToColumn !== null) {
	      this._columnToScrollTo = scrollToColumn;
	    }
	    this._wheelHandler = new ReactWheelHandler(
	      this._onWheel,
	      this.props.overflowX !== 'hidden', // Should handle horizontal scroll
	      this.props.overflowY !== 'hidden' // Should handle vertical scroll
	    );
	  },

	  _reportContentHeight:function() {
	    var scrollContentHeight = this.state.scrollContentHeight;
	    var reservedHeight = this.state.reservedHeight;
	    var requiredHeight = scrollContentHeight + reservedHeight;
	    var contentHeight;
	    if (this.state.height > requiredHeight && this.props.ownerHeight) {
	      contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
	    } else {
	      var maxScrollY = scrollContentHeight - this.state.bodyHeight;
	      contentHeight = this.props.height + maxScrollY;
	    }
	    if (contentHeight !== this._contentHeight &&
	        this.props.onContentHeightChange) {
	      this.props.onContentHeightChange(contentHeight);
	    }
	    this._contentHeight = contentHeight;
	  },

	  componentDidMount:function() {
	    this._reportContentHeight();
	  },

	  componentWillReceiveProps:function(/*object*/ nextProps) {
	    var scrollToRow = nextProps.scrollToRow;
	    if (scrollToRow !== undefined && scrollToRow !== null) {
	      this._rowToScrollTo = scrollToRow;
	    }
	    var scrollToColumn = nextProps.scrollToColumn;
	    if (scrollToColumn !== undefined && scrollToColumn !== null) {
	      this._columnToScrollTo = scrollToColumn;
	    }

	    var newOverflowX = nextProps.overflowX;
	    var newOverflowY = nextProps.overflowY;
	    if (newOverflowX !== this.props.overflowX ||
	        newOverflowY !== this.props.overflowY) {
	      this._wheelHandler = new ReactWheelHandler(
	        this._onWheel,
	        newOverflowX !== 'hidden', // Should handle horizontal scroll
	        newOverflowY !== 'hidden' // Should handle vertical scroll
	      );
	    }

	    this.setState(this._calculateState(nextProps, this.state));
	  },

	  componentDidUpdate:function() {
	    this._reportContentHeight();
	  },

	  render:function() /*object*/ {
	    var state = this.state;
	    var props = this.props;

	    var groupHeader;
	    if (state.useGroupHeader) {
	      groupHeader = (
	        React.createElement(FixedDataTableRow, {
	          key: "group_header", 
	          className: cx('public/fixedDataTable/header'), 
	          data: state.groupHeaderData, 
	          width: state.width, 
	          height: state.groupHeaderHeight, 
	          index: 0, 
	          zIndex: 1, 
	          offsetTop: 0, 
	          scrollLeft: state.scrollX, 
	          fixedColumns: state.groupHeaderFixedColumns, 
	          scrollableColumns: state.groupHeaderScrollableColumns}
	        )
	      );
	    }

	    var maxScrollY = this.state.scrollContentHeight - this.state.bodyHeight;
	    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden';
	    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden';
	    var scrollbarXHeight = showScrollbarX ? Scrollbar.SIZE : 0;
	    var scrollbarYHeight = state.height - scrollbarXHeight;

	    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
	    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
	    var bottomSectionOffset = 0;
	    var footOffsetTop = bodyOffsetTop + state.bodyHeight;
	    var rowsContainerHeight = footOffsetTop + state.footerHeight;

	    if (props.ownerHeight !== undefined  && props.ownerHeight < props.height) {
	      bottomSectionOffset = props.ownerHeight - props.height;
	      footOffsetTop = Math.min(
	        footOffsetTop,
	        scrollbarYHeight + bottomSectionOffset - state.footerHeight
	      );
	      scrollbarYHeight = props.ownerHeight - scrollbarXHeight;
	    }

	    var verticalScrollbar;
	    if (showScrollbarY) {
	      verticalScrollbar =
	        React.createElement(Scrollbar, {
	          size: scrollbarYHeight, 
	          contentSize: scrollbarYHeight + maxScrollY, 
	          onScroll: this._onVerticalScroll, 
	          position: state.scrollY}
	        );
	    }

	    var horizontalScrollbar;
	    if (showScrollbarX) {
	      var scrollbarYWidth = showScrollbarY ? Scrollbar.SIZE : 0;
	      var scrollbarXWidth = state.width - scrollbarYWidth;
	      horizontalScrollbar =
	        React.createElement(HorizontalScrollbar, {
	          contentSize: scrollbarXWidth + state.maxScrollX, 
	          offset: bottomSectionOffset, 
	          onScroll: this._onHorizontalScroll, 
	          position: state.scrollX, 
	          size: scrollbarXWidth}
	        );
	    }

	    var dragKnob =
	      React.createElement(FixedDataTableColumnResizeHandle, {
	        height: state.height, 
	        initialWidth: state.columnResizingData.width || 0, 
	        minWidth: state.columnResizingData.minWidth || 0, 
	        maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE, 
	        visible: !!state.isColumnResizing, 
	        leftOffset: state.columnResizingData.left || 0, 
	        knobHeight: state.headerHeight, 
	        initialEvent: state.columnResizingData.initialEvent, 
	        onColumnResizeEnd: props.onColumnResizeEndCallback, 
	        columnKey: state.columnResizingData.key}
	      );

	    var footer = null;
	    if (state.footerHeight) {
	      footer =
	        React.createElement(FixedDataTableRow, {
	          key: "footer", 
	          className: cx('public/fixedDataTable/footer'), 
	          data: state.footerData, 
	          fixedColumns: state.footFixedColumns, 
	          height: state.footerHeight, 
	          index: -1, 
	          zIndex: 1, 
	          offsetTop: footOffsetTop, 
	          scrollableColumns: state.footScrollableColumns, 
	          scrollLeft: state.scrollX, 
	          width: state.width}
	        );
	    }

	    var rows = this._renderRows(bodyOffsetTop);

	    var header =
	      React.createElement(FixedDataTableRow, {
	        key: "header", 
	        className: cx('public/fixedDataTable/header'), 
	        data: state.headData, 
	        width: state.width, 
	        height: state.headerHeight, 
	        index: -1, 
	        zIndex: 1, 
	        offsetTop: headerOffsetTop, 
	        scrollLeft: state.scrollX, 
	        fixedColumns: state.headFixedColumns, 
	        scrollableColumns: state.headScrollableColumns, 
	        onColumnResize: this._onColumnResize}
	      );

	    var shadow;
	    if (state.scrollY) {
	      shadow =
	        React.createElement("div", {
	          className: cx('fixedDataTable/shadow'), 
	          style: {top: bodyOffsetTop}}
	        );
	    }

	    return (
	      React.createElement("div", {
	        className: cx('public/fixedDataTable/main'), 
	        onWheel: this._wheelHandler.onWheel, 
	        style: {height: state.height, width: state.width}}, 
	        React.createElement("div", {
	          className: cx('fixedDataTable/rowsContainer'), 
	          style: {height: rowsContainerHeight, width: state.width}}, 
	          dragKnob, 
	          groupHeader, 
	          header, 
	          rows, 
	          footer, 
	          shadow
	        ), 
	        verticalScrollbar, 
	        horizontalScrollbar
	      )
	    );
	  },

	  _renderRows:function(/*number*/ offsetTop) /*object*/ {
	    var state = this.state;

	    return (
	      React.createElement(FixedDataTableBufferedRows, {
	        defaultRowHeight: state.rowHeight, 
	        firstRowIndex: state.firstRowIndex, 
	        firstRowOffset: state.firstRowOffset, 
	        fixedColumns: state.bodyFixedColumns, 
	        height: state.bodyHeight, 
	        offsetTop: offsetTop, 
	        onRowClick: state.onRowClick, 
	        onRowMouseDown: state.onRowMouseDown, 
	        onRowMouseEnter: state.onRowMouseEnter, 
	        rowClassNameGetter: state.rowClassNameGetter, 
	        rowsCount: state.rowsCount, 
	        rowGetter: state.rowGetter, 
	        rowHeightGetter: state.rowHeightGetter, 
	        scrollLeft: state.scrollX, 
	        scrollableColumns: state.bodyScrollableColumns, 
	        showLastRowBorder: !state.footerHeight, 
	        width: state.width}
	      )
	    );
	  },

	  /**
	   * This is called when a cell that is in the header of a column has its
	   * resizer knob clicked on. It displays the resizer and puts in the correct
	   * location on the table.
	   */
	  _onColumnResize:function(
	    /*number*/ combinedWidth,
	    /*number*/ leftOffset,
	    /*number*/ cellWidth,
	    /*?number*/ cellMinWidth,
	    /*?number*/ cellMaxWidth,
	    /*number|string*/ columnKey,
	    /*object*/ event) {
	    if (Locale.isRTL()) {
	      leftOffset = -leftOffset;
	    }
	    this.setState({
	      isColumnResizing: true,
	      columnResizingData: {
	        left: leftOffset + combinedWidth - cellWidth,
	        width: cellWidth,
	        minWidth: cellMinWidth,
	        maxWidth: cellMaxWidth,
	        initialEvent: {
	          clientX: event.clientX,
	          clientY: event.clientY,
	          preventDefault: emptyFunction
	        },
	        key: columnKey
	      }
	    });
	  },

	  _populateColumnsAndColumnData:function(
	    /*array*/ columns,
	    /*?array*/ columnGroups
	  ) /*object*/ {
	    var columnInfo = {};
	    var bodyColumnTypes = this._splitColumnTypes(columns);
	    columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
	    columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

	    columnInfo.headData = this._getHeadData(columns);
	    var headColumnTypes = this._splitColumnTypes(
	      this._createHeadColumns(columns)
	    );
	    columnInfo.headFixedColumns = headColumnTypes.fixed;
	    columnInfo.headScrollableColumns = headColumnTypes.scrollable;

	    var footColumnTypes = this._splitColumnTypes(
	      this._createFootColumns(columns)
	    );
	    columnInfo.footFixedColumns = footColumnTypes.fixed;
	    columnInfo.footScrollableColumns = footColumnTypes.scrollable;

	    if (columnGroups) {
	      columnInfo.groupHeaderData = this._getGroupHeaderData(columnGroups);
	      columnGroups = this._createGroupHeaderColumns(columnGroups);
	      var groupHeaderColumnTypes = this._splitColumnTypes(columnGroups);
	      columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
	      columnInfo.groupHeaderScrollableColumns =
	        groupHeaderColumnTypes.scrollable;
	    }
	    return columnInfo;
	  },

	  _calculateState:function(/*object*/ props, /*?object*/ oldState) /*object*/ {
	    invariant(
	      props.height !== undefined || props.maxHeight !== undefined,
	      'You must set either a height or a maxHeight'
	    );

	    var firstRowIndex = (oldState && oldState.firstRowIndex) || 0;
	    var firstRowOffset = (oldState && oldState.firstRowOffset) || 0;
	    var scrollX, scrollY;
	    if (oldState && props.overflowX !== 'hidden') {
	      scrollX = oldState.scrollX;
	    } else {
	      scrollX = props.scrollLeft;
	    }
	    if (oldState && props.overflowY !== 'hidden') {
	      scrollY = oldState.scrollY;
	    } else {
	      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    }

	    if (this._rowToScrollTo !== undefined) {
	      scrollState =
	        this._scrollHelper.scrollRowIntoView(this._rowToScrollTo);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	      delete this._rowToScrollTo;
	    }

	    if (oldState && props.rowsCount !== oldState.rowsCount) {
	      // Number of rows changed, try to scroll to the row from before the
	      // change
	      var viewportHeight = props.height -
	        props.headerHeight -
	        props.footerHeight -
	        props.groupHeaderHeight;
	      this._scrollHelper = new FixedDataTableScrollHelper(
	        props.rowsCount,
	        props.rowHeight,
	        viewportHeight,
	        props.rowHeightGetter
	      );
	      var scrollState =
	        this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    } else if (oldState && props.rowHeightGetter !== oldState.rowHeightGetter) {
	      this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
	    }

	    var columnResizingData;
	    if (props.isColumnResizing) {
	      columnResizingData = oldState && oldState.columnResizingData;
	    } else {
	      columnResizingData = EMPTY_OBJECT;
	    }

	    var children = [];

	    ReactChildren.forEach(props.children, function(child, index)  {
	      if (child == null) {
	        return;
	      }
	      invariant(
	        child.type.__TableColumnGroup__ ||
	        child.type.__TableColumn__,
	        'child type should be <FixedDataTableColumn /> or ' +
	        '<FixedDataTableColumnGroup />'
	      );
	      children.push(child);
	    });

	    var useGroupHeader = false;
	    if (children.length && children[0].type.__TableColumnGroup__) {
	      useGroupHeader = true;
	    }

	    var columns;
	    var columnGroups;

	    if (useGroupHeader) {
	      var columnGroupSettings =
	        FixedDataTableWidthHelper.adjustColumnGroupWidths(
	          children,
	          props.width
	      );
	      columns = columnGroupSettings.columns;
	      columnGroups = columnGroupSettings.columnGroups;
	    } else {
	      columns = FixedDataTableWidthHelper.adjustColumnWidths(
	        children,
	        props.width
	      );
	    }

	    var columnInfo = this._populateColumnsAndColumnData(
	      columns,
	      columnGroups
	    );

	    if (oldState) {
	      columnInfo = this._tryReusingColumnSettings(columnInfo, oldState);
	    }

	    if (this._columnToScrollTo !== undefined) {
	      // If selected column is a fixed column, don't scroll
	      var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
	      if (this._columnToScrollTo >= fixedColumnsCount) {
	        var totalFixedColumnsWidth = 0;
	        var i, column;
	        for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
	          column = columnInfo.bodyFixedColumns[i];
	          totalFixedColumnsWidth += column.props.width;
	        }

	        var scrollableColumnIndex = this._columnToScrollTo - fixedColumnsCount;
	        var previousColumnsWidth = 0;
	        for (i = 0; i < scrollableColumnIndex; ++i) {
	          column = columnInfo.bodyScrollableColumns[i];
	          previousColumnsWidth += column.props.width;
	        }

	        var availableScrollWidth = props.width - totalFixedColumnsWidth;
	        var selectedColumnWidth = columnInfo.bodyScrollableColumns[
	          this._columnToScrollTo - fixedColumnsCount
	        ].props.width;
	        var minAcceptableScrollPosition =
	          previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

	        if (scrollX < minAcceptableScrollPosition) {
	          scrollX = minAcceptableScrollPosition;
	        }

	        if (scrollX > previousColumnsWidth) {
	          scrollX = previousColumnsWidth;
	        }
	      }
	      delete this._columnToScrollTo;
	    }

	    var useMaxHeight = props.height === undefined;
	    var height = useMaxHeight ? props.maxHeight : props.height;
	    var totalHeightReserved = props.footerHeight + props.headerHeight +
	      props.groupHeaderHeight;
	    var bodyHeight = height - totalHeightReserved;
	    var scrollContentHeight = this._scrollHelper.getContentHeight();
	    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
	    var scrollContentWidth =
	      FixedDataTableWidthHelper.getTotalWidth(columns);

	    var horizontalScrollbarVisible = scrollContentWidth > props.width &&
	      props.overflowX !== 'hidden';

	    if (horizontalScrollbarVisible) {
	      bodyHeight -= Scrollbar.SIZE;
	      totalHeightNeeded += Scrollbar.SIZE;
	      totalHeightReserved += Scrollbar.SIZE;
	    }

	    var maxScrollX = Math.max(0, scrollContentWidth - props.width);
	    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
	    scrollX = Math.min(scrollX, maxScrollX);
	    scrollY = Math.min(scrollY, maxScrollY);

	    if (!maxScrollY) {
	      // no vertical scrollbar necessary, use the totals we tracked so we
	      // can shrink-to-fit vertically
	      if (useMaxHeight) {
	        height = totalHeightNeeded;
	      }
	      bodyHeight = totalHeightNeeded - totalHeightReserved;
	    }

	    this._scrollHelper.setViewportHeight(bodyHeight);

	    // The order of elements in this object metters and bringing bodyHeight,
	    // height or useGroupHeader to the top can break various features
	    var newState = Object.assign({
	      isColumnResizing: oldState && oldState.isColumnResizing},
	      // isColumnResizing should be overwritten by value from props if
	      // avaialble

	      columnInfo,
	      props,

	      {columnResizingData:columnResizingData,
	      firstRowIndex:firstRowIndex,
	      firstRowOffset:firstRowOffset,
	      horizontalScrollbarVisible:horizontalScrollbarVisible,
	      maxScrollX:maxScrollX,
	      reservedHeight: totalHeightReserved,
	      scrollContentHeight:scrollContentHeight,
	      scrollX:scrollX,
	      scrollY:scrollY,

	      // These properties may overwrite properties defined in
	      // columnInfo and props
	      bodyHeight:bodyHeight,
	      height:height,
	      useGroupHeader:useGroupHeader
	    });

	    // Both `headData` and `groupHeaderData` are generated by
	    // `FixedDataTable` will be passed to each header cell to render.
	    // In order to prevent over-rendering the cells, we do not pass the
	    // new `headData` or `groupHeaderData`
	    // if they haven't changed.
	    if (oldState) {
	      if (shallowEqual(oldState.headData, newState.headData)) {
	        newState.headData = oldState.headData;
	      }
	      if (shallowEqual(oldState.groupHeaderData, newState.groupHeaderData)) {
	        newState.groupHeaderData = oldState.groupHeaderData;
	      }
	    }

	    return newState;
	  },

	  _tryReusingColumnSettings:function(
	    /*object*/ columnInfo,
	    /*object*/ oldState
	  ) /*object*/ {
	    COLUMN_SETTING_NAMES.forEach(function(settingName)  {
	      if (columnInfo[settingName].length === oldState[settingName].length) {
	        var canReuse = true;
	        for (var index = 0; index < columnInfo[settingName].length; ++index) {
	          if (!shallowEqual(
	              columnInfo[settingName][index].props,
	              oldState[settingName][index].props
	          )) {
	            canReuse = false;
	            break;
	          }
	        }
	        if (canReuse) {
	          columnInfo[settingName] = oldState[settingName];
	        }
	      }
	    });
	    return columnInfo;
	  },

	  _createGroupHeaderColumns:function(/*array*/ columnGroups) /*array*/  {
	    var newColumnGroups = [];
	    for (var i = 0; i < columnGroups.length; ++i) {
	      newColumnGroups[i] = cloneWithProps(
	        columnGroups[i],
	        {
	          dataKey: i,
	          children: undefined,
	          columnData: columnGroups[i].props.columnGroupData,
	          isHeaderCell: true,
	        }
	      );
	    }
	    return newColumnGroups;
	  },

	  _createHeadColumns:function(/*array*/ columns) /*array*/ {
	    var headColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      var columnProps = columns[i].props;
	      headColumns.push(cloneWithProps(
	        columns[i],
	        {
	          cellRenderer: columnProps.headerRenderer || renderToString,
	          columnData: columnProps.columnData,
	          dataKey: columnProps.dataKey,
	          isHeaderCell: true,
	          label: columnProps.label,
	        }
	      ));
	    }
	    return headColumns;
	  },

	  _createFootColumns:function(/*array*/ columns) /*array*/ {
	    var footColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      var columnProps = columns[i].props;
	      footColumns.push(cloneWithProps(
	        columns[i],
	        {
	          cellRenderer: columnProps.footerRenderer || renderToString,
	          columnData: columnProps.columnData,
	          dataKey: columnProps.dataKey,
	          isFooterCell: true,
	        }
	      ));
	    }
	    return footColumns;
	  },

	  _getHeadData:function(/*array*/ columns) /*object*/ {
	    var headData = {};
	    for (var i = 0; i < columns.length; ++i) {
	      var columnProps = columns[i].props;
	      if (this.props.headerDataGetter) {
	        headData[columnProps.dataKey] =
	          this.props.headerDataGetter(columnProps.dataKey);
	      } else {
	        headData[columnProps.dataKey] = columnProps.label || '';
	      }
	    }
	    return headData;
	  },

	  _getGroupHeaderData:function(/*array*/ columnGroups) /*array*/ {
	    var groupHeaderData = [];
	    for (var i = 0; i < columnGroups.length; ++i) {
	      groupHeaderData[i] = columnGroups[i].props.label || '';
	    }
	    return groupHeaderData;
	  },

	  _splitColumnTypes:function(/*array*/ columns) /*object*/ {
	    var fixedColumns = [];
	    var scrollableColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      if (columns[i].props.fixed) {
	        fixedColumns.push(columns[i]);
	      } else {
	        scrollableColumns.push(columns[i]);
	      }
	    }
	    return {
	      fixed: fixedColumns,
	      scrollable: scrollableColumns,
	    };
	  },

	  _onWheel:function(/*number*/ deltaX, /*number*/ deltaY) {
	    if (this.isMounted()) {
	      var x = this.state.scrollX;
	      if (Math.abs(deltaY) > Math.abs(deltaX) &&
	          this.props.overflowY !== 'hidden') {
	        var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
	        this.setState({
	          firstRowIndex: scrollState.index,
	          firstRowOffset: scrollState.offset,
	          scrollY: scrollState.position,
	          scrollContentHeight: scrollState.contentHeight,
	        });
	      } else if (deltaX && this.props.overflowX !== 'hidden') {
	        x += deltaX;
	        x = x < 0 ? 0 : x;
	        x = x > this.state.maxScrollX ? this.state.maxScrollX : x;
	        this.setState({
	          scrollX: x,
	        });
	      }

	      this._didScrollStop();
	    }
	  },


	  _onHorizontalScroll:function(/*number*/ scrollPos) {
	    if (this.isMounted() && scrollPos !== this.state.scrollX) {
	      this.setState({
	        scrollX: scrollPos,
	      });
	      this._didScrollStop();
	    }
	  },

	  _onVerticalScroll:function(/*number*/ scrollPos) {
	    if (this.isMounted() && scrollPos !== this.state.scrollY) {
	      var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));
	      this.setState({
	        firstRowIndex: scrollState.index,
	        firstRowOffset: scrollState.offset,
	        scrollY: scrollState.position,
	        scrollContentHeight: scrollState.contentHeight,
	      });
	      this._didScrollStop();
	    }
	  },

	  _didScrollStop:function() {
	    if (this.isMounted()) {
	      if (this.props.onScrollEnd) {
	        this.props.onScrollEnd(this.state.scrollX, this.state.scrollY);
	      }
	    }
	  }
	});

	var HorizontalScrollbar = React.createClass({displayName: "HorizontalScrollbar",
	  mixins: [ReactComponentWithPureRenderMixin],
	  propTypes: {
	    contentSize: PropTypes.number.isRequired,
	    offset: PropTypes.number.isRequired,
	    onScroll: PropTypes.func.isRequired,
	    position: PropTypes.number.isRequired,
	    size: PropTypes.number.isRequired,
	  },

	  render:function() /*object*/ {
	    var outerContainerStyle = {
	      height: Scrollbar.SIZE,
	      width: this.props.size,
	    };
	    var innerContainerStyle = {
	      height: Scrollbar.SIZE,
	      position: 'absolute',
	      width: this.props.size,
	    };
	    translateDOMPositionXY(
	      innerContainerStyle,
	      0,
	      this.props.offset
	    );

	    return (
	      React.createElement("div", {
	        className: cx('fixedDataTable/horizontalScrollbar'), 
	        style: outerContainerStyle}, 
	        React.createElement("div", {style: innerContainerStyle}, 
	          React.createElement(Scrollbar, React.__spread({}, 
	            this.props, 
	            {isOpaque: true, 
	            orientation: "horizontal", 
	            offset: undefined})
	          )
	        )
	      )
	    );
	  },
	});

	module.exports = FixedDataTable;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumn.react
	 * @typechecks
	 */

	var React = __webpack_require__(19);

	var PropTypes = React.PropTypes;

	/**
	 * Component that defines the attributes of table column.
	 */
	var FixedDataTableColumn = React.createClass({displayName: "FixedDataTableColumn",
	  statics: {
	    __TableColumn__: true
	  },

	  propTypes: {
	    /**
	     * The horizontal alignment of the table cell content.
	     */
	    align: PropTypes.oneOf(['left', 'center', 'right']),

	    /**
	     * className for each of this column's data cells.
	     */
	    cellClassName: PropTypes.string,

	    /**
	     * The cell renderer that returns React-renderable content for table cell.
	     * ```
	     * function(
	     *   cellData: any,
	     *   cellDataKey: string,
	     *   rowData: object,
	     *   rowIndex: number,
	     *   columnData: any,
	     *   width: number
	     * ): ?$jsx
	     * ```
	     */
	    cellRenderer: PropTypes.func,

	    /**
	     * The getter `function(string_cellDataKey, object_rowData)` that returns
	     * the cell data for the `cellRenderer`.
	     * If not provided, the cell data will be collected from
	     * `rowData[cellDataKey]` instead. The value that `cellDataGetter` returns
	     * will be used to determine whether the cell should re-render.
	     */
	    cellDataGetter: PropTypes.func,

	    /**
	     * The key to retrieve the cell data from the data row. Provided key type
	     * must be either `string` or `number`. Since we use this
	     * for keys, it must be specified for each column.
	     */
	    dataKey: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.number,
	    ]).isRequired,

	    /**
	     * The cell renderer that returns React-renderable content for table column
	     * header.
	     * ```
	     * function(
	     *   label: ?string,
	     *   cellDataKey: string,
	     *   columnData: any,
	     *   rowData: array<?object>,
	     *   width: number
	     * ): ?$jsx
	     * ```
	     */
	    headerRenderer: PropTypes.func,

	    /**
	     * The cell renderer that returns React-renderable content for table column
	     * footer.
	     * ```
	     * function(
	     *   label: ?string,
	     *   cellDataKey: string,
	     *   columnData: any,
	     *   rowData: array<?object>,
	     *   width: number
	     * ): ?$jsx
	     * ```
	     */
	    footerRenderer: PropTypes.func,

	    /**
	     * Bucket for any data to be passed into column renderer functions.
	     */
	    columnData: PropTypes.object,

	    /**
	     * The column's header label.
	     */
	    label: PropTypes.string,

	    /**
	     * The pixel width of the column.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * If this is a resizable column this is its minimum pixel width.
	     */
	    minWidth: PropTypes.number,

	    /**
	     * If this is a resizable column this is its maximum pixel width.
	     */
	    maxWidth: PropTypes.number,

	    /**
	     * The grow factor relative to other columns. Same as the flex-grow API
	     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
	     * extra width and distribute it proportionally according to all columns'
	     * flexGrow values. Defaults to zero (no-flexing).
	     */
	    flexGrow: PropTypes.number,

	    /**
	     * Whether the column can be resized with the
	     * FixedDataTableColumnResizeHandle. Please note that if a column
	     * has a flex grow, once you resize the column this will be set to 0.
	     */
	    isResizable: PropTypes.bool,
	  },

	  render:function() {
	    if (false) {
	      throw new Error(
	        'Component <FixedDataTableColumn /> should never render'
	      );
	    }
	    return null;
	  },
	});

	module.exports = FixedDataTableColumn;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnGroup.react
	 * @typechecks
	 */

	var React = __webpack_require__(19);

	var PropTypes = React.PropTypes;

	/**
	 * Component that defines the attributes of a table column group.
	 */
	var FixedDataTableColumnGroup = React.createClass({displayName: "FixedDataTableColumnGroup",
	  statics: {
	    __TableColumnGroup__: true
	  },

	  propTypes: {
	    /**
	     * The horizontal alignment of the table cell content.
	     */
	    align: PropTypes.oneOf(['left', 'center', 'right']),

	    /**
	     * Whether the column group is fixed.
	     */
	    fixed: PropTypes.bool.isRequired,

	    /**
	     * Bucket for any data to be passed into column group renderer functions.
	     */
	    columnGroupData: PropTypes.object,

	    /**
	     * The column group's header label.
	     */
	    label: PropTypes.string,

	    /**
	     * The cell renderer that returns React-renderable content for a table
	     * column group header. If it's not specified, the label from props will
	     * be rendered as header content.
	     * ```
	     * function(
	     *   label: ?string,
	     *   cellDataKey: string,
	     *   columnGroupData: any,
	     *   rowData: array<?object>, // array of labels of all coludmnGroups
	     *   width: number
	     * ): ?$jsx
	     * ```
	     */
	    groupHeaderRenderer: PropTypes.func,
	  },

	  render:function() {
	    if (false) {
	      throw new Error(
	        'Component <FixedDataTableColumnGroup /> should never render'
	      );
	    }
	    return null;
	  },
	});

	module.exports = FixedDataTableColumnGroup;


/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	module.exports = __webpack_require__(37);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableHelper
	 * @typechecks
	 */

	"use strict";

	var Locale = __webpack_require__(21);
	var React = __webpack_require__(19);
	var FixedDataTableColumnGroup = __webpack_require__(17);
	var FixedDataTableColumn = __webpack_require__(16);

	var cloneWithProps = __webpack_require__(30);

	var DIR_SIGN = (Locale.isRTL() ? -1 : +1);
	// A cell up to 5px outside of the visible area will still be considered visible
	var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

	function renderToString(value) /*string*/ {
	  if (value === null || value === undefined) {
	    return '';
	  } else {
	    return String(value);
	  }
	}

	/**
	 * Helper method to execute a callback against all columns given the children
	 * of a table.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column.
	 */
	function forEachColumn(children, callback) {
	  React.Children.forEach(children, function(child)  {
	    if (child.type === FixedDataTableColumnGroup.type) {
	      forEachColumn(child.props.children, callback);
	    } else if (child.type === FixedDataTableColumn.type) {
	      callback(child);
	    }
	  });
	}

	/**
	 * Helper method to map columns to new columns. This takes into account column
	 * groups and will generate a new column group if its columns change.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column and should
	 *    return a result column.
	 */
	function mapColumns(children, callback) {
	  var newChildren = [];
	  React.Children.forEach(children, function(originalChild)  {
	    var newChild = originalChild;

	    // The child is either a column group or a column. If it is a column group
	    // we need to iterate over its columns and then potentially generate a
	    // new column group
	    if (originalChild.type === FixedDataTableColumnGroup.type) {
	      var haveColumnsChanged = false;
	      var newColumns = [];

	      forEachColumn(originalChild.props.children, function(originalcolumn)  {
	        var newColumn = callback(originalcolumn);
	        if (newColumn !== originalcolumn) {
	          haveColumnsChanged = true;
	        }
	        newColumns.push(newColumn);
	      });

	      // If the column groups columns have changed clone the group and supply
	      // new children
	      if (haveColumnsChanged) {
	        newChild = cloneWithProps(originalChild, {children: newColumns});
	      }
	    } else if (originalChild.type === FixedDataTableColumn.type) {
	      newChild = callback(originalChild);
	    }

	    newChildren.push(newChild);
	  });

	  return newChildren;
	}

	var FixedDataTableHelper = {
	  DIR_SIGN:DIR_SIGN,
	  CELL_VISIBILITY_TOLERANCE:CELL_VISIBILITY_TOLERANCE,
	  renderToString:renderToString,
	  forEachColumn:forEachColumn,
	  mapColumns:mapColumns,
	};

	module.exports = FixedDataTableHelper;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Locale
	 */

	"use strict";

	// Hard code this for now.
	var Locale = {
	  isRTL: function()  {return false;},
	  getDirection: function()  {return 'LTR';}
	};

	module.exports = Locale;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */

	module.exports = __webpack_require__(60);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactWheelHandler
	 * @typechecks
	 */

	"use strict";

	var normalizeWheel = __webpack_require__(46);
	var requestAnimationFramePolyfill = __webpack_require__(47);


	  /**
	   * onWheel is the callback that will be called with right frame rate if
	   * any wheel events happened
	   * onWheel should is to be called with two arguments: deltaX and deltaY in
	   * this order
	   */
	  function ReactWheelHandler(
	onWheel,
	    /*boolean*/ handleScrollX,
	    /*boolean*/ handleScrollY,
	    /*?boolean*/ stopPropagation)
	   {
	    this.$ReactWheelHandler_animationFrameID = null;
	    this.$ReactWheelHandler_deltaX = 0;
	    this.$ReactWheelHandler_deltaY = 0;
	    this.$ReactWheelHandler_didWheel = this.$ReactWheelHandler_didWheel.bind(this);
	    this.$ReactWheelHandler_handleScrollX = handleScrollX;
	    this.$ReactWheelHandler_handleScrollY = handleScrollY;
	    this.$ReactWheelHandler_stopPropagation = !!stopPropagation;
	    this.$ReactWheelHandler_onWheelCallback = onWheel;
	    this.onWheel = this.onWheel.bind(this);
	  }

	  ReactWheelHandler.prototype.onWheel=function(event) {
	    if (this.$ReactWheelHandler_handleScrollX || this.$ReactWheelHandler_handleScrollY) {
	      event.preventDefault();
	    }
	    var normalizedEvent = normalizeWheel(event);

	    this.$ReactWheelHandler_deltaX += this.$ReactWheelHandler_handleScrollX ? normalizedEvent.pixelX : 0;
	    this.$ReactWheelHandler_deltaY += this.$ReactWheelHandler_handleScrollY ? normalizedEvent.pixelY : 0;

	    var changed;
	    if (this.$ReactWheelHandler_deltaX !== 0 || this.$ReactWheelHandler_deltaY !== 0) {
	      if (this.$ReactWheelHandler_stopPropagation) {
	        event.stopPropagation();
	      }
	      changed = true;
	    }

	    if (changed === true && this.$ReactWheelHandler_animationFrameID === null) {
	      this.$ReactWheelHandler_animationFrameID = requestAnimationFramePolyfill(this.$ReactWheelHandler_didWheel);
	    }
	  };

	  ReactWheelHandler.prototype.$ReactWheelHandler_didWheel=function() {
	    this.$ReactWheelHandler_animationFrameID = null;
	    this.$ReactWheelHandler_onWheelCallback(this.$ReactWheelHandler_deltaX, this.$ReactWheelHandler_deltaY);
	    this.$ReactWheelHandler_deltaX = 0;
	    this.$ReactWheelHandler_deltaY = 0;
	  };


	module.exports = ReactWheelHandler;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Scrollbar.react
	 * @typechecks
	 */

	var DOMMouseMoveTracker = __webpack_require__(38);
	var Keys = __webpack_require__(39);
	var React = __webpack_require__(19);
	var ReactComponentWithPureRenderMixin = __webpack_require__(22);
	var ReactWheelHandler = __webpack_require__(23);

	var cssVar = __webpack_require__(40);
	var cx = __webpack_require__(31);
	var emptyFunction = __webpack_require__(33);
	var translateDOMPositionXY = __webpack_require__(36);

	var PropTypes = React.PropTypes;

	var UNSCROLLABLE_STATE = {
	  position: 0,
	  scrollable: false,
	};

	var FACE_MARGIN = parseInt(cssVar('scrollbar-face-margin'), 10);
	var FACE_MARGIN_2 = FACE_MARGIN * 2;
	var FACE_SIZE_MIN = 30;
	var KEYBOARD_SCROLL_AMOUNT = 40;

	var _lastScrolledScrollbar = null;

	var Scrollbar = React.createClass({displayName: "Scrollbar",
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    contentSize: PropTypes.number.isRequired,
	    defaultPosition: PropTypes.number,
	    isOpaque: PropTypes.bool,
	    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
	    onScroll: PropTypes.func,
	    position: PropTypes.number,
	    size: PropTypes.number.isRequired,
	    trackColor: PropTypes.oneOf(['gray']),
	    zIndex: PropTypes.number,
	  },

	  getInitialState:function() /*object*/ {
	    var props = this.props;
	    return this._calculateState(
	      props.position || props.defaultPosition || 0,
	      props.size,
	      props.contentSize,
	      props.orientation
	    );
	  },

	  componentWillReceiveProps:function(/*object*/ nextProps) {
	    var controlledPosition = nextProps.position;
	    if (controlledPosition === undefined) {
	      this._setNextState(
	        this._calculateState(
	          this.state.position,
	          nextProps.size,
	          nextProps.contentSize,
	          nextProps.orientation
	        )
	      );
	    } else {
	      this._setNextState(
	        this._calculateState(
	          controlledPosition,
	          nextProps.size,
	          nextProps.contentSize,
	          nextProps.orientation
	        ),
	        nextProps
	      );
	    }
	  },

	  getDefaultProps:function() /*object*/ {
	    return {
	      defaultPosition: 0,
	      isOpaque: false,
	      onScroll: emptyFunction,
	      orientation: 'vertical',
	      zIndex: 99,
	    };
	  },

	  render:function() /*?object*/ {
	    if (!this.state.scrollable) {
	      return null;
	    }

	    var size = this.props.size;
	    var mainStyle;
	    var faceStyle;
	    var isHorizontal = this.state.isHorizontal;
	    var isVertical = !isHorizontal;
	    var isActive = this.state.focused || this.state.isDragging;
	    var faceSize = this.state.faceSize;
	    var isOpaque = this.props.isOpaque;

	    var mainClassName = cx({
	      'public/Scrollbar/main': true,
	      'public/Scrollbar/mainHorizontal': isHorizontal,
	      'public/Scrollbar/mainVertical': isVertical,
	      'Scrollbar/mainActive': isActive,
	      'Scrollbar/mainOpaque': isOpaque,
	    });

	    var faceClassName = cx({
	      'Scrollbar/face': true,
	      'Scrollbar/faceHorizontal': isHorizontal,
	      'Scrollbar/faceVertical': isVertical,
	      'Scrollbar/faceActive': isActive,
	    });

	    var position = this.state.position * this.state.scale + FACE_MARGIN;

	    if (isHorizontal) {
	      mainStyle = {
	        width: size,
	      };
	      faceStyle = {
	        width: faceSize - FACE_MARGIN_2
	      };
	      translateDOMPositionXY(faceStyle, position, 0);
	    } else {
	      mainStyle = {
	        height: size,
	      };
	      faceStyle = {
	        height: faceSize - FACE_MARGIN_2,
	      };
	      translateDOMPositionXY(faceStyle, 0, position);
	    }

	    mainStyle.zIndex = this.props.zIndex;

	    if (this.props.trackColor === 'gray') {
	      mainStyle.backgroundColor = cssVar('ads-cf-bg-color-gray');
	    }

	    return (
	      React.createElement("div", {
	        onFocus: this._onFocus, 
	        onBlur: this._onBlur, 
	        onKeyDown: this._onKeyDown, 
	        onMouseDown: this._onMouseDown, 
	        onWheel: this._wheelHandler.onWheel, 
	        className: mainClassName, 
	        style: mainStyle, 
	        tabIndex: 0}, 
	        React.createElement("div", {
	          ref: "face", 
	          className: faceClassName, 
	          style: faceStyle}
	        )
	      )
	    );
	  },

	  componentWillMount:function() {
	    var isHorizontal = this.props.orientation === 'horizontal';
	    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

	    this._wheelHandler = new ReactWheelHandler(
	      onWheel,
	      isHorizontal, // Should hanlde horizontal scroll
	      !isHorizontal // Should handle vertical scroll
	    );
	  },

	  componentDidMount:function() {
	    this._mouseMoveTracker = new DOMMouseMoveTracker(
	      this._onMouseMove,
	      this._onMouseMoveEnd,
	      document.documentElement
	    );

	    if (this.props.position !== undefined &&
	      this.state.position !== this.props.position) {
	      this._didScroll();
	    }
	  },

	  componentWillUnmount:function() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    if (_lastScrolledScrollbar === this) {
	      _lastScrolledScrollbar = null;
	    }
	    delete this._mouseMoveTracker;
	  },

	  scrollBy:function(/*number*/ delta) {
	    this._onWheel(delta);
	  },

	  _calculateState:function(
	    /*?number*/ position,
	    /*number*/ size,
	    /*number*/ contentSize,
	    /*string*/ orientation
	    ) /*object*/ {

	    if (size < 1 || contentSize <= size) {
	      return UNSCROLLABLE_STATE;
	    }

	    position = position || 0;

	    // There are two types of positions here.
	    // 1) Phisical position: changed by mouse / keyboard
	    // 2) Logical position: changed by props.
	    // The logical position will be kept as as internal state and the `render()`
	    // function will translate it into physical position to render.

	    var isHorizontal = orientation === 'horizontal';
	    var scale = size / contentSize;
	    var faceSize = Math.round(size * scale);

	    if (faceSize < FACE_SIZE_MIN) {
	      scale = (size - FACE_SIZE_MIN) / (contentSize - FACE_SIZE_MIN);
	      faceSize = FACE_SIZE_MIN;
	    }

	    var scrollable = true;
	    var maxPosition = contentSize - size;

	    if (position < 0) {
	      position = 0;
	    } else if (position > maxPosition) {
	      position = maxPosition;
	    }

	    var isDragging = this._mouseMoveTracker ?
	      this._mouseMoveTracker.isDragging() :
	      false;

	    position = Math.round(position);
	    faceSize = Math.round(faceSize);

	    // This function should only return flat values that can be compared quiclky
	    // by `ReactComponentWithPureRenderMixin`.
	    return {
	      faceSize:faceSize,
	      isDragging:isDragging,
	      isHorizontal:isHorizontal,
	      position:position,
	      scale:scale,
	      scrollable:scrollable,
	    };
	  },

	  _onWheelY:function(/*number*/ deltaX, /*number*/ deltaY) {
	    this._onWheel(deltaY);
	  },

	  _onWheelX:function(/*number*/ deltaX, /*number*/ deltaY) {
	    this._onWheel(deltaX);
	  },

	  _onWheel:function(/*number*/ delta){
	    var props = this.props;

	    // The mouse may move faster then the animation frame does.
	    // Use `requestAnimationFrame` to avoid over-updating.
	    this._setNextState(
	      this._calculateState(
	        this.state.position + delta,
	        props.size,
	        props.contentSize,
	        props.orientation
	      )
	    );
	  },

	  _onMouseDown:function(/*object*/ event) {
	    var nextState;

	    if (event.target !== this.refs.face.getDOMNode()) {
	      // Both `offsetX` and `layerX` are non-standard DOM property but they are
	      // magically available for browsers somehow.
	      var nativeEvent = event.nativeEvent;
	      var position = this.state.isHorizontal ?
	        nativeEvent.offsetX || nativeEvent.layerX :
	        nativeEvent.offsetY || nativeEvent.layerY;

	      // MouseDown on the scroll-track directly, move the center of the
	      // scroll-face to the mouse position.
	      var props = this.props;
	      position = position / this.state.scale;
	      nextState = this._calculateState(
	        position - (this.state.faceSize * 0.5 / this.state.scale),
	        props.size,
	        props.contentSize,
	        props.orientation
	      );
	    } else {
	      nextState = {};
	    }

	    nextState.focused = true;
	    this._setNextState(nextState);

	    this._mouseMoveTracker.captureMouseMoves(event);
	    // Focus the node so it may receive keyboard event.
	    this.getDOMNode().focus();
	  },

	  _onMouseMove:function(/*number*/ deltaX, /*number*/ deltaY) {
	    var props = this.props;
	    var delta = this.state.isHorizontal ? deltaX : deltaY;
	    delta = delta / this.state.scale;

	    this._setNextState(
	      this._calculateState(
	        this.state.position + delta,
	        props.size,
	        props.contentSize,
	        props.orientation
	      )
	    );
	  },

	  _onMouseMoveEnd:function() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.setState({isDragging: false});
	  },

	  _onKeyDown:function(/*object*/ event) {
	    var keyCode = event.keyCode;

	    if (keyCode === Keys.TAB) {
	      // Let focus move off the scrollbar.
	      return;
	    }

	    var distance = KEYBOARD_SCROLL_AMOUNT;
	    var direction = 0;

	    if (this.state.isHorizontal) {
	      switch (keyCode) {
	        case Keys.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case Keys.LEFT:
	          direction = -1;
	          break;

	        case Keys.RIGHT:
	          direction = 1;
	          break;

	        default:
	          return;
	      }
	    }

	    if (!this.state.isHorizontal) {
	      switch (keyCode) {
	        case Keys.SPACE:
	          if (event.shiftKey) {
	            direction = -1;
	          } else {
	            direction = 1;
	          }
	          break;

	        case Keys.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case Keys.UP:
	          direction = -1;
	          break;

	        case Keys.DOWN:
	          direction = 1;
	          break;

	        case Keys.PAGE_UP:
	          direction = -1;
	          distance = this.props.size;
	          break;

	        case Keys.PAGE_DOWN:
	          direction = 1;
	          distance = this.props.size;
	          break;

	        default:
	          return;
	      }
	    }

	    event.preventDefault();

	    var props = this.props;
	    this._setNextState(
	      this._calculateState(
	        this.state.position + (distance * direction),
	        props.size,
	        props.contentSize,
	        props.orientation
	      )
	    );
	  },

	  _onFocus:function() {
	    this.setState({
	      focused: true,
	    });
	  },

	  _onBlur:function() {
	    this.setState({
	      focused: false,
	    });
	  },

	  _blur:function() {
	    if (this.isMounted()) {
	      try {
	        this._onBlur();
	        this.getDOMNode().blur();
	      } catch (oops) {
	        // pass
	      }
	    }
	  },

	  _setNextState:function(/*object*/ nextState, /*?object*/ props) {
	    props = props || this.props;
	    var controlledPosition = props.position;
	    var willScroll = this.state.position !== nextState.position;
	    if (controlledPosition === undefined) {
	      var callback = willScroll ? this._didScroll : undefined;
	      this.setState(nextState, callback);
	    } else if (controlledPosition === nextState.position) {
	      this.setState(nextState);
	    } else {
	      // Scrolling is controlled. Don't update the state and let the owner
	      // to update the scrollbar instead.
	      if (nextState.position !== undefined &&
	        nextState.position !== this.state.position) {
	        this.props.onScroll(nextState.position);
	      }
	      return;
	    }

	    if (willScroll && _lastScrolledScrollbar !== this) {
	      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
	      _lastScrolledScrollbar = this;
	    }
	  },

	  _didScroll:function() {
	    this.props.onScroll(this.state.position);
	  },
	});

	Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
	Scrollbar.SIZE = parseInt(cssVar('scrollbar-size'), 10);

	module.exports = Scrollbar;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableBufferedRows.react
	 * @typechecks
	 */

	var React = __webpack_require__(19);
	var FixedDataTableRowBuffer = __webpack_require__(41);
	var FixedDataTableRow = __webpack_require__(27);

	var cx = __webpack_require__(31);
	var emptyFunction = __webpack_require__(33);
	var joinClasses = __webpack_require__(42);

	var PropTypes = React.PropTypes;

	var FixedDataTableBufferedRows = React.createClass({displayName: "FixedDataTableBufferedRows",

	  propTypes: {
	    defaultRowHeight: PropTypes.number.isRequired,
	    firstRowIndex: PropTypes.number.isRequired,
	    firstRowOffset: PropTypes.number.isRequired,
	    fixedColumns: PropTypes.array.isRequired,
	    height: PropTypes.number.isRequired,
	    offsetTop: PropTypes.number.isRequired,
	    onRowClick: PropTypes.func,
	    onRowMouseDown: PropTypes.func,
	    onRowMouseEnter: PropTypes.func,
	    rowClassNameGetter: PropTypes.func,
	    rowsCount: PropTypes.number.isRequired,
	    rowGetter: PropTypes.func.isRequired,
	    rowHeightGetter: PropTypes.func,
	    scrollLeft: PropTypes.number.isRequired,
	    scrollableColumns: PropTypes.array.isRequired,
	    showLastRowBorder: PropTypes.bool,
	    width: PropTypes.number.isRequired,
	  },

	  getInitialState:function() /*object*/ {
	    this._rowBuffer =
	      new FixedDataTableRowBuffer(
	        this.props.rowsCount,
	        this.props.defaultRowHeight,
	        this.props.height,
	        this._getRowHeight
	      );
	    return ({
	      rowsToRender: this._rowBuffer.getRows(
	        this.props.firstRowIndex,
	        this.props.firstRowOffset
	      ),
	    });
	  },

	  componentWillMount:function() {
	    this._staticRowArray = [];
	  },

	  componentDidMount:function() {
	    this._bufferUpdateTimer = setTimeout(this._updateBuffer, 500);
	  },

	  componentWillReceiveProps:function(/*object*/ nextProps) {
	    if (nextProps.rowsCount !== this.props.rowsCount ||
	        nextProps.defaultRowHeight !== this.props.defaultRowHeight ||
	        nextProps.height !== this.props.height) {
	      this._rowBuffer =
	        new FixedDataTableRowBuffer(
	          nextProps.rowsCount,
	          nextProps.defaultRowHeight,
	          nextProps.height,
	          this._getRowHeight
	        );
	    }
	    this.setState({
	      rowsToRender: this._rowBuffer.getRows(
	        nextProps.firstRowIndex,
	        nextProps.firstRowOffset
	      ),
	    });
	    if (this._bufferUpdateTimer) {
	      clearTimeout(this._bufferUpdateTimer);
	    }
	    this._bufferUpdateTimer = setTimeout(this._updateBuffer, 400);
	  },

	  _updateBuffer:function() {
	    this._bufferUpdateTimer = null;
	    if (this.isMounted()) {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer(),
	      });
	    }
	  },

	  shouldComponentUpdate:function() /*boolean*/ {
	    // Don't add PureRenderMixin to this component please.
	    return true;
	  },

	  componentWillUnmount:function() {
	    this._staticRowArray.length = 0;
	  },

	  render:function() /*object*/ {
	    var props = this.props;
	    var offsetTop = props.offsetTop;
	    var rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
	    var rowGetter = props.rowGetter;

	    var rowsToRender = this.state.rowsToRender;
	    this._staticRowArray.length = rowsToRender.length;

	    for (var i = 0; i < rowsToRender.length; ++i) {
	      var rowInfo = rowsToRender[i];
	      var rowIndex = rowInfo.rowIndex;
	      var rowOffsetTop = rowInfo.offsetTop;
	      var currentRowHeight = this._getRowHeight(rowIndex);

	      var hasBottomBorder =
	        rowIndex === props.rowsCount - 1 && props.showLastRowBorder;

	      this._staticRowArray[i] =
	        React.createElement(FixedDataTableRow, {
	          key: i, 
	          index: rowIndex, 
	          data: rowGetter(rowIndex), 
	          width: props.width, 
	          height: currentRowHeight, 
	          scrollLeft: Math.round(props.scrollLeft), 
	          offsetTop: Math.round(offsetTop + rowOffsetTop), 
	          fixedColumns: props.fixedColumns, 
	          scrollableColumns: props.scrollableColumns, 
	          onClick: props.onRowClick, 
	          onMouseDown: props.onRowMouseDown, 
	          onMouseEnter: props.onRowMouseEnter, 
	          className: joinClasses(
	            rowClassNameGetter(rowIndex),
	            cx('public/fixedDataTable/bodyRow'),
	            hasBottomBorder ? cx('fixedDataTable/hasBottomBorder') : null
	          )}
	        );
	    }

	    return React.createElement("div", null, this._staticRowArray);
	  },

	  _getRowHeight:function(/*number*/ index) /*number*/ {
	    return this.props.rowHeightGetter ?
	      this.props.rowHeightGetter(index) :
	      this.props.defaultRowHeight;
	  },
	});

	module.exports = FixedDataTableBufferedRows;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is to be used with the FixedDataTable. It is a read line
	 * that when you click on a column that is resizable appears and allows
	 * you to resize the corresponding column.
	 *
	 * @providesModule FixedDataTableColumnResizeHandle.react
	 * @typechecks
	 */

	var DOMMouseMoveTracker = __webpack_require__(38);
	var Locale = __webpack_require__(21);
	var React = __webpack_require__(19);
	var ReactComponentWithPureRenderMixin = __webpack_require__(22);

	var clamp = __webpack_require__(43);
	var cx = __webpack_require__(31);

	var PropTypes = React.PropTypes;

	var FixedDataTableColumnResizeHandle = React.createClass({displayName: "FixedDataTableColumnResizeHandle",
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    visible: PropTypes.bool.isRequired,

	    /**
	     * This is the height of the line
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * Offset from left border of the table, please note
	     * that the line is a border on diff. So this is really the
	     * offset of the column itself.
	     */
	    leftOffset: PropTypes.number.isRequired,

	    /**
	     * Height of the clickable region of the line.
	     * This is assumed to be at the top of the line.
	     */
	    knobHeight: PropTypes.number.isRequired,

	    /**
	     * The line is a border on a diff, so this is essentially
	     * the width of column.
	     */
	    initialWidth: PropTypes.number,

	    /**
	     * The minimum width this dragger will collapse to
	     */
	    minWidth: PropTypes.number,

	    /**
	     * The maximum width this dragger will collapse to
	     */
	    maxWidth: PropTypes.number,

	    /**
	     * Initial click event on the header cell.
	     */
	    initialEvent: PropTypes.object,

	    /**
	     * When resizing is complete this is called.
	     */
	    onColumnResizeEnd: PropTypes.func,

	    /**
	     * Column key for the column being resized.
	     */
	    columnKey: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.number
	    ]),
	  },

	  getInitialState:function() /*object*/ {
	    return {
	      width: 0,
	      cursorDelta: 0
	    };
	  },

	  componentWillReceiveProps:function(/*object*/ newProps) {
	    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
	      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
	      this.setState({
	        width: newProps.initialWidth,
	        cursorDelta: newProps.initialWidth
	      });
	    }
	  },

	  componentDidMount:function() {
	    this._mouseMoveTracker = new DOMMouseMoveTracker(
	      this._onMove,
	      this._onColumnResizeEnd,
	      document.body
	    );
	  },

	  componentWillUnmount:function() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this._mouseMoveTracker = null;
	  },

	  render:function() /*object*/ {
	    var style = {
	      width: this.state.width,
	      height: this.props.height,
	    };
	    if (Locale.isRTL()) {
	      style.right = this.props.leftOffset;
	    } else {
	      style.left = this.props.leftOffset;
	    }
	    return (
	      React.createElement("div", {
	        className: cx({
	          'fixedDataTableColumnResizerLine/main': true,
	          'fixedDataTableColumnResizerLine/hiddenElem': !this.props.visible
	        }), 
	        style: style}, 
	        React.createElement("div", {
	          className: cx('fixedDataTableColumnResizerLine/mouseArea'), 
	          style: {height: this.props.height}}
	        )
	      )
	    );
	  },

	  _onMove:function(/*number*/ deltaX) {
	    if (Locale.isRTL()) {
	      deltaX = -deltaX;
	    }
	    var newWidth = this.state.cursorDelta + deltaX;
	    var newColumnWidth =
	      clamp(this.props.minWidth, newWidth, this.props.maxWidth);

	    // Please note cursor delta is the different between the currently width
	    // and the new width.
	    this.setState({
	      width: newColumnWidth,
	      cursorDelta: newWidth
	    });
	  },

	  _onColumnResizeEnd:function() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.props.onColumnResizeEnd(
	      this.state.width,
	      this.props.columnKey
	    );
	  },
	});

	module.exports = FixedDataTableColumnResizeHandle;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRow.react
	 * @typechecks
	 */

	"use strict";

	var FixedDataTableHelper = __webpack_require__(20);
	var React = __webpack_require__(19);
	var ReactComponentWithPureRenderMixin = __webpack_require__(22);
	var FixedDataTableCellGroup = __webpack_require__(44);

	var cx = __webpack_require__(31);
	var joinClasses = __webpack_require__(42);
	var translateDOMPositionXY = __webpack_require__(36);

	var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;
	var PropTypes = React.PropTypes;

	/**
	 * Component that renders the row for <FixedDataTable />.
	 * This component should not be used directly by developer. Instead,
	 * only <FixedDataTable /> should use the component internally.
	 */
	var FixedDataTableRowImpl = React.createClass({displayName: "FixedDataTableRowImpl",
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    /**
	     * The row data to render. The data format can be a simple Map object
	     * or an Array of data.
	     */
	    data: PropTypes.oneOfType([
	      PropTypes.object,
	      PropTypes.array
	    ]),

	    /**
	     * Array of <FixedDataTableColumn /> for the fixed columns.
	     */
	    fixedColumns: PropTypes.array.isRequired,

	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * The row index.
	     */
	    index: PropTypes.number.isRequired,

	    /**
	     * Array of <FixedDataTableColumn /> for the scrollable columns.
	     */
	    scrollableColumns: PropTypes.array.isRequired,

	    /**
	     * The distance between the left edge of the table and the leftmost portion
	     * of the row currently visible in the table.
	     */
	    scrollLeft: PropTypes.number.isRequired,

	    /**
	     * Width of the row.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Fire when a row is clicked.
	     */
	    onClick: PropTypes.func,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number leftOffset
	     * @param number cellWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: PropTypes.func,
	  },

	  render:function() /*object*/ {
	    var style = {
	      width: this.props.width,
	      height: this.props.height,
	    };

	    var className = cx({
	      'public/fixedDataTableRow/main': true,
	      'public/fixedDataTableRow/highlighted': (this.props.index % 2 === 1)
	    });

	    if (!this.props.data) {
	      return (
	        React.createElement("div", {
	          className: joinClasses(className, this.props.className), 
	          style: style}
	        )
	      );
	    }

	    var fixedColumns =
	      React.createElement(FixedDataTableCellGroup, {
	        key: "fixed_cells", 
	        height: this.props.height, 
	        left: 0, 
	        zIndex: 2, 
	        columns: this.props.fixedColumns, 
	        data: this.props.data, 
	        onColumnResize: this.props.onColumnResize, 
	        rowHeight: this.props.height, 
	        rowIndex: this.props.index}
	      );
	    var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
	    var columnsShadow = this._renderColumnsShadow(fixedColumnsWidth);
	    var scrollableColumns =
	      React.createElement(FixedDataTableCellGroup, {
	        key: "scrollable_cells", 
	        height: this.props.height, 
	        left: (fixedColumnsWidth - this.props.scrollLeft) * DIR_SIGN, 
	        zIndex: 0, 
	        columns: this.props.scrollableColumns, 
	        data: this.props.data, 
	        onColumnResize: this.props.onColumnResize, 
	        rowHeight: this.props.height, 
	        rowIndex: this.props.index}
	      );

	    return (
	      React.createElement("div", {
	        className: joinClasses(className, this.props.className), 
	        onClick: this.props.onClick ? this._onClick : null, 
	        onMouseDown: this.props.onMouseDown ? this._onMouseDown : null, 
	        onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null, 
	        style: style}, 
	        React.createElement("div", {className: cx('fixedDataTableRow/body')}, 
	          fixedColumns, 
	          scrollableColumns, 
	          columnsShadow
	        )
	      )
	    );
	  },

	  _getColumnsWidth:function(/*array*/ columns) /*number*/ {
	    var width = 0;
	    for (var i = 0; i < columns.length; ++i) {
	      width += columns[i].props.width;
	    }
	    return width;
	  },

	  _renderColumnsShadow:function(/*number*/ left) /*?object*/ {
	    if (left > 0) {
	      var className = cx({
	        'fixedDataTableRow/fixedColumnsDivider': true,
	        'fixedDataTableRow/columnsShadow': this.props.scrollLeft > 0,
	      });
	      var style = {
	        left: left,
	        height: this.props.height
	      };
	      return React.createElement("div", {className: className, style: style});
	    }
	  },

	  _onClick:function(/*object*/ event) {
	    this.props.onClick(event, this.props.index, this.props.data);
	  },

	  _onMouseDown:function(/*object*/ event) {
	    this.props.onMouseDown(event, this.props.index, this.props.data);
	  },

	  _onMouseEnter:function(/*object*/ event) {
	    this.props.onMouseEnter(event, this.props.index, this.props.data);
	  },
	});

	var FixedDataTableRow = React.createClass({displayName: "FixedDataTableRow",
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: PropTypes.number,

	    /**
	     * The vertical position where the row should render itself
	     */
	    offsetTop: PropTypes.number.isRequired,

	    /**
	     * Width of the row.
	     */
	    width: PropTypes.number.isRequired,
	  },

	  render:function() /*object*/ {
	    var style = {
	      width: this.props.width,
	      height: this.props.height,
	      zIndex: (this.props.zIndex ? this.props.zIndex : 0),
	    };
	    translateDOMPositionXY(style, 0, this.props.offsetTop);

	    return (
	      React.createElement("div", {
	        style: style, 
	        className: cx('fixedDataTableRow/rowWrapper')}, 
	        React.createElement(FixedDataTableRowImpl, React.__spread({}, 
	          this.props, 
	          {offsetTop: undefined, 
	          zIndex: undefined})
	        )
	      )
	    );
	  },
	});


	module.exports = FixedDataTableRow;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableScrollHelper
	 * @typechecks
	 */
	'use strict';

	var PrefixIntervalTree = __webpack_require__(45);
	var clamp = __webpack_require__(43);

	var BUFFER_ROWS = 5;


	  function FixedDataTableScrollHelper(
	rowCount,
	    /*number*/ defaultRowHeight,
	    /*number*/ viewportHeight,
	    /*?function*/ rowHeightGetter)
	   {
	    this.$FixedDataTableScrollHelper_rowOffsets = new PrefixIntervalTree(rowCount, defaultRowHeight);
	    this.$FixedDataTableScrollHelper_storedHeights = new Array(rowCount);
	    for (var i = 0; i < rowCount; ++i) {
	      this.$FixedDataTableScrollHelper_storedHeights[i] = defaultRowHeight;
	    }
	    this.$FixedDataTableScrollHelper_rowCount = rowCount;
	    this.$FixedDataTableScrollHelper_position = 0;
	    this.$FixedDataTableScrollHelper_contentHeight = rowCount * defaultRowHeight;
	    this.$FixedDataTableScrollHelper_defaultRowHeight = defaultRowHeight;
	    this.$FixedDataTableScrollHelper_rowHeightGetter = rowHeightGetter ?
	      rowHeightGetter :
	      function()  {return defaultRowHeight;};
	    this.$FixedDataTableScrollHelper_viewportHeight = viewportHeight;
	    this.scrollRowIntoView = this.scrollRowIntoView.bind(this);
	    this.setViewportHeight = this.setViewportHeight.bind(this);
	    this.scrollBy = this.scrollBy.bind(this);
	    this.scrollTo = this.scrollTo.bind(this);
	    this.scrollToRow = this.scrollToRow.bind(this);
	    this.setRowHeightGetter = this.setRowHeightGetter.bind(this);
	    this.getContentHeight = this.getContentHeight.bind(this);

	    this.$FixedDataTableScrollHelper_updateHeightsInViewport(0, 0);
	  }

	  FixedDataTableScrollHelper.prototype.setRowHeightGetter=function(rowHeightGetter) {
	    this.$FixedDataTableScrollHelper_rowHeightGetter = rowHeightGetter;
	  };

	  FixedDataTableScrollHelper.prototype.setViewportHeight=function(viewportHeight) {
	    this.$FixedDataTableScrollHelper_viewportHeight = viewportHeight;
	  };

	  FixedDataTableScrollHelper.prototype.getContentHeight=function()  {
	    return this.$FixedDataTableScrollHelper_contentHeight;
	  };

	  FixedDataTableScrollHelper.prototype.$FixedDataTableScrollHelper_updateHeightsInViewport=function(
	firstRowIndex,
	    /*number*/ firstRowOffset)
	   {
	    var top = firstRowOffset;
	    var index = firstRowIndex;
	    while (top <= this.$FixedDataTableScrollHelper_viewportHeight && index < this.$FixedDataTableScrollHelper_rowCount) {
	      this.$FixedDataTableScrollHelper_updateRowHeight(index);
	      top += this.$FixedDataTableScrollHelper_storedHeights[index];
	      index++;
	    }
	  };

	  FixedDataTableScrollHelper.prototype.$FixedDataTableScrollHelper_updateHeightsAboveViewport=function(firstRowIndex) {
	    var index = firstRowIndex - 1;
	    while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
	      var delta = this.$FixedDataTableScrollHelper_updateRowHeight(index);
	      this.$FixedDataTableScrollHelper_position += delta;
	      index--;
	    }
	  };

	  FixedDataTableScrollHelper.prototype.$FixedDataTableScrollHelper_updateRowHeight=function(rowIndex)  {
	    if (rowIndex < 0 || rowIndex >= this.$FixedDataTableScrollHelper_rowCount) {
	      return 0;
	    }
	    var newHeight = this.$FixedDataTableScrollHelper_rowHeightGetter(rowIndex);
	    if (newHeight !== this.$FixedDataTableScrollHelper_storedHeights[rowIndex]) {
	      var change = newHeight - this.$FixedDataTableScrollHelper_storedHeights[rowIndex];
	      this.$FixedDataTableScrollHelper_rowOffsets.set(rowIndex, newHeight);
	      this.$FixedDataTableScrollHelper_storedHeights[rowIndex] = newHeight;
	      this.$FixedDataTableScrollHelper_contentHeight += change;
	      return change;
	    }
	    return 0;
	  };

	  FixedDataTableScrollHelper.prototype.scrollBy=function(delta)  {
	    var firstRow = this.$FixedDataTableScrollHelper_rowOffsets.upperBound(this.$FixedDataTableScrollHelper_position);
	    var firstRowPosition =
	      firstRow.value - this.$FixedDataTableScrollHelper_storedHeights[firstRow.index];
	    var rowIndex = firstRow.index;
	    var position = this.$FixedDataTableScrollHelper_position;

	    var rowHeightChange = this.$FixedDataTableScrollHelper_updateRowHeight(rowIndex);
	    if (firstRowPosition !== 0) {
	      position += rowHeightChange;
	    }
	    var visibleRowHeight = this.$FixedDataTableScrollHelper_storedHeights[rowIndex] -
	      (position - firstRowPosition);

	    if (delta >= 0) {

	      while (delta > 0 && rowIndex < this.$FixedDataTableScrollHelper_rowCount) {
	        if (delta < visibleRowHeight) {
	          position += delta;
	          delta = 0;
	        } else {
	          delta -= visibleRowHeight;
	          position += visibleRowHeight;
	          rowIndex++;
	        }
	        if (rowIndex < this.$FixedDataTableScrollHelper_rowCount) {
	          this.$FixedDataTableScrollHelper_updateRowHeight(rowIndex);
	          visibleRowHeight = this.$FixedDataTableScrollHelper_storedHeights[rowIndex];
	        }
	      }
	    } else if (delta < 0) {
	      delta = -delta;
	      var invisibleRowHeight = this.$FixedDataTableScrollHelper_storedHeights[rowIndex] - visibleRowHeight;

	      while (delta > 0 && rowIndex >= 0) {
	        if (delta < invisibleRowHeight) {
	          position -= delta;
	          delta = 0;
	        } else {
	          position -= invisibleRowHeight;
	          delta -= invisibleRowHeight;
	          rowIndex--;
	        }
	        if (rowIndex >= 0) {
	          var change = this.$FixedDataTableScrollHelper_updateRowHeight(rowIndex);
	          invisibleRowHeight = this.$FixedDataTableScrollHelper_storedHeights[rowIndex];
	          position += change;
	        }
	      }
	    }

	    var maxPosition = this.$FixedDataTableScrollHelper_contentHeight - this.$FixedDataTableScrollHelper_viewportHeight;
	    position = clamp(0, position, maxPosition);
	    this.$FixedDataTableScrollHelper_position = position;
	    var firstVisibleRow = this.$FixedDataTableScrollHelper_rowOffsets.upperBound(position);
	    var firstRowIndex = firstVisibleRow.index;
	    firstRowPosition =
	      firstVisibleRow.value - this.$FixedDataTableScrollHelper_rowHeightGetter(firstRowIndex);
	    var firstRowOffset = firstRowPosition - position;

	    this.$FixedDataTableScrollHelper_updateHeightsInViewport(firstRowIndex, firstRowOffset);
	    this.$FixedDataTableScrollHelper_updateHeightsAboveViewport(firstRowIndex);

	    return {
	      index: firstRowIndex,
	      offset: firstRowOffset,
	      position: this.$FixedDataTableScrollHelper_position,
	      contentHeight: this.$FixedDataTableScrollHelper_contentHeight,
	    };
	  };

	  FixedDataTableScrollHelper.prototype.$FixedDataTableScrollHelper_getRowAtEndPosition=function(rowIndex)  {
	    // We need to update enough rows above the selected one to be sure that when
	    // we scroll to selected position all rows between first shown and selected
	    // one have most recent heights computed and will not resize
	    this.$FixedDataTableScrollHelper_updateRowHeight(rowIndex);
	    var currentRowIndex = rowIndex;
	    var top = this.$FixedDataTableScrollHelper_storedHeights[currentRowIndex];
	    while (top < this.$FixedDataTableScrollHelper_viewportHeight && currentRowIndex >= 0) {
	      currentRowIndex--;
	      if (currentRowIndex >= 0) {
	        this.$FixedDataTableScrollHelper_updateRowHeight(currentRowIndex);
	        top += this.$FixedDataTableScrollHelper_storedHeights[currentRowIndex];
	      }
	    }
	    var position = this.$FixedDataTableScrollHelper_rowOffsets.get(rowIndex).value - this.$FixedDataTableScrollHelper_viewportHeight;
	    if (position < 0) {
	      position = 0;
	    }
	    return position;
	  };

	  FixedDataTableScrollHelper.prototype.scrollTo=function(position)  {
	    if (position <= 0) {
	      // If position less than or equal to 0 first row should be fully visible
	      // on top
	      this.$FixedDataTableScrollHelper_position = 0;
	      this.$FixedDataTableScrollHelper_updateHeightsInViewport(0, 0);

	      return {
	        index: 0,
	        offset: 0,
	        position: this.$FixedDataTableScrollHelper_position,
	        contentHeight: this.$FixedDataTableScrollHelper_contentHeight,
	      };
	    } else if (position >= this.$FixedDataTableScrollHelper_contentHeight - this.$FixedDataTableScrollHelper_viewportHeight) {
	      // If position is equal to or greater than max scroll value, we need
	      // to make sure to have bottom border of last row visible.
	      var rowIndex = this.$FixedDataTableScrollHelper_rowCount - 1;
	      position = this.$FixedDataTableScrollHelper_getRowAtEndPosition(rowIndex);
	    }
	    this.$FixedDataTableScrollHelper_position = position;

	    var firstVisibleRow = this.$FixedDataTableScrollHelper_rowOffsets.upperBound(position);
	    var firstRowIndex = Math.max(firstVisibleRow.index, 0);
	    var firstRowPosition =
	      firstVisibleRow.value - this.$FixedDataTableScrollHelper_rowHeightGetter(firstRowIndex);
	    var firstRowOffset = firstRowPosition - position;

	    this.$FixedDataTableScrollHelper_updateHeightsInViewport(firstRowIndex, firstRowOffset);
	    this.$FixedDataTableScrollHelper_updateHeightsAboveViewport(firstRowIndex);

	    return {
	      index: firstRowIndex,
	      offset: firstRowOffset,
	      position: this.$FixedDataTableScrollHelper_position,
	      contentHeight: this.$FixedDataTableScrollHelper_contentHeight,
	    };
	  };

	  /**
	   * Allows to scroll to selected row with specified offset. It always
	   * brings that row to top of viewport with that offset
	   */
	  FixedDataTableScrollHelper.prototype.scrollToRow=function(rowIndex, /*number*/ offset)  {
	    rowIndex = clamp(0, rowIndex, this.$FixedDataTableScrollHelper_rowCount - 1);
	    offset = clamp(-this.$FixedDataTableScrollHelper_storedHeights[rowIndex], offset, 0);
	    var firstRow = this.$FixedDataTableScrollHelper_rowOffsets.get(rowIndex);
	    return this.scrollTo(
	      firstRow.value - this.$FixedDataTableScrollHelper_storedHeights[rowIndex] - offset
	    );
	  };

	  /**
	   * Allows to scroll to selected row by bringing it to viewport with minimal
	   * scrolling. This that if row is fully visible, scroll will not be changed.
	   * If top border of row is above top of viewport it will be scrolled to be
	   * fully visible on the top of viewport. If the bottom border of row is
	   * below end of viewport, it will be scrolled up to be fully visible on the
	   * bottom of viewport.
	   */
	  FixedDataTableScrollHelper.prototype.scrollRowIntoView=function(rowIndex)  {
	    rowIndex = clamp(0, rowIndex, this.$FixedDataTableScrollHelper_rowCount - 1);
	    var rowEnd = this.$FixedDataTableScrollHelper_rowOffsets.get(rowIndex).value;
	    var rowBegin = rowEnd - this.$FixedDataTableScrollHelper_storedHeights[rowIndex];
	    if (rowBegin < this.$FixedDataTableScrollHelper_position) {
	      return this.scrollTo(rowBegin);
	    } else if (rowEnd > this.$FixedDataTableScrollHelper_position + this.$FixedDataTableScrollHelper_viewportHeight) {
	      var position = this.$FixedDataTableScrollHelper_getRowAtEndPosition(rowIndex);
	      return this.scrollTo(position);
	    }
	    return this.scrollTo(this.$FixedDataTableScrollHelper_position);
	  };


	module.exports = FixedDataTableScrollHelper;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableWidthHelper
	 * @typechecks
	 */
	'use strict';

	var React = __webpack_require__(19);

	var cloneWithProps = __webpack_require__(30);

	function getTotalWidth(/*array*/ columns) /*number*/ {
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalWidth += columns[i].props.width;
	  }
	  return totalWidth;
	}

	function getTotalFlexGrow(/*array*/ columns) /*number*/ {
	  var totalFlexGrow = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalFlexGrow += columns[i].props.flexGrow || 0;
	  }
	  return totalFlexGrow;
	}

	function distributeFlexWidth(
	  /*array*/ columns,
	  /*number*/ flexWidth
	) /*object*/ {
	  if (flexWidth <= 0) {
	    return {
	      columns: columns,
	      width: getTotalWidth(columns),
	    };
	  }
	  var remainingFlexGrow = getTotalFlexGrow(columns);
	  var remainingFlexWidth = flexWidth;
	  var newColumns = [];
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    var column = columns[i];
	    if (!column.props.flexGrow) {
	      totalWidth += column.props.width;
	      newColumns.push(column);
	      continue;
	    }
	    var columnFlexWidth = Math.floor(
	      column.props.flexGrow / remainingFlexGrow * remainingFlexWidth
	    );
	    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
	    totalWidth += newColumnWidth;

	    remainingFlexGrow -= column.props.flexGrow;
	    remainingFlexWidth -= columnFlexWidth;

	    newColumns.push(cloneWithProps(
	      column,
	      {width: newColumnWidth}
	    ));
	  }

	  return {
	    columns: newColumns,
	    width: totalWidth,
	  };
	}

	function adjustColumnGroupWidths(
	  /*array*/ columnGroups,
	  /*number*/ expectedWidth
	) /*object*/ {
	  var allColumns = [];
	  var i;
	  for (i = 0; i < columnGroups.length; ++i) {
	    React.Children.forEach(
	      columnGroups[i].props.children,
	      function(column)  {allColumns.push(column);}
	    );
	  }
	  var columnsWidth = getTotalWidth(allColumns);
	  var remainingFlexGrow = getTotalFlexGrow(allColumns);
	  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

	  var newAllColumns = [];
	  var newColumnGroups = [];

	  for (i = 0; i < columnGroups.length; ++i) {
	    var columnGroup = columnGroups[i];
	    var currentColumns = [];

	    React.Children.forEach(
	      columnGroup.props.children,
	      function(column)  {currentColumns.push(column);}
	    );

	    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
	    var columnGroupFlexWidth = Math.floor(
	      columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth
	    );

	    var newColumnSettings = distributeFlexWidth(
	      currentColumns,
	      columnGroupFlexWidth
	    );

	    remainingFlexGrow -= columnGroupFlexGrow;
	    remainingFlexWidth -= columnGroupFlexWidth;

	    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
	      newAllColumns.push(newColumnSettings.columns[j]);
	    }

	    newColumnGroups.push(cloneWithProps(
	      columnGroup,
	      {width: newColumnSettings.width}
	    ));
	  }

	  return {
	    columns: newAllColumns,
	    columnGroups: newColumnGroups,
	  };
	}

	function adjustColumnWidths(
	  /*array*/ columns,
	  /*number*/ expectedWidth
	) /*array*/ {
	  var columnsWidth = getTotalWidth(columns);
	  if (columnsWidth < expectedWidth) {
	    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
	  }
	  return columns;
	}

	var FixedDataTableWidthHelper = {
	  getTotalWidth:getTotalWidth,
	  getTotalFlexGrow:getTotalFlexGrow,
	  distributeFlexWidth:distributeFlexWidth,
	  adjustColumnWidths:adjustColumnWidths,
	  adjustColumnGroupWidths:adjustColumnGroupWidths,
	};

	module.exports = FixedDataTableWidthHelper;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cloneWithProps
	 */

	module.exports = __webpack_require__(61);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	var slashReplaceRegex = /\//g;
	var cache = {};

	function getClassName(className) {
	  if (cache[className]) {
	    return cache[className];
	  }

	  cache[className] = className.replace(slashReplaceRegex, '_');
	  return cache[className];
	}

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  var classNamesArray;
	  if (typeof classNames == 'object') {
	    classNamesArray = Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    });
	  } else {
	    classNamesArray = Array.prototype.slice.call(arguments);
	  }

	  return classNamesArray.map(getClassName).join(' ');
	}

	module.exports = cx;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule debounceCore
	 * @typechecks
	 */

	/**
	 * Invokes the given callback after a specified number of milliseconds have
	 * elapsed, ignoring subsequent calls.
	 *
	 * For example, if you wanted to update a preview after the user stops typing
	 * you could do the following:
	 *
	 *   elem.addEventListener('keyup', debounce(this.updatePreview, 250), false);
	 *
	 * The returned function has a reset method which can be called to cancel a
	 * pending invocation.
	 *
	 *   var debouncedUpdatePreview = debounce(this.updatePreview, 250);
	 *   elem.addEventListener('keyup', debouncedUpdatePreview, false);
	 *
	 *   // later, to cancel pending calls
	 *   debouncedUpdatePreview.reset();
	 *
	 * @param {function} func - the function to debounce
	 * @param {number} wait - how long to wait in milliseconds
	 * @param {*} context - optional context to invoke the function in
	 * @param {?function} setTimeoutFunc - an implementation of setTimeout
	 *  if nothing is passed in the default setTimeout function is used
	  * @param {?function} clearTimeoutFunc - an implementation of clearTimeout
	 *  if nothing is passed in the default clearTimeout function is used
	 */
	function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
	  setTimeoutFunc = setTimeoutFunc || setTimeout;
	  clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
	  var timeout;

	  function debouncer() {for (var args=[],$__0=0,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    debouncer.reset();

	    timeout = setTimeoutFunc(function() {
	      func.apply(context, args);
	    }, wait);
	  }

	  debouncer.reset = function() {
	    clearTimeoutFunc(timeout);
	  };

	  return debouncer;
	}

	module.exports = debounce;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };

	module.exports = emptyFunction;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */

	'use strict';

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule translateDOMPositionXY
	 * @typechecks
	 */

	"use strict";

	var BrowserSupportCore = __webpack_require__(48);

	var getVendorPrefixedName = __webpack_require__(49);

	var TRANSFORM = getVendorPrefixedName('transform');
	var BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

	var translateDOMPositionXY = (function() {
	  if (BrowserSupportCore.hasCSSTransforms()) {
	    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
	    var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
	    // It appears that Safari messes up the composition order
	    // of GPU-accelerated layers
	    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
	    // Use 2D translation instead.
	    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
	      return function(/*object*/ style, /*number*/ x, /*number*/ y) {
	        style[TRANSFORM] ='translate3d(' + x + 'px,' + y + 'px,0)';
	        style[BACKFACE_VISIBILITY] = 'hidden';
	      };
	    } else {
	      return function(/*object*/ style, /*number*/ x, /*number*/ y) {
	        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
	      };
	    }
	  } else {
	    return function(/*object*/ style, /*number*/ x, /*number*/ y) {
	      style.left = x + 'px';
	      style.top = y + 'px';
	    };
	  }
	})();

	module.exports = translateDOMPositionXY;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMMouseMoveTracker
	 * @typechecks
	 */

	"use strict";

	var EventListener = __webpack_require__(50);

	var cancelAnimationFramePolyfill = __webpack_require__(51);
	var requestAnimationFramePolyfill = __webpack_require__(47);


	  /**
	   * onMove is the callback that will be called on every mouse move.
	   * onMoveEnd is called on mouse up when movement has ended.
	   */
	  function DOMMouseMoveTracker(
	onMove,
	    /*function*/ onMoveEnd,
	    /*DOMElement*/ domNode) {
	    this.$DOMMouseMoveTracker_isDragging = false;
	    this.$DOMMouseMoveTracker_animationFrameID = null;
	    this.$DOMMouseMoveTracker_domNode = domNode;
	    this.$DOMMouseMoveTracker_onMove = onMove;
	    this.$DOMMouseMoveTracker_onMoveEnd = onMoveEnd;
	    this.$DOMMouseMoveTracker_onMouseMove = this.$DOMMouseMoveTracker_onMouseMove.bind(this);
	    this.$DOMMouseMoveTracker_onMouseUp = this.$DOMMouseMoveTracker_onMouseUp.bind(this);
	    this.$DOMMouseMoveTracker_didMouseMove = this.$DOMMouseMoveTracker_didMouseMove.bind(this);
	  }

	  /**
	   * This is to set up the listeners for listening to mouse move
	   * and mouse up signaling the movement has ended. Please note that these
	   * listeners are added at the document.body level. It takes in an event
	   * in order to grab inital state.
	   */
	  DOMMouseMoveTracker.prototype.captureMouseMoves=function(event) {
	    if (!this.$DOMMouseMoveTracker_eventMoveToken && !this.$DOMMouseMoveTracker_eventUpToken) {
	      this.$DOMMouseMoveTracker_eventMoveToken = EventListener.listen(
	        this.$DOMMouseMoveTracker_domNode,
	        'mousemove',
	        this.$DOMMouseMoveTracker_onMouseMove
	      );
	      this.$DOMMouseMoveTracker_eventUpToken = EventListener.listen(
	        this.$DOMMouseMoveTracker_domNode,
	        'mouseup',
	        this.$DOMMouseMoveTracker_onMouseUp
	      );
	    }

	    if (!this.$DOMMouseMoveTracker_isDragging) {
	      this.$DOMMouseMoveTracker_deltaX = 0;
	      this.$DOMMouseMoveTracker_deltaY = 0;
	      this.$DOMMouseMoveTracker_isDragging = true;
	      this.$DOMMouseMoveTracker_x = event.clientX;
	      this.$DOMMouseMoveTracker_y = event.clientY;
	    }
	    event.preventDefault();
	  };

	  /**
	   * These releases all of the listeners on document.body.
	   */
	  DOMMouseMoveTracker.prototype.releaseMouseMoves=function() {
	    if (this.$DOMMouseMoveTracker_eventMoveToken && this.$DOMMouseMoveTracker_eventUpToken) {
	      this.$DOMMouseMoveTracker_eventMoveToken.remove();
	      this.$DOMMouseMoveTracker_eventMoveToken = null;
	      this.$DOMMouseMoveTracker_eventUpToken.remove();
	      this.$DOMMouseMoveTracker_eventUpToken = null;
	    }

	    if (this.$DOMMouseMoveTracker_animationFrameID !== null) {
	      cancelAnimationFramePolyfill(this.$DOMMouseMoveTracker_animationFrameID);
	      this.$DOMMouseMoveTracker_animationFrameID = null;
	    }

	    if (this.$DOMMouseMoveTracker_isDragging) {
	      this.$DOMMouseMoveTracker_isDragging = false;
	      this.$DOMMouseMoveTracker_x = null;
	      this.$DOMMouseMoveTracker_y = null;
	    }
	  };

	  /**
	   * Returns whether or not if the mouse movement is being tracked.
	   */
	  DOMMouseMoveTracker.prototype.isDragging=function() {
	    return this.$DOMMouseMoveTracker_isDragging;
	  };

	  /**
	   * Calls onMove passed into constructor and updates internal state.
	   */
	  DOMMouseMoveTracker.prototype.$DOMMouseMoveTracker_onMouseMove=function(event) {
	    var x = event.clientX;
	    var y = event.clientY;

	    this.$DOMMouseMoveTracker_deltaX += (x - this.$DOMMouseMoveTracker_x);
	    this.$DOMMouseMoveTracker_deltaY += (y - this.$DOMMouseMoveTracker_y);

	    if (this.$DOMMouseMoveTracker_animationFrameID === null) {
	      // The mouse may move faster then the animation frame does.
	      // Use `requestAnimationFramePolyfill` to avoid over-updating.
	      this.$DOMMouseMoveTracker_animationFrameID =
	        requestAnimationFramePolyfill(this.$DOMMouseMoveTracker_didMouseMove);
	    }

	    this.$DOMMouseMoveTracker_x = x;
	    this.$DOMMouseMoveTracker_y = y;
	    event.preventDefault();
	  };

	  DOMMouseMoveTracker.prototype.$DOMMouseMoveTracker_didMouseMove=function() {
	    this.$DOMMouseMoveTracker_animationFrameID = null;
	    this.$DOMMouseMoveTracker_onMove(this.$DOMMouseMoveTracker_deltaX, this.$DOMMouseMoveTracker_deltaY);
	    this.$DOMMouseMoveTracker_deltaX = 0;
	    this.$DOMMouseMoveTracker_deltaY = 0;
	  };

	  /**
	   * Calls onMoveEnd passed into constructor and updates internal state.
	   */
	  DOMMouseMoveTracker.prototype.$DOMMouseMoveTracker_onMouseUp=function() {
	    if (this.$DOMMouseMoveTracker_animationFrameID) {
	      this.$DOMMouseMoveTracker_didMouseMove();
	    }
	    this.$DOMMouseMoveTracker_onMoveEnd();
	  };


	module.exports = DOMMouseMoveTracker;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Keys
	 */

	module.exports = {
	  BACKSPACE:  8,
	  TAB:        9,
	  RETURN:    13,
	  ALT:       18,
	  ESC:       27,
	  SPACE:     32,
	  PAGE_UP:   33,
	  PAGE_DOWN: 34,
	  END:       35,
	  HOME:      36,
	  LEFT:      37,
	  UP:        38,
	  RIGHT:     39,
	  DOWN:      40,
	  DELETE:    46,
	  COMMA:    188,
	  PERIOD:   190,
	  A:         65,
	  Z:         90,
	  ZERO:      48,
	  NUMPAD_0:  96,
	  NUMPAD_9: 105
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cssVar
	 * @typechecks
	 */

	"use strict";

	var CSS_VARS = {
	  'scrollbar-face-active-color': '#7d7d7d',
	  'scrollbar-face-color': '#c2c2c2',
	  'scrollbar-face-margin': '4px',
	  'scrollbar-face-radius': '6px',
	  'scrollbar-size': '15px',
	  'scrollbar-size-large': '17px',
	  'scrollbar-track-color': 'rgba(255, 255, 255, 0.8)',
	};

	/**
	 * @param {string} name
	 */
	function cssVar(name) {
	  if (CSS_VARS.hasOwnProperty(name)) {
	    return CSS_VARS[name];
	  }

	  throw new Error(
	    'cssVar' + '("' + name + '"): Unexpected class transformation.'
	  );
	}

	cssVar.CSS_VARS = CSS_VARS;

	module.exports = cssVar;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRowBuffer
	 * @typechecks
	 */
	'use strict';

	var IntegerBufferSet = __webpack_require__(52);

	var clamp = __webpack_require__(43);
	var invariant = __webpack_require__(34);
	var MIN_BUFFER_ROWS = 5;
	var MAX_BUFFER_ROWS = 15;

	// FixedDataTableRowBuffer is a helper class that executes row buffering
	// logic for FixedDataTable. It figures out which rows should be rendered
	// and in which positions.

	  function FixedDataTableRowBuffer(
	rowsCount,
	    /*number*/  defaultRowHeight,
	    /*number*/ viewportHeight,
	    /*?function*/ rowHeightGetter)
	   {
	    invariant(
	      defaultRowHeight !== 0,
	      "defaultRowHeight musn't be equal 0 in FixedDataTableRowBuffer"
	    );

	    this.$FixedDataTableRowBuffer_bufferSet = new IntegerBufferSet();
	    this.$FixedDataTableRowBuffer_defaultRowHeight = defaultRowHeight;
	    this.$FixedDataTableRowBuffer_viewportRowsBegin = 0;
	    this.$FixedDataTableRowBuffer_viewportRowsEnd = 0;
	    this.$FixedDataTableRowBuffer_maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;
	    this.$FixedDataTableRowBuffer_bufferRowsCount = clamp(
	      MIN_BUFFER_ROWS,
	      Math.floor(this.$FixedDataTableRowBuffer_maxVisibleRowCount/2),
	      MAX_BUFFER_ROWS
	    );
	    this.$FixedDataTableRowBuffer_rowsCount = rowsCount;
	    this.$FixedDataTableRowBuffer_rowHeightGetter = rowHeightGetter;
	    this.$FixedDataTableRowBuffer_rows = [];
	    this.$FixedDataTableRowBuffer_viewportHeight = viewportHeight;

	    this.getRows = this.getRows.bind(this);
	    this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this);
	  }

	  FixedDataTableRowBuffer.prototype.getRowsWithUpdatedBuffer=function()  {
	    var remainingBufferRows = 2 * this.$FixedDataTableRowBuffer_bufferRowsCount;
	    var bufferRowIndex =
	      Math.max(this.$FixedDataTableRowBuffer_viewportRowsBegin - this.$FixedDataTableRowBuffer_bufferRowsCount, 0);
	    while (bufferRowIndex < this.$FixedDataTableRowBuffer_viewportRowsBegin) {
	      this.$FixedDataTableRowBuffer_addRowToBuffer(
	        bufferRowIndex,
	        this.$FixedDataTableRowBuffer_viewportHeight,
	        this.$FixedDataTableRowBuffer_viewportRowsBegin,
	        this.$FixedDataTableRowBuffer_viewportRowsEnd -1
	      );
	      bufferRowIndex++;
	      remainingBufferRows--;
	    }
	    bufferRowIndex = this.$FixedDataTableRowBuffer_viewportRowsEnd;
	    while (bufferRowIndex < this.$FixedDataTableRowBuffer_rowsCount && remainingBufferRows > 0) {
	      this.$FixedDataTableRowBuffer_addRowToBuffer(
	        bufferRowIndex,
	        this.$FixedDataTableRowBuffer_viewportHeight,
	        this.$FixedDataTableRowBuffer_viewportRowsBegin,
	        this.$FixedDataTableRowBuffer_viewportRowsEnd -1
	      );
	      bufferRowIndex++;
	      remainingBufferRows--;
	    }
	    return this.$FixedDataTableRowBuffer_rows;
	  };

	  FixedDataTableRowBuffer.prototype.getRows=function(
	firstRowIndex,
	    /*number*/ firstRowOffset)
	    {
	    // Update offsets of all rows to move them outside of viewport. Later we
	    // will bring rows that we should show to their right offsets.
	    this.$FixedDataTableRowBuffer_hideAllRows();

	    var top = firstRowOffset;
	    var totalHeight = top;
	    var rowIndex = firstRowIndex;
	    var endIndex =
	      Math.min(firstRowIndex + this.$FixedDataTableRowBuffer_maxVisibleRowCount, this.$FixedDataTableRowBuffer_rowsCount);

	    this.$FixedDataTableRowBuffer_viewportRowsBegin = firstRowIndex;
	    while (rowIndex < endIndex ||
	        (totalHeight < this.$FixedDataTableRowBuffer_viewportHeight && rowIndex < this.$FixedDataTableRowBuffer_rowsCount)) {
	      this.$FixedDataTableRowBuffer_addRowToBuffer(
	        rowIndex,
	        totalHeight,
	        firstRowIndex,
	        endIndex - 1
	      );
	      totalHeight += this.$FixedDataTableRowBuffer_rowHeightGetter(rowIndex);
	      ++rowIndex;
	      // Store index after the last viewport row as end, to be able to
	      // distinguish when there are no rows rendered in viewport
	      this.$FixedDataTableRowBuffer_viewportRowsEnd = rowIndex;
	    }

	    return this.$FixedDataTableRowBuffer_rows;
	  };

	  FixedDataTableRowBuffer.prototype.$FixedDataTableRowBuffer_addRowToBuffer=function(
	rowIndex,
	    /*number*/ offsetTop,
	    /*number*/ firstViewportRowIndex,
	    /*number*/ lastViewportRowIndex)
	   {
	      var rowPosition = this.$FixedDataTableRowBuffer_bufferSet.getValuePosition(rowIndex);
	      var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
	      var allowedRowsCount = viewportRowsCount + this.$FixedDataTableRowBuffer_bufferRowsCount * 2;
	      if (rowPosition === null &&
	          this.$FixedDataTableRowBuffer_bufferSet.getSize() >= allowedRowsCount) {
	        rowPosition =
	          this.$FixedDataTableRowBuffer_bufferSet.replaceFurthestValuePosition(
	            firstViewportRowIndex,
	            lastViewportRowIndex,
	            rowIndex
	          );
	      }
	      if (rowPosition === null) {
	        // We can't reuse any of existing positions for this row. We have to
	        // create new position
	        rowPosition = this.$FixedDataTableRowBuffer_bufferSet.getNewPositionForValue(rowIndex);
	        this.$FixedDataTableRowBuffer_rows[rowPosition] = {
	          rowIndex:rowIndex,
	          offsetTop:offsetTop,
	        };
	      } else {
	        // This row already is in the table with rowPosition position or it
	        // can replace row that is in that position
	        this.$FixedDataTableRowBuffer_rows[rowPosition].rowIndex = rowIndex;
	        this.$FixedDataTableRowBuffer_rows[rowPosition].offsetTop = offsetTop;
	      }
	  };

	  FixedDataTableRowBuffer.prototype.$FixedDataTableRowBuffer_hideAllRows=function() {
	    var i = this.$FixedDataTableRowBuffer_rows.length - 1;
	    while (i > -1) {
	      this.$FixedDataTableRowBuffer_rows[i].offsetTop = this.$FixedDataTableRowBuffer_viewportHeight;
	      i--;
	    }
	  };


	module.exports = FixedDataTableRowBuffer;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule clamp
	 * @typechecks
	 */

	 /**
	  * @param {number} min
	  * @param {number} value
	  * @param {number} max
	  * @return {number}
	  */
	function clamp(min, value, max) {
	  if (value < min) {
	    return min;
	  }
	  if (value > max) {
	    return max;
	  }
	  return value;
	}

	module.exports = clamp;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellGroup.react
	 * @typechecks
	 */

	"use strict";

	var FixedDataTableHelper = __webpack_require__(20);
	var ImmutableObject = __webpack_require__(53);
	var React = __webpack_require__(19);
	var ReactComponentWithPureRenderMixin = __webpack_require__(22);
	var FixedDataTableCell = __webpack_require__(54);

	var cx = __webpack_require__(31);
	var renderToString = FixedDataTableHelper.renderToString;
	var translateDOMPositionXY = __webpack_require__(36);

	var PropTypes = React.PropTypes;

	var EMPTY_OBJECT = new ImmutableObject({});

	var FixedDataTableCellGroupImpl = React.createClass({displayName: "FixedDataTableCellGroupImpl",
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {

	    /**
	     * Array of <FixedDataTableColumn />.
	     */
	    columns: PropTypes.array.isRequired,

	    /**
	     * The row data to render. The data format can be a simple Map object
	     * or an Array of data.
	     */
	    data: PropTypes.oneOfType([
	      PropTypes.object,
	      PropTypes.array
	    ]),

	    onColumnResize: PropTypes.func,

	    rowHeight: PropTypes.number.isRequired,

	    rowIndex: PropTypes.number.isRequired,

	    zIndex: PropTypes.number.isRequired,
	  },

	  render:function() /*object*/ {
	    var props = this.props;
	    var columns = props.columns;
	    var cells = [];
	    var width = 0;

	    for (var i = 0, j = columns.length; i < j; i++) {
	      var columnProps = columns[i].props;
	      width += columnProps.width;
	      var key = 'cell_' + i;
	      cells.push(
	        this._renderCell(
	          props.data,
	          props.rowIndex,
	          props.rowHeight,
	          columnProps,
	          width,
	          key
	        )
	      );
	    }

	    var style = {
	      width: width,
	      height: props.height,
	      zIndex: props.zIndex
	    };

	    return (
	      React.createElement("div", {className: cx('fixedDataTableCellGroup/cellGroup'), style: style}, 
	        cells
	      )
	    );
	  },

	  _renderCell:function(
	    /*object|array*/ rowData,
	    /*number*/ rowIndex,
	    /*number*/ height,
	    /*object*/ columnProps,
	    /*?number*/ widthOffset,
	    /*string*/ key
	  ) /*object*/ {
	    var cellRenderer = columnProps.cellRenderer || renderToString;
	    var columnData = columnProps.columnData || EMPTY_OBJECT;
	    var cellDataKey = columnProps.dataKey;
	    var isFooterCell = columnProps.isFooterCell;
	    var isHeaderCell = columnProps.isHeaderCell;
	    var cellData;

	    if (isHeaderCell || isFooterCell) {
	      cellData = rowData[cellDataKey];
	    } else {
	      var cellDataGetter = columnProps.cellDataGetter;
	      cellData = cellDataGetter ?
	        cellDataGetter(cellDataKey, rowData) :
	        rowData[cellDataKey];
	    }

	    var cellIsResizable = columnProps.isResizable &&
	      this.props.onColumnResize;
	    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

	    return (
	      React.createElement(FixedDataTableCell, {
	        align: columnProps.align, 
	        cellData: cellData, 
	        cellDataKey: cellDataKey, 
	        cellRenderer: cellRenderer, 
	        className: columnProps.cellClassName, 
	        columnData: columnData, 
	        height: height, 
	        isFooterCell: isFooterCell, 
	        isHeaderCell: isHeaderCell, 
	        key: key, 
	        maxWidth: columnProps.maxWidth, 
	        minWidth: columnProps.minWidth, 
	        onColumnResize: onColumnResize, 
	        rowData: rowData, 
	        rowIndex: rowIndex, 
	        width: columnProps.width, 
	        widthOffset: widthOffset}
	      )
	    );
	  },
	});

	var FixedDataTableCellGroup = React.createClass({displayName: "FixedDataTableCellGroup",
	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    left: PropTypes.number,

	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: PropTypes.number.isRequired,
	  },

	  render:function() /*object*/ {
	    var $__0=   this.props,left=$__0.left,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{left:1});

	    var style = {
	      height: props.height,
	    };

	    if (left) {
	      translateDOMPositionXY(style, left, 0);
	    }

	    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

	    return (
	      React.createElement("div", {
	        style: style, 
	        className: cx('fixedDataTableCellGroup/cellGroupWrapper')}, 
	        React.createElement(FixedDataTableCellGroupImpl, React.__spread({}, 
	          props, 
	          {onColumnResize: onColumnResize})
	        )
	      )
	    );
	  },

	  _onColumnResize:function(
	    /*number*/ widthOffset,
	    /*number*/ width,
	    /*?number*/ minWidth,
	    /*?number*/ maxWidth,
	    /*string|number*/ cellDataKey,
	    /*object*/ event
	  ) {
	    this.props.onColumnResize && this.props.onColumnResize(
	      widthOffset,
	      this.props.left,
	      width,
	      minWidth,
	      maxWidth,
	      cellDataKey,
	      event
	    );
	  },
	});


	module.exports = FixedDataTableCellGroup;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PrefixIntervalTree
	 * @typechecks
	 */

	"use strict";

	/**
	 * An interval tree that allows to set a number at index and given the value
	 * find the largest index for which prefix sum is greater than or equal to value
	 * (lower bound) or greater than value (upper bound)
	 * Complexity:
	 *   construct: O(n)
	 *   query: O(log(n))
	 *   memory: O(log(n)),
	 * where n is leafCount from the constructor
	 */

	  function PrefixIntervalTree(leafCount, /*?number*/ initialLeafValue) {
	    var internalLeafCount = this.getInternalLeafCount(leafCount);
	    this.$PrefixIntervalTree_leafCount = leafCount;
	    this.$PrefixIntervalTree_internalLeafCount = internalLeafCount;
	    var nodeCount = 2 * internalLeafCount;
	    var Int32Array = global.Int32Array || Array;
	    this.$PrefixIntervalTree_value = new Int32Array(nodeCount);
	    this.$PrefixIntervalTree_initTables(initialLeafValue || 0);

	    this.get = this.get.bind(this);
	    this.set = this.set.bind(this);
	    this.lowerBound = this.lowerBound.bind(this);
	    this.upperBound = this.upperBound.bind(this);
	  }

	  PrefixIntervalTree.prototype.getInternalLeafCount=function(leafCount)  {
	    var internalLeafCount = 1;
	    while (internalLeafCount < leafCount) {
	      internalLeafCount *= 2;
	    }
	    return internalLeafCount;
	  };

	  PrefixIntervalTree.prototype.$PrefixIntervalTree_initTables=function(initialLeafValue) {
	    var firstLeaf = this.$PrefixIntervalTree_internalLeafCount;
	    var lastLeaf = this.$PrefixIntervalTree_internalLeafCount + this.$PrefixIntervalTree_leafCount - 1;
	    var i;
	    for (i = firstLeaf; i <= lastLeaf; ++i) {
	      this.$PrefixIntervalTree_value[i] = initialLeafValue;
	    }
	    var lastInternalNode = this.$PrefixIntervalTree_internalLeafCount - 1;
	    for (i = lastInternalNode; i > 0; --i) {
	      this.$PrefixIntervalTree_value[i] =  this.$PrefixIntervalTree_value[2 * i] + this.$PrefixIntervalTree_value[2 * i + 1];
	    }
	  };

	  PrefixIntervalTree.prototype.set=function(position, /*number*/ value) {
	    var nodeIndex = position + this.$PrefixIntervalTree_internalLeafCount;
	    this.$PrefixIntervalTree_value[nodeIndex] = value;
	    nodeIndex = Math.floor(nodeIndex / 2);
	    while (nodeIndex !== 0) {
	      this.$PrefixIntervalTree_value[nodeIndex] =
	        this.$PrefixIntervalTree_value[2 * nodeIndex] + this.$PrefixIntervalTree_value[2 * nodeIndex + 1];
	      nodeIndex = Math.floor(nodeIndex / 2);
	    }
	  };

	  /**
	   * Returns an object {index, value} for given position (including value at
	   * specified position), or the same for last position if provided position
	   * is out of range
	   */
	  PrefixIntervalTree.prototype.get=function(position)  {
	    position = Math.min(position, this.$PrefixIntervalTree_leafCount);
	    var nodeIndex = position + this.$PrefixIntervalTree_internalLeafCount;
	    var result = this.$PrefixIntervalTree_value[nodeIndex];
	    while (nodeIndex > 1) {
	      if (nodeIndex % 2 === 1) {
	        result = this.$PrefixIntervalTree_value[nodeIndex - 1] + result;
	      }
	      nodeIndex = Math.floor(nodeIndex / 2);
	    }
	    return {index: position, value: result};
	  };

	  /**
	   * Returns an object {index, value} where index is index of leaf that was
	   * found by upper bound algorithm. Upper bound finds first element for which
	   * value is greater than argument
	   */
	  PrefixIntervalTree.prototype.upperBound=function(value)  {
	    var result = this.$PrefixIntervalTree_upperBoundImpl(1, 0, this.$PrefixIntervalTree_internalLeafCount - 1, value);
	    if (result.index > this.$PrefixIntervalTree_leafCount - 1) {
	      result.index = this.$PrefixIntervalTree_leafCount - 1;
	    }
	    return result;
	  };

	  /**
	   * Returns result in the same format as upperBound, but finds first element
	   * for which value is greater than or equal to argument
	   */
	  PrefixIntervalTree.prototype.lowerBound=function(value)  {
	    var result = this.upperBound(value);
	    if (result.value > value && result.index > 0) {
	      var previousValue =
	        result.value - this.$PrefixIntervalTree_value[this.$PrefixIntervalTree_internalLeafCount + result.index];
	      if (previousValue === value) {
	        result.value = previousValue;
	        result.index--;
	      }
	    }
	    return result;
	  };

	  PrefixIntervalTree.prototype.$PrefixIntervalTree_upperBoundImpl=function(
	nodeIndex,
	    /*number*/ nodeIntervalBegin,
	    /*number*/ nodeIntervalEnd,
	    /*number*/ value)
	    {
	    if (nodeIntervalBegin === nodeIntervalEnd) {
	      return {
	        index: nodeIndex - this.$PrefixIntervalTree_internalLeafCount,
	        value: this.$PrefixIntervalTree_value[nodeIndex],
	      };
	    }

	    var nodeIntervalMidpoint =
	      Math.floor((nodeIntervalBegin + nodeIntervalEnd + 1) / 2);
	    if (value < this.$PrefixIntervalTree_value[nodeIndex * 2]) {
	      return this.$PrefixIntervalTree_upperBoundImpl(
	        2 * nodeIndex,
	        nodeIntervalBegin,
	        nodeIntervalMidpoint - 1,
	        value
	      );
	    } else {
	      var result = this.$PrefixIntervalTree_upperBoundImpl(
	        2 * nodeIndex + 1,
	        nodeIntervalMidpoint,
	        nodeIntervalEnd,
	        value - this.$PrefixIntervalTree_value[2 * nodeIndex]
	      );
	      result.value += this.$PrefixIntervalTree_value[2 * nodeIndex];
	      return result;
	    }
	  };


	module.exports = PrefixIntervalTree;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule normalizeWheel
	 * @typechecks
	 */

	"use strict";

	var UserAgent_DEPRECATED = __webpack_require__(55);

	var isEventSupported = __webpack_require__(56);


	// Reasonable defaults
	var PIXEL_STEP  = 10;
	var LINE_HEIGHT = 40;
	var PAGE_HEIGHT = 800;

	/**
	 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
	 * complicated, thus this doc is long and (hopefully) detailed enough to answer
	 * your questions.
	 *
	 * If you need to react to the mouse wheel in a predictable way, this code is
	 * like your bestest friend. * hugs *
	 *
	 * As of today, there are 4 DOM event types you can listen to:
	 *
	 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
	 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
	 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
	 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
	 *
	 * So what to do?  The is the best:
	 *
	 *   normalizeWheel.getEventType();
	 *
	 * In your event callback, use this code to get sane interpretation of the
	 * deltas.  This code will return an object with properties:
	 *
	 *   spinX   -- normalized spin speed (use for zoom) - x plane
	 *   spinY   -- " - y plane
	 *   pixelX  -- normalized distance (to pixels) - x plane
	 *   pixelY  -- " - y plane
	 *
	 * Wheel values are provided by the browser assuming you are using the wheel to
	 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
	 * significantly on different platforms and browsers, forgetting that you can
	 * scroll at different speeds.  Some devices (like trackpads) emit more events
	 * at smaller increments with fine granularity, and some emit massive jumps with
	 * linear speed or acceleration.
	 *
	 * This code does its best to normalize the deltas for you:
	 *
	 *   - spin is trying to normalize how far the wheel was spun (or trackpad
	 *     dragged).  This is super useful for zoom support where you want to
	 *     throw away the chunky scroll steps on the PC and make those equal to
	 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
	 *     resolve a single slow step on a wheel to 1.
	 *
	 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
	 *     get the crazy differences between browsers, but at least it'll be in
	 *     pixels!
	 *
	 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
	 *     should translate to positive value zooming IN, negative zooming OUT.
	 *     This matches the newer 'wheel' event.
	 *
	 * Why are there spinX, spinY (or pixels)?
	 *
	 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
	 *     with a mouse.  It results in side-scrolling in the browser by default.
	 *
	 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
	 *
	 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
	 *     probably is by browsers in conjunction with fancy 3D controllers .. but
	 *     you know.
	 *
	 * Implementation info:
	 *
	 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
	 * average mouse:
	 *
	 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
	 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
	 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
	 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
	 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
	 *
	 * On the trackpad:
	 *
	 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
	 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
	 *
	 * On other/older browsers.. it's more complicated as there can be multiple and
	 * also missing delta values.
	 *
	 * The 'wheel' event is more standard:
	 *
	 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
	 *
	 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
	 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
	 * backward compatibility with older events.  Those other values help us
	 * better normalize spin speed.  Example of what the browsers provide:
	 *
	 *                          | event.wheelDelta | event.detail
	 *        ------------------+------------------+--------------
	 *          Safari v5/OS X  |       -120       |       0
	 *          Safari v5/Win7  |       -120       |       0
	 *         Chrome v17/OS X  |       -120       |       0
	 *         Chrome v17/Win7  |       -120       |       0
	 *                IE9/Win7  |       -120       |   undefined
	 *         Firefox v4/OS X  |     undefined    |       1
	 *         Firefox v4/Win7  |     undefined    |       3
	 *
	 */
	function normalizeWheel(/*object*/ event) /*object*/ {
	  var sX = 0, sY = 0,       // spinX, spinY
	      pX = 0, pY = 0;       // pixelX, pixelY

	  // Legacy
	  if ('detail'      in event) { sY = event.detail; }
	  if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
	  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
	  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

	  // side scrolling on FF with DOMMouseScroll
	  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
	    sX = sY;
	    sY = 0;
	  }

	  pX = sX * PIXEL_STEP;
	  pY = sY * PIXEL_STEP;

	  if ('deltaY' in event) { pY = event.deltaY; }
	  if ('deltaX' in event) { pX = event.deltaX; }

	  if ((pX || pY) && event.deltaMode) {
	    if (event.deltaMode == 1) {          // delta in LINE units
	      pX *= LINE_HEIGHT;
	      pY *= LINE_HEIGHT;
	    } else {                             // delta in PAGE units
	      pX *= PAGE_HEIGHT;
	      pY *= PAGE_HEIGHT;
	    }
	  }

	  // Fall-back if spin cannot be determined
	  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
	  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

	  return { spinX  : sX,
	           spinY  : sY,
	           pixelX : pX,
	           pixelY : pY };
	}


	/**
	 * The best combination if you prefer spinX + spinY normalization.  It favors
	 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
	 * 'wheel' event, making spin speed determination impossible.
	 */
	normalizeWheel.getEventType = function() /*string*/ {
	  return (UserAgent_DEPRECATED.firefox())
	           ? 'DOMMouseScroll'
	           : (isEventSupported('wheel'))
	               ? 'wheel'
	               : 'mousewheel';
	};

	module.exports = normalizeWheel;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule requestAnimationFramePolyfill
	 */

	var emptyFunction = __webpack_require__(33);
	var nativeRequestAnimationFrame = __webpack_require__(57);

	var lastTime = 0;

	/**
	 * Here is the native and polyfill version of requestAnimationFrame.
	 * Please don't use it directly and use requestAnimationFrame module instead.
	 */
	var requestAnimationFrame =
	  nativeRequestAnimationFrame ||
	  function(callback) {
	    var currTime = Date.now();
	    var timeDelay = Math.max(0, 16 - (currTime - lastTime));
	    lastTime = currTime + timeDelay;
	    return global.setTimeout(function() {
	      callback(Date.now());
	    }, timeDelay);
	  };

	// Works around a rare bug in Safari 6 where the first request is never invoked.
	requestAnimationFrame(emptyFunction);

	module.exports = requestAnimationFrame;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BrowserSupportCore
	 */


	var getVendorPrefixedName = __webpack_require__(49);

	var BrowserSupportCore = {
	  /**
	   * @return {bool} True if browser supports css animations.
	   */
	  hasCSSAnimations: function() {
	    return !!getVendorPrefixedName('animationName');
	  },

	  /**
	   * @return {bool} True if browser supports css transforms.
	   */
	  hasCSSTransforms: function() {
	    return !!getVendorPrefixedName('transform');
	  },

	  /**
	   * @return {bool} True if browser supports css 3d transforms.
	   */
	  hasCSS3DTransforms: function() {
	    return !!getVendorPrefixedName('perspective');
	  },

	  /**
	   * @return {bool} True if browser supports css transitions.
	   */
	  hasCSSTransitions: function() {
	    return !!getVendorPrefixedName('transition');
	  },
	};

	module.exports = BrowserSupportCore;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getVendorPrefixedName
	 * @typechecks
	 */

	var ExecutionEnvironment = __webpack_require__(58);

	var camelize = __webpack_require__(59);
	var invariant = __webpack_require__(34);

	var memoized = {};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
	var testStyle =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div').style : {};

	function getWithPrefix(name) {
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixedName = prefixes[i] + name;
	    if (prefixedName in testStyle) {
	      return prefixedName;
	    }
	  }
	  return null;
	}

	/**
	 * @param {string} property Name of a css property to check for.
	 * @return {?string} property name supported in the browser, or null if not
	 * supported.
	 */
	function getVendorPrefixedName(property) {
	  var name = camelize(property);
	  if (memoized[name] === undefined) {
	    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	    if (prefixRegex.test(capitalizedName)) {
	      invariant(
	        false,
	        'getVendorPrefixedName must only be called with unprefixed' +
	        'CSS property names. It was called with %s', property
	      );
	    }
	    memoized[name] =
	      (name in testStyle) ? name : getWithPrefix(capitalizedName);
	  }
	  return memoized[name];
	}

	module.exports = getVendorPrefixedName;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventListener
	 * @typechecks
	 */

	var emptyFunction = __webpack_require__(33);

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function(target, eventType, callback) {
	    if (!target.addEventListener) {
	      if (false) {
	        console.error(
	          'Attempted to listen to events during the capture phase on a ' +
	          'browser that does not support the capture phase. Your application ' +
	          'will not receive some events.'
	        );
	      }
	      return {
	        remove: emptyFunction
	      };
	    } else {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    }
	  },

	  registerDefault: function() {}
	};

	module.exports = EventListener;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cancelAnimationFramePolyfill
	 */

	/**
	 * Here is the native and polyfill version of cancelAnimationFrame.
	 * Please don't use it directly and use cancelAnimationFrame module instead.
	 */
	var cancelAnimationFrame =
	  global.cancelAnimationFrame       ||
	  global.webkitCancelAnimationFrame ||
	  global.mozCancelAnimationFrame    ||
	  global.oCancelAnimationFrame      ||
	  global.msCancelAnimationFrame     ||
	  global.clearTimeout;

	module.exports = cancelAnimationFrame;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule IntegerBufferSet
	 * @typechecks
	 */

	"use strict";

	var Heap = __webpack_require__(62);

	var invariant = __webpack_require__(34);

	// Data structure that allows to store values and assign positions to them
	// in a way to minimize changing positions of stored values when new ones are
	// added or when some values are replaced. Stored elements are alwasy assigned
	// a consecutive set of positoins startin from 0 up to count of elements less 1
	// Following actions can be executed
	// * get position assigned to given value (null if value is not stored)
	// * create new entry for new value and get assigned position back
	// * replace value that is furthest from specified value range with new value
	//   and get it's position back
	// All operations take amortized log(n) time where n is number of elements in
	// the set.

	  function IntegerBufferSet() {
	    this.$IntegerBufferSet_valueToPositionMap = {};
	    this.$IntegerBufferSet_size = 0;
	    this.$IntegerBufferSet_smallValues = new Heap(
	      [], // Initial data in the heap
	      this.$IntegerBufferSet_smallerComparator
	    );
	    this.$IntegerBufferSet_largeValues = new Heap(
	      [], // Initial data in the heap
	      this.$IntegerBufferSet_greaterComparator
	    );

	    this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
	    this.getValuePosition = this.getValuePosition.bind(this);
	    this.getSize = this.getSize.bind(this);
	    this.replaceFurthestValuePosition =
	      this.replaceFurthestValuePosition.bind(this);
	  }

	  IntegerBufferSet.prototype.getSize=function()  {
	    return this.$IntegerBufferSet_size;
	  };

	  IntegerBufferSet.prototype.getValuePosition=function(value)  {
	    if (this.$IntegerBufferSet_valueToPositionMap[value] === undefined) {
	      return null;
	    }
	    return this.$IntegerBufferSet_valueToPositionMap[value];
	  };

	  IntegerBufferSet.prototype.getNewPositionForValue=function(value)  {
	    invariant(
	      this.$IntegerBufferSet_valueToPositionMap[value] === undefined,
	      "Shouldn't try to find new position for value already stored in BufferSet"
	    );
	    var newPosition = this.$IntegerBufferSet_size;
	    this.$IntegerBufferSet_size++;
	    this.$IntegerBufferSet_pushToHeaps(newPosition, value);
	    this.$IntegerBufferSet_valueToPositionMap[value] = newPosition;
	    return newPosition;
	  };

	  IntegerBufferSet.prototype.replaceFurthestValuePosition=function(
	lowValue,
	    /*number*/ highValue,
	    /*number*/ newValue)
	    {
	    invariant(
	      this.$IntegerBufferSet_valueToPositionMap[newValue] === undefined,
	      "Shouldn't try to replace values with value already stored value in " +
	      "BufferSet"
	    );

	    this.$IntegerBufferSet_cleanHeaps();
	    if (this.$IntegerBufferSet_smallValues.empty() || this.$IntegerBufferSet_largeValues.empty()) {
	      // Threre are currently no values stored. We will have to create new
	      // position for this value.
	      return null;
	    }

	    var minValue = this.$IntegerBufferSet_smallValues.peek().value;
	    var maxValue = this.$IntegerBufferSet_largeValues.peek().value;
	    if (minValue >= lowValue && maxValue <= highValue) {
	      // All values currently stored are necessary, we can't reuse any of them.
	      return null;
	    }

	    var valueToReplace;
	    if (lowValue - minValue > maxValue - highValue) {
	      // minValue is further from provided range. We will reuse it's position.
	      valueToReplace = minValue;
	      this.$IntegerBufferSet_smallValues.pop();
	    } else {
	      valueToReplace = maxValue;
	      this.$IntegerBufferSet_largeValues.pop();
	    }
	    var position = this.$IntegerBufferSet_valueToPositionMap[valueToReplace];
	    delete this.$IntegerBufferSet_valueToPositionMap[valueToReplace];
	    this.$IntegerBufferSet_valueToPositionMap[newValue] = position;
	    this.$IntegerBufferSet_pushToHeaps(position, newValue);

	    return position;
	  };

	  IntegerBufferSet.prototype.$IntegerBufferSet_pushToHeaps=function(position, /*number*/ value) {
	    var element = {
	      position:position,
	      value:value,
	    };
	    // We can reuse the same object in both heaps, because we don't mutate them
	    this.$IntegerBufferSet_smallValues.push(element);
	    this.$IntegerBufferSet_largeValues.push(element);
	  };

	  IntegerBufferSet.prototype.$IntegerBufferSet_cleanHeaps=function() {
	    // We not usually only remove object from one heap while moving value.
	    // Here we make sure that there is no stale data on top of heaps.
	    this.$IntegerBufferSet_cleanHeap(this.$IntegerBufferSet_smallValues);
	    this.$IntegerBufferSet_cleanHeap(this.$IntegerBufferSet_largeValues);
	    var minHeapSize =
	      Math.min(this.$IntegerBufferSet_smallValues.size(), this.$IntegerBufferSet_largeValues.size());
	    var maxHeapSize =
	      Math.max(this.$IntegerBufferSet_smallValues.size(), this.$IntegerBufferSet_largeValues.size());
	    if (maxHeapSize > 10 * minHeapSize) {
	      // There are many old values in one of heaps. We nned to get rid of them
	      // to not use too avoid memory leaks
	      this.$IntegerBufferSet_recreateHeaps();
	    }
	  };

	  IntegerBufferSet.prototype.$IntegerBufferSet_recreateHeaps=function() {
	    var sourceHeap = this.$IntegerBufferSet_smallValues.size() < this.$IntegerBufferSet_largeValues.size() ?
	      this.$IntegerBufferSet_smallValues :
	      this.$IntegerBufferSet_largeValues;
	    var newSmallValues = new Heap(
	      [], // Initial data in the heap
	      this.$IntegerBufferSet_smallerComparator
	    );
	    var newLargeValues = new Heap(
	      [], // Initial datat in the heap
	      this.$IntegerBufferSet_greaterComparator
	    );
	    while (!sourceHeap.empty()) {
	      var element = sourceHeap.pop();
	      // Push all stil valid elements to new heaps
	      if (this.$IntegerBufferSet_valueToPositionMap[element.value] !== undefined) {
	        newSmallValues.push(element);
	        newLargeValues.push(element);
	      }
	    }
	    this.$IntegerBufferSet_smallValues = newSmallValues;
	    this.$IntegerBufferSet_largeValues = newLargeValues;
	  };

	  IntegerBufferSet.prototype.$IntegerBufferSet_cleanHeap=function(heap) {
	    while (!heap.empty() &&
	        this.$IntegerBufferSet_valueToPositionMap[heap.peek().value] === undefined) {
	      heap.pop();
	    }
	  };

	  IntegerBufferSet.prototype.$IntegerBufferSet_smallerComparator=function(lhs, /*object*/ rhs)  {
	    return lhs.value < rhs.value;
	  };

	  IntegerBufferSet.prototype.$IntegerBufferSet_greaterComparator=function(lhs, /*object*/ rhs)  {
	    return lhs.value > rhs.value;
	  };



	module.exports = IntegerBufferSet;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ImmutableObject
	 * @typechecks
	 */

	"use strict";

	var ImmutableValue = __webpack_require__(63);

	var invariant = __webpack_require__(34);
	var keyOf = __webpack_require__(64);
	var mergeHelpers = __webpack_require__(65);

	var checkMergeObjectArgs = mergeHelpers.checkMergeObjectArgs;
	var isTerminal = mergeHelpers.isTerminal;

	var SECRET_KEY = keyOf({_DONT_EVER_TYPE_THIS_SECRET_KEY: null});

	/**
	 * Static methods creating and operating on instances of `ImmutableValue`.
	 */
	function assertImmutable(immutable) {
	  invariant(
	    immutable instanceof ImmutableValue,
	    'ImmutableObject: Attempted to set fields on an object that is not an ' +
	    'instance of ImmutableValue.'
	  );
	}

	/**
	 * Static methods for reasoning about instances of `ImmutableObject`. Execute
	 * the freeze commands in `__DEV__` mode to alert the programmer that something
	 * is attempting to mutate. Since freezing is very expensive, we avoid doing it
	 * at all in production.
	 */
	for(var ImmutableValue____Key in ImmutableValue){if(ImmutableValue.hasOwnProperty(ImmutableValue____Key)){ImmutableObject[ImmutableValue____Key]=ImmutableValue[ImmutableValue____Key];}}var ____SuperProtoOfImmutableValue=ImmutableValue===null?null:ImmutableValue.prototype;ImmutableObject.prototype=Object.create(____SuperProtoOfImmutableValue);ImmutableObject.prototype.constructor=ImmutableObject;ImmutableObject.__superConstructor__=ImmutableValue;
	  /**
	   * @arguments {array<object>} The arguments is an array of objects that, when
	   * merged together, will form the immutable objects.
	   */
	  function ImmutableObject() {
	    ImmutableValue.call(this,ImmutableValue[SECRET_KEY]);
	    ImmutableValue.mergeAllPropertiesInto(this, arguments);
	    if (false) {
	      ImmutableValue.deepFreezeRootNode(this);
	    }
	  }

	  /**
	   * DEPRECATED - prefer to instantiate with new ImmutableObject().
	   *
	   * @arguments {array<object>} The arguments is an array of objects that, when
	   * merged together, will form the immutable objects.
	   */
	  ImmutableObject.create=function() {
	    var obj = Object.create(ImmutableObject.prototype);
	    ImmutableObject.apply(obj, arguments);
	    return obj;
	  };

	  /**
	   * Returns a new `ImmutableValue` that is identical to the supplied
	   * `ImmutableValue` but with the specified changes, `put`. Any keys that are
	   * in the intersection of `immutable` and `put` retain the ordering of
	   * `immutable`. New keys are placed after keys that exist in `immutable`.
	   *
	   * @param {ImmutableValue} immutable Starting object.
	   * @param {?object} put Fields to merge into the object.
	   * @return {ImmutableValue} The result of merging in `put` fields.
	   */
	  ImmutableObject.set=function(immutable, put) {
	    assertImmutable(immutable);
	    invariant(
	      typeof put === 'object' && put !== undefined && !Array.isArray(put),
	      'Invalid ImmutableMap.set argument `put`'
	    );
	    return new ImmutableObject(immutable, put);
	  };

	  /**
	   * Sugar for `ImmutableObject.set(ImmutableObject, {fieldName: putField})`.
	   * Look out for key crushing: Use `keyOf()` to guard against it.
	   *
	   * @param {ImmutableValue} immutableObject Object on which to set properties.
	   * @param {string} fieldName Name of the field to set.
	   * @param {*} putField Value of the field to set.
	   * @return {ImmutableValue} new ImmutableValue as described in `set`.
	   */
	  ImmutableObject.setProperty=function(immutableObject, fieldName, putField) {
	    var put = {};
	    put[fieldName] = putField;
	    return ImmutableObject.set(immutableObject, put);
	  };

	  /**
	   * Returns a new immutable object with the given field name removed.
	   * Look out for key crushing: Use `keyOf()` to guard against it.
	   *
	   * @param {ImmutableObject} immutableObject from which to delete the key.
	   * @param {string} droppedField Name of the field to delete.
	   * @return {ImmutableObject} new ImmutableObject without the key
	   */
	  ImmutableObject.deleteProperty=function(immutableObject, droppedField) {
	    var copy = {};
	    for (var key in immutableObject) {
	      if (key !== droppedField && immutableObject.hasOwnProperty(key)) {
	        copy[key] = immutableObject[key];
	      }
	    }
	    return new ImmutableObject(copy);
	  };

	  /**
	   * Returns a new `ImmutableValue` that is identical to the supplied object but
	   * with the supplied changes recursively applied.
	   *
	   * Experimental. Likely does not handle `Arrays` correctly.
	   *
	   * @param {ImmutableValue} immutable Object on which to set fields.
	   * @param {object} put Fields to merge into the object.
	   * @return {ImmutableValue} The result of merging in `put` fields.
	   */
	  ImmutableObject.setDeep=function(immutable, put) {
	    assertImmutable(immutable);
	    return _setDeep(immutable, put);
	  };

	  /**
	   * Retrieves an ImmutableObject's values as an array.
	   *
	   * @param {ImmutableValue} immutable
	   * @return {array}
	   */
	  ImmutableObject.values=function(immutable) {
	    return Object.keys(immutable).map(function(key)  {return immutable[key];});
	  };


	function _setDeep(obj, put) {
	  checkMergeObjectArgs(obj, put);
	  var totalNewFields = {};

	  // To maintain the order of the keys, copy the base object's entries first.
	  var keys = Object.keys(obj);
	  for (var ii = 0; ii < keys.length; ii++) {
	    var key = keys[ii];
	    if (!put.hasOwnProperty(key)) {
	      totalNewFields[key] = obj[key];
	    } else if (isTerminal(obj[key]) || isTerminal(put[key])) {
	      totalNewFields[key] = put[key];
	    } else {
	      totalNewFields[key] = _setDeep(obj[key], put[key]);
	    }
	  }

	  // Apply any new keys that the base obj didn't have.
	  var newKeys = Object.keys(put);
	  for (ii = 0; ii < newKeys.length; ii++) {
	    var newKey = newKeys[ii];
	    if (obj.hasOwnProperty(newKey)) {
	      continue;
	    }
	    totalNewFields[newKey] = put[newKey];
	  }

	  return (
	    obj instanceof ImmutableValue ? new ImmutableObject(totalNewFields) :
	    put instanceof ImmutableValue ? new ImmutableObject(totalNewFields) :
	    totalNewFields
	  );
	}

	module.exports = ImmutableObject;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCell.react
	 * @typechecks
	 */

	var ImmutableObject = __webpack_require__(53);
	var React = __webpack_require__(19);

	var cloneWithProps = __webpack_require__(30);
	var cx = __webpack_require__(31);
	var joinClasses = __webpack_require__(42);

	var PropTypes = React.PropTypes;

	var DEFAULT_PROPS = new ImmutableObject({
	  align: 'left',
	  highlighted: false,
	  isFooterCell: false,
	  isHeaderCell: false,
	});

	var FixedDataTableCell = React.createClass({displayName: "FixedDataTableCell",

	  propTypes: {
	    align: PropTypes.oneOf(['left', 'center', 'right']),
	    className: PropTypes.string,
	    highlighted: PropTypes.bool,
	    isFooterCell: PropTypes.bool,
	    isHeaderCell: PropTypes.bool,
	    width: PropTypes.number.isRequired,
	    minWidth: PropTypes.number,
	    maxWidth: PropTypes.number,
	    height: PropTypes.number.isRequired,

	    /**
	     * The cell data that will be passed to `cellRenderer` to render.
	     */
	    cellData: PropTypes.any,

	    /**
	     * The key to retrieve the cell data from the `rowData`.
	     */
	    cellDataKey: PropTypes.oneOfType([
	      PropTypes.string.isRequired,
	      PropTypes.number.isRequired,
	    ]),

	    /**
	     * The function to render the `cellData`.
	     */
	    cellRenderer: PropTypes.func.isRequired,

	    /**
	     * The column data that will be passed to `cellRenderer` to render.
	     */
	    columnData: PropTypes.any,

	    /**
	     * The row data that will be passed to `cellRenderer` to render.
	     */
	    rowData: PropTypes.oneOfType([
	      PropTypes.object.isRequired,
	      PropTypes.array.isRequired,
	    ]),

	    /**
	     * The row index that will be passed to `cellRenderer` to render.
	     */
	    rowIndex: PropTypes.number.isRequired,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number leftOffset
	     * @param number width
	     * @param number minWidth
	     * @param number maxWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: PropTypes.func,

	    /**
	     * Width of the all the cells preceding this cell that
	     * are in its column group.
	     */
	    widthOffset: PropTypes.number,

	    /**
	     * The left offset in pixels of the cell.
	     */
	    left: PropTypes.number,
	  },

	  shouldComponentUpdate:function(/*object*/ nextProps) /*boolean*/ {
	    var props = this.props;
	    var key;
	    for (key in props) {
	      if (props[key] !== nextProps[key] &&
	          key !== 'left') {
	        return true;
	      }
	    }
	    for (key in nextProps) {
	      if (props[key] !== nextProps[key] &&
	          key !== 'left') {
	        return true;
	      }
	    }

	    return false;
	  },

	  getDefaultProps:function() /*object*/ {
	    return DEFAULT_PROPS;
	  },

	  render:function() /*object*/ {
	    var props = this.props;

	    var style = {
	      width: props.width,
	      height: props.height
	    };

	    var className = joinClasses(
	      cx({
	        'public/fixedDataTableCell/main': true,
	        'public/fixedDataTableCell/highlighted': props.highlighted,
	        'public/fixedDataTableCell/lastChild': props.lastChild,
	        'public/fixedDataTableCell/alignRight': props.align === 'right',
	        'public/fixedDataTableCell/alignCenter': props.align === 'center'
	      }),
	      props.className
	    );

	    var content;
	    if (props.isHeaderCell || props.isFooterCell) {
	      content = props.cellRenderer(
	        props.cellData,
	        props.cellDataKey,
	        props.columnData,
	        props.rowData,
	        props.width
	      );
	    } else {
	      content = props.cellRenderer(
	        props.cellData,
	        props.cellDataKey,
	        props.rowData,
	        props.rowIndex,
	        props.columnData,
	        props.width
	      );
	    }

	    var contentClass = cx('public/fixedDataTableCell/cellContent');
	    if (React.isValidElement(content)) {
	      content = cloneWithProps(content, {className: contentClass});
	    } else {
	      content = React.createElement("div", {className: contentClass}, content);
	    }

	    var columnResizerComponent;
	    if (props.onColumnResize) {
	      var columnResizerStyle = {
	        height: props.height
	      };
	      columnResizerComponent = (
	        React.createElement("div", {
	          className: cx('fixedDataTableCell/columnResizerContainer'), 
	          style: columnResizerStyle, 
	          onMouseDown: this._onColumnResizerMouseDown}, 
	          React.createElement("div", {
	            className: cx('fixedDataTableCell/columnResizerKnob'), 
	            style: columnResizerStyle}
	          )
	        )
	      );
	    }
	    return (
	      React.createElement("div", {className: className, style: style}, 
	        columnResizerComponent, 
	        React.createElement("div", {className: cx('public/fixedDataTableCell/wrap1'), style: style}, 
	          React.createElement("div", {className: cx('public/fixedDataTableCell/wrap2')}, 
	            React.createElement("div", {className: cx('public/fixedDataTableCell/wrap3')}, 
	              content
	            )
	          )
	        )
	      )
	    );
	  },

	  _onColumnResizerMouseDown:function(/*object*/ event) {
	    this.props.onColumnResize(
	      this.props.widthOffset,
	      this.props.width,
	      this.props.minWidth,
	      this.props.maxWidth,
	      this.props.cellDataKey,
	      event
	    );
	  },
	});

	module.exports = FixedDataTableCell;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule UserAgent_DEPRECATED
	 */

	/**
	 *  Provides entirely client-side User Agent and OS detection. You should prefer
	 *  the non-deprecated UserAgent module when possible, which exposes our
	 *  authoritative server-side PHP-based detection to the client.
	 *
	 *  Usage is straightforward:
	 *
	 *    if (UserAgent_DEPRECATED.ie()) {
	 *      //  IE
	 *    }
	 *
	 *  You can also do version checks:
	 *
	 *    if (UserAgent_DEPRECATED.ie() >= 7) {
	 *      //  IE7 or better
	 *    }
	 *
	 *  The browser functions will return NaN if the browser does not match, so
	 *  you can also do version compares the other way:
	 *
	 *    if (UserAgent_DEPRECATED.ie() < 7) {
	 *      //  IE6 or worse
	 *    }
	 *
	 *  Note that the version is a float and may include a minor version number,
	 *  so you should always use range operators to perform comparisons, not
	 *  strict equality.
	 *
	 *  **Note:** You should **strongly** prefer capability detection to browser
	 *  version detection where it's reasonable:
	 *
	 *    http://www.quirksmode.org/js/support.html
	 *
	 *  Further, we have a large number of mature wrapper functions and classes
	 *  which abstract away many browser irregularities. Check the documentation,
	 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
	 *  another copy of "event || window.event".
	 *
	 */

	var _populated = false;

	// Browsers
	var _ie, _firefox, _opera, _webkit, _chrome;

	// Actual IE browser for compatibility mode
	var _ie_real_version;

	// Platforms
	var _osx, _windows, _linux, _android;

	// Architectures
	var _win64;

	// Devices
	var _iphone, _ipad, _native;

	var _mobile;

	function _populate() {
	  if (_populated) {
	    return;
	  }

	  _populated = true;

	  // To work around buggy JS libraries that can't handle multi-digit
	  // version numbers, Opera 10's user agent string claims it's Opera
	  // 9, then later includes a Version/X.Y field:
	  //
	  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
	  var uas = navigator.userAgent;
	  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
	  var os    = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

	  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
	  _ipad = /\b(iP[ao]d)/.exec(uas);
	  _android = /Android/i.exec(uas);
	  _native = /FBAN\/\w+;/i.exec(uas);
	  _mobile = /Mobile/i.exec(uas);

	  // Note that the IE team blog would have you believe you should be checking
	  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
	  // from either x64 or ia64;  so ultimately, you should just check for Win64
	  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
	  // Windows will send 'WOW64' instead.
	  _win64 = !!(/Win64/.exec(uas));

	  if (agent) {
	    _ie = agent[1] ? parseFloat(agent[1]) : (
	          agent[5] ? parseFloat(agent[5]) : NaN);
	    // IE compatibility mode
	    if (_ie && document && document.documentMode) {
	      _ie = document.documentMode;
	    }
	    // grab the "true" ie version from the trident token if available
	    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
	    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

	    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
	    _opera   = agent[3] ? parseFloat(agent[3]) : NaN;
	    _webkit  = agent[4] ? parseFloat(agent[4]) : NaN;
	    if (_webkit) {
	      // We do not add the regexp to the above test, because it will always
	      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
	      // the userAgent string.
	      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
	      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
	    } else {
	      _chrome = NaN;
	    }
	  } else {
	    _ie = _firefox = _opera = _chrome = _webkit = NaN;
	  }

	  if (os) {
	    if (os[1]) {
	      // Detect OS X version.  If no version number matches, set _osx to true.
	      // Version examples:  10, 10_6_1, 10.7
	      // Parses version number as a float, taking only first two sets of
	      // digits.  If only one set of digits is found, returns just the major
	      // version number.
	      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

	      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
	    } else {
	      _osx = false;
	    }
	    _windows = !!os[2];
	    _linux   = !!os[3];
	  } else {
	    _osx = _windows = _linux = false;
	  }
	}

	var UserAgent_DEPRECATED = {

	  /**
	   *  Check if the UA is Internet Explorer.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  ie: function() {
	    return _populate() || _ie;
	  },

	  /**
	   * Check if we're in Internet Explorer compatibility mode.
	   *
	   * @return bool true if in compatibility mode, false if
	   * not compatibility mode or not ie
	   */
	  ieCompatibilityMode: function() {
	    return _populate() || (_ie_real_version > _ie);
	  },


	  /**
	   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
	   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
	   * this when we don't need it -- tracked by #601957.
	   */
	  ie64: function() {
	    return UserAgent_DEPRECATED.ie() && _win64;
	  },

	  /**
	   *  Check if the UA is Firefox.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  firefox: function() {
	    return _populate() || _firefox;
	  },


	  /**
	   *  Check if the UA is Opera.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  opera: function() {
	    return _populate() || _opera;
	  },


	  /**
	   *  Check if the UA is WebKit.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  webkit: function() {
	    return _populate() || _webkit;
	  },

	  /**
	   *  For Push
	   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
	   */
	  safari: function() {
	    return UserAgent_DEPRECATED.webkit();
	  },

	  /**
	   *  Check if the UA is a Chrome browser.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  chrome : function() {
	    return _populate() || _chrome;
	  },


	  /**
	   *  Check if the user is running Windows.
	   *
	   *  @return bool `true' if the user's OS is Windows.
	   */
	  windows: function() {
	    return _populate() || _windows;
	  },


	  /**
	   *  Check if the user is running Mac OS X.
	   *
	   *  @return float|bool   Returns a float if a version number is detected,
	   *                       otherwise true/false.
	   */
	  osx: function() {
	    return _populate() || _osx;
	  },

	  /**
	   * Check if the user is running Linux.
	   *
	   * @return bool `true' if the user's OS is some flavor of Linux.
	   */
	  linux: function() {
	    return _populate() || _linux;
	  },

	  /**
	   * Check if the user is running on an iPhone or iPod platform.
	   *
	   * @return bool `true' if the user is running some flavor of the
	   *    iPhone OS.
	   */
	  iphone: function() {
	    return _populate() || _iphone;
	  },

	  mobile: function() {
	    return _populate() || (_iphone || _ipad || _android || _mobile);
	  },

	  nativeApp: function() {
	    // webviews inside of the native apps
	    return _populate() || _native;
	  },

	  android: function() {
	    return _populate() || _android;
	  },

	  ipad: function() {
	    return _populate() || _ipad;
	  }
	};

	module.exports = UserAgent_DEPRECATED;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isEventSupported
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(58);

	var useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  useHasFeature =
	    document.implementation &&
	    document.implementation.hasFeature &&
	    // always returns true in newer browsers as per the standard.
	    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	    document.implementation.hasFeature('', '') !== true;
	}

	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment.canUseDOM ||
	      capture && !('addEventListener' in document)) {
	    return false;
	  }

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = eventName in document;

	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  return isSupported;
	}

	module.exports = isEventSupported;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule nativeRequestAnimationFrame
	 */

	var nativeRequestAnimationFrame =
	  global.requestAnimationFrame       ||
	  global.webkitRequestAnimationFrame ||
	  global.mozRequestAnimationFrame    ||
	  global.oRequestAnimationFrame      ||
	  global.msRequestAnimationFrame;

	module.exports = nativeRequestAnimationFrame;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	"use strict";

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners:
	    canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function(_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/

	"use strict";

	var shallowEqual = __webpack_require__(72);

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule cloneWithProps
	 */

	"use strict";

	var ReactElement = __webpack_require__(68);
	var ReactPropTransferer = __webpack_require__(69);

	var keyOf = __webpack_require__(70);
	var warning = __webpack_require__(71);

	var CHILDREN_PROP = keyOf({children: null});

	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {object} child child component you'd like to clone
	 * @param {object} props props you'd like to modify. They will be merged
	 * as if you used `transferPropsTo()`.
	 * @return {object} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      !child.ref,
	      'You are calling cloneWithProps() on a child with a ref. This is ' +
	      'dangerous because you\'re creating a new child which will not be ' +
	      'added as a ref to its parent.'
	    ) : null);
	  }

	  var newProps = ReactPropTransferer.mergeProps(props, child.props);

	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	      child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }

	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactElement.cloneAndReplaceProps.
	  return ReactElement.createElement(child.type, newProps);
	}

	module.exports = cloneWithProps;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Heap
	 * @typechecks
	 * @preventMunge
	 */

	"use strict";

	/*
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	function defaultComparator(a, b) {
	  return a < b;
	}


	  function Heap(items, comparator) {
	    this._items = items || [];
	    this._size = this._items.length;
	    this._comparator = comparator || defaultComparator;
	    this._heapify();
	  }

	  /*
	   * @return {boolean}
	   */
	  Heap.prototype.empty=function() {
	    return this._size === 0;
	  };

	  /*
	   * @return {*}
	   */
	  Heap.prototype.pop=function() {
	    if (this._size === 0){
	      return;
	    }

	    var elt = this._items[0];

	    var lastElt = this._items.pop();
	    this._size--;

	    if (this._size > 0) {
	      this._items[0] = lastElt;
	      this._sinkDown(0);
	    }

	    return elt;
	  };

	  /*
	   * @param {*} item
	   */
	  Heap.prototype.push=function(item) {
	    this._items[this._size++] = item;
	    this._bubbleUp(this._size - 1);
	  };

	  /*
	   * @return {number}
	   */
	  Heap.prototype.size=function() {
	    return this._size;
	  };

	  /*
	   * @return {*}
	   */
	  Heap.prototype.peek=function() {
	    if (this._size === 0) {
	      return;
	    }

	    return this._items[0];
	  };

	  Heap.prototype._heapify=function() {
	    for (var index = Math.floor((this._size + 1)/ 2); index >= 0; index--) {
	      this._sinkDown(index);
	    }
	  };

	  /*
	   * @parent {number} index
	   */
	  Heap.prototype._bubbleUp=function(index) {
	    var elt = this._items[index];
	    while (index > 0) {
	      var parentIndex = Math.floor((index + 1) / 2) - 1;
	      var parentElt = this._items[parentIndex];

	      // if parentElt < elt, stop
	      if (this._comparator(parentElt, elt)) {
	        return;
	      }

	      // swap
	      this._items[parentIndex] = elt;
	      this._items[index] = parentElt;
	      index = parentIndex;
	    }
	  };

	  /*
	   * @parent {number} index
	   */
	  Heap.prototype._sinkDown=function(index) {
	    var elt = this._items[index];

	    while (true) {
	      var leftChildIndex = 2 * (index + 1) - 1;
	      var rightChildIndex = 2 * (index + 1);
	      var swapIndex = -1;

	      if (leftChildIndex < this._size) {
	        var leftChild = this._items[leftChildIndex];
	        if (this._comparator(leftChild, elt)) {
	          swapIndex = leftChildIndex;
	        }
	      }

	      if (rightChildIndex < this._size) {
	        var rightChild = this._items[rightChildIndex];
	        if (this._comparator(rightChild, elt)) {
	          if (swapIndex === -1 ||
	              this._comparator(rightChild, this._items[swapIndex])) {
	            swapIndex = rightChildIndex;
	          }
	        }
	      }

	      // if we don't have a swap, stop
	      if (swapIndex === -1) {
	        return;
	      }

	      this._items[index] = this._items[swapIndex];
	      this._items[swapIndex] = elt;
	      index = swapIndex;
	    }
	  };


	module.exports = Heap;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ImmutableValue
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(34);
	var isNode = __webpack_require__(66);
	var keyOf = __webpack_require__(64);

	var SECRET_KEY = keyOf({_DONT_EVER_TYPE_THIS_SECRET_KEY: null});

	/**
	 * `ImmutableValue` provides a guarantee of immutability at developer time when
	 * strict mode is used. The extra computations required to enforce immutability
	 * are stripped out in production for performance reasons. `ImmutableValue`
	 * guarantees to enforce immutability for enumerable, own properties. This
	 * allows easy wrapping of `ImmutableValue` with the ability to store
	 * non-enumerable properties on the instance that only your static methods
	 * reason about. In order to achieve IE8 compatibility (which doesn't have the
	 * ability to define non-enumerable properties), modules that want to build
	 * their own reasoning of `ImmutableValue`s and store computations can define
	 * their non-enumerable properties under the name `toString`, and in IE8 only
	 * define a standard property called `toString` which will mistakenly be
	 * considered not enumerable due to its name (but only in IE8). The only
	 * limitation is that no one can store their own `toString` property.
	 * https://developer.mozilla.org/en-US/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	 */

	  /**
	   * An instance of `ImmutableValue` appears to be a plain JavaScript object,
	   * except `instanceof ImmutableValue` evaluates to `true`, and it is deeply
	   * frozen in development mode.
	   *
	   * @param {number} secret Ensures this isn't accidentally constructed outside
	   * of convenience constructors. If created outside of a convenience
	   * constructor, may not be frozen. Forbidding that use case for now until we
	   * have a better API.
	   */
	  function ImmutableValue(secret) {
	    invariant(
	      secret === ImmutableValue[SECRET_KEY],
	      'Only certain classes should create instances of `ImmutableValue`.' +
	      'You probably want something like ImmutableValueObject.create.'
	    );
	  }

	  /**
	   * Helper method for classes that make use of `ImmutableValue`.
	   * @param {ImmutableValue} destination Object to merge properties into.
	   * @param {object} propertyObjects List of objects to merge into
	   * `destination`.
	   */
	  ImmutableValue.mergeAllPropertiesInto=function(destination, propertyObjects) {
	    var argLength = propertyObjects.length;
	    for (var i = 0; i < argLength; i++) {
	      Object.assign(destination, propertyObjects[i]);
	    }
	  };


	  /**
	   * Freezes the supplied object deeply. Other classes may implement their own
	   * version based on this.
	   *
	   * @param {*} object The object to freeze.
	   */
	  ImmutableValue.deepFreezeRootNode=function(object) {
	    if (isNode(object)) {
	      return; // Don't try to freeze DOM nodes.
	    }
	    Object.freeze(object); // First freeze the object.
	    for (var prop in object) {
	      if (object.hasOwnProperty(prop)) {
	        ImmutableValue.recurseDeepFreeze(object[prop]);
	      }
	    }
	    Object.seal(object);
	  };

	  /**
	   * Differs from `deepFreezeRootNode`, in that we first check if this is a
	   * necessary recursion. If the object is already an `ImmutableValue`, then the
	   * recursion is unnecessary as it is already frozen. That check obviously
	   * wouldn't work for the root node version `deepFreezeRootNode`!
	   */
	  ImmutableValue.recurseDeepFreeze=function(object) {
	    if (isNode(object) || !ImmutableValue.shouldRecurseFreeze(object)) {
	      return; // Don't try to freeze DOM nodes.
	    }
	    Object.freeze(object); // First freeze the object.
	    for (var prop in object) {
	      if (object.hasOwnProperty(prop)) {
	        ImmutableValue.recurseDeepFreeze(object[prop]);
	      }
	    }
	    Object.seal(object);
	  };

	  /**
	   * Checks if an object should be deep frozen. Instances of `ImmutableValue`
	   * are assumed to have already been deep frozen, so we can have large
	   * `__DEV__` time savings by skipping freezing of them.
	   *
	   * @param {*} object The object to check.
	   * @return {boolean} Whether or not deep freeze is needed.
	   */
	  ImmutableValue.shouldRecurseFreeze=function(object) {
	    return (
	      typeof object === 'object' &&
	      !(object instanceof ImmutableValue) &&
	      object !== null
	    );
	  };


	ImmutableValue._DONT_EVER_TYPE_THIS_SECRET_KEY = Math.random();

	module.exports = ImmutableValue;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};


	module.exports = keyOf;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule mergeHelpers
	 *
	 * requiresPolyfills: Array.isArray
	 */

	"use strict";

	var invariant = __webpack_require__(34);
	var keyMirror = __webpack_require__(67);

	/**
	 * Maximum number of levels to traverse. Will catch circular structures.
	 * @const
	 */
	var MAX_MERGE_DEPTH = 36;

	/**
	 * We won't worry about edge cases like new String('x') or new Boolean(true).
	 * Functions and Dates are considered terminals, and arrays are not.
	 * @param {*} o The item/object/value to test.
	 * @return {boolean} true iff the argument is a terminal.
	 */
	var isTerminal = function(o) {
	  return typeof o !== 'object' || o instanceof Date || o === null;
	};

	var mergeHelpers = {

	  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

	  isTerminal: isTerminal,

	  /**
	   * Converts null/undefined values into empty object.
	   *
	   * @param {?Object=} arg Argument to be normalized (nullable optional)
	   * @return {!Object}
	   */
	  normalizeMergeArg: function(arg) {
	    return arg === undefined || arg === null ? {} : arg;
	  },

	  /**
	   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
	   * likely the caller's fault. If this function is ever called with anything
	   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
	   *
	   * @param {*} one Array to merge into.
	   * @param {*} two Array to merge from.
	   */
	  checkMergeArrayArgs: function(one, two) {
	    invariant(
	      Array.isArray(one) && Array.isArray(two),
	      'Tried to merge arrays, instead got %s and %s.',
	      one,
	      two
	    );
	  },

	  /**
	   * @param {*} one Object to merge into.
	   * @param {*} two Object to merge from.
	   */
	  checkMergeObjectArgs: function(one, two) {
	    mergeHelpers.checkMergeObjectArg(one);
	    mergeHelpers.checkMergeObjectArg(two);
	  },

	  /**
	   * @param {*} arg
	   */
	  checkMergeObjectArg: function(arg) {
	    invariant(
	      !isTerminal(arg) && !Array.isArray(arg),
	      'Tried to merge an object, instead got %s.',
	      arg
	    );
	  },

	  /**
	   * @param {*} arg
	   */
	  checkMergeIntoObjectArg: function(arg) {
	    invariant(
	      (!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg),
	      'Tried to merge into an object, instead got %s.',
	      arg
	    );
	  },

	  /**
	   * Checks that a merge was not given a circular object or an object that had
	   * too great of depth.
	   *
	   * @param {number} Level of recursion to validate against maximum.
	   */
	  checkMergeLevel: function(level) {
	    invariant(
	      level < MAX_MERGE_DEPTH,
	      'Maximum deep merge depth exceeded. You may be attempting to merge ' +
	      'circular structures in an unsupported way.'
	    );
	  },

	  /**
	   * Checks that the supplied merge strategy is valid.
	   *
	   * @param {string} Array merge strategy.
	   */
	  checkArrayStrategy: function(strategy) {
	    invariant(
	      strategy === undefined || strategy in mergeHelpers.ArrayStrategies,
	      'You must provide an array strategy to deep merge functions to ' +
	      'instruct the deep merge how to resolve merging two arrays.'
	    );
	  },

	  /**
	   * Set of possible behaviors of merge algorithms when encountering two Arrays
	   * that must be merged together.
	   * - `clobber`: The left `Array` is ignored.
	   * - `indexByIndex`: The result is achieved by recursively deep merging at
	   *   each index. (not yet supported.)
	   */
	  ArrayStrategies: keyMirror({
	    Clobber: true,
	    IndexByIndex: true
	  })

	};

	module.exports = mergeHelpers;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isNode
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  return !!(object && (
	    typeof Node === 'function' ? object instanceof Node :
	      typeof object === 'object' &&
	      typeof object.nodeType === 'number' &&
	      typeof object.nodeName === 'string'
	  ));
	}

	module.exports = isNode;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(34);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  );
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	"use strict";

	var ReactContext = __webpack_require__(78);
	var ReactCurrentOwner = __webpack_require__(79);

	var warning = __webpack_require__(71);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true
	};

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} object
	 * @param {string} key
	 */
	function defineWarningProperty(object, key) {
	  Object.defineProperty(object, key, {

	    configurable: false,
	    enumerable: true,

	    get: function() {
	      if (!this._store) {
	        return null;
	      }
	      return this._store[key];
	    },

	    set: function(value) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        false,
	        'Don\'t set the ' + key + ' property of the component. ' +
	        'Mutate the existing props object instead.'
	      ) : null);
	      this._store[key] = value;
	    }

	  });
	}

	/**
	 * This is updated to true if the membrane is successfully created.
	 */
	var useMutationMembrane = false;

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} element
	 */
	function defineMutationMembrane(prototype) {
	  try {
	    var pseudoFrozenProperties = {
	      props: true
	    };
	    for (var key in pseudoFrozenProperties) {
	      defineWarningProperty(prototype, key);
	    }
	    useMutationMembrane = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	/**
	 * Base constructor for all React elements. This is only used to make this
	 * work with a dynamic instanceof check. Nothing should live on this prototype.
	 *
	 * @param {*} type
	 * @param {string|object} ref
	 * @param {*} key
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function(type, key, ref, owner, context, props) {
	  // Built-in properties that belong on the element
	  this.type = type;
	  this.key = key;
	  this.ref = ref;

	  // Record the component responsible for creating this element.
	  this._owner = owner;

	  // TODO: Deprecate withContext, and then the context becomes accessible
	  // through the owner.
	  this._context = context;

	  if ("production" !== process.env.NODE_ENV) {
	    // The validation flag and props are currently mutative. We put them on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    this._store = { validated: false, props: props };

	    // We're not allowed to set props directly on the object so we early
	    // return and rely on the prototype membrane to forward to the backing
	    // store.
	    if (useMutationMembrane) {
	      Object.freeze(this);
	      return;
	    }
	  }

	  this.props = props;
	};

	// We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {
	  _isReactElement: true
	};

	if ("production" !== process.env.NODE_ENV) {
	  defineMutationMembrane(ReactElement.prototype);
	}

	ReactElement.createElement = function(type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;

	  if (config != null) {
	    ref = config.ref === undefined ? null : config.ref;
	    if ("production" !== process.env.NODE_ENV) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        config.key !== null,
	        'createElement(...): Encountered component with a `key` of null. In ' +
	        'a future version, this will be treated as equivalent to the string ' +
	        '\'null\'; instead, provide an explicit key or use undefined.'
	      ) : null);
	    }
	    // TODO: Change this back to `config.key === undefined`
	    key = config.key == null ? null : '' + config.key;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) &&
	          !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (typeof props[propName] === 'undefined') {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  return new ReactElement(
	    type,
	    key,
	    ref,
	    ReactCurrentOwner.current,
	    ReactContext.current,
	    props
	  );
	};

	ReactElement.createFactory = function(type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. <Foo />.type === Foo.type.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
	  var newElement = new ReactElement(
	    oldElement.type,
	    oldElement.key,
	    oldElement.ref,
	    oldElement._owner,
	    oldElement._context,
	    newProps
	  );

	  if ("production" !== process.env.NODE_ENV) {
	    // If the key on the original is valid, then the clone is valid
	    newElement._store.validated = oldElement._store.validated;
	  }
	  return newElement;
	};

	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function(object) {
	  // ReactTestUtils is often used outside of beforeEach where as React is
	  // within it. This leads to two different instances of React on the same
	  // page. To identify a element from a different React instance we use
	  // a flag instead of an instanceof check.
	  var isElement = !!(object && object._isReactElement);
	  // if (isElement && !(object instanceof ReactElement)) {
	  // This is an indicator that you're using multiple versions of React at the
	  // same time. This will screw with ownership and stuff. Fix it, please.
	  // TODO: We could possibly warn here.
	  // }
	  return isElement;
	};

	module.exports = ReactElement;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	"use strict";

	var assign = __webpack_require__(75);
	var emptyFunction = __webpack_require__(74);
	var invariant = __webpack_require__(76);
	var joinClasses = __webpack_require__(77);
	var warning = __webpack_require__(71);

	var didWarn = false;

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};

	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }

	    var transferStrategy = TransferStrategies[thisKey];

	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  TransferStrategies: TransferStrategies,

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  },

	  /**
	   * @lends {ReactPropTransferer.prototype}
	   */
	  Mixin: {

	    /**
	     * Transfer props from this component to a target component.
	     *
	     * Props that do not have an explicit transfer strategy will be transferred
	     * only if the target component does not already have the prop set.
	     *
	     * This is usually used to pass down props to a returned root component.
	     *
	     * @param {ReactElement} element Component receiving the properties.
	     * @return {ReactElement} The supplied `component`.
	     * @final
	     * @protected
	     */
	    transferPropsTo: function(element) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        element._owner === this,
	        '%s: You can\'t call transferPropsTo() on a component that you ' +
	        'don\'t own, %s. This usually means you are calling ' +
	        'transferPropsTo() on a component passed in as props or children.',
	        this.constructor.displayName,
	        typeof element.type === 'string' ?
	        element.type :
	        element.type.displayName
	      ) : invariant(element._owner === this));

	      if ("production" !== process.env.NODE_ENV) {
	        if (!didWarn) {
	          didWarn = true;
	          ("production" !== process.env.NODE_ENV ? warning(
	            false,
	            'transferPropsTo is deprecated. ' +
	            'See http://fb.me/react-transferpropsto for more information.'
	          ) : null);
	        }
	      }

	      // Because elements are immutable we have to merge into the existing
	      // props object rather than clone it.
	      transferInto(element.props, this.props);

	      return element;
	    }

	  }
	};

	module.exports = ReactPropTransferer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};


	module.exports = keyOf;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(74);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if ("production" !== process.env.NODE_ENV) {
	  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}

	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */

	"use strict";

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };

	module.exports = emptyFunction;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	};

	module.exports = assign;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactContext
	 */

	"use strict";

	var assign = __webpack_require__(75);

	/**
	 * Keeps track of the current context.
	 *
	 * The context is automatically passed down the component ownership hierarchy
	 * and is accessible via `this.context` on ReactCompositeComponents.
	 */
	var ReactContext = {

	  /**
	   * @internal
	   * @type {object}
	   */
	  current: {},

	  /**
	   * Temporarily extends the current context while executing scopedCallback.
	   *
	   * A typical use case might look like
	   *
	   *  render: function() {
	   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
	   *
	   *    ));
	   *    return <div>{children}</div>;
	   *  }
	   *
	   * @param {object} newContext New context to merge into the existing context
	   * @param {function} scopedCallback Callback to run with the new context
	   * @return {ReactComponent|array<ReactComponent>}
	   */
	  withContext: function(newContext, scopedCallback) {
	    var result;
	    var previousContext = ReactContext.current;
	    ReactContext.current = assign({}, previousContext, newContext);
	    try {
	      result = scopedCallback();
	    } finally {
	      ReactContext.current = previousContext;
	    }
	    return result;
	  }

	};

	module.exports = ReactContext;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	"use strict";

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;


/***/ }
/******/ ])