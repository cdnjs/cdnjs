(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapTable"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrapTable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_17__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SizePerPageDropDown = exports.ButtonGroup = exports.SearchField = exports.ClearSearchButton = exports.ExportCSVButton = exports.ShowSelectedOnlyButton = exports.DeleteButton = exports.InsertButton = exports.InsertModalFooter = exports.InsertModalBody = exports.InsertModalHeader = exports.TableHeaderColumn = exports.BootstrapTable = undefined;

	var _BootstrapTable = __webpack_require__(1);

	var _BootstrapTable2 = _interopRequireDefault(_BootstrapTable);

	var _TableHeaderColumn = __webpack_require__(23);

	var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);

	var _InsertModalHeader = __webpack_require__(58);

	var _InsertModalHeader2 = _interopRequireDefault(_InsertModalHeader);

	var _InsertModalBody = __webpack_require__(60);

	var _InsertModalBody2 = _interopRequireDefault(_InsertModalBody);

	var _InsertModalFooter = __webpack_require__(59);

	var _InsertModalFooter2 = _interopRequireDefault(_InsertModalFooter);

	var _InsertButton = __webpack_require__(61);

	var _InsertButton2 = _interopRequireDefault(_InsertButton);

	var _DeleteButton = __webpack_require__(62);

	var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

	var _ExportCSVButton = __webpack_require__(63);

	var _ExportCSVButton2 = _interopRequireDefault(_ExportCSVButton);

	var _ShowSelectedOnlyButton = __webpack_require__(64);

	var _ShowSelectedOnlyButton2 = _interopRequireDefault(_ShowSelectedOnlyButton);

	var _ClearSearchButton = __webpack_require__(66);

	var _ClearSearchButton2 = _interopRequireDefault(_ClearSearchButton);

	var _SearchField = __webpack_require__(65);

	var _SearchField2 = _interopRequireDefault(_SearchField);

	var _ButtonGroup = __webpack_require__(75);

	var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

	var _SizePerPageDropDown = __webpack_require__(43);

	var _SizePerPageDropDown2 = _interopRequireDefault(_SizePerPageDropDown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof window !== 'undefined') {
	  window.BootstrapTable = _BootstrapTable2.default;
	  window.TableHeaderColumn = _TableHeaderColumn2.default;
	  window.InsertModalHeader = _InsertModalHeader2.default;
	  window.InsertModalBody = _InsertModalBody2.default;
	  window.InsertModalFooter = _InsertModalFooter2.default;
	  window.InsertButton = _InsertButton2.default;
	  window.DeleteButton = _DeleteButton2.default;
	  window.ShowSelectedOnlyButton = _ShowSelectedOnlyButton2.default;
	  window.ExportCSVButton = _ExportCSVButton2.default;
	  window.ClearSearchButton = _ClearSearchButton2.default;
	  window.SearchField = _SearchField2.default;
	  window.ButtonGroup = _ButtonGroup2.default;
	  window.SizePerPageDropDown = _SizePerPageDropDown2.default;
	}
	exports.BootstrapTable = _BootstrapTable2.default;
	exports.TableHeaderColumn = _TableHeaderColumn2.default;
	exports.InsertModalHeader = _InsertModalHeader2.default;
	exports.InsertModalBody = _InsertModalBody2.default;
	exports.InsertModalFooter = _InsertModalFooter2.default;
	exports.InsertButton = _InsertButton2.default;
	exports.DeleteButton = _DeleteButton2.default;
	exports.ShowSelectedOnlyButton = _ShowSelectedOnlyButton2.default;
	exports.ExportCSVButton = _ExportCSVButton2.default;
	exports.ClearSearchButton = _ClearSearchButton2.default;
	exports.SearchField = _SearchField2.default;
	exports.ButtonGroup = _ButtonGroup2.default;
	exports.SizePerPageDropDown = _SizePerPageDropDown2.default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	}();

	;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactSAlert = __webpack_require__(14);

	var _reactSAlert2 = _interopRequireDefault(_reactSAlert);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _TableHeaderColumn = __webpack_require__(23);

	var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);

	var _TableHeader = __webpack_require__(30);

	var _TableHeader2 = _interopRequireDefault(_TableHeader);

	var _TableFooter = __webpack_require__(33);

	var _TableFooter2 = _interopRequireDefault(_TableFooter);

	var _TableBody = __webpack_require__(34);

	var _TableBody2 = _interopRequireDefault(_TableBody);

	var _PaginationList = __webpack_require__(41);

	var _PaginationList2 = _interopRequireDefault(_PaginationList);

	var _ToolBar = __webpack_require__(44);

	var _ToolBar2 = _interopRequireDefault(_ToolBar);

	var _TableFilter = __webpack_require__(67);

	var _TableFilter2 = _interopRequireDefault(_TableFilter);

	var _TableDataStore = __webpack_require__(68);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	var _csv_export_util = __webpack_require__(69);

	var _csv_export_util2 = _interopRequireDefault(_csv_export_util);

	var _Filter = __webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-alert: 0 */
	/* eslint max-len: 0 */


	var BootstrapTable = function (_Component) {
	  _inherits(BootstrapTable, _Component);

	  function BootstrapTable(props) {
	    _classCallCheck(this, BootstrapTable);

	    var _this = _possibleConstructorReturn(this, (BootstrapTable.__proto__ || Object.getPrototypeOf(BootstrapTable)).call(this, props));

	    _this.handleSort = function () {
	      return _this.__handleSort__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleExpandRow = function () {
	      return _this.__handleExpandRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handlePaginationData = function () {
	      return _this.__handlePaginationData__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleMouseLeave = function () {
	      return _this.__handleMouseLeave__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleMouseEnter = function () {
	      return _this.__handleMouseEnter__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowMouseOut = function () {
	      return _this.__handleRowMouseOut__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowMouseOver = function () {
	      return _this.__handleRowMouseOver__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleNavigateCell = function () {
	      return _this.__handleNavigateCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowClick = function () {
	      return _this.__handleRowClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowDoubleClick = function () {
	      return _this.__handleRowDoubleClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleSelectAllRow = function () {
	      return _this.__handleSelectAllRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleShowOnlySelected = function () {
	      return _this.__handleShowOnlySelected__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleSelectRow = function () {
	      return _this.__handleSelectRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleEditCell = function () {
	      return _this.__handleEditCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleAddRow = function () {
	      return _this.__handleAddRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.getPageByRowKey = function () {
	      return _this.__getPageByRowKey__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleDropRow = function () {
	      return _this.__handleDropRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleFilterData = function () {
	      return _this.__handleFilterData__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleExportCSV = function () {
	      return _this.__handleExportCSV__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleSearch = function () {
	      return _this.__handleSearch__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this._scrollTop = function () {
	      return _this.___scrollTop__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this._scrollHeader = function () {
	      return _this.___scrollHeader__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this._scrollFooter = function () {
	      return _this.___scrollFooter__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.isIE = false;
	    if (_util2.default.canUseDOM()) {
	      _this.isIE = document.documentMode;
	    }
	    _this.store = new _TableDataStore.TableDataStore(_this.props.data ? _this.props.data.slice() : []);
	    _this.isVerticalScroll = false;
	    _this.initTable(_this.props);

	    if (_this.props.selectRow && _this.props.selectRow.selected) {
	      var copy = _this.props.selectRow.selected.slice();
	      _this.store.setSelectedRowKey(copy);
	    }
	    var currPage = _Const2.default.PAGE_START_INDEX;
	    if (typeof _this.props.options.page !== 'undefined') {
	      currPage = _this.props.options.page;
	    } else if (typeof _this.props.options.pageStartIndex !== 'undefined') {
	      currPage = _this.props.options.pageStartIndex;
	    }

	    _this._adjustHeaderWidth = _this._adjustHeaderWidth.bind(_this);
	    _this._adjustHeight = _this._adjustHeight.bind(_this);
	    _this._adjustTable = _this._adjustTable.bind(_this);
	    _this.toggleExpandAllChilds = _this.toggleExpandAllChilds.bind(_this);

	    var expandedKeys = [];
	    if (_this.props.options.expandAllChilds !== null && _this.props.options.expandAllChilds !== undefined && _this.props.options.expandAllChilds) {
	      expandedKeys = _this.store.getAllRowkey();
	    } else if (_this.props.options.expanding !== undefined && _this.props.options.expanding !== null) {
	      expandedKeys = _this.props.options.expanding;
	    }

	    _this.state = {
	      data: _this.getTableData(),
	      currPage: currPage,
	      expanding: expandedKeys,
	      sizePerPage: _this.props.options.sizePerPage || _Const2.default.SIZE_PER_PAGE_LIST[0],
	      selectedRowKeys: _this.store.getSelectedRowKeys(),
	      reset: false,
	      x: _this.props.keyBoardNav ? 0 : -1,
	      y: _this.props.keyBoardNav ? 0 : -1
	    };
	    return _this;
	  }

	  _createClass(BootstrapTable, [{
	    key: '___scrollFooter__REACT_HOT_LOADER__',
	    value: function ___scrollFooter__REACT_HOT_LOADER__() {
	      return this.___scrollFooter__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '___scrollHeader__REACT_HOT_LOADER__',
	    value: function ___scrollHeader__REACT_HOT_LOADER__() {
	      return this.___scrollHeader__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '___scrollTop__REACT_HOT_LOADER__',
	    value: function ___scrollTop__REACT_HOT_LOADER__() {
	      return this.___scrollTop__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSearch__REACT_HOT_LOADER__',
	    value: function __handleSearch__REACT_HOT_LOADER__() {
	      return this.__handleSearch__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleExportCSV__REACT_HOT_LOADER__',
	    value: function __handleExportCSV__REACT_HOT_LOADER__() {
	      return this.__handleExportCSV__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleFilterData__REACT_HOT_LOADER__',
	    value: function __handleFilterData__REACT_HOT_LOADER__() {
	      return this.__handleFilterData__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleDropRow__REACT_HOT_LOADER__',
	    value: function __handleDropRow__REACT_HOT_LOADER__() {
	      return this.__handleDropRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__getPageByRowKey__REACT_HOT_LOADER__',
	    value: function __getPageByRowKey__REACT_HOT_LOADER__() {
	      return this.__getPageByRowKey__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleAddRow__REACT_HOT_LOADER__',
	    value: function __handleAddRow__REACT_HOT_LOADER__() {
	      return this.__handleAddRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleEditCell__REACT_HOT_LOADER__',
	    value: function __handleEditCell__REACT_HOT_LOADER__() {
	      return this.__handleEditCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSelectRow__REACT_HOT_LOADER__',
	    value: function __handleSelectRow__REACT_HOT_LOADER__() {
	      return this.__handleSelectRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleShowOnlySelected__REACT_HOT_LOADER__',
	    value: function __handleShowOnlySelected__REACT_HOT_LOADER__() {
	      return this.__handleShowOnlySelected__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSelectAllRow__REACT_HOT_LOADER__',
	    value: function __handleSelectAllRow__REACT_HOT_LOADER__() {
	      return this.__handleSelectAllRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowDoubleClick__REACT_HOT_LOADER__',
	    value: function __handleRowDoubleClick__REACT_HOT_LOADER__() {
	      return this.__handleRowDoubleClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowClick__REACT_HOT_LOADER__',
	    value: function __handleRowClick__REACT_HOT_LOADER__() {
	      return this.__handleRowClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleNavigateCell__REACT_HOT_LOADER__',
	    value: function __handleNavigateCell__REACT_HOT_LOADER__() {
	      return this.__handleNavigateCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowMouseOver__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOver__REACT_HOT_LOADER__() {
	      return this.__handleRowMouseOver__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowMouseOut__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOut__REACT_HOT_LOADER__() {
	      return this.__handleRowMouseOut__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleMouseEnter__REACT_HOT_LOADER__',
	    value: function __handleMouseEnter__REACT_HOT_LOADER__() {
	      return this.__handleMouseEnter__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleMouseLeave__REACT_HOT_LOADER__',
	    value: function __handleMouseLeave__REACT_HOT_LOADER__() {
	      return this.__handleMouseLeave__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handlePaginationData__REACT_HOT_LOADER__',
	    value: function __handlePaginationData__REACT_HOT_LOADER__() {
	      return this.__handlePaginationData__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleExpandRow__REACT_HOT_LOADER__',
	    value: function __handleExpandRow__REACT_HOT_LOADER__() {
	      return this.__handleExpandRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSort__REACT_HOT_LOADER__',
	    value: function __handleSort__REACT_HOT_LOADER__() {
	      return this.__handleSort__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'initTable',
	    value: function initTable(props) {
	      var _this2 = this;

	      // If columns changed, clean removed columns that had filters
	      if (props.children !== this.props.children && this.filter) {
	        var nextDataFields = _react2.default.Children.map(props.children, function (column) {
	          return column.props.dataField;
	        });
	        _react2.default.Children.forEach(this.props.children, function (column) {
	          var _column$props = column.props,
	              dataField = _column$props.dataField,
	              filter = _column$props.filter;

	          if (filter && !nextDataFields.includes(dataField)) {
	            // Clear filter
	            _this2.filter.handleFilter(dataField, '', filter.type, filter);
	          }
	        });
	      }

	      var keyField = props.keyField;


	      var isKeyFieldDefined = typeof keyField === 'string' && keyField.length;
	      _react2.default.Children.forEach(props.children, function (column) {
	        if (column === null || column === undefined) {
	          // Skip null and undefined value
	          return;
	        }
	        if (column.props.isKey) {
	          if (keyField) {
	            throw new Error('Error. Multiple key column detected in TableHeaderColumn.');
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

	      // if a column filter was created, add 'onFilterChange' listener
	      if (this.filter) {
	        this.filter.removeAllListeners('onFilterChange');
	        this.filter.on('onFilterChange', function (currentFilter) {
	          _this2.handleFilterData(currentFilter);
	        });
	      }

	      this.colInfos = this.getColumnsDescription(props).reduce(function (prev, curr) {
	        prev[curr.name] = curr;
	        return prev;
	      }, {});

	      if (!isKeyFieldDefined && !keyField) {
	        throw new Error('Error. No any key column defined in TableHeaderColumn.\n            Use \'isKey={true}\' to specify a unique column after version 0.5.4.');
	      }

	      this.store.setProps({
	        isPagination: props.pagination,
	        keyField: keyField,
	        colInfos: this.colInfos,
	        multiColumnSearch: props.multiColumnSearch,
	        strictSearch: props.strictSearch,
	        multiColumnSort: props.multiColumnSort,
	        remote: this.props.remote
	      });
	    }
	  }, {
	    key: 'getTableData',
	    value: function getTableData() {
	      var result = [];
	      var _props = this.props,
	          options = _props.options,
	          pagination = _props.pagination;

	      var sortName = options.defaultSortName || options.sortName;
	      var sortOrder = options.defaultSortOrder || options.sortOrder;
	      var searchText = options.defaultSearch;

	      if (sortName && sortOrder) {
	        this.store.setSortInfo(sortOrder, sortName);
	        if (!this.allowRemote(_Const2.default.REMOTE_SORT)) {
	          this.store.sort();
	        }
	      }

	      if (searchText) {
	        this.store.search(searchText);
	      }

	      if (pagination) {
	        var page = void 0;
	        var sizePerPage = void 0;
	        if (this.store.isChangedPage()) {
	          sizePerPage = this.state.sizePerPage;
	          page = this.state.currPage;
	        } else {
	          sizePerPage = options.sizePerPage || _Const2.default.SIZE_PER_PAGE_LIST[0];
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
	      var _this3 = this;

	      var children = _ref.children;

	      var rowCount = 0;
	      _react2.default.Children.forEach(children, function (column) {
	        if (column === null || column === undefined) {
	          // Skip null and undefined value
	          return;
	        }

	        if (Number(column.props.row) > rowCount) {
	          rowCount = Number(column.props.row);
	        }
	      });
	      return _react2.default.Children.map(children, function (column, i) {
	        if (column === null || column === undefined) {
	          // Return null for empty objects
	          return null;
	        }

	        var rowIndex = column.props.row ? Number(column.props.row) : 0;
	        var rowSpan = column.props.rowSpan ? Number(column.props.rowSpan) : 1;
	        if (rowSpan + rowIndex === rowCount + 1) {
	          var columnDescription = _this3.getColumnDescription(column);

	          columnDescription.index = i;
	          return columnDescription;
	        }
	      });
	    }
	  }, {
	    key: 'getColumnDescription',
	    value: function getColumnDescription(column) {
	      var columnDescription = {
	        name: column.props.dataField,
	        align: column.props.dataAlign,
	        sort: column.props.dataSort,
	        format: column.props.dataFormat,
	        formatExtraData: column.props.formatExtraData,
	        filterFormatted: column.props.filterFormatted,
	        filterValue: column.props.filterValue,
	        editable: column.props.editable,
	        customEditor: column.props.customEditor,
	        hidden: column.props.hidden,
	        hiddenOnInsert: column.props.hiddenOnInsert,
	        searchable: column.props.searchable,
	        className: column.props.columnClassName,
	        editClassName: column.props.editColumnClassName,
	        invalidEditColumnClassName: column.props.invalidEditColumnClassName,
	        columnTitle: column.props.columnTitle,
	        width: column.props.width,
	        text: column.props.headerText || column.props.children,
	        sortFunc: column.props.sortFunc,
	        sortFuncExtraData: column.props.sortFuncExtraData,
	        export: column.props.export,
	        expandable: column.props.expandable,
	        attrs: column.props.tdAttr,
	        editAttrs: column.props.editTdAttr,
	        style: column.props.tdStyle
	      };

	      if (column.type.name !== _TableHeaderColumn2.default.name && _react2.default.isValidElement(column.props.children)) {
	        columnDescription = _extends({}, columnDescription, this.getColumnDescription(_react2.default.Children.only(column.props.children)));
	      }

	      return columnDescription;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var _this4 = this;

	      var pageStartIndex = this.props.options.pageStartIndex;

	      this.store.clean();
	      this.body.setState({ currEditCell: null });
	      this.setState(function () {
	        return {
	          data: _this4.getTableData(),
	          currPage: _util2.default.getFirstPage(pageStartIndex),
	          expanding: [],
	          sizePerPage: _Const2.default.SIZE_PER_PAGE_LIST[0],
	          selectedRowKeys: [],
	          reset: true
	        };
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.initTable(nextProps);
	      var options = nextProps.options,
	          selectRow = nextProps.selectRow;
	      var replace = nextProps.replace;

	      replace = replace || this.props.replace;

	      if (!nextProps.data) {
	        return;
	      }
	      this.store.setData(nextProps.data.slice());

	      if (!replace) {
	        // from #481
	        var page = this.state.currPage;
	        if (this.props.options.page !== options.page) {
	          page = options.page;
	        }
	        // from #481
	        var sizePerPage = this.state.sizePerPage;
	        if (this.props.options.sizePerPage !== options.sizePerPage) {
	          sizePerPage = options.sizePerPage;
	        }

	        if (this.isRemoteDataSource()) {
	          var newState = { sizePerPage: sizePerPage, reset: false, currPage: page };
	          var data = nextProps.data.slice();
	          if (nextProps.pagination && !this.allowRemote(_Const2.default.REMOTE_PAGE)) {
	            data = this.store.page(page, sizePerPage).get();
	          }

	          if (this.store.isOnFilter) {
	            if (this.store.searchText) this.handleSearch(this.store.searchText);
	            if (this.store.filterObj) this.handleFilterData(this.store.filterObj);
	            newState.currPage = _util2.default.getFirstPage(nextProps.options.pageStartIndex);
	          } else {
	            if (!this.allowRemote(_Const2.default.REMOTE_SORT)) {
	              data = this.store.sort().get();
	            } else {
	              var currentOptions = this.props.options;

	              var sortName = options.sortName;
	              var sortOrder = options.sortOrder;
	              if (currentOptions.sortName !== sortName || currentOptions.sortOrder !== sortOrder) {
	                this.store.setSortInfo(sortOrder, options.sortName);
	              }
	            }
	            newState.data = data;
	          }
	          this.setState(function () {
	            return newState;
	          });
	        } else {
	          // #125
	          // remove !options.page for #709
	          if (page > Math.ceil(nextProps.data.length / sizePerPage)) {
	            page = 1;
	          }
	          var sortList = this.store.getSortInfo();
	          var sortField = options.sortName;
	          var _sortOrder = options.sortOrder;
	          if (sortField && _sortOrder) {
	            this.store.setSortInfo(_sortOrder, sortField);
	            this.store.sort();
	          } else if (sortList.length > 0) {
	            this.store.sort();
	          }
	          var _data = this.store.page(page, sizePerPage).get();
	          this.setState(function () {
	            return {
	              data: _data,
	              currPage: page,
	              sizePerPage: sizePerPage,
	              reset: false
	            };
	          });

	          if (this.store.isSearching && options.afterSearch) {
	            options.afterSearch(this.store.searchText, this.store.getDataIgnoringPagination());
	          }

	          if (this.store.isFiltering && options.afterColumnFilter) {
	            options.afterColumnFilter(this.store.filterObj, this.store.getDataIgnoringPagination());
	          }
	        }

	        // If setting the expanded rows is being handled externally
	        // then overwrite the current expanded rows.
	        if (this.props.options.expanding !== options.expanding) {
	          this.setState(function () {
	            return {
	              expanding: options.expanding || []
	            };
	          });
	        }

	        if (selectRow && selectRow.selected) {
	          // set default select rows to store.
	          var copy = selectRow.selected.slice();
	          this.store.setSelectedRowKey(copy);
	          this.setState(function () {
	            return {
	              selectedRowKeys: copy,
	              reset: false
	            };
	          });
	        }
	      } else {
	        this.reset();
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._adjustTable();
	      window.addEventListener('resize', this._adjustTable);
	      this.body.container.addEventListener('scroll', this._scrollHeader);
	      if (this.props.footer) {
	        this.body.container.addEventListener('scroll', this._scrollFooter);
	      }
	      if (this.props.scrollTop) {
	        this._scrollTop();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this._adjustTable);
	      if (this.body && this.body.container) {
	        this.body.container.removeEventListener('scroll', this._scrollHeader);
	        if (this.props.footer) {
	          this.body.container.removeEventListener('scroll', this._scrollFooter);
	        }
	      }
	      if (this.filter) {
	        this.filter.removeAllListeners('onFilterChange');
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._adjustTable();
	      if (this.props.options.afterTableComplete) {
	        this.props.options.afterTableComplete();
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
	      var _ref2 = props || this.props,
	          remote = _ref2.remote;

	      return remote === true || _util2.default.isFunction(remote);
	    }

	    /**
	     * Returns true if this action can be handled remote store
	     * From #990, Sometimes, we need some actions as remote, some actions are handled by default
	     * so function will tell you the target action is can be handled as remote or not.
	     * @param  {String}  [action] Required.
	     * @param  {Object}  [props] Optional. If not given, this.props will be used
	     * @return {Boolean}
	     */

	  }, {
	    key: 'allowRemote',
	    value: function allowRemote(action, props) {
	      var _ref3 = props || this.props,
	          remote = _ref3.remote;

	      if (typeof remote === 'function') {
	        var remoteObj = remote(_Const2.default.REMOTE);
	        return remoteObj[action];
	      } else {
	        return remote;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      var style = {
	        height: this.props.height,
	        maxHeight: this.props.maxHeight
	      };

	      var columns = this.getColumnsDescription(this.props);
	      var sortList = this.store.getSortInfo();
	      var pagination = this.renderPagination();
	      var toolBar = this.renderToolBar();
	      var tableFilter = this.renderTableFilter(columns);
	      var isSelectAll = this.isSelectAll();
	      var expandColumnOptions = this.props.expandColumnOptions;
	      if (typeof expandColumnOptions.expandColumnBeforeSelectColumn === 'undefined') {
	        expandColumnOptions.expandColumnBeforeSelectColumn = true;
	      }
	      var colGroups = _util2.default.renderColGroup(columns, this.props.selectRow, expandColumnOptions, this.props.version);
	      var tableFooter = this.renderTableFooter(this.props.footerData, this.state.data, columns, colGroups);
	      var sortIndicator = this.props.options.sortIndicator;
	      if (typeof this.props.options.sortIndicator === 'undefined') sortIndicator = true;

	      var _props$options$pagina = this.props.options.paginationPosition,
	          paginationPosition = _props$options$pagina === undefined ? _Const2.default.PAGINATION_POS_BOTTOM : _props$options$pagina;

	      var showPaginationOnTop = paginationPosition !== _Const2.default.PAGINATION_POS_BOTTOM;
	      var showPaginationOnBottom = paginationPosition !== _Const2.default.PAGINATION_POS_TOP;
	      var selectRow = _extends({}, this.props.selectRow);
	      if (this.props.cellEdit && this.props.cellEdit.mode !== _Const2.default.CELL_EDIT_NONE) {
	        selectRow.clickToSelect = false;
	      }

	      var _props$options$toolba = this.props.options.toolbarPosition,
	          toolbarPosition = _props$options$toolba === undefined ? _Const2.default.TOOLBAR_POS_TOP : _props$options$toolba;

	      var showToolbarOnTop = toolbarPosition !== _Const2.default.TOOLBAR_POS_BOTTOM;
	      var showToolbarOnBottom = toolbarPosition !== _Const2.default.TOOLBAR_POS_TOP;
	      var _props$options$hideRo = this.props.options.hideRowOnExpand,
	          hideRowOnExpand = _props$options$hideRo === undefined ? false : _props$options$hideRo;

	      return _react2.default.createElement(
	        'div',
	        { className: (0, _classnames2.default)('react-bs-table-container', this.props.className, this.props.containerClass),
	          style: this.props.containerStyle },
	        showToolbarOnTop ? toolBar : null,
	        showPaginationOnTop ? pagination : null,
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(node) {
	              return _this5.table = node;
	            },
	            className: (0, _classnames2.default)('react-bs-table', { 'react-bs-table-bordered': this.props.bordered }, this.props.tableContainerClass),
	            style: _extends({}, style, this.props.tableStyle),
	            onMouseEnter: this.handleMouseEnter,
	            onMouseLeave: this.handleMouseLeave },
	          _react2.default.createElement(
	            _TableHeader2.default,
	            {
	              ref: function ref(node) {
	                return _this5.header = node;
	              },
	              version: this.props.version,
	              colGroups: colGroups,
	              headerContainerClass: this.props.headerContainerClass,
	              tableHeaderClass: this.props.tableHeaderClass,
	              style: this.props.headerStyle,
	              rowSelectType: this.props.selectRow.mode,
	              customComponent: this.props.selectRow.customComponent,
	              hideSelectColumn: this.props.selectRow.hideSelectColumn,
	              sortList: sortList,
	              sortIndicator: sortIndicator,
	              onSort: this.handleSort,
	              onSelectAllRow: this.handleSelectAllRow,
	              bordered: this.props.bordered,
	              condensed: this.props.condensed,
	              isFiltered: this.filter ? true : false,
	              isSelectAll: isSelectAll,
	              reset: this.state.reset,
	              expandColumnVisible: expandColumnOptions.expandColumnVisible,
	              expandColumnComponent: expandColumnOptions.expandColumnComponent,
	              expandedColumnHeaderComponent: expandColumnOptions.expandedColumnHeaderComponent,
	              noAnyExpand: this.state.expanding.length === 0,
	              expandAll: this.props.options.expandAll,
	              toggleExpandAllChilds: this.toggleExpandAllChilds,
	              expandColumnBeforeSelectColumn: expandColumnOptions.expandColumnBeforeSelectColumn },
	            this.props.children
	          ),
	          _react2.default.createElement(_TableBody2.default, {
	            ref: function ref(node) {
	              return _this5.body = node;
	            },
	            bodyContainerClass: this.props.bodyContainerClass,
	            tableBodyClass: this.props.tableBodyClass,
	            style: _extends({}, style, this.props.bodyStyle),
	            data: this.state.data,
	            version: this.props.version,
	            expandComponent: this.props.expandComponent,
	            expandableRow: this.props.expandableRow,
	            expandRowBgColor: this.props.options.expandRowBgColor,
	            expandBy: this.props.options.expandBy || _Const2.default.EXPAND_BY_ROW,
	            expandBodyClass: this.props.options.expandBodyClass,
	            expandParentClass: this.props.options.expandParentClass,
	            columns: columns,
	            trClassName: this.props.trClassName,
	            trStyle: this.props.trStyle,
	            striped: this.props.striped,
	            bordered: this.props.bordered,
	            hover: this.props.hover,
	            keyField: this.store.getKeyField(),
	            condensed: this.props.condensed,
	            selectRow: selectRow,
	            expandColumnOptions: this.props.expandColumnOptions,
	            cellEdit: this.props.cellEdit,
	            selectedRowKeys: this.state.selectedRowKeys,
	            onRowClick: this.handleRowClick,
	            onRowDoubleClick: this.handleRowDoubleClick,
	            onRowMouseOver: this.handleRowMouseOver,
	            onRowMouseOut: this.handleRowMouseOut,
	            onSelectRow: this.handleSelectRow,
	            noDataText: this.props.options.noDataText,
	            withoutNoDataText: this.props.options.withoutNoDataText,
	            expanding: this.state.expanding,
	            onExpand: this.handleExpandRow,
	            onlyOneExpanding: this.props.options.onlyOneExpanding,
	            beforeShowError: this.props.options.beforeShowError,
	            keyBoardNav: this.props.keyBoardNav,
	            onNavigateCell: this.handleNavigateCell,
	            x: this.state.x,
	            y: this.state.y,
	            withoutTabIndex: this.props.withoutTabIndex,
	            hideRowOnExpand: hideRowOnExpand,
	            onEditCell: this.handleEditCell }),
	          tableFooter
	        ),
	        tableFilter,
	        showPaginationOnBottom ? pagination : null,
	        showToolbarOnBottom ? toolBar : null,
	        this.props.renderAlert ? _react2.default.createElement(_reactSAlert2.default, { stack: { limit: 3 } }) : null
	      );
	    }
	  }, {
	    key: 'isSelectAll',
	    value: function isSelectAll() {
	      if (this.store.isEmpty()) return false;
	      var _props$selectRow = this.props.selectRow,
	          unselectable = _props$selectRow.unselectable,
	          onlyUnselectVisible = _props$selectRow.onlyUnselectVisible;

	      var keyField = this.store.getKeyField();
	      var allRowKeys = onlyUnselectVisible ? this.store.get().map(function (r) {
	        return r[keyField];
	      }) : this.store.getAllRowkey();
	      var defaultSelectRowKeys = this.store.getSelectedRowKeys();

	      if (onlyUnselectVisible) {
	        defaultSelectRowKeys = defaultSelectRowKeys.filter(function (x) {
	          return x !== allRowKeys;
	        });
	      }

	      if (defaultSelectRowKeys.length === 0) return false;
	      var match = 0;
	      var noFound = 0;
	      var unSelectableCnt = 0;
	      defaultSelectRowKeys.forEach(function (selected) {
	        if (allRowKeys.indexOf(selected) !== -1) match++;else noFound++;
	        if (unselectable && unselectable.indexOf(selected) !== -1) unSelectableCnt++;
	      });

	      if (noFound === defaultSelectRowKeys.length) return false;
	      if (match === allRowKeys.length) {
	        return true;
	      } else {
	        if (unselectable && match <= unSelectableCnt && unSelectableCnt === unselectable.length) return false;else return 'indeterminate';
	      }
	      // return (match === allRowKeys.length) ? true : 'indeterminate';
	    }
	  }, {
	    key: 'cleanSelected',
	    value: function cleanSelected() {
	      this.store.setSelectedRowKey([]);
	      this.setState(function () {
	        return {
	          selectedRowKeys: [],
	          reset: false
	        };
	      });
	    }
	  }, {
	    key: 'cleanSort',
	    value: function cleanSort() {
	      this.store.cleanSortInfo();
	      this.setState(function () {
	        return {
	          reset: false
	        };
	      });
	    }
	  }, {
	    key: '__handleSort__REACT_HOT_LOADER__',
	    value: function __handleSort__REACT_HOT_LOADER__(order, sortField) {
	      var _props2 = this.props,
	          sort = _props2.autoCollapse.sort,
	          options = _props2.options;

	      if (options.onSortChange) {
	        options.onSortChange(sortField, order, this.props);
	      }
	      this.store.setSortInfo(order, sortField);
	      if (this.allowRemote(_Const2.default.REMOTE_SORT)) {
	        if (sort) {
	          this.setState(function () {
	            return {
	              expanding: []
	            };
	          });
	        }
	        return;
	      }

	      var result = this.store.sort().get();
	      this.setState(function () {
	        var newState = {
	          data: result,
	          reset: false
	        };
	        if (sort) newState.expanding = [];
	        return newState;
	      });
	    }
	  }, {
	    key: '__handleExpandRow__REACT_HOT_LOADER__',
	    value: function __handleExpandRow__REACT_HOT_LOADER__(expanding, rowKey, isRowExpanding, event) {
	      var _this6 = this;

	      var onExpand = this.props.options.onExpand;

	      if (onExpand) {
	        onExpand(rowKey, !isRowExpanding, event);
	      }
	      this.setState(function () {
	        return { expanding: expanding, reset: false };
	      }, function () {
	        _this6._adjustHeaderWidth();
	      });
	    }
	  }, {
	    key: 'toggleExpandAllChilds',
	    value: function toggleExpandAllChilds() {
	      var _this7 = this;

	      var expanding = this.state.expanding;

	      if (expanding.length > 0) {
	        this.setState(function () {
	          return {
	            expanding: [],
	            reset: false
	          };
	        });
	      } else {
	        this.setState(function () {
	          return {
	            expanding: _this7.store.getAllRowkey(),
	            reset: false
	          };
	        });
	      }
	    }
	  }, {
	    key: '__handlePaginationData__REACT_HOT_LOADER__',
	    value: function __handlePaginationData__REACT_HOT_LOADER__(page, sizePerPage) {
	      var _props$options = this.props.options,
	          onPageChange = _props$options.onPageChange,
	          pageStartIndex = _props$options.pageStartIndex;

	      var emptyTable = this.store.isEmpty();
	      if (onPageChange) {
	        onPageChange(page, sizePerPage);
	      }

	      var state = {
	        sizePerPage: sizePerPage,
	        reset: false
	      };
	      if (!emptyTable) state.currPage = page;
	      this.setState(function () {
	        return state;
	      });

	      if (this.allowRemote(_Const2.default.REMOTE_PAGE) || emptyTable) {
	        return;
	      }

	      var result = this.store.page(_util2.default.getNormalizedPage(pageStartIndex, page), sizePerPage).get();
	      this.setState(function () {
	        return { data: result, reset: false };
	      });
	    }
	  }, {
	    key: '__handleMouseLeave__REACT_HOT_LOADER__',
	    value: function __handleMouseLeave__REACT_HOT_LOADER__() {
	      if (this.props.options.onMouseLeave) {
	        this.props.options.onMouseLeave();
	      }
	    }
	  }, {
	    key: '__handleMouseEnter__REACT_HOT_LOADER__',
	    value: function __handleMouseEnter__REACT_HOT_LOADER__() {
	      if (this.props.options.onMouseEnter) {
	        this.props.options.onMouseEnter();
	      }
	    }
	  }, {
	    key: '__handleRowMouseOut__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOut__REACT_HOT_LOADER__(row, event) {
	      if (this.props.options.onRowMouseOut) {
	        this.props.options.onRowMouseOut(row, event);
	      }
	    }
	  }, {
	    key: '__handleRowMouseOver__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOver__REACT_HOT_LOADER__(row, event) {
	      if (this.props.options.onRowMouseOver) {
	        this.props.options.onRowMouseOver(row, event);
	      }
	    }
	  }, {
	    key: '__handleNavigateCell__REACT_HOT_LOADER__',
	    value: function __handleNavigateCell__REACT_HOT_LOADER__(_ref4) {
	      var offSetX = _ref4.x,
	          offSetY = _ref4.y,
	          lastEditCell = _ref4.lastEditCell;
	      var pagination = this.props.pagination;
	      var _state = this.state,
	          x = _state.x,
	          y = _state.y,
	          currPage = _state.currPage;

	      x += offSetX;
	      y += offSetY;

	      var columns = this.store.getColInfos();
	      var visibleRowSize = this.state.data.length;
	      var visibleColumnSize = Object.keys(columns).filter(function (k) {
	        return !columns[k].hidden;
	      }).length;

	      if (y >= visibleRowSize) {
	        currPage++;
	        var lastPage = pagination ? this.pagination.getLastPage() : -1;
	        if (currPage <= lastPage) {
	          this.handlePaginationData(currPage, this.state.sizePerPage);
	        } else {
	          return;
	        }
	        y = 0;
	      } else if (y < 0) {
	        currPage--;
	        if (currPage > 0) {
	          this.handlePaginationData(currPage, this.state.sizePerPage);
	        } else {
	          return;
	        }
	        y = visibleRowSize - 1;
	      } else if (x >= visibleColumnSize) {
	        if (y + 1 === visibleRowSize) {
	          currPage++;
	          var _lastPage = pagination ? this.pagination.getLastPage() : -1;
	          if (currPage <= _lastPage) {
	            this.handlePaginationData(currPage, this.state.sizePerPage);
	          } else {
	            return;
	          }
	          y = 0;
	        } else {
	          y++;
	        }
	        x = lastEditCell ? 1 : 0;
	      } else if (x < 0) {
	        x = visibleColumnSize - 1;
	        if (y === 0) {
	          currPage--;
	          if (currPage > 0) {
	            this.handlePaginationData(currPage, this.state.sizePerPage);
	          } else {
	            return;
	          }
	          y = this.state.sizePerPage - 1;
	        } else {
	          y--;
	        }
	      }
	      this.setState(function () {
	        return {
	          x: x, y: y, currPage: currPage, reset: false
	        };
	      });
	    }
	  }, {
	    key: '__handleRowClick__REACT_HOT_LOADER__',
	    value: function __handleRowClick__REACT_HOT_LOADER__(row, rowIndex, columnIndex, event) {
	      var _props3 = this.props,
	          options = _props3.options,
	          keyBoardNav = _props3.keyBoardNav;

	      if (options.onRowClick) {
	        options.onRowClick(row, columnIndex, rowIndex, event);
	      }
	      if (keyBoardNav) {
	        var _ref5 = (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object' ? keyBoardNav : {},
	            clickToNav = _ref5.clickToNav;

	        clickToNav = clickToNav === false ? clickToNav : true;
	        if (clickToNav) {
	          this.setState(function () {
	            return {
	              x: columnIndex,
	              y: rowIndex,
	              reset: false
	            };
	          });
	        }
	      }
	    }
	  }, {
	    key: '__handleRowDoubleClick__REACT_HOT_LOADER__',
	    value: function __handleRowDoubleClick__REACT_HOT_LOADER__(row, event) {
	      if (this.props.options.onRowDoubleClick) {
	        this.props.options.onRowDoubleClick(row, event);
	      }
	    }
	  }, {
	    key: '__handleSelectAllRow__REACT_HOT_LOADER__',
	    value: function __handleSelectAllRow__REACT_HOT_LOADER__(e) {
	      var isSelected = e.currentTarget.checked;
	      var keyField = this.store.getKeyField();
	      var _props$selectRow2 = this.props.selectRow,
	          onSelectAll = _props$selectRow2.onSelectAll,
	          unselectable = _props$selectRow2.unselectable,
	          selected = _props$selectRow2.selected,
	          onlyUnselectVisible = _props$selectRow2.onlyUnselectVisible;

	      var selectedRowKeys = onlyUnselectVisible ? this.state.selectedRowKeys : [];
	      var result = true;
	      var rows = this.store.get();

	      // onlyUnselectVisible default is false, #1276
	      if (!isSelected && !onlyUnselectVisible) {
	        rows = this.store.getRowByKey(this.state.selectedRowKeys);
	      }

	      if (unselectable && unselectable.length > 0) {
	        if (isSelected) {
	          rows = rows.filter(function (r) {
	            return unselectable.indexOf(r[keyField]) === -1 || selected && selected.indexOf(r[keyField]) !== -1;
	          });
	        } else {
	          rows = rows.filter(function (r) {
	            return unselectable.indexOf(r[keyField]) === -1;
	          });
	        }
	      }

	      if (onSelectAll) {
	        result = this.props.selectRow.onSelectAll(isSelected, rows);
	      }

	      if (typeof result == 'undefined' || result !== false) {
	        if (isSelected) {
	          if (Array.isArray(result)) {
	            selectedRowKeys = result;
	          } else {
	            var currentRowKeys = rows.map(function (r) {
	              return r[keyField];
	            });
	            // onlyUnselectVisible default is false, #1276
	            if (onlyUnselectVisible) {
	              selectedRowKeys = selectedRowKeys.concat(currentRowKeys);
	            } else {
	              selectedRowKeys = currentRowKeys;
	            }
	          }
	        } else {
	          if (unselectable && selected) {
	            selectedRowKeys = selected.filter(function (r) {
	              return unselectable.indexOf(r) > -1;
	            });
	          } else if (onlyUnselectVisible) {
	            var _currentRowKeys = rows.map(function (r) {
	              return r[keyField];
	            });
	            selectedRowKeys = selectedRowKeys.filter(function (k) {
	              return _currentRowKeys.indexOf(k) === -1;
	            });
	          }
	        }

	        this.store.setSelectedRowKey(selectedRowKeys);
	        this.setState(function () {
	          return { selectedRowKeys: selectedRowKeys, reset: false };
	        });
	      }
	    }
	  }, {
	    key: '__handleShowOnlySelected__REACT_HOT_LOADER__',
	    value: function __handleShowOnlySelected__REACT_HOT_LOADER__() {
	      this.store.ignoreNonSelected();
	      var pageStartIndex = this.props.options.pageStartIndex;

	      var result = void 0;
	      if (this.props.pagination) {
	        result = this.store.page(_util2.default.getNormalizedPage(pageStartIndex), this.state.sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      this.setState(function () {
	        return {
	          data: result,
	          reset: false,
	          currPage: _util2.default.getFirstPage(pageStartIndex)
	        };
	      });
	    }
	  }, {
	    key: '__handleSelectRow__REACT_HOT_LOADER__',
	    value: function __handleSelectRow__REACT_HOT_LOADER__(row, isSelected, e, rowIndex) {
	      var result = true;
	      var currSelected = this.store.getSelectedRowKeys();
	      var rowKey = row[this.store.getKeyField()];
	      var selectRow = this.props.selectRow;

	      if (selectRow.onSelect) {
	        result = selectRow.onSelect(row, isSelected, e, rowIndex);
	      }

	      if (typeof result === 'undefined' || result !== false) {
	        if (selectRow.mode === _Const2.default.ROW_SELECT_SINGLE) {
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
	        this.setState(function () {
	          return {
	            selectedRowKeys: currSelected,
	            reset: false
	          };
	        });
	      }
	    }
	  }, {
	    key: '__handleEditCell__REACT_HOT_LOADER__',
	    value: function __handleEditCell__REACT_HOT_LOADER__(newVal, rowIndex, colIndex) {
	      var _this8 = this;

	      var beforeSaveCell = this.props.cellEdit.beforeSaveCell;

	      var columns = this.getColumnsDescription(this.props);
	      var fieldName = columns[colIndex].name;

	      var invalid = function invalid() {
	        _this8.setState(function () {
	          return {
	            data: _this8.store.get(),
	            reset: false
	          };
	        });
	        return;
	      };

	      if (beforeSaveCell) {
	        var beforeSaveCellCB = function beforeSaveCellCB(result) {
	          _this8.body.cancelEditCell();
	          if (result || result === undefined) {
	            _this8.editCell(newVal, rowIndex, colIndex);
	          } else {
	            invalid();
	          }
	        };
	        var props = { rowIndex: rowIndex, colIndex: colIndex };
	        var isValid = beforeSaveCell(this.state.data[rowIndex], fieldName, newVal, beforeSaveCellCB, props);
	        if (isValid === false && typeof isValid !== 'undefined') {
	          return invalid();
	        } else if (isValid === _Const2.default.AWAIT_BEFORE_CELL_EDIT) {
	          /* eslint consistent-return: 0 */
	          return isValid;
	        }
	      }
	      this.editCell(newVal, rowIndex, colIndex);
	    }
	  }, {
	    key: 'editCell',
	    value: function editCell(newVal, rowIndex, colIndex) {
	      var onCellEdit = this.props.options.onCellEdit;
	      var afterSaveCell = this.props.cellEdit.afterSaveCell;

	      var columns = this.getColumnsDescription(this.props);
	      var fieldName = columns[colIndex].name;
	      var props = { rowIndex: rowIndex, colIndex: colIndex };
	      if (onCellEdit) {
	        newVal = onCellEdit(this.state.data[rowIndex], fieldName, newVal);
	      }

	      if (this.allowRemote(_Const2.default.REMOTE_CELL_EDIT)) {
	        if (afterSaveCell) {
	          afterSaveCell(this.state.data[rowIndex], fieldName, newVal, props);
	        }
	        return;
	      }

	      var result = this.store.edit(newVal, rowIndex, fieldName).get();
	      this.setState(function () {
	        return {
	          data: result,
	          reset: false
	        };
	      });

	      if (afterSaveCell) {
	        afterSaveCell(this.state.data[rowIndex], fieldName, newVal, props);
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
	      this._handleAfterAddingRow(newObj, true);
	    }
	  }, {
	    key: '__handleAddRow__REACT_HOT_LOADER__',
	    value: function __handleAddRow__REACT_HOT_LOADER__(newObj) {
	      var _this9 = this;

	      var isAsync = false;
	      var onAddRow = this.props.options.onAddRow;


	      var afterHandleAddRow = function afterHandleAddRow(errMsg) {
	        if (isAsync) {
	          _this9.toolbar.afterHandleSaveBtnClick(errMsg);
	        } else {
	          return errMsg;
	        }
	      };

	      var afterAddRowCB = function afterAddRowCB(errMsg) {
	        if (typeof errMsg !== 'undefined' && errMsg !== '') return afterHandleAddRow(errMsg);
	        if (_this9.allowRemote(_Const2.default.REMOTE_INSERT_ROW)) {
	          if (_this9.props.options.afterInsertRow) {
	            _this9.props.options.afterInsertRow(newObj);
	          }
	          return afterHandleAddRow();
	        }

	        try {
	          _this9.store.add(newObj);
	        } catch (e) {
	          return afterHandleAddRow(e.message);
	        }
	        _this9._handleAfterAddingRow(newObj, false);
	        return afterHandleAddRow();
	      };

	      if (onAddRow) {
	        var colInfos = this.store.getColInfos();
	        var errMsg = onAddRow(newObj, colInfos, afterAddRowCB);

	        if (errMsg !== '' && errMsg !== false) {
	          return errMsg;
	        } else if (typeof errMsg === 'undefined') {
	          return afterAddRowCB();
	        } else {
	          isAsync = true;
	          return !isAsync;
	        }
	      } else {
	        return afterAddRowCB();
	      }
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
	    key: 'getTableDataIgnorePaging',
	    value: function getTableDataIgnorePaging() {
	      return this.store.getCurrentDisplayData();
	    }
	  }, {
	    key: '__getPageByRowKey__REACT_HOT_LOADER__',
	    value: function __getPageByRowKey__REACT_HOT_LOADER__(rowKey) {
	      var sizePerPage = this.state.sizePerPage;

	      var currentData = this.store.getCurrentDisplayData();
	      var keyField = this.store.getKeyField();
	      var result = currentData.findIndex(function (x) {
	        return x[keyField] === rowKey;
	      });
	      if (result > -1) {
	        return parseInt(result / sizePerPage, 10) + 1;
	      } else {
	        return result;
	      }
	    }
	  }, {
	    key: '__handleDropRow__REACT_HOT_LOADER__',
	    value: function __handleDropRow__REACT_HOT_LOADER__(rowKeys) {
	      var _this10 = this;

	      var dropRowKeys = rowKeys ? rowKeys : this.store.getSelectedRowKeys();
	      // add confirm before the delete action if that option is set.
	      if (dropRowKeys && dropRowKeys.length > 0) {
	        if (this.props.options.handleConfirmDeleteRow) {
	          this.props.options.handleConfirmDeleteRow(function () {
	            _this10.deleteRow(dropRowKeys);
	          }, dropRowKeys);
	        } else if (confirm('Are you sure you want to delete?')) {
	          this.deleteRow(dropRowKeys);
	        }
	      }
	    }
	  }, {
	    key: 'deleteRow',
	    value: function deleteRow(dropRowKeys) {
	      var _this11 = this;

	      var dropRow = this.store.getRowByKey(dropRowKeys);
	      var _props$options2 = this.props.options,
	          onDeleteRow = _props$options2.onDeleteRow,
	          afterDeleteRow = _props$options2.afterDeleteRow,
	          pageStartIndex = _props$options2.pageStartIndex;


	      if (onDeleteRow) {
	        onDeleteRow(dropRowKeys, dropRow);
	      }

	      this.store.setSelectedRowKey([]); // clear selected row key

	      if (this.allowRemote(_Const2.default.REMOTE_DROP_ROW)) {
	        if (afterDeleteRow) {
	          afterDeleteRow(dropRowKeys, dropRow);
	        }
	        return;
	      }

	      this.store.remove(dropRowKeys); // remove selected Row
	      var result = void 0;
	      if (this.props.pagination) {
	        // debugger;
	        var sizePerPage = this.state.sizePerPage;

	        var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
	        var currPage = this.state.currPage;

	        if (currPage > currLastPage) currPage = currLastPage;
	        // console.log(Util.getNormalizedPage(currPage));
	        result = this.store.page(_util2.default.getNormalizedPage(pageStartIndex, currPage), sizePerPage).get();
	        this.setState(function () {
	          return {
	            data: result,
	            selectedRowKeys: _this11.store.getSelectedRowKeys(),
	            currPage: currPage,
	            reset: false
	          };
	        });
	      } else {
	        result = this.store.get();
	        this.setState(function () {
	          return {
	            data: result,
	            reset: false,
	            selectedRowKeys: _this11.store.getSelectedRowKeys()
	          };
	        });
	      }
	      if (afterDeleteRow) {
	        afterDeleteRow(dropRowKeys, dropRow);
	      }
	    }
	  }, {
	    key: '__handleFilterData__REACT_HOT_LOADER__',
	    value: function __handleFilterData__REACT_HOT_LOADER__(filterObj) {
	      var _props4 = this.props,
	          filter = _props4.autoCollapse.filter,
	          options = _props4.options;
	      var onFilterChange = options.onFilterChange,
	          pageStartIndex = options.pageStartIndex;

	      if (onFilterChange) {
	        var colInfos = this.store.getColInfos();
	        onFilterChange(filterObj, colInfos);
	      }

	      this.setState(function () {
	        var newState = {
	          currPage: _util2.default.getFirstPage(pageStartIndex),
	          reset: false
	        };
	        if (filter) newState.expanding = [];
	        return newState;
	      });

	      if (this.allowRemote(_Const2.default.REMOTE_FILTER)) {
	        if (this.props.options.afterColumnFilter) {
	          this.props.options.afterColumnFilter(filterObj, this.store.getDataIgnoringPagination());
	        }
	        return;
	      }

	      this.store.filter(filterObj);

	      var sortList = this.store.getSortInfo();

	      if (sortList.length > 0) {
	        this.store.sort();
	      }

	      var result = void 0;

	      if (this.props.pagination) {
	        var sizePerPage = this.state.sizePerPage;

	        result = this.store.page(_util2.default.getNormalizedPage(pageStartIndex), sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      if (this.props.options.afterColumnFilter) {
	        this.props.options.afterColumnFilter(filterObj, this.store.getDataIgnoringPagination());
	      }
	      this.setState(function () {
	        return {
	          data: result,
	          reset: false
	        };
	      });
	    }
	  }, {
	    key: '__handleExportCSV__REACT_HOT_LOADER__',
	    value: function __handleExportCSV__REACT_HOT_LOADER__() {
	      var result = {};

	      var csvFileName = this.props.csvFileName;
	      var _props$options3 = this.props.options,
	          onExportToCSV = _props$options3.onExportToCSV,
	          exportCSVSeparator = _props$options3.exportCSVSeparator,
	          noAutoBOM = _props$options3.noAutoBOM,
	          excludeCSVHeader = _props$options3.excludeCSVHeader;

	      if (onExportToCSV) {
	        result = onExportToCSV();
	      } else {
	        result = this.store.getDataIgnoringPagination();
	      }
	      var separator = exportCSVSeparator || _Const2.default.DEFAULT_CSV_SEPARATOR;
	      var keys = [];
	      this.props.children.filter(function (_) {
	        return _ != null;
	      }).map(function (column) {
	        if (column.props.export === true || typeof column.props.export === 'undefined' && column.props.hidden === false) {
	          keys.push({
	            field: column.props.dataField,
	            type: column.props.csvFieldType,
	            format: column.props.csvFormat,
	            extraData: column.props.csvFormatExtraData,
	            header: column.props.csvHeader || column.props.dataField,
	            row: Number(column.props.row) || 0,
	            rowSpan: Number(column.props.rowSpan) || 1,
	            colSpan: Number(column.props.colSpan) || 1
	          });
	        }
	      });

	      if (_util2.default.isFunction(csvFileName)) {
	        csvFileName = csvFileName();
	      }

	      (0, _csv_export_util2.default)(result, keys, csvFileName, separator, noAutoBOM, excludeCSVHeader);
	    }
	  }, {
	    key: '__handleSearch__REACT_HOT_LOADER__',
	    value: function __handleSearch__REACT_HOT_LOADER__(searchText) {
	      // Set search field if this function being called outside
	      // but it's not necessary if calling fron inside.
	      if (this.toolbar) {
	        this.toolbar.setSearchInput(searchText);
	      }
	      var search = this.props.autoCollapse.search;
	      var _props$options4 = this.props.options,
	          onSearchChange = _props$options4.onSearchChange,
	          pageStartIndex = _props$options4.pageStartIndex;

	      if (onSearchChange) {
	        var colInfos = this.store.getColInfos();
	        onSearchChange(searchText, colInfos, this.props.multiColumnSearch);
	      }

	      this.setState(function () {
	        var newState = {
	          currPage: _util2.default.getFirstPage(pageStartIndex),
	          reset: false
	        };
	        if (search) newState.expanding = [];
	        return newState;
	      });

	      if (this.allowRemote(_Const2.default.REMOTE_SEARCH)) {
	        if (this.props.options.afterSearch) {
	          this.props.options.afterSearch(searchText, this.store.getDataIgnoringPagination());
	        }
	        return;
	      }

	      this.store.search(searchText);

	      var sortList = this.store.getSortInfo();

	      if (sortList.length > 0) {
	        this.store.sort();
	      }

	      var result = void 0;
	      if (this.props.pagination) {
	        var sizePerPage = this.state.sizePerPage;

	        result = this.store.page(_util2.default.getNormalizedPage(pageStartIndex), sizePerPage).get();
	      } else {
	        result = this.store.get();
	      }
	      if (this.props.options.afterSearch) {
	        this.props.options.afterSearch(searchText, this.store.getDataIgnoringPagination());
	      }
	      this.setState(function () {
	        return {
	          data: result,
	          reset: false
	        };
	      });
	    }
	  }, {
	    key: 'renderPagination',
	    value: function renderPagination() {
	      var _this12 = this;

	      if (this.props.pagination) {
	        var dataSize = void 0;
	        if (this.allowRemote(_Const2.default.REMOTE_PAGE)) {
	          dataSize = this.props.fetchInfo.dataTotalSize;
	        } else {
	          dataSize = this.store.getDataNum();
	        }
	        var options = this.props.options;

	        var withFirstAndLast = options.withFirstAndLast === undefined ? true : options.withFirstAndLast;
	        if (Math.ceil(dataSize / this.state.sizePerPage) <= 1 && this.props.ignoreSinglePage) return null;
	        return _react2.default.createElement(
	          'div',
	          { className: 'react-bs-table-pagination' },
	          _react2.default.createElement(_PaginationList2.default, {
	            ref: function ref(node) {
	              return _this12.pagination = node;
	            },
	            version: this.props.version,
	            withFirstAndLast: withFirstAndLast,
	            alwaysShowAllBtns: options.alwaysShowAllBtns,
	            currPage: this.state.currPage,
	            changePage: this.handlePaginationData,
	            sizePerPage: this.state.sizePerPage,
	            sizePerPageList: options.sizePerPageList || _Const2.default.SIZE_PER_PAGE_LIST,
	            pageStartIndex: options.pageStartIndex,
	            paginationShowsTotal: options.paginationShowsTotal,
	            paginationSize: options.paginationSize || _Const2.default.PAGINATION_SIZE,
	            dataSize: dataSize,
	            onSizePerPageList: options.onSizePerPageList,
	            prePage: options.prePage || _Const2.default.PRE_PAGE,
	            nextPage: options.nextPage || _Const2.default.NEXT_PAGE,
	            firstPage: options.firstPage || _Const2.default.FIRST_PAGE,
	            lastPage: options.lastPage || _Const2.default.LAST_PAGE,
	            prePageTitle: options.prePageTitle || _Const2.default.PRE_PAGE_TITLE,
	            nextPageTitle: options.nextPageTitle || _Const2.default.NEXT_PAGE_TITLE,
	            firstPageTitle: options.firstPageTitle || _Const2.default.FIRST_PAGE_TITLE,
	            lastPageTitle: options.lastPageTitle || _Const2.default.LAST_PAGE_TITLE,
	            hideSizePerPage: options.hideSizePerPage,
	            sizePerPageDropDown: options.sizePerPageDropDown,
	            hidePageListOnlyOnePage: options.hidePageListOnlyOnePage,
	            paginationPanel: options.paginationPanel,
	            keepSizePerPageState: options.keepSizePerPageState,
	            open: false })
	        );
	      }
	      return null;
	    }
	  }, {
	    key: 'renderToolBar',
	    value: function renderToolBar() {
	      var _this13 = this;

	      var _props5 = this.props,
	          exportCSV = _props5.exportCSV,
	          selectRow = _props5.selectRow,
	          insertRow = _props5.insertRow,
	          deleteRow = _props5.deleteRow,
	          search = _props5.search,
	          children = _props5.children,
	          keyField = _props5.keyField;

	      var enableShowOnlySelected = selectRow && selectRow.showOnlySelected;
	      var print = typeof this.props.options.printToolBar === 'undefined' ? true : this.props.options.printToolBar;
	      if (enableShowOnlySelected || insertRow || deleteRow || search || exportCSV || this.props.options.searchPanel || this.props.options.btnGroup || this.props.options.toolBar) {
	        var columns = void 0;
	        if (Array.isArray(children)) {
	          columns = children.filter(function (_) {
	            return _ != null;
	          }).map(function (column, r) {
	            if (!column) return;
	            var props = column.props;

	            var isKey = props.isKey || keyField === props.dataField;
	            return {
	              isKey: isKey,
	              name: props.headerText || props.children,
	              field: props.dataField,
	              hiddenOnInsert: props.hiddenOnInsert,
	              keyValidator: props.keyValidator,
	              customInsertEditor: props.customInsertEditor,
	              // when you want same auto generate value and not allow edit, example ID field
	              autoValue: props.autoValue || false,
	              // for create editor, no params for column.editable() indicate that editor for new row
	              editable: props.editable && _util2.default.isFunction(props.editable === 'function') ? props.editable() : props.editable,
	              format: props.dataFormat ? function (value) {
	                return props.dataFormat(value, null, props.formatExtraData, r).replace(/<.*?>/g, '');
	              } : false
	            };
	          });
	        } else {
	          columns = [{
	            name: children.props.headerText || children.props.children,
	            field: children.props.dataField,
	            editable: children.props.editable,
	            customInsertEditor: children.props.customInsertEditor,
	            hiddenOnInsert: children.props.hiddenOnInsert,
	            keyValidator: children.props.keyValidator
	          }];
	        }
	        return _react2.default.createElement(
	          'div',
	          { className: 'react-bs-table-tool-bar ' + (print ? '' : 'hidden-print') },
	          _react2.default.createElement(_ToolBar2.default, {
	            ref: function ref(node) {
	              return _this13.toolbar = node;
	            },
	            version: this.props.version,
	            defaultSearch: this.props.options.defaultSearch,
	            clearSearch: this.props.options.clearSearch,
	            searchPosition: this.props.options.searchPosition,
	            searchDelayTime: this.props.options.searchDelayTime,
	            enableInsert: insertRow,
	            enableDelete: deleteRow,
	            enableSearch: search,
	            enableExportCSV: exportCSV,
	            enableShowOnlySelected: enableShowOnlySelected,
	            columns: columns,
	            searchPlaceholder: this.props.searchPlaceholder,
	            exportCSVText: this.props.options.exportCSVText,
	            insertText: this.props.options.insertText,
	            deleteText: this.props.options.deleteText,
	            saveText: this.props.options.saveText,
	            closeText: this.props.options.closeText,
	            ignoreEditable: this.props.options.ignoreEditable,
	            onAddRow: this.handleAddRow,
	            onDropRow: this.handleDropRow,
	            onSearch: this.handleSearch,
	            onExportCSV: this.handleExportCSV,
	            onShowOnlySelected: this.handleShowOnlySelected,
	            insertModalHeader: this.props.options.insertModalHeader,
	            insertModalFooter: this.props.options.insertModalFooter,
	            insertModalBody: this.props.options.insertModalBody,
	            insertModal: this.props.options.insertModal,
	            insertBtn: this.props.options.insertBtn,
	            deleteBtn: this.props.options.deleteBtn,
	            showSelectedOnlyBtn: this.props.options.showSelectedOnlyBtn,
	            exportCSVBtn: this.props.options.exportCSVBtn,
	            clearSearchBtn: this.props.options.clearSearchBtn,
	            searchField: this.props.options.searchField,
	            searchPanel: this.props.options.searchPanel,
	            btnGroup: this.props.options.btnGroup,
	            toolBar: this.props.options.toolBar,
	            reset: this.state.reset,
	            isValidKey: this.store.isValidKey,
	            insertFailIndicator: this.props.options.insertFailIndicator || _Const2.default.INSERT_FAIL_INDICATOR })
	        );
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'renderTableFilter',
	    value: function renderTableFilter(columns) {
	      if (this.props.columnFilter) {
	        return _react2.default.createElement(_TableFilter2.default, { columns: columns,
	          rowSelectType: this.props.selectRow.mode,
	          onFilter: this.handleFilterData });
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'renderTableFooter',
	    value: function renderTableFooter(footerData, footerFormatterReturnData, columns, colGroups) {
	      var _this14 = this;

	      if (this.props.footer) {
	        var hideSelectColumn = true;
	        var mode = this.props.selectRow.mode;

	        var isSelectRowDefined = _util2.default.isSelectRowDefined(mode);
	        if (isSelectRowDefined) {
	          hideSelectColumn = this.props.selectRow.hideSelectColumn;
	        }
	        return _react2.default.createElement(
	          _TableFooter2.default,
	          {
	            ref: function ref(node) {
	              return _this14.footer = node;
	            },
	            columns: columns,
	            colGroups: colGroups,
	            footerFormatterReturnData: footerFormatterReturnData,
	            tableFooterClass: this.props.tableFooterClass,
	            style: this.props.headerStyle,
	            hideSelectColumn: hideSelectColumn,
	            expandColumnVisible: this.props.expandColumnOptions.expandColumnVisible,
	            bordered: this.props.bordered,
	            condensed: this.props.condensed,
	            isFiltered: this.filter ? true : false,
	            showStickyColumn: this.props.showStickyColumn },
	          footerData
	        );
	      }
	      return null;
	    }
	  }, {
	    key: '___scrollTop__REACT_HOT_LOADER__',
	    value: function ___scrollTop__REACT_HOT_LOADER__() {
	      var scrollTop = this.props.scrollTop;

	      if (scrollTop === _Const2.default.SCROLL_TOP) {
	        this.body.container.scrollTop = 0;
	      } else if (scrollTop === _Const2.default.SCROLL_BOTTOM) {
	        this.body.container.scrollTop = this.body.container.scrollHeight;
	      } else if (typeof scrollTop === 'number' && !isNaN(scrollTop)) {
	        this.body.container.scrollTop = scrollTop;
	      }
	    }
	  }, {
	    key: '___scrollHeader__REACT_HOT_LOADER__',
	    value: function ___scrollHeader__REACT_HOT_LOADER__(e) {
	      this.header.container.scrollLeft = e.currentTarget.scrollLeft;
	    }
	  }, {
	    key: '___scrollFooter__REACT_HOT_LOADER__',
	    value: function ___scrollFooter__REACT_HOT_LOADER__(e) {
	      if (this.props.footer) {
	        this.footer.container.scrollLeft = e.currentTarget.scrollLeft;
	      }
	    }
	  }, {
	    key: '_adjustTable',
	    value: function _adjustTable() {
	      this._adjustHeight();
	      if (!this.props.printable) {
	        this._adjustHeaderWidth();
	      }
	    }
	  }, {
	    key: '_adjustHeaderWidth',
	    value: function _adjustHeaderWidth() {
	      var header = this.header.getHeaderColGrouop();
	      var tbody = this.body.tbody;
	      var bodyHeader = this.body.getHeaderColGrouop();
	      var firstRow = tbody.childNodes[0];
	      var isScroll = tbody.parentNode.getBoundingClientRect().height > tbody.parentNode.parentNode.getBoundingClientRect().height;

	      var scrollBarWidth = isScroll ? _util2.default.getScrollBarWidth() : 0;
	      if (firstRow && this.store.getDataNum()) {
	        if (isScroll || this.isVerticalScroll !== isScroll) {
	          var cells = firstRow.childNodes;
	          for (var i = 0; i < cells.length; i++) {
	            var cell = cells[i];
	            var computedStyle = window.getComputedStyle(cell);
	            var width = parseFloat(computedStyle.width.replace('px', ''));
	            if (this.isIE) {
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
	            header[i].style.width = result;
	            header[i].style.minWidth = result;
	            if (cells.length - 1 === i) {
	              bodyHeader[i].style.width = width + 'px';
	              bodyHeader[i].style.minWidth = width + 'px';
	            } else {
	              bodyHeader[i].style.width = result;
	              bodyHeader[i].style.minWidth = result;
	            }
	          }
	        }
	      } else {
	        for (var _i in bodyHeader) {
	          if (bodyHeader.hasOwnProperty(_i)) {
	            var child = bodyHeader[_i];
	            if (child.style) {
	              if (child.style.width) {
	                header[_i].style.width = child.style.width;
	              }
	              if (child.style.minWidth) {
	                header[_i].style.minWidth = child.style.minWidth;
	              }
	            }
	          }
	        }
	      }
	      this.isVerticalScroll = isScroll;
	    }
	  }, {
	    key: '_adjustHeight',
	    value: function _adjustHeight() {
	      var height = this.props.height;
	      var maxHeight = this.props.maxHeight;

	      if (typeof height === 'number' && !isNaN(height) || height.indexOf('%') === -1) {
	        this.body.container.style.height = parseFloat(height, 10) - this.header.container.offsetHeight + 'px';
	      }
	      if (maxHeight) {
	        maxHeight = typeof maxHeight === 'number' ? maxHeight : parseInt(maxHeight.replace('px', ''), 10);

	        this.body.container.style.maxHeight = maxHeight - this.header.container.offsetHeight + 'px';
	      }
	    }
	  }, {
	    key: '_handleAfterAddingRow',
	    value: function _handleAfterAddingRow(newObj, atTheBeginning) {
	      var result = void 0;
	      if (this.props.pagination) {
	        // if pagination is enabled and inserting row at the end,
	        // change page to the last page
	        // otherwise, change it to the first page
	        var sizePerPage = this.state.sizePerPage;


	        if (atTheBeginning) {
	          var pageStartIndex = this.props.options.pageStartIndex;

	          result = this.store.page(_util2.default.getNormalizedPage(pageStartIndex), sizePerPage).get();
	          this.setState(function () {
	            return {
	              data: result,
	              currPage: _util2.default.getFirstPage(pageStartIndex),
	              reset: false
	            };
	          });
	        } else {
	          var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
	          result = this.store.page(currLastPage, sizePerPage).get();
	          this.setState(function () {
	            return {
	              data: result,
	              currPage: currLastPage,
	              reset: false
	            };
	          });
	        }
	      } else {
	        result = this.store.get();
	        this.setState(function () {
	          return {
	            data: result,
	            reset: false
	          };
	        });
	      }

	      if (this.props.options.afterInsertRow) {
	        this.props.options.afterInsertRow(newObj);
	      }
	    }
	  }]);

	  return BootstrapTable;
	}(_react.Component);

	BootstrapTable.propTypes = {
	  keyField: _propTypes2.default.string,
	  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	  maxHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
	  version: _propTypes2.default.string, // bootstrap version
	  remote: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]), // remote data, default is false
	  replace: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
	  scrollTop: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	  striped: _propTypes2.default.bool,
	  bordered: _propTypes2.default.bool,
	  hover: _propTypes2.default.bool,
	  condensed: _propTypes2.default.bool,
	  pagination: _propTypes2.default.bool,
	  printable: _propTypes2.default.bool,
	  withoutTabIndex: _propTypes2.default.bool,
	  keyBoardNav: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
	  searchPlaceholder: _propTypes2.default.string,
	  selectRow: _propTypes2.default.shape({
	    mode: _propTypes2.default.oneOf([_Const2.default.ROW_SELECT_NONE, _Const2.default.ROW_SELECT_SINGLE, _Const2.default.ROW_SELECT_MULTI]),
	    customComponent: _propTypes2.default.func,
	    bgColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	    selected: _propTypes2.default.array,
	    onSelect: _propTypes2.default.func,
	    onSelectAll: _propTypes2.default.func,
	    clickToSelect: _propTypes2.default.bool,
	    hideSelectColumn: _propTypes2.default.bool,
	    clickToSelectAndEditCell: _propTypes2.default.bool,
	    clickToExpand: _propTypes2.default.bool,
	    showOnlySelected: _propTypes2.default.bool,
	    unselectable: _propTypes2.default.array,
	    columnWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    onlyUnselectVisible: _propTypes2.default.bool
	  }),
	  cellEdit: _propTypes2.default.shape({
	    mode: _propTypes2.default.string,
	    blurToSave: _propTypes2.default.bool,
	    blurToEscape: _propTypes2.default.bool,
	    beforeSaveCell: _propTypes2.default.func,
	    afterSaveCell: _propTypes2.default.func,
	    nonEditableRows: _propTypes2.default.func
	  }),
	  insertRow: _propTypes2.default.bool,
	  deleteRow: _propTypes2.default.bool,
	  search: _propTypes2.default.bool,
	  multiColumnSearch: _propTypes2.default.bool,
	  strictSearch: _propTypes2.default.bool,
	  columnFilter: _propTypes2.default.bool,
	  trClassName: _propTypes2.default.any,
	  trStyle: _propTypes2.default.any,
	  tableStyle: _propTypes2.default.object,
	  containerStyle: _propTypes2.default.object,
	  headerStyle: _propTypes2.default.object,
	  bodyStyle: _propTypes2.default.object,
	  containerClass: _propTypes2.default.string,
	  tableContainerClass: _propTypes2.default.string,
	  headerContainerClass: _propTypes2.default.string,
	  bodyContainerClass: _propTypes2.default.string,
	  tableHeaderClass: _propTypes2.default.string,
	  tableBodyClass: _propTypes2.default.string,
	  tableFooterClass: _propTypes2.default.string,
	  options: _propTypes2.default.shape({
	    clearSearch: _propTypes2.default.bool,
	    sortName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
	    sortOrder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
	    defaultSortName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
	    defaultSortOrder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
	    sortIndicator: _propTypes2.default.bool,
	    afterTableComplete: _propTypes2.default.func,
	    afterDeleteRow: _propTypes2.default.func,
	    afterInsertRow: _propTypes2.default.func,
	    afterSearch: _propTypes2.default.func,
	    afterColumnFilter: _propTypes2.default.func,
	    onRowClick: _propTypes2.default.func,
	    onRowDoubleClick: _propTypes2.default.func,
	    page: _propTypes2.default.number,
	    pageStartIndex: _propTypes2.default.number,
	    paginationShowsTotal: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
	    sizePerPageList: _propTypes2.default.array,
	    sizePerPage: _propTypes2.default.number,
	    paginationSize: _propTypes2.default.number,
	    paginationPosition: _propTypes2.default.oneOf([_Const2.default.PAGINATION_POS_TOP, _Const2.default.PAGINATION_POS_BOTTOM, _Const2.default.PAGINATION_POS_BOTH]),
	    toolbarPosition: _propTypes2.default.oneOf([_Const2.default.TOOLBAR_POS_TOP, _Const2.default.TOOLBAR_POS_BOTTOM, _Const2.default.TOOLBAR_POS_BOTH]),
	    hideSizePerPage: _propTypes2.default.bool,
	    hidePageListOnlyOnePage: _propTypes2.default.bool,
	    alwaysShowAllBtns: _propTypes2.default.bool,
	    withFirstAndLast: _propTypes2.default.bool,
	    keepSizePerPageState: _propTypes2.default.bool,
	    onSortChange: _propTypes2.default.func,
	    onPageChange: _propTypes2.default.func,
	    onSizePerPageList: _propTypes2.default.func,
	    onFilterChange: _propTypes2.default.func,
	    onSearchChange: _propTypes2.default.func,
	    onAddRow: _propTypes2.default.func,
	    onExportToCSV: _propTypes2.default.func,
	    onCellEdit: _propTypes2.default.func,
	    noDataText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
	    withoutNoDataText: _propTypes2.default.bool,
	    handleConfirmDeleteRow: _propTypes2.default.func,
	    prePage: _propTypes2.default.any,
	    nextPage: _propTypes2.default.any,
	    firstPage: _propTypes2.default.any,
	    lastPage: _propTypes2.default.any,
	    prePageTitle: _propTypes2.default.string,
	    nextPageTitle: _propTypes2.default.string,
	    firstPageTitle: _propTypes2.default.string,
	    lastPageTitle: _propTypes2.default.string,
	    searchDelayTime: _propTypes2.default.number,
	    excludeCSVHeader: _propTypes2.default.bool,
	    exportCSVText: _propTypes2.default.string,
	    exportCSVSeparator: _propTypes2.default.string,
	    insertText: _propTypes2.default.string,
	    deleteText: _propTypes2.default.string,
	    saveText: _propTypes2.default.string,
	    closeText: _propTypes2.default.string,
	    ignoreEditable: _propTypes2.default.bool,
	    defaultSearch: _propTypes2.default.string,
	    insertModalHeader: _propTypes2.default.func,
	    insertModalBody: _propTypes2.default.func,
	    insertModalFooter: _propTypes2.default.func,
	    insertModal: _propTypes2.default.func,
	    insertBtn: _propTypes2.default.func,
	    deleteBtn: _propTypes2.default.func,
	    showSelectedOnlyBtn: _propTypes2.default.func,
	    exportCSVBtn: _propTypes2.default.func,
	    clearSearchBtn: _propTypes2.default.func,
	    searchField: _propTypes2.default.func,
	    searchPanel: _propTypes2.default.func,
	    btnGroup: _propTypes2.default.func,
	    toolBar: _propTypes2.default.func,
	    sizePerPageDropDown: _propTypes2.default.func,
	    paginationPanel: _propTypes2.default.func,
	    searchPosition: _propTypes2.default.string,
	    expandRowBgColor: _propTypes2.default.string,
	    expandBy: _propTypes2.default.string,
	    expanding: _propTypes2.default.array,
	    onExpand: _propTypes2.default.func,
	    onlyOneExpanding: _propTypes2.default.bool,
	    expandBodyClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	    expandParentClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	    beforeShowError: _propTypes2.default.func,
	    printToolBar: _propTypes2.default.bool,
	    insertFailIndicator: _propTypes2.default.string,
	    noAutoBOM: _propTypes2.default.bool,
	    expandAll: _propTypes2.default.bool,
	    hideRowOnExpand: _propTypes2.default.bool
	  }),
	  fetchInfo: _propTypes2.default.shape({
	    dataTotalSize: _propTypes2.default.number
	  }),
	  renderAlert: _propTypes2.default.bool,
	  exportCSV: _propTypes2.default.bool,
	  csvFileName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  ignoreSinglePage: _propTypes2.default.bool,
	  expandableRow: _propTypes2.default.func,
	  expandComponent: _propTypes2.default.func,
	  autoCollapse: _propTypes2.default.shape({
	    sort: _propTypes2.default.bool,
	    filter: _propTypes2.default.bool,
	    search: _propTypes2.default.bool
	  }),
	  expandColumnOptions: _propTypes2.default.shape({
	    columnWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    expandColumnVisible: _propTypes2.default.bool,
	    expandColumnComponent: _propTypes2.default.func,
	    expandedColumnHeaderComponent: _propTypes2.default.func,
	    expandColumnBeforeSelectColumn: _propTypes2.default.bool
	  }),
	  footer: _propTypes2.default.bool
	};
	BootstrapTable.defaultProps = {
	  version: '3',
	  replace: false,
	  scrollTop: undefined,
	  expandComponent: undefined,
	  expandableRow: undefined,
	  expandColumnOptions: {
	    expandColumnVisible: false,
	    expandColumnComponent: undefined,
	    expandedColumnHeaderComponent: undefined,
	    expandColumnBeforeSelectColumn: true
	  },
	  height: '100%',
	  maxHeight: undefined,
	  striped: false,
	  bordered: true,
	  hover: false,
	  condensed: false,
	  pagination: false,
	  printable: false,
	  withoutTabIndex: false,
	  keyBoardNav: false,
	  searchPlaceholder: undefined,
	  selectRow: {
	    mode: _Const2.default.ROW_SELECT_NONE,
	    bgColor: _Const2.default.ROW_SELECT_BG_COLOR,
	    selected: [],
	    onSelect: undefined,
	    onSelectAll: undefined,
	    clickToSelect: false,
	    hideSelectColumn: false,
	    clickToSelectAndEditCell: false,
	    clickToExpand: false,
	    showOnlySelected: false,
	    unselectable: [],
	    customComponent: undefined,
	    onlyUnselectVisible: false
	  },
	  cellEdit: {
	    mode: _Const2.default.CELL_EDIT_NONE,
	    blurToSave: false,
	    blurToEscape: false,
	    beforeSaveCell: undefined,
	    afterSaveCell: undefined,
	    nonEditableRows: undefined
	  },
	  insertRow: false,
	  deleteRow: false,
	  search: false,
	  multiColumnSearch: false,
	  strictSearch: undefined,
	  multiColumnSort: 1,
	  columnFilter: false,
	  trClassName: '',
	  trStyle: undefined,
	  tableStyle: undefined,
	  containerStyle: undefined,
	  headerStyle: undefined,
	  bodyStyle: undefined,
	  containerClass: null,
	  tableContainerClass: null,
	  headerContainerClass: null,
	  bodyContainerClass: null,
	  tableHeaderClass: null,
	  tableBodyClass: null,
	  tableFooterClass: null,
	  options: {
	    clearSearch: false,
	    sortName: undefined,
	    sortOrder: undefined,
	    defaultSortName: undefined,
	    defaultSortOrder: undefined,
	    sortIndicator: true,
	    afterTableComplete: undefined,
	    afterDeleteRow: undefined,
	    afterInsertRow: undefined,
	    afterSearch: undefined,
	    afterColumnFilter: undefined,
	    onRowClick: undefined,
	    onRowDoubleClick: undefined,
	    onMouseLeave: undefined,
	    onMouseEnter: undefined,
	    onRowMouseOut: undefined,
	    onRowMouseOver: undefined,
	    page: undefined,
	    paginationShowsTotal: false,
	    sizePerPageList: _Const2.default.SIZE_PER_PAGE_LIST,
	    sizePerPage: undefined,
	    paginationSize: _Const2.default.PAGINATION_SIZE,
	    paginationPosition: _Const2.default.PAGINATION_POS_BOTTOM,
	    toolbarPosition: _Const2.default.TOOLBAR_POS_TOP,
	    hideSizePerPage: false,
	    hidePageListOnlyOnePage: false,
	    alwaysShowAllBtns: false,
	    withFirstAndLast: true,
	    keepSizePerPageState: false,
	    onSizePerPageList: undefined,
	    noDataText: undefined,
	    withoutNoDataText: false,
	    handleConfirmDeleteRow: undefined,
	    prePage: _Const2.default.PRE_PAGE,
	    nextPage: _Const2.default.NEXT_PAGE,
	    firstPage: _Const2.default.FIRST_PAGE,
	    lastPage: _Const2.default.LAST_PAGE,
	    prePageTitle: _Const2.default.PRE_PAGE_TITLE,
	    nextPageTitle: _Const2.default.NEXT_PAGE_TITLE,
	    firstPageTitle: _Const2.default.FIRST_PAGE_TITLE,
	    lastPageTitle: _Const2.default.LAST_PAGE_TITLE,
	    pageStartIndex: 1,
	    searchDelayTime: undefined,
	    excludeCSVHeader: false,
	    exportCSVText: _Const2.default.EXPORT_CSV_TEXT,
	    exportCSVSeparator: _Const2.default.DEFAULT_CSV_SEPARATOR,
	    insertText: _Const2.default.INSERT_BTN_TEXT,
	    deleteText: _Const2.default.DELETE_BTN_TEXT,
	    saveText: _Const2.default.SAVE_BTN_TEXT,
	    closeText: _Const2.default.CLOSE_BTN_TEXT,
	    ignoreEditable: false,
	    defaultSearch: '',
	    insertModalHeader: undefined,
	    insertModalBody: undefined,
	    insertModalFooter: undefined,
	    insertModal: undefined,
	    insertBtn: undefined,
	    deleteBtn: undefined,
	    showSelectedOnlyBtn: undefined,
	    exportCSVBtn: undefined,
	    clearSearchBtn: undefined,
	    searchField: undefined,
	    searchPanel: undefined,
	    btnGroup: undefined,
	    toolBar: undefined,
	    sizePerPageDropDown: undefined,
	    paginationPanel: undefined,
	    searchPosition: 'right',
	    expandRowBgColor: undefined,
	    expandBy: _Const2.default.EXPAND_BY_ROW,
	    expanding: [],
	    onExpand: undefined,
	    onlyOneExpanding: false,
	    expandBodyClass: null,
	    expandParentClass: null,
	    beforeShowError: undefined,
	    printToolBar: true,
	    insertFailIndicator: _Const2.default.INSERT_FAIL_INDICATOR,
	    noAutoBOM: true,
	    expandAll: false,
	    hideRowOnExpand: false
	  },
	  fetchInfo: {
	    dataTotalSize: 0
	  },
	  renderAlert: true,
	  exportCSV: false,
	  csvFileName: 'spreadsheet.csv',
	  ignoreSinglePage: false,
	  autoCollapse: {
	    sort: _Const2.default.AUTO_COLLAPSE_WHEN_SORT,
	    filter: _Const2.default.AUTO_COLLAPSE_WHEN_FILTER,
	    search: _Const2.default.AUTO_COLLAPSE_WHEN_SEARCH
	  },
	  footer: false
	};

	var _default = BootstrapTable;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(BootstrapTable, 'BootstrapTable', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/BootstrapTable.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/BootstrapTable.js');
	}();

	;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(5)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(12)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(8);
	var assign = __webpack_require__(9);

	var ReactPropTypesSecret = __webpack_require__(10);
	var checkPropTypes = __webpack_require__(11);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
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

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
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
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
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
		} catch (err) {
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

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(7);
	  var warning = __webpack_require__(8);
	  var ReactPropTypesSecret = __webpack_require__(10);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var ReactPropTypesSecret = __webpack_require__(10);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(16), __webpack_require__(3), __webpack_require__(19), __webpack_require__(18), __webpack_require__(21)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports, require('react'), require('./SAlertContent'), require('prop-types'), require('./s-alert-parts/s-alert-store'), require('./s-alert-parts/s-alert-tools'), require('./s-alert-parts/s-alert-data-prep'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports, global.react, global.SAlertContent, global.propTypes, global.sAlertStore, global.sAlertTools, global.sAlertDataPrep);
	        global.SAlert = mod.exports;
	    }
	})(this, function (exports, _react, _SAlertContent, _propTypes, _sAlertStore, _sAlertTools, _sAlertDataPrep) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _react2 = _interopRequireDefault(_react);

	    var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

	    var _propTypes2 = _interopRequireDefault(_propTypes);

	    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

	    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

	    var _sAlertDataPrep2 = _interopRequireDefault(_sAlertDataPrep);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }

	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }

	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }

	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }

	    var _extends = Object.assign || function (target) {
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

	    var insertFunc = function insertFunc(msg, data, condition) {
	        var id = _sAlertTools2.default.randomId();
	        _sAlertStore2.default.dispatch({
	            type: 'INSERT',
	            data: _extends({}, data, {
	                id: id,
	                condition: condition,
	                message: msg
	            })
	        });
	        return id;
	    };

	    var SAlert = function (_React$Component) {
	        _inherits(SAlert, _React$Component);

	        function SAlert(props) {
	            _classCallCheck(this, SAlert);

	            var _this = _possibleConstructorReturn(this, (SAlert.__proto__ || Object.getPrototypeOf(SAlert)).call(this, props));

	            _this.state = {
	                dataRight: [],
	                dataLeft: [],
	                dataTop: [],
	                dataBottom: []
	            };
	            return _this;
	        }

	        _createClass(SAlert, [{
	            key: 'componentDidMount',
	            value: function componentDidMount() {
	                var _this2 = this;

	                var storeStateLeft = void 0;
	                var storeStateRight = void 0;
	                var storeStateTop = void 0;
	                var storeStateBottom = void 0;

	                var addToStoreRight = function addToStoreRight() {
	                    requestAnimationFrame(function () {
	                        return requestAnimationFrame(function () {
	                            var length = void 0;
	                            storeStateRight = (0, _sAlertDataPrep2.default)('right') || [];
	                            length = storeStateRight.length;
	                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
	                                var id = storeStateRight[0].id;
	                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
	                                storeStateRight = (0, _sAlertDataPrep2.default)('right') || [];
	                            }
	                            _this2.setState({ dataRight: storeStateRight });
	                        });
	                    });
	                };
	                this.unsubStoreRight = _sAlertStore2.default.subscribe(addToStoreRight);

	                var addToStoreLeft = function addToStoreLeft() {
	                    requestAnimationFrame(function () {
	                        return requestAnimationFrame(function () {
	                            var length = void 0;
	                            storeStateLeft = (0, _sAlertDataPrep2.default)('left') || [];
	                            length = storeStateLeft.length;
	                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
	                                var id = storeStateLeft[0].id;
	                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
	                                storeStateLeft = (0, _sAlertDataPrep2.default)('left') || [];
	                            }
	                            _this2.setState({ dataLeft: storeStateLeft });
	                        });
	                    });
	                };
	                this.unsubStoreLeft = _sAlertStore2.default.subscribe(addToStoreLeft);

	                var addToStoreTop = function addToStoreTop() {
	                    requestAnimationFrame(function () {
	                        return requestAnimationFrame(function () {
	                            var length = void 0;
	                            storeStateTop = (0, _sAlertDataPrep2.default)('full-top') || [];
	                            length = storeStateTop.length;
	                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
	                                var id = storeStateTop[0].id;
	                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
	                                storeStateTop = (0, _sAlertDataPrep2.default)('full-top') || [];
	                            }
	                            _this2.setState({ dataTop: storeStateTop });
	                        });
	                    });
	                };
	                this.unsubStoreTop = _sAlertStore2.default.subscribe(addToStoreTop);

	                var addToStoreBottom = function addToStoreBottom() {
	                    requestAnimationFrame(function () {
	                        return requestAnimationFrame(function () {
	                            var length = void 0;
	                            storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom') || [];
	                            length = storeStateBottom.length;
	                            if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
	                                var id = storeStateBottom[0].id;
	                                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
	                                storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom') || [];
	                            }
	                            _this2.setState({ dataBottom: storeStateBottom });
	                        });
	                    });
	                };
	                this.unsubStoreBottom = _sAlertStore2.default.subscribe(addToStoreBottom);

	                // set up global config from global SAlert props
	                // only stuff needed for getAlertData
	                var globalConfig = {
	                    contentTemplate: this.props.contentTemplate,
	                    offset: this.props.offset,
	                    message: this.props.message,
	                    stack: this.props.stack,
	                    html: this.props.html,
	                    customFields: this.props.customFields,
	                    position: this.props.position || 'top-right'
	                };
	                _sAlertTools2.default.setGlobalConfig(globalConfig);
	            }
	        }, {
	            key: 'componentWillUnmount',
	            value: function componentWillUnmount() {
	                this.unsubStoreTop();
	                this.unsubStoreBottom();
	                this.unsubStoreLeft();
	                this.unsubStoreRight();
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                var _this3 = this;

	                var mapFunc = function mapFunc(alert, index) {
	                    var customKey = 'alert-key-' + alert.id + '-' + alert.position;
	                    var id = alert.id;
	                    var condition = _sAlertTools2.default.returnFirstDefined(alert.condition, 'info');
	                    var message = _sAlertTools2.default.returnFirstDefined(alert.message, _this3.props.message, '');
	                    var position = _sAlertTools2.default.returnFirstDefined(alert.position, _this3.props.position, 'top-right');
	                    var offset = _sAlertTools2.default.returnFirstDefined(alert.offset, _this3.props.offset, 0);
	                    var effect = _sAlertTools2.default.returnFirstDefined(alert.effect, _this3.props.effect);
	                    var boxPosition = alert.boxPosition;
	                    var beep = _sAlertTools2.default.returnFirstDefined(alert.beep, _this3.props.beep, false);
	                    var timeout = _sAlertTools2.default.returnFirstDefined(alert.timeout, _this3.props.timeout, 5000);
	                    var html = _sAlertTools2.default.returnFirstDefined(alert.html, _this3.props.html);
	                    var onClose = _sAlertTools2.default.returnFirstDefined(alert.onClose, _this3.props.onClose);
	                    var onShow = _sAlertTools2.default.returnFirstDefined(alert.onShow, _this3.props.onShow);
	                    var customFields = _sAlertTools2.default.returnFirstDefined(alert.customFields, _this3.props.customFields);
	                    var contentTemplate = _this3.props.contentTemplate;
	                    return _react2.default.createElement(_SAlertContent2.default, {
	                        key: customKey,
	                        id: id,
	                        customFields: customFields,
	                        condition: condition,
	                        message: message,
	                        position: position,
	                        effect: effect,
	                        boxPosition: boxPosition,
	                        beep: beep,
	                        timeout: timeout,
	                        html: html,
	                        onClose: onClose,
	                        onShow: onShow,
	                        contentTemplate: contentTemplate });
	                };
	                var sAlertElemsRight = this.state.dataRight.map(mapFunc);
	                var sAlertElemsLeft = this.state.dataLeft.map(mapFunc);
	                var sAlertElemsTop = this.state.dataTop.map(mapFunc);
	                var sAlertElemsBottom = this.state.dataBottom.map(mapFunc);
	                return _react2.default.createElement(
	                    'div',
	                    { className: 's-alert-wrapper' },
	                    sAlertElemsRight,
	                    sAlertElemsLeft,
	                    sAlertElemsTop,
	                    sAlertElemsBottom
	                );
	            }
	        }], [{
	            key: 'info',
	            value: function info(msg, data) {
	                return insertFunc(msg, data, 'info');
	            }
	        }, {
	            key: 'error',
	            value: function error(msg, data) {
	                return insertFunc(msg, data, 'error');
	            }
	        }, {
	            key: 'warning',
	            value: function warning(msg, data) {
	                return insertFunc(msg, data, 'warning');
	            }
	        }, {
	            key: 'success',
	            value: function success(msg, data) {
	                return insertFunc(msg, data, 'success');
	            }
	        }, {
	            key: 'close',
	            value: function close(id) {
	                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
	            }
	        }, {
	            key: 'closeAll',
	            value: function closeAll() {
	                _sAlertStore2.default.dispatch({ type: 'REMOVEALL' });
	            }
	        }]);

	        return SAlert;
	    }(_react2.default.Component);

	    SAlert.propTypes = {
	        message: _propTypes2.default.string,
	        position: _propTypes2.default.string,
	        offset: _propTypes2.default.number,
	        stack: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
	        effect: _propTypes2.default.string,
	        beep: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.bool]),
	        timeout: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none']), _propTypes2.default.number]),
	        html: _propTypes2.default.bool,
	        onClose: _propTypes2.default.func,
	        onShow: _propTypes2.default.func,
	        customFields: _propTypes2.default.object,
	        contentTemplate: _propTypes2.default.func
	    };

	    exports.default = SAlert;
	});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(17), __webpack_require__(3), __webpack_require__(18), __webpack_require__(19), __webpack_require__(20)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports, require('react'), require('react-dom'), require('prop-types'), require('./s-alert-parts/s-alert-tools'), require('./s-alert-parts/s-alert-store'), require('./SAlertContentTmpl'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports, global.react, global.reactDom, global.propTypes, global.sAlertTools, global.sAlertStore, global.SAlertContentTmpl);
	        global.SAlertContent = mod.exports;
	    }
	})(this, function (exports, _react, _reactDom, _propTypes, _sAlertTools, _sAlertStore, _SAlertContentTmpl) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _react2 = _interopRequireDefault(_react);

	    var _reactDom2 = _interopRequireDefault(_reactDom);

	    var _propTypes2 = _interopRequireDefault(_propTypes);

	    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

	    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

	    var _SAlertContentTmpl2 = _interopRequireDefault(_SAlertContentTmpl);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	        return typeof obj;
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }

	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }

	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }

	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }

	    var SAlertContent = function (_React$Component) {
	        _inherits(SAlertContent, _React$Component);

	        function SAlertContent(props) {
	            _classCallCheck(this, SAlertContent);

	            return _possibleConstructorReturn(this, (SAlertContent.__proto__ || Object.getPrototypeOf(SAlertContent)).call(this, props));
	        }

	        _createClass(SAlertContent, [{
	            key: 'handleCloseAlert',
	            value: function handleCloseAlert() {
	                var closingTimeout = void 0;
	                var alertId = this.props.id;
	                var currentAlertElem = _reactDom2.default.findDOMNode(this);
	                var animationClose = function animationClose() {
	                    currentAlertElem.style.display = 'none';
	                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: alertId } });
	                    clearTimeout(closingTimeout);
	                };
	                if (document.hidden || document.webkitHidden || !currentAlertElem.classList.contains('s-alert-is-effect')) {
	                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: alertId } });
	                } else {
	                    currentAlertElem.classList.remove('s-alert-show');
	                    closingTimeout = setTimeout(function () {
	                        currentAlertElem.classList.add('s-alert-hide');
	                    }, 100);
	                    currentAlertElem.removeEventListener('webkitAnimationEnd', animationClose, false);
	                    currentAlertElem.removeEventListener('animationend', animationClose, false);
	                    currentAlertElem.addEventListener('webkitAnimationEnd', animationClose, false);
	                    currentAlertElem.addEventListener('animationend', animationClose, false);
	                }
	                // stop audio when closing
	                this.alertAudio && this.alertAudio.load();
	            }
	        }, {
	            key: 'componentWillMount',
	            value: function componentWillMount() {
	                var beep = this.props.beep;
	                var condition = this.props.condition;
	                if (beep && typeof beep === 'string') {
	                    this.alertAudio = new Audio(beep);
	                    this.alertAudio.load();
	                    this.alertAudio.play();
	                }
	                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'info') {
	                    this.alertAudio = new Audio(beep.info);
	                    this.alertAudio.load();
	                    this.alertAudio.play();
	                }
	                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'error') {
	                    this.alertAudio = new Audio(beep.error);
	                    this.alertAudio.load();
	                    this.alertAudio.play();
	                }
	                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'success') {
	                    this.alertAudio = new Audio(beep.success);
	                    this.alertAudio.load();
	                    this.alertAudio.play();
	                }
	                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'warning') {
	                    this.alertAudio = new Audio(beep.warning);
	                    this.alertAudio.load();
	                    this.alertAudio.play();
	                }
	            }
	        }, {
	            key: 'componentDidMount',
	            value: function componentDidMount() {
	                var _this2 = this;

	                if (typeof this.props.timeout === 'number') {
	                    this.closeTimer = setTimeout(function () {
	                        _this2.handleCloseAlert();
	                    }, this.props.timeout);
	                }
	                if (this.props.onShow) {
	                    this.props.onShow();
	                }
	            }
	        }, {
	            key: 'componentWillUnmount',
	            value: function componentWillUnmount() {
	                if (this.closeTimer) {
	                    clearTimeout(this.closeTimer);
	                }
	                if (this.props.onClose) {
	                    this.props.onClose();
	                }
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                var classNames = 's-alert-box s-alert-' + this.props.condition + ' s-alert-' + this.props.position + ' ' + (this.props.effect ? 's-alert-is-effect s-alert-effect-' + this.props.effect : '') + ' s-alert-show';
	                var message = this.props.html ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.message } }) : this.props.message;
	                var styles = this.props.boxPosition ? _sAlertTools2.default.styleToObj(this.props.boxPosition) : {};
	                var id = this.props.id;
	                var handleClose = this.handleCloseAlert.bind(this);
	                var contentTemplate = this.props.contentTemplate || _SAlertContentTmpl2.default;
	                var customFields = this.props.customFields || {};

	                return _react2.default.createElement(contentTemplate, { classNames: classNames, id: id, styles: styles, message: message, handleClose: handleClose, customFields: customFields });
	            }
	        }]);

	        return SAlertContent;
	    }(_react2.default.Component);

	    SAlertContent.propTypes = {
	        condition: _propTypes2.default.string.isRequired,
	        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
	        position: _propTypes2.default.string.isRequired,
	        boxPosition: _propTypes2.default.string,
	        id: _propTypes2.default.string.isRequired,
	        effect: _propTypes2.default.string,
	        beep: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.bool]),
	        timeout: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none']), _propTypes2.default.number]),
	        html: _propTypes2.default.bool,
	        onClose: _propTypes2.default.func,
	        onShow: _propTypes2.default.func,
	        customFields: _propTypes2.default.object,
	        contentTemplate: _propTypes2.default.func
	    };

	    exports.default = SAlertContent;
	});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports);
	        global.sAlertTools = mod.exports;
	    }
	})(this, function (exports) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	        return typeof obj;
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };

	    var actualGlobalConfig = void 0;

	    var sAlertTools = {
	        randomId: function randomId() {
	            return Math.random().toString(36).split('.')[1];
	        },
	        returnFirstDefined: function returnFirstDefined() {
	            var value = void 0;
	            var i = void 0;

	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            for (i = 0; i < args.length; i++) {
	                if (typeof args[i] !== 'undefined') {
	                    value = args[i];
	                    break;
	                }
	            }
	            return value;
	        },
	        styleToObj: function styleToObj(input) {
	            var result = {},
	                i = void 0,
	                entry = void 0,
	                attributes = input && input.split(';').filter(Boolean);

	            for (i = 0; i < attributes.length; i++) {
	                entry = attributes[i].split(':');
	                result[entry.splice(0, 1)[0].trim()] = entry.join(':').trim();
	            }
	            return result;
	        },
	        setGlobalConfig: function setGlobalConfig(config) {
	            if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
	                actualGlobalConfig = config;
	            }
	        },
	        getGlobalConfig: function getGlobalConfig() {
	            return actualGlobalConfig;
	        }
	    };

	    exports.default = sAlertTools;
	});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports);
	        global.sAlertStore = mod.exports;
	    }
	})(this, function (exports) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    function _toConsumableArray(arr) {
	        if (Array.isArray(arr)) {
	            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	                arr2[i] = arr[i];
	            }

	            return arr2;
	        } else {
	            return Array.from(arr);
	        }
	    }

	    // custom simple store based on a awesome Redux library https://github.com/rackt/redux

	    var createSAlertStore = function createSAlertStore(reducer) {
	        var state = void 0;
	        var listeners = [];
	        var getState = function getState() {
	            return state;
	        };
	        var dispatch = function dispatch(action) {
	            state = reducer(state, action);
	            listeners.forEach(function (listener) {
	                return listener();
	            });
	        };
	        var subscribe = function subscribe(listener) {
	            listeners.push(listener);
	            return function () {
	                listeners = listeners.filter(function (l) {
	                    return l !== listener;
	                });
	            };
	        };
	        dispatch({});
	        return {
	            getState: getState, dispatch: dispatch, subscribe: subscribe
	        };
	    };

	    var insert = function insert(state, action) {
	        return [].concat(_toConsumableArray(state), [action.data]);
	    };

	    var remove = function remove(state, action) {
	        var elemToRemoveArray = state.slice().filter(function (item) {
	            return item.id === action.data.id;
	        });
	        if (Array.isArray(elemToRemoveArray)) {
	            var elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
	            return [].concat(_toConsumableArray(state.slice(0, elemToRemoveIndex)), _toConsumableArray(state.slice(elemToRemoveIndex + 1)));
	        }
	        return state;
	    };

	    var alertsReducer = function alertsReducer() {
	        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var action = arguments[1];

	        switch (action.type) {
	            case 'INSERT':
	                return insert(state, action);
	            case 'REMOVE':
	                return remove(state, action);
	            case 'REMOVEALL':
	                return [];
	            default:
	                return state;
	        }
	    };

	    var sAlertStore = createSAlertStore(alertsReducer);

	    exports.default = sAlertStore;
	});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports, require('react'), require('prop-types'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports, global.react, global.propTypes);
	        global.SAlertContentTmpl = mod.exports;
	    }
	})(this, function (exports, _react, _propTypes) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _react2 = _interopRequireDefault(_react);

	    var _propTypes2 = _interopRequireDefault(_propTypes);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }

	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }

	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }

	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }

	    var SAlertContentTmpl = function (_React$Component) {
	        _inherits(SAlertContentTmpl, _React$Component);

	        function SAlertContentTmpl(props) {
	            _classCallCheck(this, SAlertContentTmpl);

	            return _possibleConstructorReturn(this, (SAlertContentTmpl.__proto__ || Object.getPrototypeOf(SAlertContentTmpl)).call(this, props));
	        }

	        _createClass(SAlertContentTmpl, [{
	            key: 'render',
	            value: function render() {
	                return _react2.default.createElement(
	                    'div',
	                    { className: this.props.classNames, id: this.props.id, style: this.props.styles },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 's-alert-box-inner' },
	                        this.props.message
	                    ),
	                    _react2.default.createElement('span', { className: 's-alert-close', onClick: this.props.handleClose })
	                );
	            }
	        }]);

	        return SAlertContentTmpl;
	    }(_react2.default.Component);

	    SAlertContentTmpl.propTypes = {
	        id: _propTypes2.default.string.isRequired,
	        classNames: _propTypes2.default.string.isRequired,
	        styles: _propTypes2.default.object.isRequired,
	        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
	        handleClose: _propTypes2.default.func.isRequired,
	        customFields: _propTypes2.default.object
	    };

	    exports.default = SAlertContentTmpl;
	});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(17), __webpack_require__(16), __webpack_require__(19), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports, require('react'), require('react-dom'), require('../SAlertContent'), require('./s-alert-store'), require('./s-alert-tools'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports, global.react, global.reactDom, global.SAlertContent, global.sAlertStore, global.sAlertTools);
	        global.sAlertDataPrep = mod.exports;
	    }
	})(this, function (exports, _react, _reactDom, _SAlertContent, _sAlertStore, _sAlertTools) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _react2 = _interopRequireDefault(_react);

	    var _reactDom2 = _interopRequireDefault(_reactDom);

	    var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

	    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

	    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    var _extends = Object.assign || function (target) {
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

	    var getAlertData = function getAlertData(sAlertPosition) {
	        var positionTop = 0;
	        var positionBottom = 0;
	        var padding = 0;
	        var alerts = {};
	        var style = void 0;
	        var docElement = void 0;
	        var sAlertBoxHeight = void 0;
	        var positionTypeTop = void 0;
	        var positionTypeBottom = void 0;
	        var checkFirst = function checkFirst(type, objId) {
	            var collectionOfType = sAlertCollection.filter(function (obj) {
	                return obj.position === type || sAlertGlobalConfig.position === type;
	            });
	            return collectionOfType && collectionOfType[0].id === objId;
	        };
	        var positionFunc = function positionFunc(position, positionType, alert, docElement, sAlertBoxHeight, reactComponent) {
	            padding = aStack.spacing || parseInt(getComputedStyle(_reactDom2.default.findDOMNode(reactComponent))[positionType]);
	            if (checkFirst(aPosition, alert.id) && aOffset) {
	                position = 0;
	                position = position + parseInt(aOffset);
	            }
	            if (checkFirst(aPosition, alert.id) && aStack.spacing) {
	                position = position;
	            } else {
	                position = position + parseInt(padding);
	            }
	            style = positionType + ': ' + position + 'px;';
	            position = position + sAlertBoxHeight;
	            return position;
	        };

	        var sAlertGlobalConfig = _sAlertTools2.default.getGlobalConfig();
	        var aStack = void 0;
	        var aContentTemplate = void 0;
	        var aOffset = void 0;
	        var aMessage = void 0;
	        var aHtml = void 0;
	        var aCustomFields = void 0;
	        var aPosition = void 0;

	        var query = {};
	        if (sAlertPosition === 'left') {
	            query = function query(item) {
	                return item.position === 'top-left' || item.position === 'bottom-left' || !item.position && (sAlertGlobalConfig.position === 'top-left' || sAlertGlobalConfig.position === 'bottom-left');
	            };
	        }
	        if (sAlertPosition === 'right') {
	            query = function query(item) {
	                return item.position === 'top-right' || item.position === 'bottom-right' || !item.position && (sAlertGlobalConfig.position === 'top-right' || sAlertGlobalConfig.position === 'bottom-right');
	            };
	        }
	        if (sAlertPosition === 'full-top') {
	            query = function query(item) {
	                return item.position === 'top' || !item.position && sAlertGlobalConfig.position === 'top';
	            };
	        }
	        if (sAlertPosition === 'full-bottom') {
	            query = function query(item) {
	                return item.position === 'bottom' || !item.position && sAlertGlobalConfig.position === 'bottom';
	            };
	        }

	        var currentState = _sAlertStore2.default.getState();
	        var sAlertCollection = currentState.slice().filter(query);

	        return sAlertCollection.map(function (alert) {
	            aStack = sAlertGlobalConfig.stack;
	            aContentTemplate = sAlertGlobalConfig.contentTemplate;
	            aOffset = _sAlertTools2.default.returnFirstDefined(alert.offset, sAlertGlobalConfig.offset);
	            aMessage = _sAlertTools2.default.returnFirstDefined(alert.message, sAlertGlobalConfig.message);
	            aHtml = _sAlertTools2.default.returnFirstDefined(alert.html, sAlertGlobalConfig.html);
	            aCustomFields = _sAlertTools2.default.returnFirstDefined(alert.customFields, sAlertGlobalConfig.customFields);
	            aPosition = _sAlertTools2.default.returnFirstDefined(alert.position, sAlertGlobalConfig.position);
	            positionTypeTop = aPosition && /top/g.test(aPosition);
	            positionTypeBottom = aPosition && /bottom/g.test(aPosition);
	            if (aStack) {
	                // checking alert box height - needed to calculate position
	                docElement = document.createElement('div');
	                docElement.classList.add('s-alert-box-height');

	                // mock element, needed for positions calculations
	                var reactElement = _react2.default.createElement(_SAlertContent2.default, {
	                    key: _sAlertTools2.default.randomId(),
	                    id: _sAlertTools2.default.randomId(),
	                    condition: alert.condition,
	                    message: aMessage,
	                    position: aPosition,
	                    effect: alert.effect,
	                    boxPosition: alert.boxPosition,
	                    beep: false,
	                    timeout: 'none',
	                    html: aHtml,
	                    contentTemplate: aContentTemplate,
	                    customFields: aCustomFields
	                });
	                var reactComponent = _reactDom2.default.render(reactElement, docElement);

	                document.body.appendChild(docElement);
	                sAlertBoxHeight = parseInt(getComputedStyle(_reactDom2.default.findDOMNode(reactComponent))['height']);
	                if (positionTypeTop) {
	                    positionTop = positionFunc(positionTop, 'top', alert, docElement, sAlertBoxHeight, reactComponent);
	                }
	                if (positionTypeBottom) {
	                    positionBottom = positionFunc(positionBottom, 'bottom', alert, docElement, sAlertBoxHeight, reactComponent);
	                }
	                var sAlertComputedStyle = getComputedStyle(_reactDom2.default.findDOMNode(reactComponent));
	                if (sAlertPosition === 'left') {
	                    style = style + 'left: ' + (aStack.spacing || parseInt(sAlertComputedStyle.left)) + 'px;';
	                }
	                if (sAlertPosition === 'right') {
	                    style = style + 'right: ' + (aStack.spacing || parseInt(sAlertComputedStyle.right)) + 'px;';
	                }
	                alerts = _extends({}, alert, { boxPosition: style });
	                _reactDom2.default.unmountComponentAtNode(docElement);
	                docElement.parentNode.removeChild(docElement);
	            } else if (aOffset && positionTypeTop) {
	                alerts = _extends({}, alert, { boxPosition: 'top: ' + parseInt(aOffset) + 'px;' });
	            } else if (aOffset && positionTypeBottom) {
	                alerts = _extends({}, alert, { boxPosition: 'bottom: ' + parseInt(aOffset) + 'px;' });
	            } else {
	                alerts = alert;
	            }
	            return alerts;
	        });
	    };

	    exports.default = getAlertData;
	});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CONST_VAR = {
	  SORT_DESC: 'desc',
	  SORT_ASC: 'asc',
	  AWAIT_BEFORE_CELL_EDIT: 1,
	  SIZE_PER_PAGE: 10,
	  NEXT_PAGE: '>',
	  NEXT_PAGE_TITLE: 'next page',
	  LAST_PAGE: '>>',
	  LAST_PAGE_TITLE: 'last page',
	  PRE_PAGE: '<',
	  PRE_PAGE_TITLE: 'previous page',
	  FIRST_PAGE: '<<',
	  FIRST_PAGE_TITLE: 'first page',
	  PAGE_START_INDEX: 1,
	  ROW_SELECT_BG_COLOR: '',
	  ROW_SELECT_NONE: 'none',
	  ROW_SELECT_SINGLE: 'radio',
	  ROW_SELECT_MULTI: 'checkbox',
	  CELL_EDIT_NONE: 'none',
	  CELL_EDIT_CLICK: 'click',
	  CELL_EDIT_DBCLICK: 'dbclick',
	  SIZE_PER_PAGE_LIST: [10, 25, 30, 50],
	  PAGINATION_SIZE: 5,
	  PAGINATION_POS_TOP: 'top',
	  PAGINATION_POS_BOTTOM: 'bottom',
	  PAGINATION_POS_BOTH: 'both',
	  TOOLBAR_POS_TOP: 'top',
	  TOOLBAR_POS_BOTTOM: 'bottom',
	  TOOLBAR_POS_BOTH: 'both',
	  NO_DATA_TEXT: 'There is no data to display',
	  SHOW_ONLY_SELECT: 'Show Selected Only',
	  SHOW_ALL: 'Show All',
	  EXPORT_CSV_TEXT: 'Export to CSV',
	  INSERT_BTN_TEXT: 'New',
	  DELETE_BTN_TEXT: 'Delete',
	  SAVE_BTN_TEXT: 'Save',
	  CLOSE_BTN_TEXT: 'Close',
	  FILTER_DELAY: 500,
	  SCROLL_TOP: 'Top',
	  SCROLL_BOTTOM: 'Bottom',
	  FILTER_TYPE: {
	    TEXT: 'TextFilter',
	    REGEX: 'RegexFilter',
	    SELECT: 'SelectFilter',
	    NUMBER: 'NumberFilter',
	    DATE: 'DateFilter',
	    CUSTOM: 'CustomFilter',
	    ARRAY: 'ArrayFilter'
	  },
	  FILTER_COND_EQ: 'eq',
	  FILTER_COND_LIKE: 'like',
	  EXPAND_BY_ROW: 'row',
	  EXPAND_BY_COL: 'column',
	  REMOTE_SORT: 'sort',
	  REMOTE_PAGE: 'pagination',
	  REMOTE_CELL_EDIT: 'cellEdit',
	  REMOTE_INSERT_ROW: 'insertRow',
	  REMOTE_DROP_ROW: 'dropRow',
	  REMOTE_FILTER: 'filter',
	  REMOTE_SEARCH: 'search',
	  REMOTE_EXPORT_CSV: 'exportCSV',
	  INSERT_FAIL_INDICATOR: 'Validation errors, please check!',
	  DEFAULT_CSV_SEPARATOR: ',',
	  CSV_STRING_TYPE: 'string',
	  CSV_NUMBER_TYPE: 'number',
	  AUTO_COLLAPSE_WHEN_SORT: false,
	  AUTO_COLLAPSE_WHEN_SEARCH: false,
	  AUTO_COLLAPSE_WHEN_FILTER: false
	};

	CONST_VAR.REMOTE = {};
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_SORT] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_PAGE] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_CELL_EDIT] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_INSERT_ROW] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_DROP_ROW] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_FILTER] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_SEARCH] = false;
	CONST_VAR.REMOTE[CONST_VAR.REMOTE_EXPORT_CSV] = false;

	var _default = CONST_VAR;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(CONST_VAR, 'CONST_VAR', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/Const.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/Const.js');
	}();

	;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	var _Date = __webpack_require__(25);

	var _Date2 = _interopRequireDefault(_Date);

	var _Text = __webpack_require__(26);

	var _Text2 = _interopRequireDefault(_Text);

	var _Regex = __webpack_require__(27);

	var _Regex2 = _interopRequireDefault(_Regex);

	var _Select = __webpack_require__(28);

	var _Select2 = _interopRequireDefault(_Select);

	var _Number = __webpack_require__(29);

	var _Number2 = _interopRequireDefault(_Number);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint default-case: 0 */
	/* eslint guard-for-in: 0 */


	var TableHeaderColumn = function (_Component) {
	  _inherits(TableHeaderColumn, _Component);

	  function TableHeaderColumn(props) {
	    _classCallCheck(this, TableHeaderColumn);

	    var _this = _possibleConstructorReturn(this, (TableHeaderColumn.__proto__ || Object.getPrototypeOf(TableHeaderColumn)).call(this, props));

	    _this.handleColumnClick = function () {
	      return _this.__handleColumnClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleFilter = _this.handleFilter.bind(_this);
	    return _this;
	  }

	  _createClass(TableHeaderColumn, [{
	    key: '__handleColumnClick__REACT_HOT_LOADER__',
	    value: function __handleColumnClick__REACT_HOT_LOADER__() {
	      return this.__handleColumnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.reset) {
	        this.cleanFiltered();
	      }

	      // If column not displaying the same dataField, reset the filter accordingly
	      if (nextProps.filter && nextProps.dataField !== this.props.dataField) {
	        var emitter = nextProps.filter.emitter || {};
	        var currentFilter = emitter.currentFilter || {};
	        var filter = currentFilter[nextProps.dataField];
	        var value = filter ? filter.value : '';

	        var _ref = this.getFilters(nextProps) || {},
	            ref = _ref.ref;

	        if (this.refs[ref]) {
	          this.refs[ref].setState({ value: value });
	        }
	      }
	    }
	  }, {
	    key: '__handleColumnClick__REACT_HOT_LOADER__',
	    value: function __handleColumnClick__REACT_HOT_LOADER__() {
	      if (this.props.isOnlyHead || !this.props.dataSort) return;
	      var order = this.props.sort;

	      if (!order && this.props.defaultASC) order = _Const2.default.SORT_ASC;else order = this.props.sort === _Const2.default.SORT_DESC ? _Const2.default.SORT_ASC : _Const2.default.SORT_DESC;
	      this.props.onSort(order, this.props.dataField);
	    }
	  }, {
	    key: 'handleFilter',
	    value: function handleFilter(value, type) {
	      var filter = this.props.filter;

	      filter.emitter.handleFilter(this.props.dataField, value, type, filter);
	    }
	  }, {
	    key: 'getFilters',
	    value: function getFilters() {
	      var _this2 = this;

	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	      var headerText = props.headerText,
	          children = props.children;

	      switch (props.filter.type) {
	        case _Const2.default.FILTER_TYPE.TEXT:
	          {
	            return _react2.default.createElement(_Text2.default, _extends({ ref: function ref(n) {
	                return _this2.textFilter = n;
	              } }, props.filter, {
	              columnName: headerText || children, filterHandler: this.handleFilter }));
	          }
	        case _Const2.default.FILTER_TYPE.REGEX:
	          {
	            return _react2.default.createElement(_Regex2.default, _extends({ ref: function ref(n) {
	                return _this2.regexFilter = n;
	              } }, props.filter, {
	              columnName: headerText || children, filterHandler: this.handleFilter }));
	          }
	        case _Const2.default.FILTER_TYPE.SELECT:
	          {
	            return _react2.default.createElement(_Select2.default, _extends({ ref: function ref(n) {
	                return _this2.selectFilter = n;
	              } }, props.filter, {
	              columnName: headerText || children, filterHandler: this.handleFilter }));
	          }
	        case _Const2.default.FILTER_TYPE.NUMBER:
	          {
	            return _react2.default.createElement(_Number2.default, _extends({ ref: function ref(n) {
	                return _this2.numberFilter = n;
	              } }, props.filter, {
	              columnName: headerText || children, filterHandler: this.handleFilter }));
	          }
	        case _Const2.default.FILTER_TYPE.DATE:
	          {
	            return _react2.default.createElement(_Date2.default, _extends({ ref: function ref(n) {
	                return _this2.dateFilter = n;
	              } }, props.filter, {
	              columnName: headerText || children, filterHandler: this.handleFilter }));
	          }
	        case _Const2.default.FILTER_TYPE.CUSTOM:
	          {
	            var elm = props.filter.getElement(this.handleFilter, props.filter.customFilterParameters);

	            return _react2.default.cloneElement(elm, { ref: function ref(n) {
	                return _this2.customFilter = n;
	              } });
	          }
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.headerCol.setAttribute('data-field', this.props.dataField);
	    }
	  }, {
	    key: 'renderDefaultCaret',
	    value: function renderDefaultCaret(dataSort, isBootstrap4) {
	      if (!dataSort) return null;
	      if (isBootstrap4) {
	        return _react2.default.createElement('span', { className: 'order fa fa-sort',
	          style: { margin: '10px 0 10px 5px', color: '#ccc' } });
	      } else {
	        return _react2.default.createElement(
	          'span',
	          { className: 'order' },
	          _react2.default.createElement(
	            'span',
	            { className: 'dropdown' },
	            _react2.default.createElement('span', { className: 'caret', style: { margin: '10px 0 10px 5px', color: '#ccc' } })
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'dropup' },
	            _react2.default.createElement('span', { className: 'caret', style: { margin: '10px 0', color: '#ccc' } })
	          )
	        );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var defaultCaret = void 0;
	      var sortCaret = void 0;
	      var sortClass = void 0;
	      var _props = this.props,
	          headerText = _props.headerText,
	          dataAlign = _props.dataAlign,
	          dataField = _props.dataField,
	          headerAlign = _props.headerAlign,
	          headerTitle = _props.headerTitle,
	          hidden = _props.hidden,
	          sort = _props.sort,
	          dataSort = _props.dataSort,
	          sortIndicator = _props.sortIndicator,
	          children = _props.children,
	          caretRender = _props.caretRender,
	          className = _props.className,
	          isOnlyHead = _props.isOnlyHead,
	          version = _props.version,
	          customSortClass = _props.sortHeaderColumnClassName,
	          style = _props.thStyle;

	      var thStyle = _extends({
	        textAlign: headerAlign || dataAlign,
	        display: hidden ? 'none' : null
	      }, style);
	      var isBootstrap4 = _util2.default.isBootstrap4(version);
	      if (!isOnlyHead) {
	        if (sortIndicator) {
	          defaultCaret = this.renderDefaultCaret(dataSort, isBootstrap4);
	        }
	        sortCaret = sort ? _util2.default.renderReactSortCaret(sort, isBootstrap4) : defaultCaret;
	        if (caretRender) {
	          sortCaret = caretRender(sort, dataField);
	        }
	      }

	      if (sort) {
	        sortClass = _util2.default.isFunction(customSortClass) ? customSortClass(sort, dataField) : customSortClass;
	      }
	      var classes = (0, _classnames2.default)(_util2.default.isFunction(className) ? className() : className, !isOnlyHead && dataSort ? 'sort-column' : '', sortClass);

	      var attr = {};
	      if (headerTitle) {
	        if (typeof children === 'string' && !headerText) {
	          attr.title = children;
	        } else {
	          attr.title = headerText;
	        }
	      }
	      return _react2.default.createElement(
	        'th',
	        _extends({ ref: function ref(node) {
	            return _this3.headerCol = node;
	          },
	          className: classes,
	          style: thStyle,
	          onClick: this.handleColumnClick,
	          rowSpan: this.props.rowSpan,
	          colSpan: this.props.colSpan,
	          'data-is-only-head': this.props.isOnlyHead
	        }, attr),
	        children,
	        sortCaret,
	        _react2.default.createElement(
	          'div',
	          { onClick: function onClick(e) {
	              return e.stopPropagation();
	            } },
	          this.props.filter && !isOnlyHead ? this.getFilters() : null
	        )
	      );
	    }
	  }, {
	    key: 'cleanFiltered',
	    value: function cleanFiltered() {
	      if (!this.props.filter) return;

	      switch (this.props.filter.type) {
	        case _Const2.default.FILTER_TYPE.TEXT:
	          {
	            this.textFilter.cleanFiltered();
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.REGEX:
	          {
	            this.regexFilter.cleanFiltered();
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.SELECT:
	          {
	            this.selectFilter.cleanFiltered();
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.NUMBER:
	          {
	            this.numberFilter.cleanFiltered();
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.DATE:
	          {
	            this.dateFilter.cleanFiltered();
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.CUSTOM:
	          {
	            this.customFilter.cleanFiltered();
	            break;
	          }
	      }
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(val) {
	      if (!this.props.filter) return;
	      switch (this.props.filter.type) {
	        case _Const2.default.FILTER_TYPE.TEXT:
	          {
	            this.textFilter.applyFilter(val);
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.REGEX:
	          {
	            this.regexFilter.applyFilter(val);
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.SELECT:
	          {
	            this.selectFilter.applyFilter(val);
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.NUMBER:
	          {
	            this.numberFilter.applyFilter(val);
	            break;
	          }
	        case _Const2.default.FILTER_TYPE.DATE:
	          {
	            this.dateFilter.applyFilter(val);
	            break;
	          }
	      }
	    }
	  }]);

	  return TableHeaderColumn;
	}(_react.Component);

	var filterTypeArray = [];
	for (var key in _Const2.default.FILTER_TYPE) {
	  filterTypeArray.push(_Const2.default.FILTER_TYPE[key]);
	}

	TableHeaderColumn.propTypes = {
	  dataField: _propTypes2.default.string,
	  dataAlign: _propTypes2.default.string,
	  headerAlign: _propTypes2.default.string,
	  headerTitle: _propTypes2.default.bool,
	  headerText: _propTypes2.default.string,
	  dataSort: _propTypes2.default.bool,
	  onSort: _propTypes2.default.func,
	  dataFormat: _propTypes2.default.func,
	  csvFormat: _propTypes2.default.func,
	  csvHeader: _propTypes2.default.string,
	  csvFieldType: _propTypes2.default.oneOf([_Const2.default.CSV_STRING_TYPE, _Const2.default.CSV_NUMBER_TYPE]),
	  isKey: _propTypes2.default.bool,
	  editable: _propTypes2.default.any,
	  hidden: _propTypes2.default.bool,
	  hiddenOnInsert: _propTypes2.default.bool,
	  searchable: _propTypes2.default.bool,
	  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  width: _propTypes2.default.string,
	  sortFunc: _propTypes2.default.func,
	  sortFuncExtraData: _propTypes2.default.any,
	  sortHeaderColumnClassName: _propTypes2.default.any,
	  columnClassName: _propTypes2.default.any,
	  editColumnClassName: _propTypes2.default.any,
	  invalidEditColumnClassName: _propTypes2.default.any,
	  columnTitle: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func, _propTypes2.default.string]),
	  filterFormatted: _propTypes2.default.bool,
	  filterValue: _propTypes2.default.func,
	  sort: _propTypes2.default.string,
	  caretRender: _propTypes2.default.func,
	  formatExtraData: _propTypes2.default.any,
	  csvFormatExtraData: _propTypes2.default.any,
	  filter: _propTypes2.default.shape({
	    type: _propTypes2.default.oneOf(filterTypeArray),
	    delay: _propTypes2.default.number,
	    options: _propTypes2.default.oneOfType([_propTypes2.default.object, // for SelectFilter
	    _propTypes2.default.arrayOf(_propTypes2.default.number) // for NumberFilter
	    ]),
	    numberComparators: _propTypes2.default.arrayOf(_propTypes2.default.string),
	    emitter: _propTypes2.default.object,
	    placeholder: _propTypes2.default.string,
	    getElement: _propTypes2.default.func,
	    customFilterParameters: _propTypes2.default.object,
	    condition: _propTypes2.default.oneOf([_Const2.default.FILTER_COND_EQ, _Const2.default.FILTER_COND_LIKE])
	  }),
	  sortIndicator: _propTypes2.default.bool,
	  export: _propTypes2.default.bool,
	  expandable: _propTypes2.default.bool,
	  tdAttr: _propTypes2.default.object,
	  editTdAttr: _propTypes2.default.object,
	  tdStyle: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
	  thStyle: _propTypes2.default.object,
	  keyValidator: _propTypes2.default.bool,
	  defaultASC: _propTypes2.default.bool
	};

	TableHeaderColumn.defaultProps = {
	  dataAlign: 'left',
	  headerAlign: undefined,
	  headerTitle: true,
	  dataSort: false,
	  dataFormat: undefined,
	  csvFormat: undefined,
	  csvHeader: undefined,
	  csvFieldType: _Const2.default.CSV_STRING_TYPE,
	  isKey: false,
	  editable: true,
	  onSort: undefined,
	  hidden: false,
	  hiddenOnInsert: false,
	  searchable: true,
	  className: '',
	  columnTitle: false,
	  width: null,
	  sortFunc: undefined,
	  columnClassName: '',
	  editColumnClassName: '',
	  invalidEditColumnClassName: '',
	  filterFormatted: false,
	  filterValue: undefined,
	  sort: undefined,
	  formatExtraData: undefined,
	  sortFuncExtraData: undefined,
	  filter: undefined,
	  sortIndicator: true,
	  expandable: true,
	  tdAttr: undefined,
	  editTdAttr: undefined,
	  tdStyle: undefined,
	  thStyle: undefined,
	  keyValidator: false,
	  defaultASC: false
	};

	var _default = TableHeaderColumn;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableHeaderColumn, 'TableHeaderColumn', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeaderColumn.js');

	  __REACT_HOT_LOADER__.register(filterTypeArray, 'filterTypeArray', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeaderColumn.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeaderColumn.js');
	}();

	;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _default = {
	  renderReactSortCaret: function renderReactSortCaret(order, isBootstrap4) {
	    var orderClass = void 0;
	    if (isBootstrap4) {
	      orderClass = (0, _classnames2.default)('fa', {
	        'fa-sort-asc': order === _Const2.default.SORT_ASC,
	        'fa-sort-desc': order === _Const2.default.SORT_DESC
	      });
	      return _react2.default.createElement('span', { className: orderClass, style: { margin: '10px 5px' } });
	    } else {
	      orderClass = (0, _classnames2.default)('order', {
	        'dropup': order === _Const2.default.SORT_ASC
	      });
	      return _react2.default.createElement(
	        'span',
	        { className: orderClass },
	        _react2.default.createElement('span', { className: 'caret', style: { margin: '10px 5px' } })
	      );
	    }
	  },
	  isFunction: function isFunction(obj) {
	    return obj && typeof obj === 'function';
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
	    var w1 = inner.getBoundingClientRect().width;
	    outer.style.overflow = 'scroll';
	    var w2 = inner.getBoundingClientRect().width;

	    if (w1 === w2) w2 = outer.clientWidth;

	    document.body.removeChild(outer);

	    return w1 - w2;
	  },
	  canUseDOM: function canUseDOM() {
	    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
	  },


	  // We calculate an offset here in order to properly fetch the indexed data,
	  // despite the page start index not always being 1
	  getNormalizedPage: function getNormalizedPage(pageStartIndex, page) {
	    pageStartIndex = this.getFirstPage(pageStartIndex);
	    if (page === undefined) page = pageStartIndex;
	    var offset = Math.abs(_Const2.default.PAGE_START_INDEX - pageStartIndex);
	    return page + offset;
	  },
	  getFirstPage: function getFirstPage(pageStartIndex) {
	    return pageStartIndex !== undefined ? pageStartIndex : _Const2.default.PAGE_START_INDEX;
	  },
	  isBootstrap4: function isBootstrap4(version) {
	    return version === '4';
	  },
	  isSelectRowDefined: function isSelectRowDefined(mode) {
	    return mode === _Const2.default.ROW_SELECT_SINGLE || mode === _Const2.default.ROW_SELECT_MULTI;
	  },
	  renderColGroup: function renderColGroup(columns, selectRow) {
	    var expandColumnOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var version = arguments[3];

	    var selectRowHeader = null;
	    var expandRowHeader = null;
	    var isBootstrap4 = this.isBootstrap4(version);
	    var isSelectRowDefined = this.isSelectRowDefined(selectRow.mode);
	    var columnWidth = isBootstrap4 ? '38px' : '30px';
	    if (isSelectRowDefined) {
	      var style = {
	        width: selectRow.columnWidth || columnWidth,
	        minWidth: selectRow.columnWidth || columnWidth
	      };
	      if (!selectRow.hideSelectColumn) {
	        selectRowHeader = _react2.default.createElement('col', { key: 'select-col', style: style });
	      }
	    }
	    if (expandColumnOptions.expandColumnVisible) {
	      var _style = {
	        width: expandColumnOptions.columnWidth || columnWidth,
	        minWidth: expandColumnOptions.columnWidth || columnWidth
	      };
	      expandRowHeader = _react2.default.createElement('col', { key: 'expand-col', style: _style });
	    }
	    var theader = columns.map(function (column, i) {
	      var style = {
	        display: column.hidden ? 'none' : null
	      };
	      if (column.width) {
	        var width = !isNaN(column.width) ? column.width + 'px' : column.width;
	        style.width = width;
	        /** add min-wdth to fix user assign column width
	        not eq offsetWidth in large column table **/
	        style.minWidth = width;
	      }
	      return _react2.default.createElement('col', { style: style, key: i });
	    });

	    return _react2.default.createElement(
	      'colgroup',
	      null,
	      expandColumnOptions.expandColumnVisible && expandColumnOptions.expandColumnBeforeSelectColumn && expandRowHeader,
	      selectRowHeader,
	      expandColumnOptions.expandColumnVisible && !expandColumnOptions.expandColumnBeforeSelectColumn && expandRowHeader,
	      theader
	    );
	  }
	}; /* eslint react/display-name: 0 */

	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/util.js');
	}();

	;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint quotes: 0 */
	/* eslint max-len: 0 */


	var legalComparators = ['=', '>', '>=', '<', '<=', '!='];

	function dateParser(d) {
	  return d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
	}

	var DateFilter = function (_Component) {
	  _inherits(DateFilter, _Component);

	  function DateFilter(props) {
	    _classCallCheck(this, DateFilter);

	    var _this = _possibleConstructorReturn(this, (DateFilter.__proto__ || Object.getPrototypeOf(DateFilter)).call(this, props));

	    _this.dateComparators = _this.props.dateComparators || legalComparators;
	    _this.filter = _this.filter.bind(_this);
	    _this.onChangeComparator = _this.onChangeComparator.bind(_this);
	    return _this;
	  }

	  _createClass(DateFilter, [{
	    key: 'setDefaultDate',
	    value: function setDefaultDate() {
	      var defaultDate = '';
	      var defaultValue = this.props.defaultValue;

	      if (defaultValue && defaultValue.date) {
	        // Set the appropriate format for the input type=date, i.e. "YYYY-MM-DD"
	        defaultDate = dateParser(new Date(defaultValue.date));
	      }
	      return defaultDate;
	    }
	  }, {
	    key: 'onChangeComparator',
	    value: function onChangeComparator(event) {
	      var date = this.inputDate.value;
	      var comparator = event.target.value;
	      if (date === '') {
	        return;
	      }
	      date = new Date(date);
	      this.props.filterHandler({ date: date, comparator: comparator }, _Const2.default.FILTER_TYPE.DATE);
	    }
	  }, {
	    key: 'getComparatorOptions',
	    value: function getComparatorOptions() {
	      var optionTags = [];
	      optionTags.push(_react2.default.createElement('option', { key: '-1' }));
	      for (var i = 0; i < this.dateComparators.length; i++) {
	        optionTags.push(_react2.default.createElement(
	          'option',
	          { key: i, value: this.dateComparators[i] },
	          this.dateComparators[i]
	        ));
	      }
	      return optionTags;
	    }
	  }, {
	    key: 'filter',
	    value: function filter(event) {
	      var comparator = this.dateFilterComparator.value;
	      var dateValue = event.target.value;
	      if (dateValue) {
	        this.props.filterHandler({ date: new Date(dateValue), comparator: comparator }, _Const2.default.FILTER_TYPE.DATE);
	      } else {
	        this.props.filterHandler(null, _Const2.default.FILTER_TYPE.DATE);
	      }
	    }
	  }, {
	    key: 'cleanFiltered',
	    value: function cleanFiltered() {
	      var value = this.setDefaultDate();
	      var comparator = this.props.defaultValue ? this.props.defaultValue.comparator : '';
	      this.setState(function () {
	        return { isPlaceholderSelected: value === '' };
	      });
	      this.dateFilterComparator.value = comparator;
	      this.inputDate.value = value;
	      this.props.filterHandler({ date: new Date(value), comparator: comparator }, _Const2.default.FILTER_TYPE.DATE);
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(filterDateObj) {
	      var date = filterDateObj.date,
	          comparator = filterDateObj.comparator;

	      this.setState(function () {
	        return { isPlaceholderSelected: date === '' };
	      });
	      this.dateFilterComparator.value = comparator;
	      this.inputDate.value = dateParser(date);
	      this.props.filterHandler({ date: date, comparator: comparator }, _Const2.default.FILTER_TYPE.DATE);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var comparator = this.dateFilterComparator.value;
	      var dateValue = this.inputDate.value;
	      if (comparator && dateValue) {
	        this.props.filterHandler({ date: new Date(dateValue), comparator: comparator }, _Const2.default.FILTER_TYPE.DATE);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          defaultValue = _props.defaultValue,
	          _props$style = _props.style,
	          date = _props$style.date,
	          comparator = _props$style.comparator;

	      return _react2.default.createElement(
	        'div',
	        { className: 'filter date-filter' },
	        _react2.default.createElement(
	          'select',
	          { ref: function ref(n) {
	              return _this2.dateFilterComparator = n;
	            },
	            style: comparator,
	            className: 'date-filter-comparator form-control',
	            onChange: this.onChangeComparator,
	            defaultValue: defaultValue ? defaultValue.comparator : '' },
	          this.getComparatorOptions()
	        ),
	        _react2.default.createElement('input', { ref: function ref(n) {
	            return _this2.inputDate = n;
	          },
	          className: 'filter date-filter-input form-control',
	          style: date,
	          type: 'date',
	          onChange: this.filter,
	          defaultValue: this.setDefaultDate() })
	      );
	    }
	  }]);

	  return DateFilter;
	}(_react.Component);

	DateFilter.propTypes = {
	  filterHandler: _propTypes2.default.func.isRequired,
	  defaultValue: _propTypes2.default.shape({
	    date: _propTypes2.default.object,
	    comparator: _propTypes2.default.oneOf(legalComparators)
	  }),
	  style: _propTypes2.default.shape({
	    date: _propTypes2.default.oneOfType([_propTypes2.default.object]),
	    comparator: _propTypes2.default.oneOfType([_propTypes2.default.object])
	  }),
	  /* eslint consistent-return: 0 */
	  dateComparators: function dateComparators(props, propName) {
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
	        return new Error('Date comparator provided is not supported.\n          Use only ' + legalComparators);
	      }
	    }
	  },
	  columnName: _propTypes2.default.any
	};

	DateFilter.defaultProps = {
	  style: {
	    date: null,
	    comparator: null
	  }
	};

	var _default = DateFilter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(legalComparators, 'legalComparators', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Date.js');

	  __REACT_HOT_LOADER__.register(dateParser, 'dateParser', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Date.js');

	  __REACT_HOT_LOADER__.register(DateFilter, 'DateFilter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Date.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Date.js');
	}();

	;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextFilter = function (_Component) {
	  _inherits(TextFilter, _Component);

	  function TextFilter(props) {
	    _classCallCheck(this, TextFilter);

	    var _this = _possibleConstructorReturn(this, (TextFilter.__proto__ || Object.getPrototypeOf(TextFilter)).call(this, props));

	    _this.filter = _this.filter.bind(_this);
	    _this.timeout = null;
	    _this.state = {
	      value: _this.props.defaultValue || ''
	    };
	    return _this;
	  }

	  _createClass(TextFilter, [{
	    key: 'filter',
	    value: function filter(event) {
	      var _this2 = this;

	      if (this.timeout) {
	        clearTimeout(this.timeout);
	      }
	      var filterValue = event.target.value;
	      this.setState(function () {
	        return { value: filterValue };
	      });
	      this.timeout = setTimeout(function () {
	        _this2.props.filterHandler(filterValue, _Const2.default.FILTER_TYPE.TEXT);
	      }, this.props.delay);
	    }
	  }, {
	    key: 'cleanFiltered',
	    value: function cleanFiltered() {
	      var value = this.props.defaultValue ? this.props.defaultValue : '';
	      this.setState(function () {
	        return { value: value };
	      });
	      this.props.filterHandler(value, _Const2.default.FILTER_TYPE.TEXT);
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(filterText) {
	      this.setState(function () {
	        return { value: filterText };
	      });
	      this.props.filterHandler(filterText, _Const2.default.FILTER_TYPE.TEXT);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var defaultValue = this.inputText.value;
	      if (defaultValue) {
	        this.props.filterHandler(defaultValue, _Const2.default.FILTER_TYPE.TEXT);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.defaultValue !== this.props.defaultValue) {
	        this.applyFilter(nextProps.defaultValue || '');
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
	      var _this3 = this;

	      var _props = this.props,
	          placeholder = _props.placeholder,
	          columnName = _props.columnName,
	          style = _props.style;

	      return _react2.default.createElement('input', { ref: function ref(n) {
	          return _this3.inputText = n;
	        },
	        className: 'filter text-filter form-control',
	        type: 'text',
	        style: style,
	        onChange: this.filter,
	        placeholder: placeholder || 'Enter ' + columnName + '...',
	        value: this.state.value });
	    }
	  }]);

	  return TextFilter;
	}(_react.Component);

	TextFilter.propTypes = {
	  filterHandler: _propTypes2.default.func.isRequired,
	  defaultValue: _propTypes2.default.string,
	  delay: _propTypes2.default.number,
	  placeholder: _propTypes2.default.string,
	  columnName: _propTypes2.default.any,
	  style: _propTypes2.default.oneOfType([_propTypes2.default.object])
	};

	TextFilter.defaultProps = {
	  delay: _Const2.default.FILTER_DELAY
	};

	var _default = TextFilter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TextFilter, 'TextFilter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Text.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Text.js');
	}();

	;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RegexFilter = function (_Component) {
	  _inherits(RegexFilter, _Component);

	  function RegexFilter(props) {
	    _classCallCheck(this, RegexFilter);

	    var _this = _possibleConstructorReturn(this, (RegexFilter.__proto__ || Object.getPrototypeOf(RegexFilter)).call(this, props));

	    _this.filter = _this.filter.bind(_this);
	    _this.timeout = null;
	    return _this;
	  }

	  _createClass(RegexFilter, [{
	    key: 'filter',
	    value: function filter(event) {
	      var _this2 = this;

	      if (this.timeout) {
	        clearTimeout(this.timeout);
	      }
	      var filterValue = event.target.value;
	      this.timeout = setTimeout(function () {
	        _this2.props.filterHandler(filterValue, _Const2.default.FILTER_TYPE.REGEX);
	      }, this.props.delay);
	    }
	  }, {
	    key: 'cleanFiltered',
	    value: function cleanFiltered() {
	      var value = this.props.defaultValue ? this.props.defaultValue : '';
	      this.inputText.value = value;
	      this.props.filterHandler(value, _Const2.default.FILTER_TYPE.TEXT);
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(filterRegx) {
	      this.inputText.value = filterRegx;
	      this.props.filterHandler(filterRegx, _Const2.default.FILTER_TYPE.REGEX);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var value = this.inputText.value;
	      if (value) {
	        this.props.filterHandler(value, _Const2.default.FILTER_TYPE.REGEX);
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
	      var _this3 = this;

	      var _props = this.props,
	          defaultValue = _props.defaultValue,
	          placeholder = _props.placeholder,
	          columnName = _props.columnName,
	          style = _props.style;

	      return _react2.default.createElement('input', { ref: function ref(n) {
	          return _this3.inputText = n;
	        },
	        className: 'filter text-filter form-control',
	        type: 'text',
	        style: style,
	        onChange: this.filter,
	        placeholder: placeholder || 'Enter Regex for ' + columnName + '...',
	        defaultValue: defaultValue ? defaultValue : '' });
	    }
	  }]);

	  return RegexFilter;
	}(_react.Component);

	RegexFilter.propTypes = {
	  filterHandler: _propTypes2.default.func.isRequired,
	  defaultValue: _propTypes2.default.string,
	  delay: _propTypes2.default.number,
	  placeholder: _propTypes2.default.string,
	  columnName: _propTypes2.default.any,
	  style: _propTypes2.default.oneOfType([_propTypes2.default.object])
	};

	RegexFilter.defaultProps = {
	  delay: _Const2.default.FILTER_DELAY
	};

	var _default = RegexFilter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(RegexFilter, 'RegexFilter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Regex.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Regex.js');
	}();

	;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function optionsEquals(options1, options2) {
	  var keys = Object.keys(options1);
	  for (var k in keys) {
	    if (options1[k] !== options2[k]) {
	      return false;
	    }
	  }
	  return Object.keys(options1).length === Object.keys(options2).length;
	}

	var SelectFilter = function (_Component) {
	  _inherits(SelectFilter, _Component);

	  function SelectFilter(props) {
	    _classCallCheck(this, SelectFilter);

	    var _this = _possibleConstructorReturn(this, (SelectFilter.__proto__ || Object.getPrototypeOf(SelectFilter)).call(this, props));

	    _this.filter = _this.filter.bind(_this);
	    _this.state = {
	      isPlaceholderSelected: _this.props.defaultValue === undefined || !_this.props.options.hasOwnProperty(_this.props.defaultValue)
	    };
	    return _this;
	  }

	  _createClass(SelectFilter, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      var currentSelectValue = this.selectInput.value;
	      var isPlaceholderSelected = !currentSelectValue || currentSelectValue === '';
	      this.setState(function () {
	        return {
	          isPlaceholderSelected: isPlaceholderSelected
	        };
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var needFilter = false;
	      if (this.props.defaultValue !== prevProps.defaultValue) {
	        needFilter = true;
	      } else if (!optionsEquals(this.props.options, prevProps.options)) {
	        needFilter = true;
	      }
	      if (needFilter) {
	        var value = this.selectInput.value;
	        if (value) {
	          this.props.filterHandler(value, _Const2.default.FILTER_TYPE.SELECT);
	        }
	      }
	    }
	  }, {
	    key: 'filter',
	    value: function filter(event) {
	      var value = event.target.value;

	      this.setState(function () {
	        return { isPlaceholderSelected: value === '' };
	      });
	      this.props.filterHandler(value, _Const2.default.FILTER_TYPE.SELECT);
	    }
	  }, {
	    key: 'cleanFiltered',
	    value: function cleanFiltered() {
	      var value = this.props.defaultValue !== undefined ? this.props.defaultValue : '';
	      this.setState(function () {
	        return { isPlaceholderSelected: value === '' };
	      });
	      this.selectInput.value = value;
	      this.props.filterHandler(value, _Const2.default.FILTER_TYPE.SELECT);
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(filterOption) {
	      filterOption = filterOption + '';
	      this.setState(function () {
	        return { isPlaceholderSelected: filterOption === '' };
	      });
	      this.selectInput.value = filterOption;
	      this.props.filterHandler(filterOption, _Const2.default.FILTER_TYPE.SELECT);
	    }
	  }, {
	    key: 'getOptions',
	    value: function getOptions() {
	      var optionTags = [];
	      var _props = this.props,
	          options = _props.options,
	          placeholder = _props.placeholder,
	          columnName = _props.columnName,
	          selectText = _props.selectText,
	          withoutEmptyOption = _props.withoutEmptyOption;

	      var selectTextValue = selectText !== undefined ? selectText : 'Select';
	      if (!withoutEmptyOption) {
	        optionTags.push(_react2.default.createElement(
	          'option',
	          { key: '-1', value: '' },
	          placeholder || selectTextValue + ' ' + columnName + '...'
	        ));
	      }
	      Object.keys(options).map(function (key) {
	        optionTags.push(_react2.default.createElement(
	          'option',
	          { key: key, value: key },
	          options[key] + ''
	        ));
	      });
	      return optionTags;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var value = this.selectInput.value;
	      if (value) {
	        this.props.filterHandler(value, _Const2.default.FILTER_TYPE.SELECT);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var selectClass = (0, _classnames2.default)('filter', 'select-filter', 'form-control', { 'placeholder-selected': this.state.isPlaceholderSelected });

	      return _react2.default.createElement(
	        'select',
	        { ref: function ref(n) {
	            return _this2.selectInput = n;
	          },
	          style: this.props.style,
	          className: selectClass,
	          onChange: this.filter,
	          defaultValue: this.props.defaultValue !== undefined ? this.props.defaultValue : '' },
	        this.getOptions()
	      );
	    }
	  }]);

	  return SelectFilter;
	}(_react.Component);

	SelectFilter.propTypes = {
	  filterHandler: _propTypes2.default.func.isRequired,
	  options: _propTypes2.default.object.isRequired,
	  placeholder: _propTypes2.default.string,
	  columnName: _propTypes2.default.any,
	  style: _propTypes2.default.oneOfType([_propTypes2.default.object])
	};

	var _default = SelectFilter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(optionsEquals, 'optionsEquals', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Select.js');

	  __REACT_HOT_LOADER__.register(SelectFilter, 'SelectFilter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Select.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Select.js');
	}();

	;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var legalComparators = ['=', '>', '>=', '<', '<=', '!='];

	var NumberFilter = function (_Component) {
	  _inherits(NumberFilter, _Component);

	  function NumberFilter(props) {
	    _classCallCheck(this, NumberFilter);

	    var _this = _possibleConstructorReturn(this, (NumberFilter.__proto__ || Object.getPrototypeOf(NumberFilter)).call(this, props));

	    _this.numberComparators = _this.props.numberComparators || legalComparators;
	    _this.timeout = null;
	    _this.state = {
	      isPlaceholderSelected: _this.props.defaultValue === undefined || _this.props.defaultValue.number === undefined || _this.props.options && _this.props.options.indexOf(_this.props.defaultValue.number) === -1
	    };
	    _this.onChangeNumber = _this.onChangeNumber.bind(_this);
	    _this.onChangeNumberSet = _this.onChangeNumberSet.bind(_this);
	    _this.onChangeComparator = _this.onChangeComparator.bind(_this);
	    return _this;
	  }

	  _createClass(NumberFilter, [{
	    key: 'onChangeNumber',
	    value: function onChangeNumber(event) {
	      var _this2 = this;

	      var comparator = this.numberFilterComparator.value;
	      if (comparator === '') {
	        return;
	      }
	      if (this.timeout) {
	        clearTimeout(this.timeout);
	      }
	      var filterValue = event.target.value;
	      this.timeout = setTimeout(function () {
	        _this2.props.filterHandler({ number: filterValue, comparator: comparator }, _Const2.default.FILTER_TYPE.NUMBER);
	      }, this.props.delay);
	    }
	  }, {
	    key: 'onChangeNumberSet',
	    value: function onChangeNumberSet(event) {
	      var comparator = this.numberFilterComparator.value;
	      var value = event.target.value;

	      this.setState(function () {
	        return { isPlaceholderSelected: value === '' };
	      });
	      if (comparator === '') {
	        return;
	      }
	      this.props.filterHandler({ number: value, comparator: comparator }, _Const2.default.FILTER_TYPE.NUMBER);
	    }
	  }, {
	    key: 'onChangeComparator',
	    value: function onChangeComparator(event) {
	      var value = this.numberFilter.value;
	      var comparator = event.target.value;
	      if (value === '') {
	        return;
	      }
	      this.props.filterHandler({ number: value, comparator: comparator }, _Const2.default.FILTER_TYPE.NUMBER);
	    }
	  }, {
	    key: 'cleanFiltered',
	    value: function cleanFiltered() {
	      var value = this.props.defaultValue ? this.props.defaultValue.number : '';
	      var comparator = this.props.defaultValue ? this.props.defaultValue.comparator : '';
	      this.setState(function () {
	        return { isPlaceholderSelected: value === '' };
	      });
	      this.numberFilterComparator.value = comparator;
	      this.numberFilter.value = value;
	      this.props.filterHandler({ number: value, comparator: comparator }, _Const2.default.FILTER_TYPE.NUMBER);
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter(filterObj) {
	      var number = filterObj.number,
	          comparator = filterObj.comparator;

	      this.setState(function () {
	        return { isPlaceholderSelected: number === '' };
	      });
	      this.numberFilterComparator.value = comparator;
	      this.numberFilter.value = number;
	      this.props.filterHandler({ number: number, comparator: comparator }, _Const2.default.FILTER_TYPE.NUMBER);
	    }
	  }, {
	    key: 'getComparatorOptions',
	    value: function getComparatorOptions() {
	      var optionTags = [];
	      var withoutEmptyComparatorOption = this.props.withoutEmptyComparatorOption;

	      if (!withoutEmptyComparatorOption) {
	        optionTags.push(_react2.default.createElement('option', { key: '-1' }));
	      }
	      for (var i = 0; i < this.numberComparators.length; i++) {
	        optionTags.push(_react2.default.createElement(
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
	      var _props = this.props,
	          options = _props.options,
	          withoutEmptyNumberOption = _props.withoutEmptyNumberOption;

	      if (!withoutEmptyNumberOption) {
	        optionTags.push(_react2.default.createElement(
	          'option',
	          { key: '-1', value: '' },
	          this.props.placeholder || 'Select ' + this.props.columnName + '...'
	        ));
	      }
	      for (var i = 0; i < options.length; i++) {
	        optionTags.push(_react2.default.createElement(
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
	      var comparator = this.numberFilterComparator.value;
	      var number = this.numberFilter.value;
	      if (comparator && number) {
	        this.props.filterHandler({ number: number, comparator: comparator }, _Const2.default.FILTER_TYPE.NUMBER);
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
	      var _this3 = this;

	      var selectClass = (0, _classnames2.default)('select-filter', 'number-filter-input', 'form-control', { 'placeholder-selected': this.state.isPlaceholderSelected });

	      return _react2.default.createElement(
	        'div',
	        { className: 'filter number-filter' },
	        _react2.default.createElement(
	          'select',
	          { ref: function ref(n) {
	              return _this3.numberFilterComparator = n;
	            },
	            style: this.props.style.comparator,
	            className: 'number-filter-comparator form-control',
	            onChange: this.onChangeComparator,
	            defaultValue: this.props.defaultValue ? this.props.defaultValue.comparator : '' },
	          this.getComparatorOptions()
	        ),
	        this.props.options ? _react2.default.createElement(
	          'select',
	          { ref: function ref(n) {
	              return _this3.numberFilter = n;
	            },
	            className: selectClass,
	            onChange: this.onChangeNumberSet,
	            defaultValue: this.props.defaultValue ? this.props.defaultValue.number : '' },
	          this.getNumberOptions()
	        ) : _react2.default.createElement('input', { ref: function ref(n) {
	            return _this3.numberFilter = n;
	          },
	          type: 'number',
	          style: this.props.style.number,
	          className: 'number-filter-input form-control',
	          placeholder: this.props.placeholder || 'Enter ' + this.props.columnName + '...',
	          onChange: this.onChangeNumber,
	          defaultValue: this.props.defaultValue ? this.props.defaultValue.number : '' })
	      );
	    }
	  }]);

	  return NumberFilter;
	}(_react.Component);

	NumberFilter.propTypes = {
	  filterHandler: _propTypes2.default.func.isRequired,
	  options: _propTypes2.default.arrayOf(_propTypes2.default.number),
	  defaultValue: _propTypes2.default.shape({
	    number: _propTypes2.default.number,
	    comparator: _propTypes2.default.oneOf(legalComparators)
	  }),
	  style: _propTypes2.default.shape({
	    number: _propTypes2.default.oneOfType([_propTypes2.default.object]),
	    comparator: _propTypes2.default.oneOfType([_propTypes2.default.object])
	  }),
	  delay: _propTypes2.default.number,
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
	  placeholder: _propTypes2.default.string,
	  columnName: _propTypes2.default.any,
	  withoutEmptyComparatorOption: _propTypes2.default.bool,
	  withoutEmptyNumberOption: _propTypes2.default.bool
	};

	NumberFilter.defaultProps = {
	  delay: _Const2.default.FILTER_DELAY,
	  withoutEmptyComparatorOption: false,
	  withoutEmptyNumberOption: false,
	  style: {
	    number: null,
	    comparator: null
	  }
	};

	var _default = NumberFilter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(legalComparators, 'legalComparators', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Number.js');

	  __REACT_HOT_LOADER__.register(NumberFilter, 'NumberFilter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Number.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filters/Number.js');
	}();

	;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _SelectRowHeaderColumn = __webpack_require__(31);

	var _SelectRowHeaderColumn2 = _interopRequireDefault(_SelectRowHeaderColumn);

	var _ExpandRowHeaderColumn = __webpack_require__(32);

	var _ExpandRowHeaderColumn2 = _interopRequireDefault(_ExpandRowHeaderColumn);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox = function (_Component) {
	  _inherits(Checkbox, _Component);

	  function Checkbox() {
	    _classCallCheck(this, Checkbox);

	    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
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
	      _reactDom2.default.findDOMNode(this).indeterminate = checked === 'indeterminate';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('input', { className: 'react-bs-select-all',
	        type: 'checkbox',
	        checked: this.props.checked,
	        onChange: this.props.onChange });
	    }
	  }]);

	  return Checkbox;
	}(_react.Component);

	function getSortOrder(sortList, field, enableSort) {
	  if (!enableSort) return undefined;
	  var result = sortList.filter(function (sortObj) {
	    return sortObj.sortField === field;
	  });
	  if (result.length > 0) {
	    return result[0].order;
	  } else {
	    return undefined;
	  }
	}

	var TableHeader = function (_Component2) {
	  _inherits(TableHeader, _Component2);

	  function TableHeader() {
	    var _ref;

	    var _temp, _this2, _ret;

	    _classCallCheck(this, TableHeader);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).call.apply(_ref, [this].concat(args))), _this2), _this2.getHeaderColGrouop = function () {
	      var _this3;

	      return (_this3 = _this2).__getHeaderColGrouop__REACT_HOT_LOADER__.apply(_this3, arguments);
	    }, _temp), _possibleConstructorReturn(_this2, _ret);
	  }

	  _createClass(TableHeader, [{
	    key: '__getHeaderColGrouop__REACT_HOT_LOADER__',
	    value: function __getHeaderColGrouop__REACT_HOT_LOADER__() {
	      return this.__getHeaderColGrouop__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _props = this.props,
	          sortIndicator = _props.sortIndicator,
	          sortList = _props.sortList,
	          onSort = _props.onSort,
	          reset = _props.reset,
	          version = _props.version,
	          condensed = _props.condensed,
	          bordered = _props.bordered,
	          expandedColumnHeaderComponent = _props.expandedColumnHeaderComponent,
	          noAnyExpand = _props.noAnyExpand,
	          toggleExpandAllChilds = _props.toggleExpandAllChilds,
	          expandAll = _props.expandAll;

	      var containerClasses = (0, _classnames2.default)('react-bs-container-header', 'table-header-wrapper', this.props.headerContainerClass);
	      var customTableClasses = {
	        'table-bordered': bordered
	      };
	      if (condensed) {
	        if (_util2.default.isBootstrap4(version)) customTableClasses['table-sm'] = true;else customTableClasses['table-condensed'] = true;
	      }
	      var tableClasses = (0, _classnames2.default)('table', 'table-hover', customTableClasses, this.props.tableHeaderClass);

	      var rowCount = Math.max.apply(Math, _toConsumableArray(_react2.default.Children.map(this.props.children, function (elm) {
	        return elm && elm.props.row ? Number(elm.props.row) : 0;
	      })));

	      var rows = [];
	      var rowKey = 0;

	      rows[0] = [];
	      rows[0].push([this.props.expandColumnVisible && this.props.expandColumnBeforeSelectColumn && _react2.default.createElement(_ExpandRowHeaderColumn2.default, { key: 'expandCol', rowCount: rowCount + 1,
	        expandedColumnHeaderComponent: expandedColumnHeaderComponent,
	        noAnyExpand: noAnyExpand,
	        expandAll: expandAll,
	        toggleExpandAllChilds: toggleExpandAllChilds })], [this.renderSelectRowHeader(rowCount + 1, rowKey++)], [this.props.expandColumnVisible && !this.props.expandColumnBeforeSelectColumn && _react2.default.createElement(_ExpandRowHeaderColumn2.default, { key: 'expandCol', rowCount: rowCount + 1,
	        expandedColumnHeaderComponent: expandedColumnHeaderComponent,
	        noAnyExpand: noAnyExpand,
	        expandAll: expandAll,
	        toggleExpandAllChilds: toggleExpandAllChilds })]);

	      _react2.default.Children.forEach(this.props.children, function (elm) {
	        if (elm === null || elm === undefined) {
	          // Skip null or undefined elements.
	          return;
	        }
	        var _elm$props = elm.props,
	            dataField = _elm$props.dataField,
	            dataSort = _elm$props.dataSort;

	        var sort = getSortOrder(sortList, dataField, dataSort);
	        var rowIndex = elm.props.row ? Number(elm.props.row) : 0;
	        var rowSpan = elm.props.rowSpan ? Number(elm.props.rowSpan) : 1;
	        if (rows[rowIndex] === undefined) {
	          rows[rowIndex] = [];
	        }
	        if (rowSpan + rowIndex === rowCount + 1) {
	          rows[rowIndex].push(_react2.default.cloneElement(elm, { reset: reset, key: rowKey++, onSort: onSort, sort: sort, sortIndicator: sortIndicator, isOnlyHead: false, version: version }));
	        } else {
	          rows[rowIndex].push(_react2.default.cloneElement(elm, { key: rowKey++, isOnlyHead: true, version: version }));
	        }
	      });

	      var trs = rows.map(function (row, indexRow) {
	        return _react2.default.createElement(
	          'tr',
	          { key: indexRow },
	          row
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(node) {
	            return _this4.container = node;
	          },
	          className: containerClasses,
	          style: this.props.style },
	        _react2.default.createElement(
	          'table',
	          { className: tableClasses },
	          _react2.default.cloneElement(this.props.colGroups, { ref: function ref(node) {
	              return _this4.headerGrp = node;
	            } }),
	          _react2.default.createElement(
	            'thead',
	            { ref: function ref(node) {
	                return _this4.header = node;
	              } },
	            trs
	          )
	        )
	      );
	    }
	  }, {
	    key: '__getHeaderColGrouop__REACT_HOT_LOADER__',
	    value: function __getHeaderColGrouop__REACT_HOT_LOADER__() {
	      return this.headerGrp.childNodes;
	    }
	  }, {
	    key: 'renderSelectRowHeader',
	    value: function renderSelectRowHeader(rowCount, rowKey) {
	      if (this.props.hideSelectColumn) {
	        return null;
	      } else if (this.props.customComponent) {
	        var CustomComponent = this.props.customComponent;
	        return _react2.default.createElement(
	          _SelectRowHeaderColumn2.default,
	          { key: rowKey, rowCount: rowCount },
	          _react2.default.createElement(CustomComponent, { type: 'checkbox', checked: this.props.isSelectAll,
	            indeterminate: this.props.isSelectAll === 'indeterminate', disabled: false,
	            onChange: this.props.onSelectAllRow, rowIndex: 'Header' })
	        );
	      } else if (this.props.rowSelectType === _Const2.default.ROW_SELECT_SINGLE) {
	        return _react2.default.createElement(_SelectRowHeaderColumn2.default, { key: rowKey, rowCount: rowCount });
	      } else if (this.props.rowSelectType === _Const2.default.ROW_SELECT_MULTI) {
	        return _react2.default.createElement(
	          _SelectRowHeaderColumn2.default,
	          { key: rowKey, rowCount: rowCount },
	          _react2.default.createElement(Checkbox, {
	            onChange: this.props.onSelectAllRow,
	            checked: this.props.isSelectAll })
	        );
	      } else {
	        return null;
	      }
	    }
	  }]);

	  return TableHeader;
	}(_react.Component);

	TableHeader.propTypes = {
	  headerContainerClass: _propTypes2.default.string,
	  tableHeaderClass: _propTypes2.default.string,
	  style: _propTypes2.default.object,
	  rowSelectType: _propTypes2.default.string,
	  onSort: _propTypes2.default.func,
	  onSelectAllRow: _propTypes2.default.func,
	  sortList: _propTypes2.default.array,
	  hideSelectColumn: _propTypes2.default.bool,
	  bordered: _propTypes2.default.bool,
	  condensed: _propTypes2.default.bool,
	  isFiltered: _propTypes2.default.bool,
	  isSelectAll: _propTypes2.default.oneOf([true, 'indeterminate', false]),
	  sortIndicator: _propTypes2.default.bool,
	  customComponent: _propTypes2.default.func,
	  colGroups: _propTypes2.default.element,
	  reset: _propTypes2.default.bool,
	  expandColumnVisible: _propTypes2.default.bool,
	  expandColumnComponent: _propTypes2.default.func,
	  expandedColumnHeaderComponent: _propTypes2.default.func,
	  expandColumnBeforeSelectColumn: _propTypes2.default.bool,
	  version: _propTypes2.default.string,
	  noAnyExpand: _propTypes2.default.bool,
	  expandAll: _propTypes2.default.bool,
	  toggleExpandAllChilds: _propTypes2.default.func
	};

	var _default = TableHeader;
	exports.default = _default;
	;

	var _temp2 = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Checkbox, 'Checkbox', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeader.js');

	  __REACT_HOT_LOADER__.register(getSortOrder, 'getSortOrder', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeader.js');

	  __REACT_HOT_LOADER__.register(TableHeader, 'TableHeader', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeader.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableHeader.js');
	}();

	;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectRowHeaderColumn = function (_Component) {
	  _inherits(SelectRowHeaderColumn, _Component);

	  function SelectRowHeaderColumn() {
	    _classCallCheck(this, SelectRowHeaderColumn);

	    return _possibleConstructorReturn(this, (SelectRowHeaderColumn.__proto__ || Object.getPrototypeOf(SelectRowHeaderColumn)).apply(this, arguments));
	  }

	  _createClass(SelectRowHeaderColumn, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'th',
	        { rowSpan: this.props.rowCount, style: { textAlign: 'center' },
	          'data-is-only-head': false },
	        this.props.children
	      );
	    }
	  }]);

	  return SelectRowHeaderColumn;
	}(_react.Component);

	SelectRowHeaderColumn.propTypes = {
	  children: _propTypes2.default.node,
	  rowCount: _propTypes2.default.number
	};
	var _default = SelectRowHeaderColumn;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(SelectRowHeaderColumn, 'SelectRowHeaderColumn', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/SelectRowHeaderColumn.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/SelectRowHeaderColumn.js');
	}();

	;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExpandRowHeaderColumn = function (_Component) {
	  _inherits(ExpandRowHeaderColumn, _Component);

	  function ExpandRowHeaderColumn(props) {
	    _classCallCheck(this, ExpandRowHeaderColumn);

	    var _this = _possibleConstructorReturn(this, (ExpandRowHeaderColumn.__proto__ || Object.getPrototypeOf(ExpandRowHeaderColumn)).call(this, props));

	    _this.toggleExpandAllChilds = _this.toggleExpandAllChilds.bind(_this);
	    return _this;
	  }

	  _createClass(ExpandRowHeaderColumn, [{
	    key: 'toggleExpandAllChilds',
	    value: function toggleExpandAllChilds() {
	      this.props.toggleExpandAllChilds();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          expandedColumnHeaderComponent = _props.expandedColumnHeaderComponent,
	          noAnyExpand = _props.noAnyExpand,
	          expandAll = _props.expandAll;

	      var expandedHeaderComponent = noAnyExpand ? _react2.default.createElement('span', { className: 'fa fa-plus glyphicon glyphicon-plus' }) : _react2.default.createElement('span', { className: 'fa fa-minus glyphicon glyphicon-minus' });
	      var ExpandedColumnHeaderComponent = expandedColumnHeaderComponent;

	      return _react2.default.createElement(
	        'th',
	        { rowSpan: this.props.rowCount, style: { textAlign: 'center' },
	          className: 'react-bs-table-expand-cell',
	          'data-is-only-head': false },
	        expandAll ? _react2.default.createElement(
	          'div',
	          { onClick: this.toggleExpandAllChilds },
	          expandedColumnHeaderComponent ? _react2.default.createElement(ExpandedColumnHeaderComponent, {
	            anyExpand: !noAnyExpand }) : expandedHeaderComponent
	        ) : null
	      );
	    }
	  }]);

	  return ExpandRowHeaderColumn;
	}(_react.Component);

	ExpandRowHeaderColumn.propTypes = {
	  expandedColumnHeaderComponent: _propTypes2.default.func,
	  rowCount: _propTypes2.default.number,
	  noAnyExpand: _propTypes2.default.bool,
	  expandAll: _propTypes2.default.bool,
	  toggleExpandAllChilds: _propTypes2.default.func
	};
	var _default = ExpandRowHeaderColumn;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(ExpandRowHeaderColumn, 'ExpandRowHeaderColumn', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/ExpandRowHeaderColumn.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/ExpandRowHeaderColumn.js');
	}();

	;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TableFooter = function (_Component) {
	  _inherits(TableFooter, _Component);

	  function TableFooter() {
	    _classCallCheck(this, TableFooter);

	    return _possibleConstructorReturn(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).apply(this, arguments));
	  }

	  _createClass(TableFooter, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          hideSelectColumn = _props.hideSelectColumn,
	          expandColumnVisible = _props.expandColumnVisible;

	      var containerClasses = (0, _classnames2.default)('react-bs-container-footer', 'table-footer-wrapper');
	      var tableClasses = (0, _classnames2.default)('table', 'table-hover', {
	        'table-bordered': this.props.bordered,
	        'table-condensed': this.props.condensed
	      }, this.props.tableFooterClass);
	      return _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(node) {
	            return _this2.container = node;
	          },
	          className: containerClasses,
	          style: this.props.style },
	        this.props.children.map(function (footerItem, footerItemIndex) {
	          return _react2.default.createElement(
	            'span',
	            { key: footerItemIndex },
	            _react2.default.createElement(
	              'table',
	              { className: tableClasses },
	              _react2.default.cloneElement(_this2.props.colGroups),
	              _react2.default.createElement(
	                'tfoot',
	                null,
	                _react2.default.createElement(
	                  'tr',
	                  { ref: function ref(node) {
	                      return _this2.footer = node;
	                    } },
	                  hideSelectColumn ? null : _this2.renderSelectionOrExpandCol(),
	                  !expandColumnVisible ? null : _this2.renderSelectionOrExpandCol(),
	                  _this2.props.columns.map(function (columnItem, colIndex) {
	                    if (!columnItem.hidden) {
	                      var footerObj = footerItem.filter(function (item) {
	                        return item.columnIndex === colIndex;
	                      });
	                      var footerData = void 0;
	                      var thAlignment = 'left';
	                      if (footerObj.length) {
	                        thAlignment = footerObj[0].align;
	                        if (footerObj[0].formatter) {
	                          footerData = footerObj[0].formatter(_this2.props.footerFormatterReturnData);
	                        } else {
	                          footerData = footerObj[0].label;
	                        }
	                      } else {
	                        footerData = '';
	                      }
	                      return _react2.default.createElement(
	                        'th',
	                        {
	                          key: colIndex,
	                          style: {
	                            minWidth: _this2.props.columns[colIndex].width + 'px',
	                            textAlign: thAlignment
	                          } },
	                        footerData
	                      );
	                    }
	                  })
	                )
	              )
	            )
	          );
	        })
	      );
	    }
	  }, {
	    key: 'renderSelectionOrExpandCol',
	    value: function renderSelectionOrExpandCol() {
	      return _react2.default.createElement('th', null);
	    }
	  }]);

	  return TableFooter;
	}(_react.Component);

	TableFooter.propTypes = {
	  tableHeaderClass: _propTypes2.default.string,
	  style: _propTypes2.default.object,
	  hideSelectColumn: _propTypes2.default.bool,
	  expandColumnVisible: _propTypes2.default.bool,
	  bordered: _propTypes2.default.bool,
	  condensed: _propTypes2.default.bool,
	  isFiltered: _propTypes2.default.bool,
	  sortIndicator: _propTypes2.default.bool
	};

	var _default = TableFooter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableFooter, 'TableFooter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableFooter.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableFooter.js');
	}();

	;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _TableRow = __webpack_require__(35);

	var _TableRow2 = _interopRequireDefault(_TableRow);

	var _TableColumn = __webpack_require__(36);

	var _TableColumn2 = _interopRequireDefault(_TableColumn);

	var _TableEditColumn = __webpack_require__(37);

	var _TableEditColumn2 = _interopRequireDefault(_TableEditColumn);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _ExpandComponent = __webpack_require__(40);

	var _ExpandComponent2 = _interopRequireDefault(_ExpandComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TableBody = function (_Component) {
	  _inherits(TableBody, _Component);

	  function TableBody(props) {
	    _classCallCheck(this, TableBody);

	    var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

	    _this.handleCellKeyDown = function () {
	      return _this.__handleCellKeyDown__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowMouseOut = function () {
	      return _this.__handleRowMouseOut__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowMouseOver = function () {
	      return _this.__handleRowMouseOver__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowClick = function () {
	      return _this.__handleRowClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleRowDoubleClick = function () {
	      return _this.__handleRowDoubleClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleSelectRow = function () {
	      return _this.__handleSelectRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleSelectRowColumChange = function () {
	      return _this.__handleSelectRowColumChange__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleClickCell = function () {
	      return _this.__handleClickCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleEditCell = function () {
	      return _this.__handleEditCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.nextEditableCell = function () {
	      return _this.__nextEditableCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleCompleteEditCell = function () {
	      return _this.__handleCompleteEditCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.cancelEditCell = function () {
	      return _this.__cancelEditCell__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleClickonSelectColumn = function () {
	      return _this.__handleClickonSelectColumn__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.getHeaderColGrouop = function () {
	      return _this.__getHeaderColGrouop__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.state = {
	      currEditCell: null
	    };
	    return _this;
	  }

	  _createClass(TableBody, [{
	    key: '__getHeaderColGrouop__REACT_HOT_LOADER__',
	    value: function __getHeaderColGrouop__REACT_HOT_LOADER__() {
	      return this.__getHeaderColGrouop__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleClickonSelectColumn__REACT_HOT_LOADER__',
	    value: function __handleClickonSelectColumn__REACT_HOT_LOADER__() {
	      return this.__handleClickonSelectColumn__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__cancelEditCell__REACT_HOT_LOADER__',
	    value: function __cancelEditCell__REACT_HOT_LOADER__() {
	      return this.__cancelEditCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCompleteEditCell__REACT_HOT_LOADER__',
	    value: function __handleCompleteEditCell__REACT_HOT_LOADER__() {
	      return this.__handleCompleteEditCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__nextEditableCell__REACT_HOT_LOADER__',
	    value: function __nextEditableCell__REACT_HOT_LOADER__() {
	      return this.__nextEditableCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleEditCell__REACT_HOT_LOADER__',
	    value: function __handleEditCell__REACT_HOT_LOADER__() {
	      return this.__handleEditCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleClickCell__REACT_HOT_LOADER__',
	    value: function __handleClickCell__REACT_HOT_LOADER__() {
	      return this.__handleClickCell__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSelectRowColumChange__REACT_HOT_LOADER__',
	    value: function __handleSelectRowColumChange__REACT_HOT_LOADER__() {
	      return this.__handleSelectRowColumChange__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSelectRow__REACT_HOT_LOADER__',
	    value: function __handleSelectRow__REACT_HOT_LOADER__() {
	      return this.__handleSelectRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowDoubleClick__REACT_HOT_LOADER__',
	    value: function __handleRowDoubleClick__REACT_HOT_LOADER__() {
	      return this.__handleRowDoubleClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowClick__REACT_HOT_LOADER__',
	    value: function __handleRowClick__REACT_HOT_LOADER__() {
	      return this.__handleRowClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowMouseOver__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOver__REACT_HOT_LOADER__() {
	      return this.__handleRowMouseOver__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleRowMouseOut__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOut__REACT_HOT_LOADER__() {
	      return this.__handleRowMouseOut__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCellKeyDown__REACT_HOT_LOADER__',
	    value: function __handleCellKeyDown__REACT_HOT_LOADER__() {
	      return this.__handleCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          cellEdit = _props.cellEdit,
	          beforeShowError = _props.beforeShowError,
	          x = _props.x,
	          y = _props.y,
	          keyBoardNav = _props.keyBoardNav,
	          trStyle = _props.trStyle,
	          version = _props.version;

	      var customTableClasses = {
	        'table-striped': this.props.striped,
	        'table-bordered': this.props.bordered,
	        'table-hover': this.props.hover
	      };
	      if (this.props.condensed) {
	        if (_util2.default.isBootstrap4(version)) customTableClasses['table-sm'] = true;else customTableClasses['table-condensed'] = true;
	      }
	      var tableClasses = (0, _classnames2.default)('table', customTableClasses, this.props.tableBodyClass);

	      var noneditableRows = cellEdit.nonEditableRows && cellEdit.nonEditableRows() || [];
	      var unselectable = this.props.selectRow.unselectable || [];
	      var isSelectRowDefined = _util2.default.isSelectRowDefined(this.props.selectRow.mode);
	      var tableHeader = _util2.default.renderColGroup(this.props.columns, this.props.selectRow, this.props.expandColumnOptions, version);
	      var inputType = this.props.selectRow.mode === _Const2.default.ROW_SELECT_SINGLE ? 'radio' : 'checkbox';
	      var CustomComponent = this.props.selectRow.customComponent;
	      var enableKeyBoardNav = keyBoardNav === true || (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object';
	      var customEditAndNavStyle = (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object' ? keyBoardNav.customStyleOnEditCell : null;
	      var customNavStyle = (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object' ? keyBoardNav.customStyle : null;
	      var ExpandColumnCustomComponent = this.props.expandColumnOptions.expandColumnComponent;
	      var expandColSpan = this.props.columns.filter(function (col) {
	        return col && !col.hidden;
	      }).length;
	      if (isSelectRowDefined && !this.props.selectRow.hideSelectColumn) {
	        expandColSpan += 1;
	      }
	      var tabIndex = 1;
	      if (this.props.expandColumnOptions.expandColumnVisible) {
	        expandColSpan += 1;
	      }

	      var tableRows = this.props.data.map(function (data, r) {
	        var tableColumns = this.props.columns.filter(function (_) {
	          return _ != null;
	        }).map(function (column, i) {
	          var fieldValue = data[column.name];
	          var isFocusCell = r === y && i === x;
	          if (column.name !== this.props.keyField && // Key field can't be edit
	          column.editable && // column is editable? default is true, user can set it false
	          column.editable.readOnly !== true && this.state.currEditCell !== null && this.state.currEditCell.rid === r && this.state.currEditCell.cid === i && noneditableRows.indexOf(data[this.props.keyField]) === -1) {
	            var editable = column.editable;
	            var format = column.format ? function (value) {
	              return column.format(value, data, column.formatExtraData, r).replace(/<.*?>/g, '');
	            } : false;
	            if (_util2.default.isFunction(column.editable)) {
	              editable = column.editable(fieldValue, data, r, i);
	            }

	            return _react2.default.createElement(_TableEditColumn2.default, {
	              completeEdit: this.handleCompleteEditCell
	              // add by bluespring for column editor customize
	              , editable: editable,
	              attrs: column.editAttrs,
	              customEditor: column.customEditor,
	              format: column.format ? format : false,
	              key: i,
	              blurToSave: cellEdit.blurToSave,
	              blurToEscape: cellEdit.blurToEscape,
	              onTab: this.handleEditCell,
	              rowIndex: r,
	              colIndex: i,
	              row: data,
	              fieldValue: fieldValue,
	              className: column.editClassName,
	              invalidColumnClassName: column.invalidEditColumnClassName,
	              beforeShowError: beforeShowError,
	              isFocus: isFocusCell,
	              customStyleWithNav: customEditAndNavStyle });
	          } else {
	            // add by bluespring for className customize
	            var formattedValue = void 0;
	            var columnChild = fieldValue && fieldValue.toString();
	            var columnTitle = null;
	            var tdClassName = column.className;
	            var tdStyles = column.style;
	            if (_util2.default.isFunction(column.className)) {
	              tdClassName = column.className(fieldValue, data, r, i);
	            }

	            if (_util2.default.isFunction(column.style)) {
	              tdStyles = column.style(fieldValue, data, r, i);
	            }

	            if (typeof column.format !== 'undefined') {
	              formattedValue = column.format(fieldValue, data, column.formatExtraData, r);
	              if (!_react2.default.isValidElement(formattedValue)) {
	                columnChild = _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: formattedValue } });
	              } else {
	                columnChild = formattedValue;
	              }
	            }
	            if (_util2.default.isFunction(column.columnTitle)) {
	              columnTitle = column.columnTitle(fieldValue, data, r, i);
	            } else if (typeof column.columnTitle === 'string') {
	              columnTitle = column.columnTitle;
	            } else if (column.columnTitle) {
	              if (formattedValue) columnTitle = formattedValue.toString();else if (fieldValue) columnTitle = fieldValue.toString();
	            }
	            return _react2.default.createElement(
	              _TableColumn2.default,
	              { key: i,
	                cIndex: i,
	                rIndex: r,
	                dataAlign: column.align,
	                className: tdClassName,
	                columnTitle: columnTitle,
	                cellEdit: cellEdit,
	                hidden: column.hidden,
	                onEdit: this.handleEditCell,
	                width: column.width,
	                onClick: this.handleClickCell,
	                attrs: column.attrs,
	                style: tdStyles,
	                tabIndex: tabIndex++ + '',
	                isFocus: isFocusCell,
	                keyBoardNav: enableKeyBoardNav,
	                onKeyDown: this.handleCellKeyDown,
	                customNavStyle: customNavStyle,
	                row: data,
	                withoutTabIndex: this.props.withoutTabIndex },
	              columnChild
	            );
	          }
	        }, this);
	        var key = data[this.props.keyField];
	        var disable = unselectable.indexOf(key) !== -1;
	        var selected = this.props.selectedRowKeys.indexOf(key) !== -1;
	        var selectRowColumn = isSelectRowDefined && !this.props.selectRow.hideSelectColumn ? this.renderSelectRowColumn(selected, inputType, disable, CustomComponent, r, data) : null;
	        var expandedRowColumn = this.renderExpandRowColumn(this.props.expandableRow && this.props.expandableRow(data), this.props.expanding.indexOf(key) > -1, ExpandColumnCustomComponent, r);
	        var haveExpandContent = this.props.expandableRow && this.props.expandableRow(data);
	        var isExpanding = haveExpandContent && this.props.expanding.indexOf(key) > -1;
	        var hideRowOnExpand = this.props.hideRowOnExpand;
	        // add by bluespring for className customize

	        var trClassName = this.props.trClassName;
	        if (_util2.default.isFunction(this.props.trClassName)) {
	          trClassName = this.props.trClassName(data, r);
	        }
	        if (isExpanding && this.props.expandParentClass) {
	          trClassName += _util2.default.isFunction(this.props.expandParentClass) ? ' ' + this.props.expandParentClass(data, r) : ' ' + this.props.expandParentClass;
	        }
	        var result = [_react2.default.createElement(
	          _TableRow2.default,
	          { isSelected: selected, key: key, className: trClassName,
	            index: r,
	            row: data,
	            selectRow: isSelectRowDefined ? this.props.selectRow : undefined,
	            enableCellEdit: cellEdit.mode !== _Const2.default.CELL_EDIT_NONE,
	            onRowClick: this.handleRowClick,
	            onRowDoubleClick: this.handleRowDoubleClick,
	            onRowMouseOver: this.handleRowMouseOver,
	            onRowMouseOut: this.handleRowMouseOut,
	            onSelectRow: this.handleSelectRow,
	            onExpandRow: this.handleClickCell,
	            unselectableRow: disable,
	            style: trStyle,
	            hidden: isExpanding && hideRowOnExpand,
	            dbClickToEdit: cellEdit.mode === _Const2.default.CELL_EDIT_DBCLICK },
	          this.props.expandColumnOptions.expandColumnVisible && this.props.expandColumnOptions.expandColumnBeforeSelectColumn && expandedRowColumn,
	          selectRowColumn,
	          this.props.expandColumnOptions.expandColumnVisible && !this.props.expandColumnOptions.expandColumnBeforeSelectColumn && expandedRowColumn,
	          tableColumns
	        )];

	        if (haveExpandContent) {
	          var expandBodyClass = _util2.default.isFunction(this.props.expandBodyClass) ? this.props.expandBodyClass(data, r, isExpanding) : this.props.expandBodyClass;
	          result.push(_react2.default.createElement(
	            _ExpandComponent2.default,
	            {
	              key: key + '-expand',
	              row: data,
	              className: expandBodyClass,
	              bgColor: this.props.expandRowBgColor || this.props.selectRow.bgColor || undefined,
	              hidden: !isExpanding,
	              colSpan: expandColSpan,
	              width: "100%" },
	            this.props.expandComponent(data)
	          ));
	        }
	        return result;
	      }, this);

	      if (tableRows.length === 0 && !this.props.withoutNoDataText) {
	        var colSpan = this.props.columns.filter(function (c) {
	          return !c.hidden;
	        }).length + (isSelectRowDefined && !this.props.selectRow.hideSelectColumn ? 1 : 0) + (this.props.expandColumnOptions.expandColumnVisible ? 1 : 0);
	        tableRows = [_react2.default.createElement(
	          _TableRow2.default,
	          { key: '##table-empty##', style: trStyle },
	          _react2.default.createElement(
	            'td',
	            { 'data-toggle': 'collapse',
	              colSpan: colSpan,
	              className: 'react-bs-table-no-data' },
	            this.props.noDataText || _Const2.default.NO_DATA_TEXT
	          )
	        )];
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(node) {
	            return _this2.container = node;
	          },
	          className: (0, _classnames2.default)('react-bs-container-body', this.props.bodyContainerClass),
	          style: this.props.style },
	        _react2.default.createElement(
	          'table',
	          { className: tableClasses },
	          _react2.default.cloneElement(tableHeader, { ref: function ref(node) {
	              return _this2.header = node;
	            } }),
	          _react2.default.createElement(
	            'tbody',
	            { ref: function ref(node) {
	                return _this2.tbody = node;
	              } },
	            tableRows
	          )
	        )
	      );
	    }
	  }, {
	    key: '__handleCellKeyDown__REACT_HOT_LOADER__',
	    value: function __handleCellKeyDown__REACT_HOT_LOADER__(e, lastEditCell) {
	      e.preventDefault();
	      var _props2 = this.props,
	          keyBoardNav = _props2.keyBoardNav,
	          onNavigateCell = _props2.onNavigateCell,
	          cellEdit = _props2.cellEdit,
	          selectedRowKeys = _props2.selectedRowKeys;

	      var offset = void 0;
	      if (e.keyCode === 37) {
	        offset = { x: -1, y: 0 };
	      } else if (e.keyCode === 38) {
	        offset = { x: 0, y: -1 };
	      } else if (e.keyCode === 39 || e.keyCode === 9) {
	        offset = { x: 1, y: 0 };
	        if (e.keyCode === 9 && lastEditCell) {
	          offset = _extends({}, offset, {
	            lastEditCell: lastEditCell
	          });
	        }
	      } else if (e.keyCode === 40) {
	        offset = { x: 0, y: 1 };
	      } else if (e.keyCode === 13) {
	        var rowIndex = e.target.parentElement.rowIndex + 1;
	        var enterToEdit = (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object' ? keyBoardNav.enterToEdit : false;
	        var enterToExpand = (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object' ? keyBoardNav.enterToExpand : false;
	        var enterToSelect = (typeof keyBoardNav === 'undefined' ? 'undefined' : _typeof(keyBoardNav)) === 'object' ? keyBoardNav.enterToSelect : false;

	        if (cellEdit && enterToEdit) {
	          this.handleEditCell(rowIndex, e.currentTarget.cellIndex, '', e);
	        }

	        if (enterToExpand) {
	          this.handleClickCell(e, this.props.y + 1, this.props.x);
	        }

	        if (enterToSelect) {
	          var isSelected = selectedRowKeys.indexOf(this.props.data[rowIndex - 1][this.props.keyField]) !== -1;
	          this.handleSelectRow(rowIndex, !isSelected, e);
	        }
	      }
	      if (offset && keyBoardNav) {
	        onNavigateCell(offset);
	      }
	    }
	  }, {
	    key: '__handleRowMouseOut__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOut__REACT_HOT_LOADER__(rowIndex, event) {
	      var targetRow = this.props.data[rowIndex];
	      this.props.onRowMouseOut(targetRow, event);
	    }
	  }, {
	    key: '__handleRowMouseOver__REACT_HOT_LOADER__',
	    value: function __handleRowMouseOver__REACT_HOT_LOADER__(rowIndex, event) {
	      var targetRow = this.props.data[rowIndex];
	      this.props.onRowMouseOver(targetRow, event);
	    }
	  }, {
	    key: '__handleRowClick__REACT_HOT_LOADER__',
	    value: function __handleRowClick__REACT_HOT_LOADER__(rowIndex, cellIndex, event) {
	      var _props3 = this.props,
	          onRowClick = _props3.onRowClick,
	          selectRow = _props3.selectRow;

	      if (_util2.default.isSelectRowDefined(selectRow.mode)) cellIndex--;
	      if (this._isExpandColumnVisible()) cellIndex--;
	      onRowClick(this.props.data[rowIndex - 1], rowIndex - 1, cellIndex, event);
	    }
	  }, {
	    key: '__handleRowDoubleClick__REACT_HOT_LOADER__',
	    value: function __handleRowDoubleClick__REACT_HOT_LOADER__(rowIndex, event) {
	      var onRowDoubleClick = this.props.onRowDoubleClick;

	      var targetRow = this.props.data[rowIndex];
	      onRowDoubleClick(targetRow, event);
	    }
	  }, {
	    key: '__handleSelectRow__REACT_HOT_LOADER__',
	    value: function __handleSelectRow__REACT_HOT_LOADER__(rowIndex, isSelected, e) {
	      var selectedRow = void 0;
	      var _props4 = this.props,
	          data = _props4.data,
	          onSelectRow = _props4.onSelectRow;

	      data.forEach(function (row, i) {
	        if (i === rowIndex - 1) {
	          selectedRow = row;
	          return false;
	        }
	      });
	      onSelectRow(selectedRow, isSelected, e, rowIndex - 1);
	    }
	  }, {
	    key: '__handleSelectRowColumChange__REACT_HOT_LOADER__',
	    value: function __handleSelectRowColumChange__REACT_HOT_LOADER__(e, rowIndex) {
	      if (!this.props.selectRow.clickToSelect || !this.props.selectRow.clickToSelectAndEditCell) {
	        this.handleSelectRow(rowIndex + 1, e.currentTarget.checked, e);
	      }
	    }
	  }, {
	    key: '__handleClickCell__REACT_HOT_LOADER__',
	    value: function __handleClickCell__REACT_HOT_LOADER__(event, rowIndex) {
	      var columnIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
	      var _props5 = this.props,
	          columns = _props5.columns,
	          keyField = _props5.keyField,
	          expandBy = _props5.expandBy,
	          expandableRow = _props5.expandableRow,
	          _props5$selectRow = _props5.selectRow,
	          mode = _props5$selectRow.mode,
	          clickToExpand = _props5$selectRow.clickToExpand,
	          hideSelectColumn = _props5$selectRow.hideSelectColumn,
	          onlyOneExpanding = _props5.onlyOneExpanding;

	      var isSelectRowDefined = _util2.default.isSelectRowDefined(mode);
	      var selectRowAndExpand = isSelectRowDefined && !clickToExpand ? false : true;
	      columnIndex = isSelectRowDefined && !hideSelectColumn ? columnIndex - 1 : columnIndex;
	      columnIndex = this._isExpandColumnVisible() ? columnIndex - 1 : columnIndex;
	      if (expandableRow && selectRowAndExpand && (expandBy === _Const2.default.EXPAND_BY_ROW ||
	      /* Below will allow expanding trigger by clicking on selection column
	      if configure as expanding by column */
	      expandBy === _Const2.default.EXPAND_BY_COL && columnIndex < 0 || expandBy === _Const2.default.EXPAND_BY_COL && columns[columnIndex].expandable)) {
	        var expanding = this.props.expanding;
	        var rowKey = this.props.data[rowIndex - 1][keyField];
	        var isRowExpanding = expanding.indexOf(rowKey) > -1;

	        if (isRowExpanding) {
	          // collapse
	          expanding = expanding.filter(function (k) {
	            return k !== rowKey;
	          });
	        } else {
	          // expand
	          if (onlyOneExpanding) expanding = [rowKey];else expanding.push(rowKey);
	        }
	        this.props.onExpand(expanding, rowKey, isRowExpanding, event);
	      }
	    }
	  }, {
	    key: '__handleEditCell__REACT_HOT_LOADER__',
	    value: function __handleEditCell__REACT_HOT_LOADER__(rowIndex, columnIndex, action, e) {
	      var selectRow = this.props.selectRow;

	      var defineSelectRow = _util2.default.isSelectRowDefined(selectRow.mode);
	      var expandColumnVisible = this._isExpandColumnVisible();
	      if (defineSelectRow) {
	        columnIndex--;
	        if (selectRow.hideSelectColumn) columnIndex++;
	      }
	      if (expandColumnVisible) {
	        columnIndex--;
	      }
	      rowIndex--;

	      if (action === 'tab') {
	        if (defineSelectRow && !selectRow.hideSelectColumn) columnIndex++;
	        if (expandColumnVisible) columnIndex++;
	        this.handleCompleteEditCell(e.target.value, rowIndex, columnIndex - 1);
	        if (columnIndex >= this.props.columns.length) {
	          this.handleCellKeyDown(e, true);
	        } else {
	          this.handleCellKeyDown(e);
	        }

	        var _nextEditableCell = this.nextEditableCell(rowIndex, columnIndex),
	            nextRIndex = _nextEditableCell.nextRIndex,
	            nextCIndex = _nextEditableCell.nextCIndex;

	        rowIndex = nextRIndex;
	        columnIndex = nextCIndex;
	      }

	      var stateObj = {
	        currEditCell: {
	          rid: rowIndex,
	          cid: columnIndex
	        }
	      };

	      if (this.props.selectRow.clickToSelectAndEditCell && this.props.cellEdit.mode !== _Const2.default.CELL_EDIT_DBCLICK) {
	        var selected = this.props.selectedRowKeys.indexOf(this.props.data[rowIndex][this.props.keyField]) !== -1;
	        this.handleSelectRow(rowIndex + 1, !selected, e);
	      }
	      this.setState(function () {
	        return stateObj;
	      });
	    }
	  }, {
	    key: '__nextEditableCell__REACT_HOT_LOADER__',
	    value: function __nextEditableCell__REACT_HOT_LOADER__(rIndex, cIndex) {
	      var keyField = this.props.keyField;

	      var nextRIndex = rIndex;
	      var nextCIndex = cIndex;
	      var row = void 0;
	      var column = void 0;
	      do {
	        if (nextCIndex >= this.props.columns.length) {
	          nextRIndex++;
	          nextCIndex = 0;
	        }
	        row = this.props.data[nextRIndex];
	        column = this.props.columns[nextCIndex];
	        if (!row) break;
	        var editable = column.editable;
	        if (_util2.default.isFunction(column.editable)) {
	          editable = column.editable(column, row, nextRIndex, nextCIndex);
	        }
	        if (editable && editable.readOnly !== true && !column.hidden && keyField !== column.name) {
	          break;
	        } else {
	          nextCIndex++;
	        }
	      } while (row);
	      return { nextRIndex: nextRIndex, nextCIndex: nextCIndex };
	    }
	  }, {
	    key: '__handleCompleteEditCell__REACT_HOT_LOADER__',
	    value: function __handleCompleteEditCell__REACT_HOT_LOADER__(newVal, rowIndex, columnIndex) {
	      if (newVal !== null) {
	        var result = this.props.onEditCell(newVal, rowIndex, columnIndex);
	        if (result !== _Const2.default.AWAIT_BEFORE_CELL_EDIT) {
	          this.setState(function () {
	            return { currEditCell: null };
	          });
	        }
	      } else {
	        this.setState(function () {
	          return { currEditCell: null };
	        });
	      }
	    }
	  }, {
	    key: '__cancelEditCell__REACT_HOT_LOADER__',
	    value: function __cancelEditCell__REACT_HOT_LOADER__() {
	      this.setState(function () {
	        return { currEditCell: null };
	      });
	    }
	  }, {
	    key: '__handleClickonSelectColumn__REACT_HOT_LOADER__',
	    value: function __handleClickonSelectColumn__REACT_HOT_LOADER__(e, isSelect, rowIndex, row) {
	      e.stopPropagation();
	      if (e.target.tagName === 'TD' && (this.props.selectRow.clickToSelect || this.props.selectRow.clickToSelectAndEditCell)) {
	        var unselectable = this.props.selectRow.unselectable || [];
	        if (unselectable.indexOf(row[this.props.keyField]) === -1) {
	          this.handleSelectRow(rowIndex + 1, isSelect, e);
	          this.handleClickCell(e, rowIndex + 1);
	        }
	      }
	    }
	  }, {
	    key: 'renderSelectRowColumn',
	    value: function renderSelectRowColumn(selected, inputType, disabled) {
	      var CustomComponent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	      var _this3 = this;

	      var rowIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	      var row = arguments[5];

	      return _react2.default.createElement(
	        'td',
	        { onClick: function onClick(e) {
	            _this3.handleClickonSelectColumn(e, !selected, rowIndex, row);
	          }, style: { textAlign: 'center' } },
	        CustomComponent ? _react2.default.createElement(CustomComponent, { type: inputType, checked: selected, disabled: disabled,
	          rowIndex: rowIndex,
	          onChange: function onChange(e) {
	            return _this3.handleSelectRowColumChange(e, rowIndex);
	          } }) : _react2.default.createElement('input', { type: inputType, checked: selected, disabled: disabled,
	          onChange: function onChange(e) {
	            return _this3.handleSelectRowColumChange(e, rowIndex);
	          } })
	      );
	    }
	  }, {
	    key: 'renderExpandRowColumn',
	    value: function renderExpandRowColumn(isExpandableRow, isExpanded, CustomComponent) {
	      var _this4 = this;

	      var rowIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	      var content = null;
	      if (CustomComponent) {
	        content = _react2.default.createElement(CustomComponent, { isExpandableRow: isExpandableRow, isExpanded: isExpanded });
	      } else if (isExpandableRow) {
	        content = isExpanded ? _react2.default.createElement('span', { className: 'fa fa-minus glyphicon glyphicon-minus' }) : _react2.default.createElement('span', { className: 'fa fa-plus glyphicon glyphicon-plus' });
	      } else {
	        content = ' ';
	      }

	      return _react2.default.createElement(
	        'td',
	        {
	          className: 'react-bs-table-expand-cell',
	          onClick: function onClick(e) {
	            return _this4.handleClickCell(e, rowIndex + 1);
	          } },
	        content
	      );
	    }
	  }, {
	    key: '_isExpandColumnVisible',
	    value: function _isExpandColumnVisible() {
	      return this.props.expandColumnOptions.expandColumnVisible;
	    }
	  }, {
	    key: '__getHeaderColGrouop__REACT_HOT_LOADER__',
	    value: function __getHeaderColGrouop__REACT_HOT_LOADER__() {
	      return this.header.childNodes;
	    }
	  }]);

	  return TableBody;
	}(_react.Component);

	TableBody.propTypes = {
	  version: _propTypes2.default.string,
	  data: _propTypes2.default.array,
	  columns: _propTypes2.default.array,
	  striped: _propTypes2.default.bool,
	  bordered: _propTypes2.default.bool,
	  hover: _propTypes2.default.bool,
	  condensed: _propTypes2.default.bool,
	  keyField: _propTypes2.default.string,
	  selectedRowKeys: _propTypes2.default.array,
	  onRowClick: _propTypes2.default.func,
	  onRowDoubleClick: _propTypes2.default.func,
	  onSelectRow: _propTypes2.default.func,
	  noDataText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
	  withoutNoDataText: _propTypes2.default.bool,
	  style: _propTypes2.default.object,
	  tableBodyClass: _propTypes2.default.string,
	  bodyContainerClass: _propTypes2.default.string,
	  expandableRow: _propTypes2.default.func,
	  expandComponent: _propTypes2.default.func,
	  expandRowBgColor: _propTypes2.default.string,
	  expandBy: _propTypes2.default.string,
	  expanding: _propTypes2.default.array,
	  onExpand: _propTypes2.default.func,
	  expandBodyClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  expandParentClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  onlyOneExpanding: _propTypes2.default.bool,
	  beforeShowError: _propTypes2.default.func,
	  keyBoardNav: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
	  x: _propTypes2.default.number,
	  y: _propTypes2.default.number,
	  onNavigateCell: _propTypes2.default.func,
	  withoutTabIndex: _propTypes2.default.bool,
	  hideRowOnExpand: _propTypes2.default.bool
	};
	var _default = TableBody;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableBody, 'TableBody', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableBody.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableBody.js');
	}();

	;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-nested-ternary: 0 */


	var TableRow = function (_Component) {
	  _inherits(TableRow, _Component);

	  function TableRow(props) {
	    _classCallCheck(this, TableRow);

	    var _this = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props));

	    _this.rowClick = function () {
	      return _this.__rowClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.expandRow = function () {
	      return _this.__expandRow__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.rowDoubleClick = function () {
	      return _this.__rowDoubleClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.rowMouseOut = function () {
	      return _this.__rowMouseOut__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.rowMouseOver = function () {
	      return _this.__rowMouseOver__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.clickNum = 0;
	    return _this;
	  }

	  _createClass(TableRow, [{
	    key: '__rowMouseOver__REACT_HOT_LOADER__',
	    value: function __rowMouseOver__REACT_HOT_LOADER__() {
	      return this.__rowMouseOver__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__rowMouseOut__REACT_HOT_LOADER__',
	    value: function __rowMouseOut__REACT_HOT_LOADER__() {
	      return this.__rowMouseOut__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__rowDoubleClick__REACT_HOT_LOADER__',
	    value: function __rowDoubleClick__REACT_HOT_LOADER__() {
	      return this.__rowDoubleClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__expandRow__REACT_HOT_LOADER__',
	    value: function __expandRow__REACT_HOT_LOADER__() {
	      return this.__expandRow__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__rowClick__REACT_HOT_LOADER__',
	    value: function __rowClick__REACT_HOT_LOADER__() {
	      return this.__rowClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__rowClick__REACT_HOT_LOADER__',
	    value: function __rowClick__REACT_HOT_LOADER__(e) {
	      var _this2 = this;

	      var rowIndex = this.props.index + 1;
	      var cellIndex = e.target.cellIndex;
	      if (this.props.onRowClick) this.props.onRowClick(rowIndex, cellIndex, e);
	      var _props = this.props,
	          selectRow = _props.selectRow,
	          unselectableRow = _props.unselectableRow,
	          isSelected = _props.isSelected,
	          onSelectRow = _props.onSelectRow,
	          onExpandRow = _props.onExpandRow,
	          dbClickToEdit = _props.dbClickToEdit;

	      if (selectRow) {
	        if (selectRow.clickToSelect && !unselectableRow) {
	          onSelectRow(rowIndex, !isSelected, e);
	        } else if (selectRow.clickToSelectAndEditCell && !unselectableRow) {
	          this.clickNum++;
	          /** if clickToSelectAndEditCell is enabled,
	           *  there should be a delay to prevent a selection changed when
	           *  user dblick to edit cell on same row but different cell
	          **/
	          setTimeout(function () {
	            if (_this2.clickNum === 1) {
	              onSelectRow(rowIndex, !isSelected, e);
	              onExpandRow(e, rowIndex, cellIndex);
	            }
	            _this2.clickNum = 0;
	          }, 200);
	        } else {
	          if (dbClickToEdit) {
	            this.expandRow(e, rowIndex, cellIndex);
	          }
	        }
	      }
	    }
	  }, {
	    key: '__expandRow__REACT_HOT_LOADER__',
	    value: function __expandRow__REACT_HOT_LOADER__(event, rowIndex, cellIndex) {
	      var _this3 = this;

	      this.clickNum++;
	      setTimeout(function () {
	        if (_this3.clickNum === 1) {
	          _this3.props.onExpandRow(event, rowIndex, cellIndex);
	        }
	        _this3.clickNum = 0;
	      }, 200);
	    }
	  }, {
	    key: '__rowDoubleClick__REACT_HOT_LOADER__',
	    value: function __rowDoubleClick__REACT_HOT_LOADER__(e) {
	      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
	        if (this.props.onRowDoubleClick) {
	          this.props.onRowDoubleClick(this.props.index, e);
	        }
	      }
	    }
	  }, {
	    key: '__rowMouseOut__REACT_HOT_LOADER__',
	    value: function __rowMouseOut__REACT_HOT_LOADER__(e) {
	      var rowIndex = this.props.index;
	      if (this.props.onRowMouseOut) {
	        this.props.onRowMouseOut(rowIndex, e);
	      }
	    }
	  }, {
	    key: '__rowMouseOver__REACT_HOT_LOADER__',
	    value: function __rowMouseOver__REACT_HOT_LOADER__(e) {
	      var rowIndex = this.props.index;
	      if (this.props.onRowMouseOver) {
	        this.props.onRowMouseOver(rowIndex, e);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.clickNum = 0;
	      var _props2 = this.props,
	          selectRow = _props2.selectRow,
	          row = _props2.row,
	          isSelected = _props2.isSelected,
	          className = _props2.className,
	          index = _props2.index,
	          hidden = _props2.hidden;
	      var style = this.props.style;

	      var backgroundColor = null;
	      var selectRowClass = null;

	      if (selectRow) {
	        backgroundColor = _util2.default.isFunction(selectRow.bgColor) ? selectRow.bgColor(row, isSelected) : isSelected ? selectRow.bgColor : null;

	        selectRowClass = _util2.default.isFunction(selectRow.className) ? selectRow.className(row, isSelected) : isSelected ? selectRow.className : null;
	      }

	      if (_util2.default.isFunction(style)) {
	        style = style(row, index);
	      } else {
	        style = _extends({}, style) || {};
	      }
	      // the bgcolor of row selection always overwrite the bgcolor defined by global.
	      if (style && backgroundColor && isSelected) {
	        style.backgroundColor = backgroundColor;
	      }
	      var trCss = {
	        style: _extends({}, style),
	        className: (0, _classnames2.default)(selectRowClass, className)
	      };

	      return _react2.default.createElement(
	        'tr',
	        _extends({}, trCss, {
	          onMouseOver: this.rowMouseOver,
	          onMouseOut: this.rowMouseOut,
	          onClick: this.rowClick,
	          hidden: hidden,
	          onDoubleClick: this.rowDoubleClick }),
	        this.props.children
	      );
	    }
	  }]);

	  return TableRow;
	}(_react.Component);

	TableRow.propTypes = {
	  index: _propTypes2.default.number,
	  row: _propTypes2.default.any,
	  style: _propTypes2.default.any,
	  isSelected: _propTypes2.default.bool,
	  enableCellEdit: _propTypes2.default.bool,
	  onRowClick: _propTypes2.default.func,
	  onRowDoubleClick: _propTypes2.default.func,
	  onSelectRow: _propTypes2.default.func,
	  onExpandRow: _propTypes2.default.func,
	  onRowMouseOut: _propTypes2.default.func,
	  onRowMouseOver: _propTypes2.default.func,
	  unselectableRow: _propTypes2.default.bool,
	  hidden: _propTypes2.default.bool
	};
	TableRow.defaultProps = {
	  onRowClick: undefined,
	  onRowDoubleClick: undefined,
	  hidden: false
	};
	var _default = TableRow;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableRow, 'TableRow', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableRow.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableRow.js');
	}();

	;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TableColumn = function (_Component) {
	  _inherits(TableColumn, _Component);

	  function TableColumn(props) {
	    _classCallCheck(this, TableColumn);

	    var _this = _possibleConstructorReturn(this, (TableColumn.__proto__ || Object.getPrototypeOf(TableColumn)).call(this, props));

	    _this.handleCellEdit = function () {
	      return _this.__handleCellEdit__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleCellClick = function () {
	      return _this.__handleCellClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleKeyDown = function () {
	      return _this.__handleKeyDown__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    return _this;
	  }
	  /* eslint no-unused-vars: [0, { "args": "after-used" }] */


	  _createClass(TableColumn, [{
	    key: '__handleKeyDown__REACT_HOT_LOADER__',
	    value: function __handleKeyDown__REACT_HOT_LOADER__() {
	      return this.__handleKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCellClick__REACT_HOT_LOADER__',
	    value: function __handleCellClick__REACT_HOT_LOADER__() {
	      return this.__handleCellClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCellEdit__REACT_HOT_LOADER__',
	    value: function __handleCellEdit__REACT_HOT_LOADER__() {
	      return this.__handleCellEdit__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      var children = this.props.children;

	      var shouldUpdated = this.props.width !== nextProps.width || this.props.className !== nextProps.className || this.props.hidden !== nextProps.hidden || this.props.dataAlign !== nextProps.dataAlign || this.props.isFocus !== nextProps.isFocus || (typeof children === 'undefined' ? 'undefined' : _typeof(children)) !== _typeof(nextProps.children) || ('' + this.props.onEdit).toString() !== ('' + nextProps.onEdit).toString();

	      if (shouldUpdated) {
	        return shouldUpdated;
	      }

	      if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object' && children !== null && children.props !== null) {
	        if (children.props.type === 'checkbox' || children.props.type === 'radio') {
	          shouldUpdated = shouldUpdated || children.props.type !== nextProps.children.props.type || children.props.checked !== nextProps.children.props.checked || children.props.disabled !== nextProps.children.props.disabled;
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
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var dom = _reactDom2.default.findDOMNode(this);
	      if (this.props.isFocus) {
	        dom.focus();
	      } else {
	        dom.blur();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var dom = _reactDom2.default.findDOMNode(this);
	      if (this.props.isFocus) {
	        dom.focus();
	      } else {
	        dom.blur();
	      }
	    }
	  }, {
	    key: '__handleCellEdit__REACT_HOT_LOADER__',
	    value: function __handleCellEdit__REACT_HOT_LOADER__(e) {
	      try {
	        if (this.props.cellEdit.mode === _Const2.default.CELL_EDIT_DBCLICK) {
	          if (document.selection && document.selection.empty) {
	            document.selection.empty();
	          } else if (window.getSelection) {
	            var sel = window.getSelection();
	            sel.removeAllRanges();
	          }
	        }
	      } catch (err) {} /* eslint no-empty: 0 */
	      this.props.onEdit(this.props.rIndex + 1, e.currentTarget.cellIndex, e);
	      if (this.props.cellEdit.mode !== _Const2.default.CELL_EDIT_DBCLICK) {
	        this.props.onClick(e, this.props.rIndex + 1, e.currentTarget.cellIndex);
	      }
	    }
	  }, {
	    key: '__handleCellClick__REACT_HOT_LOADER__',
	    value: function __handleCellClick__REACT_HOT_LOADER__(e) {
	      var _props = this.props,
	          onClick = _props.onClick,
	          rIndex = _props.rIndex;

	      if (onClick) {
	        onClick(e, rIndex + 1, e.currentTarget.cellIndex);
	      }
	    }
	  }, {
	    key: '__handleKeyDown__REACT_HOT_LOADER__',
	    value: function __handleKeyDown__REACT_HOT_LOADER__(e) {
	      if (this.props.keyBoardNav) {
	        this.props.onKeyDown(e);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          children = _props2.children,
	          columnTitle = _props2.columnTitle,
	          dataAlign = _props2.dataAlign,
	          hidden = _props2.hidden,
	          cellEdit = _props2.cellEdit,
	          attrs = _props2.attrs,
	          style = _props2.style,
	          isFocus = _props2.isFocus,
	          keyBoardNav = _props2.keyBoardNav,
	          tabIndex = _props2.tabIndex,
	          customNavStyle = _props2.customNavStyle,
	          withoutTabIndex = _props2.withoutTabIndex,
	          row = _props2.row;
	      var className = this.props.className;


	      var tdStyle = _extends({
	        textAlign: dataAlign,
	        display: hidden ? 'none' : null
	      }, style);

	      var opts = {};

	      if (cellEdit) {
	        if (cellEdit.mode === _Const2.default.CELL_EDIT_CLICK) {
	          opts.onClick = this.handleCellEdit;
	        } else if (cellEdit.mode === _Const2.default.CELL_EDIT_DBCLICK) {
	          opts.onDoubleClick = this.handleCellEdit;
	        } else {
	          opts.onClick = this.handleCellClick;
	        }
	      }

	      if (keyBoardNav && isFocus) {
	        opts.onKeyDown = this.handleKeyDown;
	      }

	      if (isFocus) {
	        if (customNavStyle) {
	          var cusmtStyle = _util2.default.isFunction(customNavStyle) ? customNavStyle(children, row) : customNavStyle;
	          tdStyle = _extends({}, tdStyle, cusmtStyle);
	        } else {
	          className = className + ' default-focus-cell';
	        }
	      }

	      var attr = {};
	      if (!withoutTabIndex) attr.tabIndex = tabIndex;
	      return _react2.default.createElement(
	        'td',
	        _extends({}, attr, { style: tdStyle,
	          title: columnTitle,
	          className: className
	        }, opts, attrs),
	        typeof children === 'boolean' ? children.toString() : children
	      );
	    }
	  }]);

	  return TableColumn;
	}(_react.Component);

	TableColumn.propTypes = {
	  rIndex: _propTypes2.default.number,
	  dataAlign: _propTypes2.default.string,
	  hidden: _propTypes2.default.bool,
	  className: _propTypes2.default.string,
	  columnTitle: _propTypes2.default.string,
	  children: _propTypes2.default.node,
	  onClick: _propTypes2.default.func,
	  attrs: _propTypes2.default.object,
	  style: _propTypes2.default.object,
	  isFocus: _propTypes2.default.bool,
	  onKeyDown: _propTypes2.default.func,
	  tabIndex: _propTypes2.default.string,
	  withoutTabIndex: _propTypes2.default.bool,
	  keyBoardNav: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
	  customNavStyle: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
	  row: _propTypes2.default.any /* only used on custom styling for navigation */
	};

	TableColumn.defaultProps = {
	  dataAlign: 'left',
	  withoutTabIndex: false,
	  hidden: false,
	  className: '',
	  isFocus: false,
	  keyBoardNav: false
	};
	var _default = TableColumn;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableColumn, 'TableColumn', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableColumn.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableColumn.js');
	}();

	;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Editor = __webpack_require__(38);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _Notification = __webpack_require__(39);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TableEditColumn = function (_Component) {
	  _inherits(TableEditColumn, _Component);

	  function TableEditColumn(props) {
	    _classCallCheck(this, TableEditColumn);

	    var _this = _possibleConstructorReturn(this, (TableEditColumn.__proto__ || Object.getPrototypeOf(TableEditColumn)).call(this, props));

	    _this.handleKeyPress = function () {
	      return _this.__handleKeyPress__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleBlur = function () {
	      return _this.__handleBlur__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleCustomUpdate = function () {
	      return _this.__handleCustomUpdate__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.notifyToastr = function () {
	      return _this.__notifyToastr__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleClick = function () {
	      return _this.__handleClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.getInputRef = function () {
	      return _this.__getInputRef__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.getHandleKeyPress = function () {
	      return _this.__getHandleKeyPress__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.getHandleBlur = function () {
	      return _this.__getHandleBlur__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.timeouteClear = 0;
	    var _this$props = _this.props,
	        fieldValue = _this$props.fieldValue,
	        row = _this$props.row,
	        className = _this$props.className;

	    _this.focusInEditor = _this.focusInEditor.bind(_this);
	    _this.state = {
	      shakeEditor: false,
	      className: _util2.default.isFunction(className) ? className(fieldValue, row) : className
	    };
	    return _this;
	  }

	  _createClass(TableEditColumn, [{
	    key: '__getHandleBlur__REACT_HOT_LOADER__',
	    value: function __getHandleBlur__REACT_HOT_LOADER__() {
	      return this.__getHandleBlur__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__getHandleKeyPress__REACT_HOT_LOADER__',
	    value: function __getHandleKeyPress__REACT_HOT_LOADER__() {
	      return this.__getHandleKeyPress__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__getInputRef__REACT_HOT_LOADER__',
	    value: function __getInputRef__REACT_HOT_LOADER__() {
	      return this.__getInputRef__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleClick__REACT_HOT_LOADER__',
	    value: function __handleClick__REACT_HOT_LOADER__() {
	      return this.__handleClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__notifyToastr__REACT_HOT_LOADER__',
	    value: function __notifyToastr__REACT_HOT_LOADER__() {
	      return this.__notifyToastr__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCustomUpdate__REACT_HOT_LOADER__',
	    value: function __handleCustomUpdate__REACT_HOT_LOADER__() {
	      return this.__handleCustomUpdate__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleBlur__REACT_HOT_LOADER__',
	    value: function __handleBlur__REACT_HOT_LOADER__() {
	      return this.__handleBlur__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleKeyPress__REACT_HOT_LOADER__',
	    value: function __handleKeyPress__REACT_HOT_LOADER__() {
	      return this.__handleKeyPress__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'valueShortCircuit',
	    value: function valueShortCircuit(value) {
	      return value === null || typeof value === 'undefined' ? '' : value;
	    }
	  }, {
	    key: '__handleKeyPress__REACT_HOT_LOADER__',
	    value: function __handleKeyPress__REACT_HOT_LOADER__(e) {
	      if (e.keyCode === 13 || e.keyCode === 9) {
	        // Pressed ENTER or TAB
	        var value = e.currentTarget.type === 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;

	        if (e.keyCode === 9 && this.props.blurToSave || !this.validator(value)) {
	          return;
	        }

	        if (e.keyCode === 13) {
	          this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
	        } else {
	          this.props.onTab(this.props.rowIndex + 1, this.props.colIndex + 1, 'tab', e);
	          e.preventDefault();
	        }
	      } else if (e.keyCode === 27) {
	        this.props.completeEdit(null, this.props.rowIndex, this.props.colIndex);
	      } else if (e.type === 'click' && !this.props.blurToSave) {
	        // textarea click save button
	        var _value = e.target.parentElement.firstChild.value;
	        if (!this.validator(_value)) {
	          return;
	        }
	        this.props.completeEdit(_value, this.props.rowIndex, this.props.colIndex);
	      }
	    }
	  }, {
	    key: '__handleBlur__REACT_HOT_LOADER__',
	    value: function __handleBlur__REACT_HOT_LOADER__(e) {
	      e.stopPropagation();
	      if (this.props.blurToSave) {
	        var value = e.currentTarget.type === 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;
	        if (!this.validator(value)) {
	          return false;
	        }
	        this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
	      } else if (this.props.blurToEscape) {
	        this.props.completeEdit(null, this.props.rowIndex, this.props.colIndex);
	      }
	    }
	  }, {
	    key: '__handleCustomUpdate__REACT_HOT_LOADER__',


	    // modified by iuculanop
	    // BEGIN
	    value: function __handleCustomUpdate__REACT_HOT_LOADER__(value) {
	      if (!this.validator(value)) {
	        return;
	      }
	      this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
	    }
	  }, {
	    key: 'validator',
	    value: function validator(value) {
	      var ts = this;
	      var valid = true;
	      if (ts.props.editable.validator) {
	        var checkVal = ts.props.editable.validator(value, this.props.row);
	        var responseType = typeof checkVal === 'undefined' ? 'undefined' : _typeof(checkVal);
	        if (responseType !== 'object' && checkVal !== true) {
	          valid = false;
	          this.notifyToastr('error', checkVal, '');
	        } else if (responseType === 'object' && checkVal.isValid !== true) {
	          valid = false;
	          this.notifyToastr(checkVal.notification.type, checkVal.notification.msg, checkVal.notification.title);
	        }
	        if (!valid) {
	          // animate input
	          ts.clearTimeout();
	          var _props = this.props,
	              invalidColumnClassName = _props.invalidColumnClassName,
	              row = _props.row;

	          var className = _util2.default.isFunction(invalidColumnClassName) ? invalidColumnClassName(value, row) : invalidColumnClassName;
	          ts.setState({ shakeEditor: true, className: className });
	          ts.timeouteClear = setTimeout(function () {
	            ts.setState({ shakeEditor: false });
	          }, 300);
	          this.focusInEditor();
	          return valid;
	        }
	      }
	      return valid;
	    }
	    // END

	  }, {
	    key: '__notifyToastr__REACT_HOT_LOADER__',
	    value: function __notifyToastr__REACT_HOT_LOADER__(type, message, title) {
	      var toastr = true;
	      var beforeShowError = this.props.beforeShowError;

	      if (beforeShowError) {
	        toastr = beforeShowError(type, message, title);
	      }
	      if (toastr) {
	        (0, _Notification.notice)(type, message, title);
	      }
	    }
	  }, {
	    key: 'clearTimeout',
	    value: function (_clearTimeout) {
	      function clearTimeout() {
	        return _clearTimeout.apply(this, arguments);
	      }

	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };

	      return clearTimeout;
	    }(function () {
	      if (this.timeouteClear !== 0) {
	        clearTimeout(this.timeouteClear);
	        this.timeouteClear = 0;
	      }
	    })
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.focusInEditor();
	      var dom = _reactDom2.default.findDOMNode(this);
	      if (this.props.isFocus) {
	        dom.focus();
	      } else {
	        dom.blur();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var dom = _reactDom2.default.findDOMNode(this);
	      if (this.props.isFocus) {
	        dom.focus();
	      } else {
	        dom.blur();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearTimeout();
	    }
	  }, {
	    key: 'focusInEditor',
	    value: function focusInEditor() {
	      if (this.inputRef && _util2.default.isFunction(this.inputRef.focus)) {
	        this.inputRef.focus();
	      }
	    }
	  }, {
	    key: '__handleClick__REACT_HOT_LOADER__',
	    value: function __handleClick__REACT_HOT_LOADER__(e) {
	      if (e.target.tagName !== 'TD') {
	        e.stopPropagation();
	      }
	    }
	  }, {
	    key: '__getInputRef__REACT_HOT_LOADER__',
	    value: function __getInputRef__REACT_HOT_LOADER__(userRef) {
	      var _this2 = this;

	      return function (ref) {
	        _this2.inputRef = ref;
	        if (_util2.default.isFunction(userRef)) {
	          userRef(ref);
	        } else if (typeof userRef === 'string') {
	          throw new Error('Ref must be a function');
	        }
	      };
	    }
	  }, {
	    key: '__getHandleKeyPress__REACT_HOT_LOADER__',
	    value: function __getHandleKeyPress__REACT_HOT_LOADER__(customHandler) {
	      var _this3 = this;

	      return function (e) {
	        _this3.handleKeyPress(e);
	        if (_util2.default.isFunction(customHandler)) {
	          customHandler(e);
	        }
	      };
	    }
	  }, {
	    key: '__getHandleBlur__REACT_HOT_LOADER__',
	    value: function __getHandleBlur__REACT_HOT_LOADER__(customHandler) {
	      var _this4 = this;

	      return function (e) {
	        _this4.handleBlur(e);
	        if (_util2.default.isFunction(customHandler)) {
	          customHandler(e);
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          editable = _props2.editable,
	          format = _props2.format,
	          customEditor = _props2.customEditor,
	          isFocus = _props2.isFocus,
	          customStyleWithNav = _props2.customStyleWithNav,
	          row = _props2.row,
	          attrs = _props2.attrs;
	      var shakeEditor = this.state.shakeEditor;

	      var attr = _extends({}, editable.attrs, {
	        ref: this.getInputRef(editable.attrs && editable.attrs.ref),
	        onKeyDown: this.getHandleKeyPress(editable.attrs && editable.attrs.onKeyDown),
	        onBlur: this.getHandleBlur(editable.attrs && editable.attrs.onBlur)
	      });
	      var style = { position: 'relative' };
	      var fieldValue = this.props.fieldValue;
	      var className = this.state.className;


	      if (editable.placeholder) {
	        attr.placeholder = editable.placeholder;
	        /* eslint-disable no-console */
	        console.warn('Setting editable.placeholder is deprecated. Use editable.attrs to set input attributes');
	        /* eslint-enable no-console */
	      }

	      var editorClass = (0, _classnames2.default)({ 'animated': shakeEditor, 'shake': shakeEditor });
	      fieldValue = fieldValue === 0 ? '0' : fieldValue;
	      var cellEditor = void 0;
	      if (customEditor) {
	        var customEditorProps = _extends({
	          row: row
	        }, attr, {
	          defaultValue: this.valueShortCircuit(fieldValue)
	        }, customEditor.customEditorParameters);
	        cellEditor = customEditor.getElement(this.handleCustomUpdate, customEditorProps);
	      } else {
	        cellEditor = (0, _Editor2.default)(editable, attr, format, editorClass, this.valueShortCircuit(fieldValue), null, row);
	      }

	      if (isFocus) {
	        if (customStyleWithNav) {
	          var customStyle = _util2.default.isFunction(customStyleWithNav) ? customStyleWithNav(fieldValue, row) : customStyleWithNav;
	          style = _extends({}, style, customStyle);
	        } else {
	          className = className + ' default-focus-cell';
	        }
	      }

	      return _react2.default.createElement(
	        'td',
	        _extends({}, attrs, {
	          style: style,
	          className: className,
	          onClick: this.handleClick }),
	        cellEditor
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
	}(_react.Component);

	TableEditColumn.propTypes = {
	  completeEdit: _propTypes2.default.func,
	  rowIndex: _propTypes2.default.number,
	  colIndex: _propTypes2.default.number,
	  blurToSave: _propTypes2.default.bool,
	  blurToEscape: _propTypes2.default.bool,
	  editable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
	  format: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
	  row: _propTypes2.default.any,
	  fieldValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
	  className: _propTypes2.default.any,
	  beforeShowError: _propTypes2.default.func,
	  isFocus: _propTypes2.default.bool,
	  attrs: _propTypes2.default.object,
	  customStyleWithNav: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])
	};

	var _default = TableEditColumn;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableEditColumn, 'TableEditColumn', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableEditColumn.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableEditColumn.js');
	}();

	;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var editor = function editor(editable, attr, format, editorClass, defaultValue, ignoreEditable, row) {
	  if (editable === true || editable === false && ignoreEditable || typeof editable === 'string') {
	    // simple declare
	    var type = editable ? 'text' : editable;
	    return _react2.default.createElement('input', _extends({}, attr, { type: type, defaultValue: defaultValue,
	      className: (editorClass || '') + ' form-control editor edit-text' }));
	  } else if (!editable) {
	    var _type = editable ? 'text' : editable;
	    return _react2.default.createElement('input', _extends({}, attr, { type: _type, defaultValue: defaultValue,
	      disabled: 'disabled',
	      className: (editorClass || '') + ' form-control editor edit-text' }));
	  } else if (editable && (editable.type === undefined || editable.type === null || editable.type.trim() === '')) {
	    var _type2 = editable ? 'text' : editable;
	    return _react2.default.createElement('input', _extends({}, attr, { type: _type2, defaultValue: defaultValue,
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
	      var _editable$options = editable.options,
	          textKey = _editable$options.textKey,
	          valueKey = _editable$options.valueKey;

	      if (_util2.default.isFunction(values)) {
	        values = values(row);
	      }
	      if (Array.isArray(values)) {
	        // only can use arrray data for options
	        var text = void 0;
	        var value = void 0;
	        options = values.map(function (option, i) {
	          if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
	            text = textKey ? option[textKey] : option.text;
	            value = valueKey ? option[valueKey] : option.value;
	          } else {
	            text = format ? format(option) : option;
	            value = option;
	          }
	          return _react2.default.createElement(
	            'option',
	            { key: 'option' + i, value: value },
	            text
	          );
	        });
	      }
	      return _react2.default.createElement(
	        'select',
	        _extends({}, attr, { defaultValue: defaultValue }),
	        options
	      );
	    } else if (editable.type === 'textarea') {
	      // process textarea input
	      // put other if exist
	      editable.cols && (attr.cols = editable.cols);
	      editable.rows && (attr.rows = editable.rows);
	      var saveBtn = void 0;
	      var keyUpHandler = attr.onKeyDown;
	      if (keyUpHandler) {
	        attr.onKeyDown = function (e) {
	          if (e.keyCode !== 13) {
	            // not Pressed ENTER
	            keyUpHandler(e);
	          }
	        };
	        saveBtn = _react2.default.createElement(
	          'button',
	          {
	            className: 'btn btn-info btn-xs textarea-save-btn',
	            onClick: keyUpHandler },
	          'save'
	        );
	      }
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('textarea', _extends({}, attr, { defaultValue: defaultValue })),
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

	      var checked = defaultValue && defaultValue.toString() === _values.split(':')[0] ? true : false;

	      return _react2.default.createElement('input', _extends({}, attr, { type: 'checkbox',
	        value: _values, defaultChecked: checked }));
	    } else if (editable.type === 'datetime') {
	      return _react2.default.createElement('input', _extends({}, attr, { type: 'datetime-local', defaultValue: defaultValue }));
	    } else {
	      // process other input type. as password,url,email...
	      return _react2.default.createElement('input', _extends({}, attr, { type: editable.type, defaultValue: defaultValue }));
	    }
	  }
	  // default return for other case of editable
	  return _react2.default.createElement('input', _extends({}, attr, { type: 'text',
	    className: (editorClass || '') + ' form-control editor edit-text' }));
	};

	var _default = editor;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(editor, 'editor', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/Editor.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/Editor.js');
	}();

	;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.notice = undefined;

	var _reactSAlert = __webpack_require__(14);

	var _reactSAlert2 = _interopRequireDefault(_reactSAlert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var notice = function notice(type, msg, title) {
	  var titleHTML = title ? '<h4><strong>' + title + '</strong></h4>' : '';

	  var bodyHTML = '\n    ' + titleHTML + '\n    <div>\n      <span class=\'fa fa-exclamation-triangle glyphicon glyphicon-alert\'></span>&nbsp;\n      <span>' + msg + '</span>\n    </div>\n  ';

	  _reactSAlert2.default.error(bodyHTML, {
	    position: 'top-right',
	    timeout: 3000,
	    html: true,
	    effect: 'scale'
	  });
	};

	exports.notice = notice;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(notice, 'notice', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/Notification.js');
	}();

	;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: 0 */
	/* eslint no-nested-ternary: 0 */


	var ExpandComponent = function (_Component) {
	  _inherits(ExpandComponent, _Component);

	  function ExpandComponent() {
	    _classCallCheck(this, ExpandComponent);

	    return _possibleConstructorReturn(this, (ExpandComponent.__proto__ || Object.getPrototypeOf(ExpandComponent)).apply(this, arguments));
	  }

	  _createClass(ExpandComponent, [{
	    key: 'render',
	    value: function render() {
	      var className = this.props.className;

	      var trCss = {
	        style: {
	          backgroundColor: this.props.bgColor
	        },
	        className: (0, _classnames2.default)(className)
	      };
	      return _react2.default.createElement(
	        'tr',
	        _extends({ hidden: this.props.hidden, width: this.props.width }, trCss),
	        _react2.default.createElement(
	          'td',
	          { colSpan: this.props.colSpan },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return ExpandComponent;
	}(_react.Component);

	var _default = ExpandComponent;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(ExpandComponent, 'ExpandComponent', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/ExpandComponent.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/ExpandComponent.js');
	}();

	;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _PageButton = __webpack_require__(42);

	var _PageButton2 = _interopRequireDefault(_PageButton);

	var _SizePerPageDropDown = __webpack_require__(43);

	var _SizePerPageDropDown2 = _interopRequireDefault(_SizePerPageDropDown);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PaginationList = function (_Component) {
	  _inherits(PaginationList, _Component);

	  function PaginationList(props) {
	    _classCallCheck(this, PaginationList);

	    var _this = _possibleConstructorReturn(this, (PaginationList.__proto__ || Object.getPrototypeOf(PaginationList)).call(this, props));

	    _this.changePage = function () {
	      return _this.__changePage__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.changeSizePerPage = function () {
	      return _this.__changeSizePerPage__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.toggleDropDown = function () {
	      return _this.__toggleDropDown__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.closeDropDown = function () {
	      return _this.__closeDropDown__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.state = {
	      open: _this.props.open
	    };
	    return _this;
	  }

	  _createClass(PaginationList, [{
	    key: '__closeDropDown__REACT_HOT_LOADER__',
	    value: function __closeDropDown__REACT_HOT_LOADER__() {
	      return this.__closeDropDown__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__toggleDropDown__REACT_HOT_LOADER__',
	    value: function __toggleDropDown__REACT_HOT_LOADER__() {
	      return this.__toggleDropDown__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__changeSizePerPage__REACT_HOT_LOADER__',
	    value: function __changeSizePerPage__REACT_HOT_LOADER__() {
	      return this.__changeSizePerPage__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__changePage__REACT_HOT_LOADER__',
	    value: function __changePage__REACT_HOT_LOADER__() {
	      return this.__changePage__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      var keepSizePerPageState = this.props.keepSizePerPageState;

	      if (!keepSizePerPageState) {
	        this.closeDropDown();
	      }
	    }
	  }, {
	    key: '__changePage__REACT_HOT_LOADER__',
	    value: function __changePage__REACT_HOT_LOADER__(page) {
	      var _props = this.props,
	          pageStartIndex = _props.pageStartIndex,
	          prePage = _props.prePage,
	          currPage = _props.currPage,
	          nextPage = _props.nextPage,
	          lastPage = _props.lastPage,
	          firstPage = _props.firstPage,
	          sizePerPage = _props.sizePerPage,
	          keepSizePerPageState = _props.keepSizePerPageState;


	      if (page === prePage) {
	        page = currPage - 1 < pageStartIndex ? pageStartIndex : currPage - 1;
	      } else if (page === nextPage) {
	        page = currPage + 1 > this.lastPage ? this.lastPage : currPage + 1;
	      } else if (page === lastPage) {
	        page = this.lastPage;
	      } else if (page === firstPage) {
	        page = pageStartIndex;
	      } else {
	        page = parseInt(page, 10);
	      }

	      if (keepSizePerPageState) {
	        this.closeDropDown();
	      }

	      if (page !== currPage) {
	        this.props.changePage(page, sizePerPage);
	      }
	    }
	  }, {
	    key: '__changeSizePerPage__REACT_HOT_LOADER__',
	    value: function __changeSizePerPage__REACT_HOT_LOADER__(pageNum) {
	      var selectSize = typeof pageNum === 'string' ? parseInt(pageNum, 10) : pageNum;
	      var currPage = this.props.currPage;

	      if (selectSize !== this.props.sizePerPage) {
	        this.totalPages = Math.ceil(this.props.dataSize / selectSize);
	        this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
	        if (currPage > this.lastPage) currPage = this.lastPage;
	        this.props.changePage(currPage, selectSize);
	        if (this.props.onSizePerPageList) {
	          this.props.onSizePerPageList(selectSize);
	        }
	      }

	      this.closeDropDown();
	    }
	  }, {
	    key: '__toggleDropDown__REACT_HOT_LOADER__',
	    value: function __toggleDropDown__REACT_HOT_LOADER__() {
	      var _this2 = this;

	      this.setState(function () {
	        return {
	          open: !_this2.state.open
	        };
	      });
	    }
	  }, {
	    key: '__closeDropDown__REACT_HOT_LOADER__',
	    value: function __closeDropDown__REACT_HOT_LOADER__() {
	      this.setState(function () {
	        return {
	          open: false
	        };
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          currPage = _props2.currPage,
	          dataSize = _props2.dataSize,
	          sizePerPage = _props2.sizePerPage,
	          sizePerPageList = _props2.sizePerPageList,
	          paginationShowsTotal = _props2.paginationShowsTotal,
	          pageStartIndex = _props2.pageStartIndex,
	          paginationPanel = _props2.paginationPanel,
	          hidePageListOnlyOnePage = _props2.hidePageListOnlyOnePage;

	      this.totalPages = Math.ceil(dataSize / sizePerPage);
	      this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
	      var pageBtns = this.makePage(_util2.default.isFunction(paginationPanel));
	      var dropdown = this.makeDropDown();

	      var offset = Math.abs(_Const2.default.PAGE_START_INDEX - pageStartIndex);
	      var start = (currPage - pageStartIndex) * sizePerPage;
	      start = dataSize === 0 ? 0 : start + 1;
	      var to = Math.min(sizePerPage * (currPage + offset) - 1, dataSize);
	      if (to >= dataSize) to--;
	      var total = paginationShowsTotal ? _react2.default.createElement(
	        'span',
	        null,
	        'Showing rows ',
	        start,
	        ' to\xA0',
	        to + 1,
	        ' of\xA0',
	        dataSize
	      ) : null;

	      if (_util2.default.isFunction(paginationShowsTotal)) {
	        total = paginationShowsTotal(start, to + 1, dataSize);
	      }

	      var content = paginationPanel && paginationPanel({
	        currPage: currPage,
	        sizePerPage: sizePerPage,
	        sizePerPageList: sizePerPageList,
	        pageStartIndex: pageStartIndex,
	        totalPages: this.totalPages,
	        changePage: this.changePage,
	        toggleDropDown: this.toggleDropDown,
	        changeSizePerPage: this.changeSizePerPage,
	        components: {
	          totalText: total,
	          sizePerPageDropdown: dropdown,
	          pageList: pageBtns
	        }
	      });

	      var hidePageList = hidePageListOnlyOnePage && this.totalPages === 1 ? 'none' : 'block';
	      return _react2.default.createElement(
	        'div',
	        { className: 'row', style: { marginTop: 15 } },
	        content || [_react2.default.createElement(
	          'div',
	          { key: 'paging-left', className: 'col-md-6 col-xs-6 col-sm-6 col-lg-6' },
	          total,
	          sizePerPageList.length > 1 ? dropdown : null
	        ), _react2.default.createElement(
	          'div',
	          { key: 'paging-right', style: { display: hidePageList },
	            className: 'col-md-6 col-xs-6 col-sm-6 col-lg-6' },
	          pageBtns
	        )]
	      );
	    }
	  }, {
	    key: 'makeDropDown',
	    value: function makeDropDown() {
	      var _this3 = this;

	      var dropdown = void 0;
	      var dropdownProps = void 0;
	      var sizePerPageText = '';
	      var _props3 = this.props,
	          sizePerPageDropDown = _props3.sizePerPageDropDown,
	          hideSizePerPage = _props3.hideSizePerPage,
	          sizePerPage = _props3.sizePerPage,
	          sizePerPageList = _props3.sizePerPageList;

	      if (sizePerPageDropDown) {
	        dropdown = sizePerPageDropDown({
	          open: this.state.open,
	          hideSizePerPage: hideSizePerPage,
	          currSizePerPage: String(sizePerPage),
	          sizePerPageList: sizePerPageList,
	          toggleDropDown: this.toggleDropDown,
	          changeSizePerPage: this.changeSizePerPage,
	          onBlur: this.closeDropDown
	        });
	        if (dropdown.type.name === _SizePerPageDropDown2.default.name) {
	          dropdownProps = dropdown.props;
	        } else {
	          return dropdown;
	        }
	      }

	      if (dropdownProps || !dropdown) {
	        var isBootstrap4 = _util2.default.isBootstrap4(this.props.version);
	        var sizePerPageOptions = sizePerPageList.map(function (_sizePerPage) {
	          var pageText = _sizePerPage.text || _sizePerPage;
	          var pageNum = _sizePerPage.value || _sizePerPage;
	          if (sizePerPage === pageNum) sizePerPageText = pageText;
	          if (isBootstrap4) {
	            return _react2.default.createElement(
	              'a',
	              {
	                href: '#',
	                tabIndex: '-1',
	                key: pageText,
	                className: 'dropdown-item',
	                onMouseDown: function onMouseDown(e) {
	                  e.preventDefault();
	                  _this3.changeSizePerPage(pageNum);
	                } },
	              pageText
	            );
	          } else {
	            return _react2.default.createElement(
	              'li',
	              { key: pageText, role: 'presentation', className: 'dropdown-item' },
	              _react2.default.createElement(
	                'a',
	                { role: 'menuitem',
	                  tabIndex: '-1', href: '#',
	                  'data-page': pageNum,
	                  onMouseDown: function onMouseDown(e) {
	                    e.preventDefault();
	                    _this3.changeSizePerPage(pageNum);
	                  } },
	                pageText
	              )
	            );
	          }
	        });
	        dropdown = _react2.default.createElement(_SizePerPageDropDown2.default, _extends({
	          open: this.state.open,
	          hidden: hideSizePerPage,
	          currSizePerPage: String(sizePerPageText),
	          options: sizePerPageOptions,
	          onClick: this.toggleDropDown,
	          onBlur: this.closeDropDown,
	          isBootstrap4: isBootstrap4
	        }, dropdownProps));
	      }
	      return dropdown;
	    }
	  }, {
	    key: 'makePage',
	    value: function makePage() {
	      var _this4 = this;

	      var isCustomPagingPanel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var pages = this.getPages();
	      var isStart = function isStart(page, _ref) {
	        var currPage = _ref.currPage,
	            pageStartIndex = _ref.pageStartIndex,
	            firstPage = _ref.firstPage,
	            prePage = _ref.prePage;
	        return currPage === pageStartIndex && (page === firstPage || page === prePage);
	      };
	      var isEnd = function isEnd(page, _ref2) {
	        var currPage = _ref2.currPage,
	            nextPage = _ref2.nextPage,
	            lastPage = _ref2.lastPage;
	        return currPage === _this4.lastPage && (page === nextPage || page === lastPage);
	      };
	      var pageBtns = pages.filter(function (page) {
	        if (this.props.alwaysShowAllBtns) {
	          return true;
	        }
	        return isStart(page, this.props) || isEnd(page, this.props) ? false : true;
	      }, this).map(function (page, index) {
	        var isActive = page === this.props.currPage;
	        var isDisabled = isStart(page, this.props) || isEnd(page, this.props) ? true : false;
	        var title = page + '';
	        var pageNumber = page;

	        if (page === this.props.nextPage) {
	          title = this.props.nextPageTitle;
	          pageNumber = this.props.currPage + 1;
	        } else if (page === this.props.prePage) {
	          title = this.props.prePageTitle;
	          pageNumber = this.props.currPage - 1;
	        } else if (page === this.props.firstPage) {
	          title = this.props.firstPageTitle;
	          pageNumber = this.props.pageStartIndex;
	        } else if (page === this.props.lastPage) {
	          title = this.props.lastPageTitle;
	          pageNumber = this.getLastPage();
	        }

	        return _react2.default.createElement(
	          _PageButton2.default,
	          { key: index,
	            title: title,
	            changePage: this.changePage,
	            active: isActive,
	            disable: isDisabled,
	            pageNumber: pageNumber },
	          page
	        );
	      }, this);
	      var classname = (0, _classnames2.default)(isCustomPagingPanel ? null : 'react-bootstrap-table-page-btns-ul', 'pagination');
	      return _react2.default.createElement(
	        'ul',
	        { className: classname },
	        pageBtns
	      );
	    }
	  }, {
	    key: 'getLastPage',
	    value: function getLastPage() {
	      return this.lastPage;
	    }
	  }, {
	    key: 'getPages',
	    value: function getPages() {
	      var pages = void 0;
	      var endPage = this.totalPages;
	      if (endPage <= 0) return [];
	      var startPage = Math.max(this.props.currPage - Math.floor(this.props.paginationSize / 2), this.props.pageStartIndex);
	      endPage = startPage + this.props.paginationSize - 1;

	      if (endPage > this.lastPage) {
	        endPage = this.lastPage;
	        startPage = endPage - this.props.paginationSize + 1;
	      }

	      if (startPage !== this.props.pageStartIndex && this.totalPages > this.props.paginationSize && this.props.withFirstAndLast) {
	        pages = [this.props.firstPage, this.props.prePage];
	      } else if (this.totalPages > 1 || this.props.alwaysShowAllBtns) {
	        pages = [this.props.prePage];
	      } else {
	        pages = [];
	      }

	      for (var i = startPage; i <= endPage; i++) {
	        if (i >= this.props.pageStartIndex) pages.push(i);
	      }

	      if (endPage <= this.lastPage && pages.length > 1) {
	        pages.push(this.props.nextPage);
	      }
	      if (endPage !== this.lastPage && this.props.withFirstAndLast) {
	        pages.push(this.props.lastPage);
	      }

	      return pages;
	    }
	  }]);

	  return PaginationList;
	}(_react.Component);

	PaginationList.propTypes = {
	  currPage: _propTypes2.default.number,
	  sizePerPage: _propTypes2.default.number,
	  dataSize: _propTypes2.default.number,
	  changePage: _propTypes2.default.func,
	  sizePerPageList: _propTypes2.default.array,
	  paginationShowsTotal: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
	  paginationSize: _propTypes2.default.number,
	  onSizePerPageList: _propTypes2.default.func,
	  prePage: _propTypes2.default.any,
	  nextPage: _propTypes2.default.any,
	  firstPage: _propTypes2.default.any,
	  lastPage: _propTypes2.default.any,
	  pageStartIndex: _propTypes2.default.number,
	  hideSizePerPage: _propTypes2.default.bool,
	  alwaysShowAllBtns: _propTypes2.default.bool,
	  withFirstAndLast: _propTypes2.default.bool,
	  sizePerPageDropDown: _propTypes2.default.func,
	  paginationPanel: _propTypes2.default.func,
	  prePageTitle: _propTypes2.default.string,
	  nextPageTitle: _propTypes2.default.string,
	  firstPageTitle: _propTypes2.default.string,
	  lastPageTitle: _propTypes2.default.string,
	  hidePageListOnlyOnePage: _propTypes2.default.bool,
	  keepSizePerPageState: _propTypes2.default.bool
	};

	PaginationList.defaultProps = {
	  sizePerPage: _Const2.default.SIZE_PER_PAGE,
	  pageStartIndex: _Const2.default.PAGE_START_INDEX
	};

	var _default = PaginationList;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(PaginationList, 'PaginationList', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/PaginationList.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/PaginationList.js');
	}();

	;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PageButton = function (_Component) {
	  _inherits(PageButton, _Component);

	  function PageButton(props) {
	    _classCallCheck(this, PageButton);

	    var _this = _possibleConstructorReturn(this, (PageButton.__proto__ || Object.getPrototypeOf(PageButton)).call(this, props));

	    _this.pageBtnClick = function () {
	      return _this.__pageBtnClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    return _this;
	  }

	  _createClass(PageButton, [{
	    key: '__pageBtnClick__REACT_HOT_LOADER__',
	    value: function __pageBtnClick__REACT_HOT_LOADER__() {
	      return this.__pageBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__pageBtnClick__REACT_HOT_LOADER__',
	    value: function __pageBtnClick__REACT_HOT_LOADER__(e) {
	      e.preventDefault();
	      this.props.changePage(this.props.pageNumber);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var classes = (0, _classnames2.default)({
	        'active': this.props.active,
	        'disabled': this.props.disable,
	        'hidden': this.props.hidden,
	        'page-item': true
	      });
	      return _react2.default.createElement(
	        'li',
	        { className: classes, title: this.props.title },
	        _react2.default.createElement(
	          'a',
	          { href: '#', onClick: this.pageBtnClick, className: 'page-link' },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return PageButton;
	}(_react.Component);

	PageButton.propTypes = {
	  title: _propTypes2.default.string,
	  changePage: _propTypes2.default.func,
	  active: _propTypes2.default.bool,
	  disable: _propTypes2.default.bool,
	  hidden: _propTypes2.default.bool,
	  children: _propTypes2.default.node,
	  pageNumber: _propTypes2.default.number
	};

	var _default = PageButton;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(PageButton, 'PageButton', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/PageButton.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/PageButton.js');
	}();

	;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var sizePerPageDefaultClass = 'react-bs-table-sizePerPage-dropdown';

	var SizePerPageDropDown = function (_Component) {
	  _inherits(SizePerPageDropDown, _Component);

	  function SizePerPageDropDown() {
	    _classCallCheck(this, SizePerPageDropDown);

	    return _possibleConstructorReturn(this, (SizePerPageDropDown.__proto__ || Object.getPrototypeOf(SizePerPageDropDown)).apply(this, arguments));
	  }

	  _createClass(SizePerPageDropDown, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          open = _props.open,
	          hidden = _props.hidden,
	          onClick = _props.onClick,
	          onBlur = _props.onBlur,
	          options = _props.options,
	          className = _props.className,
	          variation = _props.variation,
	          btnContextual = _props.btnContextual,
	          isBootstrap4 = _props.isBootstrap4,
	          currSizePerPage = _props.currSizePerPage;


	      if (hidden) return null;

	      var openClass = open ? 'open show' : '';

	      var renderOptions = function renderOptions() {
	        var attrs = {
	          className: 'dropdown-menu ' + openClass,
	          role: 'menu',
	          'aria-labelledby': 'pageDropDown'
	        };
	        var type = isBootstrap4 ? 'div' : 'ul';

	        return _react2.default.createElement(type, attrs, options);
	      };

	      return _react2.default.createElement(
	        'span',
	        {
	          className: variation + ' ' + openClass + ' ' + className + ' ' + sizePerPageDefaultClass },
	        _react2.default.createElement(
	          'button',
	          { className: 'btn ' + btnContextual + ' dropdown-toggle',
	            id: 'pageDropDown', 'data-toggle': 'dropdown',
	            'aria-expanded': open,
	            'aria-haspopup': !open,
	            onClick: onClick,
	            onBlur: onBlur },
	          currSizePerPage,
	          _react2.default.createElement(
	            'span',
	            null,
	            ' ',
	            _react2.default.createElement('span', { className: 'caret' })
	          )
	        ),
	        renderOptions()
	      );
	    }
	  }]);

	  return SizePerPageDropDown;
	}(_react.Component);

	SizePerPageDropDown.propTypes = {
	  open: _propTypes2.default.bool,
	  hidden: _propTypes2.default.bool,
	  btnContextual: _propTypes2.default.string,
	  currSizePerPage: _propTypes2.default.string,
	  options: _propTypes2.default.array,
	  variation: _propTypes2.default.oneOf(['dropdown', 'dropup']),
	  className: _propTypes2.default.string,
	  onClick: _propTypes2.default.func,
	  onBlur: _propTypes2.default.func
	};
	SizePerPageDropDown.defaultProps = {
	  open: false,
	  hidden: false,
	  btnContextual: 'btn-default btn-secondary',
	  variation: 'dropdown',
	  className: ''
	};

	var _default = SizePerPageDropDown;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(sizePerPageDefaultClass, 'sizePerPageDefaultClass', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/SizePerPageDropDown.js');

	  __REACT_HOT_LOADER__.register(SizePerPageDropDown, 'SizePerPageDropDown', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/SizePerPageDropDown.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/pagination/SizePerPageDropDown.js');
	}();

	;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactModal = __webpack_require__(45);

	var _reactModal2 = _interopRequireDefault(_reactModal);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _Notification = __webpack_require__(39);

	var _InsertModal = __webpack_require__(57);

	var _InsertModal2 = _interopRequireDefault(_InsertModal);

	var _InsertButton = __webpack_require__(61);

	var _InsertButton2 = _interopRequireDefault(_InsertButton);

	var _DeleteButton = __webpack_require__(62);

	var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

	var _ExportCSVButton = __webpack_require__(63);

	var _ExportCSVButton2 = _interopRequireDefault(_ExportCSVButton);

	var _ShowSelectedOnlyButton = __webpack_require__(64);

	var _ShowSelectedOnlyButton2 = _interopRequireDefault(_ShowSelectedOnlyButton);

	var _SearchField = __webpack_require__(65);

	var _SearchField2 = _interopRequireDefault(_SearchField);

	var _ClearSearchButton = __webpack_require__(66);

	var _ClearSearchButton2 = _interopRequireDefault(_ClearSearchButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-console: 0 */

	// import classSet from 'classnames';

	// import editor from '../Editor';


	var ToolBar = function (_Component) {
	  _inherits(ToolBar, _Component);

	  function ToolBar(props) {
	    _classCallCheck(this, ToolBar);

	    var _this = _possibleConstructorReturn(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).call(this, props));

	    _this.displayCommonMessage = function () {
	      return _this.__displayCommonMessage__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleSaveBtnClick = function () {
	      return _this.__handleSaveBtnClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.afterHandleSaveBtnClick = function () {
	      return _this.__afterHandleSaveBtnClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleModalClose = function () {
	      return _this.__handleModalClose__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleModalOpen = function () {
	      return _this.__handleModalOpen__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleShowOnlyToggle = function () {
	      return _this.__handleShowOnlyToggle__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleDropRowBtnClick = function () {
	      return _this.__handleDropRowBtnClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleDebounce = function () {
	      return _this.__handleDebounce__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleKeyUp = function () {
	      return _this.__handleKeyUp__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleExportCSV = function () {
	      return _this.__handleExportCSV__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.handleClearBtnClick = function () {
	      return _this.__handleClearBtnClick__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.timeouteClear = 0;
	    _this.modalClassName;
	    _this.state = {
	      isInsertModalOpen: false,
	      validateState: null,
	      shakeEditor: false,
	      showSelected: false
	    };
	    return _this;
	  }

	  _createClass(ToolBar, [{
	    key: '__handleClearBtnClick__REACT_HOT_LOADER__',
	    value: function __handleClearBtnClick__REACT_HOT_LOADER__() {
	      return this.__handleClearBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleExportCSV__REACT_HOT_LOADER__',
	    value: function __handleExportCSV__REACT_HOT_LOADER__() {
	      return this.__handleExportCSV__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleKeyUp__REACT_HOT_LOADER__',
	    value: function __handleKeyUp__REACT_HOT_LOADER__() {
	      return this.__handleKeyUp__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleDebounce__REACT_HOT_LOADER__',
	    value: function __handleDebounce__REACT_HOT_LOADER__(func, wait, immediate) {
	      var _this2 = this,
	          _arguments = arguments;

	      var timeout = void 0;

	      return function () {
	        var later = function later() {
	          timeout = null;

	          if (!immediate) {
	            func.apply(_this2, _arguments);
	          }
	        };

	        var callNow = immediate && !timeout;

	        clearTimeout(timeout);

	        timeout = setTimeout(later, wait || 0);

	        if (callNow) {
	          func.appy(_this2, _arguments);
	        }
	      };
	    }
	  }, {
	    key: '__handleDropRowBtnClick__REACT_HOT_LOADER__',
	    value: function __handleDropRowBtnClick__REACT_HOT_LOADER__() {
	      return this.__handleDropRowBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleShowOnlyToggle__REACT_HOT_LOADER__',
	    value: function __handleShowOnlyToggle__REACT_HOT_LOADER__() {
	      return this.__handleShowOnlyToggle__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleModalOpen__REACT_HOT_LOADER__',
	    value: function __handleModalOpen__REACT_HOT_LOADER__() {
	      return this.__handleModalOpen__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleModalClose__REACT_HOT_LOADER__',
	    value: function __handleModalClose__REACT_HOT_LOADER__() {
	      return this.__handleModalClose__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__afterHandleSaveBtnClick__REACT_HOT_LOADER__',
	    value: function __afterHandleSaveBtnClick__REACT_HOT_LOADER__() {
	      return this.__afterHandleSaveBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSaveBtnClick__REACT_HOT_LOADER__',
	    value: function __handleSaveBtnClick__REACT_HOT_LOADER__() {
	      return this.__handleSaveBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__displayCommonMessage__REACT_HOT_LOADER__',
	    value: function __displayCommonMessage__REACT_HOT_LOADER__() {
	      return this.__displayCommonMessage__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this3 = this;

	      var delay = this.props.searchDelayTime ? this.props.searchDelayTime : 0;
	      this.debounceCallback = this.handleDebounce(function () {
	        _this3.seachInput && _this3.props.onSearch(_this3.seachInput.getValue());
	      }, delay);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.reset) {
	        this.setSearchInput('');
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearTimeout();
	    }
	  }, {
	    key: 'setSearchInput',
	    value: function setSearchInput(text) {
	      if (this.seachInput && this.seachInput.value !== text) {
	        this.seachInput.value = text;
	      }
	    }
	  }, {
	    key: 'clearTimeout',
	    value: function (_clearTimeout) {
	      function clearTimeout() {
	        return _clearTimeout.apply(this, arguments);
	      }

	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };

	      return clearTimeout;
	    }(function () {
	      if (this.timeouteClear) {
	        clearTimeout(this.timeouteClear);
	        this.timeouteClear = 0;
	      }
	    })
	  }, {
	    key: '__displayCommonMessage__REACT_HOT_LOADER__',
	    value: function __displayCommonMessage__REACT_HOT_LOADER__() {
	      (0, _Notification.notice)('error', this.props.insertFailIndicator, '');
	    }
	  }, {
	    key: 'validateNewRow',
	    value: function validateNewRow(newRow) {
	      var _this4 = this;

	      var validateState = {};
	      var isValid = true;
	      var tempMsg = void 0;
	      var responseType = void 0;

	      this.props.columns.forEach(function (column) {
	        if (column.isKey && column.keyValidator) {
	          // key validator for checking exist key
	          tempMsg = _this4.props.isValidKey(newRow[column.field]);
	          if (tempMsg) {
	            _this4.displayCommonMessage();
	            isValid = false;
	            validateState[column.field] = tempMsg;
	          }
	        } else if (column.editable && column.editable.validator) {
	          // process validate
	          tempMsg = column.editable.validator(newRow[column.field], newRow);
	          responseType = typeof tempMsg === 'undefined' ? 'undefined' : _typeof(tempMsg);
	          if (responseType !== 'object' && tempMsg !== true) {
	            _this4.displayCommonMessage();
	            isValid = false;
	            validateState[column.field] = tempMsg;
	          } else if (responseType === 'object' && tempMsg.isValid !== true) {
	            (0, _Notification.notice)(tempMsg.notification.type, tempMsg.notification.msg, tempMsg.notification.title);
	            isValid = false;
	            validateState[column.field] = tempMsg.notification.msg;
	          }
	        }
	      });

	      if (isValid) {
	        return true;
	      } else {
	        this.clearTimeout();
	        // show error in form and shake it
	        this.setState(function () {
	          return { validateState: validateState, shakeEditor: true };
	        });
	        this.timeouteClear = setTimeout(function () {
	          _this4.setState(function () {
	            return { shakeEditor: false };
	          });
	        }, 300);
	        return null;
	      }
	    }
	  }, {
	    key: '__handleSaveBtnClick__REACT_HOT_LOADER__',
	    value: function __handleSaveBtnClick__REACT_HOT_LOADER__(newRow) {
	      if (!this.validateNewRow(newRow)) {
	        // validation fail
	        return;
	      }
	      var msg = this.props.onAddRow(newRow);
	      if (msg !== false) {
	        this.afterHandleSaveBtnClick(msg);
	      }
	    }
	  }, {
	    key: '__afterHandleSaveBtnClick__REACT_HOT_LOADER__',
	    value: function __afterHandleSaveBtnClick__REACT_HOT_LOADER__(msg) {
	      var _this5 = this;

	      if (msg) {
	        (0, _Notification.notice)('error', msg, '');
	        this.clearTimeout();
	        // shake form and hack prevent modal hide
	        this.setState(function () {
	          return {
	            shakeEditor: true,
	            validateState: 'this is hack for prevent bootstrap modal hide'
	          };
	        });
	        // clear animate class
	        this.timeouteClear = setTimeout(function () {
	          _this5.setState(function () {
	            return { shakeEditor: false };
	          });
	        }, 300);
	      } else {
	        // reset state and hide modal hide
	        this.setState(function () {
	          return {
	            validateState: null,
	            shakeEditor: false,
	            isInsertModalOpen: false
	          };
	        });
	      }
	    }
	  }, {
	    key: '__handleModalClose__REACT_HOT_LOADER__',
	    value: function __handleModalClose__REACT_HOT_LOADER__() {
	      this.setState(function () {
	        return { isInsertModalOpen: false };
	      });
	    }
	  }, {
	    key: '__handleModalOpen__REACT_HOT_LOADER__',
	    value: function __handleModalOpen__REACT_HOT_LOADER__() {
	      this.setState(function () {
	        return { isInsertModalOpen: true };
	      });
	    }
	  }, {
	    key: '__handleShowOnlyToggle__REACT_HOT_LOADER__',
	    value: function __handleShowOnlyToggle__REACT_HOT_LOADER__() {
	      var _this6 = this;

	      this.setState(function () {
	        return {
	          showSelected: !_this6.state.showSelected
	        };
	      });
	      this.props.onShowOnlySelected();
	    }
	  }, {
	    key: '__handleDropRowBtnClick__REACT_HOT_LOADER__',
	    value: function __handleDropRowBtnClick__REACT_HOT_LOADER__() {
	      this.props.onDropRow();
	    }
	  }, {
	    key: '__handleKeyUp__REACT_HOT_LOADER__',
	    value: function __handleKeyUp__REACT_HOT_LOADER__(event) {
	      event.persist();
	      this.debounceCallback(event);
	    }
	  }, {
	    key: '__handleExportCSV__REACT_HOT_LOADER__',
	    value: function __handleExportCSV__REACT_HOT_LOADER__() {
	      this.props.onExportCSV();
	    }
	  }, {
	    key: '__handleClearBtnClick__REACT_HOT_LOADER__',
	    value: function __handleClearBtnClick__REACT_HOT_LOADER__() {
	      this.seachInput && this.seachInput.setValue('');
	      this.props.onSearch('');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.modalClassName = 'bs-table-modal-sm' + ToolBar.modalSeq++;
	      var toolbar = null;
	      var btnGroup = null;
	      var insertBtn = null;
	      var deleteBtn = null;
	      var exportCSVBtn = null;
	      var showSelectedOnlyBtn = null;

	      if (this.props.enableInsert) {
	        if (this.props.insertBtn) {
	          insertBtn = this.renderCustomBtn(this.props.insertBtn, [this.handleModalOpen], _InsertButton2.default.name, 'onClick', this.handleModalOpen);
	        } else {
	          insertBtn = _react2.default.createElement(_InsertButton2.default, { btnText: this.props.insertText,
	            onClick: this.handleModalOpen });
	        }
	      }

	      if (this.props.enableDelete) {
	        if (this.props.deleteBtn) {
	          deleteBtn = this.renderCustomBtn(this.props.deleteBtn, [this.handleDropRowBtnClick], _DeleteButton2.default.name, 'onClick', this.handleDropRowBtnClick);
	        } else {
	          deleteBtn = _react2.default.createElement(_DeleteButton2.default, { btnText: this.props.deleteText,
	            onClick: this.handleDropRowBtnClick });
	        }
	      }

	      if (this.props.enableShowOnlySelected) {
	        if (this.props.showSelectedOnlyBtn) {
	          showSelectedOnlyBtn = this.renderCustomBtn(this.props.showSelectedOnlyBtn, [this.handleShowOnlyToggle, this.state.showSelected], _ShowSelectedOnlyButton2.default.name, 'onClick', this.handleShowOnlyToggle);
	        } else {
	          showSelectedOnlyBtn = _react2.default.createElement(_ShowSelectedOnlyButton2.default, { toggle: this.state.showSelected,
	            onClick: this.handleShowOnlyToggle });
	        }
	      }

	      if (this.props.enableExportCSV) {
	        if (this.props.exportCSVBtn) {
	          exportCSVBtn = this.renderCustomBtn(this.props.exportCSVBtn, [this.handleExportCSV], _ExportCSVButton2.default.name, 'onClick', this.handleExportCSV);
	        } else {
	          exportCSVBtn = _react2.default.createElement(_ExportCSVButton2.default, { btnText: this.props.exportCSVText,
	            onClick: this.handleExportCSV });
	        }
	      }

	      if (this.props.btnGroup) {
	        btnGroup = this.props.btnGroup({
	          exportCSVBtn: exportCSVBtn,
	          insertBtn: insertBtn,
	          deleteBtn: deleteBtn,
	          showSelectedOnlyBtn: showSelectedOnlyBtn
	        });
	      } else {
	        btnGroup = _react2.default.createElement(
	          'div',
	          { className: 'btn-group btn-group-sm', role: 'group' },
	          exportCSVBtn,
	          insertBtn,
	          deleteBtn,
	          showSelectedOnlyBtn
	        );
	      }

	      var _renderSearchPanel = this.renderSearchPanel(),
	          _renderSearchPanel2 = _slicedToArray(_renderSearchPanel, 3),
	          searchPanel = _renderSearchPanel2[0],
	          searchField = _renderSearchPanel2[1],
	          clearBtn = _renderSearchPanel2[2];

	      var modal = this.props.enableInsert ? this.renderInsertRowModal() : null;

	      if (this.props.toolBar) {
	        toolbar = this.props.toolBar({
	          components: {
	            exportCSVBtn: exportCSVBtn,
	            insertBtn: insertBtn,
	            deleteBtn: deleteBtn,
	            showSelectedOnlyBtn: showSelectedOnlyBtn,
	            searchPanel: searchPanel,
	            btnGroup: btnGroup,
	            searchField: searchField,
	            clearBtn: clearBtn
	          },
	          event: {
	            openInsertModal: this.handleModalOpen,
	            closeInsertModal: this.handleModalClose,
	            dropRow: this.handleDropRowBtnClick,
	            showOnlyToogle: this.handleShowOnlyToggle,
	            exportCSV: this.handleExportCSV,
	            search: this.props.onSearch
	          }
	        });
	      } else {
	        toolbar = [_react2.default.createElement(
	          'div',
	          { key: 'toolbar-left', className: 'col-xs-6 col-sm-6 col-md-6 col-lg-8' },
	          this.props.searchPosition === 'left' ? searchPanel : btnGroup
	        ), _react2.default.createElement(
	          'div',
	          { key: 'toolbar-right', className: 'col-xs-6 col-sm-6 col-md-6 col-lg-4' },
	          this.props.searchPosition === 'left' ? btnGroup : searchPanel
	        )];
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        toolbar,
	        modal
	      );
	    }
	  }, {
	    key: 'renderSearchPanel',
	    value: function renderSearchPanel() {
	      var _this7 = this;

	      if (this.props.enableSearch) {
	        var classNames = 'form-group form-group-sm react-bs-table-search-form';
	        var clearBtn = null;
	        var searchField = null;
	        var searchPanel = null;
	        if (this.props.clearSearch) {
	          if (this.props.clearSearchBtn) {
	            clearBtn = this.renderCustomBtn(this.props.clearSearchBtn, [this.handleClearBtnClick], _ClearSearchButton2.default.name, 'onClick', this.handleClearBtnClick); /* eslint max-len: 0*/
	          } else {
	            clearBtn = _react2.default.createElement(_ClearSearchButton2.default, { onClick: this.handleClearBtnClick });
	          }
	          classNames += ' input-group input-group-sm';
	        }

	        if (this.props.searchField) {
	          searchField = this.props.searchField({
	            search: this.handleKeyUp,
	            defaultValue: this.props.defaultSearch,
	            placeholder: this.props.searchPlaceholder
	          });
	          if (searchField.type.name === _SearchField2.default.name) {
	            searchField = _react2.default.cloneElement(searchField, {
	              ref: function ref(node) {
	                return _this7.seachInput = node;
	              },
	              onKeyUp: this.handleKeyUp
	            });
	          } else {
	            searchField = _react2.default.cloneElement(searchField, {
	              ref: function ref(node) {
	                return _this7.seachInput = node;
	              }
	            });
	          }
	        } else {
	          searchField = _react2.default.createElement(_SearchField2.default, { ref: function ref(node) {
	              return _this7.seachInput = node;
	            },
	            defaultValue: this.props.defaultSearch,
	            placeholder: this.props.searchPlaceholder,
	            onKeyUp: this.handleKeyUp });
	        }
	        if (this.props.searchPanel) {
	          searchPanel = this.props.searchPanel({
	            searchField: searchField, clearBtn: clearBtn,
	            search: this.props.onSearch,
	            defaultValue: this.props.defaultSearch,
	            placeholder: this.props.searchPlaceholder,
	            clearBtnClick: this.handleClearBtnClick
	          });
	        } else {
	          searchPanel = _react2.default.createElement(
	            'div',
	            { className: classNames },
	            searchField,
	            _react2.default.createElement(
	              'span',
	              { className: 'input-group-btn' },
	              clearBtn
	            )
	          );
	        }
	        return [searchPanel, searchField, clearBtn];
	      } else {
	        return [];
	      }
	    }
	  }, {
	    key: 'renderInsertRowModal',
	    value: function renderInsertRowModal() {
	      var validateState = this.state.validateState || {};
	      var _props = this.props,
	          version = _props.version,
	          columns = _props.columns,
	          ignoreEditable = _props.ignoreEditable,
	          insertModalHeader = _props.insertModalHeader,
	          insertModalBody = _props.insertModalBody,
	          insertModalFooter = _props.insertModalFooter,
	          insertModal = _props.insertModal;


	      var modal = void 0;
	      modal = insertModal && insertModal(this.handleModalClose, this.handleSaveBtnClick, columns, validateState, ignoreEditable);

	      if (!modal) {
	        modal = _react2.default.createElement(_InsertModal2.default, {
	          version: version,
	          columns: columns,
	          validateState: validateState,
	          ignoreEditable: ignoreEditable,
	          onModalClose: this.handleModalClose,
	          onSave: this.handleSaveBtnClick,
	          headerComponent: insertModalHeader,
	          bodyComponent: insertModalBody,
	          footerComponent: insertModalFooter });
	      }

	      return _react2.default.createElement(
	        _reactModal2.default,
	        { className: 'react-bs-insert-modal modal-dialog',
	          isOpen: this.state.isInsertModalOpen,
	          ariaHideApp: false,
	          onRequestClose: this.handleModalClose,
	          contentLabel: 'Modal' },
	        modal
	      );
	    }
	  }, {
	    key: 'renderCustomBtn',
	    value: function renderCustomBtn(cb, params, componentName, eventName, event) {
	      var element = cb.apply(null, params);
	      if (element.type.name === componentName && !element.props[eventName]) {
	        var props = {};
	        props[eventName] = event;
	        element = _react2.default.cloneElement(element, props);
	      }
	      return element;
	    }
	  }]);

	  return ToolBar;
	}(_react.Component);

	ToolBar.modalSeq = 0;


	ToolBar.propTypes = {
	  version: _propTypes2.default.string,
	  onAddRow: _propTypes2.default.func,
	  onDropRow: _propTypes2.default.func,
	  onShowOnlySelected: _propTypes2.default.func,
	  enableInsert: _propTypes2.default.bool,
	  enableDelete: _propTypes2.default.bool,
	  enableSearch: _propTypes2.default.bool,
	  enableShowOnlySelected: _propTypes2.default.bool,
	  columns: _propTypes2.default.array,
	  searchPlaceholder: _propTypes2.default.string,
	  exportCSVText: _propTypes2.default.string,
	  insertText: _propTypes2.default.string,
	  deleteText: _propTypes2.default.string,
	  saveText: _propTypes2.default.string,
	  closeText: _propTypes2.default.string,
	  clearSearch: _propTypes2.default.bool,
	  ignoreEditable: _propTypes2.default.bool,
	  defaultSearch: _propTypes2.default.string,
	  insertModalHeader: _propTypes2.default.func,
	  insertModalBody: _propTypes2.default.func,
	  insertModalFooter: _propTypes2.default.func,
	  insertModal: _propTypes2.default.func,
	  insertBtn: _propTypes2.default.func,
	  deleteBtn: _propTypes2.default.func,
	  showSelectedOnlyBtn: _propTypes2.default.func,
	  exportCSVBtn: _propTypes2.default.func,
	  clearSearchBtn: _propTypes2.default.func,
	  searchField: _propTypes2.default.func,
	  searchPanel: _propTypes2.default.func,
	  btnGroup: _propTypes2.default.func,
	  toolBar: _propTypes2.default.func,
	  searchPosition: _propTypes2.default.string,
	  reset: _propTypes2.default.bool,
	  isValidKey: _propTypes2.default.func,
	  insertFailIndicator: _propTypes2.default.string
	};

	ToolBar.defaultProps = {
	  reset: false,
	  enableInsert: false,
	  enableDelete: false,
	  enableSearch: false,
	  enableShowOnlySelected: false,
	  clearSearch: false,
	  ignoreEditable: false,
	  exportCSVText: _Const2.default.EXPORT_CSV_TEXT,
	  insertText: _Const2.default.INSERT_BTN_TEXT,
	  deleteText: _Const2.default.DELETE_BTN_TEXT,
	  saveText: _Const2.default.SAVE_BTN_TEXT,
	  closeText: _Const2.default.CLOSE_BTN_TEXT
	};

	var _default = ToolBar;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(ToolBar, 'ToolBar', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ToolBar.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ToolBar.js');
	}();

	;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Modal = __webpack_require__(46);

	var _Modal2 = _interopRequireDefault(_Modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Modal2.default;
	module.exports = exports["default"];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bodyOpenClassName = exports.portalClassName = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ModalPortal = __webpack_require__(47);

	var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

	var _ariaAppHider = __webpack_require__(51);

	var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

	var _safeHTMLElement = __webpack_require__(55);

	var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var portalClassName = exports.portalClassName = "ReactModalPortal";
	var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

	var isReact16 = _reactDom2.default.createPortal !== undefined;
	var createPortal = isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;

	function getParentElement(parentSelector) {
	  return parentSelector();
	}

	var Modal = function (_Component) {
	  _inherits(Modal, _Component);

	  function Modal() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Modal);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
	      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
	      var parent = getParentElement(_this.props.parentSelector);
	      parent.removeChild(_this.node);
	    }, _this.portalRef = function (ref) {
	      _this.portal = ref;
	    }, _this.renderPortal = function (props) {
	      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
	      _this.portalRef(portal);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Modal, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      if (!_safeHTMLElement.canUseDOM) return;

	      if (!isReact16) {
	        this.node = document.createElement("div");
	      }
	      this.node.className = this.props.portalClassName;

	      var parent = getParentElement(this.props.parentSelector);
	      parent.appendChild(this.node);

	      !isReact16 && this.renderPortal(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      if (!_safeHTMLElement.canUseDOM) return;
	      var isOpen = newProps.isOpen;
	      // Stop unnecessary renders if modal is remaining closed

	      if (!this.props.isOpen && !isOpen) return;

	      var currentParent = getParentElement(this.props.parentSelector);
	      var newParent = getParentElement(newProps.parentSelector);

	      if (newParent !== currentParent) {
	        currentParent.removeChild(this.node);
	        newParent.appendChild(this.node);
	      }

	      !isReact16 && this.renderPortal(newProps);
	    }
	  }, {
	    key: "componentWillUpdate",
	    value: function componentWillUpdate(newProps) {
	      if (!_safeHTMLElement.canUseDOM) return;
	      if (newProps.portalClassName !== this.props.portalClassName) {
	        this.node.className = newProps.portalClassName;
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

	      var state = this.portal.state;
	      var now = Date.now();
	      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

	      if (closesAt) {
	        if (!state.beforeClose) {
	          this.portal.closeWithTimeout();
	        }

	        setTimeout(this.removePortal, closesAt - now);
	      } else {
	        this.removePortal();
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (!_safeHTMLElement.canUseDOM || !isReact16) {
	        return null;
	      }

	      if (!this.node && isReact16) {
	        this.node = document.createElement("div");
	      }

	      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
	        ref: this.portalRef,
	        defaultStyles: Modal.defaultStyles
	      }, this.props)), this.node);
	    }
	  }], [{
	    key: "setAppElement",
	    value: function setAppElement(element) {
	      ariaAppHider.setElement(element);
	    }

	    /* eslint-disable react/no-unused-prop-types */

	    /* eslint-enable react/no-unused-prop-types */

	  }]);

	  return Modal;
	}(_react.Component);

	Modal.propTypes = {
	  isOpen: _propTypes2.default.bool.isRequired,
	  style: _propTypes2.default.shape({
	    content: _propTypes2.default.object,
	    overlay: _propTypes2.default.object
	  }),
	  portalClassName: _propTypes2.default.string,
	  bodyOpenClassName: _propTypes2.default.string,
	  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
	    base: _propTypes2.default.string.isRequired,
	    afterOpen: _propTypes2.default.string.isRequired,
	    beforeClose: _propTypes2.default.string.isRequired
	  })]),
	  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
	    base: _propTypes2.default.string.isRequired,
	    afterOpen: _propTypes2.default.string.isRequired,
	    beforeClose: _propTypes2.default.string.isRequired
	  })]),
	  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
	  onAfterOpen: _propTypes2.default.func,
	  onRequestClose: _propTypes2.default.func,
	  closeTimeoutMS: _propTypes2.default.number,
	  ariaHideApp: _propTypes2.default.bool,
	  shouldFocusAfterRender: _propTypes2.default.bool,
	  shouldCloseOnOverlayClick: _propTypes2.default.bool,
	  shouldReturnFocusAfterClose: _propTypes2.default.bool,
	  parentSelector: _propTypes2.default.func,
	  aria: _propTypes2.default.object,
	  role: _propTypes2.default.string,
	  contentLabel: _propTypes2.default.string,
	  shouldCloseOnEsc: _propTypes2.default.bool
	};
	Modal.defaultProps = {
	  isOpen: false,
	  portalClassName: portalClassName,
	  bodyOpenClassName: bodyOpenClassName,
	  ariaHideApp: true,
	  closeTimeoutMS: 0,
	  shouldFocusAfterRender: true,
	  shouldCloseOnEsc: true,
	  shouldCloseOnOverlayClick: true,
	  shouldReturnFocusAfterClose: true,
	  parentSelector: function parentSelector() {
	    return document.body;
	  }
	};
	Modal.defaultStyles = {
	  overlay: {
	    position: "fixed",
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    backgroundColor: "rgba(255, 255, 255, 0.75)"
	  },
	  content: {
	    position: "absolute",
	    top: "40px",
	    left: "40px",
	    right: "40px",
	    bottom: "40px",
	    border: "1px solid #ccc",
	    background: "#fff",
	    overflow: "auto",
	    WebkitOverflowScrolling: "touch",
	    borderRadius: "4px",
	    outline: "none",
	    padding: "20px"
	  }
	};
	exports.default = Modal;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _focusManager = __webpack_require__(48);

	var focusManager = _interopRequireWildcard(_focusManager);

	var _scopeTab = __webpack_require__(50);

	var _scopeTab2 = _interopRequireDefault(_scopeTab);

	var _ariaAppHider = __webpack_require__(51);

	var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

	var _refCount = __webpack_require__(53);

	var refCount = _interopRequireWildcard(_refCount);

	var _bodyClassList = __webpack_require__(54);

	var bodyClassList = _interopRequireWildcard(_bodyClassList);

	var _safeHTMLElement = __webpack_require__(55);

	var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// so that our CSS is statically analyzable
	var CLASS_NAMES = {
	  overlay: "ReactModal__Overlay",
	  content: "ReactModal__Content"
	};

	var TAB_KEY = 9;
	var ESC_KEY = 27;

	var ModalPortal = function (_Component) {
	  _inherits(ModalPortal, _Component);

	  function ModalPortal(props) {
	    _classCallCheck(this, ModalPortal);

	    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

	    _this.setFocusAfterRender = function (focus) {
	      _this.focusAfterRender = _this.props.shouldFocusAfterRender && focus;
	    };

	    _this.setOverlayRef = function (overlay) {
	      _this.overlay = overlay;
	    };

	    _this.setContentRef = function (content) {
	      _this.content = content;
	    };

	    _this.afterClose = function () {
	      var _this$props = _this.props,
	          appElement = _this$props.appElement,
	          ariaHideApp = _this$props.ariaHideApp;

	      // Remove body class

	      bodyClassList.remove(_this.props.bodyOpenClassName);

	      // Reset aria-hidden attribute if all modals have been removed
	      if (ariaHideApp && refCount.totalCount() < 1) {
	        ariaAppHider.show(appElement);
	      }

	      if (_this.props.shouldFocusAfterRender) {
	        if (_this.props.shouldReturnFocusAfterClose) {
	          focusManager.returnFocus();
	          focusManager.teardownScopedFocus();
	        } else {
	          focusManager.popWithoutFocus();
	        }
	      }
	    };

	    _this.open = function () {
	      _this.beforeOpen();
	      if (_this.state.afterOpen && _this.state.beforeClose) {
	        clearTimeout(_this.closeTimer);
	        _this.setState({ beforeClose: false });
	      } else {
	        if (_this.props.shouldFocusAfterRender) {
	          focusManager.setupScopedFocus(_this.node);
	          focusManager.markForFocusLater();
	        }

	        _this.setState({ isOpen: true }, function () {
	          _this.setState({ afterOpen: true });

	          if (_this.props.isOpen && _this.props.onAfterOpen) {
	            _this.props.onAfterOpen();
	          }
	        });
	      }
	    };

	    _this.close = function () {
	      if (_this.props.closeTimeoutMS > 0) {
	        _this.closeWithTimeout();
	      } else {
	        _this.closeWithoutTimeout();
	      }
	    };

	    _this.focusContent = function () {
	      return _this.content && !_this.contentHasFocus() && _this.content.focus();
	    };

	    _this.closeWithTimeout = function () {
	      var closesAt = Date.now() + _this.props.closeTimeoutMS;
	      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
	        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
	      });
	    };

	    _this.closeWithoutTimeout = function () {
	      _this.setState({
	        beforeClose: false,
	        isOpen: false,
	        afterOpen: false,
	        closesAt: null
	      }, _this.afterClose);
	    };

	    _this.handleKeyDown = function (event) {
	      if (event.keyCode === TAB_KEY) {
	        (0, _scopeTab2.default)(_this.content, event);
	      }

	      if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
	        event.preventDefault();
	        _this.requestClose(event);
	      }
	    };

	    _this.handleOverlayOnClick = function (event) {
	      if (_this.shouldClose === null) {
	        _this.shouldClose = true;
	      }

	      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
	        if (_this.ownerHandlesClose()) {
	          _this.requestClose(event);
	        } else {
	          _this.focusContent();
	        }
	      }
	      _this.shouldClose = null;
	      _this.moveFromContentToOverlay = null;
	    };

	    _this.handleOverlayOnMouseUp = function () {
	      if (_this.moveFromContentToOverlay === null) {
	        _this.shouldClose = false;
	      }
	    };

	    _this.handleContentOnMouseUp = function () {
	      _this.shouldClose = false;
	    };

	    _this.handleOverlayOnMouseDown = function (event) {
	      if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
	        event.preventDefault();
	      }
	      _this.moveFromContentToOverlay = false;
	    };

	    _this.handleContentOnClick = function () {
	      _this.shouldClose = false;
	    };

	    _this.handleContentOnMouseDown = function () {
	      _this.shouldClose = false;
	      _this.moveFromContentToOverlay = false;
	    };

	    _this.requestClose = function (event) {
	      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
	    };

	    _this.ownerHandlesClose = function () {
	      return _this.props.onRequestClose;
	    };

	    _this.shouldBeClosed = function () {
	      return !_this.state.isOpen && !_this.state.beforeClose;
	    };

	    _this.contentHasFocus = function () {
	      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
	    };

	    _this.buildClassName = function (which, additional) {
	      var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
	        base: CLASS_NAMES[which],
	        afterOpen: CLASS_NAMES[which] + "--after-open",
	        beforeClose: CLASS_NAMES[which] + "--before-close"
	      };
	      var className = classNames.base;
	      if (_this.state.afterOpen) {
	        className = className + " " + classNames.afterOpen;
	      }
	      if (_this.state.beforeClose) {
	        className = className + " " + classNames.beforeClose;
	      }
	      return typeof additional === "string" && additional ? className + " " + additional : className;
	    };

	    _this.ariaAttributes = function (items) {
	      return Object.keys(items).reduce(function (acc, name) {
	        acc["aria-" + name] = items[name];
	        return acc;
	      }, {});
	    };

	    _this.state = {
	      afterOpen: false,
	      beforeClose: false
	    };

	    _this.shouldClose = null;
	    _this.moveFromContentToOverlay = null;
	    return _this;
	  }

	  _createClass(ModalPortal, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      // Focus needs to be set when mounting and already open
	      if (this.props.isOpen) {
	        this.setFocusAfterRender(true);
	        this.open();
	      }
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      if (process.env.NODE_ENV !== "production") {
	        if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
	          // eslint-disable-next-line no-console
	          console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
	        }
	      }
	      // Focus only needs to be set once when the modal is being opened
	      if (!this.props.isOpen && newProps.isOpen) {
	        this.setFocusAfterRender(true);
	        this.open();
	      } else if (this.props.isOpen && !newProps.isOpen) {
	        this.close();
	      }
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate() {
	      if (this.focusAfterRender) {
	        this.focusContent();
	        this.setFocusAfterRender(false);
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.afterClose();
	      clearTimeout(this.closeTimer);
	    }
	  }, {
	    key: "beforeOpen",
	    value: function beforeOpen() {
	      var _props = this.props,
	          appElement = _props.appElement,
	          ariaHideApp = _props.ariaHideApp,
	          bodyOpenClassName = _props.bodyOpenClassName;
	      // Add body class

	      bodyClassList.add(bodyOpenClassName);
	      // Add aria-hidden to appElement
	      if (ariaHideApp) {
	        ariaAppHider.hide(appElement);
	      }
	    }

	    // Don't steal focus from inner elements

	  }, {
	    key: "render",
	    value: function render() {
	      var _props2 = this.props,
	          className = _props2.className,
	          overlayClassName = _props2.overlayClassName,
	          defaultStyles = _props2.defaultStyles;

	      var contentStyles = className ? {} : defaultStyles.content;
	      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

	      return this.shouldBeClosed() ? null : _react2.default.createElement(
	        "div",
	        {
	          ref: this.setOverlayRef,
	          className: this.buildClassName("overlay", overlayClassName),
	          style: _extends({}, overlayStyles, this.props.style.overlay),
	          onClick: this.handleOverlayOnClick,
	          onMouseDown: this.handleOverlayOnMouseDown,
	          onMouseUp: this.handleOverlayOnMouseUp,
	          "aria-modal": "true"
	        },
	        _react2.default.createElement(
	          "div",
	          _extends({
	            ref: this.setContentRef,
	            style: _extends({}, contentStyles, this.props.style.content),
	            className: this.buildClassName("content", className),
	            tabIndex: "-1",
	            onKeyDown: this.handleKeyDown,
	            onMouseDown: this.handleContentOnMouseDown,
	            onMouseUp: this.handleContentOnMouseUp,
	            onClick: this.handleContentOnClick,
	            role: this.props.role,
	            "aria-label": this.props.contentLabel
	          }, this.ariaAttributes(this.props.aria || {})),
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return ModalPortal;
	}(_react.Component);

	ModalPortal.defaultProps = {
	  style: {
	    overlay: {},
	    content: {}
	  }
	};
	ModalPortal.propTypes = {
	  isOpen: _propTypes2.default.bool.isRequired,
	  defaultStyles: _propTypes2.default.shape({
	    content: _propTypes2.default.object,
	    overlay: _propTypes2.default.object
	  }),
	  style: _propTypes2.default.shape({
	    content: _propTypes2.default.object,
	    overlay: _propTypes2.default.object
	  }),
	  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
	  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
	  bodyOpenClassName: _propTypes2.default.string,
	  ariaHideApp: _propTypes2.default.bool,
	  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
	  onAfterOpen: _propTypes2.default.func,
	  onRequestClose: _propTypes2.default.func,
	  closeTimeoutMS: _propTypes2.default.number,
	  shouldFocusAfterRender: _propTypes2.default.bool,
	  shouldCloseOnOverlayClick: _propTypes2.default.bool,
	  shouldReturnFocusAfterClose: _propTypes2.default.bool,
	  role: _propTypes2.default.string,
	  contentLabel: _propTypes2.default.string,
	  aria: _propTypes2.default.object,
	  children: _propTypes2.default.node,
	  shouldCloseOnEsc: _propTypes2.default.bool
	};
	exports.default = ModalPortal;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleBlur = handleBlur;
	exports.handleFocus = handleFocus;
	exports.markForFocusLater = markForFocusLater;
	exports.returnFocus = returnFocus;
	exports.popWithoutFocus = popWithoutFocus;
	exports.setupScopedFocus = setupScopedFocus;
	exports.teardownScopedFocus = teardownScopedFocus;

	var _tabbable = __webpack_require__(49);

	var _tabbable2 = _interopRequireDefault(_tabbable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var focusLaterElements = [];
	var modalElement = null;
	var needToFocus = false;

	function handleBlur() {
	  needToFocus = true;
	}

	function handleFocus() {
	  if (needToFocus) {
	    needToFocus = false;
	    if (!modalElement) {
	      return;
	    }
	    // need to see how jQuery shims document.on('focusin') so we don't need the
	    // setTimeout, firefox doesn't support focusin, if it did, we could focus
	    // the element outside of a setTimeout. Side-effect of this implementation
	    // is that the document.body gets focus, and then we focus our element right
	    // after, seems fine.
	    setTimeout(function () {
	      if (modalElement.contains(document.activeElement)) {
	        return;
	      }
	      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
	      el.focus();
	    }, 0);
	  }
	}

	function markForFocusLater() {
	  focusLaterElements.push(document.activeElement);
	}

	/* eslint-disable no-console */
	function returnFocus() {
	  var toFocus = null;
	  try {
	    toFocus = focusLaterElements.pop();
	    toFocus.focus();
	    return;
	  } catch (e) {
	    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
	  }
	}
	/* eslint-enable no-console */

	function popWithoutFocus() {
	  focusLaterElements.length > 0 && focusLaterElements.pop();
	}

	function setupScopedFocus(element) {
	  modalElement = element;

	  if (window.addEventListener) {
	    window.addEventListener("blur", handleBlur, false);
	    document.addEventListener("focus", handleFocus, true);
	  } else {
	    window.attachEvent("onBlur", handleBlur);
	    document.attachEvent("onFocus", handleFocus);
	  }
	}

	function teardownScopedFocus() {
	  modalElement = null;

	  if (window.addEventListener) {
	    window.removeEventListener("blur", handleBlur);
	    document.removeEventListener("focus", handleFocus);
	  } else {
	    window.detachEvent("onBlur", handleBlur);
	    document.detachEvent("onFocus", handleFocus);
	  }
	}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = findTabbableDescendants;
	/*!
	 * Adapted from jQuery UI core
	 *
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */

	var tabbableNode = /input|select|textarea|button|object/;

	function hidesContents(element) {
	  var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

	  // If the node is empty, this is good enough
	  if (zeroSize && !element.innerHTML) return true;

	  // Otherwise we need to check some styles
	  var style = window.getComputedStyle(element);
	  return zeroSize ? style.getPropertyValue("overflow") !== "visible" : style.getPropertyValue("display") == "none";
	}

	function visible(element) {
	  var parentElement = element;
	  while (parentElement) {
	    if (parentElement === document.body) break;
	    if (hidesContents(parentElement)) return false;
	    parentElement = parentElement.parentNode;
	  }
	  return true;
	}

	function focusable(element, isTabIndexNotNaN) {
	  var nodeName = element.nodeName.toLowerCase();
	  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
	  return res && visible(element);
	}

	function tabbable(element) {
	  var tabIndex = element.getAttribute("tabindex");
	  if (tabIndex === null) tabIndex = undefined;
	  var isTabIndexNaN = isNaN(tabIndex);
	  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
	}

	function findTabbableDescendants(element) {
	  return [].slice.call(element.querySelectorAll("*"), 0).filter(tabbable);
	}
	module.exports = exports["default"];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scopeTab;

	var _tabbable = __webpack_require__(49);

	var _tabbable2 = _interopRequireDefault(_tabbable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scopeTab(node, event) {
	  var tabbable = (0, _tabbable2.default)(node);

	  if (!tabbable.length) {
	    // Do nothing, since there are no elements that can receive focus.
	    event.preventDefault();
	    return;
	  }

	  var shiftKey = event.shiftKey;
	  var head = tabbable[0];
	  var tail = tabbable[tabbable.length - 1];

	  // proceed with default browser behavior
	  if (node === document.activeElement) {
	    return;
	  }

	  var target;
	  if (tail === document.activeElement && !shiftKey) {
	    target = head;
	  }

	  if (head === document.activeElement && shiftKey) {
	    target = tail;
	  }

	  if (target) {
	    event.preventDefault();
	    target.focus();
	    return;
	  }

	  // Safari radio issue.
	  //
	  // Safari does not move the focus to the radio button,
	  // so we need to force it to really walk through all elements.
	  //
	  // This is very error prune, since we are trying to guess
	  // if it is a safari browser from the first occurence between
	  // chrome or safari.
	  //
	  // The chrome user agent contains the first ocurrence
	  // as the 'chrome/version' and later the 'safari/version'.
	  var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
	  var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

	  // If we are not in safari desktop, let the browser control
	  // the focus
	  if (!isSafariDesktop) return;

	  var x = tabbable.indexOf(document.activeElement);

	  if (x > -1) {
	    x += shiftKey ? -1 : 1;
	  }

	  event.preventDefault();

	  tabbable[x].focus();
	}
	module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.assertNodeList = assertNodeList;
	exports.setElement = setElement;
	exports.validateElement = validateElement;
	exports.hide = hide;
	exports.show = show;
	exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
	exports.resetForTesting = resetForTesting;

	var _warning = __webpack_require__(52);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var globalElement = null;

	function assertNodeList(nodeList, selector) {
	  if (!nodeList || !nodeList.length) {
	    throw new Error("react-modal: No elements were found for selector " + selector + ".");
	  }
	}

	function setElement(element) {
	  var useElement = element;
	  if (typeof useElement === "string") {
	    var el = document.querySelectorAll(useElement);
	    assertNodeList(el, useElement);
	    useElement = "length" in el ? el[0] : el;
	  }
	  globalElement = useElement || globalElement;
	  return globalElement;
	}

	function validateElement(appElement) {
	  if (!appElement && !globalElement) {
	    (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));

	    return false;
	  }

	  return true;
	}

	function hide(appElement) {
	  if (validateElement(appElement)) {
	    (appElement || globalElement).setAttribute("aria-hidden", "true");
	  }
	}

	function show(appElement) {
	  if (validateElement(appElement)) {
	    (appElement || globalElement).removeAttribute("aria-hidden");
	  }
	}

	function documentNotReadyOrSSRTesting() {
	  globalElement = null;
	}

	function resetForTesting() {
	  globalElement = null;
	}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	exports.add = add;
	exports.remove = remove;
	exports.totalCount = totalCount;
	var classListMap = {};

	function get() {
	  return classListMap;
	}

	function add(bodyClass) {
	  // Set variable and default if none
	  if (!classListMap[bodyClass]) {
	    classListMap[bodyClass] = 0;
	  }
	  classListMap[bodyClass] += 1;
	  return bodyClass;
	}

	function remove(bodyClass) {
	  if (classListMap[bodyClass]) {
	    classListMap[bodyClass] -= 1;
	  }
	  return bodyClass;
	}

	function totalCount() {
	  return Object.keys(classListMap).reduce(function (acc, curr) {
	    return acc + classListMap[curr];
	  }, 0);
	}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.add = add;
	exports.remove = remove;

	var _refCount = __webpack_require__(53);

	var refCount = _interopRequireWildcard(_refCount);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function add(bodyClass) {
	  // Increment class(es) on refCount tracker and add class(es) to body
	  bodyClass.split(" ").map(refCount.add).forEach(function (className) {
	    return document.body.classList.add(className);
	  });
	}

	function remove(bodyClass) {
	  var classListMap = refCount.get();
	  // Decrement class(es) from the refCount tracker
	  // and remove unused class(es) from body
	  bodyClass.split(" ").map(refCount.remove).filter(function (className) {
	    return classListMap[className] === 0;
	  }).forEach(function (className) {
	    return document.body.classList.remove(className);
	  });
	}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.canUseDOM = undefined;

	var _exenv = __webpack_require__(56);

	var _exenv2 = _interopRequireDefault(_exenv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EE = _exenv2.default;

	var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

	var canUseDOM = exports.canUseDOM = EE.canUseDOM;

	exports.default = SafeHTMLElement;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Based on code that is Copyright 2013-2015, Facebook, Inc.
	  All rights reserved.
	*/
	/* global define */

	(function () {
		'use strict';

		var canUseDOM = !!(
			typeof window !== 'undefined' &&
			window.document &&
			window.document.createElement
		);

		var ExecutionEnvironment = {

			canUseDOM: canUseDOM,

			canUseWorkers: typeof Worker !== 'undefined',

			canUseEventListeners:
				canUseDOM && !!(window.addEventListener || window.attachEvent),

			canUseViewport: canUseDOM && !!window.screen

		};

		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return ExecutionEnvironment;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = ExecutionEnvironment;
		} else {
			window.ExecutionEnvironment = ExecutionEnvironment;
		}

	}());


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _InsertModalHeader = __webpack_require__(58);

	var _InsertModalHeader2 = _interopRequireDefault(_InsertModalHeader);

	var _InsertModalFooter = __webpack_require__(59);

	var _InsertModalFooter2 = _interopRequireDefault(_InsertModalFooter);

	var _InsertModalBody = __webpack_require__(60);

	var _InsertModalBody2 = _interopRequireDefault(_InsertModalBody);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-console: 0 */

	var defaultModalClassName = 'react-bs-table-insert-modal';

	var InsertModal = function (_Component) {
	  _inherits(InsertModal, _Component);

	  function InsertModal() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, InsertModal);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InsertModal.__proto__ || Object.getPrototypeOf(InsertModal)).call.apply(_ref, [this].concat(args))), _this), _this.handleSave = function () {
	      var _this2;

	      return (_this2 = _this).__handleSave__REACT_HOT_LOADER__.apply(_this2, arguments);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(InsertModal, [{
	    key: '__handleSave__REACT_HOT_LOADER__',
	    value: function __handleSave__REACT_HOT_LOADER__() {
	      return this.__handleSave__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleSave__REACT_HOT_LOADER__',
	    value: function __handleSave__REACT_HOT_LOADER__() {
	      if (this.body.getFieldValue) {
	        this.props.onSave(this.body.getFieldValue());
	      } else {
	        console.error('Custom InsertModalBody should implement getFieldValue function\n        and should return an object presented as the new row that user input.');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props = this.props,
	          headerComponent = _props.headerComponent,
	          footerComponent = _props.footerComponent,
	          bodyComponent = _props.bodyComponent;
	      var _props2 = this.props,
	          columns = _props2.columns,
	          validateState = _props2.validateState,
	          ignoreEditable = _props2.ignoreEditable,
	          onModalClose = _props2.onModalClose;

	      var bodyAttr = { columns: columns, validateState: validateState, ignoreEditable: ignoreEditable };

	      bodyComponent = bodyComponent && bodyComponent(columns, validateState, ignoreEditable);

	      headerComponent = headerComponent && headerComponent(onModalClose, this.handleSave);

	      footerComponent = footerComponent && footerComponent(onModalClose, this.handleSave);

	      if (bodyComponent) {
	        bodyComponent = _react2.default.cloneElement(bodyComponent, { ref: function ref(node) {
	            return _this3.body = node;
	          } });
	      }

	      if (headerComponent && headerComponent.type.name === _InsertModalHeader2.default.name) {
	        var eventProps = {};
	        if (!headerComponent.props.onModalClose) eventProps.onModalClose = onModalClose;
	        if (!headerComponent.props.onSave) eventProps.onSave = this.handleSave;
	        if (Object.keys(eventProps).length > 0) {
	          headerComponent = _react2.default.cloneElement(headerComponent, eventProps);
	        }
	      } else if (headerComponent && headerComponent.type.name !== _InsertModalHeader2.default.name) {
	        var className = headerComponent.props.className;

	        if (typeof className === 'undefined' || className.indexOf('modal-header') === -1) {
	          headerComponent = _react2.default.createElement(
	            'div',
	            { className: 'modal-header' },
	            headerComponent
	          );
	        }
	      }

	      if (footerComponent && footerComponent.type.name === _InsertModalFooter2.default.name) {
	        var _eventProps = {};
	        if (!footerComponent.props.onModalClose) _eventProps.onModalClose = onModalClose;
	        if (!footerComponent.props.onSave) _eventProps.onSave = this.handleSave;
	        if (Object.keys(_eventProps).length > 0) {
	          footerComponent = _react2.default.cloneElement(footerComponent, _eventProps);
	        }
	      } else if (footerComponent && footerComponent.type.name !== _InsertModalFooter2.default.name) {
	        var _className = footerComponent.props.className;

	        if (typeof _className === 'undefined' || _className.indexOf('modal-footer') === -1) {
	          footerComponent = _react2.default.createElement(
	            'div',
	            { className: 'modal-footer' },
	            footerComponent
	          );
	        }
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'modal-content ' + defaultModalClassName },
	        headerComponent || _react2.default.createElement(_InsertModalHeader2.default, {
	          version: this.props.version,
	          className: 'react-bs-table-inser-modal-header',
	          onModalClose: onModalClose }),
	        bodyComponent || _react2.default.createElement(_InsertModalBody2.default, _extends({ ref: function ref(node) {
	            return _this3.body = node;
	          } }, bodyAttr)),
	        footerComponent || _react2.default.createElement(_InsertModalFooter2.default, {
	          className: 'react-bs-table-inser-modal-footer',
	          onModalClose: onModalClose,
	          onSave: this.handleSave })
	      );
	    }
	  }]);

	  return InsertModal;
	}(_react.Component);

	var _default = InsertModal;
	exports.default = _default;

	InsertModal.propTypes = {
	  version: _propTypes2.default.string.isRequired,
	  columns: _propTypes2.default.array.isRequired,
	  validateState: _propTypes2.default.object.isRequired,
	  ignoreEditable: _propTypes2.default.bool,
	  headerComponent: _propTypes2.default.func,
	  bodyComponent: _propTypes2.default.func,
	  footerComponent: _propTypes2.default.func,
	  onModalClose: _propTypes2.default.func,
	  onSave: _propTypes2.default.func
	};

	InsertModal.defaultProps = {};
	;

	var _temp2 = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(defaultModalClassName, 'defaultModalClassName', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModal.js');

	  __REACT_HOT_LOADER__.register(InsertModal, 'InsertModal', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModal.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModal.js');
	}();

	;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InsertModalHeader = function (_Component) {
	  _inherits(InsertModalHeader, _Component);

	  function InsertModalHeader() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, InsertModalHeader);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InsertModalHeader.__proto__ || Object.getPrototypeOf(InsertModalHeader)).call.apply(_ref, [this].concat(args))), _this), _this.handleCloseBtnClick = function () {
	      var _this2;

	      return (_this2 = _this).__handleCloseBtnClick__REACT_HOT_LOADER__.apply(_this2, arguments);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(InsertModalHeader, [{
	    key: '__handleCloseBtnClick__REACT_HOT_LOADER__',
	    value: function __handleCloseBtnClick__REACT_HOT_LOADER__() {
	      return this.__handleCloseBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCloseBtnClick__REACT_HOT_LOADER__',
	    value: function __handleCloseBtnClick__REACT_HOT_LOADER__(e) {
	      var _props = this.props,
	          onModalClose = _props.onModalClose,
	          beforeClose = _props.beforeClose;

	      beforeClose && beforeClose(e);
	      onModalClose();
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent(closeBtn) {
	      var _props2 = this.props,
	          version = _props2.version,
	          titleText = _props2.title;

	      var title = _react2.default.createElement(
	        'h4',
	        { key: 'title', className: 'modal-title' },
	        titleText
	      );
	      if (_util2.default.isBootstrap4(version)) {
	        return [title, closeBtn];
	      } else {
	        return _react2.default.createElement(
	          'span',
	          null,
	          closeBtn,
	          title
	        );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props,
	          hideClose = _props3.hideClose,
	          className = _props3.className,
	          children = _props3.children;


	      var closeBtn = hideClose ? null : _react2.default.createElement(
	        'button',
	        { type: 'button',
	          className: 'close', onClick: this.handleCloseBtnClick },
	        _react2.default.createElement(
	          'span',
	          { 'aria-hidden': 'true' },
	          '\xD7'
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'sr-only' },
	          'Close'
	        )
	      );

	      var content = children || this.renderContent(closeBtn);

	      return _react2.default.createElement(
	        'div',
	        { className: 'modal-header ' + className },
	        content
	      );
	    }
	  }]);

	  return InsertModalHeader;
	}(_react.Component);

	InsertModalHeader.propTypes = {
	  version: _propTypes2.default.string,
	  className: _propTypes2.default.string,
	  title: _propTypes2.default.string,
	  onModalClose: _propTypes2.default.func,
	  hideClose: _propTypes2.default.bool,
	  beforeClose: _propTypes2.default.func
	};
	InsertModalHeader.defaultProps = {
	  version: '3',
	  className: '',
	  title: 'Add Row',
	  onModalClose: undefined,
	  hideClose: false,
	  beforeClose: undefined
	};

	var _default = InsertModalHeader;
	exports.default = _default;
	;

	var _temp2 = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(InsertModalHeader, 'InsertModalHeader', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModalHeader.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModalHeader.js');
	}();

	;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InsertModalFooter = function (_Component) {
	  _inherits(InsertModalFooter, _Component);

	  function InsertModalFooter() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, InsertModalFooter);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InsertModalFooter.__proto__ || Object.getPrototypeOf(InsertModalFooter)).call.apply(_ref, [this].concat(args))), _this), _this.handleCloseBtnClick = function () {
	      var _this2;

	      return (_this2 = _this).__handleCloseBtnClick__REACT_HOT_LOADER__.apply(_this2, arguments);
	    }, _this.handleSaveBtnClick = function () {
	      var _this3;

	      return (_this3 = _this).__handleSaveBtnClick__REACT_HOT_LOADER__.apply(_this3, arguments);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(InsertModalFooter, [{
	    key: '__handleSaveBtnClick__REACT_HOT_LOADER__',
	    value: function __handleSaveBtnClick__REACT_HOT_LOADER__() {
	      return this.__handleSaveBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCloseBtnClick__REACT_HOT_LOADER__',
	    value: function __handleCloseBtnClick__REACT_HOT_LOADER__() {
	      return this.__handleCloseBtnClick__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleCloseBtnClick__REACT_HOT_LOADER__',
	    value: function __handleCloseBtnClick__REACT_HOT_LOADER__(e) {
	      var _props = this.props,
	          beforeClose = _props.beforeClose,
	          onModalClose = _props.onModalClose;

	      beforeClose && beforeClose(e);
	      onModalClose();
	    }
	  }, {
	    key: '__handleSaveBtnClick__REACT_HOT_LOADER__',
	    value: function __handleSaveBtnClick__REACT_HOT_LOADER__(e) {
	      var _props2 = this.props,
	          beforeSave = _props2.beforeSave,
	          onSave = _props2.onSave;

	      beforeSave && beforeSave(e);
	      onSave();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props,
	          className = _props3.className,
	          saveBtnText = _props3.saveBtnText,
	          closeBtnText = _props3.closeBtnText,
	          closeBtnContextual = _props3.closeBtnContextual,
	          saveBtnContextual = _props3.saveBtnContextual,
	          closeBtnClass = _props3.closeBtnClass,
	          saveBtnClass = _props3.saveBtnClass,
	          children = _props3.children;


	      var content = children || [_react2.default.createElement(
	        'button',
	        {
	          key: 'closeBtn',
	          type: 'button',
	          className: 'btn ' + closeBtnContextual + ' ' + closeBtnClass,
	          onClick: this.handleCloseBtnClick },
	        closeBtnText
	      ), _react2.default.createElement(
	        'button',
	        {
	          key: 'saveBtn',
	          type: 'button',
	          className: 'btn ' + saveBtnContextual + ' ' + saveBtnClass,
	          onClick: this.handleSaveBtnClick },
	        saveBtnText
	      )];

	      return _react2.default.createElement(
	        'div',
	        { className: 'modal-footer ' + className },
	        content
	      );
	    }
	  }]);

	  return InsertModalFooter;
	}(_react.Component);

	InsertModalFooter.propTypes = {
	  className: _propTypes2.default.string,
	  saveBtnText: _propTypes2.default.string,
	  closeBtnText: _propTypes2.default.string,
	  closeBtnContextual: _propTypes2.default.string,
	  saveBtnContextual: _propTypes2.default.string,
	  closeBtnClass: _propTypes2.default.string,
	  saveBtnClass: _propTypes2.default.string,
	  beforeClose: _propTypes2.default.func,
	  beforeSave: _propTypes2.default.func,
	  onSave: _propTypes2.default.func,
	  onModalClose: _propTypes2.default.func
	};
	InsertModalFooter.defaultProps = {
	  className: '',
	  saveBtnText: _Const2.default.SAVE_BTN_TEXT,
	  closeBtnText: _Const2.default.CLOSE_BTN_TEXT,
	  closeBtnContextual: 'btn-default btn-secondary',
	  saveBtnContextual: 'btn-primary',
	  closeBtnClass: '',
	  saveBtnClass: '',
	  beforeClose: undefined,
	  beforeSave: undefined
	};

	var _default = InsertModalFooter;
	exports.default = _default;
	;

	var _temp2 = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(InsertModalFooter, 'InsertModalFooter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModalFooter.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModalFooter.js');
	}();

	;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Editor = __webpack_require__(38);

	var _Editor2 = _interopRequireDefault(_Editor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/display-name: 0 */


	var InsertModalBody = function (_Component) {
	  _inherits(InsertModalBody, _Component);

	  function InsertModalBody() {
	    _classCallCheck(this, InsertModalBody);

	    return _possibleConstructorReturn(this, (InsertModalBody.__proto__ || Object.getPrototypeOf(InsertModalBody)).apply(this, arguments));
	  }

	  _createClass(InsertModalBody, [{
	    key: 'getFieldValue',
	    value: function getFieldValue() {
	      var _this2 = this;

	      var newRow = {};
	      this.props.columns.forEach(function (column, i) {
	        var inputVal = void 0;
	        if (column.autoValue) {
	          // when you want same auto generate value and not allow edit, example ID field
	          var time = new Date().getTime();
	          inputVal = typeof column.autoValue === 'function' ? column.autoValue() : 'autovalue-' + time;
	        } else if (column.hiddenOnInsert || !column.field) {
	          inputVal = '';
	        } else {
	          var dom = _this2.refs[column.field + i];
	          inputVal = dom.value;

	          if (column.editable && column.editable.type === 'checkbox') {
	            var values = inputVal.split(':');
	            inputVal = dom.checked ? values[0] : values[1];
	          } else if (column.customInsertEditor) {
	            inputVal = inputVal || dom.getFieldValue();
	          }
	        }
	        newRow[column.field] = inputVal;
	      }, this);
	      return newRow;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          columns = _props.columns,
	          validateState = _props.validateState,
	          ignoreEditable = _props.ignoreEditable;

	      return _react2.default.createElement(
	        'div',
	        { className: 'modal-body' },
	        columns.map(function (column, i) {
	          var editable = column.editable,
	              format = column.format,
	              field = column.field,
	              name = column.name,
	              autoValue = column.autoValue,
	              hiddenOnInsert = column.hiddenOnInsert,
	              customInsertEditor = column.customInsertEditor;

	          var attr = {
	            ref: field + i,
	            placeholder: editable.placeholder ? editable.placeholder : name
	          };
	          var fieldElement = void 0;
	          var defaultValue = editable.defaultValue || undefined;
	          if (customInsertEditor) {
	            var getElement = customInsertEditor.getElement;

	            fieldElement = getElement(column, attr, 'form-control', ignoreEditable, defaultValue);
	          }

	          // fieldElement = false, means to use default editor when enable custom editor
	          // Becasuse some users want to have default editor based on some condition.
	          if (!customInsertEditor || fieldElement === false) {
	            fieldElement = (0, _Editor2.default)(editable, attr, format, '', defaultValue, ignoreEditable);
	          }

	          if (autoValue || hiddenOnInsert || !column.field) {
	            // when you want same auto generate value
	            // and not allow edit, for example ID field
	            return null;
	          }
	          var error = validateState[field] ? _react2.default.createElement(
	            'span',
	            { className: 'help-block bg-danger' },
	            validateState[field]
	          ) : null;
	          return _react2.default.createElement(
	            'div',
	            { className: 'form-group', key: field },
	            _react2.default.createElement(
	              'label',
	              null,
	              name
	            ),
	            fieldElement,
	            error
	          );
	        })
	      );
	    }
	  }]);

	  return InsertModalBody;
	}(_react.Component);

	InsertModalBody.propTypes = {
	  columns: _propTypes2.default.array,
	  validateState: _propTypes2.default.object,
	  ignoreEditable: _propTypes2.default.bool
	};

	InsertModalBody.defaultProps = {
	  validateState: {},
	  ignoreEditable: false
	};

	var _default = InsertModalBody;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(InsertModalBody, 'InsertModalBody', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModalBody.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertModalBody.js');
	}();

	;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var insertBtnDefaultClass = 'react-bs-table-add-btn';

	var InsertButton = function (_Component) {
	  _inherits(InsertButton, _Component);

	  function InsertButton() {
	    _classCallCheck(this, InsertButton);

	    return _possibleConstructorReturn(this, (InsertButton.__proto__ || Object.getPrototypeOf(InsertButton)).apply(this, arguments));
	  }

	  _createClass(InsertButton, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          btnContextual = _props.btnContextual,
	          className = _props.className,
	          onClick = _props.onClick,
	          btnGlyphicon = _props.btnGlyphicon,
	          btnText = _props.btnText,
	          children = _props.children,
	          rest = _objectWithoutProperties(_props, ['btnContextual', 'className', 'onClick', 'btnGlyphicon', 'btnText', 'children']);

	      var content = children || _react2.default.createElement(
	        'span',
	        null,
	        _react2.default.createElement('i', { className: 'fa glyphicon ' + btnGlyphicon }),
	        ' ',
	        btnText
	      );
	      return _react2.default.createElement(
	        'button',
	        _extends({ type: 'button',
	          className: 'btn ' + btnContextual + ' ' + insertBtnDefaultClass + ' ' + className,
	          onClick: onClick
	        }, rest),
	        content
	      );
	    }
	  }]);

	  return InsertButton;
	}(_react.Component);

	InsertButton.propTypes = {
	  btnText: _propTypes2.default.string,
	  btnContextual: _propTypes2.default.string,
	  className: _propTypes2.default.string,
	  onClick: _propTypes2.default.func,
	  btnGlyphicon: _propTypes2.default.string
	};
	InsertButton.defaultProps = {
	  btnText: _Const2.default.INSERT_BTN_TEXT,
	  btnContextual: 'btn-info',
	  className: '',
	  onClick: undefined,
	  btnGlyphicon: 'glyphicon-plus fa-plus'
	};

	var _default = InsertButton;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(insertBtnDefaultClass, 'insertBtnDefaultClass', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertButton.js');

	  __REACT_HOT_LOADER__.register(InsertButton, 'InsertButton', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertButton.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/InsertButton.js');
	}();

	;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var deleteBtnDefaultClass = 'react-bs-table-del-btn';

	var DeleteButton = function (_Component) {
	  _inherits(DeleteButton, _Component);

	  function DeleteButton() {
	    _classCallCheck(this, DeleteButton);

	    return _possibleConstructorReturn(this, (DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).apply(this, arguments));
	  }

	  _createClass(DeleteButton, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          btnContextual = _props.btnContextual,
	          className = _props.className,
	          onClick = _props.onClick,
	          btnGlyphicon = _props.btnGlyphicon,
	          btnText = _props.btnText,
	          children = _props.children,
	          rest = _objectWithoutProperties(_props, ['btnContextual', 'className', 'onClick', 'btnGlyphicon', 'btnText', 'children']);

	      var content = children || _react2.default.createElement(
	        'span',
	        null,
	        _react2.default.createElement('i', { className: 'fa glyphicon ' + btnGlyphicon }),
	        ' ',
	        btnText
	      );
	      return _react2.default.createElement(
	        'button',
	        _extends({ type: 'button',
	          className: 'btn ' + btnContextual + ' ' + deleteBtnDefaultClass + ' ' + className,
	          onClick: onClick
	        }, rest),
	        content
	      );
	    }
	  }]);

	  return DeleteButton;
	}(_react.Component);

	DeleteButton.propTypes = {
	  btnText: _propTypes2.default.string,
	  btnContextual: _propTypes2.default.string,
	  className: _propTypes2.default.string,
	  onClick: _propTypes2.default.func,
	  btnGlyphicon: _propTypes2.default.string
	};
	DeleteButton.defaultProps = {
	  btnText: _Const2.default.DELETE_BTN_TEXT,
	  btnContextual: 'btn-warning',
	  className: '',
	  onClick: undefined,
	  btnGlyphicon: 'glyphicon-trash fa-trash'
	};

	var _default = DeleteButton;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(deleteBtnDefaultClass, 'deleteBtnDefaultClass', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/DeleteButton.js');

	  __REACT_HOT_LOADER__.register(DeleteButton, 'DeleteButton', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/DeleteButton.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/DeleteButton.js');
	}();

	;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var exportCsvBtnDefaultClass = 'react-bs-table-csv-btn';

	var ExportCSVButton = function (_Component) {
	  _inherits(ExportCSVButton, _Component);

	  function ExportCSVButton() {
	    _classCallCheck(this, ExportCSVButton);

	    return _possibleConstructorReturn(this, (ExportCSVButton.__proto__ || Object.getPrototypeOf(ExportCSVButton)).apply(this, arguments));
	  }

	  _createClass(ExportCSVButton, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          btnContextual = _props.btnContextual,
	          className = _props.className,
	          onClick = _props.onClick,
	          btnGlyphicon = _props.btnGlyphicon,
	          btnText = _props.btnText,
	          children = _props.children,
	          rest = _objectWithoutProperties(_props, ['btnContextual', 'className', 'onClick', 'btnGlyphicon', 'btnText', 'children']);

	      var content = children || _react2.default.createElement(
	        'span',
	        null,
	        _react2.default.createElement('i', { className: 'fa glyphicon ' + btnGlyphicon }),
	        ' ',
	        btnText
	      );
	      return _react2.default.createElement(
	        'button',
	        _extends({ type: 'button',
	          className: 'btn ' + btnContextual + ' ' + exportCsvBtnDefaultClass + ' ' + className + ' hidden-print',
	          onClick: onClick
	        }, rest),
	        content
	      );
	    }
	  }]);

	  return ExportCSVButton;
	}(_react.Component);

	ExportCSVButton.propTypes = {
	  btnText: _propTypes2.default.string,
	  btnContextual: _propTypes2.default.string,
	  className: _propTypes2.default.string,
	  onClick: _propTypes2.default.func,
	  btnGlyphicon: _propTypes2.default.string
	};
	ExportCSVButton.defaultProps = {
	  btnText: _Const2.default.EXPORT_CSV_TEXT,
	  btnContextual: 'btn-success',
	  className: '',
	  onClick: undefined,
	  btnGlyphicon: 'glyphicon-export fa-download'
	};

	var _default = ExportCSVButton;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(exportCsvBtnDefaultClass, 'exportCsvBtnDefaultClass', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ExportCSVButton.js');

	  __REACT_HOT_LOADER__.register(ExportCSVButton, 'ExportCSVButton', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ExportCSVButton.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ExportCSVButton.js');
	}();

	;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var showSelectedOnlyBtnDefaultClass = 'react-bs-table-show-sel-only-btn';

	var ShowSelectedOnlyButton = function (_Component) {
	  _inherits(ShowSelectedOnlyButton, _Component);

	  function ShowSelectedOnlyButton() {
	    _classCallCheck(this, ShowSelectedOnlyButton);

	    return _possibleConstructorReturn(this, (ShowSelectedOnlyButton.__proto__ || Object.getPrototypeOf(ShowSelectedOnlyButton)).apply(this, arguments));
	  }

	  _createClass(ShowSelectedOnlyButton, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          btnContextual = _props.btnContextual,
	          className = _props.className,
	          onClick = _props.onClick,
	          toggle = _props.toggle,
	          showAllText = _props.showAllText,
	          showOnlySelectText = _props.showOnlySelectText,
	          children = _props.children,
	          rest = _objectWithoutProperties(_props, ['btnContextual', 'className', 'onClick', 'toggle', 'showAllText', 'showOnlySelectText', 'children']);

	      var content = children || _react2.default.createElement(
	        'span',
	        null,
	        toggle ? showAllText : showOnlySelectText
	      );
	      return _react2.default.createElement(
	        'button',
	        _extends({ type: 'button',
	          'aria-pressed': 'false',
	          'data-toggle': 'button',
	          className: 'btn ' + btnContextual + ' ' + showSelectedOnlyBtnDefaultClass + ' ' + className,
	          onClick: onClick
	        }, rest),
	        content
	      );
	    }
	  }]);

	  return ShowSelectedOnlyButton;
	}(_react.Component);

	ShowSelectedOnlyButton.propTypes = {
	  showAllText: _propTypes2.default.string,
	  showOnlySelectText: _propTypes2.default.string,
	  toggle: _propTypes2.default.bool,
	  btnContextual: _propTypes2.default.string,
	  className: _propTypes2.default.string,
	  onClick: _propTypes2.default.func
	};
	ShowSelectedOnlyButton.defaultProps = {
	  showAllText: _Const2.default.SHOW_ALL,
	  showOnlySelectText: _Const2.default.SHOW_ONLY_SELECT,
	  toggle: false,
	  btnContextual: 'btn-primary',
	  className: '',
	  onClick: undefined
	};

	var _default = ShowSelectedOnlyButton;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(showSelectedOnlyBtnDefaultClass, 'showSelectedOnlyBtnDefaultClass', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ShowSelectedOnlyButton.js');

	  __REACT_HOT_LOADER__.register(ShowSelectedOnlyButton, 'ShowSelectedOnlyButton', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ShowSelectedOnlyButton.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ShowSelectedOnlyButton.js');
	}();

	;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchField = function (_Component) {
	  _inherits(SearchField, _Component);

	  function SearchField() {
	    _classCallCheck(this, SearchField);

	    return _possibleConstructorReturn(this, (SearchField.__proto__ || Object.getPrototypeOf(SearchField)).apply(this, arguments));
	  }

	  _createClass(SearchField, [{
	    key: 'getValue',
	    value: function getValue() {
	      return _reactDom2.default.findDOMNode(this).value;
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value) {
	      _reactDom2.default.findDOMNode(this).value = value;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          defaultValue = _props.defaultValue,
	          placeholder = _props.placeholder,
	          onKeyUp = _props.onKeyUp,
	          rest = _objectWithoutProperties(_props, ['className', 'defaultValue', 'placeholder', 'onKeyUp']);

	      return _react2.default.createElement('input', _extends({
	        className: 'form-control ' + className,
	        type: 'text',
	        defaultValue: defaultValue,
	        placeholder: placeholder || SearchField.defaultProps.placeholder,
	        onKeyUp: onKeyUp,
	        style: { zIndex: 0 }
	      }, rest));
	    }
	  }]);

	  return SearchField;
	}(_react.Component);

	SearchField.propTypes = {
	  className: _propTypes2.default.string,
	  defaultValue: _propTypes2.default.string,
	  placeholder: _propTypes2.default.string,
	  onKeyUp: _propTypes2.default.func
	};
	SearchField.defaultProps = {
	  className: '',
	  defaultValue: '',
	  placeholder: 'Search',
	  onKeyUp: undefined
	};

	var _default = SearchField;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(SearchField, 'SearchField', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/SearchField.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/SearchField.js');
	}();

	;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var clearBtnDefaultClass = 'react-bs-table-search-clear-btn';

	var ClearSearchButton = function (_Component) {
	  _inherits(ClearSearchButton, _Component);

	  function ClearSearchButton() {
	    _classCallCheck(this, ClearSearchButton);

	    return _possibleConstructorReturn(this, (ClearSearchButton.__proto__ || Object.getPrototypeOf(ClearSearchButton)).apply(this, arguments));
	  }

	  _createClass(ClearSearchButton, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          btnContextual = _props.btnContextual,
	          className = _props.className,
	          onClick = _props.onClick,
	          btnText = _props.btnText,
	          children = _props.children,
	          rest = _objectWithoutProperties(_props, ['btnContextual', 'className', 'onClick', 'btnText', 'children']);

	      var content = children || _react2.default.createElement(
	        'span',
	        null,
	        btnText
	      );
	      return _react2.default.createElement(
	        'button',
	        _extends({
	          className: 'btn ' + btnContextual + ' ' + className + ' ' + clearBtnDefaultClass,
	          type: 'button',
	          onClick: onClick
	        }, rest),
	        content
	      );
	    }
	  }]);

	  return ClearSearchButton;
	}(_react.Component);

	ClearSearchButton.propTypes = {
	  btnContextual: _propTypes2.default.string,
	  className: _propTypes2.default.string,
	  btnText: _propTypes2.default.string,
	  onClick: _propTypes2.default.func
	};
	ClearSearchButton.defaultProps = {
	  btnContextual: 'btn-default btn-secondary',
	  className: '',
	  btnText: 'Clear',
	  onClick: undefined
	};

	var _default = ClearSearchButton;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(clearBtnDefaultClass, 'clearBtnDefaultClass', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ClearSearchButton.js');

	  __REACT_HOT_LOADER__.register(ClearSearchButton, 'ClearSearchButton', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ClearSearchButton.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ClearSearchButton.js');
	}();

	;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _classnames = __webpack_require__(13);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TableFilter = function (_Component) {
	  _inherits(TableFilter, _Component);

	  function TableFilter(props) {
	    _classCallCheck(this, TableFilter);

	    var _this = _possibleConstructorReturn(this, (TableFilter.__proto__ || Object.getPrototypeOf(TableFilter)).call(this, props));

	    _this.handleKeyUp = function () {
	      return _this.__handleKeyUp__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    _this.filterObj = {};
	    return _this;
	  }

	  _createClass(TableFilter, [{
	    key: '__handleKeyUp__REACT_HOT_LOADER__',
	    value: function __handleKeyUp__REACT_HOT_LOADER__() {
	      return this.__handleKeyUp__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: '__handleKeyUp__REACT_HOT_LOADER__',
	    value: function __handleKeyUp__REACT_HOT_LOADER__(e) {
	      var _e$currentTarget = e.currentTarget,
	          value = _e$currentTarget.value,
	          name = _e$currentTarget.name;

	      if (value.trim() === '') {
	        delete this.filterObj[name];
	      } else {
	        this.filterObj[name] = value;
	      }
	      this.props.onFilter(this.filterObj);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          striped = _props.striped,
	          condensed = _props.condensed,
	          rowSelectType = _props.rowSelectType,
	          columns = _props.columns;

	      var tableClasses = (0, _classnames2.default)('table', {
	        'table-striped': striped,
	        'table-condensed': condensed
	      });
	      var selectRowHeader = null;

	      if (rowSelectType === _Const2.default.ROW_SELECT_SINGLE || rowSelectType === _Const2.default.ROW_SELECT_MULTI) {
	        var style = {
	          width: 35,
	          paddingLeft: 0,
	          paddingRight: 0
	        };
	        selectRowHeader = _react2.default.createElement(
	          'th',
	          { style: style, key: -1 },
	          'Filter'
	        );
	      }

	      var filterField = columns.map(function (column) {
	        var hidden = column.hidden,
	            width = column.width,
	            name = column.name;

	        var thStyle = {
	          display: hidden ? 'none' : null,
	          width: width
	        };
	        return _react2.default.createElement(
	          'th',
	          { key: name, style: thStyle },
	          _react2.default.createElement(
	            'div',
	            { className: 'th-inner table-header-column' },
	            _react2.default.createElement('input', { size: '10', type: 'text',
	              placeholder: name, name: name, onKeyUp: this.handleKeyUp })
	          )
	        );
	      }, this);

	      return _react2.default.createElement(
	        'table',
	        { className: tableClasses, style: { marginTop: 5 } },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(
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
	}(_react.Component);

	TableFilter.propTypes = {
	  columns: _propTypes2.default.array,
	  rowSelectType: _propTypes2.default.string,
	  onFilter: _propTypes2.default.func
	};
	var _default = TableFilter;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableFilter, 'TableFilter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableFilter.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/TableFilter.js');
	}();

	;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TableDataStore = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-nested-ternary: 0 */
	/* eslint guard-for-in: 0 */
	/* eslint no-console: 0 */
	/* eslint eqeqeq: 0 */
	/* eslint one-var: 0 */


	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TableDataStore = function () {
	  function TableDataStore(data) {
	    var _this = this;

	    _classCallCheck(this, TableDataStore);

	    this.isValidKey = function () {
	      return _this.__isValidKey__REACT_HOT_LOADER__.apply(_this, arguments);
	    };

	    this.data = data;
	    this.filteredData = null;
	    this.isOnFilter = false;
	    this.filterObj = null;
	    this.searchText = null;
	    this.sortList = [];
	    this.pageObj = {};
	    this.selected = [];
	    this.showOnlySelected = false;
	  }

	  _createClass(TableDataStore, [{
	    key: '__isValidKey__REACT_HOT_LOADER__',
	    value: function __isValidKey__REACT_HOT_LOADER__() {
	      return this.__isValidKey__REACT_HOT_LOADER__.apply(this, arguments);
	    }
	  }, {
	    key: 'setProps',
	    value: function setProps(props) {
	      this.keyField = props.keyField;
	      this.enablePagination = props.isPagination;
	      this.colInfos = props.colInfos;
	      this.remote = props.remote;
	      this.multiColumnSearch = props.multiColumnSearch;
	      // default behaviour if strictSearch prop is not provided: !multiColumnSearch
	      this.strictSearch = typeof props.strictSearch === 'undefined' ? !props.multiColumnSearch : props.strictSearch;
	      this.multiColumnSort = props.multiColumnSort;
	    }
	  }, {
	    key: 'clean',
	    value: function clean() {
	      this.filteredData = null;
	      this.isOnFilter = false;
	      this.filterObj = null;
	      this.searchText = null;
	      this.sortList = [];
	      this.pageObj = {};
	      this.selected = [];
	    }
	  }, {
	    key: 'isSearching',
	    value: function isSearching() {
	      return this.searchText !== null;
	    }
	  }, {
	    key: 'isFiltering',
	    value: function isFiltering() {
	      return this.filterObj !== null;
	    }
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      this.data = data;
	      if (this.remote) {
	        return;
	      }

	      this._refresh(true);
	    }
	  }, {
	    key: 'getColInfos',
	    value: function getColInfos() {
	      return this.colInfos;
	    }
	  }, {
	    key: 'getSortInfo',
	    value: function getSortInfo() {
	      return this.sortList;
	    }
	  }, {
	    key: 'setSortInfo',
	    value: function setSortInfo(order, sortField) {
	      if ((typeof order === 'undefined' ? 'undefined' : _typeof(order)) !== (typeof sortField === 'undefined' ? 'undefined' : _typeof(sortField))) {
	        throw new Error('The type of sort field and order should be both with String or Array');
	      }
	      if (Array.isArray(order) && Array.isArray(sortField)) {
	        if (order.length !== sortField.length) {
	          throw new Error('The length of sort fields and orders should be equivalent');
	        }
	        order = order.slice().reverse();
	        this.sortList = sortField.slice().reverse().map(function (field, i) {
	          return {
	            order: order[i],
	            sortField: field
	          };
	        });
	        this.sortList = this.sortList.slice(0, this.multiColumnSort);
	      } else {
	        var sortObj = {
	          order: order,
	          sortField: sortField
	        };

	        if (this.multiColumnSort > 1) {
	          var i = this.sortList.length - 1;
	          var sortFieldInHistory = false;

	          for (; i >= 0; i--) {
	            if (this.sortList[i].sortField === sortField) {
	              sortFieldInHistory = true;
	              break;
	            }
	          }

	          if (sortFieldInHistory) {
	            if (i > 0) {
	              this.sortList = this.sortList.slice(0, i);
	            } else {
	              this.sortList = this.sortList.slice(1);
	            }
	          }

	          this.sortList.unshift(sortObj);
	          this.sortList = this.sortList.slice(0, this.multiColumnSort);
	        } else {
	          this.sortList = [sortObj];
	        }
	      }
	    }
	  }, {
	    key: 'cleanSortInfo',
	    value: function cleanSortInfo() {
	      this.sortList = [];
	    }
	  }, {
	    key: 'setSelectedRowKey',
	    value: function setSelectedRowKey(selectedRowKeys) {
	      this.selected = selectedRowKeys;
	    }
	  }, {
	    key: 'getRowByKey',
	    value: function getRowByKey(keys) {
	      var _this2 = this;

	      // Bad Performance #1164
	      // return keys.map(key => {
	      //   const result = this.data.filter(d => d[this.keyField] === key);
	      //   if (result.length !== 0) return result[0];
	      // });
	      var result = [];
	      if (!keys || keys.length === 0) {
	        return result;
	      }

	      var _loop = function _loop(i) {
	        var d = _this2.data[i];
	        if (keys.indexOf(d[_this2.keyField]) > -1) {
	          keys = keys.filter(function (k) {
	            return k !== d[_this2.keyField];
	          });
	          result.push(d);
	        }
	      };

	      for (var i = 0; i < this.data.length; i++) {
	        _loop(i);
	      }
	      return result;
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
	    key: '_refresh',
	    value: function _refresh(skipSorting) {
	      if (this.isOnFilter) {
	        if (this.filterObj !== null) this.filter(this.filterObj);
	        if (this.searchText !== null) this.search(this.searchText);
	      }
	      if (!skipSorting && this.sortList.length > 0) {
	        this.sort();
	      }
	    }
	  }, {
	    key: 'ignoreNonSelected',
	    value: function ignoreNonSelected() {
	      var _this3 = this;

	      this.showOnlySelected = !this.showOnlySelected;
	      if (this.showOnlySelected) {
	        this.isOnFilter = true;
	        this.filteredData = this.data.filter(function (row) {
	          var result = _this3.selected.find(function (x) {
	            return row[_this3.keyField] === x;
	          });
	          return typeof result !== 'undefined' ? true : false;
	        });
	      } else {
	        this.isOnFilter = false;
	      }
	    }
	  }, {
	    key: 'sort',
	    value: function sort() {
	      var currentDisplayData = this.getCurrentDisplayData();

	      currentDisplayData = this._sort(currentDisplayData);

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
	      var rowKeyCache = void 0;
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
	        throw new Error(this.keyField + ' can\'t be empty value.');
	      }
	      var currentDisplayData = this.getCurrentDisplayData();
	      currentDisplayData.forEach(function (row) {
	        if (row[this.keyField].toString() === newObj[this.keyField].toString()) {
	          throw new Error(this.keyField + ' ' + newObj[this.keyField] + ' already exists');
	        }
	      }, this);
	      currentDisplayData.unshift(newObj);
	      if (this.isOnFilter) {
	        this.data.unshift(newObj);
	      }
	      this._refresh(false);
	    }
	  }, {
	    key: 'add',
	    value: function add(newObj) {
	      var e = this.isValidKey(newObj[this.keyField]);
	      if (e) throw new Error(e);

	      var currentDisplayData = this.getCurrentDisplayData();
	      currentDisplayData.push(newObj);
	      if (this.isOnFilter) {
	        this.data.push(newObj);
	      }
	      this._refresh(false);
	    }
	  }, {
	    key: '__isValidKey__REACT_HOT_LOADER__',
	    value: function __isValidKey__REACT_HOT_LOADER__(key) {
	      var _this4 = this;

	      if (key === null || key === undefined || key.toString() === '') {
	        return this.keyField + ' can\'t be empty value.';
	      }
	      var currentDisplayData = this.getCurrentDisplayData();
	      var exist = currentDisplayData.find(function (row) {
	        return row[_this4.keyField].toString() === key.toString();
	      });
	      if (exist) return this.keyField + ' ' + key + ' already exists';
	    }
	  }, {
	    key: 'remove',
	    value: function remove(rowKey) {
	      var _this5 = this;

	      var currentDisplayData = this.getCurrentDisplayData();
	      var result = currentDisplayData.filter(function (row) {
	        return rowKey.indexOf(row[_this5.keyField]) === -1;
	      });

	      if (this.isOnFilter) {
	        this.data = this.data.filter(function (row) {
	          return rowKey.indexOf(row[_this5.keyField]) === -1;
	        });
	        this.filteredData = result;
	      } else {
	        this.data = result;
	      }
	    }
	  }, {
	    key: 'filter',
	    value: function filter(filterObj) {
	      if (Object.keys(filterObj).length === 0) {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.filterObj = null;
	        if (this.searchText) this._search(this.data);
	      } else {
	        var source = this.data;
	        this.filterObj = filterObj;
	        if (this.searchText) {
	          this._search(source);
	          source = this.filteredData;
	        }
	        this._filter(source);
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
	    value: function filterDate(targetVal, filterVal, comparator) {
	      if (!targetVal) return false;

	      var filterDate = filterVal.getDate();
	      var filterMonth = filterVal.getMonth();
	      var filterYear = filterVal.getFullYear();

	      if ((typeof targetVal === 'undefined' ? 'undefined' : _typeof(targetVal)) !== 'object') {
	        targetVal = new Date(targetVal);
	      }

	      var targetDate = targetVal.getDate();
	      var targetMonth = targetVal.getMonth();
	      var targetYear = targetVal.getFullYear();

	      var valid = true;
	      switch (comparator) {
	        case '=':
	          {
	            if (filterDate !== targetDate || filterMonth !== targetMonth || filterYear !== targetYear) {
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
	            if (targetYear < filterYear) {
	              valid = false;
	            } else if (targetYear === filterYear && targetMonth < filterMonth) {
	              valid = false;
	            } else if (targetYear === filterYear && targetMonth === filterMonth && targetDate < filterDate) {
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
	            if (targetYear > filterYear) {
	              valid = false;
	            } else if (targetYear === filterYear && targetMonth > filterMonth) {
	              valid = false;
	            } else if (targetYear === filterYear && targetMonth === filterMonth && targetDate > filterDate) {
	              valid = false;
	            }
	            break;
	          }
	        case '!=':
	          {
	            if (filterDate === targetDate && filterMonth === targetMonth && filterYear === targetYear) {
	              valid = false;
	            }
	            break;
	          }
	        default:
	          {
	            console.error('Date comparator provided is not supported');
	            break;
	          }
	      }
	      return valid;
	    }
	  }, {
	    key: 'filterRegex',
	    value: function filterRegex(targetVal, filterVal) {
	      try {
	        return new RegExp(filterVal, 'i').test(targetVal);
	      } catch (e) {
	        return true;
	      }
	    }
	  }, {
	    key: 'filterCustom',
	    value: function filterCustom(targetVal, filterVal, callbackInfo, cond) {
	      if (callbackInfo !== null && (typeof callbackInfo === 'undefined' ? 'undefined' : _typeof(callbackInfo)) === 'object') {
	        return callbackInfo.callback(targetVal, callbackInfo.callbackParameters);
	      }

	      return this.filterText(targetVal, filterVal, cond);
	    }
	  }, {
	    key: 'filterText',
	    value: function filterText() {
	      var targetVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var filterVal = arguments[1];
	      var cond = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Const2.default.FILTER_COND_LIKE;

	      targetVal = targetVal === null ? '' : targetVal.toString();
	      filterVal = filterVal.toString();
	      if (cond === _Const2.default.FILTER_COND_EQ) {
	        return targetVal === filterVal;
	      } else {
	        targetVal = targetVal.toLowerCase();
	        filterVal = filterVal.toLowerCase();
	        return !(targetVal.indexOf(filterVal) === -1);
	      }
	    }

	    /**
	     * Filter if targetVal is contained in filterVal.
	     */

	  }, {
	    key: 'filterArray',
	    value: function filterArray(targetVal, filterVal) {
	      // case insensitive
	      return filterVal.indexOf(targetVal) > -1;
	    }

	    /* General search function
	     * It will search for the text if the input includes that text;
	     */

	  }, {
	    key: 'search',
	    value: function search(searchText) {
	      if (searchText.trim() === '') {
	        this.filteredData = null;
	        this.isOnFilter = false;
	        this.searchText = null;
	        if (this.filterObj) this._filter(this.data);
	      } else {
	        var source = this.data;
	        this.searchText = searchText;
	        if (this.filterObj) {
	          this._filter(source);
	          source = this.filteredData;
	        }
	        this._search(source);
	      }
	    }
	  }, {
	    key: '_filter',
	    value: function _filter(source) {
	      var _this6 = this;

	      var filterObj = this.filterObj;
	      this.filteredData = source.filter(function (row, r) {
	        var valid = true;
	        var filterVal = void 0;
	        for (var key in filterObj) {
	          var targetVal = row[key];
	          if (targetVal === null || targetVal === undefined) {
	            targetVal = '';
	          }

	          switch (filterObj[key].type) {
	            case _Const2.default.FILTER_TYPE.NUMBER:
	              {
	                filterVal = filterObj[key].value.number;
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.CUSTOM:
	              {
	                filterVal = _typeof(filterObj[key].value) === 'object' ? undefined : typeof filterObj[key].value === 'string' ? filterObj[key].value.toLowerCase() : filterObj[key].value;
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.DATE:
	              {
	                filterVal = filterObj[key].value.date;
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.REGEX:
	              {
	                filterVal = filterObj[key].value;
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.ARRAY:
	              {
	                filterVal = filterObj[key].value;
	                if (!Array.isArray(filterVal)) {
	                  throw new Error('Value must be an Array');
	                }
	                break;
	              }
	            default:
	              {
	                filterVal = filterObj[key].value;
	                if (filterVal === undefined) {
	                  // Support old filter
	                  filterVal = filterObj[key];
	                }
	                break;
	              }
	          }
	          var format = void 0,
	              filterFormatted = void 0,
	              formatExtraData = void 0,
	              filterValue = void 0;
	          if (_this6.colInfos[key]) {
	            format = _this6.colInfos[key].format;
	            filterFormatted = _this6.colInfos[key].filterFormatted;
	            formatExtraData = _this6.colInfos[key].formatExtraData;
	            filterValue = _this6.colInfos[key].filterValue;
	            if (filterFormatted && format) {
	              targetVal = format(row[key], row, formatExtraData, r);
	            } else if (filterValue) {
	              targetVal = filterValue(row[key], row);
	            }
	          }

	          switch (filterObj[key].type) {
	            case _Const2.default.FILTER_TYPE.NUMBER:
	              {
	                valid = _this6.filterNumber(targetVal, filterVal, filterObj[key].value.comparator);
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.DATE:
	              {
	                valid = _this6.filterDate(targetVal, filterVal, filterObj[key].value.comparator);
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.REGEX:
	              {
	                valid = _this6.filterRegex(targetVal, filterVal);
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.CUSTOM:
	              {
	                var cond = filterObj[key].props ? filterObj[key].props.cond : _Const2.default.FILTER_COND_LIKE;
	                valid = _this6.filterCustom(targetVal, filterVal, filterObj[key].value, cond);
	                break;
	              }
	            case _Const2.default.FILTER_TYPE.ARRAY:
	              {
	                valid = _this6.filterArray(targetVal, filterVal);
	                break;
	              }
	            default:
	              {
	                if (filterObj[key].type === _Const2.default.FILTER_TYPE.SELECT && filterFormatted && filterFormatted && format) {
	                  filterVal = format(filterVal, row, formatExtraData, r);
	                }
	                var _cond = filterObj[key].props ? filterObj[key].props.cond : _Const2.default.FILTER_COND_LIKE;
	                valid = _this6.filterText(targetVal, filterVal, _cond);
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

	    /*
	     * Four different sort modes, all case insensitive:
	     * (1) strictSearch && !multiColumnSearch
	     *     search text must be contained as provided in a single column
	     * (2) strictSearch && multiColumnSearch
	     *     conjunction (AND combination) of whitespace separated terms over multiple columns
	     * (3) !strictSearch && !multiColumnSearch
	     *     conjunction (AND combination) of whitespace separated terms in a single column
	     * (4) !strictSearch && multiColumnSearch
	     *     any of the whitespace separated terms must be contained in any column
	     */

	  }, {
	    key: '_search',
	    value: function _search(source) {
	      var _this7 = this;

	      var searchTextArray = void 0;
	      if (this.multiColumnSearch || !this.strictSearch) {
	        // ignore leading and trailing whitespaces
	        searchTextArray = this.searchText.trim().toLowerCase().split(/\s+/);
	      } else {
	        searchTextArray = [this.searchText.toLowerCase()];
	      }
	      var searchTermCount = searchTextArray.length;
	      var multipleTerms = searchTermCount > 1;
	      var nonStrictMultiCol = multipleTerms && !this.strictSearch && this.multiColumnSearch;
	      var nonStrictSingleCol = multipleTerms && !this.strictSearch && !this.multiColumnSearch;
	      this.filteredData = source.filter(function (row, r) {
	        var keys = Object.keys(row);
	        // only clone array if necessary
	        var searchTerms = multipleTerms ? searchTextArray.slice() : searchTextArray;
	        // for loops are ugly, but performance matters here.
	        // And you cant break from a forEach.
	        // http://jsperf.com/for-vs-foreach/66
	        for (var i = 0, keysLength = keys.length; i < keysLength; i++) {
	          var key = keys[i];
	          var colInfo = _this7.colInfos[key];
	          if (colInfo && colInfo.searchable) {
	            var format = colInfo.format,
	                filterFormatted = colInfo.filterFormatted,
	                filterValue = colInfo.filterValue,
	                formatExtraData = colInfo.formatExtraData;

	            var targetVal = void 0;
	            if (filterFormatted && format) {
	              targetVal = format(row[key], row, formatExtraData, r);
	            } else if (filterValue) {
	              targetVal = filterValue(row[key], row);
	            } else {
	              targetVal = row[key];
	            }
	            if (targetVal !== null && typeof targetVal !== 'undefined') {
	              targetVal = targetVal.toString().toLowerCase();
	              if (nonStrictSingleCol && searchTermCount > searchTerms.length) {
	                // reset search terms for single column search
	                searchTerms = searchTextArray.slice();
	              }
	              for (var j = searchTerms.length - 1; j > -1; j--) {
	                if (targetVal.indexOf(searchTerms[j]) !== -1) {
	                  if (nonStrictMultiCol || searchTerms.length === 1) {
	                    // match found: the last or only one
	                    return true;
	                  }
	                  // match found: but there are more search terms to check for
	                  searchTerms.splice(j, 1);
	                } else if (!_this7.multiColumnSearch) {
	                  // one of the search terms was not found in this column
	                  break;
	                }
	              }
	            }
	          }
	        }
	        return false;
	      });
	      this.isOnFilter = true;
	    }
	  }, {
	    key: '_sort',
	    value: function _sort(arr) {
	      var _this8 = this;

	      if (this.sortList.length === 0 || typeof this.sortList[0] === 'undefined') {
	        return arr;
	      }

	      arr.sort(function (a, b) {
	        var result = 0;

	        for (var i = 0; i < _this8.sortList.length; i++) {
	          var sortDetails = _this8.sortList[i];
	          var isDesc = sortDetails.order.toLowerCase() === _Const2.default.SORT_DESC;

	          var _colInfos$sortDetails = _this8.colInfos[sortDetails.sortField],
	              sortFunc = _colInfos$sortDetails.sortFunc,
	              sortFuncExtraData = _colInfos$sortDetails.sortFuncExtraData;


	          if (sortFunc) {
	            result = sortFunc(a, b, sortDetails.order, sortDetails.sortField, sortFuncExtraData);
	          } else {
	            var valueA = a[sortDetails.sortField] == null ? '' : a[sortDetails.sortField];
	            var valueB = b[sortDetails.sortField] == null ? '' : b[sortDetails.sortField];

	            if (isDesc) {
	              if (typeof valueB === 'string') {
	                result = valueB.localeCompare(valueA);
	              } else {
	                result = valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
	              }
	            } else {
	              if (typeof valueA === 'string') {
	                result = valueA.localeCompare(valueB);
	              } else {
	                result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
	              }
	            }
	          }

	          if (result !== 0) {
	            return result;
	          }
	        }

	        return result;
	      });

	      return arr;
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

	      var remote = typeof this.remote === 'function' ? this.remote(_Const2.default.REMOTE)[_Const2.default.REMOTE_PAGE] : this.remote;

	      if (remote || !this.enablePagination) {
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
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.data.length === 0 || this.data === null || this.data === undefined;
	    }
	  }, {
	    key: 'getAllRowkey',
	    value: function getAllRowkey() {
	      var _this9 = this;

	      return this.data.map(function (row) {
	        return row[_this9.keyField];
	      });
	    }
	  }]);

	  return TableDataStore;
	}();

	exports.TableDataStore = TableDataStore;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(TableDataStore, 'TableDataStore', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/store/TableDataStore.js');
	}();

	;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(24);

	var _util2 = _interopRequireDefault(_util);

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint block-scoped-var: 0 */
	/* eslint vars-on-top: 0 */
	/* eslint no-var: 0 */
	/* eslint no-unused-vars: 0 */
	if (_util2.default.canUseDOM()) {
	  var filesaver = __webpack_require__(70);
	  var saveAs = filesaver.saveAs;
	}

	function toString(data, keys, separator, excludeCSVHeader) {
	  var dataString = '';
	  if (data.length === 0) return dataString;

	  var headCells = [];
	  var rowCount = 0;
	  keys.forEach(function (key) {
	    if (key.row > rowCount) {
	      rowCount = key.row;
	    }
	    // rowCount += (key.rowSpan + key.colSpan - 1);
	    for (var index = 0; index < key.colSpan; index++) {
	      headCells.push(key);
	    }
	  });

	  var firstRow = excludeCSVHeader ? 1 : 0;

	  var _loop = function _loop(i) {
	    dataString += headCells.map(function (x) {
	      if (x.row + (x.rowSpan - 1) === i) {
	        return '"' + x.header + '"';
	      }
	      if (x.row === i && x.rowSpan > 1) {
	        return '';
	      }
	    }).filter(function (key) {
	      return typeof key !== 'undefined';
	    }).join(separator) + '\n';
	  };

	  for (var i = firstRow; i <= rowCount; i++) {
	    _loop(i);
	  }

	  keys = keys.filter(function (key) {
	    return key.field !== undefined;
	  });

	  data.map(function (row) {
	    keys.map(function (col, i) {
	      var field = col.field,
	          format = col.format,
	          extraData = col.extraData,
	          type = col.type;

	      var value = typeof format !== 'undefined' ? format(row[field], row, extraData) : row[field];
	      value = type === _Const2.default.CSV_NUMBER_TYPE ? Number(value) : '"' + value + '"';
	      var cell = typeof value !== 'undefined' ? value : '';
	      dataString += cell;
	      if (i + 1 < keys.length) dataString += separator;
	    });

	    dataString += '\n';
	  });

	  return dataString;
	}

	var exportCSV = function exportCSV(data, keys, filename, separator, noAutoBOM, excludeCSVHeader) {
	  var dataString = toString(data, keys, separator, excludeCSVHeader);
	  if (typeof window !== 'undefined') {
	    noAutoBOM = noAutoBOM === undefined ? true : noAutoBOM;
	    saveAs(new Blob(['\uFEFF', dataString], { type: 'text/plain;charset=utf-8' }), filename, noAutoBOM);
	  }
	};

	var _default = exportCSV;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(saveAs, 'saveAs', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/csv_export_util.js');

	  __REACT_HOT_LOADER__.register(toString, 'toString', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/csv_export_util.js');

	  __REACT_HOT_LOADER__.register(exportCSV, 'exportCSV', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/csv_export_util.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/csv_export_util.js');
	}();

	;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	/* FileSaver.js
	 * A saveAs() FileSaver implementation.
	 * 1.3.2
	 * 2016-06-16 18:25:19
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: MIT
	 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
	 */

	/*global self */
	/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

	/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

	var saveAs = saveAs || function (view) {
		"use strict";
		// IE <10 is explicitly unsupported

		if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
			return;
		}
		var doc = view.document
		// only get URL when necessary in case Blob.js hasn't overridden it yet
		,
		    get_URL = function get_URL() {
			return view.URL || view.webkitURL || view;
		},
		    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
		    can_use_save_link = "download" in save_link,
		    click = function click(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		},
		    is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
		    is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
		    throw_outside = function throw_outside(ex) {
			(view.setImmediate || view.setTimeout)(function () {
				throw ex;
			}, 0);
		},
		    force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		,
		    arbitrary_revoke_timeout = 1000 * 40 // in ms
		,
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
			setTimeout(revoker, arbitrary_revoke_timeout);
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
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
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
			    force = type === force_saveable_type,
			    object_url,
			    dispatch_all = function dispatch_all() {
				dispatch(filesaver, "writestart progress write writeend".split(" "));
			}
			// on any filesys errors revert to saving with object URLs
			,
			    fs_error = function fs_error() {
				if ((is_chrome_ios || force && is_safari) && view.FileReader) {
					// Safari doesn't allow downloading of blob urls
					var reader = new FileReader();
					reader.onloadend = function () {
						var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
						var popup = view.open(url, '_blank');
						if (!popup) view.location.href = url;
						url = undefined; // release reference before dispatching
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
					};
					reader.readAsDataURL(blob);
					filesaver.readyState = filesaver.INIT;
					return;
				}
				// don't create more object URLs than needed
				if (!object_url) {
					object_url = get_URL().createObjectURL(blob);
				}
				if (force) {
					view.location.href = object_url;
				} else {
					var opened = view.open(object_url, "_blank");
					if (!opened) {
						// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
						view.location.href = object_url;
					}
				}
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
			};
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function () {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		},
		    FS_proto = FileSaver.prototype,
		    saveAs = function saveAs(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		};
		// IE 10+ (native saveAs)
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			return function (blob, name, no_auto_bom) {
				name = name || blob.name || "download";

				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				return navigator.msSaveOrOpenBlob(blob, name);
			};
		}

		FS_proto.abort = function () {};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;

		FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

		return saveAs;
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content);
	// `self` is undefined in Firefox for Android content script context
	// while `this` is nsIContentFrameMessageManager
	// with an attribute `content` that corresponds to the window

	if (typeof module !== "undefined" && module.exports) {
		module.exports.saveAs = saveAs;
	} else if ("function" !== "undefined" && __webpack_require__(71) !== null && __webpack_require__(72) !== null) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	;

	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}

		__REACT_HOT_LOADER__.register(saveAs, "saveAs", "/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/filesaver.js");
	}();

	;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Filter = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Const = __webpack_require__(22);

	var _Const2 = _interopRequireDefault(_Const);

	var _events = __webpack_require__(74);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Filter = exports.Filter = function (_EventEmitter) {
	  _inherits(Filter, _EventEmitter);

	  function Filter(data) {
	    _classCallCheck(this, Filter);

	    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, data));

	    _this.currentFilter = {};
	    return _this;
	  }

	  _createClass(Filter, [{
	    key: 'handleFilter',
	    value: function handleFilter(dataField, value, type, filterObj) {
	      var filterType = type || _Const2.default.FILTER_TYPE.CUSTOM;

	      var props = {
	        cond: filterObj.condition // Only for select and text filter
	      };

	      if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
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
	          this.currentFilter[dataField] = { value: value, type: filterType, props: props };
	        } else {
	          delete this.currentFilter[dataField];
	        }
	      } else if (!value || value.trim() === '') {
	        delete this.currentFilter[dataField];
	      } else {
	        this.currentFilter[dataField] = { value: value.trim(), type: filterType, props: props };
	      }
	      this.emit('onFilterChange', this.currentFilter);
	    }
	  }]);

	  return Filter;
	}(_events.EventEmitter);

	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Filter, 'Filter', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/Filter.js');
	}();

	;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

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
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
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


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ButtonGroup = function (_Component) {
	  _inherits(ButtonGroup, _Component);

	  function ButtonGroup() {
	    _classCallCheck(this, ButtonGroup);

	    return _possibleConstructorReturn(this, (ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).apply(this, arguments));
	  }

	  _createClass(ButtonGroup, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          sizeClass = _props.sizeClass,
	          children = _props.children,
	          rest = _objectWithoutProperties(_props, ['className', 'sizeClass', 'children']);

	      return _react2.default.createElement(
	        'div',
	        _extends({ className: 'btn-group ' + sizeClass + ' ' + className, role: 'group' }, rest),
	        children
	      );
	    }
	  }]);

	  return ButtonGroup;
	}(_react.Component);

	ButtonGroup.propTypes = {
	  sizeClass: _propTypes2.default.string,
	  className: _propTypes2.default.string
	};
	ButtonGroup.defaultProps = {
	  sizeClass: 'btn-group-sm',
	  className: ''
	};

	var _default = ButtonGroup;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(ButtonGroup, 'ButtonGroup', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ButtonGroup.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/allen/Node/react-bootstrap-table-new/react-bootstrap-table/src/toolbar/ButtonGroup.js');
	}();

	;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=react-bootstrap-table.js.map