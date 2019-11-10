(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapTable"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrapTable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
	
	var _storeTableDataStore = __webpack_require__(34);
	
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _TableHeader = __webpack_require__(5);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	var _TableBody = __webpack_require__(9);
	
	var _TableBody2 = _interopRequireDefault(_TableBody);
	
	var _paginationPaginationList = __webpack_require__(30);
	
	var _paginationPaginationList2 = _interopRequireDefault(_paginationPaginationList);
	
	var _toolbarToolBar = __webpack_require__(32);
	
	var _toolbarToolBar2 = _interopRequireDefault(_toolbarToolBar);
	
	var _TableFilter = __webpack_require__(33);
	
	var _TableFilter2 = _interopRequireDefault(_TableFilter);
	
	var _storeTableDataStore = __webpack_require__(34);
	
	var _util = __webpack_require__(7);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _csv_export_util = __webpack_require__(36);
	
	var _csv_export_util2 = _interopRequireDefault(_csv_export_util);
	
	var _Filter = __webpack_require__(40);
	
	var BootstrapTable = (function (_React$Component) {
	  _inherits(BootstrapTable, _React$Component);
	
	  function BootstrapTable(props) {
	    var _this = this;
	
	    _classCallCheck(this, BootstrapTable);
	
	    _get(Object.getPrototypeOf(BootstrapTable.prototype), 'constructor', this).call(this, props);
	
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
	          var width = parseFloat(computedStyle.width.replace("px", ""));
	          if (_this.isIE) {
	            var paddingLeftWidth = parseFloat(computedStyle.paddingLeft.replace("px", ""));
	            var paddingRightWidth = parseFloat(computedStyle.paddingRight.replace("px", ""));
	            var borderRightWidth = parseFloat(computedStyle.borderRightWidth.replace("px", ""));
	            var borderLeftWidth = parseFloat(computedStyle.borderLeftWidth.replace("px", ""));
	            width = width + paddingLeftWidth + paddingRightWidth + borderRightWidth + borderLeftWidth;
	          }
	          var lastPadding = cells.length - 1 == i ? scrollBarWidth : 0;
	          if (width <= 0) {
	            width = 120;
	            cell.width = width + lastPadding + "px";
	          }
	          var result = width + lastPadding + "px";
	          header.childNodes[i].style.width = result;
	          header.childNodes[i].style.minWidth = result;
	        }
	      }
	    };
	
	    this._adjustHeight = function () {
	      if (_this.props.height.indexOf('%') === -1) {
	        _this.refs.body.refs.container.style.height = parseFloat(_this.props.height) - _this.refs.header.refs.container.offsetHeight + "px";
	      }
	    };
	
	    this.isIE = false;
	    this._attachCellEditFunc();
	    if (document) {
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
	      (function () {
	        var self = _this;
	        _this.filter.on('onFilterChange', function (currentFilter) {
	          self.handleFilterData(currentFilter);
	        });
	      })();
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
	            throw "Error. Multiple key column be detected in TableHeaderColumn.";
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
	      }, this);
	
	      var colInfos = this.getColumnsDescription(props).reduce(function (prev, curr) {
	        prev[curr.name] = curr;
	        return prev;
	      }, {});
	
	      if (!isKeyFieldDefined && !keyField) throw 'Error. No any key column defined in TableHeaderColumn.\n            Use \'isKey={true}\' to specify a unique column after version 0.5.4.';
	
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
	      var result = [];
	
	      if (this.props.options.sortName && this.props.options.sortOrder) this.store.sort(this.props.options.sortOrder, this.props.options.sortName);
	
	      if (this.props.pagination) {
	        var page = undefined,
	            sizePerPage = undefined;
	        if (this.store.isChangedPage()) {
	          sizePerPage = this.state.sizePerPage;
	          page = this.state.currPage;
	        } else {
	          sizePerPage = this.props.options.sizePerPage || _Const2['default'].SIZE_PER_PAGE_LIST[0];
	          page = this.props.options.page || 1;
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
	      if (Array.isArray(nextProps.data)) {
	        this.store.setData(nextProps.data.slice());
	        var page = nextProps.options.page || this.state.currPage;
	        var sizePerPage = nextProps.options.sizePerPage || this.state.sizePerPage;
	
	        // #125
	        if (!nextProps.options.page && page >= Math.ceil(nextProps.data.length / sizePerPage)) {
	          page = 1;
	        }
	        var sortInfo = this.store.getSortInfo();
	        var sortField = nextProps.options.sortName || (sortInfo ? sortInfo.sortField : undefined);
	        var sortOrder = nextProps.options.sortOrder || (sortInfo ? sortInfo.order : undefined);
	        if (sortField && sortOrder) this.store.sort(sortOrder, sortField);
	        var data = this.store.page(page, sizePerPage).get();
	        this.setState({
	          data: data,
	          currPage: page,
	          sizePerPage: sizePerPage
	        });
	      }
	      if (nextProps.selectRow && nextProps.selectRow.selected) {
	        //set default select rows to store.
	        var copy = nextProps.selectRow.selected.slice();
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
	        this.filter.removeAllListeners("onFilterChange");
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._adjustTable();
	      this._attachCellEditFunc();
	      if (this.props.options.afterTableComplete) this.props.options.afterTableComplete();
	    }
	  }, {
	    key: '_attachCellEditFunc',
	    value: function _attachCellEditFunc() {
	      if (this.props.cellEdit) {
	        this.props.cellEdit.__onCompleteEdit__ = this.handleEditCell.bind(this);
	        if (this.props.cellEdit.mode !== _Const2['default'].CELL_EDIT_NONE) this.props.selectRow.clickToSelect = false;
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
	      var childrens = this.props.children;
	      var style = {
	        height: this.props.height,
	        maxHeight: this.props.maxHeight
	      };
	      if (!Array.isArray(this.props.children)) {
	        childrens = [this.props.children];
	      }
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
	            onMouseEnter: this.handleMouseEnter.bind(this),
	            onMouseLeave: this.handleMouseLeave.bind(this) },
	          _react2['default'].createElement(
	            _TableHeader2['default'],
	            {
	              ref: 'header',
	              rowSelectType: this.props.selectRow.mode,
	              hideSelectColumn: this.props.selectRow.hideSelectColumn,
	              sortName: sortInfo ? sortInfo.sortField : undefined,
	              sortOrder: sortInfo ? sortInfo.order : undefined,
	              sortIndicator: sortIndicator,
	              onSort: this.handleSort.bind(this),
	              onSelectAllRow: this.handleSelectAllRow.bind(this),
	              bordered: this.props.bordered,
	              condensed: this.props.condensed,
	              isFiltered: this.filter ? true : false,
	              isSelectAll: isSelectAll },
	            this.props.children
	          ),
	          _react2['default'].createElement(_TableBody2['default'], {
	            ref: 'body',
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
	            onRowClick: this.handleRowClick.bind(this),
	            onRowMouseOver: this.handleRowMouseOver.bind(this),
	            onRowMouseOut: this.handleRowMouseOut.bind(this),
	            onSelectRow: this.handleSelectRow.bind(this),
	            noDataText: this.props.options.noDataText
	          })
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
	    key: 'handleSort',
	    value: function handleSort(order, sortField) {
	      if (this.props.options.onSortChange) {
	        this.props.options.onSortChange(sortField, order, this.props);
	      }
	
	      var result = this.store.sort(order, sortField).get();
	      this.setState({
	        data: result
	      });
	    }
	  }, {
	    key: 'handlePaginationData',
	    value: function handlePaginationData(page, sizePerPage) {
	      var onPageChange = this.props.options.onPageChange;
	
	      if (onPageChange) {
	        onPageChange(page, sizePerPage);
	      }
	
	      if (this.isRemoteDataSource()) {
	        return;
	      }
	
	      var result = this.store.page(page, sizePerPage).get();
	      this.setState({
	        data: result,
	        currPage: page,
	        sizePerPage: sizePerPage
	      });
	    }
	  }, {
	    key: 'handleMouseLeave',
	    value: function handleMouseLeave() {
	      if (this.props.options.onMouseLeave) {
	        this.props.options.onMouseLeave();
	      }
	    }
	  }, {
	    key: 'handleMouseEnter',
	    value: function handleMouseEnter() {
	      if (this.props.options.onMouseEnter) {
	        this.props.options.onMouseEnter();
	      }
	    }
	  }, {
	    key: 'handleRowMouseOut',
	    value: function handleRowMouseOut(row) {
	      if (this.props.options.onRowMouseOut) {
	        this.props.options.onRowMouseOut(row);
	      }
	    }
	  }, {
	    key: 'handleRowMouseOver',
	    value: function handleRowMouseOver(row) {
	      if (this.props.options.onRowMouseOver) {
	        this.props.options.onRowMouseOver(row);
	      }
	    }
	  }, {
	    key: 'handleRowClick',
	    value: function handleRowClick(row) {
	      if (this.props.options.onRowClick) {
	        this.props.options.onRowClick(row);
	      }
	    }
	  }, {
	    key: 'handleSelectAllRow',
	    value: function handleSelectAllRow(e) {
	      var isSelected = e.currentTarget.checked;
	      var selectedRowKeys = [];
	      var result = true;
	      if (this.props.selectRow.onSelectAll) {
	        result = this.props.selectRow.onSelectAll(isSelected, isSelected ? this.store.get() : []);
	      }
	
	      if (typeof result === 'undefined' || result !== false) {
	        if (isSelected) {
	          selectedRowKeys = this.store.getAllRowkey();
	        }
	
	        this.store.setSelectedRowKey(selectedRowKeys);
	        this.setState({
	          selectedRowKeys: selectedRowKeys
	        });
	      }
	    }
	  }, {
	    key: 'handleShowOnlySelected',
	    value: function handleShowOnlySelected() {
	      this.store.ignoreNonSelected();
	      var result = undefined;
	      if (this.props.pagination) {
	        result = this.store.page(1, this.state.sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      this.setState({
	        data: result,
	        currPage: 1
	      });
	    }
	  }, {
	    key: 'handleSelectRow',
	    value: function handleSelectRow(row, isSelected) {
	      var currSelected = this.store.getSelectedRowKeys();
	      var rowKey = row[this.store.getKeyField()];
	      var result = true;
	      if (this.props.selectRow.onSelect) {
	        result = this.props.selectRow.onSelect(row, isSelected);
	      }
	
	      if (typeof result === 'undefined' || result !== false) {
	        if (this.props.selectRow.mode === _Const2['default'].ROW_SELECT_SINGLE) {
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
	
	        this.store.setSelectedRowKey(currSelected);
	        this.setState({
	          selectedRowKeys: currSelected
	        });
	      }
	    }
	  }, {
	    key: 'handleEditCell',
	    value: function handleEditCell(newVal, rowIndex, colIndex) {
	      var fieldName = undefined;
	      _react2['default'].Children.forEach(this.props.children, function (column, i) {
	        if (i == colIndex) {
	          fieldName = column.props.dataField;
	          return false;
	        }
	      });
	
	      var result = this.store.edit(newVal, rowIndex, fieldName).get();
	      this.setState({
	        data: result
	      });
	
	      if (this.props.cellEdit.afterSaveCell) {
	        this.props.cellEdit.afterSaveCell(this.state.data[rowIndex], fieldName, newVal);
	      }
	    }
	  }, {
	    key: 'handleAddRowBegin',
	    value: function handleAddRowBegin() {
	      if (this.refs.body) {
	        // this.refs.body.cancelEdit();
	      }
	    }
	  }, {
	    key: 'handleAddRowAtBegin',
	    value: function handleAddRowAtBegin(newObj) {
	      var result = undefined;
	      try {
	        this.store.addAtBegin(newObj);
	      } catch (e) {
	        return e;
	      }
	      this._handleAfterAddingRow(newObj);
	    }
	  }, {
	    key: 'handleAddRow',
	    value: function handleAddRow(newObj) {
	      var result = undefined;
	      try {
	        this.store.add(newObj);
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
	    key: 'handleDropRow',
	    value: function handleDropRow(rowKeys) {
	      var that = this;
	      var dropRowKeys = rowKeys ? rowKeys : this.store.getSelectedRowKeys();
	      //add confirm before the delete action if that option is set.
	      if (dropRowKeys && dropRowKeys.length > 0) {
	        if (this.props.options.handleConfirmDeleteRow) {
	          this.props.options.handleConfirmDeleteRow(function () {
	            that.deleteRow(dropRowKeys);
	          });
	        } else if (confirm('Are you sure want delete?')) {
	          this.deleteRow(dropRowKeys);
	        }
	      }
	    }
	  }, {
	    key: 'deleteRow',
	    value: function deleteRow(dropRowKeys) {
	
	      var result = undefined;
	      this.store.remove(dropRowKeys); //remove selected Row
	      this.store.setSelectedRowKey([]); //clear selected row key
	
	      if (this.props.pagination) {
	        var sizePerPage = this.state.sizePerPage;
	        var currPage = this.state.currPage;
	
	        var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
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
	    key: 'handleFilterData',
	    value: function handleFilterData(filterObj) {
	      this.store.filter(filterObj);
	      var result = undefined;
	      if (this.props.pagination) {
	        var sizePerPage = this.state.sizePerPage;
	
	        result = this.store.page(1, sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      if (this.props.options.afterColumnFilter) this.props.options.afterColumnFilter(filterObj, this.store.getDataIgnoringPagination());
	      this.setState({
	        data: result,
	        currPage: 1
	      });
	    }
	  }, {
	    key: 'handleExportCSV',
	    value: function handleExportCSV() {
	      var result = this.store.getDataIgnoringPagination();
	      var keys = [];
	      this.props.children.map(function (column) {
	        if (column.props.hidden === false) {
	          keys.push(column.props.dataField);
	        }
	      });
	      (0, _csv_export_util2['default'])(result, keys, this.props.csvFileName);
	    }
	  }, {
	    key: 'handleSearch',
	    value: function handleSearch(searchText) {
	      this.store.search(searchText);
	      var result = undefined;
	      if (this.props.pagination) {
	        var sizePerPage = this.state.sizePerPage;
	
	        result = this.store.page(1, sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      if (this.props.options.afterSearch) this.props.options.afterSearch(searchText, this.store.getDataIgnoringPagination());
	      this.setState({
	        data: result,
	        currPage: 1
	      });
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
	        return _react2['default'].createElement(
	          'div',
	          { className: 'react-bs-table-pagination' },
	          _react2['default'].createElement(_paginationPaginationList2['default'], {
	            ref: 'pagination',
	            currPage: this.state.currPage,
	            changePage: this.handlePaginationData.bind(this),
	            sizePerPage: this.state.sizePerPage,
	            sizePerPageList: this.props.options.sizePerPageList || _Const2['default'].SIZE_PER_PAGE_LIST,
	            paginationSize: this.props.options.paginationSize || _Const2['default'].PAGINATION_SIZE,
	            remote: this.isRemoteDataSource(),
	            dataSize: dataSize,
	            onSizePerPageList: this.props.options.onSizePerPageList,
	            prePage: this.props.options.prePage || _Const2['default'].PRE_PAGE,
	            nextPage: this.props.options.nextPage || _Const2['default'].NEXT_PAGE,
	            firstPage: this.props.options.firstPage || _Const2['default'].FIRST_PAGE,
	            lastPage: this.props.options.lastPage || _Const2['default'].LAST_PAGE
	          })
	        );
	      }
	      return null;
	    }
	  }, {
	    key: 'renderToolBar',
	    value: function renderToolBar() {
	      var enableShowOnlySelected = this.props.selectRow && this.props.selectRow.showOnlySelected;
	      if (enableShowOnlySelected || this.props.insertRow || this.props.deleteRow || this.props.search || this.props.exportCSV) {
	        var columns = undefined;
	        if (Array.isArray(this.props.children)) {
	          columns = this.props.children.map(function (column) {
	            var props = column.props;
	            return {
	              name: props.children,
	              field: props.dataField,
	              //when you want same auto generate value and not allow edit, example ID field
	              autoValue: props.autoValue || false,
	              //for create editor, no params for column.editable() indicate that editor for new row
	              editable: props.editable && typeof props.editable === "function" ? props.editable() : props.editable,
	              format: props.dataFormat ? function (value) {
	                return props.dataFormat(value, null, props.formatExtraData).replace(/<.*?>/g, '');
	              } : false
	            };
	          });
	        } else {
	          columns = [{
	            name: this.props.children.props.children,
	            field: this.props.children.props.dataField,
	            editable: this.props.children.props.editable
	          }];
	        }
	        return _react2['default'].createElement(
	          'div',
	          { className: 'react-bs-table-tool-bar' },
	          _react2['default'].createElement(_toolbarToolBar2['default'], {
	            clearSearch: this.props.options.clearSearch,
	            enableInsert: this.props.insertRow,
	            enableDelete: this.props.deleteRow,
	            enableSearch: this.props.search,
	            enableExportCSV: this.props.exportCSV,
	            enableShowOnlySelected: enableShowOnlySelected,
	            columns: columns,
	            searchPlaceholder: this.props.searchPlaceholder,
	            onAddRow: this.handleAddRow.bind(this),
	            onAddRowBegin: this.handleAddRowBegin.bind(this),
	            onDropRow: this.handleDropRow.bind(this),
	            onSearch: this.handleSearch.bind(this),
	            onExportCSV: this.handleExportCSV.bind(this),
	            onShowOnlySelected: this.handleShowOnlySelected.bind(this)
	          })
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
	          onFilter: this.handleFilterData.bind(this) });
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: '_handleAfterAddingRow',
	    value: function _handleAfterAddingRow(newObj) {
	      var result = undefined;
	      if (this.props.pagination) {
	        //if pagination is enabled and insert row be trigger, change to last page
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
	})(_react2['default'].Component);
	
	BootstrapTable.propTypes = {
	  keyField: _react2['default'].PropTypes.string,
	  height: _react2['default'].PropTypes.string,
	  maxHeight: _react2['default'].PropTypes.string,
	  data: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]),
	  remote: _react2['default'].PropTypes.bool, // remote data, default is false
	  striped: _react2['default'].PropTypes.bool,
	  bordered: _react2['default'].PropTypes.bool,
	  hover: _react2['default'].PropTypes.bool,
	  condensed: _react2['default'].PropTypes.bool,
	  pagination: _react2['default'].PropTypes.bool,
	  searchPlaceholder: _react2['default'].PropTypes.string,
	  selectRow: _react2['default'].PropTypes.shape({
	    mode: _react2['default'].PropTypes.oneOf([_Const2['default'].ROW_SELECT_NONE, _Const2['default'].ROW_SELECT_SINGLE, _Const2['default'].ROW_SELECT_MULTI]),
	    bgColor: _react2['default'].PropTypes.string,
	    selected: _react2['default'].PropTypes.array,
	    onSelect: _react2['default'].PropTypes.func,
	    onSelectAll: _react2['default'].PropTypes.func,
	    clickToSelect: _react2['default'].PropTypes.bool,
	    hideSelectColumn: _react2['default'].PropTypes.bool,
	    clickToSelectAndEditCell: _react2['default'].PropTypes.bool,
	    showOnlySelected: _react2['default'].PropTypes.bool
	  }),
	  cellEdit: _react2['default'].PropTypes.shape({
	    mode: _react2['default'].PropTypes.string,
	    blurToSave: _react2['default'].PropTypes.bool,
	    afterSaveCell: _react2['default'].PropTypes.func
	  }),
	  insertRow: _react2['default'].PropTypes.bool,
	  deleteRow: _react2['default'].PropTypes.bool,
	  search: _react2['default'].PropTypes.bool,
	  columnFilter: _react2['default'].PropTypes.bool,
	  trClassName: _react2['default'].PropTypes.any,
	  options: _react2['default'].PropTypes.shape({
	    clearSearch: _react2['default'].PropTypes.bool,
	    sortName: _react2['default'].PropTypes.string,
	    sortOrder: _react2['default'].PropTypes.string,
	    sortIndicator: _react2['default'].PropTypes.bool,
	    afterTableComplete: _react2['default'].PropTypes.func,
	    afterDeleteRow: _react2['default'].PropTypes.func,
	    afterInsertRow: _react2['default'].PropTypes.func,
	    afterSearch: _react2['default'].PropTypes.func,
	    afterColumnFilter: _react2['default'].PropTypes.func,
	    onRowClick: _react2['default'].PropTypes.func,
	    page: _react2['default'].PropTypes.number,
	    sizePerPageList: _react2['default'].PropTypes.array,
	    sizePerPage: _react2['default'].PropTypes.number,
	    paginationSize: _react2['default'].PropTypes.number,
	    onSortChange: _react2['default'].PropTypes.func,
	    onPageChange: _react2['default'].PropTypes.func,
	    onSizePerPageList: _react2['default'].PropTypes.func,
	    noDataText: _react2['default'].PropTypes.string,
	    handleConfirmDeleteRow: _react2['default'].PropTypes.func,
	    prePage: _react2['default'].PropTypes.string,
	    nextPage: _react2['default'].PropTypes.string,
	    firstPage: _react2['default'].PropTypes.string,
	    lastPage: _react2['default'].PropTypes.string
	  }),
	  fetchInfo: _react2['default'].PropTypes.shape({
	    dataTotalSize: _react2['default'].PropTypes.number
	  }),
	  exportCSV: _react2['default'].PropTypes.bool,
	  csvFileName: _react2['default'].PropTypes.string
	};
	BootstrapTable.defaultProps = {
	  height: "100%",
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
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  SORT_DESC: "desc",
	  SORT_ASC: "asc",
	  SIZE_PER_PAGE: 10,
	  NEXT_PAGE: ">",
	  LAST_PAGE: ">>",
	  PRE_PAGE: "<",
	  FIRST_PAGE: "<<",
	  ROW_SELECT_BG_COLOR: "",
	  ROW_SELECT_NONE: "none",
	  ROW_SELECT_SINGLE: "radio",
	  ROW_SELECT_MULTI: "checkbox",
	  CELL_EDIT_NONE: "none",
	  CELL_EDIT_CLICK: "click",
	  CELL_EDIT_DBCLICK: "dbclick",
	  SIZE_PER_PAGE_LIST: [10, 25, 30, 50],
	  PAGINATION_SIZE: 5,
	  NO_DATA_TEXT: "There is no data to display",
	  SHOW_ONLY_SELECT: "Show Selected Only",
	  SHOW_ALL: "Show All",
	  FILTER_DELAY: 500,
	  FILTER_TYPE: {
	    TEXT: "TextFilter",
	    REGEX: "RegexFilter",
	    SELECT: "SelectFilter",
	    NUMBER: "NumberFilter",
	    DATE: "DateFilter",
	    CUSTOM: "CustomFilter"
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 5 */
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
	
	var _reactDom = __webpack_require__(6);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _util = __webpack_require__(7);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _SelectRowHeaderColumn = __webpack_require__(8);
	
	var _SelectRowHeaderColumn2 = _interopRequireDefault(_SelectRowHeaderColumn);
	
	var Checkbox = (function (_React$Component) {
	  _inherits(Checkbox, _React$Component);
	
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
	      return _react2['default'].createElement('input', { className: 'react-bs-select-all', type: 'checkbox', checked: this.props.checked, onChange: this.props.onChange });
	    }
	  }]);
	
	  return Checkbox;
	})(_react2['default'].Component);
	
	var TableHeader = (function (_React$Component2) {
	  _inherits(TableHeader, _React$Component2);
	
	  function TableHeader(props) {
	    _classCallCheck(this, TableHeader);
	
	    _get(Object.getPrototypeOf(TableHeader.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(TableHeader, [{
	    key: 'render',
	    value: function render() {
	      var containerClasses = (0, _classnames2['default'])("react-bs-container-header", "table-header-wrapper");
	      var tableClasses = (0, _classnames2['default'])("table", "table-hover", {
	        "table-bordered": this.props.bordered,
	        "table-condensed": this.props.condensed
	      });
	      var selectRowHeaderCol = this.props.hideSelectColumn ? null : this.renderSelectRowHeader();
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
	      if (this.props.rowSelectType == _Const2['default'].ROW_SELECT_SINGLE) {
	        return _react2['default'].createElement(_SelectRowHeaderColumn2['default'], null);
	      } else if (this.props.rowSelectType == _Const2['default'].ROW_SELECT_MULTI) {
	        return _react2['default'].createElement(
	          _SelectRowHeaderColumn2['default'],
	          null,
	          _react2['default'].createElement(Checkbox, { onChange: this.props.onSelectAllRow, checked: this.props.isSelectAll })
	        );
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: '_attachClearSortCaretFunc',
	    value: function _attachClearSortCaretFunc() {
	      var sortIndicator = this.props.sortIndicator;
	
	      if (Array.isArray(this.props.children)) {
	        for (var i = 0; i < this.props.children.length; i++) {
	          var field = this.props.children[i].props.dataField;
	          var sort = field === this.props.sortName ? this.props.sortOrder : undefined;
	          this.props.children[i] = _react2['default'].cloneElement(this.props.children[i], { key: i, onSort: this.props.onSort, sort: sort, sortIndicator: sortIndicator });
	        }
	      } else {
	        var field = this.props.children.props.dataField;
	        var sort = field === this.props.sortName ? this.props.sortOrder : undefined;
	        this.props.children = _react2['default'].cloneElement(this.props.children, { key: 0, onSort: this.props.onSort, sort: sort, sortIndicator: sortIndicator });
	      }
	    }
	  }]);
	
	  return TableHeader;
	})(_react2['default'].Component);
	
	TableHeader.propTypes = {
	  rowSelectType: _react2['default'].PropTypes.string,
	  onSort: _react2['default'].PropTypes.func,
	  onSelectAllRow: _react2['default'].PropTypes.func,
	  sortName: _react2['default'].PropTypes.string,
	  sortOrder: _react2['default'].PropTypes.string,
	  hideSelectColumn: _react2['default'].PropTypes.bool,
	  bordered: _react2['default'].PropTypes.bool,
	  condensed: _react2['default'].PropTypes.bool,
	  isFiltered: _react2['default'].PropTypes.bool,
	  isSelectAll: _react2['default'].PropTypes.oneOf([true, 'indeterminate', false]),
	  sortIndicator: _react2['default'].PropTypes.bool
	};
	
	TableHeader.defaultProps = {};
	exports['default'] = TableHeader;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	exports['default'] = {
	
	  renderReactSortCaret: function renderReactSortCaret(order) {
	    var orderClass = (0, _classnames2['default'])("order", {
	      'dropup': order == _Const2['default'].SORT_ASC
	    });
	    return _react2['default'].createElement(
	      'span',
	      { className: orderClass },
	      _react2['default'].createElement('span', { className: 'caret', style: { margin: '0px 5px' } })
	    );
	  },
	
	  getScrollBarWidth: function getScrollBarWidth() {
	    var inner = document.createElement('p');
	    inner.style.width = "100%";
	    inner.style.height = "200px";
	
	    var outer = document.createElement('div');
	    outer.style.position = "absolute";
	    outer.style.top = "0px";
	    outer.style.left = "0px";
	    outer.style.visibility = "hidden";
	    outer.style.width = "200px";
	    outer.style.height = "150px";
	    outer.style.overflow = "hidden";
	    outer.appendChild(inner);
	
	    document.body.appendChild(outer);
	    var w1 = inner.offsetWidth;
	    outer.style.overflow = 'scroll';
	    var w2 = inner.offsetWidth;
	    if (w1 == w2) w2 = outer.clientWidth;
	
	    document.body.removeChild(outer);
	
	    return w1 - w2;
	  }
	
	};
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var SelectRowHeaderColumn = (function (_React$Component) {
	  _inherits(SelectRowHeaderColumn, _React$Component);
	
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
	})(_react2['default'].Component);
	
	exports['default'] = SelectRowHeaderColumn;
	module.exports = exports['default'];

/***/ },
/* 9 */
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _TableRow = __webpack_require__(10);
	
	var _TableRow2 = _interopRequireDefault(_TableRow);
	
	var _TableColumn = __webpack_require__(11);
	
	var _TableColumn2 = _interopRequireDefault(_TableColumn);
	
	var _TableEditColumn = __webpack_require__(12);
	
	var _TableEditColumn2 = _interopRequireDefault(_TableEditColumn);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var isFun = function isFun(obj) {
	  return obj && typeof obj === "function";
	};
	
	var TableBody = (function (_React$Component) {
	  _inherits(TableBody, _React$Component);
	
	  function TableBody(props) {
	    _classCallCheck(this, TableBody);
	
	    _get(Object.getPrototypeOf(TableBody.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      currEditCell: null
	    };
	    this.editing = false;
	  }
	
	  _createClass(TableBody, [{
	    key: 'render',
	    value: function render() {
	      var tableClasses = (0, _classnames2['default'])("table", {
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
	          this.state.currEditCell != null && this.state.currEditCell.rid == r && this.state.currEditCell.cid == i) {
	            var format = column.format ? function (value) {
	              return column.format(value, data, column.formatExtraData).replace(/<.*?>/g, '');
	            } : false;
	
	            return _react2['default'].createElement(
	              _TableEditColumn2['default'],
	              { completeEdit: this.handleCompleteEditCell.bind(this),
	                //add by bluespring for column editor customize
	                editable: isFun(column.editable) ? column.editable(fieldValue, data, r, i) : column.editable,
	                format: column.format ? format : false,
	                key: i,
	                blurToSave: this.props.cellEdit.blurToSave,
	                rowIndex: r,
	                colIndex: i },
	              fieldValue
	            );
	          } else {
	            //add by bluespring for className customize
	            var tdClassName = isFun(column.className) ? column.className(fieldValue, data, r, i) : column.className;
	
	            if (typeof column.format !== "undefined") {
	              var formattedValue = column.format(fieldValue, data, column.formatExtraData);
	              if (!_react2['default'].isValidElement(formattedValue)) {
	                formattedValue = _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: formattedValue } });
	              }
	              return _react2['default'].createElement(
	                _TableColumn2['default'],
	                { dataAlign: column.align,
	                  key: i,
	                  className: tdClassName,
	                  cellEdit: this.props.cellEdit,
	                  hidden: column.hidden,
	                  onEdit: this.handleEditCell.bind(this),
	                  width: column.width },
	                formattedValue
	              );
	            } else {
	              return _react2['default'].createElement(
	                _TableColumn2['default'],
	                { dataAlign: column.align,
	                  key: i,
	                  className: tdClassName,
	                  cellEdit: this.props.cellEdit,
	                  hidden: column.hidden,
	                  onEdit: this.handleEditCell.bind(this),
	                  width: column.width },
	                fieldValue
	              );
	            }
	          }
	        }, this);
	        var selected = this.props.selectedRowKeys.indexOf(data[this.props.keyField]) != -1;
	        var selectRowColumn = isSelectRowDefined && !this.props.selectRow.hideSelectColumn ? this.renderSelectRowColumn(selected) : null;
	        //add by bluespring for className customize
	        var trClassName = isFun(this.props.trClassName) ? this.props.trClassName(data, r) : this.props.trClassName;
	        return _react2['default'].createElement(
	          _TableRow2['default'],
	          { isSelected: selected, key: r, className: trClassName,
	            selectRow: isSelectRowDefined ? this.props.selectRow : undefined,
	            enableCellEdit: this.props.cellEdit.mode !== _Const2['default'].CELL_EDIT_NONE,
	            onRowClick: this.handleRowClick.bind(this),
	            onRowMouseOver: this.handleRowMouseOver.bind(this),
	            onRowMouseOut: this.handleRowMouseOut.bind(this),
	            onSelectRow: this.handleSelectRow.bind(this) },
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
	        selectRowHeader = this.props.selectRow.hideSelectColumn ? null : _react2['default'].createElement('col', { style: style, key: -1 });
	      }
	      var theader = this.props.columns.map(function (column, i) {
	        var width = column.width == null ? column.width : parseInt(column.width);
	        var style = {
	          display: column.hidden ? "none" : null,
	          width: width,
	          minWidth: width
	          /** add min-wdth to fix user assign column width not eq offsetWidth in large column table **/
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
	    key: 'handleRowMouseOut',
	    value: function handleRowMouseOut(rowIndex) {
	      var targetRow = this.props.data[rowIndex];
	      this.props.onRowMouseOut(targetRow);
	    }
	  }, {
	    key: 'handleRowMouseOver',
	    value: function handleRowMouseOver(rowIndex) {
	      var targetRow = this.props.data[rowIndex];
	      this.props.onRowMouseOver(targetRow);
	    }
	  }, {
	    key: 'handleRowClick',
	    value: function handleRowClick(rowIndex) {
	      var key, selectedRow;
	      this.props.data.forEach(function (row, i) {
	        if (i == rowIndex - 1) {
	          key = row[this.props.keyField];
	          selectedRow = row;
	        }
	      }, this);
	      this.props.onRowClick(selectedRow);
	    }
	  }, {
	    key: 'handleSelectRow',
	    value: function handleSelectRow(rowIndex, isSelected) {
	      var key, selectedRow;
	      this.props.data.forEach(function (row, i) {
	        if (i == rowIndex - 1) {
	          key = row[this.props.keyField];
	          selectedRow = row;
	          return false;
	        }
	      }, this);
	      this.props.onSelectRow(selectedRow, isSelected);
	    }
	  }, {
	    key: 'handleSelectRowColumChange',
	    value: function handleSelectRowColumChange(e) {
	      if (!this.props.selectRow.clickToSelect || !this.props.selectRow.clickToSelectAndEditCell) {
	        this.handleSelectRow(e.currentTarget.parentElement.parentElement.rowIndex + 1, e.currentTarget.checked);
	      }
	    }
	  }, {
	    key: 'handleEditCell',
	    value: function handleEditCell(rowIndex, columnIndex) {
	      this.editing = true;
	      if (this._isSelectRowDefined()) {
	        columnIndex--;
	        if (this.props.selectRow.hideSelectColumn) columnIndex++;
	      }
	      rowIndex--;
	      var stateObj = {
	        currEditCell: {
	          rid: rowIndex,
	          cid: columnIndex
	        }
	      };
	
	      if (this.props.selectRow.clickToSelectAndEditCell) {
	        this.handleSelectRow(rowIndex + 1, true);
	      }
	      this.setState(stateObj);
	    }
	  }, {
	    key: 'cancelEdit',
	    value: function cancelEdit() {
	      var currEditCell = this.state.currEditCell;
	      if (currEditCell) {
	        this.handleCompleteEditCell(null, currEditCell.rid, currEditCell.cid);
	      }
	    }
	  }, {
	    key: 'handleCompleteEditCell',
	    value: function handleCompleteEditCell(newVal, rowIndex, columnIndex) {
	      this.setState({ currEditCell: null });
	      if (null != newVal) this.props.cellEdit.__onCompleteEdit__(newVal, rowIndex, columnIndex);
	    }
	  }, {
	    key: 'renderSelectRowColumn',
	    value: function renderSelectRowColumn(selected) {
	      if (this.props.selectRow.mode == _Const2['default'].ROW_SELECT_SINGLE) {
	        return _react2['default'].createElement(
	          _TableColumn2['default'],
	          { dataAlign: 'center' },
	          _react2['default'].createElement('input', { type: 'radio', checked: selected, onChange: this.handleSelectRowColumChange.bind(this) })
	        );
	      } else {
	        return _react2['default'].createElement(
	          _TableColumn2['default'],
	          { dataAlign: 'center' },
	          _react2['default'].createElement('input', { type: 'checkbox', checked: selected, onChange: this.handleSelectRowColumChange.bind(this) })
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
	})(_react2['default'].Component);
	
	TableBody.propTypes = {
	  // height: React.PropTypes.string,
	  data: _react2['default'].PropTypes.array,
	  columns: _react2['default'].PropTypes.array,
	  striped: _react2['default'].PropTypes.bool,
	  bordered: _react2['default'].PropTypes.bool,
	  hover: _react2['default'].PropTypes.bool,
	  condensed: _react2['default'].PropTypes.bool,
	  keyField: _react2['default'].PropTypes.string,
	  selectedRowKeys: _react2['default'].PropTypes.array,
	  onRowClick: _react2['default'].PropTypes.func,
	  onSelectRow: _react2['default'].PropTypes.func,
	  noDataText: _react2['default'].PropTypes.string,
	  style: _react2['default'].PropTypes.object
	};
	exports['default'] = TableBody;
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var TableRow = (function (_React$Component) {
	  _inherits(TableRow, _React$Component);
	
	  function TableRow(props) {
	    _classCallCheck(this, TableRow);
	
	    _get(Object.getPrototypeOf(TableRow.prototype), 'constructor', this).call(this, props);
	    this.clickNum = 0;
	  }
	
	  _createClass(TableRow, [{
	    key: 'rowClick',
	    value: function rowClick(e) {
	      var _this = this;
	
	      if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT" && e.target.tagName !== "TEXTAREA") {
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
	    }
	  }, {
	    key: 'rowMouseOut',
	    value: function rowMouseOut(e) {
	      if (this.props.onRowMouseOut) {
	        this.props.onRowMouseOut(e.currentTarget.rowIndex);
	      }
	    }
	  }, {
	    key: 'rowMouseOver',
	    value: function rowMouseOver(e) {
	      if (this.props.onRowMouseOver) {
	        this.props.onRowMouseOver(e.currentTarget.rowIndex);
	      }
	    }
	  }, {
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
	            onMouseOver: this.rowMouseOver.bind(this),
	            onMouseOut: this.rowMouseOut.bind(this),
	            onClick: this.rowClick.bind(this) }),
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
	})(_react2['default'].Component);
	
	TableRow.propTypes = {
	  isSelected: _react2['default'].PropTypes.bool,
	  enableCellEdit: _react2['default'].PropTypes.bool,
	  onRowClick: _react2['default'].PropTypes.func,
	  onSelectRow: _react2['default'].PropTypes.func,
	  onRowMouseOut: _react2['default'].PropTypes.func,
	  onRowMouseOver: _react2['default'].PropTypes.func
	};
	TableRow.defaultProps = {
	  onRowClick: undefined
	};
	exports['default'] = TableRow;
	module.exports = exports['default'];

/***/ },
/* 11 */
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var TableColumn = (function (_React$Component) {
	  _inherits(TableColumn, _React$Component);
	
	  function TableColumn(props) {
	    _classCallCheck(this, TableColumn);
	
	    _get(Object.getPrototypeOf(TableColumn.prototype), 'constructor', this).call(this, props);
	  }
	
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
	    key: 'handleCellEdit',
	    value: function handleCellEdit(e) {
	      if (this.props.cellEdit.mode == _Const2['default'].CELL_EDIT_DBCLICK) {
	        if (document.selection && document.selection.empty) {
	          document.selection.empty();
	        } else if (window.getSelection) {
	          var sel = window.getSelection();
	          sel.removeAllRanges();
	        }
	      }
	      this.props.onEdit(e.currentTarget.parentElement.rowIndex + 1, e.currentTarget.cellIndex);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var tdStyle = {
	        textAlign: this.props.dataAlign,
	        display: this.props.hidden ? "none" : null
	      };
	
	      var opts = {};
	      if (this.props.cellEdit) {
	        if (this.props.cellEdit.mode == _Const2['default'].CELL_EDIT_CLICK) {
	          opts.onClick = this.handleCellEdit.bind(this);
	        } else if (this.props.cellEdit.mode == _Const2['default'].CELL_EDIT_DBCLICK) {
	          opts.onDoubleClick = this.handleCellEdit.bind(this);
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
	})(_react2['default'].Component);
	
	TableColumn.propTypes = {
	  dataAlign: _react2['default'].PropTypes.string,
	  hidden: _react2['default'].PropTypes.bool,
	  className: _react2['default'].PropTypes.string
	};
	
	TableColumn.defaultProps = {
	  dataAlign: "left",
	  hidden: false,
	  className: ""
	};
	exports['default'] = TableColumn;
	module.exports = exports['default'];

/***/ },
/* 12 */
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _Editor = __webpack_require__(13);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	var _NotificationJs = __webpack_require__(14);
	
	var _NotificationJs2 = _interopRequireDefault(_NotificationJs);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var TableEditColumn = (function (_React$Component) {
	    _inherits(TableEditColumn, _React$Component);
	
	    function TableEditColumn(props) {
	        _classCallCheck(this, TableEditColumn);
	
	        _get(Object.getPrototypeOf(TableEditColumn.prototype), 'constructor', this).call(this, props);
	        this.timeouteClear = 0;
	        this.state = {
	            shakeEditor: false
	        };
	    }
	
	    _createClass(TableEditColumn, [{
	        key: 'handleKeyPress',
	        value: function handleKeyPress(e) {
	            if (e.keyCode == 13) {
	                //Pressed ENTER
	                var value = e.currentTarget.type == 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;
	
	                if (!this.validator(value)) {
	                    return;
	                }
	                this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
	            } else if (e.keyCode == 27) {
	                this.props.completeEdit(null, this.props.rowIndex, this.props.colIndex);
	            }
	        }
	    }, {
	        key: 'handleBlur',
	        value: function handleBlur(e) {
	            if (this.props.blurToSave) {
	                var value = e.currentTarget.type == 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;
	                if (!this.validator(value)) {
	                    return;
	                }
	                this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
	            }
	        }
	    }, {
	        key: 'validator',
	        value: function validator(value) {
	            var ts = this;
	            if (ts.props.editable.validator) {
	                var valid = ts.props.editable.validator(value);
	                if (valid !== true) {
	                    ts.refs.notifier.notice('error', valid, "Pressed ESC can cancel");
	                    var input = ts.refs.inputRef;
	                    //animate input
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
	            if (this.timeouteClear != 0) {
	                clearTimeout(this.timeouteClear);
	                this.timeouteClear = 0;
	            }
	        })
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var input = this.refs.inputRef;
	            // input.value = this.props.children||'';
	            input.focus();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.clearTimeout();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var editable = this.props.editable,
	                format = this.props.format,
	                attr = {
	                ref: "inputRef",
	                onKeyDown: this.handleKeyPress.bind(this),
	                onBlur: this.handleBlur.bind(this)
	            };
	            //put placeholder if exist
	            editable.placeholder && (attr.placeholder = editable.placeholder);
	
	            var editorClass = (0, _classnames2['default'])({ 'animated': this.state.shakeEditor, 'shake': this.state.shakeEditor });
	            return _react2['default'].createElement(
	                'td',
	                { ref: 'td', style: { position: 'relative' } },
	                (0, _Editor2['default'])(editable, attr, format, editorClass, this.props.children || ''),
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
	})(_react2['default'].Component);
	
	TableEditColumn.propTypes = {
	    completeEdit: _react2['default'].PropTypes.func,
	    rowIndex: _react2['default'].PropTypes.number,
	    colIndex: _react2['default'].PropTypes.number,
	    blurToSave: _react2['default'].PropTypes.bool
	};
	
	exports['default'] = TableEditColumn;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Editor = function Editor(editable, attr, format, editorClass, defaultValue) {
	
	    if (editable === true || typeof editable === "string") {
	        //simple declare
	        var type = editable === true ? 'text' : editable;
	        return _react2['default'].createElement('input', _extends({}, attr, { type: type, defaultValue: defaultValue,
	            className: (editorClass || "") + " form-control editor edit-text" }));
	    } else if (!editable) {
	        var type = editable === true ? 'text' : editable;
	        return _react2['default'].createElement('input', _extends({}, attr, { type: type, defaultValue: defaultValue, disabled: 'disabled',
	            className: (editorClass || "") + " form-control editor edit-text" }));
	    } else if (editable.type) {
	        //standard declare
	        //put style if exist
	        editable.style && (attr.style = editable.style);
	
	        //put class if exist
	        attr.className = (editorClass || "") + " form-control editor edit-" + editable.type + (editable.className ? " " + editable.className : "");
	
	        if (editable.type === 'select') {
	            //process select input
	            var options = [],
	                values = editable.options.values;
	            if (Array.isArray(values)) {
	                //only can use arrray data for options
	                var rowValue;
	                options = values.map(function (d, i) {
	                    rowValue = format ? format(d) : d;
	                    return _react2['default'].createElement(
	                        'option',
	                        { key: 'option' + i, value: d },
	                        rowValue
	                    );
	                });
	            }
	            return _react2['default'].createElement(
	                'select',
	                _extends({}, attr, { defaultValue: defaultValue }),
	                options
	            );
	        } else if (editable.type === 'textarea') {
	            //process textarea input
	            //put  other if exist
	            editable.cols && (attr.cols = editable.cols);
	            editable.rows && (attr.rows = editable.rows);
	            var keyUpHandler = attr.onKeyDown,
	                saveBtn = null;
	            if (keyUpHandler) {
	                attr.onKeyDown = function (e) {
	                    if (e.keyCode != 13) {
	                        //not Pressed ENTER
	                        keyUpHandler(e);
	                    }
	                };
	                saveBtn = _react2['default'].createElement(
	                    'butto',
	                    { className: 'btn btn-info btn-xs textarea-save-btn', onClick: keyUpHandler },
	                    'save'
	                );
	            }
	
	            return _react2['default'].createElement(
	                'div',
	                null,
	                _react2['default'].createElement('textarea', _extends({}, attr, { defaultValue: defaultValue })),
	                saveBtn
	            );
	        } else if (editable.type === 'checkbox') {
	            var _values = 'true:false';
	            if (editable.options && editable.options.values) {
	                // values = editable.options.values.split(':');
	                _values = editable.options.values;
	            }
	            attr.className = attr.className.replace('form-control', '');
	            attr.className += ' checkbox pull-right';
	
	            var checked = defaultValue && defaultValue.toString() == _values.split(':')[0] ? true : false;
	
	            return _react2['default'].createElement('input', _extends({}, attr, { type: 'checkbox', value: _values, defaultChecked: checked }));
	        } else {
	            //process other input type. as password,url,email...
	            return _react2['default'].createElement('input', _extends({}, attr, { type: type, defaultValue: defaultValue }));
	        }
	    }
	    //default return for other case of editable
	    return _react2['default'].createElement('input', _extends({}, attr, { type: 'text', className: (editorClass || "") + " form-control editor edit-text" }));
	};
	
	exports['default'] = Editor;
	module.exports = exports['default'];

/***/ },
/* 14 */
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _reactToastr = __webpack_require__(15);
	
	var ToastrMessageFactory = _react2['default'].createFactory(_reactToastr.ToastMessage.animation);
	
	var Notification = (function (_React$Component) {
	  _inherits(Notification, _React$Component);
	
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
	        showAnimation: "animated  bounceIn",
	        hideAnimation: "animated bounceOut"
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_reactToastr.ToastContainer, { ref: 'toastr', toastMessageFactory: ToastrMessageFactory,
	        id: 'toast-container', className: 'toast-top-right' });
	    }
	  }]);
	
	  return Notification;
	})(_react2['default'].Component);
	
	exports['default'] = Notification;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ToastMessage = exports.ToastContainer = undefined;
	
	var _ToastContainer = __webpack_require__(16);
	
	var _ToastContainer2 = _interopRequireDefault(_ToastContainer);
	
	var _ToastMessage = __webpack_require__(23);
	
	var _ToastMessage2 = _interopRequireDefault(_ToastMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.ToastContainer = _ToastContainer2.default;
	exports.ToastMessage = _ToastMessage2.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsUpdate = __webpack_require__(17);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _ToastMessage = __webpack_require__(23);
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 18 */
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
	
	var assign = __webpack_require__(20);
	var keyOf = __webpack_require__(21);
	var invariant = __webpack_require__(22);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jQuery = exports.animation = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsUpdate = __webpack_require__(17);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _animationMixin = __webpack_require__(24);
	
	var _animationMixin2 = _interopRequireDefault(_animationMixin);
	
	var _jQueryMixin = __webpack_require__(29);
	
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _CSSCore = __webpack_require__(25);
	
	var _CSSCore2 = _interopRequireDefault(_CSSCore);
	
	var _ReactTransitionEvents = __webpack_require__(27);
	
	var _ReactTransitionEvents2 = _interopRequireDefault(_ReactTransitionEvents);
	
	var _reactDom = __webpack_require__(6);
	
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
	 * @providesModule CSSCore
	 * @typechecks
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(26);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 26 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 27 */
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
	
	var ExecutionEnvironment = __webpack_require__(28);
	
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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactDom = __webpack_require__(6);
	
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
	
	var _PageButtonJs = __webpack_require__(31);
	
	var _PageButtonJs2 = _interopRequireDefault(_PageButtonJs);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var PaginationList = (function (_React$Component) {
	  _inherits(PaginationList, _React$Component);
	
	  function PaginationList() {
	    _classCallCheck(this, PaginationList);
	
	    _get(Object.getPrototypeOf(PaginationList.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(PaginationList, [{
	    key: 'changePage',
	    value: function changePage(page) {
	      if (page == this.props.prePage) {
	        page = this.props.currPage - 1 < 1 ? 1 : this.props.currPage - 1;
	      } else if (page == this.props.nextPage) {
	        page = this.props.currPage + 1 > this.totalPages ? this.totalPages : this.props.currPage + 1;
	      } else if (page == this.props.lastPage) {
	        page = this.totalPages;
	      } else if (page == this.props.firstPage) {
	        page = 1;
	      } else {
	        page = parseInt(page);
	      }
	
	      if (page != this.props.currPage) {
	        this.props.changePage(page, this.props.sizePerPage);
	      }
	    }
	  }, {
	    key: 'changeSizePerPage',
	    value: function changeSizePerPage(e) {
	      e.preventDefault();
	
	      var selectSize = parseInt(e.currentTarget.text);
	      var currPage = this.props.currPage;
	
	      if (selectSize != this.props.sizePerPage) {
	        this.totalPages = Math.ceil(this.props.dataSize / selectSize);
	        if (currPage > this.totalPages) currPage = this.totalPages;
	
	        this.props.changePage(currPage, selectSize);
	        if (this.props.onSizePerPageList) {
	          this.props.onSizePerPageList(selectSize);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      this.totalPages = Math.ceil(this.props.dataSize / this.props.sizePerPage);
	      var pageBtns = this.makePage();
	      var pageListStyle = {
	        float: "right",
	        marginTop: "0px" //override the margin-top defined in .pagination class in bootstrap.
	      };
	
	      var sizePerPageList = this.props.sizePerPageList.map(function (sizePerPage) {
	        return _react2['default'].createElement(
	          'li',
	          { key: sizePerPage, role: 'presentation' },
	          _react2['default'].createElement(
	            'a',
	            { role: 'menuitem', tabIndex: '-1', href: '#', onClick: _this.changeSizePerPage.bind(_this) },
	            sizePerPage
	          )
	        );
	      });
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'row', style: { marginTop: 15 } },
	        this.props.sizePerPageList.length > 1 ? _react2['default'].createElement(
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
	                { className: 'btn btn-default dropdown-toggle', type: 'button', id: 'pageDropDown', 'data-toggle': 'dropdown',
	                  'aria-expanded': 'true' },
	                this.props.sizePerPage,
	                _react2['default'].createElement(
	                  'span',
	                  null,
	                  " ",
	                  _react2['default'].createElement('span', { className: 'caret' })
	                )
	              ),
	              _react2['default'].createElement(
	                'ul',
	                { className: 'dropdown-menu', role: 'menu', 'aria-labelledby': 'pageDropDown' },
	                sizePerPageList
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
	        if (this.props.currPage == 1 && (page === this.props.firstPage || page === this.props.prePage)) {
	          disabled = true;
	          hidden = true;
	        }
	        if (this.props.currPage == this.totalPages && (page === this.props.nextPage || page === this.props.lastPage)) {
	          disabled = true;
	          hidden = true;
	        }
	        return _react2['default'].createElement(
	          _PageButtonJs2['default'],
	          { changePage: this.changePage.bind(this), active: isActive, disable: disabled, hidden: hidden, key: page },
	          page
	        );
	      }, this);
	    }
	  }, {
	    key: 'getPages',
	    value: function getPages() {
	      var startPage = 1,
	          endPage = this.totalPages;
	
	      startPage = Math.max(this.props.currPage - Math.floor(this.props.paginationSize / 2), 1);
	      endPage = startPage + this.props.paginationSize - 1;
	
	      if (endPage > this.totalPages) {
	        endPage = this.totalPages;
	        startPage = endPage - this.props.paginationSize + 1;
	      }
	      var pages;
	      if (startPage != 1 && this.totalPages > this.props.paginationSize) {
	        pages = [this.props.firstPage, this.props.prePage];
	      } else if (this.totalPages > 1) {
	        pages = [this.props.prePage];
	      } else {
	        pages = [];
	      }
	      for (var i = startPage; i <= endPage; i++) {
	        if (i > 0) pages.push(i);
	      }
	      if (endPage != this.totalPages) {
	        pages.push(this.props.nextPage);
	        pages.push(this.props.lastPage);
	      } else if (this.totalPages > 1) {
	        pages.push(this.props.nextPage);
	      }
	      return pages;
	    }
	  }]);
	
	  return PaginationList;
	})(_react2['default'].Component);
	
	PaginationList.propTypes = {
	  currPage: _react2['default'].PropTypes.number,
	  sizePerPage: _react2['default'].PropTypes.number,
	  dataSize: _react2['default'].PropTypes.number,
	  changePage: _react2['default'].PropTypes.func,
	  sizePerPageList: _react2['default'].PropTypes.array,
	  paginationSize: _react2['default'].PropTypes.number,
	  remote: _react2['default'].PropTypes.bool,
	  onSizePerPageList: _react2['default'].PropTypes.func,
	  prePage: _react2['default'].PropTypes.string
	};
	
	PaginationList.defaultProps = {
	  sizePerPage: _Const2['default'].SIZE_PER_PAGE
	};
	
	exports['default'] = PaginationList;
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var PageButton = (function (_React$Component) {
	  _inherits(PageButton, _React$Component);
	
	  function PageButton(props) {
	    _classCallCheck(this, PageButton);
	
	    _get(Object.getPrototypeOf(PageButton.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(PageButton, [{
	    key: 'pageBtnClick',
	    value: function pageBtnClick(e) {
	      e.preventDefault();
	      this.props.changePage(e.currentTarget.textContent);
	    }
	  }, {
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
	          { href: '#', onClick: this.pageBtnClick.bind(this) },
	          this.props.children
	        )
	      );
	    }
	  }]);
	
	  return PageButton;
	})(_react2['default'].Component);
	
	PageButton.propTypes = {
	  changePage: _react2['default'].PropTypes.func,
	  active: _react2['default'].PropTypes.bool,
	  disable: _react2['default'].PropTypes.bool
	};
	
	exports['default'] = PageButton;
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _Editor = __webpack_require__(13);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	var _NotificationJs = __webpack_require__(14);
	
	var _NotificationJs2 = _interopRequireDefault(_NotificationJs);
	
	var ToolBar = (function (_React$Component) {
	  _inherits(ToolBar, _React$Component);
	
	  function ToolBar(props) {
	    var _this = this;
	
	    _classCallCheck(this, ToolBar);
	
	    _get(Object.getPrototypeOf(ToolBar.prototype), 'constructor', this).call(this, props);
	
	    this.handleShowOnlyToggle = function (e) {
	      _this.setState({
	        showSelected: !_this.state.showSelected
	      });
	      _this.props.onShowOnlySelected();
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
	      var ts = this,
	          newObj = {},
	          isValid = true,
	          tempValue,
	          tempMsg,
	          validateState = {};
	      this.props.columns.forEach(function (column, i) {
	        if (column.autoValue) {
	          //when you want same auto generate value and not allow edit, example ID field
	          tempValue = typeof column.autoValue == 'function' ? column.autoValue() : 'autovalue-' + new Date().getTime();
	        } else {
	          var dom = this.refs[column.field + i];
	          tempValue = dom.value;
	
	          if (column.editable && column.editable.type == 'checkbox') {
	            var values = dom.value.split(':');
	            tempValue = dom.checked ? values[0] : values[1];
	          }
	
	          if (column.editable && column.editable.validator) {
	            //process validate
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
	        ts.clearTimeout();
	        //show error in form and shake it
	        this.setState({ validateState: validateState, shakeEditor: true });
	        //notifier error
	        ts.refs.notifier.notice('error', "Form validate errors, please checking!", "Pressed ESC can cancel");
	        //clear animate class
	        ts.timeouteClear = setTimeout(function () {
	          ts.setState({ shakeEditor: false });
	        }, 300);
	        return null;
	      }
	    }
	  }, {
	    key: 'handleSaveBtnClick',
	    value: function handleSaveBtnClick(e) {
	      var _this2 = this;
	
	      var newObj = this.checkAndParseForm();
	      if (!newObj) {
	        //validate errors
	        return;
	      }
	      var msg = this.props.onAddRow(newObj);
	      if (msg) {
	        var ts = this;
	        ts.refs.notifier.notice('error', msg, "Pressed ESC can cancel");
	        ts.clearTimeout();
	        //shake form and hack prevent modal hide
	        ts.setState({ shakeEditor: true, validateState: "this is hack for prevent bootstrap modal hide" });
	        //clear animate class
	        ts.timeouteClear = setTimeout(function () {
	          ts.setState({ shakeEditor: false });
	        }, 300);
	      } else {
	        //reset state and hide modal hide
	        this.setState({
	          validateState: null,
	          shakeEditor: false
	        }, function () {
	          document.querySelector("." + "modal-backdrop").click();
	          document.querySelector("." + _this2.modalClassName).click();
	        });
	        //reset form
	        this.refs.form.reset();
	      }
	    }
	  }, {
	    key: 'handleDropRowBtnClick',
	    value: function handleDropRowBtnClick(e) {
	      this.props.onDropRow();
	    }
	  }, {
	    key: 'handleCloseBtn',
	    value: function handleCloseBtn(e) {
	      this.refs.warning.style.display = "none";
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      this.props.onSearch(e.currentTarget.value);
	    }
	  }, {
	    key: 'handleExportCSV',
	    value: function handleExportCSV() {
	      this.props.onExportCSV();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.modalClassName = "bs-table-modal-sm" + new Date().getTime();
	      var insertBtn = this.props.enableInsert ? _react2['default'].createElement(
	        'button',
	        { type: 'button', onClick: this.props.onAddRowBegin, className: 'btn btn-info react-bs-table-add-btn', 'data-toggle': 'modal', 'data-target': '.' + this.modalClassName },
	        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-plus' }),
	        ' New'
	      ) : null;
	
	      var deleteBtn = this.props.enableDelete ? _react2['default'].createElement(
	        'button',
	        { type: 'button', className: 'btn btn-warning react-bs-table-del-btn', 'data-toggle': 'tooltip', 'data-placement': 'right', title: 'Drop selected row',
	          onClick: this.handleDropRowBtnClick.bind(this) },
	        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-trash' }),
	        ' Delete'
	      ) : null;
	
	      var searchTextInput = this.renderSearchPanel();
	
	      var showSelectedOnlyBtn = this.props.enableShowOnlySelected ? _react2['default'].createElement(
	        'button',
	        { type: 'button', onClick: this.handleShowOnlyToggle.bind(this), className: 'btn btn-primary', 'data-toggle': 'button', 'aria-pressed': 'false' },
	        this.state.showSelected ? _Const2['default'].SHOW_ALL : _Const2['default'].SHOW_ONLY_SELECT
	      ) : null;
	
	      var modal = this.props.enableInsert ? this.renderInsertRowModal() : null;
	      var warningStyle = {
	        display: "none",
	        marginBottom: 0
	      };
	
	      var exportCSV = this.props.enableExportCSV ? _react2['default'].createElement(
	        'button',
	        { type: 'button', className: 'btn btn-success', onClick: this.handleExportCSV.bind(this) },
	        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-export' }),
	        ' Export to CSV'
	      ) : null;
	
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
	          _react2['default'].createElement('input', { ref: 'seachInput', className: 'form-control', type: 'text',
	            placeholder: this.props.searchPlaceholder ? this.props.searchPlaceholder : 'Search',
	            onKeyUp: this.handleKeyUp.bind(this) }),
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
	      var inputField = this.props.columns.map(function (column, i) {
	        var editable = column.editable,
	            format = column.format,
	            attr = { ref: column.field + i, placeholder: editable.placeholder ? editable.placeholder : column.name };
	
	        if (column.autoValue) {
	          //when you want same auto generate value and not allow edit, example ID field
	          return null;
	        }
	        var error = validateState[column.field] ? _react2['default'].createElement(
	          'span',
	          { className: 'help-block bg-danger' },
	          validateState[column.field]
	        ) : null;
	
	        // let editor = Editor(editable,attr,format);
	        // if(editor.props.type && editor.props.type == 'checkbox'){
	        return _react2['default'].createElement(
	          'div',
	          { className: 'form-group', key: column.field },
	          _react2['default'].createElement(
	            'label',
	            null,
	            column.name
	          ),
	          (0, _Editor2['default'])(editable, attr, format, ''),
	          error
	        );
	      });
	      var modalClass = (0, _classnames2['default'])("modal", "fade", this.modalClassName, {
	        'in': this.state.shakeEditor || this.state.validateState //hack prevent bootstrap modal hide by reRender
	      });
	      var dialogClass = (0, _classnames2['default'])("modal-dialog", "modal-sm", {
	        "animated": this.state.shakeEditor,
	        "shake": this.state.shakeEditor
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
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
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
	                { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
	                'Close'
	              ),
	              _react2['default'].createElement(
	                'button',
	                { type: 'button', className: 'btn btn-info', onClick: this.handleSaveBtnClick.bind(this) },
	                'Save'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ToolBar;
	})(_react2['default'].Component);
	
	ToolBar.propTypes = {
	  onAddRow: _react2['default'].PropTypes.func,
	  onDropRow: _react2['default'].PropTypes.func,
	  onShowOnlySelected: _react2['default'].PropTypes.func,
	  enableInsert: _react2['default'].PropTypes.bool,
	  enableDelete: _react2['default'].PropTypes.bool,
	  enableSearch: _react2['default'].PropTypes.bool,
	  enableShowOnlySelected: _react2['default'].PropTypes.bool,
	  columns: _react2['default'].PropTypes.array,
	  searchPlaceholder: _react2['default'].PropTypes.string,
	  clearSearch: _react2['default'].PropTypes.bool
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
/* 33 */
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var TableFilter = (function (_React$Component) {
	  _inherits(TableFilter, _React$Component);
	
	  function TableFilter(props) {
	    _classCallCheck(this, TableFilter);
	
	    _get(Object.getPrototypeOf(TableFilter.prototype), 'constructor', this).call(this, props);
	    this.filterObj = {};
	  }
	
	  _createClass(TableFilter, [{
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      if (e.currentTarget.value.trim() === "") delete this.filterObj[e.currentTarget.name];else this.filterObj[e.currentTarget.name] = e.currentTarget.value;
	
	      this.props.onFilter(this.filterObj);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var tableClasses = (0, _classnames2['default'])("table", {
	        'table-striped': this.props.striped,
	        'table-condensed': this.props.condensed
	      });
	      var selectRowHeader = null;
	
	      if (this.props.rowSelectType == _Const2['default'].ROW_SELECT_SINGLE || this.props.rowSelectType == _Const2['default'].ROW_SELECT_MULTI) {
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
	      var filterField = this.props.columns.map(function (column) {
	        var thStyle = {
	          display: column.hidden ? "none" : null,
	          width: column.width
	        };
	        return _react2['default'].createElement(
	          'th',
	          { key: column.name, style: thStyle },
	          _react2['default'].createElement(
	            'div',
	            { className: 'th-inner table-header-column' },
	            _react2['default'].createElement('input', { size: '10', type: 'text', placeholder: column.name, name: column.name, onKeyUp: this.handleKeyUp.bind(this) })
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
	})(_react2['default'].Component);
	
	TableFilter.propTypes = {
	  columns: _react2['default'].PropTypes.array,
	  rowSelectType: _react2['default'].PropTypes.string,
	  onFilter: _react2['default'].PropTypes.func
	};
	exports['default'] = TableFilter;
	module.exports = exports['default'];

/***/ },
/* 34 */
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var EventEmitter = __webpack_require__(35).EventEmitter;
	
	function _sort(arr, sortField, order, sortFunc) {
	  order = order.toLowerCase();
	  arr.sort(function (a, b) {
	    if (sortFunc) {
	      return sortFunc(a, b, order, sortField);
	    } else {
	      if (order == _Const2['default'].SORT_DESC) {
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
	        if (null !== this.filterObj) this.filter(this.filterObj);
	        if (null !== this.searchText) this.search(this.searchText);
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
	      this.sortObj = {
	        order: order,
	        sortField: sortField
	      };
	
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
	        if (null !== this.filterObj) this.filter(this.filterObj);
	        if (null !== this.searchText) this.search(this.searchText);
	      }
	      return this;
	    }
	  }, {
	    key: 'addAtBegin',
	    value: function addAtBegin(newObj) {
	      if (!newObj[this.keyField] || newObj[this.keyField].toString() === '') {
	        throw this.keyField + " can't be empty value.";
	      }
	      var currentDisplayData = this.getCurrentDisplayData();
	      currentDisplayData.forEach(function (row) {
	        if (row[this.keyField].toString() === newObj[this.keyField].toString()) {
	          throw this.keyField + " " + newObj[this.keyField] + " already exists";
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
	        throw this.keyField + " can't be empty value.";
	      }
	      var currentDisplayData = this.getCurrentDisplayData();
	      currentDisplayData.forEach(function (row) {
	        if (row[this.keyField].toString() === newObj[this.keyField].toString()) {
	          throw this.keyField + " " + newObj[this.keyField] + " already exists";
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
	      var currentDisplayData = this.getCurrentDisplayData();
	      var result = currentDisplayData.filter(function (row) {
	        return rowKey.indexOf(row[this.keyField]) == -1;
	      }, this);
	
	      if (this.isOnFilter) {
	        this.data = this.data.filter(function (row) {
	          return rowKey.indexOf(row[this.keyField]) == -1;
	        }, this);
	        this.filteredData = result;
	      } else {
	        this.data = result;
	      }
	    }
	  }, {
	    key: 'filter',
	    value: function filter(filterObj) {
	      var _this2 = this;
	
	      if (Object.keys(filterObj).length == 0) {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.filterObj = null;
	        if (null !== this.searchText) this.search(this.searchText);
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
	                  filterVal = typeof filterObj[key].value === "object" ? undefined : typeof filterObj[key].value === "string" ? filterObj[key].value.toLowerCase() : filterObj[key].value;
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.REGEX:
	                {
	                  filterVal = filterObj[key].value;
	                  break;
	                }
	              default:
	                {
	                  filterVal = typeof filterObj[key].value === "string" ? filterObj[key].value.toLowerCase() : filterObj[key].value;
	                  if (filterVal === undefined) {
	                    // Support old filter
	                    filterVal = filterObj[key].toLowerCase();
	                  }
	                  break;
	                }
	            }
	
	            if (_this2.colInfos[key]) {
	              var _colInfos$key = _this2.colInfos[key];
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
	                  valid = _this2.filterNumber(targetVal, filterVal, filterObj[key].value.comparator);
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.DATE:
	                {
	                  valid = _this2.filterDate(targetVal, filterVal);
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.REGEX:
	                {
	                  valid = _this2.filterRegex(targetVal, filterVal);
	                  break;
	                }
	              case _Const2['default'].FILTER_TYPE.CUSTOM:
	                {
	                  valid = _this2.filterCustom(targetVal, filterVal, filterObj[key].value);
	                  break;
	                }
	              default:
	                {
	                  valid = _this2.filterText(targetVal, filterVal);
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
	        case "=":
	          {
	            if (targetVal != filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case ">":
	          {
	            if (targetVal <= filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case ">=":
	          {
	            if (targetVal < filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case "<":
	          {
	            if (targetVal >= filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case "<=":
	          {
	            if (targetVal > filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        case "!=":
	          {
	            if (targetVal == filterVal) {
	              valid = false;
	            }
	            break;
	          }
	        default:
	          {
	            console.error("Number comparator provided is not supported");
	            break;
	          }
	      }
	      return valid;
	    }
	  }, {
	    key: 'filterDate',
	    value: function filterDate(targetVal, filterVal) {
	      return targetVal.getDate() == filterVal.getDate() && targetVal.getMonth() == filterVal.getMonth() && targetVal.getFullYear() == filterVal.getFullYear();
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
	      if (callbackInfo != null && typeof callbackInfo === "object") {
	        return callbackInfo.callback(targetVal, callbackInfo.callbackParameters);
	      }
	
	      return filterText(targetVal, filterVal);
	    }
	  }, {
	    key: 'filterText',
	    value: function filterText(targetVal, filterVal) {
	      if (targetVal.toString().toLowerCase().indexOf(filterVal) == -1) {
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
	      var _this3 = this;
	
	      if (searchText.trim() === "") {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.searchText = null;
	        if (null !== this.filterObj) this.filter(this.filterObj);
	      } else {
	        (function () {
	          _this3.searchText = searchText;
	          var searchTextArray = [];
	
	          if (_this3.multiColumnSearch) {
	            searchTextArray = searchText.split(' ');
	          } else {
	            searchTextArray.push(searchText);
	          }
	
	          var source = _this3.isOnFilter ? _this3.filteredData : _this3.data;
	
	          _this3.filteredData = source.filter(function (row) {
	            var keys = Object.keys(row);
	            var valid = false;
	            // for loops are ugly, but performance matters here.
	            // And you cant break from a forEach.
	            // http://jsperf.com/for-vs-foreach/66
	            for (var i = 0, keysLength = keys.length; i < keysLength; i++) {
	              var key = keys[i];
	              if (_this3.colInfos[key] && row[key]) {
	                var _colInfos$key2 = _this3.colInfos[key];
	                var format = _colInfos$key2.format;
	                var filterFormatted = _colInfos$key2.filterFormatted;
	                var formatExtraData = _colInfos$key2.formatExtraData;
	                var searchable = _colInfos$key2.searchable;
	                var hidden = _colInfos$key2.hidden;
	
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
	          _this3.isOnFilter = true;
	        })();
	      }
	    }
	  }, {
	    key: 'getDataIgnoringPagination',
	    value: function getDataIgnoringPagination() {
	      var _data = this.getCurrentDisplayData();
	      return _data;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      var _data = this.getCurrentDisplayData();
	
	      if (_data.length == 0) return _data;
	
	      if (this.remote || !this.enablePagination) {
	        return _data;
	      } else {
	        var result = [];
	        for (var i = this.pageObj.start; i <= this.pageObj.end; i++) {
	          result.push(_data[i]);
	          if (i + 1 == _data.length) break;
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
	      return this.data.map(function (row) {
	        return row[this.keyField];
	      }, this);
	    }
	  }]);
	
	  return TableDataStore;
	})();
	
	exports.TableDataStore = TableDataStore;
	
	;

/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	if (typeof window !== 'undefined') {
	  var filesaver = __webpack_require__(37);
	  var saveAs = filesaver.saveAs;
	}
	
	function toString(data, keys) {
	  var dataString = "";
	  if (data.length === 0) return dataString;
	
	  dataString += keys.join(',') + '\n';
	
	  data.map(function (row) {
	    keys.map(function (col, i) {
	      var cell = typeof row[col] !== 'undefined' ? '"' + row[col] + '"' : "";
	      dataString += cell;
	      if (i + 1 < keys.length) dataString += ',';
	    });
	
	    dataString += '\n';
	  });
	
	  return dataString;
	};
	
	var exportCSV = function exportCSV(data, keys, filename) {
	  var dataString = toString(data, keys);
	  if (typeof window !== 'undefined') {
	    saveAs(new Blob([dataString], { type: "text/plain;charset=utf-8" }), filename || 'spreadsheet.csv');
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var EventEmitter = __webpack_require__(35).EventEmitter;
	
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
	
	            if (value != null && typeof value === 'object') {
	                // value of the filter is an object
	                var hasValue = true;
	                for (var prop in value) {
	                    if (!value[prop] || value[prop] === "") {
	                        hasValue = false;
	                        break;
	                    }
	                }
	                // if one of the object properties is undefined or empty, we remove the filter
	                hasValue ? this.currentFilter[dataField] = { value: value, type: filterType } : delete this.currentFilter[dataField];
	            } else if (!value || value.trim() === "") {
	                delete this.currentFilter[dataField];
	            } else {
	                this.currentFilter[dataField] = { value: value.trim(), type: filterType };
	            }
	            this.emit('onFilterChange', this.currentFilter);
	        }
	    }]);
	
	    return Filter;
	})(EventEmitter);
	
	exports.Filter = Filter;

/***/ },
/* 41 */
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var _util = __webpack_require__(7);
	
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
	
	var TableHeaderColumn = (function (_React$Component) {
	  _inherits(TableHeaderColumn, _React$Component);
	
	  function TableHeaderColumn(props) {
	    _classCallCheck(this, TableHeaderColumn);
	
	    _get(Object.getPrototypeOf(TableHeaderColumn.prototype), 'constructor', this).call(this, props);
	    this.handleFilter = this.handleFilter.bind(this);
	  }
	
	  _createClass(TableHeaderColumn, [{
	    key: 'handleColumnClick',
	    value: function handleColumnClick(e) {
	      if (!this.props.dataSort) return;
	      var order = this.props.sort == _Const2['default'].SORT_DESC ? _Const2['default'].SORT_ASC : _Const2['default'].SORT_DESC;
	      this.props.onSort(order, this.props.dataField);
	    }
	  }, {
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
	            return _react2['default'].createElement(_filtersText2['default'], _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.REGEX:
	          {
	            return _react2['default'].createElement(_filtersRegex2['default'], _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.SELECT:
	          {
	            return _react2['default'].createElement(_filtersSelect2['default'], _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.NUMBER:
	          {
	            return _react2['default'].createElement(_filtersNumber2['default'], _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
	          }
	        case _Const2['default'].FILTER_TYPE.DATE:
	          {
	            return _react2['default'].createElement(_filtersDate2['default'], _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
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
	      this.refs["header-col"].setAttribute("data-field", this.props.dataField);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var defaultCaret = undefined;
	      var thStyle = {
	        textAlign: this.props.dataAlign,
	        display: this.props.hidden ? "none" : null
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
	
	      var classes = this.props.className + " " + (this.props.dataSort ? "sort-column" : "");
	      return _react2['default'].createElement(
	        'th',
	        { ref: 'header-col',
	          className: classes,
	          style: thStyle,
	          title: this.props.children,
	          onClick: this.handleColumnClick.bind(this) },
	        this.props.children,
	        sortCaret,
	        this.props.filter ? this.getFilters() : null
	      );
	    }
	  }]);
	
	  return TableHeaderColumn;
	})(_react2['default'].Component);
	
	var filterTypeArray = [];
	for (var key in _Const2['default'].FILTER_TYPE) {
	  filterTypeArray.push(_Const2['default'].FILTER_TYPE[key]);
	}
	
	TableHeaderColumn.propTypes = {
	  dataField: _react2['default'].PropTypes.string,
	  dataAlign: _react2['default'].PropTypes.string,
	  dataSort: _react2['default'].PropTypes.bool,
	  onSort: _react2['default'].PropTypes.func,
	  dataFormat: _react2['default'].PropTypes.func,
	  isKey: _react2['default'].PropTypes.bool,
	  editable: _react2['default'].PropTypes.any,
	  hidden: _react2['default'].PropTypes.bool,
	  searchable: _react2['default'].PropTypes.bool,
	  className: _react2['default'].PropTypes.string,
	  width: _react2['default'].PropTypes.string,
	  sortFunc: _react2['default'].PropTypes.func,
	  columnClassName: _react2['default'].PropTypes.any,
	  filterFormatted: _react2['default'].PropTypes.bool,
	  sort: _react2['default'].PropTypes.string,
	  formatExtraData: _react2['default'].PropTypes.any,
	  filter: _react2['default'].PropTypes.shape({
	    type: _react2['default'].PropTypes.oneOf(filterTypeArray),
	    delay: _react2['default'].PropTypes.number,
	    options: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, // for SelectFilter
	    _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.number) //for NumberFilter
	    ]),
	    numberComparators: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
	    emitter: _react2['default'].PropTypes.object,
	    placeholder: _react2['default'].PropTypes.string,
	    getElement: _react2['default'].PropTypes.func,
	    customFilterParameters: _react2['default'].PropTypes.object
	  }),
	  sortIndicator: _react2['default'].PropTypes.bool
	};
	
	TableHeaderColumn.defaultProps = {
	  dataAlign: "left",
	  dataSort: false,
	  dataFormat: undefined,
	  isKey: false,
	  editable: true,
	  onSort: undefined,
	  hidden: false,
	  searchable: true,
	  className: "",
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var DateFilter = (function (_React$Component) {
	    _inherits(DateFilter, _React$Component);
	
	    function DateFilter(props) {
	        _classCallCheck(this, DateFilter);
	
	        _get(Object.getPrototypeOf(DateFilter.prototype), 'constructor', this).call(this, props);
	        this.filter = this.filter.bind(this);
	    }
	
	    _createClass(DateFilter, [{
	        key: 'setDefaultDate',
	        value: function setDefaultDate() {
	            var defaultDate = "";
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
	})(_react2['default'].Component);
	
	;
	
	DateFilter.propTypes = {
	    filterHandler: _react2['default'].PropTypes.func.isRequired,
	    defaultValue: _react2['default'].PropTypes.object,
	    columnName: _react2['default'].PropTypes.string
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var TextFilter = (function (_React$Component) {
		_inherits(TextFilter, _React$Component);
	
		function TextFilter(props) {
			_classCallCheck(this, TextFilter);
	
			_get(Object.getPrototypeOf(TextFilter.prototype), 'constructor', this).call(this, props);
			this.filter = this.filter.bind(this);
			this.timeout = null;
		}
	
		_createClass(TextFilter, [{
			key: 'filter',
			value: function filter(event) {
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
				var self = this;
				var filterValue = event.target.value;
				this.timeout = setTimeout(function () {
					self.props.filterHandler(filterValue, _Const2['default'].FILTER_TYPE.TEXT);
				}, self.props.delay);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (this.refs.inputText.defaultValue) {
					this.props.filterHandler(this.refs.inputText.defaultValue, _Const2['default'].FILTER_TYPE.TEXT);
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
				return _react2['default'].createElement('input', { ref: 'inputText',
					className: 'filter text-filter form-control',
					type: 'text',
					onChange: this.filter,
					placeholder: this.props.placeholder || 'Enter ' + this.props.columnName + '...',
					defaultValue: this.props.defaultValue ? this.props.defaultValue : "" });
			}
		}]);
	
		return TextFilter;
	})(_react2['default'].Component);
	
	;
	
	TextFilter.propTypes = {
		filterHandler: _react2['default'].PropTypes.func.isRequired,
		defaultValue: _react2['default'].PropTypes.string,
		delay: _react2['default'].PropTypes.number,
		placeholder: _react2['default'].PropTypes.string,
		columnName: _react2['default'].PropTypes.string
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
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var RegexFilter = (function (_React$Component) {
		_inherits(RegexFilter, _React$Component);
	
		function RegexFilter(props) {
			_classCallCheck(this, RegexFilter);
	
			_get(Object.getPrototypeOf(RegexFilter.prototype), 'constructor', this).call(this, props);
			this.filter = this.filter.bind(this);
			this.timeout = null;
		}
	
		_createClass(RegexFilter, [{
			key: 'filter',
			value: function filter(event) {
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
				var self = this;
				var filterValue = event.target.value;
				this.timeout = setTimeout(function () {
					self.props.filterHandler(filterValue, _Const2['default'].FILTER_TYPE.REGEX);
				}, self.props.delay);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (this.refs.inputText.defaultValue) {
					this.props.filterHandler(this.refs.inputText.defaultValue, _Const2['default'].FILTER_TYPE.REGEX);
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
				return _react2['default'].createElement('input', { ref: 'inputText',
					className: 'filter text-filter form-control',
					type: 'text',
					onChange: this.filter,
					placeholder: this.props.placeholder || 'Enter Regex for ' + this.props.columnName + '...',
					defaultValue: this.props.defaultValue ? this.props.defaultValue : "" });
			}
		}]);
	
		return RegexFilter;
	})(_react2['default'].Component);
	
	;
	
	RegexFilter.propTypes = {
		filterHandler: _react2['default'].PropTypes.func.isRequired,
		defaultValue: _react2['default'].PropTypes.string,
		delay: _react2['default'].PropTypes.number,
		placeholder: _react2['default'].PropTypes.string,
		columnName: _react2['default'].PropTypes.string
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var SelectFilter = (function (_React$Component) {
		_inherits(SelectFilter, _React$Component);
	
		function SelectFilter(props) {
			_classCallCheck(this, SelectFilter);
	
			_get(Object.getPrototypeOf(SelectFilter.prototype), 'constructor', this).call(this, props);
			this.filter = this.filter.bind(this);
			this.state = {
				isPlaceholderSelected: this.props.defaultValue == undefined || !this.props.options.hasOwnProperty(this.props.defaultValue)
			};
		}
	
		_createClass(SelectFilter, [{
			key: 'filter',
			value: function filter(event) {
				this.setState({ isPlaceholderSelected: event.target.value === "" });
				this.props.filterHandler(event.target.value, _Const2['default'].FILTER_TYPE.SELECT);
			}
		}, {
			key: 'getOptions',
			value: function getOptions() {
				var optionTags = [];
				var options = this.props.options;
				optionTags.push(_react2['default'].createElement(
					'option',
					{ key: '-1', value: '' },
					this.props.placeholder || 'Select ' + this.props.columnName + '...'
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
				if (this.refs.selectInput.value) {
					this.props.filterHandler(this.refs.selectInput.value, _Const2['default'].FILTER_TYPE.SELECT);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var selectClass = (0, _classnames2['default'])("filter", "select-filter", "form-control", { "placeholder-selected": this.state.isPlaceholderSelected });
	
				return _react2['default'].createElement(
					'select',
					{ ref: 'selectInput',
						className: selectClass,
						onChange: this.filter,
						defaultValue: this.props.defaultValue != undefined ? this.props.defaultValue : "" },
					this.getOptions()
				);
			}
		}]);
	
		return SelectFilter;
	})(_react2['default'].Component);
	
	;
	
	SelectFilter.propTypes = {
		filterHandler: _react2['default'].PropTypes.func.isRequired,
		options: _react2['default'].PropTypes.object.isRequired,
		placeholder: _react2['default'].PropTypes.string,
		columnName: _react2['default'].PropTypes.string
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Const = __webpack_require__(4);
	
	var _Const2 = _interopRequireDefault(_Const);
	
	var legalComparators = ["=", ">", ">=", "<", "<=", "!="];
	
	var NumberFilter = (function (_React$Component) {
	    _inherits(NumberFilter, _React$Component);
	
	    function NumberFilter(props) {
	        _classCallCheck(this, NumberFilter);
	
	        _get(Object.getPrototypeOf(NumberFilter.prototype), 'constructor', this).call(this, props);
	        this.numberComparators = this.props.numberComparators || legalComparators;
	        this.timeout = null;
	        this.state = {
	            isPlaceholderSelected: this.props.defaultValue == undefined || this.props.defaultValue.number == undefined || this.props.options && this.props.options.indexOf(this.props.defaultValue.number) == -1
	        };
	        this.onChangeNumber = this.onChangeNumber.bind(this);
	        this.onChangeNumberSet = this.onChangeNumberSet.bind(this);
	        this.onChangeComparator = this.onChangeComparator.bind(this);
	    }
	
	    _createClass(NumberFilter, [{
	        key: 'onChangeNumber',
	        value: function onChangeNumber(event) {
	            if (this.refs.numberFilterComparator.value === "") {
	                return;
	            }
	            if (this.timeout) {
	                clearTimeout(this.timeout);
	            }
	            var self = this;
	            var filterValue = event.target.value;
	            this.timeout = setTimeout(function () {
	                self.props.filterHandler({ number: filterValue, comparator: self.refs.numberFilterComparator.value }, _Const2['default'].FILTER_TYPE.NUMBER);
	            }, self.props.delay);
	        }
	    }, {
	        key: 'onChangeNumberSet',
	        value: function onChangeNumberSet(event) {
	            this.setState({ isPlaceholderSelected: event.target.value === "" });
	            if (this.refs.numberFilterComparator.value === "") {
	                return;
	            }
	            this.props.filterHandler({ number: event.target.value, comparator: this.refs.numberFilterComparator.value }, _Const2['default'].FILTER_TYPE.NUMBER);
	        }
	    }, {
	        key: 'onChangeComparator',
	        value: function onChangeComparator(event) {
	            if (this.refs.numberFilter.value === "") {
	                return;
	            }
	            this.props.filterHandler({ number: this.refs.numberFilter.value, comparator: event.target.value }, _Const2['default'].FILTER_TYPE.NUMBER);
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
	            };
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
	            };
	            return optionTags;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.refs.numberFilterComparator.value && this.refs.numberFilter.value) {
	                this.props.filterHandler({ number: this.refs.numberFilter.value,
	                    comparator: this.refs.numberFilterComparator.value }, _Const2['default'].FILTER_TYPE.NUMBER);
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
	            var selectClass = (0, _classnames2['default'])("select-filter", "number-filter-input", "form-control", { "placeholder-selected": this.state.isPlaceholderSelected });
	
	            return _react2['default'].createElement(
	                'div',
	                { className: 'filter number-filter' },
	                _react2['default'].createElement(
	                    'select',
	                    { ref: 'numberFilterComparator',
	                        className: 'number-filter-comparator form-control',
	                        onChange: this.onChangeComparator,
	                        defaultValue: this.props.defaultValue ? this.props.defaultValue.comparator : "" },
	                    this.getComparatorOptions()
	                ),
	                this.props.options ? _react2['default'].createElement(
	                    'select',
	                    { ref: 'numberFilter',
	                        className: selectClass,
	                        onChange: this.onChangeNumberSet,
	                        defaultValue: this.props.defaultValue ? this.props.defaultValue.number : "" },
	                    this.getNumberOptions()
	                ) : _react2['default'].createElement('input', { ref: 'numberFilter',
	                    type: 'number',
	                    className: 'number-filter-input form-control',
	                    placeholder: this.props.placeholder || 'Enter ' + this.props.columnName + '...',
	                    onChange: this.onChangeNumber,
	                    defaultValue: this.props.defaultValue ? this.props.defaultValue.number : "" })
	            );
	        }
	    }]);
	
	    return NumberFilter;
	})(_react2['default'].Component);
	
	;
	
	NumberFilter.propTypes = {
	    filterHandler: _react2['default'].PropTypes.func.isRequired,
	    options: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.number),
	    defaultValue: _react2['default'].PropTypes.shape({
	        number: _react2['default'].PropTypes.number,
	        comparator: _react2['default'].PropTypes.oneOf(legalComparators)
	    }),
	    delay: _react2['default'].PropTypes.number,
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
	                return new Error('Number comparator provided is not supported. Use only ' + legalComparators);
	            }
	        }
	    },
	    placeholder: _react2['default'].PropTypes.string,
	    columnName: _react2['default'].PropTypes.string
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYjQzZTdjNWVjNzQ4NDAzN2Q3MyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlSGVhZGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdERPTVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RSb3dIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVSb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQ29sdW1uLmpzIiwid2VicGFjazovLy8uL3NyYy9UYWJsZUVkaXRDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvYW5pbWF0aW9uTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9DU1NDb3JlLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy90b29sYmFyL1Rvb2xCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbGVzYXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbHRlcnMvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9UZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1JlZ2V4LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9OdW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7MkNDdEMyQixDQUFrQjs7Ozs4Q0FDZixFQUFxQjs7OztnREFDeEIsRUFBd0I7O0FBRW5ELEtBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQy9CLFNBQU0sQ0FBQyxjQUFjLDhCQUFpQixDQUFDO0FBQ3ZDLFNBQU0sQ0FBQyxpQkFBaUIsaUNBQW9CLENBQUM7QUFDN0MsU0FBTSxDQUFDLFlBQVksb0NBQWUsQ0FBQztFQUNwQztzQkFDYztBQUNiLGlCQUFjO0FBQ2Qsb0JBQWlC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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBRztBQUNILHFCQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QU0sU0FBUyxDQUFDLE1BQU07QUFDOUIsbUJBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO01BQ3RELENBQUM7QUFDRixVQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0Isc0JBQWlCLEVBQUUsMkJBQVMsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUN6QyxhQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2xCLG9CQUFPO1VBQ1Y7QUFDRCxjQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxpQkFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDOUIsa0JBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUMscUJBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzVDLHNDQUFpQixHQUFHLElBQUksQ0FBQztBQUN6QiwyQkFBTTtrQkFDVDtjQUNKO0FBQ0QsaUJBQUksQ0FBQyxpQkFBaUIsRUFBRTtBQUNwQix3QkFBTyxJQUFJLEtBQUssNERBQTBELGdCQUFnQixDQUFHLENBQUM7Y0FDakc7VUFDSjtNQUNKO0FBQ0QsZ0JBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDckMsQ0FBQzs7QUFFRixhQUFZLENBQUMsWUFBWSxHQUFHO0FBQ3hCLFVBQUssRUFBRSxtQkFBTSxZQUFZO0VBQzVCLENBQUM7O3NCQUVhLFlBQVkiLCJmaWxlIjoicmVhY3QtYm9vdHN0cmFwLXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RCb290c3RyYXBUYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEJvb3RzdHJhcFRhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJSZWFjdERPTVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJiNDNlN2M1ZWM3NDg0MDM3ZDczXG4gKiovIiwiaW1wb3J0IEJvb3RzdHJhcFRhYmxlIGZyb20gJy4vQm9vdHN0cmFwVGFibGUnO1xuaW1wb3J0IFRhYmxlSGVhZGVyQ29sdW1uIGZyb20gJy4vVGFibGVIZWFkZXJDb2x1bW4nO1xuaW1wb3J0IHtUYWJsZURhdGFTZXR9IGZyb20gJy4vc3RvcmUvVGFibGVEYXRhU3RvcmUnO1xuXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG4gIHdpbmRvdy5Cb290c3RyYXBUYWJsZSA9IEJvb3RzdHJhcFRhYmxlO1xuICB3aW5kb3cuVGFibGVIZWFkZXJDb2x1bW4gPSBUYWJsZUhlYWRlckNvbHVtbjtcbiAgd2luZG93LlRhYmxlRGF0YVNldCA9IFRhYmxlRGF0YVNldDtcbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQm9vdHN0cmFwVGFibGUsXG4gIFRhYmxlSGVhZGVyQ29sdW1uLFxuICBUYWJsZURhdGFTZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVGFibGVIZWFkZXIgZnJvbSAnLi9UYWJsZUhlYWRlcic7XG5pbXBvcnQgVGFibGVCb2R5IGZyb20gJy4vVGFibGVCb2R5JztcbmltcG9ydCBQYWdpbmF0aW9uTGlzdCBmcm9tICcuL3BhZ2luYXRpb24vUGFnaW5hdGlvbkxpc3QnO1xuaW1wb3J0IFRvb2xCYXIgZnJvbSAnLi90b29sYmFyL1Rvb2xCYXInO1xuaW1wb3J0IFRhYmxlRmlsdGVyIGZyb20gJy4vVGFibGVGaWx0ZXInO1xuaW1wb3J0IHtUYWJsZURhdGFTdG9yZX0gZnJvbSAnLi9zdG9yZS9UYWJsZURhdGFTdG9yZSc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IGV4cG9ydENTViBmcm9tICcuL2Nzdl9leHBvcnRfdXRpbCc7XG5pbXBvcnQge0ZpbHRlcn0gZnJvbSAnLi9GaWx0ZXInO1xuXG5jbGFzcyBCb290c3RyYXBUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pc0lFID0gZmFsc2U7XG4gICAgdGhpcy5fYXR0YWNoQ2VsbEVkaXRGdW5jKCk7XG4gICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICB0aGlzLmlzSUUgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmRhdGEpKSB7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IFRhYmxlRGF0YVN0b3JlKHRoaXMucHJvcHMuZGF0YS5nZXREYXRhKCkpO1xuICAgICAgdGhpcy5wcm9wcy5kYXRhLmNsZWFyKCk7XG4gICAgICB0aGlzLnByb3BzLmRhdGEub24oJ2NoYW5nZScsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5nZXRUYWJsZURhdGEoKVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjb3B5ID0gdGhpcy5wcm9wcy5kYXRhLnNsaWNlKCk7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IFRhYmxlRGF0YVN0b3JlKGNvcHkpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdFRhYmxlKHRoaXMucHJvcHMpO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuZmlsdGVyLm9uKCdvbkZpbHRlckNoYW5nZScsIChjdXJyZW50RmlsdGVyKSA9PiB7XG4gICAgICAgIHNlbGYuaGFuZGxlRmlsdGVyRGF0YShjdXJyZW50RmlsdGVyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdyAmJiB0aGlzLnByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZCkge1xuICAgICAgbGV0IGNvcHkgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZC5zbGljZSgpO1xuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjb3B5KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0YTogdGhpcy5nZXRUYWJsZURhdGEoKSxcbiAgICAgIGN1cnJQYWdlOiB0aGlzLnByb3BzLm9wdGlvbnMucGFnZSB8fCAxLFxuICAgICAgc2l6ZVBlclBhZ2U6IHRoaXMucHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZSB8fCBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1RbMF0sXG4gICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKClcbiAgICB9O1xuICB9XG5cbiAgaW5pdFRhYmxlKHByb3BzKXtcbiAgICBsZXQge2tleUZpZWxkfSA9IHByb3BzO1xuXG4gICAgY29uc3QgaXNLZXlGaWVsZERlZmluZWQgPSB0eXBlb2Yga2V5RmllbGQgPT09ICdzdHJpbmcnICYmIGtleUZpZWxkLmxlbmd0aDtcbiAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHByb3BzLmNoaWxkcmVuLCBjb2x1bW49PiB7XG4gICAgICBpZiAoY29sdW1uLnByb3BzLmlzS2V5KSB7XG4gICAgICAgIGlmIChrZXlGaWVsZCkge1xuICAgICAgICAgIHRocm93IFwiRXJyb3IuIE11bHRpcGxlIGtleSBjb2x1bW4gYmUgZGV0ZWN0ZWQgaW4gVGFibGVIZWFkZXJDb2x1bW4uXCI7XG4gICAgICAgIH1cbiAgICAgICAga2V5RmllbGQgPSBjb2x1bW4ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgfVxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5maWx0ZXIpIHtcbiAgICAgICAgLy8gYSBjb2x1bW4gY29udGFpbnMgYSBmaWx0ZXJcbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgICAgIC8vIGZpcnN0IHRpbWUgY3JlYXRlIHRoZSBmaWx0ZXIgb24gdGhlIEJvb3RzdHJhcFRhYmxlXG4gICAgICAgICAgdGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGFzcyB0aGUgZmlsdGVyIHRvIGNvbHVtbiB3aXRoIGZpbHRlclxuICAgICAgICBjb2x1bW4ucHJvcHMuZmlsdGVyLmVtaXR0ZXIgPSB0aGlzLmZpbHRlcjtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIGxldCBjb2xJbmZvcyA9IHRoaXMuZ2V0Q29sdW1uc0Rlc2NyaXB0aW9uKHByb3BzKS5yZWR1Y2UoKCBwcmV2LCBjdXJyICkgPT4ge1xuICAgICAgcHJldltjdXJyLm5hbWVdID0gY3VycjtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcblxuICAgIGlmICghaXNLZXlGaWVsZERlZmluZWQgJiYgIWtleUZpZWxkKVxuICAgICAgdGhyb3cgYEVycm9yLiBObyBhbnkga2V5IGNvbHVtbiBkZWZpbmVkIGluIFRhYmxlSGVhZGVyQ29sdW1uLlxuICAgICAgICAgICAgVXNlICdpc0tleT17dHJ1ZX0nIHRvIHNwZWNpZnkgYSB1bmlxdWUgY29sdW1uIGFmdGVyIHZlcnNpb24gMC41LjQuYDtcblxuICAgIHRoaXMuc3RvcmUuc2V0UHJvcHMoe1xuICAgICAgaXNQYWdpbmF0aW9uOiBwcm9wcy5wYWdpbmF0aW9uLFxuICAgICAga2V5RmllbGQ6IGtleUZpZWxkLFxuICAgICAgY29sSW5mb3M6IGNvbEluZm9zLFxuICAgICAgbXVsdGlDb2x1bW5TZWFyY2g6IHByb3BzLm11bHRpQ29sdW1uU2VhcmNoLFxuICAgICAgcmVtb3RlOiB0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpXG4gICAgfSk7XG4gIH1cblxuICBnZXRUYWJsZURhdGEoKSB7XG4gICAgIGxldCByZXN1bHQgPSBbXTtcblxuICAgICBpZih0aGlzLnByb3BzLm9wdGlvbnMuc29ydE5hbWUgJiYgdGhpcy5wcm9wcy5vcHRpb25zLnNvcnRPcmRlcilcbiAgICAgICB0aGlzLnN0b3JlLnNvcnQodGhpcy5wcm9wcy5vcHRpb25zLnNvcnRPcmRlciwgdGhpcy5wcm9wcy5vcHRpb25zLnNvcnROYW1lKTtcblxuICAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgbGV0IHBhZ2UsIHNpemVQZXJQYWdlO1xuICAgICAgIGlmICh0aGlzLnN0b3JlLmlzQ2hhbmdlZFBhZ2UoKSkge1xuICAgICAgICBzaXplUGVyUGFnZSA9IHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2U7XG4gICAgICAgIHBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJQYWdlO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBzaXplUGVyUGFnZSA9IHRoaXMucHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZSB8fCBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1RbMF07XG4gICAgICAgICBwYWdlID0gdGhpcy5wcm9wcy5vcHRpb25zLnBhZ2UgfHwgMTtcbiAgICAgICB9XG4gICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKHBhZ2UsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgICB9XG4gICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDb2x1bW5zRGVzY3JpcHRpb24oeyBjaGlsZHJlbiB9KSB7XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogY29sdW1uLnByb3BzLmRhdGFGaWVsZCxcbiAgICAgICAgYWxpZ246IGNvbHVtbi5wcm9wcy5kYXRhQWxpZ24sXG4gICAgICAgIHNvcnQ6IGNvbHVtbi5wcm9wcy5kYXRhU29ydCxcbiAgICAgICAgZm9ybWF0OiBjb2x1bW4ucHJvcHMuZGF0YUZvcm1hdCxcbiAgICAgICAgZm9ybWF0RXh0cmFEYXRhOiBjb2x1bW4ucHJvcHMuZm9ybWF0RXh0cmFEYXRhLFxuICAgICAgICBmaWx0ZXJGb3JtYXR0ZWQ6IGNvbHVtbi5wcm9wcy5maWx0ZXJGb3JtYXR0ZWQsXG4gICAgICAgIGVkaXRhYmxlOiBjb2x1bW4ucHJvcHMuZWRpdGFibGUsXG4gICAgICAgIGhpZGRlbjogY29sdW1uLnByb3BzLmhpZGRlbixcbiAgICAgICAgc2VhcmNoYWJsZTogY29sdW1uLnByb3BzLnNlYXJjaGFibGUsXG4gICAgICAgIGNsYXNzTmFtZTogY29sdW1uLnByb3BzLmNvbHVtbkNsYXNzTmFtZSxcbiAgICAgICAgd2lkdGg6IGNvbHVtbi5wcm9wcy53aWR0aCxcbiAgICAgICAgdGV4dDogY29sdW1uLnByb3BzLmNoaWxkcmVuLFxuICAgICAgICBzb3J0RnVuYzogY29sdW1uLnByb3BzLnNvcnRGdW5jLFxuICAgICAgICBpbmRleDogaVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5pbml0VGFibGUobmV4dFByb3BzKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXh0UHJvcHMuZGF0YSkpIHtcbiAgICAgIHRoaXMuc3RvcmUuc2V0RGF0YShuZXh0UHJvcHMuZGF0YS5zbGljZSgpKTtcbiAgICAgIGxldCBwYWdlID0gbmV4dFByb3BzLm9wdGlvbnMucGFnZSB8fCB0aGlzLnN0YXRlLmN1cnJQYWdlO1xuICAgICAgbGV0IHNpemVQZXJQYWdlID0gbmV4dFByb3BzLm9wdGlvbnMuc2l6ZVBlclBhZ2UgfHwgdGhpcy5zdGF0ZS5zaXplUGVyUGFnZTtcblxuICAgICAgLy8gIzEyNVxuICAgICAgaWYoIW5leHRQcm9wcy5vcHRpb25zLnBhZ2UgJiZcbiAgICAgICAgcGFnZSA+PSBNYXRoLmNlaWwobmV4dFByb3BzLmRhdGEubGVuZ3RoIC8gc2l6ZVBlclBhZ2UpKXtcbiAgICAgICAgcGFnZSA9IDE7XG4gICAgICB9XG4gICAgICBsZXQgc29ydEluZm8gPSB0aGlzLnN0b3JlLmdldFNvcnRJbmZvKCk7XG4gICAgICBsZXQgc29ydEZpZWxkID0gbmV4dFByb3BzLm9wdGlvbnMuc29ydE5hbWUgfHwgKHNvcnRJbmZvID8gc29ydEluZm8uc29ydEZpZWxkIDogdW5kZWZpbmVkKTtcbiAgICAgIGxldCBzb3J0T3JkZXIgPSBuZXh0UHJvcHMub3B0aW9ucy5zb3J0T3JkZXIgfHwgKHNvcnRJbmZvID8gc29ydEluZm8ub3JkZXIgOiB1bmRlZmluZWQpO1xuICAgICAgaWYoc29ydEZpZWxkICYmIHNvcnRPcmRlcikgdGhpcy5zdG9yZS5zb3J0KHNvcnRPcmRlciwgc29ydEZpZWxkKTtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5zdG9yZS5wYWdlKHBhZ2UsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBjdXJyUGFnZTogcGFnZSxcbiAgICAgICAgc2l6ZVBlclBhZ2U6IHNpemVQZXJQYWdlXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5leHRQcm9wcy5zZWxlY3RSb3cgJiYgbmV4dFByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZCkge1xuICAgICAgLy9zZXQgZGVmYXVsdCBzZWxlY3Qgcm93cyB0byBzdG9yZS5cbiAgICAgIGxldCBjb3B5ID0gbmV4dFByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZC5zbGljZSgpO1xuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjb3B5KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IGNvcHlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2FkanVzdFRhYmxlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2FkanVzdFRhYmxlKTtcbiAgICB0aGlzLnJlZnMuYm9keS5yZWZzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxIZWFkZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2FkanVzdFRhYmxlKTtcbiAgICB0aGlzLnJlZnMuYm9keS5yZWZzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxIZWFkZXIpO1xuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKFwib25GaWx0ZXJDaGFuZ2VcIik7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX2FkanVzdFRhYmxlKCk7XG4gICAgdGhpcy5fYXR0YWNoQ2VsbEVkaXRGdW5jKCk7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlclRhYmxlQ29tcGxldGUpXG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJUYWJsZUNvbXBsZXRlKCk7XG4gIH1cblxuICBfYXR0YWNoQ2VsbEVkaXRGdW5jKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmNlbGxFZGl0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxFZGl0Ll9fb25Db21wbGV0ZUVkaXRfXyA9IHRoaXMuaGFuZGxlRWRpdENlbGwuYmluZCh0aGlzKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgIT09IENvbnN0LkNFTExfRURJVF9OT05FKVxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBpbiB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uLFxuICAgKiB0aGUgZGF0YWdyaWQgc2hvdWxkIGxvYWQgaXRzIGRhdGEgcmVtb3RlbHkuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtwcm9wc10gT3B0aW9uYWwuIElmIG5vdCBnaXZlbiwgdGhpcy5wcm9wcyB3aWxsIGJlIHVzZWRcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzUmVtb3RlRGF0YVNvdXJjZShwcm9wcykge1xuICAgIHJldHVybiAocHJvcHMgfHwgdGhpcy5wcm9wcykucmVtb3RlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBjaGlsZHJlbnMgPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICBtYXhIZWlnaHQ6IHRoaXMucHJvcHMubWF4SGVpZ2h0XG4gICAgfTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikpIHtcbiAgICAgIGNoaWxkcmVucyA9IFt0aGlzLnByb3BzLmNoaWxkcmVuXTtcbiAgICB9XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldENvbHVtbnNEZXNjcmlwdGlvbih0aGlzLnByb3BzKTtcbiAgICB2YXIgc29ydEluZm8gPSB0aGlzLnN0b3JlLmdldFNvcnRJbmZvKCk7XG4gICAgdmFyIHBhZ2luYXRpb24gPSB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICB2YXIgdG9vbEJhciA9IHRoaXMucmVuZGVyVG9vbEJhcigpO1xuICAgIHZhciB0YWJsZUZpbHRlciA9IHRoaXMucmVuZGVyVGFibGVGaWx0ZXIoY29sdW1ucyk7XG4gICAgdmFyIGlzU2VsZWN0QWxsID0gdGhpcy5pc1NlbGVjdEFsbCgpO1xuICAgIGxldCBzb3J0SW5kaWNhdG9yID0gdGhpcy5wcm9wcy5vcHRpb25zLnNvcnRJbmRpY2F0b3I7XG4gICAgaWYodHlwZW9mIHRoaXMucHJvcHMub3B0aW9ucy5zb3J0SW5kaWNhdG9yID09PSAndW5kZWZpbmVkJykgc29ydEluZGljYXRvciA9IHRydWU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtYnMtdGFibGUtY29udGFpbmVyXCI+XG4gICAgICAgIHt0b29sQmFyfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWJzLXRhYmxlXCIgcmVmPVwidGFibGVcIiBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlci5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPFRhYmxlSGVhZGVyXG4gICAgICAgICAgICByZWY9XCJoZWFkZXJcIlxuICAgICAgICAgICAgcm93U2VsZWN0VHlwZT17dGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZX1cbiAgICAgICAgICAgIGhpZGVTZWxlY3RDb2x1bW49e3RoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW59XG4gICAgICAgICAgICBzb3J0TmFtZT17c29ydEluZm8gPyBzb3J0SW5mby5zb3J0RmllbGQgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBzb3J0T3JkZXI9e3NvcnRJbmZvID8gc29ydEluZm8ub3JkZXIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBzb3J0SW5kaWNhdG9yPXtzb3J0SW5kaWNhdG9yfVxuICAgICAgICAgICAgb25Tb3J0PXt0aGlzLmhhbmRsZVNvcnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2VsZWN0QWxsUm93PXt0aGlzLmhhbmRsZVNlbGVjdEFsbFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgYm9yZGVyZWQ9e3RoaXMucHJvcHMuYm9yZGVyZWR9XG4gICAgICAgICAgICBjb25kZW5zZWQ9e3RoaXMucHJvcHMuY29uZGVuc2VkfVxuICAgICAgICAgICAgaXNGaWx0ZXJlZD17dGhpcy5maWx0ZXIgPyB0cnVlIDogZmFsc2V9XG4gICAgICAgICAgICBpc1NlbGVjdEFsbD17aXNTZWxlY3RBbGx9PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICA8VGFibGVCb2R5XG4gICAgICAgICAgICByZWY9XCJib2R5XCJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgIGRhdGE9e3RoaXMuc3RhdGUuZGF0YX1cbiAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICB0ckNsYXNzTmFtZT17dGhpcy5wcm9wcy50ckNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0cmlwZWQ9e3RoaXMucHJvcHMuc3RyaXBlZH1cbiAgICAgICAgICAgIGJvcmRlcmVkPXt0aGlzLnByb3BzLmJvcmRlcmVkfVxuICAgICAgICAgICAgaG92ZXI9e3RoaXMucHJvcHMuaG92ZXJ9XG4gICAgICAgICAgICBrZXlGaWVsZD17dGhpcy5zdG9yZS5nZXRLZXlGaWVsZCgpfVxuICAgICAgICAgICAgY29uZGVuc2VkPXt0aGlzLnByb3BzLmNvbmRlbnNlZH1cbiAgICAgICAgICAgIHNlbGVjdFJvdz17dGhpcy5wcm9wcy5zZWxlY3RSb3d9XG4gICAgICAgICAgICBjZWxsRWRpdD17dGhpcy5wcm9wcy5jZWxsRWRpdH1cbiAgICAgICAgICAgIHNlbGVjdGVkUm93S2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZFJvd0tleXN9XG4gICAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblJvd01vdXNlT3Zlcj17dGhpcy5oYW5kbGVSb3dNb3VzZU92ZXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uUm93TW91c2VPdXQ9e3RoaXMuaGFuZGxlUm93TW91c2VPdXQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2VsZWN0Um93PXt0aGlzLmhhbmRsZVNlbGVjdFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgbm9EYXRhVGV4dD17dGhpcy5wcm9wcy5vcHRpb25zLm5vRGF0YVRleHR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0YWJsZUZpbHRlcn1cbiAgICAgICAge3BhZ2luYXRpb259XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBpc1NlbGVjdEFsbCgpe1xuICAgIHZhciBkZWZhdWx0U2VsZWN0Um93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgdmFyIGFsbFJvd0tleXMgPSB0aGlzLnN0b3JlLmdldEFsbFJvd2tleSgpO1xuICAgIGlmKGRlZmF1bHRTZWxlY3RSb3dLZXlzLmxlbmd0aCAhPT0gYWxsUm93S2V5cy5sZW5ndGgpe1xuICAgICAgcmV0dXJuIGRlZmF1bHRTZWxlY3RSb3dLZXlzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogJ2luZGV0ZXJtaW5hdGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjbGVhblNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoW10pO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBbXVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU29ydChvcmRlciwgc29ydEZpZWxkKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vblNvcnRDaGFuZ2Uoc29ydEZpZWxkLCBvcmRlciwgdGhpcy5wcm9wcyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuc3RvcmUuc29ydChvcmRlciwgc29ydEZpZWxkKS5nZXQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnaW5hdGlvbkRhdGEocGFnZSwgc2l6ZVBlclBhZ2UpIHtcbiAgICBjb25zdCB7b25QYWdlQ2hhbmdlfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICBpZiAob25QYWdlQ2hhbmdlKSB7XG4gICAgICBvblBhZ2VDaGFuZ2UocGFnZSwgc2l6ZVBlclBhZ2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZShwYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHQsXG4gICAgICBjdXJyUGFnZTogcGFnZSxcbiAgICAgIHNpemVQZXJQYWdlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Nb3VzZUxlYXZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uTW91c2VFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uTW91c2VFbnRlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJvd01vdXNlT3V0KHJvdykge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dNb3VzZU91dCkge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uUm93TW91c2VPdXQocm93KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU92ZXIocm93KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblJvd01vdXNlT3Zlcikge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uUm93TW91c2VPdmVyKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2socm93KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dDbGljayhyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNlbGVjdEFsbFJvdyhlKSB7XG4gICAgdmFyIGlzU2VsZWN0ZWQgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZDtcbiAgICBsZXQgc2VsZWN0ZWRSb3dLZXlzID0gW107XG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93Lm9uU2VsZWN0QWxsKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdEFsbChpc1NlbGVjdGVkLFxuICAgICAgICBpc1NlbGVjdGVkID8gdGhpcy5zdG9yZS5nZXQoKSA6IFtdKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcgfHwgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzID0gdGhpcy5zdG9yZS5nZXRBbGxSb3drZXkoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShzZWxlY3RlZFJvd0tleXMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlbGVjdGVkUm93S2V5czogc2VsZWN0ZWRSb3dLZXlzXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTaG93T25seVNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RvcmUuaWdub3JlTm9uU2VsZWN0ZWQoKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZSgxLCB0aGlzLnN0YXRlLnNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHQsXG4gICAgICBjdXJyUGFnZTogMSxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdFJvdyhyb3csIGlzU2VsZWN0ZWQpIHtcbiAgICBsZXQgY3VyclNlbGVjdGVkID0gdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKTtcbiAgICBsZXQgcm93S2V5ID0gcm93W3RoaXMuc3RvcmUuZ2V0S2V5RmllbGQoKV07XG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93Lm9uU2VsZWN0KSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdChyb3csIGlzU2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJyB8fCByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUpIHtcbiAgICAgICAgY3VyclNlbGVjdGVkID0gaXNTZWxlY3RlZCA/IFtyb3dLZXldIDogW11cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgY3VyclNlbGVjdGVkLnB1c2gocm93S2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyU2VsZWN0ZWQgPSBjdXJyU2VsZWN0ZWQuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiByb3dLZXkgIT09IGtleTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KGN1cnJTZWxlY3RlZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBjdXJyU2VsZWN0ZWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVkaXRDZWxsKG5ld1ZhbCwgcm93SW5kZXgsIGNvbEluZGV4KSB7XG4gICAgbGV0IGZpZWxkTmFtZTtcbiAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIGZ1bmN0aW9uIChjb2x1bW4sIGkpIHtcbiAgICAgIGlmIChpID09IGNvbEluZGV4KSB7XG4gICAgICAgIGZpZWxkTmFtZSA9IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnN0b3JlLmVkaXQobmV3VmFsLCByb3dJbmRleCwgZmllbGROYW1lKS5nZXQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuY2VsbEVkaXQuYWZ0ZXJTYXZlQ2VsbCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsRWRpdC5hZnRlclNhdmVDZWxsKHRoaXMuc3RhdGUuZGF0YVtyb3dJbmRleF0sIGZpZWxkTmFtZSwgbmV3VmFsKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZGRSb3dCZWdpbigpIHtcbiAgICBpZiAodGhpcy5yZWZzLmJvZHkpIHtcbiAgICAgIC8vIHRoaXMucmVmcy5ib2R5LmNhbmNlbEVkaXQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZGRSb3dBdEJlZ2luKG5ld09iaikge1xuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RvcmUuYWRkQXRCZWdpbihuZXdPYmopO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICB0aGlzLl9oYW5kbGVBZnRlckFkZGluZ1JvdyhuZXdPYmopO1xuICB9XG5cbiAgaGFuZGxlQWRkUm93KG5ld09iaikge1xuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RvcmUuYWRkKG5ld09iaik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICAgIHRoaXMuX2hhbmRsZUFmdGVyQWRkaW5nUm93KG5ld09iaik7XG4gIH1cblxuICBnZXRTaXplUGVyUGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5zaXplUGVyUGFnZTtcbiAgfVxuXG4gIGdldEN1cnJlbnRQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJQYWdlO1xuICB9XG5cbiAgaGFuZGxlRHJvcFJvdyhyb3dLZXlzKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBkcm9wUm93S2V5cyA9IHJvd0tleXM/cm93S2V5czp0aGlzLnN0b3JlLmdldFNlbGVjdGVkUm93S2V5cygpO1xuICAgIC8vYWRkIGNvbmZpcm0gYmVmb3JlIHRoZSBkZWxldGUgYWN0aW9uIGlmIHRoYXQgb3B0aW9uIGlzIHNldC5cbiAgICBpZiAoZHJvcFJvd0tleXMgJiYgZHJvcFJvd0tleXMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5oYW5kbGVDb25maXJtRGVsZXRlUm93KXtcbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmhhbmRsZUNvbmZpcm1EZWxldGVSb3coXG4gICAgICAgICAgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlUm93KGRyb3BSb3dLZXlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB3YW50IGRlbGV0ZT8nKSkge1xuICAgICAgICB0aGlzLmRlbGV0ZVJvdyhkcm9wUm93S2V5cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlUm93KGRyb3BSb3dLZXlzKXtcblxuICAgIGxldCByZXN1bHQ7XG4gICAgdGhpcy5zdG9yZS5yZW1vdmUoZHJvcFJvd0tleXMpOyAgLy9yZW1vdmUgc2VsZWN0ZWQgUm93XG4gICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShbXSk7ICAvL2NsZWFyIHNlbGVjdGVkIHJvdyBrZXlcblxuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgc2l6ZVBlclBhZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBsZXQgeyBjdXJyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGxldCBjdXJyTGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zdG9yZS5nZXREYXRhTnVtKCkgLyBzaXplUGVyUGFnZSk7XG4gICAgICBpZiAoY3VyclBhZ2UgPiBjdXJyTGFzdFBhZ2UpXG4gICAgICAgIGN1cnJQYWdlID0gY3Vyckxhc3RQYWdlO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKGN1cnJQYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCksXG4gICAgICAgIGN1cnJQYWdlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgIHNlbGVjdGVkUm93S2V5czogdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJEZWxldGVSb3cpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckRlbGV0ZVJvdyhkcm9wUm93S2V5cyk7XG4gICAgfVxuXG4gIH1cblxuICBoYW5kbGVGaWx0ZXJEYXRhKGZpbHRlck9iaikge1xuICAgIHRoaXMuc3RvcmUuZmlsdGVyKGZpbHRlck9iaik7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBjb25zdCB7IHNpemVQZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKDEsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyQ29sdW1uRmlsdGVyKVxuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyQ29sdW1uRmlsdGVyKGZpbHRlck9iaixcbiAgICAgICAgdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUV4cG9ydENTVigpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCk7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB0aGlzLnByb3BzLmNoaWxkcmVuLm1hcChmdW5jdGlvbihjb2x1bW4pIHtcbiAgICAgIGlmIChjb2x1bW4ucHJvcHMuaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICBrZXlzLnB1c2goY29sdW1uLnByb3BzLmRhdGFGaWVsZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZXhwb3J0Q1NWKHJlc3VsdCwga2V5cywgdGhpcy5wcm9wcy5jc3ZGaWxlTmFtZSk7XG4gIH1cblxuICBoYW5kbGVTZWFyY2goc2VhcmNoVGV4dCkge1xuICAgIHRoaXMuc3RvcmUuc2VhcmNoKHNlYXJjaFRleHQpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgY29uc3QgeyBzaXplUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZSgxLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgfVxuICAgIGlmKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlclNlYXJjaClcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlclNlYXJjaChzZWFyY2hUZXh0LCB0aGlzLnN0b3JlLmdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHQsXG4gICAgICBjdXJyUGFnZTogMVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyUGFnaW5hdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBsZXQgZGF0YVNpemU7XG4gICAgICBpZiAodGhpcy5pc1JlbW90ZURhdGFTb3VyY2UoKSkge1xuICAgICAgICBkYXRhU2l6ZSA9IHRoaXMucHJvcHMuZmV0Y2hJbmZvLmRhdGFUb3RhbFNpemU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhU2l6ZSA9IHRoaXMuc3RvcmUuZ2V0RGF0YU51bSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1icy10YWJsZS1wYWdpbmF0aW9uXCI+XG4gICAgICAgICAgPFBhZ2luYXRpb25MaXN0XG4gICAgICAgICAgICByZWY9XCJwYWdpbmF0aW9uXCJcbiAgICAgICAgICAgIGN1cnJQYWdlPXsgdGhpcy5zdGF0ZS5jdXJyUGFnZSB9XG4gICAgICAgICAgICBjaGFuZ2VQYWdlPXt0aGlzLmhhbmRsZVBhZ2luYXRpb25EYXRhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBzaXplUGVyUGFnZT17IHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2UgfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2VMaXN0PXt0aGlzLnByb3BzLm9wdGlvbnMuc2l6ZVBlclBhZ2VMaXN0IHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVH1cbiAgICAgICAgICAgIHBhZ2luYXRpb25TaXplPXt0aGlzLnByb3BzLm9wdGlvbnMucGFnaW5hdGlvblNpemUgfHwgQ29uc3QuUEFHSU5BVElPTl9TSVpFfVxuICAgICAgICAgICAgcmVtb3RlPXt0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpfVxuICAgICAgICAgICAgZGF0YVNpemU9e2RhdGFTaXplfVxuICAgICAgICAgICAgb25TaXplUGVyUGFnZUxpc3Q9e3RoaXMucHJvcHMub3B0aW9ucy5vblNpemVQZXJQYWdlTGlzdH1cbiAgICAgICAgICAgIHByZVBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5wcmVQYWdlIHx8IENvbnN0LlBSRV9QQUdFfVxuICAgICAgICAgICAgbmV4dFBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5uZXh0UGFnZSB8fCBDb25zdC5ORVhUX1BBR0V9XG4gICAgICAgICAgICBmaXJzdFBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5maXJzdFBhZ2UgfHwgQ29uc3QuRklSU1RfUEFHRX1cbiAgICAgICAgICAgIGxhc3RQYWdlPXt0aGlzLnByb3BzLm9wdGlvbnMubGFzdFBhZ2UgfHwgQ29uc3QuTEFTVF9QQUdFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXJUb29sQmFyKCkge1xuICAgIGxldCBlbmFibGVTaG93T25seVNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cgJiYgdGhpcy5wcm9wcy5zZWxlY3RSb3cuc2hvd09ubHlTZWxlY3RlZDtcbiAgICBpZiAoZW5hYmxlU2hvd09ubHlTZWxlY3RlZFxuICAgICAgICB8fCB0aGlzLnByb3BzLmluc2VydFJvd1xuICAgICAgICB8fCB0aGlzLnByb3BzLmRlbGV0ZVJvd1xuICAgICAgICB8fCB0aGlzLnByb3BzLnNlYXJjaFxuICAgICAgICB8fCB0aGlzLnByb3BzLmV4cG9ydENTVikge1xuICAgICAgbGV0IGNvbHVtbnM7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSkge1xuICAgICAgICBjb2x1bW5zID0gdGhpcy5wcm9wcy5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNvbHVtbikge1xuICAgICAgICAgIHZhciBwcm9wcyA9IGNvbHVtbi5wcm9wcztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICBmaWVsZDogcHJvcHMuZGF0YUZpZWxkLFxuICAgICAgICAgICAgLy93aGVuIHlvdSB3YW50IHNhbWUgYXV0byBnZW5lcmF0ZSB2YWx1ZSBhbmQgbm90IGFsbG93IGVkaXQsIGV4YW1wbGUgSUQgZmllbGRcbiAgICAgICAgICAgIGF1dG9WYWx1ZTogcHJvcHMuYXV0b1ZhbHVlIHx8IGZhbHNlLFxuICAgICAgICAgICAgLy9mb3IgY3JlYXRlIGVkaXRvciwgbm8gcGFyYW1zIGZvciBjb2x1bW4uZWRpdGFibGUoKSBpbmRpY2F0ZSB0aGF0IGVkaXRvciBmb3IgbmV3IHJvd1xuICAgICAgICAgICAgZWRpdGFibGU6IHByb3BzLmVkaXRhYmxlICYmICh0eXBlb2YgcHJvcHMuZWRpdGFibGUgPT09IFwiZnVuY3Rpb25cIikgPyBwcm9wcy5lZGl0YWJsZSgpIDogcHJvcHMuZWRpdGFibGUsXG4gICAgICAgICAgICBmb3JtYXQ6IHByb3BzLmRhdGFGb3JtYXQgPyBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wcy5kYXRhRm9ybWF0KHZhbHVlLCBudWxsLCBwcm9wcy5mb3JtYXRFeHRyYURhdGEpLnJlcGxhY2UoLzwuKj8+L2csJycpO1xuICAgICAgICAgICAgfSA6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zID0gW3tcbiAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGZpZWxkOiB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmRhdGFGaWVsZCxcbiAgICAgICAgICBlZGl0YWJsZTogdGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5lZGl0YWJsZVxuICAgICAgICB9XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtYnMtdGFibGUtdG9vbC1iYXJcIj5cbiAgICAgICAgICA8VG9vbEJhclxuICAgICAgICAgICAgY2xlYXJTZWFyY2g9e3RoaXMucHJvcHMub3B0aW9ucy5jbGVhclNlYXJjaH1cbiAgICAgICAgICAgIGVuYWJsZUluc2VydD17dGhpcy5wcm9wcy5pbnNlcnRSb3d9XG4gICAgICAgICAgICBlbmFibGVEZWxldGU9e3RoaXMucHJvcHMuZGVsZXRlUm93fVxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoPXt0aGlzLnByb3BzLnNlYXJjaH1cbiAgICAgICAgICAgIGVuYWJsZUV4cG9ydENTVj17dGhpcy5wcm9wcy5leHBvcnRDU1Z9XG4gICAgICAgICAgICBlbmFibGVTaG93T25seVNlbGVjdGVkPXtlbmFibGVTaG93T25seVNlbGVjdGVkfVxuICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgb25BZGRSb3c9e3RoaXMuaGFuZGxlQWRkUm93LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkFkZFJvd0JlZ2luPXt0aGlzLmhhbmRsZUFkZFJvd0JlZ2luLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkRyb3BSb3c9e3RoaXMuaGFuZGxlRHJvcFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25TZWFyY2g9e3RoaXMuaGFuZGxlU2VhcmNoLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkV4cG9ydENTVj17dGhpcy5oYW5kbGVFeHBvcnRDU1YuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2hvd09ubHlTZWxlY3RlZD17dGhpcy5oYW5kbGVTaG93T25seVNlbGVjdGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclRhYmxlRmlsdGVyKGNvbHVtbnMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5GaWx0ZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUYWJsZUZpbHRlciBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0VHlwZT17dGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZX1cbiAgICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyPXt0aGlzLmhhbmRsZUZpbHRlckRhdGEuYmluZCh0aGlzKX0vPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgX3Njcm9sbEhlYWRlciA9IChlKSA9PiB7XG4gICAgdGhpcy5yZWZzLmhlYWRlci5yZWZzLmNvbnRhaW5lci5zY3JvbGxMZWZ0ID0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbExlZnQ7XG4gIH1cblxuICBfYWRqdXN0VGFibGUgPSAoKSA9PiB7XG4gICAgdGhpcy5fYWRqdXN0SGVhZGVyV2lkdGgoKTtcbiAgICB0aGlzLl9hZGp1c3RIZWlnaHQoKTtcbiAgfVxuXG4gIF9hZGp1c3RIZWFkZXJXaWR0aCA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuaGVhZGVyO1xuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IHRoaXMucmVmcy5oZWFkZXIucmVmcy5jb250YWluZXI7XG4gICAgY29uc3QgdGJvZHkgPSB0aGlzLnJlZnMuYm9keS5yZWZzLnRib2R5O1xuICAgIGNvbnN0IGZpcnN0Um93ID0gdGJvZHkuY2hpbGROb2Rlc1swXTtcbiAgICBjb25zdCBpc1Njcm9sbCA9IGhlYWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aCAhPT0gdGJvZHkucGFyZW50Tm9kZS5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBzY3JvbGxCYXJXaWR0aCA9IGlzU2Nyb2xsP1V0aWwuZ2V0U2Nyb2xsQmFyV2lkdGgoKTowO1xuICAgIGlmIChmaXJzdFJvdyAmJiB0aGlzLnN0b3JlLmdldERhdGFOdW0oKSkge1xuICAgICAgY29uc3QgY2VsbHMgPSBmaXJzdFJvdy5jaGlsZE5vZGVzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gY2VsbHNbaV07XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGNlbGwpO1xuICAgICAgICBsZXQgd2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUud2lkdGgucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgICAgaWYgKHRoaXMuaXNJRSkge1xuICAgICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgICAgICBjb25zdCBwYWRkaW5nUmlnaHRXaWR0aCA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nUmlnaHQucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgICAgICBjb25zdCBib3JkZXJSaWdodFdpZHRoID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgICAgICBjb25zdCBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuYm9yZGVyTGVmdFdpZHRoLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICAgICAgd2lkdGggPSB3aWR0aCArIHBhZGRpbmdMZWZ0V2lkdGggKyBwYWRkaW5nUmlnaHRXaWR0aCArIGJvcmRlclJpZ2h0V2lkdGggKyBib3JkZXJMZWZ0V2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdFBhZGRpbmcgPSAoY2VsbHMubGVuZ3RoIC0xID09IGkgPyBzY3JvbGxCYXJXaWR0aCA6IDApO1xuICAgICAgICBpZiAod2lkdGggPD0gMCkge1xuICAgICAgICAgIHdpZHRoID0gMTIwO1xuICAgICAgICAgIGNlbGwud2lkdGggPSB3aWR0aCArIGxhc3RQYWRkaW5nICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHdpZHRoICsgbGFzdFBhZGRpbmcgKyBcInB4XCI7XG4gICAgICAgIGhlYWRlci5jaGlsZE5vZGVzW2ldLnN0eWxlLndpZHRoID0gcmVzdWx0O1xuICAgICAgICBoZWFkZXIuY2hpbGROb2Rlc1tpXS5zdHlsZS5taW5XaWR0aCA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYWRqdXN0SGVpZ2h0ID0gKCkgPT4ge1xuICAgIGlmKHRoaXMucHJvcHMuaGVpZ2h0LmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucmVmcy5ib2R5LnJlZnMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9XG4gICAgICAgIHBhcnNlRmxvYXQodGhpcy5wcm9wcy5oZWlnaHQpIC0gdGhpcy5yZWZzLmhlYWRlci5yZWZzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUFmdGVyQWRkaW5nUm93KG5ld09iaikge1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgLy9pZiBwYWdpbmF0aW9uIGlzIGVuYWJsZWQgYW5kIGluc2VydCByb3cgYmUgdHJpZ2dlciwgY2hhbmdlIHRvIGxhc3QgcGFnZVxuICAgICAgY29uc3QgeyBzaXplUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IGN1cnJMYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLnN0b3JlLmdldERhdGFOdW0oKSAvIHNpemVQZXJQYWdlKTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZShjdXJyTGFzdFBhZ2UsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgIGN1cnJQYWdlOiBjdXJyTGFzdFBhZ2UsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJJbnNlcnRSb3cpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckluc2VydFJvdyhuZXdPYmopO1xuICAgIH1cbiAgfVxufVxuXG5Cb290c3RyYXBUYWJsZS5wcm9wVHlwZXMgPSB7XG4gIGtleUZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG1heEhlaWdodDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLmFycmF5LCBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XSksXG4gIHJlbW90ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsIC8vIHJlbW90ZSBkYXRhLCBkZWZhdWx0IGlzIGZhbHNlXG4gIHN0cmlwZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBib3JkZXJlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29uZGVuc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgcGFnaW5hdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNlYXJjaFBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RSb3c6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgbW9kZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgIENvbnN0LlJPV19TRUxFQ1RfTk9ORSxcbiAgICAgIENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFLFxuICAgICAgQ29uc3QuUk9XX1NFTEVDVF9NVUxUSVxuICAgIF0pLFxuICAgIGJnQ29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICBvblNlbGVjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGNsaWNrVG9TZWxlY3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpZGVTZWxlY3RDb2x1bW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd09ubHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgfSksXG4gIGNlbGxFZGl0OiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIG1vZGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYmx1clRvU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgYWZ0ZXJTYXZlQ2VsbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgfSksXG4gIGluc2VydFJvdzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRlbGV0ZVJvdzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNlYXJjaDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbHVtbkZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHRyQ2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuYW55LFxuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGNsZWFyU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzb3J0TmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzb3J0T3JkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc29ydEluZGljYXRvcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgYWZ0ZXJUYWJsZUNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckRlbGV0ZVJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJJbnNlcnRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckNvbHVtbkZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICBzaXplUGVyUGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYWdpbmF0aW9uU2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblNvcnRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUGFnZUNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG5vRGF0YVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGFuZGxlQ29uZmlybURlbGV0ZVJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlUGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0UGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaXJzdFBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdFBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfSksXG4gIGZldGNoSW5mbzogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBkYXRhVG90YWxTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICB9KSxcbiAgZXhwb3J0Q1NWOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY3N2RmlsZU5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5Cb290c3RyYXBUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGhlaWdodDogXCIxMDAlXCIsXG4gIG1heEhlaWdodDogdW5kZWZpbmVkLFxuICBzdHJpcGVkOiBmYWxzZSxcbiAgYm9yZGVyZWQ6IHRydWUsXG4gIGhvdmVyOiBmYWxzZSxcbiAgY29uZGVuc2VkOiBmYWxzZSxcbiAgcGFnaW5hdGlvbjogZmFsc2UsXG4gIHNlYXJjaFBsYWNlaG9sZGVyOiB1bmRlZmluZWQsXG4gIHNlbGVjdFJvdzoge1xuICAgIG1vZGU6IENvbnN0LlJPV19TRUxFQ1RfTk9ORSxcbiAgICBiZ0NvbG9yOiBDb25zdC5ST1dfU0VMRUNUX0JHX0NPTE9SLFxuICAgIHNlbGVjdGVkOiBbXSxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0QWxsOiB1bmRlZmluZWQsXG4gICAgY2xpY2tUb1NlbGVjdDogZmFsc2UsXG4gICAgaGlkZVNlbGVjdENvbHVtbjogZmFsc2UsXG4gICAgY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsOiBmYWxzZSxcbiAgICBzaG93T25seVNlbGVjdGVkOiBmYWxzZVxuICB9LFxuICBjZWxsRWRpdDoge1xuICAgIG1vZGU6IENvbnN0LkNFTExfRURJVF9OT05FLFxuICAgIGJsdXJUb1NhdmU6IGZhbHNlLFxuICAgIGFmdGVyU2F2ZUNlbGw6IHVuZGVmaW5lZFxuICB9LFxuICBpbnNlcnRSb3c6IGZhbHNlLFxuICBkZWxldGVSb3c6IGZhbHNlLFxuICBzZWFyY2g6IGZhbHNlLFxuICBtdWx0aUNvbHVtblNlYXJjaDogZmFsc2UsXG4gIGNvbHVtbkZpbHRlcjogZmFsc2UsXG4gIHRyQ2xhc3NOYW1lOiAnJyxcbiAgb3B0aW9uczoge1xuICAgIGNsZWFyU2VhcmNoOiBmYWxzZSxcbiAgICBzb3J0TmFtZTogdW5kZWZpbmVkLFxuICAgIHNvcnRPcmRlcjogdW5kZWZpbmVkLFxuICAgIHNvcnRJbmRpY2F0b3I6IHRydWUsXG4gICAgYWZ0ZXJUYWJsZUNvbXBsZXRlOiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJEZWxldGVSb3c6IHVuZGVmaW5lZCxcbiAgICBhZnRlckluc2VydFJvdzogdW5kZWZpbmVkLFxuICAgIGFmdGVyU2VhcmNoOiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJDb2x1bW5GaWx0ZXI6IHVuZGVmaW5lZCxcbiAgICBvblJvd0NsaWNrOiB1bmRlZmluZWQsXG4gICAgb25Nb3VzZUxlYXZlOiB1bmRlZmluZWQsXG4gICAgb25Nb3VzZUVudGVyOiB1bmRlZmluZWQsXG4gICAgb25Sb3dNb3VzZU91dDogdW5kZWZpbmVkLFxuICAgIG9uUm93TW91c2VPdmVyOiB1bmRlZmluZWQsXG4gICAgcGFnZTogdW5kZWZpbmVkLFxuICAgIHNpemVQZXJQYWdlTGlzdDogQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNULFxuICAgIHNpemVQZXJQYWdlOiB1bmRlZmluZWQsXG4gICAgcGFnaW5hdGlvblNpemU6IENvbnN0LlBBR0lOQVRJT05fU0laRSxcbiAgICBvblNpemVQZXJQYWdlTGlzdDogdW5kZWZpbmVkLFxuICAgIG5vRGF0YVRleHQ6IHVuZGVmaW5lZCxcbiAgICBoYW5kbGVDb25maXJtRGVsZXRlUm93OiB1bmRlZmluZWQsXG4gICAgcHJlUGFnZTogQ29uc3QuUFJFX1BBR0UsXG4gICAgbmV4dFBhZ2U6IENvbnN0Lk5FWFRfUEFHRSxcbiAgICBmaXJzdFBhZ2U6IENvbnN0LkZJUlNUX1BBR0UsXG4gICAgbGFzdFBhZ2U6IENvbnN0LkxBU1RfUEFHRVxuICB9LFxuICBmZXRjaEluZm86IHtcbiAgICBkYXRhVG90YWxTaXplOiAwLFxuICB9LFxuICBleHBvcnRDU1Y6IGZhbHNlLFxuICBjc3ZGaWxlTmFtZTogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBUYWJsZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJjb21tb25qc1wiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NsYXNzbmFtZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIFNPUlRfREVTQzogXCJkZXNjXCIsXG4gIFNPUlRfQVNDOiBcImFzY1wiLFxuICBTSVpFX1BFUl9QQUdFOiAxMCxcbiAgTkVYVF9QQUdFOiBcIj5cIixcbiAgTEFTVF9QQUdFOiBcIj4+XCIsXG4gIFBSRV9QQUdFOiBcIjxcIixcbiAgRklSU1RfUEFHRTogXCI8PFwiLFxuICBST1dfU0VMRUNUX0JHX0NPTE9SOiBcIlwiLFxuICBST1dfU0VMRUNUX05PTkU6IFwibm9uZVwiLFxuICBST1dfU0VMRUNUX1NJTkdMRTogXCJyYWRpb1wiLFxuICBST1dfU0VMRUNUX01VTFRJOiBcImNoZWNrYm94XCIsXG4gIENFTExfRURJVF9OT05FOiBcIm5vbmVcIixcbiAgQ0VMTF9FRElUX0NMSUNLOiBcImNsaWNrXCIsXG4gIENFTExfRURJVF9EQkNMSUNLOiBcImRiY2xpY2tcIixcbiAgU0laRV9QRVJfUEFHRV9MSVNUOiBbMTAsIDI1LCAzMCwgNTBdLFxuICBQQUdJTkFUSU9OX1NJWkU6IDUsXG4gIE5PX0RBVEFfVEVYVDogXCJUaGVyZSBpcyBubyBkYXRhIHRvIGRpc3BsYXlcIixcbiAgU0hPV19PTkxZX1NFTEVDVDogXCJTaG93IFNlbGVjdGVkIE9ubHlcIixcbiAgU0hPV19BTEw6IFwiU2hvdyBBbGxcIixcbiAgRklMVEVSX0RFTEFZOiA1MDAsXG4gIEZJTFRFUl9UWVBFOiB7XG4gICAgVEVYVDogXCJUZXh0RmlsdGVyXCIsXG4gICAgUkVHRVg6IFwiUmVnZXhGaWx0ZXJcIixcbiAgICBTRUxFQ1Q6IFwiU2VsZWN0RmlsdGVyXCIsXG4gICAgTlVNQkVSOiBcIk51bWJlckZpbHRlclwiLFxuICAgIERBVEU6IFwiRGF0ZUZpbHRlclwiLFxuICAgIENVU1RPTTogXCJDdXN0b21GaWx0ZXJcIlxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Db25zdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgU2VsZWN0Um93SGVhZGVyQ29sdW1uIGZyb20gJy4vU2VsZWN0Um93SGVhZGVyQ29sdW1uJztcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gIGNvbXBvbmVudERpZE1vdW50KCkgeyB0aGlzLnVwZGF0ZSh0aGlzLnByb3BzLmNoZWNrZWQpOyB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHsgdGhpcy51cGRhdGUocHJvcHMuY2hlY2tlZCk7IH1cbiAgdXBkYXRlKGNoZWNrZWQpIHtcbiAgICBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5pbmRldGVybWluYXRlID0gY2hlY2tlZCA9PT0gJ2luZGV0ZXJtaW5hdGUnO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8aW5wdXQgY2xhc3NOYW1lPSdyZWFjdC1icy1zZWxlY3QtYWxsJyB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9IG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSAvPlxuICB9XG59XG5cbmNsYXNzIFRhYmxlSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIGNvbnRhaW5lckNsYXNzZXMgPSBjbGFzc1NldChcInJlYWN0LWJzLWNvbnRhaW5lci1oZWFkZXJcIixcbiAgICAgIFwidGFibGUtaGVhZGVyLXdyYXBwZXJcIik7XG4gICAgdmFyIHRhYmxlQ2xhc3NlcyA9IGNsYXNzU2V0KFwidGFibGVcIiwgXCJ0YWJsZS1ob3ZlclwiLCB7XG4gICAgICAgIFwidGFibGUtYm9yZGVyZWRcIjogdGhpcy5wcm9wcy5ib3JkZXJlZCxcbiAgICAgICAgXCJ0YWJsZS1jb25kZW5zZWRcIjogdGhpcy5wcm9wcy5jb25kZW5zZWRcbiAgICB9KTtcbiAgICB2YXIgc2VsZWN0Um93SGVhZGVyQ29sID0gdGhpcy5wcm9wcy5oaWRlU2VsZWN0Q29sdW1uP251bGw6dGhpcy5yZW5kZXJTZWxlY3RSb3dIZWFkZXIoKTtcbiAgICB0aGlzLl9hdHRhY2hDbGVhclNvcnRDYXJldEZ1bmMoKTtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgcmVmPVwiY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc2VzfT5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGFibGVDbGFzc2VzfT5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHIgcmVmPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgIHtzZWxlY3RSb3dIZWFkZXJDb2x9XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyU2VsZWN0Um93SGVhZGVyKCl7XG4gICAgaWYodGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICByZXR1cm4gKDxTZWxlY3RSb3dIZWFkZXJDb2x1bW4+PC9TZWxlY3RSb3dIZWFkZXJDb2x1bW4+KTtcbiAgICB9ZWxzZSBpZih0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9NVUxUSSl7XG4gICAgICByZXR1cm4gKDxTZWxlY3RSb3dIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPENoZWNrYm94IG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uU2VsZWN0QWxsUm93fSBjaGVja2VkPXt0aGlzLnByb3BzLmlzU2VsZWN0QWxsfS8+XG4gICAgICAgIDwvU2VsZWN0Um93SGVhZGVyQ29sdW1uPlxuICAgICAgKTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIF9hdHRhY2hDbGVhclNvcnRDYXJldEZ1bmMoKXtcbiAgICBsZXQgeyBzb3J0SW5kaWNhdG9yIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikpe1xuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucHJvcHMuY2hpbGRyZW5baV0ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgICBjb25zdCBzb3J0ID0gZmllbGQgPT09IHRoaXMucHJvcHMuc29ydE5hbWUgPyB0aGlzLnByb3BzLnNvcnRPcmRlciA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbltpXSA9XG4gICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW5baV0sXG4gICAgICAgICAgICB7IGtleTogaSwgb25Tb3J0OiB0aGlzLnByb3BzLm9uU29ydCwgc29ydCwgc29ydEluZGljYXRvciB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmRhdGFGaWVsZDtcbiAgICAgIGNvbnN0IHNvcnQgPSBmaWVsZCA9PT0gdGhpcy5wcm9wcy5zb3J0TmFtZSA/IHRoaXMucHJvcHMuc29ydE9yZGVyIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbiA9XG4gICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCB7a2V5OiAwLCBvblNvcnQ6IHRoaXMucHJvcHMub25Tb3J0LCBzb3J0LCBzb3J0SW5kaWNhdG9yfSk7XG4gICAgfVxuICB9XG59XG5UYWJsZUhlYWRlci5wcm9wVHlwZXMgPSB7XG4gIHJvd1NlbGVjdFR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG9uU29ydDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0QWxsUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc29ydE5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHNvcnRPcmRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgaGlkZVNlbGVjdENvbHVtbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGJvcmRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29uZGVuc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgaXNGaWx0ZXJlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGlzU2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW3RydWUsICdpbmRldGVybWluYXRlJywgZmFsc2VdKSxcbiAgc29ydEluZGljYXRvcjogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cblRhYmxlSGVhZGVyLmRlZmF1bHRQcm9wcyA9IHtcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUhlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlSGVhZGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0RE9NXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuZXhwb3J0IGRlZmF1bHQge1xuXG4gIHJlbmRlclJlYWN0U29ydENhcmV0KG9yZGVyKXtcbiAgICB2YXIgb3JkZXJDbGFzcyA9IGNsYXNzU2V0KFwib3JkZXJcIiwge1xuICAgICAgJ2Ryb3B1cCc6IG9yZGVyID09IENvbnN0LlNPUlRfQVNDXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17b3JkZXJDbGFzc30+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCIgc3R5bGU9e3ttYXJnaW46ICcwcHggNXB4J319Pjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9LFxuXG4gIGdldFNjcm9sbEJhcldpZHRoKCl7XG4gICAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGlubmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgaW5uZXIuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuXG4gICAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgb3V0ZXIuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICBvdXRlci5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICBvdXRlci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBvdXRlci5zdHlsZS53aWR0aCA9IFwiMjAwcHhcIjtcbiAgICBvdXRlci5zdHlsZS5oZWlnaHQgPSBcIjE1MHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIG91dGVyLmFwcGVuZENoaWxkIChpbm5lcik7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIChvdXRlcik7XG4gICAgdmFyIHcxID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgICB2YXIgdzIgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgICBpZiAodzEgPT0gdzIpIHcyID0gb3V0ZXIuY2xpZW50V2lkdGg7XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkIChvdXRlcik7XG5cbiAgICByZXR1cm4gKHcxIC0gdzIpO1xuICB9XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuY2xhc3MgU2VsZWN0Um93SGVhZGVyQ29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIHJlbmRlcigpe1xuICAgIHJldHVybihcbiAgICAgIDx0aCBzdHlsZT17e3RleHRBbGlnbjogJ2NlbnRlcid9fT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvdGg+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdFJvd0hlYWRlckNvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1NlbGVjdFJvd0hlYWRlckNvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVGFibGVSb3cgZnJvbSAnLi9UYWJsZVJvdyc7XG5pbXBvcnQgVGFibGVDb2x1bW4gZnJvbSAnLi9UYWJsZUNvbHVtbic7XG5pbXBvcnQgVGFibGVFZGl0Q29sdW1uIGZyb20gJy4vVGFibGVFZGl0Q29sdW1uJztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxudmFyIGlzRnVuPWZ1bmN0aW9uKG9iail7XG4gIHJldHVybiBvYmomJih0eXBlb2Ygb2JqPT09XCJmdW5jdGlvblwiKTtcblxufTtcbmNsYXNzIFRhYmxlQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VyckVkaXRDZWxsOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlXCIsIHtcbiAgICAgICd0YWJsZS1zdHJpcGVkJzogdGhpcy5wcm9wcy5zdHJpcGVkLFxuICAgICAgJ3RhYmxlLWJvcmRlcmVkJzogdGhpcy5wcm9wcy5ib3JkZXJlZCxcbiAgICAgICd0YWJsZS1ob3Zlcic6IHRoaXMucHJvcHMuaG92ZXIsXG4gICAgICAndGFibGUtY29uZGVuc2VkJzogdGhpcy5wcm9wcy5jb25kZW5zZWRcbiAgICB9KTtcblxuICAgIHZhciBpc1NlbGVjdFJvd0RlZmluZWQgPSB0aGlzLl9pc1NlbGVjdFJvd0RlZmluZWQoKTtcbiAgICB2YXIgdGFibGVIZWFkZXIgPSB0aGlzLnJlbmRlclRhYmxlSGVhZGVyKGlzU2VsZWN0Um93RGVmaW5lZCk7XG5cbiAgICB2YXIgdGFibGVSb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbihkYXRhLCByKXtcbiAgICAgIHZhciB0YWJsZUNvbHVtbnMgPSB0aGlzLnByb3BzLmNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbiwgaSl7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gZGF0YVtjb2x1bW4ubmFtZV07XG4gICAgICAgIGlmKHRoaXMuZWRpdGluZyAmJlxuICAgICAgICAgIGNvbHVtbi5uYW1lICE9PSB0aGlzLnByb3BzLmtleUZpZWxkICYmIC8vIEtleSBmaWVsZCBjYW4ndCBiZSBlZGl0XG4gICAgICAgICAgY29sdW1uLmVkaXRhYmxlICYmIC8vIGNvbHVtbiBpcyBlZGl0YWJsZT8gZGVmYXVsdCBpcyB0cnVlLCB1c2VyIGNhbiBzZXQgaXQgZmFsc2VcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJFZGl0Q2VsbCAhPSBudWxsICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyRWRpdENlbGwucmlkID09IHIgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJFZGl0Q2VsbC5jaWQgPT0gaSl7XG4gICAgICAgICAgICB2YXIgZm9ybWF0PWNvbHVtbi5mb3JtYXQ/ZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICByZXR1cm4gY29sdW1uLmZvcm1hdCh2YWx1ZSwgZGF0YSwgY29sdW1uLmZvcm1hdEV4dHJhRGF0YSkucmVwbGFjZSgvPC4qPz4vZywnJyk7XG4gICAgICAgICAgICB9OmZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8VGFibGVFZGl0Q29sdW1uIGNvbXBsZXRlRWRpdD17dGhpcy5oYW5kbGVDb21wbGV0ZUVkaXRDZWxsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGQgYnkgYmx1ZXNwcmluZyBmb3IgY29sdW1uIGVkaXRvciBjdXN0b21pemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZT17aXNGdW4oY29sdW1uLmVkaXRhYmxlKT9jb2x1bW4uZWRpdGFibGUoZmllbGRWYWx1ZSxkYXRhLHIsaSk6Y29sdW1uLmVkaXRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD17Y29sdW1uLmZvcm1hdD9mb3JtYXQ6ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsdXJUb1NhdmU9e3RoaXMucHJvcHMuY2VsbEVkaXQuYmx1clRvU2F2ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dJbmRleD17cn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xJbmRleD17aX0+XG4gICAgICAgICAgICAgICAge2ZpZWxkVmFsdWV9XG4gICAgICAgICAgICAgIDwvVGFibGVFZGl0Q29sdW1uPlxuICAgICAgICAgICAgKVxuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgLy9hZGQgYnkgYmx1ZXNwcmluZyBmb3IgY2xhc3NOYW1lIGN1c3RvbWl6ZVxuICAgICAgICAgIHZhciB0ZENsYXNzTmFtZT1pc0Z1bihjb2x1bW4uY2xhc3NOYW1lKT9jb2x1bW4uY2xhc3NOYW1lKGZpZWxkVmFsdWUsZGF0YSxyLGkpOmNvbHVtbi5jbGFzc05hbWU7XG5cbiAgICAgICAgICBpZih0eXBlb2YgY29sdW1uLmZvcm1hdCAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBjb2x1bW4uZm9ybWF0KGZpZWxkVmFsdWUsIGRhdGEsIGNvbHVtbi5mb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChmb3JtYXR0ZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBmb3JtYXR0ZWRWYWx1ZX19PjwvZGl2PjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPFRhYmxlQ29sdW1uIGRhdGFBbGlnbj17Y29sdW1uLmFsaWdufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuPXtjb2x1bW4uaGlkZGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0PXt0aGlzLmhhbmRsZUVkaXRDZWxsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17Y29sdW1uLndpZHRofT5cbiAgICAgICAgICAgICAgICB7Zm9ybWF0dGVkVmFsdWV9XG4gICAgICAgICAgICAgIDwvVGFibGVDb2x1bW4+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8VGFibGVDb2x1bW4gZGF0YUFsaWduPXtjb2x1bW4uYWxpZ259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVkaXQ9e3RoaXMucHJvcHMuY2VsbEVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW49e2NvbHVtbi5oaWRkZW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXQ9e3RoaXMuaGFuZGxlRWRpdENlbGwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtjb2x1bW4ud2lkdGh9PlxuICAgICAgICAgICAgICAgIHtmaWVsZFZhbHVlfVxuICAgICAgICAgICAgICA8L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkUm93S2V5cy5pbmRleE9mKGRhdGFbdGhpcy5wcm9wcy5rZXlGaWVsZF0pICE9IC0xO1xuICAgICAgdmFyIHNlbGVjdFJvd0NvbHVtbiA9IGlzU2VsZWN0Um93RGVmaW5lZCAmJiAhdGhpcy5wcm9wcy5zZWxlY3RSb3cuaGlkZVNlbGVjdENvbHVtbj9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VsZWN0Um93Q29sdW1uKHNlbGVjdGVkKTpudWxsO1xuICAgICAgLy9hZGQgYnkgYmx1ZXNwcmluZyBmb3IgY2xhc3NOYW1lIGN1c3RvbWl6ZVxuICAgICAgdmFyIHRyQ2xhc3NOYW1lPWlzRnVuKHRoaXMucHJvcHMudHJDbGFzc05hbWUpP3RoaXMucHJvcHMudHJDbGFzc05hbWUoZGF0YSxyKTp0aGlzLnByb3BzLnRyQ2xhc3NOYW1lO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRhYmxlUm93IGlzU2VsZWN0ZWQ9e3NlbGVjdGVkfSBrZXk9e3J9IGNsYXNzTmFtZT17dHJDbGFzc05hbWV9XG4gICAgICAgICAgc2VsZWN0Um93PXtpc1NlbGVjdFJvd0RlZmluZWQ/dGhpcy5wcm9wcy5zZWxlY3RSb3c6dW5kZWZpbmVkfVxuICAgICAgICAgIGVuYWJsZUNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgIT09IENvbnN0LkNFTExfRURJVF9OT05FfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICBvblJvd01vdXNlT3Zlcj17dGhpcy5oYW5kbGVSb3dNb3VzZU92ZXIuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblJvd01vdXNlT3V0PXt0aGlzLmhhbmRsZVJvd01vdXNlT3V0LmJpbmQodGhpcyl9XG4gICAgICAgICAgb25TZWxlY3RSb3c9e3RoaXMuaGFuZGxlU2VsZWN0Um93LmJpbmQodGhpcyl9PlxuICAgICAgICAgIHtzZWxlY3RSb3dDb2x1bW59XG4gICAgICAgICAge3RhYmxlQ29sdW1uc31cbiAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgIClcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmKHRhYmxlUm93cy5sZW5ndGggPT09IDApe1xuICAgICAgdGFibGVSb3dzLnB1c2goXG4gICAgICA8VGFibGVSb3cga2V5PVwiIyN0YWJsZS1lbXB0eSMjXCI+XG4gICAgICAgIDx0ZCBjb2xTcGFuPXt0aGlzLnByb3BzLmNvbHVtbnMubGVuZ3RoKyhpc1NlbGVjdFJvd0RlZmluZWQ/MTowKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWJzLXRhYmxlLW5vLWRhdGFcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5vRGF0YVRleHR8fENvbnN0Lk5PX0RBVEFfVEVYVH1cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvVGFibGVSb3c+KTtcbiAgICB9XG5cbiAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgcmVmPVwiY29udGFpbmVyXCIgY2xhc3NOYW1lPSdyZWFjdC1icy1jb250YWluZXItYm9keScgc3R5bGU9eyB0aGlzLnByb3BzLnN0eWxlIH0+XG4gICAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3Nlc30+XG4gICAgICAgICAge3RhYmxlSGVhZGVyfVxuICAgICAgICAgIDx0Ym9keSByZWY9XCJ0Ym9keVwiPlxuICAgICAgICAgICAge3RhYmxlUm93c31cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyVGFibGVIZWFkZXIoaXNTZWxlY3RSb3dEZWZpbmVkKXtcbiAgICB2YXIgc2VsZWN0Um93SGVhZGVyID0gbnVsbDtcblxuICAgIGlmKGlzU2VsZWN0Um93RGVmaW5lZCl7XG4gICAgICBsZXQgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiAzMCxcbiAgICAgICAgbWluV2lkdGg6IDMwXG4gICAgICB9XG4gICAgICBzZWxlY3RSb3dIZWFkZXIgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1uP251bGw6KDxjb2wgc3R5bGU9e3N0eWxlfSBrZXk9ey0xfT48L2NvbD4pO1xuICAgIH1cbiAgICB2YXIgdGhlYWRlciA9IHRoaXMucHJvcHMuY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uLCBpKXtcbiAgICAgIGxldCB3aWR0aCA9IGNvbHVtbi53aWR0aCA9PSBudWxsP2NvbHVtbi53aWR0aDpwYXJzZUludChjb2x1bW4ud2lkdGgpO1xuICAgICAgbGV0IHN0eWxlPXtcbiAgICAgICAgZGlzcGxheTogY29sdW1uLmhpZGRlbj9cIm5vbmVcIjpudWxsLFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIG1pbldpZHRoOiB3aWR0aFxuICAgICAgICAvKiogYWRkIG1pbi13ZHRoIHRvIGZpeCB1c2VyIGFzc2lnbiBjb2x1bW4gd2lkdGggbm90IGVxIG9mZnNldFdpZHRoIGluIGxhcmdlIGNvbHVtbiB0YWJsZSAqKi9cbiAgICAgIH07XG4gICAgICByZXR1cm4gKDxjb2wgc3R5bGU9e3N0eWxlfSBrZXk9e2l9IGNsYXNzTmFtZT17Y29sdW1uLmNsYXNzTmFtZX0+PC9jb2w+KTtcbiAgICB9KTtcblxuICAgIHJldHVybihcbiAgICAgIDxjb2xncm91cCByZWY9XCJoZWFkZXJcIj5cbiAgICAgICAge3NlbGVjdFJvd0hlYWRlcn17dGhlYWRlcn1cbiAgICAgIDwvY29sZ3JvdXA+XG4gICAgKVxuICB9XG5cbiAgaGFuZGxlUm93TW91c2VPdXQocm93SW5kZXgpe1xuICAgIGNvbnN0IHRhcmdldFJvdyA9IHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleF07XG4gICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3V0KHRhcmdldFJvdyk7XG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU92ZXIocm93SW5kZXgpe1xuICAgIGNvbnN0IHRhcmdldFJvdyA9IHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleF07XG4gICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3Zlcih0YXJnZXRSb3cpO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2socm93SW5kZXgpe1xuICAgIHZhciBrZXksIHNlbGVjdGVkUm93O1xuICAgIHRoaXMucHJvcHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgaSl7XG4gICAgICBpZihpID09IHJvd0luZGV4LTEpe1xuICAgICAgICBrZXkgPSByb3dbdGhpcy5wcm9wcy5rZXlGaWVsZF07XG4gICAgICAgIHNlbGVjdGVkUm93ID0gcm93O1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhzZWxlY3RlZFJvdyk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3cocm93SW5kZXgsIGlzU2VsZWN0ZWQpe1xuICAgIHZhciBrZXksIHNlbGVjdGVkUm93O1xuICAgIHRoaXMucHJvcHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgaSl7XG4gICAgICBpZihpID09IHJvd0luZGV4LTEpe1xuICAgICAgICBrZXkgPSByb3dbdGhpcy5wcm9wcy5rZXlGaWVsZF07XG4gICAgICAgIHNlbGVjdGVkUm93ID0gcm93O1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdFJvdyhzZWxlY3RlZFJvdywgaXNTZWxlY3RlZCk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3dDb2x1bUNoYW5nZShlKXtcbiAgICBpZighdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCB8fCAhdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsKXtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Um93KFxuICAgICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJvd0luZGV4KzEsIGUuY3VycmVudFRhcmdldC5jaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbChyb3dJbmRleCwgY29sdW1uSW5kZXgpe1xuICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgaWYodGhpcy5faXNTZWxlY3RSb3dEZWZpbmVkKCkpe1xuICAgICAgY29sdW1uSW5kZXgtLTtcbiAgICAgIGlmKHRoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW4pXG4gICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgfVxuICAgIHJvd0luZGV4LS07XG4gICAgdmFyIHN0YXRlT2JqID0ge1xuICAgICAgY3VyckVkaXRDZWxsOiB7XG4gICAgICAgIHJpZDogcm93SW5kZXgsXG4gICAgICAgIGNpZDogY29sdW1uSW5kZXhcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYodGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsKXtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvd0luZGV4KzEsIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlT2JqKTtcbiAgfVxuXG4gIGNhbmNlbEVkaXQoKXtcbiAgICB2YXIgY3VyckVkaXRDZWxsPXRoaXMuc3RhdGUuY3VyckVkaXRDZWxsO1xuICAgIGlmKGN1cnJFZGl0Q2VsbCl7XG4gICAgICB0aGlzLmhhbmRsZUNvbXBsZXRlRWRpdENlbGwobnVsbCxjdXJyRWRpdENlbGwucmlkLGN1cnJFZGl0Q2VsbC5jaWQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbXBsZXRlRWRpdENlbGwobmV3VmFsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpe1xuICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJFZGl0Q2VsbDogbnVsbH0pO1xuICAgIGlmKG51bGwgIT0gbmV3VmFsKVxuICAgICAgdGhpcy5wcm9wcy5jZWxsRWRpdC5fX29uQ29tcGxldGVFZGl0X18obmV3VmFsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICB9XG5cbiAgcmVuZGVyU2VsZWN0Um93Q29sdW1uKHNlbGVjdGVkKXtcbiAgICBpZih0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICByZXR1cm4gKDxUYWJsZUNvbHVtbiBkYXRhQWxpZ249XCJjZW50ZXJcIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgY2hlY2tlZD17c2VsZWN0ZWR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdFJvd0NvbHVtQ2hhbmdlLmJpbmQodGhpcyl9Lz48L1RhYmxlQ29sdW1uPik7XG4gICAgfWVsc2Uge1xuICAgICAgcmV0dXJuICg8VGFibGVDb2x1bW4gZGF0YUFsaWduPVwiY2VudGVyXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3NlbGVjdGVkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RSb3dDb2x1bUNoYW5nZS5iaW5kKHRoaXMpfS8+PC9UYWJsZUNvbHVtbj4pO1xuICAgIH1cbiAgfVxuXG4gIF9pc1NlbGVjdFJvd0RlZmluZWQoKXtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJO1xuICB9XG59XG5UYWJsZUJvZHkucHJvcFR5cGVzID0ge1xuICAvLyBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICBzdHJpcGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgYm9yZGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBob3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbmRlbnNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGtleUZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RlZFJvd0tleXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgbm9EYXRhVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUJvZHk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUJvZHkuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuXG5jbGFzcyBUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNsaWNrTnVtID0gMDtcbiAgfVxuXG4gIHJvd0NsaWNrKGUpe1xuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIiAmJlxuICAgICAgICBlLnRhcmdldC50YWdOYW1lICE9PSBcIlNFTEVDVFwiICYmXG4gICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgIT09IFwiVEVYVEFSRUFcIikge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLmN1cnJlbnRUYXJnZXQucm93SW5kZXggKyAxO1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93KSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RSb3cocm93SW5kZXgsICF0aGlzLnByb3BzLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrTnVtKys7XG4gICAgICAgICAgICAvKiogaWYgY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsIGlzIGVuYWJsZWQsXG4gICAgICAgICAgICAgKiAgdGhlcmUgc2hvdWxkIGJlIGEgZGVsYXkgdG8gcHJldmVudCBhIHNlbGVjdGlvbiBjaGFuZ2VkIHdoZW5cbiAgICAgICAgICAgICAqICB1c2VyIGRibGljayB0byBlZGl0IGNlbGwgb24gc2FtZSByb3cgYnV0IGRpZmZlcmVudCBjZWxsXG4gICAgICAgICAgICAqKi9cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZih0aGlzLmNsaWNrTnVtID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdFJvdyhyb3dJbmRleCwgIXRoaXMucHJvcHMuaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5jbGlja051bSA9IDA7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHRoaXMucHJvcHMub25Sb3dDbGljayhyb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcm93TW91c2VPdXQoZSkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUm93TW91c2VPdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dNb3VzZU91dChlLmN1cnJlbnRUYXJnZXQucm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJvd01vdXNlT3ZlcihlKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dNb3VzZU92ZXIoZS5jdXJyZW50VGFyZ2V0LnJvd0luZGV4KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB0aGlzLmNsaWNrTnVtID0gMDtcbiAgICB2YXIgdHJDc3M9e1xuICAgICAgc3R5bGU6e1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuaXNTZWxlY3RlZD90aGlzLnByb3BzLnNlbGVjdFJvdy5iZ0NvbG9yOm51bGxcbiAgICAgIH0sXG4gICAgICBjbGFzc05hbWU6KHRoaXMucHJvcHMuaXNTZWxlY3RlZCAmJiB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGFzc05hbWUgPyB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGFzc05hbWUgOiAnJykgKyAodGhpcy5wcm9wcy5jbGFzc05hbWV8fCcnKVxuICAgIH07XG5cbiAgICBpZih0aGlzLnByb3BzLnNlbGVjdFJvdyAmJiAodGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCB8fFxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsKSB8fCB0aGlzLnByb3BzLm9uUm93Q2xpY2spe1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8dHIgey4uLnRyQ3NzfVxuICAgICAgICAgICAgb25Nb3VzZU92ZXI9e3RoaXMucm93TW91c2VPdmVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbk1vdXNlT3V0PXt0aGlzLnJvd01vdXNlT3V0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnJvd0NsaWNrLmJpbmQodGhpcyl9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvdHI+XG4gICAgICApXG4gICAgfWVsc2V7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ciB7Li4udHJDc3N9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvdHI+XG4gICAgICApXG4gICAgfVxuICB9XG59XG5UYWJsZVJvdy5wcm9wVHlwZXMgPSB7XG4gIGlzU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVDZWxsRWRpdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uUm93Q2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUm93TW91c2VPdXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblJvd01vdXNlT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn07XG5UYWJsZVJvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUm93Q2xpY2s6IHVuZGVmaW5lZFxufVxuZXhwb3J0IGRlZmF1bHQgVGFibGVSb3c7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZVJvdy5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5cbmNsYXNzIFRhYmxlQ29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgc2hvdWxkVXBkYXRlZCA9IHRoaXMucHJvcHMud2lkdGggIT09IG5leHRQcm9wcy53aWR0aFxuICAgICAgfHwgdGhpcy5wcm9wcy5jbGFzc05hbWUgIT09IG5leHRQcm9wcy5jbGFzc05hbWVcbiAgICAgIHx8IHRoaXMucHJvcHMuaGlkZGVuICE9PSBuZXh0UHJvcHMuaGlkZGVuXG4gICAgICB8fCB0aGlzLnByb3BzLmRhdGFBbGlnbiAhPT0gbmV4dFByb3BzLmRhdGFBbGlnblxuICAgICAgfHwgdHlwZW9mIGNoaWxkcmVuICE9PSB0eXBlb2YgbmV4dFByb3BzLmNoaWxkcmVuXG4gICAgICB8fCAoJycrdGhpcy5wcm9wcy5vbkVkaXQpLnRvU3RyaW5nKCkgIT09ICgnJytuZXh0UHJvcHMub25FZGl0KS50b1N0cmluZygpXG5cbiAgICBpZihzaG91bGRVcGRhdGVkKXtcbiAgICAgIHJldHVybiBzaG91bGRVcGRhdGVkO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ29iamVjdCcgJiYgY2hpbGRyZW4gIT09IG51bGwgJiYgY2hpbGRyZW4ucHJvcHMgIT09IG51bGwpIHtcbiAgICAgIGlmKGNoaWxkcmVuLnByb3BzLnR5cGUgPT09ICdjaGVja2JveCcgfHwgY2hpbGRyZW4ucHJvcHMudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBzaG91bGRVcGRhdGVkID0gc2hvdWxkVXBkYXRlZCB8fFxuICAgICAgICAgIGNoaWxkcmVuLnByb3BzLnR5cGUgIT09IG5leHRQcm9wcy5jaGlsZHJlbi5wcm9wcy50eXBlIHx8XG4gICAgICAgICAgY2hpbGRyZW4ucHJvcHMuY2hlY2tlZCAhPT0gbmV4dFByb3BzLmNoaWxkcmVuLnByb3BzLmNoZWNrZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaG91bGRVcGRhdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2hvdWxkVXBkYXRlZCA9IHNob3VsZFVwZGF0ZWQgfHwgY2hpbGRyZW4gIT09IG5leHRQcm9wcy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBpZihzaG91bGRVcGRhdGVkKXtcbiAgICAgIHJldHVybiBzaG91bGRVcGRhdGVkO1xuICAgIH1cblxuICAgIGlmKCEodGhpcy5wcm9wcy5jZWxsRWRpdCAmJiBuZXh0UHJvcHMuY2VsbEVkaXQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzaG91bGRVcGRhdGVkXG4gICAgICAgIHx8IHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSAhPT0gbmV4dFByb3BzLmNlbGxFZGl0Lm1vZGU7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2VsbEVkaXQoZSl7XG4gICAgaWYodGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlID09IENvbnN0LkNFTExfRURJVF9EQkNMSUNLKXtcbiAgICAgIGlmKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkpIHtcbiAgICAgICAgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICB9IGVsc2UgaWYod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uRWRpdChcbiAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnJvd0luZGV4KzEsXG4gICAgICBlLmN1cnJlbnRUYXJnZXQuY2VsbEluZGV4KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB0ZFN0eWxlID0ge1xuICAgICAgdGV4dEFsaWduOiB0aGlzLnByb3BzLmRhdGFBbGlnbixcbiAgICAgIGRpc3BsYXk6IHRoaXMucHJvcHMuaGlkZGVuP1wibm9uZVwiOm51bGxcbiAgICB9O1xuXG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBpZih0aGlzLnByb3BzLmNlbGxFZGl0KXtcbiAgICAgIGlmKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PSBDb25zdC5DRUxMX0VESVRfQ0xJQ0spe1xuICAgICAgICBvcHRzLm9uQ2xpY2sgPSB0aGlzLmhhbmRsZUNlbGxFZGl0LmJpbmQodGhpcyk7XG4gICAgICB9ZWxzZSBpZih0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgPT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spe1xuICAgICAgICBvcHRzLm9uRG91YmxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNlbGxFZGl0LmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8dGQgc3R5bGU9e3RkU3R5bGV9IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IHsuLi5vcHRzfT5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L3RkPlxuICAgIClcbiAgfVxufVxuVGFibGVDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBkYXRhQWxpZ246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGhpZGRlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5UYWJsZUNvbHVtbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhdGFBbGlnbjogXCJsZWZ0XCIsXG4gIGhpZGRlbjogZmFsc2UsXG4gIGNsYXNzTmFtZTpcIlwiXG59XG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlQ29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9FZGl0b3InXG5pbXBvcnQgTm90aWZpZXIgZnJvbSAnLi9Ob3RpZmljYXRpb24uanMnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBUYWJsZUVkaXRDb2x1bW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIHNoYWtlRWRpdG9yOmZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gIGhhbmRsZUtleVByZXNzKGUpe1xuICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHsgLy9QcmVzc2VkIEVOVEVSXG4gICAgICBsZXQgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQudHlwZSA9PSAnY2hlY2tib3gnP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRDaGVja0JveFZhbHVlKGUpOmUuY3VycmVudFRhcmdldC52YWx1ZTtcblxuICAgICAgaWYoIXRoaXMudmFsaWRhdG9yKHZhbHVlKSl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgIHZhbHVlLCB0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbEluZGV4KTtcbiAgICB9ZWxzZSBpZihlLmtleUNvZGUgPT0gMjcpe1xuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgIG51bGwsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUJsdXIoZSl7XG4gICAgaWYodGhpcy5wcm9wcy5ibHVyVG9TYXZlKXtcbiAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC50eXBlID09ICdjaGVja2JveCc/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldENoZWNrQm94VmFsdWUoZSk6ZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgaWYoIXRoaXMudmFsaWRhdG9yKHZhbHVlKSl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgICAgdmFsdWUsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH1cbiAgfVxuICB2YWxpZGF0b3IodmFsdWUpe1xuICAgICAgdmFyIHRzPXRoaXM7XG4gICAgICBpZih0cy5wcm9wcy5lZGl0YWJsZS52YWxpZGF0b3Ipe1xuICAgICAgICAgIHZhciB2YWxpZD10cy5wcm9wcy5lZGl0YWJsZS52YWxpZGF0b3IodmFsdWUpO1xuICAgICAgICAgIGlmKHZhbGlkIT09dHJ1ZSl7XG4gICAgICAgICAgICAgIHRzLnJlZnMubm90aWZpZXIubm90aWNlKCdlcnJvcicsdmFsaWQsXCJQcmVzc2VkIEVTQyBjYW4gY2FuY2VsXCIpO1xuICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0cy5yZWZzLmlucHV0UmVmO1xuICAgICAgICAgICAgICAvL2FuaW1hdGUgaW5wdXRcbiAgICAgICAgICAgICAgdHMuY2xlYXJUaW1lb3V0KCk7XG4gICAgICAgICAgICAgIHRzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjp0cnVlfSk7XG4gICAgICAgICAgICAgIHRzLnRpbWVvdXRlQ2xlYXI9c2V0VGltZW91dChmdW5jdGlvbigpe3RzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjpmYWxzZX0pO30sMzAwKTtcbiAgICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gIH1cbiAgY2xlYXJUaW1lb3V0KCl7XG4gICAgICBpZih0aGlzLnRpbWVvdXRlQ2xlYXIhPTApe1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRlQ2xlYXIpO1xuICAgICAgICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMuaW5wdXRSZWY7XG4gICAgICAvLyBpbnB1dC52YWx1ZSA9IHRoaXMucHJvcHMuY2hpbGRyZW58fCcnO1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgZWRpdGFibGU9dGhpcy5wcm9wcy5lZGl0YWJsZSxcbiAgICAgICAgZm9ybWF0PXRoaXMucHJvcHMuZm9ybWF0LFxuICAgICAgICBhdHRyPXtcbiAgICAgICAgICAgIHJlZjpcImlucHV0UmVmXCIsXG4gICAgICAgICAgICBvbktleURvd246dGhpcy5oYW5kbGVLZXlQcmVzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25CbHVyOnRoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMpXG4gICAgICAgIH07XG4gICAgICAgIC8vcHV0IHBsYWNlaG9sZGVyIGlmIGV4aXN0XG4gICAgICAgIGVkaXRhYmxlLnBsYWNlaG9sZGVyJiYoYXR0ci5wbGFjZWhvbGRlcj1lZGl0YWJsZS5wbGFjZWhvbGRlcik7XG5cbiAgICB2YXIgZWRpdG9yQ2xhc3M9Y2xhc3NTZXQoeydhbmltYXRlZCc6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvciwnc2hha2UnOnRoaXMuc3RhdGUuc2hha2VFZGl0b3J9KTtcbiAgICByZXR1cm4oXG4gICAgICAgIDx0ZCByZWY9XCJ0ZFwiIHN0eWxlPXt7cG9zaXRpb246J3JlbGF0aXZlJ319PlxuICAgICAgICAgICAge0VkaXRvcihlZGl0YWJsZSxhdHRyLGZvcm1hdCxlZGl0b3JDbGFzcyx0aGlzLnByb3BzLmNoaWxkcmVufHwnJyl9XG4gICAgICAgICAgICA8Tm90aWZpZXIgcmVmPVwibm90aWZpZXJcIj48L05vdGlmaWVyPlxuICAgICAgICA8L3RkPlxuICAgIClcbiAgfVxuXG4gIF9nZXRDaGVja0JveFZhbHVlKGUpe1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIGxldCB2YWx1ZXMgPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUuc3BsaXQoJzonKTtcbiAgICB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5jaGVja2VkP3ZhbHVlc1swXTp2YWx1ZXNbMV07XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbn1cblRhYmxlRWRpdENvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIGNvbXBsZXRlRWRpdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHJvd0luZGV4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBjb2xJbmRleDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgYmx1clRvU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVFZGl0Q29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVFZGl0Q29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbnZhciBFZGl0b3I9ZnVuY3Rpb24oZWRpdGFibGUsIGF0dHIsIGZvcm1hdCwgZWRpdG9yQ2xhc3MsIGRlZmF1bHRWYWx1ZSl7XG5cblxuICAgIGlmKGVkaXRhYmxlPT09dHJ1ZXx8dHlwZW9mIGVkaXRhYmxlPT09XCJzdHJpbmdcIil7Ly9zaW1wbGUgZGVjbGFyZVxuICAgICAgICB2YXIgdHlwZT1lZGl0YWJsZT09PXRydWU/J3RleHQnOmVkaXRhYmxlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPXt0eXBlfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyhlZGl0b3JDbGFzc3x8XCJcIikrXCIgZm9ybS1jb250cm9sIGVkaXRvciBlZGl0LXRleHRcIn0gLz5cbiAgICAgICAgKVxuICAgIH0gZWxzZSBpZighZWRpdGFibGUpe1xuICAgICAgdmFyIHR5cGU9ZWRpdGFibGU9PT10cnVlPyd0ZXh0JzplZGl0YWJsZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPXt0eXBlfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX0gZGlzYWJsZWQ9J2Rpc2FibGVkJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyhlZGl0b3JDbGFzc3x8XCJcIikrXCIgZm9ybS1jb250cm9sIGVkaXRvciBlZGl0LXRleHRcIn0gLz5cbiAgICAgIClcbiAgICB9IGVsc2UgaWYoZWRpdGFibGUudHlwZSl7Ly9zdGFuZGFyZCBkZWNsYXJlXG4gICAgICAgIC8vcHV0IHN0eWxlIGlmIGV4aXN0XG4gICAgICAgIGVkaXRhYmxlLnN0eWxlJiYoYXR0ci5zdHlsZT1lZGl0YWJsZS5zdHlsZSk7XG5cbiAgICAgICAgLy9wdXQgY2xhc3MgaWYgZXhpc3RcbiAgICAgICAgYXR0ci5jbGFzc05hbWUgPSAoZWRpdG9yQ2xhc3N8fFwiXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIiBmb3JtLWNvbnRyb2wgZWRpdG9yIGVkaXQtXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlLnR5cGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0YWJsZS5jbGFzc05hbWU/KFwiIFwiK2VkaXRhYmxlLmNsYXNzTmFtZSk6XCJcIik7XG5cbiAgICAgICAgaWYoZWRpdGFibGUudHlwZSA9PT0gJ3NlbGVjdCcpey8vcHJvY2VzcyBzZWxlY3QgaW5wdXRcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gW10sIHZhbHVlcz1lZGl0YWJsZS5vcHRpb25zLnZhbHVlcztcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodmFsdWVzKSl7Ly9vbmx5IGNhbiB1c2UgYXJycmF5IGRhdGEgZm9yIG9wdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgcm93VmFsdWU7XG4gICAgICAgICAgICAgICAgb3B0aW9ucz12YWx1ZXMubWFwKGZ1bmN0aW9uKGQsaSl7XG4gICAgICAgICAgICAgICAgICAgIHJvd1ZhbHVlPWZvcm1hdD9mb3JtYXQoZCk6ZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9eydvcHRpb24nK2l9IHZhbHVlPXtkfT57cm93VmFsdWV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8c2VsZWN0IHsuLi5hdHRyfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX0+e29wdGlvbnN9PC9zZWxlY3Q+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYoZWRpdGFibGUudHlwZSA9PT0gJ3RleHRhcmVhJyl7Ly9wcm9jZXNzIHRleHRhcmVhIGlucHV0XG4gICAgICAgICAgICAvL3B1dCAgb3RoZXIgaWYgZXhpc3RcbiAgICAgICAgICAgIGVkaXRhYmxlLmNvbHMmJihhdHRyLmNvbHM9ZWRpdGFibGUuY29scyk7XG4gICAgICAgICAgICBlZGl0YWJsZS5yb3dzJiYoYXR0ci5yb3dzPWVkaXRhYmxlLnJvd3MpO1xuICAgICAgICAgICAgdmFyIGtleVVwSGFuZGxlcj1hdHRyLm9uS2V5RG93bixzYXZlQnRuPW51bGw7XG4gICAgICAgICAgICBpZihrZXlVcEhhbmRsZXIpe1xuICAgICAgICAgICAgICAgIGF0dHIub25LZXlEb3duPWZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9IDEzKSB7IC8vbm90IFByZXNzZWQgRU5URVJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleVVwSGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2F2ZUJ0bj08YnV0dG8gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14cyB0ZXh0YXJlYS1zYXZlLWJ0blwiIG9uQ2xpY2s9e2tleVVwSGFuZGxlcn0+c2F2ZTwvYnV0dG8+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgey4uLmF0dHJ9IGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfT48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICB7c2F2ZUJ0bn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmKGVkaXRhYmxlLnR5cGUgPT09ICdjaGVja2JveCcpe1xuICAgICAgICAgIGxldCB2YWx1ZXMgPSAndHJ1ZTpmYWxzZSc7XG4gICAgICAgICAgaWYoZWRpdGFibGUub3B0aW9ucyAmJiBlZGl0YWJsZS5vcHRpb25zLnZhbHVlcyl7XG4gICAgICAgICAgICAvLyB2YWx1ZXMgPSBlZGl0YWJsZS5vcHRpb25zLnZhbHVlcy5zcGxpdCgnOicpO1xuICAgICAgICAgICAgdmFsdWVzID0gZWRpdGFibGUub3B0aW9ucy52YWx1ZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF0dHIuY2xhc3NOYW1lID0gYXR0ci5jbGFzc05hbWUucmVwbGFjZSgnZm9ybS1jb250cm9sJywnJyk7XG4gICAgICAgICAgYXR0ci5jbGFzc05hbWUgKz0gJyBjaGVja2JveCBwdWxsLXJpZ2h0JztcblxuICAgICAgICAgIGxldCBjaGVja2VkID0gZGVmYXVsdFZhbHVlICYmIGRlZmF1bHRWYWx1ZS50b1N0cmluZygpID09IHZhbHVlcy5zcGxpdCgnOicpWzBdP3RydWU6ZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPSdjaGVja2JveCcgdmFsdWU9e3ZhbHVlc30gZGVmYXVsdENoZWNrZWQ9e2NoZWNrZWR9Lz5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2V7Ly9wcm9jZXNzIG90aGVyIGlucHV0IHR5cGUuIGFzIHBhc3N3b3JkLHVybCxlbWFpbC4uLlxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT17dHlwZX0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9Lz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2RlZmF1bHQgcmV0dXJuIGZvciBvdGhlciBjYXNlIG9mIGVkaXRhYmxlXG4gICAgcmV0dXJuKFxuICAgICAgICA8aW5wdXQgey4uLmF0dHJ9IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPXsoZWRpdG9yQ2xhc3N8fFwiXCIpK1wiIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0XCJ9Lz5cbiAgICApXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FZGl0b3IuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuXG5pbXBvcnQge1xuICBUb2FzdENvbnRhaW5lcixcbiAgVG9hc3RNZXNzYWdlLFxufSBmcm9tIFwicmVhY3QtdG9hc3RyXCI7XG5cblxudmFyIFRvYXN0ck1lc3NhZ2VGYWN0b3J5PVJlYWN0LmNyZWF0ZUZhY3RvcnkoVG9hc3RNZXNzYWdlLmFuaW1hdGlvbik7XG5cbmNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgLy8gYWxsb3cgdHlwZSBpcyBzdWNjZXNzLGluZm8sd2FybmluZyxlcnJvclxuICBub3RpY2UodHlwZSxtc2csdGl0bGUpe1xuICAgIHRoaXMucmVmcy50b2FzdHJbdHlwZV0oXG4gICAgICAgIG1zZyx0aXRsZSwge1xuICAgICAgICAgIG1vZGU6J3NpbmdsZScsXG4gICAgICAgICAgdGltZU91dDogNTAwMCxcbiAgICAgICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDAsXG4gICAgICAgICAgc2hvd0FuaW1hdGlvbjogXCJhbmltYXRlZCAgYm91bmNlSW5cIixcbiAgICAgICAgICBoaWRlQW5pbWF0aW9uOiBcImFuaW1hdGVkIGJvdW5jZU91dFwiXG4gICAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgcmV0dXJuKFxuICAgICAgICA8VG9hc3RDb250YWluZXIgcmVmPVwidG9hc3RyXCIgdG9hc3RNZXNzYWdlRmFjdG9yeT17VG9hc3RyTWVzc2FnZUZhY3Rvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ0b2FzdC1jb250YWluZXJcIiAgY2xhc3NOYW1lPVwidG9hc3QtdG9wLXJpZ2h0XCI+PC9Ub2FzdENvbnRhaW5lcj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvTm90aWZpY2F0aW9uLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRvYXN0TWVzc2FnZSA9IGV4cG9ydHMuVG9hc3RDb250YWluZXIgPSB1bmRlZmluZWQ7XG5cbnZhciBfVG9hc3RDb250YWluZXIgPSByZXF1aXJlKFwiLi9Ub2FzdENvbnRhaW5lclwiKTtcblxudmFyIF9Ub2FzdENvbnRhaW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2FzdENvbnRhaW5lcik7XG5cbnZhciBfVG9hc3RNZXNzYWdlID0gcmVxdWlyZShcIi4vVG9hc3RNZXNzYWdlXCIpO1xuXG52YXIgX1RvYXN0TWVzc2FnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2FzdE1lc3NhZ2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLlRvYXN0Q29udGFpbmVyID0gX1RvYXN0Q29udGFpbmVyMi5kZWZhdWx0O1xuZXhwb3J0cy5Ub2FzdE1lc3NhZ2UgPSBfVG9hc3RNZXNzYWdlMi5kZWZhdWx0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlID0gcmVxdWlyZShcInJlYWN0LWFkZG9ucy11cGRhdGVcIik7XG5cbnZhciBfcmVhY3RBZGRvbnNVcGRhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNVcGRhdGUpO1xuXG52YXIgX1RvYXN0TWVzc2FnZSA9IHJlcXVpcmUoXCIuL1RvYXN0TWVzc2FnZVwiKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9hc3RNZXNzYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgVG9hc3RDb250YWluZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoVG9hc3RDb250YWluZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRvYXN0Q29udGFpbmVyKCkge1xuICAgIHZhciBfT2JqZWN0JGdldFByb3RvdHlwZU87XG5cbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRvYXN0Q29udGFpbmVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9PYmplY3QkZ2V0UHJvdG90eXBlTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihUb2FzdENvbnRhaW5lcikpLmNhbGwuYXBwbHkoX09iamVjdCRnZXRQcm90b3R5cGVPLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7XG4gICAgICB0b2FzdHM6IFtdLFxuICAgICAgdG9hc3RJZDogMCxcbiAgICAgIHByZXZpb3VzTWVzc2FnZTogbnVsbFxuICAgIH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRvYXN0Q29udGFpbmVyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKSB7XG4gICAgICB0aGlzLl9ub3RpZnkodGhpcy5wcm9wcy50b2FzdFR5cGUuZXJyb3IsIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZm8obWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLmluZm8sIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdWNjZXNzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLnN1Y2Nlc3MsIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ3YXJuaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLndhcm5pbmcsIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnJlZnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfdGhpczIucmVmc1trZXldLmhpZGVUb2FzdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IFwiYXJpYS1saXZlXCI6IFwicG9saXRlXCIsIHJvbGU6IFwiYWxlcnRcIiB9KSxcbiAgICAgICAgdGhpcy5zdGF0ZS50b2FzdHMubWFwKGZ1bmN0aW9uICh0b2FzdCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMucHJvcHMudG9hc3RNZXNzYWdlRmFjdG9yeSh0b2FzdCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfbm90aWZ5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9ub3RpZnkodHlwZSwgbWVzc2FnZSwgdGl0bGUpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgb3B0aW9uc092ZXJyaWRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbM107XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLnByZXZlbnREdXBsaWNhdGVzKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnByZXZpb3VzTWVzc2FnZSA9PT0gbWVzc2FnZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGtleSA9IHRoaXMuc3RhdGUudG9hc3RJZCsrO1xuICAgICAgdmFyIHRvYXN0SWQgPSBrZXk7XG4gICAgICB2YXIgbmV3VG9hc3QgPSAoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShvcHRpb25zT3ZlcnJpZGUsIHtcbiAgICAgICAgJG1lcmdlOiB7XG4gICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICB0b2FzdElkOiB0b2FzdElkLFxuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHJlZjogXCJ0b2FzdHNfX1wiICsga2V5LFxuICAgICAgICAgIGhhbmRsZU9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZU9uQ2xpY2soZSkge1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnNPdmVycmlkZS5oYW5kbGVPbkNsaWNrKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnNPdmVycmlkZS5oYW5kbGVPbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM0Ll9oYW5kbGVfdG9hc3Rfb25fY2xpY2soZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBoYW5kbGVSZW1vdmU6IHRoaXMuX2hhbmRsZV90b2FzdF9yZW1vdmUuYmluZCh0aGlzKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciB0b2FzdE9wZXJhdGlvbiA9IF9kZWZpbmVQcm9wZXJ0eSh7fSwgXCJcIiArICh0aGlzLnByb3BzLm5ld2VzdE9uVG9wID8gXCIkdW5zaGlmdFwiIDogXCIkcHVzaFwiKSwgW25ld1RvYXN0XSk7XG5cbiAgICAgIHZhciBuZXh0U3RhdGUgPSAoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KSh0aGlzLnN0YXRlLCB7XG4gICAgICAgIHRvYXN0czogdG9hc3RPcGVyYXRpb24sXG4gICAgICAgIHByZXZpb3VzTWVzc2FnZTogeyAkc2V0OiBtZXNzYWdlIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaGFuZGxlX3RvYXN0X29uX2NsaWNrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVfdG9hc3Rfb25fY2xpY2soZXZlbnQpIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oYW5kbGVfdG9hc3RfcmVtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVfdG9hc3RfcmVtb3ZlKHRvYXN0SWQpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgb3BlcmF0aW9uTmFtZSA9IFwiXCIgKyAodGhpcy5wcm9wcy5uZXdlc3RPblRvcCA/IFwicmVkdWNlUmlnaHRcIiA6IFwicmVkdWNlXCIpO1xuICAgICAgdGhpcy5zdGF0ZS50b2FzdHNbb3BlcmF0aW9uTmFtZV0oZnVuY3Rpb24gKGZvdW5kLCB0b2FzdCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGZvdW5kIHx8IHRvYXN0LnRvYXN0SWQgIT09IHRvYXN0SWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXM1LnNldFN0YXRlKCgwLCBfcmVhY3RBZGRvbnNVcGRhdGUyLmRlZmF1bHQpKF90aGlzNS5zdGF0ZSwge1xuICAgICAgICAgIHRvYXN0czogeyAkc3BsaWNlOiBbW2luZGV4LCAxXV0gfVxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUb2FzdENvbnRhaW5lcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblRvYXN0Q29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgdG9hc3RUeXBlOiB7XG4gICAgZXJyb3I6IFwiZXJyb3JcIixcbiAgICBpbmZvOiBcImluZm9cIixcbiAgICBzdWNjZXNzOiBcInN1Y2Nlc3NcIixcbiAgICB3YXJuaW5nOiBcIndhcm5pbmdcIlxuICB9LFxuICBpZDogXCJ0b2FzdC1jb250YWluZXJcIixcbiAgdG9hc3RNZXNzYWdlRmFjdG9yeTogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUZhY3RvcnkoX1RvYXN0TWVzc2FnZTIuZGVmYXVsdCksXG4gIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcbiAgbmV3ZXN0T25Ub3A6IHRydWUsXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRvYXN0Q29udGFpbmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvdXBkYXRlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL34vcmVhY3QtYWRkb25zLXVwZGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdXBkYXRlXG4gKi9cblxuLyogZ2xvYmFsIGhhc093blByb3BlcnR5OnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGhhc093blByb3BlcnR5ID0gKHt9KS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gc2hhbGxvd0NvcHkoeCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB4LmNvbmNhdCgpO1xuICB9IGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFzc2lnbihuZXcgeC5jb25zdHJ1Y3RvcigpLCB4KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geDtcbiAgfVxufVxuXG52YXIgQ09NTUFORF9QVVNIID0ga2V5T2YoeyAkcHVzaDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1VOU0hJRlQgPSBrZXlPZih7ICR1bnNoaWZ0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfU1BMSUNFID0ga2V5T2YoeyAkc3BsaWNlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfU0VUID0ga2V5T2YoeyAkc2V0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfTUVSR0UgPSBrZXlPZih7ICRtZXJnZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX0FQUExZID0ga2V5T2YoeyAkYXBwbHk6IG51bGwgfSk7XG5cbnZhciBBTExfQ09NTUFORFNfTElTVCA9IFtDT01NQU5EX1BVU0gsIENPTU1BTkRfVU5TSElGVCwgQ09NTUFORF9TUExJQ0UsIENPTU1BTkRfU0VULCBDT01NQU5EX01FUkdFLCBDT01NQU5EX0FQUExZXTtcblxudmFyIEFMTF9DT01NQU5EU19TRVQgPSB7fTtcblxuQUxMX0NPTU1BTkRTX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoY29tbWFuZCkge1xuICBBTExfQ09NTUFORFNfU0VUW2NvbW1hbmRdID0gdHJ1ZTtcbn0pO1xuXG5mdW5jdGlvbiBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIGNvbW1hbmQpIHtcbiAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCB0YXJnZXQgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4nLCBjb21tYW5kLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICB2YXIgc3BlY1ZhbHVlID0gc3BlY1tjb21tYW5kXTtcbiAgIUFycmF5LmlzQXJyYXkoc3BlY1ZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXIgaW4gYW4gYXJyYXk/JywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgc3BlYykge1xuICAhKHR5cGVvZiBzcGVjID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IFlvdSBwcm92aWRlZCBhIGtleSBwYXRoIHRvIHVwZGF0ZSgpIHRoYXQgZGlkIG5vdCBjb250YWluIG9uZSAnICsgJ29mICVzLiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIHslczogLi4ufT8nLCBBTExfQ09NTUFORFNfTElTVC5qb2luKCcsICcpLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU0VUKSkge1xuICAgICEoT2JqZWN0LmtleXMoc3BlYykubGVuZ3RoID09PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDYW5ub3QgaGF2ZSBtb3JlIHRoYW4gb25lIGtleSBpbiBhbiBvYmplY3Qgd2l0aCAlcycsIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gc3BlY1tDT01NQU5EX1NFVF07XG4gIH1cblxuICB2YXIgbmV4dFZhbHVlID0gc2hhbGxvd0NvcHkodmFsdWUpO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfTUVSR0UpKSB7XG4gICAgdmFyIG1lcmdlT2JqID0gc3BlY1tDT01NQU5EX01FUkdFXTtcbiAgICAhKG1lcmdlT2JqICYmIHR5cGVvZiBtZXJnZU9iaiA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgc3BlYyBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbWVyZ2VPYmopIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhKG5leHRWYWx1ZSAmJiB0eXBlb2YgbmV4dFZhbHVlID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSB0YXJnZXQgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG5leHRWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGFzc2lnbihuZXh0VmFsdWUsIHNwZWNbQ09NTUFORF9NRVJHRV0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9QVVNIKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9QVVNIKTtcbiAgICBzcGVjW0NPTU1BTkRfUFVTSF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1VOU0hJRlQpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1VOU0hJRlQpO1xuICAgIHNwZWNbQ09NTUFORF9VTlNISUZUXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUudW5zaGlmdChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU1BMSUNFKSkge1xuICAgICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCAlcyB0YXJnZXQgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICFBcnJheS5pc0FycmF5KHNwZWNbQ09NTUFORF9TUExJQ0VdKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBzcGVjW0NPTU1BTkRfU1BMSUNFXS5mb3JFYWNoKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAhQXJyYXkuaXNBcnJheShhcmdzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIG5leHRWYWx1ZS5zcGxpY2UuYXBwbHkobmV4dFZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfQVBQTFkpKSB7XG4gICAgISh0eXBlb2Ygc3BlY1tDT01NQU5EX0FQUExZXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYSBmdW5jdGlvbjsgZ290ICVzLicsIENPTU1BTkRfQVBQTFksIHNwZWNbQ09NTUFORF9BUFBMWV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBuZXh0VmFsdWUgPSBzcGVjW0NPTU1BTkRfQVBQTFldKG5leHRWYWx1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrIGluIHNwZWMpIHtcbiAgICBpZiAoIShBTExfQ09NTUFORFNfU0VULmhhc093blByb3BlcnR5KGspICYmIEFMTF9DT01NQU5EU19TRVRba10pKSB7XG4gICAgICBuZXh0VmFsdWVba10gPSB1cGRhdGUodmFsdWVba10sIHNwZWNba10pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi91cGRhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU9mXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtleU9mID0gZnVuY3Rpb24gKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qvfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qvfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmpRdWVyeSA9IGV4cG9ydHMuYW5pbWF0aW9uID0gdW5kZWZpbmVkO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZSA9IHJlcXVpcmUoXCJyZWFjdC1hZGRvbnMtdXBkYXRlXCIpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zVXBkYXRlKTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9hbmltYXRpb25NaXhpbiA9IHJlcXVpcmUoXCIuL2FuaW1hdGlvbk1peGluXCIpO1xuXG52YXIgX2FuaW1hdGlvbk1peGluMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FuaW1hdGlvbk1peGluKTtcblxudmFyIF9qUXVlcnlNaXhpbiA9IHJlcXVpcmUoXCIuL2pRdWVyeU1peGluXCIpO1xuXG52YXIgX2pRdWVyeU1peGluMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pRdWVyeU1peGluKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBUb2FzdE1lc3NhZ2VTcGVjID0ge1xuICBkaXNwbGF5TmFtZTogXCJUb2FzdE1lc3NhZ2VcIixcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICB2YXIgaWNvbkNsYXNzTmFtZXMgPSB7XG4gICAgICBlcnJvcjogXCJ0b2FzdC1lcnJvclwiLFxuICAgICAgaW5mbzogXCJ0b2FzdC1pbmZvXCIsXG4gICAgICBzdWNjZXNzOiBcInRvYXN0LXN1Y2Nlc3NcIixcbiAgICAgIHdhcm5pbmc6IFwidG9hc3Qtd2FybmluZ1wiXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBjbGFzc05hbWU6IFwidG9hc3RcIixcbiAgICAgIGljb25DbGFzc05hbWVzOiBpY29uQ2xhc3NOYW1lcyxcbiAgICAgIHRpdGxlQ2xhc3NOYW1lOiBcInRvYXN0LXRpdGxlXCIsXG4gICAgICBtZXNzYWdlQ2xhc3NOYW1lOiBcInRvYXN0LW1lc3NhZ2VcIixcbiAgICAgIHRhcFRvRGlzbWlzczogdHJ1ZSxcbiAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGhhbmRsZU9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZU9uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uQ2xpY2soZXZlbnQpO1xuICAgIGlmICh0aGlzLnByb3BzLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5oaWRlVG9hc3QodHJ1ZSk7XG4gICAgfVxuICB9LFxuICBfaGFuZGxlX2Nsb3NlX2J1dHRvbl9jbGljazogZnVuY3Rpb24gX2hhbmRsZV9jbG9zZV9idXR0b25fY2xpY2soZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpZGVUb2FzdCh0cnVlKTtcbiAgfSxcbiAgX2hhbmRsZV9yZW1vdmU6IGZ1bmN0aW9uIF9oYW5kbGVfcmVtb3ZlKCkge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlKHRoaXMucHJvcHMudG9hc3RJZCk7XG4gIH0sXG4gIF9yZW5kZXJfY2xvc2VfYnV0dG9uOiBmdW5jdGlvbiBfcmVuZGVyX2Nsb3NlX2J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jbG9zZUJ1dHRvbiA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJ0b2FzdC1jbG9zZS1idXR0b25cIiwgcm9sZTogXCJidXR0b25cIixcbiAgICAgIG9uQ2xpY2s6IHRoaXMuX2hhbmRsZV9jbG9zZV9idXR0b25fY2xpY2ssXG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IFwiJnRpbWVzO1wiIH1cbiAgICB9KSA6IGZhbHNlO1xuICB9LFxuICBfcmVuZGVyX3RpdGxlX2VsZW1lbnQ6IGZ1bmN0aW9uIF9yZW5kZXJfdGl0bGVfZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZSA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLnRpdGxlQ2xhc3NOYW1lIH0sXG4gICAgICB0aGlzLnByb3BzLnRpdGxlXG4gICAgKSA6IGZhbHNlO1xuICB9LFxuICBfcmVuZGVyX21lc3NhZ2VfZWxlbWVudDogZnVuY3Rpb24gX3JlbmRlcl9tZXNzYWdlX2VsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubWVzc2FnZSA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLm1lc3NhZ2VDbGFzc05hbWUgfSxcbiAgICAgIHRoaXMucHJvcHMubWVzc2FnZVxuICAgICkgOiBmYWxzZTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIGljb25DbGFzc05hbWUgPSB0aGlzLnByb3BzLmljb25DbGFzc05hbWUgfHwgdGhpcy5wcm9wcy5pY29uQ2xhc3NOYW1lc1t0aGlzLnByb3BzLnR5cGVdO1xuXG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKHRoaXMucHJvcHMuY2xhc3NOYW1lLCBpY29uQ2xhc3NOYW1lKSxcbiAgICAgICAgc3R5bGU6IHRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlT25DbGljayxcbiAgICAgICAgb25Nb3VzZUVudGVyOiB0aGlzLmhhbmRsZU1vdXNlRW50ZXIsXG4gICAgICAgIG9uTW91c2VMZWF2ZTogdGhpcy5oYW5kbGVNb3VzZUxlYXZlXG4gICAgICB9LFxuICAgICAgdGhpcy5fcmVuZGVyX2Nsb3NlX2J1dHRvbigpLFxuICAgICAgdGhpcy5fcmVuZGVyX3RpdGxlX2VsZW1lbnQoKSxcbiAgICAgIHRoaXMuX3JlbmRlcl9tZXNzYWdlX2VsZW1lbnQoKVxuICAgICk7XG4gIH1cbn07XG5cbnZhciBhbmltYXRpb24gPSBleHBvcnRzLmFuaW1hdGlvbiA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcygoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShUb2FzdE1lc3NhZ2VTcGVjLCB7XG4gIGRpc3BsYXlOYW1lOiB7ICRzZXQ6IFwiVG9hc3RNZXNzYWdlLmFuaW1hdGlvblwiIH0sXG4gIG1peGluczogeyAkc2V0OiBbX2FuaW1hdGlvbk1peGluMi5kZWZhdWx0XSB9XG59KSk7XG5cbnZhciBqUXVlcnkgPSBleHBvcnRzLmpRdWVyeSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcygoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShUb2FzdE1lc3NhZ2VTcGVjLCB7XG4gIGRpc3BsYXlOYW1lOiB7ICRzZXQ6IFwiVG9hc3RNZXNzYWdlLmpRdWVyeVwiIH0sXG4gIG1peGluczogeyAkc2V0OiBbX2pRdWVyeU1peGluMi5kZWZhdWx0XSB9XG59KSk7XG5cbi8qXG4gKiBhc3NpZ24gZGVmYXVsdCBub29wIGZ1bmN0aW9uc1xuICovXG5Ub2FzdE1lc3NhZ2VTcGVjLmhhbmRsZU1vdXNlRW50ZXIgPSBub29wO1xuVG9hc3RNZXNzYWdlU3BlYy5oYW5kbGVNb3VzZUxlYXZlID0gbm9vcDtcblRvYXN0TWVzc2FnZVNwZWMuaGlkZVRvYXN0ID0gbm9vcDtcblxudmFyIFRvYXN0TWVzc2FnZSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcyhUb2FzdE1lc3NhZ2VTcGVjKTtcblxuVG9hc3RNZXNzYWdlLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcblRvYXN0TWVzc2FnZS5qUXVlcnkgPSBqUXVlcnk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRvYXN0TWVzc2FnZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9DU1NDb3JlID0gcmVxdWlyZShcImZianMvbGliL0NTU0NvcmVcIik7XG5cbnZhciBfQ1NTQ29yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DU1NDb3JlKTtcblxudmFyIF9SZWFjdFRyYW5zaXRpb25FdmVudHMgPSByZXF1aXJlKFwicmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50c1wiKTtcblxudmFyIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUmVhY3RUcmFuc2l0aW9uRXZlbnRzKTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVElDSyA9IDE3O1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zaXRpb246IG51bGwsIC8vIHNvbWUgZXhhbXBsZXMgZGVmaW5lZCBpbiBpbmRleC5zY3NzIChzY2FsZSwgZmFkZUluT3V0LCByb3RhdGUpXG4gICAgICBzaG93QW5pbWF0aW9uOiBcImFuaW1hdGVkIGJvdW5jZUluXCIsIC8vIG9yIG90aGVyIGFuaW1hdGlvbnMgZnJvbSBhbmltYXRlLmNzc1xuICAgICAgaGlkZUFuaW1hdGlvbjogXCJhbmltYXRlZCBib3VuY2VPdXRcIixcbiAgICAgIHRpbWVPdXQ6IDUwMDAsXG4gICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDBcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlID0gW107XG4gICAgdGhpcy5pc0hpZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGw7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5faXNfbW91bnRlZCA9IHRydWU7XG4gICAgdGhpcy5fc2hvdygpO1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgdmFyIG9uSGlkZUNvbXBsZXRlID0gZnVuY3Rpb24gb25IaWRlQ29tcGxldGUoKSB7XG4gICAgICBpZiAoX3RoaXMuaXNIaWRpbmcpIHtcbiAgICAgICAgX3RoaXMuX3NldF9pc19oaWRpbmcoZmFsc2UpO1xuICAgICAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LnJlbW92ZUVuZEV2ZW50TGlzdGVuZXIobm9kZSwgb25IaWRlQ29tcGxldGUpO1xuICAgICAgICBfdGhpcy5faGFuZGxlX3JlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5hZGRFbmRFdmVudExpc3RlbmVyKG5vZGUsIG9uSGlkZUNvbXBsZXRlKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy50aW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5faXNfbW91bnRlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmludGVydmFsSWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsSWQpO1xuICAgIH1cbiAgfSxcbiAgX3NldF90cmFuc2l0aW9uOiBmdW5jdGlvbiBfc2V0X3RyYW5zaXRpb24oaGlkZSkge1xuICAgIHZhciBhbmltYXRpb25UeXBlID0gaGlkZSA/IFwibGVhdmVcIiA6IFwiZW50ZXJcIjtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy50cmFuc2l0aW9uICsgXCItXCIgKyBhbmltYXRpb25UeXBlO1xuICAgIHZhciBhY3RpdmVDbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIi1hY3RpdmVcIjtcblxuICAgIHZhciBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIGVuZExpc3RlbmVyKGUpIHtcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICE9PSBub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGFjdGl2ZUNsYXNzTmFtZSk7XG5cbiAgICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQucmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQuYWRkRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG5cbiAgICBfQ1NTQ29yZTIuZGVmYXVsdC5hZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuXG4gICAgLy8gTmVlZCB0byBkbyB0aGlzIHRvIGFjdHVhbGx5IHRyaWdnZXIgYSB0cmFuc2l0aW9uLlxuICAgIHRoaXMuX3F1ZXVlX2NsYXNzKGFjdGl2ZUNsYXNzTmFtZSk7XG4gIH0sXG4gIF9jbGVhcl90cmFuc2l0aW9uOiBmdW5jdGlvbiBfY2xlYXJfdHJhbnNpdGlvbihoaWRlKSB7XG4gICAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcyk7XG4gICAgdmFyIGFuaW1hdGlvblR5cGUgPSBoaWRlID8gXCJsZWF2ZVwiIDogXCJlbnRlclwiO1xuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnRyYW5zaXRpb24gKyBcIi1cIiArIGFuaW1hdGlvblR5cGU7XG4gICAgdmFyIGFjdGl2ZUNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiLWFjdGl2ZVwiO1xuXG4gICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcbiAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuICB9LFxuICBfc2V0X2FuaW1hdGlvbjogZnVuY3Rpb24gX3NldF9hbmltYXRpb24oaGlkZSkge1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHZhciBhbmltYXRpb25zID0gdGhpcy5fZ2V0X2FuaW1hdGlvbl9jbGFzc2VzKGhpZGUpO1xuICAgIHZhciBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIGVuZExpc3RlbmVyKGUpIHtcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICE9PSBub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYW5pbWF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltKSB7XG4gICAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGFuaW0pO1xuICAgICAgfSk7XG5cbiAgICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQucmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQuYWRkRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG5cbiAgICBhbmltYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFuaW0pIHtcbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LmFkZENsYXNzKG5vZGUsIGFuaW0pO1xuICAgIH0pO1xuICB9LFxuICBfZ2V0X2FuaW1hdGlvbl9jbGFzc2VzOiBmdW5jdGlvbiBfZ2V0X2FuaW1hdGlvbl9jbGFzc2VzKGhpZGUpIHtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IGhpZGUgPyB0aGlzLnByb3BzLmhpZGVBbmltYXRpb24gOiB0aGlzLnByb3BzLnNob3dBbmltYXRpb247XG4gICAgaWYgKFwiW29iamVjdCBBcnJheV1cIiA9PT0gdG9TdHJpbmcuY2FsbChhbmltYXRpb25zKSkge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbnM7XG4gICAgfSBlbHNlIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgYW5pbWF0aW9ucykge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbnMuc3BsaXQoXCIgXCIpO1xuICAgIH1cbiAgfSxcbiAgX2NsZWFyX2FuaW1hdGlvbjogZnVuY3Rpb24gX2NsZWFyX2FuaW1hdGlvbihoaWRlKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgYW5pbWF0aW9ucyA9IHRoaXMuX2dldF9hbmltYXRpb25fY2xhc3NlcyhoaWRlKTtcbiAgICBhbmltYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFuaW1hdGlvbikge1xuICAgICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKF90aGlzMiksIGFuaW1hdGlvbik7XG4gICAgfSk7XG4gIH0sXG4gIF9xdWV1ZV9jbGFzczogZnVuY3Rpb24gX3F1ZXVlX2NsYXNzKGNsYXNzTmFtZSkge1xuICAgIHRoaXMuY2xhc3NOYW1lUXVldWUucHVzaChjbGFzc05hbWUpO1xuXG4gICAgaWYgKCF0aGlzLnRpbWVvdXQpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fZmx1c2hfY2xhc3NfbmFtZV9xdWV1ZSwgVElDSyk7XG4gICAgfVxuICB9LFxuICBfZmx1c2hfY2xhc3NfbmFtZV9xdWV1ZTogZnVuY3Rpb24gX2ZsdXNoX2NsYXNzX25hbWVfcXVldWUoKSB7XG4gICAgaWYgKHRoaXMuX2lzX21vdW50ZWQpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lUXVldWUuZm9yRWFjaChfQ1NTQ29yZTIuZGVmYXVsdC5hZGRDbGFzcy5iaW5kKF9DU1NDb3JlMi5kZWZhdWx0LCBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcykpKTtcbiAgICB9XG4gICAgdGhpcy5jbGFzc05hbWVRdWV1ZS5sZW5ndGggPSAwO1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gIH0sXG4gIF9zaG93OiBmdW5jdGlvbiBfc2hvdygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfdHJhbnNpdGlvbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93QW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfYW5pbWF0aW9uKCk7XG4gICAgfVxuICB9LFxuICBoYW5kbGVNb3VzZUVudGVyOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChudWxsKTtcbiAgICBpZiAodGhpcy5pc0hpZGluZykge1xuICAgICAgdGhpcy5fc2V0X2lzX2hpZGluZyhmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmhpZGVBbmltYXRpb24pIHtcbiAgICAgICAgdGhpcy5fY2xlYXJfYW5pbWF0aW9uKHRydWUpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5fY2xlYXJfdHJhbnNpdGlvbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhhbmRsZU1vdXNlTGVhdmU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKCF0aGlzLmlzSGlkaW5nICYmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwIHx8IHRoaXMucHJvcHMuZXh0ZW5kZWRUaW1lT3V0ID4gMCkpIHtcbiAgICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChzZXRUaW1lb3V0KHRoaXMuaGlkZVRvYXN0LCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgaGlkZVRvYXN0OiBmdW5jdGlvbiBoaWRlVG9hc3Qob3ZlcnJpZGUpIHtcbiAgICBpZiAodGhpcy5pc0hpZGluZyB8fCB0aGlzLmludGVydmFsSWQgPT09IG51bGwgJiYgIW92ZXJyaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0X2lzX2hpZGluZyh0cnVlKTtcbiAgICBpZiAodGhpcy5wcm9wcy50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfdHJhbnNpdGlvbih0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuaGlkZUFuaW1hdGlvbikge1xuICAgICAgdGhpcy5fc2V0X2FuaW1hdGlvbih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlX3JlbW92ZSgpO1xuICAgIH1cbiAgfSxcbiAgX3NldF9pbnRlcnZhbF9pZDogZnVuY3Rpb24gX3NldF9pbnRlcnZhbF9pZChpbnRlcnZhbElkKSB7XG4gICAgdGhpcy5pbnRlcnZhbElkID0gaW50ZXJ2YWxJZDtcbiAgfSxcbiAgX3NldF9pc19oaWRpbmc6IGZ1bmN0aW9uIF9zZXRfaXNfaGlkaW5nKGlzSGlkaW5nKSB7XG4gICAgdGhpcy5pc0hpZGluZyA9IGlzSGlkaW5nO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2FuaW1hdGlvbk1peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NDb3JlXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJy4vaW52YXJpYW50Jyk7XG5cbi8qKlxuICogVGhlIENTU0NvcmUgbW9kdWxlIHNwZWNpZmllcyB0aGUgQVBJIChhbmQgaW1wbGVtZW50cyBtb3N0IG9mIHRoZSBtZXRob2RzKVxuICogdGhhdCBzaG91bGQgYmUgdXNlZCB3aGVuIGRlYWxpbmcgd2l0aCB0aGUgZGlzcGxheSBvZiBlbGVtZW50cyAodmlhIHRoZWlyXG4gKiBDU1MgY2xhc3NlcyBhbmQgdmlzaWJpbGl0eSBvbiBzY3JlZW4uIEl0IGlzIGFuIEFQSSBmb2N1c2VkIG9uIG11dGF0aW5nIHRoZVxuICogZGlzcGxheSBhbmQgbm90IHJlYWRpbmcgaXQgYXMgbm8gbG9naWNhbCBzdGF0ZSBzaG91bGQgYmUgZW5jb2RlZCBpbiB0aGVcbiAqIGRpc3BsYXkgb2YgZWxlbWVudHMuXG4gKi9cblxudmFyIENTU0NvcmUgPSB7XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGNsYXNzIHBhc3NlZCBpbiB0byB0aGUgZWxlbWVudCBpZiBpdCBkb2Vzbid0IGFscmVhZHkgaGF2ZSBpdC5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGUgZWxlbWVudCBwYXNzZWQgaW5cbiAgICovXG4gIGFkZENsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgISEvXFxzLy50ZXN0KGNsYXNzTmFtZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ1NTQ29yZS5hZGRDbGFzcyB0YWtlcyBvbmx5IGEgc2luZ2xlIGNsYXNzIG5hbWUuIFwiJXNcIiBjb250YWlucyAnICsgJ211bHRpcGxlIGNsYXNzZXMuJywgY2xhc3NOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKCFDU1NDb3JlLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNsYXNzIHBhc3NlZCBpbiBmcm9tIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhlIGVsZW1lbnQgcGFzc2VkIGluXG4gICAqL1xuICByZW1vdmVDbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0NTU0NvcmUucmVtb3ZlQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLiBcIiVzXCIgY29udGFpbnMgJyArICdtdWx0aXBsZSBjbGFzc2VzLicsIGNsYXNzTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIGlmIChDU1NDb3JlLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHN8JCknLCAnZycpLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gbXVsdGlwbGUgc3BhY2VzIHRvIG9uZVxuICAgICAgICAucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpOyAvLyB0cmltIHRoZSBlbmRzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gYWRkIG9yIHJlbW92ZSBhIGNsYXNzIGZyb20gYW4gZWxlbWVudCBiYXNlZCBvbiBhIGNvbmRpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcGFyYW0geyp9IGJvb2wgY29uZGl0aW9uIHRvIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSB0aGUgY2xhc3NcbiAgICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhlIGVsZW1lbnQgcGFzc2VkIGluXG4gICAqL1xuICBjb25kaXRpb25DbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSwgYm9vbCkge1xuICAgIHJldHVybiAoYm9vbCA/IENTU0NvcmUuYWRkQ2xhc3MgOiBDU1NDb3JlLnJlbW92ZUNsYXNzKShlbGVtZW50LCBjbGFzc05hbWUpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUZXN0cyB3aGV0aGVyIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3Mgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTU5vZGV8RE9NV2luZG93fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAhIS9cXHMvLnRlc3QoY2xhc3NOYW1lKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1MuaGFzQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIHJldHVybiAhIWNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENTU0NvcmU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvQ1NTQ29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFRyYW5zaXRpb25FdmVudHNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJ2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbi8qKlxuICogRVZFTlRfTkFNRV9NQVAgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hpY2ggZXZlbnQgZmlyZWQgd2hlbiBhXG4gKiB0cmFuc2l0aW9uL2FuaW1hdGlvbiBlbmRzLCBiYXNlZCBvbiB0aGUgc3R5bGUgcHJvcGVydHkgdXNlZCB0b1xuICogZGVmaW5lIHRoYXQgZXZlbnQuXG4gKi9cbnZhciBFVkVOVF9OQU1FX01BUCA9IHtcbiAgdHJhbnNpdGlvbmVuZDoge1xuICAgICd0cmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICdXZWJraXRUcmFuc2l0aW9uJzogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICdNb3pUcmFuc2l0aW9uJzogJ21velRyYW5zaXRpb25FbmQnLFxuICAgICdPVHJhbnNpdGlvbic6ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgJ21zVHJhbnNpdGlvbic6ICdNU1RyYW5zaXRpb25FbmQnXG4gIH0sXG5cbiAgYW5pbWF0aW9uZW5kOiB7XG4gICAgJ2FuaW1hdGlvbic6ICdhbmltYXRpb25lbmQnLFxuICAgICdXZWJraXRBbmltYXRpb24nOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICAnTW96QW5pbWF0aW9uJzogJ21vekFuaW1hdGlvbkVuZCcsXG4gICAgJ09BbmltYXRpb24nOiAnb0FuaW1hdGlvbkVuZCcsXG4gICAgJ21zQW5pbWF0aW9uJzogJ01TQW5pbWF0aW9uRW5kJ1xuICB9XG59O1xuXG52YXIgZW5kRXZlbnRzID0gW107XG5cbmZ1bmN0aW9uIGRldGVjdEV2ZW50cygpIHtcbiAgdmFyIHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB2YXIgc3R5bGUgPSB0ZXN0RWwuc3R5bGU7XG5cbiAgLy8gT24gc29tZSBwbGF0Zm9ybXMsIGluIHBhcnRpY3VsYXIgc29tZSByZWxlYXNlcyBvZiBBbmRyb2lkIDQueCxcbiAgLy8gdGhlIHVuLXByZWZpeGVkIFwiYW5pbWF0aW9uXCIgYW5kIFwidHJhbnNpdGlvblwiIHByb3BlcnRpZXMgYXJlIGRlZmluZWQgb24gdGhlXG4gIC8vIHN0eWxlIG9iamVjdCBidXQgdGhlIGV2ZW50cyB0aGF0IGZpcmUgd2lsbCBzdGlsbCBiZSBwcmVmaXhlZCwgc28gd2UgbmVlZFxuICAvLyB0byBjaGVjayBpZiB0aGUgdW4tcHJlZml4ZWQgZXZlbnRzIGFyZSB1c2VhYmxlLCBhbmQgaWYgbm90IHJlbW92ZSB0aGVtXG4gIC8vIGZyb20gdGhlIG1hcFxuICBpZiAoISgnQW5pbWF0aW9uRXZlbnQnIGluIHdpbmRvdykpIHtcbiAgICBkZWxldGUgRVZFTlRfTkFNRV9NQVAuYW5pbWF0aW9uZW5kLmFuaW1hdGlvbjtcbiAgfVxuXG4gIGlmICghKCdUcmFuc2l0aW9uRXZlbnQnIGluIHdpbmRvdykpIHtcbiAgICBkZWxldGUgRVZFTlRfTkFNRV9NQVAudHJhbnNpdGlvbmVuZC50cmFuc2l0aW9uO1xuICB9XG5cbiAgZm9yICh2YXIgYmFzZUV2ZW50TmFtZSBpbiBFVkVOVF9OQU1FX01BUCkge1xuICAgIHZhciBiYXNlRXZlbnRzID0gRVZFTlRfTkFNRV9NQVBbYmFzZUV2ZW50TmFtZV07XG4gICAgZm9yICh2YXIgc3R5bGVOYW1lIGluIGJhc2VFdmVudHMpIHtcbiAgICAgIGlmIChzdHlsZU5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgZW5kRXZlbnRzLnB1c2goYmFzZUV2ZW50c1tzdHlsZU5hbWVdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgZGV0ZWN0RXZlbnRzKCk7XG59XG5cbi8vIFdlIHVzZSB0aGUgcmF3IHthZGR8cmVtb3ZlfUV2ZW50TGlzdGVuZXIoKSBjYWxsIGJlY2F1c2UgRXZlbnRMaXN0ZW5lclxuLy8gZG9lcyBub3Qga25vdyBob3cgdG8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBhbmQgd2UgcmVhbGx5IHNob3VsZFxuLy8gY2xlYW4gdXAuIEFsc28sIHRoZXNlIGV2ZW50cyBhcmUgbm90IHRyaWdnZXJlZCBpbiBvbGRlciBicm93c2Vyc1xuLy8gc28gd2Ugc2hvdWxkIGJlIEEtT0sgaGVyZS5cblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lcikge1xuICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbnZhciBSZWFjdFRyYW5zaXRpb25FdmVudHMgPSB7XG4gIGFkZEVuZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChub2RlLCBldmVudExpc3RlbmVyKSB7XG4gICAgaWYgKGVuZEV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIElmIENTUyB0cmFuc2l0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCwgdHJpZ2dlciBhbiBcImVuZCBhbmltYXRpb25cIlxuICAgICAgLy8gZXZlbnQgaW1tZWRpYXRlbHkuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChldmVudExpc3RlbmVyLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZW5kRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGVuZEV2ZW50KSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGVuZEV2ZW50LCBldmVudExpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSxcblxuICByZW1vdmVFbmRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAobm9kZSwgZXZlbnRMaXN0ZW5lcikge1xuICAgIGlmIChlbmRFdmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVuZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbmRFdmVudCkge1xuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRFdmVudCwgZXZlbnRMaXN0ZW5lcik7XG4gICAgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RUcmFuc2l0aW9uRXZlbnRzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFRyYW5zaXRpb25FdmVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV4ZWN1dGlvbkVudmlyb25tZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOiBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY2FsbF9zaG93X21ldGhvZCgkbm9kZSwgcHJvcHMpIHtcbiAgJG5vZGVbcHJvcHMuc2hvd01ldGhvZF0oe1xuICAgIGR1cmF0aW9uOiBwcm9wcy5zaG93RHVyYXRpb24sXG4gICAgZWFzaW5nOiBwcm9wcy5zaG93RWFzaW5nXG4gIH0pO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIiB9LFxuICAgICAgLy8gZWZmZWN0aXZlICQuaGlkZSgpXG4gICAgICBzaG93TWV0aG9kOiBcImZhZGVJblwiLCAvLyBzbGlkZURvd24sIGFuZCBzaG93IGFyZSBidWlsdCBpbnRvIGpRdWVyeVxuICAgICAgc2hvd0R1cmF0aW9uOiAzMDAsXG4gICAgICBzaG93RWFzaW5nOiBcInN3aW5nXCIsIC8vIGFuZCBsaW5lYXIgYXJlIGJ1aWx0IGludG8galF1ZXJ5XG4gICAgICBoaWRlTWV0aG9kOiBcImZhZGVPdXRcIixcbiAgICAgIGhpZGVEdXJhdGlvbjogMTAwMCxcbiAgICAgIGhpZGVFYXNpbmc6IFwic3dpbmdcIixcbiAgICAgIC8vXG4gICAgICB0aW1lT3V0OiA1MDAwLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwXG4gICAgfTtcbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVydmFsSWQ6IG51bGwsXG4gICAgICBpc0hpZGluZzogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY2FsbF9zaG93X21ldGhvZCh0aGlzLl9nZXRfJF9ub2RlKCksIHRoaXMucHJvcHMpO1xuICAgIGlmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy50aW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBoYW5kbGVNb3VzZUVudGVyOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnN0YXRlLmludGVydmFsSWQpO1xuICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChudWxsKTtcbiAgICB0aGlzLl9zZXRfaXNfaGlkaW5nKGZhbHNlKTtcblxuICAgIGNhbGxfc2hvd19tZXRob2QodGhpcy5fZ2V0XyRfbm9kZSgpLnN0b3AodHJ1ZSwgdHJ1ZSksIHRoaXMucHJvcHMpO1xuICB9LFxuICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0hpZGluZyAmJiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCB8fCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCA+IDApKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQpKTtcbiAgICB9XG4gIH0sXG4gIGhpZGVUb2FzdDogZnVuY3Rpb24gaGlkZVRvYXN0KG92ZXJyaWRlKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNIaWRpbmcgfHwgdGhpcy5zdGF0ZS5pbnRlcnZhbElkID09PSBudWxsICYmICFvdmVycmlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaXNIaWRpbmc6IHRydWUgfSk7XG5cbiAgICB0aGlzLl9nZXRfJF9ub2RlKClbdGhpcy5wcm9wcy5oaWRlTWV0aG9kXSh7XG4gICAgICBkdXJhdGlvbjogdGhpcy5wcm9wcy5oaWRlRHVyYXRpb24sXG4gICAgICBlYXNpbmc6IHRoaXMucHJvcHMuaGlkZUVhc2luZyxcbiAgICAgIGNvbXBsZXRlOiB0aGlzLl9oYW5kbGVfcmVtb3ZlXG4gICAgfSk7XG4gIH0sXG4gIF9nZXRfJF9ub2RlOiBmdW5jdGlvbiBfZ2V0XyRfbm9kZSgpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIHJldHVybiBqUXVlcnkoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXG4gIH0sXG4gIF9zZXRfaW50ZXJ2YWxfaWQ6IGZ1bmN0aW9uIF9zZXRfaW50ZXJ2YWxfaWQoaW50ZXJ2YWxJZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW50ZXJ2YWxJZDogaW50ZXJ2YWxJZFxuICAgIH0pO1xuICB9LFxuICBfc2V0X2lzX2hpZGluZzogZnVuY3Rpb24gX3NldF9pc19oaWRpbmcoaXNIaWRpbmcpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzSGlkaW5nOiBpc0hpZGluZ1xuICAgIH0pO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2pRdWVyeU1peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUGFnZUJ1dHRvbiBmcm9tICcuL1BhZ2VCdXR0b24uanMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgUGFnaW5hdGlvbkxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNoYW5nZVBhZ2UocGFnZSkge1xuICAgIGlmIChwYWdlID09IHRoaXMucHJvcHMucHJlUGFnZSkge1xuICAgICAgcGFnZSA9IHRoaXMucHJvcHMuY3VyclBhZ2UgLSAxIDwgMSA/IDEgOiB0aGlzLnByb3BzLmN1cnJQYWdlIC0gMTtcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT0gdGhpcy5wcm9wcy5uZXh0UGFnZSkge1xuICAgICAgcGFnZSA9IHRoaXMucHJvcHMuY3VyclBhZ2UgKyAxID4gdGhpcy50b3RhbFBhZ2VzID8gdGhpcy50b3RhbFBhZ2VzIDogdGhpcy5wcm9wcy5jdXJyUGFnZSArIDE7XG4gICAgfSBlbHNlIGlmIChwYWdlID09IHRoaXMucHJvcHMubGFzdFBhZ2UpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG4gICAgfSBlbHNlIGlmIChwYWdlID09IHRoaXMucHJvcHMuZmlyc3RQYWdlKSB7XG4gICAgICBwYWdlID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnZSA9IHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cblxuICAgIGlmIChwYWdlICE9IHRoaXMucHJvcHMuY3VyclBhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMuY2hhbmdlUGFnZShwYWdlLCB0aGlzLnByb3BzLnNpemVQZXJQYWdlKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VTaXplUGVyUGFnZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3Qgc2VsZWN0U2l6ZSA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC50ZXh0KTtcbiAgICBsZXQgeyBjdXJyUGFnZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0U2l6ZSAhPSB0aGlzLnByb3BzLnNpemVQZXJQYWdlKSB7XG4gICAgICB0aGlzLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5wcm9wcy5kYXRhU2l6ZSAvIHNlbGVjdFNpemUpO1xuICAgICAgaWYgKGN1cnJQYWdlID4gdGhpcy50b3RhbFBhZ2VzKVxuICAgICAgICBjdXJyUGFnZSA9IHRoaXMudG90YWxQYWdlcztcblxuICAgICAgdGhpcy5wcm9wcy5jaGFuZ2VQYWdlKGN1cnJQYWdlLCBzZWxlY3RTaXplKTtcbiAgICAgIGlmKHRoaXMucHJvcHMub25TaXplUGVyUGFnZUxpc3Qpe1xuICAgICAgICB0aGlzLnByb3BzLm9uU2l6ZVBlclBhZ2VMaXN0KHNlbGVjdFNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5wcm9wcy5kYXRhU2l6ZSAvIHRoaXMucHJvcHMuc2l6ZVBlclBhZ2UpO1xuICAgIHZhciBwYWdlQnRucyA9IHRoaXMubWFrZVBhZ2UoKTtcbiAgICB2YXIgcGFnZUxpc3RTdHlsZSA9IHtcbiAgICAgIGZsb2F0OiBcInJpZ2h0XCIsXG4gICAgICBtYXJnaW5Ub3A6IFwiMHB4XCIgIC8vb3ZlcnJpZGUgdGhlIG1hcmdpbi10b3AgZGVmaW5lZCBpbiAucGFnaW5hdGlvbiBjbGFzcyBpbiBib290c3RyYXAuXG4gICAgfVxuXG4gICAgdmFyIHNpemVQZXJQYWdlTGlzdCA9IHRoaXMucHJvcHMuc2l6ZVBlclBhZ2VMaXN0Lm1hcCgoc2l6ZVBlclBhZ2UpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaSBrZXk9e3NpemVQZXJQYWdlfSByb2xlPVwicHJlc2VudGF0aW9uXCI+XG4gICAgICAgICAgPGEgcm9sZT1cIm1lbnVpdGVtXCIgdGFiSW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5jaGFuZ2VTaXplUGVyUGFnZS5iaW5kKHRoaXMpfT57c2l6ZVBlclBhZ2V9PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpblRvcDogMTUgfX0+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnNpemVQZXJQYWdlTGlzdC5sZW5ndGggPiAxXG4gICAgICAgICAgPyA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBpZD1cInBhZ2VEcm9wRG93blwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2l6ZVBlclBhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwicGFnZURyb3BEb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NpemVQZXJQYWdlTGlzdH1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwYWdpbmF0aW9uXCIgc3R5bGU9e3BhZ2VMaXN0U3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICB7cGFnZUJ0bnN9XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA6IDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwYWdpbmF0aW9uXCIgc3R5bGU9e3BhZ2VMaXN0U3R5bGV9PlxuICAgICAgICAgICAgICAgIHtwYWdlQnRuc31cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBtYWtlUGFnZSgpIHtcbiAgICB2YXIgcGFnZXMgPSB0aGlzLmdldFBhZ2VzKCk7XG4gICAgcmV0dXJuIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSkge1xuICAgICAgdmFyIGlzQWN0aXZlID0gcGFnZSA9PT0gdGhpcy5wcm9wcy5jdXJyUGFnZTtcbiAgICAgIHZhciBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgdmFyIGhpZGRlbiA9IGZhbHNlO1xuICAgICAgaWYodGhpcy5wcm9wcy5jdXJyUGFnZSA9PSAxICYmXG4gICAgICAgIChwYWdlID09PSB0aGlzLnByb3BzLmZpcnN0UGFnZSB8fCBwYWdlID09PSB0aGlzLnByb3BzLnByZVBhZ2UpKXtcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMucHJvcHMuY3VyclBhZ2UgPT0gdGhpcy50b3RhbFBhZ2VzICYmXG4gICAgICAgIChwYWdlID09PSB0aGlzLnByb3BzLm5leHRQYWdlIHx8IHBhZ2UgPT09IHRoaXMucHJvcHMubGFzdFBhZ2UpKXtcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQYWdlQnV0dG9uIGNoYW5nZVBhZ2U9e3RoaXMuY2hhbmdlUGFnZS5iaW5kKHRoaXMpfSBhY3RpdmU9e2lzQWN0aXZlfSBkaXNhYmxlPXtkaXNhYmxlZH0gaGlkZGVuPXtoaWRkZW59IGtleT17cGFnZX0+e3BhZ2V9PC9QYWdlQnV0dG9uPlxuICAgICAgKVxuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgZ2V0UGFnZXMoKSB7XG4gICAgdmFyIHN0YXJ0UGFnZSA9IDEsIGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG5cbiAgICBzdGFydFBhZ2UgPSBNYXRoLm1heCh0aGlzLnByb3BzLmN1cnJQYWdlIC0gTWF0aC5mbG9vcih0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplIC8gMiksIDEpO1xuICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplIC0gMTtcblxuICAgIGlmIChlbmRQYWdlID4gdGhpcy50b3RhbFBhZ2VzKSB7XG4gICAgICBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgICAgc3RhcnRQYWdlID0gZW5kUGFnZSAtIHRoaXMucHJvcHMucGFnaW5hdGlvblNpemUgKyAxO1xuICAgIH1cbiAgICB2YXIgcGFnZXM7XG4gICAgaWYoc3RhcnRQYWdlICE9IDEgJiYgdGhpcy50b3RhbFBhZ2VzID4gdGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSkge1xuICAgICAgcGFnZXMgPSBbdGhpcy5wcm9wcy5maXJzdFBhZ2UsIHRoaXMucHJvcHMucHJlUGFnZV07XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsUGFnZXMgPiAxKSB7XG4gICAgICBwYWdlcyA9IFt0aGlzLnByb3BzLnByZVBhZ2VdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhZ2VzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgIGlmIChpID4gMClwYWdlcy5wdXNoKGkpO1xuICAgIH1cbiAgICBpZiAoZW5kUGFnZSAhPSB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIHBhZ2VzLnB1c2godGhpcy5wcm9wcy5uZXh0UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubGFzdFBhZ2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFBhZ2VzID4gMSl7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubmV4dFBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cbn1cblBhZ2luYXRpb25MaXN0LnByb3BUeXBlcyA9IHtcbiAgY3VyclBhZ2U6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIHNpemVQZXJQYWdlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBkYXRhU2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgY2hhbmdlUGFnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHNpemVQZXJQYWdlTGlzdDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICBwYWdpbmF0aW9uU2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgcmVtb3RlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25TaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBwcmVQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5QYWdpbmF0aW9uTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIHNpemVQZXJQYWdlOiBDb25zdC5TSVpFX1BFUl9QQUdFXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uTGlzdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhZ2luYXRpb24vUGFnaW5hdGlvbkxpc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBQYWdlQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHR9XG5cbiAgcGFnZUJ0bkNsaWNrKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLmNoYW5nZVBhZ2UoZS5jdXJyZW50VGFyZ2V0LnRleHRDb250ZW50KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciBjbGFzc2VzID0gY2xhc3NTZXQoe1xuICAgICAgICAnYWN0aXZlJzogdGhpcy5wcm9wcy5hY3RpdmUsXG4gICAgICAgICdkaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZSxcbiAgICAgICAgJ2hpZGRlbic6IHRoaXMucHJvcHMuaGlkZGVuXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlc30+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLnBhZ2VCdG5DbGljay5iaW5kKHRoaXMpfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2E+PC9saT5cbiAgICApXG4gIH1cbn1cblBhZ2VCdXR0b24ucHJvcFR5cGVzID0ge1xuICBjaGFuZ2VQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VCdXR0b247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdpbmF0aW9uL1BhZ2VCdXR0b24uanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi4vRWRpdG9yJztcbmltcG9ydCBOb3RpZmllciBmcm9tICcuLi9Ob3RpZmljYXRpb24uanMnO1xuXG5jbGFzcyBUb29sQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgIHRoaXMubW9kYWxDbGFzc05hbWU7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzSW5zZXJ0Um93VHJpZ2dlcjogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlU3RhdGU6bnVsbCxcbiAgICAgIHNoYWtlRWRpdG9yOmZhbHNlLFxuICAgICAgc2hvd1NlbGVjdGVkOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB9XG4gIGNsZWFyVGltZW91dCgpIHtcbiAgICBpZih0aGlzLnRpbWVvdXRlQ2xlYXIpe1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dGVDbGVhcik7XG4gICAgICB0aGlzLnRpbWVvdXRlQ2xlYXI9MDtcbiAgICB9XG4gIH1cblxuICBjaGVja0FuZFBhcnNlRm9ybSgpe1xuICAgIHZhciB0cz10aGlzLG5ld09iaiA9IHt9LGlzVmFsaWQ9dHJ1ZSx0ZW1wVmFsdWUsdGVtcE1zZyx2YWxpZGF0ZVN0YXRlPXt9O1xuICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbiwgaSl7XG4gICAgICBpZihjb2x1bW4uYXV0b1ZhbHVlKXsvL3doZW4geW91IHdhbnQgc2FtZSBhdXRvIGdlbmVyYXRlIHZhbHVlIGFuZCBub3QgYWxsb3cgZWRpdCwgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICB0ZW1wVmFsdWU9dHlwZW9mIGNvbHVtbi5hdXRvVmFsdWU9PSdmdW5jdGlvbic/Y29sdW1uLmF1dG9WYWx1ZSgpOignYXV0b3ZhbHVlLScrbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGxldCBkb20gPSB0aGlzLnJlZnNbY29sdW1uLmZpZWxkK2ldO1xuICAgICAgICB0ZW1wVmFsdWUgPSBkb20udmFsdWU7XG5cbiAgICAgICAgaWYoY29sdW1uLmVkaXRhYmxlICYmIGNvbHVtbi5lZGl0YWJsZS50eXBlID09ICdjaGVja2JveCcpe1xuICAgICAgICAgIGxldCB2YWx1ZXMgPSBkb20udmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgICB0ZW1wVmFsdWUgPSBkb20uY2hlY2tlZD8gdmFsdWVzWzBdOnZhbHVlc1sxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNvbHVtbi5lZGl0YWJsZSYmY29sdW1uLmVkaXRhYmxlLnZhbGlkYXRvcil7Ly9wcm9jZXNzIHZhbGlkYXRlXG4gICAgICAgICAgdGVtcE1zZz0gY29sdW1uLmVkaXRhYmxlLnZhbGlkYXRvcih0ZW1wVmFsdWUpXG4gICAgICAgICAgaWYodGVtcE1zZyE9PXRydWUpe1xuICAgICAgICAgICAgaXNWYWxpZD1mYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRlU3RhdGVbY29sdW1uLmZpZWxkXT10ZW1wTXNnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXdPYmpbY29sdW1uLmZpZWxkXSA9dGVtcFZhbHVlO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYoaXNWYWxpZCl7XG4gICAgICByZXR1cm4gbmV3T2JqO1xuICAgIH1lbHNle1xuICAgICAgdHMuY2xlYXJUaW1lb3V0KCk7XG4gICAgICAvL3Nob3cgZXJyb3IgaW4gZm9ybSBhbmQgc2hha2UgaXRcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbGlkYXRlU3RhdGU6dmFsaWRhdGVTdGF0ZSxzaGFrZUVkaXRvcjp0cnVlfSk7XG4gICAgICAvL25vdGlmaWVyIGVycm9yXG4gICAgICB0cy5yZWZzLm5vdGlmaWVyLm5vdGljZSgnZXJyb3InLFwiRm9ybSB2YWxpZGF0ZSBlcnJvcnMsIHBsZWFzZSBjaGVja2luZyFcIixcIlByZXNzZWQgRVNDIGNhbiBjYW5jZWxcIik7XG4gICAgICAvL2NsZWFyIGFuaW1hdGUgY2xhc3NcbiAgICAgIHRzLnRpbWVvdXRlQ2xlYXI9c2V0VGltZW91dChmdW5jdGlvbigpe3RzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjpmYWxzZX0pO30sMzAwKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNhdmVCdG5DbGljayhlKXtcbiAgICB2YXIgbmV3T2JqID0gdGhpcy5jaGVja0FuZFBhcnNlRm9ybSgpO1xuICAgIGlmKCFuZXdPYmopey8vdmFsaWRhdGUgZXJyb3JzXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBtc2cgPSB0aGlzLnByb3BzLm9uQWRkUm93KG5ld09iaik7XG4gICAgaWYobXNnKSB7XG4gICAgICB2YXIgdHM9dGhpcztcbiAgICAgIHRzLnJlZnMubm90aWZpZXIubm90aWNlKCdlcnJvcicsbXNnLFwiUHJlc3NlZCBFU0MgY2FuIGNhbmNlbFwiKTtcbiAgICAgIHRzLmNsZWFyVGltZW91dCgpO1xuICAgICAgLy9zaGFrZSBmb3JtIGFuZCBoYWNrIHByZXZlbnQgbW9kYWwgaGlkZVxuICAgICAgdHMuc2V0U3RhdGUoe3NoYWtlRWRpdG9yOnRydWUsdmFsaWRhdGVTdGF0ZTpcInRoaXMgaXMgaGFjayBmb3IgcHJldmVudCBib290c3RyYXAgbW9kYWwgaGlkZVwifSk7XG4gICAgICAvL2NsZWFyIGFuaW1hdGUgY2xhc3NcbiAgICAgIHRzLnRpbWVvdXRlQ2xlYXI9c2V0VGltZW91dChmdW5jdGlvbigpe3RzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjpmYWxzZX0pO30sMzAwKTtcbiAgICB9IGVsc2V7XG4gICAgICAvL3Jlc2V0IHN0YXRlIGFuZCBoaWRlIG1vZGFsIGhpZGVcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWxpZGF0ZVN0YXRlOm51bGwsXG4gICAgICAgIHNoYWtlRWRpdG9yOmZhbHNlXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrXCJtb2RhbC1iYWNrZHJvcFwiKS5jbGljaygpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMubW9kYWxDbGFzc05hbWUpLmNsaWNrKCk7XG4gICAgICB9KTtcbiAgICAgIC8vcmVzZXQgZm9ybVxuICAgICAgdGhpcy5yZWZzLmZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTaG93T25seVRvZ2dsZSA9IGUgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd1NlbGVjdGVkOiAhdGhpcy5zdGF0ZS5zaG93U2VsZWN0ZWRcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uU2hvd09ubHlTZWxlY3RlZCgpO1xuICB9XG5cbiAgaGFuZGxlRHJvcFJvd0J0bkNsaWNrKGUpe1xuICAgIHRoaXMucHJvcHMub25Ecm9wUm93KCk7XG4gIH1cblxuICBoYW5kbGVDbG9zZUJ0bihlKXtcbiAgICB0aGlzLnJlZnMud2FybmluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICBoYW5kbGVLZXlVcChlKXtcbiAgICB0aGlzLnByb3BzLm9uU2VhcmNoKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVFeHBvcnRDU1YoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkV4cG9ydENTVigpO1xuICB9XG5cbiAgaGFuZGxlQ2xlYXJCdG5DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnJlZnMuc2VhY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMucHJvcHMub25TZWFyY2goJycpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdGhpcy5tb2RhbENsYXNzTmFtZSA9IFwiYnMtdGFibGUtbW9kYWwtc21cIituZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgaW5zZXJ0QnRuID0gdGhpcy5wcm9wcy5lbmFibGVJbnNlcnQ/XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkFkZFJvd0JlZ2lufSBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gcmVhY3QtYnMtdGFibGUtYWRkLWJ0blwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD17Jy4nK3RoaXMubW9kYWxDbGFzc05hbWV9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9pPiBOZXc8L2J1dHRvbj46bnVsbDtcblxuICAgIHZhciBkZWxldGVCdG4gPSB0aGlzLnByb3BzLmVuYWJsZURlbGV0ZT9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgcmVhY3QtYnMtdGFibGUtZGVsLWJ0blwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIiB0aXRsZT1cIkRyb3Agc2VsZWN0ZWQgcm93XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRHJvcFJvd0J0bkNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiPjwvaT4gRGVsZXRlXG4gICAgICAgICAgPC9idXR0b24+Om51bGw7XG5cbiAgICB2YXIgc2VhcmNoVGV4dElucHV0ID0gdGhpcy5yZW5kZXJTZWFyY2hQYW5lbCgpO1xuXG4gICAgdmFyIHNob3dTZWxlY3RlZE9ubHlCdG4gPSB0aGlzLnByb3BzLmVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ/XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVNob3dPbmx5VG9nZ2xlLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLnNob3dTZWxlY3RlZD8gQ29uc3QuU0hPV19BTEwgOiBDb25zdC5TSE9XX09OTFlfU0VMRUNUIH1cbiAgICAgIDwvYnV0dG9uPjpudWxsO1xuXG4gICAgdmFyIG1vZGFsID0gdGhpcy5wcm9wcy5lbmFibGVJbnNlcnQ/dGhpcy5yZW5kZXJJbnNlcnRSb3dNb2RhbCgpOm51bGw7XG4gICAgdmFyIHdhcm5pbmdTdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IFwibm9uZVwiLFxuICAgICAgbWFyZ2luQm90dG9tOiAwXG4gICAgfTtcblxuICAgIHZhciBleHBvcnRDU1YgPSB0aGlzLnByb3BzLmVuYWJsZUV4cG9ydENTViA/XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzXCIgb25DbGljaz17dGhpcy5oYW5kbGVFeHBvcnRDU1YuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZXhwb3J0XCI+PC9pPiBFeHBvcnQgdG8gQ1NWPC9idXR0b24+IDogbnVsbDtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC02IGNvbC1sZy04XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgYnRuLWdyb3VwLXNtXCIgcm9sZT1cImdyb3VwXCI+XG4gICAgICAgICAgICB7ZXhwb3J0Q1NWfVxuICAgICAgICAgICAge2luc2VydEJ0bn1cbiAgICAgICAgICAgIHtkZWxldGVCdG59XG4gICAgICAgICAgICB7c2hvd1NlbGVjdGVkT25seUJ0bn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC02IGNvbC1sZy00XCI+XG4gICAgICAgICAge3NlYXJjaFRleHRJbnB1dH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxOb3RpZmllciByZWY9XCJub3RpZmllclwiPjwvTm90aWZpZXI+XG4gICAgICAgIHttb2RhbH1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHJlbmRlclNlYXJjaFBhbmVsKCkge1xuICAgIGlmKHRoaXMucHJvcHMuZW5hYmxlU2VhcmNoKSB7XG4gICAgICBsZXQgY2xhc3NOYW1lcyA9ICdmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtc20gcmVhY3QtYnMtdGFibGUtc2VhcmNoLWZvcm0nO1xuICAgICAgbGV0IGNsZWFyQnRuID0gbnVsbDtcbiAgICAgIGlmKHRoaXMucHJvcHMuY2xlYXJTZWFyY2gpIHtcbiAgICAgICAgY2xlYXJCdG4gPSAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGVhckJ0bkNsaWNrIH0+Q2xlYXI8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgICAgIGNsYXNzTmFtZXMgKz0gJyBpbnB1dC1ncm91cCBpbnB1dC1ncm91cC1zbSc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cbiAgICAgICAgICA8aW5wdXQgcmVmPSdzZWFjaElucHV0JyBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2Vob2xkZXI/dGhpcy5wcm9wcy5zZWFyY2hQbGFjZWhvbGRlcjonU2VhcmNoJ31cbiAgICAgICAgICAgIG9uS2V5VXA9e3RoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgeyBjbGVhckJ0biB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVySW5zZXJ0Um93TW9kYWwoKXtcbiAgICB2YXIgdmFsaWRhdGVTdGF0ZT10aGlzLnN0YXRlLnZhbGlkYXRlU3RhdGV8fHt9O1xuICAgIHZhciBpbnB1dEZpZWxkID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgdmFyIGVkaXRhYmxlPWNvbHVtbi5lZGl0YWJsZSxcbiAgICAgICAgICBmb3JtYXQ9Y29sdW1uLmZvcm1hdCxcbiAgICAgICAgICBhdHRyPXtyZWY6Y29sdW1uLmZpZWxkK2kscGxhY2Vob2xkZXI6ZWRpdGFibGUucGxhY2Vob2xkZXI/ZWRpdGFibGUucGxhY2Vob2xkZXI6Y29sdW1uLm5hbWV9O1xuXG4gICAgICBpZihjb2x1bW4uYXV0b1ZhbHVlKXsvL3doZW4geW91IHdhbnQgc2FtZSBhdXRvIGdlbmVyYXRlIHZhbHVlIGFuZCBub3QgYWxsb3cgZWRpdCwgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvcj12YWxpZGF0ZVN0YXRlW2NvbHVtbi5maWVsZF0/KDxzcGFuIGNsYXNzTmFtZT1cImhlbHAtYmxvY2sgYmctZGFuZ2VyXCI+e3ZhbGlkYXRlU3RhdGVbY29sdW1uLmZpZWxkXX08L3NwYW4+KTpudWxsO1xuXG4gICAgICAvLyBsZXQgZWRpdG9yID0gRWRpdG9yKGVkaXRhYmxlLGF0dHIsZm9ybWF0KTtcbiAgICAgIC8vIGlmKGVkaXRvci5wcm9wcy50eXBlICYmIGVkaXRvci5wcm9wcy50eXBlID09ICdjaGVja2JveCcpe1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBrZXk9e2NvbHVtbi5maWVsZH0+XG4gICAgICAgICAgPGxhYmVsPntjb2x1bW4ubmFtZX08L2xhYmVsPlxuICAgICAgICAgIHtFZGl0b3IoZWRpdGFibGUsYXR0cixmb3JtYXQsJycpfVxuICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICAgIHZhciBtb2RhbENsYXNzID0gY2xhc3NTZXQoXCJtb2RhbFwiLCBcImZhZGVcIiAsIHRoaXMubW9kYWxDbGFzc05hbWUse1xuICAgICAgJ2luJzp0aGlzLnN0YXRlLnNoYWtlRWRpdG9yfHx0aGlzLnN0YXRlLnZhbGlkYXRlU3RhdGUvL2hhY2sgcHJldmVudCBib290c3RyYXAgbW9kYWwgaGlkZSBieSByZVJlbmRlclxuICAgIH0pO1xuICAgIHZhciBkaWFsb2dDbGFzcz1jbGFzc1NldChcIm1vZGFsLWRpYWxvZ1wiLFwibW9kYWwtc21cIix7XG4gICAgICBcImFuaW1hdGVkXCI6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvcixcbiAgICAgIFwic2hha2VcIjp0aGlzLnN0YXRlLnNoYWtlRWRpdG9yXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPVwibW9kYWxcIiAgY2xhc3NOYW1lPXttb2RhbENsYXNzfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RpYWxvZ0NsYXNzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5OZXcgUmVjb3JkPC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxmb3JtIHJlZj1cImZvcm1cIj5cbiAgICAgICAgICAgICAge2lucHV0RmllbGR9XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiAgb25DbGljaz17dGhpcy5oYW5kbGVTYXZlQnRuQ2xpY2suYmluZCh0aGlzKX0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5Ub29sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvbkRyb3BSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblNob3dPbmx5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBlbmFibGVJbnNlcnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVEZWxldGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVTZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVTaG93T25seVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICBzZWFyY2hQbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgY2xlYXJTZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuXG5Ub29sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZW5hYmxlSW5zZXJ0OiBmYWxzZSxcbiAgZW5hYmxlRGVsZXRlOiBmYWxzZSxcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcbiAgZW5hYmxlU2hvd09ubHlTZWxlY3RlZDogZmFsc2UsXG4gIGNsZWFyU2VhcmNoOiBmYWxzZVxufVxuZXhwb3J0IGRlZmF1bHQgVG9vbEJhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3Rvb2xiYXIvVG9vbEJhci5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFRhYmxlRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZmlsdGVyT2JqID0ge307XG4gIH1cblxuICBoYW5kbGVLZXlVcChlKXtcbiAgICBpZihlLmN1cnJlbnRUYXJnZXQudmFsdWUudHJpbSgpID09PSBcIlwiKVxuICAgICAgZGVsZXRlIHRoaXMuZmlsdGVyT2JqW2UuY3VycmVudFRhcmdldC5uYW1lXTtcbiAgICBlbHNlXG4gICAgICB0aGlzLmZpbHRlck9ialtlLmN1cnJlbnRUYXJnZXQubmFtZV0gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cbiAgICB0aGlzLnByb3BzLm9uRmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlXCIsIHtcbiAgICAgICd0YWJsZS1zdHJpcGVkJzogdGhpcy5wcm9wcy5zdHJpcGVkLFxuICAgICAgJ3RhYmxlLWNvbmRlbnNlZCc6IHRoaXMucHJvcHMuY29uZGVuc2VkXG4gICAgfSk7XG4gICAgdmFyIHNlbGVjdFJvd0hlYWRlciA9IG51bGw7XG5cbiAgICBpZih0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfTVVMVEkpe1xuICAgICAgbGV0IHN0eWxlID0ge1xuICAgICAgICB3aWR0aDozNSxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IDAsXG4gICAgICAgIHBhZGRpbmdSaWdodDogMFxuICAgICAgfVxuICAgICAgc2VsZWN0Um93SGVhZGVyID0gKDx0aCBzdHlsZT17c3R5bGV9IGtleT17LTF9PkZpbHRlcjwvdGg+KTtcbiAgICB9XG4gICAgdmFyIGZpbHRlckZpZWxkID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4pe1xuICAgICAgdmFyIHRoU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6IGNvbHVtbi5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aFxuICAgICAgfTtcbiAgICAgIHJldHVybihcbiAgICAgICAgPHRoIGtleT17Y29sdW1uLm5hbWV9IHN0eWxlPXt0aFN0eWxlfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoLWlubmVyIHRhYmxlLWhlYWRlci1jb2x1bW5cIj5cbiAgICAgICAgICAgIDxpbnB1dCBzaXplPVwiMTBcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPXtjb2x1bW4ubmFtZX0gbmFtZT17Y29sdW1uLm5hbWV9IG9uS2V5VXA9e3RoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RoPlxuICAgICAgKVxuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybihcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3Nlc30gc3R5bGU9e3ttYXJnaW5Ub3A6NX19PlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyIHN0eWxlPXt7Ym9yZGVyQm90dG9tU3R5bGU6ICdoaWRkZW4nfX0+XG4gICAgICAgICAgICB7c2VsZWN0Um93SGVhZGVyfXtmaWx0ZXJGaWVsZH1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgPC90YWJsZT5cbiAgICApXG4gIH1cbn1cblRhYmxlRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICByb3dTZWxlY3RUeXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlRmlsdGVyLmpzXG4gKiovIiwiaW1wb3J0IENvbnN0IGZyb20gXCIuLi9Db25zdFwiO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZnVuY3Rpb24gX3NvcnQoYXJyLCBzb3J0RmllbGQsIG9yZGVyLCBzb3J0RnVuYykge1xuICBvcmRlciA9IG9yZGVyLnRvTG93ZXJDYXNlKCk7XG4gIGFyci5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKHNvcnRGdW5jKSB7XG4gICAgICByZXR1cm4gc29ydEZ1bmMoYSwgYiwgb3JkZXIsIHNvcnRGaWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcmRlciA9PSBDb25zdC5TT1JUX0RFU0MpIHtcbiAgICAgICAgcmV0dXJuIGFbc29ydEZpZWxkXSA+IGJbc29ydEZpZWxkXSA/IC0xIDogKChhW3NvcnRGaWVsZF0gPCBiW3NvcnRGaWVsZF0pID8gMSA6IDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFbc29ydEZpZWxkXSA8IGJbc29ydEZpZWxkXSA/IC0xIDogKChhW3NvcnRGaWVsZF0gPiBiW3NvcnRGaWVsZF0pID8gMSA6IDApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlRGF0YVNldCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBkYXRhKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlRGF0YVN0b3JlIHtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmNvbEluZm9zID0gbnVsbDtcbiAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IG51bGw7XG4gICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgdGhpcy5maWx0ZXJPYmogPSBudWxsO1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IG51bGw7XG4gICAgdGhpcy5zb3J0T2JqID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VPYmogPSB7fTtcbiAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgdGhpcy5tdWx0aUNvbHVtblNlYXJjaCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd09ubHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVtb3RlID0gZmFsc2U7IC8vIHJlbW90ZSBkYXRhXG4gIH1cblxuICBzZXRQcm9wcyhwcm9wcykge1xuICAgIHRoaXMua2V5RmllbGQgPSBwcm9wcy5rZXlGaWVsZDtcbiAgICB0aGlzLmVuYWJsZVBhZ2luYXRpb24gPSBwcm9wcy5pc1BhZ2luYXRpb247XG4gICAgdGhpcy5jb2xJbmZvcyA9IHByb3BzLmNvbEluZm9zO1xuICAgIHRoaXMucmVtb3RlID0gcHJvcHMucmVtb3RlO1xuICAgIHRoaXMubXVsdGlDb2x1bW5TZWFyY2ggPSBwcm9wcy5tdWx0aUNvbHVtblNlYXJjaDtcbiAgfVxuXG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuZmlsdGVyT2JqKSB0aGlzLmZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5zZWFyY2hUZXh0KSB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0T2JqKSB7XG4gICAgICB0aGlzLnNvcnQodGhpcy5zb3J0T2JqLm9yZGVyLCB0aGlzLnNvcnRPYmouc29ydEZpZWxkKTtcbiAgICB9XG4gIH1cblxuICBnZXRTb3J0SW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5zb3J0T2JqO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRSb3dLZXkoc2VsZWN0ZWRSb3dLZXlzKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkUm93S2V5cztcbiAgfVxuXG4gIGdldFNlbGVjdGVkUm93S2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIGdldEN1cnJlbnREaXNwbGF5RGF0YSgpIHtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSByZXR1cm4gdGhpcy5maWx0ZXJlZERhdGE7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbiAgaWdub3JlTm9uU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zaG93T25seVNlbGVjdGVkID0gIXRoaXMuc2hvd09ubHlTZWxlY3RlZDtcbiAgICBpZih0aGlzLnNob3dPbmx5U2VsZWN0ZWQpe1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmluZCh4ID0+IHJvd1t0aGlzLmtleUZpZWxkXSA9PT0geClcbiAgICAgICAgcmV0dXJuIHR5cGVvZiByZXN1bHQgIT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNvcnQob3JkZXIsIHNvcnRGaWVsZCkge1xuICAgIHRoaXMuc29ydE9iaiA9IHtcbiAgICAgIG9yZGVyOiBvcmRlcixcbiAgICAgIHNvcnRGaWVsZDogc29ydEZpZWxkXG4gICAgfTtcblxuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGlmKCF0aGlzLmNvbEluZm9zW3NvcnRGaWVsZF0pIHJldHVybiB0aGlzO1xuXG4gICAgY29uc3QgeyBzb3J0RnVuYyB9ID0gdGhpcy5jb2xJbmZvc1tzb3J0RmllbGRdO1xuICAgIGN1cnJlbnREaXNwbGF5RGF0YSA9IF9zb3J0KGN1cnJlbnREaXNwbGF5RGF0YSwgc29ydEZpZWxkLCBvcmRlciwgc29ydEZ1bmMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwYWdlKHBhZ2UsIHNpemVQZXJQYWdlKSB7XG4gICAgdGhpcy5wYWdlT2JqLmVuZCA9IHBhZ2UgKiBzaXplUGVyUGFnZSAtIDE7XG4gICAgdGhpcy5wYWdlT2JqLnN0YXJ0ID0gdGhpcy5wYWdlT2JqLmVuZCAtIChzaXplUGVyUGFnZSAtIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZWRpdChuZXdWYWwsIHJvd0luZGV4LCBmaWVsZE5hbWUpIHtcbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBsZXQgcm93S2V5Q2FjaGU7XG4gICAgaWYgKCF0aGlzLmVuYWJsZVBhZ2luYXRpb24pIHtcbiAgICAgIGN1cnJlbnREaXNwbGF5RGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IG5ld1ZhbDtcbiAgICAgIHJvd0tleUNhY2hlID0gY3VycmVudERpc3BsYXlEYXRhW3Jvd0luZGV4XVt0aGlzLmtleUZpZWxkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudERpc3BsYXlEYXRhW3RoaXMucGFnZU9iai5zdGFydCArIHJvd0luZGV4XVtmaWVsZE5hbWVdID0gbmV3VmFsO1xuICAgICAgcm93S2V5Q2FjaGUgPSBjdXJyZW50RGlzcGxheURhdGFbdGhpcy5wYWdlT2JqLnN0YXJ0ICsgcm93SW5kZXhdW3RoaXMua2V5RmllbGRdO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIGlmIChyb3dbdGhpcy5rZXlGaWVsZF0gPT09IHJvd0tleUNhY2hlKSB7XG4gICAgICAgICAgcm93W2ZpZWxkTmFtZV0gPSBuZXdWYWw7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuZmlsdGVyT2JqKSB0aGlzLmZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5zZWFyY2hUZXh0KSB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZEF0QmVnaW4obmV3T2JqKSB7XG4gICAgaWYgKCFuZXdPYmpbdGhpcy5rZXlGaWVsZF0gfHwgbmV3T2JqW3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09ICcnKSB7XG4gICAgICB0aHJvdyB0aGlzLmtleUZpZWxkICsgXCIgY2FuJ3QgYmUgZW1wdHkgdmFsdWUuXCI7XG4gICAgfVxuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGN1cnJlbnREaXNwbGF5RGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIGlmIChyb3dbdGhpcy5rZXlGaWVsZF0udG9TdHJpbmcoKSA9PT0gbmV3T2JqW3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5rZXlGaWVsZCArIFwiIFwiICsgbmV3T2JqW3RoaXMua2V5RmllbGRdICsgXCIgYWxyZWFkeSBleGlzdHNcIjtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEudW5zaGlmdChuZXdPYmopO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS51bnNoaWZ0KG5ld09iaik7XG4gICAgfVxuICB9XG5cbiAgYWRkKG5ld09iaikge1xuICAgIGlmICghbmV3T2JqW3RoaXMua2V5RmllbGRdIHx8IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpID09PSAnJykge1xuICAgICAgdGhyb3cgdGhpcy5rZXlGaWVsZCArIFwiIGNhbid0IGJlIGVtcHR5IHZhbHVlLlwiO1xuICAgIH1cbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IHRoaXMua2V5RmllbGQgKyBcIiBcIiArIG5ld09ialt0aGlzLmtleUZpZWxkXSArIFwiIGFscmVhZHkgZXhpc3RzXCI7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBjdXJyZW50RGlzcGxheURhdGEucHVzaChuZXdPYmopO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS5wdXNoKG5ld09iaik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKHJvd0tleSkge1xuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGxldCByZXN1bHQgPSBjdXJyZW50RGlzcGxheURhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHJldHVybiByb3dLZXkuaW5kZXhPZihyb3dbdGhpcy5rZXlGaWVsZF0pID09IC0xO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiByb3dLZXkuaW5kZXhPZihyb3dbdGhpcy5rZXlGaWVsZF0pID09IC0xO1xuICAgICAgfSwgdGhpcyk7XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlcihmaWx0ZXJPYmopIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZmlsdGVyT2JqKS5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IG51bGw7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5zZWFyY2hUZXh0KSB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IGZpbHRlck9iajtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZpbHRlclZhbDtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGZpbHRlck9iaikge1xuICAgICAgICAgIGxldCB0YXJnZXRWYWwgPSByb3dba2V5XTtcblxuICAgICAgICAgIHN3aXRjaCAoZmlsdGVyT2JqW2tleV0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnZhbHVlLm51bWJlcjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsdGVyVmFsID0gKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICAgICAgICh0eXBlb2YgZmlsdGVyT2JqW2tleV0udmFsdWUgPT09IFwic3RyaW5nXCIpID8gZmlsdGVyT2JqW2tleV0udmFsdWUudG9Mb3dlckNhc2UoKSA6IGZpbHRlck9ialtrZXldLnZhbHVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuUkVHRVg6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnZhbHVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgZmlsdGVyVmFsID0gKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyBmaWx0ZXJPYmpba2V5XS52YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmlsdGVyT2JqW2tleV0udmFsdWU7XG4gICAgICAgICAgICAgIGlmIChmaWx0ZXJWYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgb2xkIGZpbHRlclxuICAgICAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuY29sSW5mb3Nba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZpbHRlckZvcm1hdHRlZCwgZm9ybWF0RXh0cmFEYXRhIH0gPSB0aGlzLmNvbEluZm9zW2tleV07XG4gICAgICAgICAgICBpZihmaWx0ZXJGb3JtYXR0ZWQgJiYgZm9ybWF0KSB7XG4gICAgICAgICAgICAgIHRhcmdldFZhbCA9IGZvcm1hdChyb3dba2V5XSwgcm93LCBmb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXRjaCAoZmlsdGVyT2JqW2tleV0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJOdW1iZXIodGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGZpbHRlck9ialtrZXldLnZhbHVlLmNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuREFURTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlckRhdGUodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuUkVHRVg6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJSZWdleCh0YXJnZXRWYWwsIGZpbHRlclZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5DVVNUT006XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJDdXN0b20odGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGZpbHRlck9ialtrZXldLnZhbHVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJUZXh0KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyTnVtYmVyKHRhcmdldFZhbCwgZmlsdGVyVmFsLCBjb21wYXJhdG9yKSB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGNvbXBhcmF0b3IpIHtcbiAgICAgIGNhc2UgXCI9XCI6XG4gICAgICB7XG4gICAgICAgIGlmICh0YXJnZXRWYWwgIT0gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI+XCI6XG4gICAgICB7XG4gICAgICAgIGlmICh0YXJnZXRWYWwgPD0gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI+PVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsIDwgZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICB7XG4gICAgICAgIGlmICh0YXJnZXRWYWwgPj0gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI8PVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsID4gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCIhPVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsID09IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTnVtYmVyIGNvbXBhcmF0b3IgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIGZpbHRlckRhdGUodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpIHtcbiAgICByZXR1cm4gKHRhcmdldFZhbC5nZXREYXRlKCkgPT0gZmlsdGVyVmFsLmdldERhdGUoKSAmJlxuICAgICAgICB0YXJnZXRWYWwuZ2V0TW9udGgoKSA9PSBmaWx0ZXJWYWwuZ2V0TW9udGgoKSAmJlxuICAgICAgICB0YXJnZXRWYWwuZ2V0RnVsbFllYXIoKSA9PSBmaWx0ZXJWYWwuZ2V0RnVsbFllYXIoKSk7XG4gIH1cblxuICBmaWx0ZXJSZWdleCh0YXJnZXRWYWwsIGZpbHRlclZhbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChmaWx0ZXJWYWwsICdpJykudGVzdCh0YXJnZXRWYWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJDdXN0b20odGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGNhbGxiYWNrSW5mbykge1xuICAgIGlmIChjYWxsYmFja0luZm8gIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2tJbmZvID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2tJbmZvLmNhbGxiYWNrKHRhcmdldFZhbCwgY2FsbGJhY2tJbmZvLmNhbGxiYWNrUGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlclRleHQodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpO1xuICB9XG5cbiAgZmlsdGVyVGV4dCh0YXJnZXRWYWwsIGZpbHRlclZhbCkge1xuICAgIGlmICh0YXJnZXRWYWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsKSA9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyogR2VuZXJhbCBzZWFyY2ggZnVuY3Rpb25cbiAgICogSXQgd2lsbCBzZWFyY2ggZm9yIHRoZSB0ZXh0IGlmIHRoZSBpbnB1dCBpbmNsdWRlcyB0aGF0IHRleHQ7XG4gICAqL1xuICBzZWFyY2goc2VhcmNoVGV4dCkge1xuICAgIGlmIChzZWFyY2hUZXh0LnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLnNlYXJjaFRleHQgPSBudWxsO1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuZmlsdGVyT2JqKSB0aGlzLmZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQ7XG4gICAgICBsZXQgc2VhcmNoVGV4dEFycmF5ID0gW107XG5cbiAgICAgIGlmICh0aGlzLm11bHRpQ29sdW1uU2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaFRleHRBcnJheSA9IHNlYXJjaFRleHQuc3BsaXQoJyAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaFRleHRBcnJheS5wdXNoKHNlYXJjaFRleHQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmlzT25GaWx0ZXIgPyB0aGlzLmZpbHRlcmVkRGF0YSA6IHRoaXMuZGF0YTtcblxuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBzb3VyY2UuZmlsdGVyKCByb3cgPT4ge1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICAgIC8vIGZvciBsb29wcyBhcmUgdWdseSwgYnV0IHBlcmZvcm1hbmNlIG1hdHRlcnMgaGVyZS5cbiAgICAgICAgLy8gQW5kIHlvdSBjYW50IGJyZWFrIGZyb20gYSBmb3JFYWNoLlxuICAgICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9mb3ItdnMtZm9yZWFjaC82NlxuICAgICAgICBmb3IgKGxldCBpID0gMCwga2V5c0xlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwga2V5c0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAodGhpcy5jb2xJbmZvc1trZXldICYmIHJvd1trZXldKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZvcm1hdCwgZmlsdGVyRm9ybWF0dGVkLCBmb3JtYXRFeHRyYURhdGEsIHNlYXJjaGFibGUsIGhpZGRlbiB9ID0gdGhpcy5jb2xJbmZvc1trZXldO1xuICAgICAgICAgICAgbGV0IHRhcmdldFZhbCA9IHJvd1trZXldO1xuICAgICAgICAgICAgaWYgKHNlYXJjaGFibGUpIHtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlckZvcm1hdHRlZCAmJiBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRWYWwgPSBmb3JtYXQodGFyZ2V0VmFsLCByb3csIGZvcm1hdEV4dHJhRGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIHRleHRMZW5ndGggPSBzZWFyY2hUZXh0QXJyYXkubGVuZ3RoOyBqIDwgdGV4dExlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyVmFsID0gc2VhcmNoVGV4dEFycmF5W2pdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWwpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCkge1xuICAgIGxldCBfZGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgcmV0dXJuIF9kYXRhO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIGxldCBfZGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG5cbiAgICBpZiAoX2RhdGEubGVuZ3RoID09IDApIHJldHVybiBfZGF0YTtcblxuICAgIGlmICh0aGlzLnJlbW90ZSB8fCAhdGhpcy5lbmFibGVQYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gX2RhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnBhZ2VPYmouc3RhcnQ7IGkgPD0gdGhpcy5wYWdlT2JqLmVuZDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKF9kYXRhW2ldKTtcbiAgICAgICAgaWYgKGkgKyAxID09IF9kYXRhLmxlbmd0aClicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0S2V5RmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMua2V5RmllbGQ7XG4gIH1cblxuICBnZXREYXRhTnVtKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpLmxlbmd0aDtcbiAgfVxuXG4gIGlzQ2hhbmdlZFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZU9iai5zdGFydCAmJiB0aGlzLnBhZ2VPYmouZW5kID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0QWxsUm93a2V5KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHJldHVybiByb3dbdGhpcy5rZXlGaWVsZF07XG4gICAgfSwgdGhpcyk7XG4gIH1cblxufVxuO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3RvcmUvVGFibGVEYXRhU3RvcmUuanNcbiAqKi8iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vZXZlbnRzL2V2ZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG4gIHZhciBmaWxlc2F2ZXIgPSByZXF1aXJlKCcuL2ZpbGVzYXZlcicpO1xuICB2YXIgc2F2ZUFzID0gZmlsZXNhdmVyLnNhdmVBc1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZyhkYXRhLCBrZXlzKSB7XG4gIHZhciBkYXRhU3RyaW5nID0gXCJcIjtcbiAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm4gZGF0YVN0cmluZztcblxuICBkYXRhU3RyaW5nICs9IGtleXMuam9pbignLCcpICsgJ1xcbidcblxuICBkYXRhLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICBrZXlzLm1hcChmdW5jdGlvbihjb2wsIGkpIHtcbiAgICAgIGxldCBjZWxsID0gdHlwZW9mIHJvd1tjb2xdICE9PSAndW5kZWZpbmVkJyA/ICgnXCInK3Jvd1tjb2xdKydcIicpIDogXCJcIjtcbiAgICAgIGRhdGFTdHJpbmcgKz0gY2VsbDtcbiAgICAgIGlmIChpKzEgPCBrZXlzLmxlbmd0aClcbiAgICAgICAgZGF0YVN0cmluZyArPSAnLCc7XG4gICAgfSk7XG5cbiAgICBkYXRhU3RyaW5nICs9ICdcXG4nO1xuICB9KTtcblxuICByZXR1cm4gZGF0YVN0cmluZztcbn07XG5cbnZhciBleHBvcnRDU1YgPSBmdW5jdGlvbihkYXRhLCBrZXlzLCBmaWxlbmFtZSkge1xuICB2YXIgZGF0YVN0cmluZyA9IHRvU3RyaW5nKGRhdGEsIGtleXMpO1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzYXZlQXMoIG5ldyBCbG9iKFtkYXRhU3RyaW5nXSwge3R5cGU6IFwidGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04XCJ9KSwgZmlsZW5hbWUgfHwgJ3NwcmVhZHNoZWV0LmNzdicgKTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRDU1Y7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanNcbiAqKi8iLCIvKiBGaWxlU2F2ZXIuanNcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTUxMDAzXG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogTUlUXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBzYXZlQXMgfHwgKGZ1bmN0aW9uKHZpZXcpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhclxuXHRcdCAgZG9jID0gdmlldy5kb2N1bWVudFxuXHRcdCAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcblx0XHQsIGdldF9VUkwgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuXHRcdH1cblx0XHQsIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiYVwiKVxuXHRcdCwgY2FuX3VzZV9zYXZlX2xpbmsgPSBcImRvd25sb2FkXCIgaW4gc2F2ZV9saW5rXG5cdFx0LCBjbGljayA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIik7XG5cdFx0XHRub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH1cblx0XHQsIGlzX3NhZmFyaSA9IC9WZXJzaW9uXFwvW1xcZFxcLl0rLipTYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcblx0XHQsIHdlYmtpdF9yZXFfZnMgPSB2aWV3LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtXG5cdFx0LCByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbVxuXHRcdCwgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uKGV4KSB7XG5cdFx0XHQodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgZXg7XG5cdFx0XHR9LCAwKTtcblx0XHR9XG5cdFx0LCBmb3JjZV9zYXZlYWJsZV90eXBlID0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuXHRcdCwgZnNfbWluX3NpemUgPSAwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzUyOTcjYzcgYW5kXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2NvbW1pdC80ODU5MzBhI2NvbW1pdGNvbW1lbnQtODc2ODA0N1xuXHRcdC8vIGZvciB0aGUgcmVhc29uaW5nIGJlaGluZCB0aGUgdGltZW91dCBhbmQgcmV2b2NhdGlvbiBmbG93XG5cdFx0LCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQgPSA1MDAgLy8gaW4gbXNcblx0XHQsIHJldm9rZSA9IGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdHZhciByZXZva2VyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcblx0XHRcdFx0XHRnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xuXHRcdFx0XHR9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxuXHRcdFx0XHRcdGZpbGUucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRpZiAodmlldy5jaHJvbWUpIHtcblx0XHRcdFx0cmV2b2tlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGRpc3BhdGNoID0gZnVuY3Rpb24oZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcblx0XHRcdGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcblx0XHRcdHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbXCJvblwiICsgZXZlbnRfdHlwZXNbaV1dO1xuXHRcdFx0XHRpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0bGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdFx0XHRcdHRocm93X291dHNpZGUoZXgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGF1dG9fYm9tID0gZnVuY3Rpb24oYmxvYikge1xuXHRcdFx0Ly8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcblx0XHRcdGlmICgvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgQmxvYihbXCJcXHVmZWZmXCIsIGJsb2JdLCB7dHlwZTogYmxvYi50eXBlfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYmxvYjtcblx0XHR9XG5cdFx0LCBGaWxlU2F2ZXIgPSBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0aWYgKCFub19hdXRvX2JvbSkge1xuXHRcdFx0XHRibG9iID0gYXV0b19ib20oYmxvYik7XG5cdFx0XHR9XG5cdFx0XHQvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuXHRcdFx0dmFyXG5cdFx0XHRcdCAgZmlsZXNhdmVyID0gdGhpc1xuXHRcdFx0XHQsIHR5cGUgPSBibG9iLnR5cGVcblx0XHRcdFx0LCBibG9iX2NoYW5nZWQgPSBmYWxzZVxuXHRcdFx0XHQsIG9iamVjdF91cmxcblx0XHRcdFx0LCB0YXJnZXRfdmlld1xuXHRcdFx0XHQsIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJ3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kXCIuc3BsaXQoXCIgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBvbiBhbnkgZmlsZXN5cyBlcnJvcnMgcmV2ZXJ0IHRvIHNhdmluZyB3aXRoIG9iamVjdCBVUkxzXG5cdFx0XHRcdCwgZnNfZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAodGFyZ2V0X3ZpZXcgJiYgaXNfc2FmYXJpICYmIHR5cGVvZiBGaWxlUmVhZGVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHQvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcblx0XHRcdFx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBcImRhdGE6YXR0YWNobWVudC9maWxlXCIgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuXHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdFx0XHRkaXNwYXRjaF9hbGwoKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcblx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGRvbid0IGNyZWF0ZSBtb3JlIG9iamVjdCBVUkxzIHRoYW4gbmVlZGVkXG5cdFx0XHRcdFx0aWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuXHRcdFx0XHRcdFx0b2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0YXJnZXRfdmlldykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsIFwiX2JsYW5rXCIpO1xuXHRcdFx0XHRcdFx0aWYgKG5ld190YWIgPT0gdW5kZWZpbmVkICYmIGlzX3NhZmFyaSkge1xuXHRcdFx0XHRcdFx0XHQvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuXHRcdFx0XHRcdFx0XHR2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCwgYWJvcnRhYmxlID0gZnVuY3Rpb24oZnVuYykge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlc2F2ZXIucmVhZHlTdGF0ZSAhPT0gZmlsZXNhdmVyLkRPTkUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdCwgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9XG5cdFx0XHRcdCwgc2xpY2Vcblx0XHRcdDtcblx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cdFx0XHRpZiAoIW5hbWUpIHtcblx0XHRcdFx0bmFtZSA9IFwiZG93bmxvYWRcIjtcblx0XHRcdH1cblx0XHRcdGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuXHRcdFx0XHRvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRcdFx0c2F2ZV9saW5rLmhyZWYgPSBvYmplY3RfdXJsO1xuXHRcdFx0XHRzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNsaWNrKHNhdmVfbGluayk7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuXHRcdFx0Ly8gdmlld2VkIGluIGEgdGFiLCBzbyBJIGZvcmNlIHNhdmUgd2l0aCBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cblx0XHRcdC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkxMTU4XG5cdFx0XHQvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuXHRcdFx0Ly8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM4OTY0MlxuXHRcdFx0aWYgKHZpZXcuY2hyb21lICYmIHR5cGUgJiYgdHlwZSAhPT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSkge1xuXHRcdFx0XHRzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcblx0XHRcdFx0YmxvYiA9IHNsaWNlLmNhbGwoYmxvYiwgMCwgYmxvYi5zaXplLCBmb3JjZV9zYXZlYWJsZV90eXBlKTtcblx0XHRcdFx0YmxvYl9jaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdC8vIFNpbmNlIEkgY2FuJ3QgYmUgc3VyZSB0aGF0IHRoZSBndWVzc2VkIG1lZGlhIHR5cGUgd2lsbCB0cmlnZ2VyIGEgZG93bmxvYWRcblx0XHRcdC8vIGluIFdlYktpdCwgSSBhcHBlbmQgLmRvd25sb2FkIHRvIHRoZSBmaWxlbmFtZS5cblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuXHRcdFx0aWYgKHdlYmtpdF9yZXFfZnMgJiYgbmFtZSAhPT0gXCJkb3dubG9hZFwiKSB7XG5cdFx0XHRcdG5hbWUgKz0gXCIuZG93bmxvYWRcIjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcblx0XHRcdFx0dGFyZ2V0X3ZpZXcgPSB2aWV3O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFyZXFfZnMpIHtcblx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZnNfbWluX3NpemUgKz0gYmxvYi5zaXplO1xuXHRcdFx0cmVxX2ZzKHZpZXcuVEVNUE9SQVJZLCBmc19taW5fc2l6ZSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZzKSB7XG5cdFx0XHRcdGZzLnJvb3QuZ2V0RGlyZWN0b3J5KFwic2F2ZWRcIiwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uKGRpcikge1xuXHRcdFx0XHRcdHZhciBzYXZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRkaXIuZ2V0RmlsZShuYW1lLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24od3JpdGVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLm9ud3JpdGVlbmQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IGZpbGUudG9VUkwoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChmaWxlc2F2ZXIsIFwid3JpdGVlbmRcIiwgZXZlbnQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV2b2tlKGZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvci5jb2RlICE9PSBlcnJvci5BQk9SVF9FUlIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFwid3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSBhYm9ydFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3cml0ZXJbXCJvblwiICsgZXZlbnRdID0gZmlsZXNhdmVyW1wib25cIiArIGV2ZW50XTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR3cml0ZXIud3JpdGUoYmxvYik7XG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3cml0ZXIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5XUklUSU5HO1xuXHRcdFx0XHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0XHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGRpci5nZXRGaWxlKG5hbWUsIHtjcmVhdGU6IGZhbHNlfSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRmaWxlLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRcdH0pLCBhYm9ydGFibGUoZnVuY3Rpb24oZXgpIHtcblx0XHRcdFx0XHRcdGlmIChleC5jb2RlID09PSBleC5OT1RfRk9VTkRfRVJSKSB7XG5cdFx0XHRcdFx0XHRcdHNhdmUoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZzX2Vycm9yKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHR9XG5cdFx0LCBGU19wcm90byA9IEZpbGVTYXZlci5wcm90b3R5cGVcblx0XHQsIHNhdmVBcyA9IGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSk7XG5cdFx0fVxuXHQ7XG5cdC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdGlmICghbm9fYXV0b19ib20pIHtcblx0XHRcdFx0YmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgXCJkb3dubG9hZFwiKTtcblx0XHR9O1xuXHR9XG5cblx0RlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgZmlsZXNhdmVyID0gdGhpcztcblx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJhYm9ydFwiKTtcblx0fTtcblx0RlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuXHRGU19wcm90by5XUklUSU5HID0gMTtcblx0RlNfcHJvdG8uRE9ORSA9IDI7XG5cblx0RlNfcHJvdG8uZXJyb3IgPVxuXHRGU19wcm90by5vbndyaXRlc3RhcnQgPVxuXHRGU19wcm90by5vbnByb2dyZXNzID1cblx0RlNfcHJvdG8ub253cml0ZSA9XG5cdEZTX3Byb3RvLm9uYWJvcnQgPVxuXHRGU19wcm90by5vbmVycm9yID1cblx0RlNfcHJvdG8ub253cml0ZWVuZCA9XG5cdFx0bnVsbDtcblxuXHRyZXR1cm4gc2F2ZUFzO1xufShcblx0ICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZlxuXHR8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuXHR8fCB0aGlzLmNvbnRlbnRcbikpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cy5zYXZlQXMgPSBzYXZlQXM7XG59IGVsc2UgaWYgKCh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCkgJiYgKGRlZmluZS5hbWQgIT0gbnVsbCkpIHtcbiAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2F2ZUFzO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbGVzYXZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZXhwb3J0IGNsYXNzIEZpbHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICBzdXBlcihkYXRhKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0ge307XG4gICAgfVxuXG4gICAgaGFuZGxlRmlsdGVyKGRhdGFGaWVsZCwgdmFsdWUsIHR5cGUpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyVHlwZSA9IHR5cGUgfHwgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIHZhbHVlIG9mIHRoZSBmaWx0ZXIgaXMgYW4gb2JqZWN0XG4gICAgICAgICAgICBsZXQgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsdWVbcHJvcF0gfHwgdmFsdWVbcHJvcF0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyB1bmRlZmluZWQgb3IgZW1wdHksIHdlIHJlbW92ZSB0aGUgZmlsdGVyXG4gICAgICAgICAgICAoaGFzVmFsdWUpID8gdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF0gPSB7dmFsdWU6IHZhbHVlLCB0eXBlOiBmaWx0ZXJUeXBlfSA6IGRlbGV0ZSB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUgfHwgdmFsdWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXSA9IHt2YWx1ZTogdmFsdWUudHJpbSgpLCB0eXBlOiBmaWx0ZXJUeXBlfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoJ29uRmlsdGVyQ2hhbmdlJywgdGhpcy5jdXJyZW50RmlsdGVyKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9GaWx0ZXIuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBEYXRlRmlsdGVyIGZyb20gJy4vZmlsdGVycy9EYXRlJztcbmltcG9ydCBUZXh0RmlsdGVyIGZyb20gJy4vZmlsdGVycy9UZXh0JztcbmltcG9ydCBSZWdleEZpbHRlciBmcm9tICcuL2ZpbHRlcnMvUmVnZXgnO1xuaW1wb3J0IFNlbGVjdEZpbHRlciBmcm9tICcuL2ZpbHRlcnMvU2VsZWN0JztcbmltcG9ydCBOdW1iZXJGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL051bWJlcic7XG5cbmNsYXNzIFRhYmxlSGVhZGVyQ29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlRmlsdGVyID0gdGhpcy5oYW5kbGVGaWx0ZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNvbHVtbkNsaWNrKGUpe1xuICAgIGlmKCF0aGlzLnByb3BzLmRhdGFTb3J0KXJldHVybjtcbiAgICBsZXQgb3JkZXIgPSB0aGlzLnByb3BzLnNvcnQgPT0gQ29uc3QuU09SVF9ERVNDP0NvbnN0LlNPUlRfQVNDOkNvbnN0LlNPUlRfREVTQztcbiAgICB0aGlzLnByb3BzLm9uU29ydChvcmRlciwgdGhpcy5wcm9wcy5kYXRhRmllbGQpO1xuICB9XG5cbiAgaGFuZGxlRmlsdGVyKHZhbHVlLCB0eXBlKSB7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXIuZW1pdHRlci5oYW5kbGVGaWx0ZXIodGhpcy5wcm9wcy5kYXRhRmllbGQsIHZhbHVlLCB0eXBlKTtcbiAgfVxuXG4gIGdldEZpbHRlcnMoKSB7XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmZpbHRlci50eXBlKSB7XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQ6IHtcbiAgICAgICAgcmV0dXJuIDxUZXh0RmlsdGVyIHsuLi50aGlzLnByb3BzLmZpbHRlcn0gY29sdW1uTmFtZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gZmlsdGVySGFuZGxlcj17dGhpcy5oYW5kbGVGaWx0ZXJ9IC8+O1xuICAgICAgfVxuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5SRUdFWDoge1xuICAgICAgICByZXR1cm4gPFJlZ2V4RmlsdGVyIHsuLi50aGlzLnByb3BzLmZpbHRlcn0gY29sdW1uTmFtZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gZmlsdGVySGFuZGxlcj17dGhpcy5oYW5kbGVGaWx0ZXJ9IC8+O1xuICAgICAgfVxuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1Q6IHtcbiAgICAgICAgcmV0dXJuIDxTZWxlY3RGaWx0ZXIgey4uLnRoaXMucHJvcHMuZmlsdGVyfSBjb2x1bW5OYW1lPXt0aGlzLnByb3BzLmNoaWxkcmVufSBmaWx0ZXJIYW5kbGVyPXt0aGlzLmhhbmRsZUZpbHRlcn0gLz47XG4gICAgICB9XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjoge1xuICAgICAgICByZXR1cm4gPE51bWJlckZpbHRlciB7Li4udGhpcy5wcm9wcy5maWx0ZXJ9IGNvbHVtbk5hbWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IGZpbHRlckhhbmRsZXI9e3RoaXMuaGFuZGxlRmlsdGVyfSAvPjtcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuREFURToge1xuICAgICAgICByZXR1cm4gPERhdGVGaWx0ZXIgey4uLnRoaXMucHJvcHMuZmlsdGVyfSBjb2x1bW5OYW1lPXt0aGlzLnByb3BzLmNoaWxkcmVufSBmaWx0ZXJIYW5kbGVyPXt0aGlzLmhhbmRsZUZpbHRlcn0gLz47XG4gICAgICB9XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTToge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5maWx0ZXIuZ2V0RWxlbWVudCh0aGlzLmhhbmRsZUZpbHRlciwgdGhpcy5wcm9wcy5maWx0ZXIuY3VzdG9tRmlsdGVyUGFyYW1ldGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICB0aGlzLnJlZnNbXCJoZWFkZXItY29sXCJdLnNldEF0dHJpYnV0ZShcImRhdGEtZmllbGRcIiwgdGhpcy5wcm9wcy5kYXRhRmllbGQpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgbGV0IGRlZmF1bHRDYXJldDtcbiAgICB2YXIgdGhTdHlsZSA9IHtcbiAgICAgIHRleHRBbGlnbjogdGhpcy5wcm9wcy5kYXRhQWxpZ24sXG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLmhpZGRlbj9cIm5vbmVcIjpudWxsXG4gICAgfTtcbiAgICBpZih0aGlzLnByb3BzLnNvcnRJbmRpY2F0b3IpIHtcbiAgICAgIGRlZmF1bHRDYXJldCA9ICghdGhpcy5wcm9wcy5kYXRhU29ydCkgPyBudWxsIDogKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcmRlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiIHN0eWxlPXt7bWFyZ2luOiAnMTBweCAwIDEwcHggNXB4JywgY29sb3I6ICcjY2NjJ319Pjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZHJvcHVwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiIHN0eWxlPXt7bWFyZ2luOiAnMTBweCAwJywgY29sb3I6ICcjY2NjJ319Pjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHNvcnRDYXJldCA9IHRoaXMucHJvcHMuc29ydCA/IFV0aWwucmVuZGVyUmVhY3RTb3J0Q2FyZXQodGhpcy5wcm9wcy5zb3J0KSA6IGRlZmF1bHRDYXJldDtcblxuICAgIHZhciBjbGFzc2VzID0gdGhpcy5wcm9wcy5jbGFzc05hbWUrXCIgXCIrKHRoaXMucHJvcHMuZGF0YVNvcnQ/XCJzb3J0LWNvbHVtblwiOlwiXCIpO1xuICAgIHJldHVybihcbiAgICAgIDx0aCByZWY9J2hlYWRlci1jb2wnXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgIHN0eWxlPXt0aFN0eWxlfVxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ29sdW1uQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufXtzb3J0Q2FyZXR9XG4gICAgICAgIHt0aGlzLnByb3BzLmZpbHRlciA/IHRoaXMuZ2V0RmlsdGVycygpIDogbnVsbH1cbiAgICAgIDwvdGg+XG4gICAgKVxuICB9XG59XG5cbnZhciBmaWx0ZXJUeXBlQXJyYXkgPSBbXTtcbmZvciAobGV0IGtleSBpbiBDb25zdC5GSUxURVJfVFlQRSkge1xuICBmaWx0ZXJUeXBlQXJyYXkucHVzaChDb25zdC5GSUxURVJfVFlQRVtrZXldKTtcbn1cblxuVGFibGVIZWFkZXJDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBkYXRhRmllbGQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGFBbGlnbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YVNvcnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvblNvcnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBkYXRhRm9ybWF0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgaXNLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlZGl0YWJsZTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgaGlkZGVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgc2VhcmNoYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc29ydEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBjb2x1bW5DbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIGZpbHRlckZvcm1hdHRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNvcnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGZvcm1hdEV4dHJhRGF0YTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihmaWx0ZXJUeXBlQXJyYXkpLFxuICAgIGRlbGF5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgLy8gZm9yIFNlbGVjdEZpbHRlclxuICAgICAgUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlcikgLy9mb3IgTnVtYmVyRmlsdGVyXG4gICAgICAgIF0pLFxuICAgIG51bWJlckNvbXBhcmF0b3JzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBlbWl0dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGdldEVsZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGN1c3RvbUZpbHRlclBhcmFtZXRlcnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcbiAgfSksXG4gIHNvcnRJbmRpY2F0b3I6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuXG5UYWJsZUhlYWRlckNvbHVtbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhdGFBbGlnbjogXCJsZWZ0XCIsXG4gIGRhdGFTb3J0OiBmYWxzZSxcbiAgZGF0YUZvcm1hdDogdW5kZWZpbmVkLFxuICBpc0tleTogZmFsc2UsXG4gIGVkaXRhYmxlOiB0cnVlLFxuICBvblNvcnQ6IHVuZGVmaW5lZCxcbiAgaGlkZGVuOiBmYWxzZSxcbiAgc2VhcmNoYWJsZTogdHJ1ZSxcbiAgY2xhc3NOYW1lOiBcIlwiLFxuICB3aWR0aDogbnVsbCxcbiAgc29ydEZ1bmM6IHVuZGVmaW5lZCxcbiAgY29sdW1uQ2xhc3NOYW1lOiAnJyxcbiAgZmlsdGVyRm9ybWF0dGVkOiBmYWxzZSxcbiAgc29ydDogdW5kZWZpbmVkLFxuICBmb3JtYXRFeHRyYURhdGE6IHVuZGVmaW5lZCxcbiAgZmlsdGVyOiB1bmRlZmluZWQsXG4gIHNvcnRJbmRpY2F0b3I6IHRydWVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlSGVhZGVyQ29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgRGF0ZUZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLmZpbHRlciA9IHRoaXMuZmlsdGVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdERhdGUoKSB7XG4gICAgICAgIGxldCBkZWZhdWx0RGF0ZSAgPSBcIlwiO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgYXBwcm9wcmlhdGUgZm9ybWF0IGZvciB0aGUgaW5wdXQgdHlwZT1kYXRlLCBpLmUuIFwiWVlZWS1NTS1ERFwiXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICBkZWZhdWx0RGF0ZSA9IGAke2RlZmF1bHRWYWx1ZS5nZXRGdWxsWWVhcigpfS0keyhcIjBcIiArIChkZWZhdWx0VmFsdWUuZ2V0TW9udGgoKSArIDEpKS5zbGljZSgtMil9LSR7KFwiMFwiICsgZGVmYXVsdFZhbHVlLmdldERhdGUoKSkuc2xpY2UoLTIpfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRlO1xuICAgIH1cblxuICAgIGZpbHRlcihldmVudCkge1xuICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChkYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcihuZXcgRGF0ZShkYXRlVmFsdWUpLCBDb25zdC5GSUxURVJfVFlQRS5EQVRFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcihudWxsLCBDb25zdC5GSUxURVJfVFlQRS5EQVRFKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSB0aGlzLnJlZnMuaW5wdXREYXRlLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgaWYgKGRhdGVWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG5ldyBEYXRlKGRhdGVWYWx1ZSksIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHJlZj1cImlucHV0RGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmlsdGVyIGRhdGUtZmlsdGVyIGZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMuc2V0RGVmYXVsdERhdGUoKX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5EYXRlRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgICBmaWx0ZXJIYW5kbGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjb2x1bW5OYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXRlRmlsdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsdGVycy9EYXRlLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIFRleHRGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmZpbHRlciA9IHRoaXMuZmlsdGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50aW1lb3V0ID0gbnVsbDtcblx0fVxuXG5cdGZpbHRlcihldmVudCkge1xuXHRcdGlmICh0aGlzLnRpbWVvdXQpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHRcdH1cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRjb25zdCBmaWx0ZXJWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblx0XHR0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5wcm9wcy5maWx0ZXJIYW5kbGVyKGZpbHRlclZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5URVhUKTtcblx0XHR9LCBzZWxmLnByb3BzLmRlbGF5KTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGlmICh0aGlzLnJlZnMuaW5wdXRUZXh0LmRlZmF1bHRWYWx1ZSkge1xuXHRcdFx0dGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHRoaXMucmVmcy5pbnB1dFRleHQuZGVmYXVsdFZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5URVhUKTtcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGlucHV0IHJlZj1cImlucHV0VGV4dFwiXG5cdFx0XHRcdCAgIGNsYXNzTmFtZT1cImZpbHRlciB0ZXh0LWZpbHRlciBmb3JtLWNvbnRyb2xcIlxuXHRcdFx0XHQgICB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdCAgIG9uQ2hhbmdlPXt0aGlzLmZpbHRlcn1cblx0XHRcdFx0ICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYEVudGVyICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9XG5cdFx0XHRcdCAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogXCJcIn0gLz5cblx0XHQpO1xuXHR9XG59O1xuXG5UZXh0RmlsdGVyLnByb3BUeXBlcyA9IHtcblx0ZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0ZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRkZWxheTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0cGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdGNvbHVtbk5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cblRleHRGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuXHRkZWxheTogQ29uc3QuRklMVEVSX0RFTEFZXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL1RleHQuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgUmVnZXhGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmZpbHRlciA9IHRoaXMuZmlsdGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50aW1lb3V0ID0gbnVsbDtcblx0fVxuXG5cdGZpbHRlcihldmVudCkge1xuXHRcdGlmICh0aGlzLnRpbWVvdXQpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHRcdH1cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRjb25zdCBmaWx0ZXJWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblx0XHR0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5wcm9wcy5maWx0ZXJIYW5kbGVyKGZpbHRlclZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5SRUdFWCk7XG5cdFx0fSwgc2VsZi5wcm9wcy5kZWxheSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRpZiAodGhpcy5yZWZzLmlucHV0VGV4dC5kZWZhdWx0VmFsdWUpIHtcblx0XHRcdHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih0aGlzLnJlZnMuaW5wdXRUZXh0LmRlZmF1bHRWYWx1ZSwgQ29uc3QuRklMVEVSX1RZUEUuUkVHRVgpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8aW5wdXQgcmVmPVwiaW5wdXRUZXh0XCJcblx0XHRcdFx0ICAgY2xhc3NOYW1lPVwiZmlsdGVyIHRleHQtZmlsdGVyIGZvcm0tY29udHJvbFwiXG5cdFx0XHRcdCAgIHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0ICAgb25DaGFuZ2U9e3RoaXMuZmlsdGVyfVxuXHRcdFx0XHQgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgRW50ZXIgUmVnZXggZm9yICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9XG5cdFx0XHRcdCAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogXCJcIn0gLz5cblx0XHQpO1xuXHR9XG59O1xuXG5SZWdleEZpbHRlci5wcm9wVHlwZXMgPSB7XG5cdGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0ZGVsYXk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRjb2x1bW5OYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5SZWdleEZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG5cdGRlbGF5OiBDb25zdC5GSUxURVJfREVMQVlcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnZXhGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL1JlZ2V4LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIFNlbGVjdEZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0aXNQbGFjZWhvbGRlclNlbGVjdGVkOiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQhdGhpcy5wcm9wcy5vcHRpb25zLmhhc093blByb3BlcnR5KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSlcblx0XHR9O1xuXHR9XG5cblx0ZmlsdGVyKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNQbGFjZWhvbGRlclNlbGVjdGVkOiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcIlwiKX0pO1xuXHRcdHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcihldmVudC50YXJnZXQudmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlNFTEVDVCk7XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdGxldCBvcHRpb25UYWdzID0gW107XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHRvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9XCItMVwiIHZhbHVlPVwiXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYFNlbGVjdCAke3RoaXMucHJvcHMuY29sdW1uTmFtZX0uLi5gfTwvb3B0aW9uPik7XG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykubWFwKChrZXkpID0+IHtcblx0XHRcdG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT17a2V5fSB2YWx1ZT17a2V5fT57b3B0aW9uc1trZXldfTwvb3B0aW9uPik7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9wdGlvblRhZ3M7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRpZiAodGhpcy5yZWZzLnNlbGVjdElucHV0LnZhbHVlKSB7XG5cdFx0XHR0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIodGhpcy5yZWZzLnNlbGVjdElucHV0LnZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1QpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc1NldChcImZpbHRlclwiLCBcInNlbGVjdC1maWx0ZXJcIiwgXCJmb3JtLWNvbnRyb2xcIixcblx0XHRcdFx0XHRcdFx0e1wicGxhY2Vob2xkZXItc2VsZWN0ZWRcIjogdGhpcy5zdGF0ZS5pc1BsYWNlaG9sZGVyU2VsZWN0ZWR9KTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VsZWN0IHJlZj1cInNlbGVjdElucHV0XCJcblx0XHRcdFx0XHRjbGFzc05hbWU9e3NlbGVjdENsYXNzfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmZpbHRlcn1cblx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSAhPSB1bmRlZmluZWQpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiBcIlwifT5cblx0XHRcdFx0e3RoaXMuZ2V0T3B0aW9ucygpfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblx0fVxufTtcblxuU2VsZWN0RmlsdGVyLnByb3BUeXBlcyA9IHtcblx0ZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0Y29sdW1uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0RmlsdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsdGVycy9TZWxlY3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY29uc3QgbGVnYWxDb21wYXJhdG9ycyA9IFtcIj1cIiwgXCI+XCIsIFwiPj1cIiwgXCI8XCIsIFwiPD1cIiwgXCIhPVwiXTtcblxuY2xhc3MgTnVtYmVyRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMubnVtYmVyQ29tcGFyYXRvcnMgPSB0aGlzLnByb3BzLm51bWJlckNvbXBhcmF0b3JzIHx8IGxlZ2FsQ29tcGFyYXRvcnM7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6ICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlciA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnByb3BzLm9wdGlvbnMgJiYgdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2YodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyKSA9PSAtMSkpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25DaGFuZ2VOdW1iZXIgPSB0aGlzLm9uQ2hhbmdlTnVtYmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VOdW1iZXJTZXQgPSB0aGlzLm9uQ2hhbmdlTnVtYmVyU2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDb21wYXJhdG9yID0gdGhpcy5vbkNoYW5nZUNvbXBhcmF0b3IuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZU51bWJlcihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnByb3BzLmZpbHRlckhhbmRsZXIoe251bWJlcjogZmlsdGVyVmFsdWUsIGNvbXBhcmF0b3I6IHNlbGYucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlfSxcbiAgICAgICAgICAgICAgICBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgICAgICB9LCBzZWxmLnByb3BzLmRlbGF5KTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZU51bWJlclNldChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6IChldmVudC50YXJnZXQudmFsdWUgPT09IFwiXCIpfSk7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih7bnVtYmVyOiBldmVudC50YXJnZXQudmFsdWUsIGNvbXBhcmF0b3I6IHRoaXMucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlfSxcbiAgICAgICAgICAgIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUik7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VDb21wYXJhdG9yKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHtudW1iZXI6IHRoaXMucmVmcy5udW1iZXJGaWx0ZXIudmFsdWUsIGNvbXBhcmF0b3I6IGV2ZW50LnRhcmdldC52YWx1ZX0sXG4gICAgICAgICAgICBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgIH1cblxuICAgIGdldENvbXBhcmF0b3JPcHRpb25zKCkge1xuICAgICAgICBsZXQgb3B0aW9uVGFncyA9IFtdO1xuICAgICAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9XCItMVwiPjwvb3B0aW9uPik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJDb21wYXJhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17dGhpcy5udW1iZXJDb21wYXJhdG9yc1tpXX0+e3RoaXMubnVtYmVyQ29tcGFyYXRvcnNbaV19PC9vcHRpb24+KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvblRhZ3M7XG4gICAgfVxuXG4gICAgZ2V0TnVtYmVyT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvblRhZ3MgPSBbXTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcblxuICAgICAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9XCItMVwiIHZhbHVlPVwiXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYFNlbGVjdCAke3RoaXMucHJvcHMuY29sdW1uTmFtZX0uLi5gfTwvb3B0aW9uPik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17b3B0aW9uc1tpXX0+e29wdGlvbnNbaV19PC9vcHRpb24+KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvblRhZ3M7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZSAmJiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIoe251bWJlcjogdGhpcy5yZWZzLm51bWJlckZpbHRlci52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb21wYXJhdG9yOiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZX0sXG4gICAgICAgICAgICAgICAgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBzZWxlY3RDbGFzcyA9IGNsYXNzU2V0KFwic2VsZWN0LWZpbHRlclwiLCBcIm51bWJlci1maWx0ZXItaW5wdXRcIiwgXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFwicGxhY2Vob2xkZXItc2VsZWN0ZWRcIjogdGhpcy5zdGF0ZS5pc1BsYWNlaG9sZGVyU2VsZWN0ZWQgfSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyIG51bWJlci1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj1cIm51bWJlckZpbHRlckNvbXBhcmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibnVtYmVyLWZpbHRlci1jb21wYXJhdG9yIGZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZUNvbXBhcmF0b3J9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZS5jb21wYXJhdG9yIDogXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldENvbXBhcmF0b3JPcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgeyh0aGlzLnByb3BzLm9wdGlvbnMpID8gPHNlbGVjdCByZWY9XCJudW1iZXJGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTnVtYmVyU2V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXsodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZS5udW1iZXIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXROdW1iZXJPcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+IDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCByZWY9XCJudW1iZXJGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibnVtYmVyLWZpbHRlci1pbnB1dCBmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgRW50ZXIgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VOdW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwifSAvPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn07XG5cbk51bWJlckZpbHRlci5wcm9wVHlwZXMgPSB7XG4gICAgZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIG51bWJlcjogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgY29tcGFyYXRvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKGxlZ2FsQ29tcGFyYXRvcnMpXG4gICAgfSksXG4gICAgZGVsYXk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgbnVtYmVyQ29tcGFyYXRvcnM6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgICBpZiAoIXByb3BzW3Byb3BOYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHNbcHJvcE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29tcGFyYXRvcklzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVnYWxDb21wYXJhdG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChsZWdhbENvbXBhcmF0b3JzW2pdID09PSBwcm9wc1twcm9wTmFtZV1baV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyYXRvcklzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbXBhcmF0b3JJc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgTnVtYmVyIGNvbXBhcmF0b3IgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZC4gVXNlIG9ubHkgJHtsZWdhbENvbXBhcmF0b3JzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2x1bW5OYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5OdW1iZXJGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIGRlbGF5OiBDb25zdC5GSUxURVJfREVMQVlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlckZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbHRlcnMvTnVtYmVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==