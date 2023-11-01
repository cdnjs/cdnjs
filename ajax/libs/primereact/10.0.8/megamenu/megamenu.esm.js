'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMatchMedia, useEventListener, useResizeListener, useMountEffect, useUpdateEffect } from 'primereact/hooks';
import { AngleDownIcon } from 'primereact/icons/angledown';
import { AngleRightIcon } from 'primereact/icons/angleright';
import { BarsIcon } from 'primereact/icons/bars';
import { Ripple } from 'primereact/ripple';
import { classNames, UniqueComponentId, DomHandler, ZIndexUtils, mergeProps, ObjectUtils, IconUtils } from 'primereact/utils';

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

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      mobileActiveState = _ref.mobileActiveState;
    return classNames('p-megamenu p-component', {
      'p-megamenu-horizontal': props.orientation === 'horizontal',
      'p-megamenu-vertical': props.orientation === 'vertical',
      'p-megamenu-mobile-active': mobileActiveState
    });
  },
  separator: 'p-menu-separator',
  submenuIcon: 'p-submenu-icon',
  action: function action(_ref2) {
    var item = _ref2.item;
    return classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  submenuItem: 'p-menuitem',
  submenuHeader: function submenuHeader(_ref3) {
    var submenu = _ref3.submenu;
    return classNames('p-megamenu-submenu-header', {
      'p-disabled': submenu.disabled
    });
  },
  submenu: 'p-megamenu-submenu',
  panel: 'p-megamenu-panel',
  grid: 'p-megamenu-grid',
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text',
  column: function column(_ref4) {
    var category = _ref4.category;
    var length = category.items ? category.items.length : 0;
    var columnClass;
    switch (length) {
      case 2:
        columnClass = 'p-megamenu-col-6';
        break;
      case 3:
        columnClass = 'p-megamenu-col-4';
        break;
      case 4:
        columnClass = 'p-megamenu-col-3';
        break;
      case 6:
        columnClass = 'p-megamenu-col-2';
        break;
      default:
        columnClass = 'p-megamenu-col-12';
        break;
    }
    return columnClass;
  },
  headerAction: function headerAction(_ref5) {
    var category = _ref5.category;
    return classNames('p-menuitem-link', {
      'p-disabled': category.disabled
    });
  },
  menuButton: 'p-megamenu-button',
  menuitem: function menuitem(_ref6) {
    var category = _ref6.category,
      activeItemState = _ref6.activeItemState;
    return classNames('p-menuitem', {
      'p-menuitem-active': category === activeItemState
    });
  },
  menubar: 'p-megamenu-root-list',
  menu: 'p-megamenu-root-list',
  start: 'p-megamenu-start',
  end: 'p-megamenu-end'
};
var styles = "\n@layer primereact {\n    .p-megamenu {\n        display: flex;\n    }\n    \n    .p-megamenu-root-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    .p-megamenu-root-list > .p-menuitem {\n        position: relative;\n    }\n    \n    .p-megamenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-megamenu .p-menuitem-text {\n        line-height: 1;\n    }\n    \n    .p-megamenu-panel {\n        display: none;\n        position: absolute;\n        width: auto;\n        z-index: 1;\n    }\n    \n    .p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n        display: block;\n    }\n    \n    .p-megamenu-submenu {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    /* Horizontal */\n    .p-megamenu-horizontal {\n        align-items: center;\n    }\n    \n    .p-megamenu-horizontal .p-megamenu-root-list {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-megamenu-horizontal .p-megamenu-custom,\n    .p-megamenu-horizontal .p-megamenu-end {\n        margin-left: auto;\n        align-self: center;\n    }\n    \n    /* Vertical */\n    .p-megamenu-vertical {\n        flex-direction: column;\n    }\n    \n    .p-megamenu-vertical .p-megamenu-root-list {\n        flex-direction: column;\n    }\n    \n    .p-megamenu-vertical .p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n        left: 100%;\n        top: 0;\n    }\n    \n    .p-megamenu-vertical .p-megamenu-root-list > .p-menuitem > .p-menuitem-link > .p-submenu-icon {\n        margin-left: auto;\n    }\n    \n    .p-megamenu-grid {\n        display: flex;\n    }\n    \n    .p-megamenu-col-2,\n    .p-megamenu-col-3,\n    .p-megamenu-col-4,\n    .p-megamenu-col-6,\n    .p-megamenu-col-12 {\n        flex: 0 0 auto;\n        padding: 0.5rem;\n    }\n    \n    .p-megamenu-col-2 {\n        width: 16.6667%;\n    }\n    \n    .p-megamenu-col-3 {\n        width: 25%;\n    }\n    \n    .p-megamenu-col-4 {\n        width: 33.3333%;\n    }\n    \n    .p-megamenu-col-6 {\n        width: 50%;\n    }\n    \n    .p-megamenu-col-12 {\n        width: 100%;\n    }\n    \n    .p-megamenu-button {\n        display: none;\n        cursor: pointer;\n        align-items: center;\n        justify-content: center;\n        text-decoration: none;\n    }\n}\n";
var MegaMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'MegaMenu',
    id: null,
    model: null,
    style: null,
    className: null,
    orientation: 'horizontal',
    breakpoint: undefined,
    scrollHeight: '400px',
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

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MegaMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = MegaMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    activeItemState = _React$useState4[0],
    setActiveItemState = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    attributeSelectorState = _React$useState6[0],
    setAttributeSelectorState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    mobileActiveState = _React$useState8[0],
    setMobileActiveState = _React$useState8[1];
  var elementRef = React.useRef(null);
  var styleElementRef = React.useRef(null);
  var menuButtonRef = React.useRef(null);
  var horizontal = props.orientation === 'horizontal';
  var vertical = props.orientation === 'vertical';
  var isMobileMode = useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
  var _MegaMenuBase$setMeta = MegaMenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        activeItem: activeItemState,
        attributeSelector: attributeSelectorState,
        mobileActive: mobileActiveState
      }
    }),
    ptm = _MegaMenuBase$setMeta.ptm,
    cx = _MegaMenuBase$setMeta.cx,
    isUnstyled = _MegaMenuBase$setMeta.isUnstyled;
  useHandleStyle(MegaMenuBase.css.styles, isUnstyled, {
    name: 'megamenu'
  });
  var getPTOptions = function getPTOptions(item, key, index) {
    return ptm(key, {
      context: {
        active: activeItemState === item,
        item: item,
        index: index
      }
    });
  };
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if ((!isMobileMode || mobileActiveState) && isOutsideClicked(event)) {
          setActiveItemState(null);
          setMobileActiveState(false);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindDocumentClickListener = _useEventListener2[0];
  var _useResizeListener = useResizeListener({
      listener: function listener() {
        if (!isMobileMode || mobileActiveState) {
          setActiveItemState(null);
          setMobileActiveState(false);
        }
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
    bindDocumentResizeListener = _useResizeListener2[0];
  var onLeafClick = function onLeafClick(event, item) {
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
    setActiveItemState(null);
    setMobileActiveState(false);
  };
  var onCategoryMouseEnter = function onCategoryMouseEnter(event, item) {
    if (item.disabled || isMobileMode) {
      event.preventDefault();
      return;
    }
    if (activeItemState) {
      setActiveItemState(item);
    }
  };
  var onCategoryClick = function onCategoryClick(event, item) {
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
        item: props.item
      });
      event.preventDefault();
    }
    if (item.items) {
      activeItemState && activeItemState === item ? setActiveItemState(null) : setActiveItemState(item);
      event.preventDefault();
    }
  };
  var onCategoryKeyDown = function onCategoryKeyDown(event, item) {
    var listItem = event.currentTarget.parentElement;
    switch (event.which) {
      //down
      case 40:
        horizontal ? expandMenu(item) : navigateToNextItem(listItem);
        event.preventDefault();
        break;

      //up
      case 38:
        vertical ? navigateToPrevItem(listItem) : item.items && item === activeItemState && collapseMenu();
        event.preventDefault();
        break;

      //right
      case 39:
        horizontal ? navigateToNextItem(listItem) : expandMenu(item);
        event.preventDefault();
        break;

      //left
      case 37:
        horizontal ? navigateToPrevItem(listItem) : item.items && item === activeItemState && collapseMenu();
        event.preventDefault();
        break;
    }
  };
  var expandMenu = function expandMenu(item) {
    if (item.items) {
      setActiveItemState(item);
    }
  };
  var collapseMenu = function collapseMenu(item) {
    setActiveItemState(null);
  };
  var toggle = function toggle(event) {
    event.preventDefault();
    setMobileActiveState(function (prevMobileActive) {
      return !prevMobileActive;
    });
    setActiveItemState(null);
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.getAttribute(nextItem, '[data-p-disabled="true"]') || !DomHandler.getAttribute(nextItem, '[data-pc-section="menuitem"]') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.getAttribute(prevItem, '[data-p-disabled="true"]') || !DomHandler.getAttribute(prevItem, '[data-pc-section="menuitem"]') ? findPrevItem(prevItem) : prevItem : null;
  };
  var navigateToNextItem = function navigateToNextItem(listItem) {
    var nextItem = findNextItem(listItem);
    nextItem && nextItem.children[0].focus();
  };
  var navigateToPrevItem = function navigateToPrevItem(listItem) {
    var prevItem = findPrevItem(listItem);
    prevItem && prevItem.children[0].focus();
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target) || menuButtonRef.current && menuButtonRef.current.contains(event.target));
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    var uniqueId = UniqueComponentId();
    !idState && setIdState(uniqueId);
    if (props.breakpoint) {
      !attributeSelectorState && setAttributeSelectorState(uniqueId);
    }
    bindDocumentClickListener();
    bindDocumentResizeListener();
  });
  useUpdateEffect(function () {
    var currentPanel = DomHandler.findSingle(elementRef.current, '.p-menuitem-active > .p-megamenu-panel');
    if (activeItemState && !isMobileMode) {
      ZIndexUtils.set('menu', currentPanel, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
    }
    if (isMobileMode) {
      currentPanel && currentPanel.previousElementSibling.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
    return function () {
      ZIndexUtils.clear(currentPanel);
    };
  }, [activeItemState]);
  var createSeparator = function createSeparator(index) {
    var key = idState + '_separator__' + index;
    var separatorProps = mergeProps({
      id: key,
      key: key,
      className: cx('separator'),
      role: 'separator'
    }, ptm('separator'));
    return /*#__PURE__*/React.createElement("li", separatorProps);
  };
  var createSubmenuIcon = function createSubmenuIcon(item) {
    if (item.items) {
      var submenuIconProps = mergeProps({
        className: cx('submenuIcon')
      }, ptm('submenuIcon'));
      var icon = vertical ? props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React.createElement(AngleDownIcon, submenuIconProps);
      var submenuIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, submenuIconProps), {
        props: props
      });
      return submenuIcon;
    }
    return null;
  };
  var createSubmenuItem = function createSubmenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    if (item.separator) {
      return createSeparator(index);
    } else {
      var key = item.id || idState + '_' + index;
      var linkClassName = classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconProps = mergeProps({
        className: classNames(item.icon, cx('icon'))
      }, ptm('icon'));
      var labelProps = mergeProps({
        className: cx('label')
      }, ptm('label'));
      var iconClassName = classNames(item.icon, 'p-menuitem-icon');
      var icon = IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
        props: props
      });
      var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
      var actionProps = mergeProps({
        href: item.url || '#',
        className: cx('action', {
          item: item
        }),
        target: item.target,
        onClick: function onClick(event) {
          return onLeafClick(event, item);
        },
        role: 'menuitem',
        'aria-disabled': item.disabled
      }, getPTOptions(item, 'action', index));
      var submenuItemProps = mergeProps({
        key: key,
        id: key,
        className: classNames(item.className, cx('submenuItem')),
        style: item.style,
        role: 'none'
      }, getPTOptions(item, 'submenuItem', index));
      var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, /*#__PURE__*/React.createElement(Ripple, null));
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return onLeafClick(event, item);
          },
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: props
        };
        content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      return /*#__PURE__*/React.createElement("li", submenuItemProps, content);
    }
  };
  var createSubmenu = function createSubmenu(submenu, index) {
    if (submenu.visible === false) {
      return null;
    }
    var items = submenu.items.map(createSubmenuItem);
    var key = submenu.id || idState + '_sub_' + index;
    var submenuHeaderProps = mergeProps({
      id: key,
      key: key,
      className: classNames(submenu.className, cx('submenuHeader', {
        submenu: submenu
      })),
      style: submenu.style,
      role: 'presentation',
      'data-p-disabled': submenu.disabled
    }, ptm('submenuHeader'));
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: key
    }, /*#__PURE__*/React.createElement("li", submenuHeaderProps, submenu.label), items);
  };
  var createSubmenus = function createSubmenus(column) {
    return column.map(createSubmenu);
  };
  var createColumn = function createColumn(category, column, index) {
    var key = category.label + '_column_' + index;
    var submenus = createSubmenus(column);
    var columnProps = mergeProps({
      key: key,
      className: cx('column', {
        category: category
      })
    }, ptm('column'));
    var submenuProps = mergeProps({
      className: cx('submenu'),
      style: {
        display: activeItemState === category ? 'block' : 'none'
      },
      role: 'menu'
    }, ptm('submenu'));
    return /*#__PURE__*/React.createElement("div", columnProps, /*#__PURE__*/React.createElement("ul", submenuProps, submenus));
  };
  var createColumns = function createColumns(category) {
    if (category.items) {
      return category.items.map(function (column, index) {
        return createColumn(category, column, index);
      });
    }
    return null;
  };
  var createCategoryPanel = function createCategoryPanel(category) {
    if (category.items) {
      var columns = createColumns(category);
      var panelProps = mergeProps({
        className: cx('panel')
      }, ptm('panel'));
      var gridProps = mergeProps({
        className: cx('grid')
      }, ptm('grid'));
      return /*#__PURE__*/React.createElement("div", panelProps, /*#__PURE__*/React.createElement("div", gridProps, columns));
    }
    return null;
  };
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var selector = "".concat(attributeSelectorState);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-megamenu[").concat(selector, "] > .p-megamenu-root-list .p-menuitem-active .p-megamenu-panel {\n        position: relative;\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        background: inherit;\n    }\n\n    .p-megamenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-megamenu[").concat(selector, "] .p-megamenu-grid {\n        flex-wrap: wrap;\n    }\n\n    ").concat(horizontal ? "\n.p-megamenu[".concat(selector, "] .p-megamenu-button {\n    display: flex;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-horizontal {\n    position: relative;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-horizontal .p-megamenu-root-list {\n    display: none;\n}\n\n.p-megamenu-horizontal[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n    width: auto;\n    flex: 1;\n    padding: 0;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-mobile-active .p-megamenu-root-list {\n    display: flex;\n    flex-direction: column;\n    position: absolute;\n    width: 100%;\n    top: 100%;\n    left: 0;\n    z-index: 1;\n}\n        ") : '', "\n\n    ").concat(vertical ? "\n.p-megamenu-vertical[".concat(selector, "] {\n    width: 100%;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-megamenu-root-list {\n    max-height: ").concat(props.scrollHeight, ";\n    overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n}\n.p-megamenu-vertical[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n    width: 100%;\n    padding: 0;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-megamenu-submenu {\n    width: 100%;\n}\n\n.p-megamenu-vertical[").concat(selector, "] div[class*=\"p-megamenu-col-\"] .p-megamenu-submenu-header {\n    background: inherit;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-submenu-icon:before {\n    content: \"\\e930\";\n}\n        ") : '', "\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = DomHandler.removeInlineStyle(styleElementRef.current);
  };
  useUpdateEffect(function () {
    if (attributeSelectorState && elementRef.current) {
      elementRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  var createCategory = function createCategory(category, index) {
    var iconProps = mergeProps({
      className: cx('icon')
    }, getPTOptions(category, 'icon', index));
    var icon = IconUtils.getJSXIcon(category.icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions(category, 'label', index));
    var label = category.label && /*#__PURE__*/React.createElement("span", labelProps, category.label);
    var itemContent = category.template ? ObjectUtils.getJSXElement(category.template, category) : null;
    var submenuIcon = createSubmenuIcon(category);
    var panel = createCategoryPanel(category);
    var headerActionProps = mergeProps({
      href: category.url || '#',
      className: cx('headerAction', {
        category: category
      }),
      target: category.target,
      onClick: function onClick(e) {
        return onCategoryClick(e, category);
      },
      onKeyDown: function onKeyDown(e) {
        return onCategoryKeyDown(e, category);
      },
      role: 'menuitem',
      'aria-haspopup': category.items != null,
      'data-p-disabled': category.disabled
    }, getPTOptions(category, 'headerAction', index));
    var key = category.id || idState + '_cat_' + index;
    var menuItemProps = mergeProps({
      key: key,
      id: key,
      className: classNames(category.className, cx('menuitem', {
        category: category,
        activeItemState: activeItemState
      })),
      style: category.style,
      onMouseEnter: function onMouseEnter(e) {
        return onCategoryMouseEnter(e, category);
      },
      role: 'none',
      'data-p-disabled': category.disabled || false
    }, getPTOptions(category, 'menuitem', index));
    return /*#__PURE__*/React.createElement("li", menuItemProps, /*#__PURE__*/React.createElement("a", headerActionProps, icon, label, itemContent, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null)), panel);
  };
  var createMenu = function createMenu() {
    var menuProps = mergeProps({
      className: cx('menu'),
      role: 'menubar'
    }, ptm('menu'));
    if (props.model) {
      return /*#__PURE__*/React.createElement("ul", menuProps, props.model.map(function (item, index) {
        return createCategory(item, index);
      }));
    }
    return null;
  };
  var createStartContent = function createStartContent() {
    var startProps = mergeProps({
      className: cx('start')
    }, ptm('start'));
    if (props.start) {
      var _start = ObjectUtils.getJSXElement(props.start, props);
      return /*#__PURE__*/React.createElement("div", startProps, _start);
    }
    return null;
  };
  var createEndContent = function createEndContent() {
    var endProps = mergeProps({
      className: cx('end')
    }, ptm('end'));
    if (props.end) {
      var _end = ObjectUtils.getJSXElement(props.end, props);
      return /*#__PURE__*/React.createElement("div", endProps, _end);
    }
    return null;
  };
  var createMenuButton = function createMenuButton() {
    if (props.orientation === 'vertical' || props.model && props.model.length < 1) {
      return null;
    }
    var menuButtonProps = mergeProps({
      className: cx('menuButton'),
      href: '#',
      role: 'button',
      tabIndex: 0,
      onClick: function onClick(e) {
        return toggle(e);
      }
    }, ptm('menuButton'));
    var menuButtonIconProps = mergeProps(ptm('menuButtonIcon'));
    var icon = props.menuIcon || /*#__PURE__*/React.createElement(BarsIcon, menuButtonIconProps);
    var menuIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, menuButtonIconProps), {
      props: props
    });
    /* eslint-disable */
    var button = /*#__PURE__*/React.createElement("a", _extends({
      ref: menuButtonRef
    }, menuButtonProps), menuIcon);
    /* eslint-enable */

    return button;
  };
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root', {
      mobileActiveState: mobileActiveState
    })),
    style: props.style
  }, MegaMenuBase.getOtherProps(props), ptm('root'));
  var menu = createMenu();
  var start = createStartContent();
  var end = createEndContent();
  var menuButton = createMenuButton();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), start, menuButton, menu, end);
}));
MegaMenu.displayName = 'MegaMenu';

export { MegaMenu };
