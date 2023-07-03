import * as React from 'react';
import { useEventListener } from 'primereact/hooks';
import { ObjectUtils, DomHandler, classNames, mergeProps } from 'primereact/utils';
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var SliderBase = ComponentBase.extend({
  defaultProps: {
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
    onSlideEnd: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Slider = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = SliderBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var handleIndex = React.useRef(0);
  var sliderHandleClick = React.useRef(false);
  var dragging = React.useRef(false);
  var initX = React.useRef(0);
  var initY = React.useRef(0);
  var barWidth = React.useRef(0);
  var barHeight = React.useRef(0);
  var value = props.range ? props.value || [props.min, props.max] : props.value || 0;
  var horizontal = props.orientation === 'horizontal';
  var vertical = props.orientation === 'vertical';
  var _useEventListener = useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        return onDrag(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      listener: function listener(event) {
        return onDragEnd(event);
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var _useEventListener5 = useEventListener({
      type: 'touchmove',
      listener: function listener(event) {
        return onDrag(event);
      }
    }),
    _useEventListener6 = _slicedToArray(_useEventListener5, 2),
    bindDocumentTouchMoveListener = _useEventListener6[0],
    unbindDocumentTouchMoveListener = _useEventListener6[1];
  var _useEventListener7 = useEventListener({
      type: 'touchend',
      listener: function listener(event) {
        return onDragEnd(event);
      }
    }),
    _useEventListener8 = _slicedToArray(_useEventListener7, 2),
    bindDocumentTouchEndListener = _useEventListener8[0],
    unbindDocumentTouchEndListener = _useEventListener8[1];
  var _SliderBase$setMetaDa = SliderBase.setMetaData({
      props: props
    }),
    ptm = _SliderBase$setMetaDa.ptm;
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
    initX.current = rect.left + DomHandler.getWindowScrollLeft();
    initY.current = rect.top + DomHandler.getWindowScrollTop();
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
        if (parsedValue < props.min) parsedValue = props.min;else if (parsedValue > props.max) parsedValue = props.max;
      } else {
        if (parsedValue > props.max) parsedValue = props.max;else if (parsedValue < props.min) parsedValue = props.min;
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
    var className = classNames('p-slider-handle', {
      'p-slider-handle-start': index === 0,
      'p-slider-handle-end': index === 1,
      'p-slider-handle-active': handleIndex.current === index
    });
    var handleProps = mergeProps(_objectSpread({
      className: className,
      style: style,
      tabIndex: props.tabIndex,
      role: 'slider',
      onMouseDown: function onMouseDown(event) {
        return _onMouseDown(event, index);
      },
      onTouchStart: function onTouchStart(event) {
        return _onTouchStart(event, index);
      },
      onKeyDown: function onKeyDown(event) {
        return _onKeyDown(event, index);
      },
      'aria-valuemin': props.min,
      'aria-valuemax': props.max,
      'aria-valuenow': leftValue || bottomValue,
      'aria-orientation': props.orientation
    }, ariaProps), ptm('handle'));
    return /*#__PURE__*/React.createElement("span", handleProps);
  };
  var createRangeSlider = function createRangeSlider() {
    var handleValueStart = (value[0] < props.min ? props.min : value[0] - props.min) * 100 / (props.max - props.min);
    var handleValueEnd = (value[1] > props.max ? props.max : value[1] - props.min) * 100 / (props.max - props.min);
    var rangeStartHandle = horizontal ? createHandle(handleValueStart, null, 0) : createHandle(null, handleValueStart, 0);
    var rangeEndHandle = horizontal ? createHandle(handleValueEnd, null, 1) : createHandle(null, handleValueEnd, 1);
    var rangeSliderWidth = handleValueEnd > handleValueStart ? handleValueEnd - handleValueStart : handleValueStart - handleValueEnd;
    var rangeSliderPosition = handleValueEnd > handleValueStart ? handleValueStart : handleValueEnd;
    var rangeStyle = horizontal ? {
      left: rangeSliderPosition + '%',
      width: rangeSliderWidth + '%'
    } : {
      bottom: rangeSliderPosition + '%',
      height: rangeSliderWidth + '%'
    };
    var rangeProps = mergeProps({
      className: 'p-slider-range',
      style: rangeStyle
    }, ptm('range'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", rangeProps), rangeStartHandle, rangeEndHandle);
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
    var rangeProps = mergeProps({
      className: 'p-slider-range',
      style: rangeStyle
    }, ptm('range'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", rangeProps), handle);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = SliderBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-slider p-component', props.className, {
    'p-disabled': props.disabled,
    'p-slider-horizontal': horizontal,
    'p-slider-vertical': vertical
  });
  var content = props.range ? createRangeSlider() : createSingleSlider();
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    style: props.style,
    className: className,
    onClick: onBarClick
  }, SliderBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, content);
}));
Slider.displayName = 'Slider';

export { Slider };
