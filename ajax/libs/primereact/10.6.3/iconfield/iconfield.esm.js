'use client';
import React, { useRef, useContext } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { useMergeProps } from 'primereact/hooks';
import { classNames } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return classNames('p-icon-field', {
      'p-icon-field-right': props.iconPosition === 'right',
      'p-icon-field-left': props.iconPosition === 'left'
    });
  }
};
var IconFieldBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'IconField',
    __parentMetadata: null,
    children: undefined,
    className: null,
    iconPosition: 'right'
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var IconField = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var elementRef = useRef(ref);
  var mergeProps = useMergeProps();
  var context = useContext(PrimeReactContext);
  var props = IconFieldBase.getProps(inProps, context);
  var _IconFieldBase$setMet = IconFieldBase.setMetaData(_objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        iconPosition: props.iconPosition
      }
    })),
    ptm = _IconFieldBase$setMet.ptm,
    cx = _IconFieldBase$setMet.cx;
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root', {
      iconPosition: props.iconPosition
    }))
  }, IconFieldBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", _extends({}, rootProps, {
    ref: elementRef
  }), props.children);
}));
IconField.displayName = 'IconField';

export { IconField };
