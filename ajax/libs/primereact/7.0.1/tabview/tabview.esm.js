import React, { Component } from 'react';
import { DomHandler, UniqueComponentId, classNames, ObjectUtils } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
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

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
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
  closable: false,
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
      id: props.id,
      backwardIsDisabled: true,
      forwardIsDisabled: false,
      hiddenTabs: []
    };

    if (!_this.props.onTabChange) {
      state = _objectSpread(_objectSpread({}, state), {}, {
        activeIndex: props.activeIndex
      });
    }

    _this.state = state;
    _this.navBackward = _this.navBackward.bind(_assertThisInitialized(_this));
    _this.navForward = _this.navForward.bind(_assertThisInitialized(_this));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
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
    key: "shouldTabRender",
    value: function shouldTabRender(tab, index) {
      return tab && tab.type === TabPanel && this.state.hiddenTabs.every(function (_i) {
        return _i !== index;
      });
    }
  }, {
    key: "findVisibleActiveTab",
    value: function findVisibleActiveTab(i) {
      var _this2 = this;

      var tabsInfo = React.Children.map(this.props.children, function (tab, index) {
        if (_this2.shouldTabRender(tab, index)) {
          return {
            tab: tab,
            index: index
          };
        }
      });
      return tabsInfo.find(function (_ref) {
        var tab = _ref.tab,
            index = _ref.index;
        return !tab.props.disabled && index >= i;
      }) || tabsInfo.reverse().find(function (_ref2) {
        var tab = _ref2.tab,
            index = _ref2.index;
        return !tab.props.disabled && i > index;
      });
    }
  }, {
    key: "onTabHeaderClose",
    value: function onTabHeaderClose(event, index) {
      var _this3 = this;

      var hiddenTabs = [].concat(_toConsumableArray(this.state.hiddenTabs), [index]);
      this.setState({
        hiddenTabs: hiddenTabs
      }, function () {
        var tabInfo = _this3.findVisibleActiveTab(index);

        tabInfo && _this3.onTabHeaderClick(event, tabInfo.tab, tabInfo.index);
      });
      event.preventDefault();
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

      this.updateScrollBar(index);
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
    key: "updateScrollBar",
    value: function updateScrollBar(index) {
      var tabHeader = this["tab_".concat(index)];

      if (tabHeader) {
        tabHeader.scrollIntoView({
          block: 'nearest'
        });
      }
    }
  }, {
    key: "updateButtonState",
    value: function updateButtonState() {
      var content = this.content;
      var scrollLeft = content.scrollLeft,
          scrollWidth = content.scrollWidth;
      var width = DomHandler.getWidth(content);
      this.setState({
        backwardIsDisabled: scrollLeft === 0
      });
      this.setState({
        forwardIsDisabled: scrollLeft === scrollWidth - width
      });
    }
  }, {
    key: "onScroll",
    value: function onScroll(event) {
      this.props.scrollable && this.updateButtonState();
      event.preventDefault();
    }
  }, {
    key: "getVisibleButtonWidths",
    value: function getVisibleButtonWidths() {
      var prevBtn = this.prevBtn;
      var nextBtn = this.nextBtn;
      return [prevBtn, nextBtn].reduce(function (acc, el) {
        return el ? acc + DomHandler.getWidth(el) : acc;
      }, 0);
    }
  }, {
    key: "navBackward",
    value: function navBackward() {
      var content = this.content;
      var width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
      var pos = content.scrollLeft - width;
      content.scrollLeft = pos <= 0 ? 0 : pos;
    }
  }, {
    key: "navForward",
    value: function navForward() {
      var content = this.content;
      var width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
      var pos = content.scrollLeft + width;
      var lastPos = content.scrollWidth - width;
      content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
  }, {
    key: "reset",
    value: function reset() {
      var state = {
        backwardIsDisabled: true,
        forwardIsDisabled: false,
        hiddenTabs: []
      };

      if (this.props.onTabChange) {
        this.props.onTabChange({
          index: this.props.activeIndex
        });
      } else {
        state = _objectSpread(_objectSpread({}, state), {}, {
          activeIndex: this.props.activeIndex
        });
      }

      this.setState(state);
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
    value: function componentDidUpdate(prevProps) {
      this.updateInkBar();

      if (prevProps.activeIndex !== this.props.activeIndex) {
        this.updateScrollBar(this.props.activeIndex);
      }

      if (prevProps.children !== this.props.children) {
        this.setState({
          hiddenTabs: []
        });
      }
    }
  }, {
    key: "renderTabHeader",
    value: function renderTabHeader(tab, index) {
      var _this4 = this;

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
      var closableIconElement = tab.props.closable && /*#__PURE__*/React.createElement("i", {
        className: "p-tabview-close pi pi-times",
        onClick: function onClick(e) {
          return _this4.onTabHeaderClose(e, index);
        }
      });
      var content =
      /*#__PURE__*/

      /* eslint-disable */
      React.createElement("a", {
        role: "tab",
        className: "p-tabview-nav-link",
        onClick: function onClick(event) {
          return _this4.onTabHeaderClick(event, tab, index);
        },
        id: id,
        "aria-controls": ariaControls,
        "aria-selected": selected,
        tabIndex: tabIndex
      }, leftIconElement, titleElement, rightIconElement, closableIconElement, /*#__PURE__*/React.createElement(Ripple, null))
      /* eslint-enable */
      ;

      if (tab.props.headerTemplate) {
        var defaultContentOptions = {
          className: 'p-tabview-nav-link',
          titleClassName: 'p-tabview-title',
          onClick: function onClick(event) {
            return _this4.onTabHeaderClick(event, tab, index);
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
          return _this4["tab_".concat(index)] = el;
        },
        className: className,
        style: tab.props.headerStyle,
        role: "presentation"
      }, content);
    }
  }, {
    key: "renderTabHeaders",
    value: function renderTabHeaders() {
      var _this5 = this;

      return React.Children.map(this.props.children, function (tab, index) {
        if (_this5.shouldTabRender(tab, index)) {
          return _this5.renderTabHeader(tab, index);
        }
      });
    }
  }, {
    key: "renderNavigator",
    value: function renderNavigator() {
      var _this6 = this;

      var headers = this.renderTabHeaders();
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this6.content = el;
        },
        id: this.props.id,
        className: "p-tabview-nav-content",
        style: this.props.style,
        onScroll: this.onScroll
      }, /*#__PURE__*/React.createElement("ul", {
        ref: function ref(el) {
          return _this6.nav = el;
        },
        className: "p-tabview-nav",
        role: "tablist"
      }, headers, /*#__PURE__*/React.createElement("li", {
        ref: function ref(el) {
          return _this6.inkbar = el;
        },
        className: "p-tabview-ink-bar"
      })));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this7 = this;

      var contents = React.Children.map(this.props.children, function (tab, index) {
        if (_this7.shouldTabRender(tab, index) && (!_this7.props.renderActiveOnly || _this7.isSelected(index))) {
          return _this7.createContent(tab, index);
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
    key: "renderPrevButton",
    value: function renderPrevButton() {
      var _this8 = this;

      if (this.props.scrollable && !this.state.backwardIsDisabled) {
        return /*#__PURE__*/React.createElement("button", {
          ref: function ref(el) {
            return _this8.prevBtn = el;
          },
          className: "p-tabview-nav-prev p-tabview-nav-btn p-link",
          onClick: this.navBackward,
          type: "button"
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-left"
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderNextButton",
    value: function renderNextButton() {
      var _this9 = this;

      if (this.props.scrollable && !this.state.forwardIsDisabled) {
        return /*#__PURE__*/React.createElement("button", {
          ref: function ref(el) {
            return _this9.nextBtn = el;
          },
          className: "p-tabview-nav-next p-tabview-nav-btn p-link",
          onClick: this.navForward,
          type: "button"
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-right"
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = classNames('p-tabview p-component', this.props.className, {
        'p-tabview-scrollable': this.props.scrollable
      });
      var navigator = this.renderNavigator();
      var content = this.renderContent();
      var prevButton = this.renderPrevButton();
      var nextButton = this.renderNextButton();
      return /*#__PURE__*/React.createElement("div", {
        className: className
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-tabview-nav-container"
      }, prevButton, navigator, nextButton), content);
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
  onTabChange: null,
  scrollable: false
});

export { TabPanel, TabView };
