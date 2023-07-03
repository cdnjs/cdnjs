import * as React from 'react';
import { classNames, mergeProps, ObjectUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

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

var TimelineBase = ComponentBase.extend({
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
  }
});

var Timeline = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var _classNames;
  var context = React.useContext(PrimeReactContext);
  var props = TimelineBase.getProps(inProps, context);
  var _TimelineBase$setMeta = TimelineBase.setMetaData({
      props: props
    }),
    ptm = _TimelineBase$setMeta.ptm;
  var elementRef = React.useRef(null);
  var getKey = function getKey(item, index) {
    return props.dataKey ? ObjectUtils.resolveFieldData(item, props.dataKey) : "pr_id__".concat(index);
  };
  var createEvents = function createEvents() {
    return props.value && props.value.map(function (item, index) {
      var opposite = ObjectUtils.getJSXElement(props.opposite, item, index);
      var markerProps = mergeProps({
        className: 'p-timeline-event-marker'
      }, ptm('marker'));
      var marker = ObjectUtils.getJSXElement(props.marker, item, index) || /*#__PURE__*/React.createElement("div", markerProps);
      var connectorProps = mergeProps({
        className: 'p-timeline-event-connector'
      }, ptm('connector'));
      var connector = index !== props.value.length - 1 && /*#__PURE__*/React.createElement("div", connectorProps);
      var content = ObjectUtils.getJSXElement(props.content, item, index);
      var eventProps = mergeProps({
        className: 'p-timeline-event'
      }, ptm('event'));
      var oppositeProps = mergeProps({
        className: 'p-timeline-event-opposite'
      }, ptm('opposite'));
      var separatorProps = mergeProps({
        className: 'p-timeline-event-separator'
      }, ptm('separator'));
      var contentProps = mergeProps({
        className: 'p-timeline-event-content'
      }, ptm('content'));
      return /*#__PURE__*/React.createElement("div", _extends({
        key: getKey(item, index)
      }, eventProps), /*#__PURE__*/React.createElement("div", oppositeProps, opposite), /*#__PURE__*/React.createElement("div", separatorProps, marker, connector), /*#__PURE__*/React.createElement("div", contentProps, content));
    });
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var className = classNames('p-timeline p-component', (_classNames = {}, _defineProperty(_classNames, "p-timeline-".concat(props.align), true), _defineProperty(_classNames, "p-timeline-".concat(props.layout), true), _classNames), props.className);
  var events = createEvents();
  var rootProps = mergeProps({
    ref: elementRef,
    className: className
  }, TimelineBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, events);
}));
Timeline.displayName = 'Timeline';

export { Timeline };
