this.primereact = this.primereact || {};
this.primereact.timeline = (function (exports, React, utils, componentbase, api) {
  'use strict';

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

  var TimelineBase = componentbase.ComponentBase.extend({
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

  var Timeline = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _classNames;
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = TimelineBase.getProps(inProps, context);
    var _TimelineBase$setMeta = TimelineBase.setMetaData({
        props: props
      }),
      ptm = _TimelineBase$setMeta.ptm;
    var elementRef = React__namespace.useRef(null);
    var getKey = function getKey(item, index) {
      return props.dataKey ? utils.ObjectUtils.resolveFieldData(item, props.dataKey) : "pr_id__".concat(index);
    };
    var createEvents = function createEvents() {
      return props.value && props.value.map(function (item, index) {
        var opposite = utils.ObjectUtils.getJSXElement(props.opposite, item, index);
        var markerProps = utils.mergeProps({
          className: 'p-timeline-event-marker'
        }, ptm('marker'));
        var marker = utils.ObjectUtils.getJSXElement(props.marker, item, index) || /*#__PURE__*/React__namespace.createElement("div", markerProps);
        var connectorProps = utils.mergeProps({
          className: 'p-timeline-event-connector'
        }, ptm('connector'));
        var connector = index !== props.value.length - 1 && /*#__PURE__*/React__namespace.createElement("div", connectorProps);
        var content = utils.ObjectUtils.getJSXElement(props.content, item, index);
        var eventProps = utils.mergeProps({
          className: 'p-timeline-event'
        }, ptm('event'));
        var oppositeProps = utils.mergeProps({
          className: 'p-timeline-event-opposite'
        }, ptm('opposite'));
        var separatorProps = utils.mergeProps({
          className: 'p-timeline-event-separator'
        }, ptm('separator'));
        var contentProps = utils.mergeProps({
          className: 'p-timeline-event-content'
        }, ptm('content'));
        return /*#__PURE__*/React__namespace.createElement("div", _extends({
          key: getKey(item, index)
        }, eventProps), /*#__PURE__*/React__namespace.createElement("div", oppositeProps, opposite), /*#__PURE__*/React__namespace.createElement("div", separatorProps, marker, connector), /*#__PURE__*/React__namespace.createElement("div", contentProps, content));
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
    var className = utils.classNames('p-timeline p-component', (_classNames = {}, _defineProperty(_classNames, "p-timeline-".concat(props.align), true), _defineProperty(_classNames, "p-timeline-".concat(props.layout), true), _classNames), props.className);
    var events = createEvents();
    var rootProps = utils.mergeProps({
      ref: elementRef,
      className: className
    }, TimelineBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, events);
  }));
  Timeline.displayName = 'Timeline';

  exports.Timeline = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.componentbase, primereact.api);
