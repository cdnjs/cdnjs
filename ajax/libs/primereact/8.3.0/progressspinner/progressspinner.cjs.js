'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
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
  _extends = Object.assign || function (target) {
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

function _defineProperty(obj, key, value) {
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ProgressSpinner = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, ProgressSpinner.defaultProps);
  var className = utils.classNames('p-progress-spinner', props.className);
  React__namespace.useImperativeHandle(ref, function () {
    return _objectSpread({
      getElement: function getElement() {
        return elementRef.current;
      }
    }, props);
  });
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className,
    role: "alert",
    "aria-busy": true
  }, otherProps), /*#__PURE__*/React__namespace.createElement("svg", {
    className: "p-progress-spinner-svg",
    viewBox: "25 25 50 50",
    style: {
      animationDuration: props.animationDuration
    }
  }, /*#__PURE__*/React__namespace.createElement("circle", {
    className: "p-progress-spinner-circle",
    cx: "50",
    cy: "50",
    r: "20",
    fill: props.fill,
    strokeWidth: props.strokeWidth,
    strokeMiterlimit: "10"
  })));
}));
ProgressSpinner.displayName = 'ProgressSpinner';
ProgressSpinner.defaultProps = {
  __TYPE: 'ProgressSpinner',
  id: null,
  style: null,
  className: null,
  strokeWidth: '2',
  fill: 'none',
  animationDuration: '2s'
};

exports.ProgressSpinner = ProgressSpinner;
