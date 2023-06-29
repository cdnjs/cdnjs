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

var TimelineBase = {
  defaultProps: {
    __TYPE: 'Timeline',
    align: 'left',
    className: null,
    content: null,
    dataKey: null,
    layout: 'vertical',
    marker: null,
    opposite: null,
    value: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, TimelineBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, TimelineBase.defaultProps);
  }
};

var Timeline = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var _classNames;
  var props = TimelineBase.getProps(inProps);
  var elementRef = React__namespace.useRef(null);
  var getKey = function getKey(item, index) {
    return props.dataKey ? utils.ObjectUtils.resolveFieldData(item, props.dataKey) : "pr_id__".concat(index);
  };
  var createEvents = function createEvents() {
    return props.value && props.value.map(function (item, index) {
      var opposite = utils.ObjectUtils.getJSXElement(props.opposite, item, index);
      var marker = utils.ObjectUtils.getJSXElement(props.marker, item, index) || /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-timeline-event-marker"
      });
      var connector = index !== props.value.length - 1 && /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-timeline-event-connector"
      });
      var content = utils.ObjectUtils.getJSXElement(props.content, item, index);
      return /*#__PURE__*/React__namespace.createElement("div", {
        key: getKey(item, index),
        className: "p-timeline-event"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-timeline-event-opposite"
      }, opposite), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-timeline-event-separator"
      }, marker, connector), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-timeline-event-content"
      }, content));
    });
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = TimelineBase.getOtherProps(props);
  var className = utils.classNames('p-timeline p-component', (_classNames = {}, _defineProperty(_classNames, "p-timeline-".concat(props.align), true), _defineProperty(_classNames, "p-timeline-".concat(props.layout), true), _classNames), props.className);
  var events = createEvents();
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    className: className
  }, otherProps), events);
}));
Timeline.displayName = 'Timeline';

exports.Timeline = Timeline;
