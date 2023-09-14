import * as React from 'react';
import { rescale } from '../../helpers/math';
export const toPercent = (v, min, max)=>(v - min) / (max - min) * 100;
export const offsetToValue = (startX, width, min, max, step)=>{
    return rescale(startX, [
        0,
        width
    ], [
        min,
        max
    ], {
        step
    });
};
const restrictValueByMinMax = (value, min, max)=>{
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};
export const updateInternalStateValue = (prevValue, nextValue, min, max, dragging)=>{
    const [prevStartValue, prevEndValue] = prevValue;
    if (prevEndValue === null) {
        return [
            restrictValueByMinMax(nextValue, min, max),
            null
        ];
    }
    switch(dragging){
        case 'start':
            return nextValue > prevEndValue ? [
                prevEndValue,
                prevEndValue
            ] : [
                restrictValueByMinMax(nextValue, min, max),
                prevEndValue
            ];
        case 'end':
            return nextValue < prevStartValue ? [
                prevStartValue,
                prevStartValue
            ] : [
                prevStartValue,
                restrictValueByMinMax(nextValue, min, max)
            ];
        case null:
        default:
            return prevValue;
    }
};
export const updateInternalStateValueByNativeChange = (prevValue, nextValue, dragging)=>{
    const [prevStartValue, prevEndValue] = prevValue;
    switch(dragging){
        case 'start':
            return [
                nextValue,
                prevEndValue
            ];
        case 'end':
            return [
                prevStartValue,
                nextValue
            ];
        case null:
        default:
            return prevValue;
    }
};
export function isMultipleValues(value) {
    return value[1] !== null;
}
export const snapDirection = (prevValue, nextValue, type)=>{
    if (type === 'start') {
        return 'start';
    }
    if (type === 'end') {
        return 'end';
    }
    const [startRaw, endRaw] = prevValue;
    /* startRaw и endRaw могут быть равны, поэтому насильно добавляем разницу. */ const FORCE_DIFF_VALUE = 0.1;
    const start = endRaw !== null ? startRaw - FORCE_DIFF_VALUE : startRaw;
    const end = endRaw !== null ? endRaw + FORCE_DIFF_VALUE : 0;
    return Math.abs(start - nextValue) <= Math.abs(end - nextValue) ? 'start' : 'end';
};
export const getDraggingTypeByTargetDataset = (target)=>{
    if (target) {
        if (target.dataset.type === 'start') {
            return 'start';
        }
        if (target.dataset.type === 'end') {
            return 'end';
        }
    }
    return null;
};
const resetProps = {
    'aria-label': undefined,
    'aria-valuetext': undefined,
    'aria-labelledby': undefined
};
export const extractSliderAriaAttributesFromRestProps = (restProps)=>{
    const ariaLabel = restProps['aria-label'];
    const ariaValueText = restProps['aria-valuetext'];
    const ariaLabelledBy = restProps['aria-labelledby'];
    return {
        ...restProps,
        ...resetProps,
        ariaLabel,
        ariaValueText,
        ariaLabelledBy
    };
};

//# sourceMappingURL=helpers.js.map