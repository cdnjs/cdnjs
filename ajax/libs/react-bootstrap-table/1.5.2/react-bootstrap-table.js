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
	
	    this._adjustHeaderWidth = function () {
	      var tableHeaderDom = _this.refs.header.refs.container.childNodes[0];
	      var tableBodyDom = _this.refs.body.refs.container.childNodes[0];
	      if (tableHeaderDom.offsetWidth !== tableBodyDom.offsetWidth) {
	        tableHeaderDom.style.width = tableBodyDom.offsetWidth + "px";
	      }
	      var headerProps = _this.refs.body.getBodyHeaderDomProp();
	      _this.refs.header.fitHeader(headerProps, _this.refs.body.refs.container.scrollHeight > _this.refs.body.refs.container.clientHeight);
	    };
	
	    this._attachCellEditFunc();
	
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
	          sizePerPage = this.refs.pagination.getSizePerPage();
	          page = this.refs.pagination.getCurrentPage();
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
	
	      return children.map(function (column, i) {
	        return {
	          name: column.props.dataField,
	          align: column.props.dataAlign,
	          sort: column.props.dataSort,
	          format: column.props.dataFormat,
	          formatExtraData: column.props.formatExtraData,
	          filterFormatted: column.props.filterFormatted,
	          editable: column.props.editable,
	          hidden: column.props.hidden,
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
	        var paginationDom = this.refs.pagination;
	        var page = paginationDom && paginationDom.getCurrentPage() || nextProps.options.page || 1;
	        var sizePerPage = paginationDom && paginationDom.getSizePerPage() || nextProps.options.sizePerPage || _Const2['default'].SIZE_PER_PAGE_LIST[0];
	        // #125
	        if (page > Math.ceil(nextProps.data.length / sizePerPage)) page = 1;
	        var sortInfo = this.store.getSortInfo();
	        var sortField = nextProps.options.sortName || (sortInfo ? sortInfo.sortField : undefined);
	        var sortOrder = nextProps.options.sortOrder || (sortInfo ? sortInfo.order : undefined);
	        if (sortField && sortOrder) this.store.sort(sortOrder, sortField);
	        var data = this.store.page(page, sizePerPage).get();
	        this.setState({
	          data: data
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
	      this._adjustHeaderWidth();
	      window.addEventListener('resize', this._adjustHeaderWidth);
	      this.refs.body.refs.container.addEventListener('scroll', this._scrollHeader);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this._adjustHeaderWidth);
	      this.refs.body.refs.container.removeEventListener('scroll', this._scrollHeader);
	      if (this.filter) {
	        this.filter.removeAllListeners("onFilterChange");
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._adjustHeaderWidth();
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
	
	      var tableClass = (0, _classnames2['default'])("react-bs-table");
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
	      return _react2['default'].createElement(
	        'div',
	        { className: 'react-bs-container', ref: 'table' },
	        toolBar,
	        _react2['default'].createElement(
	          'div',
	          { className: 'react-bs-table-container', style: style },
	          _react2['default'].createElement(
	            _TableHeader2['default'],
	            {
	              ref: 'header',
	              rowSelectType: this.props.selectRow.mode,
	              hideSelectColumn: this.props.selectRow.hideSelectColumn,
	              sortName: sortInfo ? sortInfo.sortField : undefined,
	              sortOrder: sortInfo ? sortInfo.order : undefined,
	              onSort: this.handleSort.bind(this),
	              onSelectAllRow: this.handleSelectAllRow.bind(this),
	              bordered: this.props.bordered,
	              condensed: this.props.condensed,
	              isFiltered: this.filter ? true : false,
	              isSelectAll: isSelectAll },
	            this.props.children
	          ),
	          _react2['default'].createElement(_TableBody2['default'], {
	            height: this.props.height,
	            maxHeight: this.props.maxHeight,
	            ref: 'body',
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
	        data: result
	      });
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
	        var sizePerPage = this.refs.pagination.getSizePerPage();
	        result = this.store.page(1, sizePerPage).get();
	        this.refs.pagination.changePage(1);
	      } else {
	        result = this.store.get();
	      }
	      this.setState({
	        data: result
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
	    key: 'handleAddRow',
	    value: function handleAddRow(newObj) {
	      var msg = null,
	          result = undefined;
	      try {
	        this.store.add(newObj);
	      } catch (e) {
	        return e;
	      }
	
	      if (this.props.pagination) {
	        //if pagination is enabled and insert row be trigger, change to last page
	        var sizePerPage = this.refs.pagination.getSizePerPage();
	        var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
	        result = this.store.page(currLastPage, sizePerPage).get();
	        this.setState({
	          data: result
	        });
	        this.refs.pagination.changePage(currLastPage);
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
	  }, {
	    key: 'getSizePerPage',
	    value: function getSizePerPage() {
	      if (this.props.pagination) {
	        return this.refs.pagination.getSizePerPage();
	      }
	    }
	  }, {
	    key: 'getCurrentPage',
	    value: function getCurrentPage() {
	      if (this.props.pagination) {
	        return this.refs.pagination.getCurrentPage();
	      }
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
	        var sizePerPage = this.refs.pagination.getSizePerPage();
	        var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
	        var currentPage = this.refs.pagination.getCurrentPage();
	        if (currentPage > currLastPage) currentPage = currLastPage;
	        result = this.store.page(currentPage, sizePerPage).get();
	        this.setState({
	          data: result,
	          selectedRowKeys: this.store.getSelectedRowKeys()
	        });
	        this.refs.pagination.changePage(currentPage);
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
	        var sizePerPage = this.refs.pagination.getSizePerPage();
	        result = this.store.page(1, sizePerPage).get();
	        this.refs.pagination.changePage(1);
	      } else {
	        result = this.store.get();
	      }
	      if (this.props.options.afterColumnFilter) this.props.options.afterColumnFilter(filterObj, this.store.getDataIgnoringPagination());
	      this.setState({
	        data: result
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
	        var sizePerPage = this.refs.pagination.getSizePerPage();
	        result = this.store.page(1, sizePerPage).get();
	        this.refs.pagination.changePage(1);
	      } else {
	        result = this.store.get();
	      }
	      if (this.props.options.afterSearch) this.props.options.afterSearch(searchText, this.store.getDataIgnoringPagination());
	      this.setState({
	        data: result
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
	          { className: 'table-footer-pagination' },
	          _react2['default'].createElement(_paginationPaginationList2['default'], {
	            ref: 'pagination',
	            currPage: this.props.options.page || 1,
	            changePage: this.handlePaginationData.bind(this),
	            sizePerPage: this.props.options.sizePerPage || _Const2['default'].SIZE_PER_PAGE_LIST[0],
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
	          { className: 'tool-bar' },
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
	    afterTableComplete: undefined,
	    afterDeleteRow: undefined,
	    afterInsertRow: undefined,
	    afterSearch: undefined,
	    afterColumnFilter: undefined,
	    onRowClick: undefined,
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
	    this.selectRowColumnWidth = null;
	  }
	
	  _createClass(TableHeader, [{
	    key: 'render',
	    value: function render() {
	      var containerClasses = (0, _classnames2['default'])("table-header");
	      var tableClasses = (0, _classnames2['default'])("table", "table-hover", {
	        "table-bordered": this.props.bordered,
	        "table-condensed": this.props.condensed
	      });
	      var selectRowHeaderCol = this.props.hideSelectColumn ? null : this.renderSelectRowHeader();
	      this._attachClearSortCaretFunc();
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'table-header-wrapper' },
	        _react2['default'].createElement(
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
	        )
	      );
	    }
	  }, {
	    key: 'renderSelectRowHeader',
	    value: function renderSelectRowHeader() {
	      if (this.props.rowSelectType == _Const2['default'].ROW_SELECT_SINGLE) {
	        return _react2['default'].createElement(_SelectRowHeaderColumn2['default'], { width: this.selectRowColumnWidth });
	      } else if (this.props.rowSelectType == _Const2['default'].ROW_SELECT_MULTI) {
	        return _react2['default'].createElement(
	          _SelectRowHeaderColumn2['default'],
	          { width: this.selectRowColumnWidth },
	          _react2['default'].createElement(Checkbox, { onChange: this.props.onSelectAllRow, checked: this.props.isSelectAll })
	        );
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: '_attachClearSortCaretFunc',
	    value: function _attachClearSortCaretFunc() {
	      if (Array.isArray(this.props.children)) {
	        for (var i = 0; i < this.props.children.length; i++) {
	          var field = this.props.children[i].props.dataField;
	          var sort = field === this.props.sortName ? this.props.sortOrder : undefined;
	          this.props.children[i] = _react2['default'].cloneElement(this.props.children[i], { key: i, onSort: this.props.onSort, sort: sort });
	        }
	      } else {
	        var field = this.props.children.props.dataField;
	        var sort = field === this.props.sortName ? this.props.sortOrder : undefined;
	        this.props.children = _react2['default'].cloneElement(this.props.children, { key: 0, onSort: this.props.onSort, sort: sort });
	      }
	    }
	  }, {
	    key: 'fitHeader',
	    value: function fitHeader(headerProps, isVerticalScrollBar) {
	      if (Array.isArray(this.props.children)) {
	        var startPosition = (this.props.rowSelectType == _Const2['default'].ROW_SELECT_SINGLE || this.props.rowSelectType == _Const2['default'].ROW_SELECT_MULTI) && !this.props.hideSelectColumn ? 1 : 0;
	        if (startPosition == 1) this.selectRowColumnWidth = headerProps[0].width;
	        for (var i = 0; i < this.props.children.length; i++) {
	          this.props.children[i] = _react2['default'].cloneElement(this.props.children[i], { width: headerProps[i + startPosition].width + "px" });
	        }
	      } else {
	        this.props.children = _react2['default'].cloneElement(this.props.children, { width: headerProps[0].width + "px" });
	      }
	      if (this.props.condensed && !this.props.isFiltered) {
	        this.refs.container.style.height = "36px";
	      }
	      this.forceUpdate();
	      if (isVerticalScrollBar) this.refs.container.style.marginRight = _util2['default'].getScrollBarWidth() + "px";
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
	  isSelectAll: _react2['default'].PropTypes.oneOf([true, 'indeterminate', false])
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
	
	  renderSortCaret: function renderSortCaret(order) {
	    var wrap = document.createElement("span");
	    wrap.className = "order";
	    if (order == _Const2['default'].SORT_ASC) wrap.className += " dropup";
	    var inner = document.createElement("span");
	    inner.className = "caret";
	    inner.style.margin = "10px 5px";
	    wrap.appendChild(inner);
	    return wrap;
	  },
	
	  renderReactSortCaret: function renderReactSortCaret(order) {
	    var orderClass = (0, _classnames2['default'])("order", {
	      'dropup': order == _Const2['default'].SORT_ASC
	    });
	    return _react2['default'].createElement(
	      'span',
	      { className: orderClass },
	      _react2['default'].createElement('span', { className: 'caret', style: { margin: '10px 5px' } })
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
	      var thStyle = {
	        width: parseInt(this.props.width) ? this.props.width : 35
	      };
	
	      return _react2['default'].createElement(
	        'th',
	        { style: thStyle },
	        _react2['default'].createElement(
	          'div',
	          { className: 'th-inner table-header-column' },
	          this.props.children
	        )
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
	
	var _util = __webpack_require__(7);
	
	var _util2 = _interopRequireDefault(_util);
	
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
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.adjustBody();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.adjustBody();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var containerClasses = (0, _classnames2['default'])("table-container");
	
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
	              style: { textAlign: "center" },
	              className: 'react-bs-table-no-data' },
	            this.props.noDataText || _Const2['default'].NO_DATA_TEXT
	          )
	        ));
	      }
	
	      this.editing = false;
	
	      var height = this.calculateContainerHeight().toString();
	
	      return _react2['default'].createElement(
	        'div',
	        { ref: 'container', className: containerClasses, style: { height: height } },
	        _react2['default'].createElement(
	          'table',
	          { ref: 'body', className: tableClasses },
	          tableHeader,
	          _react2['default'].createElement(
	            'tbody',
	            null,
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
	          width: 35,
	          minWidth: 35
	        };
	        selectRowHeader = this.props.selectRow.hideSelectColumn ? null : _react2['default'].createElement('th', { style: style, key: -1 });
	      }
	      var theader = this.props.columns.map(function (column, i) {
	        var width = column.width == null ? column.width : parseInt(column.width);
	        var style = {
	          display: column.hidden ? "none" : null,
	          width: width,
	          maxWidth: width
	          /** add min-wdth to fix user assign column width not eq offsetWidth in large column table **/
	        };
	        var sortCaert = column.sort ? _util2['default'].renderReactSortCaret(_Const2['default'].SORT_DESC) : null;
	        return _react2['default'].createElement(
	          'th',
	          { style: style, key: i, className: column.className },
	          column.text,
	          sortCaert
	        );
	      });
	
	      return _react2['default'].createElement(
	        'thead',
	        { ref: 'header' },
	        _react2['default'].createElement(
	          'tr',
	          null,
	          selectRowHeader,
	          theader
	        )
	      );
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
	        this.handleSelectRow(e.currentTarget.parentElement.parentElement.rowIndex, e.currentTarget.checked);
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
	          null,
	          _react2['default'].createElement('input', { type: 'radio', name: 'selection', checked: selected, onChange: this.handleSelectRowColumChange.bind(this) })
	        );
	      } else {
	        return _react2['default'].createElement(
	          _TableColumn2['default'],
	          null,
	          _react2['default'].createElement('input', { type: 'checkbox', checked: selected, onChange: this.handleSelectRowColumChange.bind(this) })
	        );
	      }
	    }
	  }, {
	    key: 'getBodyHeaderDomProp',
	    value: function getBodyHeaderDomProp() {
	      var headers = this.refs.header.childNodes[0].childNodes;
	      var headerDomProps = [];
	      for (var i = 0; i < headers.length; i++) {
	        headerDomProps.push({
	          width: headers[i].offsetWidth
	        });
	      }
	      return headerDomProps;
	    }
	  }, {
	    key: 'adjustBody',
	    value: function adjustBody() {
	      this.hardFixHeaderWidth();
	      if (this.props.condensed) {
	        this.refs.body.style.marginTop = "-36px";
	      }
	
	      if (this.props.maxHeight && parseInt(this.props.maxHeight) < this.refs.container.offsetHeight) {
	        this.refs.container.style.height = this.props.maxHeight - 42 + "px";
	      }
	    }
	  }, {
	    key: 'hardFixHeaderWidth',
	    value: function hardFixHeaderWidth() {
	      var headers = this.refs.header.childNodes[0].childNodes;
	      for (var i = 0; i < headers.length; i++) {
	        headers[i].style.width = headers[i].offsetWidth + "px";
	      }
	    }
	  }, {
	    key: 'calculateContainerHeight',
	    value: function calculateContainerHeight() {
	      if (this.props.height == "100%") return this.props.height;else {
	        return parseInt(this.props.height) - 42;
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
	  height: _react2['default'].PropTypes.string,
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
	  noDataText: _react2['default'].PropTypes.string
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
	
	      if (e.target.tagName !== "INPUT") {
	        (function () {
	          var rowIndex = e.currentTarget.rowIndex;
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
	          _extends({}, trCss, { onClick: this.rowClick.bind(this) }),
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
	  onSelectRow: _react2['default'].PropTypes.func
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
	
	      if (typeof children === 'object' && children !== null) {
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
	      this.props.onEdit(e.currentTarget.parentElement.rowIndex, e.currentTarget.cellIndex);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var width = this.props.width == null ? this.props.width : parseInt(this.props.width);
	      var tdStyle = {
	        textAlign: this.props.dataAlign,
	        display: this.props.hidden ? "none" : null,
	        width: width,
	        maxWidth: width
	      };
	      var classname = this.props.className;
	      if (this.props.width) {
	        classname += " col-md-" + width;
	      }
	
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
	        _extends({ style: tdStyle, className: classname }, opts),
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
	
	  function PaginationList(props) {
	    _classCallCheck(this, PaginationList);
	
	    _get(Object.getPrototypeOf(PaginationList.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      currentPage: this.props.currPage,
	      sizePerPage: this.props.sizePerPage
	    };
	  }
	
	  _createClass(PaginationList, [{
	    key: 'changePage',
	    value: function changePage(page) {
	      if (page == this.props.prePage) {
	        page = this.state.currentPage - 1 < 1 ? 1 : this.state.currentPage - 1;
	      } else if (page == this.props.nextPage) {
	        page = this.state.currentPage + 1 > this.totalPages ? this.totalPages : this.state.currentPage + 1;
	      } else if (page == this.props.lastPage) {
	        page = this.totalPages;
	      } else if (page == this.props.firstPage) {
	        page = 1;
	      } else {
	        page = parseInt(page);
	      }
	
	      if (page != this.state.currentPage) {
	        this.setState({ currentPage: page });
	        this.props.changePage(page, this.state.sizePerPage);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.remote) {
	        if (nextProps.currPage || nextProps.sizePerPage) {
	          this.setState({
	            currentPage: nextProps.currPage,
	            sizePerPage: nextProps.sizePerPage
	          });
	        }
	      }
	    }
	  }, {
	    key: 'changeSizePerPage',
	    value: function changeSizePerPage(e) {
	      e.preventDefault();
	
	      var selectSize = parseInt(e.currentTarget.text);
	      if (selectSize != this.state.sizePerPage) {
	        this.totalPages = Math.ceil(this.props.dataSize / selectSize);
	        if (this.state.currentPage > this.totalPages) this.state.currentPage = this.totalPages;
	
	        this.setState({
	          sizePerPage: selectSize,
	          currentPage: this.state.currentPage
	        });
	        this.props.changePage(this.state.currentPage, selectSize);
	        if (this.props.onSizePerPageList) {
	          this.props.onSizePerPageList(selectSize);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      this.totalPages = Math.ceil(this.props.dataSize / this.state.sizePerPage);
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
	        _react2['default'].createElement(
	          'div',
	          { className: 'col-md-6' },
	          this.props.sizePerPageList.length > 1 ? _react2['default'].createElement(
	            'div',
	            { className: 'dropdown' },
	            _react2['default'].createElement(
	              'button',
	              { className: 'btn btn-default dropdown-toggle', type: 'button', id: 'pageDropDown', 'data-toggle': 'dropdown',
	                'aria-expanded': 'true' },
	              this.state.sizePerPage,
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
	          ) : ""
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
	      );
	    }
	  }, {
	    key: 'makePage',
	    value: function makePage() {
	      var pages = this.getPages();
	      return pages.map(function (page) {
	        var isActive = page === this.state.currentPage;
	        var disabled = false;
	        var hidden = false;
	        if (this.state.currentPage == 1 && (page === this.props.firstPage || page === this.props.prePage)) {
	          disabled = true;
	          hidden = true;
	        }
	        if (this.state.currentPage == this.totalPages && (page === this.props.nextPage || page === this.props.lastPage)) {
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
	
	      startPage = Math.max(this.state.currentPage - Math.floor(this.props.paginationSize / 2), 1);
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
	  }, {
	    key: 'getCurrentPage',
	    value: function getCurrentPage() {
	      return this.state.currentPage;
	    }
	  }, {
	    key: 'getSizePerPage',
	    value: function getSizePerPage() {
	      return this.state.sizePerPage;
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
	      this.props.changePage(e.currentTarget.text);
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
	      var modalClassName = "bs-table-modal-sm" + new Date().getTime();
	      var insertBtn = this.props.enableInsert ? _react2['default'].createElement(
	        'button',
	        { type: 'button', onClick: this.props.onAddRowBegin, className: 'btn btn-info react-bs-table-add-btn', 'data-toggle': 'modal', 'data-target': '.' + modalClassName },
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
	
	      var modal = this.props.enableInsert ? this.renderInsertRowModal(modalClassName) : null;
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
	        var classNames = 'form-group form-group-sm';
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
	          classNames = 'form-group form-group-sm input-group input-group-sm';
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
	    value: function renderInsertRowModal(modalClassName) {
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
	      var modalClass = (0, _classnames2['default'])("modal", "fade", modalClassName, {
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
	      return sortFunc(a, b, order);
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
	              default:
	                {
	                  filterVal = typeof filterObj[key].value === "string" ? filterObj[key].value.toLowerCase() : filterObj[key].value;
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
	  }, {
	    key: 'search',
	    value: function search(searchText) {
	      var _this3 = this;
	
	      if (searchText.trim() === "") {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.searchText = null;
	      } else {
	        this.searchText = searchText;
	        var searchTextArray = [];
	        this.filteredData = this.data.filter(function (row) {
	          var valid = false;
	
	          if (_this3.multiColumnSearch) {
	            searchTextArray = searchText.split(' ');
	          } else {
	            searchTextArray.push(searchText);
	          }
	
	          for (var key in row) {
	            if (_this3.colInfos[key] && row[key]) {
	              searchTextArray.forEach(function (text) {
	                var filterVal = text.toLowerCase();
	                var targetVal = row[key];
	                var _colInfos$key2 = _this3.colInfos[key];
	                var format = _colInfos$key2.format;
	                var filterFormatted = _colInfos$key2.filterFormatted;
	                var formatExtraData = _colInfos$key2.formatExtraData;
	                var hidden = _colInfos$key2.hidden;
	
	                if (!hidden) {
	                  if (filterFormatted && format) {
	                    targetVal = format(targetVal, row, formatExtraData);
	                  }
	                  if (targetVal.toString().toLowerCase().indexOf(filterVal) !== -1) {
	                    valid = true;
	                  }
	                }
	              });
	              if (valid) break;
	            }
	          }
	          return valid;
	        });
	        this.isOnFilter = true;
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
	
	var _filtersSelect = __webpack_require__(44);
	
	var _filtersSelect2 = _interopRequireDefault(_filtersSelect);
	
	var _filtersNumber = __webpack_require__(45);
	
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
	      this.refs.innerDiv.setAttribute("data-field", this.props.dataField);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var width = this.props.width !== null ? parseInt(this.props.width) : null;
	      var thStyle = {
	        textAlign: this.props.dataAlign,
	        display: this.props.hidden ? "none" : null,
	        width: width,
	        maxWidth: width
	      };
	
	      var defaultCaret = !this.props.dataSort ? null : _react2['default'].createElement(
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
	      var sortCaret = this.props.sort ? _util2['default'].renderReactSortCaret(this.props.sort) : defaultCaret;
	
	      var classes = this.props.className + " " + (this.props.dataSort ? "sort-column" : "");
	      return _react2['default'].createElement(
	        'th',
	        { ref: 'header-col', className: classes, style: thStyle },
	        _react2['default'].createElement(
	          'div',
	          { ref: 'innerDiv', className: 'th-inner table-header-column',
	            onClick: this.handleColumnClick.bind(this) },
	          this.props.children,
	          sortCaret
	        ),
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
	  })
	};
	
	TableHeaderColumn.defaultProps = {
	  dataAlign: "left",
	  dataSort: false,
	  dataFormat: undefined,
	  isKey: false,
	  editable: true,
	  onSort: undefined,
	  hidden: false,
	  className: "",
	  width: null,
	  sortFunc: undefined,
	  columnClassName: '',
	  filterFormatted: false,
	  sort: undefined,
	  formatExtraData: undefined,
	  filter: undefined
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
	
	var legalComparators = ["=", ">", ">=", "<", "<=", "!="];
	
	var NumberFilter = (function (_React$Component) {
	    _inherits(NumberFilter, _React$Component);
	
	    function NumberFilter(props) {
	        _classCallCheck(this, NumberFilter);
	
	        _get(Object.getPrototypeOf(NumberFilter.prototype), 'constructor', this).call(this, props);
	        this.numberComparators = this.props.numberComparators || legalComparators;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwODg0MDE5NDA5ZTJhMTkzNzA5YyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlSGVhZGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdERPTVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RSb3dIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVSb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQ29sdW1uLmpzIiwid2VicGFjazovLy8uL3NyYy9UYWJsZUVkaXRDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvYW5pbWF0aW9uTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9DU1NDb3JlLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy90b29sYmFyL1Rvb2xCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbGVzYXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbHRlcnMvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9UZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9OdW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7MkNDdEMyQixDQUFrQjs7Ozs4Q0FDZixFQUFxQjs7OztnREFDeEIsRUFBd0I7O0FBRW5ELEtBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQy9CLFNBQU0sQ0FBQyxjQUFjLDhCQUFpQixDQUFDO0FBQ3ZDLFNBQU0sQ0FBQyxpQkFBaUIsaUNBQW9CLENBQUM7QUFDN0MsU0FBTSxDQUFDLFlBQVksb0NBQWUsQ0FBQztFQUNwQztzQkFDYztBQUNiLGlCQUFjO0FBQ2Qsb0JBQWlCO0FBQ2pCLGVBQVk7RUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDYmlCLENBQU87Ozs7dUNBQ0osQ0FBWTs7OztrQ0FDZixDQUFTOzs7O3dDQUNILENBQWU7Ozs7c0NBQ2pCLENBQWE7Ozs7cURBQ1IsRUFBNkI7Ozs7MkNBQ3BDLEVBQW1COzs7O3dDQUNmLEVBQWU7Ozs7Z0RBQ1YsRUFBd0I7OzRDQUMvQixFQUFtQjs7OzttQ0FDcEIsRUFBVTs7S0FFekIsY0FBYzthQUFkLGNBQWM7O0FBRVAsWUFGUCxjQUFjLENBRU4sS0FBSyxFQUFFOzs7MkJBRmYsY0FBYzs7QUFHaEIsZ0NBSEUsY0FBYyw2Q0FHVixLQUFLLEVBQUU7O1VBNm1CZixhQUFhLEdBQUcsVUFBQyxDQUFDLEVBQUs7QUFDckIsYUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO01BQ3pFOztVQUVELGtCQUFrQixHQUFHLFlBQU07QUFDekIsV0FBSSxjQUFjLEdBQUcsTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLFdBQUksWUFBWSxHQUFHLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxXQUFHLGNBQWMsQ0FBQyxXQUFXLEtBQUssWUFBWSxDQUFDLFdBQVcsRUFBQztBQUN6RCx1QkFBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDOUQ7QUFDRCxXQUFNLFdBQVcsR0FBRyxNQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztBQUMxRCxhQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFDcEMsTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO01BQzVGOztBQXhuQkMsU0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7O0FBRTNCLFNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkMsV0FBSSxDQUFDLEtBQUssR0FBRyx3Q0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUMzRCxXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSSxFQUFLO0FBQ3JDLGVBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixlQUFLLFFBQVEsQ0FBQztBQUNaLGVBQUksRUFBRSxNQUFLLFlBQVksRUFBRTtVQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO01BQ0osTUFBTTtBQUNMLFdBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25DLFdBQUksQ0FBQyxLQUFLLEdBQUcsd0NBQW1CLElBQUksQ0FBQyxDQUFDO01BQ3ZDOztBQUVELFNBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUzQixTQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7O0FBQ2YsYUFBTSxJQUFJLFFBQU8sQ0FBQztBQUNsQixlQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxhQUFhLEVBQUs7QUFDbEQsZUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1VBQ3RDLENBQUMsQ0FBQzs7TUFDSjs7QUFFRCxTQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtBQUN6RCxXQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDakQsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNwQzs7QUFFRCxTQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsV0FBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDekIsc0JBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFO01BQ2pELENBQUM7SUFDSDs7Z0JBdkNHLGNBQWM7O1lBeUNULG1CQUFDLEtBQUssRUFBQzs7O1dBQ1QsUUFBUSxHQUFJLEtBQUssQ0FBakIsUUFBUTs7QUFFYixXQUFNLGlCQUFpQixHQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQzFFLDBCQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxnQkFBTSxFQUFHO0FBQzlDLGFBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDdEIsZUFBSSxRQUFRLEVBQUU7QUFDWixtQkFBTSw4REFBOEQsQ0FBQztZQUN0RTtBQUNELG1CQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7VUFDbkM7QUFDRCxhQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFOztBQUV2QixlQUFJLENBQUMsT0FBSyxNQUFNLEVBQUU7O0FBRWhCLG9CQUFLLE1BQU0sR0FBRyxvQkFBWSxDQUFDO1lBQzVCOztBQUVELGlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBSyxNQUFNLENBQUM7VUFDM0M7UUFDRixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFNO0FBQ3hFLGFBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLGdCQUFPLElBQUksQ0FBQztRQUNiLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRVAsV0FBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsUUFBUSxFQUNqQyxpSkFDMEU7O0FBRTVFLFdBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQ2xCLHFCQUFZLEVBQUUsS0FBSyxDQUFDLFVBQVU7QUFDOUIsaUJBQVEsRUFBRSxRQUFRO0FBQ2xCLGlCQUFRLEVBQUUsUUFBUTtBQUNsQiwwQkFBaUIsRUFBRSxLQUFLLENBQUMsaUJBQWlCO0FBQzFDLGVBQU0sRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDbEMsQ0FBQyxDQUFDO01BQ0o7OztZQUVXLHdCQUFHO0FBQ1osV0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFN0UsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUN6QixhQUFJLElBQUk7YUFBRSxXQUFXLGFBQUM7QUFDdEIsYUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFO0FBQzlCLHNCQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDcEQsZUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1VBQzlDLE1BQU07QUFDTCxzQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxtQkFBTSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RSxlQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztVQUNyQztBQUNELGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkQsTUFBTTtBQUNMLGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCO0FBQ0QsY0FBTyxNQUFNLENBQUM7TUFDaEI7OztZQUVvQiwrQkFBQyxJQUFZLEVBQUU7V0FBWixRQUFRLEdBQVYsSUFBWSxDQUFWLFFBQVE7O0FBQzlCLGNBQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUs7QUFDakMsZ0JBQU87QUFDTCxlQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQzVCLGdCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQzdCLGVBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDM0IsaUJBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDL0IsMEJBQWUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDN0MsMEJBQWUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDN0MsbUJBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDL0IsaUJBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07QUFDM0Isb0JBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDdkMsZ0JBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDekIsZUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUMzQixtQkFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUMvQixnQkFBSyxFQUFFLENBQUM7VUFDVCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO01BQ0o7OztZQUV3QixtQ0FBQyxTQUFTLEVBQUU7QUFDbkMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQixXQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2pDLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMzQyxhQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUN6QyxhQUFJLElBQUksR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUMxRixhQUFJLFdBQVcsR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLG1CQUFNLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVsSSxhQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7QUFDbkUsYUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN4QyxhQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQztBQUMxRixhQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQztBQUN2RixhQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pFLGFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwRCxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLElBQUk7VUFDWCxDQUFDLENBQUM7UUFDSjtBQUNELFdBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7QUFFdkQsYUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEQsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osMEJBQWUsRUFBRSxJQUFJO1VBQ3RCLENBQUMsQ0FBQztRQUNKO01BQ0Y7OztZQUVnQiw2QkFBRztBQUNsQixXQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUMxQixhQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztNQUM5RTs7O1lBRW1CLGdDQUFHO0FBQ3JCLGFBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDOUQsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hGLFdBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNmLGFBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRDtNQUNGOzs7WUFFaUIsOEJBQUc7QUFDbkIsV0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDMUIsV0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDM0IsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztNQUMzQzs7O1lBRWtCLCtCQUFHO0FBQ3BCLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdkIsYUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEUsYUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssbUJBQU0sY0FBYyxFQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzlDO01BQ0Y7Ozs7Ozs7Ozs7O1lBU2lCLDRCQUFDLEtBQUssRUFBRTtBQUN4QixjQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO01BQ3JDOzs7WUFFSyxrQkFBRzs7QUFFUCxXQUFJLFVBQVUsR0FBRyw2QkFBUyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVDLFdBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQ3BDLFdBQUksS0FBSyxHQUFHO0FBQ1YsZUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtBQUN6QixrQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztRQUNoQyxDQUFDO0FBQ0YsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN2QyxrQkFBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQztBQUNELFdBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckQsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN4QyxXQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN6QyxXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDbkMsV0FBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELFdBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNyQyxjQUNFOztXQUFLLFNBQVMsRUFBQyxvQkFBb0IsRUFBQyxHQUFHLEVBQUMsT0FBTztTQUM1QyxPQUFPO1NBQ1I7O2FBQUssU0FBUyxFQUFDLDBCQUEwQixFQUFDLEtBQUssRUFBRSxLQUFNO1dBQ3JEOzs7QUFDRSxrQkFBRyxFQUFDLFFBQVE7QUFDWiw0QkFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUs7QUFDekMsK0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWlCO0FBQ3hELHVCQUFRLEVBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBVTtBQUNwRCx3QkFBUyxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLFNBQVU7QUFDakQscUJBQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDbkMsNkJBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUNuRCx1QkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztBQUM5Qix3QkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVTtBQUNoQyx5QkFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEtBQU07QUFDdkMsMEJBQVcsRUFBRSxXQUFZO2FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNSO1dBQ2Q7QUFDRSxtQkFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTztBQUMxQixzQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVTtBQUNoQyxnQkFBRyxFQUFDLE1BQU07QUFDVixpQkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSztBQUN0QixvQkFBTyxFQUFFLE9BQVE7QUFDakIsd0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVk7QUFDcEMsb0JBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVE7QUFDNUIscUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVM7QUFDOUIsa0JBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU07QUFDeEIscUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRztBQUNuQyxzQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVTtBQUNoQyxzQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVTtBQUNoQyxxQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztBQUM5Qiw0QkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZ0I7QUFDNUMsdUJBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDM0Msd0JBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDN0MsdUJBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFXO2FBQzFDO1VBQ0U7U0FDTCxXQUFXO1NBQ1gsVUFBVTtRQUNQLENBQ1A7TUFDRjs7O1lBRVUsdUJBQUU7QUFDWCxXQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUMzRCxXQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQzNDLFdBQUcsb0JBQW9CLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUM7QUFDbkQsZ0JBQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3BFLE1BQU07QUFDTCxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFFWSx5QkFBRztBQUNkLFdBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakMsV0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLHdCQUFlLEVBQUUsRUFBRTtRQUNwQixDQUFDLENBQUM7TUFDSjs7O1lBRVMsb0JBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtBQUMzQixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtBQUNuQyxhQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0Q7O0FBRUQsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JELFdBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixhQUFJLEVBQUUsTUFBTTtRQUNiLENBQUMsQ0FBQztNQUNKOzs7WUFFbUIsOEJBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtXQUMvQixZQUFZLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQWxDLFlBQVk7O0FBQ25CLFdBQUksWUFBWSxFQUFFO0FBQ2hCLHFCQUFZLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDOztBQUVELFdBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7QUFDN0IsZ0JBQU87UUFDUjs7QUFFRCxXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEQsV0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGFBQUksRUFBRSxNQUFNO1FBQ2IsQ0FBQyxDQUFDO01BQ0o7OztZQUVhLHdCQUFDLEdBQUcsRUFBRTtBQUNsQixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNqQyxhQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEM7TUFDRjs7O1lBRWlCLDRCQUFDLENBQUMsRUFBRTtBQUNwQixXQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUN6QyxXQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDekIsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO0FBQ3BDLGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUNsRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2Qzs7QUFFRCxXQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO0FBQ3JELGFBQUksVUFBVSxFQUFFO0FBQ2QsMEJBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1VBQzdDOztBQUVELGFBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUMsYUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLDBCQUFlLEVBQUUsZUFBZTtVQUNqQyxDQUFDLENBQUM7UUFDSjtNQUNGOzs7WUFFcUIsa0NBQUc7QUFDdkIsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQy9CLFdBQUksTUFBTSxhQUFDO0FBQ1gsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUN6QixhQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RCxlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9DLGFBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNO0FBQ0wsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0I7QUFDRCxXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBSSxFQUFFLE1BQU07UUFDYixDQUFDLENBQUM7TUFDSjs7O1lBRWMseUJBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUMvQixXQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDbkQsV0FBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUMzQyxXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDakMsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekQ7O0FBRUQsV0FBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtBQUNyRCxhQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxtQkFBTSxpQkFBaUIsRUFBRTtBQUN6RCx1QkFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7VUFDMUMsTUFBTTtBQUNMLGVBQUksVUFBVSxFQUFFO0FBQ2QseUJBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsTUFBTTtBQUNMLHlCQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNoRCxzQkFBTyxNQUFNLEtBQUssR0FBRyxDQUFDO2NBQ3ZCLENBQUMsQ0FBQztZQUNKO1VBQ0Y7O0FBRUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osMEJBQWUsRUFBRSxZQUFZO1VBQzlCLENBQUMsQ0FBQztRQUNKO01BQ0Y7OztZQUVhLHdCQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQ3pDLFdBQUksU0FBUyxhQUFDO0FBQ2QsMEJBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDL0QsYUFBSSxDQUFDLElBQUksUUFBUSxFQUFFO0FBQ2pCLG9CQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDbkMsa0JBQU8sS0FBSyxDQUFDO1VBQ2Q7UUFDRixDQUFDLENBQUM7O0FBRUgsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNoRSxXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBSSxFQUFFLE1BQU07UUFDYixDQUFDLENBQUM7O0FBRUgsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7QUFDckMsYUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRjtNQUNGOzs7WUFFZ0IsNkJBQUc7QUFDbEIsV0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTs7UUFFbkI7TUFDRjs7O1lBRVcsc0JBQUMsTUFBTSxFQUFFO0FBQ25CLFdBQUksR0FBRyxHQUFHLElBQUk7V0FBRSxNQUFNLGFBQUM7QUFDdkIsV0FBSTtBQUNGLGFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDVixnQkFBTyxDQUFDLENBQUM7UUFDVjs7QUFFRCxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFOztBQUV6QixhQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RCxhQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUM7QUFDcEUsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxRCxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLE1BQU07VUFDYixDQUFDLENBQUM7QUFDSCxhQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsTUFBTTtBQUNMLGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixlQUFJLEVBQUUsTUFBTTtVQUNiLENBQUMsQ0FBQztRQUNKOztBQUVELFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO0FBQ3JDLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQztNQUNGOzs7WUFFYSwwQkFBRztBQUNmLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDekIsZ0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDOUM7TUFDRjs7O1lBRWEsMEJBQUc7QUFDZixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3pCLGdCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlDO01BQ0Y7OztZQUVZLHVCQUFDLE9BQU8sRUFBRTtBQUNyQixXQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsV0FBSSxXQUFXLEdBQUcsT0FBTyxHQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7O0FBRWxFLFdBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3pDLGFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUM7QUFDNUMsZUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQ3ZDLFlBQVU7QUFDUixpQkFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixDQUNGLENBQUM7VUFDSCxNQUFNLElBQUksT0FBTyxDQUFDLDJCQUEyQixDQUFDLEVBQUU7QUFDL0MsZUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztVQUM3QjtRQUNGO01BQ0Y7OztZQUVRLG1CQUFDLFdBQVcsRUFBQzs7QUFFcEIsV0FBSSxNQUFNLGFBQUM7QUFDWCxXQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvQixXQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUVqQyxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3pCLGFBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3hELGFBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQztBQUNwRSxhQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RCxhQUFJLFdBQVcsR0FBRyxZQUFZLEVBQzVCLFdBQVcsR0FBRyxZQUFZLENBQUM7QUFDN0IsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN6RCxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLE1BQU07QUFDWiwwQkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7VUFDakQsQ0FBQyxDQUFDO0FBQ0gsYUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLE1BQU07QUFDTCxlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLE1BQU07QUFDWiwwQkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7VUFDakQsQ0FBQyxDQUFDO1FBQ0o7QUFDRCxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtBQUNyQyxhQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQ7TUFFRjs7O1lBRWUsMEJBQUMsU0FBUyxFQUFFO0FBQzFCLFdBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLFdBQUksTUFBTSxhQUFDO0FBQ1gsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUN6QixhQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RCxlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9DLGFBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNO0FBQ0wsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0I7QUFDRCxXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLFdBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixhQUFJLEVBQUUsTUFBTTtRQUNiLENBQUMsQ0FBQztNQUNKOzs7WUFFYywyQkFBRztBQUNoQixXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLENBQUM7QUFDcEQsV0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVMsTUFBTSxFQUFFO0FBQ3ZDLGFBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO0FBQ2pDLGVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztVQUNuQztRQUNGLENBQUMsQ0FBQztBQUNILHlDQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztNQUNqRDs7O1lBRVcsc0JBQUMsVUFBVSxFQUFFO0FBQ3ZCLFdBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlCLFdBQUksTUFBTSxhQUFDO0FBQ1gsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUN6QixhQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RCxlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9DLGFBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNO0FBQ0wsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0I7QUFDRCxXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztBQUNyRixXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBSSxFQUFFLE1BQU07UUFDYixDQUFDLENBQUM7TUFDSjs7O1lBRWUsNEJBQUc7QUFDakIsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUN6QixhQUFJLFFBQVEsYUFBQztBQUNiLGFBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7QUFDN0IsbUJBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7VUFDL0MsTUFBTTtBQUNMLG1CQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztVQUNwQztBQUNELGdCQUNFOzthQUFLLFNBQVMsRUFBQyx5QkFBeUI7V0FDdEM7QUFDRSxnQkFBRyxFQUFDLFlBQVk7QUFDaEIscUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBRTtBQUN2Qyx1QkFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ2pELHdCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLG1CQUFNLGtCQUFrQixDQUFDLENBQUMsQ0FBRTtBQUMzRSw0QkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxtQkFBTSxrQkFBbUI7QUFDaEYsMkJBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksbUJBQU0sZUFBZ0I7QUFDM0UsbUJBQU0sRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUc7QUFDbEMscUJBQVEsRUFBRSxRQUFTO0FBQ25CLDhCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFrQjtBQUN4RCxvQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxtQkFBTSxRQUFTO0FBQ3RELHFCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1CQUFNLFNBQVU7QUFDekQsc0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksbUJBQU0sVUFBVztBQUM1RCxxQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxtQkFBTSxTQUFVO2FBQ3pEO1VBQ0UsQ0FDTjtRQUNIO0FBQ0QsY0FBTyxJQUFJLENBQUM7TUFDYjs7O1lBRVkseUJBQUc7QUFDZCxXQUFJLHNCQUFzQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO0FBQzNGLFdBQUksc0JBQXNCLElBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzNCLGFBQUksT0FBTyxhQUFDO0FBQ1osYUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDdEMsa0JBQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUU7QUFDbEQsaUJBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDekIsb0JBQU87QUFDTCxtQkFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ3BCLG9CQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVM7O0FBRXRCLHdCQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLOztBQUVuQyx1QkFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUssT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVE7QUFDdEcscUJBQU0sRUFBRSxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFDO0FBQ3hDLHdCQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEYsR0FBRyxLQUFLO2NBQ1YsQ0FBQztZQUNILENBQUMsQ0FBQztVQUNKLE1BQU07QUFDTCxrQkFBTyxHQUFHLENBQUM7QUFDVCxpQkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ3hDLGtCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDMUMscUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUM3QyxDQUFDLENBQUM7VUFDSjtBQUNELGdCQUNFOzthQUFLLFNBQVMsRUFBQyxVQUFVO1dBQ3ZCO0FBQ0Usd0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFZO0FBQzVDLHlCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFVO0FBQ25DLHlCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFVO0FBQ25DLHlCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPO0FBQ2hDLDRCQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFVO0FBQ3RDLG1DQUFzQixFQUFFLHNCQUF1QjtBQUMvQyxvQkFBTyxFQUFFLE9BQVE7QUFDakIsOEJBQWlCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBa0I7QUFDaEQscUJBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDdkMsMEJBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUNqRCxzQkFBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUN6QyxxQkFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUN2Qyx3QkFBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUM3QywrQkFBa0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTthQUMzRDtVQUNFLENBQ1A7UUFDRixNQUFNO0FBQ0wsZ0JBQU8sSUFBSSxDQUFDO1FBQ2I7TUFDRjs7O1lBRWdCLDJCQUFDLE9BQU8sRUFBRTtBQUN6QixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQzNCLGdCQUNFLDZEQUFhLE9BQU8sRUFBRSxPQUFRO0FBQ2pCLHdCQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSztBQUN6QyxtQkFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQUUsQ0FDMUQ7UUFDSCxNQUFNO0FBQ0wsZ0JBQU8sSUFBSSxDQUFDO1FBQ2I7TUFDRjs7O1VBOW1CRyxjQUFjO0lBQVMsbUJBQU0sU0FBUzs7QUFnb0I1QyxlQUFjLENBQUMsU0FBUyxHQUFHO0FBQ3pCLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDOUIsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLE9BQUksRUFBRSxtQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQU0sU0FBUyxDQUFDLEtBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEYsU0FBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLFVBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM3QixXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsUUFBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzNCLFlBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixhQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsb0JBQWlCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDekMsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDL0IsU0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDMUIsbUJBQU0sZUFBZSxFQUNyQixtQkFBTSxpQkFBaUIsRUFDdkIsbUJBQU0sZ0JBQWdCLENBQ3ZCLENBQUM7QUFDRixZQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDL0IsYUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQy9CLGFBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixnQkFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2pDLGtCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMscUJBQWdCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDdEMsNkJBQXdCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUMscUJBQWdCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7SUFDdkMsQ0FBQztBQUNGLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQzlCLFNBQUksRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsa0JBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtJQUNwQyxDQUFDO0FBQ0YsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLFlBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsZUFBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsR0FBRztBQUNoQyxVQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUM3QixnQkFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2pDLGFBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxjQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsdUJBQWtCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDeEMsbUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxtQkFBYyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLGdCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsc0JBQWlCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDdkMsZUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFNBQUksRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixvQkFBZSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQ3RDLGdCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDbkMsbUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN0QyxpQkFBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLGlCQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsc0JBQWlCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDdkMsZUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLDJCQUFzQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVDLFlBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUMvQixhQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsY0FBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLGFBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtJQUNqQyxDQUFDO0FBQ0YsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDL0Isa0JBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtJQUN0QyxDQUFDO0FBQ0YsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtFQUNwQyxDQUFDO0FBQ0YsZUFBYyxDQUFDLFlBQVksR0FBRztBQUM1QixTQUFNLEVBQUUsTUFBTTtBQUNkLFlBQVMsRUFBRSxTQUFTO0FBQ3BCLFVBQU8sRUFBRSxLQUFLO0FBQ2QsV0FBUSxFQUFFLElBQUk7QUFDZCxRQUFLLEVBQUUsS0FBSztBQUNaLFlBQVMsRUFBRSxLQUFLO0FBQ2hCLGFBQVUsRUFBRSxLQUFLO0FBQ2pCLG9CQUFpQixFQUFFLFNBQVM7QUFDNUIsWUFBUyxFQUFFO0FBQ1QsU0FBSSxFQUFFLG1CQUFNLGVBQWU7QUFDM0IsWUFBTyxFQUFFLG1CQUFNLG1CQUFtQjtBQUNsQyxhQUFRLEVBQUUsRUFBRTtBQUNaLGFBQVEsRUFBRSxTQUFTO0FBQ25CLGdCQUFXLEVBQUUsU0FBUztBQUN0QixrQkFBYSxFQUFFLEtBQUs7QUFDcEIscUJBQWdCLEVBQUUsS0FBSztBQUN2Qiw2QkFBd0IsRUFBRSxLQUFLO0FBQy9CLHFCQUFnQixFQUFFLEtBQUs7SUFDeEI7QUFDRCxXQUFRLEVBQUU7QUFDUixTQUFJLEVBQUUsbUJBQU0sY0FBYztBQUMxQixlQUFVLEVBQUUsS0FBSztBQUNqQixrQkFBYSxFQUFFLFNBQVM7SUFDekI7QUFDRCxZQUFTLEVBQUUsS0FBSztBQUNoQixZQUFTLEVBQUUsS0FBSztBQUNoQixTQUFNLEVBQUUsS0FBSztBQUNiLG9CQUFpQixFQUFFLEtBQUs7QUFDeEIsZUFBWSxFQUFFLEtBQUs7QUFDbkIsY0FBVyxFQUFFLEVBQUU7QUFDZixVQUFPLEVBQUU7QUFDUCxnQkFBVyxFQUFFLEtBQUs7QUFDbEIsYUFBUSxFQUFFLFNBQVM7QUFDbkIsY0FBUyxFQUFFLFNBQVM7QUFDcEIsdUJBQWtCLEVBQUUsU0FBUztBQUM3QixtQkFBYyxFQUFFLFNBQVM7QUFDekIsbUJBQWMsRUFBRSxTQUFTO0FBQ3pCLGdCQUFXLEVBQUUsU0FBUztBQUN0QixzQkFBaUIsRUFBRSxTQUFTO0FBQzVCLGVBQVUsRUFBRSxTQUFTO0FBQ3JCLFNBQUksRUFBRSxTQUFTO0FBQ2Ysb0JBQWUsRUFBRSxtQkFBTSxrQkFBa0I7QUFDekMsZ0JBQVcsRUFBRSxTQUFTO0FBQ3RCLG1CQUFjLEVBQUUsbUJBQU0sZUFBZTtBQUNyQyxzQkFBaUIsRUFBRSxTQUFTO0FBQzVCLGVBQVUsRUFBRSxTQUFTO0FBQ3JCLDJCQUFzQixFQUFFLFNBQVM7QUFDakMsWUFBTyxFQUFFLG1CQUFNLFFBQVE7QUFDdkIsYUFBUSxFQUFFLG1CQUFNLFNBQVM7QUFDekIsY0FBUyxFQUFFLG1CQUFNLFVBQVU7QUFDM0IsYUFBUSxFQUFFLG1CQUFNLFNBQVM7SUFDMUI7QUFDRCxZQUFTLEVBQUU7QUFDVCxrQkFBYSxFQUFFLENBQUM7SUFDakI7QUFDRCxZQUFTLEVBQUUsS0FBSztBQUNoQixjQUFXLEVBQUUsU0FBUztFQUN2QixDQUFDOztzQkFFYSxjQUFjOzs7Ozs7O0FDM3dCN0IsZ0Q7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFnQjs7QUFFaEI7QUFDQTs7QUFFQSxrQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7Ozs7O3NCQy9DYztBQUNiLFlBQVMsRUFBRSxNQUFNO0FBQ2pCLFdBQVEsRUFBRSxLQUFLO0FBQ2YsZ0JBQWEsRUFBRSxFQUFFO0FBQ2pCLFlBQVMsRUFBRSxHQUFHO0FBQ2QsWUFBUyxFQUFFLElBQUk7QUFDZixXQUFRLEVBQUUsR0FBRztBQUNiLGFBQVUsRUFBRSxJQUFJO0FBQ2hCLHNCQUFtQixFQUFFLEVBQUU7QUFDdkIsa0JBQWUsRUFBRSxNQUFNO0FBQ3ZCLG9CQUFpQixFQUFFLE9BQU87QUFDMUIsbUJBQWdCLEVBQUUsVUFBVTtBQUM1QixpQkFBYyxFQUFFLE1BQU07QUFDdEIsa0JBQWUsRUFBRSxPQUFPO0FBQ3hCLG9CQUFpQixFQUFFLFNBQVM7QUFDNUIscUJBQWtCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDcEMsa0JBQWUsRUFBRSxDQUFDO0FBQ2xCLGVBQVksRUFBRSw2QkFBNkI7QUFDM0MsbUJBQWdCLEVBQUUsb0JBQW9CO0FBQ3RDLFdBQVEsRUFBRSxVQUFVO0FBQ3BCLGVBQVksRUFBRSxHQUFHO0FBQ2pCLGNBQVcsRUFBRTtBQUNYLFNBQUksRUFBRSxZQUFZO0FBQ2xCLFdBQU0sRUFBRSxjQUFjO0FBQ3RCLFdBQU0sRUFBRSxjQUFjO0FBQ3RCLFNBQUksRUFBRSxZQUFZO0FBQ2xCLFdBQU0sRUFBRSxjQUFjO0lBQ3ZCO0VBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQzVCaUIsQ0FBTzs7OztxQ0FDSixDQUFXOzs7O2tDQUNkLENBQVM7Ozs7aUNBQ1YsQ0FBUTs7Ozt1Q0FDSixDQUFZOzs7O2tEQUNDLENBQXlCOzs7O0tBRXJELFFBQVE7YUFBUixRQUFROztZQUFSLFFBQVE7MkJBQVIsUUFBUTs7Z0NBQVIsUUFBUTs7O2dCQUFSLFFBQVE7O1lBQ0ssNkJBQUc7QUFBRSxXQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7TUFBRTs7O1lBQy9CLG1DQUFDLEtBQUssRUFBRTtBQUFFLFdBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQUU7OztZQUMxRCxnQkFBQyxPQUFPLEVBQUU7QUFDZCw2QkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxHQUFHLE9BQU8sS0FBSyxlQUFlLENBQUM7TUFDeEU7OztZQUVLLGtCQUFHO0FBQ1AsY0FBTyw0Q0FBTyxTQUFTLEVBQUMscUJBQXFCLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxHQUFHO01BQzdIOzs7VUFURyxRQUFRO0lBQVMsbUJBQU0sU0FBUzs7S0FZaEMsV0FBVzthQUFYLFdBQVc7O0FBRUosWUFGUCxXQUFXLENBRUgsS0FBSyxFQUFFOzJCQUZmLFdBQVc7O0FBR2IsZ0NBSEUsV0FBVyw2Q0FHUCxLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDOztnQkFMRyxXQUFXOztZQU9ULGtCQUFFO0FBQ04sV0FBSSxnQkFBZ0IsR0FBRyw2QkFBUyxjQUFjLENBQUMsQ0FBQztBQUNoRCxXQUFJLFlBQVksR0FBRyw2QkFBUyxPQUFPLEVBQUUsYUFBYSxFQUFFO0FBQ2hELHlCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUNyQywwQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDMUMsQ0FBQyxDQUFDO0FBQ0gsV0FBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFDLElBQUksR0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN2RixXQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzs7QUFFakMsY0FDRTs7V0FBSyxTQUFTLEVBQUMsc0JBQXNCO1NBQ25DOzthQUFLLEdBQUcsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFFLGdCQUFpQjtXQUMvQzs7ZUFBTyxTQUFTLEVBQUUsWUFBYTthQUM3Qjs7O2VBQ0U7O21CQUFJLEdBQUcsRUFBQyxRQUFRO2lCQUNiLGtCQUFrQjtpQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUNqQjtjQUNDO1lBQ0Y7VUFDSjtRQUNGLENBQ1A7TUFDRjs7O1lBRW9CLGlDQUFFO0FBQ3JCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksbUJBQU0saUJBQWlCLEVBQUU7QUFDdEQsZ0JBQVEsdUVBQXVCLEtBQUssRUFBRSxJQUFJLENBQUMsb0JBQXFCLEdBQXlCLENBQUU7UUFDNUYsTUFBSyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFNLGdCQUFnQixFQUFDO0FBQzFELGdCQUFROzthQUF1QixLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFxQjtXQUM1RCxpQ0FBQyxRQUFRLElBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBZSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVksR0FBRTtVQUMzRCxDQUN4QjtRQUNILE1BQUk7QUFDSCxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFFd0IscUNBQUU7QUFDekIsV0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUM7QUFDcEMsY0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUMzQyxlQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ3JELGVBQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDOUUsZUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQ3BCLG1CQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDdkMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUMsQ0FBQztVQUNsRDtRQUNGLE1BQU07QUFDTCxhQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ2xELGFBQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDOUUsYUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQ2pCLG1CQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3RGO01BQ0Y7OztZQUVRLG1CQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQztBQUN6QyxXQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQztBQUNwQyxhQUFJLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFNLGlCQUFpQixJQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxtQkFBTSxnQkFBZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNsSCxhQUFHLGFBQWEsSUFBSSxDQUFDLEVBQ25CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ25ELGNBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFDM0MsZUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQ3BCLG1CQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1VBQ2hHO1FBQ0YsTUFBTTtBQUNMLGFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUNqQixtQkFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQy9FO0FBQ0QsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ2pELGFBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNDO0FBQ0QsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25CLFdBQUcsbUJBQW1CLEVBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsa0JBQUssaUJBQWlCLEVBQUUsR0FBRyxJQUFJLENBQUM7TUFDM0U7OztVQWxGRyxXQUFXO0lBQVMsbUJBQU0sU0FBUzs7QUFvRnpDLFlBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDdEIsZ0JBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNyQyxTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsaUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLG1CQUFnQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztFQUNuRSxDQUFDOztBQUVGLFlBQVcsQ0FBQyxZQUFZLEdBQUcsRUFDMUIsQ0FBQztzQkFDYSxXQUFXOzs7Ozs7O0FDdEgxQixnRDs7Ozs7Ozs7Ozs7Ozs7a0NDQWtCLENBQU87Ozs7a0NBQ1AsQ0FBUzs7Ozt1Q0FDTixDQUFZOzs7O3NCQUNsQjs7QUFFYixrQkFBZSwyQkFBQyxLQUFLLEVBQUU7QUFDckIsU0FBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxTQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUN6QixTQUFHLEtBQUssSUFBSSxtQkFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7QUFDeEQsU0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxVQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUMxQixVQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDaEMsU0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixZQUFPLElBQUksQ0FBQztJQUNiOztBQUVELHVCQUFvQixnQ0FBQyxLQUFLLEVBQUM7QUFDekIsU0FBSSxVQUFVLEdBQUcsNkJBQVMsT0FBTyxFQUFFO0FBQ2pDLGVBQVEsRUFBRSxLQUFLLElBQUksbUJBQU0sUUFBUTtNQUNsQyxDQUFDLENBQUM7QUFDSCxZQUNFOztTQUFNLFNBQVMsRUFBRSxVQUFXO09BQzFCLDJDQUFNLFNBQVMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFRO01BQ3ZELENBQ1A7SUFDSDs7QUFFRCxvQkFBaUIsK0JBQUU7QUFDakIsU0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxVQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDM0IsVUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDOztBQUU3QixTQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUNsQyxVQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDeEIsVUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztBQUNsQyxVQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDNUIsVUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQzdCLFVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUNoQyxVQUFLLENBQUMsV0FBVyxDQUFFLEtBQUssQ0FBQyxDQUFDOztBQUUxQixhQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxLQUFLLENBQUMsQ0FBQztBQUNsQyxTQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQzNCLFVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUNoQyxTQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQzNCLFNBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFFckMsYUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUUsS0FBSyxDQUFDLENBQUM7O0FBRWxDLFlBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBRTtJQUNsQjs7RUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDckRpQixDQUFPOzs7O3VDQUNKLENBQVk7Ozs7a0NBQ2YsQ0FBUzs7OztLQUVyQixxQkFBcUI7YUFBckIscUJBQXFCOztZQUFyQixxQkFBcUI7MkJBQXJCLHFCQUFxQjs7Z0NBQXJCLHFCQUFxQjs7O2dCQUFyQixxQkFBcUI7O1lBRW5CLGtCQUFFO0FBQ04sV0FBSSxPQUFPLEdBQUc7QUFDWixjQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsRUFBRTtRQUN0RCxDQUFDOztBQUVGLGNBQ0U7O1dBQUksS0FBSyxFQUFFLE9BQVE7U0FDakI7O2FBQUssU0FBUyxFQUFDLDhCQUE4QjtXQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7VUFDaEI7UUFDSCxDQUNOO01BQ0Y7OztVQWRHLHFCQUFxQjtJQUFTLG1CQUFNLFNBQVM7O3NCQWlCcEMscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NyQmxCLENBQU87Ozs7a0NBQ1AsQ0FBUzs7OztpQ0FDVixDQUFROzs7O3FDQUNKLEVBQVk7Ozs7d0NBQ1QsRUFBZTs7Ozs0Q0FDWCxFQUFtQjs7Ozt1Q0FDMUIsQ0FBWTs7OztBQUVqQyxLQUFJLEtBQUssR0FBQyxTQUFOLEtBQUssQ0FBVSxHQUFHLEVBQUM7QUFDckIsVUFBTyxHQUFHLElBQUcsT0FBTyxHQUFHLEtBQUcsVUFBVyxDQUFDO0VBRXZDLENBQUM7O0tBQ0ksU0FBUzthQUFULFNBQVM7O0FBRUYsWUFGUCxTQUFTLENBRUQsS0FBSyxFQUFFOzJCQUZmLFNBQVM7O0FBR1gsZ0NBSEUsU0FBUyw2Q0FHTCxLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsbUJBQVksRUFBRSxJQUFJO01BQ25CLENBQUM7QUFDRixTQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0Qjs7Z0JBUkcsU0FBUzs7WUFVSSw2QkFBRTtBQUNqQixXQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7TUFDbkI7OztZQUVpQiw4QkFBRTtBQUNsQixXQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7TUFDbkI7OztZQUVLLGtCQUFFO0FBQ04sV0FBSSxnQkFBZ0IsR0FBRyw2QkFBUyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVuRCxXQUFJLFlBQVksR0FBRyw2QkFBUyxPQUFPLEVBQUU7QUFDbkMsd0JBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87QUFDbkMseUJBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ3JDLHNCQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQy9CLDBCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztRQUN4QyxDQUFDLENBQUM7O0FBRUgsV0FBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUNwRCxXQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFN0QsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVMsSUFBSSxFQUFFLENBQUMsRUFBQztBQUNuRCxhQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUUsQ0FBQyxFQUFDO0FBQzNELGVBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsZUFBRyxJQUFJLENBQUMsT0FBTyxJQUNiLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ25DLGlCQUFNLENBQUMsUUFBUTtBQUNmLGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksSUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsSUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBQztBQUMvQixpQkFBSSxNQUFNLEdBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxVQUFTLEtBQUssRUFBQztBQUN0QyxzQkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7Y0FDaEYsR0FBQyxLQUFLLENBQUM7O0FBRVYsb0JBQ0k7O2lCQUFpQixZQUFZLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7O0FBRXJELHlCQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxRQUFTO0FBQ3RGLHVCQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsS0FBTTtBQUNuQyxvQkFBRyxFQUFFLENBQUU7QUFDUCwyQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVc7QUFDM0MseUJBQVEsRUFBRSxDQUFFO0FBQ1oseUJBQVEsRUFBRSxDQUFFO2VBQzFCLFVBQVU7Y0FDSyxDQUNuQjtZQUNKLE1BQUs7O0FBRUosaUJBQUksV0FBVyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOztBQUUvRixpQkFBRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQ3RDLG1CQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdFLG1CQUFJLENBQUMsbUJBQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ3pDLCtCQUFjLEdBQUcsMENBQUssdUJBQXVCLEVBQUUsRUFBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQU8sQ0FBQztnQkFDakY7QUFDRCxzQkFDRTs7bUJBQWEsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFNO0FBQ3hCLHNCQUFHLEVBQUUsQ0FBRTtBQUNQLDRCQUFTLEVBQUUsV0FBWTtBQUN2QiwyQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztBQUM5Qix5QkFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFPO0FBQ3RCLHlCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3ZDLHdCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQU07aUJBQzlCLGNBQWM7Z0JBQ0gsQ0FDZjtjQUNGLE1BQUs7QUFDSixzQkFDRTs7bUJBQWEsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFNO0FBQ3hCLHNCQUFHLEVBQUUsQ0FBRTtBQUNQLDRCQUFTLEVBQUUsV0FBWTtBQUN2QiwyQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztBQUM5Qix5QkFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFPO0FBQ3RCLHlCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3ZDLHdCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQU07aUJBQzlCLFVBQVU7Z0JBQ0MsQ0FDZjtjQUNGO1lBQ0Y7VUFDRixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsYUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkYsYUFBSSxlQUFlLEdBQUcsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FDMUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxHQUFDLElBQUksQ0FBQzs7QUFFbEUsYUFBSSxXQUFXLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQ3BHLGdCQUNFOzthQUFVLFVBQVUsRUFBRSxRQUFTLEVBQUMsR0FBRyxFQUFFLENBQUUsRUFBQyxTQUFTLEVBQUUsV0FBWTtBQUM3RCxzQkFBUyxFQUFFLGtCQUFrQixHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFDLFNBQVU7QUFDN0QsMkJBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssbUJBQU0sY0FBZTtBQUNsRSx1QkFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUMzQyx3QkFBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtXQUM1QyxlQUFlO1dBQ2YsWUFBWTtVQUNKLENBQ1o7UUFDRixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULFdBQUcsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7QUFDeEIsa0JBQVMsQ0FBQyxJQUFJLENBQ2Q7O2FBQVUsR0FBRyxFQUFDLGlCQUFpQjtXQUM3Qjs7ZUFBSSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFFLGtCQUFrQixHQUFDLENBQUMsR0FBQyxDQUFDLENBQUU7QUFDNUQsb0JBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUc7QUFDL0Isd0JBQVMsRUFBQyx3QkFBd0I7YUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUUsbUJBQU0sWUFBWTtZQUN6QztVQUNJLENBQUMsQ0FBQztRQUNkOztBQUVELFdBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztBQUVyQixXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFeEQsY0FDRTs7V0FBSyxHQUFHLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBRSxnQkFBaUIsRUFBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO1NBQ3hFOzthQUFPLEdBQUcsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLFlBQWE7V0FDdkMsV0FBVztXQUNaOzs7YUFDRyxTQUFTO1lBQ0o7VUFDRjtRQUNKLENBQ1A7TUFDRjs7O1lBRWdCLDJCQUFDLGtCQUFrQixFQUFDO0FBQ25DLFdBQUksZUFBZSxHQUFHLElBQUksQ0FBQzs7QUFFM0IsV0FBRyxrQkFBa0IsRUFBQztBQUNwQixhQUFJLEtBQUssR0FBRztBQUNWLGdCQUFLLEVBQUMsRUFBRTtBQUNSLG1CQUFRLEVBQUMsRUFBRTtVQUNaO0FBQ0Qsd0JBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLEdBQUUseUNBQUksS0FBSyxFQUFFLEtBQU0sRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFFLEdBQU8sQ0FBQztRQUNqRztBQUNELFdBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFTLE1BQU0sRUFBRSxDQUFDLEVBQUM7QUFDdEQsYUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JFLGFBQUksS0FBSyxHQUFDO0FBQ1Isa0JBQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sR0FBQyxJQUFJO0FBQ2xDLGdCQUFLLEVBQUUsS0FBSztBQUNaLG1CQUFRLEVBQUUsS0FBSzs7VUFFaEIsQ0FBQztBQUNGLGFBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUUsa0JBQUssb0JBQW9CLENBQUMsbUJBQU0sU0FBUyxDQUFDLEdBQUUsSUFBSSxDQUFDO0FBQzlFLGdCQUFROzthQUFJLEtBQUssRUFBRSxLQUFNLEVBQUMsR0FBRyxFQUFFLENBQUUsRUFBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVU7V0FBRSxNQUFNLENBQUMsSUFBSTtXQUFFLFNBQVM7VUFBTSxDQUFFO1FBQy9GLENBQUMsQ0FBQzs7QUFFSCxjQUNFOztXQUFPLEdBQUcsRUFBQyxRQUFRO1NBQ2pCOzs7V0FBSyxlQUFlO1dBQUUsT0FBTztVQUFNO1FBQzdCLENBQ1Q7TUFDRjs7O1lBRWEsd0JBQUMsUUFBUSxFQUFDO0FBQ3RCLFdBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUNyQixXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFDO0FBQ3RDLGFBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBQyxDQUFDLEVBQUM7QUFDakIsY0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHNCQUFXLEdBQUcsR0FBRyxDQUFDO1VBQ25CO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULFdBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO01BQ3BDOzs7WUFFYyx5QkFBQyxRQUFRLEVBQUUsVUFBVSxFQUFDO0FBQ25DLFdBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUNyQixXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFDO0FBQ3RDLGFBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBQyxDQUFDLEVBQUM7QUFDakIsY0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHNCQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLGtCQUFPLEtBQUssQ0FBQztVQUNkO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULFdBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztNQUNqRDs7O1lBRXlCLG9DQUFDLENBQUMsRUFBQztBQUMzQixXQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUM7QUFDdkYsYUFBSSxDQUFDLGVBQWUsQ0FDbEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xGO01BQ0Y7OztZQUVhLHdCQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUM7QUFDbkMsV0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsV0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQztBQUM1QixvQkFBVyxFQUFFLENBQUM7QUFDZCxhQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUN0QyxXQUFXLEVBQUUsQ0FBQztRQUNqQjtBQUNELGVBQVEsRUFBRSxDQUFDO0FBQ1gsV0FBSSxRQUFRLEdBQUc7QUFDYixxQkFBWSxFQUFFO0FBQ1osY0FBRyxFQUFFLFFBQVE7QUFDYixjQUFHLEVBQUUsV0FBVztVQUNqQjtRQUNGLENBQUM7O0FBRUYsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBQztBQUMvQyxhQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEM7QUFDRCxXQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQ3pCOzs7WUFFUyxzQkFBRTtBQUNWLFdBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3pDLFdBQUcsWUFBWSxFQUFDO0FBQ2QsYUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBQyxZQUFZLENBQUMsR0FBRyxFQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRTtNQUNGOzs7WUFFcUIsZ0NBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUM7QUFDbkQsV0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3BDLFdBQUcsSUFBSSxJQUFJLE1BQU0sRUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO01BQ3pFOzs7WUFFb0IsK0JBQUMsUUFBUSxFQUFDO0FBQzdCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLG1CQUFNLGlCQUFpQixFQUFFO0FBQ3ZELGdCQUFROzs7V0FBYSw0Q0FBTyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFFLFFBQVMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRTtVQUFjLENBQUU7UUFDckosTUFBSztBQUNKLGdCQUFROzs7V0FBYyw0Q0FBTyxJQUFJLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBRSxRQUFTLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQUU7VUFBYyxDQUFFO1FBQ3hJO01BQ0Y7OztZQUVtQixnQ0FBRTtBQUNwQixXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ3hELFdBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN4QixZQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUMvQix1QkFBYyxDQUFDLElBQUksQ0FBQztBQUNsQixnQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO1VBQzdCLENBQUMsQ0FBQztRQUNKO0FBQ0QsY0FBTyxjQUFjLENBQUM7TUFDdkI7OztZQUVTLHNCQUFHO0FBQ1gsV0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDMUIsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN2QixhQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUMxQzs7QUFFRCxXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7QUFDbkUsYUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUksSUFBSSxDQUFDO1FBQ3ZFO01BQ0Y7OztZQUVpQiw4QkFBRTtBQUNsQixXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ3hELFlBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQy9CLGdCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4RDtNQUNGOzs7WUFFdUIsb0NBQUU7QUFDeEIsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUNyRDtBQUNGLGdCQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QztNQUNGOzs7WUFFa0IsK0JBQUU7QUFDbkIsY0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssbUJBQU0saUJBQWlCLElBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxtQkFBTSxnQkFBZ0IsQ0FBQztNQUM1RDs7O1VBcFJHLFNBQVM7SUFBUyxtQkFBTSxTQUFTOztBQXNSdkMsVUFBUyxDQUFDLFNBQVMsR0FBRztBQUNwQixTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDOUIsT0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQzNCLFVBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSztBQUM5QixVQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0IsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFFBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMzQixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGtCQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDdEMsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNqQyxhQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDbkMsQ0FBQztzQkFDYSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ2hUTixDQUFPOzs7O2tDQUNQLENBQVM7Ozs7S0FFckIsUUFBUTthQUFSLFFBQVE7O0FBRUQsWUFGUCxRQUFRLENBRUEsS0FBSyxFQUFFOzJCQUZmLFFBQVE7O0FBR1YsZ0NBSEUsUUFBUSw2Q0FHSixLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNuQjs7Z0JBTEcsUUFBUTs7WUFPSixrQkFBQyxDQUFDLEVBQUM7OztBQUNULFdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFOztBQUMvQixlQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUMxQyxlQUFJLE1BQUssS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN0QixpQkFBSSxNQUFLLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFO0FBQ3RDLHFCQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBSyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Y0FDMUQsTUFBTSxJQUFJLE1BQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRTtBQUN4RCxxQkFBSyxRQUFRLEVBQUUsQ0FBQzs7Ozs7QUFLaEIseUJBQVUsQ0FBQyxZQUFNO0FBQ2YscUJBQUcsTUFBSyxRQUFRLEtBQUssQ0FBQyxFQUFFO0FBQ3RCLHlCQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBSyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7a0JBQzFEO0FBQ0QsdUJBQUssUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxHQUFHLENBQUMsQ0FBQztjQUNUO1lBQ0o7QUFDRCxlQUFJLE1BQUssS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBQzVEO01BQ0Y7OztZQUVLLGtCQUFFO0FBQ04sV0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbEIsV0FBSSxLQUFLLEdBQUM7QUFDUixjQUFLLEVBQUM7QUFDSiwwQkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxJQUFJO1VBQ3pFO0FBQ0Qsa0JBQVMsRUFBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQztRQUN2SSxDQUFDOztBQUVGLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxJQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDO0FBQ3hFLGdCQUNFOzt3QkFBUSxLQUFLLElBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtXQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtVQUFNLENBQzdFO1FBQ0YsTUFBSTtBQUNILGdCQUNFOztXQUFRLEtBQUs7V0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7VUFBTSxDQUMxQztRQUNGO01BQ0Y7OztVQWxERyxRQUFRO0lBQVMsbUJBQU0sU0FBUzs7QUFvRHRDLFNBQVEsQ0FBQyxTQUFTLEdBQUc7QUFDbkIsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGlCQUFjLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtFQUNsQyxDQUFDO0FBQ0YsU0FBUSxDQUFDLFlBQVksR0FBRztBQUN0QixhQUFVLEVBQUUsU0FBUztFQUN0QjtzQkFDYyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ2hFTCxDQUFPOzs7O2tDQUNQLENBQVM7Ozs7S0FFckIsV0FBVzthQUFYLFdBQVc7O0FBRUosWUFGUCxXQUFXLENBRUgsS0FBSyxFQUFFOzJCQUZmLFdBQVc7O0FBR2IsZ0NBSEUsV0FBVyw2Q0FHUCxLQUFLLEVBQUU7SUFDZDs7Z0JBSkcsV0FBVzs7WUFNTSwrQkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO1dBQ2xDLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUF2QixRQUFROztBQUNoQixXQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxJQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxJQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxJQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxJQUM1QyxPQUFPLFFBQVEsS0FBSyxPQUFPLFNBQVMsQ0FBQyxRQUFRLElBQzdDLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFOztBQUUzRSxXQUFHLGFBQWEsRUFBQztBQUNmLGdCQUFPLGFBQWEsQ0FBQztRQUN0Qjs7QUFFRCxXQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO0FBQ3BELGFBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUN4RSx3QkFBYSxHQUFHLGFBQWEsSUFDM0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUNyRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7VUFDL0QsTUFBTTtBQUNMLHdCQUFhLEdBQUcsSUFBSSxDQUFDO1VBQ3RCO1FBQ0YsTUFBTTtBQUNMLHNCQUFhLEdBQUcsYUFBYSxJQUFJLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ2xFOztBQUVELFdBQUcsYUFBYSxFQUFDO0FBQ2YsZ0JBQU8sYUFBYSxDQUFDO1FBQ3RCOztBQUVELFdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDL0MsZ0JBQU8sS0FBSyxDQUFDO1FBQ2QsTUFBTTtBQUNMLGdCQUFPLGFBQWEsSUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDM0Q7TUFDRjs7O1lBRWEsd0JBQUMsQ0FBQyxFQUFDO0FBQ2YsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksbUJBQU0saUJBQWlCLEVBQUM7QUFDckQsYUFBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQ2pELG1CQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1VBQzVCLE1BQU0sSUFBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQzNCLGVBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNoQyxjQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7VUFDekI7UUFDRjtBQUNELFdBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNmLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFDdEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUM5Qjs7O1lBRUssa0JBQUU7QUFDTixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFELFdBQUksT0FBTyxHQUFHO0FBQ1osa0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDL0IsZ0JBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsSUFBSTtBQUN0QyxjQUFLLEVBQUUsS0FBSztBQUNaLGlCQUFRLEVBQUUsS0FBSztRQUNoQixDQUFDO0FBQ0YsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDckMsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQztBQUNoQixrQkFBUyxJQUFJLFVBQVUsR0FBQyxLQUFLLENBQUM7UUFDakM7O0FBR0QsV0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztBQUNyQixhQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxtQkFBTSxlQUFlLEVBQUM7QUFDbkQsZUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUMvQyxNQUFLLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLG1CQUFNLGlCQUFpQixFQUFDO0FBQzNELGVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDckQ7UUFDRjtBQUNELGNBQ0U7O29CQUFJLEtBQUssRUFBRSxPQUFRLEVBQUMsU0FBUyxFQUFFLFNBQVUsSUFBSyxJQUFJO1NBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNqQixDQUNOO01BQ0Y7OztVQXJGRyxXQUFXO0lBQVMsbUJBQU0sU0FBUzs7QUF1RnpDLFlBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDdEIsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLFNBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixZQUFTLEVBQUMsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDakMsQ0FBQzs7QUFFRixZQUFXLENBQUMsWUFBWSxHQUFHO0FBQ3pCLFlBQVMsRUFBRSxNQUFNO0FBQ2pCLFNBQU0sRUFBRSxLQUFLO0FBQ2IsWUFBUyxFQUFDLEVBQUU7RUFDYjtzQkFDYyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NyR1IsQ0FBTzs7OztrQ0FDUCxDQUFTOzs7O21DQUNSLEVBQVU7Ozs7MkNBQ1IsRUFBbUI7Ozs7dUNBQ25CLENBQVk7Ozs7S0FFM0IsZUFBZTtlQUFmLGVBQWU7O0FBQ04sY0FEVCxlQUFlLENBQ0wsS0FBSyxFQUFDOytCQURoQixlQUFlOztBQUViLG9DQUZGLGVBQWUsNkNBRVAsS0FBSyxFQUFFO0FBQ2IsYUFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7QUFDckIsYUFBSSxDQUFDLEtBQUssR0FBQztBQUNQLHdCQUFXLEVBQUMsS0FBSztVQUNwQixDQUFDO01BQ0w7O2tCQVBDLGVBQWU7O2dCQVNMLHdCQUFDLENBQUMsRUFBQztBQUNmLGlCQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFOztBQUNuQixxQkFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksVUFBVSxHQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7O0FBRTlELHFCQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQztBQUN0Qiw0QkFBTztrQkFDVjtBQUNELHFCQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Y0FDcEQsTUFBSyxJQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDO0FBQ3ZCLHFCQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Y0FDbkQ7VUFDRjs7O2dCQUVTLG9CQUFDLENBQUMsRUFBQztBQUNYLGlCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDO0FBQ3ZCLHFCQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxVQUFVLEdBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUM5RCxxQkFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUM7QUFDdEIsNEJBQU87a0JBQ1Y7QUFDRCxxQkFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2NBQ3REO1VBQ0Y7OztnQkFDUSxtQkFBQyxLQUFLLEVBQUM7QUFDWixpQkFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDO0FBQ1osaUJBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFDO0FBQzNCLHFCQUFJLEtBQUssR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0MscUJBQUcsS0FBSyxLQUFHLElBQUksRUFBQztBQUNaLHVCQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2hFLHlCQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFN0IsdUJBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNsQix1QkFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2hDLHVCQUFFLENBQUMsYUFBYSxHQUFDLFVBQVUsQ0FBQyxZQUFVO0FBQUMsMkJBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztzQkFBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9FLDBCQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZCw0QkFBTyxLQUFLLENBQUM7a0JBQ2hCO2NBQ0o7QUFDRCxvQkFBTyxJQUFJLENBQUM7VUFFZjs7Ozs7Ozs7Ozs7OztZQUNXLFlBQUU7QUFDVixpQkFBRyxJQUFJLENBQUMsYUFBYSxJQUFFLENBQUMsRUFBQztBQUNyQiw2QkFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqQyxxQkFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7Y0FDeEI7VUFDSjs7O2dCQUNnQiw2QkFBRTtBQUNmLGlCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFL0Isa0JBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztVQUNqQjs7O2dCQUVtQixnQ0FBRztBQUNyQixpQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1VBQ3JCOzs7Z0JBRUssa0JBQUU7QUFDTixpQkFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2lCQUM1QixNQUFNLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUN4QixJQUFJLEdBQUM7QUFDRCxvQkFBRyxFQUFDLFVBQVU7QUFDZCwwQkFBUyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN4Qyx1QkFBTSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztjQUNwQyxDQUFDOztBQUVGLHFCQUFRLENBQUMsV0FBVyxLQUFHLElBQUksQ0FBQyxXQUFXLEdBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVsRSxpQkFBSSxXQUFXLEdBQUMsNkJBQVMsRUFBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztBQUM3RixvQkFDSTs7bUJBQUksR0FBRyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFFO2lCQUNyQyx5QkFBTyxRQUFRLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUUsRUFBRSxDQUFDO2lCQUNqRSxnRUFBVSxHQUFHLEVBQUMsVUFBVSxHQUFZO2NBQ25DLENBQ1I7VUFDRjs7O2dCQUVnQiwyQkFBQyxDQUFDLEVBQUM7QUFDbEIsaUJBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLGlCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsa0JBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELG9CQUFPLEtBQUssQ0FBQztVQUNkOzs7WUEvRkcsZUFBZTtJQUFTLG1CQUFNLFNBQVM7O0FBa0c3QyxnQkFBZSxDQUFDLFNBQVMsR0FBRztBQUMxQixpQkFBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLGFBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxhQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsZUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0VBQ2pDLENBQUM7O3NCQUdhLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ2hIWixDQUFPOzs7O0FBQ3pCLEtBQUksTUFBTSxHQUFDLFNBQVAsTUFBTSxDQUFVLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUM7O0FBR2xFLFNBQUcsUUFBUSxLQUFHLElBQUksSUFBRSxPQUFPLFFBQVEsS0FBRyxRQUFRLEVBQUM7O0FBQzNDLGFBQUksSUFBSSxHQUFDLFFBQVEsS0FBRyxJQUFJLEdBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQztBQUN6QyxnQkFDSSx1REFBVyxJQUFJLElBQUUsSUFBSSxFQUFFLElBQUssRUFBQyxZQUFZLEVBQUUsWUFBYTtBQUNqRCxzQkFBUyxFQUFFLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFBRSxnQ0FBaUMsSUFBRyxDQUMzRTtNQUNKLE1BQU0sSUFBRyxDQUFDLFFBQVEsRUFBQztBQUNsQixhQUFJLElBQUksR0FBQyxRQUFRLEtBQUcsSUFBSSxHQUFDLE1BQU0sR0FBQyxRQUFRLENBQUM7QUFDekMsZ0JBQ0ksdURBQVcsSUFBSSxJQUFFLElBQUksRUFBRSxJQUFLLEVBQUMsWUFBWSxFQUFFLFlBQWEsRUFBQyxRQUFRLEVBQUMsVUFBVTtBQUNyRSxzQkFBUyxFQUFFLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFBRSxnQ0FBaUMsSUFBRyxDQUMzRTtNQUNGLE1BQU0sSUFBRyxRQUFRLENBQUMsSUFBSSxFQUFDOzs7QUFFcEIsaUJBQVEsQ0FBQyxLQUFLLEtBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQUc1QyxhQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFDaEIsNEJBQTRCLEdBQzVCLFFBQVEsQ0FBQyxJQUFJLElBQ1osUUFBUSxDQUFDLFNBQVMsR0FBRSxHQUFHLEdBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRSxFQUFFLENBQUMsQ0FBQzs7QUFFbEUsYUFBRyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBQzs7QUFDMUIsaUJBQUksT0FBTyxHQUFHLEVBQUU7aUJBQUUsTUFBTSxHQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ2pELGlCQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUM7O0FBQ3JCLHFCQUFJLFFBQVEsQ0FBQztBQUNiLHdCQUFPLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFDNUIsNkJBQVEsR0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUM1Qiw0QkFDSTs7MkJBQVEsR0FBRyxFQUFFLFFBQVEsR0FBQyxDQUFFLEVBQUMsS0FBSyxFQUFFLENBQUU7eUJBQUUsUUFBUTtzQkFBVSxDQUN6RDtrQkFDSixDQUFDLENBQUM7Y0FDTjtBQUNELG9CQUNJOzs4QkFBWSxJQUFJLElBQUUsWUFBWSxFQUFFLFlBQWE7aUJBQUUsT0FBTztjQUFVLENBQ2xFO1VBQ0wsTUFBTSxJQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFDOzs7QUFFbkMscUJBQVEsQ0FBQyxJQUFJLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMscUJBQVEsQ0FBQyxJQUFJLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsaUJBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxTQUFTO2lCQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7QUFDN0MsaUJBQUcsWUFBWSxFQUFDO0FBQ1oscUJBQUksQ0FBQyxTQUFTLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFDdEIseUJBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7O0FBQ2pCLHFDQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7c0JBQ25CO2tCQUNKLENBQUM7QUFDRix3QkFBTyxHQUFDOzt1QkFBTyxTQUFTLEVBQUMsdUNBQXVDLEVBQUMsT0FBTyxFQUFFLFlBQWE7O2tCQUFhO2NBQ3ZHOztBQUVELG9CQUNJOzs7aUJBQ0ksMERBQWMsSUFBSSxJQUFFLFlBQVksRUFBRSxZQUFhLElBQVk7aUJBQzFELE9BQU87Y0FDTixDQUVSO1VBQ0wsTUFBTSxJQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFDO0FBQ3JDLGlCQUFJLE9BQU0sR0FBRyxZQUFZLENBQUM7QUFDMUIsaUJBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQzs7QUFFN0Msd0JBQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztjQUNsQztBQUNELGlCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsQ0FBQztBQUMzRCxpQkFBSSxDQUFDLFNBQVMsSUFBSSxzQkFBc0IsQ0FBQzs7QUFFekMsaUJBQUksT0FBTyxHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDOztBQUV6RixvQkFDRSx1REFBVyxJQUFJLElBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLGNBQWMsRUFBRSxPQUFRLElBQUUsQ0FDMUU7VUFDSCxNQUFLOztBQUNGLG9CQUNJLHVEQUFXLElBQUksSUFBRSxJQUFJLEVBQUUsSUFBSyxFQUFDLFlBQVksRUFBRSxZQUFhLElBQUUsQ0FDN0Q7VUFDSjtNQUNKOztBQUVELFlBQ0ksdURBQVcsSUFBSSxJQUFFLElBQUksRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFBRSxnQ0FBaUMsSUFBRSxDQUNoRztFQUNKLENBQUM7O3NCQUVhLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ3ZGSCxDQUFPOzs7O2tDQUNQLENBQVM7Ozs7d0NBS3BCLEVBQWM7O0FBR3JCLEtBQUksb0JBQW9CLEdBQUMsbUJBQU0sYUFBYSxDQUFDLDBCQUFhLFNBQVMsQ0FBQyxDQUFDOztLQUUvRCxZQUFZO2FBQVosWUFBWTs7WUFBWixZQUFZOzJCQUFaLFlBQVk7O2dDQUFaLFlBQVk7OztnQkFBWixZQUFZOzs7O1lBRVYsZ0JBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUM7QUFDcEIsV0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQ2xCLEdBQUcsRUFBQyxLQUFLLEVBQUU7QUFDVCxhQUFJLEVBQUMsUUFBUTtBQUNiLGdCQUFPLEVBQUUsSUFBSTtBQUNiLHdCQUFlLEVBQUUsSUFBSTtBQUNyQixzQkFBYSxFQUFFLG9CQUFvQjtBQUNuQyxzQkFBYSxFQUFFLG9CQUFvQjtRQUNwQyxDQUFDLENBQUM7TUFDUjs7O1lBRUssa0JBQUU7QUFDTixjQUNJLGdFQUFnQixHQUFHLEVBQUMsUUFBUSxFQUFDLG1CQUFtQixFQUFFLG9CQUFxQjtBQUN0RCxXQUFFLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixHQUFrQixDQUN2RjtNQUNGOzs7VUFsQkcsWUFBWTtJQUFTLG1CQUFNLFNBQVM7O3NCQXFCM0IsWUFBWTs7Ozs7OztBQ2hDM0I7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQSwrQzs7Ozs7O0FDbEJBOztBQUVBLG9EQUFtRCxnQkFBZ0Isc0JBQXNCLE9BQU8sMkJBQTJCLDBCQUEwQix5REFBeUQsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRTlQLGlDQUFnQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWpqQjtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsNENBQTJDLGtCQUFrQixrQ0FBa0MscUVBQXFFLEVBQUUsRUFBRSxPQUFPLGtCQUFrQixFQUFFLFlBQVk7O0FBRS9NLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLGtEQUFpRCxhQUFhLHVGQUF1RixFQUFFLHVGQUF1Rjs7QUFFOU8sMkNBQTBDLCtEQUErRCxxR0FBcUcsRUFBRSx5RUFBeUUsZUFBZSx5RUFBeUUsRUFBRSxFQUFFLHVIQUF1SDs7QUFFNWU7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG9FQUFtRSxhQUFhO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQixlQUFlLHVDQUF1QztBQUN6RTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLHFGQUFvRjs7QUFFcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsUUFBTztBQUNQLDhDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQixRQUFPO0FBQ1A7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQixVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7OztBQ2xMQSwwQzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLDJCQUEwQixjQUFjO0FBQ3hDLDhCQUE2QixpQkFBaUI7QUFDOUMsNkJBQTRCLGdCQUFnQjtBQUM1QywwQkFBeUIsYUFBYTtBQUN0Qyw0QkFBMkIsZUFBZTtBQUMxQyw0QkFBMkIsZUFBZTs7QUFFMUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQSxvSUFBbUk7QUFDbkk7QUFDQSxzSUFBcUk7QUFDckk7O0FBRUE7QUFDQSx5TUFBd00sUUFBUTs7QUFFaE47QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0SkFBMko7QUFDM0osZ0tBQStKO0FBQy9KO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSx5SEFBd0g7QUFDeEgsNkpBQTRKO0FBQzVKO0FBQ0EsK0lBQThJO0FBQzlJO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsNkpBQTRKO0FBQzVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCOzs7Ozs7O0FDMUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEJBQXlCLDhCQUE4QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QyxnQkFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JELE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7QUNqREE7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsaUJBQWlCO0FBQ2pELE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsUUFBTyx1Q0FBdUM7QUFDOUM7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxRQUFPLHlDQUF5QztBQUNoRDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBZ0IsaUNBQWlDO0FBQ2pELFlBQVc7QUFDWCxFQUFDOztBQUVEO0FBQ0EsaUJBQWdCLDhCQUE4QjtBQUM5QyxZQUFXO0FBQ1gsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxnQzs7Ozs7O0FDOUhBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QixjQUFhLE9BQU87QUFDcEIsZUFBYyxXQUFXO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QixjQUFhLE9BQU87QUFDcEIsZUFBYyxXQUFXO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxjQUFhLFdBQVc7QUFDeEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsRUFBRTtBQUNmLGVBQWMsV0FBVztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsa0JBQWtCO0FBQy9CLGNBQWEsT0FBTztBQUNwQixlQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQjs7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JELE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQSx3Qzs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDOzs7Ozs7QUNuQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLGlCQUFpQjs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N2RmtCLENBQU87Ozs7eUNBQ0YsRUFBaUI7Ozs7a0NBQ3RCLENBQVU7Ozs7S0FFdEIsY0FBYzthQUFkLGNBQWM7O0FBRVAsWUFGUCxjQUFjLENBRU4sS0FBSyxFQUFFOzJCQUZmLGNBQWM7O0FBR2hCLGdDQUhFLGNBQWMsNkNBR1YsS0FBSyxFQUFFO0FBQ2IsU0FBSSxDQUFDLEtBQUssR0FBRztBQUNYLGtCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ2hDLGtCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO01BQ3BDLENBQUM7SUFDSDs7Z0JBUkcsY0FBYzs7WUFVUixvQkFBQyxJQUFJLEVBQUU7QUFDZixXQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUM5QixhQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdEMsYUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3BHLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdEMsYUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDeEIsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN2QyxhQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsTUFBTTtBQUNMLGFBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkI7O0FBRUQsV0FBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDbEMsYUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ25DLGFBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JEO01BQ0Y7OztZQUV3QixtQ0FBQyxTQUFTLEVBQUU7QUFDbkMsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNyQixhQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtBQUMvQyxlQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osd0JBQVcsRUFBRSxTQUFTLENBQUMsUUFBUTtBQUMvQix3QkFBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXO1lBQ25DLENBQUMsQ0FBQztVQUNKO1FBQ0Y7TUFDRjs7O1lBR2dCLDJCQUFDLENBQUMsRUFBRTtBQUNuQixRQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLFdBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELFdBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO0FBQ3hDLGFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQztBQUM5RCxhQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRTNDLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixzQkFBVyxFQUFFLFVBQVU7QUFDdkIsc0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7VUFDcEMsQ0FBQyxDQUFDO0FBQ0gsYUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDMUQsYUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFDO0FBQzlCLGVBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7VUFDMUM7UUFDRjtNQUNGOzs7WUFFSyxrQkFBRzs7O0FBQ1AsV0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUUsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQy9CLFdBQUksYUFBYSxHQUFHO0FBQ2xCLGNBQUssRUFBRSxPQUFPO0FBQ2Qsa0JBQVMsRUFBRSxLQUFLO1FBQ2pCOztBQUVELFdBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFdBQVcsRUFBSztBQUNwRSxnQkFDRTs7YUFBSSxHQUFHLEVBQUUsV0FBWSxFQUFDLElBQUksRUFBQyxjQUFjO1dBQ3ZDOztlQUFHLElBQUksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFLLGlCQUFpQixDQUFDLElBQUksT0FBTzthQUFFLFdBQVc7WUFBSztVQUNwRyxDQUNMO1FBQ0gsQ0FBQyxDQUFDOztBQUVILGNBQ0U7O1dBQUssU0FBUyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFHO1NBQzVDOzthQUFLLFNBQVMsRUFBQyxVQUFVO1dBRXZCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQ3JDOztlQUFLLFNBQVMsRUFBQyxVQUFVO2FBQ3ZCOztpQkFBUSxTQUFTLEVBQUMsaUNBQWlDLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLGVBQVksVUFBVTtBQUNsRyxrQ0FBYyxNQUFNO2VBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztlQUN2Qjs7O2lCQUNHLEdBQUc7aUJBQ0osMkNBQU0sU0FBUyxFQUFDLE9BQU8sR0FBRTtnQkFDcEI7Y0FDQTthQUNUOztpQkFBSSxTQUFTLEVBQUMsZUFBZSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsbUJBQWdCLGNBQWM7ZUFDckUsZUFBZTtjQUNiO1lBQ0QsR0FDSixFQUFFO1VBRUE7U0FDTjs7YUFBSyxTQUFTLEVBQUMsVUFBVTtXQUN2Qjs7ZUFBSSxTQUFTLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBRSxhQUFjO2FBQzdDLFFBQVE7WUFDTjtVQUNEO1FBQ0YsQ0FDUDtNQUNGOzs7WUFFTyxvQkFBRztBQUNULFdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM1QixjQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7QUFDL0IsYUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQy9DLGFBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNyQixhQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkIsYUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxDQUFDLEtBQzNCLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQztBQUM3RCxtQkFBUSxHQUFHLElBQUksQ0FBQztBQUNoQixpQkFBTSxHQUFHLElBQUksQ0FBQztVQUNqQjtBQUNELGFBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsS0FDekMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDO0FBQzdELG1CQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGlCQUFNLEdBQUcsSUFBSSxDQUFDO1VBQ2pCO0FBQ0QsZ0JBQ0U7O2FBQVksVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxFQUFDLE1BQU0sRUFBRSxRQUFTLEVBQUMsT0FBTyxFQUFFLFFBQVMsRUFBQyxNQUFNLEVBQUUsTUFBTyxFQUFDLEdBQUcsRUFBRSxJQUFLO1dBQUUsSUFBSTtVQUFjLENBQ3hJO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNWOzs7WUFFTyxvQkFBRztBQUNULFdBQUksU0FBUyxHQUFHLENBQUM7V0FBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7QUFFN0MsZ0JBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUYsY0FBTyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7O0FBRXBELFdBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDN0IsZ0JBQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzFCLGtCQUFTLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUNyRDtBQUNELFdBQUksS0FBSyxDQUFDO0FBQ1YsV0FBRyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDaEUsY0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7QUFDOUIsY0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixNQUNJO0FBQ0gsY0FBSyxHQUFHLEVBQUU7UUFDWDtBQUNELFlBQUssSUFBSSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsYUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekI7QUFDRCxXQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQzlCLGNBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxjQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFDO0FBQzdCLGNBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQztBQUNELGNBQU8sS0FBSyxDQUFDO01BQ2Q7OztZQUVhLDBCQUFHO0FBQ2YsY0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztNQUMvQjs7O1lBRWEsMEJBQUc7QUFDZixjQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO01BQy9COzs7VUF0S0csY0FBYztJQUFTLG1CQUFNLFNBQVM7O0FBd0s1QyxlQUFjLENBQUMsU0FBUyxHQUFHO0FBQ3pCLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxjQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDbkMsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGFBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxrQkFBZSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQ3RDLGlCQUFjLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDdEMsU0FBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLG9CQUFpQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3ZDLFVBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtFQUNoQyxDQUFDOztBQUVGLGVBQWMsQ0FBQyxZQUFZLEdBQUc7QUFDNUIsY0FBVyxFQUFFLG1CQUFNLGFBQWE7RUFDakMsQ0FBQzs7c0JBRWEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDNUxYLENBQU87Ozs7dUNBQ0osQ0FBWTs7OztLQUUzQixVQUFVO2FBQVYsVUFBVTs7QUFFSCxZQUZQLFVBQVUsQ0FFRixLQUFLLEVBQUU7MkJBRmYsVUFBVTs7QUFHZCxnQ0FISSxVQUFVLDZDQUdSLEtBQUssRUFBRTtJQUNiOztnQkFKSSxVQUFVOztZQU1GLHNCQUFDLENBQUMsRUFBQztBQUNiLFFBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixXQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzdDOzs7WUFFSyxrQkFBRTtBQUNOLFdBQUksT0FBTyxHQUFHLDZCQUFTO0FBQ25CLGlCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQzNCLG1CQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQzlCLGlCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQzlCLENBQUMsQ0FBQztBQUNILGNBQ0k7O1dBQUksU0FBUyxFQUFFLE9BQVE7U0FBQzs7YUFBRyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7V0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7VUFBSztRQUFLLENBQzVHO01BQ0Y7OztVQXBCRyxVQUFVO0lBQVMsbUJBQU0sU0FBUzs7QUFzQnhDLFdBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDckIsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFNBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixVQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7RUFDOUIsQ0FBQzs7c0JBRWEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDL0JQLENBQU87Ozs7dUNBQ0osQ0FBWTs7OztrQ0FDZixDQUFVOzs7O21DQUNULEVBQVc7Ozs7MkNBQ1QsRUFBb0I7Ozs7S0FFbkMsT0FBTzthQUFQLE9BQU87O0FBRUEsWUFGUCxPQUFPLENBRUMsS0FBSyxFQUFFOzs7MkJBRmYsT0FBTzs7QUFHWCxnQ0FISSxPQUFPLDZDQUdMLEtBQUssRUFBRTs7VUFxRmIsb0JBQW9CLEdBQUcsV0FBQyxFQUFJO0FBQzFCLGFBQUssUUFBUSxDQUFDO0FBQ1oscUJBQVksRUFBRSxDQUFDLE1BQUssS0FBSyxDQUFDLFlBQVk7UUFDdkMsQ0FBQyxDQUFDO0FBQ0gsYUFBSyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztNQUNqQzs7VUFrQkQsbUJBQW1CLEdBQUcsWUFBTTtBQUMxQixhQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQyxhQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDekI7O0FBOUdDLFNBQUksQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxLQUFLLEdBQUc7QUFDWCx5QkFBa0IsRUFBRSxJQUFJO0FBQ3hCLG9CQUFhLEVBQUMsSUFBSTtBQUNsQixrQkFBVyxFQUFDLEtBQUs7QUFDakIsbUJBQVksRUFBRSxLQUFLO01BQ3BCLENBQUM7SUFDSDs7Z0JBWEcsT0FBTzs7WUFZUyxnQ0FBRTtBQUNwQixXQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7TUFDckI7Ozs7Ozs7Ozs7Ozs7UUFDVyxZQUFHO0FBQ2IsV0FBRyxJQUFJLENBQUMsYUFBYSxFQUFDO0FBQ3BCLHFCQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLGFBQUksQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDO1FBQ3RCO01BQ0Y7OztZQUVnQiw2QkFBRTtBQUNqQixXQUFJLEVBQUUsR0FBQyxJQUFJO1dBQUMsTUFBTSxHQUFHLEVBQUU7V0FBQyxPQUFPLEdBQUMsSUFBSTtXQUFDLFNBQVM7V0FBQyxPQUFPO1dBQUMsYUFBYSxHQUFDLEVBQUUsQ0FBQztBQUN4RSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBUyxNQUFNLEVBQUUsQ0FBQyxFQUFDO0FBQzVDLGFBQUcsTUFBTSxDQUFDLFNBQVMsRUFBQzs7QUFDbEIsb0JBQVMsR0FBQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLElBQUUsVUFBVSxHQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRSxZQUFZLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUcsQ0FBQztVQUN0RyxNQUFJO0FBQ0gsZUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLG9CQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQzs7QUFFdEIsZUFBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBQztBQUN2RCxpQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsc0JBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUM7O0FBRUQsZUFBRyxNQUFNLENBQUMsUUFBUSxJQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFDOztBQUM1QyxvQkFBTyxHQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUM3QyxpQkFBRyxPQUFPLEtBQUcsSUFBSSxFQUFDO0FBQ2hCLHNCQUFPLEdBQUMsS0FBSyxDQUFDO0FBQ2QsNEJBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUMsT0FBTyxDQUFDO2NBQ3JDO1lBQ0Y7VUFDRjs7QUFFRCxlQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFFLFNBQVMsQ0FBQztRQUNqQyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULFdBQUcsT0FBTyxFQUFDO0FBQ1QsZ0JBQU8sTUFBTSxDQUFDO1FBQ2YsTUFBSTtBQUNILFdBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7QUFFbEIsYUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7O0FBRTlELFdBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsd0NBQXdDLEVBQUMsd0JBQXdCLENBQUMsQ0FBQzs7QUFFbkcsV0FBRSxDQUFDLGFBQWEsR0FBQyxVQUFVLENBQUMsWUFBVTtBQUFDLGFBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztVQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0UsZ0JBQU8sSUFBSSxDQUFDO1FBQ2I7TUFDRjs7O1lBRWlCLDRCQUFDLENBQUMsRUFBQztBQUNuQixXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUN0QyxXQUFHLENBQUMsTUFBTSxFQUFDOztBQUNULGdCQUFPO1FBQ1I7QUFDRCxXQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxXQUFHLEdBQUcsRUFBRTtBQUNOLGFBQUksRUFBRSxHQUFDLElBQUksQ0FBQztBQUNaLFdBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDOUQsV0FBRSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUVsQixXQUFFLENBQUMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsK0NBQStDLEVBQUMsQ0FBQyxDQUFDOztBQUU5RixXQUFFLENBQUMsYUFBYSxHQUFDLFVBQVUsQ0FBQyxZQUFVO0FBQUMsYUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1VBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNoRixNQUFLOztBQUVKLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWix3QkFBYSxFQUFDLElBQUk7QUFDbEIsc0JBQVcsRUFBQyxLQUFLO1VBQ2xCLENBQUMsQ0FBQzs7QUFFSCxhQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV4QjtNQUNGOzs7WUFTb0IsK0JBQUMsQ0FBQyxFQUFDO0FBQ3RCLFdBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7TUFDeEI7OztZQUVhLHdCQUFDLENBQUMsRUFBQztBQUNmLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO01BQzFDOzs7WUFFVSxxQkFBQyxDQUFDLEVBQUM7QUFDWixXQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQzVDOzs7WUFFYywyQkFBRztBQUNoQixXQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO01BQzFCOzs7WUFPSyxrQkFBRTtBQUNOLFdBQUksY0FBYyxHQUFHLG1CQUFtQixHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDOUQsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQ2pDOztXQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYyxFQUFDLFNBQVMsRUFBQyxxQ0FBcUMsRUFBQyxlQUFZLE9BQU8sRUFBQyxlQUFhLEdBQUcsR0FBQyxjQUFlO1NBQzNKLHdDQUFHLFNBQVMsRUFBQywwQkFBMEIsR0FBSzs7UUFBYSxHQUFDLElBQUksQ0FBQzs7QUFFdkUsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQ2pDOztXQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLHdDQUF3QyxFQUFDLGVBQVksU0FBUyxFQUFDLGtCQUFlLE9BQU8sRUFBQyxLQUFLLEVBQUMsbUJBQW1CO0FBQzdJLGtCQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7U0FDL0Msd0NBQUcsU0FBUyxFQUFDLDJCQUEyQixHQUFLOztRQUN0QyxHQUFDLElBQUksQ0FBQzs7QUFFckIsV0FBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0FBRS9DLFdBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FDekQ7O1dBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsZUFBWSxRQUFRLEVBQUMsZ0JBQWEsT0FBTztTQUN0SSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRSxtQkFBTSxRQUFRLEdBQUcsbUJBQU0sZ0JBQWdCO1FBQzNELEdBQUMsSUFBSSxDQUFDOztBQUVqQixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEdBQUMsSUFBSSxDQUFDO0FBQ25GLFdBQUksWUFBWSxHQUFHO0FBQ2pCLGdCQUFPLEVBQUUsTUFBTTtBQUNmLHFCQUFZLEVBQUUsQ0FBQztRQUNoQixDQUFDOztBQUVGLFdBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUNwQzs7V0FBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO1NBQ3ZGLHdDQUFHLFNBQVMsRUFBQyw0QkFBNEIsR0FBSzs7UUFBdUIsR0FBRyxJQUFJLENBQUM7O0FBRXZGLGNBQ0U7O1dBQUssU0FBUyxFQUFDLEtBQUs7U0FDbEI7O2FBQUssU0FBUyxFQUFDLHNDQUFzQztXQUNuRDs7ZUFBSyxTQUFTLEVBQUMsd0JBQXdCLEVBQUMsSUFBSSxFQUFDLE9BQU87YUFDakQsU0FBUzthQUNULFNBQVM7YUFDVCxTQUFTO2FBQ1QsbUJBQW1CO1lBQ2hCO1VBQ0Y7U0FDTjs7YUFBSyxTQUFTLEVBQUMsc0NBQXNDO1dBQ2xELGVBQWU7VUFDWjtTQUNOLGdFQUFVLEdBQUcsRUFBQyxVQUFVLEdBQVk7U0FDbkMsS0FBSztRQUNGLENBQ1A7TUFDRjs7O1lBRWdCLDZCQUFHO0FBQ2xCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7QUFDMUIsYUFBSSxVQUFVLEdBQUcsMEJBQTBCLENBQUM7QUFDNUMsYUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGFBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDekIsbUJBQVEsR0FDTjs7ZUFBTSxTQUFTLEVBQUMsaUJBQWlCO2FBQy9COzs7QUFDRSwwQkFBUyxFQUFDLGlCQUFpQjtBQUMzQixxQkFBSSxFQUFDLFFBQVE7QUFDYix3QkFBTyxFQUFHLElBQUksQ0FBQyxtQkFBcUI7O2NBQWU7WUFFeEQsQ0FBQztBQUNGLHFCQUFVLEdBQUcscURBQXFELENBQUM7VUFDcEU7O0FBRUQsZ0JBQ0U7O2FBQUssU0FBUyxFQUFFLFVBQVc7V0FDekIsNENBQU8sR0FBRyxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxNQUFNO0FBQzFELHdCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFDLFFBQVM7QUFDaEYsb0JBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRTtXQUNyQyxRQUFRO1VBQ1IsQ0FDTjtRQUNILE1BQU07QUFDTCxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFFbUIsOEJBQUMsY0FBYyxFQUFDO0FBQ2xDLFdBQUksYUFBYSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFFLEVBQUUsQ0FBQztBQUMvQyxXQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUUsQ0FBQyxFQUFDO0FBQ3pELGFBQUksUUFBUSxHQUFDLE1BQU0sQ0FBQyxRQUFRO2FBQ3hCLE1BQU0sR0FBQyxNQUFNLENBQUMsTUFBTTthQUNwQixJQUFJLEdBQUMsRUFBQyxHQUFHLEVBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUM7O0FBRWhHLGFBQUcsTUFBTSxDQUFDLFNBQVMsRUFBQzs7QUFDbEIsa0JBQU8sSUFBSSxDQUFDO1VBQ2I7QUFDRCxhQUFJLEtBQUssR0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFFOzthQUFNLFNBQVMsRUFBQyxzQkFBc0I7V0FBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztVQUFRLEdBQUUsSUFBSSxDQUFDOzs7O0FBSXpILGdCQUNFOzthQUFLLFNBQVMsRUFBQyxZQUFZLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFNO1dBQzVDOzs7YUFBUSxNQUFNLENBQUMsSUFBSTtZQUFTO1dBQzNCLHlCQUFPLFFBQVEsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQztXQUMvQixLQUFLO1VBQ0YsQ0FDTjtRQUNILENBQUMsQ0FBQztBQUNILFdBQUksVUFBVSxHQUFHLDZCQUFTLE9BQU8sRUFBRSxNQUFNLEVBQUcsY0FBYyxFQUFDO0FBQ3pELGFBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7UUFDdEQsQ0FBQyxDQUFDO0FBQ0gsV0FBSSxXQUFXLEdBQUMsNkJBQVMsY0FBYyxFQUFDLFVBQVUsRUFBQztBQUNqRCxtQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztBQUNqQyxnQkFBTyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztRQUMvQixDQUFDLENBQUM7QUFDSCxjQUNFOztXQUFLLEdBQUcsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxRQUFRO1NBQ2xFOzthQUFLLFNBQVMsRUFBRSxXQUFZO1dBQzFCOztlQUFLLFNBQVMsRUFBQyxlQUFlO2FBQzVCOztpQkFBSyxTQUFTLEVBQUMsY0FBYztlQUMzQjs7bUJBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLGdCQUFhLE9BQU8sRUFBQyxjQUFXLE9BQU87aUJBQUM7O3FCQUFNLGVBQVksTUFBTTs7a0JBQWU7Z0JBQVM7ZUFDaEk7O21CQUFJLFNBQVMsRUFBQyxhQUFhOztnQkFBZ0I7Y0FDdkM7YUFDTjs7aUJBQUssU0FBUyxFQUFDLFlBQVk7ZUFDekI7O21CQUFNLEdBQUcsRUFBQyxNQUFNO2lCQUNmLFVBQVU7Z0JBQ0o7Y0FDSDthQUNOOztpQkFBSyxTQUFTLEVBQUMsY0FBYztlQUMzQjs7bUJBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsZ0JBQWEsT0FBTzs7Z0JBQWU7ZUFDckY7O21CQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7O2dCQUFjO2NBQ3RHO1lBQ0Y7VUFDRjtRQUNGLENBQ1A7TUFDRjs7O1VBblBHLE9BQU87SUFBUyxtQkFBTSxTQUFTOztBQXFQckMsUUFBTyxDQUFDLFNBQVMsR0FBRztBQUNsQixXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLHFCQUFrQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3hDLGVBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNsQyxlQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsZUFBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLHlCQUFzQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVDLFVBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSztBQUM5QixvQkFBaUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN6QyxjQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7RUFDbEMsQ0FBQzs7QUFFRixRQUFPLENBQUMsWUFBWSxHQUFHO0FBQ3JCLGVBQVksRUFBRSxLQUFLO0FBQ25CLGVBQVksRUFBRSxLQUFLO0FBQ25CLGVBQVksRUFBRSxLQUFLO0FBQ25CLHlCQUFzQixFQUFFLEtBQUs7QUFDN0IsY0FBVyxFQUFFLEtBQUs7RUFDbkI7c0JBQ2MsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDL1FKLENBQU87Ozs7a0NBQ1AsQ0FBUzs7Ozt1Q0FDTixDQUFZOzs7O0tBRTNCLFdBQVc7YUFBWCxXQUFXOztBQUVKLFlBRlAsV0FBVyxDQUVILEtBQUssRUFBRTsyQkFGZixXQUFXOztBQUdiLGdDQUhFLFdBQVcsNkNBR1AsS0FBSyxFQUFFO0FBQ2IsU0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDckI7O2dCQUxHLFdBQVc7O1lBT0oscUJBQUMsQ0FBQyxFQUFDO0FBQ1osV0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQ3BDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBRTVDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQzs7QUFFL0QsV0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3JDOzs7WUFFSyxrQkFBRTtBQUNOLFdBQUksWUFBWSxHQUFHLDZCQUFTLE9BQU8sRUFBRTtBQUNuQyx3QkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztBQUNuQywwQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDeEMsQ0FBQyxDQUFDO0FBQ0gsV0FBSSxlQUFlLEdBQUcsSUFBSSxDQUFDOztBQUUzQixXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFNLGlCQUFpQixJQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxtQkFBTSxnQkFBZ0IsRUFBQztBQUNyRCxhQUFJLEtBQUssR0FBRztBQUNWLGdCQUFLLEVBQUMsRUFBRTtBQUNSLHNCQUFXLEVBQUUsQ0FBQztBQUNkLHVCQUFZLEVBQUUsQ0FBQztVQUNoQjtBQUNELHdCQUFlLEdBQUk7O2FBQUksS0FBSyxFQUFFLEtBQU0sRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFFOztVQUFhLENBQUM7UUFDNUQ7QUFDRCxXQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUM7QUFDdkQsYUFBSSxPQUFPLEdBQUc7QUFDWixrQkFBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxHQUFDLElBQUk7QUFDbEMsZ0JBQUssRUFBRSxNQUFNLENBQUMsS0FBSztVQUNwQixDQUFDO0FBQ0YsZ0JBQ0U7O2FBQUksR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFLLEVBQUMsS0FBSyxFQUFFLE9BQVE7V0FDbkM7O2VBQUssU0FBUyxFQUFDLDhCQUE4QjthQUMzQyw0Q0FBTyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFLLEVBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFLLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxHQUFFO1lBQzdHO1VBQ0gsQ0FDTjtRQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDVCxjQUNFOztXQUFPLFNBQVMsRUFBRSxZQUFhLEVBQUMsS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBRTtTQUNuRDs7O1dBQ0U7O2VBQUksS0FBSyxFQUFFLEVBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFFO2FBQ3RDLGVBQWU7YUFBRSxXQUFXO1lBQzFCO1VBQ0M7UUFDRixDQUNUO01BQ0Y7OztVQXRERyxXQUFXO0lBQVMsbUJBQU0sU0FBUzs7QUF3RHpDLFlBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDdEIsVUFBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQzlCLGdCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDckMsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0VBQy9CLENBQUM7c0JBQ2EsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDakVSLENBQVU7Ozs7QUFDNUIsS0FBSSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFRLENBQUMsQ0FBQyxZQUFZLENBQUM7O0FBRWxELFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUM5QyxRQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzVCLE1BQUcsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQ2pCLFNBQUksUUFBUSxFQUFFO0FBQ1osY0FBTyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztNQUM5QixNQUFNO0FBQ0wsV0FBSSxLQUFLLElBQUksbUJBQU0sU0FBUyxFQUFFO0FBQzVCLGdCQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQ25GLE1BQU07QUFDTCxnQkFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQztRQUNuRjtNQUNGO0lBQ0YsQ0FBQyxDQUFDOztBQUVILFVBQU8sR0FBRyxDQUFDO0VBQ1o7O0tBRVksWUFBWTthQUFaLFlBQVk7O0FBQ1osWUFEQSxZQUFZLENBQ1gsSUFBSSxFQUFFOzJCQURQLFlBQVk7O0FBRXJCLGdDQUZTLFlBQVksNkNBRWYsSUFBSSxFQUFFO0FBQ1osU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEI7O2dCQUpVLFlBQVk7O1lBTWhCLGlCQUFDLElBQUksRUFBRTtBQUNaLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQzNCOzs7WUFFSSxpQkFBRztBQUNOLFdBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO01BQ2xCOzs7WUFFTSxtQkFBRztBQUNSLGNBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztNQUNsQjs7O1VBaEJVLFlBQVk7SUFBUyxZQUFZOzs7O0tBbUJqQyxjQUFjO0FBRWQsWUFGQSxjQUFjLENBRWIsSUFBSSxFQUFFOzJCQUZQLGNBQWM7O0FBR3ZCLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDL0IsU0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUM5QixTQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNyQjs7Z0JBZlUsY0FBYzs7WUFpQmpCLGtCQUFDLEtBQUssRUFBRTtBQUNkLFdBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUMvQixXQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUMzQyxXQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDL0IsV0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzNCLFdBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7TUFDbEQ7OztZQUVNLGlCQUFDLElBQUksRUFBRTtBQUNaLFdBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pELGFBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQ7QUFDRCxXQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDaEIsYUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZEO01BQ0Y7OztZQUVVLHVCQUFHO0FBQ1osY0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO01BQ3JCOzs7WUFFZ0IsMkJBQUMsZUFBZSxFQUFFO0FBQ2pDLFdBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO01BQ2pDOzs7WUFFaUIsOEJBQUc7QUFDbkIsY0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3RCOzs7WUFFb0IsaUNBQUc7QUFDdEIsV0FBSSxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDdkI7OztZQUVnQiw2QkFBRzs7O0FBQ2xCLFdBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUMvQyxXQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztBQUN2QixhQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixhQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLGFBQUcsRUFBSTtBQUMzQyxlQUFJLE1BQU0sR0FBRyxNQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBQztvQkFBSSxHQUFHLENBQUMsTUFBSyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQUEsQ0FBQztBQUM5RCxrQkFBTyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztVQUNyRCxDQUFDLENBQUM7UUFDSixNQUFNO0FBQ0wsYUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekI7TUFDRjs7O1lBRUcsY0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO0FBQ3JCLFdBQUksQ0FBQyxPQUFPLEdBQUc7QUFDYixjQUFLLEVBQUUsS0FBSztBQUNaLGtCQUFTLEVBQUUsU0FBUztRQUNyQixDQUFDOztBQUVGLFdBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQsV0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7O1dBRWxDLFFBQVEsR0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFyQyxRQUFROztBQUNoQix5QkFBa0IsR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFM0UsY0FBTyxJQUFJLENBQUM7TUFDYjs7O1lBRUcsY0FBQyxLQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3RCLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEtBQUksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLFdBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRCxjQUFPLElBQUksQ0FBQztNQUNiOzs7WUFFRyxjQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO0FBQ2hDLFdBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQsV0FBSSxXQUFXLGFBQUM7QUFDaEIsV0FBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUMxQiwyQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakQsb0JBQVcsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsTUFBTTtBQUNMLDJCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUN0RSxvQkFBVyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRjtBQUNELFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUMvQixlQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO0FBQ3RDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ3pCO1VBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULGFBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekQsYUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RDtBQUNELGNBQU8sSUFBSSxDQUFDO01BQ2I7OztZQUVFLGFBQUMsTUFBTSxFQUFFO0FBQ1YsV0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7QUFDckUsZUFBTSxJQUFJLENBQUMsUUFBUSxHQUFHLHdCQUF3QixDQUFDO1FBQ2hEO0FBQ0QsV0FBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN0RCx5QkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDeEMsYUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7QUFDdEUsaUJBQU0sSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztVQUN2RTtRQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQseUJBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QjtNQUNGOzs7WUFFSyxnQkFBQyxNQUFNLEVBQUU7QUFDYixXQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3RELFdBQUksTUFBTSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwRCxnQkFBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRCxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQzFDLGtCQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1VBQ2pELEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDVCxhQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM1QixNQUFNO0FBQ0wsYUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDcEI7TUFDRjs7O1lBRUssZ0JBQUMsU0FBUyxFQUFFOzs7QUFDaEIsV0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDdEMsYUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsYUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsYUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdkIsTUFBTTtBQUNMLGFBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLGFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsYUFBRyxFQUFJO0FBQzNDLGVBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNqQixlQUFJLFNBQVMsYUFBQztBQUNkLGdCQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBRTtBQUN6QixpQkFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV6QixxQkFBUSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTtBQUN6QixvQkFBSyxtQkFBTSxXQUFXLENBQUMsTUFBTTtBQUM3QjtBQUNFLDRCQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDeEMseUJBQU07a0JBQ1A7QUFDRCxvQkFBSyxtQkFBTSxXQUFXLENBQUMsTUFBTTtBQUM3QjtBQUNFLDRCQUFTLEdBQUksT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLFFBQVEsR0FDakQsU0FBUyxHQUNSLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLEdBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzNHLHlCQUFNO2tCQUNQO0FBQ0Q7QUFBUztBQUNQLDRCQUFTLEdBQUksT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLFFBQVEsR0FBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDbkgseUJBQU07a0JBQ1A7QUFBQSxjQUNGOztBQUVELGlCQUFJLE9BQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO21DQUMrQixPQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUM7bUJBQS9ELE1BQU0saUJBQU4sTUFBTTttQkFBRSxlQUFlLGlCQUFmLGVBQWU7bUJBQUUsZUFBZSxpQkFBZixlQUFlOztBQUNoRCxtQkFBRyxlQUFlLElBQUksTUFBTSxFQUFFO0FBQzVCLDBCQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ3BEO2NBQ0Y7O0FBRUQscUJBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7QUFDekIsb0JBQUssbUJBQU0sV0FBVyxDQUFDLE1BQU07QUFDN0I7QUFDRSx3QkFBSyxHQUFHLE9BQUssWUFBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqRix5QkFBTTtrQkFDUDtBQUNELG9CQUFLLG1CQUFNLFdBQVcsQ0FBQyxJQUFJO0FBQzNCO0FBQ0Usd0JBQUssR0FBRyxPQUFLLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDOUMseUJBQU07a0JBQ1A7QUFDRCxvQkFBSyxtQkFBTSxXQUFXLENBQUMsTUFBTTtBQUM3QjtBQUNFLHdCQUFLLEdBQUcsT0FBSyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEUseUJBQU07a0JBQ1A7QUFDRDtBQUFTO0FBQ1Asd0JBQUssR0FBRyxPQUFLLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDOUMseUJBQU07a0JBQ1A7QUFBQSxjQUNGO0FBQ0QsaUJBQUksQ0FBQyxLQUFLLEVBQUU7QUFDVixxQkFBTTtjQUNQO1lBQ0Y7QUFDRCxrQkFBTyxLQUFLLENBQUM7VUFDZCxDQUFDLENBQUM7QUFDSCxhQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN4QjtNQUNGOzs7WUFFVyxzQkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRTtBQUM3QyxXQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsZUFBUSxVQUFVO0FBQ2hCLGNBQUssR0FBRztBQUNSO0FBQ0UsaUJBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtBQUMxQixvQkFBSyxHQUFHLEtBQUssQ0FBQztjQUNmO0FBQ0QsbUJBQU07WUFDUDtBQUNELGNBQUssR0FBRztBQUNSO0FBQ0UsaUJBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtBQUMxQixvQkFBSyxHQUFHLEtBQUssQ0FBQztjQUNmO0FBQ0QsbUJBQU07WUFDUDtBQUNELGNBQUssSUFBSTtBQUNUO0FBQ0UsaUJBQUksU0FBUyxHQUFHLFNBQVMsRUFBRTtBQUN6QixvQkFBSyxHQUFHLEtBQUssQ0FBQztjQUNmO0FBQ0QsbUJBQU07WUFDUDtBQUNELGNBQUssR0FBRztBQUNSO0FBQ0UsaUJBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtBQUMxQixvQkFBSyxHQUFHLEtBQUssQ0FBQztjQUNmO0FBQ0QsbUJBQU07WUFDUDtBQUNELGNBQUssSUFBSTtBQUNUO0FBQ0UsaUJBQUksU0FBUyxHQUFHLFNBQVMsRUFBRTtBQUN6QixvQkFBSyxHQUFHLEtBQUssQ0FBQztjQUNmO0FBQ0QsbUJBQU07WUFDUDtBQUNELGNBQUssSUFBSTtBQUNUO0FBQ0UsaUJBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtBQUMxQixvQkFBSyxHQUFHLEtBQUssQ0FBQztjQUNmO0FBQ0QsbUJBQU07WUFDUDtBQUNEO0FBQ0E7QUFDRSxvQkFBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0FBQzdELG1CQUFNO1lBQ1A7QUFBQSxRQUNGO0FBQ0QsY0FBTyxLQUFLLENBQUM7TUFDZDs7O1lBRVMsb0JBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUMvQixjQUFRLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLElBQzlDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQzVDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUU7TUFDekQ7OztZQUVXLHNCQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFO0FBQy9DLFdBQUksWUFBWSxJQUFJLElBQUksSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRLEVBQUU7QUFDNUQsZ0JBQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDMUU7O0FBRUQsY0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQ3pDOzs7WUFFUyxvQkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQy9CLFdBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUMvRCxnQkFBTyxLQUFLLENBQUM7UUFDZDs7QUFFRCxjQUFPLElBQUksQ0FBQztNQUNiOzs7WUFFSyxnQkFBQyxVQUFVLEVBQUU7OztBQUNqQixXQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7QUFDNUIsYUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsYUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsYUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDeEIsTUFBTTtBQUNMLGFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLGFBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixhQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLGFBQUcsRUFBSTtBQUMzQyxlQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRWxCLGVBQUksT0FBSyxpQkFBaUIsRUFBRTtBQUMxQiw0QkFBZSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsTUFBTTtBQUNMLDRCQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xDOztBQUVELGdCQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUNuQixpQkFBSSxPQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDbEMsOEJBQWUsQ0FBQyxPQUFPLENBQUUsY0FBSSxFQUFJO0FBQy9CLHFCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkMscUJBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztzQ0FDbUMsT0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDO3FCQUF0RSxNQUFNLGtCQUFOLE1BQU07cUJBQUUsZUFBZSxrQkFBZixlQUFlO3FCQUFFLGVBQWUsa0JBQWYsZUFBZTtxQkFBRSxNQUFNLGtCQUFOLE1BQU07O0FBQ3hELHFCQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsdUJBQUcsZUFBZSxJQUFJLE1BQU0sRUFBRTtBQUM1Qiw4QkFBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO29CQUNyRDtBQUNELHVCQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDaEUsMEJBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2Q7a0JBQ0Y7Z0JBQ0YsQ0FBQyxDQUFDO0FBQ0gsbUJBQUksS0FBSyxFQUFFLE1BQU07Y0FDbEI7WUFDRjtBQUNELGtCQUFPLEtBQUssQ0FBQztVQUNkLENBQUMsQ0FBQztBQUNILGFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3hCO01BQ0Y7OztZQUV3QixxQ0FBRztBQUMxQixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN6QyxjQUFPLEtBQUssQ0FBQztNQUNkOzs7WUFFRSxlQUFHO0FBQ0osV0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRXpDLFdBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7O0FBRXBDLFdBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUN6QyxnQkFBTyxLQUFLLENBQUM7UUFDZCxNQUFNO0FBQ0wsYUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGNBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNELGlCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLGVBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFDLE1BQU07VUFDakM7QUFDRCxnQkFBTyxNQUFNLENBQUM7UUFDZjtNQUNGOzs7WUFFVSx1QkFBRztBQUNaLGNBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztNQUN0Qjs7O1lBRVMsc0JBQUc7QUFDWCxjQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztNQUM1Qzs7O1lBRVkseUJBQUc7QUFDZCxjQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7TUFDOUQ7OztZQUVXLHdCQUFHO0FBQ2IsY0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNsQyxnQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDVjs7O1VBL1dVLGNBQWM7Ozs7O0FBa1gzQixFOzs7Ozs7QUN6WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFHO0FBQ0gscUJBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pTQSxLQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBQztBQUMvQixPQUFJLFNBQVMsR0FBRyxtQkFBTyxDQUFDLEVBQWEsQ0FBQyxDQUFDO0FBQ3ZDLE9BQUks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QUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QyxzQ0FBaUIsR0FBRyxJQUFJLENBQUM7QUFDekIsMkJBQU07a0JBQ1Q7Y0FDSjtBQUNELGlCQUFJLENBQUMsaUJBQWlCLEVBQUU7QUFDcEIsd0JBQU8sSUFBSSxLQUFLLDREQUEwRCxnQkFBZ0IsQ0FBRyxDQUFDO2NBQ2pHO1VBQ0o7TUFDSjtBQUNELGdCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDbkMsZUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0VBQ3JDLENBQUM7O0FBRUYsYUFBWSxDQUFDLFlBQVksR0FBRztBQUN4QixVQUFLLEVBQUUsbUJBQU0sWUFBWTtFQUM1QixDQUFDOztzQkFFYSxZQUFZIiwiZmlsZSI6InJlYWN0LWJvb3RzdHJhcC10YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0Qm9vdHN0cmFwVGFibGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3RCb290c3RyYXBUYWJsZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdLCByb290W1wiUmVhY3RET01cIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwODg0MDE5NDA5ZTJhMTkzNzA5Y1xuICoqLyIsImltcG9ydCBCb290c3RyYXBUYWJsZSBmcm9tICcuL0Jvb3RzdHJhcFRhYmxlJztcbmltcG9ydCBUYWJsZUhlYWRlckNvbHVtbiBmcm9tICcuL1RhYmxlSGVhZGVyQ29sdW1uJztcbmltcG9ydCB7VGFibGVEYXRhU2V0fSBmcm9tICcuL3N0b3JlL1RhYmxlRGF0YVN0b3JlJztcblxuaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xuICB3aW5kb3cuQm9vdHN0cmFwVGFibGUgPSBCb290c3RyYXBUYWJsZTtcbiAgd2luZG93LlRhYmxlSGVhZGVyQ29sdW1uID0gVGFibGVIZWFkZXJDb2x1bW47XG4gIHdpbmRvdy5UYWJsZURhdGFTZXQgPSBUYWJsZURhdGFTZXQ7XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIEJvb3RzdHJhcFRhYmxlLFxuICBUYWJsZUhlYWRlckNvbHVtbixcbiAgVGFibGVEYXRhU2V0XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IFRhYmxlSGVhZGVyIGZyb20gJy4vVGFibGVIZWFkZXInO1xuaW1wb3J0IFRhYmxlQm9keSBmcm9tICcuL1RhYmxlQm9keSc7XG5pbXBvcnQgUGFnaW5hdGlvbkxpc3QgZnJvbSAnLi9wYWdpbmF0aW9uL1BhZ2luYXRpb25MaXN0JztcbmltcG9ydCBUb29sQmFyIGZyb20gJy4vdG9vbGJhci9Ub29sQmFyJztcbmltcG9ydCBUYWJsZUZpbHRlciBmcm9tICcuL1RhYmxlRmlsdGVyJztcbmltcG9ydCB7VGFibGVEYXRhU3RvcmV9IGZyb20gJy4vc3RvcmUvVGFibGVEYXRhU3RvcmUnO1xuaW1wb3J0IGV4cG9ydENTViBmcm9tICcuL2Nzdl9leHBvcnRfdXRpbCc7XG5pbXBvcnQge0ZpbHRlcn0gZnJvbSAnLi9GaWx0ZXInO1xuXG5jbGFzcyBCb290c3RyYXBUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLl9hdHRhY2hDZWxsRWRpdEZ1bmMoKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmRhdGEpKSB7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IFRhYmxlRGF0YVN0b3JlKHRoaXMucHJvcHMuZGF0YS5nZXREYXRhKCkpO1xuICAgICAgdGhpcy5wcm9wcy5kYXRhLmNsZWFyKCk7XG4gICAgICB0aGlzLnByb3BzLmRhdGEub24oJ2NoYW5nZScsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5nZXRUYWJsZURhdGEoKVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjb3B5ID0gdGhpcy5wcm9wcy5kYXRhLnNsaWNlKCk7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IFRhYmxlRGF0YVN0b3JlKGNvcHkpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdFRhYmxlKHRoaXMucHJvcHMpO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuZmlsdGVyLm9uKCdvbkZpbHRlckNoYW5nZScsIChjdXJyZW50RmlsdGVyKSA9PiB7XG4gICAgICAgIHNlbGYuaGFuZGxlRmlsdGVyRGF0YShjdXJyZW50RmlsdGVyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdyAmJiB0aGlzLnByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZCkge1xuICAgICAgbGV0IGNvcHkgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZC5zbGljZSgpO1xuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjb3B5KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZGF0YTogdGhpcy5nZXRUYWJsZURhdGEoKSxcbiAgICAgIHNlbGVjdGVkUm93S2V5czogdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKVxuICAgIH07XG4gIH1cblxuICBpbml0VGFibGUocHJvcHMpe1xuICAgIGxldCB7a2V5RmllbGR9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBpc0tleUZpZWxkRGVmaW5lZCA9IHR5cGVvZiBrZXlGaWVsZCA9PT0gJ3N0cmluZycgJiYga2V5RmllbGQubGVuZ3RoO1xuICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2gocHJvcHMuY2hpbGRyZW4sIGNvbHVtbj0+IHtcbiAgICAgIGlmIChjb2x1bW4ucHJvcHMuaXNLZXkpIHtcbiAgICAgICAgaWYgKGtleUZpZWxkKSB7XG4gICAgICAgICAgdGhyb3cgXCJFcnJvci4gTXVsdGlwbGUga2V5IGNvbHVtbiBiZSBkZXRlY3RlZCBpbiBUYWJsZUhlYWRlckNvbHVtbi5cIjtcbiAgICAgICAgfVxuICAgICAgICBrZXlGaWVsZCA9IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uLnByb3BzLmZpbHRlcikge1xuICAgICAgICAvLyBhIGNvbHVtbiBjb250YWlucyBhIGZpbHRlclxuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICAgICAgLy8gZmlyc3QgdGltZSBjcmVhdGUgdGhlIGZpbHRlciBvbiB0aGUgQm9vdHN0cmFwVGFibGVcbiAgICAgICAgICB0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXNzIHRoZSBmaWx0ZXIgdG8gY29sdW1uIHdpdGggZmlsdGVyXG4gICAgICAgIGNvbHVtbi5wcm9wcy5maWx0ZXIuZW1pdHRlciA9IHRoaXMuZmlsdGVyO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgbGV0IGNvbEluZm9zID0gdGhpcy5nZXRDb2x1bW5zRGVzY3JpcHRpb24ocHJvcHMpLnJlZHVjZSgoIHByZXYsIGN1cnIgKSA9PiB7XG4gICAgICBwcmV2W2N1cnIubmFtZV0gPSBjdXJyO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xuXG4gICAgaWYgKCFpc0tleUZpZWxkRGVmaW5lZCAmJiAha2V5RmllbGQpXG4gICAgICB0aHJvdyBgRXJyb3IuIE5vIGFueSBrZXkgY29sdW1uIGRlZmluZWQgaW4gVGFibGVIZWFkZXJDb2x1bW4uXG4gICAgICAgICAgICBVc2UgJ2lzS2V5PXt0cnVlfScgdG8gc3BlY2lmeSBhIHVuaXF1ZSBjb2x1bW4gYWZ0ZXIgdmVyc2lvbiAwLjUuNC5gO1xuXG4gICAgdGhpcy5zdG9yZS5zZXRQcm9wcyh7XG4gICAgICBpc1BhZ2luYXRpb246IHByb3BzLnBhZ2luYXRpb24sXG4gICAgICBrZXlGaWVsZDoga2V5RmllbGQsXG4gICAgICBjb2xJbmZvczogY29sSW5mb3MsXG4gICAgICBtdWx0aUNvbHVtblNlYXJjaDogcHJvcHMubXVsdGlDb2x1bW5TZWFyY2gsXG4gICAgICByZW1vdGU6IHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKClcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRhYmxlRGF0YSgpIHtcbiAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgIGlmKHRoaXMucHJvcHMub3B0aW9ucy5zb3J0TmFtZSAmJiB0aGlzLnByb3BzLm9wdGlvbnMuc29ydE9yZGVyKVxuICAgICAgIHRoaXMuc3RvcmUuc29ydCh0aGlzLnByb3BzLm9wdGlvbnMuc29ydE9yZGVyLCB0aGlzLnByb3BzLm9wdGlvbnMuc29ydE5hbWUpO1xuXG4gICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgICBsZXQgcGFnZSwgc2l6ZVBlclBhZ2U7XG4gICAgICAgaWYgKHRoaXMuc3RvcmUuaXNDaGFuZ2VkUGFnZSgpKSB7XG4gICAgICAgICBzaXplUGVyUGFnZSA9IHRoaXMucmVmcy5wYWdpbmF0aW9uLmdldFNpemVQZXJQYWdlKCk7XG4gICAgICAgICBwYWdlID0gdGhpcy5yZWZzLnBhZ2luYXRpb24uZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgc2l6ZVBlclBhZ2UgPSB0aGlzLnByb3BzLm9wdGlvbnMuc2l6ZVBlclBhZ2UgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUWzBdO1xuICAgICAgICAgcGFnZSA9IHRoaXMucHJvcHMub3B0aW9ucy5wYWdlIHx8IDE7XG4gICAgICAgfVxuICAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZShwYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICAgfVxuICAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q29sdW1uc0Rlc2NyaXB0aW9uKHsgY2hpbGRyZW4gfSkge1xuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogY29sdW1uLnByb3BzLmRhdGFGaWVsZCxcbiAgICAgICAgYWxpZ246IGNvbHVtbi5wcm9wcy5kYXRhQWxpZ24sXG4gICAgICAgIHNvcnQ6IGNvbHVtbi5wcm9wcy5kYXRhU29ydCxcbiAgICAgICAgZm9ybWF0OiBjb2x1bW4ucHJvcHMuZGF0YUZvcm1hdCxcbiAgICAgICAgZm9ybWF0RXh0cmFEYXRhOiBjb2x1bW4ucHJvcHMuZm9ybWF0RXh0cmFEYXRhLFxuICAgICAgICBmaWx0ZXJGb3JtYXR0ZWQ6IGNvbHVtbi5wcm9wcy5maWx0ZXJGb3JtYXR0ZWQsXG4gICAgICAgIGVkaXRhYmxlOiBjb2x1bW4ucHJvcHMuZWRpdGFibGUsXG4gICAgICAgIGhpZGRlbjogY29sdW1uLnByb3BzLmhpZGRlbixcbiAgICAgICAgY2xhc3NOYW1lOiBjb2x1bW4ucHJvcHMuY29sdW1uQ2xhc3NOYW1lLFxuICAgICAgICB3aWR0aDogY29sdW1uLnByb3BzLndpZHRoLFxuICAgICAgICB0ZXh0OiBjb2x1bW4ucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIHNvcnRGdW5jOiBjb2x1bW4ucHJvcHMuc29ydEZ1bmMsXG4gICAgICAgIGluZGV4OiBpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICB0aGlzLmluaXRUYWJsZShuZXh0UHJvcHMpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5leHRQcm9wcy5kYXRhKSkge1xuICAgICAgdGhpcy5zdG9yZS5zZXREYXRhKG5leHRQcm9wcy5kYXRhLnNsaWNlKCkpO1xuICAgICAgbGV0IHBhZ2luYXRpb25Eb20gPSB0aGlzLnJlZnMucGFnaW5hdGlvbjtcbiAgICAgIGxldCBwYWdlID0gcGFnaW5hdGlvbkRvbSAmJiBwYWdpbmF0aW9uRG9tLmdldEN1cnJlbnRQYWdlKCkgfHwgbmV4dFByb3BzLm9wdGlvbnMucGFnZSB8fCAxO1xuICAgICAgbGV0IHNpemVQZXJQYWdlID0gcGFnaW5hdGlvbkRvbSAmJiBwYWdpbmF0aW9uRG9tLmdldFNpemVQZXJQYWdlKCkgfHwgbmV4dFByb3BzLm9wdGlvbnMuc2l6ZVBlclBhZ2UgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUWzBdO1xuICAgICAgLy8gIzEyNVxuICAgICAgaWYocGFnZSA+IE1hdGguY2VpbChuZXh0UHJvcHMuZGF0YS5sZW5ndGggLyBzaXplUGVyUGFnZSkpIHBhZ2UgPSAxO1xuICAgICAgbGV0IHNvcnRJbmZvID0gdGhpcy5zdG9yZS5nZXRTb3J0SW5mbygpO1xuICAgICAgbGV0IHNvcnRGaWVsZCA9IG5leHRQcm9wcy5vcHRpb25zLnNvcnROYW1lIHx8IChzb3J0SW5mbyA/IHNvcnRJbmZvLnNvcnRGaWVsZCA6IHVuZGVmaW5lZCk7XG4gICAgICBsZXQgc29ydE9yZGVyID0gbmV4dFByb3BzLm9wdGlvbnMuc29ydE9yZGVyIHx8IChzb3J0SW5mbyA/IHNvcnRJbmZvLm9yZGVyIDogdW5kZWZpbmVkKTtcbiAgICAgIGlmKHNvcnRGaWVsZCAmJiBzb3J0T3JkZXIpIHRoaXMuc3RvcmUuc29ydChzb3J0T3JkZXIsIHNvcnRGaWVsZCk7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMuc3RvcmUucGFnZShwYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0Um93ICYmIG5leHRQcm9wcy5zZWxlY3RSb3cuc2VsZWN0ZWQpIHtcbiAgICAgIC8vc2V0IGRlZmF1bHQgc2VsZWN0IHJvd3MgdG8gc3RvcmUuXG4gICAgICBsZXQgY29weSA9IG5leHRQcm9wcy5zZWxlY3RSb3cuc2VsZWN0ZWQuc2xpY2UoKTtcbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoY29weSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBjb3B5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCk7XG4gICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsSGVhZGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCk7XG4gICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsSGVhZGVyKTtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnJlbW92ZUFsbExpc3RlbmVycyhcIm9uRmlsdGVyQ2hhbmdlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCgpO1xuICAgIHRoaXMuX2F0dGFjaENlbGxFZGl0RnVuYygpO1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJUYWJsZUNvbXBsZXRlKVxuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyVGFibGVDb21wbGV0ZSgpO1xuICB9XG5cbiAgX2F0dGFjaENlbGxFZGl0RnVuYygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jZWxsRWRpdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsRWRpdC5fX29uQ29tcGxldGVFZGl0X18gPSB0aGlzLmhhbmRsZUVkaXRDZWxsLmJpbmQodGhpcyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlICE9PSBDb25zdC5DRUxMX0VESVRfTk9ORSlcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgaW4gdGhlIGN1cnJlbnQgY29uZmlndXJhdGlvbixcbiAgICogdGhlIGRhdGFncmlkIHNob3VsZCBsb2FkIGl0cyBkYXRhIHJlbW90ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbcHJvcHNdIE9wdGlvbmFsLiBJZiBub3QgZ2l2ZW4sIHRoaXMucHJvcHMgd2lsbCBiZSB1c2VkXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBpc1JlbW90ZURhdGFTb3VyY2UocHJvcHMpIHtcbiAgICByZXR1cm4gKHByb3BzIHx8IHRoaXMucHJvcHMpLnJlbW90ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHZhciB0YWJsZUNsYXNzID0gY2xhc3NTZXQoXCJyZWFjdC1icy10YWJsZVwiKTtcbiAgICB2YXIgY2hpbGRyZW5zID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiB0aGlzLnByb3BzLm1heEhlaWdodFxuICAgIH07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICBjaGlsZHJlbnMgPSBbdGhpcy5wcm9wcy5jaGlsZHJlbl07XG4gICAgfVxuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXRDb2x1bW5zRGVzY3JpcHRpb24odGhpcy5wcm9wcyk7XG4gICAgdmFyIHNvcnRJbmZvID0gdGhpcy5zdG9yZS5nZXRTb3J0SW5mbygpO1xuICAgIHZhciBwYWdpbmF0aW9uID0gdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCk7XG4gICAgdmFyIHRvb2xCYXIgPSB0aGlzLnJlbmRlclRvb2xCYXIoKTtcbiAgICB2YXIgdGFibGVGaWx0ZXIgPSB0aGlzLnJlbmRlclRhYmxlRmlsdGVyKGNvbHVtbnMpO1xuICAgIHZhciBpc1NlbGVjdEFsbCA9IHRoaXMuaXNTZWxlY3RBbGwoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1icy1jb250YWluZXJcIiByZWY9XCJ0YWJsZVwiPlxuICAgICAgICB7dG9vbEJhcn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1icy10YWJsZS1jb250YWluZXJcIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgIDxUYWJsZUhlYWRlclxuICAgICAgICAgICAgcmVmPVwiaGVhZGVyXCJcbiAgICAgICAgICAgIHJvd1NlbGVjdFR5cGU9e3RoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGV9XG4gICAgICAgICAgICBoaWRlU2VsZWN0Q29sdW1uPXt0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1ufVxuICAgICAgICAgICAgc29ydE5hbWU9e3NvcnRJbmZvID8gc29ydEluZm8uc29ydEZpZWxkIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgc29ydE9yZGVyPXtzb3J0SW5mbyA/IHNvcnRJbmZvLm9yZGVyIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgb25Tb3J0PXt0aGlzLmhhbmRsZVNvcnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2VsZWN0QWxsUm93PXt0aGlzLmhhbmRsZVNlbGVjdEFsbFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgYm9yZGVyZWQ9e3RoaXMucHJvcHMuYm9yZGVyZWR9XG4gICAgICAgICAgICBjb25kZW5zZWQ9e3RoaXMucHJvcHMuY29uZGVuc2VkfVxuICAgICAgICAgICAgaXNGaWx0ZXJlZD17dGhpcy5maWx0ZXIgPyB0cnVlIDogZmFsc2V9XG4gICAgICAgICAgICBpc1NlbGVjdEFsbD17aXNTZWxlY3RBbGx9PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICA8VGFibGVCb2R5XG4gICAgICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuICAgICAgICAgICAgbWF4SGVpZ2h0PXt0aGlzLnByb3BzLm1heEhlaWdodH1cbiAgICAgICAgICAgIHJlZj1cImJvZHlcIlxuICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5kYXRhfVxuICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgIHRyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRyQ2xhc3NOYW1lfVxuICAgICAgICAgICAgc3RyaXBlZD17dGhpcy5wcm9wcy5zdHJpcGVkfVxuICAgICAgICAgICAgYm9yZGVyZWQ9e3RoaXMucHJvcHMuYm9yZGVyZWR9XG4gICAgICAgICAgICBob3Zlcj17dGhpcy5wcm9wcy5ob3Zlcn1cbiAgICAgICAgICAgIGtleUZpZWxkPXt0aGlzLnN0b3JlLmdldEtleUZpZWxkKCl9XG4gICAgICAgICAgICBjb25kZW5zZWQ9e3RoaXMucHJvcHMuY29uZGVuc2VkfVxuICAgICAgICAgICAgc2VsZWN0Um93PXt0aGlzLnByb3BzLnNlbGVjdFJvd31cbiAgICAgICAgICAgIGNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0fVxuICAgICAgICAgICAgc2VsZWN0ZWRSb3dLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkUm93S2V5c31cbiAgICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2VsZWN0Um93PXt0aGlzLmhhbmRsZVNlbGVjdFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgbm9EYXRhVGV4dD17dGhpcy5wcm9wcy5vcHRpb25zLm5vRGF0YVRleHR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0YWJsZUZpbHRlcn1cbiAgICAgICAge3BhZ2luYXRpb259XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBpc1NlbGVjdEFsbCgpe1xuICAgIHZhciBkZWZhdWx0U2VsZWN0Um93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgdmFyIGFsbFJvd0tleXMgPSB0aGlzLnN0b3JlLmdldEFsbFJvd2tleSgpO1xuICAgIGlmKGRlZmF1bHRTZWxlY3RSb3dLZXlzLmxlbmd0aCAhPT0gYWxsUm93S2V5cy5sZW5ndGgpe1xuICAgICAgcmV0dXJuIGRlZmF1bHRTZWxlY3RSb3dLZXlzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogJ2luZGV0ZXJtaW5hdGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjbGVhblNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoW10pO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBbXVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU29ydChvcmRlciwgc29ydEZpZWxkKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vblNvcnRDaGFuZ2Uoc29ydEZpZWxkLCBvcmRlciwgdGhpcy5wcm9wcyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuc3RvcmUuc29ydChvcmRlciwgc29ydEZpZWxkKS5nZXQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnaW5hdGlvbkRhdGEocGFnZSwgc2l6ZVBlclBhZ2UpIHtcbiAgICBjb25zdCB7b25QYWdlQ2hhbmdlfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICBpZiAob25QYWdlQ2hhbmdlKSB7XG4gICAgICBvblBhZ2VDaGFuZ2UocGFnZSwgc2l6ZVBlclBhZ2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZShwYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHRcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVJvd0NsaWNrKHJvdykge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uUm93Q2xpY2socm93KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3RBbGxSb3coZSkge1xuICAgIHZhciBpc1NlbGVjdGVkID0gZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQ7XG4gICAgbGV0IHNlbGVjdGVkUm93S2V5cyA9IFtdO1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdEFsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3RBbGwoaXNTZWxlY3RlZCxcbiAgICAgICAgaXNTZWxlY3RlZCA/IHRoaXMuc3RvcmUuZ2V0KCkgOiBbXSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnIHx8IHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGVkUm93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0QWxsUm93a2V5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoc2VsZWN0ZWRSb3dLZXlzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHNlbGVjdGVkUm93S2V5c1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2hvd09ubHlTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3JlLmlnbm9yZU5vblNlbGVjdGVkKCk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBsZXQgc2l6ZVBlclBhZ2UgPSB0aGlzLnJlZnMucGFnaW5hdGlvbi5nZXRTaXplUGVyUGFnZSgpO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKDEsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICAgIHRoaXMucmVmcy5wYWdpbmF0aW9uLmNoYW5nZVBhZ2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3cocm93LCBpc1NlbGVjdGVkKSB7XG4gICAgbGV0IGN1cnJTZWxlY3RlZCA9IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgbGV0IHJvd0tleSA9IHJvd1t0aGlzLnN0b3JlLmdldEtleUZpZWxkKCldO1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3Qocm93LCBpc1NlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcgfHwgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGUgPT09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZCA9IGlzU2VsZWN0ZWQgPyBbcm93S2V5XSA6IFtdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgIGN1cnJTZWxlY3RlZC5wdXNoKHJvd0tleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyclNlbGVjdGVkID0gY3VyclNlbGVjdGVkLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcm93S2V5ICE9PSBrZXk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjdXJyU2VsZWN0ZWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlbGVjdGVkUm93S2V5czogY3VyclNlbGVjdGVkXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbChuZXdWYWwsIHJvd0luZGV4LCBjb2xJbmRleCkge1xuICAgIGxldCBmaWVsZE5hbWU7XG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCBmdW5jdGlvbiAoY29sdW1uLCBpKSB7XG4gICAgICBpZiAoaSA9PSBjb2xJbmRleCkge1xuICAgICAgICBmaWVsZE5hbWUgPSBjb2x1bW4ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5zdG9yZS5lZGl0KG5ld1ZhbCwgcm93SW5kZXgsIGZpZWxkTmFtZSkuZ2V0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHRcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLmNlbGxFZGl0LmFmdGVyU2F2ZUNlbGwpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbEVkaXQuYWZ0ZXJTYXZlQ2VsbCh0aGlzLnN0YXRlLmRhdGFbcm93SW5kZXhdLCBmaWVsZE5hbWUsIG5ld1ZhbCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWRkUm93QmVnaW4oKSB7XG4gICAgaWYgKHRoaXMucmVmcy5ib2R5KSB7XG4gICAgICAvLyB0aGlzLnJlZnMuYm9keS5jYW5jZWxFZGl0KCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWRkUm93KG5ld09iaikge1xuICAgIGxldCBtc2cgPSBudWxsLCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RvcmUuYWRkKG5ld09iaik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgLy9pZiBwYWdpbmF0aW9uIGlzIGVuYWJsZWQgYW5kIGluc2VydCByb3cgYmUgdHJpZ2dlciwgY2hhbmdlIHRvIGxhc3QgcGFnZVxuICAgICAgbGV0IHNpemVQZXJQYWdlID0gdGhpcy5yZWZzLnBhZ2luYXRpb24uZ2V0U2l6ZVBlclBhZ2UoKTtcbiAgICAgIGxldCBjdXJyTGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zdG9yZS5nZXREYXRhTnVtKCkgLyBzaXplUGVyUGFnZSk7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoY3Vyckxhc3RQYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVmcy5wYWdpbmF0aW9uLmNoYW5nZVBhZ2UoY3Vyckxhc3RQYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJJbnNlcnRSb3cpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckluc2VydFJvdyhuZXdPYmopO1xuICAgIH1cbiAgfVxuXG4gIGdldFNpemVQZXJQYWdlKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnMucGFnaW5hdGlvbi5nZXRTaXplUGVyUGFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRQYWdlKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnMucGFnaW5hdGlvbi5nZXRDdXJyZW50UGFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURyb3BSb3cocm93S2V5cykge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgZHJvcFJvd0tleXMgPSByb3dLZXlzP3Jvd0tleXM6dGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKTtcbiAgICAvL2FkZCBjb25maXJtIGJlZm9yZSB0aGUgZGVsZXRlIGFjdGlvbiBpZiB0aGF0IG9wdGlvbiBpcyBzZXQuXG4gICAgaWYgKGRyb3BSb3dLZXlzICYmIGRyb3BSb3dLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuaGFuZGxlQ29uZmlybURlbGV0ZVJvdyl7XG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5oYW5kbGVDb25maXJtRGVsZXRlUm93KFxuICAgICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVJvdyhkcm9wUm93S2V5cyk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmUgd2FudCBkZWxldGU/JykpIHtcbiAgICAgICAgdGhpcy5kZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVJvdyhkcm9wUm93S2V5cyl7XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIHRoaXMuc3RvcmUucmVtb3ZlKGRyb3BSb3dLZXlzKTsgIC8vcmVtb3ZlIHNlbGVjdGVkIFJvd1xuICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoW10pOyAgLy9jbGVhciBzZWxlY3RlZCByb3cga2V5XG5cbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBsZXQgc2l6ZVBlclBhZ2UgPSB0aGlzLnJlZnMucGFnaW5hdGlvbi5nZXRTaXplUGVyUGFnZSgpO1xuICAgICAgbGV0IGN1cnJMYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLnN0b3JlLmdldERhdGFOdW0oKSAvIHNpemVQZXJQYWdlKTtcbiAgICAgIGxldCBjdXJyZW50UGFnZSA9IHRoaXMucmVmcy5wYWdpbmF0aW9uLmdldEN1cnJlbnRQYWdlKCk7XG4gICAgICBpZiAoY3VycmVudFBhZ2UgPiBjdXJyTGFzdFBhZ2UpXG4gICAgICAgIGN1cnJlbnRQYWdlID0gY3Vyckxhc3RQYWdlO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKGN1cnJlbnRQYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKClcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZWZzLnBhZ2luYXRpb24uY2hhbmdlUGFnZShjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyRGVsZXRlUm93KSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJEZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgIH1cblxuICB9XG5cbiAgaGFuZGxlRmlsdGVyRGF0YShmaWx0ZXJPYmopIHtcbiAgICB0aGlzLnN0b3JlLmZpbHRlcihmaWx0ZXJPYmopO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgbGV0IHNpemVQZXJQYWdlID0gdGhpcy5yZWZzLnBhZ2luYXRpb24uZ2V0U2l6ZVBlclBhZ2UoKTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZSgxLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnJlZnMucGFnaW5hdGlvbi5jaGFuZ2VQYWdlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJDb2x1bW5GaWx0ZXIpXG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJDb2x1bW5GaWx0ZXIoZmlsdGVyT2JqLFxuICAgICAgICB0aGlzLnN0b3JlLmdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHRcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUV4cG9ydENTVigpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCk7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB0aGlzLnByb3BzLmNoaWxkcmVuLm1hcChmdW5jdGlvbihjb2x1bW4pIHtcbiAgICAgIGlmIChjb2x1bW4ucHJvcHMuaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICBrZXlzLnB1c2goY29sdW1uLnByb3BzLmRhdGFGaWVsZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZXhwb3J0Q1NWKHJlc3VsdCwga2V5cywgdGhpcy5wcm9wcy5jc3ZGaWxlTmFtZSk7XG4gIH1cblxuICBoYW5kbGVTZWFyY2goc2VhcmNoVGV4dCkge1xuICAgIHRoaXMuc3RvcmUuc2VhcmNoKHNlYXJjaFRleHQpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgbGV0IHNpemVQZXJQYWdlID0gdGhpcy5yZWZzLnBhZ2luYXRpb24uZ2V0U2l6ZVBlclBhZ2UoKTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZSgxLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnJlZnMucGFnaW5hdGlvbi5jaGFuZ2VQYWdlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJTZWFyY2gpXG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJTZWFyY2goc2VhcmNoVGV4dCwgdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJQYWdpbmF0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIGxldCBkYXRhU2l6ZTtcbiAgICAgIGlmICh0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpKSB7XG4gICAgICAgIGRhdGFTaXplID0gdGhpcy5wcm9wcy5mZXRjaEluZm8uZGF0YVRvdGFsU2l6ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFTaXplID0gdGhpcy5zdG9yZS5nZXREYXRhTnVtKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWZvb3Rlci1wYWdpbmF0aW9uXCI+XG4gICAgICAgICAgPFBhZ2luYXRpb25MaXN0XG4gICAgICAgICAgICByZWY9XCJwYWdpbmF0aW9uXCJcbiAgICAgICAgICAgIGN1cnJQYWdlPXt0aGlzLnByb3BzLm9wdGlvbnMucGFnZSB8fCAxfVxuICAgICAgICAgICAgY2hhbmdlUGFnZT17dGhpcy5oYW5kbGVQYWdpbmF0aW9uRGF0YS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZSB8fCBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1RbMF19XG4gICAgICAgICAgICBzaXplUGVyUGFnZUxpc3Q9e3RoaXMucHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZUxpc3QgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUfVxuICAgICAgICAgICAgcGFnaW5hdGlvblNpemU9e3RoaXMucHJvcHMub3B0aW9ucy5wYWdpbmF0aW9uU2l6ZSB8fCBDb25zdC5QQUdJTkFUSU9OX1NJWkV9XG4gICAgICAgICAgICByZW1vdGU9e3RoaXMuaXNSZW1vdGVEYXRhU291cmNlKCl9XG4gICAgICAgICAgICBkYXRhU2l6ZT17ZGF0YVNpemV9XG4gICAgICAgICAgICBvblNpemVQZXJQYWdlTGlzdD17dGhpcy5wcm9wcy5vcHRpb25zLm9uU2l6ZVBlclBhZ2VMaXN0fVxuICAgICAgICAgICAgcHJlUGFnZT17dGhpcy5wcm9wcy5vcHRpb25zLnByZVBhZ2UgfHwgQ29uc3QuUFJFX1BBR0V9XG4gICAgICAgICAgICBuZXh0UGFnZT17dGhpcy5wcm9wcy5vcHRpb25zLm5leHRQYWdlIHx8IENvbnN0Lk5FWFRfUEFHRX1cbiAgICAgICAgICAgIGZpcnN0UGFnZT17dGhpcy5wcm9wcy5vcHRpb25zLmZpcnN0UGFnZSB8fCBDb25zdC5GSVJTVF9QQUdFfVxuICAgICAgICAgICAgbGFzdFBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5sYXN0UGFnZSB8fCBDb25zdC5MQVNUX1BBR0V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlclRvb2xCYXIoKSB7XG4gICAgbGV0IGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdFJvdyAmJiB0aGlzLnByb3BzLnNlbGVjdFJvdy5zaG93T25seVNlbGVjdGVkO1xuICAgIGlmIChlbmFibGVTaG93T25seVNlbGVjdGVkXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5zZXJ0Um93XG4gICAgICAgIHx8IHRoaXMucHJvcHMuZGVsZXRlUm93XG4gICAgICAgIHx8IHRoaXMucHJvcHMuc2VhcmNoXG4gICAgICAgIHx8IHRoaXMucHJvcHMuZXhwb3J0Q1NWKSB7XG4gICAgICBsZXQgY29sdW1ucztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICAgIGNvbHVtbnMgPSB0aGlzLnByb3BzLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY29sdW1uKSB7XG4gICAgICAgICAgdmFyIHByb3BzID0gY29sdW1uLnByb3BzO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICAgIGZpZWxkOiBwcm9wcy5kYXRhRmllbGQsXG4gICAgICAgICAgICAvL3doZW4geW91IHdhbnQgc2FtZSBhdXRvIGdlbmVyYXRlIHZhbHVlIGFuZCBub3QgYWxsb3cgZWRpdCwgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICAgICAgYXV0b1ZhbHVlOiBwcm9wcy5hdXRvVmFsdWUgfHwgZmFsc2UsXG4gICAgICAgICAgICAvL2ZvciBjcmVhdGUgZWRpdG9yLCBubyBwYXJhbXMgZm9yIGNvbHVtbi5lZGl0YWJsZSgpIGluZGljYXRlIHRoYXQgZWRpdG9yIGZvciBuZXcgcm93XG4gICAgICAgICAgICBlZGl0YWJsZTogcHJvcHMuZWRpdGFibGUgJiYgKHR5cGVvZiBwcm9wcy5lZGl0YWJsZSA9PT0gXCJmdW5jdGlvblwiKSA/IHByb3BzLmVkaXRhYmxlKCkgOiBwcm9wcy5lZGl0YWJsZSxcbiAgICAgICAgICAgIGZvcm1hdDogcHJvcHMuZGF0YUZvcm1hdCA/IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLmRhdGFGb3JtYXQodmFsdWUsIG51bGwsIHByb3BzLmZvcm1hdEV4dHJhRGF0YSkucmVwbGFjZSgvPC4qPz4vZywnJyk7XG4gICAgICAgICAgICB9IDogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbnMgPSBbe1xuICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgZmllbGQ6IHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuZGF0YUZpZWxkLFxuICAgICAgICAgIGVkaXRhYmxlOiB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmVkaXRhYmxlXG4gICAgICAgIH1dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sLWJhclwiPlxuICAgICAgICAgIDxUb29sQmFyXG4gICAgICAgICAgICBjbGVhclNlYXJjaD17dGhpcy5wcm9wcy5vcHRpb25zLmNsZWFyU2VhcmNofVxuICAgICAgICAgICAgZW5hYmxlSW5zZXJ0PXt0aGlzLnByb3BzLmluc2VydFJvd31cbiAgICAgICAgICAgIGVuYWJsZURlbGV0ZT17dGhpcy5wcm9wcy5kZWxldGVSb3d9XG4gICAgICAgICAgICBlbmFibGVTZWFyY2g9e3RoaXMucHJvcHMuc2VhcmNofVxuICAgICAgICAgICAgZW5hYmxlRXhwb3J0Q1NWPXt0aGlzLnByb3BzLmV4cG9ydENTVn1cbiAgICAgICAgICAgIGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ9e2VuYWJsZVNob3dPbmx5U2VsZWN0ZWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICBvbkFkZFJvdz17dGhpcy5oYW5kbGVBZGRSb3cuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uQWRkUm93QmVnaW49e3RoaXMuaGFuZGxlQWRkUm93QmVnaW4uYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uRHJvcFJvdz17dGhpcy5oYW5kbGVEcm9wUm93LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblNlYXJjaD17dGhpcy5oYW5kbGVTZWFyY2guYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uRXhwb3J0Q1NWPXt0aGlzLmhhbmRsZUV4cG9ydENTVi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25TaG93T25seVNlbGVjdGVkPXt0aGlzLmhhbmRsZVNob3dPbmx5U2VsZWN0ZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVGFibGVGaWx0ZXIoY29sdW1ucykge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbHVtbkZpbHRlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRhYmxlRmlsdGVyIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgICAgICAgICByb3dTZWxlY3RUeXBlPXt0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlfVxuICAgICAgICAgICAgICAgICAgICAgb25GaWx0ZXI9e3RoaXMuaGFuZGxlRmlsdGVyRGF0YS5iaW5kKHRoaXMpfS8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBfc2Nyb2xsSGVhZGVyID0gKGUpID0+IHtcbiAgICB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuY29udGFpbmVyLnNjcm9sbExlZnQgPSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsTGVmdDtcbiAgfVxuXG4gIF9hZGp1c3RIZWFkZXJXaWR0aCA9ICgpID0+IHtcbiAgICB2YXIgdGFibGVIZWFkZXJEb20gPSB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuY29udGFpbmVyLmNoaWxkTm9kZXNbMF07XG4gICAgdmFyIHRhYmxlQm9keURvbSA9IHRoaXMucmVmcy5ib2R5LnJlZnMuY29udGFpbmVyLmNoaWxkTm9kZXNbMF07XG4gICAgaWYodGFibGVIZWFkZXJEb20ub2Zmc2V0V2lkdGggIT09IHRhYmxlQm9keURvbS5vZmZzZXRXaWR0aCl7XG4gICAgICB0YWJsZUhlYWRlckRvbS5zdHlsZS53aWR0aCA9IHRhYmxlQm9keURvbS5vZmZzZXRXaWR0aCArIFwicHhcIjtcbiAgICB9XG4gICAgY29uc3QgaGVhZGVyUHJvcHMgPSB0aGlzLnJlZnMuYm9keS5nZXRCb2R5SGVhZGVyRG9tUHJvcCgpO1xuICAgIHRoaXMucmVmcy5oZWFkZXIuZml0SGVhZGVyKGhlYWRlclByb3BzLFxuICAgICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuc2Nyb2xsSGVpZ2h0ID4gdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuY2xpZW50SGVpZ2h0KTtcbiAgfVxufVxuXG5Cb290c3RyYXBUYWJsZS5wcm9wVHlwZXMgPSB7XG4gIGtleUZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG1heEhlaWdodDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLmFycmF5LCBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XSksXG4gIHJlbW90ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsIC8vIHJlbW90ZSBkYXRhLCBkZWZhdWx0IGlzIGZhbHNlXG4gIHN0cmlwZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBib3JkZXJlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29uZGVuc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgcGFnaW5hdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNlYXJjaFBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RSb3c6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgbW9kZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgIENvbnN0LlJPV19TRUxFQ1RfTk9ORSxcbiAgICAgIENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFLFxuICAgICAgQ29uc3QuUk9XX1NFTEVDVF9NVUxUSVxuICAgIF0pLFxuICAgIGJnQ29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICBvblNlbGVjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGNsaWNrVG9TZWxlY3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGhpZGVTZWxlY3RDb2x1bW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd09ubHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgfSksXG4gIGNlbGxFZGl0OiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIG1vZGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYmx1clRvU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgYWZ0ZXJTYXZlQ2VsbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgfSksXG4gIGluc2VydFJvdzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRlbGV0ZVJvdzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNlYXJjaDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbHVtbkZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHRyQ2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuYW55LFxuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGNsZWFyU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzb3J0TmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzb3J0T3JkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWZ0ZXJUYWJsZUNvbXBsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckRlbGV0ZVJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJJbnNlcnRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckNvbHVtbkZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICBzaXplUGVyUGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYWdpbmF0aW9uU2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBvblNvcnRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUGFnZUNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG5vRGF0YVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGFuZGxlQ29uZmlybURlbGV0ZVJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgcHJlUGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuZXh0UGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaXJzdFBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFzdFBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfSksXG4gIGZldGNoSW5mbzogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBkYXRhVG90YWxTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICB9KSxcbiAgZXhwb3J0Q1NWOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY3N2RmlsZU5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5Cb290c3RyYXBUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGhlaWdodDogXCIxMDAlXCIsXG4gIG1heEhlaWdodDogdW5kZWZpbmVkLFxuICBzdHJpcGVkOiBmYWxzZSxcbiAgYm9yZGVyZWQ6IHRydWUsXG4gIGhvdmVyOiBmYWxzZSxcbiAgY29uZGVuc2VkOiBmYWxzZSxcbiAgcGFnaW5hdGlvbjogZmFsc2UsXG4gIHNlYXJjaFBsYWNlaG9sZGVyOiB1bmRlZmluZWQsXG4gIHNlbGVjdFJvdzoge1xuICAgIG1vZGU6IENvbnN0LlJPV19TRUxFQ1RfTk9ORSxcbiAgICBiZ0NvbG9yOiBDb25zdC5ST1dfU0VMRUNUX0JHX0NPTE9SLFxuICAgIHNlbGVjdGVkOiBbXSxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0QWxsOiB1bmRlZmluZWQsXG4gICAgY2xpY2tUb1NlbGVjdDogZmFsc2UsXG4gICAgaGlkZVNlbGVjdENvbHVtbjogZmFsc2UsXG4gICAgY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsOiBmYWxzZSxcbiAgICBzaG93T25seVNlbGVjdGVkOiBmYWxzZVxuICB9LFxuICBjZWxsRWRpdDoge1xuICAgIG1vZGU6IENvbnN0LkNFTExfRURJVF9OT05FLFxuICAgIGJsdXJUb1NhdmU6IGZhbHNlLFxuICAgIGFmdGVyU2F2ZUNlbGw6IHVuZGVmaW5lZFxuICB9LFxuICBpbnNlcnRSb3c6IGZhbHNlLFxuICBkZWxldGVSb3c6IGZhbHNlLFxuICBzZWFyY2g6IGZhbHNlLFxuICBtdWx0aUNvbHVtblNlYXJjaDogZmFsc2UsXG4gIGNvbHVtbkZpbHRlcjogZmFsc2UsXG4gIHRyQ2xhc3NOYW1lOiAnJyxcbiAgb3B0aW9uczoge1xuICAgIGNsZWFyU2VhcmNoOiBmYWxzZSxcbiAgICBzb3J0TmFtZTogdW5kZWZpbmVkLFxuICAgIHNvcnRPcmRlcjogdW5kZWZpbmVkLFxuICAgIGFmdGVyVGFibGVDb21wbGV0ZTogdW5kZWZpbmVkLFxuICAgIGFmdGVyRGVsZXRlUm93OiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJJbnNlcnRSb3c6IHVuZGVmaW5lZCxcbiAgICBhZnRlclNlYXJjaDogdW5kZWZpbmVkLFxuICAgIGFmdGVyQ29sdW1uRmlsdGVyOiB1bmRlZmluZWQsXG4gICAgb25Sb3dDbGljazogdW5kZWZpbmVkLFxuICAgIHBhZ2U6IHVuZGVmaW5lZCxcbiAgICBzaXplUGVyUGFnZUxpc3Q6IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVCxcbiAgICBzaXplUGVyUGFnZTogdW5kZWZpbmVkLFxuICAgIHBhZ2luYXRpb25TaXplOiBDb25zdC5QQUdJTkFUSU9OX1NJWkUsXG4gICAgb25TaXplUGVyUGFnZUxpc3Q6IHVuZGVmaW5lZCxcbiAgICBub0RhdGFUZXh0OiB1bmRlZmluZWQsXG4gICAgaGFuZGxlQ29uZmlybURlbGV0ZVJvdzogdW5kZWZpbmVkLFxuICAgIHByZVBhZ2U6IENvbnN0LlBSRV9QQUdFLFxuICAgIG5leHRQYWdlOiBDb25zdC5ORVhUX1BBR0UsXG4gICAgZmlyc3RQYWdlOiBDb25zdC5GSVJTVF9QQUdFLFxuICAgIGxhc3RQYWdlOiBDb25zdC5MQVNUX1BBR0VcbiAgfSxcbiAgZmV0Y2hJbmZvOiB7XG4gICAgZGF0YVRvdGFsU2l6ZTogMCxcbiAgfSxcbiAgZXhwb3J0Q1NWOiBmYWxzZSxcbiAgY3N2RmlsZU5hbWU6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwVGFibGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Cb290c3RyYXBUYWJsZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jbGFzc25hbWVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuICBTT1JUX0RFU0M6IFwiZGVzY1wiLFxuICBTT1JUX0FTQzogXCJhc2NcIixcbiAgU0laRV9QRVJfUEFHRTogMTAsXG4gIE5FWFRfUEFHRTogXCI+XCIsXG4gIExBU1RfUEFHRTogXCI+PlwiLFxuICBQUkVfUEFHRTogXCI8XCIsXG4gIEZJUlNUX1BBR0U6IFwiPDxcIixcbiAgUk9XX1NFTEVDVF9CR19DT0xPUjogXCJcIixcbiAgUk9XX1NFTEVDVF9OT05FOiBcIm5vbmVcIixcbiAgUk9XX1NFTEVDVF9TSU5HTEU6IFwicmFkaW9cIixcbiAgUk9XX1NFTEVDVF9NVUxUSTogXCJjaGVja2JveFwiLFxuICBDRUxMX0VESVRfTk9ORTogXCJub25lXCIsXG4gIENFTExfRURJVF9DTElDSzogXCJjbGlja1wiLFxuICBDRUxMX0VESVRfREJDTElDSzogXCJkYmNsaWNrXCIsXG4gIFNJWkVfUEVSX1BBR0VfTElTVDogWzEwLCAyNSwgMzAsIDUwXSxcbiAgUEFHSU5BVElPTl9TSVpFOiA1LFxuICBOT19EQVRBX1RFWFQ6IFwiVGhlcmUgaXMgbm8gZGF0YSB0byBkaXNwbGF5XCIsXG4gIFNIT1dfT05MWV9TRUxFQ1Q6IFwiU2hvdyBTZWxlY3RlZCBPbmx5XCIsXG4gIFNIT1dfQUxMOiBcIlNob3cgQWxsXCIsXG4gIEZJTFRFUl9ERUxBWTogNTAwLFxuICBGSUxURVJfVFlQRToge1xuICAgIFRFWFQ6IFwiVGV4dEZpbHRlclwiLFxuICAgIFNFTEVDVDogXCJTZWxlY3RGaWx0ZXJcIixcbiAgICBOVU1CRVI6IFwiTnVtYmVyRmlsdGVyXCIsXG4gICAgREFURTogXCJEYXRlRmlsdGVyXCIsXG4gICAgQ1VTVE9NOiBcIkN1c3RvbUZpbHRlclwiXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NvbnN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBTZWxlY3RSb3dIZWFkZXJDb2x1bW4gZnJvbSAnLi9TZWxlY3RSb3dIZWFkZXJDb2x1bW4nO1xuXG5jbGFzcyBDaGVja2JveCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7IHRoaXMudXBkYXRlKHRoaXMucHJvcHMuY2hlY2tlZCk7IH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykgeyB0aGlzLnVwZGF0ZShwcm9wcy5jaGVja2VkKTsgfVxuICB1cGRhdGUoY2hlY2tlZCkge1xuICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmluZGV0ZXJtaW5hdGUgPSBjaGVja2VkID09PSAnaW5kZXRlcm1pbmF0ZSc7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxpbnB1dCBjbGFzc05hbWU9J3JlYWN0LWJzLXNlbGVjdC1hbGwnIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH0gb25DaGFuZ2U9e3RoaXMucHJvcHMub25DaGFuZ2V9IC8+XG4gIH1cbn1cblxuY2xhc3MgVGFibGVIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RSb3dDb2x1bW5XaWR0aCA9IG51bGw7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzU2V0KFwidGFibGUtaGVhZGVyXCIpO1xuICAgIHZhciB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlXCIsIFwidGFibGUtaG92ZXJcIiwge1xuICAgICAgICBcInRhYmxlLWJvcmRlcmVkXCI6IHRoaXMucHJvcHMuYm9yZGVyZWQsXG4gICAgICAgIFwidGFibGUtY29uZGVuc2VkXCI6IHRoaXMucHJvcHMuY29uZGVuc2VkXG4gICAgfSk7XG4gICAgdmFyIHNlbGVjdFJvd0hlYWRlckNvbCA9IHRoaXMucHJvcHMuaGlkZVNlbGVjdENvbHVtbj9udWxsOnRoaXMucmVuZGVyU2VsZWN0Um93SGVhZGVyKCk7XG4gICAgdGhpcy5fYXR0YWNoQ2xlYXJTb3J0Q2FyZXRGdW5jKCk7XG5cbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWhlYWRlci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgcmVmPVwiY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc2VzfT5cbiAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzZXN9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHIgcmVmPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAge3NlbGVjdFJvd0hlYWRlckNvbH1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZW5kZXJTZWxlY3RSb3dIZWFkZXIoKXtcbiAgICBpZih0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUpIHtcbiAgICAgIHJldHVybiAoPFNlbGVjdFJvd0hlYWRlckNvbHVtbiB3aWR0aD17dGhpcy5zZWxlY3RSb3dDb2x1bW5XaWR0aH0+PC9TZWxlY3RSb3dIZWFkZXJDb2x1bW4+KTtcbiAgICB9ZWxzZSBpZih0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9NVUxUSSl7XG4gICAgICByZXR1cm4gKDxTZWxlY3RSb3dIZWFkZXJDb2x1bW4gd2lkdGg9e3RoaXMuc2VsZWN0Um93Q29sdW1uV2lkdGh9PlxuICAgICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblNlbGVjdEFsbFJvd30gY2hlY2tlZD17dGhpcy5wcm9wcy5pc1NlbGVjdEFsbH0vPlxuICAgICAgICA8L1NlbGVjdFJvd0hlYWRlckNvbHVtbj5cbiAgICAgICk7XG4gICAgfWVsc2V7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBfYXR0YWNoQ2xlYXJTb3J0Q2FyZXRGdW5jKCl7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSl7XG4gICAgICBmb3IobGV0IGk9MDtpPHRoaXMucHJvcHMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5wcm9wcy5jaGlsZHJlbltpXS5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICAgIGNvbnN0IHNvcnQgPSBmaWVsZCA9PT0gdGhpcy5wcm9wcy5zb3J0TmFtZSA/IHRoaXMucHJvcHMuc29ydE9yZGVyIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuW2ldID1cbiAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbltpXSxcbiAgICAgICAgICAgIHsga2V5OiBpLCBvblNvcnQ6IHRoaXMucHJvcHMub25Tb3J0LCBzb3J0IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWVsZCA9IHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgY29uc3Qgc29ydCA9IGZpZWxkID09PSB0aGlzLnByb3BzLnNvcnROYW1lID8gdGhpcy5wcm9wcy5zb3J0T3JkZXIgOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnByb3BzLmNoaWxkcmVuID1cbiAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHtrZXk6IDAsIG9uU29ydDogdGhpcy5wcm9wcy5vblNvcnQsIHNvcnR9KTtcbiAgICB9XG4gIH1cblxuICBmaXRIZWFkZXIoaGVhZGVyUHJvcHMsIGlzVmVydGljYWxTY3JvbGxCYXIpe1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikpe1xuICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSAodGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9NVUxUSSkgJiYgIXRoaXMucHJvcHMuaGlkZVNlbGVjdENvbHVtbiA/IDE6MDtcbiAgICAgIGlmKHN0YXJ0UG9zaXRpb24gPT0gMSlcbiAgICAgICAgdGhpcy5zZWxlY3RSb3dDb2x1bW5XaWR0aCA9IGhlYWRlclByb3BzWzBdLndpZHRoO1xuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuW2ldID1cbiAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbltpXSwge3dpZHRoOiBoZWFkZXJQcm9wc1tpK3N0YXJ0UG9zaXRpb25dLndpZHRoK1wicHhcIn0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLmNoaWxkcmVuID1cbiAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHt3aWR0aDogaGVhZGVyUHJvcHNbMF0ud2lkdGgrXCJweFwifSk7XG4gICAgfVxuICAgIGlmKHRoaXMucHJvcHMuY29uZGVuc2VkICYmICF0aGlzLnByb3BzLmlzRmlsdGVyZWQpIHtcbiAgICAgIHRoaXMucmVmcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCIzNnB4XCI7XG4gICAgfVxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICBpZihpc1ZlcnRpY2FsU2Nyb2xsQmFyKVxuICAgICAgdGhpcy5yZWZzLmNvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9IFV0aWwuZ2V0U2Nyb2xsQmFyV2lkdGgoKSArIFwicHhcIjtcbiAgfVxufVxuVGFibGVIZWFkZXIucHJvcFR5cGVzID0ge1xuICByb3dTZWxlY3RUeXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvblNvcnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdEFsbFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHNvcnROYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzb3J0T3JkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGhpZGVTZWxlY3RDb2x1bW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBib3JkZXJlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbmRlbnNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGlzRmlsdGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBpc1NlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFt0cnVlLCAnaW5kZXRlcm1pbmF0ZScsIGZhbHNlXSlcbn07XG5cblRhYmxlSGVhZGVyLmRlZmF1bHRQcm9wcyA9IHtcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUhlYWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlSGVhZGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0RE9NXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuZXhwb3J0IGRlZmF1bHQge1xuXG4gIHJlbmRlclNvcnRDYXJldChvcmRlcikge1xuICAgIHZhciB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgd3JhcC5jbGFzc05hbWUgPSBcIm9yZGVyXCI7XG4gICAgaWYob3JkZXIgPT0gQ29uc3QuU09SVF9BU0MpIHdyYXAuY2xhc3NOYW1lICs9IFwiIGRyb3B1cFwiO1xuICAgIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGlubmVyLmNsYXNzTmFtZSA9IFwiY2FyZXRcIjtcbiAgICBpbm5lci5zdHlsZS5tYXJnaW4gPSBcIjEwcHggNXB4XCI7XG4gICAgd3JhcC5hcHBlbmRDaGlsZChpbm5lcik7XG4gICAgcmV0dXJuIHdyYXA7XG4gIH0sXG5cbiAgcmVuZGVyUmVhY3RTb3J0Q2FyZXQob3JkZXIpe1xuICAgIHZhciBvcmRlckNsYXNzID0gY2xhc3NTZXQoXCJvcmRlclwiLCB7XG4gICAgICAnZHJvcHVwJzogb3JkZXIgPT0gQ29uc3QuU09SVF9BU0NcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtvcmRlckNsYXNzfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIiBzdHlsZT17e21hcmdpbjogJzEwcHggNXB4J319Pjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9LFxuXG4gIGdldFNjcm9sbEJhcldpZHRoKCl7XG4gICAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGlubmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgaW5uZXIuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuXG4gICAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgb3V0ZXIuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICBvdXRlci5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICBvdXRlci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBvdXRlci5zdHlsZS53aWR0aCA9IFwiMjAwcHhcIjtcbiAgICBvdXRlci5zdHlsZS5oZWlnaHQgPSBcIjE1MHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIG91dGVyLmFwcGVuZENoaWxkIChpbm5lcik7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIChvdXRlcik7XG4gICAgdmFyIHcxID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgICB2YXIgdzIgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgICBpZiAodzEgPT0gdzIpIHcyID0gb3V0ZXIuY2xpZW50V2lkdGg7XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkIChvdXRlcik7XG5cbiAgICByZXR1cm4gKHcxIC0gdzIpO1xuICB9XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuY2xhc3MgU2VsZWN0Um93SGVhZGVyQ29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIHJlbmRlcigpe1xuICAgIHZhciB0aFN0eWxlID0ge1xuICAgICAgd2lkdGg6IHBhcnNlSW50KHRoaXMucHJvcHMud2lkdGgpP3RoaXMucHJvcHMud2lkdGg6MzVcbiAgICB9O1xuXG4gICAgcmV0dXJuKFxuICAgICAgPHRoIHN0eWxlPXt0aFN0eWxlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aC1pbm5lciB0YWJsZS1oZWFkZXItY29sdW1uXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90aD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Um93SGVhZGVyQ29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvU2VsZWN0Um93SGVhZGVyQ29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgVGFibGVSb3cgZnJvbSAnLi9UYWJsZVJvdyc7XG5pbXBvcnQgVGFibGVDb2x1bW4gZnJvbSAnLi9UYWJsZUNvbHVtbic7XG5pbXBvcnQgVGFibGVFZGl0Q29sdW1uIGZyb20gJy4vVGFibGVFZGl0Q29sdW1uJztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxudmFyIGlzRnVuPWZ1bmN0aW9uKG9iail7XG4gIHJldHVybiBvYmomJih0eXBlb2Ygb2JqPT09XCJmdW5jdGlvblwiKTtcblxufTtcbmNsYXNzIFRhYmxlQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VyckVkaXRDZWxsOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgdGhpcy5hZGp1c3RCb2R5KCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKXtcbiAgICB0aGlzLmFkanVzdEJvZHkoKTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciBjb250YWluZXJDbGFzc2VzID0gY2xhc3NTZXQoXCJ0YWJsZS1jb250YWluZXJcIik7XG5cbiAgICB2YXIgdGFibGVDbGFzc2VzID0gY2xhc3NTZXQoXCJ0YWJsZVwiLCB7XG4gICAgICAndGFibGUtc3RyaXBlZCc6IHRoaXMucHJvcHMuc3RyaXBlZCxcbiAgICAgICd0YWJsZS1ib3JkZXJlZCc6IHRoaXMucHJvcHMuYm9yZGVyZWQsXG4gICAgICAndGFibGUtaG92ZXInOiB0aGlzLnByb3BzLmhvdmVyLFxuICAgICAgJ3RhYmxlLWNvbmRlbnNlZCc6IHRoaXMucHJvcHMuY29uZGVuc2VkXG4gICAgfSk7XG5cbiAgICB2YXIgaXNTZWxlY3RSb3dEZWZpbmVkID0gdGhpcy5faXNTZWxlY3RSb3dEZWZpbmVkKCk7XG4gICAgdmFyIHRhYmxlSGVhZGVyID0gdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihpc1NlbGVjdFJvd0RlZmluZWQpO1xuXG4gICAgdmFyIHRhYmxlUm93cyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24oZGF0YSwgcil7XG4gICAgICB2YXIgdGFibGVDb2x1bW5zID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGRhdGFbY29sdW1uLm5hbWVdO1xuICAgICAgICBpZih0aGlzLmVkaXRpbmcgJiZcbiAgICAgICAgICBjb2x1bW4ubmFtZSAhPT0gdGhpcy5wcm9wcy5rZXlGaWVsZCAmJiAvLyBLZXkgZmllbGQgY2FuJ3QgYmUgZWRpdFxuICAgICAgICAgIGNvbHVtbi5lZGl0YWJsZSAmJiAvLyBjb2x1bW4gaXMgZWRpdGFibGU/IGRlZmF1bHQgaXMgdHJ1ZSwgdXNlciBjYW4gc2V0IGl0IGZhbHNlXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyRWRpdENlbGwgIT0gbnVsbCAmJlxuICAgICAgICAgIHRoaXMuc3RhdGUuY3VyckVkaXRDZWxsLnJpZCA9PSByICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyRWRpdENlbGwuY2lkID09IGkpe1xuICAgICAgICAgICAgdmFyIGZvcm1hdD1jb2x1bW4uZm9ybWF0P2Z1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5mb3JtYXQodmFsdWUsIGRhdGEsIGNvbHVtbi5mb3JtYXRFeHRyYURhdGEpLnJlcGxhY2UoLzwuKj8+L2csJycpO1xuICAgICAgICAgICAgfTpmYWxzZTtcblxuICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPFRhYmxlRWRpdENvbHVtbiBjb21wbGV0ZUVkaXQ9e3RoaXMuaGFuZGxlQ29tcGxldGVFZGl0Q2VsbC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkIGJ5IGJsdWVzcHJpbmcgZm9yIGNvbHVtbiBlZGl0b3IgY3VzdG9taXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGU9e2lzRnVuKGNvbHVtbi5lZGl0YWJsZSk/Y29sdW1uLmVkaXRhYmxlKGZpZWxkVmFsdWUsZGF0YSxyLGkpOmNvbHVtbi5lZGl0YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9e2NvbHVtbi5mb3JtYXQ/Zm9ybWF0OmZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibHVyVG9TYXZlPXt0aGlzLnByb3BzLmNlbGxFZGl0LmJsdXJUb1NhdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SW5kZXg9e3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sSW5kZXg9e2l9PlxuICAgICAgICAgICAgICAgIHtmaWVsZFZhbHVlfVxuICAgICAgICAgICAgICA8L1RhYmxlRWRpdENvbHVtbj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIC8vYWRkIGJ5IGJsdWVzcHJpbmcgZm9yIGNsYXNzTmFtZSBjdXN0b21pemVcbiAgICAgICAgICB2YXIgdGRDbGFzc05hbWU9aXNGdW4oY29sdW1uLmNsYXNzTmFtZSk/Y29sdW1uLmNsYXNzTmFtZShmaWVsZFZhbHVlLGRhdGEscixpKTpjb2x1bW4uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgaWYodHlwZW9mIGNvbHVtbi5mb3JtYXQgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gY29sdW1uLmZvcm1hdChmaWVsZFZhbHVlLCBkYXRhLCBjb2x1bW4uZm9ybWF0RXh0cmFEYXRhKTtcbiAgICAgICAgICAgIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQoZm9ybWF0dGVkVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDogZm9ybWF0dGVkVmFsdWV9fT48L2Rpdj47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgIDxUYWJsZUNvbHVtbiBkYXRhQWxpZ249e2NvbHVtbi5hbGlnbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsRWRpdD17dGhpcy5wcm9wcy5jZWxsRWRpdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbj17Y29sdW1uLmhpZGRlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRWRpdD17dGhpcy5oYW5kbGVFZGl0Q2VsbC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e2NvbHVtbi53aWR0aH0+XG4gICAgICAgICAgICAgICAge2Zvcm1hdHRlZFZhbHVlfVxuICAgICAgICAgICAgICA8L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPFRhYmxlQ29sdW1uIGRhdGFBbGlnbj17Y29sdW1uLmFsaWdufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuPXtjb2x1bW4uaGlkZGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0PXt0aGlzLmhhbmRsZUVkaXRDZWxsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17Y29sdW1uLndpZHRofT5cbiAgICAgICAgICAgICAgICB7ZmllbGRWYWx1ZX1cbiAgICAgICAgICAgICAgPC9UYWJsZUNvbHVtbj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZFJvd0tleXMuaW5kZXhPZihkYXRhW3RoaXMucHJvcHMua2V5RmllbGRdKSAhPSAtMTtcbiAgICAgIHZhciBzZWxlY3RSb3dDb2x1bW4gPSBpc1NlbGVjdFJvd0RlZmluZWQgJiYgIXRoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW4/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlbGVjdFJvd0NvbHVtbihzZWxlY3RlZCk6bnVsbDtcbiAgICAgIC8vYWRkIGJ5IGJsdWVzcHJpbmcgZm9yIGNsYXNzTmFtZSBjdXN0b21pemVcbiAgICAgIHZhciB0ckNsYXNzTmFtZT1pc0Z1bih0aGlzLnByb3BzLnRyQ2xhc3NOYW1lKT90aGlzLnByb3BzLnRyQ2xhc3NOYW1lKGRhdGEscik6dGhpcy5wcm9wcy50ckNsYXNzTmFtZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUYWJsZVJvdyBpc1NlbGVjdGVkPXtzZWxlY3RlZH0ga2V5PXtyfSBjbGFzc05hbWU9e3RyQ2xhc3NOYW1lfVxuICAgICAgICAgIHNlbGVjdFJvdz17aXNTZWxlY3RSb3dEZWZpbmVkP3RoaXMucHJvcHMuc2VsZWN0Um93OnVuZGVmaW5lZH1cbiAgICAgICAgICBlbmFibGVDZWxsRWRpdD17dGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlICE9PSBDb25zdC5DRUxMX0VESVRfTk9ORX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25TZWxlY3RSb3c9e3RoaXMuaGFuZGxlU2VsZWN0Um93LmJpbmQodGhpcyl9PlxuICAgICAgICAgIHtzZWxlY3RSb3dDb2x1bW59XG4gICAgICAgICAge3RhYmxlQ29sdW1uc31cbiAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgIClcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmKHRhYmxlUm93cy5sZW5ndGggPT09IDApe1xuICAgICAgdGFibGVSb3dzLnB1c2goXG4gICAgICA8VGFibGVSb3cga2V5PVwiIyN0YWJsZS1lbXB0eSMjXCI+XG4gICAgICAgIDx0ZCBjb2xTcGFuPXt0aGlzLnByb3BzLmNvbHVtbnMubGVuZ3RoKyhpc1NlbGVjdFJvd0RlZmluZWQ/MTowKX1cbiAgICAgICAgICAgIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtYnMtdGFibGUtbm8tZGF0YVwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMubm9EYXRhVGV4dHx8Q29uc3QuTk9fREFUQV9URVhUfVxuICAgICAgICA8L3RkPlxuICAgICAgPC9UYWJsZVJvdz4pO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIGhlaWdodCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCkudG9TdHJpbmcoKTtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgcmVmPVwiY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc2VzfSBzdHlsZT17e2hlaWdodDogaGVpZ2h0fX0+XG4gICAgICAgIDx0YWJsZSByZWY9XCJib2R5XCIgY2xhc3NOYW1lPXt0YWJsZUNsYXNzZXN9PlxuICAgICAgICAgIHt0YWJsZUhlYWRlcn1cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICB7dGFibGVSb3dzfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZW5kZXJUYWJsZUhlYWRlcihpc1NlbGVjdFJvd0RlZmluZWQpe1xuICAgIHZhciBzZWxlY3RSb3dIZWFkZXIgPSBudWxsO1xuXG4gICAgaWYoaXNTZWxlY3RSb3dEZWZpbmVkKXtcbiAgICAgIGxldCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6MzUsXG4gICAgICAgIG1pbldpZHRoOjM1XG4gICAgICB9XG4gICAgICBzZWxlY3RSb3dIZWFkZXIgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1uP251bGw6KDx0aCBzdHlsZT17c3R5bGV9IGtleT17LTF9PjwvdGg+KTtcbiAgICB9XG4gICAgdmFyIHRoZWFkZXIgPSB0aGlzLnByb3BzLmNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbiwgaSl7XG4gICAgICBsZXQgd2lkdGggPSBjb2x1bW4ud2lkdGggPT0gbnVsbD9jb2x1bW4ud2lkdGg6cGFyc2VJbnQoY29sdW1uLndpZHRoKTtcbiAgICAgIGxldCBzdHlsZT17XG4gICAgICAgIGRpc3BsYXk6IGNvbHVtbi5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBtYXhXaWR0aDogd2lkdGhcbiAgICAgICAgLyoqIGFkZCBtaW4td2R0aCB0byBmaXggdXNlciBhc3NpZ24gY29sdW1uIHdpZHRoIG5vdCBlcSBvZmZzZXRXaWR0aCBpbiBsYXJnZSBjb2x1bW4gdGFibGUgKiovXG4gICAgICB9O1xuICAgICAgbGV0IHNvcnRDYWVydCA9IGNvbHVtbi5zb3J0PyhVdGlsLnJlbmRlclJlYWN0U29ydENhcmV0KENvbnN0LlNPUlRfREVTQykpOm51bGw7XG4gICAgICByZXR1cm4gKDx0aCBzdHlsZT17c3R5bGV9IGtleT17aX0gY2xhc3NOYW1lPXtjb2x1bW4uY2xhc3NOYW1lfT57Y29sdW1uLnRleHR9e3NvcnRDYWVydH08L3RoPik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4oXG4gICAgICA8dGhlYWQgcmVmPVwiaGVhZGVyXCI+XG4gICAgICAgIDx0cj57c2VsZWN0Um93SGVhZGVyfXt0aGVhZGVyfTwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgIClcbiAgfVxuXG4gIGhhbmRsZVJvd0NsaWNrKHJvd0luZGV4KXtcbiAgICB2YXIga2V5LCBzZWxlY3RlZFJvdztcbiAgICB0aGlzLnByb3BzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3csIGkpe1xuICAgICAgaWYoaSA9PSByb3dJbmRleC0xKXtcbiAgICAgICAga2V5ID0gcm93W3RoaXMucHJvcHMua2V5RmllbGRdO1xuICAgICAgICBzZWxlY3RlZFJvdyA9IHJvdztcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soc2VsZWN0ZWRSb3cpO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0Um93KHJvd0luZGV4LCBpc1NlbGVjdGVkKXtcbiAgICB2YXIga2V5LCBzZWxlY3RlZFJvdztcbiAgICB0aGlzLnByb3BzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3csIGkpe1xuICAgICAgaWYoaSA9PSByb3dJbmRleC0xKXtcbiAgICAgICAga2V5ID0gcm93W3RoaXMucHJvcHMua2V5RmllbGRdO1xuICAgICAgICBzZWxlY3RlZFJvdyA9IHJvdztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3RSb3coc2VsZWN0ZWRSb3csIGlzU2VsZWN0ZWQpO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0Um93Q29sdW1DaGFuZ2UoZSl7XG4gICAgaWYoIXRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3QgfHwgIXRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCl7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdFJvdyhcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yb3dJbmRleCwgZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVkaXRDZWxsKHJvd0luZGV4LCBjb2x1bW5JbmRleCl7XG4gICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICBpZih0aGlzLl9pc1NlbGVjdFJvd0RlZmluZWQoKSl7XG4gICAgICBjb2x1bW5JbmRleC0tO1xuICAgICAgaWYodGhpcy5wcm9wcy5zZWxlY3RSb3cuaGlkZVNlbGVjdENvbHVtbilcbiAgICAgICAgY29sdW1uSW5kZXgrKztcbiAgICB9XG4gICAgcm93SW5kZXgtLTtcbiAgICB2YXIgc3RhdGVPYmogPSB7XG4gICAgICBjdXJyRWRpdENlbGw6IHtcbiAgICAgICAgcmlkOiByb3dJbmRleCxcbiAgICAgICAgY2lkOiBjb2x1bW5JbmRleFxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZih0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpe1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3RSb3cocm93SW5kZXgrMSwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVPYmopO1xuICB9XG5cbiAgY2FuY2VsRWRpdCgpe1xuICAgIHZhciBjdXJyRWRpdENlbGw9dGhpcy5zdGF0ZS5jdXJyRWRpdENlbGw7XG4gICAgaWYoY3VyckVkaXRDZWxsKXtcbiAgICAgIHRoaXMuaGFuZGxlQ29tcGxldGVFZGl0Q2VsbChudWxsLGN1cnJFZGl0Q2VsbC5yaWQsY3VyckVkaXRDZWxsLmNpZCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ29tcGxldGVFZGl0Q2VsbChuZXdWYWwsIHJvd0luZGV4LCBjb2x1bW5JbmRleCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y3VyckVkaXRDZWxsOiBudWxsfSk7XG4gICAgaWYobnVsbCAhPSBuZXdWYWwpXG4gICAgICB0aGlzLnByb3BzLmNlbGxFZGl0Ll9fb25Db21wbGV0ZUVkaXRfXyhuZXdWYWwsIHJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gIH1cblxuICByZW5kZXJTZWxlY3RSb3dDb2x1bW4oc2VsZWN0ZWQpe1xuICAgIGlmKHRoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUpIHtcbiAgICAgIHJldHVybiAoPFRhYmxlQ29sdW1uPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic2VsZWN0aW9uXCIgY2hlY2tlZD17c2VsZWN0ZWR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdFJvd0NvbHVtQ2hhbmdlLmJpbmQodGhpcyl9Lz48L1RhYmxlQ29sdW1uPik7XG4gICAgfWVsc2Uge1xuICAgICAgcmV0dXJuICg8VGFibGVDb2x1bW4gPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZWxlY3RlZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0Um93Q29sdW1DaGFuZ2UuYmluZCh0aGlzKX0vPjwvVGFibGVDb2x1bW4+KTtcbiAgICB9XG4gIH1cblxuICBnZXRCb2R5SGVhZGVyRG9tUHJvcCgpe1xuICAgIHZhciBoZWFkZXJzID0gdGhpcy5yZWZzLmhlYWRlci5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXM7XG4gICAgdmFyIGhlYWRlckRvbVByb3BzID0gW107XG4gICAgZm9yKGxldCBpPTA7aTxoZWFkZXJzLmxlbmd0aDtpKyspe1xuICAgICAgaGVhZGVyRG9tUHJvcHMucHVzaCh7XG4gICAgICAgIHdpZHRoOmhlYWRlcnNbaV0ub2Zmc2V0V2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZGVyRG9tUHJvcHM7XG4gIH1cblxuICBhZGp1c3RCb2R5KCkge1xuICAgIHRoaXMuaGFyZEZpeEhlYWRlcldpZHRoKCk7XG4gICAgaWYodGhpcy5wcm9wcy5jb25kZW5zZWQpIHtcbiAgICAgIHRoaXMucmVmcy5ib2R5LnN0eWxlLm1hcmdpblRvcCA9IFwiLTM2cHhcIjtcbiAgICB9XG5cbiAgICBpZih0aGlzLnByb3BzLm1heEhlaWdodCAmJlxuICAgICAgcGFyc2VJbnQodGhpcy5wcm9wcy5tYXhIZWlnaHQpIDwgdGhpcy5yZWZzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gKHRoaXMucHJvcHMubWF4SGVpZ2h0IC0gNDIpICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIGhhcmRGaXhIZWFkZXJXaWR0aCgpe1xuICAgIHZhciBoZWFkZXJzID0gdGhpcy5yZWZzLmhlYWRlci5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXM7XG4gICAgZm9yKGxldCBpPTA7aTxoZWFkZXJzLmxlbmd0aDtpKyspe1xuICAgICAgaGVhZGVyc1tpXS5zdHlsZS53aWR0aCA9IGhlYWRlcnNbaV0ub2Zmc2V0V2lkdGggKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCl7XG4gICAgaWYodGhpcy5wcm9wcy5oZWlnaHQgPT0gXCIxMDAlXCIpIHJldHVybiB0aGlzLnByb3BzLmhlaWdodDtcbiAgICBlbHNle1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMucHJvcHMuaGVpZ2h0KSAtIDQyO1xuICAgIH1cbiAgfVxuXG4gIF9pc1NlbGVjdFJvd0RlZmluZWQoKXtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJO1xuICB9XG59XG5UYWJsZUJvZHkucHJvcFR5cGVzID0ge1xuICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICBzdHJpcGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgYm9yZGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBob3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbmRlbnNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGtleUZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RlZFJvd0tleXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgbm9EYXRhVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcbmV4cG9ydCBkZWZhdWx0IFRhYmxlQm9keTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlQm9keS5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5cbmNsYXNzIFRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICB9XG5cbiAgcm93Q2xpY2soZSl7XG4gICAgaWYoZS50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiKSB7XG4gICAgICBjb25zdCByb3dJbmRleCA9IGUuY3VycmVudFRhcmdldC5yb3dJbmRleDtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdykge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0Um93KHJvd0luZGV4LCAhdGhpcy5wcm9wcy5pc1NlbGVjdGVkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja051bSsrO1xuICAgICAgICAgICAgLyoqIGlmIGNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCBpcyBlbmFibGVkLFxuICAgICAgICAgICAgICogIHRoZXJlIHNob3VsZCBiZSBhIGRlbGF5IHRvIHByZXZlbnQgYSBzZWxlY3Rpb24gY2hhbmdlZCB3aGVuXG4gICAgICAgICAgICAgKiAgdXNlciBkYmxpY2sgdG8gZWRpdCBjZWxsIG9uIHNhbWUgcm93IGJ1dCBkaWZmZXJlbnQgY2VsbFxuICAgICAgICAgICAgKiovXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYodGhpcy5jbGlja051bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RSb3cocm93SW5kZXgsICF0aGlzLnByb3BzLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB0aGlzLnByb3BzLm9uUm93Q2xpY2socm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICAgIHZhciB0ckNzcz17XG4gICAgICBzdHlsZTp7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5pc1NlbGVjdGVkP3RoaXMucHJvcHMuc2VsZWN0Um93LmJnQ29sb3I6bnVsbFxuICAgICAgfSxcbiAgICAgIGNsYXNzTmFtZToodGhpcy5wcm9wcy5pc1NlbGVjdGVkICYmIHRoaXMucHJvcHMuc2VsZWN0Um93LmNsYXNzTmFtZSA/IHRoaXMucHJvcHMuc2VsZWN0Um93LmNsYXNzTmFtZSA6ICcnKSArICh0aGlzLnByb3BzLmNsYXNzTmFtZXx8JycpXG4gICAgfTtcblxuICAgIGlmKHRoaXMucHJvcHMuc2VsZWN0Um93ICYmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0IHx8XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpIHx8IHRoaXMucHJvcHMub25Sb3dDbGljayl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ciB7Li4udHJDc3N9IG9uQ2xpY2s9e3RoaXMucm93Q2xpY2suYmluZCh0aGlzKX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC90cj5cbiAgICAgIClcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybihcbiAgICAgICAgPHRyIHsuLi50ckNzc30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC90cj5cbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblRhYmxlUm93LnByb3BUeXBlcyA9IHtcbiAgaXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGVuYWJsZUNlbGxFZGl0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufTtcblRhYmxlUm93LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Sb3dDbGljazogdW5kZWZpbmVkXG59XG5leHBvcnQgZGVmYXVsdCBUYWJsZVJvdztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlUm93LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuY2xhc3MgVGFibGVDb2x1bW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBzaG91bGRVcGRhdGVkID0gdGhpcy5wcm9wcy53aWR0aCAhPT0gbmV4dFByb3BzLndpZHRoXG4gICAgICB8fCB0aGlzLnByb3BzLmNsYXNzTmFtZSAhPT0gbmV4dFByb3BzLmNsYXNzTmFtZVxuICAgICAgfHwgdGhpcy5wcm9wcy5oaWRkZW4gIT09IG5leHRQcm9wcy5oaWRkZW5cbiAgICAgIHx8IHRoaXMucHJvcHMuZGF0YUFsaWduICE9PSBuZXh0UHJvcHMuZGF0YUFsaWduXG4gICAgICB8fCB0eXBlb2YgY2hpbGRyZW4gIT09IHR5cGVvZiBuZXh0UHJvcHMuY2hpbGRyZW5cbiAgICAgIHx8ICgnJyt0aGlzLnByb3BzLm9uRWRpdCkudG9TdHJpbmcoKSAhPT0gKCcnK25leHRQcm9wcy5vbkVkaXQpLnRvU3RyaW5nKClcblxuICAgIGlmKHNob3VsZFVwZGF0ZWQpe1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWQ7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIGNoaWxkcmVuID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgaWYoY2hpbGRyZW4ucHJvcHMudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBjaGlsZHJlbi5wcm9wcy50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIHNob3VsZFVwZGF0ZWQgPSBzaG91bGRVcGRhdGVkIHx8XG4gICAgICAgICAgY2hpbGRyZW4ucHJvcHMudHlwZSAhPT0gbmV4dFByb3BzLmNoaWxkcmVuLnByb3BzLnR5cGUgfHxcbiAgICAgICAgICBjaGlsZHJlbi5wcm9wcy5jaGVja2VkICE9PSBuZXh0UHJvcHMuY2hpbGRyZW4ucHJvcHMuY2hlY2tlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3VsZFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG91bGRVcGRhdGVkID0gc2hvdWxkVXBkYXRlZCB8fCBjaGlsZHJlbiAhPT0gbmV4dFByb3BzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIGlmKHNob3VsZFVwZGF0ZWQpe1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWQ7XG4gICAgfVxuXG4gICAgaWYoISh0aGlzLnByb3BzLmNlbGxFZGl0ICYmIG5leHRQcm9wcy5jZWxsRWRpdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlICE9PSBuZXh0UHJvcHMuY2VsbEVkaXQubW9kZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDZWxsRWRpdChlKXtcbiAgICBpZih0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgPT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spe1xuICAgICAgaWYoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSkge1xuICAgICAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgIH0gZWxzZSBpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25FZGl0KFxuICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucm93SW5kZXgsXG4gICAgICBlLmN1cnJlbnRUYXJnZXQuY2VsbEluZGV4KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB3aWR0aCA9IHRoaXMucHJvcHMud2lkdGggPT0gbnVsbD9cbiAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGg6cGFyc2VJbnQodGhpcy5wcm9wcy53aWR0aCk7XG4gICAgdmFyIHRkU3R5bGUgPSB7XG4gICAgICB0ZXh0QWxpZ246IHRoaXMucHJvcHMuZGF0YUFsaWduLFxuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIG1heFdpZHRoOiB3aWR0aFxuICAgIH07XG4gICAgdmFyIGNsYXNzbmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgIGlmKHRoaXMucHJvcHMud2lkdGgpe1xuICAgICAgICBjbGFzc25hbWUgKz0gXCIgY29sLW1kLVwiK3dpZHRoO1xuICAgIH1cblxuXG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBpZih0aGlzLnByb3BzLmNlbGxFZGl0KXtcbiAgICAgIGlmKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PSBDb25zdC5DRUxMX0VESVRfQ0xJQ0spe1xuICAgICAgICBvcHRzLm9uQ2xpY2sgPSB0aGlzLmhhbmRsZUNlbGxFZGl0LmJpbmQodGhpcyk7XG4gICAgICB9ZWxzZSBpZih0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgPT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spe1xuICAgICAgICBvcHRzLm9uRG91YmxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNlbGxFZGl0LmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8dGQgc3R5bGU9e3RkU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NuYW1lfSB7Li4ub3B0c30+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC90ZD5cbiAgICApXG4gIH1cbn1cblRhYmxlQ29sdW1uLnByb3BUeXBlcyA9IHtcbiAgZGF0YUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBoaWRkZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6UmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuVGFibGVDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBkYXRhQWxpZ246IFwibGVmdFwiLFxuICBoaWRkZW46IGZhbHNlLFxuICBjbGFzc05hbWU6XCJcIlxufVxuZXhwb3J0IGRlZmF1bHQgVGFibGVDb2x1bW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUNvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vRWRpdG9yJ1xuaW1wb3J0IE5vdGlmaWVyIGZyb20gJy4vTm90aWZpY2F0aW9uLmpzJztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVGFibGVFZGl0Q29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnRpbWVvdXRlQ2xlYXI9MDtcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBzaGFrZUVkaXRvcjpmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICBoYW5kbGVLZXlQcmVzcyhlKXtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7IC8vUHJlc3NlZCBFTlRFUlxuICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LnR5cGUgPT0gJ2NoZWNrYm94Jz9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q2hlY2tCb3hWYWx1ZShlKTplLmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cbiAgICAgIGlmKCF0aGlzLnZhbGlkYXRvcih2YWx1ZSkpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMuY29tcGxldGVFZGl0KFxuICAgICAgICB2YWx1ZSwgdGhpcy5wcm9wcy5yb3dJbmRleCwgdGhpcy5wcm9wcy5jb2xJbmRleCk7XG4gICAgfWVsc2UgaWYoZS5rZXlDb2RlID09IDI3KXtcbiAgICAgIHRoaXMucHJvcHMuY29tcGxldGVFZGl0KFxuICAgICAgICBudWxsLCB0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVCbHVyKGUpe1xuICAgIGlmKHRoaXMucHJvcHMuYmx1clRvU2F2ZSl7XG4gICAgICBsZXQgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQudHlwZSA9PSAnY2hlY2tib3gnP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRDaGVja0JveFZhbHVlKGUpOmUuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgICAgIGlmKCF0aGlzLnZhbGlkYXRvcih2YWx1ZSkpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMuY29tcGxldGVFZGl0KFxuICAgICAgICAgIHZhbHVlLCB0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbEluZGV4KTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdG9yKHZhbHVlKXtcbiAgICAgIHZhciB0cz10aGlzO1xuICAgICAgaWYodHMucHJvcHMuZWRpdGFibGUudmFsaWRhdG9yKXtcbiAgICAgICAgICB2YXIgdmFsaWQ9dHMucHJvcHMuZWRpdGFibGUudmFsaWRhdG9yKHZhbHVlKTtcbiAgICAgICAgICBpZih2YWxpZCE9PXRydWUpe1xuICAgICAgICAgICAgICB0cy5yZWZzLm5vdGlmaWVyLm5vdGljZSgnZXJyb3InLHZhbGlkLFwiUHJlc3NlZCBFU0MgY2FuIGNhbmNlbFwiKTtcbiAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdHMucmVmcy5pbnB1dFJlZjtcbiAgICAgICAgICAgICAgLy9hbmltYXRlIGlucHV0XG4gICAgICAgICAgICAgIHRzLmNsZWFyVGltZW91dCgpO1xuICAgICAgICAgICAgICB0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6dHJ1ZX0pO1xuICAgICAgICAgICAgICB0cy50aW1lb3V0ZUNsZWFyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6ZmFsc2V9KTt9LDMwMCk7XG4gICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICB9XG4gIGNsZWFyVGltZW91dCgpe1xuICAgICAgaWYodGhpcy50aW1lb3V0ZUNsZWFyIT0wKXtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0ZUNsZWFyKTtcbiAgICAgICAgICB0aGlzLnRpbWVvdXRlQ2xlYXI9MDtcbiAgICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLmlucHV0UmVmO1xuICAgICAgLy8gaW5wdXQudmFsdWUgPSB0aGlzLnByb3BzLmNoaWxkcmVufHwnJztcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIGVkaXRhYmxlPXRoaXMucHJvcHMuZWRpdGFibGUsXG4gICAgICAgIGZvcm1hdD10aGlzLnByb3BzLmZvcm1hdCxcbiAgICAgICAgYXR0cj17XG4gICAgICAgICAgICByZWY6XCJpbnB1dFJlZlwiLFxuICAgICAgICAgICAgb25LZXlEb3duOnRoaXMuaGFuZGxlS2V5UHJlc3MuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIG9uQmx1cjp0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzKVxuICAgICAgICB9O1xuICAgICAgICAvL3B1dCBwbGFjZWhvbGRlciBpZiBleGlzdFxuICAgICAgICBlZGl0YWJsZS5wbGFjZWhvbGRlciYmKGF0dHIucGxhY2Vob2xkZXI9ZWRpdGFibGUucGxhY2Vob2xkZXIpO1xuXG4gICAgdmFyIGVkaXRvckNsYXNzPWNsYXNzU2V0KHsnYW5pbWF0ZWQnOnRoaXMuc3RhdGUuc2hha2VFZGl0b3IsJ3NoYWtlJzp0aGlzLnN0YXRlLnNoYWtlRWRpdG9yfSk7XG4gICAgcmV0dXJuKFxuICAgICAgICA8dGQgcmVmPVwidGRcIiBzdHlsZT17e3Bvc2l0aW9uOidyZWxhdGl2ZSd9fT5cbiAgICAgICAgICAgIHtFZGl0b3IoZWRpdGFibGUsYXR0cixmb3JtYXQsZWRpdG9yQ2xhc3MsdGhpcy5wcm9wcy5jaGlsZHJlbnx8JycpfVxuICAgICAgICAgICAgPE5vdGlmaWVyIHJlZj1cIm5vdGlmaWVyXCI+PC9Ob3RpZmllcj5cbiAgICAgICAgPC90ZD5cbiAgICApXG4gIH1cblxuICBfZ2V0Q2hlY2tCb3hWYWx1ZShlKXtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICBsZXQgdmFsdWVzID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZD92YWx1ZXNbMF06dmFsdWVzWzFdO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG59XG5UYWJsZUVkaXRDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBjb21wbGV0ZUVkaXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICByb3dJbmRleDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgY29sSW5kZXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIGJsdXJUb1NhdmU6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlRWRpdENvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlRWRpdENvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgRWRpdG9yPWZ1bmN0aW9uKGVkaXRhYmxlLCBhdHRyLCBmb3JtYXQsIGVkaXRvckNsYXNzLCBkZWZhdWx0VmFsdWUpe1xuXG5cbiAgICBpZihlZGl0YWJsZT09PXRydWV8fHR5cGVvZiBlZGl0YWJsZT09PVwic3RyaW5nXCIpey8vc2ltcGxlIGRlY2xhcmVcbiAgICAgICAgdmFyIHR5cGU9ZWRpdGFibGU9PT10cnVlPyd0ZXh0JzplZGl0YWJsZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT17dHlwZX0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsoZWRpdG9yQ2xhc3N8fFwiXCIpK1wiIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0XCJ9IC8+XG4gICAgICAgIClcbiAgICB9IGVsc2UgaWYoIWVkaXRhYmxlKXtcbiAgICAgIHZhciB0eXBlPWVkaXRhYmxlPT09dHJ1ZT8ndGV4dCc6ZWRpdGFibGU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT17dHlwZX0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9IGRpc2FibGVkPSdkaXNhYmxlZCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsoZWRpdG9yQ2xhc3N8fFwiXCIpK1wiIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0XCJ9IC8+XG4gICAgICApXG4gICAgfSBlbHNlIGlmKGVkaXRhYmxlLnR5cGUpey8vc3RhbmRhcmQgZGVjbGFyZVxuICAgICAgICAvL3B1dCBzdHlsZSBpZiBleGlzdFxuICAgICAgICBlZGl0YWJsZS5zdHlsZSYmKGF0dHIuc3R5bGU9ZWRpdGFibGUuc3R5bGUpO1xuXG4gICAgICAgIC8vcHV0IGNsYXNzIGlmIGV4aXN0XG4gICAgICAgIGF0dHIuY2xhc3NOYW1lID0gKGVkaXRvckNsYXNzfHxcIlwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCIgZm9ybS1jb250cm9sIGVkaXRvciBlZGl0LVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZS50eXBlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAoZWRpdGFibGUuY2xhc3NOYW1lPyhcIiBcIitlZGl0YWJsZS5jbGFzc05hbWUpOlwiXCIpO1xuXG4gICAgICAgIGlmKGVkaXRhYmxlLnR5cGUgPT09ICdzZWxlY3QnKXsvL3Byb2Nlc3Mgc2VsZWN0IGlucHV0XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IFtdLCB2YWx1ZXM9ZWRpdGFibGUub3B0aW9ucy52YWx1ZXM7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHZhbHVlcykpey8vb25seSBjYW4gdXNlIGFycnJheSBkYXRhIGZvciBvcHRpb25zXG4gICAgICAgICAgICAgICAgdmFyIHJvd1ZhbHVlO1xuICAgICAgICAgICAgICAgIG9wdGlvbnM9dmFsdWVzLm1hcChmdW5jdGlvbihkLGkpe1xuICAgICAgICAgICAgICAgICAgICByb3dWYWx1ZT1mb3JtYXQ/Zm9ybWF0KGQpOmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXsnb3B0aW9uJytpfSB2YWx1ZT17ZH0+e3Jvd1ZhbHVlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgPHNlbGVjdCB7Li4uYXR0cn0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9PntvcHRpb25zfTwvc2VsZWN0PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmKGVkaXRhYmxlLnR5cGUgPT09ICd0ZXh0YXJlYScpey8vcHJvY2VzcyB0ZXh0YXJlYSBpbnB1dFxuICAgICAgICAgICAgLy9wdXQgIG90aGVyIGlmIGV4aXN0XG4gICAgICAgICAgICBlZGl0YWJsZS5jb2xzJiYoYXR0ci5jb2xzPWVkaXRhYmxlLmNvbHMpO1xuICAgICAgICAgICAgZWRpdGFibGUucm93cyYmKGF0dHIucm93cz1lZGl0YWJsZS5yb3dzKTtcbiAgICAgICAgICAgIHZhciBrZXlVcEhhbmRsZXI9YXR0ci5vbktleURvd24sc2F2ZUJ0bj1udWxsO1xuICAgICAgICAgICAgaWYoa2V5VXBIYW5kbGVyKXtcbiAgICAgICAgICAgICAgICBhdHRyLm9uS2V5RG93bj1mdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPSAxMykgeyAvL25vdCBQcmVzc2VkIEVOVEVSXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlVcEhhbmRsZXIoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNhdmVCdG49PGJ1dHRvIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBidG4teHMgdGV4dGFyZWEtc2F2ZS1idG5cIiBvbkNsaWNrPXtrZXlVcEhhbmRsZXJ9PnNhdmU8L2J1dHRvPlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHsuLi5hdHRyfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX0+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAge3NhdmVCdG59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZihlZGl0YWJsZS50eXBlID09PSAnY2hlY2tib3gnKXtcbiAgICAgICAgICBsZXQgdmFsdWVzID0gJ3RydWU6ZmFsc2UnO1xuICAgICAgICAgIGlmKGVkaXRhYmxlLm9wdGlvbnMgJiYgZWRpdGFibGUub3B0aW9ucy52YWx1ZXMpe1xuICAgICAgICAgICAgLy8gdmFsdWVzID0gZWRpdGFibGUub3B0aW9ucy52YWx1ZXMuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIHZhbHVlcyA9IGVkaXRhYmxlLm9wdGlvbnMudmFsdWVzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhdHRyLmNsYXNzTmFtZSA9IGF0dHIuY2xhc3NOYW1lLnJlcGxhY2UoJ2Zvcm0tY29udHJvbCcsJycpO1xuICAgICAgICAgIGF0dHIuY2xhc3NOYW1lICs9ICcgY2hlY2tib3ggcHVsbC1yaWdodCc7XG5cbiAgICAgICAgICBsZXQgY2hlY2tlZCA9IGRlZmF1bHRWYWx1ZSAmJiBkZWZhdWx0VmFsdWUudG9TdHJpbmcoKSA9PSB2YWx1ZXMuc3BsaXQoJzonKVswXT90cnVlOmZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT0nY2hlY2tib3gnIHZhbHVlPXt2YWx1ZXN9IGRlZmF1bHRDaGVja2VkPXtjaGVja2VkfS8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNley8vcHJvY2VzcyBvdGhlciBpbnB1dCB0eXBlLiBhcyBwYXNzd29yZCx1cmwsZW1haWwuLi5cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLmF0dHJ9IHR5cGU9e3R5cGV9IGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfS8+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9kZWZhdWx0IHJldHVybiBmb3Igb3RoZXIgY2FzZSBvZiBlZGl0YWJsZVxuICAgIHJldHVybihcbiAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT17KGVkaXRvckNsYXNzfHxcIlwiKStcIiBmb3JtLWNvbnRyb2wgZWRpdG9yIGVkaXQtdGV4dFwifS8+XG4gICAgKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRWRpdG9yLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuaW1wb3J0IHtcbiAgVG9hc3RDb250YWluZXIsXG4gIFRvYXN0TWVzc2FnZSxcbn0gZnJvbSBcInJlYWN0LXRvYXN0clwiO1xuXG5cbnZhciBUb2FzdHJNZXNzYWdlRmFjdG9yeT1SZWFjdC5jcmVhdGVGYWN0b3J5KFRvYXN0TWVzc2FnZS5hbmltYXRpb24pO1xuXG5jbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gIC8vIGFsbG93IHR5cGUgaXMgc3VjY2VzcyxpbmZvLHdhcm5pbmcsZXJyb3JcbiAgbm90aWNlKHR5cGUsbXNnLHRpdGxlKXtcbiAgICB0aGlzLnJlZnMudG9hc3RyW3R5cGVdKFxuICAgICAgICBtc2csdGl0bGUsIHtcbiAgICAgICAgICBtb2RlOidzaW5nbGUnLFxuICAgICAgICAgIHRpbWVPdXQ6IDUwMDAsXG4gICAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxuICAgICAgICAgIHNob3dBbmltYXRpb246IFwiYW5pbWF0ZWQgIGJvdW5jZUluXCIsXG4gICAgICAgICAgaGlkZUFuaW1hdGlvbjogXCJhbmltYXRlZCBib3VuY2VPdXRcIlxuICAgICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHJldHVybihcbiAgICAgICAgPFRvYXN0Q29udGFpbmVyIHJlZj1cInRvYXN0clwiIHRvYXN0TWVzc2FnZUZhY3Rvcnk9e1RvYXN0ck1lc3NhZ2VGYWN0b3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwidG9hc3QtY29udGFpbmVyXCIgIGNsYXNzTmFtZT1cInRvYXN0LXRvcC1yaWdodFwiPjwvVG9hc3RDb250YWluZXI+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL05vdGlmaWNhdGlvbi5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Ub2FzdE1lc3NhZ2UgPSBleHBvcnRzLlRvYXN0Q29udGFpbmVyID0gdW5kZWZpbmVkO1xuXG52YXIgX1RvYXN0Q29udGFpbmVyID0gcmVxdWlyZShcIi4vVG9hc3RDb250YWluZXJcIik7XG5cbnZhciBfVG9hc3RDb250YWluZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9hc3RDb250YWluZXIpO1xuXG52YXIgX1RvYXN0TWVzc2FnZSA9IHJlcXVpcmUoXCIuL1RvYXN0TWVzc2FnZVwiKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9hc3RNZXNzYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5Ub2FzdENvbnRhaW5lciA9IF9Ub2FzdENvbnRhaW5lcjIuZGVmYXVsdDtcbmV4cG9ydHMuVG9hc3RNZXNzYWdlID0gX1RvYXN0TWVzc2FnZTIuZGVmYXVsdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZSA9IHJlcXVpcmUoXCJyZWFjdC1hZGRvbnMtdXBkYXRlXCIpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zVXBkYXRlKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UgPSByZXF1aXJlKFwiLi9Ub2FzdE1lc3NhZ2VcIik7XG5cbnZhciBfVG9hc3RNZXNzYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RvYXN0TWVzc2FnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFRvYXN0Q29udGFpbmVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFRvYXN0Q29udGFpbmVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBUb2FzdENvbnRhaW5lcigpIHtcbiAgICB2YXIgX09iamVjdCRnZXRQcm90b3R5cGVPO1xuXG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUb2FzdENvbnRhaW5lcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChfT2JqZWN0JGdldFByb3RvdHlwZU8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVG9hc3RDb250YWluZXIpKS5jYWxsLmFwcGx5KF9PYmplY3QkZ2V0UHJvdG90eXBlTywgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnN0YXRlID0ge1xuICAgICAgdG9hc3RzOiBbXSxcbiAgICAgIHRvYXN0SWQ6IDAsXG4gICAgICBwcmV2aW91c01lc3NhZ2U6IG51bGxcbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUb2FzdENvbnRhaW5lciwgW3tcbiAgICBrZXk6IFwiZXJyb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLmVycm9yLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS5pbmZvLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3VjY2Vzc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS5zdWNjZXNzLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwid2FybmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS53YXJuaW5nLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5yZWZzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX3RoaXMyLnJlZnNba2V5XS5oaWRlVG9hc3QoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgeyBcImFyaWEtbGl2ZVwiOiBcInBvbGl0ZVwiLCByb2xlOiBcImFsZXJ0XCIgfSksXG4gICAgICAgIHRoaXMuc3RhdGUudG9hc3RzLm1hcChmdW5jdGlvbiAodG9hc3QpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLnByb3BzLnRvYXN0TWVzc2FnZUZhY3RvcnkodG9hc3QpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX25vdGlmeVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfbm90aWZ5KHR5cGUsIG1lc3NhZ2UsIHRpdGxlKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIG9wdGlvbnNPdmVycmlkZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzNdO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5wcmV2ZW50RHVwbGljYXRlcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wcmV2aW91c01lc3NhZ2UgPT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBrZXkgPSB0aGlzLnN0YXRlLnRvYXN0SWQrKztcbiAgICAgIHZhciB0b2FzdElkID0ga2V5O1xuICAgICAgdmFyIG5ld1RvYXN0ID0gKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkob3B0aW9uc092ZXJyaWRlLCB7XG4gICAgICAgICRtZXJnZToge1xuICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgdG9hc3RJZDogdG9hc3RJZCxcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICByZWY6IFwidG9hc3RzX19cIiArIGtleSxcbiAgICAgICAgICBoYW5kbGVPbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVPbkNsaWNrKGUpIHtcbiAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBvcHRpb25zT3ZlcnJpZGUuaGFuZGxlT25DbGljaykge1xuICAgICAgICAgICAgICBvcHRpb25zT3ZlcnJpZGUuaGFuZGxlT25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzNC5faGFuZGxlX3RvYXN0X29uX2NsaWNrKGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGFuZGxlUmVtb3ZlOiB0aGlzLl9oYW5kbGVfdG9hc3RfcmVtb3ZlLmJpbmQodGhpcylcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgdG9hc3RPcGVyYXRpb24gPSBfZGVmaW5lUHJvcGVydHkoe30sIFwiXCIgKyAodGhpcy5wcm9wcy5uZXdlc3RPblRvcCA/IFwiJHVuc2hpZnRcIiA6IFwiJHB1c2hcIiksIFtuZXdUb2FzdF0pO1xuXG4gICAgICB2YXIgbmV4dFN0YXRlID0gKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkodGhpcy5zdGF0ZSwge1xuICAgICAgICB0b2FzdHM6IHRvYXN0T3BlcmF0aW9uLFxuICAgICAgICBwcmV2aW91c01lc3NhZ2U6IHsgJHNldDogbWVzc2FnZSB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2hhbmRsZV90b2FzdF9vbl9jbGlja1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlX3RvYXN0X29uX2NsaWNrKGV2ZW50KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaGFuZGxlX3RvYXN0X3JlbW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlX3RvYXN0X3JlbW92ZSh0b2FzdElkKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIG9wZXJhdGlvbk5hbWUgPSBcIlwiICsgKHRoaXMucHJvcHMubmV3ZXN0T25Ub3AgPyBcInJlZHVjZVJpZ2h0XCIgOiBcInJlZHVjZVwiKTtcbiAgICAgIHRoaXMuc3RhdGUudG9hc3RzW29wZXJhdGlvbk5hbWVdKGZ1bmN0aW9uIChmb3VuZCwgdG9hc3QsIGluZGV4KSB7XG4gICAgICAgIGlmIChmb3VuZCB8fCB0b2FzdC50b2FzdElkICE9PSB0b2FzdElkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzNS5zZXRTdGF0ZSgoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShfdGhpczUuc3RhdGUsIHtcbiAgICAgICAgICB0b2FzdHM6IHsgJHNwbGljZTogW1tpbmRleCwgMV1dIH1cbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVG9hc3RDb250YWluZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Ub2FzdENvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XG4gIHRvYXN0VHlwZToge1xuICAgIGVycm9yOiBcImVycm9yXCIsXG4gICAgaW5mbzogXCJpbmZvXCIsXG4gICAgc3VjY2VzczogXCJzdWNjZXNzXCIsXG4gICAgd2FybmluZzogXCJ3YXJuaW5nXCJcbiAgfSxcbiAgaWQ6IFwidG9hc3QtY29udGFpbmVyXCIsXG4gIHRvYXN0TWVzc2FnZUZhY3Rvcnk6IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVGYWN0b3J5KF9Ub2FzdE1lc3NhZ2UyLmRlZmF1bHQpLFxuICBwcmV2ZW50RHVwbGljYXRlczogZmFsc2UsXG4gIG5ld2VzdE9uVG9wOiB0cnVlLFxuICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge31cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBUb2FzdENvbnRhaW5lcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0Q29udGFpbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncmVhY3QvbGliL3VwZGF0ZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9+L3JlYWN0LWFkZG9ucy11cGRhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHVwZGF0ZVxuICovXG5cbi8qIGdsb2JhbCBoYXNPd25Qcm9wZXJ0eTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vT2JqZWN0LmFzc2lnbicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9ICh7fSkuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KHgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICByZXR1cm4geC5jb25jYXQoKTtcbiAgfSBlbHNlIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBhc3NpZ24obmV3IHguY29uc3RydWN0b3IoKSwgeCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbn1cblxudmFyIENPTU1BTkRfUFVTSCA9IGtleU9mKHsgJHB1c2g6IG51bGwgfSk7XG52YXIgQ09NTUFORF9VTlNISUZUID0ga2V5T2YoeyAkdW5zaGlmdDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NQTElDRSA9IGtleU9mKHsgJHNwbGljZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NFVCA9IGtleU9mKHsgJHNldDogbnVsbCB9KTtcbnZhciBDT01NQU5EX01FUkdFID0ga2V5T2YoeyAkbWVyZ2U6IG51bGwgfSk7XG52YXIgQ09NTUFORF9BUFBMWSA9IGtleU9mKHsgJGFwcGx5OiBudWxsIH0pO1xuXG52YXIgQUxMX0NPTU1BTkRTX0xJU1QgPSBbQ09NTUFORF9QVVNILCBDT01NQU5EX1VOU0hJRlQsIENPTU1BTkRfU1BMSUNFLCBDT01NQU5EX1NFVCwgQ09NTUFORF9NRVJHRSwgQ09NTUFORF9BUFBMWV07XG5cbnZhciBBTExfQ09NTUFORFNfU0VUID0ge307XG5cbkFMTF9DT01NQU5EU19MSVNULmZvckVhY2goZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgQUxMX0NPTU1BTkRTX1NFVFtjb21tYW5kXSA9IHRydWU7XG59KTtcblxuZnVuY3Rpb24gaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBjb21tYW5kKSB7XG4gICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgdGFyZ2V0IG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuJywgY29tbWFuZCwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHNwZWNWYWx1ZSA9IHNwZWNbY29tbWFuZF07XG4gICFBcnJheS5pc0FycmF5KHNwZWNWYWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVyIGluIGFuIGFycmF5PycsIGNvbW1hbmQsIHNwZWNWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUodmFsdWUsIHNwZWMpIHtcbiAgISh0eXBlb2Ygc3BlYyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBZb3UgcHJvdmlkZWQgYSBrZXkgcGF0aCB0byB1cGRhdGUoKSB0aGF0IGRpZCBub3QgY29udGFpbiBvbmUgJyArICdvZiAlcy4gRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSB7JXM6IC4uLn0/JywgQUxMX0NPTU1BTkRTX0xJU1Quam9pbignLCAnKSwgQ09NTUFORF9TRVQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NFVCkpIHtcbiAgICAhKE9iamVjdC5rZXlzKHNwZWMpLmxlbmd0aCA9PT0gMSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBrZXkgaW4gYW4gb2JqZWN0IHdpdGggJXMnLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHNwZWNbQ09NTUFORF9TRVRdO1xuICB9XG5cbiAgdmFyIG5leHRWYWx1ZSA9IHNoYWxsb3dDb3B5KHZhbHVlKTtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX01FUkdFKSkge1xuICAgIHZhciBtZXJnZU9iaiA9IHNwZWNbQ09NTUFORF9NRVJHRV07XG4gICAgIShtZXJnZU9iaiAmJiB0eXBlb2YgbWVyZ2VPYmogPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHNwZWMgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG1lcmdlT2JqKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgIShuZXh0VmFsdWUgJiYgdHlwZW9mIG5leHRWYWx1ZSA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgdGFyZ2V0IG9mIHR5cGUgXFwnb2JqZWN0XFwnOyBnb3QgJXMnLCBDT01NQU5EX01FUkdFLCBuZXh0VmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBhc3NpZ24obmV4dFZhbHVlLCBzcGVjW0NPTU1BTkRfTUVSR0VdKTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfUFVTSCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfUFVTSCk7XG4gICAgc3BlY1tDT01NQU5EX1BVU0hdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9VTlNISUZUKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9VTlNISUZUKTtcbiAgICBzcGVjW0NPTU1BTkRfVU5TSElGVF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnVuc2hpZnQoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NQTElDRSkpIHtcbiAgICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgJXMgdGFyZ2V0IHRvIGJlIGFuIGFycmF5OyBnb3QgJXMnLCBDT01NQU5EX1NQTElDRSwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhQXJyYXkuaXNBcnJheShzcGVjW0NPTU1BTkRfU1BMSUNFXSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgc3BlY1tDT01NQU5EX1NQTElDRV0uZm9yRWFjaChmdW5jdGlvbiAoYXJncykge1xuICAgICAgIUFycmF5LmlzQXJyYXkoYXJncykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICBuZXh0VmFsdWUuc3BsaWNlLmFwcGx5KG5leHRWYWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX0FQUExZKSkge1xuICAgICEodHlwZW9mIHNwZWNbQ09NTUFORF9BUFBMWV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGEgZnVuY3Rpb247IGdvdCAlcy4nLCBDT01NQU5EX0FQUExZLCBzcGVjW0NPTU1BTkRfQVBQTFldKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgbmV4dFZhbHVlID0gc3BlY1tDT01NQU5EX0FQUExZXShuZXh0VmFsdWUpO1xuICB9XG5cbiAgZm9yICh2YXIgayBpbiBzcGVjKSB7XG4gICAgaWYgKCEoQUxMX0NPTU1BTkRTX1NFVC5oYXNPd25Qcm9wZXJ0eShrKSAmJiBBTExfQ09NTUFORFNfU0VUW2tdKSkge1xuICAgICAgbmV4dFZhbHVlW2tdID0gdXBkYXRlKHZhbHVlW2tdLCBzcGVjW2tdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvdXBkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgT2JqZWN0LmFzc2lnblxuICovXG5cbi8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QuYXNzaWduXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlPZlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlPZiA9IGZ1bmN0aW9uIChvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5qUXVlcnkgPSBleHBvcnRzLmFuaW1hdGlvbiA9IHVuZGVmaW5lZDtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNVcGRhdGUgPSByZXF1aXJlKFwicmVhY3QtYWRkb25zLXVwZGF0ZVwiKTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1VwZGF0ZSk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfYW5pbWF0aW9uTWl4aW4gPSByZXF1aXJlKFwiLi9hbmltYXRpb25NaXhpblwiKTtcblxudmFyIF9hbmltYXRpb25NaXhpbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hbmltYXRpb25NaXhpbik7XG5cbnZhciBfalF1ZXJ5TWl4aW4gPSByZXF1aXJlKFwiLi9qUXVlcnlNaXhpblwiKTtcblxudmFyIF9qUXVlcnlNaXhpbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qUXVlcnlNaXhpbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgVG9hc3RNZXNzYWdlU3BlYyA9IHtcbiAgZGlzcGxheU5hbWU6IFwiVG9hc3RNZXNzYWdlXCIsXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgdmFyIGljb25DbGFzc05hbWVzID0ge1xuICAgICAgZXJyb3I6IFwidG9hc3QtZXJyb3JcIixcbiAgICAgIGluZm86IFwidG9hc3QtaW5mb1wiLFxuICAgICAgc3VjY2VzczogXCJ0b2FzdC1zdWNjZXNzXCIsXG4gICAgICB3YXJuaW5nOiBcInRvYXN0LXdhcm5pbmdcIlxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NOYW1lOiBcInRvYXN0XCIsXG4gICAgICBpY29uQ2xhc3NOYW1lczogaWNvbkNsYXNzTmFtZXMsXG4gICAgICB0aXRsZUNsYXNzTmFtZTogXCJ0b2FzdC10aXRsZVwiLFxuICAgICAgbWVzc2FnZUNsYXNzTmFtZTogXCJ0b2FzdC1tZXNzYWdlXCIsXG4gICAgICB0YXBUb0Rpc21pc3M6IHRydWUsXG4gICAgICBjbG9zZUJ1dHRvbjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBoYW5kbGVPbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVPbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbkNsaWNrKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy50YXBUb0Rpc21pc3MpIHtcbiAgICAgIHRoaXMuaGlkZVRvYXN0KHRydWUpO1xuICAgIH1cbiAgfSxcbiAgX2hhbmRsZV9jbG9zZV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uIF9oYW5kbGVfY2xvc2VfYnV0dG9uX2NsaWNrKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5oaWRlVG9hc3QodHJ1ZSk7XG4gIH0sXG4gIF9oYW5kbGVfcmVtb3ZlOiBmdW5jdGlvbiBfaGFuZGxlX3JlbW92ZSgpIHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZSh0aGlzLnByb3BzLnRvYXN0SWQpO1xuICB9LFxuICBfcmVuZGVyX2Nsb3NlX2J1dHRvbjogZnVuY3Rpb24gX3JlbmRlcl9jbG9zZV9idXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2xvc2VCdXR0b24gPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwidG9hc3QtY2xvc2UtYnV0dG9uXCIsIHJvbGU6IFwiYnV0dG9uXCIsXG4gICAgICBvbkNsaWNrOiB0aGlzLl9oYW5kbGVfY2xvc2VfYnV0dG9uX2NsaWNrLFxuICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiBcIiZ0aW1lcztcIiB9XG4gICAgfSkgOiBmYWxzZTtcbiAgfSxcbiAgX3JlbmRlcl90aXRsZV9lbGVtZW50OiBmdW5jdGlvbiBfcmVuZGVyX3RpdGxlX2VsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy50aXRsZUNsYXNzTmFtZSB9LFxuICAgICAgdGhpcy5wcm9wcy50aXRsZVxuICAgICkgOiBmYWxzZTtcbiAgfSxcbiAgX3JlbmRlcl9tZXNzYWdlX2VsZW1lbnQ6IGZ1bmN0aW9uIF9yZW5kZXJfbWVzc2FnZV9lbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1lc3NhZ2UgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5tZXNzYWdlQ2xhc3NOYW1lIH0sXG4gICAgICB0aGlzLnByb3BzLm1lc3NhZ2VcbiAgICApIDogZmFsc2U7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBpY29uQ2xhc3NOYW1lID0gdGhpcy5wcm9wcy5pY29uQ2xhc3NOYW1lIHx8IHRoaXMucHJvcHMuaWNvbkNsYXNzTmFtZXNbdGhpcy5wcm9wcy50eXBlXTtcblxuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSh0aGlzLnByb3BzLmNsYXNzTmFtZSwgaWNvbkNsYXNzTmFtZSksXG4gICAgICAgIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZU9uQ2xpY2ssXG4gICAgICAgIG9uTW91c2VFbnRlcjogdGhpcy5oYW5kbGVNb3VzZUVudGVyLFxuICAgICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZVxuICAgICAgfSxcbiAgICAgIHRoaXMuX3JlbmRlcl9jbG9zZV9idXR0b24oKSxcbiAgICAgIHRoaXMuX3JlbmRlcl90aXRsZV9lbGVtZW50KCksXG4gICAgICB0aGlzLl9yZW5kZXJfbWVzc2FnZV9lbGVtZW50KClcbiAgICApO1xuICB9XG59O1xuXG52YXIgYW5pbWF0aW9uID0gZXhwb3J0cy5hbmltYXRpb24gPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3MoKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkoVG9hc3RNZXNzYWdlU3BlYywge1xuICBkaXNwbGF5TmFtZTogeyAkc2V0OiBcIlRvYXN0TWVzc2FnZS5hbmltYXRpb25cIiB9LFxuICBtaXhpbnM6IHsgJHNldDogW19hbmltYXRpb25NaXhpbjIuZGVmYXVsdF0gfVxufSkpO1xuXG52YXIgalF1ZXJ5ID0gZXhwb3J0cy5qUXVlcnkgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3MoKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkoVG9hc3RNZXNzYWdlU3BlYywge1xuICBkaXNwbGF5TmFtZTogeyAkc2V0OiBcIlRvYXN0TWVzc2FnZS5qUXVlcnlcIiB9LFxuICBtaXhpbnM6IHsgJHNldDogW19qUXVlcnlNaXhpbjIuZGVmYXVsdF0gfVxufSkpO1xuXG4vKlxuICogYXNzaWduIGRlZmF1bHQgbm9vcCBmdW5jdGlvbnNcbiAqL1xuVG9hc3RNZXNzYWdlU3BlYy5oYW5kbGVNb3VzZUVudGVyID0gbm9vcDtcblRvYXN0TWVzc2FnZVNwZWMuaGFuZGxlTW91c2VMZWF2ZSA9IG5vb3A7XG5Ub2FzdE1lc3NhZ2VTcGVjLmhpZGVUb2FzdCA9IG5vb3A7XG5cbnZhciBUb2FzdE1lc3NhZ2UgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3MoVG9hc3RNZXNzYWdlU3BlYyk7XG5cblRvYXN0TWVzc2FnZS5hbmltYXRpb24gPSBhbmltYXRpb247XG5Ub2FzdE1lc3NhZ2UualF1ZXJ5ID0galF1ZXJ5O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUb2FzdE1lc3NhZ2U7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQ1NTQ29yZSA9IHJlcXVpcmUoXCJmYmpzL2xpYi9DU1NDb3JlXCIpO1xuXG52YXIgX0NTU0NvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ1NTQ29yZSk7XG5cbnZhciBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzID0gcmVxdWlyZShcInJlYWN0L2xpYi9SZWFjdFRyYW5zaXRpb25FdmVudHNcIik7XG5cbnZhciBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1JlYWN0VHJhbnNpdGlvbkV2ZW50cyk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRJQ0sgPSAxNztcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2l0aW9uOiBudWxsLCAvLyBzb21lIGV4YW1wbGVzIGRlZmluZWQgaW4gaW5kZXguc2NzcyAoc2NhbGUsIGZhZGVJbk91dCwgcm90YXRlKVxuICAgICAgc2hvd0FuaW1hdGlvbjogXCJhbmltYXRlZCBib3VuY2VJblwiLCAvLyBvciBvdGhlciBhbmltYXRpb25zIGZyb20gYW5pbWF0ZS5jc3NcbiAgICAgIGhpZGVBbmltYXRpb246IFwiYW5pbWF0ZWQgYm91bmNlT3V0XCIsXG4gICAgICB0aW1lT3V0OiA1MDAwLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5jbGFzc05hbWVRdWV1ZSA9IFtdO1xuICAgIHRoaXMuaXNIaWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmludGVydmFsSWQgPSBudWxsO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX2lzX21vdW50ZWQgPSB0cnVlO1xuICAgIHRoaXMuX3Nob3coKTtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgIHZhciBvbkhpZGVDb21wbGV0ZSA9IGZ1bmN0aW9uIG9uSGlkZUNvbXBsZXRlKCkge1xuICAgICAgaWYgKF90aGlzLmlzSGlkaW5nKSB7XG4gICAgICAgIF90aGlzLl9zZXRfaXNfaGlkaW5nKGZhbHNlKTtcbiAgICAgICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5yZW1vdmVFbmRFdmVudExpc3RlbmVyKG5vZGUsIG9uSGlkZUNvbXBsZXRlKTtcbiAgICAgICAgX3RoaXMuX2hhbmRsZV9yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQuYWRkRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBvbkhpZGVDb21wbGV0ZSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMudGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX2lzX21vdW50ZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbElkKTtcbiAgICB9XG4gIH0sXG4gIF9zZXRfdHJhbnNpdGlvbjogZnVuY3Rpb24gX3NldF90cmFuc2l0aW9uKGhpZGUpIHtcbiAgICB2YXIgYW5pbWF0aW9uVHlwZSA9IGhpZGUgPyBcImxlYXZlXCIgOiBcImVudGVyXCI7XG4gICAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcyk7XG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMucHJvcHMudHJhbnNpdGlvbiArIFwiLVwiICsgYW5pbWF0aW9uVHlwZTtcbiAgICB2YXIgYWN0aXZlQ2xhc3NOYW1lID0gY2xhc3NOYW1lICsgXCItYWN0aXZlXCI7XG5cbiAgICB2YXIgZW5kTGlzdGVuZXIgPSBmdW5jdGlvbiBlbmRMaXN0ZW5lcihlKSB7XG4gICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG4gICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuXG4gICAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LnJlbW92ZUVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuICAgIH07XG5cbiAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LmFkZEVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuXG4gICAgX0NTU0NvcmUyLmRlZmF1bHQuYWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcblxuICAgIC8vIE5lZWQgdG8gZG8gdGhpcyB0byBhY3R1YWxseSB0cmlnZ2VyIGEgdHJhbnNpdGlvbi5cbiAgICB0aGlzLl9xdWV1ZV9jbGFzcyhhY3RpdmVDbGFzc05hbWUpO1xuICB9LFxuICBfY2xlYXJfdHJhbnNpdGlvbjogZnVuY3Rpb24gX2NsZWFyX3RyYW5zaXRpb24oaGlkZSkge1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHZhciBhbmltYXRpb25UeXBlID0gaGlkZSA/IFwibGVhdmVcIiA6IFwiZW50ZXJcIjtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy50cmFuc2l0aW9uICsgXCItXCIgKyBhbmltYXRpb25UeXBlO1xuICAgIHZhciBhY3RpdmVDbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIi1hY3RpdmVcIjtcblxuICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG4gICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcbiAgfSxcbiAgX3NldF9hbmltYXRpb246IGZ1bmN0aW9uIF9zZXRfYW5pbWF0aW9uKGhpZGUpIHtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IHRoaXMuX2dldF9hbmltYXRpb25fY2xhc3NlcyhoaWRlKTtcbiAgICB2YXIgZW5kTGlzdGVuZXIgPSBmdW5jdGlvbiBlbmRMaXN0ZW5lcihlKSB7XG4gICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYW5pbSkge1xuICAgICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBhbmltKTtcbiAgICAgIH0pO1xuXG4gICAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LnJlbW92ZUVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuICAgIH07XG5cbiAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LmFkZEVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuXG4gICAgYW5pbWF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltKSB7XG4gICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5hZGRDbGFzcyhub2RlLCBhbmltKTtcbiAgICB9KTtcbiAgfSxcbiAgX2dldF9hbmltYXRpb25fY2xhc3NlczogZnVuY3Rpb24gX2dldF9hbmltYXRpb25fY2xhc3NlcyhoaWRlKSB7XG4gICAgdmFyIGFuaW1hdGlvbnMgPSBoaWRlID8gdGhpcy5wcm9wcy5oaWRlQW5pbWF0aW9uIDogdGhpcy5wcm9wcy5zaG93QW5pbWF0aW9uO1xuICAgIGlmIChcIltvYmplY3QgQXJyYXldXCIgPT09IHRvU3RyaW5nLmNhbGwoYW5pbWF0aW9ucykpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb25zO1xuICAgIH0gZWxzZSBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGFuaW1hdGlvbnMpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb25zLnNwbGl0KFwiIFwiKTtcbiAgICB9XG4gIH0sXG4gIF9jbGVhcl9hbmltYXRpb246IGZ1bmN0aW9uIF9jbGVhcl9hbmltYXRpb24oaGlkZSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIGFuaW1hdGlvbnMgPSB0aGlzLl9nZXRfYW5pbWF0aW9uX2NsYXNzZXMoaGlkZSk7XG4gICAgYW5pbWF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltYXRpb24pIHtcbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZShfdGhpczIpLCBhbmltYXRpb24pO1xuICAgIH0pO1xuICB9LFxuICBfcXVldWVfY2xhc3M6IGZ1bmN0aW9uIF9xdWV1ZV9jbGFzcyhjbGFzc05hbWUpIHtcbiAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlLnB1c2goY2xhc3NOYW1lKTtcblxuICAgIGlmICghdGhpcy50aW1lb3V0KSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX2ZsdXNoX2NsYXNzX25hbWVfcXVldWUsIFRJQ0spO1xuICAgIH1cbiAgfSxcbiAgX2ZsdXNoX2NsYXNzX25hbWVfcXVldWU6IGZ1bmN0aW9uIF9mbHVzaF9jbGFzc19uYW1lX3F1ZXVlKCkge1xuICAgIGlmICh0aGlzLl9pc19tb3VudGVkKSB7XG4gICAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlLmZvckVhY2goX0NTU0NvcmUyLmRlZmF1bHQuYWRkQ2xhc3MuYmluZChfQ1NTQ29yZTIuZGVmYXVsdCwgX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKSk7XG4gICAgfVxuICAgIHRoaXMuY2xhc3NOYW1lUXVldWUubGVuZ3RoID0gMDtcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICB9LFxuICBfc2hvdzogZnVuY3Rpb24gX3Nob3coKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudHJhbnNpdGlvbikge1xuICAgICAgdGhpcy5fc2V0X3RyYW5zaXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd0FuaW1hdGlvbikge1xuICAgICAgdGhpcy5fc2V0X2FuaW1hdGlvbigpO1xuICAgIH1cbiAgfSxcbiAgaGFuZGxlTW91c2VFbnRlcjogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQobnVsbCk7XG4gICAgaWYgKHRoaXMuaXNIaWRpbmcpIHtcbiAgICAgIHRoaXMuX3NldF9pc19oaWRpbmcoZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5oaWRlQW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyX2FuaW1hdGlvbih0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy50cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyX3RyYW5zaXRpb24odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgIGlmICghdGhpcy5pc0hpZGluZyAmJiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCB8fCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCA+IDApKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQpKTtcbiAgICB9XG4gIH0sXG4gIGhpZGVUb2FzdDogZnVuY3Rpb24gaGlkZVRvYXN0KG92ZXJyaWRlKSB7XG4gICAgaWYgKHRoaXMuaXNIaWRpbmcgfHwgdGhpcy5pbnRlcnZhbElkID09PSBudWxsICYmICFvdmVycmlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NldF9pc19oaWRpbmcodHJ1ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMudHJhbnNpdGlvbikge1xuICAgICAgdGhpcy5fc2V0X3RyYW5zaXRpb24odHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmhpZGVBbmltYXRpb24pIHtcbiAgICAgIHRoaXMuX3NldF9hbmltYXRpb24odHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZV9yZW1vdmUoKTtcbiAgICB9XG4gIH0sXG4gIF9zZXRfaW50ZXJ2YWxfaWQ6IGZ1bmN0aW9uIF9zZXRfaW50ZXJ2YWxfaWQoaW50ZXJ2YWxJZCkge1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IGludGVydmFsSWQ7XG4gIH0sXG4gIF9zZXRfaXNfaGlkaW5nOiBmdW5jdGlvbiBfc2V0X2lzX2hpZGluZyhpc0hpZGluZykge1xuICAgIHRoaXMuaXNIaWRpbmcgPSBpc0hpZGluZztcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9hbmltYXRpb25NaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgQ1NTQ29yZVxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCcuL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFRoZSBDU1NDb3JlIG1vZHVsZSBzcGVjaWZpZXMgdGhlIEFQSSAoYW5kIGltcGxlbWVudHMgbW9zdCBvZiB0aGUgbWV0aG9kcylcbiAqIHRoYXQgc2hvdWxkIGJlIHVzZWQgd2hlbiBkZWFsaW5nIHdpdGggdGhlIGRpc3BsYXkgb2YgZWxlbWVudHMgKHZpYSB0aGVpclxuICogQ1NTIGNsYXNzZXMgYW5kIHZpc2liaWxpdHkgb24gc2NyZWVuLiBJdCBpcyBhbiBBUEkgZm9jdXNlZCBvbiBtdXRhdGluZyB0aGVcbiAqIGRpc3BsYXkgYW5kIG5vdCByZWFkaW5nIGl0IGFzIG5vIGxvZ2ljYWwgc3RhdGUgc2hvdWxkIGJlIGVuY29kZWQgaW4gdGhlXG4gKiBkaXNwbGF5IG9mIGVsZW1lbnRzLlxuICovXG5cbnZhciBDU1NDb3JlID0ge1xuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBjbGFzcyBwYXNzZWQgaW4gdG8gdGhlIGVsZW1lbnQgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGhhdmUgaXQuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhlIGVsZW1lbnQgcGFzc2VkIGluXG4gICAqL1xuICBhZGRDbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0NTU0NvcmUuYWRkQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLiBcIiVzXCIgY29udGFpbnMgJyArICdtdWx0aXBsZSBjbGFzc2VzLicsIGNsYXNzTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIGlmICghQ1NTQ29yZS5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjbGFzcyBwYXNzZWQgaW4gZnJvbSB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoZSBlbGVtZW50IHBhc3NlZCBpblxuICAgKi9cbiAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAhIS9cXHMvLnRlc3QoY2xhc3NOYW1lKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1NDb3JlLnJlbW92ZUNsYXNzIHRha2VzIG9ubHkgYSBzaW5nbGUgY2xhc3MgbmFtZS4gXCIlc1wiIGNvbnRhaW5zICcgKyAnbXVsdGlwbGUgY2xhc3Nlcy4nLCBjbGFzc05hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoQ1NTQ29yZS5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzfCQpJywgJ2cnKSwgJyQxJykucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIG11bHRpcGxlIHNwYWNlcyB0byBvbmVcbiAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTsgLy8gdHJpbSB0aGUgZW5kc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICAvKipcbiAgICogSGVscGVyIHRvIGFkZCBvciByZW1vdmUgYSBjbGFzcyBmcm9tIGFuIGVsZW1lbnQgYmFzZWQgb24gYSBjb25kaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHBhcmFtIHsqfSBib29sIGNvbmRpdGlvbiB0byB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgdGhlIGNsYXNzXG4gICAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoZSBlbGVtZW50IHBhc3NlZCBpblxuICAgKi9cbiAgY29uZGl0aW9uQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgICByZXR1cm4gKGJvb2wgPyBDU1NDb3JlLmFkZENsYXNzIDogQ1NTQ29yZS5yZW1vdmVDbGFzcykoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgfSxcblxuICAvKipcbiAgICogVGVzdHMgd2hldGhlciB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzIHNwZWNpZmllZC5cbiAgICpcbiAgICogQHBhcmFtIHtET01Ob2RlfERPTVdpbmRvd30gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzLCBmYWxzZSBpZiBub3RcbiAgICovXG4gIGhhc0NsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgISEvXFxzLy50ZXN0KGNsYXNzTmFtZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ1NTLmhhc0NsYXNzIHRha2VzIG9ubHkgYSBzaW5nbGUgY2xhc3MgbmFtZS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICByZXR1cm4gISFjbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuICgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbGFzc05hbWUgKyAnICcpID4gLTE7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDU1NDb3JlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL0NTU0NvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RUcmFuc2l0aW9uRXZlbnRzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG4vKipcbiAqIEVWRU5UX05BTUVfTUFQIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIGV2ZW50IGZpcmVkIHdoZW4gYVxuICogdHJhbnNpdGlvbi9hbmltYXRpb24gZW5kcywgYmFzZWQgb24gdGhlIHN0eWxlIHByb3BlcnR5IHVzZWQgdG9cbiAqIGRlZmluZSB0aGF0IGV2ZW50LlxuICovXG52YXIgRVZFTlRfTkFNRV9NQVAgPSB7XG4gIHRyYW5zaXRpb25lbmQ6IHtcbiAgICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAnTW96VHJhbnNpdGlvbic6ICdtb3pUcmFuc2l0aW9uRW5kJyxcbiAgICAnT1RyYW5zaXRpb24nOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICdtc1RyYW5zaXRpb24nOiAnTVNUcmFuc2l0aW9uRW5kJ1xuICB9LFxuXG4gIGFuaW1hdGlvbmVuZDoge1xuICAgICdhbmltYXRpb24nOiAnYW5pbWF0aW9uZW5kJyxcbiAgICAnV2Via2l0QW5pbWF0aW9uJzogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgJ01vekFuaW1hdGlvbic6ICdtb3pBbmltYXRpb25FbmQnLFxuICAgICdPQW5pbWF0aW9uJzogJ29BbmltYXRpb25FbmQnLFxuICAgICdtc0FuaW1hdGlvbic6ICdNU0FuaW1hdGlvbkVuZCdcbiAgfVxufTtcblxudmFyIGVuZEV2ZW50cyA9IFtdO1xuXG5mdW5jdGlvbiBkZXRlY3RFdmVudHMoKSB7XG4gIHZhciB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmFyIHN0eWxlID0gdGVzdEVsLnN0eWxlO1xuXG4gIC8vIE9uIHNvbWUgcGxhdGZvcm1zLCBpbiBwYXJ0aWN1bGFyIHNvbWUgcmVsZWFzZXMgb2YgQW5kcm9pZCA0LngsXG4gIC8vIHRoZSB1bi1wcmVmaXhlZCBcImFuaW1hdGlvblwiIGFuZCBcInRyYW5zaXRpb25cIiBwcm9wZXJ0aWVzIGFyZSBkZWZpbmVkIG9uIHRoZVxuICAvLyBzdHlsZSBvYmplY3QgYnV0IHRoZSBldmVudHMgdGhhdCBmaXJlIHdpbGwgc3RpbGwgYmUgcHJlZml4ZWQsIHNvIHdlIG5lZWRcbiAgLy8gdG8gY2hlY2sgaWYgdGhlIHVuLXByZWZpeGVkIGV2ZW50cyBhcmUgdXNlYWJsZSwgYW5kIGlmIG5vdCByZW1vdmUgdGhlbVxuICAvLyBmcm9tIHRoZSBtYXBcbiAgaWYgKCEoJ0FuaW1hdGlvbkV2ZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgZGVsZXRlIEVWRU5UX05BTUVfTUFQLmFuaW1hdGlvbmVuZC5hbmltYXRpb247XG4gIH1cblxuICBpZiAoISgnVHJhbnNpdGlvbkV2ZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgZGVsZXRlIEVWRU5UX05BTUVfTUFQLnRyYW5zaXRpb25lbmQudHJhbnNpdGlvbjtcbiAgfVxuXG4gIGZvciAodmFyIGJhc2VFdmVudE5hbWUgaW4gRVZFTlRfTkFNRV9NQVApIHtcbiAgICB2YXIgYmFzZUV2ZW50cyA9IEVWRU5UX05BTUVfTUFQW2Jhc2VFdmVudE5hbWVdO1xuICAgIGZvciAodmFyIHN0eWxlTmFtZSBpbiBiYXNlRXZlbnRzKSB7XG4gICAgICBpZiAoc3R5bGVOYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGVuZEV2ZW50cy5wdXNoKGJhc2VFdmVudHNbc3R5bGVOYW1lXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5pZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NKSB7XG4gIGRldGVjdEV2ZW50cygpO1xufVxuXG4vLyBXZSB1c2UgdGhlIHJhdyB7YWRkfHJlbW92ZX1FdmVudExpc3RlbmVyKCkgY2FsbCBiZWNhdXNlIEV2ZW50TGlzdGVuZXJcbi8vIGRvZXMgbm90IGtub3cgaG93IHRvIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMgYW5kIHdlIHJlYWxseSBzaG91bGRcbi8vIGNsZWFuIHVwLiBBbHNvLCB0aGVzZSBldmVudHMgYXJlIG5vdCB0cmlnZ2VyZWQgaW4gb2xkZXIgYnJvd3NlcnNcbi8vIHNvIHdlIHNob3VsZCBiZSBBLU9LIGhlcmUuXG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnROYW1lLCBldmVudExpc3RlbmVyKSB7XG4gIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xufVxuXG52YXIgUmVhY3RUcmFuc2l0aW9uRXZlbnRzID0ge1xuICBhZGRFbmRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAobm9kZSwgZXZlbnRMaXN0ZW5lcikge1xuICAgIGlmIChlbmRFdmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBJZiBDU1MgdHJhbnNpdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQsIHRyaWdnZXIgYW4gXCJlbmQgYW5pbWF0aW9uXCJcbiAgICAgIC8vIGV2ZW50IGltbWVkaWF0ZWx5LlxuICAgICAgd2luZG93LnNldFRpbWVvdXQoZXZlbnRMaXN0ZW5lciwgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVuZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbmRFdmVudCkge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRFdmVudCwgZXZlbnRMaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKG5vZGUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAoZW5kRXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmRFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZW5kRXZlbnQpIHtcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIobm9kZSwgZW5kRXZlbnQsIGV2ZW50TGlzdGVuZXIpO1xuICAgIH0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VHJhbnNpdGlvbkV2ZW50cztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RUcmFuc2l0aW9uRXZlbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFeGVjdXRpb25FbnZpcm9ubWVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczogY2FuVXNlRE9NICYmICEhKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8IHdpbmRvdy5hdHRhY2hFdmVudCksXG5cbiAgY2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW4sXG5cbiAgaXNJbldvcmtlcjogIWNhblVzZURPTSAvLyBGb3Igbm93LCB0aGlzIGlzIHRydWUgLSBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGVjdXRpb25FbnZpcm9ubWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9+L2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNhbGxfc2hvd19tZXRob2QoJG5vZGUsIHByb3BzKSB7XG4gICRub2RlW3Byb3BzLnNob3dNZXRob2RdKHtcbiAgICBkdXJhdGlvbjogcHJvcHMuc2hvd0R1cmF0aW9uLFxuICAgIGVhc2luZzogcHJvcHMuc2hvd0Vhc2luZ1xuICB9KTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogXCJub25lXCIgfSxcbiAgICAgIC8vIGVmZmVjdGl2ZSAkLmhpZGUoKVxuICAgICAgc2hvd01ldGhvZDogXCJmYWRlSW5cIiwgLy8gc2xpZGVEb3duLCBhbmQgc2hvdyBhcmUgYnVpbHQgaW50byBqUXVlcnlcbiAgICAgIHNob3dEdXJhdGlvbjogMzAwLFxuICAgICAgc2hvd0Vhc2luZzogXCJzd2luZ1wiLCAvLyBhbmQgbGluZWFyIGFyZSBidWlsdCBpbnRvIGpRdWVyeVxuICAgICAgaGlkZU1ldGhvZDogXCJmYWRlT3V0XCIsXG4gICAgICBoaWRlRHVyYXRpb246IDEwMDAsXG4gICAgICBoaWRlRWFzaW5nOiBcInN3aW5nXCIsXG4gICAgICAvL1xuICAgICAgdGltZU91dDogNTAwMCxcbiAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMFxuICAgIH07XG4gIH0sXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbElkOiBudWxsLFxuICAgICAgaXNIaWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNhbGxfc2hvd19tZXRob2QodGhpcy5fZ2V0XyRfbm9kZSgpLCB0aGlzLnByb3BzKTtcbiAgICBpZiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMudGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgaGFuZGxlTW91c2VFbnRlcjogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zdGF0ZS5pbnRlcnZhbElkKTtcbiAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQobnVsbCk7XG4gICAgdGhpcy5fc2V0X2lzX2hpZGluZyhmYWxzZSk7XG5cbiAgICBjYWxsX3Nob3dfbWV0aG9kKHRoaXMuX2dldF8kX25vZGUoKS5zdG9wKHRydWUsIHRydWUpLCB0aGlzLnByb3BzKTtcbiAgfSxcbiAgaGFuZGxlTW91c2VMZWF2ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNIaWRpbmcgJiYgKHRoaXMucHJvcHMudGltZU91dCA+IDAgfHwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQgPiAwKSkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMuZXh0ZW5kZWRUaW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBoaWRlVG9hc3Q6IGZ1bmN0aW9uIGhpZGVUb2FzdChvdmVycmlkZSkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzSGlkaW5nIHx8IHRoaXMuc3RhdGUuaW50ZXJ2YWxJZCA9PT0gbnVsbCAmJiAhb3ZlcnJpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzSGlkaW5nOiB0cnVlIH0pO1xuXG4gICAgdGhpcy5fZ2V0XyRfbm9kZSgpW3RoaXMucHJvcHMuaGlkZU1ldGhvZF0oe1xuICAgICAgZHVyYXRpb246IHRoaXMucHJvcHMuaGlkZUR1cmF0aW9uLFxuICAgICAgZWFzaW5nOiB0aGlzLnByb3BzLmhpZGVFYXNpbmcsXG4gICAgICBjb21wbGV0ZTogdGhpcy5faGFuZGxlX3JlbW92ZVxuICAgIH0pO1xuICB9LFxuICBfZ2V0XyRfbm9kZTogZnVuY3Rpb24gX2dldF8kX25vZGUoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICByZXR1cm4galF1ZXJ5KF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xuICB9LFxuICBfc2V0X2ludGVydmFsX2lkOiBmdW5jdGlvbiBfc2V0X2ludGVydmFsX2lkKGludGVydmFsSWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGludGVydmFsSWQ6IGludGVydmFsSWRcbiAgICB9KTtcbiAgfSxcbiAgX3NldF9pc19oaWRpbmc6IGZ1bmN0aW9uIF9zZXRfaXNfaGlkaW5nKGlzSGlkaW5nKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc0hpZGluZzogaXNIaWRpbmdcbiAgICB9KTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VCdXR0b24gZnJvbSAnLi9QYWdlQnV0dG9uLmpzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIFBhZ2luYXRpb25MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFBhZ2U6IHRoaXMucHJvcHMuY3VyclBhZ2UsXG4gICAgICBzaXplUGVyUGFnZTogdGhpcy5wcm9wcy5zaXplUGVyUGFnZVxuICAgIH07XG4gIH1cblxuICBjaGFuZ2VQYWdlKHBhZ2UpIHtcbiAgICBpZiAocGFnZSA9PSB0aGlzLnByb3BzLnByZVBhZ2UpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gMSA8IDEgPyAxIDogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSAtIDE7XG4gICAgfSBlbHNlIGlmIChwYWdlID09IHRoaXMucHJvcHMubmV4dFBhZ2UpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlICsgMSA+IHRoaXMudG90YWxQYWdlcyA/IHRoaXMudG90YWxQYWdlcyA6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgKyAxO1xuICAgIH0gZWxzZSBpZiAocGFnZSA9PSB0aGlzLnByb3BzLmxhc3RQYWdlKSB7XG4gICAgICBwYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgIH0gZWxzZSBpZiAocGFnZSA9PSB0aGlzLnByb3BzLmZpcnN0UGFnZSkge1xuICAgICAgcGFnZSA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2UgPSBwYXJzZUludChwYWdlKTtcbiAgICB9XG5cbiAgICBpZiAocGFnZSAhPSB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50UGFnZTogcGFnZX0pO1xuICAgICAgdGhpcy5wcm9wcy5jaGFuZ2VQYWdlKHBhZ2UsIHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3RlKSB7XG4gICAgICBpZiAobmV4dFByb3BzLmN1cnJQYWdlIHx8IG5leHRQcm9wcy5zaXplUGVyUGFnZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogbmV4dFByb3BzLmN1cnJQYWdlLFxuICAgICAgICAgIHNpemVQZXJQYWdlOiBuZXh0UHJvcHMuc2l6ZVBlclBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgY2hhbmdlU2l6ZVBlclBhZ2UoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBzZWxlY3RTaXplID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LnRleHQpO1xuICAgIGlmIChzZWxlY3RTaXplICE9IHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2UpIHtcbiAgICAgIHRoaXMudG90YWxQYWdlcyA9IE1hdGguY2VpbCh0aGlzLnByb3BzLmRhdGFTaXplIC8gc2VsZWN0U2l6ZSk7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA+IHRoaXMudG90YWxQYWdlcylcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9IHRoaXMudG90YWxQYWdlcztcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNpemVQZXJQYWdlOiBzZWxlY3RTaXplLFxuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZVxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BzLmNoYW5nZVBhZ2UodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSwgc2VsZWN0U2l6ZSk7XG4gICAgICBpZih0aGlzLnByb3BzLm9uU2l6ZVBlclBhZ2VMaXN0KXtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNpemVQZXJQYWdlTGlzdChzZWxlY3RTaXplKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMucHJvcHMuZGF0YVNpemUgLyB0aGlzLnN0YXRlLnNpemVQZXJQYWdlKTtcbiAgICB2YXIgcGFnZUJ0bnMgPSB0aGlzLm1ha2VQYWdlKCk7XG4gICAgdmFyIHBhZ2VMaXN0U3R5bGUgPSB7XG4gICAgICBmbG9hdDogXCJyaWdodFwiLFxuICAgICAgbWFyZ2luVG9wOiBcIjBweFwiICAvL292ZXJyaWRlIHRoZSBtYXJnaW4tdG9wIGRlZmluZWQgaW4gLnBhZ2luYXRpb24gY2xhc3MgaW4gYm9vdHN0cmFwLlxuICAgIH1cblxuICAgIHZhciBzaXplUGVyUGFnZUxpc3QgPSB0aGlzLnByb3BzLnNpemVQZXJQYWdlTGlzdC5tYXAoKHNpemVQZXJQYWdlKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGkga2V5PXtzaXplUGVyUGFnZX0gcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgICAgIDxhIHJvbGU9XCJtZW51aXRlbVwiIHRhYkluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuY2hhbmdlU2l6ZVBlclBhZ2UuYmluZCh0aGlzKX0+e3NpemVQZXJQYWdlfTwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBtYXJnaW5Ub3A6IDE1IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnNpemVQZXJQYWdlTGlzdC5sZW5ndGggPiAxID9cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJwYWdlRHJvcERvd25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cInRydWVcIj5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2l6ZVBlclBhZ2V9XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIHtcIiBcIn1cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwicGFnZURyb3BEb3duXCI+XG4gICAgICAgICAgICAgIHtzaXplUGVyUGFnZUxpc3R9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInBhZ2luYXRpb25cIiBzdHlsZT17cGFnZUxpc3RTdHlsZX0+XG4gICAgICAgICAgICB7cGFnZUJ0bnN9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBtYWtlUGFnZSgpIHtcbiAgICB2YXIgcGFnZXMgPSB0aGlzLmdldFBhZ2VzKCk7XG4gICAgcmV0dXJuIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSkge1xuICAgICAgdmFyIGlzQWN0aXZlID0gcGFnZSA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgICAgIHZhciBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgdmFyIGhpZGRlbiA9IGZhbHNlO1xuICAgICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PSAxICYmXG4gICAgICAgIChwYWdlID09PSB0aGlzLnByb3BzLmZpcnN0UGFnZSB8fCBwYWdlID09PSB0aGlzLnByb3BzLnByZVBhZ2UpKXtcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gdGhpcy50b3RhbFBhZ2VzICYmXG4gICAgICAgIChwYWdlID09PSB0aGlzLnByb3BzLm5leHRQYWdlIHx8IHBhZ2UgPT09IHRoaXMucHJvcHMubGFzdFBhZ2UpKXtcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQYWdlQnV0dG9uIGNoYW5nZVBhZ2U9e3RoaXMuY2hhbmdlUGFnZS5iaW5kKHRoaXMpfSBhY3RpdmU9e2lzQWN0aXZlfSBkaXNhYmxlPXtkaXNhYmxlZH0gaGlkZGVuPXtoaWRkZW59IGtleT17cGFnZX0+e3BhZ2V9PC9QYWdlQnV0dG9uPlxuICAgICAgKVxuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgZ2V0UGFnZXMoKSB7XG4gICAgdmFyIHN0YXJ0UGFnZSA9IDEsIGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG5cbiAgICBzdGFydFBhZ2UgPSBNYXRoLm1heCh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlIC0gTWF0aC5mbG9vcih0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplIC8gMiksIDEpO1xuICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplIC0gMTtcblxuICAgIGlmIChlbmRQYWdlID4gdGhpcy50b3RhbFBhZ2VzKSB7XG4gICAgICBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgICAgc3RhcnRQYWdlID0gZW5kUGFnZSAtIHRoaXMucHJvcHMucGFnaW5hdGlvblNpemUgKyAxO1xuICAgIH1cbiAgICB2YXIgcGFnZXM7XG4gICAgaWYoc3RhcnRQYWdlICE9IDEgJiYgdGhpcy50b3RhbFBhZ2VzID4gdGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSkge1xuICAgICAgcGFnZXMgPSBbdGhpcy5wcm9wcy5maXJzdFBhZ2UsIHRoaXMucHJvcHMucHJlUGFnZV07XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsUGFnZXMgPiAxKSB7XG4gICAgICBwYWdlcyA9IFt0aGlzLnByb3BzLnByZVBhZ2VdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhZ2VzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgIGlmIChpID4gMClwYWdlcy5wdXNoKGkpO1xuICAgIH1cbiAgICBpZiAoZW5kUGFnZSAhPSB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIHBhZ2VzLnB1c2godGhpcy5wcm9wcy5uZXh0UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubGFzdFBhZ2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFBhZ2VzID4gMSl7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubmV4dFBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBnZXRDdXJyZW50UGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcbiAgfVxuXG4gIGdldFNpemVQZXJQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNpemVQZXJQYWdlO1xuICB9XG59XG5QYWdpbmF0aW9uTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGN1cnJQYWdlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBzaXplUGVyUGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgZGF0YVNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIGNoYW5nZVBhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBzaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgcGFnaW5hdGlvblNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIHJlbW90ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uU2l6ZVBlclBhZ2VMaXN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgcHJlUGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuUGFnaW5hdGlvbkxpc3QuZGVmYXVsdFByb3BzID0ge1xuICBzaXplUGVyUGFnZTogQ29uc3QuU0laRV9QRVJfUEFHRVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvbkxpc3Q7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdpbmF0aW9uL1BhZ2luYXRpb25MaXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgUGFnZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXG4gIHBhZ2VCdG5DbGljayhlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5jaGFuZ2VQYWdlKGUuY3VycmVudFRhcmdldC50ZXh0KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciBjbGFzc2VzID0gY2xhc3NTZXQoe1xuICAgICAgICAnYWN0aXZlJzogdGhpcy5wcm9wcy5hY3RpdmUsXG4gICAgICAgICdkaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZSxcbiAgICAgICAgJ2hpZGRlbic6IHRoaXMucHJvcHMuaGlkZGVuXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlc30+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLnBhZ2VCdG5DbGljay5iaW5kKHRoaXMpfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2E+PC9saT5cbiAgICApXG4gIH1cbn1cblBhZ2VCdXR0b24ucHJvcFR5cGVzID0ge1xuICBjaGFuZ2VQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VCdXR0b247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdpbmF0aW9uL1BhZ2VCdXR0b24uanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi4vRWRpdG9yJztcbmltcG9ydCBOb3RpZmllciBmcm9tICcuLi9Ob3RpZmljYXRpb24uanMnO1xuXG5jbGFzcyBUb29sQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0luc2VydFJvd1RyaWdnZXI6IHRydWUsXG4gICAgICB2YWxpZGF0ZVN0YXRlOm51bGwsXG4gICAgICBzaGFrZUVkaXRvcjpmYWxzZSxcbiAgICAgIHNob3dTZWxlY3RlZDogZmFsc2VcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgfVxuICBjbGVhclRpbWVvdXQoKSB7XG4gICAgaWYodGhpcy50aW1lb3V0ZUNsZWFyKXtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRlQ2xlYXIpO1xuICAgICAgdGhpcy50aW1lb3V0ZUNsZWFyPTA7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tBbmRQYXJzZUZvcm0oKXtcbiAgICB2YXIgdHM9dGhpcyxuZXdPYmogPSB7fSxpc1ZhbGlkPXRydWUsdGVtcFZhbHVlLHRlbXBNc2csdmFsaWRhdGVTdGF0ZT17fTtcbiAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgaWYoY29sdW1uLmF1dG9WYWx1ZSl7Ly93aGVuIHlvdSB3YW50IHNhbWUgYXV0byBnZW5lcmF0ZSB2YWx1ZSBhbmQgbm90IGFsbG93IGVkaXQsIGV4YW1wbGUgSUQgZmllbGRcbiAgICAgICAgdGVtcFZhbHVlPXR5cGVvZiBjb2x1bW4uYXV0b1ZhbHVlPT0nZnVuY3Rpb24nP2NvbHVtbi5hdXRvVmFsdWUoKTooJ2F1dG92YWx1ZS0nK25ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBsZXQgZG9tID0gdGhpcy5yZWZzW2NvbHVtbi5maWVsZCtpXTtcbiAgICAgICAgdGVtcFZhbHVlID0gZG9tLnZhbHVlO1xuXG4gICAgICAgIGlmKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdGFibGUudHlwZSA9PSAnY2hlY2tib3gnKXtcbiAgICAgICAgICBsZXQgdmFsdWVzID0gZG9tLnZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgdGVtcFZhbHVlID0gZG9tLmNoZWNrZWQ/IHZhbHVlc1swXTp2YWx1ZXNbMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjb2x1bW4uZWRpdGFibGUmJmNvbHVtbi5lZGl0YWJsZS52YWxpZGF0b3Ipey8vcHJvY2VzcyB2YWxpZGF0ZVxuICAgICAgICAgIHRlbXBNc2c9IGNvbHVtbi5lZGl0YWJsZS52YWxpZGF0b3IodGVtcFZhbHVlKVxuICAgICAgICAgIGlmKHRlbXBNc2chPT10cnVlKXtcbiAgICAgICAgICAgIGlzVmFsaWQ9ZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0ZVN0YXRlW2NvbHVtbi5maWVsZF09dGVtcE1zZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3T2JqW2NvbHVtbi5maWVsZF0gPXRlbXBWYWx1ZTtcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmKGlzVmFsaWQpe1xuICAgICAgcmV0dXJuIG5ld09iajtcbiAgICB9ZWxzZXtcbiAgICAgIHRzLmNsZWFyVGltZW91dCgpO1xuICAgICAgLy9zaG93IGVycm9yIGluIGZvcm0gYW5kIHNoYWtlIGl0XG4gICAgICB0aGlzLnNldFN0YXRlKHt2YWxpZGF0ZVN0YXRlOnZhbGlkYXRlU3RhdGUsc2hha2VFZGl0b3I6dHJ1ZX0pO1xuICAgICAgLy9ub3RpZmllciBlcnJvclxuICAgICAgdHMucmVmcy5ub3RpZmllci5ub3RpY2UoJ2Vycm9yJyxcIkZvcm0gdmFsaWRhdGUgZXJyb3JzLCBwbGVhc2UgY2hlY2tpbmchXCIsXCJQcmVzc2VkIEVTQyBjYW4gY2FuY2VsXCIpO1xuICAgICAgLy9jbGVhciBhbmltYXRlIGNsYXNzXG4gICAgICB0cy50aW1lb3V0ZUNsZWFyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6ZmFsc2V9KTt9LDMwMCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTYXZlQnRuQ2xpY2soZSl7XG4gICAgdmFyIG5ld09iaiA9IHRoaXMuY2hlY2tBbmRQYXJzZUZvcm0oKTtcbiAgICBpZighbmV3T2JqKXsvL3ZhbGlkYXRlIGVycm9yc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbXNnID0gdGhpcy5wcm9wcy5vbkFkZFJvdyhuZXdPYmopO1xuICAgIGlmKG1zZykge1xuICAgICAgdmFyIHRzPXRoaXM7XG4gICAgICB0cy5yZWZzLm5vdGlmaWVyLm5vdGljZSgnZXJyb3InLG1zZyxcIlByZXNzZWQgRVNDIGNhbiBjYW5jZWxcIik7XG4gICAgICB0cy5jbGVhclRpbWVvdXQoKTtcbiAgICAgIC8vc2hha2UgZm9ybSBhbmQgaGFjayBwcmV2ZW50IG1vZGFsIGhpZGVcbiAgICAgIHRzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjp0cnVlLHZhbGlkYXRlU3RhdGU6XCJ0aGlzIGlzIGhhY2sgZm9yIHByZXZlbnQgYm9vdHN0cmFwIG1vZGFsIGhpZGVcIn0pO1xuICAgICAgLy9jbGVhciBhbmltYXRlIGNsYXNzXG4gICAgICB0cy50aW1lb3V0ZUNsZWFyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6ZmFsc2V9KTt9LDMwMCk7XG4gICAgfSBlbHNle1xuICAgICAgLy9yZXNldCBzdGF0ZSBhbmQgaGlkZSBtb2RhbCBoaWRlXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsaWRhdGVTdGF0ZTpudWxsLFxuICAgICAgICBzaGFrZUVkaXRvcjpmYWxzZVxuICAgICAgfSk7XG4gICAgICAvL3Jlc2V0IGZvcm1cbiAgICAgIHRoaXMucmVmcy5mb3JtLnJlc2V0KCk7XG5cbiAgICB9XG4gIH1cblxuICBoYW5kbGVTaG93T25seVRvZ2dsZSA9IGUgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd1NlbGVjdGVkOiAhdGhpcy5zdGF0ZS5zaG93U2VsZWN0ZWRcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uU2hvd09ubHlTZWxlY3RlZCgpO1xuICB9XG5cbiAgaGFuZGxlRHJvcFJvd0J0bkNsaWNrKGUpe1xuICAgIHRoaXMucHJvcHMub25Ecm9wUm93KCk7XG4gIH1cblxuICBoYW5kbGVDbG9zZUJ0bihlKXtcbiAgICB0aGlzLnJlZnMud2FybmluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICBoYW5kbGVLZXlVcChlKXtcbiAgICB0aGlzLnByb3BzLm9uU2VhcmNoKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVFeHBvcnRDU1YoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkV4cG9ydENTVigpO1xuICB9XG5cbiAgaGFuZGxlQ2xlYXJCdG5DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnJlZnMuc2VhY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMucHJvcHMub25TZWFyY2goJycpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIG1vZGFsQ2xhc3NOYW1lID0gXCJicy10YWJsZS1tb2RhbC1zbVwiK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciBpbnNlcnRCdG4gPSB0aGlzLnByb3BzLmVuYWJsZUluc2VydD9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQWRkUm93QmVnaW59IGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyByZWFjdC1icy10YWJsZS1hZGQtYnRuXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PXsnLicrbW9kYWxDbGFzc05hbWV9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9pPiBOZXc8L2J1dHRvbj46bnVsbDtcblxuICAgIHZhciBkZWxldGVCdG4gPSB0aGlzLnByb3BzLmVuYWJsZURlbGV0ZT9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgcmVhY3QtYnMtdGFibGUtZGVsLWJ0blwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIiB0aXRsZT1cIkRyb3Agc2VsZWN0ZWQgcm93XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRHJvcFJvd0J0bkNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiPjwvaT4gRGVsZXRlXG4gICAgICAgICAgPC9idXR0b24+Om51bGw7XG5cbiAgICB2YXIgc2VhcmNoVGV4dElucHV0ID0gdGhpcy5yZW5kZXJTZWFyY2hQYW5lbCgpO1xuXG4gICAgdmFyIHNob3dTZWxlY3RlZE9ubHlCdG4gPSB0aGlzLnByb3BzLmVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ/XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVNob3dPbmx5VG9nZ2xlLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLnNob3dTZWxlY3RlZD8gQ29uc3QuU0hPV19BTEwgOiBDb25zdC5TSE9XX09OTFlfU0VMRUNUIH1cbiAgICAgIDwvYnV0dG9uPjpudWxsO1xuXG4gICAgdmFyIG1vZGFsID0gdGhpcy5wcm9wcy5lbmFibGVJbnNlcnQ/dGhpcy5yZW5kZXJJbnNlcnRSb3dNb2RhbChtb2RhbENsYXNzTmFtZSk6bnVsbDtcbiAgICB2YXIgd2FybmluZ1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogXCJub25lXCIsXG4gICAgICBtYXJnaW5Cb3R0b206IDBcbiAgICB9O1xuXG4gICAgdmFyIGV4cG9ydENTViA9IHRoaXMucHJvcHMuZW5hYmxlRXhwb3J0Q1NWID9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3NcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUV4cG9ydENTVi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leHBvcnRcIj48L2k+IEV4cG9ydCB0byBDU1Y8L2J1dHRvbj4gOiBudWxsO1xuXG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTYgY29sLWxnLThcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBidG4tZ3JvdXAtc21cIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgIHtleHBvcnRDU1Z9XG4gICAgICAgICAgICB7aW5zZXJ0QnRufVxuICAgICAgICAgICAge2RlbGV0ZUJ0bn1cbiAgICAgICAgICAgIHtzaG93U2VsZWN0ZWRPbmx5QnRufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTYgY29sLWxnLTRcIj5cbiAgICAgICAgICB7c2VhcmNoVGV4dElucHV0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPE5vdGlmaWVyIHJlZj1cIm5vdGlmaWVyXCI+PC9Ob3RpZmllcj5cbiAgICAgICAge21vZGFsfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyU2VhcmNoUGFuZWwoKSB7XG4gICAgaWYodGhpcy5wcm9wcy5lbmFibGVTZWFyY2gpIHtcbiAgICAgIGxldCBjbGFzc05hbWVzID0gJ2Zvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbSc7XG4gICAgICBsZXQgY2xlYXJCdG4gPSBudWxsO1xuICAgICAgaWYodGhpcy5wcm9wcy5jbGVhclNlYXJjaCkge1xuICAgICAgICBjbGVhckJ0biA9IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsZWFyQnRuQ2xpY2sgfT5DbGVhcjwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICAgICAgY2xhc3NOYW1lcyA9ICdmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtc20gaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtc20nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lc30+XG4gICAgICAgICAgPGlucHV0IHJlZj0nc2VhY2hJbnB1dCcgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlaG9sZGVyP3RoaXMucHJvcHMuc2VhcmNoUGxhY2Vob2xkZXI6J1NlYXJjaCd9XG4gICAgICAgICAgICBvbktleVVwPXt0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgIHsgY2xlYXJCdG4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckluc2VydFJvd01vZGFsKG1vZGFsQ2xhc3NOYW1lKXtcbiAgICB2YXIgdmFsaWRhdGVTdGF0ZT10aGlzLnN0YXRlLnZhbGlkYXRlU3RhdGV8fHt9O1xuICAgIHZhciBpbnB1dEZpZWxkID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgdmFyIGVkaXRhYmxlPWNvbHVtbi5lZGl0YWJsZSxcbiAgICAgICAgICBmb3JtYXQ9Y29sdW1uLmZvcm1hdCxcbiAgICAgICAgICBhdHRyPXtyZWY6Y29sdW1uLmZpZWxkK2kscGxhY2Vob2xkZXI6ZWRpdGFibGUucGxhY2Vob2xkZXI/ZWRpdGFibGUucGxhY2Vob2xkZXI6Y29sdW1uLm5hbWV9O1xuXG4gICAgICBpZihjb2x1bW4uYXV0b1ZhbHVlKXsvL3doZW4geW91IHdhbnQgc2FtZSBhdXRvIGdlbmVyYXRlIHZhbHVlIGFuZCBub3QgYWxsb3cgZWRpdCwgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvcj12YWxpZGF0ZVN0YXRlW2NvbHVtbi5maWVsZF0/KDxzcGFuIGNsYXNzTmFtZT1cImhlbHAtYmxvY2sgYmctZGFuZ2VyXCI+e3ZhbGlkYXRlU3RhdGVbY29sdW1uLmZpZWxkXX08L3NwYW4+KTpudWxsO1xuXG4gICAgICAvLyBsZXQgZWRpdG9yID0gRWRpdG9yKGVkaXRhYmxlLGF0dHIsZm9ybWF0KTtcbiAgICAgIC8vIGlmKGVkaXRvci5wcm9wcy50eXBlICYmIGVkaXRvci5wcm9wcy50eXBlID09ICdjaGVja2JveCcpe1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBrZXk9e2NvbHVtbi5maWVsZH0+XG4gICAgICAgICAgPGxhYmVsPntjb2x1bW4ubmFtZX08L2xhYmVsPlxuICAgICAgICAgIHtFZGl0b3IoZWRpdGFibGUsYXR0cixmb3JtYXQsJycpfVxuICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICAgIHZhciBtb2RhbENsYXNzID0gY2xhc3NTZXQoXCJtb2RhbFwiLCBcImZhZGVcIiAsIG1vZGFsQ2xhc3NOYW1lLHtcbiAgICAgICdpbic6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvcnx8dGhpcy5zdGF0ZS52YWxpZGF0ZVN0YXRlLy9oYWNrIHByZXZlbnQgYm9vdHN0cmFwIG1vZGFsIGhpZGUgYnkgcmVSZW5kZXJcbiAgICB9KTtcbiAgICB2YXIgZGlhbG9nQ2xhc3M9Y2xhc3NTZXQoXCJtb2RhbC1kaWFsb2dcIixcIm1vZGFsLXNtXCIse1xuICAgICAgXCJhbmltYXRlZFwiOnRoaXMuc3RhdGUuc2hha2VFZGl0b3IsXG4gICAgICBcInNoYWtlXCI6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvclxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj1cIm1vZGFsXCIgIGNsYXNzTmFtZT17bW9kYWxDbGFzc30gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaWFsb2dDbGFzc30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+TmV3IFJlY29yZDwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8Zm9ybSByZWY9XCJmb3JtXCI+XG4gICAgICAgICAgICAgIHtpbnB1dEZpZWxkfVxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvXCIgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2F2ZUJ0bkNsaWNrLmJpbmQodGhpcyl9PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuVG9vbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25Ecm9wUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25TaG93T25seVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgZW5hYmxlSW5zZXJ0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlRGVsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlU2hvd09ubHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgc2VhcmNoUGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGNsZWFyU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxufTtcblxuVG9vbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGVuYWJsZUluc2VydDogZmFsc2UsXG4gIGVuYWJsZURlbGV0ZTogZmFsc2UsXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXG4gIGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ6IGZhbHNlLFxuICBjbGVhclNlYXJjaDogZmFsc2Vcbn1cbmV4cG9ydCBkZWZhdWx0IFRvb2xCYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90b29sYmFyL1Rvb2xCYXIuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBUYWJsZUZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmZpbHRlck9iaiA9IHt9O1xuICB9XG5cbiAgaGFuZGxlS2V5VXAoZSl7XG4gICAgaWYoZS5jdXJyZW50VGFyZ2V0LnZhbHVlLnRyaW0oKSA9PT0gXCJcIilcbiAgICAgIGRlbGV0ZSB0aGlzLmZpbHRlck9ialtlLmN1cnJlbnRUYXJnZXQubmFtZV07XG4gICAgZWxzZVxuICAgICAgdGhpcy5maWx0ZXJPYmpbZS5jdXJyZW50VGFyZ2V0Lm5hbWVdID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuXG4gICAgdGhpcy5wcm9wcy5vbkZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgdGFibGVDbGFzc2VzID0gY2xhc3NTZXQoXCJ0YWJsZVwiLCB7XG4gICAgICAndGFibGUtc3RyaXBlZCc6IHRoaXMucHJvcHMuc3RyaXBlZCxcbiAgICAgICd0YWJsZS1jb25kZW5zZWQnOiB0aGlzLnByb3BzLmNvbmRlbnNlZFxuICAgIH0pO1xuICAgIHZhciBzZWxlY3RSb3dIZWFkZXIgPSBudWxsO1xuXG4gICAgaWYodGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFIHx8XG4gICAgICAgIHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJKXtcbiAgICAgIGxldCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6MzUsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAwLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDBcbiAgICAgIH1cbiAgICAgIHNlbGVjdFJvd0hlYWRlciA9ICg8dGggc3R5bGU9e3N0eWxlfSBrZXk9ey0xfT5GaWx0ZXI8L3RoPik7XG4gICAgfVxuICAgIHZhciBmaWx0ZXJGaWVsZCA9IHRoaXMucHJvcHMuY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uKXtcbiAgICAgIHZhciB0aFN0eWxlID0ge1xuICAgICAgICBkaXNwbGF5OiBjb2x1bW4uaGlkZGVuP1wibm9uZVwiOm51bGwsXG4gICAgICAgIHdpZHRoOiBjb2x1bW4ud2lkdGhcbiAgICAgIH07XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0aCBrZXk9e2NvbHVtbi5uYW1lfSBzdHlsZT17dGhTdHlsZX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aC1pbm5lciB0YWJsZS1oZWFkZXItY29sdW1uXCI+XG4gICAgICAgICAgICA8aW5wdXQgc2l6ZT1cIjEwXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj17Y29sdW1uLm5hbWV9IG5hbWU9e2NvbHVtbi5uYW1lfSBvbktleVVwPXt0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90aD5cbiAgICAgIClcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4oXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzZXN9IHN0eWxlPXt7bWFyZ2luVG9wOjV9fT5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0ciBzdHlsZT17e2JvcmRlckJvdHRvbVN0eWxlOiAnaGlkZGVuJ319PlxuICAgICAgICAgICAge3NlbGVjdFJvd0hlYWRlcn17ZmlsdGVyRmllbGR9XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgIDwvdGFibGU+XG4gICAgKVxuICB9XG59XG5UYWJsZUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgcm93U2VsZWN0VHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25GaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuZXhwb3J0IGRlZmF1bHQgVGFibGVGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUZpbHRlci5qc1xuICoqLyIsImltcG9ydCBDb25zdCBmcm9tIFwiLi4vQ29uc3RcIjtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbmZ1bmN0aW9uIF9zb3J0KGFyciwgc29ydEZpZWxkLCBvcmRlciwgc29ydEZ1bmMpIHtcbiAgb3JkZXIgPSBvcmRlci50b0xvd2VyQ2FzZSgpO1xuICBhcnIuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChzb3J0RnVuYykge1xuICAgICAgcmV0dXJuIHNvcnRGdW5jKGEsIGIsIG9yZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9yZGVyID09IENvbnN0LlNPUlRfREVTQykge1xuICAgICAgICByZXR1cm4gYVtzb3J0RmllbGRdID4gYltzb3J0RmllbGRdID8gLTEgOiAoKGFbc29ydEZpZWxkXSA8IGJbc29ydEZpZWxkXSkgPyAxIDogMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYVtzb3J0RmllbGRdIDwgYltzb3J0RmllbGRdID8gLTEgOiAoKGFbc29ydEZpZWxkXSA+IGJbc29ydEZpZWxkXSkgPyAxIDogMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgY2xhc3MgVGFibGVEYXRhU2V0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGRhdGEpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVEYXRhU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMuY29sSW5mb3MgPSBudWxsO1xuICAgIHRoaXMuZmlsdGVyZWREYXRhID0gbnVsbDtcbiAgICB0aGlzLmlzT25GaWx0ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmZpbHRlck9iaiA9IG51bGw7XG4gICAgdGhpcy5zZWFyY2hUZXh0ID0gbnVsbDtcbiAgICB0aGlzLnNvcnRPYmogPSBudWxsO1xuICAgIHRoaXMucGFnZU9iaiA9IHt9O1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICB0aGlzLm11bHRpQ29sdW1uU2VhcmNoID0gZmFsc2U7XG4gICAgdGhpcy5zaG93T25seVNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZW1vdGUgPSBmYWxzZTsgLy8gcmVtb3RlIGRhdGFcbiAgfVxuXG4gIHNldFByb3BzKHByb3BzKSB7XG4gICAgdGhpcy5rZXlGaWVsZCA9IHByb3BzLmtleUZpZWxkO1xuICAgIHRoaXMuZW5hYmxlUGFnaW5hdGlvbiA9IHByb3BzLmlzUGFnaW5hdGlvbjtcbiAgICB0aGlzLmNvbEluZm9zID0gcHJvcHMuY29sSW5mb3M7XG4gICAgdGhpcy5yZW1vdGUgPSBwcm9wcy5yZW1vdGU7XG4gICAgdGhpcy5tdWx0aUNvbHVtblNlYXJjaCA9IHByb3BzLm11bHRpQ29sdW1uU2VhcmNoO1xuICB9XG5cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5maWx0ZXJPYmopIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgICAgIGlmIChudWxsICE9PSB0aGlzLnNlYXJjaFRleHQpIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnRPYmopIHtcbiAgICAgIHRoaXMuc29ydCh0aGlzLnNvcnRPYmoub3JkZXIsIHRoaXMuc29ydE9iai5zb3J0RmllbGQpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNvcnRJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLnNvcnRPYmo7XG4gIH1cblxuICBzZXRTZWxlY3RlZFJvd0tleShzZWxlY3RlZFJvd0tleXMpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWRSb3dLZXlzO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRSb3dLZXlzKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgZ2V0Q3VycmVudERpc3BsYXlEYXRhKCkge1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHJldHVybiB0aGlzLmZpbHRlcmVkRGF0YTtcbiAgICBlbHNlIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cblxuICBpZ25vcmVOb25TZWxlY3RlZCgpIHtcbiAgICB0aGlzLnNob3dPbmx5U2VsZWN0ZWQgPSAhdGhpcy5zaG93T25seVNlbGVjdGVkO1xuICAgIGlmKHRoaXMuc2hvd09ubHlTZWxlY3RlZCl7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCByb3cgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maW5kKHggPT4gcm93W3RoaXMua2V5RmllbGRdID09PSB4KVxuICAgICAgICByZXR1cm4gdHlwZW9mIHJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc29ydChvcmRlciwgc29ydEZpZWxkKSB7XG4gICAgdGhpcy5zb3J0T2JqID0ge1xuICAgICAgb3JkZXI6IG9yZGVyLFxuICAgICAgc29ydEZpZWxkOiBzb3J0RmllbGRcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnREaXNwbGF5RGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgaWYoIXRoaXMuY29sSW5mb3Nbc29ydEZpZWxkXSkgcmV0dXJuIHRoaXM7XG5cbiAgICBjb25zdCB7IHNvcnRGdW5jIH0gPSB0aGlzLmNvbEluZm9zW3NvcnRGaWVsZF07XG4gICAgY3VycmVudERpc3BsYXlEYXRhID0gX3NvcnQoY3VycmVudERpc3BsYXlEYXRhLCBzb3J0RmllbGQsIG9yZGVyLCBzb3J0RnVuYyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpIHtcbiAgICB0aGlzLnBhZ2VPYmouZW5kID0gcGFnZSAqIHNpemVQZXJQYWdlIC0gMTtcbiAgICB0aGlzLnBhZ2VPYmouc3RhcnQgPSB0aGlzLnBhZ2VPYmouZW5kIC0gKHNpemVQZXJQYWdlIC0gMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlZGl0KG5ld1ZhbCwgcm93SW5kZXgsIGZpZWxkTmFtZSkge1xuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGxldCByb3dLZXlDYWNoZTtcbiAgICBpZiAoIXRoaXMuZW5hYmxlUGFnaW5hdGlvbikge1xuICAgICAgY3VycmVudERpc3BsYXlEYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gbmV3VmFsO1xuICAgICAgcm93S2V5Q2FjaGUgPSBjdXJyZW50RGlzcGxheURhdGFbcm93SW5kZXhdW3RoaXMua2V5RmllbGRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50RGlzcGxheURhdGFbdGhpcy5wYWdlT2JqLnN0YXJ0ICsgcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBuZXdWYWw7XG4gICAgICByb3dLZXlDYWNoZSA9IGN1cnJlbnREaXNwbGF5RGF0YVt0aGlzLnBhZ2VPYmouc3RhcnQgKyByb3dJbmRleF1bdGhpcy5rZXlGaWVsZF07XG4gICAgfVxuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgaWYgKHJvd1t0aGlzLmtleUZpZWxkXSA9PT0gcm93S2V5Q2FjaGUpIHtcbiAgICAgICAgICByb3dbZmllbGROYW1lXSA9IG5ld1ZhbDtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5maWx0ZXJPYmopIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgICAgIGlmIChudWxsICE9PSB0aGlzLnNlYXJjaFRleHQpIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkKG5ld09iaikge1xuICAgIGlmICghbmV3T2JqW3RoaXMua2V5RmllbGRdIHx8IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpID09PSAnJykge1xuICAgICAgdGhyb3cgdGhpcy5rZXlGaWVsZCArIFwiIGNhbid0IGJlIGVtcHR5IHZhbHVlLlwiO1xuICAgIH1cbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IHRoaXMua2V5RmllbGQgKyBcIiBcIiArIG5ld09ialt0aGlzLmtleUZpZWxkXSArIFwiIGFscmVhZHkgZXhpc3RzXCI7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBjdXJyZW50RGlzcGxheURhdGEucHVzaChuZXdPYmopO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS5wdXNoKG5ld09iaik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKHJvd0tleSkge1xuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGxldCByZXN1bHQgPSBjdXJyZW50RGlzcGxheURhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHJldHVybiByb3dLZXkuaW5kZXhPZihyb3dbdGhpcy5rZXlGaWVsZF0pID09IC0xO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiByb3dLZXkuaW5kZXhPZihyb3dbdGhpcy5rZXlGaWVsZF0pID09IC0xO1xuICAgICAgfSwgdGhpcyk7XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlcihmaWx0ZXJPYmopIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZmlsdGVyT2JqKS5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyT2JqID0gZmlsdGVyT2JqO1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCByb3cgPT4ge1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICBsZXQgZmlsdGVyVmFsO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZmlsdGVyT2JqKSB7XG4gICAgICAgICAgbGV0IHRhcmdldFZhbCA9IHJvd1trZXldO1xuXG4gICAgICAgICAgc3dpdGNoIChmaWx0ZXJPYmpba2V5XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsdGVyVmFsID0gZmlsdGVyT2JqW2tleV0udmFsdWUubnVtYmVyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWx0ZXJWYWwgPSAodHlwZW9mIGZpbHRlck9ialtrZXldLnZhbHVlID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAgICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgICAgICAgKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyBmaWx0ZXJPYmpba2V5XS52YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmlsdGVyT2JqW2tleV0udmFsdWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICBmaWx0ZXJWYWwgPSAodHlwZW9mIGZpbHRlck9ialtrZXldLnZhbHVlID09PSBcInN0cmluZ1wiKSA/IGZpbHRlck9ialtrZXldLnZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmaWx0ZXJPYmpba2V5XS52YWx1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuY29sSW5mb3Nba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZpbHRlckZvcm1hdHRlZCwgZm9ybWF0RXh0cmFEYXRhIH0gPSB0aGlzLmNvbEluZm9zW2tleV07XG4gICAgICAgICAgICBpZihmaWx0ZXJGb3JtYXR0ZWQgJiYgZm9ybWF0KSB7XG4gICAgICAgICAgICAgIHRhcmdldFZhbCA9IGZvcm1hdChyb3dba2V5XSwgcm93LCBmb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXRjaCAoZmlsdGVyT2JqW2tleV0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJOdW1iZXIodGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGZpbHRlck9ialtrZXldLnZhbHVlLmNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuREFURTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlckRhdGUodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YWxpZCA9IHRoaXMuZmlsdGVyQ3VzdG9tKHRhcmdldFZhbCwgZmlsdGVyVmFsLCBmaWx0ZXJPYmpba2V5XS52YWx1ZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICB2YWxpZCA9IHRoaXMuZmlsdGVyVGV4dCh0YXJnZXRWYWwsIGZpbHRlclZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlck51bWJlcih0YXJnZXRWYWwsIGZpbHRlclZhbCwgY29tcGFyYXRvcikge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgc3dpdGNoIChjb21wYXJhdG9yKSB7XG4gICAgICBjYXNlIFwiPVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsICE9IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPlwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsIDw9IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPj1cIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldFZhbCA8IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPFwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsID49IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPD1cIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldFZhbCA+IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiIT1cIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldFZhbCA9PSBmaWx0ZXJWYWwpIHtcbiAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk51bWJlciBjb21wYXJhdG9yIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICBmaWx0ZXJEYXRlKHRhcmdldFZhbCwgZmlsdGVyVmFsKSB7XG4gICAgcmV0dXJuICh0YXJnZXRWYWwuZ2V0RGF0ZSgpID09IGZpbHRlclZhbC5nZXREYXRlKCkgJiZcbiAgICAgICAgdGFyZ2V0VmFsLmdldE1vbnRoKCkgPT0gZmlsdGVyVmFsLmdldE1vbnRoKCkgJiZcbiAgICAgICAgdGFyZ2V0VmFsLmdldEZ1bGxZZWFyKCkgPT0gZmlsdGVyVmFsLmdldEZ1bGxZZWFyKCkpO1xuICB9XG5cbiAgZmlsdGVyQ3VzdG9tKHRhcmdldFZhbCwgZmlsdGVyVmFsLCBjYWxsYmFja0luZm8pIHtcbiAgICBpZiAoY2FsbGJhY2tJbmZvICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrSW5mbyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrSW5mby5jYWxsYmFjayh0YXJnZXRWYWwsIGNhbGxiYWNrSW5mby5jYWxsYmFja1BhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJUZXh0KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgfVxuXG4gIGZpbHRlclRleHQodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpIHtcbiAgICBpZiAodGFyZ2V0VmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbCkgPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNlYXJjaChzZWFyY2hUZXh0KSB7XG4gICAgaWYgKHNlYXJjaFRleHQudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IG51bGw7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQ7XG4gICAgICB2YXIgc2VhcmNoVGV4dEFycmF5ID0gW107XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIHJvdyA9PiB7XG4gICAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpQ29sdW1uU2VhcmNoKSB7XG4gICAgICAgICAgc2VhcmNoVGV4dEFycmF5ID0gc2VhcmNoVGV4dC5zcGxpdCgnICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlYXJjaFRleHRBcnJheS5wdXNoKHNlYXJjaFRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJvdykge1xuICAgICAgICAgIGlmICh0aGlzLmNvbEluZm9zW2tleV0gJiYgcm93W2tleV0pIHtcbiAgICAgICAgICAgIHNlYXJjaFRleHRBcnJheS5mb3JFYWNoKCB0ZXh0ID0+IHtcbiAgICAgICAgICAgICAgbGV0IGZpbHRlclZhbCA9IHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgbGV0IHRhcmdldFZhbCA9IHJvd1trZXldO1xuICAgICAgICAgICAgICBjb25zdCB7IGZvcm1hdCwgZmlsdGVyRm9ybWF0dGVkLCBmb3JtYXRFeHRyYURhdGEsIGhpZGRlbn0gPSB0aGlzLmNvbEluZm9zW2tleV07XG4gICAgICAgICAgICAgIGlmICghaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgaWYoZmlsdGVyRm9ybWF0dGVkICYmIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsID0gZm9ybWF0KHRhcmdldFZhbCwgcm93LCBmb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0VmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh2YWxpZCkgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCkge1xuICAgIGxldCBfZGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgcmV0dXJuIF9kYXRhO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIGxldCBfZGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG5cbiAgICBpZiAoX2RhdGEubGVuZ3RoID09IDApIHJldHVybiBfZGF0YTtcblxuICAgIGlmICh0aGlzLnJlbW90ZSB8fCAhdGhpcy5lbmFibGVQYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gX2RhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnBhZ2VPYmouc3RhcnQ7IGkgPD0gdGhpcy5wYWdlT2JqLmVuZDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKF9kYXRhW2ldKTtcbiAgICAgICAgaWYgKGkgKyAxID09IF9kYXRhLmxlbmd0aClicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0S2V5RmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMua2V5RmllbGQ7XG4gIH1cblxuICBnZXREYXRhTnVtKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpLmxlbmd0aDtcbiAgfVxuXG4gIGlzQ2hhbmdlZFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZU9iai5zdGFydCAmJiB0aGlzLnBhZ2VPYmouZW5kID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0QWxsUm93a2V5KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHJldHVybiByb3dbdGhpcy5rZXlGaWVsZF07XG4gICAgfSwgdGhpcyk7XG4gIH1cblxufVxuO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3RvcmUvVGFibGVEYXRhU3RvcmUuanNcbiAqKi8iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vZXZlbnRzL2V2ZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG4gIHZhciBmaWxlc2F2ZXIgPSByZXF1aXJlKCcuL2ZpbGVzYXZlcicpO1xuICB2YXIgc2F2ZUFzID0gZmlsZXNhdmVyLnNhdmVBc1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZyhkYXRhLCBrZXlzKSB7XG4gIHZhciBkYXRhU3RyaW5nID0gXCJcIjtcbiAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm4gZGF0YVN0cmluZztcblxuICBkYXRhU3RyaW5nICs9IGtleXMuam9pbignLCcpICsgJ1xcbidcblxuICBkYXRhLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICBrZXlzLm1hcChmdW5jdGlvbihjb2wsIGkpIHtcbiAgICAgIGxldCBjZWxsID0gdHlwZW9mIHJvd1tjb2xdICE9PSAndW5kZWZpbmVkJyA/ICgnXCInK3Jvd1tjb2xdKydcIicpIDogXCJcIjtcbiAgICAgIGRhdGFTdHJpbmcgKz0gY2VsbDtcbiAgICAgIGlmIChpKzEgPCBrZXlzLmxlbmd0aClcbiAgICAgICAgZGF0YVN0cmluZyArPSAnLCc7XG4gICAgfSk7XG5cbiAgICBkYXRhU3RyaW5nICs9ICdcXG4nO1xuICB9KTtcblxuICByZXR1cm4gZGF0YVN0cmluZztcbn07XG5cbnZhciBleHBvcnRDU1YgPSBmdW5jdGlvbihkYXRhLCBrZXlzLCBmaWxlbmFtZSkge1xuICB2YXIgZGF0YVN0cmluZyA9IHRvU3RyaW5nKGRhdGEsIGtleXMpO1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzYXZlQXMoIG5ldyBCbG9iKFtkYXRhU3RyaW5nXSwge3R5cGU6IFwidGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04XCJ9KSwgZmlsZW5hbWUgfHwgJ3NwcmVhZHNoZWV0LmNzdicgKTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRDU1Y7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanNcbiAqKi8iLCIvKiBGaWxlU2F2ZXIuanNcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTUxMDAzXG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogTUlUXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBzYXZlQXMgfHwgKGZ1bmN0aW9uKHZpZXcpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhclxuXHRcdCAgZG9jID0gdmlldy5kb2N1bWVudFxuXHRcdCAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcblx0XHQsIGdldF9VUkwgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuXHRcdH1cblx0XHQsIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiYVwiKVxuXHRcdCwgY2FuX3VzZV9zYXZlX2xpbmsgPSBcImRvd25sb2FkXCIgaW4gc2F2ZV9saW5rXG5cdFx0LCBjbGljayA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIik7XG5cdFx0XHRub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH1cblx0XHQsIGlzX3NhZmFyaSA9IC9WZXJzaW9uXFwvW1xcZFxcLl0rLipTYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcblx0XHQsIHdlYmtpdF9yZXFfZnMgPSB2aWV3LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtXG5cdFx0LCByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbVxuXHRcdCwgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uKGV4KSB7XG5cdFx0XHQodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgZXg7XG5cdFx0XHR9LCAwKTtcblx0XHR9XG5cdFx0LCBmb3JjZV9zYXZlYWJsZV90eXBlID0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuXHRcdCwgZnNfbWluX3NpemUgPSAwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzUyOTcjYzcgYW5kXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2NvbW1pdC80ODU5MzBhI2NvbW1pdGNvbW1lbnQtODc2ODA0N1xuXHRcdC8vIGZvciB0aGUgcmVhc29uaW5nIGJlaGluZCB0aGUgdGltZW91dCBhbmQgcmV2b2NhdGlvbiBmbG93XG5cdFx0LCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQgPSA1MDAgLy8gaW4gbXNcblx0XHQsIHJldm9rZSA9IGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdHZhciByZXZva2VyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcblx0XHRcdFx0XHRnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xuXHRcdFx0XHR9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxuXHRcdFx0XHRcdGZpbGUucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRpZiAodmlldy5jaHJvbWUpIHtcblx0XHRcdFx0cmV2b2tlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGRpc3BhdGNoID0gZnVuY3Rpb24oZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcblx0XHRcdGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcblx0XHRcdHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbXCJvblwiICsgZXZlbnRfdHlwZXNbaV1dO1xuXHRcdFx0XHRpZiAodHlwZW9mIGxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0bGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdFx0XHRcdHRocm93X291dHNpZGUoZXgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsIGF1dG9fYm9tID0gZnVuY3Rpb24oYmxvYikge1xuXHRcdFx0Ly8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcblx0XHRcdGlmICgvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgQmxvYihbXCJcXHVmZWZmXCIsIGJsb2JdLCB7dHlwZTogYmxvYi50eXBlfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYmxvYjtcblx0XHR9XG5cdFx0LCBGaWxlU2F2ZXIgPSBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0aWYgKCFub19hdXRvX2JvbSkge1xuXHRcdFx0XHRibG9iID0gYXV0b19ib20oYmxvYik7XG5cdFx0XHR9XG5cdFx0XHQvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuXHRcdFx0dmFyXG5cdFx0XHRcdCAgZmlsZXNhdmVyID0gdGhpc1xuXHRcdFx0XHQsIHR5cGUgPSBibG9iLnR5cGVcblx0XHRcdFx0LCBibG9iX2NoYW5nZWQgPSBmYWxzZVxuXHRcdFx0XHQsIG9iamVjdF91cmxcblx0XHRcdFx0LCB0YXJnZXRfdmlld1xuXHRcdFx0XHQsIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJ3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kXCIuc3BsaXQoXCIgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBvbiBhbnkgZmlsZXN5cyBlcnJvcnMgcmV2ZXJ0IHRvIHNhdmluZyB3aXRoIG9iamVjdCBVUkxzXG5cdFx0XHRcdCwgZnNfZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAodGFyZ2V0X3ZpZXcgJiYgaXNfc2FmYXJpICYmIHR5cGVvZiBGaWxlUmVhZGVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHQvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcblx0XHRcdFx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBcImRhdGE6YXR0YWNobWVudC9maWxlXCIgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuXHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdFx0XHRkaXNwYXRjaF9hbGwoKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcblx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGRvbid0IGNyZWF0ZSBtb3JlIG9iamVjdCBVUkxzIHRoYW4gbmVlZGVkXG5cdFx0XHRcdFx0aWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuXHRcdFx0XHRcdFx0b2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0YXJnZXRfdmlldykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsIFwiX2JsYW5rXCIpO1xuXHRcdFx0XHRcdFx0aWYgKG5ld190YWIgPT0gdW5kZWZpbmVkICYmIGlzX3NhZmFyaSkge1xuXHRcdFx0XHRcdFx0XHQvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuXHRcdFx0XHRcdFx0XHR2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCwgYWJvcnRhYmxlID0gZnVuY3Rpb24oZnVuYykge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlc2F2ZXIucmVhZHlTdGF0ZSAhPT0gZmlsZXNhdmVyLkRPTkUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdCwgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9XG5cdFx0XHRcdCwgc2xpY2Vcblx0XHRcdDtcblx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cdFx0XHRpZiAoIW5hbWUpIHtcblx0XHRcdFx0bmFtZSA9IFwiZG93bmxvYWRcIjtcblx0XHRcdH1cblx0XHRcdGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuXHRcdFx0XHRvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRcdFx0c2F2ZV9saW5rLmhyZWYgPSBvYmplY3RfdXJsO1xuXHRcdFx0XHRzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNsaWNrKHNhdmVfbGluayk7XG5cdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0cmV2b2tlKG9iamVjdF91cmwpO1xuXHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuXHRcdFx0Ly8gdmlld2VkIGluIGEgdGFiLCBzbyBJIGZvcmNlIHNhdmUgd2l0aCBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cblx0XHRcdC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkxMTU4XG5cdFx0XHQvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuXHRcdFx0Ly8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM4OTY0MlxuXHRcdFx0aWYgKHZpZXcuY2hyb21lICYmIHR5cGUgJiYgdHlwZSAhPT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSkge1xuXHRcdFx0XHRzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcblx0XHRcdFx0YmxvYiA9IHNsaWNlLmNhbGwoYmxvYiwgMCwgYmxvYi5zaXplLCBmb3JjZV9zYXZlYWJsZV90eXBlKTtcblx0XHRcdFx0YmxvYl9jaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdC8vIFNpbmNlIEkgY2FuJ3QgYmUgc3VyZSB0aGF0IHRoZSBndWVzc2VkIG1lZGlhIHR5cGUgd2lsbCB0cmlnZ2VyIGEgZG93bmxvYWRcblx0XHRcdC8vIGluIFdlYktpdCwgSSBhcHBlbmQgLmRvd25sb2FkIHRvIHRoZSBmaWxlbmFtZS5cblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuXHRcdFx0aWYgKHdlYmtpdF9yZXFfZnMgJiYgbmFtZSAhPT0gXCJkb3dubG9hZFwiKSB7XG5cdFx0XHRcdG5hbWUgKz0gXCIuZG93bmxvYWRcIjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcblx0XHRcdFx0dGFyZ2V0X3ZpZXcgPSB2aWV3O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFyZXFfZnMpIHtcblx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZnNfbWluX3NpemUgKz0gYmxvYi5zaXplO1xuXHRcdFx0cmVxX2ZzKHZpZXcuVEVNUE9SQVJZLCBmc19taW5fc2l6ZSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZzKSB7XG5cdFx0XHRcdGZzLnJvb3QuZ2V0RGlyZWN0b3J5KFwic2F2ZWRcIiwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uKGRpcikge1xuXHRcdFx0XHRcdHZhciBzYXZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRkaXIuZ2V0RmlsZShuYW1lLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24od3JpdGVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLm9ud3JpdGVlbmQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IGZpbGUudG9VUkwoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChmaWxlc2F2ZXIsIFwid3JpdGVlbmRcIiwgZXZlbnQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV2b2tlKGZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvci5jb2RlICE9PSBlcnJvci5BQk9SVF9FUlIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFwid3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSBhYm9ydFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3cml0ZXJbXCJvblwiICsgZXZlbnRdID0gZmlsZXNhdmVyW1wib25cIiArIGV2ZW50XTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR3cml0ZXIud3JpdGUoYmxvYik7XG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3cml0ZXIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5XUklUSU5HO1xuXHRcdFx0XHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0XHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGRpci5nZXRGaWxlKG5hbWUsIHtjcmVhdGU6IGZhbHNlfSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRmaWxlLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRcdH0pLCBhYm9ydGFibGUoZnVuY3Rpb24oZXgpIHtcblx0XHRcdFx0XHRcdGlmIChleC5jb2RlID09PSBleC5OT1RfRk9VTkRfRVJSKSB7XG5cdFx0XHRcdFx0XHRcdHNhdmUoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZzX2Vycm9yKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHR9XG5cdFx0LCBGU19wcm90byA9IEZpbGVTYXZlci5wcm90b3R5cGVcblx0XHQsIHNhdmVBcyA9IGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSk7XG5cdFx0fVxuXHQ7XG5cdC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdGlmICghbm9fYXV0b19ib20pIHtcblx0XHRcdFx0YmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgXCJkb3dubG9hZFwiKTtcblx0XHR9O1xuXHR9XG5cblx0RlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgZmlsZXNhdmVyID0gdGhpcztcblx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJhYm9ydFwiKTtcblx0fTtcblx0RlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuXHRGU19wcm90by5XUklUSU5HID0gMTtcblx0RlNfcHJvdG8uRE9ORSA9IDI7XG5cblx0RlNfcHJvdG8uZXJyb3IgPVxuXHRGU19wcm90by5vbndyaXRlc3RhcnQgPVxuXHRGU19wcm90by5vbnByb2dyZXNzID1cblx0RlNfcHJvdG8ub253cml0ZSA9XG5cdEZTX3Byb3RvLm9uYWJvcnQgPVxuXHRGU19wcm90by5vbmVycm9yID1cblx0RlNfcHJvdG8ub253cml0ZWVuZCA9XG5cdFx0bnVsbDtcblxuXHRyZXR1cm4gc2F2ZUFzO1xufShcblx0ICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZlxuXHR8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuXHR8fCB0aGlzLmNvbnRlbnRcbikpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cy5zYXZlQXMgPSBzYXZlQXM7XG59IGVsc2UgaWYgKCh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCkgJiYgKGRlZmluZS5hbWQgIT0gbnVsbCkpIHtcbiAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2F2ZUFzO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbGVzYXZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZXhwb3J0IGNsYXNzIEZpbHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICBzdXBlcihkYXRhKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0ge307XG4gICAgfVxuXG4gICAgaGFuZGxlRmlsdGVyKGRhdGFGaWVsZCwgdmFsdWUsIHR5cGUpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyVHlwZSA9IHR5cGUgfHwgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIHZhbHVlIG9mIHRoZSBmaWx0ZXIgaXMgYW4gb2JqZWN0XG4gICAgICAgICAgICBsZXQgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsdWVbcHJvcF0gfHwgdmFsdWVbcHJvcF0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyB1bmRlZmluZWQgb3IgZW1wdHksIHdlIHJlbW92ZSB0aGUgZmlsdGVyXG4gICAgICAgICAgICAoaGFzVmFsdWUpID8gdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF0gPSB7dmFsdWU6IHZhbHVlLCB0eXBlOiBmaWx0ZXJUeXBlfSA6IGRlbGV0ZSB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUgfHwgdmFsdWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXSA9IHt2YWx1ZTogdmFsdWUudHJpbSgpLCB0eXBlOiBmaWx0ZXJUeXBlfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoJ29uRmlsdGVyQ2hhbmdlJywgdGhpcy5jdXJyZW50RmlsdGVyKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9GaWx0ZXIuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBEYXRlRmlsdGVyIGZyb20gJy4vZmlsdGVycy9EYXRlJztcbmltcG9ydCBUZXh0RmlsdGVyIGZyb20gJy4vZmlsdGVycy9UZXh0JztcbmltcG9ydCBTZWxlY3RGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL1NlbGVjdCc7XG5pbXBvcnQgTnVtYmVyRmlsdGVyIGZyb20gJy4vZmlsdGVycy9OdW1iZXInO1xuXG5jbGFzcyBUYWJsZUhlYWRlckNvbHVtbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUZpbHRlciA9IHRoaXMuaGFuZGxlRmlsdGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDb2x1bW5DbGljayhlKXtcbiAgICBpZighdGhpcy5wcm9wcy5kYXRhU29ydClyZXR1cm47XG4gICAgbGV0IG9yZGVyID0gdGhpcy5wcm9wcy5zb3J0ID09IENvbnN0LlNPUlRfREVTQz9Db25zdC5TT1JUX0FTQzpDb25zdC5TT1JUX0RFU0M7XG4gICAgdGhpcy5wcm9wcy5vblNvcnQob3JkZXIsIHRoaXMucHJvcHMuZGF0YUZpZWxkKTtcbiAgfVxuXG4gIGhhbmRsZUZpbHRlcih2YWx1ZSwgdHlwZSkge1xuICAgIHRoaXMucHJvcHMuZmlsdGVyLmVtaXR0ZXIuaGFuZGxlRmlsdGVyKHRoaXMucHJvcHMuZGF0YUZpZWxkLCB2YWx1ZSwgdHlwZSk7XG4gIH1cblxuICBnZXRGaWx0ZXJzKCkge1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5maWx0ZXIudHlwZSkge1xuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5URVhUOiB7XG4gICAgICAgIHJldHVybiA8VGV4dEZpbHRlciB7Li4udGhpcy5wcm9wcy5maWx0ZXJ9IGNvbHVtbk5hbWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IGZpbHRlckhhbmRsZXI9e3RoaXMuaGFuZGxlRmlsdGVyfSAvPjtcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuU0VMRUNUOiB7XG4gICAgICAgIHJldHVybiA8U2VsZWN0RmlsdGVyIHsuLi50aGlzLnByb3BzLmZpbHRlcn0gY29sdW1uTmFtZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gZmlsdGVySGFuZGxlcj17dGhpcy5oYW5kbGVGaWx0ZXJ9IC8+O1xuICAgICAgfVxuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6IHtcbiAgICAgICAgcmV0dXJuIDxOdW1iZXJGaWx0ZXIgey4uLnRoaXMucHJvcHMuZmlsdGVyfSBjb2x1bW5OYW1lPXt0aGlzLnByb3BzLmNoaWxkcmVufSBmaWx0ZXJIYW5kbGVyPXt0aGlzLmhhbmRsZUZpbHRlcn0gLz47XG4gICAgICB9XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkRBVEU6IHtcbiAgICAgICAgcmV0dXJuIDxEYXRlRmlsdGVyIHsuLi50aGlzLnByb3BzLmZpbHRlcn0gY29sdW1uTmFtZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gZmlsdGVySGFuZGxlcj17dGhpcy5oYW5kbGVGaWx0ZXJ9IC8+O1xuICAgICAgfVxuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5DVVNUT006IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZmlsdGVyLmdldEVsZW1lbnQodGhpcy5oYW5kbGVGaWx0ZXIsIHRoaXMucHJvcHMuZmlsdGVyLmN1c3RvbUZpbHRlclBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgdGhpcy5yZWZzLmlubmVyRGl2LnNldEF0dHJpYnV0ZShcImRhdGEtZmllbGRcIiwgdGhpcy5wcm9wcy5kYXRhRmllbGQpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIHdpZHRoID0gdGhpcy5wcm9wcy53aWR0aCE9PW51bGw/cGFyc2VJbnQodGhpcy5wcm9wcy53aWR0aCk6bnVsbDtcbiAgICB2YXIgdGhTdHlsZSA9IHtcbiAgICAgIHRleHRBbGlnbjogdGhpcy5wcm9wcy5kYXRhQWxpZ24sXG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLmhpZGRlbj9cIm5vbmVcIjpudWxsLFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgbWF4V2lkdGg6IHdpZHRoXG4gICAgfTtcblxuICAgIGNvbnN0IGRlZmF1bHRDYXJldCA9ICghdGhpcy5wcm9wcy5kYXRhU29ydCkgPyBudWxsIDogKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib3JkZXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiIHN0eWxlPXt7bWFyZ2luOiAnMTBweCAwIDEwcHggNXB4JywgY29sb3I6ICcjY2NjJ319Pjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkcm9wdXBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiIHN0eWxlPXt7bWFyZ2luOiAnMTBweCAwJywgY29sb3I6ICcjY2NjJ319Pjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gICAgY29uc3Qgc29ydENhcmV0ID0gdGhpcy5wcm9wcy5zb3J0ID8gVXRpbC5yZW5kZXJSZWFjdFNvcnRDYXJldCh0aGlzLnByb3BzLnNvcnQpIDogZGVmYXVsdENhcmV0O1xuXG4gICAgdmFyIGNsYXNzZXMgPSB0aGlzLnByb3BzLmNsYXNzTmFtZStcIiBcIisodGhpcy5wcm9wcy5kYXRhU29ydD9cInNvcnQtY29sdW1uXCI6XCJcIik7XG4gICAgcmV0dXJuKFxuICAgICAgPHRoIHJlZj0naGVhZGVyLWNvbCcgY2xhc3NOYW1lPXtjbGFzc2VzfSBzdHlsZT17dGhTdHlsZX0+XG4gICAgICAgIDxkaXYgcmVmPVwiaW5uZXJEaXZcIiBjbGFzc05hbWU9XCJ0aC1pbm5lciB0YWJsZS1oZWFkZXItY29sdW1uXCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNvbHVtbkNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufXtzb3J0Q2FyZXR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7dGhpcy5wcm9wcy5maWx0ZXIgPyB0aGlzLmdldEZpbHRlcnMoKSA6IG51bGx9XG4gICAgICA8L3RoPlxuICAgIClcbiAgfVxufVxuXG52YXIgZmlsdGVyVHlwZUFycmF5ID0gW107XG5mb3IgKGxldCBrZXkgaW4gQ29uc3QuRklMVEVSX1RZUEUpIHtcbiAgZmlsdGVyVHlwZUFycmF5LnB1c2goQ29uc3QuRklMVEVSX1RZUEVba2V5XSk7XG59XG5cblRhYmxlSGVhZGVyQ29sdW1uLnByb3BUeXBlcyA9IHtcbiAgZGF0YUZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhQWxpZ246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGFTb3J0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25Tb3J0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgZGF0YUZvcm1hdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGlzS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZWRpdGFibGU6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIGhpZGRlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc29ydEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBjb2x1bW5DbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIGZpbHRlckZvcm1hdHRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNvcnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGZvcm1hdEV4dHJhRGF0YTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihmaWx0ZXJUeXBlQXJyYXkpLFxuICAgIGRlbGF5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgLy8gZm9yIFNlbGVjdEZpbHRlclxuICAgICAgUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlcikgLy9mb3IgTnVtYmVyRmlsdGVyXG4gICAgICAgIF0pLFxuICAgIG51bWJlckNvbXBhcmF0b3JzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBlbWl0dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGdldEVsZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGN1c3RvbUZpbHRlclBhcmFtZXRlcnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcbiAgfSlcbn07XG5cblRhYmxlSGVhZGVyQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGF0YUFsaWduOiBcImxlZnRcIixcbiAgZGF0YVNvcnQ6IGZhbHNlLFxuICBkYXRhRm9ybWF0OiB1bmRlZmluZWQsXG4gIGlzS2V5OiBmYWxzZSxcbiAgZWRpdGFibGU6IHRydWUsXG4gIG9uU29ydDogdW5kZWZpbmVkLFxuICBoaWRkZW46IGZhbHNlLFxuICBjbGFzc05hbWU6IFwiXCIsXG4gIHdpZHRoOiBudWxsLFxuICBzb3J0RnVuYzogdW5kZWZpbmVkLFxuICBjb2x1bW5DbGFzc05hbWU6ICcnLFxuICBmaWx0ZXJGb3JtYXR0ZWQ6IGZhbHNlLFxuICBzb3J0OiB1bmRlZmluZWQsXG4gIGZvcm1hdEV4dHJhRGF0YTogdW5kZWZpbmVkLFxuICBmaWx0ZXI6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFibGVIZWFkZXJDb2x1bW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUhlYWRlckNvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vQ29uc3QnO1xuXG5jbGFzcyBEYXRlRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0RGF0ZSgpIHtcbiAgICAgICAgbGV0IGRlZmF1bHREYXRlICA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBhcHByb3ByaWF0ZSBmb3JtYXQgZm9yIHRoZSBpbnB1dCB0eXBlPWRhdGUsIGkuZS4gXCJZWVlZLU1NLUREXCJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG5ldyBEYXRlKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIGRlZmF1bHREYXRlID0gYCR7ZGVmYXVsdFZhbHVlLmdldEZ1bGxZZWFyKCl9LSR7KFwiMFwiICsgKGRlZmF1bHRWYWx1ZS5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKX0tJHsoXCIwXCIgKyBkZWZhdWx0VmFsdWUuZ2V0RGF0ZSgpKS5zbGljZSgtMil9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGU7XG4gICAgfVxuXG4gICAgZmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKGRhdGVWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG5ldyBEYXRlKGRhdGVWYWx1ZSksIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG51bGwsIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IHRoaXMucmVmcy5pbnB1dERhdGUuZGVmYXVsdFZhbHVlO1xuICAgICAgICBpZiAoZGF0ZVZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIobmV3IERhdGUoZGF0ZVZhbHVlKSwgQ29uc3QuRklMVEVSX1RZUEUuREFURSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgcmVmPVwiaW5wdXREYXRlXCJcbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaWx0ZXIgZGF0ZS1maWx0ZXIgZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZmlsdGVyfVxuICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5zZXREZWZhdWx0RGF0ZSgpfSAvPlxuICAgICAgICApO1xuICAgIH1cbn07XG5cbkRhdGVGaWx0ZXIucHJvcFR5cGVzID0ge1xuICAgIGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNvbHVtbk5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhdGVGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL0RhdGUuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgVGV4dEZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVvdXQgPSBudWxsO1xuXHR9XG5cblx0ZmlsdGVyKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMudGltZW91dCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdFx0fVxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXHRcdHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLnByb3BzLmZpbHRlckhhbmRsZXIoZmlsdGVyVmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQpO1xuXHRcdH0sIHNlbGYucHJvcHMuZGVsYXkpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0aWYgKHRoaXMucmVmcy5pbnB1dFRleHQuZGVmYXVsdFZhbHVlKSB7XG5cdFx0XHR0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIodGhpcy5yZWZzLmlucHV0VGV4dC5kZWZhdWx0VmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGlucHV0IHJlZj1cImlucHV0VGV4dFwiXG5cdFx0XHRcdCAgIGNsYXNzTmFtZT1cImZpbHRlciB0ZXh0LWZpbHRlciBmb3JtLWNvbnRyb2xcIlxuXHRcdFx0XHQgICB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdCAgIG9uQ2hhbmdlPXt0aGlzLmZpbHRlcn1cblx0XHRcdFx0ICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYEVudGVyICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9XG5cdFx0XHRcdCAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogXCJcIn0gLz5cblx0XHQpO1xuXHR9XG59O1xuXG5UZXh0RmlsdGVyLnByb3BUeXBlcyA9IHtcblx0ZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0ZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRkZWxheTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0cGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdGNvbHVtbk5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cblRleHRGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuXHRkZWxheTogQ29uc3QuRklMVEVSX0RFTEFZXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL1RleHQuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgU2VsZWN0RmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5maWx0ZXIgPSB0aGlzLmZpbHRlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6ICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA9PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHRcdFx0XHRcdCF0aGlzLnByb3BzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpKVxuXHRcdH07XG5cdH1cblxuXHRmaWx0ZXIoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6IChldmVudC50YXJnZXQudmFsdWUgPT09IFwiXCIpfSk7XG5cdFx0dGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKGV2ZW50LnRhcmdldC52YWx1ZSwgQ29uc3QuRklMVEVSX1RZUEUuU0VMRUNUKTtcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0bGV0IG9wdGlvblRhZ3MgPSBbXTtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuXHRcdG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT1cIi0xXCIgdmFsdWU9XCJcIj57dGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgU2VsZWN0ICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9PC9vcHRpb24+KTtcblx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5tYXAoKGtleSkgPT4ge1xuXHRcdFx0b3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXtrZXl9IHZhbHVlPXtrZXl9PntvcHRpb25zW2tleV19PC9vcHRpb24+KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gb3B0aW9uVGFncztcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGlmICh0aGlzLnJlZnMuc2VsZWN0SW5wdXQudmFsdWUpIHtcblx0XHRcdHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih0aGlzLnJlZnMuc2VsZWN0SW5wdXQudmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlNFTEVDVCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHZhciBzZWxlY3RDbGFzcyA9IGNsYXNzU2V0KFwiZmlsdGVyXCIsIFwic2VsZWN0LWZpbHRlclwiLCBcImZvcm0tY29udHJvbFwiLFxuXHRcdFx0XHRcdFx0XHR7XCJwbGFjZWhvbGRlci1zZWxlY3RlZFwiOiB0aGlzLnN0YXRlLmlzUGxhY2Vob2xkZXJTZWxlY3RlZH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxzZWxlY3QgcmVmPVwic2VsZWN0SW5wdXRcIlxuXHRcdFx0XHRcdGNsYXNzTmFtZT17c2VsZWN0Q2xhc3N9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuZmlsdGVyfVxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlICE9IHVuZGVmaW5lZCkgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA6IFwiXCJ9PlxuXHRcdFx0XHR7dGhpcy5nZXRPcHRpb25zKCl9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXHR9XG59O1xuXG5TZWxlY3RGaWx0ZXIucHJvcFR5cGVzID0ge1xuXHRmaWx0ZXJIYW5kbGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRjb2x1bW5OYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL1NlbGVjdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vQ29uc3QnO1xuXG5jb25zdCBsZWdhbENvbXBhcmF0b3JzID0gW1wiPVwiLCBcIj5cIiwgXCI+PVwiLCBcIjxcIiwgXCI8PVwiLCBcIiE9XCJdO1xuXG5jbGFzcyBOdW1iZXJGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5udW1iZXJDb21wYXJhdG9ycyA9IHRoaXMucHJvcHMubnVtYmVyQ29tcGFyYXRvcnMgfHwgbGVnYWxDb21wYXJhdG9ycztcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzUGxhY2Vob2xkZXJTZWxlY3RlZDogKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMub3B0aW9ucyAmJiB0aGlzLnByb3BzLm9wdGlvbnMuaW5kZXhPZih0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZS5udW1iZXIpID09IC0xKSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZU51bWJlciA9IHRoaXMub25DaGFuZ2VOdW1iZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZU51bWJlclNldCA9IHRoaXMub25DaGFuZ2VOdW1iZXJTZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNvbXBhcmF0b3IgPSB0aGlzLm9uQ2hhbmdlQ29tcGFyYXRvci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlTnVtYmVyKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYucHJvcHMuZmlsdGVySGFuZGxlcih7bnVtYmVyOiBmaWx0ZXJWYWx1ZSwgY29tcGFyYXRvcjogc2VsZi5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWV9LFxuICAgICAgICAgICAgICAgIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUik7XG4gICAgICAgIH0sIHNlbGYucHJvcHMuZGVsYXkpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlTnVtYmVyU2V0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzUGxhY2Vob2xkZXJTZWxlY3RlZDogKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gXCJcIil9KTtcbiAgICAgICAgaWYgKHRoaXMucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHtudW1iZXI6IGV2ZW50LnRhcmdldC52YWx1ZSwgY29tcGFyYXRvcjogdGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWV9LFxuICAgICAgICAgICAgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZUNvbXBhcmF0b3IoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcy5udW1iZXJGaWx0ZXIudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIoe251bWJlcjogdGhpcy5yZWZzLm51bWJlckZpbHRlci52YWx1ZSwgY29tcGFyYXRvcjogZXZlbnQudGFyZ2V0LnZhbHVlfSxcbiAgICAgICAgICAgIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUik7XG4gICAgfVxuXG4gICAgZ2V0Q29tcGFyYXRvck9wdGlvbnMoKSB7XG4gICAgICAgIGxldCBvcHRpb25UYWdzID0gW107XG4gICAgICAgIG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT1cIi0xXCI+PC9vcHRpb24+KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlckNvbXBhcmF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXt0aGlzLm51bWJlckNvbXBhcmF0b3JzW2ldfT57dGhpcy5udW1iZXJDb21wYXJhdG9yc1tpXX08L29wdGlvbj4pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3B0aW9uVGFncztcbiAgICB9XG5cbiAgICBnZXROdW1iZXJPcHRpb25zKCkge1xuICAgICAgICBsZXQgb3B0aW9uVGFncyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuXG4gICAgICAgIG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT1cIi0xXCIgdmFsdWU9XCJcIj57dGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgU2VsZWN0ICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9PC9vcHRpb24+KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXtvcHRpb25zW2ldfT57b3B0aW9uc1tpXX08L29wdGlvbj4pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3B0aW9uVGFncztcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlICYmIHRoaXMucmVmcy5udW1iZXJGaWx0ZXIudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih7bnVtYmVyOiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbXBhcmF0b3I6IHRoaXMucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlfSxcbiAgICAgICAgICAgICAgICBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc1NldChcInNlbGVjdC1maWx0ZXJcIiwgXCJudW1iZXItZmlsdGVyLWlucHV0XCIsIFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcInBsYWNlaG9sZGVyLXNlbGVjdGVkXCI6IHRoaXMuc3RhdGUuaXNQbGFjZWhvbGRlclNlbGVjdGVkIH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlciBudW1iZXItZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9XCJudW1iZXJGaWx0ZXJDb21wYXJhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm51bWJlci1maWx0ZXItY29tcGFyYXRvciBmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VDb21wYXJhdG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXsodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUuY29tcGFyYXRvciA6IFwiXCJ9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRDb21wYXJhdG9yT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIHsodGhpcy5wcm9wcy5vcHRpb25zKSA/IDxzZWxlY3QgcmVmPVwibnVtYmVyRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0Q2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU51bWJlclNldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0TnVtYmVyT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PiA6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPVwibnVtYmVyRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm51bWJlci1maWx0ZXItaW5wdXQgZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYEVudGVyICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlciA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIn0gLz59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5OdW1iZXJGaWx0ZXIucHJvcFR5cGVzID0ge1xuICAgIGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBudW1iZXI6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGNvbXBhcmF0b3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihsZWdhbENvbXBhcmF0b3JzKVxuICAgIH0pLFxuICAgIGRlbGF5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG51bWJlckNvbXBhcmF0b3JzOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgICAgaWYgKCFwcm9wc1twcm9wTmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzW3Byb3BOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbXBhcmF0b3JJc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlZ2FsQ29tcGFyYXRvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGVnYWxDb21wYXJhdG9yc1tqXSA9PT0gcHJvcHNbcHJvcE5hbWVdW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmF0b3JJc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb21wYXJhdG9ySXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYE51bWJlciBjb21wYXJhdG9yIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBvbmx5ICR7bGVnYWxDb21wYXJhdG9yc31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29sdW1uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuTnVtYmVyRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkZWxheTogQ29uc3QuRklMVEVSX0RFTEFZXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL051bWJlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=