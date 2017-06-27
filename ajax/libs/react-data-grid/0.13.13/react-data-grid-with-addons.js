(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react"));
	else
		root["ReactDataGrid"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);
	module.exports.Editors = __webpack_require__(85);
	module.exports.Formatters = __webpack_require__(89);
	module.exports.Toolbar = __webpack_require__(91);
	module.exports.Row = __webpack_require__(48);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM

	 */
	"use strict";

	var _extends = __webpack_require__(2)['default'];

	var _Object$assign = __webpack_require__(3)['default'];

	var React = __webpack_require__(16);
	var PropTypes = React.PropTypes;
	var BaseGrid = __webpack_require__(17);
	var Row = __webpack_require__(48);
	var ExcelColumn = __webpack_require__(40);
	var KeyboardHandlerMixin = __webpack_require__(51);
	var CheckboxEditor = __webpack_require__(80);
	var FilterableHeaderCell = __webpack_require__(81);
	var cloneWithProps = __webpack_require__(28);
	var DOMMetrics = __webpack_require__(77);
	var ColumnMetricsMixin = __webpack_require__(82);
	var RowUtils = __webpack_require__(84);
	var ColumnUtils = __webpack_require__(23);

	if (!_Object$assign) {
	  Object.assign = __webpack_require__(83);
	}

	var ReactDataGrid = React.createClass({
	  displayName: 'ReactDataGrid',

	  propTypes: {
	    rowHeight: React.PropTypes.number.isRequired,
	    minHeight: React.PropTypes.number.isRequired,
	    enableRowSelect: React.PropTypes.bool,
	    onRowUpdated: React.PropTypes.func,
	    rowGetter: React.PropTypes.func.isRequired,
	    rowsCount: React.PropTypes.number.isRequired,
	    toolbar: React.PropTypes.element,
	    enableCellSelect: React.PropTypes.bool,
	    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
	    onFilter: React.PropTypes.func,
	    onCellCopyPaste: React.PropTypes.func,
	    onCellsDragged: React.PropTypes.func,
	    onAddFilter: React.PropTypes.func
	  },

	  mixins: [ColumnMetricsMixin, DOMMetrics.MetricsComputatorMixin, KeyboardHandlerMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      enableCellSelect: false,
	      tabIndex: -1,
	      rowHeight: 35,
	      enableRowSelect: false,
	      minHeight: 350
	    };
	  },

	  getInitialState: function getInitialState() {
	    var columnMetrics = this.createColumnMetrics(true);
	    var initialState = { columnMetrics: columnMetrics, selectedRows: this.getInitialSelectedRows(), copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0 };
	    if (this.props.enableCellSelect) {
	      initialState.selected = { rowIdx: 0, idx: 0 };
	    } else {
	      initialState.selected = { rowIdx: -1, idx: -1 };
	    }
	    return initialState;
	  },

	  getInitialSelectedRows: function getInitialSelectedRows() {
	    var selectedRows = [];
	    for (var i = 0; i < this.props.rowsCount; i++) {
	      selectedRows.push(false);
	    }
	    return selectedRows;
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.rowsCount === this.props.rowsCount + 1) {
	      this.onAfterAddRow(nextProps.rowsCount + 1);
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    var scrollOffset = 0;
	    var canvas = this.getDOMNode().querySelector('.react-grid-Canvas');
	    if (canvas != null) {
	      scrollOffset = canvas.offsetWidth - canvas.clientWidth;
	    }
	    this.setState({ scrollOffset: scrollOffset });
	  },

	  render: function render() {
	    var cellMetaData = {
	      selected: this.state.selected,
	      dragged: this.state.dragged,
	      onCellClick: this.onCellClick,
	      onCellDoubleClick: this.onCellDoubleClick,
	      onCommit: this.onCellCommit,
	      onCommitCancel: this.setInactive,
	      copied: this.state.copied,
	      handleDragEnterRow: this.handleDragEnter,
	      handleTerminateDrag: this.handleTerminateDrag
	    };

	    var toolbar = this.renderToolbar();
	    var containerWidth = this.DOMMetrics.gridWidth();
	    var gridWidth = containerWidth - this.state.scrollOffset;

	    return React.createElement(
	      'div',
	      { className: 'react-grid-Container', style: { width: containerWidth } },
	      toolbar,
	      React.createElement(
	        'div',
	        { className: 'react-grid-Main' },
	        React.createElement(BaseGrid, _extends({
	          ref: 'base'
	        }, this.props, {
	          headerRows: this.getHeaderRows(),
	          columnMetrics: this.state.columnMetrics,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          rowHeight: this.props.rowHeight,
	          cellMetaData: cellMetaData,
	          selectedRows: this.state.selectedRows,
	          expandedRows: this.state.expandedRows,
	          rowOffsetHeight: this.getRowOffsetHeight(),
	          sortColumn: this.state.sortColumn,
	          sortDirection: this.state.sortDirection,
	          onSort: this.handleSort,
	          minHeight: this.props.minHeight,
	          totalWidth: gridWidth,
	          onViewportKeydown: this.onKeyDown,
	          onViewportDragStart: this.onDragStart,
	          onViewportDragEnd: this.handleDragEnd,
	          onViewportDoubleClick: this.onViewportDoubleClick,
	          onColumnResize: this.onColumnResize }))
	      )
	    );
	  },

	  renderToolbar: function renderToolbar() {
	    var Toolbar = this.props.toolbar;
	    if (React.isValidElement(Toolbar)) {
	      return cloneWithProps(Toolbar, { onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount });
	    }
	  },

	  onSelect: function onSelect(selected) {
	    if (this.props.enableCellSelect) {
	      if (this.state.selected.rowIdx === selected.rowIdx && this.state.selected.idx === selected.idx && this.state.selected.active === true) {} else {
	        var idx = selected.idx;
	        var rowIdx = selected.rowIdx;
	        if (idx >= 0 && rowIdx >= 0 && idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && rowIdx < this.props.rowsCount) {
	          this.setState({ selected: selected });
	        }
	      }
	    }
	  },

	  onCellClick: function onCellClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
	  },

	  onCellDoubleClick: function onCellDoubleClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
	    this.setActive('Enter');
	  },

	  onViewportDoubleClick: function onViewportDoubleClick(e) {
	    this.setActive();
	  },

	  onPressArrowUp: function onPressArrowUp(e) {
	    this.moveSelectedCell(e, -1, 0);
	  },

	  onPressArrowDown: function onPressArrowDown(e) {
	    this.moveSelectedCell(e, 1, 0);
	  },

	  onPressArrowLeft: function onPressArrowLeft(e) {
	    this.moveSelectedCell(e, 0, -1);
	  },

	  onPressArrowRight: function onPressArrowRight(e) {
	    this.moveSelectedCell(e, 0, 1);
	  },

	  onPressTab: function onPressTab(e) {
	    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
	  },

	  onPressEnter: function onPressEnter(e) {
	    this.setActive(e.key);
	  },

	  onPressDelete: function onPressDelete(e) {
	    this.setActive(e.key);
	  },

	  onPressEscape: function onPressEscape(e) {
	    this.setInactive(e.key);
	  },

	  onPressBackspace: function onPressBackspace(e) {
	    this.setActive(e.key);
	  },

	  onPressChar: function onPressChar(e) {
	    if (this.isKeyPrintable(e.keyCode)) {
	      this.setActive(e.keyCode);
	    }
	  },

	  onPressKeyWithCtrl: function onPressKeyWithCtrl(e) {
	    var keys = {
	      KeyCode_c: 99,
	      KeyCode_C: 67,
	      KeyCode_V: 86,
	      KeyCode_v: 118
	    };

	    var idx = this.state.selected.idx;
	    if (this.canEdit(idx)) {
	      if (e.keyCode == keys.KeyCode_c || e.keyCode == keys.KeyCode_C) {
	        var value = this.getSelectedValue();
	        this.handleCopy({ value: value });
	      } else if (e.keyCode == keys.KeyCode_v || e.keyCode == keys.KeyCode_V) {
	        this.handlePaste();
	      }
	    }
	  },

	  onDragStart: function onDragStart(e) {
	    var value = this.getSelectedValue();
	    this.handleDragStart({ idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: value });
	    //need to set dummy data for FF
	    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
	  },

	  moveSelectedCell: function moveSelectedCell(e, rowDelta, cellDelta) {
	    // we need to prevent default as we control grid scroll
	    //otherwise it moves every time you left/right which is janky
	    e.preventDefault();
	    var rowIdx = this.state.selected.rowIdx + rowDelta;
	    var idx = this.state.selected.idx + cellDelta;
	    this.onSelect({ idx: idx, rowIdx: rowIdx });
	  },

	  getSelectedValue: function getSelectedValue() {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    var cellKey = this.getColumn(this.state.columnMetrics.columns, idx).key;
	    var row = this.props.rowGetter(rowIdx);
	    return RowUtils.get(row, cellKey);
	  },

	  setActive: function setActive(keyPressed) {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    if (this.canEdit(idx) && !this.isActive()) {
	      var selected = _Object$assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed });
	      this.setState({ selected: selected });
	    }
	  },

	  setInactive: function setInactive() {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    if (this.canEdit(idx) && this.isActive()) {
	      var selected = _Object$assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: false });
	      this.setState({ selected: selected });
	    }
	  },

	  canEdit: function canEdit(idx) {
	    var col = this.getColumn(this.props.columns, idx);
	    return this.props.enableCellSelect === true && (col.editor != null || col.editable);
	  },

	  isActive: function isActive() {
	    return this.state.selected.active === true;
	  },

	  onCellCommit: function onCellCommit(commit) {
	    var selected = _Object$assign({}, this.state.selected);
	    selected.active = false;
	    if (commit.key === 'Tab') {
	      selected.idx += 1;
	    }
	    var expandedRows = this.state.expandedRows;
	    // if(commit.changed && commit.changed.expandedHeight){
	    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	    // }
	    this.setState({ selected: selected, expandedRows: expandedRows });
	    this.props.onRowUpdated(commit);
	  },

	  setupGridColumns: function setupGridColumns() {
	    var cols = this.props.columns.slice(0);
	    if (this.props.enableRowSelect) {
	      var selectColumn = {
	        key: 'select-row',
	        name: '',
	        formatter: React.createElement(CheckboxEditor, null),
	        onCellChange: this.handleRowSelect,
	        filterable: false,
	        headerRenderer: React.createElement('input', { type: 'checkbox', onChange: this.handleCheckboxChange }),
	        width: 60,
	        locked: true
	      };
	      var unshiftedCols = cols.unshift(selectColumn);
	      cols = unshiftedCols > 0 ? cols : unshiftedCols;
	    }
	    return cols;
	  },

	  handleCheckboxChange: function handleCheckboxChange(e) {
	    var allRowsSelected;
	    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
	      allRowsSelected = true;
	    } else {
	      allRowsSelected = false;
	    }
	    var selectedRows = [];
	    for (var i = 0; i < this.props.rowsCount; i++) {
	      selectedRows.push(allRowsSelected);
	    }
	    this.setState({ selectedRows: selectedRows });
	  },

	  // columnKey not used here as this function will select the whole row,
	  // but needed to match the function signature in the CheckboxEditor
	  handleRowSelect: function handleRowSelect(rowIdx, columnKey, e) {
	    e.stopPropagation();
	    if (this.state.selectedRows != null && this.state.selectedRows.length > 0) {
	      var selectedRows = this.state.selectedRows.slice();
	      if (selectedRows[rowIdx] == null || selectedRows[rowIdx] == false) {
	        selectedRows[rowIdx] = true;
	      } else {
	        selectedRows[rowIdx] = false;
	      }
	      this.setState({ selectedRows: selectedRows });
	    }
	  },

	  //EXPAND ROW Functionality - removing for now till we decide on how best to implement
	  // expandRow(row: Row, newHeight: number): Array<Row>{
	  //   var expandedRows = this.state.expandedRows;
	  //   if(expandedRows[row]){
	  //     if(expandedRows[row]== null || expandedRows[row] < newHeight){
	  //       expandedRows[row] = newHeight;
	  //     }
	  //   }else{
	  //     expandedRows[row] = newHeight;
	  //   }
	  //   return expandedRows;
	  // },
	  //
	  // handleShowMore(row: Row, newHeight: number) {
	  //   var expandedRows = this.expandRow(row, newHeight);
	  //   this.setState({expandedRows : expandedRows});
	  // },
	  //
	  // handleShowLess(row: Row){
	  //   var expandedRows = this.state.expandedRows;
	  //   if(expandedRows[row]){
	  //       expandedRows[row] = false;
	  //   }
	  //   this.setState({expandedRows : expandedRows});
	  // },
	  //
	  // expandAllRows(){
	  //
	  // },
	  //
	  // collapseAllRows(){
	  //
	  // },

	  onAfterAddRow: function onAfterAddRow(numberOfRows) {
	    this.setState({ selected: { idx: 1, rowIdx: numberOfRows - 2 } });
	  },

	  onToggleFilter: function onToggleFilter() {
	    this.setState({ canFilter: !this.state.canFilter });
	  },

	  getHeaderRows: function getHeaderRows() {
	    var rows = [{ ref: "row", height: this.props.rowHeight }];
	    if (this.state.canFilter === true) {
	      rows.push({
	        ref: "filterRow",
	        headerCellRenderer: React.createElement(FilterableHeaderCell, { onChange: this.props.onAddFilter, column: this.props.column }),
	        height: 45
	      });
	    }
	    return rows;
	  },

	  getRowOffsetHeight: function getRowOffsetHeight() {
	    var offsetHeight = 0;
	    this.getHeaderRows().forEach(function (row) {
	      return offsetHeight += parseFloat(row.height, 10);
	    });
	    return offsetHeight;
	  },

	  handleSort: function handleSort(columnKey, direction) {
	    this.setState({ sortDirection: direction, sortColumn: columnKey }, function () {
	      this.props.onGridSort(columnKey, direction);
	    });
	  },

	  copyPasteEnabled: function copyPasteEnabled() {
	    return this.props.onCellCopyPaste !== null;
	  },

	  handleCopy: function handleCopy(args) {
	    if (!this.copyPasteEnabled()) {
	      return;
	    }
	    var textToCopy = args.value;
	    var selected = this.state.selected;
	    var copied = { idx: selected.idx, rowIdx: selected.rowIdx };
	    this.setState({ textToCopy: textToCopy, copied: copied });
	  },

	  handlePaste: function handlePaste() {
	    if (!this.copyPasteEnabled()) {
	      return;
	    }
	    var selected = this.state.selected;

	    var cellKey = this.getColumn(this.state.columnMetrics.columns, this.state.selected.idx).key;
	    if (this.props.onCellCopyPaste) {
	      this.props.onCellCopyPaste({ cellKey: cellKey, rowIdx: selected.rowIdx, value: this.state.textToCopy, fromRow: this.state.copied.rowIdx, toRow: selected.rowIdx });
	    }
	    this.setState({ copied: null });
	  },

	  dragEnabled: function dragEnabled() {
	    return this.props.onCellsDragged !== null;
	  },

	  handleDragStart: function handleDragStart(dragged) {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var idx = dragged.idx;
	    var rowIdx = dragged.rowIdx;
	    if (idx >= 0 && rowIdx >= 0 && idx < this.getSize() && rowIdx < this.props.rowsCount) {
	      this.setState({ dragged: dragged });
	    }
	  },

	  handleDragEnter: function handleDragEnter(row) {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	    this.setState({ dragged: dragged });
	  },

	  handleDragEnd: function handleDragEnd() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var fromRow, toRow;
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    var cellKey = this.getColumn(this.state.columnMetrics.columns, this.state.selected.idx).key;
	    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    toRow = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    if (this.props.onCellsDragged) {
	      this.props.onCellsDragged({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value });
	    }
	    this.setState({ dragged: { complete: true } });
	  },

	  handleTerminateDrag: function handleTerminateDrag() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    this.setState({ dragged: null });
	  }

	});

	module.exports = ReactDataGrid;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(3)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(6);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(9)});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(10)
	  , toObject = __webpack_require__(11)
	  , IObject  = __webpack_require__(13);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(15)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(14);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var PropTypes = React.PropTypes;
	var Header = __webpack_require__(18);
	var Viewport = __webpack_require__(45);
	var ExcelColumn = __webpack_require__(40);
	var GridScrollMixin = __webpack_require__(79);
	var DOMMetrics = __webpack_require__(77);

	var Grid = React.createClass({
	  displayName: 'Grid',

	  propTypes: {
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    minHeight: PropTypes.number,
	    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowHeight: PropTypes.number,
	    rowRenderer: PropTypes.func,
	    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowsCount: PropTypes.number,
	    onRows: PropTypes.func,
	    sortColumn: React.PropTypes.string,
	    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
	    rowOffsetHeight: PropTypes.number.isRequired,
	    onViewportKeydown: PropTypes.func.isRequired,
	    onViewportDragStart: PropTypes.func.isRequired,
	    onViewportDragEnd: PropTypes.func.isRequired,
	    onViewportDoubleClick: PropTypes.func.isRequired
	  },

	  mixins: [GridScrollMixin, DOMMetrics.MetricsComputatorMixin],

	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      outline: 0,
	      position: 'relative',
	      minHeight: this.props.minHeight
	    };
	  },

	  render: function render() {
	    var headerRows = this.props.headerRows || [{ ref: 'row' }];
	    return React.createElement(
	      'div',
	      _extends({}, this.props, { style: this.getStyle(), className: 'react-grid-Grid' }),
	      React.createElement(Header, {
	        ref: 'header',
	        columnMetrics: this.props.columnMetrics,
	        onColumnResize: this.props.onColumnResize,
	        height: this.props.rowHeight,
	        totalWidth: this.props.totalWidth,
	        headerRows: headerRows,
	        sortColumn: this.props.sortColumn,
	        sortDirection: this.props.sortDirection,
	        onSort: this.props.onSort
	      }),
	      React.createElement(
	        'div',
	        { ref: 'viewPortContainer', onKeyDown: this.props.onViewportKeydown, onDoubleClick: this.props.onViewportDoubleClick, onDragStart: this.props.onViewportDragStart, onDragEnd: this.props.onViewportDragEnd },
	        React.createElement(Viewport, {
	          ref: 'viewport',
	          width: this.props.columnMetrics.width,
	          rowHeight: this.props.rowHeight,
	          rowRenderer: this.props.rowRenderer,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          selectedRows: this.props.selectedRows,
	          expandedRows: this.props.expandedRows,
	          columnMetrics: this.props.columnMetrics,
	          totalWidth: this.props.totalWidth,
	          onScroll: this.onScroll,
	          onRows: this.props.onRows,
	          cellMetaData: this.props.cellMetaData,
	          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,
	          minHeight: this.props.minHeight
	        })
	      )
	    );
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  }
	});

	module.exports = Grid;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var shallowCloneObject = __webpack_require__(20);
	var ColumnMetrics = __webpack_require__(21);
	var ColumnUtils = __webpack_require__(23);
	var HeaderRow = __webpack_require__(25);

	var Header = React.createClass({
	  displayName: 'Header',

	  propTypes: {
	    columnMetrics: React.PropTypes.shape({ width: React.PropTypes.number.isRequired }).isRequired,
	    totalWidth: React.PropTypes.number,
	    height: React.PropTypes.number.isRequired,
	    headerRows: React.PropTypes.array.isRequired
	  },

	  render: function render() {
	    var state = this.state.resizing || this.props;

	    var className = joinClasses({
	      'react-grid-Header': true,
	      'react-grid-Header--resizing': !!this.state.resizing
	    });
	    var headerRows = this.getHeaderRows();

	    return React.createElement(
	      'div',
	      _extends({}, this.props, { style: this.getStyle(), className: className }),
	      headerRows
	    );
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var update = !ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn) || this.props.totalWidth != nextProps.totalWidth || this.props.headerRows.length != nextProps.headerRows.length || this.state.resizing != nextState.resizing || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;
	    return update;
	  },

	  getHeaderRows: function getHeaderRows() {
	    var columnMetrics = this.getColumnMetrics();
	    var resizeColumn;
	    if (this.state.resizing) {
	      resizeColumn = this.state.resizing.column;
	    }
	    var headerRows = [];
	    this.props.headerRows.forEach((function (row, index) {
	      var headerRowStyle = {
	        position: 'absolute',
	        top: this.getCombinedHeaderHeights(index),
	        left: 0,
	        width: this.props.totalWidth,
	        overflow: 'hidden'
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref,
	        ref: row.ref,
	        style: headerRowStyle,
	        onColumnResize: this.onColumnResize,
	        onColumnResizeEnd: this.onColumnResizeEnd,
	        width: columnMetrics.width,
	        height: row.height || this.props.height,
	        columns: columnMetrics.columns,
	        resizing: resizeColumn,
	        headerCellRenderer: row.headerCellRenderer,
	        sortColumn: this.props.sortColumn,
	        sortDirection: this.props.sortDirection,
	        onSort: this.props.onSort
	      }));
	    }).bind(this));
	    return headerRows;
	  },

	  getInitialState: function getInitialState() {
	    return { resizing: null };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({ resizing: null });
	  },

	  onColumnResize: function onColumnResize(column, width) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos != null) {
	      var resizing = {
	        columnMetrics: shallowCloneObject(state.columnMetrics)
	      };
	      resizing.columnMetrics = ColumnMetrics.resizeColumn(resizing.columnMetrics, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
	        resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
	      }

	      resizing.column = ColumnUtils.getColumn(resizing.columnMetrics.columns, pos);
	      this.setState({ resizing: resizing });
	    }
	  },

	  getColumnMetrics: function getColumnMetrics() {
	    var columnMetrics;
	    if (this.state.resizing) {
	      columnMetrics = this.state.resizing.columnMetrics;
	    } else {
	      columnMetrics = this.props.columnMetrics;
	    }
	    return columnMetrics;
	  },

	  getColumnPosition: function getColumnPosition(column) {
	    var columnMetrics = this.getColumnMetrics();
	    var pos = -1;
	    columnMetrics.columns.forEach(function (c, idx) {
	      if (c.key === column.key) {
	        pos = idx;
	      }
	    });
	    return pos === -1 ? null : pos;
	  },

	  onColumnResizeEnd: function onColumnResizeEnd(column, width) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = this.refs.row.getDOMNode();
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	  },

	  getCombinedHeaderHeights: function getCombinedHeaderHeights(until) {
	    var stop_at = this.props.headerRows.length;
	    if (typeof until != 'undefined') stop_at = until;

	    var height = 0;
	    for (var index = 0; index < stop_at; index++) {
	      height += this.props.headerRows[index].height || this.props.height;
	    }
	    return height;
	  },

	  getStyle: function getStyle() {
	    return {
	      position: 'relative',
	      height: this.getCombinedHeaderHeights(),
	      overflow: 'hidden'
	    };
	  }
	});

	module.exports = Header;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames() {
		var classes = '';
		var arg;

		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}

			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	function shallowCloneObject(obj) {
	  var result = {};
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) {
	      result[k] = obj[k];
	    }
	  }
	  return result;
	}

	module.exports = shallowCloneObject;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var _Object$assign = __webpack_require__(3)['default'];

	var shallowCloneObject = __webpack_require__(20);
	var isValidElement = __webpack_require__(16).isValidElement;
	var sameColumn = __webpack_require__(22);
	var ColumnUtils = __webpack_require__(23);
	var getScrollbarSize = __webpack_require__(24);

	/**
	 * Update column metrics calculation.
	 *
	 * @param {ColumnMetricsType} metrics
	 */
	function recalculate(metrics) {
	  // compute width for columns which specify width
	  var columns = setColumnWidths(metrics.columns, metrics.totalWidth);

	  var unallocatedWidth = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w - column.width;
	  }, metrics.totalWidth);
	  unallocatedWidth -= getScrollbarSize();

	  var width = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w + column.width;
	  }, 0);

	  // compute width for columns which doesn't specify width
	  columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

	  // compute left offset
	  columns = setColumnOffsets(columns);

	  return {
	    columns: columns,
	    width: width,
	    totalWidth: metrics.totalWidth,
	    minColumnWidth: metrics.minColumnWidth
	  };
	}

	function setColumnOffsets(columns) {
	  var left = 0;
	  return columns.map(function (column) {
	    column.left = left;
	    left += column.width;
	    return column;
	  });
	}

	function setColumnWidths(columns, totalWidth) {
	  return columns.map(function (column) {
	    var colInfo = _Object$assign({}, column);
	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width.toString())) {
	        colInfo.width = Math.floor(column.width / 100 * totalWidth);
	      }
	    }
	    return colInfo;
	  });
	}

	function setDefferedColumnWidths(columns, unallocatedWidth, minColumnWidth) {
	  var defferedColumns = columns.filter(function (c) {
	    return !c.width;
	  });
	  return columns.map(function (column, i, arr) {
	    if (!column.width) {
	      if (unallocatedWidth <= 0) {
	        column.width = minColumnWidth;
	      } else {
	        column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));
	      }
	    }
	    return column;
	  });
	}

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetricsType} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = ColumnUtils.getColumn(metrics.columns, index);
	  metrics = shallowCloneObject(metrics);
	  metrics.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metrics.minColumnWidth);

	  metrics = ColumnUtils.spliceColumn(metrics, index, updatedColumn);

	  return recalculate(metrics);
	}

	function areColumnsImmutable(prevColumns, nextColumns) {
	  return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;
	}

	function compareEachColumn(prevColumns, nextColumns, sameColumn) {
	  var i, len, column;
	  var prevColumnsByKey = {};
	  var nextColumnsByKey = {};

	  if (ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)) {
	    return false;
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !sameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }
	  return true;
	}

	function sameColumns(prevColumns, nextColumns, sameColumn) {
	  if (areColumnsImmutable(prevColumns, nextColumns)) {
	    return prevColumns === nextColumns;
	  } else {
	    return compareEachColumn(prevColumns, nextColumns, sameColumn);
	  }
	}

	module.exports = { recalculate: recalculate, resizeColumn: resizeColumn, sameColumn: sameColumn, sameColumns: sameColumns };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO objects as a map */
	'use strict';

	var isValidElement = __webpack_require__(16).isValidElement;
	module.exports = function sameColumn(a, b) {
	  var k;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if (typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])) {
	        continue;
	      }
	      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
	        return false;
	      }
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	  getColumn: function getColumn(columns, idx) {
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },

	  spliceColumn: function spliceColumn(metrics, idx, column) {
	    if (Array.isArray(metrics.columns)) {
	      metrics.columns.splice(idx, 1, column);
	    } else if (typeof Immutable !== 'undefined') {
	      metrics.columns = metrics.columns.splice(idx, 1, column);
	    }
	    return metrics;
	  },

	  getSize: function getSize(columns) {
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	/*  offsetWidth in HTMLElement */
	"use strict";

	var size;

	function getScrollbarSize() {
	  if (size === undefined) {

	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.clientWidth;
	    outer.style.overflowY = 'scroll';
	    var innerWidth = inner.clientWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM
	 */
	"use strict";

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var PropTypes = React.PropTypes;
	var shallowEqual = __webpack_require__(26);
	var HeaderCell = __webpack_require__(27);
	var getScrollbarSize = __webpack_require__(24);
	var ExcelColumn = __webpack_require__(40);
	var ColumnUtilsMixin = __webpack_require__(23);
	var SortableHeaderCell = __webpack_require__(44);

	var HeaderRowStyle = {
	  overflow: React.PropTypes.string,
	  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	  height: React.PropTypes.number,
	  position: React.PropTypes.string
	};

	var DEFINE_SORT = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	  NONE: 'NONE'
	};

	var HeaderRow = React.createClass({
	  displayName: 'HeaderRow',

	  propTypes: {
	    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func.isRequired,
	    style: PropTypes.shape(HeaderRowStyle)

	  },

	  mixins: [ColumnUtilsMixin],

	  render: function render() {
	    var cellsStyle = {
	      width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
	      height: this.props.height,
	      whiteSpace: 'nowrap',
	      overflowX: 'hidden',
	      overflowY: 'hidden'
	    };

	    var cells = this.getCells();
	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: 'react-grid-HeaderRow' }),
	      React.createElement(
	        'div',
	        { style: cellsStyle },
	        cells
	      )
	    );
	  },

	  getHeaderRenderer: function getHeaderRenderer(column) {
	    if (column.sortable) {
	      var sortDirection = this.props.sortColumn === column.key ? this.props.sortDirection : DEFINE_SORT.NONE;
	      return React.createElement(SortableHeaderCell, { columnKey: column.key, onSort: this.props.onSort, sortDirection: sortDirection });
	    } else {
	      return this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer;
	    }
	  },

	  getCells: function getCells() {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.getSize(this.props.columns); i < len; i++) {
	      var column = this.getColumn(this.props.columns, i);
	      var cell = React.createElement(HeaderCell, {
	        ref: i,
	        key: i,
	        height: this.props.height,
	        column: column,
	        renderer: this.getHeaderRenderer(column),
	        resizing: this.props.resizing === column,
	        onResize: this.props.onColumnResize,
	        onResizeEnd: this.props.onColumnResizeEnd
	      });
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var _this = this;

	    this.props.columns.forEach(function (column, i) {
	      if (column.locked) {
	        _this.refs[i].setScrollLeft(scrollLeft);
	      }
	    });
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style, this.props.style) || this.props.sortColumn != nextProps.sortColumn || this.props.sortDirection != nextProps.sortDirection;
	  },

	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  }

	});

	module.exports = HeaderRow;

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO unkwon */
	/**
	 * @jsx React.DOM


	 */
	"use strict";

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var cloneWithProps = __webpack_require__(28);
	var PropTypes = React.PropTypes;
	var ExcelColumn = __webpack_require__(40);
	var ResizeHandle = __webpack_require__(42);

	var HeaderCell = React.createClass({
	  displayName: 'HeaderCell',

	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.shape(ExcelColumn).isRequired,
	    onResize: PropTypes.func.isRequired,
	    height: PropTypes.number.isRequired,
	    onResizeEnd: PropTypes.func.isRequired
	  },

	  render: function render() {
	    var resizeHandle;
	    if (this.props.column.resizable) {
	      resizeHandle = React.createElement(ResizeHandle, {
	        onDrag: this.onDrag,
	        onDragStart: this.onDragStart,
	        onDragEnd: this.onDragEnd
	      });
	    }
	    var className = joinClasses({
	      'react-grid-HeaderCell': true,
	      'react-grid-HeaderCell--resizing': this.state.resizing,
	      'react-grid-HeaderCell--locked': this.props.column.locked
	    });
	    className = joinClasses(className, this.props.className);
	    var cell = this.getCell();
	    return React.createElement(
	      'div',
	      { className: className, style: this.getStyle() },
	      cell,
	      { resizeHandle: resizeHandle }
	    );
	  },

	  getCell: function getCell() {
	    if (React.isValidElement(this.props.renderer)) {
	      return cloneWithProps(this.props.renderer, { column: this.props.column });
	    } else {
	      var Renderer = this.props.renderer;
	      return this.props.renderer({ column: this.props.column });
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { resizing: false };
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = React.findDOMNode(this);
	    node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	    node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	  },

	  getStyle: function getStyle() {
	    return {
	      width: this.props.column.width,
	      left: this.props.column.left,
	      display: 'inline-block',
	      position: 'absolute',
	      overflow: 'hidden',
	      height: this.props.height,
	      margin: 0,
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    };
	  },

	  onDragStart: function onDragStart(e) {
	    this.setState({ resizing: true });
	    //need to set dummy data for FF
	    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
	  },

	  onDrag: function onDrag(e) {
	    var resize = this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
	    if (resize) {
	      var width = this.getWidthFromMouseEvent(e);
	      if (width > 0) {
	        resize(this.props.column, width);
	      }
	    }
	  },

	  onDragEnd: function onDragEnd(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    this.props.onResizeEnd(this.props.column, width);
	    this.setState({ resizing: false });
	  },

	  getWidthFromMouseEvent: function getWidthFromMouseEvent(e) {
	    var right = e.pageX;
	    var left = React.findDOMNode(this).getBoundingClientRect().left;
	    return right - left;
	  }
	});

	function simpleCellRenderer(props) {
	  return React.createElement(
	    'div',
	    { className: 'widget-HeaderCell__value' },
	    props.column.name
	  );
	}

	var SimpleCellFormatter = React.createClass({
	  displayName: 'SimpleCellFormatter',

	  propTypes: {
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
	  },

	  render: function render() {
	    return React.createElement(
	      'span',
	      null,
	      this.props.value
	    );
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.value !== this.props.value;
	  }

	});

	module.exports = HeaderCell;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule cloneWithProps
	 */

	'use strict';

	var ReactElement = __webpack_require__(30);
	var ReactPropTransferer = __webpack_require__(37);

	var keyOf = __webpack_require__(39);
	var warning = __webpack_require__(34);

	var CHILDREN_PROP = keyOf({children: null});

	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {ReactElement} child child element you'd like to clone
	 * @param {object} props props you'd like to modify. className and style will be
	 * merged automatically.
	 * @return {ReactElement} a clone of child with props merged in.
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 29 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

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

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var ReactContext = __webpack_require__(31);
	var ReactCurrentOwner = __webpack_require__(36);

	var assign = __webpack_require__(32);
	var warning = __webpack_require__(34);

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
	        'Don\'t set the %s property of the React element. Instead, ' +
	        'specify the correct value when initially creating the element.',
	        key
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
	    this._store = {props: props, originalProps: assign({}, props)};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    try {
	      Object.defineProperty(this._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true
	      });
	    } catch (x) {
	    }
	    this._store.validated = false;

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
	    key = config.key === undefined ? null : '' + config.key;
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
	  // Legacy hook TODO: Warn if this is accessed
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

	ReactElement.cloneElement = function(element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
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

	  return new ReactElement(
	    element.type,
	    key,
	    ref,
	    owner,
	    element._context,
	    props
	  );
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactContext
	 */

	'use strict';

	var assign = __webpack_require__(32);
	var emptyObject = __webpack_require__(33);
	var warning = __webpack_require__(34);

	var didWarn = false;

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
	  current: emptyObject,

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
	    if ("production" !== process.env.NODE_ENV) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        didWarn,
	        'withContext is deprecated and will be removed in a future version. ' +
	        'Use a wrapper component with getChildContext instead.'
	      ) : null);

	      didWarn = true;
	    }

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

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
	}

	module.exports = assign;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyObject
	 */

	"use strict";

	var emptyObject = {};

	if ("production" !== process.env.NODE_ENV) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(35);

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

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
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
/* 36 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

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


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	'use strict';

	var assign = __webpack_require__(32);
	var emptyFunction = __webpack_require__(35);
	var joinClasses = __webpack_require__(38);

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

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  }

	};

	module.exports = ReactPropTransferer;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
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
/* 39 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = __webpack_require__(41)['default'];

	var React = __webpack_require__(16);

	var ExcelColumn = function ExcelColumn() {
	  _classCallCheck(this, ExcelColumn);
	};

	var ExcelColumnShape = {
	  name: React.PropTypes.string.isRequired,
	  key: React.PropTypes.string.isRequired,
	  width: React.PropTypes.number.isRequired

	};

	module.exports = ExcelColumnShape;

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var Draggable = __webpack_require__(43);
	var cloneWithProps = __webpack_require__(28);
	var PropTypes = React.PropTypes;

	var ResizeHandle = React.createClass({
	  displayName: 'ResizeHandle',

	  style: {
	    position: 'absolute',
	    top: 0,
	    right: 0,
	    width: 6,
	    height: '100%'
	  },

	  render: function render() {
	    return React.createElement(Draggable, _extends({}, this.props, {
	      className: 'react-grid-HeaderCell__resizeHandle',
	      style: this.style
	    }));
	  }
	});

	module.exports = ResizeHandle;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*  need   */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var PropTypes = React.PropTypes;
	var emptyFunction = __webpack_require__(35);

	var Draggable = React.createClass({
	  displayName: 'Draggable',

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
	  },

	  render: function render() {
	    var Component = this.props.component;
	    return React.createElement('div', _extends({}, this.props, {
	      onMouseDown: this.onMouseDown,
	      className: 'react-grid-HeaderCell__draggable' }));
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onDragStart: emptyFunction.thatReturnsTrue,
	      onDragEnd: emptyFunction,
	      onDrag: emptyFunction
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      drag: null
	    };
	  },

	  onMouseDown: function onMouseDown(e) {
	    var drag = this.props.onDragStart(e);

	    if (drag === null && e.button !== 0) {
	      return;
	    }

	    window.addEventListener('mouseup', this.onMouseUp);
	    window.addEventListener('mousemove', this.onMouseMove);

	    this.setState({ drag: drag });
	  },

	  onMouseMove: function onMouseMove(e) {
	    if (this.state.drag === null) {
	      return;
	    }

	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    this.props.onDrag(e);
	  },

	  onMouseUp: function onMouseUp(e) {
	    this.cleanUp();
	    this.props.onDragEnd(e, this.state.drag);
	    this.setState({ drag: null });
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.cleanUp();
	  },

	  cleanUp: function cleanUp() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	  }
	});

	module.exports = Draggable;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var ExcelColumn = __webpack_require__(40);
	var DEFINE_SORT = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	  NONE: 'NONE'
	};

	var SortableHeaderCell = React.createClass({
	  displayName: 'SortableHeaderCell',

	  propTypes: {
	    columnKey: React.PropTypes.string.isRequired,
	    onSort: React.PropTypes.func.isRequired,
	    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE'])
	  },

	  onClick: function onClick() {
	    var direction;
	    switch (this.props.sortDirection) {
	      case null:
	      case undefined:
	      case DEFINE_SORT.NONE:
	        direction = DEFINE_SORT.ASC;
	        break;
	      case DEFINE_SORT.ASC:
	        direction = DEFINE_SORT.DESC;
	        break;
	      case DEFINE_SORT.DESC:
	        direction = DEFINE_SORT.NONE;
	        break;
	    }
	    this.props.onSort(this.props.columnKey, direction);
	  },

	  getSortByText: function getSortByText() {
	    var unicodeKeys = {
	      'ASC': '9650',
	      'DESC': '9660',
	      'NONE': ''
	    };
	    return String.fromCharCode(unicodeKeys[this.props.sortDirection]);
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      {
	        onClick: this.onClick,
	        style: { cursor: 'pointer' } },
	      this.props.column.name,
	      React.createElement(
	        'span',
	        { className: 'pull-right' },
	        this.getSortByText()
	      )
	    );
	  }
	});

	module.exports = SortableHeaderCell;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React = __webpack_require__(16);
	var Canvas = __webpack_require__(46);
	var PropTypes = React.PropTypes;

	var ViewportScroll = __webpack_require__(76);

	var Viewport = React.createClass({
	  displayName: 'Viewport',

	  mixins: [ViewportScroll],

	  propTypes: {
	    rowOffsetHeight: PropTypes.number.isRequired,
	    totalWidth: PropTypes.number.isRequired,
	    columnMetrics: PropTypes.object.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    selectedRows: PropTypes.array,
	    expandedRows: PropTypes.array,
	    rowRenderer: PropTypes.func,
	    rowsCount: PropTypes.number.isRequired,
	    rowHeight: PropTypes.number.isRequired,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    minHeight: PropTypes.number
	  },
	  render: function render() {
	    var style = {
	      padding: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      overflow: 'hidden',
	      position: 'absolute',
	      top: this.props.rowOffsetHeight
	    };
	    return React.createElement(
	      'div',
	      {
	        className: 'react-grid-Viewport',
	        style: style },
	      React.createElement(Canvas, {
	        ref: 'canvas',
	        totalWidth: this.props.totalWidth,
	        width: this.props.columnMetrics.width,
	        rowGetter: this.props.rowGetter,
	        rowsCount: this.props.rowsCount,
	        selectedRows: this.props.selectedRows,
	        expandedRows: this.props.expandedRows,
	        columns: this.props.columnMetrics.columns,
	        rowRenderer: this.props.rowRenderer,
	        visibleStart: this.state.visibleStart,
	        visibleEnd: this.state.visibleEnd,
	        displayStart: this.state.displayStart,
	        displayEnd: this.state.displayEnd,
	        cellMetaData: this.props.cellMetaData,
	        height: this.state.height,
	        rowHeight: this.props.rowHeight,
	        onScroll: this.onScroll,
	        onRows: this.props.onRows
	      })
	    );
	  },

	  getScroll: function getScroll() {
	    return this.refs.canvas.getScroll();
	  },

	  onScroll: function onScroll(scroll) {
	    this.updateScroll(scroll.scrollTop, scroll.scrollLeft, this.state.height, this.props.rowHeight, this.props.rowsCount);

	    if (this.props.onScroll) {
	      this.props.onScroll({ scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft });
	    }
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
	  }
	});

	module.exports = Viewport;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM
	 */
	"use strict";

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var PropTypes = React.PropTypes;
	var cloneWithProps = __webpack_require__(28);
	var shallowEqual = __webpack_require__(26);
	var emptyFunction = __webpack_require__(35);
	var ScrollShim = __webpack_require__(47);
	var Row = __webpack_require__(48);
	var ExcelColumn = __webpack_require__(40);

	var Canvas = React.createClass({
	  displayName: 'Canvas',

	  mixins: [ScrollShim],

	  propTypes: {
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    height: PropTypes.number.isRequired,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    rowsCount: PropTypes.number.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.array.isRequired]),
	    onRows: PropTypes.func,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
	  },

	  render: function render() {
	    var _this = this;

	    var displayStart = this.state.displayStart;
	    var displayEnd = this.state.displayEnd;
	    var rowHeight = this.props.rowHeight;
	    var length = this.props.rowsCount;

	    var rows = this.getRows(displayStart, displayEnd).map(function (row, idx) {
	      return _this.renderRow({
	        key: displayStart + idx,
	        ref: idx,
	        idx: displayStart + idx,
	        row: row,
	        height: rowHeight,
	        columns: _this.props.columns,
	        isSelected: _this.isRowSelected(displayStart + idx),
	        expandedRows: _this.props.expandedRows,
	        cellMetaData: _this.props.cellMetaData
	      });
	    });

	    this._currentRowsLength = rows.length;

	    if (displayStart > 0) {
	      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
	    }

	    if (length - displayEnd > 0) {
	      rows.push(this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
	    }

	    var style = {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      overflowX: 'auto',
	      overflowY: 'scroll',
	      width: this.props.totalWidth + this.state.scrollbarWidth,
	      height: this.props.height,
	      transform: 'translate3d(0, 0, 0)'
	    };

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        onScroll: this.onScroll,
	        className: joinClasses("react-grid-Canvas", this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) },
	      React.createElement(
	        'div',
	        { style: { width: this.props.width, overflow: 'hidden' } },
	        rows
	      )
	    );
	  },

	  renderRow: function renderRow(props) {
	    var RowsRenderer = this.props.rowRenderer;
	    if (typeof RowsRenderer === 'function') {
	      return React.createElement(RowsRenderer, props);
	    } else if (React.isValidElement(this.props.rowRenderer)) {
	      return cloneWithProps(this.props.rowRenderer, props);
	    }
	  },

	  renderPlaceholder: function renderPlaceholder(key, height) {
	    return React.createElement(
	      'div',
	      { key: key, style: { height: height } },
	      this.props.columns.map(function (column, idx) {
	        return React.createElement('div', { style: { width: column.width }, key: idx });
	      })
	    );
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowRenderer: Row,
	      onRows: emptyFunction
	    };
	  },

	  isRowSelected: function isRowSelected(rowIdx) {
	    return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;
	  },

	  _currentRowsLength: 0,
	  _currentRowsRange: { start: 0, end: 0 },
	  _scroll: { scrollTop: 0, scrollLeft: 0 },

	  getInitialState: function getInitialState() {
	    return {
	      shouldUpdate: true,
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd,
	      scrollbarWidth: 0
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },

	  componentDidMount: function componentDidMount() {
	    this.onRows();
	  },

	  componentDidUpdate: function componentDidUpdate(nextProps) {
	    if (this._scroll !== { start: 0, end: 0 }) {
	      this.setScrollLeft(this._scroll.scrollLeft);
	    }
	    this.onRows();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.rowsCount > this.props.rowsCount) {
	      React.findDOMNode(this).scrollTop = nextProps.rowsCount * this.props.rowHeight;
	    }
	    var scrollbarWidth = this.getScrollbarWidth();
	    var shouldUpdate = !(nextProps.visibleStart > this.state.displayStart && nextProps.visibleEnd < this.state.displayEnd) || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !shallowEqual(nextProps.style, this.props.style);

	    if (shouldUpdate) {
	      this.setState({
	        shouldUpdate: true,
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd,
	        scrollbarWidth: scrollbarWidth
	      });
	    } else {
	      this.setState({ shouldUpdate: false, scrollbarWidth: scrollbarWidth });
	    }
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !nextState || nextState.shouldUpdate;
	  },

	  onRows: function onRows() {
	    if (this._currentRowsRange !== { start: 0, end: 0 }) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = { start: 0, end: 0 };
	    }
	  },

	  getRows: function getRows(displayStart, displayEnd) {
	    this._currentRowsRange = { start: displayStart, end: displayEnd };
	    if (Array.isArray(this.props.rowGetter)) {
	      return this.props.rowGetter.slice(displayStart, displayEnd);
	    } else {
	      var rows = [];
	      for (var i = displayStart; i < displayEnd; i++) {
	        rows.push(this.props.rowGetter(i));
	      }
	      return rows;
	    }
	  },

	  getScrollbarWidth: function getScrollbarWidth() {
	    var scrollbarWidth = 0;
	    // Get the scrollbar width
	    var canvas = this.getDOMNode();
	    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
	    return scrollbarWidth;
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    if (this._currentRowsLength !== 0) {
	      if (!this.refs) return;
	      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
	        if (this.refs[i] && this.refs[i].setScrollLeft) {
	          this.refs[i].setScrollLeft(scrollLeft);
	        }
	      }
	    }
	  },

	  getScroll: function getScroll() {
	    var _React$findDOMNode = React.findDOMNode(this);

	    var scrollTop = _React$findDOMNode.scrollTop;
	    var scrollLeft = _React$findDOMNode.scrollLeft;

	    return { scrollTop: scrollTop, scrollLeft: scrollLeft };
	  },

	  onScroll: function onScroll(e) {
	    this.appendScrollShim();
	    var _e$target = e.target;
	    var scrollTop = _e$target.scrollTop;
	    var scrollLeft = _e$target.scrollLeft;

	    var scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	  }
	});

	module.exports = Canvas;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO mixin not compatible and HTMLElement classList */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React = __webpack_require__(16);

	var ScrollShim = {

	  appendScrollShim: function appendScrollShim() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      if (shim.classList) {
	        shim.classList.add('react-grid-ScrollShim'); //flow - not compatible with HTMLElement
	      } else {
	          shim.className += ' react-grid-ScrollShim';
	        }
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = size.width + 'px';
	      shim.style.height = size.height + 'px';
	      React.findDOMNode(this).appendChild(shim);
	      this._scrollShim = shim;
	    }
	    this._scheduleRemoveScrollShim();
	  },

	  _scrollShimSize: function _scrollShimSize() {
	    return {
	      width: this.props.width,
	      height: this.props.length * this.props.rowHeight
	    };
	  },

	  _scheduleRemoveScrollShim: function _scheduleRemoveScrollShim() {
	    if (this._scheduleRemoveScrollShimTimer) {
	      clearTimeout(this._scheduleRemoveScrollShimTimer);
	    }
	    this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim, 200);
	  },

	  _removeScrollShim: function _removeScrollShim() {
	    if (this._scrollShim) {
	      this._scrollShim.parentNode.removeChild(this._scrollShim);
	      this._scrollShim = undefined;
	    }
	  }
	};

	module.exports = ScrollShim;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var Cell = __webpack_require__(49);
	var ColumnMetrics = __webpack_require__(21);
	var ColumnUtilsMixin = __webpack_require__(23);

	var Row = React.createClass({
	  displayName: 'Row',

	  propTypes: {
	    height: React.PropTypes.number.isRequired,
	    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
	    row: React.PropTypes.object.isRequired,
	    cellRenderer: React.PropTypes.func,
	    isSelected: React.PropTypes.bool,
	    idx: React.PropTypes.number.isRequired,
	    expandedRows: React.PropTypes.arrayOf(React.PropTypes.object)
	  },

	  mixins: [ColumnUtilsMixin],

	  render: function render() {
	    var className = joinClasses('react-grid-Row', "react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}");

	    var style = {
	      height: this.getRowHeight(this.props),
	      overflow: 'hidden'
	    };

	    var cells = this.getCells();
	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: className, style: style, onDragEnter: this.handleDragEnter }),
	      React.isValidElement(this.props.row) ? this.props.row : cells
	    );
	  },

	  getCells: function getCells() {
	    var _this = this;

	    var cells = [];
	    var lockedCells = [];
	    var selectedColumn = this.getSelectedColumn();

	    this.props.columns.forEach(function (column, i) {

	      var CellRenderer = _this.props.cellRenderer;
	      var cell = React.createElement(CellRenderer, {
	        ref: i,
	        key: i,
	        idx: i,
	        rowIdx: _this.props.idx,
	        value: _this.getCellValue(column.key || i),
	        column: column,
	        height: _this.getRowHeight(),
	        formatter: column.formatter,
	        cellMetaData: _this.props.cellMetaData,
	        rowData: _this.props.row,
	        selectedColumn: selectedColumn,
	        isRowSelected: _this.props.isSelected });
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    });

	    return cells.concat(lockedCells);
	  },

	  getRowHeight: function getRowHeight() {
	    var rows = this.props.expandedRows || null;
	    if (rows && this.props.key) {
	      var row = rows[this.props.key] || null;
	      if (row) {
	        return row.height;
	      }
	    }
	    return this.props.height;
	  },

	  getCellValue: function getCellValue(key) {
	    var val;
	    if (key === 'select-row') {
	      return this.props.isSelected;
	    } else if (typeof this.props.row.get === 'function') {
	      val = this.props.row.get(key);
	    } else {
	      val = this.props.row[key];
	    }
	    return val;
	  },

	  renderCell: function renderCell(props) {
	    if (typeof this.props.cellRenderer == 'function') {
	      this.props.cellRenderer.call(this, props);
	    }
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return cloneWithProps(this.props.cellRenderer, props);
	    } else {
	      return this.props.cellRenderer(props);
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      cellRenderer: Cell,
	      isSelected: false,
	      height: 35
	    };
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var _this2 = this;

	    this.props.columns.forEach(function (column, i) {
	      if (column.locked) {
	        if (!_this2.refs[i]) return;
	        _this2.refs[i].setScrollLeft(scrollLeft);
	      }
	    });
	  },

	  doesRowContainSelectedCell: function doesRowContainSelectedCell(props) {
	    var selected = props.cellMetaData.selected;
	    if (selected && selected.rowIdx === props.idx) {
	      return true;
	    } else {
	      return false;
	    }
	  },

	  willRowBeDraggedOver: function willRowBeDraggedOver(props) {
	    var dragged = props.cellMetaData.dragged;
	    return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
	  },

	  hasRowBeenCopied: function hasRowBeenCopied() {
	    var copied = this.props.cellMetaData.copied;
	    return copied != null && copied.rowIdx === this.props.idx;
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height;
	  },

	  handleDragEnter: function handleDragEnter() {
	    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
	    if (handleDragEnterRow) {
	      handleDragEnterRow(this.props.idx);
	    }
	  },

	  getSelectedColumn: function getSelectedColumn() {
	    var selected = this.props.cellMetaData.selected;
	    if (selected && selected.idx) {
	      return this.getColumn(this.props.columns, selected.idx);
	    }
	  }

	});

	module.exports = Row;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var _extends = __webpack_require__(2)['default'];

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var cloneWithProps = __webpack_require__(28);
	var EditorContainer = __webpack_require__(50);
	var ExcelColumn = __webpack_require__(40);
	var isFunction = __webpack_require__(74);
	var CellMetaDataShape = __webpack_require__(75);

	var Cell = React.createClass({
	  displayName: 'Cell',

	  propTypes: {
	    rowIdx: React.PropTypes.number.isRequired,
	    idx: React.PropTypes.number.isRequired,
	    selected: React.PropTypes.shape({
	      idx: React.PropTypes.number.isRequired
	    }),
	    tabIndex: React.PropTypes.number,
	    ref: React.PropTypes.string,
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    isExpanded: React.PropTypes.bool,
	    cellMetaData: React.PropTypes.shape(CellMetaDataShape).isRequired,
	    handleDragStart: React.PropTypes.func,
	    className: React.PropTypes.string,
	    rowData: React.PropTypes.object.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      tabIndex: -1,
	      ref: "cell",
	      isExpanded: false
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { isRowChanging: false, isCellValueChanging: false };
	  },

	  componentDidMount: function componentDidMount() {
	    this.checkFocus();
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    this.checkFocus();
	    var dragged = this.props.cellMetaData.dragged;
	    if (dragged && dragged.complete === true) {
	      this.props.cellMetaData.handleTerminateDrag();
	    }
	    if (this.state.isRowChanging && this.props.selectedColumn != null) {
	      this.applyUpdateClass();
	    }
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({ isRowChanging: this.props.rowData !== nextProps.rowData, isCellValueChanging: this.props.value !== nextProps.value });
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.rowData !== nextProps.rowData || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected();
	  },

	  getStyle: function getStyle() {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left
	    };
	    return style;
	  },

	  render: function render() {
	    var style = this.getStyle();

	    var className = this.getCellClass();

	    var cellContent = this.renderCellContent({
	      value: this.props.value,
	      column: this.props.column,
	      rowIdx: this.props.rowIdx,
	      isExpanded: this.props.isExpanded
	    });

	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: className, style: style, onClick: this.onCellClick, onDoubleClick: this.onCellDoubleClick }),
	      cellContent,
	      React.createElement('div', { className: 'drag-handle', draggable: 'true' })
	    );
	  },

	  renderCellContent: function renderCellContent(props) {
	    var CellContent;
	    var Formatter = this.getFormatter();
	    if (React.isValidElement(Formatter)) {
	      props.dependentValues = this.getFormatterDependencies();
	      CellContent = cloneWithProps(Formatter, props);
	    } else if (isFunction(Formatter)) {
	      CellContent = React.createElement(Formatter, { value: this.props.value, dependentValues: this.getFormatterDependencies() });
	    } else {
	      CellContent = React.createElement(SimpleCellFormatter, { value: this.props.value });
	    }
	    return React.createElement(
	      'div',
	      { ref: 'cell',
	        className: 'react-grid-Cell__value' },
	      CellContent,
	      ' ',
	      this.props.cellControls
	    );
	  },

	  isColumnSelected: function isColumnSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null || meta.selected == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.idx === this.props.idx;
	  },

	  isSelected: function isSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null || meta.selected == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;
	  },

	  isActive: function isActive() {
	    var meta = this.props.cellMetaData;
	    if (meta == null || meta.selected == null) {
	      return false;
	    }
	    return this.isSelected() && meta.selected.active === true;
	  },

	  isCellSelectionChanging: function isCellSelectionChanging(nextProps) {
	    var meta = this.props.cellMetaData;
	    if (meta == null || meta.selected == null) {
	      return false;
	    }
	    var nextSelected = nextProps.cellMetaData.selected;
	    if (meta.selected && nextSelected) {
	      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
	    } else {
	      return true;
	    }
	  },

	  getFormatter: function getFormatter() {
	    var col = this.props.column;
	    if (this.isActive()) {
	      return React.createElement(EditorContainer, { rowData: this.getRowData(), rowIdx: this.props.rowIdx, idx: this.props.idx, cellMetaData: this.props.cellMetaData, column: col, height: this.props.height });
	    } else {
	      return this.props.column.formatter;
	    }
	  },

	  getRowData: function getRowData() {
	    return this.props.rowData.toJSON ? this.props.rowData.toJSON() : this.props.rowData;
	  },

	  getFormatterDependencies: function getFormatterDependencies() {
	    //clone row data so editor cannot actually change this
	    var columnName = this.props.column.ItemId;
	    //convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
	    }
	  },

	  onCellClick: function onCellClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellClick != null) {
	      meta.onCellClick({ rowIdx: this.props.rowIdx, idx: this.props.idx });
	    }
	  },

	  onCellDoubleClick: function onCellDoubleClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellDoubleClick != null) {
	      meta.onCellDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx });
	    }
	  },

	  checkFocus: function checkFocus() {
	    if (this.isSelected() && !this.isActive()) {
	      React.findDOMNode(this).focus();
	    }
	  },

	  getCellClass: function getCellClass() {
	    var className = joinClasses(this.props.column.cellClass, 'react-grid-Cell', this.props.className, this.props.column.locked ? 'react-grid-Cell--locked' : null);
	    var extraClasses = joinClasses({
	      'selected': this.isSelected() && !this.isActive(),
	      'editing': this.isActive(),
	      'copied': this.isCopied(),
	      'active-drag-cell': this.isSelected() || this.isDraggedOver(),
	      'is-dragged-over-up': this.isDraggedOverUpwards(),
	      'is-dragged-over-down': this.isDraggedOverDownwards(),
	      'was-dragged-over': this.wasDraggedOver()
	    });
	    return joinClasses(className, extraClasses);
	  },

	  getUpdateCellClass: function getUpdateCellClass() {
	    return this.props.column.getUpdateCellClass ? this.props.column.getUpdateCellClass(this.props.selectedColumn, this.props.column, this.state.isCellValueChanging) : '';
	  },

	  applyUpdateClass: function applyUpdateClass() {
	    var updateCellClass = this.getUpdateCellClass();
	    // -> removing the class
	    if (updateCellClass != null && updateCellClass != "") {
	      var cellDOMNode = this.getDOMNode();
	      if (cellDOMNode.classList) {
	        cellDOMNode.classList.remove(updateCellClass);
	        // -> and re-adding the class
	        cellDOMNode.classList.add(updateCellClass);
	      } else if (cellDOMNode.className.indexOf(updateCellClass) === -1) {
	        // IE9 doesn't support classList, nor (I think) altering element.className
	        // without replacing it wholesale.
	        cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;
	      }
	    }
	  },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var ctrl = this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
	    if (ctrl.isMounted()) {
	      var node = React.findDOMNode(this);
	      var transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	      node.style.webkitTransform = transform;
	      node.style.transform = transform;
	    }
	  },

	  isCopied: function isCopied() {
	    var copied = this.props.cellMetaData.copied;
	    return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;
	  },

	  isDraggedOver: function isDraggedOver() {
	    var dragged = this.props.cellMetaData.dragged;
	    return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;
	  },

	  wasDraggedOver: function wasDraggedOver() {
	    var dragged = this.props.cellMetaData.dragged;
	    return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;
	  },

	  isDraggedCellChanging: function isDraggedCellChanging(nextProps) {
	    var isChanging;
	    var dragged = this.props.cellMetaData.dragged;
	    var nextDragged = nextProps.cellMetaData.dragged;
	    if (dragged) {
	      isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;
	      return isChanging;
	    } else {
	      return false;
	    }
	  },

	  isCopyCellChanging: function isCopyCellChanging(nextProps) {
	    var isChanging;
	    var copied = this.props.cellMetaData.copied;
	    var nextCopied = nextProps.cellMetaData.copied;
	    if (copied) {
	      isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;
	      return isChanging;
	    } else {
	      return false;
	    }
	  },

	  isDraggedOverUpwards: function isDraggedOverUpwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
	  },

	  isDraggedOverDownwards: function isDraggedOverDownwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
	  }

	});

	var SimpleCellFormatter = React.createClass({
	  displayName: 'SimpleCellFormatter',

	  propTypes: {
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
	  },

	  render: function render() {
	    return React.createElement(
	      'span',
	      null,
	      this.props.value
	    );
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.value !== this.props.value;
	  }

	});

	module.exports = Cell;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	* @jsx React.DOM


	*/
	'use strict';

	var React = __webpack_require__(16);
	var joinClasses = __webpack_require__(19);
	var keyboardHandlerMixin = __webpack_require__(51);
	var SimpleTextEditor = __webpack_require__(52);
	var isFunction = __webpack_require__(74);
	var cloneWithProps = __webpack_require__(28);

	var EditorContainer = React.createClass({
	  displayName: 'EditorContainer',

	  mixins: [keyboardHandlerMixin],

	  propTypes: {
	    rowData: React.PropTypes.object.isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    cellMetaData: React.PropTypes.shape({
	      selected: React.PropTypes.object.isRequired,
	      copied: React.PropTypes.object,
	      dragged: React.PropTypes.object,
	      onCellClick: React.PropTypes.func,
	      onCellDoubleClick: React.PropTypes.func
	    }).isRequired,
	    column: React.PropTypes.object.isRequired,
	    height: React.PropTypes.number.isRequired
	  },

	  changeCommitted: false,

	  getInitialState: function getInitialState() {
	    return { isInvalid: false };
	  },

	  componentDidMount: function componentDidMount() {
	    var inputNode = this.getInputNode();
	    if (inputNode !== undefined) {
	      this.setTextInputFocus();
	      if (!this.getEditor().disableContainerStyles) {
	        inputNode.className += ' editor-main';
	        inputNode.style.height = this.props.height - 1 + 'px';
	      }
	    }
	  },

	  createEditor: function createEditor() {
	    var _this = this;

	    var editorRef = function editorRef(c) {
	      return _this.editor = c;
	    };
	    var editorProps = {
	      ref: editorRef,
	      column: this.props.column,
	      value: this.getInitialValue(),
	      onCommit: this.commit,
	      rowMetaData: this.getRowMetaData(),
	      height: this.props.height,
	      onBlur: this.commit,
	      onOverrideKeyDown: this.onKeyDown
	    };
	    var customEditor = this.props.column.editor;
	    if (customEditor && React.isValidElement(customEditor)) {
	      //return custom column editor or SimpleEditor if none specified
	      return cloneWithProps(customEditor, editorProps);
	    } else {
	      return React.createElement(SimpleTextEditor, { ref: editorRef, column: this.props.column, value: this.getInitialValue(), onBlur: this.commit, rowMetaData: this.getRowMetaData() });
	    }
	  },

	  getRowMetaData: function getRowMetaData() {
	    //clone row data so editor cannot actually change this
	    var columnName = this.props.column.ItemId;
	    //convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
	    }
	  },

	  onPressEnter: function onPressEnter(e) {
	    this.commit({ key: 'Enter' });
	  },

	  onPressTab: function onPressTab(e) {
	    this.commit({ key: 'Tab' });
	  },

	  onPressEscape: function onPressEscape(e) {
	    if (!this.editorIsSelectOpen()) {
	      this.props.cellMetaData.onCommitCancel();
	    } else {
	      // prevent event from bubbling if editor has results to select
	      e.stopPropagation();
	    }
	  },

	  onPressArrowDown: function onPressArrowDown(e) {
	    if (this.editorHasResults()) {
	      //dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },

	  onPressArrowUp: function onPressArrowUp(e) {
	    if (this.editorHasResults()) {
	      //dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },

	  onPressArrowLeft: function onPressArrowLeft(e) {
	    //prevent event propogation. this disables left cell navigation
	    if (!this.isCaretAtBeginningOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },

	  onPressArrowRight: function onPressArrowRight(e) {
	    //prevent event propogation. this disables right cell navigation
	    if (!this.isCaretAtEndOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },

	  editorHasResults: function editorHasResults() {
	    if (isFunction(this.getEditor().hasResults)) {
	      return this.getEditor().hasResults();
	    } else {
	      return false;
	    }
	  },

	  editorIsSelectOpen: function editorIsSelectOpen() {
	    if (isFunction(this.getEditor().isSelectOpen)) {
	      return this.getEditor().isSelectOpen();
	    } else {
	      return false;
	    }
	  },

	  getEditor: function getEditor() {
	    return this.editor;
	  },

	  commit: function commit(args) {
	    var opts = args || {};
	    var updated = this.getEditor().getValue();
	    if (this.isNewValueValid(updated)) {
	      var cellKey = this.props.column.key;
	      this.props.cellMetaData.onCommit({ cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key });
	    }
	    this.changeCommitted = true;
	  },

	  isNewValueValid: function isNewValueValid(value) {
	    if (isFunction(this.getEditor().validate)) {
	      var isValid = this.getEditor().validate(value);
	      this.setState({ isInvalid: !isValid });
	      return isValid;
	    } else {
	      return true;
	    }
	  },

	  getInputNode: function getInputNode() {
	    return this.getEditor().getInputNode();
	  },

	  getInitialValue: function getInitialValue() {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    if (keyCode === 'Delete' || keyCode === 'Backspace') {
	      return '';
	    } else if (keyCode === 'Enter') {
	      return this.props.value;
	    } else {
	      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	      return text;
	    }
	  },

	  getContainerClass: function getContainerClass() {
	    return joinClasses({
	      'has-error': this.state.isInvalid === true
	    });
	  },

	  renderStatusIcon: function renderStatusIcon() {
	    if (this.state.isInvalid === true) {
	      return React.createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback' });
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.getContainerClass(), onKeyDown: this.onKeyDown },
	      this.createEditor(),
	      this.renderStatusIcon()
	    );
	  },

	  setCaretAtEndOfInput: function setCaretAtEndOfInput() {
	    var input = this.getInputNode();
	    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if (input.setSelectionRange) {
	      input.setSelectionRange(txtLength, txtLength);
	    } else if (input.createTextRange) {
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txtLength);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  },

	  isCaretAtBeginningOfInput: function isCaretAtBeginningOfInput() {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;
	  },

	  isCaretAtEndOfInput: function isCaretAtEndOfInput() {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.value.length;
	  },

	  setTextInputFocus: function setTextInputFocus() {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    var inputNode = this.getInputNode();
	    inputNode.focus();
	    if (inputNode.tagName === "INPUT") {
	      if (!this.isKeyPrintable(keyCode)) {
	        inputNode.focus();
	        inputNode.select();
	      } else {
	        inputNode.select();
	      }
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.changeCommitted && !this.hasEscapeBeenPressed()) {
	      this.commit({ key: 'Enter' });
	    }
	  },

	  hasEscapeBeenPressed: function hasEscapeBeenPressed() {
	    var pressed = false;
	    var escapeKey = 27;
	    if (window.event) {
	      if (window.event.keyCode === escapeKey) {
	        pressed = true;
	      } else if (window.event.which === escapeKey) {
	        pressed = true;
	      }
	    }
	    return pressed;
	  }
	});

	module.exports = EditorContainer;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO: mixins */
	/**
	 * @jsx React.DOM


	 */

	'use strict';

	var React = __webpack_require__(16);
	var KeyboardHandlerMixin = {

	  onKeyDown: function onKeyDown(e) {
	    if (this.isCtrlKeyHeldDown(e)) {
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    } else if (this.isKeyExplicitlyHandled(e.key)) {
	      //break up individual keyPress events to have their own specific callbacks
	      //this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    } else if (this.isKeyPrintable(e.keyCode)) {
	      this.checkAndCall('onPressChar', e);
	    }
	  },

	  //taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable: function isKeyPrintable(keycode) {
	    var valid = keycode > 47 && keycode < 58 || // number keys
	    keycode == 32 || keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
	    keycode > 64 && keycode < 91 || // letter keys
	    keycode > 95 && keycode < 112 || // numpad keys
	    keycode > 185 && keycode < 193 || // ;=,-./` (in order)
	    keycode > 218 && keycode < 223; // [\]' (in order)

	    return valid;
	  },

	  isKeyExplicitlyHandled: function isKeyExplicitlyHandled(key) {
	    return typeof this['onPress' + key] === 'function';
	  },

	  isCtrlKeyHeldDown: function isCtrlKeyHeldDown(e) {
	    return e.ctrlKey === true && e.key !== "Control";
	  },

	  checkAndCall: function checkAndCall(methodName, args) {
	    if (typeof this[methodName] === 'function') {
	      this[methodName](args);
	    }
	  }
	};

	module.exports = KeyboardHandlerMixin;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var _get = __webpack_require__(53)['default'];

	var _inherits = __webpack_require__(59)['default'];

	var _createClass = __webpack_require__(70)['default'];

	var _classCallCheck = __webpack_require__(41)['default'];

	var React = __webpack_require__(16);
	var keyboardHandlerMixin = __webpack_require__(51);
	var ExcelColumn = __webpack_require__(40);
	var EditorBase = __webpack_require__(73);

	var SimpleTextEditor = (function (_EditorBase) {
	  _inherits(SimpleTextEditor, _EditorBase);

	  function SimpleTextEditor() {
	    _classCallCheck(this, SimpleTextEditor);

	    _get(Object.getPrototypeOf(SimpleTextEditor.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(SimpleTextEditor, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement('input', { ref: 'input', type: 'text', onBlur: this.props.onBlur, className: 'form-control', defaultValue: this.props.value });
	    }
	  }]);

	  return SimpleTextEditor;
	})(EditorBase);

	;

	module.exports = SimpleTextEditor;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(54)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(10);
	__webpack_require__(56);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(57);

	__webpack_require__(58)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(13)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(6)
	    , fn   = (__webpack_require__(8).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(15)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(60)["default"];

	var _Object$setPrototypeOf = __webpack_require__(62)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(10);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	module.exports = __webpack_require__(8).Object.setPrototypeOf;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(6);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(65).set});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(10).getDesc
	  , isObject = __webpack_require__(66)
	  , anObject = __webpack_require__(67);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(68)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(66);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(69);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(71)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(10);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var _get = __webpack_require__(53)['default'];

	var _inherits = __webpack_require__(59)['default'];

	var _createClass = __webpack_require__(70)['default'];

	var _classCallCheck = __webpack_require__(41)['default'];

	var React = __webpack_require__(16);
	var keyboardHandlerMixin = __webpack_require__(51);
	var ExcelColumn = __webpack_require__(40);

	var EditorBase = (function (_React$Component) {
	  _inherits(EditorBase, _React$Component);

	  function EditorBase() {
	    _classCallCheck(this, EditorBase);

	    _get(Object.getPrototypeOf(EditorBase.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(EditorBase, [{
	    key: 'getStyle',
	    value: function getStyle() {
	      return {
	        width: '100%'
	      };
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      var updated = {};
	      updated[this.props.column.key] = this.getInputNode().value;
	      return updated;
	    }
	  }, {
	    key: 'getInputNode',
	    value: function getInputNode() {
	      var domNode = React.findDOMNode(this);
	      if (domNode.tagName === 'INPUT') {
	        return domNode;
	      } else {
	        return domNode.querySelector("input:not([type=hidden])");
	      }
	    }
	  }, {
	    key: 'inheritContainerStyles',
	    value: function inheritContainerStyles() {
	      return true;
	    }
	  }]);

	  return EditorBase;
	})(React.Component);

	EditorBase.propTypes = {
	  onKeyDown: React.PropTypes.func.isRequired,
	  value: React.PropTypes.any.isRequired,
	  onBlur: React.PropTypes.func.isRequired,
	  column: React.PropTypes.shape(ExcelColumn).isRequired,
	  commit: React.PropTypes.func.isRequired
	};

	module.exports = EditorBase;

/***/ },
/* 74 */
/***/ function(module, exports) {

	
	"use strict";

	var isFunction = function isFunction(functionToCheck) {
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	module.exports = isFunction;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(16).PropTypes;

	module.exports = {
	  selected: PropTypes.object.isRequired,
	  copied: PropTypes.object,
	  dragged: PropTypes.object,
	  onCellClick: PropTypes.func.isRequired
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO mixins */

	'use strict';

	var React = __webpack_require__(16);
	var DOMMetrics = __webpack_require__(77);
	var getWindowSize = __webpack_require__(78);

	var PropTypes = React.PropTypes;
	var min = Math.min;
	var max = Math.max;
	var floor = Math.floor;
	var ceil = Math.ceil;

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight: function viewportHeight() {
	      return React.findDOMNode(this).offsetHeight;
	    }
	  },

	  propTypes: {
	    rowHeight: React.PropTypes.number,
	    rowsCount: React.PropTypes.number.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 30
	    };
	  },

	  getInitialState: function getInitialState() {
	    return this.getGridState(this.props);
	  },

	  getGridState: function getGridState(props) {
	    var renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
	    var totalRowCount = min(renderedRowsCount * 2, props.rowsCount);
	    return {
	      displayStart: 0,
	      displayEnd: totalRowCount,
	      height: props.minHeight,
	      scrollTop: 0,
	      scrollLeft: 0
	    };
	  },

	  updateScroll: function updateScroll(scrollTop, scrollLeft, height, rowHeight, length) {
	    var renderedRowsCount = ceil(height / rowHeight);

	    var visibleStart = floor(scrollTop / rowHeight);

	    var visibleEnd = min(visibleStart + renderedRowsCount, length);

	    var displayStart = max(0, visibleStart - renderedRowsCount * 2);

	    var displayEnd = min(visibleStart + renderedRowsCount * 2, length);

	    var nextScrollState = {
	      visibleStart: visibleStart,
	      visibleEnd: visibleEnd,
	      displayStart: displayStart,
	      displayEnd: displayEnd,
	      height: height,
	      scrollTop: scrollTop,
	      scrollLeft: scrollLeft
	    };

	    this.setState(nextScrollState);
	  },

	  metricsUpdated: function metricsUpdated() {
	    var height = this.DOMMetrics.viewportHeight();
	    if (height) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, height, this.props.rowHeight, this.props.rowsCount);
	    }
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.rowHeight !== nextProps.rowHeight) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.rowsCount !== nextProps.rowsCount) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height, nextProps.rowHeight, nextProps.rowsCount);
	    }
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO mixin and invarient splat */
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React = __webpack_require__(16);
	var emptyFunction = __webpack_require__(35);
	var shallowCloneObject = __webpack_require__(20);

	var contextTypes = {
	  metricsComputator: React.PropTypes.object
	};

	var MetricsComputatorMixin = {

	  childContextTypes: contextTypes,

	  getChildContext: function getChildContext() {
	    return { metricsComputator: this };
	  },

	  getMetricImpl: function getMetricImpl(name) {
	    return this._DOMMetrics.metrics[name].value;
	  },

	  registerMetricsImpl: function registerMetricsImpl(component, metrics) {
	    var getters = {};
	    var s = this._DOMMetrics;

	    for (var name in metrics) {
	      if (s.metrics[name] !== undefined) {
	        throw new Error('DOM metric ' + name + ' is already defined');
	      }
	      s.metrics[name] = { component: component, computator: metrics[name].bind(component) };
	      getters[name] = this.getMetricImpl.bind(null, name);
	    }

	    if (s.components.indexOf(component) === -1) {
	      s.components.push(component);
	    }

	    return getters;
	  },

	  unregisterMetricsFor: function unregisterMetricsFor(component) {
	    var s = this._DOMMetrics;
	    var idx = s.components.indexOf(component);

	    if (idx > -1) {
	      s.components.splice(idx, 1);

	      var name;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        delete s.metrics[name];
	      }
	    }
	  },

	  updateMetrics: function updateMetrics() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
	      var newMetric = s.metrics[name].computator();
	      if (newMetric !== s.metrics[name].value) {
	        needUpdate = true;
	      }
	      s.metrics[name].value = newMetric;
	    }

	    if (needUpdate) {
	      for (var i = 0, len = s.components.length; i < len; i++) {
	        if (s.components[i].metricsUpdated) {
	          s.components[i].metricsUpdated();
	        }
	      }
	    }
	  },

	  componentWillMount: function componentWillMount() {
	    this._DOMMetrics = {
	      metrics: {},
	      components: []
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (window.addEventListener) {
	      window.addEventListener('resize', this.updateMetrics);
	    } else {
	      window.attachEvent('resize', this.updateMetrics);
	    }
	    this.updateMetrics();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this.updateMetrics);
	  }

	};

	var MetricsMixin = {

	  contextTypes: contextTypes,

	  componentWillMount: function componentWillMount() {
	    if (this.DOMMetrics) {
	      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

	      this.DOMMetrics = {};
	      for (var name in this._DOMMetricsDefs) {
	        this.DOMMetrics[name] = emptyFunction;
	      }
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.DOMMetrics) {
	      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.registerMetricsImpl) {
	      return this.context.metricsComputator.unregisterMetricsFor(this);
	    }
	    if (this.hasOwnProperty('DOMMetrics')) {
	      delete this.DOMMetrics;
	    }
	  },

	  registerMetrics: function registerMetrics(metrics) {
	    if (this.registerMetricsImpl) {
	      return this.registerMetricsImpl(this, metrics);
	    } else {
	      return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	    }
	  },

	  getMetric: function getMetric(name) {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    } else {
	      return this.context.metricsComputator.getMetricImpl(name);
	    }
	  }
	};

	module.exports = {
	  MetricsComputatorMixin: MetricsComputatorMixin,
	  MetricsMixin: MetricsMixin
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	
	/**
	 * @jsx React.DOM



	 */
	'use strict';

	/**
	 * Return window's height and width
	 *
	 * @return {Object} height and width of the window
	 */
	function getWindowSize() {
	    var width = window.innerWidth;
	    var height = window.innerHeight;

	    if (!width || !height) {
	        width = document.documentElement.clientWidth;
	        height = document.documentElement.clientHeight;
	    }

	    if (!width || !height) {
	        width = document.body.clientWidth;
	        height = document.body.clientHeight;
	    }

	    return { width: width, height: height };
	}

	module.exports = getWindowSize;

/***/ },
/* 79 */
/***/ function(module, exports) {

	/* TODO mixins */
	"use strict";

	module.exports = {

	  componentDidMount: function componentDidMount() {
	    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
	    this._onScroll();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._onScroll();
	  },

	  componentWillMount: function componentWillMount() {
	    this._scrollLeft = undefined;
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._scrollLeft = undefined;
	  },

	  onScroll: function onScroll(props) {
	    if (this._scrollLeft !== props.scrollLeft) {
	      this._scrollLeft = props.scrollLeft;
	      this._onScroll();
	    }
	  },

	  _onScroll: function _onScroll() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      this.refs.viewport.setScrollLeft(this._scrollLeft);
	    }
	  }
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM
	 */
	'use strict';

	var React = __webpack_require__(16);

	var CheckboxEditor = React.createClass({
	  displayName: 'CheckboxEditor',

	  PropTypes: {
	    value: React.PropTypes.bool.isRequired,
	    rowIdx: React.PropTypes.number.isRequired,
	    column: React.PropTypes.shape({
	      key: React.PropTypes.string.isRequired,
	      onCellChange: React.PropTypes.func.isRequired
	    }).isRequired
	  },

	  render: function render() {
	    var checked = this.props.value != null ? this.props.value : false;
	    return React.createElement('input', { className: 'react-grid-CheckBox', type: 'checkbox', checked: checked, onClick: this.handleChange });
	  },

	  handleChange: function handleChange(e) {
	    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, e);
	  }
	});

	module.exports = CheckboxEditor;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var React = __webpack_require__(16);
	var ExcelColumn = __webpack_require__(40);

	var FilterableHeaderCell = React.createClass({
	  displayName: 'FilterableHeaderCell',

	  propTypes: {
	    onChange: React.PropTypes.func.isRequired,
	    column: React.PropTypes.shape(ExcelColumn).isRequired
	  },

	  getInitialState: function getInitialState() {
	    return { filterTerm: '' };
	  },

	  handleChange: function handleChange(e) {
	    var val = e.target.value;
	    this.setState({ filterTerm: val });
	    this.props.onChange({ filterTerm: val, columnKey: this.props.column.key });
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'form-group' },
	        this.renderInput()
	      )
	    );
	  },

	  renderInput: function renderInput() {
	    if (this.props.column.filterable === false) {
	      return React.createElement('span', null);
	    } else {
	      var input_key = 'header-filter-' + this.props.column.key;
	      return React.createElement('input', { key: input_key, type: 'text', className: 'form-control input-sm', placeholder: 'Search', value: this.state.filterTerm, onChange: this.handleChange });
	    }
	  }
	});

	module.exports = FilterableHeaderCell;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* TODO mixins */

	'use strict';

	var _classCallCheck = __webpack_require__(41)['default'];

	var ColumnMetrics = __webpack_require__(21);
	var DOMMetrics = __webpack_require__(77);
	Object.assign = __webpack_require__(83);
	var PropTypes = __webpack_require__(16).PropTypes;
	var ColumnUtils = __webpack_require__(23);
	var React = __webpack_require__(16);

	var Column = function Column() {
	  _classCallCheck(this, Column);
	};

	;

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.arrayOf(Column),
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth: function gridWidth() {
	      return React.findDOMNode(this).parentElement.offsetWidth;
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      minColumnWidth: 80,
	      columnEquality: ColumnMetrics.sameColumn
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.columns) {
	      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)) {
	        var columnMetrics = this.createColumnMetrics();
	        this.setState({ columnMetrics: columnMetrics });
	      }
	    }
	  },

	  getTotalWidth: function getTotalWidth() {
	    var totalWidth = 0;
	    if (this.isMounted()) {
	      totalWidth = this.DOMMetrics.gridWidth();
	    } else {
	      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
	    }
	    return totalWidth;
	  },

	  getColumnMetricsType: function getColumnMetricsType(metrics) {
	    var totalWidth = this.getTotalWidth();
	    var currentMetrics = {
	      columns: metrics.columns,
	      totalWidth: totalWidth,
	      minColumnWidth: metrics.minColumnWidth
	    };
	    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
	    return updatedMetrics;
	  },

	  getColumn: function getColumn(columns, idx) {
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },

	  getSize: function getSize() {
	    var columns = this.state.columnMetrics.columns;
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  },

	  metricsUpdated: function metricsUpdated() {
	    var columnMetrics = this.createColumnMetrics();
	    this.setState({ columnMetrics: columnMetrics });
	  },

	  createColumnMetrics: function createColumnMetrics(initialRun) {
	    var gridColumns = this.setupGridColumns();
	    return this.getColumnMetricsType({ columns: gridColumns, minColumnWidth: this.props.minColumnWidth }, initialRun);
	  },

	  onColumnResize: function onColumnResize(index, width) {
	    var columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
	    this.setState({ columnMetrics: columnMetrics });
	  }
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';

	var RowUtils = {
	  get: function get(row, property) {
	    if (typeof row.get === 'function') {
	      return row.get(property);
	    } else {
	      return row[property];
	    }
	  }
	};

	module.exports = RowUtils;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Editors = {
	  AutoComplete: __webpack_require__(86),
	  DropDownEditor: __webpack_require__(88),
	  SimpleTextEditor: __webpack_require__(52),
	  CheckboxEditor: __webpack_require__(80)
	};

	module.exports = Editors;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	
	/* Flow issues:
	overrides? getDefaultValue, getStyle, onKeyDown
	*/
	/**
	 * @jsx React.DOM
	 */
	'use strict';

	var React = __webpack_require__(16);
	var ReactAutocomplete = __webpack_require__(87);
	var KeyboardHandlerMixin = __webpack_require__(51);
	var ExcelColumn = __webpack_require__(40);

	var optionPropType = React.PropTypes.shape({
	  id: React.PropTypes.required,
	  title: React.PropTypes.string
	});

	var AutoCompleteEditor = React.createClass({
	  displayName: 'AutoCompleteEditor',

	  propTypes: {
	    onCommit: React.PropTypes.func.isRequired,
	    options: React.PropTypes.arrayOf(optionPropType).isRequired,
	    label: React.PropTypes.string,
	    value: React.PropTypes.any.isRequired,
	    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    resultIdentifier: React.PropTypes.string,
	    search: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      resultIdentifier: 'id'
	    };
	  },

	  getValue: function getValue() {
	    var value,
	        updated = {};
	    if (this.hasResults() && this.isFocusedOnSuggestion()) {
	      value = this.getLabel(this.refs.autoComplete.state.focusedValue);
	      if (this.props.valueParams) {
	        value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue, this.props.valueParams);
	      }
	    } else {
	      value = this.refs.autoComplete.state.searchTerm;
	    }
	    updated[this.props.column.key] = value;
	    return updated;
	  },

	  getInputNode: function getInputNode() {
	    return this.getDOMNode().getElementsByTagName("input")[0];
	  },

	  render: function render() {
	    var label = this.props.label != null ? this.props.label : 'title';
	    return React.createElement(
	      'div',
	      { height: this.props.height, onKeyDown: this.props.onKeyDown },
	      React.createElement(ReactAutocomplete, { search: this.props.search, ref: 'autoComplete', label: label, onChange: this.handleChange, resultIdentifier: this.props.resultIdentifier, options: this.props.options, value: { title: this.props.value } })
	    );
	  },

	  handleChange: function handleChange() {
	    this.props.onCommit();
	  },

	  hasResults: function hasResults() {
	    return this.refs.autoComplete.state.results.length > 0;
	  },

	  isFocusedOnSuggestion: function isFocusedOnSuggestion() {
	    var autoComplete = this.refs.autoComplete;
	    return autoComplete.state.focusedValue != null;
	  },

	  getLabel: function getLabel(item) {
	    var label = this.props.label != null ? this.props.label : 'title';
	    if (typeof label === "function") {
	      return label(item);
	    } else if (typeof label === "string") {
	      return item[label];
	    }
	  },

	  constuctValueFromParams: function constuctValueFromParams(obj, props) {
	    if (!props) {
	      return '';
	    }
	    var ret = [];
	    for (var i = 0, ii = props.length; i < ii; i++) {
	      ret.push(obj[props[i]]);
	    }
	    return ret.join('|');
	  }
	});

	module.exports = AutoCompleteEditor;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(16));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["ReactAutocomplete"] = factory(require("react"));
		else
			root["ReactAutocomplete"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * @jsx React.DOM
		 */
		"use strict";

		var React = __webpack_require__(1);
		var joinClasses = __webpack_require__(2);

		var Autocomplete = React.createClass({ displayName: "Autocomplete",

		  propTypes: {
		    options: React.PropTypes.any,
		    search: React.PropTypes.func,
		    resultRenderer: React.PropTypes.oneOfType([React.PropTypes.component, React.PropTypes.func]),
		    value: React.PropTypes.object,
		    onChange: React.PropTypes.func,
		    onError: React.PropTypes.func
		  },

		  getDefaultProps: function () {
		    return { search: searchArray };
		  },

		  getInitialState: function () {
		    var searchTerm = this.props.searchTerm ? this.props.searchTerm : this.props.value ? this.props.value.title : "";
		    return {
		      results: [],
		      showResults: false,
		      showResultsInProgress: false,
		      searchTerm: searchTerm,
		      focusedValue: null
		    };
		  },

		  getResultIdentifier: function (result) {
		    if (this.props.resultIdentifier === undefined) {
		      return result.id;
		    } else {
		      return result[this.props.resultIdentifier];
		    }
		  },


		  render: function () {
		    var className = joinClasses(this.props.className, "react-autocomplete-Autocomplete", this.state.showResults ? "react-autocomplete-Autocomplete--resultsShown" : undefined);
		    var style = {
		      position: "relative",
		      outline: "none"
		    };
		    return React.createElement("div", {
		      tabIndex: "1",
		      className: className,
		      onFocus: this.onFocus,
		      onBlur: this.onBlur,
		      style: style }, React.createElement("input", {
		      ref: "search",
		      className: "react-autocomplete-Autocomplete__search",
		      style: { width: "100%" },
		      onClick: this.showAllResults,
		      onChange: this.onQueryChange,
		      onFocus: this.showAllResults,
		      onBlur: this.onQueryBlur,
		      onKeyDown: this.onQueryKeyDown,
		      value: this.state.searchTerm }), React.createElement(Results, {
		      className: "react-autocomplete-Autocomplete__results",
		      onSelect: this.onValueChange,
		      onFocus: this.onValueFocus,
		      results: this.state.results,
		      focusedValue: this.state.focusedValue,
		      show: this.state.showResults,
		      renderer: this.props.resultRenderer,
		      label: this.props.label,
		      resultIdentifier: this.props.resultIdentifier }));
		  },

		  componentWillReceiveProps: function (nextProps) {
		    var searchTerm = nextProps.searchTerm ? nextProps.searchTerm : nextProps.value ? nextProps.value.title : "";
		    this.setState({ searchTerm: searchTerm });
		  },

		  componentWillMount: function () {
		    this.blurTimer = null;
		  },

		  /**
		    * Show results for a search term value.
		    *
		    * This method doesn't update search term value itself.
		    *
		    * @param {Search} searchTerm
		    */
		  showResults: function (searchTerm) {
		    this.setState({ showResultsInProgress: true });
		    this.props.search(this.props.options, searchTerm.trim(), this.onSearchComplete);
		  },

		  showAllResults: function () {
		    if (!this.state.showResultsInProgress && !this.state.showResults) {
		      this.showResults("");
		    }
		  },

		  onValueChange: function (value) {
		    var state = {
		      value: value,
		      showResults: false
		    };

		    if (value) {
		      state.searchTerm = value.title;
		    }

		    this.setState(state);

		    if (this.props.onChange) {
		      this.props.onChange(value);
		    }
		  },

		  onSearchComplete: function (err, results) {
		    if (err) {
		      if (this.props.onError) {
		        this.props.onError(err);
		      } else {
		        throw err;
		      }
		    }

		    this.setState({
		      showResultsInProgress: false,
		      showResults: true,
		      results: results
		    });
		  },

		  onValueFocus: function (value) {
		    this.setState({ focusedValue: value });
		  },

		  onQueryChange: function (e) {
		    var searchTerm = e.target.value;
		    this.setState({
		      searchTerm: searchTerm,
		      focusedValue: null
		    });
		    this.showResults(searchTerm);
		  },

		  onFocus: function () {
		    if (this.blurTimer) {
		      clearTimeout(this.blurTimer);
		      this.blurTimer = null;
		    }
		    this.refs.search.getDOMNode().focus();
		  },

		  onBlur: function () {
		    // wrap in setTimeout so we can catch a click on results
		    this.blurTimer = setTimeout((function () {
		      if (this.isMounted()) {
		        this.setState({ showResults: false });
		      }
		    }).bind(this), 100);
		  },

		  onQueryKeyDown: function (e) {
		    if (e.key === "Enter") {
		      e.preventDefault();
		      if (this.state.focusedValue) {
		        this.onValueChange(this.state.focusedValue);
		      }
		    } else if (e.key === "ArrowUp" && this.state.showResults) {
		      e.preventDefault();
		      var prevIdx = Math.max(this.focusedValueIndex() - 1, 0);
		      this.setState({
		        focusedValue: this.state.results[prevIdx]
		      });
		    } else if (e.key === "ArrowDown") {
		      e.preventDefault();
		      if (this.state.showResults) {
		        var nextIdx = Math.min(this.focusedValueIndex() + (this.state.showResults ? 1 : 0), this.state.results.length - 1);
		        this.setState({
		          showResults: true,
		          focusedValue: this.state.results[nextIdx]
		        });
		      } else {
		        this.showAllResults();
		      }
		    }
		  },

		  focusedValueIndex: function () {
		    if (!this.state.focusedValue) {
		      return -1;
		    }
		    for (var i = 0, len = this.state.results.length; i < len; i++) {
		      if (this.getResultIdentifier(this.state.results[i]) === this.getResultIdentifier(this.state.focusedValue)) {
		        return i;
		      }
		    }
		    return -1;
		  }
		});

		var Results = React.createClass({ displayName: "Results",

		  getResultIdentifier: function (result) {
		    if (this.props.resultIdentifier === undefined) {
		      if (!result.id) {
		        throw "id property not found on result. You must specify a resultIdentifier and pass as props to autocomplete component";
		      }
		      return result.id;
		    } else {
		      return result[this.props.resultIdentifier];
		    }
		  },

		  render: function () {
		    var style = {
		      display: this.props.show ? "block" : "none",
		      position: "absolute",
		      listStyleType: "none"
		    };
		    var $__0 = this.props,
		        className = $__0.className,
		        props = (function (source, exclusion) {
		      var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {
		        throw new TypeError();
		      }for (var key in source) {
		        if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {
		          rest[key] = source[key];
		        }
		      }return rest;
		    })($__0, { className: 1 });

		    return React.createElement("ul", React.__spread({}, props, { style: style, className: className + " react-autocomplete-Results" }), this.props.results.map(this.renderResult));
		  },

		  renderResult: function (result) {
		    var focused = this.props.focusedValue && this.getResultIdentifier(this.props.focusedValue) === this.getResultIdentifier(result);
		    var Renderer = this.props.renderer || Result;
		    return React.createElement(Renderer, {
		      ref: focused ? "focused" : undefined,
		      key: this.getResultIdentifier(result),
		      result: result,
		      focused: focused,
		      onMouseEnter: this.onMouseEnterResult,
		      onClick: this.props.onSelect,
		      label: this.props.label });
		  },

		  componentDidUpdate: function () {
		    this.scrollToFocused();
		  },

		  componentDidMount: function () {
		    this.scrollToFocused();
		  },

		  componentWillMount: function () {
		    this.ignoreFocus = false;
		  },

		  scrollToFocused: function () {
		    var focused = this.refs && this.refs.focused;
		    if (focused) {
		      var containerNode = this.getDOMNode();
		      var scroll = containerNode.scrollTop;
		      var height = containerNode.offsetHeight;

		      var node = focused.getDOMNode();
		      var top = node.offsetTop;
		      var bottom = top + node.offsetHeight;

		      // we update ignoreFocus to true if we change the scroll position so
		      // the mouseover event triggered because of that won't have an
		      // effect
		      if (top < scroll) {
		        this.ignoreFocus = true;
		        containerNode.scrollTop = top;
		      } else if (bottom - scroll > height) {
		        this.ignoreFocus = true;
		        containerNode.scrollTop = bottom - height;
		      }
		    }
		  },

		  onMouseEnterResult: function (e, result) {
		    // check if we need to prevent the next onFocus event because it was
		    // probably caused by a mouseover due to scroll position change
		    if (this.ignoreFocus) {
		      this.ignoreFocus = false;
		    } else {
		      // we need to make sure focused node is visible
		      // for some reason mouse events fire on visible nodes due to
		      // box-shadow
		      var containerNode = this.getDOMNode();
		      var scroll = containerNode.scrollTop;
		      var height = containerNode.offsetHeight;

		      var node = e.target;
		      var top = node.offsetTop;
		      var bottom = top + node.offsetHeight;

		      if (bottom > scroll && top < scroll + height) {
		        this.props.onFocus(result);
		      }
		    }
		  }
		});

		var Result = React.createClass({ displayName: "Result",

		  getDefaultProps: function () {
		    return {
		      label: function (result) {
		        return result.title;
		      }
		    };
		  },

		  getLabel: function (result) {
		    if (typeof this.props.label === "function") {
		      return this.props.label(result);
		    } else if (typeof this.props.label === "string") {
		      return result[this.props.label];
		    }
		  },

		  render: function () {
		    var className = joinClasses({
		      "react-autocomplete-Result": true,
		      "react-autocomplete-Result--active": this.props.focused
		    });

		    return React.createElement("li", {
		      style: { listStyleType: "none" },
		      className: className,
		      onClick: this.onClick,
		      onMouseEnter: this.onMouseEnter }, React.createElement("a", null, this.getLabel(this.props.result)));
		  },

		  onClick: function () {
		    this.props.onClick(this.props.result);
		  },

		  onMouseEnter: function (e) {
		    if (this.props.onMouseEnter) {
		      this.props.onMouseEnter(e, this.props.result);
		    }
		  },

		  shouldComponentUpdate: function (nextProps) {
		    return nextProps.result.id !== this.props.result.id || nextProps.focused !== this.props.focused;
		  }
		});

		/**
		* Search options using specified search term treating options as an array
		* of candidates.
		*
		* @param {Array.<Object>} options
		* @param {String} searchTerm
		* @param {Callback} cb
		*/
		function searchArray(options, searchTerm, cb) {
		  if (!options) {
		    return cb(null, []);
		  }

		  searchTerm = new RegExp(searchTerm, "i");

		  var results = [];

		  for (var i = 0, len = options.length; i < len; i++) {
		    if (searchTerm.exec(options[i].title)) {
		      results.push(options[i]);
		    }
		  }

		  cb(null, results);
		}

		module.exports = Autocomplete;

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		  Copyright (c) 2015 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/

		function classNames() {
			var classes = '';
			var arg;

			for (var i = 0; i < arguments.length; i++) {
				arg = arguments[i];
				if (!arg) {
					continue;
				}

				if ('string' === typeof arg || 'number' === typeof arg) {
					classes += ' ' + arg;
				} else if (Object.prototype.toString.call(arg) === '[object Array]') {
					classes += ' ' + classNames.apply(null, arg);
				} else if ('object' === typeof arg) {
					for (var key in arg) {
						if (!arg.hasOwnProperty(key) || !arg[key]) {
							continue;
						}
						classes += ' ' + key;
					}
				}
			}
			return classes.substr(1);
		}

		// safely export classNames for node / browserify
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		}

		// safely export classNames for RequireJS
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}


	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @jsx React.DOM


	 */
	'use strict';

	var _get = __webpack_require__(53)['default'];

	var _inherits = __webpack_require__(59)['default'];

	var _createClass = __webpack_require__(70)['default'];

	var _classCallCheck = __webpack_require__(41)['default'];

	var React = __webpack_require__(16);
	var EditorBase = __webpack_require__(73);

	var DropDownEditor = (function (_EditorBase) {
	  _inherits(DropDownEditor, _EditorBase);

	  function DropDownEditor() {
	    _classCallCheck(this, DropDownEditor);

	    _get(Object.getPrototypeOf(DropDownEditor.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(DropDownEditor, [{
	    key: 'getInputNode',
	    value: function getInputNode() {
	      return React.findDOMNode(this);
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(e) {
	      this.getInputNode().focus();
	    }
	  }, {
	    key: 'onDoubleClick',
	    value: function onDoubleClick(e) {
	      this.getInputNode().focus();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'select',
	        { style: this.getStyle(), defaultValue: this.props.value, onChange: this.onChange },
	        this.renderOptions()
	      );
	    }
	  }, {
	    key: 'renderOptions',
	    value: function renderOptions() {
	      var options = [];
	      this.props.options.forEach(function (name) {
	        options.push(React.createElement(
	          'option',
	          { key: name, value: name },
	          name
	        ));
	      }, this);
	      return options;
	    }
	  }]);

	  return DropDownEditor;
	})(EditorBase);

	;

	DropDownEditor.propTypes = {
	  options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	};

	module.exports = DropDownEditor;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	
	//not including this
	//it currently requires the whole of moment, which we dont want to take as a dependency
	'use strict';

	var ImageFormatter = __webpack_require__(90);

	var Formatters = {
	  ImageFormatter: ImageFormatter
	};

	module.exports = Formatters;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(16);

	var PendingPool = {};
	var ReadyPool = {};

	var ImageFormatter = React.createClass({
	  displayName: 'ImageFormatter',

	  propTypes: {
	    value: React.PropTypes.string.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      ready: false
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this._load(this.props.value);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== this.props.value) {
	      this.setState({ value: null });
	      this._load(nextProps.value);
	    }
	  },

	  render: function render() {
	    var style = this.state.value ? { backgroundImage: 'url(' + this.state.value + ')' } : undefined;

	    return React.createElement('div', { className: 'react-grid-image', style: style });
	  },

	  _load: function _load( /*string*/src) {
	    if (ReadyPool[src]) {
	      this.setState({ value: src });
	      return;
	    }

	    if (PendingPool[src]) {
	      PendingPool[src].push(this._onLoad);
	      return;
	    }

	    PendingPool[src] = [this._onLoad];

	    var img = new Image();
	    img.onload = function () {
	      PendingPool[src].forEach( /*function*/function (callback) {
	        callback(src);
	      });
	      delete PendingPool[src];
	      img.onload = null;
	      src = undefined;
	    };
	    img.src = src;
	  },

	  _onLoad: function _onLoad( /*string*/src) {
	    if (this.isMounted() && src === this.props.value) {
	      this.setState({
	        value: src
	      });
	    }
	  }
	});

	module.exports = ImageFormatter;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	* @jsx React.DOM

	*/
	'use strict';

	var React = __webpack_require__(16);
	var Row = __webpack_require__(48);

	var Toolbar = React.createClass({
	  displayName: 'Toolbar',

	  propTypes: {
	    onAddRow: React.PropTypes.func,
	    onToggleFilter: React.PropTypes.func.isRequired,
	    enableFilter: React.PropTypes.bool,
	    numberOfRows: React.PropTypes.number.isRequired
	  },
	  onAddRow: function onAddRow() {
	    if (this.props.onAddRow !== null && this.props.onAddRow instanceof Function) {
	      this.props.onAddRow({ newRowIndex: this.props.numberOfRows });
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      enableAddRow: true
	    };
	  },

	  renderAddRowButton: function renderAddRowButton() {
	    if (this.props.onAddRow) {
	      return React.createElement(
	        'button',
	        { type: 'button', className: 'btn', onClick: this.onAddRow },
	        'Add Row'
	      );
	    }
	  },

	  renderToggleFilterButton: function renderToggleFilterButton() {
	    if (this.props.enableFilter) {
	      return React.createElement(
	        'button',
	        { type: 'button', className: 'btn', onClick: this.props.onToggleFilter },
	        'Filter Rows'
	      );
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'react-grid-Toolbar' },
	      React.createElement(
	        'div',
	        { className: 'tools' },
	        this.renderAddRowButton(),
	        this.renderToggleFilterButton()
	      )
	    );
	  }
	});

	module.exports = Toolbar;

/***/ }
/******/ ])
});
;