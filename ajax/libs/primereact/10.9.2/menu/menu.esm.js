'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useDisplayOrder, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useOverlayListener, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { classNames, UniqueComponentId, ZIndexUtils, DomHandler, IconUtils, ObjectUtils } from 'primereact/utils';

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var styles = "\n@layer primereact {\n    .p-menu-overlay {\n        position: absolute;\n        /* Github #3122: Prevent animation flickering  */\n        top: -9999px;\n        left: -9999px;\n    }\n\n    .p-menu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-menu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-menu .p-menuitem-text {\n        line-height: 1;\n    }\n}\n";
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
  content: function content(_ref2) {
    var item = _ref2.item;
    return classNames('p-menuitem-content', {
      'p-disabled': item.disabled
    });
  },
  action: function action(_ref3) {
    var item = _ref3.item;
    return classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  menuitem: function menuitem(_ref4) {
    var focused = _ref4.focused;
    return classNames('p-menuitem', {
      'p-focus': focused
    });
  },
  submenuHeader: function submenuHeader(_ref5) {
    var submenu = _ref5.submenu;
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
  submenuHeader: function submenuHeader(_ref6) {
    var submenu = _ref6.submenu;
    return submenu.style;
  },
  menuitem: function menuitem(_ref7) {
    var item = _ref7.item;
    return item.style;
  }
};
var MenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Menu',
    id: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    tabIndex: 0,
    model: null,
    popup: false,
    popupAlignment: 'left',
    style: null,
    className: null,
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: null,
    onFocus: null,
    onBlur: null,
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

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Menu = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
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
  var _React$useState5 = React.useState(-1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedOptionIndex = _React$useState6[0],
    setFocusedOptionIndex = _React$useState6[1];
  var _React$useState7 = React.useState(-1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectedOptionIndex = _React$useState8[0],
    setSelectedOptionIndex = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    focused = _React$useState10[0],
    setFocused = _React$useState10[1];
  var _MenuBase$setMetaData = MenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        visible: visibleState,
        focused: focused
      }
    }),
    ptm = _MenuBase$setMetaData.ptm,
    cx = _MenuBase$setMetaData.cx,
    sx = _MenuBase$setMetaData.sx,
    isUnstyled = _MenuBase$setMetaData.isUnstyled;
  var getMenuItemPTOptions = function getMenuItemPTOptions(key, menuContext) {
    return ptm(key, {
      context: menuContext
    });
  };
  useHandleStyle(MenuBase.css.styles, isUnstyled, {
    name: 'menu'
  });
  var menuRef = React.useRef(null);
  var listRef = React.useRef(null);
  var targetRef = React.useRef(null);
  var isCloseOnEscape = !!(visibleState && props.popup && props.closeOnEscape);
  var popupMenuDisplayOrder = useDisplayOrder('menu', isCloseOnEscape);
  useGlobalOnEscapeKey({
    callback: function callback(event) {
      hide(event);
    },
    when: isCloseOnEscape && popupMenuDisplayOrder,
    priority: [ESC_KEY_HANDLING_PRIORITIES.MENU, popupMenuDisplayOrder]
  });
  var _useOverlayListener = useOverlayListener({
      target: targetRef,
      overlay: menuRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid;
        if (valid) {
          hide(event);
          setFocusedOptionIndex(-1);
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
  var onItemClick = function onItemClick(event, item, key) {
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
    if (props.popup) {
      hide(event);
    }
    if (!props.popup && focusedOptionIndex !== key) {
      setFocusedOptionIndex(key);
    }
    if (!item.url) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var onItemMouseMove = function onItemMouseMove(event, key) {
    if (event && props.popup && focusedOptionIndex !== key) {
      setFocusedOptionIndex(key);
    }
  };
  var onListFocus = function onListFocus(event) {
    setFocused(true);
    if (!props.popup) {
      if (selectedOptionIndex !== -1) {
        changeFocusedOptionIndex(selectedOptionIndex);
        setSelectedOptionIndex(-1);
      } else {
        changeFocusedOptionIndex(0);
      }
    }
    props.onFocus && props.onFocus(event);
  };
  var onListBlur = function onListBlur(event) {
    setFocused(false);
    setFocusedOptionIndex(-1);
    props.onBlur && props.onBlur(event);
  };
  var onListKeyDown = function onListKeyDown(event) {
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'ArrowUp':
        onArrowUpKey(event);
        break;
      case 'Home':
        onHomeKey(event);
        break;
      case 'End':
        onEndKey(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
        onEnterKey(event);
        break;
      case 'Space':
        onSpaceKey(event);
        break;
      case 'Escape':
        if (props.popup) {
          DomHandler.focus(targetRef.current);
          hide(event);
        }
      case 'Tab':
        props.popup && visibleState && hide(event);
        break;
    }
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    var optionIndex = findNextOptionIndex(focusedOptionIndex);
    changeFocusedOptionIndex(optionIndex);
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    if (event.altKey && props.popup) {
      DomHandler.focus(targetRef.current);
      hide(event);
      event.preventDefault();
    } else {
      var optionIndex = findPrevOptionIndex(focusedOptionIndex);
      changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    }
  };
  var onHomeKey = function onHomeKey(event) {
    changeFocusedOptionIndex(0);
    event.preventDefault();
  };
  var onEndKey = function onEndKey(event) {
    changeFocusedOptionIndex(DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    var element = DomHandler.findSingle(menuRef.current, "li[id=\"".concat("".concat(focusedOptionIndex), "\"]"));
    var anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
    props.popup && DomHandler.focus(targetRef.current);
    anchorElement ? anchorElement.click() : element && element.click();
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    onEnterKey(event);
  };
  var findNextOptionIndex = function findNextOptionIndex(index) {
    var links = DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    var matchedOptionIndex = _toConsumableArray(links).findIndex(function (link) {
      return link.id === index;
    });
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  };
  var findPrevOptionIndex = function findPrevOptionIndex(index) {
    var links = DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    var matchedOptionIndex = _toConsumableArray(links).findIndex(function (link) {
      return link.id === index;
    });
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  };
  var changeFocusedOptionIndex = function changeFocusedOptionIndex(index) {
    var links = DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    var order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
    order > -1 && setFocusedOptionIndex(links[order].getAttribute('id'));
  };
  var focusedOptionId = function focusedOptionId() {
    return focusedOptionIndex !== -1 ? focusedOptionIndex : null;
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
    ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex.menu || PrimeReact.zIndex.menu);
    DomHandler.absolutePosition(menuRef.current, targetRef.current, props.popupAlignment);
    if (props.popup) {
      DomHandler.focus(listRef.current);
      changeFocusedOptionIndex(0);
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
  };
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
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
      },
      getTarget: function getTarget() {
        return targetRef.current;
      }
    };
  });
  var createSubmenu = function createSubmenu(submenu, index) {
    var key = idState + '_sub_' + index;
    var items = submenu.items.map(function (item, index) {
      return createMenuItem(item, index, key);
    });
    var submenuHeaderProps = mergeProps({
      id: key,
      role: 'none',
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
    }, /*#__PURE__*/React.createElement("li", _extends({}, submenuHeaderProps, {
      key: key
    }), submenu.label), items);
  };
  var createSeparator = function createSeparator(item, index) {
    var key = idState + '_separator_' + index;
    var separatorProps = mergeProps({
      id: key,
      className: classNames(item.className, cx('separator')),
      role: 'separator'
    }, ptm('separator'));
    return /*#__PURE__*/React.createElement("li", _extends({}, separatorProps, {
      key: key
    }));
  };
  var createMenuItem = function createMenuItem(item, index) {
    var parentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var menuContext = {
      item: item,
      index: index,
      parentId: parentId
    };
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var iconProps = mergeProps({
      className: cx('icon')
    }, getMenuItemPTOptions('icon', menuContext));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getMenuItemPTOptions('label', menuContext));
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var key = item.id || (parentId || idState) + '_' + index;
    var contentProps = mergeProps({
      onClick: function onClick(event) {
        return onItemClick(event, item, key);
      },
      onMouseMove: function onMouseMove(event) {
        return onItemMouseMove(event, key);
      },
      className: cx('content', {
        item: item
      })
    }, getMenuItemPTOptions('content', menuContext));
    var actionProps = mergeProps({
      href: item.url || '#',
      className: cx('action', {
        item: item
      }),
      onFocus: function onFocus(event) {
        return event.stopPropagation();
      },
      target: item.target,
      tabIndex: '-1',
      'aria-label': item.label,
      'aria-disabled': item.disabled,
      'data-p-disabled': item.disabled
    }, getMenuItemPTOptions('action', menuContext));
    var content = /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement("a", actionProps, icon, label, /*#__PURE__*/React.createElement(Ripple, null)));
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item, key);
        },
        className: linkClassName,
        tabIndex: '-1',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        element: content,
        props: props
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      id: key,
      className: classNames(item.className, cx('menuitem', {
        focused: focusedOptionIndex === key
      })),
      style: sx('menuitem', {
        item: item
      }),
      role: 'menuitem',
      'aria-label': item.label,
      'aria-disabled': item.disabled,
      'data-p-focused': focusedOptionId() === key,
      'data-p-disabled': item.disabled || false
    }, getMenuItemPTOptions('menuitem', menuContext));
    return /*#__PURE__*/React.createElement("li", _extends({}, menuitemProps, {
      key: key
    }), content);
  };
  var createItem = function createItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    return item.separator ? createSeparator(item, index) : item.items ? createSubmenu(item, index) : createMenuItem(item, index);
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
        ref: listRef,
        className: cx('menu'),
        id: idState + '_list',
        tabIndex: props.tabIndex || '0',
        role: 'menu',
        'aria-label': props.ariaLabel,
        'aria-labelledby': props.ariaLabelledBy,
        'aria-activedescendant': focused ? focusedOptionId() : undefined,
        onFocus: onListFocus,
        onKeyDown: onListKeyDown,
        onBlur: onListBlur
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
