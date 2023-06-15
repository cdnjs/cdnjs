import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onChange", "min", "max", "defaultValue", "step"];
import * as React from 'react';
import { clamp } from '../../helpers/math';
import { UniversalSlider } from './UniversalSlider';
/**
 * @see https://vkcom.github.io/VKUI/#/RangeSlider
 */
export var RangeSlider = function RangeSlider(_ref) {
  var onChange = _ref.onChange,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? [min, max] : _ref$defaultValue,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 0 : _ref$step,
    props = _objectWithoutProperties(_ref, _excluded);
  var isControlled = props.value !== undefined;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    localValue = _React$useState2[0],
    setValue = _React$useState2[1];
  var _ref2 = props.value || localValue,
    _ref3 = _slicedToArray(_ref2, 2),
    start = _ref3[0],
    end = _ref3[1];
  var value = React.useMemo(function () {
    return [clamp(start, min, max), clamp(end, min, max)];
  }, [end, max, min, start]);
  var handleChange = React.useCallback(function (nextValue, event) {
    if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
      return;
    }
    !isControlled && setValue(nextValue);
    onChange && onChange(nextValue, event);
  }, [props.disabled, value, isControlled, onChange]);
  return /*#__PURE__*/React.createElement(UniversalSlider, _extends({}, props, {
    value: value,
    onChange: handleChange,
    min: min,
    max: max,
    step: step
  }));
};
//# sourceMappingURL=RangeSlider.js.map