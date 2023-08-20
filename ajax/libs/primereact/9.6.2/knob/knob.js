this.primereact = this.primereact || {};
this.primereact.knob = (function (exports, React, hooks, utils, componentbase, api) {
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var KnobBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Knob',
      id: null,
      style: null,
      className: null,
      value: null,
      size: 100,
      disabled: false,
      readOnly: false,
      showValue: true,
      step: 1,
      min: 0,
      max: 100,
      strokeWidth: 14,
      name: null,
      valueColor: 'var(--primary-color, Black)',
      rangeColor: 'var(--surface-border, LightGray)',
      textColor: 'var(--text-color-secondary, Black)',
      valueTemplate: '{value}',
      onChange: null,
      children: undefined
    }
  });

  var radius = 40;
  var midX = 50;
  var midY = 50;
  var minRadians = 4 * Math.PI / 3;
  var maxRadians = -Math.PI / 3;
  var Knob = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = KnobBase.getProps(inProps, context);
    var _KnobBase$setMetaData = KnobBase.setMetaData({
        props: props
      }),
      ptm = _KnobBase$setMetaData.ptm;
    var elementRef = React__namespace.useRef(null);
    var enabled = !props.disabled && !props.readOnly;
    var _useEventListener = hooks.useEventListener({
        target: 'window',
        type: 'mousemove',
        listener: function listener(event) {
          updateValue(event.offsetX, event.offsetY);
          event.preventDefault();
        },
        when: enabled
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindWindowMouseMoveListener = _useEventListener2[0],
      unbindWindowMouseMoveListener = _useEventListener2[1];
    var _useEventListener3 = hooks.useEventListener({
        target: 'window',
        type: 'mouseup',
        listener: function listener(event) {
          unbindWindowMouseMoveListener();
          unbindWindowMouseUpListener();
          event.preventDefault();
        },
        when: enabled
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindWindowMouseUpListener = _useEventListener4[0],
      unbindWindowMouseUpListener = _useEventListener4[1];
    var _useEventListener5 = hooks.useEventListener({
        target: 'window',
        type: 'touchmove',
        listener: function listener(event) {
          if (event.touches.length === 1) {
            var rect = elementRef.current.getBoundingClientRect();
            var touch = event.targetTouches.item(0);
            var offsetX = touch.clientX - rect.left;
            var offsetY = touch.clientY - rect.top;
            updateValue(offsetX, offsetY);
            event.preventDefault();
          }
        },
        when: enabled
      }),
      _useEventListener6 = _slicedToArray(_useEventListener5, 2),
      bindWindowTouchMoveListener = _useEventListener6[0],
      unbindWindowTouchMoveListener = _useEventListener6[1];
    var _useEventListener7 = hooks.useEventListener({
        target: 'window',
        type: 'touchend',
        listener: function listener() {
          unbindWindowTouchMoveListener();
          unbindWindowTouchEndListener();
        },
        when: enabled
      }),
      _useEventListener8 = _slicedToArray(_useEventListener7, 2),
      bindWindowTouchEndListener = _useEventListener8[0],
      unbindWindowTouchEndListener = _useEventListener8[1];
    var mapRange = function mapRange(x, inMin, inMax, outMin, outMax) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
    var zeroRadians = function zeroRadians() {
      return mapRange(props.min > 0 && props.max > 0 ? props.min : 0, props.min, props.max, minRadians, maxRadians);
    };
    var valueRadians = function valueRadians() {
      return mapRange(props.value, props.min, props.max, minRadians, maxRadians);
    };
    var minX = function minX() {
      return midX + Math.cos(minRadians) * radius;
    };
    var minY = function minY() {
      return midY - Math.sin(minRadians) * radius;
    };
    var maxX = function maxX() {
      return midX + Math.cos(maxRadians) * radius;
    };
    var maxY = function maxY() {
      return midY - Math.sin(maxRadians) * radius;
    };
    var zeroX = function zeroX() {
      return midX + Math.cos(zeroRadians()) * radius;
    };
    var zeroY = function zeroY() {
      return midY - Math.sin(zeroRadians()) * radius;
    };
    var valueX = function valueX() {
      return midX + Math.cos(valueRadians()) * radius;
    };
    var valueY = function valueY() {
      return midY - Math.sin(valueRadians()) * radius;
    };
    var largeArc = function largeArc() {
      return Math.abs(zeroRadians() - valueRadians()) < Math.PI ? 0 : 1;
    };
    var sweep = function sweep() {
      return valueRadians() > zeroRadians() ? 0 : 1;
    };
    var rangePath = "M ".concat(minX(), " ").concat(minY(), " A ").concat(radius, " ").concat(radius, " 0 1 1 ").concat(maxX(), " ").concat(maxY());
    var valuePath = "M ".concat(zeroX(), " ").concat(zeroY(), " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc(), " ").concat(sweep(), " ").concat(valueX(), " ").concat(valueY());
    var valueToDisplay = function valueToDisplay() {
      return props.valueTemplate.replace('{value}', props.value.toString());
    };
    var updateValue = function updateValue(offsetX, offsetY) {
      var dx = offsetX - props.size / 2;
      var dy = props.size / 2 - offsetY;
      var angle = Math.atan2(dy, dx);
      var start = -Math.PI / 2 - Math.PI / 6;
      updateModel(angle, start);
    };
    var updateModel = function updateModel(angle, start) {
      var mappedValue;
      if (angle > maxRadians) mappedValue = mapRange(angle, minRadians, maxRadians, props.min, props.max);else if (angle < start) mappedValue = mapRange(angle + 2 * Math.PI, minRadians, maxRadians, props.min, props.max);else return;
      if (props.onChange) {
        props.onChange({
          value: Math.round((mappedValue - props.min) / props.step) * props.step + props.min
        });
      }
    };
    var _onClick = function onClick(event) {
      if (!props.disabled && !props.readOnly) {
        updateValue(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }
    };
    var _onMouseDown = function onMouseDown(event) {
      bindWindowMouseMoveListener();
      bindWindowMouseUpListener();
      event.preventDefault();
    };
    var _onMouseUp = function onMouseUp() {
      unbindWindowMouseMoveListener();
      unbindWindowMouseUpListener();
    };
    var _onTouchStart = function onTouchStart() {
      bindWindowTouchMoveListener();
      bindWindowTouchEndListener();
    };
    var _onTouchEnd = function onTouchEnd() {
      unbindWindowTouchMoveListener();
      unbindWindowTouchEndListener();
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    KnobBase.getOtherProps(props);
    var className = utils.classNames('p-knob p-component', {
      'p-disabled': props.disabled
    }, props.className);
    var labelProps = utils.mergeProps({
      x: 50,
      y: 57,
      textAnchor: 'middle',
      fill: props.textColor,
      className: 'p-knob-text',
      name: props.name
    }, ptm('label'));
    var text = props.showValue && /*#__PURE__*/React__namespace.createElement("text", labelProps, valueToDisplay());
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, ptm('root'));
    var svgProps = utils.mergeProps({
      viewBox: '0 0 100 100',
      width: props.size,
      height: props.size,
      onClick: function onClick(e) {
        return _onClick(e);
      },
      onMouseDown: function onMouseDown(e) {
        return _onMouseDown(e);
      },
      onMouseUp: function onMouseUp(e) {
        return _onMouseUp();
      },
      onTouchStart: function onTouchStart(e) {
        return _onTouchStart();
      },
      onTouchEnd: function onTouchEnd(e) {
        return _onTouchEnd();
      }
    }, ptm('svg'));
    var rangeProps = utils.mergeProps({
      d: rangePath,
      strokeWidth: props.strokeWidth,
      stroke: props.rangeColor,
      className: 'p-knob-range'
    }, ptm('range'));
    var valueProps = utils.mergeProps({
      d: valuePath,
      strokeWidth: props.strokeWidth,
      stroke: props.valueColor,
      className: 'p-knob-value'
    }, ptm('value'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("svg", svgProps, /*#__PURE__*/React__namespace.createElement("path", rangeProps), /*#__PURE__*/React__namespace.createElement("path", valueProps), text));
  }));
  Knob.displayName = 'Knob';

  exports.Knob = Knob;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.utils, primereact.componentbase, primereact.api);
