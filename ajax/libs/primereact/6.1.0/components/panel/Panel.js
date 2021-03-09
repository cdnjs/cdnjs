"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

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

var Panel = /*#__PURE__*/function (_Component) {
  _inherits(Panel, _Component);

  var _super = _createSuper(Panel);

  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _super.call(this, props);

    if (!_this.props.onToggle) {
      _this.state = {
        collapsed: _this.props.collapsed
      };
    }

    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.contentRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(Panel, [{
    key: "toggle",
    value: function toggle(event) {
      if (this.props.toggleable) {
        var collapsed = this.props.onToggle ? this.props.collapsed : this.state.collapsed;
        if (collapsed) this.expand(event);else this.collapse(event);

        if (this.props.onToggle) {
          this.props.onToggle({
            originalEvent: event,
            value: !collapsed
          });
        }
      }

      event.preventDefault();
    }
  }, {
    key: "expand",
    value: function expand(event) {
      if (!this.props.onToggle) {
        this.setState({
          collapsed: false
        });
      }

      if (this.props.onExpand) {
        this.props.onExpand(event);
      }
    }
  }, {
    key: "collapse",
    value: function collapse(event) {
      if (!this.props.onToggle) {
        this.setState({
          collapsed: true
        });
      }

      if (this.props.onCollapse) {
        this.props.onCollapse(event);
      }
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      return this.props.toggleable ? this.props.onToggle ? this.props.collapsed : this.state.collapsed : false;
    }
  }, {
    key: "renderToggleIcon",
    value: function renderToggleIcon(collapsed) {
      if (this.props.toggleable) {
        var id = this.id + '_label';
        var ariaControls = this.id + '_content';
        var toggleIcon = collapsed ? this.props.expandIcon : this.props.collapseIcon;
        return /*#__PURE__*/_react.default.createElement("button", {
          className: "p-panel-header-icon p-panel-toggler p-link",
          onClick: this.toggle,
          id: id,
          "aria-controls": ariaControls,
          "aria-expanded": !collapsed,
          role: "tab"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: toggleIcon
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(collapsed) {
      var header = _ObjectUtils.default.getJSXElement(this.props.header, this.props);

      var icons = _ObjectUtils.default.getJSXElement(this.props.icons, this.props);

      var togglerElement = this.renderToggleIcon(collapsed);

      var titleElement = /*#__PURE__*/_react.default.createElement("span", {
        className: "p-panel-title",
        id: this.id + '_header'
      }, header);

      var iconsElement = /*#__PURE__*/_react.default.createElement("div", {
        className: "p-panel-icons"
      }, icons, togglerElement);

      var content = /*#__PURE__*/_react.default.createElement("div", {
        className: "p-panel-header"
      }, titleElement, iconsElement);

      if (this.props.headerTemplate) {
        var defaultContentOptions = {
          className: 'p-panel-header',
          titleClassName: 'p-panel-title',
          iconsClassName: 'p-panel-icons',
          togglerClassName: 'p-panel-header-icon p-panel-toggler p-link',
          togglerIconClassName: collapsed ? this.props.expandIcon : this.props.collapseIcon,
          onTogglerClick: this.toggle,
          titleElement: titleElement,
          iconsElement: iconsElement,
          togglerElement: togglerElement,
          element: content,
          props: this.props,
          collapsed: collapsed
        };
        return _ObjectUtils.default.getJSXElement(this.props.headerTemplate, defaultContentOptions);
      } else if (this.props.header || this.props.toggleable) {
        return content;
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent(collapsed) {
      var id = this.id + '_content';
      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.contentRef,
        classNames: "p-toggleable-content",
        timeout: {
          enter: 1000,
          exit: 450
        },
        in: !collapsed,
        unmountOnExit: true
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.contentRef,
        className: "p-toggleable-content",
        "aria-hidden": collapsed,
        role: "region",
        id: id,
        "aria-labelledby": this.id + '_header'
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-panel-content"
      }, this.props.children)));
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-panel p-component', {
        'p-panel-toggleable': this.props.toggleable
      }, this.props.className);
      var collapsed = this.isCollapsed();
      var header = this.renderHeader(collapsed);
      var content = this.renderContent(collapsed);
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, header, content);
    }
  }]);

  return Panel;
}(_react.Component);

exports.Panel = Panel;

_defineProperty(Panel, "defaultProps", {
  id: null,
  header: null,
  headerTemplate: null,
  toggleable: null,
  style: null,
  className: null,
  collapsed: null,
  expandIcon: 'pi pi-plus',
  collapseIcon: 'pi pi-minus',
  icons: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null
});

_defineProperty(Panel, "propTypes", {
  id: _propTypes.default.string,
  header: _propTypes.default.any,
  headerTemplate: _propTypes.default.any,
  toggleable: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  collapsed: _propTypes.default.bool,
  expandIcon: _propTypes.default.string,
  collapseIcon: _propTypes.default.string,
  icons: _propTypes.default.any,
  onExpand: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onToggle: _propTypes.default.func
});