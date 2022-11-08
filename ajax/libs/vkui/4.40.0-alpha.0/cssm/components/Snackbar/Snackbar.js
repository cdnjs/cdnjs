import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "layout", "action", "before", "after", "viewWidth", "duration", "onActionClick", "onClose", "mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Touch } from "../Touch/Touch";
import { classNames } from "../../lib/classNames";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import { rubber } from "../../lib/touch";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Button } from "../Button/Button";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import "./Snackbar.css";
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useWaitTransitionFin = useWaitTransitionFinish(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    closing = _React$useState2[0],
    setClosing = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    touched = _React$useState4[0],
    setTouched = _React$useState4[1];
  var shiftXPercentRef = React.useRef(0);
  var shiftXCurrentRef = React.useRef(0);
  var bodyElRef = React.useRef(null);
  var innerElRef = React.useRef(null);
  var animationFrameRef = React.useRef(null);
  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
  var transitionFinishDurationFallback = platform === ANDROID || platform === VKCOM ? 400 : 320;
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
  var closeTimeout = useTimeout(close, duration);
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
    shiftXCurrentRef.current = rubber(shiftXPercentRef.current, 72, 1.2, platform === ANDROID || platform === VKCOM);
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
  return createScopedElement(AppRootPortal, null, createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("Snackbar", platform === IOS && "Snackbar--ios", "Snackbar--l-".concat(resolvedLayout), "Snackbar--".concat(mode), closing && "Snackbar--closing", touched && "Snackbar--touched", isDesktop && "Snackbar--desktop")
  }), createScopedElement(Touch, {
    vkuiClass: "Snackbar__in",
    getRootRef: innerElRef,
    onStart: onTouchStart,
    onMoveX: onTouchMoveX,
    onEnd: onTouchEnd
  }, createScopedElement("div", {
    vkuiClass: "Snackbar__body",
    ref: bodyElRef
  }, before && createScopedElement("div", {
    vkuiClass: "Snackbar__before"
  }, before), createScopedElement("div", {
    vkuiClass: "Snackbar__content"
  }, createScopedElement(Paragraph, {
    vkuiClass: "Snackbar__content-text"
  }, children), action && createScopedElement(Button, {
    align: "left",
    hasHover: false,
    mode: "tertiary",
    appearance: mode === "dark" ? "overlay" : "accent",
    size: "s",
    vkuiClass: "Snackbar__action",
    onClick: handleActionClick
  }, action)), after && createScopedElement("div", {
    vkuiClass: "Snackbar__after"
  }, after)))));
};
SnackbarComponent.displayName = "Snackbar";

/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */
export var Snackbar = withAdaptivity(SnackbarComponent, {
  viewWidth: true
});
//# sourceMappingURL=Snackbar.js.map