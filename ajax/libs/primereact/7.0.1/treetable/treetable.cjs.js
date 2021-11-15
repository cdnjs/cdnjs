'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var utils = require('primereact/utils');
var paginator = require('primereact/paginator');
var inputtext = require('primereact/inputtext');
var overlayservice = require('primereact/overlayservice');
var ripple = require('primereact/ripple');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$5(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$5(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _createForOfIteratorHelper$4(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableHeader = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableHeader, _Component);

  var _super = _createSuper$6(TreeTableHeader);

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

        if (utils.DomHandler.hasClass(targetNode, 'p-sortable-column') || utils.DomHandler.hasClass(targetNode, 'p-column-title') || utils.DomHandler.hasClass(targetNode, 'p-sortable-column-icon') || utils.DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
          this.props.onSort({
            originalEvent: event,
            sortField: column.props.sortField || column.props.field,
            sortFunction: column.props.sortFunction,
            sortable: column.props.sortable
          });
          utils.DomHandler.clearSelection();
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
    key: "onDragStart",
    value: function onDragStart(event, column) {
      if (this.props.onDragStart) {
        this.props.onDragStart({
          originalEvent: event,
          column: column
        });
      }
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event, column) {
      if (this.props.onDragOver) {
        this.props.onDragOver({
          originalEvent: event,
          column: column
        });
      }
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event, column) {
      if (this.props.onDragLeave) {
        this.props.onDragLeave({
          originalEvent: event,
          column: column
        });
      }
    }
  }, {
    key: "onDrop",
    value: function onDrop(event, column) {
      if (this.props.onDrop) {
        this.props.onDrop({
          originalEvent: event,
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
            matchMode: column.props.filterMatchMode || 'startsWith'
          });

          _this2.filterTimeout = null;
        }, this.props.filterDelay);
      }
    }
  }, {
    key: "hasColumnFilter",
    value: function hasColumnFilter(columns) {
      if (columns) {
        var _iterator = _createForOfIteratorHelper$4(columns),
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
        var sortIconClassName = utils.classNames('p-sortable-column-icon', 'pi pi-fw', sortIcon);
        return /*#__PURE__*/React__default["default"].createElement("span", {
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
        return /*#__PURE__*/React__default["default"].createElement("span", {
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
        return /*#__PURE__*/React__default["default"].createElement("span", {
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
        filterElement = column.props.filterElement || /*#__PURE__*/React__default["default"].createElement(inputtext.InputText, {
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
        return /*#__PURE__*/React__default["default"].createElement("th", {
          key: column.props.columnKey || column.props.field || options.index,
          className: utils.classNames('p-filter-column', column.props.filterHeaderClassName),
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
        var className = utils.classNames(column.props.headerClassName || column.props.className, {
          'p-sortable-column': column.props.sortable,
          'p-highlight': sorted,
          'p-resizable-column': this.props.resizableColumns
        });
        var resizer = this.renderResizer(column);
        return /*#__PURE__*/React__default["default"].createElement("th", {
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
          onDragStart: function onDragStart(e) {
            return _this4.onDragStart(e, column);
          },
          onDragOver: function onDragOver(e) {
            return _this4.onDragOver(e, column);
          },
          onDragLeave: function onDragLeave(e) {
            return _this4.onDragLeave(e, column);
          },
          onDrop: function onDrop(e) {
            return _this4.onDrop(e, column);
          }
        }, resizer, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-column-title"
        }, column.props.header), sortIconElement, sortBadge, filterElement);
      }
    }
  }, {
    key: "renderHeaderRow",
    value: function renderHeaderRow(row, index) {
      var _this5 = this;

      var rowColumns = React__default["default"].Children.toArray(row.props.children);
      var rowHeaderCells = rowColumns.map(function (col, i) {
        return _this5.renderHeaderCell(col, {
          index: i,
          filterOnly: false,
          renderFilter: true
        });
      });
      return /*#__PURE__*/React__default["default"].createElement("tr", {
        key: index
      }, rowHeaderCells);
    }
  }, {
    key: "renderColumnGroup",
    value: function renderColumnGroup() {
      var _this6 = this;

      var rows = React__default["default"].Children.toArray(this.props.columnGroup.props.children);
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
          return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: false,
              renderFilter: false
            });
          })), /*#__PURE__*/React__default["default"].createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: true,
              renderFilter: true
            });
          })));
        } else {
          return /*#__PURE__*/React__default["default"].createElement("tr", null, columns.map(function (col, i) {
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
      return /*#__PURE__*/React__default["default"].createElement("thead", {
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
}(React.Component);

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DomHandler = /*#__PURE__*/function () {
  function DomHandler() {
    _classCallCheck(this, DomHandler);
  }

  _createClass(DomHandler, null, [{
    key: "innerWidth",
    value: function innerWidth(el) {
      if (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
      }

      return 0;
    }
  }, {
    key: "width",
    value: function width(el) {
      if (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
      }

      return 0;
    }
  }, {
    key: "getWindowScrollTop",
    value: function getWindowScrollTop() {
      var doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
  }, {
    key: "getWindowScrollLeft",
    value: function getWindowScrollLeft() {
      var doc = document.documentElement;
      return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
  }, {
    key: "getOuterWidth",
    value: function getOuterWidth(el, margin) {
      if (el) {
        var width = el.offsetWidth || el.getBoundingClientRect().width;

        if (margin) {
          var style = getComputedStyle(el);
          width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
      }

      return 0;
    }
  }, {
    key: "getOuterHeight",
    value: function getOuterHeight(el, margin) {
      if (el) {
        var height = el.offsetHeight || el.getBoundingClientRect().height;

        if (margin) {
          var style = getComputedStyle(el);
          height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
      }

      return 0;
    }
  }, {
    key: "getClientHeight",
    value: function getClientHeight(el, margin) {
      if (el) {
        var height = el.clientHeight;

        if (margin) {
          var style = getComputedStyle(el);
          height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
      }

      return 0;
    }
  }, {
    key: "getClientWidth",
    value: function getClientWidth(el, margin) {
      if (el) {
        var width = el.clientWidth;

        if (margin) {
          var style = getComputedStyle(el);
          width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
      }

      return 0;
    }
  }, {
    key: "getViewport",
    value: function getViewport() {
      var win = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          w = win.innerWidth || e.clientWidth || g.clientWidth,
          h = win.innerHeight || e.clientHeight || g.clientHeight;
      return {
        width: w,
        height: h
      };
    }
  }, {
    key: "getOffset",
    value: function getOffset(el) {
      if (el) {
        var rect = el.getBoundingClientRect();
        return {
          top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
          left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
        };
      }

      return {
        top: 'auto',
        left: 'auto'
      };
    }
  }, {
    key: "index",
    value: function index(element) {
      if (element) {
        var children = element.parentNode.childNodes;
        var num = 0;

        for (var i = 0; i < children.length; i++) {
          if (children[i] === element) return num;
          if (children[i].nodeType === 1) num++;
        }
      }

      return -1;
    }
  }, {
    key: "addMultipleClasses",
    value: function addMultipleClasses(element, className) {
      if (element && className) {
        if (element.classList) {
          var styles = className.split(' ');

          for (var i = 0; i < styles.length; i++) {
            element.classList.add(styles[i]);
          }
        } else {
          var _styles = className.split(' ');

          for (var _i = 0; _i < _styles.length; _i++) {
            element.className += ' ' + _styles[_i];
          }
        }
      }
    }
  }, {
    key: "removeMultipleClasses",
    value: function removeMultipleClasses(element, className) {
      if (element && className) {
        if (element.classList) {
          var styles = className.split(' ');

          for (var i = 0; i < styles.length; i++) {
            element.classList.remove(styles[i]);
          }
        } else {
          var _styles2 = className.split(' ');

          for (var _i2 = 0; _i2 < _styles2.length; _i2++) {
            element.className = element.className.replace(new RegExp('(^|\\b)' + _styles2[_i2].split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        }
      }
    }
  }, {
    key: "addClass",
    value: function addClass(element, className) {
      if (element && className) {
        if (element.classList) element.classList.add(className);else element.className += ' ' + className;
      }
    }
  }, {
    key: "removeClass",
    value: function removeClass(element, className) {
      if (element && className) {
        if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      if (element) {
        if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
      }
    }
  }, {
    key: "find",
    value: function find(element, selector) {
      return element ? Array.from(element.querySelectorAll(selector)) : [];
    }
  }, {
    key: "findSingle",
    value: function findSingle(element, selector) {
      if (element) {
        return element.querySelector(selector);
      }

      return null;
    }
  }, {
    key: "getHeight",
    value: function getHeight(el) {
      if (el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return height;
      }

      return 0;
    }
  }, {
    key: "getWidth",
    value: function getWidth(el) {
      if (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width;
      }

      return 0;
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay(overlay, target, appendTo) {
      var calculateMinWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (overlay && target) {
        if (appendTo === 'self') {
          this.relativePosition(overlay, target);
        } else {
          calculateMinWidth && (overlay.style.minWidth = DomHandler.getOuterWidth(target) + 'px');
          this.absolutePosition(overlay, target);
        }
      }
    }
  }, {
    key: "absolutePosition",
    value: function absolutePosition(element, target) {
      if (element) {
        var elementDimensions = element.offsetParent ? {
          width: element.offsetWidth,
          height: element.offsetHeight
        } : this.getHiddenElementDimensions(element);
        var elementOuterHeight = elementDimensions.height;
        var elementOuterWidth = elementDimensions.width;
        var targetOuterHeight = target.offsetHeight;
        var targetOuterWidth = target.offsetWidth;
        var targetOffset = target.getBoundingClientRect();
        var windowScrollTop = this.getWindowScrollTop();
        var windowScrollLeft = this.getWindowScrollLeft();
        var viewport = this.getViewport();
        var top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
          top = targetOffset.top + windowScrollTop - elementOuterHeight;

          if (top < 0) {
            top = windowScrollTop;
          }

          element.style.transformOrigin = 'bottom';
        } else {
          top = targetOuterHeight + targetOffset.top + windowScrollTop;
          element.style.transformOrigin = 'top';
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);else left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
      }
    }
  }, {
    key: "relativePosition",
    value: function relativePosition(element, target) {
      if (element) {
        var elementDimensions = element.offsetParent ? {
          width: element.offsetWidth,
          height: element.offsetHeight
        } : this.getHiddenElementDimensions(element);
        var targetHeight = target.offsetHeight;
        var targetOffset = target.getBoundingClientRect();
        var viewport = this.getViewport();
        var top, left;

        if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
          top = -1 * elementDimensions.height;

          if (targetOffset.top + top < 0) {
            top = -1 * targetOffset.top;
          }

          element.style.transformOrigin = 'bottom';
        } else {
          top = targetHeight;
          element.style.transformOrigin = 'top';
        }

        if (elementDimensions.width > viewport.width) {
          // element wider then viewport and cannot fit on screen (align at left side of viewport)
          left = targetOffset.left * -1;
        } else if (targetOffset.left + elementDimensions.width > viewport.width) {
          // element wider then viewport but can be fit on screen (align at right side of viewport)
          left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        } else {
          // element fits on screen (align with target)
          left = 0;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
      }
    }
  }, {
    key: "flipfitCollision",
    value: function flipfitCollision(element, target) {
      var _this = this;

      var my = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left top';
      var at = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'left bottom';
      var callback = arguments.length > 4 ? arguments[4] : undefined;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var myArr = my.split(' ');
      var atArr = at.split(' ');

      var getPositionValue = function getPositionValue(arr, isOffset) {
        return isOffset ? +arr.substring(arr.search(/(\+|-)/g)) || 0 : arr.substring(0, arr.search(/(\+|-)/g)) || arr;
      };

      var position = {
        my: {
          x: getPositionValue(myArr[0]),
          y: getPositionValue(myArr[1] || myArr[0]),
          offsetX: getPositionValue(myArr[0], true),
          offsetY: getPositionValue(myArr[1] || myArr[0], true)
        },
        at: {
          x: getPositionValue(atArr[0]),
          y: getPositionValue(atArr[1] || atArr[0]),
          offsetX: getPositionValue(atArr[0], true),
          offsetY: getPositionValue(atArr[1] || atArr[0], true)
        }
      };
      var myOffset = {
        left: function left() {
          var totalOffset = position.my.offsetX + position.at.offsetX;
          return totalOffset + targetOffset.left + (position.my.x === 'left' ? 0 : -1 * (position.my.x === 'center' ? _this.getOuterWidth(element) / 2 : _this.getOuterWidth(element)));
        },
        top: function top() {
          var totalOffset = position.my.offsetY + position.at.offsetY;
          return totalOffset + targetOffset.top + (position.my.y === 'top' ? 0 : -1 * (position.my.y === 'center' ? _this.getOuterHeight(element) / 2 : _this.getOuterHeight(element)));
        }
      };
      var alignWithAt = {
        count: {
          x: 0,
          y: 0
        },
        left: function left() {
          var left = myOffset.left();
          var scrollLeft = DomHandler.getWindowScrollLeft();
          element.style.left = left + scrollLeft + 'px';

          if (this.count.x === 2) {
            element.style.left = scrollLeft + 'px';
            this.count.x = 0;
          } else if (left < 0) {
            this.count.x++;
            position.my.x = 'left';
            position.at.x = 'right';
            position.my.offsetX *= -1;
            position.at.offsetX *= -1;
            this.right();
          }
        },
        right: function right() {
          var left = myOffset.left() + DomHandler.getOuterWidth(target);
          var scrollLeft = DomHandler.getWindowScrollLeft();
          element.style.left = left + scrollLeft + 'px';

          if (this.count.x === 2) {
            element.style.left = viewport.width - DomHandler.getOuterWidth(element) + scrollLeft + 'px';
            this.count.x = 0;
          } else if (left + DomHandler.getOuterWidth(element) > viewport.width) {
            this.count.x++;
            position.my.x = 'right';
            position.at.x = 'left';
            position.my.offsetX *= -1;
            position.at.offsetX *= -1;
            this.left();
          }
        },
        top: function top() {
          var top = myOffset.top();
          var scrollTop = DomHandler.getWindowScrollTop();
          element.style.top = top + scrollTop + 'px';

          if (this.count.y === 2) {
            element.style.left = scrollTop + 'px';
            this.count.y = 0;
          } else if (top < 0) {
            this.count.y++;
            position.my.y = 'top';
            position.at.y = 'bottom';
            position.my.offsetY *= -1;
            position.at.offsetY *= -1;
            this.bottom();
          }
        },
        bottom: function bottom() {
          var top = myOffset.top() + DomHandler.getOuterHeight(target);
          var scrollTop = DomHandler.getWindowScrollTop();
          element.style.top = top + scrollTop + 'px';

          if (this.count.y === 2) {
            element.style.left = viewport.height - DomHandler.getOuterHeight(element) + scrollTop + 'px';
            this.count.y = 0;
          } else if (top + DomHandler.getOuterHeight(target) > viewport.height) {
            this.count.y++;
            position.my.y = 'bottom';
            position.at.y = 'top';
            position.my.offsetY *= -1;
            position.at.offsetY *= -1;
            this.top();
          }
        },
        center: function center(axis) {
          if (axis === 'y') {
            var top = myOffset.top() + DomHandler.getOuterHeight(target) / 2;
            element.style.top = top + DomHandler.getWindowScrollTop() + 'px';

            if (top < 0) {
              this.bottom();
            } else if (top + DomHandler.getOuterHeight(target) > viewport.height) {
              this.top();
            }
          } else {
            var left = myOffset.left() + DomHandler.getOuterWidth(target) / 2;
            element.style.left = left + DomHandler.getWindowScrollLeft() + 'px';

            if (left < 0) {
              this.left();
            } else if (left + DomHandler.getOuterWidth(element) > viewport.width) {
              this.right();
            }
          }
        }
      };
      alignWithAt[position.at.x]('x');
      alignWithAt[position.at.y]('y');

      if (this.isFunction(callback)) {
        callback(position);
      }
    }
  }, {
    key: "findCollisionPosition",
    value: function findCollisionPosition(position) {
      if (position) {
        var isAxisY = position === 'top' || position === 'bottom';
        var myXPosition = position === 'left' ? 'right' : 'left';
        var myYPosition = position === 'top' ? 'bottom' : 'top';

        if (isAxisY) {
          return {
            axis: 'y',
            my: "center ".concat(myYPosition),
            at: "center ".concat(position)
          };
        }

        return {
          axis: 'x',
          my: "".concat(myXPosition, " center"),
          at: "".concat(position, " center")
        };
      }
    }
  }, {
    key: "getParents",
    value: function getParents(element) {
      var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return element['parentNode'] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
    }
  }, {
    key: "getScrollableParents",
    value: function getScrollableParents(element) {
      var scrollableParents = [];

      if (element) {
        var parents = this.getParents(element);
        var overflowRegex = /(auto|scroll)/;

        var overflowCheck = function overflowCheck(node) {
          var styleDeclaration = node ? getComputedStyle(node) : null;
          return styleDeclaration && (overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY')));
        };

        var _iterator = _createForOfIteratorHelper$3(parents),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var parent = _step.value;
            var scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];

            if (scrollSelectors) {
              var selectors = scrollSelectors.split(',');

              var _iterator2 = _createForOfIteratorHelper$3(selectors),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var selector = _step2.value;
                  var el = this.findSingle(parent, selector);

                  if (el && overflowCheck(el)) {
                    scrollableParents.push(el);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            if (parent.nodeType !== 9 && overflowCheck(parent)) {
              scrollableParents.push(parent);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return scrollableParents;
    }
  }, {
    key: "getHiddenElementOuterHeight",
    value: function getHiddenElementOuterHeight(element) {
      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementHeight;
      }

      return 0;
    }
  }, {
    key: "getHiddenElementOuterWidth",
    value: function getHiddenElementOuterWidth(element) {
      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementWidth;
      }

      return 0;
    }
  }, {
    key: "getHiddenElementDimensions",
    value: function getHiddenElementDimensions(element) {
      var dimensions = {};

      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
      }

      return dimensions;
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(element, duration) {
      if (element) {
        element.style.opacity = 0;
        var last = +new Date();
        var opacity = 0;

        var tick = function tick() {
          opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
          element.style.opacity = opacity;
          last = +new Date();

          if (+opacity < 1) {
            window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
          }
        };

        tick();
      }
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(element, duration) {
      if (element) {
        var opacity = 1,
            interval = 50,
            gap = interval / duration;
        var fading = setInterval(function () {
          opacity -= gap;

          if (opacity <= 0) {
            opacity = 0;
            clearInterval(fading);
          }

          element.style.opacity = opacity;
        }, interval);
      }
    }
  }, {
    key: "getUserAgent",
    value: function getUserAgent() {
      return navigator.userAgent;
    }
  }, {
    key: "isIOS",
    value: function isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }
  }, {
    key: "isAndroid",
    value: function isAndroid() {
      return /(android)/i.test(navigator.userAgent);
    }
  }, {
    key: "isTouchDevice",
    value: function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
  }, {
    key: "isFunction",
    value: function isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }
  }, {
    key: "appendChild",
    value: function appendChild(element, target) {
      if (this.isElement(target)) target.appendChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element);else throw new Error('Cannot append ' + target + ' to ' + element);
    }
  }, {
    key: "removeChild",
    value: function removeChild(element, target) {
      if (this.isElement(target)) target.removeChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.removeChild(element);else throw new Error('Cannot remove ' + element + ' from ' + target);
    }
  }, {
    key: "isElement",
    value: function isElement(obj) {
      return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
    }
  }, {
    key: "scrollInView",
    value: function scrollInView(container, item) {
      var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
      var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
      var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
      var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
      var containerRect = container.getBoundingClientRect();
      var itemRect = item.getBoundingClientRect();
      var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
      var scroll = container.scrollTop;
      var elementHeight = container.clientHeight;
      var itemHeight = this.getOuterHeight(item);

      if (offset < 0) {
        container.scrollTop = scroll + offset;
      } else if (offset + itemHeight > elementHeight) {
        container.scrollTop = scroll + offset - elementHeight + itemHeight;
      }
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
          window.getSelection().removeAllRanges();
        }
      } else if (document['selection'] && document['selection'].empty) {
        try {
          document['selection'].empty();
        } catch (error) {//ignore IE bug
        }
      }
    }
  }, {
    key: "calculateScrollbarWidth",
    value: function calculateScrollbarWidth(el) {
      if (el) {
        var style = getComputedStyle(el);
        return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
      } else {
        if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "p-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarWidth;
        return scrollbarWidth;
      }
    }
  }, {
    key: "getBrowser",
    value: function getBrowser() {
      if (!this.browser) {
        var matched = this.resolveUserAgent();
        this.browser = {};

        if (matched.browser) {
          this.browser[matched.browser] = true;
          this.browser['version'] = matched.version;
        }

        if (this.browser['chrome']) {
          this.browser['webkit'] = true;
        } else if (this.browser['webkit']) {
          this.browser['safari'] = true;
        }
      }

      return this.browser;
    }
  }, {
    key: "resolveUserAgent",
    value: function resolveUserAgent() {
      var ua = navigator.userAgent.toLowerCase();
      var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }
  }, {
    key: "isVisible",
    value: function isVisible(element) {
      return element && element.offsetParent != null;
    }
  }, {
    key: "isExist",
    value: function isExist(element) {
      return element !== null && typeof element !== 'undefined' && element.nodeName;
    }
  }, {
    key: "getFocusableElements",
    value: function getFocusableElements(element) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var focusableElements = DomHandler.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])".concat(selector, ",\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector));
      var visibleFocusableElements = [];

      var _iterator3 = _createForOfIteratorHelper$3(focusableElements),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var focusableElement = _step3.value;
          if (getComputedStyle(focusableElement).display !== "none" && getComputedStyle(focusableElement).visibility !== "hidden") visibleFocusableElements.push(focusableElement);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return visibleFocusableElements;
    }
  }, {
    key: "getFirstFocusableElement",
    value: function getFirstFocusableElement(element, selector) {
      var focusableElements = DomHandler.getFocusableElements(element, selector);
      return focusableElements.length > 0 ? focusableElements[0] : null;
    }
  }, {
    key: "getLastFocusableElement",
    value: function getLastFocusableElement(element, selector) {
      var focusableElements = DomHandler.getFocusableElements(element, selector);
      return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
    }
  }, {
    key: "getCursorOffset",
    value: function getCursorOffset(el, prevText, nextText, currentText) {
      if (el) {
        var style = getComputedStyle(el);
        var ghostDiv = document.createElement('div');
        ghostDiv.style.position = 'absolute';
        ghostDiv.style.top = '0px';
        ghostDiv.style.left = '0px';
        ghostDiv.style.visibility = 'hidden';
        ghostDiv.style.pointerEvents = 'none';
        ghostDiv.style.overflow = style.overflow;
        ghostDiv.style.width = style.width;
        ghostDiv.style.height = style.height;
        ghostDiv.style.padding = style.padding;
        ghostDiv.style.border = style.border;
        ghostDiv.style.overflowWrap = style.overflowWrap;
        ghostDiv.style.whiteSpace = style.whiteSpace;
        ghostDiv.style.lineHeight = style.lineHeight;
        ghostDiv.innerHTML = prevText.replace(/\r\n|\r|\n/g, '<br />');
        var ghostSpan = document.createElement('span');
        ghostSpan.textContent = currentText;
        ghostDiv.appendChild(ghostSpan);
        var text = document.createTextNode(nextText);
        ghostDiv.appendChild(text);
        document.body.appendChild(ghostDiv);
        var offsetLeft = ghostSpan.offsetLeft,
            offsetTop = ghostSpan.offsetTop,
            clientHeight = ghostSpan.clientHeight;
        document.body.removeChild(ghostDiv);
        return {
          left: Math.abs(offsetLeft - el.scrollLeft),
          top: Math.abs(offsetTop - el.scrollTop) + clientHeight
        };
      }

      return {
        top: 'auto',
        left: 'auto'
      };
    }
  }, {
    key: "invokeElementMethod",
    value: function invokeElementMethod(element, methodName, args) {
      element[methodName].apply(element, args);
    }
  }, {
    key: "isClickable",
    value: function isClickable(element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === 'INPUT' || targetNode === 'TEXTAREA' || targetNode === 'BUTTON' || targetNode === 'A' || parentNode === 'INPUT' || parentNode === 'TEXTAREA' || parentNode === 'BUTTON' || parentNode === 'A' || this.hasClass(element, 'p-button') || this.hasClass(element.parentElement, 'p-button') || this.hasClass(element.parentElement, 'p-checkbox') || this.hasClass(element.parentElement, 'p-radiobutton');
    }
  }, {
    key: "applyStyle",
    value: function applyStyle(element, style) {
      if (typeof style === 'string') {
        element.style.cssText = this.style;
      } else {
        for (var prop in this.style) {
          element.style[prop] = style[prop];
        }
      }
    }
  }, {
    key: "exportCSV",
    value: function exportCSV(csv, filename) {
      var blob = new Blob([csv], {
        type: 'application/csv;charset=utf-8;'
      });

      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename + '.csv');
      } else {
        var link = document.createElement("a");

        if (link.download !== undefined) {
          link.setAttribute('href', URL.createObjectURL(blob));
          link.setAttribute('download', filename + '.csv');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          csv = 'data:text/csv;charset=utf-8,' + csv;
          window.open(encodeURI(csv));
        }
      }
    }
  }]);

  return DomHandler;
}();

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableBodyCell = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableBodyCell, _Component);

  var _super = _createSuper$5(TreeTableBodyCell);

  function TreeTableBodyCell(props) {
    var _this;

    _classCallCheck(this, TreeTableBodyCell);

    _this = _super.call(this, props);

    if (_this.props.editor) {
      _this.state = {};
    }

    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onEditorFocus = _this.onEditorFocus.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableBodyCell, [{
    key: "onClick",
    value: function onClick() {
      var _this2 = this;

      if (this.props.editor && !this.state.editing && (this.props.selectOnEdit || !this.props.selectOnEdit && this.props.selected)) {
        this.selfClick = true;
        this.setState({
          editing: true
        }, function () {
          _this2.bindDocumentEditListener();

          _this2.overlayEventListener = function (e) {
            if (!_this2.isOutsideClicked(e.target)) {
              _this2.selfClick = true;
            }
          };

          overlayservice.OverlayService.on('overlay-click', _this2.overlayEventListener);
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.which === 13 || event.which === 9) {
        this.switchCellToViewMode(event);
      }
    }
  }, {
    key: "bindDocumentEditListener",
    value: function bindDocumentEditListener() {
      var _this3 = this;

      if (!this.documentEditListener) {
        this.documentEditListener = function (e) {
          if (!_this3.selfClick && _this3.isOutsideClicked(e.target)) {
            _this3.switchCellToViewMode(e);
          }

          _this3.selfClick = false;
        };

        document.addEventListener('click', this.documentEditListener);
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(target) {
      return this.container && !(this.container.isSameNode(target) || this.container.contains(target));
    }
  }, {
    key: "unbindDocumentEditListener",
    value: function unbindDocumentEditListener() {
      if (this.documentEditListener) {
        document.removeEventListener('click', this.documentEditListener);
        this.documentEditListener = null;
        this.selfClick = false;
      }
    }
  }, {
    key: "closeCell",
    value: function closeCell() {
      var _this4 = this;

      /* When using the 'tab' key, the focus event of the next cell is not called in IE. */
      setTimeout(function () {
        _this4.setState({
          editing: false
        }, function () {
          _this4.unbindDocumentEditListener();

          overlayservice.OverlayService.off('overlay-click', _this4.overlayEventListener);
          _this4.overlayEventListener = null;
        });
      }, 1);
    }
  }, {
    key: "onEditorFocus",
    value: function onEditorFocus(event) {
      this.onClick(event);
    }
  }, {
    key: "switchCellToViewMode",
    value: function switchCellToViewMode(event) {
      if (this.props.cellEditValidator) {
        var valid = this.props.cellEditValidator({
          originalEvent: event,
          columnProps: this.props
        });

        if (valid) {
          this.closeCell();
        }
      } else {
        this.closeCell();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this5 = this;

      if (this.container && this.props.editor) {
        clearTimeout(this.tabindexTimeout);

        if (this.state && this.state.editing) {
          var focusable = utils.DomHandler.findSingle(this.container, 'input');

          if (focusable && document.activeElement !== focusable && !focusable.hasAttribute('data-isCellEditing')) {
            focusable.setAttribute('data-isCellEditing', true);
            focusable.focus();
          }

          this.keyHelper.tabIndex = -1;
        } else {
          this.tabindexTimeout = setTimeout(function () {
            if (_this5.keyHelper) {
              _this5.keyHelper.setAttribute('tabindex', 0);
            }
          }, 50);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentEditListener();

      if (this.overlayEventListener) {
        overlayservice.OverlayService.off('overlay-click', this.overlayEventListener);
        this.overlayEventListener = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = utils.classNames(this.props.bodyClassName || this.props.className, {
        'p-editable-column': this.props.editor,
        'p-cell-editing': this.props.editor ? this.state.editing : false
      });
      var style = this.props.bodyStyle || this.props.style;
      var content;

      if (this.state && this.state.editing) {
        if (this.props.editor) content = utils.ObjectUtils.getJSXElement(this.props.editor, {
          node: this.props.node,
          rowData: this.props.node.data,
          value: utils.ObjectUtils.resolveFieldData(this.props.node.data, this.props.field),
          field: this.props.field,
          rowIndex: this.props.rowIndex,
          props: this.props
        });else throw new Error("Editor is not found on column.");
      } else {
        if (this.props.body) content = utils.ObjectUtils.getJSXElement(this.props.body, this.props.node, {
          field: this.props.field,
          rowIndex: this.props.rowIndex,
          props: this.props
        });else content = utils.ObjectUtils.resolveFieldData(this.props.node.data, this.props.field);
      }
      /* eslint-disable */


      var editorKeyHelper = this.props.editor && /*#__PURE__*/React__default["default"].createElement("a", {
        tabIndex: 0,
        ref: function ref(el) {
          _this6.keyHelper = el;
        },
        className: "p-cell-editor-key-helper p-hidden-accessible",
        onFocus: this.onEditorFocus
      }, /*#__PURE__*/React__default["default"].createElement("span", null));
      /* eslint-enable */

      return /*#__PURE__*/React__default["default"].createElement("td", {
        ref: function ref(el) {
          return _this6.container = el;
        },
        className: className,
        style: style,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown
      }, this.props.children, editorKeyHelper, content);
    }
  }]);

  return TreeTableBodyCell;
}(React.Component);

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableRow = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableRow, _Component);

  var _super = _createSuper$4(TreeTableRow);

  function TreeTableRow(props) {
    var _this;

    _classCallCheck(this, TreeTableRow);

    _this = _super.call(this, props);
    _this.onTogglerClick = _this.onTogglerClick.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.propagateUp = _this.propagateUp.bind(_assertThisInitialized(_this));
    _this.onCheckboxChange = _this.onCheckboxChange.bind(_assertThisInitialized(_this));
    _this.onCheckboxFocus = _this.onCheckboxFocus.bind(_assertThisInitialized(_this));
    _this.onCheckboxBlur = _this.onCheckboxBlur.bind(_assertThisInitialized(_this));
    _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableRow, [{
    key: "isLeaf",
    value: function isLeaf() {
      return this.props.node.leaf === false ? false : !(this.props.node.children && this.props.node.children.length);
    }
  }, {
    key: "onTogglerClick",
    value: function onTogglerClick(event) {
      if (this.isExpanded()) this.collapse(event);else this.expand(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "expand",
    value: function expand(event) {
      var expandedKeys = this.props.expandedKeys ? _objectSpread$2({}, this.props.expandedKeys) : {};
      expandedKeys[this.props.node.key] = true;
      this.props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      this.invokeToggleEvents(event, true);
    }
  }, {
    key: "collapse",
    value: function collapse(event) {
      var expandedKeys = _objectSpread$2({}, this.props.expandedKeys);

      delete expandedKeys[this.props.node.key];
      this.props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      this.invokeToggleEvents(event, false);
    }
  }, {
    key: "invokeToggleEvents",
    value: function invokeToggleEvents(event, expanded) {
      if (expanded) {
        if (this.props.onExpand) {
          this.props.onExpand({
            originalEvent: event,
            node: this.props.node
          });
        }
      } else {
        if (this.props.onCollapse) {
          this.props.onCollapse({
            originalEvent: event,
            node: this.props.node
          });
        }
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onRowClick) {
        this.props.onRowClick(event, this.props.node);
      }

      this.nodeTouched = false;
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      this.nodeTouched = true;
    }
  }, {
    key: "onCheckboxChange",
    value: function onCheckboxChange(event) {
      var checked = this.isChecked();
      var selectionKeys = this.props.selectionKeys ? _objectSpread$2({}, this.props.selectionKeys) : {};

      if (checked) {
        if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, false, selectionKeys);else delete selectionKeys[this.props.node.key];

        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
          this.props.onPropagateUp({
            originalEvent: event,
            check: false,
            selectionKeys: selectionKeys
          });
        }

        if (this.props.onUnselect) {
          this.props.onUnselect({
            originalEvent: event,
            node: this.props.node
          });
        }
      } else {
        if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, true, selectionKeys);else selectionKeys[this.props.node.key] = {
          checked: true
        };

        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
          this.props.onPropagateUp({
            originalEvent: event,
            check: true,
            selectionKeys: selectionKeys
          });
        }

        if (this.props.onSelect) {
          this.props.onSelect({
            originalEvent: event,
            node: this.props.node
          });
        }
      }

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          originalEvent: event,
          value: selectionKeys
        });
      }

      utils.DomHandler.clearSelection();
    }
  }, {
    key: "onCheckboxFocus",
    value: function onCheckboxFocus() {
      utils.DomHandler.addClass(this.checkboxBox, 'p-focus');
    }
  }, {
    key: "onCheckboxBlur",
    value: function onCheckboxBlur() {
      utils.DomHandler.removeClass(this.checkboxBox, 'p-focus');
    }
  }, {
    key: "propagateUp",
    value: function propagateUp(event) {
      var check = event.check;
      var selectionKeys = event.selectionKeys;
      var checkedChildCount = 0;
      var childPartialSelected = false;

      var _iterator = _createForOfIteratorHelper$2(this.props.node.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (check && checkedChildCount === this.props.node.children.length) {
        selectionKeys[this.props.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete selectionKeys[this.props.node.key];
        }

        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.props.node.children.length) selectionKeys[this.props.node.key] = {
          checked: false,
          partialChecked: true
        };else selectionKeys[this.props.node.key] = {
          checked: false,
          partialChecked: false
        };
      }

      if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
        this.props.onPropagateUp(event);
      }
    }
  }, {
    key: "propagateDown",
    value: function propagateDown(node, check, selectionKeys) {
      if (check) selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };else delete selectionKeys[node.key];

      if (node.children && node.children.length) {
        for (var i = 0; i < node.children.length; i++) {
          this.propagateDown(node.children[i], check, selectionKeys);
        }
      }
    }
  }, {
    key: "onRightClick",
    value: function onRightClick(event) {
      utils.DomHandler.clearSelection();

      if (this.props.onContextMenuSelectionChange) {
        this.props.onContextMenuSelectionChange({
          originalEvent: event,
          value: this.props.node.key
        });
      }

      if (this.props.onContextMenu) {
        this.props.onContextMenu({
          originalEvent: event,
          node: this.props.node
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.target === this.container) {
        var rowElement = event.currentTarget;

        switch (event.which) {
          //down arrow
          case 40:
            var nextRow = rowElement.nextElementSibling;

            if (nextRow) {
              nextRow.focus();
            }

            event.preventDefault();
            break;
          //up arrow

          case 38:
            var previousRow = rowElement.previousElementSibling;

            if (previousRow) {
              previousRow.focus();
            }

            event.preventDefault();
            break;
          //right arrow

          case 39:
            if (!this.isExpanded()) {
              this.expand(event);
            }

            event.preventDefault();
            break;
          //left arrow

          case 37:
            if (this.isExpanded()) {
              this.collapse(event);
            }

            event.preventDefault();
            break;
          //enter

          case 13:
            this.onClick(event);
            event.preventDefault();
            break;
        }
      }
    }
  }, {
    key: "isExpanded",
    value: function isExpanded() {
      return this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false;
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      if ((this.props.selectionMode === 'single' || this.props.selectionMode === 'multiple') && this.props.selectionKeys) return this.props.selectionMode === 'single' ? this.props.selectionKeys === this.props.node.key : this.props.selectionKeys[this.props.node.key] !== undefined;else return false;
    }
  }, {
    key: "isChecked",
    value: function isChecked() {
      return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].checked : false;
    }
  }, {
    key: "isPartialChecked",
    value: function isPartialChecked() {
      return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].partialChecked : false;
    }
  }, {
    key: "renderToggler",
    value: function renderToggler() {
      var expanded = this.isExpanded();
      var iconClassName = utils.classNames('"p-treetable-toggler-icon pi pi-fw', {
        'pi-chevron-right': !expanded,
        'pi-chevron-down': expanded
      });
      var style = {
        marginLeft: this.props.level * 16 + 'px',
        visibility: this.props.node.leaf === false || this.props.node.children && this.props.node.children.length ? 'visible' : 'hidden'
      };
      return /*#__PURE__*/React__default["default"].createElement("button", {
        type: "button",
        className: "p-treetable-toggler p-link p-unselectable-text",
        onClick: this.onTogglerClick,
        tabIndex: -1,
        style: style
      }, /*#__PURE__*/React__default["default"].createElement("i", {
        className: iconClassName
      }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      var _this2 = this;

      if (this.props.selectionMode === 'checkbox' && this.props.node.selectable !== false) {
        var checked = this.isChecked();
        var partialChecked = this.isPartialChecked();
        var className = utils.classNames('p-checkbox-box', {
          'p-highlight': checked,
          'p-indeterminate': partialChecked
        });
        var icon = utils.classNames('p-checkbox-icon p-c', {
          'pi pi-check': checked,
          'pi pi-minus': partialChecked
        });
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-checkbox p-treetable-checkbox p-component",
          onClick: this.onCheckboxChange,
          role: "checkbox",
          "aria-checked": checked
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React__default["default"].createElement("input", {
          type: "checkbox",
          onFocus: this.onCheckboxFocus,
          onBlur: this.onCheckboxBlur
        })), /*#__PURE__*/React__default["default"].createElement("div", {
          className: className,
          ref: function ref(el) {
            return _this2.checkboxBox = el;
          }
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: icon
        })));
      } else {
        return null;
      }
    }
  }, {
    key: "renderCell",
    value: function renderCell(column) {
      var toggler, checkbox;

      if (column.props.expander) {
        toggler = this.renderToggler();
        checkbox = this.renderCheckbox();
      }

      return /*#__PURE__*/React__default["default"].createElement(TreeTableBodyCell, _extends({
        key: column.props.columnKey || column.props.field
      }, column.props, {
        selectOnEdit: this.props.selectOnEdit,
        selected: this.isSelected(),
        node: this.props.node,
        rowIndex: this.props.rowIndex
      }), toggler, checkbox);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this3 = this;

      if (this.isExpanded() && this.props.node.children) {
        return this.props.node.children.map(function (childNode, index) {
          return /*#__PURE__*/React__default["default"].createElement(TreeTableRow, {
            key: childNode.key || JSON.stringify(childNode.data),
            level: _this3.props.level + 1,
            rowIndex: _this3.props.rowIndex + '_' + index,
            node: childNode,
            columns: _this3.props.columns,
            expandedKeys: _this3.props.expandedKeys,
            selectOnEdit: _this3.props.selectOnEdit,
            onToggle: _this3.props.onToggle,
            onExpand: _this3.props.onExpand,
            onCollapse: _this3.props.onCollapse,
            selectionMode: _this3.props.selectionMode,
            selectionKeys: _this3.props.selectionKeys,
            onSelectionChange: _this3.props.onSelectionChange,
            metaKeySelection: _this3.props.metaKeySelection,
            onRowClick: _this3.props.onRowClick,
            onSelect: _this3.props.onSelect,
            onUnselect: _this3.props.onUnselect,
            propagateSelectionUp: _this3.props.propagateSelectionUp,
            propagateSelectionDown: _this3.props.propagateSelectionDown,
            onPropagateUp: _this3.propagateUp,
            rowClassName: _this3.props.rowClassName,
            contextMenuSelectionKey: _this3.props.contextMenuSelectionKey,
            onContextMenuSelectionChange: _this3.props.onContextMenuSelectionChange,
            onContextMenu: _this3.props.onContextMenu
          });
        });
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var cells = this.props.columns.map(function (col) {
        return _this4.renderCell(col);
      });
      var children = this.renderChildren();
      var className = {
        'p-highlight': this.isSelected(),
        'p-highlight-contextmenu': this.props.contextMenuSelectionKey && this.props.contextMenuSelectionKey === this.props.node.key
      };

      if (this.props.rowClassName) {
        var rowClassName = this.props.rowClassName(this.props.node);
        className = _objectSpread$2(_objectSpread$2({}, className), rowClassName);
      }

      className = utils.classNames(className, this.props.node.className);
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("tr", {
        ref: function ref(el) {
          return _this4.container = el;
        },
        tabIndex: 0,
        className: className,
        style: this.props.node.style,
        onClick: this.onClick,
        onTouchEnd: this.onTouchEnd,
        onContextMenu: this.onRightClick,
        onKeyDown: this.onKeyDown
      }, cells), children);
    }
  }]);

  return TreeTableRow;
}(React.Component);

_defineProperty(TreeTableRow, "defaultProps", {
  node: null,
  level: null,
  columns: null,
  expandedKeys: null,
  contextMenuSelectionKey: null,
  selectionMode: null,
  selectionKeys: null,
  metaKeySelection: true,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  rowClassName: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onRowClick: null,
  onSelect: null,
  onUnselect: null,
  onSelectionChange: null,
  onPropagateUp: null,
  onContextMenuSelectionChange: null,
  onContextMenu: null
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableBody = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableBody, _Component);

  var _super = _createSuper$3(TreeTableBody);

  function TreeTableBody(props) {
    var _this;

    _classCallCheck(this, TreeTableBody);

    _this = _super.call(this, props);
    _this.onRowClick = _this.onRowClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableBody, [{
    key: "createRow",
    value: function createRow(node, index) {
      return /*#__PURE__*/React__default["default"].createElement(TreeTableRow, {
        key: node.key || JSON.stringify(node.data),
        level: 0,
        rowIndex: index,
        selectOnEdit: this.props.selectOnEdit,
        node: node,
        columns: this.props.columns,
        expandedKeys: this.props.expandedKeys,
        onToggle: this.props.onToggle,
        onExpand: this.props.onExpand,
        onCollapse: this.props.onCollapse,
        selectionMode: this.props.selectionMode,
        selectionKeys: this.props.selectionKeys,
        onSelectionChange: this.props.onSelectionChange,
        metaKeySelection: this.props.metaKeySelection,
        onRowClick: this.onRowClick,
        onSelect: this.props.onSelect,
        onUnselect: this.props.onUnselect,
        propagateSelectionUp: this.props.propagateSelectionUp,
        propagateSelectionDown: this.props.propagateSelectionDown,
        rowClassName: this.props.rowClassName,
        contextMenuSelectionKey: this.props.contextMenuSelectionKey,
        onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
        onContextMenu: this.props.onContextMenu
      });
    }
  }, {
    key: "flattenizeTree",
    value: function flattenizeTree(nodes) {
      var rows = [];
      nodes = nodes || this.props.value;

      var _iterator = _createForOfIteratorHelper$1(nodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          rows.push(node.key);

          if (this.isExpandedKey(node.key)) {
            rows = rows.concat(this.flattenizeTree(node.children));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return rows;
    }
  }, {
    key: "isExpandedKey",
    value: function isExpandedKey(key) {
      return this.props.expandedKeys && !!this.props.expandedKeys[key];
    }
  }, {
    key: "onRowClick",
    value: function onRowClick(event, node) {
      var _this2 = this;

      if (this.props.onRowClick) {
        this.props.onRowClick({
          originalEvent: event,
          node: node
        });
      }

      var targetNode = event.target.nodeName;

      if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || DomHandler.hasClass(event.target, 'p-clickable') || DomHandler.hasClass(event.target, 'p-treetable-toggler') || DomHandler.hasClass(event.target.parentElement, 'p-treetable-toggler')) {
        return;
      }

      if ((this.isSingleSelectionMode() || this.isMultipleSelectionMode()) && node.selectable !== false) {
        var selectionKeys;
        var selected = this.isSelected(node);
        var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;
        var flatKeys = this.flattenizeTree();
        var rowIndex = flatKeys.findIndex(function (key) {
          return key === node.key;
        });

        if (this.isMultipleSelectionMode() && event.shiftKey) {
          DomHandler.clearSelection(); // find first selected row

          var anchorRowIndex = flatKeys.findIndex(function (key) {
            return _this2.props.selectionKeys[key];
          });
          var rangeStart = Math.min(rowIndex, anchorRowIndex);
          var rangeEnd = Math.max(rowIndex, anchorRowIndex);
          selectionKeys = _objectSpread$1({}, this.props.selectionKeys);

          for (var i = rangeStart; i <= rangeEnd; i++) {
            var rowKey = flatKeys[i];
            selectionKeys[rowKey] = true;
          }
        } else {
          this.anchorRowIndex = rowIndex;

          if (metaSelection) {
            var metaKey = event.metaKey || event.ctrlKey;

            if (selected && metaKey) {
              if (this.isSingleSelectionMode()) {
                selectionKeys = null;
              } else {
                selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
                delete selectionKeys[node.key];
              }

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  node: node
                });
              }
            } else {
              if (this.isSingleSelectionMode()) {
                selectionKeys = node.key;
              } else if (this.isMultipleSelectionMode()) {
                selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
                selectionKeys[node.key] = true;
              }

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: node
                });
              }
            }
          } else {
            if (this.isSingleSelectionMode()) {
              if (selected) {
                selectionKeys = null;

                if (this.props.onUnselect) {
                  this.props.onUnselect({
                    originalEvent: event,
                    node: node
                  });
                }
              } else {
                selectionKeys = node.key;

                if (this.props.onSelect) {
                  this.props.onSelect({
                    originalEvent: event,
                    node: node
                  });
                }
              }
            } else {
              if (selected) {
                selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
                delete selectionKeys[node.key];

                if (this.props.onUnselect) {
                  this.props.onUnselect({
                    originalEvent: event,
                    node: node
                  });
                }
              } else {
                selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
                selectionKeys[node.key] = true;

                if (this.props.onSelect) {
                  this.props.onSelect({
                    originalEvent: event,
                    node: node
                  });
                }
              }
            }
          }
        }

        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            originalEvent: event,
            value: selectionKeys
          });
        }
      }
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
    key: "isSelected",
    value: function isSelected(node) {
      if ((this.props.selectionMode === 'single' || this.props.selectionMode === 'multiple') && this.props.selectionKeys) return this.props.selectionMode === 'single' ? this.props.selectionKeys === node.key : this.props.selectionKeys[node.key] !== undefined;else return false;
    }
  }, {
    key: "renderRows",
    value: function renderRows() {
      var _this3 = this;

      if (this.props.paginator && !this.props.lazy) {
        var rpp = this.props.rows || 0;
        var startIndex = this.props.first || 0;
        var endIndex = startIndex + rpp;
        var rows = [];

        for (var i = startIndex; i < endIndex; i++) {
          var rowData = this.props.value[i];
          if (rowData) rows.push(this.createRow(this.props.value[i]));else break;
        }

        return rows;
      } else {
        return this.props.value.map(function (node, index) {
          return _this3.createRow(node, index);
        });
      }
    }
  }, {
    key: "renderEmptyMessage",
    value: function renderEmptyMessage() {
      if (this.props.loading) {
        return null;
      } else {
        var colSpan = this.props.columns ? this.props.columns.length : null;
        var content = this.props.emptyMessage || api.localeOption('emptyMessage');
        return /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", {
          className: "p-treetable-emptymessage",
          colSpan: colSpan
        }, content));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.props.value && this.props.value.length ? this.renderRows() : this.renderEmptyMessage();
      return /*#__PURE__*/React__default["default"].createElement("tbody", {
        className: "p-treetable-tbody"
      }, content);
    }
  }]);

  return TreeTableBody;
}(React.Component);

_defineProperty(TreeTableBody, "defaultProps", {
  value: null,
  columns: null,
  expandedKeys: null,
  contextMenuSelectionKey: null,
  paginator: false,
  first: null,
  rows: null,
  selectionMode: null,
  selectionKeys: null,
  metaKeySelection: true,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  lazy: false,
  rowClassName: null,
  emptyMessage: null,
  loading: false,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onRowClick: null,
  onSelect: null,
  onUnselect: null,
  onSelectionChange: null,
  onContextMenuSelectionChange: null,
  onContextMenu: null
});

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableFooter = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableFooter, _Component);

  var _super = _createSuper$2(TreeTableFooter);

  function TreeTableFooter() {
    _classCallCheck(this, TreeTableFooter);

    return _super.apply(this, arguments);
  }

  _createClass(TreeTableFooter, [{
    key: "renderFooterCell",
    value: function renderFooterCell(column, index) {
      return /*#__PURE__*/React__default["default"].createElement("td", {
        key: column.field || index,
        className: column.props.footerClassName || column.props.className,
        style: column.props.footerStyle || column.props.style,
        rowSpan: column.props.rowSpan,
        colSpan: column.props.colSpan
      }, column.props.footer);
    }
  }, {
    key: "renderFooterRow",
    value: function renderFooterRow(row, index) {
      var _this = this;

      var rowColumns = React__default["default"].Children.toArray(row.props.children);
      var rowFooterCells = rowColumns.map(function (col, index) {
        return _this.renderFooterCell(col, index);
      });
      return /*#__PURE__*/React__default["default"].createElement("tr", {
        key: index
      }, rowFooterCells);
    }
  }, {
    key: "renderColumnGroup",
    value: function renderColumnGroup() {
      var _this2 = this;

      var rows = React__default["default"].Children.toArray(this.props.columnGroup.props.children);
      return rows.map(function (row, i) {
        return _this2.renderFooterRow(row, i);
      });
    }
  }, {
    key: "renderColumns",
    value: function renderColumns(columns) {
      var _this3 = this;

      if (columns) {
        var headerCells = columns.map(function (col, index) {
          return _this3.renderFooterCell(col, index);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", null, headerCells);
      } else {
        return null;
      }
    }
  }, {
    key: "hasFooter",
    value: function hasFooter() {
      if (this.props.columnGroup) {
        return true;
      } else {
        for (var i = 0; i < this.props.columns.length; i++) {
          if (this.props.columns[i].props.footer) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.props.columnGroup ? this.renderColumnGroup() : this.renderColumns(this.props.columns);

      if (this.hasFooter()) {
        return /*#__PURE__*/React__default["default"].createElement("tfoot", {
          className: "p-treetable-tfoot"
        }, content);
      } else {
        return null;
      }
    }
  }]);

  return TreeTableFooter;
}(React.Component);

_defineProperty(TreeTableFooter, "defaultProps", {
  columns: null,
  columnGroup: null
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableScrollableView = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableScrollableView, _Component);

  var _super = _createSuper$1(TreeTableScrollableView);

  function TreeTableScrollableView(props) {
    var _this;

    _classCallCheck(this, TreeTableScrollableView);

    _this = _super.call(this, props);
    _this.onHeaderScroll = _this.onHeaderScroll.bind(_assertThisInitialized(_this));
    _this.onBodyScroll = _this.onBodyScroll.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeTableScrollableView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setScrollHeight();

      if (!this.props.frozen) {
        var scrollBarWidth = utils.DomHandler.calculateScrollbarWidth();
        this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';

        if (this.scrollFooterBox) {
          this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
        }
      } else {
        this.scrollBody.style.paddingBottom = utils.DomHandler.calculateScrollbarWidth() + 'px';
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setScrollHeight();
    }
  }, {
    key: "setScrollHeight",
    value: function setScrollHeight() {
      if (this.props.scrollHeight) {
        if (this.props.scrollHeight.indexOf('%') !== -1) {
          var datatableContainer = this.findDataTableContainer(this.container);
          this.scrollBody.style.visibility = 'hidden';
          this.scrollBody.style.height = '100px'; //temporary height to calculate static height

          var containerHeight = utils.DomHandler.getOuterHeight(datatableContainer);
          var relativeHeight = utils.DomHandler.getOuterHeight(datatableContainer.parentElement) * parseInt(this.props.scrollHeight, 10) / 100;
          var staticHeight = containerHeight - 100; //total height of headers, footers, paginators

          var scrollBodyHeight = relativeHeight - staticHeight;
          this.scrollBody.style.height = 'auto';
          this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
          this.scrollBody.style.visibility = 'visible';
        } else {
          this.scrollBody.style.maxHeight = this.props.scrollHeight;
        }
      }
    }
  }, {
    key: "findDataTableContainer",
    value: function findDataTableContainer(element) {
      if (element) {
        var el = element;

        while (el && !utils.DomHandler.hasClass(el, 'p-treetable')) {
          el = el.parentElement;
        }

        return el;
      } else {
        return null;
      }
    }
  }, {
    key: "onHeaderScroll",
    value: function onHeaderScroll() {
      this.scrollHeader.scrollLeft = 0;
    }
  }, {
    key: "onBodyScroll",
    value: function onBodyScroll() {
      var frozenView = this.container.previousElementSibling;
      var frozenScrollBody;

      if (frozenView) {
        frozenScrollBody = utils.DomHandler.findSingle(frozenView, '.p-treetable-scrollable-body');
      }

      this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';

      if (this.scrollFooterBox) {
        this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
      }

      if (frozenScrollBody) {
        frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
      }
    }
  }, {
    key: "calculateRowHeight",
    value: function calculateRowHeight() {
      var row = utils.DomHandler.findSingle(this.scrollTable, 'tr:not(.p-treetable-emptymessage-row)');

      if (row) {
        this.rowHeight = utils.DomHandler.getOuterHeight(row);
      }
    }
  }, {
    key: "renderColGroup",
    value: function renderColGroup() {
      if (this.props.columns && this.props.columns.length) {
        return /*#__PURE__*/React__default["default"].createElement("colgroup", {
          className: "p-treetable-scrollable-colgroup"
        }, this.props.columns.map(function (col, i) {
          return /*#__PURE__*/React__default["default"].createElement("col", {
            key: col.field + '_' + i
          });
        }));
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = utils.classNames('p-treetable-scrollable-view', {
        'p-treetable-frozen-view': this.props.frozen,
        'p-treetable-unfrozen-view': !this.props.frozen && this.props.frozenWidth
      });
      var width = this.props.frozen ? this.props.frozenWidth : 'calc(100% - ' + this.props.frozenWidth + ')';
      var left = this.props.frozen ? null : this.props.frozenWidth;
      var colGroup = this.renderColGroup();
      var scrollableBodyStyle = !this.props.frozen && this.props.scrollHeight ? {
        overflowY: 'scroll'
      } : null;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: className,
        style: {
          width: width,
          left: left
        },
        ref: function ref(el) {
          _this2.container = el;
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-scrollable-header",
        ref: function ref(el) {
          _this2.scrollHeader = el;
        },
        onScroll: this.onHeaderScroll
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-scrollable-header-box",
        ref: function ref(el) {
          _this2.scrollHeaderBox = el;
        }
      }, /*#__PURE__*/React__default["default"].createElement("table", {
        className: "p-treetable-scrollable-header-table"
      }, colGroup, this.props.header))), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-scrollable-body",
        ref: function ref(el) {
          _this2.scrollBody = el;
        },
        style: scrollableBodyStyle,
        onScroll: this.onBodyScroll
      }, /*#__PURE__*/React__default["default"].createElement("table", {
        ref: function ref(el) {
          _this2.scrollTable = el;
        },
        style: {
          top: '0'
        },
        className: "p-treetable-scrollable-body-table"
      }, colGroup, this.props.body)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-scrollable-footer",
        ref: function ref(el) {
          _this2.scrollFooter = el;
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-scrollable-footer-box",
        ref: function ref(el) {
          _this2.scrollFooterBox = el;
        }
      }, /*#__PURE__*/React__default["default"].createElement("table", {
        className: "p-treetable-scrollable-footer-table"
      }, colGroup, this.props.footer))));
    }
  }]);

  return TreeTableScrollableView;
}(React.Component);

_defineProperty(TreeTableScrollableView, "defaultProps", {
  header: null,
  body: null,
  footer: null,
  columns: null,
  frozen: null,
  frozenWidth: null,
  frozenBody: null
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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

          var value1 = utils.ObjectUtils.resolveFieldData(node1.data, sortField);
          var value2 = utils.ObjectUtils.resolveFieldData(node2.data, sortField);
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
      var value1 = utils.ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
      var value2 = utils.ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
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
      var containerLeft = utils.DomHandler.getOffset(this.container).left;
      this.resizeColumn = event.columnEl;
      this.resizeColumnProps = event.column;
      this.columnResizing = true;
      this.lastResizerHelperX = event.originalEvent.pageX - containerLeft + this.container.scrollLeft;
      this.bindColumnResizeEvents();
    }
  }, {
    key: "onColumnResize",
    value: function onColumnResize(event) {
      var containerLeft = utils.DomHandler.getOffset(this.container).left;
      utils.DomHandler.addClass(this.container, 'p-unselectable-text');
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
              var scrollableBodyTable = utils.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-body-table');
              var scrollableHeaderTable = utils.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
              var scrollableFooterTable = utils.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
              var resizeColumnIndex = utils.DomHandler.index(this.resizeColumn);
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

            var _scrollableBodyTable = utils.DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-body-table');

            var _scrollableHeaderTable = utils.DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-header-table');

            var _scrollableFooterTable = utils.DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-footer-table');

            _scrollableBodyTable.style.width = _scrollableBodyTable.offsetWidth + delta + 'px';
            _scrollableHeaderTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';

            if (_scrollableFooterTable) {
              _scrollableFooterTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
            }

            var _resizeColumnIndex = utils.DomHandler.index(this.resizeColumn);

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
      utils.DomHandler.removeClass(this.container, 'p-unselectable-text');
      this.unbindColumnResizeEvents();
    }
  }, {
    key: "findParentScrollableView",
    value: function findParentScrollableView(column) {
      if (column) {
        var parent = column.parentElement;

        while (parent && !utils.DomHandler.hasClass(parent, 'p-treetable-scrollable-view')) {
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
    value: function onColumnDragStart(e) {
      var event = e.originalEvent,
          column = e.column;

      if (this.columnResizing) {
        event.preventDefault();
        return;
      }

      this.iconWidth = utils.DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
      this.iconHeight = utils.DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
      this.draggedColumnEl = this.findParentHeader(event.currentTarget);
      this.draggedColumn = column;
      event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    }
  }, {
    key: "onColumnDragOver",
    value: function onColumnDragOver(e) {
      var event = e.originalEvent;
      var dropHeader = this.findParentHeader(event.currentTarget);

      if (this.props.reorderableColumns && this.draggedColumnEl && dropHeader) {
        event.preventDefault();
        var containerOffset = utils.DomHandler.getOffset(this.container);
        var dropHeaderOffset = utils.DomHandler.getOffset(dropHeader);

        if (this.draggedColumnEl !== dropHeader) {
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
    value: function onColumnDragLeave(e) {
      var event = e.originalEvent;

      if (this.props.reorderableColumns && this.draggedColumnEl) {
        event.preventDefault();
        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
      }
    }
  }, {
    key: "onColumnDrop",
    value: function onColumnDrop(e) {
      var _this5 = this;

      var event = e.originalEvent,
          column = e.column;
      event.preventDefault();

      if (this.draggedColumnEl) {
        var dragIndex = utils.DomHandler.index(this.draggedColumnEl);
        var dropIndex = utils.DomHandler.index(this.findParentHeader(event.currentTarget));
        var allowDrop = dragIndex !== dropIndex;

        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
          allowDrop = false;
        }

        if (allowDrop) {
          var columns = this.state.columnOrder ? this.getColumns() : React__default["default"].Children.toArray(this.props.children);

          var isSameColumn = function isSameColumn(col1, col2) {
            return col1.props.columnKey || col2.props.columnKey ? utils.ObjectUtils.equals(col1, col2, 'props.columnKey') : utils.ObjectUtils.equals(col1, col2, 'props.field');
          };

          var dragColIndex = columns.findIndex(function (child) {
            return isSameColumn(child, _this5.draggedColumn);
          });
          var dropColIndex = columns.findIndex(function (child) {
            return isSameColumn(child, column);
          });

          if (dropColIndex < dragColIndex && this.dropPosition === 1) {
            dropColIndex++;
          }

          if (dropColIndex > dragColIndex && this.dropPosition === -1) {
            dropColIndex--;
          }

          utils.ObjectUtils.reorderArray(columns, dragColIndex, dropColIndex);
          var columnOrder = [];

          var _iterator = _createForOfIteratorHelper(columns),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _column = _step.value;
              columnOrder.push(_column.props.columnKey || _column.props.field);
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
              dragIndex: dragColIndex,
              dropIndex: dropColIndex,
              columns: columns
            });
          }
        }

        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
        this.draggedColumnEl.draggable = false;
        this.draggedColumnEl = null;
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
      var columns = React__default["default"].Children.toArray(this.props.children);

      if (columns && columns.length) {
        if (this.props.reorderableColumns && this.state.columnOrder) {
          var orderedColumns = [];

          var _iterator2 = _createForOfIteratorHelper(this.state.columnOrder),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var columnKey = _step2.value;
              var column = this.findColumnByKey(columns, columnKey);

              if (column) {
                orderedColumns.push(column);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          return [].concat(orderedColumns, _toConsumableArray(columns.filter(function (item) {
            return orderedColumns.indexOf(item) < 0;
          })));
        } else {
          return columns;
        }
      }

      return null;
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

      var _iterator3 = _createForOfIteratorHelper(columns),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var col = _step3.value;

          if (col.props.frozen) {
            frozenColumns = frozenColumns || [];
            frozenColumns.push(col);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return frozenColumns;
    }
  }, {
    key: "getScrollableColumns",
    value: function getScrollableColumns(columns) {
      var scrollableColumns = null;

      var _iterator4 = _createForOfIteratorHelper(columns),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var col = _step4.value;

          if (!col.props.frozen) {
            scrollableColumns = scrollableColumns || [];
            scrollableColumns.push(col);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return scrollableColumns;
    }
  }, {
    key: "filterLocal",
    value: function filterLocal(value) {
      var filteredNodes = [];
      var filters = this.getFilters();
      var columns = React__default["default"].Children.toArray(this.props.children);
      var isStrictMode = this.props.filterMode === 'strict';

      var _iterator5 = _createForOfIteratorHelper(value),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var node = _step5.value;

          var copyNode = _objectSpread({}, node);

          var localMatch = true;
          var globalMatch = false;

          for (var j = 0; j < columns.length; j++) {
            var col = columns[j];
            var filterMeta = filters ? filters[col.props.field] : null;
            var filterField = col.props.field;
            var filterValue = void 0,
                filterConstraint = void 0,
                paramsWithoutNode = void 0,
                options = void 0; //local

            if (filterMeta) {
              var filterMatchMode = filterMeta.matchMode || col.props.filterMatchMode || 'startsWith';
              filterValue = filterMeta.value;
              filterConstraint = filterMatchMode === 'custom' ? col.props.filterFunction : api.FilterService.filters[filterMatchMode];
              options = {
                rowData: node,
                filters: filters,
                props: this.props,
                column: {
                  filterMeta: filterMeta,
                  filterField: filterField,
                  props: col.props
                }
              };
              paramsWithoutNode = {
                filterField: filterField,
                filterValue: filterValue,
                filterConstraint: filterConstraint,
                isStrictMode: isStrictMode,
                options: options
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
              filterConstraint = api.FilterService.filters['contains'];
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
        _iterator5.e(err);
      } finally {
        _iterator5.f();
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

          var _iterator6 = _createForOfIteratorHelper(childNodes),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var childNode = _step6.value;

              var copyChildNode = _objectSpread({}, childNode);

              if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                matched = true;
                node.children.push(copyChildNode);
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
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
          isStrictMode = _ref.isStrictMode,
          options = _ref.options;
      var matched = false;
      var dataFieldValue = utils.ObjectUtils.resolveFieldData(node.data, filterField);

      if (filterConstraint(dataFieldValue, filterValue, this.props.filterLocale, options)) {
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
      return /*#__PURE__*/React__default["default"].createElement(TreeTableHeader, {
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
      return /*#__PURE__*/React__default["default"].createElement(TreeTableFooter, {
        columns: columns,
        columnGroup: columnGroup
      });
    }
  }, {
    key: "createTableBody",
    value: function createTableBody(value, columns) {
      return /*#__PURE__*/React__default["default"].createElement(TreeTableBody, {
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
      var className = utils.classNames('p-paginator-' + position, this.props.paginatorClassName);
      return /*#__PURE__*/React__default["default"].createElement(paginator.Paginator, {
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
      return /*#__PURE__*/React__default["default"].createElement(TreeTableScrollableView, {
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
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-scrollable-wrapper"
      }, frozenView, scrollableView);
    }
  }, {
    key: "renderRegularTable",
    value: function renderRegularTable(value) {
      var _this6 = this;

      var columns = this.getColumns();
      var header = this.createTableHeader(columns, this.props.headerColumnGroup);
      var footer = this.createTableFooter(columns, this.props.footerColumnGroup);
      var body = this.createTableBody(value, columns);
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-wrapper"
      }, /*#__PURE__*/React__default["default"].createElement("table", {
        style: this.props.tableStyle,
        className: this.props.tableClassName,
        ref: function ref(el) {
          return _this6.table = el;
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
        var iconClassName = utils.classNames('p-treetable-loading-icon pi-spin', this.props.loadingIcon);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-treetable-loading"
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-treetable-loading-overlay p-component-overlay"
        }, /*#__PURE__*/React__default["default"].createElement("i", {
          className: iconClassName
        })));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var value = this.processValue();
      var className = utils.classNames('p-treetable p-component', {
        'p-treetable-hoverable-rows': this.isRowSelectionMode(),
        'p-treetable-resizable': this.props.resizableColumns,
        'p-treetable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
        'p-treetable-auto-layout': this.props.autoLayout,
        'p-treetable-striped': this.props.stripedRows,
        'p-treetable-gridlines': this.props.showGridlines
      }, this.props.className);
      var table = this.renderTable(value);
      var totalRecords = this.getTotalRecords(value);
      var headerFacet = this.props.header && /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-header"
      }, this.props.header);
      var footerFacet = this.props.footer && /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-treetable-footer"
      }, this.props.footer);
      var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
      var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
      var loader = this.renderLoader();
      var resizeHelper = this.props.resizableColumns && /*#__PURE__*/React__default["default"].createElement("div", {
        ref: function ref(el) {
          _this7.resizerHelper = el;
        },
        className: "p-column-resizer-helper",
        style: {
          display: 'none'
        }
      });
      var reorderIndicatorUp = this.props.reorderableColumns && /*#__PURE__*/React__default["default"].createElement("span", {
        ref: function ref(el) {
          return _this7.reorderIndicatorUp = el;
        },
        className: "pi pi-arrow-down p-datatable-reorder-indicator-up",
        style: {
          position: 'absolute',
          display: 'none'
        }
      });
      var reorderIndicatorDown = this.props.reorderableColumns && /*#__PURE__*/React__default["default"].createElement("span", {
        ref: function ref(el) {
          return _this7.reorderIndicatorDown = el;
        },
        className: "pi pi-arrow-up p-datatable-reorder-indicator-down",
        style: {
          position: 'absolute',
          display: 'none'
        }
      });
      return /*#__PURE__*/React__default["default"].createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style,
        ref: function ref(el) {
          return _this7.container = el;
        },
        "data-scrollselectors": ".p-treetable-scrollable-body"
      }, loader, headerFacet, paginatorTop, table, paginatorBottom, footerFacet, resizeHelper, reorderIndicatorUp, reorderIndicatorDown);
    }
  }]);

  return TreeTable;
}(React.Component);

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
  emptyMessage: null,
  filters: null,
  globalFilter: null,
  filterMode: 'lenient',
  filterDelay: 300,
  filterLocale: undefined,
  showGridlines: false,
  stripedRows: false,
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

exports.TreeTable = TreeTable;
