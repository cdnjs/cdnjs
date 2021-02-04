"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoCompletePanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _Ripple = require("../ripple/Ripple");

var _ClassNames = require("../utils/ClassNames");

var _reactTransitionGroup = require("react-transition-group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AutoCompletePanelComponent = /*#__PURE__*/function (_Component) {
  _inherits(AutoCompletePanelComponent, _Component);

  var _super = _createSuper(AutoCompletePanelComponent);

  function AutoCompletePanelComponent() {
    _classCallCheck(this, AutoCompletePanelComponent);

    return _super.apply(this, arguments);
  }

  _createClass(AutoCompletePanelComponent, [{
    key: "renderElement",
    value: function renderElement() {
      var _this = this;

      var panelClassName = (0, _ClassNames.classNames)('p-autocomplete-panel p-component', this.props.panelClassName);

      var panelStyle = _objectSpread({
        maxHeight: this.props.scrollHeight
      }, this.props.panelStyle);

      var items;

      if (this.props.suggestions) {
        items = this.props.suggestions.map(function (suggestion, index) {
          var itemContent = _this.props.itemTemplate ? _ObjectUtils.default.getJSXElement(_this.props.itemTemplate, suggestion) : _this.props.field ? _ObjectUtils.default.resolveFieldData(suggestion, _this.props.field) : suggestion;
          return /*#__PURE__*/_react.default.createElement("li", {
            key: index + '_item',
            role: "option",
            "aria-selected": _this.props.ariaSelected === suggestion,
            className: "p-autocomplete-item",
            onClick: function onClick(e) {
              return _this.props.onItemClick(e, suggestion);
            }
          }, itemContent, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
        });
      }

      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.props.forwardRef,
        classNames: "p-connected-overlay",
        in: this.props.in,
        timeout: {
          enter: 120,
          exit: 100
        },
        unmountOnExit: true,
        onEnter: this.props.onEnter,
        onEntering: this.props.onEntering,
        onEntered: this.props.onEntered,
        onExit: this.props.onExit
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.props.forwardRef,
        className: panelClassName,
        style: panelStyle,
        tabIndex: "-1"
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: "p-autocomplete-items",
        role: "listbox",
        id: this.props.listId
      }, items)));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();

      if (this.props.appendTo) {
        return /*#__PURE__*/_reactDom.default.createPortal(element, this.props.appendTo);
      } else {
        return element;
      }
    }
  }]);

  return AutoCompletePanelComponent;
}(_react.Component);

_defineProperty(AutoCompletePanelComponent, "defaultProps", {
  suggestions: null,
  field: null,
  appendTo: null,
  itemTemplate: null,
  onItemClick: null,
  scrollHeight: '200px',
  listId: null,
  ariaSelected: null,
  panelClassName: null,
  panelStyle: null,
  forwardRef: null
});

_defineProperty(AutoCompletePanelComponent, "propTypes", {
  suggestions: _propTypes.default.array,
  field: _propTypes.default.string,
  appendTo: _propTypes.default.any,
  itemTemplate: _propTypes.default.any,
  onItemClick: _propTypes.default.func,
  scrollHeight: _propTypes.default.string,
  listId: _propTypes.default.any,
  ariaSelected: _propTypes.default.any,
  panelClassName: _propTypes.default.string,
  panelStyle: _propTypes.default.object,
  forwardRef: _propTypes.default.object
});

var AutoCompletePanel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(AutoCompletePanelComponent, _extends({
    forwardRef: ref
  }, props));
});

exports.AutoCompletePanel = AutoCompletePanel;