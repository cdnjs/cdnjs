'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var portal = require('primereact/portal');
var utils = require('primereact/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SlideMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
  var _React$useState = React__namespace.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    renderSubMenu = _React$useState4[0],
    setRenderSubMenu = _React$useState4[1];
  var onItemClick = function onItemClick(event, item, index) {
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
      var key = createKey(item, index);
      setRenderSubMenu(_objectSpread(_objectSpread({}, renderSubMenu), {}, _defineProperty({}, key, true)));
      setActiveItemState(item);
      props.onForward();
    }
  };
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    return /*#__PURE__*/React__namespace.createElement("li", {
      key: key,
      className: "p-menu-separator"
    });
  };
  var createSubmenu = function createSubmenu(item, index) {
    var shouldRender = renderSubMenu[createKey(item, index)];
    if (item.items && shouldRender) {
      return /*#__PURE__*/React__namespace.createElement(SlideMenuSub, {
        menuProps: props.menuProps,
        model: item.items,
        index: props.index + 1,
        menuWidth: props.menuWidth,
        effectDuration: props.effectDuration,
        onForward: props.onForward,
        parentActive: item === activeItemState
      });
    }
    return null;
  };
  var createKey = function createKey(item, index) {
    return item.label + '_' + index;
  };
  var createMenuitem = function createMenuitem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = createKey(item, index);
    var active = activeItemState === item;
    var className = utils.classNames('p-menuitem', {
      'p-menuitem-active': active,
      'p-disabled': item.disabled
    }, item.className);
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var submenuIconClassName = 'p-submenu-icon pi pi-fw pi-angle-right';
    var icon = utils.IconUtils.getJSXIcon(item.icon, {
      className: 'p-menuitem-icon'
    }, {
      props: props.menuProps
    });
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-menuitem-text"
    }, item.label);
    var submenuIcon = item.items && /*#__PURE__*/React__namespace.createElement("span", {
      className: submenuIconClassName
    });
    var submenu = createSubmenu(item, index);
    var content = /*#__PURE__*/React__namespace.createElement("a", {
      href: item.url || '#',
      className: "p-menuitem-link",
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item, index);
      },
      "aria-disabled": item.disabled
    }, icon, label, submenuIcon);
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item, index);
        },
        className: 'p-menuitem-link',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: submenuIconClassName,
        element: content,
        props: props,
        active: active
      };
      content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    return /*#__PURE__*/React__namespace.createElement("li", {
      key: key,
      id: item.id,
      className: className,
      style: item.style
    }, content, submenu);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : createMenuitem(item, index);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var style = {
    width: props.menuWidth + 'px',
    left: props.root ? -1 * props.level * props.menuWidth + 'px' : props.menuWidth + 'px',
    transitionProperty: props.root ? 'left' : 'none',
    transitionDuration: props.effectDuration + 'ms',
    transitionTimingFunction: props.easing
  };
  var className = utils.classNames({
    'p-slidemenu-rootlist': props.root,
    'p-submenu-list': !props.root,
    'p-active-submenu': props.parentActive
  });
  var items = createItems();
  return /*#__PURE__*/React__namespace.createElement("ul", {
    className: className,
    style: style
  }, items);
});
SlideMenuSub.displayName = 'SlideMenuSub';

var SlideMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    levelState = _React$useState2[0],
    setLevelState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var menuRef = React__namespace.useRef(null);
  var targetRef = React__namespace.useRef(null);
  var backward = React__namespace.useRef(null);
  var slideMenuContent = React__namespace.useRef(null);
  var _useOverlayListener = hooks.useOverlayListener({
      target: targetRef,
      overlay: menuRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid;
        valid && hide(event);
      },
      when: visibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var onPanelClick = function onPanelClick(event) {
    if (props.popup) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: targetRef.current
      });
    }
  };
  var navigateForward = function navigateForward() {
    setLevelState(function (prevLevel) {
      return prevLevel + 1;
    });
  };
  var navigateBack = function navigateBack() {
    setLevelState(function (prevLevel) {
      return prevLevel - 1;
    });
  };
  var toggle = function toggle(event) {
    if (props.popup) {
      visibleState ? hide(event) : show(event);
    }
  };
  var show = function show(event) {
    targetRef.current = event.currentTarget;
    setVisibleState(true);
    props.onShow && props.onShow(event);
  };
  var hide = function hide(event) {
    targetRef.current = event.currentTarget;
    setVisibleState(false);
    props.onHide && props.onHide(event);
  };
  var onEnter = function onEnter() {
    if (props.autoZIndex) {
      utils.ZIndexUtils.set('menu', menuRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['menu']);
    }
    utils.DomHandler.absolutePosition(menuRef.current, targetRef.current);
  };
  var onEntered = function onEntered() {
    bindOverlayListener();
  };
  var onExit = function onExit() {
    targetRef.current = null;
    unbindOverlayListener();
  };
  var onExited = function onExited() {
    utils.ZIndexUtils.clear(menuRef.current);
    setLevelState(0);
  };
  hooks.useUpdateEffect(function () {
    setLevelState(0);
  }, [props.model]);
  hooks.useUpdateEffect(function () {
    props.onNavigate && props.onNavigate({
      level: levelState
    });
  }, [levelState]);
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(menuRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      show: show,
      hide: hide,
      navigateForward: navigateForward,
      navigateBack: navigateBack,
      setLevelState: setLevelState,
      getElement: function getElement() {
        return menuRef.current;
      }
    };
  });
  var createBackward = function createBackward() {
    var className = utils.classNames('p-slidemenu-backward', {
      'p-hidden': levelState === 0
    });
    return /*#__PURE__*/React__namespace.createElement("div", {
      ref: backward,
      className: className,
      onClick: navigateBack
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-slidemenu-backward-icon pi pi-fw pi-chevron-left"
    }), /*#__PURE__*/React__namespace.createElement("span", null, props.backLabel));
  };
  var createElement = function createElement() {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, SlideMenu.defaultProps);
    var className = utils.classNames('p-slidemenu p-component', {
      'p-slidemenu-overlay': props.popup
    }, props.className);
    var wrapperStyle = {
      height: props.viewportHeight + 'px'
    };
    var backward = createBackward();
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: menuRef,
      classNames: "p-connected-overlay",
      "in": !props.popup || visibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExit: onExit,
      onExited: onExited
    }, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: menuRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onPanelClick
    }), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-slidemenu-wrapper",
      style: wrapperStyle
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-slidemenu-content",
      ref: slideMenuContent
    }, /*#__PURE__*/React__namespace.createElement(SlideMenuSub, {
      menuProps: props,
      model: props.model,
      root: true,
      index: 0,
      menuWidth: props.menuWidth,
      effectDuration: props.effectDuration,
      level: levelState,
      parentActive: levelState === 0,
      onForward: navigateForward
    })), backward)));
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
SlideMenu.displayName = 'SlideMenu';
SlideMenu.defaultProps = {
  __TYPE: 'SlideMenu',
  appendTo: null,
  autoZIndex: true,
  backLabel: 'Back',
  baseZIndex: 0,
  className: null,
  easing: 'ease-out',
  effectDuration: 250,
  id: null,
  menuWidth: 190,
  model: null,
  onHide: null,
  onShow: null,
  onNavigate: null,
  popup: false,
  style: null,
  transitionOptions: null,
  viewportHeight: 175
};

exports.SlideMenu = SlideMenu;
