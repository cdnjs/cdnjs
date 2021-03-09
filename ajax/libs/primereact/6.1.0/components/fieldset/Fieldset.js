"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fieldset = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _reactTransitionGroup = require("react-transition-group");

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

var Fieldset = /*#__PURE__*/function (_Component) {
  _inherits(Fieldset, _Component);

  var _super = _createSuper(Fieldset);

  function Fieldset(props) {
    var _this;

    _classCallCheck(this, Fieldset);

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

  _createClass(Fieldset, [{
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
        id: id,
        className: "p-toggleable-content",
        "aria-hidden": collapsed,
        role: "region",
        "aria-labelledby": this.id + '_header'
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-fieldset-content"
      }, this.props.children)));
    }
  }, {
    key: "renderToggleIcon",
    value: function renderToggleIcon(collapsed) {
      if (this.props.toggleable) {
        var className = (0, _ClassNames.classNames)('p-fieldset-toggler pi', {
          'pi-plus': collapsed,
          'pi-minus': !collapsed
        });
        return /*#__PURE__*/_react.default.createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderLegendContent",
    value: function renderLegendContent(collapsed) {
      if (this.props.toggleable) {
        var toggleIcon = this.renderToggleIcon(collapsed);
        var ariaControls = this.id + '_content';
        return /*#__PURE__*/_react.default.createElement("a", {
          href: '#' + ariaControls,
          "aria-controls": ariaControls,
          id: this.id + '_header',
          "aria-expanded": !collapsed,
          tabIndex: this.props.toggleable ? null : -1
        }, toggleIcon, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-fieldset-legend-text"
        }, this.props.legend), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return /*#__PURE__*/_react.default.createElement("span", {
        className: "p-fieldset-legend-text",
        id: this.id + '_header'
      }, this.props.legend);
    }
  }, {
    key: "renderLegend",
    value: function renderLegend(collapsed) {
      var legendContent = this.renderLegendContent(collapsed);
      return /*#__PURE__*/_react.default.createElement("legend", {
        className: "p-fieldset-legend p-unselectable-text",
        onClick: this.toggle
      }, legendContent);
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-fieldset p-component', this.props.className, {
        'p-fieldset-toggleable': this.props.toggleable
      });
      var collapsed = this.isCollapsed();
      var legend = this.renderLegend(collapsed);
      var content = this.renderContent(collapsed);
      return /*#__PURE__*/_react.default.createElement("fieldset", {
        id: this.props.id,
        className: className,
        style: this.props.style,
        onClick: this.props.onClick
      }, legend, content);
    }
  }]);

  return Fieldset;
}(_react.Component);

exports.Fieldset = Fieldset;

_defineProperty(Fieldset, "defaultProps", {
  id: null,
  legend: null,
  className: null,
  style: null,
  toggleable: null,
  collapsed: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onClick: null
});

_defineProperty(Fieldset, "propTypes", {
  id: _propTypes.default.string,
  legend: _propTypes.default.any,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  toggleable: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  onExpand: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onClick: _propTypes.default.func
});