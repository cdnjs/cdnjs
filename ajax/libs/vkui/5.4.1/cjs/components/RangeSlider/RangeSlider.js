"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RangeSlider", {
    enumerable: true,
    get: function() {
        return RangeSlider;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _universalSlider = require("./UniversalSlider");
var RangeSlider = function(_param) {
    var onChange = _param.onChange, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? [
        min,
        max
    ] : _param_defaultValue, _param_step = _param.step, step = _param_step === void 0 ? 0 : _param_step, props = _objectWithoutProperties(_param, [
        "onChange",
        "min",
        "max",
        "defaultValue",
        "step"
    ]);
    var isControlled = props.value !== undefined;
    var _React_useState = _slicedToArray(_react.useState(defaultValue), 2), localValue = _React_useState[0], setValue = _React_useState[1];
    var _ref = _slicedToArray(props.value || localValue, 2), start = _ref[0], end = _ref[1];
    var value = _react.useMemo(function() {
        return [
            (0, _math.clamp)(start, min, max),
            (0, _math.clamp)(end, min, max)
        ];
    }, [
        end,
        max,
        min,
        start
    ]);
    var handleChange = _react.useCallback(function(nextValue, event) {
        if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
            return;
        }
        !isControlled && setValue(nextValue);
        onChange && onChange(nextValue, event);
    }, [
        props.disabled,
        value,
        isControlled,
        onChange
    ]);
    return /*#__PURE__*/ _react.createElement(_universalSlider.UniversalSlider, _objectSpreadProps(_objectSpread({}, props), {
        value: value,
        onChange: handleChange,
        min: min,
        max: max,
        step: step
    }));
};

//# sourceMappingURL=RangeSlider.js.map