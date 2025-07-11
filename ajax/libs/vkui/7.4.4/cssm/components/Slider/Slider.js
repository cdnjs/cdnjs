'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math.js";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { Touch } from "../Touch/Touch.js";
import { SliderThumb } from "./SliderThumb/SliderThumb.js";
import { extractSliderAriaAttributesFromRestProps, getDraggingTypeByTargetDataset, isMultipleValues, offsetToValue, snapDirection, toPercent, updateInternalStateValue, updateInternalStateValueByNativeChange } from "./helpers.js";
import styles from "./Slider.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const sizeClassNames = {
    l: styles.sizeL,
    m: styles.sizeM,
    s: styles.sizeS
};
/**
 * @see https://vkcom.github.io/VKUI/#/Slider
 */ export const Slider = ({ step = 1, min = 0, max = 100, value: valueProp, multiple: multipleProp, defaultValue = multipleProp ? [
    min,
    max
] : min, disabled, className, getRootRef, getAriaLabel, getAriaValueText, startThumbTestId, endThumbTestId, onChange, withTooltip, size = 'l', style: styleProp, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
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
    const [activeThumb, setActiveThumb] = React.useState(null);
    const gesture = React.useRef({
        dragging: null,
        startX: 0,
        containerWidth: 0
    }).current;
    const thumbsContainerRef = useExternRef(getRootRef);
    const thumbStartInputRef = React.useRef(null);
    const thumbEndInputRef = React.useRef(null);
    const { ariaLabel, ariaValueText, ariaLabelledBy, ...restPropsWithoutAriaAttributes } = extractSliderAriaAttributesFromRestProps(restProps);
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
        let nextStartX = event.startX - nextContainerX;
        if (isRtl) {
            nextStartX = nextContainerWidth - nextStartX;
        }
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
        setActiveThumb(gesture.dragging);
    };
    const handlePointerMove = (event)=>{
        const { startX, containerWidth, dragging } = gesture;
        const { shiftX = 0 } = event;
        const nextStartX = startX + (isRtl ? -shiftX : shiftX);
        const nextValue = offsetToValue(nextStartX, containerWidth, min, max, step);
        changeValue(updateInternalStateValue(value, nextValue, min, max, dragging), event);
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    };
    const handlePointerEnd = (event)=>{
        gesture.dragging = null;
        event.originalEvent.stopPropagation();
        setActiveThumb(null);
    };
    const handleChangeByNativeInput = (event)=>{
        changeValue(updateInternalStateValueByNativeChange(value, Number(event.target.value), getDraggingTypeByTargetDataset(event.target)), event);
    };
    const style = {
        '--vkui_internal--Slider_start_value': String(startValueInPercent),
        '--vkui_internal--Slider_end_value': String(endReversedValueInPercent)
    };
    return /*#__PURE__*/ _jsxs(Touch, {
        "data-value": multiple ? `${startValue},${endValue}` : startValue,
        ...restPropsWithoutAriaAttributes,
        className: classNames(styles.host, disabled && styles.disabled, sizeY !== 'regular' && sizeYClassNames[sizeY], sizeClassNames[size], multiple && styles.multiple, isRtl && styles.rtl, className),
        style: mergeStyle(styleProp, style),
        getRootRef: getRootRef,
        onStart: disabled ? undefined : handlePointerStart,
        onMove: disabled ? undefined : handlePointerMove,
        onEnd: disabled ? undefined : handlePointerEnd,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: styles.track
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles.trackFill
            }),
            /*#__PURE__*/ _jsxs("div", {
                ref: thumbsContainerRef,
                className: styles.thumbs,
                children: [
                    /*#__PURE__*/ _jsx(SliderThumb, {
                        "data-type": "start",
                        className: classNames(styles.thumb, styles.thumbStart),
                        style: {
                            // Меняем местами порядок слоёв, иначе, при достижении `start` и `end` 100%, `end` будет перекрывать `start`.
                            zIndex: multiple && startValueInPercent >= 50 ? 2 : undefined
                        },
                        withTooltip: withTooltip,
                        inputProps: {
                            'data-type': 'start',
                            'data-testid': startThumbTestId,
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
                        },
                        isActive: activeThumb === 'start'
                    }),
                    multiple && /*#__PURE__*/ _jsx(SliderThumb, {
                        "data-type": "end",
                        className: classNames(styles.thumb, styles.thumbEnd),
                        withTooltip: withTooltip,
                        inputProps: {
                            'data-type': 'end',
                            'data-testid': endThumbTestId,
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
                        },
                        isActive: activeThumb === 'end'
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Slider.js.map