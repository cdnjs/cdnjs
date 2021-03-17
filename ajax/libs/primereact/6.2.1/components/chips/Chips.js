"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chips = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _Tooltip = require("../tooltip/Tooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Chips = /*#__PURE__*/function (_Component) {
  _inherits(Chips, _Component);

  var _super = _createSuper(Chips);

  function Chips(props) {
    var _this;

    _classCallCheck(this, Chips);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.onWrapperClick = _this.onWrapperClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Chips, [{
    key: "removeItem",
    value: function removeItem(event, index) {
      if (this.props.disabled) {
        return;
      }

      var values = _toConsumableArray(this.props.value);

      var removedItem = values.splice(index, 1);

      if (this.props.onRemove) {
        this.props.onRemove({
          originalEvent: event,
          value: removedItem
        });
      }

      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: values,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: values
          }
        });
      }
    }
  }, {
    key: "addItem",
    value: function addItem(event, item, preventDefault) {
      if (item && item.trim().length) {
        var values = this.props.value ? _toConsumableArray(this.props.value) : [];

        if (this.props.allowDuplicate || values.indexOf(item) === -1) {
          values.push(item);

          if (this.props.onAdd) {
            this.props.onAdd({
              originalEvent: event,
              value: item
            });
          }
        }

        this.updateInput(event, values, preventDefault);
      }
    }
  }, {
    key: "onWrapperClick",
    value: function onWrapperClick() {
      this.inputElement.focus();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var inputValue = event.target.value;
      var values = this.props.value || [];

      switch (event.which) {
        //backspace
        case 8:
          if (this.inputElement.value.length === 0 && values.length > 0) {
            this.removeItem(event, values.length - 1);
          }

          break;
        //enter

        case 13:
          if (inputValue && inputValue.trim().length && (!this.props.max || this.props.max > values.length)) {
            this.addItem(event, inputValue, true);
          }

          break;

        default:
          if (this.isMaxedOut()) {
            event.preventDefault();
          } else if (this.props.separator) {
            if (this.props.separator === ',' && event.which === 188) {
              this.addItem(event, inputValue, true);
            }
          }

          break;
      }
    }
  }, {
    key: "updateInput",
    value: function updateInput(event, items, preventDefault) {
      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: items,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: items
          }
        });
      }

      this.inputElement.value = '';

      if (preventDefault) {
        event.preventDefault();
      }
    }
  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var _this2 = this;

      if (this.props.separator) {
        var pastedData = (event.clipboardData || window['clipboardData']).getData('Text');

        if (pastedData) {
          var values = this.props.value || [];
          var pastedValues = pastedData.split(this.props.separator);
          pastedValues = pastedValues.filter(function (val) {
            return (_this2.props.allowDuplicate || values.indexOf(val) === -1) && val.trim().length;
          });
          values = [].concat(_toConsumableArray(values), _toConsumableArray(pastedValues));
          this.updateInput(event, values, true);
        }
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var _this3 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this3.props.onFocus) {
          _this3.props.onFocus(event);
        }
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var _this4 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this4.props.onBlur) {
          _this4.props.onBlur(event);
        }
      });
    }
  }, {
    key: "isMaxedOut",
    value: function isMaxedOut() {
      return this.props.max && this.props.value && this.props.max === this.props.value.length;
    }
  }, {
    key: "isFilled",
    value: function isFilled() {
      return this.props.value && this.props.value.length || this.inputElement && this.inputElement.value && this.inputElement.value.length;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tooltip) {
        this.renderTooltip();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isValueSame = this.props.value && prevProps.value && prevProps.value.length === this.props.value.length;

      if (this.props.tooltip) {
        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        } else if (!isValueSame && this.tooltip) {
          this.tooltip.deactivate();
          this.tooltip.activate();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = (0, _Tooltip.tip)({
        target: this.inputElement,
        targetContainer: this.listElement,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderItem",
    value: function renderItem(value, index) {
      var _this5 = this;

      var content = this.props.itemTemplate ? this.props.itemTemplate(value) : value;
      var icon = this.props.disabled ? null : /*#__PURE__*/_react.default.createElement("span", {
        className: "p-chips-token-icon pi pi-times-circle",
        onClick: function onClick(event) {
          return _this5.removeItem(event, index);
        }
      });
      return /*#__PURE__*/_react.default.createElement("li", {
        key: index,
        className: "p-chips-token p-highlight"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-chips-token-label"
      }, content), icon);
    }
  }, {
    key: "renderInputElement",
    value: function renderInputElement() {
      var _this6 = this;

      return /*#__PURE__*/_react.default.createElement("li", {
        className: "p-chips-input-token"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          return _this6.inputElement = el;
        },
        placeholder: this.props.placeholder,
        type: "text",
        name: this.props.name,
        disabled: this.props.disabled || this.isMaxedOut(),
        onKeyDown: this.onKeyDown,
        onPaste: this.onPaste,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        "aria-labelledby": this.props.ariaLabelledBy
      }));
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this7 = this;

      if (this.props.value) {
        return this.props.value.map(function (value, index) {
          return _this7.renderItem(value, index);
        });
      }

      return null;
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this8 = this;

      var className = (0, _ClassNames.classNames)('p-inputtext p-chips-multiple-container', {
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused
      });
      var items = this.renderItems();
      var inputElement = this.renderInputElement();
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: function ref(el) {
          return _this8.listElement = el;
        },
        className: className,
        onClick: this.onWrapperClick
      }, items, inputElement);
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var className = (0, _ClassNames.classNames)('p-chips p-component p-inputwrapper', this.props.className, {
        'p-inputwrapper-filled': this.isFilled(),
        'p-inputwrapper-focus': this.state.focused
      });
      var list = this.renderList();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this9.element = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, list);
    }
  }]);

  return Chips;
}(_react.Component);

exports.Chips = Chips;

_defineProperty(Chips, "defaultProps", {
  id: null,
  name: null,
  placeholder: null,
  value: null,
  max: null,
  disabled: null,
  style: null,
  className: null,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  separator: null,
  allowDuplicate: true,
  itemTemplate: null,
  onAdd: null,
  onRemove: null,
  onChange: null,
  onFocus: null,
  onBlur: null
});

_defineProperty(Chips, "propTypes", {
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.array,
  max: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  ariaLabelledBy: _propTypes.default.string,
  separator: _propTypes.default.string,
  allowDuplicate: _propTypes.default.bool,
  itemTemplate: _propTypes.default.func,
  onAdd: _propTypes.default.func,
  onRemove: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func
});