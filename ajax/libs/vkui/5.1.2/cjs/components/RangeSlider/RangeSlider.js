"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeSlider = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _UniversalSlider = require("./UniversalSlider");
var _excluded = ["onChange", "min", "max", "defaultValue", "step"];
/**
 * @see https://vkcom.github.io/VKUI/#/RangeSlider
 */
var RangeSlider = function RangeSlider(_ref) {
  var onChange = _ref.onChange,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? [min, max] : _ref$defaultValue,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 0 : _ref$step,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isControlled = props.value !== undefined;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    localValue = _React$useState2[0],
    setValue = _React$useState2[1];
  var _ref2 = props.value || localValue,
    _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
    start = _ref3[0],
    end = _ref3[1];
  var value = React.useMemo(function () {
    return [(0, _math.clamp)(start, min, max), (0, _math.clamp)(end, min, max)];
  }, [end, max, min, start]);
  var handleChange = React.useCallback(function (nextValue, event) {
    if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
      return;
    }
    !isControlled && setValue(nextValue);
    onChange && onChange(nextValue, event);
  }, [props.disabled, value, isControlled, onChange]);
  return /*#__PURE__*/React.createElement(_UniversalSlider.UniversalSlider, (0, _extends2.default)({}, props, {
    value: value,
    onChange: handleChange,
    min: min,
    max: max,
    step: step
  }));
};
exports.RangeSlider = RangeSlider;
//# sourceMappingURL=RangeSlider.js.map