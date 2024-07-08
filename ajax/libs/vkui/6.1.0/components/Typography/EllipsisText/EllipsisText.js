import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
/** Компонент ограничивает текстовый контент убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/EllipsisText
 */ const EllipsisText = (_param)=>{
    var { className, getRootRef, children, maxWidth } = _param, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "children",
        "maxWidth"
    ]);
    return /*#__PURE__*/ _jsx("span", _object_spread_props(_object_spread({
        ref: getRootRef,
        className: classNames("vkuiEllipsisText", className)
    }, restProps), {
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                maxWidth
            },
            className: "vkuiEllipsisText__content",
            children: children
        })
    }));
};
export { EllipsisText };

//# sourceMappingURL=EllipsisText.js.map