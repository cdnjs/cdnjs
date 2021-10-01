import React, { Component } from 'react';
import { UniqueComponentId, Ripple, ObjectUtils, CSSTransition, classNames } from 'primereact/core';

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
var Panel = /*#__PURE__*/function (_Component) {
  _inherits(Panel, _Component);

  var _super = _createSuper(Panel);

  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _super.call(this, props);
    var state = {
      id: _this.props.id
    };

    if (!_this.props.onToggle) {
      state = _objectSpread(_objectSpread({}, state), {}, {
        collapsed: _this.props.collapsed
      });
    }

    _this.state = state;
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.contentRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(Panel, [{
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
          id: UniqueComponentId()
        });
      }
    }
  }, {
    key: "renderToggleIcon",
    value: function renderToggleIcon(collapsed) {
      if (this.props.toggleable) {
        var id = this.state.id + '_label';
        var ariaControls = this.state.id + '_content';
        var toggleIcon = collapsed ? this.props.expandIcon : this.props.collapseIcon;
        return /*#__PURE__*/React.createElement("button", {
          className: "p-panel-header-icon p-panel-toggler p-link",
          onClick: this.toggle,
          id: id,
          "aria-controls": ariaControls,
          "aria-expanded": !collapsed,
          role: "tab"
        }, /*#__PURE__*/React.createElement("span", {
          className: toggleIcon
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(collapsed) {
      var header = ObjectUtils.getJSXElement(this.props.header, this.props);
      var icons = ObjectUtils.getJSXElement(this.props.icons, this.props);
      var togglerElement = this.renderToggleIcon(collapsed);
      var titleElement = /*#__PURE__*/React.createElement("span", {
        className: "p-panel-title",
        id: this.state.id + '_header'
      }, header);
      var iconsElement = /*#__PURE__*/React.createElement("div", {
        className: "p-panel-icons"
      }, icons, togglerElement);
      var content = /*#__PURE__*/React.createElement("div", {
        className: "p-panel-header"
      }, titleElement, iconsElement);

      if (this.props.headerTemplate) {
        var defaultContentOptions = {
          className: 'p-panel-header',
          titleClassName: 'p-panel-title',
          iconsClassName: 'p-panel-icons',
          togglerClassName: 'p-panel-header-icon p-panel-toggler p-link',
          togglerIconClassName: collapsed ? this.props.expandIcon : this.props.collapseIcon,
          onTogglerClick: this.toggle,
          titleElement: titleElement,
          iconsElement: iconsElement,
          togglerElement: togglerElement,
          element: content,
          props: this.props,
          collapsed: collapsed
        };
        return ObjectUtils.getJSXElement(this.props.headerTemplate, defaultContentOptions);
      } else if (this.props.header || this.props.toggleable) {
        return content;
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent(collapsed) {
      var id = this.state.id + '_content';
      return /*#__PURE__*/React.createElement(CSSTransition, {
        nodeRef: this.contentRef,
        classNames: "p-toggleable-content",
        timeout: {
          enter: 1000,
          exit: 450
        },
        in: !collapsed,
        unmountOnExit: true,
        options: this.props.transitionOptions
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.contentRef,
        className: "p-toggleable-content",
        "aria-hidden": collapsed,
        role: "region",
        id: id,
        "aria-labelledby": this.state.id + '_header'
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-panel-content"
      }, this.props.children)));
    }
  }, {
    key: "render",
    value: function render() {
      var className = classNames('p-panel p-component', {
        'p-panel-toggleable': this.props.toggleable
      }, this.props.className);
      var collapsed = this.isCollapsed();
      var header = this.renderHeader(collapsed);
      var content = this.renderContent(collapsed);
      return /*#__PURE__*/React.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, header, content);
    }
  }]);

  return Panel;
}(Component);

_defineProperty(Panel, "defaultProps", {
  id: null,
  header: null,
  headerTemplate: null,
  toggleable: null,
  style: null,
  className: null,
  collapsed: null,
  expandIcon: 'pi pi-plus',
  collapseIcon: 'pi pi-minus',
  icons: null,
  transitionOptions: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null
});

export { Panel };
