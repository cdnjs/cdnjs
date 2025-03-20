"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Skeleton", {
    enumerable: true,
    get: function() {
        return Skeleton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _constants = require("date-fns/constants");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePrevious = require("../../hooks/usePrevious");
const _dom = require("../../lib/dom");
const _RootComponent = require("../RootComponent/RootComponent");
const CUSTOM_PROPERTY_GRADIENT_LEFT = '--vkui_internal--skeleton_gradient_left';
/**
 * Синхронизирует анимацию скелетонов с помощью временных отрезков
 *
 * ## visibilitychange
 *
 * В синхронизацию не заложен механизм перехода на оптимизации браузеров при
 * переходе на другую вкладку, поскольку нет уверенности в реальности таких
 * кейсов со скелетонами. Если такой кейс принесут, необходимо обработать
 * событие `visibilitychange` используя функцию `syncAnimation`
 *
 * https://developer.chrome.com/blog/page-lifecycle-api/
 *
 * @param duration длительность анимации в секундах
 */ function useSkeletonSyncAnimation(disableAnimation, duration = 1.5) {
    const [isAnimationStarted, setIsAnimationStarted] = _react.useState(false);
    const timer = _react.useRef(undefined);
    const syncAnimation = _react.useCallback(()=>{
        clearTimeout(timer.current);
        setIsAnimationStarted(false);
        const durationInMilliseconds = duration * _constants.millisecondsInSecond;
        const delay = durationInMilliseconds - performance.now() % durationInMilliseconds;
        timer.current = setTimeout(()=>setIsAnimationStarted(true), delay);
        return ()=>clearTimeout(timer.current);
    }, [
        duration
    ]);
    _react.useEffect(()=>{
        if (disableAnimation) {
            setIsAnimationStarted(false);
            return;
        }
        if (isAnimationStarted) {
            return;
        }
        return syncAnimation();
    }, [
        disableAnimation,
        isAnimationStarted,
        syncAnimation
    ]);
    return isAnimationStarted;
}
/**
 * Вычисляет позицию скелетона
 */ function useSkeletonPosition(rootRef) {
    const { document, window } = (0, _dom.useDOM)();
    const [skeletonGradientLeft, setSkeletonGradientLeft] = _react.useState('0');
    const prevSkeletonGradientLeft = (0, _usePrevious.usePrevious)(skeletonGradientLeft);
    const updatePosition = _react.useCallback(()=>{
        const el = rootRef.current;
        if (!el || !document) {
            return;
        }
        const value = -(el.getBoundingClientRect().left - document.body.getBoundingClientRect().left);
        const gradientValue = value === 0 ? '0' : `${value}px`;
        if (prevSkeletonGradientLeft !== gradientValue) {
            setSkeletonGradientLeft(gradientValue);
        }
    }, [
        document,
        prevSkeletonGradientLeft,
        rootRef
    ]);
    _react.useEffect(updatePosition, [
        updatePosition
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', updatePosition);
    return skeletonGradientLeft;
}
const Skeleton = (_param)=>{
    var { width, height, inlineSize, blockSize, maxWidth, maxInlineSize, borderRadius, style, children, colorFrom, colorTo, noAnimation = false, duration, margin, getRootRef } = _param, restProps = _object_without_properties._(_param, [
        "width",
        "height",
        "inlineSize",
        "blockSize",
        "maxWidth",
        "maxInlineSize",
        "borderRadius",
        "style",
        "children",
        "colorFrom",
        "colorTo",
        "noAnimation",
        "duration",
        "margin",
        "getRootRef"
    ]);
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const disableAnimation = !useSkeletonSyncAnimation(noAnimation, duration);
    const skeletonGradientLeft = useSkeletonPosition(rootRef);
    const skeletonStyle = {
        width,
        height,
        inlineSize,
        blockSize,
        maxWidth,
        maxInlineSize,
        borderRadius,
        margin,
        [CUSTOM_PROPERTY_GRADIENT_LEFT]: skeletonGradientLeft
    };
    if (colorFrom) {
        skeletonStyle['--vkui_internal--skeleton_color_from'] = colorFrom;
    }
    if (colorTo) {
        skeletonStyle['--vkui_internal--skeleton_color_to'] = colorTo;
    }
    if (Number.isFinite(duration)) {
        skeletonStyle['--vkui_internal--skeleton_animation_duration'] = `${duration}s`;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        getRootRef: rootRef,
        Component: "span",
        baseClassName: (0, _vkjs.classNames)("vkuiSkeleton", disableAnimation && "vkuiSkeleton--disableAnimation"),
        style: _object_spread._({}, skeletonStyle, style)
    }, restProps), {
        children: children || /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
            children: "‌"
        })
    }));
};

//# sourceMappingURL=Skeleton.js.map