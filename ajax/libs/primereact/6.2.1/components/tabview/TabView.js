"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabView = exports.TabPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabPanel = /*#__PURE__*/function (_Component) {
  _inherits(TabPanel, _Component);

  var _super = _createSuper(TabPanel);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _super.apply(this, arguments);
  }

  return TabPanel;
}(_react.Component);

exports.TabPanel = TabPanel;

_defineProperty(TabPanel, "defaultProps", {
  header: null,
  leftIcon: null,
  rightIcon: null,
  disabled: false,
  headerStyle: null,
  headerClassName: null,
  contentStyle: null,
  contentClassName: null
});

_defineProperty(TabPanel, "propTypes", {
  header: _propTypes.default.any,
  leftIcon: _propTypes.default.string,
  rightIcon: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  headerStyle: _propTypes.default.object,
  headerClassName: _propTypes.default.string,
  contentStyle: _propTypes.default.object,
  contentClassName: _propTypes.default.string
});

var TabView = /*#__PURE__*/function (_Component2) {
  _inherits(TabView, _Component2);

  var _super2 = _createSuper(TabView);

  function TabView(props) {
    var _this;

    _classCallCheck(this, TabView);

    _this = _super2.call(this, props);

    if (!_this.props.onTabChange) {
      _this.state = {
        activeIndex: _this.props.activeIndex
      };
    }

    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(TabView, [{
    key: "getActiveIndex",
    value: function getActiveIndex() {
      return this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex;
    }
  }, {
    key: "isSelected",
    value: function isSelected(index) {
      return index === this.getActiveIndex();
    }
  }, {
    key: "onTabHeaderClick",
    value: function onTabHeaderClick(event, tab, index) {
      if (!tab.props.disabled) {
        if (this.props.onTabChange) {
          this.props.onTabChange({
            originalEvent: event,
            index: index
          });
        } else {
          this.setState({
            activeIndex: index
          });
        }
      }

      event.preventDefault();
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
    key: "renderTabHeader",
    value: function renderTabHeader(tab, index) {
      var _this2 = this;

      var selected = this.isSelected(index);
      var className = (0, _ClassNames.classNames)('p-unselectable-text', {
        'p-tabview-selected p-highlight': selected,
        'p-disabled': tab.props.disabled
      }, tab.props.headerClassName);
      var id = this.id + '_header_' + index;
      var ariaControls = this.id + '_content_' + index;
      var tabIndex = tab.props.disabled ? null : 0;
      return /*#__PURE__*/_react.default.createElement("li", {
        ref: function ref(el) {
          return _this2["tab_".concat(index)] = el;
        },
        className: className,
        style: tab.props.headerStyle,
        role: "presentation"
      }, /*#__PURE__*/_react.default.createElement("a", {
        role: "tab",
        className: "p-tabview-nav-link",
        onClick: function onClick(event) {
          return _this2.onTabHeaderClick(event, tab, index);
        },
        id: id,
        "aria-controls": ariaControls,
        "aria-selected": selected,
        tabIndex: tabIndex
      }, tab.props.leftIcon && /*#__PURE__*/_react.default.createElement("i", {
        className: tab.props.leftIcon
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "p-tabview-title"
      }, tab.props.header), tab.props.rightIcon && /*#__PURE__*/_react.default.createElement("i", {
        className: tab.props.rightIcon
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null)));
    }
  }, {
    key: "renderTabHeaders",
    value: function renderTabHeaders() {
      var _this3 = this;

      return _react.default.Children.map(this.props.children, function (tab, index) {
        return _this3.renderTabHeader(tab, index);
      });
    }
  }, {
    key: "renderNavigator",
    value: function renderNavigator() {
      var _this4 = this;

      var headers = this.renderTabHeaders();
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: function ref(el) {
          return _this4.nav = el;
        },
        className: "p-tabview-nav",
        role: "tablist"
      }, headers, /*#__PURE__*/_react.default.createElement("li", {
        ref: function ref(el) {
          return _this4.inkbar = el;
        },
        className: "p-tabview-ink-bar"
      }));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this5 = this;

      var contents = _react.default.Children.map(this.props.children, function (tab, index) {
        if (!_this5.props.renderActiveOnly || _this5.isSelected(index)) {
          return _this5.createContent(tab, index);
        }
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-tabview-panels"
      }, contents);
    }
  }, {
    key: "createContent",
    value: function createContent(tab, index) {
      var selected = this.isSelected(index);
      var className = (0, _ClassNames.classNames)(tab.props.contentClassName, 'p-tabview-panel', {
        'p-hidden': !selected
      });
      var id = this.id + '_content_' + index;
      var ariaLabelledBy = this.id + '_header_' + index;
      return /*#__PURE__*/_react.default.createElement("div", {
        id: id,
        "aria-labelledby": ariaLabelledBy,
        "aria-hidden": !selected,
        className: className,
        style: tab.props.contentStyle,
        role: "tabpanel"
      }, !this.props.renderActiveOnly ? tab.props.children : selected && tab.props.children);
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-tabview p-component', this.props.className);
      var navigator = this.renderNavigator();
      var content = this.renderContent();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, navigator, content);
    }
  }]);

  return TabView;
}(_react.Component);

exports.TabView = TabView;

_defineProperty(TabView, "defaultProps", {
  id: null,
  activeIndex: 0,
  style: null,
  className: null,
  renderActiveOnly: true,
  onTabChange: null
});

_defineProperty(TabView, "propTypes", {
  id: _propTypes.default.string,
  activeIndex: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  renderActiveOnly: _propTypes.default.bool,
  onTabChange: _propTypes.default.func
});