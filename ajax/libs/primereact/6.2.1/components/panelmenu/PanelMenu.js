"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelMenu = void 0;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelMenuSub = /*#__PURE__*/function (_Component) {
  _inherits(PanelMenuSub, _Component);

  var _super = _createSuper(PanelMenuSub);

  function PanelMenuSub(props) {
    var _this;

    _classCallCheck(this, PanelMenuSub);

    _this = _super.call(this, props);
    _this.state = {
      activeItem: _this.findActiveItem()
    };
    return _this;
  }

  _createClass(PanelMenuSub, [{
    key: "onItemClick",
    value: function onItemClick(event, item) {
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

      var activeItem = this.state.activeItem;
      var active = this.isItemActive(item);

      if (active) {
        item.expanded = false;
        this.setState({
          activeItem: this.props.multiple ? activeItem.filter(function (a_item) {
            return a_item !== item;
          }) : null
        });
      } else {
        if (!this.props.multiple && activeItem) {
          activeItem.expanded = false;
        }

        item.expanded = true;
        this.setState({
          activeItem: this.props.multiple ? [].concat(_toConsumableArray(activeItem || []), [item]) : item
        });
      }
    }
  }, {
    key: "findActiveItem",
    value: function findActiveItem() {
      if (this.props.model) {
        if (this.props.multiple) {
          return this.props.model.filter(function (item) {
            return item.expanded;
          });
        } else {
          var activeItem = null;
          this.props.model.forEach(function (item) {
            if (item.expanded) {
              if (!activeItem) activeItem = item;else item.expanded = false;
            }
          });
          return activeItem;
        }
      }

      return null;
    }
  }, {
    key: "isItemActive",
    value: function isItemActive(item) {
      return this.state.activeItem && (this.props.multiple ? this.state.activeItem.indexOf(item) > -1 : this.state.activeItem === item);
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator(index) {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: 'separator_' + index,
        className: "p-menu-separator"
      });
    }
  }, {
    key: "renderSubmenu",
    value: function renderSubmenu(item, active) {
      var submenuWrapperClassName = (0, _ClassNames.classNames)('p-toggleable-content', {
        'p-toggleable-content-collapsed': !active
      });

      var submenuContentRef = /*#__PURE__*/_react.default.createRef();

      if (item.items) {
        return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
          nodeRef: submenuContentRef,
          classNames: "p-toggleable-content",
          timeout: {
            enter: 1000,
            exit: 450
          },
          in: active,
          unmountOnExit: true
        }, /*#__PURE__*/_react.default.createElement("div", {
          ref: submenuContentRef,
          className: submenuWrapperClassName
        }, /*#__PURE__*/_react.default.createElement(PanelMenuSub, {
          model: item.items,
          multiple: this.props.multiple
        })));
      }

      return null;
    }
  }, {
    key: "renderMenuitem",
    value: function renderMenuitem(item, index) {
      var _this2 = this;

      var active = this.isItemActive(item);
      var className = (0, _ClassNames.classNames)('p-menuitem', item.className);
      var linkClassName = (0, _ClassNames.classNames)('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);
      var submenuIconClassName = (0, _ClassNames.classNames)('p-panelmenu-icon pi pi-fw', {
        'pi-angle-right': !active,
        'pi-angle-down': active
      });

      var icon = item.icon && /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      });

      var label = item.label && /*#__PURE__*/_react.default.createElement("span", {
        className: "p-menuitem-text"
      }, item.label);

      var submenuIcon = item.items && /*#__PURE__*/_react.default.createElement("span", {
        className: submenuIconClassName
      });

      var submenu = this.renderSubmenu(item, active);

      var content = /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        className: linkClassName,
        target: item.target,
        onClick: function onClick(event) {
          return _this2.onItemClick(event, item, index);
        },
        role: "menuitem",
        "aria-disabled": item.disabled
      }, submenuIcon, icon, label);

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this2.onItemClick(event, item, index);
          },
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          submenuIconClassName: submenuIconClassName,
          element: content,
          props: this.props,
          active: active
        };
        content = _ObjectUtils.default.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        key: item.label + '_' + index,
        className: className,
        style: item.style,
        role: "none"
      }, content, submenu);
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      if (item.separator) return this.renderSeparator(index);else return this.renderMenuitem(item, index);
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this3 = this;

      if (this.props.model) {
        return this.props.model.map(function (item, index) {
          return _this3.renderItem(item, index);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-submenu-list', this.props.className);
      var menu = this.renderMenu();
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: className,
        role: "tree"
      }, menu);
    }
  }]);

  return PanelMenuSub;
}(_react.Component);

_defineProperty(PanelMenuSub, "defaultProps", {
  model: null,
  multiple: false
});

_defineProperty(PanelMenuSub, "propTypes", {
  model: _propTypes.default.any,
  multiple: _propTypes.default.bool
});

var PanelMenu = /*#__PURE__*/function (_Component2) {
  _inherits(PanelMenu, _Component2);

  var _super2 = _createSuper(PanelMenu);

  function PanelMenu(props) {
    var _this4;

    _classCallCheck(this, PanelMenu);

    _this4 = _super2.call(this, props);
    _this4.state = {
      activeItem: _this4.findActiveItem()
    };
    _this4.id = _this4.props.id || (0, _UniqueComponentId.default)();
    return _this4;
  }

  _createClass(PanelMenu, [{
    key: "onItemClick",
    value: function onItemClick(event, item) {
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

      var activeItem = this.state.activeItem;
      var active = this.isItemActive(item);

      if (active) {
        item.expanded = false;
        this.setState({
          activeItem: this.props.multiple ? activeItem.filter(function (a_item) {
            return a_item !== item;
          }) : null
        });
      } else {
        if (!this.props.multiple && activeItem) {
          activeItem.expanded = false;
        }

        item.expanded = true;
        this.setState({
          activeItem: this.props.multiple ? [].concat(_toConsumableArray(activeItem || []), [item]) : item
        });
      }
    }
  }, {
    key: "findActiveItem",
    value: function findActiveItem() {
      if (this.props.model) {
        if (this.props.multiple) {
          return this.props.model.filter(function (item) {
            return item.expanded;
          });
        } else {
          var activeItem = null;
          this.props.model.forEach(function (item) {
            if (item.expanded) {
              if (!activeItem) activeItem = item;else item.expanded = false;
            }
          });
          return activeItem;
        }
      }

      return null;
    }
  }, {
    key: "isItemActive",
    value: function isItemActive(item) {
      return this.state.activeItem && (this.props.multiple ? this.state.activeItem.indexOf(item) > -1 : this.state.activeItem === item);
    }
  }, {
    key: "renderPanelIcon",
    value: function renderPanelIcon(item) {
      var className = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);

      if (item.icon) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderPanelToggleIcon",
    value: function renderPanelToggleIcon(item, active) {
      var className = (0, _ClassNames.classNames)('p-panelmenu-icon pi', {
        'pi-chevron-right': !active,
        ' pi-chevron-down': active
      });

      if (item.items) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(item, index) {
      var _this5 = this;

      var active = this.isItemActive(item);
      var className = (0, _ClassNames.classNames)('p-panelmenu-panel', item.className);
      var headerClassName = (0, _ClassNames.classNames)('p-component p-panelmenu-header', {
        'p-highlight': active,
        'p-disabled': item.disabled
      });
      var toggleIcon = this.renderPanelToggleIcon(item, active);
      var itemIcon = this.renderPanelIcon(item);
      var contentWrapperClassName = (0, _ClassNames.classNames)('p-toggleable-content', {
        'p-toggleable-content-collapsed': !active
      });

      var menuContentRef = /*#__PURE__*/_react.default.createRef();

      return /*#__PURE__*/_react.default.createElement("div", {
        key: item.label + '_' + index,
        className: className,
        style: item.style
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: headerClassName,
        style: item.style
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        className: "p-panelmenu-header-link",
        onClick: function onClick(e) {
          return _this5.onItemClick(e, item);
        },
        "aria-expanded": active,
        id: this.id + '_header',
        "aria-controls": this.id + 'content',
        "aria-disabled": item.disabled
      }, toggleIcon, itemIcon, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-menuitem-text"
      }, item.label))), /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: menuContentRef,
        classNames: "p-toggleable-content",
        timeout: {
          enter: 1000,
          exit: 450
        },
        in: active,
        unmountOnExit: true
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: menuContentRef,
        className: contentWrapperClassName,
        role: "region",
        id: this.id + '_content',
        "aria-labelledby": this.id + '_header'
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-panelmenu-content"
      }, /*#__PURE__*/_react.default.createElement(PanelMenuSub, {
        model: item.items,
        className: "p-panelmenu-root-submenu",
        multiple: this.props.multiple
      })))));
    }
  }, {
    key: "renderPanels",
    value: function renderPanels() {
      var _this6 = this;

      if (this.props.model) {
        return this.props.model.map(function (item, index) {
          return _this6.renderPanel(item, index);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-panelmenu p-component', this.props.className);
      var panels = this.renderPanels();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, panels);
    }
  }]);

  return PanelMenu;
}(_react.Component);

exports.PanelMenu = PanelMenu;

_defineProperty(PanelMenu, "defaultProps", {
  id: null,
  model: null,
  style: null,
  className: null,
  multiple: false
});

_defineProperty(PanelMenu, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  multiple: _propTypes.default.bool
});