'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { CheckIcon } from 'primereact/icons/check';
import { ExclamationTriangleIcon } from 'primereact/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primereact/icons/infocircle';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { classNames, ObjectUtils, IconUtils } from 'primereact/utils';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

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

var MessageBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Message',
    id: null,
    className: null,
    style: null,
    text: null,
    icon: null,
    severity: 'info',
    content: null,
    children: undefined
  },
  css: {
    classes: {
      root: function root(_ref) {
        var severity = _ref.props.severity;
        return classNames('p-inline-message p-component', _defineProperty({}, "p-inline-message-".concat(severity), severity));
      },
      icon: 'p-inline-message-icon',
      text: 'p-inline-message-text'
    },
    styles: "\n        @layer primereact {\n            .p-inline-message {\n                display: inline-flex;\n                align-items: center;\n                justify-content: center;\n                vertical-align: top;\n            }\n\n            .p-inline-message-icon {\n                flex-shrink: 0;\n            }\n            \n            .p-inline-message-icon-only .p-inline-message-text {\n                visibility: hidden;\n                width: 0;\n            }\n            \n            .p-fluid .p-inline-message {\n                display: flex;\n            }        \n        }\n        "
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Message = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = MessageBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var _MessageBase$setMetaD = MessageBase.setMetaData({
      props: props
    }),
    ptm = _MessageBase$setMetaD.ptm,
    cx = _MessageBase$setMetaD.cx,
    isUnstyled = _MessageBase$setMetaD.isUnstyled;
  useHandleStyle(MessageBase.css.styles, isUnstyled, {
    name: 'message'
  });
  var createContent = function createContent() {
    if (props.content) {
      return ObjectUtils.getJSXElement(props.content, props);
    }
    var text = ObjectUtils.getJSXElement(props.text, props);
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var icon = props.icon;
    if (!icon) {
      switch (props.severity) {
        case 'info':
          icon = /*#__PURE__*/React.createElement(InfoCircleIcon, iconProps);
          break;
        case 'warn':
          icon = /*#__PURE__*/React.createElement(ExclamationTriangleIcon, iconProps);
          break;
        case 'error':
          icon = /*#__PURE__*/React.createElement(TimesCircleIcon, iconProps);
          break;
        case 'success':
          icon = /*#__PURE__*/React.createElement(CheckIcon, iconProps);
          break;
      }
    }
    var messageIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
      props: props
    });
    var textProps = mergeProps({
      className: cx('text')
    }, ptm('text'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, messageIcon, /*#__PURE__*/React.createElement("span", textProps, text));
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var content = createContent();
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root')),
    style: props.style,
    role: 'alert',
    'aria-live': 'polite',
    'aria-atomic': 'true'
  }, MessageBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), content);
}));
Message.displayName = 'Message';

export { Message };
