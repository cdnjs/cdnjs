import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { ScrollX } from "./ScrollX.js";
import { ScrollY } from "./ScrollY.js";
import { useCustomScrollViewResize } from "./useCustomScrollViewResize.js";
import { useDetectScrollDirection } from "./useDetectScrollDirection.js";
import styles from "./CustomScrollView.module.css";
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case true:
            return styles.hasPointerTrue;
        case false:
            return styles.hasPointerFalse;
        case undefined:
        default:
            return styles.hasPointerNone;
    }
}
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: styles.boxOverscrollBehaviorContain,
    none: styles.boxOverscrollBehaviorNone
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomScrollView
 */ export const CustomScrollView = ({ className, children, boxRef: externalBoxRef, windowResize, autoHideScrollbar = false, autoHideScrollbarDelay, enableHorizontalScroll = false, onScroll: onScrollProp, getRootRef, overscrollBehavior = 'auto', ...restProps })=>{
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
            barYHandlers.current?.resize();
            barXHandlers.current?.resize();
        }
    });
    const onScroll = (event)=>{
        const scrollDirection = detectScrollDirection(event);
        switch(scrollDirection){
            case 'horizontal':
                barXHandlers.current?.scroll();
                break;
            case 'vertical':
                barYHandlers.current?.scroll();
                break;
        }
        onScrollProp?.(event);
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(className, styles.host, hasPointerClassName(hasPointer)),
        ref: getRootRef,
        ...restProps,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.box, enableHorizontalScroll && styles.boxHorizontalEnabled, overscrollBehaviorClassNames[overscrollBehavior]),
                tabIndex: -1,
                ref: boxRef,
                onScroll: onScroll,
                children: /*#__PURE__*/ _jsx("div", {
                    ref: boxContentRef,
                    className: styles.boxContent,
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
    });
};

//# sourceMappingURL=CustomScrollView.js.map