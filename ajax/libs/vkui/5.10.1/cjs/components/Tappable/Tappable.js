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
    ACTIVE_DELAY: function() {
        return ACTIVE_DELAY;
    },
    ACTIVE_EFFECT_DELAY: function() {
        return ACTIVE_EFFECT_DELAY;
    },
    Tappable: function() {
        return Tappable;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _mitt = /*#__PURE__*/ _interop_require_default._(require("mitt"));
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _useBooleanState = require("../../hooks/useBooleanState");
var _useExternRef = require("../../hooks/useExternRef");
var _useFocusVisible = require("../../hooks/useFocusVisible");
var _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _accessibility = require("../../lib/accessibility");
var _adaptivity = require("../../lib/adaptivity");
var _callMultiple = require("../../lib/callMultiple");
var _offset = require("../../lib/offset");
var _platform = require("../../lib/platform");
var _touch = require("../../lib/touch");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _Touch = require("../Touch/Touch");
var _TouchContext = /*#__PURE__*/ _interop_require_default._(require("../Touch/TouchContext"));
var sizeXClassNames = {
    none: "vkuiTappable--sizeX-none",
    compact: "vkuiTappable--sizeX-compact"
};
var stylesHoverMode = {
    background: "vkuiTappable--hover-background",
    opacity: "vkuiTappable--hover-opacity"
};
var stylesActiveMode = {
    background: "vkuiTappable--active-background",
    opacity: "vkuiTappable--active-opacity"
};
var WAVE_LIVE = 225;
var ACTIVE_DELAY = 70;
var ACTIVE_EFFECT_DELAY = 600;
var activeBus = (0, _mitt.default)();
var TapState = {
    none: 0,
    pending: 1,
    active: 2,
    exiting: 3
};
var TappableContext = /*#__PURE__*/ _react.createContext({
    onHoverChange: _vkjs.noop
});
function isPresetStateMode(stateMode) {
    switch(stateMode){
        case "opacity":
        case "background":
            return true;
        default:
            return false;
    }
}
function useActivity(hasActive, stopDelay) {
    var id = _react.useMemo(function() {
        return Math.round(Math.random() * 1e8).toString(16);
    }, []);
    var _React_useState = _sliced_to_array._(_react.useState(TapState.none), 2), activity = _React_useState[0], setActivity = _React_useState[1];
    var _stop = function() {
        return setActivity(TapState.none);
    };
    var start = function() {
        return hasActive && setActivity(TapState.active);
    };
    var delayStart = function() {
        hasActive && setActivity(TapState.pending);
    };
    var activeTimeout = (0, _useTimeout.useTimeout)(start, ACTIVE_DELAY);
    var stopTimeout = (0, _useTimeout.useTimeout)(_stop, stopDelay);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (activity === TapState.pending) {
            activeTimeout.set();
            return activeTimeout.clear;
        }
        if (activity === TapState.exiting) {
            return stopTimeout.clear;
        }
        if (activity === TapState.active) {
            activeBus.emit("active", id);
        }
        return _vkjs.noop;
    }, [
        activity
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (activity === TapState.none) {
            return _vkjs.noop;
        }
        var onActiveChange = function(activeId) {
            activeId !== id && _stop();
        };
        activeBus.on("active", onActiveChange);
        return function() {
            return activeBus.off("active", onActiveChange);
        };
    }, [
        activity === TapState.none
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        !hasActive && _stop();
    }, [
        hasActive
    ]);
    var stop = function(delay) {
        if (delay) {
            setActivity(TapState.exiting);
            return stopTimeout.set(delay);
        }
        _stop();
    };
    return [
        activity,
        {
            delayStart: delayStart,
            start: start,
            stop: stop
        }
    ];
}
var Tappable = function(_param) {
    var onKeyDown = /*
   * [a11y]
   * Обрабатывает событие onkeydown
   * для кастомных доступных элементов:
   * - role="link" (активация по Enter)
   * - role="button" (активация по Space и Enter)
   */ function onKeyDown(e) {
        if (isCustomElement && (0, _accessibility.shouldTriggerClickOnEnterOrSpace)(e)) {
            var _containerRef_current;
            e.preventDefault();
            (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.click();
        }
    };
    var addClick = function addClick(x, y) {
        var dateNow = Date.now();
        var filteredClicks = clicks.filter(function(click) {
            return click.id + WAVE_LIVE > dateNow;
        });
        setClicks(_to_consumable_array._(filteredClicks).concat([
            {
                x: x,
                y: y,
                id: dateNow
            }
        ]));
        clearClicks.set();
    };
    var onStart = function onStart(param) {
        var originalEvent = param.originalEvent;
        if (hasActive) {
            if (originalEvent.touches && originalEvent.touches.length > 1) {
                // r сожалению я так и не понял, что это делает и можно ли упихнуть его в Touch
                return stop();
            }
            if (needWaves) {
                var _getOffsetRect = (0, _offset.getOffsetRect)(containerRef.current), top = _getOffsetRect.top, left = _getOffsetRect.left;
                var x = (0, _touch.coordX)(originalEvent) - (left !== null && left !== void 0 ? left : 0);
                var y = (0, _touch.coordY)(originalEvent) - (top !== null && top !== void 0 ? top : 0);
                addClick(x, y);
            }
            delayStart();
        }
    };
    var onMove = function onMove(param) {
        var isSlide = param.isSlide;
        if (isSlide) {
            stop();
        }
    };
    var onEnd = function onEnd(param) {
        var duration = param.duration;
        if (activity === TapState.none) {
            return;
        }
        if (activity === TapState.pending) {
            // активировать при коротком тапе
            start();
        }
        // отключить без задержки при длинном тапе
        var activeDuration = duration - ACTIVE_DELAY;
        stop(activeDuration >= 100 ? 0 : activeEffectDelay - activeDuration);
    };
    var children = _param.children, Component = _param.Component, onClick = _param.onClick, _onKeyDown = _param.onKeyDown, _param_activeEffectDelay = _param.activeEffectDelay, activeEffectDelay = _param_activeEffectDelay === void 0 ? ACTIVE_EFFECT_DELAY : _param_activeEffectDelay, _param_stopPropagation = _param.stopPropagation, stopPropagation = _param_stopPropagation === void 0 ? false : _param_stopPropagation, getRootRef = _param.getRootRef, tmp = _param.hasHover, _hasHover = tmp === void 0 ? true : tmp, _param_hoverMode = _param.hoverMode, hoverMode = _param_hoverMode === void 0 ? "background" : _param_hoverMode, tmp1 = _param.hasActive, _hasActive = tmp1 === void 0 ? true : tmp1, _param_activeMode = _param.activeMode, activeMode = _param_activeMode === void 0 ? "background" : _param_activeMode, _param_focusVisibleMode = _param.focusVisibleMode, focusVisibleMode = _param_focusVisibleMode === void 0 ? "inside" : _param_focusVisibleMode, onEnter = _param.onEnter, onLeave = _param.onLeave, className = _param.className, hoveredProp = _param.hovered, activatedProp = _param.activated, _param_borderRadiusMode = _param.borderRadiusMode, borderRadiusMode = _param_borderRadiusMode === void 0 ? "auto" : _param_borderRadiusMode, props = _object_without_properties._(_param, [
        "children",
        "Component",
        "onClick",
        "onKeyDown",
        "activeEffectDelay",
        "stopPropagation",
        "getRootRef",
        "hasHover",
        "hoverMode",
        "hasActive",
        "activeMode",
        "focusVisibleMode",
        "onEnter",
        "onLeave",
        "className",
        "hovered",
        "activated",
        "borderRadiusMode"
    ]);
    Component = Component || (props.href ? "a" : "div");
    var onHoverChange = _react.useContext(TappableContext).onHoverChange;
    var insideTouchRoot = _react.useContext(_TouchContext.default);
    var platform = (0, _usePlatform.usePlatform)();
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), focusVisible = _useFocusVisible1.focusVisible, onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX, tmp2 = _useAdaptivity1.hasHover, hasHoverContext = tmp2 === void 0 ? true : tmp2;
    var hasPointerContext = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    var _React_useState = _sliced_to_array._(_react.useState([]), 2), clicks = _React_useState[0], setClicks = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(false), 2), childHover = _React_useState1[0], setChildHover = _React_useState1[1];
    var _useBooleanState1 = (0, _useBooleanState.useBooleanState)(false), _hovered = _useBooleanState1.value, setHoveredTrue = _useBooleanState1.setTrue, setHoveredFalse = _useBooleanState1.setFalse;
    var hovered = (_hovered || hoveredProp) && !props.disabled;
    var hasActive = _hasActive && !childHover && !props.disabled;
    var hasHover = hasHoverContext && _hasHover && !childHover;
    var isCustomElement = Component !== "a" && Component !== "button" && Component !== "label" && !props.contentEditable;
    var isPresetHoverMode = isPresetStateMode(hoverMode);
    var isPresetActiveMode = isPresetStateMode(activeMode);
    var _useActivity = _sliced_to_array._(useActivity(hasActive, activeEffectDelay), 2), activity = _useActivity[0], _useActivity_ = _useActivity[1], start = _useActivity_.start, stop = _useActivity_.stop, delayStart = _useActivity_.delayStart;
    var active = activity === TapState.active || activity === TapState.exiting;
    var activated = (active || activatedProp) && !props.disabled;
    var containerRef = (0, _useExternRef.useExternRef)(getRootRef);
    // hover propagation
    var childContext = _react.useRef({
        onHoverChange: setChildHover
    }).current;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (!hovered) {
            return _vkjs.noop;
        }
        onHoverChange(true);
        return function() {
            return onHoverChange(false);
        };
    }, [
        hovered
    ]);
    var needWaves = platform === _platform.Platform.ANDROID && !hasPointerContext && hasActive && activeMode === "background";
    var clearClicks = (0, _useTimeout.useTimeout)(function() {
        return setClicks([]);
    }, WAVE_LIVE);
    var focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible: !props.disabled && focusVisible,
        mode: focusVisibleMode
    });
    var classes = (0, _vkjs.classNames)(className, "vkuiTappable", "vkuiInternalTappable", platform === _platform.Platform.IOS && "vkuiTappable--ios", sizeX !== _adaptivity.SizeType.REGULAR && sizeXClassNames[sizeX], hasHover && "vkuiTappable--hasHover", hasActive && "vkuiTappable--hasActive", hasHover && hovered && !isPresetHoverMode && hoverMode, hasActive && activated && !isPresetActiveMode && activeMode, hasHover && hovered && isPresetHoverMode && stylesHoverMode[hoverMode], hasActive && activated && isPresetActiveMode && stylesActiveMode[activeMode], borderRadiusMode === "inherit" && "vkuiTappable--borderRadiusInherit", focusVisibleClassNames);
    var handlers = {
        onStart: (0, _callMultiple.callMultiple)(onStart, props.onStart),
        onMove: (0, _callMultiple.callMultiple)(onMove, props.onMove),
        onEnd: (0, _callMultiple.callMultiple)(onEnd, props.onEnd),
        onClick: onClick,
        onKeyDown: (0, _callMultiple.callMultiple)(onKeyDown, _onKeyDown)
    };
    var role = props.href ? "link" : "button";
    return /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread._(_object_spread_props._(_object_spread._({
        onEnter: (0, _callMultiple.callMultiple)(setHoveredTrue, onEnter),
        onLeave: (0, _callMultiple.callMultiple)(setHoveredFalse, onLeave),
        type: Component === "button" ? "button" : undefined,
        tabIndex: isCustomElement && !props.disabled ? 0 : undefined,
        role: isCustomElement ? role : undefined,
        "aria-disabled": isCustomElement ? props.disabled : undefined,
        stopPropagation: stopPropagation && !insideTouchRoot && !props.disabled
    }, props), {
        slideThreshold: 20,
        usePointerHover: true,
        className: classes,
        Component: Component,
        getRootRef: containerRef,
        onBlur: (0, _callMultiple.callMultiple)(onBlur, props.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, props.onFocus)
    }), props.disabled ? {} : handlers), /*#__PURE__*/ _react.createElement(TappableContext.Provider, {
        value: childContext
    }, children), needWaves && /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: "vkuiTappable__waves"
    }, clicks.map(function(wave) {
        return /*#__PURE__*/ _react.createElement("span", {
            key: wave.id,
            className: "vkuiTappable__wave",
            style: {
                top: wave.y,
                left: wave.x
            }
        });
    })), (hasHover && hoverMode === "background" || hasActive && activeMode === "background") && /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: "vkuiTappable__stateLayer"
    }));
};

//# sourceMappingURL=Tappable.js.map