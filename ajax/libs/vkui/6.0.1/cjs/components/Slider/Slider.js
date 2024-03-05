"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Slider", {
    enumerable: true,
    get: function() {
        return Slider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _math = require("../../helpers/math");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _Touch = require("../Touch/Touch");
const _SliderThumb = require("./SliderThumb/SliderThumb");
const _helpers = require("./helpers");
const sizeYClassNames = {
    none: "vkuiSlider--sizeY-none",
    ['compact']: "vkuiSlider--sizeY-compact"
};
const Slider = (_param)=>{
    var { step = 1, min = 0, max = 100, value: valueProp, multiple: multipleProp, defaultValue = multipleProp ? [
        min,
        max
    ] : min, disabled, className, getRootRef, getAriaLabel, getAriaValueText, onChange, withTooltip } = _param, restProps = _object_without_properties._(_param, [
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
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const isControlled = valueProp !== undefined;
    const [localValue, setValue] = _react.useState(defaultValue);
    const value = _react.useMemo(()=>{
        const resolvedValue = isControlled ? valueProp : localValue;
        return Array.isArray(resolvedValue) ? [
            (0, _math.clamp)(resolvedValue[0], min, max),
            (0, _math.clamp)(resolvedValue[1], min, max)
        ] : [
            (0, _math.clamp)(resolvedValue, min, max),
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
    const startValueInPercent = (0, _helpers.toPercent)(startValue, min, max);
    const endReversedValueInPercent = multiple ? (0, _helpers.toPercent)(endValue, min, max) : 0;
    const gesture = _react.useRef({
        dragging: null,
        startX: 0,
        containerWidth: 0
    }).current;
    const thumbsContainerRef = (0, _useExternRef.useExternRef)(getRootRef);
    const thumbStartInputRef = _react.useRef(null);
    const thumbEndInputRef = _react.useRef(null);
    const _extractSliderAriaAttributesFromRestProps = (0, _helpers.extractSliderAriaAttributesFromRestProps)(restProps), { ariaLabel, ariaValueText, ariaLabelledBy } = _extractSliderAriaAttributesFromRestProps, restPropsWithoutAriaAttributes = _object_without_properties._(_extractSliderAriaAttributesFromRestProps, [
        "ariaLabel",
        "ariaValueText",
        "ariaLabelledBy"
    ]);
    const changeValue = (nextValue, event)=>{
        if (disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
            return;
        }
        if (multipleProp) {
            if ((0, _helpers.isMultipleValues)(nextValue)) {
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
        const foundDraggingType = (0, _helpers.getDraggingTypeByTargetDataset)(event.originalEvent.target);
        const nextStartX = event.startX - nextContainerX;
        const nextValue = (0, _helpers.offsetToValue)(nextStartX, nextContainerWidth, min, max, step);
        const nextDragging = (0, _helpers.snapDirection)(value, nextValue, foundDraggingType);
        gesture.dragging = nextDragging;
        gesture.containerWidth = nextContainerWidth;
        gesture.startX = nextStartX;
        const updatedInternalStateValue = (0, _helpers.updateInternalStateValue)(value, nextValue, min, max, nextDragging);
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
        const nextValue = (0, _helpers.offsetToValue)(nextStartX, containerWidth, min, max, step);
        changeValue((0, _helpers.updateInternalStateValue)(value, nextValue, min, max, dragging), event);
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    };
    const handlePointerEnd = (event)=>{
        gesture.dragging = null;
        event.originalEvent.stopPropagation();
    };
    const handleChangeByNativeInput = (event)=>{
        changeValue((0, _helpers.updateInternalStateValueByNativeChange)(value, Number(event.target.value), (0, _helpers.getDraggingTypeByTargetDataset)(event.target)), event);
    };
    return /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread_props._(_object_spread._({
        "data-value": multiple ? `${startValue},${endValue}` : startValue
    }, restPropsWithoutAriaAttributes), {
        className: (0, _vkjs.classNames)("vkuiSlider", disabled && "vkuiSlider--disabled", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        onStart: disabled ? undefined : handlePointerStart,
        onMove: disabled ? undefined : handlePointerMove,
        onEnd: disabled ? undefined : handlePointerEnd
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSlider__track"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSlider__track-fill",
        style: multiple ? {
            left: `${startValueInPercent}%`,
            right: `${100 - endReversedValueInPercent}%`
        } : {
            width: `${startValueInPercent}%`
        }
    }), /*#__PURE__*/ _react.createElement("div", {
        ref: thumbsContainerRef,
        className: "vkuiSlider__thumbs"
    }, /*#__PURE__*/ _react.createElement(_SliderThumb.SliderThumb, {
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
    }), multiple && /*#__PURE__*/ _react.createElement(_SliderThumb.SliderThumb, {
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