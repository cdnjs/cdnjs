'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { classNames, ObjectUtils, UniqueComponentId, IconUtils } from 'primereact/utils';

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
var Chip = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
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
    var result = true;
    if (props.onRemove) {
      result = props.onRemove({
        originalEvent: event,
        value: props.label || props.image || props.icon
      });
    }
    if (result !== false) {
      setVisibleState(false);
    }
  };
  var createContent = function createContent() {
    var content = [];
    var removeIconProps = mergeProps({
      role: 'button',
      tabIndex: 0,
      className: cx('removeIcon'),
      onClick: close,
      onKeyDown: onKeyDown
    }, ptm('removeIcon'));
    var icon = props.removeIcon || /*#__PURE__*/React.createElement(TimesCircleIcon, _extends({}, removeIconProps, {
      key: UniqueComponentId('removeIcon')
    }));
    if (props.image) {
      var imageProps = mergeProps({
        src: props.image,
        onError: props.onImageError
      }, ptm('image'));
      content.push(/*#__PURE__*/React.createElement("img", _extends({
        alt: props.imageAlt
      }, imageProps, {
        key: UniqueComponentId('image')
      })));
    } else if (props.icon) {
      var chipIconProps = mergeProps({
        className: cx('icon')
      }, ptm('icon'));
      content.push(IconUtils.getJSXIcon(props.icon, _objectSpread({}, chipIconProps), {
        props: props
      }));
    }
    if (props.label) {
      var labelProps = mergeProps({
        className: cx('label')
      }, ptm('label'));
      content.push(/*#__PURE__*/React.createElement("span", _extends({}, labelProps, {
        key: UniqueComponentId('label')
      }), props.label));
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
    return /*#__PURE__*/React.createElement("div", _extends({}, rootProps, {
      key: UniqueComponentId('chip')
    }), content);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getVisible: function getVisible() {
        return visibleState;
      },
      setVisible: function setVisible(visible) {
        return setVisibleState(visible);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return visibleState && createElement();
}));
Chip.displayName = 'Chip';

export { Chip };
