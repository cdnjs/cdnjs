import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Done } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiCustomSelectOption--sizeY-none",
    regular: "vkuiCustomSelectOption--sizeY-regular"
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */ export const CustomSelectOption = (_param)=>{
    var { children, hierarchy = 0, hovered: hoveredProp, selected, before, after, description, disabled, style: styleProp, className, onClick } = _param, restProps = _object_without_properties(_param, [
        "children",
        "hierarchy",
        "hovered",
        "selected",
        "before",
        "after",
        "description",
        "disabled",
        "style",
        "className",
        "onClick"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const style = React.useMemo(()=>hierarchy > 0 ? _object_spread({
            '--vkui_internal--custom_select_option_hierarchy_level': hierarchy
        }, styleProp) : styleProp, [
        hierarchy,
        styleProp
    ]);
    const hovered = hoveredProp && !disabled ? true : false;
    return /*#__PURE__*/ _jsxs(Paragraph, _object_spread_props(_object_spread({}, restProps), {
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        "aria-disabled": disabled,
        "aria-selected": selected,
        "data-hovered": hovered,
        className: classNames("vkuiCustomSelectOption", sizeY !== 'compact' && sizeYClassNames[sizeY], hovered && "vkuiCustomSelectOption--hover", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
        style: style,
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: "vkuiCustomSelectOption__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiCustomSelectOption__main",
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "vkuiCustomSelectOption__children",
                        children: children
                    }),
                    hasReactNode(description) && /*#__PURE__*/ _jsxs(Footnote, {
                        className: "vkuiCustomSelectOption__description",
                        children: [
                            /*#__PURE__*/ _jsx(VisuallyHidden, {
                                children: " "
                            }),
                            description
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiCustomSelectOption__after",
                children: [
                    hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                        children: after
                    }),
                    selected && /*#__PURE__*/ _jsx(Icon16Done, {
                        className: "vkuiCustomSelectOption__selectedIcon"
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=CustomSelectOption.js.map