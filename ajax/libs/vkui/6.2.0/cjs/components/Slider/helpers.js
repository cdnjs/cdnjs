"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    extractSliderAriaAttributesFromRestProps: function() {
        return extractSliderAriaAttributesFromRestProps;
    },
    getDraggingTypeByTargetDataset: function() {
        return getDraggingTypeByTargetDataset;
    },
    isMultipleValues: function() {
        return isMultipleValues;
    },
    offsetToValue: function() {
        return offsetToValue;
    },
    snapDirection: function() {
        return snapDirection;
    },
    toPercent: function() {
        return toPercent;
    },
    updateInternalStateValue: function() {
        return updateInternalStateValue;
    },
    updateInternalStateValueByNativeChange: function() {
        return updateInternalStateValueByNativeChange;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _math = require("../../helpers/math");
const toPercent = (v, min, max)=>(v - min) / (max - min) * 100;
const offsetToValue = (startX, width, min, max, step)=>{
    return (0, _math.rescale)(startX, [
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
const updateInternalStateValue = (prevValue, nextValue, min, max, dragging)=>{
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
const updateInternalStateValueByNativeChange = (prevValue, nextValue, dragging)=>{
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
function isMultipleValues(value) {
    return value[1] !== null;
}
const snapDirection = (prevValue, nextValue, type)=>{
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
const getDraggingTypeByTargetDataset = (target)=>{
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
const extractSliderAriaAttributesFromRestProps = (restProps)=>{
    const ariaLabel = restProps['aria-label'];
    const ariaValueText = restProps['aria-valuetext'];
    const ariaLabelledBy = restProps['aria-labelledby'];
    return _object_spread_props._(_object_spread._({}, restProps, resetProps), {
        ariaLabel,
        ariaValueText,
        ariaLabelledBy
    });
};

//# sourceMappingURL=helpers.js.map