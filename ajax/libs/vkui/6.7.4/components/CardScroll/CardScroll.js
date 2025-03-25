import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useDOM } from '../../lib/dom';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesSize = {
    s: 'vkuiInternalCardScroll--size-s',
    m: 'vkuiInternalCardScroll--size-m',
    l: 'vkuiInternalCardScroll--size-l'
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardScroll
 */ export const CardScroll = (_param)=>{
    var { children, size = 's', showArrows = true, noSpaces = false, // TODO [>=7]: поменять тег на ul https://github.com/VKCOM/VKUI/issues/7336
    Component = 'div' } = _param, restProps = _object_without_properties(_param, [
        "children",
        "size",
        "showArrows",
        "noSpaces",
        "Component"
    ]);
    const refContainer = React.useRef(null);
    const gapRef = React.useRef(null);
    const { window } = useDOM();
    function getScrollToLeft(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slideIndex = [
            ...refContainer.current.children
        ].findIndex((el)=>el.offsetLeft + el.offsetWidth + parseInt(window.getComputedStyle(el).marginRight) - offset >= 0);
        if (slideIndex === -1) {
            return offset;
        }
        if (slideIndex === 0) {
            return 0;
        }
        const slide = refContainer.current.children[slideIndex];
        const scrollTo = slide.offsetLeft - (containerWidth - slide.offsetWidth) + gapRef.current.offsetWidth;
        if (scrollTo <= 2 * gapRef.current.offsetWidth) {
            return 0;
        }
        return scrollTo;
    }
    function getScrollToRight(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slide = Array.prototype.find.call(refContainer.current.children, (el)=>el.offsetLeft + el.offsetWidth - offset > containerWidth);
        if (!slide) {
            return offset;
        }
        return slide.offsetLeft - gapRef.current.offsetWidth;
    }
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        baseClassName: classNames("vkuiCardScroll", 'vkuiInternalCardScroll', size !== false && stylesSize[size], !noSpaces && "vkuiCardScroll--withSpaces"),
        children: /*#__PURE__*/ _jsx(HorizontalScroll, {
            getScrollToLeft: getScrollToLeft,
            getScrollToRight: getScrollToRight,
            showArrows: showArrows,
            children: /*#__PURE__*/ _jsxs("div", {
                className: "vkuiCardScroll__in",
                ref: refContainer,
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: "vkuiCardScroll__gap",
                        ref: gapRef
                    }),
                    children,
                    /*#__PURE__*/ _jsx("span", {
                        className: "vkuiCardScroll__gap"
                    })
                ]
            })
        })
    }));
};

//# sourceMappingURL=CardScroll.js.map