import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Done } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiCustomSelectOption--sizeY-none",
    ['regular']: "vkuiCustomSelectOption--sizeY-regular"
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
    return /*#__PURE__*/ React.createElement(Paragraph, _object_spread_props(_object_spread({}, restProps), {
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        "aria-disabled": disabled,
        "aria-selected": selected,
        "data-hovered": hovered,
        className: classNames("vkuiCustomSelectOption", sizeY !== 'compact' && sizeYClassNames[sizeY], hovered && "vkuiCustomSelectOption--hover", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
        style: style
    }), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__main"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__children"
    }, children), hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiCustomSelectOption__description"
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, " "), description)), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__after"
    }, hasReactNode(after) && /*#__PURE__*/ React.createElement("div", null, after), selected && /*#__PURE__*/ React.createElement(Icon16Done, {
        className: "vkuiCustomSelectOption__selectedIcon"
    })));
};

//# sourceMappingURL=CustomSelectOption.js.map