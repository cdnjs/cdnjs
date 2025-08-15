'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var check = require('primereact/icons/check');
var exclamationtriangle = require('primereact/icons/exclamationtriangle');
var infocircle = require('primereact/icons/infocircle');
var timescircle = require('primereact/icons/timescircle');
var utils = require('primereact/utils');

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

var MessageBase = componentbase.ComponentBase.extend({
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
        return utils.classNames('p-inline-message p-component', _defineProperty({}, "p-inline-message-".concat(severity), severity));
      },
      icon: 'p-inline-message-icon',
      text: 'p-inline-message-text'
    },
    styles: "\n        @layer primereact {\n            .p-inline-message {\n                display: inline-flex;\n                align-items: center;\n                justify-content: center;\n                vertical-align: top;\n            }\n\n            .p-inline-message-icon {\n                flex-shrink: 0;\n            }\n            \n            .p-inline-message-icon-only .p-inline-message-text {\n                visibility: hidden;\n                width: 0;\n            }\n            \n            .p-fluid .p-inline-message {\n                display: flex;\n            }        \n        }\n        "
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Message = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = MessageBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var _MessageBase$setMetaD = MessageBase.setMetaData({
      props: props
    }),
    ptm = _MessageBase$setMetaD.ptm,
    cx = _MessageBase$setMetaD.cx,
    isUnstyled = _MessageBase$setMetaD.isUnstyled;
  componentbase.useHandleStyle(MessageBase.css.styles, isUnstyled, {
    name: 'message'
  });
  var createContent = function createContent() {
    if (props.content) {
      return utils.ObjectUtils.getJSXElement(props.content, props);
    }
    var text = utils.ObjectUtils.getJSXElement(props.text, props);
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var icon = props.icon;
    if (!icon) {
      switch (props.severity) {
        case 'info':
          icon = /*#__PURE__*/React__namespace.createElement(infocircle.InfoCircleIcon, iconProps);
          break;
        case 'warn':
          icon = /*#__PURE__*/React__namespace.createElement(exclamationtriangle.ExclamationTriangleIcon, iconProps);
          break;
        case 'error':
          icon = /*#__PURE__*/React__namespace.createElement(timescircle.TimesCircleIcon, iconProps);
          break;
        case 'success':
          icon = /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps);
          break;
      }
    }
    var messageIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
      props: props
    });
    var textProps = mergeProps({
      className: cx('text')
    }, ptm('text'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, messageIcon, /*#__PURE__*/React__namespace.createElement("span", textProps, text));
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var content = createContent();
  var rootProps = mergeProps({
    className: utils.classNames(props.className, cx('root')),
    style: props.style,
    role: 'alert',
    'aria-live': 'polite',
    'aria-atomic': 'true'
  }, MessageBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), content);
}));
Message.displayName = 'Message';

exports.Message = Message;
