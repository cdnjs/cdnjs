import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

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
var Timeline = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var elementRef = React.useRef(null);

  var getKey = function getKey(item, index) {
    return props.dataKey ? ObjectUtils.resolveFieldData(item, props.dataKey) : "pr_id__".concat(index);
  };

  var createEvents = function createEvents() {
    return props.value && props.value.map(function (item, index) {
      var opposite = ObjectUtils.getJSXElement(props.opposite, item, index);
      var marker = ObjectUtils.getJSXElement(props.marker, item, index) || /*#__PURE__*/React.createElement("div", {
        className: "p-timeline-event-marker"
      });
      var connector = index !== props.value.length - 1 && /*#__PURE__*/React.createElement("div", {
        className: "p-timeline-event-connector"
      });
      var content = ObjectUtils.getJSXElement(props.content, item, index);
      return /*#__PURE__*/React.createElement("div", {
        key: getKey(item, index),
        className: "p-timeline-event"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-timeline-event-opposite"
      }, opposite), /*#__PURE__*/React.createElement("div", {
        className: "p-timeline-event-separator"
      }, marker, connector), /*#__PURE__*/React.createElement("div", {
        className: "p-timeline-event-content"
      }, content));
    });
  };

  React.useImperativeHandle(ref, function () {
    return _objectSpread({
      getElement: function getElement() {
        return elementRef.current;
      }
    }, props);
  });
  var otherProps = ObjectUtils.findDiffKeys(props, Timeline.defaultProps);
  var className = classNames('p-timeline p-component', (_classNames = {}, _defineProperty(_classNames, "p-timeline-".concat(props.align), true), _defineProperty(_classNames, "p-timeline-".concat(props.layout), true), _classNames), props.className);
  var events = createEvents();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), events);
}));
Timeline.displayName = 'Timeline';
Timeline.defaultProps = {
  __TYPE: 'Timeline',
  id: null,
  value: null,
  align: 'left',
  layout: 'vertical',
  dataKey: null,
  className: null,
  style: null,
  opposite: null,
  marker: null,
  content: null
};

export { Timeline };
