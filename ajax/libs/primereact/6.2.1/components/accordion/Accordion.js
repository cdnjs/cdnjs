"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accordion = exports.AccordionTab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _reactTransitionGroup = require("react-transition-group");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var AccordionTab = /*#__PURE__*/function (_Component) {
  _inherits(AccordionTab, _Component);

  var _super = _createSuper(AccordionTab);

  function AccordionTab() {
    _classCallCheck(this, AccordionTab);

    return _super.apply(this, arguments);
  }

  return AccordionTab;
}(_react.Component);

exports.AccordionTab = AccordionTab;

_defineProperty(AccordionTab, "defaultProps", {
  header: null,
  disabled: false,
  headerStyle: null,
  headerClassName: null,
  headerTemplate: null,
  contentStyle: null,
  contentClassName: null
});

_defineProperty(AccordionTab, "propTypes", {
  header: _propTypes.default.any,
  disabled: _propTypes.default.bool,
  headerStyle: _propTypes.default.object,
  headerClassName: _propTypes.default.string,
  headerTemplate: _propTypes.default.any,
  contentStyle: _propTypes.default.object,
  contentClassName: _propTypes.default.string
});

var Accordion = /*#__PURE__*/function (_Component2) {
  _inherits(Accordion, _Component2);

  var _super2 = _createSuper(Accordion);

  function Accordion(props) {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _super2.call(this, props);

    if (!_this.props.onTabChange) {
      _this.state = {
        activeIndex: props.activeIndex
      };
    }

    _this.contentWrappers = [];
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(Accordion, [{
    key: "onTabHeaderClick",
    value: function onTabHeaderClick(event, tab, index) {
      if (!tab.props.disabled) {
        var selected = this.isSelected(index);
        var newActiveIndex = null;

        if (this.props.multiple) {
          var indexes = (this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex) || [];
          if (selected) indexes = indexes.filter(function (i) {
            return i !== index;
          });else indexes = [].concat(_toConsumableArray(indexes), [index]);
          newActiveIndex = indexes;
        } else {
          newActiveIndex = selected ? null : index;
        }

        var callback = selected ? this.props.onTabClose : this.props.onTabOpen;

        if (callback) {
          callback({
            originalEvent: event,
            index: index
          });
        }

        if (this.props.onTabChange) {
          this.props.onTabChange({
            originalEvent: event,
            index: newActiveIndex
          });
        } else {
          this.setState({
            activeIndex: newActiveIndex
          });
        }
      }

      event.preventDefault();
    }
  }, {
    key: "isSelected",
    value: function isSelected(index) {
      var activeIndex = this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex;
      return this.props.multiple ? activeIndex && activeIndex.indexOf(index) >= 0 : activeIndex === index;
    }
  }, {
    key: "renderTabHeader",
    value: function renderTabHeader(tab, selected, index) {
      var _classNames,
          _this2 = this;

      var tabHeaderClass = (0, _ClassNames.classNames)('p-accordion-header', {
        'p-highlight': selected,
        'p-disabled': tab.props.disabled
      }, tab.props.headerClassName);
      var iconClassName = (0, _ClassNames.classNames)('p-accordion-toggle-icon', (_classNames = {}, _defineProperty(_classNames, "".concat(this.props.expandIcon), !selected), _defineProperty(_classNames, "".concat(this.props.collapseIcon), selected), _classNames));
      var id = this.id + '_header_' + index;
      var ariaControls = this.id + '_content_' + index;
      var tabIndex = tab.props.disabled ? -1 : null;
      var header = tab.props.headerTemplate ? _ObjectUtils.default.getJSXElement(tab.props.headerTemplate, tab.props) : /*#__PURE__*/_react.default.createElement("span", {
        className: "p-accordion-header-text"
      }, tab.props.header);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: tabHeaderClass,
        style: tab.props.headerStyle
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: '#' + ariaControls,
        id: id,
        className: "p-accordion-header-link",
        "aria-controls": ariaControls,
        role: "tab",
        "aria-expanded": selected,
        onClick: function onClick(event) {
          return _this2.onTabHeaderClick(event, tab, index);
        },
        tabIndex: tabIndex
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      }), header));
    }
  }, {
    key: "renderTabContent",
    value: function renderTabContent(tab, selected, index) {
      var className = (0, _ClassNames.classNames)('p-toggleable-content', tab.props.contentClassName);
      var id = this.id + '_content_' + index;

      var toggleableContentRef = /*#__PURE__*/_react.default.createRef();

      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: toggleableContentRef,
        classNames: "p-toggleable-content",
        timeout: {
          enter: 1000,
          exit: 450
        },
        in: selected,
        unmountOnExit: true
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: toggleableContentRef,
        id: id,
        className: className,
        style: tab.props.contentStyle,
        role: "region",
        "aria-labelledby": this.id + '_header_' + index
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-accordion-content"
      }, tab.props.children)));
    }
  }, {
    key: "renderTab",
    value: function renderTab(tab, index) {
      var selected = this.isSelected(index);
      var tabHeader = this.renderTabHeader(tab, selected, index);
      var tabContent = this.renderTabContent(tab, selected, index);
      var tabClassName = (0, _ClassNames.classNames)('p-accordion-tab', {
        'p-accordion-tab-active': selected
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        key: tab.props.header,
        className: tabClassName
      }, tabHeader, tabContent);
    }
  }, {
    key: "renderTabs",
    value: function renderTabs() {
      var _this3 = this;

      return _react.default.Children.map(this.props.children, function (tab, index) {
        return _this3.renderTab(tab, index);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var className = (0, _ClassNames.classNames)('p-accordion p-component', this.props.className);
      var tabs = this.renderTabs();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this4.container = el;
        },
        id: this.id,
        className: className,
        style: this.props.style
      }, tabs);
    }
  }]);

  return Accordion;
}(_react.Component);

exports.Accordion = Accordion;

_defineProperty(Accordion, "defaultProps", {
  id: null,
  activeIndex: null,
  className: null,
  style: null,
  multiple: false,
  expandIcon: 'pi pi-chevron-right',
  collapseIcon: 'pi pi-chevron-down',
  onTabOpen: null,
  onTabClose: null,
  onTabChange: null
});

_defineProperty(Accordion, "propTypes", {
  id: _propTypes.default.string,
  activeIndex: _propTypes.default.any,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  multiple: _propTypes.default.bool,
  expandIcon: _propTypes.default.string,
  collapseIcon: _propTypes.default.string,
  onTabOpen: _propTypes.default.func,
  onTabClose: _propTypes.default.func,
  onTabChange: _propTypes.default.func
});