'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var componentbase = require('primereact/componentbase');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var portal = require('primereact/portal');
var ripple = require('primereact/ripple');
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

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var styles = "\n@layer primereact {\n    .p-menu-overlay {\n        position: absolute;\n        /* Github #3122: Prevent animation flickering  */\n        top: -9999px;\n        left: -9999px;\n    }\n\n    .p-menu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-menu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-menu .p-menuitem-text {\n        line-height: 1;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context;
    return utils.classNames('p-menu p-component', {
      'p-menu-overlay': props.popup,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
  },
  menu: 'p-menu-list p-reset',
  content: function content(_ref2) {
    var item = _ref2.item;
    return utils.classNames('p-menuitem-content', {
      'p-disabled': item.disabled
    });
  },
  action: function action(_ref3) {
    var item = _ref3.item;
    return utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  menuitem: function menuitem(_ref4) {
    var focused = _ref4.focused;
    return utils.classNames('p-menuitem', {
      'p-focus': focused
    });
  },
  submenuHeader: function submenuHeader(_ref5) {
    var submenu = _ref5.submenu;
    return utils.classNames('p-submenu-header', {
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
var MenuBase = componentbase.ComponentBase.extend({
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
var Menu = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = MenuBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(!props.popup),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(-1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedOptionIndex = _React$useState6[0],
    setFocusedOptionIndex = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(-1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectedOptionIndex = _React$useState8[0],
    setSelectedOptionIndex = _React$useState8[1];
  var _React$useState9 = React__namespace.useState(false),
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
  componentbase.useHandleStyle(MenuBase.css.styles, isUnstyled, {
    name: 'menu'
  });
  var menuRef = React__namespace.useRef(null);
  var listRef = React__namespace.useRef(null);
  var targetRef = React__namespace.useRef(null);
  var isCloseOnEscape = !!(visibleState && props.popup && props.closeOnEscape);
  var popupMenuDisplayOrder = hooks.useDisplayOrder('menu', isCloseOnEscape);
  hooks.useGlobalOnEscapeKey({
    callback: function callback(event) {
      hide(event);
    },
    when: isCloseOnEscape && popupMenuDisplayOrder,
    priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.MENU, popupMenuDisplayOrder]
  });
  var _useOverlayListener = hooks.useOverlayListener({
      target: targetRef,
      overlay: menuRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid,
          type = _ref.type;
        if (valid) {
          if (context.hideOverlaysOnDocumentScrolling || type === 'outside') {
            hide(event);
            setFocusedOptionIndex(-1);
          } else if (!utils.DomHandler.isDocument(event.target)) {
            utils.DomHandler.absolutePosition(menuRef.current, targetRef.current, props.popupAlignment);
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
      overlayservice.OverlayService.emit('overlay-click', {
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
    var currentTarget = event.currentTarget,
      relatedTarget = event.relatedTarget;
    if (relatedTarget && currentTarget.contains(relatedTarget)) return;
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
          utils.DomHandler.focus(targetRef.current);
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
      utils.DomHandler.focus(targetRef.current);
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
    changeFocusedOptionIndex(utils.DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    var element = utils.DomHandler.findSingle(menuRef.current, "li[id=\"".concat("".concat(focusedOptionIndex), "\"]"));
    var anchorElement = element && utils.DomHandler.findSingle(element, 'a[data-pc-section="action"]');
    props.popup && utils.DomHandler.focus(targetRef.current);
    anchorElement ? anchorElement.click() : element && element.click();
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    onEnterKey(event);
  };
  var findNextOptionIndex = function findNextOptionIndex(index) {
    var links = utils.DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    var matchedOptionIndex = _toConsumableArray(links).findIndex(function (link) {
      return link.id === index;
    });
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  };
  var findPrevOptionIndex = function findPrevOptionIndex(index) {
    var links = utils.DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    var matchedOptionIndex = _toConsumableArray(links).findIndex(function (link) {
      return link.id === index;
    });
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  };
  var changeFocusedOptionIndex = function changeFocusedOptionIndex(index) {
    var links = utils.DomHandler.find(menuRef.current, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
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
    utils.DomHandler.addStyles(menuRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    utils.ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex.menu || PrimeReact__default["default"].zIndex.menu);
    utils.DomHandler.absolutePosition(menuRef.current, targetRef.current, props.popupAlignment);
    if (props.popup) {
      utils.DomHandler.focus(listRef.current);
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
    utils.ZIndexUtils.clear(menuRef.current);
  };
  hooks.useMountEffect(function () {
    if (!idState) {
      setIdState(utils.UniqueComponentId());
    }
  });
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(menuRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
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
      className: utils.classNames(submenu.className, cx('submenuHeader', {
        submenu: submenu
      })),
      style: sx('submenuHeader', {
        submenu: submenu
      }),
      'data-p-disabled': submenu.disabled
    }, ptm('submenuHeader'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
      key: key
    }, /*#__PURE__*/React__namespace.createElement("li", _extends({}, submenuHeaderProps, {
      key: key
    }), submenu.label), items);
  };
  var createSeparator = function createSeparator(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = idState + '_separator_' + index;
    var separatorProps = mergeProps({
      id: key,
      className: utils.classNames(item.className, cx('separator')),
      role: 'separator'
    }, ptm('separator'));
    return /*#__PURE__*/React__namespace.createElement("li", _extends({}, separatorProps, {
      key: key
    }));
  };
  var createMenuItem = function createMenuItem(item, index) {
    var parentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (item.visible === false) {
      return null;
    }
    var menuContext = {
      item: item,
      index: index,
      parentId: parentId
    };
    var linkClassName = utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var iconProps = mergeProps({
      className: cx('icon')
    }, getMenuItemPTOptions('icon', menuContext));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getMenuItemPTOptions('label', menuContext));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
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
    var content = /*#__PURE__*/React__namespace.createElement("div", contentProps, /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item, key);
        },
        onMouseMove: function onMouseMove(event) {
          return onItemMouseMove(event, key);
        },
        className: linkClassName,
        tabIndex: '-1',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        element: content,
        props: props
      };
      content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      id: key,
      className: utils.classNames(item.className, cx('menuitem', {
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
    return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuitemProps, {
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
        className: utils.classNames(props.className, cx('root', {
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
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: menuRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        id: props.id,
        ref: menuRef
      }, rootProps), /*#__PURE__*/React__namespace.createElement("ul", menuProps, menuitems)));
    }
    return null;
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
Menu.displayName = 'Menu';

exports.Menu = Menu;
