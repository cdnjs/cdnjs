'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { classNames, ObjectUtils, DomHandler, IconUtils } from 'primereact/utils';

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      state = _ref.state;
    return classNames('p-avatar p-component', {
      'p-avatar-image': ObjectUtils.isNotEmpty(props.image) && !state.imageFailed,
      'p-avatar-circle': props.shape === 'circle',
      'p-avatar-lg': props.size === 'large',
      'p-avatar-xl': props.size === 'xlarge',
      'p-avatar-clickable': !!props.onClick
    });
  },
  label: 'p-avatar-text',
  icon: 'p-avatar-icon'
};
var styles = "\n@layer primereact {\n    .p-avatar {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 2rem;\n        height: 2rem;\n        font-size: 1rem;\n    }\n    \n    .p-avatar.p-avatar-image {\n        background-color: transparent;\n    }\n    \n    .p-avatar.p-avatar-circle {\n        border-radius: 50%;\n    }\n    \n    .p-avatar.p-avatar-circle img {\n        border-radius: 50%;\n    }\n    \n    .p-avatar .p-avatar-icon {\n        font-size: 1rem;\n    }\n    \n    .p-avatar img {\n        width: 100%;\n        height: 100%;\n    }\n    \n    .p-avatar-clickable {\n        cursor: pointer;\n    }\n}\n";
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
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Avatar = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = AvatarBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    imageFailed = _React$useState2[0],
    setImageFailed = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    nested = _React$useState4[0],
    setNested = _React$useState4[1];
  var _AvatarBase$setMetaDa = AvatarBase.setMetaData({
      props: props,
      state: {
        imageFailed: imageFailed,
        nested: nested
      }
    }),
    ptm = _AvatarBase$setMetaDa.ptm,
    cx = _AvatarBase$setMetaDa.cx,
    isUnstyled = _AvatarBase$setMetaDa.isUnstyled;
  useHandleStyle(AvatarBase.css.styles, isUnstyled, {
    name: 'avatar'
  });
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
        className: cx('label')
      }, ptm('label'));
      return /*#__PURE__*/React.createElement("span", labelProps, props.label);
    } else if (props.icon) {
      var iconProps = mergeProps({
        className: cx('icon')
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
  React.useEffect(function () {
    var nested = DomHandler.isAttributeEquals(elementRef.current.parentElement, 'data-pc-name', 'avatargroup');
    setNested(nested);
  }, []);
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
    className: classNames(props.className, cx('root', {
      imageFailed: imageFailed
    }))
  }, AvatarBase.getOtherProps(props), ptm('root'));
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : createContent();
  return /*#__PURE__*/React.createElement("div", rootProps, content, props.children);
});
Avatar.displayName = 'Avatar';

export { Avatar };
