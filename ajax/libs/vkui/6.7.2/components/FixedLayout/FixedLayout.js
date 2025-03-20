import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useDOM } from '../../lib/dom';
import { setRef } from '../../lib/utils';
import { OnboardingTooltipContainer } from '../OnboardingTooltip/OnboardingTooltipContainer';
import { SplitColContext } from '../SplitCol/SplitColContext';
const stylesVertical = {
    top: "vkuiFixedLayout--vertical-top",
    bottom: classNames("vkuiFixedLayout--vertical-bottom", 'vkuiInternalFixedLayout--vertical-bottom')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FixedLayout
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
    useGlobalEventListener(window, 'resize', doResize);
    useResizeObserver(useParentWidth ? parentRef : colRef, doResize);
    return /*#__PURE__*/ _jsx(OnboardingTooltipContainer, _object_spread_props(_object_spread({}, restProps), {
        fixed: true,
        ref: handleRootRef,
        className: classNames("vkuiFixedLayout", platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && "vkuiFixedLayout--filled", vertical && stylesVertical[vertical], className),
        style: _object_spread_props(_object_spread({}, style), {
            width
        }),
        children: children
    }));
};

//# sourceMappingURL=FixedLayout.js.map