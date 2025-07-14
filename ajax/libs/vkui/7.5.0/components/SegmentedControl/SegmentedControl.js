'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
var _options_;
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { useTabsNavigation } from "../../hooks/useTabsNavigation.js";
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
 * @see https://vkui.io/components/segmented-control
 */ export const SegmentedControl = (_param)=>{
    var { size = 'l', name, options, defaultValue = (_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value, children, onChange: onChangeProp, value: valueProp, role = 'radiogroup' } = _param, restProps = _object_without_properties(_param, [
        "size",
        "name",
        "options",
        "defaultValue",
        "children",
        "onChange",
        "value",
        "role"
    ]);
    const id = React.useId();
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const [value, onChange] = useCustomEnsuredControl({
        onChange: onChangeProp,
        value: valueProp,
        defaultValue
    });
    const { sizeY = 'none' } = useAdaptivity();
    const { tabsRef } = useTabsNavigation(role === 'tablist', isRtl);
    const actualIndex = options.findIndex((option)=>option.value === value);
    useIsomorphicLayoutEffect(()=>{
        if (actualIndex === -1 && process.env.NODE_ENV === 'development') {
            warn('defaultValue: такого значения нет среди опций!', 'error');
        }
    }, [
        actualIndex
    ]);
    const sliderStyle = {
        '--vkui_internal--SegmentedControl_actual_index': String(actualIndex),
        '--vkui_internal--SegmentedControl_options': String(options.length)
    };
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSegmentedControl__host", sizeY !== 'compact' && sizeYClassNames[sizeY], size === 'l' && "vkuiSegmentedControl__sizeL", isRtl && "vkuiSegmentedControl__rtl"),
        children: /*#__PURE__*/ _jsxs("div", {
            role: role,
            ref: tabsRef,
            className: "vkuiSegmentedControl__in",
            children: [
                actualIndex > -1 && /*#__PURE__*/ _jsx("div", {
                    "aria-hidden": true,
                    className: "vkuiSegmentedControl__slider",
                    style: sliderStyle
                }),
                options.map((_param)=>{
                    var { label, before } = _param, optionProps = _object_without_properties(_param, [
                        "label",
                        "before"
                    ]);
                    const selected = value === optionProps.value;
                    const onSelect = ()=>onChange(optionProps.value);
                    var _optionProps_tabIndex;
                    const optionRootProps = role === 'tablist' ? _object_spread({
                        'role': 'tab',
                        'aria-selected': selected,
                        'onClick': onSelect,
                        'tabIndex': (_optionProps_tabIndex = optionProps.tabIndex) !== null && _optionProps_tabIndex !== void 0 ? _optionProps_tabIndex : selected ? 0 : -1
                    }, optionProps) : undefined;
                    const optionInputProps = role !== 'tablist' ? _object_spread({
                        role: optionProps.role || (role === 'radiogroup' ? 'radio' : undefined),
                        checked: selected,
                        onChange: onSelect,
                        name: name !== null && name !== void 0 ? name : id
                    }, optionProps) : undefined;
                    return /*#__PURE__*/ _jsx(SegmentedControlOption, {
                        before: before,
                        rootProps: optionRootProps,
                        inputProps: optionInputProps,
                        children: label
                    }, `${optionProps.value}`);
                })
            ]
        })
    }));
};

//# sourceMappingURL=SegmentedControl.js.map