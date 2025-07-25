import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable.js";
/**
 * @see https://vkui.io/components/link
 */ export const Link = (_param)=>{
    var { before: beforeProp, after: afterProp, noUnderline, hasVisited, children } = _param, restProps = _object_without_properties(_param, [
        "before",
        "after",
        "noUnderline",
        "hasVisited",
        "children"
    ]);
    const before = beforeProp ? /*#__PURE__*/ _jsx("span", {
        className: "vkuiLink__before",
        children: beforeProp
    }) : null;
    const after = afterProp ? /*#__PURE__*/ _jsx("span", {
        className: "vkuiLink__after",
        children: afterProp
    }) : null;
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        activeMode: "opacity",
        hoverMode: "vkuiLink__hover",
        focusVisibleMode: "outside",
        DefaultComponent: "span"
    }, restProps), {
        baseClassName: classNames("vkuiLink__host", hasVisited && "vkuiLink__hasVisited", !noUnderline && "vkuiLink__withUnderline"),
        children: [
            before,
            children,
            after
        ]
    }));
};

//# sourceMappingURL=Link.js.map