"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _ClassNames = require("../utils/ClassNames");

var _reactTransitionGroup = require("react-transition-group");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _Portal = require("../portal/Portal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Menu = /*#__PURE__*/function (_Component) {
  _inherits(Menu, _Component);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, props);
    _this.state = {
      visible: !props.popup
    };
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.menuRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(Menu, [{
    key: "onPanelClick",
    value: function onPanelClick(event) {
      if (this.props.popup) {
        _OverlayEventBus.default.emit('overlay-click', {
          originalEvent: event,
          target: this.target
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

      if (this.props.popup) {
        this.hide(event);
      }
    }
  }, {
    key: "onItemKeyDown",
    value: function onItemKeyDown(event, item) {
      var listItem = event.currentTarget.parentElement;

      switch (event.which) {
        //down
        case 40:
          var nextItem = this.findNextItem(listItem);

          if (nextItem) {
            nextItem.children[0].focus();
          }

          event.preventDefault();
          break;
        //up

        case 38:
          var prevItem = this.findPrevItem(listItem);

          if (prevItem) {
            prevItem.children[0].focus();
          }

          event.preventDefault();
          break;

        default:
          break;
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
    key: "toggle",
    value: function toggle(event) {
      if (this.props.popup) {
        if (this.state.visible) this.hide(event);else this.show(event);
      }
    }
  }, {
    key: "show",
    value: function show(event) {
      var _this2 = this;

      this.target = event.currentTarget;
      var currentEvent = event;
      this.setState({
        visible: true
      }, function () {
        if (_this2.props.onShow) {
          _this2.props.onShow(currentEvent);
        }
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      var _this3 = this;

      var currentEvent = event;
      this.setState({
        visible: false
      }, function () {
        if (_this3.props.onHide) {
          _this3.props.onHide(currentEvent);
        }
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.menuRef.current.style.zIndex = String(this.props.baseZIndex + _DomHandler.default.generateZIndex());

      _DomHandler.default.absolutePosition(this.menuRef.current, this.target);
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.bindDocumentListeners();
      this.bindScrollListener();
    }
  }, {
    key: "onExit",
    value: function onExit() {
      this.target = null;
      this.unbindDocumentListeners();
      this.unbindScrollListener();
    }
  }, {
    key: "onExited",
    value: function onExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "bindDocumentListeners",
    value: function bindDocumentListeners() {
      var _this4 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this4.state.visible && _this4.isOutsideClicked(event)) {
            _this4.hide(event);
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }

      if (!this.documentResizeListener) {
        this.documentResizeListener = function (event) {
          if (_this4.state.visible) {
            _this4.hide(event);
          }
        };

        window.addEventListener('resize', this.documentResizeListener);
      }
    }
  }, {
    key: "unbindDocumentListeners",
    value: function unbindDocumentListeners() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }

      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this5 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.target, function (event) {
          if (_this5.state.visible) {
            _this5.hide(event);
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(event) {
      return this.menuRef && this.menuRef.current && !(this.menuRef.current.isSameNode(event.target) || this.menuRef.current.contains(event.target));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentListeners();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderSubmenu",
    value: function renderSubmenu(submenu, index) {
      var _this6 = this;

      var className = (0, _ClassNames.classNames)('p-submenu-header', {
        'p-disabled': submenu.disabled
      }, submenu.className);
      var items = submenu.items.map(function (item, index) {
        return _this6.renderMenuitem(item, index);
      });
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: submenu.label + '_' + index
      }, /*#__PURE__*/_react.default.createElement("li", {
        className: className,
        style: submenu.style,
        role: "presentation",
        "aria-disabled": submenu.disabled
      }, submenu.label), items);
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
    key: "renderMenuitem",
    value: function renderMenuitem(item, index) {
      var _this7 = this;

      var className = (0, _ClassNames.classNames)('p-menuitem', item.className);
      var linkClassName = (0, _ClassNames.classNames)('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);

      var icon = item.icon && /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      });

      var label = item.label && /*#__PURE__*/_react.default.createElement("span", {
        className: "p-menuitem-text"
      }, item.label);

      var tabIndex = item.disabled ? null : 0;

      var content = /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        className: linkClassName,
        role: "menuitem",
        target: item.target,
        onClick: function onClick(event) {
          return _this7.onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return _this7.onItemKeyDown(event, item);
        },
        tabIndex: tabIndex,
        "aria-disabled": item.disabled
      }, icon, label);

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this7.onItemClick(event, item);
          },
          onKeyDown: function onKeyDown(event) {
            return _this7.onItemKeyDown(event, item);
          },
          className: linkClassName,
          tabIndex: tabIndex,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: this.props
        };
        content = _ObjectUtils.default.getJSXElement(item.template, item, defaultContentOptions);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        key: item.label + '_' + index,
        className: className,
        style: item.style,
        role: "none"
      }, content);
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      if (item.separator) {
        return this.renderSeparator(index);
      } else {
        if (item.items) return this.renderSubmenu(item, index);else return this.renderMenuitem(item, index);
      }
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this8 = this;

      return this.props.model.map(function (item, index) {
        return _this8.renderItem(item, index);
      });
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      if (this.props.model) {
        var className = (0, _ClassNames.classNames)('p-menu p-component', this.props.className, {
          'p-menu-overlay': this.props.popup
        });
        var menuitems = this.renderMenu();
        return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
          nodeRef: this.menuRef,
          classNames: "p-connected-overlay",
          in: this.state.visible,
          timeout: {
            enter: 120,
            exit: 100
          },
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntered: this.onEntered,
          onExit: this.onExit,
          onExited: this.onExited
        }, /*#__PURE__*/_react.default.createElement("div", {
          ref: this.menuRef,
          id: this.id,
          className: className,
          style: this.props.style,
          onClick: this.onPanelClick
        }, /*#__PURE__*/_react.default.createElement("ul", {
          className: "p-menu-list p-reset",
          role: "menu"
        }, menuitems)));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return this.props.popup ? /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
        element: element,
        appendTo: this.props.appendTo
      }) : element;
    }
  }]);

  return Menu;
}(_react.Component);

exports.Menu = Menu;

_defineProperty(Menu, "defaultProps", {
  id: null,
  model: null,
  popup: false,
  style: null,
  className: null,
  autoZIndex: true,
  baseZIndex: 0,
  appendTo: null,
  onShow: null,
  onHide: null
});

_defineProperty(Menu, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array,
  popup: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  autoZIndex: _propTypes.default.bool,
  baseZIndex: _propTypes.default.number,
  appendTo: _propTypes.default.any,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func
});