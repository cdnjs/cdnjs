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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _Slider = require("../Slider/Slider");
var RangeSlider = function(_param) {
    var _param_step = _param.step, step = _param_step === void 0 ? 0 : _param_step, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? [
        min,
        max
    ] : _param_defaultValue, restProps = _object_without_properties._(_param, [
        "step",
        "min",
        "max",
        "defaultValue"
    ]);
    return /*#__PURE__*/ _react.createElement(_Slider.Slider, _object_spread_props._(_object_spread._({
        step: step,
        min: min,
        max: max,
        defaultValue: defaultValue
    }, restProps), {
        multiple: true
    }));
};

//# sourceMappingURL=RangeSlider.js.map