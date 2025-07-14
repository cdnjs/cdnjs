'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var exclamationtriangle = require('primereact/icons/exclamationtriangle');
var infocircle = require('primereact/icons/infocircle');
var timescircle = require('primereact/icons/timescircle');
var check = require('primereact/icons/check');
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
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Message = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = MessageBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var _MessageBase$setMetaD = MessageBase.setMetaData({
      props: props
    }),
    ptm = _MessageBase$setMetaD.ptm;
  var createContent = function createContent() {
    if (props.content) {
      return utils.ObjectUtils.getJSXElement(props.content, props);
    }
    var text = utils.ObjectUtils.getJSXElement(props.text, props);
    var iconClassName = 'p-inline-message-icon';
    var iconProps = utils.mergeProps({
      className: iconClassName
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
    var textProps = utils.mergeProps({
      className: 'p-inline-message-text'
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
  var className = utils.classNames('p-inline-message p-component', {
    'p-inline-message-info': props.severity === 'info',
    'p-inline-message-warn': props.severity === 'warn',
    'p-inline-message-error': props.severity === 'error',
    'p-inline-message-success': props.severity === 'success',
    'p-inline-message-icon-only': !props.text
  }, props.className);
  var content = createContent();
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style,
    role: 'alert',
    'aria-live': 'polite'
  }, MessageBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, content);
}));
Message.displayName = 'Message';

exports.Message = Message;
