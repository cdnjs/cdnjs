this.primereact = this.primereact || {};
this.primereact.slider = (function (exports, React, api, componentbase, hooks, utils) {
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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    handle: function handle(_ref) {
      var index = _ref.index,
        handleIndex = _ref.handleIndex;
      return utils.classNames('p-slider-handle', {
        'p-slider-handle-start': index === 0,
        'p-slider-handle-end': index === 1,
        'p-slider-handle-active': handleIndex.current === index
      });
    },
    range: 'p-slider-range',
    root: function root(_ref2) {
      var props = _ref2.props,
        vertical = _ref2.vertical,
        horizontal = _ref2.horizontal;
      return utils.classNames('p-slider p-component', {
        'p-disabled': props.disabled,
        'p-slider-horizontal': horizontal,
        'p-slider-vertical': vertical
      });
    }
  };
  var styles = "\n@layer primereact {\n    .p-slider {\n        position: relative;\n    }\n    \n    .p-slider .p-slider-handle {\n        position: absolute;\n        cursor: grab;\n        touch-action: none;\n        display: block;\n        z-index: 1;\n    }\n    \n    .p-slider .p-slider-handle.p-slider-handle-active {\n        z-index: 2;\n    }\n    \n    .p-slider-range {\n        position: absolute;\n        display: block;\n    }\n    \n    .p-slider-horizontal .p-slider-range {\n        top: 0;\n        left: 0;\n        height: 100%;\n    }\n    \n    .p-slider-horizontal .p-slider-handle {\n        top: 50%;\n    }\n    \n    .p-slider-vertical {\n        height: 100px;\n    }\n    \n    .p-slider-vertical .p-slider-handle {\n        left: 50%;\n    }\n    \n    .p-slider-vertical .p-slider-range {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n    }\n}\n";
  var inlineStyles = {
    handle: {
      position: 'absolute'
    },
    range: {
      position: 'absolute'
    }
  };
  var SliderBase = componentbase.ComponentBase.extend({
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
    },
    css: {
      classes: classes,
      styles: styles,
      inlineStyles: inlineStyles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Slider = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _props$value, _ref, _props$value2;
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = SliderBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(null);
    var handleIndex = React__namespace.useRef(0);
    var sliderHandleClick = React__namespace.useRef(false);
    var dragging = React__namespace.useRef(false);
    var initX = React__namespace.useRef(0);
    var initY = React__namespace.useRef(0);
    var barWidth = React__namespace.useRef(0);
    var barHeight = React__namespace.useRef(0);
    var touchId = React__namespace.useRef();
    var value = props.range ? (_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : [props.min, props.max] : (_ref = (_props$value2 = props.value) !== null && _props$value2 !== void 0 ? _props$value2 : props.min) !== null && _ref !== void 0 ? _ref : 0;
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
    var _SliderBase$setMetaDa = SliderBase.setMetaData({
        props: props
      }),
      ptm = _SliderBase$setMetaDa.ptm,
      cx = _SliderBase$setMetaDa.cx,
      sx = _SliderBase$setMetaDa.sx,
      isUnstyled = _SliderBase$setMetaDa.isUnstyled;
    componentbase.useHandleStyle(SliderBase.css.styles, isUnstyled, {
      name: 'slider'
    });
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
      if (props.range && value[0] === props.max) {
        handleIndex.current = 0;
      } else {
        handleIndex.current = index;
      }
      event.preventDefault();
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
        var newValue = setValue(event);
        props.onSlideEnd && props.onSlideEnd({
          originalEvent: event,
          value: newValue
        });
        touchId.current = undefined;
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
      if (event.changedTouches && event.changedTouches[0]) {
        touchId.current = event.changedTouches[0].identifier;
      }
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
      switch (key) {
        case 'ArrowRight':
        case 'ArrowUp':
          spin(event, 1);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          spin(event, -1);
          break;
        case 'PageUp':
          spin(event, 10);
          event.preventDefault();
          break;
        case 'PageDown':
          spin(event, -10);
          event.preventDefault();
          break;
        case 'Home':
          spin(event, -value);
          event.preventDefault();
          break;
        case 'End':
          spin(event, props.max);
          event.preventDefault();
          break;
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
    var trackTouch = function trackTouch(event) {
      var _event$changedTouches;
      var _event = Array.from((_event$changedTouches = event.changedTouches) !== null && _event$changedTouches !== void 0 ? _event$changedTouches : []).find(function (t) {
        return t.identifier === touchId.current;
      }) || event;
      return {
        pageX: _event.pageX,
        pageY: _event.pageY
      };
    };
    var setValue = function setValue(event) {
      var handleValue;
      var _trackTouch = trackTouch(event),
        pageX = _trackTouch.pageX,
        pageY = _trackTouch.pageY;
      if (!pageX || !pageY) {
        return;
      }
      if (horizontal) {
        handleValue = (pageX - initX.current) * 100 / barWidth.current;
      } else {
        handleValue = (initY.current + barHeight.current - pageY) * 100 / barHeight.current;
      }
      var newValue = (props.max - props.min) * (handleValue / 100) + props.min;
      if (props.step) {
        var oldValue = props.range ? value[handleIndex.current] : value;
        var diff = newValue - oldValue;
        if (diff < 0) {
          newValue = oldValue + Math.ceil(newValue / props.step - oldValue / props.step) * props.step;
        } else if (diff > 0) {
          newValue = oldValue + Math.floor(newValue / props.step - oldValue / props.step) * props.step;
        }
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
          if (parsedValue < props.min) {
            parsedValue = props.min;
          } else if (parsedValue > props.max) {
            parsedValue = props.max;
          }
        } else if (parsedValue > props.max) {
          parsedValue = props.max;
        } else if (parsedValue < props.min) {
          parsedValue = props.min;
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
        if (parsedValue < props.min) {
          parsedValue = props.min;
        } else if (parsedValue > props.max) {
          parsedValue = props.max;
        }
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
      leftValue = utils.ObjectUtils.isEmpty(leftValue) ? null : leftValue;
      bottomValue = utils.ObjectUtils.isEmpty(bottomValue) ? null : bottomValue;
      var style = {
        transition: dragging.current ? 'none' : null,
        left: leftValue != null ? leftValue + '%' : null,
        bottom: bottomValue != null ? bottomValue + '%' : null
      };
      var handleProps = mergeProps(_objectSpread({
        className: cx('handle', {
          index: index,
          handleIndex: handleIndex
        }),
        style: _objectSpread(_objectSpread({}, sx('handle', {
          dragging: dragging,
          leftValue: leftValue,
          bottomValue: bottomValue
        })), style),
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
        'aria-valuenow': leftValue || bottomValue || 0,
        'aria-orientation': props.orientation
      }, ariaProps), ptm('handle'));
      return /*#__PURE__*/React__namespace.createElement("span", handleProps);
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
        className: cx('range'),
        style: _objectSpread(_objectSpread({}, sx('range')), rangeStyle)
      }, ptm('range'));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", rangeProps), rangeStartHandle, rangeEndHandle);
    };
    var createSingleSlider = function createSingleSlider() {
      var handleValue;
      if (value < props.min) {
        handleValue = props.min;
      } else if (value > props.max) {
        handleValue = props.max;
      } else {
        handleValue = (value - props.min) * 100 / (props.max - props.min);
      }
      var rangeStyle = horizontal ? {
        width: handleValue + '%'
      } : {
        height: handleValue + '%'
      };
      var handle = horizontal ? createHandle(handleValue, null, null) : createHandle(null, handleValue, null);
      var rangeProps = mergeProps({
        className: cx('range'),
        style: _objectSpread(_objectSpread({}, sx('range')), rangeStyle)
      }, ptm('range'));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", rangeProps), handle);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = SliderBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var content = props.range ? createRangeSlider() : createSingleSlider();
    var rootProps = mergeProps({
      style: props.style,
      className: utils.classNames(props.className, cx('root', {
        vertical: vertical,
        horizontal: horizontal
      })),
      onClick: onBarClick
    }, SliderBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef
    }, rootProps), content);
  }));
  Slider.displayName = 'Slider';

  exports.Slider = Slider;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
