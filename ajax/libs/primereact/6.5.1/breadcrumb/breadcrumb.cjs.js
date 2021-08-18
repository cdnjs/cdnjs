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
var BreadCrumb = /*#__PURE__*/function (_Component) {
  _inherits(BreadCrumb, _Component);

  var _super = _createSuper(BreadCrumb);

  function BreadCrumb() {
    _classCallCheck(this, BreadCrumb);

    return _super.apply(this, arguments);
  }

  _createClass(BreadCrumb, [{
    key: "itemClick",
    value: function itemClick(event, item) {
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
    }
  }, {
    key: "renderHome",
    value: function renderHome() {
      var _this = this;

      if (this.props.home) {
        var className = core.classNames('p-breadcrumb-home', {
          'p-disabled': this.props.home.disabled
        }, this.props.home.className);
        var iconClassName = core.classNames('p-menuitem-icon', this.props.home.icon);
        return /*#__PURE__*/React__default['default'].createElement("li", {
          className: className,
          style: this.props.home.style
        }, /*#__PURE__*/React__default['default'].createElement("a", {
          href: this.props.home.url || '#',
          className: "p-menuitem-link",
          "aria-disabled": this.props.home.disabled,
          target: this.props.home.target,
          onClick: function onClick(event) {
            return _this.itemClick(event, _this.props.home);
          }
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        })));
      }

      return null;
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator() {
      return /*#__PURE__*/React__default['default'].createElement("li", {
        className: "p-breadcrumb-chevron pi pi-chevron-right"
      });
    }
  }, {
    key: "renderMenuitem",
    value: function renderMenuitem(item) {
      var _this2 = this;

      var className = core.classNames(item.className, {
        'p-disabled': item.disabled
      });
      var label = item.label && /*#__PURE__*/React__default['default'].createElement("span", {
        className: "p-menuitem-text"
      }, item.label);
      var content = /*#__PURE__*/React__default['default'].createElement("a", {
        href: item.url || '#',
        className: "p-menuitem-link",
        target: item.target,
        onClick: function onClick(event) {
          return _this2.itemClick(event, item);
        },
        "aria-disabled": item.disabled
      }, label);

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this2.itemClick(event, item);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-menuitem-text',
          element: content,
          props: this.props
        };
        content = core.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/React__default['default'].createElement("li", {
        className: className,
        style: item.style
      }, content);
    }
  }, {
    key: "renderMenuitems",
    value: function renderMenuitems() {
      var _this3 = this;

      if (this.props.model) {
        var items = this.props.model.map(function (item, index) {
          var menuitem = _this3.renderMenuitem(item);

          var separator = index === _this3.props.model.length - 1 ? null : _this3.renderSeparator();
          return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, {
            key: item.label + '_' + index
          }, menuitem, separator);
        });
        return items;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var className = core.classNames('p-breadcrumb p-component', this.props.className);
      var home = this.renderHome();
      var items = this.renderMenuitems();
      var separator = this.renderSeparator();
      return /*#__PURE__*/React__default['default'].createElement("nav", {
        id: this.props.id,
        className: className,
        style: this.props.style,
        "aria-label": "Breadcrumb"
      }, /*#__PURE__*/React__default['default'].createElement("ul", null, home, separator, items));
    }
  }]);

  return BreadCrumb;
}(React.Component);

_defineProperty(BreadCrumb, "defaultProps", {
  id: null,
  model: null,
  home: null,
  style: null,
  className: null
});

exports.BreadCrumb = BreadCrumb;
