import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Dropdown } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { Tappable } from "../Tappable/Tappable";
import { Caption } from "../Typography/Caption/Caption";
import { Subhead } from "../Typography/Subhead/Subhead";
var appearanceStyles = {
    accent: "vkuiSubnavigationButton--appearance-accent",
    neutral: "vkuiSubnavigationButton--appearance-neutral"
};
var modeStyles = {
    primary: "vkuiSubnavigationButton--mode-primary",
    outline: "vkuiSubnavigationButton--mode-outline",
    tertiary: "vkuiSubnavigationButton--mode-tertiary"
};
var sizeStyles = {
    s: "vkuiSubnavigationButton--size-s",
    m: "vkuiSubnavigationButton--size-m",
    l: "vkuiSubnavigationButton--size-l"
};
var sizeYClassNames = _define_property({
    none: "vkuiSubnavigationButton--sizeY-none"
}, SizeType.COMPACT, "vkuiSubnavigationButton--sizeY-compact");
var SubnavigationButtonTypography = function(_param) {
    var textLevel = _param.textLevel, restProps = _object_without_properties(_param, [
        "textLevel"
    ]);
    if (textLevel === "1") {
        return /*#__PURE__*/ React.createElement(Subhead, restProps);
    }
    return /*#__PURE__*/ React.createElement(Caption, _object_spread({
        level: textLevel === "2" ? "1" : "2"
    }, restProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */ export var SubnavigationButton = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, selected = _param.selected, _param_textLevel = _param.textLevel, textLevel = _param_textLevel === void 0 ? "1" : _param_textLevel, before = _param.before, after = _param.after, expandable = _param.expandable, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
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
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        className: classNames("vkuiSubnavigationButton", sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && "vkuiSubnavigationButton--selected", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className)
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