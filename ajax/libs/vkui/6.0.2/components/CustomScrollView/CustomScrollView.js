import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useEventListener } from '../../hooks/useEventListener';
import { useExternRef } from '../../hooks/useExternRef';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { stopPropagation } from '../../lib/utils';
import { useTrackerVisibility } from './useTrackerVisibility';
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
export const CustomScrollView = (_param)=>{
    var { className, children, boxRef: externalBoxRef, windowResize, autoHideScrollbar = false, autoHideScrollbarDelay, onScroll, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "boxRef",
        "windowResize",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "onScroll",
        "getRootRef"
    ]);
    const { document, window } = useDOM();
    const { hasPointer } = useAdaptivity();
    const ratio = React.useRef(NaN);
    const lastTrackerTop = React.useRef(0);
    const clientHeight = React.useRef(0);
    const trackerHeight = React.useRef(0);
    const scrollHeight = React.useRef(0);
    const transformProp = React.useRef('');
    const startY = React.useRef(0);
    const trackerTop = React.useRef(0);
    const boxRef = useExternRef(externalBoxRef);
    const barY = React.useRef(null);
    const trackerY = React.useRef(null);
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
    const resizeHandler = useEventListener('resize', resize);
    useIsomorphicLayoutEffect(()=>{
        if (windowResize && window) {
            resizeHandler.add(window);
        }
    }, [
        windowResize,
        window
    ]);
    useIsomorphicLayoutEffect(()=>{
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
    useIsomorphicLayoutEffect(resize);
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
    const { trackerVisible, onTargetScroll, onTrackerDragStart, onTrackerDragStop, onTrackerMouseEnter, onTrackerMouseLeave } = useTrackerVisibility(autoHideScrollbar, autoHideScrollbarDelay);
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
        useEventListener('mousemove', onMove),
        useEventListener('mouseup', onUp)
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
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames(className, "vkuiCustomScrollView", hasPointerClassName(hasPointer)),
        ref: getRootRef
    }, restProps), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomScrollView__box",
        tabIndex: -1,
        ref: boxRef,
        onScroll: scroll
    }, children), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomScrollView__barY",
        ref: barY,
        onClick: stopPropagation
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCustomScrollView__trackerY", !trackerVisible && "vkuiCustomScrollView__trackerY--hidden"),
        onMouseEnter: autoHideScrollbar ? onTrackerMouseEnter : undefined,
        onMouseLeave: autoHideScrollbar ? onTrackerMouseLeave : undefined,
        ref: trackerY,
        onMouseDown: onDragStart
    })));
};

//# sourceMappingURL=CustomScrollView.js.map