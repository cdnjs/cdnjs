import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { rescale } from "../../helpers/math";
export var toPercent = function(v, min, max) {
    return (v - min) / (max - min) * 100;
};
export var offsetToValue = function(startX, width, min, max, step) {
    return rescale(startX, [
        0,
        width
    ], [
        min,
        max
    ], {
        step: step
    });
};
var restrictValueByMinMax = function(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};
export var updateInternalStateValue = function(prevValue, nextValue, min, max, dragging) {
    var _prevValue = _sliced_to_array(prevValue, 2), prevStartValue = _prevValue[0], prevEndValue = _prevValue[1];
    if (prevEndValue === null) {
        return [
            restrictValueByMinMax(nextValue, min, max),
            null
        ];
    }
    switch(dragging){
        case "start":
            return nextValue > prevEndValue ? [
                prevEndValue,
                prevEndValue
            ] : [
                restrictValueByMinMax(nextValue, min, max),
                prevEndValue
            ];
        case "end":
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
export var updateInternalStateValueByNativeChange = function(prevValue, nextValue, dragging) {
    var _prevValue = _sliced_to_array(prevValue, 2), prevStartValue = _prevValue[0], prevEndValue = _prevValue[1];
    switch(dragging){
        case "start":
            return [
                nextValue,
                prevEndValue
            ];
        case "end":
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
export var snapDirection = function(prevValue, nextValue, type) {
    if (type === "start") {
        return "start";
    }
    if (type === "end") {
        return "end";
    }
    var _prevValue = _sliced_to_array(prevValue, 2), startRaw = _prevValue[0], endRaw = _prevValue[1];
    /* startRaw и endRaw могут быть равны, поэтому насильно добавляем разницу. */ var FORCE_DIFF_VALUE = 0.1;
    var start = endRaw !== null ? startRaw - FORCE_DIFF_VALUE : startRaw;
    var end = endRaw !== null ? endRaw + FORCE_DIFF_VALUE : 0;
    return Math.abs(start - nextValue) <= Math.abs(end - nextValue) ? "start" : "end";
};
export var getDraggingTypeByTargetDataset = function(target) {
    if (target) {
        if (target.dataset.type === "start") {
            return "start";
        }
        if (target.dataset.type === "end") {
            return "end";
        }
    }
    return null;
};
var resetProps = {
    "aria-label": undefined,
    "aria-valuetext": undefined,
    "aria-labelledby": undefined
};
export var extractSliderAriaAttributesFromRestProps = function(restProps) {
    var ariaLabel = restProps["aria-label"];
    var ariaValueText = restProps["aria-valuetext"];
    var ariaLabelledBy = restProps["aria-labelledby"];
    return _object_spread_props(_object_spread({}, restProps, resetProps), {
        ariaLabel: ariaLabel,
        ariaValueText: ariaValueText,
        ariaLabelledBy: ariaLabelledBy
    });
};

//# sourceMappingURL=helpers.js.map