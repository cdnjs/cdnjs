'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { classNames, ObjectUtils, IconUtils } from 'primereact/utils';

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
    var props = _ref.props;
    return classNames('p-chip p-component', {
      'p-chip-image': props.image != null
    });
  },
  removeIcon: 'p-chip-remove-icon',
  icon: 'p-chip-icon',
  label: 'p-chip-text'
};
var styles = "\n@layer primereact {\n    .p-chip {\n        display: inline-flex;\n        align-items: center;\n    }\n    \n    .p-chip-text {\n        line-height: 1.5;\n    }\n    \n    .p-chip-icon.pi {\n        line-height: 1.5;\n    }\n    \n    .p-chip .p-chip-remove-icon {\n        line-height: 1.5;\n        cursor: pointer;\n    }\n    \n    .p-chip img {\n        border-radius: 50%;\n    }\n}\n";
var ChipBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Chip',
    label: null,
    icon: null,
    image: null,
    removable: false,
    removeIcon: null,
    className: null,
    style: null,
    template: null,
    imageAlt: 'chip',
    onImageError: null,
    onRemove: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Chip = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ChipBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _ChipBase$setMetaData = ChipBase.setMetaData({
      props: props
    }),
    ptm = _ChipBase$setMetaData.ptm,
    cx = _ChipBase$setMetaData.cx,
    isUnstyled = _ChipBase$setMetaData.isUnstyled;
  useHandleStyle(ChipBase.css.styles, isUnstyled, {
    name: 'chip'
  });
  var onKeyDown = function onKeyDown(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Backspace') {
      close(event);
    }
  };
  var close = function close(event) {
    setVisibleState(false);
    if (props.onRemove) {
      props.onRemove({
        originalEvent: event,
        value: props.label || props.image || props.icon
      });
    }
  };
  var createContent = function createContent() {
    var content = [];
    var removeIconProps = mergeProps({
      key: 'removeIcon',
      role: 'button',
      tabIndex: 0,
      className: cx('removeIcon'),
      onClick: close,
      onKeyDown: onKeyDown
    }, ptm('removeIcon'));
    var icon = props.removeIcon || /*#__PURE__*/React.createElement(TimesCircleIcon, removeIconProps);
    if (props.image) {
      var imageProps = mergeProps({
        key: 'image',
        src: props.image,
        onError: props.onImageError
      }, ptm('image'));
      content.push( /*#__PURE__*/React.createElement("img", _extends({
        alt: props.imageAlt
      }, imageProps)));
    } else if (props.icon) {
      var chipIconProps = mergeProps({
        key: 'icon',
        className: cx('icon')
      }, ptm('icon'));
      content.push(IconUtils.getJSXIcon(props.icon, _objectSpread({}, chipIconProps), {
        props: props
      }));
    }
    if (props.label) {
      var labelProps = mergeProps({
        key: 'label',
        className: cx('label')
      }, ptm('label'));
      content.push( /*#__PURE__*/React.createElement("span", labelProps, props.label));
    }
    if (props.removable) {
      content.push(IconUtils.getJSXIcon(icon, _objectSpread({}, removeIconProps), {
        props: props
      }));
    }
    return content;
  };
  var createElement = function createElement() {
    var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : createContent();
    var rootProps = mergeProps({
      ref: elementRef,
      style: props.style,
      className: classNames(props.className, cx('root')),
      'aria-label': props.label
    }, ChipBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React.createElement("div", rootProps, content);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return visibleState && createElement();
}));
Chip.displayName = 'Chip';

export { Chip };
