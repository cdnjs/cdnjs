'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useDisplayOrder, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useOverlayListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ChevronLeftIcon } from 'primereact/icons/chevronleft';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { classNames, IconUtils, ObjectUtils, DomHandler, UniqueComponentId, ZIndexUtils } from 'primereact/utils';
import { AngleRightIcon } from 'primereact/icons/angleright';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var classes = {
  previousIcon: 'p-slidemenu-backward-icon',
  previous: function previous(_ref) {
    var levelState = _ref.levelState;
    return classNames('p-slidemenu-backward', {
      'p-hidden-space': levelState === 0,
      'p-slidemenu-separator': levelState > 0
    });
  },
  root: function root(_ref2) {
    var props = _ref2.props;
    return classNames('p-slidemenu p-component', {
      'p-slidemenu-overlay': props.popup
    });
  },
  wrapper: 'p-slidemenu-wrapper',
  content: 'p-slidemenu-content',
  separator: 'p-slidemenu-separator',
  icon: 'p-menuitem-icon',
  submenuIcon: 'p-submenu-icon',
  label: 'p-menuitem-text',
  action: 'p-menuitem-link',
  menu: function menu(_ref3) {
    var props = _ref3.subProps;
    return classNames({
      'p-slidemenu-rootlist': props.root,
      'p-submenu-list': !props.root,
      'p-active-submenu': props.parentActive
    });
  },
  menuitem: function menuitem(_ref4) {
    var item = _ref4.item,
      active = _ref4.active;
    return classNames('p-menuitem', {
      'p-menuitem-active': active,
      'p-disabled': item.disabled
    }, item.className);
  },
  transition: 'p-connected-overlay'
};
var styles = "\n@layer primereact {\n    .p-slidemenu {\n        width: 12.5em;\n    }\n    \n    .p-slidemenu.p-slidemenu-overlay {\n        position: absolute;\n    }\n    \n    .p-slidemenu .p-menu-separator {\n        border-width: 1px 0 0 0;\n    }\n    \n    .p-slidemenu ul {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n    }\n    \n    .p-slidemenu .p-slidemenu-rootlist {\n        position: absolute;\n        top: 0;\n    }\n    \n    .p-slidemenu .p-submenu-list {\n        display: none;\n        position: absolute;\n        top: 0;\n        width: 12.5em;\n    }\n    \n    .p-slidemenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n    }\n    \n    .p-slidemenu .p-menuitem-icon {\n        vertical-align: middle;\n    }\n    \n    .p-slidemenu .p-menuitem-text {\n        vertical-align: middle;\n    }\n    \n    .p-slidemenu .p-menuitem {\n        position: relative;\n    }\n    \n    .p-slidemenu .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n    \n    .p-slidemenu .p-slidemenu-wrapper {\n        position: relative;\n    }\n    \n    .p-slidemenu .p-slidemenu-content {\n        overflow-x: hidden;\n        overflow-y: auto;\n        position: relative;\n        height: 100%;\n    }\n    \n    .p-slidemenu-backward {\n        bottom: 0;\n        width: 100%;\n        padding: 0.25em;\n        cursor: pointer;\n    }\n    \n    .p-slidemenu-backward .p-slidemenu-backward-icon {\n        vertical-align: middle;\n    }\n    \n    .p-slidemenu-backward span {\n        vertical-align: middle;\n    }\n    \n    .p-slidemenu .p-menuitem-active {\n        position: static;\n    }\n    \n    .p-slidemenu .p-menuitem-active > .p-submenu-list {\n        display: block;\n    }\n}\n";
var inlineStyles = {
  menu: function menu(_ref5) {
    var props = _ref5.subProps;
    return {
      width: props.menuWidth + 'px',
      left: props.root ? -1 * props.level * props.menuWidth + 'px' : props.menuWidth + 'px',
      transitionProperty: props.root ? 'left' : 'none',
      transitionDuration: props.effectDuration + 'ms',
      transitionTimingFunction: props.easing
    };
  }
};
var SlideMenuBase = ComponentBase.extend({
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
    children: undefined,
    closeOnEscape: true
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SlideMenuSub = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var _React$useState3 = React.useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    renderSubMenu = _React$useState4[0],
    setRenderSubMenu = _React$useState4[1];
  var mergeProps = useMergeProps();
  var ptm = props.ptm,
    cx = props.cx,
    sx = props.sx;
  var getPTOptions = function getPTOptions(item, key) {
    return ptm(key, {
      hostName: props.hostName,
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
    if (!item.url) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var createSeparator = function createSeparator(index) {
    var key = props.id + '_sep_' + index;
    var separatorProps = mergeProps({
      id: key,
      key: key,
      className: cx('separator'),
      role: 'separator'
    }, ptm('separator', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React.createElement("li", separatorProps);
  };
  var createSubmenu = function createSubmenu(item, index) {
    var shouldRender = renderSubMenu[createKey(item, index)];
    if (item.items && shouldRender) {
      return /*#__PURE__*/React.createElement(SlideMenuSub, {
        id: props.id + '_' + index,
        menuProps: props.menuProps,
        model: item.items,
        index: props.index + 1,
        menuWidth: props.menuWidth,
        effectDuration: props.effectDuration,
        onForward: props.onForward,
        parentActive: item === activeItemState,
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        cx: cx,
        sx: sx
      });
    }
    return null;
  };
  var createKey = function createKey(item, index) {
    return item.id || props.id + '_' + index;
  };
  var createMenuitem = function createMenuitem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = createKey(item, index);
    var active = activeItemState === item;
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var iconProps = mergeProps({
      className: cx('icon')
    }, getPTOptions(item, 'icon'));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var submenuIconProps = mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(item, 'submenuIcon'));
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(item, 'label'));
    var submenuIcon = item.items && IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: props
    });
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var submenu = createSubmenu(item, index);
    var actionProps = mergeProps({
      href: item.url || '#',
      className: cx('action'),
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item, index);
      },
      'aria-disabled': item.disabled
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon);
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item, index);
        },
        className: 'p-menuitem-link',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: 'p-submenu-icon',
        element: content,
        props: props,
        active: active
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      id: key,
      key: key,
      className: cx('menuitem', {
        active: active,
        item: item
      }),
      style: item.style
    }, getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content, submenu);
  };
  var createItem = function createItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    return item.separator ? createSeparator(index) : createMenuitem(item, index);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var items = createItems();
  var menuProps = mergeProps({
    className: cx('menu', {
      subProps: props
    }),
    style: sx('menu', {
      subProps: props
    })
  }, ptm('menu', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React.createElement("ul", menuProps, items);
});
SlideMenuSub.displayName = 'SlideMenuSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SlideMenu = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = SlideMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    levelState = _React$useState4[0],
    setLevelState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    visibleState = _React$useState6[0],
    setVisibleState = _React$useState6[1];
  var _SlideMenuBase$setMet = SlideMenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        visible: visibleState,
        level: levelState
      }
    }),
    ptm = _SlideMenuBase$setMet.ptm,
    cx = _SlideMenuBase$setMet.cx,
    sx = _SlideMenuBase$setMet.sx,
    isUnstyled = _SlideMenuBase$setMet.isUnstyled;
  useHandleStyle(SlideMenuBase.css.styles, isUnstyled, {
    name: 'slidemenu'
  });
  var menuRef = React.useRef(null);
  var targetRef = React.useRef(null);
  var backward = React.useRef(null);
  var slideMenuContent = React.useRef(null);
  var isCloseOnEscape = visibleState && props.popup && props.closeOnEscape;
  var slideMenuDisplayOrder = useDisplayOrder('slide-menu', isCloseOnEscape);
  useGlobalOnEscapeKey({
    callback: function callback(event) {
      hide(event);
    },
    when: isCloseOnEscape && slideMenuDisplayOrder,
    priority: [ESC_KEY_HANDLING_PRIORITIES.SLIDE_MENU, slideMenuDisplayOrder]
  });
  var _useOverlayListener = useOverlayListener({
      target: targetRef,
      overlay: menuRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid,
          type = _ref.type;
        if (valid) {
          if (type === 'outside' || context.hideOverlaysOnDocumentScrolling) {
            hide(event);
          } else if (!DomHandler.isDocument(event.target)) {
            DomHandler.absolutePosition(menuRef.current, targetRef.current);
          }
        }
      },
      when: visibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var onPanelClick = function onPanelClick(event) {
    if (props.popup) {
      OverlayService.emit('overlay-click', {
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
      ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex.menu || PrimeReact.zIndex.menu);
    }
    DomHandler.addStyles(menuRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    DomHandler.absolutePosition(menuRef.current, targetRef.current);
  };
  var onEntered = function onEntered() {
    bindOverlayListener();
  };
  var onExit = function onExit() {
    targetRef.current = null;
    unbindOverlayListener();
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(menuRef.current);
    setLevelState(0);
  };
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  useUpdateEffect(function () {
    setLevelState(0);
  }, [props.model]);
  useUpdateEffect(function () {
    props.onNavigate && props.onNavigate({
      level: levelState
    });
  }, [levelState]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(menuRef.current);
  });
  React.useImperativeHandle(ref, function () {
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
    var previousIconProps = mergeProps({
      className: cx('previousIcon')
    }, ptm('previousIcon'));
    var icon = props.backIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousIconProps);
    var backIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, previousIconProps), {
      props: props
    });
    var previousLabelProps = mergeProps(ptm('previousLabel'));
    var previousProps = mergeProps({
      ref: backward,
      className: cx('previous', {
        levelState: levelState
      }),
      onClick: function onClick(e) {
        return navigateBack();
      }
    }, ptm('previous'));
    return /*#__PURE__*/React.createElement("div", previousProps, backIcon, /*#__PURE__*/React.createElement("span", previousLabelProps, props.backLabel));
  };
  var createElement = function createElement() {
    var wrapperStyle = {
      height: props.viewportHeight + 'px'
    };
    var backward = createBackward();
    var rootProps = mergeProps({
      ref: menuRef,
      id: props.id,
      className: classNames(props.className, cx('root')),
      style: props.style,
      onClick: function onClick(e) {
        return onPanelClick(e);
      }
    }, SlideMenuBase.getOtherProps(props), ptm('root'));
    var wrapperProps = mergeProps({
      className: cx('wrapper'),
      style: wrapperStyle
    }, ptm('wrapper'));
    var contentProps = mergeProps({
      ref: slideMenuContent,
      className: cx('content')
    }, ptm('content'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
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
    }, ptm('transition'));
    return /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: menuRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", wrapperProps, /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement(SlideMenuSub, {
      id: idState,
      hostName: "SlideMenu",
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
      ptm: ptm,
      cx: cx,
      sx: sx
    }))), backward));
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
SlideMenu.displayName = 'SlideMenu';

export { SlideMenu };
