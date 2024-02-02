import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import mitt from "mitt";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer";
import { useBooleanState } from "../../hooks/useBooleanState";
import { useExternRef } from "../../hooks/useExternRef";
import { useFocusVisible } from "../../hooks/useFocusVisible";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { shouldTriggerClickOnEnterOrSpace } from "../../lib/accessibility";
import { SizeType } from "../../lib/adaptivity";
import { callMultiple } from "../../lib/callMultiple";
import { getOffsetRect } from "../../lib/offset";
import { Platform } from "../../lib/platform";
import { coordX, coordY } from "../../lib/touch";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { Touch } from "../Touch/Touch";
import TouchRootContext from "../Touch/TouchContext";
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
export var ACTIVE_DELAY = 70;
export var ACTIVE_EFFECT_DELAY = 600;
var activeBus = mitt();
var TapState = {
    none: 0,
    pending: 1,
    active: 2,
    exiting: 3
};
var TappableContext = /*#__PURE__*/ React.createContext({
    onHoverChange: noop
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
    var id = React.useMemo(function() {
        return Math.round(Math.random() * 1e8).toString(16);
    }, []);
    var _React_useState = _sliced_to_array(React.useState(TapState.none), 2), activity = _React_useState[0], setActivity = _React_useState[1];
    var _stop = function() {
        return setActivity(TapState.none);
    };
    var start = function() {
        return hasActive && setActivity(TapState.active);
    };
    var delayStart = function() {
        hasActive && setActivity(TapState.pending);
    };
    var activeTimeout = useTimeout(start, ACTIVE_DELAY);
    var stopTimeout = useTimeout(_stop, stopDelay);
    useIsomorphicLayoutEffect(function() {
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
        return noop;
    }, [
        activity
    ]);
    useIsomorphicLayoutEffect(function() {
        if (activity === TapState.none) {
            return noop;
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
    useIsomorphicLayoutEffect(function() {
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
/**
 * @see https://vkcom.github.io/VKUI/#/Tappable
 */ export var Tappable = function(_param) {
    var onKeyDown = /*
   * [a11y]
   * Обрабатывает событие onkeydown
   * для кастомных доступных элементов:
   * - role="link" (активация по Enter)
   * - role="button" (активация по Space и Enter)
   */ function onKeyDown(e) {
        if (isCustomElement && shouldTriggerClickOnEnterOrSpace(e)) {
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
        setClicks(_to_consumable_array(filteredClicks).concat([
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
                var _getOffsetRect = getOffsetRect(containerRef.current), top = _getOffsetRect.top, left = _getOffsetRect.left;
                var x = coordX(originalEvent) - (left !== null && left !== void 0 ? left : 0);
                var y = coordY(originalEvent) - (top !== null && top !== void 0 ? top : 0);
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
    var children = _param.children, Component = _param.Component, onClick = _param.onClick, _onKeyDown = _param.onKeyDown, _param_activeEffectDelay = _param.activeEffectDelay, activeEffectDelay = _param_activeEffectDelay === void 0 ? ACTIVE_EFFECT_DELAY : _param_activeEffectDelay, _param_stopPropagation = _param.stopPropagation, stopPropagation = _param_stopPropagation === void 0 ? false : _param_stopPropagation, getRootRef = _param.getRootRef, tmp = _param.hasHover, _hasHover = tmp === void 0 ? true : tmp, _param_hoverMode = _param.hoverMode, hoverMode = _param_hoverMode === void 0 ? "background" : _param_hoverMode, tmp1 = _param.hasActive, _hasActive = tmp1 === void 0 ? true : tmp1, _param_activeMode = _param.activeMode, activeMode = _param_activeMode === void 0 ? "background" : _param_activeMode, _param_focusVisibleMode = _param.focusVisibleMode, focusVisibleMode = _param_focusVisibleMode === void 0 ? "inside" : _param_focusVisibleMode, onEnter = _param.onEnter, onLeave = _param.onLeave, className = _param.className, hoveredProp = _param.hovered, activatedProp = _param.activated, _param_borderRadiusMode = _param.borderRadiusMode, borderRadiusMode = _param_borderRadiusMode === void 0 ? "auto" : _param_borderRadiusMode, props = _object_without_properties(_param, [
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
    var onHoverChange = React.useContext(TappableContext).onHoverChange;
    var insideTouchRoot = React.useContext(TouchRootContext);
    var platform = usePlatform();
    var _useFocusVisible = useFocusVisible(), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX, tmp2 = _useAdaptivity.hasHover, hasHoverContext = tmp2 === void 0 ? true : tmp2;
    var hasPointerContext = useAdaptivityHasPointer();
    var _React_useState = _sliced_to_array(React.useState([]), 2), clicks = _React_useState[0], setClicks = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), childHover = _React_useState1[0], setChildHover = _React_useState1[1];
    var _useBooleanState = useBooleanState(false), _hovered = _useBooleanState.value, setHoveredTrue = _useBooleanState.setTrue, setHoveredFalse = _useBooleanState.setFalse;
    var hovered = (_hovered || hoveredProp) && !props.disabled;
    var hasActive = _hasActive && !childHover && !props.disabled;
    var hasHover = hasHoverContext && _hasHover && !childHover;
    var isCustomElement = Component !== "a" && Component !== "button" && Component !== "label" && !props.contentEditable;
    var isPresetHoverMode = isPresetStateMode(hoverMode);
    var isPresetActiveMode = isPresetStateMode(activeMode);
    var _useActivity = _sliced_to_array(useActivity(hasActive, activeEffectDelay), 2), activity = _useActivity[0], _useActivity_ = _useActivity[1], start = _useActivity_.start, stop = _useActivity_.stop, delayStart = _useActivity_.delayStart;
    var active = activity === TapState.active || activity === TapState.exiting;
    var activated = (active || activatedProp) && !props.disabled;
    var containerRef = useExternRef(getRootRef);
    // hover propagation
    var childContext = React.useRef({
        onHoverChange: setChildHover
    }).current;
    useIsomorphicLayoutEffect(function() {
        if (!hovered) {
            return noop;
        }
        onHoverChange(true);
        return function() {
            return onHoverChange(false);
        };
    }, [
        hovered
    ]);
    var needWaves = platform === Platform.ANDROID && !hasPointerContext && hasActive && activeMode === "background";
    var clearClicks = useTimeout(function() {
        return setClicks([]);
    }, WAVE_LIVE);
    var focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: !props.disabled && focusVisible,
        mode: focusVisibleMode
    });
    var classes = classNames(className, "vkuiTappable", "vkuiInternalTappable", platform === Platform.IOS && "vkuiTappable--ios", sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], hasHover && "vkuiTappable--hasHover", hasActive && "vkuiTappable--hasActive", hasHover && hovered && !isPresetHoverMode && hoverMode, hasActive && activated && !isPresetActiveMode && activeMode, hasHover && hovered && isPresetHoverMode && stylesHoverMode[hoverMode], hasActive && activated && isPresetActiveMode && stylesActiveMode[activeMode], borderRadiusMode === "inherit" && "vkuiTappable--borderRadiusInherit", focusVisibleClassNames);
    var handlers = {
        onStart: callMultiple(onStart, props.onStart),
        onMove: callMultiple(onMove, props.onMove),
        onEnd: callMultiple(onEnd, props.onEnd),
        onClick: onClick,
        onKeyDown: callMultiple(onKeyDown, _onKeyDown)
    };
    var role = props.href ? "link" : "button";
    return /*#__PURE__*/ React.createElement(Touch, _object_spread(_object_spread_props(_object_spread({
        onEnter: callMultiple(setHoveredTrue, onEnter),
        onLeave: callMultiple(setHoveredFalse, onLeave),
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
        onBlur: callMultiple(onBlur, props.onBlur),
        onFocus: callMultiple(onFocus, props.onFocus)
    }), props.disabled ? {} : handlers), /*#__PURE__*/ React.createElement(TappableContext.Provider, {
        value: childContext
    }, children), needWaves && /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: "vkuiTappable__waves"
    }, clicks.map(function(wave) {
        return /*#__PURE__*/ React.createElement("span", {
            key: wave.id,
            className: "vkuiTappable__wave",
            style: {
                top: wave.y,
                left: wave.x
            }
        });
    })), (hasHover && hoverMode === "background" || hasActive && activeMode === "background") && /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: "vkuiTappable__stateLayer"
    }));
};

//# sourceMappingURL=Tappable.js.map