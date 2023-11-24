import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { ViewWidth } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { rubber } from "../../lib/touch";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { Button } from "../Button/Button";
import { RootComponent } from "../RootComponent/RootComponent";
import { Touch } from "../Touch/Touch";
import { Basic } from "./subcomponents/Basic/Basic";
/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */ export var Snackbar = function(_param) {
    var children = _param.children, tmp = _param.layout, layoutProps = tmp === void 0 ? "horizontal" : tmp, action = _param.action, before = _param.before, after = _param.after, _param_duration = _param.duration, duration = _param_duration === void 0 ? 4000 : _param_duration, onActionClick = _param.onActionClick, onClose = _param.onClose, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, subtitle = _param.subtitle, offsetY = _param.offsetY, style = _param.style, restProps = _object_without_properties(_param, [
        "children",
        "layout",
        "action",
        "before",
        "after",
        "duration",
        "onActionClick",
        "onClose",
        "mode",
        "subtitle",
        "offsetY",
        "style"
    ]);
    var platform = usePlatform();
    var viewWidth = useAdaptivityWithJSMediaQueries().viewWidth;
    var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    var waitTransitionFinish = useWaitTransitionFinish().waitTransitionFinish;
    var _React_useState = _sliced_to_array(React.useState(false), 2), closing = _React_useState[0], setClosing = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), touched = _React_useState1[0], setTouched = _React_useState1[1];
    var shiftXPercentRef = React.useRef(0);
    var shiftXCurrentRef = React.useRef(0);
    var bodyElRef = React.useRef(null);
    var innerElRef = React.useRef(null);
    var animationFrameRef = React.useRef(null);
    var transitionFinishDurationFallback = platform === Platform.IOS ? 320 : 400;
    var close = function() {
        setClosing(true);
        waitTransitionFinish(innerElRef.current, function() {
            onClose();
        }, transitionFinishDurationFallback);
    };
    var handleActionClick = function(e) {
        close();
        if (action && typeof onActionClick === "function") {
            onActionClick(e);
        }
    };
    var closeTimeout = useTimeout(close, duration);
    var setBodyTransform = function(percent) {
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(function() {
            if (bodyElRef.current) {
                bodyElRef.current.style.transform = "translate3d(".concat(percent, "%, 0, 0)");
            }
        });
    };
    var onTouchStart = closeTimeout.clear;
    var onTouchMoveX = function(event) {
        var _bodyElRef_current;
        var shiftX = event.shiftX, originalEvent = event.originalEvent;
        originalEvent.preventDefault();
        if (!touched) {
            setTouched(true);
        }
        var _bodyElRef_current_offsetWidth;
        shiftXPercentRef.current = shiftX / ((_bodyElRef_current_offsetWidth = (_bodyElRef_current = bodyElRef.current) === null || _bodyElRef_current === void 0 ? void 0 : _bodyElRef_current.offsetWidth) !== null && _bodyElRef_current_offsetWidth !== void 0 ? _bodyElRef_current_offsetWidth : 0) * 100;
        shiftXCurrentRef.current = rubber(shiftXPercentRef.current, 72, 1.2, platform !== Platform.IOS);
        setBodyTransform(shiftXCurrentRef.current);
    };
    var onTouchEnd = function(e) {
        var callback;
        if (touched) {
            var shiftXCurrent = shiftXCurrentRef.current;
            var expectTranslateY = shiftXCurrent / e.duration * 240 * 0.6;
            shiftXCurrent = shiftXCurrent + expectTranslateY;
            if (isDesktop && shiftXCurrent <= -50) {
                closeTimeout.clear();
                waitTransitionFinish(bodyElRef.current, function() {
                    onClose();
                }, transitionFinishDurationFallback);
                setBodyTransform(-120);
            } else if (!isDesktop && shiftXCurrent >= 50) {
                closeTimeout.clear();
                waitTransitionFinish(bodyElRef.current, function() {
                    onClose();
                }, transitionFinishDurationFallback);
                setBodyTransform(120);
            } else {
                callback = function() {
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
    React.useEffect(function() {
        return closeTimeout.set();
    }, [
        closeTimeout
    ]);
    var layout = after || isDesktop || subtitle ? "vertical" : layoutProps;
    return /*#__PURE__*/ React.createElement(AppRootPortal, null, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSnackbar", platform === Platform.IOS && "vkuiSnackbar--ios", closing && "vkuiSnackbar--closing", touched && "vkuiSnackbar--touched", isDesktop && "vkuiSnackbar--desktop"),
        style: offsetY ? _object_spread_props(_object_spread({}, style), {
            bottom: offsetY
        }) : style
    }), /*#__PURE__*/ React.createElement(Touch, {
        className: "vkuiSnackbar__in",
        getRootRef: innerElRef,
        onStart: onTouchStart,
        onMoveX: onTouchMoveX,
        onEnd: onTouchEnd
    }, /*#__PURE__*/ React.createElement(Basic, {
        className: "vkuiSnackbar__snackbar",
        getRootRef: bodyElRef,
        layout: layout,
        mode: mode,
        before: before,
        subtitle: subtitle,
        action: action && /*#__PURE__*/ React.createElement(Button, {
            align: "left",
            mode: "link",
            appearance: mode === "dark" ? "overlay" : "accent",
            size: "s",
            onClick: handleActionClick
        }, action),
        after: after
    }, children))));
};
Snackbar.Basic = Basic;

//# sourceMappingURL=Snackbar.js.map