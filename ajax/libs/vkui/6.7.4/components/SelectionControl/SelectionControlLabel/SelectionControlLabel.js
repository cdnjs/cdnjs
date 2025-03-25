import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { RootComponent } from '../../RootComponent/RootComponent';
import { Footnote } from '../../Typography/Footnote/Footnote';
import { Text } from '../../Typography/Text/Text';
const sizeYClassNames = {
    none: "vkuiSelectionControlLabel--sizeY-none",
    compact: "vkuiSelectionControlLabel--sizeY-compact"
};
export function SelectionControlLabel(_param) {
    var { children, titleAfter, description } = _param, restProps = _object_without_properties(_param, [
        "children",
        "titleAfter",
        "description"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        baseClassName: classNames("vkuiSelectionControlLabel", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiSelectionControlLabel__titleLayout",
                children: [
                    /*#__PURE__*/ _jsx(Text, {
                        className: "vkuiSelectionControlLabel__title",
                        children: children
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "vkuiSelectionControlLabel__titleAfter",
                        children: titleAfter
                    })
                ]
            }),
            hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                className: "vkuiSelectionControlLabel__description",
                children: description
            })
        ]
    }));
}

//# sourceMappingURL=SelectionControlLabel.js.map