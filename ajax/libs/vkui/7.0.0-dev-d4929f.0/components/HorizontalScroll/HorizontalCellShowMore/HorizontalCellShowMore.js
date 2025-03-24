import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon28ChevronRightCircle } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../../Tappable/Tappable.js";
import { Subhead } from "../../Typography/Subhead/Subhead.js";
const sizeClassNames = {
    s: "HorizontalCellShowMore__sizeS--Y639T",
    m: "HorizontalCellShowMore__sizeM--37Lf-"
};
export const HorizontalCellShowMore = (_param)=>{
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
        className: classNames("HorizontalCellShowMore__host--kLrAV", centered && "HorizontalCellShowMore__centered--8kBSA", sizeClassNames[size], className),
        ref: getRootRef,
        children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
            style: size === 's' ? undefined : {
                height
            },
            className: "HorizontalCellShowMore__body--6X1oj",
            getRootRef: getRef,
            activeMode: "opacity",
            hoverMode: "opacity"
        }, restProps), {
            children: [
                /*#__PURE__*/ _jsx(Icon28ChevronRightCircle, {
                    className: "HorizontalCellShowMore__icon--hahfz",
                    fill: "currentColor"
                }),
                /*#__PURE__*/ _jsx(Subhead, {
                    className: "HorizontalCellShowMore__text--UDdw1",
                    weight: "2",
                    children: children
                })
            ]
        }))
    });
};

//# sourceMappingURL=HorizontalCellShowMore.js.map