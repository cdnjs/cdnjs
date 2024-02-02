"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SegmentedControl", {
    enumerable: true,
    get: function() {
        return SegmentedControl;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useId = require("../../hooks/useId");
var _adaptivity = require("../../lib/adaptivity");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _warnOnce = require("../../lib/warnOnce");
var _RootComponent = require("../RootComponent/RootComponent");
var _SegmentedControlOption = require("./SegmentedControlOption/SegmentedControlOption");
var _options_;
var sizeYClassNames = _define_property._({
    none: "vkuiSegmentedControl--sizeY-none"
}, _adaptivity.SizeType.REGULAR, "vkuiSegmentedControl--sizeY-regular");
var warn = (0, _warnOnce.warnOnce)("SegmentedControl");
var SegmentedControl = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, name = _param.name, options = _param.options, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? (_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value : _param_defaultValue, children = _param.children, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _object_without_properties._(_param, [
        "size",
        "name",
        "options",
        "defaultValue",
        "children",
        "onChange",
        "value"
    ]);
    var id = (0, _useId.useId)();
    var _useCustomEnsuredControl = _sliced_to_array._((0, _useEnsuredControl.useCustomEnsuredControl)({
        onChange: onChangeProp,
        value: valueProp,
        defaultValue: defaultValue
    }), 2), value = _useCustomEnsuredControl[0], onChange = _useCustomEnsuredControl[1];
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var actualIndex = options.findIndex(function(option) {
        return option.value === value;
    });
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (actualIndex === -1 && process.env.NODE_ENV === "development") {
            warn("defaultValue: такого значения нет среди опций!", "error");
        }
    }, [
        actualIndex
    ]);
    var translateX = "translateX(".concat(100 * actualIndex, "%)");
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiSegmentedControl", sizeY !== _adaptivity.SizeType.COMPACT && sizeYClassNames[sizeY], size === "l" && "vkuiSegmentedControl--size-l")
    }), /*#__PURE__*/ _react.createElement("div", {
        role: "radiogroup",
        className: "vkuiSegmentedControl__in"
    }, actualIndex > -1 && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiSegmentedControl__slider",
        style: {
            width: "".concat(100 / options.length, "%"),
            transform: translateX,
            WebkitTransform: translateX
        }
    }), options.map(function(_param) /*#__PURE__*/ {
        var label = _param.label, optionProps = _object_without_properties._(_param, [
            "label"
        ]);
        return _react.createElement(_SegmentedControlOption.SegmentedControlOption, _object_spread_props._(_object_spread._({
            key: "".concat(optionProps.value)
        }, optionProps), {
            name: name !== null && name !== void 0 ? name : id,
            checked: value === optionProps.value,
            onChange: function() {
                return onChange(optionProps.value);
            }
        }), label);
    })));
};

//# sourceMappingURL=SegmentedControl.js.map