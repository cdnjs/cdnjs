import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["min", "max", "step", "value", "defaultValue", "onChange", "getRootRef", "sizeY", "disabled"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Touch } from "../Touch/Touch";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { rescale } from "../../helpers/math";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _value = _slicedToArray(value, 2),
      start = _value[0],
      end = _value[1];

  var isRange = start != null;
  var gesture = React.useRef({
    dragging: false,
    startX: 0,
    containerWidth: 0
  }).current;
  var container = useExternRef(getRootRef);
  var thumbStart = React.useRef();
  var thumbEnd = React.useRef();

  var offsetToValue = function offsetToValue(absolute) {
    return rescale(absolute, [0, gesture.containerWidth], [min, max], {
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
  return createScopedElement(Touch, _extends({
    "data-value": isRange ? value.join(",") : value
  }, restProps, disabled ? {} : {
    onStart: onStart,
    onMove: onMove,
    onEnd: onEnd
  }, {
    vkuiClass: classNames(getClassName("Slider", platform), "Slider--sizeY-".concat(sizeY), disabled && "Slider--disabled")
  }), createScopedElement("div", {
    ref: container,
    vkuiClass: "Slider__in"
  }, createScopedElement("div", {
    vkuiClass: "Slider__dragger",
    style: draggerStyle
  }, isRange && createScopedElement("span", {
    vkuiClass: classNames("Slider__thumb", "Slider__thumb--start"),
    ref: thumbStart
  }), createScopedElement("span", {
    vkuiClass: classNames("Slider__thumb", "Slider__thumb--end"),
    ref: thumbEnd
  }))));
};

export var UniversalSlider = withAdaptivity(UniversalSliderDumb, {
  sizeY: true
});
//# sourceMappingURL=UniversalSlider.js.map