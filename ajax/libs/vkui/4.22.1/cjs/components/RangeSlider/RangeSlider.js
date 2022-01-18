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

var _UniversalSlider = require("./UniversalSlider");

var _excluded = ["onChange", "defaultValue"];

var RangeSlider = function RangeSlider(_ref) {
  var onChange = _ref.onChange,
      defaultValue = _ref.defaultValue,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isControlled = Boolean(props.value);

  var _React$useState = React.useState(defaultValue || [props.min, props.max]),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localValue = _React$useState2[0],
      setValue = _React$useState2[1];

  var _ref2 = props.value || localValue,
      _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      start = _ref3[0],
      end = _ref3[1];

  var value = [(0, _math.clamp)(start, props.min, props.max), (0, _math.clamp)(end, props.min, props.max)];
  var handleChange = React.useCallback(function (nextValue, event) {
    if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
      return;
    }

    !isControlled && setValue(nextValue);
    onChange && onChange(nextValue, event);
  }, [onChange, isControlled, value]);
  return (0, _jsxRuntime.createScopedElement)(_UniversalSlider.UniversalSlider, (0, _extends2.default)({}, props, {
    value: value,
    onChange: handleChange
  }));
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 0
};
var _default = RangeSlider;
exports.default = _default;
//# sourceMappingURL=RangeSlider.js.map