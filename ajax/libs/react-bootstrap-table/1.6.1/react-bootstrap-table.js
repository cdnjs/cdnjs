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
	          { className: 'react-bs-table-container',
	            onMouseEnter: this.handleMouseEnter.bind(this),
	            onMouseLeave: this.handleMouseLeave.bind(this),
	            style: style },
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
	          { className: 'table-footer-pagination' },
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
	    key: 'handleRowMouseOut',
	    value: function handleRowMouseOut(rowIndex) {
	      var targetRow = this.props.data[rowIndex - 1];
	      this.props.onRowMouseOut(targetRow);
	    }
	  }, {
	    key: 'handleRowMouseOver',
	    value: function handleRowMouseOver(rowIndex) {
	      var targetRow = this.props.data[rowIndex - 1];
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
	          _react2['default'].createElement('input', { type: 'radio', checked: selected, onChange: this.handleSelectRowColumChange.bind(this) })
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
	
	      if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT" && e.target.tagName !== "TEXTAREA") {
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
	  }, {
	    key: 'getCurrentPage',
	    value: function getCurrentPage() {
	      return this.props.currPage;
	    }
	  }, {
	    key: 'getSizePerPage',
	    value: function getSizePerPage() {
	      return this.props.sizePerPage;
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
	        }, function () {
	          document.querySelector("." + "modal-backdrop").click();
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
	      console.log('@@');
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
	
	    /* General search function
	     * It will search for the text if the input includes that text;
	     * It will search for exact number if the input is that number
	     */
	  }, {
	    key: 'search',
	    value: function search(searchText) {
	      var _this3 = this;
	
	      if (searchText.trim() === "") {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.searchText = null;
	      } else {
	        (function () {
	          _this3.searchText = searchText;
	          var searchTextArray = [];
	
	          if (_this3.multiColumnSearch) {
	            searchTextArray = searchText.split(' ');
	          } else {
	            searchTextArray.push(searchText);
	          }
	
	          _this3.filteredData = _this3.data.filter(function (row) {
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
	  searchable: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMzk2YTkzZThlNWM2NWYxNDQxNCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlSGVhZGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdERPTVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RSb3dIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVSb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQ29sdW1uLmpzIiwid2VicGFjazovLy8uL3NyYy9UYWJsZUVkaXRDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvYW5pbWF0aW9uTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9DU1NDb3JlLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy90b29sYmFyL1Rvb2xCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbGVzYXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbHRlcnMvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9UZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9OdW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7MkNDdEMyQixDQUFrQjs7Ozs4Q0FDZixFQUFxQjs7OztnREFDeEIsRUFBd0I7O0FBRW5ELEtBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQy9CLFNBQU0sQ0FBQyxjQUFjLDhCQUFpQixDQUFDO0FBQ3ZDLFNBQU0sQ0FBQyxpQkFBaUIsaUNBQW9CLENBQUM7QUFDN0MsU0FBTSxDQUFDLFlBQVksb0NBQWUsQ0FBQztFQUNwQztzQkFDYztBQUNiLGlCQUFjO0FBQ2Qsb0JBQWlCO0FBQ2pCLGVBQVk7RUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDYmlCLENBQU87Ozs7dUNBQ0osQ0FBWTs7OztrQ0FDZixDQUFTOzs7O3dDQUNILENBQWU7Ozs7c0NBQ2pCLENBQWE7Ozs7cURBQ1IsRUFBNkI7Ozs7MkNBQ3BDLEVBQW1COzs7O3dDQUNmLEVBQWU7Ozs7Z0RBQ1YsRUFBd0I7OzRDQUMvQixFQUFtQjs7OzttQ0FDcEIsRUFBVTs7S0FFekIsY0FBYzthQUFkLGNBQWM7O0FBRVAsWUFGUCxjQUFjLENBRU4sS0FBSyxFQUFFOzs7MkJBRmYsY0FBYzs7QUFHaEIsZ0NBSEUsY0FBYyw2Q0FHVixLQUFLLEVBQUU7O1VBbW9CZixhQUFhLEdBQUcsVUFBQyxDQUFDLEVBQUs7QUFDckIsYUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO01BQ3pFOztVQUVELGtCQUFrQixHQUFHLFlBQU07QUFDekIsV0FBSSxjQUFjLEdBQUcsTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLFdBQUksWUFBWSxHQUFHLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxXQUFHLGNBQWMsQ0FBQyxXQUFXLEtBQUssWUFBWSxDQUFDLFdBQVcsRUFBQztBQUN6RCx1QkFBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDOUQ7QUFDRCxXQUFNLFdBQVcsR0FBRyxNQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztBQUMxRCxhQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFDcEMsTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO01BQzVGOztBQTlvQkMsU0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7O0FBRTNCLFNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkMsV0FBSSxDQUFDLEtBQUssR0FBRyx3Q0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUMzRCxXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSSxFQUFLO0FBQ3JDLGVBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixlQUFLLFFBQVEsQ0FBQztBQUNaLGVBQUksRUFBRSxNQUFLLFlBQVksRUFBRTtVQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO01BQ0osTUFBTTtBQUNMLFdBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25DLFdBQUksQ0FBQyxLQUFLLEdBQUcsd0NBQW1CLElBQUksQ0FBQyxDQUFDO01BQ3ZDOztBQUVELFNBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUzQixTQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7O0FBQ2YsYUFBTSxJQUFJLFFBQU8sQ0FBQztBQUNsQixlQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxhQUFhLEVBQUs7QUFDbEQsZUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1VBQ3RDLENBQUMsQ0FBQzs7TUFDSjs7QUFFRCxTQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtBQUN6RCxXQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDakQsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNwQzs7QUFFRCxTQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsV0FBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDekIsZUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3RDLGtCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLG1CQUFNLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUMxRSxzQkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7TUFDakQsQ0FBQztJQUNIOztnQkF6Q0csY0FBYzs7WUEyQ1QsbUJBQUMsS0FBSyxFQUFDOzs7V0FDVCxRQUFRLEdBQUksS0FBSyxDQUFqQixRQUFROztBQUViLFdBQU0saUJBQWlCLEdBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDMUUsMEJBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGdCQUFNLEVBQUc7QUFDOUMsYUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUN0QixlQUFJLFFBQVEsRUFBRTtBQUNaLG1CQUFNLDhEQUE4RCxDQUFDO1lBQ3RFO0FBQ0QsbUJBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztVQUNuQztBQUNELGFBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O0FBRXZCLGVBQUksQ0FBQyxPQUFLLE1BQU0sRUFBRTs7QUFFaEIsb0JBQUssTUFBTSxHQUFHLG9CQUFZLENBQUM7WUFDNUI7O0FBRUQsaUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFLLE1BQU0sQ0FBQztVQUMzQztRQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsV0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFFLElBQUksRUFBRSxJQUFJLEVBQU07QUFDeEUsYUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDdkIsZ0JBQU8sSUFBSSxDQUFDO1FBQ2IsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxXQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxRQUFRLEVBQ2pDLGlKQUMwRTs7QUFFNUUsV0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDbEIscUJBQVksRUFBRSxLQUFLLENBQUMsVUFBVTtBQUM5QixpQkFBUSxFQUFFLFFBQVE7QUFDbEIsaUJBQVEsRUFBRSxRQUFRO0FBQ2xCLDBCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7QUFDMUMsZUFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUNsQyxDQUFDLENBQUM7TUFDSjs7O1lBRVcsd0JBQUc7QUFDWixXQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O0FBRWhCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUU3RSxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3pCLGFBQUksSUFBSTthQUFFLFdBQVcsYUFBQztBQUN0QixhQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUU7QUFDL0Isc0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztBQUNyQyxlQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7VUFDM0IsTUFBTTtBQUNMLHNCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLG1CQUFNLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLGVBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1VBQ3JDO0FBQ0QsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuRCxNQUFNO0FBQ0wsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0I7QUFDRCxjQUFPLE1BQU0sQ0FBQztNQUNoQjs7O1lBRW9CLCtCQUFDLElBQVksRUFBRTtXQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDOUIsY0FBTyxtQkFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUs7QUFDakQsZ0JBQU87QUFDTCxlQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQzVCLGdCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQzdCLGVBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDM0IsaUJBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDL0IsMEJBQWUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDN0MsMEJBQWUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDN0MsbUJBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDL0IsaUJBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07QUFDM0IscUJBQVUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDbkMsb0JBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDdkMsZ0JBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDekIsZUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUMzQixtQkFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUMvQixnQkFBSyxFQUFFLENBQUM7VUFDVCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO01BQ0o7OztZQUV3QixtQ0FBQyxTQUFTLEVBQUU7QUFDbkMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQixXQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2pDLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMzQyxhQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUN6QyxhQUFJLElBQUksR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUMxRixhQUFJLFdBQVcsR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLG1CQUFNLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVsSSxhQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7QUFDbkUsYUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN4QyxhQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQztBQUMxRixhQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQztBQUN2RixhQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pFLGFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwRCxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLElBQUk7QUFDVixtQkFBUSxFQUFFLElBQUk7QUFDZCxzQkFBVyxFQUFFLFdBQVc7VUFDekIsQ0FBQyxDQUFDO1FBQ0o7QUFDRCxXQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7O0FBRXZELGFBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2hELGFBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsYUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLDBCQUFlLEVBQUUsSUFBSTtVQUN0QixDQUFDLENBQUM7UUFDSjtNQUNGOzs7WUFFZ0IsNkJBQUc7QUFDbEIsV0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDMUIsYUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMzRCxXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7TUFDOUU7OztZQUVtQixnQ0FBRztBQUNyQixhQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzlELFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoRixXQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZixhQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQ7TUFDRjs7O1lBRWlCLDhCQUFHO0FBQ25CLFdBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzFCLFdBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzNCLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7TUFDM0M7OztZQUVrQiwrQkFBRztBQUNwQixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3ZCLGFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hFLGFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLG1CQUFNLGNBQWMsRUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUM5QztNQUNGOzs7Ozs7Ozs7OztZQVNpQiw0QkFBQyxLQUFLLEVBQUU7QUFDeEIsY0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztNQUNyQzs7O1lBRUssa0JBQUc7O0FBRVAsV0FBSSxVQUFVLEdBQUcsNkJBQVMsZ0JBQWdCLENBQUMsQ0FBQztBQUM1QyxXQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUNwQyxXQUFJLEtBQUssR0FBRztBQUNWLGVBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07QUFDekIsa0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDaEMsQ0FBQztBQUNGLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDdkMsa0JBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkM7QUFDRCxXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JELFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDeEMsV0FBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDekMsV0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ25DLFdBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxXQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDckMsY0FDRTs7V0FBSyxTQUFTLEVBQUMsb0JBQW9CLEVBQUMsR0FBRyxFQUFDLE9BQU87U0FDNUMsT0FBTztTQUNSOzthQUFLLFNBQVMsRUFBQywwQkFBMEI7QUFDcEMseUJBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUMvQyx5QkFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQy9DLGtCQUFLLEVBQUUsS0FBTTtXQUNoQjs7O0FBQ0Usa0JBQUcsRUFBQyxRQUFRO0FBQ1osNEJBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFLO0FBQ3pDLCtCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFpQjtBQUN4RCx1QkFBUSxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVU7QUFDcEQsd0JBQVMsRUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxTQUFVO0FBQ2pELHFCQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ25DLDZCQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDbkQsdUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVM7QUFDOUIsd0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDaEMseUJBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxLQUFNO0FBQ3ZDLDBCQUFXLEVBQUUsV0FBWTthQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDUjtXQUNkO0FBQ0UsbUJBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU87QUFDMUIsc0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDaEMsZ0JBQUcsRUFBQyxNQUFNO0FBQ1YsaUJBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUs7QUFDdEIsb0JBQU8sRUFBRSxPQUFRO0FBQ2pCLHdCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFZO0FBQ3BDLG9CQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRO0FBQzVCLHFCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTO0FBQzlCLGtCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFNO0FBQ3hCLHFCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUc7QUFDbkMsc0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDaEMsc0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDaEMscUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVM7QUFDOUIsNEJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWdCO0FBQzVDLHVCQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQzNDLDJCQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDbkQsMEJBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUNqRCx3QkFBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUM3Qyx1QkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVc7YUFDMUM7VUFDRTtTQUNMLFdBQVc7U0FDWCxVQUFVO1FBQ1AsQ0FDUDtNQUNGOzs7WUFFVSx1QkFBRTtBQUNYLFdBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzNELFdBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDM0MsV0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBQztBQUNuRCxnQkFBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDcEUsTUFBTTtBQUNMLGdCQUFPLElBQUksQ0FBQztRQUNiO01BQ0Y7OztZQUVZLHlCQUFHO0FBQ2QsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqQyxXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osd0JBQWUsRUFBRSxFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKOzs7WUFFUyxvQkFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO0FBQzNCLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO0FBQ25DLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRDs7QUFFRCxXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckQsV0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGFBQUksRUFBRSxNQUFNO1FBQ2IsQ0FBQyxDQUFDO01BQ0o7OztZQUVtQiw4QkFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1dBQy9CLFlBQVksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBbEMsWUFBWTs7QUFDbkIsV0FBSSxZQUFZLEVBQUU7QUFDaEIscUJBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakM7O0FBRUQsV0FBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtBQUM3QixnQkFBTztRQUNSOztBQUVELFdBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN0RCxXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBSSxFQUFFLE1BQU07QUFDWixpQkFBUSxFQUFFLElBQUk7QUFDZCxvQkFBVyxFQUFYLFdBQVc7UUFDWixDQUFDLENBQUM7TUFDSjs7O1lBRWUsNEJBQUc7QUFDakIsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7QUFDbkMsYUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkM7TUFDRjs7O1lBRWUsNEJBQUc7QUFDakIsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7QUFDbkMsYUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkM7TUFDRjs7O1lBRWdCLDJCQUFDLEdBQUcsRUFBRTtBQUNyQixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtBQUNwQyxhQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkM7TUFDRjs7O1lBRWlCLDRCQUFDLEdBQUcsRUFBRTtBQUN0QixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtBQUNyQyxhQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEM7TUFDRjs7O1lBRWEsd0JBQUMsR0FBRyxFQUFFO0FBQ2xCLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO0FBQ2pDLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQztNQUNGOzs7WUFFaUIsNEJBQUMsQ0FBQyxFQUFFO0FBQ3BCLFdBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO0FBQ3pDLFdBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7QUFDcEMsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQ2xELFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDOztBQUVELFdBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDckQsYUFBSSxVQUFVLEVBQUU7QUFDZCwwQkFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7VUFDN0M7O0FBRUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM5QyxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osMEJBQWUsRUFBRSxlQUFlO1VBQ2pDLENBQUMsQ0FBQztRQUNKO01BQ0Y7OztZQUVxQixrQ0FBRztBQUN2QixXQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDL0IsV0FBSSxNQUFNLGFBQUM7QUFDWCxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3pCLGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzRCxNQUFNO0FBQ0wsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0I7QUFDRCxXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBSSxFQUFFLE1BQU07QUFDWixpQkFBUSxFQUFFLENBQUM7UUFDWixDQUFDLENBQUM7TUFDSjs7O1lBRWMseUJBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUMvQixXQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDbkQsV0FBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUMzQyxXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDakMsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekQ7O0FBRUQsV0FBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtBQUNyRCxhQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxtQkFBTSxpQkFBaUIsRUFBRTtBQUN6RCx1QkFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7VUFDMUMsTUFBTTtBQUNMLGVBQUksVUFBVSxFQUFFO0FBQ2QseUJBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsTUFBTTtBQUNMLHlCQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNoRCxzQkFBTyxNQUFNLEtBQUssR0FBRyxDQUFDO2NBQ3ZCLENBQUMsQ0FBQztZQUNKO1VBQ0Y7O0FBRUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osMEJBQWUsRUFBRSxZQUFZO1VBQzlCLENBQUMsQ0FBQztRQUNKO01BQ0Y7OztZQUVhLHdCQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQ3pDLFdBQUksU0FBUyxhQUFDO0FBQ2QsMEJBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDL0QsYUFBSSxDQUFDLElBQUksUUFBUSxFQUFFO0FBQ2pCLG9CQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDbkMsa0JBQU8sS0FBSyxDQUFDO1VBQ2Q7UUFDRixDQUFDLENBQUM7O0FBRUgsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNoRSxXQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBSSxFQUFFLE1BQU07UUFDYixDQUFDLENBQUM7O0FBRUgsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7QUFDckMsYUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRjtNQUNGOzs7WUFFZ0IsNkJBQUc7QUFDbEIsV0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTs7UUFFbkI7TUFDRjs7O1lBRWtCLDZCQUFDLE1BQU0sRUFBRTtBQUMxQixXQUFJLE1BQU0sYUFBQztBQUNYLFdBQUk7QUFDRixhQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ1YsZ0JBQU8sQ0FBQyxDQUFDO1FBQ1Y7QUFDRCxXQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDcEM7OztZQUVXLHNCQUFDLE1BQU0sRUFBRTtBQUNuQixXQUFJLE1BQU0sYUFBQztBQUNYLFdBQUk7QUFDRixhQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ1YsZ0JBQU8sQ0FBQyxDQUFDO1FBQ1Y7QUFDRCxXQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDcEM7OztZQUVhLDBCQUFHO0FBQ2YsY0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztNQUMvQjs7O1lBRWEsMEJBQUc7QUFDZixjQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO01BQzVCOzs7WUFFWSx1QkFBQyxPQUFPLEVBQUU7QUFDckIsV0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFdBQUksV0FBVyxHQUFHLE9BQU8sR0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOztBQUVsRSxXQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN6QyxhQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFDO0FBQzVDLGVBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUN2QyxZQUFVO0FBQ1IsaUJBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsQ0FDRixDQUFDO1VBQ0gsTUFBTSxJQUFJLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO0FBQy9DLGVBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7VUFDN0I7UUFDRjtNQUNGOzs7WUFFUSxtQkFBQyxXQUFXLEVBQUM7O0FBRXBCLFdBQUksTUFBTSxhQUFDO0FBQ1gsV0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFakMsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTthQUNqQixXQUFXLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBMUIsV0FBVzthQUNiLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUF2QixRQUFROztBQUNkLGFBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQztBQUNwRSxhQUFJLFFBQVEsR0FBRyxZQUFZLEVBQ3pCLFFBQVEsR0FBRyxZQUFZLENBQUM7QUFDMUIsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN0RCxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLE1BQU07QUFDWiwwQkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7QUFDaEQsbUJBQVEsRUFBUixRQUFRO1VBQ1QsQ0FBQyxDQUFDO1FBQ0osTUFBTTtBQUNMLGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixlQUFJLEVBQUUsTUFBTTtBQUNaLDBCQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtVQUNqRCxDQUFDLENBQUM7UUFDSjtBQUNELFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO0FBQ3JDLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRDtNQUVGOzs7WUFFZSwwQkFBQyxTQUFTLEVBQUU7QUFDMUIsV0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsV0FBSSxNQUFNLGFBQUM7QUFDWCxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2FBQ2pCLFdBQVcsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUExQixXQUFXOztBQUNuQixlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hELE1BQU07QUFDTCxlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQjtBQUNELFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7QUFDNUMsV0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGFBQUksRUFBRSxNQUFNO0FBQ1osaUJBQVEsRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDO01BQ0o7OztZQUVjLDJCQUFHO0FBQ2hCLFdBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsQ0FBQztBQUNwRCxXQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxXQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDdkMsYUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDakMsZUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQ25DO1FBQ0YsQ0FBQyxDQUFDO0FBQ0gseUNBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO01BQ2pEOzs7WUFFVyxzQkFBQyxVQUFVLEVBQUU7QUFDdkIsV0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUIsV0FBSSxNQUFNLGFBQUM7QUFDWCxXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2FBQ2pCLFdBQVcsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUExQixXQUFXOztBQUNuQixlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hELE1BQU07QUFDTCxlQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQjtBQUNELFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0FBQ3JGLFdBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixhQUFJLEVBQUUsTUFBTTtBQUNaLGlCQUFRLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQztNQUNKOzs7WUFFZSw0QkFBRztBQUNqQixXQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3pCLGFBQUksUUFBUSxhQUFDO0FBQ2IsYUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtBQUM3QixtQkFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztVQUMvQyxNQUFNO0FBQ0wsbUJBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1VBQ3BDO0FBQ0QsZ0JBQ0U7O2FBQUssU0FBUyxFQUFDLHlCQUF5QjtXQUN0QztBQUNFLGdCQUFHLEVBQUMsWUFBWTtBQUNoQixxQkFBUSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBVTtBQUNoQyx1QkFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ2pELHdCQUFXLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFhO0FBQ3RDLDRCQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLG1CQUFNLGtCQUFtQjtBQUNoRiwyQkFBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxtQkFBTSxlQUFnQjtBQUMzRSxtQkFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRztBQUNsQyxxQkFBUSxFQUFFLFFBQVM7QUFDbkIsOEJBQWlCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWtCO0FBQ3hELG9CQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLG1CQUFNLFFBQVM7QUFDdEQscUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksbUJBQU0sU0FBVTtBQUN6RCxzQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxtQkFBTSxVQUFXO0FBQzVELHFCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1CQUFNLFNBQVU7YUFDekQ7VUFDRSxDQUNOO1FBQ0g7QUFDRCxjQUFPLElBQUksQ0FBQztNQUNiOzs7WUFFWSx5QkFBRztBQUNkLFdBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7QUFDM0YsV0FBSSxzQkFBc0IsSUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDM0IsYUFBSSxPQUFPLGFBQUM7QUFDWixhQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN0QyxrQkFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUNsRCxpQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN6QixvQkFBTztBQUNMLG1CQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDcEIsb0JBQUssRUFBRSxLQUFLLENBQUMsU0FBUzs7QUFFdEIsd0JBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUs7O0FBRW5DLHVCQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSyxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUTtBQUN0RyxxQkFBTSxFQUFFLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBUyxLQUFLLEVBQUM7QUFDeEMsd0JBQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRixHQUFHLEtBQUs7Y0FDVixDQUFDO1lBQ0gsQ0FBQyxDQUFDO1VBQ0osTUFBTTtBQUNMLGtCQUFPLEdBQUcsQ0FBQztBQUNULGlCQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDeEMsa0JBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUztBQUMxQyxxQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzdDLENBQUMsQ0FBQztVQUNKO0FBQ0QsZ0JBQ0U7O2FBQUssU0FBUyxFQUFDLFVBQVU7V0FDdkI7QUFDRSx3QkFBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVk7QUFDNUMseUJBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDbkMseUJBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDbkMseUJBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU87QUFDaEMsNEJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVU7QUFDdEMsbUNBQXNCLEVBQUUsc0JBQXVCO0FBQy9DLG9CQUFPLEVBQUUsT0FBUTtBQUNqQiw4QkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFrQjtBQUNoRCxxQkFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUN2QywwQkFBYSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ2pELHNCQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3pDLHFCQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3ZDLHdCQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQzdDLCtCQUFrQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO2FBQzNEO1VBQ0UsQ0FDUDtRQUNGLE1BQU07QUFDTCxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFFZ0IsMkJBQUMsT0FBTyxFQUFFO0FBQ3pCLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7QUFDM0IsZ0JBQ0UsNkRBQWEsT0FBTyxFQUFFLE9BQVE7QUFDakIsd0JBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFLO0FBQ3pDLG1CQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRSxDQUMxRDtRQUNILE1BQU07QUFDTCxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFpQm9CLCtCQUFDLE1BQU0sRUFBRTtBQUM1QixXQUFJLE1BQU0sYUFBQztBQUNYLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7O2FBRWpCLFdBQVcsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUExQixXQUFXOztBQUNuQixhQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUM7QUFDdEUsZUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxRCxhQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBSSxFQUFFLE1BQU07QUFDWixtQkFBUSxFQUFFLFlBQVk7VUFDdkIsQ0FBQyxDQUFDO1FBQ0osTUFBTTtBQUNMLGVBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixlQUFJLEVBQUUsTUFBTTtVQUNiLENBQUMsQ0FBQztRQUNKOztBQUVELFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO0FBQ3JDLGFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQztNQUNGOzs7VUExcUJHLGNBQWM7SUFBUyxtQkFBTSxTQUFTOztBQTZxQjVDLGVBQWMsQ0FBQyxTQUFTLEdBQUc7QUFDekIsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLFNBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM5QixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsT0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxtQkFBTSxTQUFTLENBQUMsS0FBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRixTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsVUFBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixRQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDM0IsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLGFBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxvQkFBaUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN6QyxZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUMvQixTQUFJLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUMxQixtQkFBTSxlQUFlLEVBQ3JCLG1CQUFNLGlCQUFpQixFQUN2QixtQkFBTSxnQkFBZ0IsQ0FDdkIsQ0FBQztBQUNGLFlBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUMvQixhQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDL0IsYUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLGdCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsa0JBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxxQkFBZ0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN0Qyw2QkFBd0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QyxxQkFBZ0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtJQUN2QyxDQUFDO0FBQ0YsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDOUIsU0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzVCLGVBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxrQkFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0lBQ3BDLENBQUM7QUFDRixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLFNBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixlQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsY0FBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxHQUFHO0FBQ2hDLFVBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQzdCLGdCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsYUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGNBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyx1QkFBa0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN4QyxtQkFBYyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLG1CQUFjLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsZ0JBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNqQyxzQkFBaUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN2QyxlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsU0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzVCLG9CQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDdEMsZ0JBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxtQkFBYyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3RDLGlCQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsaUJBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNsQyxzQkFBaUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN2QyxlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsMkJBQXNCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUMsWUFBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQy9CLGFBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxjQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsYUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0lBQ2pDLENBQUM7QUFDRixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUMvQixrQkFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0lBQ3RDLENBQUM7QUFDRixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsY0FBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0VBQ3BDLENBQUM7QUFDRixlQUFjLENBQUMsWUFBWSxHQUFHO0FBQzVCLFNBQU0sRUFBRSxNQUFNO0FBQ2QsWUFBUyxFQUFFLFNBQVM7QUFDcEIsVUFBTyxFQUFFLEtBQUs7QUFDZCxXQUFRLEVBQUUsSUFBSTtBQUNkLFFBQUssRUFBRSxLQUFLO0FBQ1osWUFBUyxFQUFFLEtBQUs7QUFDaEIsYUFBVSxFQUFFLEtBQUs7QUFDakIsb0JBQWlCLEVBQUUsU0FBUztBQUM1QixZQUFTLEVBQUU7QUFDVCxTQUFJLEVBQUUsbUJBQU0sZUFBZTtBQUMzQixZQUFPLEVBQUUsbUJBQU0sbUJBQW1CO0FBQ2xDLGFBQVEsRUFBRSxFQUFFO0FBQ1osYUFBUSxFQUFFLFNBQVM7QUFDbkIsZ0JBQVcsRUFBRSxTQUFTO0FBQ3RCLGtCQUFhLEVBQUUsS0FBSztBQUNwQixxQkFBZ0IsRUFBRSxLQUFLO0FBQ3ZCLDZCQUF3QixFQUFFLEtBQUs7QUFDL0IscUJBQWdCLEVBQUUsS0FBSztJQUN4QjtBQUNELFdBQVEsRUFBRTtBQUNSLFNBQUksRUFBRSxtQkFBTSxjQUFjO0FBQzFCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLGtCQUFhLEVBQUUsU0FBUztJQUN6QjtBQUNELFlBQVMsRUFBRSxLQUFLO0FBQ2hCLFlBQVMsRUFBRSxLQUFLO0FBQ2hCLFNBQU0sRUFBRSxLQUFLO0FBQ2Isb0JBQWlCLEVBQUUsS0FBSztBQUN4QixlQUFZLEVBQUUsS0FBSztBQUNuQixjQUFXLEVBQUUsRUFBRTtBQUNmLFVBQU8sRUFBRTtBQUNQLGdCQUFXLEVBQUUsS0FBSztBQUNsQixhQUFRLEVBQUUsU0FBUztBQUNuQixjQUFTLEVBQUUsU0FBUztBQUNwQix1QkFBa0IsRUFBRSxTQUFTO0FBQzdCLG1CQUFjLEVBQUUsU0FBUztBQUN6QixtQkFBYyxFQUFFLFNBQVM7QUFDekIsZ0JBQVcsRUFBRSxTQUFTO0FBQ3RCLHNCQUFpQixFQUFFLFNBQVM7QUFDNUIsZUFBVSxFQUFFLFNBQVM7QUFDckIsaUJBQVksRUFBRSxTQUFTO0FBQ3ZCLGlCQUFZLEVBQUUsU0FBUztBQUN2QixrQkFBYSxFQUFFLFNBQVM7QUFDeEIsbUJBQWMsRUFBRSxTQUFTO0FBQ3pCLFNBQUksRUFBRSxTQUFTO0FBQ2Ysb0JBQWUsRUFBRSxtQkFBTSxrQkFBa0I7QUFDekMsZ0JBQVcsRUFBRSxTQUFTO0FBQ3RCLG1CQUFjLEVBQUUsbUJBQU0sZUFBZTtBQUNyQyxzQkFBaUIsRUFBRSxTQUFTO0FBQzVCLGVBQVUsRUFBRSxTQUFTO0FBQ3JCLDJCQUFzQixFQUFFLFNBQVM7QUFDakMsWUFBTyxFQUFFLG1CQUFNLFFBQVE7QUFDdkIsYUFBUSxFQUFFLG1CQUFNLFNBQVM7QUFDekIsY0FBUyxFQUFFLG1CQUFNLFVBQVU7QUFDM0IsYUFBUSxFQUFFLG1CQUFNLFNBQVM7SUFDMUI7QUFDRCxZQUFTLEVBQUU7QUFDVCxrQkFBYSxFQUFFLENBQUM7SUFDakI7QUFDRCxZQUFTLEVBQUUsS0FBSztBQUNoQixjQUFXLEVBQUUsU0FBUztFQUN2QixDQUFDOztzQkFFYSxjQUFjOzs7Ozs7O0FDNXpCN0IsZ0Q7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFnQjs7QUFFaEI7QUFDQTs7QUFFQSxrQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7Ozs7O3NCQy9DYztBQUNiLFlBQVMsRUFBRSxNQUFNO0FBQ2pCLFdBQVEsRUFBRSxLQUFLO0FBQ2YsZ0JBQWEsRUFBRSxFQUFFO0FBQ2pCLFlBQVMsRUFBRSxHQUFHO0FBQ2QsWUFBUyxFQUFFLElBQUk7QUFDZixXQUFRLEVBQUUsR0FBRztBQUNiLGFBQVUsRUFBRSxJQUFJO0FBQ2hCLHNCQUFtQixFQUFFLEVBQUU7QUFDdkIsa0JBQWUsRUFBRSxNQUFNO0FBQ3ZCLG9CQUFpQixFQUFFLE9BQU87QUFDMUIsbUJBQWdCLEVBQUUsVUFBVTtBQUM1QixpQkFBYyxFQUFFLE1BQU07QUFDdEIsa0JBQWUsRUFBRSxPQUFPO0FBQ3hCLG9CQUFpQixFQUFFLFNBQVM7QUFDNUIscUJBQWtCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDcEMsa0JBQWUsRUFBRSxDQUFDO0FBQ2xCLGVBQVksRUFBRSw2QkFBNkI7QUFDM0MsbUJBQWdCLEVBQUUsb0JBQW9CO0FBQ3RDLFdBQVEsRUFBRSxVQUFVO0FBQ3BCLGVBQVksRUFBRSxHQUFHO0FBQ2pCLGNBQVcsRUFBRTtBQUNYLFNBQUksRUFBRSxZQUFZO0FBQ2xCLFdBQU0sRUFBRSxjQUFjO0FBQ3RCLFdBQU0sRUFBRSxjQUFjO0FBQ3RCLFNBQUksRUFBRSxZQUFZO0FBQ2xCLFdBQU0sRUFBRSxjQUFjO0lBQ3ZCO0VBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQzVCaUIsQ0FBTzs7OztxQ0FDSixDQUFXOzs7O2tDQUNkLENBQVM7Ozs7aUNBQ1YsQ0FBUTs7Ozt1Q0FDSixDQUFZOzs7O2tEQUNDLENBQXlCOzs7O0tBRXJELFFBQVE7YUFBUixRQUFROztZQUFSLFFBQVE7MkJBQVIsUUFBUTs7Z0NBQVIsUUFBUTs7O2dCQUFSLFFBQVE7O1lBQ0ssNkJBQUc7QUFBRSxXQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7TUFBRTs7O1lBQy9CLG1DQUFDLEtBQUssRUFBRTtBQUFFLFdBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQUU7OztZQUMxRCxnQkFBQyxPQUFPLEVBQUU7QUFDZCw2QkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxHQUFHLE9BQU8sS0FBSyxlQUFlLENBQUM7TUFDeEU7OztZQUVLLGtCQUFHO0FBQ1AsY0FBTyw0Q0FBTyxTQUFTLEVBQUMscUJBQXFCLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxHQUFHO01BQzdIOzs7VUFURyxRQUFRO0lBQVMsbUJBQU0sU0FBUzs7S0FZaEMsV0FBVzthQUFYLFdBQVc7O0FBRUosWUFGUCxXQUFXLENBRUgsS0FBSyxFQUFFOzJCQUZmLFdBQVc7O0FBR2IsZ0NBSEUsV0FBVyw2Q0FHUCxLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDOztnQkFMRyxXQUFXOztZQU9ULGtCQUFFO0FBQ04sV0FBSSxnQkFBZ0IsR0FBRyw2QkFBUyxjQUFjLENBQUMsQ0FBQztBQUNoRCxXQUFJLFlBQVksR0FBRyw2QkFBUyxPQUFPLEVBQUUsYUFBYSxFQUFFO0FBQ2hELHlCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUNyQywwQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDMUMsQ0FBQyxDQUFDO0FBQ0gsV0FBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFDLElBQUksR0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN2RixXQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzs7QUFFakMsY0FDRTs7V0FBSyxTQUFTLEVBQUMsc0JBQXNCO1NBQ25DOzthQUFLLEdBQUcsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFFLGdCQUFpQjtXQUMvQzs7ZUFBTyxTQUFTLEVBQUUsWUFBYTthQUM3Qjs7O2VBQ0U7O21CQUFJLEdBQUcsRUFBQyxRQUFRO2lCQUNiLGtCQUFrQjtpQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUNqQjtjQUNDO1lBQ0Y7VUFDSjtRQUNGLENBQ1A7TUFDRjs7O1lBRW9CLGlDQUFFO0FBQ3JCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksbUJBQU0saUJBQWlCLEVBQUU7QUFDdEQsZ0JBQVEsdUVBQXVCLEtBQUssRUFBRSxJQUFJLENBQUMsb0JBQXFCLEdBQXlCLENBQUU7UUFDNUYsTUFBSyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFNLGdCQUFnQixFQUFDO0FBQzFELGdCQUFROzthQUF1QixLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFxQjtXQUM1RCxpQ0FBQyxRQUFRLElBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBZSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVksR0FBRTtVQUMzRCxDQUN4QjtRQUNILE1BQUk7QUFDSCxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFFd0IscUNBQUU7QUFDekIsV0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUM7QUFDcEMsY0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUMzQyxlQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ3JELGVBQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDOUUsZUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQ3BCLG1CQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDdkMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUMsQ0FBQztVQUNsRDtRQUNGLE1BQU07QUFDTCxhQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ2xELGFBQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDOUUsYUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQ2pCLG1CQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3RGO01BQ0Y7OztZQUVRLG1CQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQztBQUN6QyxXQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQztBQUNwQyxhQUFJLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFNLGlCQUFpQixJQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxtQkFBTSxnQkFBZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNsSCxhQUFHLGFBQWEsSUFBSSxDQUFDLEVBQ25CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ25ELGNBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFDM0MsZUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQ3BCLG1CQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1VBQ2hHO1FBQ0YsTUFBTTtBQUNMLGFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUNqQixtQkFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQy9FO0FBQ0QsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ2pELGFBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNDO0FBQ0QsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25CLFdBQUcsbUJBQW1CLEVBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsa0JBQUssaUJBQWlCLEVBQUUsR0FBRyxJQUFJLENBQUM7TUFDM0U7OztVQWxGRyxXQUFXO0lBQVMsbUJBQU0sU0FBUzs7QUFvRnpDLFlBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDdEIsZ0JBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNyQyxTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsaUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLG1CQUFnQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztFQUNuRSxDQUFDOztBQUVGLFlBQVcsQ0FBQyxZQUFZLEdBQUcsRUFDMUIsQ0FBQztzQkFDYSxXQUFXOzs7Ozs7O0FDdEgxQixnRDs7Ozs7Ozs7Ozs7Ozs7a0NDQWtCLENBQU87Ozs7a0NBQ1AsQ0FBUzs7Ozt1Q0FDTixDQUFZOzs7O3NCQUNsQjs7QUFFYixrQkFBZSwyQkFBQyxLQUFLLEVBQUU7QUFDckIsU0FBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxTQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUN6QixTQUFHLEtBQUssSUFBSSxtQkFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7QUFDeEQsU0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxVQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUMxQixVQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDaEMsU0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixZQUFPLElBQUksQ0FBQztJQUNiOztBQUVELHVCQUFvQixnQ0FBQyxLQUFLLEVBQUM7QUFDekIsU0FBSSxVQUFVLEdBQUcsNkJBQVMsT0FBTyxFQUFFO0FBQ2pDLGVBQVEsRUFBRSxLQUFLLElBQUksbUJBQU0sUUFBUTtNQUNsQyxDQUFDLENBQUM7QUFDSCxZQUNFOztTQUFNLFNBQVMsRUFBRSxVQUFXO09BQzFCLDJDQUFNLFNBQVMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFRO01BQ3ZELENBQ1A7SUFDSDs7QUFFRCxvQkFBaUIsK0JBQUU7QUFDakIsU0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxVQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDM0IsVUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDOztBQUU3QixTQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUNsQyxVQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDeEIsVUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFVBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztBQUNsQyxVQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDNUIsVUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQzdCLFVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUNoQyxVQUFLLENBQUMsV0FBVyxDQUFFLEtBQUssQ0FBQyxDQUFDOztBQUUxQixhQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxLQUFLLENBQUMsQ0FBQztBQUNsQyxTQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQzNCLFVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUNoQyxTQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQzNCLFNBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFFckMsYUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUUsS0FBSyxDQUFDLENBQUM7O0FBRWxDLFlBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBRTtJQUNsQjs7RUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDckRpQixDQUFPOzs7O3VDQUNKLENBQVk7Ozs7a0NBQ2YsQ0FBUzs7OztLQUVyQixxQkFBcUI7YUFBckIscUJBQXFCOztZQUFyQixxQkFBcUI7MkJBQXJCLHFCQUFxQjs7Z0NBQXJCLHFCQUFxQjs7O2dCQUFyQixxQkFBcUI7O1lBRW5CLGtCQUFFO0FBQ04sV0FBSSxPQUFPLEdBQUc7QUFDWixjQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsRUFBRTtRQUN0RCxDQUFDOztBQUVGLGNBQ0U7O1dBQUksS0FBSyxFQUFFLE9BQVE7U0FDakI7O2FBQUssU0FBUyxFQUFDLDhCQUE4QjtXQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7VUFDaEI7UUFDSCxDQUNOO01BQ0Y7OztVQWRHLHFCQUFxQjtJQUFTLG1CQUFNLFNBQVM7O3NCQWlCcEMscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NyQmxCLENBQU87Ozs7a0NBQ1AsQ0FBUzs7OztpQ0FDVixDQUFROzs7O3FDQUNKLEVBQVk7Ozs7d0NBQ1QsRUFBZTs7Ozs0Q0FDWCxFQUFtQjs7Ozt1Q0FDMUIsQ0FBWTs7OztBQUVqQyxLQUFJLEtBQUssR0FBQyxTQUFOLEtBQUssQ0FBVSxHQUFHLEVBQUM7QUFDckIsVUFBTyxHQUFHLElBQUcsT0FBTyxHQUFHLEtBQUcsVUFBVyxDQUFDO0VBRXZDLENBQUM7O0tBQ0ksU0FBUzthQUFULFNBQVM7O0FBRUYsWUFGUCxTQUFTLENBRUQsS0FBSyxFQUFFOzJCQUZmLFNBQVM7O0FBR1gsZ0NBSEUsU0FBUyw2Q0FHTCxLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsbUJBQVksRUFBRSxJQUFJO01BQ25CLENBQUM7QUFDRixTQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0Qjs7Z0JBUkcsU0FBUzs7WUFVSSw2QkFBRTtBQUNqQixXQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7TUFDbkI7OztZQUVpQiw4QkFBRTtBQUNsQixXQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7TUFDbkI7OztZQUVLLGtCQUFFO0FBQ04sV0FBSSxnQkFBZ0IsR0FBRyw2QkFBUyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVuRCxXQUFJLFlBQVksR0FBRyw2QkFBUyxPQUFPLEVBQUU7QUFDbkMsd0JBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87QUFDbkMseUJBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ3JDLHNCQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQy9CLDBCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztRQUN4QyxDQUFDLENBQUM7O0FBRUgsV0FBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUNwRCxXQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFN0QsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVMsSUFBSSxFQUFFLENBQUMsRUFBQztBQUNuRCxhQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUUsQ0FBQyxFQUFDO0FBQzNELGVBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsZUFBRyxJQUFJLENBQUMsT0FBTyxJQUNiLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ25DLGlCQUFNLENBQUMsUUFBUTtBQUNmLGVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksSUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsSUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBQztBQUMvQixpQkFBSSxNQUFNLEdBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxVQUFTLEtBQUssRUFBQztBQUN0QyxzQkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7Y0FDaEYsR0FBQyxLQUFLLENBQUM7O0FBRVYsb0JBQ0k7O2lCQUFpQixZQUFZLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7O0FBRXJELHlCQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxRQUFTO0FBQ3RGLHVCQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsS0FBTTtBQUNuQyxvQkFBRyxFQUFFLENBQUU7QUFDUCwyQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVc7QUFDM0MseUJBQVEsRUFBRSxDQUFFO0FBQ1oseUJBQVEsRUFBRSxDQUFFO2VBQzFCLFVBQVU7Y0FDSyxDQUNuQjtZQUNKLE1BQUs7O0FBRUosaUJBQUksV0FBVyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOztBQUUvRixpQkFBRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQ3RDLG1CQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdFLG1CQUFJLENBQUMsbUJBQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ3pDLCtCQUFjLEdBQUcsMENBQUssdUJBQXVCLEVBQUUsRUFBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQU8sQ0FBQztnQkFDakY7QUFDRCxzQkFDRTs7bUJBQWEsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFNO0FBQ3hCLHNCQUFHLEVBQUUsQ0FBRTtBQUNQLDRCQUFTLEVBQUUsV0FBWTtBQUN2QiwyQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztBQUM5Qix5QkFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFPO0FBQ3RCLHlCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3ZDLHdCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQU07aUJBQzlCLGNBQWM7Z0JBQ0gsQ0FDZjtjQUNGLE1BQUs7QUFDSixzQkFDRTs7bUJBQWEsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFNO0FBQ3hCLHNCQUFHLEVBQUUsQ0FBRTtBQUNQLDRCQUFTLEVBQUUsV0FBWTtBQUN2QiwyQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztBQUM5Qix5QkFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFPO0FBQ3RCLHlCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3ZDLHdCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQU07aUJBQzlCLFVBQVU7Z0JBQ0MsQ0FDZjtjQUNGO1lBQ0Y7VUFDRixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsYUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkYsYUFBSSxlQUFlLEdBQUcsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FDMUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxHQUFDLElBQUksQ0FBQzs7QUFFbEUsYUFBSSxXQUFXLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQ3BHLGdCQUNFOzthQUFVLFVBQVUsRUFBRSxRQUFTLEVBQUMsR0FBRyxFQUFFLENBQUUsRUFBQyxTQUFTLEVBQUUsV0FBWTtBQUM3RCxzQkFBUyxFQUFFLGtCQUFrQixHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFDLFNBQVU7QUFDN0QsMkJBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssbUJBQU0sY0FBZTtBQUNsRSx1QkFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtBQUMzQywyQkFBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ25ELDBCQUFhLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7QUFDakQsd0JBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7V0FDNUMsZUFBZTtXQUNmLFlBQVk7VUFDSixDQUNaO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFVCxXQUFHLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO0FBQ3hCLGtCQUFTLENBQUMsSUFBSSxDQUNkOzthQUFVLEdBQUcsRUFBQyxpQkFBaUI7V0FDN0I7O2VBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBRSxrQkFBa0IsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFFO0FBQzVELHdCQUFTLEVBQUMsd0JBQXdCO2FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFFLG1CQUFNLFlBQVk7WUFDekM7VUFDSSxDQUFDLENBQUM7UUFDZDs7QUFFRCxXQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7QUFFckIsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O0FBRXhELGNBQ0U7O1dBQUssR0FBRyxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUUsZ0JBQWlCLEVBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUN4RTs7YUFBTyxHQUFHLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBRSxZQUFhO1dBQ3ZDLFdBQVc7V0FDWjs7O2FBQ0csU0FBUztZQUNKO1VBQ0Y7UUFDSixDQUNQO01BQ0Y7OztZQUVnQiwyQkFBQyxrQkFBa0IsRUFBQztBQUNuQyxXQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7O0FBRTNCLFdBQUcsa0JBQWtCLEVBQUM7QUFDcEIsYUFBSSxLQUFLLEdBQUc7QUFDVixnQkFBSyxFQUFDLEVBQUU7QUFDUixtQkFBUSxFQUFDLEVBQUU7VUFDWjtBQUNELHdCQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxHQUFFLHlDQUFJLEtBQUssRUFBRSxLQUFNLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBRSxHQUFPLENBQUM7UUFDakc7QUFDRCxXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUUsQ0FBQyxFQUFDO0FBQ3RELGFBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyRSxhQUFJLEtBQUssR0FBQztBQUNSLGtCQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsSUFBSTtBQUNsQyxnQkFBSyxFQUFFLEtBQUs7QUFDWixtQkFBUSxFQUFFLEtBQUs7O1VBRWhCLENBQUM7QUFDRixhQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFFLGtCQUFLLG9CQUFvQixDQUFDLG1CQUFNLFNBQVMsQ0FBQyxHQUFFLElBQUksQ0FBQztBQUM5RSxnQkFBUTs7YUFBSSxLQUFLLEVBQUUsS0FBTSxFQUFDLEdBQUcsRUFBRSxDQUFFLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFVO1dBQUUsTUFBTSxDQUFDLElBQUk7V0FBRSxTQUFTO1VBQU0sQ0FBRTtRQUMvRixDQUFDLENBQUM7O0FBRUgsY0FDRTs7V0FBTyxHQUFHLEVBQUMsUUFBUTtTQUNqQjs7O1dBQUssZUFBZTtXQUFFLE9BQU87VUFBTTtRQUM3QixDQUNUO01BQ0Y7OztZQUVnQiwyQkFBQyxRQUFRLEVBQUM7QUFDekIsV0FBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlDLFdBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3JDOzs7WUFFaUIsNEJBQUMsUUFBUSxFQUFDO0FBQzFCLFdBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxXQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUN0Qzs7O1lBRWEsd0JBQUMsUUFBUSxFQUFDO0FBQ3RCLFdBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUNyQixXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFDO0FBQ3RDLGFBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBQyxDQUFDLEVBQUM7QUFDakIsY0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHNCQUFXLEdBQUcsR0FBRyxDQUFDO1VBQ25CO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULFdBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO01BQ3BDOzs7WUFFYyx5QkFBQyxRQUFRLEVBQUUsVUFBVSxFQUFDO0FBQ25DLFdBQUksR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUNyQixXQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFDO0FBQ3RDLGFBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBQyxDQUFDLEVBQUM7QUFDakIsY0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHNCQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLGtCQUFPLEtBQUssQ0FBQztVQUNkO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULFdBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztNQUNqRDs7O1lBRXlCLG9DQUFDLENBQUMsRUFBQztBQUMzQixXQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUM7QUFDdkYsYUFBSSxDQUFDLGVBQWUsQ0FDbEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xGO01BQ0Y7OztZQUVhLHdCQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUM7QUFDbkMsV0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsV0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQztBQUM1QixvQkFBVyxFQUFFLENBQUM7QUFDZCxhQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUN0QyxXQUFXLEVBQUUsQ0FBQztRQUNqQjtBQUNELGVBQVEsRUFBRSxDQUFDO0FBQ1gsV0FBSSxRQUFRLEdBQUc7QUFDYixxQkFBWSxFQUFFO0FBQ1osY0FBRyxFQUFFLFFBQVE7QUFDYixjQUFHLEVBQUUsV0FBVztVQUNqQjtRQUNGLENBQUM7O0FBRUYsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBQztBQUMvQyxhQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEM7QUFDRCxXQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQ3pCOzs7WUFFUyxzQkFBRTtBQUNWLFdBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3pDLFdBQUcsWUFBWSxFQUFDO0FBQ2QsYUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBQyxZQUFZLENBQUMsR0FBRyxFQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRTtNQUNGOzs7WUFFcUIsZ0NBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUM7QUFDbkQsV0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3BDLFdBQUcsSUFBSSxJQUFJLE1BQU0sRUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO01BQ3pFOzs7WUFFb0IsK0JBQUMsUUFBUSxFQUFDO0FBQzdCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLG1CQUFNLGlCQUFpQixFQUFFO0FBQ3ZELGdCQUFROzs7V0FBYSw0Q0FBTyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFTLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQUU7VUFBYyxDQUFFO1FBQ3BJLE1BQUs7QUFDSixnQkFBUTs7O1dBQWMsNENBQU8sSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUUsUUFBUyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxHQUFFO1VBQWMsQ0FBRTtRQUN4STtNQUNGOzs7WUFFbUIsZ0NBQUU7QUFDcEIsV0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUN4RCxXQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsWUFBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFDL0IsdUJBQWMsQ0FBQyxJQUFJLENBQUM7QUFDbEIsZ0JBQUssRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVztVQUM3QixDQUFDLENBQUM7UUFDSjtBQUNELGNBQU8sY0FBYyxDQUFDO01BQ3ZCOzs7WUFFUyxzQkFBRztBQUNYLFdBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzFCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDdkIsYUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDMUM7O0FBRUQsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO0FBQ25FLGFBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFJLElBQUksQ0FBQztRQUN2RTtNQUNGOzs7WUFFaUIsOEJBQUU7QUFDbEIsV0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUN4RCxZQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUMvQixnQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEQ7TUFDRjs7O1lBRXVCLG9DQUFFO0FBQ3hCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FDckQ7QUFDRixnQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekM7TUFDRjs7O1lBRWtCLCtCQUFFO0FBQ25CLGNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLG1CQUFNLGlCQUFpQixJQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssbUJBQU0sZ0JBQWdCLENBQUM7TUFDNUQ7OztVQS9SRyxTQUFTO0lBQVMsbUJBQU0sU0FBUzs7QUFpU3ZDLFVBQVMsQ0FBQyxTQUFTLEdBQUc7QUFDcEIsU0FBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzlCLE9BQUksRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSztBQUMzQixVQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDOUIsVUFBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixRQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDM0IsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxrQkFBZSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQ3RDLGFBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxjQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDakMsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0VBQ25DLENBQUM7c0JBQ2EsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0MzVE4sQ0FBTzs7OztrQ0FDUCxDQUFTOzs7O0tBRXJCLFFBQVE7YUFBUixRQUFROztBQUVELFlBRlAsUUFBUSxDQUVBLEtBQUssRUFBRTsyQkFGZixRQUFROztBQUdWLGdDQUhFLFFBQVEsNkNBR0osS0FBSyxFQUFFO0FBQ2IsU0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDbkI7O2dCQUxHLFFBQVE7O1lBT0osa0JBQUMsQ0FBQyxFQUFDOzs7QUFDVCxXQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFDM0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUM3QixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7O0FBQ25DLGVBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQzFDLGVBQUksTUFBSyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQ3RCLGlCQUFJLE1BQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7QUFDdEMscUJBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztjQUMxRCxNQUFNLElBQUksTUFBSyxLQUFLLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFO0FBQ3hELHFCQUFLLFFBQVEsRUFBRSxDQUFDOzs7OztBQUtoQix5QkFBVSxDQUFDLFlBQU07QUFDZixxQkFBRyxNQUFLLFFBQVEsS0FBSyxDQUFDLEVBQUU7QUFDdEIseUJBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztrQkFDMUQ7QUFDRCx1QkFBSyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2NBQ1Q7WUFDSjtBQUNELGVBQUksTUFBSyxLQUFLLENBQUMsVUFBVSxFQUFFLE1BQUssS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFDNUQ7TUFDRjs7O1lBRVUscUJBQUMsQ0FBQyxFQUFFO0FBQ2IsV0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUM1QixhQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BEO01BQ0Y7OztZQUVXLHNCQUFDLENBQUMsRUFBRTtBQUNkLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDN0IsYUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRDtNQUNGOzs7WUFFSyxrQkFBRTtBQUNOLFdBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFdBQUksS0FBSyxHQUFDO0FBQ1IsY0FBSyxFQUFDO0FBQ0osMEJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsSUFBSTtVQUN6RTtBQUNELGtCQUFTLEVBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBRSxFQUFFLENBQUM7UUFDdkksQ0FBQzs7QUFFRixXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQztBQUN4RSxnQkFDRTs7d0JBQVEsS0FBSztBQUNULHdCQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQzFDLHVCQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO0FBQ3hDLG9CQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO1dBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1VBQU0sQ0FDbEU7UUFDRixNQUFJO0FBQ0gsZ0JBQ0U7O1dBQVEsS0FBSztXQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtVQUFNLENBQzFDO1FBQ0Y7TUFDRjs7O1VBbkVHLFFBQVE7SUFBUyxtQkFBTSxTQUFTOztBQXFFdEMsU0FBUSxDQUFDLFNBQVMsR0FBRztBQUNuQixhQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsaUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxhQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsY0FBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2pDLGdCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsaUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtFQUNyQyxDQUFDO0FBQ0YsU0FBUSxDQUFDLFlBQVksR0FBRztBQUN0QixhQUFVLEVBQUUsU0FBUztFQUN0QjtzQkFDYyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ25GTCxDQUFPOzs7O2tDQUNQLENBQVM7Ozs7S0FFckIsV0FBVzthQUFYLFdBQVc7O0FBRUosWUFGUCxXQUFXLENBRUgsS0FBSyxFQUFFOzJCQUZmLFdBQVc7O0FBR2IsZ0NBSEUsV0FBVyw2Q0FHUCxLQUFLLEVBQUU7SUFDZDs7Z0JBSkcsV0FBVzs7WUFNTSwrQkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO1dBQ2xDLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUF2QixRQUFROztBQUNoQixXQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxJQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxJQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxJQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxJQUM1QyxPQUFPLFFBQVEsS0FBSyxPQUFPLFNBQVMsQ0FBQyxRQUFRLElBQzdDLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFOztBQUUzRSxXQUFHLGFBQWEsRUFBQztBQUNmLGdCQUFPLGFBQWEsQ0FBQztRQUN0Qjs7QUFFRCxXQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQy9FLGFBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUN4RSx3QkFBYSxHQUFHLGFBQWEsSUFDM0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUNyRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7VUFDL0QsTUFBTTtBQUNMLHdCQUFhLEdBQUcsSUFBSSxDQUFDO1VBQ3RCO1FBQ0YsTUFBTTtBQUNMLHNCQUFhLEdBQUcsYUFBYSxJQUFJLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ2xFOztBQUVELFdBQUcsYUFBYSxFQUFDO0FBQ2YsZ0JBQU8sYUFBYSxDQUFDO1FBQ3RCOztBQUVELFdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDL0MsZ0JBQU8sS0FBSyxDQUFDO1FBQ2QsTUFBTTtBQUNMLGdCQUFPLGFBQWEsSUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDM0Q7TUFDRjs7O1lBRWEsd0JBQUMsQ0FBQyxFQUFDO0FBQ2YsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksbUJBQU0saUJBQWlCLEVBQUM7QUFDckQsYUFBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQ2pELG1CQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1VBQzVCLE1BQU0sSUFBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQzNCLGVBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNoQyxjQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7VUFDekI7UUFDRjtBQUNELFdBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNmLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFDdEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUM5Qjs7O1lBRUssa0JBQUU7QUFDTixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFELFdBQUksT0FBTyxHQUFHO0FBQ1osa0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDL0IsZ0JBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsSUFBSTtBQUN0QyxjQUFLLEVBQUUsS0FBSztBQUNaLGlCQUFRLEVBQUUsS0FBSztRQUNoQixDQUFDO0FBQ0YsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDckMsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQztBQUNoQixrQkFBUyxJQUFJLFVBQVUsR0FBQyxLQUFLLENBQUM7UUFDakM7O0FBR0QsV0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztBQUNyQixhQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxtQkFBTSxlQUFlLEVBQUM7QUFDbkQsZUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUMvQyxNQUFLLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLG1CQUFNLGlCQUFpQixFQUFDO0FBQzNELGVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDckQ7UUFDRjtBQUNELGNBQ0U7O29CQUFJLEtBQUssRUFBRSxPQUFRLEVBQUMsU0FBUyxFQUFFLFNBQVUsSUFBSyxJQUFJO1NBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNqQixDQUNOO01BQ0Y7OztVQXJGRyxXQUFXO0lBQVMsbUJBQU0sU0FBUzs7QUF1RnpDLFlBQVcsQ0FBQyxTQUFTLEdBQUc7QUFDdEIsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLFNBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixZQUFTLEVBQUMsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDakMsQ0FBQzs7QUFFRixZQUFXLENBQUMsWUFBWSxHQUFHO0FBQ3pCLFlBQVMsRUFBRSxNQUFNO0FBQ2pCLFNBQU0sRUFBRSxLQUFLO0FBQ2IsWUFBUyxFQUFDLEVBQUU7RUFDYjtzQkFDYyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NyR1IsQ0FBTzs7OztrQ0FDUCxDQUFTOzs7O21DQUNSLEVBQVU7Ozs7MkNBQ1IsRUFBbUI7Ozs7dUNBQ25CLENBQVk7Ozs7S0FFM0IsZUFBZTtlQUFmLGVBQWU7O0FBQ04sY0FEVCxlQUFlLENBQ0wsS0FBSyxFQUFDOytCQURoQixlQUFlOztBQUViLG9DQUZGLGVBQWUsNkNBRVAsS0FBSyxFQUFFO0FBQ2IsYUFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7QUFDckIsYUFBSSxDQUFDLEtBQUssR0FBQztBQUNQLHdCQUFXLEVBQUMsS0FBSztVQUNwQixDQUFDO01BQ0w7O2tCQVBDLGVBQWU7O2dCQVNMLHdCQUFDLENBQUMsRUFBQztBQUNmLGlCQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFOztBQUNuQixxQkFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksVUFBVSxHQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7O0FBRTlELHFCQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQztBQUN0Qiw0QkFBTztrQkFDVjtBQUNELHFCQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Y0FDcEQsTUFBSyxJQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDO0FBQ3ZCLHFCQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Y0FDbkQ7VUFDRjs7O2dCQUVTLG9CQUFDLENBQUMsRUFBQztBQUNYLGlCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDO0FBQ3ZCLHFCQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxVQUFVLEdBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUM5RCxxQkFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUM7QUFDdEIsNEJBQU87a0JBQ1Y7QUFDRCxxQkFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2NBQ3REO1VBQ0Y7OztnQkFDUSxtQkFBQyxLQUFLLEVBQUM7QUFDWixpQkFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDO0FBQ1osaUJBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFDO0FBQzNCLHFCQUFJLEtBQUssR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0MscUJBQUcsS0FBSyxLQUFHLElBQUksRUFBQztBQUNaLHVCQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2hFLHlCQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFN0IsdUJBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNsQix1QkFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2hDLHVCQUFFLENBQUMsYUFBYSxHQUFDLFVBQVUsQ0FBQyxZQUFVO0FBQUMsMkJBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztzQkFBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9FLDBCQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZCw0QkFBTyxLQUFLLENBQUM7a0JBQ2hCO2NBQ0o7QUFDRCxvQkFBTyxJQUFJLENBQUM7VUFFZjs7Ozs7Ozs7Ozs7OztZQUNXLFlBQUU7QUFDVixpQkFBRyxJQUFJLENBQUMsYUFBYSxJQUFFLENBQUMsRUFBQztBQUNyQiw2QkFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqQyxxQkFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7Y0FDeEI7VUFDSjs7O2dCQUNnQiw2QkFBRTtBQUNmLGlCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFL0Isa0JBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztVQUNqQjs7O2dCQUVtQixnQ0FBRztBQUNyQixpQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1VBQ3JCOzs7Z0JBRUssa0JBQUU7QUFDTixpQkFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2lCQUM1QixNQUFNLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUN4QixJQUFJLEdBQUM7QUFDRCxvQkFBRyxFQUFDLFVBQVU7QUFDZCwwQkFBUyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN4Qyx1QkFBTSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztjQUNwQyxDQUFDOztBQUVGLHFCQUFRLENBQUMsV0FBVyxLQUFHLElBQUksQ0FBQyxXQUFXLEdBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVsRSxpQkFBSSxXQUFXLEdBQUMsNkJBQVMsRUFBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztBQUM3RixvQkFDSTs7bUJBQUksR0FBRyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFFO2lCQUNyQyx5QkFBTyxRQUFRLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUUsRUFBRSxDQUFDO2lCQUNqRSxnRUFBVSxHQUFHLEVBQUMsVUFBVSxHQUFZO2NBQ25DLENBQ1I7VUFDRjs7O2dCQUVnQiwyQkFBQyxDQUFDLEVBQUM7QUFDbEIsaUJBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLGlCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsa0JBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELG9CQUFPLEtBQUssQ0FBQztVQUNkOzs7WUEvRkcsZUFBZTtJQUFTLG1CQUFNLFNBQVM7O0FBa0c3QyxnQkFBZSxDQUFDLFNBQVMsR0FBRztBQUMxQixpQkFBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLGFBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNoQyxhQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsZUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0VBQ2pDLENBQUM7O3NCQUdhLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ2hIWixDQUFPOzs7O0FBQ3pCLEtBQUksTUFBTSxHQUFDLFNBQVAsTUFBTSxDQUFVLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUM7O0FBR2xFLFNBQUcsUUFBUSxLQUFHLElBQUksSUFBRSxPQUFPLFFBQVEsS0FBRyxRQUFRLEVBQUM7O0FBQzNDLGFBQUksSUFBSSxHQUFDLFFBQVEsS0FBRyxJQUFJLEdBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQztBQUN6QyxnQkFDSSx1REFBVyxJQUFJLElBQUUsSUFBSSxFQUFFLElBQUssRUFBQyxZQUFZLEVBQUUsWUFBYTtBQUNqRCxzQkFBUyxFQUFFLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFBRSxnQ0FBaUMsSUFBRyxDQUMzRTtNQUNKLE1BQU0sSUFBRyxDQUFDLFFBQVEsRUFBQztBQUNsQixhQUFJLElBQUksR0FBQyxRQUFRLEtBQUcsSUFBSSxHQUFDLE1BQU0sR0FBQyxRQUFRLENBQUM7QUFDekMsZ0JBQ0ksdURBQVcsSUFBSSxJQUFFLElBQUksRUFBRSxJQUFLLEVBQUMsWUFBWSxFQUFFLFlBQWEsRUFBQyxRQUFRLEVBQUMsVUFBVTtBQUNyRSxzQkFBUyxFQUFFLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFBRSxnQ0FBaUMsSUFBRyxDQUMzRTtNQUNGLE1BQU0sSUFBRyxRQUFRLENBQUMsSUFBSSxFQUFDOzs7QUFFcEIsaUJBQVEsQ0FBQyxLQUFLLEtBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQUc1QyxhQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFDaEIsNEJBQTRCLEdBQzVCLFFBQVEsQ0FBQyxJQUFJLElBQ1osUUFBUSxDQUFDLFNBQVMsR0FBRSxHQUFHLEdBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRSxFQUFFLENBQUMsQ0FBQzs7QUFFbEUsYUFBRyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBQzs7QUFDMUIsaUJBQUksT0FBTyxHQUFHLEVBQUU7aUJBQUUsTUFBTSxHQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ2pELGlCQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUM7O0FBQ3JCLHFCQUFJLFFBQVEsQ0FBQztBQUNiLHdCQUFPLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFDNUIsNkJBQVEsR0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUM1Qiw0QkFDSTs7MkJBQVEsR0FBRyxFQUFFLFFBQVEsR0FBQyxDQUFFLEVBQUMsS0FBSyxFQUFFLENBQUU7eUJBQUUsUUFBUTtzQkFBVSxDQUN6RDtrQkFDSixDQUFDLENBQUM7Y0FDTjtBQUNELG9CQUNJOzs4QkFBWSxJQUFJLElBQUUsWUFBWSxFQUFFLFlBQWE7aUJBQUUsT0FBTztjQUFVLENBQ2xFO1VBQ0wsTUFBTSxJQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFDOzs7QUFFbkMscUJBQVEsQ0FBQyxJQUFJLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMscUJBQVEsQ0FBQyxJQUFJLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsaUJBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxTQUFTO2lCQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7QUFDN0MsaUJBQUcsWUFBWSxFQUFDO0FBQ1oscUJBQUksQ0FBQyxTQUFTLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFDdEIseUJBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7O0FBQ2pCLHFDQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7c0JBQ25CO2tCQUNKLENBQUM7QUFDRix3QkFBTyxHQUFDOzt1QkFBTyxTQUFTLEVBQUMsdUNBQXVDLEVBQUMsT0FBTyxFQUFFLFlBQWE7O2tCQUFhO2NBQ3ZHOztBQUVELG9CQUNJOzs7aUJBQ0ksMERBQWMsSUFBSSxJQUFFLFlBQVksRUFBRSxZQUFhLElBQVk7aUJBQzFELE9BQU87Y0FDTixDQUVSO1VBQ0wsTUFBTSxJQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFDO0FBQ3JDLGlCQUFJLE9BQU0sR0FBRyxZQUFZLENBQUM7QUFDMUIsaUJBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQzs7QUFFN0Msd0JBQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztjQUNsQztBQUNELGlCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsQ0FBQztBQUMzRCxpQkFBSSxDQUFDLFNBQVMsSUFBSSxzQkFBc0IsQ0FBQzs7QUFFekMsaUJBQUksT0FBTyxHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDOztBQUV6RixvQkFDRSx1REFBVyxJQUFJLElBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLGNBQWMsRUFBRSxPQUFRLElBQUUsQ0FDMUU7VUFDSCxNQUFLOztBQUNGLG9CQUNJLHVEQUFXLElBQUksSUFBRSxJQUFJLEVBQUUsSUFBSyxFQUFDLFlBQVksRUFBRSxZQUFhLElBQUUsQ0FDN0Q7VUFDSjtNQUNKOztBQUVELFlBQ0ksdURBQVcsSUFBSSxJQUFFLElBQUksRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxJQUFFLEVBQUUsSUFBRSxnQ0FBaUMsSUFBRSxDQUNoRztFQUNKLENBQUM7O3NCQUVhLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ3ZGSCxDQUFPOzs7O2tDQUNQLENBQVM7Ozs7d0NBS3BCLEVBQWM7O0FBR3JCLEtBQUksb0JBQW9CLEdBQUMsbUJBQU0sYUFBYSxDQUFDLDBCQUFhLFNBQVMsQ0FBQyxDQUFDOztLQUUvRCxZQUFZO2FBQVosWUFBWTs7WUFBWixZQUFZOzJCQUFaLFlBQVk7O2dDQUFaLFlBQVk7OztnQkFBWixZQUFZOzs7O1lBRVYsZ0JBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUM7QUFDcEIsV0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQ2xCLEdBQUcsRUFBQyxLQUFLLEVBQUU7QUFDVCxhQUFJLEVBQUMsUUFBUTtBQUNiLGdCQUFPLEVBQUUsSUFBSTtBQUNiLHdCQUFlLEVBQUUsSUFBSTtBQUNyQixzQkFBYSxFQUFFLG9CQUFvQjtBQUNuQyxzQkFBYSxFQUFFLG9CQUFvQjtRQUNwQyxDQUFDLENBQUM7TUFDUjs7O1lBRUssa0JBQUU7QUFDTixjQUNJLGdFQUFnQixHQUFHLEVBQUMsUUFBUSxFQUFDLG1CQUFtQixFQUFFLG9CQUFxQjtBQUN0RCxXQUFFLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixHQUFrQixDQUN2RjtNQUNGOzs7VUFsQkcsWUFBWTtJQUFTLG1CQUFNLFNBQVM7O3NCQXFCM0IsWUFBWTs7Ozs7OztBQ2hDM0I7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQSwrQzs7Ozs7O0FDbEJBOztBQUVBLG9EQUFtRCxnQkFBZ0Isc0JBQXNCLE9BQU8sMkJBQTJCLDBCQUEwQix5REFBeUQsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRTlQLGlDQUFnQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWpqQjtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsNENBQTJDLGtCQUFrQixrQ0FBa0MscUVBQXFFLEVBQUUsRUFBRSxPQUFPLGtCQUFrQixFQUFFLFlBQVk7O0FBRS9NLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLGtEQUFpRCxhQUFhLHVGQUF1RixFQUFFLHVGQUF1Rjs7QUFFOU8sMkNBQTBDLCtEQUErRCxxR0FBcUcsRUFBRSx5RUFBeUUsZUFBZSx5RUFBeUUsRUFBRSxFQUFFLHVIQUF1SDs7QUFFNWU7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG9FQUFtRSxhQUFhO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQixlQUFlLHVDQUF1QztBQUN6RTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLHFGQUFvRjs7QUFFcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsUUFBTztBQUNQLDhDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQixRQUFPO0FBQ1A7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQixVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7OztBQ2xMQSwwQzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLDJCQUEwQixjQUFjO0FBQ3hDLDhCQUE2QixpQkFBaUI7QUFDOUMsNkJBQTRCLGdCQUFnQjtBQUM1QywwQkFBeUIsYUFBYTtBQUN0Qyw0QkFBMkIsZUFBZTtBQUMxQyw0QkFBMkIsZUFBZTs7QUFFMUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQSxvSUFBbUk7QUFDbkk7QUFDQSxzSUFBcUk7QUFDckk7O0FBRUE7QUFDQSx5TUFBd00sUUFBUTs7QUFFaE47QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0SkFBMko7QUFDM0osZ0tBQStKO0FBQy9KO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSx5SEFBd0g7QUFDeEgsNkpBQTRKO0FBQzVKO0FBQ0EsK0lBQThJO0FBQzlJO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsNkpBQTRKO0FBQzVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCOzs7Ozs7O0FDMUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEJBQXlCLDhCQUE4QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QyxnQkFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JELE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7QUNqREE7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsaUJBQWlCO0FBQ2pELE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsUUFBTyx1Q0FBdUM7QUFDOUM7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxRQUFPLHlDQUF5QztBQUNoRDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBZ0IsaUNBQWlDO0FBQ2pELFlBQVc7QUFDWCxFQUFDOztBQUVEO0FBQ0EsaUJBQWdCLDhCQUE4QjtBQUM5QyxZQUFXO0FBQ1gsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxnQzs7Ozs7O0FDOUhBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QixjQUFhLE9BQU87QUFDcEIsZUFBYyxXQUFXO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QixjQUFhLE9BQU87QUFDcEIsZUFBYyxXQUFXO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxjQUFhLFdBQVc7QUFDeEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsRUFBRTtBQUNmLGVBQWMsV0FBVztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsa0JBQWtCO0FBQy9CLGNBQWEsT0FBTztBQUNwQixlQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQjs7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JELE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQSx3Qzs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDOzs7Ozs7QUNuQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLGlCQUFpQjs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N2RmtCLENBQU87Ozs7eUNBQ0YsRUFBaUI7Ozs7a0NBQ3RCLENBQVU7Ozs7S0FFdEIsY0FBYzthQUFkLGNBQWM7O1lBQWQsY0FBYzsyQkFBZCxjQUFjOztnQ0FBZCxjQUFjOzs7Z0JBQWQsY0FBYzs7WUFFUixvQkFBQyxJQUFJLEVBQUU7QUFDZixXQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUM5QixhQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdEMsYUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzlGLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdEMsYUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDeEIsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN2QyxhQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsTUFBTTtBQUNMLGFBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkI7O0FBRUQsV0FBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDL0IsYUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQ7TUFDRjs7O1lBRWdCLDJCQUFDLENBQUMsRUFBRTtBQUNuQixRQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLFdBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzVDLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUF2QixRQUFROztBQUNkLFdBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO0FBQ3hDLGFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQztBQUM5RCxhQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7QUFFN0IsYUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVDLGFBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBQztBQUM5QixlQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1VBQzFDO1FBQ0Y7TUFDRjs7O1lBRUssa0JBQUc7OztBQUNQLFdBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFFLFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMvQixXQUFJLGFBQWEsR0FBRztBQUNsQixjQUFLLEVBQUUsT0FBTztBQUNkLGtCQUFTLEVBQUUsS0FBSztRQUNqQjs7QUFFRCxXQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQyxXQUFXLEVBQUs7QUFDcEUsZ0JBQ0U7O2FBQUksR0FBRyxFQUFFLFdBQVksRUFBQyxJQUFJLEVBQUMsY0FBYztXQUN2Qzs7ZUFBRyxJQUFJLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUUsTUFBSyxpQkFBaUIsQ0FBQyxJQUFJLE9BQU87YUFBRSxXQUFXO1lBQUs7VUFDcEcsQ0FDTDtRQUNILENBQUMsQ0FBQzs7QUFFSCxjQUNFOztXQUFLLFNBQVMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRztTQUUxQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUNuQzs7O1dBQ0U7O2VBQUssU0FBUyxFQUFDLFVBQVU7YUFDckI7O2lCQUFLLFNBQVMsRUFBQyxVQUFVO2VBQ3ZCOzttQkFBUSxTQUFTLEVBQUMsaUNBQWlDLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLGVBQVksVUFBVTtBQUNsRyxvQ0FBYyxNQUFNO2lCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7aUJBQ3ZCOzs7bUJBQ0csR0FBRzttQkFDSiwyQ0FBTSxTQUFTLEVBQUMsT0FBTyxHQUFFO2tCQUNwQjtnQkFDQTtlQUNUOzttQkFBSSxTQUFTLEVBQUMsZUFBZSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsbUJBQWdCLGNBQWM7aUJBQ3JFLGVBQWU7Z0JBQ2I7Y0FDRDtZQUNGO1dBQ047O2VBQUssU0FBUyxFQUFDLFVBQVU7YUFDdkI7O2lCQUFJLFNBQVMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFFLGFBQWM7ZUFDN0MsUUFBUTtjQUNOO1lBQ0Q7VUFDRixHQUNSOzthQUFLLFNBQVMsRUFBQyxXQUFXO1dBQ3hCOztlQUFJLFNBQVMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFFLGFBQWM7YUFDN0MsUUFBUTtZQUNOO1VBQ0Q7UUFFTixDQUNQO01BQ0Y7OztZQUVPLG9CQUFHO0FBQ1QsV0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzVCLGNBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtBQUMvQixhQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDNUMsYUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLGFBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNuQixhQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsS0FDeEIsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQzdELG1CQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGlCQUFNLEdBQUcsSUFBSSxDQUFDO1VBQ2pCO0FBQ0QsYUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUN0QyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUM7QUFDN0QsbUJBQVEsR0FBRyxJQUFJLENBQUM7QUFDaEIsaUJBQU0sR0FBRyxJQUFJLENBQUM7VUFDakI7QUFDRCxnQkFDRTs7YUFBWSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVMsRUFBQyxPQUFPLEVBQUUsUUFBUyxFQUFDLE1BQU0sRUFBRSxNQUFPLEVBQUMsR0FBRyxFQUFFLElBQUs7V0FBRSxJQUFJO1VBQWMsQ0FDeEk7UUFDRixFQUFFLElBQUksQ0FBQyxDQUFDO01BQ1Y7OztZQUVPLG9CQUFHO0FBQ1QsV0FBSSxTQUFTLEdBQUcsQ0FBQztXQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDOztBQUU3QyxnQkFBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RixjQUFPLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQzs7QUFFcEQsV0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUM3QixnQkFBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDMUIsa0JBQVMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3JEO0FBQ0QsV0FBSSxLQUFLLENBQUM7QUFDVixXQUFHLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtBQUNoRSxjQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtBQUM5QixjQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLE1BQ0k7QUFDSCxjQUFLLEdBQUcsRUFBRTtRQUNYO0FBQ0QsWUFBSyxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxhQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QjtBQUNELFdBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDOUIsY0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLGNBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUM7QUFDN0IsY0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDO0FBQ0QsY0FBTyxLQUFLLENBQUM7TUFDZDs7O1lBRWEsMEJBQUc7QUFDZixjQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO01BQzVCOzs7WUFFYSwwQkFBRztBQUNmLGNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7TUFDL0I7OztVQXBKRyxjQUFjO0lBQVMsbUJBQU0sU0FBUzs7QUFzSjVDLGVBQWMsQ0FBQyxTQUFTLEdBQUc7QUFDekIsV0FBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGtCQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDdEMsaUJBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN0QyxTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsb0JBQWlCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDdkMsVUFBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0VBQ2hDLENBQUM7O0FBRUYsZUFBYyxDQUFDLFlBQVksR0FBRztBQUM1QixjQUFXLEVBQUUsbUJBQU0sYUFBYTtFQUNqQyxDQUFDOztzQkFFYSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0MxS1gsQ0FBTzs7Ozt1Q0FDSixDQUFZOzs7O0tBRTNCLFVBQVU7YUFBVixVQUFVOztBQUVILFlBRlAsVUFBVSxDQUVGLEtBQUssRUFBRTsyQkFGZixVQUFVOztBQUdkLGdDQUhJLFVBQVUsNkNBR1IsS0FBSyxFQUFFO0lBQ2I7O2dCQUpJLFVBQVU7O1lBTUYsc0JBQUMsQ0FBQyxFQUFDO0FBQ2IsUUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLFdBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDN0M7OztZQUVLLGtCQUFFO0FBQ04sV0FBSSxPQUFPLEdBQUcsNkJBQVM7QUFDbkIsaUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07QUFDM0IsbUJBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87QUFDOUIsaUJBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDOUIsQ0FBQyxDQUFDO0FBQ0gsY0FDSTs7V0FBSSxTQUFTLEVBQUUsT0FBUTtTQUFDOzthQUFHLElBQUksRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtXQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtVQUFLO1FBQUssQ0FDNUc7TUFDRjs7O1VBcEJHLFVBQVU7SUFBUyxtQkFBTSxTQUFTOztBQXNCeEMsV0FBVSxDQUFDLFNBQVMsR0FBRztBQUNyQixhQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsU0FBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLFVBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtFQUM5QixDQUFDOztzQkFFYSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0MvQlAsQ0FBTzs7Ozt1Q0FDSixDQUFZOzs7O2tDQUNmLENBQVU7Ozs7bUNBQ1QsRUFBVzs7OzsyQ0FDVCxFQUFvQjs7OztLQUVuQyxPQUFPO2FBQVAsT0FBTzs7QUFFQSxZQUZQLE9BQU8sQ0FFQyxLQUFLLEVBQUU7OzsyQkFGZixPQUFPOztBQUdYLGdDQUhJLE9BQU8sNkNBR0wsS0FBSyxFQUFFOztVQXNGYixvQkFBb0IsR0FBRyxXQUFDLEVBQUk7QUFDMUIsYUFBSyxRQUFRLENBQUM7QUFDWixxQkFBWSxFQUFFLENBQUMsTUFBSyxLQUFLLENBQUMsWUFBWTtRQUN2QyxDQUFDLENBQUM7QUFDSCxhQUFLLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO01BQ2pDOztVQWtCRCxtQkFBbUIsR0FBRyxZQUFNO0FBQzFCLGFBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLGFBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUN6Qjs7QUEvR0MsU0FBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7QUFDckIsU0FBSSxDQUFDLEtBQUssR0FBRztBQUNYLHlCQUFrQixFQUFFLElBQUk7QUFDeEIsb0JBQWEsRUFBQyxJQUFJO0FBQ2xCLGtCQUFXLEVBQUMsS0FBSztBQUNqQixtQkFBWSxFQUFFLEtBQUs7TUFDcEIsQ0FBQztJQUNIOztnQkFYRyxPQUFPOztZQVlTLGdDQUFFO0FBQ3BCLFdBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztNQUNyQjs7Ozs7Ozs7Ozs7OztRQUNXLFlBQUc7QUFDYixXQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7QUFDcEIscUJBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDakMsYUFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7UUFDdEI7TUFDRjs7O1lBRWdCLDZCQUFFO0FBQ2pCLFdBQUksRUFBRSxHQUFDLElBQUk7V0FBQyxNQUFNLEdBQUcsRUFBRTtXQUFDLE9BQU8sR0FBQyxJQUFJO1dBQUMsU0FBUztXQUFDLE9BQU87V0FBQyxhQUFhLEdBQUMsRUFBRSxDQUFDO0FBQ3hFLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sRUFBRSxDQUFDLEVBQUM7QUFDNUMsYUFBRyxNQUFNLENBQUMsU0FBUyxFQUFDOztBQUNsQixvQkFBUyxHQUFDLE9BQU8sTUFBTSxDQUFDLFNBQVMsSUFBRSxVQUFVLEdBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFFLFlBQVksR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxDQUFDO1VBQ3RHLE1BQUk7QUFDSCxlQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsb0JBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDOztBQUV0QixlQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFDO0FBQ3ZELGlCQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyxzQkFBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5Qzs7QUFFRCxlQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUM7O0FBQzVDLG9CQUFPLEdBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQzdDLGlCQUFHLE9BQU8sS0FBRyxJQUFJLEVBQUM7QUFDaEIsc0JBQU8sR0FBQyxLQUFLLENBQUM7QUFDZCw0QkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBQyxPQUFPLENBQUM7Y0FDckM7WUFDRjtVQUNGOztBQUVELGVBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUUsU0FBUyxDQUFDO1FBQ2pDLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsV0FBRyxPQUFPLEVBQUM7QUFDVCxnQkFBTyxNQUFNLENBQUM7UUFDZixNQUFJO0FBQ0gsV0FBRSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUVsQixhQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQzs7QUFFOUQsV0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyx3Q0FBd0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDOztBQUVuRyxXQUFFLENBQUMsYUFBYSxHQUFDLFVBQVUsQ0FBQyxZQUFVO0FBQUMsYUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1VBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUMvRSxnQkFBTyxJQUFJLENBQUM7UUFDYjtNQUNGOzs7WUFFaUIsNEJBQUMsQ0FBQyxFQUFDO0FBQ25CLFdBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3RDLFdBQUcsQ0FBQyxNQUFNLEVBQUM7O0FBQ1QsZ0JBQU87UUFDUjtBQUNELFdBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLFdBQUcsR0FBRyxFQUFFO0FBQ04sYUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDO0FBQ1osV0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUM5RCxXQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7O0FBRWxCLFdBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQywrQ0FBK0MsRUFBQyxDQUFDLENBQUM7O0FBRTlGLFdBQUUsQ0FBQyxhQUFhLEdBQUMsVUFBVSxDQUFDLFlBQVU7QUFBQyxhQUFFLENBQUMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7VUFBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hGLE1BQUs7O0FBRUosYUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLHdCQUFhLEVBQUMsSUFBSTtBQUNsQixzQkFBVyxFQUFDLEtBQUs7VUFDbEIsRUFBRSxZQUFNO0FBQ1AsbUJBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7VUFDdEQsQ0FBQyxDQUFDOztBQUVILGFBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCO01BQ0Y7OztZQVNvQiwrQkFBQyxDQUFDLEVBQUM7QUFDdEIsV0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztNQUN4Qjs7O1lBRWEsd0JBQUMsQ0FBQyxFQUFDO0FBQ2YsV0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7TUFDMUM7OztZQUVVLHFCQUFDLENBQUMsRUFBQztBQUNaLFdBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDNUM7OztZQUVjLDJCQUFHO0FBQ2hCLFdBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7TUFDMUI7OztZQU9LLGtCQUFFO0FBQ04sV0FBSSxjQUFjLEdBQUcsbUJBQW1CLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM5RCxXQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FDakM7O1dBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFjLEVBQUMsU0FBUyxFQUFDLHFDQUFxQyxFQUFDLGVBQVksT0FBTyxFQUFDLGVBQWEsR0FBRyxHQUFDLGNBQWU7U0FDM0osd0NBQUcsU0FBUyxFQUFDLDBCQUEwQixHQUFLOztRQUFhLEdBQUMsSUFBSSxDQUFDOztBQUV2RSxXQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FDakM7O1dBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsd0NBQXdDLEVBQUMsZUFBWSxTQUFTLEVBQUMsa0JBQWUsT0FBTyxFQUFDLEtBQUssRUFBQyxtQkFBbUI7QUFDN0ksa0JBQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTtTQUMvQyx3Q0FBRyxTQUFTLEVBQUMsMkJBQTJCLEdBQUs7O1FBQ3RDLEdBQUMsSUFBSSxDQUFDOztBQUVyQixXQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7QUFFL0MsV0FBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUN6RDs7V0FBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxlQUFZLFFBQVEsRUFBQyxnQkFBYSxPQUFPO1NBQ3RJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFFLG1CQUFNLFFBQVEsR0FBRyxtQkFBTSxnQkFBZ0I7UUFDM0QsR0FBQyxJQUFJLENBQUM7O0FBRWpCLFdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsR0FBQyxJQUFJLENBQUM7QUFDbkYsV0FBSSxZQUFZLEdBQUc7QUFDakIsZ0JBQU8sRUFBRSxNQUFNO0FBQ2YscUJBQVksRUFBRSxDQUFDO1FBQ2hCLENBQUM7O0FBRUYsV0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQ3BDOztXQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUU7U0FDdkYsd0NBQUcsU0FBUyxFQUFDLDRCQUE0QixHQUFLOztRQUF1QixHQUFHLElBQUksQ0FBQzs7QUFFdkYsY0FDRTs7V0FBSyxTQUFTLEVBQUMsS0FBSztTQUNsQjs7YUFBSyxTQUFTLEVBQUMsc0NBQXNDO1dBQ25EOztlQUFLLFNBQVMsRUFBQyx3QkFBd0IsRUFBQyxJQUFJLEVBQUMsT0FBTzthQUNqRCxTQUFTO2FBQ1QsU0FBUzthQUNULFNBQVM7YUFDVCxtQkFBbUI7WUFDaEI7VUFDRjtTQUNOOzthQUFLLFNBQVMsRUFBQyxzQ0FBc0M7V0FDbEQsZUFBZTtVQUNaO1NBQ04sZ0VBQVUsR0FBRyxFQUFDLFVBQVUsR0FBWTtTQUNuQyxLQUFLO1FBQ0YsQ0FDUDtNQUNGOzs7WUFFZ0IsNkJBQUc7QUFDbEIsV0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUMxQixhQUFJLFVBQVUsR0FBRywwQkFBMEIsQ0FBQztBQUM1QyxhQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsYUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUN6QixtQkFBUSxHQUNOOztlQUFNLFNBQVMsRUFBQyxpQkFBaUI7YUFDL0I7OztBQUNFLDBCQUFTLEVBQUMsaUJBQWlCO0FBQzNCLHFCQUFJLEVBQUMsUUFBUTtBQUNiLHdCQUFPLEVBQUcsSUFBSSxDQUFDLG1CQUFxQjs7Y0FBZTtZQUV4RCxDQUFDO0FBQ0YscUJBQVUsR0FBRyxxREFBcUQsQ0FBQztVQUNwRTs7QUFFRCxnQkFDRTs7YUFBSyxTQUFTLEVBQUUsVUFBVztXQUN6Qiw0Q0FBTyxHQUFHLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLE1BQU07QUFDMUQsd0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUMsUUFBUztBQUNoRixvQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxHQUFFO1dBQ3JDLFFBQVE7VUFDUixDQUNOO1FBQ0gsTUFBTTtBQUNMLGdCQUFPLElBQUksQ0FBQztRQUNiO01BQ0Y7OztZQUVtQiw4QkFBQyxjQUFjLEVBQUM7QUFDbEMsV0FBSSxhQUFhLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUUsRUFBRSxDQUFDO0FBQy9DLFdBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFTLE1BQU0sRUFBRSxDQUFDLEVBQUM7QUFDekQsYUFBSSxRQUFRLEdBQUMsTUFBTSxDQUFDLFFBQVE7YUFDeEIsTUFBTSxHQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ3BCLElBQUksR0FBQyxFQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxRQUFRLENBQUMsV0FBVyxHQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQzs7QUFFaEcsYUFBRyxNQUFNLENBQUMsU0FBUyxFQUFDOztBQUNsQixrQkFBTyxJQUFJLENBQUM7VUFDYjtBQUNELGFBQUksS0FBSyxHQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUU7O2FBQU0sU0FBUyxFQUFDLHNCQUFzQjtXQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1VBQVEsR0FBRSxJQUFJLENBQUM7Ozs7QUFJekgsZ0JBQ0U7O2FBQUssU0FBUyxFQUFDLFlBQVksRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQU07V0FDNUM7OzthQUFRLE1BQU0sQ0FBQyxJQUFJO1lBQVM7V0FDM0IseUJBQU8sUUFBUSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBRSxDQUFDO1dBQy9CLEtBQUs7VUFDRixDQUNOO1FBQ0gsQ0FBQyxDQUFDO0FBQ0gsV0FBSSxVQUFVLEdBQUcsNkJBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRyxjQUFjLEVBQUM7QUFDekQsYUFBSSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtRQUN0RCxDQUFDLENBQUM7QUFDSCxXQUFJLFdBQVcsR0FBQyw2QkFBUyxjQUFjLEVBQUMsVUFBVSxFQUFDO0FBQ2pELG1CQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO0FBQ2pDLGdCQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO1FBQy9CLENBQUMsQ0FBQztBQUNILGNBQ0U7O1dBQUssR0FBRyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVE7U0FDbEU7O2FBQUssU0FBUyxFQUFFLFdBQVk7V0FDMUI7O2VBQUssU0FBUyxFQUFDLGVBQWU7YUFDNUI7O2lCQUFLLFNBQVMsRUFBQyxjQUFjO2VBQzNCOzttQkFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsZ0JBQWEsT0FBTyxFQUFDLGNBQVcsT0FBTztpQkFBQzs7cUJBQU0sZUFBWSxNQUFNOztrQkFBZTtnQkFBUztlQUNoSTs7bUJBQUksU0FBUyxFQUFDLGFBQWE7O2dCQUFnQjtjQUN2QzthQUNOOztpQkFBSyxTQUFTLEVBQUMsWUFBWTtlQUN6Qjs7bUJBQU0sR0FBRyxFQUFDLE1BQU07aUJBQ2YsVUFBVTtnQkFDSjtjQUNIO2FBQ047O2lCQUFLLFNBQVMsRUFBQyxjQUFjO2VBQzNCOzttQkFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxnQkFBYSxPQUFPOztnQkFBZTtlQUNyRjs7bUJBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRTs7Z0JBQWM7Y0FDdEc7WUFDRjtVQUNGO1FBQ0YsQ0FDUDtNQUNGOzs7VUFwUEcsT0FBTztJQUFTLG1CQUFNLFNBQVM7O0FBc1ByQyxRQUFPLENBQUMsU0FBUyxHQUFHO0FBQ2xCLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IscUJBQWtCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDeEMsZUFBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLGVBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNsQyxlQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMseUJBQXNCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUMsVUFBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0FBQzlCLG9CQUFpQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3pDLGNBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtFQUNsQyxDQUFDOztBQUVGLFFBQU8sQ0FBQyxZQUFZLEdBQUc7QUFDckIsZUFBWSxFQUFFLEtBQUs7QUFDbkIsZUFBWSxFQUFFLEtBQUs7QUFDbkIsZUFBWSxFQUFFLEtBQUs7QUFDbkIseUJBQXNCLEVBQUUsS0FBSztBQUM3QixjQUFXLEVBQUUsS0FBSztFQUNuQjtzQkFDYyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NoUkosQ0FBTzs7OztrQ0FDUCxDQUFTOzs7O3VDQUNOLENBQVk7Ozs7S0FFM0IsV0FBVzthQUFYLFdBQVc7O0FBRUosWUFGUCxXQUFXLENBRUgsS0FBSyxFQUFFOzJCQUZmLFdBQVc7O0FBR2IsZ0NBSEUsV0FBVyw2Q0FHUCxLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQjs7Z0JBTEcsV0FBVzs7WUFPSixxQkFBQyxDQUFDLEVBQUM7QUFDWixXQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDcEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FFNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDOztBQUUvRCxXQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7TUFDckM7OztZQUVLLGtCQUFFO0FBQ04sV0FBSSxZQUFZLEdBQUcsNkJBQVMsT0FBTyxFQUFFO0FBQ25DLHdCQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQ25DLDBCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztRQUN4QyxDQUFDLENBQUM7QUFDSCxXQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7O0FBRTNCLFdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksbUJBQU0saUJBQWlCLElBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFNLGdCQUFnQixFQUFDO0FBQ3JELGFBQUksS0FBSyxHQUFHO0FBQ1YsZ0JBQUssRUFBQyxFQUFFO0FBQ1Isc0JBQVcsRUFBRSxDQUFDO0FBQ2QsdUJBQVksRUFBRSxDQUFDO1VBQ2hCO0FBQ0Qsd0JBQWUsR0FBSTs7YUFBSSxLQUFLLEVBQUUsS0FBTSxFQUFDLEdBQUcsRUFBRSxDQUFDLENBQUU7O1VBQWEsQ0FBQztRQUM1RDtBQUNELFdBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFTLE1BQU0sRUFBQztBQUN2RCxhQUFJLE9BQU8sR0FBRztBQUNaLGtCQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsSUFBSTtBQUNsQyxnQkFBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1VBQ3BCLENBQUM7QUFDRixnQkFDRTs7YUFBSSxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUssRUFBQyxLQUFLLEVBQUUsT0FBUTtXQUNuQzs7ZUFBSyxTQUFTLEVBQUMsOEJBQThCO2FBQzNDLDRDQUFPLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUssRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUssRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQUU7WUFDN0c7VUFDSCxDQUNOO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULGNBQ0U7O1dBQU8sU0FBUyxFQUFFLFlBQWEsRUFBQyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFFO1NBQ25EOzs7V0FDRTs7ZUFBSSxLQUFLLEVBQUUsRUFBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUU7YUFDdEMsZUFBZTthQUFFLFdBQVc7WUFDMUI7VUFDQztRQUNGLENBQ1Q7TUFDRjs7O1VBdERHLFdBQVc7SUFBUyxtQkFBTSxTQUFTOztBQXdEekMsWUFBVyxDQUFDLFNBQVMsR0FBRztBQUN0QixVQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDOUIsZ0JBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNyQyxXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7RUFDL0IsQ0FBQztzQkFDYSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NqRVIsQ0FBVTs7OztBQUM1QixLQUFJLFlBQVksR0FBRyxtQkFBTyxDQUFDLEVBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQzs7QUFFbEQsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQzlDLFFBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDNUIsTUFBRyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDakIsU0FBSSxRQUFRLEVBQUU7QUFDWixjQUFPLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztNQUN6QyxNQUFNO0FBQ0wsV0FBSSxLQUFLLElBQUksbUJBQU0sU0FBUyxFQUFFO0FBQzVCLGdCQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQ25GLE1BQU07QUFDTCxnQkFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQztRQUNuRjtNQUNGO0lBQ0YsQ0FBQyxDQUFDOztBQUVILFVBQU8sR0FBRyxDQUFDO0VBQ1o7O0tBRVksWUFBWTthQUFaLFlBQVk7O0FBQ1osWUFEQSxZQUFZLENBQ1gsSUFBSSxFQUFFOzJCQURQLFlBQVk7O0FBRXJCLGdDQUZTLFlBQVksNkNBRWYsSUFBSSxFQUFFO0FBQ1osU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEI7O2dCQUpVLFlBQVk7O1lBTWhCLGlCQUFDLElBQUksRUFBRTtBQUNaLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQzNCOzs7WUFFSSxpQkFBRztBQUNOLFdBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO01BQ2xCOzs7WUFFTSxtQkFBRztBQUNSLGNBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztNQUNsQjs7O1VBaEJVLFlBQVk7SUFBUyxZQUFZOzs7O0tBbUJqQyxjQUFjO0FBRWQsWUFGQSxjQUFjLENBRWIsSUFBSSxFQUFFOzJCQUZQLGNBQWM7O0FBR3ZCLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDL0IsU0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUM5QixTQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNyQjs7Z0JBZlUsY0FBYzs7WUFpQmpCLGtCQUFDLEtBQUssRUFBRTtBQUNkLFdBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUMvQixXQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUMzQyxXQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDL0IsV0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzNCLFdBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7TUFDbEQ7OztZQUVNLGlCQUFDLElBQUksRUFBRTtBQUNaLFdBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pELGFBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQ7QUFDRCxXQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDaEIsYUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZEO01BQ0Y7OztZQUVVLHVCQUFHO0FBQ1osY0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO01BQ3JCOzs7WUFFZ0IsMkJBQUMsZUFBZSxFQUFFO0FBQ2pDLFdBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO01BQ2pDOzs7WUFFaUIsOEJBQUc7QUFDbkIsY0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3RCOzs7WUFFb0IsaUNBQUc7QUFDdEIsV0FBSSxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDdkI7OztZQUVnQiw2QkFBRzs7O0FBQ2xCLFdBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUMvQyxXQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztBQUN2QixhQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixhQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLGFBQUcsRUFBSTtBQUMzQyxlQUFJLE1BQU0sR0FBRyxNQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBQztvQkFBSSxHQUFHLENBQUMsTUFBSyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQUEsQ0FBQztBQUM5RCxrQkFBTyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztVQUNyRCxDQUFDLENBQUM7UUFDSixNQUFNO0FBQ0wsYUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekI7TUFDRjs7O1lBRUcsY0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO0FBQ3JCLFdBQUksQ0FBQyxPQUFPLEdBQUc7QUFDYixjQUFLLEVBQUUsS0FBSztBQUNaLGtCQUFTLEVBQUUsU0FBUztRQUNyQixDQUFDOztBQUVGLFdBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQsV0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7O1dBRWxDLFFBQVEsR0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFyQyxRQUFROztBQUNoQix5QkFBa0IsR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFM0UsY0FBTyxJQUFJLENBQUM7TUFDYjs7O1lBRUcsY0FBQyxLQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3RCLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEtBQUksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLFdBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRCxjQUFPLElBQUksQ0FBQztNQUNiOzs7WUFFRyxjQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO0FBQ2hDLFdBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQsV0FBSSxXQUFXLGFBQUM7QUFDaEIsV0FBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUMxQiwyQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakQsb0JBQVcsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsTUFBTTtBQUNMLDJCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUN0RSxvQkFBVyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRjtBQUNELFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUMvQixlQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO0FBQ3RDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ3pCO1VBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULGFBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekQsYUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RDtBQUNELGNBQU8sSUFBSSxDQUFDO01BQ2I7OztZQUVTLG9CQUFDLE1BQU0sRUFBRTtBQUNqQixXQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtBQUNyRSxlQUFNLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQXdCLENBQUM7UUFDaEQ7QUFDRCxXQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3RELHlCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUN4QyxhQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN0RSxpQkFBTSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO1VBQ3ZFO1FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULGNBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIseUJBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLFdBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixhQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQjtNQUNGOzs7WUFFRSxhQUFDLE1BQU0sRUFBRTtBQUNWLFdBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQ3JFLGVBQU0sSUFBSSxDQUFDLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQztRQUNoRDtBQUNELFdBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQseUJBQWtCLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3hDLGFBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ3RFLGlCQUFNLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7VUFDdkU7UUFDRixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULHlCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQyxXQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDbkIsYUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEI7TUFDRjs7O1lBRUssZ0JBQUMsTUFBTSxFQUFFO0FBQ2IsV0FBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN0RCxXQUFJLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEQsZ0JBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakQsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFVCxXQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDbkIsYUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUMxQyxrQkFBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztVQUNqRCxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsYUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDNUIsTUFBTTtBQUNMLGFBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3BCO01BQ0Y7OztZQUVLLGdCQUFDLFNBQVMsRUFBRTs7O0FBQ2hCLFdBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ3RDLGFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLGFBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLGFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU07QUFDTCxhQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixhQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLGFBQUcsRUFBSTtBQUMzQyxlQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsZUFBSSxTQUFTLGFBQUM7QUFDZCxnQkFBSyxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUU7QUFDekIsaUJBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFekIscUJBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7QUFDekIsb0JBQUssbUJBQU0sV0FBVyxDQUFDLE1BQU07QUFDN0I7QUFDRSw0QkFBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3hDLHlCQUFNO2tCQUNQO0FBQ0Qsb0JBQUssbUJBQU0sV0FBVyxDQUFDLE1BQU07QUFDN0I7QUFDRSw0QkFBUyxHQUFJLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLEdBQ2pELFNBQVMsR0FDUixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssUUFBUSxHQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMzRyx5QkFBTTtrQkFDUDtBQUNEO0FBQVM7QUFDUCw0QkFBUyxHQUFJLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLEdBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ25ILHVCQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7O0FBRTNCLDhCQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMxQztBQUNELHlCQUFNO2tCQUNQO0FBQUEsY0FDRjs7QUFFRCxpQkFBSSxPQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTttQ0FDK0IsT0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDO21CQUEvRCxNQUFNLGlCQUFOLE1BQU07bUJBQUUsZUFBZSxpQkFBZixlQUFlO21CQUFFLGVBQWUsaUJBQWYsZUFBZTs7QUFDaEQsbUJBQUcsZUFBZSxJQUFJLE1BQU0sRUFBRTtBQUM1QiwwQkFBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNwRDtjQUNGOztBQUVELHFCQUFRLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJO0FBQ3pCLG9CQUFLLG1CQUFNLFdBQVcsQ0FBQyxNQUFNO0FBQzdCO0FBQ0Usd0JBQUssR0FBRyxPQUFLLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakYseUJBQU07a0JBQ1A7QUFDRCxvQkFBSyxtQkFBTSxXQUFXLENBQUMsSUFBSTtBQUMzQjtBQUNFLHdCQUFLLEdBQUcsT0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLHlCQUFNO2tCQUNQO0FBQ0Qsb0JBQUssbUJBQU0sV0FBVyxDQUFDLE1BQU07QUFDN0I7QUFDRSx3QkFBSyxHQUFHLE9BQUssWUFBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RFLHlCQUFNO2tCQUNQO0FBQ0Q7QUFBUztBQUNQLHdCQUFLLEdBQUcsT0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLHlCQUFNO2tCQUNQO0FBQUEsY0FDRjtBQUNELGlCQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1YscUJBQU07Y0FDUDtZQUNGO0FBQ0Qsa0JBQU8sS0FBSyxDQUFDO1VBQ2QsQ0FBQyxDQUFDO0FBQ0gsYUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDeEI7TUFDRjs7O1lBRVcsc0JBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7QUFDN0MsV0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGVBQVEsVUFBVTtBQUNoQixjQUFLLEdBQUc7QUFDUjtBQUNFLGlCQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUU7QUFDMUIsb0JBQUssR0FBRyxLQUFLLENBQUM7Y0FDZjtBQUNELG1CQUFNO1lBQ1A7QUFDRCxjQUFLLEdBQUc7QUFDUjtBQUNFLGlCQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUU7QUFDMUIsb0JBQUssR0FBRyxLQUFLLENBQUM7Y0FDZjtBQUNELG1CQUFNO1lBQ1A7QUFDRCxjQUFLLElBQUk7QUFDVDtBQUNFLGlCQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUU7QUFDekIsb0JBQUssR0FBRyxLQUFLLENBQUM7Y0FDZjtBQUNELG1CQUFNO1lBQ1A7QUFDRCxjQUFLLEdBQUc7QUFDUjtBQUNFLGlCQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUU7QUFDMUIsb0JBQUssR0FBRyxLQUFLLENBQUM7Y0FDZjtBQUNELG1CQUFNO1lBQ1A7QUFDRCxjQUFLLElBQUk7QUFDVDtBQUNFLGlCQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUU7QUFDekIsb0JBQUssR0FBRyxLQUFLLENBQUM7Y0FDZjtBQUNELG1CQUFNO1lBQ1A7QUFDRCxjQUFLLElBQUk7QUFDVDtBQUNFLGlCQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUU7QUFDMUIsb0JBQUssR0FBRyxLQUFLLENBQUM7Y0FDZjtBQUNELG1CQUFNO1lBQ1A7QUFDRDtBQUNBO0FBQ0Usb0JBQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztBQUM3RCxtQkFBTTtZQUNQO0FBQUEsUUFDRjtBQUNELGNBQU8sS0FBSyxDQUFDO01BQ2Q7OztZQUVTLG9CQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDL0IsY0FBUSxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUM5QyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUM1QyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFFO01BQ3pEOzs7WUFFVyxzQkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRTtBQUMvQyxXQUFJLFlBQVksSUFBSSxJQUFJLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO0FBQzVELGdCQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFFOztBQUVELGNBQU8sVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztNQUN6Qzs7O1lBRVMsb0JBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUMvQixXQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDL0QsZ0JBQU8sS0FBSyxDQUFDO1FBQ2Q7O0FBRUQsY0FBTyxJQUFJLENBQUM7TUFDYjs7Ozs7Ozs7WUFNSyxnQkFBQyxVQUFVLEVBQUU7OztBQUNqQixXQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7QUFDNUIsYUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsYUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsYUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDeEIsTUFBTTs7QUFDTCxrQkFBSyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLGVBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQzs7QUFFekIsZUFBSSxPQUFLLGlCQUFpQixFQUFFO0FBQzFCLDRCQUFlLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxNQUFNO0FBQ0wsNEJBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEM7O0FBRUQsa0JBQUssWUFBWSxHQUFHLE9BQUssSUFBSSxDQUFDLE1BQU0sQ0FBRSxhQUFHLEVBQUk7QUFDM0MsaUJBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsaUJBQUksS0FBSyxHQUFHLEtBQUssQ0FBQzs7OztBQUlsQixrQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3RCxtQkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLG1CQUFJLE9BQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtzQ0FDdUMsT0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDO3FCQUFuRixNQUFNLGtCQUFOLE1BQU07cUJBQUUsZUFBZSxrQkFBZixlQUFlO3FCQUFFLGVBQWUsa0JBQWYsZUFBZTtxQkFBRSxVQUFVLGtCQUFWLFVBQVU7cUJBQUUsTUFBTSxrQkFBTixNQUFNOztBQUNwRSxxQkFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLHFCQUFJLFVBQVUsRUFBRTtBQUNkLHVCQUFJLGVBQWUsSUFBSSxNQUFNLEVBQUU7QUFDN0IsOEJBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDckQ7QUFDRCx3QkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4RSx5QkFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25ELHlCQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDaEUsNEJBQUssR0FBRyxJQUFJLENBQUM7QUFDYiw2QkFBTTtzQkFDUDtvQkFDRjtrQkFDRjtnQkFDRjtjQUNGO0FBQ0Qsb0JBQU8sS0FBSyxDQUFDO1lBQ2QsQ0FBQyxDQUFDO0FBQ0gsa0JBQUssVUFBVSxHQUFHLElBQUksQ0FBQzs7UUFDeEI7TUFDRjs7O1lBRXdCLHFDQUFHO0FBQzFCLFdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3pDLGNBQU8sS0FBSyxDQUFDO01BQ2Q7OztZQUVFLGVBQUc7QUFDSixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7QUFFekMsV0FBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQzs7QUFFcEMsV0FBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3pDLGdCQUFPLEtBQUssQ0FBQztRQUNkLE1BQU07QUFDTCxhQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsY0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0QsaUJBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsZUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUMsTUFBTTtVQUNqQztBQUNELGdCQUFPLE1BQU0sQ0FBQztRQUNmO01BQ0Y7OztZQUVVLHVCQUFHO0FBQ1osY0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3RCOzs7WUFFUyxzQkFBRztBQUNYLGNBQU8sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO01BQzVDOzs7WUFFWSx5QkFBRztBQUNkLGNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztNQUM5RDs7O1lBRVcsd0JBQUc7QUFDYixjQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ2xDLGdCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNWOzs7VUE3WVUsY0FBYzs7Ozs7QUFnWjNCLEU7Ozs7OztBQ3ZiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxxQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDelNBLEtBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQy9CLE9BQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBYSxDQUFDLENBQUM7QUFDdkMsT0FBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU07RUFDOUI7O0FBRUQsVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUM1QixPQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsT0FBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxPQUFPLFVBQVUsQ0FBQzs7QUFFekMsYUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSTs7QUFFbkMsT0FBSSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUNyQixTQUFJLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFLENBQUMsRUFBRTtBQUN4QixXQUFJLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLEdBQUksR0FBRyxHQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLEdBQUksRUFBRSxDQUFDO0FBQ3JFLGlCQUFVLElBQUksSUFBSSxDQUFDO0FBQ25CLFdBQUksQ0FBQyxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUNuQixVQUFVLElBQUksR0FBRyxDQUFDO01BQ3JCLENBQUMsQ0FBQzs7QUFFSCxlQUFVLElBQUksSUFBSSxDQUFDO0lBQ3BCLENBQUMsQ0FBQzs7QUFFSCxVQUFPLFVBQVUsQ0FBQztFQUNuQixDQUFDOztBQUVGLEtBQUksU0FBUyxHQUFHLFNBQVosU0FBUyxDQUFZLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzdDLE9BQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEMsT0FBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDakMsV0FBTSxDQUFFLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxpQkFBaUIsQ0FBRSxDQUFDO0lBQ3JHO0VBRUYsQ0FBQzs7c0JBRWEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQnhCLEtBQUksTUFBTSxHQUFHLE1BQU0sSUFBSyxXQUFTLElBQUksRUFBRTtBQUN0QyxjQUFZLENBQUM7O0FBRWIsTUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDakYsVUFBTztHQUNQO0FBQ0QsTUFDRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVE7OztBQUVuQixTQUFPLEdBQUcsU0FBVixPQUFPLEdBQWM7QUFDdEIsVUFBTyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO0dBQzFDO01BQ0MsU0FBUyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDO01BQ3BFLGlCQUFpQixJQUFHLFVBQVUsSUFBSSxTQUFTO01BQzNDLEtBQUssR0FBRyxTQUFSLEtBQUssQ0FBWSxJQUFJLEVBQUU7QUFDeEIsT0FBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsT0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQjtNQUNDLFNBQVMsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztNQUNoRSxhQUFhLEdBQUcsSUFBSSxDQUFDLHVCQUF1QjtNQUM1QyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsb0JBQW9CO01BQzdFLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQVksRUFBRSxFQUFFO0FBQzlCLElBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVc7QUFDakQsVUFBTSxFQUFFLENBQUM7SUFDVCxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ047TUFDQyxtQkFBbUIsR0FBRywwQkFBMEI7TUFDaEQsV0FBVyxHQUFHLENBQUM7Ozs7O0FBSWYsMEJBQXdCLEdBQUcsR0FBRzs7QUFDOUIsUUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFZLElBQUksRUFBRTtBQUN6QixPQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sR0FBYztBQUN4QixRQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTs7QUFDN0IsWUFBTyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDLE1BQU07O0FBQ04sU0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Q7SUFDRCxDQUFDO0FBQ0YsT0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2hCLFdBQU8sRUFBRSxDQUFDO0lBQ1YsTUFBTTtBQUNOLGNBQVUsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUM5QztHQUNEO01BQ0MsUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO0FBQ3BELGNBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLE9BQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7QUFDM0IsVUFBTyxDQUFDLEVBQUUsRUFBRTtBQUNYLFFBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEQsUUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDbkMsU0FBSTtBQUNILGNBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxTQUFTLENBQUMsQ0FBQztNQUM3QyxDQUFDLE9BQU8sRUFBRSxFQUFFO0FBQ1osbUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUNsQjtLQUNEO0lBQ0Q7R0FDRDtNQUNDLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBWSxJQUFJLEVBQUU7O0FBRTNCLE9BQUksNEVBQTRFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNqRyxXQUFPLElBQUksSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3JEO0FBQ0QsVUFBTyxJQUFJLENBQUM7R0FDWjtNQUNDLFNBQVMsR0FBRyxTQUFaLFNBQVMsQ0FBWSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUMvQyxPQUFJLENBQUMsV0FBVyxFQUFFO0FBQ2pCLFFBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEI7O0FBRUQsT0FDRyxTQUFTLEdBQUcsSUFBSTtPQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7T0FDaEIsWUFBWSxHQUFHLEtBQUs7T0FDcEIsVUFBVTtPQUNWLFdBQVc7T0FDWCxZQUFZLEdBQUcsU0FBZixZQUFZLEdBQWM7QUFDM0IsWUFBUSxDQUFDLFNBQVMsRUFBRSxvQ0FBb0MsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRTs7O0FBRUMsV0FBUSxHQUFHLFNBQVgsUUFBUSxHQUFjO0FBQ3ZCLFFBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLEVBQUU7O0FBRWxFLFNBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFDOUIsV0FBTSxDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQzdCLFVBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDL0IsaUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2pHLGVBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUN0QyxrQkFBWSxFQUFFLENBQUM7TUFDZixDQUFDO0FBQ0YsV0FBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixjQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDdEMsWUFBTztLQUNQOztBQUVELFFBQUksWUFBWSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2hDLGVBQVUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0M7QUFDRCxRQUFJLFdBQVcsRUFBRTtBQUNoQixnQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0tBQ3ZDLE1BQU07QUFDTixTQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFJLE9BQU8sSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFOztBQUV0QyxVQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVO01BQy9CO0tBQ0Q7QUFDRCxhQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDdEMsZ0JBQVksRUFBRSxDQUFDO0FBQ2YsVUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25CO09BQ0MsU0FBUyxHQUFHLFNBQVosU0FBUyxDQUFZLElBQUksRUFBRTtBQUM1QixXQUFPLFlBQVc7QUFDakIsU0FBSSxTQUFTLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDNUMsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztNQUNuQztLQUNELENBQUM7SUFDRjtPQUNDLG1CQUFtQixHQUFHLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDO09BQ3RELEtBQUssQ0FDUDtBQUNELFlBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUN0QyxPQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1YsUUFBSSxHQUFHLFVBQVUsQ0FBQztJQUNsQjtBQUNELE9BQUksaUJBQWlCLEVBQUU7QUFDdEIsY0FBVSxHQUFHLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxhQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUM1QixhQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUMxQixjQUFVLENBQUMsWUFBVztBQUNyQixVQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakIsaUJBQVksRUFBRSxDQUFDO0FBQ2YsV0FBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25CLGNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztLQUN0QyxDQUFDLENBQUM7QUFDSCxXQUFPO0lBQ1A7Ozs7OztBQU1ELE9BQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLG1CQUFtQixFQUFFO0FBQ3hELFNBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDdkMsUUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDM0QsZ0JBQVksR0FBRyxJQUFJLENBQUM7SUFDcEI7Ozs7QUFJRCxPQUFJLGFBQWEsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO0FBQ3pDLFFBQUksSUFBSSxXQUFXLENBQUM7SUFDcEI7QUFDRCxPQUFJLElBQUksS0FBSyxtQkFBbUIsSUFBSSxhQUFhLEVBQUU7QUFDbEQsZUFBVyxHQUFHLElBQUksQ0FBQztJQUNuQjtBQUNELE9BQUksQ0FBQyxNQUFNLEVBQUU7QUFDWixZQUFRLEVBQUUsQ0FBQztBQUNYLFdBQU87SUFDUDtBQUNELGNBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3pCLFNBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsVUFBUyxFQUFFLEVBQUU7QUFDMUQsTUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUMxRSxTQUFJLElBQUksR0FBRyxTQUFQLElBQUksR0FBYztBQUNyQixTQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxTQUFTLENBQUMsVUFBUyxJQUFJLEVBQUU7QUFDL0QsV0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDNUMsY0FBTSxDQUFDLFVBQVUsR0FBRyxVQUFTLEtBQUssRUFBRTtBQUNuQyxvQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3pDLGtCQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDdEMsaUJBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLGVBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNiLENBQUM7QUFDRixjQUFNLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDM0IsYUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN6QixhQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUNuQyxrQkFBUSxFQUFFLENBQUM7VUFDWDtTQUNELENBQUM7QUFDRix5Q0FBaUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ3BFLGVBQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLGlCQUFTLENBQUMsS0FBSyxHQUFHLFlBQVc7QUFDNUIsZUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2Ysa0JBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztTQUN0QyxDQUFDO0FBQ0YsaUJBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN6QyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7T0FDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7TUFDZCxDQUFDO0FBQ0YsUUFBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLEVBQUUsU0FBUyxDQUFDLFVBQVMsSUFBSSxFQUFFOztBQUUzRCxVQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDZCxVQUFJLEVBQUUsQ0FBQztNQUNQLENBQUMsRUFBRSxTQUFTLENBQUMsVUFBUyxFQUFFLEVBQUU7QUFDMUIsVUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUU7QUFDakMsV0FBSSxFQUFFLENBQUM7T0FDUCxNQUFNO0FBQ04sZUFBUSxFQUFFLENBQUM7T0FDWDtNQUNELENBQUMsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQ2Q7TUFDQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVM7TUFDOUIsTUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFZLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQzVDLFVBQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztHQUM5QyxDQUNEOztBQUVELE1BQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNuRSxVQUFPLFVBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7QUFDeEMsUUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNqQixTQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0FBQ0QsV0FBTyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQztJQUM1RCxDQUFDO0dBQ0Y7O0FBRUQsVUFBUSxDQUFDLEtBQUssR0FBRyxZQUFXO0FBQzNCLE9BQUksU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixZQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDdEMsV0FBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztHQUM3QixDQUFDO0FBQ0YsVUFBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUN4QyxVQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNyQixVQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzs7QUFFbEIsVUFBUSxDQUFDLEtBQUssR0FDZCxRQUFRLENBQUMsWUFBWSxHQUNyQixRQUFRLENBQUMsVUFBVSxHQUNuQixRQUFRLENBQUMsT0FBTyxHQUNoQixRQUFRLENBQUMsT0FBTyxHQUNoQixRQUFRLENBQUMsT0FBTyxHQUNoQixRQUFRLENBQUMsVUFBVSxHQUNsQixJQUFJLENBQUM7O0FBRU4sU0FBTyxNQUFNLENBQUM7RUFDZCxFQUNHLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLElBQ25DLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLElBQ3ZDLFVBQUssT0FBTyxDQUNkLENBQUM7Ozs7O0FBS0gsS0FBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUNuRCxRQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7RUFDaEMsTUFBTSxJQUFLLFVBQWEsS0FBSyxXQUFXLElBQUksdUJBQU0sS0FBSyxJQUFJLElBQU0sdUJBQVUsSUFBSSxJQUFLLEVBQUU7QUFDckYsbUNBQU8sRUFBRSxrQ0FBRSxZQUFXO0FBQ3BCLFVBQU8sTUFBTSxDQUFDO0dBQ2YsK0lBQUMsQ0FBQzs7Ozs7OztBQzVRTCw4QkFBNkIsbURBQW1EOzs7Ozs7O0FDQWhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDQWtCLENBQVM7Ozs7QUFDM0IsS0FBSSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFRLENBQUMsQ0FBQyxZQUFZLENBQUM7O0tBRXJDLE1BQU07ZUFBTixNQUFNOztBQUNKLGNBREYsTUFBTSxDQUNILElBQUksRUFBRTsrQkFEVCxNQUFNOztBQUVYLG9DQUZLLE1BQU0sNkNBRUwsSUFBSSxFQUFFO0FBQ1osYUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7TUFDM0I7O2tCQUpRLE1BQU07O2dCQU1ILHNCQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQ2pDLGlCQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksbUJBQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQzs7QUFFcEQsaUJBQUksS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7O0FBRTVDLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsc0JBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO0FBQ3BCLHlCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7QUFDcEMsaUNBQVEsR0FBRyxLQUFLLENBQUM7QUFDakIsK0JBQU07c0JBQ1Q7a0JBQ0o7O0FBRUEseUJBQVEsR0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLEdBQUcsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2NBQ3hILE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQ3RDLHdCQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Y0FDeEMsTUFBTTtBQUNILHFCQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7Y0FDM0U7QUFDRCxpQkFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7VUFDbkQ7OztZQTFCUSxNQUFNO0lBQVMsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDSHRCLENBQU87Ozs7dUNBQ0osQ0FBWTs7OztrQ0FDZixDQUFTOzs7O2lDQUNWLENBQVE7Ozs7d0NBQ0YsRUFBZ0I7Ozs7d0NBQ2hCLEVBQWdCOzs7OzBDQUNkLEVBQWtCOzs7OzBDQUNsQixFQUFrQjs7OztLQUVyQyxpQkFBaUI7YUFBakIsaUJBQWlCOztBQUVWLFlBRlAsaUJBQWlCLENBRVQsS0FBSyxFQUFFOzJCQUZmLGlCQUFpQjs7QUFHbkIsZ0NBSEUsaUJBQWlCLDZDQUdiLEtBQUssRUFBRTtBQUNiLFNBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQ7O2dCQUxHLGlCQUFpQjs7WUFPSiwyQkFBQyxDQUFDLEVBQUM7QUFDbEIsV0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLE9BQU87QUFDL0IsV0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksbUJBQU0sU0FBUyxHQUFDLG1CQUFNLFFBQVEsR0FBQyxtQkFBTSxTQUFTLENBQUM7QUFDOUUsV0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7TUFDaEQ7OztZQUVXLHNCQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDeEIsV0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDM0U7OztZQUVTLHNCQUFHO0FBQ1gsZUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJO0FBQzVCLGNBQUssbUJBQU0sV0FBVyxDQUFDLElBQUk7QUFBRTtBQUMzQixvQkFBTyx3RUFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxFQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBYSxJQUFHLENBQUM7WUFDakg7QUFDRCxjQUFLLG1CQUFNLFdBQVcsQ0FBQyxNQUFNO0FBQUU7QUFDN0Isb0JBQU8sMEVBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsRUFBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQWEsSUFBRyxDQUFDO1lBQ25IO0FBQ0QsY0FBSyxtQkFBTSxXQUFXLENBQUMsTUFBTTtBQUFFO0FBQzdCLG9CQUFPLDBFQUFrQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLEVBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFhLElBQUcsQ0FBQztZQUNuSDtBQUNELGNBQUssbUJBQU0sV0FBVyxDQUFDLElBQUk7QUFBRTtBQUMzQixvQkFBTyx3RUFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxFQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBYSxJQUFHLENBQUM7WUFDakg7QUFDRCxjQUFLLG1CQUFNLFdBQVcsQ0FBQyxNQUFNO0FBQUU7QUFDN0Isb0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNsRztBQUFBLFFBQ0Y7TUFDRjs7O1lBRWdCLDZCQUFFO0FBQ2pCLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUNyRTs7O1lBRUssa0JBQUU7QUFDTixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBRyxJQUFJLEdBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUMsSUFBSSxDQUFDO0FBQ3BFLFdBQUksT0FBTyxHQUFHO0FBQ1osa0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDL0IsZ0JBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxNQUFNLEdBQUMsSUFBSTtBQUN0QyxjQUFLLEVBQUUsS0FBSztBQUNaLGlCQUFRLEVBQUUsS0FBSztRQUNoQixDQUFDOztBQUVGLFdBQU0sWUFBWSxHQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUksSUFBSSxHQUNoRDs7V0FBTSxTQUFTLEVBQUMsT0FBTztTQUNyQjs7YUFBTSxTQUFTLEVBQUMsVUFBVTtXQUN4QiwyQ0FBTSxTQUFTLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQVE7VUFDN0U7U0FDUDs7YUFBTSxTQUFTLEVBQUMsUUFBUTtXQUN0QiwyQ0FBTSxTQUFTLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFRO1VBQ3BFO1FBRVYsQ0FBQztBQUNGLFdBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGtCQUFLLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDOztBQUU5RixXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUMsYUFBYSxHQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLGNBQ0U7O1dBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUUsT0FBUSxFQUFDLEtBQUssRUFBRSxPQUFRO1NBQ3REOzthQUFLLEdBQUcsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLDhCQUE4QjtBQUMxRCxvQkFBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFO1dBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtXQUFFLFNBQVM7VUFDM0I7U0FDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSTtRQUMxQyxDQUNOO01BQ0Y7OztVQXhFRyxpQkFBaUI7SUFBUyxtQkFBTSxTQUFTOztBQTJFL0MsS0FBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQUssSUFBSSxHQUFHLElBQUksbUJBQU0sV0FBVyxFQUFFO0FBQ2pDLGtCQUFlLENBQUMsSUFBSSxDQUFDLG1CQUFNLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzlDOztBQUVELGtCQUFpQixDQUFDLFNBQVMsR0FBRztBQUM1QixZQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMsWUFBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixTQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsYUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFFBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMzQixXQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEdBQUc7QUFDN0IsU0FBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLGFBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxZQUFTLEVBQUMsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsUUFBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLFdBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixrQkFBZSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxHQUFHO0FBQ3BDLGtCQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDckMsT0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzVCLGtCQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEdBQUc7QUFDcEMsU0FBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDNUIsU0FBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO0FBQzVDLFVBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixZQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUNqQyxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUN0Qix3QkFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUM7TUFDNUMsQ0FBQztBQUNOLHNCQUFpQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNsRSxZQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDL0IsZ0JBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsMkJBQXNCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07SUFDL0MsQ0FBQztFQUNILENBQUM7O0FBRUYsa0JBQWlCLENBQUMsWUFBWSxHQUFHO0FBQy9CLFlBQVMsRUFBRSxNQUFNO0FBQ2pCLFdBQVEsRUFBRSxLQUFLO0FBQ2YsYUFBVSxFQUFFLFNBQVM7QUFDckIsUUFBSyxFQUFFLEtBQUs7QUFDWixXQUFRLEVBQUUsSUFBSTtBQUNkLFNBQU0sRUFBRSxTQUFTO0FBQ2pCLFNBQU0sRUFBRSxLQUFLO0FBQ2IsYUFBVSxFQUFFLElBQUk7QUFDaEIsWUFBUyxFQUFFLEVBQUU7QUFDYixRQUFLLEVBQUUsSUFBSTtBQUNYLFdBQVEsRUFBRSxTQUFTO0FBQ25CLGtCQUFlLEVBQUUsRUFBRTtBQUNuQixrQkFBZSxFQUFFLEtBQUs7QUFDdEIsT0FBSSxFQUFFLFNBQVM7QUFDZixrQkFBZSxFQUFFLFNBQVM7QUFDMUIsU0FBTSxFQUFFLFNBQVM7RUFDbEIsQ0FBQzs7c0JBRWEsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0M1SWQsQ0FBTzs7OztrQ0FDUCxDQUFVOzs7O0tBRXRCLFVBQVU7ZUFBVixVQUFVOztBQUNELGNBRFQsVUFBVSxDQUNBLEtBQUssRUFBRTsrQkFEakIsVUFBVTs7QUFFUixvQ0FGRixVQUFVLDZDQUVGLEtBQUssRUFBRTtBQUNiLGFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDeEM7O2tCQUpDLFVBQVU7O2dCQU1FLDBCQUFHO0FBQ2IsaUJBQUksV0FBVyxHQUFJLEVBQUUsQ0FBQztBQUN0QixpQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTs7QUFFekIscUJBQU0sWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkQsNEJBQVcsR0FBTSxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQUksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBQyxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUcsQ0FBQztjQUNoSjtBQUNELG9CQUFPLFdBQVcsQ0FBQztVQUN0Qjs7O2dCQUVLLGdCQUFDLEtBQUssRUFBRTtBQUNWLGlCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNyQyxpQkFBSSxTQUFTLEVBQUU7QUFDWCxxQkFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsbUJBQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2NBQ3pFLE1BQU07QUFDSCxxQkFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLG1CQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztjQUMxRDtVQUNKOzs7Z0JBRWdCLDZCQUFHO0FBQ2hCLGlCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFDbkQsaUJBQUksU0FBUyxFQUFFO0FBQ1gscUJBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLG1CQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztjQUN6RTtVQUNKOzs7Z0JBRUssa0JBQUc7QUFDTCxvQkFDSSw0Q0FBTyxHQUFHLEVBQUMsV0FBVztBQUNmLDBCQUFTLEVBQUMsaUNBQWlDO0FBQzNDLHFCQUFJLEVBQUMsTUFBTTtBQUNYLHlCQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU87QUFDdEIsNkJBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFHLEdBQUcsQ0FDaEQ7VUFDTDs7O1lBeENDLFVBQVU7SUFBUyxtQkFBTSxTQUFTOztBQXlDdkMsRUFBQzs7QUFFRixXQUFVLENBQUMsU0FBUyxHQUFHO0FBQ25CLGtCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzlDLGlCQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDcEMsZUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0VBQ3JDLENBQUM7O3NCQUVhLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ3BEUCxDQUFPOzs7O2tDQUNQLENBQVU7Ozs7S0FFdEIsVUFBVTtZQUFWLFVBQVU7O0FBQ0osV0FETixVQUFVLENBQ0gsS0FBSyxFQUFFO3lCQURkLFVBQVU7O0FBRWQsOEJBRkksVUFBVSw2Q0FFUixLQUFLLEVBQUU7QUFDYixPQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLE9BQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0dBQ3BCOztlQUxJLFVBQVU7O1VBT1QsZ0JBQUMsS0FBSyxFQUFFO0FBQ2IsUUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2pCLGlCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNCO0FBQ0QsUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3ZDLFFBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVc7QUFDcEMsU0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLG1CQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5RCxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckI7OztVQUVnQiw2QkFBRztBQUNuQixRQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtBQUNyQyxTQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsbUJBQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25GO0lBQ0Q7OztVQUVtQixnQ0FBRztBQUN0QixnQkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQjs7O1VBRUssa0JBQUc7QUFDUixXQUNDLDRDQUFPLEdBQUcsRUFBQyxXQUFXO0FBQ2xCLGNBQVMsRUFBQyxpQ0FBaUM7QUFDM0MsU0FBSSxFQUFDLE1BQU07QUFDWCxhQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU87QUFDdEIsZ0JBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsZUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsUUFBTTtBQUMzRSxpQkFBWSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUcsR0FBRyxDQUM3RTtJQUNGOzs7U0FyQ0ksVUFBVTtJQUFTLG1CQUFNLFNBQVM7O0FBc0N2QyxFQUFDOztBQUVGLFdBQVUsQ0FBQyxTQUFTLEdBQUc7QUFDdEIsZUFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUM5QyxjQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDcEMsT0FBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLGFBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxZQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDbEMsQ0FBQzs7QUFFRixXQUFVLENBQUMsWUFBWSxHQUFHO0FBQ3pCLE9BQUssRUFBRSxtQkFBTSxZQUFZO0VBQ3pCOztzQkFFYyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N2RFAsQ0FBTzs7Ozt1Q0FDSixDQUFZOzs7O2tDQUNmLENBQVU7Ozs7S0FFdEIsWUFBWTtZQUFaLFlBQVk7O0FBQ04sV0FETixZQUFZLENBQ0wsS0FBSyxFQUFFO3lCQURkLFlBQVk7O0FBRWhCLDhCQUZJLFlBQVksNkNBRVYsS0FBSyxFQUFFO0FBQ2IsT0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxPQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1oseUJBQXFCLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxJQUN0RCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBRTtJQUNsRSxDQUFDO0dBQ0Y7O2VBUkksWUFBWTs7VUFVWCxnQkFBQyxLQUFLLEVBQUU7QUFDYixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMscUJBQXFCLEVBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRyxFQUFDLENBQUMsQ0FBQztBQUNwRSxRQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxtQkFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkU7OztVQUVTLHNCQUFHO0FBQ1osUUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFFBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ25DLGNBQVUsQ0FBQyxJQUFJLENBQUM7O09BQVEsR0FBRyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsRUFBRTtLQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxnQkFBYyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsUUFBSztLQUFVLENBQUMsQ0FBQztBQUNySCxVQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUNqQyxlQUFVLENBQUMsSUFBSSxDQUFDOztRQUFRLEdBQUcsRUFBRSxHQUFJLEVBQUMsS0FBSyxFQUFFLEdBQUk7TUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDO01BQVUsQ0FBQyxDQUFDO0tBQ3ZFLENBQUMsQ0FBQztBQUNILFdBQU8sVUFBVSxDQUFDO0lBQ2xCOzs7VUFFZ0IsNkJBQUc7QUFDbkIsUUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDaEMsU0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLG1CQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNoRjtJQUNEOzs7VUFFSyxrQkFBRztBQUNSLFFBQUksV0FBVyxHQUFHLDZCQUFTLFFBQVEsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUMvRCxFQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDOztBQUVqRSxXQUNDOztPQUFRLEdBQUcsRUFBQyxhQUFhO0FBQ3ZCLGVBQVMsRUFBRSxXQUFZO0FBQ3ZCLGNBQVEsRUFBRSxJQUFJLENBQUMsTUFBTztBQUN0QixrQkFBWSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFNBQVMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFHO0tBQ3BGLElBQUksQ0FBQyxVQUFVLEVBQUU7S0FDVixDQUNSO0lBQ0Y7OztTQTNDSSxZQUFZO0lBQVMsbUJBQU0sU0FBUzs7QUE0Q3pDLEVBQUM7O0FBRUYsYUFBWSxDQUFDLFNBQVMsR0FBRztBQUN4QixlQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzlDLFNBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDMUMsYUFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ25DLFlBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtFQUNsQyxDQUFDOztzQkFFYSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N6RFQsQ0FBTzs7Ozt1Q0FDSixDQUFZOzs7O2tDQUNmLENBQVU7Ozs7QUFFNUIsS0FBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O0tBRXJELFlBQVk7ZUFBWixZQUFZOztBQUNILGNBRFQsWUFBWSxDQUNGLEtBQUssRUFBRTsrQkFEakIsWUFBWTs7QUFFVixvQ0FGRixZQUFZLDZDQUVKLEtBQUssRUFBRTtBQUNiLGFBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLGdCQUFnQixDQUFDO0FBQzFFLGFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGFBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCxrQ0FBcUIsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxTQUFTLElBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxTQUFTLElBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUc7VUFDcEgsQ0FBQztBQUNGLGFBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckQsYUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0QsYUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDaEU7O2tCQWJDLFlBQVk7O2dCQWVBLHdCQUFDLEtBQUssRUFBRTtBQUNsQixpQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDL0Msd0JBQU87Y0FDVjtBQUNELGlCQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZCw2QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztjQUM5QjtBQUNELGlCQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsaUJBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3ZDLGlCQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxZQUFXO0FBQ2pDLHFCQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFDLEVBQzlGLG1CQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztjQUNqQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7VUFDeEI7OztnQkFFZ0IsMkJBQUMsS0FBSyxFQUFFO0FBQ3JCLGlCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMscUJBQXFCLEVBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRyxFQUFDLENBQUMsQ0FBQztBQUNwRSxpQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDL0Msd0JBQU87Y0FDVjtBQUNELGlCQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUMsRUFDckcsbUJBQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1VBQ2pDOzs7Z0JBRWlCLDRCQUFDLEtBQUssRUFBRTtBQUN0QixpQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3JDLHdCQUFPO2NBQ1Y7QUFDRCxpQkFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxFQUMzRixtQkFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7VUFDakM7OztnQkFFbUIsZ0NBQUc7QUFDbkIsaUJBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNwQix1QkFBVSxDQUFDLElBQUksQ0FBQyw2Q0FBUSxHQUFHLEVBQUMsSUFBSSxHQUFVLENBQUMsQ0FBQztBQUM1QyxrQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEQsMkJBQVUsQ0FBQyxJQUFJLENBQUM7O3VCQUFRLEdBQUcsRUFBRSxDQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUU7cUJBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztrQkFBVSxDQUFDLENBQUM7Y0FDM0csQ0FBQztBQUNGLG9CQUFPLFVBQVUsQ0FBQztVQUNyQjs7O2dCQUVlLDRCQUFHO0FBQ2YsaUJBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNwQixpQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7O0FBRW5DLHVCQUFVLENBQUMsSUFBSSxDQUFDOzttQkFBUSxHQUFHLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxFQUFFO2lCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxnQkFBYyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsUUFBSztjQUFVLENBQUMsQ0FBQztBQUNySCxrQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsMkJBQVUsQ0FBQyxJQUFJLENBQUM7O3VCQUFRLEdBQUcsRUFBRSxDQUFFLEVBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUU7cUJBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztrQkFBVSxDQUFDLENBQUM7Y0FDN0UsQ0FBQztBQUNGLG9CQUFPLFVBQVUsQ0FBQztVQUNyQjs7O2dCQUVnQiw2QkFBRztBQUNoQixpQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDeEUscUJBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7QUFDMUQsK0JBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBQyxFQUNuRCxtQkFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Y0FDakM7VUFDSjs7O2dCQUVtQixnQ0FBRztBQUNuQix5QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztVQUM5Qjs7O2dCQUVLLGtCQUFHO0FBQ0wsaUJBQUksV0FBVyxHQUFHLDZCQUFTLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxjQUFjLEVBQzdELEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7O0FBRWxGLG9CQUNJOzttQkFBSyxTQUFTLEVBQUMsc0JBQXNCO2lCQUNqQzs7dUJBQVEsR0FBRyxFQUFDLHdCQUF3QjtBQUM1QixrQ0FBUyxFQUFDLHVDQUF1QztBQUNqRCxpQ0FBUSxFQUFFLElBQUksQ0FBQyxrQkFBbUI7QUFDbEMscUNBQVksRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsRUFBRztxQkFDckYsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2tCQUN2QjtpQkFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBSTs7dUJBQVEsR0FBRyxFQUFDLGNBQWM7QUFDbEIsa0NBQVMsRUFBRSxXQUFZO0FBQ3ZCLGlDQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFrQjtBQUNqQyxxQ0FBWSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQzlCLEVBQUc7cUJBQ1YsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2tCQUNuQixHQUVULDRDQUFPLEdBQUcsRUFBQyxjQUFjO0FBQ2xCLHlCQUFJLEVBQUMsUUFBUTtBQUNiLDhCQUFTLEVBQUMsa0NBQWtDO0FBQzVDLGdDQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLGVBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLFFBQU07QUFDM0UsNkJBQVEsRUFBRSxJQUFJLENBQUMsY0FBZTtBQUM5QixpQ0FBWSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQzlCLEVBQUcsR0FBRztjQUN4QyxDQUNSO1VBQ0w7OztZQTlHQyxZQUFZO0lBQVMsbUJBQU0sU0FBUzs7QUErR3pDLEVBQUM7O0FBRUYsYUFBWSxDQUFDLFNBQVMsR0FBRztBQUNyQixrQkFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUM5QyxZQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ3hELGlCQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNoQyxlQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDOUIsbUJBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO01BQ3RELENBQUM7QUFDRixVQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDN0Isc0JBQWlCLEVBQUUsMkJBQVMsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUN6QyxhQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2xCLG9CQUFPO1VBQ1Y7QUFDRCxjQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxpQkFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDOUIsa0JBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUMscUJBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzVDLHNDQUFpQixHQUFHLElBQUksQ0FBQztBQUN6QiwyQkFBTTtrQkFDVDtjQUNKO0FBQ0QsaUJBQUksQ0FBQyxpQkFBaUIsRUFBRTtBQUNwQix3QkFBTyxJQUFJLEtBQUssNERBQTBELGdCQUFnQixDQUFHLENBQUM7Y0FDakc7VUFDSjtNQUNKO0FBQ0QsZ0JBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDckMsQ0FBQzs7QUFFRixhQUFZLENBQUMsWUFBWSxHQUFHO0FBQ3hCLFVBQUssRUFBRSxtQkFBTSxZQUFZO0VBQzVCLENBQUM7O3NCQUVhLFlBQVkiLCJmaWxlIjoicmVhY3QtYm9vdHN0cmFwLXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RCb290c3RyYXBUYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEJvb3RzdHJhcFRhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJSZWFjdERPTVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDEzOTZhOTNlOGU1YzY1ZjE0NDE0XG4gKiovIiwiaW1wb3J0IEJvb3RzdHJhcFRhYmxlIGZyb20gJy4vQm9vdHN0cmFwVGFibGUnO1xuaW1wb3J0IFRhYmxlSGVhZGVyQ29sdW1uIGZyb20gJy4vVGFibGVIZWFkZXJDb2x1bW4nO1xuaW1wb3J0IHtUYWJsZURhdGFTZXR9IGZyb20gJy4vc3RvcmUvVGFibGVEYXRhU3RvcmUnO1xuXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG4gIHdpbmRvdy5Cb290c3RyYXBUYWJsZSA9IEJvb3RzdHJhcFRhYmxlO1xuICB3aW5kb3cuVGFibGVIZWFkZXJDb2x1bW4gPSBUYWJsZUhlYWRlckNvbHVtbjtcbiAgd2luZG93LlRhYmxlRGF0YVNldCA9IFRhYmxlRGF0YVNldDtcbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQm9vdHN0cmFwVGFibGUsXG4gIFRhYmxlSGVhZGVyQ29sdW1uLFxuICBUYWJsZURhdGFTZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVGFibGVIZWFkZXIgZnJvbSAnLi9UYWJsZUhlYWRlcic7XG5pbXBvcnQgVGFibGVCb2R5IGZyb20gJy4vVGFibGVCb2R5JztcbmltcG9ydCBQYWdpbmF0aW9uTGlzdCBmcm9tICcuL3BhZ2luYXRpb24vUGFnaW5hdGlvbkxpc3QnO1xuaW1wb3J0IFRvb2xCYXIgZnJvbSAnLi90b29sYmFyL1Rvb2xCYXInO1xuaW1wb3J0IFRhYmxlRmlsdGVyIGZyb20gJy4vVGFibGVGaWx0ZXInO1xuaW1wb3J0IHtUYWJsZURhdGFTdG9yZX0gZnJvbSAnLi9zdG9yZS9UYWJsZURhdGFTdG9yZSc7XG5pbXBvcnQgZXhwb3J0Q1NWIGZyb20gJy4vY3N2X2V4cG9ydF91dGlsJztcbmltcG9ydCB7RmlsdGVyfSBmcm9tICcuL0ZpbHRlcic7XG5cbmNsYXNzIEJvb3RzdHJhcFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuX2F0dGFjaENlbGxFZGl0RnVuYygpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZGF0YSkpIHtcbiAgICAgIHRoaXMuc3RvcmUgPSBuZXcgVGFibGVEYXRhU3RvcmUodGhpcy5wcm9wcy5kYXRhLmdldERhdGEoKSk7XG4gICAgICB0aGlzLnByb3BzLmRhdGEuY2xlYXIoKTtcbiAgICAgIHRoaXMucHJvcHMuZGF0YS5vbignY2hhbmdlJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5zZXREYXRhKGRhdGEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmdldFRhYmxlRGF0YSgpXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvcHkgPSB0aGlzLnByb3BzLmRhdGEuc2xpY2UoKTtcbiAgICAgIHRoaXMuc3RvcmUgPSBuZXcgVGFibGVEYXRhU3RvcmUoY29weSk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0VGFibGUodGhpcy5wcm9wcyk7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5maWx0ZXIub24oJ29uRmlsdGVyQ2hhbmdlJywgKGN1cnJlbnRGaWx0ZXIpID0+IHtcbiAgICAgICAgc2VsZi5oYW5kbGVGaWx0ZXJEYXRhKGN1cnJlbnRGaWx0ZXIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93ICYmIHRoaXMucHJvcHMuc2VsZWN0Um93LnNlbGVjdGVkKSB7XG4gICAgICBsZXQgY29weSA9IHRoaXMucHJvcHMuc2VsZWN0Um93LnNlbGVjdGVkLnNsaWNlKCk7XG4gICAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KGNvcHkpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRhOiB0aGlzLmdldFRhYmxlRGF0YSgpLFxuICAgICAgY3VyclBhZ2U6IHRoaXMucHJvcHMub3B0aW9ucy5wYWdlIHx8IDEsXG4gICAgICBzaXplUGVyUGFnZTogdGhpcy5wcm9wcy5vcHRpb25zLnNpemVQZXJQYWdlIHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVFswXSxcbiAgICAgIHNlbGVjdGVkUm93S2V5czogdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKVxuICAgIH07XG4gIH1cblxuICBpbml0VGFibGUocHJvcHMpe1xuICAgIGxldCB7a2V5RmllbGR9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBpc0tleUZpZWxkRGVmaW5lZCA9IHR5cGVvZiBrZXlGaWVsZCA9PT0gJ3N0cmluZycgJiYga2V5RmllbGQubGVuZ3RoO1xuICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2gocHJvcHMuY2hpbGRyZW4sIGNvbHVtbj0+IHtcbiAgICAgIGlmIChjb2x1bW4ucHJvcHMuaXNLZXkpIHtcbiAgICAgICAgaWYgKGtleUZpZWxkKSB7XG4gICAgICAgICAgdGhyb3cgXCJFcnJvci4gTXVsdGlwbGUga2V5IGNvbHVtbiBiZSBkZXRlY3RlZCBpbiBUYWJsZUhlYWRlckNvbHVtbi5cIjtcbiAgICAgICAgfVxuICAgICAgICBrZXlGaWVsZCA9IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uLnByb3BzLmZpbHRlcikge1xuICAgICAgICAvLyBhIGNvbHVtbiBjb250YWlucyBhIGZpbHRlclxuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICAgICAgLy8gZmlyc3QgdGltZSBjcmVhdGUgdGhlIGZpbHRlciBvbiB0aGUgQm9vdHN0cmFwVGFibGVcbiAgICAgICAgICB0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXNzIHRoZSBmaWx0ZXIgdG8gY29sdW1uIHdpdGggZmlsdGVyXG4gICAgICAgIGNvbHVtbi5wcm9wcy5maWx0ZXIuZW1pdHRlciA9IHRoaXMuZmlsdGVyO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgbGV0IGNvbEluZm9zID0gdGhpcy5nZXRDb2x1bW5zRGVzY3JpcHRpb24ocHJvcHMpLnJlZHVjZSgoIHByZXYsIGN1cnIgKSA9PiB7XG4gICAgICBwcmV2W2N1cnIubmFtZV0gPSBjdXJyO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xuXG4gICAgaWYgKCFpc0tleUZpZWxkRGVmaW5lZCAmJiAha2V5RmllbGQpXG4gICAgICB0aHJvdyBgRXJyb3IuIE5vIGFueSBrZXkgY29sdW1uIGRlZmluZWQgaW4gVGFibGVIZWFkZXJDb2x1bW4uXG4gICAgICAgICAgICBVc2UgJ2lzS2V5PXt0cnVlfScgdG8gc3BlY2lmeSBhIHVuaXF1ZSBjb2x1bW4gYWZ0ZXIgdmVyc2lvbiAwLjUuNC5gO1xuXG4gICAgdGhpcy5zdG9yZS5zZXRQcm9wcyh7XG4gICAgICBpc1BhZ2luYXRpb246IHByb3BzLnBhZ2luYXRpb24sXG4gICAgICBrZXlGaWVsZDoga2V5RmllbGQsXG4gICAgICBjb2xJbmZvczogY29sSW5mb3MsXG4gICAgICBtdWx0aUNvbHVtblNlYXJjaDogcHJvcHMubXVsdGlDb2x1bW5TZWFyY2gsXG4gICAgICByZW1vdGU6IHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKClcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRhYmxlRGF0YSgpIHtcbiAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgIGlmKHRoaXMucHJvcHMub3B0aW9ucy5zb3J0TmFtZSAmJiB0aGlzLnByb3BzLm9wdGlvbnMuc29ydE9yZGVyKVxuICAgICAgIHRoaXMuc3RvcmUuc29ydCh0aGlzLnByb3BzLm9wdGlvbnMuc29ydE9yZGVyLCB0aGlzLnByb3BzLm9wdGlvbnMuc29ydE5hbWUpO1xuXG4gICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgICBsZXQgcGFnZSwgc2l6ZVBlclBhZ2U7XG4gICAgICAgaWYgKHRoaXMuc3RvcmUuaXNDaGFuZ2VkUGFnZSgpKSB7XG4gICAgICAgIHNpemVQZXJQYWdlID0gdGhpcy5zdGF0ZS5zaXplUGVyUGFnZTtcbiAgICAgICAgcGFnZSA9IHRoaXMuc3RhdGUuY3VyclBhZ2U7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHNpemVQZXJQYWdlID0gdGhpcy5wcm9wcy5vcHRpb25zLnNpemVQZXJQYWdlIHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVFswXTtcbiAgICAgICAgIHBhZ2UgPSB0aGlzLnByb3BzLm9wdGlvbnMucGFnZSB8fCAxO1xuICAgICAgIH1cbiAgICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgIH1cbiAgICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENvbHVtbnNEZXNjcmlwdGlvbih7IGNoaWxkcmVuIH0pIHtcbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY29sdW1uLCBpKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBjb2x1bW4ucHJvcHMuZGF0YUZpZWxkLFxuICAgICAgICBhbGlnbjogY29sdW1uLnByb3BzLmRhdGFBbGlnbixcbiAgICAgICAgc29ydDogY29sdW1uLnByb3BzLmRhdGFTb3J0LFxuICAgICAgICBmb3JtYXQ6IGNvbHVtbi5wcm9wcy5kYXRhRm9ybWF0LFxuICAgICAgICBmb3JtYXRFeHRyYURhdGE6IGNvbHVtbi5wcm9wcy5mb3JtYXRFeHRyYURhdGEsXG4gICAgICAgIGZpbHRlckZvcm1hdHRlZDogY29sdW1uLnByb3BzLmZpbHRlckZvcm1hdHRlZCxcbiAgICAgICAgZWRpdGFibGU6IGNvbHVtbi5wcm9wcy5lZGl0YWJsZSxcbiAgICAgICAgaGlkZGVuOiBjb2x1bW4ucHJvcHMuaGlkZGVuLFxuICAgICAgICBzZWFyY2hhYmxlOiBjb2x1bW4ucHJvcHMuc2VhcmNoYWJsZSxcbiAgICAgICAgY2xhc3NOYW1lOiBjb2x1bW4ucHJvcHMuY29sdW1uQ2xhc3NOYW1lLFxuICAgICAgICB3aWR0aDogY29sdW1uLnByb3BzLndpZHRoLFxuICAgICAgICB0ZXh0OiBjb2x1bW4ucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIHNvcnRGdW5jOiBjb2x1bW4ucHJvcHMuc29ydEZ1bmMsXG4gICAgICAgIGluZGV4OiBpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICB0aGlzLmluaXRUYWJsZShuZXh0UHJvcHMpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5leHRQcm9wcy5kYXRhKSkge1xuICAgICAgdGhpcy5zdG9yZS5zZXREYXRhKG5leHRQcm9wcy5kYXRhLnNsaWNlKCkpO1xuICAgICAgbGV0IHBhZ2luYXRpb25Eb20gPSB0aGlzLnJlZnMucGFnaW5hdGlvbjtcbiAgICAgIGxldCBwYWdlID0gcGFnaW5hdGlvbkRvbSAmJiBwYWdpbmF0aW9uRG9tLmdldEN1cnJlbnRQYWdlKCkgfHwgbmV4dFByb3BzLm9wdGlvbnMucGFnZSB8fCAxO1xuICAgICAgbGV0IHNpemVQZXJQYWdlID0gcGFnaW5hdGlvbkRvbSAmJiBwYWdpbmF0aW9uRG9tLmdldFNpemVQZXJQYWdlKCkgfHwgbmV4dFByb3BzLm9wdGlvbnMuc2l6ZVBlclBhZ2UgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUWzBdO1xuICAgICAgLy8gIzEyNVxuICAgICAgaWYocGFnZSA+IE1hdGguY2VpbChuZXh0UHJvcHMuZGF0YS5sZW5ndGggLyBzaXplUGVyUGFnZSkpIHBhZ2UgPSAxO1xuICAgICAgbGV0IHNvcnRJbmZvID0gdGhpcy5zdG9yZS5nZXRTb3J0SW5mbygpO1xuICAgICAgbGV0IHNvcnRGaWVsZCA9IG5leHRQcm9wcy5vcHRpb25zLnNvcnROYW1lIHx8IChzb3J0SW5mbyA/IHNvcnRJbmZvLnNvcnRGaWVsZCA6IHVuZGVmaW5lZCk7XG4gICAgICBsZXQgc29ydE9yZGVyID0gbmV4dFByb3BzLm9wdGlvbnMuc29ydE9yZGVyIHx8IChzb3J0SW5mbyA/IHNvcnRJbmZvLm9yZGVyIDogdW5kZWZpbmVkKTtcbiAgICAgIGlmKHNvcnRGaWVsZCAmJiBzb3J0T3JkZXIpIHRoaXMuc3RvcmUuc29ydChzb3J0T3JkZXIsIHNvcnRGaWVsZCk7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMuc3RvcmUucGFnZShwYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgY3VyclBhZ2U6IHBhZ2UsXG4gICAgICAgIHNpemVQZXJQYWdlOiBzaXplUGVyUGFnZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0Um93ICYmIG5leHRQcm9wcy5zZWxlY3RSb3cuc2VsZWN0ZWQpIHtcbiAgICAgIC8vc2V0IGRlZmF1bHQgc2VsZWN0IHJvd3MgdG8gc3RvcmUuXG4gICAgICBsZXQgY29weSA9IG5leHRQcm9wcy5zZWxlY3RSb3cuc2VsZWN0ZWQuc2xpY2UoKTtcbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoY29weSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBjb3B5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCk7XG4gICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsSGVhZGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCk7XG4gICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsSGVhZGVyKTtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnJlbW92ZUFsbExpc3RlbmVycyhcIm9uRmlsdGVyQ2hhbmdlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9hZGp1c3RIZWFkZXJXaWR0aCgpO1xuICAgIHRoaXMuX2F0dGFjaENlbGxFZGl0RnVuYygpO1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJUYWJsZUNvbXBsZXRlKVxuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyVGFibGVDb21wbGV0ZSgpO1xuICB9XG5cbiAgX2F0dGFjaENlbGxFZGl0RnVuYygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jZWxsRWRpdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsRWRpdC5fX29uQ29tcGxldGVFZGl0X18gPSB0aGlzLmhhbmRsZUVkaXRDZWxsLmJpbmQodGhpcyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlICE9PSBDb25zdC5DRUxMX0VESVRfTk9ORSlcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgaW4gdGhlIGN1cnJlbnQgY29uZmlndXJhdGlvbixcbiAgICogdGhlIGRhdGFncmlkIHNob3VsZCBsb2FkIGl0cyBkYXRhIHJlbW90ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbcHJvcHNdIE9wdGlvbmFsLiBJZiBub3QgZ2l2ZW4sIHRoaXMucHJvcHMgd2lsbCBiZSB1c2VkXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBpc1JlbW90ZURhdGFTb3VyY2UocHJvcHMpIHtcbiAgICByZXR1cm4gKHByb3BzIHx8IHRoaXMucHJvcHMpLnJlbW90ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHZhciB0YWJsZUNsYXNzID0gY2xhc3NTZXQoXCJyZWFjdC1icy10YWJsZVwiKTtcbiAgICB2YXIgY2hpbGRyZW5zID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiB0aGlzLnByb3BzLm1heEhlaWdodFxuICAgIH07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICBjaGlsZHJlbnMgPSBbdGhpcy5wcm9wcy5jaGlsZHJlbl07XG4gICAgfVxuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXRDb2x1bW5zRGVzY3JpcHRpb24odGhpcy5wcm9wcyk7XG4gICAgdmFyIHNvcnRJbmZvID0gdGhpcy5zdG9yZS5nZXRTb3J0SW5mbygpO1xuICAgIHZhciBwYWdpbmF0aW9uID0gdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCk7XG4gICAgdmFyIHRvb2xCYXIgPSB0aGlzLnJlbmRlclRvb2xCYXIoKTtcbiAgICB2YXIgdGFibGVGaWx0ZXIgPSB0aGlzLnJlbmRlclRhYmxlRmlsdGVyKGNvbHVtbnMpO1xuICAgIHZhciBpc1NlbGVjdEFsbCA9IHRoaXMuaXNTZWxlY3RBbGwoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1icy1jb250YWluZXJcIiByZWY9XCJ0YWJsZVwiPlxuICAgICAgICB7dG9vbEJhcn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1icy10YWJsZS1jb250YWluZXJcIlxuICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVNb3VzZUVudGVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgIDxUYWJsZUhlYWRlclxuICAgICAgICAgICAgcmVmPVwiaGVhZGVyXCJcbiAgICAgICAgICAgIHJvd1NlbGVjdFR5cGU9e3RoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGV9XG4gICAgICAgICAgICBoaWRlU2VsZWN0Q29sdW1uPXt0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1ufVxuICAgICAgICAgICAgc29ydE5hbWU9e3NvcnRJbmZvID8gc29ydEluZm8uc29ydEZpZWxkIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgc29ydE9yZGVyPXtzb3J0SW5mbyA/IHNvcnRJbmZvLm9yZGVyIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgb25Tb3J0PXt0aGlzLmhhbmRsZVNvcnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2VsZWN0QWxsUm93PXt0aGlzLmhhbmRsZVNlbGVjdEFsbFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgYm9yZGVyZWQ9e3RoaXMucHJvcHMuYm9yZGVyZWR9XG4gICAgICAgICAgICBjb25kZW5zZWQ9e3RoaXMucHJvcHMuY29uZGVuc2VkfVxuICAgICAgICAgICAgaXNGaWx0ZXJlZD17dGhpcy5maWx0ZXIgPyB0cnVlIDogZmFsc2V9XG4gICAgICAgICAgICBpc1NlbGVjdEFsbD17aXNTZWxlY3RBbGx9PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICA8VGFibGVCb2R5XG4gICAgICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuICAgICAgICAgICAgbWF4SGVpZ2h0PXt0aGlzLnByb3BzLm1heEhlaWdodH1cbiAgICAgICAgICAgIHJlZj1cImJvZHlcIlxuICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5kYXRhfVxuICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgIHRyQ2xhc3NOYW1lPXt0aGlzLnByb3BzLnRyQ2xhc3NOYW1lfVxuICAgICAgICAgICAgc3RyaXBlZD17dGhpcy5wcm9wcy5zdHJpcGVkfVxuICAgICAgICAgICAgYm9yZGVyZWQ9e3RoaXMucHJvcHMuYm9yZGVyZWR9XG4gICAgICAgICAgICBob3Zlcj17dGhpcy5wcm9wcy5ob3Zlcn1cbiAgICAgICAgICAgIGtleUZpZWxkPXt0aGlzLnN0b3JlLmdldEtleUZpZWxkKCl9XG4gICAgICAgICAgICBjb25kZW5zZWQ9e3RoaXMucHJvcHMuY29uZGVuc2VkfVxuICAgICAgICAgICAgc2VsZWN0Um93PXt0aGlzLnByb3BzLnNlbGVjdFJvd31cbiAgICAgICAgICAgIGNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0fVxuICAgICAgICAgICAgc2VsZWN0ZWRSb3dLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkUm93S2V5c31cbiAgICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uUm93TW91c2VPdmVyPXt0aGlzLmhhbmRsZVJvd01vdXNlT3Zlci5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25Sb3dNb3VzZU91dD17dGhpcy5oYW5kbGVSb3dNb3VzZU91dC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25TZWxlY3RSb3c9e3RoaXMuaGFuZGxlU2VsZWN0Um93LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBub0RhdGFUZXh0PXt0aGlzLnByb3BzLm9wdGlvbnMubm9EYXRhVGV4dH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RhYmxlRmlsdGVyfVxuICAgICAgICB7cGFnaW5hdGlvbn1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGlzU2VsZWN0QWxsKCl7XG4gICAgdmFyIGRlZmF1bHRTZWxlY3RSb3dLZXlzID0gdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKTtcbiAgICB2YXIgYWxsUm93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0QWxsUm93a2V5KCk7XG4gICAgaWYoZGVmYXVsdFNlbGVjdFJvd0tleXMubGVuZ3RoICE9PSBhbGxSb3dLZXlzLmxlbmd0aCl7XG4gICAgICByZXR1cm4gZGVmYXVsdFNlbGVjdFJvd0tleXMubGVuZ3RoID09PSAwID8gZmFsc2UgOiAnaW5kZXRlcm1pbmF0ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFuU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShbXSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvd0tleXM6IFtdXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTb3J0KG9yZGVyLCBzb3J0RmllbGQpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uU29ydENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uU29ydENoYW5nZShzb3J0RmllbGQsIG9yZGVyLCB0aGlzLnByb3BzKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5zdG9yZS5zb3J0KG9yZGVyLCBzb3J0RmllbGQpLmdldCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdpbmF0aW9uRGF0YShwYWdlLCBzaXplUGVyUGFnZSkge1xuICAgIGNvbnN0IHtvblBhZ2VDaGFuZ2V9ID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIGlmIChvblBhZ2VDaGFuZ2UpIHtcbiAgICAgIG9uUGFnZUNoYW5nZShwYWdlLCBzaXplUGVyUGFnZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKHBhZ2UsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgIGN1cnJQYWdlOiBwYWdlLFxuICAgICAgc2l6ZVBlclBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vbk1vdXNlTGVhdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vbk1vdXNlTGVhdmUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Nb3VzZUVudGVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Nb3VzZUVudGVyKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUm93TW91c2VPdXQocm93KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vblJvd01vdXNlT3V0KSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dNb3VzZU91dChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJvd01vdXNlT3Zlcihyb3cpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uUm93TW91c2VPdmVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dNb3VzZU92ZXIocm93KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayhyb3cpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vblJvd0NsaWNrKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2VsZWN0QWxsUm93KGUpIHtcbiAgICB2YXIgaXNTZWxlY3RlZCA9IGUuY3VycmVudFRhcmdldC5jaGVja2VkO1xuICAgIGxldCBzZWxlY3RlZFJvd0tleXMgPSBbXTtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3RBbGwpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJvcHMuc2VsZWN0Um93Lm9uU2VsZWN0QWxsKGlzU2VsZWN0ZWQsXG4gICAgICAgIGlzU2VsZWN0ZWQgPyB0aGlzLnN0b3JlLmdldCgpIDogW10pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJyB8fCByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3RlZFJvd0tleXMgPSB0aGlzLnN0b3JlLmdldEFsbFJvd2tleSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KHNlbGVjdGVkUm93S2V5cyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiBzZWxlY3RlZFJvd0tleXNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNob3dPbmx5U2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9yZS5pZ25vcmVOb25TZWxlY3RlZCgpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKDEsIHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgIGN1cnJQYWdlOiAxLFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0Um93KHJvdywgaXNTZWxlY3RlZCkge1xuICAgIGxldCBjdXJyU2VsZWN0ZWQgPSB0aGlzLnN0b3JlLmdldFNlbGVjdGVkUm93S2V5cygpO1xuICAgIGxldCByb3dLZXkgPSByb3dbdGhpcy5zdG9yZS5nZXRLZXlGaWVsZCgpXTtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3QpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJvcHMuc2VsZWN0Um93Lm9uU2VsZWN0KHJvdywgaXNTZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnIHx8IHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09PSBDb25zdC5ST1dfU0VMRUNUX1NJTkdMRSkge1xuICAgICAgICBjdXJyU2VsZWN0ZWQgPSBpc1NlbGVjdGVkID8gW3Jvd0tleV0gOiBbXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICBjdXJyU2VsZWN0ZWQucHVzaChyb3dLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1cnJTZWxlY3RlZCA9IGN1cnJTZWxlY3RlZC5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHJvd0tleSAhPT0ga2V5O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoY3VyclNlbGVjdGVkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IGN1cnJTZWxlY3RlZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRWRpdENlbGwobmV3VmFsLCByb3dJbmRleCwgY29sSW5kZXgpIHtcbiAgICBsZXQgZmllbGROYW1lO1xuICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNvbHVtbiwgaSkge1xuICAgICAgaWYgKGkgPT0gY29sSW5kZXgpIHtcbiAgICAgICAgZmllbGROYW1lID0gY29sdW1uLnByb3BzLmRhdGFGaWVsZDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuc3RvcmUuZWRpdChuZXdWYWwsIHJvd0luZGV4LCBmaWVsZE5hbWUpLmdldCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5jZWxsRWRpdC5hZnRlclNhdmVDZWxsKSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxFZGl0LmFmdGVyU2F2ZUNlbGwodGhpcy5zdGF0ZS5kYXRhW3Jvd0luZGV4XSwgZmllbGROYW1lLCBuZXdWYWwpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFkZFJvd0JlZ2luKCkge1xuICAgIGlmICh0aGlzLnJlZnMuYm9keSkge1xuICAgICAgLy8gdGhpcy5yZWZzLmJvZHkuY2FuY2VsRWRpdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFkZFJvd0F0QmVnaW4obmV3T2JqKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zdG9yZS5hZGRBdEJlZ2luKG5ld09iaik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICAgIHRoaXMuX2hhbmRsZUFmdGVyQWRkaW5nUm93KG5ld09iaik7XG4gIH1cblxuICBoYW5kbGVBZGRSb3cobmV3T2JqKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zdG9yZS5hZGQobmV3T2JqKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgdGhpcy5faGFuZGxlQWZ0ZXJBZGRpbmdSb3cobmV3T2JqKTtcbiAgfVxuXG4gIGdldFNpemVQZXJQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNpemVQZXJQYWdlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VyclBhZ2U7XG4gIH1cblxuICBoYW5kbGVEcm9wUm93KHJvd0tleXMpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGRyb3BSb3dLZXlzID0gcm93S2V5cz9yb3dLZXlzOnRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgLy9hZGQgY29uZmlybSBiZWZvcmUgdGhlIGRlbGV0ZSBhY3Rpb24gaWYgdGhhdCBvcHRpb24gaXMgc2V0LlxuICAgIGlmIChkcm9wUm93S2V5cyAmJiBkcm9wUm93S2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLmhhbmRsZUNvbmZpcm1EZWxldGVSb3cpe1xuICAgICAgICB0aGlzLnByb3BzLm9wdGlvbnMuaGFuZGxlQ29uZmlybURlbGV0ZVJvdyhcbiAgICAgICAgICBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhhdC5kZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHdhbnQgZGVsZXRlPycpKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlUm93KGRyb3BSb3dLZXlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWxldGVSb3coZHJvcFJvd0tleXMpe1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICB0aGlzLnN0b3JlLnJlbW92ZShkcm9wUm93S2V5cyk7ICAvL3JlbW92ZSBzZWxlY3RlZCBSb3dcbiAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KFtdKTsgIC8vY2xlYXIgc2VsZWN0ZWQgcm93IGtleVxuXG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgY29uc3QgeyBzaXplUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGxldCB7IGN1cnJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgbGV0IGN1cnJMYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLnN0b3JlLmdldERhdGFOdW0oKSAvIHNpemVQZXJQYWdlKTtcbiAgICAgIGlmIChjdXJyUGFnZSA+IGN1cnJMYXN0UGFnZSlcbiAgICAgICAgY3VyclBhZ2UgPSBjdXJyTGFzdFBhZ2U7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoY3VyclBhZ2UsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgIHNlbGVjdGVkUm93S2V5czogdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKSxcbiAgICAgICAgY3VyclBhZ2VcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiB0aGlzLnN0b3JlLmdldFNlbGVjdGVkUm93S2V5cygpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckRlbGV0ZVJvdykge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyRGVsZXRlUm93KGRyb3BSb3dLZXlzKTtcbiAgICB9XG5cbiAgfVxuXG4gIGhhbmRsZUZpbHRlckRhdGEoZmlsdGVyT2JqKSB7XG4gICAgdGhpcy5zdG9yZS5maWx0ZXIoZmlsdGVyT2JqKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgc2l6ZVBlclBhZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoMSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJDb2x1bW5GaWx0ZXIpXG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJDb2x1bW5GaWx0ZXIoZmlsdGVyT2JqLFxuICAgICAgICB0aGlzLnN0b3JlLmdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHQsXG4gICAgICBjdXJyUGFnZTogMVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlRXhwb3J0Q1NWKCkge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnN0b3JlLmdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHRoaXMucHJvcHMuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNvbHVtbikge1xuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIGtleXMucHVzaChjb2x1bW4ucHJvcHMuZGF0YUZpZWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBleHBvcnRDU1YocmVzdWx0LCBrZXlzLCB0aGlzLnByb3BzLmNzdkZpbGVOYW1lKTtcbiAgfVxuXG4gIGhhbmRsZVNlYXJjaChzZWFyY2hUZXh0KSB7XG4gICAgdGhpcy5zdG9yZS5zZWFyY2goc2VhcmNoVGV4dCk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBjb25zdCB7IHNpemVQZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKDEsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5nZXQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyU2VhcmNoKVxuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyU2VhcmNoKHNlYXJjaFRleHQsIHRoaXMuc3RvcmUuZ2V0RGF0YUlnbm9yaW5nUGFnaW5hdGlvbigpKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgIGN1cnJQYWdlOiAxXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJQYWdpbmF0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIGxldCBkYXRhU2l6ZTtcbiAgICAgIGlmICh0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpKSB7XG4gICAgICAgIGRhdGFTaXplID0gdGhpcy5wcm9wcy5mZXRjaEluZm8uZGF0YVRvdGFsU2l6ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFTaXplID0gdGhpcy5zdG9yZS5nZXREYXRhTnVtKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWZvb3Rlci1wYWdpbmF0aW9uXCI+XG4gICAgICAgICAgPFBhZ2luYXRpb25MaXN0XG4gICAgICAgICAgICByZWY9XCJwYWdpbmF0aW9uXCJcbiAgICAgICAgICAgIGN1cnJQYWdlPXsgdGhpcy5zdGF0ZS5jdXJyUGFnZSB9XG4gICAgICAgICAgICBjaGFuZ2VQYWdlPXt0aGlzLmhhbmRsZVBhZ2luYXRpb25EYXRhLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBzaXplUGVyUGFnZT17IHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2UgfVxuICAgICAgICAgICAgc2l6ZVBlclBhZ2VMaXN0PXt0aGlzLnByb3BzLm9wdGlvbnMuc2l6ZVBlclBhZ2VMaXN0IHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVH1cbiAgICAgICAgICAgIHBhZ2luYXRpb25TaXplPXt0aGlzLnByb3BzLm9wdGlvbnMucGFnaW5hdGlvblNpemUgfHwgQ29uc3QuUEFHSU5BVElPTl9TSVpFfVxuICAgICAgICAgICAgcmVtb3RlPXt0aGlzLmlzUmVtb3RlRGF0YVNvdXJjZSgpfVxuICAgICAgICAgICAgZGF0YVNpemU9e2RhdGFTaXplfVxuICAgICAgICAgICAgb25TaXplUGVyUGFnZUxpc3Q9e3RoaXMucHJvcHMub3B0aW9ucy5vblNpemVQZXJQYWdlTGlzdH1cbiAgICAgICAgICAgIHByZVBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5wcmVQYWdlIHx8IENvbnN0LlBSRV9QQUdFfVxuICAgICAgICAgICAgbmV4dFBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5uZXh0UGFnZSB8fCBDb25zdC5ORVhUX1BBR0V9XG4gICAgICAgICAgICBmaXJzdFBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5maXJzdFBhZ2UgfHwgQ29uc3QuRklSU1RfUEFHRX1cbiAgICAgICAgICAgIGxhc3RQYWdlPXt0aGlzLnByb3BzLm9wdGlvbnMubGFzdFBhZ2UgfHwgQ29uc3QuTEFTVF9QQUdFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXJUb29sQmFyKCkge1xuICAgIGxldCBlbmFibGVTaG93T25seVNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cgJiYgdGhpcy5wcm9wcy5zZWxlY3RSb3cuc2hvd09ubHlTZWxlY3RlZDtcbiAgICBpZiAoZW5hYmxlU2hvd09ubHlTZWxlY3RlZFxuICAgICAgICB8fCB0aGlzLnByb3BzLmluc2VydFJvd1xuICAgICAgICB8fCB0aGlzLnByb3BzLmRlbGV0ZVJvd1xuICAgICAgICB8fCB0aGlzLnByb3BzLnNlYXJjaFxuICAgICAgICB8fCB0aGlzLnByb3BzLmV4cG9ydENTVikge1xuICAgICAgbGV0IGNvbHVtbnM7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSkge1xuICAgICAgICBjb2x1bW5zID0gdGhpcy5wcm9wcy5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNvbHVtbikge1xuICAgICAgICAgIHZhciBwcm9wcyA9IGNvbHVtbi5wcm9wcztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICBmaWVsZDogcHJvcHMuZGF0YUZpZWxkLFxuICAgICAgICAgICAgLy93aGVuIHlvdSB3YW50IHNhbWUgYXV0byBnZW5lcmF0ZSB2YWx1ZSBhbmQgbm90IGFsbG93IGVkaXQsIGV4YW1wbGUgSUQgZmllbGRcbiAgICAgICAgICAgIGF1dG9WYWx1ZTogcHJvcHMuYXV0b1ZhbHVlIHx8IGZhbHNlLFxuICAgICAgICAgICAgLy9mb3IgY3JlYXRlIGVkaXRvciwgbm8gcGFyYW1zIGZvciBjb2x1bW4uZWRpdGFibGUoKSBpbmRpY2F0ZSB0aGF0IGVkaXRvciBmb3IgbmV3IHJvd1xuICAgICAgICAgICAgZWRpdGFibGU6IHByb3BzLmVkaXRhYmxlICYmICh0eXBlb2YgcHJvcHMuZWRpdGFibGUgPT09IFwiZnVuY3Rpb25cIikgPyBwcm9wcy5lZGl0YWJsZSgpIDogcHJvcHMuZWRpdGFibGUsXG4gICAgICAgICAgICBmb3JtYXQ6IHByb3BzLmRhdGFGb3JtYXQgPyBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wcy5kYXRhRm9ybWF0KHZhbHVlLCBudWxsLCBwcm9wcy5mb3JtYXRFeHRyYURhdGEpLnJlcGxhY2UoLzwuKj8+L2csJycpO1xuICAgICAgICAgICAgfSA6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zID0gW3tcbiAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGZpZWxkOiB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmRhdGFGaWVsZCxcbiAgICAgICAgICBlZGl0YWJsZTogdGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5lZGl0YWJsZVxuICAgICAgICB9XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1iYXJcIj5cbiAgICAgICAgICA8VG9vbEJhclxuICAgICAgICAgICAgY2xlYXJTZWFyY2g9e3RoaXMucHJvcHMub3B0aW9ucy5jbGVhclNlYXJjaH1cbiAgICAgICAgICAgIGVuYWJsZUluc2VydD17dGhpcy5wcm9wcy5pbnNlcnRSb3d9XG4gICAgICAgICAgICBlbmFibGVEZWxldGU9e3RoaXMucHJvcHMuZGVsZXRlUm93fVxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoPXt0aGlzLnByb3BzLnNlYXJjaH1cbiAgICAgICAgICAgIGVuYWJsZUV4cG9ydENTVj17dGhpcy5wcm9wcy5leHBvcnRDU1Z9XG4gICAgICAgICAgICBlbmFibGVTaG93T25seVNlbGVjdGVkPXtlbmFibGVTaG93T25seVNlbGVjdGVkfVxuICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgb25BZGRSb3c9e3RoaXMuaGFuZGxlQWRkUm93LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkFkZFJvd0JlZ2luPXt0aGlzLmhhbmRsZUFkZFJvd0JlZ2luLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkRyb3BSb3c9e3RoaXMuaGFuZGxlRHJvcFJvdy5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25TZWFyY2g9e3RoaXMuaGFuZGxlU2VhcmNoLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvbkV4cG9ydENTVj17dGhpcy5oYW5kbGVFeHBvcnRDU1YuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU2hvd09ubHlTZWxlY3RlZD17dGhpcy5oYW5kbGVTaG93T25seVNlbGVjdGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclRhYmxlRmlsdGVyKGNvbHVtbnMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5GaWx0ZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUYWJsZUZpbHRlciBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgICAgcm93U2VsZWN0VHlwZT17dGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZX1cbiAgICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyPXt0aGlzLmhhbmRsZUZpbHRlckRhdGEuYmluZCh0aGlzKX0vPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgX3Njcm9sbEhlYWRlciA9IChlKSA9PiB7XG4gICAgdGhpcy5yZWZzLmhlYWRlci5yZWZzLmNvbnRhaW5lci5zY3JvbGxMZWZ0ID0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbExlZnQ7XG4gIH1cblxuICBfYWRqdXN0SGVhZGVyV2lkdGggPSAoKSA9PiB7XG4gICAgdmFyIHRhYmxlSGVhZGVyRG9tID0gdGhpcy5yZWZzLmhlYWRlci5yZWZzLmNvbnRhaW5lci5jaGlsZE5vZGVzWzBdO1xuICAgIHZhciB0YWJsZUJvZHlEb20gPSB0aGlzLnJlZnMuYm9keS5yZWZzLmNvbnRhaW5lci5jaGlsZE5vZGVzWzBdO1xuICAgIGlmKHRhYmxlSGVhZGVyRG9tLm9mZnNldFdpZHRoICE9PSB0YWJsZUJvZHlEb20ub2Zmc2V0V2lkdGgpe1xuICAgICAgdGFibGVIZWFkZXJEb20uc3R5bGUud2lkdGggPSB0YWJsZUJvZHlEb20ub2Zmc2V0V2lkdGggKyBcInB4XCI7XG4gICAgfVxuICAgIGNvbnN0IGhlYWRlclByb3BzID0gdGhpcy5yZWZzLmJvZHkuZ2V0Qm9keUhlYWRlckRvbVByb3AoKTtcbiAgICB0aGlzLnJlZnMuaGVhZGVyLmZpdEhlYWRlcihoZWFkZXJQcm9wcyxcbiAgICAgIHRoaXMucmVmcy5ib2R5LnJlZnMuY29udGFpbmVyLnNjcm9sbEhlaWdodCA+IHRoaXMucmVmcy5ib2R5LnJlZnMuY29udGFpbmVyLmNsaWVudEhlaWdodCk7XG4gIH1cblxuICBfaGFuZGxlQWZ0ZXJBZGRpbmdSb3cobmV3T2JqKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICAvL2lmIHBhZ2luYXRpb24gaXMgZW5hYmxlZCBhbmQgaW5zZXJ0IHJvdyBiZSB0cmlnZ2VyLCBjaGFuZ2UgdG8gbGFzdCBwYWdlXG4gICAgICBjb25zdCB7IHNpemVQZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgY29uc3QgY3Vyckxhc3RQYWdlID0gTWF0aC5jZWlsKHRoaXMuc3RvcmUuZ2V0RGF0YU51bSgpIC8gc2l6ZVBlclBhZ2UpO1xuICAgICAgcmVzdWx0ID0gdGhpcy5zdG9yZS5wYWdlKGN1cnJMYXN0UGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgY3VyclBhZ2U6IGN1cnJMYXN0UGFnZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGE6IHJlc3VsdFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckluc2VydFJvdykge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLmFmdGVySW5zZXJ0Um93KG5ld09iaik7XG4gICAgfVxuICB9XG59XG5cbkJvb3RzdHJhcFRhYmxlLnByb3BUeXBlcyA9IHtcbiAga2V5RmllbGQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbWF4SGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtSZWFjdC5Qcm9wVHlwZXMuYXJyYXksIFJlYWN0LlByb3BUeXBlcy5vYmplY3RdKSxcbiAgcmVtb3RlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgLy8gcmVtb3RlIGRhdGEsIGRlZmF1bHQgaXMgZmFsc2VcbiAgc3RyaXBlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGJvcmRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgaG92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjb25kZW5zZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBwYWdpbmF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgc2VhcmNoUGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHNlbGVjdFJvdzogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBtb2RlOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW1xuICAgICAgQ29uc3QuUk9XX1NFTEVDVF9OT05FLFxuICAgICAgQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUsXG4gICAgICBDb25zdC5ST1dfU0VMRUNUX01VTFRJXG4gICAgXSksXG4gICAgYmdDb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgIG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdEFsbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2xpY2tUb1NlbGVjdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgaGlkZVNlbGVjdENvbHVtbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93T25seVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuICB9KSxcbiAgY2VsbEVkaXQ6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgbW9kZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBibHVyVG9TYXZlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBhZnRlclNhdmVDZWxsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICB9KSxcbiAgaW5zZXJ0Um93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGVsZXRlUm93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgc2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29sdW1uRmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgdHJDbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgY2xlYXJTZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNvcnROYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNvcnRPcmRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhZnRlclRhYmxlQ29tcGxldGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyRGVsZXRlUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckluc2VydFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJTZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyQ29sdW1uRmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblJvd0NsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwYWdlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHNpemVQZXJQYWdlTGlzdDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgIHNpemVQZXJQYWdlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhZ2luYXRpb25TaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uU29ydENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25QYWdlQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblNpemVQZXJQYWdlTGlzdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgbm9EYXRhVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoYW5kbGVDb25maXJtRGVsZXRlUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBwcmVQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5leHRQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpcnN0UGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsYXN0UGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICB9KSxcbiAgZmV0Y2hJbmZvOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGRhdGFUb3RhbFNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIH0pLFxuICBleHBvcnRDU1Y6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjc3ZGaWxlTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcbkJvb3RzdHJhcFRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXG4gIHN0cmlwZWQ6IGZhbHNlLFxuICBib3JkZXJlZDogdHJ1ZSxcbiAgaG92ZXI6IGZhbHNlLFxuICBjb25kZW5zZWQ6IGZhbHNlLFxuICBwYWdpbmF0aW9uOiBmYWxzZSxcbiAgc2VhcmNoUGxhY2Vob2xkZXI6IHVuZGVmaW5lZCxcbiAgc2VsZWN0Um93OiB7XG4gICAgbW9kZTogQ29uc3QuUk9XX1NFTEVDVF9OT05FLFxuICAgIGJnQ29sb3I6IENvbnN0LlJPV19TRUxFQ1RfQkdfQ09MT1IsXG4gICAgc2VsZWN0ZWQ6IFtdLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3RBbGw6IHVuZGVmaW5lZCxcbiAgICBjbGlja1RvU2VsZWN0OiBmYWxzZSxcbiAgICBoaWRlU2VsZWN0Q29sdW1uOiBmYWxzZSxcbiAgICBjbGlja1RvU2VsZWN0QW5kRWRpdENlbGw6IGZhbHNlLFxuICAgIHNob3dPbmx5U2VsZWN0ZWQ6IGZhbHNlXG4gIH0sXG4gIGNlbGxFZGl0OiB7XG4gICAgbW9kZTogQ29uc3QuQ0VMTF9FRElUX05PTkUsXG4gICAgYmx1clRvU2F2ZTogZmFsc2UsXG4gICAgYWZ0ZXJTYXZlQ2VsbDogdW5kZWZpbmVkXG4gIH0sXG4gIGluc2VydFJvdzogZmFsc2UsXG4gIGRlbGV0ZVJvdzogZmFsc2UsXG4gIHNlYXJjaDogZmFsc2UsXG4gIG11bHRpQ29sdW1uU2VhcmNoOiBmYWxzZSxcbiAgY29sdW1uRmlsdGVyOiBmYWxzZSxcbiAgdHJDbGFzc05hbWU6ICcnLFxuICBvcHRpb25zOiB7XG4gICAgY2xlYXJTZWFyY2g6IGZhbHNlLFxuICAgIHNvcnROYW1lOiB1bmRlZmluZWQsXG4gICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJUYWJsZUNvbXBsZXRlOiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJEZWxldGVSb3c6IHVuZGVmaW5lZCxcbiAgICBhZnRlckluc2VydFJvdzogdW5kZWZpbmVkLFxuICAgIGFmdGVyU2VhcmNoOiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJDb2x1bW5GaWx0ZXI6IHVuZGVmaW5lZCxcbiAgICBvblJvd0NsaWNrOiB1bmRlZmluZWQsXG4gICAgb25Nb3VzZUxlYXZlOiB1bmRlZmluZWQsXG4gICAgb25Nb3VzZUVudGVyOiB1bmRlZmluZWQsXG4gICAgb25Sb3dNb3VzZU91dDogdW5kZWZpbmVkLFxuICAgIG9uUm93TW91c2VPdmVyOiB1bmRlZmluZWQsXG4gICAgcGFnZTogdW5kZWZpbmVkLFxuICAgIHNpemVQZXJQYWdlTGlzdDogQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNULFxuICAgIHNpemVQZXJQYWdlOiB1bmRlZmluZWQsXG4gICAgcGFnaW5hdGlvblNpemU6IENvbnN0LlBBR0lOQVRJT05fU0laRSxcbiAgICBvblNpemVQZXJQYWdlTGlzdDogdW5kZWZpbmVkLFxuICAgIG5vRGF0YVRleHQ6IHVuZGVmaW5lZCxcbiAgICBoYW5kbGVDb25maXJtRGVsZXRlUm93OiB1bmRlZmluZWQsXG4gICAgcHJlUGFnZTogQ29uc3QuUFJFX1BBR0UsXG4gICAgbmV4dFBhZ2U6IENvbnN0Lk5FWFRfUEFHRSxcbiAgICBmaXJzdFBhZ2U6IENvbnN0LkZJUlNUX1BBR0UsXG4gICAgbGFzdFBhZ2U6IENvbnN0LkxBU1RfUEFHRVxuICB9LFxuICBmZXRjaEluZm86IHtcbiAgICBkYXRhVG90YWxTaXplOiAwLFxuICB9LFxuICBleHBvcnRDU1Y6IGZhbHNlLFxuICBjc3ZGaWxlTmFtZTogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBUYWJsZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJjb21tb25qc1wiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NsYXNzbmFtZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIFNPUlRfREVTQzogXCJkZXNjXCIsXG4gIFNPUlRfQVNDOiBcImFzY1wiLFxuICBTSVpFX1BFUl9QQUdFOiAxMCxcbiAgTkVYVF9QQUdFOiBcIj5cIixcbiAgTEFTVF9QQUdFOiBcIj4+XCIsXG4gIFBSRV9QQUdFOiBcIjxcIixcbiAgRklSU1RfUEFHRTogXCI8PFwiLFxuICBST1dfU0VMRUNUX0JHX0NPTE9SOiBcIlwiLFxuICBST1dfU0VMRUNUX05PTkU6IFwibm9uZVwiLFxuICBST1dfU0VMRUNUX1NJTkdMRTogXCJyYWRpb1wiLFxuICBST1dfU0VMRUNUX01VTFRJOiBcImNoZWNrYm94XCIsXG4gIENFTExfRURJVF9OT05FOiBcIm5vbmVcIixcbiAgQ0VMTF9FRElUX0NMSUNLOiBcImNsaWNrXCIsXG4gIENFTExfRURJVF9EQkNMSUNLOiBcImRiY2xpY2tcIixcbiAgU0laRV9QRVJfUEFHRV9MSVNUOiBbMTAsIDI1LCAzMCwgNTBdLFxuICBQQUdJTkFUSU9OX1NJWkU6IDUsXG4gIE5PX0RBVEFfVEVYVDogXCJUaGVyZSBpcyBubyBkYXRhIHRvIGRpc3BsYXlcIixcbiAgU0hPV19PTkxZX1NFTEVDVDogXCJTaG93IFNlbGVjdGVkIE9ubHlcIixcbiAgU0hPV19BTEw6IFwiU2hvdyBBbGxcIixcbiAgRklMVEVSX0RFTEFZOiA1MDAsXG4gIEZJTFRFUl9UWVBFOiB7XG4gICAgVEVYVDogXCJUZXh0RmlsdGVyXCIsXG4gICAgU0VMRUNUOiBcIlNlbGVjdEZpbHRlclwiLFxuICAgIE5VTUJFUjogXCJOdW1iZXJGaWx0ZXJcIixcbiAgICBEQVRFOiBcIkRhdGVGaWx0ZXJcIixcbiAgICBDVVNUT006IFwiQ3VzdG9tRmlsdGVyXCJcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ29uc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFNlbGVjdFJvd0hlYWRlckNvbHVtbiBmcm9tICcuL1NlbGVjdFJvd0hlYWRlckNvbHVtbic7XG5cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICBjb21wb25lbnREaWRNb3VudCgpIHsgdGhpcy51cGRhdGUodGhpcy5wcm9wcy5jaGVja2VkKTsgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7IHRoaXMudXBkYXRlKHByb3BzLmNoZWNrZWQpOyB9XG4gIHVwZGF0ZShjaGVja2VkKSB7XG4gICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuaW5kZXRlcm1pbmF0ZSA9IGNoZWNrZWQgPT09ICdpbmRldGVybWluYXRlJztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGlucHV0IGNsYXNzTmFtZT0ncmVhY3QtYnMtc2VsZWN0LWFsbCcgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX0gLz5cbiAgfVxufVxuXG5jbGFzcyBUYWJsZUhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNlbGVjdFJvd0NvbHVtbldpZHRoID0gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciBjb250YWluZXJDbGFzc2VzID0gY2xhc3NTZXQoXCJ0YWJsZS1oZWFkZXJcIik7XG4gICAgdmFyIHRhYmxlQ2xhc3NlcyA9IGNsYXNzU2V0KFwidGFibGVcIiwgXCJ0YWJsZS1ob3ZlclwiLCB7XG4gICAgICAgIFwidGFibGUtYm9yZGVyZWRcIjogdGhpcy5wcm9wcy5ib3JkZXJlZCxcbiAgICAgICAgXCJ0YWJsZS1jb25kZW5zZWRcIjogdGhpcy5wcm9wcy5jb25kZW5zZWRcbiAgICB9KTtcbiAgICB2YXIgc2VsZWN0Um93SGVhZGVyQ29sID0gdGhpcy5wcm9wcy5oaWRlU2VsZWN0Q29sdW1uP251bGw6dGhpcy5yZW5kZXJTZWxlY3RSb3dIZWFkZXIoKTtcbiAgICB0aGlzLl9hdHRhY2hDbGVhclNvcnRDYXJldEZ1bmMoKTtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtaGVhZGVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiByZWY9XCJjb250YWluZXJcIiBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzZXN9PlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3Nlc30+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0ciByZWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0Um93SGVhZGVyQ29sfVxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHJlbmRlclNlbGVjdFJvd0hlYWRlcigpe1xuICAgIGlmKHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PSBDb25zdC5ST1dfU0VMRUNUX1NJTkdMRSkge1xuICAgICAgcmV0dXJuICg8U2VsZWN0Um93SGVhZGVyQ29sdW1uIHdpZHRoPXt0aGlzLnNlbGVjdFJvd0NvbHVtbldpZHRofT48L1NlbGVjdFJvd0hlYWRlckNvbHVtbj4pO1xuICAgIH1lbHNlIGlmKHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJKXtcbiAgICAgIHJldHVybiAoPFNlbGVjdFJvd0hlYWRlckNvbHVtbiB3aWR0aD17dGhpcy5zZWxlY3RSb3dDb2x1bW5XaWR0aH0+XG4gICAgICAgICAgPENoZWNrYm94IG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uU2VsZWN0QWxsUm93fSBjaGVja2VkPXt0aGlzLnByb3BzLmlzU2VsZWN0QWxsfS8+XG4gICAgICAgIDwvU2VsZWN0Um93SGVhZGVyQ29sdW1uPlxuICAgICAgKTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIF9hdHRhY2hDbGVhclNvcnRDYXJldEZ1bmMoKXtcbiAgICBpZihBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pKXtcbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5wcm9wcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnByb3BzLmNoaWxkcmVuW2ldLnByb3BzLmRhdGFGaWVsZDtcbiAgICAgICAgY29uc3Qgc29ydCA9IGZpZWxkID09PSB0aGlzLnByb3BzLnNvcnROYW1lID8gdGhpcy5wcm9wcy5zb3J0T3JkZXIgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5baV0gPVxuICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuW2ldLFxuICAgICAgICAgICAgeyBrZXk6IGksIG9uU29ydDogdGhpcy5wcm9wcy5vblNvcnQsIHNvcnQgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICBjb25zdCBzb3J0ID0gZmllbGQgPT09IHRoaXMucHJvcHMuc29ydE5hbWUgPyB0aGlzLnByb3BzLnNvcnRPcmRlciA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4gPVxuICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwge2tleTogMCwgb25Tb3J0OiB0aGlzLnByb3BzLm9uU29ydCwgc29ydH0pO1xuICAgIH1cbiAgfVxuXG4gIGZpdEhlYWRlcihoZWFkZXJQcm9wcywgaXNWZXJ0aWNhbFNjcm9sbEJhcil7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSl7XG4gICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9ICh0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJKSAmJiAhdGhpcy5wcm9wcy5oaWRlU2VsZWN0Q29sdW1uID8gMTowO1xuICAgICAgaWYoc3RhcnRQb3NpdGlvbiA9PSAxKVxuICAgICAgICB0aGlzLnNlbGVjdFJvd0NvbHVtbldpZHRoID0gaGVhZGVyUHJvcHNbMF0ud2lkdGg7XG4gICAgICBmb3IobGV0IGk9MDtpPHRoaXMucHJvcHMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5baV0gPVxuICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuW2ldLCB7d2lkdGg6IGhlYWRlclByb3BzW2krc3RhcnRQb3NpdGlvbl0ud2lkdGgrXCJweFwifSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4gPVxuICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwge3dpZHRoOiBoZWFkZXJQcm9wc1swXS53aWR0aCtcInB4XCJ9KTtcbiAgICB9XG4gICAgaWYodGhpcy5wcm9wcy5jb25kZW5zZWQgJiYgIXRoaXMucHJvcHMuaXNGaWx0ZXJlZCkge1xuICAgICAgdGhpcy5yZWZzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjM2cHhcIjtcbiAgICB9XG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIGlmKGlzVmVydGljYWxTY3JvbGxCYXIpXG4gICAgICB0aGlzLnJlZnMuY29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gVXRpbC5nZXRTY3JvbGxCYXJXaWR0aCgpICsgXCJweFwiO1xuICB9XG59XG5UYWJsZUhlYWRlci5wcm9wVHlwZXMgPSB7XG4gIHJvd1NlbGVjdFR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG9uU29ydDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0QWxsUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc29ydE5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHNvcnRPcmRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgaGlkZVNlbGVjdENvbHVtbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGJvcmRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29uZGVuc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgaXNGaWx0ZXJlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGlzU2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoW3RydWUsICdpbmRldGVybWluYXRlJywgZmFsc2VdKVxufTtcblxuVGFibGVIZWFkZXIuZGVmYXVsdFByb3BzID0ge1xufTtcbmV4cG9ydCBkZWZhdWx0IFRhYmxlSGVhZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVIZWFkZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RET01cIixcImNvbW1vbmpzMlwiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJhbWRcIjpcInJlYWN0LWRvbVwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgcmVuZGVyU29ydENhcmV0KG9yZGVyKSB7XG4gICAgdmFyIHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB3cmFwLmNsYXNzTmFtZSA9IFwib3JkZXJcIjtcbiAgICBpZihvcmRlciA9PSBDb25zdC5TT1JUX0FTQykgd3JhcC5jbGFzc05hbWUgKz0gXCIgZHJvcHVwXCI7XG4gICAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaW5uZXIuY2xhc3NOYW1lID0gXCJjYXJldFwiO1xuICAgIGlubmVyLnN0eWxlLm1hcmdpbiA9IFwiMTBweCA1cHhcIjtcbiAgICB3cmFwLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICByZXR1cm4gd3JhcDtcbiAgfSxcblxuICByZW5kZXJSZWFjdFNvcnRDYXJldChvcmRlcil7XG4gICAgdmFyIG9yZGVyQ2xhc3MgPSBjbGFzc1NldChcIm9yZGVyXCIsIHtcbiAgICAgICdkcm9wdXAnOiBvcmRlciA9PSBDb25zdC5TT1JUX0FTQ1xuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e29yZGVyQ2xhc3N9PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiIHN0eWxlPXt7bWFyZ2luOiAnMTBweCA1cHgnfX0+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH0sXG5cbiAgZ2V0U2Nyb2xsQmFyV2lkdGgoKXtcbiAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICBpbm5lci5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG5cbiAgICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBvdXRlci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBvdXRlci5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgIG91dGVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIG91dGVyLnN0eWxlLndpZHRoID0gXCIyMDBweFwiO1xuICAgIG91dGVyLnN0eWxlLmhlaWdodCA9IFwiMTUwcHhcIjtcbiAgICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgb3V0ZXIuYXBwZW5kQ2hpbGQgKGlubmVyKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgKG91dGVyKTtcbiAgICB2YXIgdzEgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuICAgIHZhciB3MiA9IGlubmVyLm9mZnNldFdpZHRoO1xuICAgIGlmICh3MSA9PSB3MikgdzIgPSBvdXRlci5jbGllbnRXaWR0aDtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQgKG91dGVyKTtcblxuICAgIHJldHVybiAodzEgLSB3Mik7XG4gIH1cblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuXG5jbGFzcyBTZWxlY3RSb3dIZWFkZXJDb2x1bW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIHRoU3R5bGUgPSB7XG4gICAgICB3aWR0aDogcGFyc2VJbnQodGhpcy5wcm9wcy53aWR0aCk/dGhpcy5wcm9wcy53aWR0aDozNVxuICAgIH07XG5cbiAgICByZXR1cm4oXG4gICAgICA8dGggc3R5bGU9e3RoU3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoLWlubmVyIHRhYmxlLWhlYWRlci1jb2x1bW5cIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RoPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RSb3dIZWFkZXJDb2x1bW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9TZWxlY3RSb3dIZWFkZXJDb2x1bW4uanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBUYWJsZVJvdyBmcm9tICcuL1RhYmxlUm93JztcbmltcG9ydCBUYWJsZUNvbHVtbiBmcm9tICcuL1RhYmxlQ29sdW1uJztcbmltcG9ydCBUYWJsZUVkaXRDb2x1bW4gZnJvbSAnLi9UYWJsZUVkaXRDb2x1bW4nO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG52YXIgaXNGdW49ZnVuY3Rpb24ob2JqKXtcbiAgcmV0dXJuIG9iaiYmKHR5cGVvZiBvYmo9PT1cImZ1bmN0aW9uXCIpO1xuXG59O1xuY2xhc3MgVGFibGVCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyRWRpdENlbGw6IG51bGxcbiAgICB9O1xuICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICB0aGlzLmFkanVzdEJvZHkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuICAgIHRoaXMuYWRqdXN0Qm9keSgpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIGNvbnRhaW5lckNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlLWNvbnRhaW5lclwiKTtcblxuICAgIHZhciB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlXCIsIHtcbiAgICAgICd0YWJsZS1zdHJpcGVkJzogdGhpcy5wcm9wcy5zdHJpcGVkLFxuICAgICAgJ3RhYmxlLWJvcmRlcmVkJzogdGhpcy5wcm9wcy5ib3JkZXJlZCxcbiAgICAgICd0YWJsZS1ob3Zlcic6IHRoaXMucHJvcHMuaG92ZXIsXG4gICAgICAndGFibGUtY29uZGVuc2VkJzogdGhpcy5wcm9wcy5jb25kZW5zZWRcbiAgICB9KTtcblxuICAgIHZhciBpc1NlbGVjdFJvd0RlZmluZWQgPSB0aGlzLl9pc1NlbGVjdFJvd0RlZmluZWQoKTtcbiAgICB2YXIgdGFibGVIZWFkZXIgPSB0aGlzLnJlbmRlclRhYmxlSGVhZGVyKGlzU2VsZWN0Um93RGVmaW5lZCk7XG5cbiAgICB2YXIgdGFibGVSb3dzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbihkYXRhLCByKXtcbiAgICAgIHZhciB0YWJsZUNvbHVtbnMgPSB0aGlzLnByb3BzLmNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbiwgaSl7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gZGF0YVtjb2x1bW4ubmFtZV07XG4gICAgICAgIGlmKHRoaXMuZWRpdGluZyAmJlxuICAgICAgICAgIGNvbHVtbi5uYW1lICE9PSB0aGlzLnByb3BzLmtleUZpZWxkICYmIC8vIEtleSBmaWVsZCBjYW4ndCBiZSBlZGl0XG4gICAgICAgICAgY29sdW1uLmVkaXRhYmxlICYmIC8vIGNvbHVtbiBpcyBlZGl0YWJsZT8gZGVmYXVsdCBpcyB0cnVlLCB1c2VyIGNhbiBzZXQgaXQgZmFsc2VcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJFZGl0Q2VsbCAhPSBudWxsICYmXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyRWRpdENlbGwucmlkID09IHIgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJFZGl0Q2VsbC5jaWQgPT0gaSl7XG4gICAgICAgICAgICB2YXIgZm9ybWF0PWNvbHVtbi5mb3JtYXQ/ZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICByZXR1cm4gY29sdW1uLmZvcm1hdCh2YWx1ZSwgZGF0YSwgY29sdW1uLmZvcm1hdEV4dHJhRGF0YSkucmVwbGFjZSgvPC4qPz4vZywnJyk7XG4gICAgICAgICAgICB9OmZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8VGFibGVFZGl0Q29sdW1uIGNvbXBsZXRlRWRpdD17dGhpcy5oYW5kbGVDb21wbGV0ZUVkaXRDZWxsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGQgYnkgYmx1ZXNwcmluZyBmb3IgY29sdW1uIGVkaXRvciBjdXN0b21pemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZT17aXNGdW4oY29sdW1uLmVkaXRhYmxlKT9jb2x1bW4uZWRpdGFibGUoZmllbGRWYWx1ZSxkYXRhLHIsaSk6Y29sdW1uLmVkaXRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD17Y29sdW1uLmZvcm1hdD9mb3JtYXQ6ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsdXJUb1NhdmU9e3RoaXMucHJvcHMuY2VsbEVkaXQuYmx1clRvU2F2ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dJbmRleD17cn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xJbmRleD17aX0+XG4gICAgICAgICAgICAgICAge2ZpZWxkVmFsdWV9XG4gICAgICAgICAgICAgIDwvVGFibGVFZGl0Q29sdW1uPlxuICAgICAgICAgICAgKVxuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgLy9hZGQgYnkgYmx1ZXNwcmluZyBmb3IgY2xhc3NOYW1lIGN1c3RvbWl6ZVxuICAgICAgICAgIHZhciB0ZENsYXNzTmFtZT1pc0Z1bihjb2x1bW4uY2xhc3NOYW1lKT9jb2x1bW4uY2xhc3NOYW1lKGZpZWxkVmFsdWUsZGF0YSxyLGkpOmNvbHVtbi5jbGFzc05hbWU7XG5cbiAgICAgICAgICBpZih0eXBlb2YgY29sdW1uLmZvcm1hdCAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBjb2x1bW4uZm9ybWF0KGZpZWxkVmFsdWUsIGRhdGEsIGNvbHVtbi5mb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChmb3JtYXR0ZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBmb3JtYXR0ZWRWYWx1ZX19PjwvZGl2PjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPFRhYmxlQ29sdW1uIGRhdGFBbGlnbj17Y29sdW1uLmFsaWdufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuPXtjb2x1bW4uaGlkZGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0PXt0aGlzLmhhbmRsZUVkaXRDZWxsLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17Y29sdW1uLndpZHRofT5cbiAgICAgICAgICAgICAgICB7Zm9ybWF0dGVkVmFsdWV9XG4gICAgICAgICAgICAgIDwvVGFibGVDb2x1bW4+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8VGFibGVDb2x1bW4gZGF0YUFsaWduPXtjb2x1bW4uYWxpZ259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVkaXQ9e3RoaXMucHJvcHMuY2VsbEVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW49e2NvbHVtbi5oaWRkZW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXQ9e3RoaXMuaGFuZGxlRWRpdENlbGwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtjb2x1bW4ud2lkdGh9PlxuICAgICAgICAgICAgICAgIHtmaWVsZFZhbHVlfVxuICAgICAgICAgICAgICA8L1RhYmxlQ29sdW1uPlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkUm93S2V5cy5pbmRleE9mKGRhdGFbdGhpcy5wcm9wcy5rZXlGaWVsZF0pICE9IC0xO1xuICAgICAgdmFyIHNlbGVjdFJvd0NvbHVtbiA9IGlzU2VsZWN0Um93RGVmaW5lZCAmJiAhdGhpcy5wcm9wcy5zZWxlY3RSb3cuaGlkZVNlbGVjdENvbHVtbj9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VsZWN0Um93Q29sdW1uKHNlbGVjdGVkKTpudWxsO1xuICAgICAgLy9hZGQgYnkgYmx1ZXNwcmluZyBmb3IgY2xhc3NOYW1lIGN1c3RvbWl6ZVxuICAgICAgdmFyIHRyQ2xhc3NOYW1lPWlzRnVuKHRoaXMucHJvcHMudHJDbGFzc05hbWUpP3RoaXMucHJvcHMudHJDbGFzc05hbWUoZGF0YSxyKTp0aGlzLnByb3BzLnRyQ2xhc3NOYW1lO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRhYmxlUm93IGlzU2VsZWN0ZWQ9e3NlbGVjdGVkfSBrZXk9e3J9IGNsYXNzTmFtZT17dHJDbGFzc05hbWV9XG4gICAgICAgICAgc2VsZWN0Um93PXtpc1NlbGVjdFJvd0RlZmluZWQ/dGhpcy5wcm9wcy5zZWxlY3RSb3c6dW5kZWZpbmVkfVxuICAgICAgICAgIGVuYWJsZUNlbGxFZGl0PXt0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgIT09IENvbnN0LkNFTExfRURJVF9OT05FfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICBvblJvd01vdXNlT3Zlcj17dGhpcy5oYW5kbGVSb3dNb3VzZU92ZXIuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblJvd01vdXNlT3V0PXt0aGlzLmhhbmRsZVJvd01vdXNlT3V0LmJpbmQodGhpcyl9XG4gICAgICAgICAgb25TZWxlY3RSb3c9e3RoaXMuaGFuZGxlU2VsZWN0Um93LmJpbmQodGhpcyl9PlxuICAgICAgICAgIHtzZWxlY3RSb3dDb2x1bW59XG4gICAgICAgICAge3RhYmxlQ29sdW1uc31cbiAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgIClcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmKHRhYmxlUm93cy5sZW5ndGggPT09IDApe1xuICAgICAgdGFibGVSb3dzLnB1c2goXG4gICAgICA8VGFibGVSb3cga2V5PVwiIyN0YWJsZS1lbXB0eSMjXCI+XG4gICAgICAgIDx0ZCBjb2xTcGFuPXt0aGlzLnByb3BzLmNvbHVtbnMubGVuZ3RoKyhpc1NlbGVjdFJvd0RlZmluZWQ/MTowKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWJzLXRhYmxlLW5vLWRhdGFcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5vRGF0YVRleHR8fENvbnN0Lk5PX0RBVEFfVEVYVH1cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvVGFibGVSb3c+KTtcbiAgICB9XG5cbiAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcblxuICAgIHZhciBoZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IHJlZj1cImNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3Nlc30gc3R5bGU9e3toZWlnaHQ6IGhlaWdodH19PlxuICAgICAgICA8dGFibGUgcmVmPVwiYm9keVwiIGNsYXNzTmFtZT17dGFibGVDbGFzc2VzfT5cbiAgICAgICAgICB7dGFibGVIZWFkZXJ9XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAge3RhYmxlUm93c31cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyVGFibGVIZWFkZXIoaXNTZWxlY3RSb3dEZWZpbmVkKXtcbiAgICB2YXIgc2VsZWN0Um93SGVhZGVyID0gbnVsbDtcblxuICAgIGlmKGlzU2VsZWN0Um93RGVmaW5lZCl7XG4gICAgICBsZXQgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOjM1LFxuICAgICAgICBtaW5XaWR0aDozNVxuICAgICAgfVxuICAgICAgc2VsZWN0Um93SGVhZGVyID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cuaGlkZVNlbGVjdENvbHVtbj9udWxsOig8dGggc3R5bGU9e3N0eWxlfSBrZXk9ey0xfT48L3RoPik7XG4gICAgfVxuICAgIHZhciB0aGVhZGVyID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoID09IG51bGw/Y29sdW1uLndpZHRoOnBhcnNlSW50KGNvbHVtbi53aWR0aCk7XG4gICAgICBsZXQgc3R5bGU9e1xuICAgICAgICBkaXNwbGF5OiBjb2x1bW4uaGlkZGVuP1wibm9uZVwiOm51bGwsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgbWF4V2lkdGg6IHdpZHRoXG4gICAgICAgIC8qKiBhZGQgbWluLXdkdGggdG8gZml4IHVzZXIgYXNzaWduIGNvbHVtbiB3aWR0aCBub3QgZXEgb2Zmc2V0V2lkdGggaW4gbGFyZ2UgY29sdW1uIHRhYmxlICoqL1xuICAgICAgfTtcbiAgICAgIGxldCBzb3J0Q2FlcnQgPSBjb2x1bW4uc29ydD8oVXRpbC5yZW5kZXJSZWFjdFNvcnRDYXJldChDb25zdC5TT1JUX0RFU0MpKTpudWxsO1xuICAgICAgcmV0dXJuICg8dGggc3R5bGU9e3N0eWxlfSBrZXk9e2l9IGNsYXNzTmFtZT17Y29sdW1uLmNsYXNzTmFtZX0+e2NvbHVtbi50ZXh0fXtzb3J0Q2FlcnR9PC90aD4pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuKFxuICAgICAgPHRoZWFkIHJlZj1cImhlYWRlclwiPlxuICAgICAgICA8dHI+e3NlbGVjdFJvd0hlYWRlcn17dGhlYWRlcn08L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICApXG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU91dChyb3dJbmRleCl7XG4gICAgY29uc3QgdGFyZ2V0Um93ID0gdGhpcy5wcm9wcy5kYXRhW3Jvd0luZGV4LTFdO1xuICAgIHRoaXMucHJvcHMub25Sb3dNb3VzZU91dCh0YXJnZXRSb3cpO1xuICB9XG5cbiAgaGFuZGxlUm93TW91c2VPdmVyKHJvd0luZGV4KXtcbiAgICBjb25zdCB0YXJnZXRSb3cgPSB0aGlzLnByb3BzLmRhdGFbcm93SW5kZXgtMV07XG4gICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3Zlcih0YXJnZXRSb3cpO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2socm93SW5kZXgpe1xuICAgIHZhciBrZXksIHNlbGVjdGVkUm93O1xuICAgIHRoaXMucHJvcHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgaSl7XG4gICAgICBpZihpID09IHJvd0luZGV4LTEpe1xuICAgICAgICBrZXkgPSByb3dbdGhpcy5wcm9wcy5rZXlGaWVsZF07XG4gICAgICAgIHNlbGVjdGVkUm93ID0gcm93O1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhzZWxlY3RlZFJvdyk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3cocm93SW5kZXgsIGlzU2VsZWN0ZWQpe1xuICAgIHZhciBrZXksIHNlbGVjdGVkUm93O1xuICAgIHRoaXMucHJvcHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgaSl7XG4gICAgICBpZihpID09IHJvd0luZGV4LTEpe1xuICAgICAgICBrZXkgPSByb3dbdGhpcy5wcm9wcy5rZXlGaWVsZF07XG4gICAgICAgIHNlbGVjdGVkUm93ID0gcm93O1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdFJvdyhzZWxlY3RlZFJvdywgaXNTZWxlY3RlZCk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3dDb2x1bUNoYW5nZShlKXtcbiAgICBpZighdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCB8fCAhdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsKXtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Um93KFxuICAgICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJvd0luZGV4LCBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRWRpdENlbGwocm93SW5kZXgsIGNvbHVtbkluZGV4KXtcbiAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIGlmKHRoaXMuX2lzU2VsZWN0Um93RGVmaW5lZCgpKXtcbiAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICBpZih0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1uKVxuICAgICAgICBjb2x1bW5JbmRleCsrO1xuICAgIH1cbiAgICByb3dJbmRleC0tO1xuICAgIHZhciBzdGF0ZU9iaiA9IHtcbiAgICAgIGN1cnJFZGl0Q2VsbDoge1xuICAgICAgICByaWQ6IHJvd0luZGV4LFxuICAgICAgICBjaWQ6IGNvbHVtbkluZGV4XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmKHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCl7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdFJvdyhyb3dJbmRleCsxLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZU9iaik7XG4gIH1cblxuICBjYW5jZWxFZGl0KCl7XG4gICAgdmFyIGN1cnJFZGl0Q2VsbD10aGlzLnN0YXRlLmN1cnJFZGl0Q2VsbDtcbiAgICBpZihjdXJyRWRpdENlbGwpe1xuICAgICAgdGhpcy5oYW5kbGVDb21wbGV0ZUVkaXRDZWxsKG51bGwsY3VyckVkaXRDZWxsLnJpZCxjdXJyRWRpdENlbGwuY2lkKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDb21wbGV0ZUVkaXRDZWxsKG5ld1ZhbCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KXtcbiAgICB0aGlzLnNldFN0YXRlKHtjdXJyRWRpdENlbGw6IG51bGx9KTtcbiAgICBpZihudWxsICE9IG5ld1ZhbClcbiAgICAgIHRoaXMucHJvcHMuY2VsbEVkaXQuX19vbkNvbXBsZXRlRWRpdF9fKG5ld1ZhbCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgfVxuXG4gIHJlbmRlclNlbGVjdFJvd0NvbHVtbihzZWxlY3RlZCl7XG4gICAgaWYodGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PSBDb25zdC5ST1dfU0VMRUNUX1NJTkdMRSkge1xuICAgICAgcmV0dXJuICg8VGFibGVDb2x1bW4+PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNoZWNrZWQ9e3NlbGVjdGVkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RSb3dDb2x1bUNoYW5nZS5iaW5kKHRoaXMpfS8+PC9UYWJsZUNvbHVtbj4pO1xuICAgIH1lbHNlIHtcbiAgICAgIHJldHVybiAoPFRhYmxlQ29sdW1uID48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2VsZWN0ZWR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdFJvd0NvbHVtQ2hhbmdlLmJpbmQodGhpcyl9Lz48L1RhYmxlQ29sdW1uPik7XG4gICAgfVxuICB9XG5cbiAgZ2V0Qm9keUhlYWRlckRvbVByb3AoKXtcbiAgICB2YXIgaGVhZGVycyA9IHRoaXMucmVmcy5oZWFkZXIuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzO1xuICAgIHZhciBoZWFkZXJEb21Qcm9wcyA9IFtdO1xuICAgIGZvcihsZXQgaT0wO2k8aGVhZGVycy5sZW5ndGg7aSsrKXtcbiAgICAgIGhlYWRlckRvbVByb3BzLnB1c2goe1xuICAgICAgICB3aWR0aDpoZWFkZXJzW2ldLm9mZnNldFdpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlckRvbVByb3BzO1xuICB9XG5cbiAgYWRqdXN0Qm9keSgpIHtcbiAgICB0aGlzLmhhcmRGaXhIZWFkZXJXaWR0aCgpO1xuICAgIGlmKHRoaXMucHJvcHMuY29uZGVuc2VkKSB7XG4gICAgICB0aGlzLnJlZnMuYm9keS5zdHlsZS5tYXJnaW5Ub3AgPSBcIi0zNnB4XCI7XG4gICAgfVxuXG4gICAgaWYodGhpcy5wcm9wcy5tYXhIZWlnaHQgJiZcbiAgICAgIHBhcnNlSW50KHRoaXMucHJvcHMubWF4SGVpZ2h0KSA8IHRoaXMucmVmcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICB0aGlzLnJlZnMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICh0aGlzLnByb3BzLm1heEhlaWdodCAtIDQyKSArIFwicHhcIjtcbiAgICB9XG4gIH1cblxuICBoYXJkRml4SGVhZGVyV2lkdGgoKXtcbiAgICB2YXIgaGVhZGVycyA9IHRoaXMucmVmcy5oZWFkZXIuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzO1xuICAgIGZvcihsZXQgaT0wO2k8aGVhZGVycy5sZW5ndGg7aSsrKXtcbiAgICAgIGhlYWRlcnNbaV0uc3R5bGUud2lkdGggPSBoZWFkZXJzW2ldLm9mZnNldFdpZHRoICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpe1xuICAgIGlmKHRoaXMucHJvcHMuaGVpZ2h0ID09IFwiMTAwJVwiKSByZXR1cm4gdGhpcy5wcm9wcy5oZWlnaHQ7XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnByb3BzLmhlaWdodCkgLSA0MjtcbiAgICB9XG4gIH1cblxuICBfaXNTZWxlY3RSb3dEZWZpbmVkKCl7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGUgPT09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFIHx8XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9NVUxUSTtcbiAgfVxufVxuVGFibGVCb2R5LnByb3BUeXBlcyA9IHtcbiAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgc3RyaXBlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGJvcmRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgaG92ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjb25kZW5zZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBrZXlGaWVsZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VsZWN0ZWRSb3dLZXlzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gIG9uUm93Q2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdFJvdzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG5vRGF0YVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUJvZHk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUJvZHkuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuXG5jbGFzcyBUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNsaWNrTnVtID0gMDtcbiAgfVxuXG4gIHJvd0NsaWNrKGUpe1xuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIiAmJlxuICAgICAgICBlLnRhcmdldC50YWdOYW1lICE9PSBcIlNFTEVDVFwiICYmXG4gICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgIT09IFwiVEVYVEFSRUFcIikge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLmN1cnJlbnRUYXJnZXQucm93SW5kZXg7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cpIHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdFJvdyhyb3dJbmRleCwgIXRoaXMucHJvcHMuaXNTZWxlY3RlZCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tOdW0rKztcbiAgICAgICAgICAgIC8qKiBpZiBjbGlja1RvU2VsZWN0QW5kRWRpdENlbGwgaXMgZW5hYmxlZCxcbiAgICAgICAgICAgICAqICB0aGVyZSBzaG91bGQgYmUgYSBkZWxheSB0byBwcmV2ZW50IGEgc2VsZWN0aW9uIGNoYW5nZWQgd2hlblxuICAgICAgICAgICAgICogIHVzZXIgZGJsaWNrIHRvIGVkaXQgY2VsbCBvbiBzYW1lIHJvdyBidXQgZGlmZmVyZW50IGNlbGxcbiAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKHRoaXMuY2xpY2tOdW0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0Um93KHJvd0luZGV4LCAhdGhpcy5wcm9wcy5pc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmNsaWNrTnVtID0gMDtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykgdGhpcy5wcm9wcy5vblJvd0NsaWNrKHJvd0luZGV4KTtcbiAgICB9XG4gIH1cblxuICByb3dNb3VzZU91dChlKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dNb3VzZU91dCkge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3V0KGUuY3VycmVudFRhcmdldC5yb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcm93TW91c2VPdmVyKGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd01vdXNlT3Zlcikge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3ZlcihlLmN1cnJlbnRUYXJnZXQucm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICAgIHZhciB0ckNzcz17XG4gICAgICBzdHlsZTp7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5pc1NlbGVjdGVkP3RoaXMucHJvcHMuc2VsZWN0Um93LmJnQ29sb3I6bnVsbFxuICAgICAgfSxcbiAgICAgIGNsYXNzTmFtZToodGhpcy5wcm9wcy5pc1NlbGVjdGVkICYmIHRoaXMucHJvcHMuc2VsZWN0Um93LmNsYXNzTmFtZSA/IHRoaXMucHJvcHMuc2VsZWN0Um93LmNsYXNzTmFtZSA6ICcnKSArICh0aGlzLnByb3BzLmNsYXNzTmFtZXx8JycpXG4gICAgfTtcblxuICAgIGlmKHRoaXMucHJvcHMuc2VsZWN0Um93ICYmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0IHx8XG4gICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpIHx8IHRoaXMucHJvcHMub25Sb3dDbGljayl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ciB7Li4udHJDc3N9XG4gICAgICAgICAgICBvbk1vdXNlT3Zlcj17dGhpcy5yb3dNb3VzZU92ZXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uTW91c2VPdXQ9e3RoaXMucm93TW91c2VPdXQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucm93Q2xpY2suYmluZCh0aGlzKX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC90cj5cbiAgICAgIClcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybihcbiAgICAgICAgPHRyIHsuLi50ckNzc30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC90cj5cbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblRhYmxlUm93LnByb3BUeXBlcyA9IHtcbiAgaXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGVuYWJsZUNlbGxFZGl0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25Sb3dNb3VzZU91dDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUm93TW91c2VPdmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufTtcblRhYmxlUm93LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Sb3dDbGljazogdW5kZWZpbmVkXG59XG5leHBvcnQgZGVmYXVsdCBUYWJsZVJvdztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlUm93LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuY2xhc3MgVGFibGVDb2x1bW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBzaG91bGRVcGRhdGVkID0gdGhpcy5wcm9wcy53aWR0aCAhPT0gbmV4dFByb3BzLndpZHRoXG4gICAgICB8fCB0aGlzLnByb3BzLmNsYXNzTmFtZSAhPT0gbmV4dFByb3BzLmNsYXNzTmFtZVxuICAgICAgfHwgdGhpcy5wcm9wcy5oaWRkZW4gIT09IG5leHRQcm9wcy5oaWRkZW5cbiAgICAgIHx8IHRoaXMucHJvcHMuZGF0YUFsaWduICE9PSBuZXh0UHJvcHMuZGF0YUFsaWduXG4gICAgICB8fCB0eXBlb2YgY2hpbGRyZW4gIT09IHR5cGVvZiBuZXh0UHJvcHMuY2hpbGRyZW5cbiAgICAgIHx8ICgnJyt0aGlzLnByb3BzLm9uRWRpdCkudG9TdHJpbmcoKSAhPT0gKCcnK25leHRQcm9wcy5vbkVkaXQpLnRvU3RyaW5nKClcblxuICAgIGlmKHNob3VsZFVwZGF0ZWQpe1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWQ7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIGNoaWxkcmVuID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gbnVsbCAmJiBjaGlsZHJlbi5wcm9wcyAhPT0gbnVsbCkge1xuICAgICAgaWYoY2hpbGRyZW4ucHJvcHMudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBjaGlsZHJlbi5wcm9wcy50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIHNob3VsZFVwZGF0ZWQgPSBzaG91bGRVcGRhdGVkIHx8XG4gICAgICAgICAgY2hpbGRyZW4ucHJvcHMudHlwZSAhPT0gbmV4dFByb3BzLmNoaWxkcmVuLnByb3BzLnR5cGUgfHxcbiAgICAgICAgICBjaGlsZHJlbi5wcm9wcy5jaGVja2VkICE9PSBuZXh0UHJvcHMuY2hpbGRyZW4ucHJvcHMuY2hlY2tlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3VsZFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG91bGRVcGRhdGVkID0gc2hvdWxkVXBkYXRlZCB8fCBjaGlsZHJlbiAhPT0gbmV4dFByb3BzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIGlmKHNob3VsZFVwZGF0ZWQpe1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWQ7XG4gICAgfVxuXG4gICAgaWYoISh0aGlzLnByb3BzLmNlbGxFZGl0ICYmIG5leHRQcm9wcy5jZWxsRWRpdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNob3VsZFVwZGF0ZWRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlICE9PSBuZXh0UHJvcHMuY2VsbEVkaXQubW9kZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDZWxsRWRpdChlKXtcbiAgICBpZih0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgPT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spe1xuICAgICAgaWYoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSkge1xuICAgICAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgIH0gZWxzZSBpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25FZGl0KFxuICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucm93SW5kZXgsXG4gICAgICBlLmN1cnJlbnRUYXJnZXQuY2VsbEluZGV4KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB3aWR0aCA9IHRoaXMucHJvcHMud2lkdGggPT0gbnVsbD9cbiAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGg6cGFyc2VJbnQodGhpcy5wcm9wcy53aWR0aCk7XG4gICAgdmFyIHRkU3R5bGUgPSB7XG4gICAgICB0ZXh0QWxpZ246IHRoaXMucHJvcHMuZGF0YUFsaWduLFxuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIG1heFdpZHRoOiB3aWR0aFxuICAgIH07XG4gICAgdmFyIGNsYXNzbmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgIGlmKHRoaXMucHJvcHMud2lkdGgpe1xuICAgICAgICBjbGFzc25hbWUgKz0gXCIgY29sLW1kLVwiK3dpZHRoO1xuICAgIH1cblxuXG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBpZih0aGlzLnByb3BzLmNlbGxFZGl0KXtcbiAgICAgIGlmKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PSBDb25zdC5DRUxMX0VESVRfQ0xJQ0spe1xuICAgICAgICBvcHRzLm9uQ2xpY2sgPSB0aGlzLmhhbmRsZUNlbGxFZGl0LmJpbmQodGhpcyk7XG4gICAgICB9ZWxzZSBpZih0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgPT0gQ29uc3QuQ0VMTF9FRElUX0RCQ0xJQ0spe1xuICAgICAgICBvcHRzLm9uRG91YmxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNlbGxFZGl0LmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8dGQgc3R5bGU9e3RkU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NuYW1lfSB7Li4ub3B0c30+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC90ZD5cbiAgICApXG4gIH1cbn1cblRhYmxlQ29sdW1uLnByb3BUeXBlcyA9IHtcbiAgZGF0YUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBoaWRkZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjbGFzc05hbWU6UmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuVGFibGVDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBkYXRhQWxpZ246IFwibGVmdFwiLFxuICBoaWRkZW46IGZhbHNlLFxuICBjbGFzc05hbWU6XCJcIlxufVxuZXhwb3J0IGRlZmF1bHQgVGFibGVDb2x1bW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUNvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vRWRpdG9yJ1xuaW1wb3J0IE5vdGlmaWVyIGZyb20gJy4vTm90aWZpY2F0aW9uLmpzJztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgVGFibGVFZGl0Q29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnRpbWVvdXRlQ2xlYXI9MDtcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBzaGFrZUVkaXRvcjpmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICBoYW5kbGVLZXlQcmVzcyhlKXtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7IC8vUHJlc3NlZCBFTlRFUlxuICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LnR5cGUgPT0gJ2NoZWNrYm94Jz9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q2hlY2tCb3hWYWx1ZShlKTplLmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cbiAgICAgIGlmKCF0aGlzLnZhbGlkYXRvcih2YWx1ZSkpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMuY29tcGxldGVFZGl0KFxuICAgICAgICB2YWx1ZSwgdGhpcy5wcm9wcy5yb3dJbmRleCwgdGhpcy5wcm9wcy5jb2xJbmRleCk7XG4gICAgfWVsc2UgaWYoZS5rZXlDb2RlID09IDI3KXtcbiAgICAgIHRoaXMucHJvcHMuY29tcGxldGVFZGl0KFxuICAgICAgICBudWxsLCB0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVCbHVyKGUpe1xuICAgIGlmKHRoaXMucHJvcHMuYmx1clRvU2F2ZSl7XG4gICAgICBsZXQgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQudHlwZSA9PSAnY2hlY2tib3gnP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRDaGVja0JveFZhbHVlKGUpOmUuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgICAgIGlmKCF0aGlzLnZhbGlkYXRvcih2YWx1ZSkpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMuY29tcGxldGVFZGl0KFxuICAgICAgICAgIHZhbHVlLCB0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbEluZGV4KTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdG9yKHZhbHVlKXtcbiAgICAgIHZhciB0cz10aGlzO1xuICAgICAgaWYodHMucHJvcHMuZWRpdGFibGUudmFsaWRhdG9yKXtcbiAgICAgICAgICB2YXIgdmFsaWQ9dHMucHJvcHMuZWRpdGFibGUudmFsaWRhdG9yKHZhbHVlKTtcbiAgICAgICAgICBpZih2YWxpZCE9PXRydWUpe1xuICAgICAgICAgICAgICB0cy5yZWZzLm5vdGlmaWVyLm5vdGljZSgnZXJyb3InLHZhbGlkLFwiUHJlc3NlZCBFU0MgY2FuIGNhbmNlbFwiKTtcbiAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdHMucmVmcy5pbnB1dFJlZjtcbiAgICAgICAgICAgICAgLy9hbmltYXRlIGlucHV0XG4gICAgICAgICAgICAgIHRzLmNsZWFyVGltZW91dCgpO1xuICAgICAgICAgICAgICB0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6dHJ1ZX0pO1xuICAgICAgICAgICAgICB0cy50aW1lb3V0ZUNsZWFyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6ZmFsc2V9KTt9LDMwMCk7XG4gICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICB9XG4gIGNsZWFyVGltZW91dCgpe1xuICAgICAgaWYodGhpcy50aW1lb3V0ZUNsZWFyIT0wKXtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0ZUNsZWFyKTtcbiAgICAgICAgICB0aGlzLnRpbWVvdXRlQ2xlYXI9MDtcbiAgICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLmlucHV0UmVmO1xuICAgICAgLy8gaW5wdXQudmFsdWUgPSB0aGlzLnByb3BzLmNoaWxkcmVufHwnJztcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIGVkaXRhYmxlPXRoaXMucHJvcHMuZWRpdGFibGUsXG4gICAgICAgIGZvcm1hdD10aGlzLnByb3BzLmZvcm1hdCxcbiAgICAgICAgYXR0cj17XG4gICAgICAgICAgICByZWY6XCJpbnB1dFJlZlwiLFxuICAgICAgICAgICAgb25LZXlEb3duOnRoaXMuaGFuZGxlS2V5UHJlc3MuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIG9uQmx1cjp0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzKVxuICAgICAgICB9O1xuICAgICAgICAvL3B1dCBwbGFjZWhvbGRlciBpZiBleGlzdFxuICAgICAgICBlZGl0YWJsZS5wbGFjZWhvbGRlciYmKGF0dHIucGxhY2Vob2xkZXI9ZWRpdGFibGUucGxhY2Vob2xkZXIpO1xuXG4gICAgdmFyIGVkaXRvckNsYXNzPWNsYXNzU2V0KHsnYW5pbWF0ZWQnOnRoaXMuc3RhdGUuc2hha2VFZGl0b3IsJ3NoYWtlJzp0aGlzLnN0YXRlLnNoYWtlRWRpdG9yfSk7XG4gICAgcmV0dXJuKFxuICAgICAgICA8dGQgcmVmPVwidGRcIiBzdHlsZT17e3Bvc2l0aW9uOidyZWxhdGl2ZSd9fT5cbiAgICAgICAgICAgIHtFZGl0b3IoZWRpdGFibGUsYXR0cixmb3JtYXQsZWRpdG9yQ2xhc3MsdGhpcy5wcm9wcy5jaGlsZHJlbnx8JycpfVxuICAgICAgICAgICAgPE5vdGlmaWVyIHJlZj1cIm5vdGlmaWVyXCI+PC9Ob3RpZmllcj5cbiAgICAgICAgPC90ZD5cbiAgICApXG4gIH1cblxuICBfZ2V0Q2hlY2tCb3hWYWx1ZShlKXtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICBsZXQgdmFsdWVzID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZD92YWx1ZXNbMF06dmFsdWVzWzFdO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG59XG5UYWJsZUVkaXRDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBjb21wbGV0ZUVkaXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICByb3dJbmRleDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgY29sSW5kZXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIGJsdXJUb1NhdmU6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlRWRpdENvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlRWRpdENvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgRWRpdG9yPWZ1bmN0aW9uKGVkaXRhYmxlLCBhdHRyLCBmb3JtYXQsIGVkaXRvckNsYXNzLCBkZWZhdWx0VmFsdWUpe1xuXG5cbiAgICBpZihlZGl0YWJsZT09PXRydWV8fHR5cGVvZiBlZGl0YWJsZT09PVwic3RyaW5nXCIpey8vc2ltcGxlIGRlY2xhcmVcbiAgICAgICAgdmFyIHR5cGU9ZWRpdGFibGU9PT10cnVlPyd0ZXh0JzplZGl0YWJsZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT17dHlwZX0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsoZWRpdG9yQ2xhc3N8fFwiXCIpK1wiIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0XCJ9IC8+XG4gICAgICAgIClcbiAgICB9IGVsc2UgaWYoIWVkaXRhYmxlKXtcbiAgICAgIHZhciB0eXBlPWVkaXRhYmxlPT09dHJ1ZT8ndGV4dCc6ZWRpdGFibGU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT17dHlwZX0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9IGRpc2FibGVkPSdkaXNhYmxlZCdcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsoZWRpdG9yQ2xhc3N8fFwiXCIpK1wiIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0XCJ9IC8+XG4gICAgICApXG4gICAgfSBlbHNlIGlmKGVkaXRhYmxlLnR5cGUpey8vc3RhbmRhcmQgZGVjbGFyZVxuICAgICAgICAvL3B1dCBzdHlsZSBpZiBleGlzdFxuICAgICAgICBlZGl0YWJsZS5zdHlsZSYmKGF0dHIuc3R5bGU9ZWRpdGFibGUuc3R5bGUpO1xuXG4gICAgICAgIC8vcHV0IGNsYXNzIGlmIGV4aXN0XG4gICAgICAgIGF0dHIuY2xhc3NOYW1lID0gKGVkaXRvckNsYXNzfHxcIlwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCIgZm9ybS1jb250cm9sIGVkaXRvciBlZGl0LVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZS50eXBlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAoZWRpdGFibGUuY2xhc3NOYW1lPyhcIiBcIitlZGl0YWJsZS5jbGFzc05hbWUpOlwiXCIpO1xuXG4gICAgICAgIGlmKGVkaXRhYmxlLnR5cGUgPT09ICdzZWxlY3QnKXsvL3Byb2Nlc3Mgc2VsZWN0IGlucHV0XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IFtdLCB2YWx1ZXM9ZWRpdGFibGUub3B0aW9ucy52YWx1ZXM7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHZhbHVlcykpey8vb25seSBjYW4gdXNlIGFycnJheSBkYXRhIGZvciBvcHRpb25zXG4gICAgICAgICAgICAgICAgdmFyIHJvd1ZhbHVlO1xuICAgICAgICAgICAgICAgIG9wdGlvbnM9dmFsdWVzLm1hcChmdW5jdGlvbihkLGkpe1xuICAgICAgICAgICAgICAgICAgICByb3dWYWx1ZT1mb3JtYXQ/Zm9ybWF0KGQpOmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXsnb3B0aW9uJytpfSB2YWx1ZT17ZH0+e3Jvd1ZhbHVlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgPHNlbGVjdCB7Li4uYXR0cn0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9PntvcHRpb25zfTwvc2VsZWN0PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmKGVkaXRhYmxlLnR5cGUgPT09ICd0ZXh0YXJlYScpey8vcHJvY2VzcyB0ZXh0YXJlYSBpbnB1dFxuICAgICAgICAgICAgLy9wdXQgIG90aGVyIGlmIGV4aXN0XG4gICAgICAgICAgICBlZGl0YWJsZS5jb2xzJiYoYXR0ci5jb2xzPWVkaXRhYmxlLmNvbHMpO1xuICAgICAgICAgICAgZWRpdGFibGUucm93cyYmKGF0dHIucm93cz1lZGl0YWJsZS5yb3dzKTtcbiAgICAgICAgICAgIHZhciBrZXlVcEhhbmRsZXI9YXR0ci5vbktleURvd24sc2F2ZUJ0bj1udWxsO1xuICAgICAgICAgICAgaWYoa2V5VXBIYW5kbGVyKXtcbiAgICAgICAgICAgICAgICBhdHRyLm9uS2V5RG93bj1mdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPSAxMykgeyAvL25vdCBQcmVzc2VkIEVOVEVSXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlVcEhhbmRsZXIoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNhdmVCdG49PGJ1dHRvIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBidG4teHMgdGV4dGFyZWEtc2F2ZS1idG5cIiBvbkNsaWNrPXtrZXlVcEhhbmRsZXJ9PnNhdmU8L2J1dHRvPlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHsuLi5hdHRyfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX0+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAge3NhdmVCdG59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZihlZGl0YWJsZS50eXBlID09PSAnY2hlY2tib3gnKXtcbiAgICAgICAgICBsZXQgdmFsdWVzID0gJ3RydWU6ZmFsc2UnO1xuICAgICAgICAgIGlmKGVkaXRhYmxlLm9wdGlvbnMgJiYgZWRpdGFibGUub3B0aW9ucy52YWx1ZXMpe1xuICAgICAgICAgICAgLy8gdmFsdWVzID0gZWRpdGFibGUub3B0aW9ucy52YWx1ZXMuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIHZhbHVlcyA9IGVkaXRhYmxlLm9wdGlvbnMudmFsdWVzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhdHRyLmNsYXNzTmFtZSA9IGF0dHIuY2xhc3NOYW1lLnJlcGxhY2UoJ2Zvcm0tY29udHJvbCcsJycpO1xuICAgICAgICAgIGF0dHIuY2xhc3NOYW1lICs9ICcgY2hlY2tib3ggcHVsbC1yaWdodCc7XG5cbiAgICAgICAgICBsZXQgY2hlY2tlZCA9IGRlZmF1bHRWYWx1ZSAmJiBkZWZhdWx0VmFsdWUudG9TdHJpbmcoKSA9PSB2YWx1ZXMuc3BsaXQoJzonKVswXT90cnVlOmZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT0nY2hlY2tib3gnIHZhbHVlPXt2YWx1ZXN9IGRlZmF1bHRDaGVja2VkPXtjaGVja2VkfS8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNley8vcHJvY2VzcyBvdGhlciBpbnB1dCB0eXBlLiBhcyBwYXNzd29yZCx1cmwsZW1haWwuLi5cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLmF0dHJ9IHR5cGU9e3R5cGV9IGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfS8+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9kZWZhdWx0IHJldHVybiBmb3Igb3RoZXIgY2FzZSBvZiBlZGl0YWJsZVxuICAgIHJldHVybihcbiAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT17KGVkaXRvckNsYXNzfHxcIlwiKStcIiBmb3JtLWNvbnRyb2wgZWRpdG9yIGVkaXQtdGV4dFwifS8+XG4gICAgKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRWRpdG9yLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcblxuaW1wb3J0IHtcbiAgVG9hc3RDb250YWluZXIsXG4gIFRvYXN0TWVzc2FnZSxcbn0gZnJvbSBcInJlYWN0LXRvYXN0clwiO1xuXG5cbnZhciBUb2FzdHJNZXNzYWdlRmFjdG9yeT1SZWFjdC5jcmVhdGVGYWN0b3J5KFRvYXN0TWVzc2FnZS5hbmltYXRpb24pO1xuXG5jbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gIC8vIGFsbG93IHR5cGUgaXMgc3VjY2VzcyxpbmZvLHdhcm5pbmcsZXJyb3JcbiAgbm90aWNlKHR5cGUsbXNnLHRpdGxlKXtcbiAgICB0aGlzLnJlZnMudG9hc3RyW3R5cGVdKFxuICAgICAgICBtc2csdGl0bGUsIHtcbiAgICAgICAgICBtb2RlOidzaW5nbGUnLFxuICAgICAgICAgIHRpbWVPdXQ6IDUwMDAsXG4gICAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxuICAgICAgICAgIHNob3dBbmltYXRpb246IFwiYW5pbWF0ZWQgIGJvdW5jZUluXCIsXG4gICAgICAgICAgaGlkZUFuaW1hdGlvbjogXCJhbmltYXRlZCBib3VuY2VPdXRcIlxuICAgICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHJldHVybihcbiAgICAgICAgPFRvYXN0Q29udGFpbmVyIHJlZj1cInRvYXN0clwiIHRvYXN0TWVzc2FnZUZhY3Rvcnk9e1RvYXN0ck1lc3NhZ2VGYWN0b3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwidG9hc3QtY29udGFpbmVyXCIgIGNsYXNzTmFtZT1cInRvYXN0LXRvcC1yaWdodFwiPjwvVG9hc3RDb250YWluZXI+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL05vdGlmaWNhdGlvbi5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Ub2FzdE1lc3NhZ2UgPSBleHBvcnRzLlRvYXN0Q29udGFpbmVyID0gdW5kZWZpbmVkO1xuXG52YXIgX1RvYXN0Q29udGFpbmVyID0gcmVxdWlyZShcIi4vVG9hc3RDb250YWluZXJcIik7XG5cbnZhciBfVG9hc3RDb250YWluZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9hc3RDb250YWluZXIpO1xuXG52YXIgX1RvYXN0TWVzc2FnZSA9IHJlcXVpcmUoXCIuL1RvYXN0TWVzc2FnZVwiKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9hc3RNZXNzYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5Ub2FzdENvbnRhaW5lciA9IF9Ub2FzdENvbnRhaW5lcjIuZGVmYXVsdDtcbmV4cG9ydHMuVG9hc3RNZXNzYWdlID0gX1RvYXN0TWVzc2FnZTIuZGVmYXVsdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZSA9IHJlcXVpcmUoXCJyZWFjdC1hZGRvbnMtdXBkYXRlXCIpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zVXBkYXRlKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UgPSByZXF1aXJlKFwiLi9Ub2FzdE1lc3NhZ2VcIik7XG5cbnZhciBfVG9hc3RNZXNzYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RvYXN0TWVzc2FnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFRvYXN0Q29udGFpbmVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFRvYXN0Q29udGFpbmVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBUb2FzdENvbnRhaW5lcigpIHtcbiAgICB2YXIgX09iamVjdCRnZXRQcm90b3R5cGVPO1xuXG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUb2FzdENvbnRhaW5lcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChfT2JqZWN0JGdldFByb3RvdHlwZU8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVG9hc3RDb250YWluZXIpKS5jYWxsLmFwcGx5KF9PYmplY3QkZ2V0UHJvdG90eXBlTywgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnN0YXRlID0ge1xuICAgICAgdG9hc3RzOiBbXSxcbiAgICAgIHRvYXN0SWQ6IDAsXG4gICAgICBwcmV2aW91c01lc3NhZ2U6IG51bGxcbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUb2FzdENvbnRhaW5lciwgW3tcbiAgICBrZXk6IFwiZXJyb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLmVycm9yLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS5pbmZvLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3VjY2Vzc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS5zdWNjZXNzLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwid2FybmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuX25vdGlmeSh0aGlzLnByb3BzLnRvYXN0VHlwZS53YXJuaW5nLCBtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5yZWZzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX3RoaXMyLnJlZnNba2V5XS5oaWRlVG9hc3QoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgeyBcImFyaWEtbGl2ZVwiOiBcInBvbGl0ZVwiLCByb2xlOiBcImFsZXJ0XCIgfSksXG4gICAgICAgIHRoaXMuc3RhdGUudG9hc3RzLm1hcChmdW5jdGlvbiAodG9hc3QpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLnByb3BzLnRvYXN0TWVzc2FnZUZhY3RvcnkodG9hc3QpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX25vdGlmeVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfbm90aWZ5KHR5cGUsIG1lc3NhZ2UsIHRpdGxlKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIG9wdGlvbnNPdmVycmlkZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzNdO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5wcmV2ZW50RHVwbGljYXRlcykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wcmV2aW91c01lc3NhZ2UgPT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBrZXkgPSB0aGlzLnN0YXRlLnRvYXN0SWQrKztcbiAgICAgIHZhciB0b2FzdElkID0ga2V5O1xuICAgICAgdmFyIG5ld1RvYXN0ID0gKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkob3B0aW9uc092ZXJyaWRlLCB7XG4gICAgICAgICRtZXJnZToge1xuICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgdG9hc3RJZDogdG9hc3RJZCxcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICByZWY6IFwidG9hc3RzX19cIiArIGtleSxcbiAgICAgICAgICBoYW5kbGVPbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVPbkNsaWNrKGUpIHtcbiAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBvcHRpb25zT3ZlcnJpZGUuaGFuZGxlT25DbGljaykge1xuICAgICAgICAgICAgICBvcHRpb25zT3ZlcnJpZGUuaGFuZGxlT25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzNC5faGFuZGxlX3RvYXN0X29uX2NsaWNrKGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGFuZGxlUmVtb3ZlOiB0aGlzLl9oYW5kbGVfdG9hc3RfcmVtb3ZlLmJpbmQodGhpcylcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgdG9hc3RPcGVyYXRpb24gPSBfZGVmaW5lUHJvcGVydHkoe30sIFwiXCIgKyAodGhpcy5wcm9wcy5uZXdlc3RPblRvcCA/IFwiJHVuc2hpZnRcIiA6IFwiJHB1c2hcIiksIFtuZXdUb2FzdF0pO1xuXG4gICAgICB2YXIgbmV4dFN0YXRlID0gKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkodGhpcy5zdGF0ZSwge1xuICAgICAgICB0b2FzdHM6IHRvYXN0T3BlcmF0aW9uLFxuICAgICAgICBwcmV2aW91c01lc3NhZ2U6IHsgJHNldDogbWVzc2FnZSB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2hhbmRsZV90b2FzdF9vbl9jbGlja1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlX3RvYXN0X29uX2NsaWNrKGV2ZW50KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaGFuZGxlX3RvYXN0X3JlbW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlX3RvYXN0X3JlbW92ZSh0b2FzdElkKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIG9wZXJhdGlvbk5hbWUgPSBcIlwiICsgKHRoaXMucHJvcHMubmV3ZXN0T25Ub3AgPyBcInJlZHVjZVJpZ2h0XCIgOiBcInJlZHVjZVwiKTtcbiAgICAgIHRoaXMuc3RhdGUudG9hc3RzW29wZXJhdGlvbk5hbWVdKGZ1bmN0aW9uIChmb3VuZCwgdG9hc3QsIGluZGV4KSB7XG4gICAgICAgIGlmIChmb3VuZCB8fCB0b2FzdC50b2FzdElkICE9PSB0b2FzdElkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzNS5zZXRTdGF0ZSgoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShfdGhpczUuc3RhdGUsIHtcbiAgICAgICAgICB0b2FzdHM6IHsgJHNwbGljZTogW1tpbmRleCwgMV1dIH1cbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVG9hc3RDb250YWluZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Ub2FzdENvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XG4gIHRvYXN0VHlwZToge1xuICAgIGVycm9yOiBcImVycm9yXCIsXG4gICAgaW5mbzogXCJpbmZvXCIsXG4gICAgc3VjY2VzczogXCJzdWNjZXNzXCIsXG4gICAgd2FybmluZzogXCJ3YXJuaW5nXCJcbiAgfSxcbiAgaWQ6IFwidG9hc3QtY29udGFpbmVyXCIsXG4gIHRvYXN0TWVzc2FnZUZhY3Rvcnk6IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVGYWN0b3J5KF9Ub2FzdE1lc3NhZ2UyLmRlZmF1bHQpLFxuICBwcmV2ZW50RHVwbGljYXRlczogZmFsc2UsXG4gIG5ld2VzdE9uVG9wOiB0cnVlLFxuICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge31cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBUb2FzdENvbnRhaW5lcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0Q29udGFpbmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncmVhY3QvbGliL3VwZGF0ZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9+L3JlYWN0LWFkZG9ucy11cGRhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHVwZGF0ZVxuICovXG5cbi8qIGdsb2JhbCBoYXNPd25Qcm9wZXJ0eTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vT2JqZWN0LmFzc2lnbicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9ICh7fSkuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KHgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICByZXR1cm4geC5jb25jYXQoKTtcbiAgfSBlbHNlIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBhc3NpZ24obmV3IHguY29uc3RydWN0b3IoKSwgeCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbn1cblxudmFyIENPTU1BTkRfUFVTSCA9IGtleU9mKHsgJHB1c2g6IG51bGwgfSk7XG52YXIgQ09NTUFORF9VTlNISUZUID0ga2V5T2YoeyAkdW5zaGlmdDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NQTElDRSA9IGtleU9mKHsgJHNwbGljZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NFVCA9IGtleU9mKHsgJHNldDogbnVsbCB9KTtcbnZhciBDT01NQU5EX01FUkdFID0ga2V5T2YoeyAkbWVyZ2U6IG51bGwgfSk7XG52YXIgQ09NTUFORF9BUFBMWSA9IGtleU9mKHsgJGFwcGx5OiBudWxsIH0pO1xuXG52YXIgQUxMX0NPTU1BTkRTX0xJU1QgPSBbQ09NTUFORF9QVVNILCBDT01NQU5EX1VOU0hJRlQsIENPTU1BTkRfU1BMSUNFLCBDT01NQU5EX1NFVCwgQ09NTUFORF9NRVJHRSwgQ09NTUFORF9BUFBMWV07XG5cbnZhciBBTExfQ09NTUFORFNfU0VUID0ge307XG5cbkFMTF9DT01NQU5EU19MSVNULmZvckVhY2goZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgQUxMX0NPTU1BTkRTX1NFVFtjb21tYW5kXSA9IHRydWU7XG59KTtcblxuZnVuY3Rpb24gaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBjb21tYW5kKSB7XG4gICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgdGFyZ2V0IG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuJywgY29tbWFuZCwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHNwZWNWYWx1ZSA9IHNwZWNbY29tbWFuZF07XG4gICFBcnJheS5pc0FycmF5KHNwZWNWYWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVyIGluIGFuIGFycmF5PycsIGNvbW1hbmQsIHNwZWNWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUodmFsdWUsIHNwZWMpIHtcbiAgISh0eXBlb2Ygc3BlYyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBZb3UgcHJvdmlkZWQgYSBrZXkgcGF0aCB0byB1cGRhdGUoKSB0aGF0IGRpZCBub3QgY29udGFpbiBvbmUgJyArICdvZiAlcy4gRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSB7JXM6IC4uLn0/JywgQUxMX0NPTU1BTkRTX0xJU1Quam9pbignLCAnKSwgQ09NTUFORF9TRVQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NFVCkpIHtcbiAgICAhKE9iamVjdC5rZXlzKHNwZWMpLmxlbmd0aCA9PT0gMSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBrZXkgaW4gYW4gb2JqZWN0IHdpdGggJXMnLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHNwZWNbQ09NTUFORF9TRVRdO1xuICB9XG5cbiAgdmFyIG5leHRWYWx1ZSA9IHNoYWxsb3dDb3B5KHZhbHVlKTtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX01FUkdFKSkge1xuICAgIHZhciBtZXJnZU9iaiA9IHNwZWNbQ09NTUFORF9NRVJHRV07XG4gICAgIShtZXJnZU9iaiAmJiB0eXBlb2YgbWVyZ2VPYmogPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHNwZWMgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG1lcmdlT2JqKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgIShuZXh0VmFsdWUgJiYgdHlwZW9mIG5leHRWYWx1ZSA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgdGFyZ2V0IG9mIHR5cGUgXFwnb2JqZWN0XFwnOyBnb3QgJXMnLCBDT01NQU5EX01FUkdFLCBuZXh0VmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBhc3NpZ24obmV4dFZhbHVlLCBzcGVjW0NPTU1BTkRfTUVSR0VdKTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfUFVTSCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfUFVTSCk7XG4gICAgc3BlY1tDT01NQU5EX1BVU0hdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9VTlNISUZUKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9VTlNISUZUKTtcbiAgICBzcGVjW0NPTU1BTkRfVU5TSElGVF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnVuc2hpZnQoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NQTElDRSkpIHtcbiAgICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgJXMgdGFyZ2V0IHRvIGJlIGFuIGFycmF5OyBnb3QgJXMnLCBDT01NQU5EX1NQTElDRSwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhQXJyYXkuaXNBcnJheShzcGVjW0NPTU1BTkRfU1BMSUNFXSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgc3BlY1tDT01NQU5EX1NQTElDRV0uZm9yRWFjaChmdW5jdGlvbiAoYXJncykge1xuICAgICAgIUFycmF5LmlzQXJyYXkoYXJncykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICBuZXh0VmFsdWUuc3BsaWNlLmFwcGx5KG5leHRWYWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX0FQUExZKSkge1xuICAgICEodHlwZW9mIHNwZWNbQ09NTUFORF9BUFBMWV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGEgZnVuY3Rpb247IGdvdCAlcy4nLCBDT01NQU5EX0FQUExZLCBzcGVjW0NPTU1BTkRfQVBQTFldKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgbmV4dFZhbHVlID0gc3BlY1tDT01NQU5EX0FQUExZXShuZXh0VmFsdWUpO1xuICB9XG5cbiAgZm9yICh2YXIgayBpbiBzcGVjKSB7XG4gICAgaWYgKCEoQUxMX0NPTU1BTkRTX1NFVC5oYXNPd25Qcm9wZXJ0eShrKSAmJiBBTExfQ09NTUFORFNfU0VUW2tdKSkge1xuICAgICAgbmV4dFZhbHVlW2tdID0gdXBkYXRlKHZhbHVlW2tdLCBzcGVjW2tdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvdXBkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgT2JqZWN0LmFzc2lnblxuICovXG5cbi8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QuYXNzaWduXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlPZlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlPZiA9IGZ1bmN0aW9uIChvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5qUXVlcnkgPSBleHBvcnRzLmFuaW1hdGlvbiA9IHVuZGVmaW5lZDtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNVcGRhdGUgPSByZXF1aXJlKFwicmVhY3QtYWRkb25zLXVwZGF0ZVwiKTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1VwZGF0ZSk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfYW5pbWF0aW9uTWl4aW4gPSByZXF1aXJlKFwiLi9hbmltYXRpb25NaXhpblwiKTtcblxudmFyIF9hbmltYXRpb25NaXhpbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hbmltYXRpb25NaXhpbik7XG5cbnZhciBfalF1ZXJ5TWl4aW4gPSByZXF1aXJlKFwiLi9qUXVlcnlNaXhpblwiKTtcblxudmFyIF9qUXVlcnlNaXhpbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qUXVlcnlNaXhpbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgVG9hc3RNZXNzYWdlU3BlYyA9IHtcbiAgZGlzcGxheU5hbWU6IFwiVG9hc3RNZXNzYWdlXCIsXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgdmFyIGljb25DbGFzc05hbWVzID0ge1xuICAgICAgZXJyb3I6IFwidG9hc3QtZXJyb3JcIixcbiAgICAgIGluZm86IFwidG9hc3QtaW5mb1wiLFxuICAgICAgc3VjY2VzczogXCJ0b2FzdC1zdWNjZXNzXCIsXG4gICAgICB3YXJuaW5nOiBcInRvYXN0LXdhcm5pbmdcIlxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NOYW1lOiBcInRvYXN0XCIsXG4gICAgICBpY29uQ2xhc3NOYW1lczogaWNvbkNsYXNzTmFtZXMsXG4gICAgICB0aXRsZUNsYXNzTmFtZTogXCJ0b2FzdC10aXRsZVwiLFxuICAgICAgbWVzc2FnZUNsYXNzTmFtZTogXCJ0b2FzdC1tZXNzYWdlXCIsXG4gICAgICB0YXBUb0Rpc21pc3M6IHRydWUsXG4gICAgICBjbG9zZUJ1dHRvbjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBoYW5kbGVPbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVPbkNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVPbkNsaWNrKGV2ZW50KTtcbiAgICBpZiAodGhpcy5wcm9wcy50YXBUb0Rpc21pc3MpIHtcbiAgICAgIHRoaXMuaGlkZVRvYXN0KHRydWUpO1xuICAgIH1cbiAgfSxcbiAgX2hhbmRsZV9jbG9zZV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uIF9oYW5kbGVfY2xvc2VfYnV0dG9uX2NsaWNrKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5oaWRlVG9hc3QodHJ1ZSk7XG4gIH0sXG4gIF9oYW5kbGVfcmVtb3ZlOiBmdW5jdGlvbiBfaGFuZGxlX3JlbW92ZSgpIHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZVJlbW92ZSh0aGlzLnByb3BzLnRvYXN0SWQpO1xuICB9LFxuICBfcmVuZGVyX2Nsb3NlX2J1dHRvbjogZnVuY3Rpb24gX3JlbmRlcl9jbG9zZV9idXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2xvc2VCdXR0b24gPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwidG9hc3QtY2xvc2UtYnV0dG9uXCIsIHJvbGU6IFwiYnV0dG9uXCIsXG4gICAgICBvbkNsaWNrOiB0aGlzLl9oYW5kbGVfY2xvc2VfYnV0dG9uX2NsaWNrLFxuICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiBcIiZ0aW1lcztcIiB9XG4gICAgfSkgOiBmYWxzZTtcbiAgfSxcbiAgX3JlbmRlcl90aXRsZV9lbGVtZW50OiBmdW5jdGlvbiBfcmVuZGVyX3RpdGxlX2VsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy50aXRsZUNsYXNzTmFtZSB9LFxuICAgICAgdGhpcy5wcm9wcy50aXRsZVxuICAgICkgOiBmYWxzZTtcbiAgfSxcbiAgX3JlbmRlcl9tZXNzYWdlX2VsZW1lbnQ6IGZ1bmN0aW9uIF9yZW5kZXJfbWVzc2FnZV9lbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1lc3NhZ2UgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5tZXNzYWdlQ2xhc3NOYW1lIH0sXG4gICAgICB0aGlzLnByb3BzLm1lc3NhZ2VcbiAgICApIDogZmFsc2U7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBpY29uQ2xhc3NOYW1lID0gdGhpcy5wcm9wcy5pY29uQ2xhc3NOYW1lIHx8IHRoaXMucHJvcHMuaWNvbkNsYXNzTmFtZXNbdGhpcy5wcm9wcy50eXBlXTtcblxuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSh0aGlzLnByb3BzLmNsYXNzTmFtZSwgaWNvbkNsYXNzTmFtZSksXG4gICAgICAgIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZU9uQ2xpY2ssXG4gICAgICAgIG9uTW91c2VFbnRlcjogdGhpcy5oYW5kbGVNb3VzZUVudGVyLFxuICAgICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZVxuICAgICAgfSxcbiAgICAgIHRoaXMuX3JlbmRlcl9jbG9zZV9idXR0b24oKSxcbiAgICAgIHRoaXMuX3JlbmRlcl90aXRsZV9lbGVtZW50KCksXG4gICAgICB0aGlzLl9yZW5kZXJfbWVzc2FnZV9lbGVtZW50KClcbiAgICApO1xuICB9XG59O1xuXG52YXIgYW5pbWF0aW9uID0gZXhwb3J0cy5hbmltYXRpb24gPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3MoKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkoVG9hc3RNZXNzYWdlU3BlYywge1xuICBkaXNwbGF5TmFtZTogeyAkc2V0OiBcIlRvYXN0TWVzc2FnZS5hbmltYXRpb25cIiB9LFxuICBtaXhpbnM6IHsgJHNldDogW19hbmltYXRpb25NaXhpbjIuZGVmYXVsdF0gfVxufSkpO1xuXG52YXIgalF1ZXJ5ID0gZXhwb3J0cy5qUXVlcnkgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3MoKDAsIF9yZWFjdEFkZG9uc1VwZGF0ZTIuZGVmYXVsdCkoVG9hc3RNZXNzYWdlU3BlYywge1xuICBkaXNwbGF5TmFtZTogeyAkc2V0OiBcIlRvYXN0TWVzc2FnZS5qUXVlcnlcIiB9LFxuICBtaXhpbnM6IHsgJHNldDogW19qUXVlcnlNaXhpbjIuZGVmYXVsdF0gfVxufSkpO1xuXG4vKlxuICogYXNzaWduIGRlZmF1bHQgbm9vcCBmdW5jdGlvbnNcbiAqL1xuVG9hc3RNZXNzYWdlU3BlYy5oYW5kbGVNb3VzZUVudGVyID0gbm9vcDtcblRvYXN0TWVzc2FnZVNwZWMuaGFuZGxlTW91c2VMZWF2ZSA9IG5vb3A7XG5Ub2FzdE1lc3NhZ2VTcGVjLmhpZGVUb2FzdCA9IG5vb3A7XG5cbnZhciBUb2FzdE1lc3NhZ2UgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3MoVG9hc3RNZXNzYWdlU3BlYyk7XG5cblRvYXN0TWVzc2FnZS5hbmltYXRpb24gPSBhbmltYXRpb247XG5Ub2FzdE1lc3NhZ2UualF1ZXJ5ID0galF1ZXJ5O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUb2FzdE1lc3NhZ2U7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQ1NTQ29yZSA9IHJlcXVpcmUoXCJmYmpzL2xpYi9DU1NDb3JlXCIpO1xuXG52YXIgX0NTU0NvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ1NTQ29yZSk7XG5cbnZhciBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzID0gcmVxdWlyZShcInJlYWN0L2xpYi9SZWFjdFRyYW5zaXRpb25FdmVudHNcIik7XG5cbnZhciBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1JlYWN0VHJhbnNpdGlvbkV2ZW50cyk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRJQ0sgPSAxNztcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2l0aW9uOiBudWxsLCAvLyBzb21lIGV4YW1wbGVzIGRlZmluZWQgaW4gaW5kZXguc2NzcyAoc2NhbGUsIGZhZGVJbk91dCwgcm90YXRlKVxuICAgICAgc2hvd0FuaW1hdGlvbjogXCJhbmltYXRlZCBib3VuY2VJblwiLCAvLyBvciBvdGhlciBhbmltYXRpb25zIGZyb20gYW5pbWF0ZS5jc3NcbiAgICAgIGhpZGVBbmltYXRpb246IFwiYW5pbWF0ZWQgYm91bmNlT3V0XCIsXG4gICAgICB0aW1lT3V0OiA1MDAwLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5jbGFzc05hbWVRdWV1ZSA9IFtdO1xuICAgIHRoaXMuaXNIaWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmludGVydmFsSWQgPSBudWxsO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX2lzX21vdW50ZWQgPSB0cnVlO1xuICAgIHRoaXMuX3Nob3coKTtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgIHZhciBvbkhpZGVDb21wbGV0ZSA9IGZ1bmN0aW9uIG9uSGlkZUNvbXBsZXRlKCkge1xuICAgICAgaWYgKF90aGlzLmlzSGlkaW5nKSB7XG4gICAgICAgIF90aGlzLl9zZXRfaXNfaGlkaW5nKGZhbHNlKTtcbiAgICAgICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5yZW1vdmVFbmRFdmVudExpc3RlbmVyKG5vZGUsIG9uSGlkZUNvbXBsZXRlKTtcbiAgICAgICAgX3RoaXMuX2hhbmRsZV9yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQuYWRkRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBvbkhpZGVDb21wbGV0ZSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMudGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX2lzX21vdW50ZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbElkKTtcbiAgICB9XG4gIH0sXG4gIF9zZXRfdHJhbnNpdGlvbjogZnVuY3Rpb24gX3NldF90cmFuc2l0aW9uKGhpZGUpIHtcbiAgICB2YXIgYW5pbWF0aW9uVHlwZSA9IGhpZGUgPyBcImxlYXZlXCIgOiBcImVudGVyXCI7XG4gICAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcyk7XG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMucHJvcHMudHJhbnNpdGlvbiArIFwiLVwiICsgYW5pbWF0aW9uVHlwZTtcbiAgICB2YXIgYWN0aXZlQ2xhc3NOYW1lID0gY2xhc3NOYW1lICsgXCItYWN0aXZlXCI7XG5cbiAgICB2YXIgZW5kTGlzdGVuZXIgPSBmdW5jdGlvbiBlbmRMaXN0ZW5lcihlKSB7XG4gICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG4gICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuXG4gICAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LnJlbW92ZUVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuICAgIH07XG5cbiAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LmFkZEVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuXG4gICAgX0NTU0NvcmUyLmRlZmF1bHQuYWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcblxuICAgIC8vIE5lZWQgdG8gZG8gdGhpcyB0byBhY3R1YWxseSB0cmlnZ2VyIGEgdHJhbnNpdGlvbi5cbiAgICB0aGlzLl9xdWV1ZV9jbGFzcyhhY3RpdmVDbGFzc05hbWUpO1xuICB9LFxuICBfY2xlYXJfdHJhbnNpdGlvbjogZnVuY3Rpb24gX2NsZWFyX3RyYW5zaXRpb24oaGlkZSkge1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHZhciBhbmltYXRpb25UeXBlID0gaGlkZSA/IFwibGVhdmVcIiA6IFwiZW50ZXJcIjtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy50cmFuc2l0aW9uICsgXCItXCIgKyBhbmltYXRpb25UeXBlO1xuICAgIHZhciBhY3RpdmVDbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIi1hY3RpdmVcIjtcblxuICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG4gICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcbiAgfSxcbiAgX3NldF9hbmltYXRpb246IGZ1bmN0aW9uIF9zZXRfYW5pbWF0aW9uKGhpZGUpIHtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IHRoaXMuX2dldF9hbmltYXRpb25fY2xhc3NlcyhoaWRlKTtcbiAgICB2YXIgZW5kTGlzdGVuZXIgPSBmdW5jdGlvbiBlbmRMaXN0ZW5lcihlKSB7XG4gICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYW5pbSkge1xuICAgICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBhbmltKTtcbiAgICAgIH0pO1xuXG4gICAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LnJlbW92ZUVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuICAgIH07XG5cbiAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LmFkZEVuZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kTGlzdGVuZXIpO1xuXG4gICAgYW5pbWF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltKSB7XG4gICAgICBfQ1NTQ29yZTIuZGVmYXVsdC5hZGRDbGFzcyhub2RlLCBhbmltKTtcbiAgICB9KTtcbiAgfSxcbiAgX2dldF9hbmltYXRpb25fY2xhc3NlczogZnVuY3Rpb24gX2dldF9hbmltYXRpb25fY2xhc3NlcyhoaWRlKSB7XG4gICAgdmFyIGFuaW1hdGlvbnMgPSBoaWRlID8gdGhpcy5wcm9wcy5oaWRlQW5pbWF0aW9uIDogdGhpcy5wcm9wcy5zaG93QW5pbWF0aW9uO1xuICAgIGlmIChcIltvYmplY3QgQXJyYXldXCIgPT09IHRvU3RyaW5nLmNhbGwoYW5pbWF0aW9ucykpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb25zO1xuICAgIH0gZWxzZSBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGFuaW1hdGlvbnMpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb25zLnNwbGl0KFwiIFwiKTtcbiAgICB9XG4gIH0sXG4gIF9jbGVhcl9hbmltYXRpb246IGZ1bmN0aW9uIF9jbGVhcl9hbmltYXRpb24oaGlkZSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIGFuaW1hdGlvbnMgPSB0aGlzLl9nZXRfYW5pbWF0aW9uX2NsYXNzZXMoaGlkZSk7XG4gICAgYW5pbWF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltYXRpb24pIHtcbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZShfdGhpczIpLCBhbmltYXRpb24pO1xuICAgIH0pO1xuICB9LFxuICBfcXVldWVfY2xhc3M6IGZ1bmN0aW9uIF9xdWV1ZV9jbGFzcyhjbGFzc05hbWUpIHtcbiAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlLnB1c2goY2xhc3NOYW1lKTtcblxuICAgIGlmICghdGhpcy50aW1lb3V0KSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX2ZsdXNoX2NsYXNzX25hbWVfcXVldWUsIFRJQ0spO1xuICAgIH1cbiAgfSxcbiAgX2ZsdXNoX2NsYXNzX25hbWVfcXVldWU6IGZ1bmN0aW9uIF9mbHVzaF9jbGFzc19uYW1lX3F1ZXVlKCkge1xuICAgIGlmICh0aGlzLl9pc19tb3VudGVkKSB7XG4gICAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlLmZvckVhY2goX0NTU0NvcmUyLmRlZmF1bHQuYWRkQ2xhc3MuYmluZChfQ1NTQ29yZTIuZGVmYXVsdCwgX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKSk7XG4gICAgfVxuICAgIHRoaXMuY2xhc3NOYW1lUXVldWUubGVuZ3RoID0gMDtcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICB9LFxuICBfc2hvdzogZnVuY3Rpb24gX3Nob3coKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudHJhbnNpdGlvbikge1xuICAgICAgdGhpcy5fc2V0X3RyYW5zaXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hvd0FuaW1hdGlvbikge1xuICAgICAgdGhpcy5fc2V0X2FuaW1hdGlvbigpO1xuICAgIH1cbiAgfSxcbiAgaGFuZGxlTW91c2VFbnRlcjogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQobnVsbCk7XG4gICAgaWYgKHRoaXMuaXNIaWRpbmcpIHtcbiAgICAgIHRoaXMuX3NldF9pc19oaWRpbmcoZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5oaWRlQW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyX2FuaW1hdGlvbih0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy50cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyX3RyYW5zaXRpb24odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgIGlmICghdGhpcy5pc0hpZGluZyAmJiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCB8fCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCA+IDApKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQpKTtcbiAgICB9XG4gIH0sXG4gIGhpZGVUb2FzdDogZnVuY3Rpb24gaGlkZVRvYXN0KG92ZXJyaWRlKSB7XG4gICAgaWYgKHRoaXMuaXNIaWRpbmcgfHwgdGhpcy5pbnRlcnZhbElkID09PSBudWxsICYmICFvdmVycmlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NldF9pc19oaWRpbmcodHJ1ZSk7XG4gICAgaWYgKHRoaXMucHJvcHMudHJhbnNpdGlvbikge1xuICAgICAgdGhpcy5fc2V0X3RyYW5zaXRpb24odHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmhpZGVBbmltYXRpb24pIHtcbiAgICAgIHRoaXMuX3NldF9hbmltYXRpb24odHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZV9yZW1vdmUoKTtcbiAgICB9XG4gIH0sXG4gIF9zZXRfaW50ZXJ2YWxfaWQ6IGZ1bmN0aW9uIF9zZXRfaW50ZXJ2YWxfaWQoaW50ZXJ2YWxJZCkge1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IGludGVydmFsSWQ7XG4gIH0sXG4gIF9zZXRfaXNfaGlkaW5nOiBmdW5jdGlvbiBfc2V0X2lzX2hpZGluZyhpc0hpZGluZykge1xuICAgIHRoaXMuaXNIaWRpbmcgPSBpc0hpZGluZztcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9hbmltYXRpb25NaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgQ1NTQ29yZVxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCcuL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFRoZSBDU1NDb3JlIG1vZHVsZSBzcGVjaWZpZXMgdGhlIEFQSSAoYW5kIGltcGxlbWVudHMgbW9zdCBvZiB0aGUgbWV0aG9kcylcbiAqIHRoYXQgc2hvdWxkIGJlIHVzZWQgd2hlbiBkZWFsaW5nIHdpdGggdGhlIGRpc3BsYXkgb2YgZWxlbWVudHMgKHZpYSB0aGVpclxuICogQ1NTIGNsYXNzZXMgYW5kIHZpc2liaWxpdHkgb24gc2NyZWVuLiBJdCBpcyBhbiBBUEkgZm9jdXNlZCBvbiBtdXRhdGluZyB0aGVcbiAqIGRpc3BsYXkgYW5kIG5vdCByZWFkaW5nIGl0IGFzIG5vIGxvZ2ljYWwgc3RhdGUgc2hvdWxkIGJlIGVuY29kZWQgaW4gdGhlXG4gKiBkaXNwbGF5IG9mIGVsZW1lbnRzLlxuICovXG5cbnZhciBDU1NDb3JlID0ge1xuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBjbGFzcyBwYXNzZWQgaW4gdG8gdGhlIGVsZW1lbnQgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGhhdmUgaXQuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhlIGVsZW1lbnQgcGFzc2VkIGluXG4gICAqL1xuICBhZGRDbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0NTU0NvcmUuYWRkQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLiBcIiVzXCIgY29udGFpbnMgJyArICdtdWx0aXBsZSBjbGFzc2VzLicsIGNsYXNzTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIGlmICghQ1NTQ29yZS5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjbGFzcyBwYXNzZWQgaW4gZnJvbSB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoZSBlbGVtZW50IHBhc3NlZCBpblxuICAgKi9cbiAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAhIS9cXHMvLnRlc3QoY2xhc3NOYW1lKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1NDb3JlLnJlbW92ZUNsYXNzIHRha2VzIG9ubHkgYSBzaW5nbGUgY2xhc3MgbmFtZS4gXCIlc1wiIGNvbnRhaW5zICcgKyAnbXVsdGlwbGUgY2xhc3Nlcy4nLCBjbGFzc05hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoQ1NTQ29yZS5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzfCQpJywgJ2cnKSwgJyQxJykucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIG11bHRpcGxlIHNwYWNlcyB0byBvbmVcbiAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTsgLy8gdHJpbSB0aGUgZW5kc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICAvKipcbiAgICogSGVscGVyIHRvIGFkZCBvciByZW1vdmUgYSBjbGFzcyBmcm9tIGFuIGVsZW1lbnQgYmFzZWQgb24gYSBjb25kaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHBhcmFtIHsqfSBib29sIGNvbmRpdGlvbiB0byB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgdGhlIGNsYXNzXG4gICAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoZSBlbGVtZW50IHBhc3NlZCBpblxuICAgKi9cbiAgY29uZGl0aW9uQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgICByZXR1cm4gKGJvb2wgPyBDU1NDb3JlLmFkZENsYXNzIDogQ1NTQ29yZS5yZW1vdmVDbGFzcykoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgfSxcblxuICAvKipcbiAgICogVGVzdHMgd2hldGhlciB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzIHNwZWNpZmllZC5cbiAgICpcbiAgICogQHBhcmFtIHtET01Ob2RlfERPTVdpbmRvd30gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzLCBmYWxzZSBpZiBub3RcbiAgICovXG4gIGhhc0NsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgISEvXFxzLy50ZXN0KGNsYXNzTmFtZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ1NTLmhhc0NsYXNzIHRha2VzIG9ubHkgYSBzaW5nbGUgY2xhc3MgbmFtZS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICByZXR1cm4gISFjbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuICgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbGFzc05hbWUgKyAnICcpID4gLTE7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDU1NDb3JlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL0NTU0NvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RUcmFuc2l0aW9uRXZlbnRzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG4vKipcbiAqIEVWRU5UX05BTUVfTUFQIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIGV2ZW50IGZpcmVkIHdoZW4gYVxuICogdHJhbnNpdGlvbi9hbmltYXRpb24gZW5kcywgYmFzZWQgb24gdGhlIHN0eWxlIHByb3BlcnR5IHVzZWQgdG9cbiAqIGRlZmluZSB0aGF0IGV2ZW50LlxuICovXG52YXIgRVZFTlRfTkFNRV9NQVAgPSB7XG4gIHRyYW5zaXRpb25lbmQ6IHtcbiAgICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAnTW96VHJhbnNpdGlvbic6ICdtb3pUcmFuc2l0aW9uRW5kJyxcbiAgICAnT1RyYW5zaXRpb24nOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICdtc1RyYW5zaXRpb24nOiAnTVNUcmFuc2l0aW9uRW5kJ1xuICB9LFxuXG4gIGFuaW1hdGlvbmVuZDoge1xuICAgICdhbmltYXRpb24nOiAnYW5pbWF0aW9uZW5kJyxcbiAgICAnV2Via2l0QW5pbWF0aW9uJzogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgJ01vekFuaW1hdGlvbic6ICdtb3pBbmltYXRpb25FbmQnLFxuICAgICdPQW5pbWF0aW9uJzogJ29BbmltYXRpb25FbmQnLFxuICAgICdtc0FuaW1hdGlvbic6ICdNU0FuaW1hdGlvbkVuZCdcbiAgfVxufTtcblxudmFyIGVuZEV2ZW50cyA9IFtdO1xuXG5mdW5jdGlvbiBkZXRlY3RFdmVudHMoKSB7XG4gIHZhciB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmFyIHN0eWxlID0gdGVzdEVsLnN0eWxlO1xuXG4gIC8vIE9uIHNvbWUgcGxhdGZvcm1zLCBpbiBwYXJ0aWN1bGFyIHNvbWUgcmVsZWFzZXMgb2YgQW5kcm9pZCA0LngsXG4gIC8vIHRoZSB1bi1wcmVmaXhlZCBcImFuaW1hdGlvblwiIGFuZCBcInRyYW5zaXRpb25cIiBwcm9wZXJ0aWVzIGFyZSBkZWZpbmVkIG9uIHRoZVxuICAvLyBzdHlsZSBvYmplY3QgYnV0IHRoZSBldmVudHMgdGhhdCBmaXJlIHdpbGwgc3RpbGwgYmUgcHJlZml4ZWQsIHNvIHdlIG5lZWRcbiAgLy8gdG8gY2hlY2sgaWYgdGhlIHVuLXByZWZpeGVkIGV2ZW50cyBhcmUgdXNlYWJsZSwgYW5kIGlmIG5vdCByZW1vdmUgdGhlbVxuICAvLyBmcm9tIHRoZSBtYXBcbiAgaWYgKCEoJ0FuaW1hdGlvbkV2ZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgZGVsZXRlIEVWRU5UX05BTUVfTUFQLmFuaW1hdGlvbmVuZC5hbmltYXRpb247XG4gIH1cblxuICBpZiAoISgnVHJhbnNpdGlvbkV2ZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgZGVsZXRlIEVWRU5UX05BTUVfTUFQLnRyYW5zaXRpb25lbmQudHJhbnNpdGlvbjtcbiAgfVxuXG4gIGZvciAodmFyIGJhc2VFdmVudE5hbWUgaW4gRVZFTlRfTkFNRV9NQVApIHtcbiAgICB2YXIgYmFzZUV2ZW50cyA9IEVWRU5UX05BTUVfTUFQW2Jhc2VFdmVudE5hbWVdO1xuICAgIGZvciAodmFyIHN0eWxlTmFtZSBpbiBiYXNlRXZlbnRzKSB7XG4gICAgICBpZiAoc3R5bGVOYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGVuZEV2ZW50cy5wdXNoKGJhc2VFdmVudHNbc3R5bGVOYW1lXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5pZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NKSB7XG4gIGRldGVjdEV2ZW50cygpO1xufVxuXG4vLyBXZSB1c2UgdGhlIHJhdyB7YWRkfHJlbW92ZX1FdmVudExpc3RlbmVyKCkgY2FsbCBiZWNhdXNlIEV2ZW50TGlzdGVuZXJcbi8vIGRvZXMgbm90IGtub3cgaG93IHRvIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMgYW5kIHdlIHJlYWxseSBzaG91bGRcbi8vIGNsZWFuIHVwLiBBbHNvLCB0aGVzZSBldmVudHMgYXJlIG5vdCB0cmlnZ2VyZWQgaW4gb2xkZXIgYnJvd3NlcnNcbi8vIHNvIHdlIHNob3VsZCBiZSBBLU9LIGhlcmUuXG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnROYW1lLCBldmVudExpc3RlbmVyKSB7XG4gIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xufVxuXG52YXIgUmVhY3RUcmFuc2l0aW9uRXZlbnRzID0ge1xuICBhZGRFbmRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAobm9kZSwgZXZlbnRMaXN0ZW5lcikge1xuICAgIGlmIChlbmRFdmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBJZiBDU1MgdHJhbnNpdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQsIHRyaWdnZXIgYW4gXCJlbmQgYW5pbWF0aW9uXCJcbiAgICAgIC8vIGV2ZW50IGltbWVkaWF0ZWx5LlxuICAgICAgd2luZG93LnNldFRpbWVvdXQoZXZlbnRMaXN0ZW5lciwgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVuZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbmRFdmVudCkge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRFdmVudCwgZXZlbnRMaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKG5vZGUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAoZW5kRXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmRFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZW5kRXZlbnQpIHtcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIobm9kZSwgZW5kRXZlbnQsIGV2ZW50TGlzdGVuZXIpO1xuICAgIH0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VHJhbnNpdGlvbkV2ZW50cztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RUcmFuc2l0aW9uRXZlbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFeGVjdXRpb25FbnZpcm9ubWVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczogY2FuVXNlRE9NICYmICEhKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8IHdpbmRvdy5hdHRhY2hFdmVudCksXG5cbiAgY2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW4sXG5cbiAgaXNJbldvcmtlcjogIWNhblVzZURPTSAvLyBGb3Igbm93LCB0aGlzIGlzIHRydWUgLSBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGVjdXRpb25FbnZpcm9ubWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9+L2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNhbGxfc2hvd19tZXRob2QoJG5vZGUsIHByb3BzKSB7XG4gICRub2RlW3Byb3BzLnNob3dNZXRob2RdKHtcbiAgICBkdXJhdGlvbjogcHJvcHMuc2hvd0R1cmF0aW9uLFxuICAgIGVhc2luZzogcHJvcHMuc2hvd0Vhc2luZ1xuICB9KTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogXCJub25lXCIgfSxcbiAgICAgIC8vIGVmZmVjdGl2ZSAkLmhpZGUoKVxuICAgICAgc2hvd01ldGhvZDogXCJmYWRlSW5cIiwgLy8gc2xpZGVEb3duLCBhbmQgc2hvdyBhcmUgYnVpbHQgaW50byBqUXVlcnlcbiAgICAgIHNob3dEdXJhdGlvbjogMzAwLFxuICAgICAgc2hvd0Vhc2luZzogXCJzd2luZ1wiLCAvLyBhbmQgbGluZWFyIGFyZSBidWlsdCBpbnRvIGpRdWVyeVxuICAgICAgaGlkZU1ldGhvZDogXCJmYWRlT3V0XCIsXG4gICAgICBoaWRlRHVyYXRpb246IDEwMDAsXG4gICAgICBoaWRlRWFzaW5nOiBcInN3aW5nXCIsXG4gICAgICAvL1xuICAgICAgdGltZU91dDogNTAwMCxcbiAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMFxuICAgIH07XG4gIH0sXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcnZhbElkOiBudWxsLFxuICAgICAgaXNIaWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNhbGxfc2hvd19tZXRob2QodGhpcy5fZ2V0XyRfbm9kZSgpLCB0aGlzLnByb3BzKTtcbiAgICBpZiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMudGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgaGFuZGxlTW91c2VFbnRlcjogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zdGF0ZS5pbnRlcnZhbElkKTtcbiAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQobnVsbCk7XG4gICAgdGhpcy5fc2V0X2lzX2hpZGluZyhmYWxzZSk7XG5cbiAgICBjYWxsX3Nob3dfbWV0aG9kKHRoaXMuX2dldF8kX25vZGUoKS5zdG9wKHRydWUsIHRydWUpLCB0aGlzLnByb3BzKTtcbiAgfSxcbiAgaGFuZGxlTW91c2VMZWF2ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNIaWRpbmcgJiYgKHRoaXMucHJvcHMudGltZU91dCA+IDAgfHwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQgPiAwKSkge1xuICAgICAgdGhpcy5fc2V0X2ludGVydmFsX2lkKHNldFRpbWVvdXQodGhpcy5oaWRlVG9hc3QsIHRoaXMucHJvcHMuZXh0ZW5kZWRUaW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBoaWRlVG9hc3Q6IGZ1bmN0aW9uIGhpZGVUb2FzdChvdmVycmlkZSkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzSGlkaW5nIHx8IHRoaXMuc3RhdGUuaW50ZXJ2YWxJZCA9PT0gbnVsbCAmJiAhb3ZlcnJpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzSGlkaW5nOiB0cnVlIH0pO1xuXG4gICAgdGhpcy5fZ2V0XyRfbm9kZSgpW3RoaXMucHJvcHMuaGlkZU1ldGhvZF0oe1xuICAgICAgZHVyYXRpb246IHRoaXMucHJvcHMuaGlkZUR1cmF0aW9uLFxuICAgICAgZWFzaW5nOiB0aGlzLnByb3BzLmhpZGVFYXNpbmcsXG4gICAgICBjb21wbGV0ZTogdGhpcy5faGFuZGxlX3JlbW92ZVxuICAgIH0pO1xuICB9LFxuICBfZ2V0XyRfbm9kZTogZnVuY3Rpb24gX2dldF8kX25vZGUoKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICByZXR1cm4galF1ZXJ5KF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xuICB9LFxuICBfc2V0X2ludGVydmFsX2lkOiBmdW5jdGlvbiBfc2V0X2ludGVydmFsX2lkKGludGVydmFsSWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGludGVydmFsSWQ6IGludGVydmFsSWRcbiAgICB9KTtcbiAgfSxcbiAgX3NldF9pc19oaWRpbmc6IGZ1bmN0aW9uIF9zZXRfaXNfaGlkaW5nKGlzSGlkaW5nKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc0hpZGluZzogaXNIaWRpbmdcbiAgICB9KTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VCdXR0b24gZnJvbSAnLi9QYWdlQnV0dG9uLmpzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIFBhZ2luYXRpb25MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjaGFuZ2VQYWdlKHBhZ2UpIHtcbiAgICBpZiAocGFnZSA9PSB0aGlzLnByb3BzLnByZVBhZ2UpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnByb3BzLmN1cnJQYWdlIC0gMSA8IDEgPyAxIDogdGhpcy5wcm9wcy5jdXJyUGFnZSAtIDE7XG4gICAgfSBlbHNlIGlmIChwYWdlID09IHRoaXMucHJvcHMubmV4dFBhZ2UpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnByb3BzLmN1cnJQYWdlICsgMSA+IHRoaXMudG90YWxQYWdlcyA/IHRoaXMudG90YWxQYWdlcyA6IHRoaXMucHJvcHMuY3VyclBhZ2UgKyAxO1xuICAgIH0gZWxzZSBpZiAocGFnZSA9PSB0aGlzLnByb3BzLmxhc3RQYWdlKSB7XG4gICAgICBwYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgIH0gZWxzZSBpZiAocGFnZSA9PSB0aGlzLnByb3BzLmZpcnN0UGFnZSkge1xuICAgICAgcGFnZSA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2UgPSBwYXJzZUludChwYWdlKTtcbiAgICB9XG5cbiAgICBpZiAocGFnZSAhPSB0aGlzLnByb3BzLmN1cnJQYWdlKSB7XG4gICAgICB0aGlzLnByb3BzLmNoYW5nZVBhZ2UocGFnZSwgdGhpcy5wcm9wcy5zaXplUGVyUGFnZSk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU2l6ZVBlclBhZ2UoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IHNlbGVjdFNpemUgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQudGV4dCk7XG4gICAgbGV0IHsgY3VyclBhZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNlbGVjdFNpemUgIT0gdGhpcy5wcm9wcy5zaXplUGVyUGFnZSkge1xuICAgICAgdGhpcy50b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMucHJvcHMuZGF0YVNpemUgLyBzZWxlY3RTaXplKTtcbiAgICAgIGlmIChjdXJyUGFnZSA+IHRoaXMudG90YWxQYWdlcylcbiAgICAgICAgY3VyclBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG5cbiAgICAgIHRoaXMucHJvcHMuY2hhbmdlUGFnZShjdXJyUGFnZSwgc2VsZWN0U2l6ZSk7XG4gICAgICBpZih0aGlzLnByb3BzLm9uU2l6ZVBlclBhZ2VMaXN0KXtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNpemVQZXJQYWdlTGlzdChzZWxlY3RTaXplKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMucHJvcHMuZGF0YVNpemUgLyB0aGlzLnByb3BzLnNpemVQZXJQYWdlKTtcbiAgICB2YXIgcGFnZUJ0bnMgPSB0aGlzLm1ha2VQYWdlKCk7XG4gICAgdmFyIHBhZ2VMaXN0U3R5bGUgPSB7XG4gICAgICBmbG9hdDogXCJyaWdodFwiLFxuICAgICAgbWFyZ2luVG9wOiBcIjBweFwiICAvL292ZXJyaWRlIHRoZSBtYXJnaW4tdG9wIGRlZmluZWQgaW4gLnBhZ2luYXRpb24gY2xhc3MgaW4gYm9vdHN0cmFwLlxuICAgIH1cblxuICAgIHZhciBzaXplUGVyUGFnZUxpc3QgPSB0aGlzLnByb3BzLnNpemVQZXJQYWdlTGlzdC5tYXAoKHNpemVQZXJQYWdlKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGkga2V5PXtzaXplUGVyUGFnZX0gcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgICAgIDxhIHJvbGU9XCJtZW51aXRlbVwiIHRhYkluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuY2hhbmdlU2l6ZVBlclBhZ2UuYmluZCh0aGlzKX0+e3NpemVQZXJQYWdlfTwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBtYXJnaW5Ub3A6IDE1IH19PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zaXplUGVyUGFnZUxpc3QubGVuZ3RoID4gMVxuICAgICAgICAgID8gPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJwYWdlRHJvcERvd25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNpemVQZXJQYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cInBhZ2VEcm9wRG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtzaXplUGVyUGFnZUxpc3R9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicGFnaW5hdGlvblwiIHN0eWxlPXtwYWdlTGlzdFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAge3BhZ2VCdG5zfVxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgOiA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicGFnaW5hdGlvblwiIHN0eWxlPXtwYWdlTGlzdFN0eWxlfT5cbiAgICAgICAgICAgICAgICB7cGFnZUJ0bnN9XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgbWFrZVBhZ2UoKSB7XG4gICAgdmFyIHBhZ2VzID0gdGhpcy5nZXRQYWdlcygpO1xuICAgIHJldHVybiBwYWdlcy5tYXAoZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgIHZhciBpc0FjdGl2ZSA9IHBhZ2UgPT09IHRoaXMucHJvcHMuY3VyclBhZ2U7XG4gICAgICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIHZhciBoaWRkZW4gPSBmYWxzZTtcbiAgICAgIGlmKHRoaXMucHJvcHMuY3VyclBhZ2UgPT0gMSAmJlxuICAgICAgICAocGFnZSA9PT0gdGhpcy5wcm9wcy5maXJzdFBhZ2UgfHwgcGFnZSA9PT0gdGhpcy5wcm9wcy5wcmVQYWdlKSl7XG4gICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZih0aGlzLnByb3BzLmN1cnJQYWdlID09IHRoaXMudG90YWxQYWdlcyAmJlxuICAgICAgICAocGFnZSA9PT0gdGhpcy5wcm9wcy5uZXh0UGFnZSB8fCBwYWdlID09PSB0aGlzLnByb3BzLmxhc3RQYWdlKSl7XG4gICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UGFnZUJ1dHRvbiBjaGFuZ2VQYWdlPXt0aGlzLmNoYW5nZVBhZ2UuYmluZCh0aGlzKX0gYWN0aXZlPXtpc0FjdGl2ZX0gZGlzYWJsZT17ZGlzYWJsZWR9IGhpZGRlbj17aGlkZGVufSBrZXk9e3BhZ2V9PntwYWdlfTwvUGFnZUJ1dHRvbj5cbiAgICAgIClcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG4gIGdldFBhZ2VzKCkge1xuICAgIHZhciBzdGFydFBhZ2UgPSAxLCBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuXG4gICAgc3RhcnRQYWdlID0gTWF0aC5tYXgodGhpcy5wcm9wcy5jdXJyUGFnZSAtIE1hdGguZmxvb3IodGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSAvIDIpLCAxKTtcbiAgICBlbmRQYWdlID0gc3RhcnRQYWdlICsgdGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSAtIDE7XG5cbiAgICBpZiAoZW5kUGFnZSA+IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgZW5kUGFnZSA9IHRoaXMudG90YWxQYWdlcztcbiAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplICsgMTtcbiAgICB9XG4gICAgdmFyIHBhZ2VzO1xuICAgIGlmKHN0YXJ0UGFnZSAhPSAxICYmIHRoaXMudG90YWxQYWdlcyA+IHRoaXMucHJvcHMucGFnaW5hdGlvblNpemUpIHtcbiAgICAgIHBhZ2VzID0gW3RoaXMucHJvcHMuZmlyc3RQYWdlLCB0aGlzLnByb3BzLnByZVBhZ2VdO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFBhZ2VzID4gMSkge1xuICAgICAgcGFnZXMgPSBbdGhpcy5wcm9wcy5wcmVQYWdlXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwYWdlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICBpZiAoaSA+IDApcGFnZXMucHVzaChpKTtcbiAgICB9XG4gICAgaWYgKGVuZFBhZ2UgIT0gdGhpcy50b3RhbFBhZ2VzKSB7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubmV4dFBhZ2UpO1xuICAgICAgcGFnZXMucHVzaCh0aGlzLnByb3BzLmxhc3RQYWdlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxQYWdlcyA+IDEpe1xuICAgICAgcGFnZXMucHVzaCh0aGlzLnByb3BzLm5leHRQYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgZ2V0Q3VycmVudFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY3VyclBhZ2U7XG4gIH1cblxuICBnZXRTaXplUGVyUGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaXplUGVyUGFnZTtcbiAgfVxufVxuUGFnaW5hdGlvbkxpc3QucHJvcFR5cGVzID0ge1xuICBjdXJyUGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgc2l6ZVBlclBhZ2U6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIGRhdGFTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBjaGFuZ2VQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc2l6ZVBlclBhZ2VMaXN0OiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gIHBhZ2luYXRpb25TaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICByZW1vdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvblNpemVQZXJQYWdlTGlzdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHByZVBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cblBhZ2luYXRpb25MaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgc2l6ZVBlclBhZ2U6IENvbnN0LlNJWkVfUEVSX1BBR0Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25MaXN0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFBhZ2VCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdH1cblxuICBwYWdlQnRuQ2xpY2soZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucHJvcHMuY2hhbmdlUGFnZShlLmN1cnJlbnRUYXJnZXQudGV4dCk7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgY2xhc3NlcyA9IGNsYXNzU2V0KHtcbiAgICAgICAgJ2FjdGl2ZSc6IHRoaXMucHJvcHMuYWN0aXZlLFxuICAgICAgICAnZGlzYWJsZWQnOiB0aGlzLnByb3BzLmRpc2FibGUsXG4gICAgICAgICdoaWRkZW4nOiB0aGlzLnByb3BzLmhpZGRlblxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzZXN9PjxhIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5wYWdlQnRuQ2xpY2suYmluZCh0aGlzKX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9hPjwvbGk+XG4gICAgKVxuICB9XG59XG5QYWdlQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgY2hhbmdlUGFnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRpc2FibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYWdlQnV0dG9uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5pbXBvcnQgRWRpdG9yIGZyb20gJy4uL0VkaXRvcic7XG5pbXBvcnQgTm90aWZpZXIgZnJvbSAnLi4vTm90aWZpY2F0aW9uLmpzJztcblxuY2xhc3MgVG9vbEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRpbWVvdXRlQ2xlYXI9MDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNJbnNlcnRSb3dUcmlnZ2VyOiB0cnVlLFxuICAgICAgdmFsaWRhdGVTdGF0ZTpudWxsLFxuICAgICAgc2hha2VFZGl0b3I6ZmFsc2UsXG4gICAgICBzaG93U2VsZWN0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIH1cbiAgY2xlYXJUaW1lb3V0KCkge1xuICAgIGlmKHRoaXMudGltZW91dGVDbGVhcil7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0ZUNsZWFyKTtcbiAgICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrQW5kUGFyc2VGb3JtKCl7XG4gICAgdmFyIHRzPXRoaXMsbmV3T2JqID0ge30saXNWYWxpZD10cnVlLHRlbXBWYWx1ZSx0ZW1wTXNnLHZhbGlkYXRlU3RhdGU9e307XG4gICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uLCBpKXtcbiAgICAgIGlmKGNvbHVtbi5hdXRvVmFsdWUpey8vd2hlbiB5b3Ugd2FudCBzYW1lIGF1dG8gZ2VuZXJhdGUgdmFsdWUgYW5kIG5vdCBhbGxvdyBlZGl0LCBleGFtcGxlIElEIGZpZWxkXG4gICAgICAgIHRlbXBWYWx1ZT10eXBlb2YgY29sdW1uLmF1dG9WYWx1ZT09J2Z1bmN0aW9uJz9jb2x1bW4uYXV0b1ZhbHVlKCk6KCdhdXRvdmFsdWUtJytuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgbGV0IGRvbSA9IHRoaXMucmVmc1tjb2x1bW4uZmllbGQraV07XG4gICAgICAgIHRlbXBWYWx1ZSA9IGRvbS52YWx1ZTtcblxuICAgICAgICBpZihjb2x1bW4uZWRpdGFibGUgJiYgY29sdW1uLmVkaXRhYmxlLnR5cGUgPT0gJ2NoZWNrYm94Jyl7XG4gICAgICAgICAgbGV0IHZhbHVlcyA9IGRvbS52YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICAgIHRlbXBWYWx1ZSA9IGRvbS5jaGVja2VkPyB2YWx1ZXNbMF06dmFsdWVzWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY29sdW1uLmVkaXRhYmxlJiZjb2x1bW4uZWRpdGFibGUudmFsaWRhdG9yKXsvL3Byb2Nlc3MgdmFsaWRhdGVcbiAgICAgICAgICB0ZW1wTXNnPSBjb2x1bW4uZWRpdGFibGUudmFsaWRhdG9yKHRlbXBWYWx1ZSlcbiAgICAgICAgICBpZih0ZW1wTXNnIT09dHJ1ZSl7XG4gICAgICAgICAgICBpc1ZhbGlkPWZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGVTdGF0ZVtjb2x1bW4uZmllbGRdPXRlbXBNc2c7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ld09ialtjb2x1bW4uZmllbGRdID10ZW1wVmFsdWU7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZihpc1ZhbGlkKXtcbiAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgfWVsc2V7XG4gICAgICB0cy5jbGVhclRpbWVvdXQoKTtcbiAgICAgIC8vc2hvdyBlcnJvciBpbiBmb3JtIGFuZCBzaGFrZSBpdFxuICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsaWRhdGVTdGF0ZTp2YWxpZGF0ZVN0YXRlLHNoYWtlRWRpdG9yOnRydWV9KTtcbiAgICAgIC8vbm90aWZpZXIgZXJyb3JcbiAgICAgIHRzLnJlZnMubm90aWZpZXIubm90aWNlKCdlcnJvcicsXCJGb3JtIHZhbGlkYXRlIGVycm9ycywgcGxlYXNlIGNoZWNraW5nIVwiLFwiUHJlc3NlZCBFU0MgY2FuIGNhbmNlbFwiKTtcbiAgICAgIC8vY2xlYXIgYW5pbWF0ZSBjbGFzc1xuICAgICAgdHMudGltZW91dGVDbGVhcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dHMuc2V0U3RhdGUoe3NoYWtlRWRpdG9yOmZhbHNlfSk7fSwzMDApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2F2ZUJ0bkNsaWNrKGUpe1xuICAgIHZhciBuZXdPYmogPSB0aGlzLmNoZWNrQW5kUGFyc2VGb3JtKCk7XG4gICAgaWYoIW5ld09iail7Ly92YWxpZGF0ZSBlcnJvcnNcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG1zZyA9IHRoaXMucHJvcHMub25BZGRSb3cobmV3T2JqKTtcbiAgICBpZihtc2cpIHtcbiAgICAgIHZhciB0cz10aGlzO1xuICAgICAgdHMucmVmcy5ub3RpZmllci5ub3RpY2UoJ2Vycm9yJyxtc2csXCJQcmVzc2VkIEVTQyBjYW4gY2FuY2VsXCIpO1xuICAgICAgdHMuY2xlYXJUaW1lb3V0KCk7XG4gICAgICAvL3NoYWtlIGZvcm0gYW5kIGhhY2sgcHJldmVudCBtb2RhbCBoaWRlXG4gICAgICB0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6dHJ1ZSx2YWxpZGF0ZVN0YXRlOlwidGhpcyBpcyBoYWNrIGZvciBwcmV2ZW50IGJvb3RzdHJhcCBtb2RhbCBoaWRlXCJ9KTtcbiAgICAgIC8vY2xlYXIgYW5pbWF0ZSBjbGFzc1xuICAgICAgdHMudGltZW91dGVDbGVhcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dHMuc2V0U3RhdGUoe3NoYWtlRWRpdG9yOmZhbHNlfSk7fSwzMDApO1xuICAgIH0gZWxzZXtcbiAgICAgIC8vcmVzZXQgc3RhdGUgYW5kIGhpZGUgbW9kYWwgaGlkZVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbGlkYXRlU3RhdGU6bnVsbCxcbiAgICAgICAgc2hha2VFZGl0b3I6ZmFsc2VcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIitcIm1vZGFsLWJhY2tkcm9wXCIpLmNsaWNrKCk7XG4gICAgICB9KTtcbiAgICAgIC8vcmVzZXQgZm9ybVxuICAgICAgdGhpcy5yZWZzLmZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTaG93T25seVRvZ2dsZSA9IGUgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd1NlbGVjdGVkOiAhdGhpcy5zdGF0ZS5zaG93U2VsZWN0ZWRcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uU2hvd09ubHlTZWxlY3RlZCgpO1xuICB9XG5cbiAgaGFuZGxlRHJvcFJvd0J0bkNsaWNrKGUpe1xuICAgIHRoaXMucHJvcHMub25Ecm9wUm93KCk7XG4gIH1cblxuICBoYW5kbGVDbG9zZUJ0bihlKXtcbiAgICB0aGlzLnJlZnMud2FybmluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICBoYW5kbGVLZXlVcChlKXtcbiAgICB0aGlzLnByb3BzLm9uU2VhcmNoKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVFeHBvcnRDU1YoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkV4cG9ydENTVigpO1xuICB9XG5cbiAgaGFuZGxlQ2xlYXJCdG5DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnJlZnMuc2VhY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMucHJvcHMub25TZWFyY2goJycpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIG1vZGFsQ2xhc3NOYW1lID0gXCJicy10YWJsZS1tb2RhbC1zbVwiK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciBpbnNlcnRCdG4gPSB0aGlzLnByb3BzLmVuYWJsZUluc2VydD9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQWRkUm93QmVnaW59IGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyByZWFjdC1icy10YWJsZS1hZGQtYnRuXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PXsnLicrbW9kYWxDbGFzc05hbWV9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9pPiBOZXc8L2J1dHRvbj46bnVsbDtcblxuICAgIHZhciBkZWxldGVCdG4gPSB0aGlzLnByb3BzLmVuYWJsZURlbGV0ZT9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgcmVhY3QtYnMtdGFibGUtZGVsLWJ0blwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIiB0aXRsZT1cIkRyb3Agc2VsZWN0ZWQgcm93XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRHJvcFJvd0J0bkNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiPjwvaT4gRGVsZXRlXG4gICAgICAgICAgPC9idXR0b24+Om51bGw7XG5cbiAgICB2YXIgc2VhcmNoVGV4dElucHV0ID0gdGhpcy5yZW5kZXJTZWFyY2hQYW5lbCgpO1xuXG4gICAgdmFyIHNob3dTZWxlY3RlZE9ubHlCdG4gPSB0aGlzLnByb3BzLmVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ/XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVNob3dPbmx5VG9nZ2xlLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLnNob3dTZWxlY3RlZD8gQ29uc3QuU0hPV19BTEwgOiBDb25zdC5TSE9XX09OTFlfU0VMRUNUIH1cbiAgICAgIDwvYnV0dG9uPjpudWxsO1xuXG4gICAgdmFyIG1vZGFsID0gdGhpcy5wcm9wcy5lbmFibGVJbnNlcnQ/dGhpcy5yZW5kZXJJbnNlcnRSb3dNb2RhbChtb2RhbENsYXNzTmFtZSk6bnVsbDtcbiAgICB2YXIgd2FybmluZ1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogXCJub25lXCIsXG4gICAgICBtYXJnaW5Cb3R0b206IDBcbiAgICB9O1xuXG4gICAgdmFyIGV4cG9ydENTViA9IHRoaXMucHJvcHMuZW5hYmxlRXhwb3J0Q1NWID9cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3NcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUV4cG9ydENTVi5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leHBvcnRcIj48L2k+IEV4cG9ydCB0byBDU1Y8L2J1dHRvbj4gOiBudWxsO1xuXG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTYgY29sLWxnLThcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBidG4tZ3JvdXAtc21cIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgIHtleHBvcnRDU1Z9XG4gICAgICAgICAgICB7aW5zZXJ0QnRufVxuICAgICAgICAgICAge2RlbGV0ZUJ0bn1cbiAgICAgICAgICAgIHtzaG93U2VsZWN0ZWRPbmx5QnRufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTYgY29sLWxnLTRcIj5cbiAgICAgICAgICB7c2VhcmNoVGV4dElucHV0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPE5vdGlmaWVyIHJlZj1cIm5vdGlmaWVyXCI+PC9Ob3RpZmllcj5cbiAgICAgICAge21vZGFsfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyU2VhcmNoUGFuZWwoKSB7XG4gICAgaWYodGhpcy5wcm9wcy5lbmFibGVTZWFyY2gpIHtcbiAgICAgIGxldCBjbGFzc05hbWVzID0gJ2Zvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbSc7XG4gICAgICBsZXQgY2xlYXJCdG4gPSBudWxsO1xuICAgICAgaWYodGhpcy5wcm9wcy5jbGVhclNlYXJjaCkge1xuICAgICAgICBjbGVhckJ0biA9IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsZWFyQnRuQ2xpY2sgfT5DbGVhcjwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICAgICAgY2xhc3NOYW1lcyA9ICdmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtc20gaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtc20nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lc30+XG4gICAgICAgICAgPGlucHV0IHJlZj0nc2VhY2hJbnB1dCcgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlaG9sZGVyP3RoaXMucHJvcHMuc2VhcmNoUGxhY2Vob2xkZXI6J1NlYXJjaCd9XG4gICAgICAgICAgICBvbktleVVwPXt0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgIHsgY2xlYXJCdG4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckluc2VydFJvd01vZGFsKG1vZGFsQ2xhc3NOYW1lKXtcbiAgICB2YXIgdmFsaWRhdGVTdGF0ZT10aGlzLnN0YXRlLnZhbGlkYXRlU3RhdGV8fHt9O1xuICAgIHZhciBpbnB1dEZpZWxkID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgdmFyIGVkaXRhYmxlPWNvbHVtbi5lZGl0YWJsZSxcbiAgICAgICAgICBmb3JtYXQ9Y29sdW1uLmZvcm1hdCxcbiAgICAgICAgICBhdHRyPXtyZWY6Y29sdW1uLmZpZWxkK2kscGxhY2Vob2xkZXI6ZWRpdGFibGUucGxhY2Vob2xkZXI/ZWRpdGFibGUucGxhY2Vob2xkZXI6Y29sdW1uLm5hbWV9O1xuXG4gICAgICBpZihjb2x1bW4uYXV0b1ZhbHVlKXsvL3doZW4geW91IHdhbnQgc2FtZSBhdXRvIGdlbmVyYXRlIHZhbHVlIGFuZCBub3QgYWxsb3cgZWRpdCwgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvcj12YWxpZGF0ZVN0YXRlW2NvbHVtbi5maWVsZF0/KDxzcGFuIGNsYXNzTmFtZT1cImhlbHAtYmxvY2sgYmctZGFuZ2VyXCI+e3ZhbGlkYXRlU3RhdGVbY29sdW1uLmZpZWxkXX08L3NwYW4+KTpudWxsO1xuXG4gICAgICAvLyBsZXQgZWRpdG9yID0gRWRpdG9yKGVkaXRhYmxlLGF0dHIsZm9ybWF0KTtcbiAgICAgIC8vIGlmKGVkaXRvci5wcm9wcy50eXBlICYmIGVkaXRvci5wcm9wcy50eXBlID09ICdjaGVja2JveCcpe1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBrZXk9e2NvbHVtbi5maWVsZH0+XG4gICAgICAgICAgPGxhYmVsPntjb2x1bW4ubmFtZX08L2xhYmVsPlxuICAgICAgICAgIHtFZGl0b3IoZWRpdGFibGUsYXR0cixmb3JtYXQsJycpfVxuICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICAgIHZhciBtb2RhbENsYXNzID0gY2xhc3NTZXQoXCJtb2RhbFwiLCBcImZhZGVcIiAsIG1vZGFsQ2xhc3NOYW1lLHtcbiAgICAgICdpbic6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvcnx8dGhpcy5zdGF0ZS52YWxpZGF0ZVN0YXRlLy9oYWNrIHByZXZlbnQgYm9vdHN0cmFwIG1vZGFsIGhpZGUgYnkgcmVSZW5kZXJcbiAgICB9KTtcbiAgICB2YXIgZGlhbG9nQ2xhc3M9Y2xhc3NTZXQoXCJtb2RhbC1kaWFsb2dcIixcIm1vZGFsLXNtXCIse1xuICAgICAgXCJhbmltYXRlZFwiOnRoaXMuc3RhdGUuc2hha2VFZGl0b3IsXG4gICAgICBcInNoYWtlXCI6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvclxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj1cIm1vZGFsXCIgIGNsYXNzTmFtZT17bW9kYWxDbGFzc30gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaWFsb2dDbGFzc30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+TmV3IFJlY29yZDwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8Zm9ybSByZWY9XCJmb3JtXCI+XG4gICAgICAgICAgICAgIHtpbnB1dEZpZWxkfVxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvXCIgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2F2ZUJ0bkNsaWNrLmJpbmQodGhpcyl9PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuVG9vbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25Ecm9wUm93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25TaG93T25seVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgZW5hYmxlSW5zZXJ0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlRGVsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlU2hvd09ubHlTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgc2VhcmNoUGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGNsZWFyU2VhcmNoOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxufTtcblxuVG9vbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGVuYWJsZUluc2VydDogZmFsc2UsXG4gIGVuYWJsZURlbGV0ZTogZmFsc2UsXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXG4gIGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ6IGZhbHNlLFxuICBjbGVhclNlYXJjaDogZmFsc2Vcbn1cbmV4cG9ydCBkZWZhdWx0IFRvb2xCYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90b29sYmFyL1Rvb2xCYXIuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBUYWJsZUZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmZpbHRlck9iaiA9IHt9O1xuICB9XG5cbiAgaGFuZGxlS2V5VXAoZSl7XG4gICAgaWYoZS5jdXJyZW50VGFyZ2V0LnZhbHVlLnRyaW0oKSA9PT0gXCJcIilcbiAgICAgIGRlbGV0ZSB0aGlzLmZpbHRlck9ialtlLmN1cnJlbnRUYXJnZXQubmFtZV07XG4gICAgZWxzZVxuICAgICAgdGhpcy5maWx0ZXJPYmpbZS5jdXJyZW50VGFyZ2V0Lm5hbWVdID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuXG4gICAgdGhpcy5wcm9wcy5vbkZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgdGFibGVDbGFzc2VzID0gY2xhc3NTZXQoXCJ0YWJsZVwiLCB7XG4gICAgICAndGFibGUtc3RyaXBlZCc6IHRoaXMucHJvcHMuc3RyaXBlZCxcbiAgICAgICd0YWJsZS1jb25kZW5zZWQnOiB0aGlzLnByb3BzLmNvbmRlbnNlZFxuICAgIH0pO1xuICAgIHZhciBzZWxlY3RSb3dIZWFkZXIgPSBudWxsO1xuXG4gICAgaWYodGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFIHx8XG4gICAgICAgIHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJKXtcbiAgICAgIGxldCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6MzUsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAwLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDBcbiAgICAgIH1cbiAgICAgIHNlbGVjdFJvd0hlYWRlciA9ICg8dGggc3R5bGU9e3N0eWxlfSBrZXk9ey0xfT5GaWx0ZXI8L3RoPik7XG4gICAgfVxuICAgIHZhciBmaWx0ZXJGaWVsZCA9IHRoaXMucHJvcHMuY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uKXtcbiAgICAgIHZhciB0aFN0eWxlID0ge1xuICAgICAgICBkaXNwbGF5OiBjb2x1bW4uaGlkZGVuP1wibm9uZVwiOm51bGwsXG4gICAgICAgIHdpZHRoOiBjb2x1bW4ud2lkdGhcbiAgICAgIH07XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0aCBrZXk9e2NvbHVtbi5uYW1lfSBzdHlsZT17dGhTdHlsZX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aC1pbm5lciB0YWJsZS1oZWFkZXItY29sdW1uXCI+XG4gICAgICAgICAgICA8aW5wdXQgc2l6ZT1cIjEwXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj17Y29sdW1uLm5hbWV9IG5hbWU9e2NvbHVtbi5uYW1lfSBvbktleVVwPXt0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90aD5cbiAgICAgIClcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4oXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzZXN9IHN0eWxlPXt7bWFyZ2luVG9wOjV9fT5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0ciBzdHlsZT17e2JvcmRlckJvdHRvbVN0eWxlOiAnaGlkZGVuJ319PlxuICAgICAgICAgICAge3NlbGVjdFJvd0hlYWRlcn17ZmlsdGVyRmllbGR9XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgIDwvdGFibGU+XG4gICAgKVxuICB9XG59XG5UYWJsZUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNvbHVtbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgcm93U2VsZWN0VHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25GaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuZXhwb3J0IGRlZmF1bHQgVGFibGVGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUZpbHRlci5qc1xuICoqLyIsImltcG9ydCBDb25zdCBmcm9tIFwiLi4vQ29uc3RcIjtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbmZ1bmN0aW9uIF9zb3J0KGFyciwgc29ydEZpZWxkLCBvcmRlciwgc29ydEZ1bmMpIHtcbiAgb3JkZXIgPSBvcmRlci50b0xvd2VyQ2FzZSgpO1xuICBhcnIuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChzb3J0RnVuYykge1xuICAgICAgcmV0dXJuIHNvcnRGdW5jKGEsIGIsIG9yZGVyLCBzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3JkZXIgPT0gQ29uc3QuU09SVF9ERVNDKSB7XG4gICAgICAgIHJldHVybiBhW3NvcnRGaWVsZF0gPiBiW3NvcnRGaWVsZF0gPyAtMSA6ICgoYVtzb3J0RmllbGRdIDwgYltzb3J0RmllbGRdKSA/IDEgOiAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhW3NvcnRGaWVsZF0gPCBiW3NvcnRGaWVsZF0gPyAtMSA6ICgoYVtzb3J0RmllbGRdID4gYltzb3J0RmllbGRdKSA/IDEgOiAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZURhdGFTZXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoZGF0YSk7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgZGF0YSk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZURhdGFTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5jb2xJbmZvcyA9IG51bGw7XG4gICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgIHRoaXMuaXNPbkZpbHRlciA9IGZhbHNlO1xuICAgIHRoaXMuZmlsdGVyT2JqID0gbnVsbDtcbiAgICB0aGlzLnNlYXJjaFRleHQgPSBudWxsO1xuICAgIHRoaXMuc29ydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wYWdlT2JqID0ge307XG4gICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgIHRoaXMubXVsdGlDb2x1bW5TZWFyY2ggPSBmYWxzZTtcbiAgICB0aGlzLnNob3dPbmx5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlbW90ZSA9IGZhbHNlOyAvLyByZW1vdGUgZGF0YVxuICB9XG5cbiAgc2V0UHJvcHMocHJvcHMpIHtcbiAgICB0aGlzLmtleUZpZWxkID0gcHJvcHMua2V5RmllbGQ7XG4gICAgdGhpcy5lbmFibGVQYWdpbmF0aW9uID0gcHJvcHMuaXNQYWdpbmF0aW9uO1xuICAgIHRoaXMuY29sSW5mb3MgPSBwcm9wcy5jb2xJbmZvcztcbiAgICB0aGlzLnJlbW90ZSA9IHByb3BzLnJlbW90ZTtcbiAgICB0aGlzLm11bHRpQ29sdW1uU2VhcmNoID0gcHJvcHMubXVsdGlDb2x1bW5TZWFyY2g7XG4gIH1cblxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIGlmIChudWxsICE9PSB0aGlzLmZpbHRlck9iaikgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJPYmopO1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuc2VhcmNoVGV4dCkgdGhpcy5zZWFyY2godGhpcy5zZWFyY2hUZXh0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc29ydE9iaikge1xuICAgICAgdGhpcy5zb3J0KHRoaXMuc29ydE9iai5vcmRlciwgdGhpcy5zb3J0T2JqLnNvcnRGaWVsZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U29ydEluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuc29ydE9iajtcbiAgfVxuXG4gIHNldFNlbGVjdGVkUm93S2V5KHNlbGVjdGVkUm93S2V5cykge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZFJvd0tleXM7XG4gIH1cblxuICBnZXRTZWxlY3RlZFJvd0tleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBnZXRDdXJyZW50RGlzcGxheURhdGEoKSB7XG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikgcmV0dXJuIHRoaXMuZmlsdGVyZWREYXRhO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxuXG4gIGlnbm9yZU5vblNlbGVjdGVkKCkge1xuICAgIHRoaXMuc2hvd09ubHlTZWxlY3RlZCA9ICF0aGlzLnNob3dPbmx5U2VsZWN0ZWQ7XG4gICAgaWYodGhpcy5zaG93T25seVNlbGVjdGVkKXtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IHRydWU7XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIHJvdyA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLmZpbmQoeCA9PiByb3dbdGhpcy5rZXlGaWVsZF0gPT09IHgpXG4gICAgICAgIHJldHVybiB0eXBlb2YgcmVzdWx0ICE9PSAndW5kZWZpbmVkJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzb3J0KG9yZGVyLCBzb3J0RmllbGQpIHtcbiAgICB0aGlzLnNvcnRPYmogPSB7XG4gICAgICBvcmRlcjogb3JkZXIsXG4gICAgICBzb3J0RmllbGQ6IHNvcnRGaWVsZFxuICAgIH07XG5cbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBpZighdGhpcy5jb2xJbmZvc1tzb3J0RmllbGRdKSByZXR1cm4gdGhpcztcblxuICAgIGNvbnN0IHsgc29ydEZ1bmMgfSA9IHRoaXMuY29sSW5mb3Nbc29ydEZpZWxkXTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEgPSBfc29ydChjdXJyZW50RGlzcGxheURhdGEsIHNvcnRGaWVsZCwgb3JkZXIsIHNvcnRGdW5jKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcGFnZShwYWdlLCBzaXplUGVyUGFnZSkge1xuICAgIHRoaXMucGFnZU9iai5lbmQgPSBwYWdlICogc2l6ZVBlclBhZ2UgLSAxO1xuICAgIHRoaXMucGFnZU9iai5zdGFydCA9IHRoaXMucGFnZU9iai5lbmQgLSAoc2l6ZVBlclBhZ2UgLSAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVkaXQobmV3VmFsLCByb3dJbmRleCwgZmllbGROYW1lKSB7XG4gICAgbGV0IGN1cnJlbnREaXNwbGF5RGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgbGV0IHJvd0tleUNhY2hlO1xuICAgIGlmICghdGhpcy5lbmFibGVQYWdpbmF0aW9uKSB7XG4gICAgICBjdXJyZW50RGlzcGxheURhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBuZXdWYWw7XG4gICAgICByb3dLZXlDYWNoZSA9IGN1cnJlbnREaXNwbGF5RGF0YVtyb3dJbmRleF1bdGhpcy5rZXlGaWVsZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnREaXNwbGF5RGF0YVt0aGlzLnBhZ2VPYmouc3RhcnQgKyByb3dJbmRleF1bZmllbGROYW1lXSA9IG5ld1ZhbDtcbiAgICAgIHJvd0tleUNhY2hlID0gY3VycmVudERpc3BsYXlEYXRhW3RoaXMucGFnZU9iai5zdGFydCArIHJvd0luZGV4XVt0aGlzLmtleUZpZWxkXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgdGhpcy5kYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdID09PSByb3dLZXlDYWNoZSkge1xuICAgICAgICAgIHJvd1tmaWVsZE5hbWVdID0gbmV3VmFsO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICAgIGlmIChudWxsICE9PSB0aGlzLmZpbHRlck9iaikgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJPYmopO1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuc2VhcmNoVGV4dCkgdGhpcy5zZWFyY2godGhpcy5zZWFyY2hUZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRBdEJlZ2luKG5ld09iaikge1xuICAgIGlmICghbmV3T2JqW3RoaXMua2V5RmllbGRdIHx8IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpID09PSAnJykge1xuICAgICAgdGhyb3cgdGhpcy5rZXlGaWVsZCArIFwiIGNhbid0IGJlIGVtcHR5IHZhbHVlLlwiO1xuICAgIH1cbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IHRoaXMua2V5RmllbGQgKyBcIiBcIiArIG5ld09ialt0aGlzLmtleUZpZWxkXSArIFwiIGFscmVhZHkgZXhpc3RzXCI7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgY29uc29sZS5sb2coJ0BAJyk7XG4gICAgY3VycmVudERpc3BsYXlEYXRhLnVuc2hpZnQobmV3T2JqKTtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICB0aGlzLmRhdGEudW5zaGlmdChuZXdPYmopO1xuICAgIH1cbiAgfVxuXG4gIGFkZChuZXdPYmopIHtcbiAgICBpZiAoIW5ld09ialt0aGlzLmtleUZpZWxkXSB8fCBuZXdPYmpbdGhpcy5rZXlGaWVsZF0udG9TdHJpbmcoKSA9PT0gJycpIHtcbiAgICAgIHRocm93IHRoaXMua2V5RmllbGQgKyBcIiBjYW4ndCBiZSBlbXB0eSB2YWx1ZS5cIjtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnREaXNwbGF5RGF0YSA9IHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCk7XG4gICAgY3VycmVudERpc3BsYXlEYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgaWYgKHJvd1t0aGlzLmtleUZpZWxkXS50b1N0cmluZygpID09PSBuZXdPYmpbdGhpcy5rZXlGaWVsZF0udG9TdHJpbmcoKSkge1xuICAgICAgICB0aHJvdyB0aGlzLmtleUZpZWxkICsgXCIgXCIgKyBuZXdPYmpbdGhpcy5rZXlGaWVsZF0gKyBcIiBhbHJlYWR5IGV4aXN0c1wiO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgY3VycmVudERpc3BsYXlEYXRhLnB1c2gobmV3T2JqKTtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICB0aGlzLmRhdGEucHVzaChuZXdPYmopO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZShyb3dLZXkpIHtcbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBsZXQgcmVzdWx0ID0gY3VycmVudERpc3BsYXlEYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICByZXR1cm4gcm93S2V5LmluZGV4T2Yocm93W3RoaXMua2V5RmllbGRdKSA9PSAtMTtcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4gcm93S2V5LmluZGV4T2Yocm93W3RoaXMua2V5RmllbGRdKSA9PSAtMTtcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXIoZmlsdGVyT2JqKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGZpbHRlck9iaikubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gbnVsbDtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IGZhbHNlO1xuICAgICAgdGhpcy5maWx0ZXJPYmogPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IGZpbHRlck9iajtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZpbHRlclZhbDtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGZpbHRlck9iaikge1xuICAgICAgICAgIGxldCB0YXJnZXRWYWwgPSByb3dba2V5XTtcblxuICAgICAgICAgIHN3aXRjaCAoZmlsdGVyT2JqW2tleV0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnZhbHVlLm51bWJlcjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsdGVyVmFsID0gKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICAgICAgICh0eXBlb2YgZmlsdGVyT2JqW2tleV0udmFsdWUgPT09IFwic3RyaW5nXCIpID8gZmlsdGVyT2JqW2tleV0udmFsdWUudG9Mb3dlckNhc2UoKSA6IGZpbHRlck9ialtrZXldLnZhbHVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgZmlsdGVyVmFsID0gKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyBmaWx0ZXJPYmpba2V5XS52YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmlsdGVyT2JqW2tleV0udmFsdWU7XG4gICAgICAgICAgICAgIGlmIChmaWx0ZXJWYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgb2xkIGZpbHRlclxuICAgICAgICAgICAgICAgIGZpbHRlclZhbCA9IGZpbHRlck9ialtrZXldLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuY29sSW5mb3Nba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZpbHRlckZvcm1hdHRlZCwgZm9ybWF0RXh0cmFEYXRhIH0gPSB0aGlzLmNvbEluZm9zW2tleV07XG4gICAgICAgICAgICBpZihmaWx0ZXJGb3JtYXR0ZWQgJiYgZm9ybWF0KSB7XG4gICAgICAgICAgICAgIHRhcmdldFZhbCA9IGZvcm1hdChyb3dba2V5XSwgcm93LCBmb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXRjaCAoZmlsdGVyT2JqW2tleV0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVI6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJOdW1iZXIodGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGZpbHRlck9ialtrZXldLnZhbHVlLmNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuREFURTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlckRhdGUodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YWxpZCA9IHRoaXMuZmlsdGVyQ3VzdG9tKHRhcmdldFZhbCwgZmlsdGVyVmFsLCBmaWx0ZXJPYmpba2V5XS52YWx1ZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICB2YWxpZCA9IHRoaXMuZmlsdGVyVGV4dCh0YXJnZXRWYWwsIGZpbHRlclZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlck51bWJlcih0YXJnZXRWYWwsIGZpbHRlclZhbCwgY29tcGFyYXRvcikge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgc3dpdGNoIChjb21wYXJhdG9yKSB7XG4gICAgICBjYXNlIFwiPVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsICE9IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPlwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsIDw9IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPj1cIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldFZhbCA8IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPFwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsID49IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiPD1cIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldFZhbCA+IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiIT1cIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldFZhbCA9PSBmaWx0ZXJWYWwpIHtcbiAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk51bWJlciBjb21wYXJhdG9yIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICBmaWx0ZXJEYXRlKHRhcmdldFZhbCwgZmlsdGVyVmFsKSB7XG4gICAgcmV0dXJuICh0YXJnZXRWYWwuZ2V0RGF0ZSgpID09IGZpbHRlclZhbC5nZXREYXRlKCkgJiZcbiAgICAgICAgdGFyZ2V0VmFsLmdldE1vbnRoKCkgPT0gZmlsdGVyVmFsLmdldE1vbnRoKCkgJiZcbiAgICAgICAgdGFyZ2V0VmFsLmdldEZ1bGxZZWFyKCkgPT0gZmlsdGVyVmFsLmdldEZ1bGxZZWFyKCkpO1xuICB9XG5cbiAgZmlsdGVyQ3VzdG9tKHRhcmdldFZhbCwgZmlsdGVyVmFsLCBjYWxsYmFja0luZm8pIHtcbiAgICBpZiAoY2FsbGJhY2tJbmZvICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrSW5mbyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrSW5mby5jYWxsYmFjayh0YXJnZXRWYWwsIGNhbGxiYWNrSW5mby5jYWxsYmFja1BhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJUZXh0KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgfVxuXG4gIGZpbHRlclRleHQodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpIHtcbiAgICBpZiAodGFyZ2V0VmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbCkgPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qIEdlbmVyYWwgc2VhcmNoIGZ1bmN0aW9uXG4gICAqIEl0IHdpbGwgc2VhcmNoIGZvciB0aGUgdGV4dCBpZiB0aGUgaW5wdXQgaW5jbHVkZXMgdGhhdCB0ZXh0O1xuICAgKiBJdCB3aWxsIHNlYXJjaCBmb3IgZXhhY3QgbnVtYmVyIGlmIHRoZSBpbnB1dCBpcyB0aGF0IG51bWJlclxuICAgKi9cbiAgc2VhcmNoKHNlYXJjaFRleHQpIHtcbiAgICBpZiAoc2VhcmNoVGV4dC50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gbnVsbDtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgIGxldCBzZWFyY2hUZXh0QXJyYXkgPSBbXTtcblxuICAgICAgaWYgKHRoaXMubXVsdGlDb2x1bW5TZWFyY2gpIHtcbiAgICAgICAgc2VhcmNoVGV4dEFycmF5ID0gc2VhcmNoVGV4dC5zcGxpdCgnICcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoVGV4dEFycmF5LnB1c2goc2VhcmNoVGV4dCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJvdyk7XG4gICAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAvLyBmb3IgbG9vcHMgYXJlIHVnbHksIGJ1dCBwZXJmb3JtYW5jZSBtYXR0ZXJzIGhlcmUuXG4gICAgICAgIC8vIEFuZCB5b3UgY2FudCBicmVhayBmcm9tIGEgZm9yRWFjaC5cbiAgICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vZm9yLXZzLWZvcmVhY2gvNjZcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGtleXNMZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGtleXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKHRoaXMuY29sSW5mb3Nba2V5XSAmJiByb3dba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZpbHRlckZvcm1hdHRlZCwgZm9ybWF0RXh0cmFEYXRhLCBzZWFyY2hhYmxlLCBoaWRkZW4gfSA9IHRoaXMuY29sSW5mb3Nba2V5XTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRWYWwgPSByb3dba2V5XTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hhYmxlKSB7XG4gICAgICAgICAgICAgIGlmIChmaWx0ZXJGb3JtYXR0ZWQgJiYgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0VmFsID0gZm9ybWF0KHRhcmdldFZhbCwgcm93LCBmb3JtYXRFeHRyYURhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCB0ZXh0TGVuZ3RoID0gc2VhcmNoVGV4dEFycmF5Lmxlbmd0aDsgaiA8IHRleHRMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlclZhbCA9IHNlYXJjaFRleHRBcnJheVtqXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRWYWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0YUlnbm9yaW5nUGFnaW5hdGlvbigpIHtcbiAgICBsZXQgX2RhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIHJldHVybiBfZGF0YTtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICBsZXQgX2RhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuXG4gICAgaWYgKF9kYXRhLmxlbmd0aCA9PSAwKSByZXR1cm4gX2RhdGE7XG5cbiAgICBpZiAodGhpcy5yZW1vdGUgfHwgIXRoaXMuZW5hYmxlUGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuIF9kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy5wYWdlT2JqLnN0YXJ0OyBpIDw9IHRoaXMucGFnZU9iai5lbmQ7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChfZGF0YVtpXSk7XG4gICAgICAgIGlmIChpICsgMSA9PSBfZGF0YS5sZW5ndGgpYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGdldEtleUZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLmtleUZpZWxkO1xuICB9XG5cbiAgZ2V0RGF0YU51bSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKS5sZW5ndGg7XG4gIH1cblxuICBpc0NoYW5nZWRQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2VPYmouc3RhcnQgJiYgdGhpcy5wYWdlT2JqLmVuZCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGdldEFsbFJvd2tleSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICByZXR1cm4gcm93W3RoaXMua2V5RmllbGRdO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbn1cbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N0b3JlL1RhYmxlRGF0YVN0b3JlLmpzXG4gKiovIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2V2ZW50cy9ldmVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xuICB2YXIgZmlsZXNhdmVyID0gcmVxdWlyZSgnLi9maWxlc2F2ZXInKTtcbiAgdmFyIHNhdmVBcyA9IGZpbGVzYXZlci5zYXZlQXNcbn1cblxuZnVuY3Rpb24gdG9TdHJpbmcoZGF0YSwga2V5cykge1xuICB2YXIgZGF0YVN0cmluZyA9IFwiXCI7XG4gIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGRhdGFTdHJpbmc7XG5cbiAgZGF0YVN0cmluZyArPSBrZXlzLmpvaW4oJywnKSArICdcXG4nXG5cbiAgZGF0YS5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAga2V5cy5tYXAoZnVuY3Rpb24oY29sLCBpKSB7XG4gICAgICBsZXQgY2VsbCA9IHR5cGVvZiByb3dbY29sXSAhPT0gJ3VuZGVmaW5lZCcgPyAoJ1wiJytyb3dbY29sXSsnXCInKSA6IFwiXCI7XG4gICAgICBkYXRhU3RyaW5nICs9IGNlbGw7XG4gICAgICBpZiAoaSsxIDwga2V5cy5sZW5ndGgpXG4gICAgICAgIGRhdGFTdHJpbmcgKz0gJywnO1xuICAgIH0pO1xuXG4gICAgZGF0YVN0cmluZyArPSAnXFxuJztcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGFTdHJpbmc7XG59O1xuXG52YXIgZXhwb3J0Q1NWID0gZnVuY3Rpb24oZGF0YSwga2V5cywgZmlsZW5hbWUpIHtcbiAgdmFyIGRhdGFTdHJpbmcgPSB0b1N0cmluZyhkYXRhLCBrZXlzKTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2F2ZUFzKCBuZXcgQmxvYihbZGF0YVN0cmluZ10sIHt0eXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD11dGYtOFwifSksIGZpbGVuYW1lIHx8ICdzcHJlYWRzaGVldC5jc3YnICk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0Q1NWO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY3N2X2V4cG9ydF91dGlsLmpzXG4gKiovIiwiLyogRmlsZVNhdmVyLmpzXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMS4yMDE1MTAwM1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIExpY2Vuc2U6IE1JVFxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuXG4vKmdsb2JhbCBzZWxmICovXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlLCBpbmRlbnQ6IDQsIGxheGJyZWFrOiB0cnVlLCBsYXhjb21tYTogdHJ1ZSwgc21hcnR0YWJzOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0ZpbGVTYXZlci5qcyAqL1xuXG52YXIgc2F2ZUFzID0gc2F2ZUFzIHx8IChmdW5jdGlvbih2aWV3KSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHQvLyBJRSA8MTAgaXMgZXhwbGljaXRseSB1bnN1cHBvcnRlZFxuXHRpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiAvTVNJRSBbMS05XVxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXJcblx0XHQgIGRvYyA9IHZpZXcuZG9jdW1lbnRcblx0XHQgIC8vIG9ubHkgZ2V0IFVSTCB3aGVuIG5lY2Vzc2FyeSBpbiBjYXNlIEJsb2IuanMgaGFzbid0IG92ZXJyaWRkZW4gaXQgeWV0XG5cdFx0LCBnZXRfVVJMID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdmlldy5VUkwgfHwgdmlldy53ZWJraXRVUkwgfHwgdmlldztcblx0XHR9XG5cdFx0LCBzYXZlX2xpbmsgPSBkb2MuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImFcIilcblx0XHQsIGNhbl91c2Vfc2F2ZV9saW5rID0gXCJkb3dubG9hZFwiIGluIHNhdmVfbGlua1xuXHRcdCwgY2xpY2sgPSBmdW5jdGlvbihub2RlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgTW91c2VFdmVudChcImNsaWNrXCIpO1xuXHRcdFx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHR9XG5cdFx0LCBpc19zYWZhcmkgPSAvVmVyc2lvblxcL1tcXGRcXC5dKy4qU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0LCB3ZWJraXRfcmVxX2ZzID0gdmlldy53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbVxuXHRcdCwgcmVxX2ZzID0gdmlldy5yZXF1ZXN0RmlsZVN5c3RlbSB8fCB3ZWJraXRfcmVxX2ZzIHx8IHZpZXcubW96UmVxdWVzdEZpbGVTeXN0ZW1cblx0XHQsIHRocm93X291dHNpZGUgPSBmdW5jdGlvbihleCkge1xuXHRcdFx0KHZpZXcuc2V0SW1tZWRpYXRlIHx8IHZpZXcuc2V0VGltZW91dCkoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRocm93IGV4O1xuXHRcdFx0fSwgMCk7XG5cdFx0fVxuXHRcdCwgZm9yY2Vfc2F2ZWFibGVfdHlwZSA9IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCJcblx0XHQsIGZzX21pbl9zaXplID0gMFxuXHRcdC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzc1Mjk3I2M3IGFuZFxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9jb21taXQvNDg1OTMwYSNjb21taXRjb21tZW50LTg3NjgwNDdcblx0XHQvLyBmb3IgdGhlIHJlYXNvbmluZyBiZWhpbmQgdGhlIHRpbWVvdXQgYW5kIHJldm9jYXRpb24gZmxvd1xuXHRcdCwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0ID0gNTAwIC8vIGluIG1zXG5cdFx0LCByZXZva2UgPSBmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHR2YXIgcmV2b2tlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG5cdFx0XHRcdFx0Z2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtcblx0XHRcdFx0fSBlbHNlIHsgLy8gZmlsZSBpcyBhIEZpbGVcblx0XHRcdFx0XHRmaWxlLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHZpZXcuY2hyb21lKSB7XG5cdFx0XHRcdHJldm9rZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNldFRpbWVvdXQocmV2b2tlciwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0LCBkaXNwYXRjaCA9IGZ1bmN0aW9uKGZpbGVzYXZlciwgZXZlbnRfdHlwZXMsIGV2ZW50KSB7XG5cdFx0XHRldmVudF90eXBlcyA9IFtdLmNvbmNhdChldmVudF90eXBlcyk7XG5cdFx0XHR2YXIgaSA9IGV2ZW50X3R5cGVzLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdFx0dmFyIGxpc3RlbmVyID0gZmlsZXNhdmVyW1wib25cIiArIGV2ZW50X3R5cGVzW2ldXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGxpc3RlbmVyLmNhbGwoZmlsZXNhdmVyLCBldmVudCB8fCBmaWxlc2F2ZXIpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGV4KSB7XG5cdFx0XHRcdFx0XHR0aHJvd19vdXRzaWRlKGV4KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0LCBhdXRvX2JvbSA9IGZ1bmN0aW9uKGJsb2IpIHtcblx0XHRcdC8vIHByZXBlbmQgQk9NIGZvciBVVEYtOCBYTUwgYW5kIHRleHQvKiB0eXBlcyAoaW5jbHVkaW5nIEhUTUwpXG5cdFx0XHRpZiAoL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYmxvYi50eXBlKSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEJsb2IoW1wiXFx1ZmVmZlwiLCBibG9iXSwge3R5cGU6IGJsb2IudHlwZX0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGJsb2I7XG5cdFx0fVxuXHRcdCwgRmlsZVNhdmVyID0gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdGlmICghbm9fYXV0b19ib20pIHtcblx0XHRcdFx0YmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRmlyc3QgdHJ5IGEuZG93bmxvYWQsIHRoZW4gd2ViIGZpbGVzeXN0ZW0sIHRoZW4gb2JqZWN0IFVSTHNcblx0XHRcdHZhclxuXHRcdFx0XHQgIGZpbGVzYXZlciA9IHRoaXNcblx0XHRcdFx0LCB0eXBlID0gYmxvYi50eXBlXG5cdFx0XHRcdCwgYmxvYl9jaGFuZ2VkID0gZmFsc2Vcblx0XHRcdFx0LCBvYmplY3RfdXJsXG5cdFx0XHRcdCwgdGFyZ2V0X3ZpZXdcblx0XHRcdFx0LCBkaXNwYXRjaF9hbGwgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkaXNwYXRjaChmaWxlc2F2ZXIsIFwid3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSB3cml0ZWVuZFwiLnNwbGl0KFwiIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuXHRcdFx0XHQsIGZzX2Vycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKHRhcmdldF92aWV3ICYmIGlzX3NhZmFyaSAmJiB0eXBlb2YgRmlsZVJlYWRlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0Ly8gU2FmYXJpIGRvZXNuJ3QgYWxsb3cgZG93bmxvYWRpbmcgb2YgYmxvYiB1cmxzXG5cdFx0XHRcdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0XHRcdHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGJhc2U2NERhdGEgPSByZWFkZXIucmVzdWx0O1xuXHRcdFx0XHRcdFx0XHR0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gXCJkYXRhOmF0dGFjaG1lbnQvZmlsZVwiICsgYmFzZTY0RGF0YS5zbGljZShiYXNlNjREYXRhLnNlYXJjaCgvWyw7XS8pKTtcblx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2hfYWxsKCk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG5cdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuXHRcdFx0XHRcdGlmIChibG9iX2NoYW5nZWQgfHwgIW9iamVjdF91cmwpIHtcblx0XHRcdFx0XHRcdG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGFyZ2V0X3ZpZXcpIHtcblx0XHRcdFx0XHRcdHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3X3RhYiA9IHZpZXcub3BlbihvYmplY3RfdXJsLCBcIl9ibGFua1wiKTtcblx0XHRcdFx0XHRcdGlmIChuZXdfdGFiID09IHVuZGVmaW5lZCAmJiBpc19zYWZhcmkpIHtcblx0XHRcdFx0XHRcdFx0Ly9BcHBsZSBkbyBub3QgYWxsb3cgd2luZG93Lm9wZW4sIHNlZSBodHRwOi8vYml0Lmx5LzFrWmZmUklcblx0XHRcdFx0XHRcdFx0dmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdGRpc3BhdGNoX2FsbCgpO1xuXHRcdFx0XHRcdHJldm9rZShvYmplY3RfdXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQsIGFib3J0YWJsZSA9IGZ1bmN0aW9uKGZ1bmMpIHtcblx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZXNhdmVyLnJlYWR5U3RhdGUgIT09IGZpbGVzYXZlci5ET05FKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHQsIGNyZWF0ZV9pZl9ub3RfZm91bmQgPSB7Y3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlfVxuXHRcdFx0XHQsIHNsaWNlXG5cdFx0XHQ7XG5cdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuXHRcdFx0aWYgKCFuYW1lKSB7XG5cdFx0XHRcdG5hbWUgPSBcImRvd25sb2FkXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2FuX3VzZV9zYXZlX2xpbmspIHtcblx0XHRcdFx0b2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0XHRcdHNhdmVfbGluay5ocmVmID0gb2JqZWN0X3VybDtcblx0XHRcdFx0c2F2ZV9saW5rLmRvd25sb2FkID0gbmFtZTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjbGljayhzYXZlX2xpbmspO1xuXHRcdFx0XHRcdGRpc3BhdGNoX2FsbCgpO1xuXHRcdFx0XHRcdHJldm9rZShvYmplY3RfdXJsKTtcblx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8gT2JqZWN0IGFuZCB3ZWIgZmlsZXN5c3RlbSBVUkxzIGhhdmUgYSBwcm9ibGVtIHNhdmluZyBpbiBHb29nbGUgQ2hyb21lIHdoZW5cblx0XHRcdC8vIHZpZXdlZCBpbiBhIHRhYiwgc28gSSBmb3JjZSBzYXZlIHdpdGggYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG5cdFx0XHQvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD05MTE1OFxuXHRcdFx0Ly8gVXBkYXRlOiBHb29nbGUgZXJyYW50bHkgY2xvc2VkIDkxMTU4LCBJIHN1Ym1pdHRlZCBpdCBhZ2Fpbjpcblx0XHRcdC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zODk2NDJcblx0XHRcdGlmICh2aWV3LmNocm9tZSAmJiB0eXBlICYmIHR5cGUgIT09IGZvcmNlX3NhdmVhYmxlX3R5cGUpIHtcblx0XHRcdFx0c2xpY2UgPSBibG9iLnNsaWNlIHx8IGJsb2Iud2Via2l0U2xpY2U7XG5cdFx0XHRcdGJsb2IgPSBzbGljZS5jYWxsKGJsb2IsIDAsIGJsb2Iuc2l6ZSwgZm9yY2Vfc2F2ZWFibGVfdHlwZSk7XG5cdFx0XHRcdGJsb2JfY2hhbmdlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHQvLyBTaW5jZSBJIGNhbid0IGJlIHN1cmUgdGhhdCB0aGUgZ3Vlc3NlZCBtZWRpYSB0eXBlIHdpbGwgdHJpZ2dlciBhIGRvd25sb2FkXG5cdFx0XHQvLyBpbiBXZWJLaXQsIEkgYXBwZW5kIC5kb3dubG9hZCB0byB0aGUgZmlsZW5hbWUuXG5cdFx0XHQvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjU0NDBcblx0XHRcdGlmICh3ZWJraXRfcmVxX2ZzICYmIG5hbWUgIT09IFwiZG93bmxvYWRcIikge1xuXHRcdFx0XHRuYW1lICs9IFwiLmRvd25sb2FkXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZSA9PT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSB8fCB3ZWJraXRfcmVxX2ZzKSB7XG5cdFx0XHRcdHRhcmdldF92aWV3ID0gdmlldztcblx0XHRcdH1cblx0XHRcdGlmICghcmVxX2ZzKSB7XG5cdFx0XHRcdGZzX2Vycm9yKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGZzX21pbl9zaXplICs9IGJsb2Iuc2l6ZTtcblx0XHRcdHJlcV9mcyh2aWV3LlRFTVBPUkFSWSwgZnNfbWluX3NpemUsIGFib3J0YWJsZShmdW5jdGlvbihmcykge1xuXHRcdFx0XHRmcy5yb290LmdldERpcmVjdG9yeShcInNhdmVkXCIsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbihkaXIpIHtcblx0XHRcdFx0XHR2YXIgc2F2ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0ZGlyLmdldEZpbGUobmFtZSwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0ZmlsZS5jcmVhdGVXcml0ZXIoYWJvcnRhYmxlKGZ1bmN0aW9uKHdyaXRlcikge1xuXHRcdFx0XHRcdFx0XHRcdHdyaXRlci5vbndyaXRlZW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBmaWxlLnRvVVJMKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goZmlsZXNhdmVyLCBcIndyaXRlZW5kXCIsIGV2ZW50KTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldm9rZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdHdyaXRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSB3cml0ZXIuZXJyb3I7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IuY29kZSAhPT0gZXJyb3IuQUJPUlRfRVJSKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZzX2Vycm9yKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcIndyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgYWJvcnRcIi5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0d3JpdGVyW1wib25cIiArIGV2ZW50XSA9IGZpbGVzYXZlcltcIm9uXCIgKyBldmVudF07XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0d3JpdGVyLndyaXRlKGJsb2IpO1xuXHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0d3JpdGVyLmFib3J0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuV1JJVElORztcblx0XHRcdFx0XHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHRcdFx0XHRcdH0pLCBmc19lcnJvcik7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRkaXIuZ2V0RmlsZShuYW1lLCB7Y3JlYXRlOiBmYWxzZX0sIGFib3J0YWJsZShmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHQvLyBkZWxldGUgZmlsZSBpZiBpdCBhbHJlYWR5IGV4aXN0c1xuXHRcdFx0XHRcdFx0ZmlsZS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdHNhdmUoKTtcblx0XHRcdFx0XHR9KSwgYWJvcnRhYmxlKGZ1bmN0aW9uKGV4KSB7XG5cdFx0XHRcdFx0XHRpZiAoZXguY29kZSA9PT0gZXguTk9UX0ZPVU5EX0VSUikge1xuXHRcdFx0XHRcdFx0XHRzYXZlKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRmc19lcnJvcigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0fSksIGZzX2Vycm9yKTtcblx0XHRcdH0pLCBmc19lcnJvcik7XG5cdFx0fVxuXHRcdCwgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlXG5cdFx0LCBzYXZlQXMgPSBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0cmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pO1xuXHRcdH1cblx0O1xuXHQvLyBJRSAxMCsgKG5hdGl2ZSBzYXZlQXMpXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRpZiAoIW5vX2F1dG9fYm9tKSB7XG5cdFx0XHRcdGJsb2IgPSBhdXRvX2JvbShibG9iKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBuYW1lIHx8IFwiZG93bmxvYWRcIik7XG5cdFx0fTtcblx0fVxuXG5cdEZTX3Byb3RvLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGZpbGVzYXZlciA9IHRoaXM7XG5cdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRkaXNwYXRjaChmaWxlc2F2ZXIsIFwiYWJvcnRcIik7XG5cdH07XG5cdEZTX3Byb3RvLnJlYWR5U3RhdGUgPSBGU19wcm90by5JTklUID0gMDtcblx0RlNfcHJvdG8uV1JJVElORyA9IDE7XG5cdEZTX3Byb3RvLkRPTkUgPSAyO1xuXG5cdEZTX3Byb3RvLmVycm9yID1cblx0RlNfcHJvdG8ub253cml0ZXN0YXJ0ID1cblx0RlNfcHJvdG8ub25wcm9ncmVzcyA9XG5cdEZTX3Byb3RvLm9ud3JpdGUgPVxuXHRGU19wcm90by5vbmFib3J0ID1cblx0RlNfcHJvdG8ub25lcnJvciA9XG5cdEZTX3Byb3RvLm9ud3JpdGVlbmQgPVxuXHRcdG51bGw7XG5cblx0cmV0dXJuIHNhdmVBcztcbn0oXG5cdCAgIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGZcblx0fHwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3dcblx0fHwgdGhpcy5jb250ZW50XG4pKTtcbi8vIGBzZWxmYCBpcyB1bmRlZmluZWQgaW4gRmlyZWZveCBmb3IgQW5kcm9pZCBjb250ZW50IHNjcmlwdCBjb250ZXh0XG4vLyB3aGlsZSBgdGhpc2AgaXMgbnNJQ29udGVudEZyYW1lTWVzc2FnZU1hbmFnZXJcbi8vIHdpdGggYW4gYXR0cmlidXRlIGBjb250ZW50YCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB3aW5kb3dcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMuc2F2ZUFzID0gc2F2ZUFzO1xufSBlbHNlIGlmICgodHlwZW9mIGRlZmluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmUgIT09IG51bGwpICYmIChkZWZpbmUuYW1kICE9IG51bGwpKSB7XG4gIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNhdmVBcztcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWxlc2F2ZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7IH07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoZGF0YSk7XG4gICAgICAgIHRoaXMuY3VycmVudEZpbHRlciA9IHt9O1xuICAgIH1cblxuICAgIGhhbmRsZUZpbHRlcihkYXRhRmllbGQsIHZhbHVlLCB0eXBlKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlclR5cGUgPSB0eXBlIHx8IENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTTtcblxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvLyB2YWx1ZSBvZiB0aGUgZmlsdGVyIGlzIGFuIG9iamVjdFxuICAgICAgICAgICAgbGV0IGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlW3Byb3BdIHx8IHZhbHVlW3Byb3BdID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgb2JqZWN0IHByb3BlcnRpZXMgaXMgdW5kZWZpbmVkIG9yIGVtcHR5LCB3ZSByZW1vdmUgdGhlIGZpbHRlclxuICAgICAgICAgICAgKGhhc1ZhbHVlKSA/IHRoaXMuY3VycmVudEZpbHRlcltkYXRhRmllbGRdID0ge3ZhbHVlOiB2YWx1ZSwgdHlwZTogZmlsdGVyVHlwZX0gOiBkZWxldGUgdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF07XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlIHx8IHZhbHVlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY3VycmVudEZpbHRlcltkYXRhRmllbGRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyW2RhdGFGaWVsZF0gPSB7dmFsdWU6IHZhbHVlLnRyaW0oKSwgdHlwZTogZmlsdGVyVHlwZX07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KCdvbkZpbHRlckNoYW5nZScsIHRoaXMuY3VycmVudEZpbHRlcik7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRmlsdGVyLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRGF0ZUZpbHRlciBmcm9tICcuL2ZpbHRlcnMvRGF0ZSc7XG5pbXBvcnQgVGV4dEZpbHRlciBmcm9tICcuL2ZpbHRlcnMvVGV4dCc7XG5pbXBvcnQgU2VsZWN0RmlsdGVyIGZyb20gJy4vZmlsdGVycy9TZWxlY3QnO1xuaW1wb3J0IE51bWJlckZpbHRlciBmcm9tICcuL2ZpbHRlcnMvTnVtYmVyJztcblxuY2xhc3MgVGFibGVIZWFkZXJDb2x1bW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVGaWx0ZXIgPSB0aGlzLmhhbmRsZUZpbHRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ29sdW1uQ2xpY2soZSl7XG4gICAgaWYoIXRoaXMucHJvcHMuZGF0YVNvcnQpcmV0dXJuO1xuICAgIGxldCBvcmRlciA9IHRoaXMucHJvcHMuc29ydCA9PSBDb25zdC5TT1JUX0RFU0M/Q29uc3QuU09SVF9BU0M6Q29uc3QuU09SVF9ERVNDO1xuICAgIHRoaXMucHJvcHMub25Tb3J0KG9yZGVyLCB0aGlzLnByb3BzLmRhdGFGaWVsZCk7XG4gIH1cblxuICBoYW5kbGVGaWx0ZXIodmFsdWUsIHR5cGUpIHtcbiAgICB0aGlzLnByb3BzLmZpbHRlci5lbWl0dGVyLmhhbmRsZUZpbHRlcih0aGlzLnByb3BzLmRhdGFGaWVsZCwgdmFsdWUsIHR5cGUpO1xuICB9XG5cbiAgZ2V0RmlsdGVycygpIHtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuZmlsdGVyLnR5cGUpIHtcbiAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuVEVYVDoge1xuICAgICAgICByZXR1cm4gPFRleHRGaWx0ZXIgey4uLnRoaXMucHJvcHMuZmlsdGVyfSBjb2x1bW5OYW1lPXt0aGlzLnByb3BzLmNoaWxkcmVufSBmaWx0ZXJIYW5kbGVyPXt0aGlzLmhhbmRsZUZpbHRlcn0gLz47XG4gICAgICB9XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLlNFTEVDVDoge1xuICAgICAgICByZXR1cm4gPFNlbGVjdEZpbHRlciB7Li4udGhpcy5wcm9wcy5maWx0ZXJ9IGNvbHVtbk5hbWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IGZpbHRlckhhbmRsZXI9e3RoaXMuaGFuZGxlRmlsdGVyfSAvPjtcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSOiB7XG4gICAgICAgIHJldHVybiA8TnVtYmVyRmlsdGVyIHsuLi50aGlzLnByb3BzLmZpbHRlcn0gY29sdW1uTmFtZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gZmlsdGVySGFuZGxlcj17dGhpcy5oYW5kbGVGaWx0ZXJ9IC8+O1xuICAgICAgfVxuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5EQVRFOiB7XG4gICAgICAgIHJldHVybiA8RGF0ZUZpbHRlciB7Li4udGhpcy5wcm9wcy5maWx0ZXJ9IGNvbHVtbk5hbWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IGZpbHRlckhhbmRsZXI9e3RoaXMuaGFuZGxlRmlsdGVyfSAvPjtcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NOiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmZpbHRlci5nZXRFbGVtZW50KHRoaXMuaGFuZGxlRmlsdGVyLCB0aGlzLnByb3BzLmZpbHRlci5jdXN0b21GaWx0ZXJQYXJhbWV0ZXJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgIHRoaXMucmVmcy5pbm5lckRpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkXCIsIHRoaXMucHJvcHMuZGF0YUZpZWxkKTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB3aWR0aCA9IHRoaXMucHJvcHMud2lkdGghPT1udWxsP3BhcnNlSW50KHRoaXMucHJvcHMud2lkdGgpOm51bGw7XG4gICAgdmFyIHRoU3R5bGUgPSB7XG4gICAgICB0ZXh0QWxpZ246IHRoaXMucHJvcHMuZGF0YUFsaWduLFxuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIG1heFdpZHRoOiB3aWR0aFxuICAgIH07XG5cbiAgICBjb25zdCBkZWZhdWx0Q2FyZXQgPSAoIXRoaXMucHJvcHMuZGF0YVNvcnQpID8gbnVsbCA6IChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9yZGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIiBzdHlsZT17e21hcmdpbjogJzEwcHggMCAxMHB4IDVweCcsIGNvbG9yOiAnI2NjYyd9fT48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZHJvcHVwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIiBzdHlsZT17e21hcmdpbjogJzEwcHggMCcsIGNvbG9yOiAnI2NjYyd9fT48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICAgIGNvbnN0IHNvcnRDYXJldCA9IHRoaXMucHJvcHMuc29ydCA/IFV0aWwucmVuZGVyUmVhY3RTb3J0Q2FyZXQodGhpcy5wcm9wcy5zb3J0KSA6IGRlZmF1bHRDYXJldDtcblxuICAgIHZhciBjbGFzc2VzID0gdGhpcy5wcm9wcy5jbGFzc05hbWUrXCIgXCIrKHRoaXMucHJvcHMuZGF0YVNvcnQ/XCJzb3J0LWNvbHVtblwiOlwiXCIpO1xuICAgIHJldHVybihcbiAgICAgIDx0aCByZWY9J2hlYWRlci1jb2wnIGNsYXNzTmFtZT17Y2xhc3Nlc30gc3R5bGU9e3RoU3R5bGV9PlxuICAgICAgICA8ZGl2IHJlZj1cImlubmVyRGl2XCIgY2xhc3NOYW1lPVwidGgtaW5uZXIgdGFibGUtaGVhZGVyLWNvbHVtblwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDb2x1bW5DbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn17c29ydENhcmV0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMucHJvcHMuZmlsdGVyID8gdGhpcy5nZXRGaWx0ZXJzKCkgOiBudWxsfVxuICAgICAgPC90aD5cbiAgICApXG4gIH1cbn1cblxudmFyIGZpbHRlclR5cGVBcnJheSA9IFtdO1xuZm9yIChsZXQga2V5IGluIENvbnN0LkZJTFRFUl9UWVBFKSB7XG4gIGZpbHRlclR5cGVBcnJheS5wdXNoKENvbnN0LkZJTFRFUl9UWVBFW2tleV0pO1xufVxuXG5UYWJsZUhlYWRlckNvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIGRhdGFGaWVsZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YUFsaWduOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhU29ydDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uU29ydDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGRhdGFGb3JtYXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBpc0tleTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGVkaXRhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYW55LFxuICBoaWRkZW46IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBzZWFyY2hhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NOYW1lOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzb3J0RnVuYzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGNvbHVtbkNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgZmlsdGVyRm9ybWF0dGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgc29ydDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZm9ybWF0RXh0cmFEYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYW55LFxuICBmaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKGZpbHRlclR5cGVBcnJheSksXG4gICAgZGVsYXk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAvLyBmb3IgU2VsZWN0RmlsdGVyXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSAvL2ZvciBOdW1iZXJGaWx0ZXJcbiAgICAgICAgXSksXG4gICAgbnVtYmVyQ29tcGFyYXRvcnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGVtaXR0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgcGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZ2V0RWxlbWVudDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgY3VzdG9tRmlsdGVyUGFyYW1ldGVyczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuICB9KVxufTtcblxuVGFibGVIZWFkZXJDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBkYXRhQWxpZ246IFwibGVmdFwiLFxuICBkYXRhU29ydDogZmFsc2UsXG4gIGRhdGFGb3JtYXQ6IHVuZGVmaW5lZCxcbiAgaXNLZXk6IGZhbHNlLFxuICBlZGl0YWJsZTogdHJ1ZSxcbiAgb25Tb3J0OiB1bmRlZmluZWQsXG4gIGhpZGRlbjogZmFsc2UsXG4gIHNlYXJjaGFibGU6IHRydWUsXG4gIGNsYXNzTmFtZTogXCJcIixcbiAgd2lkdGg6IG51bGwsXG4gIHNvcnRGdW5jOiB1bmRlZmluZWQsXG4gIGNvbHVtbkNsYXNzTmFtZTogJycsXG4gIGZpbHRlckZvcm1hdHRlZDogZmFsc2UsXG4gIHNvcnQ6IHVuZGVmaW5lZCxcbiAgZm9ybWF0RXh0cmFEYXRhOiB1bmRlZmluZWQsXG4gIGZpbHRlcjogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYWJsZUhlYWRlckNvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlSGVhZGVyQ29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIERhdGVGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzLmZpbHRlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHREYXRlKCkge1xuICAgICAgICBsZXQgZGVmYXVsdERhdGUgID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGFwcHJvcHJpYXRlIGZvcm1hdCBmb3IgdGhlIGlucHV0IHR5cGU9ZGF0ZSwgaS5lLiBcIllZWVktTU0tRERcIlxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbmV3IERhdGUodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgZGVmYXVsdERhdGUgPSBgJHtkZWZhdWx0VmFsdWUuZ2V0RnVsbFllYXIoKX0tJHsoXCIwXCIgKyAoZGVmYXVsdFZhbHVlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpfS0keyhcIjBcIiArIGRlZmF1bHRWYWx1ZS5nZXREYXRlKCkpLnNsaWNlKC0yKX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZhdWx0RGF0ZTtcbiAgICB9XG5cbiAgICBmaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAoZGF0ZVZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIobmV3IERhdGUoZGF0ZVZhbHVlKSwgQ29uc3QuRklMVEVSX1RZUEUuREFURSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIobnVsbCwgQ29uc3QuRklMVEVSX1RZUEUuREFURSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gdGhpcy5yZWZzLmlucHV0RGF0ZS5kZWZhdWx0VmFsdWU7XG4gICAgICAgIGlmIChkYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcihuZXcgRGF0ZShkYXRlVmFsdWUpLCBDb25zdC5GSUxURVJfVFlQRS5EQVRFKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCByZWY9XCJpbnB1dERhdGVcIlxuICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpbHRlciBkYXRlLWZpbHRlciBmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5maWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnNldERlZmF1bHREYXRlKCl9IC8+XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuRGF0ZUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gICAgZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY29sdW1uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGF0ZUZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbHRlcnMvRGF0ZS5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vQ29uc3QnO1xuXG5jbGFzcyBUZXh0RmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5maWx0ZXIgPSB0aGlzLmZpbHRlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZW91dCA9IG51bGw7XG5cdH1cblxuXHRmaWx0ZXIoZXZlbnQpIHtcblx0XHRpZiAodGhpcy50aW1lb3V0KSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHR9XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cdFx0dGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYucHJvcHMuZmlsdGVySGFuZGxlcihmaWx0ZXJWYWx1ZSwgQ29uc3QuRklMVEVSX1RZUEUuVEVYVCk7XG5cdFx0fSwgc2VsZi5wcm9wcy5kZWxheSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRpZiAodGhpcy5yZWZzLmlucHV0VGV4dC5kZWZhdWx0VmFsdWUpIHtcblx0XHRcdHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih0aGlzLnJlZnMuaW5wdXRUZXh0LmRlZmF1bHRWYWx1ZSwgQ29uc3QuRklMVEVSX1RZUEUuVEVYVCk7XG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxpbnB1dCByZWY9XCJpbnB1dFRleHRcIlxuXHRcdFx0XHQgICBjbGFzc05hbWU9XCJmaWx0ZXIgdGV4dC1maWx0ZXIgZm9ybS1jb250cm9sXCJcblx0XHRcdFx0ICAgdHlwZT1cInRleHRcIlxuXHRcdFx0XHQgICBvbkNoYW5nZT17dGhpcy5maWx0ZXJ9XG5cdFx0XHRcdCAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IGBFbnRlciAke3RoaXMucHJvcHMuY29sdW1uTmFtZX0uLi5gfVxuXHRcdFx0XHQgICBkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA6IFwiXCJ9IC8+XG5cdFx0KTtcblx0fVxufTtcblxuVGV4dEZpbHRlci5wcm9wVHlwZXMgPSB7XG5cdGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0ZGVsYXk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRjb2x1bW5OYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5UZXh0RmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcblx0ZGVsYXk6IENvbnN0LkZJTFRFUl9ERUxBWVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0RmlsdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsdGVycy9UZXh0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNsYXNzIFNlbGVjdEZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0aXNQbGFjZWhvbGRlclNlbGVjdGVkOiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQhdGhpcy5wcm9wcy5vcHRpb25zLmhhc093blByb3BlcnR5KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSlcblx0XHR9O1xuXHR9XG5cblx0ZmlsdGVyKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNQbGFjZWhvbGRlclNlbGVjdGVkOiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcIlwiKX0pO1xuXHRcdHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcihldmVudC50YXJnZXQudmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlNFTEVDVCk7XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdGxldCBvcHRpb25UYWdzID0gW107XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHRvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9XCItMVwiIHZhbHVlPVwiXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYFNlbGVjdCAke3RoaXMucHJvcHMuY29sdW1uTmFtZX0uLi5gfTwvb3B0aW9uPik7XG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykubWFwKChrZXkpID0+IHtcblx0XHRcdG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT17a2V5fSB2YWx1ZT17a2V5fT57b3B0aW9uc1trZXldfTwvb3B0aW9uPik7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9wdGlvblRhZ3M7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRpZiAodGhpcy5yZWZzLnNlbGVjdElucHV0LnZhbHVlKSB7XG5cdFx0XHR0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIodGhpcy5yZWZzLnNlbGVjdElucHV0LnZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1QpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc1NldChcImZpbHRlclwiLCBcInNlbGVjdC1maWx0ZXJcIiwgXCJmb3JtLWNvbnRyb2xcIixcblx0XHRcdFx0XHRcdFx0e1wicGxhY2Vob2xkZXItc2VsZWN0ZWRcIjogdGhpcy5zdGF0ZS5pc1BsYWNlaG9sZGVyU2VsZWN0ZWR9KTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VsZWN0IHJlZj1cInNlbGVjdElucHV0XCJcblx0XHRcdFx0XHRjbGFzc05hbWU9e3NlbGVjdENsYXNzfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmZpbHRlcn1cblx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSAhPSB1bmRlZmluZWQpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiBcIlwifT5cblx0XHRcdFx0e3RoaXMuZ2V0T3B0aW9ucygpfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblx0fVxufTtcblxuU2VsZWN0RmlsdGVyLnByb3BUeXBlcyA9IHtcblx0ZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0Y29sdW1uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0RmlsdGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsdGVycy9TZWxlY3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY29uc3QgbGVnYWxDb21wYXJhdG9ycyA9IFtcIj1cIiwgXCI+XCIsIFwiPj1cIiwgXCI8XCIsIFwiPD1cIiwgXCIhPVwiXTtcblxuY2xhc3MgTnVtYmVyRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMubnVtYmVyQ29tcGFyYXRvcnMgPSB0aGlzLnByb3BzLm51bWJlckNvbXBhcmF0b3JzIHx8IGxlZ2FsQ29tcGFyYXRvcnM7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6ICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlciA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnByb3BzLm9wdGlvbnMgJiYgdGhpcy5wcm9wcy5vcHRpb25zLmluZGV4T2YodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyKSA9PSAtMSkpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25DaGFuZ2VOdW1iZXIgPSB0aGlzLm9uQ2hhbmdlTnVtYmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VOdW1iZXJTZXQgPSB0aGlzLm9uQ2hhbmdlTnVtYmVyU2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDb21wYXJhdG9yID0gdGhpcy5vbkNoYW5nZUNvbXBhcmF0b3IuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZU51bWJlcihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnByb3BzLmZpbHRlckhhbmRsZXIoe251bWJlcjogZmlsdGVyVmFsdWUsIGNvbXBhcmF0b3I6IHNlbGYucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlfSxcbiAgICAgICAgICAgICAgICBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgICAgICB9LCBzZWxmLnByb3BzLmRlbGF5KTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZU51bWJlclNldChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1BsYWNlaG9sZGVyU2VsZWN0ZWQ6IChldmVudC50YXJnZXQudmFsdWUgPT09IFwiXCIpfSk7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih7bnVtYmVyOiBldmVudC50YXJnZXQudmFsdWUsIGNvbXBhcmF0b3I6IHRoaXMucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlfSxcbiAgICAgICAgICAgIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUik7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VDb21wYXJhdG9yKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHtudW1iZXI6IHRoaXMucmVmcy5udW1iZXJGaWx0ZXIudmFsdWUsIGNvbXBhcmF0b3I6IGV2ZW50LnRhcmdldC52YWx1ZX0sXG4gICAgICAgICAgICBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgIH1cblxuICAgIGdldENvbXBhcmF0b3JPcHRpb25zKCkge1xuICAgICAgICBsZXQgb3B0aW9uVGFncyA9IFtdO1xuICAgICAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9XCItMVwiPjwvb3B0aW9uPik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJDb21wYXJhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17dGhpcy5udW1iZXJDb21wYXJhdG9yc1tpXX0+e3RoaXMubnVtYmVyQ29tcGFyYXRvcnNbaV19PC9vcHRpb24+KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvblRhZ3M7XG4gICAgfVxuXG4gICAgZ2V0TnVtYmVyT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvblRhZ3MgPSBbXTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcblxuICAgICAgICBvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9XCItMVwiIHZhbHVlPVwiXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYFNlbGVjdCAke3RoaXMucHJvcHMuY29sdW1uTmFtZX0uLi5gfTwvb3B0aW9uPik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17b3B0aW9uc1tpXX0+e29wdGlvbnNbaV19PC9vcHRpb24+KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvblRhZ3M7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZSAmJiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIoe251bWJlcjogdGhpcy5yZWZzLm51bWJlckZpbHRlci52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb21wYXJhdG9yOiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZX0sXG4gICAgICAgICAgICAgICAgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBzZWxlY3RDbGFzcyA9IGNsYXNzU2V0KFwic2VsZWN0LWZpbHRlclwiLCBcIm51bWJlci1maWx0ZXItaW5wdXRcIiwgXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFwicGxhY2Vob2xkZXItc2VsZWN0ZWRcIjogdGhpcy5zdGF0ZS5pc1BsYWNlaG9sZGVyU2VsZWN0ZWQgfSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyIG51bWJlci1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj1cIm51bWJlckZpbHRlckNvbXBhcmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibnVtYmVyLWZpbHRlci1jb21wYXJhdG9yIGZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZUNvbXBhcmF0b3J9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZS5jb21wYXJhdG9yIDogXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldENvbXBhcmF0b3JPcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgeyh0aGlzLnByb3BzLm9wdGlvbnMpID8gPHNlbGVjdCByZWY9XCJudW1iZXJGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTnVtYmVyU2V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXsodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZS5udW1iZXIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXROdW1iZXJPcHRpb25zKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+IDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCByZWY9XCJudW1iZXJGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibnVtYmVyLWZpbHRlci1pbnB1dCBmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgRW50ZXIgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VOdW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwifSAvPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn07XG5cbk51bWJlckZpbHRlci5wcm9wVHlwZXMgPSB7XG4gICAgZmlsdGVySGFuZGxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIG51bWJlcjogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgY29tcGFyYXRvcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKGxlZ2FsQ29tcGFyYXRvcnMpXG4gICAgfSksXG4gICAgZGVsYXk6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgbnVtYmVyQ29tcGFyYXRvcnM6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgICBpZiAoIXByb3BzW3Byb3BOYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHNbcHJvcE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29tcGFyYXRvcklzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVnYWxDb21wYXJhdG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChsZWdhbENvbXBhcmF0b3JzW2pdID09PSBwcm9wc1twcm9wTmFtZV1baV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyYXRvcklzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbXBhcmF0b3JJc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgTnVtYmVyIGNvbXBhcmF0b3IgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZC4gVXNlIG9ubHkgJHtsZWdhbENvbXBhcmF0b3JzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2x1bW5OYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5OdW1iZXJGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIGRlbGF5OiBDb25zdC5GSUxURVJfREVMQVlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlckZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbHRlcnMvTnVtYmVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==