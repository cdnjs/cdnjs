import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onChange", "defaultValue"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { clamp } from "../../helpers/math";
import { UniversalSlider } from "../RangeSlider/UniversalSlider";

var Slider = function Slider(_ref) {
  var onChange = _ref.onChange,
      defaultValue = _ref.defaultValue,
      props = _objectWithoutProperties(_ref, _excluded);

  var isControlled = props.value != null;

  var _React$useState = React.useState(defaultValue == null ? props.min : defaultValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      localValue = _React$useState2[0],
      setValue = _React$useState2[1];

  var value = clamp(isControlled ? props.value : localValue, props.min, props.max);
  var handleChange = React.useCallback(function (nextValue, event) {
    if (props.disabled || value === nextValue[1]) {
      return;
    }

    !isControlled && setValue(nextValue[1]);
    onChange && onChange(nextValue[1], event);
  }, [onChange, isControlled, value]);
  var rangeValue = React.useMemo(function () {
    return [null, value];
  }, [value]);
  return createScopedElement(UniversalSlider, _extends({}, props, {
    value: rangeValue,
    onChange: handleChange
  }));
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 0
};
export default Slider;
//# sourceMappingURL=Slider.js.map