import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onChange", "defaultValue"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { clamp } from "../../helpers/math";
import { UniversalSlider } from "./UniversalSlider";

var RangeSlider = function RangeSlider(_ref) {
  var onChange = _ref.onChange,
      defaultValue = _ref.defaultValue,
      props = _objectWithoutProperties(_ref, _excluded);

  var isControlled = Boolean(props.value);

  var _React$useState = React.useState(defaultValue || [props.min, props.max]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      localValue = _React$useState2[0],
      setValue = _React$useState2[1];

  var _ref2 = props.value || localValue,
      _ref3 = _slicedToArray(_ref2, 2),
      start = _ref3[0],
      end = _ref3[1];

  var value = [clamp(start, props.min, props.max), clamp(end, props.min, props.max)];
  var handleChange = React.useCallback(function (nextValue, event) {
    if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
      return;
    }

    !isControlled && setValue(nextValue);
    onChange && onChange(nextValue, event);
  }, [onChange, isControlled, value]);
  return createScopedElement(UniversalSlider, _extends({}, props, {
    value: value,
    onChange: handleChange
  }));
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 0
};
export default RangeSlider;
//# sourceMappingURL=RangeSlider.js.map