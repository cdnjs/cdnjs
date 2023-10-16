'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMountEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { classNames, UniqueComponentId, mergeProps, ObjectUtils, IconUtils } from 'primereact/utils';

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
  icon: 'p-dock-action-icon',
  action: function action(_ref) {
    var disabled = _ref.disabled;
    return classNames('p-dock-action', {
      'p-disabled': disabled
    });
  },
  menuitem: function menuitem(_ref2) {
    var currentIndexState = _ref2.currentIndexState,
      index = _ref2.index;
    return classNames('p-dock-item', {
      'p-dock-item-second-prev': currentIndexState - 2 === index,
      'p-dock-item-prev': currentIndexState - 1 === index,
      'p-dock-item-current': currentIndexState === index,
      'p-dock-item-next': currentIndexState + 1 === index,
      'p-dock-item-second-next': currentIndexState + 2 === index
    });
  },
  header: 'p-dock-header',
  menu: 'p-dock-list',
  footer: 'p-dock-footer',
  root: function root(_ref3) {
    var props = _ref3.props;
    return classNames("p-dock p-component p-dock-".concat(props.position), {
      'p-dock-magnification': props.magnification
    });
  },
  container: 'p-dock-container'
};
var styles = "\n@layer primereact {\n    .p-dock {\n        position: absolute;\n        z-index: 1;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        pointer-events: none;\n    }\n    \n    .p-dock-container {\n        display: flex;\n        pointer-events: auto;\n    }\n    \n    .p-dock-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        pointer-events: auto;\n    }\n    \n    .p-dock-magnification .p-dock-item {\n        transition: all .2s cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: transform;\n    }\n    \n    .p-dock-action {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        overflow: hidden;\n        cursor: default;\n    }\n    \n    .p-dock-magnification .p-dock-item-second-prev,\n    .p-dock-magnification .p-dock-item-second-next {\n        transform: scale(1.2);\n    }\n    \n    .p-dock-magnification .p-dock-item-prev,\n    .p-dock-magnification .p-dock-item-next {\n        transform: scale(1.4);\n    }\n    \n    .p-dock-magnification .p-dock-item-current {\n        transform: scale(1.6);\n        z-index: 1;\n    }\n    \n    /* Position */\n    /* top */\n    .p-dock-top {\n        left: 0;\n        top: 0;\n        width: 100%;\n    }\n    \n    .p-dock-top.p-dock-magnification .p-dock-item {\n        transform-origin: center top;\n    }\n    \n    .p-dock-top .p-dock-container {\n        flex-direction: column-reverse;\n    }\n    \n    /* bottom */\n    .p-dock-bottom {\n        left: 0;\n        bottom: 0;\n        width: 100%;\n    }\n    \n    .p-dock-bottom.p-dock-magnification .p-dock-item {\n        transform-origin: center bottom;\n    }\n    \n    .p-dock-bottom .p-dock-container {\n        flex-direction: column;\n    }\n    \n    /* right */\n    .p-dock-right {\n        right: 0;\n        top: 0;\n        height: 100%;\n    }\n    \n    .p-dock-right.p-dock-magnification .p-dock-item {\n        transform-origin: center right;\n    }\n    \n    .p-dock-right .p-dock-list {\n        flex-direction: column;\n    }\n    \n    /* left */\n    .p-dock-left {\n        left: 0;\n        top: 0;\n        height: 100%;\n    }\n    \n    .p-dock-left.p-dock-magnification .p-dock-item {\n        transform-origin: center left;\n    }\n    \n    .p-dock-left .p-dock-list {\n        flex-direction: column;\n    }\n    \n    .p-dock-left .p-dock-container {\n        flex-direction: row-reverse;\n    }\n}\n";
var DockBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Dock',
    id: null,
    style: null,
    className: null,
    model: null,
    position: 'bottom',
    magnification: true,
    header: null,
    footer: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Dock = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var _React$useState = React.useState(-3),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    currentIndexState = _React$useState2[0],
    setCurrentIndexState = _React$useState2[1];
  var context = React.useContext(PrimeReactContext);
  var props = DockBase.getProps(inProps, context);
  var _React$useState3 = React.useState(props.id),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    idState = _React$useState4[0],
    setIdState = _React$useState4[1];
  var _DockBase$setMetaData = DockBase.setMetaData({
      props: props,
      state: {
        id: idState,
        currentIndex: currentIndexState
      }
    }),
    ptm = _DockBase$setMetaData.ptm,
    cx = _DockBase$setMetaData.cx,
    isUnstyled = _DockBase$setMetaData.isUnstyled;
  var elementRef = React.useRef(null);
  useHandleStyle(DockBase.css.styles, isUnstyled, {
    name: 'dock'
  });
  var getPTOptions = function getPTOptions(key, item, index) {
    return ptm(key, {
      context: {
        index: index,
        item: item
      }
    });
  };
  var onListMouseLeave = function onListMouseLeave() {
    setCurrentIndexState(-3);
  };
  var onItemMouseEnter = function onItemMouseEnter(index) {
    setCurrentIndexState(index);
  };
  var onItemClick = function onItemClick(e, item) {
    if (item.command) {
      item.command({
        originalEvent: e,
        item: item
      });
    }
    e.preventDefault();
  };
  var createItem = function createItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var disabled = item.disabled,
      _icon = item.icon,
      label = item.label,
      template = item.template,
      url = item.url,
      target = item.target;
    var key = item.id || idState + '_' + index;
    var contentClassName = classNames('p-dock-action', {
      'p-disabled': disabled
    });
    var iconClassName = classNames('p-dock-action-icon', _icon);
    var iconProps = mergeProps({
      className: cx('icon')
    }, getPTOptions('icon', item, index));
    var icon = IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
      props: props
    });
    var actionProps = mergeProps({
      href: url || '#',
      role: 'menuitem',
      className: cx('action', {
        disabled: disabled
      }),
      target: target,
      'data-pr-tooltip': label,
      onClick: function onClick(e) {
        return onItemClick(e, item);
      }
    }, getPTOptions('action', item, index));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, /*#__PURE__*/React.createElement(Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(e) {
          return onItemClick(e, item);
        },
        className: contentClassName,
        iconClassName: iconClassName,
        element: content,
        props: props,
        index: index
      };
      content = ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      id: key,
      key: key,
      className: cx('menuitem', {
        currentIndexState: currentIndexState,
        index: index
      }),
      role: 'none',
      onMouseEnter: function onMouseEnter() {
        return onItemMouseEnter(index);
      }
    }, getPTOptions('menuitem', item, index));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var _header = ObjectUtils.getJSXElement(props.header, {
        props: props
      });
      var headerProps = mergeProps({
        className: cx('header')
      }, ptm('header'));
      return /*#__PURE__*/React.createElement("div", headerProps, _header);
    }
    return null;
  };
  var createList = function createList() {
    var items = createItems();
    var menuProps = mergeProps({
      className: cx('menu'),
      role: 'menu',
      onMouseLeave: onListMouseLeave
    }, ptm('menu'));
    return /*#__PURE__*/React.createElement("ul", menuProps, items);
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var _footer = ObjectUtils.getJSXElement(props.footer, {
        props: props
      });
      var footerProps = mergeProps({
        className: cx('footer')
      }, ptm('footer'));
      return /*#__PURE__*/React.createElement("div", footerProps, _footer);
    }
    return null;
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
  var header = createHeader();
  var list = createList();
  var footer = createFooter();
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root')),
    style: props.style
  }, DockBase.getOtherProps(props), ptm('root'));
  var containerProps = mergeProps({
    className: cx('container')
  }, ptm('container'));
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), /*#__PURE__*/React.createElement("div", containerProps, header, list, footer));
}));
Dock.displayName = 'Dock';

export { Dock };
