import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { Touch } from '../Touch/Touch';
import { SliderThumb } from './SliderThumb/SliderThumb';
import { extractSliderAriaAttributesFromRestProps, getDraggingTypeByTargetDataset, isMultipleValues, offsetToValue, snapDirection, toPercent, updateInternalStateValue, updateInternalStateValueByNativeChange } from './helpers';
const sizeYClassNames = {
    none: "vkuiSlider--sizeY-none",
    ['compact']: "vkuiSlider--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Slider
 */ export const Slider = (_param)=>{
    var { step = 1, min = 0, max = 100, value: valueProp, multiple: multipleProp, defaultValue = multipleProp ? [
        min,
        max
    ] : min, disabled, className, getRootRef, getAriaLabel, getAriaValueText, onChange, withTooltip } = _param, restProps = _object_without_properties(_param, [
        "step",
        "min",
        "max",
        "value",
        "multiple",
        "defaultValue",
        "disabled",
        "className",
        "getRootRef",
        "getAriaLabel",
        "getAriaValueText",
        "onChange",
        "withTooltip"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const isControlled = valueProp !== undefined;
    const [localValue, setValue] = React.useState(defaultValue);
    const value = React.useMemo(()=>{
        const resolvedValue = isControlled ? valueProp : localValue;
        return Array.isArray(resolvedValue) ? [
            clamp(resolvedValue[0], min, max),
            clamp(resolvedValue[1], min, max)
        ] : [
            clamp(resolvedValue, min, max),
            null
        ];
    }, [
        isControlled,
        valueProp,
        localValue,
        min,
        max
    ]);
    const [startValue, endValue] = value;
    const multiple = multipleProp && endValue !== null;
    const startValueInPercent = toPercent(startValue, min, max);
    const endReversedValueInPercent = multiple ? toPercent(endValue, min, max) : 0;
    const gesture = React.useRef({
        dragging: null,
        startX: 0,
        containerWidth: 0
    }).current;
    const thumbsContainerRef = useExternRef(getRootRef);
    const thumbStartInputRef = React.useRef(null);
    const thumbEndInputRef = React.useRef(null);
    const _extractSliderAriaAttributesFromRestProps = extractSliderAriaAttributesFromRestProps(restProps), { ariaLabel, ariaValueText, ariaLabelledBy } = _extractSliderAriaAttributesFromRestProps, restPropsWithoutAriaAttributes = _object_without_properties(_extractSliderAriaAttributesFromRestProps, [
        "ariaLabel",
        "ariaValueText",
        "ariaLabelledBy"
    ]);
    const changeValue = (nextValue, event)=>{
        if (disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
            return;
        }
        if (multipleProp) {
            if (isMultipleValues(nextValue)) {
                !isControlled && setValue(nextValue);
                onChange && onChange(nextValue, event);
            }
        } else {
            !isControlled && setValue(nextValue[0]);
            onChange && onChange(nextValue[0], event);
        }
    };
    const handlePointerStart = (event)=>{
        if (!thumbsContainerRef.current) {
            return;
        }
        const { left: nextContainerX, width: nextContainerWidth } = thumbsContainerRef.current.getBoundingClientRect();
        // @ts-expect-error: TS2345 в VKUITouchEvent плохо описаны типы. `target` это просто `EventTarget`.
        const foundDraggingType = getDraggingTypeByTargetDataset(event.originalEvent.target);
        const nextStartX = event.startX - nextContainerX;
        const nextValue = offsetToValue(nextStartX, nextContainerWidth, min, max, step);
        const nextDragging = snapDirection(value, nextValue, foundDraggingType);
        gesture.dragging = nextDragging;
        gesture.containerWidth = nextContainerWidth;
        gesture.startX = nextStartX;
        const updatedInternalStateValue = updateInternalStateValue(value, nextValue, min, max, nextDragging);
        const [nextStartValue, nextEndValue] = updatedInternalStateValue;
        if (thumbStartInputRef.current && (foundDraggingType === 'start' || nextStartValue !== startValue && nextEndValue === endValue)) {
            thumbStartInputRef.current.focus();
            event.originalEvent.preventDefault();
        } else if (thumbEndInputRef.current && (foundDraggingType === 'end' || nextEndValue !== endValue && nextStartValue === startValue)) {
            thumbEndInputRef.current.focus();
            event.originalEvent.preventDefault();
        }
        changeValue(updatedInternalStateValue, event);
        event.originalEvent.stopPropagation();
    };
    const handlePointerMove = (event)=>{
        const { startX, containerWidth, dragging } = gesture;
        const { shiftX = 0 } = event;
        const nextStartX = startX + shiftX;
        const nextValue = offsetToValue(nextStartX, containerWidth, min, max, step);
        changeValue(updateInternalStateValue(value, nextValue, min, max, dragging), event);
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    };
    const handlePointerEnd = (event)=>{
        gesture.dragging = null;
        event.originalEvent.stopPropagation();
    };
    const handleChangeByNativeInput = (event)=>{
        changeValue(updateInternalStateValueByNativeChange(value, Number(event.target.value), getDraggingTypeByTargetDataset(event.target)), event);
    };
    return /*#__PURE__*/ React.createElement(Touch, _object_spread_props(_object_spread({
        "data-value": multiple ? `${startValue},${endValue}` : startValue
    }, restPropsWithoutAriaAttributes), {
        className: classNames("vkuiSlider", disabled && "vkuiSlider--disabled", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        onStart: disabled ? undefined : handlePointerStart,
        onMove: disabled ? undefined : handlePointerMove,
        onEnd: disabled ? undefined : handlePointerEnd
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSlider__track"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSlider__track-fill",
        style: multiple ? {
            left: `${startValueInPercent}%`,
            right: `${100 - endReversedValueInPercent}%`
        } : {
            width: `${startValueInPercent}%`
        }
    }), /*#__PURE__*/ React.createElement("div", {
        ref: thumbsContainerRef,
        className: "vkuiSlider__thumbs"
    }, /*#__PURE__*/ React.createElement(SliderThumb, {
        "data-type": "start",
        className: "vkuiSlider__thumb",
        style: {
            left: `${startValueInPercent}%`,
            // Меняем местами порядок слоёв, иначе, при достижении `start` и `end` 100%, `end` будет перекрывать `start`.
            zIndex: multiple && startValueInPercent >= 50 ? 2 : undefined
        },
        withTooltip: withTooltip,
        inputProps: {
            'data-type': 'start',
            'ref': thumbStartInputRef,
            'step': step,
            'min': min,
            'value': startValue,
            'max': multiple ? endValue : max,
            'disabled': disabled,
            'aria-label': getAriaLabel ? getAriaLabel(0) : ariaLabel,
            'aria-valuetext': getAriaValueText ? getAriaValueText(startValue, 0) : ariaValueText,
            'aria-labelledby': ariaLabelledBy,
            'onChange': handleChangeByNativeInput
        }
    }), multiple && /*#__PURE__*/ React.createElement(SliderThumb, {
        "data-type": "end",
        className: "vkuiSlider__thumb",
        style: {
            left: `${endReversedValueInPercent}%`
        },
        withTooltip: withTooltip,
        inputProps: {
            'data-type': 'end',
            'ref': thumbEndInputRef,
            'step': step,
            'min': startValue,
            'value': endValue,
            'max': max,
            'disabled': disabled,
            'aria-label': getAriaLabel ? getAriaLabel(1) : ariaLabel,
            'aria-valuetext': getAriaValueText ? getAriaValueText(endValue, 1) : ariaValueText,
            'aria-labelledby': ariaLabelledBy,
            'onChange': handleChangeByNativeInput
        }
    })));
};

//# sourceMappingURL=Slider.js.map