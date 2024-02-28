import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { DefaultIcon } from "../PopperArrow/DefaultIcon";
import { PopperArrow } from "../PopperArrow/PopperArrow";
import { RootComponent } from "../RootComponent/RootComponent";
import { Subhead } from "../Typography/Subhead/Subhead";
export var TOOLTIP_MAX_WIDTH = 220;
var stylesAppearance = {
    accent: "vkuiTooltipBase--appearance-accent",
    white: "vkuiTooltipBase--appearance-white",
    black: "vkuiTooltipBase--appearance-black",
    inversion: "vkuiTooltipBase--appearance-inversion"
};
/**
 * Низкоуровневый компонент для отрисовки тултипа.
 * Примеры использования и Readme можно найти в документации Tooltip
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export var TooltipBase = function(_param) {
    var _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_withArrow = _param.withArrow, withArrow = _param_withArrow === void 0 ? true : _param_withArrow, arrowCoords = _param.arrowCoords, _param_arrowPlacement = _param.arrowPlacement, arrowPlacement = _param_arrowPlacement === void 0 ? "top" : _param_arrowPlacement, getArrowRef = _param.getArrowRef, getRootRef = _param.getRootRef, floatingStyle = _param.floatingStyle, _param_ArrowIcon = _param.ArrowIcon, ArrowIcon = _param_ArrowIcon === void 0 ? DefaultIcon : _param_ArrowIcon, text = _param.text, header = _param.header, _param_maxWidth = _param.maxWidth, maxWidth = _param_maxWidth === void 0 ? TOOLTIP_MAX_WIDTH : _param_maxWidth, restProps = _object_without_properties(_param, [
        "appearance",
        "withArrow",
        "arrowCoords",
        "arrowPlacement",
        "getArrowRef",
        "getRootRef",
        "floatingStyle",
        "ArrowIcon",
        "text",
        "header",
        "maxWidth"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiTooltipBase", appearance !== "neutral" && stylesAppearance[appearance])
    }), /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        style: floatingStyle
    }, withArrow && /*#__PURE__*/ React.createElement(PopperArrow, {
        coords: arrowCoords,
        placement: arrowPlacement,
        arrowClassName: "vkuiTooltipBase__arrow",
        getRootRef: getArrowRef,
        Icon: ArrowIcon
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTooltipBase__content",
        style: maxWidth !== null ? {
            maxWidth: maxWidth
        } : undefined
    }, header && /*#__PURE__*/ React.createElement(Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ React.createElement(Subhead, null, text))));
};

//# sourceMappingURL=TooltipBase.js.map