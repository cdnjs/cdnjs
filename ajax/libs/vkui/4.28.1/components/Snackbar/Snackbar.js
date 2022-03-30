import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "layout", "action", "before", "after", "viewWidth", "duration", "onActionClick", "onClose"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Touch } from "../Touch/Touch";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { ANDROID, VKCOM } from "../../lib/platform";
import { rubber } from "../../lib/touch";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import Text from "../Typography/Text/Text";
import Button from "../Button/Button";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";

var SnackbarComponent = function SnackbarComponent(props) {
  var children = props.children,
      layout = props.layout,
      action = props.action,
      before = props.before,
      after = props.after,
      viewWidth = props.viewWidth,
      _props$duration = props.duration,
      duration = _props$duration === void 0 ? 0 : _props$duration,
      onActionClick = props.onActionClick,
      onClose = props.onClose,
      restProps = _objectWithoutProperties(props, _excluded);

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
    vkuiClass: classNames(getClassName("Snackbar", platform), "Snackbar--l-".concat(resolvedLayout), {
      "Snackbar--closing": closing,
      "Snackbar--touched": touched,
      "Snackbar--desktop": isDesktop
    })
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
  }, createScopedElement(Text, {
    weight: "regular",
    vkuiClass: "Snackbar__content-text"
  }, children), action && createScopedElement(Button, {
    align: "left",
    hasHover: false,
    mode: "tertiary",
    size: "s",
    vkuiClass: "Snackbar__action",
    onClick: handleActionClick
  }, action)), after && createScopedElement("div", {
    vkuiClass: "Snackbar__after"
  }, after)))));
};

SnackbarComponent.displayName = "Snackbar";
SnackbarComponent.defaultProps = {
  duration: 4000,
  layout: "horizontal"
};
export var Snackbar = withAdaptivity(SnackbarComponent, {
  viewWidth: true
});
//# sourceMappingURL=Snackbar.js.map