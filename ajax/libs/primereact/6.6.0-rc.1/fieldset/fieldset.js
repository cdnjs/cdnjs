this.primereact = this.primereact || {};
this.primereact.fieldset = (function (exports, React, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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
  var Fieldset = /*#__PURE__*/function (_Component) {
    _inherits(Fieldset, _Component);

    var _super = _createSuper(Fieldset);

    function Fieldset(props) {
      var _this;

      _classCallCheck(this, Fieldset);

      _this = _super.call(this, props);
      var state = {
        id: props.id
      };

      if (!_this.props.onToggle) {
        state = _objectSpread(_objectSpread({}, state), {}, {
          collapsed: props.collapsed
        });
      }

      _this.state = state;
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      _this.contentRef = /*#__PURE__*/React__default['default'].createRef();
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
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.state.id) {
          this.setState({
            id: core.UniqueComponentId()
          });
        }
      }
    }, {
      key: "renderContent",
      value: function renderContent(collapsed) {
        var id = this.state.id + '_content';
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.contentRef,
          classNames: "p-toggleable-content",
          timeout: {
            enter: 1000,
            exit: 450
          },
          in: !collapsed,
          unmountOnExit: true,
          options: this.props.transitionOptions
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: this.contentRef,
          id: id,
          className: "p-toggleable-content",
          "aria-hidden": collapsed,
          role: "region",
          "aria-labelledby": this.state.id + '_header'
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-fieldset-content"
        }, this.props.children)));
      }
    }, {
      key: "renderToggleIcon",
      value: function renderToggleIcon(collapsed) {
        if (this.props.toggleable) {
          var className = core.classNames('p-fieldset-toggler pi', {
            'pi-plus': collapsed,
            'pi-minus': !collapsed
          });
          return /*#__PURE__*/React__default['default'].createElement("span", {
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
          var ariaControls = this.state.id + '_content';
          return /*#__PURE__*/React__default['default'].createElement("a", {
            href: '#' + ariaControls,
            "aria-controls": ariaControls,
            id: this.state.id + '_header',
            "aria-expanded": !collapsed,
            tabIndex: this.props.toggleable ? null : -1
          }, toggleIcon, /*#__PURE__*/React__default['default'].createElement("span", {
            className: "p-fieldset-legend-text"
          }, this.props.legend), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
        }

        return /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-fieldset-legend-text",
          id: this.state.id + '_header'
        }, this.props.legend);
      }
    }, {
      key: "renderLegend",
      value: function renderLegend(collapsed) {
        var legendContent = this.renderLegendContent(collapsed);

        if (this.props.legend != null || this.props.toggleable) {
          return /*#__PURE__*/React__default['default'].createElement("legend", {
            className: "p-fieldset-legend p-unselectable-text",
            onClick: this.toggle
          }, legendContent);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-fieldset p-component', this.props.className, {
          'p-fieldset-toggleable': this.props.toggleable
        });
        var collapsed = this.isCollapsed();
        var legend = this.renderLegend(collapsed);
        var content = this.renderContent(collapsed);
        return /*#__PURE__*/React__default['default'].createElement("fieldset", {
          id: this.props.id,
          className: className,
          style: this.props.style,
          onClick: this.props.onClick
        }, legend, content);
      }
    }]);

    return Fieldset;
  }(React.Component);

  _defineProperty(Fieldset, "defaultProps", {
    id: null,
    legend: null,
    className: null,
    style: null,
    toggleable: null,
    collapsed: null,
    transitionOptions: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onClick: null
  });

  exports.Fieldset = Fieldset;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
