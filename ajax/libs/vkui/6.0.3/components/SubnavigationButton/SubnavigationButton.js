import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Dropdown } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Subhead } from '../Typography/Subhead/Subhead';
const appearanceStyles = {
    accent: "vkuiSubnavigationButton--appearance-accent",
    neutral: "vkuiSubnavigationButton--appearance-neutral"
};
const modeStyles = {
    primary: "vkuiSubnavigationButton--mode-primary",
    outline: "vkuiSubnavigationButton--mode-outline",
    tertiary: "vkuiSubnavigationButton--mode-tertiary"
};
const sizeStyles = {
    s: "vkuiSubnavigationButton--size-s",
    m: "vkuiSubnavigationButton--size-m",
    l: "vkuiSubnavigationButton--size-l"
};
const sizeYClassNames = {
    none: "vkuiSubnavigationButton--sizeY-none",
    ['compact']: "vkuiSubnavigationButton--sizeY-compact"
};
const SubnavigationButtonTypography = (_param)=>{
    var { textLevel } = _param, restProps = _object_without_properties(_param, [
        "textLevel"
    ]);
    if (textLevel === '1') {
        return /*#__PURE__*/ React.createElement(Subhead, restProps);
    }
    return /*#__PURE__*/ React.createElement(Caption, _object_spread({
        level: textLevel === '2' ? '1' : '2'
    }, restProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */ export const SubnavigationButton = (_param)=>{
    var { mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, expandable, children, className } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "appearance",
        "size",
        "selected",
        "textLevel",
        "before",
        "after",
        "expandable",
        "children",
        "className"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        className: classNames("vkuiSubnavigationButton", sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && "vkuiSubnavigationButton--selected", sizeY !== 'regular' && sizeYClassNames[sizeY], className)
    }), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSubnavigationButton__in"
    }, before && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSubnavigationButton__before"
    }, before), /*#__PURE__*/ React.createElement(SubnavigationButtonTypography, {
        textLevel: textLevel,
        className: "vkuiSubnavigationButton__label",
        Component: "span"
    }, children), after && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSubnavigationButton__after"
    }, after), expandable && /*#__PURE__*/ React.createElement(Icon16Dropdown, {
        className: "vkuiSubnavigationButton__expandableIcon"
    })));
};

//# sourceMappingURL=SubnavigationButton.js.map