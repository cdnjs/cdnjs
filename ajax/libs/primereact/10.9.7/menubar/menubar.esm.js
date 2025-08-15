'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext, ariaLabel } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useEventListener, useResizeListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { BarsIcon } from 'primereact/icons/bars';
import { classNames, ObjectUtils, IconUtils, DomHandler, UniqueComponentId, ZIndexUtils } from 'primereact/utils';
import { AngleDownIcon } from 'primereact/icons/angledown';
import { AngleRightIcon } from 'primereact/icons/angleright';
import { Ripple } from 'primereact/ripple';

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
  start: 'p-menubar-start',
  end: 'p-menubar-end',
  button: 'p-menubar-button',
  root: function root(_ref) {
    var mobileActiveState = _ref.mobileActiveState;
    return classNames('p-menubar p-component', {
      'p-menubar-mobile-active': mobileActiveState
    });
  },
  separator: 'p-menuitem-separator',
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  menuitem: function menuitem(_ref2) {
    var active = _ref2.active,
      focused = _ref2.focused,
      disabled = _ref2.disabled;
    return classNames('p-menuitem', {
      'p-menuitem-active p-highlight': active,
      'p-focus': focused,
      'p-disabled': disabled
    });
  },
  menu: 'p-menubar-root-list',
  content: 'p-menuitem-content',
  submenu: 'p-submenu-list',
  action: function action(_ref3) {
    var disabled = _ref3.disabled;
    return classNames('p-menuitem-link', {
      'p-disabled': disabled
    });
  }
};
var styles = "\n@layer primereact {\n    .p-menubar {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-menubar ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-menubar .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-menubar .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-menubar .p-menuitem {\n        position: relative;\n    }\n\n    .p-menubar-root-list {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n\n    .p-menubar-root-list > li ul {\n        display: none;\n        z-index: 1;\n    }\n\n    .p-menubar-root-list > .p-menuitem-active > .p-submenu-list {\n        display: block;\n    }\n\n    .p-menubar .p-submenu-list {\n        display: none;\n        position: absolute;\n        z-index: 5;\n    }\n\n    .p-menubar .p-submenu-list > .p-menuitem-active > .p-submenu-list {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n\n    .p-menubar .p-submenu-list .p-menuitem .p-menuitem-content .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n\n    .p-menubar .p-menubar-end {\n        margin-left: auto;\n        align-self: center;\n    }\n\n    .p-menubar-button {\n        display: none;\n        cursor: pointer;\n        align-items: center;\n        justify-content: center;\n        text-decoration: none;\n    }\n}\n";
var MenubarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Menubar',
    id: null,
    model: null,
    style: null,
    className: null,
    start: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    onFocus: null,
    onBlur: null,
    submenuIcon: null,
    menuIcon: null,
    end: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MenubarSub = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(processedItem, key, index) {
    return ptm(key, {
      props: props,
      hostName: props.hostName,
      context: {
        item: processedItem,
        index: index,
        active: isItemActive(processedItem),
        focused: isItemFocused(processedItem),
        disabled: isItemDisabled(processedItem),
        level: props.level
      }
    });
  };
  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (isItemDisabled(item) || props.mobileActive) {
      event.preventDefault();
      return;
    }
    props.onItemMouseEnter && props.onItemMouseEnter({
      originalEvent: event,
      processedItem: item
    });
  };
  var onItemClick = function onItemClick(event, processedItem) {
    var item = processedItem.item;
    if (isItemDisabled(processedItem)) {
      event.preventDefault();
      return;
    }
    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
    onLeafClick({
      originalEvent: event,
      processedItem: processedItem,
      isFocus: true
    });
    if (!item.url) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var onLeafClick = function onLeafClick(event) {
    props.onLeafClick && props.onLeafClick(event);
  };
  var getItemId = function getItemId(processedItem) {
    var _processedItem$item;
    return (_processedItem$item = processedItem.item) === null || _processedItem$item === void 0 ? void 0 : _processedItem$item.id;
  };
  var getItemDataId = function getItemDataId(processedItem) {
    return "".concat(props.id, "_").concat(processedItem.key);
  };
  var getItemProp = function getItemProp(processedItem, name, params) {
    return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
  };
  var isItemActive = function isItemActive(processedItem) {
    return props.activeItemPath.some(function (path) {
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
    return props.focusedItemId === getItemDataId(processedItem);
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
  var createSeparator = function createSeparator(processedItem, index) {
    var key = props.id + '_separator_' + index + '_' + processedItem.key;
    var separatorProps = mergeProps({
      'data-id': key,
      className: cx('separator'),
      role: 'separator'
    }, ptm('separator', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React.createElement("li", _extends({}, separatorProps, {
      key: key
    }));
  };
  var createSubmenu = function createSubmenu(processedItem) {
    var items = processedItem && processedItem.items;
    if (items) {
      return /*#__PURE__*/React.createElement(MenubarSub, {
        id: props.id,
        hostName: props.hostName,
        menuProps: props.menuProps,
        level: props.level + 1,
        model: items,
        activeItemPath: props.activeItemPath,
        focusedItemId: props.focusedItemId,
        onLeafClick: onLeafClick,
        onItemMouseEnter: props.onItemMouseEnter,
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        style: {
          display: isItemActive(processedItem) ? 'block' : 'none'
        },
        cx: cx
      });
    }
    return null;
  };
  var createMenuitem = function createMenuitem(processedItem, index) {
    var item = processedItem.item;
    if (!isItemVisible(processedItem)) {
      return null;
    }
    var id = getItemId(processedItem);
    var dataId = getItemDataId(processedItem);
    var active = isItemActive(processedItem);
    var focused = isItemFocused(processedItem);
    var disabled = isItemDisabled(processedItem) || false;
    var group = isItemGroup(processedItem);
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': disabled
    });
    var iconClassName = classNames('p-menuitem-icon', getItemProp(processedItem, 'icon'));
    var iconProps = mergeProps({
      className: cx('icon')
    }, getPTOptions(processedItem, 'icon', index));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(processedItem, 'label', index));
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var items = getItemProp(processedItem, 'items');
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(processedItem, 'submenuIcon', index));
    var submenuIcon = items && IconUtils.getJSXIcon(!props.root ? props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React.createElement(AngleDownIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: _objectSpread$1({
        menuProps: props.menuProps
      }, props)
    });
    var submenu = createSubmenu(processedItem);
    var actionProps = mergeProps({
      href: item.url || '#',
      tabIndex: '-1',
      className: cx('action', {
        disabled: disabled
      }),
      onFocus: function onFocus(event) {
        return event.stopPropagation();
      },
      target: getItemProp(processedItem, 'target'),
      'aria-haspopup': items != null
    }, getPTOptions(processedItem, 'action', index));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null));
    if (item.template) {
      var defaultContentOptions = {
        className: linkClassName,
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: submenuIconClassName,
        element: content,
        props: props
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
    var itemClassName = getItemProp(processedItem, 'className');
    var menuitemProps = mergeProps(_defineProperty({
      id: id,
      'data-id': dataId,
      role: 'menuitem',
      'aria-label': item.label,
      'aria-disabled': disabled,
      'aria-expanded': group ? active : undefined,
      'aria-haspopup': group && !item.url ? 'menu' : undefined,
      'aria-setsize': getAriaSetSize(),
      'aria-posinset': getAriaPosInset(index),
      'data-p-highlight': active,
      'data-p-focused': focused,
      'data-p-disabled': disabled,
      className: classNames(itemClassName, cx('menuitem', {
        active: active,
        focused: focused,
        disabled: disabled
      }))
    }, "data-p-disabled", disabled || false), getPTOptions(processedItem, 'menuitem', index));
    return /*#__PURE__*/React.createElement("li", _extends({}, menuitemProps, {
      key: "".concat(dataId)
    }), /*#__PURE__*/React.createElement("div", contentProps, content), submenu);
  };
  var createItem = function createItem(processedItem, index) {
    if (processedItem.visible === false) {
      return null;
    }
    return getItemProp(processedItem, 'separator') ? createSeparator(processedItem, index) : createMenuitem(processedItem, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var role = props.root ? 'menubar' : 'menu';
  var ptKey = props.root ? 'menu' : 'submenu';
  var tabIndex = props.root ? '0' : null;
  var submenu = createMenu();
  var menuProps = mergeProps({
    ref: ref,
    className: cx(ptKey),
    level: props.level,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onKeyDown: props.onKeyDown,
    'data-id': props.id,
    tabIndex: tabIndex,
    'aria-activedescendant': props.ariaActivedescendant,
    style: props.style,
    role: role
  }, ptm(ptKey));
  return /*#__PURE__*/React.createElement("ul", menuProps, submenu);
}));
MenubarSub.displayName = 'MenubarSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Menubar = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = MenubarBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    mobileActiveState = _React$useState4[0],
    setMobileActiveState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focused = _React$useState6[0],
    setFocused = _React$useState6[1];
  var _React$useState7 = React.useState({
      index: -1,
      level: 0,
      parentKey: ''
    }),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focusedItemInfo = _React$useState8[0],
    setFocusedItemInfo = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    focusedItemId = _React$useState10[0],
    setFocusedItemId = _React$useState10[1];
  var _React$useState11 = React.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    activeItemPath = _React$useState12[0],
    setActiveItemPath = _React$useState12[1];
  var _React$useState13 = React.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    visibleItems = _React$useState14[0],
    setVisibleItems = _React$useState14[1];
  var _React$useState15 = React.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    processedItems = _React$useState16[0],
    setProcessedItems = _React$useState16[1];
  var _React$useState17 = React.useState(false),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    focusTrigger = _React$useState18[0],
    setFocusTrigger = _React$useState18[1];
  var _React$useState19 = React.useState(false),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    dirty = _React$useState20[0],
    setDirty = _React$useState20[1];
  var elementRef = React.useRef(null);
  var rootMenuRef = React.useRef(null);
  var menuButtonRef = React.useRef(null);
  var searchValue = React.useRef('');
  var searchTimeout = React.useRef(null);
  var reverseTrigger = React.useRef(false);
  var _MenubarBase$setMetaD = MenubarBase.setMetaData({
      props: props,
      state: {
        id: idState,
        mobileActive: mobileActiveState
      }
    }),
    ptm = _MenubarBase$setMetaD.ptm,
    cx = _MenubarBase$setMetaD.cx,
    isUnstyled = _MenubarBase$setMetaD.isUnstyled;
  useHandleStyle(MenubarBase.css.styles, isUnstyled, {
    name: 'menubar'
  });
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (isOutsideClicked(event)) {
          var isOutsideContainer = elementRef.current && !elementRef.current.contains(event.target);
          if (isOutsideContainer) {
            hide();
          }
        }
      },
      options: {
        capture: true
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindOutsideClickListener = _useEventListener2[0],
    unbindOutsideClickListener = _useEventListener2[1];
  var _useResizeListener = useResizeListener({
      listener: function listener(event) {
        if (!DomHandler.isTouchDevice()) {
          hide(event);
        }
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
    bindResizeListener = _useResizeListener2[0],
    unbindResizeListener = _useResizeListener2[1];
  var toggle = function toggle(event) {
    if (mobileActiveState) {
      setMobileActiveState(false);
      hide();
    } else {
      setMobileActiveState(true);
      setTimeout(function () {
        show();
      }, 1);
    }
    event.preventDefault();
  };
  var show = function show() {
    setFocusedItemInfo({
      index: findFirstFocusedItemIndex(),
      level: 0,
      parentKey: ''
    });
    DomHandler.focus(rootMenuRef.current);
  };
  var hide = function hide(isFocus) {
    if (mobileActiveState) {
      setMobileActiveState(false);
      setTimeout(function () {
        DomHandler.focus(menuButtonRef.current);
      }, 0);
    }
    setActiveItemPath([]);
    setFocusedItemInfo({
      index: -1,
      level: 0,
      parentKey: ''
    });
    isFocus && DomHandler.focus(rootMenuRef.current);
    setDirty(false);
  };
  var menuButtonKeydown = function menuButtonKeydown(event) {
    (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') && toggle(event);
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return rootMenuRef.current !== event.target && !rootMenuRef.current.contains(event.target) && menuButtonRef.current !== event.target && !menuButtonRef.current.contains(event.target);
  };
  var getItemProp = function getItemProp(item, name) {
    return item ? ObjectUtils.getItemValue(item[name]) : undefined;
  };
  var getItemLabel = function getItemLabel(item) {
    return getItemProp(item, 'label');
  };
  var isItemDisabled = function isItemDisabled(item) {
    return getItemProp(item, 'disabled');
  };
  var isItemSeparator = function isItemSeparator(item) {
    return getItemProp(item, 'separator');
  };
  var getProccessedItemLabel = function getProccessedItemLabel(processedItem) {
    return processedItem ? getItemLabel(processedItem.item) : undefined;
  };
  var isProccessedItemGroup = function isProccessedItemGroup(processedItem) {
    return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
  };
  var onFocus = function onFocus(event) {
    setFocused(true);
    setFocusedItemInfo(focusedItemInfo.index !== -1 ? focusedItemInfo : {
      index: findFirstFocusedItemIndex(),
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
    setDirty(false);
    props.onBlur && props.onBlur(event);
  };
  var onKeyDown = function onKeyDown(event) {
    var metaKey = event.metaKey || event.ctrlKey;
    var code = event.code;
    switch (code) {
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
        onEscapeKey();
        break;
      case 'Tab':
        onTabKey(event);
        break;
      case 'PageDown':
      case 'PageUp':
      case 'Backspace':
      case 'ShiftLeft':
      case 'ShiftRight':
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
      isFocus = event.isFocus;
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
    grouped && _activeItemPath.push(processedItem);
    setFocusedItemInfo({
      index: index,
      level: level,
      parentKey: parentKey
    });
    setActiveItemPath(_activeItemPath);
    grouped && setDirty(true);
    isFocus && DomHandler.focus(rootMenuRef.current);
  };
  var onItemClick = function onItemClick(event) {
    var originalEvent = event.originalEvent,
      processedItem = event.processedItem;
    var grouped = isProccessedItemGroup(processedItem);
    var root = ObjectUtils.isEmpty(processedItem.parent);
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
      if (!grouped) {
        setDirty(!root);
      }
      setTimeout(function () {
        DomHandler.focus(rootMenuRef.current);
        if (grouped) {
          setDirty(true);
        }
      }, 0);
    } else if (grouped) {
      DomHandler.focus(rootMenuRef.current);
      onItemChange({
        originalEvent: originalEvent,
        processedItem: processedItem
      });
    } else {
      var rootProcessedItem = root ? processedItem : activeItemPath.find(function (p) {
        return p.parentKey === '';
      });
      var rootProcessedItemIndex = rootProcessedItem ? rootProcessedItem.index : -1;
      hide(originalEvent);
      setFocusedItemInfo({
        index: rootProcessedItemIndex,
        parentKey: rootProcessedItem ? rootProcessedItem.parentKey : ''
      });
      setMobileActiveState(false);
    }
  };
  var onItemMouseEnter = function onItemMouseEnter(event) {
    if (!mobileActiveState && dirty) {
      onItemChange(event);
    }
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    var processedItem = visibleItems[focusedItemInfo.index];
    var root = processedItem ? ObjectUtils.isEmpty(processedItem.parent) : null;
    if (root) {
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
        setTimeout(function () {
          return setFocusTrigger(true);
        }, 0);
      }
    } else {
      var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
    }
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    var processedItem = visibleItems[focusedItemInfo.index];
    var root = ObjectUtils.isEmpty(processedItem.parent);
    if (root) {
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
        reverseTrigger.current = true;
        setTimeout(function () {
          return setFocusTrigger(true);
        }, 0);
      }
    } else {
      var parentItem = activeItemPath.find(function (p) {
        return p.key === processedItem.parentKey;
      });
      if (focusedItemInfo.index === 0 && parentItem && parentItem.parentKey === '') {
        setFocusedItemInfo({
          index: -1,
          parentKey: parentItem ? parentItem.parentKey : ''
        });
        searchValue.current = '';
        onArrowLeftKey(event);
      } else {
        var itemIndex = focusedItemInfo.index !== -1 ? findPrevItemIndex(focusedItemInfo.index) : findLastFocusedItemIndex();
        changeFocusedItemIndex(itemIndex);
      }
    }
    event.preventDefault();
  };
  var onArrowLeftKey = function onArrowLeftKey(event) {
    var processedItem = visibleItems[focusedItemInfo.index];
    var parentItem = processedItem ? activeItemPath.find(function (p) {
      return p.key === processedItem.parentKey;
    }) : null;
    if (parentItem) {
      onItemChange({
        originalEvent: event,
        processedItem: parentItem
      });
      setActiveItemPath(activeItemPath.filter(function (p) {
        return p.key !== parentItem.key;
      }));
    } else {
      var itemIndex = focusedItemInfo.index !== -1 ? findPrevItemIndex(focusedItemInfo.index) : findLastFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
    }
    event.preventDefault();
  };
  var onArrowRightKey = function onArrowRightKey(event) {
    var processedItem = visibleItems[focusedItemInfo.index];
    var parentItem = processedItem ? activeItemPath.find(function (p) {
      return p.key === processedItem.parentKey;
    }) : null;
    if (parentItem) {
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
        setTimeout(function () {
          return setFocusTrigger(true);
        }, 0);
      }
    } else {
      var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
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
      var element = DomHandler.findSingle(rootMenuRef.current, "li[data-id=\"".concat("".concat(focusedItemId), "\"]"));
      var anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
      anchorElement ? anchorElement.click() : element && element.click();
    }
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    onEnterKey(event);
  };
  var onEscapeKey = function onEscapeKey(event) {
    hide(true);
    setFocusedItemInfo({
      focusedItemInfo: focusedItemInfo,
      index: findFirstFocusedItemIndex()
    });
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
  var isItemMatched = function isItemMatched(processedItem) {
    return isValidItem(processedItem) && getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(searchValue.current.toLocaleLowerCase());
  };
  var isValidItem = function isValidItem(processedItem) {
    return !!processedItem && !isItemDisabled(processedItem.item) && !isItemSeparator(processedItem.item);
  };
  var isValidSelectedItem = function isValidSelectedItem(processedItem) {
    return isValidItem(processedItem) && isSelected(processedItem);
  };
  var isSelected = function isSelected(processedItem) {
    return activeItemPath.some(function (p) {
      return p.key === processedItem.key;
    });
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
  var findSelectedItemIndex = function findSelectedItemIndex() {
    return visibleItems.findIndex(function (processedItem) {
      return isValidSelectedItem(processedItem);
    });
  };
  var findFirstFocusedItemIndex = function findFirstFocusedItemIndex() {
    var selectedIndex = findSelectedItemIndex();
    return selectedIndex;
  };
  var findLastFocusedItemIndex = function findLastFocusedItemIndex() {
    var selectedIndex = findSelectedItemIndex();
    return selectedIndex;
  };
  var searchItems = function searchItems(event, _char) {
    searchValue.current = (searchValue.current || '') + _char;
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
    var id = index !== -1 ? "".concat(idState, "_").concat(index) : focusedItemId;
    var element = DomHandler.findSingle(rootMenuRef.current, "li[data-id=\"".concat(id, "\"]"));
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  var _createProcessedItems = function createProcessedItems(items) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var _processedItems = [];
    items && items.forEach(function (item, index) {
      var key = (parentKey !== '' ? parentKey + '_' : '') + index;
      var newItem = {
        item: item,
        index: index,
        level: level,
        key: key,
        parent: parent,
        parentKey: parentKey
      };
      newItem.items = _createProcessedItems(item.items, level + 1, newItem, key);
      _processedItems.push(newItem);
    });
    return _processedItems;
  };
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  useUpdateEffect(function () {
    if (mobileActiveState) {
      bindOutsideClickListener();
      bindResizeListener();
      ZIndexUtils.set('menu', rootMenuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex.menu || PrimeReact.zIndex.menu);
    } else {
      unbindResizeListener();
      unbindOutsideClickListener();
      ZIndexUtils.clear(rootMenuRef.current);
    }
  }, [mobileActiveState]);
  React.useEffect(function () {
    var itemsToProcess = props.model || [];
    var processed = _createProcessedItems(itemsToProcess, 0, null, '');
    setProcessedItems(processed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.model]);
  useUpdateEffect(function () {
    var processedItem = activeItemPath.find(function (p) {
      return p.key === focusedItemInfo.parentKey;
    });
    var _processedItems = processedItem ? processedItem.items : processedItems;
    setVisibleItems(_processedItems);
  }, [activeItemPath, focusedItemInfo, processedItems]);
  useUpdateEffect(function () {
    if (ObjectUtils.isNotEmpty(activeItemPath)) {
      bindOutsideClickListener();
      bindResizeListener();
    } else {
      unbindOutsideClickListener();
      unbindResizeListener();
    }
  }, [activeItemPath]);
  useUpdateEffect(function () {
    if (focusTrigger) {
      var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : reverseTrigger.current ? findLastItemIndex() : findFirstFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
      reverseTrigger.current = false;
      setFocusTrigger(false);
    }
  }, [focusTrigger]);
  useUpdateEffect(function () {
    setFocusedItemId(focusedItemInfo.index !== -1 ? "".concat(idState).concat(ObjectUtils.isNotEmpty(focusedItemInfo.parentKey) ? '_' + focusedItemInfo.parentKey : '', "_").concat(focusedItemInfo.index) : null);
  }, [focusedItemInfo]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(rootMenuRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      getElement: function getElement() {
        return elementRef.current;
      },
      getRootMenu: function getRootMenu() {
        return rootMenuRef.current;
      },
      getMenuButton: function getMenuButton() {
        return menuButtonRef.current;
      }
    };
  });
  var createStartContent = function createStartContent() {
    if (props.start) {
      var _start = ObjectUtils.getJSXElement(props.start, props);
      var startProps = mergeProps({
        className: cx('start')
      }, ptm('start'));
      return /*#__PURE__*/React.createElement("div", startProps, _start);
    }
    return null;
  };
  var createEndContent = function createEndContent() {
    if (props.end) {
      var _end = ObjectUtils.getJSXElement(props.end, props);
      var endProps = mergeProps({
        className: cx('end')
      }, ptm('end'));
      return /*#__PURE__*/React.createElement("div", endProps, _end);
    }
    return null;
  };
  var createMenuButton = function createMenuButton() {
    if (props.model && props.model.length < 1) {
      return null;
    }
    var buttonProps = mergeProps(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      ref: menuButtonRef,
      href: '#',
      tabIndex: '0',
      'aria-haspopup': mobileActiveState && props.model && props.model.length > 0 ? true : false,
      'aria-expanded': mobileActiveState,
      'aria-label': ariaLabel('navigation'),
      'aria-controls': idState,
      role: 'button'
    }, "tabIndex", 0), "className", cx('button')), "onKeyDown", function onKeyDown(e) {
      return menuButtonKeydown(e);
    }), "onClick", function onClick(e) {
      return toggle(e);
    }), ptm('button'));
    var popupIconProps = mergeProps(ptm('popupIcon'));
    var icon = props.menuIcon || /*#__PURE__*/React.createElement(BarsIcon, popupIconProps);
    var menuIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, popupIconProps), {
      props: props
    });

    /* eslint-disable */
    var button = /*#__PURE__*/React.createElement("a", buttonProps, menuIcon);
    /* eslint-enable */

    return button;
  };
  var start = createStartContent();
  var end = createEndContent();
  var menuButton = createMenuButton();
  var submenu = /*#__PURE__*/React.createElement(MenubarSub, {
    hostName: "Menubar",
    ariaActivedescendant: focused ? focusedItemId : undefined,
    level: 0,
    id: idState,
    ref: rootMenuRef,
    menuProps: props,
    model: processedItems,
    onLeafClick: onItemClick,
    onItemMouseEnter: onItemMouseEnter,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    root: true,
    activeItemPath: activeItemPath,
    focusedItemId: focused ? focusedItemId : undefined,
    submenuIcon: props.submenuIcon,
    ptm: ptm,
    cx: cx
  });
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: classNames(props.className, cx('root', {
      mobileActiveState: mobileActiveState
    })),
    style: props.style
  }, MenubarBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, start, menuButton, submenu, end);
}));
Menubar.displayName = 'Menubar';

export { Menubar };
