'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useResizeObserver } from "../../hooks/useResizeObserver.js";
import { useDOM } from "../../lib/dom.js";
import { setRef } from "../../lib/utils.js";
import { OnboardingTooltipContainer } from "../OnboardingTooltip/OnboardingTooltipContainer.js";
import { SplitColContext } from "../SplitCol/SplitColContext.js";
import styles from "./FixedLayout.module.css";
const stylesVertical = {
    top: styles.verticalTop,
    bottom: classNames(styles.verticalBottom, 'vkuiInternalFixedLayout--vertical-bottom')
};
/**
 * @see https://vkui.io/components/fixed-layout
 */ export const FixedLayout = ({ children, style, vertical, getRootRef, filled, className, useParentWidth, ...restProps })=>{
    const platform = usePlatform();
    const ref = React.useRef(null);
    const [width, setWidth] = React.useState(undefined);
    const { window } = useDOM();
    const { colRef } = React.useContext(SplitColContext);
    const parentRef = React.useRef(null);
    const handleRootRef = useCallback((node)=>{
        if (!node) {
            return;
        }
        setRef(node, getRootRef);
        setRef(node, ref);
        setRef(node.parentElement, parentRef);
    }, [
        getRootRef
    ]);
    const doResize = ()=>{
        if (useParentWidth && parentRef.current) {
            const parentWidth = parentRef.current.getBoundingClientRect().width;
            setWidth(parentWidth ? `${parentWidth}px` : undefined);
        } else if (colRef?.current) {
            const computedStyle = getComputedStyle(colRef.current);
            setWidth(`${colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft || '0') - parseFloat(computedStyle.paddingRight || '0')}px`);
        } else {
            setWidth(undefined);
        }
    };
    React.useEffect(doResize, [
        colRef,
        platform,
        ref,
        useParentWidth
    ]);
    useResizeObserver(window, doResize);
    useResizeObserver(useParentWidth ? parentRef : colRef, doResize);
    return /*#__PURE__*/ _jsx(OnboardingTooltipContainer, {
        ...restProps,
        fixed: true,
        ref: handleRootRef,
        className: classNames(styles.host, platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && styles.filled, vertical && stylesVertical[vertical], className),
        style: {
            width,
            ...style
        },
        children: children
    });
};

//# sourceMappingURL=FixedLayout.js.map