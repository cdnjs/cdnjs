'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
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
var FullCalendar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var config = React__namespace.useRef({});
  var calendar = React__namespace.useRef(null);
  var prevEvents = hooks.usePrevious(props.events);
  var prevOptions = hooks.usePrevious(props.options);

  var initialize = function initialize() {
    Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@fullcalendar/core')); }).then(function (module) {
      if (module && module.Calendar) {
        calendar.current = new module.Calendar(elementRef.current, config.current);
        calendar.current.render();

        if (props.events) {
          calendar.current.removeAllEventSources();
          calendar.current.addEventSource(props.events);
        }
      }
    });
  };

  React__namespace.useImperativeHandle(ref, function () {
    return _objectSpread({
      getElement: function getElement() {
        return elementRef.current;
      }
    }, props);
  });
  hooks.useMountEffect(function () {
    // eslint-disable-next-line no-console
    console.warn("FullCalendar component is deprecated. Use FullCalendar component of '@fullcalendar/react' package.");
    config.current = {
      theme: true
    };

    if (props.options) {
      for (var prop in props.options) {
        config.current[prop] = props.options[prop];
      }
    }

    initialize();
  });
  hooks.useUpdateEffect(function () {
    if (!calendar.current) {
      initialize();
    } else {
      if (!utils.ObjectUtils.equals(prevEvents, props.events)) {
        calendar.current.removeAllEventSources();
        calendar.addEventSource(props.events);
      }

      if (!utils.ObjectUtils.equals(prevOptions, props.options)) {
        for (var prop in props.options) {
          var optionValue = props.options[prop];
          config.current[prop] = optionValue;
          calendar.current.setOption(prop, optionValue);
        }
      }
    }
  });
  hooks.useUnmountEffect(function () {
    if (calendar.current) {
      calendar.current.destroy();
    }
  });
  var otherProps = utils.ObjectUtils.findDiffKeys(props, FullCalendar.defaultProps);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    style: props.style,
    className: props.className
  }, otherProps));
}));
FullCalendar.displayName = 'FullCalendar';
FullCalendar.defaultProps = {
  __TYPE: 'FullCalendar',
  id: null,
  events: [],
  style: null,
  className: null,
  options: null
};

exports.FullCalendar = FullCalendar;
