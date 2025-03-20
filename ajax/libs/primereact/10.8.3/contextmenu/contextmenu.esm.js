'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useUpdateEffect, useMatchMedia, useEventListener, useResizeListener, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { classNames, DomHandler, IconUtils, ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primereact/utils';
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

var styles = "\n@layer primereact {\n    .p-contextmenu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-contextmenu .p-submenu-list {\n        position: absolute;\n        min-width: 100%;\n        z-index: 1;\n    }\n\n    .p-contextmenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-contextmenu .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-contextmenu .p-menuitem {\n        position: relative;\n    }\n\n    .p-contextmenu .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n\n    .p-contextmenu-enter {\n        opacity: 0;\n    }\n\n    .p-contextmenu-enter-active {\n        opacity: 1;\n        transition: opacity 250ms;\n    }\n}\n";
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
      ' p-contextmenu-root-list': props.root,
      'p-submenu-list': !props.root
    });
  },
  menuitem: function menuitem(_ref3) {
    var item = _ref3.item,
      active = _ref3.active,
      focused = _ref3.focused,
      disabled = _ref3.disabled;
    return classNames('p-menuitem', {
      'p-menuitem-active p-highlight': active,
      'p-focus': focused,
      'p-disabled': disabled
    }, item.className);
  },
  action: function action(_ref4) {
    var item = _ref4.item;
    return classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  content: 'p-menuitem-content',
  icon: 'p-menuitem-icon',
  submenuIcon: 'p-submenu-icon',
  label: 'p-menuitem-text',
  separator: 'p-menuitem-separator',
  transition: 'p-contextmenu',
  submenuTransition: 'p-contextmenusub'
};
var ContextMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ContextMenu',
    id: null,
    ariaLabel: null,
    ariaLabelledby: null,
    model: null,
    style: null,
    className: null,
    global: false,
    autoZIndex: true,
    baseZIndex: 0,
    tabIndex: 0,
    breakpoint: undefined,
    scrollHeight: '400px',
    appendTo: null,
    transitionOptions: null,
    onFocus: null,
    onBlur: null,
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

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ContextMenuSub = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
  var submenuRef = React.useRef(null);
  var active = props.root || !props.resetMenu;
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(processedItem, key, index) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        active: isItemActive(processedItem),
        focused: isItemFocused(processedItem),
        disabled: isItemDisabled(processedItem),
        index: index
      }
    });
  };
  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (item.disabled || props.isMobileMode) {
      event.preventDefault();
      return;
    }
    props.onItemMouseEnter({
      originalEvent: event,
      processedItem: item
    });
  };
  var onItemClick = function onItemClick(event, processedItem) {
    var item = processedItem.item;
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
    props.onItemClick({
      originalEvent: event,
      processedItem: processedItem,
      isFocus: true
    });
    if (!item.items) {
      props.onLeafClick(event);
    }
    if (!item.url) {
      event.preventDefault();
      event.stopPropagation();
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
  var getItemId = function getItemId(processedItem) {
    return "".concat(props.menuId, "_").concat(processedItem.key);
  };
  var getItemProp = function getItemProp(processedItem, name, params) {
    return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
  };
  var isItemActive = function isItemActive(processedItem) {
    return props.activeItemPath && props.activeItemPath.some(function (path) {
      return path.key === processedItem.key;
    });
  };
  var isItemVisible = function isItemVisible(processedItem) {
    return getItemProp(processedItem, 'visible') !== false;
  };
  var isItemDisabled = function isItemDisabled(processedItem) {
    return getItemProp(processedItem, 'disabled');
  };
  var isItemFocused = function isItemFocused(processedItem) {
    return props.focusedItemId === getItemId(processedItem);
  };
  var isItemGroup = function isItemGroup(processedItem) {
    return ObjectUtils.isNotEmpty(processedItem.items);
  };
  var getAriaSetSize = function getAriaSetSize() {
    return props.model.filter(function (processedItem) {
      return isItemVisible(processedItem) && !getItemProp(processedItem, 'separator');
    }).length;
  };
  var getAriaPosInset = function getAriaPosInset(index) {
    return index - props.model.slice(0, index).filter(function (processedItem) {
      return isItemVisible(processedItem) && getItemProp(processedItem, 'separator');
    }).length + 1;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return submenuRef.current;
      }
    };
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
    if (isItemGroup(item)) {
      return /*#__PURE__*/React.createElement(ContextMenuSub, {
        id: props.id + '_' + index,
        role: "menu",
        menuId: props.menuId,
        focusedItemId: props.focusedItemId,
        activeItemPath: props.activeItemPath,
        level: props.level + 1,
        hostName: props.hostName,
        ariaLabelledby: getItemId(item),
        menuProps: props.menuProps,
        model: item.items,
        resetMenu: !isItemActive(item),
        onLeafClick: props.onLeafClick,
        onItemClick: props.onItemClick,
        onItemMouseEnter: props.onItemMouseEnter,
        isMobileMode: props.isMobileMode,
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        cx: cx
      });
    }
    return null;
  };
  var createMenuItem = function createMenuItem(processedItem, index) {
    if (!isItemVisible(processedItem)) {
      return null;
    }
    var item = processedItem.item;
    var active = isItemActive(processedItem);
    var disabled = isItemDisabled(processedItem);
    var focused = isItemFocused(processedItem);
    var isGroup = isItemGroup(processedItem);
    var key = getItemId(processedItem);
    var iconProps = mergeProps({
      className: cx('icon')
    }, getPTOptions(processedItem, 'icon', index));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var submenuIconProps = mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(processedItem, 'submenuIcon', index));
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(processedItem, 'label', index));
    var items = getItemProp(processedItem, 'items');
    var submenuIcon = items && IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: props.menuProps
    });
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var submenu = createSubmenu(processedItem, index);
    var actionProps = mergeProps({
      href: item.url || '#',
      'aria-hidden': true,
      tabIndex: -1,
      className: cx('action', {
        item: item
      }),
      target: item.target
    }, getPTOptions(processedItem, 'action', index));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null));
    if (item.template) {
      var defaultContentOptions = {
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
    var contentProps = mergeProps({
      onClick: function onClick(event) {
        return onItemClick(event, processedItem);
      },
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, processedItem);
      },
      className: cx('content')
    }, getPTOptions(processedItem, 'content', index));
    var menuitemProps = mergeProps(_defineProperty({
      id: key,
      key: key,
      role: 'menuitem',
      'aria-label': item.label,
      'aria-disabled': disabled,
      'aria-expanded': isGroup ? active : undefined,
      'aria-haspopup': isGroup && !item.url ? 'menu' : undefined,
      'aria-level': props.level + 1,
      'aria-setsize': getAriaSetSize(),
      'aria-posinset': getAriaPosInset(index),
      'data-p-highlight': active,
      'data-p-focused': focused,
      'data-p-disabled': disabled,
      className: cx('menuitem', {
        item: item,
        active: active,
        focused: focused,
        disabled: isItemDisabled(item)
      }),
      style: item.style
    }, "key", key), getPTOptions(processedItem, 'menuitem', index));
    return /*#__PURE__*/React.createElement("li", menuitemProps, /*#__PURE__*/React.createElement("div", contentProps, content), submenu);
  };
  var createItem = function createItem(processedItem, index) {
    return processedItem.separator ? createSeparator(index) : createMenuItem(processedItem, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var submenu = createMenu();
  var menuProps = mergeProps({
    className: cx('menu', {
      menuProps: props
    }),
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onKeyDown: props.onKeyDown,
    'aria-label': props.ariaLabel,
    'aria-labelledby': props.ariaLabelledby,
    'aria-orientation': 'vertical',
    'aria-activedescendant': props.ariaActivedescendant,
    tabIndex: props.tabIndex,
    role: props.role
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
}));
ContextMenuSub.displayName = 'ContextMenuSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ContextMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
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
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    focused = _React$useState12[0],
    setFocused = _React$useState12[1];
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    focusTrigger = _React$useState14[0],
    setFocusTrigger = _React$useState14[1];
  var _React$useState15 = React.useState({
      index: -1,
      level: 0,
      parentKey: ''
    }),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    focusedItemInfo = _React$useState16[0],
    setFocusedItemInfo = _React$useState16[1];
  var _React$useState17 = React.useState(''),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    activeItemPath = _React$useState18[0],
    setActiveItemPath = _React$useState18[1];
  var _React$useState19 = React.useState([]),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    processedItems = _React$useState20[0],
    setProcessedItems = _React$useState20[1];
  var _React$useState21 = React.useState([]),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    visibleItems = _React$useState22[0],
    setVisibleItems = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    focusedItemId = _React$useState24[0],
    setFocusedItemId = _React$useState24[1];
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
  var listRef = React.useRef(null);
  var currentEvent = React.useRef(null);
  var searchValue = React.useRef('');
  var searchTimeout = React.useRef(null);
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
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce, context && context.styleContainer);
      var selector = "".concat(attributeSelectorState);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-contextmenu[").concat(selector, "] > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-submenu-list {\n        position: relative;\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-menuitem-active > .p-submenu-list {\n        left: 0;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-submenu-icon:before {\n        content: \"\\e930\";\n    }\n}\n");
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
    setActiveItemPath([]);
    setFocusedItemInfo({
      index: -1,
      level: 0,
      parentKey: ''
    });
    event.stopPropagation();
    event.preventDefault();
    currentEvent.current = event;
    if (visibleState) {
      setReshowState(true);
    } else {
      setVisibleState(true);
      props.onShow && props.onShow(currentEvent.current);
    }
    Promise.resolve().then(function () {
      listRef.current && DomHandler.focus(listRef.current.getElement());
    });
  };
  var hide = function hide(event) {
    currentEvent.current = event;
    setVisibleState(false);
    setReshowState(false);
    setActiveItemPath([]);
    setFocusedItemInfo({
      index: -1,
      level: 0,
      parentKey: ''
    });
    props.onHide && props.onHide(currentEvent.current);
  };
  var onEnter = function onEnter() {
    DomHandler.addStyles(menuRef.current, {
      position: 'absolute'
    });
    if (props.autoZIndex) {
      ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex.menu || PrimeReact.zIndex.menu);
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
        left = left - width;
      }

      //flip
      if (top + height - document.body.scrollTop > viewport.height) {
        top = top - height;
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
  var createProcessedItems = React.useCallback(function (items, level) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var processedItems = [];
    items && items.forEach(function (item, index) {
      var key = (parentKey !== '' ? parentKey + '_' : '') + index;
      var newItem = {
        item: item,
        index: index,
        level: level,
        separator: item.separator,
        key: key,
        parent: parent,
        parentKey: parentKey
      };
      newItem.items = createProcessedItems(item.items, level + 1, newItem, key);
      processedItems.push(newItem);
    });
    return processedItems;
  }, []);
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
  React.useEffect(function () {
    var itemsToProcess = props.model || [];
    var processed = createProcessedItems(itemsToProcess, 0, null, '');
    setProcessedItems(processed);
  }, [props.model, createProcessedItems]);
  useUpdateEffect(function () {
    var _focusedItemId = focusedItemInfo.index !== -1 ? "".concat(idState).concat(ObjectUtils.isNotEmpty(focusedItemInfo.parentKey) ? '_' + focusedItemInfo.parentKey : '', "_").concat(focusedItemInfo.index) : null;
    setFocusedItemId(_focusedItemId);
  }, [focusedItemInfo]);
  useUpdateEffect(function () {
    var processedItem = activeItemPath && activeItemPath.find(function (p) {
      return p.key === focusedItemInfo.parentKey;
    });
    var _visibleItems = processedItem ? processedItem.items : processedItems;
    setVisibleItems(_visibleItems);
  }, [activeItemPath, focusedItemInfo]);
  useUpdateEffect(function () {
    if (focusTrigger) {
      var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
      setActiveItemPath(activeItemPath.filter(function (p) {
        return p.parentKey !== focusedItemInfo.parentKey;
      }));
      setFocusTrigger(false);
    }
  }, [focusTrigger]);
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
  var onFocus = function onFocus(event) {
    setFocused(true);
    setFocusedItemInfo(focusedItemInfo.index !== -1 ? focusedItemInfo : {
      index: -1,
      level: 0,
      parentKey: ''
    });
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocused(false);
    setFocusedItemInfo({
      index: -1,
      level: 0,
      parentKey: ''
    });
    searchValue.current = '';
    searchValue.current = '';
    props.onBlur && props.onBlur(event);
  };
  var onKeyDown = function onKeyDown(event) {
    var metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'ArrowUp':
        onArrowUpKey(event);
        break;
      case 'ArrowLeft':
        onArrowLeftKey(event);
        break;
      case 'ArrowRight':
        onArrowRightKey(event);
        break;
      case 'Home':
        onHomeKey(event);
        break;
      case 'End':
        onEndKey(event);
        break;
      case 'Space':
        onSpaceKey(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
        onEnterKey(event);
        break;
      case 'Escape':
        onEscapeKey(event);
        break;
      case 'Tab':
        onTabKey(event);
        break;
      case 'PageDown':
      case 'PageUp':
      case 'Backspace':
      case 'ShiftLeft':
      case 'ShiftRight':
        // NOOP
        break;
      default:
        if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
          searchItems(event, event.key);
        }
        break;
    }
  };
  var onItemChange = function onItemChange(event) {
    var processedItem = event.processedItem,
      isFocus = event.isFocus,
      _event$updateState = event.updateState,
      updateState = _event$updateState === void 0 ? true : _event$updateState;
    if (ObjectUtils.isEmpty(processedItem)) {
      return;
    }
    var index = processedItem.index,
      key = processedItem.key,
      level = processedItem.level,
      parentKey = processedItem.parentKey,
      items = processedItem.items;
    var grouped = ObjectUtils.isNotEmpty(items);
    var _activeItemPath = activeItemPath.filter(function (p) {
      return p.parentKey !== parentKey && p.parentKey !== key;
    });
    if (grouped && updateState) {
      _activeItemPath.push(processedItem);
      setVisibleState(true);
    }
    setFocusedItemInfo({
      index: index,
      level: level,
      parentKey: parentKey
    });
    setActiveItemPath(_activeItemPath);
    isFocus && DomHandler.focus(listRef.current.getElement());
  };
  var onItemClick = function onItemClick(event) {
    var processedItem = event.processedItem;
    var grouped = isProccessedItemGroup(processedItem);
    var selected = isSelected(processedItem);
    if (selected) {
      var index = processedItem.index,
        key = processedItem.key,
        level = processedItem.level,
        parentKey = processedItem.parentKey;
      setActiveItemPath(activeItemPath.filter(function (p) {
        return key !== p.key && key.startsWith(p.key);
      }));
      setFocusedItemInfo({
        index: index,
        level: level,
        parentKey: parentKey
      });
      DomHandler.focus(listRef.current.getElement());
    } else {
      grouped ? onItemChange(event) : hide();
    }
  };
  var onItemMouseEnter = function onItemMouseEnter(event) {
    onItemChange(event);
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
    changeFocusedItemIndex(itemIndex);
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    if (event.altKey) {
      if (focusedItemInfo.index !== -1) {
        var processedItem = visibleItems[focusedItemInfo.index];
        var grouped = isProccessedItemGroup(processedItem);
        !grouped && onItemChange({
          originalEvent: event,
          processedItem: processedItem
        });
      }
      event.preventDefault();
    } else {
      var itemIndex = focusedItemInfo.index !== -1 ? findPrevItemIndex(focusedItemInfo.index) : findLastFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
      event.preventDefault();
    }
  };
  var onArrowLeftKey = function onArrowLeftKey(event) {
    var processedItem = visibleItems[focusedItemInfo.index];
    var parentItem = activeItemPath.find(function (p) {
      return p.key === processedItem.parentKey;
    });
    var root = ObjectUtils.isEmpty(processedItem.parent);
    if (!root) {
      setFocusedItemInfo({
        index: -1,
        parentKey: parentItem ? parentItem.parentKey : ''
      });
      searchValue.current = '';
      setTimeout(function () {
        return setFocusTrigger(true);
      }, 0);
    }
    event.preventDefault();
  };
  var onArrowRightKey = function onArrowRightKey(event) {
    var processedItem = visibleItems[focusedItemInfo.index];
    var grouped = isProccessedItemGroup(processedItem);
    if (grouped) {
      onItemChange({
        originalEvent: event,
        processedItem: processedItem
      });
      setFocusedItemInfo({
        index: -1,
        parentKey: processedItem.key
      });
      searchValue.current = '';
      setTimeout(function () {
        return setFocusTrigger(true);
      }, 0);
    }
    event.preventDefault();
  };
  var onHomeKey = function onHomeKey(event) {
    changeFocusedItemIndex(findFirstItemIndex());
    event.preventDefault();
  };
  var onEndKey = function onEndKey(event) {
    changeFocusedItemIndex(findLastItemIndex());
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    if (focusedItemInfo.index !== -1) {
      var _element = DomHandler.findSingle(listRef.current.getElement(), "li[id=\"".concat("".concat(focusedItemId), "\"]"));
      var anchorElement = _element && DomHandler.findSingle(_element, 'a[data-pc-section="action"]');
      anchorElement ? anchorElement.click() : _element && _element.click();
      var processedItem = visibleItems[focusedItemInfo.index];
      var grouped = isProccessedItemGroup(processedItem);
      !grouped && setFocusedItemInfo(_objectSpread(_objectSpread({}, focusedItemInfo), {}, {
        index: findFirstFocusedItemIndex()
      }));
    }
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    onEnterKey(event);
  };
  var onEscapeKey = function onEscapeKey(event) {
    hide();
    setFocusedItemInfo({
      focusedItemInfo: focusedItemInfo,
      index: findFirstFocusedItemIndex()
    });
    event.preventDefault();
  };
  var onTabKey = function onTabKey(event) {
    if (focusedItemInfo.index !== -1) {
      var processedItem = visibleItems[focusedItemInfo.index];
      var grouped = isProccessedItemGroup(processedItem);
      !grouped && onItemChange({
        originalEvent: event,
        processedItem: processedItem
      });
    }
    hide();
  };
  var searchItems = function searchItems(event, _char) {
    searchValue.current = searchValue.current || '' + _char;
    var itemIndex = -1;
    var matched = false;
    if (focusedItemInfo.index !== -1) {
      itemIndex = visibleItems.slice(focusedItemInfo.index).findIndex(function (processedItem) {
        return isItemMatched(processedItem);
      });
      itemIndex = itemIndex === -1 ? visibleItems.slice(0, focusedItemInfo.index).findIndex(function (processedItem) {
        return isItemMatched(processedItem);
      }) : itemIndex + focusedItemInfo.index;
    } else {
      itemIndex = visibleItems.findIndex(function (processedItem) {
        return isItemMatched(processedItem);
      });
    }
    if (itemIndex !== -1) {
      matched = true;
    }
    if (itemIndex === -1 && focusedItemInfo.index === -1) {
      itemIndex = findFirstFocusedItemIndex();
    }
    if (itemIndex !== -1) {
      changeFocusedItemIndex(itemIndex);
    }
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(function () {
      searchValue.current = '';
      searchTimeout.current = null;
    }, 500);
    return matched;
  };
  var changeFocusedItemIndex = function changeFocusedItemIndex(index) {
    if (focusedItemInfo.index !== index) {
      setFocusedItemInfo(_objectSpread(_objectSpread({}, focusedItemInfo), {}, {
        index: index
      }));
      scrollInView();
    }
  };
  var scrollInView = function scrollInView() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
    var _id = index !== -1 ? "".concat(idState, "_").concat(index) : focusedItemId;
    var element = DomHandler.findSingle(listRef.current.getElement(), "li[id=\"".concat(_id, "\"]"));
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  var getItemProp = function getItemProp(item, name) {
    return item ? ObjectUtils.getItemValue(item[name]) : undefined;
  };
  var getItemLabel = function getItemLabel(item) {
    return getItemProp(item, 'label');
  };
  var getProccessedItemLabel = function getProccessedItemLabel(processedItem) {
    return processedItem ? getItemLabel(processedItem.item) : undefined;
  };
  var isProccessedItemGroup = function isProccessedItemGroup(processedItem) {
    return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
  };
  var isItemDisabled = function isItemDisabled(item) {
    return getItemProp(item, 'disabled');
  };
  var isItemSeparator = function isItemSeparator(item) {
    return getItemProp(item, 'separator');
  };
  var isValidItem = function isValidItem(processedItem) {
    return !!processedItem && !isItemDisabled(processedItem.item) && !isItemSeparator(processedItem.item);
  };
  var isItemMatched = function isItemMatched(processedItem) {
    return isValidItem(processedItem) && getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(searchValue.current.toLocaleLowerCase());
  };
  var findNextItemIndex = function findNextItemIndex(index) {
    var matchedItemIndex = index < visibleItems.length - 1 ? visibleItems.slice(index + 1).findIndex(function (processedItem) {
      return isValidItem(processedItem);
    }) : -1;
    return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
  };
  var findPrevItemIndex = function findPrevItemIndex(index) {
    var matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(visibleItems.slice(0, index), function (processedItem) {
      return isValidItem(processedItem);
    }) : -1;
    return matchedItemIndex > -1 ? matchedItemIndex : index;
  };
  var isSelected = function isSelected(processedItem) {
    return activeItemPath && activeItemPath.some(function (p) {
      return p.key === processedItem.key;
    });
  };
  var isValidSelectedItem = function isValidSelectedItem(processedItem) {
    return isValidItem(processedItem) && isSelected(processedItem);
  };
  var findFirstItemIndex = function findFirstItemIndex() {
    return visibleItems.findIndex(function (processedItem) {
      return isValidItem(processedItem);
    });
  };
  var findLastItemIndex = function findLastItemIndex() {
    return ObjectUtils.findLastIndex(visibleItems, function (processedItem) {
      return isValidItem(processedItem);
    });
  };
  var findFirstFocusedItemIndex = function findFirstFocusedItemIndex() {
    var selectedIndex = findSelectedItemIndex();
    return selectedIndex < 0 ? findFirstItemIndex() : selectedIndex;
  };
  var findLastFocusedItemIndex = function findLastFocusedItemIndex() {
    var selectedIndex = findSelectedItemIndex();
    return selectedIndex < 0 ? findLastItemIndex() : selectedIndex;
  };
  var findSelectedItemIndex = function findSelectedItemIndex() {
    return visibleItems.findIndex(function (processedItem) {
      return isValidSelectedItem(processedItem);
    });
  };
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
      ref: listRef,
      ariaLabel: props.ariaLabel,
      ariaLabelledby: props.ariaLabelledby,
      activeItemPath: activeItemPath,
      hostName: "ContextMenu",
      id: idState + '_list',
      role: "menubar",
      tabIndex: props.tabIndex || 0,
      ariaActivedescendant: focused ? focusedItemId : undefined,
      menuId: idState,
      focusedItemId: focused ? focusedItemId : undefined,
      menuProps: props,
      model: processedItems,
      level: 0,
      root: true,
      onItemClick: onItemClick,
      onItemMouseEnter: onItemMouseEnter,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
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
