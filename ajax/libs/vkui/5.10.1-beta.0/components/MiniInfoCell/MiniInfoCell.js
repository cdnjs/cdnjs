import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Chevron } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
import { Tappable } from "../Tappable/Tappable";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
var stylesMode = {
    add: "vkuiMiniInfoCell--mode-add",
    accent: "vkuiMiniInfoCell--mode-accent",
    more: "vkuiMiniInfoCell--mode-more"
};
var stylesTextWrap = {
    nowrap: "vkuiMiniInfoCell--textWrap-nowrap",
    full: "vkuiMiniInfoCell--textWrap-full",
    short: "vkuiMiniInfoCell--textWrap-short"
};
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */ export var MiniInfoCell = function(_param) {
    var before = _param.before, after = _param.after, children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "base" : _param_mode, _param_textWrap = _param.textWrap, textWrap = _param_textWrap === void 0 ? "nowrap" : _param_textWrap, _param_expandable = _param.expandable, expandable = _param_expandable === void 0 ? false : _param_expandable, className = _param.className, restProps = _object_without_properties(_param, [
        "before",
        "after",
        "children",
        "mode",
        "textWrap",
        "expandable",
        "className"
    ]);
    var cellClasses = classNames("vkuiMiniInfoCell", stylesTextWrap[textWrap], mode !== "base" && stylesMode[mode], className);
    var cellContent = /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(before) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiMiniInfoCell__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiMiniInfoCell__middle"
    }, /*#__PURE__*/ React.createElement(Paragraph, {
        className: "vkuiMiniInfoCell__content",
        weight: mode === "more" ? "2" : undefined
    }, children), expandable && /*#__PURE__*/ React.createElement(Icon16Chevron, null)), hasReactNode(after) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiMiniInfoCell__after"
    }, after));
    return restProps.onClick ? /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        Component: "div",
        role: "button"
    }, restProps), {
        className: cellClasses
    }), cellContent) : /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: cellClasses
    }), cellContent);
};

//# sourceMappingURL=MiniInfoCell.js.map