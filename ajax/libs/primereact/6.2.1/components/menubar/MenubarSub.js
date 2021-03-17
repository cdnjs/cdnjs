"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenubarSub = exports.MenubarSubComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Ripple = require("../ripple/Ripple");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var MenubarSubComponent = /*#__PURE__*/function (_Component) {
  _inherits(MenubarSubComponent, _Component);

  var _super = _createSuper(MenubarSubComponent);

  function MenubarSubComponent(props) {
    var _this;

    _classCallCheck(this, MenubarSubComponent);

    _this = _super.call(this, props);
    _this.state = {
      activeItem: null
    };
    _this.onLeafClick = _this.onLeafClick.bind(_assertThisInitialized(_this));
    _this.onChildItemKeyDown = _this.onChildItemKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MenubarSubComponent, [{
    key: "getElementRef",
    value: function getElementRef(el) {
      this.element = el;

      if (this.props.forwardRef) {
        return this.props.forwardRef(el);
      }

      return this.element;
    }
  }, {
    key: "onItemMouseEnter",
    value: function onItemMouseEnter(event, item) {
      if (item.disabled || this.props.mobileActive) {
        event.preventDefault();
        return;
      }

      if (this.props.root) {
        if (this.state.activeItem || this.props.popup) {
          this.setState({
            activeItem: item
          });
        }
      } else {
        this.setState({
          activeItem: item
        });
      }
    }
  }, {
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

      if (item.items) {
        if (this.state.activeItem && item === this.state.activeItem) {
          this.setState({
            activeItem: null
          });
        } else {
          this.setState({
            activeItem: item
          });
        }
      } else {
        this.onLeafClick();
      }
    }
  }, {
    key: "onItemKeyDown",
    value: function onItemKeyDown(event, item) {
      var listItem = event.currentTarget.parentElement;

      switch (event.which) {
        //down
        case 40:
          if (this.props.root) {
            if (item.items) {
              this.expandSubmenu(item, listItem);
            }
          } else {
            this.navigateToNextItem(listItem);
          }

          event.preventDefault();
          break;
        //up

        case 38:
          if (!this.props.root) {
            this.navigateToPrevItem(listItem);
          }

          event.preventDefault();
          break;
        //right

        case 39:
          if (this.props.root) {
            var nextItem = this.findNextItem(listItem);

            if (nextItem) {
              nextItem.children[0].focus();
            }
          } else {
            if (item.items) {
              this.expandSubmenu(item, listItem);
            }
          }

          event.preventDefault();
          break;
        //left

        case 37:
          if (this.props.root) {
            this.navigateToPrevItem(listItem);
          }

          event.preventDefault();
          break;

        default:
          break;
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event, listItem);
      }
    }
  }, {
    key: "onChildItemKeyDown",
    value: function onChildItemKeyDown(event, childListItem) {
      if (this.props.root) {
        //up
        if (event.which === 38 && childListItem.previousElementSibling == null) {
          this.collapseMenu(childListItem);
        }
      } else {
        //left
        if (event.which === 37) {
          this.collapseMenu(childListItem);
        }
      }
    }
  }, {
    key: "expandSubmenu",
    value: function expandSubmenu(item, listItem) {
      this.setState({
        activeItem: item
      });
      setTimeout(function () {
        listItem.children[1].children[0].children[0].focus();
      }, 50);
    }
  }, {
    key: "collapseMenu",
    value: function collapseMenu(listItem) {
      this.setState({
        activeItem: null
      });
      listItem.parentElement.previousElementSibling.focus();
    }
  }, {
    key: "navigateToNextItem",
    value: function navigateToNextItem(listItem) {
      var nextItem = this.findNextItem(listItem);

      if (nextItem) {
        nextItem.children[0].focus();
      }
    }
  }, {
    key: "navigateToPrevItem",
    value: function navigateToPrevItem(listItem) {
      var prevItem = this.findPrevItem(listItem);

      if (prevItem) {
        prevItem.children[0].focus();
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return _DomHandler.default.hasClass(nextItem, 'p-disabled') || !_DomHandler.default.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return _DomHandler.default.hasClass(prevItem, 'p-disabled') || !_DomHandler.default.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "onLeafClick",
    value: function onLeafClick() {
      this.setState({
        activeItem: null
      });

      if (this.props.onLeafClick) {
        this.props.onLeafClick();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this2.element && !_this2.element.contains(event.target)) {
            _this2.setState({
              activeItem: null
            });
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.parentActive && !this.props.parentActive) {
        this.setState({
          activeItem: null
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator(index) {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: 'separator_' + index,
        className: "p-menu-separator",
        role: "separator"
      });
    }
  }, {
    key: "renderSubmenu",
    value: function renderSubmenu(item) {
      if (item.items) {
        return /*#__PURE__*/_react.default.createElement(MenubarSub, {
          model: item.items,
          mobileActive: this.props.mobileActive,
          onLeafClick: this.onLeafClick,
          onKeyDown: this.onChildItemKeyDown,
          parentActive: item === this.state.activeItem
        });
      }

      return null;
    }
  }, {
    key: "renderMenuitem",
    value: function renderMenuitem(item, index) {
      var _this3 = this;

      var className = (0, _ClassNames.classNames)('p-menuitem', {
        'p-menuitem-active': this.state.activeItem === item
      }, item.className);
      var linkClassName = (0, _ClassNames.classNames)('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);
      var submenuIconClassName = (0, _ClassNames.classNames)('p-submenu-icon pi', {
        'pi-angle-down': this.props.root,
        'pi-angle-right': !this.props.root
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

      var submenu = this.renderSubmenu(item);

      var content = /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        role: "menuitem",
        className: linkClassName,
        target: item.target,
        "aria-haspopup": item.items != null,
        onClick: function onClick(event) {
          return _this3.onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return _this3.onItemKeyDown(event, item);
        }
      }, icon, label, submenuIcon, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this3.onItemClick(event, item);
          },
          onKeyDown: function onKeyDown(event) {
            return _this3.onItemKeyDown(event, item);
          },
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          submenuIconClassName: submenuIconClassName,
          element: content,
          props: this.props
        };
        content = _ObjectUtils.default.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        key: item.label + '_' + index,
        role: "none",
        className: className,
        style: item.style,
        onMouseEnter: function onMouseEnter(event) {
          return _this3.onItemMouseEnter(event, item);
        }
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
      var _this4 = this;

      if (this.props.model) {
        return this.props.model.map(function (item, index) {
          return _this4.renderItem(item, index);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var className = (0, _ClassNames.classNames)({
        'p-submenu-list': !this.props.root,
        'p-menubar-root-list': this.props.root
      });
      var submenu = this.renderMenu();
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: function ref(el) {
          return _this5.getElementRef(el);
        },
        className: className,
        role: this.props.root ? 'menubar' : 'menu'
      }, submenu);
    }
  }]);

  return MenubarSubComponent;
}(_react.Component);

exports.MenubarSubComponent = MenubarSubComponent;

_defineProperty(MenubarSubComponent, "defaultProps", {
  model: null,
  root: false,
  className: null,
  popup: false,
  onLeafClick: null,
  onKeyDown: null,
  parentActive: false,
  mobileActive: false,
  forwardRef: null
});

_defineProperty(MenubarSubComponent, "propTypes", {
  model: _propTypes.default.any,
  root: _propTypes.default.bool,
  className: _propTypes.default.string,
  popup: _propTypes.default.bool,
  onLeafClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  parentActive: _propTypes.default.bool,
  mobileActive: _propTypes.default.bool,
  forwardRef: _propTypes.default.any
});

var MenubarSub = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(MenubarSubComponent, _extends({
    forwardRef: ref
  }, props));
});

exports.MenubarSub = MenubarSub;