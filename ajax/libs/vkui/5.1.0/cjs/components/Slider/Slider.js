"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _UniversalSlider = require("../RangeSlider/UniversalSlider");
var _excluded = ["onChange", "min", "max", "defaultValue"];
/**
 * @see https://vkcom.github.io/VKUI/#/Slider
 */
var Slider = function Slider(_ref) {
  var onChange = _ref.onChange,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? min : _ref$defaultValue,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isControlled = props.value !== undefined;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    localValue = _React$useState2[0],
    setValue = _React$useState2[1];
  var _value = (0, _math.clamp)(props.value || localValue, min, max);
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
  return /*#__PURE__*/React.createElement(_UniversalSlider.UniversalSlider, (0, _extends2.default)({}, props, {
    value: rangeValue,
    onChange: handleChange,
    min: min,
    max: max
  }));
};
exports.Slider = Slider;
//# sourceMappingURL=Slider.js.map