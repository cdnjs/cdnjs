import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon28ChevronRightCircle } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../../Tappable/Tappable.js";
import { Subhead } from "../../Typography/Subhead/Subhead.js";
const sizeClassNames = {
    s: "vkuiHorizontalCellShowMore__sizeS",
    m: "vkuiHorizontalCellShowMore__sizeM"
};
/**
 * @see https://vkui.io/components/horizontal-scroll#horizontal-cell-show-more
 */ export const HorizontalCellShowMore = (_param)=>{
    var { className, style, getRef, getRootRef, height, size = 's', children = size === 's' ? 'Все' : 'Показать все', centered = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "getRef",
        "getRootRef",
        "height",
        "size",
        "children",
        "centered"
    ]);
    return /*#__PURE__*/ _jsx("div", {
        style: style,
        className: classNames("vkuiHorizontalCellShowMore__host", centered && "vkuiHorizontalCellShowMore__centered", sizeClassNames[size], className),
        ref: getRootRef,
        children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
            style: size === 's' ? undefined : {
                height
            },
            className: "vkuiHorizontalCellShowMore__body",
            getRootRef: getRef,
            activeMode: "opacity",
            hoverMode: "opacity"
        }, restProps), {
            children: [
                /*#__PURE__*/ _jsx(Icon28ChevronRightCircle, {
                    className: "vkuiHorizontalCellShowMore__icon"
                }),
                /*#__PURE__*/ _jsx(Subhead, {
                    className: "vkuiHorizontalCellShowMore__text",
                    weight: "2",
                    children: children
                })
            ]
        }))
    });
};

//# sourceMappingURL=HorizontalCellShowMore.js.map