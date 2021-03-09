"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Steps = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

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

var Steps = /*#__PURE__*/function (_Component) {
  _inherits(Steps, _Component);

  var _super = _createSuper(Steps);

  function Steps(props) {
    var _this;

    _classCallCheck(this, Steps);

    _this = _super.call(this, props);
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(Steps, [{
    key: "itemClick",
    value: function itemClick(event, item, index) {
      if (this.props.readOnly || item.disabled) {
        event.preventDefault();
        return;
      }

      if (this.props.onSelect) {
        this.props.onSelect({
          originalEvent: event,
          item: item,
          index: index
        });
      }

      if (!item.url) {
        event.preventDefault();
      }

      if (item.command) {
        item.command({
          originalEvent: event,
          item: item,
          index: index
        });
      }
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      var _this2 = this;

      var active = index === this.props.activeIndex;
      var disabled = item.disabled || index !== this.props.activeIndex && this.props.readOnly;
      var className = (0, _ClassNames.classNames)('p-steps-item', item.className, {
        'p-highlight p-steps-current': active,
        'p-disabled': disabled
      });

      var label = item.label && /*#__PURE__*/_react.default.createElement("span", {
        className: "p-steps-title"
      }, item.label);

      var tabIndex = disabled ? -1 : '';

      var content = /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        className: "p-menuitem-link",
        role: "presentation",
        target: item.target,
        onClick: function onClick(event) {
          return _this2.itemClick(event, item, index);
        },
        tabIndex: tabIndex,
        "aria-disabled": disabled
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-steps-number"
      }, index + 1), label);

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this2.onItemClick(event, item, index);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-steps-title',
          numberClassName: 'p-steps-number',
          element: content,
          props: this.props,
          tabIndex: tabIndex,
          active: active,
          disabled: disabled
        };
        content = _ObjectUtils.default.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        key: item.label + '_' + index,
        className: className,
        style: item.style,
        role: "tab",
        "aria-selected": active,
        "aria-expanded": active
      }, content);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this3 = this;

      if (this.props.model) {
        var items = this.props.model.map(function (item, index) {
          return _this3.renderItem(item, index);
        });
        return /*#__PURE__*/_react.default.createElement("ul", {
          role: "tablist"
        }, items);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-steps p-component', this.props.className, {
        'p-readonly': this.props.readOnly
      });
      var items = this.renderItems();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.id,
        className: className,
        style: this.props.style
      }, items);
    }
  }]);

  return Steps;
}(_react.Component);

exports.Steps = Steps;

_defineProperty(Steps, "defaultProps", {
  id: null,
  model: null,
  activeIndex: 0,
  readOnly: true,
  style: null,
  className: null,
  onSelect: null
});

_defineProperty(Steps, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array.isRequired,
  activeIndex: _propTypes.default.number,
  readOnly: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  onSelect: _propTypes.default.func
});