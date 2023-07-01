import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { rescale } from "../../helpers/math";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { Touch } from "../Touch/Touch";
var sizeYClassNames = _define_property({
    none: "vkuiSlider--sizeY-none"
}, SizeType.COMPACT, "vkuiSlider--sizeY-compact");
export var UniversalSlider = function(_param) {
    var _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, step = _param.step, _param_value = _param.value, value = _param_value === void 0 ? [
        0,
        0
    ] : _param_value, defaultValue = _param.defaultValue, onChange = _param.onChange, getRootRef = _param.getRootRef, disabled = _param.disabled, className = _param.className, restProps = _object_without_properties(_param, [
        "min",
        "max",
        "step",
        "value",
        "defaultValue",
        "onChange",
        "getRootRef",
        "disabled",
        "className"
    ]);
    var _value = _sliced_to_array(value, 2), start = _value[0], end = _value[1];
    var isRange = start != null;
    var gesture = React.useRef({
        dragging: false,
        startX: 0,
        containerWidth: 0
    }).current;
    var container = useExternRef(getRootRef);
    var thumbStart = React.useRef(null);
    var thumbEnd = React.useRef(null);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var offsetToValue = function(absolute) {
        return rescale(absolute, [
            0,
            gesture.containerWidth
        ], [
            min,
            max
        ], {
            step: step
        });
    };
    var updateRange = function(nextValue) {
        if (start == null) {
            return [
                null,
                nextValue
            ];
        }
        var dragging = gesture.dragging;
        if (dragging === "start") {
            if (nextValue > end) {
                // "перехватиться", если перетянули за конец
                gesture.dragging = "end";
                return [
                    end,
                    nextValue
                ];
            }
            return [
                nextValue,
                end
            ];
        }
        if (dragging === "end") {
            if (nextValue < start) {
                // "перехватиться", если перетянули за начало
                gesture.dragging = "start";
                return [
                    nextValue,
                    start
                ];
            }
            return [
                start,
                nextValue
            ];
        }
        return value;
    };
    var snapDirection = function(pos, target) {
        if (target === thumbStart.current) {
            return "start";
        }
        if (target === thumbEnd.current) {
            return "end";
        }
        return Math.abs((start !== null && start !== void 0 ? start : 0) - pos) <= Math.abs(end - pos) ? "start" : "end";
    };
    var onStart = function(e) {
        var _container_current;
        var boundingRect = (_container_current = container.current) === null || _container_current === void 0 ? void 0 : _container_current.getBoundingClientRect();
        var _boundingRect_width;
        gesture.containerWidth = (_boundingRect_width = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width) !== null && _boundingRect_width !== void 0 ? _boundingRect_width : 0;
        var _boundingRect_left;
        var absolutePosition = e.startX - ((_boundingRect_left = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.left) !== null && _boundingRect_left !== void 0 ? _boundingRect_left : 0);
        var pos = offsetToValue(absolutePosition);
        gesture.dragging = snapDirection(pos, e.originalEvent.target);
        gesture.startX = absolutePosition;
        onChange === null || onChange === void 0 ? void 0 : onChange(updateRange(pos), e);
        e.originalEvent.stopPropagation();
    };
    var onMove = function(e) {
        onChange === null || onChange === void 0 ? void 0 : onChange(updateRange(offsetToValue(gesture.startX + (e.shiftX || 0))), e);
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
    };
    var onEnd = function(e) {
        gesture.dragging = false;
        e.originalEvent.stopPropagation();
    };
    var toPercent = function(v) {
        return (v - min) / (max - min) * 100;
    };
    var draggerStyle = isRange ? {
        width: "".concat(toPercent(end) - toPercent(start !== null && start !== void 0 ? start : 0), "%"),
        left: "".concat(toPercent(start !== null && start !== void 0 ? start : 0), "%")
    } : {
        width: "".concat(toPercent(end), "%")
    };
    return /*#__PURE__*/ React.createElement(Touch, _object_spread_props(_object_spread({
        "data-value": isRange ? value.join(",") : value
    }, restProps, disabled ? {} : {
        onStart: onStart,
        onMove: onMove,
        onEnd: onEnd
    }), {
        className: classNames("vkuiSlider", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], disabled && "vkuiSlider--disabled", className)
    }), /*#__PURE__*/ React.createElement("div", {
        ref: container,
        className: "vkuiSlider__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSlider__dragger",
        style: draggerStyle
    }, isRange && /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiSlider__thumb", "vkuiSlider__thumb--start"),
        ref: thumbStart
    }), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiSlider__thumb", "vkuiSlider__thumb--end"),
        ref: thumbEnd
    }))));
};

//# sourceMappingURL=UniversalSlider.js.map