import React, { Component } from 'react';
import { DomHandler, classNames, OverlayService, ObjectUtils, Ripple, FilterUtils } from 'primereact/core';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';

function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread();
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

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

        if (DomHandler.hasClass(targetNode, 'p-sortable-column') || DomHandler.hasClass(targetNode, 'p-column-title') || DomHandler.hasClass(targetNode, 'p-sortable-column-icon') || DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
          this.props.onSort({
            originalEvent: event,
            sortField: column.props.sortField || column.props.field,
            sortFunction: column.props.sortFunction,
            sortable: column.props.sortable
          });
          DomHandler.clearSelection();
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
        var _iterator = _createForOfIteratorHelper$2(columns),
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
        var sortIconClassName = classNames('p-sortable-column-icon', 'pi pi-fw', sortIcon);
        return /*#__PURE__*/React.createElement("span", {
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
        return /*#__PURE__*/React.createElement("span", {
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
        return /*#__PURE__*/React.createElement("span", {
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
        filterElement = column.props.filterElement || /*#__PURE__*/React.createElement(InputText, {
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
        return /*#__PURE__*/React.createElement("th", {
          key: column.props.columnKey || column.props.field || options.index,
          className: classNames('p-filter-column', column.props.filterHeaderClassName),
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
        var className = classNames(column.props.headerClassName || column.props.className, {
          'p-sortable-column': column.props.sortable,
          'p-highlight': sorted,
          'p-resizable-column': this.props.resizableColumns
        });
        var resizer = this.renderResizer(column);
        return /*#__PURE__*/React.createElement("th", {
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
        }, resizer, /*#__PURE__*/React.createElement("span", {
          className: "p-column-title"
        }, column.props.header), sortIconElement, sortBadge, filterElement);
      }
    }
  }, {
    key: "renderHeaderRow",
    value: function renderHeaderRow(row, index) {
      var _this5 = this;

      var rowColumns = React.Children.toArray(row.props.children);
      var rowHeaderCells = rowColumns.map(function (col, i) {
        return _this5.renderHeaderCell(col, {
          index: i,
          filterOnly: false,
          renderFilter: true
        });
      });
      return /*#__PURE__*/React.createElement("tr", {
        key: index
      }, rowHeaderCells);
    }
  }, {
    key: "renderColumnGroup",
    value: function renderColumnGroup() {
      var _this6 = this;

      var rows = React.Children.toArray(this.props.columnGroup.props.children);
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
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: false,
              renderFilter: false
            });
          })), /*#__PURE__*/React.createElement("tr", null, columns.map(function (col, i) {
            return _this7.renderHeaderCell(col, {
              index: i,
              filterOnly: true,
              renderFilter: true
            });
          })));
        } else {
          return /*#__PURE__*/React.createElement("tr", null, columns.map(function (col, i) {
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
      return /*#__PURE__*/React.createElement("thead", {
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
}(Component);

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

          OverlayService.on('overlay-click', _this2.overlayEventListener);
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

          OverlayService.off('overlay-click', _this4.overlayEventListener);
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
      if (this.props.editorValidator) {
        var valid = this.props.editorValidator({
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
          var focusable = DomHandler.findSingle(this.container, 'input');

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
        OverlayService.off('overlay-click', this.overlayEventListener);
        this.overlayEventListener = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = classNames(this.props.bodyClassName || this.props.className, {
        'p-editable-column': this.props.editor,
        'p-cell-editing': this.props.editor ? this.state.editing : false
      });
      var style = this.props.bodyStyle || this.props.style;
      var content;

      if (this.state && this.state.editing) {
        if (this.props.editor) content = this.props.editor(this.props);else throw new Error("Editor is not found on column.");
      } else {
        if (this.props.body) content = this.props.body(this.props.node, this.props);else content = ObjectUtils.resolveFieldData(this.props.node.data, this.props.field);
      }
      /* eslint-disable */


      var editorKeyHelper = this.props.editor && /*#__PURE__*/React.createElement("a", {
        tabIndex: 0,
        ref: function ref(el) {
          _this6.keyHelper = el;
        },
        className: "p-cell-editor-key-helper p-hidden-accessible",
        onFocus: this.onEditorFocus
      }, /*#__PURE__*/React.createElement("span", null));
      /* eslint-enable */

      return /*#__PURE__*/React.createElement("td", {
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
}(Component);

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
      var expandedKeys = this.props.expandedKeys ? _objectSpread$1({}, this.props.expandedKeys) : {};
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
      var expandedKeys = _objectSpread$1({}, this.props.expandedKeys);

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
        this.props.onRowClick({
          originalEvent: event,
          node: this.props.node
        });
      }

      var targetNode = event.target.nodeName;

      if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || DomHandler.hasClass(event.target, 'p-clickable') || DomHandler.hasClass(event.target, 'p-treetable-toggler') || DomHandler.hasClass(event.target.parentElement, 'p-treetable-toggler')) {
        return;
      }

      if ((this.isSingleSelectionMode() || this.isMultipleSelectionMode()) && this.props.node.selectable !== false) {
        var selectionKeys;
        var selected = this.isSelected();
        var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;

        if (metaSelection) {
          var metaKey = event.metaKey || event.ctrlKey;

          if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
              selectionKeys = null;
            } else {
              selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
              delete selectionKeys[this.props.node.key];
            }

            if (this.props.onUnselect) {
              this.props.onUnselect({
                originalEvent: event,
                node: this.props.node
              });
            }
          } else {
            if (this.isSingleSelectionMode()) {
              selectionKeys = this.props.node.key;
            } else if (this.isMultipleSelectionMode()) {
              selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
              selectionKeys[this.props.node.key] = true;
            }

            if (this.props.onSelect) {
              this.props.onSelect({
                originalEvent: event,
                node: this.props.node
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
                  node: this.props.node
                });
              }
            } else {
              selectionKeys = this.props.node.key;

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            }
          } else {
            if (selected) {
              selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
              delete selectionKeys[this.props.node.key];

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            } else {
              selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
              selectionKeys[this.props.node.key] = true;

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: this.props.node
                });
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
      var selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};

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

      DomHandler.clearSelection();
    }
  }, {
    key: "onCheckboxFocus",
    value: function onCheckboxFocus() {
      DomHandler.addClass(this.checkboxBox, 'p-focus');
    }
  }, {
    key: "onCheckboxBlur",
    value: function onCheckboxBlur() {
      DomHandler.removeClass(this.checkboxBox, 'p-focus');
    }
  }, {
    key: "propagateUp",
    value: function propagateUp(event) {
      var check = event.check;
      var selectionKeys = event.selectionKeys;
      var checkedChildCount = 0;
      var childPartialSelected = false;

      var _iterator = _createForOfIteratorHelper$1(this.props.node.children),
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
      DomHandler.clearSelection();

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
      var iconClassName = classNames('"p-treetable-toggler-icon pi pi-fw', {
        'pi-chevron-right': !expanded,
        'pi-chevron-down': expanded
      });
      var style = {
        marginLeft: this.props.level * 16 + 'px',
        visibility: this.props.node.leaf === false || this.props.node.children && this.props.node.children.length ? 'visible' : 'hidden'
      };
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-treetable-toggler p-link p-unselectable-text",
        onClick: this.onTogglerClick,
        tabIndex: -1,
        style: style
      }, /*#__PURE__*/React.createElement("i", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      var _this2 = this;

      if (this.props.selectionMode === 'checkbox' && this.props.node.selectable !== false) {
        var checked = this.isChecked();
        var partialChecked = this.isPartialChecked();
        var className = classNames('p-checkbox-box', {
          'p-highlight': checked,
          'p-indeterminate': partialChecked
        });
        var icon = classNames('p-checkbox-icon p-c', {
          'pi pi-check': checked,
          'pi pi-minus': partialChecked
        });
        return /*#__PURE__*/React.createElement("div", {
          className: "p-checkbox p-treetable-checkbox p-component",
          onClick: this.onCheckboxChange,
          role: "checkbox",
          "aria-checked": checked
        }, /*#__PURE__*/React.createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          onFocus: this.onCheckboxFocus,
          onBlur: this.onCheckboxBlur
        })), /*#__PURE__*/React.createElement("div", {
          className: className,
          ref: function ref(el) {
            return _this2.checkboxBox = el;
          }
        }, /*#__PURE__*/React.createElement("span", {
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

      return /*#__PURE__*/React.createElement(TreeTableBodyCell, _extends({
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
          return /*#__PURE__*/React.createElement(TreeTableRow, {
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
        className = _objectSpread$1(_objectSpread$1({}, className), rowClassName);
      }

      className = classNames(className, this.props.node.className);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", {
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
}(Component);

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

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TreeTableBody = /*#__PURE__*/function (_Component) {
  _inherits(TreeTableBody, _Component);

  var _super = _createSuper$3(TreeTableBody);

  function TreeTableBody() {
    _classCallCheck(this, TreeTableBody);

    return _super.apply(this, arguments);
  }

  _createClass(TreeTableBody, [{
    key: "createRow",
    value: function createRow(node, index) {
      return /*#__PURE__*/React.createElement(TreeTableRow, {
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
        onRowClick: this.props.onRowClick,
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
    key: "renderRows",
    value: function renderRows() {
      var _this = this;

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
          return _this.createRow(node, index);
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
        return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
          className: "p-treetable-emptymessage",
          colSpan: colSpan
        }, this.props.emptyMessage));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.props.value && this.props.value.length ? this.renderRows() : this.renderEmptyMessage();
      return /*#__PURE__*/React.createElement("tbody", {
        className: "p-treetable-tbody"
      }, content);
    }
  }]);

  return TreeTableBody;
}(Component);

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
  emptyMessage: "No records found",
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
      return /*#__PURE__*/React.createElement("td", {
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

      var rowColumns = React.Children.toArray(row.props.children);
      var rowFooterCells = rowColumns.map(function (col, index) {
        return _this.renderFooterCell(col, index);
      });
      return /*#__PURE__*/React.createElement("tr", {
        key: index
      }, rowFooterCells);
    }
  }, {
    key: "renderColumnGroup",
    value: function renderColumnGroup() {
      var _this2 = this;

      var rows = React.Children.toArray(this.props.columnGroup.props.children);
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
        return /*#__PURE__*/React.createElement("tr", null, headerCells);
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
        return /*#__PURE__*/React.createElement("tfoot", {
          className: "p-treetable-tfoot"
        }, content);
      } else {
        return null;
      }
    }
  }]);

  return TreeTableFooter;
}(Component);

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
        var scrollBarWidth = DomHandler.calculateScrollbarWidth();
        this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';

        if (this.scrollFooterBox) {
          this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
        }
      } else {
        this.scrollBody.style.paddingBottom = DomHandler.calculateScrollbarWidth() + 'px';
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

          var containerHeight = DomHandler.getOuterHeight(datatableContainer);
          var relativeHeight = DomHandler.getOuterHeight(datatableContainer.parentElement) * parseInt(this.props.scrollHeight, 10) / 100;
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

        while (el && !DomHandler.hasClass(el, 'p-treetable')) {
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
        frozenScrollBody = DomHandler.findSingle(frozenView, '.p-treetable-scrollable-body');
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
      var row = DomHandler.findSingle(this.scrollTable, 'tr:not(.p-treetable-emptymessage-row)');

      if (row) {
        this.rowHeight = DomHandler.getOuterHeight(row);
      }
    }
  }, {
    key: "renderColGroup",
    value: function renderColGroup() {
      if (this.props.columns && this.props.columns.length) {
        return /*#__PURE__*/React.createElement("colgroup", {
          className: "p-treetable-scrollable-colgroup"
        }, this.props.columns.map(function (col, i) {
          return /*#__PURE__*/React.createElement("col", {
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

      var className = classNames('p-treetable-scrollable-view', {
        'p-treetable-frozen-view': this.props.frozen,
        'p-treetable-unfrozen-view': !this.props.frozen && this.props.frozenWidth
      });
      var width = this.props.frozen ? this.props.frozenWidth : 'calc(100% - ' + this.props.frozenWidth + ')';
      var left = this.props.frozen ? null : this.props.frozenWidth;
      var colGroup = this.renderColGroup();
      var scrollableBodyStyle = !this.props.frozen && this.props.scrollHeight ? {
        overflowY: 'scroll'
      } : null;
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        style: {
          width: width,
          left: left
        },
        ref: function ref(el) {
          _this2.container = el;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-scrollable-header",
        ref: function ref(el) {
          _this2.scrollHeader = el;
        },
        onScroll: this.onHeaderScroll
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-scrollable-header-box",
        ref: function ref(el) {
          _this2.scrollHeaderBox = el;
        }
      }, /*#__PURE__*/React.createElement("table", {
        className: "p-treetable-scrollable-header-table"
      }, colGroup, this.props.header))), /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-scrollable-body",
        ref: function ref(el) {
          _this2.scrollBody = el;
        },
        style: scrollableBodyStyle,
        onScroll: this.onBodyScroll
      }, /*#__PURE__*/React.createElement("table", {
        ref: function ref(el) {
          _this2.scrollTable = el;
        },
        style: {
          top: '0'
        },
        className: "p-treetable-scrollable-body-table"
      }, colGroup, this.props.body)), /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-scrollable-footer",
        ref: function ref(el) {
          _this2.scrollFooter = el;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-scrollable-footer-box",
        ref: function ref(el) {
          _this2.scrollFooterBox = el;
        }
      }, /*#__PURE__*/React.createElement("table", {
        className: "p-treetable-scrollable-footer-table"
      }, colGroup, this.props.footer))));
    }
  }]);

  return TreeTableScrollableView;
}(Component);

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

          var value1 = ObjectUtils.resolveFieldData(node1.data, sortField);
          var value2 = ObjectUtils.resolveFieldData(node2.data, sortField);
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
      var value1 = ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
      var value2 = ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
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
      var containerLeft = DomHandler.getOffset(this.container).left;
      this.resizeColumn = event.columnEl;
      this.resizeColumnProps = event.column;
      this.columnResizing = true;
      this.lastResizerHelperX = event.originalEvent.pageX - containerLeft + this.container.scrollLeft;
      this.bindColumnResizeEvents();
    }
  }, {
    key: "onColumnResize",
    value: function onColumnResize(event) {
      var containerLeft = DomHandler.getOffset(this.container).left;
      DomHandler.addClass(this.container, 'p-unselectable-text');
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
              var scrollableBodyTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-body-table');
              var scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
              var scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
              var resizeColumnIndex = DomHandler.index(this.resizeColumn);
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

            var _scrollableBodyTable = DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-body-table');

            var _scrollableHeaderTable = DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-header-table');

            var _scrollableFooterTable = DomHandler.findSingle(_scrollableView, 'table.p-treetable-scrollable-footer-table');

            _scrollableBodyTable.style.width = _scrollableBodyTable.offsetWidth + delta + 'px';
            _scrollableHeaderTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';

            if (_scrollableFooterTable) {
              _scrollableFooterTable.style.width = _scrollableHeaderTable.offsetWidth + delta + 'px';
            }

            var _resizeColumnIndex = DomHandler.index(this.resizeColumn);

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
      DomHandler.removeClass(this.container, 'p-unselectable-text');
      this.unbindColumnResizeEvents();
    }
  }, {
    key: "findParentScrollableView",
    value: function findParentScrollableView(column) {
      if (column) {
        var parent = column.parentElement;

        while (parent && !DomHandler.hasClass(parent, 'p-treetable-scrollable-view')) {
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

      this.iconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
      this.iconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
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
        var containerOffset = DomHandler.getOffset(this.container);
        var dropHeaderOffset = DomHandler.getOffset(dropHeader);

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
        var dragIndex = DomHandler.index(this.draggedColumnEl);
        var dropIndex = DomHandler.index(this.findParentHeader(event.currentTarget));
        var allowDrop = dragIndex !== dropIndex;

        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
          allowDrop = false;
        }

        if (allowDrop) {
          var columns = this.state.columnOrder ? this.getColumns() : React.Children.toArray(this.props.children);

          var isSameColumn = function isSameColumn(col1, col2) {
            return col1.props.columnKey || col2.props.columnKey ? ObjectUtils.equals(col1, col2, 'props.columnKey') : ObjectUtils.equals(col1, col2, 'props.field');
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

          ObjectUtils.reorderArray(columns, dragColIndex, dropColIndex);
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
      var columns = React.Children.toArray(this.props.children);

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
      var columns = React.Children.toArray(this.props.children);
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
              var filterMatchMode = filterMeta.matchMode || col.props.filterMatchMode;
              filterValue = filterMeta.value;
              filterConstraint = filterMatchMode === 'custom' ? col.props.filterFunction : FilterUtils[filterMatchMode];
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
              filterConstraint = FilterUtils['contains'];
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
      var dataFieldValue = ObjectUtils.resolveFieldData(node.data, filterField);

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
      return /*#__PURE__*/React.createElement(TreeTableHeader, {
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
      return /*#__PURE__*/React.createElement(TreeTableFooter, {
        columns: columns,
        columnGroup: columnGroup
      });
    }
  }, {
    key: "createTableBody",
    value: function createTableBody(value, columns) {
      return /*#__PURE__*/React.createElement(TreeTableBody, {
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
      var className = classNames('p-paginator-' + position, this.props.paginatorClassName);
      return /*#__PURE__*/React.createElement(Paginator, {
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
      return /*#__PURE__*/React.createElement(TreeTableScrollableView, {
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
      return /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-wrapper"
      }, /*#__PURE__*/React.createElement("table", {
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
        var iconClassName = classNames('p-treetable-loading-icon pi-spin', this.props.loadingIcon);
        return /*#__PURE__*/React.createElement("div", {
          className: "p-treetable-loading"
        }, /*#__PURE__*/React.createElement("div", {
          className: "p-treetable-loading-overlay p-component-overlay"
        }, /*#__PURE__*/React.createElement("i", {
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
      var className = classNames('p-treetable p-component', {
        'p-treetable-hoverable-rows': this.isRowSelectionMode(),
        'p-treetable-resizable': this.props.resizableColumns,
        'p-treetable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
        'p-treetable-auto-layout': this.props.autoLayout,
        'p-treetable-striped': this.props.stripedRows,
        'p-treetable-gridlines': this.props.showGridlines
      }, this.props.className);
      var table = this.renderTable(value);
      var totalRecords = this.getTotalRecords(value);
      var headerFacet = this.props.header && /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-header"
      }, this.props.header);
      var footerFacet = this.props.footer && /*#__PURE__*/React.createElement("div", {
        className: "p-treetable-footer"
      }, this.props.footer);
      var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
      var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
      var loader = this.renderLoader();
      var resizeHelper = this.props.resizableColumns && /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          _this7.resizerHelper = el;
        },
        className: "p-column-resizer-helper",
        style: {
          display: 'none'
        }
      });
      var reorderIndicatorUp = this.props.reorderableColumns && /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this7.reorderIndicatorUp = el;
        },
        className: "pi pi-arrow-down p-datatable-reorder-indicator-up",
        style: {
          position: 'absolute',
          display: 'none'
        }
      });
      var reorderIndicatorDown = this.props.reorderableColumns && /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this7.reorderIndicatorDown = el;
        },
        className: "pi pi-arrow-up p-datatable-reorder-indicator-down",
        style: {
          position: 'absolute',
          display: 'none'
        }
      });
      return /*#__PURE__*/React.createElement("div", {
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
}(Component);

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

export { TreeTable };
