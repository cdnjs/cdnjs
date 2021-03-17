"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitButtonItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

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

var SplitButtonItem = /*#__PURE__*/function (_Component) {
  _inherits(SplitButtonItem, _Component);

  var _super = _createSuper(SplitButtonItem);

  function SplitButtonItem(props) {
    var _this;

    _classCallCheck(this, SplitButtonItem);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SplitButtonItem, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.props.menuitem.command) {
        this.props.menuitem.command({
          originalEvent: e,
          item: this.props.menuitem
        });
      }

      if (this.props.onItemClick) {
        this.props.onItemClick(e);
      }

      e.preventDefault();
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator() {
      return /*#__PURE__*/_react.default.createElement("li", {
        className: "p-menu-separator",
        role: "separator"
      });
    }
  }, {
    key: "renderMenuitem",
    value: function renderMenuitem() {
      var _this2 = this;

      var _this$props$menuitem = this.props.menuitem,
          disabled = _this$props$menuitem.disabled,
          icon = _this$props$menuitem.icon,
          label = _this$props$menuitem.label,
          template = _this$props$menuitem.template,
          url = _this$props$menuitem.url,
          target = _this$props$menuitem.target;
      var className = (0, _ClassNames.classNames)('p-menuitem-link', {
        'p-disabled': disabled
      });
      var iconClassName = (0, _ClassNames.classNames)('p-menuitem-icon', icon);
      icon = icon && /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      });
      label = label && /*#__PURE__*/_react.default.createElement("span", {
        className: "p-menuitem-text"
      }, label);

      var content = /*#__PURE__*/_react.default.createElement("a", {
        href: url || '#',
        role: "menuitem",
        className: className,
        target: target,
        onClick: this.onClick
      }, icon, label);

      if (template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this2.onClick(event);
          },
          className: className,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: this.props
        };
        content = _ObjectUtils.default.getJSXElement(template, this.props.menuitem, defaultContentOptions);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        className: "p-menuitem",
        role: "none"
      }, content);
    }
  }, {
    key: "renderItem",
    value: function renderItem() {
      if (this.props.menuitem.separator) {
        return this.renderSeparator();
      }

      return this.renderMenuitem();
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.renderItem();
      return item;
    }
  }]);

  return SplitButtonItem;
}(_react.Component);

exports.SplitButtonItem = SplitButtonItem;

_defineProperty(SplitButtonItem, "defaultProps", {
  menuitem: null,
  onItemClick: null
});

_defineProperty(SplitButtonItem, "propTypes", {
  menuitem: _propTypes.default.any,
  onItemClick: _propTypes.default.func
});