"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _math = require("../../helpers/math");

var _UniversalSlider = require("../RangeSlider/UniversalSlider");

var _excluded = ["onChange", "defaultValue"];

var Slider = function Slider(_ref) {
  var onChange = _ref.onChange,
      defaultValue = _ref.defaultValue,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isControlled = props.value != null;

  var _React$useState = React.useState(defaultValue == null ? props.min : defaultValue),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localValue = _React$useState2[0],
      setValue = _React$useState2[1];

  var value = (0, _math.clamp)(isControlled ? props.value : localValue, props.min, props.max);
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
  return (0, _jsxRuntime.createScopedElement)(_UniversalSlider.UniversalSlider, (0, _extends2.default)({}, props, {
    value: rangeValue,
    onChange: handleChange
  }));
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 0
};
var _default = Slider;
exports.default = _default;
//# sourceMappingURL=Slider.js.map