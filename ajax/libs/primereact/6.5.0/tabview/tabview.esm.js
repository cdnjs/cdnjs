import React, { Component } from 'react';
import { DomHandler, UniqueComponentId, classNames, ObjectUtils, Ripple } from 'primereact/core';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TabPanel = /*#__PURE__*/function (_Component) {
  _inherits(TabPanel, _Component);

  var _super = _createSuper(TabPanel);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _super.apply(this, arguments);
  }

  return TabPanel;
}(Component);

_defineProperty(TabPanel, "defaultProps", {
  header: null,
  headerTemplate: null,
  leftIcon: null,
  rightIcon: null,
  disabled: false,
  headerStyle: null,
  headerClassName: null,
  contentStyle: null,
  contentClassName: null
});

var TabView = /*#__PURE__*/function (_Component2) {
  _inherits(TabView, _Component2);

  var _super2 = _createSuper(TabView);

  function TabView(props) {
    var _this;

    _classCallCheck(this, TabView);

    _this = _super2.call(this, props);
    var state = {
      id: props.id
    };

    if (!_this.props.onTabChange) {
      state = _objectSpread(_objectSpread({}, state), {}, {
        activeIndex: props.activeIndex
      });
    }

    _this.state = state;
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
      this.inkbar.style.width = DomHandler.getWidth(tabHeader) + 'px';
      this.inkbar.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.nav).left + 'px';
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.id) {
        this.setState({
          id: UniqueComponentId()
        });
      }

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
      var className = classNames('p-unselectable-text', {
        'p-tabview-selected p-highlight': selected,
        'p-disabled': tab.props.disabled
      }, tab.props.headerClassName);
      var id = this.state.id + '_header_' + index;
      var ariaControls = this.state.id + '_content_' + index;
      var tabIndex = tab.props.disabled ? null : 0;
      var leftIconElement = tab.props.leftIcon && /*#__PURE__*/React.createElement("i", {
        className: tab.props.leftIcon
      });
      var titleElement = /*#__PURE__*/React.createElement("span", {
        className: "p-tabview-title"
      }, tab.props.header);
      var rightIconElement = tab.props.rightIcon && /*#__PURE__*/React.createElement("i", {
        className: tab.props.rightIcon
      });
      var content =
      /*#__PURE__*/

      /* eslint-disable */
      React.createElement("a", {
        role: "tab",
        className: "p-tabview-nav-link",
        onClick: function onClick(event) {
          return _this2.onTabHeaderClick(event, tab, index);
        },
        id: id,
        "aria-controls": ariaControls,
        "aria-selected": selected,
        tabIndex: tabIndex
      }, leftIconElement, titleElement, rightIconElement, /*#__PURE__*/React.createElement(Ripple, null))
      /* eslint-enable */
      ;

      if (tab.props.headerTemplate) {
        var defaultContentOptions = {
          className: 'p-tabview-nav-link',
          titleClassName: 'p-tabview-title',
          onClick: function onClick(event) {
            return _this2.onTabHeaderClick(event, tab, index);
          },
          leftIconElement: leftIconElement,
          titleElement: titleElement,
          rightIconElement: rightIconElement,
          element: content,
          props: this.props,
          index: index,
          selected: selected,
          ariaControls: ariaControls
        };
        content = ObjectUtils.getJSXElement(tab.props.headerTemplate, defaultContentOptions);
      }

      return /*#__PURE__*/React.createElement("li", {
        ref: function ref(el) {
          return _this2["tab_".concat(index)] = el;
        },
        className: className,
        style: tab.props.headerStyle,
        role: "presentation"
      }, content);
    }
  }, {
    key: "renderTabHeaders",
    value: function renderTabHeaders() {
      var _this3 = this;

      return React.Children.map(this.props.children, function (tab, index) {
        return _this3.renderTabHeader(tab, index);
      });
    }
  }, {
    key: "renderNavigator",
    value: function renderNavigator() {
      var _this4 = this;

      var headers = this.renderTabHeaders();
      return /*#__PURE__*/React.createElement("ul", {
        ref: function ref(el) {
          return _this4.nav = el;
        },
        className: "p-tabview-nav",
        role: "tablist"
      }, headers, /*#__PURE__*/React.createElement("li", {
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

      var contents = React.Children.map(this.props.children, function (tab, index) {
        if (!_this5.props.renderActiveOnly || _this5.isSelected(index)) {
          return _this5.createContent(tab, index);
        }
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-tabview-panels"
      }, contents);
    }
  }, {
    key: "createContent",
    value: function createContent(tab, index) {
      var selected = this.isSelected(index);
      var className = classNames(tab.props.contentClassName, 'p-tabview-panel', {
        'p-hidden': !selected
      });
      var id = this.state.id + '_content_' + index;
      var ariaLabelledBy = this.state.id + '_header_' + index;
      return /*#__PURE__*/React.createElement("div", {
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
      var className = classNames('p-tabview p-component', this.props.className);
      var navigator = this.renderNavigator();
      var content = this.renderContent();
      return /*#__PURE__*/React.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, navigator, content);
    }
  }]);

  return TabView;
}(Component);

_defineProperty(TabView, "defaultProps", {
  id: null,
  activeIndex: 0,
  style: null,
  className: null,
  renderActiveOnly: true,
  onTabChange: null
});

export { TabPanel, TabView };
