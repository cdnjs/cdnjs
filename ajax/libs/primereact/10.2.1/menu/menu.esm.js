'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useOverlayListener, useMountEffect, useUnmountEffect as useUnmountEffect$1 } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { classNames, DomHandler, ObjectUtils, UniqueComponentId, ZIndexUtils, mergeProps, IconUtils } from 'primereact/utils';

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

var styles = "\n@layer primereact {\n    .p-menu-overlay {\n        position: absolute;\n        /* Github #3122: Prevent animation flickering  */\n        top: -9999px;\n        left: -9999px;\n    }\n    \n    .p-menu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    .p-menu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-menu .p-menuitem-text {\n        line-height: 1;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context;
    return classNames('p-menu p-component', {
      'p-menu-overlay': props.popup,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  menu: 'p-menu-list p-reset',
  action: function action(_ref2) {
    var item = _ref2.item;
    return classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  menuitem: 'p-menuitem',
  submenuHeader: function submenuHeader(_ref3) {
    var submenu = _ref3.submenu;
    return classNames('p-submenu-header', {
      'p-disabled': submenu.disabled
    });
  },
  separator: 'p-menu-separator',
  label: 'p-menuitem-text',
  icon: 'p-menuitem-icon',
  transition: 'p-connected-overlay'
};
var inlineStyles = {
  submenuHeader: function submenuHeader(_ref4) {
    var submenu = _ref4.submenu;
    return submenu.style;
  },
  menuitem: function menuitem(_ref5) {
    var item = _ref5.item;
    return item.style;
  }
};
var MenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Menu',
    id: null,
    model: null,
    popup: false,
    popupAlignment: 'left',
    style: null,
    className: null,
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    children: undefined,
    closeOnEscape: true
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

var usePrevious = function usePrevious(newValue) {
  var ref = React.useRef(undefined);
  React.useEffect(function () {
    ref.current = newValue;
  });
  return ref.current;
};

/* eslint-disable */
var useUnmountEffect = function useUnmountEffect(fn) {
  return React.useEffect(function () {
    return fn;
  }, []);
};
/* eslint-enable */

/* eslint-disable */
var useEventListener = function useEventListener(_ref) {
  var _ref$target = _ref.target,
    target = _ref$target === void 0 ? 'document' : _ref$target,
    type = _ref.type,
    listener = _ref.listener,
    options = _ref.options,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var prevOptions = usePrevious(options);
  var bind = function bind() {
    var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      listenerRef.current = function (event) {
        return listener && listener(event);
      };
      targetRef.current.addEventListener(type, listenerRef.current, options);
    }
  };
  var unbind = function unbind() {
    if (listenerRef.current) {
      targetRef.current.removeEventListener(type, listenerRef.current, options);
      listenerRef.current = null;
    }
  };
  React.useEffect(function () {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function () {
    if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options]);
  useUnmountEffect(function () {
    unbind();
  });
  return [bind, unbind];
};
/* eslint-enable */

var useOnEscapeKey = function useOnEscapeKey(ref, condition, callback) {
  var handleEsc = function handleEsc(event) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      event.stopImmediatePropagation();
      callback(event);
    }
    return;
  };
  var _useEventListener = useEventListener({
      type: 'keydown',
      listener: handleEsc
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindKeyDownListener = _useEventListener2[0],
    unbindKeyDownListener = _useEventListener2[1];
  React.useEffect(function () {
    if (!condition) {
      return;
    }
    if (!ref.current) {
      return;
    }
    bindKeyDownListener();
    return function () {
      unbindKeyDownListener();
    };
  });
  return [ref, callback];
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Menu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = MenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(!props.popup),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _MenuBase$setMetaData = MenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        visible: visibleState
      }
    }),
    ptm = _MenuBase$setMetaData.ptm,
    cx = _MenuBase$setMetaData.cx,
    sx = _MenuBase$setMetaData.sx,
    isUnstyled = _MenuBase$setMetaData.isUnstyled;
  useHandleStyle(MenuBase.css.styles, isUnstyled, {
    name: 'menu'
  });
  var menuRef = React.useRef(null);
  var targetRef = React.useRef(null);
  useOnEscapeKey(targetRef, props.popup && props.closeOnEscape, function (event) {
    hide(event);
  });
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
    if (props.popup) {
      hide(event);
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
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.getAttribute(nextItem, '[data-p-disabled="true"]') || !DomHandler.getAttribute(nextItem, '[data-pc-section="menuitem"]') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.getAttribute(prevItem, '[data-p-disabled="true"]') || !DomHandler.getAttribute(prevItem, '[data-pc-section="menuitem"]') ? findPrevItem(prevItem) : prevItem : null;
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
    DomHandler.addStyles(menuRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
    DomHandler.absolutePosition(menuRef.current, targetRef.current, props.popupAlignment);
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
  };
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  useUnmountEffect$1(function () {
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
      },
      getTarget: function getTarget() {
        return targetRef.current;
      }
    };
  });
  var createSubmenu = function createSubmenu(submenu, index) {
    var key = idState + '_sub_' + index;
    var items = submenu.items.map(createMenuItem);
    var submenuHeaderProps = mergeProps({
      id: key,
      key: key,
      role: 'presentation',
      className: classNames(submenu.className, cx('submenuHeader', {
        submenu: submenu
      })),
      style: sx('submenuHeader', {
        submenu: submenu
      }),
      'data-p-disabled': submenu.disabled
    }, ptm('submenuHeader'));
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: key
    }, /*#__PURE__*/React.createElement("li", submenuHeaderProps, submenu.label), items);
  };
  var createSeparator = function createSeparator(index) {
    var key = idState + '_separator_' + index;
    var separatorProps = mergeProps({
      id: key,
      key: key,
      className: cx('separator'),
      role: 'separator'
    }, ptm('separator'));
    return /*#__PURE__*/React.createElement("li", separatorProps);
  };
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, ptm('label'));
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var tabIndex = item.disabled ? null : 0;
    var key = item.id || idState + '_' + index;
    var actionProps = mergeProps({
      href: item.url || '#',
      className: cx('action', {
        item: item
      }),
      role: 'menuitem',
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      onKeyDown: function onKeyDown(event) {
        return onItemKeyDown(event);
      },
      tabIndex: tabIndex,
      'aria-disabled': item.disabled,
      'data-p-disabled': item.disabled
    }, ptm('action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label);
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event);
        },
        className: linkClassName,
        tabIndex: tabIndex,
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        element: content,
        props: props
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      id: key,
      key: key,
      className: classNames(item.className, cx('menuitem')),
      style: sx('menuitem', {
        item: item
      }),
      role: 'none',
      'data-p-disabled': item.disabled || false
    }, ptm('menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : item.items ? createSubmenu(item, index) : createMenuItem(item, index);
  };
  var createMenu = function createMenu() {
    return props.model.map(createItem);
  };
  var createElement = function createElement() {
    if (props.model) {
      var menuitems = createMenu();
      var rootProps = mergeProps({
        className: classNames(props.className, cx('root', {
          context: context
        })),
        style: props.style,
        onClick: function onClick(e) {
          return onPanelClick(e);
        }
      }, MenuBase.getOtherProps(props), ptm('root'));
      var menuProps = mergeProps({
        className: cx('menu'),
        role: 'menu'
      }, ptm('menu'));
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
      }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
        id: props.id,
        ref: menuRef
      }, rootProps), /*#__PURE__*/React.createElement("ul", menuProps, menuitems)));
    }
    return null;
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
Menu.displayName = 'Menu';

export { Menu };
