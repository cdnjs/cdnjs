'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useUpdateEffect, useMatchMedia, useEventListener, useResizeListener, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { classNames, mergeProps, DomHandler, IconUtils, ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primereact/utils';
import { AngleRightIcon } from 'primereact/icons/angleright';
import { Ripple } from 'primereact/ripple';

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

var styles = "\n@layer primereact {\n    .p-contextmenu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    .p-contextmenu .p-submenu-list {\n        position: absolute;\n        min-width: 100%;\n        z-index: 1;\n    }\n    \n    .p-contextmenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-contextmenu .p-menuitem-text {\n        line-height: 1;\n    }\n    \n    .p-contextmenu .p-menuitem {\n        position: relative;\n    }\n    \n    .p-contextmenu .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n    \n    .p-contextmenu-enter {\n        opacity: 0;\n    }\n    \n    .p-contextmenu-enter-active {\n        opacity: 1;\n        transition: opacity 250ms;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var context = _ref.context;
    return classNames('p-contextmenu p-component', {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  menu: function menu(_ref2) {
    var props = _ref2.menuProps;
    return classNames({
      'p-submenu-list': !props.root
    });
  },
  menuitem: function menuitem(_ref3) {
    var item = _ref3.item,
      active = _ref3.active;
    return classNames('p-menuitem', {
      'p-menuitem-active': active
    }, item.className);
  },
  action: function action(_ref4) {
    var item = _ref4.item;
    return classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  icon: 'p-menuitem-icon',
  submenuIcon: 'p-submenu-icon',
  label: 'p-menuitem-text',
  separator: 'p-menu-separator',
  transition: 'p-contextmenu',
  submenuTransition: 'p-contextmenusub'
};
var ContextMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ContextMenu',
    id: null,
    model: null,
    style: null,
    className: null,
    global: false,
    autoZIndex: true,
    baseZIndex: 0,
    breakpoint: undefined,
    scrollHeight: '400px',
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    submenuIcon: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

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

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ContextMenuSub = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var submenuRef = React.useRef(null);
  var active = props.root || !props.resetMenu;
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(item, key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        active: activeItemState === item
      }
    });
  };
  if (props.resetMenu === true && activeItemState !== null) {
    setActiveItemState(null);
  }
  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (item.disabled || props.isMobileMode) {
      event.preventDefault();
      return;
    }
    setActiveItemState(item);
  };
  var onItemClick = function onItemClick(event, item) {
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
    if (props.isMobileMode && item.items) {
      if (activeItemState && item === activeItemState) setActiveItemState(null);else setActiveItemState(item);
    }
    if (!item.items) {
      props.onLeafClick(event);
    }
  };
  var position = function position() {
    if (!props.isMobileMode) {
      var parentItem = submenuRef.current.parentElement;
      var containerOffset = DomHandler.getOffset(parentItem);
      var viewport = DomHandler.getViewport();
      var sublistWidth = submenuRef.current.offsetParent ? submenuRef.current.offsetWidth : DomHandler.getHiddenElementOuterWidth(submenuRef.current);
      var itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);
      var top = parseInt(containerOffset.top, 10) + submenuRef.current.offsetHeight - DomHandler.getWindowScrollTop();
      if (top > viewport.height) {
        submenuRef.current.style.top = viewport.height - top + 'px';
      } else {
        submenuRef.current.style.top = '0px';
      }
      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
        submenuRef.current.style.left = -1 * sublistWidth + 'px';
      } else {
        submenuRef.current.style.left = itemOuterWidth + 'px';
      }
    }
  };
  var onEnter = function onEnter() {
    position();
  };
  useUpdateEffect(function () {
    active && position();
  });
  var createSeparator = function createSeparator(index) {
    var key = props.id + '_separator_' + index;
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
    if (item.items) {
      return /*#__PURE__*/React.createElement(ContextMenuSub, {
        id: props.id + '_' + index,
        hostName: props.hostName,
        menuProps: props.menuProps,
        model: item.items,
        resetMenu: item !== activeItemState,
        onLeafClick: props.onLeafClick,
        isMobileMode: props.isMobileMode,
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        cx: cx
      });
    }
    return null;
  };
  var createMenuItem = function createMenuItem(item, index) {
    var _mergeProps;
    if (item.visible === false) {
      return null;
    }
    var active = activeItemState === item;
    var key = item.id || props.id + '_' + index;
    var iconProps = mergeProps({
      className: cx('icon')
    }, getPTOptions(item, 'icon'));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
      props: props.menuProps
    });
    var submenuIconProps = mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(item, 'submenuIcon'));
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(item, 'label'));
    var submenuIcon = item.items && IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps), _objectSpread({}, submenuIconProps), {
      props: props.menuProps
    });
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var submenu = createSubmenu(item, index);
    var actionProps = mergeProps({
      href: item.url || '#',
      className: cx('action', {
        item: item
      }),
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      role: 'menuitem',
      'aria-haspopup': item.items != null,
      'aria-disabled': item.disabled
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null));
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        className: 'p-menuitem-link',
        labelClassName: 'p-menuitem-text',
        iconClassName: 'p-menuitem-icon',
        submenuIconClassName: cx('submenuIcon'),
        element: content,
        props: props,
        active: active
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps((_mergeProps = {
      id: key,
      key: key,
      role: 'none',
      className: cx('menuitem', {
        item: item,
        active: active
      }),
      style: item.style
    }, _defineProperty(_mergeProps, "key", key), _defineProperty(_mergeProps, "onMouseEnter", function onMouseEnter(event) {
      return onItemMouseEnter(event, item);
    }), _mergeProps), getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content, submenu);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : createMenuItem(item, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var submenu = createMenu();
  var menuProps = mergeProps({
    className: cx('menu', {
      menuProps: props
    })
  }, ptm('menu', {
    hostName: props.hostName
  }));
  var transitionProps = mergeProps({
    classNames: cx('submenuTransition'),
    "in": active,
    timeout: {
      enter: 0,
      exit: 0
    },
    unmountOnExit: true,
    onEnter: onEnter
  }, ptm('menu.transition', {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React.createElement(CSSTransition, _extends({
    nodeRef: submenuRef
  }, transitionProps), /*#__PURE__*/React.createElement("ul", _extends({
    ref: submenuRef
  }, menuProps), submenu));
});
ContextMenuSub.displayName = 'ContextMenuSub';

var ContextMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ContextMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    reshowState = _React$useState6[0],
    setReshowState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    resetMenuState = _React$useState8[0],
    setResetMenuState = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    attributeSelectorState = _React$useState10[0],
    setAttributeSelectorState = _React$useState10[1];
  var _ContextMenuBase$setM = ContextMenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        visible: visibleState,
        reshow: reshowState,
        resetMenu: resetMenuState,
        attributeSelector: attributeSelectorState
      }
    }),
    ptm = _ContextMenuBase$setM.ptm,
    cx = _ContextMenuBase$setM.cx,
    isUnstyled = _ContextMenuBase$setM.isUnstyled;
  useHandleStyle(ContextMenuBase.css.styles, isUnstyled, {
    name: 'contextmenu'
  });
  var menuRef = React.useRef(null);
  var currentEvent = React.useRef(null);
  var styleElementRef = React.useRef(null);
  var isMobileMode = useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (isOutsideClicked(event) && event.button !== 2) {
          hide(event);
          setResetMenuState(true);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'contextmenu',
      when: props.global,
      listener: function listener(event) {
        show(event);
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 1),
    bindDocumentContextMenuListener = _useEventListener4[0];
  var _useResizeListener = useResizeListener({
      listener: function listener(event) {
        if (visibleState && !DomHandler.isTouchDevice()) {
          hide(event);
        }
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
    bindDocumentResizeListener = _useResizeListener2[0],
    unbindDocumentResizeListener = _useResizeListener2[1];
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var selector = "".concat(attributeSelectorState);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-contextmenu[").concat(selector, "] > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-submenu-list {\n        position: relative;\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-menuitem-active > .p-submenu-list {\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-submenu-icon:before {\n        content: \"\\e930\";\n    }\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = DomHandler.removeInlineStyle(styleElementRef.current);
  };
  var onMenuClick = function onMenuClick() {
    setResetMenuState(false);
  };
  var onMenuMouseEnter = function onMenuMouseEnter() {
    setResetMenuState(false);
  };
  var show = function show(event) {
    event.stopPropagation();
    event.preventDefault();
    currentEvent.current = event;
    if (visibleState) {
      setReshowState(true);
    } else {
      setVisibleState(true);
      props.onShow && props.onShow(currentEvent.current);
    }
  };
  var hide = function hide(event) {
    currentEvent.current = event;
    setVisibleState(false);
    setReshowState(false);
    props.onHide && props.onHide(currentEvent.current);
  };
  var onEnter = function onEnter() {
    DomHandler.addStyles(menuRef.current, {
      position: 'absolute'
    });
    if (props.autoZIndex) {
      ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
    }
    position(currentEvent.current);
    if (attributeSelectorState && props.breakpoint) {
      menuRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
  };
  var onEntered = function onEntered() {
    bindDocumentListeners();
  };
  var onExit = function onExit() {
    unbindDocumentListeners();
    ZIndexUtils.clear(menuRef.current);
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(menuRef.current);
    destroyStyle();
  };
  var position = function position(event) {
    if (event) {
      var left = event.pageX + 1;
      var top = event.pageY + 1;
      var width = menuRef.current.offsetParent ? menuRef.current.offsetWidth : DomHandler.getHiddenElementOuterWidth(menuRef.current);
      var height = menuRef.current.offsetParent ? menuRef.current.offsetHeight : DomHandler.getHiddenElementOuterHeight(menuRef.current);
      var viewport = DomHandler.getViewport();

      //flip
      if (left + width - document.body.scrollLeft > viewport.width) {
        left -= width;
      }

      //flip
      if (top + height - document.body.scrollTop > viewport.height) {
        top -= height;
      }

      //fit
      if (left < document.body.scrollLeft) {
        left = document.body.scrollLeft;
      }

      //fit
      if (top < document.body.scrollTop) {
        top = document.body.scrollTop;
      }
      menuRef.current.style.left = left + 'px';
      menuRef.current.style.top = top + 'px';
    }
  };
  var onLeafClick = function onLeafClick(event) {
    setResetMenuState(true);
    hide(event);
    event.stopPropagation();
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return menuRef && menuRef.current && !(menuRef.current.isSameNode(event.target) || menuRef.current.contains(event.target));
  };
  var bindDocumentListeners = function bindDocumentListeners() {
    bindDocumentResizeListener();
    bindDocumentClickListener();
  };
  var unbindDocumentListeners = function unbindDocumentListeners() {
    unbindDocumentResizeListener();
    unbindDocumentClickListener();
  };
  useMountEffect(function () {
    var uniqueId = UniqueComponentId();
    !idState && setIdState(uniqueId);
    if (props.global) {
      bindDocumentContextMenuListener();
    }
    if (props.breakpoint) {
      !attributeSelectorState && setAttributeSelectorState(uniqueId);
    }
  });
  useUpdateEffect(function () {
    props.global && bindDocumentContextMenuListener();
  }, [props.global]);
  useUpdateEffect(function () {
    if (attributeSelectorState && menuRef.current) {
      menuRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  useUpdateEffect(function () {
    if (visibleState) {
      setVisibleState(false);
      setReshowState(false);
      setResetMenuState(true);
    } else if (!reshowState && !visibleState && resetMenuState) {
      show(currentEvent.current);
    }
  }, [reshowState]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(menuRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return menuRef.current;
      }
    };
  });
  var createContextMenu = function createContextMenu() {
    var rootProps = mergeProps({
      id: props.id,
      className: classNames(props.className, cx('root', {
        context: context
      })),
      style: props.style,
      onClick: function onClick(e) {
        return onMenuClick();
      },
      onMouseEnter: function onMouseEnter(e) {
        return onMenuMouseEnter();
      }
    }, ContextMenuBase.getOtherProps(props), ptm('root'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": visibleState,
      timeout: {
        enter: 250,
        exit: 0
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
    }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: menuRef
    }, rootProps), /*#__PURE__*/React.createElement(ContextMenuSub, {
      hostName: "ContextMenu",
      id: idState,
      menuProps: props,
      model: props.model,
      root: true,
      resetMenu: resetMenuState,
      onLeafClick: onLeafClick,
      isMobileMode: isMobileMode,
      submenuIcon: props.submenuIcon,
      ptm: ptm,
      cx: cx
    })));
  };
  var element = createContextMenu();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
ContextMenu.displayName = 'ContextMenu';

export { ContextMenu };
