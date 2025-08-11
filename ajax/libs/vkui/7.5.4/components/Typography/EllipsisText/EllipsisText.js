'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { classNames } from "@vkontakte/vkjs";
import { getTextFromChildren } from "../../../lib/children.js";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
/** Компонент ограничивает текстовый контент, убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkui.io/components/ellipsis-text
 */ const EllipsisText = (_param)=>{
    var { Component = 'span', className, children, maxWidth, maxLines = 1, disableNativeTitle = false } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "className",
        "children",
        "maxWidth",
        "maxLines",
        "disableNativeTitle"
    ]);
    const contentRef = useRef(null);
    useIsomorphicLayoutEffect(()=>{
        if (contentRef && contentRef.current) {
            contentRef.current.style.setProperty('-webkit-line-clamp', maxLines > 1 ? `${maxLines}` : '');
        }
    }, [
        contentRef,
        maxLines
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: Component,
        className: classNames("vkuiEllipsisText__host", disableNativeTitle && "vkuiEllipsisText__disableNativeTitle", className),
        title: disableNativeTitle ? undefined : getTextFromChildren(children)
    }, restProps), {
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                maxWidth
            },
            ref: contentRef,
            className: classNames("vkuiEllipsisText__content", maxLines > 1 && "vkuiEllipsisText__contentMultiline"),
            children: children
        })
    }));
};
export { EllipsisText };

//# sourceMappingURL=EllipsisText.js.map