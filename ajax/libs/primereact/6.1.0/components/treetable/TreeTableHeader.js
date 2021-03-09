"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTableHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _InputText = require("../inputtext/InputText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TreeTableHeader = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableHeader, _Component);

  var _super = _createSuper(TreeTableHeader);

  function TreeTableHeader(props) {
    var _this;

    _classCallCheck(this, TreeTableHeader);

    _this = _super.call(this, props);
    _this.state = {
      badgeVisible: false
    };
    _this.onFilterInput = _this.onFilterInput.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableHeader, [{
    key: "onHeaderClick",
    value: function onHeaderClick(event, column) {
      if (column.props.sortable) {
        var targetNode = event.target;

        if (_DomHandler.default.hasClass(targetNode, 'p-sortable-column') || _DomHandler.default.hasClass(targetNode, 'p-column-title') || _DomHandler.default.hasClass(targetNode, 'p-sortable-column-icon') || _DomHandler.default.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
          this.props.onSort({
            originalEvent: event,
            sortField: column.props.sortField || column.props.field,
            sortFunction: column.props.sortFunction,
            sortable: column.props.sortable
          });

          _DomHandler.default.clearSelection();
        }
      }
    }
  }, {
    key: "onHeaderMouseDown",
    value: function onHeaderMouseDown(event, column) {
      if (this.props.reorderableColumns && column.props.reorderable) {
        if (event.target.nodeName !== 'INPUT') event.currentTarget.draggable = true;else if (event.target.nodeName === 'INPUT') event.currentTarget.draggable = false;
      }
    }
  }, {
    key: "onHeaderKeyDown",
    value: function onHeaderKeyDown(event, column) {
      if (event.key === 'Enter') {
        this.onHeaderClick(event, column);
        event.preventDefault();
      }
    }
  }, {
    key: "getMultiSortMetaDataIndex",
    value: function getMultiSortMetaDataIndex(column) {
      if (this.props.multiSortMeta) {
        for (var i = 0; i < this.props.multiSortMeta.length; i++) {
          if (this.props.multiSortMeta[i].field === column.props.field) {
            return i;
          }
        }
      }

      return -1;
    }
  }, {
    key: "onResizerMouseDown",
    value: function onResizerMouseDown(event, column) {
      if (this.props.resizableColumns && this.props.onResizeStart) {
        this.props.onResizeStart({
          originalEvent: event,
          columnEl: event.target.parentElement,
          column: column
        });
      }
    }
  }, {
    key: "onFilterInput",
    value: function onFilterInput(e, column) {
      var _this2 = this;

      if (column.props.filter && this.props.onFilter) {
        if (this.filterTimeout) {
          clearTimeout(this.filterTimeout);
        }

        var filterValue = e.target.value;
        this.filterTimeout = setTimeout(function () {
          _this2.props.onFilter({
            value: filterValue,
            field: column.props.field,
            matchMode: column.props.filterMatchMode
          });

          _this2.filterTimeout = null;
        }, this.props.filterDelay);
      }
    }
  }, {
    key: "hasColumnFilter",
    value: function hasColumnFilter(columns) {
      if (columns) {
        var _iterator = _createForOfIteratorHelper(columns),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var col = _step.value;

            if (col.props.filter) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return false;
    }
  }, {
    key: "renderSortIcon",
    value: function renderSortIcon(column, sorted, sortOrder) {
      if (column.props.sortable) {
        var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt' : 'pi-sort-alt';
        var sortIconClassName = (0, _ClassNames.classNames)('p-sortable-column-icon', 'pi pi-fw', sortIcon);
        return /*#__PURE__*/_react.default.createElement("span", {
          className: sortIconClassName
        });
      } else {
        return null;
      }
    }
  }, {
    key: "renderResizer",
    value: function renderResizer(column) {
      var _this3 = this;

      if (this.props.resizableColumns) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "p-column-resizer p-clickable",
          onMouseDown: function onMouseDown(e) {
            return _this3.onResizerMouseDown(e, column);
          }
        });
      } else {
        return null;
      }
    }
  }, {
    key: "getAriaSort",
    value: function getAriaSort(column, sorted, sortOrder) {
      if (column.props.sortable) {
        var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up' : 'pi-sort';
        if (sortIcon === 'pi-sort-down') return 'descending';else if (sortIcon === 'pi-sort-up') return 'ascending';else return 'none';
      } else {
        return null;
      }
    }
  }, {
    key: "renderSortBadge",
    value: function renderSortBadge(sortMetaDataIndex) {
      if (sortMetaDataIndex !== -1 && this.state.badgeVisible) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "p-sortable-column-badge"
        }, sortMetaDataIndex + 1);
      }

      return null;
    }
  }, {
    key: "renderHeaderCell",
    value: function renderHeaderCell(column, options) {
      var _this4 = this;

      var filterElement;

      if (column.props.filter && options.renderFilter) {
        filterElement = column.props.filterElement || /*#__PURE__*/_react.default.createElement(_InputText.InputText, {
          onInput: function onInput(e) {
            return _this4.onFilterInput(e, column);
          },
          type: this.props.filterType,
          defaultValue: this.props.filters && this.props.filters[column.props.field] ? this.props.filters[column.props.field].value : null,
          className: "p-column-filter",
          placeholder: column.props.filterPlaceholder,
          maxLength: column.props.filterMaxLength
        });
      }

      if (options.filterOnly) {
        return /*#__PURE__*/_react.default.createElement("th", {
          key: column.props.columnKey || column.props.field || options.index,
          className: (0, _ClassNames.classNames)('p-filter-column', column.props.filterHeaderClassName),
          style: column.props.filterHeaderStyle || column.props.style,
          rowSpan: column.props.rowSpan,
          colSpan: column.props.colSpan
        }, filterElement);
      } else {
        var sortMetaDataIndex = this.getMultiSortMetaDataIndex(column);
        var multiSortMetaData = sortMetaDataIndex !== -1 ? this.props.multiSortMeta[sortMetaDataIndex] : null;
        var singleSorted = column.props.field === this.props.sortField;
        var multipleSorted = multiSortMetaData !== null;
        var sorted = column.props.sortable && (singleSorted || multipleSorted);
        var sortOrder = 0;
        if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;
        var sortIconElement = this.renderSortIcon(column, sorted, sortOrder);
        var ariaSortData = this.getAriaSort(column, sorted, sortOrder);
        var sortBadge = this.renderSortBadge(sortMetaDataIndex);
        var className = (0, _ClassNames.classNames)(column.props.headerClassName || column.props.className, {
          'p-sortable-column': column.props.sortable,
          'p-highlight': sorted,
          'p-resizable-column': this.props.resizableColumns
        });
        var resizer = this.renderResizer(column);
        return /*#__PURE__*/_react.default.createElement("th", {
          key: column.columnKey || column.field || options.index,
          className: className,
          style: column.props.headerStyle || column.props.style,
          tabIndex: column.props.sortable ? this.props.tabIndex : null,
          onClick: function onClick(e) {
            return _this4.onHeaderClick(e, column);
          },
          onMouseDown: function onMouseDown(e) {
            return _this4.onHeaderMouseDown(e, column);
          },
          onKeyDown: function onKeyDown(e) {
            return _this4.onHeaderKeyDown(e, column);
          },
          rowSpan: column.props.rowSpan,
          colSpan: column.props.colSpan,
          "aria-sort": ariaSortData,
          onDragStart: this.props.onDragStart,
          onDragOver: this.props.onDragOver,
          onDragLeave: this.props.onDragLeave,
          onDrop: this.props.onDrop
        }, resizer, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-column-title"
        }, column.props.header), sortIconElement, sortBadge, filterElement);
      }
    }
  }, {
    key: "renderHeaderRow",
    value: function renderHeaderRow(row, index) {
      var _this5 = this;

      var rowColumns = _react.default.Children.toArray(row.props.children);

      var rowHeaderCells = rowColumns.map(function (col, i) {
        return _this5.renderHeaderCell(col, {
          index: i,
          filterOnly: false,
          renderFilter: true
        });
      });
      return /*#__PURE__*/_react.default.createElement("tr", {
        key: index
      }, rowHeaderCells);
    }
  }, {
    key: "renderColumnGroup",
    value: function renderColumnGroup() {
      var _this6 = this;

      var rows = _react.default.Children.toArray(this.props.columnGroup.props.children);

      return rows.map(function (row, i) {
        return _this6.renderHeaderRow(row, i);
      });
    }
  }, {
    key: "renderColumns",
    value: function renderColumns(columns) {
      var _this7 = this;

      if (columns) {
        if (this.hasColumnFilter(columns)) {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: false,
              renderFilter: false
            });
          })), /*#__PURE__*/_react.default.createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: true,
              renderFilter: true
            });
          })));
        } else {
          return /*#__PURE__*/_react.default.createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: false,
              renderFilter: false
            });
          }));
        }
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.props.columnGroup ? this.renderColumnGroup() : this.renderColumns(this.props.columns);
      return /*#__PURE__*/_react.default.createElement("thead", {
        className: "p-treetable-thead"
      }, content);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        badgeVisible: nextProps.multiSortMeta && nextProps.multiSortMeta.length > 1
      };
    }
  }]);

  return TreeTableHeader;
}(_react.Component);

exports.TreeTableHeader = TreeTableHeader;

_defineProperty(TreeTableHeader, "defaultProps", {
  columns: null,
  columnGroup: null,
  sortField: null,
  sortOrder: null,
  multiSortMeta: null,
  resizableColumns: false,
  reorderableColumns: false,
  onSort: null,
  onResizeStart: null,
  onDragStart: null,
  onDragOver: null,
  onDragLeave: null,
  onDrop: null,
  onFilter: null
});

_defineProperty(TreeTableHeader, "propTypes", {
  columns: _propTypes.default.array,
  columnGroup: _propTypes.default.any,
  sortField: _propTypes.default.string,
  sortOrder: _propTypes.default.number,
  multiSortMeta: _propTypes.default.array,
  resizableColumns: _propTypes.default.bool,
  reorderableColumns: _propTypes.default.bool,
  onSort: _propTypes.default.func,
  onResizeStart: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  onFilter: _propTypes.default.func
});