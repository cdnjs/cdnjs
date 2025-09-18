'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { classNames } from "@vkontakte/vkjs";
import { getTextFromChildren } from "../../../lib/children.js";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import styles from "./EllipsisText.module.css";
/** Компонент ограничивает текстовый контент, убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/EllipsisText
 */ const EllipsisText = ({ Component = 'span', className, children, maxWidth, maxLines = 1, disableNativeTitle = false, ...restProps })=>{
    const contentRef = useRef(null);
    useIsomorphicLayoutEffect(()=>{
        if (contentRef && contentRef.current) {
            contentRef.current.style.setProperty('-webkit-line-clamp', maxLines > 1 ? `${maxLines}` : '');
        }
    }, [
        contentRef,
        maxLines
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, {
        Component: Component,
        className: classNames(styles.host, disableNativeTitle && styles.disableNativeTitle, className),
        title: disableNativeTitle ? undefined : getTextFromChildren(children),
        ...restProps,
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                maxWidth
            },
            ref: contentRef,
            className: classNames(styles.content, maxLines > 1 && styles.contentMultiline),
            children: children
        })
    });
};
export { EllipsisText };

//# sourceMappingURL=EllipsisText.js.map