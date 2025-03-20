import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { ScrollX } from "./ScrollX.js";
import { ScrollY } from "./ScrollY.js";
import { useCustomScrollViewResize } from "./useCustomScrollViewResize.js";
import { useDetectScrollDirection } from "./useDetectScrollDirection.js";
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case true:
            return "vkuiCustomScrollView__hasPointerTrue";
        case false:
            return "vkuiCustomScrollView__hasPointerFalse";
        case undefined:
        default:
            return "vkuiCustomScrollView__hasPointerNone";
    }
}
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: "vkuiCustomScrollView__boxOverscrollBehaviorContain",
    none: "vkuiCustomScrollView__boxOverscrollBehaviorNone"
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomScrollView
 */ export const CustomScrollView = (_param)=>{
    var { className, children, boxRef: externalBoxRef, windowResize, autoHideScrollbar = false, autoHideScrollbarDelay, enableHorizontalScroll = false, onScroll: onScrollProp, getRootRef, overscrollBehavior = 'auto' } = _param, restProps = _object_without_properties(_param, [
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
    const { hasPointer } = useAdaptivity();
    const boxRef = useExternRef(externalBoxRef);
    const boxContentRef = React.useRef(null);
    const detectScrollDirection = useDetectScrollDirection();
    const barYHandlers = React.useRef(null);
    const barXHandlers = React.useRef(null);
    useCustomScrollViewResize({
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
    return /*#__PURE__*/ _jsxs("div", _object_spread_props(_object_spread({
        className: classNames(className, "vkuiCustomScrollView__host", hasPointerClassName(hasPointer)),
        ref: getRootRef
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiCustomScrollView__box", enableHorizontalScroll && "vkuiCustomScrollView__boxHorizontalEnabled", overscrollBehaviorClassNames[overscrollBehavior]),
                tabIndex: -1,
                ref: boxRef,
                onScroll: onScroll,
                children: /*#__PURE__*/ _jsx("div", {
                    ref: boxContentRef,
                    className: "vkuiCustomScrollView__boxContent",
                    children: children
                })
            }),
            /*#__PURE__*/ _jsx(ScrollY, {
                barHandlers: barYHandlers,
                boxRef: boxRef,
                autoHideScrollbar: autoHideScrollbar,
                autoHideScrollbarDelay: autoHideScrollbarDelay
            }),
            enableHorizontalScroll && /*#__PURE__*/ _jsx(ScrollX, {
                barHandlers: barXHandlers,
                boxRef: boxRef,
                autoHideScrollbar: autoHideScrollbar,
                autoHideScrollbarDelay: autoHideScrollbarDelay
            })
        ]
    }));
};

//# sourceMappingURL=CustomScrollView.js.map