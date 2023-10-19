import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { Touch } from "../Touch/Touch";
import { SliderThumb } from "./SliderThumb/SliderThumb";
import { extractSliderAriaAttributesFromRestProps, getDraggingTypeByTargetDataset, isMultipleValues, offsetToValue, snapDirection, toPercent, updateInternalStateValue, updateInternalStateValueByNativeChange } from "./helpers";
var sizeYClassNames = _define_property({
    none: "vkuiSlider--sizeY-none"
}, SizeType.COMPACT, "vkuiSlider--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Slider
 */ export var Slider = function(_param) {
    var // TODO [>=6]: Выставить 1 как значение по умолчанию, чтобы было как в браузерном <input type="range" />
    step = _param.step, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, valueProp = _param.value, multipleProp = _param.multiple, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? multipleProp ? [
        min,
        max
    ] : min : _param_defaultValue, disabled = _param.disabled, className = _param.className, getRootRef = _param.getRootRef, getAriaLabel = _param.getAriaLabel, getAriaValueText = _param.getAriaValueText, onChange = _param.onChange, withTooltip = _param.withTooltip, restProps = _object_without_properties(_param, [
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
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var isControlled = valueProp !== undefined;
    var _React_useState = _sliced_to_array(React.useState(defaultValue), 2), localValue = _React_useState[0], setValue = _React_useState[1];
    var value = React.useMemo(function() {
        var resolvedValue = isControlled ? valueProp : localValue;
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
    var _value = _sliced_to_array(value, 2), startValue = _value[0], endValue = _value[1];
    var multiple = multipleProp && endValue !== null;
    var startValueInPercent = toPercent(startValue, min, max);
    var endReversedValueInPercent = multiple ? toPercent(endValue, min, max) : 0;
    var gesture = React.useRef({
        dragging: null,
        startX: 0,
        containerWidth: 0
    }).current;
    var thumbsContainerRef = useExternRef(getRootRef);
    var thumbStartInputRef = React.useRef(null);
    var thumbEndInputRef = React.useRef(null);
    var _extractSliderAriaAttributesFromRestProps = extractSliderAriaAttributesFromRestProps(restProps), ariaLabel = _extractSliderAriaAttributesFromRestProps.ariaLabel, ariaValueText = _extractSliderAriaAttributesFromRestProps.ariaValueText, ariaLabelledBy = _extractSliderAriaAttributesFromRestProps.ariaLabelledBy, restPropsWithoutAriaAttributes = _object_without_properties(_extractSliderAriaAttributesFromRestProps, [
        "ariaLabel",
        "ariaValueText",
        "ariaLabelledBy"
    ]);
    var changeValue = function(nextValue, event) {
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
    var handlePointerStart = function(event) {
        if (!thumbsContainerRef.current) {
            return;
        }
        var _thumbsContainerRef_current_getBoundingClientRect = thumbsContainerRef.current.getBoundingClientRect(), nextContainerX = _thumbsContainerRef_current_getBoundingClientRect.left, nextContainerWidth = _thumbsContainerRef_current_getBoundingClientRect.width;
        // @ts-expect-error: TS2345 в VKUITouchEvent плохо описаны типы. `target` это просто `EventTarget`.
        var foundDraggingType = getDraggingTypeByTargetDataset(event.originalEvent.target);
        var nextStartX = event.startX - nextContainerX;
        var nextValue = offsetToValue(nextStartX, nextContainerWidth, min, max, step);
        var nextDragging = snapDirection(value, nextValue, foundDraggingType);
        gesture.dragging = nextDragging;
        gesture.containerWidth = nextContainerWidth;
        gesture.startX = nextStartX;
        var updatedInternalStateValue = updateInternalStateValue(value, nextValue, min, max, nextDragging);
        var _updatedInternalStateValue = _sliced_to_array(updatedInternalStateValue, 2), nextStartValue = _updatedInternalStateValue[0], nextEndValue = _updatedInternalStateValue[1];
        if (thumbStartInputRef.current && (foundDraggingType === "start" || nextStartValue !== startValue && nextEndValue === endValue)) {
            thumbStartInputRef.current.focus();
            event.originalEvent.preventDefault();
        } else if (thumbEndInputRef.current && (foundDraggingType === "end" || nextEndValue !== endValue && nextStartValue === startValue)) {
            thumbEndInputRef.current.focus();
            event.originalEvent.preventDefault();
        }
        changeValue(updatedInternalStateValue, event);
        event.originalEvent.stopPropagation();
    };
    var handlePointerMove = function(event) {
        var startX = gesture.startX, containerWidth = gesture.containerWidth, dragging = gesture.dragging;
        var _event_shiftX = event.shiftX, shiftX = _event_shiftX === void 0 ? 0 : _event_shiftX;
        var nextStartX = startX + shiftX;
        var nextValue = offsetToValue(nextStartX, containerWidth, min, max, step);
        changeValue(updateInternalStateValue(value, nextValue, min, max, dragging), event);
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    };
    var handlePointerEnd = function(event) {
        gesture.dragging = null;
        event.originalEvent.stopPropagation();
    };
    var handleChangeByNativeInput = function(event) {
        changeValue(updateInternalStateValueByNativeChange(value, Number(event.target.value), getDraggingTypeByTargetDataset(event.target)), // @ts-expect-error: TS2345 сейчас тип расширить не получится (см. TODO в описании `onChange`)
        event);
    };
    return /*#__PURE__*/ React.createElement(Touch, _object_spread_props(_object_spread({
        "data-value": multiple ? "".concat(startValue, ",").concat(endValue) : startValue
    }, restPropsWithoutAriaAttributes), {
        className: classNames("vkuiSlider", disabled && "vkuiSlider--disabled", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        onStart: disabled ? undefined : handlePointerStart,
        onMove: disabled ? undefined : handlePointerMove,
        onEnd: disabled ? undefined : handlePointerEnd
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSlider__track"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSlider__track-fill",
        style: multiple ? {
            left: "".concat(startValueInPercent, "%"),
            right: "".concat(100 - endReversedValueInPercent, "%")
        } : {
            width: "".concat(startValueInPercent, "%")
        }
    }), /*#__PURE__*/ React.createElement("div", {
        ref: thumbsContainerRef,
        className: "vkuiSlider__thumbs"
    }, /*#__PURE__*/ React.createElement(SliderThumb, {
        "data-type": "start",
        className: "vkuiSlider__thumb",
        style: {
            left: "".concat(startValueInPercent, "%"),
            // Меняем местами порядок слоёв, иначе, при достижении `start` и `end` 100%, `end` будет перекрывать `start`.
            zIndex: multiple && startValueInPercent >= 50 ? 2 : undefined
        },
        withTooltip: withTooltip,
        inputProps: {
            "data-type": "start",
            "ref": thumbStartInputRef,
            "step": step,
            "min": min,
            "value": startValue,
            "max": multiple ? endValue : max,
            "disabled": disabled,
            "aria-label": getAriaLabel ? getAriaLabel(0) : ariaLabel,
            "aria-valuetext": getAriaValueText ? getAriaValueText(startValue, 0) : ariaValueText,
            "aria-labelledby": ariaLabelledBy,
            "onChange": handleChangeByNativeInput
        }
    }), multiple && /*#__PURE__*/ React.createElement(SliderThumb, {
        "data-type": "end",
        className: "vkuiSlider__thumb",
        style: {
            left: "".concat(endReversedValueInPercent, "%")
        },
        withTooltip: withTooltip,
        inputProps: {
            "data-type": "end",
            "ref": thumbEndInputRef,
            "step": step,
            "min": startValue,
            "value": endValue,
            "max": max,
            "disabled": disabled,
            "aria-label": getAriaLabel ? getAriaLabel(1) : ariaLabel,
            "aria-valuetext": getAriaValueText ? getAriaValueText(endValue, 1) : ariaValueText,
            "aria-labelledby": ariaLabelledBy,
            "onChange": handleChangeByNativeInput
        }
    })));
};

//# sourceMappingURL=Slider.js.map