"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACTIVE_EFFECT_DELAY = exports.ACTIVE_DELAY = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _mitt = _interopRequireDefault(require("mitt"));

var _vkjs = require("@vkontakte/vkjs");

var _Touch = require("../Touch/Touch");

var _TouchContext = _interopRequireDefault(require("../Touch/TouchContext"));

var _classNames2 = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _platform = require("../../lib/platform");

var _offset = require("../../lib/offset");

var _touch = require("../../lib/touch");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _accessibility = require("../../lib/accessibility");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _FocusVisible = require("../FocusVisible/FocusVisible");

var _useTimeout = require("../../hooks/useTimeout");

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _useFocusVisible2 = require("../../hooks/useFocusVisible");

var _callMultiple = require("../../lib/callMultiple");

var _useBooleanState2 = require("../../hooks/useBooleanState");

var _excluded = ["children", "Component", "onClick", "onKeyDown", "activeEffectDelay", "stopPropagation", "getRootRef", "sizeX", "hasMouse", "deviceHasHover", "hasHover", "hoverMode", "hasActive", "activeMode", "focusVisibleMode", "onEnter", "onLeave"];
var ACTIVE_DELAY = 70;
exports.ACTIVE_DELAY = ACTIVE_DELAY;
var ACTIVE_EFFECT_DELAY = 600;
exports.ACTIVE_EFFECT_DELAY = ACTIVE_EFFECT_DELAY;
var activeBus = (0, _mitt.default)();
var TapState = {
  none: 0,
  pending: 1,
  active: 2,
  exiting: 3
};
var TappableContext = /*#__PURE__*/React.createContext({
  onHoverChange: _vkjs.noop
});

function useActivity(hasActive, stopDelay) {
  var id = React.useMemo(function () {
    return Math.round(Math.random() * 1e8).toString(16);
  }, []);

  var _React$useState = React.useState(TapState.none),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
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

  var activeTimeout = (0, _useTimeout.useTimeout)(start, ACTIVE_DELAY);
  var stopTimeout = (0, _useTimeout.useTimeout)(_stop, stopDelay);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
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
  }, [activity]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (activity === TapState.none) {
      return _vkjs.noop;
    }

    var onActiveChange = function onActiveChange(activeId) {
      activeId !== id && _stop();
    };

    activeBus.on("active", onActiveChange);
    return function () {
      return activeBus.off("active", onActiveChange);
    };
  }, [activity === TapState.none]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
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
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  Component = Component || (props.href ? "a" : "div");

  var _React$useContext = React.useContext(TappableContext),
      onHoverChange = _React$useContext.onHoverChange;

  var insideTouchRoot = React.useContext(_TouchContext.default);
  var platform = (0, _usePlatform.usePlatform)();

  var _useFocusVisible = (0, _useFocusVisible2.useFocusVisible)(),
      focusVisible = _useFocusVisible.focusVisible,
      onBlur = _useFocusVisible.onBlur,
      onFocus = _useFocusVisible.onFocus;

  var _React$useState3 = React.useState([]),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      clicks = _React$useState4[0],
      setClicks = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      childHover = _React$useState6[0],
      setChildHover = _React$useState6[1];

  var _useBooleanState = (0, _useBooleanState2.useBooleanState)(false),
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
      _useActivity2 = (0, _slicedToArray2.default)(_useActivity, 2),
      activity = _useActivity2[0],
      _useActivity2$ = _useActivity2[1],
      start = _useActivity2$.start,
      stop = _useActivity2$.stop,
      delayStart = _useActivity2$.delayStart;

  var active = activity === TapState.active || activity === TapState.exiting;
  var containerRef = (0, _useExternRef.useExternRef)(getRootRef); // hover propagation

  var childContext = React.useRef({
    onHoverChange: setChildHover
  }).current;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (!hovered) {
      return _vkjs.noop;
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
    if (isCustomElement && (0, _accessibility.shouldTriggerClickOnEnterOrSpace)(e)) {
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

      if (platform === _platform.ANDROID) {
        var _getOffsetRect = (0, _offset.getOffsetRect)(containerRef.current),
            top = _getOffsetRect.top,
            left = _getOffsetRect.left;

        var x = (0, _touch.coordX)(originalEvent) - (left !== null && left !== void 0 ? left : 0);
        var y = (0, _touch.coordY)(originalEvent) - (top !== null && top !== void 0 ? top : 0);
        setClicks([].concat((0, _toConsumableArray2.default)(clicks), [{
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

  var classes = (0, _classNames2.classNames)((0, _getClassName.getClassName)("Tappable", platform), "Tappable--sizeX-".concat(sizeX), hasHover && hovered && !isPresetHoverMode && hoverMode, hasActive && active && !isPresetActiveMode && activeMode, focusVisible && !isPresetFocusVisibleMode && focusVisibleMode, (_classNames = {
    "Tappable--active": hasActive && active,
    "Tappable--mouse": hasMouse
  }, (0, _defineProperty2.default)(_classNames, "Tappable--hover-".concat(hoverMode), hasHover && hovered && isPresetHoverMode), (0, _defineProperty2.default)(_classNames, "Tappable--active-".concat(activeMode), hasActive && active && isPresetActiveMode), (0, _defineProperty2.default)(_classNames, "Tappable--focus-visible", focusVisible), _classNames));
  var handlers = {
    onStart: (0, _callMultiple.callMultiple)(onStart, props.onStart),
    onMove: (0, _callMultiple.callMultiple)(onMove, props.onMove),
    onEnd: (0, _callMultiple.callMultiple)(onEnd, props.onEnd),
    onClick: onClick,
    onKeyDown: (0, _callMultiple.callMultiple)(onKeyDown, _onKeyDown)
  };
  var role = props.href ? "link" : "button";
  return (0, _jsxRuntime.createScopedElement)(_Touch.Touch, (0, _extends2.default)({
    onEnter: (0, _callMultiple.callMultiple)(setHoveredTrue, onEnter),
    onLeave: (0, _callMultiple.callMultiple)(setHoveredFalse, onLeave),
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
    onBlur: (0, _callMultiple.callMultiple)(onBlur, props.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, props.onFocus)
  }, props.disabled ? {} : handlers), (0, _jsxRuntime.createScopedElement)(TappableContext.Provider, {
    value: childContext
  }, children), platform === _platform.ANDROID && !hasMouse && hasActive && activeMode === "background" && (0, _jsxRuntime.createScopedElement)("span", {
    "aria-hidden": "true",
    vkuiClass: "Tappable__waves"
  }, clicks.map(function (wave) {
    return (0, _jsxRuntime.createScopedElement)(Wave, (0, _extends2.default)({}, wave, {
      key: wave.id,
      onClear: function onClear() {
        return setClicks(clicks.filter(function (c) {
          return c.id !== wave.id;
        }));
      }
    }));
  })), hasHover && hoverMode === "background" && (0, _jsxRuntime.createScopedElement)("span", {
    "aria-hidden": "true",
    vkuiClass: "Tappable__hoverShadow"
  }), !props.disabled && isPresetFocusVisibleMode && (0, _jsxRuntime.createScopedElement)(_FocusVisible.FocusVisible, {
    mode: focusVisibleMode
  }));
}; // eslint-disable-next-line import/no-default-export


var _default = (0, _withAdaptivity.withAdaptivity)(Tappable, {
  sizeX: true,
  hasMouse: true,
  deviceHasHover: true
});

exports.default = _default;

function Wave(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      onClear = _ref5.onClear;
  var timeout = (0, _useTimeout.useTimeout)(onClear, 225);
  React.useEffect(function () {
    return timeout.set();
  }, [timeout]);
  return (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Tappable__wave",
    style: {
      top: y,
      left: x
    }
  });
}
//# sourceMappingURL=Tappable.js.map