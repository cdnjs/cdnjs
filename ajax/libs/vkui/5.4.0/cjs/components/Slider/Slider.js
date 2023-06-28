"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Slider", {
    enumerable: true,
    get: function() {
        return Slider;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _universalSlider = require("../RangeSlider/UniversalSlider");
var Slider = function(_param) {
    var onChange = _param.onChange, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? min : _param_defaultValue, value = _param.value, props = _objectWithoutProperties(_param, [
        "onChange",
        "min",
        "max",
        "defaultValue",
        "value"
    ]);
    var isControlled = value !== undefined;
    var _React_useState = _slicedToArray(_react.useState(defaultValue), 2), localValue = _React_useState[0], setValue = _React_useState[1];
    var _value = (0, _math.clamp)(isControlled ? value : localValue, min, max);
    var handleChange = _react.useCallback(function(nextValue, event) {
        if (props.disabled || _value === nextValue[1]) {
            return;
        }
        !isControlled && setValue(nextValue[1]);
        onChange && onChange(nextValue[1], event);
    }, [
        props.disabled,
        _value,
        isControlled,
        onChange
    ]);
    var rangeValue = _react.useMemo(function() {
        return [
            null,
            _value
        ];
    }, [
        _value
    ]);
    return /*#__PURE__*/ _react.createElement(_universalSlider.UniversalSlider, _objectSpreadProps(_objectSpread({}, props), {
        value: rangeValue,
        onChange: handleChange,
        min: min,
        max: max
    }));
};

//# sourceMappingURL=Slider.js.map