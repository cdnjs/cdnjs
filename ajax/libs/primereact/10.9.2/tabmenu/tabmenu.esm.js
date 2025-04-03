'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useMountEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { classNames, UniqueComponentId, DomHandler, IconUtils, ObjectUtils } from 'primereact/utils';

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
  icon: function icon(_ref) {
    var _icon = _ref._icon;
    return classNames('p-menuitem-icon', _icon);
  },
  label: 'p-menuitem-text',
  action: 'p-menuitem-link',
  menuitem: function menuitem(_ref2) {
    var _className = _ref2._className,
      active = _ref2.active,
      disabled = _ref2.disabled;
    return classNames('p-tabmenuitem', {
      'p-highlight': active,
      'p-disabled': disabled
    }, _className);
  },
  inkbar: 'p-tabmenu-ink-bar',
  menu: 'p-tabmenu-nav p-reset',
  root: 'p-tabmenu p-component'
};
var styles = "\n@layer primereact {\n    .p-tabmenu {\n        overflow-x: auto;\n    }\n\n    .p-tabmenu-nav {\n        display: flex;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        flex-wrap: nowrap;\n    }\n\n    .p-tabmenu-nav a {\n        cursor: pointer;\n        user-select: none;\n        display: flex;\n        align-items: center;\n        position: relative;\n        text-decoration: none;\n        text-decoration: none;\n        overflow: hidden;\n    }\n\n    .p-tabmenu-nav a:focus {\n        z-index: 1;\n    }\n\n    .p-tabmenu-nav .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-tabmenu-ink-bar {\n        display: none;\n        z-index: 1;\n    }\n\n    .p-tabmenu::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
var TabMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TabMenu',
    id: null,
    model: null,
    activeIndex: 0,
    ariaLabel: null,
    ariaLabelledBy: null,
    style: null,
    className: null,
    onTabChange: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TabMenu = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = TabMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(props.activeIndex),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    activeIndexState = _React$useState4[0],
    setActiveIndexState = _React$useState4[1];
  var elementRef = React.useRef(null);
  var inkbarRef = React.useRef(null);
  var navRef = React.useRef(null);
  var tabsRef = React.useRef({});
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var metaData = {
    props: props,
    state: {
      id: idState,
      activeIndex: activeIndex
    }
  };
  var _TabMenuBase$setMetaD = TabMenuBase.setMetaData(_objectSpread({}, metaData)),
    ptm = _TabMenuBase$setMetaD.ptm,
    cx = _TabMenuBase$setMetaD.cx,
    isUnstyled = _TabMenuBase$setMetaD.isUnstyled;
  var getPTOptions = function getPTOptions(key, item, index) {
    return ptm(key, {
      parent: metaData,
      context: {
        item: item,
        index: index
      }
    });
  };
  useHandleStyle(TabMenuBase.css.styles, isUnstyled, {
    name: 'tabmenu'
  });
  var itemClick = function itemClick(event, item, index) {
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
    if (props.onTabChange) {
      props.onTabChange({
        originalEvent: event,
        value: item,
        index: index
      });
    } else {
      setActiveIndexState(index);
    }
    if (!item.url) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var isSelected = function isSelected(index) {
    return index === (activeIndex || 0);
  };
  var updateInkBar = function updateInkBar() {
    if (props.model) {
      var tabs = navRef.current.children;
      var inkHighlighted = false;
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (DomHandler.getAttribute(tab, 'data-p-highlight')) {
          inkbarRef.current.style.width = DomHandler.getWidth(tab) + 'px';
          inkbarRef.current.style.left = DomHandler.getOffset(tab).left - DomHandler.getOffset(navRef.current).left + 'px';
          inkHighlighted = true;
        }
      }
      if (!inkHighlighted) {
        inkbarRef.current.style.width = '0px';
        inkbarRef.current.style.left = '0px';
      }
    }
  };
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
    updateInkBar();
  });
  var onKeyDownItem = function onKeyDownItem(event, item, index) {
    switch (event.code) {
      case 'ArrowRight':
        navigateToNextItem(event.target);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        navigateToPrevItem(event.target);
        event.preventDefault();
        break;
      case 'Home':
        navigateToFirstItem(event.target);
        event.preventDefault();
        break;
      case 'End':
        navigateToLastItem(event.target);
        event.preventDefault();
        break;
      case 'Space':
      case 'Enter':
      case 'NumpadEnter':
        itemClick(event, item, index);
        event.preventDefault();
        break;
      case 'Tab':
        onTabKey();
        break;
    }
  };
  var navigateToNextItem = function navigateToNextItem(target) {
    var nextItem = _findNextItem(target);
    nextItem && setFocusToMenuitem(target, nextItem);
  };
  var navigateToPrevItem = function navigateToPrevItem(target) {
    var prevItem = _findPrevItem(target);
    prevItem && setFocusToMenuitem(target, prevItem);
  };
  var navigateToFirstItem = function navigateToFirstItem(target) {
    var firstItem = findFirstItem();
    firstItem && setFocusToMenuitem(target, firstItem);
  };
  var navigateToLastItem = function navigateToLastItem(target) {
    var lastItem = findLastItem();
    lastItem && setFocusToMenuitem(target, lastItem);
  };
  var _findNextItem = function findNextItem(item) {
    var nextItem = item.parentElement.nextElementSibling;
    return nextItem ? DomHandler.getAttribute(nextItem, 'data-p-disabled') === true ? _findNextItem(nextItem.children[0]) : nextItem.children[0] : null;
  };
  var _findPrevItem = function findPrevItem(item) {
    var prevItem = item.parentElement.previousElementSibling;
    return prevItem ? DomHandler.getAttribute(prevItem, 'data-p-disabled') === true ? _findPrevItem(prevItem.children[0]) : prevItem.children[0] : null;
  };
  var findFirstItem = function findFirstItem() {
    var firstSibling = DomHandler.findSingle(navRef.current, '[data-pc-section="menuitem"][data-p-disabled="false"]');
    return firstSibling ? firstSibling.children[0] : null;
  };
  var findLastItem = function findLastItem() {
    var siblings = DomHandler.find(navRef.current, '[data-pc-section="menuitem"][data-p-disabled="false"]');
    return siblings ? siblings[siblings.length - 1].children[0] : null;
  };
  var setFocusToMenuitem = function setFocusToMenuitem(target, focusableItem) {
    target.tabIndex = '-1';
    focusableItem.tabIndex = '0';
    focusableItem.focus();
  };
  var onTabKey = function onTabKey() {
    var activeItem = DomHandler.findSingle(navRef.current, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');
    var focusedItem = DomHandler.findSingle(navRef.current, '[data-pc-section="action"][tabindex="0"]');
    if (focusedItem !== activeItem.children[0]) {
      activeItem && (activeItem.children[0].tabIndex = '0');
      focusedItem.tabIndex = '-1';
    }
  };
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var _className = item.className,
      style = item.style,
      disabled = item.disabled,
      _icon = item.icon,
      _label = item.label,
      template = item.template,
      url = item.url,
      target = item.target;
    var key = item.id || idState + '_' + index;
    var active = isSelected(index);
    var iconClassName = classNames('p-menuitem-icon', _icon);
    var iconProps = mergeProps({
      className: cx('icon', {
        _icon: _icon
      })
    }, getPTOptions('icon', item, index));
    var icon = IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: cx('label')
    }, getPTOptions('label', item, index));
    var label = _label && /*#__PURE__*/React.createElement("span", labelProps, _label);
    var actionProps = mergeProps({
      href: url || '#',
      role: 'menuitem',
      'aria-label': _label,
      tabIndex: active ? '0' : '-1',
      className: cx('action'),
      target: target,
      onClick: function onClick(event) {
        return itemClick(event, item, index);
      }
    }, getPTOptions('action', item, index));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, /*#__PURE__*/React.createElement(Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        },
        className: 'p-menuitem-link',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        element: content,
        props: props,
        active: active,
        index: index,
        disabled: disabled
      };
      content = ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    var menuItemProps = mergeProps({
      ref: tabsRef.current["tab_".concat(index)],
      id: key,
      onKeyDown: function onKeyDown(event) {
        return onKeyDownItem(event, item, index);
      },
      className: cx('menuitem', {
        _className: _className,
        active: active,
        disabled: disabled
      }),
      style: style,
      role: 'presentation',
      'data-p-highlight': active,
      'data-p-disabled': disabled || false,
      'aria-disabled': disabled
    }, getPTOptions('menuitem', item, index));
    return /*#__PURE__*/React.createElement("li", _extends({}, menuItemProps, {
      key: key
    }), content);
  };
  var createItems = function createItems() {
    return props.model.map(createMenuItem);
  };
  if (props.model) {
    var items = createItems();
    var inkbarProps = mergeProps({
      ref: inkbarRef,
      role: 'none',
      className: cx('inkbar')
    }, ptm('inkbar'));
    var menuProps = mergeProps({
      ref: navRef,
      'aria-label': props.ariaLabel,
      'aria-labelledby': props.ariaLabelledBy,
      className: cx('menu'),
      role: 'menubar'
    }, ptm('menu'));
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: classNames(props.className, cx('root')),
      style: props.style
    }, TabMenuBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("ul", menuProps, items, /*#__PURE__*/React.createElement("li", inkbarProps)));
  }
  return null;
}));
TabMenu.displayName = 'TabMenu';

export { TabMenu };
