import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useIsomorphicLayoutEffect } from '../../../lib/useIsomorphicLayoutEffect';
/** Компонент ограничивает текстовый контент убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/EllipsisText
 */ const EllipsisText = (_param)=>{
    var { className, getRootRef, children, maxWidth, maxLines = 1 } = _param, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "children",
        "maxWidth",
        "maxLines"
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
    return /*#__PURE__*/ _jsx("span", _object_spread_props(_object_spread({
        ref: getRootRef,
        className: classNames("vkuiEllipsisText", className)
    }, restProps), {
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                maxWidth
            },
            ref: contentRef,
            className: classNames("vkuiEllipsisText__content", maxLines > 1 && "vkuiEllipsisText__content--multiline"),
            children: children
        })
    }));
};
export { EllipsisText };

//# sourceMappingURL=EllipsisText.js.map