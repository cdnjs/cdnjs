"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomScrollView", {
    enumerable: true,
    get: function() {
        return CustomScrollView;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useEventListener = require("../../hooks/useEventListener");
const _useExternRef = require("../../hooks/useExternRef");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _utils = require("../../lib/utils");
const _useTrackerVisibility = require("./useTrackerVisibility");
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case true:
            return "vkuiCustomScrollView--hasPointer-true";
        case false:
            return "vkuiCustomScrollView--hasPointer-false";
        case undefined:
        default:
            return "vkuiCustomScrollView--hasPointer-none";
    }
}
const CustomScrollView = (_param)=>{
    var { className, children, boxRef: externalBoxRef, windowResize, autoHideScrollbar = false, autoHideScrollbarDelay, onScroll, getRootRef } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "children",
        "boxRef",
        "windowResize",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "onScroll",
        "getRootRef"
    ]);
    const { document, window } = (0, _dom.useDOM)();
    const { hasPointer } = (0, _useAdaptivity.useAdaptivity)();
    const ratio = _react.useRef(NaN);
    const lastTrackerTop = _react.useRef(0);
    const clientHeight = _react.useRef(0);
    const trackerHeight = _react.useRef(0);
    const scrollHeight = _react.useRef(0);
    const transformProp = _react.useRef('');
    const startY = _react.useRef(0);
    const trackerTop = _react.useRef(0);
    const boxRef = (0, _useExternRef.useExternRef)(externalBoxRef);
    const barY = _react.useRef(null);
    const trackerY = _react.useRef(null);
    const setTrackerPosition = (scrollTop)=>{
        lastTrackerTop.current = scrollTop;
        if (trackerY.current !== null) {
            trackerY.current.style[transformProp.current] = `translate(0, ${scrollTop}px)`;
        }
    };
    const setTrackerPositionFromScroll = (scrollTop)=>{
        const progress = scrollTop / (scrollHeight.current - clientHeight.current);
        setTrackerPosition((clientHeight.current - trackerHeight.current) * progress);
    };
    const resize = ()=>{
        if (!boxRef.current || !barY.current || !trackerY.current) {
            return;
        }
        const localClientHeight = boxRef.current.clientHeight;
        const localScrollHeight = boxRef.current.scrollHeight;
        const localRatio = localClientHeight / localScrollHeight;
        const localTrackerHeight = Math.max(localClientHeight * localRatio, 40);
        ratio.current = localRatio;
        clientHeight.current = localClientHeight;
        scrollHeight.current = localScrollHeight;
        trackerHeight.current = localTrackerHeight;
        if (localRatio >= 1) {
            barY.current.style.display = 'none';
        } else {
            barY.current.style.display = '';
            trackerY.current.style.height = `${localTrackerHeight}px`;
            setTrackerPositionFromScroll(boxRef.current.scrollTop);
        }
    };
    const resizeHandler = (0, _useEventListener.useEventListener)('resize', resize);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (windowResize && window) {
            resizeHandler.add(window);
        }
    }, [
        windowResize,
        window
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        var _trackerY_current;
        let style = (_trackerY_current = trackerY.current) === null || _trackerY_current === void 0 ? void 0 : _trackerY_current.style;
        let prop = '';
        if (style !== undefined) {
            if ('transform' in style) {
                prop = 'transform';
            } else if ('webkitTransform' in style) {
                prop = 'webkitTransform';
            }
        }
        transformProp.current = prop;
    }, []);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(resize);
    const setScrollPositionFromTracker = (trackerTop)=>{
        const progress = trackerTop / (clientHeight.current - trackerHeight.current);
        if (boxRef.current !== null) {
            boxRef.current.scrollTop = (scrollHeight.current - clientHeight.current) * progress;
        }
    };
    const onMove = (e)=>{
        e.preventDefault();
        const diff = e.clientY - startY.current;
        const position = Math.min(Math.max(trackerTop.current + diff, 0), clientHeight.current - trackerHeight.current);
        setScrollPositionFromTracker(position);
    };
    const { trackerVisible, onTargetScroll, onTrackerDragStart, onTrackerDragStop, onTrackerMouseEnter, onTrackerMouseLeave } = (0, _useTrackerVisibility.useTrackerVisibility)(autoHideScrollbar, autoHideScrollbarDelay);
    const onUp = (e)=>{
        e.preventDefault();
        if (autoHideScrollbar) {
            onTrackerDragStop();
        }
        unsubscribe();
    };
    const scroll = (event)=>{
        if (ratio.current >= 1 || !boxRef.current) {
            return;
        }
        if (autoHideScrollbar) {
            onTargetScroll();
        }
        setTrackerPositionFromScroll(boxRef.current.scrollTop);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
    };
    const listeners = [
        (0, _useEventListener.useEventListener)('mousemove', onMove),
        (0, _useEventListener.useEventListener)('mouseup', onUp)
    ];
    function subscribe(el) {
        if (el) {
            listeners.forEach((l)=>l.add(el));
        }
    }
    function unsubscribe() {
        listeners.forEach((l)=>l.remove());
    }
    const onDragStart = (e)=>{
        e.preventDefault();
        startY.current = e.clientY;
        trackerTop.current = lastTrackerTop.current;
        if (autoHideScrollbar) {
            onTrackerDragStart();
        }
        subscribe(document);
    };
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)(className, "vkuiCustomScrollView", hasPointerClassName(hasPointer)),
        ref: getRootRef
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomScrollView__box",
        tabIndex: -1,
        ref: boxRef,
        onScroll: scroll
    }, children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomScrollView__barY",
        ref: barY,
        onClick: _utils.stopPropagation
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCustomScrollView__trackerY", !trackerVisible && "vkuiCustomScrollView__trackerY--hidden"),
        onMouseEnter: autoHideScrollbar ? onTrackerMouseEnter : undefined,
        onMouseLeave: autoHideScrollbar ? onTrackerMouseLeave : undefined,
        ref: trackerY,
        onMouseDown: onDragStart
    })));
};

//# sourceMappingURL=CustomScrollView.js.map