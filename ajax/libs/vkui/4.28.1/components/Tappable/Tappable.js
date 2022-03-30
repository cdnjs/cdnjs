import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children", "Component", "onClick", "onKeyDown", "activeEffectDelay", "stopPropagation", "getRootRef", "sizeX", "hasMouse", "deviceHasHover", "hasHover", "hoverMode", "hasActive", "activeMode", "focusVisibleMode", "onEnter", "onLeave"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import mitt from "mitt";
import { noop } from "@vkontakte/vkjs";
import { Touch } from "../Touch/Touch";
import TouchRootContext from "../Touch/TouchContext";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { ANDROID } from "../../lib/platform";
import { getOffsetRect } from "../../lib/offset";
import { coordX, coordY } from "../../lib/touch";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { shouldTriggerClickOnEnterOrSpace } from "../../lib/accessibility";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { FocusVisible } from "../FocusVisible/FocusVisible";
import { useTimeout } from "../../hooks/useTimeout";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { useFocusVisible } from "../../hooks/useFocusVisible";
import { callMultiple } from "../../lib/callMultiple";
import { useBooleanState } from "../../hooks/useBooleanState";
export var ACTIVE_DELAY = 70;
export var ACTIVE_EFFECT_DELAY = 600;
var activeBus = mitt();
var TapState = {
  none: 0,
  pending: 1,
  active: 2,
  exiting: 3
};
var TappableContext = /*#__PURE__*/React.createContext({
  onHoverChange: noop
});

function useActivity(hasActive, stopDelay) {
  var id = React.useMemo(function () {
    return Math.round(Math.random() * 1e8).toString(16);
  }, []);

  var _React$useState = React.useState(TapState.none),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activity = _React$useState2[0],
      setActivity = _React$useState2[1];

  var _stop = function _stop() {
    return setActivity(TapState.none);
  };

  var start = function start() {
    return hasActive && setActivity(TapState.active);
  };

  var delayStart = function delayStart() {
    hasActive && setActivity(TapState.pending);
  };

  var activeTimeout = useTimeout(start, ACTIVE_DELAY);
  var stopTimeout = useTimeout(_stop, stopDelay);
  useIsomorphicLayoutEffect(function () {
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
  }, [activity]);
  useIsomorphicLayoutEffect(function () {
    if (activity === TapState.none) {
      return noop;
    }

    var onActiveChange = function onActiveChange(activeId) {
      activeId !== id && _stop();
    };

    activeBus.on("active", onActiveChange);
    return function () {
      return activeBus.off("active", onActiveChange);
    };
  }, [activity === TapState.none]);
  useIsomorphicLayoutEffect(function () {
    !hasActive && _stop();
  }, [hasActive]);

  var stop = function stop(delay) {
    if (delay) {
      setActivity(TapState.exiting);
      return stopTimeout.set(delay);
    }

    _stop();
  };

  return [activity, {
    delayStart: delayStart,
    start: start,
    stop: stop
  }];
}

var Tappable = function Tappable(_ref) {
  var _classNames;

  var children = _ref.children,
      Component = _ref.Component,
      onClick = _ref.onClick,
      _onKeyDown = _ref.onKeyDown,
      _ref$activeEffectDela = _ref.activeEffectDelay,
      activeEffectDelay = _ref$activeEffectDela === void 0 ? ACTIVE_EFFECT_DELAY : _ref$activeEffectDela,
      _ref$stopPropagation = _ref.stopPropagation,
      stopPropagation = _ref$stopPropagation === void 0 ? false : _ref$stopPropagation,
      getRootRef = _ref.getRootRef,
      sizeX = _ref.sizeX,
      hasMouse = _ref.hasMouse,
      deviceHasHover = _ref.deviceHasHover,
      _ref$hasHover = _ref.hasHover,
      _hasHover = _ref$hasHover === void 0 ? true : _ref$hasHover,
      _ref$hoverMode = _ref.hoverMode,
      hoverMode = _ref$hoverMode === void 0 ? "background" : _ref$hoverMode,
      _ref$hasActive = _ref.hasActive,
      _hasActive = _ref$hasActive === void 0 ? true : _ref$hasActive,
      _ref$activeMode = _ref.activeMode,
      activeMode = _ref$activeMode === void 0 ? "background" : _ref$activeMode,
      _ref$focusVisibleMode = _ref.focusVisibleMode,
      focusVisibleMode = _ref$focusVisibleMode === void 0 ? "inside" : _ref$focusVisibleMode,
      onEnter = _ref.onEnter,
      onLeave = _ref.onLeave,
      props = _objectWithoutProperties(_ref, _excluded);

  Component = Component || (props.href ? "a" : "div");

  var _React$useContext = React.useContext(TappableContext),
      onHoverChange = _React$useContext.onHoverChange;

  var insideTouchRoot = React.useContext(TouchRootContext);
  var platform = usePlatform();

  var _useFocusVisible = useFocusVisible(),
      focusVisible = _useFocusVisible.focusVisible,
      onBlur = _useFocusVisible.onBlur,
      onFocus = _useFocusVisible.onFocus;

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      clicks = _React$useState4[0],
      setClicks = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      childHover = _React$useState6[0],
      setChildHover = _React$useState6[1];

  var _useBooleanState = useBooleanState(false),
      _hovered = _useBooleanState.value,
      setHoveredTrue = _useBooleanState.setTrue,
      setHoveredFalse = _useBooleanState.setFalse;

  var hovered = _hovered && !props.disabled;
  var hasActive = _hasActive && !childHover && !props.disabled;
  var hasHover = deviceHasHover && _hasHover && !childHover;
  var isCustomElement = Component !== "a" && Component !== "button" && !props.contentEditable;
  var isPresetHoverMode = ["opacity", "background"].includes(hoverMode);
  var isPresetActiveMode = ["opacity", "background"].includes(activeMode);
  var isPresetFocusVisibleMode = ["inside", "outside"].includes(focusVisibleMode);

  var _useActivity = useActivity(hasActive, activeEffectDelay),
      _useActivity2 = _slicedToArray(_useActivity, 2),
      activity = _useActivity2[0],
      _useActivity2$ = _useActivity2[1],
      start = _useActivity2$.start,
      stop = _useActivity2$.stop,
      delayStart = _useActivity2$.delayStart;

  var active = activity === TapState.active || activity === TapState.exiting;
  var containerRef = useExternRef(getRootRef); // hover propagation

  var childContext = React.useRef({
    onHoverChange: setChildHover
  }).current;
  useIsomorphicLayoutEffect(function () {
    if (!hovered) {
      return noop;
    }

    onHoverChange(true);
    return function () {
      return onHoverChange(false);
    };
  }, [hovered]);
  /*
   * [a11y]
   * Обрабатывает событие onkeydown
   * для кастомных доступных элементов:
   * - role="link" (активация по Enter)
   * - role="button" (активация по Space и Enter)
   */

  function onKeyDown(e) {
    if (isCustomElement && shouldTriggerClickOnEnterOrSpace(e)) {
      var _containerRef$current;

      e.preventDefault();
      (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.click();
    }
  }

  function onStart(_ref2) {
    var originalEvent = _ref2.originalEvent;

    if (hasActive) {
      if (originalEvent.touches && originalEvent.touches.length > 1) {
        // r сожалению я так и не понял, что это делает и можно ли упихнуть его в Touch
        return stop();
      }

      if (platform === ANDROID) {
        var _getOffsetRect = getOffsetRect(containerRef.current),
            top = _getOffsetRect.top,
            left = _getOffsetRect.left;

        var x = coordX(originalEvent) - (left !== null && left !== void 0 ? left : 0);
        var y = coordY(originalEvent) - (top !== null && top !== void 0 ? top : 0);
        setClicks([].concat(_toConsumableArray(clicks), [{
          x: x,
          y: y,
          id: Date.now().toString()
        }]));
      }

      delayStart();
    }
  }

  function onMove(_ref3) {
    var isSlide = _ref3.isSlide;

    if (isSlide) {
      stop();
    }
  }

  function onEnd(_ref4) {
    var duration = _ref4.duration;

    if (activity === TapState.none) {
      return;
    }

    if (activity === TapState.pending) {
      // активировать при коротком тапе
      start();
    } // отключить без задержки при длинном тапе


    var activeDuraion = duration - ACTIVE_DELAY;
    stop(activeDuraion >= 100 ? 0 : activeEffectDelay - activeDuraion);
  }

  var classes = classNames(getClassName("Tappable", platform), "Tappable--sizeX-".concat(sizeX), hasHover && hovered && !isPresetHoverMode && hoverMode, hasActive && active && !isPresetActiveMode && activeMode, focusVisible && !isPresetFocusVisibleMode && focusVisibleMode, (_classNames = {
    "Tappable--active": hasActive && active,
    "Tappable--mouse": hasMouse
  }, _defineProperty(_classNames, "Tappable--hover-".concat(hoverMode), hasHover && hovered && isPresetHoverMode), _defineProperty(_classNames, "Tappable--active-".concat(activeMode), hasActive && active && isPresetActiveMode), _defineProperty(_classNames, "Tappable--focus-visible", focusVisible), _classNames));
  var handlers = {
    onStart: callMultiple(onStart, props.onStart),
    onMove: callMultiple(onMove, props.onMove),
    onEnd: callMultiple(onEnd, props.onEnd),
    onClick: onClick,
    onKeyDown: callMultiple(onKeyDown, _onKeyDown)
  };
  var role = props.href ? "link" : "button";
  return createScopedElement(Touch, _extends({
    onEnter: callMultiple(setHoveredTrue, onEnter),
    onLeave: callMultiple(setHoveredFalse, onLeave),
    type: Component === "button" ? "button" : undefined,
    tabIndex: isCustomElement && !props.disabled ? 0 : undefined,
    role: isCustomElement ? role : undefined,
    "aria-disabled": isCustomElement ? props.disabled : undefined,
    stopPropagation: stopPropagation && !insideTouchRoot && !props.disabled
  }, props, {
    slideThreshold: 20,
    usePointerHover: true,
    vkuiClass: classes,
    Component: Component,
    getRootRef: containerRef,
    onBlur: callMultiple(onBlur, props.onBlur),
    onFocus: callMultiple(onFocus, props.onFocus)
  }, props.disabled ? {} : handlers), createScopedElement(TappableContext.Provider, {
    value: childContext
  }, children), platform === ANDROID && !hasMouse && hasActive && activeMode === "background" && createScopedElement("span", {
    "aria-hidden": "true",
    vkuiClass: "Tappable__waves"
  }, clicks.map(function (wave) {
    return createScopedElement(Wave, _extends({}, wave, {
      key: wave.id,
      onClear: function onClear() {
        return setClicks(clicks.filter(function (c) {
          return c.id !== wave.id;
        }));
      }
    }));
  })), hasHover && hoverMode === "background" && createScopedElement("span", {
    "aria-hidden": "true",
    vkuiClass: "Tappable__hoverShadow"
  }), !props.disabled && isPresetFocusVisibleMode && createScopedElement(FocusVisible, {
    mode: focusVisibleMode
  }));
}; // eslint-disable-next-line import/no-default-export


export default withAdaptivity(Tappable, {
  sizeX: true,
  hasMouse: true,
  deviceHasHover: true
});

function Wave(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      onClear = _ref5.onClear;
  var timeout = useTimeout(onClear, 225);
  React.useEffect(function () {
    return timeout.set();
  }, [timeout]);
  return createScopedElement("span", {
    vkuiClass: "Tappable__wave",
    style: {
      top: y,
      left: x
    }
  });
}
//# sourceMappingURL=Tappable.js.map