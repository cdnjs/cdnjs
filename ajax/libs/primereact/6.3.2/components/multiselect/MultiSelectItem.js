"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelectItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var MultiSelectItem = /*#__PURE__*/function (_Component) {
  _inherits(MultiSelectItem, _Component);

  var _super = _createSuper(MultiSelectItem);

  function MultiSelectItem(props) {
    var _this;

    _classCallCheck(this, MultiSelectItem);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MultiSelectItem, [{
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          originalEvent: event,
          option: this.props.option
        });
      }

      event.preventDefault();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.props.onKeyDown) {
        this.props.onKeyDown({
          originalEvent: event,
          option: this.props.option
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-multiselect-item', {
        'p-highlight': this.props.selected,
        'p-disabled': this.props.disabled
      }, this.props.option.className);
      var checkboxClassName = (0, _ClassNames.classNames)('p-checkbox-box', {
        'p-highlight': this.props.selected
      });
      var checkboxIcon = (0, _ClassNames.classNames)('p-checkbox-icon p-c', {
        'pi pi-check': this.props.selected
      });
      var content = this.props.template ? _ObjectUtils.default.getJSXElement(this.props.template, this.props.option) : this.props.label;
      var tabIndex = this.props.disabled ? null : this.props.tabIndex || 0;
      return /*#__PURE__*/_react.default.createElement("li", {
        className: className,
        onClick: this.onClick,
        tabIndex: tabIndex,
        onKeyDown: this.onKeyDown,
        role: "option",
        "aria-selected": this.props.selected
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-checkbox p-component"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: checkboxClassName
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: checkboxIcon
      }))), /*#__PURE__*/_react.default.createElement("span", null, content), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }]);

  return MultiSelectItem;
}(_react.Component);

exports.MultiSelectItem = MultiSelectItem;

_defineProperty(MultiSelectItem, "defaultProps", {
  option: null,
  label: null,
  selected: false,
  disabled: false,
  tabIndex: null,
  template: null,
  onClick: null,
  onKeyDown: null
});

_defineProperty(MultiSelectItem, "propTypes", {
  option: _propTypes.default.any,
  label: _propTypes.default.string,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  template: _propTypes.default.any,
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func
});