'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var paginator = require('primereact/paginator');
var utils = require('primereact/utils');
var PrimeReact = require('primereact/api');
var overlayservice = require('primereact/overlayservice');
var ripple = require('primereact/ripple');
var csstransition = require('primereact/csstransition');
var portal = require('primereact/portal');
var inputtext = require('primereact/inputtext');
var dropdown = require('primereact/dropdown');
var button = require('primereact/button');
var virtualscroller = require('primereact/virtualscroller');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RowRadioButton = /*#__PURE__*/function (_Component) {
  _inherits(RowRadioButton, _Component);

  var _super = _createSuper$c(RowRadioButton);

  function RowRadioButton(props) {
    var _this;

    _classCallCheck(this, RowRadioButton);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RowRadioButton, [{
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled) {
        this.props.onChange({
          originalEvent: event,
          data: this.props.value
        });
        this.input.focus();
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        focused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focused: false
      });
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.onClick(event);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.code === 'Space') {
        this.onClick(event);
        event.preventDefault();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = utils.classNames('p-radiobutton-box p-component', {
        'p-highlight': this.props.checked,
        'p-focus': this.state.focused,
        'p-disabled': this.props.disabled
      });
      var name = "".concat(this.props.tableSelector, "_dt_radio");
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-radiobutton p-component"
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React__default["default"].createElement("input", {
        name: name,
        ref: function ref(el) {
          return _this2.input = el;
        },
        type: "radio",
        checked: this.props.checked,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown
      })), /*#__PURE__*/React__default["default"].createElement("div", {
        className: className,
        onClick: this.onClick,
        role: "radio",
        "aria-checked": this.props.checked
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-radiobutton-icon"
      })));
    }
  }]);

  return RowRadioButton;
}(React.Component);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RowCheckbox = /*#__PURE__*/function (_Component) {
  _inherits(RowCheckbox, _Component);

  var _super = _createSuper$b(RowCheckbox);

  function RowCheckbox(props) {
    var _this;

    _classCallCheck(this, RowCheckbox);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RowCheckbox, [{
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled) {
        this.setState({
          focused: true
        });
        this.props.onChange({
          originalEvent: event,
          data: this.props.value
        });
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        focused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focused: false
      });
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.code === 'Space') {
        this.onClick(event);
        event.preventDefault();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = utils.classNames('p-checkbox-box p-component', {
        'p-highlight': this.props.checked,
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused
      });
      var iconClassName = utils.classNames('p-checkbox-icon', {
        'pi pi-check': this.props.checked
      });
      var tabIndex = this.props.disabled ? null : '0';
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-checkbox p-component",
        onClick: this.onClick
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: className,
        role: "checkbox",
        "aria-checked": this.props.checked,
        tabIndex: tabIndex,
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: iconClassName
      })));
    }
  }]);

  return RowCheckbox;
}(React.Component);

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var BodyCell = /*#__PURE__*/function (_Component) {
  _inherits(BodyCell, _Component);

  var _super = _createSuper$a(BodyCell);

  function BodyCell(props) {
    var _this;

    _classCallCheck(this, BodyCell);

    _this = _super.call(this, props);
    _this.state = {
      editing: props.editing,
      editingRowData: props.rowData,
      styleObject: {}
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onEditorFocus = _this.onEditorFocus.bind(_assertThisInitialized(_this));
    _this.onRowToggle = _this.onRowToggle.bind(_assertThisInitialized(_this));
    _this.onRowEditSave = _this.onRowEditSave.bind(_assertThisInitialized(_this));
    _this.onRowEditCancel = _this.onRowEditCancel.bind(_assertThisInitialized(_this));
    _this.onRowEditInit = _this.onRowEditInit.bind(_assertThisInitialized(_this));
    _this.editorCallback = _this.editorCallback.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BodyCell, [{
    key: "field",
    get: function get() {
      return this.getColumnProp('field') || "field_".concat(this.props.index);
    }
  }, {
    key: "isEditable",
    value: function isEditable() {
      return this.getColumnProp('editor');
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      return this.props.selection ? this.props.selection instanceof Array ? this.findIndex(this.props.selection) > -1 : this.equals(this.props.selection) : false;
    }
  }, {
    key: "equalsData",
    value: function equalsData(data) {
      return this.props.compareSelectionBy === 'equals' ? data === this.props.rowData : utils.ObjectUtils.equals(data, this.props.rowData, this.props.dataKey);
    }
  }, {
    key: "equals",
    value: function equals(selectedCell) {
      return (selectedCell.rowIndex === this.props.rowIndex || this.equalsData(selectedCell.rowData)) && (selectedCell.field === this.field || selectedCell.cellIndex === this.props.index);
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(target) {
      return this.el && !(this.el.isSameNode(target) || this.el.contains(target));
    }
  }, {
    key: "getColumnProp",
    value: function getColumnProp(prop) {
      return this.props.column ? this.props.column.props[prop] : null;
    }
  }, {
    key: "getVirtualScrollerOption",
    value: function getVirtualScrollerOption(option) {
      return this.props.virtualScrollerOptions ? this.props.virtualScrollerOptions[option] : null;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var bodyStyle = this.getColumnProp('bodyStyle');
      var columnStyle = this.getColumnProp('style');
      return this.getColumnProp('frozen') ? Object.assign({}, columnStyle, bodyStyle, this.state.styleObject) : Object.assign({}, columnStyle, bodyStyle);
    }
  }, {
    key: "getCellCallbackParams",
    value: function getCellCallbackParams(event) {
      return {
        originalEvent: event,
        value: this.resolveFieldData(),
        field: this.field,
        rowData: this.props.rowData,
        rowIndex: this.props.rowIndex,
        cellIndex: this.props.index,
        selected: this.isSelected(),
        column: this.props.column,
        props: this.props
      };
    }
  }, {
    key: "resolveFieldData",
    value: function resolveFieldData(data) {
      return utils.ObjectUtils.resolveFieldData(data || this.props.rowData, this.field);
    }
  }, {
    key: "getEditingRowData",
    value: function getEditingRowData() {
      return this.props.editingMeta && this.props.editingMeta[this.props.rowIndex] ? this.props.editingMeta[this.props.rowIndex].data : this.props.rowData;
    }
  }, {
    key: "getTabIndex",
    value: function getTabIndex(cellSelected) {
      return this.props.allowCellSelection ? cellSelected ? 0 : this.props.rowIndex === 0 && this.props.index === 0 ? this.props.tabIndex : -1 : null;
    }
  }, {
    key: "findIndex",
    value: function findIndex(collection) {
      var _this2 = this;

      return (collection || []).findIndex(function (data) {
        return _this2.equals(data);
      });
    }
  }, {
    key: "closeCell",
    value: function closeCell(event) {
      var _this3 = this;

      var params = this.getCellCallbackParams(event);
      var onBeforeCellEditHide = this.getColumnProp('onBeforeCellEditHide');

      if (onBeforeCellEditHide) {
        onBeforeCellEditHide(params);
      }
      /* When using the 'tab' key, the focus event of the next cell is not called in IE. */


      setTimeout(function () {
        _this3.setState({
          editing: false
        }, function () {
          _this3.unbindDocumentEditListener();

          overlayservice.OverlayService.off('overlay-click', _this3.overlayEventListener);
          _this3.overlayEventListener = null;
        });
      }, 1);
    }
  }, {
    key: "switchCellToViewMode",
    value: function switchCellToViewMode(event, submit) {
      var callbackParams = this.getCellCallbackParams(event);
      var newRowData = this.state.editingRowData;
      var newValue = this.resolveFieldData(newRowData);

      var params = _objectSpread$7(_objectSpread$7({}, callbackParams), {}, {
        newRowData: newRowData,
        newValue: newValue
      });

      var onCellEditCancel = this.getColumnProp('onCellEditCancel');
      var cellEditValidator = this.getColumnProp('cellEditValidator');
      var onCellEditComplete = this.getColumnProp('onCellEditComplete');

      if (!submit && onCellEditCancel) {
        onCellEditCancel(params);
      }

      var valid = true;

      if (cellEditValidator) {
        valid = cellEditValidator(params);
      }

      if (valid) {
        if (submit && onCellEditComplete) {
          onCellEditComplete(params);
        }

        this.closeCell(event);
      } else {
        event.preventDefault();
      }
    }
  }, {
    key: "findNextSelectableCell",
    value: function findNextSelectableCell(cell) {
      var nextCell = cell.nextElementSibling;
      return nextCell ? utils.DomHandler.hasClass(nextCell, 'p-selectable-cell') ? nextCell : this.findNextSelectableRow(nextCell) : null;
    }
  }, {
    key: "findPrevSelectableCell",
    value: function findPrevSelectableCell(cell) {
      var prevCell = cell.previousElementSibling;
      return prevCell ? utils.DomHandler.hasClass(prevCell, 'p-selectable-cell') ? prevCell : this.findPrevSelectableRow(prevCell) : null;
    }
  }, {
    key: "findNextSelectableRow",
    value: function findNextSelectableRow(row) {
      var nextRow = row.nextElementSibling;
      return nextRow ? utils.DomHandler.hasClass(nextRow, 'p-selectable-row') ? nextRow : this.findNextSelectableRow(nextRow) : null;
    }
  }, {
    key: "findPrevSelectableRow",
    value: function findPrevSelectableRow(row) {
      var prevRow = row.previousElementSibling;

      if (prevRow) {
        return utils.DomHandler.hasClass(prevRow, 'p-selectable-row') ? prevRow : this.findPrevSelectableRow(prevRow);
      }

      return null;
    }
  }, {
    key: "changeTabIndex",
    value: function changeTabIndex(currentCell, nextCell) {
      if (currentCell && nextCell) {
        currentCell.tabIndex = -1;
        nextCell.tabIndex = this.props.tabIndex;
      }
    }
  }, {
    key: "focusOnElement",
    value: function focusOnElement() {
      var _this4 = this;

      clearTimeout(this.tabindexTimeout);
      this.tabindexTimeout = setTimeout(function () {
        if (_this4.state.editing) {
          var focusableEl = utils.DomHandler.getFirstFocusableElement(_this4.el, ':not(.p-cell-editor-key-helper)');
          focusableEl && focusableEl.focus();
        }

        _this4.keyHelper && (_this4.keyHelper.tabIndex = _this4.state.editing ? -1 : 0);
      }, 1);
    }
  }, {
    key: "updateStickyPosition",
    value: function updateStickyPosition() {
      if (this.getColumnProp('frozen')) {
        var styleObject = _objectSpread$7({}, this.state.styleObject);

        var align = this.getColumnProp('alignFrozen');

        if (align === 'right') {
          var right = 0;
          var next = this.el.nextElementSibling;

          if (next) {
            right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }

          styleObject['right'] = right + 'px';
        } else {
          var left = 0;
          var prev = this.el.previousElementSibling;

          if (prev) {
            left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }

          styleObject['left'] = left + 'px';
        }

        var isSameStyle = this.state.styleObject['left'] === styleObject['left'] && this.state.styleObject['right'] === styleObject['right'];
        !isSameStyle && this.setState({
          styleObject: styleObject
        });
      }
    }
  }, {
    key: "editorCallback",
    value: function editorCallback(val) {
      var editingRowData = _objectSpread$7({}, this.state.editingRowData);

      editingRowData[this.field] = val;
      this.setState({
        editingRowData: editingRowData
      }); // update editing meta for complete methods on row mode

      this.props.editingMeta[this.props.rowIndex].data[this.field] = val;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var _this5 = this;

      var params = this.getCellCallbackParams(event);

      if (this.props.editMode !== 'row' && this.isEditable() && !this.state.editing && (this.props.selectOnEdit || !this.props.selectOnEdit && this.props.selected)) {
        this.selfClick = true;
        var onBeforeCellEditShow = this.getColumnProp('onBeforeCellEditShow');
        var onCellEditInit = this.getColumnProp('onCellEditInit');
        var cellEditValidatorEvent = this.getColumnProp('cellEditValidatorEvent');

        if (onBeforeCellEditShow) {
          onBeforeCellEditShow(params);
        } // If the data is sorted using sort icon, it has been added to wait for the sort operation when any cell is wanted to be opened.


        setTimeout(function () {
          _this5.setState({
            editing: true
          }, function () {
            if (onCellEditInit) {
              onCellEditInit(params);
            }

            if (cellEditValidatorEvent === 'click') {
              _this5.bindDocumentEditListener();

              _this5.overlayEventListener = function (e) {
                if (!_this5.isOutsideClicked(e.target)) {
                  _this5.selfClick = true;
                }
              };

              overlayservice.OverlayService.on('overlay-click', _this5.overlayEventListener);
            }
          });
        }, 1);
      }

      if (this.props.allowCellSelection && this.props.onClick) {
        this.props.onClick(params);
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var params = this.getCellCallbackParams(event);

      if (this.props.onMouseDown) {
        this.props.onMouseDown(params);
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      var params = this.getCellCallbackParams(event);

      if (this.props.onMouseUp) {
        this.props.onMouseUp(params);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.props.editMode !== 'row') {
        if (event.which === 13 || event.which === 9) {
          // tab || enter
          this.switchCellToViewMode(event, true);
        }

        if (event.which === 27) {
          // escape
          this.switchCellToViewMode(event, false);
        }
      }

      if (this.props.allowCellSelection) {
        var target = event.target,
            cell = event.currentTarget;

        switch (event.which) {
          //left arrow
          case 37:
            var prevCell = this.findPrevSelectableCell(cell);

            if (prevCell) {
              this.changeTabIndex(cell, prevCell);
              prevCell.focus();
            }

            event.preventDefault();
            break;
          //right arrow

          case 39:
            var nextCell = this.findNextSelectableCell(cell);

            if (nextCell) {
              this.changeTabIndex(cell, nextCell);
              nextCell.focus();
            }

            event.preventDefault();
            break;
          //up arrow

          case 38:
            var prevRow = this.findPrevSelectableRow(cell.parentElement);

            if (prevRow) {
              var upCell = prevRow.children[this.props.index];
              this.changeTabIndex(cell, upCell);
              upCell.focus();
            }

            event.preventDefault();
            break;
          //down arrow

          case 40:
            var nextRow = this.findNextSelectableRow(cell.parentElement);

            if (nextRow) {
              var downCell = nextRow.children[this.props.index];
              this.changeTabIndex(cell, downCell);
              downCell.focus();
            }

            event.preventDefault();
            break;
          //enter

          case 13:
            // @deprecated
            if (!utils.DomHandler.isClickable(target)) {
              this.onClick(event);
              event.preventDefault();
            }

            break;
          //space

          case 32:
            if (!utils.DomHandler.isClickable(target) && !target.readOnly) {
              this.onClick(event);
              event.preventDefault();
            }

            break;
        }
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      this.selfClick = false;

      if (this.props.editMode !== 'row' && this.state.editing && this.getColumnProp('cellEditValidatorEvent') === 'blur') {
        this.switchCellToViewMode(event, true);
      }
    }
  }, {
    key: "onEditorFocus",
    value: function onEditorFocus(event) {
      this.onClick(event);
    }
  }, {
    key: "onRowToggle",
    value: function onRowToggle(event) {
      this.props.onRowToggle({
        originalEvent: event,
        data: this.props.rowData
      });
      event.preventDefault();
    }
  }, {
    key: "onRowEditInit",
    value: function onRowEditInit(event) {
      this.props.onRowEditInit({
        originalEvent: event,
        data: this.props.rowData,
        newData: this.getEditingRowData(),
        field: this.field,
        index: this.props.rowIndex
      });
    }
  }, {
    key: "onRowEditSave",
    value: function onRowEditSave(event) {
      this.props.onRowEditSave({
        originalEvent: event,
        data: this.props.rowData,
        newData: this.getEditingRowData(),
        field: this.field,
        index: this.props.rowIndex
      });
    }
  }, {
    key: "onRowEditCancel",
    value: function onRowEditCancel(event) {
      this.props.onRowEditCancel({
        originalEvent: event,
        data: this.props.rowData,
        newData: this.getEditingRowData(),
        field: this.field,
        index: this.props.rowIndex
      });
    }
  }, {
    key: "bindDocumentEditListener",
    value: function bindDocumentEditListener() {
      var _this6 = this;

      if (!this.documentEditListener) {
        this.documentEditListener = function (e) {
          if (!_this6.selfClick && _this6.isOutsideClicked(e.target)) {
            _this6.switchCellToViewMode(e, true);
          }

          _this6.selfClick = false;
        };

        document.addEventListener('click', this.documentEditListener, true);
      }
    }
  }, {
    key: "unbindDocumentEditListener",
    value: function unbindDocumentEditListener() {
      if (this.documentEditListener) {
        document.removeEventListener('click', this.documentEditListener, true);
        this.documentEditListener = null;
        this.selfClick = false;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.getColumnProp('frozen')) {
        this.updateStickyPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.getColumnProp('frozen')) {
        this.updateStickyPosition();
      }

      if (this.props.editMode === 'cell' || this.props.editMode === 'row') {
        this.focusOnElement();

        if (prevProps.editingMeta !== this.props.editingMeta) {
          this.setState({
            editingRowData: this.getEditingRowData()
          });
        }

        if (prevState.editing !== this.state.editing) {
          var callbackParams = this.getCellCallbackParams();

          var params = _objectSpread$7(_objectSpread$7({}, callbackParams), {}, {
            editing: this.state.editing
          });

          this.props.onEditingMetaChange(params);
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
    key: "renderLoading",
    value: function renderLoading() {
      var options = this.getVirtualScrollerOption('getLoaderOptions')(this.props.rowIndex, {
        cellIndex: this.props.index,
        cellFirst: this.props.index === 0,
        cellLast: this.props.index === this.getVirtualScrollerOption('columns').length - 1,
        cellEven: this.props.index % 2 === 0,
        cellOdd: this.props.index % 2 !== 0,
        column: this.props.column,
        field: this.field
      });
      var content = utils.ObjectUtils.getJSXElement(this.getVirtualScrollerOption('loadingTemplate'), options);
      return /*#__PURE__*/React__default["default"].createElement("td", null, content);
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this7 = this;

      var content, editorKeyHelper;
      var cellSelected = this.props.allowCellSelection && this.isSelected();
      var isRowEditor = this.props.editMode === 'row';
      var tabIndex = this.getTabIndex(cellSelected);
      var selectionMode = this.getColumnProp('selectionMode');
      var rowReorder = this.getColumnProp('rowReorder');
      var expander = this.getColumnProp('expander');
      var rowEditor = this.getColumnProp('rowEditor');
      var header = this.getColumnProp('header');
      var body = this.getColumnProp('body');
      var editor = this.getColumnProp('editor');
      var frozen = this.getColumnProp('frozen');
      var value = this.resolveFieldData();
      var cellClassName = utils.ObjectUtils.getPropValue(this.props.cellClassName, value, {
        props: this.props.tableProps,
        rowData: this.props.rowData
      });
      var className = utils.classNames(this.getColumnProp('bodyClassName'), this.getColumnProp('class'), cellClassName, {
        'p-selection-column': selectionMode !== null,
        'p-editable-column': editor,
        'p-cell-editing': editor && this.state.editing,
        'p-frozen-column': frozen,
        'p-selectable-cell': this.props.allowCellSelection,
        'p-highlight': cellSelected
      });
      var style = this.getStyle();
      var title = this.props.responsiveLayout === 'stack' && /*#__PURE__*/React__default["default"].createElement("span", {
        className: "p-column-title"
      }, utils.ObjectUtils.getJSXElement(header, {
        props: this.props.tableProps
      }));

      if (body && !this.state.editing) {
        content = body ? utils.ObjectUtils.getJSXElement(body, this.props.rowData, {
          column: this.props.column,
          field: this.field,
          rowIndex: this.props.rowIndex,
          frozenRow: this.props.frozenRow,
          props: this.props.tableProps
        }) : value;
      } else if (editor && this.state.editing) {
        content = utils.ObjectUtils.getJSXElement(editor, {
          rowData: this.state.editingRowData,
          value: this.resolveFieldData(this.state.editingRowData),
          column: this.props.column,
          field: this.field,
          rowIndex: this.props.rowIndex,
          frozenRow: this.props.frozenRow,
          props: this.props.tableProps,
          editorCallback: this.editorCallback
        });
      } else if (selectionMode) {
        var showSelection = this.props.showSelectionElement ? this.props.showSelectionElement(this.props.rowData, {
          rowIndex: this.props.rowIndex,
          props: this.props.tableProps
        }) : true;
        content = showSelection && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, selectionMode === 'single' && /*#__PURE__*/React__default["default"].createElement(RowRadioButton, {
          value: this.props.rowData,
          checked: this.props.selected,
          onChange: this.props.onRadioChange,
          tabIndex: this.props.tabIndex,
          tableSelector: this.props.tableSelector
        }), selectionMode === 'multiple' && /*#__PURE__*/React__default["default"].createElement(RowCheckbox, {
          value: this.props.rowData,
          checked: this.props.selected,
          onChange: this.props.onCheckboxChange,
          tabIndex: this.props.tabIndex
        }));
      } else if (rowReorder) {
        var showReorder = this.props.showRowReorderElement ? this.props.showRowReorderElement(this.props.rowData, {
          rowIndex: this.props.rowIndex,
          props: this.props.tableProps
        }) : true;
        content = showReorder && /*#__PURE__*/React__default["default"].createElement("i", {
          className: utils.classNames('p-datatable-reorderablerow-handle', this.getColumnProp('rowReorderIcon'))
        });
      } else if (expander) {
        var iconClassName = utils.classNames('p-row-toggler-icon', this.props.expanded ? this.props.expandedRowIcon : this.props.collapsedRowIcon);
        var ariaControls = "".concat(this.props.tableSelector, "_content_").concat(this.props.rowIndex, "_expanded");
        var expanderProps = {
          onClick: this.onRowToggle,
          className: 'p-row-toggler p-link',
          iconClassName: iconClassName
        };
        content = /*#__PURE__*/React__default["default"].createElement("button", {
          className: expanderProps.className,
          onClick: expanderProps.onClick,
          type: "button",
          "aria-expanded": this.props.expanded,
          "aria-controls": ariaControls,
          tabIndex: this.props.tabIndex
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: expanderProps.iconClassName
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

        if (body) {
          expanderProps['element'] = content;
          content = utils.ObjectUtils.getJSXElement(body, this.props.rowData, {
            column: this.props.column,
            field: this.field,
            rowIndex: this.props.rowIndex,
            frozenRow: this.props.frozenRow,
            props: this.props.tableProps,
            expander: expanderProps
          });
        }
      } else if (isRowEditor && rowEditor) {
        var rowEditorProps = {};

        if (this.state.editing) {
          rowEditorProps = {
            editing: true,
            onSaveClick: this.onRowEditSave,
            saveClassName: 'p-row-editor-save p-link',
            saveIconClassName: 'p-row-editor-save-icon pi pi-fw pi-check',
            onCancelClick: this.onRowEditCancel,
            cancelClassName: 'p-row-editor-cancel p-link',
            cancelIconClassName: 'p-row-editor-cancel-icon pi pi-fw pi-times'
          };
          content = /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("button", {
            type: "button",
            onClick: rowEditorProps.onSaveClick,
            className: rowEditorProps.saveClassName,
            tabIndex: this.props.tabIndex
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: rowEditorProps.saveIconClassName
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null)), /*#__PURE__*/React__default["default"].createElement("button", {
            type: "button",
            onClick: rowEditorProps.onCancelClick,
            className: rowEditorProps.cancelClassName,
            tabIndex: this.props.tabIndex
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: rowEditorProps.cancelIconClassName
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null)));
        } else {
          rowEditorProps = {
            editing: false,
            onInitClick: this.onRowEditInit,
            initClassName: 'p-row-editor-init p-link',
            initIconClassName: 'p-row-editor-init-icon pi pi-fw pi-pencil'
          };
          content = /*#__PURE__*/React__default["default"].createElement("button", {
            type: "button",
            onClick: rowEditorProps.onInitClick,
            className: rowEditorProps.initClassName,
            tabIndex: this.props.tabIndex
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: rowEditorProps.initIconClassName
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
        }

        if (body) {
          rowEditorProps['element'] = content;
          content = utils.ObjectUtils.getJSXElement(body, this.props.rowData, {
            column: this.props.column,
            field: this.field,
            rowIndex: this.props.rowIndex,
            frozenRow: this.props.frozenRow,
            props: this.props.tableProps,
            rowEditor: rowEditorProps
          });
        }
      } else {
        content = value;
      }

      if (!isRowEditor && editor) {
        /* eslint-disable */
        editorKeyHelper = /*#__PURE__*/React__default["default"].createElement("a", {
          tabIndex: "0",
          ref: function ref(el) {
            return _this7.keyHelper = el;
          },
          className: "p-cell-editor-key-helper p-hidden-accessible",
          onFocus: this.onEditorFocus
        }, /*#__PURE__*/React__default["default"].createElement("span", null));
        /* eslint-enable */
      }

      return /*#__PURE__*/React__default["default"].createElement("td", {
        ref: function ref(el) {
          return _this7.el = el;
        },
        style: style,
        className: className,
        rowSpan: this.props.rowSpan,
        tabIndex: tabIndex,
        role: "cell",
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        onBlur: this.onBlur,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp
      }, editorKeyHelper, title, content);
    }
  }, {
    key: "render",
    value: function render() {
      return this.getVirtualScrollerOption('loading') ? this.renderLoading() : this.renderElement();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.editMode === 'row' && nextProps.editing !== prevState.editing) {
        return {
          editing: nextProps.editing
        };
      }

      return null;
    }
  }]);

  return BodyCell;
}(React.Component);

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var BodyRow = /*#__PURE__*/function (_Component) {
  _inherits(BodyRow, _Component);

  var _super = _createSuper$9(BodyRow);

  function BodyRow(props) {
    var _this;

    _classCallCheck(this, BodyRow);

    _this = _super.call(this, props);

    if (!_this.props.onRowEditChange) {
      _this.state = {
        editing: false
      };
    }

    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onDoubleClick = _this.onDoubleClick.bind(_assertThisInitialized(_this));
    _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
    _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
    _this.onEditInit = _this.onEditInit.bind(_assertThisInitialized(_this));
    _this.onEditSave = _this.onEditSave.bind(_assertThisInitialized(_this));
    _this.onEditCancel = _this.onEditCancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BodyRow, [{
    key: "isFocusable",
    value: function isFocusable() {
      return this.props.selectionMode && this.props.selectionModeInColumn !== 'single' && this.props.selectionModeInColumn !== 'multiple';
    }
  }, {
    key: "isGrouped",
    value: function isGrouped(column) {
      if (this.props.groupRowsBy && this.getColumnProp(column, 'field')) {
        if (Array.isArray(this.props.groupRowsBy)) return this.props.groupRowsBy.indexOf(column.props.field) > -1;else return this.props.groupRowsBy === column.props.field;
      }

      return false;
    }
  }, {
    key: "equals",
    value: function equals(data1, data2) {
      return this.props.compareSelectionBy === 'equals' ? data1 === data2 : utils.ObjectUtils.equals(data1, data2, this.props.dataKey);
    }
  }, {
    key: "getColumnProp",
    value: function getColumnProp(col, prop) {
      return col ? col.props[prop] : null;
    }
  }, {
    key: "getEditing",
    value: function getEditing() {
      return this.props.onRowEditChange ? this.props.editing : this.state.editing;
    }
  }, {
    key: "getTabIndex",
    value: function getTabIndex() {
      return this.isFocusable() && !this.props.allowCellSelection ? this.props.index === 0 ? this.props.tabIndex : -1 : null;
    }
  }, {
    key: "findIndex",
    value: function findIndex(collection, rowData) {
      var _this2 = this;

      return (collection || []).findIndex(function (data) {
        return _this2.equals(rowData, data);
      });
    }
  }, {
    key: "changeTabIndex",
    value: function changeTabIndex(currentRow, nextRow) {
      if (currentRow && nextRow) {
        currentRow.tabIndex = -1;
        nextRow.tabIndex = this.props.tabIndex;
      }
    }
  }, {
    key: "findNextSelectableRow",
    value: function findNextSelectableRow(row) {
      var nextRow = row.nextElementSibling;
      return nextRow ? utils.DomHandler.hasClass(nextRow, 'p-selectable-row') ? nextRow : this.findNextSelectableRow(nextRow) : null;
    }
  }, {
    key: "findPrevSelectableRow",
    value: function findPrevSelectableRow(row) {
      var prevRow = row.previousElementSibling;
      return prevRow ? utils.DomHandler.hasClass(prevRow, 'p-selectable-row') ? prevRow : this.findPrevSelectableRow(prevRow) : null;
    }
  }, {
    key: "shouldRenderBodyCell",
    value: function shouldRenderBodyCell(value, column, i) {
      if (this.getColumnProp(column, 'hidden')) {
        return false;
      } else if (this.props.rowGroupMode && this.props.rowGroupMode === 'rowspan' && this.isGrouped(column)) {
        var prevRowData = value[i - 1];

        if (prevRowData) {
          var currentRowFieldData = utils.ObjectUtils.resolveFieldData(value[i], this.getColumnProp(column, 'field'));
          var previousRowFieldData = utils.ObjectUtils.resolveFieldData(prevRowData, this.getColumnProp(column, 'field'));
          return currentRowFieldData !== previousRowFieldData;
        }
      }

      return true;
    }
  }, {
    key: "calculateRowGroupSize",
    value: function calculateRowGroupSize(value, column, index) {
      if (this.isGrouped(column)) {
        var currentRowFieldData = utils.ObjectUtils.resolveFieldData(value[index], this.getColumnProp(column, 'field'));
        var nextRowFieldData = currentRowFieldData;
        var groupRowSpan = 0;

        while (currentRowFieldData === nextRowFieldData) {
          groupRowSpan++;
          var nextRowData = value[++index];

          if (nextRowData) {
            nextRowFieldData = utils.ObjectUtils.resolveFieldData(nextRowData, this.getColumnProp(column, 'field'));
          } else {
            break;
          }
        }

        return groupRowSpan === 1 ? null : groupRowSpan;
      } else {
        return null;
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      this.props.onRowClick({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(event) {
      this.props.onRowDoubleClick({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onRightClick",
    value: function onRightClick(event) {
      this.props.onRowRightClick({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      this.props.onRowTouchEnd(event);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.isFocusable() && !this.props.allowCellSelection) {
        var target = event.target,
            row = event.currentTarget;

        switch (event.which) {
          //down arrow
          case 40:
            var nextRow = this.findNextSelectableRow(row);

            if (nextRow) {
              this.changeTabIndex(row, nextRow);
              nextRow.focus();
            }

            event.preventDefault();
            break;
          //up arrow

          case 38:
            var prevRow = this.findPrevSelectableRow(row);

            if (prevRow) {
              this.changeTabIndex(row, prevRow);
              prevRow.focus();
            }

            event.preventDefault();
            break;
          //enter

          case 13:
            // @deprecated
            if (!utils.DomHandler.isClickable(target)) {
              this.onClick(event);
              event.preventDefault();
            }

            break;
          //space

          case 32:
            if (!utils.DomHandler.isClickable(target) && !target.readOnly) {
              this.onClick(event);
              event.preventDefault();
            }

            break;
        }
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      this.props.onRowMouseDown({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      this.props.onRowMouseUp({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      this.props.onRowDragStart({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      this.props.onRowDragOver({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event) {
      this.props.onRowDragLeave({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      this.props.onRowDragEnd({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      this.props.onRowDrop({
        originalEvent: event,
        data: this.props.rowData,
        index: this.props.index
      });
    }
  }, {
    key: "onEditChange",
    value: function onEditChange(e, editing) {
      if (this.props.onRowEditChange) {
        var editingRows;
        var dataKey = this.props.dataKey;
        var originalEvent = e.originalEvent,
            data = e.data,
            index = e.index;

        if (dataKey) {
          var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(data, dataKey));
          editingRows = this.props.editingRows ? _objectSpread$6({}, this.props.editingRows) : {};
          if (editingRows[dataKeyValue] != null) delete editingRows[dataKeyValue];else editingRows[dataKeyValue] = true;
        } else {
          var editingRowIndex = this.findIndex(this.props.editingRows, data);
          editingRows = this.props.editingRows ? _toConsumableArray(this.props.editingRows) : [];
          if (editingRowIndex !== -1) editingRows = editingRows.filter(function (val, i) {
            return i !== editingRowIndex;
          });else editingRows.push(data);
        }

        this.props.onRowEditChange({
          originalEvent: originalEvent,
          data: editingRows,
          index: index
        });
      } else {
        this.setState({
          editing: editing
        });
      }
    }
  }, {
    key: "onEditInit",
    value: function onEditInit(e) {
      var event = e.originalEvent;

      if (this.props.onRowEditInit) {
        this.props.onRowEditInit({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.index
        });
      }

      this.onEditChange(e, true);
      event.preventDefault();
    }
  }, {
    key: "onEditSave",
    value: function onEditSave(e) {
      var event = e.originalEvent;
      var valid = this.props.rowEditValidator ? this.props.rowEditValidator(this.props.rowData, {
        props: this.props.tableProps
      }) : true;

      if (this.props.onRowEditSave) {
        this.props.onRowEditSave({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.index,
          valid: valid
        });
      }

      if (valid) {
        if (this.props.onRowEditComplete) {
          this.props.onRowEditComplete(e);
        }

        this.onEditChange(e, false);
      }

      event.preventDefault();
    }
  }, {
    key: "onEditCancel",
    value: function onEditCancel(e) {
      var event = e.originalEvent;

      if (this.props.onRowEditCancel) {
        this.props.onRowEditCancel({
          originalEvent: event,
          data: this.props.rowData,
          index: this.props.index
        });
      }

      this.onEditChange(e, false);
      event.preventDefault();
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this3 = this;

      return this.props.columns.map(function (col, i) {
        if (_this3.shouldRenderBodyCell(_this3.props.value, col, _this3.props.index)) {
          var key = "".concat(_this3.getColumnProp(col, 'columnKey') || _this3.getColumnProp(col, 'field'), "_").concat(i);
          var rowSpan = _this3.props.rowGroupMode === 'rowspan' ? _this3.calculateRowGroupSize(_this3.props.value, col, _this3.props.index) : null;

          var editing = _this3.getEditing();

          return /*#__PURE__*/React__default["default"].createElement(BodyCell, {
            key: key,
            value: _this3.props.value,
            tableProps: _this3.props.tableProps,
            tableSelector: _this3.props.tableSelector,
            column: col,
            rowData: _this3.props.rowData,
            rowIndex: _this3.props.index,
            index: i,
            rowSpan: rowSpan,
            dataKey: _this3.props.dataKey,
            editing: editing,
            editingMeta: _this3.props.editingMeta,
            editMode: _this3.props.editMode,
            onRowEditInit: _this3.onEditInit,
            onRowEditSave: _this3.onEditSave,
            onRowEditCancel: _this3.onEditCancel,
            onEditingMetaChange: _this3.props.onEditingMetaChange,
            onRowToggle: _this3.props.onRowToggle,
            selection: _this3.props.selection,
            allowCellSelection: _this3.props.allowCellSelection,
            compareSelectionBy: _this3.props.compareSelectionBy,
            selectOnEdit: _this3.props.selectOnEdit,
            selected: _this3.props.selected,
            onClick: _this3.props.onCellClick,
            onMouseDown: _this3.props.onCellMouseDown,
            onMouseUp: _this3.props.onCellMouseUp,
            tabIndex: _this3.props.tabIndex,
            cellClassName: _this3.props.cellClassName,
            responsiveLayout: _this3.props.responsiveLayout,
            frozenRow: _this3.props.frozenRow,
            showSelectionElement: _this3.props.showSelectionElement,
            showRowReorderElement: _this3.props.showRowReorderElement,
            onRadioChange: _this3.props.onRadioChange,
            onCheckboxChange: _this3.props.onCheckboxChange,
            expanded: _this3.props.expanded,
            expandedRowIcon: _this3.props.expandedRowIcon,
            collapsedRowIcon: _this3.props.collapsedRowIcon,
            virtualScrollerOptions: _this3.props.virtualScrollerOptions
          });
        }

        return null;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var rowClassName = utils.ObjectUtils.getPropValue(this.props.rowClassName, this.props.rowData, {
        props: this.props.tableProps
      });
      var className = utils.classNames(rowClassName, {
        'p-highlight': !this.props.allowCellSelection && this.props.selected,
        'p-highlight-contextmenu': this.props.contextMenuSelected,
        'p-selectable-row': this.props.allowRowSelection,
        'p-row-odd': this.props.index % 2 !== 0
      });
      var content = this.renderContent();
      var tabIndex = this.getTabIndex();
      return /*#__PURE__*/React__default["default"].createElement("tr", {
        ref: function ref(el) {
          return _this4.el = el;
        },
        role: "row",
        tabIndex: tabIndex,
        className: className,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onClick: this.onClick,
        onDoubleClick: this.onDoubleClick,
        onContextMenu: this.onRightClick,
        onTouchEnd: this.onTouchEnd,
        onKeyDown: this.onKeyDown,
        onDragStart: this.onDragStart,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDragEnd: this.onDragEnd,
        onDrop: this.onDrop
      }, content);
    }
  }]);

  return BodyRow;
}(React.Component);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RowTogglerButton = /*#__PURE__*/function (_Component) {
  _inherits(RowTogglerButton, _Component);

  var _super = _createSuper$8(RowTogglerButton);

  function RowTogglerButton(props) {
    var _this;

    _classCallCheck(this, RowTogglerButton);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RowTogglerButton, [{
    key: "onClick",
    value: function onClick(event) {
      this.props.onClick({
        originalEvent: event,
        data: this.props.rowData
      });
    }
  }, {
    key: "render",
    value: function render() {
      var iconClassName = utils.classNames('p-row-toggler-icon', this.props.expanded ? this.props.expandedRowIcon : this.props.collapsedRowIcon);
      return /*#__PURE__*/React__default["default"].createElement("button", {
        type: "button",
        onClick: this.onClick,
        className: "p-row-toggler p-link",
        tabIndex: this.props.tabIndex
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
    }
  }]);

  return RowTogglerButton;
}(React.Component);

var _excluded = ["originalEvent"];

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TableBody = /*#__PURE__*/function (_Component) {
  _inherits(TableBody, _Component);

  var _super = _createSuper$7(TableBody);

  function TableBody(props) {
    var _this;

    _classCallCheck(this, TableBody);

    _this = _super.call(this, props);
    _this.state = {
      rowGroupHeaderStyleObject: {}
    }; // row

    _this.onRowClick = _this.onRowClick.bind(_assertThisInitialized(_this));
    _this.onRowDoubleClick = _this.onRowDoubleClick.bind(_assertThisInitialized(_this));
    _this.onRowRightClick = _this.onRowRightClick.bind(_assertThisInitialized(_this));
    _this.onRowTouchEnd = _this.onRowTouchEnd.bind(_assertThisInitialized(_this));
    _this.onRowMouseDown = _this.onRowMouseDown.bind(_assertThisInitialized(_this));
    _this.onRowMouseUp = _this.onRowMouseUp.bind(_assertThisInitialized(_this));
    _this.onRowToggle = _this.onRowToggle.bind(_assertThisInitialized(_this)); // drag

    _this.onRowDragStart = _this.onRowDragStart.bind(_assertThisInitialized(_this));
    _this.onRowDragOver = _this.onRowDragOver.bind(_assertThisInitialized(_this));
    _this.onRowDragLeave = _this.onRowDragLeave.bind(_assertThisInitialized(_this));
    _this.onRowDragEnd = _this.onRowDragEnd.bind(_assertThisInitialized(_this));
    _this.onRowDrop = _this.onRowDrop.bind(_assertThisInitialized(_this)); // selection

    _this.onRadioChange = _this.onRadioChange.bind(_assertThisInitialized(_this));
    _this.onCheckboxChange = _this.onCheckboxChange.bind(_assertThisInitialized(_this));
    _this.onDragSelectionMouseMove = _this.onDragSelectionMouseMove.bind(_assertThisInitialized(_this));
    _this.onDragSelectionMouseUp = _this.onDragSelectionMouseUp.bind(_assertThisInitialized(_this)); // cell

    _this.onCellClick = _this.onCellClick.bind(_assertThisInitialized(_this));
    _this.onCellMouseDown = _this.onCellMouseDown.bind(_assertThisInitialized(_this));
    _this.onCellMouseUp = _this.onCellMouseUp.bind(_assertThisInitialized(_this));
    _this.ref = _this.ref.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableBody, [{
    key: "ref",
    value: function ref(el) {
      this.el = el;
      this.props.virtualScrollerContentRef && this.props.virtualScrollerContentRef(el);
    }
  }, {
    key: "equals",
    value: function equals(data1, data2) {
      if (this.allowCellSelection()) return (data1.rowIndex === data2.rowIndex || data1.rowData === data2.rowData) && (data1.field === data2.field || data1.cellIndex === data2.cellIndex);else return this.compareSelectionBy === 'equals' ? data1 === data2 : utils.ObjectUtils.equals(data1, data2, this.props.dataKey);
    }
  }, {
    key: "isSubheaderGrouping",
    value: function isSubheaderGrouping() {
      return this.props.rowGroupMode && this.props.rowGroupMode === 'subheader';
    }
  }, {
    key: "isSelectionEnabled",
    value: function isSelectionEnabled() {
      return this.props.selectionMode || this.props.selectionModeInColumn !== null || this.props.columns && this.props.columns.some(function (col) {
        return col && !!col.props.selectionMode;
      });
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
        return this.props.selection instanceof Array ? this.findIndex(this.props.selection, rowData) > -1 : this.equals(rowData, this.props.selection);
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
    key: "isRowExpanded",
    value: function isRowExpanded(rowData) {
      if (rowData && this.props.expandedRows) {
        if (this.isSubheaderGrouping() && this.props.expandableRowGroups) {
          return this.isRowGroupExpanded(rowData);
        } else {
          if (this.props.dataKey) return this.props.expandedRows ? this.props.expandedRows[utils.ObjectUtils.resolveFieldData(rowData, this.props.dataKey)] !== undefined : false;else return this.findIndex(this.props.expandedRows, rowData) !== -1;
        }
      }

      return false;
    }
  }, {
    key: "isRowGroupExpanded",
    value: function isRowGroupExpanded(rowData) {
      var _this2 = this;

      if (this.props.dataKey === this.props.groupRowsBy) return Object.keys(this.props.expandedRows).some(function (data) {
        return utils.ObjectUtils.equals(data, utils.ObjectUtils.resolveFieldData(rowData, _this2.props.dataKey));
      });else return this.props.expandedRows.some(function (data) {
        return utils.ObjectUtils.equals(data, rowData, _this2.props.groupRowsBy);
      });
    }
  }, {
    key: "isRowEditing",
    value: function isRowEditing(rowData) {
      if (this.props.editMode === 'row' && rowData && this.props.editingRows) {
        if (this.props.dataKey) return this.props.editingRows ? this.props.editingRows[utils.ObjectUtils.resolveFieldData(rowData, this.props.dataKey)] !== undefined : false;else return this.findIndex(this.props.editingRows, rowData) !== -1;
      }

      return false;
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
      return !utils.DomHandler.isClickable(event.originalEvent.target);
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
    key: "getColumnsLength",
    value: function getColumnsLength() {
      return this.props.columns ? this.props.columns.length : 0;
    }
  }, {
    key: "getVirtualScrollerOption",
    value: function getVirtualScrollerOption(option, options) {
      options = options || this.props.virtualScrollerOptions;
      return options ? options[option] : null;
    }
  }, {
    key: "findIndex",
    value: function findIndex(collection, rowData) {
      var _this3 = this;

      return (collection || []).findIndex(function (data) {
        return _this3.equals(rowData, data);
      });
    }
  }, {
    key: "rowGroupHeaderStyle",
    value: function rowGroupHeaderStyle() {
      if (this.props.scrollable) {
        return {
          top: this.state.rowGroupHeaderStyleObject['top']
        };
      }

      return null;
    }
  }, {
    key: "getRowKey",
    value: function getRowKey(rowData, index) {
      return this.props.dataKey ? utils.ObjectUtils.resolveFieldData(rowData, this.props.dataKey) + '_' + index : index;
    }
  }, {
    key: "shouldRenderRowGroupHeader",
    value: function shouldRenderRowGroupHeader(value, rowData, i) {
      var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.props.groupRowsBy);
      var prevRowData = value[i - 1];

      if (prevRowData) {
        var previousRowFieldData = utils.ObjectUtils.resolveFieldData(prevRowData, this.props.groupRowsBy);
        return currentRowFieldData !== previousRowFieldData;
      } else {
        return true;
      }
    }
  }, {
    key: "shouldRenderRowGroupFooter",
    value: function shouldRenderRowGroupFooter(value, rowData, i, expanded) {
      if (this.props.expandableRowGroups && !expanded) {
        return false;
      } else {
        var currentRowFieldData = utils.ObjectUtils.resolveFieldData(rowData, this.props.groupRowsBy);
        var nextRowData = value[i + 1];

        if (nextRowData) {
          var nextRowFieldData = utils.ObjectUtils.resolveFieldData(nextRowData, this.props.groupRowsBy);
          return currentRowFieldData !== nextRowFieldData;
        } else {
          return true;
        }
      }
    }
  }, {
    key: "updateFrozenRowStickyPosition",
    value: function updateFrozenRowStickyPosition() {
      this.el.style.top = utils.DomHandler.getOuterHeight(this.el.previousElementSibling) + 'px';
    }
  }, {
    key: "updateFrozenRowGroupHeaderStickyPosition",
    value: function updateFrozenRowGroupHeaderStickyPosition() {
      var tableHeaderHeight = utils.DomHandler.getOuterHeight(this.el.previousElementSibling);
      var top = tableHeaderHeight + 'px';

      if (this.state.rowGroupHeaderStyleObject && this.state.rowGroupHeaderStyleObject.top !== top) {
        this.setState({
          rowGroupHeaderStyleObject: {
            top: top
          }
        });
      }
    }
  }, {
    key: "updateVirtualScrollerPosition",
    value: function updateVirtualScrollerPosition() {
      var tableHeaderHeight = utils.DomHandler.getOuterHeight(this.el.previousElementSibling);
      this.el.style.top = (this.el.style.top || 0) + tableHeaderHeight + 'px';
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
      var _this4 = this;

      var originalEvent = _ref2.originalEvent,
          data = _ref2.data,
          toggleable = _ref2.toggleable,
          type = _ref2.type;
      var selected = this.isSelected(data);
      var selection = this.props.selection || [];

      if (selected) {
        if (toggleable) {
          var selectionIndex = this.findIndex(selection, data);
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
            return _this4.onUnselect({
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
      utils.DomHandler.clearSelection();
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
        var columns = this.props.columns;

        for (var j = cellRangeStart; j <= cellRangeEnd; j++) {
          var field = columns[j].props.field;
          var rangeRowData = {
            value: utils.ObjectUtils.resolveFieldData(rowData, field),
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
      if (this.allowCellSelection()) this.props.onCellSelect && this.props.onCellSelect(_objectSpread$5(_objectSpread$5({
        originalEvent: event.originalEvent
      }, event.data), {}, {
        type: event.type
      }));else this.props.onRowSelect && this.props.onRowSelect(event);
    }
  }, {
    key: "onUnselect",
    value: function onUnselect(event) {
      if (this.allowCellSelection()) this.props.onCellUnselect && this.props.onCellUnselect(_objectSpread$5(_objectSpread$5({
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
        utils.DomHandler.addClass(this.dragSelectionHelper, 'p-datatable-drag-selection-helper');
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
    key: "focusOnElement",
    value: function focusOnElement(event, isFocused) {
      var target = event.currentTarget;

      if (!this.allowCellSelection()) {
        if (this.isCheckboxSelectionModeInColumn()) {
          var checkbox = utils.DomHandler.findSingle(target, 'td.p-selection-column .p-checkbox-box');
          checkbox && checkbox.focus();
        } else if (this.isRadioSelectionModeInColumn()) {
          var radio = utils.DomHandler.findSingle(target, 'td.p-selection-column input[type="radio"]');
          radio && radio.focus();
        }
      }

      !isFocused && target && target.focus();
    }
  }, {
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
            this.onSingleSelection(_objectSpread$5(_objectSpread$5({}, event), {}, {
              toggleable: toggleable,
              type: 'row'
            }));
          } else {
            this.onMultipleSelection(_objectSpread$5(_objectSpread$5({}, event), {}, {
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
    key: "onRowDoubleClick",
    value: function onRowDoubleClick(e) {
      var event = e.originalEvent;

      if (utils.DomHandler.isClickable(event.target)) {
        return;
      }

      if (this.props.onRowDoubleClick) {
        this.props.onRowDoubleClick(e);
      }
    }
  }, {
    key: "onRowRightClick",
    value: function onRowRightClick(event) {
      if (this.props.onContextMenu || this.props.onContextMenuSelectionChange) {
        utils.DomHandler.clearSelection();

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
    key: "onRowTouchEnd",
    value: function onRowTouchEnd() {
      this.rowTouched = true;
    }
  }, {
    key: "onRowMouseDown",
    value: function onRowMouseDown(e) {
      utils.DomHandler.clearSelection();
      var event = e.originalEvent;
      if (utils.DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle')) event.currentTarget.draggable = true;else event.currentTarget.draggable = false;

      if (this.allowRowDrag(e)) {
        this.enableDragSelection(event);
        this.anchorRowIndex = e.index;
        this.rangeRowIndex = e.index;
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
    key: "onRowToggle",
    value: function onRowToggle(event) {
      var expandedRows;
      var dataKey = this.props.dataKey;
      var hasDataKey = this.props.groupRowsBy ? dataKey === this.props.groupRowsBy : !!dataKey;

      if (hasDataKey) {
        var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(event.data, dataKey));
        expandedRows = this.props.expandedRows ? _objectSpread$5({}, this.props.expandedRows) : {};

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
        var expandedRowIndex = this.findIndex(this.props.expandedRows, event.data);
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
    key: "onRowDragStart",
    value: function onRowDragStart(e) {
      var event = e.originalEvent,
          index = e.index;
      this.rowDragging = true;
      this.draggedRowIndex = index;
      event.dataTransfer.setData('text', 'b'); // For firefox
    }
  }, {
    key: "onRowDragOver",
    value: function onRowDragOver(e) {
      var event = e.originalEvent,
          index = e.index;

      if (this.rowDragging && this.draggedRowIndex !== index) {
        var rowElement = event.currentTarget;
        var rowY = utils.DomHandler.getOffset(rowElement).top + utils.DomHandler.getWindowScrollTop();
        var pageY = event.pageY;
        var rowMidY = rowY + utils.DomHandler.getOuterHeight(rowElement) / 2;
        var prevRowElement = rowElement.previousElementSibling;

        if (pageY < rowMidY) {
          utils.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
          this.droppedRowIndex = index;
          if (prevRowElement) utils.DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');else utils.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
        } else {
          if (prevRowElement) utils.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');else utils.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          this.droppedRowIndex = index + 1;
          utils.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
        }
      }

      event.preventDefault();
    }
  }, {
    key: "onRowDragLeave",
    value: function onRowDragLeave(e) {
      var event = e.originalEvent;
      var rowElement = event.currentTarget;
      var prevRowElement = rowElement.previousElementSibling;

      if (prevRowElement) {
        utils.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
      }

      utils.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
      utils.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }
  }, {
    key: "onRowDragEnd",
    value: function onRowDragEnd(e) {
      var event = e.originalEvent;
      this.rowDragging = false;
      this.draggedRowIndex = null;
      this.droppedRowIndex = null;
      event.currentTarget.draggable = false;
    }
  }, {
    key: "onRowDrop",
    value: function onRowDrop(e) {
      var event = e.originalEvent;

      if (this.droppedRowIndex != null) {
        var dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;

        var val = _toConsumableArray(this.props.value);

        utils.ObjectUtils.reorderArray(val, this.draggedRowIndex, dropIndex);

        if (this.props.onRowReorder) {
          this.props.onRowReorder({
            originalEvent: event,
            value: val,
            dragIndex: this.draggedRowIndex,
            dropIndex: this.droppedRowIndex
          });
        }
      } //cleanup


      this.onRowDragLeave(e);
      this.onRowDragEnd(e);
      event.preventDefault();
    }
  }, {
    key: "onRadioChange",
    value: function onRadioChange(event) {
      this.onSingleSelection(_objectSpread$5(_objectSpread$5({}, event), {}, {
        toggleable: true,
        type: 'radio'
      }));
    }
  }, {
    key: "onCheckboxChange",
    value: function onCheckboxChange(event) {
      this.onMultipleSelection(_objectSpread$5(_objectSpread$5({}, event), {}, {
        toggleable: true,
        type: 'checkbox'
      }));
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
              data = _objectWithoutProperties(event, _excluded);

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
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.frozenRow) {
        this.updateFrozenRowStickyPosition();
      }

      if (this.props.scrollable && this.props.rowGroupMode === 'subheader') {
        this.updateFrozenRowGroupHeaderStickyPosition();
      }

      if (!this.props.isVirtualScrollerDisabled && this.getVirtualScrollerOption('vertical')) {
        this.updateVirtualScrollerPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.frozenRow) {
        this.updateFrozenRowStickyPosition();
      }

      if (this.props.scrollable && this.props.rowGroupMode === 'subheader') {
        this.updateFrozenRowGroupHeaderStickyPosition();
      }

      if (!this.props.isVirtualScrollerDisabled && this.getVirtualScrollerOption('vertical') && this.getVirtualScrollerOption('itemSize', prevProps.virtualScrollerOptions) !== this.getVirtualScrollerOption('itemSize')) {
        this.updateVirtualScrollerPosition();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.dragSelection) {
        this.unbindDragSelectionEvents();
      }
    }
  }, {
    key: "renderEmptyContent",
    value: function renderEmptyContent() {
      if (!this.props.loading) {
        var colSpan = this.getColumnsLength();
        var content = utils.ObjectUtils.getJSXElement(this.props.emptyMessage, {
          props: this.props,
          frozen: this.props.frozenRow
        }) || PrimeReact.localeOption('emptyMessage');
        return /*#__PURE__*/React__default["default"].createElement("tr", {
          className: "p-datatable-emptymessage",
          role: "row"
        }, /*#__PURE__*/React__default["default"].createElement("td", {
          colSpan: colSpan,
          role: "cell"
        }, content));
      }

      return null;
    }
  }, {
    key: "renderGroupHeader",
    value: function renderGroupHeader(rowData, index, expanded, isSubheaderGrouping, colSpan) {
      if (isSubheaderGrouping && this.shouldRenderRowGroupHeader(this.props.value, rowData, index)) {
        var style = this.rowGroupHeaderStyle();
        var toggler = this.props.expandableRowGroups && /*#__PURE__*/React__default["default"].createElement(RowTogglerButton, {
          onClick: this.onRowToggle,
          rowData: rowData,
          expanded: expanded,
          expandedRowIcon: this.props.expandedRowIcon,
          collapsedRowIcon: this.props.collapsedRowIcon
        });
        var content = utils.ObjectUtils.getJSXElement(this.props.rowGroupHeaderTemplate, rowData, {
          index: index,
          props: this.props.tableProps
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", {
          className: "p-rowgroup-header",
          style: style,
          role: "row"
        }, /*#__PURE__*/React__default["default"].createElement("td", {
          colSpan: colSpan
        }, toggler, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-rowgroup-header-name"
        }, content)));
      }

      return null;
    }
  }, {
    key: "renderRow",
    value: function renderRow(rowData, index, expanded) {
      if (!this.props.expandableRowGroups || expanded) {
        var selected = this.isSelectionEnabled() ? this.isSelected(rowData) : false;
        var contextMenuSelected = this.isContextMenuSelected(rowData);
        var allowRowSelection = this.allowRowSelection();
        var allowCellSelection = this.allowCellSelection();
        var editing = this.isRowEditing(rowData);
        return /*#__PURE__*/React__default["default"].createElement(BodyRow, {
          tableProps: this.props.tableProps,
          tableSelector: this.props.tableSelector,
          value: this.props.value,
          columns: this.props.columns,
          rowData: rowData,
          index: index,
          selected: selected,
          contextMenuSelected: contextMenuSelected,
          onRowClick: this.onRowClick,
          onRowDoubleClick: this.onRowDoubleClick,
          onRowRightClick: this.onRowRightClick,
          tabIndex: this.props.tabIndex,
          onRowTouchEnd: this.onRowTouchEnd,
          onRowMouseDown: this.onRowMouseDown,
          onRowMouseUp: this.onRowMouseUp,
          onRowToggle: this.onRowToggle,
          onRowDragStart: this.onRowDragStart,
          onRowDragOver: this.onRowDragOver,
          onRowDragLeave: this.onRowDragLeave,
          onRowDragEnd: this.onRowDragEnd,
          onRowDrop: this.onRowDrop,
          onRadioChange: this.onRadioChange,
          onCheckboxChange: this.onCheckboxChange,
          onCellClick: this.onCellClick,
          onCellMouseDown: this.onCellMouseDown,
          onCellMouseUp: this.onCellMouseUp,
          editing: editing,
          editingRows: this.props.editingRows,
          editingMeta: this.props.editingMeta,
          editMode: this.props.editMode,
          onRowEditChange: this.props.onRowEditChange,
          onEditingMetaChange: this.props.onEditingMetaChange,
          groupRowsBy: this.props.groupRowsBy,
          compareSelectionBy: this.props.compareSelectionBy,
          dataKey: this.props.dataKey,
          rowGroupMode: this.props.rowGroupMode,
          onRowEditInit: this.props.onRowEditInit,
          rowEditValidator: this.props.rowEditValidator,
          onRowEditSave: this.props.onRowEditSave,
          onRowEditComplete: this.props.onRowEditComplete,
          onRowEditCancel: this.props.onRowEditCancel,
          selection: this.props.selection,
          allowRowSelection: allowRowSelection,
          allowCellSelection: allowCellSelection,
          selectOnEdit: this.props.selectOnEdit,
          selectionMode: this.props.selectionMode,
          selectionModeInColumn: this.props.selectionModeInColumn,
          cellClassName: this.props.cellClassName,
          responsiveLayout: this.props.responsiveLayout,
          frozenRow: this.props.frozenRow,
          showSelectionElement: this.props.showSelectionElement,
          showRowReorderElement: this.props.showRowReorderElement,
          expanded: expanded,
          expandedRowIcon: this.props.expandedRowIcon,
          collapsedRowIcon: this.props.collapsedRowIcon,
          rowClassName: this.props.rowClassName,
          virtualScrollerOptions: this.props.virtualScrollerOptions
        });
      }
    }
  }, {
    key: "renderExpansion",
    value: function renderExpansion(rowData, index, expanded, isSubheaderGrouping, colSpan) {
      if (expanded && !(isSubheaderGrouping && this.props.expandableRowGroups)) {
        var content = utils.ObjectUtils.getJSXElement(this.props.rowExpansionTemplate, rowData, {
          index: index
        });
        var id = "".concat(this.props.tableSelector, "_content_").concat(index, "_expanded");
        return /*#__PURE__*/React__default["default"].createElement("tr", {
          id: id,
          className: "p-datatable-row-expansion",
          role: "row"
        }, /*#__PURE__*/React__default["default"].createElement("td", {
          role: "cell",
          colSpan: colSpan
        }, content));
      }

      return null;
    }
  }, {
    key: "renderGroupFooter",
    value: function renderGroupFooter(rowData, index, expanded, isSubheaderGrouping, colSpan) {
      if (isSubheaderGrouping && this.shouldRenderRowGroupFooter(this.props.value, rowData, index, expanded)) {
        var content = utils.ObjectUtils.getJSXElement(this.props.rowGroupFooterTemplate, rowData, {
          index: index,
          colSpan: colSpan,
          props: this.props.tableProps
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", {
          className: "p-rowgroup-footer",
          role: "row"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this5 = this;

      return this.props.value.map(function (rowData, i) {
        var index = _this5.getVirtualScrollerOption('getItemOptions') ? _this5.getVirtualScrollerOption('getItemOptions')(i).index : _this5.props.first + i;

        var key = _this5.getRowKey(rowData, index);

        var expanded = _this5.isRowExpanded(rowData);

        var isSubheaderGrouping = _this5.isSubheaderGrouping();

        var colSpan = _this5.getColumnsLength();

        var groupHeader = _this5.renderGroupHeader(rowData, index, expanded, isSubheaderGrouping, colSpan);

        var row = _this5.renderRow(rowData, index, expanded);

        var expansion = _this5.renderExpansion(rowData, index, expanded, isSubheaderGrouping, colSpan);

        var groupFooter = _this5.renderGroupFooter(rowData, index, expanded, isSubheaderGrouping, colSpan);

        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
          key: key
        }, groupHeader, row, expansion, groupFooter);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var className = utils.classNames('p-datatable-tbody', this.props.className);
      var content = this.props.empty ? this.renderEmptyContent() : this.renderContent();
      return /*#__PURE__*/React__default["default"].createElement("tbody", {
        ref: this.ref,
        className: className
      }, content);
    }
  }]);

  return TableBody;
}(React.Component);

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FooterCell = /*#__PURE__*/function (_Component) {
  _inherits(FooterCell, _Component);

  var _super = _createSuper$6(FooterCell);

  function FooterCell(props) {
    var _this;

    _classCallCheck(this, FooterCell);

    _this = _super.call(this, props);
    _this.state = {
      styleObject: {}
    };
    return _this;
  }

  _createClass(FooterCell, [{
    key: "getColumnProp",
    value: function getColumnProp(prop) {
      return this.props.column.props[prop];
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var footerStyle = this.getColumnProp('footerStyle');
      var columnStyle = this.getColumnProp('style');
      return this.getColumnProp('frozen') ? Object.assign({}, columnStyle, footerStyle, this.state.styleObject) : Object.assign({}, columnStyle, footerStyle);
    }
  }, {
    key: "updateStickyPosition",
    value: function updateStickyPosition() {
      if (this.getColumnProp('frozen')) {
        var styleObject = _objectSpread$4({}, this.state.styleObject);

        var align = this.getColumnProp('alignFrozen');

        if (align === 'right') {
          var right = 0;
          var next = this.el.nextElementSibling;

          if (next) {
            right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }

          styleObject['right'] = right + 'px';
        } else {
          var left = 0;
          var prev = this.el.previousElementSibling;

          if (prev) {
            left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }

          styleObject['left'] = left + 'px';
        }

        this.setState({
          styleObject: styleObject
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.getColumnProp('frozen')) {
        this.updateStickyPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.getColumnProp('frozen')) {
        this.updateStickyPosition();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = this.getStyle();
      var className = utils.classNames(this.getColumnProp('footerClassName'), this.getColumnProp('className'), {
        'p-frozen-column': this.getColumnProp('frozen')
      });
      var colSpan = this.getColumnProp('colSpan');
      var rowSpan = this.getColumnProp('rowSpan');
      var content = utils.ObjectUtils.getJSXElement(this.getColumnProp('footer'), {
        props: this.props.tableProps
      });
      return /*#__PURE__*/React__default["default"].createElement("td", {
        ref: function ref(el) {
          return _this2.el = el;
        },
        style: style,
        className: className,
        role: "cell",
        colSpan: colSpan,
        rowSpan: rowSpan
      }, content);
    }
  }]);

  return FooterCell;
}(React.Component);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TableFooter = /*#__PURE__*/function (_Component) {
  _inherits(TableFooter, _Component);

  var _super = _createSuper$5(TableFooter);

  function TableFooter() {
    _classCallCheck(this, TableFooter);

    return _super.apply(this, arguments);
  }

  _createClass(TableFooter, [{
    key: "hasFooter",
    value: function hasFooter() {
      return this.props.footerColumnGroup ? true : this.props.columns ? this.props.columns.some(function (col) {
        return col && col.props.footer;
      }) : false;
    }
  }, {
    key: "renderGroupFooterCells",
    value: function renderGroupFooterCells(row) {
      var columns = React__default["default"].Children.toArray(row.props.children);
      return this.renderFooterCells(columns);
    }
  }, {
    key: "renderFooterCells",
    value: function renderFooterCells(columns) {
      var _this = this;

      return React__default["default"].Children.map(columns, function (col, i) {
        var isVisible = col ? !col.props.hidden : true;
        var key = col ? col.props.columnKey || col.props.field || i : i;
        return isVisible && /*#__PURE__*/React__default["default"].createElement(FooterCell, {
          key: key,
          tableProps: _this.props.tableProps,
          column: col
        });
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      if (this.props.footerColumnGroup) {
        var rows = React__default["default"].Children.toArray(this.props.footerColumnGroup.props.children);
        return rows.map(function (row, i) {
          return /*#__PURE__*/React__default["default"].createElement("tr", {
            key: i,
            role: "row"
          }, _this2.renderGroupFooterCells(row));
        });
      }

      return /*#__PURE__*/React__default["default"].createElement("tr", {
        role: "row"
      }, this.renderFooterCells(this.props.columns));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.hasFooter()) {
        var content = this.renderContent();
        return /*#__PURE__*/React__default["default"].createElement("tfoot", {
          className: "p-datatable-tfoot"
        }, content);
      }

      return null;
    }
  }]);

  return TableFooter;
}(React.Component);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var HeaderCheckbox = /*#__PURE__*/function (_Component) {
  _inherits(HeaderCheckbox, _Component);

  var _super = _createSuper$4(HeaderCheckbox);

  function HeaderCheckbox(props) {
    var _this;

    _classCallCheck(this, HeaderCheckbox);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HeaderCheckbox, [{
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        focused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focused: false
      });
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled) {
        this.setState({
          focused: true
        });
        this.props.onChange({
          originalEvent: event,
          checked: this.props.checked
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.code === 'Space') {
        this.onClick(event);
        event.preventDefault();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var boxClassName = utils.classNames('p-checkbox-box p-component', {
        'p-highlight': this.props.checked,
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused
      });
      var iconClassName = utils.classNames('p-checkbox-icon', {
        'pi pi-check': this.props.checked
      });
      var tabIndex = this.props.disabled ? null : 0;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-checkbox p-component",
        onClick: this.onClick
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: boxClassName,
        role: "checkbox",
        "aria-checked": this.props.checked,
        tabIndex: tabIndex,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: iconClassName
      })));
    }
  }]);

  return HeaderCheckbox;
}(React.Component);

var FilterMatchMode = Object.freeze({
  STARTS_WITH: 'startsWith',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  IN: 'in',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUAL_TO: 'lte',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUAL_TO: 'gte',
  BETWEEN: 'between',
  DATE_IS: 'dateIs',
  DATE_IS_NOT: 'dateIsNot',
  DATE_BEFORE: 'dateBefore',
  DATE_AFTER: 'dateAfter',
  CUSTOM: 'custom'
});

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ColumnFilter = /*#__PURE__*/function (_Component) {
  _inherits(ColumnFilter, _Component);

  var _super = _createSuper$3(ColumnFilter);

  function ColumnFilter(props) {
    var _this;

    _classCallCheck(this, ColumnFilter);

    _this = _super.call(this, props);
    _this.state = {
      overlayVisible: false
    };
    _this.overlayRef = /*#__PURE__*/React__default["default"].createRef();
    _this.filterCallback = _this.filterCallback.bind(_assertThisInitialized(_this));
    _this.filterApplyCallback = _this.filterApplyCallback.bind(_assertThisInitialized(_this));
    _this.onOperatorChange = _this.onOperatorChange.bind(_assertThisInitialized(_this));
    _this.addConstraint = _this.addConstraint.bind(_assertThisInitialized(_this));
    _this.clearFilter = _this.clearFilter.bind(_assertThisInitialized(_this));
    _this.applyFilter = _this.applyFilter.bind(_assertThisInitialized(_this));
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.toggleMenu = _this.toggleMenu.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onContentKeyDown = _this.onContentKeyDown.bind(_assertThisInitialized(_this));
    _this.onContentClick = _this.onContentClick.bind(_assertThisInitialized(_this));
    _this.onContentMouseDown = _this.onContentMouseDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ColumnFilter, [{
    key: "field",
    get: function get() {
      return this.getColumnProp('filterField') || this.getColumnProp('field');
    }
  }, {
    key: "overlay",
    get: function get() {
      return this.overlayRef ? this.overlayRef.current : null;
    }
  }, {
    key: "filterModel",
    get: function get() {
      return this.props.filters[this.field];
    }
  }, {
    key: "filterStoreModel",
    get: function get() {
      return this.props.filtersStore[this.field];
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      if (this.props.filtersStore) {
        var fieldFilter = this.props.filtersStore[this.field];
        return fieldFilter && (fieldFilter.operator ? !this.isFilterBlank(fieldFilter.constraints[0].value) : !this.isFilterBlank(fieldFilter.value));
      }

      return false;
    }
  }, {
    key: "hasRowFilter",
    value: function hasRowFilter() {
      return this.filterModel && !this.isFilterBlank(this.filterModel.value);
    }
  }, {
    key: "isFilterBlank",
    value: function isFilterBlank(filter) {
      return utils.ObjectUtils.isEmpty(filter);
    }
  }, {
    key: "isRowMatchModeSelected",
    value: function isRowMatchModeSelected(matchMode) {
      return this.filterModel.matchMode === matchMode;
    }
  }, {
    key: "showMenuButton",
    value: function showMenuButton() {
      return this.getColumnProp('showFilterMenu') && (this.props.display === 'row' ? this.getColumnProp('dataType') !== 'boolean' : true);
    }
  }, {
    key: "matchModes",
    value: function matchModes() {
      return this.getColumnProp('filterMatchModeOptions') || PrimeReact__default["default"].filterMatchModeOptions[this.findDataType()].map(function (key) {
        return {
          label: PrimeReact.localeOption(key),
          value: key
        };
      });
    }
  }, {
    key: "isShowMatchModes",
    value: function isShowMatchModes() {
      return this.getColumnProp('dataType') !== 'boolean' && this.getColumnProp('showFilterMatchModes') && this.matchModes() && this.getColumnProp('showFilterMenuOptions');
    }
  }, {
    key: "isShowOperator",
    value: function isShowOperator() {
      return this.getColumnProp('showFilterOperator') && this.filterModel && this.filterModel.operator && this.getColumnProp('showFilterMenuOptions');
    }
  }, {
    key: "showRemoveIcon",
    value: function showRemoveIcon() {
      return this.fieldConstraints().length > 1;
    }
  }, {
    key: "isShowAddConstraint",
    value: function isShowAddConstraint() {
      return this.getColumnProp('showAddButton') && this.filterModel && this.filterModel.operator && this.fieldConstraints() && this.fieldConstraints().length < this.getColumnProp('maxConstraints') && this.getColumnProp('showFilterMenuOptions');
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(target) {
      return !this.isTargetClicked(target) && this.overlayRef && this.overlayRef.current && !(this.overlayRef.current.isSameNode(target) || this.overlayRef.current.contains(target));
    }
  }, {
    key: "isTargetClicked",
    value: function isTargetClicked(target) {
      return this.icon && (this.icon.isSameNode(target) || this.icon.contains(target));
    }
  }, {
    key: "getColumnProp",
    value: function getColumnProp(prop) {
      return this.props.column.props[prop];
    }
  }, {
    key: "getDefaultConstraint",
    value: function getDefaultConstraint() {
      if (this.props.filtersStore && this.filterStoreModel) {
        if (this.filterStoreModel.operator) {
          return {
            matchMode: this.filterStoreModel.constraints[0].matchMode,
            operator: this.filterStoreModel.operator
          };
        } else {
          return {
            matchMode: this.filterStoreModel.matchMode
          };
        }
      }
    }
  }, {
    key: "findDataType",
    value: function findDataType() {
      var dataType = this.getColumnProp('dataType');
      var matchMode = this.getColumnProp('filterMatchMode');

      var hasMatchMode = function hasMatchMode(key) {
        return PrimeReact__default["default"].filterMatchModeOptions[key].some(function (mode) {
          return mode === matchMode;
        });
      };

      if (matchMode === 'custom' && !hasMatchMode(dataType)) {
        PrimeReact__default["default"].filterMatchModeOptions[dataType].push(FilterMatchMode.CUSTOM);
        return dataType;
      } else if (matchMode) {
        return Object.keys(PrimeReact__default["default"].filterMatchModeOptions).find(function (key) {
          return hasMatchMode(key);
        }) || dataType;
      }

      return dataType;
    }
  }, {
    key: "clearFilter",
    value: function clearFilter() {
      var field = this.field;
      var filterClearCallback = this.getColumnProp('onFilterClear');
      var defaultConstraint = this.getDefaultConstraint();

      var filters = _objectSpread$3({}, this.props.filters);

      if (filters[field].operator) {
        filters[field].constraints.splice(1);
        filters[field].operator = defaultConstraint.operator;
        filters[field].constraints[0] = {
          value: null,
          matchMode: defaultConstraint.matchMode
        };
      } else {
        filters[field].value = null;
        filters[field].matchMode = defaultConstraint.matchMode;
      }

      filterClearCallback && filterClearCallback();
      this.props.onFilterChange(filters);
      this.props.onFilterApply();
      this.hide();
    }
  }, {
    key: "applyFilter",
    value: function applyFilter() {
      var filterApplyClickCallback = this.getColumnProp('onFilterApplyClick');
      filterApplyClickCallback && filterApplyClickCallback({
        field: this.field,
        constraints: this.filterModel
      });
      this.props.onFilterApply();
      this.hide();
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      this.setState(function (prevState) {
        return {
          overlayVisible: !prevState.overlayVisible
        };
      });
    }
  }, {
    key: "onToggleButtonKeyDown",
    value: function onToggleButtonKeyDown(event) {
      switch (event.key) {
        case 'Escape':
        case 'Tab':
          this.hide();
          break;

        case 'ArrowDown':
          if (this.state.overlayVisible) {
            var focusable = utils.DomHandler.getFirstFocusableElement(this.overlay);
            focusable && focusable.focus();
            event.preventDefault();
          } else if (event.altKey) {
            this.setState({
              overlayVisible: true
            });
            event.preventDefault();
          }

          break;
      }
    }
  }, {
    key: "onContentKeyDown",
    value: function onContentKeyDown(event) {
      if (event.key === 'Escape') {
        this.hide();
        this.icon && this.icon.focus();
      }
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(event, index) {
      var filters = _objectSpread$3({}, this.props.filters);

      var value = event.target.value;

      if (this.props.display === 'menu') {
        filters[this.field].constraints[index].value = value;
      } else {
        filters[this.field].value = value;
      }

      this.props.onFilterChange(filters);

      if (!this.getColumnProp('showApplyButton') || this.props.display === 'row') {
        this.props.onFilterApply();
      }
    }
  }, {
    key: "onRowMatchModeChange",
    value: function onRowMatchModeChange(matchMode) {
      var filterMatchModeChangeCallback = this.getColumnProp('onFilterMatchModeChange');

      var filters = _objectSpread$3({}, this.props.filters);

      filters[this.field].matchMode = matchMode;
      filterMatchModeChangeCallback && filterMatchModeChangeCallback({
        field: this.field,
        matchMode: matchMode
      });
      this.props.onFilterChange(filters);
      this.props.onFilterApply();
      this.hide();
    }
  }, {
    key: "onRowMatchModeKeyDown",
    value: function onRowMatchModeKeyDown(event, matchMode, clear) {
      var item = event.target;

      switch (event.key) {
        case 'ArrowDown':
          var nextItem = this.findNextItem(item);

          if (nextItem) {
            item.removeAttribute('tabindex');
            nextItem.tabIndex = 0;
            nextItem.focus();
          }

          event.preventDefault();
          break;

        case 'ArrowUp':
          var prevItem = this.findPrevItem(item);

          if (prevItem) {
            item.removeAttribute('tabindex');
            prevItem.tabIndex = 0;
            prevItem.focus();
          }

          event.preventDefault();
          break;

        case 'Enter':
          clear ? this.clearFilter() : this.onRowMatchModeChange(matchMode.value);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: "onOperatorChange",
    value: function onOperatorChange(e) {
      var filterOperationChangeCallback = this.getColumnProp('onFilterOperatorChange');
      var value = e.value;

      var filters = _objectSpread$3({}, this.props.filters);

      filters[this.field].operator = value;
      this.props.onFilterChange(filters);
      filterOperationChangeCallback && filterOperationChangeCallback({
        field: this.field,
        operator: value
      });

      if (!this.getColumnProp('showApplyButton')) {
        this.props.onFilterApply();
      }
    }
  }, {
    key: "onMenuMatchModeChange",
    value: function onMenuMatchModeChange(value, index) {
      var filterMatchModeChangeCallback = this.getColumnProp('onFilterMatchModeChange');

      var filters = _objectSpread$3({}, this.props.filters);

      filters[this.field].constraints[index].matchMode = value;
      this.props.onFilterChange(filters);
      filterMatchModeChangeCallback && filterMatchModeChangeCallback({
        field: this.field,
        matchMode: value,
        index: index
      });

      if (!this.getColumnProp('showApplyButton')) {
        this.props.onFilterApply();
      }
    }
  }, {
    key: "addConstraint",
    value: function addConstraint() {
      var filterConstraintAddCallback = this.getColumnProp('onFilterConstraintAdd');
      var defaultConstraint = this.getDefaultConstraint();

      var filters = _objectSpread$3({}, this.props.filters);

      var newConstraint = {
        value: null,
        matchMode: defaultConstraint.matchMode
      };
      filters[this.field].constraints.push(newConstraint);
      filterConstraintAddCallback && filterConstraintAddCallback({
        field: this.field,
        constraing: newConstraint
      });
      this.props.onFilterChange(filters);

      if (!this.getColumnProp('showApplyButton')) {
        this.props.onFilterApply();
      }
    }
  }, {
    key: "removeConstraint",
    value: function removeConstraint(index) {
      var filterConstraintRemoveCallback = this.getColumnProp('onFilterConstraintRemove');

      var filters = _objectSpread$3({}, this.props.filters);

      var removedConstraint = filters[this.field].constraints.splice(index, 1);
      filterConstraintRemoveCallback && filterConstraintRemoveCallback({
        field: this.field,
        constraing: removedConstraint
      });
      this.props.onFilterChange(filters);

      if (!this.getColumnProp('showApplyButton')) {
        this.props.onFilterApply();
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return utils.DomHandler.hasClass(nextItem, 'p-column-filter-separator') ? this.findNextItem(nextItem) : nextItem;else return item.parentElement.firstElementChild;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return utils.DomHandler.hasClass(prevItem, 'p-column-filter-separator') ? this.findPrevItem(prevItem) : prevItem;else return item.parentElement.lastElementChild;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        overlayVisible: false
      });
    }
  }, {
    key: "onContentClick",
    value: function onContentClick(event) {
      this.selfClick = true;
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: this.overlay
      });
    }
  }, {
    key: "onContentMouseDown",
    value: function onContentMouseDown() {
      this.selfClick = true;
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      var _this2 = this;

      utils.ZIndexUtils.set('overlay', this.overlay, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
      utils.DomHandler.alignOverlay(this.overlay, this.icon, PrimeReact__default["default"].appendTo, false);
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();

      this.overlayEventListener = function (e) {
        if (!_this2.isOutsideClicked(e.target)) {
          _this2.selfClick = true;
        }
      };

      overlayservice.OverlayService.on('overlay-click', this.overlayEventListener);
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.onOverlayHide();
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      utils.ZIndexUtils.clear(this.overlay);
    }
  }, {
    key: "onOverlayHide",
    value: function onOverlayHide() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
      this.unbindScrollListener();
      overlayservice.OverlayService.off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    }
  }, {
    key: "bindOutsideClickListener",
    value: function bindOutsideClickListener() {
      var _this3 = this;

      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (!_this3.selfClick && _this3.isOutsideClicked(event.target)) {
            _this3.hide();
          }

          _this3.selfClick = false;
        };

        document.addEventListener('click', this.outsideClickListener);
      }
    }
  }, {
    key: "unbindOutsideClickListener",
    value: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
        this.selfClick = false;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this4 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.icon, function () {
          if (_this4.state.overlayVisible) {
            _this4.hide();
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "bindResizeListener",
    value: function bindResizeListener() {
      var _this5 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this5.state.overlayVisible) {
            _this5.hide();
          }
        };

        window.addEventListener('resize', this.resizeListener);
      }
    }
  }, {
    key: "unbindResizeListener",
    value: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    }
  }, {
    key: "fieldConstraints",
    value: function fieldConstraints() {
      return this.filterModel ? this.filterModel.constraints || [this.filterModel] : [];
    }
  }, {
    key: "operator",
    value: function operator() {
      return this.filterModel.operator;
    }
  }, {
    key: "operatorOptions",
    value: function operatorOptions() {
      return [{
        label: PrimeReact.localeOption('matchAll'),
        value: PrimeReact.FilterOperator.AND
      }, {
        label: PrimeReact.localeOption('matchAny'),
        value: PrimeReact.FilterOperator.OR
      }];
    }
  }, {
    key: "noFilterLabel",
    value: function noFilterLabel() {
      return PrimeReact.localeOption('noFilter');
    }
  }, {
    key: "removeRuleButtonLabel",
    value: function removeRuleButtonLabel() {
      return PrimeReact.localeOption('removeRule');
    }
  }, {
    key: "addRuleButtonLabel",
    value: function addRuleButtonLabel() {
      return PrimeReact.localeOption('addRule');
    }
  }, {
    key: "clearButtonLabel",
    value: function clearButtonLabel() {
      return PrimeReact.localeOption('clear');
    }
  }, {
    key: "applyButtonLabel",
    value: function applyButtonLabel() {
      return PrimeReact.localeOption('apply');
    }
  }, {
    key: "filterCallback",
    value: function filterCallback(value) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var filters = _objectSpread$3({}, this.props.filters);

      var meta = filters[this.field];
      this.props.display === 'menu' && meta && meta.operator ? filters[this.field].constraints[index].value = value : filters[this.field].value = value;
      this.props.onFilterChange(filters);
    }
  }, {
    key: "filterApplyCallback",
    value: function filterApplyCallback() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args && this.filterCallback(args[0], args[1]);
      this.props.onFilterApply();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.display === 'menu' && this.state.overlayVisible) {
        utils.DomHandler.alignOverlay(this.overlay, this.icon, PrimeReact__default["default"].appendTo, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.overlayEventListener) {
        overlayservice.OverlayService.off('overlay-click', this.overlayEventListener);
        this.overlayEventListener = null;
      }

      if (this.overlay) {
        utils.ZIndexUtils.clear(this.overlay);
        this.onOverlayHide();
      }
    }
  }, {
    key: "renderFilterElement",
    value: function renderFilterElement(model, index) {
      var _this6 = this;

      return this.getColumnProp('filterElement') ? utils.ObjectUtils.getJSXElement(this.getColumnProp('filterElement'), {
        field: this.field,
        index: index,
        filterModel: model,
        value: model.value,
        filterApplyCallback: this.filterApplyCallback,
        filterCallback: this.filterCallback
      }) : /*#__PURE__*/React__default["default"].createElement(inputtext.InputText, {
        type: this.getColumnProp('filterType'),
        value: model.value || '',
        onChange: function onChange(e) {
          return _this6.onInputChange(e, index);
        },
        className: "p-column-filter",
        placeholder: this.getColumnProp('filterPlaceholder'),
        maxLength: this.getColumnProp('filterMaxLength')
      });
    }
  }, {
    key: "renderRowFilterElement",
    value: function renderRowFilterElement() {
      if (this.props.display === 'row') {
        var content = this.renderFilterElement(this.filterModel, 0);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-fluid p-column-filter-element"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderMenuFilterElement",
    value: function renderMenuFilterElement(fieldConstraint, index) {
      if (this.props.display === 'menu') {
        return this.renderFilterElement(fieldConstraint, index);
      }

      return null;
    }
  }, {
    key: "renderMenuButton",
    value: function renderMenuButton() {
      var _this7 = this;

      if (this.showMenuButton()) {
        var className = utils.classNames('p-column-filter-menu-button p-link', {
          'p-column-filter-menu-button-open': this.state.overlayVisible,
          'p-column-filter-menu-button-active': this.hasFilter()
        });
        return /*#__PURE__*/React__default["default"].createElement("button", {
          ref: function ref(el) {
            return _this7.icon = el;
          },
          type: "button",
          className: className,
          "aria-haspopup": true,
          "aria-expanded": this.state.overlayVisible,
          onClick: this.toggleMenu,
          onKeyDown: this.onToggleButtonKeyDown
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "pi pi-filter-icon pi-filter"
        }));
      }

      return null;
    }
  }, {
    key: "renderClearButton",
    value: function renderClearButton() {
      if (this.getColumnProp('showClearButton') && this.props.display === 'row') {
        var className = utils.classNames('p-column-filter-clear-button p-link', {
          'p-hidden-space': !this.hasRowFilter()
        });
        return /*#__PURE__*/React__default["default"].createElement("button", {
          className: className,
          type: "button",
          onClick: this.clearFilter
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "pi pi-filter-slash"
        }));
      }

      return null;
    }
  }, {
    key: "renderRowItems",
    value: function renderRowItems() {
      var _this8 = this;

      if (this.isShowMatchModes()) {
        var matchModes = this.matchModes();
        var noFilterLabel = this.noFilterLabel();
        return /*#__PURE__*/React__default["default"].createElement("ul", {
          className: "p-column-filter-row-items"
        }, matchModes.map(function (matchMode, i) {
          var value = matchMode.value,
              label = matchMode.label;
          var className = utils.classNames('p-column-filter-row-item', {
            'p-highlight': _this8.isRowMatchModeSelected(value)
          });
          var tabIndex = i === 0 ? 0 : null;
          return /*#__PURE__*/React__default["default"].createElement("li", {
            className: className,
            key: label,
            onClick: function onClick() {
              return _this8.onRowMatchModeChange(value);
            },
            onKeyDown: function onKeyDown(e) {
              return _this8.onRowMatchModeKeyDown(e, matchMode);
            },
            tabIndex: tabIndex
          }, label);
        }), /*#__PURE__*/React__default["default"].createElement("li", {
          className: "p-column-filter-separator"
        }), /*#__PURE__*/React__default["default"].createElement("li", {
          className: "p-column-filter-row-item",
          onClick: this.clearFilter,
          onKeyDown: function onKeyDown(e) {
            return _this8.onRowMatchModeKeyDown(e, null, true);
          }
        }, noFilterLabel));
      }

      return null;
    }
  }, {
    key: "renderOperator",
    value: function renderOperator() {
      if (this.isShowOperator()) {
        var options = this.operatorOptions();
        var value = this.operator();
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-column-filter-operator"
        }, /*#__PURE__*/React__default["default"].createElement(dropdown.Dropdown, {
          options: options,
          value: value,
          onChange: this.onOperatorChange,
          className: "p-column-filter-operator-dropdown"
        }));
      }

      return null;
    }
  }, {
    key: "renderMatchModeDropdown",
    value: function renderMatchModeDropdown(constraint, index) {
      var _this9 = this;

      if (this.isShowMatchModes()) {
        var options = this.matchModes();
        return /*#__PURE__*/React__default["default"].createElement(dropdown.Dropdown, {
          options: options,
          value: constraint.matchMode,
          onChange: function onChange(e) {
            return _this9.onMenuMatchModeChange(e.value, index);
          },
          className: "p-column-filter-matchmode-dropdown"
        });
      }

      return null;
    }
  }, {
    key: "renderRemoveButton",
    value: function renderRemoveButton(index) {
      var _this10 = this;

      if (this.showRemoveIcon()) {
        var removeRuleLabel = this.removeRuleButtonLabel();
        return /*#__PURE__*/React__default["default"].createElement(button.Button, {
          type: "button",
          icon: "pi pi-trash",
          className: "p-column-filter-remove-button p-button-text p-button-danger p-button-sm",
          onClick: function onClick() {
            return _this10.removeConstraint(index);
          },
          label: removeRuleLabel
        });
      }

      return null;
    }
  }, {
    key: "renderConstraints",
    value: function renderConstraints() {
      var _this11 = this;

      var fieldConstraints = this.fieldConstraints();
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-column-filter-constraints"
      }, fieldConstraints.map(function (fieldConstraint, i) {
        var matchModeDropdown = _this11.renderMatchModeDropdown(fieldConstraint, i);

        var menuFilterElement = _this11.renderMenuFilterElement(fieldConstraint, i);

        var removeButton = _this11.renderRemoveButton(i);

        return /*#__PURE__*/React__default["default"].createElement("div", {
          key: i,
          className: "p-column-filter-constraint"
        }, matchModeDropdown, menuFilterElement, /*#__PURE__*/React__default["default"].createElement("div", null, removeButton));
      }));
    }
  }, {
    key: "renderAddRule",
    value: function renderAddRule() {
      if (this.isShowAddConstraint()) {
        var addRuleLabel = this.addRuleButtonLabel();
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-column-filter-add-rule"
        }, /*#__PURE__*/React__default["default"].createElement(button.Button, {
          type: "button",
          label: addRuleLabel,
          icon: "pi pi-plus",
          className: "p-column-filter-add-button p-button-text p-button-sm",
          onClick: this.addConstraint
        }));
      }

      return null;
    }
  }, {
    key: "renderFilterClearButton",
    value: function renderFilterClearButton() {
      if (this.getColumnProp('showClearButton')) {
        if (!this.getColumnProp('filterClear')) {
          var clearLabel = this.clearButtonLabel();
          return /*#__PURE__*/React__default["default"].createElement(button.Button, {
            type: "button",
            className: "p-button-outlined p-button-sm",
            onClick: this.clearFilter,
            label: clearLabel
          });
        }

        return utils.ObjectUtils.getJSXElement(this.getColumnProp('filterClear'), {
          field: this.field,
          filterModel: this.filterModel,
          filterClearCallback: this.clearFilter
        });
      }

      return null;
    }
  }, {
    key: "renderFilterApplyButton",
    value: function renderFilterApplyButton() {
      if (this.getColumnProp('showApplyButton')) {
        if (!this.getColumnProp('filterApply')) {
          var applyLabel = this.applyButtonLabel();
          return /*#__PURE__*/React__default["default"].createElement(button.Button, {
            type: "button",
            className: "p-button-sm",
            onClick: this.applyFilter,
            label: applyLabel
          });
        }

        return utils.ObjectUtils.getJSXElement(this.getColumnProp('filterApply'), {
          field: this.field,
          filterModel: this.filterModel,
          filterApplyCallback: this.applyFilter
        });
      }

      return null;
    }
  }, {
    key: "renderButtonBar",
    value: function renderButtonBar() {
      var clearButton = this.renderFilterClearButton();
      var applyButton = this.renderFilterApplyButton();
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-column-filter-buttonbar"
      }, clearButton, applyButton);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var operator = this.renderOperator();
      var constraints = this.renderConstraints();
      var addRule = this.renderAddRule();
      var buttonBar = this.renderButtonBar();
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, operator, constraints, addRule, buttonBar);
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var style = this.getColumnProp('filterMenuStyle');
      var className = utils.classNames('p-column-filter-overlay p-component p-fluid', this.getColumnProp('filterMenuClassName'), {
        'p-column-filter-overlay-menu': this.props.display === 'menu',
        'p-input-filled': PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': PrimeReact__default["default"].ripple === false
      });
      var filterHeader = utils.ObjectUtils.getJSXElement(this.getColumnProp('filterHeader'), {
        field: this.field,
        filterModel: this.filterModel,
        filterApplyCallback: this.filterApplyCallback
      });
      var filterFooter = utils.ObjectUtils.getJSXElement(this.getColumnProp('filterFooter'), {
        field: this.field,
        filterModel: this.filterModel,
        filterApplyCallback: this.filterApplyCallback
      });
      var items = this.props.display === 'row' ? this.renderRowItems() : this.renderItems();
      return /*#__PURE__*/React__default["default"].createElement(portal.Portal, null, /*#__PURE__*/React__default["default"].createElement(csstransition.CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-connected-overlay",
        in: this.state.overlayVisible,
        timeout: {
          enter: 120,
          exit: 100
        },
        unmountOnExit: true,
        onEnter: this.onOverlayEnter,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        ref: this.overlayRef,
        style: style,
        className: className,
        onKeyDown: this.onContentKeyDown,
        onClick: this.onContentClick,
        onMouseDown: this.onContentMouseDown
      }, filterHeader, items, filterFooter)));
    }
  }, {
    key: "render",
    value: function render() {
      var className = utils.classNames('p-column-filter p-fluid', {
        'p-column-filter-row': this.props.display === 'row',
        'p-column-filter-menu': this.props.display === 'menu'
      });
      var rowFilterElement = this.renderRowFilterElement();
      var menuButton = this.renderMenuButton();
      var clearButton = this.renderClearButton();
      var overlay = this.renderOverlay();
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: className
      }, rowFilterElement, menuButton, clearButton, overlay);
    }
  }]);

  return ColumnFilter;
}(React.Component);

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var HeaderCell = /*#__PURE__*/function (_Component) {
  _inherits(HeaderCell, _Component);

  var _super = _createSuper$2(HeaderCell);

  function HeaderCell(props) {
    var _this;

    _classCallCheck(this, HeaderCell);

    _this = _super.call(this, props);
    _this.state = {
      styleObject: {}
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this)); // drag

    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
    _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
    _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this)); // resize

    _this.onResizerMouseDown = _this.onResizerMouseDown.bind(_assertThisInitialized(_this));
    _this.onResizerClick = _this.onResizerClick.bind(_assertThisInitialized(_this));
    _this.onResizerDoubleClick = _this.onResizerDoubleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HeaderCell, [{
    key: "isBadgeVisible",
    value: function isBadgeVisible() {
      return this.props.multiSortMeta && this.props.multiSortMeta.length > 1;
    }
  }, {
    key: "isSortableDisabled",
    value: function isSortableDisabled() {
      return !this.getColumnProp('sortable') || this.getColumnProp('sortable') && (this.props.allSortableDisabled || this.getColumnProp('sortableDisabled'));
    }
  }, {
    key: "getColumnProp",
    value: function getColumnProp() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.props.column ? typeof args[0] === 'string' ? this.props.column.props[args[0]] : (args[0] || this.props.column).props[args[1]] : null;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var headerStyle = this.getColumnProp('headerStyle');
      var columnStyle = this.getColumnProp('style');
      return this.getColumnProp('frozen') ? Object.assign({}, columnStyle, headerStyle, this.state.styleObject) : Object.assign({}, columnStyle, headerStyle);
    }
  }, {
    key: "getMultiSortMetaIndex",
    value: function getMultiSortMetaIndex() {
      var _this2 = this;

      return this.props.multiSortMeta.findIndex(function (meta) {
        return meta.field === _this2.getColumnProp('field') || meta.field === _this2.getColumnProp('sortField');
      });
    }
  }, {
    key: "getSortMeta",
    value: function getSortMeta() {
      var sorted = false;
      var sortOrder = 0;
      var metaIndex = -1;

      if (this.props.sortMode === 'single') {
        sorted = this.props.sortField && (this.props.sortField === this.getColumnProp('field') || this.props.sortField === this.getColumnProp('sortField'));
        sortOrder = sorted ? this.props.sortOrder : 0;
      } else if (this.props.sortMode === 'multiple') {
        metaIndex = this.getMultiSortMetaIndex();

        if (metaIndex > -1) {
          sorted = true;
          sortOrder = this.props.multiSortMeta[metaIndex].order;
        }
      }

      return {
        sorted: sorted,
        sortOrder: sortOrder,
        metaIndex: metaIndex
      };
    }
  }, {
    key: "getAriaSort",
    value: function getAriaSort(_ref) {
      var sorted = _ref.sorted,
          sortOrder = _ref.sortOrder;

      if (this.getColumnProp('sortable')) {
        var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt' : 'pi-sort-alt';
        if (sortIcon === 'pi-sort-amount-down') return 'descending';else if (sortIcon === 'pi-sort-amount-up-alt') return 'ascending';else return 'none';
      }

      return null;
    }
  }, {
    key: "updateStickyPosition",
    value: function updateStickyPosition() {
      if (this.getColumnProp('frozen')) {
        var styleObject = _objectSpread$2({}, this.state.styleObject);

        var align = this.getColumnProp('alignFrozen');

        if (align === 'right') {
          var right = 0;
          var next = this.el.nextElementSibling;

          if (next) {
            right = utils.DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }

          styleObject['right'] = right + 'px';
        } else {
          var left = 0;
          var prev = this.el.previousElementSibling;

          if (prev) {
            left = utils.DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }

          styleObject['left'] = left + 'px';
        }

        var filterRow = this.el.parentElement.nextElementSibling;

        if (filterRow) {
          var index = utils.DomHandler.index(this.el);
          filterRow.children[index].style.left = styleObject['left'];
          filterRow.children[index].style.right = styleObject['right'];
        }

        var isSameStyle = this.state.styleObject['left'] === styleObject['left'] && this.state.styleObject['right'] === styleObject['right'];
        !isSameStyle && this.setState({
          styleObject: styleObject
        });
      }
    }
  }, {
    key: "updateSortableDisabled",
    value: function updateSortableDisabled(prevColumn) {
      if (this.getColumnProp(prevColumn, 'sortableDisabled') !== this.getColumnProp('sortableDisabled') || this.getColumnProp(prevColumn, 'sortable') !== this.getColumnProp('sortable')) {
        this.props.onSortableChange();
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (!this.isSortableDisabled()) {
        var targetNode = event.target;

        if (utils.DomHandler.hasClass(targetNode, 'p-sortable-column') || utils.DomHandler.hasClass(targetNode, 'p-column-title') || utils.DomHandler.hasClass(targetNode, 'p-column-header-content') || utils.DomHandler.hasClass(targetNode, 'p-sortable-column-icon') || utils.DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
          utils.DomHandler.clearSelection();
          this.props.onSortChange({
            originalEvent: event,
            column: this.props.column,
            sortableDisabledFields: this.props.sortableDisabledFields
          });
        }
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      this.props.onColumnMouseDown({
        originalEvent: event,
        column: this.props.column
      });
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.key === 'Enter' && event.currentTarget === this.el && utils.DomHandler.hasClass(event.currentTarget, 'p-sortable-column')) {
        this.onClick(event);
        event.preventDefault();
      }
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      this.props.onColumnDragStart({
        originalEvent: event,
        column: this.props.column
      });
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      this.props.onColumnDragOver({
        originalEvent: event,
        column: this.props.column
      });
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event) {
      this.props.onColumnDragLeave({
        originalEvent: event,
        column: this.props.column
      });
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      this.props.onColumnDrop({
        originalEvent: event,
        column: this.props.column
      });
    }
  }, {
    key: "onResizerMouseDown",
    value: function onResizerMouseDown(event) {
      this.props.onColumnResizeStart({
        originalEvent: event,
        column: this.props.column
      });
    }
  }, {
    key: "onResizerClick",
    value: function onResizerClick(event) {
      if (this.props.onColumnResizerClick) {
        this.props.onColumnResizerClick({
          originalEvent: event,
          element: event.currentTarget.parentElement,
          column: this.props.column
        });
        event.preventDefault();
      }
    }
  }, {
    key: "onResizerDoubleClick",
    value: function onResizerDoubleClick(event) {
      if (this.props.onColumnResizerDoubleClick) {
        this.props.onColumnResizerDoubleClick({
          originalEvent: event,
          element: event.currentTarget.parentElement,
          column: this.props.column
        });
        event.preventDefault();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.getColumnProp('frozen')) {
        this.updateStickyPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.getColumnProp('frozen')) {
        this.updateStickyPosition();
      }

      this.updateSortableDisabled(prevProps.column);
    }
  }, {
    key: "renderResizer",
    value: function renderResizer() {
      if (this.props.resizableColumns && !this.getColumnProp('frozen')) {
        return /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-column-resizer",
          onMouseDown: this.onResizerMouseDown,
          onClick: this.onResizerClick,
          onDoubleClick: this.onResizerDoubleClick
        });
      }

      return null;
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var title = utils.ObjectUtils.getJSXElement(this.getColumnProp('header'), {
        props: this.props.tableProps
      });
      return /*#__PURE__*/React__default["default"].createElement("span", {
        className: "p-column-title"
      }, title);
    }
  }, {
    key: "renderSortIcon",
    value: function renderSortIcon(_ref2) {
      var sorted = _ref2.sorted,
          sortOrder = _ref2.sortOrder;

      if (this.getColumnProp('sortable')) {
        var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt' : 'pi-sort-alt';
        var className = utils.classNames('p-sortable-column-icon pi pi-fw', sortIcon);
        return /*#__PURE__*/React__default["default"].createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderBadge",
    value: function renderBadge(_ref3) {
      var metaIndex = _ref3.metaIndex;

      if (metaIndex !== -1 && this.isBadgeVisible()) {
        var value = this.props.groupRowsBy && this.props.groupRowsBy === this.props.groupRowSortField ? metaIndex : metaIndex + 1;
        return /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-sortable-column-badge"
        }, value);
      }

      return null;
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      if (this.getColumnProp('selectionMode') === 'multiple' && this.props.filterDisplay !== 'row') {
        var allRowsSelected = this.props.allRowsSelected(this.props.value);
        return /*#__PURE__*/React__default["default"].createElement(HeaderCheckbox, {
          checked: allRowsSelected,
          onChange: this.props.onColumnCheckboxChange,
          disabled: this.props.empty
        });
      }

      return null;
    }
  }, {
    key: "renderFilter",
    value: function renderFilter() {
      if (this.props.filterDisplay === 'menu' && this.getColumnProp('filter')) {
        return /*#__PURE__*/React__default["default"].createElement(ColumnFilter, {
          display: "menu",
          column: this.props.column,
          filters: this.props.filters,
          onFilterChange: this.props.onFilterChange,
          onFilterApply: this.props.onFilterApply,
          filtersStore: this.props.filtersStore
        });
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(sortMeta) {
      var title = this.renderTitle();
      var sortIcon = this.renderSortIcon(sortMeta);
      var badge = this.renderBadge(sortMeta);
      var checkbox = this.renderCheckbox();
      var filter = this.renderFilter();
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-column-header-content"
      }, title, sortIcon, badge, checkbox, filter);
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this3 = this;

      var isSortableDisabled = this.isSortableDisabled();
      var sortMeta = this.getSortMeta();
      var style = this.getStyle();
      var className = utils.classNames(this.getColumnProp('headerClassName'), this.getColumnProp('className'), {
        'p-sortable-column': this.getColumnProp('sortable'),
        'p-resizable-column': this.props.resizableColumns,
        'p-highlight': sortMeta.sorted,
        'p-frozen-column': this.getColumnProp('frozen'),
        'p-selection-column': this.getColumnProp('selectionMode'),
        'p-sortable-disabled': this.getColumnProp('sortable') && isSortableDisabled,
        'p-reorderable-column': this.props.reorderableColumns && this.getColumnProp('reorderable')
      });
      var tabIndex = this.getColumnProp('sortable') && !isSortableDisabled ? this.props.tabIndex : null;
      var colSpan = this.getColumnProp('colSpan');
      var rowSpan = this.getColumnProp('rowSpan');
      var ariaSort = this.getAriaSort(sortMeta);
      var resizer = this.renderResizer();
      var header = this.renderHeader(sortMeta);
      return /*#__PURE__*/React__default["default"].createElement("th", {
        ref: function ref(el) {
          return _this3.el = el;
        },
        style: style,
        className: className,
        tabIndex: tabIndex,
        role: "columnheader",
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        onMouseDown: this.onMouseDown,
        onDragStart: this.onDragStart,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop,
        colSpan: colSpan,
        rowSpan: rowSpan,
        "aria-sort": ariaSort
      }, resizer, header);
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderElement();
    }
  }]);

  return HeaderCell;
}(React.Component);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TableHeader = /*#__PURE__*/function (_Component) {
  _inherits(TableHeader, _Component);

  var _super = _createSuper$1(TableHeader);

  function TableHeader(props) {
    var _this;

    _classCallCheck(this, TableHeader);

    _this = _super.call(this, props);
    _this.state = {
      sortableDisabledFields: [],
      allSortableDisabled: false,
      styleObject: {}
    };
    _this.onSortableChange = _this.onSortableChange.bind(_assertThisInitialized(_this));
    _this.onCheckboxChange = _this.onCheckboxChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableHeader, [{
    key: "isSingleSort",
    value: function isSingleSort() {
      return this.props.sortMode === 'single';
    }
  }, {
    key: "isMultipleSort",
    value: function isMultipleSort() {
      return this.props.sortMode === 'multiple';
    }
  }, {
    key: "isAllSortableDisabled",
    value: function isAllSortableDisabled() {
      return this.isSingleSort() && this.state.allSortableDisabled;
    }
  }, {
    key: "isColumnSorted",
    value: function isColumnSorted(column) {
      return this.props.sortField !== null ? column.props.field === this.props.sortField || column.props.sortField === this.props.sortField : false;
    }
  }, {
    key: "updateSortableDisabled",
    value: function updateSortableDisabled() {
      var _this2 = this;

      if (this.isSingleSort() || this.isMultipleSort() && this.props.onSortChange) {
        var sortableDisabledFields = [];
        var allSortableDisabled = false;
        this.props.columns.forEach(function (column) {
          if (column.props.sortableDisabled) {
            sortableDisabledFields.push(column.props.sortField || column.props.field);

            if (!allSortableDisabled && _this2.isColumnSorted(column)) {
              allSortableDisabled = true;
            }
          }
        });
        this.setState({
          sortableDisabledFields: sortableDisabledFields,
          allSortableDisabled: allSortableDisabled
        });
      }
    }
  }, {
    key: "onSortableChange",
    value: function onSortableChange() {
      this.updateSortableDisabled();
    }
  }, {
    key: "onCheckboxChange",
    value: function onCheckboxChange(e) {
      this.props.onColumnCheckboxChange(e, this.props.value);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSortableDisabled();
    }
  }, {
    key: "renderGroupHeaderCells",
    value: function renderGroupHeaderCells(row) {
      var columns = React__default["default"].Children.toArray(row.props.children);
      return this.renderHeaderCells(columns);
    }
  }, {
    key: "renderHeaderCells",
    value: function renderHeaderCells(columns) {
      var _this3 = this;

      return React__default["default"].Children.map(columns, function (col, i) {
        var isVisible = col ? !col.props.hidden : true;
        var key = col ? col.props.columnKey || col.props.field || i : i;
        return isVisible && /*#__PURE__*/React__default["default"].createElement(HeaderCell, {
          key: key,
          value: _this3.props.value,
          tableProps: _this3.props.tableProps,
          column: col,
          tabIndex: _this3.props.tabIndex,
          empty: _this3.props.empty,
          resizableColumns: _this3.props.resizableColumns,
          groupRowsBy: _this3.props.groupRowsBy,
          groupRowSortField: _this3.props.groupRowSortField,
          sortMode: _this3.props.sortMode,
          sortField: _this3.props.sortField,
          sortOrder: _this3.props.sortOrder,
          multiSortMeta: _this3.props.multiSortMeta,
          allSortableDisabled: _this3.isAllSortableDisabled(),
          onSortableChange: _this3.onSortableChange,
          sortableDisabledFields: _this3.state.sortableDisabledFields,
          filterDisplay: _this3.props.filterDisplay,
          filters: _this3.props.filters,
          filtersStore: _this3.props.filtersStore,
          onFilterChange: _this3.props.onFilterChange,
          onFilterApply: _this3.props.onFilterApply,
          onColumnMouseDown: _this3.props.onColumnMouseDown,
          onColumnDragStart: _this3.props.onColumnDragStart,
          onColumnDragOver: _this3.props.onColumnDragOver,
          onColumnDragLeave: _this3.props.onColumnDragLeave,
          onColumnDrop: _this3.props.onColumnDrop,
          onColumnResizeStart: _this3.props.onColumnResizeStart,
          onColumnResizerClick: _this3.props.onColumnResizerClick,
          onColumnResizerDoubleClick: _this3.props.onColumnResizerDoubleClick,
          allRowsSelected: _this3.props.allRowsSelected,
          onColumnCheckboxChange: _this3.onCheckboxChange,
          reorderableColumns: _this3.props.reorderableColumns,
          onSortChange: _this3.props.onSortChange
        });
      });
    }
  }, {
    key: "renderFilterCells",
    value: function renderFilterCells() {
      var _this4 = this;

      return React__default["default"].Children.map(this.props.columns, function (col, i) {
        var isVisible = !col.props.hidden;

        if (isVisible) {
          var _col$props = col.props,
              filterHeaderStyle = _col$props.filterHeaderStyle,
              style = _col$props.style,
              filterHeaderClassName = _col$props.filterHeaderClassName,
              className = _col$props.className,
              frozen = _col$props.frozen,
              columnKey = _col$props.columnKey,
              field = _col$props.field,
              selectionMode = _col$props.selectionMode,
              filter = _col$props.filter;

          var colStyle = _objectSpread$1(_objectSpread$1({}, filterHeaderStyle || {}), style || {});

          var colClassName = utils.classNames('p-filter-column', filterHeaderClassName, className, {
            'p-frozen-column': frozen
          });
          var colKey = columnKey || field || i;

          var allRowsSelected = selectionMode === 'multiple' && _this4.props.allRowsSelected(_this4.props.value);

          return /*#__PURE__*/React__default["default"].createElement("th", {
            key: colKey,
            style: colStyle,
            className: colClassName
          }, selectionMode === 'multiple' && /*#__PURE__*/React__default["default"].createElement(HeaderCheckbox, {
            checked: allRowsSelected,
            onChange: _this4.onCheckboxChange,
            disabled: _this4.props.empty
          }), filter && /*#__PURE__*/React__default["default"].createElement(ColumnFilter, {
            display: "row",
            column: col,
            filters: _this4.props.filters,
            filtersStore: _this4.props.filtersStore,
            onFilterChange: _this4.props.onFilterChange,
            onFilterApply: _this4.props.onFilterApply
          }));
        }

        return null;
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this5 = this;

      if (this.props.headerColumnGroup) {
        var rows = React__default["default"].Children.toArray(this.props.headerColumnGroup.props.children);
        return rows.map(function (row, i) {
          return /*#__PURE__*/React__default["default"].createElement("tr", {
            key: i,
            role: "row"
          }, _this5.renderGroupHeaderCells(row));
        });
      } else {
        var headerRow = /*#__PURE__*/React__default["default"].createElement("tr", {
          role: "row"
        }, this.renderHeaderCells(this.props.columns));
        var filterRow = this.props.filterDisplay === 'row' && /*#__PURE__*/React__default["default"].createElement("tr", {
          role: "row"
        }, this.renderFilterCells());
        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, headerRow, filterRow);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.renderContent();
      return /*#__PURE__*/React__default["default"].createElement("thead", {
        className: "p-datatable-thead"
      }, content);
    }
  }]);

  return TableHeader;
}(React.Component);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var DataTable = /*#__PURE__*/function (_Component) {
  _inherits(DataTable, _Component);

  var _super = _createSuper(DataTable);

  function DataTable(props) {
    var _this;

    _classCallCheck(this, DataTable);

    _this = _super.call(this, props);
    _this.state = {
      d_rows: props.rows,
      columnOrder: [],
      groupRowsSortMeta: null,
      editingMeta: {}
    };

    if (!_this.props.onPage) {
      _this.state.first = props.first;
      _this.state.rows = props.rows;
    }

    if (!_this.props.onSort) {
      _this.state.sortField = props.sortField;
      _this.state.sortOrder = props.sortOrder;
      _this.state.multiSortMeta = props.multiSortMeta;
    }

    _this.state.d_filters = _this.cloneFilters(props.filters);

    if (!_this.props.onFilter) {
      _this.state.filters = props.filters;
    }

    if (_this.isStateful()) {
      _this.restoreState(_this.state);
    }

    _this.attributeSelector = utils.UniqueComponentId(); // header

    _this.onSortChange = _this.onSortChange.bind(_assertThisInitialized(_this));
    _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_this));
    _this.onFilterApply = _this.onFilterApply.bind(_assertThisInitialized(_this));
    _this.onColumnHeaderMouseDown = _this.onColumnHeaderMouseDown.bind(_assertThisInitialized(_this));
    _this.onColumnHeaderDragStart = _this.onColumnHeaderDragStart.bind(_assertThisInitialized(_this));
    _this.onColumnHeaderDragOver = _this.onColumnHeaderDragOver.bind(_assertThisInitialized(_this));
    _this.onColumnHeaderDragLeave = _this.onColumnHeaderDragLeave.bind(_assertThisInitialized(_this));
    _this.onColumnHeaderDrop = _this.onColumnHeaderDrop.bind(_assertThisInitialized(_this));
    _this.onColumnResizeStart = _this.onColumnResizeStart.bind(_assertThisInitialized(_this));
    _this.onColumnHeaderCheckboxChange = _this.onColumnHeaderCheckboxChange.bind(_assertThisInitialized(_this));
    _this.allRowsSelected = _this.allRowsSelected.bind(_assertThisInitialized(_this)); // body

    _this.onEditingMetaChange = _this.onEditingMetaChange.bind(_assertThisInitialized(_this)); //paginator

    _this.onPageChange = _this.onPageChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DataTable, [{
    key: "isCustomStateStorage",
    value: function isCustomStateStorage() {
      return this.props.stateStorage === 'custom';
    }
  }, {
    key: "isStateful",
    value: function isStateful() {
      return this.props.stateKey != null || this.isCustomStateStorage();
    }
  }, {
    key: "isVirtualScrollerDisabled",
    value: function isVirtualScrollerDisabled() {
      return utils.ObjectUtils.isEmpty(this.props.virtualScrollerOptions) || !this.props.scrollable;
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      return utils.ObjectUtils.isNotEmpty(this.getFilters()) || this.props.globalFilter;
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
      return (this.props.onSort ? this.props.multiSortMeta : this.state.multiSortMeta) || [];
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      return this.props.onFilter ? this.props.filters : this.state.filters;
    }
  }, {
    key: "getColumnProp",
    value: function getColumnProp(col, prop) {
      return col.props[prop];
    }
  }, {
    key: "getColumns",
    value: function getColumns(ignoreReorderable) {
      var _this2 = this;

      var columns = React__default["default"].Children.toArray(this.props.children);

      if (!columns) {
        return null;
      }

      if (!ignoreReorderable && this.props.reorderableColumns && this.state.columnOrder) {
        var orderedColumns = this.state.columnOrder.reduce(function (arr, columnKey) {
          var column = _this2.findColumnByKey(columns, columnKey);

          column && arr.push(column);
          return arr;
        }, []);
        return [].concat(_toConsumableArray(orderedColumns), _toConsumableArray(columns.filter(function (col) {
          return orderedColumns.indexOf(col) < 0;
        })));
      }

      return columns;
    }
  }, {
    key: "getStorage",
    value: function getStorage() {
      switch (this.props.stateStorage) {
        case 'local':
          return window.localStorage;

        case 'session':
          return window.sessionStorage;

        case 'custom':
          return null;

        default:
          throw new Error(this.props.stateStorage + ' is not a valid value for the state storage, supported values are "local", "session" and "custom".');
      }
    }
  }, {
    key: "saveState",
    value: function saveState() {
      var state = {};

      if (this.props.paginator) {
        state.first = this.getFirst();
        state.rows = this.getRows();
      }

      var sortField = this.getSortField();

      if (sortField) {
        state.sortField = sortField;
        state.sortOrder = this.getSortOrder();
      }

      var multiSortMeta = this.getMultiSortMeta();

      if (multiSortMeta) {
        state.multiSortMeta = multiSortMeta;
      }

      if (this.hasFilter()) {
        state.filters = this.getFilters();
      }

      if (this.props.resizableColumns) {
        this.saveColumnWidths(state);
      }

      if (this.props.reorderableColumns) {
        state.columnOrder = this.state.columnOrder;
      }

      if (this.props.expandedRows) {
        state.expandedRows = this.props.expandedRows;
      }

      if (this.props.selection && this.props.onSelectionChange) {
        state.selection = this.props.selection;
      }

      if (this.isCustomStateStorage()) {
        if (this.props.customSaveState) {
          this.props.customSaveState(state);
        }
      } else {
        var storage = this.getStorage();

        if (utils.ObjectUtils.isNotEmpty(state)) {
          storage.setItem(this.props.stateKey, JSON.stringify(state));
        }
      }

      if (this.props.onStateSave) {
        this.props.onStateSave(state);
      }
    }
  }, {
    key: "clearState",
    value: function clearState() {
      var storage = this.getStorage();

      if (storage && this.props.stateKey) {
        storage.removeItem(this.props.stateKey);
      }
    }
  }, {
    key: "restoreState",
    value: function restoreState(state) {
      var restoredState = {};

      if (this.isCustomStateStorage()) {
        if (this.props.customRestoreState) {
          restoredState = this.props.customRestoreState();
        }
      } else {
        var storage = this.getStorage();
        var stateString = storage.getItem(this.props.stateKey);
        var dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

        var reviver = function reviver(key, value) {
          return typeof value === "string" && dateFormat.test(value) ? new Date(value) : value;
        };

        if (stateString) {
          restoredState = JSON.parse(stateString, reviver);
        }
      }

      this._restoreState(restoredState, state);
    }
  }, {
    key: "restoreTableState",
    value: function restoreTableState(restoredState) {
      var state = this._restoreState(restoredState);

      if (utils.ObjectUtils.isNotEmpty(state)) {
        this.setState(state);
      }
    }
  }, {
    key: "_restoreState",
    value: function _restoreState(restoredState) {
      var _this3 = this;

      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (utils.ObjectUtils.isNotEmpty(restoredState)) {
        if (this.props.paginator) {
          if (this.props.onPage) {
            var getOnPageParams = function getOnPageParams(first, rows) {
              var totalRecords = _this3.getTotalRecords(_this3.processedData());

              var pageCount = Math.ceil(totalRecords / rows) || 1;
              var page = Math.floor(first / rows);
              return {
                first: first,
                rows: rows,
                page: page,
                pageCount: pageCount
              };
            };

            this.props.onPage(getOnPageParams(restoredState.first, restoredState.rows));
          } else {
            state.first = restoredState.first;
            state.rows = restoredState.rows;
          }
        }

        if (restoredState.sortField) {
          if (this.props.onSort) {
            this.props.onSort({
              sortField: restoredState.sortField,
              sortOrder: restoredState.sortOrder
            });
          } else {
            state.sortField = restoredState.sortField;
            state.sortOrder = restoredState.sortOrder;
          }
        }

        if (restoredState.multiSortMeta) {
          if (this.props.onSort) {
            this.props.onSort({
              multiSortMeta: restoredState.multiSortMeta
            });
          } else {
            state.multiSortMeta = restoredState.multiSortMeta;
          }
        }

        if (restoredState.filters) {
          state.d_filters = this.cloneFilters(restoredState.filters);

          if (this.props.onFilter) {
            this.props.onFilter({
              filters: restoredState.filters
            });
          } else {
            state.filters = this.cloneFilters(restoredState.filters);
          }
        }

        if (this.props.resizableColumns) {
          this.columnWidthsState = restoredState.columnWidths;
          this.tableWidthState = restoredState.tableWidth;
        }

        if (this.props.reorderableColumns) {
          state.columnOrder = restoredState.columnOrder;
        }

        if (restoredState.expandedRows && this.props.onRowToggle) {
          this.props.onRowToggle({
            data: restoredState.expandedRows
          });
        }

        if (restoredState.selection && this.props.onSelectionChange) {
          this.props.onSelectionChange({
            value: restoredState.selection
          });
        }

        if (this.props.onStateRestore) {
          this.props.onStateRestore(restoredState);
        }
      }

      return state;
    }
  }, {
    key: "saveColumnWidths",
    value: function saveColumnWidths(state) {
      var widths = [];
      var headers = utils.DomHandler.find(this.el, '.p-datatable-thead > tr > th');
      headers.forEach(function (header) {
        return widths.push(utils.DomHandler.getOuterWidth(header));
      });
      state.columnWidths = widths.join(',');

      if (this.props.columnResizeMode === 'expand') {
        state.tableWidth = utils.DomHandler.getOuterWidth(this.table) + 'px';
      }
    }
  }, {
    key: "restoreColumnWidths",
    value: function restoreColumnWidths() {
      var _this4 = this;

      if (this.columnWidthsState) {
        var widths = this.columnWidthsState.split(',');

        if (this.props.columnResizeMode === 'expand' && this.tableWidthState) {
          this.table.style.width = this.tableWidthState;
          this.table.style.minWidth = this.tableWidthState;
          this.el.style.width = this.tableWidthState;
        }

        this.createStyleElement();

        if (this.props.scrollable && widths && widths.length > 0) {
          var innerHTML = '';
          widths.forEach(function (width, index) {
            innerHTML += "\n                        .p-datatable[".concat(_this4.attributeSelector, "] .p-datatable-thead > tr > th:nth-child(").concat(index + 1, ") {\n                            flex: 0 0 ").concat(width, "px;\n                        }\n\n                        .p-datatable[").concat(_this4.attributeSelector, "] .p-datatable-tbody > tr > td:nth-child(").concat(index + 1, ") {\n                            flex: 0 0 ").concat(width, "px;\n                        }\n                    ");
          });
          this.styleElement.innerHTML = innerHTML;
        } else {
          utils.DomHandler.find(this.table, '.p-datatable-thead > tr > th').forEach(function (header, index) {
            return header.style.width = widths[index] + 'px';
          });
        }
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
    key: "getGroupRowSortField",
    value: function getGroupRowSortField() {
      return this.props.sortMode === 'single' ? this.props.sortField : this.state.groupRowsSortMeta ? this.state.groupRowsSortMeta.field : null;
    }
  }, {
    key: "allRowsSelected",
    value: function allRowsSelected(processedData) {
      var _this5 = this;

      var val = this.props.frozenValue ? [].concat(_toConsumableArray(this.props.frozenValue), _toConsumableArray(processedData)) : processedData;
      var selectableVal = this.props.showSelectionElement ? val.filter(function (data, index) {
        return _this5.props.showSelectionElement(data, {
          rowIndex: index,
          props: _this5.props
        });
      }) : val;
      var length = this.props.lazy ? this.props.totalRecords : selectableVal ? selectableVal.length : 0;
      return selectableVal && length > 0 && this.props.selection && this.props.selection.length > 0 && this.props.selection.length === length;
    }
  }, {
    key: "getSelectionModeInColumn",
    value: function getSelectionModeInColumn(columns) {
      if (columns) {
        var col = columns.find(function (c) {
          return !!c.props.selectionMode;
        });
        return col ? col.props.selectionMode : null;
      }

      return null;
    }
  }, {
    key: "findColumnByKey",
    value: function findColumnByKey(columns, key) {
      return utils.ObjectUtils.isNotEmpty(columns) ? columns.find(function (col) {
        return col.props.columnKey === key || col.props.field === key;
      }) : null;
    }
  }, {
    key: "getTotalRecords",
    value: function getTotalRecords(data) {
      return this.props.lazy ? this.props.totalRecords : data ? data.length : 0;
    }
  }, {
    key: "onEditingMetaChange",
    value: function onEditingMetaChange(e) {
      var rowData = e.rowData,
          field = e.field,
          rowIndex = e.rowIndex,
          editing = e.editing;

      var editingMeta = _objectSpread({}, this.state.editingMeta);

      var meta = editingMeta[rowIndex];

      if (editing) {
        !meta && (meta = editingMeta[rowIndex] = {
          data: _objectSpread({}, rowData),
          fields: []
        });
        meta['fields'].push(field);
      } else if (meta) {
        var fields = meta['fields'].filter(function (f) {
          return f !== field;
        });
        !fields.length ? delete editingMeta[rowIndex] : meta['fields'] = fields;
      }

      this.setState({
        editingMeta: editingMeta
      });
    }
  }, {
    key: "clearEditingMetaData",
    value: function clearEditingMetaData() {
      if (this.props.editMode && utils.ObjectUtils.isNotEmpty(this.state.editingMeta)) {
        this.setState({
          editingMeta: {}
        });
      }
    }
  }, {
    key: "onColumnResizeStart",
    value: function onColumnResizeStart(e) {
      var event = e.originalEvent,
          column = e.column;
      var containerLeft = utils.DomHandler.getOffset(this.el).left;
      this.resizeColumn = column;
      this.resizeColumnElement = event.currentTarget.parentElement;
      this.columnResizing = true;
      this.lastResizeHelperX = event.pageX - containerLeft + this.el.scrollLeft;
      this.bindColumnResizeEvents();
    }
  }, {
    key: "onColumnResize",
    value: function onColumnResize(event) {
      var containerLeft = utils.DomHandler.getOffset(this.el).left;
      utils.DomHandler.addClass(this.el, 'p-unselectable-text');
      this.resizeHelper.style.height = this.el.offsetHeight + 'px';
      this.resizeHelper.style.top = 0 + 'px';
      this.resizeHelper.style.left = event.pageX - containerLeft + this.el.scrollLeft + 'px';
      this.resizeHelper.style.display = 'block';
    }
  }, {
    key: "onColumnResizeEnd",
    value: function onColumnResizeEnd() {
      var delta = this.resizeHelper.offsetLeft - this.lastResizeHelperX;
      var columnWidth = this.resizeColumnElement.offsetWidth;
      var newColumnWidth = columnWidth + delta;
      var minWidth = this.resizeColumnElement.style.minWidth || 15;

      if (columnWidth + delta > parseInt(minWidth, 10)) {
        if (this.props.columnResizeMode === 'fit') {
          var nextColumn = this.resizeColumnElement.nextElementSibling;
          var nextColumnWidth = nextColumn.offsetWidth - delta;

          if (newColumnWidth > 15 && nextColumnWidth > 15) {
            this.resizeTableCells(newColumnWidth, nextColumnWidth);
          }
        } else if (this.props.columnResizeMode === 'expand') {
          var tableWidth = this.table.offsetWidth + delta + 'px';
          this.table.style.width = tableWidth;
          this.table.style.minWidth = tableWidth;
          this.resizeTableCells(newColumnWidth);
        }

        if (this.props.onColumnResizeEnd) {
          this.props.onColumnResizeEnd({
            element: this.resizeColumnElement,
            column: this.resizeColumn,
            delta: delta
          });
        }

        if (this.isStateful()) {
          this.saveState();
        }
      }

      this.resizeHelper.style.display = 'none';
      this.resizeColumn = null;
      this.resizeColumnElement = null;
      utils.DomHandler.removeClass(this.el, 'p-unselectable-text');
      this.unbindColumnResizeEvents();
    }
  }, {
    key: "resizeTableCells",
    value: function resizeTableCells(newColumnWidth, nextColumnWidth) {
      var _this6 = this;

      var widths = [];
      var colIndex = utils.DomHandler.index(this.resizeColumnElement);
      var headers = utils.DomHandler.find(this.table, '.p-datatable-thead > tr > th');
      headers.forEach(function (header) {
        return widths.push(utils.DomHandler.getOuterWidth(header));
      });
      this.destroyStyleElement();
      this.createStyleElement();
      var innerHTML = '';
      widths.forEach(function (width, index) {
        var colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
        var style = _this6.props.scrollable ? "flex: 0 0 ".concat(colWidth, "px !important") : "width: ".concat(colWidth, "px !important");
        innerHTML += "\n                .p-datatable[".concat(_this6.attributeSelector, "] .p-datatable-thead > tr > th:nth-child(").concat(index + 1, "),\n                .p-datatable[").concat(_this6.attributeSelector, "] .p-datatable-tbody > tr > td:nth-child(").concat(index + 1, "),\n                .p-datatable[").concat(_this6.attributeSelector, "] .p-datatable-tfoot > tr > td:nth-child(").concat(index + 1, ") {\n                    ").concat(style, "\n                }\n            ");
      });
      this.styleElement.innerHTML = innerHTML;
    }
  }, {
    key: "bindColumnResizeEvents",
    value: function bindColumnResizeEvents() {
      var _this7 = this;

      if (!this.documentColumnResizeListener) {
        this.documentColumnResizeListener = document.addEventListener('mousemove', function (event) {
          if (_this7.columnResizing) {
            _this7.onColumnResize(event);
          }
        });
      }

      if (!this.documentColumnResizeEndListener) {
        this.documentColumnResizeEndListener = document.addEventListener('mouseup', function () {
          if (_this7.columnResizing) {
            _this7.columnResizing = false;

            _this7.onColumnResizeEnd();
          }
        });
      }
    }
  }, {
    key: "unbindColumnResizeEvents",
    value: function unbindColumnResizeEvents() {
      if (this.documentColumnResizeListener) {
        document.removeEventListener('document', this.documentColumnResizeListener);
        this.documentColumnResizeListener = null;
      }

      if (this.documentColumnResizeEndListener) {
        document.removeEventListener('document', this.documentColumnResizeEndListener);
        this.documentColumnResizeEndListener = null;
      }
    }
  }, {
    key: "onColumnHeaderMouseDown",
    value: function onColumnHeaderMouseDown(e) {
      utils.DomHandler.clearSelection();
      var event = e.originalEvent,
          column = e.column;

      if (this.props.reorderableColumns && this.getColumnProp(column, 'reorderable') !== false) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || utils.DomHandler.hasClass(event.target, 'p-column-resizer')) event.currentTarget.draggable = false;else event.currentTarget.draggable = true;
      }
    }
  }, {
    key: "onColumnHeaderCheckboxChange",
    value: function onColumnHeaderCheckboxChange(e, processedData) {
      var _this8 = this;

      var originalEvent = e.originalEvent,
          checked = e.checked;
      var selection;

      if (!checked) {
        selection = this.props.frozenValue ? [].concat(_toConsumableArray(this.props.frozenValue), _toConsumableArray(processedData)) : processedData;
        selection = this.props.showSelectionElement ? selection.filter(function (data, index) {
          return _this8.props.showSelectionElement(data, {
            rowIndex: index,
            props: _this8.props
          });
        }) : selection;
        this.props.onAllRowsSelect && this.props.onAllRowsSelect({
          originalEvent: originalEvent,
          data: selection,
          type: 'all'
        });
      } else {
        selection = [];
        this.props.onAllRowsUnselect && this.props.onAllRowsUnselect({
          originalEvent: originalEvent,
          data: selection,
          type: 'all'
        });
      }

      if (this.props.onSelectionChange) {
        this.props.onSelectionChange({
          originalEvent: originalEvent,
          value: selection
        });
      }
    }
  }, {
    key: "onColumnHeaderDragStart",
    value: function onColumnHeaderDragStart(e) {
      var event = e.originalEvent,
          column = e.column;

      if (this.columnResizing) {
        event.preventDefault();
        return;
      }

      this.colReorderIconWidth = utils.DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
      this.colReorderIconHeight = utils.DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
      this.draggedColumn = column;
      this.draggedColumnElement = this.findParentHeader(event.currentTarget);
      event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    }
  }, {
    key: "onColumnHeaderDragOver",
    value: function onColumnHeaderDragOver(e) {
      var event = e.originalEvent;
      var dropHeader = this.findParentHeader(event.currentTarget);

      if (this.props.reorderableColumns && this.draggedColumnElement && dropHeader) {
        event.preventDefault();

        if (this.draggedColumnElement !== dropHeader) {
          var containerOffset = utils.DomHandler.getOffset(this.el);
          var dropHeaderOffset = utils.DomHandler.getOffset(dropHeader);
          var targetLeft = dropHeaderOffset.left - containerOffset.left;
          var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
          this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.colReorderIconHeight - 1) + 'px';
          this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

          if (event.pageX > columnCenter) {
            this.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.dropPosition = 1;
          } else {
            this.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.colReorderIconWidth / 2) + 'px';
            this.dropPosition = -1;
          }

          this.reorderIndicatorUp.style.display = 'block';
          this.reorderIndicatorDown.style.display = 'block';
        }
      }
    }
  }, {
    key: "onColumnHeaderDragLeave",
    value: function onColumnHeaderDragLeave(e) {
      var event = e.originalEvent;

      if (this.props.reorderableColumns && this.draggedColumnElement) {
        event.preventDefault();
        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
      }
    }
  }, {
    key: "onColumnHeaderDrop",
    value: function onColumnHeaderDrop(e) {
      var _this9 = this;

      var event = e.originalEvent,
          column = e.column;
      event.preventDefault();

      if (this.draggedColumnElement) {
        var dragIndex = utils.DomHandler.index(this.draggedColumnElement);
        var dropIndex = utils.DomHandler.index(this.findParentHeader(event.currentTarget));
        var allowDrop = dragIndex !== dropIndex;

        if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
          allowDrop = false;
        }

        if (allowDrop) {
          var columns = this.getColumns();

          var isSameColumn = function isSameColumn(col1, col2) {
            return col1.props.columnKey || col2.props.columnKey ? utils.ObjectUtils.equals(col1.props, col2.props, 'columnKey') : utils.ObjectUtils.equals(col1.props, col2.props, 'field');
          };

          var dragColIndex = columns.findIndex(function (child) {
            return isSameColumn(child, _this9.draggedColumn);
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
          var columnOrder = columns.reduce(function (orders, col) {
            orders.push(col.props.columnKey || col.props.field);
            return orders;
          }, []);
          this.setState({
            columnOrder: columnOrder
          });

          if (this.props.onColReorder) {
            this.props.onColReorder({
              originalEvent: event,
              dragIndex: dragColIndex,
              dropIndex: dropColIndex,
              columns: columns
            });
          }
        }

        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
        this.draggedColumnElement.draggable = false;
        this.draggedColumnElement = null;
        this.draggedColumn = null;
        this.dropPosition = null;
      }
    }
  }, {
    key: "createStyleElement",
    value: function createStyleElement() {
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
    }
  }, {
    key: "createResponsiveStyle",
    value: function createResponsiveStyle() {
      if (!this.responsiveStyleElement) {
        this.responsiveStyleElement = document.createElement('style');
        document.head.appendChild(this.responsiveStyleElement);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.props.breakpoint, ") {\n    .p-datatable[").concat(this.attributeSelector, "] .p-datatable-thead > tr > th,\n    .p-datatable[").concat(this.attributeSelector, "] .p-datatable-tfoot > tr > td {\n        display: none !important;\n    }\n\n    .p-datatable[").concat(this.attributeSelector, "] .p-datatable-tbody > tr > td {\n        display: flex;\n        width: 100% !important;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-datatable[").concat(this.attributeSelector, "] .p-datatable-tbody > tr > td:not(:last-child) {\n        border: 0 none;\n    }\n\n    .p-datatable[").concat(this.attributeSelector, "].p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {\n        border-top: 0;\n        border-right: 0;\n        border-left: 0;\n    }\n\n    .p-datatable[").concat(this.attributeSelector, "] .p-datatable-tbody > tr > td > .p-column-title {\n        display: block;\n    }\n}\n");
        this.responsiveStyleElement.innerHTML = innerHTML;
      }
    }
  }, {
    key: "destroyResponsiveStyle",
    value: function destroyResponsiveStyle() {
      if (this.responsiveStyleElement) {
        document.head.removeChild(this.responsiveStyleElement);
        this.responsiveStyleElement = null;
      }
    }
  }, {
    key: "destroyStyleElement",
    value: function destroyStyleElement() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    }
  }, {
    key: "onPageChange",
    value: function onPageChange(e) {
      this.clearEditingMetaData();
      if (this.props.onPage) this.props.onPage(e);else this.setState({
        first: e.first,
        rows: e.rows
      });

      if (this.props.onValueChange) {
        this.props.onValueChange(this.processedData());
      }
    }
  }, {
    key: "onSortChange",
    value: function onSortChange(e) {
      this.clearEditingMetaData();
      var event = e.originalEvent,
          column = e.column,
          sortableDisabledFields = e.sortableDisabledFields;
      var sortField = column.props.sortField || column.props.field;
      var sortOrder = this.props.defaultSortOrder;
      var multiSortMeta;
      var eventMeta;
      this.columnSortable = column.props.sortable;
      this.columnSortFunction = column.props.sortFunction;
      this.columnField = column.props.sortField;

      if (this.props.sortMode === 'multiple') {
        var metaKey = event.metaKey || event.ctrlKey;
        multiSortMeta = _toConsumableArray(this.getMultiSortMeta());
        var sortMeta = multiSortMeta.find(function (sortMeta) {
          return sortMeta.field === sortField;
        });
        sortOrder = sortMeta ? this.getCalculatedSortOrder(sortMeta.order) : sortOrder;
        var newMetaData = {
          field: sortField,
          order: sortOrder
        };

        if (sortOrder) {
          multiSortMeta = metaKey ? multiSortMeta : multiSortMeta.filter(function (meta) {
            return sortableDisabledFields.some(function (field) {
              return field === meta.field;
            });
          });
          this.addSortMeta(newMetaData, multiSortMeta);
        } else if (this.props.removableSort) {
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

      if (this.props.onValueChange) {
        this.props.onValueChange(this.processedData({
          sortField: sortField,
          sortOrder: sortOrder,
          multiSortMeta: multiSortMeta
        }));
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
      var index = multiSortMeta.findIndex(function (sortMeta) {
        return sortMeta.field === meta.field;
      });
      if (index >= 0) multiSortMeta[index] = meta;else multiSortMeta.push(meta);
    }
  }, {
    key: "removeSortMeta",
    value: function removeSortMeta(meta, multiSortMeta) {
      var index = multiSortMeta.findIndex(function (sortMeta) {
        return sortMeta.field === meta.field;
      });

      if (index >= 0) {
        multiSortMeta.splice(index, 1);
      }

      multiSortMeta = multiSortMeta.length > 0 ? multiSortMeta : null;
    }
  }, {
    key: "sortSingle",
    value: function sortSingle(data, field, order) {
      if (this.props.groupRowsBy && this.props.groupRowsBy === this.props.sortField) {
        var multiSortMeta = [{
          field: this.props.sortField,
          order: this.props.sortOrder || this.props.defaultSortOrder
        }];
        this.props.sortField !== field && multiSortMeta.push({
          field: field,
          order: order
        });
        return this.sortMultiple(data, multiSortMeta);
      }

      var value = _toConsumableArray(data);

      if (this.columnSortable && this.columnSortFunction) {
        value = this.columnSortFunction({
          field: field,
          order: order
        });
      } else {
        value.sort(function (data1, data2) {
          var value1 = utils.ObjectUtils.resolveFieldData(data1, field);
          var value2 = utils.ObjectUtils.resolveFieldData(data2, field);
          var result = null;
          if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
            numeric: true
          });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
          return order * result;
        });
      }

      return value;
    }
  }, {
    key: "sortMultiple",
    value: function sortMultiple(data) {
      var _this10 = this;

      var multiSortMeta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (this.props.groupRowsBy && (this.groupRowsSortMeta || multiSortMeta.length && this.props.groupRowsBy === multiSortMeta[0].field)) {
        var firstSortMeta = multiSortMeta[0];
        !this.groupRowsSortMeta && (this.groupRowsSortMeta = firstSortMeta);

        if (firstSortMeta.field !== this.groupRowsSortMeta.field) {
          multiSortMeta = [this.groupRowsSortMeta].concat(_toConsumableArray(multiSortMeta));
        }
      }

      var value = _toConsumableArray(data);

      if (this.columnSortable && this.columnSortFunction) {
        var meta = multiSortMeta.find(function (meta) {
          return meta.field === _this10.columnField;
        });
        var field = this.columnField;
        var order = meta ? meta.order : this.defaultSortOrder;
        value = this.columnSortFunction({
          field: field,
          order: order
        });
      } else {
        value.sort(function (data1, data2) {
          return _this10.multisortField(data1, data2, multiSortMeta, 0);
        });
      }

      return value;
    }
  }, {
    key: "multisortField",
    value: function multisortField(data1, data2, multiSortMeta, index) {
      var value1 = utils.ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
      var value2 = utils.ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
      var result = null;

      if (typeof value1 === 'string' || value1 instanceof String) {
        if (value1.localeCompare && value1 !== value2) {
          return multiSortMeta[index].order * value1.localeCompare(value2, undefined, {
            numeric: true
          });
        }
      } else {
        result = value1 < value2 ? -1 : 1;
      }

      if (value1 === value2) {
        return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
      }

      return multiSortMeta[index].order * result;
    }
  }, {
    key: "onFilterChange",
    value: function onFilterChange(filters) {
      this.clearEditingMetaData();
      this.setState({
        d_filters: filters
      });
    }
  }, {
    key: "onFilterApply",
    value: function onFilterApply() {
      var _this11 = this;

      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(function () {
        var filters = _this11.cloneFilters(_this11.state.d_filters);

        if (_this11.props.onFilter) {
          _this11.props.onFilter({
            filters: filters
          });
        } else {
          _this11.setState({
            first: 0,
            filters: filters
          });
        }

        if (_this11.props.onValueChange) {
          _this11.props.onValueChange(_this11.processedData({
            filters: filters
          }));
        }
      }, this.props.filterDelay);
    }
  }, {
    key: "filterLocal",
    value: function filterLocal(data, filters) {
      if (!data) return;
      filters = filters || {};
      var columns = this.getColumns();
      var filteredValue = [];
      var isGlobalFilter = filters['global'] || this.props.globalFilter;
      var globalFilterFieldsArray;

      if (isGlobalFilter) {
        globalFilterFieldsArray = this.props.globalFilterFields || columns.filter(function (col) {
          return !col.props.excludeGlobalFilter;
        }).map(function (col) {
          return col.props.filterField || col.props.field;
        });
      }

      for (var i = 0; i < data.length; i++) {
        var localMatch = true;
        var globalMatch = false;
        var localFiltered = false;

        for (var prop in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, prop) && prop !== 'global') {
            localFiltered = true;
            var filterField = prop;
            var filterMeta = filters[filterField];

            if (filterMeta.operator) {
              for (var j = 0; j < filterMeta.constraints.length; j++) {
                var filterConstraint = filterMeta.constraints[j];
                localMatch = this.executeLocalFilter(filterField, data[i], filterConstraint, j);

                if (filterMeta.operator === PrimeReact.FilterOperator.OR && localMatch || filterMeta.operator === PrimeReact.FilterOperator.AND && !localMatch) {
                  break;
                }
              }
            } else {
              localMatch = this.executeLocalFilter(filterField, data[i], filterMeta, 0);
            }

            if (!localMatch) {
              break;
            }
          }
        }

        if (isGlobalFilter && !globalMatch && globalFilterFieldsArray) {
          for (var _j = 0; _j < globalFilterFieldsArray.length; _j++) {
            var globalFilterField = globalFilterFieldsArray[_j];
            var matchMode = filters['global'] ? filters['global'].matchMode : PrimeReact.FilterMatchMode.CONTAINS;
            var value = filters['global'] ? filters['global'].value : this.props.globalFilter;
            globalMatch = PrimeReact.FilterService.filters[matchMode](utils.ObjectUtils.resolveFieldData(data[i], globalFilterField), value, this.props.filterLocale);

            if (globalMatch) {
              break;
            }
          }
        }

        var matches = void 0;

        if (isGlobalFilter) {
          matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
        } else {
          matches = localFiltered && localMatch;
        }

        if (matches) {
          filteredValue.push(data[i]);
        }
      }

      if (filteredValue.length === this.props.value.length) {
        filteredValue = data;
      }

      return filteredValue;
    }
  }, {
    key: "executeLocalFilter",
    value: function executeLocalFilter(field, rowData, filterMeta, index) {
      var filterValue = filterMeta.value;
      var filterMatchMode = filterMeta.matchMode === 'custom' ? "custom_".concat(field) : filterMeta.matchMode || PrimeReact.FilterMatchMode.STARTS_WITH;
      var dataFieldValue = utils.ObjectUtils.resolveFieldData(rowData, field);
      var filterConstraint = PrimeReact.FilterService.filters[filterMatchMode];
      return filterConstraint(dataFieldValue, filterValue, this.props.filterLocale, index);
    }
  }, {
    key: "cloneFilters",
    value: function cloneFilters(filters) {
      var _this12 = this;

      filters = filters || this.props.filters;
      var cloned = {};

      if (filters) {
        Object.entries(filters).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              prop = _ref2[0],
              value = _ref2[1];

          cloned[prop] = value.operator ? {
            operator: value.operator,
            constraints: value.constraints.map(function (constraint) {
              return _objectSpread({}, constraint);
            })
          } : _objectSpread({}, value);
        });
      } else {
        var columns = this.getColumns();
        cloned = columns.reduce(function (_filters, col) {
          if (col.props.filter) {
            var field = col.props.filterField || col.props.field;
            var filterFunction = col.props.filterFunction;
            var dataType = col.props.dataType;
            var matchMode = col.props.filterMatchMode || (PrimeReact__default["default"].filterMatchModeOptions[dataType] ? PrimeReact__default["default"].filterMatchModeOptions[dataType][0] : PrimeReact.FilterMatchMode.STARTS_WITH);
            var constraint = {
              value: null,
              matchMode: matchMode
            };

            if (filterFunction) {
              PrimeReact.FilterService.register("custom_".concat(field), function () {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                return filterFunction.apply(void 0, args.concat([{
                  column: col
                }]));
              });
            }

            _filters[field] = _this12.props.filterDisplay === 'menu' ? {
              operator: PrimeReact.FilterOperator.AND,
              constraints: [constraint]
            } : constraint;
          }

          return _filters;
        }, {});
      }

      return cloned;
    }
  }, {
    key: "filter",
    value: function filter(value, field, matchMode) {
      var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var filters = _objectSpread({}, this.state.d_filters);

      var meta = filters[field];
      var constraint = meta && meta.operator ? meta.constraints[index] : meta;
      constraint = meta ? {
        value: value,
        matchMode: matchMode || constraint.matchMode
      } : {
        value: value,
        matchMode: matchMode
      };
      this.props.filterDisplay === 'menu' && meta && meta.operator ? filters[field].constraints[index] = constraint : filters[field] = constraint;
      this.setState({
        d_filters: filters
      }, this.onFilterApply);
    }
  }, {
    key: "reset",
    value: function reset() {
      var state = {
        d_rows: this.props.rows,
        d_filters: this.cloneFilters(this.props.filters),
        groupRowsSortMeta: null,
        editingMeta: {}
      };

      if (!this.props.onPage) {
        state.first = this.props.first;
        state.rows = this.props.rows;
      }

      if (!this.props.onSort) {
        state.sortField = this.props.sortField;
        state.sortOrder = this.props.sortOrder;
        state.multiSortMeta = this.props.multiSortMeta;
      }

      if (!this.props.onFilter) {
        state.filters = this.props.filters;
      }

      this.resetColumnOrder();
      this.setState(state);
    }
  }, {
    key: "resetColumnOrder",
    value: function resetColumnOrder() {
      var columns = this.getColumns(true);
      var columnOrder = [];

      if (columns) {
        columnOrder = columns.reduce(function (orders, col) {
          orders.push(col.props.columnKey || col.props.field);
          return orders;
        }, []);
      }

      this.setState({
        columnOrder: columnOrder
      });
    }
  }, {
    key: "exportCSV",
    value: function exportCSV(options) {
      var _this13 = this;

      var data;
      var csv = "\uFEFF";
      var columns = this.getColumns();

      if (options && options.selectionOnly) {
        data = this.props.selection || [];
      } else {
        data = [].concat(_toConsumableArray(this.props.frozenValue || []), _toConsumableArray(this.processedData() || []));
      } //headers


      columns.forEach(function (column, i) {
        var _column$props = column.props,
            field = _column$props.field,
            header = _column$props.header,
            exportable = _column$props.exportable;

        if (exportable && field) {
          csv += '"' + (header || field) + '"';

          if (i < columns.length - 1) {
            csv += _this13.props.csvSeparator;
          }
        }
      }); //body

      data.forEach(function (record) {
        csv += '\n';
        columns.forEach(function (column, i) {
          var _column$props2 = column.props,
              field = _column$props2.field,
              exportable = _column$props2.exportable;

          if (exportable && field) {
            var cellData = utils.ObjectUtils.resolveFieldData(record, field);

            if (cellData != null) {
              cellData = _this13.props.exportFunction ? _this13.props.exportFunction({
                data: cellData,
                field: field,
                rowData: record,
                column: column
              }) : String(cellData).replace(/"/g, '""');
            } else cellData = '';

            csv += '"' + cellData + '"';

            if (i < columns.length - 1) {
              csv += _this13.props.csvSeparator;
            }
          }
        });
      });
      utils.DomHandler.exportCSV(csv, this.props.exportFilename);
    }
  }, {
    key: "closeEditingCell",
    value: function closeEditingCell() {
      if (this.props.editMode !== "row") {
        document.body.click();
      }
    }
  }, {
    key: "processedData",
    value: function processedData(localState) {
      var data = this.props.value || [];

      if (!this.props.lazy) {
        if (data && data.length) {
          var filters = localState && localState.filters || this.getFilters();
          var sortField = localState && localState.sortField || this.getSortField();
          var sortOrder = localState && localState.sortOrder || this.getSortOrder();
          var multiSortMeta = localState && localState.multiSortMeta || this.getMultiSortMeta();

          if (utils.ObjectUtils.isNotEmpty(filters) || this.props.globalFilter) {
            data = this.filterLocal(data, filters);
          }

          if (sortField || utils.ObjectUtils.isNotEmpty(multiSortMeta)) {
            if (this.props.sortMode === 'single') data = this.sortSingle(data, sortField, sortOrder);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data, multiSortMeta);
          }
        }
      }

      return data;
    }
  }, {
    key: "dataToRender",
    value: function dataToRender(data) {
      if (data && this.props.paginator) {
        var first = this.props.lazy ? 0 : this.getFirst();
        return data.slice(first, first + this.getRows());
      }

      return data;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.el.setAttribute(this.attributeSelector, '');

      if (this.props.responsiveLayout === 'stack' && !this.props.scrollable) {
        this.createResponsiveStyle();
      }

      if (this.isStateful() && this.props.resizableColumns) {
        this.restoreColumnWidths();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.isStateful()) {
        this.saveState();
      }

      if (prevProps.responsiveLayout !== this.props.responsiveLayout) {
        this.destroyResponsiveStyle();

        if (this.props.responsiveLayout === 'stack' && !this.props.scrollable) {
          this.createResponsiveStyle();
        }
      }

      if (prevProps.filters !== this.props.filters) {
        this.setState({
          filters: this.cloneFilters(this.props.filters),
          d_filters: this.cloneFilters(this.props.filters)
        });
      }

      if (prevProps.globalFilter !== this.props.globalFilter) {
        this.filter(this.props.globalFilter, 'global', 'contains');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindColumnResizeEvents();
      this.destroyStyleElement();
      this.destroyResponsiveStyle();
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      if (this.props.loading) {
        var iconClassName = utils.classNames('p-datatable-loading-icon pi-spin', this.props.loadingIcon);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-datatable-loading-overlay p-component-overlay"
        }, /*#__PURE__*/React__default["default"].createElement("i", {
          className: iconClassName
        }));
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      if (this.props.header) {
        var content = utils.ObjectUtils.getJSXElement(this.props.header, {
          props: this.props
        });
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-datatable-header"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderTableHeader",
    value: function renderTableHeader(options, empty) {
      var sortField = this.getSortField();
      var sortOrder = this.getSortOrder();

      var multiSortMeta = _toConsumableArray(this.getMultiSortMeta());

      var groupRowSortField = this.getGroupRowSortField();
      var filters = this.state.d_filters;
      var filtersStore = this.getFilters();
      var processedData = options.items,
          columns = options.columns;
      return /*#__PURE__*/React__default["default"].createElement(TableHeader, {
        value: processedData,
        tableProps: this.props,
        columns: columns,
        tabIndex: this.props.tabIndex,
        empty: empty,
        headerColumnGroup: this.props.headerColumnGroup,
        resizableColumns: this.props.resizableColumns,
        onColumnResizeStart: this.onColumnResizeStart,
        onColumnResizerClick: this.props.onColumnResizerClick,
        onColumnResizerDoubleClick: this.props.onColumnResizerDoubleClick,
        sortMode: this.props.sortMode,
        sortField: sortField,
        sortOrder: sortOrder,
        multiSortMeta: multiSortMeta,
        groupRowsBy: this.props.groupRowsBy,
        groupRowSortField: groupRowSortField,
        onSortChange: this.onSortChange,
        filterDisplay: this.props.filterDisplay,
        filters: filters,
        filtersStore: filtersStore,
        onFilterChange: this.onFilterChange,
        onFilterApply: this.onFilterApply,
        allRowsSelected: this.allRowsSelected,
        onColumnCheckboxChange: this.onColumnHeaderCheckboxChange,
        onColumnMouseDown: this.onColumnHeaderMouseDown,
        onColumnDragStart: this.onColumnHeaderDragStart,
        onColumnDragOver: this.onColumnHeaderDragOver,
        onColumnDragLeave: this.onColumnHeaderDragLeave,
        onColumnDrop: this.onColumnHeaderDrop,
        rowGroupMode: this.props.rowGroupMode,
        reorderableColumns: this.props.reorderableColumns
      });
    }
  }, {
    key: "renderTableBody",
    value: function renderTableBody(options, selectionModeInColumn, empty, isVirtualScrollerDisabled) {
      var tableSelector = this.attributeSelector;
      var first = this.getFirst();
      var editingMeta = this.state.editingMeta;
      var rows = options.rows,
          columns = options.columns,
          contentRef = options.contentRef,
          className = options.className;
      var frozenBody = this.props.frozenValue && /*#__PURE__*/React__default["default"].createElement(TableBody, {
        value: this.props.frozenValue,
        className: "p-datatable-frozen-tbody",
        frozenRow: true,
        tableProps: this.props,
        tableSelector: tableSelector,
        columns: columns,
        selectionModeInColumn: selectionModeInColumn,
        first: first,
        editingMeta: editingMeta,
        onEditingMetaChange: this.onEditingMetaChange,
        tabIndex: this.props.tabIndex,
        onRowClick: this.props.onRowClick,
        onRowDoubleClick: this.props.onRowDoubleClick,
        onCellClick: this.props.onCellClick,
        selection: this.props.selection,
        onSelectionChange: this.props.onSelectionChange,
        lazy: this.props.lazy,
        paginator: this.props.paginator,
        onCellSelect: this.props.onCellSelect,
        onCellUnselect: this.props.onCellUnselect,
        onRowSelect: this.props.onRowSelect,
        onRowUnselect: this.props.onRowUnselect,
        dragSelection: this.props.dragSelection,
        onContextMenu: this.props.onContextMenu,
        onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
        metaKeySelection: this.props.metaKeySelection,
        selectionMode: this.props.selectionMode,
        cellSelection: this.props.cellSelection,
        contextMenuSelection: this.props.contextMenuSelection,
        dataKey: this.props.dataKey,
        expandedRows: this.props.expandedRows,
        onRowCollapse: this.props.onRowCollapse,
        onRowExpand: this.props.onRowExpand,
        onRowToggle: this.props.onRowToggle,
        editMode: this.props.editMode,
        editingRows: this.props.editingRows,
        onRowReorder: this.props.onRowReorder,
        scrollable: this.props.scrollable,
        rowGroupMode: this.props.rowGroupMode,
        groupRowsBy: this.props.groupRowsBy,
        expandableRowGroups: this.props.expandableRowGroups,
        loading: this.props.loading,
        emptyMessage: this.props.emptyMessage,
        rowGroupHeaderTemplate: this.props.rowGroupHeaderTemplate,
        rowExpansionTemplate: this.props.rowExpansionTemplate,
        rowGroupFooterTemplate: this.props.rowGroupFooterTemplate,
        onRowEditChange: this.props.onRowEditChange,
        compareSelectionBy: this.props.compareSelectionBy,
        selectOnEdit: this.props.selectOnEdit,
        onRowEditInit: this.props.onRowEditInit,
        rowEditValidator: this.props.rowEditValidator,
        onRowEditSave: this.props.onRowEditSave,
        onRowEditComplete: this.props.onRowEditComplete,
        onRowEditCancel: this.props.onRowEditCancel,
        cellClassName: this.props.cellClassName,
        responsiveLayout: this.props.responsiveLayout,
        showSelectionElement: this.props.showSelectionElement,
        showRowReorderElement: this.props.showRowReorderElement,
        expandedRowIcon: this.props.expandedRowIcon,
        collapsedRowIcon: this.props.collapsedRowIcon,
        rowClassName: this.props.rowClassName,
        isVirtualScrollerDisabled: true
      });
      var body = /*#__PURE__*/React__default["default"].createElement(TableBody, {
        value: this.dataToRender(rows),
        className: className,
        empty: empty,
        frozenRow: false,
        tableProps: this.props,
        tableSelector: tableSelector,
        columns: columns,
        selectionModeInColumn: selectionModeInColumn,
        first: first,
        editingMeta: editingMeta,
        onEditingMetaChange: this.onEditingMetaChange,
        tabIndex: this.props.tabIndex,
        onRowClick: this.props.onRowClick,
        onRowDoubleClick: this.props.onRowDoubleClick,
        onCellClick: this.props.onCellClick,
        selection: this.props.selection,
        onSelectionChange: this.props.onSelectionChange,
        lazy: this.props.lazy,
        paginator: this.props.paginator,
        onCellSelect: this.props.onCellSelect,
        onCellUnselect: this.props.onCellUnselect,
        onRowSelect: this.props.onRowSelect,
        onRowUnselect: this.props.onRowUnselect,
        dragSelection: this.props.dragSelection,
        onContextMenu: this.props.onContextMenu,
        onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
        metaKeySelection: this.props.metaKeySelection,
        selectionMode: this.props.selectionMode,
        cellSelection: this.props.cellSelection,
        contextMenuSelection: this.props.contextMenuSelection,
        dataKey: this.props.dataKey,
        expandedRows: this.props.expandedRows,
        onRowCollapse: this.props.onRowCollapse,
        onRowExpand: this.props.onRowExpand,
        onRowToggle: this.props.onRowToggle,
        editMode: this.props.editMode,
        editingRows: this.props.editingRows,
        onRowReorder: this.props.onRowReorder,
        scrollable: this.props.scrollable,
        rowGroupMode: this.props.rowGroupMode,
        groupRowsBy: this.props.groupRowsBy,
        expandableRowGroups: this.props.expandableRowGroups,
        loading: this.props.loading,
        emptyMessage: this.props.emptyMessage,
        rowGroupHeaderTemplate: this.props.rowGroupHeaderTemplate,
        rowExpansionTemplate: this.props.rowExpansionTemplate,
        rowGroupFooterTemplate: this.props.rowGroupFooterTemplate,
        onRowEditChange: this.props.onRowEditChange,
        compareSelectionBy: this.props.compareSelectionBy,
        selectOnEdit: this.props.selectOnEdit,
        onRowEditInit: this.props.onRowEditInit,
        rowEditValidator: this.props.rowEditValidator,
        onRowEditSave: this.props.onRowEditSave,
        onRowEditComplete: this.props.onRowEditComplete,
        onRowEditCancel: this.props.onRowEditCancel,
        cellClassName: this.props.cellClassName,
        responsiveLayout: this.props.responsiveLayout,
        showSelectionElement: this.props.showSelectionElement,
        showRowReorderElement: this.props.showRowReorderElement,
        expandedRowIcon: this.props.expandedRowIcon,
        collapsedRowIcon: this.props.collapsedRowIcon,
        rowClassName: this.props.rowClassName,
        virtualScrollerContentRef: contentRef,
        virtualScrollerOptions: options,
        isVirtualScrollerDisabled: isVirtualScrollerDisabled
      });
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, frozenBody, body);
    }
  }, {
    key: "renderTableFooter",
    value: function renderTableFooter(options) {
      var columns = options.columns;
      return /*#__PURE__*/React__default["default"].createElement(TableFooter, {
        tableProps: this.props,
        columns: columns,
        footerColumnGroup: this.props.footerColumnGroup
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent(processedData, columns, selectionModeInColumn, empty) {
      var _this14 = this;

      if (!columns) return;
      var isVirtualScrollerDisabled = this.isVirtualScrollerDisabled();
      var virtualScrollerOptions = this.props.virtualScrollerOptions || {};
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "p-datatable-wrapper",
        style: {
          maxHeight: isVirtualScrollerDisabled ? this.props.scrollHeight : ''
        }
      }, /*#__PURE__*/React__default["default"].createElement(virtualscroller.VirtualScroller, _extends({}, virtualScrollerOptions, {
        items: processedData,
        columns: columns,
        style: {
          height: this.props.scrollHeight
        },
        disabled: isVirtualScrollerDisabled,
        loaderDisabled: true,
        showSpacer: false,
        contentTemplate: function contentTemplate(options) {
          var ref = function ref(el) {
            _this14.table = el;
            options.spacerRef && options.spacerRef(el);
          };

          var tableClassName = utils.classNames('p-datatable-table', _this14.props.tableClassName);

          var tableHeader = _this14.renderTableHeader(options, empty);

          var tableBody = _this14.renderTableBody(options, selectionModeInColumn, empty, isVirtualScrollerDisabled);

          var tableFooter = _this14.renderTableFooter(options);

          return /*#__PURE__*/React__default["default"].createElement("table", {
            ref: ref,
            style: _this14.props.tableStyle,
            className: tableClassName,
            role: "table"
          }, tableHeader, tableBody, tableFooter);
        }
      })));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.props.footer) {
        var content = utils.ObjectUtils.getJSXElement(this.props.footer, {
          props: this.props
        });
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-datatable-footer"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderPaginator",
    value: function renderPaginator(position, totalRecords) {
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
    key: "renderPaginatorTop",
    value: function renderPaginatorTop(totalRecords) {
      if (this.props.paginator && this.props.paginatorPosition !== 'bottom') {
        return this.renderPaginator('top', totalRecords);
      }

      return null;
    }
  }, {
    key: "renderPaginatorBottom",
    value: function renderPaginatorBottom(totalRecords) {
      if (this.props.paginator && this.props.paginatorPosition !== 'top') {
        return this.renderPaginator('bottom', totalRecords);
      }

      return null;
    }
  }, {
    key: "renderResizeHelper",
    value: function renderResizeHelper() {
      var _this15 = this;

      if (this.props.resizableColumns) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this15.resizeHelper = el;
          },
          className: "p-column-resizer-helper",
          style: {
            display: 'none'
          }
        });
      }

      return null;
    }
  }, {
    key: "renderReorderIndicators",
    value: function renderReorderIndicators() {
      var _this16 = this;

      if (this.props.reorderableColumns) {
        var style = {
          position: 'absolute',
          display: 'none'
        };
        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("span", {
          ref: function ref(el) {
            return _this16.reorderIndicatorUp = el;
          },
          className: "pi pi-arrow-down p-datatable-reorder-indicator-up",
          style: style
        }), /*#__PURE__*/React__default["default"].createElement("span", {
          ref: function ref(el) {
            return _this16.reorderIndicatorDown = el;
          },
          className: "pi pi-arrow-up p-datatable-reorder-indicator-down",
          style: style
        }));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var processedData = this.processedData();
      var columns = this.getColumns();
      var totalRecords = this.getTotalRecords(processedData);
      var empty = utils.ObjectUtils.isEmpty(processedData);
      var selectionModeInColumn = this.getSelectionModeInColumn(columns);
      var className = utils.classNames('p-datatable p-component', {
        'p-datatable-hoverable-rows': this.props.rowHover || this.props.selectionMode || selectionModeInColumn,
        'p-datatable-auto-layout': this.props.autoLayout,
        'p-datatable-resizable': this.props.resizableColumns,
        'p-datatable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
        'p-datatable-scrollable': this.props.scrollable,
        'p-datatable-scrollable-vertical': this.props.scrollable && this.props.scrollDirection === 'vertical',
        'p-datatable-scrollable-horizontal': this.props.scrollable && this.props.scrollDirection === 'horizontal',
        'p-datatable-scrollable-both': this.props.scrollable && this.props.scrollDirection === 'both',
        'p-datatable-flex-scrollable': this.props.scrollable && this.props.scrollHeight === 'flex',
        'p-datatable-responsive-stack': this.props.responsiveLayout === 'stack',
        'p-datatable-responsive-scroll': this.props.responsiveLayout === 'scroll',
        'p-datatable-striped': this.props.stripedRows,
        'p-datatable-gridlines': this.props.showGridlines,
        'p-datatable-grouped-header': this.props.headerColumnGroup != null,
        'p-datatable-grouped-footer': this.props.footerColumnGroup != null,
        'p-datatable-sm': this.props.size === 'small',
        'p-datatable-lg': this.props.size === 'large'
      }, this.props.className);
      var loader = this.renderLoader();
      var header = this.renderHeader();
      var paginatorTop = this.renderPaginatorTop(totalRecords);
      var content = this.renderContent(processedData, columns, selectionModeInColumn, empty);
      var paginatorBottom = this.renderPaginatorBottom(totalRecords);
      var footer = this.renderFooter();
      var resizeHelper = this.renderResizeHelper();
      var reorderIndicators = this.renderReorderIndicators();
      return /*#__PURE__*/React__default["default"].createElement("div", {
        ref: function ref(el) {
          return _this17.el = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style,
        "data-scrollselectors": ".p-datatable-wrapper"
      }, loader, header, paginatorTop, content, paginatorBottom, footer, resizeHelper, reorderIndicators);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.rows !== prevState.d_rows && !nextProps.onPage) {
        return {
          rows: nextProps.rows,
          d_rows: nextProps.rows
        };
      }

      return null;
    }
  }]);

  return DataTable;
}(React.Component);

_defineProperty(DataTable, "defaultProps", {
  id: null,
  value: null,
  header: null,
  footer: null,
  style: null,
  className: null,
  tableStyle: null,
  tableClassName: null,
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
  first: 0,
  rows: null,
  totalRecords: null,
  lazy: false,
  sortField: null,
  sortOrder: null,
  multiSortMeta: null,
  sortMode: 'single',
  defaultSortOrder: 1,
  removableSort: false,
  emptyMessage: null,
  selectionMode: null,
  dragSelection: false,
  cellSelection: false,
  selection: null,
  onSelectionChange: null,
  contextMenuSelection: null,
  onContextMenuSelectionChange: null,
  compareSelectionBy: 'deepEquals',
  dataKey: null,
  metaKeySelection: true,
  selectOnEdit: true,
  headerColumnGroup: null,
  footerColumnGroup: null,
  rowExpansionTemplate: null,
  expandedRows: null,
  onRowToggle: null,
  resizableColumns: false,
  columnResizeMode: 'fit',
  reorderableColumns: false,
  filters: null,
  globalFilter: null,
  filterDelay: 300,
  filterLocale: undefined,
  scrollable: false,
  scrollHeight: null,
  scrollDirection: 'vertical',
  virtualScrollerOptions: null,
  frozenWidth: null,
  frozenValue: null,
  csvSeparator: ',',
  exportFilename: 'download',
  rowGroupMode: null,
  autoLayout: false,
  rowClassName: null,
  cellClassName: null,
  rowGroupHeaderTemplate: null,
  rowGroupFooterTemplate: null,
  loading: false,
  loadingIcon: 'pi pi-spinner',
  tabIndex: 0,
  stateKey: null,
  stateStorage: 'session',
  groupRowsBy: null,
  editMode: 'cell',
  editingRows: null,
  expandableRowGroups: false,
  rowHover: false,
  showGridlines: false,
  stripedRows: false,
  size: 'normal',
  responsiveLayout: 'stack',
  breakpoint: '960px',
  filterDisplay: 'menu',
  expandedRowIcon: 'pi pi-chevron-down',
  collapsedRowIcon: 'pi pi-chevron-right',
  onRowEditComplete: null,
  globalFilterFields: null,
  showSelectionElement: null,
  showRowReorderElement: null,
  onColumnResizeEnd: null,
  onColumnResizerClick: null,
  onColumnResizerDoubleClick: null,
  onSort: null,
  onPage: null,
  onFilter: null,
  onAllRowsSelect: null,
  onAllRowsUnselect: null,
  onRowClick: null,
  onRowDoubleClick: null,
  onRowSelect: null,
  onRowUnselect: null,
  onRowExpand: null,
  onRowCollapse: null,
  onContextMenu: null,
  onColReorder: null,
  onCellClick: null,
  onCellSelect: null,
  onCellUnselect: null,
  onRowReorder: null,
  onValueChange: null,
  rowEditValidator: null,
  onRowEditInit: null,
  onRowEditSave: null,
  onRowEditCancel: null,
  onRowEditChange: null,
  exportFunction: null,
  customSaveState: null,
  customRestoreState: null,
  onStateSave: null,
  onStateRestore: null
});

exports.DataTable = DataTable;
