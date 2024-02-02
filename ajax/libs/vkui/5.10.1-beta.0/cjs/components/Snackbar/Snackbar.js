"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Snackbar", {
    enumerable: true,
    get: function() {
        return Snackbar;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _touch = require("../../lib/touch");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _Button = require("../Button/Button");
var _RootComponent = require("../RootComponent/RootComponent");
var _Touch = require("../Touch/Touch");
var _Basic = require("./subcomponents/Basic/Basic");
var Snackbar = function(_param) {
    var children = _param.children, tmp = _param.layout, layoutProps = tmp === void 0 ? "horizontal" : tmp, action = _param.action, before = _param.before, after = _param.after, _param_duration = _param.duration, duration = _param_duration === void 0 ? 4000 : _param_duration, onActionClick = _param.onActionClick, onClose = _param.onClose, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, subtitle = _param.subtitle, offsetY = _param.offsetY, style = _param.style, restProps = _object_without_properties._(_param, [
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
    var platform = (0, _usePlatform.usePlatform)();
    var viewWidth = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().viewWidth;
    var isDesktop = viewWidth >= _adaptivity.ViewWidth.SMALL_TABLET;
    var waitTransitionFinish = (0, _useWaitTransitionFinish.useWaitTransitionFinish)().waitTransitionFinish;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), closing = _React_useState[0], setClosing = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(false), 2), touched = _React_useState1[0], setTouched = _React_useState1[1];
    var shiftXPercentRef = _react.useRef(0);
    var shiftXCurrentRef = _react.useRef(0);
    var bodyElRef = _react.useRef(null);
    var innerElRef = _react.useRef(null);
    var animationFrameRef = _react.useRef(null);
    var transitionFinishDurationFallback = platform === _platform.Platform.IOS ? 320 : 400;
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
    var closeTimeout = (0, _useTimeout.useTimeout)(close, duration);
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
        shiftXCurrentRef.current = (0, _touch.rubber)(shiftXPercentRef.current, 72, 1.2, platform !== _platform.Platform.IOS);
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
    _react.useEffect(function() {
        return closeTimeout.set();
    }, [
        closeTimeout
    ]);
    var layout = after || isDesktop || subtitle ? "vertical" : layoutProps;
    return /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, null, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiSnackbar", platform === _platform.Platform.IOS && "vkuiSnackbar--ios", closing && "vkuiSnackbar--closing", touched && "vkuiSnackbar--touched", isDesktop && "vkuiSnackbar--desktop"),
        style: offsetY ? _object_spread_props._(_object_spread._({}, style), {
            bottom: offsetY
        }) : style
    }), /*#__PURE__*/ _react.createElement(_Touch.Touch, {
        className: "vkuiSnackbar__in",
        getRootRef: innerElRef,
        onStart: onTouchStart,
        onMoveX: onTouchMoveX,
        onEnd: onTouchEnd
    }, /*#__PURE__*/ _react.createElement(_Basic.Basic, {
        className: "vkuiSnackbar__snackbar",
        getRootRef: bodyElRef,
        layout: layout,
        mode: mode,
        before: before,
        subtitle: subtitle,
        action: action && /*#__PURE__*/ _react.createElement(_Button.Button, {
            align: "left",
            mode: "link",
            appearance: mode === "dark" ? "overlay" : "accent",
            size: "s",
            onClick: handleActionClick
        }, action),
        after: after
    }, children))));
};
Snackbar.Basic = _Basic.Basic;

//# sourceMappingURL=Snackbar.js.map