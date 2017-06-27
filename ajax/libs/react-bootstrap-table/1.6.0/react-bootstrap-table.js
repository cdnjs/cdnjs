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
	                if (!hidden && searchable) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMTQ4NDU1MmY3ODQ5Mzk4MzM5OCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3RzdHJhcFRhYmxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy8uL34vY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlSGVhZGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdERPTVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RSb3dIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVSb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlQ29sdW1uLmpzIiwid2VicGFjazovLy8uL3NyYy9UYWJsZUVkaXRDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtdG9hc3RyL2xpYi9Ub2FzdE1lc3NhZ2UvYW5pbWF0aW9uTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9DU1NDb3JlLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9qUXVlcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi9QYWdlQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy90b29sYmFyL1Rvb2xCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhYmxlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3ZfZXhwb3J0X3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbGVzYXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVIZWFkZXJDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbHRlcnMvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9UZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlsdGVycy9OdW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7MkNDdEMyQixDQUFrQjs7Ozs4Q0FDZixFQUFxQjs7OztnREFDeEIsRUFBd0I7O0FBRW5ELEtBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0FBQy9CLFNBQU0sQ0FBQyxjQUFjLDhCQUFpQixDQUFDO0FBQ3ZDLFNBQU0sQ0FBQyxpQkFBaUIsaUNBQW9CLENBQUM7QUFDN0MsU0FBTSxDQUFDLFlBQVksb0NBQWUsQ0FBQztFQUNwQztzQkFDYztBQUNiLGlCQUFjO0FBQ2Qsb0JBQWlCO0FBQ2pCLGVBQVk7RUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDLENBQUM7UUFDM0IsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNWOzs7VUE3WVUsY0FBYzs7Ozs7QUFnWjNCLEU7Ozs7OztBQ3ZiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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O0FBQzVDLHNDQUFpQixHQUFHLElBQUksQ0FBQztBQUN6QiwyQkFBTTtrQkFDVDtjQUNKO0FBQ0QsaUJBQUksQ0FBQyxpQkFBaUIsRUFBRTtBQUNwQix3QkFBTyxJQUFJLEtBQUssNERBQTBELGdCQUFnQixDQUFHLENBQUM7Y0FDakc7VUFDSjtNQUNKO0FBQ0QsZ0JBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNuQyxlQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07RUFDckMsQ0FBQzs7QUFFRixhQUFZLENBQUMsWUFBWSxHQUFHO0FBQ3hCLFVBQUssRUFBRSxtQkFBTSxZQUFZO0VBQzVCLENBQUM7O3NCQUVhLFlBQVkiLCJmaWxlIjoicmVhY3QtYm9vdHN0cmFwLXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RCb290c3RyYXBUYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEJvb3RzdHJhcFRhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJSZWFjdERPTVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMxNDg0NTUyZjc4NDkzOTgzMzk4XG4gKiovIiwiaW1wb3J0IEJvb3RzdHJhcFRhYmxlIGZyb20gJy4vQm9vdHN0cmFwVGFibGUnO1xuaW1wb3J0IFRhYmxlSGVhZGVyQ29sdW1uIGZyb20gJy4vVGFibGVIZWFkZXJDb2x1bW4nO1xuaW1wb3J0IHtUYWJsZURhdGFTZXR9IGZyb20gJy4vc3RvcmUvVGFibGVEYXRhU3RvcmUnO1xuXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG4gIHdpbmRvdy5Cb290c3RyYXBUYWJsZSA9IEJvb3RzdHJhcFRhYmxlO1xuICB3aW5kb3cuVGFibGVIZWFkZXJDb2x1bW4gPSBUYWJsZUhlYWRlckNvbHVtbjtcbiAgd2luZG93LlRhYmxlRGF0YVNldCA9IFRhYmxlRGF0YVNldDtcbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQm9vdHN0cmFwVGFibGUsXG4gIFRhYmxlSGVhZGVyQ29sdW1uLFxuICBUYWJsZURhdGFTZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVGFibGVIZWFkZXIgZnJvbSAnLi9UYWJsZUhlYWRlcic7XG5pbXBvcnQgVGFibGVCb2R5IGZyb20gJy4vVGFibGVCb2R5JztcbmltcG9ydCBQYWdpbmF0aW9uTGlzdCBmcm9tICcuL3BhZ2luYXRpb24vUGFnaW5hdGlvbkxpc3QnO1xuaW1wb3J0IFRvb2xCYXIgZnJvbSAnLi90b29sYmFyL1Rvb2xCYXInO1xuaW1wb3J0IFRhYmxlRmlsdGVyIGZyb20gJy4vVGFibGVGaWx0ZXInO1xuaW1wb3J0IHtUYWJsZURhdGFTdG9yZX0gZnJvbSAnLi9zdG9yZS9UYWJsZURhdGFTdG9yZSc7XG5pbXBvcnQgZXhwb3J0Q1NWIGZyb20gJy4vY3N2X2V4cG9ydF91dGlsJztcbmltcG9ydCB7RmlsdGVyfSBmcm9tICcuL0ZpbHRlcic7XG5cbmNsYXNzIEJvb3RzdHJhcFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuX2F0dGFjaENlbGxFZGl0RnVuYygpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZGF0YSkpIHtcbiAgICAgIHRoaXMuc3RvcmUgPSBuZXcgVGFibGVEYXRhU3RvcmUodGhpcy5wcm9wcy5kYXRhLmdldERhdGEoKSk7XG4gICAgICB0aGlzLnByb3BzLmRhdGEuY2xlYXIoKTtcbiAgICAgIHRoaXMucHJvcHMuZGF0YS5vbignY2hhbmdlJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5zZXREYXRhKGRhdGEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmdldFRhYmxlRGF0YSgpXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvcHkgPSB0aGlzLnByb3BzLmRhdGEuc2xpY2UoKTtcbiAgICAgIHRoaXMuc3RvcmUgPSBuZXcgVGFibGVEYXRhU3RvcmUoY29weSk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0VGFibGUodGhpcy5wcm9wcyk7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5maWx0ZXIub24oJ29uRmlsdGVyQ2hhbmdlJywgKGN1cnJlbnRGaWx0ZXIpID0+IHtcbiAgICAgICAgc2VsZi5oYW5kbGVGaWx0ZXJEYXRhKGN1cnJlbnRGaWx0ZXIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93ICYmIHRoaXMucHJvcHMuc2VsZWN0Um93LnNlbGVjdGVkKSB7XG4gICAgICBsZXQgY29weSA9IHRoaXMucHJvcHMuc2VsZWN0Um93LnNlbGVjdGVkLnNsaWNlKCk7XG4gICAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KGNvcHkpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRhOiB0aGlzLmdldFRhYmxlRGF0YSgpLFxuICAgICAgY3VyclBhZ2U6IHRoaXMucHJvcHMub3B0aW9ucy5wYWdlIHx8IDEsXG4gICAgICBzaXplUGVyUGFnZTogdGhpcy5wcm9wcy5vcHRpb25zLnNpemVQZXJQYWdlIHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVFswXSxcbiAgICAgIHNlbGVjdGVkUm93S2V5czogdGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKVxuICAgIH07XG4gIH1cblxuICBpbml0VGFibGUocHJvcHMpe1xuICAgIGxldCB7a2V5RmllbGR9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBpc0tleUZpZWxkRGVmaW5lZCA9IHR5cGVvZiBrZXlGaWVsZCA9PT0gJ3N0cmluZycgJiYga2V5RmllbGQubGVuZ3RoO1xuICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2gocHJvcHMuY2hpbGRyZW4sIGNvbHVtbj0+IHtcbiAgICAgIGlmIChjb2x1bW4ucHJvcHMuaXNLZXkpIHtcbiAgICAgICAgaWYgKGtleUZpZWxkKSB7XG4gICAgICAgICAgdGhyb3cgXCJFcnJvci4gTXVsdGlwbGUga2V5IGNvbHVtbiBiZSBkZXRlY3RlZCBpbiBUYWJsZUhlYWRlckNvbHVtbi5cIjtcbiAgICAgICAgfVxuICAgICAgICBrZXlGaWVsZCA9IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQ7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uLnByb3BzLmZpbHRlcikge1xuICAgICAgICAvLyBhIGNvbHVtbiBjb250YWlucyBhIGZpbHRlclxuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICAgICAgLy8gZmlyc3QgdGltZSBjcmVhdGUgdGhlIGZpbHRlciBvbiB0aGUgQm9vdHN0cmFwVGFibGVcbiAgICAgICAgICB0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXNzIHRoZSBmaWx0ZXIgdG8gY29sdW1uIHdpdGggZmlsdGVyXG4gICAgICAgIGNvbHVtbi5wcm9wcy5maWx0ZXIuZW1pdHRlciA9IHRoaXMuZmlsdGVyO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgbGV0IGNvbEluZm9zID0gdGhpcy5nZXRDb2x1bW5zRGVzY3JpcHRpb24ocHJvcHMpLnJlZHVjZSgoIHByZXYsIGN1cnIgKSA9PiB7XG4gICAgICBwcmV2W2N1cnIubmFtZV0gPSBjdXJyO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xuXG4gICAgaWYgKCFpc0tleUZpZWxkRGVmaW5lZCAmJiAha2V5RmllbGQpXG4gICAgICB0aHJvdyBgRXJyb3IuIE5vIGFueSBrZXkgY29sdW1uIGRlZmluZWQgaW4gVGFibGVIZWFkZXJDb2x1bW4uXG4gICAgICAgICAgICBVc2UgJ2lzS2V5PXt0cnVlfScgdG8gc3BlY2lmeSBhIHVuaXF1ZSBjb2x1bW4gYWZ0ZXIgdmVyc2lvbiAwLjUuNC5gO1xuXG4gICAgdGhpcy5zdG9yZS5zZXRQcm9wcyh7XG4gICAgICBpc1BhZ2luYXRpb246IHByb3BzLnBhZ2luYXRpb24sXG4gICAgICBrZXlGaWVsZDoga2V5RmllbGQsXG4gICAgICBjb2xJbmZvczogY29sSW5mb3MsXG4gICAgICBtdWx0aUNvbHVtblNlYXJjaDogcHJvcHMubXVsdGlDb2x1bW5TZWFyY2gsXG4gICAgICByZW1vdGU6IHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKClcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRhYmxlRGF0YSgpIHtcbiAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgIGlmKHRoaXMucHJvcHMub3B0aW9ucy5zb3J0TmFtZSAmJiB0aGlzLnByb3BzLm9wdGlvbnMuc29ydE9yZGVyKVxuICAgICAgIHRoaXMuc3RvcmUuc29ydCh0aGlzLnByb3BzLm9wdGlvbnMuc29ydE9yZGVyLCB0aGlzLnByb3BzLm9wdGlvbnMuc29ydE5hbWUpO1xuXG4gICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgICBsZXQgcGFnZSwgc2l6ZVBlclBhZ2U7XG4gICAgICAgaWYgKHRoaXMuc3RvcmUuaXNDaGFuZ2VkUGFnZSgpKSB7XG4gICAgICAgIHNpemVQZXJQYWdlID0gdGhpcy5zdGF0ZS5zaXplUGVyUGFnZTtcbiAgICAgICAgcGFnZSA9IHRoaXMuc3RhdGUuY3VyclBhZ2U7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHNpemVQZXJQYWdlID0gdGhpcy5wcm9wcy5vcHRpb25zLnNpemVQZXJQYWdlIHx8IENvbnN0LlNJWkVfUEVSX1BBR0VfTElTVFswXTtcbiAgICAgICAgIHBhZ2UgPSB0aGlzLnByb3BzLm9wdGlvbnMucGFnZSB8fCAxO1xuICAgICAgIH1cbiAgICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgIH1cbiAgICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENvbHVtbnNEZXNjcmlwdGlvbih7IGNoaWxkcmVuIH0pIHtcbiAgICByZXR1cm4gY2hpbGRyZW4ubWFwKChjb2x1bW4sIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGNvbHVtbi5wcm9wcy5kYXRhRmllbGQsXG4gICAgICAgIGFsaWduOiBjb2x1bW4ucHJvcHMuZGF0YUFsaWduLFxuICAgICAgICBzb3J0OiBjb2x1bW4ucHJvcHMuZGF0YVNvcnQsXG4gICAgICAgIGZvcm1hdDogY29sdW1uLnByb3BzLmRhdGFGb3JtYXQsXG4gICAgICAgIGZvcm1hdEV4dHJhRGF0YTogY29sdW1uLnByb3BzLmZvcm1hdEV4dHJhRGF0YSxcbiAgICAgICAgZmlsdGVyRm9ybWF0dGVkOiBjb2x1bW4ucHJvcHMuZmlsdGVyRm9ybWF0dGVkLFxuICAgICAgICBlZGl0YWJsZTogY29sdW1uLnByb3BzLmVkaXRhYmxlLFxuICAgICAgICBoaWRkZW46IGNvbHVtbi5wcm9wcy5oaWRkZW4sXG4gICAgICAgIHNlYXJjaGFibGU6IGNvbHVtbi5wcm9wcy5zZWFyY2hhYmxlLFxuICAgICAgICBjbGFzc05hbWU6IGNvbHVtbi5wcm9wcy5jb2x1bW5DbGFzc05hbWUsXG4gICAgICAgIHdpZHRoOiBjb2x1bW4ucHJvcHMud2lkdGgsXG4gICAgICAgIHRleHQ6IGNvbHVtbi5wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgc29ydEZ1bmM6IGNvbHVtbi5wcm9wcy5zb3J0RnVuYyxcbiAgICAgICAgaW5kZXg6IGlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIHRoaXMuaW5pdFRhYmxlKG5leHRQcm9wcyk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmV4dFByb3BzLmRhdGEpKSB7XG4gICAgICB0aGlzLnN0b3JlLnNldERhdGEobmV4dFByb3BzLmRhdGEuc2xpY2UoKSk7XG4gICAgICBsZXQgcGFnaW5hdGlvbkRvbSA9IHRoaXMucmVmcy5wYWdpbmF0aW9uO1xuICAgICAgbGV0IHBhZ2UgPSBwYWdpbmF0aW9uRG9tICYmIHBhZ2luYXRpb25Eb20uZ2V0Q3VycmVudFBhZ2UoKSB8fCBuZXh0UHJvcHMub3B0aW9ucy5wYWdlIHx8IDE7XG4gICAgICBsZXQgc2l6ZVBlclBhZ2UgPSBwYWdpbmF0aW9uRG9tICYmIHBhZ2luYXRpb25Eb20uZ2V0U2l6ZVBlclBhZ2UoKSB8fCBuZXh0UHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZSB8fCBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1RbMF07XG4gICAgICAvLyAjMTI1XG4gICAgICBpZihwYWdlID4gTWF0aC5jZWlsKG5leHRQcm9wcy5kYXRhLmxlbmd0aCAvIHNpemVQZXJQYWdlKSkgcGFnZSA9IDE7XG4gICAgICBsZXQgc29ydEluZm8gPSB0aGlzLnN0b3JlLmdldFNvcnRJbmZvKCk7XG4gICAgICBsZXQgc29ydEZpZWxkID0gbmV4dFByb3BzLm9wdGlvbnMuc29ydE5hbWUgfHwgKHNvcnRJbmZvID8gc29ydEluZm8uc29ydEZpZWxkIDogdW5kZWZpbmVkKTtcbiAgICAgIGxldCBzb3J0T3JkZXIgPSBuZXh0UHJvcHMub3B0aW9ucy5zb3J0T3JkZXIgfHwgKHNvcnRJbmZvID8gc29ydEluZm8ub3JkZXIgOiB1bmRlZmluZWQpO1xuICAgICAgaWYoc29ydEZpZWxkICYmIHNvcnRPcmRlcikgdGhpcy5zdG9yZS5zb3J0KHNvcnRPcmRlciwgc29ydEZpZWxkKTtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5zdG9yZS5wYWdlKHBhZ2UsIHNpemVQZXJQYWdlKS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBjdXJyUGFnZTogcGFnZSxcbiAgICAgICAgc2l6ZVBlclBhZ2U6IHNpemVQZXJQYWdlXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5leHRQcm9wcy5zZWxlY3RSb3cgJiYgbmV4dFByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZCkge1xuICAgICAgLy9zZXQgZGVmYXVsdCBzZWxlY3Qgcm93cyB0byBzdG9yZS5cbiAgICAgIGxldCBjb3B5ID0gbmV4dFByb3BzLnNlbGVjdFJvdy5zZWxlY3RlZC5zbGljZSgpO1xuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjb3B5KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IGNvcHlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2FkanVzdEhlYWRlcldpZHRoKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2FkanVzdEhlYWRlcldpZHRoKTtcbiAgICB0aGlzLnJlZnMuYm9keS5yZWZzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxIZWFkZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2FkanVzdEhlYWRlcldpZHRoKTtcbiAgICB0aGlzLnJlZnMuYm9keS5yZWZzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxIZWFkZXIpO1xuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKFwib25GaWx0ZXJDaGFuZ2VcIik7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX2FkanVzdEhlYWRlcldpZHRoKCk7XG4gICAgdGhpcy5fYXR0YWNoQ2VsbEVkaXRGdW5jKCk7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlclRhYmxlQ29tcGxldGUpXG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJUYWJsZUNvbXBsZXRlKCk7XG4gIH1cblxuICBfYXR0YWNoQ2VsbEVkaXRGdW5jKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmNlbGxFZGl0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxFZGl0Ll9fb25Db21wbGV0ZUVkaXRfXyA9IHRoaXMuaGFuZGxlRWRpdENlbGwuYmluZCh0aGlzKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgIT09IENvbnN0LkNFTExfRURJVF9OT05FKVxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBpbiB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uLFxuICAgKiB0aGUgZGF0YWdyaWQgc2hvdWxkIGxvYWQgaXRzIGRhdGEgcmVtb3RlbHkuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtwcm9wc10gT3B0aW9uYWwuIElmIG5vdCBnaXZlbiwgdGhpcy5wcm9wcyB3aWxsIGJlIHVzZWRcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzUmVtb3RlRGF0YVNvdXJjZShwcm9wcykge1xuICAgIHJldHVybiAocHJvcHMgfHwgdGhpcy5wcm9wcykucmVtb3RlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgdmFyIHRhYmxlQ2xhc3MgPSBjbGFzc1NldChcInJlYWN0LWJzLXRhYmxlXCIpO1xuICAgIHZhciBjaGlsZHJlbnMgPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICBtYXhIZWlnaHQ6IHRoaXMucHJvcHMubWF4SGVpZ2h0XG4gICAgfTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikpIHtcbiAgICAgIGNoaWxkcmVucyA9IFt0aGlzLnByb3BzLmNoaWxkcmVuXTtcbiAgICB9XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldENvbHVtbnNEZXNjcmlwdGlvbih0aGlzLnByb3BzKTtcbiAgICB2YXIgc29ydEluZm8gPSB0aGlzLnN0b3JlLmdldFNvcnRJbmZvKCk7XG4gICAgdmFyIHBhZ2luYXRpb24gPSB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICB2YXIgdG9vbEJhciA9IHRoaXMucmVuZGVyVG9vbEJhcigpO1xuICAgIHZhciB0YWJsZUZpbHRlciA9IHRoaXMucmVuZGVyVGFibGVGaWx0ZXIoY29sdW1ucyk7XG4gICAgdmFyIGlzU2VsZWN0QWxsID0gdGhpcy5pc1NlbGVjdEFsbCgpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWJzLWNvbnRhaW5lclwiIHJlZj1cInRhYmxlXCI+XG4gICAgICAgIHt0b29sQmFyfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWJzLXRhYmxlLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW91c2VMZWF2ZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgPFRhYmxlSGVhZGVyXG4gICAgICAgICAgICByZWY9XCJoZWFkZXJcIlxuICAgICAgICAgICAgcm93U2VsZWN0VHlwZT17dGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZX1cbiAgICAgICAgICAgIGhpZGVTZWxlY3RDb2x1bW49e3RoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW59XG4gICAgICAgICAgICBzb3J0TmFtZT17c29ydEluZm8gPyBzb3J0SW5mby5zb3J0RmllbGQgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBzb3J0T3JkZXI9e3NvcnRJbmZvID8gc29ydEluZm8ub3JkZXIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBvblNvcnQ9e3RoaXMuaGFuZGxlU29ydC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25TZWxlY3RBbGxSb3c9e3RoaXMuaGFuZGxlU2VsZWN0QWxsUm93LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBib3JkZXJlZD17dGhpcy5wcm9wcy5ib3JkZXJlZH1cbiAgICAgICAgICAgIGNvbmRlbnNlZD17dGhpcy5wcm9wcy5jb25kZW5zZWR9XG4gICAgICAgICAgICBpc0ZpbHRlcmVkPXt0aGlzLmZpbHRlciA/IHRydWUgOiBmYWxzZX1cbiAgICAgICAgICAgIGlzU2VsZWN0QWxsPXtpc1NlbGVjdEFsbH0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgIDxUYWJsZUJvZHlcbiAgICAgICAgICAgIGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9XG4gICAgICAgICAgICBtYXhIZWlnaHQ9e3RoaXMucHJvcHMubWF4SGVpZ2h0fVxuICAgICAgICAgICAgcmVmPVwiYm9keVwiXG4gICAgICAgICAgICBkYXRhPXt0aGlzLnN0YXRlLmRhdGF9XG4gICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgdHJDbGFzc05hbWU9e3RoaXMucHJvcHMudHJDbGFzc05hbWV9XG4gICAgICAgICAgICBzdHJpcGVkPXt0aGlzLnByb3BzLnN0cmlwZWR9XG4gICAgICAgICAgICBib3JkZXJlZD17dGhpcy5wcm9wcy5ib3JkZXJlZH1cbiAgICAgICAgICAgIGhvdmVyPXt0aGlzLnByb3BzLmhvdmVyfVxuICAgICAgICAgICAga2V5RmllbGQ9e3RoaXMuc3RvcmUuZ2V0S2V5RmllbGQoKX1cbiAgICAgICAgICAgIGNvbmRlbnNlZD17dGhpcy5wcm9wcy5jb25kZW5zZWR9XG4gICAgICAgICAgICBzZWxlY3RSb3c9e3RoaXMucHJvcHMuc2VsZWN0Um93fVxuICAgICAgICAgICAgY2VsbEVkaXQ9e3RoaXMucHJvcHMuY2VsbEVkaXR9XG4gICAgICAgICAgICBzZWxlY3RlZFJvd0tleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRSb3dLZXlzfVxuICAgICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25Sb3dNb3VzZU92ZXI9e3RoaXMuaGFuZGxlUm93TW91c2VPdmVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblJvd01vdXNlT3V0PXt0aGlzLmhhbmRsZVJvd01vdXNlT3V0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblNlbGVjdFJvdz17dGhpcy5oYW5kbGVTZWxlY3RSb3cuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e3RoaXMucHJvcHMub3B0aW9ucy5ub0RhdGFUZXh0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7dGFibGVGaWx0ZXJ9XG4gICAgICAgIHtwYWdpbmF0aW9ufVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgaXNTZWxlY3RBbGwoKXtcbiAgICB2YXIgZGVmYXVsdFNlbGVjdFJvd0tleXMgPSB0aGlzLnN0b3JlLmdldFNlbGVjdGVkUm93S2V5cygpO1xuICAgIHZhciBhbGxSb3dLZXlzID0gdGhpcy5zdG9yZS5nZXRBbGxSb3drZXkoKTtcbiAgICBpZihkZWZhdWx0U2VsZWN0Um93S2V5cy5sZW5ndGggIT09IGFsbFJvd0tleXMubGVuZ3RoKXtcbiAgICAgIHJldHVybiBkZWZhdWx0U2VsZWN0Um93S2V5cy5sZW5ndGggPT09IDAgPyBmYWxzZSA6ICdpbmRldGVybWluYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xlYW5TZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3JlLnNldFNlbGVjdGVkUm93S2V5KFtdKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkUm93S2V5czogW11cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNvcnQob3JkZXIsIHNvcnRGaWVsZCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Tb3J0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMub25Tb3J0Q2hhbmdlKHNvcnRGaWVsZCwgb3JkZXIsIHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnN0b3JlLnNvcnQob3JkZXIsIHNvcnRGaWVsZCkuZ2V0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHRcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2luYXRpb25EYXRhKHBhZ2UsIHNpemVQZXJQYWdlKSB7XG4gICAgY29uc3Qge29uUGFnZUNoYW5nZX0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgaWYgKG9uUGFnZUNoYW5nZSkge1xuICAgICAgb25QYWdlQ2hhbmdlKHBhZ2UsIHNpemVQZXJQYWdlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1JlbW90ZURhdGFTb3VyY2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UocGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IHBhZ2UsXG4gICAgICBzaXplUGVyUGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uTW91c2VMZWF2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucy5vbk1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vbk1vdXNlRW50ZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU91dChyb3cpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLm9uUm93TW91c2VPdXQpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vblJvd01vdXNlT3V0KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUm93TW91c2VPdmVyKHJvdykge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5vblJvd01vdXNlT3Zlcihyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJvd0NsaWNrKHJvdykge1xuICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLm9uUm93Q2xpY2socm93KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3RBbGxSb3coZSkge1xuICAgIHZhciBpc1NlbGVjdGVkID0gZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQ7XG4gICAgbGV0IHNlbGVjdGVkUm93S2V5cyA9IFtdO1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdEFsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3RBbGwoaXNTZWxlY3RlZCxcbiAgICAgICAgaXNTZWxlY3RlZCA/IHRoaXMuc3RvcmUuZ2V0KCkgOiBbXSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnIHx8IHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGVkUm93S2V5cyA9IHRoaXMuc3RvcmUuZ2V0QWxsUm93a2V5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoc2VsZWN0ZWRSb3dLZXlzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHNlbGVjdGVkUm93S2V5c1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2hvd09ubHlTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3JlLmlnbm9yZU5vblNlbGVjdGVkKCk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoMSwgdGhpcy5zdGF0ZS5zaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IDEsXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RSb3cocm93LCBpc1NlbGVjdGVkKSB7XG4gICAgbGV0IGN1cnJTZWxlY3RlZCA9IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKCk7XG4gICAgbGV0IHJvd0tleSA9IHJvd1t0aGlzLnN0b3JlLmdldEtleUZpZWxkKCldO1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5vblNlbGVjdCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9wcy5zZWxlY3RSb3cub25TZWxlY3Qocm93LCBpc1NlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcgfHwgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93Lm1vZGUgPT09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICAgIGN1cnJTZWxlY3RlZCA9IGlzU2VsZWN0ZWQgPyBbcm93S2V5XSA6IFtdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgIGN1cnJTZWxlY3RlZC5wdXNoKHJvd0tleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyclNlbGVjdGVkID0gY3VyclNlbGVjdGVkLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcm93S2V5ICE9PSBrZXk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zdG9yZS5zZXRTZWxlY3RlZFJvd0tleShjdXJyU2VsZWN0ZWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlbGVjdGVkUm93S2V5czogY3VyclNlbGVjdGVkXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbChuZXdWYWwsIHJvd0luZGV4LCBjb2xJbmRleCkge1xuICAgIGxldCBmaWVsZE5hbWU7XG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCBmdW5jdGlvbiAoY29sdW1uLCBpKSB7XG4gICAgICBpZiAoaSA9PSBjb2xJbmRleCkge1xuICAgICAgICBmaWVsZE5hbWUgPSBjb2x1bW4ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5zdG9yZS5lZGl0KG5ld1ZhbCwgcm93SW5kZXgsIGZpZWxkTmFtZSkuZ2V0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiByZXN1bHRcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLmNlbGxFZGl0LmFmdGVyU2F2ZUNlbGwpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbEVkaXQuYWZ0ZXJTYXZlQ2VsbCh0aGlzLnN0YXRlLmRhdGFbcm93SW5kZXhdLCBmaWVsZE5hbWUsIG5ld1ZhbCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWRkUm93QmVnaW4oKSB7XG4gICAgaWYgKHRoaXMucmVmcy5ib2R5KSB7XG4gICAgICAvLyB0aGlzLnJlZnMuYm9keS5jYW5jZWxFZGl0KCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWRkUm93QXRCZWdpbihuZXdPYmopIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnN0b3JlLmFkZEF0QmVnaW4obmV3T2JqKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgdGhpcy5faGFuZGxlQWZ0ZXJBZGRpbmdSb3cobmV3T2JqKTtcbiAgfVxuXG4gIGhhbmRsZUFkZFJvdyhuZXdPYmopIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnN0b3JlLmFkZChuZXdPYmopO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICB0aGlzLl9oYW5kbGVBZnRlckFkZGluZ1JvdyhuZXdPYmopO1xuICB9XG5cbiAgZ2V0U2l6ZVBlclBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuc2l6ZVBlclBhZ2U7XG4gIH1cblxuICBnZXRDdXJyZW50UGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyUGFnZTtcbiAgfVxuXG4gIGhhbmRsZURyb3BSb3cocm93S2V5cykge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgZHJvcFJvd0tleXMgPSByb3dLZXlzP3Jvd0tleXM6dGhpcy5zdG9yZS5nZXRTZWxlY3RlZFJvd0tleXMoKTtcbiAgICAvL2FkZCBjb25maXJtIGJlZm9yZSB0aGUgZGVsZXRlIGFjdGlvbiBpZiB0aGF0IG9wdGlvbiBpcyBzZXQuXG4gICAgaWYgKGRyb3BSb3dLZXlzICYmIGRyb3BSb3dLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuaGFuZGxlQ29uZmlybURlbGV0ZVJvdyl7XG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5oYW5kbGVDb25maXJtRGVsZXRlUm93KFxuICAgICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVJvdyhkcm9wUm93S2V5cyk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmUgd2FudCBkZWxldGU/JykpIHtcbiAgICAgICAgdGhpcy5kZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVJvdyhkcm9wUm93S2V5cyl7XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIHRoaXMuc3RvcmUucmVtb3ZlKGRyb3BSb3dLZXlzKTsgIC8vcmVtb3ZlIHNlbGVjdGVkIFJvd1xuICAgIHRoaXMuc3RvcmUuc2V0U2VsZWN0ZWRSb3dLZXkoW10pOyAgLy9jbGVhciBzZWxlY3RlZCByb3cga2V5XG5cbiAgICBpZiAodGhpcy5wcm9wcy5wYWdpbmF0aW9uKSB7XG4gICAgICBjb25zdCB7IHNpemVQZXJQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgbGV0IHsgY3VyclBhZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBsZXQgY3Vyckxhc3RQYWdlID0gTWF0aC5jZWlsKHRoaXMuc3RvcmUuZ2V0RGF0YU51bSgpIC8gc2l6ZVBlclBhZ2UpO1xuICAgICAgaWYgKGN1cnJQYWdlID4gY3Vyckxhc3RQYWdlKVxuICAgICAgICBjdXJyUGFnZSA9IGN1cnJMYXN0UGFnZTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZShjdXJyUGFnZSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgc2VsZWN0ZWRSb3dLZXlzOiB0aGlzLnN0b3JlLmdldFNlbGVjdGVkUm93S2V5cygpLFxuICAgICAgICBjdXJyUGFnZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBzZWxlY3RlZFJvd0tleXM6IHRoaXMuc3RvcmUuZ2V0U2VsZWN0ZWRSb3dLZXlzKClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVyRGVsZXRlUm93KSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJEZWxldGVSb3coZHJvcFJvd0tleXMpO1xuICAgIH1cblxuICB9XG5cbiAgaGFuZGxlRmlsdGVyRGF0YShmaWx0ZXJPYmopIHtcbiAgICB0aGlzLnN0b3JlLmZpbHRlcihmaWx0ZXJPYmopO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgY29uc3QgeyBzaXplUGVyUGFnZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUucGFnZSgxLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgfVxuICAgIGlmKHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckNvbHVtbkZpbHRlcilcbiAgICAgIHRoaXMucHJvcHMub3B0aW9ucy5hZnRlckNvbHVtbkZpbHRlcihmaWx0ZXJPYmosXG4gICAgICAgIHRoaXMuc3RvcmUuZ2V0RGF0YUlnbm9yaW5nUGFnaW5hdGlvbigpKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgIGN1cnJQYWdlOiAxXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVFeHBvcnRDU1YoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0RGF0YUlnbm9yaW5nUGFnaW5hdGlvbigpO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgdGhpcy5wcm9wcy5jaGlsZHJlbi5tYXAoZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgICBpZiAoY29sdW1uLnByb3BzLmhpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAga2V5cy5wdXNoKGNvbHVtbi5wcm9wcy5kYXRhRmllbGQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGV4cG9ydENTVihyZXN1bHQsIGtleXMsIHRoaXMucHJvcHMuY3N2RmlsZU5hbWUpO1xuICB9XG5cbiAgaGFuZGxlU2VhcmNoKHNlYXJjaFRleHQpIHtcbiAgICB0aGlzLnN0b3JlLnNlYXJjaChzZWFyY2hUZXh0KTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgc2l6ZVBlclBhZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoMSwgc2l6ZVBlclBhZ2UpLmdldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLmdldCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJTZWFyY2gpXG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJTZWFyY2goc2VhcmNoVGV4dCwgdGhpcy5zdG9yZS5nZXREYXRhSWdub3JpbmdQYWdpbmF0aW9uKCkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY3VyclBhZ2U6IDFcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlclBhZ2luYXRpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucGFnaW5hdGlvbikge1xuICAgICAgbGV0IGRhdGFTaXplO1xuICAgICAgaWYgKHRoaXMuaXNSZW1vdGVEYXRhU291cmNlKCkpIHtcbiAgICAgICAgZGF0YVNpemUgPSB0aGlzLnByb3BzLmZldGNoSW5mby5kYXRhVG90YWxTaXplO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVNpemUgPSB0aGlzLnN0b3JlLmdldERhdGFOdW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtZm9vdGVyLXBhZ2luYXRpb25cIj5cbiAgICAgICAgICA8UGFnaW5hdGlvbkxpc3RcbiAgICAgICAgICAgIHJlZj1cInBhZ2luYXRpb25cIlxuICAgICAgICAgICAgY3VyclBhZ2U9eyB0aGlzLnN0YXRlLmN1cnJQYWdlIH1cbiAgICAgICAgICAgIGNoYW5nZVBhZ2U9e3RoaXMuaGFuZGxlUGFnaW5hdGlvbkRhdGEuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIHNpemVQZXJQYWdlPXsgdGhpcy5zdGF0ZS5zaXplUGVyUGFnZSB9XG4gICAgICAgICAgICBzaXplUGVyUGFnZUxpc3Q9e3RoaXMucHJvcHMub3B0aW9ucy5zaXplUGVyUGFnZUxpc3QgfHwgQ29uc3QuU0laRV9QRVJfUEFHRV9MSVNUfVxuICAgICAgICAgICAgcGFnaW5hdGlvblNpemU9e3RoaXMucHJvcHMub3B0aW9ucy5wYWdpbmF0aW9uU2l6ZSB8fCBDb25zdC5QQUdJTkFUSU9OX1NJWkV9XG4gICAgICAgICAgICByZW1vdGU9e3RoaXMuaXNSZW1vdGVEYXRhU291cmNlKCl9XG4gICAgICAgICAgICBkYXRhU2l6ZT17ZGF0YVNpemV9XG4gICAgICAgICAgICBvblNpemVQZXJQYWdlTGlzdD17dGhpcy5wcm9wcy5vcHRpb25zLm9uU2l6ZVBlclBhZ2VMaXN0fVxuICAgICAgICAgICAgcHJlUGFnZT17dGhpcy5wcm9wcy5vcHRpb25zLnByZVBhZ2UgfHwgQ29uc3QuUFJFX1BBR0V9XG4gICAgICAgICAgICBuZXh0UGFnZT17dGhpcy5wcm9wcy5vcHRpb25zLm5leHRQYWdlIHx8IENvbnN0Lk5FWFRfUEFHRX1cbiAgICAgICAgICAgIGZpcnN0UGFnZT17dGhpcy5wcm9wcy5vcHRpb25zLmZpcnN0UGFnZSB8fCBDb25zdC5GSVJTVF9QQUdFfVxuICAgICAgICAgICAgbGFzdFBhZ2U9e3RoaXMucHJvcHMub3B0aW9ucy5sYXN0UGFnZSB8fCBDb25zdC5MQVNUX1BBR0V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlclRvb2xCYXIoKSB7XG4gICAgbGV0IGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdFJvdyAmJiB0aGlzLnByb3BzLnNlbGVjdFJvdy5zaG93T25seVNlbGVjdGVkO1xuICAgIGlmIChlbmFibGVTaG93T25seVNlbGVjdGVkXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5zZXJ0Um93XG4gICAgICAgIHx8IHRoaXMucHJvcHMuZGVsZXRlUm93XG4gICAgICAgIHx8IHRoaXMucHJvcHMuc2VhcmNoXG4gICAgICAgIHx8IHRoaXMucHJvcHMuZXhwb3J0Q1NWKSB7XG4gICAgICBsZXQgY29sdW1ucztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICAgIGNvbHVtbnMgPSB0aGlzLnByb3BzLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY29sdW1uKSB7XG4gICAgICAgICAgdmFyIHByb3BzID0gY29sdW1uLnByb3BzO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICAgIGZpZWxkOiBwcm9wcy5kYXRhRmllbGQsXG4gICAgICAgICAgICAvL3doZW4geW91IHdhbnQgc2FtZSBhdXRvIGdlbmVyYXRlIHZhbHVlIGFuZCBub3QgYWxsb3cgZWRpdCwgZXhhbXBsZSBJRCBmaWVsZFxuICAgICAgICAgICAgYXV0b1ZhbHVlOiBwcm9wcy5hdXRvVmFsdWUgfHwgZmFsc2UsXG4gICAgICAgICAgICAvL2ZvciBjcmVhdGUgZWRpdG9yLCBubyBwYXJhbXMgZm9yIGNvbHVtbi5lZGl0YWJsZSgpIGluZGljYXRlIHRoYXQgZWRpdG9yIGZvciBuZXcgcm93XG4gICAgICAgICAgICBlZGl0YWJsZTogcHJvcHMuZWRpdGFibGUgJiYgKHR5cGVvZiBwcm9wcy5lZGl0YWJsZSA9PT0gXCJmdW5jdGlvblwiKSA/IHByb3BzLmVkaXRhYmxlKCkgOiBwcm9wcy5lZGl0YWJsZSxcbiAgICAgICAgICAgIGZvcm1hdDogcHJvcHMuZGF0YUZvcm1hdCA/IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLmRhdGFGb3JtYXQodmFsdWUsIG51bGwsIHByb3BzLmZvcm1hdEV4dHJhRGF0YSkucmVwbGFjZSgvPC4qPz4vZywnJyk7XG4gICAgICAgICAgICB9IDogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbnMgPSBbe1xuICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgZmllbGQ6IHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuZGF0YUZpZWxkLFxuICAgICAgICAgIGVkaXRhYmxlOiB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmVkaXRhYmxlXG4gICAgICAgIH1dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sLWJhclwiPlxuICAgICAgICAgIDxUb29sQmFyXG4gICAgICAgICAgICBjbGVhclNlYXJjaD17dGhpcy5wcm9wcy5vcHRpb25zLmNsZWFyU2VhcmNofVxuICAgICAgICAgICAgZW5hYmxlSW5zZXJ0PXt0aGlzLnByb3BzLmluc2VydFJvd31cbiAgICAgICAgICAgIGVuYWJsZURlbGV0ZT17dGhpcy5wcm9wcy5kZWxldGVSb3d9XG4gICAgICAgICAgICBlbmFibGVTZWFyY2g9e3RoaXMucHJvcHMuc2VhcmNofVxuICAgICAgICAgICAgZW5hYmxlRXhwb3J0Q1NWPXt0aGlzLnByb3BzLmV4cG9ydENTVn1cbiAgICAgICAgICAgIGVuYWJsZVNob3dPbmx5U2VsZWN0ZWQ9e2VuYWJsZVNob3dPbmx5U2VsZWN0ZWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICBvbkFkZFJvdz17dGhpcy5oYW5kbGVBZGRSb3cuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uQWRkUm93QmVnaW49e3RoaXMuaGFuZGxlQWRkUm93QmVnaW4uYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uRHJvcFJvdz17dGhpcy5oYW5kbGVEcm9wUm93LmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblNlYXJjaD17dGhpcy5oYW5kbGVTZWFyY2guYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uRXhwb3J0Q1NWPXt0aGlzLmhhbmRsZUV4cG9ydENTVi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25TaG93T25seVNlbGVjdGVkPXt0aGlzLmhhbmRsZVNob3dPbmx5U2VsZWN0ZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVGFibGVGaWx0ZXIoY29sdW1ucykge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbHVtbkZpbHRlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRhYmxlRmlsdGVyIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgICAgICAgICByb3dTZWxlY3RUeXBlPXt0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlfVxuICAgICAgICAgICAgICAgICAgICAgb25GaWx0ZXI9e3RoaXMuaGFuZGxlRmlsdGVyRGF0YS5iaW5kKHRoaXMpfS8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBfc2Nyb2xsSGVhZGVyID0gKGUpID0+IHtcbiAgICB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuY29udGFpbmVyLnNjcm9sbExlZnQgPSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsTGVmdDtcbiAgfVxuXG4gIF9hZGp1c3RIZWFkZXJXaWR0aCA9ICgpID0+IHtcbiAgICB2YXIgdGFibGVIZWFkZXJEb20gPSB0aGlzLnJlZnMuaGVhZGVyLnJlZnMuY29udGFpbmVyLmNoaWxkTm9kZXNbMF07XG4gICAgdmFyIHRhYmxlQm9keURvbSA9IHRoaXMucmVmcy5ib2R5LnJlZnMuY29udGFpbmVyLmNoaWxkTm9kZXNbMF07XG4gICAgaWYodGFibGVIZWFkZXJEb20ub2Zmc2V0V2lkdGggIT09IHRhYmxlQm9keURvbS5vZmZzZXRXaWR0aCl7XG4gICAgICB0YWJsZUhlYWRlckRvbS5zdHlsZS53aWR0aCA9IHRhYmxlQm9keURvbS5vZmZzZXRXaWR0aCArIFwicHhcIjtcbiAgICB9XG4gICAgY29uc3QgaGVhZGVyUHJvcHMgPSB0aGlzLnJlZnMuYm9keS5nZXRCb2R5SGVhZGVyRG9tUHJvcCgpO1xuICAgIHRoaXMucmVmcy5oZWFkZXIuZml0SGVhZGVyKGhlYWRlclByb3BzLFxuICAgICAgdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuc2Nyb2xsSGVpZ2h0ID4gdGhpcy5yZWZzLmJvZHkucmVmcy5jb250YWluZXIuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIF9oYW5kbGVBZnRlckFkZGluZ1JvdyhuZXdPYmopIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2luYXRpb24pIHtcbiAgICAgIC8vaWYgcGFnaW5hdGlvbiBpcyBlbmFibGVkIGFuZCBpbnNlcnQgcm93IGJlIHRyaWdnZXIsIGNoYW5nZSB0byBsYXN0IHBhZ2VcbiAgICAgIGNvbnN0IHsgc2l6ZVBlclBhZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBjdXJyTGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5zdG9yZS5nZXREYXRhTnVtKCkgLyBzaXplUGVyUGFnZSk7XG4gICAgICByZXN1bHQgPSB0aGlzLnN0b3JlLnBhZ2UoY3Vyckxhc3RQYWdlLCBzaXplUGVyUGFnZSkuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICBjdXJyUGFnZTogY3Vyckxhc3RQYWdlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuc3RvcmUuZ2V0KCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogcmVzdWx0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vcHRpb25zLmFmdGVySW5zZXJ0Um93KSB7XG4gICAgICB0aGlzLnByb3BzLm9wdGlvbnMuYWZ0ZXJJbnNlcnRSb3cobmV3T2JqKTtcbiAgICB9XG4gIH1cbn1cblxuQm9vdHN0cmFwVGFibGUucHJvcFR5cGVzID0ge1xuICBrZXlGaWVsZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBtYXhIZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5hcnJheSwgUmVhY3QuUHJvcFR5cGVzLm9iamVjdF0pLFxuICByZW1vdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAvLyByZW1vdGUgZGF0YSwgZGVmYXVsdCBpcyBmYWxzZVxuICBzdHJpcGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgYm9yZGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBob3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbmRlbnNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHBhZ2luYXRpb246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBzZWFyY2hQbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VsZWN0Um93OiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIG1vZGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbXG4gICAgICBDb25zdC5ST1dfU0VMRUNUX05PTkUsXG4gICAgICBDb25zdC5ST1dfU0VMRUNUX1NJTkdMRSxcbiAgICAgIENvbnN0LlJPV19TRUxFQ1RfTVVMVElcbiAgICBdKSxcbiAgICBiZ0NvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgb25TZWxlY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0QWxsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBjbGlja1RvU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBoaWRlU2VsZWN0Q29sdW1uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjbGlja1RvU2VsZWN0QW5kRWRpdENlbGw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIHNob3dPbmx5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sXG4gIH0pLFxuICBjZWxsRWRpdDogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBtb2RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGJsdXJUb1NhdmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGFmdGVyU2F2ZUNlbGw6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gIH0pLFxuICBpbnNlcnRSb3c6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBkZWxldGVSb3c6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBzZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjb2x1bW5GaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICB0ckNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBjbGVhclNlYXJjaDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgc29ydE5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc29ydE9yZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFmdGVyVGFibGVDb21wbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJEZWxldGVSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVySW5zZXJ0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlclNlYXJjaDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJDb2x1bW5GaWx0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uUm93Q2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHBhZ2U6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgc2l6ZVBlclBhZ2VMaXN0OiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgc2l6ZVBlclBhZ2U6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcGFnaW5hdGlvblNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgb25Tb3J0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvblBhZ2VDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2l6ZVBlclBhZ2VMaXN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBub0RhdGFUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhhbmRsZUNvbmZpcm1EZWxldGVSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHByZVBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmV4dFBhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmlyc3RQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhc3RQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gIH0pLFxuICBmZXRjaEluZm86IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgZGF0YVRvdGFsU2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgfSksXG4gIGV4cG9ydENTVjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNzdkZpbGVOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuQm9vdHN0cmFwVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICBoZWlnaHQ6IFwiMTAwJVwiLFxuICBtYXhIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgc3RyaXBlZDogZmFsc2UsXG4gIGJvcmRlcmVkOiB0cnVlLFxuICBob3ZlcjogZmFsc2UsXG4gIGNvbmRlbnNlZDogZmFsc2UsXG4gIHBhZ2luYXRpb246IGZhbHNlLFxuICBzZWFyY2hQbGFjZWhvbGRlcjogdW5kZWZpbmVkLFxuICBzZWxlY3RSb3c6IHtcbiAgICBtb2RlOiBDb25zdC5ST1dfU0VMRUNUX05PTkUsXG4gICAgYmdDb2xvcjogQ29uc3QuUk9XX1NFTEVDVF9CR19DT0xPUixcbiAgICBzZWxlY3RlZDogW10sXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdEFsbDogdW5kZWZpbmVkLFxuICAgIGNsaWNrVG9TZWxlY3Q6IGZhbHNlLFxuICAgIGhpZGVTZWxlY3RDb2x1bW46IGZhbHNlLFxuICAgIGNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbDogZmFsc2UsXG4gICAgc2hvd09ubHlTZWxlY3RlZDogZmFsc2VcbiAgfSxcbiAgY2VsbEVkaXQ6IHtcbiAgICBtb2RlOiBDb25zdC5DRUxMX0VESVRfTk9ORSxcbiAgICBibHVyVG9TYXZlOiBmYWxzZSxcbiAgICBhZnRlclNhdmVDZWxsOiB1bmRlZmluZWRcbiAgfSxcbiAgaW5zZXJ0Um93OiBmYWxzZSxcbiAgZGVsZXRlUm93OiBmYWxzZSxcbiAgc2VhcmNoOiBmYWxzZSxcbiAgbXVsdGlDb2x1bW5TZWFyY2g6IGZhbHNlLFxuICBjb2x1bW5GaWx0ZXI6IGZhbHNlLFxuICB0ckNsYXNzTmFtZTogJycsXG4gIG9wdGlvbnM6IHtcbiAgICBjbGVhclNlYXJjaDogZmFsc2UsXG4gICAgc29ydE5hbWU6IHVuZGVmaW5lZCxcbiAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICBhZnRlclRhYmxlQ29tcGxldGU6IHVuZGVmaW5lZCxcbiAgICBhZnRlckRlbGV0ZVJvdzogdW5kZWZpbmVkLFxuICAgIGFmdGVySW5zZXJ0Um93OiB1bmRlZmluZWQsXG4gICAgYWZ0ZXJTZWFyY2g6IHVuZGVmaW5lZCxcbiAgICBhZnRlckNvbHVtbkZpbHRlcjogdW5kZWZpbmVkLFxuICAgIG9uUm93Q2xpY2s6IHVuZGVmaW5lZCxcbiAgICBvbk1vdXNlTGVhdmU6IHVuZGVmaW5lZCxcbiAgICBvbk1vdXNlRW50ZXI6IHVuZGVmaW5lZCxcbiAgICBvblJvd01vdXNlT3V0OiB1bmRlZmluZWQsXG4gICAgb25Sb3dNb3VzZU92ZXI6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiB1bmRlZmluZWQsXG4gICAgc2l6ZVBlclBhZ2VMaXN0OiBDb25zdC5TSVpFX1BFUl9QQUdFX0xJU1QsXG4gICAgc2l6ZVBlclBhZ2U6IHVuZGVmaW5lZCxcbiAgICBwYWdpbmF0aW9uU2l6ZTogQ29uc3QuUEFHSU5BVElPTl9TSVpFLFxuICAgIG9uU2l6ZVBlclBhZ2VMaXN0OiB1bmRlZmluZWQsXG4gICAgbm9EYXRhVGV4dDogdW5kZWZpbmVkLFxuICAgIGhhbmRsZUNvbmZpcm1EZWxldGVSb3c6IHVuZGVmaW5lZCxcbiAgICBwcmVQYWdlOiBDb25zdC5QUkVfUEFHRSxcbiAgICBuZXh0UGFnZTogQ29uc3QuTkVYVF9QQUdFLFxuICAgIGZpcnN0UGFnZTogQ29uc3QuRklSU1RfUEFHRSxcbiAgICBsYXN0UGFnZTogQ29uc3QuTEFTVF9QQUdFXG4gIH0sXG4gIGZldGNoSW5mbzoge1xuICAgIGRhdGFUb3RhbFNpemU6IDAsXG4gIH0sXG4gIGV4cG9ydENTVjogZmFsc2UsXG4gIGNzdkZpbGVOYW1lOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcFRhYmxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQm9vdHN0cmFwVGFibGUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgU09SVF9ERVNDOiBcImRlc2NcIixcbiAgU09SVF9BU0M6IFwiYXNjXCIsXG4gIFNJWkVfUEVSX1BBR0U6IDEwLFxuICBORVhUX1BBR0U6IFwiPlwiLFxuICBMQVNUX1BBR0U6IFwiPj5cIixcbiAgUFJFX1BBR0U6IFwiPFwiLFxuICBGSVJTVF9QQUdFOiBcIjw8XCIsXG4gIFJPV19TRUxFQ1RfQkdfQ09MT1I6IFwiXCIsXG4gIFJPV19TRUxFQ1RfTk9ORTogXCJub25lXCIsXG4gIFJPV19TRUxFQ1RfU0lOR0xFOiBcInJhZGlvXCIsXG4gIFJPV19TRUxFQ1RfTVVMVEk6IFwiY2hlY2tib3hcIixcbiAgQ0VMTF9FRElUX05PTkU6IFwibm9uZVwiLFxuICBDRUxMX0VESVRfQ0xJQ0s6IFwiY2xpY2tcIixcbiAgQ0VMTF9FRElUX0RCQ0xJQ0s6IFwiZGJjbGlja1wiLFxuICBTSVpFX1BFUl9QQUdFX0xJU1Q6IFsxMCwgMjUsIDMwLCA1MF0sXG4gIFBBR0lOQVRJT05fU0laRTogNSxcbiAgTk9fREFUQV9URVhUOiBcIlRoZXJlIGlzIG5vIGRhdGEgdG8gZGlzcGxheVwiLFxuICBTSE9XX09OTFlfU0VMRUNUOiBcIlNob3cgU2VsZWN0ZWQgT25seVwiLFxuICBTSE9XX0FMTDogXCJTaG93IEFsbFwiLFxuICBGSUxURVJfREVMQVk6IDUwMCxcbiAgRklMVEVSX1RZUEU6IHtcbiAgICBURVhUOiBcIlRleHRGaWx0ZXJcIixcbiAgICBTRUxFQ1Q6IFwiU2VsZWN0RmlsdGVyXCIsXG4gICAgTlVNQkVSOiBcIk51bWJlckZpbHRlclwiLFxuICAgIERBVEU6IFwiRGF0ZUZpbHRlclwiLFxuICAgIENVU1RPTTogXCJDdXN0b21GaWx0ZXJcIlxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Db25zdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgU2VsZWN0Um93SGVhZGVyQ29sdW1uIGZyb20gJy4vU2VsZWN0Um93SGVhZGVyQ29sdW1uJztcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gIGNvbXBvbmVudERpZE1vdW50KCkgeyB0aGlzLnVwZGF0ZSh0aGlzLnByb3BzLmNoZWNrZWQpOyB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHsgdGhpcy51cGRhdGUocHJvcHMuY2hlY2tlZCk7IH1cbiAgdXBkYXRlKGNoZWNrZWQpIHtcbiAgICBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5pbmRldGVybWluYXRlID0gY2hlY2tlZCA9PT0gJ2luZGV0ZXJtaW5hdGUnO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8aW5wdXQgY2xhc3NOYW1lPSdyZWFjdC1icy1zZWxlY3QtYWxsJyB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9IG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSAvPlxuICB9XG59XG5cbmNsYXNzIFRhYmxlSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2VsZWN0Um93Q29sdW1uV2lkdGggPSBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIGNvbnRhaW5lckNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlLWhlYWRlclwiKTtcbiAgICB2YXIgdGFibGVDbGFzc2VzID0gY2xhc3NTZXQoXCJ0YWJsZVwiLCBcInRhYmxlLWhvdmVyXCIsIHtcbiAgICAgICAgXCJ0YWJsZS1ib3JkZXJlZFwiOiB0aGlzLnByb3BzLmJvcmRlcmVkLFxuICAgICAgICBcInRhYmxlLWNvbmRlbnNlZFwiOiB0aGlzLnByb3BzLmNvbmRlbnNlZFxuICAgIH0pO1xuICAgIHZhciBzZWxlY3RSb3dIZWFkZXJDb2wgPSB0aGlzLnByb3BzLmhpZGVTZWxlY3RDb2x1bW4/bnVsbDp0aGlzLnJlbmRlclNlbGVjdFJvd0hlYWRlcigpO1xuICAgIHRoaXMuX2F0dGFjaENsZWFyU29ydENhcmV0RnVuYygpO1xuXG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZS1oZWFkZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IHJlZj1cImNvbnRhaW5lclwiIGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3Nlc30+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGFibGVDbGFzc2VzfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyIHJlZj1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgIHtzZWxlY3RSb3dIZWFkZXJDb2x9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyU2VsZWN0Um93SGVhZGVyKCl7XG4gICAgaWYodGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICByZXR1cm4gKDxTZWxlY3RSb3dIZWFkZXJDb2x1bW4gd2lkdGg9e3RoaXMuc2VsZWN0Um93Q29sdW1uV2lkdGh9PjwvU2VsZWN0Um93SGVhZGVyQ29sdW1uPik7XG4gICAgfWVsc2UgaWYodGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfTVVMVEkpe1xuICAgICAgcmV0dXJuICg8U2VsZWN0Um93SGVhZGVyQ29sdW1uIHdpZHRoPXt0aGlzLnNlbGVjdFJvd0NvbHVtbldpZHRofT5cbiAgICAgICAgICA8Q2hlY2tib3ggb25DaGFuZ2U9e3RoaXMucHJvcHMub25TZWxlY3RBbGxSb3d9IGNoZWNrZWQ9e3RoaXMucHJvcHMuaXNTZWxlY3RBbGx9Lz5cbiAgICAgICAgPC9TZWxlY3RSb3dIZWFkZXJDb2x1bW4+XG4gICAgICApO1xuICAgIH1lbHNle1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgX2F0dGFjaENsZWFyU29ydENhcmV0RnVuYygpe1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikpe1xuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucHJvcHMuY2hpbGRyZW5baV0ucHJvcHMuZGF0YUZpZWxkO1xuICAgICAgICBjb25zdCBzb3J0ID0gZmllbGQgPT09IHRoaXMucHJvcHMuc29ydE5hbWUgPyB0aGlzLnByb3BzLnNvcnRPcmRlciA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbltpXSA9XG4gICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW5baV0sXG4gICAgICAgICAgICB7IGtleTogaSwgb25Tb3J0OiB0aGlzLnByb3BzLm9uU29ydCwgc29ydCB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmRhdGFGaWVsZDtcbiAgICAgIGNvbnN0IHNvcnQgPSBmaWVsZCA9PT0gdGhpcy5wcm9wcy5zb3J0TmFtZSA/IHRoaXMucHJvcHMuc29ydE9yZGVyIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbiA9XG4gICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCB7a2V5OiAwLCBvblNvcnQ6IHRoaXMucHJvcHMub25Tb3J0LCBzb3J0fSk7XG4gICAgfVxuICB9XG5cbiAgZml0SGVhZGVyKGhlYWRlclByb3BzLCBpc1ZlcnRpY2FsU2Nyb2xsQmFyKXtcbiAgICBpZihBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pKXtcbiAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gKHRoaXMucHJvcHMucm93U2VsZWN0VHlwZSA9PSBDb25zdC5ST1dfU0VMRUNUX1NJTkdMRSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfTVVMVEkpICYmICF0aGlzLnByb3BzLmhpZGVTZWxlY3RDb2x1bW4gPyAxOjA7XG4gICAgICBpZihzdGFydFBvc2l0aW9uID09IDEpXG4gICAgICAgIHRoaXMuc2VsZWN0Um93Q29sdW1uV2lkdGggPSBoZWFkZXJQcm9wc1swXS53aWR0aDtcbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5wcm9wcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbltpXSA9XG4gICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW5baV0sIHt3aWR0aDogaGVhZGVyUHJvcHNbaStzdGFydFBvc2l0aW9uXS53aWR0aCtcInB4XCJ9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbiA9XG4gICAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCB7d2lkdGg6IGhlYWRlclByb3BzWzBdLndpZHRoK1wicHhcIn0pO1xuICAgIH1cbiAgICBpZih0aGlzLnByb3BzLmNvbmRlbnNlZCAmJiAhdGhpcy5wcm9wcy5pc0ZpbHRlcmVkKSB7XG4gICAgICB0aGlzLnJlZnMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMzZweFwiO1xuICAgIH1cbiAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgaWYoaXNWZXJ0aWNhbFNjcm9sbEJhcilcbiAgICAgIHRoaXMucmVmcy5jb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSBVdGlsLmdldFNjcm9sbEJhcldpZHRoKCkgKyBcInB4XCI7XG4gIH1cbn1cblRhYmxlSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgcm93U2VsZWN0VHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25Tb3J0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3RBbGxSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBzb3J0TmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc29ydE9yZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBoaWRlU2VsZWN0Q29sdW1uOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgYm9yZGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBjb25kZW5zZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBpc0ZpbHRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgaXNTZWxlY3RBbGw6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbdHJ1ZSwgJ2luZGV0ZXJtaW5hdGUnLCBmYWxzZV0pXG59O1xuXG5UYWJsZUhlYWRlci5kZWZhdWx0UHJvcHMgPSB7XG59O1xuZXhwb3J0IGRlZmF1bHQgVGFibGVIZWFkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUhlYWRlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdERPTVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmV4cG9ydCBkZWZhdWx0IHtcblxuICByZW5kZXJTb3J0Q2FyZXQob3JkZXIpIHtcbiAgICB2YXIgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHdyYXAuY2xhc3NOYW1lID0gXCJvcmRlclwiO1xuICAgIGlmKG9yZGVyID09IENvbnN0LlNPUlRfQVNDKSB3cmFwLmNsYXNzTmFtZSArPSBcIiBkcm9wdXBcIjtcbiAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpbm5lci5jbGFzc05hbWUgPSBcImNhcmV0XCI7XG4gICAgaW5uZXIuc3R5bGUubWFyZ2luID0gXCIxMHB4IDVweFwiO1xuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgIHJldHVybiB3cmFwO1xuICB9LFxuXG4gIHJlbmRlclJlYWN0U29ydENhcmV0KG9yZGVyKXtcbiAgICB2YXIgb3JkZXJDbGFzcyA9IGNsYXNzU2V0KFwib3JkZXJcIiwge1xuICAgICAgJ2Ryb3B1cCc6IG9yZGVyID09IENvbnN0LlNPUlRfQVNDXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17b3JkZXJDbGFzc30+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCIgc3R5bGU9e3ttYXJnaW46ICcxMHB4IDVweCd9fT48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfSxcblxuICBnZXRTY3JvbGxCYXJXaWR0aCgpe1xuICAgIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbm5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIGlubmVyLnN0eWxlLmhlaWdodCA9IFwiMjAwcHhcIjtcblxuICAgIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG91dGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIG91dGVyLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSBcIjIwMHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUuaGVpZ2h0ID0gXCIxNTBweFwiO1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICBvdXRlci5hcHBlbmRDaGlsZCAoaW5uZXIpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCAob3V0ZXIpO1xuICAgIHZhciB3MSA9IGlubmVyLm9mZnNldFdpZHRoO1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gICAgdmFyIHcyID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgaWYgKHcxID09IHcyKSB3MiA9IG91dGVyLmNsaWVudFdpZHRoO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCAob3V0ZXIpO1xuXG4gICAgcmV0dXJuICh3MSAtIHcyKTtcbiAgfVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5cbmNsYXNzIFNlbGVjdFJvd0hlYWRlckNvbHVtbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICByZW5kZXIoKXtcbiAgICB2YXIgdGhTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiBwYXJzZUludCh0aGlzLnByb3BzLndpZHRoKT90aGlzLnByb3BzLndpZHRoOjM1XG4gICAgfTtcblxuICAgIHJldHVybihcbiAgICAgIDx0aCBzdHlsZT17dGhTdHlsZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGgtaW5uZXIgdGFibGUtaGVhZGVyLWNvbHVtblwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGg+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdFJvd0hlYWRlckNvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1NlbGVjdFJvd0hlYWRlckNvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IFRhYmxlUm93IGZyb20gJy4vVGFibGVSb3cnO1xuaW1wb3J0IFRhYmxlQ29sdW1uIGZyb20gJy4vVGFibGVDb2x1bW4nO1xuaW1wb3J0IFRhYmxlRWRpdENvbHVtbiBmcm9tICcuL1RhYmxlRWRpdENvbHVtbic7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbnZhciBpc0Z1bj1mdW5jdGlvbihvYmope1xuICByZXR1cm4gb2JqJiYodHlwZW9mIG9iaj09PVwiZnVuY3Rpb25cIik7XG5cbn07XG5jbGFzcyBUYWJsZUJvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJFZGl0Q2VsbDogbnVsbFxuICAgIH07XG4gICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgIHRoaXMuYWRqdXN0Qm9keSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG4gICAgdGhpcy5hZGp1c3RCb2R5KCk7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzU2V0KFwidGFibGUtY29udGFpbmVyXCIpO1xuXG4gICAgdmFyIHRhYmxlQ2xhc3NlcyA9IGNsYXNzU2V0KFwidGFibGVcIiwge1xuICAgICAgJ3RhYmxlLXN0cmlwZWQnOiB0aGlzLnByb3BzLnN0cmlwZWQsXG4gICAgICAndGFibGUtYm9yZGVyZWQnOiB0aGlzLnByb3BzLmJvcmRlcmVkLFxuICAgICAgJ3RhYmxlLWhvdmVyJzogdGhpcy5wcm9wcy5ob3ZlcixcbiAgICAgICd0YWJsZS1jb25kZW5zZWQnOiB0aGlzLnByb3BzLmNvbmRlbnNlZFxuICAgIH0pO1xuXG4gICAgdmFyIGlzU2VsZWN0Um93RGVmaW5lZCA9IHRoaXMuX2lzU2VsZWN0Um93RGVmaW5lZCgpO1xuICAgIHZhciB0YWJsZUhlYWRlciA9IHRoaXMucmVuZGVyVGFibGVIZWFkZXIoaXNTZWxlY3RSb3dEZWZpbmVkKTtcblxuICAgIHZhciB0YWJsZVJvd3MgPSB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uKGRhdGEsIHIpe1xuICAgICAgdmFyIHRhYmxlQ29sdW1ucyA9IHRoaXMucHJvcHMuY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uLCBpKXtcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBkYXRhW2NvbHVtbi5uYW1lXTtcbiAgICAgICAgaWYodGhpcy5lZGl0aW5nICYmXG4gICAgICAgICAgY29sdW1uLm5hbWUgIT09IHRoaXMucHJvcHMua2V5RmllbGQgJiYgLy8gS2V5IGZpZWxkIGNhbid0IGJlIGVkaXRcbiAgICAgICAgICBjb2x1bW4uZWRpdGFibGUgJiYgLy8gY29sdW1uIGlzIGVkaXRhYmxlPyBkZWZhdWx0IGlzIHRydWUsIHVzZXIgY2FuIHNldCBpdCBmYWxzZVxuICAgICAgICAgIHRoaXMuc3RhdGUuY3VyckVkaXRDZWxsICE9IG51bGwgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJFZGl0Q2VsbC5yaWQgPT0gciAmJlxuICAgICAgICAgIHRoaXMuc3RhdGUuY3VyckVkaXRDZWxsLmNpZCA9PSBpKXtcbiAgICAgICAgICAgIHZhciBmb3JtYXQ9Y29sdW1uLmZvcm1hdD9mdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgIHJldHVybiBjb2x1bW4uZm9ybWF0KHZhbHVlLCBkYXRhLCBjb2x1bW4uZm9ybWF0RXh0cmFEYXRhKS5yZXBsYWNlKC88Lio/Pi9nLCcnKTtcbiAgICAgICAgICAgIH06ZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgIDxUYWJsZUVkaXRDb2x1bW4gY29tcGxldGVFZGl0PXt0aGlzLmhhbmRsZUNvbXBsZXRlRWRpdENlbGwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FkZCBieSBibHVlc3ByaW5nIGZvciBjb2x1bW4gZWRpdG9yIGN1c3RvbWl6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlPXtpc0Z1bihjb2x1bW4uZWRpdGFibGUpP2NvbHVtbi5lZGl0YWJsZShmaWVsZFZhbHVlLGRhdGEscixpKTpjb2x1bW4uZWRpdGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0PXtjb2x1bW4uZm9ybWF0P2Zvcm1hdDpmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmx1clRvU2F2ZT17dGhpcy5wcm9wcy5jZWxsRWRpdC5ibHVyVG9TYXZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0luZGV4PXtyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbEluZGV4PXtpfT5cbiAgICAgICAgICAgICAgICB7ZmllbGRWYWx1ZX1cbiAgICAgICAgICAgICAgPC9UYWJsZUVkaXRDb2x1bW4+XG4gICAgICAgICAgICApXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAvL2FkZCBieSBibHVlc3ByaW5nIGZvciBjbGFzc05hbWUgY3VzdG9taXplXG4gICAgICAgICAgdmFyIHRkQ2xhc3NOYW1lPWlzRnVuKGNvbHVtbi5jbGFzc05hbWUpP2NvbHVtbi5jbGFzc05hbWUoZmllbGRWYWx1ZSxkYXRhLHIsaSk6Y29sdW1uLmNsYXNzTmFtZTtcblxuICAgICAgICAgIGlmKHR5cGVvZiBjb2x1bW4uZm9ybWF0ICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRWYWx1ZSA9IGNvbHVtbi5mb3JtYXQoZmllbGRWYWx1ZSwgZGF0YSwgY29sdW1uLmZvcm1hdEV4dHJhRGF0YSk7XG4gICAgICAgICAgICBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KGZvcm1hdHRlZFZhbHVlKSkge1xuICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IGZvcm1hdHRlZFZhbHVlfX0+PC9kaXY+O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8VGFibGVDb2x1bW4gZGF0YUFsaWduPXtjb2x1bW4uYWxpZ259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVkaXQ9e3RoaXMucHJvcHMuY2VsbEVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW49e2NvbHVtbi5oaWRkZW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXQ9e3RoaXMuaGFuZGxlRWRpdENlbGwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtjb2x1bW4ud2lkdGh9PlxuICAgICAgICAgICAgICAgIHtmb3JtYXR0ZWRWYWx1ZX1cbiAgICAgICAgICAgICAgPC9UYWJsZUNvbHVtbj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgIDxUYWJsZUNvbHVtbiBkYXRhQWxpZ249e2NvbHVtbi5hbGlnbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsRWRpdD17dGhpcy5wcm9wcy5jZWxsRWRpdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbj17Y29sdW1uLmhpZGRlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRWRpdD17dGhpcy5oYW5kbGVFZGl0Q2VsbC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e2NvbHVtbi53aWR0aH0+XG4gICAgICAgICAgICAgICAge2ZpZWxkVmFsdWV9XG4gICAgICAgICAgICAgIDwvVGFibGVDb2x1bW4+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRSb3dLZXlzLmluZGV4T2YoZGF0YVt0aGlzLnByb3BzLmtleUZpZWxkXSkgIT0gLTE7XG4gICAgICB2YXIgc2VsZWN0Um93Q29sdW1uID0gaXNTZWxlY3RSb3dEZWZpbmVkICYmICF0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1uP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWxlY3RSb3dDb2x1bW4oc2VsZWN0ZWQpOm51bGw7XG4gICAgICAvL2FkZCBieSBibHVlc3ByaW5nIGZvciBjbGFzc05hbWUgY3VzdG9taXplXG4gICAgICB2YXIgdHJDbGFzc05hbWU9aXNGdW4odGhpcy5wcm9wcy50ckNsYXNzTmFtZSk/dGhpcy5wcm9wcy50ckNsYXNzTmFtZShkYXRhLHIpOnRoaXMucHJvcHMudHJDbGFzc05hbWU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGFibGVSb3cgaXNTZWxlY3RlZD17c2VsZWN0ZWR9IGtleT17cn0gY2xhc3NOYW1lPXt0ckNsYXNzTmFtZX1cbiAgICAgICAgICBzZWxlY3RSb3c9e2lzU2VsZWN0Um93RGVmaW5lZD90aGlzLnByb3BzLnNlbGVjdFJvdzp1bmRlZmluZWR9XG4gICAgICAgICAgZW5hYmxlQ2VsbEVkaXQ9e3RoaXMucHJvcHMuY2VsbEVkaXQubW9kZSAhPT0gQ29uc3QuQ0VMTF9FRElUX05PTkV9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uUm93TW91c2VPdmVyPXt0aGlzLmhhbmRsZVJvd01vdXNlT3Zlci5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uUm93TW91c2VPdXQ9e3RoaXMuaGFuZGxlUm93TW91c2VPdXQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblNlbGVjdFJvdz17dGhpcy5oYW5kbGVTZWxlY3RSb3cuYmluZCh0aGlzKX0+XG4gICAgICAgICAge3NlbGVjdFJvd0NvbHVtbn1cbiAgICAgICAgICB7dGFibGVDb2x1bW5zfVxuICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgKVxuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYodGFibGVSb3dzLmxlbmd0aCA9PT0gMCl7XG4gICAgICB0YWJsZVJvd3MucHVzaChcbiAgICAgIDxUYWJsZVJvdyBrZXk9XCIjI3RhYmxlLWVtcHR5IyNcIj5cbiAgICAgICAgPHRkIGNvbFNwYW49e3RoaXMucHJvcHMuY29sdW1ucy5sZW5ndGgrKGlzU2VsZWN0Um93RGVmaW5lZD8xOjApfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtYnMtdGFibGUtbm8tZGF0YVwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMubm9EYXRhVGV4dHx8Q29uc3QuTk9fREFUQV9URVhUfVxuICAgICAgICA8L3RkPlxuICAgICAgPC9UYWJsZVJvdz4pO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIGhlaWdodCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCkudG9TdHJpbmcoKTtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgcmVmPVwiY29udGFpbmVyXCIgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc2VzfSBzdHlsZT17e2hlaWdodDogaGVpZ2h0fX0+XG4gICAgICAgIDx0YWJsZSByZWY9XCJib2R5XCIgY2xhc3NOYW1lPXt0YWJsZUNsYXNzZXN9PlxuICAgICAgICAgIHt0YWJsZUhlYWRlcn1cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICB7dGFibGVSb3dzfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZW5kZXJUYWJsZUhlYWRlcihpc1NlbGVjdFJvd0RlZmluZWQpe1xuICAgIHZhciBzZWxlY3RSb3dIZWFkZXIgPSBudWxsO1xuXG4gICAgaWYoaXNTZWxlY3RSb3dEZWZpbmVkKXtcbiAgICAgIGxldCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6MzUsXG4gICAgICAgIG1pbldpZHRoOjM1XG4gICAgICB9XG4gICAgICBzZWxlY3RSb3dIZWFkZXIgPSB0aGlzLnByb3BzLnNlbGVjdFJvdy5oaWRlU2VsZWN0Q29sdW1uP251bGw6KDx0aCBzdHlsZT17c3R5bGV9IGtleT17LTF9PjwvdGg+KTtcbiAgICB9XG4gICAgdmFyIHRoZWFkZXIgPSB0aGlzLnByb3BzLmNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbiwgaSl7XG4gICAgICBsZXQgd2lkdGggPSBjb2x1bW4ud2lkdGggPT0gbnVsbD9jb2x1bW4ud2lkdGg6cGFyc2VJbnQoY29sdW1uLndpZHRoKTtcbiAgICAgIGxldCBzdHlsZT17XG4gICAgICAgIGRpc3BsYXk6IGNvbHVtbi5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBtYXhXaWR0aDogd2lkdGhcbiAgICAgICAgLyoqIGFkZCBtaW4td2R0aCB0byBmaXggdXNlciBhc3NpZ24gY29sdW1uIHdpZHRoIG5vdCBlcSBvZmZzZXRXaWR0aCBpbiBsYXJnZSBjb2x1bW4gdGFibGUgKiovXG4gICAgICB9O1xuICAgICAgbGV0IHNvcnRDYWVydCA9IGNvbHVtbi5zb3J0PyhVdGlsLnJlbmRlclJlYWN0U29ydENhcmV0KENvbnN0LlNPUlRfREVTQykpOm51bGw7XG4gICAgICByZXR1cm4gKDx0aCBzdHlsZT17c3R5bGV9IGtleT17aX0gY2xhc3NOYW1lPXtjb2x1bW4uY2xhc3NOYW1lfT57Y29sdW1uLnRleHR9e3NvcnRDYWVydH08L3RoPik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4oXG4gICAgICA8dGhlYWQgcmVmPVwiaGVhZGVyXCI+XG4gICAgICAgIDx0cj57c2VsZWN0Um93SGVhZGVyfXt0aGVhZGVyfTwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgIClcbiAgfVxuXG4gIGhhbmRsZVJvd01vdXNlT3V0KHJvd0luZGV4KXtcbiAgICBjb25zdCB0YXJnZXRSb3cgPSB0aGlzLnByb3BzLmRhdGFbcm93SW5kZXgtMV07XG4gICAgdGhpcy5wcm9wcy5vblJvd01vdXNlT3V0KHRhcmdldFJvdyk7XG4gIH1cblxuICBoYW5kbGVSb3dNb3VzZU92ZXIocm93SW5kZXgpe1xuICAgIGNvbnN0IHRhcmdldFJvdyA9IHRoaXMucHJvcHMuZGF0YVtyb3dJbmRleC0xXTtcbiAgICB0aGlzLnByb3BzLm9uUm93TW91c2VPdmVyKHRhcmdldFJvdyk7XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayhyb3dJbmRleCl7XG4gICAgdmFyIGtleSwgc2VsZWN0ZWRSb3c7XG4gICAgdGhpcy5wcm9wcy5kYXRhLmZvckVhY2goZnVuY3Rpb24ocm93LCBpKXtcbiAgICAgIGlmKGkgPT0gcm93SW5kZXgtMSl7XG4gICAgICAgIGtleSA9IHJvd1t0aGlzLnByb3BzLmtleUZpZWxkXTtcbiAgICAgICAgc2VsZWN0ZWRSb3cgPSByb3c7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKHNlbGVjdGVkUm93KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdFJvdyhyb3dJbmRleCwgaXNTZWxlY3RlZCl7XG4gICAgdmFyIGtleSwgc2VsZWN0ZWRSb3c7XG4gICAgdGhpcy5wcm9wcy5kYXRhLmZvckVhY2goZnVuY3Rpb24ocm93LCBpKXtcbiAgICAgIGlmKGkgPT0gcm93SW5kZXgtMSl7XG4gICAgICAgIGtleSA9IHJvd1t0aGlzLnByb3BzLmtleUZpZWxkXTtcbiAgICAgICAgc2VsZWN0ZWRSb3cgPSByb3c7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0Um93KHNlbGVjdGVkUm93LCBpc1NlbGVjdGVkKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdFJvd0NvbHVtQ2hhbmdlKGUpe1xuICAgIGlmKCF0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0IHx8ICF0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0QW5kRWRpdENlbGwpe1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3RSb3coXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucm93SW5kZXgsIGUuY3VycmVudFRhcmdldC5jaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbChyb3dJbmRleCwgY29sdW1uSW5kZXgpe1xuICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgaWYodGhpcy5faXNTZWxlY3RSb3dEZWZpbmVkKCkpe1xuICAgICAgY29sdW1uSW5kZXgtLTtcbiAgICAgIGlmKHRoaXMucHJvcHMuc2VsZWN0Um93LmhpZGVTZWxlY3RDb2x1bW4pXG4gICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgfVxuICAgIHJvd0luZGV4LS07XG4gICAgdmFyIHN0YXRlT2JqID0ge1xuICAgICAgY3VyckVkaXRDZWxsOiB7XG4gICAgICAgIHJpZDogcm93SW5kZXgsXG4gICAgICAgIGNpZDogY29sdW1uSW5kZXhcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYodGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xpY2tUb1NlbGVjdEFuZEVkaXRDZWxsKXtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvd0luZGV4KzEsIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlT2JqKTtcbiAgfVxuXG4gIGNhbmNlbEVkaXQoKXtcbiAgICB2YXIgY3VyckVkaXRDZWxsPXRoaXMuc3RhdGUuY3VyckVkaXRDZWxsO1xuICAgIGlmKGN1cnJFZGl0Q2VsbCl7XG4gICAgICB0aGlzLmhhbmRsZUNvbXBsZXRlRWRpdENlbGwobnVsbCxjdXJyRWRpdENlbGwucmlkLGN1cnJFZGl0Q2VsbC5jaWQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbXBsZXRlRWRpdENlbGwobmV3VmFsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpe1xuICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJFZGl0Q2VsbDogbnVsbH0pO1xuICAgIGlmKG51bGwgIT0gbmV3VmFsKVxuICAgICAgdGhpcy5wcm9wcy5jZWxsRWRpdC5fX29uQ29tcGxldGVFZGl0X18obmV3VmFsLCByb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICB9XG5cbiAgcmVuZGVyU2VsZWN0Um93Q29sdW1uKHNlbGVjdGVkKXtcbiAgICBpZih0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09IENvbnN0LlJPV19TRUxFQ1RfU0lOR0xFKSB7XG4gICAgICByZXR1cm4gKDxUYWJsZUNvbHVtbj48aW5wdXQgdHlwZT1cInJhZGlvXCIgY2hlY2tlZD17c2VsZWN0ZWR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdFJvd0NvbHVtQ2hhbmdlLmJpbmQodGhpcyl9Lz48L1RhYmxlQ29sdW1uPik7XG4gICAgfWVsc2Uge1xuICAgICAgcmV0dXJuICg8VGFibGVDb2x1bW4gPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZWxlY3RlZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0Um93Q29sdW1DaGFuZ2UuYmluZCh0aGlzKX0vPjwvVGFibGVDb2x1bW4+KTtcbiAgICB9XG4gIH1cblxuICBnZXRCb2R5SGVhZGVyRG9tUHJvcCgpe1xuICAgIHZhciBoZWFkZXJzID0gdGhpcy5yZWZzLmhlYWRlci5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXM7XG4gICAgdmFyIGhlYWRlckRvbVByb3BzID0gW107XG4gICAgZm9yKGxldCBpPTA7aTxoZWFkZXJzLmxlbmd0aDtpKyspe1xuICAgICAgaGVhZGVyRG9tUHJvcHMucHVzaCh7XG4gICAgICAgIHdpZHRoOmhlYWRlcnNbaV0ub2Zmc2V0V2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZGVyRG9tUHJvcHM7XG4gIH1cblxuICBhZGp1c3RCb2R5KCkge1xuICAgIHRoaXMuaGFyZEZpeEhlYWRlcldpZHRoKCk7XG4gICAgaWYodGhpcy5wcm9wcy5jb25kZW5zZWQpIHtcbiAgICAgIHRoaXMucmVmcy5ib2R5LnN0eWxlLm1hcmdpblRvcCA9IFwiLTM2cHhcIjtcbiAgICB9XG5cbiAgICBpZih0aGlzLnByb3BzLm1heEhlaWdodCAmJlxuICAgICAgcGFyc2VJbnQodGhpcy5wcm9wcy5tYXhIZWlnaHQpIDwgdGhpcy5yZWZzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gKHRoaXMucHJvcHMubWF4SGVpZ2h0IC0gNDIpICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIGhhcmRGaXhIZWFkZXJXaWR0aCgpe1xuICAgIHZhciBoZWFkZXJzID0gdGhpcy5yZWZzLmhlYWRlci5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXM7XG4gICAgZm9yKGxldCBpPTA7aTxoZWFkZXJzLmxlbmd0aDtpKyspe1xuICAgICAgaGVhZGVyc1tpXS5zdHlsZS53aWR0aCA9IGhlYWRlcnNbaV0ub2Zmc2V0V2lkdGggKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCl7XG4gICAgaWYodGhpcy5wcm9wcy5oZWlnaHQgPT0gXCIxMDAlXCIpIHJldHVybiB0aGlzLnByb3BzLmhlaWdodDtcbiAgICBlbHNle1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMucHJvcHMuaGVpZ2h0KSAtIDQyO1xuICAgIH1cbiAgfVxuXG4gIF9pc1NlbGVjdFJvd0RlZmluZWQoKXtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RSb3cubW9kZSA9PT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFJvdy5tb2RlID09PSBDb25zdC5ST1dfU0VMRUNUX01VTFRJO1xuICB9XG59XG5UYWJsZUJvZHkucHJvcFR5cGVzID0ge1xuICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICBzdHJpcGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgYm9yZGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBob3ZlcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNvbmRlbnNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGtleUZpZWxkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RlZFJvd0tleXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgb25Sb3dDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0Um93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgbm9EYXRhVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcbmV4cG9ydCBkZWZhdWx0IFRhYmxlQm9keTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlQm9keS5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5cbmNsYXNzIFRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICB9XG5cbiAgcm93Q2xpY2soZSl7XG4gICAgaWYoZS50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiICYmXG4gICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgIT09IFwiU0VMRUNUXCIgJiZcbiAgICAgICAgZS50YXJnZXQudGFnTmFtZSAhPT0gXCJURVhUQVJFQVwiKSB7XG4gICAgICBjb25zdCByb3dJbmRleCA9IGUuY3VycmVudFRhcmdldC5yb3dJbmRleDtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdykge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdFJvdy5jbGlja1RvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0Um93KHJvd0luZGV4LCAhdGhpcy5wcm9wcy5pc1NlbGVjdGVkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGlja051bSsrO1xuICAgICAgICAgICAgLyoqIGlmIGNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCBpcyBlbmFibGVkLFxuICAgICAgICAgICAgICogIHRoZXJlIHNob3VsZCBiZSBhIGRlbGF5IHRvIHByZXZlbnQgYSBzZWxlY3Rpb24gY2hhbmdlZCB3aGVuXG4gICAgICAgICAgICAgKiAgdXNlciBkYmxpY2sgdG8gZWRpdCBjZWxsIG9uIHNhbWUgcm93IGJ1dCBkaWZmZXJlbnQgY2VsbFxuICAgICAgICAgICAgKiovXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYodGhpcy5jbGlja051bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RSb3cocm93SW5kZXgsICF0aGlzLnByb3BzLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB0aGlzLnByb3BzLm9uUm93Q2xpY2socm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJvd01vdXNlT3V0KGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd01vdXNlT3V0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93TW91c2VPdXQoZS5jdXJyZW50VGFyZ2V0LnJvd0luZGV4KTtcbiAgICB9XG4gIH1cblxuICByb3dNb3VzZU92ZXIoZSkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUm93TW91c2VPdmVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93TW91c2VPdmVyKGUuY3VycmVudFRhcmdldC5yb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdGhpcy5jbGlja051bSA9IDA7XG4gICAgdmFyIHRyQ3NzPXtcbiAgICAgIHN0eWxlOntcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmlzU2VsZWN0ZWQ/dGhpcy5wcm9wcy5zZWxlY3RSb3cuYmdDb2xvcjpudWxsXG4gICAgICB9LFxuICAgICAgY2xhc3NOYW1lOih0aGlzLnByb3BzLmlzU2VsZWN0ZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xhc3NOYW1lID8gdGhpcy5wcm9wcy5zZWxlY3RSb3cuY2xhc3NOYW1lIDogJycpICsgKHRoaXMucHJvcHMuY2xhc3NOYW1lfHwnJylcbiAgICB9O1xuXG4gICAgaWYodGhpcy5wcm9wcy5zZWxlY3RSb3cgJiYgKHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3QgfHxcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0Um93LmNsaWNrVG9TZWxlY3RBbmRFZGl0Q2VsbCkgfHwgdGhpcy5wcm9wcy5vblJvd0NsaWNrKXtcbiAgICAgIHJldHVybihcbiAgICAgICAgPHRyIHsuLi50ckNzc31cbiAgICAgICAgICAgIG9uTW91c2VPdmVyPXt0aGlzLnJvd01vdXNlT3Zlci5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25Nb3VzZU91dD17dGhpcy5yb3dNb3VzZU91dC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5yb3dDbGljay5iaW5kKHRoaXMpfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3RyPlxuICAgICAgKVxuICAgIH1lbHNle1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8dHIgey4uLnRyQ3NzfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3RyPlxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuVGFibGVSb3cucHJvcFR5cGVzID0ge1xuICBpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZW5hYmxlQ2VsbEVkaXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvblJvd0NsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3RSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblJvd01vdXNlT3V0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25Sb3dNb3VzZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuVGFibGVSb3cuZGVmYXVsdFByb3BzID0ge1xuICBvblJvd0NsaWNrOiB1bmRlZmluZWRcbn1cbmV4cG9ydCBkZWZhdWx0IFRhYmxlUm93O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVSb3cuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuXG5jbGFzcyBUYWJsZUNvbHVtbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHNob3VsZFVwZGF0ZWQgPSB0aGlzLnByb3BzLndpZHRoICE9PSBuZXh0UHJvcHMud2lkdGhcbiAgICAgIHx8IHRoaXMucHJvcHMuY2xhc3NOYW1lICE9PSBuZXh0UHJvcHMuY2xhc3NOYW1lXG4gICAgICB8fCB0aGlzLnByb3BzLmhpZGRlbiAhPT0gbmV4dFByb3BzLmhpZGRlblxuICAgICAgfHwgdGhpcy5wcm9wcy5kYXRhQWxpZ24gIT09IG5leHRQcm9wcy5kYXRhQWxpZ25cbiAgICAgIHx8IHR5cGVvZiBjaGlsZHJlbiAhPT0gdHlwZW9mIG5leHRQcm9wcy5jaGlsZHJlblxuICAgICAgfHwgKCcnK3RoaXMucHJvcHMub25FZGl0KS50b1N0cmluZygpICE9PSAoJycrbmV4dFByb3BzLm9uRWRpdCkudG9TdHJpbmcoKVxuXG4gICAgaWYoc2hvdWxkVXBkYXRlZCl7XG4gICAgICByZXR1cm4gc2hvdWxkVXBkYXRlZDtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgY2hpbGRyZW4gPT09ICdvYmplY3QnICYmIGNoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICBpZihjaGlsZHJlbi5wcm9wcy50eXBlID09PSAnY2hlY2tib3gnIHx8IGNoaWxkcmVuLnByb3BzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgc2hvdWxkVXBkYXRlZCA9IHNob3VsZFVwZGF0ZWQgfHxcbiAgICAgICAgICBjaGlsZHJlbi5wcm9wcy50eXBlICE9PSBuZXh0UHJvcHMuY2hpbGRyZW4ucHJvcHMudHlwZSB8fFxuICAgICAgICAgIGNoaWxkcmVuLnByb3BzLmNoZWNrZWQgIT09IG5leHRQcm9wcy5jaGlsZHJlbi5wcm9wcy5jaGVja2VkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hvdWxkVXBkYXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3VsZFVwZGF0ZWQgPSBzaG91bGRVcGRhdGVkIHx8IGNoaWxkcmVuICE9PSBuZXh0UHJvcHMuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgaWYoc2hvdWxkVXBkYXRlZCl7XG4gICAgICByZXR1cm4gc2hvdWxkVXBkYXRlZDtcbiAgICB9XG5cbiAgICBpZighKHRoaXMucHJvcHMuY2VsbEVkaXQgJiYgbmV4dFByb3BzLmNlbGxFZGl0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2hvdWxkVXBkYXRlZFxuICAgICAgICB8fCB0aGlzLnByb3BzLmNlbGxFZGl0Lm1vZGUgIT09IG5leHRQcm9wcy5jZWxsRWRpdC5tb2RlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNlbGxFZGl0KGUpe1xuICAgIGlmKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PSBDb25zdC5DRUxMX0VESVRfREJDTElDSyl7XG4gICAgICBpZihkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KSB7XG4gICAgICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xuICAgICAgfSBlbHNlIGlmKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkVkaXQoXG4gICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5yb3dJbmRleCxcbiAgICAgIGUuY3VycmVudFRhcmdldC5jZWxsSW5kZXgpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgdmFyIHdpZHRoID0gdGhpcy5wcm9wcy53aWR0aCA9PSBudWxsP1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aDpwYXJzZUludCh0aGlzLnByb3BzLndpZHRoKTtcbiAgICB2YXIgdGRTdHlsZSA9IHtcbiAgICAgIHRleHRBbGlnbjogdGhpcy5wcm9wcy5kYXRhQWxpZ24sXG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLmhpZGRlbj9cIm5vbmVcIjpudWxsLFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgbWF4V2lkdGg6IHdpZHRoXG4gICAgfTtcbiAgICB2YXIgY2xhc3NuYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gICAgaWYodGhpcy5wcm9wcy53aWR0aCl7XG4gICAgICAgIGNsYXNzbmFtZSArPSBcIiBjb2wtbWQtXCIrd2lkdGg7XG4gICAgfVxuXG5cbiAgICB2YXIgb3B0cyA9IHt9O1xuICAgIGlmKHRoaXMucHJvcHMuY2VsbEVkaXQpe1xuICAgICAgaWYodGhpcy5wcm9wcy5jZWxsRWRpdC5tb2RlID09IENvbnN0LkNFTExfRURJVF9DTElDSyl7XG4gICAgICAgIG9wdHMub25DbGljayA9IHRoaXMuaGFuZGxlQ2VsbEVkaXQuYmluZCh0aGlzKTtcbiAgICAgIH1lbHNlIGlmKHRoaXMucHJvcHMuY2VsbEVkaXQubW9kZSA9PSBDb25zdC5DRUxMX0VESVRfREJDTElDSyl7XG4gICAgICAgIG9wdHMub25Eb3VibGVDbGljayA9IHRoaXMuaGFuZGxlQ2VsbEVkaXQuYmluZCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZCBzdHlsZT17dGRTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc25hbWV9IHsuLi5vcHRzfT5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L3RkPlxuICAgIClcbiAgfVxufVxuVGFibGVDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBkYXRhQWxpZ246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGhpZGRlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5UYWJsZUNvbHVtbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhdGFBbGlnbjogXCJsZWZ0XCIsXG4gIGhpZGRlbjogZmFsc2UsXG4gIGNsYXNzTmFtZTpcIlwiXG59XG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbHVtbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlQ29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb25zdCBmcm9tICcuL0NvbnN0JztcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9FZGl0b3InXG5pbXBvcnQgTm90aWZpZXIgZnJvbSAnLi9Ob3RpZmljYXRpb24uanMnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jbGFzcyBUYWJsZUVkaXRDb2x1bW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIHNoYWtlRWRpdG9yOmZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gIGhhbmRsZUtleVByZXNzKGUpe1xuICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHsgLy9QcmVzc2VkIEVOVEVSXG4gICAgICBsZXQgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQudHlwZSA9PSAnY2hlY2tib3gnP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRDaGVja0JveFZhbHVlKGUpOmUuY3VycmVudFRhcmdldC52YWx1ZTtcblxuICAgICAgaWYoIXRoaXMudmFsaWRhdG9yKHZhbHVlKSl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgIHZhbHVlLCB0aGlzLnByb3BzLnJvd0luZGV4LCB0aGlzLnByb3BzLmNvbEluZGV4KTtcbiAgICB9ZWxzZSBpZihlLmtleUNvZGUgPT0gMjcpe1xuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgIG51bGwsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUJsdXIoZSl7XG4gICAgaWYodGhpcy5wcm9wcy5ibHVyVG9TYXZlKXtcbiAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC50eXBlID09ICdjaGVja2JveCc/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldENoZWNrQm94VmFsdWUoZSk6ZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgaWYoIXRoaXMudmFsaWRhdG9yKHZhbHVlKSl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5jb21wbGV0ZUVkaXQoXG4gICAgICAgICAgdmFsdWUsIHRoaXMucHJvcHMucm93SW5kZXgsIHRoaXMucHJvcHMuY29sSW5kZXgpO1xuICAgIH1cbiAgfVxuICB2YWxpZGF0b3IodmFsdWUpe1xuICAgICAgdmFyIHRzPXRoaXM7XG4gICAgICBpZih0cy5wcm9wcy5lZGl0YWJsZS52YWxpZGF0b3Ipe1xuICAgICAgICAgIHZhciB2YWxpZD10cy5wcm9wcy5lZGl0YWJsZS52YWxpZGF0b3IodmFsdWUpO1xuICAgICAgICAgIGlmKHZhbGlkIT09dHJ1ZSl7XG4gICAgICAgICAgICAgIHRzLnJlZnMubm90aWZpZXIubm90aWNlKCdlcnJvcicsdmFsaWQsXCJQcmVzc2VkIEVTQyBjYW4gY2FuY2VsXCIpO1xuICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0cy5yZWZzLmlucHV0UmVmO1xuICAgICAgICAgICAgICAvL2FuaW1hdGUgaW5wdXRcbiAgICAgICAgICAgICAgdHMuY2xlYXJUaW1lb3V0KCk7XG4gICAgICAgICAgICAgIHRzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjp0cnVlfSk7XG4gICAgICAgICAgICAgIHRzLnRpbWVvdXRlQ2xlYXI9c2V0VGltZW91dChmdW5jdGlvbigpe3RzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjpmYWxzZX0pO30sMzAwKTtcbiAgICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gIH1cbiAgY2xlYXJUaW1lb3V0KCl7XG4gICAgICBpZih0aGlzLnRpbWVvdXRlQ2xlYXIhPTApe1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRlQ2xlYXIpO1xuICAgICAgICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMuaW5wdXRSZWY7XG4gICAgICAvLyBpbnB1dC52YWx1ZSA9IHRoaXMucHJvcHMuY2hpbGRyZW58fCcnO1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgZWRpdGFibGU9dGhpcy5wcm9wcy5lZGl0YWJsZSxcbiAgICAgICAgZm9ybWF0PXRoaXMucHJvcHMuZm9ybWF0LFxuICAgICAgICBhdHRyPXtcbiAgICAgICAgICAgIHJlZjpcImlucHV0UmVmXCIsXG4gICAgICAgICAgICBvbktleURvd246dGhpcy5oYW5kbGVLZXlQcmVzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25CbHVyOnRoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMpXG4gICAgICAgIH07XG4gICAgICAgIC8vcHV0IHBsYWNlaG9sZGVyIGlmIGV4aXN0XG4gICAgICAgIGVkaXRhYmxlLnBsYWNlaG9sZGVyJiYoYXR0ci5wbGFjZWhvbGRlcj1lZGl0YWJsZS5wbGFjZWhvbGRlcik7XG5cbiAgICB2YXIgZWRpdG9yQ2xhc3M9Y2xhc3NTZXQoeydhbmltYXRlZCc6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvciwnc2hha2UnOnRoaXMuc3RhdGUuc2hha2VFZGl0b3J9KTtcbiAgICByZXR1cm4oXG4gICAgICAgIDx0ZCByZWY9XCJ0ZFwiIHN0eWxlPXt7cG9zaXRpb246J3JlbGF0aXZlJ319PlxuICAgICAgICAgICAge0VkaXRvcihlZGl0YWJsZSxhdHRyLGZvcm1hdCxlZGl0b3JDbGFzcyx0aGlzLnByb3BzLmNoaWxkcmVufHwnJyl9XG4gICAgICAgICAgICA8Tm90aWZpZXIgcmVmPVwibm90aWZpZXJcIj48L05vdGlmaWVyPlxuICAgICAgICA8L3RkPlxuICAgIClcbiAgfVxuXG4gIF9nZXRDaGVja0JveFZhbHVlKGUpe1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIGxldCB2YWx1ZXMgPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUuc3BsaXQoJzonKTtcbiAgICB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5jaGVja2VkP3ZhbHVlc1swXTp2YWx1ZXNbMV07XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbn1cblRhYmxlRWRpdENvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIGNvbXBsZXRlRWRpdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHJvd0luZGV4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBjb2xJbmRleDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgYmx1clRvU2F2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVFZGl0Q29sdW1uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGVFZGl0Q29sdW1uLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbnZhciBFZGl0b3I9ZnVuY3Rpb24oZWRpdGFibGUsIGF0dHIsIGZvcm1hdCwgZWRpdG9yQ2xhc3MsIGRlZmF1bHRWYWx1ZSl7XG5cblxuICAgIGlmKGVkaXRhYmxlPT09dHJ1ZXx8dHlwZW9mIGVkaXRhYmxlPT09XCJzdHJpbmdcIil7Ly9zaW1wbGUgZGVjbGFyZVxuICAgICAgICB2YXIgdHlwZT1lZGl0YWJsZT09PXRydWU/J3RleHQnOmVkaXRhYmxlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPXt0eXBlfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyhlZGl0b3JDbGFzc3x8XCJcIikrXCIgZm9ybS1jb250cm9sIGVkaXRvciBlZGl0LXRleHRcIn0gLz5cbiAgICAgICAgKVxuICAgIH0gZWxzZSBpZighZWRpdGFibGUpe1xuICAgICAgdmFyIHR5cGU9ZWRpdGFibGU9PT10cnVlPyd0ZXh0JzplZGl0YWJsZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPXt0eXBlfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX0gZGlzYWJsZWQ9J2Rpc2FibGVkJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyhlZGl0b3JDbGFzc3x8XCJcIikrXCIgZm9ybS1jb250cm9sIGVkaXRvciBlZGl0LXRleHRcIn0gLz5cbiAgICAgIClcbiAgICB9IGVsc2UgaWYoZWRpdGFibGUudHlwZSl7Ly9zdGFuZGFyZCBkZWNsYXJlXG4gICAgICAgIC8vcHV0IHN0eWxlIGlmIGV4aXN0XG4gICAgICAgIGVkaXRhYmxlLnN0eWxlJiYoYXR0ci5zdHlsZT1lZGl0YWJsZS5zdHlsZSk7XG5cbiAgICAgICAgLy9wdXQgY2xhc3MgaWYgZXhpc3RcbiAgICAgICAgYXR0ci5jbGFzc05hbWUgPSAoZWRpdG9yQ2xhc3N8fFwiXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIiBmb3JtLWNvbnRyb2wgZWRpdG9yIGVkaXQtXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlLnR5cGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0YWJsZS5jbGFzc05hbWU/KFwiIFwiK2VkaXRhYmxlLmNsYXNzTmFtZSk6XCJcIik7XG5cbiAgICAgICAgaWYoZWRpdGFibGUudHlwZSA9PT0gJ3NlbGVjdCcpey8vcHJvY2VzcyBzZWxlY3QgaW5wdXRcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gW10sIHZhbHVlcz1lZGl0YWJsZS5vcHRpb25zLnZhbHVlcztcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodmFsdWVzKSl7Ly9vbmx5IGNhbiB1c2UgYXJycmF5IGRhdGEgZm9yIG9wdGlvbnNcbiAgICAgICAgICAgICAgICB2YXIgcm93VmFsdWU7XG4gICAgICAgICAgICAgICAgb3B0aW9ucz12YWx1ZXMubWFwKGZ1bmN0aW9uKGQsaSl7XG4gICAgICAgICAgICAgICAgICAgIHJvd1ZhbHVlPWZvcm1hdD9mb3JtYXQoZCk6ZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9eydvcHRpb24nK2l9IHZhbHVlPXtkfT57cm93VmFsdWV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8c2VsZWN0IHsuLi5hdHRyfSBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX0+e29wdGlvbnN9PC9zZWxlY3Q+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYoZWRpdGFibGUudHlwZSA9PT0gJ3RleHRhcmVhJyl7Ly9wcm9jZXNzIHRleHRhcmVhIGlucHV0XG4gICAgICAgICAgICAvL3B1dCAgb3RoZXIgaWYgZXhpc3RcbiAgICAgICAgICAgIGVkaXRhYmxlLmNvbHMmJihhdHRyLmNvbHM9ZWRpdGFibGUuY29scyk7XG4gICAgICAgICAgICBlZGl0YWJsZS5yb3dzJiYoYXR0ci5yb3dzPWVkaXRhYmxlLnJvd3MpO1xuICAgICAgICAgICAgdmFyIGtleVVwSGFuZGxlcj1hdHRyLm9uS2V5RG93bixzYXZlQnRuPW51bGw7XG4gICAgICAgICAgICBpZihrZXlVcEhhbmRsZXIpe1xuICAgICAgICAgICAgICAgIGF0dHIub25LZXlEb3duPWZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9IDEzKSB7IC8vbm90IFByZXNzZWQgRU5URVJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleVVwSGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2F2ZUJ0bj08YnV0dG8gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14cyB0ZXh0YXJlYS1zYXZlLWJ0blwiIG9uQ2xpY2s9e2tleVVwSGFuZGxlcn0+c2F2ZTwvYnV0dG8+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgey4uLmF0dHJ9IGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfT48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICB7c2F2ZUJ0bn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmKGVkaXRhYmxlLnR5cGUgPT09ICdjaGVja2JveCcpe1xuICAgICAgICAgIGxldCB2YWx1ZXMgPSAndHJ1ZTpmYWxzZSc7XG4gICAgICAgICAgaWYoZWRpdGFibGUub3B0aW9ucyAmJiBlZGl0YWJsZS5vcHRpb25zLnZhbHVlcyl7XG4gICAgICAgICAgICAvLyB2YWx1ZXMgPSBlZGl0YWJsZS5vcHRpb25zLnZhbHVlcy5zcGxpdCgnOicpO1xuICAgICAgICAgICAgdmFsdWVzID0gZWRpdGFibGUub3B0aW9ucy52YWx1ZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF0dHIuY2xhc3NOYW1lID0gYXR0ci5jbGFzc05hbWUucmVwbGFjZSgnZm9ybS1jb250cm9sJywnJyk7XG4gICAgICAgICAgYXR0ci5jbGFzc05hbWUgKz0gJyBjaGVja2JveCBwdWxsLXJpZ2h0JztcblxuICAgICAgICAgIGxldCBjaGVja2VkID0gZGVmYXVsdFZhbHVlICYmIGRlZmF1bHRWYWx1ZS50b1N0cmluZygpID09IHZhbHVlcy5zcGxpdCgnOicpWzBdP3RydWU6ZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHsuLi5hdHRyfSB0eXBlPSdjaGVja2JveCcgdmFsdWU9e3ZhbHVlc30gZGVmYXVsdENoZWNrZWQ9e2NoZWNrZWR9Lz5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2V7Ly9wcm9jZXNzIG90aGVyIGlucHV0IHR5cGUuIGFzIHBhc3N3b3JkLHVybCxlbWFpbC4uLlxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4uYXR0cn0gdHlwZT17dHlwZX0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9Lz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2RlZmF1bHQgcmV0dXJuIGZvciBvdGhlciBjYXNlIG9mIGVkaXRhYmxlXG4gICAgcmV0dXJuKFxuICAgICAgICA8aW5wdXQgey4uLmF0dHJ9IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPXsoZWRpdG9yQ2xhc3N8fFwiXCIpK1wiIGZvcm0tY29udHJvbCBlZGl0b3IgZWRpdC10ZXh0XCJ9Lz5cbiAgICApXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FZGl0b3IuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vQ29uc3QnO1xuXG5pbXBvcnQge1xuICBUb2FzdENvbnRhaW5lcixcbiAgVG9hc3RNZXNzYWdlLFxufSBmcm9tIFwicmVhY3QtdG9hc3RyXCI7XG5cblxudmFyIFRvYXN0ck1lc3NhZ2VGYWN0b3J5PVJlYWN0LmNyZWF0ZUZhY3RvcnkoVG9hc3RNZXNzYWdlLmFuaW1hdGlvbik7XG5cbmNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgLy8gYWxsb3cgdHlwZSBpcyBzdWNjZXNzLGluZm8sd2FybmluZyxlcnJvclxuICBub3RpY2UodHlwZSxtc2csdGl0bGUpe1xuICAgIHRoaXMucmVmcy50b2FzdHJbdHlwZV0oXG4gICAgICAgIG1zZyx0aXRsZSwge1xuICAgICAgICAgIG1vZGU6J3NpbmdsZScsXG4gICAgICAgICAgdGltZU91dDogNTAwMCxcbiAgICAgICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDAsXG4gICAgICAgICAgc2hvd0FuaW1hdGlvbjogXCJhbmltYXRlZCAgYm91bmNlSW5cIixcbiAgICAgICAgICBoaWRlQW5pbWF0aW9uOiBcImFuaW1hdGVkIGJvdW5jZU91dFwiXG4gICAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgcmV0dXJuKFxuICAgICAgICA8VG9hc3RDb250YWluZXIgcmVmPVwidG9hc3RyXCIgdG9hc3RNZXNzYWdlRmFjdG9yeT17VG9hc3RyTWVzc2FnZUZhY3Rvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ0b2FzdC1jb250YWluZXJcIiAgY2xhc3NOYW1lPVwidG9hc3QtdG9wLXJpZ2h0XCI+PC9Ub2FzdENvbnRhaW5lcj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvTm90aWZpY2F0aW9uLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRvYXN0TWVzc2FnZSA9IGV4cG9ydHMuVG9hc3RDb250YWluZXIgPSB1bmRlZmluZWQ7XG5cbnZhciBfVG9hc3RDb250YWluZXIgPSByZXF1aXJlKFwiLi9Ub2FzdENvbnRhaW5lclwiKTtcblxudmFyIF9Ub2FzdENvbnRhaW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2FzdENvbnRhaW5lcik7XG5cbnZhciBfVG9hc3RNZXNzYWdlID0gcmVxdWlyZShcIi4vVG9hc3RNZXNzYWdlXCIpO1xuXG52YXIgX1RvYXN0TWVzc2FnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2FzdE1lc3NhZ2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLlRvYXN0Q29udGFpbmVyID0gX1RvYXN0Q29udGFpbmVyMi5kZWZhdWx0O1xuZXhwb3J0cy5Ub2FzdE1lc3NhZ2UgPSBfVG9hc3RNZXNzYWdlMi5kZWZhdWx0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlID0gcmVxdWlyZShcInJlYWN0LWFkZG9ucy11cGRhdGVcIik7XG5cbnZhciBfcmVhY3RBZGRvbnNVcGRhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNVcGRhdGUpO1xuXG52YXIgX1RvYXN0TWVzc2FnZSA9IHJlcXVpcmUoXCIuL1RvYXN0TWVzc2FnZVwiKTtcblxudmFyIF9Ub2FzdE1lc3NhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9hc3RNZXNzYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgVG9hc3RDb250YWluZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoVG9hc3RDb250YWluZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRvYXN0Q29udGFpbmVyKCkge1xuICAgIHZhciBfT2JqZWN0JGdldFByb3RvdHlwZU87XG5cbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRvYXN0Q29udGFpbmVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9PYmplY3QkZ2V0UHJvdG90eXBlTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihUb2FzdENvbnRhaW5lcikpLmNhbGwuYXBwbHkoX09iamVjdCRnZXRQcm90b3R5cGVPLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7XG4gICAgICB0b2FzdHM6IFtdLFxuICAgICAgdG9hc3RJZDogMCxcbiAgICAgIHByZXZpb3VzTWVzc2FnZTogbnVsbFxuICAgIH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRvYXN0Q29udGFpbmVyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCB0aXRsZSwgb3B0aW9uc092ZXJyaWRlKSB7XG4gICAgICB0aGlzLl9ub3RpZnkodGhpcy5wcm9wcy50b2FzdFR5cGUuZXJyb3IsIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZm8obWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLmluZm8sIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdWNjZXNzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLnN1Y2Nlc3MsIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ3YXJuaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgdGl0bGUsIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgdGhpcy5fbm90aWZ5KHRoaXMucHJvcHMudG9hc3RUeXBlLndhcm5pbmcsIG1lc3NhZ2UsIHRpdGxlLCBvcHRpb25zT3ZlcnJpZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnJlZnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfdGhpczIucmVmc1trZXldLmhpZGVUb2FzdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IFwiYXJpYS1saXZlXCI6IFwicG9saXRlXCIsIHJvbGU6IFwiYWxlcnRcIiB9KSxcbiAgICAgICAgdGhpcy5zdGF0ZS50b2FzdHMubWFwKGZ1bmN0aW9uICh0b2FzdCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMucHJvcHMudG9hc3RNZXNzYWdlRmFjdG9yeSh0b2FzdCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfbm90aWZ5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9ub3RpZnkodHlwZSwgbWVzc2FnZSwgdGl0bGUpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgb3B0aW9uc092ZXJyaWRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbM107XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLnByZXZlbnREdXBsaWNhdGVzKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnByZXZpb3VzTWVzc2FnZSA9PT0gbWVzc2FnZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGtleSA9IHRoaXMuc3RhdGUudG9hc3RJZCsrO1xuICAgICAgdmFyIHRvYXN0SWQgPSBrZXk7XG4gICAgICB2YXIgbmV3VG9hc3QgPSAoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShvcHRpb25zT3ZlcnJpZGUsIHtcbiAgICAgICAgJG1lcmdlOiB7XG4gICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICB0b2FzdElkOiB0b2FzdElkLFxuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHJlZjogXCJ0b2FzdHNfX1wiICsga2V5LFxuICAgICAgICAgIGhhbmRsZU9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZU9uQ2xpY2soZSkge1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnNPdmVycmlkZS5oYW5kbGVPbkNsaWNrKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnNPdmVycmlkZS5oYW5kbGVPbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM0Ll9oYW5kbGVfdG9hc3Rfb25fY2xpY2soZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBoYW5kbGVSZW1vdmU6IHRoaXMuX2hhbmRsZV90b2FzdF9yZW1vdmUuYmluZCh0aGlzKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciB0b2FzdE9wZXJhdGlvbiA9IF9kZWZpbmVQcm9wZXJ0eSh7fSwgXCJcIiArICh0aGlzLnByb3BzLm5ld2VzdE9uVG9wID8gXCIkdW5zaGlmdFwiIDogXCIkcHVzaFwiKSwgW25ld1RvYXN0XSk7XG5cbiAgICAgIHZhciBuZXh0U3RhdGUgPSAoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KSh0aGlzLnN0YXRlLCB7XG4gICAgICAgIHRvYXN0czogdG9hc3RPcGVyYXRpb24sXG4gICAgICAgIHByZXZpb3VzTWVzc2FnZTogeyAkc2V0OiBtZXNzYWdlIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaGFuZGxlX3RvYXN0X29uX2NsaWNrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVfdG9hc3Rfb25fY2xpY2soZXZlbnQpIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oYW5kbGVfdG9hc3RfcmVtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVfdG9hc3RfcmVtb3ZlKHRvYXN0SWQpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgb3BlcmF0aW9uTmFtZSA9IFwiXCIgKyAodGhpcy5wcm9wcy5uZXdlc3RPblRvcCA/IFwicmVkdWNlUmlnaHRcIiA6IFwicmVkdWNlXCIpO1xuICAgICAgdGhpcy5zdGF0ZS50b2FzdHNbb3BlcmF0aW9uTmFtZV0oZnVuY3Rpb24gKGZvdW5kLCB0b2FzdCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGZvdW5kIHx8IHRvYXN0LnRvYXN0SWQgIT09IHRvYXN0SWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXM1LnNldFN0YXRlKCgwLCBfcmVhY3RBZGRvbnNVcGRhdGUyLmRlZmF1bHQpKF90aGlzNS5zdGF0ZSwge1xuICAgICAgICAgIHRvYXN0czogeyAkc3BsaWNlOiBbW2luZGV4LCAxXV0gfVxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUb2FzdENvbnRhaW5lcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblRvYXN0Q29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgdG9hc3RUeXBlOiB7XG4gICAgZXJyb3I6IFwiZXJyb3JcIixcbiAgICBpbmZvOiBcImluZm9cIixcbiAgICBzdWNjZXNzOiBcInN1Y2Nlc3NcIixcbiAgICB3YXJuaW5nOiBcIndhcm5pbmdcIlxuICB9LFxuICBpZDogXCJ0b2FzdC1jb250YWluZXJcIixcbiAgdG9hc3RNZXNzYWdlRmFjdG9yeTogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUZhY3RvcnkoX1RvYXN0TWVzc2FnZTIuZGVmYXVsdCksXG4gIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcbiAgbmV3ZXN0T25Ub3A6IHRydWUsXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRvYXN0Q29udGFpbmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RDb250YWluZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvdXBkYXRlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtdG9hc3RyL34vcmVhY3QtYWRkb25zLXVwZGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdXBkYXRlXG4gKi9cblxuLyogZ2xvYmFsIGhhc093blByb3BlcnR5OnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGhhc093blByb3BlcnR5ID0gKHt9KS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gc2hhbGxvd0NvcHkoeCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB4LmNvbmNhdCgpO1xuICB9IGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFzc2lnbihuZXcgeC5jb25zdHJ1Y3RvcigpLCB4KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geDtcbiAgfVxufVxuXG52YXIgQ09NTUFORF9QVVNIID0ga2V5T2YoeyAkcHVzaDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1VOU0hJRlQgPSBrZXlPZih7ICR1bnNoaWZ0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfU1BMSUNFID0ga2V5T2YoeyAkc3BsaWNlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfU0VUID0ga2V5T2YoeyAkc2V0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfTUVSR0UgPSBrZXlPZih7ICRtZXJnZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX0FQUExZID0ga2V5T2YoeyAkYXBwbHk6IG51bGwgfSk7XG5cbnZhciBBTExfQ09NTUFORFNfTElTVCA9IFtDT01NQU5EX1BVU0gsIENPTU1BTkRfVU5TSElGVCwgQ09NTUFORF9TUExJQ0UsIENPTU1BTkRfU0VULCBDT01NQU5EX01FUkdFLCBDT01NQU5EX0FQUExZXTtcblxudmFyIEFMTF9DT01NQU5EU19TRVQgPSB7fTtcblxuQUxMX0NPTU1BTkRTX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoY29tbWFuZCkge1xuICBBTExfQ09NTUFORFNfU0VUW2NvbW1hbmRdID0gdHJ1ZTtcbn0pO1xuXG5mdW5jdGlvbiBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIGNvbW1hbmQpIHtcbiAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCB0YXJnZXQgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4nLCBjb21tYW5kLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICB2YXIgc3BlY1ZhbHVlID0gc3BlY1tjb21tYW5kXTtcbiAgIUFycmF5LmlzQXJyYXkoc3BlY1ZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXIgaW4gYW4gYXJyYXk/JywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgc3BlYykge1xuICAhKHR5cGVvZiBzcGVjID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IFlvdSBwcm92aWRlZCBhIGtleSBwYXRoIHRvIHVwZGF0ZSgpIHRoYXQgZGlkIG5vdCBjb250YWluIG9uZSAnICsgJ29mICVzLiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIHslczogLi4ufT8nLCBBTExfQ09NTUFORFNfTElTVC5qb2luKCcsICcpLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU0VUKSkge1xuICAgICEoT2JqZWN0LmtleXMoc3BlYykubGVuZ3RoID09PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDYW5ub3QgaGF2ZSBtb3JlIHRoYW4gb25lIGtleSBpbiBhbiBvYmplY3Qgd2l0aCAlcycsIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gc3BlY1tDT01NQU5EX1NFVF07XG4gIH1cblxuICB2YXIgbmV4dFZhbHVlID0gc2hhbGxvd0NvcHkodmFsdWUpO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfTUVSR0UpKSB7XG4gICAgdmFyIG1lcmdlT2JqID0gc3BlY1tDT01NQU5EX01FUkdFXTtcbiAgICAhKG1lcmdlT2JqICYmIHR5cGVvZiBtZXJnZU9iaiA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgc3BlYyBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbWVyZ2VPYmopIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhKG5leHRWYWx1ZSAmJiB0eXBlb2YgbmV4dFZhbHVlID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSB0YXJnZXQgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG5leHRWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGFzc2lnbihuZXh0VmFsdWUsIHNwZWNbQ09NTUFORF9NRVJHRV0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9QVVNIKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9QVVNIKTtcbiAgICBzcGVjW0NPTU1BTkRfUFVTSF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1VOU0hJRlQpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1VOU0hJRlQpO1xuICAgIHNwZWNbQ09NTUFORF9VTlNISUZUXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUudW5zaGlmdChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU1BMSUNFKSkge1xuICAgICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCAlcyB0YXJnZXQgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICFBcnJheS5pc0FycmF5KHNwZWNbQ09NTUFORF9TUExJQ0VdKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBzcGVjW0NPTU1BTkRfU1BMSUNFXS5mb3JFYWNoKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAhQXJyYXkuaXNBcnJheShhcmdzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIG5leHRWYWx1ZS5zcGxpY2UuYXBwbHkobmV4dFZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfQVBQTFkpKSB7XG4gICAgISh0eXBlb2Ygc3BlY1tDT01NQU5EX0FQUExZXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYSBmdW5jdGlvbjsgZ290ICVzLicsIENPTU1BTkRfQVBQTFksIHNwZWNbQ09NTUFORF9BUFBMWV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBuZXh0VmFsdWUgPSBzcGVjW0NPTU1BTkRfQVBQTFldKG5leHRWYWx1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrIGluIHNwZWMpIHtcbiAgICBpZiAoIShBTExfQ09NTUFORFNfU0VULmhhc093blByb3BlcnR5KGspICYmIEFMTF9DT01NQU5EU19TRVRba10pKSB7XG4gICAgICBuZXh0VmFsdWVba10gPSB1cGRhdGUodmFsdWVba10sIHNwZWNba10pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi91cGRhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU9mXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtleU9mID0gZnVuY3Rpb24gKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qvfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qvfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmpRdWVyeSA9IGV4cG9ydHMuYW5pbWF0aW9uID0gdW5kZWZpbmVkO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1VwZGF0ZSA9IHJlcXVpcmUoXCJyZWFjdC1hZGRvbnMtdXBkYXRlXCIpO1xuXG52YXIgX3JlYWN0QWRkb25zVXBkYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zVXBkYXRlKTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9hbmltYXRpb25NaXhpbiA9IHJlcXVpcmUoXCIuL2FuaW1hdGlvbk1peGluXCIpO1xuXG52YXIgX2FuaW1hdGlvbk1peGluMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FuaW1hdGlvbk1peGluKTtcblxudmFyIF9qUXVlcnlNaXhpbiA9IHJlcXVpcmUoXCIuL2pRdWVyeU1peGluXCIpO1xuXG52YXIgX2pRdWVyeU1peGluMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pRdWVyeU1peGluKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBUb2FzdE1lc3NhZ2VTcGVjID0ge1xuICBkaXNwbGF5TmFtZTogXCJUb2FzdE1lc3NhZ2VcIixcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICB2YXIgaWNvbkNsYXNzTmFtZXMgPSB7XG4gICAgICBlcnJvcjogXCJ0b2FzdC1lcnJvclwiLFxuICAgICAgaW5mbzogXCJ0b2FzdC1pbmZvXCIsXG4gICAgICBzdWNjZXNzOiBcInRvYXN0LXN1Y2Nlc3NcIixcbiAgICAgIHdhcm5pbmc6IFwidG9hc3Qtd2FybmluZ1wiXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBjbGFzc05hbWU6IFwidG9hc3RcIixcbiAgICAgIGljb25DbGFzc05hbWVzOiBpY29uQ2xhc3NOYW1lcyxcbiAgICAgIHRpdGxlQ2xhc3NOYW1lOiBcInRvYXN0LXRpdGxlXCIsXG4gICAgICBtZXNzYWdlQ2xhc3NOYW1lOiBcInRvYXN0LW1lc3NhZ2VcIixcbiAgICAgIHRhcFRvRGlzbWlzczogdHJ1ZSxcbiAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGhhbmRsZU9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZU9uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZU9uQ2xpY2soZXZlbnQpO1xuICAgIGlmICh0aGlzLnByb3BzLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5oaWRlVG9hc3QodHJ1ZSk7XG4gICAgfVxuICB9LFxuICBfaGFuZGxlX2Nsb3NlX2J1dHRvbl9jbGljazogZnVuY3Rpb24gX2hhbmRsZV9jbG9zZV9idXR0b25fY2xpY2soZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpZGVUb2FzdCh0cnVlKTtcbiAgfSxcbiAgX2hhbmRsZV9yZW1vdmU6IGZ1bmN0aW9uIF9oYW5kbGVfcmVtb3ZlKCkge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlUmVtb3ZlKHRoaXMucHJvcHMudG9hc3RJZCk7XG4gIH0sXG4gIF9yZW5kZXJfY2xvc2VfYnV0dG9uOiBmdW5jdGlvbiBfcmVuZGVyX2Nsb3NlX2J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jbG9zZUJ1dHRvbiA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJ0b2FzdC1jbG9zZS1idXR0b25cIiwgcm9sZTogXCJidXR0b25cIixcbiAgICAgIG9uQ2xpY2s6IHRoaXMuX2hhbmRsZV9jbG9zZV9idXR0b25fY2xpY2ssXG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IFwiJnRpbWVzO1wiIH1cbiAgICB9KSA6IGZhbHNlO1xuICB9LFxuICBfcmVuZGVyX3RpdGxlX2VsZW1lbnQ6IGZ1bmN0aW9uIF9yZW5kZXJfdGl0bGVfZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZSA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLnRpdGxlQ2xhc3NOYW1lIH0sXG4gICAgICB0aGlzLnByb3BzLnRpdGxlXG4gICAgKSA6IGZhbHNlO1xuICB9LFxuICBfcmVuZGVyX21lc3NhZ2VfZWxlbWVudDogZnVuY3Rpb24gX3JlbmRlcl9tZXNzYWdlX2VsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubWVzc2FnZSA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLm1lc3NhZ2VDbGFzc05hbWUgfSxcbiAgICAgIHRoaXMucHJvcHMubWVzc2FnZVxuICAgICkgOiBmYWxzZTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIGljb25DbGFzc05hbWUgPSB0aGlzLnByb3BzLmljb25DbGFzc05hbWUgfHwgdGhpcy5wcm9wcy5pY29uQ2xhc3NOYW1lc1t0aGlzLnByb3BzLnR5cGVdO1xuXG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKHRoaXMucHJvcHMuY2xhc3NOYW1lLCBpY29uQ2xhc3NOYW1lKSxcbiAgICAgICAgc3R5bGU6IHRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlT25DbGljayxcbiAgICAgICAgb25Nb3VzZUVudGVyOiB0aGlzLmhhbmRsZU1vdXNlRW50ZXIsXG4gICAgICAgIG9uTW91c2VMZWF2ZTogdGhpcy5oYW5kbGVNb3VzZUxlYXZlXG4gICAgICB9LFxuICAgICAgdGhpcy5fcmVuZGVyX2Nsb3NlX2J1dHRvbigpLFxuICAgICAgdGhpcy5fcmVuZGVyX3RpdGxlX2VsZW1lbnQoKSxcbiAgICAgIHRoaXMuX3JlbmRlcl9tZXNzYWdlX2VsZW1lbnQoKVxuICAgICk7XG4gIH1cbn07XG5cbnZhciBhbmltYXRpb24gPSBleHBvcnRzLmFuaW1hdGlvbiA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcygoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShUb2FzdE1lc3NhZ2VTcGVjLCB7XG4gIGRpc3BsYXlOYW1lOiB7ICRzZXQ6IFwiVG9hc3RNZXNzYWdlLmFuaW1hdGlvblwiIH0sXG4gIG1peGluczogeyAkc2V0OiBbX2FuaW1hdGlvbk1peGluMi5kZWZhdWx0XSB9XG59KSk7XG5cbnZhciBqUXVlcnkgPSBleHBvcnRzLmpRdWVyeSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcygoMCwgX3JlYWN0QWRkb25zVXBkYXRlMi5kZWZhdWx0KShUb2FzdE1lc3NhZ2VTcGVjLCB7XG4gIGRpc3BsYXlOYW1lOiB7ICRzZXQ6IFwiVG9hc3RNZXNzYWdlLmpRdWVyeVwiIH0sXG4gIG1peGluczogeyAkc2V0OiBbX2pRdWVyeU1peGluMi5kZWZhdWx0XSB9XG59KSk7XG5cbi8qXG4gKiBhc3NpZ24gZGVmYXVsdCBub29wIGZ1bmN0aW9uc1xuICovXG5Ub2FzdE1lc3NhZ2VTcGVjLmhhbmRsZU1vdXNlRW50ZXIgPSBub29wO1xuVG9hc3RNZXNzYWdlU3BlYy5oYW5kbGVNb3VzZUxlYXZlID0gbm9vcDtcblRvYXN0TWVzc2FnZVNwZWMuaGlkZVRvYXN0ID0gbm9vcDtcblxudmFyIFRvYXN0TWVzc2FnZSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcyhUb2FzdE1lc3NhZ2VTcGVjKTtcblxuVG9hc3RNZXNzYWdlLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcblRvYXN0TWVzc2FnZS5qUXVlcnkgPSBqUXVlcnk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRvYXN0TWVzc2FnZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC10b2FzdHIvbGliL1RvYXN0TWVzc2FnZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9DU1NDb3JlID0gcmVxdWlyZShcImZianMvbGliL0NTU0NvcmVcIik7XG5cbnZhciBfQ1NTQ29yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DU1NDb3JlKTtcblxudmFyIF9SZWFjdFRyYW5zaXRpb25FdmVudHMgPSByZXF1aXJlKFwicmVhY3QvbGliL1JlYWN0VHJhbnNpdGlvbkV2ZW50c1wiKTtcblxudmFyIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUmVhY3RUcmFuc2l0aW9uRXZlbnRzKTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVElDSyA9IDE3O1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zaXRpb246IG51bGwsIC8vIHNvbWUgZXhhbXBsZXMgZGVmaW5lZCBpbiBpbmRleC5zY3NzIChzY2FsZSwgZmFkZUluT3V0LCByb3RhdGUpXG4gICAgICBzaG93QW5pbWF0aW9uOiBcImFuaW1hdGVkIGJvdW5jZUluXCIsIC8vIG9yIG90aGVyIGFuaW1hdGlvbnMgZnJvbSBhbmltYXRlLmNzc1xuICAgICAgaGlkZUFuaW1hdGlvbjogXCJhbmltYXRlZCBib3VuY2VPdXRcIixcbiAgICAgIHRpbWVPdXQ6IDUwMDAsXG4gICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDBcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmNsYXNzTmFtZVF1ZXVlID0gW107XG4gICAgdGhpcy5pc0hpZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGw7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5faXNfbW91bnRlZCA9IHRydWU7XG4gICAgdGhpcy5fc2hvdygpO1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgdmFyIG9uSGlkZUNvbXBsZXRlID0gZnVuY3Rpb24gb25IaWRlQ29tcGxldGUoKSB7XG4gICAgICBpZiAoX3RoaXMuaXNIaWRpbmcpIHtcbiAgICAgICAgX3RoaXMuX3NldF9pc19oaWRpbmcoZmFsc2UpO1xuICAgICAgICBfUmVhY3RUcmFuc2l0aW9uRXZlbnRzMi5kZWZhdWx0LnJlbW92ZUVuZEV2ZW50TGlzdGVuZXIobm9kZSwgb25IaWRlQ29tcGxldGUpO1xuICAgICAgICBfdGhpcy5faGFuZGxlX3JlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgX1JlYWN0VHJhbnNpdGlvbkV2ZW50czIuZGVmYXVsdC5hZGRFbmRFdmVudExpc3RlbmVyKG5vZGUsIG9uSGlkZUNvbXBsZXRlKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy50aW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5faXNfbW91bnRlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmludGVydmFsSWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsSWQpO1xuICAgIH1cbiAgfSxcbiAgX3NldF90cmFuc2l0aW9uOiBmdW5jdGlvbiBfc2V0X3RyYW5zaXRpb24oaGlkZSkge1xuICAgIHZhciBhbmltYXRpb25UeXBlID0gaGlkZSA/IFwibGVhdmVcIiA6IFwiZW50ZXJcIjtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy50cmFuc2l0aW9uICsgXCItXCIgKyBhbmltYXRpb25UeXBlO1xuICAgIHZhciBhY3RpdmVDbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIi1hY3RpdmVcIjtcblxuICAgIHZhciBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIGVuZExpc3RlbmVyKGUpIHtcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICE9PSBub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGFjdGl2ZUNsYXNzTmFtZSk7XG5cbiAgICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQucmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQuYWRkRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG5cbiAgICBfQ1NTQ29yZTIuZGVmYXVsdC5hZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuXG4gICAgLy8gTmVlZCB0byBkbyB0aGlzIHRvIGFjdHVhbGx5IHRyaWdnZXIgYSB0cmFuc2l0aW9uLlxuICAgIHRoaXMuX3F1ZXVlX2NsYXNzKGFjdGl2ZUNsYXNzTmFtZSk7XG4gIH0sXG4gIF9jbGVhcl90cmFuc2l0aW9uOiBmdW5jdGlvbiBfY2xlYXJfdHJhbnNpdGlvbihoaWRlKSB7XG4gICAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcyk7XG4gICAgdmFyIGFuaW1hdGlvblR5cGUgPSBoaWRlID8gXCJsZWF2ZVwiIDogXCJlbnRlclwiO1xuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnRyYW5zaXRpb24gKyBcIi1cIiArIGFuaW1hdGlvblR5cGU7XG4gICAgdmFyIGFjdGl2ZUNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiLWFjdGl2ZVwiO1xuXG4gICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcbiAgICBfQ1NTQ29yZTIuZGVmYXVsdC5yZW1vdmVDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuICB9LFxuICBfc2V0X2FuaW1hdGlvbjogZnVuY3Rpb24gX3NldF9hbmltYXRpb24oaGlkZSkge1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHZhciBhbmltYXRpb25zID0gdGhpcy5fZ2V0X2FuaW1hdGlvbl9jbGFzc2VzKGhpZGUpO1xuICAgIHZhciBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIGVuZExpc3RlbmVyKGUpIHtcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICE9PSBub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYW5pbWF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltKSB7XG4gICAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LnJlbW92ZUNsYXNzKG5vZGUsIGFuaW0pO1xuICAgICAgfSk7XG5cbiAgICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQucmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIF9SZWFjdFRyYW5zaXRpb25FdmVudHMyLmRlZmF1bHQuYWRkRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG5cbiAgICBhbmltYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFuaW0pIHtcbiAgICAgIF9DU1NDb3JlMi5kZWZhdWx0LmFkZENsYXNzKG5vZGUsIGFuaW0pO1xuICAgIH0pO1xuICB9LFxuICBfZ2V0X2FuaW1hdGlvbl9jbGFzc2VzOiBmdW5jdGlvbiBfZ2V0X2FuaW1hdGlvbl9jbGFzc2VzKGhpZGUpIHtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IGhpZGUgPyB0aGlzLnByb3BzLmhpZGVBbmltYXRpb24gOiB0aGlzLnByb3BzLnNob3dBbmltYXRpb247XG4gICAgaWYgKFwiW29iamVjdCBBcnJheV1cIiA9PT0gdG9TdHJpbmcuY2FsbChhbmltYXRpb25zKSkge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbnM7XG4gICAgfSBlbHNlIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgYW5pbWF0aW9ucykge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbnMuc3BsaXQoXCIgXCIpO1xuICAgIH1cbiAgfSxcbiAgX2NsZWFyX2FuaW1hdGlvbjogZnVuY3Rpb24gX2NsZWFyX2FuaW1hdGlvbihoaWRlKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgYW5pbWF0aW9ucyA9IHRoaXMuX2dldF9hbmltYXRpb25fY2xhc3NlcyhoaWRlKTtcbiAgICBhbmltYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFuaW1hdGlvbikge1xuICAgICAgX0NTU0NvcmUyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKF90aGlzMiksIGFuaW1hdGlvbik7XG4gICAgfSk7XG4gIH0sXG4gIF9xdWV1ZV9jbGFzczogZnVuY3Rpb24gX3F1ZXVlX2NsYXNzKGNsYXNzTmFtZSkge1xuICAgIHRoaXMuY2xhc3NOYW1lUXVldWUucHVzaChjbGFzc05hbWUpO1xuXG4gICAgaWYgKCF0aGlzLnRpbWVvdXQpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fZmx1c2hfY2xhc3NfbmFtZV9xdWV1ZSwgVElDSyk7XG4gICAgfVxuICB9LFxuICBfZmx1c2hfY2xhc3NfbmFtZV9xdWV1ZTogZnVuY3Rpb24gX2ZsdXNoX2NsYXNzX25hbWVfcXVldWUoKSB7XG4gICAgaWYgKHRoaXMuX2lzX21vdW50ZWQpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lUXVldWUuZm9yRWFjaChfQ1NTQ29yZTIuZGVmYXVsdC5hZGRDbGFzcy5iaW5kKF9DU1NDb3JlMi5kZWZhdWx0LCBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcykpKTtcbiAgICB9XG4gICAgdGhpcy5jbGFzc05hbWVRdWV1ZS5sZW5ndGggPSAwO1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gIH0sXG4gIF9zaG93OiBmdW5jdGlvbiBfc2hvdygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfdHJhbnNpdGlvbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5zaG93QW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfYW5pbWF0aW9uKCk7XG4gICAgfVxuICB9LFxuICBoYW5kbGVNb3VzZUVudGVyOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChudWxsKTtcbiAgICBpZiAodGhpcy5pc0hpZGluZykge1xuICAgICAgdGhpcy5fc2V0X2lzX2hpZGluZyhmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmhpZGVBbmltYXRpb24pIHtcbiAgICAgICAgdGhpcy5fY2xlYXJfYW5pbWF0aW9uKHRydWUpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5fY2xlYXJfdHJhbnNpdGlvbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhhbmRsZU1vdXNlTGVhdmU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKCF0aGlzLmlzSGlkaW5nICYmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwIHx8IHRoaXMucHJvcHMuZXh0ZW5kZWRUaW1lT3V0ID4gMCkpIHtcbiAgICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChzZXRUaW1lb3V0KHRoaXMuaGlkZVRvYXN0LCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCkpO1xuICAgIH1cbiAgfSxcbiAgaGlkZVRvYXN0OiBmdW5jdGlvbiBoaWRlVG9hc3Qob3ZlcnJpZGUpIHtcbiAgICBpZiAodGhpcy5pc0hpZGluZyB8fCB0aGlzLmludGVydmFsSWQgPT09IG51bGwgJiYgIW92ZXJyaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0X2lzX2hpZGluZyh0cnVlKTtcbiAgICBpZiAodGhpcy5wcm9wcy50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLl9zZXRfdHJhbnNpdGlvbih0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuaGlkZUFuaW1hdGlvbikge1xuICAgICAgdGhpcy5fc2V0X2FuaW1hdGlvbih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlX3JlbW92ZSgpO1xuICAgIH1cbiAgfSxcbiAgX3NldF9pbnRlcnZhbF9pZDogZnVuY3Rpb24gX3NldF9pbnRlcnZhbF9pZChpbnRlcnZhbElkKSB7XG4gICAgdGhpcy5pbnRlcnZhbElkID0gaW50ZXJ2YWxJZDtcbiAgfSxcbiAgX3NldF9pc19oaWRpbmc6IGZ1bmN0aW9uIF9zZXRfaXNfaGlkaW5nKGlzSGlkaW5nKSB7XG4gICAgdGhpcy5pc0hpZGluZyA9IGlzSGlkaW5nO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2FuaW1hdGlvbk1peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NDb3JlXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJy4vaW52YXJpYW50Jyk7XG5cbi8qKlxuICogVGhlIENTU0NvcmUgbW9kdWxlIHNwZWNpZmllcyB0aGUgQVBJIChhbmQgaW1wbGVtZW50cyBtb3N0IG9mIHRoZSBtZXRob2RzKVxuICogdGhhdCBzaG91bGQgYmUgdXNlZCB3aGVuIGRlYWxpbmcgd2l0aCB0aGUgZGlzcGxheSBvZiBlbGVtZW50cyAodmlhIHRoZWlyXG4gKiBDU1MgY2xhc3NlcyBhbmQgdmlzaWJpbGl0eSBvbiBzY3JlZW4uIEl0IGlzIGFuIEFQSSBmb2N1c2VkIG9uIG11dGF0aW5nIHRoZVxuICogZGlzcGxheSBhbmQgbm90IHJlYWRpbmcgaXQgYXMgbm8gbG9naWNhbCBzdGF0ZSBzaG91bGQgYmUgZW5jb2RlZCBpbiB0aGVcbiAqIGRpc3BsYXkgb2YgZWxlbWVudHMuXG4gKi9cblxudmFyIENTU0NvcmUgPSB7XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGNsYXNzIHBhc3NlZCBpbiB0byB0aGUgZWxlbWVudCBpZiBpdCBkb2Vzbid0IGFscmVhZHkgaGF2ZSBpdC5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGUgZWxlbWVudCBwYXNzZWQgaW5cbiAgICovXG4gIGFkZENsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgISEvXFxzLy50ZXN0KGNsYXNzTmFtZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ1NTQ29yZS5hZGRDbGFzcyB0YWtlcyBvbmx5IGEgc2luZ2xlIGNsYXNzIG5hbWUuIFwiJXNcIiBjb250YWlucyAnICsgJ211bHRpcGxlIGNsYXNzZXMuJywgY2xhc3NOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKCFDU1NDb3JlLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNsYXNzIHBhc3NlZCBpbiBmcm9tIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBzZXQgdGhlIGNsYXNzIG9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgdGhlIENTUyBjbGFzc05hbWVcbiAgICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhlIGVsZW1lbnQgcGFzc2VkIGluXG4gICAqL1xuICByZW1vdmVDbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0NTU0NvcmUucmVtb3ZlQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLiBcIiVzXCIgY29udGFpbnMgJyArICdtdWx0aXBsZSBjbGFzc2VzLicsIGNsYXNzTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIGlmIChDU1NDb3JlLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHN8JCknLCAnZycpLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gbXVsdGlwbGUgc3BhY2VzIHRvIG9uZVxuICAgICAgICAucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpOyAvLyB0cmltIHRoZSBlbmRzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gYWRkIG9yIHJlbW92ZSBhIGNsYXNzIGZyb20gYW4gZWxlbWVudCBiYXNlZCBvbiBhIGNvbmRpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcGFyYW0geyp9IGJvb2wgY29uZGl0aW9uIHRvIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSB0aGUgY2xhc3NcbiAgICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhlIGVsZW1lbnQgcGFzc2VkIGluXG4gICAqL1xuICBjb25kaXRpb25DbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSwgYm9vbCkge1xuICAgIHJldHVybiAoYm9vbCA/IENTU0NvcmUuYWRkQ2xhc3MgOiBDU1NDb3JlLnJlbW92ZUNsYXNzKShlbGVtZW50LCBjbGFzc05hbWUpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUZXN0cyB3aGV0aGVyIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3Mgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTU5vZGV8RE9NV2luZG93fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAhIS9cXHMvLnRlc3QoY2xhc3NOYW1lKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1MuaGFzQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIHJldHVybiAhIWNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENTU0NvcmU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvQ1NTQ29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFRyYW5zaXRpb25FdmVudHNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJ2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbi8qKlxuICogRVZFTlRfTkFNRV9NQVAgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hpY2ggZXZlbnQgZmlyZWQgd2hlbiBhXG4gKiB0cmFuc2l0aW9uL2FuaW1hdGlvbiBlbmRzLCBiYXNlZCBvbiB0aGUgc3R5bGUgcHJvcGVydHkgdXNlZCB0b1xuICogZGVmaW5lIHRoYXQgZXZlbnQuXG4gKi9cbnZhciBFVkVOVF9OQU1FX01BUCA9IHtcbiAgdHJhbnNpdGlvbmVuZDoge1xuICAgICd0cmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICdXZWJraXRUcmFuc2l0aW9uJzogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICdNb3pUcmFuc2l0aW9uJzogJ21velRyYW5zaXRpb25FbmQnLFxuICAgICdPVHJhbnNpdGlvbic6ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgJ21zVHJhbnNpdGlvbic6ICdNU1RyYW5zaXRpb25FbmQnXG4gIH0sXG5cbiAgYW5pbWF0aW9uZW5kOiB7XG4gICAgJ2FuaW1hdGlvbic6ICdhbmltYXRpb25lbmQnLFxuICAgICdXZWJraXRBbmltYXRpb24nOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICAnTW96QW5pbWF0aW9uJzogJ21vekFuaW1hdGlvbkVuZCcsXG4gICAgJ09BbmltYXRpb24nOiAnb0FuaW1hdGlvbkVuZCcsXG4gICAgJ21zQW5pbWF0aW9uJzogJ01TQW5pbWF0aW9uRW5kJ1xuICB9XG59O1xuXG52YXIgZW5kRXZlbnRzID0gW107XG5cbmZ1bmN0aW9uIGRldGVjdEV2ZW50cygpIHtcbiAgdmFyIHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB2YXIgc3R5bGUgPSB0ZXN0RWwuc3R5bGU7XG5cbiAgLy8gT24gc29tZSBwbGF0Zm9ybXMsIGluIHBhcnRpY3VsYXIgc29tZSByZWxlYXNlcyBvZiBBbmRyb2lkIDQueCxcbiAgLy8gdGhlIHVuLXByZWZpeGVkIFwiYW5pbWF0aW9uXCIgYW5kIFwidHJhbnNpdGlvblwiIHByb3BlcnRpZXMgYXJlIGRlZmluZWQgb24gdGhlXG4gIC8vIHN0eWxlIG9iamVjdCBidXQgdGhlIGV2ZW50cyB0aGF0IGZpcmUgd2lsbCBzdGlsbCBiZSBwcmVmaXhlZCwgc28gd2UgbmVlZFxuICAvLyB0byBjaGVjayBpZiB0aGUgdW4tcHJlZml4ZWQgZXZlbnRzIGFyZSB1c2VhYmxlLCBhbmQgaWYgbm90IHJlbW92ZSB0aGVtXG4gIC8vIGZyb20gdGhlIG1hcFxuICBpZiAoISgnQW5pbWF0aW9uRXZlbnQnIGluIHdpbmRvdykpIHtcbiAgICBkZWxldGUgRVZFTlRfTkFNRV9NQVAuYW5pbWF0aW9uZW5kLmFuaW1hdGlvbjtcbiAgfVxuXG4gIGlmICghKCdUcmFuc2l0aW9uRXZlbnQnIGluIHdpbmRvdykpIHtcbiAgICBkZWxldGUgRVZFTlRfTkFNRV9NQVAudHJhbnNpdGlvbmVuZC50cmFuc2l0aW9uO1xuICB9XG5cbiAgZm9yICh2YXIgYmFzZUV2ZW50TmFtZSBpbiBFVkVOVF9OQU1FX01BUCkge1xuICAgIHZhciBiYXNlRXZlbnRzID0gRVZFTlRfTkFNRV9NQVBbYmFzZUV2ZW50TmFtZV07XG4gICAgZm9yICh2YXIgc3R5bGVOYW1lIGluIGJhc2VFdmVudHMpIHtcbiAgICAgIGlmIChzdHlsZU5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgZW5kRXZlbnRzLnB1c2goYmFzZUV2ZW50c1tzdHlsZU5hbWVdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgZGV0ZWN0RXZlbnRzKCk7XG59XG5cbi8vIFdlIHVzZSB0aGUgcmF3IHthZGR8cmVtb3ZlfUV2ZW50TGlzdGVuZXIoKSBjYWxsIGJlY2F1c2UgRXZlbnRMaXN0ZW5lclxuLy8gZG9lcyBub3Qga25vdyBob3cgdG8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBhbmQgd2UgcmVhbGx5IHNob3VsZFxuLy8gY2xlYW4gdXAuIEFsc28sIHRoZXNlIGV2ZW50cyBhcmUgbm90IHRyaWdnZXJlZCBpbiBvbGRlciBicm93c2Vyc1xuLy8gc28gd2Ugc2hvdWxkIGJlIEEtT0sgaGVyZS5cblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lcikge1xuICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbnZhciBSZWFjdFRyYW5zaXRpb25FdmVudHMgPSB7XG4gIGFkZEVuZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChub2RlLCBldmVudExpc3RlbmVyKSB7XG4gICAgaWYgKGVuZEV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIElmIENTUyB0cmFuc2l0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCwgdHJpZ2dlciBhbiBcImVuZCBhbmltYXRpb25cIlxuICAgICAgLy8gZXZlbnQgaW1tZWRpYXRlbHkuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChldmVudExpc3RlbmVyLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZW5kRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGVuZEV2ZW50KSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGVuZEV2ZW50LCBldmVudExpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSxcblxuICByZW1vdmVFbmRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAobm9kZSwgZXZlbnRMaXN0ZW5lcikge1xuICAgIGlmIChlbmRFdmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVuZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbmRFdmVudCkge1xuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRFdmVudCwgZXZlbnRMaXN0ZW5lcik7XG4gICAgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RUcmFuc2l0aW9uRXZlbnRzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFRyYW5zaXRpb25FdmVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV4ZWN1dGlvbkVudmlyb25tZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOiBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L34vZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY2FsbF9zaG93X21ldGhvZCgkbm9kZSwgcHJvcHMpIHtcbiAgJG5vZGVbcHJvcHMuc2hvd01ldGhvZF0oe1xuICAgIGR1cmF0aW9uOiBwcm9wcy5zaG93RHVyYXRpb24sXG4gICAgZWFzaW5nOiBwcm9wcy5zaG93RWFzaW5nXG4gIH0pO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIiB9LFxuICAgICAgLy8gZWZmZWN0aXZlICQuaGlkZSgpXG4gICAgICBzaG93TWV0aG9kOiBcImZhZGVJblwiLCAvLyBzbGlkZURvd24sIGFuZCBzaG93IGFyZSBidWlsdCBpbnRvIGpRdWVyeVxuICAgICAgc2hvd0R1cmF0aW9uOiAzMDAsXG4gICAgICBzaG93RWFzaW5nOiBcInN3aW5nXCIsIC8vIGFuZCBsaW5lYXIgYXJlIGJ1aWx0IGludG8galF1ZXJ5XG4gICAgICBoaWRlTWV0aG9kOiBcImZhZGVPdXRcIixcbiAgICAgIGhpZGVEdXJhdGlvbjogMTAwMCxcbiAgICAgIGhpZGVFYXNpbmc6IFwic3dpbmdcIixcbiAgICAgIC8vXG4gICAgICB0aW1lT3V0OiA1MDAwLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwXG4gICAgfTtcbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVydmFsSWQ6IG51bGwsXG4gICAgICBpc0hpZGluZzogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY2FsbF9zaG93X21ldGhvZCh0aGlzLl9nZXRfJF9ub2RlKCksIHRoaXMucHJvcHMpO1xuICAgIGlmICh0aGlzLnByb3BzLnRpbWVPdXQgPiAwKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy50aW1lT3V0KSk7XG4gICAgfVxuICB9LFxuICBoYW5kbGVNb3VzZUVudGVyOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnN0YXRlLmludGVydmFsSWQpO1xuICAgIHRoaXMuX3NldF9pbnRlcnZhbF9pZChudWxsKTtcbiAgICB0aGlzLl9zZXRfaXNfaGlkaW5nKGZhbHNlKTtcblxuICAgIGNhbGxfc2hvd19tZXRob2QodGhpcy5fZ2V0XyRfbm9kZSgpLnN0b3AodHJ1ZSwgdHJ1ZSksIHRoaXMucHJvcHMpO1xuICB9LFxuICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0hpZGluZyAmJiAodGhpcy5wcm9wcy50aW1lT3V0ID4gMCB8fCB0aGlzLnByb3BzLmV4dGVuZGVkVGltZU91dCA+IDApKSB7XG4gICAgICB0aGlzLl9zZXRfaW50ZXJ2YWxfaWQoc2V0VGltZW91dCh0aGlzLmhpZGVUb2FzdCwgdGhpcy5wcm9wcy5leHRlbmRlZFRpbWVPdXQpKTtcbiAgICB9XG4gIH0sXG4gIGhpZGVUb2FzdDogZnVuY3Rpb24gaGlkZVRvYXN0KG92ZXJyaWRlKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNIaWRpbmcgfHwgdGhpcy5zdGF0ZS5pbnRlcnZhbElkID09PSBudWxsICYmICFvdmVycmlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgaXNIaWRpbmc6IHRydWUgfSk7XG5cbiAgICB0aGlzLl9nZXRfJF9ub2RlKClbdGhpcy5wcm9wcy5oaWRlTWV0aG9kXSh7XG4gICAgICBkdXJhdGlvbjogdGhpcy5wcm9wcy5oaWRlRHVyYXRpb24sXG4gICAgICBlYXNpbmc6IHRoaXMucHJvcHMuaGlkZUVhc2luZyxcbiAgICAgIGNvbXBsZXRlOiB0aGlzLl9oYW5kbGVfcmVtb3ZlXG4gICAgfSk7XG4gIH0sXG4gIF9nZXRfJF9ub2RlOiBmdW5jdGlvbiBfZ2V0XyRfbm9kZSgpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIHJldHVybiBqUXVlcnkoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXG4gIH0sXG4gIF9zZXRfaW50ZXJ2YWxfaWQ6IGZ1bmN0aW9uIF9zZXRfaW50ZXJ2YWxfaWQoaW50ZXJ2YWxJZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW50ZXJ2YWxJZDogaW50ZXJ2YWxJZFxuICAgIH0pO1xuICB9LFxuICBfc2V0X2lzX2hpZGluZzogZnVuY3Rpb24gX3NldF9pc19oaWRpbmcoaXNIaWRpbmcpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzSGlkaW5nOiBpc0hpZGluZ1xuICAgIH0pO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXRvYXN0ci9saWIvVG9hc3RNZXNzYWdlL2pRdWVyeU1peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUGFnZUJ1dHRvbiBmcm9tICcuL1BhZ2VCdXR0b24uanMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgUGFnaW5hdGlvbkxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNoYW5nZVBhZ2UocGFnZSkge1xuICAgIGlmIChwYWdlID09IHRoaXMucHJvcHMucHJlUGFnZSkge1xuICAgICAgcGFnZSA9IHRoaXMucHJvcHMuY3VyclBhZ2UgLSAxIDwgMSA/IDEgOiB0aGlzLnByb3BzLmN1cnJQYWdlIC0gMTtcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT0gdGhpcy5wcm9wcy5uZXh0UGFnZSkge1xuICAgICAgcGFnZSA9IHRoaXMucHJvcHMuY3VyclBhZ2UgKyAxID4gdGhpcy50b3RhbFBhZ2VzID8gdGhpcy50b3RhbFBhZ2VzIDogdGhpcy5wcm9wcy5jdXJyUGFnZSArIDE7XG4gICAgfSBlbHNlIGlmIChwYWdlID09IHRoaXMucHJvcHMubGFzdFBhZ2UpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG4gICAgfSBlbHNlIGlmIChwYWdlID09IHRoaXMucHJvcHMuZmlyc3RQYWdlKSB7XG4gICAgICBwYWdlID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnZSA9IHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cblxuICAgIGlmIChwYWdlICE9IHRoaXMucHJvcHMuY3VyclBhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMuY2hhbmdlUGFnZShwYWdlLCB0aGlzLnByb3BzLnNpemVQZXJQYWdlKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VTaXplUGVyUGFnZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3Qgc2VsZWN0U2l6ZSA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC50ZXh0KTtcbiAgICBsZXQgeyBjdXJyUGFnZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0U2l6ZSAhPSB0aGlzLnByb3BzLnNpemVQZXJQYWdlKSB7XG4gICAgICB0aGlzLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5wcm9wcy5kYXRhU2l6ZSAvIHNlbGVjdFNpemUpO1xuICAgICAgaWYgKGN1cnJQYWdlID4gdGhpcy50b3RhbFBhZ2VzKVxuICAgICAgICBjdXJyUGFnZSA9IHRoaXMudG90YWxQYWdlcztcblxuICAgICAgdGhpcy5wcm9wcy5jaGFuZ2VQYWdlKGN1cnJQYWdlLCBzZWxlY3RTaXplKTtcbiAgICAgIGlmKHRoaXMucHJvcHMub25TaXplUGVyUGFnZUxpc3Qpe1xuICAgICAgICB0aGlzLnByb3BzLm9uU2l6ZVBlclBhZ2VMaXN0KHNlbGVjdFNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5wcm9wcy5kYXRhU2l6ZSAvIHRoaXMucHJvcHMuc2l6ZVBlclBhZ2UpO1xuICAgIHZhciBwYWdlQnRucyA9IHRoaXMubWFrZVBhZ2UoKTtcbiAgICB2YXIgcGFnZUxpc3RTdHlsZSA9IHtcbiAgICAgIGZsb2F0OiBcInJpZ2h0XCIsXG4gICAgICBtYXJnaW5Ub3A6IFwiMHB4XCIgIC8vb3ZlcnJpZGUgdGhlIG1hcmdpbi10b3AgZGVmaW5lZCBpbiAucGFnaW5hdGlvbiBjbGFzcyBpbiBib290c3RyYXAuXG4gICAgfVxuXG4gICAgdmFyIHNpemVQZXJQYWdlTGlzdCA9IHRoaXMucHJvcHMuc2l6ZVBlclBhZ2VMaXN0Lm1hcCgoc2l6ZVBlclBhZ2UpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaSBrZXk9e3NpemVQZXJQYWdlfSByb2xlPVwicHJlc2VudGF0aW9uXCI+XG4gICAgICAgICAgPGEgcm9sZT1cIm1lbnVpdGVtXCIgdGFiSW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5jaGFuZ2VTaXplUGVyUGFnZS5iaW5kKHRoaXMpfT57c2l6ZVBlclBhZ2V9PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpblRvcDogMTUgfX0+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnNpemVQZXJQYWdlTGlzdC5sZW5ndGggPiAxXG4gICAgICAgICAgPyA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBpZD1cInBhZ2VEcm9wRG93blwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2l6ZVBlclBhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwicGFnZURyb3BEb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NpemVQZXJQYWdlTGlzdH1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwYWdpbmF0aW9uXCIgc3R5bGU9e3BhZ2VMaXN0U3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICB7cGFnZUJ0bnN9XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA6IDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwYWdpbmF0aW9uXCIgc3R5bGU9e3BhZ2VMaXN0U3R5bGV9PlxuICAgICAgICAgICAgICAgIHtwYWdlQnRuc31cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBtYWtlUGFnZSgpIHtcbiAgICB2YXIgcGFnZXMgPSB0aGlzLmdldFBhZ2VzKCk7XG4gICAgcmV0dXJuIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSkge1xuICAgICAgdmFyIGlzQWN0aXZlID0gcGFnZSA9PT0gdGhpcy5wcm9wcy5jdXJyUGFnZTtcbiAgICAgIHZhciBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgdmFyIGhpZGRlbiA9IGZhbHNlO1xuICAgICAgaWYodGhpcy5wcm9wcy5jdXJyUGFnZSA9PSAxICYmXG4gICAgICAgIChwYWdlID09PSB0aGlzLnByb3BzLmZpcnN0UGFnZSB8fCBwYWdlID09PSB0aGlzLnByb3BzLnByZVBhZ2UpKXtcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMucHJvcHMuY3VyclBhZ2UgPT0gdGhpcy50b3RhbFBhZ2VzICYmXG4gICAgICAgIChwYWdlID09PSB0aGlzLnByb3BzLm5leHRQYWdlIHx8IHBhZ2UgPT09IHRoaXMucHJvcHMubGFzdFBhZ2UpKXtcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQYWdlQnV0dG9uIGNoYW5nZVBhZ2U9e3RoaXMuY2hhbmdlUGFnZS5iaW5kKHRoaXMpfSBhY3RpdmU9e2lzQWN0aXZlfSBkaXNhYmxlPXtkaXNhYmxlZH0gaGlkZGVuPXtoaWRkZW59IGtleT17cGFnZX0+e3BhZ2V9PC9QYWdlQnV0dG9uPlxuICAgICAgKVxuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgZ2V0UGFnZXMoKSB7XG4gICAgdmFyIHN0YXJ0UGFnZSA9IDEsIGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG5cbiAgICBzdGFydFBhZ2UgPSBNYXRoLm1heCh0aGlzLnByb3BzLmN1cnJQYWdlIC0gTWF0aC5mbG9vcih0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplIC8gMiksIDEpO1xuICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLnByb3BzLnBhZ2luYXRpb25TaXplIC0gMTtcblxuICAgIGlmIChlbmRQYWdlID4gdGhpcy50b3RhbFBhZ2VzKSB7XG4gICAgICBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgICAgc3RhcnRQYWdlID0gZW5kUGFnZSAtIHRoaXMucHJvcHMucGFnaW5hdGlvblNpemUgKyAxO1xuICAgIH1cbiAgICB2YXIgcGFnZXM7XG4gICAgaWYoc3RhcnRQYWdlICE9IDEgJiYgdGhpcy50b3RhbFBhZ2VzID4gdGhpcy5wcm9wcy5wYWdpbmF0aW9uU2l6ZSkge1xuICAgICAgcGFnZXMgPSBbdGhpcy5wcm9wcy5maXJzdFBhZ2UsIHRoaXMucHJvcHMucHJlUGFnZV07XG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsUGFnZXMgPiAxKSB7XG4gICAgICBwYWdlcyA9IFt0aGlzLnByb3BzLnByZVBhZ2VdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhZ2VzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgIGlmIChpID4gMClwYWdlcy5wdXNoKGkpO1xuICAgIH1cbiAgICBpZiAoZW5kUGFnZSAhPSB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIHBhZ2VzLnB1c2godGhpcy5wcm9wcy5uZXh0UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubGFzdFBhZ2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFBhZ2VzID4gMSl7XG4gICAgICBwYWdlcy5wdXNoKHRoaXMucHJvcHMubmV4dFBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBnZXRDdXJyZW50UGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jdXJyUGFnZTtcbiAgfVxuXG4gIGdldFNpemVQZXJQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNpemVQZXJQYWdlO1xuICB9XG59XG5QYWdpbmF0aW9uTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGN1cnJQYWdlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICBzaXplUGVyUGFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgZGF0YVNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIGNoYW5nZVBhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBzaXplUGVyUGFnZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgcGFnaW5hdGlvblNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gIHJlbW90ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uU2l6ZVBlclBhZ2VMaXN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgcHJlUGFnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuUGFnaW5hdGlvbkxpc3QuZGVmYXVsdFByb3BzID0ge1xuICBzaXplUGVyUGFnZTogQ29uc3QuU0laRV9QRVJfUEFHRVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvbkxpc3Q7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdpbmF0aW9uL1BhZ2luYXRpb25MaXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgUGFnZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXG4gIHBhZ2VCdG5DbGljayhlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5jaGFuZ2VQYWdlKGUuY3VycmVudFRhcmdldC50ZXh0KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciBjbGFzc2VzID0gY2xhc3NTZXQoe1xuICAgICAgICAnYWN0aXZlJzogdGhpcy5wcm9wcy5hY3RpdmUsXG4gICAgICAgICdkaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZSxcbiAgICAgICAgJ2hpZGRlbic6IHRoaXMucHJvcHMuaGlkZGVuXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlc30+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLnBhZ2VCdG5DbGljay5iaW5kKHRoaXMpfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2E+PC9saT5cbiAgICApXG4gIH1cbn1cblBhZ2VCdXR0b24ucHJvcFR5cGVzID0ge1xuICBjaGFuZ2VQYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VCdXR0b247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdpbmF0aW9uL1BhZ2VCdXR0b24uanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzU2V0IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi4vRWRpdG9yJztcbmltcG9ydCBOb3RpZmllciBmcm9tICcuLi9Ob3RpZmljYXRpb24uanMnO1xuXG5jbGFzcyBUb29sQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMudGltZW91dGVDbGVhcj0wO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0luc2VydFJvd1RyaWdnZXI6IHRydWUsXG4gICAgICB2YWxpZGF0ZVN0YXRlOm51bGwsXG4gICAgICBzaGFrZUVkaXRvcjpmYWxzZSxcbiAgICAgIHNob3dTZWxlY3RlZDogZmFsc2VcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgfVxuICBjbGVhclRpbWVvdXQoKSB7XG4gICAgaWYodGhpcy50aW1lb3V0ZUNsZWFyKXtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRlQ2xlYXIpO1xuICAgICAgdGhpcy50aW1lb3V0ZUNsZWFyPTA7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tBbmRQYXJzZUZvcm0oKXtcbiAgICB2YXIgdHM9dGhpcyxuZXdPYmogPSB7fSxpc1ZhbGlkPXRydWUsdGVtcFZhbHVlLHRlbXBNc2csdmFsaWRhdGVTdGF0ZT17fTtcbiAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4sIGkpe1xuICAgICAgaWYoY29sdW1uLmF1dG9WYWx1ZSl7Ly93aGVuIHlvdSB3YW50IHNhbWUgYXV0byBnZW5lcmF0ZSB2YWx1ZSBhbmQgbm90IGFsbG93IGVkaXQsIGV4YW1wbGUgSUQgZmllbGRcbiAgICAgICAgdGVtcFZhbHVlPXR5cGVvZiBjb2x1bW4uYXV0b1ZhbHVlPT0nZnVuY3Rpb24nP2NvbHVtbi5hdXRvVmFsdWUoKTooJ2F1dG92YWx1ZS0nK25ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBsZXQgZG9tID0gdGhpcy5yZWZzW2NvbHVtbi5maWVsZCtpXTtcbiAgICAgICAgdGVtcFZhbHVlID0gZG9tLnZhbHVlO1xuXG4gICAgICAgIGlmKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdGFibGUudHlwZSA9PSAnY2hlY2tib3gnKXtcbiAgICAgICAgICBsZXQgdmFsdWVzID0gZG9tLnZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgdGVtcFZhbHVlID0gZG9tLmNoZWNrZWQ/IHZhbHVlc1swXTp2YWx1ZXNbMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjb2x1bW4uZWRpdGFibGUmJmNvbHVtbi5lZGl0YWJsZS52YWxpZGF0b3Ipey8vcHJvY2VzcyB2YWxpZGF0ZVxuICAgICAgICAgIHRlbXBNc2c9IGNvbHVtbi5lZGl0YWJsZS52YWxpZGF0b3IodGVtcFZhbHVlKVxuICAgICAgICAgIGlmKHRlbXBNc2chPT10cnVlKXtcbiAgICAgICAgICAgIGlzVmFsaWQ9ZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0ZVN0YXRlW2NvbHVtbi5maWVsZF09dGVtcE1zZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3T2JqW2NvbHVtbi5maWVsZF0gPXRlbXBWYWx1ZTtcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmKGlzVmFsaWQpe1xuICAgICAgcmV0dXJuIG5ld09iajtcbiAgICB9ZWxzZXtcbiAgICAgIHRzLmNsZWFyVGltZW91dCgpO1xuICAgICAgLy9zaG93IGVycm9yIGluIGZvcm0gYW5kIHNoYWtlIGl0XG4gICAgICB0aGlzLnNldFN0YXRlKHt2YWxpZGF0ZVN0YXRlOnZhbGlkYXRlU3RhdGUsc2hha2VFZGl0b3I6dHJ1ZX0pO1xuICAgICAgLy9ub3RpZmllciBlcnJvclxuICAgICAgdHMucmVmcy5ub3RpZmllci5ub3RpY2UoJ2Vycm9yJyxcIkZvcm0gdmFsaWRhdGUgZXJyb3JzLCBwbGVhc2UgY2hlY2tpbmchXCIsXCJQcmVzc2VkIEVTQyBjYW4gY2FuY2VsXCIpO1xuICAgICAgLy9jbGVhciBhbmltYXRlIGNsYXNzXG4gICAgICB0cy50aW1lb3V0ZUNsZWFyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6ZmFsc2V9KTt9LDMwMCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTYXZlQnRuQ2xpY2soZSl7XG4gICAgdmFyIG5ld09iaiA9IHRoaXMuY2hlY2tBbmRQYXJzZUZvcm0oKTtcbiAgICBpZighbmV3T2JqKXsvL3ZhbGlkYXRlIGVycm9yc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbXNnID0gdGhpcy5wcm9wcy5vbkFkZFJvdyhuZXdPYmopO1xuICAgIGlmKG1zZykge1xuICAgICAgdmFyIHRzPXRoaXM7XG4gICAgICB0cy5yZWZzLm5vdGlmaWVyLm5vdGljZSgnZXJyb3InLG1zZyxcIlByZXNzZWQgRVNDIGNhbiBjYW5jZWxcIik7XG4gICAgICB0cy5jbGVhclRpbWVvdXQoKTtcbiAgICAgIC8vc2hha2UgZm9ybSBhbmQgaGFjayBwcmV2ZW50IG1vZGFsIGhpZGVcbiAgICAgIHRzLnNldFN0YXRlKHtzaGFrZUVkaXRvcjp0cnVlLHZhbGlkYXRlU3RhdGU6XCJ0aGlzIGlzIGhhY2sgZm9yIHByZXZlbnQgYm9vdHN0cmFwIG1vZGFsIGhpZGVcIn0pO1xuICAgICAgLy9jbGVhciBhbmltYXRlIGNsYXNzXG4gICAgICB0cy50aW1lb3V0ZUNsZWFyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cy5zZXRTdGF0ZSh7c2hha2VFZGl0b3I6ZmFsc2V9KTt9LDMwMCk7XG4gICAgfSBlbHNle1xuICAgICAgLy9yZXNldCBzdGF0ZSBhbmQgaGlkZSBtb2RhbCBoaWRlXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsaWRhdGVTdGF0ZTpudWxsLFxuICAgICAgICBzaGFrZUVkaXRvcjpmYWxzZVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiK1wibW9kYWwtYmFja2Ryb3BcIikuY2xpY2soKTtcbiAgICAgIH0pO1xuICAgICAgLy9yZXNldCBmb3JtXG4gICAgICB0aGlzLnJlZnMuZm9ybS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNob3dPbmx5VG9nZ2xlID0gZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93U2VsZWN0ZWQ6ICF0aGlzLnN0YXRlLnNob3dTZWxlY3RlZFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25TaG93T25seVNlbGVjdGVkKCk7XG4gIH1cblxuICBoYW5kbGVEcm9wUm93QnRuQ2xpY2soZSl7XG4gICAgdGhpcy5wcm9wcy5vbkRyb3BSb3coKTtcbiAgfVxuXG4gIGhhbmRsZUNsb3NlQnRuKGUpe1xuICAgIHRoaXMucmVmcy53YXJuaW5nLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIGhhbmRsZUtleVVwKGUpe1xuICAgIHRoaXMucHJvcHMub25TZWFyY2goZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIGhhbmRsZUV4cG9ydENTVigpIHtcbiAgICB0aGlzLnByb3BzLm9uRXhwb3J0Q1NWKCk7XG4gIH1cblxuICBoYW5kbGVDbGVhckJ0bkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcy5zZWFjaElucHV0LnZhbHVlID0gJyc7XG4gICAgdGhpcy5wcm9wcy5vblNlYXJjaCgnJyk7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgbW9kYWxDbGFzc05hbWUgPSBcImJzLXRhYmxlLW1vZGFsLXNtXCIrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIGluc2VydEJ0biA9IHRoaXMucHJvcHMuZW5hYmxlSW5zZXJ0P1xuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25BZGRSb3dCZWdpbn0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIHJlYWN0LWJzLXRhYmxlLWFkZC1idG5cIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9eycuJyttb2RhbENsYXNzTmFtZX0+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIj48L2k+IE5ldzwvYnV0dG9uPjpudWxsO1xuXG4gICAgdmFyIGRlbGV0ZUJ0biA9IHRoaXMucHJvcHMuZW5hYmxlRGVsZXRlP1xuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZyByZWFjdC1icy10YWJsZS1kZWwtYnRuXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS1wbGFjZW1lbnQ9XCJyaWdodFwiIHRpdGxlPVwiRHJvcCBzZWxlY3RlZCByb3dcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVEcm9wUm93QnRuQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCI+PC9pPiBEZWxldGVcbiAgICAgICAgICA8L2J1dHRvbj46bnVsbDtcblxuICAgIHZhciBzZWFyY2hUZXh0SW5wdXQgPSB0aGlzLnJlbmRlclNlYXJjaFBhbmVsKCk7XG5cbiAgICB2YXIgc2hvd1NlbGVjdGVkT25seUJ0biA9IHRoaXMucHJvcHMuZW5hYmxlU2hvd09ubHlTZWxlY3RlZD9cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2hvd09ubHlUb2dnbGUuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9XCJidXR0b25cIiBhcmlhLXByZXNzZWQ9XCJmYWxzZVwiPlxuICAgICAgICB7IHRoaXMuc3RhdGUuc2hvd1NlbGVjdGVkPyBDb25zdC5TSE9XX0FMTCA6IENvbnN0LlNIT1dfT05MWV9TRUxFQ1QgfVxuICAgICAgPC9idXR0b24+Om51bGw7XG5cbiAgICB2YXIgbW9kYWwgPSB0aGlzLnByb3BzLmVuYWJsZUluc2VydD90aGlzLnJlbmRlckluc2VydFJvd01vZGFsKG1vZGFsQ2xhc3NOYW1lKTpudWxsO1xuICAgIHZhciB3YXJuaW5nU3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICAgIG1hcmdpbkJvdHRvbTogMFxuICAgIH07XG5cbiAgICB2YXIgZXhwb3J0Q1NWID0gdGhpcy5wcm9wcy5lbmFibGVFeHBvcnRDU1YgP1xuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2Vzc1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRXhwb3J0Q1NWLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4cG9ydFwiPjwvaT4gRXhwb3J0IHRvIENTVjwvYnV0dG9uPiA6IG51bGw7XG5cbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNiBjb2wtbGctOFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGJ0bi1ncm91cC1zbVwiIHJvbGU9XCJncm91cFwiPlxuICAgICAgICAgICAge2V4cG9ydENTVn1cbiAgICAgICAgICAgIHtpbnNlcnRCdG59XG4gICAgICAgICAgICB7ZGVsZXRlQnRufVxuICAgICAgICAgICAge3Nob3dTZWxlY3RlZE9ubHlCdG59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNiBjb2wtbGctNFwiPlxuICAgICAgICAgIHtzZWFyY2hUZXh0SW5wdXR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Tm90aWZpZXIgcmVmPVwibm90aWZpZXJcIj48L05vdGlmaWVyPlxuICAgICAgICB7bW9kYWx9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZW5kZXJTZWFyY2hQYW5lbCgpIHtcbiAgICBpZih0aGlzLnByb3BzLmVuYWJsZVNlYXJjaCkge1xuICAgICAgbGV0IGNsYXNzTmFtZXMgPSAnZm9ybS1ncm91cCBmb3JtLWdyb3VwLXNtJztcbiAgICAgIGxldCBjbGVhckJ0biA9IG51bGw7XG4gICAgICBpZih0aGlzLnByb3BzLmNsZWFyU2VhcmNoKSB7XG4gICAgICAgIGNsZWFyQnRuID0gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlQ2xlYXJCdG5DbGljayB9PkNsZWFyPC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgICAgICBjbGFzc05hbWVzID0gJ2Zvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbSBpbnB1dC1ncm91cCBpbnB1dC1ncm91cC1zbSc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cbiAgICAgICAgICA8aW5wdXQgcmVmPSdzZWFjaElucHV0JyBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2Vob2xkZXI/dGhpcy5wcm9wcy5zZWFyY2hQbGFjZWhvbGRlcjonU2VhcmNoJ31cbiAgICAgICAgICAgIG9uS2V5VXA9e3RoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgeyBjbGVhckJ0biB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVySW5zZXJ0Um93TW9kYWwobW9kYWxDbGFzc05hbWUpe1xuICAgIHZhciB2YWxpZGF0ZVN0YXRlPXRoaXMuc3RhdGUudmFsaWRhdGVTdGF0ZXx8e307XG4gICAgdmFyIGlucHV0RmllbGQgPSB0aGlzLnByb3BzLmNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbiwgaSl7XG4gICAgICB2YXIgZWRpdGFibGU9Y29sdW1uLmVkaXRhYmxlLFxuICAgICAgICAgIGZvcm1hdD1jb2x1bW4uZm9ybWF0LFxuICAgICAgICAgIGF0dHI9e3JlZjpjb2x1bW4uZmllbGQraSxwbGFjZWhvbGRlcjplZGl0YWJsZS5wbGFjZWhvbGRlcj9lZGl0YWJsZS5wbGFjZWhvbGRlcjpjb2x1bW4ubmFtZX07XG5cbiAgICAgIGlmKGNvbHVtbi5hdXRvVmFsdWUpey8vd2hlbiB5b3Ugd2FudCBzYW1lIGF1dG8gZ2VuZXJhdGUgdmFsdWUgYW5kIG5vdCBhbGxvdyBlZGl0LCBleGFtcGxlIElEIGZpZWxkXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdmFyIGVycm9yPXZhbGlkYXRlU3RhdGVbY29sdW1uLmZpZWxkXT8oPHNwYW4gY2xhc3NOYW1lPVwiaGVscC1ibG9jayBiZy1kYW5nZXJcIj57dmFsaWRhdGVTdGF0ZVtjb2x1bW4uZmllbGRdfTwvc3Bhbj4pOm51bGw7XG5cbiAgICAgIC8vIGxldCBlZGl0b3IgPSBFZGl0b3IoZWRpdGFibGUsYXR0cixmb3JtYXQpO1xuICAgICAgLy8gaWYoZWRpdG9yLnByb3BzLnR5cGUgJiYgZWRpdG9yLnByb3BzLnR5cGUgPT0gJ2NoZWNrYm94Jyl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiIGtleT17Y29sdW1uLmZpZWxkfT5cbiAgICAgICAgICA8bGFiZWw+e2NvbHVtbi5uYW1lfTwvbGFiZWw+XG4gICAgICAgICAge0VkaXRvcihlZGl0YWJsZSxhdHRyLGZvcm1hdCwnJyl9XG4gICAgICAgICAge2Vycm9yfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgdmFyIG1vZGFsQ2xhc3MgPSBjbGFzc1NldChcIm1vZGFsXCIsIFwiZmFkZVwiICwgbW9kYWxDbGFzc05hbWUse1xuICAgICAgJ2luJzp0aGlzLnN0YXRlLnNoYWtlRWRpdG9yfHx0aGlzLnN0YXRlLnZhbGlkYXRlU3RhdGUvL2hhY2sgcHJldmVudCBib290c3RyYXAgbW9kYWwgaGlkZSBieSByZVJlbmRlclxuICAgIH0pO1xuICAgIHZhciBkaWFsb2dDbGFzcz1jbGFzc1NldChcIm1vZGFsLWRpYWxvZ1wiLFwibW9kYWwtc21cIix7XG4gICAgICBcImFuaW1hdGVkXCI6dGhpcy5zdGF0ZS5zaGFrZUVkaXRvcixcbiAgICAgIFwic2hha2VcIjp0aGlzLnN0YXRlLnNoYWtlRWRpdG9yXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPVwibW9kYWxcIiAgY2xhc3NOYW1lPXttb2RhbENsYXNzfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RpYWxvZ0NsYXNzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5OZXcgUmVjb3JkPC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxmb3JtIHJlZj1cImZvcm1cIj5cbiAgICAgICAgICAgICAge2lucHV0RmllbGR9XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiAgb25DbGljaz17dGhpcy5oYW5kbGVTYXZlQnRuQ2xpY2suYmluZCh0aGlzKX0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5Ub29sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGRSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvbkRyb3BSb3c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblNob3dPbmx5U2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBlbmFibGVJbnNlcnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVEZWxldGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVTZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlbmFibGVTaG93T25seVNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICBzZWFyY2hQbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgY2xlYXJTZWFyY2g6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuXG5Ub29sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZW5hYmxlSW5zZXJ0OiBmYWxzZSxcbiAgZW5hYmxlRGVsZXRlOiBmYWxzZSxcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcbiAgZW5hYmxlU2hvd09ubHlTZWxlY3RlZDogZmFsc2UsXG4gIGNsZWFyU2VhcmNoOiBmYWxzZVxufVxuZXhwb3J0IGRlZmF1bHQgVG9vbEJhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3Rvb2xiYXIvVG9vbEJhci5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIFRhYmxlRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZmlsdGVyT2JqID0ge307XG4gIH1cblxuICBoYW5kbGVLZXlVcChlKXtcbiAgICBpZihlLmN1cnJlbnRUYXJnZXQudmFsdWUudHJpbSgpID09PSBcIlwiKVxuICAgICAgZGVsZXRlIHRoaXMuZmlsdGVyT2JqW2UuY3VycmVudFRhcmdldC5uYW1lXTtcbiAgICBlbHNlXG4gICAgICB0aGlzLmZpbHRlck9ialtlLmN1cnJlbnRUYXJnZXQubmFtZV0gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cbiAgICB0aGlzLnByb3BzLm9uRmlsdGVyKHRoaXMuZmlsdGVyT2JqKTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHZhciB0YWJsZUNsYXNzZXMgPSBjbGFzc1NldChcInRhYmxlXCIsIHtcbiAgICAgICd0YWJsZS1zdHJpcGVkJzogdGhpcy5wcm9wcy5zdHJpcGVkLFxuICAgICAgJ3RhYmxlLWNvbmRlbnNlZCc6IHRoaXMucHJvcHMuY29uZGVuc2VkXG4gICAgfSk7XG4gICAgdmFyIHNlbGVjdFJvd0hlYWRlciA9IG51bGw7XG5cbiAgICBpZih0aGlzLnByb3BzLnJvd1NlbGVjdFR5cGUgPT0gQ29uc3QuUk9XX1NFTEVDVF9TSU5HTEUgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5yb3dTZWxlY3RUeXBlID09IENvbnN0LlJPV19TRUxFQ1RfTVVMVEkpe1xuICAgICAgbGV0IHN0eWxlID0ge1xuICAgICAgICB3aWR0aDozNSxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IDAsXG4gICAgICAgIHBhZGRpbmdSaWdodDogMFxuICAgICAgfVxuICAgICAgc2VsZWN0Um93SGVhZGVyID0gKDx0aCBzdHlsZT17c3R5bGV9IGtleT17LTF9PkZpbHRlcjwvdGg+KTtcbiAgICB9XG4gICAgdmFyIGZpbHRlckZpZWxkID0gdGhpcy5wcm9wcy5jb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4pe1xuICAgICAgdmFyIHRoU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6IGNvbHVtbi5oaWRkZW4/XCJub25lXCI6bnVsbCxcbiAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aFxuICAgICAgfTtcbiAgICAgIHJldHVybihcbiAgICAgICAgPHRoIGtleT17Y29sdW1uLm5hbWV9IHN0eWxlPXt0aFN0eWxlfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoLWlubmVyIHRhYmxlLWhlYWRlci1jb2x1bW5cIj5cbiAgICAgICAgICAgIDxpbnB1dCBzaXplPVwiMTBcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPXtjb2x1bW4ubmFtZX0gbmFtZT17Y29sdW1uLm5hbWV9IG9uS2V5VXA9e3RoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RoPlxuICAgICAgKVxuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybihcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3Nlc30gc3R5bGU9e3ttYXJnaW5Ub3A6NX19PlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyIHN0eWxlPXt7Ym9yZGVyQm90dG9tU3R5bGU6ICdoaWRkZW4nfX0+XG4gICAgICAgICAgICB7c2VsZWN0Um93SGVhZGVyfXtmaWx0ZXJGaWVsZH1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgPC90YWJsZT5cbiAgICApXG4gIH1cbn1cblRhYmxlRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgY29sdW1uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICByb3dTZWxlY3RUeXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkZpbHRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn07XG5leHBvcnQgZGVmYXVsdCBUYWJsZUZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlRmlsdGVyLmpzXG4gKiovIiwiaW1wb3J0IENvbnN0IGZyb20gXCIuLi9Db25zdFwiO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZnVuY3Rpb24gX3NvcnQoYXJyLCBzb3J0RmllbGQsIG9yZGVyLCBzb3J0RnVuYykge1xuICBvcmRlciA9IG9yZGVyLnRvTG93ZXJDYXNlKCk7XG4gIGFyci5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKHNvcnRGdW5jKSB7XG4gICAgICByZXR1cm4gc29ydEZ1bmMoYSwgYiwgb3JkZXIsIHNvcnRGaWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcmRlciA9PSBDb25zdC5TT1JUX0RFU0MpIHtcbiAgICAgICAgcmV0dXJuIGFbc29ydEZpZWxkXSA+IGJbc29ydEZpZWxkXSA/IC0xIDogKChhW3NvcnRGaWVsZF0gPCBiW3NvcnRGaWVsZF0pID8gMSA6IDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFbc29ydEZpZWxkXSA8IGJbc29ydEZpZWxkXSA/IC0xIDogKChhW3NvcnRGaWVsZF0gPiBiW3NvcnRGaWVsZF0pID8gMSA6IDApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlRGF0YVNldCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBkYXRhKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlRGF0YVN0b3JlIHtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmNvbEluZm9zID0gbnVsbDtcbiAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IG51bGw7XG4gICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgdGhpcy5maWx0ZXJPYmogPSBudWxsO1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IG51bGw7XG4gICAgdGhpcy5zb3J0T2JqID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VPYmogPSB7fTtcbiAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgdGhpcy5tdWx0aUNvbHVtblNlYXJjaCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd09ubHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVtb3RlID0gZmFsc2U7IC8vIHJlbW90ZSBkYXRhXG4gIH1cblxuICBzZXRQcm9wcyhwcm9wcykge1xuICAgIHRoaXMua2V5RmllbGQgPSBwcm9wcy5rZXlGaWVsZDtcbiAgICB0aGlzLmVuYWJsZVBhZ2luYXRpb24gPSBwcm9wcy5pc1BhZ2luYXRpb247XG4gICAgdGhpcy5jb2xJbmZvcyA9IHByb3BzLmNvbEluZm9zO1xuICAgIHRoaXMucmVtb3RlID0gcHJvcHMucmVtb3RlO1xuICAgIHRoaXMubXVsdGlDb2x1bW5TZWFyY2ggPSBwcm9wcy5tdWx0aUNvbHVtblNlYXJjaDtcbiAgfVxuXG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuZmlsdGVyT2JqKSB0aGlzLmZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5zZWFyY2hUZXh0KSB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0T2JqKSB7XG4gICAgICB0aGlzLnNvcnQodGhpcy5zb3J0T2JqLm9yZGVyLCB0aGlzLnNvcnRPYmouc29ydEZpZWxkKTtcbiAgICB9XG4gIH1cblxuICBnZXRTb3J0SW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5zb3J0T2JqO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRSb3dLZXkoc2VsZWN0ZWRSb3dLZXlzKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkUm93S2V5cztcbiAgfVxuXG4gIGdldFNlbGVjdGVkUm93S2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIGdldEN1cnJlbnREaXNwbGF5RGF0YSgpIHtcbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSByZXR1cm4gdGhpcy5maWx0ZXJlZERhdGE7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbiAgaWdub3JlTm9uU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zaG93T25seVNlbGVjdGVkID0gIXRoaXMuc2hvd09ubHlTZWxlY3RlZDtcbiAgICBpZih0aGlzLnNob3dPbmx5U2VsZWN0ZWQpe1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggcm93ID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmluZCh4ID0+IHJvd1t0aGlzLmtleUZpZWxkXSA9PT0geClcbiAgICAgICAgcmV0dXJuIHR5cGVvZiByZXN1bHQgIT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNvcnQob3JkZXIsIHNvcnRGaWVsZCkge1xuICAgIHRoaXMuc29ydE9iaiA9IHtcbiAgICAgIG9yZGVyOiBvcmRlcixcbiAgICAgIHNvcnRGaWVsZDogc29ydEZpZWxkXG4gICAgfTtcblxuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGlmKCF0aGlzLmNvbEluZm9zW3NvcnRGaWVsZF0pIHJldHVybiB0aGlzO1xuXG4gICAgY29uc3QgeyBzb3J0RnVuYyB9ID0gdGhpcy5jb2xJbmZvc1tzb3J0RmllbGRdO1xuICAgIGN1cnJlbnREaXNwbGF5RGF0YSA9IF9zb3J0KGN1cnJlbnREaXNwbGF5RGF0YSwgc29ydEZpZWxkLCBvcmRlciwgc29ydEZ1bmMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwYWdlKHBhZ2UsIHNpemVQZXJQYWdlKSB7XG4gICAgdGhpcy5wYWdlT2JqLmVuZCA9IHBhZ2UgKiBzaXplUGVyUGFnZSAtIDE7XG4gICAgdGhpcy5wYWdlT2JqLnN0YXJ0ID0gdGhpcy5wYWdlT2JqLmVuZCAtIChzaXplUGVyUGFnZSAtIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZWRpdChuZXdWYWwsIHJvd0luZGV4LCBmaWVsZE5hbWUpIHtcbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBsZXQgcm93S2V5Q2FjaGU7XG4gICAgaWYgKCF0aGlzLmVuYWJsZVBhZ2luYXRpb24pIHtcbiAgICAgIGN1cnJlbnREaXNwbGF5RGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IG5ld1ZhbDtcbiAgICAgIHJvd0tleUNhY2hlID0gY3VycmVudERpc3BsYXlEYXRhW3Jvd0luZGV4XVt0aGlzLmtleUZpZWxkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudERpc3BsYXlEYXRhW3RoaXMucGFnZU9iai5zdGFydCArIHJvd0luZGV4XVtmaWVsZE5hbWVdID0gbmV3VmFsO1xuICAgICAgcm93S2V5Q2FjaGUgPSBjdXJyZW50RGlzcGxheURhdGFbdGhpcy5wYWdlT2JqLnN0YXJ0ICsgcm93SW5kZXhdW3RoaXMua2V5RmllbGRdO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc09uRmlsdGVyKSB7XG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIGlmIChyb3dbdGhpcy5rZXlGaWVsZF0gPT09IHJvd0tleUNhY2hlKSB7XG4gICAgICAgICAgcm93W2ZpZWxkTmFtZV0gPSBuZXdWYWw7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgICAgaWYgKG51bGwgIT09IHRoaXMuZmlsdGVyT2JqKSB0aGlzLmZpbHRlcih0aGlzLmZpbHRlck9iaik7XG4gICAgICBpZiAobnVsbCAhPT0gdGhpcy5zZWFyY2hUZXh0KSB0aGlzLnNlYXJjaCh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZEF0QmVnaW4obmV3T2JqKSB7XG4gICAgaWYgKCFuZXdPYmpbdGhpcy5rZXlGaWVsZF0gfHwgbmV3T2JqW3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09ICcnKSB7XG4gICAgICB0aHJvdyB0aGlzLmtleUZpZWxkICsgXCIgY2FuJ3QgYmUgZW1wdHkgdmFsdWUuXCI7XG4gICAgfVxuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGN1cnJlbnREaXNwbGF5RGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIGlmIChyb3dbdGhpcy5rZXlGaWVsZF0udG9TdHJpbmcoKSA9PT0gbmV3T2JqW3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5rZXlGaWVsZCArIFwiIFwiICsgbmV3T2JqW3RoaXMua2V5RmllbGRdICsgXCIgYWxyZWFkeSBleGlzdHNcIjtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICBjb25zb2xlLmxvZygnQEAnKTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEudW5zaGlmdChuZXdPYmopO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS51bnNoaWZ0KG5ld09iaik7XG4gICAgfVxuICB9XG5cbiAgYWRkKG5ld09iaikge1xuICAgIGlmICghbmV3T2JqW3RoaXMua2V5RmllbGRdIHx8IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpID09PSAnJykge1xuICAgICAgdGhyb3cgdGhpcy5rZXlGaWVsZCArIFwiIGNhbid0IGJlIGVtcHR5IHZhbHVlLlwiO1xuICAgIH1cbiAgICBsZXQgY3VycmVudERpc3BsYXlEYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICBjdXJyZW50RGlzcGxheURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICBpZiAocm93W3RoaXMua2V5RmllbGRdLnRvU3RyaW5nKCkgPT09IG5ld09ialt0aGlzLmtleUZpZWxkXS50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IHRoaXMua2V5RmllbGQgKyBcIiBcIiArIG5ld09ialt0aGlzLmtleUZpZWxkXSArIFwiIGFscmVhZHkgZXhpc3RzXCI7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBjdXJyZW50RGlzcGxheURhdGEucHVzaChuZXdPYmopO1xuICAgIGlmICh0aGlzLmlzT25GaWx0ZXIpIHtcbiAgICAgIHRoaXMuZGF0YS5wdXNoKG5ld09iaik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKHJvd0tleSkge1xuICAgIGxldCBjdXJyZW50RGlzcGxheURhdGEgPSB0aGlzLmdldEN1cnJlbnREaXNwbGF5RGF0YSgpO1xuICAgIGxldCByZXN1bHQgPSBjdXJyZW50RGlzcGxheURhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHJldHVybiByb3dLZXkuaW5kZXhPZihyb3dbdGhpcy5rZXlGaWVsZF0pID09IC0xO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuaXNPbkZpbHRlcikge1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiByb3dLZXkuaW5kZXhPZihyb3dbdGhpcy5rZXlGaWVsZF0pID09IC0xO1xuICAgICAgfSwgdGhpcyk7XG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlcihmaWx0ZXJPYmopIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZmlsdGVyT2JqKS5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmZpbHRlck9iaiA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyT2JqID0gZmlsdGVyT2JqO1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCByb3cgPT4ge1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICBsZXQgZmlsdGVyVmFsO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZmlsdGVyT2JqKSB7XG4gICAgICAgICAgbGV0IHRhcmdldFZhbCA9IHJvd1trZXldO1xuXG4gICAgICAgICAgc3dpdGNoIChmaWx0ZXJPYmpba2V5XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsdGVyVmFsID0gZmlsdGVyT2JqW2tleV0udmFsdWUubnVtYmVyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuQ1VTVE9NOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWx0ZXJWYWwgPSAodHlwZW9mIGZpbHRlck9ialtrZXldLnZhbHVlID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAgICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgICAgICAgKHR5cGVvZiBmaWx0ZXJPYmpba2V5XS52YWx1ZSA9PT0gXCJzdHJpbmdcIikgPyBmaWx0ZXJPYmpba2V5XS52YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmlsdGVyT2JqW2tleV0udmFsdWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICBmaWx0ZXJWYWwgPSAodHlwZW9mIGZpbHRlck9ialtrZXldLnZhbHVlID09PSBcInN0cmluZ1wiKSA/IGZpbHRlck9ialtrZXldLnZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmaWx0ZXJPYmpba2V5XS52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlclZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBvbGQgZmlsdGVyXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsID0gZmlsdGVyT2JqW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5jb2xJbmZvc1trZXldKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZvcm1hdCwgZmlsdGVyRm9ybWF0dGVkLCBmb3JtYXRFeHRyYURhdGEgfSA9IHRoaXMuY29sSW5mb3Nba2V5XTtcbiAgICAgICAgICAgIGlmKGZpbHRlckZvcm1hdHRlZCAmJiBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0VmFsID0gZm9ybWF0KHJvd1trZXldLCByb3csIGZvcm1hdEV4dHJhRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3dpdGNoIChmaWx0ZXJPYmpba2V5XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFsaWQgPSB0aGlzLmZpbHRlck51bWJlcih0YXJnZXRWYWwsIGZpbHRlclZhbCwgZmlsdGVyT2JqW2tleV0udmFsdWUuY29tcGFyYXRvcik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5EQVRFOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YWxpZCA9IHRoaXMuZmlsdGVyRGF0ZSh0YXJnZXRWYWwsIGZpbHRlclZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5DVVNUT006XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJDdXN0b20odGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGZpbHRlck9ialtrZXldLnZhbHVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgIHZhbGlkID0gdGhpcy5maWx0ZXJUZXh0KHRhcmdldFZhbCwgZmlsdGVyVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNPbkZpbHRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyTnVtYmVyKHRhcmdldFZhbCwgZmlsdGVyVmFsLCBjb21wYXJhdG9yKSB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGNvbXBhcmF0b3IpIHtcbiAgICAgIGNhc2UgXCI9XCI6XG4gICAgICB7XG4gICAgICAgIGlmICh0YXJnZXRWYWwgIT0gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI+XCI6XG4gICAgICB7XG4gICAgICAgIGlmICh0YXJnZXRWYWwgPD0gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI+PVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsIDwgZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICB7XG4gICAgICAgIGlmICh0YXJnZXRWYWwgPj0gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCI8PVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsID4gZmlsdGVyVmFsKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCIhPVwiOlxuICAgICAge1xuICAgICAgICBpZiAodGFyZ2V0VmFsID09IGZpbHRlclZhbCkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTnVtYmVyIGNvbXBhcmF0b3IgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIGZpbHRlckRhdGUodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpIHtcbiAgICByZXR1cm4gKHRhcmdldFZhbC5nZXREYXRlKCkgPT0gZmlsdGVyVmFsLmdldERhdGUoKSAmJlxuICAgICAgICB0YXJnZXRWYWwuZ2V0TW9udGgoKSA9PSBmaWx0ZXJWYWwuZ2V0TW9udGgoKSAmJlxuICAgICAgICB0YXJnZXRWYWwuZ2V0RnVsbFllYXIoKSA9PSBmaWx0ZXJWYWwuZ2V0RnVsbFllYXIoKSk7XG4gIH1cblxuICBmaWx0ZXJDdXN0b20odGFyZ2V0VmFsLCBmaWx0ZXJWYWwsIGNhbGxiYWNrSW5mbykge1xuICAgIGlmIChjYWxsYmFja0luZm8gIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2tJbmZvID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2tJbmZvLmNhbGxiYWNrKHRhcmdldFZhbCwgY2FsbGJhY2tJbmZvLmNhbGxiYWNrUGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlclRleHQodGFyZ2V0VmFsLCBmaWx0ZXJWYWwpO1xuICB9XG5cbiAgZmlsdGVyVGV4dCh0YXJnZXRWYWwsIGZpbHRlclZhbCkge1xuICAgIGlmICh0YXJnZXRWYWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsKSA9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyogR2VuZXJhbCBzZWFyY2ggZnVuY3Rpb25cbiAgICogSXQgd2lsbCBzZWFyY2ggZm9yIHRoZSB0ZXh0IGlmIHRoZSBpbnB1dCBpbmNsdWRlcyB0aGF0IHRleHQ7XG4gICAqIEl0IHdpbGwgc2VhcmNoIGZvciBleGFjdCBudW1iZXIgaWYgdGhlIGlucHV0IGlzIHRoYXQgbnVtYmVyXG4gICAqL1xuICBzZWFyY2goc2VhcmNoVGV4dCkge1xuICAgIGlmIChzZWFyY2hUZXh0LnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSBudWxsO1xuICAgICAgdGhpcy5pc09uRmlsdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLnNlYXJjaFRleHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0O1xuICAgICAgbGV0IHNlYXJjaFRleHRBcnJheSA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5tdWx0aUNvbHVtblNlYXJjaCkge1xuICAgICAgICBzZWFyY2hUZXh0QXJyYXkgPSBzZWFyY2hUZXh0LnNwbGl0KCcgJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hUZXh0QXJyYXkucHVzaChzZWFyY2hUZXh0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maWx0ZXJlZERhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCByb3cgPT4ge1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICAgIC8vIGZvciBsb29wcyBhcmUgdWdseSwgYnV0IHBlcmZvcm1hbmNlIG1hdHRlcnMgaGVyZS5cbiAgICAgICAgLy8gQW5kIHlvdSBjYW50IGJyZWFrIGZyb20gYSBmb3JFYWNoLlxuICAgICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9mb3ItdnMtZm9yZWFjaC82NlxuICAgICAgICBmb3IgKGxldCBpID0gMCwga2V5c0xlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwga2V5c0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAodGhpcy5jb2xJbmZvc1trZXldICYmIHJvd1trZXldKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZvcm1hdCwgZmlsdGVyRm9ybWF0dGVkLCBmb3JtYXRFeHRyYURhdGEsIHNlYXJjaGFibGUsIGhpZGRlbiB9ID0gdGhpcy5jb2xJbmZvc1trZXldO1xuICAgICAgICAgICAgbGV0IHRhcmdldFZhbCA9IHJvd1trZXldO1xuICAgICAgICAgICAgaWYgKCFoaWRkZW4gJiYgc2VhcmNoYWJsZSkge1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyRm9ybWF0dGVkICYmIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFZhbCA9IGZvcm1hdCh0YXJnZXRWYWwsIHJvdywgZm9ybWF0RXh0cmFEYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgdGV4dExlbmd0aCA9IHNlYXJjaFRleHRBcnJheS5sZW5ndGg7IGogPCB0ZXh0TGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJWYWwgPSBzZWFyY2hUZXh0QXJyYXlbal0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0VmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlzT25GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZ25vcmluZ1BhZ2luYXRpb24oKSB7XG4gICAgbGV0IF9kYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcbiAgICByZXR1cm4gX2RhdGE7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgbGV0IF9kYXRhID0gdGhpcy5nZXRDdXJyZW50RGlzcGxheURhdGEoKTtcblxuICAgIGlmIChfZGF0YS5sZW5ndGggPT0gMCkgcmV0dXJuIF9kYXRhO1xuXG4gICAgaWYgKHRoaXMucmVtb3RlIHx8ICF0aGlzLmVuYWJsZVBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiBfZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMucGFnZU9iai5zdGFydDsgaSA8PSB0aGlzLnBhZ2VPYmouZW5kOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goX2RhdGFbaV0pO1xuICAgICAgICBpZiAoaSArIDEgPT0gX2RhdGEubGVuZ3RoKWJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBnZXRLZXlGaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5rZXlGaWVsZDtcbiAgfVxuXG4gIGdldERhdGFOdW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudERpc3BsYXlEYXRhKCkubGVuZ3RoO1xuICB9XG5cbiAgaXNDaGFuZ2VkUGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlT2JqLnN0YXJ0ICYmIHRoaXMucGFnZU9iai5lbmQgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBnZXRBbGxSb3drZXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZnVuY3Rpb24gKHJvdykge1xuICAgICAgcmV0dXJuIHJvd1t0aGlzLmtleUZpZWxkXTtcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG59XG47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdG9yZS9UYWJsZURhdGFTdG9yZS5qc1xuICoqLyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9ldmVudHMvZXZlbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKXtcbiAgdmFyIGZpbGVzYXZlciA9IHJlcXVpcmUoJy4vZmlsZXNhdmVyJyk7XG4gIHZhciBzYXZlQXMgPSBmaWxlc2F2ZXIuc2F2ZUFzXG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGRhdGEsIGtleXMpIHtcbiAgdmFyIGRhdGFTdHJpbmcgPSBcIlwiO1xuICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHJldHVybiBkYXRhU3RyaW5nO1xuXG4gIGRhdGFTdHJpbmcgKz0ga2V5cy5qb2luKCcsJykgKyAnXFxuJ1xuXG4gIGRhdGEubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgIGtleXMubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xuICAgICAgbGV0IGNlbGwgPSB0eXBlb2Ygcm93W2NvbF0gIT09ICd1bmRlZmluZWQnID8gKCdcIicrcm93W2NvbF0rJ1wiJykgOiBcIlwiO1xuICAgICAgZGF0YVN0cmluZyArPSBjZWxsO1xuICAgICAgaWYgKGkrMSA8IGtleXMubGVuZ3RoKVxuICAgICAgICBkYXRhU3RyaW5nICs9ICcsJztcbiAgICB9KTtcblxuICAgIGRhdGFTdHJpbmcgKz0gJ1xcbic7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhU3RyaW5nO1xufTtcblxudmFyIGV4cG9ydENTViA9IGZ1bmN0aW9uKGRhdGEsIGtleXMsIGZpbGVuYW1lKSB7XG4gIHZhciBkYXRhU3RyaW5nID0gdG9TdHJpbmcoZGF0YSwga2V5cyk7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNhdmVBcyggbmV3IEJsb2IoW2RhdGFTdHJpbmddLCB7dHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLThcIn0pLCBmaWxlbmFtZSB8fCAnc3ByZWFkc2hlZXQuY3N2JyApO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydENTVjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Nzdl9leHBvcnRfdXRpbC5qc1xuICoqLyIsIi8qIEZpbGVTYXZlci5qc1xuICogQSBzYXZlQXMoKSBGaWxlU2F2ZXIgaW1wbGVtZW50YXRpb24uXG4gKiAxLjEuMjAxNTEwMDNcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBMaWNlbnNlOiBNSVRcbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxudmFyIHNhdmVBcyA9IHNhdmVBcyB8fCAoZnVuY3Rpb24odmlldykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0Ly8gSUUgPDEwIGlzIGV4cGxpY2l0bHkgdW5zdXBwb3J0ZWRcblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyXG5cdFx0ICBkb2MgPSB2aWV3LmRvY3VtZW50XG5cdFx0ICAvLyBvbmx5IGdldCBVUkwgd2hlbiBuZWNlc3NhcnkgaW4gY2FzZSBCbG9iLmpzIGhhc24ndCBvdmVycmlkZGVuIGl0IHlldFxuXHRcdCwgZ2V0X1VSTCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMIHx8IHZpZXc7XG5cdFx0fVxuXHRcdCwgc2F2ZV9saW5rID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJhXCIpXG5cdFx0LCBjYW5fdXNlX3NhdmVfbGluayA9IFwiZG93bmxvYWRcIiBpbiBzYXZlX2xpbmtcblx0XHQsIGNsaWNrID0gZnVuY3Rpb24obm9kZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKTtcblx0XHRcdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fVxuXHRcdCwgaXNfc2FmYXJpID0gL1ZlcnNpb25cXC9bXFxkXFwuXSsuKlNhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuXHRcdCwgd2Via2l0X3JlcV9mcyA9IHZpZXcud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW1cblx0XHQsIHJlcV9mcyA9IHZpZXcucmVxdWVzdEZpbGVTeXN0ZW0gfHwgd2Via2l0X3JlcV9mcyB8fCB2aWV3Lm1velJlcXVlc3RGaWxlU3lzdGVtXG5cdFx0LCB0aHJvd19vdXRzaWRlID0gZnVuY3Rpb24oZXgpIHtcblx0XHRcdCh2aWV3LnNldEltbWVkaWF0ZSB8fCB2aWV3LnNldFRpbWVvdXQpKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aHJvdyBleDtcblx0XHRcdH0sIDApO1xuXHRcdH1cblx0XHQsIGZvcmNlX3NhdmVhYmxlX3R5cGUgPSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiXG5cdFx0LCBmc19taW5fc2l6ZSA9IDBcblx0XHQvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM3NTI5NyNjNyBhbmRcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvY29tbWl0LzQ4NTkzMGEjY29tbWl0Y29tbWVudC04NzY4MDQ3XG5cdFx0Ly8gZm9yIHRoZSByZWFzb25pbmcgYmVoaW5kIHRoZSB0aW1lb3V0IGFuZCByZXZvY2F0aW9uIGZsb3dcblx0XHQsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCA9IDUwMCAvLyBpbiBtc1xuXHRcdCwgcmV2b2tlID0gZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0dmFyIHJldm9rZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiKSB7IC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxuXHRcdFx0XHRcdGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7XG5cdFx0XHRcdH0gZWxzZSB7IC8vIGZpbGUgaXMgYSBGaWxlXG5cdFx0XHRcdFx0ZmlsZS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGlmICh2aWV3LmNocm9tZSkge1xuXHRcdFx0XHRyZXZva2VyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXRUaW1lb3V0KHJldm9rZXIsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCwgZGlzcGF0Y2ggPSBmdW5jdGlvbihmaWxlc2F2ZXIsIGV2ZW50X3R5cGVzLCBldmVudCkge1xuXHRcdFx0ZXZlbnRfdHlwZXMgPSBbXS5jb25jYXQoZXZlbnRfdHlwZXMpO1xuXHRcdFx0dmFyIGkgPSBldmVudF90eXBlcy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRcdHZhciBsaXN0ZW5lciA9IGZpbGVzYXZlcltcIm9uXCIgKyBldmVudF90eXBlc1tpXV07XG5cdFx0XHRcdGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRsaXN0ZW5lci5jYWxsKGZpbGVzYXZlciwgZXZlbnQgfHwgZmlsZXNhdmVyKTtcblx0XHRcdFx0XHR9IGNhdGNoIChleCkge1xuXHRcdFx0XHRcdFx0dGhyb3dfb3V0c2lkZShleCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCwgYXV0b19ib20gPSBmdW5jdGlvbihibG9iKSB7XG5cdFx0XHQvLyBwcmVwZW5kIEJPTSBmb3IgVVRGLTggWE1MIGFuZCB0ZXh0LyogdHlwZXMgKGluY2x1ZGluZyBIVE1MKVxuXHRcdFx0aWYgKC9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGJsb2IudHlwZSkpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBCbG9iKFtcIlxcdWZlZmZcIiwgYmxvYl0sIHt0eXBlOiBibG9iLnR5cGV9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBibG9iO1xuXHRcdH1cblx0XHQsIEZpbGVTYXZlciA9IGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRpZiAoIW5vX2F1dG9fYm9tKSB7XG5cdFx0XHRcdGJsb2IgPSBhdXRvX2JvbShibG9iKTtcblx0XHRcdH1cblx0XHRcdC8vIEZpcnN0IHRyeSBhLmRvd25sb2FkLCB0aGVuIHdlYiBmaWxlc3lzdGVtLCB0aGVuIG9iamVjdCBVUkxzXG5cdFx0XHR2YXJcblx0XHRcdFx0ICBmaWxlc2F2ZXIgPSB0aGlzXG5cdFx0XHRcdCwgdHlwZSA9IGJsb2IudHlwZVxuXHRcdFx0XHQsIGJsb2JfY2hhbmdlZCA9IGZhbHNlXG5cdFx0XHRcdCwgb2JqZWN0X3VybFxuXHRcdFx0XHQsIHRhcmdldF92aWV3XG5cdFx0XHRcdCwgZGlzcGF0Y2hfYWxsID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZGlzcGF0Y2goZmlsZXNhdmVyLCBcIndyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgd3JpdGVlbmRcIi5zcGxpdChcIiBcIikpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIG9uIGFueSBmaWxlc3lzIGVycm9ycyByZXZlcnQgdG8gc2F2aW5nIHdpdGggb2JqZWN0IFVSTHNcblx0XHRcdFx0LCBmc19lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICh0YXJnZXRfdmlldyAmJiBpc19zYWZhcmkgJiYgdHlwZW9mIEZpbGVSZWFkZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdC8vIFNhZmFyaSBkb2Vzbid0IGFsbG93IGRvd25sb2FkaW5nIG9mIGJsb2IgdXJsc1xuXHRcdFx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHRyZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBiYXNlNjREYXRhID0gcmVhZGVyLnJlc3VsdDtcblx0XHRcdFx0XHRcdFx0dGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IFwiZGF0YTphdHRhY2htZW50L2ZpbGVcIiArIGJhc2U2NERhdGEuc2xpY2UoYmFzZTY0RGF0YS5zZWFyY2goL1ssO10vKSk7XG5cdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdGRpc3BhdGNoX2FsbCgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuXHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZG9uJ3QgY3JlYXRlIG1vcmUgb2JqZWN0IFVSTHMgdGhhbiBuZWVkZWRcblx0XHRcdFx0XHRpZiAoYmxvYl9jaGFuZ2VkIHx8ICFvYmplY3RfdXJsKSB7XG5cdFx0XHRcdFx0XHRvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRhcmdldF92aWV3KSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dmFyIG5ld190YWIgPSB2aWV3Lm9wZW4ob2JqZWN0X3VybCwgXCJfYmxhbmtcIik7XG5cdFx0XHRcdFx0XHRpZiAobmV3X3RhYiA9PSB1bmRlZmluZWQgJiYgaXNfc2FmYXJpKSB7XG5cdFx0XHRcdFx0XHRcdC8vQXBwbGUgZG8gbm90IGFsbG93IHdpbmRvdy5vcGVuLCBzZWUgaHR0cDovL2JpdC5seS8xa1pmZlJJXG5cdFx0XHRcdFx0XHRcdHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0XHRkaXNwYXRjaF9hbGwoKTtcblx0XHRcdFx0XHRyZXZva2Uob2JqZWN0X3VybCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LCBhYm9ydGFibGUgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGVzYXZlci5yZWFkeVN0YXRlICE9PSBmaWxlc2F2ZXIuRE9ORSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0LCBjcmVhdGVfaWZfbm90X2ZvdW5kID0ge2NyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZX1cblx0XHRcdFx0LCBzbGljZVxuXHRcdFx0O1xuXHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcblx0XHRcdGlmICghbmFtZSkge1xuXHRcdFx0XHRuYW1lID0gXCJkb3dubG9hZFwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNhbl91c2Vfc2F2ZV9saW5rKSB7XG5cdFx0XHRcdG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRcdFx0XHRzYXZlX2xpbmsuaHJlZiA9IG9iamVjdF91cmw7XG5cdFx0XHRcdHNhdmVfbGluay5kb3dubG9hZCA9IG5hbWU7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y2xpY2soc2F2ZV9saW5rKTtcblx0XHRcdFx0XHRkaXNwYXRjaF9hbGwoKTtcblx0XHRcdFx0XHRyZXZva2Uob2JqZWN0X3VybCk7XG5cdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIE9iamVjdCBhbmQgd2ViIGZpbGVzeXN0ZW0gVVJMcyBoYXZlIGEgcHJvYmxlbSBzYXZpbmcgaW4gR29vZ2xlIENocm9tZSB3aGVuXG5cdFx0XHQvLyB2aWV3ZWQgaW4gYSB0YWIsIHNvIEkgZm9yY2Ugc2F2ZSB3aXRoIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxuXHRcdFx0Ly8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTExNThcblx0XHRcdC8vIFVwZGF0ZTogR29vZ2xlIGVycmFudGx5IGNsb3NlZCA5MTE1OCwgSSBzdWJtaXR0ZWQgaXQgYWdhaW46XG5cdFx0XHQvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzg5NjQyXG5cdFx0XHRpZiAodmlldy5jaHJvbWUgJiYgdHlwZSAmJiB0eXBlICE9PSBmb3JjZV9zYXZlYWJsZV90eXBlKSB7XG5cdFx0XHRcdHNsaWNlID0gYmxvYi5zbGljZSB8fCBibG9iLndlYmtpdFNsaWNlO1xuXHRcdFx0XHRibG9iID0gc2xpY2UuY2FsbChibG9iLCAwLCBibG9iLnNpemUsIGZvcmNlX3NhdmVhYmxlX3R5cGUpO1xuXHRcdFx0XHRibG9iX2NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Ly8gU2luY2UgSSBjYW4ndCBiZSBzdXJlIHRoYXQgdGhlIGd1ZXNzZWQgbWVkaWEgdHlwZSB3aWxsIHRyaWdnZXIgYSBkb3dubG9hZFxuXHRcdFx0Ly8gaW4gV2ViS2l0LCBJIGFwcGVuZCAuZG93bmxvYWQgdG8gdGhlIGZpbGVuYW1lLlxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTY1NDQwXG5cdFx0XHRpZiAod2Via2l0X3JlcV9mcyAmJiBuYW1lICE9PSBcImRvd25sb2FkXCIpIHtcblx0XHRcdFx0bmFtZSArPSBcIi5kb3dubG9hZFwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGUgPT09IGZvcmNlX3NhdmVhYmxlX3R5cGUgfHwgd2Via2l0X3JlcV9mcykge1xuXHRcdFx0XHR0YXJnZXRfdmlldyA9IHZpZXc7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXJlcV9mcykge1xuXHRcdFx0XHRmc19lcnJvcigpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRmc19taW5fc2l6ZSArPSBibG9iLnNpemU7XG5cdFx0XHRyZXFfZnModmlldy5URU1QT1JBUlksIGZzX21pbl9zaXplLCBhYm9ydGFibGUoZnVuY3Rpb24oZnMpIHtcblx0XHRcdFx0ZnMucm9vdC5nZXREaXJlY3RvcnkoXCJzYXZlZFwiLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24oZGlyKSB7XG5cdFx0XHRcdFx0dmFyIHNhdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGRpci5nZXRGaWxlKG5hbWUsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUuY3JlYXRlV3JpdGVyKGFib3J0YWJsZShmdW5jdGlvbih3cml0ZXIpIHtcblx0XHRcdFx0XHRcdFx0XHR3cml0ZXIub253cml0ZWVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gZmlsZS50b1VSTCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKGZpbGVzYXZlciwgXCJ3cml0ZWVuZFwiLCBldmVudCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXZva2UoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHR3cml0ZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gd3JpdGVyLmVycm9yO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVycm9yLmNvZGUgIT09IGVycm9yLkFCT1JUX0VSUikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRmc19lcnJvcigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XCJ3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIGFib3J0XCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdyaXRlcltcIm9uXCIgKyBldmVudF0gPSBmaWxlc2F2ZXJbXCJvblwiICsgZXZlbnRdO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdHdyaXRlci53cml0ZShibG9iKTtcblx0XHRcdFx0XHRcdFx0XHRmaWxlc2F2ZXIuYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdyaXRlci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLldSSVRJTkc7XG5cdFx0XHRcdFx0XHRcdH0pLCBmc19lcnJvcik7XG5cdFx0XHRcdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0ZGlyLmdldEZpbGUobmFtZSwge2NyZWF0ZTogZmFsc2V9LCBhYm9ydGFibGUoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0Ly8gZGVsZXRlIGZpbGUgaWYgaXQgYWxyZWFkeSBleGlzdHNcblx0XHRcdFx0XHRcdGZpbGUucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRzYXZlKCk7XG5cdFx0XHRcdFx0fSksIGFib3J0YWJsZShmdW5jdGlvbihleCkge1xuXHRcdFx0XHRcdFx0aWYgKGV4LmNvZGUgPT09IGV4Lk5PVF9GT1VORF9FUlIpIHtcblx0XHRcdFx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZnNfZXJyb3IoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdH0pLCBmc19lcnJvcik7XG5cdFx0XHR9KSwgZnNfZXJyb3IpO1xuXHRcdH1cblx0XHQsIEZTX3Byb3RvID0gRmlsZVNhdmVyLnByb3RvdHlwZVxuXHRcdCwgc2F2ZUFzID0gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdHJldHVybiBuZXcgRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKTtcblx0XHR9XG5cdDtcblx0Ly8gSUUgMTArIChuYXRpdmUgc2F2ZUFzKVxuXHRpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xuXHRcdHJldHVybiBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0aWYgKCFub19hdXRvX2JvbSkge1xuXHRcdFx0XHRibG9iID0gYXV0b19ib20oYmxvYik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgbmFtZSB8fCBcImRvd25sb2FkXCIpO1xuXHRcdH07XG5cdH1cblxuXHRGU19wcm90by5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBmaWxlc2F2ZXIgPSB0aGlzO1xuXHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0ZGlzcGF0Y2goZmlsZXNhdmVyLCBcImFib3J0XCIpO1xuXHR9O1xuXHRGU19wcm90by5yZWFkeVN0YXRlID0gRlNfcHJvdG8uSU5JVCA9IDA7XG5cdEZTX3Byb3RvLldSSVRJTkcgPSAxO1xuXHRGU19wcm90by5ET05FID0gMjtcblxuXHRGU19wcm90by5lcnJvciA9XG5cdEZTX3Byb3RvLm9ud3JpdGVzdGFydCA9XG5cdEZTX3Byb3RvLm9ucHJvZ3Jlc3MgPVxuXHRGU19wcm90by5vbndyaXRlID1cblx0RlNfcHJvdG8ub25hYm9ydCA9XG5cdEZTX3Byb3RvLm9uZXJyb3IgPVxuXHRGU19wcm90by5vbndyaXRlZW5kID1cblx0XHRudWxsO1xuXG5cdHJldHVybiBzYXZlQXM7XG59KFxuXHQgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmXG5cdHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93XG5cdHx8IHRoaXMuY29udGVudFxuKSk7XG4vLyBgc2VsZmAgaXMgdW5kZWZpbmVkIGluIEZpcmVmb3ggZm9yIEFuZHJvaWQgY29udGVudCBzY3JpcHQgY29udGV4dFxuLy8gd2hpbGUgYHRoaXNgIGlzIG5zSUNvbnRlbnRGcmFtZU1lc3NhZ2VNYW5hZ2VyXG4vLyB3aXRoIGFuIGF0dHJpYnV0ZSBgY29udGVudGAgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgd2luZG93XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzLnNhdmVBcyA9IHNhdmVBcztcbn0gZWxzZSBpZiAoKHR5cGVvZiBkZWZpbmUgIT09IFwidW5kZWZpbmVkXCIgJiYgZGVmaW5lICE9PSBudWxsKSAmJiAoZGVmaW5lLmFtZCAhPSBudWxsKSkge1xuICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzYXZlQXM7XG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmlsZXNhdmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0XCIpOyB9O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIHN1cGVyKGRhdGEpO1xuICAgICAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSB7fTtcbiAgICB9XG5cbiAgICBoYW5kbGVGaWx0ZXIoZGF0YUZpZWxkLCB2YWx1ZSwgdHlwZSkge1xuICAgICAgICBjb25zdCBmaWx0ZXJUeXBlID0gdHlwZSB8fCBDb25zdC5GSUxURVJfVFlQRS5DVVNUT007XG5cbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gdmFsdWUgb2YgdGhlIGZpbHRlciBpcyBhbiBvYmplY3RcbiAgICAgICAgICAgIGxldCBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZVtwcm9wXSB8fCB2YWx1ZVtwcm9wXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG9iamVjdCBwcm9wZXJ0aWVzIGlzIHVuZGVmaW5lZCBvciBlbXB0eSwgd2UgcmVtb3ZlIHRoZSBmaWx0ZXJcbiAgICAgICAgICAgIChoYXNWYWx1ZSkgPyB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXSA9IHt2YWx1ZTogdmFsdWUsIHR5cGU6IGZpbHRlclR5cGV9IDogZGVsZXRlIHRoaXMuY3VycmVudEZpbHRlcltkYXRhRmllbGRdO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSB8fCB2YWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnRGaWx0ZXJbZGF0YUZpZWxkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZpbHRlcltkYXRhRmllbGRdID0ge3ZhbHVlOiB2YWx1ZS50cmltKCksIHR5cGU6IGZpbHRlclR5cGV9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgnb25GaWx0ZXJDaGFuZ2UnLCB0aGlzLmN1cnJlbnRGaWx0ZXIpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0ZpbHRlci5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9Db25zdCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IERhdGVGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL0RhdGUnO1xuaW1wb3J0IFRleHRGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL1RleHQnO1xuaW1wb3J0IFNlbGVjdEZpbHRlciBmcm9tICcuL2ZpbHRlcnMvU2VsZWN0JztcbmltcG9ydCBOdW1iZXJGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL051bWJlcic7XG5cbmNsYXNzIFRhYmxlSGVhZGVyQ29sdW1uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlRmlsdGVyID0gdGhpcy5oYW5kbGVGaWx0ZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNvbHVtbkNsaWNrKGUpe1xuICAgIGlmKCF0aGlzLnByb3BzLmRhdGFTb3J0KXJldHVybjtcbiAgICBsZXQgb3JkZXIgPSB0aGlzLnByb3BzLnNvcnQgPT0gQ29uc3QuU09SVF9ERVNDP0NvbnN0LlNPUlRfQVNDOkNvbnN0LlNPUlRfREVTQztcbiAgICB0aGlzLnByb3BzLm9uU29ydChvcmRlciwgdGhpcy5wcm9wcy5kYXRhRmllbGQpO1xuICB9XG5cbiAgaGFuZGxlRmlsdGVyKHZhbHVlLCB0eXBlKSB7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXIuZW1pdHRlci5oYW5kbGVGaWx0ZXIodGhpcy5wcm9wcy5kYXRhRmllbGQsIHZhbHVlLCB0eXBlKTtcbiAgfVxuXG4gIGdldEZpbHRlcnMoKSB7XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmZpbHRlci50eXBlKSB7XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQ6IHtcbiAgICAgICAgcmV0dXJuIDxUZXh0RmlsdGVyIHsuLi50aGlzLnByb3BzLmZpbHRlcn0gY29sdW1uTmFtZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gZmlsdGVySGFuZGxlcj17dGhpcy5oYW5kbGVGaWx0ZXJ9IC8+O1xuICAgICAgfVxuICAgICAgY2FzZSBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1Q6IHtcbiAgICAgICAgcmV0dXJuIDxTZWxlY3RGaWx0ZXIgey4uLnRoaXMucHJvcHMuZmlsdGVyfSBjb2x1bW5OYW1lPXt0aGlzLnByb3BzLmNoaWxkcmVufSBmaWx0ZXJIYW5kbGVyPXt0aGlzLmhhbmRsZUZpbHRlcn0gLz47XG4gICAgICB9XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUjoge1xuICAgICAgICByZXR1cm4gPE51bWJlckZpbHRlciB7Li4udGhpcy5wcm9wcy5maWx0ZXJ9IGNvbHVtbk5hbWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IGZpbHRlckhhbmRsZXI9e3RoaXMuaGFuZGxlRmlsdGVyfSAvPjtcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uc3QuRklMVEVSX1RZUEUuREFURToge1xuICAgICAgICByZXR1cm4gPERhdGVGaWx0ZXIgey4uLnRoaXMucHJvcHMuZmlsdGVyfSBjb2x1bW5OYW1lPXt0aGlzLnByb3BzLmNoaWxkcmVufSBmaWx0ZXJIYW5kbGVyPXt0aGlzLmhhbmRsZUZpbHRlcn0gLz47XG4gICAgICB9XG4gICAgICBjYXNlIENvbnN0LkZJTFRFUl9UWVBFLkNVU1RPTToge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5maWx0ZXIuZ2V0RWxlbWVudCh0aGlzLmhhbmRsZUZpbHRlciwgdGhpcy5wcm9wcy5maWx0ZXIuY3VzdG9tRmlsdGVyUGFyYW1ldGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICB0aGlzLnJlZnMuaW5uZXJEaXYuc2V0QXR0cmlidXRlKFwiZGF0YS1maWVsZFwiLCB0aGlzLnByb3BzLmRhdGFGaWVsZCk7XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICB2YXIgd2lkdGggPSB0aGlzLnByb3BzLndpZHRoIT09bnVsbD9wYXJzZUludCh0aGlzLnByb3BzLndpZHRoKTpudWxsO1xuICAgIHZhciB0aFN0eWxlID0ge1xuICAgICAgdGV4dEFsaWduOiB0aGlzLnByb3BzLmRhdGFBbGlnbixcbiAgICAgIGRpc3BsYXk6IHRoaXMucHJvcHMuaGlkZGVuP1wibm9uZVwiOm51bGwsXG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBtYXhXaWR0aDogd2lkdGhcbiAgICB9O1xuXG4gICAgY29uc3QgZGVmYXVsdENhcmV0ID0gKCF0aGlzLnByb3BzLmRhdGFTb3J0KSA/IG51bGwgOiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJvcmRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkcm9wZG93blwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCIgc3R5bGU9e3ttYXJnaW46ICcxMHB4IDAgMTBweCA1cHgnLCBjb2xvcjogJyNjY2MnfX0+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3B1cFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCIgc3R5bGU9e3ttYXJnaW46ICcxMHB4IDAnLCBjb2xvcjogJyNjY2MnfX0+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgICBjb25zdCBzb3J0Q2FyZXQgPSB0aGlzLnByb3BzLnNvcnQgPyBVdGlsLnJlbmRlclJlYWN0U29ydENhcmV0KHRoaXMucHJvcHMuc29ydCkgOiBkZWZhdWx0Q2FyZXQ7XG5cbiAgICB2YXIgY2xhc3NlcyA9IHRoaXMucHJvcHMuY2xhc3NOYW1lK1wiIFwiKyh0aGlzLnByb3BzLmRhdGFTb3J0P1wic29ydC1jb2x1bW5cIjpcIlwiKTtcbiAgICByZXR1cm4oXG4gICAgICA8dGggcmVmPSdoZWFkZXItY29sJyBjbGFzc05hbWU9e2NsYXNzZXN9IHN0eWxlPXt0aFN0eWxlfT5cbiAgICAgICAgPGRpdiByZWY9XCJpbm5lckRpdlwiIGNsYXNzTmFtZT1cInRoLWlubmVyIHRhYmxlLWhlYWRlci1jb2x1bW5cIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ29sdW1uQ2xpY2suYmluZCh0aGlzKX0+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59e3NvcnRDYXJldH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLnByb3BzLmZpbHRlciA/IHRoaXMuZ2V0RmlsdGVycygpIDogbnVsbH1cbiAgICAgIDwvdGg+XG4gICAgKVxuICB9XG59XG5cbnZhciBmaWx0ZXJUeXBlQXJyYXkgPSBbXTtcbmZvciAobGV0IGtleSBpbiBDb25zdC5GSUxURVJfVFlQRSkge1xuICBmaWx0ZXJUeXBlQXJyYXkucHVzaChDb25zdC5GSUxURVJfVFlQRVtrZXldKTtcbn1cblxuVGFibGVIZWFkZXJDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBkYXRhRmllbGQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGFBbGlnbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YVNvcnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvblNvcnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBkYXRhRm9ybWF0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgaXNLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBlZGl0YWJsZTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgaGlkZGVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgc2VhcmNoYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGNsYXNzTmFtZTpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgc29ydEZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBjb2x1bW5DbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIGZpbHRlckZvcm1hdHRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNvcnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGZvcm1hdEV4dHJhRGF0YTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgZmlsdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihmaWx0ZXJUeXBlQXJyYXkpLFxuICAgIGRlbGF5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgLy8gZm9yIFNlbGVjdEZpbHRlclxuICAgICAgUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlcikgLy9mb3IgTnVtYmVyRmlsdGVyXG4gICAgICAgIF0pLFxuICAgIG51bWJlckNvbXBhcmF0b3JzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBlbWl0dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGdldEVsZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIGN1c3RvbUZpbHRlclBhcmFtZXRlcnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcbiAgfSlcbn07XG5cblRhYmxlSGVhZGVyQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGF0YUFsaWduOiBcImxlZnRcIixcbiAgZGF0YVNvcnQ6IGZhbHNlLFxuICBkYXRhRm9ybWF0OiB1bmRlZmluZWQsXG4gIGlzS2V5OiBmYWxzZSxcbiAgZWRpdGFibGU6IHRydWUsXG4gIG9uU29ydDogdW5kZWZpbmVkLFxuICBoaWRkZW46IGZhbHNlLFxuICBzZWFyY2hhYmxlOiB0cnVlLFxuICBjbGFzc05hbWU6IFwiXCIsXG4gIHdpZHRoOiBudWxsLFxuICBzb3J0RnVuYzogdW5kZWZpbmVkLFxuICBjb2x1bW5DbGFzc05hbWU6ICcnLFxuICBmaWx0ZXJGb3JtYXR0ZWQ6IGZhbHNlLFxuICBzb3J0OiB1bmRlZmluZWQsXG4gIGZvcm1hdEV4dHJhRGF0YTogdW5kZWZpbmVkLFxuICBmaWx0ZXI6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFibGVIZWFkZXJDb2x1bW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYWJsZUhlYWRlckNvbHVtbi5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vQ29uc3QnO1xuXG5jbGFzcyBEYXRlRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0RGF0ZSgpIHtcbiAgICAgICAgbGV0IGRlZmF1bHREYXRlICA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBhcHByb3ByaWF0ZSBmb3JtYXQgZm9yIHRoZSBpbnB1dCB0eXBlPWRhdGUsIGkuZS4gXCJZWVlZLU1NLUREXCJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG5ldyBEYXRlKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIGRlZmF1bHREYXRlID0gYCR7ZGVmYXVsdFZhbHVlLmdldEZ1bGxZZWFyKCl9LSR7KFwiMFwiICsgKGRlZmF1bHRWYWx1ZS5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKX0tJHsoXCIwXCIgKyBkZWZhdWx0VmFsdWUuZ2V0RGF0ZSgpKS5zbGljZSgtMil9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGU7XG4gICAgfVxuXG4gICAgZmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKGRhdGVWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG5ldyBEYXRlKGRhdGVWYWx1ZSksIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKG51bGwsIENvbnN0LkZJTFRFUl9UWVBFLkRBVEUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IHRoaXMucmVmcy5pbnB1dERhdGUuZGVmYXVsdFZhbHVlO1xuICAgICAgICBpZiAoZGF0ZVZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIobmV3IERhdGUoZGF0ZVZhbHVlKSwgQ29uc3QuRklMVEVSX1RZUEUuREFURSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aW5wdXQgcmVmPVwiaW5wdXREYXRlXCJcbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaWx0ZXIgZGF0ZS1maWx0ZXIgZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZmlsdGVyfVxuICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5zZXREZWZhdWx0RGF0ZSgpfSAvPlxuICAgICAgICApO1xuICAgIH1cbn07XG5cbkRhdGVGaWx0ZXIucHJvcFR5cGVzID0ge1xuICAgIGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNvbHVtbk5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhdGVGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL0RhdGUuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL0NvbnN0JztcblxuY2xhc3MgVGV4dEZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVvdXQgPSBudWxsO1xuXHR9XG5cblx0ZmlsdGVyKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMudGltZW91dCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdFx0fVxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXHRcdHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLnByb3BzLmZpbHRlckhhbmRsZXIoZmlsdGVyVmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQpO1xuXHRcdH0sIHNlbGYucHJvcHMuZGVsYXkpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0aWYgKHRoaXMucmVmcy5pbnB1dFRleHQuZGVmYXVsdFZhbHVlKSB7XG5cdFx0XHR0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIodGhpcy5yZWZzLmlucHV0VGV4dC5kZWZhdWx0VmFsdWUsIENvbnN0LkZJTFRFUl9UWVBFLlRFWFQpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8aW5wdXQgcmVmPVwiaW5wdXRUZXh0XCJcblx0XHRcdFx0ICAgY2xhc3NOYW1lPVwiZmlsdGVyIHRleHQtZmlsdGVyIGZvcm0tY29udHJvbFwiXG5cdFx0XHRcdCAgIHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0ICAgb25DaGFuZ2U9e3RoaXMuZmlsdGVyfVxuXHRcdFx0XHQgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCBgRW50ZXIgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYH1cblx0XHRcdFx0ICAgZGVmYXVsdFZhbHVlPXsodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiBcIlwifSAvPlxuXHRcdCk7XG5cdH1cbn07XG5cblRleHRGaWx0ZXIucHJvcFR5cGVzID0ge1xuXHRmaWx0ZXJIYW5kbGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdGRlbGF5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0Y29sdW1uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuVGV4dEZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG5cdGRlbGF5OiBDb25zdC5GSUxURVJfREVMQVlcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGV4dEZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbHRlcnMvVGV4dC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NTZXQgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vQ29uc3QnO1xuXG5jbGFzcyBTZWxlY3RGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmZpbHRlciA9IHRoaXMuZmlsdGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlzUGxhY2Vob2xkZXJTZWxlY3RlZDogKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlID09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0IXRoaXMucHJvcHMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkpXG5cdFx0fTtcblx0fVxuXG5cdGZpbHRlcihldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe2lzUGxhY2Vob2xkZXJTZWxlY3RlZDogKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gXCJcIil9KTtcblx0XHR0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCBDb25zdC5GSUxURVJfVFlQRS5TRUxFQ1QpO1xuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRsZXQgb3B0aW9uVGFncyA9IFtdO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0b3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PVwiLTFcIiB2YWx1ZT1cIlwiPnt0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IGBTZWxlY3QgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYH08L29wdGlvbj4pO1xuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRvcHRpb25UYWdzLnB1c2goPG9wdGlvbiBrZXk9e2tleX0gdmFsdWU9e2tleX0+e29wdGlvbnNba2V5XX08L29wdGlvbj4pO1xuXHRcdH0pO1xuXHRcdHJldHVybiBvcHRpb25UYWdzO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0aWYgKHRoaXMucmVmcy5zZWxlY3RJbnB1dC52YWx1ZSkge1xuXHRcdFx0dGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHRoaXMucmVmcy5zZWxlY3RJbnB1dC52YWx1ZSwgQ29uc3QuRklMVEVSX1RZUEUuU0VMRUNUKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dmFyIHNlbGVjdENsYXNzID0gY2xhc3NTZXQoXCJmaWx0ZXJcIiwgXCJzZWxlY3QtZmlsdGVyXCIsIFwiZm9ybS1jb250cm9sXCIsXG5cdFx0XHRcdFx0XHRcdHtcInBsYWNlaG9sZGVyLXNlbGVjdGVkXCI6IHRoaXMuc3RhdGUuaXNQbGFjZWhvbGRlclNlbGVjdGVkfSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNlbGVjdCByZWY9XCJzZWxlY3RJbnB1dFwiXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtzZWxlY3RDbGFzc31cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5maWx0ZXJ9XG5cdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXsodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgIT0gdW5kZWZpbmVkKSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogXCJcIn0+XG5cdFx0XHRcdHt0aGlzLmdldE9wdGlvbnMoKX1cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cdH1cbn07XG5cblNlbGVjdEZpbHRlci5wcm9wVHlwZXMgPSB7XG5cdGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0cGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdGNvbHVtbk5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEZpbHRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpbHRlcnMvU2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc1NldCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9Db25zdCc7XG5cbmNvbnN0IGxlZ2FsQ29tcGFyYXRvcnMgPSBbXCI9XCIsIFwiPlwiLCBcIj49XCIsIFwiPFwiLCBcIjw9XCIsIFwiIT1cIl07XG5cbmNsYXNzIE51bWJlckZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLm51bWJlckNvbXBhcmF0b3JzID0gdGhpcy5wcm9wcy5udW1iZXJDb21wYXJhdG9ycyB8fCBsZWdhbENvbXBhcmF0b3JzO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaXNQbGFjZWhvbGRlclNlbGVjdGVkOiAodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZS5udW1iZXIgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5wcm9wcy5vcHRpb25zICYmIHRoaXMucHJvcHMub3B0aW9ucy5pbmRleE9mKHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlcikgPT0gLTEpKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uQ2hhbmdlTnVtYmVyID0gdGhpcy5vbkNoYW5nZU51bWJlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlTnVtYmVyU2V0ID0gdGhpcy5vbkNoYW5nZU51bWJlclNldC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ29tcGFyYXRvciA9IHRoaXMub25DaGFuZ2VDb21wYXJhdG9yLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VOdW1iZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcy5udW1iZXJGaWx0ZXJDb21wYXJhdG9yLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wcm9wcy5maWx0ZXJIYW5kbGVyKHtudW1iZXI6IGZpbHRlclZhbHVlLCBjb21wYXJhdG9yOiBzZWxmLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZX0sXG4gICAgICAgICAgICAgICAgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSKTtcbiAgICAgICAgfSwgc2VsZi5wcm9wcy5kZWxheSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VOdW1iZXJTZXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNQbGFjZWhvbGRlclNlbGVjdGVkOiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcIlwiKX0pO1xuICAgICAgICBpZiAodGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlckhhbmRsZXIoe251bWJlcjogZXZlbnQudGFyZ2V0LnZhbHVlLCBjb21wYXJhdG9yOiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyQ29tcGFyYXRvci52YWx1ZX0sXG4gICAgICAgICAgICBDb25zdC5GSUxURVJfVFlQRS5OVU1CRVIpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlQ29tcGFyYXRvcihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLm51bWJlckZpbHRlci52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVySGFuZGxlcih7bnVtYmVyOiB0aGlzLnJlZnMubnVtYmVyRmlsdGVyLnZhbHVlLCBjb21wYXJhdG9yOiBldmVudC50YXJnZXQudmFsdWV9LFxuICAgICAgICAgICAgQ29uc3QuRklMVEVSX1RZUEUuTlVNQkVSKTtcbiAgICB9XG5cbiAgICBnZXRDb21wYXJhdG9yT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvblRhZ3MgPSBbXTtcbiAgICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PVwiLTFcIj48L29wdGlvbj4pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyQ29tcGFyYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT17aX0gdmFsdWU9e3RoaXMubnVtYmVyQ29tcGFyYXRvcnNbaV19Pnt0aGlzLm51bWJlckNvbXBhcmF0b3JzW2ldfTwvb3B0aW9uPik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25UYWdzO1xuICAgIH1cblxuICAgIGdldE51bWJlck9wdGlvbnMoKSB7XG4gICAgICAgIGxldCBvcHRpb25UYWdzID0gW107XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnM7XG5cbiAgICAgICAgb3B0aW9uVGFncy5wdXNoKDxvcHRpb24ga2V5PVwiLTFcIiB2YWx1ZT1cIlwiPnt0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IGBTZWxlY3QgJHt0aGlzLnByb3BzLmNvbHVtbk5hbWV9Li4uYH08L29wdGlvbj4pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvblRhZ3MucHVzaCg8b3B0aW9uIGtleT17aX0gdmFsdWU9e29wdGlvbnNbaV19PntvcHRpb25zW2ldfTwvb3B0aW9uPik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25UYWdzO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWUgJiYgdGhpcy5yZWZzLm51bWJlckZpbHRlci52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJIYW5kbGVyKHtudW1iZXI6IHRoaXMucmVmcy5udW1iZXJGaWx0ZXIudmFsdWUsXG4gICAgICAgICAgICAgICAgY29tcGFyYXRvcjogdGhpcy5yZWZzLm51bWJlckZpbHRlckNvbXBhcmF0b3IudmFsdWV9LFxuICAgICAgICAgICAgICAgIENvbnN0LkZJTFRFUl9UWVBFLk5VTUJFUik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc1NldChcInNlbGVjdC1maWx0ZXJcIiwgXCJudW1iZXItZmlsdGVyLWlucHV0XCIsIFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcInBsYWNlaG9sZGVyLXNlbGVjdGVkXCI6IHRoaXMuc3RhdGUuaXNQbGFjZWhvbGRlclNlbGVjdGVkIH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlciBudW1iZXItZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9XCJudW1iZXJGaWx0ZXJDb21wYXJhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm51bWJlci1maWx0ZXItY29tcGFyYXRvciBmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VDb21wYXJhdG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXsodGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUpID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUuY29tcGFyYXRvciA6IFwiXCJ9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRDb21wYXJhdG9yT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIHsodGhpcy5wcm9wcy5vcHRpb25zKSA/IDxzZWxlY3QgcmVmPVwibnVtYmVyRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0Q2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU51bWJlclNldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17KHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUubnVtYmVyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0TnVtYmVyT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PiA6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPVwibnVtYmVyRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm51bWJlci1maWx0ZXItaW5wdXQgZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgYEVudGVyICR7dGhpcy5wcm9wcy5jb2x1bW5OYW1lfS4uLmB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9eyh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLm51bWJlciA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIn0gLz59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5OdW1iZXJGaWx0ZXIucHJvcFR5cGVzID0ge1xuICAgIGZpbHRlckhhbmRsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBudW1iZXI6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGNvbXBhcmF0b3I6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihsZWdhbENvbXBhcmF0b3JzKVxuICAgIH0pLFxuICAgIGRlbGF5OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgIG51bWJlckNvbXBhcmF0b3JzOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgICAgaWYgKCFwcm9wc1twcm9wTmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzW3Byb3BOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbXBhcmF0b3JJc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlZ2FsQ29tcGFyYXRvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGVnYWxDb21wYXJhdG9yc1tqXSA9PT0gcHJvcHNbcHJvcE5hbWVdW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmF0b3JJc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb21wYXJhdG9ySXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYE51bWJlciBjb21wYXJhdG9yIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBvbmx5ICR7bGVnYWxDb21wYXJhdG9yc31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29sdW1uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuTnVtYmVyRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkZWxheTogQ29uc3QuRklMVEVSX0RFTEFZXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJGaWx0ZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWx0ZXJzL051bWJlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=