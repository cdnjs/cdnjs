import * as React from 'react';
import { classNames, ObjectUtils, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

var BadgeBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Badge',
    value: null,
    severity: null,
    size: null,
    style: null,
    className: null,
    children: undefined
  }
});

var Badge = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = BadgeBase.getProps(inProps, context);
  var _BadgeBase$setMetaDat = BadgeBase.setMetaData({
      props: props
    }),
    ptm = _BadgeBase$setMetaDat.ptm;
  var elementRef = React.useRef(null);
  var className = classNames('p-badge p-component', _defineProperty({
    'p-badge-no-gutter': ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
    'p-badge-dot': ObjectUtils.isEmpty(props.value),
    'p-badge-lg': props.size === 'large',
    'p-badge-xl': props.size === 'xlarge'
  }, "p-badge-".concat(props.severity), props.severity !== null), props.className);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    ref: elementRef,
    style: props.style,
    className: className
  }, BadgeBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, props.value);
}));
Badge.displayName = 'Badge';

export { Badge };
