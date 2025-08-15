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
var utils = require('primereact/utils');
var angleright = require('primereact/icons/angleright');
var ripple = require('primereact/ripple');

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
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context;
    return utils.classNames('p-tieredmenu p-component', {
      'p-tieredmenu-overlay': props.popup,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
  },
  separator: 'p-menuitem-separator',
  icon: function icon(_ref2) {
    var _icon = _ref2._icon;
    return utils.classNames('p-menuitem-icon', _icon);
  },
  content: 'p-menuitem-content',
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  action: 'p-menuitem-link',
  menuitem: function menuitem(_ref3) {
    var itemClassName = _ref3.itemClassName,
      active = _ref3.active,
      focused = _ref3.focused,
      disabled = _ref3.disabled;
    return utils.classNames('p-menuitem', {
      'p-menuitem-active p-highlight': active,
      'p-focus': focused,
      'p-disabled': disabled
    }, itemClassName);
  },
  menu: 'p-tieredmenu-root-list',
  submenu: 'p-submenu-list',
  transition: 'p-connected-overlay'
};
var inlineStyles = {
  submenu: function submenu(_ref4) {
    var props = _ref4.subProps;
    return {
      display: !props.root && props.parentActive ? 'block' : 'none'
    };
  }
};
var styles = "\n@layer primereact {\n    .p-tieredmenu-overlay {\n        position: absolute;\n    }\n\n    .p-tieredmenu ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-tieredmenu .p-submenu-list {\n        position: absolute;\n        min-width: 100%;\n        z-index: 1;\n        display: none;\n    }\n\n    .p-tieredmenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-tieredmenu .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-tieredmenu .p-menuitem {\n        position: relative;\n    }\n\n    .p-tieredmenu .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n\n    .p-tieredmenu .p-menuitem-active > .p-submenu-list {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n\n    .p-tieredmenu .p-menuitem-active > .p-submenu-list-flipped {\n        left: -100%;\n    }\n}\n";
var TieredMenuBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TieredMenu',
    __parentMetadata: null,
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
    onFocus: null,
    onBlur: null,
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

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TieredMenuSub = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var mergeProps = hooks.useMergeProps();
  var ptm = props.ptm,
    cx = props.cx,
    sx = props.sx;
  var getPTOptions = function getPTOptions(item, key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        active: isItemActive(item)
      }
    });
  };
  var position = function position() {
    if (elementRef.current) {
      var parentItem = elementRef.current.parentElement;
      var containerOffset = utils.DomHandler.getOffset(parentItem);
      var viewport = utils.DomHandler.getViewport();
      var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(elementRef.current);
      var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);
      var top = parseInt(containerOffset.top, 10) + elementRef.current.offsetHeight - utils.DomHandler.getWindowScrollTop();
      if (top > viewport.height) {
        elementRef.current.style.top = viewport.height - top + 'px';
      } else {
        elementRef.current.style.top = '0px';
      }
      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
        utils.DomHandler.addClass(elementRef.current, 'p-submenu-list-flipped');
      }
    }
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
    props.onItemClick && props.onItemClick({
      originalEvent: event,
      processedItem: processedItem
    });
    if (!item.url) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var getItemId = function getItemId(processedItem) {
    if (processedItem.item && processedItem.item.id) {
      return processedItem.item.id;
    }
    return "".concat(props.menuId, "_").concat(processedItem.key);
  };
  var getItemProp = function getItemProp(processedItem, name, params) {
    return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
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
    return props.focusedItemId === getItemId(processedItem);
  };
  var isItemGroup = function isItemGroup(processedItem) {
    return utils.ObjectUtils.isNotEmpty(processedItem.items);
  };
  var onItemMouseEnter = function onItemMouseEnter(event, processedItem) {
    props.onItemMouseEnter && props.onItemMouseEnter({
      originalEvent: event,
      processedItem: processedItem
    });
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
  hooks.useUpdateEffect(function () {
    if (!props.root && props.parentActive && !props.isMobileMode) {
      position();
    }
  }, [props.parentActive]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = mergeProps({
      className: cx('separator'),
      role: 'separator'
    }, ptm('separator', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React__namespace.createElement("li", _extends({}, separatorProps, {
      key: key
    }));
  };
  var createSubmenu = function createSubmenu(processedItem, index) {
    if (isItemGroup(processedItem)) {
      return /*#__PURE__*/React__namespace.createElement(TieredMenuSub, {
        id: props.id + '_' + index,
        menuProps: props.menuProps,
        model: processedItem.items,
        menuId: props.menuId,
        ariaLabelledby: getItemId(processedItem),
        focusedItemId: props.focusedItemId,
        activeItemPath: props.activeItemPath,
        level: props.level + 1,
        onItemClick: props.onItemClick,
        popup: props.popup,
        onItemMouseEnter: props.onItemMouseEnter,
        parentActive: isItemActive(processedItem),
        isMobileMode: props.isMobileMode,
        submenuIcon: props.submenuIcon,
        ptm: props.ptm,
        cx: cx,
        sx: sx
      });
    }
    return null;
  };
  var createMenuItem = function createMenuItem(processedItem, index) {
    if (isItemVisible(processedItem) === false) {
      return null;
    }
    var item = processedItem.item;
    var style = getItemProp(processedItem, 'style');
    var itemClassName = getItemProp(processedItem, 'className');
    var _icon = getItemProp(processedItem, 'icon');
    var target = getItemProp(processedItem, 'target');
    var url = getItemProp(processedItem, 'url');
    var key = getItemId(processedItem);
    var focused = isItemFocused(processedItem);
    var active = isItemActive(processedItem);
    var disabled = isItemDisabled(processedItem);
    var grouped = isItemGroup(processedItem);
    var linkClassName = utils.classNames('p-menuitem-link');
    var iconClassName = utils.classNames('p-menuitem-icon', _icon);
    var iconProps = mergeProps({
      className: utils.classNames(item.icon, 'p-menuitem-icon', 'icon')
    }, getPTOptions(processedItem, 'icon'));
    var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(processedItem, 'label'));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(processedItem, 'submenuIcon'));
    var submenuIcon = grouped && utils.IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: props.menuProps
    });
    var submenu = createSubmenu(processedItem, index);
    var actionProps = mergeProps({
      href: url || '#',
      tabIndex: '-1',
      onFocus: function onFocus(event) {
        return event.stopPropagation();
      },
      className: cx('action'),
      target: target
    }, getPTOptions(processedItem, 'action'));
    var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (item.template) {
      var defaultContentOptions = {
        className: linkClassName,
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: submenuIconClassName,
        element: content,
        props: props,
        active: active,
        disabled: disabled
      };
      content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var contentProps = mergeProps({
      onClick: function onClick(event) {
        return onItemClick(event, processedItem);
      },
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, processedItem);
      },
      className: cx('content')
    }, getPTOptions(processedItem, 'content'));
    var menuitemProps = mergeProps({
      id: key,
      'aria-label': item.label,
      'aria-disabled': disabled,
      'aria-expanded': grouped ? active : undefined,
      'aria-haspopup': grouped && !url ? 'menu' : undefined,
      'aria-setsize': getAriaSetSize(),
      'aria-posinset': getAriaPosInset(index),
      'data-p-highlight': active,
      'data-p-disabled': disabled,
      'data-p-visited': focused,
      className: cx('menuitem', {
        itemClassName: itemClassName,
        active: active,
        focused: focused,
        disabled: disabled
      }),
      style: style,
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, item);
      },
      role: 'menuitem'
    }, getPTOptions(processedItem, 'menuitem'));
    return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuitemProps, {
      key: key
    }), /*#__PURE__*/React__namespace.createElement("div", contentProps, content), submenu);
  };
  var createItem = function createItem(processedItem, index) {
    if (processedItem.visible === false) {
      return null;
    }
    return getItemProp(processedItem, 'separator') ? createSeparator(index) : createMenuItem(processedItem, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var submenu = createMenu();
  var ptKey = props.root ? 'menu' : 'submenu';
  var menuProps = mergeProps({
    ref: elementRef,
    id: props.id,
    tabIndex: props.tabIndex,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onKeyDown: props.onKeyDown,
    className: cx(ptKey, {
      subProps: props
    }),
    style: sx(ptKey, {
      subProps: props
    }),
    role: props.root ? 'menubar' : 'menu',
    'aria-label': props.ariaLabel,
    'aria-labelledby': props.ariaLabelledby,
    'aria-orientation': props.ariaOrientation,
    'aria-activedescendant': props.focusedItemId
  }, ptm(ptKey, {
    hostName: props.hostName
  }));
  return /*#__PURE__*/React__namespace.createElement("ul", menuProps, submenu);
}));
TieredMenuSub.displayName = 'TieredMenuSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TieredMenu = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = TieredMenuBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(!props.popup),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    activeItemPath = _React$useState6[0],
    setActiveItemPath = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focused = _React$useState8[0],
    setFocused = _React$useState8[1];
  var _React$useState9 = React__namespace.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    focusedItemId = _React$useState10[0],
    setFocusedItemId = _React$useState10[1];
  var _React$useState11 = React__namespace.useState({
      index: -1,
      level: 0,
      parentKey: ''
    }),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    focusedItemInfo = _React$useState12[0],
    setFocusedItemInfo = _React$useState12[1];
  var _React$useState13 = React__namespace.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    dirty = _React$useState14[0],
    setDirty = _React$useState14[1];
  var _React$useState15 = React__namespace.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    processedItems = _React$useState16[0],
    setProcessedItems = _React$useState16[1];
  var _React$useState17 = React__namespace.useState([]),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    visibleItems = _React$useState18[0],
    setVisibleItems = _React$useState18[1];
  var _React$useState19 = React__namespace.useState(false),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    focusTrigger = _React$useState20[0],
    setFocusTrigger = _React$useState20[1];
  var _React$useState21 = React__namespace.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    attributeSelectorState = _React$useState22[0],
    setAttributeSelectorState = _React$useState22[1];
  var metaData = _objectSpread(_objectSpread({
    props: props
  }, props.__parentMetadata), {}, {
    state: {
      id: idState,
      visible: visibleState,
      attributeSelector: attributeSelectorState
    }
  });
  var _TieredMenuBase$setMe = TieredMenuBase.setMetaData(metaData),
    ptm = _TieredMenuBase$setMe.ptm,
    cx = _TieredMenuBase$setMe.cx,
    sx = _TieredMenuBase$setMe.sx,
    isUnstyled = _TieredMenuBase$setMe.isUnstyled;
  componentbase.useHandleStyle(TieredMenuBase.css.styles, isUnstyled, {
    name: 'tieredmenu'
  });
  var containerRef = React__namespace.useRef(null);
  var menuRef = React__namespace.useRef(null);
  var targetRef = React__namespace.useRef(null);
  var relatedTarget = React__namespace.useRef(null);
  var styleElementRef = React__namespace.useRef(null);
  var searchValue = React__namespace.useRef(null);
  var searchTimeout = React__namespace.useRef(null);
  var isMobileMode = hooks.useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
  var _useEventListener = hooks.useEventListener({
      type: 'click',
      listener: function listener(event) {
        var isOutsideContainer = containerRef.current && !containerRef.current.contains(event.target);
        var isOutsideTarget = props.popup ? !(targetRef.current && (targetRef.current === event.target || targetRef.current.contains(event.target))) : true;
        if (isOutsideContainer && isOutsideTarget) {
          hide(event, !props.popup);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var _useResizeListener = hooks.useResizeListener({
      listener: function listener() {
        !isMobileMode && hide(event, true);
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
    bindDocumentResizeListener = _useResizeListener2[0],
    unbindDocumentResizeListener = _useResizeListener2[1];
  var onPanelClick = function onPanelClick(event) {
    if (props.popup) {
      overlayservice.OverlayService.emit('overlay-click', {
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
    if (props.popup) {
      targetRef.current = event.currentTarget;
      setVisibleState(true);
      props.onShow && props.onShow(event);
      relatedTarget.current = event.relatedTarget || null;
    }
    setFocusedItemInfo({
      index: findFirstFocusedItemIndex(),
      level: 0,
      parentKey: ''
    });
  };
  var hide = function hide(event, isFocus) {
    if (props.popup) {
      setVisibleState(false);
      props.onHide && props.onHide(event);
    }
    var menuElement = getMenuElement();
    setActiveItemPath([]);
    setFocusedItemInfo({
      index: -1,
      level: 0,
      parentKey: ''
    });
    isFocus && utils.DomHandler.focus(relatedTarget.current || targetRef.current || menuElement);
    setDirty(false);
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
        props.popup && utils.DomHandler.focus(targetRef.current);
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
        //NOOP
        break;
      default:
        if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
          searchItems(event.key);
        }
        break;
    }
  };
  var onItemChange = function onItemChange(event) {
    var processedItem = event.processedItem,
      isFocus = event.isFocus;
    if (utils.ObjectUtils.isEmpty(processedItem)) {
      return;
    }
    var index = processedItem.index,
      key = processedItem.key,
      level = processedItem.level,
      parentKey = processedItem.parentKey,
      items = processedItem.items;
    var grouped = utils.ObjectUtils.isNotEmpty(items);
    var _activeItemPath = activeItemPath.filter(function (p) {
      return p.parentKey !== parentKey && p.parentKey !== key;
    });
    if (grouped) {
      _activeItemPath.push(processedItem);
    }
    setFocusedItemInfo({
      index: index,
      level: level,
      parentKey: parentKey
    });
    setActiveItemPath(_activeItemPath);
    grouped && setDirty(true);
    isFocus && utils.DomHandler.focus(getMenuElement());
  };
  var onItemClick = function onItemClick(event) {
    var originalEvent = event.originalEvent,
      processedItem = event.processedItem;
    if (isItemDisabled(processedItem) || props.isMobileMode) {
      return;
    }
    var grouped = isProccessedItemGroup(processedItem);
    var root = utils.ObjectUtils.isEmpty(processedItem.parent);
    var selected = isSelected(processedItem);
    var menuElement = getMenuElement();
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
        utils.DomHandler.focus(menuElement);
        if (grouped) {
          setDirty(true);
        }
      }, 0);
    } else if (grouped) {
      utils.DomHandler.focus(menuElement);
      onItemChange(event);
    } else {
      var rootProcessedItem = root ? processedItem : activeItemPath.find(function (p) {
        return p.parentKey === '';
      });
      var rootProcessedItemIndex = rootProcessedItem ? rootProcessedItem.index : -1;
      hide(originalEvent, true);
      setFocusedItemInfo({
        index: rootProcessedItemIndex,
        parentKey: rootProcessedItem ? rootProcessedItem.parentKey : ''
      });
    }
  };
  var onItemMouseEnter = function onItemMouseEnter(event) {
    var originalEvent = event.originalEvent,
      processedItem = event.processedItem;
    if (isItemDisabled(processedItem) || props.isMobileMode) {
      originalEvent.preventDefault();
      return;
    }
    if (dirty && !props.popup) {
      onItemChange(event);
    }
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
    changeFocusedItemIndex(itemIndex);
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    if (event.altKey) {
      if (props.popup) {
        utils.DomHandler.focus(targetRef.current);
      }
      if (focusedItemInfo.index !== -1) {
        var processedItem = visibleItems[focusedItemInfo.index];
        var grouped = isProccessedItemGroup(processedItem);
        !grouped && onItemChange({
          originalEvent: event,
          processedItem: processedItem
        });
      }
      props.popup && hide(event, true);
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
    var root = utils.ObjectUtils.isEmpty(processedItem.parent);
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
    setActiveItemPath(activeItemPath.filter(function (p) {
      return p.parentKey !== focusedItemInfo.parentKey;
    }));
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
      var _element = utils.DomHandler.findSingle(getMenuElement(), "li[id=\"".concat("".concat(focusedItemId), "\"]"));
      var anchorElement = _element && utils.DomHandler.findSingle(_element, '[data-pc-section="action"]');
      props.popup && utils.DomHandler.focus(targetRef.current);
      anchorElement ? anchorElement.click() : _element && _element.click();
    }
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    onEnterKey(event);
  };
  var onEscapeKey = function onEscapeKey(event) {
    hide(event, true);
    !props.popup && setFocusedItemInfo(_objectSpread(_objectSpread({}, focusedItemInfo), {}, {
      index: findFirstFocusedItemIndex()
    }));
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
    hide(event);
  };
  var getMenuElement = function getMenuElement() {
    return menuRef.current.getElement() || null;
  };
  var getItemProp = function getItemProp(item, name) {
    return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
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
    return processedItem && utils.ObjectUtils.isNotEmpty(processedItem.items);
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
    return utils.ObjectUtils.findLastIndex(visibleItems, function (processedItem) {
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
    var matchedItemIndex = index > 0 ? utils.ObjectUtils.findLastIndex(visibleItems.slice(0, index), function (processedItem) {
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
    return selectedIndex < 0 ? findFirstItemIndex() : selectedIndex;
  };
  var findLastFocusedItemIndex = function findLastFocusedItemIndex() {
    var selectedIndex = findSelectedItemIndex();
    return selectedIndex < 0 ? findLastItemIndex() : selectedIndex;
  };
  var searchItems = function searchItems(_char) {
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
      clearTimeout(searchTimeout);
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
    var element = utils.DomHandler.findSingle(getMenuElement(), "li[id=\"".concat(id, "\"]"));
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  var createProcessedItems = React__namespace.useCallback(function (items) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var processedItems = [];
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
      newItem.items = createProcessedItems(item.items, level + 1, newItem, key);
      processedItems.push(newItem);
    });
    return processedItems;
  }, []);
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce, context && context.styleContainer);
      var selector = "".concat(attributeSelectorState);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-tieredmenu[").concat(selector, "] > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-submenu-list {\n        position: relative;\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-menuitem-active > .p-submenu-list {\n        left: 0;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-submenu-icon:before {\n        content: \"\\e930\";\n    }\n\n    ").concat(!props.popup ? ".p-tieredmenu[".concat(selector, "] { width: 100%; }") : '', "\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
  };
  var alignOverlay = function alignOverlay() {
    var calculateMinWidth = utils.DomHandler.getOuterWidth(targetRef.current) > utils.DomHandler.getOuterWidth(containerRef.current);
    utils.DomHandler.alignOverlay(containerRef.current, targetRef.current, props.appendTo, calculateMinWidth);
  };
  var onEnter = function onEnter() {
    if (props.autoZIndex) {
      utils.ZIndexUtils.set('menu', containerRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex.menu || PrimeReact__default["default"].zIndex.menu);
    }
    utils.DomHandler.addStyles(containerRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    alignOverlay();
    utils.DomHandler.focus(menuRef.current.getElement());
    scrollInView();
    if (attributeSelectorState && props.breakpoint) {
      containerRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
  };
  var onEntered = function onEntered() {
    bindDocumentClickListener();
    bindDocumentResizeListener();
  };
  var onExit = function onExit() {
    targetRef.current = null;
    unbindDocumentClickListener();
    unbindDocumentResizeListener();
  };
  var onExited = function onExited() {
    utils.ZIndexUtils.clear(containerRef.current);
    destroyStyle();
  };
  hooks.useMountEffect(function () {
    var uniqueId = utils.UniqueComponentId();
    !idState && setIdState(uniqueId);
    if (props.breakpoint) {
      !attributeSelectorState && setAttributeSelectorState(uniqueId);
    }
  });
  React__namespace.useEffect(function () {
    var itemsToProcess = props.model || [];
    var processed = createProcessedItems(itemsToProcess);
    setProcessedItems(processed);
  }, [props.model, createProcessedItems]);
  hooks.useUpdateEffect(function () {
    var processedItem = activeItemPath.find(function (p) {
      return p.key === focusedItemInfo.parentKey;
    });
    var processed = processedItem ? processedItem.items : processedItems;
    setVisibleItems(processed);
  }, [activeItemPath, focusedItemInfo, processedItems]);
  hooks.useUpdateEffect(function () {
    var focusedId = focusedItemInfo.index !== -1 ? "".concat(idState).concat(utils.ObjectUtils.isNotEmpty(focusedItemInfo.parentKey) ? '_' + focusedItemInfo.parentKey : '', "_").concat(focusedItemInfo.index) : null;
    setFocusedItemId(focusedId);
  }, [focusedItemInfo]);
  hooks.useUpdateEffect(function () {
    if (!props.popup) {
      if (utils.ObjectUtils.isNotEmpty(activeItemPath)) {
        bindDocumentClickListener();
        bindDocumentResizeListener();
      } else {
        unbindDocumentClickListener();
        unbindDocumentResizeListener();
      }
    }
  }, [activeItemPath]);
  hooks.useUpdateEffect(function () {
    if (focusTrigger) {
      var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
      changeFocusedItemIndex(itemIndex);
      setActiveItemPath(activeItemPath.filter(function (p) {
        return p.parentKey !== focusedItemInfo.parentKey;
      }));
      setFocusTrigger(false);
    }
  }, [focusTrigger]);
  hooks.useUpdateEffect(function () {
    if (attributeSelectorState && containerRef.current) {
      containerRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(containerRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return containerRef.current;
      }
    };
  });
  var createElement = function createElement() {
    var rootProps = mergeProps({
      ref: containerRef,
      id: props.id,
      className: utils.classNames(props.className, cx('root')),
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
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: containerRef
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(TieredMenuSub, {
      id: idState + '_list',
      ref: menuRef,
      hostName: "TieredMenu",
      menuProps: props,
      tabIndex: 0,
      model: processedItems,
      ariaLabel: props.ariaLabel,
      ariaLabelledBy: props.ariaLabelledBy,
      ariaOrientation: "vertical",
      ariaActiveDescendant: focused ? focusedItemId : undefined,
      menuId: idState,
      level: 0,
      focusedItemId: focusedItemId,
      activeItemPath: activeItemPath,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      onItemClick: onItemClick,
      onItemMouseEnter: onItemMouseEnter,
      root: true,
      popup: props.popup,
      onHide: hide,
      isMobileMode: isMobileMode,
      submenuIcon: props.submenuIcon,
      ptm: ptm,
      cx: cx,
      sx: sx
    })));
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
TieredMenu.displayName = 'TieredMenu';

exports.TieredMenu = TieredMenu;
