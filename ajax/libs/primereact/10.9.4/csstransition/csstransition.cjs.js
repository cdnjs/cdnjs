'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');
var PrimeReact = require('primereact/api');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

var CSSTransitionBase = {
  defaultProps: {
    __TYPE: 'CSSTransition',
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, CSSTransitionBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, CSSTransitionBase.defaultProps);
  }
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var CSSTransition = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = CSSTransitionBase.getProps(inProps);
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var disabled = props.disabled || props.options && props.options.disabled || context && !context.cssTransition || !PrimeReact__default["default"].cssTransition;
  var onEnter = function onEnter(node, isAppearing) {
    props.onEnter && props.onEnter(node, isAppearing); // component
    props.options && props.options.onEnter && props.options.onEnter(node, isAppearing); // user option
  };
  var onEntering = function onEntering(node, isAppearing) {
    props.onEntering && props.onEntering(node, isAppearing); // component
    props.options && props.options.onEntering && props.options.onEntering(node, isAppearing); // user option
  };
  var onEntered = function onEntered(node, isAppearing) {
    props.onEntered && props.onEntered(node, isAppearing); // component
    props.options && props.options.onEntered && props.options.onEntered(node, isAppearing); // user option
  };
  var onExit = function onExit(node) {
    props.onExit && props.onExit(node); // component
    props.options && props.options.onExit && props.options.onExit(node); // user option
  };
  var onExiting = function onExiting(node) {
    props.onExiting && props.onExiting(node); // component
    props.options && props.options.onExiting && props.options.onExiting(node); // user option
  };
  var onExited = function onExited(node) {
    props.onExited && props.onExited(node); // component
    props.options && props.options.onExited && props.options.onExited(node); // user option
  };
  hooks.useUpdateEffect(function () {
    if (disabled) {
      // no animation
      var node = utils.ObjectUtils.getRefElement(props.nodeRef);
      if (props["in"]) {
        onEnter(node, true);
        onEntering(node, true);
        onEntered(node, true);
      } else {
        onExit(node);
        onExiting(node);
        onExited(node);
      }
    }
  }, [props["in"]]);
  if (disabled) {
    return props["in"] ? props.children : null;
  }
  var immutableProps = {
    nodeRef: props.nodeRef,
    "in": props["in"],
    appear: props.appear,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited
  };
  var mutableProps = {
    classNames: props.classNames,
    timeout: props.timeout,
    unmountOnExit: props.unmountOnExit
  };
  var mergedProps = _objectSpread(_objectSpread(_objectSpread({}, mutableProps), props.options || {}), immutableProps);
  return /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.CSSTransition, mergedProps, props.children);
});
CSSTransition.displayName = 'CSSTransition';

exports.CSSTransition = CSSTransition;
