import * as React from 'react';
import { Ripple } from 'primereact/ripple';
import { classNames, mergeProps, DomHandler, IconUtils, ObjectUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

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

var TabMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TabMenu',
    id: null,
    model: null,
    activeIndex: 0,
    style: null,
    className: null,
    onTabChange: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TabMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = TabMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(props.activeIndex),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeIndexState = _React$useState2[0],
    setActiveIndexState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var inkbarRef = React.useRef(null);
  var navRef = React.useRef(null);
  var tabsRef = React.useRef({});
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var _TabMenuBase$setMetaD = TabMenuBase.setMetaData({
      props: props,
      state: {
        activeIndex: activeIndexState
      }
    }),
    ptm = _TabMenuBase$setMetaD.ptm;
  var itemClick = function itemClick(event, item, index) {
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
    if (props.onTabChange) {
      props.onTabChange({
        originalEvent: event,
        value: item,
        index: index
      });
    } else {
      setActiveIndexState(index);
    }
  };
  var isSelected = function isSelected(index) {
    return index === (activeIndex || 0);
  };
  var updateInkBar = function updateInkBar() {
    if (props.model) {
      var tabHeader = tabsRef.current["tab_".concat(activeIndex)];
      inkbarRef.current.style.width = DomHandler.getWidth(tabHeader) + 'px';
      inkbarRef.current.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(navRef.current).left + 'px';
    }
  };
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
    var key = _label + '_' + index;
    var active = isSelected(index);
    var className = classNames('p-tabmenuitem', {
      'p-highlight': active,
      'p-disabled': disabled
    }, _className);
    var iconClassName = classNames('p-menuitem-icon', _icon);
    var iconProps = mergeProps({
      className: iconClassName
    }, ptm('icon'));
    var icon = IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: 'p-menuitem-text'
    }, ptm('label'));
    var label = _label && /*#__PURE__*/React.createElement("span", labelProps, _label);
    var actionProps = mergeProps({
      href: url || '#',
      className: 'p-menuitem-link',
      target: target,
      onClick: function onClick(event) {
        return itemClick(event, item, index);
      },
      role: 'presentation'
    }, ptm('action'));
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
      key: key,
      className: className,
      style: style,
      role: 'tab',
      'aria-selected': active,
      'aria-expanded': active,
      'aria-disabled': disabled
    }, ptm('menuitem'));
    return /*#__PURE__*/React.createElement("li", menuItemProps, content);
  };
  var createItems = function createItems() {
    return props.model.map(createMenuItem);
  };
  if (props.model) {
    var className = classNames('p-tabmenu p-component', props.className);
    var items = createItems();
    var inkbarProps = mergeProps({
      ref: inkbarRef,
      className: 'p-tabmenu-ink-bar'
    }, ptm('inkbar'));
    var menuProps = mergeProps({
      ref: navRef,
      className: 'p-tabmenu-nav p-reset',
      role: 'tablist'
    }, ptm('menu'));
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, TabMenuBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("ul", menuProps, items, /*#__PURE__*/React.createElement("li", inkbarProps)));
  }
  return null;
}));
TabMenu.displayName = 'TabMenu';

export { TabMenu };
