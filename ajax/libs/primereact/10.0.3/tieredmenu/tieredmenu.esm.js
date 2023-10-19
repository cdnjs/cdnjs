'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useEventListener, useResizeListener, useMountEffect, useUpdateEffect, useMatchMedia, useOverlayListener, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
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

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context;
    return classNames('p-tieredmenu p-component', {
      'p-tieredmenu-overlay': props.popup,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    }, props.className);
  },
  separator: 'p-menu-separator',
  icon: function icon(_ref2) {
    var _icon = _ref2._icon;
    return classNames('p-menuitem-icon', _icon);
  },
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  action: function action(_ref3) {
    var disabled = _ref3.disabled;
    return classNames('p-menuitem-link', {
      'p-disabled': disabled
    });
  },
  menuitem: function menuitem(_ref4) {
    var _className = _ref4._className,
      active = _ref4.active;
    return classNames('p-menuitem', {
      'p-menuitem-active': active
    }, _className);
  },
  menu: function menu(_ref5) {
    var props = _ref5.subProps;
    return classNames({
      'p-submenu-list': !props.root
    });
  },
  submenu: function submenu(_ref6) {
    var props = _ref6.subProps;
    return classNames({
      'p-submenu-list': !props.root
    });
  },
  transition: 'p-connected-overlay'
};
var inlineStyles = {
  submenu: function submenu(_ref7) {
    var props = _ref7.subProps;
    return {
      display: !props.root && props.parentActive ? 'block' : 'none'
    };
  }
};
var styles = "\n@layer primereact {\n    .p-tieredmenu-overlay {\n        position: absolute;\n    }\n    \n    .p-tieredmenu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    .p-tieredmenu .p-submenu-list {\n        position: absolute;\n        min-width: 100%;\n        z-index: 1;\n        display: none;\n    }\n    \n    .p-tieredmenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-tieredmenu .p-menuitem-text {\n        line-height: 1;\n    }\n    \n    .p-tieredmenu .p-menuitem {\n        position: relative;\n    }\n    \n    .p-tieredmenu .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n    \n    .p-tieredmenu .p-menuitem-active > .p-submenu-list {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n    \n    .p-tieredmenu .p-menuitem-active > .p-submenu-list-flipped {\n        left: -100%;\n    }\n}\n";
var TieredMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TieredMenu',
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
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
    styles: styles,
    inlineStyles: inlineStyles
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
var TieredMenuSub = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var elementRef = React.useRef(null);
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
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (!props.isMobileMode && elementRef.current && !elementRef.current.contains(event.target)) {
          setActiveItemState(null);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindDocumentClickListener = _useEventListener2[0];
  var _useResizeListener = useResizeListener({
      listener: function listener() {
        !props.isMobileMode && setActiveItemState(null);
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
    bindDocumentResizeListener = _useResizeListener2[0];
  var position = function position() {
    if (elementRef.current) {
      var parentItem = elementRef.current.parentElement;
      var containerOffset = DomHandler.getOffset(parentItem);
      var viewport = DomHandler.getViewport();
      var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : DomHandler.getHiddenElementOuterWidth(elementRef.current);
      var itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);
      var top = parseInt(containerOffset.top, 10) + elementRef.current.offsetHeight - DomHandler.getWindowScrollTop();
      if (top > viewport.height) {
        elementRef.current.style.top = viewport.height - top + 'px';
      } else {
        elementRef.current.style.top = '0px';
      }
      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
        DomHandler.addClass(elementRef.current, 'p-submenu-list-flipped');
      }
    }
  };
  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (item.disabled || props.isMobileMode) {
      event.preventDefault();
      return;
    }
    if (props.root) {
      if (activeItemState || props.popup) {
        setActiveItemState(item);
      }
    } else {
      setActiveItemState(item);
    }
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
    if (props.root || props.isMobileMode) {
      if (item.items) {
        if (activeItemState && item === activeItemState) setActiveItemState(null);else setActiveItemState(item);
      }
    }
    if (!item.items) {
      onLeafClick(event);
    }
  };
  var onItemKeyDown = function onItemKeyDown(event, item) {
    var listItem = event.currentTarget.parentElement;
    switch (event.which) {
      //down
      case 40:
        var nextItem = findNextItem(listItem);
        nextItem && nextItem.children[0].focus();
        event.preventDefault();
        break;

      //up
      case 38:
        var prevItem = findPrevItem(listItem);
        prevItem && prevItem.children[0].focus();
        event.preventDefault();
        break;

      //right
      case 39:
        if (item.items) {
          setActiveItemState(item);
          setTimeout(function () {
            listItem.children[1].children[0].children[0].focus();
          }, 50);
        }
        event.preventDefault();
        break;
    }
    props.onKeyDown && props.onKeyDown(event, listItem);
  };
  var onChildItemKeyDown = function onChildItemKeyDown(event, childListItem) {
    //left
    if (event.which === 37) {
      setActiveItemState(null);
      childListItem.parentElement.previousElementSibling.focus();
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onLeafClick = function onLeafClick(event) {
    if (!props.isMobileMode || props.popup) {
      setActiveItemState(null);
      props.onLeafClick && props.onLeafClick(event);
      props.onHide && props.onHide(event);
    }
  };
  useMountEffect(function () {
    bindDocumentClickListener();
    bindDocumentResizeListener();
  });
  useUpdateEffect(function () {
    if (!props.parentActive) {
      setActiveItemState(null);
    }
    if (!props.root && props.parentActive && !props.isMobileMode) {
      position();
    }
  }, [props.parentActive]);
  useUpdateEffect(function () {
    props.onItemToggle && props.onItemToggle();
  }, [activeItemState]);
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = mergeProps({
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
      return /*#__PURE__*/React.createElement(TieredMenuSub, {
        id: props.id + '_' + index,
        menuProps: props.menuProps,
        model: item.items,
        onLeafClick: onLeafClick,
        popup: props.popup,
        onKeyDown: onChildItemKeyDown,
        parentActive: item === activeItemState,
        isMobileMode: props.isMobileMode,
        onItemToggle: props.onItemToggle,
        submenuIcon: props.submenuIcon,
        ptm: props.ptm,
        cx: cx,
        sx: sx
      });
    }
    return null;
  };
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var id = item.id,
      _className = item.className,
      style = item.style,
      disabled = item.disabled,
      _icon = item.icon,
      _label = item.label,
      items = item.items,
      target = item.target,
      url = item.url,
      template = item.template;
    var key = id || props.id + '_' + index;
    var active = activeItemState === item;
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': disabled
    });
    var iconClassName = classNames('p-menuitem-icon', _icon);
    var iconProps = mergeProps({
      className: cx('icon', {
        _icon: _icon
      })
    }, getPTOptions(item, 'icon'));
    var icon = IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(item, 'label'));
    var label = _label && /*#__PURE__*/React.createElement("span", labelProps, _label);
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(item, 'submenuIcon'));
    var submenuIcon = item.items && IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps), _objectSpread({}, submenuIconProps), {
      props: props.menuProps
    });
    var submenu = createSubmenu(item, index);
    var actionProps = mergeProps({
      href: url || '#',
      className: cx('action', {
        disabled: disabled
      }),
      target: target,
      role: 'menuitem',
      'aria-haspopup': items != null,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      onKeyDown: function onKeyDown(event) {
        return onItemKeyDown(event, item);
      },
      'aria-disabled': disabled
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event, item);
        },
        className: linkClassName,
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: submenuIconClassName,
        element: content,
        props: props,
        active: active,
        disabled: disabled
      };
      content = ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      key: key,
      id: key,
      className: cx('menuitem', {
        _className: _className,
        active: active
      }),
      style: style,
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, item);
      },
      role: 'none'
    }, getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content, submenu);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : createMenuItem(item, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var submenu = createMenu();
  var ptKey = props.root ? 'menu' : 'submenu';
  var menuProps = mergeProps({
    ref: elementRef,
    className: cx(ptKey, {
      subProps: props
    }),
    style: sx(ptKey, {
      subProps: props
    }),
    role: props.root ? 'menubar' : 'menu',
    'aria-orientation': 'horizontal'
  }, ptm(ptKey, {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React.createElement("ul", menuProps, submenu);
});
TieredMenuSub.displayName = 'TieredMenuSub';

var TieredMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = TieredMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(!props.popup),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    attributeSelectorState = _React$useState6[0],
    setAttributeSelectorState = _React$useState6[1];
  var _TieredMenuBase$setMe = TieredMenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        visible: visibleState,
        attributeSelector: attributeSelectorState
      }
    }),
    ptm = _TieredMenuBase$setMe.ptm,
    cx = _TieredMenuBase$setMe.cx,
    sx = _TieredMenuBase$setMe.sx,
    isUnstyled = _TieredMenuBase$setMe.isUnstyled;
  useHandleStyle(TieredMenuBase.css.styles, isUnstyled, {
    name: 'tieredmenu'
  });
  var menuRef = React.useRef(null);
  var targetRef = React.useRef(null);
  var styleElementRef = React.useRef(null);
  var isMobileMode = useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
  var _useOverlayListener = useOverlayListener({
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
      OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: targetRef.current
      });
    }
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
    if (props.popup) {
      targetRef.current = event.currentTarget;
      setVisibleState(false);
      props.onHide && props.onHide(event);
    }
  };
  var onItemToggle = function onItemToggle() {
    if (props.popup && isMobileMode) {
      DomHandler.absolutePosition(menuRef.current, targetRef.current);
    }
  };
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var selector = "".concat(attributeSelectorState);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-tieredmenu[").concat(selector, "] > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-submenu-list {\n        position: relative;\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-menuitem-active > .p-submenu-list {\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-submenu-icon:before {\n        content: \"\\e930\";\n    }\n\n    ").concat(!props.popup ? ".p-tieredmenu[".concat(selector, "] { width: 100%; }") : '', "\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = DomHandler.removeInlineStyle(styleElementRef.current);
  };
  var onEnter = function onEnter() {
    if (props.autoZIndex) {
      ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
    }
    DomHandler.addStyles(menuRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    DomHandler.absolutePosition(menuRef.current, targetRef.current);
    if (attributeSelectorState && props.breakpoint) {
      menuRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
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
    destroyStyle();
  };
  useMountEffect(function () {
    var uniqueId = UniqueComponentId();
    !idState && setIdState(uniqueId);
    if (props.breakpoint) {
      !attributeSelectorState && setAttributeSelectorState(uniqueId);
    }
  });
  useUpdateEffect(function () {
    if (attributeSelectorState && menuRef.current) {
      menuRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(menuRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return menuRef.current;
      }
    };
  });
  var createElement = function createElement() {
    var rootProps = mergeProps({
      ref: menuRef,
      id: props.id,
      className: cx('root'),
      style: props.style,
      onClick: onPanelClick
    }, TieredMenuBase.getOtherProps(props), ptm('root'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": visibleState,
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
    }, transitionProps), /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(TieredMenuSub, {
      id: idState,
      hostName: "TieredMenu",
      menuProps: props,
      model: props.model,
      root: true,
      popup: props.popup,
      onHide: hide,
      isMobileMode: isMobileMode,
      onItemToggle: onItemToggle,
      submenuIcon: props.submenuIcon,
      ptm: ptm,
      cx: cx,
      sx: sx
    })));
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
TieredMenu.displayName = 'TieredMenu';

export { TieredMenu };
