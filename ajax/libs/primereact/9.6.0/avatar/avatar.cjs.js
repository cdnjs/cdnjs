'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

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

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
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

var AvatarBase = componentbase.ComponentBase.extend({
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Avatar = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = AvatarBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var _React$useState = React__namespace.useState(false),
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
    if (utils.ObjectUtils.isNotEmpty(props.image) && !imageFailed) {
      var imageProps = utils.mergeProps({
        src: props.image,
        onError: onImageError
      }, ptm('image'));
      return /*#__PURE__*/React__namespace.createElement("img", _extends({
        alt: props.imageAlt
      }, imageProps));
    } else if (props.label) {
      var labelProps = utils.mergeProps({
        className: 'p-avatar-text'
      }, ptm('label'));
      return /*#__PURE__*/React__namespace.createElement("span", labelProps, props.label);
    } else if (props.icon) {
      var iconProps = utils.mergeProps({
        className: 'p-avatar-icon'
      }, ptm('icon'));
      return utils.IconUtils.getJSXIcon(props.icon, _objectSpread({}, iconProps), {
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
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var containerClassName = utils.classNames('p-avatar p-component', {
    'p-avatar-image': utils.ObjectUtils.isNotEmpty(props.image) && !imageFailed,
    'p-avatar-circle': props.shape === 'circle',
    'p-avatar-lg': props.size === 'large',
    'p-avatar-xl': props.size === 'xlarge',
    'p-avatar-clickable': !!props.onClick
  }, props.className);
  var rootProps = utils.mergeProps({
    ref: elementRef,
    style: props.style,
    className: containerClassName
  }, AvatarBase.getOtherProps(props), ptm('root'));
  var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : createContent();
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, content, props.children);
});
Avatar.displayName = 'Avatar';

exports.Avatar = Avatar;
