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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useEventListener = require("../../hooks/useEventListener");
var _useExternRef = require("../../hooks/useExternRef");
var _dom = require("../../lib/dom");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _utils = require("../../lib/utils");
var _useTrackerVisibility = require("./useTrackerVisibility");
var CustomScrollView = function(_param) {
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
    var className = _param.className, children = _param.children, externalBoxRef = _param.boxRef, windowResize = _param.windowResize, _param_autoHideScrollbar = _param.autoHideScrollbar, autoHideScrollbar = _param_autoHideScrollbar === void 0 ? false : _param_autoHideScrollbar, autoHideScrollbarDelay = _param.autoHideScrollbarDelay, onScroll = _param.onScroll, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "className",
        "children",
        "boxRef",
        "windowResize",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "onScroll",
        "getRootRef"
    ]);
    var _useDOM = (0, _dom.useDOM)(), document = _useDOM.document, window = _useDOM.window;
    var ratio = _react.useRef(NaN);
    var lastTrackerTop = _react.useRef(0);
    var clientHeight = _react.useRef(0);
    var trackerHeight = _react.useRef(0);
    var scrollHeight = _react.useRef(0);
    var transformProp = _react.useRef("");
    var startY = _react.useRef(0);
    var trackerTop = _react.useRef(0);
    var boxRef = (0, _useExternRef.useExternRef)(externalBoxRef);
    var barY = _react.useRef(null);
    var trackerY = _react.useRef(null);
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
    var resizeHandler = (0, _useEventListener.useEventListener)("resize", resize);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (windowResize && window) {
            resizeHandler.add(window);
        }
    }, [
        windowResize,
        window
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(resize);
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
    var _useTrackerVisibility1 = (0, _useTrackerVisibility.useTrackerVisibility)(autoHideScrollbar, autoHideScrollbarDelay), trackerVisible = _useTrackerVisibility1.trackerVisible, onTargetScroll = _useTrackerVisibility1.onTargetScroll, onTrackerDragStart = _useTrackerVisibility1.onTrackerDragStart, onTrackerDragStop = _useTrackerVisibility1.onTrackerDragStop, onTrackerMouseEnter = _useTrackerVisibility1.onTrackerMouseEnter, onTrackerMouseLeave = _useTrackerVisibility1.onTrackerMouseLeave;
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
        (0, _useEventListener.useEventListener)("mousemove", onMove),
        (0, _useEventListener.useEventListener)("mouseup", onUp)
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
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCustomScrollView", className),
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