import * as React from 'react';
import { clamp } from '../../helpers/math';
import { UniversalSlider } from '../RangeSlider/UniversalSlider';
/**
 * @see https://vkcom.github.io/VKUI/#/Slider
 */ export const Slider = ({ onChange , min =0 , max =100 , defaultValue =min , value , ...props })=>{
    const isControlled = value !== undefined;
    const [localValue, setValue] = React.useState(defaultValue);
    const _value = clamp(isControlled ? value : localValue, min, max);
    const handleChange = React.useCallback((nextValue, event)=>{
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
    const rangeValue = React.useMemo(()=>[
            null,
            _value
        ], [
        _value
    ]);
    return /*#__PURE__*/ React.createElement(UniversalSlider, {
        ...props,
        value: rangeValue,
        onChange: handleChange,
        min: min,
        max: max
    });
};

//# sourceMappingURL=Slider.js.map