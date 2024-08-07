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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _ScrollX = require("./ScrollX");
const _ScrollY = require("./ScrollY");
const _useCustomScrollViewResize = require("./useCustomScrollViewResize");
const _useDetectScrollDirection = require("./useDetectScrollDirection");
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
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: "vkuiCustomScrollView__box--overscrollBehavior-contain",
    none: "vkuiCustomScrollView__box--overscrollBehavior-none"
};
const CustomScrollView = (_param)=>{
    var { className, children, boxRef: externalBoxRef, windowResize, autoHideScrollbar = false, autoHideScrollbarDelay, enableHorizontalScroll = false, onScroll: onScrollProp, getRootRef, overscrollBehavior = 'auto' } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "children",
        "boxRef",
        "windowResize",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "enableHorizontalScroll",
        "onScroll",
        "getRootRef",
        "overscrollBehavior"
    ]);
    const { hasPointer } = (0, _useAdaptivity.useAdaptivity)();
    const boxRef = (0, _useExternRef.useExternRef)(externalBoxRef);
    const boxContentRef = _react.useRef(null);
    const detectScrollDirection = (0, _useDetectScrollDirection.useDetectScrollDirection)();
    const barYHandlers = _react.useRef(null);
    const barXHandlers = _react.useRef(null);
    (0, _useCustomScrollViewResize.useCustomScrollViewResize)({
        windowResize,
        boxContentRef,
        onResize: ()=>{
            var _barYHandlers_current, _barXHandlers_current;
            (_barYHandlers_current = barYHandlers.current) === null || _barYHandlers_current === void 0 ? void 0 : _barYHandlers_current.resize();
            (_barXHandlers_current = barXHandlers.current) === null || _barXHandlers_current === void 0 ? void 0 : _barXHandlers_current.resize();
        }
    });
    const onScroll = (event)=>{
        const scrollDirection = detectScrollDirection(event);
        switch(scrollDirection){
            case 'horizontal':
                var _barXHandlers_current;
                (_barXHandlers_current = barXHandlers.current) === null || _barXHandlers_current === void 0 ? void 0 : _barXHandlers_current.scroll();
                break;
            case 'vertical':
                var _barYHandlers_current;
                (_barYHandlers_current = barYHandlers.current) === null || _barYHandlers_current === void 0 ? void 0 : _barYHandlers_current.scroll();
                break;
        }
        onScrollProp === null || onScrollProp === void 0 ? void 0 : onScrollProp(event);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)(className, "vkuiCustomScrollView", hasPointerClassName(hasPointer)),
        ref: getRootRef
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: (0, _vkjs.classNames)("vkuiCustomScrollView__box", enableHorizontalScroll && "vkuiCustomScrollView__box--horizontalEnabled", overscrollBehaviorClassNames[overscrollBehavior]),
                tabIndex: -1,
                ref: boxRef,
                onScroll: onScroll,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    ref: boxContentRef,
                    className: "vkuiCustomScrollView__box-content",
                    children: children
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_ScrollY.ScrollY, {
                barHandlers: barYHandlers,
                boxRef: boxRef,
                autoHideScrollbar: autoHideScrollbar,
                autoHideScrollbarDelay: autoHideScrollbarDelay
            }),
            enableHorizontalScroll && /*#__PURE__*/ (0, _jsxruntime.jsx)(_ScrollX.ScrollX, {
                barHandlers: barXHandlers,
                boxRef: boxRef,
                autoHideScrollbar: autoHideScrollbar,
                autoHideScrollbarDelay: autoHideScrollbarDelay
            })
        ]
    }));
};

//# sourceMappingURL=CustomScrollView.js.map