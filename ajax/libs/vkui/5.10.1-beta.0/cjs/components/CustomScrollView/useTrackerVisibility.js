"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTrackerVisibility", {
    enumerable: true,
    get: function() {
        return useTrackerVisibility;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useTimeout = require("../../hooks/useTimeout");
var useTrackerVisibility = function() {
    var autoHideScrollbar = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, autoHideScrollbarDelay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500;
    var _React_useState = _sliced_to_array._(_react.useState(!autoHideScrollbar), 2), trackerVisible = _React_useState[0], setTrackerVisible = _React_useState[1];
    var isMouseOver = _react.useRef(false);
    var isTrackerDragging = _react.useRef(false);
    var _useTimeout1 = (0, _useTimeout.useTimeout)(function() {
        return setTrackerVisible(false);
    }, autoHideScrollbarDelay), setVisibilityTimeout = _useTimeout1.set, clearVisibilityTimeout = _useTimeout1.clear;
    var onTrackerDragStart = _react.useCallback(function() {
        clearVisibilityTimeout();
        setTrackerVisible(true);
        isTrackerDragging.current = true;
    }, [
        clearVisibilityTimeout
    ]);
    var onTrackerDragStop = _react.useCallback(function() {
        isTrackerDragging.current = false;
        if (!isMouseOver.current) {
            setVisibilityTimeout();
        }
    }, [
        setVisibilityTimeout,
        isMouseOver
    ]);
    /**
   * Позволяет "запланировать" скрытие ползунка через delay миллисекунд. Если тайм-аут не успевает сработать, то каждый
   * последующий вызов функции откладывает скрытие ползунка на delay миллисекунд
   */ var queueTrackerVisibility = _react.useCallback(function() {
        if (isTrackerDragging.current) {
            return;
        }
        setTrackerVisible(true);
        setVisibilityTimeout();
    }, [
        setVisibilityTimeout
    ]);
    var onTrackerMouseEnter = _react.useCallback(function() {
        clearVisibilityTimeout();
        isMouseOver.current = true;
        setTrackerVisible(true);
    }, [
        clearVisibilityTimeout
    ]);
    var onTrackerMouseLeave = _react.useCallback(function() {
        queueTrackerVisibility();
        isMouseOver.current = false;
    }, [
        queueTrackerVisibility
    ]);
    var onTargetScroll = _react.useCallback(function() {
        queueTrackerVisibility();
    }, [
        queueTrackerVisibility
    ]);
    return {
        trackerVisible: trackerVisible,
        onTrackerDragStart: onTrackerDragStart,
        onTrackerDragStop: onTrackerDragStop,
        onTrackerMouseEnter: onTrackerMouseEnter,
        onTrackerMouseLeave: onTrackerMouseLeave,
        onTargetScroll: onTargetScroll
    };
};

//# sourceMappingURL=useTrackerVisibility.js.map