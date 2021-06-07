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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    _this.onDragSelectionMouseMove = _this.onDragSelectionMouseMove.bind(_assertThisInitialized(_this));
    _this.onDragSelectionMouseUp = _this.onDragSelectionMouseUp.bind(_assertThisInitialized(_this));
    _this.onRowDragEnd = _this.onRowDragEnd.bind(_assertThisInitialized(_this));
    _this.onRowDragLeave = _this.onRowDragLeave.bind(_assertThisInitialized(_this));
    _this.onRowDrop = _this.onRowDrop.bind(_assertThisInitialized(_this));
    _this.onRowMouseDown = _this.onRowMouseDown.bind(_assertThisInitialized(_this));
    _this.onRowMouseUp = _this.onRowMouseUp.bind(_assertThisInitialized(_this));
    _this.onCellClick = _this.onCellClick.bind(_assertThisInitialized(_this));
    _this.onCellMouseDown = _this.onCellMouseDown.bind(_assertThisInitialized(_this));
    _this.onCellMouseUp = _this.onCellMouseUp.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableBody, [{
    key: "onRowClick",
    value: function onRowClick(event) {
      if (this.allowCellSelection() || !this.allowSelection(event)) {
        return;
      }

      this.props.onRowClick && this.props.onRowClick(event);

      if (this.allowRowSelection()) {
        if (this.allowRangeSelection(event)) {
          this.onRangeSelection(event);
        } else {
          var toggleable = this.isRadioSelectionModeInColumn() || this.isCheckboxSelectionModeInColumn() || this.allowMetaKeySelection(event);
          this.anchorRowIndex = event.index;
          this.rangeRowIndex = event.index;
          this.anchorRowFirst = this.props.first;

          if (this.isSingleSelection()) {
            this.onSingleSelection(_objectSpread(_objectSpread({}, event), {}, {
              toggleable: toggleable,
              type: 'row'
            }));
          } else {
            this.onMultipleSelection(_objectSpread(_objectSpread({}, event), {}, {
              toggleable: toggleable,
              type: 'row'
            }));
          }
        }
      } else {
        this.focusOnElement(event.originalEvent);
      }

      this.rowTouched = false;
    }
  }, {
    key: "onCellClick",
    value: function onCellClick(event) {
      if (!this.allowSelection(event)) {
        return;
      }

      this.props.onCellClick && this.props.onCellClick(event);

      if (this.allowCellSelection()) {
        if (this.allowRangeSelection(event)) {
          this.onRangeSelection(event);
        } else {
          var toggleable = this.allowMetaKeySelection(event);

          var originalEvent = event.originalEvent,
              data = _objectWithoutProperties(event, ["originalEvent"]);

          this.anchorRowIndex = event.rowIndex;
          this.rangeRowIndex = event.rowIndex;
          this.anchorRowFirst = this.props.first;
          this.anchorCellIndex = event.cellIndex;

          if (this.isSingleSelection()) {
            this.onSingleSelection({
              originalEvent: originalEvent,
              data: data,
              toggleable: toggleable,
              type: 'cell'
            });
          } else {
            this.onMultipleSelection({
              originalEvent: originalEvent,
              data: data,
              toggleable: toggleable,
              type: 'cell'
            });
          }
        }
      }

      this.rowTouched = false;
    }
  }, {
    key: "onSingleSelection",
    value: function onSingleSelection(_ref) {
      var originalEvent = _ref.originalEvent,
          data = _ref.data,
          toggleable = _ref.toggleable,
          type = _ref.type;
      var selected = this.isSelected(data);
      var selection = this.props.selection;

      if (selected) {
        if (toggleable) {
          selection = null;
          this.onUnselect({
            originalEvent: originalEvent,
            data: data,
            type: type
          });
        }
      } else {
        selection = data;
        this.onSelect({
          originalEvent: originalEvent,
          data: data,
          type: type
        });
      }

      this.focusOnElement(originalEvent, true);

      if (this.props.onSelectionChange && selection !== this.props.selection) {
        this.props.onSelectionChange({
          originalEvent: originalEvent,
          value: selection
        });
      }
    }
  }, {
    key: "onMultipleSelection",
    value: function onMultipleSelection(_ref2) {
      var _this2 = this;

      var originalEvent = _ref2.originalEvent,
          data = _ref2.data,
          toggleable = _ref2.toggleable,
          type = _ref2.type;
      var selected = this.isSelected(data);
      var selection = this.props.selection || [];

      if (selected) {
        if (toggleable) {
          var selectionIndex = this.findIndexInSelection(data);
          selection = this.props.selection.filter(function (val, i) {
            return i !== selectionIndex;
          });
          this.onUnselect({
            originalEvent: originalEvent,
            data: data,
            type: type
          });
        } else if (selection.length) {
          this.props.selection.forEach(function (d) {
            return _this2.onUnselect({
              originalEvent: originalEvent,
              data: d,
              type: type
            });
          });
          selection = [data];
          this.onSelect({
            originalEvent: originalEvent,
            data: data,
            type: type
          });
        }
      } else {
        selection = toggleable && this.isMultipleSelection() ? [].concat(_toConsumableArray(selection), [data]) : [data];
        this.onSelect({
          originalEvent: originalEvent,
          data: data,
          type: type
        });
      }

      this.focusOnElement(originalEvent, true);

      if (this.props.onSelectionChange && selection !== this.props.selection) {
        this.props.onSelectionChange({
          originalEvent: originalEvent,
          value: selection
        });
      }
    }
  }, {
    key: "onRangeSelection",
    value: function onRangeSelection(event) {
      _DomHandler.default.clearSelection();

      this.rangeRowIndex = this.allowCellSelection() ? event.rowIndex : event.index;
      var selectionInRange = this.selectRange(event);
      var selection = this.isMultipleSelection() ? _toConsumableArray(new Set([].concat(_toConsumableArray(this.props.selection || []), _toConsumableArray(selectionInRange)))) : selectionInRange;

      if (this.props.onSelectionChange && selection !== this.props.selection) {
        this.props.onSelectionChange({
          originalEvent: event.originalEvent,
          value: selection
        });
      }

      this.anchorRowIndex = this.rangeRowIndex;
      this.anchorCellIndex = event.cellIndex;
      this.focusOnElement(event.originalEvent, false);
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
        rangeStart = rangeEnd = this.rangeRowIndex;
      }

      if (isLazyAndPaginator) {
        rangeStart = Math.max(rangeStart - this.props.first, 0);
        rangeEnd -= this.props.first;
      }

      return this.allowCellSelection() ? this.selectRangeOnCell(event, rangeStart, rangeEnd) : this.selectRangeOnRow(event, rangeStart, rangeEnd);
    }
  }, {
    key: "selectRangeOnRow",
    value: function selectRangeOnRow(event, rowRangeStart, rowRangeEnd) {
      var value = this.props.value;
      var selection = [];

      for (var i = rowRangeStart; i <= rowRangeEnd; i++) {
        var rangeRowData = value[i];
        selection.push(rangeRowData);
        this.onSelect({
          originalEvent: event.originalEvent,
          data: rangeRowData,
          type: 'row'
        });
      }

      return selection;
    }
  }, {
    key: "selectRangeOnCell",
    value: function selectRangeOnCell(event, rowRangeStart, rowRangeEnd) {
      var cellRangeStart,
          cellRangeEnd,
          cellIndex = event.cellIndex;

      if (cellIndex > this.anchorCellIndex) {
        cellRangeStart = this.anchorCellIndex;
        cellRangeEnd = cellIndex;
      } else if (cellIndex < this.anchorCellIndex) {
        cellRangeStart = cellIndex;
        cellRangeEnd = this.anchorCellIndex;
      } else {
        cellRangeStart = cellRangeEnd = cellIndex;
      }

      var value = this.props.value;
      var selection = [];

      for (var i = rowRangeStart; i <= rowRangeEnd; i++) {
        var rowData = value[i];

        var columns = _react.default.Children.toArray(this.props.children);

        for (var j = cellRangeStart; j <= cellRangeEnd; j++) {
          var field = columns[j].props.field;
          var rangeRowData = {
            value: _ObjectUtils.default.resolveFieldData(rowData, field),
            field: field,
            rowData: rowData,
            rowIndex: i,
            cellIndex: j,
            selected: true
          };
          selection.push(rangeRowData);
          this.onSelect({
            originalEvent: event.originalEvent,
            data: rangeRowData,
            type: 'cell'
          });
        }
      }

      return selection;
    }
  }, {
    key: "onSelect",
    value: function onSelect(event) {
      if (this.allowCellSelection()) this.props.onCellSelect && this.props.onCellSelect(_objectSpread(_objectSpread({
        originalEvent: event.originalEvent
      }, event.data), {}, {
        type: event.type
      }));else this.props.onRowSelect && this.props.onRowSelect(event);
    }
  }, {
    key: "onUnselect",
    value: function onUnselect(event) {
      if (this.allowCellSelection()) this.props.onCellUnselect && this.props.onCellUnselect(_objectSpread(_objectSpread({
        originalEvent: event.originalEvent
      }, event.data), {}, {
        type: event.type
      }));else this.props.onRowUnselect && this.props.onRowUnselect(event);
    }
  }, {
    key: "enableDragSelection",
    value: function enableDragSelection(event) {
      if (this.props.dragSelection && !this.dragSelectionHelper) {
        this.dragSelectionHelper = document.createElement('div');

        _DomHandler.default.addClass(this.dragSelectionHelper, 'p-datatable-drag-selection-helper');

        this.initialDragPosition = {
          x: event.clientX,
          y: event.clientY
        };
        this.dragSelectionHelper.style.top = "".concat(event.pageY, "px");
        this.dragSelectionHelper.style.left = "".concat(event.pageX, "px");
        this.bindDragSelectionEvents();
      }
    }
  }, {
    key: "bindDragSelectionEvents",
    value: function bindDragSelectionEvents() {
      document.addEventListener('mousemove', this.onDragSelectionMouseMove);
      document.addEventListener('mouseup', this.onDragSelectionMouseUp);
      document.body.appendChild(this.dragSelectionHelper);
    }
  }, {
    key: "unbindDragSelectionEvents",
    value: function unbindDragSelectionEvents() {
      this.onDragSelectionMouseUp();
    }
  }, {
    key: "onDragSelectionMouseMove",
    value: function onDragSelectionMouseMove(event) {
      var _this$initialDragPosi = this.initialDragPosition,
          x = _this$initialDragPosi.x,
          y = _this$initialDragPosi.y;
      var dx = event.clientX - x;
      var dy = event.clientY - y;
      if (dy < 0) this.dragSelectionHelper.style.top = "".concat(event.pageY + 5, "px");
      if (dx < 0) this.dragSelectionHelper.style.left = "".concat(event.pageX + 5, "px");
      this.dragSelectionHelper.style.height = "".concat(Math.abs(dy), "px");
      this.dragSelectionHelper.style.width = "".concat(Math.abs(dx), "px");
      event.preventDefault();
    }
  }, {
    key: "onDragSelectionMouseUp",
    value: function onDragSelectionMouseUp() {
      if (this.dragSelectionHelper) {
        this.dragSelectionHelper.remove();
        this.dragSelectionHelper = null;
      }

      document.removeEventListener('mousemove', this.onDragSelectionMouseMove);
      document.removeEventListener('mouseup', this.onDragSelectionMouseUp);
    }
  }, {
    key: "onRowMouseDown",
    value: function onRowMouseDown(event) {
      _DomHandler.default.clearSelection();

      if (this.allowRowDrag(event)) {
        this.enableDragSelection(event.originalEvent);
        this.anchorRowIndex = event.index;
        this.rangeRowIndex = event.index;
        this.anchorRowFirst = this.props.first;
      }
    }
  }, {
    key: "onRowMouseUp",
    value: function onRowMouseUp(event) {
      var isSameRow = event.index === this.anchorRowIndex;

      if (this.allowRowDrag(event) && !isSameRow) {
        this.onRangeSelection(event);
      }
    }
  }, {
    key: "onCellMouseDown",
    value: function onCellMouseDown(event) {
      if (this.allowCellDrag(event)) {
        this.enableDragSelection(event.originalEvent);
        this.anchorRowIndex = event.rowIndex;
        this.rangeRowIndex = event.rowIndex;
        this.anchorRowFirst = this.props.first;
        this.anchorCellIndex = event.cellIndex;
      }
    }
  }, {
    key: "onCellMouseUp",
    value: function onCellMouseUp(event) {
      var isSameCell = event.rowIndex === this.anchorRowIndex && event.cellIndex === this.anchorCellIndex;

      if (this.allowCellDrag(event) && !isSameCell) {
        this.onRangeSelection(event);
      }
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
            data: event.data
          });
        }

        event.originalEvent.preventDefault();
      }
    }
  }, {
    key: "onRadioClick",
    value: function onRadioClick(event) {
      this.onSingleSelection(_objectSpread(_objectSpread({}, event), {}, {
        toggleable: true,
        type: 'radio'
      }));
    }
  }, {
    key: "onCheckboxClick",
    value: function onCheckboxClick(event) {
      this.onMultipleSelection(_objectSpread(_objectSpread({}, event), {}, {
        toggleable: true,
        type: 'checkbox'
      }));
    }
  }, {
    key: "allowDrag",
    value: function allowDrag(event) {
      return this.props.dragSelection && this.isMultipleSelection() && !event.originalEvent.shiftKey;
    }
  }, {
    key: "allowRowDrag",
    value: function allowRowDrag(event) {
      return !this.allowCellSelection() && this.allowDrag(event);
    }
  }, {
    key: "allowCellDrag",
    value: function allowCellDrag(event) {
      return this.allowCellSelection() && this.allowDrag(event);
    }
  }, {
    key: "allowSelection",
    value: function allowSelection(event) {
      var targetNode = event.originalEvent.target.nodeName;

      if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || _DomHandler.default.hasClass(event.originalEvent.target, 'p-clickable')) {
        return false;
      }

      return true;
    }
  }, {
    key: "allowMetaKeySelection",
    value: function allowMetaKeySelection(event) {
      return !this.rowTouched && (!this.props.metaKeySelection || this.props.metaKeySelection && (event.originalEvent.metaKey || event.originalEvent.ctrlKey));
    }
  }, {
    key: "allowRangeSelection",
    value: function allowRangeSelection(event) {
      return this.isMultipleSelection() && event.originalEvent.shiftKey && this.anchorRowIndex !== null;
    }
  }, {
    key: "allowRowSelection",
    value: function allowRowSelection() {
      return (this.props.selectionMode || this.props.selectionModeInColumn) && !this.isRadioOnlySelection() && !this.isCheckboxOnlySelection();
    }
  }, {
    key: "allowCellSelection",
    value: function allowCellSelection() {
      return this.props.cellSelection && !this.isRadioSelectionModeInColumn() && !this.isCheckboxSelectionModeInColumn();
    }
  }, {
    key: "isRadioSelectionMode",
    value: function isRadioSelectionMode() {
      return this.props.selectionMode === 'radiobutton';
    }
  }, {
    key: "isCheckboxSelectionMode",
    value: function isCheckboxSelectionMode() {
      return this.props.selectionMode === 'checkbox';
    }
  }, {
    key: "isRadioSelectionModeInColumn",
    value: function isRadioSelectionModeInColumn() {
      return this.props.selectionModeInColumn === 'single';
    }
  }, {
    key: "isCheckboxSelectionModeInColumn",
    value: function isCheckboxSelectionModeInColumn() {
      return this.props.selectionModeInColumn === 'multiple';
    }
  }, {
    key: "isSingleSelection",
    value: function isSingleSelection() {
      return this.props.selectionMode === 'single' && !this.isCheckboxSelectionModeInColumn() || !this.isRadioSelectionMode() && this.isRadioSelectionModeInColumn();
    }
  }, {
    key: "isMultipleSelection",
    value: function isMultipleSelection() {
      return this.props.selectionMode === 'multiple' && !this.isRadioSelectionModeInColumn() || this.isCheckboxSelectionModeInColumn();
    }
  }, {
    key: "isRadioOnlySelection",
    value: function isRadioOnlySelection() {
      return this.isRadioSelectionMode() && this.isRadioSelectionModeInColumn();
    }
  }, {
    key: "isCheckboxOnlySelection",
    value: function isCheckboxOnlySelection() {
      return this.isCheckboxSelectionMode() && this.isCheckboxSelectionModeInColumn();
    }
  }, {
    key: "isSelected",
    value: function isSelected(rowData) {
      if (rowData && this.props.selection) {
        return this.props.selection instanceof Array ? this.findIndexInSelection(rowData) > -1 : this.equals(rowData, this.props.selection);
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
    key: "focusOnElement",
    value: function focusOnElement(event, isFocused) {
      var target = event.currentTarget;

      if (!this.allowCellSelection()) {
        if (this.isCheckboxSelectionModeInColumn()) {
          var checkbox = _DomHandler.default.findSingle(target, 'td.p-selection-column .p-checkbox-box');

          checkbox && checkbox.focus();
        } else if (this.isRadioSelectionModeInColumn()) {
          var radio = _DomHandler.default.findSingle(target, 'td.p-selection-column input[type="radio"]');

          radio && radio.focus();
        }
      }

      !isFocused && target && target.focus();
    }
  }, {
    key: "equals",
    value: function equals(data1, data2) {
      if (this.allowCellSelection()) return (data1.rowIndex === data2.rowIndex || data1.rowData === data2.rowData) && (data1.field === data2.field || data1.cellIndex === data2.cellIndex);else return this.compareSelectionBy === 'equals' ? data1 === data2 : _ObjectUtils.default.equals(data1, data2, this.props.dataKey);
    }
  }, {
    key: "findIndexInSelection",
    value: function findIndexInSelection(data) {
      var _this3 = this;

      return this.props.selection ? this.props.selection.findIndex(function (d) {
        return _this3.equals(data, d);
      }) : -1;
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
      return rows ? rows.findIndex(function (r) {
        return _ObjectUtils.default.equals(row, r);
      }) : -1;
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
      if (this.props.selectionMode || this.props.selectionModeInColumn != null) {
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.dragSelection) {
        this.unbindDragSelectionEvents();
      }
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
      var _this4 = this;

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
            if (i >= _this4.props.value.length) {
              return "break";
            }

            var rowData = _this4.props.value[i];

            var expanded = _this4.isRowExpanded(rowData);

            var editing = _this4.isRowEditing(rowData);

            var selected = selectionEnabled ? _this4.isSelected(_this4.props.value[i]) : false;

            var contextMenuSelected = _this4.isContextMenuSelected(rowData);

            var groupRowSpan = void 0; //header row group

            if (hasSubheaderGrouping) {
              var currentRowFieldData = _ObjectUtils.default.resolveFieldData(rowData, _this4.props.groupField);

              var previousRowFieldData = _ObjectUtils.default.resolveFieldData(_this4.props.value[i - 1], _this4.props.groupField);

              if (i === 0 || currentRowFieldData !== previousRowFieldData) {
                rows.push(_this4.renderRowGroupHeader(rowData, i));
                rowGroupHeaderExpanded = expanded;
              }
            }

            if (rowSpanGrouping) {
              var rowSpanIndex = i;

              var _currentRowFieldData = _ObjectUtils.default.resolveFieldData(rowData, _this4.props.sortField);

              var shouldCountRowSpan = i === startIndex || _ObjectUtils.default.resolveFieldData(_this4.props.value[i - 1], _this4.props.sortField) !== _currentRowFieldData;

              if (shouldCountRowSpan) {
                var nextRowFieldData = _currentRowFieldData;
                groupRowSpan = 0;

                while (_currentRowFieldData === nextRowFieldData) {
                  groupRowSpan++;
                  var nextRowData = _this4.props.value[++rowSpanIndex];

                  if (nextRowData) {
                    nextRowFieldData = _ObjectUtils.default.resolveFieldData(nextRowData, _this4.props.sortField);
                  } else {
                    break;
                  }
                }
              }
            }

            var isRowGroupExpanded = _this4.props.expandableRowGroups && hasSubheaderGrouping && rowGroupHeaderExpanded;

            if (!_this4.props.expandableRowGroups || isRowGroupExpanded) {
              //row content
              var bodyRow = /*#__PURE__*/_react.default.createElement(_BodyRow.BodyRow, {
                tableId: _this4.props.tableId,
                key: i,
                value: _this4.props.value,
                rowData: rowData,
                rowIndex: i,
                onClick: _this4.onRowClick,
                onDoubleClick: _this4.props.onRowDoubleClick,
                onRightClick: _this4.onRowRightClick,
                onTouchEnd: _this4.onRowTouchEnd,
                onMouseDown: _this4.onRowMouseDown,
                onMouseUp: _this4.onRowMouseUp,
                onCellMouseDown: _this4.onCellMouseDown,
                onCellMouseUp: _this4.onCellMouseUp,
                onRowToggle: _this4.onRowToggle,
                expanded: expanded,
                selectionMode: _this4.props.selectionMode,
                selectOnEdit: _this4.props.selectOnEdit,
                onRadioClick: _this4.onRadioClick,
                onCheckboxClick: _this4.onCheckboxClick,
                selected: selected,
                contextMenuSelected: contextMenuSelected,
                rowClassName: _this4.props.rowClassName,
                sortField: _this4.props.sortField,
                rowGroupMode: _this4.props.rowGroupMode,
                groupRowSpan: groupRowSpan,
                onDragStart: function onDragStart(e) {
                  return _this4.onRowDragStart(e, i);
                },
                onDragEnd: _this4.onRowDragEnd,
                onDragOver: function onDragOver(e) {
                  return _this4.onRowDragOver(e, i);
                },
                onDragLeave: _this4.onRowDragLeave,
                onDrop: _this4.onRowDrop,
                virtualScroll: _this4.props.virtualScroll,
                virtualRowHeight: _this4.props.virtualRowHeight,
                editMode: _this4.props.editMode,
                editing: editing,
                isRowEditingControlled: !!_this4.props.onRowEditChange,
                rowEditorValidator: _this4.props.rowEditorValidator,
                onRowEditInit: _this4.props.onRowEditInit,
                onRowEditSave: _this4.props.onRowEditSave,
                onRowEditCancel: _this4.props.onRowEditCancel,
                onRowEditingToggle: _this4.onRowEditingToggle,
                showRowReorderElement: _this4.props.showRowReorderElement,
                showSelectionElement: _this4.props.showSelectionElement,
                onSelectionChange: _this4.props.onSelectionChange,
                selectionModeInColumn: _this4.props.selectionModeInColumn,
                dragSelection: _this4.props.dragSelection,
                selection: _this4.props.selection,
                allowRowSelection: _this4.allowRowSelection(),
                allowCellSelection: _this4.allowCellSelection(),
                onCellClick: _this4.onCellClick
              }, _this4.props.children);

              rows.push(bodyRow);
            } //row expansion


            if (expanded && !(hasSubheaderGrouping && _this4.props.expandableRowGroups)) {
              var expandedRowContent = _this4.props.rowExpansionTemplate(rowData);

              var id = "".concat(_this4.props.tableId ? _this4.props.tableId + '_' : '', "content_").concat(i, "_expanded");

              var expandedRow = /*#__PURE__*/_react.default.createElement("tr", {
                key: id,
                id: id,
                role: "row",
                className: "p-row-expanded"
              }, /*#__PURE__*/_react.default.createElement("td", {
                role: "cell",
                colSpan: _this4.props.children.length
              }, expandedRowContent));

              rows.push(expandedRow);
            } //footer row group


            if (hasSubheaderGrouping && (!_this4.props.expandableRowGroups || isRowGroupExpanded)) {
              var _currentRowFieldData2 = _ObjectUtils.default.resolveFieldData(rowData, _this4.props.groupField);

              var _nextRowFieldData = _ObjectUtils.default.resolveFieldData(_this4.props.value[i + 1], _this4.props.groupField);

              if (i === _this4.props.value.length - 1 || _currentRowFieldData2 !== _nextRowFieldData) {
                rows.push(_this4.renderRowGroupFooter(rowData, i));
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