import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["min", "max", "step", "value", "defaultValue", "onChange", "getRootRef", "disabled", "className"];
import * as React from 'react';
import { Touch } from '../Touch/Touch';
import { classNames } from '@vkontakte/vkjs';
import { rescale } from '../../helpers/math';
import { useExternRef } from '../../hooks/useExternRef';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "../Slider/Slider.module.css";
export var UniversalSlider = function UniversalSlider(_ref) {
  var _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    step = _ref.step,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [0, 0] : _ref$value,
    defaultValue = _ref.defaultValue,
    onChange = _ref.onChange,
    getRootRef = _ref.getRootRef,
    disabled = _ref.disabled,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
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
  var thumbStart = React.useRef(null);
  var thumbEnd = React.useRef(null);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
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
    if (dragging === 'start') {
      if (nextValue > end) {
        // "перехватиться", если перетянули за конец
        gesture.dragging = 'end';
        return [end, nextValue];
      }
      return [nextValue, end];
    }
    if (dragging === 'end') {
      if (nextValue < start) {
        // "перехватиться", если перетянули за начало
        gesture.dragging = 'start';
        return [nextValue, start];
      }
      return [start, nextValue];
    }
    return value;
  };
  var snapDirection = function snapDirection(pos, target) {
    if (target === thumbStart.current) {
      return 'start';
    }
    if (target === thumbEnd.current) {
      return 'end';
    }
    return Math.abs((start !== null && start !== void 0 ? start : 0) - pos) <= Math.abs(end - pos) ? 'start' : 'end';
  };
  var onStart = function onStart(e) {
    var _container$current, _boundingRect$width, _boundingRect$left;
    var boundingRect = (_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.getBoundingClientRect();
    gesture.containerWidth = (_boundingRect$width = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width) !== null && _boundingRect$width !== void 0 ? _boundingRect$width : 0;
    var absolutePosition = e.startX - ((_boundingRect$left = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.left) !== null && _boundingRect$left !== void 0 ? _boundingRect$left : 0);
    var pos = offsetToValue(absolutePosition);
    gesture.dragging = snapDirection(pos, e.originalEvent.target);
    gesture.startX = absolutePosition;
    onChange === null || onChange === void 0 ? void 0 : onChange(updateRange(pos), e);
    e.originalEvent.stopPropagation();
  };
  var onMove = function onMove(e) {
    onChange === null || onChange === void 0 ? void 0 : onChange(updateRange(offsetToValue(gesture.startX + (e.shiftX || 0))), e);
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
    width: "".concat(toPercent(end) - toPercent(start !== null && start !== void 0 ? start : 0), "%"),
    left: "".concat(toPercent(start !== null && start !== void 0 ? start : 0), "%")
  } : {
    width: "".concat(toPercent(end), "%")
  };
  return /*#__PURE__*/React.createElement(Touch, _extends({
    "data-value": isRange ? value.join(',') : value
  }, restProps, disabled ? {} : {
    onStart: onStart,
    onMove: onMove,
    onEnd: onEnd
  }, {
    className: classNames("vkuiSlider", getSizeYClassName("vkuiSlider", sizeY), disabled && "vkuiSlider--disabled", className)
  }), /*#__PURE__*/React.createElement("div", {
    ref: container,
    className: "vkuiSlider__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSlider__dragger",
    style: draggerStyle
  }, isRange && /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiSlider__thumb", "vkuiSlider__thumb--start"),
    ref: thumbStart
  }), /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiSlider__thumb", "vkuiSlider__thumb--end"),
    ref: thumbEnd
  }))));
};
//# sourceMappingURL=UniversalSlider.js.map