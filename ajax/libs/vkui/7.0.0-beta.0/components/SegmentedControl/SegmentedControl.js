import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
var _options_;
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { SegmentedControlOption } from "./SegmentedControlOption/SegmentedControlOption.js";
const sizeYClassNames = {
    none: "vkuiSegmentedControl__sizeYNone",
    regular: "vkuiSegmentedControl__sizeYRegular"
};
const warn = warnOnce('SegmentedControl');
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControl = (_param)=>{
    var { size = 'l', name, options, defaultValue = (_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value, children, onChange: onChangeProp, value: valueProp } = _param, restProps = _object_without_properties(_param, [
        "size",
        "name",
        "options",
        "defaultValue",
        "children",
        "onChange",
        "value"
    ]);
    const id = React.useId();
    const [value, onChange] = useCustomEnsuredControl({
        onChange: onChangeProp,
        value: valueProp,
        defaultValue
    });
    const { sizeY = 'none' } = useAdaptivity();
    const actualIndex = options.findIndex((option)=>option.value === value);
    useIsomorphicLayoutEffect(()=>{
        if (actualIndex === -1 && process.env.NODE_ENV === 'development') {
            warn('defaultValue: такого значения нет среди опций!', 'error');
        }
    }, [
        actualIndex
    ]);
    const translateX = `translateX(${100 * actualIndex}%)`;
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSegmentedControl__host", sizeY !== 'compact' && sizeYClassNames[sizeY], size === 'l' && "vkuiSegmentedControl__sizeL"),
        children: /*#__PURE__*/ _jsxs("div", {
            role: "radiogroup",
            className: "vkuiSegmentedControl__in",
            children: [
                actualIndex > -1 && /*#__PURE__*/ _jsx("div", {
                    "aria-hidden": true,
                    className: "vkuiSegmentedControl__slider",
                    style: {
                        width: `${100 / options.length}%`,
                        transform: translateX
                    }
                }),
                options.map((_param)=>{
                    var { label } = _param, optionProps = _object_without_properties(_param, [
                        "label"
                    ]);
                    return /*#__PURE__*/ _jsx(SegmentedControlOption, _object_spread_props(_object_spread({}, optionProps), {
                        name: name !== null && name !== void 0 ? name : id,
                        checked: value === optionProps.value,
                        onChange: ()=>onChange(optionProps.value),
                        children: label
                    }), `${optionProps.value}`);
                })
            ]
        })
    }));
};

//# sourceMappingURL=SegmentedControl.js.map