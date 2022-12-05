this.primereact = this.primereact || {};
this.primereact.slider = (function (exports, React, hooks, utils) {
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

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
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
          ;
        }
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var Slider = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var handleIndex = React__namespace.useRef(0);
    var sliderHandleClick = React__namespace.useRef(false);
    var dragging = React__namespace.useRef(false);
    var initX = React__namespace.useRef(0);
    var initY = React__namespace.useRef(0);
    var barWidth = React__namespace.useRef(0);
    var barHeight = React__namespace.useRef(0);
    var value = props.range ? props.value || [props.min, props.max] : props.value || 0;
    var horizontal = props.orientation === 'horizontal';
    var vertical = props.orientation === 'vertical';
    var _useEventListener = hooks.useEventListener({
        type: 'mousemove',
        listener: function listener(event) {
          return onDrag(event);
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentMouseMoveListener = _useEventListener2[0],
      unbindDocumentMouseMoveListener = _useEventListener2[1];
    var _useEventListener3 = hooks.useEventListener({
        type: 'mouseup',
        listener: function listener(event) {
          return onDragEnd(event);
        }
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindDocumentMouseUpListener = _useEventListener4[0],
      unbindDocumentMouseUpListener = _useEventListener4[1];
    var _useEventListener5 = hooks.useEventListener({
        type: 'touchmove',
        listener: function listener(event) {
          return onDrag(event);
        }
      }),
      _useEventListener6 = _slicedToArray(_useEventListener5, 2),
      bindDocumentTouchMoveListener = _useEventListener6[0],
      unbindDocumentTouchMoveListener = _useEventListener6[1];
    var _useEventListener7 = hooks.useEventListener({
        type: 'touchend',
        listener: function listener(event) {
          return onDragEnd(event);
        }
      }),
      _useEventListener8 = _slicedToArray(_useEventListener7, 2),
      bindDocumentTouchEndListener = _useEventListener8[0],
      unbindDocumentTouchEndListener = _useEventListener8[1];
    var spin = function spin(event, dir) {
      var val = props.range ? value[handleIndex.current] : value;
      var step = (props.step || 1) * dir;
      updateValue(event, val + step);
      event.preventDefault();
    };
    var onDragStart = function onDragStart(event, index) {
      if (props.disabled) {
        return;
      }
      dragging.current = true;
      updateDomData();
      sliderHandleClick.current = true;
      handleIndex.current = index;
      //event.preventDefault();
    };

    var onDrag = function onDrag(event) {
      if (dragging.current) {
        setValue(event);
        event.preventDefault();
      }
    };
    var onDragEnd = function onDragEnd(event) {
      if (dragging.current) {
        dragging.current = false;
        props.onSlideEnd && props.onSlideEnd({
          originalEvent: event,
          value: props.value
        });
        unbindDocumentMouseMoveListener();
        unbindDocumentMouseUpListener();
        unbindDocumentTouchMoveListener();
        unbindDocumentTouchEndListener();
      }
    };
    var _onMouseDown = function onMouseDown(event, index) {
      bindDocumentMouseMoveListener();
      bindDocumentMouseUpListener();
      onDragStart(event, index);
    };
    var _onTouchStart = function onTouchStart(event, index) {
      bindDocumentTouchMoveListener();
      bindDocumentTouchEndListener();
      onDragStart(event, index);
    };
    var _onKeyDown = function onKeyDown(event, index) {
      if (props.disabled) {
        return;
      }
      handleIndex.current = index;
      var key = event.key;
      if (key === 'ArrowRight' || key === 'ArrowUp') {
        spin(event, 1);
      } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
        spin(event, -1);
      }
    };
    var onBarClick = function onBarClick(event) {
      if (props.disabled) {
        return;
      }
      if (!sliderHandleClick.current) {
        updateDomData();
        var _value = setValue(event);
        props.onSlideEnd && props.onSlideEnd({
          originalEvent: event,
          value: _value
        });
      }
      sliderHandleClick.current = false;
    };
    var updateDomData = function updateDomData() {
      var rect = elementRef.current.getBoundingClientRect();
      initX.current = rect.left + utils.DomHandler.getWindowScrollLeft();
      initY.current = rect.top + utils.DomHandler.getWindowScrollTop();
      barWidth.current = elementRef.current.offsetWidth;
      barHeight.current = elementRef.current.offsetHeight;
    };
    var setValue = function setValue(event) {
      var handleValue;
      var pageX = event.touches ? event.touches[0].pageX : event.pageX;
      var pageY = event.touches ? event.touches[0].pageY : event.pageY;
      if (horizontal) handleValue = (pageX - initX.current) * 100 / barWidth.current;else handleValue = (initY.current + barHeight.current - pageY) * 100 / barHeight.current;
      var newValue = (props.max - props.min) * (handleValue / 100) + props.min;
      if (props.step) {
        var oldValue = props.range ? value[handleIndex.current] : value;
        var diff = newValue - oldValue;
        if (diff < 0) newValue = oldValue + Math.ceil(newValue / props.step - oldValue / props.step) * props.step;else if (diff > 0) newValue = oldValue + Math.floor(newValue / props.step - oldValue / props.step) * props.step;
      } else {
        newValue = Math.floor(newValue);
      }
      return updateValue(event, newValue);
    };
    var updateValue = function updateValue(event, val) {
      var parsedValue = parseFloat(val.toFixed(10));
      var newValue = parsedValue;
      if (props.range) {
        if (handleIndex.current === 0) {
          if (parsedValue < props.min) parsedValue = props.min;else if (parsedValue > value[1]) parsedValue = value[1];
        } else {
          if (parsedValue > props.max) parsedValue = props.max;else if (parsedValue < value[0]) parsedValue = value[0];
        }
        newValue = _toConsumableArray(value);
        newValue[handleIndex.current] = parsedValue;
        if (props.onChange) {
          props.onChange({
            originalEvent: event,
            value: newValue
          });
        }
      } else {
        if (parsedValue < props.min) parsedValue = props.min;else if (parsedValue > props.max) parsedValue = props.max;
        newValue = parsedValue;
        if (props.onChange) {
          props.onChange({
            originalEvent: event,
            value: newValue
          });
        }
      }
      return newValue;
    };
    var createHandle = function createHandle(leftValue, bottomValue, index) {
      var style = {
        transition: dragging.current ? 'none' : null,
        left: leftValue !== null && leftValue + '%',
        bottom: bottomValue && bottomValue + '%'
      };
      var className = utils.classNames('p-slider-handle', {
        'p-slider-handle-start': index === 0,
        'p-slider-handle-end': index === 1,
        'p-slider-handle-active': handleIndex.current === index
      });
      return /*#__PURE__*/React__namespace.createElement("span", _extends({
        className: className,
        style: style,
        tabIndex: props.tabIndex,
        role: "slider",
        onMouseDown: function onMouseDown(event) {
          return _onMouseDown(event, index);
        },
        onTouchStart: function onTouchStart(event) {
          return _onTouchStart(event, index);
        },
        onKeyDown: function onKeyDown(event) {
          return _onKeyDown(event, index);
        },
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": leftValue || bottomValue,
        "aria-orientation": props.orientation
      }, ariaProps));
    };
    var createRangeSlider = function createRangeSlider() {
      var handleValueStart = (value[0] < props.min ? props.min : value[0] - props.min) * 100 / (props.max - props.min);
      var handleValueEnd = (value[1] > props.max ? props.max : value[1] - props.min) * 100 / (props.max - props.min);
      var rangeStartHandle = horizontal ? createHandle(handleValueStart, null, 0) : createHandle(null, handleValueStart, 0);
      var rangeEndHandle = horizontal ? createHandle(handleValueEnd, null, 1) : createHandle(null, handleValueEnd, 1);
      var rangeStyle = horizontal ? {
        left: handleValueStart + '%',
        width: handleValueEnd - handleValueStart + '%'
      } : {
        bottom: handleValueStart + '%',
        height: handleValueEnd - handleValueStart + '%'
      };
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-slider-range",
        style: rangeStyle
      }), rangeStartHandle, rangeEndHandle);
    };
    var createSingleSlider = function createSingleSlider() {
      var handleValue;
      if (value < props.min) handleValue = props.min;else if (value > props.max) handleValue = props.max;else handleValue = (value - props.min) * 100 / (props.max - props.min);
      var rangeStyle = horizontal ? {
        width: handleValue + '%'
      } : {
        height: handleValue + '%'
      };
      var handle = horizontal ? createHandle(handleValue, null, null) : createHandle(null, handleValue, null);
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-slider-range",
        style: rangeStyle
      }), handle);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Slider.defaultProps);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-slider p-component', props.className, {
      'p-disabled': props.disabled,
      'p-slider-horizontal': horizontal,
      'p-slider-vertical': vertical
    });
    var content = props.range ? createRangeSlider() : createSingleSlider();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      style: props.style,
      className: className
    }, otherProps, {
      onClick: onBarClick
    }), content);
  }));
  Slider.displayName = 'Slider';
  Slider.defaultProps = {
    __TYPE: 'Slider',
    id: null,
    value: null,
    min: 0,
    max: 100,
    orientation: 'horizontal',
    step: null,
    range: false,
    style: null,
    className: null,
    disabled: false,
    tabIndex: 0,
    onChange: null,
    onSlideEnd: null
  };

  exports.Slider = Slider;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.utils);
