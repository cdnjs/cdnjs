import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
import { RootComponent } from '../RootComponent/RootComponent';
import { SegmentedControlOption } from './SegmentedControlOption/SegmentedControlOption';
import styles from './SegmentedControl.module.css';
const sizeYClassNames = {
    none: styles['SegmentedControl--sizeY-none'],
    regular: styles['SegmentedControl--sizeY-regular']
};
const warn = warnOnce('SegmentedControl');
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControl = ({ size = 'l', name, options, defaultValue = options[0]?.value, children, onChange: onChangeProp, value: valueProp, ...restProps })=>{
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['SegmentedControl'], sizeY !== 'compact' && sizeYClassNames[sizeY], size === 'l' && styles['SegmentedControl--size-l']),
        children: /*#__PURE__*/ _jsxs("div", {
            role: "radiogroup",
            className: styles['SegmentedControl__in'],
            children: [
                actualIndex > -1 && /*#__PURE__*/ _jsx("div", {
                    "aria-hidden": true,
                    className: styles['SegmentedControl__slider'],
                    style: {
                        width: `${100 / options.length}%`,
                        transform: translateX
                    }
                }),
                options.map(({ label, ...optionProps })=>/*#__PURE__*/ _jsx(SegmentedControlOption, {
                        ...optionProps,
                        name: name ?? id,
                        checked: value === optionProps.value,
                        onChange: ()=>onChange(optionProps.value),
                        children: label
                    }, `${optionProps.value}`))
            ]
        })
    });
};

//# sourceMappingURL=SegmentedControl.js.map