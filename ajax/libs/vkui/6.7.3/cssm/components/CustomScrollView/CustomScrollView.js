import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { ScrollX } from './ScrollX';
import { ScrollY } from './ScrollY';
import { useCustomScrollViewResize } from './useCustomScrollViewResize';
import { useDetectScrollDirection } from './useDetectScrollDirection';
import styles from './CustomScrollView.module.css';
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case true:
            return styles['CustomScrollView--hasPointer-true'];
        case false:
            return styles['CustomScrollView--hasPointer-false'];
        case undefined:
        default:
            return styles['CustomScrollView--hasPointer-none'];
    }
}
const overscrollBehaviorClassNames = {
    auto: undefined,
    contain: styles['CustomScrollView__box--overscrollBehavior-contain'],
    none: styles['CustomScrollView__box--overscrollBehavior-none']
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
        className: classNames(className, styles['CustomScrollView'], hasPointerClassName(hasPointer)),
        ref: getRootRef,
        ...restProps,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['CustomScrollView__box'], enableHorizontalScroll && styles['CustomScrollView__box--horizontalEnabled'], overscrollBehaviorClassNames[overscrollBehavior]),
                tabIndex: -1,
                ref: boxRef,
                onScroll: onScroll,
                children: /*#__PURE__*/ _jsx("div", {
                    ref: boxContentRef,
                    className: styles['CustomScrollView__box-content'],
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