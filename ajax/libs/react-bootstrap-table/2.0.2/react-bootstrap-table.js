(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapTable"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrapTable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _BootstrapTable = __webpack_require__(1);
	
	var _BootstrapTable2 = _interopRequireDefault(_BootstrapTable);
	
	var _TableHeaderColumn = __webpack_require__(41);
	
	var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);
	
	var _storeTableDataStore = __webpack_require__(33);
	
	if (typeof window !== 'undefined') {
	  window.BootstrapTable = _BootstrapTable2['default'];
	  window.TableHeaderColumn = _TableHeaderColumn2['default'];
	  window.TableDataSet = _storeTableDataStore.TableDataSet;
	}
	exports['default'] = {
	  BootstrapTable: _BootstrapTable2['default'],
	  TableHeaderColumn: _TableHeaderColumn2['default'],
	  TableDataSet: _storeTableDataStore.TableDataSet
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-alert: 0 */
	/* eslint max-len: 0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _TableHeader = __webpack_require__(4);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	var _TableBody = __webpack_require__(8);
	
	var _TableBody2 = _interopRequireDefault(_TableBody);
	
	var _paginationPaginationList = __webpack_require__(29);
	
	var _paginationPaginationList2 = _interopRequireDefault(_paginationPaginationList);
	
	var _toolbarToolBar = __webpack_require__(31);
	
	var _toolbarToolBar2 = _interopRequireDefault(_toolbarToolBar);
	
	var _TableFilter = __webpack_require__(32);
	
	var _TableFilter2 = _interopRequireDefault(_TableFilter);
	
	var _storeTableDataStore = __webpack_require__(33);
	
	var _util = __webpack_require__(35);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _csv_export_util = __webpack_require__(36);
	
	var _csv_export_util2 = _interopRequireDefault(_csv_export_util);
	
	var _Filter = __webpack_require__(40);
	
	var BootstrapTable = (function (_Component) {
	  _inherits(BootstrapTable, _Component);
	
	  function BootstrapTable(props) {
	    var _this = this;
	
	    _classCallCheck(this, BootstrapTable);
	
	    _get(Object.getPrototypeOf(BootstrapTable.prototype), 'constructor', this).call(this, props);
	
	    this.handleSort = function (order, sortField) {
	      if (_this.props.options.onSortChange) {
	        _this.props.options.onSortChange(sortField, order, _this.props);
	      }
	
	      var result = _this.store.sort(order, sortField).get();
	      _this.setState({
	        data: result
	      });
	    };
	
	    this.handlePaginationData = function (page, sizePerPage) {
	      var onPageChange = _this.props.options.onPageChange;
	
	      if (onPageChange) {
	        onPageChange(page, sizePerPage);
	      }
	
	      if (_this.isRemoteDataSource()) {
	        return;
	      }
	
	      var result = _this.store.page(page, sizePerPage).get();
	      _this.setState({
	        data: result,
	        currPage: page,
	        sizePerPage: sizePerPage
	      });
	    };
	
	    this.handleMouseLeave = function () {
	      if (_this.props.options.onMouseLeave) {
	        _this.props.options.onMouseLeave();
	      }
	    };
	
	    this.handleMouseEnter = function () {
	      if (_this.props.options.onMouseEnter) {
	        _this.props.options.onMouseEnter();
	      }
	    };
	
	    this.handleRowMouseOut = function (row) {
	      if (_this.props.options.onRowMouseOut) {
	        _this.props.options.onRowMouseOut(row);
	      }
	    };
	
	    this.handleRowMouseOver = function (row) {
	      if (_this.props.options.onRowMouseOver) {
	        _this.props.options.onRowMouseOver(row);
	      }
	    };
	
	    this.handleRowClick = function (row) {
	      if (_this.props.options.onRowClick) {
	        _this.props.options.onRowClick(row);
	      }
	    };
	
	    this.handleSelectAllRow = function (e) {
	      var isSelected = e.currentTarget.checked;
	      var selectedRowKeys = [];
	      var result = true;
	      if (_this.props.selectRow.onSelectAll) {
	        result = _this.props.selectRow.onSelectAll(isSelected, isSelected ? _this.store.get() : []);
	      }
	
	      if (typeof result === 'undefined' || result !== false) {
	        if (isSelected) {
	          selectedRowKeys = _this.store.getAllRowkey();
	        }
	
	        _this.store.setSelectedRowKey(selectedRowKeys);
	        _this.setState({ selectedRowKeys: selectedRowKeys });
	      }
	    };
	
	    this.handleShowOnlySelected = function () {
	      _this.store.ignoreNonSelected();
	      var result = undefined;
	      if (_this.props.pagination) {
	        result = _this.store.page(1, _this.state.sizePerPage).get();
	      } else {
	        result = _this.store.get();
	      }
	      _this.setState({
	        data: result,
	        currPage: 1
	      });
	    };
	
	    this.handleSelectRow = function (row, isSelected) {
	      var result = true;
	      var currSelected = _this.store.getSelectedRowKeys();
	      var rowKey = row[_this.store.getKeyField()];
	      var selectRow = _this.props.selectRow;
	
	      if (selectRow.onSelect) {
	        result = selectRow.onSelect(row, isSelected);
	      }
	
	      if (typeof result === 'undefined' || result !== false) {
	        if (selectRow.mode === _Const2['default'].ROW_SELECT_SINGLE) {
	          currSelected = isSelected ? [rowKey] : [];
	        } else {
	          if (isSelected) {
	            currSelected.push(rowKey);
	          } else {
	            currSelected = currSelected.filter(function (key) {
	              return rowKey !== key;
	            });
	          }
	        }
	
	        _this.store.setSelectedRowKey(currSelected);
	        _this.setState({
	          selectedRowKeys: currSelected
	        });
	      }
	    };
	
	    this.handleAddRow = function (newObj) {
	      try {
	        _this.store.add(newObj);
	      } catch (e) {
	        return e;
	      }
	      _this._handleAfterAddingRow(newObj);
	    };
	
	    this.handleDropRow = function (rowKeys) {
	      var dropRowKeys = rowKeys ? rowKeys : _this.store.getSelectedRowKeys();
	      // add confirm before the delete action if that option is set.
	      if (dropRowKeys && dropRowKeys.length > 0) {
	        if (_this.props.options.handleConfirmDeleteRow) {
	          _this.props.options.handleConfirmDeleteRow(function () {
	            _this.deleteRow(dropRowKeys);
	          });
	        } else if (confirm('Are you sure want delete?')) {
	          _this.deleteRow(dropRowKeys);
	        }
	      }
	    };
	
	    this.handleFilterData = function (filterObj) {
	      _this.store.filter(filterObj);
	      var result = undefined;
	      if (_this.props.pagination) {
	        var sizePerPage = _this.state.sizePerPage;
	
	        result = _this.store.page(1, sizePerPage).get();
	      } else {
	        result = _this.store.get();
	      }
	      if (_this.props.options.afterColumnFilter) {
	        _this.props.options.afterColumnFilter(filterObj, _this.store.getDataIgnoringPagination());
	      }
	      _this.setState({
	        data: result,
	        currPage: 1
	      });
	    };
	
	    this.handleExportCSV = function () {
	      var result = _this.store.getDataIgnoringPagination();
	      var keys = [];
	      _this.props.children.map(function (column) {
	        if (column.props.hidden === false) {
	          keys.push(column.props.dataField);
	        }
	      });
	      (0, _csv_export_util2['default'])(result, keys, _this.props.csvFileName);
	    };
	
	    this.handleSearch = function (searchText) {
	      _this.store.search(searchText);
	      var result = undefined;
	      if (_this.props.pagination) {
	        var sizePerPage = _this.state.sizePerPage;
	
	        result = _this.store.page(1, sizePerPage).get();
	      } else {
	        result = _this.store.get();
	      }
	      if (_this.props.options.afterSearch) {
	        _this.props.options.afterSearch(searchText, _this.store.getDataIgnoringPagination());
	      }
	      _this.setState({
	        data: result,
	        currPage: 1
	      });
	    };
	
	    this._scrollHeader = function (e) {
	      _this.refs.header.refs.container.scrollLeft = e.currentTarget.scrollLeft;
	    };
	
	    this._adjustTable = function () {
	      _this._adjustHeaderWidth();
	      _this._adjustHeight();
	    };
	
	    this._adjustHeaderWidth = function () {
	      var header = _this.refs.header.refs.header;
	      var headerContainer = _this.refs.header.refs.container;
	      var tbody = _this.refs.body.refs.tbody;
	      var firstRow = tbody.childNodes[0];
	      var isScroll = headerContainer.offsetWidth !== tbody.parentNode.offsetWidth;
	      var scrollBarWidth = isScroll ? _util2['default'].getScrollBarWidth() : 0;
	      if (firstRow && _this.store.getDataNum()) {
	        var cells = firstRow.childNodes;
	        for (var i = 0; i < cells.length; i++) {
	          var cell = cells[i];
	          var computedStyle = getComputedStyle(cell);
	          var width = parseFloat(computedStyle.width.replace('px', ''));
	          if (_this.isIE) {
	            var paddingLeftWidth = parseFloat(computedStyle.paddingLeft.replace('px', ''));
	            var paddingRightWidth = parseFloat(computedStyle.paddingRight.replace('px', ''));
	            var borderRightWidth = parseFloat(computedStyle.borderRightWidth.replace('px', ''));
	            var borderLeftWidth = parseFloat(computedStyle.borderLeftWidth.replace('px', ''));
	            width = width + paddingLeftWidth + paddingRightWidth + borderRightWidth + borderLeftWidth;
	          }
	          var lastPadding = cells.length - 1 === i ? scrollBarWidth : 0;
	          if (width <= 0) {
	            width = 120;
	            cell.width = width + lastPadding + 'px';
	          }
	          var result = width + lastPadding + 'px';
	          header.childNodes[i].style.width = result;
	          header.childNodes[i].style.minWidth = result;
	        }
	      }
	    };
	
	    this._adjustHeight = function () {
	      if (_this.props.height.indexOf('%') === -1) {
	        _this.refs.body.refs.container.style.height = parseFloat(_this.props.height, 10) - _this.refs.header.refs.container.offsetHeight + 'px';
	      }
	    };
	
	    this.isIE = false;
	    this._attachCellEditFunc();
	    if (_util2['default'].canUseDOM()) {
	      this.isIE = document.documentMode;
	    }
	    if (!Array.isArray(this.props.data)) {
	      this.store = new _storeTableDataStore.TableDataStore(this.props.data.getData());
	      this.props.data.clear();
	      this.props.data.on('change', function (data) {
	        _this.store.setData(data);
	        _this.setState({
	          data: _this.getTableData()
	        });
	      });
	    } else {
	      var copy = this.props.data.slice();
	      this.store = new _storeTableDataStore.TableDataStore(copy);
	    }
	
	    this.initTable(this.props);
	
	    if (this.filter) {
	      this.filter.on('onFilterChange', function (currentFilter) {
	        _this.handleFilterData(currentFilter);
	      });
	    }
	
	    if (this.props.selectRow && this.props.selectRow.selected) {
	      var copy = this.props.selectRow.selected.slice();
	      this.store.setSelectedRowKey(copy);
	    }
	
	    this.state = {
	      data: this.getTableData(),
	      currPage: this.props.options.page || 1,
	      sizePerPage: this.props.options.sizePerPage || _Const2['default'].SIZE_PER_PAGE_LIST[0],
	      selectedRowKeys: this.store.getSelectedRowKeys()
	    };
	  }
	
	  _createClass(BootstrapTable, [{
	    key: 'initTable',
	    value: function initTable(props) {
	      var _this2 = this;
	
	      var keyField = props.keyField;
	
	      var isKeyFieldDefined = typeof keyField === 'string' && keyField.length;
	      _react2['default'].Children.forEach(props.children, function (column) {
	        if (column.props.isKey) {
	          if (keyField) {
	            throw 'Error. Multiple key column be detected in TableHeaderColumn.';
	          }
	          keyField = column.props.dataField;
	        }
	        if (column.props.filter) {
	          // a column contains a filter
	          if (!_this2.filter) {
	            // first time create the filter on the BootstrapTable
	            _this2.filter = new _Filter.Filter();
	          }
	          // pass the filter to column with filter
	          column.props.filter.emitter = _this2.filter;
	        }
	      });
	
	      var colInfos = this.getColumnsDescription(props).reduce(function (prev, curr) {
	        prev[curr.name] = curr;
	        return prev;
	      }, {});
	
	      if (!isKeyFieldDefined && !keyField) {
	        throw 'Error. No any key column defined in TableHeaderColumn.\n            Use \'isKey={true}\' to specify a unique column after version 0.5.4.';
	      }
	
	      this.store.setProps({
	        isPagination: props.pagination,
	        keyField: keyField,
	        colInfos: colInfos,
	        multiColumnSearch: props.multiColumnSearch,
	        remote: this.isRemoteDataSource()
	      });
	    }
	  }, {
	    key: 'getTableData',
	    value: function getTableData() {
	      var _props = this.props;
	      var options = _props.options;
	      var pagination = _props.pagination;
	
	      var result = [];
	      if (options.sortName && options.sortOrder) {
	        this.store.sort(options.sortOrder, options.sortName);
	      }
	
	      if (pagination) {
	        var page = undefined;
	        var sizePerPage = undefined;
	        if (this.store.isChangedPage()) {
	          sizePerPage = this.state.sizePerPage;
	          page = this.state.currPage;
	        } else {
	          sizePerPage = options.sizePerPage || _Const2['default'].SIZE_PER_PAGE_LIST[0];
	          page = options.page || 1;
	        }
	        result = this.store.page(page, sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      return result;
	    }
	  }, {
	    key: 'getColumnsDescription',
	    value: function getColumnsDescription(_ref) {
	      var children = _ref.children;
	
	      return _react2['default'].Children.map(children, function (column, i) {
	        return {
	          name: column.props.dataField,
	          align: column.props.dataAlign,
	          sort: column.props.dataSort,
	          format: column.props.dataFormat,
	          formatExtraData: column.props.formatExtraData,
	          filterFormatted: column.props.filterFormatted,
	          editable: column.props.editable,
	          hidden: column.props.hidden,
	          searchable: column.props.searchable,
	          className: column.props.columnClassName,
	          width: column.props.width,
	          text: column.props.children,
	          sortFunc: column.props.sortFunc,
	          index: i
	        };
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.initTable(nextProps);
	      var options = nextProps.options;
	      var selectRow = nextProps.selectRow;
	
	      if (Array.isArray(nextProps.data)) {
	        this.store.setData(nextProps.data.slice());
	        var page = options.page || this.state.currPage;
	        var sizePerPage = options.sizePerPage || this.state.sizePerPage;
	
	        // #125
	        if (!options.page && page >= Math.ceil(nextProps.data.length / sizePerPage)) {
	          page = 1;
	        }
	        var sortInfo = this.store.getSortInfo();
	        var sortField = options.sortName || (sortInfo ? sortInfo.sortField : undefined);
	        var sortOrder = options.sortOrder || (sortInfo ? sortInfo.order : undefined);
	        if (sortField && sortOrder) this.store.sort(sortOrder, sortField);
	        var data = this.store.page(page, sizePerPage).get();
	        this.setState({
	          data: data,
	          currPage: page,
	          sizePerPage: sizePerPage
	        });
	      }
	      if (selectRow && selectRow.selected) {
	        // set default select rows to store.
	        var copy = selectRow.selected.slice();
	        this.store.setSelectedRowKey(copy);
	        this.setState({
	          selectedRowKeys: copy
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._adjustTable();
	      window.addEventListener('resize', this._adjustTable);
	      this.refs.body.refs.container.addEventListener('scroll', this._scrollHeader);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this._adjustTable);
	      this.refs.body.refs.container.removeEventListener('scroll', this._scrollHeader);
	      if (this.filter) {
	        this.filter.removeAllListeners('onFilterChange');
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._adjustTable();
	      this._attachCellEditFunc();
	      if (this.props.options.afterTableComplete) {
	        this.props.options.afterTableComplete();
	      }
	    }
	  }, {
	    key: '_attachCellEditFunc',
	    value: function _attachCellEditFunc() {
	      var cellEdit = this.props.cellEdit;
	
	      if (cellEdit) {
	        this.props.cellEdit.__onCompleteEdit__ = this.handleEditCell.bind(this);
	        if (cellEdit.mode !== _Const2['default'].CELL_EDIT_NONE) {
	          this.props.selectRow.clickToSelect = false;
	        }
	      }
	    }
	
	    /**
	     * Returns true if in the current configuration,
	     * the datagrid should load its data remotely.
	     *
	     * @param  {Object}  [props] Optional. If not given, this.props will be used
	     * @return {Boolean}
	     */
	  }, {
	    key: 'isRemoteDataSource',
	    value: function isRemoteDataSource(props) {
	      return (props || this.props).remote;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = {
	        height: this.props.height,
	        maxHeight: this.props.maxHeight
	      };
	
	      var columns = this.getColumnsDescription(this.props);
	      var sortInfo = this.store.getSortInfo();
	      var pagination = this.renderPagination();
	      var toolBar = this.renderToolBar();
	      var tableFilter = this.renderTableFilter(columns);
	      var isSelectAll = this.isSelectAll();
	      var sortIndicator = this.props.options.sortIndicator;
	      if (typeof this.props.options.sortIndicator === 'undefined') sortIndicator = true;
	      return _react2['default'].createElement(
	        'div',
	        { className: 'react-bs-table-container' },
	        toolBar,
	        _react2['default'].createElement(
	          'div',
	          { className: 'react-bs-table', ref: 'table', style: style,
	            onMouseEnter: this.handleMouseEnter,
	            onMouseLeave: this.handleMouseLeave },
	          _react2['default'].createElement(
	            _TableHeader2['default'],
	            {
	              ref: 'header',
	              rowSelectType: this.props.selectRow.mode,
	              hideSelectColumn: this.props.selectRow.hideSelectColumn,
	              sortName: sortInfo ? sortInfo.sortField : undefined,
	              sortOrder: sortInfo ? sortInfo.order : undefined,
	              sortIndicator: sortIndicator,
	              onSort: this.handleSort,
	              onSelectAllRow: this.handleSelectAllRow,
	              bordered: this.props.bordered,
	              condensed: this.props.condensed,
	              isFiltered: this.filter ? true : false,
	              isSelectAll: isSelectAll },
	            this.props.children
	          ),
	          _react2['default'].createElement(_TableBody2['default'], { ref: 'body',
	            style: style,
	            data: this.state.data,
	            columns: columns,
	            trClassName: this.props.trClassName,
	            striped: this.props.striped,
	            bordered: this.props.bordered,
	            hover: this.props.hover,
	            keyField: this.store.getKeyField(),
	            condensed: this.props.condensed,
	            selectRow: this.props.selectRow,
	            cellEdit: this.props.cellEdit,
	            selectedRowKeys: this.state.selectedRowKeys,
	            onRowClick: this.handleRowClick,
	            onRowMouseOver: this.handleRowMouseOver,
	            onRowMouseOut: this.handleRowMouseOut,
	            onSelectRow: this.handleSelectRow,
	            noDataText: this.props.options.noDataText })
	        ),
	        tableFilter,
	        pagination
	      );
	    }
	  }, {
	    key: 'isSelectAll',
	    value: function isSelectAll() {
	      var defaultSelectRowKeys = this.store.getSelectedRowKeys();
	      var allRowKeys = this.store.getAllRowkey();
	      if (defaultSelectRowKeys.length !== allRowKeys.length) {
	        return defaultSelectRowKeys.length === 0 ? false : 'indeterminate';
	      } else {
	        return true;
	      }
	    }
	  }, {
	    key: 'cleanSelected',
	    value: function cleanSelected() {
	      this.store.setSelectedRowKey([]);
	      this.setState({
	        selectedRowKeys: []
	      });
	    }
	  }, {
	    key: 'handleEditCell',
	    value: function handleEditCell(newVal, rowIndex, colIndex) {
	      var _props$cellEdit = this.props.cellEdit;
	      var beforeSaveCell = _props$cellEdit.beforeSaveCell;
	      var afterSaveCell = _props$cellEdit.afterSaveCell;
	
	      var fieldName = undefined;
	      _react2['default'].Children.forEach(this.props.children, function (column, i) {
	        if (i === colIndex) {
	          fieldName = column.props.dataField;
	          return false;
	        }
	      });
	
	      if (beforeSaveCell) {
	        var isValid = beforeSaveCell(this.state.data[rowIndex], fieldName, newVal);
	        if (!isValid && typeof isValid !== 'undefined') {
	          this.setState({
	            data: this.store.get()
	          });
	          return;
	        }
	      }
	
	      var result = this.store.edit(newVal, rowIndex, fieldName).get();
	      this.setState({
	        data: result
	      });
	
	      if (afterSaveCell) {
	        afterSaveCell(this.state.data[rowIndex], fieldName, newVal);
	      }
	    }
	  }, {
	    key: 'handleAddRowAtBegin',
	    value: function handleAddRowAtBegin(newObj) {
	      try {
	        this.store.addAtBegin(newObj);
	      } catch (e) {
	        return e;
	      }
	      this._handleAfterAddingRow(newObj);
	    }
	  }, {
	    key: 'getSizePerPage',
	    value: function getSizePerPage() {
	      return this.state.sizePerPage;
	    }
	  }, {
	    key: 'getCurrentPage',
	    value: function getCurrentPage() {
	      return this.state.currPage;
	    }
	  }, {
	    key: 'deleteRow',
	    value: function deleteRow(dropRowKeys) {
	      var result = undefined;
	      this.store.remove(dropRowKeys); // remove selected Row
	      this.store.setSelectedRowKey([]); // clear selected row key
	
	      if (this.props.pagination) {
	        var sizePerPage = this.state.sizePerPage;
	
	        var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
	        var currPage = this.state.currPage;
	
	        if (currPage > currLastPage) currPage = currLastPage;
	        result = this.store.page(currPage, sizePerPage).get();
	        this.setState({
	          data: result,
	          selectedRowKeys: this.store.getSelectedRowKeys(),
	          currPage: currPage
	        });
	      } else {
	        result = this.store.get();
	        this.setState({
	          data: result,
	          selectedRowKeys: this.store.getSelectedRowKeys()
	        });
	      }
	      if (this.props.options.afterDeleteRow) {
	        this.props.options.afterDeleteRow(dropRowKeys);
	      }
	    }
	  }, {
	    key: 'renderPagination',
	    value: function renderPagination() {
	      if (this.props.pagination) {
	        var dataSize = undefined;
	        if (this.isRemoteDataSource()) {
	          dataSize = this.props.fetchInfo.dataTotalSize;
	        } else {
	          dataSize = this.store.getDataNum();
	        }
	        var options = this.props.options;
	
	        return _react2['default'].createElement(
	          'div',
	          { className: 'react-bs-table-pagination' },
	          _react2['default'].createElement(_paginationPaginationList2['default'], {
	            ref: 'pagination',
	            currPage: this.state.currPage,
	            changePage: this.handlePaginationData,
	            sizePerPage: this.state.sizePerPage,
	            sizePerPageList: options.sizePerPageList || _Const2['default'].SIZE_PER_PAGE_LIST,
	            paginationSize: options.paginationSize || _Const2['default'].PAGINATION_SIZE,
	            remote: this.isRemoteDataSource(),
	            dataSize: dataSize,
	            onSizePerPageList: options.onSizePerPageList,
	            prePage: options.prePage || _Const2['default'].PRE_PAGE,
	            nextPage: options.nextPage || _Const2['default'].NEXT_PAGE,
	            firstPage: options.firstPage || _Const2['default'].FIRST_PAGE,
	            lastPage: options.lastPage || _Const2['default'].LAST_PAGE })
	        );
	      }
	      return null;
	    }
	  }, {
	    key: 'renderToolBar',
	    value: function renderToolBar() {
	      var _props2 = this.props;
	      var selectRow = _props2.selectRow;
	      var insertRow = _props2.insertRow;
	      var deleteRow = _props2.deleteRow;
	      var search = _props2.search;
	      var children = _props2.children;
	
	      var enableShowOnlySelected = selectRow && selectRow.showOnlySelected;
	      if (enableShowOnlySelected || insertRow || deleteRow || search || this.props.exportCSV) {
	        var columns = undefined;
	        if (Array.isArray(children)) {
	          columns = children.map(function (column) {
	            var props = column.props;
	
	            return {
	              name: props.children,
	              field: props.dataField,
	              // when you want same auto generate value and not allow edit, example ID field
	              autoValue: props.autoValue || false,
	              // for create editor, no params for column.editable() indicate that editor for new row
	              editable: props.editable && typeof props.editable === 'function' ? props.editable() : props.editable,
	              format: props.dataFormat ? function (value) {
	                return props.dataFormat(value, null, props.formatExtraData).replace(/<.*?>/g, '');
	              } : false
	            };
	          });
	        } else {
	          columns = [{
	            name: children.props.children,
	            field: children.props.dataField,
	            editable: children.props.editable
	          }];
	        }
	        return _react2['default'].createElement(
	          'div',
	          { className: 'react-bs-table-tool-bar' },
	          _react2['default'].createElement(_toolbarToolBar2['default'], {
	            clearSearch: this.props.options.clearSearch,
	            enableInsert: insertRow,
	            enableDelete: deleteRow,
	            enableSearch: search,
	            enableExportCSV: this.props.exportCSV,
	            enableShowOnlySelected: enableShowOnlySelected,
	            columns: columns,
	            searchPlaceholder: this.props.searchPlaceholder,
	            onAddRow: this.handleAddRow,
	            onDropRow: this.handleDropRow,
	            onSearch: this.handleSearch,
	            onExportCSV: this.handleExportCSV,
	            onShowOnlySelected: this.handleShowOnlySelected })
	        );
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'renderTableFilter',
	    value: function renderTableFilter(columns) {
	      if (this.props.columnFilter) {
	        return _react2['default'].createElement(_TableFilter2['default'], { columns: columns,
	          rowSelectType: this.props.selectRow.mode,
	          onFilter: this.handleFilterData });
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: '_handleAfterAddingRow',
	    value: function _handleAfterAddingRow(newObj) {
	      var result = undefined;
	      if (this.props.pagination) {
	        // if pagination is enabled and insert row be trigger, change to last page
	        var sizePerPage = this.state.sizePerPage;
	
	        var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
	        result = this.store.page(currLastPage, sizePerPage).get();
	        this.setState({
	          data: result,
	          currPage: currLastPage
	        });
	      } else {
	        result = this.store.get();
	        this.setState({
	          data: result
	        });
	      }
	
	      if (this.props.options.afterInsertRow) {
	        this.props.options.afterInsertRow(newObj);
	      }
	    }
	  }]);
	
	  return BootstrapTable;
	})(_react.Component);
	
	BootstrapTable.propTypes = {
	  keyField: _react.PropTypes.string,
	  height: _react.PropTypes.string,
	  maxHeight: _react.PropTypes.string,
	  data: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
	  remote: _react.PropTypes.bool, // remote data, default is false
	  striped: _react.PropTypes.bool,
	  bordered: _react.PropTypes.bool,
	  hover: _react.PropTypes.bool,
	  condensed: _react.PropTypes.bool,
	  pagination: _react.PropTypes.bool,
	  searchPlaceholder: _react.PropTypes.string,
	  selectRow: _react.PropTypes.shape({
	    mode: _react.PropTypes.oneOf([_Const2['default'].ROW_SELECT_NONE, _Const2['default'].ROW_SELECT_SINGLE, _Const2['default'].ROW_SELECT_MULTI]),
	    bgColor: _react.PropTypes.string,
	    selected: _react.PropTypes.array,
	    onSelect: _react.PropTypes.func,
	    onSelectAll: _react.PropTypes.func,
	    clickToSelect: _react.PropTypes.bool,
	    hideSelectColumn: _react.PropTypes.bool,
	    clickToSelectAndEditCell: _react.PropTypes.bool,
	    showOnlySelected: _react.PropTypes.bool
	  }),
	  cellEdit: _react.PropTypes.shape({
	    mode: _react.PropTypes.string,
	    blurToSave: _react.PropTypes.bool,
	    beforeSaveCell: _react.PropTypes.func,
	    afterSaveCell: _react.PropTypes.func
	  }),
	  insertRow: _react.PropTypes.bool,
	  deleteRow: _react.PropTypes.bool,
	  search: _react.PropTypes.bool,
	  columnFilter: _react.PropTypes.bool,
	  trClassName: _react.PropTypes.any,
	  options: _react.PropTypes.shape({
	    clearSearch: _react.PropTypes.bool,
	    sortName: _react.PropTypes.string,
	    sortOrder: _react.PropTypes.string,
	    sortIndicator: _react.PropTypes.bool,
	    afterTableComplete: _react.PropTypes.func,
	    afterDeleteRow: _react.PropTypes.func,
	    afterInsertRow: _react.PropTypes.func,
	    afterSearch: _react.PropTypes.func,
	    afterColumnFilter: _react.PropTypes.func,
	    onRowClick: _react.PropTypes.func,
	    page: _react.PropTypes.number,
	    sizePerPageList: _react.PropTypes.array,
	    sizePerPage: _react.PropTypes.number,
	    paginationSize: _react.PropTypes.number,
	    onSortChange: _react.PropTypes.func,
	    onPageChange: _react.PropTypes.func,
	    onSizePerPageList: _react.PropTypes.func,
	    noDataText: _react.PropTypes.string,
	    handleConfirmDeleteRow: _react.PropTypes.func,
	    prePage: _react.PropTypes.string,
	    nextPage: _react.PropTypes.string,
	    firstPage: _react.PropTypes.string,
	    lastPage: _react.PropTypes.string
	  }),
	  fetchInfo: _react.PropTypes.shape({
	    dataTotalSize: _react.PropTypes.number
	  }),
	  exportCSV: _react.PropTypes.bool,
	  csvFileName: _react.PropTypes.string
	};
	BootstrapTable.defaultProps = {
	  height: '100%',
	  maxHeight: undefined,
	  striped: false,
	  bordered: true,
	  hover: false,
	  condensed: false,
	  pagination: false,
	  searchPlaceholder: undefined,
	  selectRow: {
	    mode: _Const2['default'].ROW_SELECT_NONE,
	    bgColor: _Const2['default'].ROW_SELECT_BG_COLOR,
	    selected: [],
	    onSelect: undefined,
	    onSelectAll: undefined,
	    clickToSelect: false,
	    hideSelectColumn: false,
	    clickToSelectAndEditCell: false,
	    showOnlySelected: false
	  },
	  cellEdit: {
	    mode: _Const2['default'].CELL_EDIT_NONE,
	    blurToSave: false,
	    beforeSaveCell: undefined,
	    afterSaveCell: undefined
	  },
	  insertRow: false,
	  deleteRow: false,
	  search: false,
	  multiColumnSearch: false,
	  columnFilter: false,
	  trClassName: '',
	  options: {
	    clearSearch: false,
	    sortName: undefined,
	    sortOrder: undefined,
	    sortIndicator: true,
	    afterTableComplete: undefined,
	    afterDeleteRow: undefined,
	    afterInsertRow: undefined,
	    afterSearch: undefined,
	    afterColumnFilter: undefined,
	    onRowClick: undefined,
	    onMouseLeave: undefined,
	    onMouseEnter: undefined,
	    onRowMouseOut: undefined,
	    onRowMouseOver: undefined,
	    page: undefined,
	    sizePerPageList: _Const2['default'].SIZE_PER_PAGE_LIST,
	    sizePerPage: undefined,
	    paginationSize: _Const2['default'].PAGINATION_SIZE,
	    onSizePerPageList: undefined,
	    noDataText: undefined,
	    handleConfirmDeleteRow: undefined,
	    prePage: _Const2['default'].PRE_PAGE,
	    nextPage: _Const2['default'].NEXT_PAGE,
	    firstPage: _Const2['default'].FIRST_PAGE,
	    lastPage: _Const2['default'].LAST_PAGE
	  },
	  fetchInfo: {
	    dataTotalSize: 0
	  },
	  exportCSV: false,
	  csvFileName: undefined
	};
	
	exports['default'] = BootstrapTable;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  SORT_DESC: 'desc',
	  SORT_ASC: 'asc',
	  SIZE_PER_PAGE: 10,
	  NEXT_PAGE: '>',
	  LAST_PAGE: '>>',
	  PRE_PAGE: '<',
	  FIRST_PAGE: '<<',
	  ROW_SELECT_BG_COLOR: '',
	  ROW_SELECT_NONE: 'none',
	  ROW_SELECT_SINGLE: 'radio',
	  ROW_SELECT_MULTI: 'checkbox',
	  CELL_EDIT_NONE: 'none',
	  CELL_EDIT_CLICK: 'click',
	  CELL_EDIT_DBCLICK: 'dbclick',
	  SIZE_PER_PAGE_LIST: [10, 25, 30, 50],
	  PAGINATION_SIZE: 5,
	  NO_DATA_TEXT: 'There is no data to display',
	  SHOW_ONLY_SELECT: 'Show Selected Only',
	  SHOW_ALL: 'Show All',
	  FILTER_DELAY: 500,
	  FILTER_TYPE: {
	    TEXT: 'TextFilter',
	    REGEX: 'RegexFilter',
	    SELECT: 'SelectFilter',
	    NUMBER: 'NumberFilter',
	    DATE: 'DateFilter',
	    CUSTOM: 'CustomFilter'
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(5);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _SelectRowHeaderColumn = __webpack_require__(7);
	
	var _SelectRowHeaderColumn2 = _interopRequireDefault(_SelectRowHeaderColumn);
	
	var Checkbox = (function (_Component) {
	  _inherits(Checkbox, _Component);
	
	  function Checkbox() {
	    _classCallCheck(this, Checkbox);
	
	    _get(Object.getPrototypeOf(Checkbox.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Checkbox, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.update(this.props.checked);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      this.update(props.checked);
	    }
	  }, {
	    key: 'update',
	    value: function update(checked) {
	      _reactDom2['default'].findDOMNode(this).indeterminate = checked === 'indeterminate';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('input', { className: 'react-bs-select-all',
	        type: 'checkbox',
	        checked: this.props.checked,
	        onChange: this.props.onChange });
	    }
	  }]);
	
	  return Checkbox;
	})(_react.Component);
	
	var TableHeader = (function (_Component2) {
	  _inherits(TableHeader, _Component2);
	
	  function TableHeader() {
	    _classCallCheck(this, TableHeader);
	
	    _get(Object.getPrototypeOf(TableHeader.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(TableHeader, [{
	    key: 'render',
	    value: function render() {
	      var containerClasses = (0, _classnames2['default'])('react-bs-container-header', 'table-header-wrapper');
	      var tableClasses = (0, _classnames2['default'])('table', 'table-hover', {
	        'table-bordered': this.props.bordered,
	        'table-condensed': this.props.condensed
	      });
	      var selectRowHeaderCol = null;
	      if (!this.props.hideSelectColumn) selectRowHeaderCol = this.renderSelectRowHeader();
	      this._attachClearSortCaretFunc();
	
	      return _react2['default'].createElement(
	        'div',
	        { ref: 'container', className: containerClasses },
	        _react2['default'].createElement(
	          'table',
	          { className: tableClasses },
	          _react2['default'].createElement(
	            'thead',
	            null,
	            _react2['default'].createElement(
	              'tr',
	              { ref: 'header' },
	              selectRowHeaderCol,
	              this.props.children
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'renderSelectRowHeader',
	    value: function renderSelectRowHeader() {
	      if (this.props.rowSelectType === _Const2['default'].ROW_SELECT_SINGLE) {
	        return _react2['default'].createElement(_SelectRowHeaderColumn2['default'], null);
	      } else if (this.props.rowSelectType === _Const2['default'].ROW_SELECT_MULTI) {
	        return _react2['default'].createElement(
	          _SelectRowHeaderColumn2['default'],
	          null,
	          _react2['default'].createElement(Checkbox, {
	            onChange: this.props.onSelectAllRow,
	            checked: this.props.isSelectAll })
	        );
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: '_attachClearSortCaretFunc',
	    value: function _attachClearSortCaretFunc() {
	      var _props = this.props;
	      var sortIndicator = _props.sortIndicator;
	      var children = _props.children;
	      var sortName = _props.sortName;
	      var sortOrder = _props.sortOrder;
	      var onSort = _props.onSort;
	
	      if (Array.isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	          var field = children[i].props.dataField;
	          var sort = field === sortName ? sortOrder : undefined;
	          this.props.children[i] = _react2['default'].cloneElement(children[i], { key: i, onSort: onSort, sort: sort, sortIndicator: sortIndicator });
	        }
	      } else {
	        var field = children.props.dataField;
	        var sort = field === sortName ? sortOrder : undefined;
	        this.props.children = _react2['default'].cloneElement(children, { key: 0, onSort: onSort, sort: sort, sortIndicator: sortIndicator });
	      }
	    }
	  }]);
	
	  return TableHeader;
	})(_react.Component);
	
	TableHeader.propTypes = {
	  rowSelectType: _react.PropTypes.string,
	  onSort: _react.PropTypes.func,
	  onSelectAllRow: _react.PropTypes.func,
	  sortName: _react.PropTypes.string,
	  sortOrder: _react.PropTypes.string,
	  hideSelectColumn: _react.PropTypes.bool,
	  bordered: _react.PropTypes.bool,
	  condensed: _react.PropTypes.bool,
	  isFiltered: _react.PropTypes.bool,
	  isSelectAll: _react.PropTypes.oneOf([true, 'indeterminate', false]),
	  sortIndicator: _react.PropTypes.bool
	};
	
	exports['default'] = TableHeader;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var SelectRowHeaderColumn = (function (_Component) {
	  _inherits(SelectRowHeaderColumn, _Component);
	
	  function SelectRowHeaderColumn() {
	    _classCallCheck(this, SelectRowHeaderColumn);
	
	    _get(Object.getPrototypeOf(SelectRowHeaderColumn.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(SelectRowHeaderColumn, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'th',
	        { style: { textAlign: 'center' } },
	        this.props.children
	      );
	    }
	  }]);
	
	  return SelectRowHeaderColumn;
	})(_react.Component);
	
	SelectRowHeaderColumn.propTypes = {
	  children: _react.PropTypes.node
	};
	exports['default'] = SelectRowHeaderColumn;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _TableRow = __webpack_require__(9);
	
	var _TableRow2 = _interopRequireDefault(_TableRow);
	
	var _TableColumn = __webpack_require__(10);
	
	var _TableColumn2 = _interopRequireDefault(_TableColumn);
	
	var _TableEditColumn = __webpack_require__(11);
	
	var _TableEditColumn2 = _interopRequireDefault(_TableEditColumn);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var isFun = function isFun(obj) {
	  return obj && typeof obj === 'function';
	};
	
	var TableBody = (function (_Component) {
	  _inherits(TableBody, _Component);
	
	  function TableBody(props) {
	    var _this = this;
	
	    _classCallCheck(this, TableBody);
	
	    _get(Object.getPrototypeOf(TableBody.prototype), 'constructor', this).call(this, props);
	
	    this.handleRowMouseOut = function (rowIndex) {
	      var targetRow = _this.props.data[rowIndex];
	      _this.props.onRowMouseOut(targetRow);
	    };
	
	    this.handleRowMouseOver = function (rowIndex) {
	      var targetRow = _this.props.data[rowIndex];
	      _this.props.onRowMouseOver(targetRow);
	    };
	
	    this.handleRowClick = function (rowIndex) {
	      var selectedRow = undefined;
	      var _props = _this.props;
	      var data = _props.data;
	      var onRowClick = _props.onRowClick;
	
	      data.forEach(function (row, i) {
	        if (i === rowIndex - 1) {
	          selectedRow = row;
	        }
	      });
	      onRowClick(selectedRow);
	    };
	
	    this.handleSelectRow = function (rowIndex, isSelected) {
	      var selectedRow = undefined;
	      var _props2 = _this.props;
	      var data = _props2.data;
	      var onSelectRow = _props2.onSelectRow;
	
	      data.forEach(function (row, i) {
	        if (i === rowIndex - 1) {
	          selectedRow = row;
	          return false;
	        }
	      });
	      onSelectRow(selectedRow, isSelected);
	    };
	
	    this.handleSelectRowColumChange = function (e) {
	      if (!_this.props.selectRow.clickToSelect || !_this.props.selectRow.clickToSelectAndEditCell) {
	        _this.handleSelectRow(e.currentTarget.parentElement.parentElement.rowIndex + 1, e.currentTarget.checked);
	      }
	    };
	
	    this.handleEditCell = function (rowIndex, columnIndex) {
	      _this.editing = true;
	      if (_this._isSelectRowDefined()) {
	        columnIndex--;
	        if (_this.props.selectRow.hideSelectColumn) columnIndex++;
	      }
	      rowIndex--;
	      var stateObj = {
	        currEditCell: {
	          rid: rowIndex,
	          cid: columnIndex
	        }
	      };
	
	      if (_this.props.selectRow.clickToSelectAndEditCell) {
	        _this.handleSelectRow(rowIndex + 1, true);
	      }
	      _this.setState(stateObj);
	    };
	
	    this.handleCompleteEditCell = function (newVal, rowIndex, columnIndex) {
	      _this.setState({ currEditCell: null });
	      if (newVal !== null) {
	        _this.props.cellEdit.__onCompleteEdit__(newVal, rowIndex, columnIndex);
	      }
	    };
	
	    this.state = {
	      currEditCell: null
	    };
	    this.editing = false;
	  }
	
	  _createClass(TableBody, [{
	    key: 'render',
	    value: function render() {
	      var tableClasses = (0, _classnames2['default'])('table', {
	        'table-striped': this.props.striped,
	        'table-bordered': this.props.bordered,
	        'table-hover': this.props.hover,
	        'table-condensed': this.props.condensed
	      });
	
	      var isSelectRowDefined = this._isSelectRowDefined();
	      var tableHeader = this.renderTableHeader(isSelectRowDefined);
	
	      var tableRows = this.props.data.map(function (data, r) {
	        var tableColumns = this.props.columns.map(function (column, i) {
	          var fieldValue = data[column.name];
	          if (this.editing && column.name !== this.props.keyField && // Key field can't be edit
	          column.editable && // column is editable? default is true, user can set it false
	          this.state.currEditCell !== null && this.state.currEditCell.rid === r && this.state.currEditCell.cid === i) {
	            var editable = column.editable;
	            var format = column.format ? function (value) {
	              return column.format(value, data, column.formatExtraData).replace(/<.*?>/g, '');
	            } : false;
	
	            if (isFun(column.editable)) {
	              editable = column.editable(fieldValue, data, r, i);
	            }
	
	            return _react2['default'].createElement(
	              _TableEditColumn2['default'],
	              {
	                completeEdit: this.handleCompleteEditCell,
	                // add by bluespring for column editor customize
	                editable: editable,
	                format: column.format ? format : false,
	                key: i,
	                blurToSave: this.props.cellEdit.blurToSave,
	                rowIndex: r,
	                colIndex: i },
	              fieldValue
	            );
	          } else {
	            // add by bluespring for className customize
	            var columnChild = fieldValue;
	            var tdClassName = column.className;
	            if (isFun(column.className)) {
	              tdClassName = column.className(fieldValue, data, r, i);
	            }
	
	            if (typeof column.format !== 'undefined') {
	              var formattedValue = column.format(fieldValue, data, column.formatExtraData);
	              if (!_react2['default'].isValidElement(formattedValue)) {
	                columnChild = _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: formattedValue } });
	              } else {
	                columnChild = formattedValue;
	              }
	            }
	            return _react2['default'].createElement(
	              _TableColumn2['default'],
	              { key: i,
	                dataAlign: column.align,
	                className: tdClassName,
	                cellEdit: this.props.cellEdit,
	                hidden: column.hidden,
	                onEdit: this.handleEditCell,
	                width: column.width },
	              columnChild
	            );
	          }
	        }, this);
	
	        var selected = this.props.selectedRowKeys.indexOf(data[this.props.keyField]) !== -1;
	        var selectRowColumn = isSelectRowDefined && !this.props.selectRow.hideSelectColumn ? this.renderSelectRowColumn(selected) : null;
	        // add by bluespring for className customize
	        var trClassName = this.props.trClassName;
	        if (isFun(this.props.trClassName)) {
	          trClassName = this.props.trClassName(data, r);
	        }
	        return _react2['default'].createElement(
	          _TableRow2['default'],
	          { isSelected: selected, key: r, className: trClassName,
	            selectRow: isSelectRowDefined ? this.props.selectRow : undefined,
	            enableCellEdit: this.props.cellEdit.mode !== _Const2['default'].CELL_EDIT_NONE,
	            onRowClick: this.handleRowClick,
	            onRowMouseOver: this.handleRowMouseOver,
	            onRowMouseOut: this.handleRowMouseOut,
	            onSelectRow: this.handleSelectRow },
	          selectRowColumn,
	          tableColumns
	        );
	      }, this);
	
	      if (tableRows.length === 0) {
	        tableRows.push(_react2['default'].createElement(
	          _TableRow2['default'],
	          { key: '##table-empty##' },
	          _react2['default'].createElement(
	            'td',
	            { colSpan: this.props.columns.length + (isSelectRowDefined ? 1 : 0),
	              className: 'react-bs-table-no-data' },
	            this.props.noDataText || _Const2['default'].NO_DATA_TEXT
	          )
	        ));
	      }
	
	      this.editing = false;
	
	      return _react2['default'].createElement(
	        'div',
	        { ref: 'container', className: 'react-bs-container-body', style: this.props.style },
	        _react2['default'].createElement(
	          'table',
	          { className: tableClasses },
	          tableHeader,
	          _react2['default'].createElement(
	            'tbody',
	            { ref: 'tbody' },
	            tableRows
	          )
	        )
	      );
	    }
	  }, {
	    key: 'renderTableHeader',
	    value: function renderTableHeader(isSelectRowDefined) {
	      var selectRowHeader = null;
	
	      if (isSelectRowDefined) {
	        var style = {
	          width: 30,
	          minWidth: 30
	        };
	        if (!this.props.selectRow.hideSelectColumn) {
	          selectRowHeader = _react2['default'].createElement('col', { style: style, key: -1 });
	        }
	      }
	      var theader = this.props.columns.map(function (column, i) {
	        var width = column.width === null ? column.width : parseInt(column.width, 10);
	        var style = {
	          display: column.hidden ? 'none' : null,
	          width: width,
	          minWidth: width
	          /** add min-wdth to fix user assign column width
	          not eq offsetWidth in large column table **/
	        };
	        return _react2['default'].createElement('col', { style: style, key: i, className: column.className });
	      });
	
	      return _react2['default'].createElement(
	        'colgroup',
	        { ref: 'header' },
	        selectRowHeader,
	        theader
	      );
	    }
	  }, {
	    key: 'renderSelectRowColumn',
	    value: function renderSelectRowColumn(selected) {
	      if (this.props.selectRow.mode === _Const2['default'].ROW_SELECT_SINGLE) {
	        return _react2['default'].createElement(
	          _TableColumn2['default'],
	          { dataAlign: 'center' },
	          _react2['default'].createElement('input', { type: 'radio', checked: selected,
	            onChange: this.handleSelectRowColumChange })
	        );
	      } else {
	        return _react2['default'].createElement(
	          _TableColumn2['default'],
	          { dataAlign: 'center' },
	          _react2['default'].createElement('input', { type: 'checkbox', checked: selected,
	            onChange: this.handleSelectRowColumChange })
	        );
	      }
	    }
	  }, {
	    key: '_isSelectRowDefined',
	    value: function _isSelectRowDefined() {
	      return this.props.selectRow.mode === _Const2['default'].ROW_SELECT_SINGLE || this.props.selectRow.mode === _Const2['default'].ROW_SELECT_MULTI;
	    }
	  }]);
	
	  return TableBody;
	})(_react.Component);
	
	TableBody.propTypes = {
	  data: _react.PropTypes.array,
	  columns: _react.PropTypes.array,
	  striped: _react.PropTypes.bool,
	  bordered: _react.PropTypes.bool,
	  hover: _react.PropTypes.bool,
	  condensed: _react.PropTypes.bool,
	  keyField: _react.PropTypes.string,
	  selectedRowKeys: _react.PropTypes.array,
	  onRowClick: _react.PropTypes.func,
	  onSelectRow: _react.PropTypes.func,
	  noDataText: _react.PropTypes.string,
	  style: _react.PropTypes.object
	};
	exports['default'] = TableBody;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var TableRow = (function (_Component) {
	  _inherits(TableRow, _Component);
	
	  function TableRow(props) {
	    var _this = this;
	
	    _classCallCheck(this, TableRow);
	
	    _get(Object.getPrototypeOf(TableRow.prototype), 'constructor', this).call(this, props);
	
	    this.rowClick = function (e) {
	      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
	        (function () {
	          var rowIndex = e.currentTarget.rowIndex + 1;
	          if (_this.props.selectRow) {
	            if (_this.props.selectRow.clickToSelect) {
	              _this.props.onSelectRow(rowIndex, !_this.props.isSelected);
	            } else if (_this.props.selectRow.clickToSelectAndEditCell) {
	              _this.clickNum++;
	              /** if clickToSelectAndEditCell is enabled,
	               *  there should be a delay to prevent a selection changed when
	               *  user dblick to edit cell on same row but different cell
	              **/
	              setTimeout(function () {
	                if (_this.clickNum === 1) {
	                  _this.props.onSelectRow(rowIndex, !_this.props.isSelected);
	                }
	                _this.clickNum = 0;
	              }, 200);
	            }
	          }
	          if (_this.props.onRowClick) _this.props.onRowClick(rowIndex);
	        })();
	      }
	    };
	
	    this.rowMouseOut = function (e) {
	      if (_this.props.onRowMouseOut) {
	        _this.props.onRowMouseOut(e.currentTarget.rowIndex);
	      }
	    };
	
	    this.rowMouseOver = function (e) {
	      if (_this.props.onRowMouseOver) {
	        _this.props.onRowMouseOver(e.currentTarget.rowIndex);
	      }
	    };
	
	    this.clickNum = 0;
	  }
	
	  _createClass(TableRow, [{
	    key: 'render',
	    value: function render() {
	      this.clickNum = 0;
	      var trCss = {
	        style: {
	          backgroundColor: this.props.isSelected ? this.props.selectRow.bgColor : null
	        },
	        className: (this.props.isSelected && this.props.selectRow.className ? this.props.selectRow.className : '') + (this.props.className || '')
	      };
	
	      if (this.props.selectRow && (this.props.selectRow.clickToSelect || this.props.selectRow.clickToSelectAndEditCell) || this.props.onRowClick) {
	        return _react2['default'].createElement(
	          'tr',
	          _extends({}, trCss, {
	            onMouseOver: this.rowMouseOver,
	            onMouseOut: this.rowMouseOut,
	            onClick: this.rowClick }),
	          this.props.children
	        );
	      } else {
	        return _react2['default'].createElement(
	          'tr',
	          trCss,
	          this.props.children
	        );
	      }
	    }
	  }]);
	
	  return TableRow;
	})(_react.Component);
	
	TableRow.propTypes = {
	  isSelected: _react.PropTypes.bool,
	  enableCellEdit: _react.PropTypes.bool,
	  onRowClick: _react.PropTypes.func,
	  onSelectRow: _react.PropTypes.func,
	  onRowMouseOut: _react.PropTypes.func,
	  onRowMouseOver: _react.PropTypes.func
	};
	TableRow.defaultProps = {
	  onRowClick: undefined
	};
	exports['default'] = TableRow;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var TableColumn = (function (_Component) {
	  _inherits(TableColumn, _Component);
	
	  function TableColumn(props) {
	    var _this = this;
	
	    _classCallCheck(this, TableColumn);
	
	    _get(Object.getPrototypeOf(TableColumn.prototype), 'constructor', this).call(this, props);
	
	    this.handleCellEdit = function (e) {
	      if (_this.props.cellEdit.mode === _Const2['default'].CELL_EDIT_DBCLICK) {
	        if (document.selection && document.selection.empty) {
	          document.selection.empty();
	        } else if (window.getSelection) {
	          var sel = window.getSelection();
	          sel.removeAllRanges();
	        }
	      }
	      _this.props.onEdit(e.currentTarget.parentElement.rowIndex + 1, e.currentTarget.cellIndex);
	    };
	  }
	
	  /* eslint no-unused-vars: [0, { "args": "after-used" }] */
	
	  _createClass(TableColumn, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      var children = this.props.children;
	
	      var shouldUpdated = this.props.width !== nextProps.width || this.props.className !== nextProps.className || this.props.hidden !== nextProps.hidden || this.props.dataAlign !== nextProps.dataAlign || typeof children !== typeof nextProps.children || ('' + this.props.onEdit).toString() !== ('' + nextProps.onEdit).toString();
	
	      if (shouldUpdated) {
	        return shouldUpdated;
	      }
	
	      if (typeof children === 'object' && children !== null && children.props !== null) {
	        if (children.props.type === 'checkbox' || children.props.type === 'radio') {
	          shouldUpdated = shouldUpdated || children.props.type !== nextProps.children.props.type || children.props.checked !== nextProps.children.props.checked;
	        } else {
	          shouldUpdated = true;
	        }
	      } else {
	        shouldUpdated = shouldUpdated || children !== nextProps.children;
	      }
	
	      if (shouldUpdated) {
	        return shouldUpdated;
	      }
	
	      if (!(this.props.cellEdit && nextProps.cellEdit)) {
	        return false;
	      } else {
	        return shouldUpdated || this.props.cellEdit.mode !== nextProps.cellEdit.mode;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var tdStyle = {
	        textAlign: this.props.dataAlign,
	        display: this.props.hidden ? 'none' : null
	      };
	
	      var opts = {};
	      if (this.props.cellEdit) {
	        if (this.props.cellEdit.mode === _Const2['default'].CELL_EDIT_CLICK) {
	          opts.onClick = this.handleCellEdit;
	        } else if (this.props.cellEdit.mode === _Const2['default'].CELL_EDIT_DBCLICK) {
	          opts.onDoubleClick = this.handleCellEdit;
	        }
	      }
	      return _react2['default'].createElement(
	        'td',
	        _extends({ style: tdStyle, className: this.props.className }, opts),
	        this.props.children
	      );
	    }
	  }]);
	
	  return TableColumn;
	})(_react.Component);
	
	TableColumn.propTypes = {
	  dataAlign: _react.PropTypes.string,
	  hidden: _react.PropTypes.bool,
	  className: _react.PropTypes.string,
	  children: _react.PropTypes.node
	};
	
	TableColumn.defaultProps = {
	  dataAlign: 'left',
	  hidden: false,
	  className: ''
	};
	exports['default'] = TableColumn;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Editor = __webpack_require__(12);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	var _NotificationJs = __webpack_require__(13);
	
	var _NotificationJs2 = _interopRequireDefault(_NotificationJs);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var TableEditColumn = (function (_Component) {
	  _inherits(TableEditColumn, _Component);
	
	  function TableEditColumn(props) {
	    var _this = this;
	
	    _classCallCheck(this, TableEditColumn);
	
	    _get(Object.getPrototypeOf(TableEditColumn.prototype), 'constructor', this).call(this, props);
	
	    this.handleKeyPress = function (e) {
	      if (e.keyCode === 13) {
	        // Pressed ENTER
	        var value = e.currentTarget.type === 'checkbox' ? _this._getCheckBoxValue(e) : e.currentTarget.value;
	
	        if (!_this.validator(value)) {
	          return;
	        }
	        _this.props.completeEdit(value, _this.props.rowIndex, _this.props.colIndex);
	      } else if (e.keyCode === 27) {
	        _this.props.completeEdit(null, _this.props.rowIndex, _this.props.colIndex);
	      }
	    };
	
	    this.handleBlur = function (e) {
	      if (_this.props.blurToSave) {
	        var value = e.currentTarget.type === 'checkbox' ? _this._getCheckBoxValue(e) : e.currentTarget.value;
	        if (!_this.validator(value)) {
	          return;
	        }
	        _this.props.completeEdit(value, _this.props.rowIndex, _this.props.colIndex);
	      }
	    };
	
	    this.timeouteClear = 0;
	    this.state = {
	      shakeEditor: false
	    };
	  }
	
	  _createClass(TableEditColumn, [{
	    key: 'validator',
	    value: function validator(value) {
	      var ts = this;
	      if (ts.props.editable.validator) {
	        var valid = ts.props.editable.validator(value);
	        if (!valid) {
	          ts.refs.notifier.notice('error', valid, 'Pressed ESC can cancel');
	          var input = ts.refs.inputRef;
	          // animate input
	          ts.clearTimeout();
	          ts.setState({ shakeEditor: true });
	          ts.timeouteClear = setTimeout(function () {
	            ts.setState({ shakeEditor: false });
	          }, 300);
	          input.focus();
	          return false;
	        }
	      }
	      return true;
	    }
	  }, {
	    key: 'clearTimeout',
	    value: (function (_clearTimeout) {
	      function clearTimeout() {
	        return _clearTimeout.apply(this, arguments);
	      }
	
	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };
	
	      return clearTimeout;
	    })(function () {
	      if (this.timeouteClear !== 0) {
	        clearTimeout(this.timeouteClear);
	        this.timeouteClear = 0;
	      }
	    })
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.refs.inputRef.focus();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearTimeout();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var editable = _props.editable;
	      var format = _props.format;
	      var children = _props.children;
	      var shakeEditor = this.state.shakeEditor;
	
	      var attr = {
	        ref: 'inputRef',
	        onKeyDown: this.handleKeyPress,
	        onBlur: this.handleBlur
	      };
	      // put placeholder if exist
	      editable.placeholder && (attr.placeholder = editable.placeholder);
	
	      var editorClass = (0, _classnames2['default'])({ 'animated': shakeEditor, 'shake': shakeEditor });
	      return _react2['default'].createElement(
	        'td',
	        { ref: 'td', style: { position: 'relative' } },
	        (0, _Editor2['default'])(editable, attr, format, editorClass, children || ''),
	        _react2['default'].createElement(_NotificationJs2['default'], { ref: 'notifier' })
	      );
	    }
	  }, {
	    key: '_getCheckBoxValue',
	    value: function _getCheckBoxValue(e) {
	      var value = '';
	      var values = e.currentTarget.value.split(':');
	      value = e.currentTarget.checked ? values[0] : values[1];
	      return value;
	    }
	  }]);
	
	  return TableEditColumn;
	})(_react.Component);
	
	TableEditColumn.propTypes = {
	  completeEdit: _react.PropTypes.func,
	  rowIndex: _react.PropTypes.number,
	  colIndex: _react.PropTypes.number,
	  blurToSave: _react.PropTypes.bool,
	  editable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
	  format: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
	  children: _react.PropTypes.node
	};
	
	exports['default'] = TableEditColumn;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var editor = function editor(editable, attr, format, editorClass, defaultValue) {
	  if (editable === true || typeof editable === 'string') {
	    // simple declare
	    var type = editable ? 'text' : editable;
	    return _react2['default'].createElement('input', _extends({}, attr, { type: type, defaultValue: defaultValue,
	      className: (editorClass || '') + ' form-control editor edit-text' }));
	  } else if (!editable) {
	    var type = editable ? 'text' : editable;
	    return _react2['default'].createElement('input', _extends({}, attr, { type: type, defaultValue: defaultValue,
	      disabled: 'disabled',
	      className: (editorClass || '') + ' form-control editor edit-text' }));
	  } else if (editable.type) {
	    // standard declare
	    // put style if exist
	    editable.style && (attr.style = editable.style);
	    // put class if exist
	    attr.className = (editorClass || '') + ' form-control editor edit-' + editable.type + (editable.className ? ' ' + editable.className : '');
	
	    if (editable.type === 'select') {
	      // process select input
	      var options = [];
	      var values = editable.options.values;
	      if (Array.isArray(values)) {
	        (function () {
	          // only can use arrray data for options
	          var rowValue = undefined;
	          options = values.map(function (d, i) {
	            rowValue = format ? format(d) : d;
	            return _react2['default'].createElement(
	              'option',
	              { key: 'option' + i, value: d },
	              rowValue
	            );
	          });
	        })();
	      }
	      return _react2['default'].createElement(
	        'select',
	        _extends({}, attr, { defaultValue: defaultValue }),
	        options
	      );
	    } else if (editable.type === 'textarea') {
	      var _ret2 = (function () {
	        // process textarea input
	        // put other if exist
	        editable.cols && (attr.cols = editable.cols);
	        editable.rows && (attr.rows = editable.rows);
	        var saveBtn = undefined;
	        var keyUpHandler = attr.onKeyDown;
	        if (keyUpHandler) {
	          attr.onKeyDown = function (e) {
	            if (e.keyCode !== 13) {
	              // not Pressed ENTER
	              keyUpHandler(e);
	            }
	          };
	          saveBtn = _react2['default'].createElement(
	            'button',
	            {
	              className: 'btn btn-info btn-xs textarea-save-btn',
	              onClick: keyUpHandler },
	            'save'
	          );
	        }
	        return {
	          v: _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement('textarea', _extends({}, attr, { defaultValue: defaultValue })),
	            saveBtn
	          )
	        };
	      })();
	
	      if (typeof _ret2 === 'object') return _ret2.v;
	    } else if (editable.type === 'checkbox') {
	      var values = 'true:false';
	      if (editable.options && editable.options.values) {
	        // values = editable.options.values.split(':');
	        values = editable.options.values;
	      }
	      attr.className = attr.className.replace('form-control', '');
	      attr.className += ' checkbox pull-right';
	
	      var checked = defaultValue && defaultValue.toString() === values.split(':')[0] ? true : false;
	
	      return _react2['default'].createElement('input', _extends({}, attr, { type: 'checkbox',
	        value: values, defaultChecked: checked }));
	    } else {
	      // process other input type. as password,url,email...
	      return _react2['default'].createElement('input', _extends({}, attr, { type: 'text', defaultValue: defaultValue }));
	    }
	  }
	  // default return for other case of editable
	  return _react2['default'].createElement('input', _extends({}, attr, { type: 'text',
	    className: (editorClass || '') + ' form-control editor edit-text' }));
	};
	
	exports['default'] = editor;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactToastr = __webpack_require__(14);
	
	var ToastrMessageFactory = _react2['default'].createFactory(_reactToastr.ToastMessage.animation);
	
	var Notification = (function (_Component) {
	  _inherits(Notification, _Component);
	
	  function Notification() {
	    _classCallCheck(this, Notification);
	
	    _get(Object.getPrototypeOf(Notification.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Notification, [{
	    key: 'notice',
	
	    // allow type is success,info,warning,error
	    value: function notice(type, msg, title) {
	      this.refs.toastr[type](msg, title, {
	        mode: 'single',
	        timeOut: 5000,
	        extendedTimeOut: 1000,
	        showAnimation: 'animated  bounceIn',
	        hideAnimation: 'animated bounceOut'
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_reactToastr.ToastContainer, { ref: 'toastr',
	        toastMessageFactory: ToastrMessageFactory,
	        id: 'toast-container',
	        className: 'toast-top-right' });
	    }
	  }]);
	
	  return Notification;
	})(_react.Component);
	
	exports['default'] = Notification;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ToastMessage = exports.ToastContainer = undefined;
	
	var _ToastContainer = __webpack_require__(15);
	
	var _ToastContainer2 = _interopRequireDefault(_ToastContainer);
	
	var _ToastMessage = __webpack_require__(22);
	
	var _ToastMessage2 = _interopRequireDefault(_ToastMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.ToastContainer = _ToastContainer2.default;
	exports.ToastMessage = _ToastMessage2.default;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsUpdate = __webpack_require__(16);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _ToastMessage = __webpack_require__(22);
	
	var _ToastMessage2 = _interopRequireDefault(_ToastMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastContainer = function (_Component) {
	  _inherits(ToastContainer, _Component);
	
	  function ToastContainer() {
	    var _Object$getPrototypeO;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, ToastContainer);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ToastContainer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      toasts: [],
	      toastId: 0,
	      previousMessage: null
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(ToastContainer, [{
	    key: "error",
	    value: function error(message, title, optionsOverride) {
	      this._notify(this.props.toastType.error, message, title, optionsOverride);
	    }
	  }, {
	    key: "info",
	    value: function info(message, title, optionsOverride) {
	      this._notify(this.props.toastType.info, message, title, optionsOverride);
	    }
	  }, {
	    key: "success",
	    value: function success(message, title, optionsOverride) {
	      this._notify(this.props.toastType.success, message, title, optionsOverride);
	    }
	  }, {
	    key: "warning",
	    value: function warning(message, title, optionsOverride) {
	      this._notify(this.props.toastType.warning, message, title, optionsOverride);
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      var _this2 = this;
	
	      Object.keys(this.refs).forEach(function (key) {
	        _this2.refs[key].hideToast(false);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	
	      return _react2.default.createElement(
	        "div",
	        _extends({}, this.props, { "aria-live": "polite", role: "alert" }),
	        this.state.toasts.map(function (toast) {
	          return _this3.props.toastMessageFactory(toast);
	        })
	      );
	    }
	  }, {
	    key: "_notify",
	    value: function _notify(type, message, title) {
	      var _this4 = this;
	
	      var optionsOverride = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      if (this.props.preventDuplicates) {
	        if (this.state.previousMessage === message) {
	          return;
	        }
	      }
	      var key = this.state.toastId++;
	      var toastId = key;
	      var newToast = (0, _reactAddonsUpdate2.default)(optionsOverride, {
	        $merge: {
	          type: type,
	          title: title,
	          message: message,
	          toastId: toastId,
	          key: key,
	          ref: "toasts__" + key,
	          handleOnClick: function handleOnClick(e) {
	            if ("function" === typeof optionsOverride.handleOnClick) {
	              optionsOverride.handleOnClick();
	            }
	            return _this4._handle_toast_on_click(e);
	          },
	          handleRemove: this._handle_toast_remove.bind(this)
	        }
	      });
	      var toastOperation = _defineProperty({}, "" + (this.props.newestOnTop ? "$unshift" : "$push"), [newToast]);
	
	      var nextState = (0, _reactAddonsUpdate2.default)(this.state, {
	        toasts: toastOperation,
	        previousMessage: { $set: message }
	      });
	      this.setState(nextState);
	    }
	  }, {
	    key: "_handle_toast_on_click",
	    value: function _handle_toast_on_click(event) {
	      this.props.onClick(event);
	      if (event.defaultPrevented) {
	        return;
	      }
	      event.preventDefault();
	      event.stopPropagation();
	    }
	  }, {
	    key: "_handle_toast_remove",
	    value: function _handle_toast_remove(toastId) {
	      var _this5 = this;
	
	      var operationName = "" + (this.props.newestOnTop ? "reduceRight" : "reduce");
	      this.state.toasts[operationName](function (found, toast, index) {
	        if (found || toast.toastId !== toastId) {
	          return false;
	        }
	        _this5.setState((0, _reactAddonsUpdate2.default)(_this5.state, {
	          toasts: { $splice: [[index, 1]] }
	        }));
	        return true;
	      }, false);
	    }
	  }]);
	
	  return ToastContainer;
	}(_react.Component);
	
	ToastContainer.defaultProps = {
	  toastType: {
	    error: "error",
	    info: "info",
	    success: "success",
	    warning: "warning"
	  },
	  id: "toast-container",
	  toastMessageFactory: _react2.default.createFactory(_ToastMessage2.default),
	  preventDuplicates: false,
	  newestOnTop: true,
	  onClick: function onClick() {}
	};
	exports.default = ToastContainer;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */
	
	/* global hasOwnProperty:true */
	
	'use strict';
	
	var assign = __webpack_require__(19);
	var keyOf = __webpack_require__(20);
	var invariant = __webpack_require__(21);
	var hasOwnProperty = ({}).hasOwnProperty;
	
	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}
	
	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });
	
	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];
	
	var ALL_COMMANDS_SET = {};
	
	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});
	
	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : undefined;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : undefined;
	}
	
	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : undefined;
	
	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : undefined;
	
	    return spec[COMMAND_SET];
	  }
	
	  var nextValue = shallowCopy(value);
	
	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : undefined;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : undefined;
	    assign(nextValue, spec[COMMAND_MERGE]);
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : undefined;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }
	
	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }
	
	  return nextValue;
	}
	
	module.exports = update;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ },
/* 18 */
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
/* 19 */
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
/* 20 */
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
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	"use strict";
	
	var keyOf = function (oneKeyObj) {
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
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
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jQuery = exports.animation = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsUpdate = __webpack_require__(16);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _animationMixin = __webpack_require__(23);
	
	var _animationMixin2 = _interopRequireDefault(_animationMixin);
	
	var _jQueryMixin = __webpack_require__(28);
	
	var _jQueryMixin2 = _interopRequireDefault(_jQueryMixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function noop() {}
	
	var ToastMessageSpec = {
	  displayName: "ToastMessage",
	
	  getDefaultProps: function getDefaultProps() {
	    var iconClassNames = {
	      error: "toast-error",
	      info: "toast-info",
	      success: "toast-success",
	      warning: "toast-warning"
	    };
	
	    return {
	      className: "toast",
	      iconClassNames: iconClassNames,
	      titleClassName: "toast-title",
	      messageClassName: "toast-message",
	      tapToDismiss: true,
	      closeButton: false
	    };
	  },
	  handleOnClick: function handleOnClick(event) {
	    this.props.handleOnClick(event);
	    if (this.props.tapToDismiss) {
	      this.hideToast(true);
	    }
	  },
	  _handle_close_button_click: function _handle_close_button_click(event) {
	    event.stopPropagation();
	    this.hideToast(true);
	  },
	  _handle_remove: function _handle_remove() {
	    this.props.handleRemove(this.props.toastId);
	  },
	  _render_close_button: function _render_close_button() {
	    return this.props.closeButton ? _react2.default.createElement("button", {
	      className: "toast-close-button", role: "button",
	      onClick: this._handle_close_button_click,
	      dangerouslySetInnerHTML: { __html: "&times;" }
	    }) : false;
	  },
	  _render_title_element: function _render_title_element() {
	    return this.props.title ? _react2.default.createElement(
	      "div",
	      { className: this.props.titleClassName },
	      this.props.title
	    ) : false;
	  },
	  _render_message_element: function _render_message_element() {
	    return this.props.message ? _react2.default.createElement(
	      "div",
	      { className: this.props.messageClassName },
	      this.props.message
	    ) : false;
	  },
	  render: function render() {
	    var iconClassName = this.props.iconClassName || this.props.iconClassNames[this.props.type];
	
	    return _react2.default.createElement(
	      "div",
	      {
	        className: (0, _classnames2.default)(this.props.className, iconClassName),
	        style: this.props.style,
	        onClick: this.handleOnClick,
	        onMouseEnter: this.handleMouseEnter,
	        onMouseLeave: this.handleMouseLeave
	      },
	      this._render_close_button(),
	      this._render_title_element(),
	      this._render_message_element()
	    );
	  }
	};
	
	var animation = exports.animation = _react2.default.createClass((0, _reactAddonsUpdate2.default)(ToastMessageSpec, {
	  displayName: { $set: "ToastMessage.animation" },
	  mixins: { $set: [_animationMixin2.default] }
	}));
	
	var jQuery = exports.jQuery = _react2.default.createClass((0, _reactAddonsUpdate2.default)(ToastMessageSpec, {
	  displayName: { $set: "ToastMessage.jQuery" },
	  mixins: { $set: [_jQueryMixin2.default] }
	}));
	
	/*
	 * assign default noop functions
	 */
	ToastMessageSpec.handleMouseEnter = noop;
	ToastMessageSpec.handleMouseLeave = noop;
	ToastMessageSpec.hideToast = noop;
	
	var ToastMessage = _react2.default.createClass(ToastMessageSpec);
	
	ToastMessage.animation = animation;
	ToastMessage.jQuery = jQuery;
	
	exports.default = ToastMessage;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _CSSCore = __webpack_require__(24);
	
	var _CSSCore2 = _interopRequireDefault(_CSSCore);
	
	var _ReactTransitionEvents = __webpack_require__(26);
	
	var _ReactTransitionEvents2 = _interopRequireDefault(_ReactTransitionEvents);
	
	var _reactDom = __webpack_require__(5);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TICK = 17;
	var toString = Object.prototype.toString;
	exports.default = {
	  getDefaultProps: function getDefaultProps() {
	    return {
	      transition: null, // some examples defined in index.scss (scale, fadeInOut, rotate)
	      showAnimation: "animated bounceIn", // or other animations from animate.css
	      hideAnimation: "animated bounceOut",
	      timeOut: 5000,
	      extendedTimeOut: 1000
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.classNameQueue = [];
	    this.isHiding = false;
	    this.intervalId = null;
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    this._is_mounted = true;
	    this._show();
	    var node = _reactDom2.default.findDOMNode(this);
	
	    var onHideComplete = function onHideComplete() {
	      if (_this.isHiding) {
	        _this._set_is_hiding(false);
	        _ReactTransitionEvents2.default.removeEndEventListener(node, onHideComplete);
	        _this._handle_remove();
	      }
	    };
	    _ReactTransitionEvents2.default.addEndEventListener(node, onHideComplete);
	
	    if (this.props.timeOut > 0) {
	      this._set_interval_id(setTimeout(this.hideToast, this.props.timeOut));
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._is_mounted = false;
	    if (this.intervalId) {
	      clearTimeout(this.intervalId);
	    }
	  },
	  _set_transition: function _set_transition(hide) {
	    var animationType = hide ? "leave" : "enter";
	    var node = _reactDom2.default.findDOMNode(this);
	    var className = this.props.transition + "-" + animationType;
	    var activeClassName = className + "-active";
	
	    var endListener = function endListener(e) {
	      if (e && e.target !== node) {
	        return;
	      }
	
	      _CSSCore2.default.removeClass(node, className);
	      _CSSCore2.default.removeClass(node, activeClassName);
	
	      _ReactTransitionEvents2.default.removeEndEventListener(node, endListener);
	    };
	
	    _ReactTransitionEvents2.default.addEndEventListener(node, endListener);
	
	    _CSSCore2.default.addClass(node, className);
	
	    // Need to do this to actually trigger a transition.
	    this._queue_class(activeClassName);
	  },
	  _clear_transition: function _clear_transition(hide) {
	    var node = _reactDom2.default.findDOMNode(this);
	    var animationType = hide ? "leave" : "enter";
	    var className = this.props.transition + "-" + animationType;
	    var activeClassName = className + "-active";
	
	    _CSSCore2.default.removeClass(node, className);
	    _CSSCore2.default.removeClass(node, activeClassName);
	  },
	  _set_animation: function _set_animation(hide) {
	    var node = _reactDom2.default.findDOMNode(this);
	    var animations = this._get_animation_classes(hide);
	    var endListener = function endListener(e) {
	      if (e && e.target !== node) {
	        return;
	      }
	
	      animations.forEach(function (anim) {
	        _CSSCore2.default.removeClass(node, anim);
	      });
	
	      _ReactTransitionEvents2.default.removeEndEventListener(node, endListener);
	    };
	
	    _ReactTransitionEvents2.default.addEndEventListener(node, endListener);
	
	    animations.forEach(function (anim) {
	      _CSSCore2.default.addClass(node, anim);
	    });
	  },
	  _get_animation_classes: function _get_animation_classes(hide) {
	    var animations = hide ? this.props.hideAnimation : this.props.showAnimation;
	    if ("[object Array]" === toString.call(animations)) {
	      return animations;
	    } else if ("string" === typeof animations) {
	      return animations.split(" ");
	    }
	  },
	  _clear_animation: function _clear_animation(hide) {
	    var _this2 = this;
	
	    var animations = this._get_animation_classes(hide);
	    animations.forEach(function (animation) {
	      _CSSCore2.default.removeClass(_reactDom2.default.findDOMNode(_this2), animation);
	    });
	  },
	  _queue_class: function _queue_class(className) {
	    this.classNameQueue.push(className);
	
	    if (!this.timeout) {
	      this.timeout = setTimeout(this._flush_class_name_queue, TICK);
	    }
	  },
	  _flush_class_name_queue: function _flush_class_name_queue() {
	    if (this._is_mounted) {
	      this.classNameQueue.forEach(_CSSCore2.default.addClass.bind(_CSSCore2.default, _reactDom2.default.findDOMNode(this)));
	    }
	    this.classNameQueue.length = 0;
	    this.timeout = null;
	  },
	  _show: function _show() {
	    if (this.props.transition) {
	      this._set_transition();
	    } else if (this.props.showAnimation) {
	      this._set_animation();
	    }
	  },
	  handleMouseEnter: function handleMouseEnter() {
	    clearTimeout(this.intervalId);
	    this._set_interval_id(null);
	    if (this.isHiding) {
	      this._set_is_hiding(false);
	
	      if (this.props.hideAnimation) {
	        this._clear_animation(true);
	      } else if (this.props.transition) {
	        this._clear_transition(true);
	      }
	    }
	  },
	  handleMouseLeave: function handleMouseLeave() {
	    if (!this.isHiding && (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
	      this._set_interval_id(setTimeout(this.hideToast, this.props.extendedTimeOut));
	    }
	  },
	  hideToast: function hideToast(override) {
	    if (this.isHiding || this.intervalId === null && !override) {
	      return;
	    }
	
	    this._set_is_hiding(true);
	    if (this.props.transition) {
	      this._set_transition(true);
	    } else if (this.props.hideAnimation) {
	      this._set_animation(true);
	    } else {
	      this._handle_remove();
	    }
	  },
	  _set_interval_id: function _set_interval_id(intervalId) {
	    this.intervalId = intervalId;
	  },
	  _set_is_hiding: function _set_is_hiding(isHiding) {
	    this.isHiding = isHiding;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(25);
	
	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */
	
	var CSSCore = {
	
	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : undefined;
	
	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },
	
	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : undefined;
	
	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
	        .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },
	
	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function (element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },
	
	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSS.hasClass takes only a single class name.') : invariant(false) : undefined;
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }
	
	};
	
	module.exports = CSSCore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
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
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionEvents
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(27);
	
	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },
	
	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
	}
	
	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var ReactTransitionEvents = {
	  addEndEventListener: function (node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	  removeEndEventListener: function (node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	module.exports = ReactTransitionEvents;

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */
	
	'use strict';
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {
	
	  canUseDOM: canUseDOM,
	
	  canUseWorkers: typeof Worker !== 'undefined',
	
	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
	
	  canUseViewport: canUseDOM && !!window.screen,
	
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.
	
	};
	
	module.exports = ExecutionEnvironment;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactDom = __webpack_require__(5);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function call_show_method($node, props) {
	  $node[props.showMethod]({
	    duration: props.showDuration,
	    easing: props.showEasing
	  });
	}
	
	exports.default = {
	  getDefaultProps: function getDefaultProps() {
	    return {
	      style: {
	        display: "none" },
	      // effective $.hide()
	      showMethod: "fadeIn", // slideDown, and show are built into jQuery
	      showDuration: 300,
	      showEasing: "swing", // and linear are built into jQuery
	      hideMethod: "fadeOut",
	      hideDuration: 1000,
	      hideEasing: "swing",
	      //
	      timeOut: 5000,
	      extendedTimeOut: 1000
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      intervalId: null,
	      isHiding: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    call_show_method(this._get_$_node(), this.props);
	    if (this.props.timeOut > 0) {
	      this._set_interval_id(setTimeout(this.hideToast, this.props.timeOut));
	    }
	  },
	  handleMouseEnter: function handleMouseEnter() {
	    clearTimeout(this.state.intervalId);
	    this._set_interval_id(null);
	    this._set_is_hiding(false);
	
	    call_show_method(this._get_$_node().stop(true, true), this.props);
	  },
	  handleMouseLeave: function handleMouseLeave() {
	    if (!this.state.isHiding && (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
	      this._set_interval_id(setTimeout(this.hideToast, this.props.extendedTimeOut));
	    }
	  },
	  hideToast: function hideToast(override) {
	    if (this.state.isHiding || this.state.intervalId === null && !override) {
	      return;
	    }
	    this.setState({ isHiding: true });
	
	    this._get_$_node()[this.props.hideMethod]({
	      duration: this.props.hideDuration,
	      easing: this.props.hideEasing,
	      complete: this._handle_remove
	    });
	  },
	  _get_$_node: function _get_$_node() {
	    /* eslint-disable no-undef */
	    return jQuery(_reactDom2.default.findDOMNode(this));
	    /* eslint-enable no-undef */
	  },
	  _set_interval_id: function _set_interval_id(intervalId) {
	    this.setState({
	      intervalId: intervalId
	    });
	  },
	  _set_is_hiding: function _set_is_hiding(isHiding) {
	    this.setState({
	      isHiding: isHiding
	    });
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PageButtonJs = __webpack_require__(30);
	
	var _PageButtonJs2 = _interopRequireDefault(_PageButtonJs);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var PaginationList = (function (_Component) {
	  _inherits(PaginationList, _Component);
	
	  function PaginationList() {
	    var _this = this;
	
	    _classCallCheck(this, PaginationList);
	
	    _get(Object.getPrototypeOf(PaginationList.prototype), 'constructor', this).apply(this, arguments);
	
	    this.changePage = function (page) {
	      var _props = _this.props;
	      var prePage = _props.prePage;
	      var currPage = _props.currPage;
	      var nextPage = _props.nextPage;
	      var lastPage = _props.lastPage;
	      var firstPage = _props.firstPage;
	      var sizePerPage = _props.sizePerPage;
	
	      if (page === prePage) {
	        page = currPage - 1 < 1 ? 1 : currPage - 1;
	      } else if (page === nextPage) {
	        page = currPage + 1 > _this.totalPages ? _this.totalPages : currPage + 1;
	      } else if (page === lastPage) {
	        page = _this.totalPages;
	      } else if (page === firstPage) {
	        page = 1;
	      } else {
	        page = parseInt(page, 10);
	      }
	
	      if (page !== currPage) {
	        _this.props.changePage(page, sizePerPage);
	      }
	    };
	
	    this.changeSizePerPage = function (e) {
	      e.preventDefault();
	
	      var selectSize = parseInt(e.currentTarget.text, 10);
	      var currPage = _this.props.currPage;
	
	      if (selectSize !== _this.props.sizePerPage) {
	        _this.totalPages = Math.ceil(_this.props.dataSize / selectSize);
	        if (currPage > _this.totalPages) currPage = _this.totalPages;
	
	        _this.props.changePage(currPage, selectSize);
	        if (_this.props.onSizePerPageList) {
	          _this.props.onSizePerPageList(selectSize);
	        }
	      }
	    };
	  }
	
	  _createClass(PaginationList, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props2 = this.props;
	      var dataSize = _props2.dataSize;
	      var sizePerPage = _props2.sizePerPage;
	      var sizePerPageList = _props2.sizePerPageList;
	
	      this.totalPages = Math.ceil(dataSize / sizePerPage);
	      var pageBtns = this.makePage();
	      var pageListStyle = {
	        float: 'right',
	        // override the margin-top defined in .pagination class in bootstrap.
	        marginTop: '0px'
	      };
	
	      var sizePerPageOptions = sizePerPageList.map(function (_sizePerPage) {
	        return _react2['default'].createElement(
	          'li',
	          { key: _sizePerPage, role: 'presentation' },
	          _react2['default'].createElement(
	            'a',
	            { role: 'menuitem',
	              tabIndex: '-1', href: '#',
	              onClick: _this2.changeSizePerPage },
	            _sizePerPage
	          )
	        );
	      });
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'row', style: { marginTop: 15 } },
	        sizePerPageList.length > 1 ? _react2['default'].createElement(
	          'div',
	          null,
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-md-6' },
	            _react2['default'].createElement(
	              'div',
	              { className: 'dropdown' },
	              _react2['default'].createElement(
	                'button',
	                { className: 'btn btn-default dropdown-toggle',
	                  type: 'button', id: 'pageDropDown', 'data-toggle': 'dropdown',
	                  'aria-expanded': 'true' },
	                sizePerPage,
	                _react2['default'].createElement(
	                  'span',
	                  null,
	                  ' ',
	                  _react2['default'].createElement('span', { className: 'caret' })
	                )
	              ),
	              _react2['default'].createElement(
	                'ul',
	                { className: 'dropdown-menu', role: 'menu', 'aria-labelledby': 'pageDropDown' },
	                sizePerPageOptions
	              )
	            )
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-md-6' },
	            _react2['default'].createElement(
	              'ul',
	              { className: 'pagination', style: pageListStyle },
	              pageBtns
	            )
	          )
	        ) : _react2['default'].createElement(
	          'div',
	          { className: 'col-md-12' },
	          _react2['default'].createElement(
	            'ul',
	            { className: 'pagination', style: pageListStyle },
	            pageBtns
	          )
	        )
	      );
	    }
	  }, {
	    key: 'makePage',
	    value: function makePage() {
	      var pages = this.getPages();
	      return pages.map(function (page) {
	        var isActive = page === this.props.currPage;
	        var disabled = false;
	        var hidden = false;
	        if (this.props.currPage === 1 && (page === this.props.firstPage || page === this.props.prePage)) {
	          disabled = true;
	          hidden = true;
	        }
	        if (this.props.currPage === this.totalPages && (page === this.props.nextPage || page === this.props.lastPage)) {
	          disabled = true;
	          hidden = true;
	        }
	        return _react2['default'].createElement(
	          _PageButtonJs2['default'],
	          { key: page,
	            changePage: this.changePage,
	            active: isActive,
	            disable: disabled,
	            hidden: hidden },
	          page
	        );
	      }, this);
	    }
	  }, {
	    key: 'getPages',
	    value: function getPages() {
	      var pages = undefined;
	      var startPage = 1;
	      var endPage = this.totalPages;
	
	      startPage = Math.max(this.props.currPage - Math.floor(this.props.paginationSize / 2), 1);
	      endPage = startPage + this.props.paginationSize - 1;
	
	      if (endPage > this.totalPages) {
	        endPage = this.totalPages;
	        startPage = endPage - this.props.paginationSize + 1;
	      }
	
	      if (startPage !== 1 && this.totalPages > this.props.paginationSize) {
	        pages = [this.props.firstPage, this.props.prePage];
	      } else if (this.totalPages > 1) {
	        pages = [this.props.prePage];
	      } else {
	        pages = [];
	      }
	
	      for (var i = startPage; i <= endPage; i++) {
	        if (i > 0) pages.push(i);
	      }
	
	      if (endPage !== this.totalPages) {
	        pages.push(this.props.nextPage);
	        pages.push(this.props.lastPage);
	      } else if (this.totalPages > 1) {
	        pages.push(this.props.nextPage);
	      }
	      return pages;
	    }
	  }]);
	
	  return PaginationList;
	})(_react.Component);
	
	PaginationList.propTypes = {
	  currPage: _react.PropTypes.number,
	  sizePerPage: _react.PropTypes.number,
	  dataSize: _react.PropTypes.number,
	  changePage: _react.PropTypes.func,
	  sizePerPageList: _react.PropTypes.array,
	  paginationSize: _react.PropTypes.number,
	  remote: _react.PropTypes.bool,
	  onSizePerPageList: _react.PropTypes.func,
	  prePage: _react.PropTypes.string
	};
	
	PaginationList.defaultProps = {
	  sizePerPage: _Const2['default'].SIZE_PER_PAGE
	};
	
	exports['default'] = PaginationList;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var PageButton = (function (_Component) {
	  _inherits(PageButton, _Component);
	
	  function PageButton(props) {
	    var _this = this;
	
	    _classCallCheck(this, PageButton);
	
	    _get(Object.getPrototypeOf(PageButton.prototype), 'constructor', this).call(this, props);
	
	    this.pageBtnClick = function (e) {
	      e.preventDefault();
	      _this.props.changePage(e.currentTarget.textContent);
	    };
	  }
	
	  _createClass(PageButton, [{
	    key: 'render',
	    value: function render() {
	      var classes = (0, _classnames2['default'])({
	        'active': this.props.active,
	        'disabled': this.props.disable,
	        'hidden': this.props.hidden
	      });
	      return _react2['default'].createElement(
	        'li',
	        { className: classes },
	        _react2['default'].createElement(
	          'a',
	          { href: '#', onClick: this.pageBtnClick },
	          this.props.children
	        )
	      );
	    }
	  }]);
	
	  return PageButton;
	})(_react.Component);
	
	PageButton.propTypes = {
	  changePage: _react.PropTypes.func,
	  active: _react.PropTypes.bool,
	  disable: _react.PropTypes.bool,
	  hidden: _react.PropTypes.bool,
	  children: _react.PropTypes.node
	};
	
	exports['default'] = PageButton;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _Editor = __webpack_require__(12);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	var _NotificationJs = __webpack_require__(13);
	
	var _NotificationJs2 = _interopRequireDefault(_NotificationJs);
	
	var ToolBar = (function (_Component) {
	  _inherits(ToolBar, _Component);
	
	  function ToolBar(props) {
	    var _this = this;
	
	    _classCallCheck(this, ToolBar);
	
	    _get(Object.getPrototypeOf(ToolBar.prototype), 'constructor', this).call(this, props);
	
	    this.handleSaveBtnClick = function () {
	      var newObj = _this.checkAndParseForm();
	      if (!newObj) {
	        // validate errors
	        return;
	      }
	      var msg = _this.props.onAddRow(newObj);
	      if (msg) {
	        _this.refs.notifier.notice('error', msg, 'Pressed ESC can cancel');
	        _this.clearTimeout();
	        // shake form and hack prevent modal hide
	        _this.setState({
	          shakeEditor: true,
	          validateState: 'this is hack for prevent bootstrap modal hide'
	        });
	        // clear animate class
	        _this.timeouteClear = setTimeout(function () {
	          _this.setState({ shakeEditor: false });
	        }, 300);
	      } else {
	        // reset state and hide modal hide
	        _this.setState({
	          validateState: null,
	          shakeEditor: false
	        }, function () {
	          document.querySelector('.modal-backdrop').click();
	          document.querySelector('.' + _this.modalClassName).click();
	        });
	        // reset form
	        _this.refs.form.reset();
	      }
	    };
	
	    this.handleShowOnlyToggle = function () {
	      _this.setState({
	        showSelected: !_this.state.showSelected
	      });
	      _this.props.onShowOnlySelected();
	    };
	
	    this.handleDropRowBtnClick = function () {
	      _this.props.onDropRow();
	    };
	
	    this.handleKeyUp = function (e) {
	      _this.props.onSearch(e.currentTarget.value);
	    };
	
	    this.handleExportCSV = function () {
	      _this.props.onExportCSV();
	    };
	
	    this.handleClearBtnClick = function () {
	      _this.refs.seachInput.value = '';
	      _this.props.onSearch('');
	    };
	
	    this.timeouteClear = 0;
	    this.modalClassName;
	    this.state = {
	      isInsertRowTrigger: true,
	      validateState: null,
	      shakeEditor: false,
	      showSelected: false
	    };
	  }
	
	  _createClass(ToolBar, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearTimeout();
	    }
	  }, {
	    key: 'clearTimeout',
	    value: (function (_clearTimeout) {
	      function clearTimeout() {
	        return _clearTimeout.apply(this, arguments);
	      }
	
	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };
	
	      return clearTimeout;
	    })(function () {
	      if (this.timeouteClear) {
	        clearTimeout(this.timeouteClear);
	        this.timeouteClear = 0;
	      }
	    })
	  }, {
	    key: 'checkAndParseForm',
	    value: function checkAndParseForm() {
	      var _this2 = this;
	
	      var newObj = {};
	      var validateState = {};
	      var isValid = true;
	      var tempValue = undefined;
	      var tempMsg = undefined;
	
	      this.props.columns.forEach(function (column, i) {
	        if (column.autoValue) {
	          // when you want same auto generate value and not allow edit, example ID field
	          var time = new Date().getTime();
	          tempValue = typeof column.autoValue === 'function' ? column.autoValue() : 'autovalue-' + time;
	        } else {
	          var dom = this.refs[column.field + i];
	          tempValue = dom.value;
	
	          if (column.editable && column.editable.type === 'checkbox') {
	            var values = tempValue.split(':');
	            tempValue = dom.checked ? values[0] : values[1];
	          }
	
	          if (column.editable && column.editable.validator) {
	            // process validate
	            tempMsg = column.editable.validator(tempValue);
	            if (tempMsg !== true) {
	              isValid = false;
	              validateState[column.field] = tempMsg;
	            }
	          }
	        }
	
	        newObj[column.field] = tempValue;
	      }, this);
	
	      if (isValid) {
	        return newObj;
	      } else {
	        this.clearTimeout();
	        // show error in form and shake it
	        this.setState({ validateState: validateState, shakeEditor: true });
	        // notifier error
	        this.refs.notifier.notice('error', 'Form validate errors, please checking!', 'Pressed ESC can cancel');
	        // clear animate class
	        this.timeouteClear = setTimeout(function () {
	          _this2.setState({ shakeEditor: false });
	        }, 300);
	        return null;
	      }
	    }
	  }, {
	    key: 'handleCloseBtn',
	    value: function handleCloseBtn() {
	      this.refs.warning.style.display = 'none';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.modalClassName = 'bs-table-modal-sm' + new Date().getTime();
	      var insertBtn = null;
	      var deleteBtn = null;
	      var exportCSV = null;
	      var showSelectedOnlyBtn = null;
	
	      if (this.props.enableInsert) {
	        insertBtn = _react2['default'].createElement(
	          'button',
	          { type: 'button',
	            className: 'btn btn-info react-bs-table-add-btn',
	            'data-toggle': 'modal',
	            'data-target': '.' + this.modalClassName },
	          _react2['default'].createElement('i', { className: 'glyphicon glyphicon-plus' }),
	          ' New'
	        );
	      }
	
	      if (this.props.enableDelete) {
	        deleteBtn = _react2['default'].createElement(
	          'button',
	          { type: 'button',
	            className: 'btn btn-warning react-bs-table-del-btn',
	            'data-toggle': 'tooltip',
	            'data-placement': 'right',
	            title: 'Drop selected row',
	            onClick: this.handleDropRowBtnClick },
	          _react2['default'].createElement('i', { className: 'glyphicon glyphicon-trash' }),
	          ' Delete'
	        );
	      }
	
	      if (this.props.enableShowOnlySelected) {
	        showSelectedOnlyBtn = _react2['default'].createElement(
	          'button',
	          { type: 'button',
	            onClick: this.handleShowOnlyToggle,
	            className: 'btn btn-primary',
	            'data-toggle': 'button',
	            'aria-pressed': 'false' },
	          this.state.showSelected ? _Const2['default'].SHOW_ALL : _Const2['default'].SHOW_ONLY_SELECT
	        );
	      }
	
	      if (this.props.enableExportCSV) {
	        exportCSV = _react2['default'].createElement(
	          'button',
	          { type: 'button',
	            className: 'btn btn-success',
	            onClick: this.handleExportCSV },
	          _react2['default'].createElement('i', { className: 'glyphicon glyphicon-export' }),
	          ' Export to CSV'
	        );
	      }
	
	      var searchTextInput = this.renderSearchPanel();
	      var modal = this.props.enableInsert ? this.renderInsertRowModal() : null;
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'row' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-6 col-md-6 col-lg-8' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'btn-group btn-group-sm', role: 'group' },
	            exportCSV,
	            insertBtn,
	            deleteBtn,
	            showSelectedOnlyBtn
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-6 col-md-6 col-lg-4' },
	          searchTextInput
	        ),
	        _react2['default'].createElement(_NotificationJs2['default'], { ref: 'notifier' }),
	        modal
	      );
	    }
	  }, {
	    key: 'renderSearchPanel',
	    value: function renderSearchPanel() {
	      if (this.props.enableSearch) {
	        var classNames = 'form-group form-group-sm react-bs-table-search-form';
	        var clearBtn = null;
	        if (this.props.clearSearch) {
	          clearBtn = _react2['default'].createElement(
	            'span',
	            { className: 'input-group-btn' },
	            _react2['default'].createElement(
	              'button',
	              {
	                className: 'btn btn-default',
	                type: 'button',
	                onClick: this.handleClearBtnClick },
	              'Clear'
	            )
	          );
	          classNames += ' input-group input-group-sm';
	        }
	
	        return _react2['default'].createElement(
	          'div',
	          { className: classNames },
	          _react2['default'].createElement('input', { ref: 'seachInput',
	            className: 'form-control',
	            type: 'text',
	            placeholder: this.props.searchPlaceholder ? this.props.searchPlaceholder : 'Search',
	            onKeyUp: this.handleKeyUp }),
	          clearBtn
	        );
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'renderInsertRowModal',
	    value: function renderInsertRowModal() {
	      var validateState = this.state.validateState || {};
	      var shakeEditor = this.state.shakeEditor;
	      var inputField = this.props.columns.map(function (column, i) {
	        var editable = column.editable;
	        var format = column.format;
	        var field = column.field;
	        var name = column.name;
	        var autoValue = column.autoValue;
	
	        var attr = {
	          ref: field + i,
	          placeholder: editable.placeholder ? editable.placeholder : name
	        };
	
	        if (autoValue) {
	          // when you want same auto generate value
	          // and not allow edit, for example ID field
	          return null;
	        }
	        var error = validateState[field] ? _react2['default'].createElement(
	          'span',
	          { className: 'help-block bg-danger' },
	          validateState[field]
	        ) : null;
	
	        // let editor = Editor(editable,attr,format);
	        // if(editor.props.type && editor.props.type == 'checkbox'){
	        return _react2['default'].createElement(
	          'div',
	          { className: 'form-group', key: field },
	          _react2['default'].createElement(
	            'label',
	            null,
	            name
	          ),
	          (0, _Editor2['default'])(editable, attr, format, ''),
	          error
	        );
	      });
	      var modalClass = (0, _classnames2['default'])('modal', 'fade', this.modalClassName, {
	        // hack prevent bootstrap modal hide by reRender
	        'in': shakeEditor || this.state.validateState
	      });
	      var dialogClass = (0, _classnames2['default'])('modal-dialog', 'modal-sm', {
	        'animated': shakeEditor,
	        'shake': shakeEditor
	      });
	      return _react2['default'].createElement(
	        'div',
	        { ref: 'modal', className: modalClass, tabIndex: '-1', role: 'dialog' },
	        _react2['default'].createElement(
	          'div',
	          { className: dialogClass },
	          _react2['default'].createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2['default'].createElement(
	              'div',
	              { className: 'modal-header' },
	              _react2['default'].createElement(
	                'button',
	                { type: 'button',
	                  className: 'close',
	                  'data-dismiss': 'modal',
	                  'aria-label': 'Close' },
	                _react2['default'].createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  '×'
	                )
	              ),
	              _react2['default'].createElement(
	                'h4',
	                { className: 'modal-title' },
	                'New Record'
	              )
	            ),
	            _react2['default'].createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2['default'].createElement(
	                'form',
	                { ref: 'form' },
	                inputField
	              )
	            ),
	            _react2['default'].createElement(
	              'div',
	              { className: 'modal-footer' },
	              _react2['default'].createElement(
	                'button',
	                { type: 'button',
	                  className: 'btn btn-default',
	                  'data-dismiss': 'modal' },
	                'Close'
	              ),
	              _react2['default'].createElement(
	                'button',
	                { type: 'button',
	                  className: 'btn btn-info',
	                  onClick: this.handleSaveBtnClick },
	                'Save'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ToolBar;
	})(_react.Component);
	
	ToolBar.propTypes = {
	  onAddRow: _react.PropTypes.func,
	  onDropRow: _react.PropTypes.func,
	  onShowOnlySelected: _react.PropTypes.func,
	  enableInsert: _react.PropTypes.bool,
	  enableDelete: _react.PropTypes.bool,
	  enableSearch: _react.PropTypes.bool,
	  enableShowOnlySelected: _react.PropTypes.bool,
	  columns: _react.PropTypes.array,
	  searchPlaceholder: _react.PropTypes.string,
	  clearSearch: _react.PropTypes.bool
	};
	
	ToolBar.defaultProps = {
	  enableInsert: false,
	  enableDelete: false,
	  enableSearch: false,
	  enableShowOnlySelected: false,
	  clearSearch: false
	};
	
	exports['default'] = ToolBar;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var TableFilter = (function (_Component) {
	  _inherits(TableFilter, _Component);
	
	  function TableFilter(props) {
	    var _this = this;
	
	    _classCallCheck(this, TableFilter);
	
	    _get(Object.getPrototypeOf(TableFilter.prototype), 'constructor', this).call(this, props);
	
	    this.handleKeyUp = function (e) {
	      var _e$currentTarget = e.currentTarget;
	      var value = _e$currentTarget.value;
	      var name = _e$currentTarget.name;
	
	      if (value.trim() === '') {
	        delete _this.filterObj[name];
	      } else {
	        _this.filterObj[name] = value;
	      }
	      _this.props.onFilter(_this.filterObj);
	    };
	
	    this.filterObj = {};
	  }
	
	  _createClass(TableFilter, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var striped = _props.striped;
	      var condensed = _props.condensed;
	      var rowSelectType = _props.rowSelectType;
	      var columns = _props.columns;
	
	      var tableClasses = (0, _classnames2['default'])('table', {
	        'table-striped': striped,
	        'table-condensed': condensed
	      });
	      var selectRowHeader = null;
	
	      if (rowSelectType === _Const2['default'].ROW_SELECT_SINGLE || rowSelectType === _Const2['default'].ROW_SELECT_MULTI) {
	        var style = {
	          width: 35,
	          paddingLeft: 0,
	          paddingRight: 0
	        };
	        selectRowHeader = _react2['default'].createElement(
	          'th',
	          { style: style, key: -1 },
	          'Filter'
	        );
	      }
	
	      var filterField = columns.map(function (column) {
	        var hidden = column.hidden;
	        var width = column.width;
	        var name = column.name;
	
	        var thStyle = {
	          display: hidden ? 'none' : null,
	          width: width
	        };
	        return _react2['default'].createElement(
	          'th',
	          { key: name, style: thStyle },
	          _react2['default'].createElement(
	            'div',
	            { className: 'th-inner table-header-column' },
	            _react2['default'].createElement('input', { size: '10', type: 'text',
	              placeholder: name, name: name, onKeyUp: this.handleKeyUp })
	          )
	        );
	      }, this);
	
	      return _react2['default'].createElement(
	        'table',
	        { className: tableClasses, style: { marginTop: 5 } },
	        _react2['default'].createElement(
	          'thead',
	          null,
	          _react2['default'].createElement(
	            'tr',
	            { style: { borderBottomStyle: 'hidden' } },
	            selectRowHeader,
	            filterField
	          )
	        )
	      );
	    }
	  }]);
	
	  return TableFilter;
	})(_react.Component);
	
	TableFilter.propTypes = {
	  columns: _react.PropTypes.array,
	  rowSelectType: _react.PropTypes.string,
	  onFilter: _react.PropTypes.func
	};
	exports['default'] = TableFilter;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-nested-ternary: 0 */
	/* eslint guard-for-in: 0 */
	/* eslint no-console: 0 */
	/* eslint eqeqeq: 0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var EventEmitter = __webpack_require__(34).EventEmitter;
	
	function _sort(arr, sortField, order, sortFunc) {
	  order = order.toLowerCase();
	  arr.sort(function (a, b) {
	    if (sortFunc) {
	      return sortFunc(a, b, order, sortField);
	    } else {
	      if (order === _Const2['default'].SORT_DESC) {
	        return a[sortField] > b[sortField] ? -1 : a[sortField] < b[sortField] ? 1 : 0;
	      } else {
	        return a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0;
	      }
	    }
	  });
	
	  return arr;
	}
	
	var TableDataSet = (function (_EventEmitter) {
	  _inherits(TableDataSet, _EventEmitter);
	
	  function TableDataSet(data) {
	    _classCallCheck(this, TableDataSet);
	
	    _get(Object.getPrototypeOf(TableDataSet.prototype), 'constructor', this).call(this, data);
	    this.data = data;
	  }
	
	  _createClass(TableDataSet, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.emit('change', data);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.data = null;
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return this.data;
	    }
	  }]);
	
	  return TableDataSet;
	})(EventEmitter);
	
	exports.TableDataSet = TableDataSet;
	
	var TableDataStore = (function () {
	  function TableDataStore(data) {
	    _classCallCheck(this, TableDataStore);
	
	    this.data = data;
	    this.colInfos = null;
	    this.filteredData = null;
	    this.isOnFilter = false;
	    this.filterObj = null;
	    this.searchText = null;
	    this.sortObj = null;
	    this.pageObj = {};
	    this.selected = [];
	    this.multiColumnSearch = false;
	    this.showOnlySelected = false;
	    this.remote = false; // remote data
	  }
	
	  _createClass(TableDataStore, [{
	    key: 'setProps',
	    value: function setProps(props) {
	      this.keyField = props.keyField;
	      this.enablePagination = props.isPagination;
	      this.colInfos = props.colInfos;
	      this.remote = props.remote;
	      this.multiColumnSearch = props.multiColumnSearch;
	    }
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      this.data = data;
	      if (this.isOnFilter) {
	        if (this.filterObj !== null) this.filter(this.filterObj);
	        if (this.searchText !== null) this.search(this.searchText);
	      }
	      if (this.sortObj) {
	        this.sort(this.sortObj.order, this.sortObj.sortField);
	      }
	    }
	  }, {
	    key: 'getSortInfo',
	    value: function getSortInfo() {
	      return this.sortObj;
	    }
	  }, {
	    key: 'setSelectedRowKey',
	    value: function setSelectedRowKey(selectedRowKeys) {
	      this.selected = selectedRowKeys;
	    }
	  }, {
	    key: 'getSelectedRowKeys',
	    value: function getSelectedRowKeys() {
	      return this.selected;
	    }
	  }, {
	    key: 'getCurrentDisplayData',
	    value: function getCurrentDisplayData() {
	      if (this.isOnFilter) return this.filteredData;else return this.data;
	    }
	  }, {
	    key: 'ignoreNonSelected',
	    value: function ignoreNonSelected() {
	      var _this = this;
	
	      this.showOnlySelected = !this.showOnlySelected;
	      if (this.showOnlySelected) {
	        this.isOnFilter = true;
	        this.filteredData = this.data.filter(function (row) {
	          var result = _this.selected.find(function (x) {
	            return row[_this.keyField] === x;
	          });
	          return typeof result !== 'undefined' ? true : false;
	        });
	      } else {
	        this.isOnFilter = false;
	      }
	    }
	  }, {
	    key: 'sort',
	    value: function sort(order, sortField) {
	      this.sortObj = { order: order, sortField: sortField };
	
	      var currentDisplayData = this.getCurrentDisplayData();
	      if (!this.colInfos[sortField]) return this;
	
	      var sortFunc = this.colInfos[sortField].sortFunc;
	
	      currentDisplayData = _sort(currentDisplayData, sortField, order, sortFunc);
	
	      return this;
	    }
	  }, {
	    key: 'page',
	    value: function page(_page, sizePerPage) {
	      this.pageObj.end = _page * sizePerPage - 1;
	      this.pageObj.start = this.pageObj.end - (sizePerPage - 1);
	      return this;
	    }
	  }, {
	    key: 'edit',
	    value: function edit(newVal, rowIndex, fieldName) {
	      var currentDisplayData = this.getCurrentDisplayData();
	      var rowKeyCache = undefined;
	      if (!this.enablePagination) {
	        currentDisplayData[rowIndex][fieldName] = newVal;
	        rowKeyCache = currentDisplayData[rowIndex][this.keyField];
	      } else {
	        currentDisplayData[this.pageObj.start + rowIndex][fieldName] = newVal;
	        rowKeyCache = currentDisplayData[this.pageObj.start + rowIndex][this.keyField];
	      }
	      if (this.isOnFilter) {
	        this.data.forEach(function (row) {
	          if (row[this.keyField] === rowKeyCache) {
	            row[fieldName] = newVal;
	          }
	        }, this);
	        if (this.filterObj !== null) this.filter(this.filterObj);
	        if (this.searchText !== null) this.search(this.searchText);
	      }
	      return this;
	    }
	  }, {
	    key: 'addAtBegin',
	    value: function addAtBegin(newObj) {
	      if (!newObj[this.keyField] || newObj[this.keyField].toString() === '') {
	        throw this.keyField + ' can\'t be empty value.';
	      }
	      var currentDisplayData = this.getCurrentDisplayData();
	      currentDisplayData.forEach(function (row) {
	        if (row[this.keyField].toString() === newObj[this.keyField].toString()) {
	          throw this.keyField + ' ' + newObj[this.keyField] + ' already exists';
	        }
	      }, this);
	      currentDisplayData.unshift(newObj);
	      if (this.isOnFilter) {
	        this.data.unshift(newObj);
	      }
	    }
	  }, {
	    key: 'add',
	    value: function add(newObj) {
	      if (!newObj[this.keyField] || newObj[this.keyField].toString() === '') {
	        throw this.keyField + ' can\'t be empty value.';
	      }
	      var currentDisplayData = this.getCurrentDisplayData();
	      currentDisplayData.forEach(function (row) {
	        if (row[this.keyField].toString() === newObj[this.keyField].toString()) {
	          throw this.keyField + ' ' + newObj[this.keyField] + ' already exists';
	        }
	      }, this);
	
	      currentDisplayData.push(newObj);
	      if (this.isOnFilter) {
	        this.data.push(newObj);
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove(rowKey) {
	      var _this2 = this;
	
	      var currentDisplayData = this.getCurrentDisplayData();
	      var result = currentDisplayData.filter(function (row) {
	        return rowKey.indexOf(row[_this2.keyField]) === -1;
	      });
	
	      if (this.isOnFilter) {
	        this.data = this.data.filter(function (row) {
	          return rowKey.indexOf(row[_this2.keyField]) === -1;
	        });
	        this.filteredData = result;
	      } else {
	        this.data = result;
	      }
	    }
	  }, {
	    key: 'filter',
	    value: function filter(filterObj) {
	      var _this3 = this;
	
	      if (Object.keys(filterObj).length === 0) {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.filterObj = null;
	        if (this.searchText !== null) this.search(this.searchText);
	      } else {
	        this.filterObj = filterObj;
	        this.filteredData = this.data.filter(function (row) {
	          var valid = true;
	          var filterVal = undefined;
	          for (var key in filterObj) {
	            var targetVal = row[key];
	
	            switch (filterObj[key].type) {
	              case _Const2['default'].FILTER_TYPE.NUMBER:
	                {
	                  filterVal = filterObj[key].value.number;
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.CUSTOM:
	                {
	                  filterVal = typeof filterObj[key].value === 'object' ? undefined : typeof filterObj[key].value === 'string' ? filterObj[key].value.toLowerCase() : filterObj[key].value;
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.REGEX:
	                {
	                  filterVal = filterObj[key].value;
	                  break;
	                }
	              default:
	                {
	                  filterVal = typeof filterObj[key].value === 'string' ? filterObj[key].value.toLowerCase() : filterObj[key].value;
	                  if (filterVal === undefined) {
	                    // Support old filter
	                    filterVal = filterObj[key].toLowerCase();
	                  }
	                  break;
	                }
	            }
	
	            if (_this3.colInfos[key]) {
	              var _colInfos$key = _this3.colInfos[key];
	              var format = _colInfos$key.format;
	              var filterFormatted = _colInfos$key.filterFormatted;
	              var formatExtraData = _colInfos$key.formatExtraData;
	
	              if (filterFormatted && format) {
	                targetVal = format(row[key], row, formatExtraData);
	              }
	            }
	
	            switch (filterObj[key].type) {
	              case _Const2['default'].FILTER_TYPE.NUMBER:
	                {
	                  valid = _this3.filterNumber(targetVal, filterVal, filterObj[key].value.comparator);
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.DATE:
	                {
	                  valid = _this3.filterDate(targetVal, filterVal);
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.REGEX:
	                {
	                  valid = _this3.filterRegex(targetVal, filterVal);
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.CUSTOM:
	                {
	                  valid = _this3.filterCustom(targetVal, filterVal, filterObj[key].value);
	                  break;
	                }
	              default:
	                {
	                  valid = _this3.filterText(targetVal, filterVal);
	                  break;
	                }
	            }
	            if (!valid) {
	              break;
	            }
	          }
	          return valid;
	        });
	        this.isOnFilter = true;
	      }
	    }
	  }, {
	    key: 'filterNumber',
	    value: function filterNumber(targetVal, filterVal, comparator) {
	      var valid = true;
	      switch (comparator) {
	        case '=':
	          {
	            if (targetVal != filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case '>':
	          {
	            if (targetVal <= filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case '>=':
	          {
	            if (targetVal < filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case '<':
	          {
	            if (targetVal >= filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case '<=':
	          {
	            if (targetVal > filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case '!=':
	          {
	            if (targetVal == filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        default:
	          {
	            console.error('Number comparator provided is not supported');
	            break;
	          }
	      }
	      return valid;
	    }
	  }, {
	    key: 'filterDate',
	    value: function filterDate(targetVal, filterVal) {
	      return targetVal.getDate() === filterVal.getDate() && targetVal.getMonth() === filterVal.getMonth() && targetVal.getFullYear() === filterVal.getFullYear();
	    }
	  }, {
	    key: 'filterRegex',
	    value: function filterRegex(targetVal, filterVal) {
	      try {
	        return new RegExp(filterVal, 'i').test(targetVal);
	      } catch (e) {
	        console.error('Invalid regular expression');
	        return true;
	      }
	    }
	  }, {
	    key: 'filterCustom',
	    value: function filterCustom(targetVal, filterVal, callbackInfo) {
	      if (callbackInfo !== null && typeof callbackInfo === 'object') {
	        return callbackInfo.callback(targetVal, callbackInfo.callbackParameters);
	      }
	
	      return this.filterText(targetVal, filterVal);
	    }
	  }, {
	    key: 'filterText',
	    value: function filterText(targetVal, filterVal) {
	      if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
	        return false;
	      }
	      return true;
	    }
	
	    /* General search function
	     * It will search for the text if the input includes that text;
	     */
	  }, {
	    key: 'search',
	    value: function search(searchText) {
	      var _this4 = this;
	
	      if (searchText.trim() === '') {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.searchText = null;
	        if (this.filterObj !== null) this.filter(this.filterObj);
	      } else {
	        (function () {
	          _this4.searchText = searchText;
	          var searchTextArray = [];
	
	          if (_this4.multiColumnSearch) {
	            searchTextArray = searchText.split(' ');
	          } else {
	            searchTextArray.push(searchText);
	          }
	
	          var source = _this4.isOnFilter ? _this4.filteredData : _this4.data;
	
	          _this4.filteredData = source.filter(function (row) {
	            var keys = Object.keys(row);
	            var valid = false;
	            // for loops are ugly, but performance matters here.
	            // And you cant break from a forEach.
	            // http://jsperf.com/for-vs-foreach/66
	            for (var i = 0, keysLength = keys.length; i < keysLength; i++) {
	              var key = keys[i];
	              if (_this4.colInfos[key] && row[key]) {
	                var _colInfos$key2 = _this4.colInfos[key];
	                var format = _colInfos$key2.format;
	                var filterFormatted = _colInfos$key2.filterFormatted;
	                var formatExtraData = _colInfos$key2.formatExtraData;
	                var searchable = _colInfos$key2.searchable;
	
	                var targetVal = row[key];
	                if (searchable) {
	                  if (filterFormatted && format) {
	                    targetVal = format(targetVal, row, formatExtraData);
	                  }
	                  for (var j = 0, textLength = searchTextArray.length; j < textLength; j++) {
	                    var filterVal = searchTextArray[j].toLowerCase();
	                    if (targetVal.toString().toLowerCase().indexOf(filterVal) !== -1) {
	                      valid = true;
	                      break;
	                    }
	                  }
	                }
	              }
	            }
	            return valid;
	          });
	          _this4.isOnFilter = true;
	        })();
	      }
	    }
	  }, {
	    key: 'getDataIgnoringPagination',
	    value: function getDataIgnoringPagination() {
	      return this.getCurrentDisplayData();
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      var _data = this.getCurrentDisplayData();
	
	      if (_data.length === 0) return _data;
	
	      if (this.remote || !this.enablePagination) {
	        return _data;
	      } else {
	        var result = [];
	        for (var i = this.pageObj.start; i <= this.pageObj.end; i++) {
	          result.push(_data[i]);
	          if (i + 1 === _data.length) break;
	        }
	        return result;
	      }
	    }
	  }, {
	    key: 'getKeyField',
	    value: function getKeyField() {
	      return this.keyField;
	    }
	  }, {
	    key: 'getDataNum',
	    value: function getDataNum() {
	      return this.getCurrentDisplayData().length;
	    }
	  }, {
	    key: 'isChangedPage',
	    value: function isChangedPage() {
	      return this.pageObj.start && this.pageObj.end ? true : false;
	    }
	  }, {
	    key: 'getAllRowkey',
	    value: function getAllRowkey() {
	      var _this5 = this;
	
	      return this.data.map(function (row) {
	        return row[_this5.keyField];
	      });
	    }
	  }]);
	
	  return TableDataStore;
	})();

	exports.TableDataStore = TableDataStore;

/***/ },
/* 34 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	exports['default'] = {
	  renderReactSortCaret: function renderReactSortCaret(order) {
	    var orderClass = (0, _classnames2['default'])('order', {
	      'dropup': order === _Const2['default'].SORT_ASC
	    });
	    return _react2['default'].createElement(
	      'span',
	      { className: orderClass },
	      _react2['default'].createElement('span', { className: 'caret', style: { margin: '0px 5px' } })
	    );
	  },
	
	  getScrollBarWidth: function getScrollBarWidth() {
	    var inner = document.createElement('p');
	    inner.style.width = '100%';
	    inner.style.height = '200px';
	
	    var outer = document.createElement('div');
	    outer.style.position = 'absolute';
	    outer.style.top = '0px';
	    outer.style.left = '0px';
	    outer.style.visibility = 'hidden';
	    outer.style.width = '200px';
	    outer.style.height = '150px';
	    outer.style.overflow = 'hidden';
	    outer.appendChild(inner);
	
	    document.body.appendChild(outer);
	    var w1 = inner.offsetWidth;
	    outer.style.overflow = 'scroll';
	    var w2 = inner.offsetWidth;
	    if (w1 === w2) w2 = outer.clientWidth;
	
	    document.body.removeChild(outer);
	
	    return w1 - w2;
	  },
	
	  canUseDOM: function canUseDOM() {
	    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint block-scoped-var: 0 */
	/* eslint vars-on-top: 0 */
	/* eslint no-var: 0 */
	/* eslint no-unused-vars: 0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	if (typeof window !== 'undefined') {
	  var filesaver = __webpack_require__(37);
	  var saveAs = filesaver.saveAs;
	}
	
	function toString(data, keys) {
	  var dataString = '';
	  if (data.length === 0) return dataString;
	
	  dataString += keys.join(',') + '\n';
	
	  data.map(function (row) {
	    keys.map(function (col, i) {
	      var cell = typeof row[col] !== 'undefined' ? '"' + row[col] + '"' : '';
	      dataString += cell;
	      if (i + 1 < keys.length) dataString += ',';
	    });
	
	    dataString += '\n';
	  });
	
	  return dataString;
	}
	
	var exportCSV = function exportCSV(data, keys, filename) {
	  var dataString = toString(data, keys);
	  if (typeof window !== 'undefined') {
	    saveAs(new Blob([dataString], { type: 'text/plain;charset=utf-8' }), filename || 'spreadsheet.csv');
	  }
	};
	
	exports['default'] = exportCSV;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
	 * A saveAs() FileSaver implementation.
	 * 1.1.20151003
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: MIT
	 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
	 */
	
	/*global self */
	/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */
	
	/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
	
	"use strict";
	
	var saveAs = saveAs || (function (view) {
		"use strict";
		// IE <10 is explicitly unsupported
		if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
			return;
		}
		var doc = view.document,
		   
		// only get URL when necessary in case Blob.js hasn't overridden it yet
		get_URL = function get_URL() {
			return view.URL || view.webkitURL || view;
		},
		    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
		    can_use_save_link = ("download" in save_link),
		    click = function click(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		},
		    is_safari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent),
		    webkit_req_fs = view.webkitRequestFileSystem,
		    req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem,
		    throw_outside = function throw_outside(ex) {
			(view.setImmediate || view.setTimeout)(function () {
				throw ex;
			}, 0);
		},
		    force_saveable_type = "application/octet-stream",
		    fs_min_size = 0,
		   
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		arbitrary_revoke_timeout = 500,
		    // in ms
		revoke = function revoke(file) {
			var revoker = function revoker() {
				if (typeof file === "string") {
					// file is an object URL
					get_URL().revokeObjectURL(file);
				} else {
					// file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		},
		    dispatch = function dispatch(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		},
		    auto_bom = function auto_bom(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob(["﻿", blob], { type: blob.type });
			}
			return blob;
		},
		    FileSaver = function FileSaver(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var filesaver = this,
			    type = blob.type,
			    blob_changed = false,
			    object_url,
			    target_view,
			    dispatch_all = function dispatch_all() {
				dispatch(filesaver, "writestart progress write writeend".split(" "));
			},
			   
			// on any filesys errors revert to saving with object URLs
			fs_error = function fs_error() {
				if (target_view && is_safari && typeof FileReader !== "undefined") {
					// Safari doesn't allow downloading of blob urls
					var reader = new FileReader();
					reader.onloadend = function () {
						var base64Data = reader.result;
						target_view.location.href = "data:attachment/file" + base64Data.slice(base64Data.search(/[,;]/));
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
					};
					reader.readAsDataURL(blob);
					filesaver.readyState = filesaver.INIT;
					return;
				}
				// don't create more object URLs than needed
				if (blob_changed || !object_url) {
					object_url = get_URL().createObjectURL(blob);
				}
				if (target_view) {
					target_view.location.href = object_url;
				} else {
					var new_tab = view.open(object_url, "_blank");
					if (new_tab == undefined && is_safari) {
						//Apple do not allow window.open, see http://bit.ly/1kZffRI
						view.location.href = object_url;
					}
				}
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
			},
			    abortable = function abortable(func) {
				return function () {
					if (filesaver.readyState !== filesaver.DONE) {
						return func.apply(this, arguments);
					}
				};
			},
			    create_if_not_found = { create: true, exclusive: false },
			    slice;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				setTimeout(function () {
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
					var save = function save() {
						dir.getFile(name, create_if_not_found, abortable(function (file) {
							file.createWriter(abortable(function (writer) {
								writer.onwriteend = function (event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function () {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function (event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function () {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, { create: false }, abortable(function (file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function (ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		},
		    FS_proto = FileSaver.prototype,
		    saveAs = function saveAs(blob, name, no_auto_bom) {
			return new FileSaver(blob, name, no_auto_bom);
		};
		// IE 10+ (native saveAs)
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			return function (blob, name, no_auto_bom) {
				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				return navigator.msSaveOrOpenBlob(blob, name || "download");
			};
		}
	
		FS_proto.abort = function () {
			var filesaver = this;
			filesaver.readyState = filesaver.DONE;
			dispatch(filesaver, "abort");
		};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;
	
		FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
	
		return saveAs;
	})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content);
	// `self` is undefined in Firefox for Android content script context
	// while `this` is nsIContentFrameMessageManager
	// with an attribute `content` that corresponds to the window
	
	if (typeof module !== "undefined" && module.exports) {
		module.exports.saveAs = saveAs;
	} else if ("function" !== "undefined" && __webpack_require__(38) !== null && __webpack_require__(39) != null) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 39 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _events = __webpack_require__(34);
	
	var Filter = (function (_EventEmitter) {
	  _inherits(Filter, _EventEmitter);
	
	  function Filter(data) {
	    _classCallCheck(this, Filter);
	
	    _get(Object.getPrototypeOf(Filter.prototype), 'constructor', this).call(this, data);
	    this.currentFilter = {};
	  }
	
	  _createClass(Filter, [{
	    key: 'handleFilter',
	    value: function handleFilter(dataField, value, type) {
	      var filterType = type || _Const2['default'].FILTER_TYPE.CUSTOM;
	
	      if (value !== null && typeof value === 'object') {
	        // value of the filter is an object
	        var hasValue = true;
	        for (var prop in value) {
	          if (!value[prop] || value[prop] === '') {
	            hasValue = false;
	            break;
	          }
	        }
	        // if one of the object properties is undefined or empty, we remove the filter
	        if (hasValue) {
	          this.currentFilter[dataField] = { value: value, type: filterType };
	        } else {
	          delete this.currentFilter[dataField];
	        }
	      } else if (!value || value.trim() === '') {
	        delete this.currentFilter[dataField];
	      } else {
	        this.currentFilter[dataField] = { value: value.trim(), type: filterType };
	      }
	      this.emit('onFilterChange', this.currentFilter);
	    }
	  }]);
	
	  return Filter;
	})(_events.EventEmitter);

	exports.Filter = Filter;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint default-case: 0 */
	/* eslint guard-for-in: 0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _util = __webpack_require__(35);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _filtersDate = __webpack_require__(42);
	
	var _filtersDate2 = _interopRequireDefault(_filtersDate);
	
	var _filtersText = __webpack_require__(43);
	
	var _filtersText2 = _interopRequireDefault(_filtersText);
	
	var _filtersRegex = __webpack_require__(44);
	
	var _filtersRegex2 = _interopRequireDefault(_filtersRegex);
	
	var _filtersSelect = __webpack_require__(45);
	
	var _filtersSelect2 = _interopRequireDefault(_filtersSelect);
	
	var _filtersNumber = __webpack_require__(46);
	
	var _filtersNumber2 = _interopRequireDefault(_filtersNumber);
	
	var TableHeaderColumn = (function (_Component) {
	  _inherits(TableHeaderColumn, _Component);
	
	  function TableHeaderColumn(props) {
	    var _this = this;
	
	    _classCallCheck(this, TableHeaderColumn);
	
	    _get(Object.getPrototypeOf(TableHeaderColumn.prototype), 'constructor', this).call(this, props);
	
	    this.handleColumnClick = function () {
	      if (!_this.props.dataSort) return;
	      var order = _this.props.sort === _Const2['default'].SORT_DESC ? _Const2['default'].SORT_ASC : _Const2['default'].SORT_DESC;
	      _this.props.onSort(order, _this.props.dataField);
	    };
	
	    this.handleFilter = this.handleFilter.bind(this);
	  }
	
	  _createClass(TableHeaderColumn, [{
	    key: 'handleFilter',
	    value: function handleFilter(value, type) {
	      this.props.filter.emitter.handleFilter(this.props.dataField, value, type);
	    }
	  }, {
	    key: 'getFilters',
	    value: function getFilters() {
	      switch (this.props.filter.type) {
	        case _Const2['default'].FILTER_TYPE.TEXT:
	          {
	            return _react2['default'].createElement(_filtersText2['default'], _extends({}, this.props.filter, {
	              columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.REGEX:
	          {
	            return _react2['default'].createElement(_filtersRegex2['default'], _extends({}, this.props.filter, {
	              columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.SELECT:
	          {
	            return _react2['default'].createElement(_filtersSelect2['default'], _extends({}, this.props.filter, {
	              columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.NUMBER:
	          {
	            return _react2['default'].createElement(_filtersNumber2['default'], _extends({}, this.props.filter, {
	              columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.DATE:
	          {
	            return _react2['default'].createElement(_filtersDate2['default'], _extends({}, this.props.filter, {
	              columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.CUSTOM:
	          {
	            return this.props.filter.getElement(this.handleFilter, this.props.filter.customFilterParameters);
	          }
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.refs['header-col'].setAttribute('data-field', this.props.dataField);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var defaultCaret = undefined;
	      var thStyle = {
	        textAlign: this.props.dataAlign,
	        display: this.props.hidden ? 'none' : null
	      };
	      if (this.props.sortIndicator) {
	        defaultCaret = !this.props.dataSort ? null : _react2['default'].createElement(
	          'span',
	          { className: 'order' },
	          _react2['default'].createElement(
	            'span',
	            { className: 'dropdown' },
	            _react2['default'].createElement('span', { className: 'caret', style: { margin: '10px 0 10px 5px', color: '#ccc' } })
	          ),
	          _react2['default'].createElement(
	            'span',
	            { className: 'dropup' },
	            _react2['default'].createElement('span', { className: 'caret', style: { margin: '10px 0', color: '#ccc' } })
	          )
	        );
	      }
	      var sortCaret = this.props.sort ? _util2['default'].renderReactSortCaret(this.props.sort) : defaultCaret;
	      var classes = this.props.className + ' ' + (this.props.dataSort ? 'sort-column' : '');
	
	      return _react2['default'].createElement(
	        'th',
	        { ref: 'header-col',
	          className: classes,
	          style: thStyle,
	          title: this.props.children,
	          onClick: this.handleColumnClick },
	        this.props.children,
	        sortCaret,
	        _react2['default'].createElement(
	          'div',
	          { onClick: function (e) {
	              return e.stopPropagation();
	            } },
	          this.props.filter ? this.getFilters() : null
	        )
	      );
	    }
	  }]);
	
	  return TableHeaderColumn;
	})(_react.Component);
	
	var filterTypeArray = [];
	for (var key in _Const2['default'].FILTER_TYPE) {
	  filterTypeArray.push(_Const2['default'].FILTER_TYPE[key]);
	}
	
	TableHeaderColumn.propTypes = {
	  dataField: _react.PropTypes.string,
	  dataAlign: _react.PropTypes.string,
	  dataSort: _react.PropTypes.bool,
	  onSort: _react.PropTypes.func,
	  dataFormat: _react.PropTypes.func,
	  isKey: _react.PropTypes.bool,
	  editable: _react.PropTypes.any,
	  hidden: _react.PropTypes.bool,
	  searchable: _react.PropTypes.bool,
	  className: _react.PropTypes.string,
	  width: _react.PropTypes.string,
	  sortFunc: _react.PropTypes.func,
	  columnClassName: _react.PropTypes.any,
	  filterFormatted: _react.PropTypes.bool,
	  sort: _react.PropTypes.string,
	  formatExtraData: _react.PropTypes.any,
	  filter: _react.PropTypes.shape({
	    type: _react.PropTypes.oneOf(filterTypeArray),
	    delay: _react.PropTypes.number,
	    options: _react.PropTypes.oneOfType([_react.PropTypes.object, // for SelectFilter
	    _react.PropTypes.arrayOf(_react.PropTypes.number) // for NumberFilter
	    ]),
	    numberComparators: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    emitter: _react.PropTypes.object,
	    placeholder: _react.PropTypes.string,
	    getElement: _react.PropTypes.func,
	    customFilterParameters: _react.PropTypes.object
	  }),
	  sortIndicator: _react.PropTypes.bool
	};
	
	TableHeaderColumn.defaultProps = {
	  dataAlign: 'left',
	  dataSort: false,
	  dataFormat: undefined,
	  isKey: false,
	  editable: true,
	  onSort: undefined,
	  hidden: false,
	  searchable: true,
	  className: '',
	  width: null,
	  sortFunc: undefined,
	  columnClassName: '',
	  filterFormatted: false,
	  sort: undefined,
	  formatExtraData: undefined,
	  filter: undefined,
	  sortIndicator: true
	};
	
	exports['default'] = TableHeaderColumn;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint quotes: 0 */
	/* eslint max-len: 0 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var DateFilter = (function (_Component) {
	  _inherits(DateFilter, _Component);
	
	  function DateFilter(props) {
	    _classCallCheck(this, DateFilter);
	
	    _get(Object.getPrototypeOf(DateFilter.prototype), 'constructor', this).call(this, props);
	    this.filter = this.filter.bind(this);
	  }
	
	  _createClass(DateFilter, [{
	    key: 'setDefaultDate',
	    value: function setDefaultDate() {
	      var defaultDate = '';
	      if (this.props.defaultValue) {
	        // Set the appropriate format for the input type=date, i.e. "YYYY-MM-DD"
	        var defaultValue = new Date(this.props.defaultValue);
	        defaultDate = defaultValue.getFullYear() + '-' + ("0" + (defaultValue.getMonth() + 1)).slice(-2) + '-' + ("0" + defaultValue.getDate()).slice(-2);
	      }
	      return defaultDate;
	    }
	  }, {
	    key: 'filter',
	    value: function filter(event) {
	      var dateValue = event.target.value;
	      if (dateValue) {
	        this.props.filterHandler(new Date(dateValue), _Const2['default'].FILTER_TYPE.DATE);
	      } else {
	        this.props.filterHandler(null, _Const2['default'].FILTER_TYPE.DATE);
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var dateValue = this.refs.inputDate.defaultValue;
	      if (dateValue) {
	        this.props.filterHandler(new Date(dateValue), _Const2['default'].FILTER_TYPE.DATE);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('input', { ref: 'inputDate',
	        className: 'filter date-filter form-control',
	        type: 'date',
	        onChange: this.filter,
	        defaultValue: this.setDefaultDate() });
	    }
	  }]);
	
	  return DateFilter;
	})(_react.Component);
	
	DateFilter.propTypes = {
	  filterHandler: _react.PropTypes.func.isRequired,
	  defaultValue: _react.PropTypes.object,
	  columnName: _react.PropTypes.string
	};
	
	exports['default'] = DateFilter;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var TextFilter = (function (_Component) {
	  _inherits(TextFilter, _Component);
	
	  function TextFilter(props) {
	    _classCallCheck(this, TextFilter);
	
	    _get(Object.getPrototypeOf(TextFilter.prototype), 'constructor', this).call(this, props);
	    this.filter = this.filter.bind(this);
	    this.timeout = null;
	  }
	
	  _createClass(TextFilter, [{
	    key: 'filter',
	    value: function filter(event) {
	      var _this = this;
	
	      if (this.timeout) {
	        clearTimeout(this.timeout);
	      }
	      var filterValue = event.target.value;
	      this.timeout = setTimeout(function () {
	        _this.props.filterHandler(filterValue, _Const2['default'].FILTER_TYPE.TEXT);
	      }, this.props.delay);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var defaultValue = this.refs.inputText.defaultValue;
	      if (defaultValue) {
	        this.props.filterHandler(defaultValue, _Const2['default'].FILTER_TYPE.TEXT);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.timeout);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var placeholder = _props.placeholder;
	      var columnName = _props.columnName;
	      var defaultValue = _props.defaultValue;
	
	      return _react2['default'].createElement('input', { ref: 'inputText',
	        className: 'filter text-filter form-control',
	        type: 'text',
	        onChange: this.filter,
	        placeholder: placeholder || 'Enter ' + columnName + '...',
	        defaultValue: defaultValue ? defaultValue : '' });
	    }
	  }]);
	
	  return TextFilter;
	})(_react.Component);
	
	TextFilter.propTypes = {
	  filterHandler: _react.PropTypes.func.isRequired,
	  defaultValue: _react.PropTypes.string,
	  delay: _react.PropTypes.number,
	  placeholder: _react.PropTypes.string,
	  columnName: _react.PropTypes.string
	};
	
	TextFilter.defaultProps = {
	  delay: _Const2['default'].FILTER_DELAY
	};
	
	exports['default'] = TextFilter;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var RegexFilter = (function (_Component) {
	  _inherits(RegexFilter, _Component);
	
	  function RegexFilter(props) {
	    _classCallCheck(this, RegexFilter);
	
	    _get(Object.getPrototypeOf(RegexFilter.prototype), 'constructor', this).call(this, props);
	    this.filter = this.filter.bind(this);
	    this.timeout = null;
	  }
	
	  _createClass(RegexFilter, [{
	    key: 'filter',
	    value: function filter(event) {
	      var _this = this;
	
	      if (this.timeout) {
	        clearTimeout(this.timeout);
	      }
	      var filterValue = event.target.value;
	      this.timeout = setTimeout(function () {
	        _this.props.filterHandler(filterValue, _Const2['default'].FILTER_TYPE.REGEX);
	      }, this.props.delay);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var value = this.refs.inputText.defaultValue;
	      if (value) {
	        this.props.filterHandler(value, _Const2['default'].FILTER_TYPE.REGEX);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.timeout);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var defaultValue = _props.defaultValue;
	      var placeholder = _props.placeholder;
	      var columnName = _props.columnName;
	
	      return _react2['default'].createElement('input', { ref: 'inputText',
	        className: 'filter text-filter form-control',
	        type: 'text',
	        onChange: this.filter,
	        placeholder: placeholder || 'Enter Regex for ' + columnName + '...',
	        defaultValue: defaultValue ? defaultValue : '' });
	    }
	  }]);
	
	  return RegexFilter;
	})(_react.Component);
	
	RegexFilter.propTypes = {
	  filterHandler: _react.PropTypes.func.isRequired,
	  defaultValue: _react.PropTypes.string,
	  delay: _react.PropTypes.number,
	  placeholder: _react.PropTypes.string,
	  columnName: _react.PropTypes.string
	};
	
	RegexFilter.defaultProps = {
	  delay: _Const2['default'].FILTER_DELAY
	};
	
	exports['default'] = RegexFilter;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var SelectFilter = (function (_Component) {
	  _inherits(SelectFilter, _Component);
	
	  function SelectFilter(props) {
	    _classCallCheck(this, SelectFilter);
	
	    _get(Object.getPrototypeOf(SelectFilter.prototype), 'constructor', this).call(this, props);
	    this.filter = this.filter.bind(this);
	    this.state = {
	      isPlaceholderSelected: this.props.defaultValue === undefined || !this.props.options.hasOwnProperty(this.props.defaultValue)
	    };
	  }
	
	  _createClass(SelectFilter, [{
	    key: 'filter',
	    value: function filter(event) {
	      var value = event.target.value;
	
	      this.setState({ isPlaceholderSelected: value === '' });
	      this.props.filterHandler(value, _Const2['default'].FILTER_TYPE.SELECT);
	    }
	  }, {
	    key: 'getOptions',
	    value: function getOptions() {
	      var optionTags = [];
	      var _props = this.props;
	      var options = _props.options;
	      var placeholder = _props.placeholder;
	      var columnName = _props.columnName;
	
	      optionTags.push(_react2['default'].createElement(
	        'option',
	        { key: '-1', value: '' },
	        placeholder || 'Select ' + columnName + '...'
	      ));
	      Object.keys(options).map(function (key) {
	        optionTags.push(_react2['default'].createElement(
	          'option',
	          { key: key, value: key },
	          options[key]
	        ));
	      });
	      return optionTags;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var value = this.refs.selectInput.value;
	      if (value) {
	        this.props.filterHandler(value, _Const2['default'].FILTER_TYPE.SELECT);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var selectClass = (0, _classnames2['default'])('filter', 'select-filter', 'form-control', { 'placeholder-selected': this.state.isPlaceholderSelected });
	
	      return _react2['default'].createElement(
	        'select',
	        { ref: 'selectInput',
	          className: selectClass,
	          onChange: this.filter,
	          defaultValue: this.props.defaultValue !== undefined ? this.props.defaultValue : '' },
	        this.getOptions()
	      );
	    }
	  }]);
	
	  return SelectFilter;
	})(_react.Component);
	
	SelectFilter.propTypes = {
	  filterHandler: _react.PropTypes.func.isRequired,
	  options: _react.PropTypes.object.isRequired,
	  placeholder: _react.PropTypes.string,
	  columnName: _react.PropTypes.string
	};
	
	exports['default'] = SelectFilter;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(3);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var legalComparators = ['=', '>', '>=', '<', '<=', '!='];
	
	var NumberFilter = (function (_Component) {
	  _inherits(NumberFilter, _Component);
	
	  function NumberFilter(props) {
	    _classCallCheck(this, NumberFilter);
	
	    _get(Object.getPrototypeOf(NumberFilter.prototype), 'constructor', this).call(this, props);
	    this.numberComparators = this.props.numberComparators || legalComparators;
	    this.timeout = null;
	    this.state = {
	      isPlaceholderSelected: this.props.defaultValue === undefined || this.props.defaultValue.number === undefined || this.props.options && this.props.options.indexOf(this.props.defaultValue.number) === -1
	    };
	    this.onChangeNumber = this.onChangeNumber.bind(this);
	    this.onChangeNumberSet = this.onChangeNumberSet.bind(this);
	    this.onChangeComparator = this.onChangeComparator.bind(this);
	  }
	
	  _createClass(NumberFilter, [{
	    key: 'onChangeNumber',
	    value: function onChangeNumber(event) {
	      var _this = this;
	
	      var comparator = this.refs.numberFilterComparator.value;
	      if (comparator === '') {
	        return;
	      }
	      if (this.timeout) {
	        clearTimeout(this.timeout);
	      }
	      var filterValue = event.target.value;
	      this.timeout = setTimeout(function () {
	        _this.props.filterHandler({ number: filterValue, comparator: comparator }, _Const2['default'].FILTER_TYPE.NUMBER);
	      }, this.props.delay);
	    }
	  }, {
	    key: 'onChangeNumberSet',
	    value: function onChangeNumberSet(event) {
	      var comparator = this.refs.numberFilterComparator.value;
	      var value = event.target.value;
	
	      this.setState({ isPlaceholderSelected: value === '' });
	      if (comparator === '') {
	        return;
	      }
	      this.props.filterHandler({ number: value, comparator: comparator }, _Const2['default'].FILTER_TYPE.NUMBER);
	    }
	  }, {
	    key: 'onChangeComparator',
	    value: function onChangeComparator(event) {
	      var value = this.refs.numberFilter.value;
	      var comparator = event.target.value;
	      if (value === '') {
	        return;
	      }
	      this.props.filterHandler({ number: value, comparator: comparator }, _Const2['default'].FILTER_TYPE.NUMBER);
	    }
	  }, {
	    key: 'getComparatorOptions',
	    value: function getComparatorOptions() {
	      var optionTags = [];
	      optionTags.push(_react2['default'].createElement('option', { key: '-1' }));
	      for (var i = 0; i < this.numberComparators.length; i++) {
	        optionTags.push(_react2['default'].createElement(
	          'option',
	          { key: i, value: this.numberComparators[i] },
	          this.numberComparators[i]
	        ));
	      }
	      return optionTags;
	    }
	  }, {
	    key: 'getNumberOptions',
	    value: function getNumberOptions() {
	      var optionTags = [];
	      var options = this.props.options;
	
	      optionTags.push(_react2['default'].createElement(
	        'option',
	        { key: '-1', value: '' },
	        this.props.placeholder || 'Select ' + this.props.columnName + '...'
	      ));
	      for (var i = 0; i < options.length; i++) {
	        optionTags.push(_react2['default'].createElement(
	          'option',
	          { key: i, value: options[i] },
	          options[i]
	        ));
	      }
	      return optionTags;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var comparator = this.refs.numberFilterComparator.value;
	      var number = this.refs.numberFilter.value;
	      if (comparator && number) {
	        this.props.filterHandler({ number: number, comparator: comparator }, _Const2['default'].FILTER_TYPE.NUMBER);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.timeout);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var selectClass = (0, _classnames2['default'])('select-filter', 'number-filter-input', 'form-control', { 'placeholder-selected': this.state.isPlaceholderSelected });
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'filter number-filter' },
	        _react2['default'].createElement(
	          'select',
	          { ref: 'numberFilterComparator',
	            className: 'number-filter-comparator form-control',
	            onChange: this.onChangeComparator,
	            defaultValue: this.props.defaultValue ? this.props.defaultValue.comparator : '' },
	          this.getComparatorOptions()
	        ),
	        this.props.options ? _react2['default'].createElement(
	          'select',
	          { ref: 'numberFilter',
	            className: selectClass,
	            onChange: this.onChangeNumberSet,
	            defaultValue: this.props.defaultValue ? this.props.defaultValue.number : '' },
	          this.getNumberOptions()
	        ) : _react2['default'].createElement('input', { ref: 'numberFilter',
	          type: 'number',
	          className: 'number-filter-input form-control',
	          placeholder: this.props.placeholder || 'Enter ' + this.props.columnName + '...',
	          onChange: this.onChangeNumber,
	          defaultValue: this.props.defaultValue ? this.props.defaultValue.number : '' })
	      );
	    }
	  }]);
	
	  return NumberFilter;
	})(_react.Component);
	
	NumberFilter.propTypes = {
	  filterHandler: _react.PropTypes.func.isRequired,
	  options: _react.PropTypes.arrayOf(_react.PropTypes.number),
	  defaultValue: _react.PropTypes.shape({
	    number: _react.PropTypes.number,
	    comparator: _react.PropTypes.oneOf(legalComparators)
	  }),
	  delay: _react.PropTypes.number,
	  /* eslint consistent-return: 0 */
	  numberComparators: function numberComparators(props, propName) {
	    if (!props[propName]) {
	      return;
	    }
	    for (var i = 0; i < props[propName].length; i++) {
	      var comparatorIsValid = false;
	      for (var j = 0; j < legalComparators.length; j++) {
	        if (legalComparators[j] === props[propName][i]) {
	          comparatorIsValid = true;
	          break;
	        }
	      }
	      if (!comparatorIsValid) {
	        return new Error('Number comparator provided is not supported.\n          Use only ' + legalComparators);
	      }
	    }
	  },
	  placeholder: _react.PropTypes.string,
	  columnName: _react.PropTypes.string
	};
	
	NumberFilter.defaultProps = {
	  delay: _Const2['default'].FILTER_DELAY
	};
	
	exports['default'] = NumberFilter;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZDJhNWYzY2RhMzY5Y2I5MTEwNCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL3NyYy9Db25zdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0RE9NXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIn0iLCJ3ZWJwYWNrOi8vLy4vfi9jbGFzc25hbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RSb3dIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVSb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQ29sdW1uLmpzIiwid2VicGFjazovLy8uL3NyYy9UYWJsZUVkaXRDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvYW5pbWF0aW9uTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9DU1NDb3JlLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy90b29sYmFyL1Rvb2xCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbGVzYXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbHRlcnMvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9UZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1JlZ2V4LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9OdW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7MkNDdEMyQixDQUFrQjs7Ozs4Q0FDZixFQUFxQjs7OztnREFDdEIsRUFBd0I7O0FBRXJELEtBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQ2pDLFNBQU0sQ0FBQyxjQUFjLDhCQUFpQixDQUFDO0FBQ3ZDLFNBQU0sQ0FBQyxpQkFBaUIsaUNBQW9CLENBQUM7QUFDN0MsU0FBTSxDQUFDLFlBQVksb0NBQWUsQ0FBQztFQUNwQztzQkFDYztBQUNiLGlCQUFjO0FBQ2Qsb0JBQWlC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QTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxxQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O2tD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QUFFLGlCQUFVLE1BQU07RUFDN0IsQ0FBQzs7QUFFRixhQUFZLENBQUMsWUFBWSxHQUFHO0FBQzFCLFFBQUssRUFBRSxtQkFBTSxZQUFZO0VBQzFCLENBQUM7O3NCQUVhLFlBQVkiLCJmaWxlIjoicmVhY3QtYm9vdHN0cmFwLXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RCb290c3RyYXBUYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEJvb3RzdHJhcFRhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJSZWFjdERPTVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDdkMmE1ZjNjZGEzNjljYjkxMTA0XG4gKiovIiwiaW1wb3J0IEJvb3RzdHJhcFRhYmxlIGZyb20gJy4vQm9vdHN0cmFwVGFibGUnO1xuaW1wb3J0IFRhYmxlSGVhZGVyQ29sdW1uIGZyb20gJy4vVGFibGVIZWFkZXJDb2x1bW4nO1xuaW1wb3J0IHsgVGFibGVEYXRhU2V0IH0gZnJvbSAnLi9zdG9yZS9UYWJsZURhdGFTdG9yZSc7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuQm9vdHN0cmFwVGFibGUgPSBCb290c3RyYXBUYWJsZTtcbiAgd2luZG93LlRhYmxlSGVhZGVyQ29sdW1uID0gVGFibGVIZWFkZXJDb2x1bW47XG4gIHdpbmRvdy5UYWJsZURhdGFTZXQgPSBUYWJsZURhdGFTZXQ7XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIEJvb3RzdHJhcFRhYmxlLFxuICBUYWJsZUhlYWRlckNvbHVtbixcbiAgVGFibGVEYXRhU2V0XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tYWxlcnQ6IDAgKi9cbi8qIGVzbGludCBtYXgtbGVuOiAwICovXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVGFibGVIZWFkZXIgZnJvbSAnLi9UYWJsZUhlYWRlcic7XG5pbXBvcnQgVGFibGVCb2R5IGZyb20gJy4vVGFibGVCb2R5JztcbmltcG9ydCBQYWdpbmF0aW9uTGlzdCBmcm9tICcuL3BhZ2luYXRpb24vUGFnaW5hdGlvbkxpc3QnO1xuaW1wb3J0IFRvb2xCYXIgZnJvbSAnLi90b29sYmFyL1Rvb2xCYXInO1xuaW1wb3J0IFRhYmxlRmlsdGVyIGZyb20gJy4vVGFibGVGaWx0ZXInO1xuaW1wb3J0IHsgVGFibGVEYXRhU3RvcmUgfSBmcm9tICcuL3N0b3JlL1RhYmxlRGF0YVN0b3JlJztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgZXhwb3J0Q1NWIGZyb20gJy4vY3N2X2V4cG9ydF91dGlsJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vRmlsdGVyJztcblxuY2xhc3MgQm9vdHN0cmFwVGFibGUgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaXNJRSA9IGZhbHNlO1xuICAgIHRoaXMuX2F0dGFjaENlbGxFZGl0RnVuYygpO1xuICAgIGlmIChVdGlsLmNhblVzZURPTSgpKSB7XG4gICAgICB0aGlzLmlzSUUgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmRhdGEpKSB7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IFRhYmxlRGF0YVN0b3JlKHRoaXMucHJvcHMuZGF0YS5nZXREYXRhKCkpO1xuICAgICAgdGhpcy5wcm9wcy5kYXRhLmNsZWFyKCk7XG4gICAgICB0aGlzLnByb3BzLmRhdGEub24oJ2NoYW5nZScsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5nZXRUYWJsZURhdGEoKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb3B5ID0gdGhpcy5wcm9wcy5kYXRhLnNsaWNlKCk7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IFRhYmxlRGF0YVN0b3JlKGNvcHkpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdFRhYmxlKHRoaXMucHJvcHMpO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5vbignb25GaWx0ZXJDaGFuZ2UnLCAoY3VycmVudEZpbHRlcikgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUZpbHRlckRhdGEoY3VycmVudEZpbHRlcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cgJiYgdGhpcy5wcm9wcy5zZWxlY3RSb3cuc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZC5zbGljZSgpO1xuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjb3B5KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0YTogdGhpcy5nZXRUYWJsZURhdGEoKSxcbiAgICAgIGN1cnJQYWdlOiB0aGlzLnByb3BzLm9wdGlvbnMucGFnZSB8fCAxLFxuICAgICAgc2l6ZVBlclBhZ2U6IHRoaXMucHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZSB8fCBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1RbMF0sXG4gICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKClcbiAgICB9O1xuICB9XG5cbiAgaW5pdFRhYmxlKHByb3BzKSB7XG4gICAgbGV0IHsga2V5RmllbGQgfSA9IHByb3BzO1xuXG4gICAgY29uc3QgaXNLZXlGaWVsZERlZmluZWQgPSB0eXBlb2Yga2V5RmllbGQgPT09ICdzdHJpbmcnICYmIGtleUZpZWxkLmxlbmd0aDtcbiAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHByb3BzLmNoaWxkcmVuLCBjb2x1bW4gPT4ge1xuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5pc0tleSkge1xuICAgICAgICBpZiAoa2V5RmllbGQpIHtcbiAgICAgICAgICB0aHJvdyAnRXJyb3IuIE11bHRpcGxlIGtleSBjb2x1bW4gYmUgZGV0ZWN0ZWQgaW4gVGFibGVIZWFkZXJDb2x1bW4uJztcbiAgICAgICAgfVxuICAgICAgICBrZXlGaWVsZCA9IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uLnByb3BzLmZpbHRlcikge1xuICAgICAgICAvLyBhIGNvbHVtbiBjb250YWlucyBhIGZpbHRlclxuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICAgICAgLy8gZmlyc3QgdGltZSBjcmVhdGUgdGhlIGZpbHRlciBvbiB0aGUgQm9vdHN0cmFwVGFibGVcbiAgICAgICAgICB0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXNzIHRoZSBmaWx0ZXIgdG8gY29sdW1uIHdpdGggZmlsdGVyXG4gICAgICAgIGNvbHVtbi5wcm9wcy5maWx0ZXIuZW1pdHRlciA9IHRoaXMuZmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sSW5mb3MgPSB0aGlzLmdldENvbHVtbnNEZXNjcmlwdGlvbihwcm9wcykucmVkdWNlKCggcHJldiwgY3VyciApID0+IHtcbiAgICAgIHByZXZbY3Vyci5uYW1lXSA9IGN1cnI7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG5cbiAgICBpZiAoIWlzS2V5RmllbGREZWZpbmVkICYmICFrZXlGaWVsZCkge1xuICAgICAgdGhyb3cgYEVycm9yLiBObyBhbnkga2V5IGNvbHVtbiBkZWZpbmVkIGluIFRhYmxlSGVhZGVyQ29sdW1uLlxuICAgICAgICAgICAgVXNlICdpc0tleT17dHJ1ZX0nIHRvIHNwZWNpZnkgYSB1bmlxdWUgY29sdW1uIGFmdGVyIHZlcnNpb24gMC41LjQuYDtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3JlLnNldFByb3BzKHtcbiAgICAgIGlzUGFnaW5hdGlvbjogcHJvcHMucGFnaW5hdGlvbixcbiAgICAgIGtleUZpZWxkOiBrZXlGaWVsZCxcbiAgICAgIGNvbEluZm9zOiBjb2xJbmZvcyxcbiAgICAgIG11bHRpQ29sdW1uU2VhcmNoOiBwcm9wcy5tdWx0aUNvbHVtblNlYXJjaCxcbiAgICAgIHJlbW90ZTogdGhpcy5pc1JlbW90ZURhdGFTb3VyY2UoKVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VGFibGVEYXRhKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgaWYgKG9wdGlvbnMuc29ydE5hbWUgJiYgb3B0aW9ucy5zb3J0T3JkZXIpIHtcbiAgICAgIHRoaXMuc3RvcmUuc29ydChvcHRpb25zLnNvcnRPcmRlciwgb3B0aW9ucy5zb3J0TmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgIGxldCBwYWdlO1xuICAgICAgbGV0IHNpemVQZXJQYWdlO1xuICAgICAgaWYgKHRoaXMuc3RvcmUuaXNDaGFuZ2VkUGFnZSgpKSB7XG4gICAgICAgIHNpemVQZXJQYWdlID0gdGhpcy5zdGF0ZS5zaXplUGVyUGFnZTtcbiAgICAgICAgcGFnZSA9IHRoaXMuc3RhdGUuY3VyclBhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaXplUGVyUGFnZSA9IG9wdGlvbnMuc2l6ZVBlclBhZ2UgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUWzBdO1xuICAgICAgICBwYWdlID0gb3B0aW9ucy5wYWdlIHx8IDE7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q29sdW1uc0Rlc2NyaXB0aW9uKHsgY2hpbGRyZW4gfSkge1xuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjb2x1bW4sIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQsXG4gICAgICAgIGFsaWduOiBjb2x1bW4ucHJvcHMuZGF0YUFsaWduLFxuICAgICAgICBzb3J0OiBjb2x1bW4ucHJvcHMuZGF0YVNvcnQsXG4gICAgICAgIGZvcm1hdDogY29sdW1uLnByb3BzLmRhdGFGb3JtYXQsXG4gICAgICAgIGZvcm1hdEV4dHJhRGF0YTogY29sdW1uLnByb3BzLmZvcm1hdEV4dHJhRGF0YSxcbiAgICAgICAgZmlsdGVyRm9ybWF0dGVkOiBjb2x1bW4ucHJvcHMuZmlsdGVyRm9ybWF0dGVkLFxuICAgICAgICBlZGl0YWJsZTogY29sdW1uLnByb3BzLmVkaXRhYmxlLFxuICAgICAgICBoaWRkZW46IGNvbHVtbi5wcm9wcy5oaWRkZW4sXG4gICAgICAgIHNlYXJjaGFibGU6IGNvbHVtbi5wcm9wcy5zZWFyY2hhYmxlLFxuICAgICAgICBjbGFzc05hbWU6IGNvbHVtbi5wcm9wcy5jb2x1bW5DbGFzc05hbWUsXG4gICAgICAgIHdpZHRoOiBjb2x1bW4ucHJvcHMud2lkdGgsXG4gICAgICAgIHRleHQ6IGNvbHVtbi5wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgc29ydEZ1bmM6IGNvbHVtbi5wcm9wcy5zb3J0RnVuYyxcbiAgICAgICAgaW5kZXg6IGlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIHRoaXMuaW5pdFRhYmxlKG5leHRQcm9wcyk7XG4gICAgY29uc3QgeyBvcHRpb25zLCBzZWxlY3RSb3cgfSA9IG5leHRQcm9wcztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXh0UHJvcHMuZGF0YSkpIHtcbiAgICAgIHRoaXMuc3RvcmUuc2V0RGF0YShuZXh0UHJvcHMuZGF0YS5zbGljZSgpKTtcbiAgICAgIGxldCBwYWdlID0gb3B0aW9ucy5wYWdlIHx8IHRoaXMuc3RhdGUuY3VyclBhZ2U7XG4gICAgICBjb25zdCBzaXplUGVyUGFnZSA9IG9wdGlvbnMuc2l6ZVBlclBhZ2UgfHwgdGhpcy5zdGF0ZS5zaXplUGVyUGFnZTtcblxuICAgICAgLy8gIzEyNVxuICAgICAgaWYgKCFvcHRpb25zLnBhZ2UgJiZcbiAgICAgICAgcGFnZSA+PSBNYXRoLmNlaWwobmV4dFByb3BzLmRhdGEubGVuZ3RoIC8gc2l6ZVBlclBhZ2UpKSB7XG4gICAgICAgIHBhZ2UgPSAxO1xuICAgICAgfVxuICAgICAgY29uc3Qgc29ydEluZm8gPSB0aGlzLnN0b3JlLmdldFNvcnRJbmZvKCk7XG4gICAgICBjb25zdCBzb3J0RmllbGQgPSBvcHRpb25zLnNvcnROYW1lIHx8IChzb3J0SW5mbyA/IHNvcnRJbmZvLnNvcnRGaWVsZCA6IHVuZGVmaW5lZCk7XG4gICAgICBjb25zdCBzb3J0T3JkZXIgPSBvcHRpb25zLnNvcnRPcmRlciB8fCAoc29ydEluZm8gPyBzb3J0SW5mby5vcmRlciA6IHVuZGVmaW5lZCk7XG4gICAgICBpZiAoc29ydEZpZWxkICYmIHNvcnRPcmRlcikgdGhpcy5zdG9yZS5zb3J0KHNvcnRPcmRlciwgc29ydEZpZWxkKTtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0b3JlLnBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGN1cnJQYWdlOiBwYWdlLFxuICAgICAgICBzaXplUGVyUGFnZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RSb3cgJiYgc2VsZWN0Um93LnNlbGVjdGVkKSB7XG4gICAgICAvLyBzZXQgZGVmYXVsdCBzZWxlY3Qgcm93cyB0byBzdG9yZS5cbiAgICAgIGNvbnN0IGNvcHkgPSBzZWxlY3RSb3cuc2VsZWN0ZWQuc2xpY2UoKTtcbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoY29weSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBjb3B5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9hZGp1c3RUYWJsZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9hZGp1c3RUYWJsZSk7XG4gICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsSGVhZGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9hZGp1c3RUYWJsZSk7XG4gICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsSGVhZGVyKTtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnJlbW92ZUFsbExpc3RlbmVycygnb25GaWx0ZXJDaGFuZ2UnKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fYWRqdXN0VGFibGUoKTtcbiAgICB0aGlzLl9hdHRhY2hDZWxsRWRpdEZ1bmMoKTtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyVGFibGVDb21wbGV0ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyVGFibGVDb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9hdHRhY2hDZWxsRWRpdEZ1bmMoKSB7XG4gICAgY29uc3QgeyBjZWxsRWRpdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2VsbEVkaXQpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbEVkaXQuX19vbkNvbXBsZXRlRWRpdF9fID0gdGhpcy5oYW5kbGVFZGl0Q2VsbC5iaW5kKHRoaXMpO1xuICAgICAgaWYgKGNlbGxFZGl0Lm1vZGUgIT09IENvbnN0LkNFTExfRURJVF9OT05FKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGluIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24sXG4gICAqIHRoZSBkYXRhZ3JpZCBzaG91bGQgbG9hZCBpdHMgZGF0YSByZW1vdGVseS5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW3Byb3BzXSBPcHRpb25hbC4gSWYgbm90IGdpdmVuLCB0aGlzLnByb3BzIHdpbGwgYmUgdXNlZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXNSZW1vdGVEYXRhU291cmNlKHByb3BzKSB7XG4gICAgcmV0dXJuIChwcm9wcyB8fCB0aGlzLnByb3BzKS5yZW1vdGU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiB0aGlzLnByb3BzLm1heEhlaWdodFxuICAgIH07XG5cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZXRDb2x1bW5zRGVzY3JpcHRpb24odGhpcy5wcm9wcyk7XG4gICAgY29uc3Qgc29ydEluZm8gPSB0aGlzLnN0b3JlLmdldFNvcnRJbmZvKCk7XG4gICAgY29uc3QgcGFnaW5hdGlvbiA9IHRoaXMucmVuZGVyUGFnaW5hdGlvbigpO1xuICAgIGNvbnN0IHRvb2xCYXIgPSB0aGlzLnJlbmRlclRvb2xCYXIoKTtcbiAgICBjb25zdCB0YWJsZUZpbHRlciA9IHRoaXMucmVuZGVyVGFibGVGaWx0ZXIoY29sdW1ucyk7XG4gICAgY29uc3QgaXNTZWxlY3RBbGwgPSB0aGlzLmlzU2VsZWN0QWxsKCk7XG4gICAgbGV0IHNvcnRJbmRpY2F0b3IgPSB0aGlzLnByb3BzLm9wdGlvbnMuc29ydEluZGljYXRvcjtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub3B0aW9ucy5zb3J0SW5kaWNhdG9yID09PSAndW5kZWZpbmVkJykgc29ydEluZGljYXRvciA9IHRydWU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZWFjdC1icy10YWJsZS1jb250YWluZXInPlxuICAgICAgICB7IHRvb2xCYXIgfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVhY3QtYnMtdGFibGUnIHJlZj0ndGFibGUnIHN0eWxlPXsgc3R5bGUgfVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsgdGhpcy5oYW5kbGVNb3VzZUVudGVyIH1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSB9PlxuICAgICAgICAgIDxUYWJsZUhlYWRlclxuICAgICAgICAgICAgcmVmPSdoZWFkZXInXG4gICAgICAgICAgICByb3dTZWxlY3RUeXBlPXsgdGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSB9XG4gICAgICAgICAgICBoaWRlU2VsZWN0Q29sdW1uPXsgdGhpcy5wcm9wcy5zZWxlY3RSb3cuaGlkZVNlbGVjdENvbHVtbiB9XG4gICAgICAgICAgICBzb3J0TmFtZT17IHNvcnRJbmZvID8gc29ydEluZm8uc29ydEZpZWxkIDogdW5kZWZpbmVkIH1cbiAgICAgICAgICAgIHNvcnRPcmRlcj17IHNvcnRJbmZvID8gc29ydEluZm8ub3JkZXIgOiB1bmRlZmluZWQgfVxuICAgICAgICAgICAgc29ydEluZGljYXRvcj17IHNvcnRJbmRpY2F0b3IgfVxuICAgICAgICAgICAgb25Tb3J0PXsgdGhpcy5oYW5kbGVTb3J0IH1cbiAgICAgICAgICAgIG9uU2VsZWN0QWxsUm93PXsgdGhpcy5oYW5kbGVTZWxlY3RBbGxSb3cgfVxuICAgICAgICAgICAgYm9yZGVyZWQ9eyB0aGlzLnByb3BzLmJvcmRlcmVkIH1cbiAgICAgICAgICAgIGNvbmRlbnNlZD17IHRoaXMucHJvcHMuY29uZGVuc2VkIH1cbiAgICAgICAgICAgIGlzRmlsdGVyZWQ9eyB0aGlzLmZpbHRlciA/IHRydWUgOiBmYWxzZSB9XG4gICAgICAgICAgICBpc1NlbGVjdEFsbD17IGlzU2VsZWN0QWxsIH0+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgPFRhYmxlQm9keSByZWY9J2JvZHknXG4gICAgICAgICAgICBzdHlsZT17IHN0eWxlIH1cbiAgICAgICAgICAgIGRhdGE9eyB0aGlzLnN0YXRlLmRhdGEgfVxuICAgICAgICAgICAgY29sdW1ucz17IGNvbHVtbnMgfVxuICAgICAgICAgICAgdHJDbGFzc05hbWU9eyB0aGlzLnByb3BzLnRyQ2xhc3NOYW1lIH1cbiAgICAgICAgICAgIHN0cmlwZWQ9eyB0aGlzLnByb3BzLnN0cmlwZWQgfVxuICAgICAgICAgICAgYm9yZGVyZWQ9eyB0aGlzLnByb3BzLmJvcmRlcmVkIH1cbiAgICAgICAgICAgIGhvdmVyPXsgdGhpcy5wcm9wcy5ob3ZlciB9XG4gICAgICAgICAgICBrZXlGaWVsZD17IHRoaXMuc3RvcmUuZ2V0S2V5RmllbGQoKSB9XG4gICAgICAgICAgICBjb25kZW5zZWQ9eyB0aGlzLnByb3BzLmNvbmRlbnNlZCB9XG4gICAgICAgICAgICBzZWxlY3RSb3c9eyB0aGlzLnByb3BzLnNlbGVjdFJvdyB9XG4gICAgICAgICAgICBjZWxsRWRpdD17IHRoaXMucHJvcHMuY2VsbEVkaXQgfVxuICAgICAgICAgICAgc2VsZWN0ZWRSb3dLZXlzPXsgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd0tleXMgfVxuICAgICAgICAgICAgb25Sb3dDbGljaz17IHRoaXMuaGFuZGxlUm93Q2xpY2sgfVxuICAgICAgICAgICAgb25Sb3dNb3VzZU92ZXI9eyB0aGlzLmhhbmRsZVJvd01vdXNlT3ZlciB9XG4gICAgICAgICAgICBvblJvd01vdXNlT3V0PXsgdGhpcy5oYW5kbGVSb3dNb3VzZU91dCB9XG4gICAgICAgICAgICBvblNlbGVjdFJvdz17IHRoaXMuaGFuZGxlU2VsZWN0Um93IH1cbiAgICAgICAgICAgIG5vRGF0YVRleHQ9eyB0aGlzLnByb3BzLm9wdGlvbnMubm9EYXRhVGV4dCB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IHRhYmxlRmlsdGVyIH1cbiAgICAgICAgeyBwYWdpbmF0aW9uIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpc1NlbGVjdEFsbCgpIHtcbiAgICBjb25zdCBkZWZhdWx0U2VsZWN0Um93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgY29uc3QgYWxsUm93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0QWxsUm93a2V5KCk7XG4gICAgaWYgKGRlZmF1bHRTZWxlY3RSb3dLZXlzLmxlbmd0aCAhPT0gYWxsUm93S2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0U2VsZWN0Um93S2V5cy5sZW5ndGggPT09IDAgPyBmYWxzZSA6ICdpbmRldGVybWluYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xlYW5TZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KFtdKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkUm93S2V5czogW11cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNvcnQgPSAob3JkZXIsIHNvcnRGaWVsZCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Tb3J0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Tb3J0Q2hhbmdlKHNvcnRGaWVsZCwgb3JkZXIsIHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuc29ydChvcmRlciwgc29ydEZpZWxkKS5nZXQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnaW5hdGlvbkRhdGEgPSAocGFnZSwgc2l6ZVBlclBhZ2UpID0+IHtcbiAgICBjb25zdCB7IG9uUGFnZUNoYW5nZSB9ID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIGlmIChvblBhZ2VDaGFuZ2UpIHtcbiAgICAgIG9uUGFnZUNoYW5nZShwYWdlLCBzaXplUGVyUGFnZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IHBhZ2UsXG4gICAgICBzaXplUGVyUGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vbk1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vbk1vdXNlRW50ZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU91dCA9IHJvdyA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblJvd01vdXNlT3V0KSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dNb3VzZU91dChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJvd01vdXNlT3ZlciA9IHJvdyA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblJvd01vdXNlT3Zlcikge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uUm93TW91c2VPdmVyKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSByb3cgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uUm93Q2xpY2socm93KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3RBbGxSb3cgPSBlID0+IHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQ7XG4gICAgbGV0IHNlbGVjdGVkUm93S2V5cyA9IFtdO1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdEFsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3RBbGwoaXNTZWxlY3RlZCxcbiAgICAgICAgaXNTZWxlY3RlZCA/IHRoaXMuc3RvcmUuZ2V0KCkgOiBbXSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnIHx8IHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGVkUm93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0QWxsUm93a2V5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoc2VsZWN0ZWRSb3dLZXlzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFJvd0tleXMgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2hvd09ubHlTZWxlY3RlZCA9ICgpID0+IHtcbiAgICB0aGlzLnN0b3JlLmlnbm9yZU5vblNlbGVjdGVkKCk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoMSwgdGhpcy5zdGF0ZS5zaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdFJvdyA9IChyb3csIGlzU2VsZWN0ZWQpID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBsZXQgY3VyclNlbGVjdGVkID0gdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKTtcbiAgICBjb25zdCByb3dLZXkgPSByb3dbIHRoaXMuc3RvcmUuZ2V0S2V5RmllbGQoKSBdO1xuICAgIGNvbnN0IHsgc2VsZWN0Um93IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RSb3cub25TZWxlY3QpIHtcbiAgICAgIHJlc3VsdCA9IHNlbGVjdFJvdy5vblNlbGVjdChyb3csIGlzU2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJyB8fCByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICBpZiAoc2VsZWN0Um93Lm1vZGUgPT09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZCA9IGlzU2VsZWN0ZWQgPyBbIHJvd0tleSBdIDogW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgIGN1cnJTZWxlY3RlZC5wdXNoKHJvd0tleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyclNlbGVjdGVkID0gY3VyclNlbGVjdGVkLmZpbHRlcihrZXkgPT4gcm93S2V5ICE9PSBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoY3VyclNlbGVjdGVkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IGN1cnJTZWxlY3RlZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRWRpdENlbGwobmV3VmFsLCByb3dJbmRleCwgY29sSW5kZXgpIHtcbiAgICBjb25zdCB7IGJlZm9yZVNhdmVDZWxsLCBhZnRlclNhdmVDZWxsIH0gPSB0aGlzLnByb3BzLmNlbGxFZGl0O1xuICAgIGxldCBmaWVsZE5hbWU7XG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCBmdW5jdGlvbihjb2x1bW4sIGkpIHtcbiAgICAgIGlmIChpID09PSBjb2xJbmRleCkge1xuICAgICAgICBmaWVsZE5hbWUgPSBjb2x1bW4ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoYmVmb3JlU2F2ZUNlbGwpIHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBiZWZvcmVTYXZlQ2VsbCh0aGlzLnN0YXRlLmRhdGFbcm93SW5kZXhdLCBmaWVsZE5hbWUsIG5ld1ZhbCk7XG4gICAgICBpZiAoIWlzVmFsaWQgJiYgdHlwZW9mIGlzVmFsaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuc3RvcmUuZ2V0KClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0b3JlLmVkaXQobmV3VmFsLCByb3dJbmRleCwgZmllbGROYW1lKS5nZXQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdFxuICAgIH0pO1xuXG4gICAgaWYgKGFmdGVyU2F2ZUNlbGwpIHtcbiAgICAgIGFmdGVyU2F2ZUNlbGwodGhpcy5zdGF0ZS5kYXRhW3Jvd0luZGV4XSwgZmllbGROYW1lLCBuZXdWYWwpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFkZFJvd0F0QmVnaW4obmV3T2JqKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RvcmUuYWRkQXRCZWdpbihuZXdPYmopO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICB0aGlzLl9oYW5kbGVBZnRlckFkZGluZ1JvdyhuZXdPYmopO1xuICB9XG5cbiAgaGFuZGxlQWRkUm93ID0gbmV3T2JqID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zdG9yZS5hZGQobmV3T2JqKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgdGhpcy5faGFuZGxlQWZ0ZXJBZGRpbmdSb3cobmV3T2JqKTtcbiAgfVxuXG4gIGdldFNpemVQZXJQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNpemVQZXJQYWdlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VyclBhZ2U7XG4gIH1cblxuICBoYW5kbGVEcm9wUm93ID0gcm93S2V5cyA9PiB7XG4gICAgY29uc3QgZHJvcFJvd0tleXMgPSByb3dLZXlzID8gcm93S2V5cyA6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgLy8gYWRkIGNvbmZpcm0gYmVmb3JlIHRoZSBkZWxldGUgYWN0aW9uIGlmIHRoYXQgb3B0aW9uIGlzIHNldC5cbiAgICBpZiAoZHJvcFJvd0tleXMgJiYgZHJvcFJvd0tleXMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5oYW5kbGVDb25maXJtRGVsZXRlUm93KSB7XG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5oYW5kbGVDb25maXJtRGVsZXRlUm93KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZVJvdyhkcm9wUm93S2V5cyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmUgd2FudCBkZWxldGU/JykpIHtcbiAgICAgICAgdGhpcy5kZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVJvdyhkcm9wUm93S2V5cykge1xuICAgIGxldCByZXN1bHQ7XG4gICAgdGhpcy5zdG9yZS5yZW1vdmUoZHJvcFJvd0tleXMpOyAgLy8gcmVtb3ZlIHNlbGVjdGVkIFJvd1xuICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoW10pOyAgLy8gY2xlYXIgc2VsZWN0ZWQgcm93IGtleVxuXG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgY29uc3QgeyBzaXplUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IGN1cnJMYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLnN0b3JlLmdldERhdGFOdW0oKSAvIHNpemVQZXJQYWdlKTtcbiAgICAgIGxldCB7IGN1cnJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKGN1cnJQYWdlID4gY3Vyckxhc3RQYWdlKSBjdXJyUGFnZSA9IGN1cnJMYXN0UGFnZTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZShjdXJyUGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiB0aGlzLnN0b3JlLmdldFNlbGVjdGVkUm93S2V5cygpLFxuICAgICAgICBjdXJyUGFnZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyRGVsZXRlUm93KSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJEZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZpbHRlckRhdGEgPSBmaWx0ZXJPYmogPT4ge1xuICAgIHRoaXMuc3RvcmUuZmlsdGVyKGZpbHRlck9iaik7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBjb25zdCB7IHNpemVQZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKDEsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckNvbHVtbkZpbHRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyQ29sdW1uRmlsdGVyKGZpbHRlck9iaixcbiAgICAgICAgdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCkpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgIGN1cnJQYWdlOiAxXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVFeHBvcnRDU1YgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCk7XG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIHRoaXMucHJvcHMuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNvbHVtbikge1xuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIGtleXMucHVzaChjb2x1bW4ucHJvcHMuZGF0YUZpZWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBleHBvcnRDU1YocmVzdWx0LCBrZXlzLCB0aGlzLnByb3BzLmNzdkZpbGVOYW1lKTtcbiAgfVxuXG4gIGhhbmRsZVNlYXJjaCA9IHNlYXJjaFRleHQgPT4ge1xuICAgIHRoaXMuc3RvcmUuc2VhcmNoKHNlYXJjaFRleHQpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgY29uc3QgeyBzaXplUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZSgxLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJTZWFyY2gpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlclNlYXJjaChzZWFyY2hUZXh0LFxuICAgICAgICB0aGlzLnN0b3JlLmdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IDFcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlclBhZ2luYXRpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgbGV0IGRhdGFTaXplO1xuICAgICAgaWYgKHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKCkpIHtcbiAgICAgICAgZGF0YVNpemUgPSB0aGlzLnByb3BzLmZldGNoSW5mby5kYXRhVG90YWxTaXplO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVNpemUgPSB0aGlzLnN0b3JlLmdldERhdGFOdW0oKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZWFjdC1icy10YWJsZS1wYWdpbmF0aW9uJz5cbiAgICAgICAgICA8UGFnaW5hdGlvbkxpc3RcbiAgICAgICAgICAgIHJlZj0ncGFnaW5hdGlvbidcbiAgICAgICAgICAgIGN1cnJQYWdlPXsgdGhpcy5zdGF0ZS5jdXJyUGFnZSB9XG4gICAgICAgICAgICBjaGFuZ2VQYWdlPXsgdGhpcy5oYW5kbGVQYWdpbmF0aW9uRGF0YSB9XG4gICAgICAgICAgICBzaXplUGVyUGFnZT17IHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2UgfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2VMaXN0PXsgb3B0aW9ucy5zaXplUGVyUGFnZUxpc3QgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUIH1cbiAgICAgICAgICAgIHBhZ2luYXRpb25TaXplPXsgb3B0aW9ucy5wYWdpbmF0aW9uU2l6ZSB8fCBDb25zdC5QQUdJTkFUSU9OX1NJWkUgfVxuICAgICAgICAgICAgcmVtb3RlPXsgdGhpcy5pc1JlbW90ZURhdGFTb3VyY2UoKSB9XG4gICAgICAgICAgICBkYXRhU2l6ZT17IGRhdGFTaXplIH1cbiAgICAgICAgICAgIG9uU2l6ZVBlclBhZ2VMaXN0PXsgb3B0aW9ucy5vblNpemVQZXJQYWdlTGlzdCB9XG4gICAgICAgICAgICBwcmVQYWdlPXsgb3B0aW9ucy5wcmVQYWdlIHx8IENvbnN0LlBSRV9QQUdFIH1cbiAgICAgICAgICAgIG5leHRQYWdlPXsgb3B0aW9ucy5uZXh0UGFnZSB8fCBDb25zdC5ORVhUX1BBR0UgfVxuICAgICAgICAgICAgZmlyc3RQYWdlPXsgb3B0aW9ucy5maXJzdFBhZ2UgfHwgQ29uc3QuRklSU1RfUEFHRSB9XG4gICAgICAgICAgICBsYXN0UGFnZT17IG9wdGlvbnMubGFzdFBhZ2UgfHwgQ29uc3QuTEFTVF9QQUdFIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlclRvb2xCYXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RSb3csIGluc2VydFJvdywgZGVsZXRlUm93LCBzZWFyY2gsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQgPSBzZWxlY3RSb3cgJiYgc2VsZWN0Um93LnNob3dPbmx5U2VsZWN0ZWQ7XG4gICAgaWYgKGVuYWJsZVNob3dPbmx5U2VsZWN0ZWRcbiAgICAgICAgfHwgaW5zZXJ0Um93XG4gICAgICAgIHx8IGRlbGV0ZVJvd1xuICAgICAgICB8fCBzZWFyY2hcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5leHBvcnRDU1YpIHtcbiAgICAgIGxldCBjb2x1bW5zO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgIGNvbHVtbnMgPSBjaGlsZHJlbi5tYXAoZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gY29sdW1uO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICAgIGZpZWxkOiBwcm9wcy5kYXRhRmllbGQsXG4gICAgICAgICAgICAvLyB3aGVuIHlvdSB3YW50IHNhbWUgYXV0byBnZW5lcmF0ZSB2YWx1ZSBhbmQgbm90IGFsbG93IGVkaXQsIGV4YW1wbGUgSUQgZmllbGRcbiAgICAgICAgICAgIGF1dG9WYWx1ZTogcHJvcHMuYXV0b1ZhbHVlIHx8IGZhbHNlLFxuICAgICAgICAgICAgLy8gZm9yIGNyZWF0ZSBlZGl0b3IsIG5vIHBhcmFtcyBmb3IgY29sdW1uLmVkaXRhYmxlKCkgaW5kaWNhdGUgdGhhdCBlZGl0b3IgZm9yIG5ldyByb3dcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwcm9wcy5lZGl0YWJsZSAmJiAodHlwZW9mIHByb3BzLmVkaXRhYmxlID09PSAnZnVuY3Rpb24nKSA/IHByb3BzLmVkaXRhYmxlKCkgOiBwcm9wcy5lZGl0YWJsZSxcbiAgICAgICAgICAgIGZvcm1hdDogcHJvcHMuZGF0YUZvcm1hdCA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wcy5kYXRhRm9ybWF0KHZhbHVlLCBudWxsLCBwcm9wcy5mb3JtYXRFeHRyYURhdGEpLnJlcGxhY2UoLzwuKj8+L2csICcnKTtcbiAgICAgICAgICAgIH0gOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1ucyA9IFsge1xuICAgICAgICAgIG5hbWU6IGNoaWxkcmVuLnByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGZpZWxkOiBjaGlsZHJlbi5wcm9wcy5kYXRhRmllbGQsXG4gICAgICAgICAgZWRpdGFibGU6IGNoaWxkcmVuLnByb3BzLmVkaXRhYmxlXG4gICAgICAgIH0gXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZWFjdC1icy10YWJsZS10b29sLWJhcic+XG4gICAgICAgICAgPFRvb2xCYXJcbiAgICAgICAgICAgIGNsZWFyU2VhcmNoPXsgdGhpcy5wcm9wcy5vcHRpb25zLmNsZWFyU2VhcmNoIH1cbiAgICAgICAgICAgIGVuYWJsZUluc2VydD17IGluc2VydFJvdyB9XG4gICAgICAgICAgICBlbmFibGVEZWxldGU9eyBkZWxldGVSb3cgfVxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoPXsgc2VhcmNoIH1cbiAgICAgICAgICAgIGVuYWJsZUV4cG9ydENTVj17IHRoaXMucHJvcHMuZXhwb3J0Q1NWIH1cbiAgICAgICAgICAgIGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ9eyBlbmFibGVTaG93T25seVNlbGVjdGVkIH1cbiAgICAgICAgICAgIGNvbHVtbnM9eyBjb2x1bW5zIH1cbiAgICAgICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyPXsgdGhpcy5wcm9wcy5zZWFyY2hQbGFjZWhvbGRlciB9XG4gICAgICAgICAgICBvbkFkZFJvdz17IHRoaXMuaGFuZGxlQWRkUm93IH1cbiAgICAgICAgICAgIG9uRHJvcFJvdz17IHRoaXMuaGFuZGxlRHJvcFJvdyB9XG4gICAgICAgICAgICBvblNlYXJjaD17IHRoaXMuaGFuZGxlU2VhcmNoIH1cbiAgICAgICAgICAgIG9uRXhwb3J0Q1NWPXsgdGhpcy5oYW5kbGVFeHBvcnRDU1YgfVxuICAgICAgICAgICAgb25TaG93T25seVNlbGVjdGVkPXsgdGhpcy5oYW5kbGVTaG93T25seVNlbGVjdGVkIH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclRhYmxlRmlsdGVyKGNvbHVtbnMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5GaWx0ZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUYWJsZUZpbHRlciBjb2x1bW5zPXsgY29sdW1ucyB9XG4gICAgICAgICAgcm93U2VsZWN0VHlwZT17IHRoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGUgfVxuICAgICAgICAgIG9uRmlsdGVyPXsgdGhpcy5oYW5kbGVGaWx0ZXJEYXRhIH0vPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgX3Njcm9sbEhlYWRlciA9IChlKSA9PiB7XG4gICAgdGhpcy5yZWZzLmhlYWRlci5yZWZzLmNvbnRhaW5lci5zY3JvbGxMZWZ0ID0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbExlZnQ7XG4gIH1cblxuICBfYWRqdXN0VGFibGUgPSAoKSA9PiB7XG4gICAgdGhpcy5fYWRqdXN0SGVhZGVyV2lkdGgoKTtcbiAgICB0aGlzLl9hZGp1c3RIZWlnaHQoKTtcbiAgfVxuXG4gIF9hZGp1c3RIZWFkZXJXaWR0aCA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuaGVhZGVyO1xuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IHRoaXMucmVmcy5oZWFkZXIucmVmcy5jb250YWluZXI7XG4gICAgY29uc3QgdGJvZHkgPSB0aGlzLnJlZnMuYm9keS5yZWZzLnRib2R5O1xuICAgIGNvbnN0IGZpcnN0Um93ID0gdGJvZHkuY2hpbGROb2Rlc1swXTtcbiAgICBjb25zdCBpc1Njcm9sbCA9IGhlYWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aCAhPT0gdGJvZHkucGFyZW50Tm9kZS5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBzY3JvbGxCYXJXaWR0aCA9IGlzU2Nyb2xsID8gVXRpbC5nZXRTY3JvbGxCYXJXaWR0aCgpIDogMDtcbiAgICBpZiAoZmlyc3RSb3cgJiYgdGhpcy5zdG9yZS5nZXREYXRhTnVtKCkpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZmlyc3RSb3cuY2hpbGROb2RlcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGNlbGxzW2ldO1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShjZWxsKTtcbiAgICAgICAgbGV0IHdpZHRoID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLndpZHRoLnJlcGxhY2UoJ3B4JywgJycpKTtcbiAgICAgICAgaWYgKHRoaXMuaXNJRSkge1xuICAgICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgICAgIGNvbnN0IHBhZGRpbmdSaWdodFdpZHRoID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICAgICAgY29uc3QgYm9yZGVyUmlnaHRXaWR0aCA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodFdpZHRoLnJlcGxhY2UoJ3B4JywgJycpKTtcbiAgICAgICAgICBjb25zdCBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuYm9yZGVyTGVmdFdpZHRoLnJlcGxhY2UoJ3B4JywgJycpKTtcbiAgICAgICAgICB3aWR0aCA9IHdpZHRoICsgcGFkZGluZ0xlZnRXaWR0aCArIHBhZGRpbmdSaWdodFdpZHRoICsgYm9yZGVyUmlnaHRXaWR0aCArIGJvcmRlckxlZnRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0UGFkZGluZyA9IChjZWxscy5sZW5ndGggLSAxID09PSBpID8gc2Nyb2xsQmFyV2lkdGggOiAwKTtcbiAgICAgICAgaWYgKHdpZHRoIDw9IDApIHtcbiAgICAgICAgICB3aWR0aCA9IDEyMDtcbiAgICAgICAgICBjZWxsLndpZHRoID0gd2lkdGggKyBsYXN0UGFkZGluZyArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gd2lkdGggKyBsYXN0UGFkZGluZyArICdweCc7XG4gICAgICAgIGhlYWRlci5jaGlsZE5vZGVzW2ldLnN0eWxlLndpZHRoID0gcmVzdWx0O1xuICAgICAgICBoZWFkZXIuY2hpbGROb2Rlc1tpXS5zdHlsZS5taW5XaWR0aCA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYWRqdXN0SGVpZ2h0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmhlaWdodC5pbmRleE9mKCclJykgPT09IC0xKSB7XG4gICAgICB0aGlzLnJlZnMuYm9keS5yZWZzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPVxuICAgICAgICBwYXJzZUZsb2F0KHRoaXMucHJvcHMuaGVpZ2h0LCAxMCkgLSB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuY29udGFpbmVyLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUFmdGVyQWRkaW5nUm93KG5ld09iaikge1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgLy8gaWYgcGFnaW5hdGlvbiBpcyBlbmFibGVkIGFuZCBpbnNlcnQgcm93IGJlIHRyaWdnZXIsIGNoYW5nZSB0byBsYXN0IHBhZ2VcbiAgICAgIGNvbnN0IHsgc2l6ZVBlclBhZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBjdXJyTGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zdG9yZS5nZXREYXRhTnVtKCkgLyBzaXplUGVyUGFnZSk7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoY3Vyckxhc3RQYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBjdXJyUGFnZTogY3Vyckxhc3RQYWdlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJJbnNlcnRSb3cpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckluc2VydFJvdyhuZXdPYmopO1xuICAgIH1cbiAgfVxufVxuXG5Cb290c3RyYXBUYWJsZS5wcm9wVHlwZXMgPSB7XG4gIGtleUZpZWxkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG1heEhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YTogUHJvcFR5cGVzLm9uZU9mVHlwZShbIFByb3BUeXBlcy5hcnJheSwgUHJvcFR5cGVzLm9iamVjdCBdKSxcbiAgcmVtb3RlOiBQcm9wVHlwZXMuYm9vbCwgLy8gcmVtb3RlIGRhdGEsIGRlZmF1bHQgaXMgZmFsc2VcbiAgc3RyaXBlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGJvcmRlcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgaG92ZXI6IFByb3BUeXBlcy5ib29sLFxuICBjb25kZW5zZWQ6IFByb3BUeXBlcy5ib29sLFxuICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2VhcmNoUGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNlbGVjdFJvdzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBtb2RlOiBQcm9wVHlwZXMub25lT2YoW1xuICAgICAgQ29uc3QuUk9XX1NFTEVDVF9OT05FLFxuICAgICAgQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUsXG4gICAgICBDb25zdC5ST1dfU0VMRUNUX01VTFRJXG4gICAgXSksXG4gICAgYmdDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmFycmF5LFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdEFsbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2xpY2tUb1NlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaGlkZVNlbGVjdENvbHVtbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93T25seVNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbFxuICB9KSxcbiAgY2VsbEVkaXQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgbW9kZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBibHVyVG9TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBiZWZvcmVTYXZlQ2VsbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJTYXZlQ2VsbDogUHJvcFR5cGVzLmZ1bmNcbiAgfSksXG4gIGluc2VydFJvdzogUHJvcFR5cGVzLmJvb2wsXG4gIGRlbGV0ZVJvdzogUHJvcFR5cGVzLmJvb2wsXG4gIHNlYXJjaDogUHJvcFR5cGVzLmJvb2wsXG4gIGNvbHVtbkZpbHRlcjogUHJvcFR5cGVzLmJvb2wsXG4gIHRyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuYW55LFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGNsZWFyU2VhcmNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzb3J0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc29ydEluZGljYXRvcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgYWZ0ZXJUYWJsZUNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckRlbGV0ZVJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJJbnNlcnRSb3c6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyU2VhcmNoOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckNvbHVtbkZpbHRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaXplUGVyUGFnZUxpc3Q6IFByb3BUeXBlcy5hcnJheSxcbiAgICBzaXplUGVyUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYWdpbmF0aW9uU2l6ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblNvcnRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUGFnZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TaXplUGVyUGFnZUxpc3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG5vRGF0YVRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGFuZGxlQ29uZmlybURlbGV0ZVJvdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlUGFnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0UGFnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaXJzdFBhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdFBhZ2U6IFByb3BUeXBlcy5zdHJpbmdcbiAgfSksXG4gIGZldGNoSW5mbzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBkYXRhVG90YWxTaXplOiBQcm9wVHlwZXMubnVtYmVyXG4gIH0pLFxuICBleHBvcnRDU1Y6IFByb3BUeXBlcy5ib29sLFxuICBjc3ZGaWxlTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcbkJvb3RzdHJhcFRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIG1heEhlaWdodDogdW5kZWZpbmVkLFxuICBzdHJpcGVkOiBmYWxzZSxcbiAgYm9yZGVyZWQ6IHRydWUsXG4gIGhvdmVyOiBmYWxzZSxcbiAgY29uZGVuc2VkOiBmYWxzZSxcbiAgcGFnaW5hdGlvbjogZmFsc2UsXG4gIHNlYXJjaFBsYWNlaG9sZGVyOiB1bmRlZmluZWQsXG4gIHNlbGVjdFJvdzoge1xuICAgIG1vZGU6IENvbnN0LlJPV19TRUxFQ1RfTk9ORSxcbiAgICBiZ0NvbG9yOiBDb25zdC5ST1dfU0VMRUNUX0JHX0NPTE9SLFxuICAgIHNlbGVjdGVkOiBbXSxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0QWxsOiB1bmRlZmluZWQsXG4gICAgY2xpY2tUb1NlbGVjdDogZmFsc2UsXG4gICAgaGlkZVNlbGVjdENvbHVtbjogZmFsc2UsXG4gICAgY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsOiBmYWxzZSxcbiAgICBzaG93T25seVNlbGVjdGVkOiBmYWxzZVxuICB9LFxuICBjZWxsRWRpdDoge1xuICAgIG1vZGU6IENvbnN0LkNFTExfRURJVF9OT05FLFxuICAgIGJsdXJUb1NhdmU6IGZhbHNlLFxuICAgIGJlZm9yZVNhdmVDZWxsOiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJTYXZlQ2VsbDogdW5kZWZpbmVkXG4gIH0sXG4gIGluc2VydFJvdzogZmFsc2UsXG4gIGRlbGV0ZVJvdzogZmFsc2UsXG4gIHNlYXJjaDogZmFsc2UsXG4gIG11bHRpQ29sdW1uU2VhcmNoOiBmYWxzZSxcbiAgY29sdW1uRmlsdGVyOiBmYWxzZSxcbiAgdHJDbGFzc05hbWU6ICcnLFxuICBvcHRpb25zOiB7XG4gICAgY2xlYXJTZWFyY2g6IGZhbHNlLFxuICAgIHNvcnROYW1lOiB1bmRlZmluZWQsXG4gICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgc29ydEluZGljYXRvcjogdHJ1ZSxcbiAgICBhZnRlclRhYmxlQ29tcGxldGU6IHVuZGVmaW5lZCxcbiAgICBhZnRlckRlbGV0ZVJvdzogdW5kZWZpbmVkLFxuICAgIGFmdGVySW5zZXJ0Um93OiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJTZWFyY2g6IHVuZGVmaW5lZCxcbiAgICBhZnRlckNvbHVtbkZpbHRlcjogdW5kZWZpbmVkLFxuICAgIG9uUm93Q2xpY2s6IHVuZGVmaW5lZCxcbiAgICBvbk1vdXNlTGVhdmU6IHVuZGVmaW5lZCxcbiAgICBvbk1vdXNlRW50ZXI6IHVuZGVmaW5lZCxcbiAgICBvblJvd01vdXNlT3V0OiB1bmRlZmluZWQsXG4gICAgb25Sb3dNb3VzZU92ZXI6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiB1bmRlZmluZWQsXG4gICAgc2l6ZVBlclBhZ2VMaXN0OiBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1QsXG4gICAgc2l6ZVBlclBhZ2U6IHVuZGVmaW5lZCxcbiAgICBwYWdpbmF0aW9uU2l6ZTogQ29uc3QuUEFHSU5BVElPTl9TSVpFLFxuICAgIG9uU2l6ZVBlclBhZ2VMaXN0OiB1bmRlZmluZWQsXG4gICAgbm9EYXRhVGV4dDogdW5kZWZpbmVkLFxuICAgIGhhbmRsZUNvbmZpcm1EZWxldGVSb3c6IHVuZGVmaW5lZCxcbiAgICBwcmVQYWdlOiBDb25zdC5QUkVfUEFHRSxcbiAgICBuZXh0UGFnZTogQ29uc3QuTkVYVF9QQUdFLFxuICAgIGZpcnN0UGFnZTogQ29uc3QuRklSU1RfUEFHRSxcbiAgICBsYXN0UGFnZTogQ29uc3QuTEFTVF9QQUdFXG4gIH0sXG4gIGZldGNoSW5mbzoge1xuICAgIGRhdGFUb3RhbFNpemU6IDBcbiAgfSxcbiAgZXhwb3J0Q1NWOiBmYWxzZSxcbiAgY3N2RmlsZU5hbWU6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwVGFibGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Cb290c3RyYXBUYWJsZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuICBTT1JUX0RFU0M6ICdkZXNjJyxcbiAgU09SVF9BU0M6ICdhc2MnLFxuICBTSVpFX1BFUl9QQUdFOiAxMCxcbiAgTkVYVF9QQUdFOiAnPicsXG4gIExBU1RfUEFHRTogJz4+JyxcbiAgUFJFX1BBR0U6ICc8JyxcbiAgRklSU1RfUEFHRTogJzw8JyxcbiAgUk9XX1NFTEVDVF9CR19DT0xPUjogJycsXG4gIFJPV19TRUxFQ1RfTk9ORTogJ25vbmUnLFxuICBST1dfU0VMRUNUX1NJTkdMRTogJ3JhZGlvJyxcbiAgUk9XX1NFTEVDVF9NVUxUSTogJ2NoZWNrYm94JyxcbiAgQ0VMTF9FRElUX05PTkU6ICdub25lJyxcbiAgQ0VMTF9FRElUX0NMSUNLOiAnY2xpY2snLFxuICBDRUxMX0VESVRfREJDTElDSzogJ2RiY2xpY2snLFxuICBTSVpFX1BFUl9QQUdFX0xJU1Q6IFsgMTAsIDI1LCAzMCwgNTAgXSxcbiAgUEFHSU5BVElPTl9TSVpFOiA1LFxuICBOT19EQVRBX1RFWFQ6ICdUaGVyZSBpcyBubyBkYXRhIHRvIGRpc3BsYXknLFxuICBTSE9XX09OTFlfU0VMRUNUOiAnU2hvdyBTZWxlY3RlZCBPbmx5JyxcbiAgU0hPV19BTEw6ICdTaG93IEFsbCcsXG4gIEZJTFRFUl9ERUxBWTogNTAwLFxuICBGSUxURVJfVFlQRToge1xuICAgIFRFWFQ6ICdUZXh0RmlsdGVyJyxcbiAgICBSRUdFWDogJ1JlZ2V4RmlsdGVyJyxcbiAgICBTRUxFQ1Q6ICdTZWxlY3RGaWx0ZXInLFxuICAgIE5VTUJFUjogJ051bWJlckZpbHRlcicsXG4gICAgREFURTogJ0RhdGVGaWx0ZXInLFxuICAgIENVU1RPTTogJ0N1c3RvbUZpbHRlcidcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NvbnN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgU2VsZWN0Um93SGVhZGVyQ29sdW1uIGZyb20gJy4vU2VsZWN0Um93SGVhZGVyQ29sdW1uJztcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHsgdGhpcy51cGRhdGUodGhpcy5wcm9wcy5jaGVja2VkKTsgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7IHRoaXMudXBkYXRlKHByb3BzLmNoZWNrZWQpOyB9XG4gIHVwZGF0ZShjaGVja2VkKSB7XG4gICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuaW5kZXRlcm1pbmF0ZSA9IGNoZWNrZWQgPT09ICdpbmRldGVybWluYXRlJztcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dCBjbGFzc05hbWU9J3JlYWN0LWJzLXNlbGVjdC1hbGwnXG4gICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICBjaGVja2VkPXsgdGhpcy5wcm9wcy5jaGVja2VkIH1cbiAgICAgICAgb25DaGFuZ2U9eyB0aGlzLnByb3BzLm9uQ2hhbmdlIH0gLz5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFRhYmxlSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzU2V0KCdyZWFjdC1icy1jb250YWluZXItaGVhZGVyJywgJ3RhYmxlLWhlYWRlci13cmFwcGVyJyk7XG4gICAgY29uc3QgdGFibGVDbGFzc2VzID0gY2xhc3NTZXQoJ3RhYmxlJywgJ3RhYmxlLWhvdmVyJywge1xuICAgICAgJ3RhYmxlLWJvcmRlcmVkJzogdGhpcy5wcm9wcy5ib3JkZXJlZCxcbiAgICAgICd0YWJsZS1jb25kZW5zZWQnOiB0aGlzLnByb3BzLmNvbmRlbnNlZFxuICAgIH0pO1xuICAgIGxldCBzZWxlY3RSb3dIZWFkZXJDb2wgPSBudWxsO1xuICAgIGlmICghdGhpcy5wcm9wcy5oaWRlU2VsZWN0Q29sdW1uKSBzZWxlY3RSb3dIZWFkZXJDb2wgPSB0aGlzLnJlbmRlclNlbGVjdFJvd0hlYWRlcigpO1xuICAgIHRoaXMuX2F0dGFjaENsZWFyU29ydENhcmV0RnVuYygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPSdjb250YWluZXInIGNsYXNzTmFtZT17IGNvbnRhaW5lckNsYXNzZXMgfT5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17IHRhYmxlQ2xhc3NlcyB9PlxuICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgIDx0ciByZWY9J2hlYWRlcic+XG4gICAgICAgICAgICAgIHsgc2VsZWN0Um93SGVhZGVyQ29sIH1cbiAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJTZWxlY3RSb3dIZWFkZXIoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUpIHtcbiAgICAgIHJldHVybiAoPFNlbGVjdFJvd0hlYWRlckNvbHVtbiAvPik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT09IENvbnN0LlJPV19TRUxFQ1RfTVVMVEkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTZWxlY3RSb3dIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMucHJvcHMub25TZWxlY3RBbGxSb3cgfVxuICAgICAgICAgICAgY2hlY2tlZD17IHRoaXMucHJvcHMuaXNTZWxlY3RBbGwgfS8+XG4gICAgICAgIDwvU2VsZWN0Um93SGVhZGVyQ29sdW1uPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgX2F0dGFjaENsZWFyU29ydENhcmV0RnVuYygpIHtcbiAgICBjb25zdCB7IHNvcnRJbmRpY2F0b3IsIGNoaWxkcmVuLCBzb3J0TmFtZSwgc29ydE9yZGVyLCBvblNvcnQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gY2hpbGRyZW5baV0ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgICBjb25zdCBzb3J0ID0gZmllbGQgPT09IHNvcnROYW1lID8gc29ydE9yZGVyIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuW2ldID1cbiAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW5baV0sXG4gICAgICAgICAgICB7IGtleTogaSwgb25Tb3J0LCBzb3J0LCBzb3J0SW5kaWNhdG9yIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWVsZCA9IGNoaWxkcmVuLnByb3BzLmRhdGFGaWVsZDtcbiAgICAgIGNvbnN0IHNvcnQgPSBmaWVsZCA9PT0gc29ydE5hbWUgPyBzb3J0T3JkZXIgOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnByb3BzLmNoaWxkcmVuID1cbiAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLFxuICAgICAgICAgIHsga2V5OiAwLCBvblNvcnQsIHNvcnQsIHNvcnRJbmRpY2F0b3IgfSk7XG4gICAgfVxuICB9XG59XG5UYWJsZUhlYWRlci5wcm9wVHlwZXMgPSB7XG4gIHJvd1NlbGVjdFR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uU29ydDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0QWxsUm93OiBQcm9wVHlwZXMuZnVuYyxcbiAgc29ydE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgaGlkZVNlbGVjdENvbHVtbjogUHJvcFR5cGVzLmJvb2wsXG4gIGJvcmRlcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY29uZGVuc2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNGaWx0ZXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGlzU2VsZWN0QWxsOiBQcm9wVHlwZXMub25lT2YoWyB0cnVlLCAnaW5kZXRlcm1pbmF0ZScsIGZhbHNlIF0pLFxuICBzb3J0SW5kaWNhdG9yOiBQcm9wVHlwZXMuYm9vbFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFibGVIZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUhlYWRlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdERPTVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCJ9XG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBTZWxlY3RSb3dIZWFkZXJDb2x1bW4gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRoIHN0eWxlPXsgeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvdGg+XG4gICAgKTtcbiAgfVxufVxuU2VsZWN0Um93SGVhZGVyQ29sdW1uLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG59O1xuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Um93SGVhZGVyQ29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvU2VsZWN0Um93SGVhZGVyQ29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IFRhYmxlUm93IGZyb20gJy4vVGFibGVSb3cnO1xuaW1wb3J0IFRhYmxlQ29sdW1uIGZyb20gJy4vVGFibGVDb2x1bW4nO1xuaW1wb3J0IFRhYmxlRWRpdENvbHVtbiBmcm9tICcuL1RhYmxlRWRpdENvbHVtbic7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IGlzRnVuID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogJiYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpO1xufTtcblxuY2xhc3MgVGFibGVCb2R5IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VyckVkaXRDZWxsOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldCgndGFibGUnLCB7XG4gICAgICAndGFibGUtc3RyaXBlZCc6IHRoaXMucHJvcHMuc3RyaXBlZCxcbiAgICAgICd0YWJsZS1ib3JkZXJlZCc6IHRoaXMucHJvcHMuYm9yZGVyZWQsXG4gICAgICAndGFibGUtaG92ZXInOiB0aGlzLnByb3BzLmhvdmVyLFxuICAgICAgJ3RhYmxlLWNvbmRlbnNlZCc6IHRoaXMucHJvcHMuY29uZGVuc2VkXG4gICAgfSk7XG5cbiAgICBjb25zdCBpc1NlbGVjdFJvd0RlZmluZWQgPSB0aGlzLl9pc1NlbGVjdFJvd0RlZmluZWQoKTtcbiAgICBjb25zdCB0YWJsZUhlYWRlciA9IHRoaXMucmVuZGVyVGFibGVIZWFkZXIoaXNTZWxlY3RSb3dEZWZpbmVkKTtcblxuICAgIGNvbnN0IHRhYmxlUm93cyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24oZGF0YSwgcikge1xuICAgICAgY29uc3QgdGFibGVDb2x1bW5zID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGkpIHtcbiAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IGRhdGFbY29sdW1uLm5hbWVdO1xuICAgICAgICBpZiAodGhpcy5lZGl0aW5nICYmXG4gICAgICAgICAgY29sdW1uLm5hbWUgIT09IHRoaXMucHJvcHMua2V5RmllbGQgJiYgLy8gS2V5IGZpZWxkIGNhbid0IGJlIGVkaXRcbiAgICAgICAgICBjb2x1bW4uZWRpdGFibGUgJiYgLy8gY29sdW1uIGlzIGVkaXRhYmxlPyBkZWZhdWx0IGlzIHRydWUsIHVzZXIgY2FuIHNldCBpdCBmYWxzZVxuICAgICAgICAgIHRoaXMuc3RhdGUuY3VyckVkaXRDZWxsICE9PSBudWxsICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyRWRpdENlbGwucmlkID09PSByICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyRWRpdENlbGwuY2lkID09PSBpKSB7XG4gICAgICAgICAgbGV0IGVkaXRhYmxlID0gY29sdW1uLmVkaXRhYmxlO1xuICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGNvbHVtbi5mb3JtYXQgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5mb3JtYXQodmFsdWUsIGRhdGEsIGNvbHVtbi5mb3JtYXRFeHRyYURhdGEpLnJlcGxhY2UoLzwuKj8+L2csICcnKTtcbiAgICAgICAgICB9IDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAoaXNGdW4oY29sdW1uLmVkaXRhYmxlKSkge1xuICAgICAgICAgICAgZWRpdGFibGUgPSBjb2x1bW4uZWRpdGFibGUoZmllbGRWYWx1ZSwgZGF0YSwgciwgaSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFRhYmxlRWRpdENvbHVtblxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRWRpdD17IHRoaXMuaGFuZGxlQ29tcGxldGVFZGl0Q2VsbCB9XG4gICAgICAgICAgICAgICAgLy8gYWRkIGJ5IGJsdWVzcHJpbmcgZm9yIGNvbHVtbiBlZGl0b3IgY3VzdG9taXplXG4gICAgICAgICAgICAgICAgZWRpdGFibGU9eyBlZGl0YWJsZSB9XG4gICAgICAgICAgICAgICAgZm9ybWF0PXsgY29sdW1uLmZvcm1hdCA/IGZvcm1hdCA6IGZhbHNlIH1cbiAgICAgICAgICAgICAgICBrZXk9eyBpIH1cbiAgICAgICAgICAgICAgICBibHVyVG9TYXZlPXsgdGhpcy5wcm9wcy5jZWxsRWRpdC5ibHVyVG9TYXZlIH1cbiAgICAgICAgICAgICAgICByb3dJbmRleD17IHIgfVxuICAgICAgICAgICAgICAgIGNvbEluZGV4PXsgaSB9PlxuICAgICAgICAgICAgICAgIHsgZmllbGRWYWx1ZSB9XG4gICAgICAgICAgICAgIDwvVGFibGVFZGl0Q29sdW1uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhZGQgYnkgYmx1ZXNwcmluZyBmb3IgY2xhc3NOYW1lIGN1c3RvbWl6ZVxuICAgICAgICAgIGxldCBjb2x1bW5DaGlsZCA9IGZpZWxkVmFsdWU7XG4gICAgICAgICAgbGV0IHRkQ2xhc3NOYW1lID0gY29sdW1uLmNsYXNzTmFtZTtcbiAgICAgICAgICBpZiAoaXNGdW4oY29sdW1uLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHRkQ2xhc3NOYW1lID0gY29sdW1uLmNsYXNzTmFtZShmaWVsZFZhbHVlLCBkYXRhLCByLCBpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbHVtbi5mb3JtYXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IGNvbHVtbi5mb3JtYXQoZmllbGRWYWx1ZSwgZGF0YSwgY29sdW1uLmZvcm1hdEV4dHJhRGF0YSk7XG4gICAgICAgICAgICBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KGZvcm1hdHRlZFZhbHVlKSkge1xuICAgICAgICAgICAgICBjb2x1bW5DaGlsZCA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXsgeyBfX2h0bWw6IGZvcm1hdHRlZFZhbHVlIH0gfT48L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbHVtbkNoaWxkID0gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFibGVDb2x1bW4ga2V5PXsgaSB9XG4gICAgICAgICAgICAgIGRhdGFBbGlnbj17IGNvbHVtbi5hbGlnbiB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17IHRkQ2xhc3NOYW1lIH1cbiAgICAgICAgICAgICAgY2VsbEVkaXQ9eyB0aGlzLnByb3BzLmNlbGxFZGl0IH1cbiAgICAgICAgICAgICAgaGlkZGVuPXsgY29sdW1uLmhpZGRlbiB9XG4gICAgICAgICAgICAgIG9uRWRpdD17IHRoaXMuaGFuZGxlRWRpdENlbGwgfVxuICAgICAgICAgICAgICB3aWR0aD17IGNvbHVtbi53aWR0aCB9PlxuICAgICAgICAgICAgICB7IGNvbHVtbkNoaWxkIH1cbiAgICAgICAgICAgIDwvVGFibGVDb2x1bW4+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZFJvd0tleXMuaW5kZXhPZihkYXRhW3RoaXMucHJvcHMua2V5RmllbGRdKSAhPT0gLTE7XG4gICAgICBjb25zdCBzZWxlY3RSb3dDb2x1bW4gPSBpc1NlbGVjdFJvd0RlZmluZWQgJiYgIXRoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW4gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWxlY3RSb3dDb2x1bW4oc2VsZWN0ZWQpIDogbnVsbDtcbiAgICAgIC8vIGFkZCBieSBibHVlc3ByaW5nIGZvciBjbGFzc05hbWUgY3VzdG9taXplXG4gICAgICBsZXQgdHJDbGFzc05hbWUgPSB0aGlzLnByb3BzLnRyQ2xhc3NOYW1lO1xuICAgICAgaWYgKGlzRnVuKHRoaXMucHJvcHMudHJDbGFzc05hbWUpKSB7XG4gICAgICAgIHRyQ2xhc3NOYW1lID0gdGhpcy5wcm9wcy50ckNsYXNzTmFtZShkYXRhLCByKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUYWJsZVJvdyBpc1NlbGVjdGVkPXsgc2VsZWN0ZWQgfSBrZXk9eyByIH0gY2xhc3NOYW1lPXsgdHJDbGFzc05hbWUgfVxuICAgICAgICAgIHNlbGVjdFJvdz17IGlzU2VsZWN0Um93RGVmaW5lZCA/IHRoaXMucHJvcHMuc2VsZWN0Um93IDogdW5kZWZpbmVkIH1cbiAgICAgICAgICBlbmFibGVDZWxsRWRpdD17IHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSAhPT0gQ29uc3QuQ0VMTF9FRElUX05PTkUgfVxuICAgICAgICAgIG9uUm93Q2xpY2s9eyB0aGlzLmhhbmRsZVJvd0NsaWNrIH1cbiAgICAgICAgICBvblJvd01vdXNlT3Zlcj17IHRoaXMuaGFuZGxlUm93TW91c2VPdmVyIH1cbiAgICAgICAgICBvblJvd01vdXNlT3V0PXsgdGhpcy5oYW5kbGVSb3dNb3VzZU91dCB9XG4gICAgICAgICAgb25TZWxlY3RSb3c9eyB0aGlzLmhhbmRsZVNlbGVjdFJvdyB9PlxuICAgICAgICAgIHsgc2VsZWN0Um93Q29sdW1uIH1cbiAgICAgICAgICB7IHRhYmxlQ29sdW1ucyB9XG4gICAgICAgIDwvVGFibGVSb3c+XG4gICAgICApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKHRhYmxlUm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRhYmxlUm93cy5wdXNoKFxuICAgICAgICA8VGFibGVSb3cga2V5PScjI3RhYmxlLWVtcHR5IyMnPlxuICAgICAgICAgIDx0ZCBjb2xTcGFuPXsgdGhpcy5wcm9wcy5jb2x1bW5zLmxlbmd0aCArIChpc1NlbGVjdFJvd0RlZmluZWQgPyAxIDogMCkgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9J3JlYWN0LWJzLXRhYmxlLW5vLWRhdGEnPlxuICAgICAgICAgICAgICB7IHRoaXMucHJvcHMubm9EYXRhVGV4dCB8fCBDb25zdC5OT19EQVRBX1RFWFQgfVxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvVGFibGVSb3c+XG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPSdjb250YWluZXInIGNsYXNzTmFtZT0ncmVhY3QtYnMtY29udGFpbmVyLWJvZHknIHN0eWxlPXsgdGhpcy5wcm9wcy5zdHlsZSB9PlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXsgdGFibGVDbGFzc2VzIH0+XG4gICAgICAgICAgeyB0YWJsZUhlYWRlciB9XG4gICAgICAgICAgPHRib2R5IHJlZj0ndGJvZHknPlxuICAgICAgICAgICAgeyB0YWJsZVJvd3MgfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyVGFibGVIZWFkZXIoaXNTZWxlY3RSb3dEZWZpbmVkKSB7XG4gICAgbGV0IHNlbGVjdFJvd0hlYWRlciA9IG51bGw7XG5cbiAgICBpZiAoaXNTZWxlY3RSb3dEZWZpbmVkKSB7XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IDMwLFxuICAgICAgICBtaW5XaWR0aDogMzBcbiAgICAgIH07XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW4pIHtcbiAgICAgICAgc2VsZWN0Um93SGVhZGVyID0gKDxjb2wgc3R5bGU9eyBzdHlsZSB9IGtleT17IC0xIH0+PC9jb2w+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGhlYWRlciA9IHRoaXMucHJvcHMuY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uLCBpKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IGNvbHVtbi53aWR0aCA9PT0gbnVsbCA/IGNvbHVtbi53aWR0aCA6IHBhcnNlSW50KGNvbHVtbi53aWR0aCwgMTApO1xuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6IGNvbHVtbi5oaWRkZW4gPyAnbm9uZScgOiBudWxsLFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIG1pbldpZHRoOiB3aWR0aFxuICAgICAgICAvKiogYWRkIG1pbi13ZHRoIHRvIGZpeCB1c2VyIGFzc2lnbiBjb2x1bW4gd2lkdGhcbiAgICAgICAgbm90IGVxIG9mZnNldFdpZHRoIGluIGxhcmdlIGNvbHVtbiB0YWJsZSAqKi9cbiAgICAgIH07XG4gICAgICByZXR1cm4gKDxjb2wgc3R5bGU9eyBzdHlsZSB9IGtleT17IGkgfSBjbGFzc05hbWU9eyBjb2x1bW4uY2xhc3NOYW1lIH0+PC9jb2w+KTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y29sZ3JvdXAgcmVmPSdoZWFkZXInPlxuICAgICAgICB7IHNlbGVjdFJvd0hlYWRlciB9eyB0aGVhZGVyIH1cbiAgICAgIDwvY29sZ3JvdXA+XG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZVJvd01vdXNlT3V0ID0gcm93SW5kZXggPT4ge1xuICAgIGNvbnN0IHRhcmdldFJvdyA9IHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleF07XG4gICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3V0KHRhcmdldFJvdyk7XG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU92ZXIgPSByb3dJbmRleCA9PiB7XG4gICAgY29uc3QgdGFyZ2V0Um93ID0gdGhpcy5wcm9wcy5kYXRhW3Jvd0luZGV4XTtcbiAgICB0aGlzLnByb3BzLm9uUm93TW91c2VPdmVyKHRhcmdldFJvdyk7XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayA9IHJvd0luZGV4ID0+IHtcbiAgICBsZXQgc2VsZWN0ZWRSb3c7XG4gICAgY29uc3QgeyBkYXRhLCBvblJvd0NsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGRhdGEuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBpZiAoaSA9PT0gcm93SW5kZXggLSAxKSB7XG4gICAgICAgIHNlbGVjdGVkUm93ID0gcm93O1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9uUm93Q2xpY2soc2VsZWN0ZWRSb3cpO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0Um93ID0gKHJvd0luZGV4LCBpc1NlbGVjdGVkKSA9PiB7XG4gICAgbGV0IHNlbGVjdGVkUm93O1xuICAgIGNvbnN0IHsgZGF0YSwgb25TZWxlY3RSb3cgfSA9IHRoaXMucHJvcHM7XG4gICAgZGF0YS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIGlmIChpID09PSByb3dJbmRleCAtIDEpIHtcbiAgICAgICAgc2VsZWN0ZWRSb3cgPSByb3c7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBvblNlbGVjdFJvdyhzZWxlY3RlZFJvdywgaXNTZWxlY3RlZCk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3dDb2x1bUNoYW5nZSA9IGUgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCB8fFxuICAgICAgIXRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCkge1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3RSb3coXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucm93SW5kZXggKyAxLFxuICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRWRpdENlbGwgPSAocm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5faXNTZWxlY3RSb3dEZWZpbmVkKCkpIHtcbiAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cuaGlkZVNlbGVjdENvbHVtbikgY29sdW1uSW5kZXgrKztcbiAgICB9XG4gICAgcm93SW5kZXgtLTtcbiAgICBjb25zdCBzdGF0ZU9iaiA9IHtcbiAgICAgIGN1cnJFZGl0Q2VsbDoge1xuICAgICAgICByaWQ6IHJvd0luZGV4LFxuICAgICAgICBjaWQ6IGNvbHVtbkluZGV4XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvd0luZGV4ICsgMSwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVPYmopO1xuICB9XG5cbiAgaGFuZGxlQ29tcGxldGVFZGl0Q2VsbCA9IChuZXdWYWwsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyRWRpdENlbGw6IG51bGwgfSk7XG4gICAgaWYgKG5ld1ZhbCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsRWRpdC5fX29uQ29tcGxldGVFZGl0X18obmV3VmFsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclNlbGVjdFJvd0NvbHVtbihzZWxlY3RlZCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09PSBDb25zdC5ST1dfU0VMRUNUX1NJTkdMRSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRhYmxlQ29sdW1uIGRhdGFBbGlnbj0nY2VudGVyJz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIGNoZWNrZWQ9eyBzZWxlY3RlZCB9XG4gICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlU2VsZWN0Um93Q29sdW1DaGFuZ2UgfS8+XG4gICAgICAgIDwvVGFibGVDb2x1bW4+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGFibGVDb2x1bW4gZGF0YUFsaWduPSdjZW50ZXInPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPSdjaGVja2JveCcgY2hlY2tlZD17IHNlbGVjdGVkIH1cbiAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlU2VsZWN0Um93Q29sdW1DaGFuZ2UgfS8+XG4gICAgICAgIDwvVGFibGVDb2x1bW4+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIF9pc1NlbGVjdFJvd0RlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGUgPT09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFIHx8XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9NVUxUSTtcbiAgfVxufVxuVGFibGVCb2R5LnByb3BUeXBlcyA9IHtcbiAgZGF0YTogUHJvcFR5cGVzLmFycmF5LFxuICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHN0cmlwZWQ6IFByb3BUeXBlcy5ib29sLFxuICBib3JkZXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGhvdmVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgY29uZGVuc2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAga2V5RmllbGQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNlbGVjdGVkUm93S2V5czogUHJvcFR5cGVzLmFycmF5LFxuICBvblJvd0NsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3RSb3c6IFByb3BUeXBlcy5mdW5jLFxuICBub0RhdGFUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdFxufTtcbmV4cG9ydCBkZWZhdWx0IFRhYmxlQm9keTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlQm9keS5qc1xuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgVGFibGVSb3cgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICB9XG5cbiAgcm93Q2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJyAmJlxuICAgICAgICBlLnRhcmdldC50YWdOYW1lICE9PSAnU0VMRUNUJyAmJlxuICAgICAgICBlLnRhcmdldC50YWdOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICBjb25zdCByb3dJbmRleCA9IGUuY3VycmVudFRhcmdldC5yb3dJbmRleCArIDE7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3QpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0Um93KHJvd0luZGV4LCAhdGhpcy5wcm9wcy5pc1NlbGVjdGVkKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpIHtcbiAgICAgICAgICB0aGlzLmNsaWNrTnVtKys7XG4gICAgICAgICAgLyoqIGlmIGNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCBpcyBlbmFibGVkLFxuICAgICAgICAgICAqICB0aGVyZSBzaG91bGQgYmUgYSBkZWxheSB0byBwcmV2ZW50IGEgc2VsZWN0aW9uIGNoYW5nZWQgd2hlblxuICAgICAgICAgICAqICB1c2VyIGRibGljayB0byBlZGl0IGNlbGwgb24gc2FtZSByb3cgYnV0IGRpZmZlcmVudCBjZWxsXG4gICAgICAgICAgKiovXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja051bSA9PT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0Um93KHJvd0luZGV4LCAhdGhpcy5wcm9wcy5pc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHRoaXMucHJvcHMub25Sb3dDbGljayhyb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcm93TW91c2VPdXQgPSBlID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd01vdXNlT3V0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93TW91c2VPdXQoZS5jdXJyZW50VGFyZ2V0LnJvd0luZGV4KTtcbiAgICB9XG4gIH1cblxuICByb3dNb3VzZU92ZXIgPSBlID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd01vdXNlT3Zlcikge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3ZlcihlLmN1cnJlbnRUYXJnZXQucm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmNsaWNrTnVtID0gMDtcbiAgICBjb25zdCB0ckNzcyA9IHtcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5pc1NlbGVjdGVkID8gdGhpcy5wcm9wcy5zZWxlY3RSb3cuYmdDb2xvciA6IG51bGxcbiAgICAgIH0sXG4gICAgICBjbGFzc05hbWU6IChcbiAgICAgICAgdGhpcy5wcm9wcy5pc1NlbGVjdGVkICYmIHRoaXMucHJvcHMuc2VsZWN0Um93LmNsYXNzTmFtZSA/XG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0Um93LmNsYXNzTmFtZSA6ICcnKSArICh0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJylcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93ICYmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0IHx8XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpIHx8IHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHRyIHsgLi4udHJDc3MgfVxuICAgICAgICAgICAgb25Nb3VzZU92ZXI9eyB0aGlzLnJvd01vdXNlT3ZlciB9XG4gICAgICAgICAgICBvbk1vdXNlT3V0PXsgdGhpcy5yb3dNb3VzZU91dCB9XG4gICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5yb3dDbGljayB9PnsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9PC90cj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ciB7IC4uLnRyQ3NzIH0+eyB0aGlzLnByb3BzLmNoaWxkcmVuIH08L3RyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblRhYmxlUm93LnByb3BUeXBlcyA9IHtcbiAgaXNTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGVuYWJsZUNlbGxFZGl0OiBQcm9wVHlwZXMuYm9vbCxcbiAgb25Sb3dDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0Um93OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Sb3dNb3VzZU91dDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUm93TW91c2VPdmVyOiBQcm9wVHlwZXMuZnVuY1xufTtcblRhYmxlUm93LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Sb3dDbGljazogdW5kZWZpbmVkXG59O1xuZXhwb3J0IGRlZmF1bHQgVGFibGVSb3c7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZVJvdy5qc1xuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuY2xhc3MgVGFibGVDb2x1bW4gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG4gIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzAsIHsgXCJhcmdzXCI6IFwiYWZ0ZXItdXNlZFwiIH1dICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHNob3VsZFVwZGF0ZWQgPSB0aGlzLnByb3BzLndpZHRoICE9PSBuZXh0UHJvcHMud2lkdGhcbiAgICAgIHx8IHRoaXMucHJvcHMuY2xhc3NOYW1lICE9PSBuZXh0UHJvcHMuY2xhc3NOYW1lXG4gICAgICB8fCB0aGlzLnByb3BzLmhpZGRlbiAhPT0gbmV4dFByb3BzLmhpZGRlblxuICAgICAgfHwgdGhpcy5wcm9wcy5kYXRhQWxpZ24gIT09IG5leHRQcm9wcy5kYXRhQWxpZ25cbiAgICAgIHx8IHR5cGVvZiBjaGlsZHJlbiAhPT0gdHlwZW9mIG5leHRQcm9wcy5jaGlsZHJlblxuICAgICAgfHwgKCcnICsgdGhpcy5wcm9wcy5vbkVkaXQpLnRvU3RyaW5nKCkgIT09ICgnJyArIG5leHRQcm9wcy5vbkVkaXQpLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlZCkge1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ29iamVjdCcgJiYgY2hpbGRyZW4gIT09IG51bGwgJiYgY2hpbGRyZW4ucHJvcHMgIT09IG51bGwpIHtcbiAgICAgIGlmIChjaGlsZHJlbi5wcm9wcy50eXBlID09PSAnY2hlY2tib3gnIHx8IGNoaWxkcmVuLnByb3BzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgc2hvdWxkVXBkYXRlZCA9IHNob3VsZFVwZGF0ZWQgfHxcbiAgICAgICAgICBjaGlsZHJlbi5wcm9wcy50eXBlICE9PSBuZXh0UHJvcHMuY2hpbGRyZW4ucHJvcHMudHlwZSB8fFxuICAgICAgICAgIGNoaWxkcmVuLnByb3BzLmNoZWNrZWQgIT09IG5leHRQcm9wcy5jaGlsZHJlbi5wcm9wcy5jaGVja2VkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hvdWxkVXBkYXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3VsZFVwZGF0ZWQgPSBzaG91bGRVcGRhdGVkIHx8IGNoaWxkcmVuICE9PSBuZXh0UHJvcHMuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZWQpIHtcbiAgICAgIHJldHVybiBzaG91bGRVcGRhdGVkO1xuICAgIH1cblxuICAgIGlmICghKHRoaXMucHJvcHMuY2VsbEVkaXQgJiYgbmV4dFByb3BzLmNlbGxFZGl0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2hvdWxkVXBkYXRlZFxuICAgICAgICB8fCB0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgIT09IG5leHRQcm9wcy5jZWxsRWRpdC5tb2RlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNlbGxFZGl0ID0gZSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spIHtcbiAgICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KSB7XG4gICAgICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uRWRpdChcbiAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnJvd0luZGV4ICsgMSxcbiAgICAgIGUuY3VycmVudFRhcmdldC5jZWxsSW5kZXgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHRkU3R5bGUgPSB7XG4gICAgICB0ZXh0QWxpZ246IHRoaXMucHJvcHMuZGF0YUFsaWduLFxuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5oaWRkZW4gPyAnbm9uZScgOiBudWxsXG4gICAgfTtcblxuICAgIGNvbnN0IG9wdHMgPSB7fTtcbiAgICBpZiAodGhpcy5wcm9wcy5jZWxsRWRpdCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PT0gQ29uc3QuQ0VMTF9FRElUX0NMSUNLKSB7XG4gICAgICAgIG9wdHMub25DbGljayA9IHRoaXMuaGFuZGxlQ2VsbEVkaXQ7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spIHtcbiAgICAgICAgb3B0cy5vbkRvdWJsZUNsaWNrID0gdGhpcy5oYW5kbGVDZWxsRWRpdDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZCBzdHlsZT17IHRkU3R5bGUgfSBjbGFzc05hbWU9eyB0aGlzLnByb3BzLmNsYXNzTmFtZSB9IHsgLi4ub3B0cyB9PlxuICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgPC90ZD5cbiAgICApO1xuICB9XG59XG5UYWJsZUNvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIGRhdGFBbGlnbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgaGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcbn07XG5cblRhYmxlQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGF0YUFsaWduOiAnbGVmdCcsXG4gIGhpZGRlbjogZmFsc2UsXG4gIGNsYXNzTmFtZTogJydcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlQ29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGVkaXRvciBmcm9tICcuL0VkaXRvcic7XG5pbXBvcnQgTm90aWZpZXIgZnJvbSAnLi9Ob3RpZmljYXRpb24uanMnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBUYWJsZUVkaXRDb2x1bW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRpbWVvdXRlQ2xlYXIgPSAwO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaGFrZUVkaXRvcjogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlS2V5UHJlc3MgPSBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgLy8gUHJlc3NlZCBFTlRFUlxuICAgICAgY29uc3QgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q2hlY2tCb3hWYWx1ZShlKSA6IGUuY3VycmVudFRhcmdldC52YWx1ZTtcblxuICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQodmFsdWUsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgIG51bGwsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUJsdXIgPSBlID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5ibHVyVG9TYXZlKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC50eXBlID09PSAnY2hlY2tib3gnID9cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRDaGVja0JveFZhbHVlKGUpIDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgICAgdmFsdWUsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRvcih2YWx1ZSkge1xuICAgIGNvbnN0IHRzID0gdGhpcztcbiAgICBpZiAodHMucHJvcHMuZWRpdGFibGUudmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWxpZCA9IHRzLnByb3BzLmVkaXRhYmxlLnZhbGlkYXRvcih2YWx1ZSk7XG4gICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgIHRzLnJlZnMubm90aWZpZXIubm90aWNlKCdlcnJvcicsIHZhbGlkLCAnUHJlc3NlZCBFU0MgY2FuIGNhbmNlbCcpO1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRzLnJlZnMuaW5wdXRSZWY7XG4gICAgICAgIC8vIGFuaW1hdGUgaW5wdXRcbiAgICAgICAgdHMuY2xlYXJUaW1lb3V0KCk7XG4gICAgICAgIHRzLnNldFN0YXRlKHsgc2hha2VFZGl0b3I6IHRydWUgfSk7XG4gICAgICAgIHRzLnRpbWVvdXRlQ2xlYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0cy5zZXRTdGF0ZSh7IHNoYWtlRWRpdG9yOiBmYWxzZSB9KTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjbGVhclRpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dGVDbGVhciAhPT0gMCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dGVDbGVhcik7XG4gICAgICB0aGlzLnRpbWVvdXRlQ2xlYXIgPSAwO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnJlZnMuaW5wdXRSZWYuZm9jdXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlZGl0YWJsZSwgZm9ybWF0LCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNoYWtlRWRpdG9yIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGF0dHIgPSB7XG4gICAgICByZWY6ICdpbnB1dFJlZicsXG4gICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5UHJlc3MsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1clxuICAgIH07XG4gICAgLy8gcHV0IHBsYWNlaG9sZGVyIGlmIGV4aXN0XG4gICAgZWRpdGFibGUucGxhY2Vob2xkZXIgJiYgKGF0dHIucGxhY2Vob2xkZXIgPSBlZGl0YWJsZS5wbGFjZWhvbGRlcik7XG5cbiAgICBjb25zdCBlZGl0b3JDbGFzcyA9IGNsYXNzU2V0KHsgJ2FuaW1hdGVkJzogc2hha2VFZGl0b3IsICdzaGFrZSc6IHNoYWtlRWRpdG9yIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8dGQgcmVmPSd0ZCcgc3R5bGU9eyB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0gfT5cbiAgICAgICAgeyBlZGl0b3IoZWRpdGFibGUsIGF0dHIsIGZvcm1hdCwgZWRpdG9yQ2xhc3MsIGNoaWxkcmVuIHx8ICcnKSB9XG4gICAgICAgIDxOb3RpZmllciByZWY9J25vdGlmaWVyJy8+XG4gICAgICA8L3RkPlxuICAgICk7XG4gIH1cblxuICBfZ2V0Q2hlY2tCb3hWYWx1ZShlKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgY29uc3QgdmFsdWVzID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZCA/IHZhbHVlc1swXSA6IHZhbHVlc1sxXTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuVGFibGVFZGl0Q29sdW1uLnByb3BUeXBlcyA9IHtcbiAgY29tcGxldGVFZGl0OiBQcm9wVHlwZXMuZnVuYyxcbiAgcm93SW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGNvbEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICBibHVyVG9TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgZWRpdGFibGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyBQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLm9iamVjdCBdKSxcbiAgZm9ybWF0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFsgUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jIF0pLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVFZGl0Q29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVFZGl0Q29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgZWRpdG9yID0gZnVuY3Rpb24oZWRpdGFibGUsIGF0dHIsIGZvcm1hdCwgZWRpdG9yQ2xhc3MsIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAoZWRpdGFibGUgPT09IHRydWUgfHwgdHlwZW9mIGVkaXRhYmxlID09PSAnc3RyaW5nJykgeyAvLyBzaW1wbGUgZGVjbGFyZVxuICAgIGNvbnN0IHR5cGUgPSBlZGl0YWJsZSA/ICd0ZXh0JyA6IGVkaXRhYmxlO1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgeyAuLi5hdHRyIH0gdHlwZT17IHR5cGUgfSBkZWZhdWx0VmFsdWU9eyBkZWZhdWx0VmFsdWUgfVxuICAgICAgICAgIGNsYXNzTmFtZT17ICggZWRpdG9yQ2xhc3MgfHwgJycpICsgJyBmb3JtLWNvbnRyb2wgZWRpdG9yIGVkaXQtdGV4dCcgfSAvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAoIWVkaXRhYmxlKSB7XG4gICAgY29uc3QgdHlwZSA9IGVkaXRhYmxlID8gJ3RleHQnIDogZWRpdGFibGU7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGlucHV0IHsgLi4uYXR0ciB9IHR5cGU9eyB0eXBlIH0gZGVmYXVsdFZhbHVlPXsgZGVmYXVsdFZhbHVlIH1cbiAgICAgICAgICBkaXNhYmxlZD0nZGlzYWJsZWQnXG4gICAgICAgICAgY2xhc3NOYW1lPXsgKCBlZGl0b3JDbGFzcyB8fCAnJykgKyAnIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0JyB9IC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChlZGl0YWJsZS50eXBlKSB7Ly8gc3RhbmRhcmQgZGVjbGFyZVxuICAgIC8vIHB1dCBzdHlsZSBpZiBleGlzdFxuICAgIGVkaXRhYmxlLnN0eWxlICYmIChhdHRyLnN0eWxlID0gZWRpdGFibGUuc3R5bGUpO1xuICAgIC8vIHB1dCBjbGFzcyBpZiBleGlzdFxuICAgIGF0dHIuY2xhc3NOYW1lID0gKGVkaXRvckNsYXNzIHx8ICcnKSArXG4gICAgICAgICAgICAgICAgICAgICAnIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC0nICtcbiAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlLnR5cGUgK1xuICAgICAgICAgICAgICAgICAgICAgKGVkaXRhYmxlLmNsYXNzTmFtZSA/ICgnICcgKyBlZGl0YWJsZS5jbGFzc05hbWUpIDogJycpO1xuXG4gICAgaWYgKGVkaXRhYmxlLnR5cGUgPT09ICdzZWxlY3QnKSB7Ly8gcHJvY2VzcyBzZWxlY3QgaW5wdXRcbiAgICAgIGxldCBvcHRpb25zID0gW107XG4gICAgICBjb25zdCB2YWx1ZXMgPSBlZGl0YWJsZS5vcHRpb25zLnZhbHVlcztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHsvLyBvbmx5IGNhbiB1c2UgYXJycmF5IGRhdGEgZm9yIG9wdGlvbnNcbiAgICAgICAgbGV0IHJvd1ZhbHVlO1xuICAgICAgICBvcHRpb25zID0gdmFsdWVzLm1hcCgoZCwgaSkgPT4ge1xuICAgICAgICAgIHJvd1ZhbHVlID0gZm9ybWF0ID8gZm9ybWF0KGQpIDogZDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9eyAnb3B0aW9uJyArIGkgfSB2YWx1ZT17IGQgfT57IHJvd1ZhbHVlIH08L29wdGlvbj5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzZWxlY3QgeyAuLi5hdHRyIH0gZGVmYXVsdFZhbHVlPXsgZGVmYXVsdFZhbHVlIH0+XG4gICAgICAgICAgeyBvcHRpb25zIH1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoZWRpdGFibGUudHlwZSA9PT0gJ3RleHRhcmVhJykgey8vIHByb2Nlc3MgdGV4dGFyZWEgaW5wdXRcbiAgICAgIC8vIHB1dCBvdGhlciBpZiBleGlzdFxuICAgICAgZWRpdGFibGUuY29scyAmJiAoYXR0ci5jb2xzID0gZWRpdGFibGUuY29scyk7XG4gICAgICBlZGl0YWJsZS5yb3dzICYmIChhdHRyLnJvd3MgPSBlZGl0YWJsZS5yb3dzKTtcbiAgICAgIGxldCBzYXZlQnRuO1xuICAgICAgY29uc3Qga2V5VXBIYW5kbGVyID0gYXR0ci5vbktleURvd247XG4gICAgICBpZiAoa2V5VXBIYW5kbGVyKSB7XG4gICAgICAgIGF0dHIub25LZXlEb3duID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgIT09IDEzKSB7IC8vIG5vdCBQcmVzc2VkIEVOVEVSXG4gICAgICAgICAgICBrZXlVcEhhbmRsZXIoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzYXZlQnRuID0gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT0nYnRuIGJ0bi1pbmZvIGJ0bi14cyB0ZXh0YXJlYS1zYXZlLWJ0bidcbiAgICAgICAgICAgIG9uQ2xpY2s9eyBrZXlVcEhhbmRsZXIgfT5cbiAgICAgICAgICAgIHNhdmVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHRleHRhcmVhIHsgLi4uYXR0ciB9IGRlZmF1bHRWYWx1ZT17IGRlZmF1bHRWYWx1ZSB9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgeyBzYXZlQnRuIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoZWRpdGFibGUudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgbGV0IHZhbHVlcyA9ICd0cnVlOmZhbHNlJztcbiAgICAgIGlmIChlZGl0YWJsZS5vcHRpb25zICYmIGVkaXRhYmxlLm9wdGlvbnMudmFsdWVzKSB7XG4gICAgICAgIC8vIHZhbHVlcyA9IGVkaXRhYmxlLm9wdGlvbnMudmFsdWVzLnNwbGl0KCc6Jyk7XG4gICAgICAgIHZhbHVlcyA9IGVkaXRhYmxlLm9wdGlvbnMudmFsdWVzO1xuICAgICAgfVxuICAgICAgYXR0ci5jbGFzc05hbWUgPSBhdHRyLmNsYXNzTmFtZS5yZXBsYWNlKCdmb3JtLWNvbnRyb2wnLCAnJyk7XG4gICAgICBhdHRyLmNsYXNzTmFtZSArPSAnIGNoZWNrYm94IHB1bGwtcmlnaHQnO1xuXG4gICAgICBjb25zdCBjaGVja2VkID0gZGVmYXVsdFZhbHVlICYmXG4gICAgICAgIGRlZmF1bHRWYWx1ZS50b1N0cmluZygpID09PSB2YWx1ZXMuc3BsaXQoJzonKVswXSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlucHV0IHsgLi4uYXR0ciB9IHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgIHZhbHVlPXsgdmFsdWVzIH0gZGVmYXVsdENoZWNrZWQ9eyBjaGVja2VkIH0vPlxuICAgICAgKTtcbiAgICB9IGVsc2Ugey8vIHByb2Nlc3Mgb3RoZXIgaW5wdXQgdHlwZS4gYXMgcGFzc3dvcmQsdXJsLGVtYWlsLi4uXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXQgeyAuLi5hdHRyIH0gdHlwZT0ndGV4dCcgZGVmYXVsdFZhbHVlPXsgZGVmYXVsdFZhbHVlIH0vPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLy8gZGVmYXVsdCByZXR1cm4gZm9yIG90aGVyIGNhc2Ugb2YgZWRpdGFibGVcbiAgcmV0dXJuIChcbiAgICA8aW5wdXQgey4uLmF0dHJ9IHR5cGU9J3RleHQnXG4gICAgICBjbGFzc05hbWU9eyAoZWRpdG9yQ2xhc3MgfHwgJycpICsgJyBmb3JtLWNvbnRyb2wgZWRpdG9yIGVkaXQtdGV4dCcgfS8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlZGl0b3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FZGl0b3IuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciwgVG9hc3RNZXNzYWdlIH0gZnJvbSAncmVhY3QtdG9hc3RyJztcblxuXG5jb25zdCBUb2FzdHJNZXNzYWdlRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoVG9hc3RNZXNzYWdlLmFuaW1hdGlvbik7XG5cbmNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8vIGFsbG93IHR5cGUgaXMgc3VjY2VzcyxpbmZvLHdhcm5pbmcsZXJyb3JcbiAgbm90aWNlKHR5cGUsIG1zZywgdGl0bGUpIHtcbiAgICB0aGlzLnJlZnMudG9hc3RyW3R5cGVdKFxuICAgICAgbXNnLCB0aXRsZSwge1xuICAgICAgICBtb2RlOiAnc2luZ2xlJyxcbiAgICAgICAgdGltZU91dDogNTAwMCxcbiAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxuICAgICAgICBzaG93QW5pbWF0aW9uOiAnYW5pbWF0ZWQgIGJvdW5jZUluJyxcbiAgICAgICAgaGlkZUFuaW1hdGlvbjogJ2FuaW1hdGVkIGJvdW5jZU91dCdcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VG9hc3RDb250YWluZXIgcmVmPSd0b2FzdHInXG4gICAgICAgIHRvYXN0TWVzc2FnZUZhY3Rvcnk9eyBUb2FzdHJNZXNzYWdlRmFjdG9yeSB9XG4gICAgICAgIGlkPSd0b2FzdC1jb250YWluZXInXG4gICAgICAgIGNsYXNzTmFtZT0ndG9hc3QtdG9wLXJpZ2h0Jy8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Ob3RpZmljYXRpb24uanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVG9hc3RNZXNzYWdlID0gZXhwb3J0cy5Ub2FzdENvbnRhaW5lciA9IHVuZGVmaW5lZDtcblxudmFyIF9Ub2FzdENvbnRhaW5lciA9IHJlcXVpcmUoXCIuL1RvYXN0Q29udGFpbmVyXCIpO1xuXG52YXIgX1RvYXN0Q29udGFpbmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RvYXN0Q29udGFpbmVyKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UgPSByZXF1aXJlKFwiLi9Ub2FzdE1lc3NhZ2VcIik7XG5cbnZhciBfVG9hc3RNZXNzYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RvYXN0TWVzc2FnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuVG9hc3RDb250YWluZXIgPSBfVG9hc3RDb250YWluZXIyLmRlZmF1bHQ7XG5leHBvcnRzLlRvYXN0TWVzc2FnZSA9IF9Ub2FzdE1lc3NhZ2UyLmRlZmF1bHQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL2xpYi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNVcGRhdGUgPSByZXF1aXJlKFwicmVhY3QtYWRkb25zLXVwZGF0ZVwiKTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1VwZGF0ZSk7XG5cbnZhciBfVG9hc3RNZXNzYWdlID0gcmVxdWlyZShcIi4vVG9hc3RNZXNzYWdlXCIpO1xuXG52YXIgX1RvYXN0TWVzc2FnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2FzdE1lc3NhZ2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBUb2FzdENvbnRhaW5lciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhUb2FzdENvbnRhaW5lciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVG9hc3RDb250YWluZXIoKSB7XG4gICAgdmFyIF9PYmplY3QkZ2V0UHJvdG90eXBlTztcblxuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVG9hc3RDb250YWluZXIpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX09iamVjdCRnZXRQcm90b3R5cGVPID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKFRvYXN0Q29udGFpbmVyKSkuY2FsbC5hcHBseShfT2JqZWN0JGdldFByb3RvdHlwZU8sIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRvYXN0czogW10sXG4gICAgICB0b2FzdElkOiAwLFxuICAgICAgcHJldmlvdXNNZXNzYWdlOiBudWxsXG4gICAgfSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVG9hc3RDb250YWluZXIsIFt7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS5lcnJvciwgbWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluZm9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5mbyhtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKSB7XG4gICAgICB0aGlzLl9ub3RpZnkodGhpcy5wcm9wcy50b2FzdFR5cGUuaW5mbywgbWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN1Y2Nlc3NcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKSB7XG4gICAgICB0aGlzLl9ub3RpZnkodGhpcy5wcm9wcy50b2FzdFR5cGUuc3VjY2VzcywgbWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIndhcm5pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKSB7XG4gICAgICB0aGlzLl9ub3RpZnkodGhpcy5wcm9wcy50b2FzdFR5cGUud2FybmluZywgbWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucmVmcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF90aGlzMi5yZWZzW2tleV0uaGlkZVRvYXN0KGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHsgXCJhcmlhLWxpdmVcIjogXCJwb2xpdGVcIiwgcm9sZTogXCJhbGVydFwiIH0pLFxuICAgICAgICB0aGlzLnN0YXRlLnRvYXN0cy5tYXAoZnVuY3Rpb24gKHRvYXN0KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMy5wcm9wcy50b2FzdE1lc3NhZ2VGYWN0b3J5KHRvYXN0KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9ub3RpZnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX25vdGlmeSh0eXBlLCBtZXNzYWdlLCB0aXRsZSkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHZhciBvcHRpb25zT3ZlcnJpZGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDMgfHwgYXJndW1lbnRzWzNdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1szXTtcblxuICAgICAgaWYgKHRoaXMucHJvcHMucHJldmVudER1cGxpY2F0ZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucHJldmlvdXNNZXNzYWdlID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIga2V5ID0gdGhpcy5zdGF0ZS50b2FzdElkKys7XG4gICAgICB2YXIgdG9hc3RJZCA9IGtleTtcbiAgICAgIHZhciBuZXdUb2FzdCA9ICgwLCBfcmVhY3RBZGRvbnNVcGRhdGUyLmRlZmF1bHQpKG9wdGlvbnNPdmVycmlkZSwge1xuICAgICAgICAkbWVyZ2U6IHtcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgIHRvYXN0SWQ6IHRvYXN0SWQsXG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgcmVmOiBcInRvYXN0c19fXCIgKyBrZXksXG4gICAgICAgICAgaGFuZGxlT25DbGljazogZnVuY3Rpb24gaGFuZGxlT25DbGljayhlKSB7XG4gICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9uc092ZXJyaWRlLmhhbmRsZU9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgb3B0aW9uc092ZXJyaWRlLmhhbmRsZU9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfdGhpczQuX2hhbmRsZV90b2FzdF9vbl9jbGljayhlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhhbmRsZVJlbW92ZTogdGhpcy5faGFuZGxlX3RvYXN0X3JlbW92ZS5iaW5kKHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIHRvYXN0T3BlcmF0aW9uID0gX2RlZmluZVByb3BlcnR5KHt9LCBcIlwiICsgKHRoaXMucHJvcHMubmV3ZXN0T25Ub3AgPyBcIiR1bnNoaWZ0XCIgOiBcIiRwdXNoXCIpLCBbbmV3VG9hc3RdKTtcblxuICAgICAgdmFyIG5leHRTdGF0ZSA9ICgwLCBfcmVhY3RBZGRvbnNVcGRhdGUyLmRlZmF1bHQpKHRoaXMuc3RhdGUsIHtcbiAgICAgICAgdG9hc3RzOiB0b2FzdE9wZXJhdGlvbixcbiAgICAgICAgcHJldmlvdXNNZXNzYWdlOiB7ICRzZXQ6IG1lc3NhZ2UgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oYW5kbGVfdG9hc3Rfb25fY2xpY2tcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZV90b2FzdF9vbl9jbGljayhldmVudCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2hhbmRsZV90b2FzdF9yZW1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZV90b2FzdF9yZW1vdmUodG9hc3RJZCkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBvcGVyYXRpb25OYW1lID0gXCJcIiArICh0aGlzLnByb3BzLm5ld2VzdE9uVG9wID8gXCJyZWR1Y2VSaWdodFwiIDogXCJyZWR1Y2VcIik7XG4gICAgICB0aGlzLnN0YXRlLnRvYXN0c1tvcGVyYXRpb25OYW1lXShmdW5jdGlvbiAoZm91bmQsIHRvYXN0LCBpbmRleCkge1xuICAgICAgICBpZiAoZm91bmQgfHwgdG9hc3QudG9hc3RJZCAhPT0gdG9hc3RJZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpczUuc2V0U3RhdGUoKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkoX3RoaXM1LnN0YXRlLCB7XG4gICAgICAgICAgdG9hc3RzOiB7ICRzcGxpY2U6IFtbaW5kZXgsIDFdXSB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRvYXN0Q29udGFpbmVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuVG9hc3RDb250YWluZXIuZGVmYXVsdFByb3BzID0ge1xuICB0b2FzdFR5cGU6IHtcbiAgICBlcnJvcjogXCJlcnJvclwiLFxuICAgIGluZm86IFwiaW5mb1wiLFxuICAgIHN1Y2Nlc3M6IFwic3VjY2Vzc1wiLFxuICAgIHdhcm5pbmc6IFwid2FybmluZ1wiXG4gIH0sXG4gIGlkOiBcInRvYXN0LWNvbnRhaW5lclwiLFxuICB0b2FzdE1lc3NhZ2VGYWN0b3J5OiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRmFjdG9yeShfVG9hc3RNZXNzYWdlMi5kZWZhdWx0KSxcbiAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxuICBuZXdlc3RPblRvcDogdHJ1ZSxcbiAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHt9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gVG9hc3RDb250YWluZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdENvbnRhaW5lci5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi91cGRhdGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSB1cGRhdGVcbiAqL1xuXG4vKiBnbG9iYWwgaGFzT3duUHJvcGVydHk6dHJ1ZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL09iamVjdC5hc3NpZ24nKTtcbnZhciBrZXlPZiA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU9mJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgaGFzT3duUHJvcGVydHkgPSAoe30pLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBzaGFsbG93Q29weSh4KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgcmV0dXJuIHguY29uY2F0KCk7XG4gIH0gZWxzZSBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYXNzaWduKG5ldyB4LmNvbnN0cnVjdG9yKCksIHgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4O1xuICB9XG59XG5cbnZhciBDT01NQU5EX1BVU0ggPSBrZXlPZih7ICRwdXNoOiBudWxsIH0pO1xudmFyIENPTU1BTkRfVU5TSElGVCA9IGtleU9mKHsgJHVuc2hpZnQ6IG51bGwgfSk7XG52YXIgQ09NTUFORF9TUExJQ0UgPSBrZXlPZih7ICRzcGxpY2U6IG51bGwgfSk7XG52YXIgQ09NTUFORF9TRVQgPSBrZXlPZih7ICRzZXQ6IG51bGwgfSk7XG52YXIgQ09NTUFORF9NRVJHRSA9IGtleU9mKHsgJG1lcmdlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfQVBQTFkgPSBrZXlPZih7ICRhcHBseTogbnVsbCB9KTtcblxudmFyIEFMTF9DT01NQU5EU19MSVNUID0gW0NPTU1BTkRfUFVTSCwgQ09NTUFORF9VTlNISUZULCBDT01NQU5EX1NQTElDRSwgQ09NTUFORF9TRVQsIENPTU1BTkRfTUVSR0UsIENPTU1BTkRfQVBQTFldO1xuXG52YXIgQUxMX0NPTU1BTkRTX1NFVCA9IHt9O1xuXG5BTExfQ09NTUFORFNfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gIEFMTF9DT01NQU5EU19TRVRbY29tbWFuZF0gPSB0cnVlO1xufSk7XG5cbmZ1bmN0aW9uIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgY29tbWFuZCkge1xuICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHRhcmdldCBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLicsIGNvbW1hbmQsIHZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gIHZhciBzcGVjVmFsdWUgPSBzcGVjW2NvbW1hbmRdO1xuICAhQXJyYXkuaXNBcnJheShzcGVjVmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlciBpbiBhbiBhcnJheT8nLCBjb21tYW5kLCBzcGVjVmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKHZhbHVlLCBzcGVjKSB7XG4gICEodHlwZW9mIHNwZWMgPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogWW91IHByb3ZpZGVkIGEga2V5IHBhdGggdG8gdXBkYXRlKCkgdGhhdCBkaWQgbm90IGNvbnRhaW4gb25lICcgKyAnb2YgJXMuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgeyVzOiAuLi59PycsIEFMTF9DT01NQU5EU19MSVNULmpvaW4oJywgJyksIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9TRVQpKSB7XG4gICAgIShPYmplY3Qua2V5cyhzcGVjKS5sZW5ndGggPT09IDEpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Nhbm5vdCBoYXZlIG1vcmUgdGhhbiBvbmUga2V5IGluIGFuIG9iamVjdCB3aXRoICVzJywgQ09NTUFORF9TRVQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBzcGVjW0NPTU1BTkRfU0VUXTtcbiAgfVxuXG4gIHZhciBuZXh0VmFsdWUgPSBzaGFsbG93Q29weSh2YWx1ZSk7XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9NRVJHRSkpIHtcbiAgICB2YXIgbWVyZ2VPYmogPSBzcGVjW0NPTU1BTkRfTUVSR0VdO1xuICAgICEobWVyZ2VPYmogJiYgdHlwZW9mIG1lcmdlT2JqID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSBzcGVjIG9mIHR5cGUgXFwnb2JqZWN0XFwnOyBnb3QgJXMnLCBDT01NQU5EX01FUkdFLCBtZXJnZU9iaikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICEobmV4dFZhbHVlICYmIHR5cGVvZiBuZXh0VmFsdWUgPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHRhcmdldCBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbmV4dFZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgYXNzaWduKG5leHRWYWx1ZSwgc3BlY1tDT01NQU5EX01FUkdFXSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1BVU0gpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1BVU0gpO1xuICAgIHNwZWNbQ09NTUFORF9QVVNIXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfVU5TSElGVCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfVU5TSElGVCk7XG4gICAgc3BlY1tDT01NQU5EX1VOU0hJRlRdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS51bnNoaWZ0KGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9TUExJQ0UpKSB7XG4gICAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkICVzIHRhcmdldCB0byBiZSBhbiBhcnJheTsgZ290ICVzJywgQ09NTUFORF9TUExJQ0UsIHZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgIUFycmF5LmlzQXJyYXkoc3BlY1tDT01NQU5EX1NQTElDRV0pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5IG9mIGFycmF5czsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXJzIGluIGFuIGFycmF5PycsIENPTU1BTkRfU1BMSUNFLCBzcGVjW0NPTU1BTkRfU1BMSUNFXSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIHNwZWNbQ09NTUFORF9TUExJQ0VdLmZvckVhY2goZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICFBcnJheS5pc0FycmF5KGFyZ3MpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5IG9mIGFycmF5czsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXJzIGluIGFuIGFycmF5PycsIENPTU1BTkRfU1BMSUNFLCBzcGVjW0NPTU1BTkRfU1BMSUNFXSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgbmV4dFZhbHVlLnNwbGljZS5hcHBseShuZXh0VmFsdWUsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9BUFBMWSkpIHtcbiAgICAhKHR5cGVvZiBzcGVjW0NPTU1BTkRfQVBQTFldID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhIGZ1bmN0aW9uOyBnb3QgJXMuJywgQ09NTUFORF9BUFBMWSwgc3BlY1tDT01NQU5EX0FQUExZXSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIG5leHRWYWx1ZSA9IHNwZWNbQ09NTUFORF9BUFBMWV0obmV4dFZhbHVlKTtcbiAgfVxuXG4gIGZvciAodmFyIGsgaW4gc3BlYykge1xuICAgIGlmICghKEFMTF9DT01NQU5EU19TRVQuaGFzT3duUHJvcGVydHkoaykgJiYgQUxMX0NPTU1BTkRTX1NFVFtrXSkpIHtcbiAgICAgIG5leHRWYWx1ZVtrXSA9IHVwZGF0ZSh2YWx1ZVtrXSwgc3BlY1trXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5leHRWYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL3VwZGF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5T2ZcbiAqL1xuXG4vKipcbiAqIEFsbG93cyBleHRyYWN0aW9uIG9mIGEgbWluaWZpZWQga2V5LiBMZXQncyB0aGUgYnVpbGQgc3lzdGVtIG1pbmlmeSBrZXlzXG4gKiB3aXRob3V0IGxvc2luZyB0aGUgYWJpbGl0eSB0byBkeW5hbWljYWxseSB1c2Uga2V5IHN0cmluZ3MgYXMgdmFsdWVzXG4gKiB0aGVtc2VsdmVzLiBQYXNzIGluIGFuIG9iamVjdCB3aXRoIGEgc2luZ2xlIGtleS92YWwgcGFpciBhbmQgaXQgd2lsbCByZXR1cm5cbiAqIHlvdSB0aGUgc3RyaW5nIGtleSBvZiB0aGF0IHNpbmdsZSByZWNvcmQuIFN1cHBvc2UgeW91IHdhbnQgdG8gZ3JhYiB0aGVcbiAqIHZhbHVlIGZvciBhIGtleSAnY2xhc3NOYW1lJyBpbnNpZGUgb2YgYW4gb2JqZWN0LiBLZXkvdmFsIG1pbmlmaWNhdGlvbiBtYXlcbiAqIGhhdmUgYWxpYXNlZCB0aGF0IGtleSB0byBiZSAneGExMicuIGtleU9mKHtjbGFzc05hbWU6IG51bGx9KSB3aWxsIHJldHVyblxuICogJ3hhMTInIGluIHRoYXQgY2FzZS4gUmVzb2x2ZSBrZXlzIHlvdSB3YW50IHRvIHVzZSBvbmNlIGF0IHN0YXJ0dXAgdGltZSwgdGhlblxuICogcmV1c2UgdGhvc2UgcmVzb2x1dGlvbnMuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga2V5T2YgPSBmdW5jdGlvbiAob25lS2V5T2JqKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIG9uZUtleU9iaikge1xuICAgIGlmICghb25lS2V5T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9+L2ZianMvbGliL2tleU9mLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMualF1ZXJ5ID0gZXhwb3J0cy5hbmltYXRpb24gPSB1bmRlZmluZWQ7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlID0gcmVxdWlyZShcInJlYWN0LWFkZG9ucy11cGRhdGVcIik7XG5cbnZhciBfcmVhY3RBZGRvbnNVcGRhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNVcGRhdGUpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKFwiY2xhc3NuYW1lc1wiKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX2FuaW1hdGlvbk1peGluID0gcmVxdWlyZShcIi4vYW5pbWF0aW9uTWl4aW5cIik7XG5cbnZhciBfYW5pbWF0aW9uTWl4aW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYW5pbWF0aW9uTWl4aW4pO1xuXG52YXIgX2pRdWVyeU1peGluID0gcmVxdWlyZShcIi4valF1ZXJ5TWl4aW5cIik7XG5cbnZhciBfalF1ZXJ5TWl4aW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfalF1ZXJ5TWl4aW4pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIFRvYXN0TWVzc2FnZVNwZWMgPSB7XG4gIGRpc3BsYXlOYW1lOiBcIlRvYXN0TWVzc2FnZVwiLFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHZhciBpY29uQ2xhc3NOYW1lcyA9IHtcbiAgICAgIGVycm9yOiBcInRvYXN0LWVycm9yXCIsXG4gICAgICBpbmZvOiBcInRvYXN0LWluZm9cIixcbiAgICAgIHN1Y2Nlc3M6IFwidG9hc3Qtc3VjY2Vzc1wiLFxuICAgICAgd2FybmluZzogXCJ0b2FzdC13YXJuaW5nXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzTmFtZTogXCJ0b2FzdFwiLFxuICAgICAgaWNvbkNsYXNzTmFtZXM6IGljb25DbGFzc05hbWVzLFxuICAgICAgdGl0bGVDbGFzc05hbWU6IFwidG9hc3QtdGl0bGVcIixcbiAgICAgIG1lc3NhZ2VDbGFzc05hbWU6IFwidG9hc3QtbWVzc2FnZVwiLFxuICAgICAgdGFwVG9EaXNtaXNzOiB0cnVlLFxuICAgICAgY2xvc2VCdXR0b246IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlT25DbGljazogZnVuY3Rpb24gaGFuZGxlT25DbGljayhldmVudCkge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlT25DbGljayhldmVudCk7XG4gICAgaWYgKHRoaXMucHJvcHMudGFwVG9EaXNtaXNzKSB7XG4gICAgICB0aGlzLmhpZGVUb2FzdCh0cnVlKTtcbiAgICB9XG4gIH0sXG4gIF9oYW5kbGVfY2xvc2VfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiBfaGFuZGxlX2Nsb3NlX2J1dHRvbl9jbGljayhldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaGlkZVRvYXN0KHRydWUpO1xuICB9LFxuICBfaGFuZGxlX3JlbW92ZTogZnVuY3Rpb24gX2hhbmRsZV9yZW1vdmUoKSB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVSZW1vdmUodGhpcy5wcm9wcy50b2FzdElkKTtcbiAgfSxcbiAgX3JlbmRlcl9jbG9zZV9idXR0b246IGZ1bmN0aW9uIF9yZW5kZXJfY2xvc2VfYnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNsb3NlQnV0dG9uID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInRvYXN0LWNsb3NlLWJ1dHRvblwiLCByb2xlOiBcImJ1dHRvblwiLFxuICAgICAgb25DbGljazogdGhpcy5faGFuZGxlX2Nsb3NlX2J1dHRvbl9jbGljayxcbiAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDogXCImdGltZXM7XCIgfVxuICAgIH0pIDogZmFsc2U7XG4gIH0sXG4gIF9yZW5kZXJfdGl0bGVfZWxlbWVudDogZnVuY3Rpb24gX3JlbmRlcl90aXRsZV9lbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMudGl0bGVDbGFzc05hbWUgfSxcbiAgICAgIHRoaXMucHJvcHMudGl0bGVcbiAgICApIDogZmFsc2U7XG4gIH0sXG4gIF9yZW5kZXJfbWVzc2FnZV9lbGVtZW50OiBmdW5jdGlvbiBfcmVuZGVyX21lc3NhZ2VfZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5tZXNzYWdlID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMubWVzc2FnZUNsYXNzTmFtZSB9LFxuICAgICAgdGhpcy5wcm9wcy5tZXNzYWdlXG4gICAgKSA6IGZhbHNlO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgaWNvbkNsYXNzTmFtZSA9IHRoaXMucHJvcHMuaWNvbkNsYXNzTmFtZSB8fCB0aGlzLnByb3BzLmljb25DbGFzc05hbWVzW3RoaXMucHJvcHMudHlwZV07XG5cbiAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkodGhpcy5wcm9wcy5jbGFzc05hbWUsIGljb25DbGFzc05hbWUpLFxuICAgICAgICBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVPbkNsaWNrLFxuICAgICAgICBvbk1vdXNlRW50ZXI6IHRoaXMuaGFuZGxlTW91c2VFbnRlcixcbiAgICAgICAgb25Nb3VzZUxlYXZlOiB0aGlzLmhhbmRsZU1vdXNlTGVhdmVcbiAgICAgIH0sXG4gICAgICB0aGlzLl9yZW5kZXJfY2xvc2VfYnV0dG9uKCksXG4gICAgICB0aGlzLl9yZW5kZXJfdGl0bGVfZWxlbWVudCgpLFxuICAgICAgdGhpcy5fcmVuZGVyX21lc3NhZ2VfZWxlbWVudCgpXG4gICAgKTtcbiAgfVxufTtcblxudmFyIGFuaW1hdGlvbiA9IGV4cG9ydHMuYW5pbWF0aW9uID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUNsYXNzKCgwLCBfcmVhY3RBZGRvbnNVcGRhdGUyLmRlZmF1bHQpKFRvYXN0TWVzc2FnZVNwZWMsIHtcbiAgZGlzcGxheU5hbWU6IHsgJHNldDogXCJUb2FzdE1lc3NhZ2UuYW5pbWF0aW9uXCIgfSxcbiAgbWl4aW5zOiB7ICRzZXQ6IFtfYW5pbWF0aW9uTWl4aW4yLmRlZmF1bHRdIH1cbn0pKTtcblxudmFyIGpRdWVyeSA9IGV4cG9ydHMualF1ZXJ5ID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUNsYXNzKCgwLCBfcmVhY3RBZGRvbnNVcGRhdGUyLmRlZmF1bHQpKFRvYXN0TWVzc2FnZVNwZWMsIHtcbiAgZGlzcGxheU5hbWU6IHsgJHNldDogXCJUb2FzdE1lc3NhZ2UualF1ZXJ5XCIgfSxcbiAgbWl4aW5zOiB7ICRzZXQ6IFtfalF1ZXJ5TWl4aW4yLmRlZmF1bHRdIH1cbn0pKTtcblxuLypcbiAqIGFzc2lnbiBkZWZhdWx0IG5vb3AgZnVuY3Rpb25zXG4gKi9cblRvYXN0TWVzc2FnZVNwZWMuaGFuZGxlTW91c2VFbnRlciA9IG5vb3A7XG5Ub2FzdE1lc3NhZ2VTcGVjLmhhbmRsZU1vdXNlTGVhdmUgPSBub29wO1xuVG9hc3RNZXNzYWdlU3BlYy5oaWRlVG9hc3QgPSBub29wO1xuXG52YXIgVG9hc3RNZXNzYWdlID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUNsYXNzKFRvYXN0TWVzc2FnZVNwZWMpO1xuXG5Ub2FzdE1lc3NhZ2UuYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuVG9hc3RNZXNzYWdlLmpRdWVyeSA9IGpRdWVyeTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVG9hc3RNZXNzYWdlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0NTU0NvcmUgPSByZXF1aXJlKFwiZmJqcy9saWIvQ1NTQ29yZVwiKTtcblxudmFyIF9DU1NDb3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NTU0NvcmUpO1xuXG52YXIgX1JlYWN0VHJhbnNpdGlvbkV2ZW50cyA9IHJlcXVpcmUoXCJyZWFjdC9saWIvUmVhY3RUcmFuc2l0aW9uRXZlbnRzXCIpO1xuXG52YXIgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9SZWFjdFRyYW5zaXRpb25FdmVudHMpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBUSUNLID0gMTc7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNpdGlvbjogbnVsbCwgLy8gc29tZSBleGFtcGxlcyBkZWZpbmVkIGluIGluZGV4LnNjc3MgKHNjYWxlLCBmYWRlSW5PdXQsIHJvdGF0ZSlcbiAgICAgIHNob3dBbmltYXRpb246IFwiYW5pbWF0ZWQgYm91bmNlSW5cIiwgLy8gb3Igb3RoZXIgYW5pbWF0aW9ucyBmcm9tIGFuaW1hdGUuY3NzXG4gICAgICBoaWRlQW5pbWF0aW9uOiBcImFuaW1hdGVkIGJvdW5jZU91dFwiLFxuICAgICAgdGltZU91dDogNTAwMCxcbiAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMFxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuY2xhc3NOYW1lUXVldWUgPSBbXTtcbiAgICB0aGlzLmlzSGlkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbnRlcnZhbElkID0gbnVsbDtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9pc19tb3VudGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9zaG93KCk7XG4gICAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICB2YXIgb25IaWRlQ29tcGxldGUgPSBmdW5jdGlvbiBvbkhpZGVDb21wbGV0ZSgpIHtcbiAgICAgIGlmIChfdGhpcy5pc0hpZGluZykge1xuICAgICAgICBfdGhpcy5fc2V0X2lzX2hpZGluZyhmYWxzZSk7XG4gICAgICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQucmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBvbkhpZGVDb21wbGV0ZSk7XG4gICAgICAgIF90aGlzLl9oYW5kbGVfcmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LmFkZEVuZEV2ZW50TGlzdGVuZXIobm9kZSwgb25IaWRlQ29tcGxldGUpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMudGltZU91dCA+IDApIHtcbiAgICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChzZXRUaW1lb3V0KHRoaXMuaGlkZVRvYXN0LCB0aGlzLnByb3BzLnRpbWVPdXQpKTtcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLl9pc19tb3VudGVkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaW50ZXJ2YWxJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWxJZCk7XG4gICAgfVxuICB9LFxuICBfc2V0X3RyYW5zaXRpb246IGZ1bmN0aW9uIF9zZXRfdHJhbnNpdGlvbihoaWRlKSB7XG4gICAgdmFyIGFuaW1hdGlvblR5cGUgPSBoaWRlID8gXCJsZWF2ZVwiIDogXCJlbnRlclwiO1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnRyYW5zaXRpb24gKyBcIi1cIiArIGFuaW1hdGlvblR5cGU7XG4gICAgdmFyIGFjdGl2ZUNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiLWFjdGl2ZVwiO1xuXG4gICAgdmFyIGVuZExpc3RlbmVyID0gZnVuY3Rpb24gZW5kTGlzdGVuZXIoZSkge1xuICAgICAgaWYgKGUgJiYgZS50YXJnZXQgIT09IG5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuICAgICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcblxuICAgICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5yZW1vdmVFbmRFdmVudExpc3RlbmVyKG5vZGUsIGVuZExpc3RlbmVyKTtcbiAgICB9O1xuXG4gICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5hZGRFbmRFdmVudExpc3RlbmVyKG5vZGUsIGVuZExpc3RlbmVyKTtcblxuICAgIF9DU1NDb3JlMi5kZWZhdWx0LmFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG5cbiAgICAvLyBOZWVkIHRvIGRvIHRoaXMgdG8gYWN0dWFsbHkgdHJpZ2dlciBhIHRyYW5zaXRpb24uXG4gICAgdGhpcy5fcXVldWVfY2xhc3MoYWN0aXZlQ2xhc3NOYW1lKTtcbiAgfSxcbiAgX2NsZWFyX3RyYW5zaXRpb246IGZ1bmN0aW9uIF9jbGVhcl90cmFuc2l0aW9uKGhpZGUpIHtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB2YXIgYW5pbWF0aW9uVHlwZSA9IGhpZGUgPyBcImxlYXZlXCIgOiBcImVudGVyXCI7XG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMucHJvcHMudHJhbnNpdGlvbiArIFwiLVwiICsgYW5pbWF0aW9uVHlwZTtcbiAgICB2YXIgYWN0aXZlQ2xhc3NOYW1lID0gY2xhc3NOYW1lICsgXCItYWN0aXZlXCI7XG5cbiAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGFjdGl2ZUNsYXNzTmFtZSk7XG4gIH0sXG4gIF9zZXRfYW5pbWF0aW9uOiBmdW5jdGlvbiBfc2V0X2FuaW1hdGlvbihoaWRlKSB7XG4gICAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcyk7XG4gICAgdmFyIGFuaW1hdGlvbnMgPSB0aGlzLl9nZXRfYW5pbWF0aW9uX2NsYXNzZXMoaGlkZSk7XG4gICAgdmFyIGVuZExpc3RlbmVyID0gZnVuY3Rpb24gZW5kTGlzdGVuZXIoZSkge1xuICAgICAgaWYgKGUgJiYgZS50YXJnZXQgIT09IG5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhbmltYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFuaW0pIHtcbiAgICAgICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgYW5pbSk7XG4gICAgICB9KTtcblxuICAgICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5yZW1vdmVFbmRFdmVudExpc3RlbmVyKG5vZGUsIGVuZExpc3RlbmVyKTtcbiAgICB9O1xuXG4gICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5hZGRFbmRFdmVudExpc3RlbmVyKG5vZGUsIGVuZExpc3RlbmVyKTtcblxuICAgIGFuaW1hdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYW5pbSkge1xuICAgICAgX0NTU0NvcmUyLmRlZmF1bHQuYWRkQ2xhc3Mobm9kZSwgYW5pbSk7XG4gICAgfSk7XG4gIH0sXG4gIF9nZXRfYW5pbWF0aW9uX2NsYXNzZXM6IGZ1bmN0aW9uIF9nZXRfYW5pbWF0aW9uX2NsYXNzZXMoaGlkZSkge1xuICAgIHZhciBhbmltYXRpb25zID0gaGlkZSA/IHRoaXMucHJvcHMuaGlkZUFuaW1hdGlvbiA6IHRoaXMucHJvcHMuc2hvd0FuaW1hdGlvbjtcbiAgICBpZiAoXCJbb2JqZWN0IEFycmF5XVwiID09PSB0b1N0cmluZy5jYWxsKGFuaW1hdGlvbnMpKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9ucztcbiAgICB9IGVsc2UgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBhbmltYXRpb25zKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9ucy5zcGxpdChcIiBcIik7XG4gICAgfVxuICB9LFxuICBfY2xlYXJfYW5pbWF0aW9uOiBmdW5jdGlvbiBfY2xlYXJfYW5pbWF0aW9uKGhpZGUpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBhbmltYXRpb25zID0gdGhpcy5fZ2V0X2FuaW1hdGlvbl9jbGFzc2VzKGhpZGUpO1xuICAgIGFuaW1hdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYW5pbWF0aW9uKSB7XG4gICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUoX3RoaXMyKSwgYW5pbWF0aW9uKTtcbiAgICB9KTtcbiAgfSxcbiAgX3F1ZXVlX2NsYXNzOiBmdW5jdGlvbiBfcXVldWVfY2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdGhpcy5jbGFzc05hbWVRdWV1ZS5wdXNoKGNsYXNzTmFtZSk7XG5cbiAgICBpZiAoIXRoaXMudGltZW91dCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLl9mbHVzaF9jbGFzc19uYW1lX3F1ZXVlLCBUSUNLKTtcbiAgICB9XG4gIH0sXG4gIF9mbHVzaF9jbGFzc19uYW1lX3F1ZXVlOiBmdW5jdGlvbiBfZmx1c2hfY2xhc3NfbmFtZV9xdWV1ZSgpIHtcbiAgICBpZiAodGhpcy5faXNfbW91bnRlZCkge1xuICAgICAgdGhpcy5jbGFzc05hbWVRdWV1ZS5mb3JFYWNoKF9DU1NDb3JlMi5kZWZhdWx0LmFkZENsYXNzLmJpbmQoX0NTU0NvcmUyLmRlZmF1bHQsIF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKSkpO1xuICAgIH1cbiAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgfSxcbiAgX3Nob3c6IGZ1bmN0aW9uIF9zaG93KCkge1xuICAgIGlmICh0aGlzLnByb3BzLnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuX3NldF90cmFuc2l0aW9uKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNob3dBbmltYXRpb24pIHtcbiAgICAgIHRoaXMuX3NldF9hbmltYXRpb24oKTtcbiAgICB9XG4gIH0sXG4gIGhhbmRsZU1vdXNlRW50ZXI6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWxJZCk7XG4gICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKG51bGwpO1xuICAgIGlmICh0aGlzLmlzSGlkaW5nKSB7XG4gICAgICB0aGlzLl9zZXRfaXNfaGlkaW5nKGZhbHNlKTtcblxuICAgICAgaWYgKHRoaXMucHJvcHMuaGlkZUFuaW1hdGlvbikge1xuICAgICAgICB0aGlzLl9jbGVhcl9hbmltYXRpb24odHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMudHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLl9jbGVhcl90cmFuc2l0aW9uKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaGFuZGxlTW91c2VMZWF2ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNIaWRpbmcgJiYgKHRoaXMucHJvcHMudGltZU91dCA+IDAgfHwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQgPiAwKSkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMuZXh0ZW5kZWRUaW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBoaWRlVG9hc3Q6IGZ1bmN0aW9uIGhpZGVUb2FzdChvdmVycmlkZSkge1xuICAgIGlmICh0aGlzLmlzSGlkaW5nIHx8IHRoaXMuaW50ZXJ2YWxJZCA9PT0gbnVsbCAmJiAhb3ZlcnJpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRfaXNfaGlkaW5nKHRydWUpO1xuICAgIGlmICh0aGlzLnByb3BzLnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuX3NldF90cmFuc2l0aW9uKHRydWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5oaWRlQW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfYW5pbWF0aW9uKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVfcmVtb3ZlKCk7XG4gICAgfVxuICB9LFxuICBfc2V0X2ludGVydmFsX2lkOiBmdW5jdGlvbiBfc2V0X2ludGVydmFsX2lkKGludGVydmFsSWQpIHtcbiAgICB0aGlzLmludGVydmFsSWQgPSBpbnRlcnZhbElkO1xuICB9LFxuICBfc2V0X2lzX2hpZGluZzogZnVuY3Rpb24gX3NldF9pc19oaWRpbmcoaXNIaWRpbmcpIHtcbiAgICB0aGlzLmlzSGlkaW5nID0gaXNIaWRpbmc7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvYW5pbWF0aW9uTWl4aW4uanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIENTU0NvcmVcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnLi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBUaGUgQ1NTQ29yZSBtb2R1bGUgc3BlY2lmaWVzIHRoZSBBUEkgKGFuZCBpbXBsZW1lbnRzIG1vc3Qgb2YgdGhlIG1ldGhvZHMpXG4gKiB0aGF0IHNob3VsZCBiZSB1c2VkIHdoZW4gZGVhbGluZyB3aXRoIHRoZSBkaXNwbGF5IG9mIGVsZW1lbnRzICh2aWEgdGhlaXJcbiAqIENTUyBjbGFzc2VzIGFuZCB2aXNpYmlsaXR5IG9uIHNjcmVlbi4gSXQgaXMgYW4gQVBJIGZvY3VzZWQgb24gbXV0YXRpbmcgdGhlXG4gKiBkaXNwbGF5IGFuZCBub3QgcmVhZGluZyBpdCBhcyBubyBsb2dpY2FsIHN0YXRlIHNob3VsZCBiZSBlbmNvZGVkIGluIHRoZVxuICogZGlzcGxheSBvZiBlbGVtZW50cy5cbiAqL1xuXG52YXIgQ1NTQ29yZSA9IHtcblxuICAvKipcbiAgICogQWRkcyB0aGUgY2xhc3MgcGFzc2VkIGluIHRvIHRoZSBlbGVtZW50IGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBoYXZlIGl0LlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoZSBlbGVtZW50IHBhc3NlZCBpblxuICAgKi9cbiAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAhIS9cXHMvLnRlc3QoY2xhc3NOYW1lKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1NDb3JlLmFkZENsYXNzIHRha2VzIG9ubHkgYSBzaW5nbGUgY2xhc3MgbmFtZS4gXCIlc1wiIGNvbnRhaW5zICcgKyAnbXVsdGlwbGUgY2xhc3Nlcy4nLCBjbGFzc05hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoIUNTU0NvcmUuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2xhc3MgcGFzc2VkIGluIGZyb20gdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGUgZWxlbWVudCBwYXNzZWQgaW5cbiAgICovXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgISEvXFxzLy50ZXN0KGNsYXNzTmFtZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ1NTQ29yZS5yZW1vdmVDbGFzcyB0YWtlcyBvbmx5IGEgc2luZ2xlIGNsYXNzIG5hbWUuIFwiJXNcIiBjb250YWlucyAnICsgJ211bHRpcGxlIGNsYXNzZXMuJywgY2xhc3NOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKENTU0NvcmUuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIGNsYXNzTmFtZSArICcoPzpcXFxcc3wkKScsICdnJyksICckMScpLnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBtdWx0aXBsZSBzcGFjZXMgdG8gb25lXG4gICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7IC8vIHRyaW0gdGhlIGVuZHNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBhZGQgb3IgcmVtb3ZlIGEgY2xhc3MgZnJvbSBhbiBlbGVtZW50IGJhc2VkIG9uIGEgY29uZGl0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEBwYXJhbSB7Kn0gYm9vbCBjb25kaXRpb24gdG8gd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIHRoZSBjbGFzc1xuICAgKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGUgZWxlbWVudCBwYXNzZWQgaW5cbiAgICovXG4gIGNvbmRpdGlvbkNsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBib29sKSB7XG4gICAgcmV0dXJuIChib29sID8gQ1NTQ29yZS5hZGRDbGFzcyA6IENTU0NvcmUucmVtb3ZlQ2xhc3MpKGVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRlc3RzIHdoZXRoZXIgdGhlIGVsZW1lbnQgaGFzIHRoZSBjbGFzcyBzcGVjaWZpZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NTm9kZXxET01XaW5kb3d9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBjbGFzcywgZmFsc2UgaWYgbm90XG4gICAqL1xuICBoYXNDbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0NTUy5oYXNDbGFzcyB0YWtlcyBvbmx5IGEgc2luZ2xlIGNsYXNzIG5hbWUuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgcmV0dXJuICEhY2xhc3NOYW1lICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiAoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKSA+IC0xO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ1NTQ29yZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9DU1NDb3JlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VHJhbnNpdGlvbkV2ZW50c1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcblxuLyoqXG4gKiBFVkVOVF9OQU1FX01BUCBpcyB1c2VkIHRvIGRldGVybWluZSB3aGljaCBldmVudCBmaXJlZCB3aGVuIGFcbiAqIHRyYW5zaXRpb24vYW5pbWF0aW9uIGVuZHMsIGJhc2VkIG9uIHRoZSBzdHlsZSBwcm9wZXJ0eSB1c2VkIHRvXG4gKiBkZWZpbmUgdGhhdCBldmVudC5cbiAqL1xudmFyIEVWRU5UX05BTUVfTUFQID0ge1xuICB0cmFuc2l0aW9uZW5kOiB7XG4gICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgJ01velRyYW5zaXRpb24nOiAnbW96VHJhbnNpdGlvbkVuZCcsXG4gICAgJ09UcmFuc2l0aW9uJzogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAnbXNUcmFuc2l0aW9uJzogJ01TVHJhbnNpdGlvbkVuZCdcbiAgfSxcblxuICBhbmltYXRpb25lbmQ6IHtcbiAgICAnYW5pbWF0aW9uJzogJ2FuaW1hdGlvbmVuZCcsXG4gICAgJ1dlYmtpdEFuaW1hdGlvbic6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICdNb3pBbmltYXRpb24nOiAnbW96QW5pbWF0aW9uRW5kJyxcbiAgICAnT0FuaW1hdGlvbic6ICdvQW5pbWF0aW9uRW5kJyxcbiAgICAnbXNBbmltYXRpb24nOiAnTVNBbmltYXRpb25FbmQnXG4gIH1cbn07XG5cbnZhciBlbmRFdmVudHMgPSBbXTtcblxuZnVuY3Rpb24gZGV0ZWN0RXZlbnRzKCkge1xuICB2YXIgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzdHlsZSA9IHRlc3RFbC5zdHlsZTtcblxuICAvLyBPbiBzb21lIHBsYXRmb3JtcywgaW4gcGFydGljdWxhciBzb21lIHJlbGVhc2VzIG9mIEFuZHJvaWQgNC54LFxuICAvLyB0aGUgdW4tcHJlZml4ZWQgXCJhbmltYXRpb25cIiBhbmQgXCJ0cmFuc2l0aW9uXCIgcHJvcGVydGllcyBhcmUgZGVmaW5lZCBvbiB0aGVcbiAgLy8gc3R5bGUgb2JqZWN0IGJ1dCB0aGUgZXZlbnRzIHRoYXQgZmlyZSB3aWxsIHN0aWxsIGJlIHByZWZpeGVkLCBzbyB3ZSBuZWVkXG4gIC8vIHRvIGNoZWNrIGlmIHRoZSB1bi1wcmVmaXhlZCBldmVudHMgYXJlIHVzZWFibGUsIGFuZCBpZiBub3QgcmVtb3ZlIHRoZW1cbiAgLy8gZnJvbSB0aGUgbWFwXG4gIGlmICghKCdBbmltYXRpb25FdmVudCcgaW4gd2luZG93KSkge1xuICAgIGRlbGV0ZSBFVkVOVF9OQU1FX01BUC5hbmltYXRpb25lbmQuYW5pbWF0aW9uO1xuICB9XG5cbiAgaWYgKCEoJ1RyYW5zaXRpb25FdmVudCcgaW4gd2luZG93KSkge1xuICAgIGRlbGV0ZSBFVkVOVF9OQU1FX01BUC50cmFuc2l0aW9uZW5kLnRyYW5zaXRpb247XG4gIH1cblxuICBmb3IgKHZhciBiYXNlRXZlbnROYW1lIGluIEVWRU5UX05BTUVfTUFQKSB7XG4gICAgdmFyIGJhc2VFdmVudHMgPSBFVkVOVF9OQU1FX01BUFtiYXNlRXZlbnROYW1lXTtcbiAgICBmb3IgKHZhciBzdHlsZU5hbWUgaW4gYmFzZUV2ZW50cykge1xuICAgICAgaWYgKHN0eWxlTmFtZSBpbiBzdHlsZSkge1xuICAgICAgICBlbmRFdmVudHMucHVzaChiYXNlRXZlbnRzW3N0eWxlTmFtZV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICBkZXRlY3RFdmVudHMoKTtcbn1cblxuLy8gV2UgdXNlIHRoZSByYXcge2FkZHxyZW1vdmV9RXZlbnRMaXN0ZW5lcigpIGNhbGwgYmVjYXVzZSBFdmVudExpc3RlbmVyXG4vLyBkb2VzIG5vdCBrbm93IGhvdyB0byByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGFuZCB3ZSByZWFsbHkgc2hvdWxkXG4vLyBjbGVhbiB1cC4gQWxzbywgdGhlc2UgZXZlbnRzIGFyZSBub3QgdHJpZ2dlcmVkIGluIG9sZGVyIGJyb3dzZXJzXG4vLyBzbyB3ZSBzaG91bGQgYmUgQS1PSyBoZXJlLlxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lcikge1xuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnROYW1lLCBldmVudExpc3RlbmVyKSB7XG4gIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbn1cblxudmFyIFJlYWN0VHJhbnNpdGlvbkV2ZW50cyA9IHtcbiAgYWRkRW5kRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKG5vZGUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAoZW5kRXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gSWYgQ1NTIHRyYW5zaXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkLCB0cmlnZ2VyIGFuIFwiZW5kIGFuaW1hdGlvblwiXG4gICAgICAvLyBldmVudCBpbW1lZGlhdGVseS5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGV2ZW50TGlzdGVuZXIsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmRFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZW5kRXZlbnQpIHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kRXZlbnQsIGV2ZW50TGlzdGVuZXIpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbW92ZUVuZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChub2RlLCBldmVudExpc3RlbmVyKSB7XG4gICAgaWYgKGVuZEV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZW5kRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGVuZEV2ZW50KSB7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKG5vZGUsIGVuZEV2ZW50LCBldmVudExpc3RlbmVyKTtcbiAgICB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFRyYW5zaXRpb25FdmVudHM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXhlY3V0aW9uRW52aXJvbm1lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG4vKipcbiAqIFNpbXBsZSwgbGlnaHR3ZWlnaHQgbW9kdWxlIGFzc2lzdGluZyB3aXRoIHRoZSBkZXRlY3Rpb24gYW5kIGNvbnRleHQgb2ZcbiAqIFdvcmtlci4gSGVscHMgYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFuZCBhbGxvd3MgY29kZSB0byByZWFzb24gYWJvdXRcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGluIGEgV29ya2VyLCBldmVuIGlmIHRoZXkgbmV2ZXIgaW5jbHVkZSB0aGUgbWFpblxuICogYFJlYWN0V29ya2VyYCBkZXBlbmRlbmN5LlxuICovXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cbiAgY2FuVXNlRE9NOiBjYW5Vc2VET00sXG5cbiAgY2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cbiAgY2FuVXNlRXZlbnRMaXN0ZW5lcnM6IGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG4gIGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuLFxuXG4gIGlzSW5Xb3JrZXI6ICFjYW5Vc2VET00gLy8gRm9yIG5vdywgdGhpcyBpcyB0cnVlIC0gbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qvfi9mYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjYWxsX3Nob3dfbWV0aG9kKCRub2RlLCBwcm9wcykge1xuICAkbm9kZVtwcm9wcy5zaG93TWV0aG9kXSh7XG4gICAgZHVyYXRpb246IHByb3BzLnNob3dEdXJhdGlvbixcbiAgICBlYXNpbmc6IHByb3BzLnNob3dFYXNpbmdcbiAgfSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGRpc3BsYXk6IFwibm9uZVwiIH0sXG4gICAgICAvLyBlZmZlY3RpdmUgJC5oaWRlKClcbiAgICAgIHNob3dNZXRob2Q6IFwiZmFkZUluXCIsIC8vIHNsaWRlRG93biwgYW5kIHNob3cgYXJlIGJ1aWx0IGludG8galF1ZXJ5XG4gICAgICBzaG93RHVyYXRpb246IDMwMCxcbiAgICAgIHNob3dFYXNpbmc6IFwic3dpbmdcIiwgLy8gYW5kIGxpbmVhciBhcmUgYnVpbHQgaW50byBqUXVlcnlcbiAgICAgIGhpZGVNZXRob2Q6IFwiZmFkZU91dFwiLFxuICAgICAgaGlkZUR1cmF0aW9uOiAxMDAwLFxuICAgICAgaGlkZUVhc2luZzogXCJzd2luZ1wiLFxuICAgICAgLy9cbiAgICAgIHRpbWVPdXQ6IDUwMDAsXG4gICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDBcbiAgICB9O1xuICB9LFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWxJZDogbnVsbCxcbiAgICAgIGlzSGlkaW5nOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjYWxsX3Nob3dfbWV0aG9kKHRoaXMuX2dldF8kX25vZGUoKSwgdGhpcy5wcm9wcyk7XG4gICAgaWYgKHRoaXMucHJvcHMudGltZU91dCA+IDApIHtcbiAgICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChzZXRUaW1lb3V0KHRoaXMuaGlkZVRvYXN0LCB0aGlzLnByb3BzLnRpbWVPdXQpKTtcbiAgICB9XG4gIH0sXG4gIGhhbmRsZU1vdXNlRW50ZXI6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc3RhdGUuaW50ZXJ2YWxJZCk7XG4gICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKG51bGwpO1xuICAgIHRoaXMuX3NldF9pc19oaWRpbmcoZmFsc2UpO1xuXG4gICAgY2FsbF9zaG93X21ldGhvZCh0aGlzLl9nZXRfJF9ub2RlKCkuc3RvcCh0cnVlLCB0cnVlKSwgdGhpcy5wcm9wcyk7XG4gIH0sXG4gIGhhbmRsZU1vdXNlTGVhdmU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzSGlkaW5nICYmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwIHx8IHRoaXMucHJvcHMuZXh0ZW5kZWRUaW1lT3V0ID4gMCkpIHtcbiAgICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChzZXRUaW1lb3V0KHRoaXMuaGlkZVRvYXN0LCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgaGlkZVRvYXN0OiBmdW5jdGlvbiBoaWRlVG9hc3Qob3ZlcnJpZGUpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0hpZGluZyB8fCB0aGlzLnN0YXRlLmludGVydmFsSWQgPT09IG51bGwgJiYgIW92ZXJyaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc0hpZGluZzogdHJ1ZSB9KTtcblxuICAgIHRoaXMuX2dldF8kX25vZGUoKVt0aGlzLnByb3BzLmhpZGVNZXRob2RdKHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLnByb3BzLmhpZGVEdXJhdGlvbixcbiAgICAgIGVhc2luZzogdGhpcy5wcm9wcy5oaWRlRWFzaW5nLFxuICAgICAgY29tcGxldGU6IHRoaXMuX2hhbmRsZV9yZW1vdmVcbiAgICB9KTtcbiAgfSxcbiAgX2dldF8kX25vZGU6IGZ1bmN0aW9uIF9nZXRfJF9ub2RlKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gICAgcmV0dXJuIGpRdWVyeShfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcykpO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cbiAgfSxcbiAgX3NldF9pbnRlcnZhbF9pZDogZnVuY3Rpb24gX3NldF9pbnRlcnZhbF9pZChpbnRlcnZhbElkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnRlcnZhbElkOiBpbnRlcnZhbElkXG4gICAgfSk7XG4gIH0sXG4gIF9zZXRfaXNfaGlkaW5nOiBmdW5jdGlvbiBfc2V0X2lzX2hpZGluZyhpc0hpZGluZykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNIaWRpbmc6IGlzSGlkaW5nXG4gICAgfSk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvalF1ZXJ5TWl4aW4uanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VCdXR0b24gZnJvbSAnLi9QYWdlQnV0dG9uLmpzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIFBhZ2luYXRpb25MaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjaGFuZ2VQYWdlID0gcGFnZSA9PiB7XG4gICAgY29uc3QgeyBwcmVQYWdlLCBjdXJyUGFnZSwgbmV4dFBhZ2UsIGxhc3RQYWdlLCBmaXJzdFBhZ2UsIHNpemVQZXJQYWdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChwYWdlID09PSBwcmVQYWdlKSB7XG4gICAgICBwYWdlID0gY3VyclBhZ2UgLSAxIDwgMSA/IDEgOiBjdXJyUGFnZSAtIDE7XG4gICAgfSBlbHNlIGlmIChwYWdlID09PSBuZXh0UGFnZSkge1xuICAgICAgcGFnZSA9IGN1cnJQYWdlICsgMSA+IHRoaXMudG90YWxQYWdlcyA/IHRoaXMudG90YWxQYWdlcyA6IGN1cnJQYWdlICsgMTtcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IGxhc3RQYWdlKSB7XG4gICAgICBwYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gZmlyc3RQYWdlKSB7XG4gICAgICBwYWdlID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnZSA9IHBhcnNlSW50KHBhZ2UsIDEwKTtcbiAgICB9XG5cbiAgICBpZiAocGFnZSAhPT0gY3VyclBhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMuY2hhbmdlUGFnZShwYWdlLCBzaXplUGVyUGFnZSk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU2l6ZVBlclBhZ2UgPSBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBzZWxlY3RTaXplID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LnRleHQsIDEwKTtcbiAgICBsZXQgeyBjdXJyUGFnZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0U2l6ZSAhPT0gdGhpcy5wcm9wcy5zaXplUGVyUGFnZSkge1xuICAgICAgdGhpcy50b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMucHJvcHMuZGF0YVNpemUgLyBzZWxlY3RTaXplKTtcbiAgICAgIGlmIChjdXJyUGFnZSA+IHRoaXMudG90YWxQYWdlcykgY3VyclBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG5cbiAgICAgIHRoaXMucHJvcHMuY2hhbmdlUGFnZShjdXJyUGFnZSwgc2VsZWN0U2l6ZSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNpemVQZXJQYWdlTGlzdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2l6ZVBlclBhZ2VMaXN0KHNlbGVjdFNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRhdGFTaXplLCBzaXplUGVyUGFnZSwgc2l6ZVBlclBhZ2VMaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IE1hdGguY2VpbChkYXRhU2l6ZSAvIHNpemVQZXJQYWdlKTtcbiAgICBjb25zdCBwYWdlQnRucyA9IHRoaXMubWFrZVBhZ2UoKTtcbiAgICBjb25zdCBwYWdlTGlzdFN0eWxlID0ge1xuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICAvLyBvdmVycmlkZSB0aGUgbWFyZ2luLXRvcCBkZWZpbmVkIGluIC5wYWdpbmF0aW9uIGNsYXNzIGluIGJvb3RzdHJhcC5cbiAgICAgIG1hcmdpblRvcDogJzBweCdcbiAgICB9O1xuXG4gICAgY29uc3Qgc2l6ZVBlclBhZ2VPcHRpb25zID0gc2l6ZVBlclBhZ2VMaXN0Lm1hcCgoX3NpemVQZXJQYWdlKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGkga2V5PXsgX3NpemVQZXJQYWdlIH0gcm9sZT0ncHJlc2VudGF0aW9uJz5cbiAgICAgICAgICA8YSByb2xlPSdtZW51aXRlbSdcbiAgICAgICAgICAgIHRhYkluZGV4PSctMScgaHJlZj0nIydcbiAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmNoYW5nZVNpemVQZXJQYWdlIH0+eyBfc2l6ZVBlclBhZ2UgfTwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdycgc3R5bGU9eyB7IG1hcmdpblRvcDogMTUgfSB9PlxuICAgICAgICB7XG4gICAgICAgICAgc2l6ZVBlclBhZ2VMaXN0Lmxlbmd0aCA+IDFcbiAgICAgICAgICA/IDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNic+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Ryb3Bkb3duJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nIGlkPSdwYWdlRHJvcERvd24nIGRhdGEtdG9nZ2xlPSdkcm9wZG93bidcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD0ndHJ1ZSc+XG4gICAgICAgICAgICAgICAgICAgIHsgc2l6ZVBlclBhZ2UgfVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7ICcgJyB9XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdjYXJldCcvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J2Ryb3Bkb3duLW1lbnUnIHJvbGU9J21lbnUnIGFyaWEtbGFiZWxsZWRieT0ncGFnZURyb3BEb3duJz5cbiAgICAgICAgICAgICAgICAgICAgeyBzaXplUGVyUGFnZU9wdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNic+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0ncGFnaW5hdGlvbicgc3R5bGU9eyBwYWdlTGlzdFN0eWxlIH0+XG4gICAgICAgICAgICAgICAgICB7IHBhZ2VCdG5zIH1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDogPGRpdiBjbGFzc05hbWU9J2NvbC1tZC0xMic+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J3BhZ2luYXRpb24nIHN0eWxlPXsgcGFnZUxpc3RTdHlsZSB9PlxuICAgICAgICAgICAgICAgIHsgcGFnZUJ0bnMgfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBtYWtlUGFnZSgpIHtcbiAgICBjb25zdCBwYWdlcyA9IHRoaXMuZ2V0UGFnZXMoKTtcbiAgICByZXR1cm4gcGFnZXMubWFwKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gdGhpcy5wcm9wcy5jdXJyUGFnZTtcbiAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgbGV0IGhpZGRlbiA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMucHJvcHMuY3VyclBhZ2UgPT09IDEgJiZcbiAgICAgICAgKHBhZ2UgPT09IHRoaXMucHJvcHMuZmlyc3RQYWdlIHx8IHBhZ2UgPT09IHRoaXMucHJvcHMucHJlUGFnZSkpIHtcbiAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBoaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuY3VyclBhZ2UgPT09IHRoaXMudG90YWxQYWdlcyAmJlxuICAgICAgICAocGFnZSA9PT0gdGhpcy5wcm9wcy5uZXh0UGFnZSB8fCBwYWdlID09PSB0aGlzLnByb3BzLmxhc3RQYWdlKSkge1xuICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UGFnZUJ1dHRvbiBrZXk9eyBwYWdlIH1cbiAgICAgICAgICBjaGFuZ2VQYWdlPXsgdGhpcy5jaGFuZ2VQYWdlIH1cbiAgICAgICAgICBhY3RpdmU9eyBpc0FjdGl2ZSB9XG4gICAgICAgICAgZGlzYWJsZT17IGRpc2FibGVkIH1cbiAgICAgICAgICBoaWRkZW49eyBoaWRkZW4gfT5cbiAgICAgICAgICB7IHBhZ2UgfVxuICAgICAgICA8L1BhZ2VCdXR0b24+XG4gICAgICApO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgZ2V0UGFnZXMoKSB7XG4gICAgbGV0IHBhZ2VzO1xuICAgIGxldCBzdGFydFBhZ2UgPSAxO1xuICAgIGxldCBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuXG4gICAgc3RhcnRQYWdlID0gTWF0aC5tYXgodGhpcy5wcm9wcy5jdXJyUGFnZSAtIE1hdGguZmxvb3IodGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSAvIDIpLCAxKTtcbiAgICBlbmRQYWdlID0gc3RhcnRQYWdlICsgdGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSAtIDE7XG5cbiAgICBpZiAoZW5kUGFnZSA+IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgZW5kUGFnZSA9IHRoaXMudG90YWxQYWdlcztcbiAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplICsgMTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRQYWdlICE9PSAxICYmIHRoaXMudG90YWxQYWdlcyA+IHRoaXMucHJvcHMucGFnaW5hdGlvblNpemUpIHtcbiAgICAgIHBhZ2VzID0gWyB0aGlzLnByb3BzLmZpcnN0UGFnZSwgdGhpcy5wcm9wcy5wcmVQYWdlIF07XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsUGFnZXMgPiAxKSB7XG4gICAgICBwYWdlcyA9IFsgdGhpcy5wcm9wcy5wcmVQYWdlIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2VzID0gW107XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgIGlmIChpID4gMCkgcGFnZXMucHVzaChpKTtcbiAgICB9XG5cbiAgICBpZiAoZW5kUGFnZSAhPT0gdGhpcy50b3RhbFBhZ2VzKSB7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubmV4dFBhZ2UpO1xuICAgICAgcGFnZXMucHVzaCh0aGlzLnByb3BzLmxhc3RQYWdlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxQYWdlcyA+IDEpIHtcbiAgICAgIHBhZ2VzLnB1c2godGhpcy5wcm9wcy5uZXh0UGFnZSk7XG4gICAgfVxuICAgIHJldHVybiBwYWdlcztcbiAgfVxufVxuUGFnaW5hdGlvbkxpc3QucHJvcFR5cGVzID0ge1xuICBjdXJyUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2l6ZVBlclBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gIGRhdGFTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICBjaGFuZ2VQYWdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2l6ZVBlclBhZ2VMaXN0OiBQcm9wVHlwZXMuYXJyYXksXG4gIHBhZ2luYXRpb25TaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICByZW1vdGU6IFByb3BUeXBlcy5ib29sLFxuICBvblNpemVQZXJQYWdlTGlzdDogUHJvcFR5cGVzLmZ1bmMsXG4gIHByZVBhZ2U6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cblBhZ2luYXRpb25MaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgc2l6ZVBlclBhZ2U6IENvbnN0LlNJWkVfUEVSX1BBR0Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25MaXN0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgUGFnZUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBwYWdlQnRuQ2xpY2sgPSBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5jaGFuZ2VQYWdlKGUuY3VycmVudFRhcmdldC50ZXh0Q29udGVudCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzU2V0KHtcbiAgICAgICdhY3RpdmUnOiB0aGlzLnByb3BzLmFjdGl2ZSxcbiAgICAgICdkaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZSxcbiAgICAgICdoaWRkZW4nOiB0aGlzLnByb3BzLmhpZGRlblxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXsgY2xhc3NlcyB9PlxuICAgICAgICA8YSBocmVmPScjJyBvbkNsaWNrPXsgdGhpcy5wYWdlQnRuQ2xpY2sgfT57IHRoaXMucHJvcHMuY2hpbGRyZW4gfTwvYT5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuUGFnZUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIGNoYW5nZVBhZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgaGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYWdlQnV0dG9uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcbmltcG9ydCBlZGl0b3IgZnJvbSAnLi4vRWRpdG9yJztcbmltcG9ydCBOb3RpZmllciBmcm9tICcuLi9Ob3RpZmljYXRpb24uanMnO1xuXG5jbGFzcyBUb29sQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRpbWVvdXRlQ2xlYXIgPSAwO1xuICAgIHRoaXMubW9kYWxDbGFzc05hbWU7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzSW5zZXJ0Um93VHJpZ2dlcjogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlU3RhdGU6IG51bGwsXG4gICAgICBzaGFrZUVkaXRvcjogZmFsc2UsXG4gICAgICBzaG93U2VsZWN0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIH1cblxuICBjbGVhclRpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dGVDbGVhcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dGVDbGVhcik7XG4gICAgICB0aGlzLnRpbWVvdXRlQ2xlYXIgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrQW5kUGFyc2VGb3JtKCkge1xuICAgIGNvbnN0IG5ld09iaiA9IHt9O1xuICAgIGNvbnN0IHZhbGlkYXRlU3RhdGUgPSB7fTtcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgbGV0IHRlbXBWYWx1ZTtcbiAgICBsZXQgdGVtcE1zZztcblxuICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbiwgaSkge1xuICAgICAgaWYgKGNvbHVtbi5hdXRvVmFsdWUpIHtcbiAgICAgICAgLy8gd2hlbiB5b3Ugd2FudCBzYW1lIGF1dG8gZ2VuZXJhdGUgdmFsdWUgYW5kIG5vdCBhbGxvdyBlZGl0LCBleGFtcGxlIElEIGZpZWxkXG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGVtcFZhbHVlID0gdHlwZW9mIGNvbHVtbi5hdXRvVmFsdWUgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgIGNvbHVtbi5hdXRvVmFsdWUoKSA6XG4gICAgICAgICAgKGBhdXRvdmFsdWUtJHt0aW1lfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZG9tID0gdGhpcy5yZWZzW2NvbHVtbi5maWVsZCArIGldO1xuICAgICAgICB0ZW1wVmFsdWUgPSBkb20udmFsdWU7XG5cbiAgICAgICAgaWYgKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdGFibGUudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHRlbXBWYWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICAgIHRlbXBWYWx1ZSA9IGRvbS5jaGVja2VkID8gdmFsdWVzWzBdIDogdmFsdWVzWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdGFibGUudmFsaWRhdG9yKSB7IC8vIHByb2Nlc3MgdmFsaWRhdGVcbiAgICAgICAgICB0ZW1wTXNnID0gY29sdW1uLmVkaXRhYmxlLnZhbGlkYXRvcih0ZW1wVmFsdWUpO1xuICAgICAgICAgIGlmICh0ZW1wTXNnICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0ZVN0YXRlW2NvbHVtbi5maWVsZF0gPSB0ZW1wTXNnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXdPYmpbY29sdW1uLmZpZWxkXSA9IHRlbXBWYWx1ZTtcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gbmV3T2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICAgICAgLy8gc2hvdyBlcnJvciBpbiBmb3JtIGFuZCBzaGFrZSBpdFxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRlU3RhdGUsIHNoYWtlRWRpdG9yOiB0cnVlIH0pO1xuICAgICAgLy8gbm90aWZpZXIgZXJyb3JcbiAgICAgIHRoaXMucmVmcy5ub3RpZmllci5ub3RpY2UoXG4gICAgICAgICdlcnJvcicsXG4gICAgICAgICdGb3JtIHZhbGlkYXRlIGVycm9ycywgcGxlYXNlIGNoZWNraW5nIScsXG4gICAgICAgICdQcmVzc2VkIEVTQyBjYW4gY2FuY2VsJyk7XG4gICAgICAvLyBjbGVhciBhbmltYXRlIGNsYXNzXG4gICAgICB0aGlzLnRpbWVvdXRlQ2xlYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNoYWtlRWRpdG9yOiBmYWxzZSB9KTtcbiAgICAgIH0sIDMwMCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTYXZlQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3T2JqID0gdGhpcy5jaGVja0FuZFBhcnNlRm9ybSgpO1xuICAgIGlmICghbmV3T2JqKSB7IC8vIHZhbGlkYXRlIGVycm9yc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtc2cgPSB0aGlzLnByb3BzLm9uQWRkUm93KG5ld09iaik7XG4gICAgaWYgKG1zZykge1xuICAgICAgdGhpcy5yZWZzLm5vdGlmaWVyLm5vdGljZSgnZXJyb3InLCBtc2csICdQcmVzc2VkIEVTQyBjYW4gY2FuY2VsJyk7XG4gICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICAgICAgLy8gc2hha2UgZm9ybSBhbmQgaGFjayBwcmV2ZW50IG1vZGFsIGhpZGVcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFrZUVkaXRvcjogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGVTdGF0ZTogJ3RoaXMgaXMgaGFjayBmb3IgcHJldmVudCBib290c3RyYXAgbW9kYWwgaGlkZSdcbiAgICAgIH0pO1xuICAgICAgLy8gY2xlYXIgYW5pbWF0ZSBjbGFzc1xuICAgICAgdGhpcy50aW1lb3V0ZUNsZWFyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaGFrZUVkaXRvcjogZmFsc2UgfSk7XG4gICAgICB9LCAzMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZXNldCBzdGF0ZSBhbmQgaGlkZSBtb2RhbCBoaWRlXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsaWRhdGVTdGF0ZTogbnVsbCxcbiAgICAgICAgc2hha2VFZGl0b3I6IGZhbHNlXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1iYWNrZHJvcCcpLmNsaWNrKCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5tb2RhbENsYXNzTmFtZSkuY2xpY2soKTtcbiAgICAgIH0pO1xuICAgICAgLy8gcmVzZXQgZm9ybVxuICAgICAgdGhpcy5yZWZzLmZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTaG93T25seVRvZ2dsZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dTZWxlY3RlZDogIXRoaXMuc3RhdGUuc2hvd1NlbGVjdGVkXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vblNob3dPbmx5U2VsZWN0ZWQoKTtcbiAgfVxuXG4gIGhhbmRsZURyb3BSb3dCdG5DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uRHJvcFJvdygpO1xuICB9XG5cbiAgaGFuZGxlQ2xvc2VCdG4oKSB7XG4gICAgdGhpcy5yZWZzLndhcm5pbmcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG4gIGhhbmRsZUtleVVwID0gZSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlYXJjaChlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlRXhwb3J0Q1NWID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25FeHBvcnRDU1YoKTtcbiAgfVxuXG4gIGhhbmRsZUNsZWFyQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5yZWZzLnNlYWNoSW5wdXQudmFsdWUgPSAnJztcbiAgICB0aGlzLnByb3BzLm9uU2VhcmNoKCcnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLm1vZGFsQ2xhc3NOYW1lID0gJ2JzLXRhYmxlLW1vZGFsLXNtJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGxldCBpbnNlcnRCdG4gPSBudWxsO1xuICAgIGxldCBkZWxldGVCdG4gPSBudWxsO1xuICAgIGxldCBleHBvcnRDU1YgPSBudWxsO1xuICAgIGxldCBzaG93U2VsZWN0ZWRPbmx5QnRuID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUluc2VydCkge1xuICAgICAgaW5zZXJ0QnRuID0gKFxuICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICBjbGFzc05hbWU9J2J0biBidG4taW5mbyByZWFjdC1icy10YWJsZS1hZGQtYnRuJ1xuICAgICAgICAgIGRhdGEtdG9nZ2xlPSdtb2RhbCdcbiAgICAgICAgICBkYXRhLXRhcmdldD17ICcuJyArIHRoaXMubW9kYWxDbGFzc05hbWUgfT5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tcGx1cyc+PC9pPiBOZXdcbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZURlbGV0ZSkge1xuICAgICAgZGVsZXRlQnRuID0gKFxuICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICBjbGFzc05hbWU9J2J0biBidG4td2FybmluZyByZWFjdC1icy10YWJsZS1kZWwtYnRuJ1xuICAgICAgICAgIGRhdGEtdG9nZ2xlPSd0b29sdGlwJ1xuICAgICAgICAgIGRhdGEtcGxhY2VtZW50PSdyaWdodCdcbiAgICAgICAgICB0aXRsZT0nRHJvcCBzZWxlY3RlZCByb3cnXG4gICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlRHJvcFJvd0J0bkNsaWNrIH0+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPSdnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoJz48L2k+IERlbGV0ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlU2hvd09ubHlTZWxlY3RlZCkge1xuICAgICAgc2hvd1NlbGVjdGVkT25seUJ0biA9IChcbiAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nXG4gICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlU2hvd09ubHlUb2dnbGUgfVxuICAgICAgICAgIGNsYXNzTmFtZT0nYnRuIGJ0bi1wcmltYXJ5J1xuICAgICAgICAgIGRhdGEtdG9nZ2xlPSdidXR0b24nXG4gICAgICAgICAgYXJpYS1wcmVzc2VkPSdmYWxzZSc+XG4gICAgICAgICAgeyB0aGlzLnN0YXRlLnNob3dTZWxlY3RlZCA/IENvbnN0LlNIT1dfQUxMIDogQ29uc3QuU0hPV19PTkxZX1NFTEVDVCB9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVFeHBvcnRDU1YpIHtcbiAgICAgIGV4cG9ydENTViA9IChcbiAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nXG4gICAgICAgICAgY2xhc3NOYW1lPSdidG4gYnRuLXN1Y2Nlc3MnXG4gICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlRXhwb3J0Q1NWIH0+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tZXhwb3J0Jz48L2k+IEV4cG9ydCB0byBDU1ZcbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaFRleHRJbnB1dCA9IHRoaXMucmVuZGVyU2VhcmNoUGFuZWwoKTtcbiAgICBjb25zdCBtb2RhbCA9IHRoaXMucHJvcHMuZW5hYmxlSW5zZXJ0ID8gdGhpcy5yZW5kZXJJbnNlcnRSb3dNb2RhbCgpIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNiBjb2wtbGctOCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCBidG4tZ3JvdXAtc20nIHJvbGU9J2dyb3VwJz5cbiAgICAgICAgICAgIHsgZXhwb3J0Q1NWIH1cbiAgICAgICAgICAgIHsgaW5zZXJ0QnRuIH1cbiAgICAgICAgICAgIHsgZGVsZXRlQnRuIH1cbiAgICAgICAgICAgIHsgc2hvd1NlbGVjdGVkT25seUJ0biB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC02IGNvbC1sZy00Jz5cbiAgICAgICAgICB7IHNlYXJjaFRleHRJbnB1dCB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Tm90aWZpZXIgcmVmPSdub3RpZmllcicgLz5cbiAgICAgICAgeyBtb2RhbCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyU2VhcmNoUGFuZWwoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlU2VhcmNoKSB7XG4gICAgICBsZXQgY2xhc3NOYW1lcyA9ICdmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtc20gcmVhY3QtYnMtdGFibGUtc2VhcmNoLWZvcm0nO1xuICAgICAgbGV0IGNsZWFyQnRuID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLnByb3BzLmNsZWFyU2VhcmNoKSB7XG4gICAgICAgIGNsZWFyQnRuID0gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5wdXQtZ3JvdXAtYnRuJz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQnXG4gICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlQ2xlYXJCdG5DbGljayB9PlxuICAgICAgICAgICAgICBDbGVhclxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgICAgICBjbGFzc05hbWVzICs9ICcgaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtc20nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IGNsYXNzTmFtZXMgfT5cbiAgICAgICAgICA8aW5wdXQgcmVmPSdzZWFjaElucHV0J1xuICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnXG4gICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI9eyB0aGlzLnByb3BzLnNlYXJjaFBsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5zZWFyY2hQbGFjZWhvbGRlciA6ICdTZWFyY2gnIH1cbiAgICAgICAgICAgIG9uS2V5VXA9eyB0aGlzLmhhbmRsZUtleVVwIH0vPlxuICAgICAgICAgICAgeyBjbGVhckJ0biB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVySW5zZXJ0Um93TW9kYWwoKSB7XG4gICAgY29uc3QgdmFsaWRhdGVTdGF0ZSA9IHRoaXMuc3RhdGUudmFsaWRhdGVTdGF0ZSB8fCB7fTtcbiAgICBjb25zdCBzaGFrZUVkaXRvciA9IHRoaXMuc3RhdGUuc2hha2VFZGl0b3I7XG4gICAgY29uc3QgaW5wdXRGaWVsZCA9IHRoaXMucHJvcHMuY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uLCBpKSB7XG4gICAgICBjb25zdCB7IGVkaXRhYmxlLCBmb3JtYXQsIGZpZWxkLCBuYW1lLCBhdXRvVmFsdWUgfSA9IGNvbHVtbjtcbiAgICAgIGNvbnN0IGF0dHIgPSB7XG4gICAgICAgIHJlZjogZmllbGQgKyBpLFxuICAgICAgICBwbGFjZWhvbGRlcjogZWRpdGFibGUucGxhY2Vob2xkZXIgPyBlZGl0YWJsZS5wbGFjZWhvbGRlciA6IG5hbWVcbiAgICAgIH07XG5cbiAgICAgIGlmIChhdXRvVmFsdWUpIHtcbiAgICAgICAgLy8gd2hlbiB5b3Ugd2FudCBzYW1lIGF1dG8gZ2VuZXJhdGUgdmFsdWVcbiAgICAgICAgLy8gYW5kIG5vdCBhbGxvdyBlZGl0LCBmb3IgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdGVTdGF0ZVtmaWVsZF0gP1xuICAgICAgICAoPHNwYW4gY2xhc3NOYW1lPSdoZWxwLWJsb2NrIGJnLWRhbmdlcic+eyB2YWxpZGF0ZVN0YXRlW2ZpZWxkXSB9PC9zcGFuPikgOlxuICAgICAgICBudWxsO1xuXG4gICAgICAvLyBsZXQgZWRpdG9yID0gRWRpdG9yKGVkaXRhYmxlLGF0dHIsZm9ybWF0KTtcbiAgICAgIC8vIGlmKGVkaXRvci5wcm9wcy50eXBlICYmIGVkaXRvci5wcm9wcy50eXBlID09ICdjaGVja2JveCcpe1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnIGtleT17IGZpZWxkIH0+XG4gICAgICAgICAgPGxhYmVsPnsgbmFtZSB9PC9sYWJlbD5cbiAgICAgICAgICB7IGVkaXRvcihlZGl0YWJsZSwgYXR0ciwgZm9ybWF0LCAnJykgfVxuICAgICAgICAgIHsgZXJyb3IgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgbW9kYWxDbGFzcyA9IGNsYXNzU2V0KCdtb2RhbCcsICdmYWRlJywgdGhpcy5tb2RhbENsYXNzTmFtZSwge1xuICAgICAgLy8gaGFjayBwcmV2ZW50IGJvb3RzdHJhcCBtb2RhbCBoaWRlIGJ5IHJlUmVuZGVyXG4gICAgICAnaW4nOiBzaGFrZUVkaXRvciB8fCB0aGlzLnN0YXRlLnZhbGlkYXRlU3RhdGVcbiAgICB9KTtcbiAgICBjb25zdCBkaWFsb2dDbGFzcyA9IGNsYXNzU2V0KCdtb2RhbC1kaWFsb2cnLCAnbW9kYWwtc20nLCB7XG4gICAgICAnYW5pbWF0ZWQnOiBzaGFrZUVkaXRvcixcbiAgICAgICdzaGFrZSc6IHNoYWtlRWRpdG9yXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPSdtb2RhbCcgY2xhc3NOYW1lPXsgbW9kYWxDbGFzcyB9IHRhYkluZGV4PSctMScgcm9sZT0nZGlhbG9nJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBkaWFsb2dDbGFzcyB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1jb250ZW50Jz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb2RhbC1oZWFkZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Nsb3NlJ1xuICAgICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz0nbW9kYWwnXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD0nQ2xvc2UnPlxuICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPSd0cnVlJz4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT0nbW9kYWwtdGl0bGUnPk5ldyBSZWNvcmQ8L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbW9kYWwtYm9keSc+XG4gICAgICAgICAgICAgIDxmb3JtIHJlZj0nZm9ybSc+XG4gICAgICAgICAgICAgIHsgaW5wdXRGaWVsZCB9XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21vZGFsLWZvb3Rlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0J1xuICAgICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz0nbW9kYWwnPlxuICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2J0biBidG4taW5mbydcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVTYXZlQnRuQ2xpY2sgfT5cbiAgICAgICAgICAgICAgICBTYXZlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub29sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGRSb3c6IFByb3BUeXBlcy5mdW5jLFxuICBvbkRyb3BSb3c6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3dPbmx5U2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICBlbmFibGVJbnNlcnQ6IFByb3BUeXBlcy5ib29sLFxuICBlbmFibGVEZWxldGU6IFByb3BUeXBlcy5ib29sLFxuICBlbmFibGVTZWFyY2g6IFByb3BUeXBlcy5ib29sLFxuICBlbmFibGVTaG93T25seVNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LFxuICBzZWFyY2hQbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2xlYXJTZWFyY2g6IFByb3BUeXBlcy5ib29sXG59O1xuXG5Ub29sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZW5hYmxlSW5zZXJ0OiBmYWxzZSxcbiAgZW5hYmxlRGVsZXRlOiBmYWxzZSxcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcbiAgZW5hYmxlU2hvd09ubHlTZWxlY3RlZDogZmFsc2UsXG4gIGNsZWFyU2VhcmNoOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbEJhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3Rvb2xiYXIvVG9vbEJhci5qc1xuICoqLyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVGFibGVGaWx0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZmlsdGVyT2JqID0ge307XG4gIH1cblxuICBoYW5kbGVLZXlVcCA9IGUgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUsIG5hbWUgfSA9IGUuY3VycmVudFRhcmdldDtcbiAgICBpZiAodmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgZGVsZXRlIHRoaXMuZmlsdGVyT2JqW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlck9ialtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uRmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHN0cmlwZWQsIGNvbmRlbnNlZCwgcm93U2VsZWN0VHlwZSwgY29sdW1ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldCgndGFibGUnLCB7XG4gICAgICAndGFibGUtc3RyaXBlZCc6IHN0cmlwZWQsXG4gICAgICAndGFibGUtY29uZGVuc2VkJzogY29uZGVuc2VkXG4gICAgfSk7XG4gICAgbGV0IHNlbGVjdFJvd0hlYWRlciA9IG51bGw7XG5cbiAgICBpZiAocm93U2VsZWN0VHlwZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgcm93U2VsZWN0VHlwZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9NVUxUSSkge1xuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiAzNSxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IDAsXG4gICAgICAgIHBhZGRpbmdSaWdodDogMFxuICAgICAgfTtcbiAgICAgIHNlbGVjdFJvd0hlYWRlciA9ICg8dGggc3R5bGU9eyBzdHlsZSB9IGtleT17IC0xIH0+RmlsdGVyPC90aD4pO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbHRlckZpZWxkID0gY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgICBjb25zdCB7IGhpZGRlbiwgd2lkdGgsIG5hbWUgfSA9IGNvbHVtbjtcbiAgICAgIGNvbnN0IHRoU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6IGhpZGRlbiA/ICdub25lJyA6IG51bGwsXG4gICAgICAgIHdpZHRoXG4gICAgICB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHRoIGtleT17IG5hbWUgfSBzdHlsZT17IHRoU3R5bGUgfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGgtaW5uZXIgdGFibGUtaGVhZGVyLWNvbHVtbic+XG4gICAgICAgICAgICA8aW5wdXQgc2l6ZT0nMTAnIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsgbmFtZSB9IG5hbWU9eyBuYW1lIH0gb25LZXlVcD17IHRoaXMuaGFuZGxlS2V5VXAgfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGg+XG4gICAgICApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9eyB0YWJsZUNsYXNzZXMgfSBzdHlsZT17IHsgbWFyZ2luVG9wOiA1IH0gfT5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0ciBzdHlsZT17IHsgYm9yZGVyQm90dG9tU3R5bGU6ICdoaWRkZW4nIH0gfT5cbiAgICAgICAgICAgIHsgc2VsZWN0Um93SGVhZGVyIH17IGZpbHRlckZpZWxkIH1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9XG59XG5UYWJsZUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgcm93U2VsZWN0VHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25GaWx0ZXI6IFByb3BUeXBlcy5mdW5jXG59O1xuZXhwb3J0IGRlZmF1bHQgVGFibGVGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUZpbHRlci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1uZXN0ZWQtdGVybmFyeTogMCAqL1xuLyogZXNsaW50IGd1YXJkLWZvci1pbjogMCAqL1xuLyogZXNsaW50IG5vLWNvbnNvbGU6IDAgKi9cbi8qIGVzbGludCBlcWVxZXE6IDAgKi9cbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbmZ1bmN0aW9uIF9zb3J0KGFyciwgc29ydEZpZWxkLCBvcmRlciwgc29ydEZ1bmMpIHtcbiAgb3JkZXIgPSBvcmRlci50b0xvd2VyQ2FzZSgpO1xuICBhcnIuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChzb3J0RnVuYykge1xuICAgICAgcmV0dXJuIHNvcnRGdW5jKGEsIGIsIG9yZGVyLCBzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3JkZXIgPT09IENvbnN0LlNPUlRfREVTQykge1xuICAgICAgICByZXR1cm4gYVtzb3J0RmllbGRdID4gYltzb3J0RmllbGRdID8gLTEgOiAoKGFbc29ydEZpZWxkXSA8IGJbc29ydEZpZWxkXSkgPyAxIDogMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYVtzb3J0RmllbGRdIDwgYltzb3J0RmllbGRdID8gLTEgOiAoKGFbc29ydEZpZWxkXSA+IGJbc29ydEZpZWxkXSkgPyAxIDogMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgY2xhc3MgVGFibGVEYXRhU2V0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGRhdGEpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVEYXRhU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMuY29sSW5mb3MgPSBudWxsO1xuICAgIHRoaXMuZmlsdGVyZWREYXRhID0gbnVsbDtcbiAgICB0aGlzLmlzT25GaWx0ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmZpbHRlck9iaiA9IG51bGw7XG4gICAgdGhpcy5zZWFyY2hUZXh0ID0gbnVsbDtcbiAgICB0aGlzLnNvcnRPYmogPSBudWxsO1xuICAgIHRoaXMucGFnZU9iaiA9IHt9O1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICB0aGlzLm11bHRpQ29sdW1uU2VhcmNoID0gZmFsc2U7XG4gICAgdGhpcy5zaG93T25seVNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZW1vdGUgPSBmYWxzZTsgLy8gcmVtb3RlIGRhdGFcbiAgfVxuXG4gIHNldFByb3BzKHByb3BzKSB7XG4gICAgdGhpcy5rZXlGaWVsZCA9IHByb3BzLmtleUZpZWxkO1xuICAgIHRoaXMuZW5hYmxlUGFnaW5hdGlvbiA9IHByb3BzLmlzUGFnaW5hdGlvbjtcbiAgICB0aGlzLmNvbEluZm9zID0gcHJvcHMuY29sSW5mb3M7XG4gICAgdGhpcy5yZW1vdGUgPSBwcm9wcy5yZW1vdGU7XG4gICAgdGhpcy5tdWx0aUNvbHVtblNlYXJjaCA9IHByb3BzLm11bHRpQ29sdW1uU2VhcmNoO1xuICB9XG5cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICBpZiAodGhpcy5maWx0ZXJPYmogIT09IG51bGwpIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgICAgIGlmICh0aGlzLnNlYXJjaFRleHQgIT09IG51bGwpIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnRPYmopIHtcbiAgICAgIHRoaXMuc29ydCh0aGlzLnNvcnRPYmoub3JkZXIsIHRoaXMuc29ydE9iai5zb3J0RmllbGQpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNvcnRJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLnNvcnRPYmo7XG4gIH1cblxuICBzZXRTZWxlY3RlZFJvd0tleShzZWxlY3RlZFJvd0tleXMpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWRSb3dLZXlzO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRSb3dLZXlzKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgZ2V0Q3VycmVudERpc3BsYXlEYXRhKCkge1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHJldHVybiB0aGlzLmZpbHRlcmVkRGF0YTtcbiAgICBlbHNlIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cblxuICBpZ25vcmVOb25TZWxlY3RlZCgpIHtcbiAgICB0aGlzLnNob3dPbmx5U2VsZWN0ZWQgPSAhdGhpcy5zaG93T25seVNlbGVjdGVkO1xuICAgIGlmICh0aGlzLnNob3dPbmx5U2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IHRydWU7XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIHJvdyA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmluZCh4ID0+IHJvd1t0aGlzLmtleUZpZWxkXSA9PT0geCk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcmVzdWx0ICE9PSAndW5kZWZpbmVkJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzb3J0KG9yZGVyLCBzb3J0RmllbGQpIHtcbiAgICB0aGlzLnNvcnRPYmogPSB7IG9yZGVyLCBzb3J0RmllbGQgfTtcblxuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGlmICghdGhpcy5jb2xJbmZvc1tzb3J0RmllbGRdKSByZXR1cm4gdGhpcztcblxuICAgIGNvbnN0IHsgc29ydEZ1bmMgfSA9IHRoaXMuY29sSW5mb3Nbc29ydEZpZWxkXTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEgPSBfc29ydChjdXJyZW50RGlzcGxheURhdGEsIHNvcnRGaWVsZCwgb3JkZXIsIHNvcnRGdW5jKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcGFnZShwYWdlLCBzaXplUGVyUGFnZSkge1xuICAgIHRoaXMucGFnZU9iai5lbmQgPSBwYWdlICogc2l6ZVBlclBhZ2UgLSAxO1xuICAgIHRoaXMucGFnZU9iai5zdGFydCA9IHRoaXMucGFnZU9iai5lbmQgLSAoc2l6ZVBlclBhZ2UgLSAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVkaXQobmV3VmFsLCByb3dJbmRleCwgZmllbGROYW1lKSB7XG4gICAgY29uc3QgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBsZXQgcm93S2V5Q2FjaGU7XG4gICAgaWYgKCF0aGlzLmVuYWJsZVBhZ2luYXRpb24pIHtcbiAgICAgIGN1cnJlbnREaXNwbGF5RGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IG5ld1ZhbDtcbiAgICAgIHJvd0tleUNhY2hlID0gY3VycmVudERpc3BsYXlEYXRhW3Jvd0luZGV4XVt0aGlzLmtleUZpZWxkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudERpc3BsYXlEYXRhW3RoaXMucGFnZU9iai5zdGFydCArIHJvd0luZGV4XVtmaWVsZE5hbWVdID0gbmV3VmFsO1xuICAgICAgcm93S2V5Q2FjaGUgPSBjdXJyZW50RGlzcGxheURhdGFbdGhpcy5wYWdlT2JqLnN0YXJ0ICsgcm93SW5kZXhdW3RoaXMua2V5RmllbGRdO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgaWYgKHJvd1t0aGlzLmtleUZpZWxkXSA9PT0gcm93S2V5Q2FjaGUpIHtcbiAgICAgICAgICByb3dbZmllbGROYW1lXSA9IG5ld1ZhbDtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgICBpZiAodGhpcy5maWx0ZXJPYmogIT09IG51bGwpIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgICAgIGlmICh0aGlzLnNlYXJjaFRleHQgIT09IG51bGwpIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkQXRCZWdpbihuZXdPYmopIHtcbiAgICBpZiAoIW5ld09ialt0aGlzLmtleUZpZWxkXSB8fCBuZXdPYmpbdGhpcy5rZXlGaWVsZF0udG9TdHJpbmcoKSA9PT0gJycpIHtcbiAgICAgIHRocm93IGAke3RoaXMua2V5RmllbGR9IGNhbid0IGJlIGVtcHR5IHZhbHVlLmA7XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnREaXNwbGF5RGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgY3VycmVudERpc3BsYXlEYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IGAke3RoaXMua2V5RmllbGR9ICR7bmV3T2JqW3RoaXMua2V5RmllbGRdfSBhbHJlYWR5IGV4aXN0c2A7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgY3VycmVudERpc3BsYXlEYXRhLnVuc2hpZnQobmV3T2JqKTtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICB0aGlzLmRhdGEudW5zaGlmdChuZXdPYmopO1xuICAgIH1cbiAgfVxuXG4gIGFkZChuZXdPYmopIHtcbiAgICBpZiAoIW5ld09ialt0aGlzLmtleUZpZWxkXSB8fCBuZXdPYmpbdGhpcy5rZXlGaWVsZF0udG9TdHJpbmcoKSA9PT0gJycpIHtcbiAgICAgIHRocm93IGAke3RoaXMua2V5RmllbGR9IGNhbid0IGJlIGVtcHR5IHZhbHVlLmA7XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnREaXNwbGF5RGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgY3VycmVudERpc3BsYXlEYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IGAke3RoaXMua2V5RmllbGR9ICR7bmV3T2JqW3RoaXMua2V5RmllbGRdfSBhbHJlYWR5IGV4aXN0c2A7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBjdXJyZW50RGlzcGxheURhdGEucHVzaChuZXdPYmopO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS5wdXNoKG5ld09iaik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKHJvd0tleSkge1xuICAgIGNvbnN0IGN1cnJlbnREaXNwbGF5RGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgY29uc3QgcmVzdWx0ID0gY3VycmVudERpc3BsYXlEYXRhLmZpbHRlcihyb3cgPT4ge1xuICAgICAgcmV0dXJuIHJvd0tleS5pbmRleE9mKHJvd1t0aGlzLmtleUZpZWxkXSkgPT09IC0xO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICByZXR1cm4gcm93S2V5LmluZGV4T2Yocm93W3RoaXMua2V5RmllbGRdKSA9PT0gLTE7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEgPSByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyKGZpbHRlck9iaikge1xuICAgIGlmIChPYmplY3Qua2V5cyhmaWx0ZXJPYmopLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IG51bGw7XG4gICAgICBpZiAodGhpcy5zZWFyY2hUZXh0ICE9PSBudWxsKSB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IGZpbHRlck9iajtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZpbHRlclZhbDtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVyT2JqKSB7XG4gICAgICAgICAgbGV0IHRhcmdldFZhbCA9IHJvd1trZXldO1xuXG4gICAgICAgICAgc3dpdGNoIChmaWx0ZXJPYmpba2V5XS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6IHtcbiAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnZhbHVlLm51bWJlcjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTToge1xuICAgICAgICAgICAgZmlsdGVyVmFsID0gKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICAgKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gJ3N0cmluZycpID9cbiAgICAgICAgICAgICAgICBmaWx0ZXJPYmpba2V5XS52YWx1ZS50b0xvd2VyQ2FzZSgpIDpcbiAgICAgICAgICAgICAgICBmaWx0ZXJPYmpba2V5XS52YWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLlJFR0VYOiB7XG4gICAgICAgICAgICBmaWx0ZXJWYWwgPSBmaWx0ZXJPYmpba2V5XS52YWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBmaWx0ZXJWYWwgPSAodHlwZW9mIGZpbHRlck9ialtrZXldLnZhbHVlID09PSAnc3RyaW5nJykgP1xuICAgICAgICAgICAgICBmaWx0ZXJPYmpba2V5XS52YWx1ZS50b0xvd2VyQ2FzZSgpIDpcbiAgICAgICAgICAgICAgZmlsdGVyT2JqW2tleV0udmFsdWU7XG4gICAgICAgICAgICBpZiAoZmlsdGVyVmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gU3VwcG9ydCBvbGQgZmlsdGVyXG4gICAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuY29sSW5mb3Nba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZpbHRlckZvcm1hdHRlZCwgZm9ybWF0RXh0cmFEYXRhIH0gPSB0aGlzLmNvbEluZm9zW2tleV07XG4gICAgICAgICAgICBpZiAoZmlsdGVyRm9ybWF0dGVkICYmIGZvcm1hdCkge1xuICAgICAgICAgICAgICB0YXJnZXRWYWwgPSBmb3JtYXQocm93W2tleV0sIHJvdywgZm9ybWF0RXh0cmFEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzd2l0Y2ggKGZpbHRlck9ialtrZXldLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjoge1xuICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlck51bWJlcih0YXJnZXRWYWwsIGZpbHRlclZhbCwgZmlsdGVyT2JqW2tleV0udmFsdWUuY29tcGFyYXRvcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5EQVRFOiB7XG4gICAgICAgICAgICB2YWxpZCA9IHRoaXMuZmlsdGVyRGF0ZSh0YXJnZXRWYWwsIGZpbHRlclZhbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5SRUdFWDoge1xuICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlclJlZ2V4KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTToge1xuICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlckN1c3RvbSh0YXJnZXRWYWwsIGZpbHRlclZhbCwgZmlsdGVyT2JqW2tleV0udmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJUZXh0KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJOdW1iZXIodGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGNvbXBhcmF0b3IpIHtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIHN3aXRjaCAoY29tcGFyYXRvcikge1xuICAgIGNhc2UgJz0nOiB7XG4gICAgICBpZiAodGFyZ2V0VmFsICE9IGZpbHRlclZhbCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJz4nOiB7XG4gICAgICBpZiAodGFyZ2V0VmFsIDw9IGZpbHRlclZhbCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJz49Jzoge1xuICAgICAgaWYgKHRhcmdldFZhbCA8IGZpbHRlclZhbCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJzwnOiB7XG4gICAgICBpZiAodGFyZ2V0VmFsID49IGZpbHRlclZhbCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJzw9Jzoge1xuICAgICAgaWYgKHRhcmdldFZhbCA+IGZpbHRlclZhbCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJyE9Jzoge1xuICAgICAgaWYgKHRhcmdldFZhbCA9PSBmaWx0ZXJWYWwpIHtcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdOdW1iZXIgY29tcGFyYXRvciBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIGZpbHRlckRhdGUodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpIHtcbiAgICByZXR1cm4gKHRhcmdldFZhbC5nZXREYXRlKCkgPT09IGZpbHRlclZhbC5nZXREYXRlKCkgJiZcbiAgICAgICAgdGFyZ2V0VmFsLmdldE1vbnRoKCkgPT09IGZpbHRlclZhbC5nZXRNb250aCgpICYmXG4gICAgICAgIHRhcmdldFZhbC5nZXRGdWxsWWVhcigpID09PSBmaWx0ZXJWYWwuZ2V0RnVsbFllYXIoKSk7XG4gIH1cblxuICBmaWx0ZXJSZWdleCh0YXJnZXRWYWwsIGZpbHRlclZhbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChmaWx0ZXJWYWwsICdpJykudGVzdCh0YXJnZXRWYWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJDdXN0b20odGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGNhbGxiYWNrSW5mbykge1xuICAgIGlmIChjYWxsYmFja0luZm8gIT09IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrSW5mbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBjYWxsYmFja0luZm8uY2FsbGJhY2sodGFyZ2V0VmFsLCBjYWxsYmFja0luZm8uY2FsbGJhY2tQYXJhbWV0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJUZXh0KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgfVxuXG4gIGZpbHRlclRleHQodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpIHtcbiAgICBpZiAodGFyZ2V0VmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbCkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyogR2VuZXJhbCBzZWFyY2ggZnVuY3Rpb25cbiAgICogSXQgd2lsbCBzZWFyY2ggZm9yIHRoZSB0ZXh0IGlmIHRoZSBpbnB1dCBpbmNsdWRlcyB0aGF0IHRleHQ7XG4gICAqL1xuICBzZWFyY2goc2VhcmNoVGV4dCkge1xuICAgIGlmIChzZWFyY2hUZXh0LnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gbnVsbDtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLmZpbHRlck9iaiAhPT0gbnVsbCkgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0O1xuICAgICAgbGV0IHNlYXJjaFRleHRBcnJheSA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5tdWx0aUNvbHVtblNlYXJjaCkge1xuICAgICAgICBzZWFyY2hUZXh0QXJyYXkgPSBzZWFyY2hUZXh0LnNwbGl0KCcgJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hUZXh0QXJyYXkucHVzaChzZWFyY2hUZXh0KTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5pc09uRmlsdGVyID8gdGhpcy5maWx0ZXJlZERhdGEgOiB0aGlzLmRhdGE7XG5cbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gc291cmNlLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJvdyk7XG4gICAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAvLyBmb3IgbG9vcHMgYXJlIHVnbHksIGJ1dCBwZXJmb3JtYW5jZSBtYXR0ZXJzIGhlcmUuXG4gICAgICAgIC8vIEFuZCB5b3UgY2FudCBicmVhayBmcm9tIGEgZm9yRWFjaC5cbiAgICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vZm9yLXZzLWZvcmVhY2gvNjZcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGtleXNMZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGtleXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKHRoaXMuY29sSW5mb3Nba2V5XSAmJiByb3dba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZpbHRlckZvcm1hdHRlZCwgZm9ybWF0RXh0cmFEYXRhLCBzZWFyY2hhYmxlIH0gPSB0aGlzLmNvbEluZm9zW2tleV07XG4gICAgICAgICAgICBsZXQgdGFyZ2V0VmFsID0gcm93W2tleV07XG4gICAgICAgICAgICBpZiAoc2VhcmNoYWJsZSkge1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyRm9ybWF0dGVkICYmIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFZhbCA9IGZvcm1hdCh0YXJnZXRWYWwsIHJvdywgZm9ybWF0RXh0cmFEYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgdGV4dExlbmd0aCA9IHNlYXJjaFRleHRBcnJheS5sZW5ndGg7IGogPCB0ZXh0TGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJWYWwgPSBzZWFyY2hUZXh0QXJyYXlbal0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0VmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgY29uc3QgX2RhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuXG4gICAgaWYgKF9kYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIF9kYXRhO1xuXG4gICAgaWYgKHRoaXMucmVtb3RlIHx8ICF0aGlzLmVuYWJsZVBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiBfZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5wYWdlT2JqLnN0YXJ0OyBpIDw9IHRoaXMucGFnZU9iai5lbmQ7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChfZGF0YVtpXSk7XG4gICAgICAgIGlmIChpICsgMSA9PT0gX2RhdGEubGVuZ3RoKSBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0S2V5RmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMua2V5RmllbGQ7XG4gIH1cblxuICBnZXREYXRhTnVtKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpLmxlbmd0aDtcbiAgfVxuXG4gIGlzQ2hhbmdlZFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZU9iai5zdGFydCAmJiB0aGlzLnBhZ2VPYmouZW5kID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0QWxsUm93a2V5KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKHJvdyA9PiB7XG4gICAgICByZXR1cm4gcm93W3RoaXMua2V5RmllbGRdO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qc1xuICoqLyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmVuZGVyUmVhY3RTb3J0Q2FyZXQob3JkZXIpIHtcbiAgICBjb25zdCBvcmRlckNsYXNzID0gY2xhc3NTZXQoJ29yZGVyJywge1xuICAgICAgJ2Ryb3B1cCc6IG9yZGVyID09PSBDb25zdC5TT1JUX0FTQ1xuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9eyBvcmRlckNsYXNzIH0+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FyZXQnIHN0eWxlPXsgeyBtYXJnaW46ICcwcHggNXB4JyB9IH0+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH0sXG5cbiAgZ2V0U2Nyb2xsQmFyV2lkdGgoKSB7XG4gICAgY29uc3QgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaW5uZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaW5uZXIuc3R5bGUuaGVpZ2h0ID0gJzIwMHB4JztcblxuICAgIGNvbnN0IG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIG91dGVyLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgIG91dGVyLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICBvdXRlci5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICAgIG91dGVyLnN0eWxlLmhlaWdodCA9ICcxNTBweCc7XG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICBjb25zdCB3MSA9IGlubmVyLm9mZnNldFdpZHRoO1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gICAgbGV0IHcyID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgaWYgKHcxID09PSB3MikgdzIgPSBvdXRlci5jbGllbnRXaWR0aDtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuXG4gICAgcmV0dXJuICh3MSAtIHcyKTtcbiAgfSxcblxuICBjYW5Vc2VET00oKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIi8qIGVzbGludCBibG9jay1zY29wZWQtdmFyOiAwICovXG4vKiBlc2xpbnQgdmFycy1vbi10b3A6IDAgKi9cbi8qIGVzbGludCBuby12YXI6IDAgKi9cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogMCAqL1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIGNvbnN0IGZpbGVzYXZlciA9IHJlcXVpcmUoJy4vZmlsZXNhdmVyJyk7XG4gIHZhciBzYXZlQXMgPSBmaWxlc2F2ZXIuc2F2ZUFzO1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZyhkYXRhLCBrZXlzKSB7XG4gIGxldCBkYXRhU3RyaW5nID0gJyc7XG4gIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGRhdGFTdHJpbmc7XG5cbiAgZGF0YVN0cmluZyArPSBrZXlzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gIGRhdGEubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgIGtleXMubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xuICAgICAgY29uc3QgY2VsbCA9IHR5cGVvZiByb3dbY29sXSAhPT0gJ3VuZGVmaW5lZCcgPyAoJ1wiJyArIHJvd1tjb2xdICsgJ1wiJykgOiAnJztcbiAgICAgIGRhdGFTdHJpbmcgKz0gY2VsbDtcbiAgICAgIGlmIChpICsgMSA8IGtleXMubGVuZ3RoKSBkYXRhU3RyaW5nICs9ICcsJztcbiAgICB9KTtcblxuICAgIGRhdGFTdHJpbmcgKz0gJ1xcbic7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhU3RyaW5nO1xufVxuXG5jb25zdCBleHBvcnRDU1YgPSBmdW5jdGlvbihkYXRhLCBrZXlzLCBmaWxlbmFtZSkge1xuICBjb25zdCBkYXRhU3RyaW5nID0gdG9TdHJpbmcoZGF0YSwga2V5cyk7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNhdmVBcyhuZXcgQmxvYihbIGRhdGFTdHJpbmcgXSxcbiAgICAgICAgeyB0eXBlOiAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04JyB9KSxcbiAgICAgICAgZmlsZW5hbWUgfHwgJ3NwcmVhZHNoZWV0LmNzdicpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRDU1Y7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanNcbiAqKi8iLCIvKiBGaWxlU2F2ZXIuanNcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTUxMDAzXG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogTUlUXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBzYXZlQXMgfHwgKGZ1bmN0aW9uKHZpZXcpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhclxuXHRcdCAgZG9jID0gdmlldy5kb2N1bWVudFxuXHRcdCAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcblx0XHQsIGdldF9VUkwgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuXHRcdH1cblx0XHQsIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiYVwiKVxuXHRcdCwgY2FuX3VzZV9zYXZlX2xpbmsgPSBcImRvd25sb2FkXCIgaW4gc2F2ZV9saW5rXG5cdFx0LCBjbGljayA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIik7XG5cdFx0XHRub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH1cblx0XHQsIGlzX3NhZmFyaSA9IC9WZXJzaW9uXFwvW1xcZFxcLl0rLipTYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcblx0XHQsIHdlYmtpdF9yZXFfZnMgPSB2aWV3LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtXG5cdFx0LCByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbVxuXHRcdCwgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uKGV4KSB7XG5cdFx0XHQodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgZXg7XG5cdFx0XHR9LCAwKTtcblx0XHR9XG5cdFx0LCBmb3JjZV9zYXZlYWJsZV90eXBlID0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuXHRcdCwgZnNfbWluX3NpemUgPSAwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzUyOTcjYzcgYW5kXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2NvbW1pdC80ODU5MzBhI2NvbW1pdGNvbW1lbnQtODc2ODA0N1xuXHRcdC8vIGZvciB0aGUgcmVhc29uaW5nIGJlaGluZCB0aGUgdGltZW91dCBhbmQgcmV2b2NhdGlvbiBmbG93XG5cdFx0LCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQgPSA1MDAgLy8gaW4gbXNcblx0XHQsIHJldm9rZSA9IGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdHZhciByZXZva2VyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcblx0XHRcdFx0XHRnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xuXHRcdFx0XHR9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxuXHRcdFx0XHRcdGZpbGUucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRpZiAodmlldy5jaHJvbWUpIHtcblx0XHRcdFx0cmV2b2tlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGRpc3BhdGNoID0gZnVuY3Rpb24oZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcblx0XHRcdGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcblx0XHRcdHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbXCJvblwiICsgZXZlbnRfdHlwZXNbaV1dO1xuXHRcdFx0XHRpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0bGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdFx0XHRcdHRocm93X291dHNpZGUoZXgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGF1dG9fYm9tID0gZnVuY3Rpb24oYmxvYikge1xuXHRcdFx0Ly8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcblx0XHRcdGlmICgvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgQmxvYihbXCJcXHVmZWZmXCIsIGJsb2JdLCB7dHlwZTogYmxvYi50eXBlfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYmxvYjtcblx0XHR9XG5cdFx0LCBGaWxlU2F2ZXIgPSBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0aWYgKCFub19hdXRvX2JvbSkge1xuXHRcdFx0XHRibG9iID0gYXV0b19ib20oYmxvYik7XG5cdFx0XHR9XG5cdFx0XHQvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuXHRcdFx0dmFyXG5cdFx0XHRcdCAgZmlsZXNhdmVyID0gdGhpc1xuXHRcdFx0XHQsIHR5cGUgPSBibG9iLnR5cGVcblx0XHRcdFx0LCBibG9iX2NoYW5nZWQgPSBmYWxzZVxuXHRcdFx0XHQsIG9iamVjdF91cmxcblx0XHRcdFx0LCB0YXJnZXRfdmlld1xuXHRcdFx0XHQsIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJ3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kXCIuc3BsaXQoXCIgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBvbiBhbnkgZmlsZXN5cyBlcnJvcnMgcmV2ZXJ0IHRvIHNhdmluZyB3aXRoIG9iamVjdCBVUkxzXG5cdFx0XHRcdCwgZnNfZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAodGFyZ2V0X3ZpZXcgJiYgaXNfc2FmYXJpICYmIHR5cGVvZiBGaWxlUmVhZGVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHQvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcblx0XHRcdFx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBcImRhdGE6YXR0YWNobWVudC9maWxlXCIgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuXHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdFx0XHRkaXNwYXRjaF9hbGwoKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcblx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGRvbid0IGNyZWF0ZSBtb3JlIG9iamVjdCBVUkxzIHRoYW4gbmVlZGVkXG5cdFx0XHRcdFx0aWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuXHRcdFx0XHRcdFx0b2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0YXJnZXRfdmlldykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsIFwiX2JsYW5rXCIpO1xuXHRcdFx0XHRcdFx0aWYgKG5ld190YWIgPT0gdW5kZWZpbmVkICYmIGlzX3NhZmFyaSkge1xuXHRcdFx0XHRcdFx0XHQvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuXHRcdFx0XHRcdFx0XHR2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCwgYWJvcnRhYmxlID0gZnVuY3Rpb24oZnVuYykge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlc2F2ZXIucmVhZHlTdGF0ZSAhPT0gZmlsZXNhdmVyLkRPTkUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdCwgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9XG5cdFx0XHRcdCwgc2xpY2Vcblx0XHRcdDtcblx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cdFx0XHRpZiAoIW5hbWUpIHtcblx0XHRcdFx0bmFtZSA9IFwiZG93bmxvYWRcIjtcblx0XHRcdH1cblx0XHRcdGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuXHRcdFx0XHRvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRcdFx0c2F2ZV9saW5rLmhyZWYgPSBvYmplY3RfdXJsO1xuXHRcdFx0XHRzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNsaWNrKHNhdmVfbGluayk7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuXHRcdFx0Ly8gdmlld2VkIGluIGEgdGFiLCBzbyBJIGZvcmNlIHNhdmUgd2l0aCBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cblx0XHRcdC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkxMTU4XG5cdFx0XHQvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuXHRcdFx0Ly8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM4OTY0MlxuXHRcdFx0aWYgKHZpZXcuY2hyb21lICYmIHR5cGUgJiYgdHlwZSAhPT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSkge1xuXHRcdFx0XHRzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcblx0XHRcdFx0YmxvYiA9IHNsaWNlLmNhbGwoYmxvYiwgMCwgYmxvYi5zaXplLCBmb3JjZV9zYXZlYWJsZV90eXBlKTtcblx0XHRcdFx0YmxvYl9jaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdC8vIFNpbmNlIEkgY2FuJ3QgYmUgc3VyZSB0aGF0IHRoZSBndWVzc2VkIG1lZGlhIHR5cGUgd2lsbCB0cmlnZ2VyIGEgZG93bmxvYWRcblx0XHRcdC8vIGluIFdlYktpdCwgSSBhcHBlbmQgLmRvd25sb2FkIHRvIHRoZSBmaWxlbmFtZS5cblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuXHRcdFx0aWYgKHdlYmtpdF9yZXFfZnMgJiYgbmFtZSAhPT0gXCJkb3dubG9hZFwiKSB7XG5cdFx0XHRcdG5hbWUgKz0gXCIuZG93bmxvYWRcIjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcblx0XHRcdFx0dGFyZ2V0X3ZpZXcgPSB2aWV3O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFyZXFfZnMpIHtcblx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZnNfbWluX3NpemUgKz0gYmxvYi5zaXplO1xuXHRcdFx0cmVxX2ZzKHZpZXcuVEVNUE9SQVJZLCBmc19taW5fc2l6ZSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZzKSB7XG5cdFx0XHRcdGZzLnJvb3QuZ2V0RGlyZWN0b3J5KFwic2F2ZWRcIiwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uKGRpcikge1xuXHRcdFx0XHRcdHZhciBzYXZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRkaXIuZ2V0RmlsZShuYW1lLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24od3JpdGVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLm9ud3JpdGVlbmQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IGZpbGUudG9VUkwoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChmaWxlc2F2ZXIsIFwid3JpdGVlbmRcIiwgZXZlbnQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV2b2tlKGZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvci5jb2RlICE9PSBlcnJvci5BQk9SVF9FUlIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFwid3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSBhYm9ydFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3cml0ZXJbXCJvblwiICsgZXZlbnRdID0gZmlsZXNhdmVyW1wib25cIiArIGV2ZW50XTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR3cml0ZXIud3JpdGUoYmxvYik7XG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3cml0ZXIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5XUklUSU5HO1xuXHRcdFx0XHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0XHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGRpci5nZXRGaWxlKG5hbWUsIHtjcmVhdGU6IGZhbHNlfSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRmaWxlLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRcdH0pLCBhYm9ydGFibGUoZnVuY3Rpb24oZXgpIHtcblx0XHRcdFx0XHRcdGlmIChleC5jb2RlID09PSBleC5OT1RfRk9VTkRfRVJSKSB7XG5cdFx0XHRcdFx0XHRcdHNhdmUoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZzX2Vycm9yKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHR9XG5cdFx0LCBGU19wcm90byA9IEZpbGVTYXZlci5wcm90b3R5cGVcblx0XHQsIHNhdmVBcyA9IGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSk7XG5cdFx0fVxuXHQ7XG5cdC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdGlmICghbm9fYXV0b19ib20pIHtcblx0XHRcdFx0YmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgXCJkb3dubG9hZFwiKTtcblx0XHR9O1xuXHR9XG5cblx0RlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgZmlsZXNhdmVyID0gdGhpcztcblx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJhYm9ydFwiKTtcblx0fTtcblx0RlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuXHRGU19wcm90by5XUklUSU5HID0gMTtcblx0RlNfcHJvdG8uRE9ORSA9IDI7XG5cblx0RlNfcHJvdG8uZXJyb3IgPVxuXHRGU19wcm90by5vbndyaXRlc3RhcnQgPVxuXHRGU19wcm90by5vbnByb2dyZXNzID1cblx0RlNfcHJvdG8ub253cml0ZSA9XG5cdEZTX3Byb3RvLm9uYWJvcnQgPVxuXHRGU19wcm90by5vbmVycm9yID1cblx0RlNfcHJvdG8ub253cml0ZWVuZCA9XG5cdFx0bnVsbDtcblxuXHRyZXR1cm4gc2F2ZUFzO1xufShcblx0ICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZlxuXHR8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuXHR8fCB0aGlzLmNvbnRlbnRcbikpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cy5zYXZlQXMgPSBzYXZlQXM7XG59IGVsc2UgaWYgKCh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCkgJiYgKGRlZmluZS5hbWQgIT0gbnVsbCkpIHtcbiAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2F2ZUFzO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbGVzYXZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIEZpbHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKTtcbiAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSB7fTtcbiAgfVxuXG4gIGhhbmRsZUZpbHRlcihkYXRhRmllbGQsIHZhbHVlLCB0eXBlKSB7XG4gICAgY29uc3QgZmlsdGVyVHlwZSA9IHR5cGUgfHwgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NO1xuXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIHZhbHVlIG9mIHRoZSBmaWx0ZXIgaXMgYW4gb2JqZWN0XG4gICAgICBsZXQgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIHZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWVbcHJvcF0gfHwgdmFsdWVbcHJvcF0gPT09ICcnKSB7XG4gICAgICAgICAgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gaWYgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyB1bmRlZmluZWQgb3IgZW1wdHksIHdlIHJlbW92ZSB0aGUgZmlsdGVyXG4gICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF0gPSB7IHZhbHVlOiB2YWx1ZSwgdHlwZTogZmlsdGVyVHlwZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY3VycmVudEZpbHRlcltkYXRhRmllbGRdO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXZhbHVlIHx8IHZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF0gPSB7IHZhbHVlOiB2YWx1ZS50cmltKCksIHR5cGU6IGZpbHRlclR5cGUgfTtcbiAgICB9XG4gICAgdGhpcy5lbWl0KCdvbkZpbHRlckNoYW5nZScsIHRoaXMuY3VycmVudEZpbHRlcik7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0ZpbHRlci5qc1xuICoqLyIsIi8qIGVzbGludCBkZWZhdWx0LWNhc2U6IDAgKi9cbi8qIGVzbGludCBndWFyZC1mb3ItaW46IDAgKi9cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRGF0ZUZpbHRlciBmcm9tICcuL2ZpbHRlcnMvRGF0ZSc7XG5pbXBvcnQgVGV4dEZpbHRlciBmcm9tICcuL2ZpbHRlcnMvVGV4dCc7XG5pbXBvcnQgUmVnZXhGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL1JlZ2V4JztcbmltcG9ydCBTZWxlY3RGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL1NlbGVjdCc7XG5pbXBvcnQgTnVtYmVyRmlsdGVyIGZyb20gJy4vZmlsdGVycy9OdW1iZXInO1xuXG5jbGFzcyBUYWJsZUhlYWRlckNvbHVtbiBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVGaWx0ZXIgPSB0aGlzLmhhbmRsZUZpbHRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ29sdW1uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRhdGFTb3J0KSByZXR1cm47XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnByb3BzLnNvcnQgPT09IENvbnN0LlNPUlRfREVTQyA/IENvbnN0LlNPUlRfQVNDIDogQ29uc3QuU09SVF9ERVNDO1xuICAgIHRoaXMucHJvcHMub25Tb3J0KG9yZGVyLCB0aGlzLnByb3BzLmRhdGFGaWVsZCk7XG4gIH1cblxuICBoYW5kbGVGaWx0ZXIodmFsdWUsIHR5cGUpIHtcbiAgICB0aGlzLnByb3BzLmZpbHRlci5lbWl0dGVyLmhhbmRsZUZpbHRlcih0aGlzLnByb3BzLmRhdGFGaWVsZCwgdmFsdWUsIHR5cGUpO1xuICB9XG5cbiAgZ2V0RmlsdGVycygpIHtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZmlsdGVyLnR5cGUpIHtcbiAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQ6IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUZXh0RmlsdGVyIHsgLi4udGhpcy5wcm9wcy5maWx0ZXIgfVxuICAgICAgICAgIGNvbHVtbk5hbWU9eyB0aGlzLnByb3BzLmNoaWxkcmVuIH0gZmlsdGVySGFuZGxlcj17IHRoaXMuaGFuZGxlRmlsdGVyIH0gLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuUkVHRVg6IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxSZWdleEZpbHRlciB7IC4uLnRoaXMucHJvcHMuZmlsdGVyIH1cbiAgICAgICAgICBjb2x1bW5OYW1lPXsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9IGZpbHRlckhhbmRsZXI9eyB0aGlzLmhhbmRsZUZpbHRlciB9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLlNFTEVDVDoge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNlbGVjdEZpbHRlciB7IC4uLnRoaXMucHJvcHMuZmlsdGVyIH1cbiAgICAgICAgICBjb2x1bW5OYW1lPXsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9IGZpbHRlckhhbmRsZXI9eyB0aGlzLmhhbmRsZUZpbHRlciB9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjoge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE51bWJlckZpbHRlciB7IC4uLnRoaXMucHJvcHMuZmlsdGVyIH1cbiAgICAgICAgICBjb2x1bW5OYW1lPXsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9IGZpbHRlckhhbmRsZXI9eyB0aGlzLmhhbmRsZUZpbHRlciB9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkRBVEU6IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxEYXRlRmlsdGVyIHsgLi4udGhpcy5wcm9wcy5maWx0ZXIgfVxuICAgICAgICAgIGNvbHVtbk5hbWU9eyB0aGlzLnByb3BzLmNoaWxkcmVuIH0gZmlsdGVySGFuZGxlcj17IHRoaXMuaGFuZGxlRmlsdGVyIH0gLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NOiB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5maWx0ZXIuZ2V0RWxlbWVudCh0aGlzLmhhbmRsZUZpbHRlcixcbiAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlci5jdXN0b21GaWx0ZXJQYXJhbWV0ZXJzKTtcbiAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5yZWZzWydoZWFkZXItY29sJ10uc2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJywgdGhpcy5wcm9wcy5kYXRhRmllbGQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBkZWZhdWx0Q2FyZXQ7XG4gICAgY29uc3QgdGhTdHlsZSA9IHtcbiAgICAgIHRleHRBbGlnbjogdGhpcy5wcm9wcy5kYXRhQWxpZ24sXG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLmhpZGRlbiA/ICdub25lJyA6IG51bGxcbiAgICB9O1xuICAgIGlmICh0aGlzLnByb3BzLnNvcnRJbmRpY2F0b3IpIHtcbiAgICAgIGRlZmF1bHRDYXJldCA9ICghdGhpcy5wcm9wcy5kYXRhU29ydCkgPyBudWxsIDogKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J29yZGVyJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2Ryb3Bkb3duJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FyZXQnIHN0eWxlPXsgeyBtYXJnaW46ICcxMHB4IDAgMTBweCA1cHgnLCBjb2xvcjogJyNjY2MnIH0gfT48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZHJvcHVwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FyZXQnIHN0eWxlPXsgeyBtYXJnaW46ICcxMHB4IDAnLCBjb2xvcjogJyNjY2MnIH0gfT48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBzb3J0Q2FyZXQgPSB0aGlzLnByb3BzLnNvcnQgPyBVdGlsLnJlbmRlclJlYWN0U29ydENhcmV0KHRoaXMucHJvcHMuc29ydCkgOiBkZWZhdWx0Q2FyZXQ7XG4gICAgY29uc3QgY2xhc3NlcyA9IHRoaXMucHJvcHMuY2xhc3NOYW1lICsgJyAnICsgKHRoaXMucHJvcHMuZGF0YVNvcnQgPyAnc29ydC1jb2x1bW4nIDogJycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx0aCByZWY9J2hlYWRlci1jb2wnXG4gICAgICAgICAgY2xhc3NOYW1lPXsgY2xhc3NlcyB9XG4gICAgICAgICAgc3R5bGU9eyB0aFN0eWxlIH1cbiAgICAgICAgICB0aXRsZT17IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNvbHVtbkNsaWNrIH0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9eyBzb3J0Q2FyZXQgfVxuICAgICAgICA8ZGl2IG9uQ2xpY2s9eyBlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkgfT5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuZmlsdGVyID8gdGhpcy5nZXRGaWx0ZXJzKCkgOiBudWxsIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RoPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgZmlsdGVyVHlwZUFycmF5ID0gW107XG5mb3IgKGNvbnN0IGtleSBpbiBDb25zdC5GSUxURVJfVFlQRSkge1xuICBmaWx0ZXJUeXBlQXJyYXkucHVzaChDb25zdC5GSUxURVJfVFlQRVtrZXldKTtcbn1cblxuVGFibGVIZWFkZXJDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBkYXRhRmllbGQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGFBbGlnbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YVNvcnQ6IFByb3BUeXBlcy5ib29sLFxuICBvblNvcnQ6IFByb3BUeXBlcy5mdW5jLFxuICBkYXRhRm9ybWF0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaXNLZXk6IFByb3BUeXBlcy5ib29sLFxuICBlZGl0YWJsZTogUHJvcFR5cGVzLmFueSxcbiAgaGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgd2lkdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNvcnRGdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgY29sdW1uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuYW55LFxuICBmaWx0ZXJGb3JtYXR0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBzb3J0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmb3JtYXRFeHRyYURhdGE6IFByb3BUeXBlcy5hbnksXG4gIGZpbHRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0eXBlOiBQcm9wVHlwZXMub25lT2YoZmlsdGVyVHlwZUFycmF5KSxcbiAgICBkZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5vYmplY3QsIC8vIGZvciBTZWxlY3RGaWx0ZXJcbiAgICAgIFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpIC8vIGZvciBOdW1iZXJGaWx0ZXJcbiAgICBdKSxcbiAgICBudW1iZXJDb21wYXJhdG9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgZW1pdHRlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBnZXRFbGVtZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjdXN0b21GaWx0ZXJQYXJhbWV0ZXJzOiBQcm9wVHlwZXMub2JqZWN0XG4gIH0pLFxuICBzb3J0SW5kaWNhdG9yOiBQcm9wVHlwZXMuYm9vbFxufTtcblxuVGFibGVIZWFkZXJDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBkYXRhQWxpZ246ICdsZWZ0JyxcbiAgZGF0YVNvcnQ6IGZhbHNlLFxuICBkYXRhRm9ybWF0OiB1bmRlZmluZWQsXG4gIGlzS2V5OiBmYWxzZSxcbiAgZWRpdGFibGU6IHRydWUsXG4gIG9uU29ydDogdW5kZWZpbmVkLFxuICBoaWRkZW46IGZhbHNlLFxuICBzZWFyY2hhYmxlOiB0cnVlLFxuICBjbGFzc05hbWU6ICcnLFxuICB3aWR0aDogbnVsbCxcbiAgc29ydEZ1bmM6IHVuZGVmaW5lZCxcbiAgY29sdW1uQ2xhc3NOYW1lOiAnJyxcbiAgZmlsdGVyRm9ybWF0dGVkOiBmYWxzZSxcbiAgc29ydDogdW5kZWZpbmVkLFxuICBmb3JtYXRFeHRyYURhdGE6IHVuZGVmaW5lZCxcbiAgZmlsdGVyOiB1bmRlZmluZWQsXG4gIHNvcnRJbmRpY2F0b3I6IHRydWVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlSGVhZGVyQ29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanNcbiAqKi8iLCIvKiBlc2xpbnQgcXVvdGVzOiAwICovXG4vKiBlc2xpbnQgbWF4LWxlbjogMCAqL1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgRGF0ZUZpbHRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHNldERlZmF1bHREYXRlKCkge1xuICAgIGxldCBkZWZhdWx0RGF0ZSA9ICcnO1xuICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAvLyBTZXQgdGhlIGFwcHJvcHJpYXRlIGZvcm1hdCBmb3IgdGhlIGlucHV0IHR5cGU9ZGF0ZSwgaS5lLiBcIllZWVktTU0tRERcIlxuICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbmV3IERhdGUodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgICAgZGVmYXVsdERhdGUgPSBgJHtkZWZhdWx0VmFsdWUuZ2V0RnVsbFllYXIoKX0tJHsoXCIwXCIgKyAoZGVmYXVsdFZhbHVlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpfS0keyhcIjBcIiArIGRlZmF1bHRWYWx1ZS5nZXREYXRlKCkpLnNsaWNlKC0yKX1gO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdERhdGU7XG4gIH1cblxuICBmaWx0ZXIoZXZlbnQpIHtcbiAgICBjb25zdCBkYXRlVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgaWYgKGRhdGVWYWx1ZSkge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG5ldyBEYXRlKGRhdGVWYWx1ZSksIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIobnVsbCwgQ29uc3QuRklMVEVSX1RZUEUuREFURSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZGF0ZVZhbHVlID0gdGhpcy5yZWZzLmlucHV0RGF0ZS5kZWZhdWx0VmFsdWU7XG4gICAgaWYgKGRhdGVWYWx1ZSkge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG5ldyBEYXRlKGRhdGVWYWx1ZSksIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXQgcmVmPSdpbnB1dERhdGUnXG4gICAgICAgICAgIGNsYXNzTmFtZT0nZmlsdGVyIGRhdGUtZmlsdGVyIGZvcm0tY29udHJvbCdcbiAgICAgICAgICAgdHlwZT0nZGF0ZSdcbiAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmZpbHRlciB9XG4gICAgICAgICAgIGRlZmF1bHRWYWx1ZT17IHRoaXMuc2V0RGVmYXVsdERhdGUoKSB9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5EYXRlRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgZmlsdGVySGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBjb2x1bW5OYW1lOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXRlRmlsdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsdGVycy9EYXRlLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgVGV4dEZpbHRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgZmlsdGVyKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKGZpbHRlclZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5URVhUKTtcbiAgICB9LCB0aGlzLnByb3BzLmRlbGF5KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMucmVmcy5pbnB1dFRleHQuZGVmYXVsdFZhbHVlO1xuICAgIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcihkZWZhdWx0VmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcGxhY2Vob2xkZXIsIGNvbHVtbk5hbWUsIGRlZmF1bHRWYWx1ZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IHJlZj0naW5wdXRUZXh0J1xuICAgICAgICBjbGFzc05hbWU9J2ZpbHRlciB0ZXh0LWZpbHRlciBmb3JtLWNvbnRyb2wnXG4gICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5maWx0ZXIgfVxuICAgICAgICBwbGFjZWhvbGRlcj17IHBsYWNlaG9sZGVyIHx8IGBFbnRlciAke2NvbHVtbk5hbWV9Li4uYCB9XG4gICAgICAgIGRlZmF1bHRWYWx1ZT17IGRlZmF1bHRWYWx1ZSA/IGRlZmF1bHRWYWx1ZSA6ICcnIH0gLz5cbiAgICApO1xuICB9XG59XG5cblRleHRGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBmaWx0ZXJIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgY29sdW1uTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuVGV4dEZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGRlbGF5OiBDb25zdC5GSUxURVJfREVMQVlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL1RleHQuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vQ29uc3QnO1xuXG5jbGFzcyBSZWdleEZpbHRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgZmlsdGVyKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKGZpbHRlclZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5SRUdFWCk7XG4gICAgfSwgdGhpcy5wcm9wcy5kZWxheSk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucmVmcy5pbnB1dFRleHQuZGVmYXVsdFZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5SRUdFWCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkZWZhdWx0VmFsdWUsIHBsYWNlaG9sZGVyLCBjb2x1bW5OYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgcmVmPSdpbnB1dFRleHQnXG4gICAgICAgICAgY2xhc3NOYW1lPSdmaWx0ZXIgdGV4dC1maWx0ZXIgZm9ybS1jb250cm9sJ1xuICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmZpbHRlciB9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9eyBwbGFjZWhvbGRlciB8fCBgRW50ZXIgUmVnZXggZm9yICR7Y29sdW1uTmFtZX0uLi5gIH1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9eyAoZGVmYXVsdFZhbHVlKSA/IGRlZmF1bHRWYWx1ZSA6ICcnIH0gLz5cbiAgICApO1xuICB9XG59XG5cblJlZ2V4RmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgZmlsdGVySGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBkZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNvbHVtbk5hbWU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cblJlZ2V4RmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGVsYXk6IENvbnN0LkZJTFRFUl9ERUxBWVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVnZXhGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL1JlZ2V4LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgU2VsZWN0RmlsdGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5maWx0ZXIgPSB0aGlzLmZpbHRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6ICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpKVxuICAgIH07XG4gIH1cblxuICBmaWx0ZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUGxhY2Vob2xkZXJTZWxlY3RlZDogKHZhbHVlID09PSAnJykgfSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1QpO1xuICB9XG5cbiAgZ2V0T3B0aW9ucygpIHtcbiAgICBjb25zdCBvcHRpb25UYWdzID0gW107XG4gICAgY29uc3QgeyBvcHRpb25zLCBwbGFjZWhvbGRlciwgY29sdW1uTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvcHRpb25UYWdzLnB1c2goKFxuICAgICAgPG9wdGlvbiBrZXk9Jy0xJyB2YWx1ZT0nJz57IHBsYWNlaG9sZGVyIHx8IGBTZWxlY3QgJHtjb2x1bW5OYW1lfS4uLmAgfTwvb3B0aW9uPlxuICAgICkpO1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXsga2V5IH0gdmFsdWU9eyBrZXkgfT57IG9wdGlvbnNba2V5XSB9PC9vcHRpb24+KTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3B0aW9uVGFncztcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZWZzLnNlbGVjdElucHV0LnZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1QpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzZWxlY3RDbGFzcyA9IGNsYXNzU2V0KCdmaWx0ZXInLCAnc2VsZWN0LWZpbHRlcicsICdmb3JtLWNvbnRyb2wnLFxuICAgICAgICAgICAgICB7ICdwbGFjZWhvbGRlci1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuaXNQbGFjZWhvbGRlclNlbGVjdGVkIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzZWxlY3QgcmVmPSdzZWxlY3RJbnB1dCdcbiAgICAgICAgICBjbGFzc05hbWU9eyBzZWxlY3RDbGFzcyB9XG4gICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmZpbHRlciB9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXsgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiAnJyB9ID5cbiAgICAgICAgeyB0aGlzLmdldE9wdGlvbnMoKSB9XG4gICAgICA8L3NlbGVjdD5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdEZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGZpbHRlckhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNvbHVtbk5hbWU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbHRlcnMvU2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY29uc3QgbGVnYWxDb21wYXJhdG9ycyA9IFsgJz0nLCAnPicsICc+PScsICc8JywgJzw9JywgJyE9JyBdO1xuXG5jbGFzcyBOdW1iZXJGaWx0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm51bWJlckNvbXBhcmF0b3JzID0gdGhpcy5wcm9wcy5udW1iZXJDb21wYXJhdG9ycyB8fCBsZWdhbENvbXBhcmF0b3JzO1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzUGxhY2Vob2xkZXJTZWxlY3RlZDogKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgKHRoaXMucHJvcHMub3B0aW9ucyAmJlxuICAgICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlcikgPT09IC0xKSlcbiAgICB9O1xuICAgIHRoaXMub25DaGFuZ2VOdW1iZXIgPSB0aGlzLm9uQ2hhbmdlTnVtYmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNoYW5nZU51bWJlclNldCA9IHRoaXMub25DaGFuZ2VOdW1iZXJTZXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ29tcGFyYXRvciA9IHRoaXMub25DaGFuZ2VDb21wYXJhdG9yLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNoYW5nZU51bWJlcihldmVudCkge1xuICAgIGNvbnN0IGNvbXBhcmF0b3IgPSB0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZTtcbiAgICBpZiAoY29tcGFyYXRvciA9PT0gJycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHsgbnVtYmVyOiBmaWx0ZXJWYWx1ZSwgY29tcGFyYXRvciB9LCBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgIH0sIHRoaXMucHJvcHMuZGVsYXkpO1xuICB9XG5cbiAgb25DaGFuZ2VOdW1iZXJTZXQoZXZlbnQpIHtcbiAgICBjb25zdCBjb21wYXJhdG9yID0gdGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWU7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6ICh2YWx1ZSA9PT0gJycpIH0pO1xuICAgIGlmIChjb21wYXJhdG9yID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIoeyBudW1iZXI6IHZhbHVlLCBjb21wYXJhdG9yIH0sIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUik7XG4gIH1cblxuICBvbkNoYW5nZUNvbXBhcmF0b3IoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucmVmcy5udW1iZXJGaWx0ZXIudmFsdWU7XG4gICAgY29uc3QgY29tcGFyYXRvciA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih7IG51bWJlcjogdmFsdWUsIGNvbXBhcmF0b3IgfSwgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSKTtcbiAgfVxuXG4gIGdldENvbXBhcmF0b3JPcHRpb25zKCkge1xuICAgIGNvbnN0IG9wdGlvblRhZ3MgPSBbXTtcbiAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9Jy0xJz48L29wdGlvbj4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJDb21wYXJhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgb3B0aW9uVGFncy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17IGkgfSB2YWx1ZT17IHRoaXMubnVtYmVyQ29tcGFyYXRvcnNbaV0gfT5cbiAgICAgICAgICB7IHRoaXMubnVtYmVyQ29tcGFyYXRvcnNbaV0gfVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25UYWdzO1xuICB9XG5cbiAgZ2V0TnVtYmVyT3B0aW9ucygpIHtcbiAgICBjb25zdCBvcHRpb25UYWdzID0gW107XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb3B0aW9uVGFncy5wdXNoKFxuICAgICAgPG9wdGlvbiBrZXk9Jy0xJyB2YWx1ZT0nJz5cbiAgICAgICAgeyB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IGBTZWxlY3QgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYCB9XG4gICAgICA8L29wdGlvbj5cbiAgICApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXsgaSB9IHZhbHVlPXsgb3B0aW9uc1tpXSB9Pnsgb3B0aW9uc1tpXSB9PC9vcHRpb24+KTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvblRhZ3M7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBjb21wYXJhdG9yID0gdGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWU7XG4gICAgY29uc3QgbnVtYmVyID0gdGhpcy5yZWZzLm51bWJlckZpbHRlci52YWx1ZTtcbiAgICBpZiAoY29tcGFyYXRvciAmJiBudW1iZXIpIHtcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih7IG51bWJlciwgY29tcGFyYXRvciB9LCBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHNlbGVjdENsYXNzID0gY2xhc3NTZXQoXG4gICAgICAnc2VsZWN0LWZpbHRlcicsICdudW1iZXItZmlsdGVyLWlucHV0JywgJ2Zvcm0tY29udHJvbCcsXG4gICAgICB7ICdwbGFjZWhvbGRlci1zZWxlY3RlZCc6IHRoaXMuc3RhdGUuaXNQbGFjZWhvbGRlclNlbGVjdGVkIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdmaWx0ZXIgbnVtYmVyLWZpbHRlcic+XG4gICAgICAgIDxzZWxlY3QgcmVmPSdudW1iZXJGaWx0ZXJDb21wYXJhdG9yJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nbnVtYmVyLWZpbHRlci1jb21wYXJhdG9yIGZvcm0tY29udHJvbCdcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2VDb21wYXJhdG9yIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e1xuICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLmNvbXBhcmF0b3IgOiAnJ1xuICAgICAgICAgICAgICAgIH0+XG4gICAgICAgICAgeyB0aGlzLmdldENvbXBhcmF0b3JPcHRpb25zKCkgfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAge1xuICAgICAgICAgICh0aGlzLnByb3BzLm9wdGlvbnMpID9cbiAgICAgICAgICAgIDxzZWxlY3QgcmVmPSdudW1iZXJGaWx0ZXInXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17IHNlbGVjdENsYXNzIH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlTnVtYmVyU2V0IH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtcbiAgICAgICAgICAgICAgICAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyIDogJydcbiAgICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgeyB0aGlzLmdldE51bWJlck9wdGlvbnMoKSB9XG4gICAgICAgICAgICA8L3NlbGVjdD4gOlxuICAgICAgICAgICAgPGlucHV0IHJlZj0nbnVtYmVyRmlsdGVyJ1xuICAgICAgICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J251bWJlci1maWx0ZXItaW5wdXQgZm9ybS1jb250cm9sJ1xuICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsgdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgRW50ZXIgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYCB9XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlTnVtYmVyIH1cbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e1xuICAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlciA6ICcnXG4gICAgICAgICAgICAgICAgICAgfSAvPlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbk51bWJlckZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGZpbHRlckhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgbnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGNvbXBhcmF0b3I6IFByb3BUeXBlcy5vbmVPZihsZWdhbENvbXBhcmF0b3JzKVxuICB9KSxcbiAgZGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gIC8qIGVzbGludCBjb25zaXN0ZW50LXJldHVybjogMCAqL1xuICBudW1iZXJDb21wYXJhdG9yczogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgaWYgKCFwcm9wc1twcm9wTmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1twcm9wTmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb21wYXJhdG9ySXNWYWxpZCA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZWdhbENvbXBhcmF0b3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChsZWdhbENvbXBhcmF0b3JzW2pdID09PSBwcm9wc1twcm9wTmFtZV1baV0pIHtcbiAgICAgICAgICBjb21wYXJhdG9ySXNWYWxpZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghY29tcGFyYXRvcklzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgTnVtYmVyIGNvbXBhcmF0b3IgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgICBVc2Ugb25seSAke2xlZ2FsQ29tcGFyYXRvcnN9YCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgY29sdW1uTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuTnVtYmVyRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGVsYXk6IENvbnN0LkZJTFRFUl9ERUxBWVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyRmlsdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsdGVycy9OdW1iZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9