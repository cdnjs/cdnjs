import * as React from 'react';
import { clamp } from '../../helpers/math';
import { UniversalSlider } from './UniversalSlider';
/**
 * @see https://vkcom.github.io/VKUI/#/RangeSlider
 */ export const RangeSlider = ({ onChange , min =0 , max =100 , defaultValue =[
    min,
    max
] , step =0 , ...props })=>{
    const isControlled = props.value !== undefined;
    const [localValue, setValue] = React.useState(defaultValue);
    const [start, end] = props.value || localValue;
    const value = React.useMemo(()=>[
            clamp(start, min, max),
            clamp(end, min, max)
        ], [
        end,
        max,
        min,
        start
    ]);
    const handleChange = React.useCallback((nextValue, event)=>{
        if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
            return;
        }
        !isControlled && setValue(nextValue);
        onChange && onChange(nextValue, event);
    }, [
        props.disabled,
        value,
        isControlled,
        onChange
    ]);
    return /*#__PURE__*/ React.createElement(UniversalSlider, {
        ...props,
        value: value,
        onChange: handleChange,
        min: min,
        max: max,
        step: step
    });
};

//# sourceMappingURL=RangeSlider.js.map