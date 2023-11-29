import * as React from 'react';
import { classNames, ObjectUtils, mergeProps, IconUtils } from 'primereact/utils';
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

var AvatarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Avatar',
    className: null,
    icon: null,
    image: null,
    imageAlt: 'avatar',
    imageFallback: 'default',
    label: null,
    onImageError: null,
    shape: 'square',
    size: 'normal',
    style: null,
    template: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Avatar = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = AvatarBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    imageFailed = _React$useState2[0],
    setImageFailed = _React$useState2[1];
  var _AvatarBase$setMetaDa = AvatarBase.setMetaData({
      props: props,
      state: {
        imageFailed: imageFailed
      }
    }),
    ptm = _AvatarBase$setMetaDa.ptm;
  var createContent = function createContent() {
    if (ObjectUtils.isNotEmpty(props.image) && !imageFailed) {
      var imageProps = mergeProps({
        src: props.image,
        onError: onImageError
      }, ptm('image'));
      return /*#__PURE__*/React.createElement("img", _extends({
        alt: props.imageAlt
      }, imageProps));
    } else if (props.label) {
      var labelProps = mergeProps({
        className: 'p-avatar-text'
      }, ptm('label'));
      return /*#__PURE__*/React.createElement("span", labelProps, props.label);
    } else if (props.icon) {
      var iconProps = mergeProps({
        className: 'p-avatar-icon'
      }, ptm('icon'));
      return IconUtils.getJSXIcon(props.icon, _objectSpread({}, iconProps), {
        props: props
      });
    }
    return null;
  };
  var onImageError = function onImageError(event) {
    if (props.imageFallback === 'default') {
      if (!props.onImageError) {
        // fallback to label or icon
        setImageFailed(true);
        event.target.src = null;
      }
    } else {
      // try fallback as an image
      event.target.src = props.imageFallback;
    }
    props.onImageError && props.onImageError(event);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var containerClassName = classNames('p-avatar p-component', {
    'p-avatar-image': ObjectUtils.isNotEmpty(props.image) && !imageFailed,
    'p-avatar-circle': props.shape === 'circle',
    'p-avatar-lg': props.size === 'large',
    'p-avatar-xl': props.size === 'xlarge',
    'p-avatar-clickable': !!props.onClick
  }, props.className);
  var rootProps = mergeProps({
    ref: elementRef,
    style: props.style,
    className: containerClassName
  }, AvatarBase.getOtherProps(props), ptm('root'));
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : createContent();
  return /*#__PURE__*/React.createElement("div", rootProps, content, props.children);
});
Avatar.displayName = 'Avatar';

export { Avatar };
