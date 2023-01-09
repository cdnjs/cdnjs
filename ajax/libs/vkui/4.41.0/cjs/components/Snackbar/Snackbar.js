"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Touch = require("../Touch/Touch");
var _classNames = require("../../lib/classNames");
var _platform = require("../../lib/platform");
var _touch = require("../../lib/touch");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var _Button = require("../Button/Button");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _excluded = ["children", "layout", "action", "before", "after", "viewWidth", "duration", "onActionClick", "onClose", "mode"];
var SnackbarComponent = function SnackbarComponent(_ref) {
  var children = _ref.children,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? "horizontal" : _ref$layout,
    action = _ref.action,
    before = _ref.before,
    after = _ref.after,
    viewWidth = _ref.viewWidth,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 4000 : _ref$duration,
    onActionClick = _ref.onActionClick,
    onClose = _ref.onClose,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "default" : _ref$mode,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useWaitTransitionFin = (0, _useWaitTransitionFinish.useWaitTransitionFinish)(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    closing = _React$useState2[0],
    setClosing = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    touched = _React$useState4[0],
    setTouched = _React$useState4[1];
  var shiftXPercentRef = React.useRef(0);
  var shiftXCurrentRef = React.useRef(0);
  var bodyElRef = React.useRef(null);
  var innerElRef = React.useRef(null);
  var animationFrameRef = React.useRef(null);
  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET;
  var transitionFinishDurationFallback = platform === _platform.ANDROID || platform === _platform.VKCOM ? 400 : 320;
  var close = function close() {
    setClosing(true);
    waitTransitionFinish(innerElRef.current, function () {
      onClose();
    }, transitionFinishDurationFallback);
  };
  var handleActionClick = function handleActionClick(e) {
    close();
    if (action && typeof onActionClick === "function") {
      onActionClick(e);
    }
  };
  var closeTimeout = (0, _useTimeout.useTimeout)(close, duration);
  var setBodyTransform = function setBodyTransform(percent) {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(function () {
      if (bodyElRef.current) {
        bodyElRef.current.style.transform = "translate3d(".concat(percent, "%, 0, 0)");
      }
    });
  };
  var onTouchStart = closeTimeout.clear;
  var onTouchMoveX = function onTouchMoveX(event) {
    var _bodyElRef$current$of, _bodyElRef$current;
    var shiftX = event.shiftX,
      originalEvent = event.originalEvent;
    originalEvent.preventDefault();
    if (!touched) {
      setTouched(true);
    }
    shiftXPercentRef.current = shiftX / ((_bodyElRef$current$of = (_bodyElRef$current = bodyElRef.current) === null || _bodyElRef$current === void 0 ? void 0 : _bodyElRef$current.offsetWidth) !== null && _bodyElRef$current$of !== void 0 ? _bodyElRef$current$of : 0) * 100;
    shiftXCurrentRef.current = (0, _touch.rubber)(shiftXPercentRef.current, 72, 1.2, platform === _platform.ANDROID || platform === _platform.VKCOM);
    setBodyTransform(shiftXCurrentRef.current);
  };
  var onTouchEnd = function onTouchEnd(e) {
    var callback;
    if (touched) {
      var shiftXCurrent = shiftXCurrentRef.current;
      var expectTranslateY = shiftXCurrent / e.duration * 240 * 0.6;
      shiftXCurrent = shiftXCurrent + expectTranslateY;
      if (isDesktop && shiftXCurrent <= -50) {
        closeTimeout.clear();
        waitTransitionFinish(bodyElRef.current, function () {
          onClose();
        }, transitionFinishDurationFallback);
        setBodyTransform(-120);
      } else if (!isDesktop && shiftXCurrent >= 50) {
        closeTimeout.clear();
        waitTransitionFinish(bodyElRef.current, function () {
          onClose();
        }, transitionFinishDurationFallback);
        setBodyTransform(120);
      } else {
        callback = function callback() {
          closeTimeout.set();
          setBodyTransform(0);
        };
      }
    } else {
      closeTimeout.set();
    }
    setTouched(false);
    callback && requestAnimationFrame(callback);
  };
  React.useEffect(function () {
    return closeTimeout.set();
  }, [closeTimeout]);
  var resolvedLayout = after || isDesktop ? "vertical" : layout;
  return (0, _jsxRuntime.createScopedElement)(_AppRootPortal.AppRootPortal, null, (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Snackbar", platform === _platform.IOS && "Snackbar--ios", "Snackbar--l-".concat(resolvedLayout), "Snackbar--".concat(mode), closing && "Snackbar--closing", touched && "Snackbar--touched", isDesktop && "Snackbar--desktop")
  }), (0, _jsxRuntime.createScopedElement)(_Touch.Touch, {
    vkuiClass: "Snackbar__in",
    getRootRef: innerElRef,
    onStart: onTouchStart,
    onMoveX: onTouchMoveX,
    onEnd: onTouchEnd
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Snackbar__body",
    ref: bodyElRef
  }, before && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Snackbar__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Snackbar__content"
  }, (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    vkuiClass: "Snackbar__content-text"
  }, children), action && (0, _jsxRuntime.createScopedElement)(_Button.Button, {
    align: "left",
    hasHover: false,
    mode: "tertiary",
    appearance: mode === "dark" ? "overlay" : "accent",
    size: "s",
    vkuiClass: "Snackbar__action",
    onClick: handleActionClick
  }, action)), after && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Snackbar__after"
  }, after)))));
};
SnackbarComponent.displayName = "Snackbar";

/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */
var Snackbar = (0, _withAdaptivity.withAdaptivity)(SnackbarComponent, {
  viewWidth: true
});
exports.Snackbar = Snackbar;
//# sourceMappingURL=Snackbar.js.map