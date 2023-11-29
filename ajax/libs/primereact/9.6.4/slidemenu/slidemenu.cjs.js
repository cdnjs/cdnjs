'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var chevronleft = require('primereact/icons/chevronleft');
var overlayservice = require('primereact/overlayservice');
var portal = require('primereact/portal');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var angleright = require('primereact/icons/angleright');

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

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

var SlideMenuBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'SlideMenu',
    appendTo: null,
    autoZIndex: true,
    backIcon: null,
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
    submenuIcon: null,
    transitionOptions: null,
    viewportHeight: 175,
    children: undefined
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SlideMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
  var _React$useState = React__namespace.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    renderSubMenu = _React$useState4[0],
    setRenderSubMenu = _React$useState4[1];
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        active: activeItemState === item
      }
    });
  };
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
      setRenderSubMenu(_objectSpread$1(_objectSpread$1({}, renderSubMenu), {}, _defineProperty({}, key, true)));
      setActiveItemState(item);
      props.onForward();
    }
  };
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = utils.mergeProps({
      key: key,
      className: 'p-slidemenu-separator'
    }, props.ptm('separator'));
    return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
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
        parentActive: item === activeItemState,
        submenuIcon: props.submenuIcon,
        ptm: props.ptm
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
    var iconProps = utils.mergeProps({
      className: 'p-menuitem-icon'
    }, getPTOptions(item, 'icon'));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = utils.mergeProps({
      className: submenuIconClassName
    }, getPTOptions(item, 'submenuIcon'));
    var labelProps = utils.mergeProps({
      className: 'p-menuitem-text'
    }, getPTOptions(item, 'label'));
    var submenuIcon = item.items && utils.IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: props
    });
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
    var submenu = createSubmenu(item, index);
    var actionProps = utils.mergeProps({
      href: item.url || '#',
      className: 'p-menuitem-link',
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item, index);
      },
      'aria-disabled': item.disabled
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, submenuIcon);
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
    var menuitemProps = utils.mergeProps({
      id: item.id,
      key: key,
      className: className,
      style: item.style
    }, getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React__namespace.createElement("li", menuitemProps, content, submenu);
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
  var menuProps = utils.mergeProps({
    className: className,
    style: style
  }, props.ptm('menu'));
  return /*#__PURE__*/React__namespace.createElement("ul", menuProps, items);
});
SlideMenuSub.displayName = 'SlideMenuSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SlideMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = SlideMenuBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    levelState = _React$useState2[0],
    setLevelState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _SlideMenuBase$setMet = SlideMenuBase.setMetaData({
      props: props,
      state: {
        visible: visibleState,
        level: levelState
      }
    }),
    ptm = _SlideMenuBase$setMet.ptm;
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
      utils.ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact__default["default"].zIndex['menu']);
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
    var iconClassName = 'p-slidemenu-backward-icon';
    var previousIconProps = utils.mergeProps({
      className: iconClassName
    }, ptm('previousIcon'));
    var icon = props.backIcon || /*#__PURE__*/React__namespace.createElement(chevronleft.ChevronLeftIcon, previousIconProps);
    var backIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, previousIconProps), {
      props: props
    });
    var previousLabelProps = utils.mergeProps(ptm('previousLabel'));
    var previousProps = utils.mergeProps({
      ref: backward,
      className: className,
      onClick: function onClick(e) {
        return navigateBack();
      }
    }, ptm('previous'));
    return /*#__PURE__*/React__namespace.createElement("div", previousProps, backIcon, /*#__PURE__*/React__namespace.createElement("span", previousLabelProps, props.backLabel));
  };
  var createElement = function createElement() {
    var className = utils.classNames('p-slidemenu p-component', {
      'p-slidemenu-overlay': props.popup
    }, props.className);
    var wrapperStyle = {
      height: props.viewportHeight + 'px'
    };
    var backward = createBackward();
    var rootProps = utils.mergeProps({
      ref: menuRef,
      id: props.id,
      className: className,
      style: props.style,
      onClick: function onClick(e) {
        return onPanelClick(e);
      }
    }, SlideMenuBase.getOtherProps(props), ptm('root'));
    var wrapperProps = utils.mergeProps({
      className: 'p-slidemenu-wrapper',
      style: wrapperStyle
    }, ptm('wrapper'));
    var contentProps = utils.mergeProps({
      ref: slideMenuContent,
      className: 'p-slidemenu-content'
    }, ptm('content'));
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
    }, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", wrapperProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, /*#__PURE__*/React__namespace.createElement(SlideMenuSub, {
      menuProps: props,
      model: props.model,
      root: true,
      index: 0,
      menuWidth: props.menuWidth,
      effectDuration: props.effectDuration,
      level: levelState,
      parentActive: levelState === 0,
      onForward: navigateForward,
      submenuIcon: props.submenuIcon,
      ptm: ptm
    })), backward)));
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
SlideMenu.displayName = 'SlideMenu';

exports.SlideMenu = SlideMenu;
