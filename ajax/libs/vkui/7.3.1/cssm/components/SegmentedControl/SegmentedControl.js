'use client';
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
import styles from "./SegmentedControl.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    regular: styles.sizeYRegular
};
const warn = warnOnce('SegmentedControl');
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControl = ({ size = 'l', name, options, defaultValue = options[0]?.value, children, onChange: onChangeProp, value: valueProp, role = 'radiogroup', ...restProps })=>{
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, sizeY !== 'compact' && sizeYClassNames[sizeY], size === 'l' && styles.sizeL, isRtl && styles.rtl),
        children: /*#__PURE__*/ _jsxs("div", {
            role: role,
            ref: tabsRef,
            className: styles.in,
            children: [
                actualIndex > -1 && /*#__PURE__*/ _jsx("div", {
                    "aria-hidden": true,
                    className: styles.slider,
                    style: sliderStyle
                }),
                options.map(({ label, before, ...optionProps })=>{
                    const selected = value === optionProps.value;
                    const onSelect = ()=>onChange(optionProps.value);
                    const optionRootProps = role === 'tablist' ? {
                        'role': 'tab',
                        'aria-selected': selected,
                        'onClick': onSelect,
                        'tabIndex': optionProps.tabIndex ?? (selected ? 0 : -1),
                        ...optionProps
                    } : undefined;
                    const optionInputProps = role !== 'tablist' ? {
                        role: optionProps.role || (role === 'radiogroup' ? 'radio' : undefined),
                        checked: selected,
                        onChange: onSelect,
                        name: name ?? id,
                        ...optionProps
                    } : undefined;
                    return /*#__PURE__*/ _jsx(SegmentedControlOption, {
                        before: before,
                        rootProps: optionRootProps,
                        inputProps: optionInputProps,
                        children: label
                    }, `${optionProps.value}`);
                })
            ]
        })
    });
};

//# sourceMappingURL=SegmentedControl.js.map