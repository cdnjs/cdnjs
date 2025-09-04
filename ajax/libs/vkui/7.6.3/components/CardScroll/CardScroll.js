'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useDOM } from "../../lib/dom.js";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesSize = {
    s: 'vkuiInternalCardScroll--size-s',
    m: 'vkuiInternalCardScroll--size-m',
    l: 'vkuiInternalCardScroll--size-l'
};
/**
 * @see https://vkui.io/components/card-scroll
 */ export const CardScroll = (_param)=>{
    var { children, size = 's', showArrows = true, padding = false, CardsListComponent = 'ul', prevButtonTestId, nextButtonTestId } = _param, restProps = _object_without_properties(_param, [
        "children",
        "size",
        "showArrows",
        "padding",
        "CardsListComponent",
        "prevButtonTestId",
        "nextButtonTestId"
    ]);
    const refContainer = React.useRef(null);
    const direction = useConfigDirection();
    const { window } = useDOM();
    const getPadding = (container)=>{
        return parseFloat(window.getComputedStyle(container).getPropertyValue('--vkui_internal--CardScroll_horizontal_padding'));
    };
    const slideOffsetFromStart = (slide)=>{
        var _refContainer_current;
        const containerWidth = ((_refContainer_current = refContainer.current) === null || _refContainer_current === void 0 ? void 0 : _refContainer_current.offsetWidth) || 0;
        return direction === 'rtl' ? containerWidth - slide.offsetLeft - slide.offsetWidth : slide.offsetLeft;
    };
    function getScrollToLeft(offset) {
        if (!refContainer.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const getMarginEnd = (el)=>{
            const computedStyles = window.getComputedStyle(el);
            return parseInt(computedStyles.marginInlineEnd) || (direction === 'rtl' ? parseInt(computedStyles.marginLeft) : parseInt(computedStyles.marginRight)) || 0;
        };
        const slideIndex = [
            ...refContainer.current.children
        ].findIndex((el)=>slideOffsetFromStart(el) + el.offsetWidth + getMarginEnd(el) - offset >= 0);
        if (slideIndex === -1) {
            return offset;
        }
        const slide = refContainer.current.children[slideIndex];
        const padding = getPadding(refContainer.current);
        const scrollTo = slideOffsetFromStart(slide) - (containerWidth - slide.offsetWidth) + padding;
        if (scrollTo <= 2 * padding) {
            return 0;
        }
        return scrollTo;
    }
    function getScrollToRight(offset) {
        if (!refContainer.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slide = Array.prototype.find.call(refContainer.current.children, (el)=>{
            return slideOffsetFromStart(el) + el.offsetWidth - offset > containerWidth;
        });
        if (!slide) {
            return offset;
        }
        const padding = getPadding(refContainer.current);
        return slideOffsetFromStart(slide) - padding;
    }
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiCardScroll__host", 'vkuiInternalCardScroll', size !== false && stylesSize[size], padding && "vkuiCardScroll__withPaddings"),
        children: /*#__PURE__*/ _jsx(HorizontalScroll, {
            getScrollToLeft: getScrollToLeft,
            getScrollToRight: getScrollToRight,
            showArrows: showArrows,
            prevButtonTestId: prevButtonTestId,
            nextButtonTestId: nextButtonTestId,
            ContentWrapperComponent: CardsListComponent,
            contentWrapperRef: refContainer,
            contentWrapperClassName: "vkuiCardScroll__in",
            children: children
        })
    }));
};

//# sourceMappingURL=CardScroll.js.map