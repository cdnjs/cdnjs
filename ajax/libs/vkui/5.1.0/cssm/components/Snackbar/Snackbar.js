import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "layout", "action", "before", "after", "duration", "onActionClick", "onClose", "mode", "className", "subtitle"];
import * as React from 'react';
import { Touch } from '../Touch/Touch';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { rubber } from '../../lib/touch';
import { ViewWidth } from '../../lib/adaptivity';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Button } from '../Button/Button';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useTimeout } from '../../hooks/useTimeout';
import "./Snackbar.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */
export var Snackbar = function Snackbar(_ref) {
  var children = _ref.children,
    _ref$layout = _ref.layout,
    layoutProps = _ref$layout === void 0 ? 'horizontal' : _ref$layout,
    action = _ref.action,
    before = _ref.before,
    after = _ref.after,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 4000 : _ref$duration,
    onActionClick = _ref.onActionClick,
    onClose = _ref.onClose,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
    className = _ref.className,
    subtitle = _ref.subtitle,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    viewWidth = _useAdaptivityWithJSM.viewWidth;
  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
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
  var transitionFinishDurationFallback = platform === Platform.IOS ? 320 : 400;
  var close = function close() {
    setClosing(true);
    waitTransitionFinish(innerElRef.current, function () {
      onClose();
    }, transitionFinishDurationFallback);
  };
  var handleActionClick = function handleActionClick(e) {
    close();
    if (action && typeof onActionClick === 'function') {
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
    shiftXCurrentRef.current = rubber(shiftXPercentRef.current, 72, 1.2, platform !== Platform.IOS);
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
  var layout = after || isDesktop || subtitle ? 'vertical' : layoutProps;
  return /*#__PURE__*/React.createElement(AppRootPortal, null, /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiSnackbar", platform === Platform.IOS && "vkuiSnackbar--ios", styles["Snackbar--layout-".concat(layout)], styles["Snackbar--mode-".concat(mode)], closing && "vkuiSnackbar--closing", touched && "vkuiSnackbar--touched", isDesktop && "vkuiSnackbar--desktop", className)
  }), /*#__PURE__*/React.createElement(Touch, {
    className: "vkuiSnackbar__in",
    getRootRef: innerElRef,
    onStart: onTouchStart,
    onMoveX: onTouchMoveX,
    onEnd: onTouchEnd
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSnackbar__body",
    ref: bodyElRef
  }, before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSnackbar__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSnackbar__content"
  }, /*#__PURE__*/React.createElement(Paragraph, {
    className: "vkuiSnackbar__content-text"
  }, children), subtitle && !action && /*#__PURE__*/React.createElement(Subhead, {
    className: "vkuiSnackbar__content-subtitle"
  }, subtitle), action && !subtitle && /*#__PURE__*/React.createElement(Button, {
    align: "left",
    mode: "link",
    appearance: mode === 'dark' ? 'overlay' : 'accent',
    size: "s",
    className: "vkuiSnackbar__action",
    onClick: handleActionClick
  }, action)), after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSnackbar__after"
  }, after)))));
};
var styles = {
  "Snackbar--layout-vertical": "vkuiSnackbar--layout-vertical",
  "Snackbar--layout-horizontal": "vkuiSnackbar--layout-horizontal",
  "Snackbar--mode-dark": "vkuiSnackbar--mode-dark",
  "Snackbar--mode-default": "vkuiSnackbar--mode-default"
};
//# sourceMappingURL=Snackbar.js.map