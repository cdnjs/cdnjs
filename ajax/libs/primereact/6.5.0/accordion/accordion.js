this.primereact = this.primereact || {};
this.primereact.accordion = (function (exports, React, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var AccordionTab = /*#__PURE__*/function (_Component) {
    _inherits(AccordionTab, _Component);

    var _super = _createSuper(AccordionTab);

    function AccordionTab() {
      _classCallCheck(this, AccordionTab);

      return _super.apply(this, arguments);
    }

    return AccordionTab;
  }(React.Component);

  _defineProperty(AccordionTab, "defaultProps", {
    header: null,
    disabled: false,
    headerStyle: null,
    headerClassName: null,
    headerTemplate: null,
    contentStyle: null,
    contentClassName: null
  });

  var Accordion = /*#__PURE__*/function (_Component2) {
    _inherits(Accordion, _Component2);

    var _super2 = _createSuper(Accordion);

    function Accordion(props) {
      var _this;

      _classCallCheck(this, Accordion);

      _this = _super2.call(this, props);
      var state = {
        id: _this.props.id
      };

      if (!_this.props.onTabChange) {
        state = _objectSpread(_objectSpread({}, state), {}, {
          activeIndex: props.activeIndex
        });
      }

      _this.state = state;
      _this.contentWrappers = [];
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
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.state.id) {
          this.setState({
            id: core.UniqueComponentId()
          });
        }
      }
    }, {
      key: "renderTabHeader",
      value: function renderTabHeader(tab, selected, index) {
        var _classNames,
            _this2 = this;

        var tabHeaderClass = core.classNames('p-accordion-header', {
          'p-highlight': selected,
          'p-disabled': tab.props.disabled
        }, tab.props.headerClassName);
        var iconClassName = core.classNames('p-accordion-toggle-icon', (_classNames = {}, _defineProperty(_classNames, "".concat(this.props.expandIcon), !selected), _defineProperty(_classNames, "".concat(this.props.collapseIcon), selected), _classNames));
        var id = this.state.id + '_header_' + index;
        var ariaControls = this.state.id + '_content_' + index;
        var tabIndex = tab.props.disabled ? -1 : null;
        var header = tab.props.headerTemplate ? core.ObjectUtils.getJSXElement(tab.props.headerTemplate, tab.props) : /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-accordion-header-text"
        }, tab.props.header);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: tabHeaderClass,
          style: tab.props.headerStyle
        }, /*#__PURE__*/React__default['default'].createElement("a", {
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
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        }), header));
      }
    }, {
      key: "renderTabContent",
      value: function renderTabContent(tab, selected, index) {
        var className = core.classNames('p-toggleable-content', tab.props.contentClassName);
        var id = this.state.id + '_content_' + index;
        var toggleableContentRef = /*#__PURE__*/React__default['default'].createRef();
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: toggleableContentRef,
          classNames: "p-toggleable-content",
          timeout: {
            enter: 1000,
            exit: 450
          },
          in: selected,
          unmountOnExit: true,
          options: this.props.transitionOptions
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: toggleableContentRef,
          id: id,
          className: className,
          style: tab.props.contentStyle,
          role: "region",
          "aria-labelledby": this.state.id + '_header_' + index
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-accordion-content"
        }, tab.props.children)));
      }
    }, {
      key: "renderTab",
      value: function renderTab(tab, index) {
        var selected = this.isSelected(index);
        var tabHeader = this.renderTabHeader(tab, selected, index);
        var tabContent = this.renderTabContent(tab, selected, index);
        var tabClassName = core.classNames('p-accordion-tab', {
          'p-accordion-tab-active': selected
        });
        return /*#__PURE__*/React__default['default'].createElement("div", {
          key: tab.props.header,
          className: tabClassName
        }, tabHeader, tabContent);
      }
    }, {
      key: "renderTabs",
      value: function renderTabs() {
        var _this3 = this;

        return React__default['default'].Children.map(this.props.children, function (tab, index) {
          if (tab && tab.type === AccordionTab) {
            return _this3.renderTab(tab, index);
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var className = core.classNames('p-accordion p-component', this.props.className);
        var tabs = this.renderTabs();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this4.container = el;
          },
          id: this.state.id,
          className: className,
          style: this.props.style
        }, tabs);
      }
    }]);

    return Accordion;
  }(React.Component);

  _defineProperty(Accordion, "defaultProps", {
    id: null,
    activeIndex: null,
    className: null,
    style: null,
    multiple: false,
    expandIcon: 'pi pi-chevron-right',
    collapseIcon: 'pi pi-chevron-down',
    transitionOptions: null,
    onTabOpen: null,
    onTabClose: null,
    onTabChange: null
  });

  exports.Accordion = Accordion;
  exports.AccordionTab = AccordionTab;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
