"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

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

var TabMenu = /*#__PURE__*/function (_Component) {
  _inherits(TabMenu, _Component);

  var _super = _createSuper(TabMenu);

  function TabMenu(props) {
    var _this;

    _classCallCheck(this, TabMenu);

    _this = _super.call(this, props);

    if (!_this.props.onTabChange) {
      _this.state = {
        activeItem: props.activeItem
      };
    }

    return _this;
  }

  _createClass(TabMenu, [{
    key: "itemClick",
    value: function itemClick(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }

      if (!item.url) {
        event.preventDefault();
      }

      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }

      if (this.props.onTabChange) {
        this.props.onTabChange({
          originalEvent: event,
          value: item
        });
      } else {
        this.setState({
          activeItem: item
        });
      }
    }
  }, {
    key: "getActiveItem",
    value: function getActiveItem() {
      return this.props.onTabChange ? this.props.activeItem : this.state.activeItem;
    }
  }, {
    key: "getActiveIndex",
    value: function getActiveIndex() {
      var activeItem = this.getActiveItem();

      if (this.props.model) {
        for (var i = 0; i < this.props.model.length; i++) {
          if (activeItem === this.props.model[i]) {
            return i;
          }
        }
      }

      return null;
    }
  }, {
    key: "updateInkBar",
    value: function updateInkBar() {
      var activeIndex = this.getActiveIndex();
      var tabHeader = this["tab_".concat(activeIndex)];
      this.inkbar.style.width = _DomHandler.default.getWidth(tabHeader) + 'px';
      this.inkbar.style.left = _DomHandler.default.getOffset(tabHeader).left - _DomHandler.default.getOffset(this.nav).left + 'px';
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateInkBar();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateInkBar();
    }
  }, {
    key: "renderMenuItem",
    value: function renderMenuItem(item, index) {
      var _this2 = this;

      var activeItem = this.getActiveItem();
      var active = activeItem ? activeItem === item : index === 0;
      var className = (0, _ClassNames.classNames)('p-tabmenuitem', {
        'p-highlight': active,
        'p-disabled': item.disabled
      }, item.className);
      var iconClassName = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);

      var icon = item.icon && /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      });

      var label = item.label && /*#__PURE__*/_react.default.createElement("span", {
        className: "p-menuitem-text"
      }, item.label);

      var content = /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        className: "p-menuitem-link",
        target: item.target,
        onClick: function onClick(event) {
          return _this2.itemClick(event, item);
        },
        role: "presentation"
      }, icon, label, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this2.itemClick(event, item);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: this.props,
          active: active
        };
        content = _ObjectUtils.default.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        ref: function ref(el) {
          return _this2["tab_".concat(index)] = el;
        },
        key: item.label + '_' + index,
        className: className,
        style: item.style,
        role: "tab",
        "aria-selected": active,
        "aria-expanded": active,
        "aria-disabled": item.disabled
      }, content);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this3 = this;

      return this.props.model.map(function (item, index) {
        return _this3.renderMenuItem(item, index);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.props.model) {
        var className = (0, _ClassNames.classNames)('p-tabmenu p-component', this.props.className);
        var items = this.renderItems();
        return /*#__PURE__*/_react.default.createElement("div", {
          id: this.props.id,
          className: className,
          style: this.props.style
        }, /*#__PURE__*/_react.default.createElement("ul", {
          ref: function ref(el) {
            return _this4.nav = el;
          },
          className: "p-tabmenu-nav p-reset",
          role: "tablist"
        }, items, /*#__PURE__*/_react.default.createElement("li", {
          ref: function ref(el) {
            return _this4.inkbar = el;
          },
          className: "p-tabmenu-ink-bar"
        })));
      }

      return null;
    }
  }]);

  return TabMenu;
}(_react.Component);

exports.TabMenu = TabMenu;

_defineProperty(TabMenu, "defaultProps", {
  id: null,
  model: null,
  activeItem: null,
  style: null,
  className: null,
  onTabChange: null
});

_defineProperty(TabMenu, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array,
  activeItem: _propTypes.default.any,
  style: _propTypes.default.any,
  className: _propTypes.default.string,
  onTabChange: _propTypes.default.func
});