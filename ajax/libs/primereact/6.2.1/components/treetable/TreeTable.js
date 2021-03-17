"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _FilterUtils = _interopRequireDefault(require("../utils/FilterUtils"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Paginator = require("../paginator/Paginator");

var _TreeTableHeader = require("./TreeTableHeader");

var _TreeTableBody = require("./TreeTableBody");

var _TreeTableFooter = require("./TreeTableFooter");

var _TreeTableScrollableView = require("./TreeTableScrollableView");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

var TreeTable = /*#__PURE__*/function (_Component) {
  _inherits(TreeTable, _Component);

  var _super = _createSuper(TreeTable);

  function TreeTable(props) {
    var _this;

    _classCallCheck(this, TreeTable);

    _this = _super.call(this, props);
    var state = {};

    if (!_this.props.onToggle) {
      _this.state = {
        expandedKeys: _this.props.expandedKeys
      };
    }

    if (!_this.props.onPage) {
      state.first = props.first;
      state.rows = props.rows;
    }

    if (!_this.props.onSort) {
      state.sortField = props.sortField;
      state.sortOrder = props.sortOrder;
      state.multiSortMeta = props.multiSortMeta;
    }

    if (!_this.props.onFilter) {
      state.filters = props.filters;
    }

    if (Object.keys(state).length) {
      _this.state = state;
    }

    _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_this));
    _this.onPageChange = _this.onPageChange.bind(_assertThisInitialized(_this));
    _this.onSort = _this.onSort.bind(_assertThisInitialized(_this));
    _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
    _this.onColumnResizeStart = _this.onColumnResizeStart.bind(_assertThisInitialized(_this));
    _this.onColumnDragStart = _this.onColumnDragStart.bind(_assertThisInitialized(_this));
    _this.onColumnDragOver = _this.onColumnDragOver.bind(_assertThisInitialized(_this));
    _this.onColumnDragLeave = _this.onColumnDragLeave.bind(_assertThisInitialized(_this));
    _this.onColumnDrop = _this.onColumnDrop.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTable, [{
    key: "onToggle",
    value: function onToggle(event) {
      if (this.props.onToggle) {
        this.props.onToggle(event);
      } else {
        this.setState({
          expandedKeys: event.value
        });
      }
    }
  }, {
    key: "onPageChange",
    value: function onPageChange(event) {
      if (this.props.onPage) this.props.onPage(event);else this.setState({
        first: event.first,
        rows: event.rows
      });
    }
  }, {
    key: "onSort",
    value: function onSort(event) {
      var sortField = event.sortField;
      var sortOrder = this.props.defaultSortOrder;
      var multiSortMeta;
      var eventMeta;
      this.columnSortable = event.sortable;
      this.columnSortFunction = event.sortFunction;
      this.columnField = event.sortField;

      if (this.props.sortMode === 'multiple') {
        var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
        multiSortMeta = this.getMultiSortMeta();

        if (multiSortMeta && multiSortMeta instanceof Array) {
          var sortMeta = multiSortMeta.find(function (sortMeta) {
            return sortMeta.field === sortField;
          });
          sortOrder = sortMeta ? this.getCalculatedSortOrder(sortMeta.order) : sortOrder;
        }

        var newMetaData = {
          field: sortField,
          order: sortOrder
        };

        if (sortOrder) {
          if (!multiSortMeta || !metaKey) {
            multiSortMeta = [];
          }

          this.addSortMeta(newMetaData, multiSortMeta);
        } else if (this.props.removableSort && multiSortMeta) {
          this.removeSortMeta(newMetaData, multiSortMeta);
        }

        eventMeta = {
          multiSortMeta: multiSortMeta
        };
      } else {
        sortOrder = this.getSortField() === sortField ? this.getCalculatedSortOrder(this.getSortOrder()) : sortOrder;

        if (this.props.removableSort) {
          sortField = sortOrder ? sortField : null;
        }

        eventMeta = {
          sortField: sortField,
          sortOrder: sortOrder
        };
      }

      if (this.props.onSort) {
        this.props.onSort(eventMeta);
      } else {
        eventMeta.first = 0;
        this.setState(eventMeta);
      }
    }
  }, {
    key: "getCalculatedSortOrder",
    value: function getCalculatedSortOrder(currentOrder) {
      return this.props.removableSort ? this.props.defaultSortOrder === currentOrder ? currentOrder * -1 : 0 : currentOrder * -1;
    }
  }, {
    key: "addSortMeta",
    value: function addSortMeta(meta, multiSortMeta) {
      var index = -1;

      for (var i = 0; i < multiSortMeta.length; i++) {
        if (multiSortMeta[i].field === meta.field) {
          index = i;
          break;
        }
      }

      if (index >= 0) multiSortMeta[index] = meta;else multiSortMeta.push(meta);
    }
  }, {
    key: "removeSortMeta",
    value: function removeSortMeta(meta, multiSortMeta) {
      var index = -1;

      for (var i = 0; i < multiSortMeta.length; i++) {
        if (multiSortMeta[i].field === meta.field) {
          index = i;
          break;
        }
      }

      if (index >= 0) {
        multiSortMeta.splice(index, 1);
      }

      multiSortMeta = multiSortMeta.length > 0 ? multiSortMeta : null;
    }
  }, {
    key: "sortSingle",
    value: function sortSingle(data) {
      return this.sortNodes(data);
    }
  }, {
    key: "sortNodes",
    value: function sortNodes(data) {
      var _this2 = this;

      var value = _toConsumableArray(data);

      if (this.columnSortable && this.columnSortable === 'custom' && this.columnSortFunction) {
        value = this.columnSortFunction({
          field: this.getSortField(),
          order: this.getSortOrder()
        });
      } else {
        value.sort(function (node1, node2) {
          var sortField = _this2.getSortField();

          var value1 = _ObjectUtils.default.resolveFieldData(node1.data, sortField);

          var value2 = _ObjectUtils.default.resolveFieldData(node2.data, sortField);

          var result = null;
          if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
            numeric: true
          });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
          return _this2.getSortOrder() * result;
        });

        for (var i = 0; i < value.length; i++) {
          if (value[i].children && value[i].children.length) {
            value[i].children = this.sortNodes(value[i].children);
          }
        }
      }

      return value;
    }
  }, {
    key: "sortMultiple",
    value: function sortMultiple(data) {
      var multiSortMeta = this.getMultiSortMeta();
      if (multiSortMeta) return this.sortMultipleNodes(data, multiSortMeta);else return data;
    }
  }, {
    key: "sortMultipleNodes",
    value: function sortMultipleNodes(data, multiSortMeta) {
      var _this3 = this;

      var value = _toConsumableArray(data);

      value.sort(function (node1, node2) {
        return _this3.multisortField(node1, node2, multiSortMeta, 0);
      });

      for (var i = 0; i < value.length; i++) {
        if (value[i].children && value[i].children.length) {
          value[i].children = this.sortMultipleNodes(value[i].children, multiSortMeta);
        }
      }

      return value;
    }
  }, {
    key: "multisortField",
    value: function multisortField(node1, node2, multiSortMeta, index) {
      var value1 = _ObjectUtils.default.resolveFieldData(node1.data, multiSortMeta[index].field);

      var value2 = _ObjectUtils.default.resolveFieldData(node2.data, multiSortMeta[index].field);

      var result = null;
      if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else {
        if (value1 === value2) {
          return multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, multiSortMeta, index + 1) : 0;
        } else {
          if ((typeof value1 === 'string' || value1 instanceof String) && (typeof value2 === 'string' || value2 instanceof String)) return multiSortMeta[index].order * value1.localeCompare(value2, undefined, {
            numeric: true
          });else result = value1 < value2 ? -1 : 1;
        }
      }
      return multiSortMeta[index].order * result;
    }
  }, {
    key: "filter",
    value: function filter(value, field, mode) {
      this.onFilter({
        value: value,
        field: field,
        matchMode: mode
      });
    }
  }, {
    key: "onFilter",
    value: function onFilter(event) {
      var currentFilters = this.getFilters();
      var newFilters = currentFilters ? _objectSpread({}, currentFilters) : {};
      if (!this.isFilterBlank(event.value)) newFilters[event.field] = {
        value: event.value,
        matchMode: event.matchMode
      };else if (newFilters[event.field]) delete newFilters[event.field];

      if (this.props.onFilter) {
        this.props.onFilter({
          filters: newFilters
        });
      } else {
        this.setState({
          first: 0,
          filters: newFilters
        });
      }
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      var filters = this.getFilters();
      return filters && Object.keys(filters).length > 0;
    }
  }, {
    key: "isFilterBlank",
    value: function isFilterBlank(filter) {
      if (filter !== null && filter !== undefined) {
        if (typeof filter === 'string' && filter.trim().length === 0 || filter instanceof Array && filter.length === 0) return true;else return false;
      }

      return true;
    }
  }, {
    key: "onColumnResizeStart",
    value: function onColumnResizeStart(event) {
      var containerLeft = _DomHandler.default.getOffset(this.container).left;

      this.resizeColumn = event.columnEl;
      this.resizeColumnProps = event.column;
      this.columnResizing = true;
      this.lastResizerHelperX = event.originalEvent.pageX - containerLeft + this.container.scrollLeft;
      this.bindColumnResizeEvents();
    }
  }, {
    key: "onColumnResize",
    value: function onColumnResize(event) {
      var containerLeft = _DomHandler.default.getOffset(this.container).left;

      _DomHandler.default.addClass(this.container, 'p-unselectable-text');

      this.resizerHelper.style.height = this.container.offsetHeight + 'px';
      this.resizerHelper.style.top = 0 + 'px';
      this.resizerHelper.style.left = event.pageX - containerLeft + this.container.scrollLeft + 'px';
      this.resizerHelper.style.display = 'block';
    }
  }, {
    key: "onColumnResizeEnd",
    value: function onColumnResizeEnd(event) {
      var delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
      var columnWidth = this.resizeColumn.offsetWidth;
      var newColumnWidth = columnWidth + delta;
      var minWidth = this.resizeColumn.style.minWidth || 15;

      if (columnWidth + delta > parseInt(minWidth, 10)) {
        if (this.props.columnResizeMode === 'fit') {
          var nextColumn = this.resizeColumn.nextElementSibling;
          var nextColumnWidth = nextColumn.offsetWidth - delta;

          if (newColumnWidth > 15 && nextColumnWidth > 15) {
            if (this.props.scrollable) {
              var scrollableView = this.findParentScrollableView(this.resizeColumn);

              var scrollableBodyTable = _DomHandler.default.findSingle(scrollableView, 'table.p-treetable-scrollable-body-table');

              var scrollableHeaderTable = _DomHandler.default.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');

              var scrollableFooterTable = _DomHandler.default.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');

              var resizeColumnIndex = _DomHandler.default.index(this.resizeColumn);

              this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
              this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
              this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            } else {
              this.resizeColumn.style.width = newColumnWidth + 'px';

              if (nextColumn) {
                nextColumn.style.width = nextColumnWidth + 'px';
              }
            }
          }
        } else if (this.props.columnResizeMode === 'expand') {
          if (this.props.scrollable) {
            var _scrollableView = this.findParentScrollableView(this.resizeColumn);

            var _scrollableBodyTable = _DomHandler.default.findSingle(_scrollableView, 'table.p-treetable-scrollable-body-table');

            var _scrollableHeaderTable = _DomHandler.default.findSingle(_scrollableView, 'table.p-treetable-scrollable-header-table');

            var _scrollableFooterTable = _DomHandler.default.findSingle(_scrollableView, 'table.p-treetable-scrollable-footer-table');

            _scrollableBodyTable.style.width = _scrollableBodyTable.offsetWidth + delta + 'px';
            _scrollableHeaderTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';

            if (_scrollableFooterTable) {
              _scrollableFooterTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
            }

            var _resizeColumnIndex = _DomHandler.default.index(this.resizeColumn);

            this.resizeColGroup(_scrollableHeaderTable, _resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(_scrollableBodyTable, _resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(_scrollableFooterTable, _resizeColumnIndex, newColumnWidth, null);
          } else {
            this.table.style.width = this.table.offsetWidth + delta + 'px';
            this.resizeColumn.style.width = newColumnWidth + 'px';
          }
        }

        if (this.props.onColumnResizeEnd) {
          this.props.onColumnResizeEnd({
            element: this.resizeColumn,
            column: this.resizeColumnProps,
            delta: delta
          });
        }
      }

      this.resizerHelper.style.display = 'none';
      this.resizeColumn = null;
      this.resizeColumnProps = null;

      _DomHandler.default.removeClass(this.container, 'p-unselectable-text');

      this.unbindColumnResizeEvents();
    }
  }, {
    key: "findParentScrollableView",
    value: function findParentScrollableView(column) {
      if (column) {
        var parent = column.parentElement;

        while (parent && !_DomHandler.default.hasClass(parent, 'p-treetable-scrollable-view')) {
          parent = parent.parentElement;
        }

        return parent;
      } else {
        return null;
      }
    }
  }, {
    key: "resizeColGroup",
    value: function resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
      if (table) {
        var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

        if (colGroup) {
          var col = colGroup.children[resizeColumnIndex];
          var nextCol = col.nextElementSibling;
          col.style.width = newColumnWidth + 'px';

          if (nextCol && nextColumnWidth) {
            nextCol.style.width = nextColumnWidth + 'px';
          }
        } else {
          throw new Error("Scrollable tables require a colgroup to support resizable columns");
        }
      }
    }
  }, {
    key: "bindColumnResizeEvents",
    value: function bindColumnResizeEvents() {
      var _this4 = this;

      this.documentColumnResizeListener = document.addEventListener('mousemove', function (event) {
        if (_this4.columnResizing) {
          _this4.onColumnResize(event);
        }
      });
      this.documentColumnResizeEndListener = document.addEventListener('mouseup', function (event) {
        if (_this4.columnResizing) {
          _this4.columnResizing = false;

          _this4.onColumnResizeEnd(event);
        }
      });
    }
  }, {
    key: "unbindColumnResizeEvents",
    value: function unbindColumnResizeEvents() {
      document.removeEventListener('document', this.documentColumnResizeListener);
      document.removeEventListener('document', this.documentColumnResizeEndListener);
    }
  }, {
    key: "onColumnDragStart",
    value: function onColumnDragStart(event) {
      if (this.columnResizing) {
        event.preventDefault();
        return;
      }

      this.iconWidth = _DomHandler.default.getHiddenElementOuterWidth(this.reorderIndicatorUp);
      this.iconHeight = _DomHandler.default.getHiddenElementOuterHeight(this.reorderIndicatorUp);
      this.draggedColumn = this.findParentHeader(event.target);
      event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    }
  }, {
    key: "onColumnDragOver",
    value: function onColumnDragOver(event) {
      var dropHeader = this.findParentHeader(event.target);

      if (this.props.reorderableColumns && this.draggedColumn && dropHeader) {
        event.preventDefault();

        var containerOffset = _DomHandler.default.getOffset(this.container);

        var dropHeaderOffset = _DomHandler.default.getOffset(dropHeader);

        if (this.draggedColumn !== dropHeader) {
          var targetLeft = dropHeaderOffset.left - containerOffset.left; //let targetTop =  containerOffset.top - dropHeaderOffset.top;

          var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
          this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
          this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

          if (event.pageX > columnCenter) {
            this.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
            this.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
            this.dropPosition = 1;
          } else {
            this.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
            this.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
            this.dropPosition = -1;
          }

          this.reorderIndicatorUp.style.display = 'block';
          this.reorderIndicatorDown.style.display = 'block';
        }
      }
    }
  }, {
    key: "onColumnDragLeave",
    value: function onColumnDragLeave(event) {
      if (this.props.reorderableColumns && this.draggedColumn) {
        event.preventDefault();
        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
      }
    }
  }, {
    key: "onColumnDrop",
    value: function onColumnDrop(event) {
      event.preventDefault();

      if (this.draggedColumn) {
        var dragIndex = _DomHandler.default.index(this.draggedColumn);

        var dropIndex = _DomHandler.default.index(this.findParentHeader(event.target));

        var allowDrop = dragIndex !== dropIndex;

        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
          allowDrop = false;
        }

        if (allowDrop) {
          var columns = this.state.columnOrder ? this.getColumns() : _react.default.Children.toArray(this.props.children);

          _ObjectUtils.default.reorderArray(columns, dragIndex, dropIndex);

          var columnOrder = [];

          var _iterator = _createForOfIteratorHelper(columns),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var column = _step.value;
              columnOrder.push(column.props.columnKey || column.props.field);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          this.setState({
            columnOrder: columnOrder
          });

          if (this.props.onColReorder) {
            this.props.onColReorder({
              dragIndex: dragIndex,
              dropIndex: dropIndex,
              columns: columns
            });
          }
        }

        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
        this.draggedColumn.draggable = false;
        this.draggedColumn = null;
        this.dropPosition = null;
      }
    }
  }, {
    key: "findParentHeader",
    value: function findParentHeader(element) {
      if (element.nodeName === 'TH') {
        return element;
      } else {
        var parent = element.parentElement;

        while (parent.nodeName !== 'TH') {
          parent = parent.parentElement;
          if (!parent) break;
        }

        return parent;
      }
    }
  }, {
    key: "getExpandedKeys",
    value: function getExpandedKeys() {
      return this.props.onToggle ? this.props.expandedKeys : this.state.expandedKeys;
    }
  }, {
    key: "getFirst",
    value: function getFirst() {
      return this.props.onPage ? this.props.first : this.state.first;
    }
  }, {
    key: "getRows",
    value: function getRows() {
      return this.props.onPage ? this.props.rows : this.state.rows;
    }
  }, {
    key: "getSortField",
    value: function getSortField() {
      return this.props.onSort ? this.props.sortField : this.state.sortField;
    }
  }, {
    key: "getSortOrder",
    value: function getSortOrder() {
      return this.props.onSort ? this.props.sortOrder : this.state.sortOrder;
    }
  }, {
    key: "getMultiSortMeta",
    value: function getMultiSortMeta() {
      return this.props.onSort ? this.props.multiSortMeta : this.state.multiSortMeta;
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      return this.props.onFilter ? this.props.filters : this.state.filters;
    }
  }, {
    key: "findColumnByKey",
    value: function findColumnByKey(columns, key) {
      if (columns && columns.length) {
        for (var i = 0; i < columns.length; i++) {
          var child = columns[i];

          if (child.props.columnKey === key || child.props.field === key) {
            return child;
          }
        }
      }

      return null;
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      var columns = _react.default.Children.toArray(this.props.children);

      if (this.props.reorderableColumns && this.state.columnOrder) {
        var orderedColumns = [];

        for (var i = 0; i < this.state.columnOrder.length; i++) {
          orderedColumns.push(this.findColumnByKey(columns, this.state.columnOrder[i]));
        }

        return orderedColumns;
      } else {
        return columns;
      }
    }
  }, {
    key: "getTotalRecords",
    value: function getTotalRecords(data) {
      return this.props.lazy ? this.props.totalRecords : data ? data.length : 0;
    }
  }, {
    key: "isSingleSelectionMode",
    value: function isSingleSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'single';
    }
  }, {
    key: "isMultipleSelectionMode",
    value: function isMultipleSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'multiple';
    }
  }, {
    key: "isRowSelectionMode",
    value: function isRowSelectionMode() {
      return this.isSingleSelectionMode() || this.isMultipleSelectionMode();
    }
  }, {
    key: "getFrozenColumns",
    value: function getFrozenColumns(columns) {
      var frozenColumns = null;

      var _iterator2 = _createForOfIteratorHelper(columns),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var col = _step2.value;

          if (col.props.frozen) {
            frozenColumns = frozenColumns || [];
            frozenColumns.push(col);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return frozenColumns;
    }
  }, {
    key: "getScrollableColumns",
    value: function getScrollableColumns(columns) {
      var scrollableColumns = null;

      var _iterator3 = _createForOfIteratorHelper(columns),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var col = _step3.value;

          if (!col.props.frozen) {
            scrollableColumns = scrollableColumns || [];
            scrollableColumns.push(col);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return scrollableColumns;
    }
  }, {
    key: "filterLocal",
    value: function filterLocal(value) {
      var filteredNodes = [];
      var filters = this.getFilters();

      var columns = _react.default.Children.toArray(this.props.children);

      var isStrictMode = this.props.filterMode === 'strict';

      var _iterator4 = _createForOfIteratorHelper(value),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var node = _step4.value;

          var copyNode = _objectSpread({}, node);

          var localMatch = true;
          var globalMatch = false;

          for (var j = 0; j < columns.length; j++) {
            var col = columns[j];
            var filterMeta = filters ? filters[col.props.field] : null;
            var filterField = col.props.field;
            var filterValue = void 0,
                filterConstraint = void 0,
                paramsWithoutNode = void 0; //local

            if (filterMeta) {
              var filterMatchMode = filterMeta.matchMode || col.props.filterMatchMode;
              filterValue = filterMeta.value;
              filterConstraint = filterMatchMode === 'custom' ? col.props.filterFunction : _FilterUtils.default[filterMatchMode];
              paramsWithoutNode = {
                filterField: filterField,
                filterValue: filterValue,
                filterConstraint: filterConstraint,
                isStrictMode: isStrictMode
              };

              if (isStrictMode && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))) {
                localMatch = false;
              }

              if (!localMatch) {
                break;
              }
            } //global


            if (this.props.globalFilter && !globalMatch) {
              var copyNodeForGlobal = _objectSpread({}, copyNode);

              filterValue = this.props.globalFilter;
              filterConstraint = _FilterUtils.default['contains'];
              paramsWithoutNode = {
                filterField: filterField,
                filterValue: filterValue,
                filterConstraint: filterConstraint,
                isStrictMode: isStrictMode
              };

              if (isStrictMode && (this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode)) || !isStrictMode && (this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode))) {
                globalMatch = true;
                copyNode = copyNodeForGlobal;
              }
            }
          }

          var matches = localMatch;

          if (this.props.globalFilter) {
            matches = localMatch && globalMatch;
          }

          if (matches) {
            filteredNodes.push(copyNode);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return filteredNodes;
    }
  }, {
    key: "findFilteredNodes",
    value: function findFilteredNodes(node, paramsWithoutNode) {
      if (node) {
        var matched = false;

        if (node.children) {
          var childNodes = _toConsumableArray(node.children);

          node.children = [];

          var _iterator5 = _createForOfIteratorHelper(childNodes),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var childNode = _step5.value;

              var copyChildNode = _objectSpread({}, childNode);

              if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                matched = true;
                node.children.push(copyChildNode);
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }

        if (matched) {
          return true;
        }
      }
    }
  }, {
    key: "isFilterMatched",
    value: function isFilterMatched(node, _ref) {
      var filterField = _ref.filterField,
          filterValue = _ref.filterValue,
          filterConstraint = _ref.filterConstraint,
          isStrictMode = _ref.isStrictMode;
      var matched = false;

      var dataFieldValue = _ObjectUtils.default.resolveFieldData(node.data, filterField);

      if (filterConstraint(dataFieldValue, filterValue, this.props.filterLocale)) {
        matched = true;
      }

      if (!matched || isStrictMode && !this.isNodeLeaf(node)) {
        matched = this.findFilteredNodes(node, {
          filterField: filterField,
          filterValue: filterValue,
          filterConstraint: filterConstraint,
          isStrictMode: isStrictMode
        }) || matched;
      }

      return matched;
    }
  }, {
    key: "isNodeLeaf",
    value: function isNodeLeaf(node) {
      return node.leaf === false ? false : !(node.children && node.children.length);
    }
  }, {
    key: "processValue",
    value: function processValue() {
      var data = this.props.value;

      if (!this.props.lazy) {
        if (data && data.length) {
          if (this.getSortField() || this.getMultiSortMeta()) {
            if (this.props.sortMode === 'single') data = this.sortSingle(data);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data);
          }

          var localFilters = this.getFilters();

          if (localFilters || this.props.globalFilter) {
            data = this.filterLocal(data, localFilters);
          }
        }
      }

      return data;
    }
  }, {
    key: "createTableHeader",
    value: function createTableHeader(columns, columnGroup) {
      return /*#__PURE__*/_react.default.createElement(_TreeTableHeader.TreeTableHeader, {
        columns: columns,
        columnGroup: columnGroup,
        tabIndex: this.props.tabIndex,
        onSort: this.onSort,
        sortField: this.getSortField(),
        sortOrder: this.getSortOrder(),
        multiSortMeta: this.getMultiSortMeta(),
        resizableColumns: this.props.resizableColumns,
        onResizeStart: this.onColumnResizeStart,
        reorderableColumns: this.props.reorderableColumns,
        onDragStart: this.onColumnDragStart,
        onDragOver: this.onColumnDragOver,
        onDragLeave: this.onColumnDragLeave,
        onDrop: this.onColumnDrop,
        onFilter: this.onFilter,
        filters: this.getFilters(),
        filterDelay: this.props.filterDelay
      });
    }
  }, {
    key: "createTableFooter",
    value: function createTableFooter(columns, columnGroup) {
      return /*#__PURE__*/_react.default.createElement(_TreeTableFooter.TreeTableFooter, {
        columns: columns,
        columnGroup: columnGroup
      });
    }
  }, {
    key: "createTableBody",
    value: function createTableBody(value, columns) {
      return /*#__PURE__*/_react.default.createElement(_TreeTableBody.TreeTableBody, {
        value: value,
        columns: columns,
        expandedKeys: this.getExpandedKeys(),
        selectOnEdit: this.props.selectOnEdit,
        onToggle: this.onToggle,
        onExpand: this.props.onExpand,
        onCollapse: this.props.onCollapse,
        paginator: this.props.paginator,
        first: this.getFirst(),
        rows: this.getRows(),
        selectionMode: this.props.selectionMode,
        selectionKeys: this.props.selectionKeys,
        onSelectionChange: this.props.onSelectionChange,
        metaKeySelection: this.props.metaKeySelection,
        onRowClick: this.props.onRowClick,
        onSelect: this.props.onSelect,
        onUnselect: this.props.onUnselect,
        propagateSelectionUp: this.props.propagateSelectionUp,
        propagateSelectionDown: this.props.propagateSelectionDown,
        lazy: this.props.lazy,
        rowClassName: this.props.rowClassName,
        emptyMessage: this.props.emptyMessage,
        loading: this.props.loading,
        contextMenuSelectionKey: this.props.contextMenuSelectionKey,
        onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
        onContextMenu: this.props.onContextMenu
      });
    }
  }, {
    key: "createPaginator",
    value: function createPaginator(position, totalRecords) {
      var className = (0, _ClassNames.classNames)('p-paginator-' + position, this.props.paginatorClassName);
      return /*#__PURE__*/_react.default.createElement(_Paginator.Paginator, {
        first: this.getFirst(),
        rows: this.getRows(),
        pageLinkSize: this.props.pageLinkSize,
        className: className,
        onPageChange: this.onPageChange,
        template: this.props.paginatorTemplate,
        totalRecords: totalRecords,
        rowsPerPageOptions: this.props.rowsPerPageOptions,
        currentPageReportTemplate: this.props.currentPageReportTemplate,
        leftContent: this.props.paginatorLeft,
        rightContent: this.props.paginatorRight,
        alwaysShow: this.props.alwaysShowPaginator,
        dropdownAppendTo: this.props.paginatorDropdownAppendTo
      });
    }
  }, {
    key: "createScrollableView",
    value: function createScrollableView(value, columns, frozen, headerColumnGroup, footerColumnGroup) {
      var header = this.createTableHeader(columns, headerColumnGroup);
      var footer = this.createTableFooter(columns, footerColumnGroup);
      var body = this.createTableBody(value, columns);
      return /*#__PURE__*/_react.default.createElement(_TreeTableScrollableView.TreeTableScrollableView, {
        columns: columns,
        header: header,
        body: body,
        footer: footer,
        scrollHeight: this.props.scrollHeight,
        frozen: frozen,
        frozenWidth: this.props.frozenWidth
      });
    }
  }, {
    key: "renderScrollableTable",
    value: function renderScrollableTable(value) {
      var columns = this.getColumns();
      var frozenColumns = this.getFrozenColumns(columns);
      var scrollableColumns = frozenColumns ? this.getScrollableColumns(columns) : columns;
      var frozenView, scrollableView;

      if (frozenColumns) {
        frozenView = this.createScrollableView(value, frozenColumns, true, this.props.frozenHeaderColumnGroup, this.props.frozenFooterColumnGroup);
      }

      scrollableView = this.createScrollableView(value, scrollableColumns, false, this.props.headerColumnGroup, this.props.footerColumnGroup);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-scrollable-wrapper"
      }, frozenView, scrollableView);
    }
  }, {
    key: "renderRegularTable",
    value: function renderRegularTable(value) {
      var _this5 = this;

      var columns = this.getColumns();
      var header = this.createTableHeader(columns, this.props.headerColumnGroup);
      var footer = this.createTableFooter(columns, this.props.footerColumnGroup);
      var body = this.createTableBody(value, columns);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-wrapper"
      }, /*#__PURE__*/_react.default.createElement("table", {
        style: this.props.tableStyle,
        className: this.props.tableClassName,
        ref: function ref(el) {
          return _this5.table = el;
        }
      }, header, footer, body));
    }
  }, {
    key: "renderTable",
    value: function renderTable(value) {
      if (this.props.scrollable) return this.renderScrollableTable(value);else return this.renderRegularTable(value);
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      if (this.props.loading) {
        var iconClassName = (0, _ClassNames.classNames)('p-treetable-loading-icon pi-spin', this.props.loadingIcon);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-treetable-loading"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "p-treetable-loading-overlay p-component-overlay"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: iconClassName
        })));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var value = this.processValue();
      var className = (0, _ClassNames.classNames)('p-treetable p-component', {
        'p-treetable-hoverable-rows': this.isRowSelectionMode(),
        'p-treetable-resizable': this.props.resizableColumns,
        'p-treetable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
        'p-treetable-auto-layout': this.props.autoLayout
      }, this.props.className);
      var table = this.renderTable(value);
      var totalRecords = this.getTotalRecords(value);

      var headerFacet = this.props.header && /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-header"
      }, this.props.header);

      var footerFacet = this.props.footer && /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treetable-footer"
      }, this.props.footer);

      var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
      var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
      var loader = this.renderLoader();

      var resizeHelper = this.props.resizableColumns && /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          _this6.resizerHelper = el;
        },
        className: "p-column-resizer-helper",
        style: {
          display: 'none'
        }
      });

      var reorderIndicatorUp = this.props.reorderableColumns && /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          return _this6.reorderIndicatorUp = el;
        },
        className: "pi pi-arrow-down p-datatable-reorder-indicator-up",
        style: {
          position: 'absolute',
          display: 'none'
        }
      });

      var reorderIndicatorDown = this.props.reorderableColumns && /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          return _this6.reorderIndicatorDown = el;
        },
        className: "pi pi-arrow-up p-datatable-reorder-indicator-down",
        style: {
          position: 'absolute',
          display: 'none'
        }
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style,
        ref: function ref(el) {
          return _this6.container = el;
        },
        "data-scrollselectors": ".p-treetable-scrollable-body"
      }, loader, headerFacet, paginatorTop, table, paginatorBottom, footerFacet, resizeHelper, reorderIndicatorUp, reorderIndicatorDown);
    }
  }]);

  return TreeTable;
}(_react.Component);

exports.TreeTable = TreeTable;

_defineProperty(TreeTable, "defaultProps", {
  id: null,
  value: null,
  header: null,
  footer: null,
  style: null,
  className: null,
  tableStyle: null,
  tableClassName: null,
  expandedKeys: null,
  paginator: false,
  paginatorPosition: 'bottom',
  alwaysShowPaginator: true,
  paginatorClassName: null,
  paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
  paginatorLeft: null,
  paginatorRight: null,
  paginatorDropdownAppendTo: null,
  pageLinkSize: 5,
  rowsPerPageOptions: null,
  currentPageReportTemplate: '({currentPage} of {totalPages})',
  first: null,
  rows: null,
  totalRecords: null,
  lazy: false,
  sortField: null,
  sortOrder: null,
  multiSortMeta: null,
  sortMode: 'single',
  defaultSortOrder: 1,
  removableSort: false,
  selectionMode: null,
  selectionKeys: null,
  contextMenuSelectionKey: null,
  metaKeySelection: true,
  selectOnEdit: true,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  autoLayout: false,
  rowClassName: null,
  loading: false,
  loadingIcon: 'pi pi-spinner',
  tabIndex: 0,
  scrollable: false,
  scrollHeight: null,
  reorderableColumns: false,
  headerColumnGroup: null,
  footerColumnGroup: null,
  frozenHeaderColumnGroup: null,
  frozenFooterColumnGroup: null,
  frozenWidth: null,
  resizableColumns: false,
  columnResizeMode: 'fit',
  emptyMessage: "No records found",
  filters: null,
  globalFilter: null,
  filterMode: 'lenient',
  filterDelay: 300,
  filterLocale: undefined,
  onFilter: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onPage: null,
  onSort: null,
  onSelect: null,
  onUnselect: null,
  onRowClick: null,
  onSelectionChange: null,
  onContextMenuSelectionChange: null,
  onColumnResizeEnd: null,
  onColReorder: null,
  onContextMenu: null
});

_defineProperty(TreeTable, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  header: _propTypes.default.any,
  footer: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  tableStyle: _propTypes.default.any,
  tableClassName: _propTypes.default.string,
  expandedKeys: _propTypes.default.object,
  paginator: _propTypes.default.bool,
  paginatorPosition: _propTypes.default.string,
  alwaysShowPaginator: _propTypes.default.bool,
  paginatorClassName: _propTypes.default.string,
  paginatorTemplate: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  paginatorLeft: _propTypes.default.any,
  paginatorRight: _propTypes.default.any,
  paginatorDropdownAppendTo: _propTypes.default.any,
  pageLinkSize: _propTypes.default.number,
  rowsPerPageOptions: _propTypes.default.array,
  currentPageReportTemplate: _propTypes.default.string,
  first: _propTypes.default.number,
  rows: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  lazy: _propTypes.default.bool,
  sortField: _propTypes.default.string,
  sortOrder: _propTypes.default.number,
  multiSortMeta: _propTypes.default.array,
  sortMode: _propTypes.default.string,
  defaultSortOrder: _propTypes.default.number,
  removableSort: _propTypes.default.bool,
  selectionMode: _propTypes.default.string,
  selectionKeys: _propTypes.default.any,
  contextMenuSelectionKey: _propTypes.default.any,
  metaKeySelection: _propTypes.default.bool,
  selectOnEdit: _propTypes.default.bool,
  propagateSelectionUp: _propTypes.default.bool,
  propagateSelectionDown: _propTypes.default.bool,
  autoLayout: _propTypes.default.bool,
  rowClassName: _propTypes.default.func,
  loading: _propTypes.default.bool,
  loadingIcon: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  scrollable: _propTypes.default.bool,
  scrollHeight: _propTypes.default.string,
  reorderableColumns: _propTypes.default.bool,
  headerColumnGroup: _propTypes.default.any,
  footerColumnGroup: _propTypes.default.any,
  frozenHeaderColumnGroup: _propTypes.default.any,
  frozenFooterColumnGroup: _propTypes.default.any,
  frozenWidth: _propTypes.default.string,
  resizableColumns: _propTypes.default.bool,
  columnResizeMode: _propTypes.default.string,
  emptyMessage: _propTypes.default.string,
  filters: _propTypes.default.object,
  globalFilter: _propTypes.default.any,
  filterMode: _propTypes.default.string,
  filterDelay: _propTypes.default.number,
  filterLocale: _propTypes.default.string,
  onFilter: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onPage: _propTypes.default.func,
  onSort: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onUnselect: _propTypes.default.func,
  onRowClick: _propTypes.default.func,
  onSelectionChange: _propTypes.default.func,
  onContextMenuSelectionChange: _propTypes.default.func,
  onColumnResizeEnd: _propTypes.default.func,
  onColReorder: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
});