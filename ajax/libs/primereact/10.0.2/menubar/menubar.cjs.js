'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var bars = require('primereact/icons/bars');
var utils = require('primereact/utils');
var angledown = require('primereact/icons/angledown');
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

var classes = {
  start: 'p-menubar-start',
  end: 'p-menubar-end',
  button: 'p-menubar-button',
  root: function root(_ref) {
    var mobileActiveState = _ref.mobileActiveState;
    return utils.classNames('p-menubar p-component', {
      'p-menubar-mobile-active': mobileActiveState
    });
  },
  separator: 'p-menu-separator',
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  submenuIcon: 'p-submenu-icon',
  menuitem: function menuitem(_ref2) {
    var item = _ref2.item,
      activeItemState = _ref2.activeItemState;
    return utils.classNames('p-menuitem', {
      'p-menuitem-active': activeItemState === item
    });
  },
  menu: 'p-menubar-root-list',
  submenu: 'p-submenu-list',
  action: function action(_ref3) {
    var item = _ref3.item;
    return utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  }
};
var styles = "\n@layer primereact {\n    .p-menubar {\n        display: flex;\n        align-items: center;\n    }\n    \n    .p-menubar ul {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    .p-menubar .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-menubar .p-menuitem-text {\n        line-height: 1;\n    }\n    \n    .p-menubar .p-menuitem {\n        position: relative;\n    }\n    \n    .p-menubar-root-list {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-menubar-root-list > li ul {\n        display: none;\n        z-index: 1;\n    }\n    \n    .p-menubar-root-list > .p-menuitem-active > .p-submenu-list {\n        display: block;\n    }\n    \n    .p-menubar .p-submenu-list {\n        display: none;\n        position: absolute;\n        z-index: 1;\n    }\n    \n    .p-menubar .p-submenu-list > .p-menuitem-active > .p-submenu-list {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n    \n    .p-menubar .p-submenu-list .p-menuitem-link .p-submenu-icon {\n        margin-left: auto;\n    }\n    \n    .p-menubar .p-menubar-custom,\n    .p-menubar .p-menubar-end {\n        margin-left: auto;\n        align-self: center;\n    }\n    \n    .p-menubar-button {\n        display: none;\n        cursor: pointer;\n        align-items: center;\n        justify-content: center;\n        text-decoration: none;\n    }\n}\n";
var MenubarBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Menubar',
    id: null,
    model: null,
    style: null,
    className: null,
    start: null,
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

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MenubarSub = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(item, key) {
    return ptm(key, {
      props: props,
      hostName: props.hostName,
      context: {
        active: activeItemState === item
      }
    });
  };
  var _useEventListener = hooks.useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (ref && ref.current && !ref.current.contains(event.target)) {
          setActiveItemState(null);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindDocumentClickListener = _useEventListener2[0];
  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (item.disabled || props.mobileActive) {
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
    if (item.items) activeItemState && item === activeItemState ? setActiveItemState(null) : setActiveItemState(item);else onLeafClick();
  };
  var onItemKeyDown = function onItemKeyDown(event, item) {
    var listItem = event.currentTarget.parentElement;
    switch (event.which) {
      //down
      case 40:
        if (props.root) item.items && expandSubmenu(item, listItem);else navigateToNextItem(listItem);
        event.preventDefault();
        break;

      //up
      case 38:
        !props.root && navigateToPrevItem(listItem);
        event.preventDefault();
        break;

      //right
      case 39:
        if (props.root) {
          var nextItem = findNextItem(listItem);
          nextItem && nextItem.children[0].focus();
        } else {
          item.items && expandSubmenu(item, listItem);
        }
        event.preventDefault();
        break;

      //left
      case 37:
        props.root && navigateToPrevItem(listItem);
        event.preventDefault();
        break;
    }
    props.onKeyDown && props.onKeyDown(event, listItem);
  };
  var onChildItemKeyDown = function onChildItemKeyDown(event, childListItem) {
    if (props.root) {
      //up
      if (event.which === 38 && childListItem.previousElementSibling == null) {
        collapseMenu(childListItem);
      }
    } else {
      //left
      if (event.which === 37) {
        collapseMenu(childListItem);
      }
    }
  };
  var expandSubmenu = function expandSubmenu(item, listItem) {
    setActiveItemState(item);
    setTimeout(function () {
      listItem.children[1].children[0].children[0].focus();
    }, 50);
  };
  var collapseMenu = function collapseMenu(listItem) {
    setActiveItemState(null);
    listItem.parentElement.previousElementSibling.focus();
  };
  var navigateToNextItem = function navigateToNextItem(listItem) {
    var nextItem = findNextItem(listItem);
    nextItem && nextItem.children[0].focus();
  };
  var navigateToPrevItem = function navigateToPrevItem(listItem) {
    var prevItem = findPrevItem(listItem);
    prevItem && prevItem.children[0].focus();
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? utils.DomHandler.getAttribute(nextItem, '[data-p-disabled="true"]') || !utils.DomHandler.getAttribute(nextItem, '[data-pc-section="menuitem"]') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? utils.DomHandler.getAttribute(prevItem, '[data-p-disabled="true"]') || !utils.DomHandler.getAttribute(prevItem, '[data-pc-section="menuitem"]') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onLeafClick = function onLeafClick() {
    setActiveItemState(null);
    props.onLeafClick && props.onLeafClick();
  };
  hooks.useMountEffect(function () {
    bindDocumentClickListener();
  });
  hooks.useUpdateEffect(function () {
    !props.parentActive && setActiveItemState(null);
  }, [props.parentActive]);
  var createSeparator = function createSeparator(index) {
    var key = props.id + '_separator_' + index;
    var separatorProps = utils.mergeProps({
      id: key,
      key: key,
      className: cx('separator'),
      role: 'separator'
    }, ptm('separator', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
  };
  var createSubmenu = function createSubmenu(item, index) {
    if (item.items) {
      return /*#__PURE__*/React__namespace.createElement(MenubarSub, {
        id: props.id + '_' + index,
        hostName: props.hostName,
        menuProps: props.menuProps,
        model: item.items,
        mobileActive: props.mobileActive,
        onLeafClick: onLeafClick,
        onKeyDown: onChildItemKeyDown,
        parentActive: item === activeItemState,
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        cx: cx
      });
    }
    return null;
  };
  var createMenuitem = function createMenuitem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = item.id || props.id + '_' + index;
    var linkClassName = utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var iconProps = utils.mergeProps({
      className: cx('icon')
    }, getPTOptions(item, 'icon'));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = utils.mergeProps({
      className: cx('label')
    }, getPTOptions(item, 'label'));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = utils.mergeProps({
      className: cx('submenuIcon')
    }, getPTOptions(item, 'submenuIcon'));
    var submenuIcon = item.items && utils.IconUtils.getJSXIcon(!props.root ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: _objectSpread$1({
        menuProps: props.menuProps
      }, props)
    });
    var submenu = createSubmenu(item, index);
    var actionProps = utils.mergeProps({
      href: item.url || '#',
      role: 'menuitem',
      className: cx('action', {
        item: item
      }),
      target: item.target,
      'aria-haspopup': item.items != null,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      onKeyDown: function onKeyDown(event) {
        return onItemKeyDown(event, item);
      }
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (item.template) {
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
        props: props
      };
      content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = utils.mergeProps({
      id: key,
      key: key,
      role: 'none',
      className: utils.classNames(item.className, cx('menuitem', {
        item: item,
        activeItemState: activeItemState
      })),
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, item);
      },
      'data-p-disabled': item.disabled || false
    }, getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React__namespace.createElement("li", menuitemProps, content, submenu);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : createMenuitem(item, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var role = props.root ? 'menubar' : 'menu';
  var ptKey = props.root ? 'menu' : 'submenu';
  var submenu = createMenu();
  var menuProps = utils.mergeProps({
    ref: ref,
    className: cx(ptKey),
    style: !props.root && {
      display: props.parentActive ? 'block' : 'none'
    },
    role: role
  }, ptm(ptKey));
  return /*#__PURE__*/React__namespace.createElement("ul", menuProps, submenu);
}));
MenubarSub.displayName = 'MenubarSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Menubar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = MenubarBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    mobileActiveState = _React$useState4[0],
    setMobileActiveState = _React$useState4[1];
  var elementRef = React__namespace.useRef(null);
  var rootMenuRef = React__namespace.useRef(null);
  var menuButtonRef = React__namespace.useRef(null);
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
  componentbase.useHandleStyle(MenubarBase.css.styles, isUnstyled, {
    name: 'menubar'
  });
  var _useEventListener = hooks.useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (mobileActiveState && isOutsideClicked(event)) {
          setMobileActiveState(false);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var toggle = function toggle(event) {
    event.preventDefault();
    setMobileActiveState(function (prevMobileActive) {
      return !prevMobileActive;
    });
  };
  var onLeafClick = function onLeafClick() {
    setMobileActiveState(false);
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return rootMenuRef.current !== event.target && !rootMenuRef.current.contains(event.target) && menuButtonRef.current !== event.target && !menuButtonRef.current.contains(event.target);
  };
  hooks.useMountEffect(function () {
    if (!idState) {
      setIdState(utils.UniqueComponentId());
    }
  });
  hooks.useUpdateEffect(function () {
    if (mobileActiveState) {
      utils.ZIndexUtils.set('menu', rootMenuRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex['menu'] || PrimeReact__default["default"].zIndex['menu']);
      bindDocumentClickListener();
    } else {
      unbindDocumentClickListener();
      utils.ZIndexUtils.clear(rootMenuRef.current);
    }
  }, [mobileActiveState]);
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(rootMenuRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
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
      var _start = utils.ObjectUtils.getJSXElement(props.start, props);
      var startProps = utils.mergeProps({
        className: cx('start')
      }, ptm('start'));
      return /*#__PURE__*/React__namespace.createElement("div", startProps, _start);
    }
    return null;
  };
  var createEndContent = function createEndContent() {
    if (props.end) {
      var _end = utils.ObjectUtils.getJSXElement(props.end, props);
      var endProps = utils.mergeProps({
        className: cx('end')
      }, ptm('end'));
      return /*#__PURE__*/React__namespace.createElement("div", endProps, _end);
    }
    return null;
  };
  var createMenuButton = function createMenuButton() {
    if (props.model && props.model.length < 1) {
      return null;
    }
    var buttonProps = utils.mergeProps({
      ref: menuButtonRef,
      href: '#',
      role: 'button',
      tabIndex: 0,
      className: cx('button'),
      onClick: function onClick(e) {
        return toggle(e);
      }
    }, ptm('button'));
    var popupIconProps = utils.mergeProps(ptm('popupIcon'));
    var icon = props.menuIcon || /*#__PURE__*/React__namespace.createElement(bars.BarsIcon, popupIconProps);
    var menuIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, popupIconProps), {
      props: props
    });

    /* eslint-disable */
    var button = /*#__PURE__*/React__namespace.createElement("a", buttonProps, menuIcon);
    /* eslint-enable */

    return button;
  };
  var start = createStartContent();
  var end = createEndContent();
  var menuButton = createMenuButton();
  var submenu = /*#__PURE__*/React__namespace.createElement(MenubarSub, {
    hostName: "Menubar",
    id: idState,
    ref: rootMenuRef,
    menuProps: props,
    model: props.model,
    root: true,
    mobileActive: mobileActiveState,
    onLeafClick: onLeafClick,
    submenuIcon: props.submenuIcon,
    ptm: ptm,
    cx: cx
  });
  var rootProps = utils.mergeProps({
    id: props.id,
    className: utils.classNames(props.className, cx('root', {
      mobileActiveState: mobileActiveState
    })),
    style: props.style
  }, MenubarBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, start, menuButton, submenu, end);
}));
Menubar.displayName = 'Menubar';

exports.Menubar = Menubar;
