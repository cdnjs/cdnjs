import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
var _options_;
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl";
import { useId } from "../../hooks/useId";
import { SizeType } from "../../lib/adaptivity";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../lib/warnOnce";
import { RootComponent } from "../RootComponent/RootComponent";
import { SegmentedControlOption } from "./SegmentedControlOption/SegmentedControlOption";
var sizeYClassNames = _define_property({
    none: "vkuiSegmentedControl--sizeY-none"
}, SizeType.REGULAR, "vkuiSegmentedControl--sizeY-regular");
var warn = warnOnce("SegmentedControl");
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export var SegmentedControl = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, name = _param.name, options = _param.options, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? (_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value : _param_defaultValue, children = _param.children, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _object_without_properties(_param, [
        "size",
        "name",
        "options",
        "defaultValue",
        "children",
        "onChange",
        "value"
    ]);
    var id = useId();
    var _useCustomEnsuredControl = _sliced_to_array(useCustomEnsuredControl({
        onChange: onChangeProp,
        value: valueProp,
        defaultValue: defaultValue
    }), 2), value = _useCustomEnsuredControl[0], onChange = _useCustomEnsuredControl[1];
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var actualIndex = options.findIndex(function(option) {
        return option.value === value;
    });
    useIsomorphicLayoutEffect(function() {
        if (actualIndex === -1 && process.env.NODE_ENV === "development") {
            warn("defaultValue: такого значения нет среди опций!", "error");
        }
    }, [
        actualIndex
    ]);
    var translateX = "translateX(".concat(100 * actualIndex, "%)");
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSegmentedControl", sizeY !== SizeType.COMPACT && sizeYClassNames[sizeY], size === "l" && "vkuiSegmentedControl--size-l")
    }), /*#__PURE__*/ React.createElement("div", {
        role: "radiogroup",
        className: "vkuiSegmentedControl__in"
    }, actualIndex > -1 && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: "vkuiSegmentedControl__slider",
        style: {
            width: "".concat(100 / options.length, "%"),
            transform: translateX,
            WebkitTransform: translateX
        }
    }), options.map(function(_param) /*#__PURE__*/ {
        var label = _param.label, optionProps = _object_without_properties(_param, [
            "label"
        ]);
        return React.createElement(SegmentedControlOption, _object_spread_props(_object_spread({
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