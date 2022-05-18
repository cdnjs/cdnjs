import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onChange", "defaultValue", "min", "max", "value"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { clamp } from "../../helpers/math";
import { UniversalSlider } from "../RangeSlider/UniversalSlider";

var Slider = function Slider(_ref) {
  var onChange = _ref.onChange,
      defaultValue = _ref.defaultValue,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      props = _objectWithoutProperties(_ref, _excluded);

  var isControlled = value != null;

  var _React$useState = React.useState(defaultValue == null ? min : defaultValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      localValue = _React$useState2[0],
      setValue = _React$useState2[1];

  var _value = clamp(isControlled ? value : localValue, min, max);

  var handleChange = React.useCallback(function (nextValue, event) {
    if (props.disabled || _value === nextValue[1]) {
      return;
    }

    !isControlled && setValue(nextValue[1]);
    onChange && onChange(nextValue[1], event);
  }, [props.disabled, _value, isControlled, onChange]);
  var rangeValue = React.useMemo(function () {
    return [null, _value];
  }, [_value]);
  return createScopedElement(UniversalSlider, _extends({}, props, {
    value: rangeValue,
    onChange: handleChange,
    min: min,
    max: max
  }));
}; // eslint-disable-next-line import/no-default-export


export default Slider;
//# sourceMappingURL=Slider.js.map