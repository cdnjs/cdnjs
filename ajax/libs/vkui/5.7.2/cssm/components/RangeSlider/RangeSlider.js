import * as React from 'react';
import { Slider } from '../Slider/Slider';
/**
 * @see https://vkcom.github.io/VKUI/#/RangeSlider
 *
 * @deprecated 5.5.0
 *
 * Компонент устарел и будет удален в v6. Используйте [`Slider`](#/Slider).
 */ export const RangeSlider = ({ step = 0, min = 0, max = 100, defaultValue = [
    min,
    max
], ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Slider, {
        step: step,
        min: min,
        max: max,
        defaultValue: defaultValue,
        ...restProps,
        multiple: true
    });
};

//# sourceMappingURL=RangeSlider.js.map