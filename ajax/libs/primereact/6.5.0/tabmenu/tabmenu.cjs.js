'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');

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
var TabMenu = /*#__PURE__*/function (_Component) {
  _inherits(TabMenu, _Component);

  var _super = _createSuper(TabMenu);

  function TabMenu(props) {
    var _this;

    _classCallCheck(this, TabMenu);

    _this = _super.call(this, props);

    if (!_this.props.onTabChange) {
      _this.state = {
        activeIndex: props.activeIndex
      };
    }

    return _this;
  }

  _createClass(TabMenu, [{
    key: "itemClick",
    value: function itemClick(event, item, index) {
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
          value: item,
          index: index
        });
      } else {
        this.setState({
          activeIndex: index
        });
      }
    }
  }, {
    key: "getActiveIndex",
    value: function getActiveIndex() {
      return this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex;
    }
  }, {
    key: "isSelected",
    value: function isSelected(index) {
      return index === (this.getActiveIndex() || 0);
    }
  }, {
    key: "updateInkBar",
    value: function updateInkBar() {
      var activeIndex = this.getActiveIndex();
      var tabHeader = this["tab_".concat(activeIndex)];
      this.inkbar.style.width = core.DomHandler.getWidth(tabHeader) + 'px';
      this.inkbar.style.left = core.DomHandler.getOffset(tabHeader).left - core.DomHandler.getOffset(this.nav).left + 'px';
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

      var active = this.isSelected(index);
      var className = core.classNames('p-tabmenuitem', {
        'p-highlight': active,
        'p-disabled': item.disabled
      }, item.className);
      var iconClassName = core.classNames('p-menuitem-icon', item.icon);
      var icon = item.icon && /*#__PURE__*/React__default['default'].createElement("span", {
        className: iconClassName
      });
      var label = item.label && /*#__PURE__*/React__default['default'].createElement("span", {
        className: "p-menuitem-text"
      }, item.label);
      var content = /*#__PURE__*/React__default['default'].createElement("a", {
        href: item.url || '#',
        className: "p-menuitem-link",
        target: item.target,
        onClick: function onClick(event) {
          return _this2.itemClick(event, item, index);
        },
        role: "presentation"
      }, icon, label, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));

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
          active: active,
          index: index
        };
        content = core.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/React__default['default'].createElement("li", {
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
        var className = core.classNames('p-tabmenu p-component', this.props.className);
        var items = this.renderItems();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: className,
          style: this.props.style
        }, /*#__PURE__*/React__default['default'].createElement("ul", {
          ref: function ref(el) {
            return _this4.nav = el;
          },
          className: "p-tabmenu-nav p-reset",
          role: "tablist"
        }, items, /*#__PURE__*/React__default['default'].createElement("li", {
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
}(React.Component);

_defineProperty(TabMenu, "defaultProps", {
  id: null,
  model: null,
  activeIndex: 0,
  style: null,
  className: null,
  onTabChange: null
});

exports.TabMenu = TabMenu;
