import React, { Component } from 'react';
import { classNames, ObjectUtils, Ripple } from 'primereact/core';

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Dock = /*#__PURE__*/function (_Component) {
  _inherits(Dock, _Component);

  var _super = _createSuper(Dock);

  function Dock(props) {
    var _this;

    _classCallCheck(this, Dock);

    _this = _super.call(this, props);
    _this.state = {
      currentIndex: -3
    };
    _this.onListMouseLeave = _this.onListMouseLeave.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Dock, [{
    key: "onListMouseLeave",
    value: function onListMouseLeave() {
      this.setState({
        currentIndex: -3
      });
    }
  }, {
    key: "onItemMouseEnter",
    value: function onItemMouseEnter(index) {
      this.setState({
        currentIndex: index
      });
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e, item) {
      if (item.command) {
        item.command({
          originalEvent: e,
          item: item
        });
      }

      e.preventDefault();
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      var _this2 = this;

      var disabled = item.disabled,
          _icon = item.icon,
          label = item.label,
          template = item.template,
          url = item.url,
          target = item.target;
      var className = classNames('p-dock-item', {
        'p-dock-item-second-prev': this.state.currentIndex - 2 === index,
        'p-dock-item-prev': this.state.currentIndex - 1 === index,
        'p-dock-item-current': this.state.currentIndex === index,
        'p-dock-item-next': this.state.currentIndex + 1 === index,
        'p-dock-item-second-next': this.state.currentIndex + 2 === index
      });
      var contentClassName = classNames('p-dock-action', {
        'p-disabled': disabled
      });
      var iconClassName = classNames('p-dock-action-icon', _icon);
      var icon = typeof _icon === 'string' ? /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }) : ObjectUtils.getJSXElement(_icon, this.props);
      var content = /*#__PURE__*/React.createElement("a", {
        href: url || '#',
        role: "menuitem",
        className: contentClassName,
        target: target,
        "data-pr-tooltip": label,
        onClick: function onClick(e) {
          return _this2.onItemClick(e, item);
        }
      }, icon, /*#__PURE__*/React.createElement(Ripple, null));

      if (template) {
        var defaultContentOptions = {
          onClick: function onClick(e) {
            return _this2.onItemClick(e, item);
          },
          className: contentClassName,
          iconClassName: iconClassName,
          element: content,
          props: this.props,
          index: index
        };
        content = ObjectUtils.getJSXElement(template, item, defaultContentOptions);
      }

      return /*#__PURE__*/React.createElement("li", {
        key: index,
        className: className,
        role: "none",
        onMouseEnter: function onMouseEnter() {
          return _this2.onItemMouseEnter(index);
        }
      }, content);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this3 = this;

      if (this.props.model) {
        return this.props.model.map(function (item, index) {
          return _this3.renderItem(item, index);
        });
      }

      return null;
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this4 = this;

      var items = this.renderItems();
      return /*#__PURE__*/React.createElement("ul", {
        ref: function ref(el) {
          return _this4.list = el;
        },
        className: "p-dock-list",
        role: "menu",
        onMouseLeave: this.onListMouseLeave
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var className = classNames("p-dock p-component p-dock-".concat(this.props.position), this.props.className);
      var list = this.renderList();
      return /*#__PURE__*/React.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-dock-list-container"
      }, list));
    }
  }]);

  return Dock;
}(Component);

_defineProperty(Dock, "defaultProps", {
  id: null,
  style: null,
  className: null,
  model: null,
  position: 'bottom'
});

export { Dock };
