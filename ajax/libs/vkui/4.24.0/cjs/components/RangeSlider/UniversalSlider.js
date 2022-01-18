"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniversalSlider = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Touch = require("../Touch/Touch");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _math = require("../../helpers/math");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["min", "max", "step", "value", "defaultValue", "onChange", "getRootRef", "sizeY", "disabled"];

var UniversalSliderDumb = function UniversalSliderDumb(_ref) {
  var min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      value = _ref.value,
      defaultValue = _ref.defaultValue,
      onChange = _ref.onChange,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      disabled = _ref.disabled,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _value = (0, _slicedToArray2.default)(value, 2),
      start = _value[0],
      end = _value[1];

  var isRange = start != null;
  var gesture = React.useRef({
    dragging: false,
    startX: 0,
    containerWidth: 0
  }).current;
  var container = (0, _useExternRef.useExternRef)(getRootRef);
  var thumbStart = React.useRef();
  var thumbEnd = React.useRef();

  var offsetToValue = function offsetToValue(absolute) {
    return (0, _math.rescale)(absolute, [0, gesture.containerWidth], [min, max], {
      step: step
    });
  };

  var updateRange = function updateRange(nextValue) {
    if (start == null) {
      return [null, nextValue];
    }

    var dragging = gesture.dragging;

    if (dragging === "start") {
      if (nextValue > end) {
        // "перехватиться", если перетянули за конец
        gesture.dragging = "end";
        return [end, nextValue];
      }

      return [nextValue, end];
    }

    if (dragging === "end") {
      if (nextValue < start) {
        // "перехватиться", если перетянули за начало
        gesture.dragging = "start";
        return [nextValue, start];
      }

      return [start, nextValue];
    }

    return value;
  };

  var snapDirection = function snapDirection(pos, target) {
    if (target === thumbStart.current) {
      return "start";
    }

    if (target === thumbEnd.current) {
      return "end";
    }

    return Math.abs(start - pos) <= Math.abs(end - pos) ? "start" : "end";
  };

  var onStart = function onStart(e) {
    var boundingRect = container.current.getBoundingClientRect();
    gesture.containerWidth = boundingRect.width;
    var absolutePosition = e.startX - boundingRect.left;
    var pos = offsetToValue(absolutePosition);
    gesture.dragging = snapDirection(pos, e.originalEvent.target);
    gesture.startX = absolutePosition;
    onChange(updateRange(pos), e);
    e.originalEvent.stopPropagation();
  };

  var onMove = function onMove(e) {
    onChange(updateRange(offsetToValue(gesture.startX + (e.shiftX || 0))), e);
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
  };

  var onEnd = function onEnd(e) {
    gesture.dragging = false;
    e.originalEvent.stopPropagation();
  };

  var toPercent = function toPercent(v) {
    return (v - min) / (max - min) * 100;
  };

  var draggerStyle = isRange ? {
    width: "".concat(toPercent(end) - toPercent(start), "%"),
    left: "".concat(toPercent(start), "%")
  } : {
    width: "".concat(toPercent(end), "%")
  };
  return (0, _jsxRuntime.createScopedElement)(_Touch.Touch, (0, _extends2.default)({
    "data-value": isRange ? value.join(",") : value
  }, restProps, disabled ? {} : {
    onStart: onStart,
    onMove: onMove,
    onEnd: onEnd
  }, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Slider", platform), "Slider--sizeY-".concat(sizeY), disabled && "Slider--disabled")
  }), (0, _jsxRuntime.createScopedElement)("div", {
    ref: container,
    vkuiClass: "Slider__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Slider__dragger",
    style: draggerStyle
  }, isRange && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: (0, _classNames.classNames)("Slider__thumb", "Slider__thumb--start"),
    ref: thumbStart
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: (0, _classNames.classNames)("Slider__thumb", "Slider__thumb--end"),
    ref: thumbEnd
  }))));
};

var UniversalSlider = (0, _withAdaptivity.withAdaptivity)(UniversalSliderDumb, {
  sizeY: true
});
exports.UniversalSlider = UniversalSlider;
//# sourceMappingURL=UniversalSlider.js.map