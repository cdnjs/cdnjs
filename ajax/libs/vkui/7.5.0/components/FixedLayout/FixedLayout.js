'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const stylesVertical = {
    top: "vkuiFixedLayout__verticalTop",
    bottom: classNames("vkuiFixedLayout__verticalBottom", 'vkuiInternalFixedLayout--vertical-bottom')
};
/**
 * @see https://vkui.io/components/fixed-layout
 */ export const FixedLayout = (_param)=>{
    var { children, style, vertical, getRootRef, filled, className, useParentWidth } = _param, restProps = _object_without_properties(_param, [
        "children",
        "style",
        "vertical",
        "getRootRef",
        "filled",
        "className",
        "useParentWidth"
    ]);
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
        } else if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
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
    return /*#__PURE__*/ _jsx(OnboardingTooltipContainer, _object_spread_props(_object_spread({}, restProps), {
        fixed: true,
        ref: handleRootRef,
        className: classNames("vkuiFixedLayout__host", platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && "vkuiFixedLayout__filled", vertical && stylesVertical[vertical], className),
        style: _object_spread({
            width
        }, style),
        children: children
    }));
};

//# sourceMappingURL=FixedLayout.js.map