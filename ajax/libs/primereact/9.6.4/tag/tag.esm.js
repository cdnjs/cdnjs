import * as React from 'react';
import { classNames, mergeProps, IconUtils } from 'primereact/utils';
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

var TagBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Tag',
    value: null,
    severity: null,
    rounded: false,
    icon: null,
    style: null,
    className: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Tag = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = TagBase.getProps(inProps, context);
  var _TagBase$setMetaData = TagBase.setMetaData({
      props: props
    }),
    ptm = _TagBase$setMetaData.ptm;
  var elementRef = React.useRef(null);
  var className = classNames('p-tag p-component', _defineProperty(_defineProperty({}, "p-tag-".concat(props.severity), props.severity !== null), 'p-tag-rounded', props.rounded), props.className);
  var iconProps = mergeProps({
    className: 'p-tag-icon'
  }, ptm('icon'));
  var icon = IconUtils.getJSXIcon(props.icon, _objectSpread({}, iconProps), {
    props: props
  });
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
    className: className,
    style: props.style
  }, TagBase.getOtherProps(props), ptm('root'));
  var valueProps = mergeProps({
    className: 'p-tag-value'
  }, ptm('value'));
  return /*#__PURE__*/React.createElement("span", rootProps, icon, /*#__PURE__*/React.createElement("span", valueProps, props.value), /*#__PURE__*/React.createElement("span", null, props.children));
});
Tag.displayName = 'Tag';

export { Tag };
