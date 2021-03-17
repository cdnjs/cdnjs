"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideMenu = exports.SlideMenuSub = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

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

var SlideMenuSub = /*#__PURE__*/function (_Component) {
  _inherits(SlideMenuSub, _Component);

  var _super = _createSuper(SlideMenuSub);

  function SlideMenuSub(props) {
    var _this;

    _classCallCheck(this, SlideMenuSub);

    _this = _super.call(this, props);
    _this.state = {
      activeItem: null
    };
    return _this;
  }

  _createClass(SlideMenuSub, [{
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
        this.setState({
          activeItem: item
        });
        this.props.onForward();
      }
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
    value: function renderSubmenu(item) {
      if (item.items) {
        return /*#__PURE__*/_react.default.createElement(SlideMenuSub, {
          model: item.items,
          index: this.props.index + 1,
          menuWidth: this.props.menuWidth,
          effectDuration: this.props.effectDuration,
          onForward: this.props.onForward,
          parentActive: item === this.state.activeItem
        });
      }

      return null;
    }
  }, {
    key: "renderMenuitem",
    value: function renderMenuitem(item, index) {
      var _this2 = this;

      var active = this.state.activeItem === item;
      var className = (0, _ClassNames.classNames)('p-menuitem', {
        'p-menuitem-active': active,
        'p-disabled': item.disabled
      }, item.className);
      var iconClassName = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);
      var submenuIconClassName = 'p-submenu-icon pi pi-fw pi-angle-right';

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
        className: "p-menuitem-link",
        target: item.target,
        onClick: function onClick(event) {
          return _this2.onItemClick(event, item, index);
        },
        "aria-disabled": item.disabled
      }, icon, label, submenuIcon);

      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return _this2.onItemClick(event, item, index);
          },
          className: 'p-menuitem',
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
        style: item.style
      }, content, submenu);
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      if (item.separator) return this.renderSeparator(index);else return this.renderMenuitem(item, index);
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
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)({
        'p-slidemenu-rootlist': this.props.root,
        'p-submenu-list': !this.props.root,
        'p-active-submenu': this.props.parentActive
      });
      var style = {
        width: this.props.menuWidth + 'px',
        left: this.props.root ? -1 * this.props.level * this.props.menuWidth + 'px' : this.props.menuWidth + 'px',
        transitionProperty: this.props.root ? 'left' : 'none',
        transitionDuration: this.props.effectDuration + 'ms',
        transitionTimingFunction: this.props.easing
      };
      var items = this.renderItems();
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: className,
        style: style
      }, items);
    }
  }]);

  return SlideMenuSub;
}(_react.Component);

exports.SlideMenuSub = SlideMenuSub;

_defineProperty(SlideMenuSub, "defaultProps", {
  model: null,
  level: 0,
  easing: 'ease-out',
  effectDuration: 250,
  menuWidth: 190,
  parentActive: false,
  onForward: null
});

_defineProperty(SlideMenuSub, "propTypes", {
  model: _propTypes.default.any,
  level: _propTypes.default.number,
  easing: _propTypes.default.string,
  effectDuration: _propTypes.default.number,
  menuWidth: _propTypes.default.number,
  parentActive: _propTypes.default.bool,
  onForward: _propTypes.default.func
});

var SlideMenu = /*#__PURE__*/function (_Component2) {
  _inherits(SlideMenu, _Component2);

  var _super2 = _createSuper(SlideMenu);

  function SlideMenu(props) {
    var _this4;

    _classCallCheck(this, SlideMenu);

    _this4 = _super2.call(this, props);
    _this4.state = {
      level: 0,
      visible: false
    };
    _this4.navigateBack = _this4.navigateBack.bind(_assertThisInitialized(_this4));
    _this4.navigateForward = _this4.navigateForward.bind(_assertThisInitialized(_this4));
    _this4.onEnter = _this4.onEnter.bind(_assertThisInitialized(_this4));
    _this4.onEntered = _this4.onEntered.bind(_assertThisInitialized(_this4));
    _this4.onExit = _this4.onExit.bind(_assertThisInitialized(_this4));
    _this4.onExited = _this4.onExited.bind(_assertThisInitialized(_this4));
    _this4.onPanelClick = _this4.onPanelClick.bind(_assertThisInitialized(_this4));
    _this4.id = _this4.props.id || (0, _UniqueComponentId.default)();
    _this4.menuRef = /*#__PURE__*/_react.default.createRef();
    return _this4;
  }

  _createClass(SlideMenu, [{
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
    key: "navigateForward",
    value: function navigateForward() {
      this.setState({
        level: this.state.level + 1
      });
    }
  }, {
    key: "navigateBack",
    value: function navigateBack() {
      this.setState({
        level: this.state.level - 1
      });
    }
  }, {
    key: "renderBackward",
    value: function renderBackward() {
      var _this5 = this;

      var className = (0, _ClassNames.classNames)('p-slidemenu-backward', {
        'p-hidden': this.state.level === 0
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.backward = el;
        },
        className: className,
        onClick: this.navigateBack
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-slidemenu-backward-icon pi pi-fw pi-chevron-left"
      }), /*#__PURE__*/_react.default.createElement("span", null, this.props.backLabel));
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
      var _this6 = this;

      this.target = event.currentTarget;
      var currentEvent = event;
      this.setState({
        visible: true
      }, function () {
        if (_this6.props.onShow) {
          _this6.props.onShow(currentEvent);
        }
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      var _this7 = this;

      var currentEvent = event;
      this.setState({
        visible: false
      }, function () {
        if (_this7.props.onHide) {
          _this7.props.onHide(currentEvent);
        }
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      if (this.props.autoZIndex) {
        this.menuRef.current.style.zIndex = String(this.props.baseZIndex + _DomHandler.default.generateZIndex());
      }

      _DomHandler.default.absolutePosition(this.menuRef.current, this.target);
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.bindDocumentClickListener();
      this.bindDocumentResizeListener();
      this.bindScrollListener();
    }
  }, {
    key: "onExit",
    value: function onExit() {
      this.target = null;
      this.unbindDocumentClickListener();
      this.unbindDocumentResizeListener();
      this.unbindScrollListener();
    }
  }, {
    key: "onExited",
    value: function onExited() {
      _DomHandler.default.revertZIndex();

      this.setState({
        level: 0
      });
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this8 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this8.state.visible && _this8.isOutsideClicked(event)) {
            _this8.hide(event);
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(event) {
      return this.menuRef && this.menuRef.current && !(this.menuRef.current.isSameNode(event.target) || this.menuRef.current.contains(event.target));
    }
  }, {
    key: "bindDocumentResizeListener",
    value: function bindDocumentResizeListener() {
      var _this9 = this;

      if (!this.documentResizeListener) {
        this.documentResizeListener = function (event) {
          if (_this9.state.visible) {
            _this9.hide(event);
          }
        };

        window.addEventListener('resize', this.documentResizeListener);
      }
    }
  }, {
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "unbindDocumentResizeListener",
    value: function unbindDocumentResizeListener() {
      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this10 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.target, function (event) {
          if (_this10.state.visible) {
            _this10.hide(event);
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.model !== prevProps.model) {
        this.setState({
          level: 0
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentClickListener();
      this.unbindDocumentResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this11 = this;

      var className = (0, _ClassNames.classNames)('p-slidemenu p-component', {
        'p-slidemenu-overlay': this.props.popup
      });
      var backward = this.renderBackward();
      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.menuRef,
        classNames: "p-connected-overlay",
        in: !this.props.popup || this.state.visible,
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
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-slidemenu-wrapper",
        style: {
          height: this.props.viewportHeight + 'px'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-slidemenu-content",
        ref: function ref(el) {
          return _this11.slideMenuContent = el;
        }
      }, /*#__PURE__*/_react.default.createElement(SlideMenuSub, {
        model: this.props.model,
        root: true,
        index: 0,
        menuWidth: this.props.menuWidth,
        effectDuration: this.props.effectDuration,
        level: this.state.level,
        parentActive: this.state.level === 0,
        onForward: this.navigateForward
      })), backward)));
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

  return SlideMenu;
}(_react.Component);

exports.SlideMenu = SlideMenu;

_defineProperty(SlideMenu, "defaultProps", {
  id: null,
  model: null,
  popup: false,
  style: null,
  className: null,
  easing: 'ease-out',
  effectDuration: 250,
  backLabel: 'Back',
  menuWidth: 190,
  viewportHeight: 175,
  autoZIndex: true,
  baseZIndex: 0,
  appendTo: null,
  onShow: null,
  onHide: null
});

_defineProperty(SlideMenu, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array,
  popup: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  easing: _propTypes.default.string,
  effectDuration: _propTypes.default.number,
  backLabel: _propTypes.default.string,
  menuWidth: _propTypes.default.number,
  viewportHeight: _propTypes.default.number,
  autoZIndex: _propTypes.default.bool,
  baseZIndex: _propTypes.default.number,
  appendTo: _propTypes.default.any,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func
});