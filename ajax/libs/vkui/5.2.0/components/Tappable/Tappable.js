import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children", "Component", "onClick", "onKeyDown", "activeEffectDelay", "stopPropagation", "getRootRef", "hasHover", "hoverMode", "hasActive", "activeMode", "focusVisibleMode", "onEnter", "onLeave", "className"];
import * as React from 'react';
import mitt from 'mitt';
import { classNames, noop } from '@vkontakte/vkjs';
import { Touch } from '../Touch/Touch';
import TouchRootContext from '../Touch/TouchContext';
import { Platform } from '../../lib/platform';
import { getOffsetRect } from '../../lib/offset';
import { coordX, coordY } from '../../lib/touch';
import { shouldTriggerClickOnEnterOrSpace } from '../../lib/accessibility';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { FocusVisible } from '../FocusVisible/FocusVisible';
import { useTimeout } from '../../hooks/useTimeout';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { callMultiple } from '../../lib/callMultiple';
import { useBooleanState } from '../../hooks/useBooleanState';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityHasHover } from '../../hooks/useAdaptivityHasHover';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
var sizeXClassNames = {
  none: "vkuiTappable--sizeX-none",
  compact: "vkuiTappable--sizeX-compact",
  regular: "vkuiTappable--sizeX-regular"
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
var TappableContext = /*#__PURE__*/React.createContext({
  onHoverChange: noop
});
function isPresetStateMode(stateMode) {
  switch (stateMode) {
    case 'opacity':
    case 'background':
      return true;
    default:
      return false;
  }
}
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
      activeBus.emit('active', id);
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
    activeBus.on('active', onActiveChange);
    return function () {
      return activeBus.off('active', onActiveChange);
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

/**
 * @see https://vkcom.github.io/VKUI/#/Tappable
 */
export var Tappable = function Tappable(_ref) {
  var children = _ref.children,
    Component = _ref.Component,
    onClick = _ref.onClick,
    _onKeyDown = _ref.onKeyDown,
    _ref$activeEffectDela = _ref.activeEffectDelay,
    activeEffectDelay = _ref$activeEffectDela === void 0 ? ACTIVE_EFFECT_DELAY : _ref$activeEffectDela,
    _ref$stopPropagation = _ref.stopPropagation,
    stopPropagation = _ref$stopPropagation === void 0 ? false : _ref$stopPropagation,
    getRootRef = _ref.getRootRef,
    _ref$hasHover = _ref.hasHover,
    _hasHover = _ref$hasHover === void 0 ? true : _ref$hasHover,
    _ref$hoverMode = _ref.hoverMode,
    hoverMode = _ref$hoverMode === void 0 ? 'background' : _ref$hoverMode,
    _ref$hasActive = _ref.hasActive,
    _hasActive = _ref$hasActive === void 0 ? true : _ref$hasActive,
    _ref$activeMode = _ref.activeMode,
    activeMode = _ref$activeMode === void 0 ? 'background' : _ref$activeMode,
    _ref$focusVisibleMode = _ref.focusVisibleMode,
    focusVisibleMode = _ref$focusVisibleMode === void 0 ? 'inside' : _ref$focusVisibleMode,
    onEnter = _ref.onEnter,
    onLeave = _ref.onLeave,
    className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  Component = Component || (props.href ? 'a' : 'div');
  var _React$useContext = React.useContext(TappableContext),
    onHoverChange = _React$useContext.onHoverChange;
  var insideTouchRoot = React.useContext(TouchRootContext);
  var platform = usePlatform();
  var _useFocusVisible = useFocusVisible(),
    focusVisible = _useFocusVisible.focusVisible,
    onBlur = _useFocusVisible.onBlur,
    onFocus = _useFocusVisible.onFocus;
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeX = _useAdaptivity.sizeX,
    sizeX = _useAdaptivity$sizeX === void 0 ? 'none' : _useAdaptivity$sizeX;
  var hasPointerContext = useAdaptivityHasPointer();
  var hasHoverContext = useAdaptivityHasHover();
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
  var hasHover = hasHoverContext && _hasHover && !childHover;
  var isCustomElement = Component !== 'a' && Component !== 'button' && Component !== 'label' && !props.contentEditable;
  var isPresetHoverMode = isPresetStateMode(hoverMode);
  var isPresetActiveMode = isPresetStateMode(activeMode);
  var isPresetFocusVisibleMode = ['inside', 'outside'].includes(focusVisibleMode);
  var _useActivity = useActivity(hasActive, activeEffectDelay),
    _useActivity2 = _slicedToArray(_useActivity, 2),
    activity = _useActivity2[0],
    _useActivity2$ = _useActivity2[1],
    start = _useActivity2$.start,
    stop = _useActivity2$.stop,
    delayStart = _useActivity2$.delayStart;
  var active = activity === TapState.active || activity === TapState.exiting;
  var containerRef = useExternRef(getRootRef);

  // hover propagation
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
  var needWaves = platform === Platform.ANDROID && !hasPointerContext && hasActive && activeMode === 'background';
  var clearClicks = useTimeout(function () {
    return setClicks([]);
  }, WAVE_LIVE);
  function addClick(x, y) {
    var dateNow = Date.now();
    var filteredClicks = clicks.filter(function (click) {
      return click.id + WAVE_LIVE > dateNow;
    });
    setClicks([].concat(_toConsumableArray(filteredClicks), [{
      x: x,
      y: y,
      id: dateNow
    }]));
    clearClicks.set();
  }
  function onStart(_ref2) {
    var originalEvent = _ref2.originalEvent;
    if (hasActive) {
      if (originalEvent.touches && originalEvent.touches.length > 1) {
        // r сожалению я так и не понял, что это делает и можно ли упихнуть его в Touch
        return stop();
      }
      if (needWaves) {
        var _getOffsetRect = getOffsetRect(containerRef.current),
          top = _getOffsetRect.top,
          left = _getOffsetRect.left;
        var x = coordX(originalEvent) - (left !== null && left !== void 0 ? left : 0);
        var y = coordY(originalEvent) - (top !== null && top !== void 0 ? top : 0);
        addClick(x, y);
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
    }

    // отключить без задержки при длинном тапе
    var activeDuration = duration - ACTIVE_DELAY;
    stop(activeDuration >= 100 ? 0 : activeEffectDelay - activeDuration);
  }
  var classes = classNames(className, "vkuiTappable", platform === Platform.IOS && "vkuiTappable--ios", sizeXClassNames[sizeX], hasHoverContext && "vkuiTappable--hover-has", hasActive && "vkuiTappable--hasActive", hasHover && hovered && !isPresetHoverMode && hoverMode, hasActive && active && !isPresetActiveMode && activeMode, focusVisible && !isPresetFocusVisibleMode && focusVisibleMode, hasActive && active && "vkuiTappable--active", hasHover && hovered && isPresetHoverMode && styles["Tappable--hover-".concat(hoverMode)], hasActive && active && isPresetActiveMode && styles["Tappable--active-".concat(activeMode)], focusVisible && "vkuiTappable--focus-visible");
  var handlers = {
    onStart: callMultiple(onStart, props.onStart),
    onMove: callMultiple(onMove, props.onMove),
    onEnd: callMultiple(onEnd, props.onEnd),
    onClick: onClick,
    onKeyDown: callMultiple(onKeyDown, _onKeyDown)
  };
  var role = props.href ? 'link' : 'button';
  return /*#__PURE__*/React.createElement(Touch, _extends({
    onEnter: callMultiple(setHoveredTrue, onEnter),
    onLeave: callMultiple(setHoveredFalse, onLeave),
    type: Component === 'button' ? 'button' : undefined,
    tabIndex: isCustomElement && !props.disabled ? 0 : undefined,
    role: isCustomElement ? role : undefined,
    "aria-disabled": isCustomElement ? props.disabled : undefined,
    stopPropagation: stopPropagation && !insideTouchRoot && !props.disabled
  }, props, {
    slideThreshold: 20,
    usePointerHover: true,
    className: classes,
    Component: Component,
    getRootRef: containerRef,
    onBlur: callMultiple(onBlur, props.onBlur),
    onFocus: callMultiple(onFocus, props.onFocus)
  }, props.disabled ? {} : handlers), /*#__PURE__*/React.createElement(TappableContext.Provider, {
    value: childContext
  }, children), needWaves && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "vkuiTappable__waves"
  }, clicks.map(function (wave) {
    return /*#__PURE__*/React.createElement("span", {
      key: wave.id,
      className: "vkuiTappable__wave",
      style: {
        top: wave.y,
        left: wave.x
      }
    });
  })), (hasHover && hoverMode === 'background' || hasActive && activeMode === 'background') && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "vkuiTappable__stateLayer"
  }), !props.disabled && isPresetFocusVisibleMode && /*#__PURE__*/React.createElement(FocusVisible, {
    mode: focusVisibleMode
  }));
};
var styles = {
  "Tappable--hover-has": "vkuiTappable--hover-has",
  "Tappable--hover-background": "vkuiTappable--hover-background",
  "Tappable--hover-opacity": "vkuiTappable--hover-opacity",
  "Tappable--active-background": "vkuiTappable--active-background",
  "Tappable--active-opacity": "vkuiTappable--active-opacity"
};
//# sourceMappingURL=Tappable.js.map