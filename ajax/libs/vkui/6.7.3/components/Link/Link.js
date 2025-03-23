import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */ export const Link = (_param)=>{
    var { hasVisited, children, className } = _param, restProps = _object_without_properties(_param, [
        "hasVisited",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        className: classNames("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
        hasHover: false,
        activeMode: "opacity",
        hoverMode: "none",
        focusVisibleMode: "outside",
        children: children
    }));
};

//# sourceMappingURL=Link.js.map