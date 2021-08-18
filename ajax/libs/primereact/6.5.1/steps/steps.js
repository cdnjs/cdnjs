this.primereact = this.primereact || {};
this.primereact.steps = (function (exports, React, core) {
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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Steps = /*#__PURE__*/function (_Component) {
    _inherits(Steps, _Component);

    var _super = _createSuper(Steps);

    function Steps() {
      _classCallCheck(this, Steps);

      return _super.apply(this, arguments);
    }

    _createClass(Steps, [{
      key: "itemClick",
      value: function itemClick(event, item, index) {
        if (this.props.readOnly || item.disabled) {
          event.preventDefault();
          return;
        }

        if (this.props.onSelect) {
          this.props.onSelect({
            originalEvent: event,
            item: item,
            index: index
          });
        }

        if (!item.url) {
          event.preventDefault();
        }

        if (item.command) {
          item.command({
            originalEvent: event,
            item: item,
            index: index
          });
        }
      }
    }, {
      key: "renderItem",
      value: function renderItem(item, index) {
        var _this = this;

        var active = index === this.props.activeIndex;
        var disabled = item.disabled || index !== this.props.activeIndex && this.props.readOnly;
        var className = core.classNames('p-steps-item', item.className, {
          'p-highlight p-steps-current': active,
          'p-disabled': disabled
        });
        var label = item.label && /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-steps-title"
        }, item.label);
        var tabIndex = disabled ? -1 : '';
        var content = /*#__PURE__*/React__default['default'].createElement("a", {
          href: item.url || '#',
          className: "p-menuitem-link",
          role: "presentation",
          target: item.target,
          onClick: function onClick(event) {
            return _this.itemClick(event, item, index);
          },
          tabIndex: tabIndex,
          "aria-disabled": disabled
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-steps-number"
        }, index + 1), label);

        if (item.template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return _this.itemClick(event, item, index);
            },
            className: 'p-menuitem-link',
            labelClassName: 'p-steps-title',
            numberClassName: 'p-steps-number',
            element: content,
            props: this.props,
            tabIndex: tabIndex,
            active: active,
            disabled: disabled
          };
          content = core.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
        }

        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: item.label + '_' + index,
          className: className,
          style: item.style,
          role: "tab",
          "aria-selected": active,
          "aria-expanded": active
        }, content);
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this2 = this;

        if (this.props.model) {
          var items = this.props.model.map(function (item, index) {
            return _this2.renderItem(item, index);
          });
          return /*#__PURE__*/React__default['default'].createElement("ul", {
            role: "tablist"
          }, items);
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-steps p-component', this.props.className, {
          'p-readonly': this.props.readOnly
        });
        var items = this.renderItems();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: className,
          style: this.props.style
        }, items);
      }
    }]);

    return Steps;
  }(React.Component);

  _defineProperty(Steps, "defaultProps", {
    id: null,
    model: null,
    activeIndex: 0,
    readOnly: true,
    style: null,
    className: null,
    onSelect: null
  });

  exports.Steps = Steps;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
