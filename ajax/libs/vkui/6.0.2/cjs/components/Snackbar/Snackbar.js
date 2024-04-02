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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _useTimeout = require("../../hooks/useTimeout");
const _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
const _adaptivity = require("../../lib/adaptivity");
const _touch = require("../../lib/touch");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _Button = require("../Button/Button");
const _RootComponent = require("../RootComponent/RootComponent");
const _Touch = require("../Touch/Touch");
const _Basic = require("./subcomponents/Basic/Basic");
const Snackbar = (_param)=>{
    var { children, layout: layoutProps, action, before, after, duration = 4000, onActionClick, onClose, mode = 'default', subtitle, offsetY, style } = _param, restProps = _object_without_properties._(_param, [
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
    const platform = (0, _usePlatform.usePlatform)();
    const { viewWidth } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const isDesktop = viewWidth >= _adaptivity.ViewWidth.SMALL_TABLET;
    const { waitTransitionFinish } = (0, _useWaitTransitionFinish.useWaitTransitionFinish)();
    const [closing, setClosing] = _react.useState(false);
    const [touched, setTouched] = _react.useState(false);
    const shiftXPercentRef = _react.useRef(0);
    const shiftXCurrentRef = _react.useRef(0);
    const bodyElRef = _react.useRef(null);
    const innerElRef = _react.useRef(null);
    const animationFrameRef = _react.useRef(null);
    const transitionFinishDurationFallback = platform === 'ios' ? 320 : 400;
    const close = ()=>{
        setClosing(true);
        waitTransitionFinish(innerElRef.current, ()=>{
            onClose();
        }, transitionFinishDurationFallback);
    };
    const handleActionClick = (e)=>{
        close();
        if (action && typeof onActionClick === 'function') {
            onActionClick(e);
        }
    };
    const closeTimeout = (0, _useTimeout.useTimeout)(close, duration);
    const setBodyTransform = (percent)=>{
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(()=>{
            if (bodyElRef.current) {
                bodyElRef.current.style.transform = `translate3d(${percent}%, 0, 0)`;
            }
        });
    };
    const onTouchStart = closeTimeout.clear;
    const onTouchMoveX = (event)=>{
        var _bodyElRef_current;
        const { shiftX, originalEvent } = event;
        originalEvent.preventDefault();
        if (!touched) {
            setTouched(true);
        }
        var _bodyElRef_current_offsetWidth;
        shiftXPercentRef.current = shiftX / ((_bodyElRef_current_offsetWidth = (_bodyElRef_current = bodyElRef.current) === null || _bodyElRef_current === void 0 ? void 0 : _bodyElRef_current.offsetWidth) !== null && _bodyElRef_current_offsetWidth !== void 0 ? _bodyElRef_current_offsetWidth : 0) * 100;
        shiftXCurrentRef.current = (0, _touch.rubber)(shiftXPercentRef.current, 72, 1.2, platform !== 'ios');
        setBodyTransform(shiftXCurrentRef.current);
    };
    const onTouchEnd = (e)=>{
        let callback;
        if (touched) {
            let shiftXCurrent = shiftXCurrentRef.current;
            const expectTranslateY = shiftXCurrent / e.duration * 240 * 0.6;
            shiftXCurrent = shiftXCurrent + expectTranslateY;
            if (isDesktop && shiftXCurrent <= -50) {
                closeTimeout.clear();
                waitTransitionFinish(bodyElRef.current, ()=>{
                    onClose();
                }, transitionFinishDurationFallback);
                setBodyTransform(-120);
            } else if (!isDesktop && shiftXCurrent >= 50) {
                closeTimeout.clear();
                waitTransitionFinish(bodyElRef.current, ()=>{
                    onClose();
                }, transitionFinishDurationFallback);
                setBodyTransform(120);
            } else {
                callback = ()=>{
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
    _react.useEffect(()=>closeTimeout.set(), [
        closeTimeout
    ]);
    const layout = layoutProps || (after || isDesktop || subtitle ? 'vertical' : 'horizontal');
    return /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, null, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiSnackbar", platform === 'ios' && "vkuiSnackbar--ios", closing && "vkuiSnackbar--closing", touched && "vkuiSnackbar--touched", isDesktop && "vkuiSnackbar--desktop"),
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
            appearance: mode === 'dark' ? 'overlay' : 'accent',
            size: "s",
            onClick: handleActionClick
        }, action),
        after: after
    }, children))));
};
Snackbar.Basic = _Basic.Basic;

//# sourceMappingURL=Snackbar.js.map