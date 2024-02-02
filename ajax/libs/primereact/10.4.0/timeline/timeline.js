this.primereact = this.primereact || {};
this.primereact.timeline = (function (exports, React, api, componentbase, hooks, utils) {
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

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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
    },
    css: {
      classes: {
        marker: 'p-timeline-event-marker',
        connector: 'p-timeline-event-connector',
        event: 'p-timeline-event',
        opposite: 'p-timeline-event-opposite',
        separator: 'p-timeline-event-separator',
        content: 'p-timeline-event-content',
        root: function root(_ref) {
          var props = _ref.props;
          return utils.classNames('p-timeline p-component', _defineProperty(_defineProperty({}, "p-timeline-".concat(props.align), true), "p-timeline-".concat(props.layout), true), props.className);
        }
      },
      styles: "\n        @layer primereact {\n            .p-timeline {\n                display: flex;\n                flex-grow: 1;\n                flex-direction: column;\n            }\n        \n            .p-timeline-left .p-timeline-event-opposite {\n                text-align: right;\n            }\n        \n            .p-timeline-left .p-timeline-event-content {\n                text-align: left;\n            }\n        \n            .p-timeline-right .p-timeline-event {\n                flex-direction: row-reverse;\n            }\n        \n            .p-timeline-right .p-timeline-event-opposite {\n                text-align: left;\n            }\n        \n            .p-timeline-right .p-timeline-event-content {\n                text-align: right;\n            }\n        \n            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {\n                flex-direction: row-reverse;\n            }\n        \n            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {\n                text-align: right;\n            }\n        \n            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {\n                text-align: left;\n            }\n        \n            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {\n                text-align: left;\n            }\n        \n            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {\n                text-align: right;\n            }\n        \n            .p-timeline-event {\n                display: flex;\n                position: relative;\n                min-height: 70px;\n            }\n        \n            .p-timeline-event:last-child {\n                min-height: 0;\n            }\n        \n            .p-timeline-event-opposite {\n                flex: 1;\n                padding: 0 1rem;\n            }\n        \n            .p-timeline-event-content {\n                flex: 1;\n                padding: 0 1rem;\n            }\n        \n            .p-timeline-event-separator {\n                flex: 0;\n                display: flex;\n                align-items: center;\n                flex-direction: column;\n            }\n        \n            .p-timeline-event-marker {\n                display: flex;\n                align-self: baseline;\n            }\n        \n            .p-timeline-event-connector {\n                flex-grow: 1;\n            }\n        \n            .p-timeline-horizontal {\n                flex-direction: row;\n            }\n        \n            .p-timeline-horizontal .p-timeline-event {\n                flex-direction: column;\n                flex: 1;\n            }\n        \n            .p-timeline-horizontal .p-timeline-event:last-child {\n                flex: 0;\n            }\n        \n            .p-timeline-horizontal .p-timeline-event-separator {\n                flex-direction: row;\n            }\n        \n            .p-timeline-horizontal .p-timeline-event-connector  {\n                width: 100%;\n            }\n        \n            .p-timeline-bottom .p-timeline-event {\n                flex-direction: column-reverse;\n            }\n        \n            .p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {\n                flex-direction: column-reverse;\n            }\n        }\n    "
    }
  });

  var Timeline = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = TimelineBase.getProps(inProps, context);
    var _TimelineBase$setMeta = TimelineBase.setMetaData({
        props: props
      }),
      ptm = _TimelineBase$setMeta.ptm,
      cx = _TimelineBase$setMeta.cx,
      isUnstyled = _TimelineBase$setMeta.isUnstyled;
    componentbase.useHandleStyle(TimelineBase.css.styles, isUnstyled, {
      name: 'timeline'
    });
    var getPTOptions = function getPTOptions(key, index) {
      return ptm(key, {
        context: {
          index: index
        }
      });
    };
    var elementRef = React__namespace.useRef(null);
    var getKey = function getKey(item, index) {
      return props.dataKey ? utils.ObjectUtils.resolveFieldData(item, props.dataKey) : "pr_id__".concat(index);
    };
    var createEvents = function createEvents() {
      return props.value && props.value.map(function (item, index) {
        var opposite = utils.ObjectUtils.getJSXElement(props.opposite, item, index);
        var markerProps = mergeProps({
          className: cx('marker')
        }, getPTOptions('marker', index));
        var marker = utils.ObjectUtils.getJSXElement(props.marker, item, index) || /*#__PURE__*/React__namespace.createElement("div", markerProps);
        var connectorProps = mergeProps({
          className: cx('connector')
        }, getPTOptions('connector', index));
        var connector = index !== props.value.length - 1 && /*#__PURE__*/React__namespace.createElement("div", connectorProps);
        var content = utils.ObjectUtils.getJSXElement(props.content, item, index);
        var eventProps = mergeProps({
          className: cx('event')
        }, getPTOptions('event', index));
        var oppositeProps = mergeProps({
          className: cx('opposite')
        }, getPTOptions('opposite', index));
        var separatorProps = mergeProps({
          className: cx('separator')
        }, getPTOptions('separator', index));
        var contentProps = mergeProps({
          className: cx('content')
        }, getPTOptions('content', index));
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
    var events = createEvents();
    var rootProps = mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root'))
    }, TimelineBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, events);
  }));
  Timeline.displayName = 'Timeline';

  exports.Timeline = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
