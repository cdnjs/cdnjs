import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useEventListener } from "../../hooks/useEventListener";
import { useExternRef } from "../../hooks/useExternRef";
import { useDOM } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { stopPropagation } from "../../lib/utils";
import { useTrackerVisibility } from "./useTrackerVisibility";
export var CustomScrollView = function(_param) {
    var subscribe = function subscribe(el) {
        if (el) {
            listeners.forEach(function(l) {
                return l.add(el);
            });
        }
    };
    var unsubscribe = function unsubscribe() {
        listeners.forEach(function(l) {
            return l.remove();
        });
    };
    var className = _param.className, children = _param.children, externalBoxRef = _param.boxRef, windowResize = _param.windowResize, _param_autoHideScrollbar = _param.autoHideScrollbar, autoHideScrollbar = _param_autoHideScrollbar === void 0 ? false : _param_autoHideScrollbar, autoHideScrollbarDelay = _param.autoHideScrollbarDelay, onScroll = _param.onScroll, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "boxRef",
        "windowResize",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "onScroll",
        "getRootRef"
    ]);
    var _useDOM = useDOM(), document = _useDOM.document, window = _useDOM.window;
    var ratio = React.useRef(NaN);
    var lastTrackerTop = React.useRef(0);
    var clientHeight = React.useRef(0);
    var trackerHeight = React.useRef(0);
    var scrollHeight = React.useRef(0);
    var transformProp = React.useRef("");
    var startY = React.useRef(0);
    var trackerTop = React.useRef(0);
    var boxRef = useExternRef(externalBoxRef);
    var barY = React.useRef(null);
    var trackerY = React.useRef(null);
    var setTrackerPosition = function(scrollTop) {
        lastTrackerTop.current = scrollTop;
        if (trackerY.current !== null) {
            trackerY.current.style[transformProp.current] = "translate(0, ".concat(scrollTop, "px)");
        }
    };
    var setTrackerPositionFromScroll = function(scrollTop) {
        var progress = scrollTop / (scrollHeight.current - clientHeight.current);
        setTrackerPosition((clientHeight.current - trackerHeight.current) * progress);
    };
    var resize = function() {
        if (!boxRef.current || !barY.current || !trackerY.current) {
            return;
        }
        var localClientHeight = boxRef.current.clientHeight;
        var localScrollHeight = boxRef.current.scrollHeight;
        var localRatio = localClientHeight / localScrollHeight;
        var localTrackerHeight = Math.max(localClientHeight * localRatio, 40);
        ratio.current = localRatio;
        clientHeight.current = localClientHeight;
        scrollHeight.current = localScrollHeight;
        trackerHeight.current = localTrackerHeight;
        if (localRatio >= 1) {
            barY.current.style.display = "none";
        } else {
            barY.current.style.display = "";
            trackerY.current.style.height = "".concat(localTrackerHeight, "px");
            setTrackerPositionFromScroll(boxRef.current.scrollTop);
        }
    };
    var resizeHandler = useEventListener("resize", resize);
    useIsomorphicLayoutEffect(function() {
        if (windowResize && window) {
            resizeHandler.add(window);
        }
    }, [
        windowResize,
        window
    ]);
    useIsomorphicLayoutEffect(function() {
        var _trackerY_current;
        var style = (_trackerY_current = trackerY.current) === null || _trackerY_current === void 0 ? void 0 : _trackerY_current.style;
        var prop = "";
        if (style !== undefined) {
            if ("transform" in style) {
                prop = "transform";
            } else if ("webkitTransform" in style) {
                prop = "webkitTransform";
            }
        }
        transformProp.current = prop;
    }, []);
    useIsomorphicLayoutEffect(resize);
    var setScrollPositionFromTracker = function(trackerTop) {
        var progress = trackerTop / (clientHeight.current - trackerHeight.current);
        if (boxRef.current !== null) {
            boxRef.current.scrollTop = (scrollHeight.current - clientHeight.current) * progress;
        }
    };
    var onMove = function(e) {
        e.preventDefault();
        var diff = e.clientY - startY.current;
        var position = Math.min(Math.max(trackerTop.current + diff, 0), clientHeight.current - trackerHeight.current);
        setScrollPositionFromTracker(position);
    };
    var _useTrackerVisibility = useTrackerVisibility(autoHideScrollbar, autoHideScrollbarDelay), trackerVisible = _useTrackerVisibility.trackerVisible, onTargetScroll = _useTrackerVisibility.onTargetScroll, onTrackerDragStart = _useTrackerVisibility.onTrackerDragStart, onTrackerDragStop = _useTrackerVisibility.onTrackerDragStop, onTrackerMouseEnter = _useTrackerVisibility.onTrackerMouseEnter, onTrackerMouseLeave = _useTrackerVisibility.onTrackerMouseLeave;
    var onUp = function(e) {
        e.preventDefault();
        if (autoHideScrollbar) {
            onTrackerDragStop();
        }
        unsubscribe();
    };
    var scroll = function(event) {
        if (ratio.current >= 1 || !boxRef.current) {
            return;
        }
        if (autoHideScrollbar) {
            onTargetScroll();
        }
        setTrackerPositionFromScroll(boxRef.current.scrollTop);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
    };
    var listeners = [
        useEventListener("mousemove", onMove),
        useEventListener("mouseup", onUp)
    ];
    var onDragStart = function(e) {
        e.preventDefault();
        startY.current = e.clientY;
        trackerTop.current = lastTrackerTop.current;
        if (autoHideScrollbar) {
            onTrackerDragStart();
        }
        subscribe(document);
    };
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiCustomScrollView", className),
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