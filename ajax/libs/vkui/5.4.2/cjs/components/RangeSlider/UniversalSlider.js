"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UniversalSlider", {
    enumerable: true,
    get: function() {
        return UniversalSlider;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _math = require("../../helpers/math");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _touch = require("../Touch/Touch");
var sizeYClassNames = _defineProperty({
    none: "vkuiSlider--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSlider--sizeY-compact");
var UniversalSlider = function(_param) {
    var _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, step = _param.step, _param_value = _param.value, value = _param_value === void 0 ? [
        0,
        0
    ] : _param_value, defaultValue = _param.defaultValue, onChange = _param.onChange, getRootRef = _param.getRootRef, disabled = _param.disabled, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
    var _value = _slicedToArray(value, 2), start = _value[0], end = _value[1];
    var isRange = start != null;
    var gesture = _react.useRef({
        dragging: false,
        startX: 0,
        containerWidth: 0
    }).current;
    var container = (0, _useExternRef.useExternRef)(getRootRef);
    var thumbStart = _react.useRef(null);
    var thumbEnd = _react.useRef(null);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var offsetToValue = function(absolute) {
        return (0, _math.rescale)(absolute, [
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
    return /*#__PURE__*/ _react.createElement(_touch.Touch, _objectSpreadProps(_objectSpread({
        "data-value": isRange ? value.join(",") : value
    }, restProps, disabled ? {} : {
        onStart: onStart,
        onMove: onMove,
        onEnd: onEnd
    }), {
        className: (0, _vkjs.classNames)("vkuiSlider", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], disabled && "vkuiSlider--disabled", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        ref: container,
        className: "vkuiSlider__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSlider__dragger",
        style: draggerStyle
    }, isRange && /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiSlider__thumb", "vkuiSlider__thumb--start"),
        ref: thumbStart
    }), /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiSlider__thumb", "vkuiSlider__thumb--end"),
        ref: thumbEnd
    }))));
};

//# sourceMappingURL=UniversalSlider.js.map