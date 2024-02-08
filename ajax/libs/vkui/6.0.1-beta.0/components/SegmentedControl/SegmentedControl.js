import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
var _options_;
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
import { RootComponent } from '../RootComponent/RootComponent';
import { SegmentedControlOption } from './SegmentedControlOption/SegmentedControlOption';
const sizeYClassNames = {
    none: "vkuiSegmentedControl--sizeY-none",
    ['regular']: "vkuiSegmentedControl--sizeY-regular"
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSegmentedControl", sizeY !== 'compact' && sizeYClassNames[sizeY], size === 'l' && "vkuiSegmentedControl--size-l")
    }), /*#__PURE__*/ React.createElement("div", {
        role: "radiogroup",
        className: "vkuiSegmentedControl__in"
    }, actualIndex > -1 && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: "vkuiSegmentedControl__slider",
        style: {
            width: `${100 / options.length}%`,
            transform: translateX,
            WebkitTransform: translateX
        }
    }), options.map((_param)=>{
        var { label } = _param, optionProps = _object_without_properties(_param, [
            "label"
        ]);
        return /*#__PURE__*/ React.createElement(SegmentedControlOption, _object_spread_props(_object_spread({
            key: `${optionProps.value}`
        }, optionProps), {
            name: name !== null && name !== void 0 ? name : id,
            checked: value === optionProps.value,
            onChange: ()=>onChange(optionProps.value)
        }), label);
    })));
};

//# sourceMappingURL=SegmentedControl.js.map