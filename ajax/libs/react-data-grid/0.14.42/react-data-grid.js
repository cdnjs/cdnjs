(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDataGrid"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	var Grid = __webpack_require__(1);
	var Row = __webpack_require__(87);
	var Cell = __webpack_require__(88);

	module.exports = Grid;
	module.exports.Row = Row;
	module.exports.Cell = Cell;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var BaseGrid = __webpack_require__(4);
	var Row = __webpack_require__(87);
	var ExcelColumn = __webpack_require__(15);
	var KeyboardHandlerMixin = __webpack_require__(90);
	var CheckboxEditor = __webpack_require__(99);
	var DOMMetrics = __webpack_require__(97);
	var ColumnMetricsMixin = __webpack_require__(100);
	var RowUtils = __webpack_require__(102);
	var ColumnUtils = __webpack_require__(10);

	if (!Object.assign) {
	  Object.assign = __webpack_require__(101);
	}


	var ReactDataGrid = React.createClass({
	  displayName: 'ReactDataGrid',


	  mixins: [ColumnMetricsMixin, DOMMetrics.MetricsComputatorMixin, KeyboardHandlerMixin],

	  propTypes: {
	    rowHeight: React.PropTypes.number.isRequired,
	    headerRowHeight: React.PropTypes.number,
	    minHeight: React.PropTypes.number.isRequired,
	    minWidth: React.PropTypes.number,
	    enableRowSelect: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
	    onRowUpdated: React.PropTypes.func,
	    rowGetter: React.PropTypes.func.isRequired,
	    rowsCount: React.PropTypes.number.isRequired,
	    toolbar: React.PropTypes.element,
	    enableCellSelect: React.PropTypes.bool,
	    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
	    onFilter: React.PropTypes.func,
	    onCellCopyPaste: React.PropTypes.func,
	    onCellsDragged: React.PropTypes.func,
	    onAddFilter: React.PropTypes.func,
	    onGridSort: React.PropTypes.func,
	    onDragHandleDoubleClick: React.PropTypes.func,
	    onGridRowsUpdated: React.PropTypes.func,
	    onRowSelect: React.PropTypes.func,
	    rowKey: React.PropTypes.string,
	    rowScrollTimeout: React.PropTypes.number,
	    onClearFilters: React.PropTypes.func,
	    contextMenu: React.PropTypes.element,
	    cellNavigationMode: React.PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
	    onCellSelected: React.PropTypes.func,
	    onCellDeSelected: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      enableCellSelect: false,
	      tabIndex: -1,
	      rowHeight: 35,
	      enableRowSelect: false,
	      minHeight: 350,
	      rowKey: 'id',
	      rowScrollTimeout: 0,
	      cellNavigationMode: 'none'
	    };
	  },


	  getInitialState: function getInitialState() {
	    var columnMetrics = this.createColumnMetrics();
	    var initialState = { columnMetrics: columnMetrics, selectedRows: [], copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0 };
	    if (this.props.enableCellSelect) {
	      initialState.selected = { rowIdx: 0, idx: 0 };
	    } else {
	      initialState.selected = { rowIdx: -1, idx: -1 };
	    }
	    return initialState;
	  },

	  hasSelectedCellChanged: function hasSelectedCellChanged(selected) {
	    var previouslySelected = Object.assign({}, this.state.selected);
	    return previouslySelected.rowIdx !== selected.rowIdx || previouslySelected.idx !== selected.idx || previouslySelected.active === false;
	  },

	  onContextMenuHide: function onContextMenuHide() {
	    document.removeEventListener('click', this.onContextMenuHide);
	    var newSelected = Object.assign({}, this.state.selected, { contextMenuDisplayed: false });
	    this.setState({ selected: newSelected });
	  },

	  onColumnEvent: function onColumnEvent(ev, columnEvent) {
	    var idx = columnEvent.idx;
	    var name = columnEvent.name;


	    if (name && typeof idx !== 'undefined') {
	      var column = this.getColumn(idx);

	      if (column && column.events && column.events[name] && typeof column.events[name] === 'function') {
	        var eventArgs = {
	          rowIdx: columnEvent.rowIdx,
	          idx: idx,
	          column: column
	        };

	        column.events[name](ev, eventArgs);
	      }
	    }
	  },

	  onSelect: function onSelect(selected) {
	    var _this = this;

	    if (this.state.selected.rowIdx !== selected.rowIdx || this.state.selected.idx !== selected.idx || this.state.selected.active === false) {
	      var _idx = selected.idx;
	      var _rowIdx = selected.rowIdx;
	      if (_idx >= 0 && _rowIdx >= 0 && _idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && _rowIdx < this.props.rowsCount) {
	        (function () {
	          var oldSelection = _this.state.selected;
	          _this.setState({ selected: selected }, function () {
	            if (typeof _this.props.onCellDeSelected === 'function') {
	              _this.props.onCellDeSelected(oldSelection);
	            }
	            if (typeof _this.props.onCellSelected === 'function') {
	              _this.props.onCellSelected(selected);
	            }
	          });
	        })();
	      }
	    }
	  },

	  onCellClick: function onCellClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
	  },

	  onCellContextMenu: function onCellContextMenu(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx, contextMenuDisplayed: this.props.contextMenu });
	    if (this.props.contextMenu) {
	      document.addEventListener('click', this.onContextMenuHide);
	    }
	  },

	  onCellDoubleClick: function onCellDoubleClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
	    this.setActive('Enter');
	  },

	  onViewportDoubleClick: function onViewportDoubleClick() {
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

	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
	      if (e.keyCode === keys.KeyCode_c || e.keyCode === keys.KeyCode_C) {
	        var _value = this.getSelectedValue();
	        this.handleCopy({ value: _value });
	      } else if (e.keyCode === keys.KeyCode_v || e.keyCode === keys.KeyCode_V) {
	        this.handlePaste();
	      }
	    }
	  },
	  onCellCommit: function onCellCommit(commit) {
	    var selected = Object.assign({}, this.state.selected);
	    selected.active = false;
	    if (commit.key === 'Tab') {
	      selected.idx += 1;
	    }
	    var expandedRows = this.state.expandedRows;
	    // if(commit.changed && commit.changed.expandedHeight){
	    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	    // }
	    this.setState({ selected: selected, expandedRows: expandedRows });

	    if (this.props.onRowUpdated) {
	      this.props.onRowUpdated(commit);
	    }

	    var targetRow = commit.rowIdx;

	    if (this.props.onGridRowsUpdated) {
	      this.props.onGridRowsUpdated({
	        cellKey: commit.cellKey,
	        fromRow: targetRow,
	        toRow: targetRow,
	        updated: commit.updated,
	        action: 'cellUpdate' });
	    }
	  },
	  onDragStart: function onDragStart(e) {
	    var value = this.getSelectedValue();
	    this.handleDragStart({ idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: value });
	    // need to set dummy data for FF
	    if (e && e.dataTransfer) {
	      if (e.dataTransfer.setData) {
	        e.dataTransfer.dropEffect = 'move';
	        e.dataTransfer.effectAllowed = 'move';
	        e.dataTransfer.setData('text/plain', 'dummy');
	      }
	    }
	  },
	  onToggleFilter: function onToggleFilter() {
	    var _this2 = this;

	    // setState() does not immediately mutate this.state but creates a pending state transition.
	    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	    this.setState({ canFilter: !this.state.canFilter }, function () {
	      if (_this2.state.canFilter === false && _this2.props.onClearFilters) {
	        _this2.props.onClearFilters();
	      }
	    });
	  },
	  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
	    if (this.props.onDragHandleDoubleClick) {
	      this.props.onDragHandleDoubleClick(e);
	    }

	    if (this.props.onGridRowsUpdated) {
	      var cellKey = this.getColumn(e.idx).key;

	      var updated = _defineProperty({}, cellKey, e.rowData[cellKey]);

	      this.props.onGridRowsUpdated({
	        cellKey: cellKey,
	        fromRow: e.rowIdx,
	        toRow: this.props.rowsCount - 1,
	        updated: updated,
	        action: 'columnFill' });
	    }
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
	  handleDragEnd: function handleDragEnd() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var fromRow = void 0;
	    var toRow = void 0;
	    var selected = this.state.selected;
	    var dragged = this.state.dragged;
	    var cellKey = this.getColumn(this.state.selected.idx).key;
	    fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    toRow = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	    if (this.props.onCellsDragged) {
	      this.props.onCellsDragged({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value });
	    }
	    if (this.props.onGridRowsUpdated) {
	      var updated = _defineProperty({}, cellKey, dragged.value);

	      this.props.onGridRowsUpdated({
	        cellKey: cellKey,
	        fromRow: fromRow,
	        toRow: toRow,
	        updated: updated,
	        action: 'cellDrag' });
	    }
	    this.setState({ dragged: { complete: true } });
	  },
	  handleDragEnter: function handleDragEnter(row) {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	    this.setState({ dragged: dragged });
	  },
	  handleTerminateDrag: function handleTerminateDrag() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    this.setState({ dragged: null });
	  },
	  handlePaste: function handlePaste() {
	    if (!this.copyPasteEnabled()) {
	      return;
	    }
	    var selected = this.state.selected;
	    var cellKey = this.getColumn(this.state.selected.idx).key;
	    var textToCopy = this.state.textToCopy;
	    var toRow = selected.rowIdx;

	    if (this.props.onCellCopyPaste) {
	      this.props.onCellCopyPaste({ cellKey: cellKey, rowIdx: toRow, value: textToCopy, fromRow: this.state.copied.rowIdx, toRow: toRow });
	    }

	    if (this.props.onGridRowsUpdated) {
	      var updated = _defineProperty({}, cellKey, textToCopy);

	      this.props.onGridRowsUpdated({
	        cellKey: cellKey,
	        fromRow: toRow,
	        toRow: toRow,
	        updated: updated,
	        action: 'copyPaste' });
	    }

	    this.setState({ copied: null });
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


	  handleSort: function handleSort(columnKey, direction) {
	    this.setState({ sortDirection: direction, sortColumn: columnKey }, function () {
	      this.props.onGridSort(columnKey, direction);
	    });
	  },

	  getSelectedRow: function getSelectedRow(rows, key) {
	    var _this3 = this;

	    var selectedRow = rows.filter(function (r) {
	      if (r[_this3.props.rowKey] === key) {
	        return true;
	      }
	      return false;
	    });
	    if (selectedRow.length > 0) {
	      return selectedRow[0];
	    }
	  },


	  // columnKey not used here as this function will select the whole row,
	  // but needed to match the function signature in the CheckboxEditor
	  handleRowSelect: function handleRowSelect(rowIdx, columnKey, rowData, e) {
	    e.stopPropagation();
	    var selectedRows = this.props.enableRowSelect === 'single' ? [] : this.state.selectedRows.slice(0);
	    var selectedRow = this.getSelectedRow(selectedRows, rowData[this.props.rowKey]);
	    if (selectedRow) {
	      selectedRow.isSelected = !selectedRow.isSelected;
	    } else {
	      rowData.isSelected = true;
	      selectedRows.push(rowData);
	    }
	    this.setState({ selectedRows: selectedRows, selected: { rowIdx: rowIdx, idx: 0 } });
	    if (this.props.onRowSelect) {
	      this.props.onRowSelect(selectedRows.filter(function (r) {
	        return r.isSelected === true;
	      }));
	    }
	  },


	  handleCheckboxChange: function handleCheckboxChange(e) {
	    var allRowsSelected = void 0;
	    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
	      allRowsSelected = true;
	    } else {
	      allRowsSelected = false;
	    }
	    var selectedRows = [];
	    for (var i = 0; i < this.props.rowsCount; i++) {
	      var row = Object.assign({}, this.props.rowGetter(i), { isSelected: allRowsSelected });
	      selectedRows.push(row);
	    }
	    this.setState({ selectedRows: selectedRows });
	    if (typeof this.props.onRowSelect === 'function') {
	      this.props.onRowSelect(selectedRows.filter(function (r) {
	        return r.isSelected === true;
	      }));
	    }
	  },

	  getScrollOffSet: function getScrollOffSet() {
	    var scrollOffset = 0;
	    var canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
	    if (canvas) {
	      scrollOffset = canvas.offsetWidth - canvas.clientWidth;
	    }
	    this.setState({ scrollOffset: scrollOffset });
	  },
	  getRowOffsetHeight: function getRowOffsetHeight() {
	    var offsetHeight = 0;
	    this.getHeaderRows().forEach(function (row) {
	      return offsetHeight += parseFloat(row.height, 10);
	    });
	    return offsetHeight;
	  },
	  getHeaderRows: function getHeaderRows() {
	    var rows = [{ ref: 'row', height: this.props.headerRowHeight || this.props.rowHeight, rowType: 'header' }];
	    if (this.state.canFilter === true) {
	      rows.push({
	        ref: 'filterRow',
	        filterable: true,
	        onFilterChange: this.props.onAddFilter,
	        height: 45,
	        rowType: 'filter'
	      });
	    }
	    return rows;
	  },


	  getInitialSelectedRows: function getInitialSelectedRows() {
	    var selectedRows = [];
	    for (var i = 0; i < this.props.rowsCount; i++) {
	      selectedRows.push(false);
	    }
	    return selectedRows;
	  },

	  getSelectedValue: function getSelectedValue() {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    var cellKey = this.getColumn(idx).key;
	    var row = this.props.rowGetter(rowIdx);
	    return RowUtils.get(row, cellKey);
	  },
	  moveSelectedCell: function moveSelectedCell(e, rowDelta, cellDelta) {
	    // we need to prevent default as we control grid scroll
	    // otherwise it moves every time you left/right which is janky
	    e.preventDefault();
	    var rowIdx = void 0;
	    var idx = void 0;
	    var cellNavigationMode = this.props.cellNavigationMode;

	    if (cellNavigationMode !== 'none') {
	      var _calculateNextSelecti = this.calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta);

	      idx = _calculateNextSelecti.idx;
	      rowIdx = _calculateNextSelecti.rowIdx;
	    } else {
	      rowIdx = this.state.selected.rowIdx + rowDelta;
	      idx = this.state.selected.idx + cellDelta;
	    }
	    this.onSelect({ idx: idx, rowIdx: rowIdx });
	  },
	  calculateNextSelectionPosition: function calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta) {
	    var _rowDelta = rowDelta;
	    var idx = this.state.selected.idx + cellDelta;
	    if (cellDelta > 0) {
	      if (this.isAtLastCellInRow()) {
	        if (cellNavigationMode === 'changeRow') {
	          _rowDelta = this.isAtLastRow() ? rowDelta : rowDelta + 1;
	          idx = this.isAtLastRow() ? idx : 0;
	        } else {
	          idx = 0;
	        }
	      }
	    } else if (cellDelta < 0) {
	      if (this.isAtFirstCellInRow()) {
	        if (cellNavigationMode === 'changeRow') {
	          _rowDelta = this.isAtFirstRow() ? rowDelta : rowDelta - 1;
	          idx = this.isAtFirstRow() ? 0 : this.props.columns.length - 1;
	        } else {
	          idx = this.props.columns.length - 1;
	        }
	      }
	    }
	    var rowIdx = this.state.selected.rowIdx + _rowDelta;
	    return { idx: idx, rowIdx: rowIdx };
	  },
	  isAtLastCellInRow: function isAtLastCellInRow() {
	    return this.state.selected.idx === this.props.columns.length - 1;
	  },
	  isAtLastRow: function isAtLastRow() {
	    return this.state.selected.rowIdx === this.props.rowsCount - 1;
	  },
	  isAtFirstCellInRow: function isAtFirstCellInRow() {
	    return this.state.selected.idx === 0;
	  },
	  isAtFirstRow: function isAtFirstRow() {
	    return this.state.selected.rowIdx === 0;
	  },
	  openCellEditor: function openCellEditor(rowIdx, idx) {
	    var _this4 = this;

	    var row = this.props.rowGetter(rowIdx);
	    var col = this.getColumn(idx);

	    if (!ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
	      return;
	    }

	    var selected = { rowIdx: rowIdx, idx: idx };
	    if (this.hasSelectedCellChanged(selected)) {
	      this.setState({ selected: selected }, function () {
	        _this4.setActive('Enter');
	      });
	    } else {
	      this.setActive('Enter');
	    }
	  },
	  setActive: function setActive(keyPressed) {
	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && !this.isActive()) {
	      var _selected = Object.assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed });
	      this.setState({ selected: _selected });
	    }
	  },
	  setInactive: function setInactive() {
	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && this.isActive()) {
	      var _selected2 = Object.assign(this.state.selected, { idx: idx, rowIdx: rowIdx, active: false });
	      this.setState({ selected: _selected2 });
	    }
	  },
	  isActive: function isActive() {
	    return this.state.selected.active === true;
	  },


	  setupGridColumns: function setupGridColumns() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	    var cols = props.columns.slice(0);
	    var unshiftedCols = {};
	    if (props.enableRowSelect) {
	      var headerRenderer = props.enableRowSelect === 'single' ? null : React.createElement(
	        'div',
	        { className: 'react-grid-checkbox-container' },
	        React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: 'select-all-checkbox', onChange: this.handleCheckboxChange }),
	        React.createElement('label', { htmlFor: 'select-all-checkbox', className: 'react-grid-checkbox-label' })
	      );
	      var selectColumn = {
	        key: 'select-row',
	        name: '',
	        formatter: React.createElement(CheckboxEditor, null),
	        onCellChange: this.handleRowSelect,
	        filterable: false,
	        headerRenderer: headerRenderer,
	        width: 60,
	        locked: true,
	        getRowMetaData: function getRowMetaData(rowData) {
	          return rowData;
	        }
	      };
	      unshiftedCols = cols.unshift(selectColumn);
	      cols = unshiftedCols > 0 ? cols : unshiftedCols;
	    }
	    return cols;
	  },

	  copyPasteEnabled: function copyPasteEnabled() {
	    return this.props.onCellCopyPaste !== null;
	  },

	  dragEnabled: function dragEnabled() {
	    return this.props.onCellsDragged !== null;
	  },

	  renderToolbar: function renderToolbar() {
	    var Toolbar = this.props.toolbar;
	    if (React.isValidElement(Toolbar)) {
	      return React.cloneElement(Toolbar, { onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount });
	    }
	  },


	  render: function render() {
	    var cellMetaData = {
	      selected: this.state.selected,
	      dragged: this.state.dragged,
	      onCellClick: this.onCellClick,
	      onCellContextMenu: this.onCellContextMenu,
	      onCellDoubleClick: this.onCellDoubleClick,
	      onCommit: this.onCellCommit,
	      onCommitCancel: this.setInactive,
	      copied: this.state.copied,
	      handleDragEnterRow: this.handleDragEnter,
	      handleTerminateDrag: this.handleTerminateDrag,
	      onDragHandleDoubleClick: this.onDragHandleDoubleClick,
	      enableCellSelect: this.props.enableCellSelect,
	      onColumnEvent: this.onColumnEvent,
	      openCellEditor: this.openCellEditor
	    };

	    var toolbar = this.renderToolbar();
	    var containerWidth = this.props.minWidth || this.DOMMetrics.gridWidth();
	    var gridWidth = containerWidth - this.state.scrollOffset;

	    // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	    // this also handles cases where it always returns undefined -- such as when inside a div with display:none
	    // eg Bootstrap tabs and collapses
	    if (typeof containerWidth === 'undefined' || isNaN(containerWidth) || containerWidth === 0) {
	      containerWidth = '100%';
	    }
	    if (typeof gridWidth === 'undefined' || isNaN(gridWidth) || gridWidth === 0) {
	      gridWidth = '100%';
	    }

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
	          rowKey: this.props.rowKey,
	          headerRows: this.getHeaderRows(),
	          columnMetrics: this.state.columnMetrics,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          rowHeight: this.props.rowHeight,
	          cellMetaData: cellMetaData,
	          selectedRows: this.state.selectedRows.filter(function (r) {
	            return r.isSelected === true;
	          }),
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
	          onColumnResize: this.onColumnResize,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          contextMenu: this.props.contextMenu }))
	      )
	    );
	  }
	});

	module.exports = ReactDataGrid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var PropTypes = React.PropTypes;
	var Header = __webpack_require__(5);
	var Viewport = __webpack_require__(21);
	var GridScrollMixin = __webpack_require__(98);
	var DOMMetrics = __webpack_require__(97);
	var cellMetaDataShape = __webpack_require__(94);

	var Grid = React.createClass({
	  displayName: 'Grid',

	  propTypes: {
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    columnMetrics: PropTypes.object,
	    minHeight: PropTypes.number,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowHeight: PropTypes.number,
	    rowRenderer: PropTypes.func,
	    emptyRowsView: PropTypes.func,
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
	    onViewportDoubleClick: PropTypes.func.isRequired,
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    rowKey: PropTypes.string.isRequired,
	    rowScrollTimeout: PropTypes.number,
	    contextMenu: PropTypes.element
	  },

	  mixins: [GridScrollMixin, DOMMetrics.MetricsComputatorMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  },


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
	    var EmptyRowsView = this.props.emptyRowsView;

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
	        onSort: this.props.onSort,
	        onScroll: this.onHeaderScroll
	      }),
	      this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView ? React.createElement(
	        'div',
	        { ref: 'viewPortContainer', onKeyDown: this.props.onViewportKeydown, onDoubleClick: this.props.onViewportDoubleClick, onDragStart: this.props.onViewportDragStart, onDragEnd: this.props.onViewportDragEnd },
	        React.createElement(Viewport, {
	          ref: 'viewport',
	          rowKey: this.props.rowKey,
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
	          minHeight: this.props.minHeight,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          contextMenu: this.props.contextMenu
	        })
	      ) : React.createElement(
	        'div',
	        { ref: 'emptyView', className: 'react-grid-Empty' },
	        React.createElement(EmptyRowsView, null)
	      )
	    );
	  }
	});

	module.exports = Grid;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var joinClasses = __webpack_require__(6);
	var shallowCloneObject = __webpack_require__(7);
	var ColumnMetrics = __webpack_require__(8);
	var ColumnUtils = __webpack_require__(10);
	var HeaderRow = __webpack_require__(12);
	var PropTypes = React.PropTypes;

	var Header = React.createClass({
	  displayName: 'Header',

	  propTypes: {
	    columnMetrics: PropTypes.shape({ width: PropTypes.number.isRequired, columns: PropTypes.any }).isRequired,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    headerRows: PropTypes.array.isRequired,
	    sortColumn: PropTypes.string,
	    sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
	    onSort: PropTypes.func,
	    onColumnResize: PropTypes.func,
	    onScroll: PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return { resizing: null };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps() {
	    this.setState({ resizing: null });
	  },


	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var update = !ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn) || this.props.totalWidth !== nextProps.totalWidth || this.props.headerRows.length !== nextProps.headerRows.length || this.state.resizing !== nextState.resizing || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	    return update;
	  },

	  onColumnResize: function onColumnResize(column, width) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos != null) {
	      var _resizing = {
	        columnMetrics: shallowCloneObject(state.columnMetrics)
	      };
	      _resizing.columnMetrics = ColumnMetrics.resizeColumn(_resizing.columnMetrics, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (_resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
	        _resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
	      }

	      _resizing.column = ColumnUtils.getColumn(_resizing.columnMetrics.columns, pos);
	      this.setState({ resizing: _resizing });
	    }
	  },
	  onColumnResizeEnd: function onColumnResizeEnd(column, width) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },
	  getHeaderRows: function getHeaderRows() {
	    var _this = this;

	    var columnMetrics = this.getColumnMetrics();
	    var resizeColumn = void 0;
	    if (this.state.resizing) {
	      resizeColumn = this.state.resizing.column;
	    }
	    var headerRows = [];
	    this.props.headerRows.forEach(function (row, index) {
	      var headerRowStyle = {
	        position: 'absolute',
	        top: _this.getCombinedHeaderHeights(index),
	        left: 0,
	        width: _this.props.totalWidth,
	        overflow: 'hidden'
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref,
	        ref: row.ref,
	        rowType: row.rowType,
	        style: headerRowStyle,
	        onColumnResize: _this.onColumnResize,
	        onColumnResizeEnd: _this.onColumnResizeEnd,
	        width: columnMetrics.width,
	        height: row.height || _this.props.height,
	        columns: columnMetrics.columns,
	        resizing: resizeColumn,
	        filterable: row.filterable,
	        onFilterChange: row.onFilterChange,
	        sortColumn: _this.props.sortColumn,
	        sortDirection: _this.props.sortDirection,
	        onSort: _this.props.onSort,
	        onScroll: _this.props.onScroll
	      }));
	    });
	    return headerRows;
	  },
	  getColumnMetrics: function getColumnMetrics() {
	    var columnMetrics = void 0;
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
	  getCombinedHeaderHeights: function getCombinedHeaderHeights(until) {
	    var stopAt = this.props.headerRows.length;
	    if (typeof until !== 'undefined') {
	      stopAt = until;
	    }

	    var height = 0;
	    for (var index = 0; index < stopAt; index++) {
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
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = ReactDOM.findDOMNode(this.refs.row);
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	    if (this.refs.filterRow) {
	      var nodeFilters = ReactDOM.findDOMNode(this.refs.filterRow);
	      nodeFilters.scrollLeft = scrollLeft;
	      this.refs.filterRow.setScrollLeft(scrollLeft);
	    }
	  },
	  render: function render() {
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
	  }
	});

	module.exports = Header;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	"use strict";

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shallowCloneObject = __webpack_require__(7);
	var sameColumn = __webpack_require__(9);
	var ColumnUtils = __webpack_require__(10);
	var getScrollbarSize = __webpack_require__(11);

	function setColumnWidths(columns, totalWidth) {
	  return columns.map(function (column) {
	    var colInfo = Object.assign({}, column);
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
	  return columns.map(function (column) {
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

	function setColumnOffsets(columns) {
	  var left = 0;
	  return columns.map(function (column) {
	    column.left = left;
	    left += column.width;
	    return column;
	  });
	}

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

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetricsType} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = ColumnUtils.getColumn(metrics.columns, index);
	  var metricsClone = shallowCloneObject(metrics);
	  metricsClone.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metricsClone.minColumnWidth);

	  metricsClone = ColumnUtils.spliceColumn(metricsClone, index, updatedColumn);

	  return recalculate(metricsClone);
	}

	function areColumnsImmutable(prevColumns, nextColumns) {
	  return typeof Immutable !== 'undefined' && prevColumns instanceof Immutable.List && nextColumns instanceof Immutable.List;
	}

	function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
	  var i = void 0;
	  var len = void 0;
	  var column = void 0;
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
	    if (prevColumn === undefined || !isSameColumn(prevColumn, column)) {
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

	function sameColumns(prevColumns, nextColumns, isSameColumn) {
	  if (areColumnsImmutable(prevColumns, nextColumns)) {
	    return prevColumns === nextColumns;
	  }

	  return compareEachColumn(prevColumns, nextColumns, isSameColumn);
	}

	module.exports = { recalculate: recalculate, resizeColumn: resizeColumn, sameColumn: sameColumn, sameColumns: sameColumns };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isValidElement = __webpack_require__(2).isValidElement;

	module.exports = function sameColumn(a, b) {
	  var k = void 0;

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
/* 10 */
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
	  },


	  // Logic extented to allow for functions to be passed down in column.editable
	  // this allows us to deicde whether we can be edting from a cell level
	  canEdit: function canEdit(col, rowData, enableCellSelect) {
	    if (col.editable != null && typeof col.editable === 'function') {
	      return enableCellSelect === true && col.editable(rowData);
	    }
	    return enableCellSelect === true && (!!col.editor || !!col.editable);
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var size = void 0;

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var shallowEqual = __webpack_require__(13);
	var HeaderCell = __webpack_require__(14);
	var getScrollbarSize = __webpack_require__(11);
	var ExcelColumn = __webpack_require__(15);
	var ColumnUtilsMixin = __webpack_require__(10);
	var SortableHeaderCell = __webpack_require__(18);
	var FilterableHeaderCell = __webpack_require__(19);
	var HeaderCellType = __webpack_require__(20);

	var PropTypes = React.PropTypes;

	var HeaderRowStyle = {
	  overflow: React.PropTypes.string,
	  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	  height: React.PropTypes.number,
	  position: React.PropTypes.string
	};

	var DEFINE_SORT = ['ASC', 'DESC', 'NONE'];

	var HeaderRow = React.createClass({
	  displayName: 'HeaderRow',

	  propTypes: {
	    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func.isRequired,
	    onColumnResizeEnd: PropTypes.func,
	    style: PropTypes.shape(HeaderRowStyle),
	    sortColumn: PropTypes.string,
	    sortDirection: React.PropTypes.oneOf(DEFINE_SORT),
	    cellRenderer: PropTypes.func,
	    headerCellRenderer: PropTypes.func,
	    filterable: PropTypes.bool,
	    onFilterChange: PropTypes.func,
	    resizing: PropTypes.object,
	    onScroll: PropTypes.func,
	    rowType: PropTypes.string
	  },

	  mixins: [ColumnUtilsMixin],

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style, this.props.style) || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	  },
	  getHeaderCellType: function getHeaderCellType(column) {
	    if (column.filterable) {
	      if (this.props.filterable) return HeaderCellType.FILTERABLE;
	    }

	    if (column.sortable) return HeaderCellType.SORTABLE;

	    return HeaderCellType.NONE;
	  },
	  getFilterableHeaderCell: function getFilterableHeaderCell() {
	    return React.createElement(FilterableHeaderCell, { onChange: this.props.onFilterChange });
	  },
	  getSortableHeaderCell: function getSortableHeaderCell(column) {
	    var sortDirection = this.props.sortColumn === column.key ? this.props.sortDirection : DEFINE_SORT.NONE;
	    return React.createElement(SortableHeaderCell, { columnKey: column.key, onSort: this.props.onSort, sortDirection: sortDirection });
	  },
	  getHeaderRenderer: function getHeaderRenderer(column) {
	    var renderer = void 0;
	    if (column.headerRenderer) {
	      renderer = column.headerRenderer;
	    } else {
	      var headerCellType = this.getHeaderCellType(column);
	      switch (headerCellType) {
	        case HeaderCellType.SORTABLE:
	          renderer = this.getSortableHeaderCell(column);
	          break;
	        case HeaderCellType.FILTERABLE:
	          renderer = this.getFilterableHeaderCell();
	          break;
	        default:
	          break;
	      }
	    }
	    return renderer;
	  },
	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  },
	  getCells: function getCells() {
	    var cells = [];
	    var lockedCells = [];

	    for (var i = 0, len = this.getSize(this.props.columns); i < len; i++) {
	      var column = this.getColumn(this.props.columns, i);
	      var _renderer = this.getHeaderRenderer(column);
	      if (column.key === 'select-row' && this.props.rowType === 'filter') {
	        _renderer = React.createElement('div', null);
	      }
	      var cell = React.createElement(HeaderCell, {
	        ref: i,
	        key: i,
	        height: this.props.height,
	        column: column,
	        renderer: _renderer,
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
	      _extends({}, this.props, { className: 'react-grid-HeaderRow', onScroll: this.props.onScroll }),
	      React.createElement(
	        'div',
	        { style: cellsStyle },
	        cells
	      )
	    );
	  }
	});

	module.exports = HeaderRow;

/***/ },
/* 13 */
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
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var joinClasses = __webpack_require__(6);
	var ExcelColumn = __webpack_require__(15);
	var ResizeHandle = __webpack_require__(16);
	var PropTypes = React.PropTypes;

	function simpleCellRenderer(objArgs) {
	  return React.createElement(
	    'div',
	    { className: 'widget-HeaderCell__value' },
	    objArgs.column.name
	  );
	}

	var HeaderCell = React.createClass({
	  displayName: 'HeaderCell',


	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.shape(ExcelColumn).isRequired,
	    onResize: PropTypes.func.isRequired,
	    height: PropTypes.number.isRequired,
	    onResizeEnd: PropTypes.func.isRequired,
	    className: PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },
	  getInitialState: function getInitialState() {
	    return { resizing: false };
	  },
	  onDragStart: function onDragStart(e) {
	    this.setState({ resizing: true });
	    // need to set dummy data for FF
	    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
	  },
	  onDrag: function onDrag(e) {
	    var resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
	    if (resize) {
	      var _width = this.getWidthFromMouseEvent(e);
	      if (_width > 0) {
	        resize(this.props.column, _width);
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
	    var left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
	    return right - left;
	  },
	  getCell: function getCell() {
	    if (React.isValidElement(this.props.renderer)) {
	      return React.cloneElement(this.props.renderer, { column: this.props.column, height: this.props.height });
	    }

	    return this.props.renderer({ column: this.props.column });
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
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = ReactDOM.findDOMNode(this);
	    node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	    node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	  },
	  render: function render() {
	    var resizeHandle = void 0;
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
	    className = joinClasses(className, this.props.className, this.props.column.cellClass);
	    var cell = this.getCell();
	    return React.createElement(
	      'div',
	      { className: className, style: this.getStyle() },
	      cell,
	      resizeHandle
	    );
	  }
	});

	module.exports = HeaderCell;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var ExcelColumnShape = {
	  name: React.PropTypes.node.isRequired,
	  key: React.PropTypes.string.isRequired,
	  width: React.PropTypes.number.isRequired,
	  filterable: React.PropTypes.bool
	};

	module.exports = ExcelColumnShape;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var Draggable = __webpack_require__(17);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var PropTypes = React.PropTypes;

	var Draggable = React.createClass({
	  displayName: 'Draggable',

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onDragStart: function onDragStart() {
	        return true;
	      },
	      onDragEnd: function onDragEnd() {},
	      onDrag: function onDrag() {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      drag: null
	    };
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.cleanUp();
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
	  cleanUp: function cleanUp() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	  },
	  render: function render() {
	    return React.createElement('div', _extends({}, this.props, {
	      onMouseDown: this.onMouseDown,
	      className: 'react-grid-HeaderCell__draggable' }));
	  }
	});

	module.exports = Draggable;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var joinClasses = __webpack_require__(6);
	var DEFINE_SORT = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	  NONE: 'NONE'
	};

	var SortableHeaderCell = React.createClass({
	  displayName: 'SortableHeaderCell',

	  propTypes: {
	    columnKey: React.PropTypes.string.isRequired,
	    column: React.PropTypes.shape({ name: React.PropTypes.node }),
	    onSort: React.PropTypes.func.isRequired,
	    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE'])
	  },

	  onClick: function onClick() {
	    var direction = void 0;
	    switch (this.props.sortDirection) {
	      default:
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
	      ASC: '9650',
	      DESC: '9660',
	      NONE: ''
	    };
	    return String.fromCharCode(unicodeKeys[this.props.sortDirection]);
	  },

	  render: function render() {
	    var className = joinClasses({
	      'react-grid-HeaderCell-sortable': true,
	      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
	      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
	    });

	    return React.createElement(
	      'div',
	      { className: className,
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ExcelColumn = __webpack_require__(15);

	var FilterableHeaderCell = React.createClass({
	  displayName: 'FilterableHeaderCell',


	  propTypes: {
	    onChange: React.PropTypes.func.isRequired,
	    column: React.PropTypes.shape(ExcelColumn)
	  },

	  getInitialState: function getInitialState() {
	    return { filterTerm: '' };
	  },
	  handleChange: function handleChange(e) {
	    var val = e.target.value;
	    this.setState({ filterTerm: val });
	    this.props.onChange({ filterTerm: val, columnKey: this.props.column.key });
	  },


	  renderInput: function renderInput() {
	    if (this.props.column.filterable === false) {
	      return React.createElement('span', null);
	    }

	    var inputKey = 'header-filter-' + this.props.column.key;
	    return React.createElement('input', { key: inputKey, type: 'text', className: 'form-control input-sm', placeholder: 'Search', value: this.state.filterTerm, onChange: this.handleChange });
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
	  }
	});

	module.exports = FilterableHeaderCell;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	var HeaderCellType = {
	  SORTABLE: 0,
	  FILTERABLE: 1,
	  NONE: 2,
	  CHECKBOX: 3
	};

	module.exports = HeaderCellType;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var Canvas = __webpack_require__(22);
	var ViewportScroll = __webpack_require__(96);
	var cellMetaDataShape = __webpack_require__(94);
	var PropTypes = React.PropTypes;

	var Viewport = React.createClass({
	  displayName: 'Viewport',

	  mixins: [ViewportScroll],

	  propTypes: {
	    rowOffsetHeight: PropTypes.number.isRequired,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	    columnMetrics: PropTypes.object.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    selectedRows: PropTypes.array,
	    expandedRows: PropTypes.array,
	    rowRenderer: PropTypes.func,
	    rowsCount: PropTypes.number.isRequired,
	    rowHeight: PropTypes.number.isRequired,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    minHeight: PropTypes.number,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    rowKey: PropTypes.string.isRequired,
	    rowScrollTimeout: PropTypes.number,
	    contextMenu: PropTypes.element
	  },

	  onScroll: function onScroll(scroll) {
	    this.updateScroll(scroll.scrollTop, scroll.scrollLeft, this.state.height, this.props.rowHeight, this.props.rowsCount);

	    if (this.props.onScroll) {
	      this.props.onScroll({ scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft });
	    }
	  },
	  getScroll: function getScroll() {
	    return this.refs.canvas.getScroll();
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
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
	        rowKey: this.props.rowKey,
	        totalWidth: this.props.totalWidth,
	        width: this.props.columnMetrics.width,
	        rowGetter: this.props.rowGetter,
	        rowsCount: this.props.rowsCount,
	        selectedRows: this.props.selectedRows,
	        expandedRows: this.props.expandedRows,
	        columns: this.props.columnMetrics.columns,
	        rowRenderer: this.props.rowRenderer,
	        displayStart: this.state.displayStart,
	        displayEnd: this.state.displayEnd,
	        cellMetaData: this.props.cellMetaData,
	        height: this.state.height,
	        rowHeight: this.props.rowHeight,
	        onScroll: this.onScroll,
	        onRows: this.props.onRows,
	        rowScrollTimeout: this.props.rowScrollTimeout,
	        contextMenu: this.props.contextMenu
	      })
	    );
	  }
	});

	module.exports = Viewport;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _shallowEqual = __webpack_require__(13);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _RowsContainer = __webpack_require__(23);

	var _RowsContainer2 = _interopRequireDefault(_RowsContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var joinClasses = __webpack_require__(6);
	var PropTypes = React.PropTypes;
	var ScrollShim = __webpack_require__(86);
	var Row = __webpack_require__(87);
	var cellMetaDataShape = __webpack_require__(94);


	var Canvas = React.createClass({
	  displayName: 'Canvas',

	  mixins: [ScrollShim],

	  propTypes: {
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    height: PropTypes.number.isRequired,
	    width: PropTypes.number,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    style: PropTypes.string,
	    className: PropTypes.string,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    rowsCount: PropTypes.number.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.array.isRequired]),
	    expandedRows: PropTypes.array,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	    cellMetaData: PropTypes.shape(cellMetaDataShape).isRequired,
	    selectedRows: PropTypes.array,
	    rowKey: React.PropTypes.string,
	    rowScrollTimeout: React.PropTypes.number,
	    contextMenu: PropTypes.element
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowRenderer: Row,
	      onRows: function onRows() {},
	      selectedRows: [],
	      rowScrollTimeout: 0
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd,
	      scrollingTimeout: null
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
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.displayStart !== this.state.displayStart || nextProps.displayEnd !== this.state.displayEnd) {
	      this.setState({
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd
	      });
	    }
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var shouldUpdate = nextState.displayStart !== this.state.displayStart || nextState.displayEnd !== this.state.displayEnd || nextState.scrollingTimeout !== this.state.scrollingTimeout || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || !(0, _shallowEqual2['default'])(nextProps.style, this.props.style);
	    return shouldUpdate;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
	      this.setScrollLeft(this._scroll.scrollLeft);
	    }
	    this.onRows();
	  },
	  onRows: function onRows() {
	    if (this._currentRowsRange !== { start: 0, end: 0 }) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = { start: 0, end: 0 };
	    }
	  },
	  onScroll: function onScroll(e) {
	    var _this = this;

	    if (ReactDOM.findDOMNode(this) !== e.target) {
	      return;
	    }
	    this.appendScrollShim();
	    var scrollLeft = e.target.scrollLeft;
	    var scrollTop = e.target.scrollTop;
	    var scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
	    // check how far we have scrolled, and if this means we are being taken out of range
	    var scrollYRange = Math.abs(this._scroll.scrollTop - scroll.scrollTop) / this.props.rowHeight;
	    var scrolledOutOfRange = scrollYRange > this.props.displayEnd - this.props.displayStart;

	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	    // if we go out of range, we queue the actual render, just rendering cheap placeholders
	    // avoiding rendering anything expensive while a user scrolls down
	    if (scrolledOutOfRange && this.props.rowScrollTimeout > 0) {
	      var scrollTO = this.state.scrollingTimeout;
	      if (scrollTO) {
	        clearTimeout(scrollTO);
	      }
	      // queue up, and set state to clear the TO so we render the rows (not placeholders)
	      scrollTO = setTimeout(function () {
	        if (_this.state.scrollingTimeout !== null) {
	          _this.setState({ scrollingTimeout: null });
	        }
	      }, this.props.rowScrollTimeout);

	      this.setState({ scrollingTimeout: scrollTO });
	    }
	  },
	  getRows: function getRows(displayStart, displayEnd) {
	    this._currentRowsRange = { start: displayStart, end: displayEnd };
	    if (Array.isArray(this.props.rowGetter)) {
	      return this.props.rowGetter.slice(displayStart, displayEnd);
	    }

	    var rows = [];
	    for (var i = displayStart; i < displayEnd; i++) {
	      rows.push(this.props.rowGetter(i));
	    }
	    return rows;
	  },
	  getScrollbarWidth: function getScrollbarWidth() {
	    var scrollbarWidth = 0;
	    // Get the scrollbar width
	    var canvas = ReactDOM.findDOMNode(this);
	    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
	    return scrollbarWidth;
	  },
	  getScroll: function getScroll() {
	    var _ReactDOM$findDOMNode = ReactDOM.findDOMNode(this);

	    var scrollTop = _ReactDOM$findDOMNode.scrollTop;
	    var scrollLeft = _ReactDOM$findDOMNode.scrollLeft;

	    return { scrollTop: scrollTop, scrollLeft: scrollLeft };
	  },
	  isRowSelected: function isRowSelected(row) {
	    var _this2 = this;

	    var selectedRows = this.props.selectedRows.filter(function (r) {
	      var rowKeyValue = row.get ? row.get(_this2.props.rowKey) : row[_this2.props.rowKey];
	      return r[_this2.props.rowKey] === rowKeyValue;
	    });
	    return selectedRows.length > 0 && selectedRows[0].isSelected;
	  },


	  _currentRowsLength: 0,
	  _currentRowsRange: { start: 0, end: 0 },
	  _scroll: { scrollTop: 0, scrollLeft: 0 },

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
	  renderRow: function renderRow(props) {
	    if (this.state.scrollingTimeout !== null) {
	      // in the midst of a rapid scroll, so we render placeholders
	      // the actual render is then queued (through a timeout)
	      // this avoids us redering a bunch of rows that a user is trying to scroll past
	      return this.renderScrollingPlaceholder(props);
	    }
	    var RowsRenderer = this.props.rowRenderer;
	    if (typeof RowsRenderer === 'function') {
	      return React.createElement(RowsRenderer, props);
	    }

	    if (React.isValidElement(this.props.rowRenderer)) {
	      return React.cloneElement(this.props.rowRenderer, props);
	    }
	  },
	  renderScrollingPlaceholder: function renderScrollingPlaceholder(props) {
	    // here we are just rendering empty cells
	    // we may want to allow a user to inject this, and/or just render the cells that are in view
	    // for now though we essentially are doing a (very lightweight) row + cell with empty content
	    var styles = {
	      row: { height: props.height, overflow: 'hidden' },
	      cell: { height: props.height, position: 'absolute' },
	      placeholder: { backgroundColor: 'rgba(211, 211, 211, 0.45)', width: '60%', height: Math.floor(props.height * 0.3) }
	    };
	    return React.createElement(
	      'div',
	      { key: props.key, style: styles.row, className: 'react-grid-Row' },
	      this.props.columns.map(function (col, idx) {
	        return React.createElement(
	          'div',
	          { style: Object.assign(styles.cell, { width: col.width, left: col.left }), key: idx, className: 'react-grid-Cell' },
	          React.createElement('div', { style: Object.assign(styles.placeholder, { width: Math.floor(col.width * 0.6) }) })
	        );
	      })
	    );
	  },
	  renderPlaceholder: function renderPlaceholder(key, height) {
	    // just renders empty cells
	    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	    return React.createElement(
	      'div',
	      { key: key, style: { height: height } },
	      this.props.columns.map(function (column, idx) {
	        return React.createElement('div', { style: { width: column.width }, key: idx });
	      })
	    );
	  },
	  render: function render() {
	    var _this3 = this;

	    var displayStart = this.state.displayStart;
	    var displayEnd = this.state.displayEnd;
	    var rowHeight = this.props.rowHeight;
	    var length = this.props.rowsCount;

	    var rows = this.getRows(displayStart, displayEnd).map(function (row, idx) {
	      return _this3.renderRow({
	        key: displayStart + idx,
	        ref: idx,
	        idx: displayStart + idx,
	        row: row,
	        height: rowHeight,
	        columns: _this3.props.columns,
	        isSelected: _this3.isRowSelected(row),
	        expandedRows: _this3.props.expandedRows,
	        cellMetaData: _this3.props.cellMetaData
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
	      width: this.props.totalWidth,
	      height: this.props.height,
	      transform: 'translate3d(0, 0, 0)'
	    };

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        onScroll: this.onScroll,
	        className: joinClasses('react-grid-Canvas', this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) },
	      React.createElement(_RowsContainer2['default'], {
	        width: this.props.width,
	        rows: rows,
	        contextMenu: this.props.contextMenu,
	        rowIdx: this.props.cellMetaData.selected.rowIdx,
	        idx: this.props.cellMetaData.selected.idx })
	    );
	  }
	});

	module.exports = Canvas;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ContextMenuRowsContainer = exports.SimpleRowsContainer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactContextmenu = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RowsContainer = function (_React$Component) {
	  _inherits(RowsContainer, _React$Component);

	  function RowsContainer() {
	    _classCallCheck(this, RowsContainer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RowsContainer).apply(this, arguments));
	  }

	  _createClass(RowsContainer, [{
	    key: 'hasContextMenu',
	    value: function hasContextMenu() {
	      return this.props.contextMenu && _react2['default'].isValidElement(this.props.contextMenu);
	    }
	  }, {
	    key: 'renderRowsWithContextMenu',
	    value: function renderRowsWithContextMenu() {
	      var newProps = { rowIdx: this.props.rowIdx, idx: this.props.idx };
	      var contextMenu = _react2['default'].cloneElement(this.props.contextMenu, newProps);
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(ContextMenuRowsContainer, this.props),
	        contextMenu
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.hasContextMenu() ? this.renderRowsWithContextMenu() : _react2['default'].createElement(SimpleRowsContainer, this.props);
	    }
	  }]);

	  return RowsContainer;
	}(_react2['default'].Component);

	RowsContainer.propTypes = {
	  contextMenu: _react.PropTypes.element,
	  rowIdx: _react.PropTypes.number,
	  idx: _react.PropTypes.number
	};

	var SimpleRowsContainer = function (_React$Component2) {
	  _inherits(SimpleRowsContainer, _React$Component2);

	  function SimpleRowsContainer() {
	    _classCallCheck(this, SimpleRowsContainer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleRowsContainer).apply(this, arguments));
	  }

	  _createClass(SimpleRowsContainer, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { style: { width: this.props.width, overflow: 'hidden' } },
	        this.props.rows
	      );
	    }
	  }]);

	  return SimpleRowsContainer;
	}(_react2['default'].Component);

	SimpleRowsContainer.propTypes = {
	  width: _react.PropTypes.number,
	  rows: _react.PropTypes.array
	};

	var ContextMenuRowsContainer = (0, _reactContextmenu.ContextMenuLayer)('reactDataGridContextMenu')(SimpleRowsContainer);

	exports['default'] = RowsContainer;
	exports.SimpleRowsContainer = SimpleRowsContainer;
	exports.ContextMenuRowsContainer = ContextMenuRowsContainer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _contextMenu = __webpack_require__(25);

	Object.defineProperty(exports, "ContextMenu", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_contextMenu).default;
	  }
	});

	var _contextmenuLayer = __webpack_require__(78);

	Object.defineProperty(exports, "ContextMenuLayer", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_contextmenuLayer).default;
	  }
	});

	var _menuItem = __webpack_require__(81);

	Object.defineProperty(exports, "MenuItem", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_menuItem).default;
	  }
	});

	var _monitor = __webpack_require__(44);

	Object.defineProperty(exports, "monitor", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_monitor).default;
	  }
	});

	var _submenu = __webpack_require__(83);

	Object.defineProperty(exports, "SubMenu", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_submenu).default;
	  }
	});

	var _connect = __webpack_require__(85);

	Object.defineProperty(exports, "connect", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_connect).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(26);

	var _store2 = _interopRequireDefault(_store);

	var _wrapper = __webpack_require__(43);

	var _wrapper2 = _interopRequireDefault(_wrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;


	var ContextMenu = _react2.default.createClass({
	    displayName: "ContextMenu",
	    propTypes: {
	        identifier: PropTypes.string.isRequired
	    },
	    getInitialState: function getInitialState() {
	        return _store2.default.getState();
	    },
	    componentDidMount: function componentDidMount() {
	        this.unsubscribe = _store2.default.subscribe(this.handleUpdate);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        if (this.unsubscribe) this.unsubscribe();
	    },
	    handleUpdate: function handleUpdate() {
	        this.setState(this.getInitialState());
	    },
	    render: function render() {
	        return _react2.default.createElement(_wrapper2.default, _extends({}, this.props, this.state));
	    }
	});

	exports.default = ContextMenu;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(27);

	var _reducers = __webpack_require__(41);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.createStore)(_reducers2.default);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(29);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(36);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(38);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(39);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(40);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(37);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ },
/* 28 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(30);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(34);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(31),
	    isHostObject = __webpack_require__(32),
	    isObjectLike = __webpack_require__(33);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(35)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(29);

	var _isPlainObject = __webpack_require__(30);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(37);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(40);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
	    var action = arguments[1];

	    return action.type === "SET_PARAMS" ? (0, _objectAssign2.default)({}, state, action.data) : state;
	};

	var _objectAssign = __webpack_require__(42);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultState = {
	    x: 0,
	    y: 0,
	    isVisible: false,
	    currentItem: {}
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _monitor = __webpack_require__(44);

	var _monitor2 = _interopRequireDefault(_monitor);

	var _Modal = __webpack_require__(45);

	var _Modal2 = _interopRequireDefault(_Modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modalStyle = {
	    position: "fixed",
	    zIndex: 1040,
	    top: 0, bottom: 0, left: 0, right: 0
	},
	    backdropStyle = _extends({}, modalStyle, {
	    zIndex: "auto",
	    backgroundColor: "transparent"
	}),
	    menuStyles = {
	    position: "fixed",
	    zIndex: "auto"
	};

	var ContextMenuWrapper = _react2.default.createClass({
	    displayName: "ContextMenuWrapper",
	    getInitialState: function getInitialState() {
	        return {
	            left: 0,
	            top: 0
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        if (nextProps.isVisible === nextProps.identifier) {
	            var wrapper = window.requestAnimationFrame || setTimeout;

	            wrapper(function () {
	                return _this.setState(_this.getMenuPosition(nextProps.x, nextProps.y));
	            });
	        }
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	        return this.props.isVisible !== nextProps.visible;
	    },
	    getMenuPosition: function getMenuPosition(x, y) {
	        var scrollX = document.documentElement.scrollTop;
	        var scrollY = document.documentElement.scrollLeft;
	        var _window = window;
	        var innerWidth = _window.innerWidth;
	        var innerHeight = _window.innerHeight;
	        var rect = this.menu.getBoundingClientRect();
	        var menuStyles = {
	            top: y + scrollY,
	            left: x + scrollX
	        };

	        if (y + rect.height > innerHeight) {
	            menuStyles.top -= rect.height;
	        }

	        if (x + rect.width > innerWidth) {
	            menuStyles.left -= rect.width;
	        }

	        return menuStyles;
	    },
	    render: function render() {
	        var _this2 = this;

	        var _props = this.props;
	        var isVisible = _props.isVisible;
	        var identifier = _props.identifier;
	        var children = _props.children;


	        var style = _extends({}, menuStyles, this.state);

	        return _react2.default.createElement(
	            _Modal2.default,
	            { style: modalStyle, backdropStyle: backdropStyle,
	                show: isVisible === identifier, onHide: function onHide() {
	                    return _monitor2.default.hideMenu();
	                } },
	            _react2.default.createElement(
	                "nav",
	                { ref: function ref(c) {
	                        return _this2.menu = c;
	                    }, style: style,
	                    className: "react-context-menu" },
	                children
	            )
	        );
	    }
	});

	exports.default = ContextMenuWrapper;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _store = __webpack_require__(26);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    getItem: function getItem() {
	        return _store2.default.getState().currentItem;
	    },
	    getPosition: function getPosition() {
	        var _store$getState = _store2.default.getState();

	        var x = _store$getState.x;
	        var y = _store$getState.y;


	        return { x: x, y: y };
	    },
	    hideMenu: function hideMenu() {
	        _store2.default.dispatch({
	            type: "SET_PARAMS",
	            data: {
	                isVisible: false,
	                currentItem: {}
	            }
	        });
	    }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable react/prop-types */
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(46);

	var _warning2 = _interopRequireDefault(_warning);

	var _reactPropTypesLibMountable = __webpack_require__(47);

	var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);

	var _reactPropTypesLibElementType = __webpack_require__(49);

	var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

	var _Portal = __webpack_require__(50);

	var _Portal2 = _interopRequireDefault(_Portal);

	var _ModalManager = __webpack_require__(54);

	var _ModalManager2 = _interopRequireDefault(_ModalManager);

	var _utilsOwnerDocument = __webpack_require__(51);

	var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);

	var _utilsAddEventListener = __webpack_require__(72);

	var _utilsAddEventListener2 = _interopRequireDefault(_utilsAddEventListener);

	var _utilsAddFocusListener = __webpack_require__(75);

	var _utilsAddFocusListener2 = _interopRequireDefault(_utilsAddFocusListener);

	var _domHelpersUtilInDOM = __webpack_require__(68);

	var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);

	var _domHelpersActiveElement = __webpack_require__(76);

	var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);

	var _domHelpersQueryContains = __webpack_require__(77);

	var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

	var _utilsGetContainer = __webpack_require__(53);

	var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);

	var modalManager = new _ModalManager2['default']();

	/**
	 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
	 * The Modal component renders its `children` node in front of a backdrop component.
	 *
	 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
	 *
	 * - Manages dialog stacking when one-at-a-time just isn't enough.
	 * - Creates a backdrop, for disabling interaction below the modal.
	 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
	 * - It disables scrolling of the page content while open.
	 * - Adds the appropriate ARIA roles are automatically.
	 * - Easily pluggable animations via a `<Transition/>` component.
	 *
	 * Note that, in the same way the backdrop element prevents users from clicking or interacting
	 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
	 * interact with page content while the Modal is open. To do this, we use a common technique of applying
	 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
	 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
	 * React hierarchy (such as the default: document.body).
	 */
	var Modal = _react2['default'].createClass({
	  displayName: 'Modal',

	  propTypes: _extends({}, _Portal2['default'].propTypes, {

	    /**
	     * Set the visibility of the Modal
	     */
	    show: _react2['default'].PropTypes.bool,

	    /**
	     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
	     *
	     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
	     * page content can be placed behind a virtual backdrop as well as a visual one.
	     */
	    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func]),

	    /**
	     * A callback fired when the Modal is opening.
	     */
	    onShow: _react2['default'].PropTypes.func,

	    /**
	     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
	     *
	     * The `onHide` callback only signals intent from the Modal,
	     * you must actually set the `show` prop to `false` for the Modal to close.
	     */
	    onHide: _react2['default'].PropTypes.func,

	    /**
	     * Include a backdrop component.
	     */
	    backdrop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['static'])]),

	    /**
	     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
	     */
	    onEscapeKeyUp: _react2['default'].PropTypes.func,

	    /**
	     * A callback fired when the backdrop, if specified, is clicked.
	     */
	    onBackdropClick: _react2['default'].PropTypes.func,

	    /**
	     * A style object for the backdrop component.
	     */
	    backdropStyle: _react2['default'].PropTypes.object,

	    /**
	     * A css class or classes for the backdrop component.
	     */
	    backdropClassName: _react2['default'].PropTypes.string,

	    /**
	     * A css class or set of classes applied to the modal container when the modal is open,
	     * and removed when it is closed.
	     */
	    containerClassName: _react2['default'].PropTypes.string,

	    /**
	     * Close the modal when escape key is pressed
	     */
	    keyboard: _react2['default'].PropTypes.bool,

	    /**
	     * A `<Transition/>` component to use for the dialog and backdrop components.
	     */
	    transition: _reactPropTypesLibElementType2['default'],

	    /**
	     * The `timeout` of the dialog transition if specified. This number is used to ensure that
	     * transition callbacks are always fired, even if browser transition events are canceled.
	     *
	     * See the Transition `timeout` prop for more infomation.
	     */
	    dialogTransitionTimeout: _react2['default'].PropTypes.number,

	    /**
	     * The `timeout` of the backdrop transition if specified. This number is used to
	     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
	     *
	     * See the Transition `timeout` prop for more infomation.
	     */
	    backdropTransitionTimeout: _react2['default'].PropTypes.number,

	    /**
	     * When `true` The modal will automatically shift focus to itself when it opens, and
	     * replace it to the last focused element when it closes. This also
	     * works correctly with any Modal children that have the `autoFocus` prop.
	     *
	     * Generally this should never be set to `false` as it makes the Modal less
	     * accessible to assistive technologies, like screen readers.
	     */
	    autoFocus: _react2['default'].PropTypes.bool,

	    /**
	     * When `true` The modal will prevent focus from leaving the Modal while open.
	     *
	     * Generally this should never be set to `false` as it makes the Modal less
	     * accessible to assistive technologies, like screen readers.
	     */
	    enforceFocus: _react2['default'].PropTypes.bool,

	    /**
	     * Callback fired before the Modal transitions in
	     */
	    onEnter: _react2['default'].PropTypes.func,

	    /**
	     * Callback fired as the Modal begins to transition in
	     */
	    onEntering: _react2['default'].PropTypes.func,

	    /**
	     * Callback fired after the Modal finishes transitioning in
	     */
	    onEntered: _react2['default'].PropTypes.func,

	    /**
	     * Callback fired right before the Modal transitions out
	     */
	    onExit: _react2['default'].PropTypes.func,

	    /**
	     * Callback fired as the Modal begins to transition out
	     */
	    onExiting: _react2['default'].PropTypes.func,

	    /**
	     * Callback fired after the Modal finishes transitioning out
	     */
	    onExited: _react2['default'].PropTypes.func

	  }),

	  getDefaultProps: function getDefaultProps() {
	    var noop = function noop() {};

	    return {
	      show: false,
	      backdrop: true,
	      keyboard: true,
	      autoFocus: true,
	      enforceFocus: true,
	      onHide: noop
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { exited: !this.props.show };
	  },

	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var Transition = _props.transition;
	    var backdrop = _props.backdrop;
	    var dialogTransitionTimeout = _props.dialogTransitionTimeout;

	    var props = _objectWithoutProperties(_props, ['children', 'transition', 'backdrop', 'dialogTransitionTimeout']);

	    var onExit = props.onExit;
	    var onExiting = props.onExiting;
	    var onEnter = props.onEnter;
	    var onEntering = props.onEntering;
	    var onEntered = props.onEntered;

	    var show = !!props.show;
	    var dialog = _react2['default'].Children.only(this.props.children);

	    var mountModal = show || Transition && !this.state.exited;

	    if (!mountModal) {
	      return null;
	    }

	    var _dialog$props = dialog.props;
	    var role = _dialog$props.role;
	    var tabIndex = _dialog$props.tabIndex;

	    if (role === undefined || tabIndex === undefined) {
	      dialog = _react.cloneElement(dialog, {
	        role: role === undefined ? 'document' : role,
	        tabIndex: tabIndex == null ? '-1' : tabIndex
	      });
	    }

	    if (Transition) {
	      dialog = _react2['default'].createElement(
	        Transition,
	        {
	          transitionAppear: true,
	          unmountOnExit: true,
	          'in': show,
	          timeout: dialogTransitionTimeout,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: this.handleHidden,
	          onEnter: onEnter,
	          onEntering: onEntering,
	          onEntered: onEntered
	        },
	        dialog
	      );
	    }

	    return _react2['default'].createElement(
	      _Portal2['default'],
	      {
	        ref: this.setMountNode,
	        container: props.container
	      },
	      _react2['default'].createElement(
	        'div',
	        {
	          ref: 'modal',
	          role: props.role || 'dialog',
	          style: props.style,
	          className: props.className
	        },
	        backdrop && this.renderBackdrop(),
	        dialog
	      )
	    );
	  },

	  renderBackdrop: function renderBackdrop() {
	    var _props2 = this.props;
	    var Transition = _props2.transition;
	    var backdropTransitionTimeout = _props2.backdropTransitionTimeout;

	    var backdrop = _react2['default'].createElement('div', { ref: 'backdrop',
	      style: this.props.backdropStyle,
	      className: this.props.backdropClassName,
	      onClick: this.handleBackdropClick
	    });

	    if (Transition) {
	      backdrop = _react2['default'].createElement(
	        Transition,
	        { transitionAppear: true,
	          'in': this.props.show,
	          timeout: backdropTransitionTimeout
	        },
	        backdrop
	      );
	    }

	    return backdrop;
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.show) {
	      this.setState({ exited: false });
	    } else if (!nextProps.transition) {
	      // Otherwise let handleHidden take care of marking exited.
	      this.setState({ exited: true });
	    }
	  },

	  componentWillUpdate: function componentWillUpdate(nextProps) {
	    if (nextProps.show) {
	      this.checkForFocus();
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.show) {
	      this.onShow();
	    }
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var transition = this.props.transition;

	    if (prevProps.show && !this.props.show && !transition) {
	      // Otherwise handleHidden will call this.
	      this.onHide();
	    } else if (!prevProps.show && this.props.show) {
	      this.onShow();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    var _props3 = this.props;
	    var show = _props3.show;
	    var transition = _props3.transition;

	    if (show || transition && !this.state.exited) {
	      this.onHide();
	    }
	  },

	  onShow: function onShow() {
	    var doc = _utilsOwnerDocument2['default'](this);
	    var container = _utilsGetContainer2['default'](this.props.container, doc.body);

	    modalManager.add(this, container, this.props.containerClassName);

	    this._onDocumentKeyupListener = _utilsAddEventListener2['default'](doc, 'keyup', this.handleDocumentKeyUp);

	    this._onFocusinListener = _utilsAddFocusListener2['default'](this.enforceFocus);

	    this.focus();

	    if (this.props.onShow) {
	      this.props.onShow();
	    }
	  },

	  onHide: function onHide() {
	    modalManager.remove(this);

	    this._onDocumentKeyupListener.remove();

	    this._onFocusinListener.remove();

	    this.restoreLastFocus();
	  },

	  setMountNode: function setMountNode(ref) {
	    this.mountNode = ref ? ref.getMountNode() : ref;
	  },

	  handleHidden: function handleHidden() {
	    this.setState({ exited: true });
	    this.onHide();

	    if (this.props.onExited) {
	      var _props4;

	      (_props4 = this.props).onExited.apply(_props4, arguments);
	    }
	  },

	  handleBackdropClick: function handleBackdropClick(e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }

	    if (this.props.onBackdropClick) {
	      this.props.onBackdropClick(e);
	    }

	    if (this.props.backdrop === true) {
	      this.props.onHide();
	    }
	  },

	  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
	    if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()) {
	      if (this.props.onEscapeKeyUp) {
	        this.props.onEscapeKeyUp(e);
	      }
	      this.props.onHide();
	    }
	  },

	  checkForFocus: function checkForFocus() {
	    if (_domHelpersUtilInDOM2['default']) {
	      this.lastFocus = _domHelpersActiveElement2['default']();
	    }
	  },

	  focus: function focus() {
	    var autoFocus = this.props.autoFocus;
	    var modalContent = this.getDialogElement();
	    var current = _domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));
	    var focusInModal = current && _domHelpersQueryContains2['default'](modalContent, current);

	    if (modalContent && autoFocus && !focusInModal) {
	      this.lastFocus = current;

	      if (!modalContent.hasAttribute('tabIndex')) {
	        modalContent.setAttribute('tabIndex', -1);
	        _warning2['default'](false, 'The modal content node does not accept focus. ' + 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
	      }

	      modalContent.focus();
	    }
	  },

	  restoreLastFocus: function restoreLastFocus() {
	    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	    if (this.lastFocus && this.lastFocus.focus) {
	      this.lastFocus.focus();
	      this.lastFocus = null;
	    }
	  },

	  enforceFocus: function enforceFocus() {
	    var enforceFocus = this.props.enforceFocus;

	    if (!enforceFocus || !this.isMounted() || !this.isTopModal()) {
	      return;
	    }

	    var active = _domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));
	    var modal = this.getDialogElement();

	    if (modal && modal !== active && !_domHelpersQueryContains2['default'](modal, active)) {
	      modal.focus();
	    }
	  },

	  //instead of a ref, which might conflict with one the parent applied.
	  getDialogElement: function getDialogElement() {
	    var node = this.refs.modal;
	    return node && node.lastChild;
	  },

	  isTopModal: function isTopModal() {
	    return modalManager.isTopModal(this);
	  }

	});

	Modal.manager = modalManager;

	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _common = __webpack_require__(48);

	/**
	 * Checks whether a prop provides a DOM element
	 *
	 * The element can be provided in two forms:
	 * - Directly passed
	 * - Or passed an object that has a `render` method
	 *
	 * @param props
	 * @param propName
	 * @param componentName
	 * @returns {Error|undefined}
	 */

	function validate(props, propName, componentName) {
	  if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
	    return new Error(_common.errMsg(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
	  }
	}

	exports['default'] = _common.createChainableTypeChecker(validate);
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.errMsg = errMsg;
	exports.createChainableTypeChecker = createChainableTypeChecker;

	function errMsg(props, propName, componentName, msgContinuation) {
	  return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
	}

	/**
	 * Create chain-able isRequired validator
	 *
	 * Largely copied directly from:
	 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
	 */

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName) {
	    componentName = componentName || '<<anonymous>>';
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
	      }
	    } else {
	      return validate(props, propName, componentName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _common = __webpack_require__(48);

	/**
	 * Checks whether a prop provides a type of element.
	 *
	 * The type of element can be provided in two forms:
	 * - tag name (string)
	 * - a return value of React.createClass(...)
	 *
	 * @param props
	 * @param propName
	 * @param componentName
	 * @returns {Error|undefined}
	 */

	function validate(props, propName, componentName) {
	  var errBeginning = _common.errMsg(props, propName, componentName, '. Expected an Element `type`');

	  if (typeof props[propName] !== 'function') {
	    if (_react2['default'].isValidElement(props[propName])) {
	      return new Error(errBeginning + ', not an actual Element');
	    }

	    if (typeof props[propName] !== 'string') {
	      return new Error(errBeginning + ' such as a tag name or return value of React.createClass(...)');
	    }
	  }
	}

	exports['default'] = _common.createChainableTypeChecker(validate);
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactPropTypesLibMountable = __webpack_require__(47);

	var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);

	var _utilsOwnerDocument = __webpack_require__(51);

	var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);

	var _utilsGetContainer = __webpack_require__(53);

	var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);

	/**
	 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
	 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
	 * The children of `<Portal/>` component will be appended to the `container` specified.
	 */
	var Portal = _react2['default'].createClass({

	  displayName: 'Portal',

	  propTypes: {
	    /**
	     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
	     * appended to it.
	     */
	    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func])
	  },

	  componentDidMount: function componentDidMount() {
	    this._renderOverlay();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._renderOverlay();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this._overlayTarget && nextProps.container !== this.props.container) {
	      this._portalContainerNode.removeChild(this._overlayTarget);
	      this._portalContainerNode = _utilsGetContainer2['default'](nextProps.container, _utilsOwnerDocument2['default'](this).body);
	      this._portalContainerNode.appendChild(this._overlayTarget);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._unrenderOverlay();
	    this._unmountOverlayTarget();
	  },

	  _mountOverlayTarget: function _mountOverlayTarget() {
	    if (!this._overlayTarget) {
	      this._overlayTarget = document.createElement('div');
	      this._portalContainerNode = _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);
	      this._portalContainerNode.appendChild(this._overlayTarget);
	    }
	  },

	  _unmountOverlayTarget: function _unmountOverlayTarget() {
	    if (this._overlayTarget) {
	      this._portalContainerNode.removeChild(this._overlayTarget);
	      this._overlayTarget = null;
	    }
	    this._portalContainerNode = null;
	  },

	  _renderOverlay: function _renderOverlay() {

	    var overlay = !this.props.children ? null : _react2['default'].Children.only(this.props.children);

	    // Save reference for future access.
	    if (overlay !== null) {
	      this._mountOverlayTarget();
	      this._overlayInstance = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, overlay, this._overlayTarget);
	    } else {
	      // Unrender if the component is null for transitions to null
	      this._unrenderOverlay();
	      this._unmountOverlayTarget();
	    }
	  },

	  _unrenderOverlay: function _unrenderOverlay() {
	    if (this._overlayTarget) {
	      _reactDom2['default'].unmountComponentAtNode(this._overlayTarget);
	      this._overlayInstance = null;
	    }
	  },

	  render: function render() {
	    return null;
	  },

	  getMountNode: function getMountNode() {
	    return this._overlayTarget;
	  },

	  getOverlayDOMNode: function getOverlayDOMNode() {
	    if (!this.isMounted()) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
	    }

	    if (this._overlayInstance) {
	      if (this._overlayInstance.getWrappedDOMNode) {
	        return this._overlayInstance.getWrappedDOMNode();
	      } else {
	        return _reactDom2['default'].findDOMNode(this._overlayInstance);
	      }
	    }

	    return null;
	  }

	});

	exports['default'] = Portal;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _domHelpersOwnerDocument = __webpack_require__(52);

	var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

	exports['default'] = function (componentOrElement) {
	  return _domHelpersOwnerDocument2['default'](_reactDom2['default'].findDOMNode(componentOrElement));
	};

	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = ownerDocument;

	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}

	module.exports = exports["default"];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = getContainer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function getContainer(container, defaultContainer) {
	  container = typeof container === 'function' ? container() : container;
	  return _reactDom2['default'].findDOMNode(container) || defaultContainer;
	}

	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _domHelpersStyle = __webpack_require__(55);

	var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);

	var _domHelpersClass = __webpack_require__(63);

	var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);

	var _domHelpersUtilScrollbarSize = __webpack_require__(67);

	var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

	var _utilsIsOverflowing = __webpack_require__(69);

	var _utilsIsOverflowing2 = _interopRequireDefault(_utilsIsOverflowing);

	var _utilsManageAriaHidden = __webpack_require__(71);

	function findIndexOf(arr, cb) {
	  var idx = -1;
	  arr.some(function (d, i) {
	    if (cb(d, i)) {
	      idx = i;
	      return true;
	    }
	  });
	  return idx;
	}

	function findContainer(data, modal) {
	  return findIndexOf(data, function (d) {
	    return d.modals.indexOf(modal) !== -1;
	  });
	}

	/**
	 * Proper state managment for containers and the modals in those containers.
	 *
	 * @internal Used by the Modal to ensure proper styling of containers.
	 */

	var ModalManager = (function () {
	  function ModalManager() {
	    var hideSiblingNodes = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	    _classCallCheck(this, ModalManager);

	    this.hideSiblingNodes = hideSiblingNodes;
	    this.modals = [];
	    this.containers = [];
	    this.data = [];
	  }

	  ModalManager.prototype.add = function add(modal, container, className) {
	    var modalIdx = this.modals.indexOf(modal);
	    var containerIdx = this.containers.indexOf(container);

	    if (modalIdx !== -1) {
	      return modalIdx;
	    }

	    modalIdx = this.modals.length;
	    this.modals.push(modal);

	    if (this.hideSiblingNodes) {
	      _utilsManageAriaHidden.hideSiblings(container, modal.mountNode);
	    }

	    if (containerIdx !== -1) {
	      this.data[containerIdx].modals.push(modal);
	      return modalIdx;
	    }

	    var data = {
	      modals: [modal],
	      //right now only the first modal of a container will have its classes applied
	      classes: className ? className.split(/\s+/) : [],
	      //we are only interested in the actual `style` here becasue we will override it
	      style: {
	        overflow: container.style.overflow,
	        paddingRight: container.style.paddingRight
	      }
	    };

	    var style = { overflow: 'hidden' };

	    data.overflowing = _utilsIsOverflowing2['default'](container);

	    if (data.overflowing) {
	      // use computed style, here to get the real padding
	      // to add our scrollbar width
	      style.paddingRight = parseInt(_domHelpersStyle2['default'](container, 'paddingRight') || 0, 10) + _domHelpersUtilScrollbarSize2['default']() + 'px';
	    }

	    _domHelpersStyle2['default'](container, style);

	    data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null, container));

	    this.containers.push(container);
	    this.data.push(data);

	    return modalIdx;
	  };

	  ModalManager.prototype.remove = function remove(modal) {
	    var modalIdx = this.modals.indexOf(modal);

	    if (modalIdx === -1) {
	      return;
	    }

	    var containerIdx = findContainer(this.data, modal);
	    var data = this.data[containerIdx];
	    var container = this.containers[containerIdx];

	    data.modals.splice(data.modals.indexOf(modal), 1);

	    this.modals.splice(modalIdx, 1);

	    // if that was the last modal in a container,
	    // clean up the container stylinhg.
	    if (data.modals.length === 0) {
	      Object.keys(data.style).forEach(function (key) {
	        return container.style[key] = data.style[key];
	      });

	      data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null, container));

	      if (this.hideSiblingNodes) {
	        _utilsManageAriaHidden.showSiblings(container, modal.mountNode);
	      }
	      this.containers.splice(containerIdx, 1);
	      this.data.splice(containerIdx, 1);
	    } else if (this.hideSiblingNodes) {
	      //otherwise make sure the next top modal is visible to a SR
	      _utilsManageAriaHidden.ariaHidden(false, data.modals[data.modals.length - 1].mountNode);
	    }
	  };

	  ModalManager.prototype.isTopModal = function isTopModal(modal) {
	    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
	  };

	  return ModalManager;
	})();

	exports['default'] = ModalManager;
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var camelize = __webpack_require__(56),
	    hyphenate = __webpack_require__(58),
	    _getComputedStyle = __webpack_require__(60),
	    removeStyle = __webpack_require__(62);

	var has = Object.prototype.hasOwnProperty;

	module.exports = function style(node, property, value) {
	  var css = '',
	      props = property;

	  if (typeof property === 'string') {

	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
	  }

	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
	  }

	  node.style.cssText += ';' + css;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */

	'use strict';
	var camelize = __webpack_require__(57);
	var msPattern = /^-ms-/;

	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	var rHyphen = /-(.)/g;

	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */

	"use strict";

	var hyphenate = __webpack_require__(59);
	var msPattern = /^ms-/;

	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';

	var rUpper = /([A-Z])/g;

	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(61);

	var _utilCamelizeStyle = __webpack_require__(56);

	var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

	module.exports = function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;

	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;

	      prop = (0, _utilCamelizeStyle2['default'])(prop);

	      if (prop == 'float') prop = 'styleFloat';

	      var current = node.currentStyle[prop] || null;

	      if (current == null && style && style[prop]) current = style[prop];

	      if (rnumnonpx.test(current) && !rposition.test(prop)) {
	        // Remember the original values
	        var left = style.left;
	        var runStyle = node.runtimeStyle;
	        var rsLeft = runStyle && runStyle.left;

	        // Put in the new values to get a computed value out
	        if (rsLeft) runStyle.left = node.currentStyle.left;

	        style.left = prop === 'fontSize' ? '1em' : current;
	        current = style.pixelLeft + 'px';

	        // Revert the changed values
	        style.left = left;
	        if (rsLeft) runStyle.left = rsLeft;
	      }

	      return current;
	    }
	  };
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
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
	})

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  addClass: __webpack_require__(64),
	  removeClass: __webpack_require__(66),
	  hasClass: __webpack_require__(65)
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hasClass = __webpack_require__(65);

	module.exports = function addClass(element, className) {
	  if (element.classList) element.classList.add(className);else if (!hasClass(element)) element.className = element.className + ' ' + className;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function hasClass(element, className) {
	  if (element.classList) return !!className && element.classList.contains(className);else return (' ' + element.className + ' ').indexOf(' ' + className + ' ') !== -1;
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function removeClass(element, className) {
	  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canUseDOM = __webpack_require__(68);

	var size;

	module.exports = function (recalc) {
	  if (!size || recalc) {
	    if (canUseDOM) {
	      var scrollDiv = document.createElement('div');

	      scrollDiv.style.position = 'absolute';
	      scrollDiv.style.top = '-9999px';
	      scrollDiv.style.width = '50px';
	      scrollDiv.style.height = '50px';
	      scrollDiv.style.overflow = 'scroll';

	      document.body.appendChild(scrollDiv);
	      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	      document.body.removeChild(scrollDiv);
	    }
	  }

	  return size;
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isOverflowing;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _domHelpersQueryIsWindow = __webpack_require__(70);

	var _domHelpersQueryIsWindow2 = _interopRequireDefault(_domHelpersQueryIsWindow);

	var _domHelpersOwnerDocument = __webpack_require__(52);

	var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

	function isBody(node) {
	  return node && node.tagName.toLowerCase() === 'body';
	}

	function bodyIsOverflowing(node) {
	  var doc = _domHelpersOwnerDocument2['default'](node);
	  var win = _domHelpersQueryIsWindow2['default'](doc);
	  var fullWidth = win.innerWidth;

	  // Support: ie8, no innerWidth
	  if (!fullWidth) {
	    var documentElementRect = doc.documentElement.getBoundingClientRect();
	    fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	  }

	  return doc.body.clientWidth < fullWidth;
	}

	function isOverflowing(container) {
	  var win = _domHelpersQueryIsWindow2['default'](container);

	  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
	}

	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.ariaHidden = ariaHidden;
	exports.hideSiblings = hideSiblings;
	exports.showSiblings = showSiblings;

	var BLACKLIST = ['template', 'script', 'style'];

	var isHidable = function isHidable(_ref) {
	  var nodeType = _ref.nodeType;
	  var tagName = _ref.tagName;
	  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
	};

	var siblings = function siblings(container, mount, cb) {
	  mount = [].concat(mount);

	  [].forEach.call(container.children, function (node) {
	    if (mount.indexOf(node) === -1 && isHidable(node)) {
	      cb(node);
	    }
	  });
	};

	function ariaHidden(show, node) {
	  if (!node) {
	    return;
	  }
	  if (show) {
	    node.setAttribute('aria-hidden', 'true');
	  } else {
	    node.removeAttribute('aria-hidden');
	  }
	}

	function hideSiblings(container, mountNode) {
	  siblings(container, mountNode, function (node) {
	    return ariaHidden(true, node);
	  });
	}

	function showSiblings(container, mountNode) {
	  siblings(container, mountNode, function (node) {
	    return ariaHidden(false, node);
	  });
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _domHelpersEventsOn = __webpack_require__(73);

	var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);

	var _domHelpersEventsOff = __webpack_require__(74);

	var _domHelpersEventsOff2 = _interopRequireDefault(_domHelpersEventsOff);

	exports['default'] = function (node, event, handler) {
	  _domHelpersEventsOn2['default'](node, event, handler);
	  return {
	    remove: function remove() {
	      _domHelpersEventsOff2['default'](node, event, handler);
	    }
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(68);
	var on = function on() {};

	if (canUseDOM) {
	  on = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = on;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(68);
	var off = function off() {};

	if (canUseDOM) {

	  off = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = off;

/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
	 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
	 *
	 * We only allow one Listener at a time to avoid stack overflows
	 */
	'use strict';

	exports.__esModule = true;
	exports['default'] = addFocusListener;

	function addFocusListener(handler) {
	  var useFocusin = !document.addEventListener;
	  var remove = undefined;

	  if (useFocusin) {
	    document.attachEvent('onfocusin', handler);
	    remove = function () {
	      return document.detachEvent('onfocusin', handler);
	    };
	  } else {
	    document.addEventListener('focus', handler, true);
	    remove = function () {
	      return document.removeEventListener('focus', handler, true);
	    };
	  }

	  return { remove: remove };
	}

	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(61);

	exports.__esModule = true;

	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;

	var _ownerDocument = __webpack_require__(52);

	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];

	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}

	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(68);

	var contains = (function () {
	  var root = canUseDOM && document.documentElement;

	  return root && root.contains ? function (context, node) {
	    return context.contains(node);
	  } : root && root.compareDocumentPosition ? function (context, node) {
	    return context === node || !!(context.compareDocumentPosition(node) & 16);
	  } : function (context, node) {
	    if (node) do {
	      if (node === context) return true;
	    } while (node = node.parentNode);

	    return false;
	  };
	})();

	module.exports = contains;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = function (identifier, configure) {
	    return function (Component) {
	        var displayName = Component.displayName || Component.name || "Component";

	        (0, _invariant2.default)(identifier && (typeof identifier === "string" || (typeof identifier === "undefined" ? "undefined" : _typeof(identifier)) === "symbol" || typeof identifier === "function"), "Expected identifier to be string, symbol or function. See %s", displayName);

	        if (configure) {
	            (0, _invariant2.default)(typeof configure === "function", "Expected configure to be a function. See %s", displayName);
	        }

	        return _react2.default.createClass({
	            displayName: displayName + "ContextMenuLayer",
	            getDefaultProps: function getDefaultProps() {
	                return {
	                    renderTag: "div",
	                    attributes: {}
	                };
	            },
	            handleContextClick: function handleContextClick(event) {
	                var currentItem = typeof configure === "function" ? configure(this.props) : {};

	                (0, _invariant2.default)((0, _lodash2.default)(currentItem), "Expected configure to return an object. See %s", displayName);

	                event.preventDefault();

	                _store2.default.dispatch({
	                    type: "SET_PARAMS",
	                    data: {
	                        x: event.clientX,
	                        y: event.clientY,
	                        currentItem: currentItem,
	                        isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
	                    }
	                });
	            },
	            render: function render() {
	                var _props = this.props;
	                var _props$attributes = _props.attributes;
	                var _props$attributes$cla = _props$attributes.className;
	                var className = _props$attributes$cla === undefined ? "" : _props$attributes$cla;

	                var attributes = _objectWithoutProperties(_props$attributes, ["className"]);

	                var renderTag = _props.renderTag;

	                var props = _objectWithoutProperties(_props, ["attributes", "renderTag"]);

	                attributes.className = "react-context-menu-wrapper " + className;
	                attributes.onContextMenu = this.handleContextClick;

	                return _react2.default.createElement(renderTag, attributes, _react2.default.createElement(Component, props));
	            }
	        });
	    };
	};

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(79);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _lodash = __webpack_require__(80);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _store = __webpack_require__(26);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

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
	  if (process.env.NODE_ENV !== 'production') {
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
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(82);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _objectAssign = __webpack_require__(42);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _monitor = __webpack_require__(44);

	var _monitor2 = _interopRequireDefault(_monitor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var PropTypes = _react2.default.PropTypes;


	var MenuItem = _react2.default.createClass({
	    displayName: "MenuItem",
	    propTypes: {
	        onClick: PropTypes.func.isRequired,
	        data: PropTypes.object,
	        disabled: PropTypes.bool,
	        preventClose: PropTypes.bool
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            disabled: false,
	            data: {},
	            attributes: {}
	        };
	    },
	    handleClick: function handleClick(event) {
	        var _props = this.props;
	        var disabled = _props.disabled;
	        var onClick = _props.onClick;
	        var data = _props.data;
	        var preventClose = _props.preventClose;


	        event.preventDefault();

	        if (disabled) return;

	        (0, _objectAssign2.default)(data, _monitor2.default.getItem());

	        if (typeof onClick === "function") {
	            onClick(event, data);
	        }

	        if (preventClose) return;

	        _monitor2.default.hideMenu();
	    },
	    render: function render() {
	        var _props2 = this.props;
	        var disabled = _props2.disabled;
	        var children = _props2.children;
	        var _props2$attributes = _props2.attributes;
	        var _props2$attributes$cl = _props2$attributes.className;
	        var className = _props2$attributes$cl === undefined ? "" : _props2$attributes$cl;
	        var props = _objectWithoutProperties(_props2$attributes, ["className"]);
	        var menuItemClassNames = "react-context-menu-item " + className;

	        var classes = (0, _classnames2.default)({
	            "react-context-menu-link": true,
	            disabled: disabled
	        });

	        return _react2.default.createElement(
	            "div",
	            _extends({ className: menuItemClassNames }, props),
	            _react2.default.createElement(
	                "a",
	                { href: "#", className: classes, onClick: this.handleClick },
	                children
	            )
	        );
	    }
	});

	exports.default = MenuItem;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(82);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _wrapper = __webpack_require__(84);

	var _wrapper2 = _interopRequireDefault(_wrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var menuStyles = {
	    position: "relative",
	    zIndex: "auto"
	};

	var SubMenu = _react2.default.createClass({
	    displayName: "SubMenu",
	    propTypes: {
	        title: _react2.default.PropTypes.string.isRequired,
	        disabled: _react2.default.PropTypes.bool,
	        hoverDelay: _react2.default.PropTypes.number
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            hoverDelay: 500
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            visible: false
	        };
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return this.state.isVisible !== nextState.visible;
	    },
	    handleClick: function handleClick(e) {
	        e.preventDefault();
	    },
	    handleMouseEnter: function handleMouseEnter() {
	        var _this = this;

	        if (this.closetimer) clearTimeout(this.closetimer);

	        if (this.props.disabled || this.state.visible) return;

	        this.opentimer = setTimeout(function () {
	            return _this.setState({ visible: true });
	        }, this.props.hoverDelay);
	    },
	    handleMouseLeave: function handleMouseLeave() {
	        var _this2 = this;

	        if (this.opentimer) clearTimeout(this.opentimer);

	        if (!this.state.visible) return;

	        this.closetimer = setTimeout(function () {
	            return _this2.setState({ visible: false });
	        }, this.props.hoverDelay);
	    },
	    render: function render() {
	        var _this3 = this;

	        var _props = this.props;
	        var disabled = _props.disabled;
	        var children = _props.children;
	        var title = _props.title;
	        var visible = this.state.visible;


	        var classes = (0, _classnames2.default)({
	            "react-context-menu-link": true,
	            disabled: disabled,
	            active: visible
	        }),
	            menuClasses = "react-context-menu-item submenu";

	        return _react2.default.createElement(
	            "div",
	            { ref: function ref(c) {
	                    return _this3.item = c;
	                }, className: menuClasses, style: menuStyles,
	                onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
	            _react2.default.createElement(
	                "a",
	                { href: "#", className: classes, onClick: this.handleClick },
	                title
	            ),
	            _react2.default.createElement(
	                _wrapper2.default,
	                { visible: visible },
	                children
	            )
	        );
	    }
	});

	exports.default = SubMenu;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SubMenuWrapper = _react2.default.createClass({
	    displayName: "SubMenuWrapper",
	    propTypes: {
	        visible: _react2.default.PropTypes.bool
	    },
	    getInitialState: function getInitialState() {
	        return {
	            position: {
	                top: true,
	                right: true
	            }
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        if (nextProps.visible) {
	            var wrapper = window.requestAnimationFrame || setTimeout;

	            wrapper(function () {
	                _this.setState(_this.getMenuPosition());
	                _this.forceUpdate();
	            });
	        } else {
	            this.setState(this.getInitialState());
	        }
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	        return this.props.visible !== nextProps.visible;
	    },
	    getMenuPosition: function getMenuPosition() {
	        var _window = window;
	        var innerWidth = _window.innerWidth;
	        var innerHeight = _window.innerHeight;
	        var rect = this.menu.getBoundingClientRect();
	        var position = {};

	        if (rect.bottom > innerHeight) {
	            position.bottom = true;
	        } else {
	            position.top = true;
	        }

	        if (rect.right > innerWidth) {
	            position.left = true;
	        } else {
	            position.right = true;
	        }

	        return { position: position };
	    },
	    getPositionStyles: function getPositionStyles() {
	        var style = {};
	        var position = this.state.position;


	        if (position.top) style.top = 0;
	        if (position.bottom) style.bottom = 0;
	        if (position.right) style.left = "100%";
	        if (position.left) style.right = "100%";

	        return style;
	    },
	    render: function render() {
	        var _this2 = this;

	        var _props = this.props;
	        var children = _props.children;
	        var visible = _props.visible;


	        var style = _extends({
	            display: visible ? "block" : "none",
	            position: "absolute"
	        }, this.getPositionStyles());

	        return _react2.default.createElement(
	            "nav",
	            { ref: function ref(c) {
	                    return _this2.menu = c;
	                }, style: style, className: "react-context-menu" },
	            children
	        );
	    }
	});

	exports.default = SubMenuWrapper;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (Component) {
	    var displayName = Component.displayName || Component.name || "Component";

	    return _react2.default.createClass({
	        displayName: "ContextMenuConnector(" + displayName + ")",
	        getInitialState: function getInitialState() {
	            return {
	                item: _store2.default.getState().currentItem
	            };
	        },
	        componentDidMount: function componentDidMount() {
	            this.unsubscribe = _store2.default.subscribe(this.handleUpdate);
	        },
	        componentWillUnmount: function componentWillUnmount() {
	            this.unsubscribe();
	        },
	        handleUpdate: function handleUpdate() {
	            this.setState(this.getInitialState());
	        },
	        render: function render() {
	            return _react2.default.createElement(Component, _extends({}, this.props, { item: this.state.item }));
	        }
	    });
	};

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(26);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ScrollShim = {
	  appendScrollShim: function appendScrollShim() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      if (shim.classList) {
	        shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
	      } else {
	          shim.className += ' react-grid-ScrollShim';
	        }
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = size.width + 'px';
	      shim.style.height = size.height + 'px';
	      _reactDom2['default'].findDOMNode(this).appendChild(shim);
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var joinClasses = __webpack_require__(6);
	var Cell = __webpack_require__(88);
	var ColumnMetrics = __webpack_require__(8);
	var ColumnUtilsMixin = __webpack_require__(10);
	var cellMetaDataShape = __webpack_require__(94);
	var PropTypes = React.PropTypes;

	var Row = React.createClass({
	  displayName: 'Row',


	  propTypes: {
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	    row: PropTypes.any.isRequired,
	    cellRenderer: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    isSelected: PropTypes.bool,
	    idx: PropTypes.number.isRequired,
	    key: PropTypes.string,
	    expandedRows: PropTypes.arrayOf(PropTypes.object),
	    extraClasses: PropTypes.string
	  },

	  mixins: [ColumnUtilsMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      cellRenderer: Cell,
	      isSelected: false,
	      height: 35
	    };
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return !ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn) || this.doesRowContainSelectedCell(this.props) || this.doesRowContainSelectedCell(nextProps) || this.willRowBeDraggedOver(nextProps) || nextProps.row !== this.props.row || this.hasRowBeenCopied() || this.props.isSelected !== nextProps.isSelected || nextProps.height !== this.props.height;
	  },
	  handleDragEnter: function handleDragEnter() {
	    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
	    if (handleDragEnterRow) {
	      handleDragEnterRow(this.props.idx);
	    }
	  },
	  getSelectedColumn: function getSelectedColumn() {
	    if (this.props.cellMetaData) {
	      var selected = this.props.cellMetaData.selected;
	      if (selected && selected.idx) {
	        return this.getColumn(this.props.columns, selected.idx);
	      }
	    }
	  },
	  getCells: function getCells() {
	    var _this = this;

	    var cells = [];
	    var lockedCells = [];
	    var selectedColumn = this.getSelectedColumn();

	    if (this.props.columns) {
	      this.props.columns.forEach(function (column, i) {
	        var CellRenderer = _this.props.cellRenderer;
	        var cell = React.createElement(CellRenderer, {
	          ref: i,
	          key: column.key + '-' + i,
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
	    }

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
	    var val = void 0;
	    if (key === 'select-row') {
	      return this.props.isSelected;
	    } else if (typeof this.props.row.get === 'function') {
	      val = this.props.row.get(key);
	    } else {
	      val = this.props.row[key];
	    }
	    return val;
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
	    }

	    return false;
	  },
	  isContextMenuDisplayed: function isContextMenuDisplayed() {
	    if (this.props.cellMetaData) {
	      var selected = this.props.cellMetaData.selected;
	      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
	        return true;
	      }
	    }
	    return false;
	  },
	  willRowBeDraggedOver: function willRowBeDraggedOver(props) {
	    var dragged = props.cellMetaData.dragged;
	    return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
	  },
	  hasRowBeenCopied: function hasRowBeenCopied() {
	    var copied = this.props.cellMetaData.copied;
	    return copied != null && copied.rowIdx === this.props.idx;
	  },
	  renderCell: function renderCell(props) {
	    if (typeof this.props.cellRenderer === 'function') {
	      this.props.cellRenderer.call(this, props);
	    }
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return React.cloneElement(this.props.cellRenderer, props);
	    }

	    return this.props.cellRenderer(props);
	  },
	  render: function render() {
	    var className = joinClasses('react-grid-Row', 'react-grid-Row--' + (this.props.idx % 2 === 0 ? 'even' : 'odd'), {
	      'row-selected': this.props.isSelected,
	      'row-context-menu': this.isContextMenuDisplayed()
	    }, this.props.extraClasses);

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
	  }
	});

	module.exports = Row;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var joinClasses = __webpack_require__(6);
	var EditorContainer = __webpack_require__(89);
	var ExcelColumn = __webpack_require__(15);
	var isFunction = __webpack_require__(93);
	var CellMetaDataShape = __webpack_require__(94);
	var SimpleCellFormatter = __webpack_require__(95);
	var ColumnUtils = __webpack_require__(10);

	var Cell = React.createClass({
	  displayName: 'Cell',


	  propTypes: {
	    rowIdx: React.PropTypes.number.isRequired,
	    idx: React.PropTypes.number.isRequired,
	    selected: React.PropTypes.shape({
	      idx: React.PropTypes.number.isRequired
	    }),
	    selectedColumn: React.PropTypes.object,
	    height: React.PropTypes.number,
	    tabIndex: React.PropTypes.number,
	    ref: React.PropTypes.string,
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    isExpanded: React.PropTypes.bool,
	    isRowSelected: React.PropTypes.bool,
	    cellMetaData: React.PropTypes.shape(CellMetaDataShape).isRequired,
	    handleDragStart: React.PropTypes.func,
	    className: React.PropTypes.string,
	    cellControls: React.PropTypes.any,
	    rowData: React.PropTypes.object.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      tabIndex: -1,
	      ref: 'cell',
	      isExpanded: false
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { isRowChanging: false, isCellValueChanging: false };
	  },


	  componentDidMount: function componentDidMount() {
	    this.checkFocus();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({ isRowChanging: this.props.rowData !== nextProps.rowData, isCellValueChanging: this.props.value !== nextProps.value });
	  },


	  componentDidUpdate: function componentDidUpdate() {
	    this.checkFocus();
	    var dragged = this.props.cellMetaData.dragged;
	    if (dragged && dragged.complete === true) {
	      this.props.cellMetaData.handleTerminateDrag();
	    }
	    if (this.state.isRowChanging && this.props.selectedColumn != null) {
	      this.applyUpdateClass();
	    }
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.rowData !== nextProps.rowData || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected() || this.props.value !== nextProps.value;
	  },
	  onCellClick: function onCellClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellClick && typeof meta.onCellClick === 'function') {
	      meta.onCellClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
	    }
	  },
	  onCellContextMenu: function onCellContextMenu() {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellContextMenu && typeof meta.onCellContextMenu === 'function') {
	      meta.onCellContextMenu({ rowIdx: this.props.rowIdx, idx: this.props.idx });
	    }
	  },
	  onCellDoubleClick: function onCellDoubleClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellDoubleClick && typeof meta.onCellDoubleClick === 'function') {
	      meta.onCellDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
	    }
	  },
	  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
	    e.stopPropagation();
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onDragHandleDoubleClick && typeof meta.onDragHandleDoubleClick === 'function') {
	      meta.onDragHandleDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.getRowData(), e: e });
	    }
	  },


	  onDragOver: function onDragOver(e) {
	    e.preventDefault();
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
	  getFormatter: function getFormatter() {
	    var col = this.props.column;
	    if (this.isActive()) {
	      return React.createElement(EditorContainer, { rowData: this.getRowData(), rowIdx: this.props.rowIdx, idx: this.props.idx, cellMetaData: this.props.cellMetaData, column: col, height: this.props.height });
	    }

	    return this.props.column.formatter;
	  },
	  getRowData: function getRowData() {
	    return this.props.rowData.toJSON ? this.props.rowData.toJSON() : this.props.rowData;
	  },
	  getFormatterDependencies: function getFormatterDependencies() {
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
	    }
	  },


	  getCellClass: function getCellClass() {
	    var className = joinClasses(this.props.column.cellClass, 'react-grid-Cell', this.props.className, this.props.column.locked ? 'react-grid-Cell--locked' : null);
	    var extraClasses = joinClasses({
	      'row-selected': this.props.isRowSelected,
	      selected: this.isSelected() && !this.isActive() && this.isCellSelectEnabled(),
	      editing: this.isActive(),
	      copied: this.isCopied() || this.wasDraggedOver() || this.isDraggedOverUpwards() || this.isDraggedOverDownwards(),
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
	  isColumnSelected: function isColumnSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.idx === this.props.idx;
	  },


	  isSelected: function isSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;
	  },

	  isActive: function isActive() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    return this.isSelected() && meta.selected.active === true;
	  },
	  isCellSelectionChanging: function isCellSelectionChanging(nextProps) {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    var nextSelected = nextProps.cellMetaData.selected;
	    if (meta.selected && nextSelected) {
	      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
	    }

	    return true;
	  },
	  isCellSelectEnabled: function isCellSelectEnabled() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    return meta.enableCellSelect;
	  },
	  applyUpdateClass: function applyUpdateClass() {
	    var updateCellClass = this.getUpdateCellClass();
	    // -> removing the class
	    if (updateCellClass != null && updateCellClass !== '') {
	      var cellDOMNode = ReactDOM.findDOMNode(this);
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
	    var ctrl = this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
	    if (ctrl.isMounted()) {
	      var node = ReactDOM.findDOMNode(this);
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
	    var isChanging = void 0;
	    var dragged = this.props.cellMetaData.dragged;
	    var nextDragged = nextProps.cellMetaData.dragged;
	    if (dragged) {
	      isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;
	      return isChanging;
	    }

	    return false;
	  },
	  isCopyCellChanging: function isCopyCellChanging(nextProps) {
	    var isChanging = void 0;
	    var copied = this.props.cellMetaData.copied;
	    var nextCopied = nextProps.cellMetaData.copied;
	    if (copied) {
	      isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;
	      return isChanging;
	    }
	    return false;
	  },
	  isDraggedOverUpwards: function isDraggedOverUpwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
	  },
	  isDraggedOverDownwards: function isDraggedOverDownwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
	  },


	  checkFocus: function checkFocus() {
	    if (this.isSelected() && !this.isActive()) {
	      // determine the parent viewport element of this cell
	      var parentViewport = ReactDOM.findDOMNode(this);
	      while (parentViewport != null && parentViewport.className.indexOf('react-grid-Viewport') === -1) {
	        parentViewport = parentViewport.parentElement;
	      }
	      var focusInGrid = false;
	      // if the focus is on the body of the document, the user won't mind if we focus them on a cell
	      if (document.activeElement == null || document.activeElement.nodeName && typeof document.activeElement.nodeName === 'string' && document.activeElement.nodeName.toLowerCase() === 'body') {
	        focusInGrid = true;
	        // otherwise
	      } else {
	          // only pull focus if the currently focused element is contained within the viewport
	          if (parentViewport) {
	            var focusedParent = document.activeElement;
	            while (focusedParent != null) {
	              if (focusedParent === parentViewport) {
	                focusInGrid = true;
	                break;
	              }
	              focusedParent = focusedParent.parentElement;
	            }
	          }
	        }
	      if (focusInGrid) {
	        ReactDOM.findDOMNode(this).focus();
	      }
	    }
	  },

	  createColumEventCallBack: function createColumEventCallBack(onColumnEvent, info) {
	    return function (e) {
	      onColumnEvent(e, info);
	    };
	  },
	  createCellEventCallBack: function createCellEventCallBack(gridEvent, columnEvent) {
	    return function (e) {
	      gridEvent(e);
	      columnEvent(e);
	    };
	  },
	  createEventDTO: function createEventDTO(gridEvents, columnEvents, onColumnEvent) {
	    var allEvents = Object.assign({}, gridEvents);

	    for (var eventKey in columnEvents) {
	      if (columnEvents.hasOwnProperty(eventKey)) {
	        var event = columnEvents[event];
	        var eventInfo = { rowIdx: this.props.rowIdx, idx: this.props.idx, name: eventKey };
	        var eventCallback = this.createColumEventCallBack(onColumnEvent, eventInfo);

	        if (allEvents.hasOwnProperty(eventKey)) {
	          var currentEvent = allEvents[eventKey];
	          allEvents[eventKey] = this.createCellEventCallBack(currentEvent, eventCallback);
	        } else {
	          allEvents[eventKey] = eventCallback;
	        }
	      }
	    }

	    return allEvents;
	  },
	  getEvents: function getEvents() {
	    var columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
	    var onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
	    var gridEvents = {
	      onClick: this.onCellClick,
	      onDoubleClick: this.onCellDoubleClick,
	      onDragOver: this.onDragOver
	    };

	    if (!columnEvents || !onColumnEvent) {
	      return gridEvents;
	    }

	    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
	  },
	  renderCellContent: function renderCellContent(props) {
	    var CellContent = void 0;
	    var Formatter = this.getFormatter();
	    if (React.isValidElement(Formatter)) {
	      props.dependentValues = this.getFormatterDependencies();
	      CellContent = React.cloneElement(Formatter, props);
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
	  render: function render() {
	    var style = this.getStyle();

	    var className = this.getCellClass();

	    var cellContent = this.renderCellContent({
	      value: this.props.value,
	      column: this.props.column,
	      rowIdx: this.props.rowIdx,
	      isExpanded: this.props.isExpanded
	    });

	    var dragHandle = !this.isActive() && ColumnUtils.canEdit(this.props.column, this.props.rowData, this.props.cellMetaData.enableCellSelect) ? React.createElement(
	      'div',
	      { className: 'drag-handle', draggable: 'true', onDoubleClick: this.onDragHandleDoubleClick },
	      React.createElement('span', { style: { display: 'none' } })
	    ) : null;
	    var events = this.getEvents();
	    return React.createElement(
	      'div',
	      _extends({}, this.props, { className: className, style: style, onContextMenu: this.onCellContextMenu }, events),
	      cellContent,
	      dragHandle
	    );
	  }
	});

	module.exports = Cell;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var joinClasses = __webpack_require__(6);
	var keyboardHandlerMixin = __webpack_require__(90);
	var SimpleTextEditor = __webpack_require__(91);
	var isFunction = __webpack_require__(93);

	var EditorContainer = React.createClass({
	  displayName: 'EditorContainer',

	  mixins: [keyboardHandlerMixin],

	  propTypes: {
	    rowIdx: React.PropTypes.number,
	    rowData: React.PropTypes.object.isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    cellMetaData: React.PropTypes.shape({
	      selected: React.PropTypes.object.isRequired,
	      copied: React.PropTypes.object,
	      dragged: React.PropTypes.object,
	      onCellClick: React.PropTypes.func,
	      onCellDoubleClick: React.PropTypes.func,
	      onCommitCancel: React.PropTypes.func,
	      onCommit: React.PropTypes.func
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

	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.changeCommitted && !this.hasEscapeBeenPressed()) {
	      this.commit({ key: 'Enter' });
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
	      // return custom column editor or SimpleEditor if none specified
	      return React.cloneElement(customEditor, editorProps);
	    }

	    return React.createElement(SimpleTextEditor, { ref: editorRef, column: this.props.column, value: this.getInitialValue(), onBlur: this.commit, rowMetaData: this.getRowMetaData(), onKeyDown: function onKeyDown() {}, commit: function commit() {} });
	  },
	  onPressEnter: function onPressEnter() {
	    this.commit({ key: 'Enter' });
	  },
	  onPressTab: function onPressTab() {
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
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowUp: function onPressArrowUp(e) {
	    if (this.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowLeft: function onPressArrowLeft(e) {
	    // prevent event propogation. this disables left cell navigation
	    if (!this.isCaretAtBeginningOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowRight: function onPressArrowRight(e) {
	    // prevent event propogation. this disables right cell navigation
	    if (!this.isCaretAtEndOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  editorHasResults: function editorHasResults() {
	    if (isFunction(this.getEditor().hasResults)) {
	      return this.getEditor().hasResults();
	    }

	    return false;
	  },
	  editorIsSelectOpen: function editorIsSelectOpen() {
	    if (isFunction(this.getEditor().isSelectOpen)) {
	      return this.getEditor().isSelectOpen();
	    }

	    return false;
	  },
	  getRowMetaData: function getRowMetaData() {
	    // clone row data so editor cannot actually change this
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
	    }
	  },
	  getEditor: function getEditor() {
	    return this.editor;
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
	    }

	    var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	    return text;
	  },
	  getContainerClass: function getContainerClass() {
	    return joinClasses({
	      'has-error': this.state.isInvalid === true
	    });
	  },
	  commit: function commit(args) {
	    var opts = args || {};
	    var updated = this.getEditor().getValue();
	    if (this.isNewValueValid(updated)) {
	      this.changeCommitted = true;
	      var cellKey = this.props.column.key;
	      this.props.cellMetaData.onCommit({ cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key });
	    }
	  },
	  isNewValueValid: function isNewValueValid(value) {
	    if (isFunction(this.getEditor().validate)) {
	      var isValid = this.getEditor().validate(value);
	      this.setState({ isInvalid: !isValid });

	      return isValid;
	    }

	    return true;
	  },
	  setCaretAtEndOfInput: function setCaretAtEndOfInput() {
	    var input = this.getInputNode();
	    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
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
	    if (inputNode.tagName === 'INPUT') {
	      if (!this.isKeyPrintable(keyCode)) {
	        inputNode.focus();
	        inputNode.select();
	      } else {
	        inputNode.select();
	      }
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
	  },
	  renderStatusIcon: function renderStatusIcon() {
	    if (this.state.isInvalid === true) {
	      return React.createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback' });
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.getContainerClass(), onKeyDown: this.onKeyDown, commit: this.commit },
	      this.createEditor(),
	      this.renderStatusIcon()
	    );
	  }
	});

	module.exports = EditorContainer;

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	var KeyboardHandlerMixin = {
	  onKeyDown: function onKeyDown(e) {
	    if (this.isCtrlKeyHeldDown(e)) {
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    } else if (this.isKeyExplicitlyHandled(e.key)) {
	      // break up individual keyPress events to have their own specific callbacks
	      // this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    } else if (this.isKeyPrintable(e.keyCode)) {
	      this.checkAndCall('onPressChar', e);
	    }
	  },


	  // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable: function isKeyPrintable(keycode) {
	    var valid = keycode > 47 && keycode < 58 || // number keys
	    keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
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
	    return e.ctrlKey === true && e.key !== 'Control';
	  },
	  checkAndCall: function checkAndCall(methodName, args) {
	    if (typeof this[methodName] === 'function') {
	      this[methodName](args);
	    }
	  }
	};

	module.exports = KeyboardHandlerMixin;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var EditorBase = __webpack_require__(92);

	var SimpleTextEditor = function (_EditorBase) {
	  _inherits(SimpleTextEditor, _EditorBase);

	  function SimpleTextEditor() {
	    _classCallCheck(this, SimpleTextEditor);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleTextEditor).apply(this, arguments));
	  }

	  _createClass(SimpleTextEditor, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement('input', { ref: 'input', type: 'text', onBlur: this.props.onBlur, className: 'form-control', defaultValue: this.props.value });
	    }
	  }]);

	  return SimpleTextEditor;
	}(EditorBase);

	module.exports = SimpleTextEditor;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var ExcelColumn = __webpack_require__(15);

	var EditorBase = function (_React$Component) {
	  _inherits(EditorBase, _React$Component);

	  function EditorBase() {
	    _classCallCheck(this, EditorBase);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(EditorBase).apply(this, arguments));
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
	      var domNode = ReactDOM.findDOMNode(this);
	      if (domNode.tagName === 'INPUT') {
	        return domNode;
	      }

	      return domNode.querySelector('input:not([type=hidden])');
	    }
	  }, {
	    key: 'inheritContainerStyles',
	    value: function inheritContainerStyles() {
	      return true;
	    }
	  }]);

	  return EditorBase;
	}(React.Component);

	EditorBase.propTypes = {
	  onKeyDown: React.PropTypes.func.isRequired,
	  value: React.PropTypes.any.isRequired,
	  onBlur: React.PropTypes.func.isRequired,
	  column: React.PropTypes.shape(ExcelColumn).isRequired,
	  commit: React.PropTypes.func.isRequired
	};

	module.exports = EditorBase;

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	var isFunction = function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	module.exports = isFunction;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(2).PropTypes;

	module.exports = {
	  selected: PropTypes.object.isRequired,
	  copied: PropTypes.object,
	  dragged: PropTypes.object,
	  onCellClick: PropTypes.func.isRequired,
	  onCellDoubleClick: PropTypes.func.isRequired,
	  onCommit: PropTypes.func.isRequired,
	  onCommitCancel: PropTypes.func.isRequired,
	  handleDragEnterRow: PropTypes.func.isRequired,
	  handleTerminateDrag: PropTypes.func.isRequired
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var SimpleCellFormatter = React.createClass({
	  displayName: 'SimpleCellFormatter',

	  propTypes: {
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.value !== this.props.value;
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { title: this.props.value },
	      this.props.value
	    );
	  }
	});

	module.exports = SimpleCellFormatter;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var DOMMetrics = __webpack_require__(97);
	var min = Math.min;
	var max = Math.max;
	var floor = Math.floor;
	var ceil = Math.ceil;

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight: function viewportHeight() {
	      return ReactDOM.findDOMNode(this).offsetHeight;
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
	    if (this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.rowsCount !== nextProps.rowsCount) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height, nextProps.rowHeight, nextProps.rowsCount);
	      // Added to fix the hiding of the bottom scrollbar when showing the filters.
	    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
	        // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
	        var _height = this.props.rowOffsetHeight - nextProps.rowOffsetHeight;

	        this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height + _height, nextProps.rowHeight, nextProps.rowsCount);
	      }
	  }
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var shallowCloneObject = __webpack_require__(7);

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

	      var name = void 0;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        if (metricsToDelete.hasOwnProperty(name)) {
	          delete s.metrics[name];
	        }
	      }
	    }
	  },
	  updateMetrics: function updateMetrics() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
	      if (!s.metrics.hasOwnProperty(name)) continue;

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
	        if (!this._DOMMetricsDefs.hasOwnProperty(name)) continue;

	        this.DOMMetrics[name] = function () {};
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
	    }

	    return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	  },
	  getMetric: function getMetric(name) {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    }

	    return this.context.metricsComputator.getMetricImpl(name);
	  }
	};

	module.exports = {
	  MetricsComputatorMixin: MetricsComputatorMixin,
	  MetricsMixin: MetricsMixin
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  componentDidMount: function componentDidMount() {
	    this._scrollLeft = this.refs.viewport ? this.refs.viewport.getScroll().scrollLeft : 0;
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
	  onHeaderScroll: function onHeaderScroll(e) {
	    var scrollLeft = e.target.scrollLeft;
	    if (this._scrollLeft !== scrollLeft) {
	      this._scrollLeft = scrollLeft;
	      this.refs.header.setScrollLeft(scrollLeft);
	      var canvas = ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);
	      canvas.scrollLeft = scrollLeft;
	      this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);
	    }
	  },
	  _onScroll: function _onScroll() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      if (this.refs.viewport) {
	        this.refs.viewport.setScrollLeft(this._scrollLeft);
	      }
	    }
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var CheckboxEditor = React.createClass({
	  displayName: 'CheckboxEditor',


	  propTypes: {
	    value: React.PropTypes.bool,
	    rowIdx: React.PropTypes.number,
	    column: React.PropTypes.shape({
	      key: React.PropTypes.string,
	      onCellChange: React.PropTypes.func
	    }),
	    dependentValues: React.PropTypes.object
	  },

	  handleChange: function handleChange(e) {
	    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
	  },
	  render: function render() {
	    var checked = this.props.value != null ? this.props.value : false;
	    var checkboxName = 'checkbox' + this.props.rowIdx;
	    return React.createElement(
	      'div',
	      { className: 'react-grid-checkbox-container', onClick: this.handleChange },
	      React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: checkboxName, checked: checked }),
	      React.createElement('label', { htmlFor: checkboxName, className: 'react-grid-checkbox-label' })
	    );
	  }
	});

	module.exports = CheckboxEditor;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ColumnMetrics = __webpack_require__(8);
	var DOMMetrics = __webpack_require__(97);
	Object.assign = __webpack_require__(101);
	var PropTypes = __webpack_require__(2).PropTypes;
	var ColumnUtils = __webpack_require__(10);

	var Column = function Column() {
	  _classCallCheck(this, Column);
	};

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.arrayOf(Column),
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func,
	    onColumnResize: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth: function gridWidth() {
	      return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      minColumnWidth: 80,
	      columnEquality: ColumnMetrics.sameColumn
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this._mounted = true;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.columns) {
	      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth) {
	        var columnMetrics = this.createColumnMetrics(nextProps);
	        this.setState({ columnMetrics: columnMetrics });
	      }
	    }
	  },
	  getTotalWidth: function getTotalWidth() {
	    var totalWidth = 0;
	    if (this._mounted) {
	      totalWidth = this.DOMMetrics.gridWidth();
	    } else {
	      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
	    }
	    return totalWidth;
	  },
	  getColumnMetricsType: function getColumnMetricsType(metrics) {
	    var totalWidth = metrics.totalWidth || this.getTotalWidth();
	    var currentMetrics = {
	      columns: metrics.columns,
	      totalWidth: totalWidth,
	      minColumnWidth: metrics.minColumnWidth
	    };
	    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
	    return updatedMetrics;
	  },
	  getColumn: function getColumn(idx) {
	    var columns = this.state.columnMetrics.columns;
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
	  createColumnMetrics: function createColumnMetrics() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	    var gridColumns = this.setupGridColumns(props);
	    return this.getColumnMetricsType({
	      columns: gridColumns,
	      minColumnWidth: this.props.minColumnWidth,
	      totalWidth: props.minWidth
	    });
	  },
	  onColumnResize: function onColumnResize(index, width) {
	    var columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
	    this.setState({ columnMetrics: columnMetrics });
	    if (this.props.onColumnResize) {
	      this.props.onColumnResize(index, width);
	    }
	  }
	};

/***/ },
/* 101 */
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
/* 102 */
/***/ function(module, exports) {

	'use strict';

	var RowUtils = {
	  get: function get(row, property) {
	    if (typeof row.get === 'function') {
	      return row.get(property);
	    }

	    return row[property];
	  }
	};

	module.exports = RowUtils;

/***/ }
/******/ ])
});
;