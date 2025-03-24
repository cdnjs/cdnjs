'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { Footnote } from "../../Typography/Footnote/Footnote.js";
import { Text } from "../../Typography/Text/Text.js";
const sizeYClassNames = {
    none: "SelectionControlLabel__sizeYNone--iXFZz",
    compact: "SelectionControlLabel__sizeYCompact--3jCmI"
};
export function SelectionControlLabel(_param) {
    var { children, titleAfter, description } = _param, restProps = _object_without_properties(_param, [
        "children",
        "titleAfter",
        "description"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        baseClassName: classNames("SelectionControlLabel__host--iewR-", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "SelectionControlLabel__titleLayout--poiMY",
                children: [
                    /*#__PURE__*/ _jsx(Text, {
                        className: "SelectionControlLabel__title--Y1GII",
                        children: children
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "SelectionControlLabel__titleAfter--PIN61",
                        children: titleAfter
                    })
                ]
            }),
            hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                className: "SelectionControlLabel__description--s6Rcb",
                children: description
            })
        ]
    }));
}

//# sourceMappingURL=SelectionControlLabel.js.map