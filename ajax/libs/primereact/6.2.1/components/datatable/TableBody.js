"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableBody = void 0;

var _react = _interopRequireWildcard(require("react"));

var _BodyRow = require("./BodyRow");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _RowTogglerButton = require("./RowTogglerButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var TableBody = /*#__PURE__*/function (_Component) {
  _inherits(TableBody, _Component);

  var _super = _createSuper(TableBody);

  function TableBody(props) {
    var _this;

    _classCallCheck(this, TableBody);

    _this = _super.call(this, props);
    _this.onRowClick = _this.onRowClick.bind(_assertThisInitialized(_this));
    _this.onRowRightClick = _this.onRowRightClick.bind(_assertThisInitialized(_this));
    _this.onRowTouchEnd = _this.onRowTouchEnd.bind(_assertThisInitialized(_this));
    _this.onRowToggle = _this.onRowToggle.bind(_assertThisInitialized(_this));
    _this.onRowEditingToggle = _this.onRowEditingToggle.bind(_assertThisInitialized(_this));
    _this.onRadioClick = _this.onRadioClick.bind(_assertThisInitialized(_this));
    _this.onCheckboxClick = _this.onCheckboxClick.bind(_assertThisInitialized(_this));
    _this.onRowDragEnd = _this.onRowDragEnd.bind(_assertThisInitialized(_this));
    _this.onRowDragLeave = _this.onRowDragLeave.bind(_assertThisInitialized(_this));
    _this.onRowDrop = _this.onRowDrop.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableBody, [{
    key: "onRowClick",
    value: function onRowClick(event) {
      var targetNode = event.originalEvent.target.nodeName;

      if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || _DomHandler.default.hasClass(event.originalEvent.target, 'p-clickable')) {
        return;
      }

      if (this.props.onRowClick) {
        this.props.onRowClick(event);
      }

      if (this.props.selectionMode) {
        var rowData = event.data;
        var rowIndex = event.index;
        var selection;

        if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex !== null) {
          _DomHandler.default.clearSelection();

          this.rangeRowIndex = rowIndex;
          selection = this.selectRange(event);
        } else {
          var selected = this.isSelected(rowData);
          var metaSelection = this.rowTouched ? false : this.props.metaKeySelection;
          this.anchorRowIndex = rowIndex;
          this.rangeRowIndex = rowIndex;
          this.anchorRowFirst = this.props.first;

          if (metaSelection) {
            var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

            if (selected && metaKey) {
              if (this.isSingleSelectionMode()) {
                selection = null;
              } else {
                var selectionIndex = this.findIndexInSelection(rowData);
                selection = this.props.selection.filter(function (val, i) {
                  return i !== selectionIndex;
                });
              }

              if (this.props.onRowUnselect) {
                this.props.onRowUnselect({
                  originalEvent: event.originalEvent,
                  data: rowData,
                  type: 'row'
                });
              }
            } else {
              if (this.isSingleSelectionMode()) {
                selection = rowData;
              } else if (this.isMultipleSelectionMode()) {
                if (metaKey) selection = this.props.selection ? _toConsumableArray(this.props.selection) : [];else selection = [];
                selection = [].concat(_toConsumableArray(selection), [rowData]);
              }

              if (this.props.onRowSelect) {
                this.props.onRowSelect({
                  originalEvent: event.originalEvent,
                  data: rowData,
                  type: 'row'
                });
              }
            }
          } else {
            if (this.isSingleSelectionMode()) {
              if (selected) {
                selection = null;

                if (this.props.onRowUnselect) {
                  this.props.onRowUnselect({
                    originalEvent: event.originalEvent,
                    data: rowData,
                    type: 'row'
                  });
                }
              } else {
                selection = rowData;

                if (this.props.onRowSelect) {
                  this.props.onRowSelect({
                    originalEvent: event.originalEvent,
                    data: rowData,
                    type: 'row'
                  });
                }
              }
            } else {
              if (selected) {
                var _selectionIndex = this.findIndexInSelection(rowData);

                selection = this.props.selection.filter(function (val, i) {
                  return i !== _selectionIndex;
                });

                if (this.props.onRowSelect) {
                  this.props.onRowSelect({
                    originalEvent: event.originalEvent,
                    data: rowData,
                    type: 'row'
                  });
                }
              } else {
                selection = [].concat(_toConsumableArray(this.props.selection || []), [rowData]);

                if (this.props.onRowSelect) {
                  this.props.onRowSelect({
                    originalEvent: event.originalEvent,
                    data: rowData,
                    type: 'row'
                  });
                }
              }
            }
          }
        }

        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            originalEvent: event.originalEvent,
            value: selection
          });
        }
      }

      this.rowTouched = false;
    }
  }, {
    key: "selectRange",
    value: function selectRange(event) {
      var rangeStart, rangeEnd;
      var isLazyAndPaginator = this.props.lazy && this.props.paginator;

      if (isLazyAndPaginator) {
        this.anchorRowIndex += this.anchorRowFirst;
        this.rangeRowIndex += this.props.first;
      }

      if (this.rangeRowIndex > this.anchorRowIndex) {
        rangeStart = this.anchorRowIndex;
        rangeEnd = this.rangeRowIndex;
      } else if (this.rangeRowIndex < this.anchorRowIndex) {
        rangeStart = this.rangeRowIndex;
        rangeEnd = this.anchorRowIndex;
      } else {
        rangeStart = this.rangeRowIndex;
        rangeEnd = this.rangeRowIndex;
      }

      if (isLazyAndPaginator) {
        rangeStart = Math.max(rangeStart - this.props.first, 0);
        rangeEnd -= this.props.first;
      }

      var value = this.props.value;
      var selection = [];

      for (var i = rangeStart; i <= rangeEnd; i++) {
        var rangeRowData = value[i];
        selection.push(rangeRowData);

        if (this.props.onRowSelect) {
          this.props.onRowSelect({
            originalEvent: event.originalEvent,
            data: rangeRowData,
            type: 'row'
          });
        }
      }

      return selection;
    }
  }, {
    key: "onRowTouchEnd",
    value: function onRowTouchEnd(event) {
      this.rowTouched = true;
    }
  }, {
    key: "onRowRightClick",
    value: function onRowRightClick(event) {
      if (this.props.onContextMenu) {
        _DomHandler.default.clearSelection();

        if (this.props.onContextMenuSelectionChange) {
          this.props.onContextMenuSelectionChange({
            originalEvent: event.originalEvent,
            value: event.data
          });
        }

        if (this.props.onContextMenu) {
          this.props.onContextMenu({
            originalEvent: event.originalEvent,
            value: this.props.node
          });
        }

        event.originalEvent.preventDefault();
      }
    }
  }, {
    key: "onRadioClick",
    value: function onRadioClick(event) {
      var rowData = event.data;
      var selection;

      if (this.isSelected(rowData)) {
        selection = null;

        if (this.props.onRowUnselect) {
          this.props.onRowUnselect({
            originalEvent: event.originalEvent,
            data: rowData,
            type: 'radio'
          });
        }
      } else {
        selection = rowData;

        if (this.props.onRowSelect) {
          this.props.onRowSelect({
            originalEvent: event.originalEvent,
            data: rowData,
            type: 'radio'
          });
        }
      }

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          originalEvent: event.originalEvent,
          value: selection
        });
      }
    }
  }, {
    key: "onCheckboxClick",
    value: function onCheckboxClick(event) {
      var rowData = event.data;
      var selection;

      if (this.isSelected(rowData)) {
        var selectionIndex = this.findIndexInSelection(rowData);
        selection = this.props.selection.filter(function (val, i) {
          return i !== selectionIndex;
        });

        if (this.props.onRowUnselect) {
          this.props.onRowUnselect({
            originalEvent: event.originalEvent,
            data: rowData,
            type: 'checkbox'
          });
        }
      } else {
        selection = [].concat(_toConsumableArray(this.props.selection || []), [rowData]);

        if (this.props.onRowSelect) {
          this.props.onRowSelect({
            originalEvent: event.originalEvent,
            data: rowData,
            type: 'checkbox'
          });
        }
      }

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          originalEvent: event.originalEvent,
          value: selection
        });
      }
    }
  }, {
    key: "isSingleSelectionMode",
    value: function isSingleSelectionMode() {
      return this.props.selectionMode === 'single';
    }
  }, {
    key: "isMultipleSelectionMode",
    value: function isMultipleSelectionMode() {
      return this.props.selectionMode === 'multiple';
    }
  }, {
    key: "isSelected",
    value: function isSelected(rowData) {
      if (rowData && this.props.selection) {
        if (this.props.selection instanceof Array) return this.findIndexInSelection(rowData) > -1;else return this.equals(rowData, this.props.selection);
      }

      return false;
    }
  }, {
    key: "isContextMenuSelected",
    value: function isContextMenuSelected(rowData) {
      if (rowData && this.props.contextMenuSelection) {
        return this.equals(rowData, this.props.contextMenuSelection);
      }

      return false;
    }
  }, {
    key: "equals",
    value: function equals(data1, data2) {
      return this.compareSelectionBy === 'equals' ? data1 === data2 : _ObjectUtils.default.equals(data1, data2, this.props.dataKey);
    }
  }, {
    key: "findIndexInSelection",
    value: function findIndexInSelection(rowData) {
      var index = -1;

      if (this.props.selection) {
        for (var i = 0; i < this.props.selection.length; i++) {
          if (this.equals(rowData, this.props.selection[i])) {
            index = i;
            break;
          }
        }
      }

      return index;
    }
  }, {
    key: "onRowToggle",
    value: function onRowToggle(event) {
      var expandedRows;
      var dataKey = this.props.dataKey;

      if (dataKey) {
        var dataKeyValue = String(_ObjectUtils.default.resolveFieldData(event.data, dataKey));
        expandedRows = this.props.expandedRows ? _objectSpread({}, this.props.expandedRows) : {};

        if (expandedRows[dataKeyValue] != null) {
          delete expandedRows[dataKeyValue];

          if (this.props.onRowCollapse) {
            this.props.onRowCollapse({
              originalEvent: event,
              data: event.data
            });
          }
        } else {
          expandedRows[dataKeyValue] = true;

          if (this.props.onRowExpand) {
            this.props.onRowExpand({
              originalEvent: event,
              data: event.data
            });
          }
        }
      } else {
        var expandedRowIndex = this.findRowIndex(this.props.expandedRows, event.data);
        expandedRows = this.props.expandedRows ? _toConsumableArray(this.props.expandedRows) : [];

        if (expandedRowIndex !== -1) {
          expandedRows = expandedRows.filter(function (val, i) {
            return i !== expandedRowIndex;
          });

          if (this.props.onRowCollapse) {
            this.props.onRowCollapse({
              originalEvent: event,
              data: event.data
            });
          }
        } else {
          expandedRows.push(event.data);

          if (this.props.onRowExpand) {
            this.props.onRowExpand({
              originalEvent: event,
              data: event.data
            });
          }
        }
      }

      if (this.props.onRowToggle) {
        this.props.onRowToggle({
          data: expandedRows
        });
      }
    }
  }, {
    key: "findRowIndex",
    value: function findRowIndex(rows, row) {
      var index = -1;

      if (rows) {
        rows.some(function (r, i) {
          return _ObjectUtils.default.equals(rows[i], row) ? (index = i, true) : false;
        });
      }

      return index;
    }
  }, {
    key: "isRowExpanded",
    value: function isRowExpanded(row) {
      var dataKey = this.props.dataKey;

      if (dataKey) {
        var dataKeyValue = String(_ObjectUtils.default.resolveFieldData(row, dataKey));
        return this.props.expandedRows && this.props.expandedRows[dataKeyValue] != null;
      } else {
        return this.findRowIndex(this.props.expandedRows, row) !== -1;
      }
    }
  }, {
    key: "onRowEditingToggle",
    value: function onRowEditingToggle(event) {
      var editingRows;
      var dataKey = this.props.dataKey;

      if (dataKey) {
        var dataKeyValue = String(_ObjectUtils.default.resolveFieldData(event.data, dataKey));
        editingRows = this.props.editingRows ? _objectSpread({}, this.props.editingRows) : {};
        if (editingRows[dataKeyValue] != null) delete editingRows[dataKeyValue];else editingRows[dataKeyValue] = true;
      } else {
        var editingRowIndex = this.findRowIndex(this.props.editingRows, event.data);
        editingRows = this.props.editingRows ? _toConsumableArray(this.props.editingRows) : [];
        if (editingRowIndex !== -1) editingRows = editingRows.filter(function (val, i) {
          return i !== editingRowIndex;
        });else editingRows.push(event.data);
      }

      if (this.props.onRowEditChange) {
        this.props.onRowEditChange({
          originalEvent: event.originalEvent,
          data: editingRows,
          index: event.rowIndex
        });
      }
    }
  }, {
    key: "isRowEditing",
    value: function isRowEditing(row) {
      var dataKey = this.props.dataKey;

      if (dataKey) {
        var dataKeyValue = String(_ObjectUtils.default.resolveFieldData(row, dataKey));
        return this.props.editingRows && this.props.editingRows[dataKeyValue] != null;
      } else {
        return this.findRowIndex(this.props.editingRows, row) !== -1;
      }
    }
  }, {
    key: "isSelectionEnabled",
    value: function isSelectionEnabled() {
      if (this.props.selectionMode || this.props.frozenSelectionMode != null) {
        return true;
      } else {
        if (Array.isArray(this.props.children)) {
          for (var i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i].props.selectionMode) {
              return true;
            }
          }
        } else {
          return this.props.children && this.props.children.selectionMode != null;
        }
      }

      return false;
    }
  }, {
    key: "onRowDragStart",
    value: function onRowDragStart(event, index) {
      this.rowDragging = true;
      this.draggedRowIndex = index;
      event.dataTransfer.setData('text', 'b'); // For firefox
    }
  }, {
    key: "onRowDragEnd",
    value: function onRowDragEnd(event, index) {
      this.rowDragging = false;
      this.draggedRowIndex = null;
      this.droppedRowIndex = null;
    }
  }, {
    key: "onRowDragOver",
    value: function onRowDragOver(event, index) {
      if (this.rowDragging && this.draggedRowIndex !== index) {
        var rowElement = event.rowElement;

        var rowY = _DomHandler.default.getOffset(rowElement).top + _DomHandler.default.getWindowScrollTop();

        var pageY = event.originalEvent.pageY;
        var rowMidY = rowY + _DomHandler.default.getOuterHeight(rowElement) / 2;
        var prevRowElement = rowElement.previousElementSibling;

        if (pageY < rowMidY) {
          _DomHandler.default.removeClass(rowElement, 'p-datatable-dragpoint-bottom');

          this.droppedRowIndex = index;
          if (prevRowElement) _DomHandler.default.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');else _DomHandler.default.addClass(rowElement, 'p-datatable-dragpoint-top');
        } else {
          if (prevRowElement) _DomHandler.default.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');else _DomHandler.default.addClass(rowElement, 'p-datatable-dragpoint-top');
          this.droppedRowIndex = index + 1;

          _DomHandler.default.addClass(rowElement, 'p-datatable-dragpoint-bottom');
        }
      }
    }
  }, {
    key: "onRowDragLeave",
    value: function onRowDragLeave(event) {
      var rowElement = event.rowElement;
      var prevRowElement = rowElement.previousElementSibling;

      if (prevRowElement) {
        _DomHandler.default.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
      }

      _DomHandler.default.removeClass(rowElement, 'p-datatable-dragpoint-bottom');

      _DomHandler.default.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }
  }, {
    key: "onRowDrop",
    value: function onRowDrop(event) {
      if (this.droppedRowIndex != null) {
        var dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;

        var val = _toConsumableArray(this.props.value);

        _ObjectUtils.default.reorderArray(val, this.draggedRowIndex, dropIndex);

        if (this.props.onRowReorder) {
          this.props.onRowReorder({
            originalEvent: event,
            value: val,
            dragIndex: this.draggedRowIndex,
            dropIndex: this.droppedRowIndex
          });
        }
      } //cleanup


      this.onRowDragLeave(event);
      this.onRowDragEnd(event);
    }
  }, {
    key: "renderRowGroupHeader",
    value: function renderRowGroupHeader(rowData, index) {
      var content = null;

      if (this.props.rowGroupMode === 'subheader' && this.props.expandableRowGroups) {
        content = /*#__PURE__*/_react.default.createElement(_RowTogglerButton.RowTogglerButton, {
          onClick: this.onRowToggle,
          rowData: rowData,
          expanded: this.isRowExpanded(rowData)
        });
      }

      return /*#__PURE__*/_react.default.createElement("tr", {
        role: "row",
        key: index + '_rowgroupheader',
        className: "p-rowgroup-header"
      }, /*#__PURE__*/_react.default.createElement("td", {
        role: "cell",
        colSpan: _react.default.Children.count(this.props.children)
      }, content, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-rowgroup-header-name"
      }, this.props.rowGroupHeaderTemplate(rowData, index))));
    }
  }, {
    key: "renderRowGroupFooter",
    value: function renderRowGroupFooter(rowData, index) {
      return /*#__PURE__*/_react.default.createElement("tr", {
        role: "row",
        key: index + '_rowgroupfooter',
        className: "p-rowgroup-footer"
      }, this.props.rowGroupFooterTemplate(rowData, index));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var rows;

      if (this.props.children) {
        var rpp = this.props.rows || 0;
        var first = this.props.first || 0;
        var selectionEnabled = this.isSelectionEnabled();
        var rowGroupMode = this.props.rowGroupMode;
        var hasSubheaderGrouping = rowGroupMode && rowGroupMode === 'subheader';
        var rowSpanGrouping = rowGroupMode && rowGroupMode === 'rowspan';
        var rowGroupHeaderExpanded = false;

        if (this.props.value && this.props.value.length) {
          rows = [];
          var startIndex = this.props.lazy ? 0 : this.props.value.length > first ? first : 0;
          var endIndex = this.props.virtualScroll ? startIndex + rpp * 2 : startIndex + rpp || this.props.value.length;

          var _loop = function _loop(i) {
            if (i >= _this2.props.value.length) {
              return "break";
            }

            var rowData = _this2.props.value[i];

            var expanded = _this2.isRowExpanded(rowData);

            var editing = _this2.isRowEditing(rowData);

            var selected = selectionEnabled ? _this2.isSelected(_this2.props.value[i]) : false;

            var contextMenuSelected = _this2.isContextMenuSelected(rowData);

            var groupRowSpan = void 0; //header row group

            if (hasSubheaderGrouping) {
              var currentRowFieldData = _ObjectUtils.default.resolveFieldData(rowData, _this2.props.groupField);

              var previousRowFieldData = _ObjectUtils.default.resolveFieldData(_this2.props.value[i - 1], _this2.props.groupField);

              if (i === 0 || currentRowFieldData !== previousRowFieldData) {
                rows.push(_this2.renderRowGroupHeader(rowData, i));
                rowGroupHeaderExpanded = expanded;
              }
            }

            if (rowSpanGrouping) {
              var rowSpanIndex = i;

              var _currentRowFieldData = _ObjectUtils.default.resolveFieldData(rowData, _this2.props.sortField);

              var shouldCountRowSpan = i === startIndex || _ObjectUtils.default.resolveFieldData(_this2.props.value[i - 1], _this2.props.sortField) !== _currentRowFieldData;

              if (shouldCountRowSpan) {
                var nextRowFieldData = _currentRowFieldData;
                groupRowSpan = 0;

                while (_currentRowFieldData === nextRowFieldData) {
                  groupRowSpan++;
                  var nextRowData = _this2.props.value[++rowSpanIndex];

                  if (nextRowData) {
                    nextRowFieldData = _ObjectUtils.default.resolveFieldData(nextRowData, _this2.props.sortField);
                  } else {
                    break;
                  }
                }
              }
            }

            var isRowGroupExpanded = _this2.props.expandableRowGroups && hasSubheaderGrouping && rowGroupHeaderExpanded;

            if (!_this2.props.expandableRowGroups || isRowGroupExpanded) {
              //row content
              var bodyRow = /*#__PURE__*/_react.default.createElement(_BodyRow.BodyRow, {
                tableId: _this2.props.tableId,
                key: i,
                value: _this2.props.value,
                rowData: rowData,
                rowIndex: i,
                onClick: _this2.onRowClick,
                onDoubleClick: _this2.props.onRowDoubleClick,
                onRightClick: _this2.onRowRightClick,
                onTouchEnd: _this2.onRowTouchEnd,
                onRowToggle: _this2.onRowToggle,
                expanded: expanded,
                selectionMode: _this2.props.selectionMode,
                selectOnEdit: _this2.props.selectOnEdit,
                onRadioClick: _this2.onRadioClick,
                onCheckboxClick: _this2.onCheckboxClick,
                selected: selected,
                contextMenuSelected: contextMenuSelected,
                rowClassName: _this2.props.rowClassName,
                sortField: _this2.props.sortField,
                rowGroupMode: _this2.props.rowGroupMode,
                groupRowSpan: groupRowSpan,
                onDragStart: function onDragStart(e) {
                  return _this2.onRowDragStart(e, i);
                },
                onDragEnd: _this2.onRowDragEnd,
                onDragOver: function onDragOver(e) {
                  return _this2.onRowDragOver(e, i);
                },
                onDragLeave: _this2.onRowDragLeave,
                onDrop: _this2.onRowDrop,
                virtualScroll: _this2.props.virtualScroll,
                virtualRowHeight: _this2.props.virtualRowHeight,
                editMode: _this2.props.editMode,
                editing: editing,
                isRowEditingControlled: !!_this2.props.onRowEditChange,
                rowEditorValidator: _this2.props.rowEditorValidator,
                onRowEditInit: _this2.props.onRowEditInit,
                onRowEditSave: _this2.props.onRowEditSave,
                onRowEditCancel: _this2.props.onRowEditCancel,
                onRowEditingToggle: _this2.onRowEditingToggle,
                showRowReorderElement: _this2.props.showRowReorderElement,
                showSelectionElement: _this2.props.showSelectionElement
              }, _this2.props.children);

              rows.push(bodyRow);
            } //row expansion


            if (expanded && !(hasSubheaderGrouping && _this2.props.expandableRowGroups)) {
              var expandedRowContent = _this2.props.rowExpansionTemplate(rowData);

              var id = "".concat(_this2.props.tableId ? _this2.props.tableId + '_' : '', "content_").concat(i, "_expanded");

              var expandedRow = /*#__PURE__*/_react.default.createElement("tr", {
                key: id,
                id: id,
                role: "row"
              }, /*#__PURE__*/_react.default.createElement("td", {
                role: "cell",
                colSpan: _this2.props.children.length
              }, expandedRowContent));

              rows.push(expandedRow);
            } //footer row group


            if (hasSubheaderGrouping && (!_this2.props.expandableRowGroups || isRowGroupExpanded)) {
              var _currentRowFieldData2 = _ObjectUtils.default.resolveFieldData(rowData, _this2.props.groupField);

              var _nextRowFieldData = _ObjectUtils.default.resolveFieldData(_this2.props.value[i + 1], _this2.props.groupField);

              if (i === _this2.props.value.length - 1 || _currentRowFieldData2 !== _nextRowFieldData) {
                rows.push(_this2.renderRowGroupFooter(rowData, i));
              }
            }
          };

          for (var i = startIndex; i < endIndex; i++) {
            var _ret = _loop(i);

            if (_ret === "break") break;
          }
        } else {
          var emptyMessage = this.props.emptyMessage;
          rows = !this.props.loading && emptyMessage !== null ? /*#__PURE__*/_react.default.createElement("tr", {
            role: "row",
            className: "p-datatable-emptymessage"
          }, /*#__PURE__*/_react.default.createElement("td", {
            role: "cell",
            colSpan: this.props.children.length
          }, typeof emptyMessage === 'function' ? emptyMessage(this.props.frozen) : emptyMessage)) : null;
        }
      }

      return /*#__PURE__*/_react.default.createElement("tbody", {
        className: "p-datatable-tbody"
      }, rows);
    }
  }]);

  return TableBody;
}(_react.Component);

exports.TableBody = TableBody;