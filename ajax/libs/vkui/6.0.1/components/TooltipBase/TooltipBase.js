import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DefaultIcon } from '../FloatingArrow/DefaultIcon';
import { FloatingArrow } from '../FloatingArrow/FloatingArrow';
import { RootComponent } from '../RootComponent/RootComponent';
import { Subhead } from '../Typography/Subhead/Subhead';
export const TOOLTIP_MAX_WIDTH = 220;
const stylesAppearance = {
    accent: "vkuiTooltipBase--appearance-accent",
    white: "vkuiTooltipBase--appearance-white",
    black: "vkuiTooltipBase--appearance-black",
    inversion: "vkuiTooltipBase--appearance-inversion"
};
/**
 * Низкоуровневый компонент для отрисовки тултипа.
 * Примеры использования и Readme можно найти в документации Tooltip
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 * @private
 */ export const TooltipBase = (_param)=>{
    var { appearance = 'accent', arrowProps, ArrowIcon = DefaultIcon, text, header, maxWidth = TOOLTIP_MAX_WIDTH, className } = _param, restProps = _object_without_properties(_param, [
        "appearance",
        "arrowProps",
        "ArrowIcon",
        "text",
        "header",
        "maxWidth",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiTooltipBase", appearance !== 'neutral' && stylesAppearance[appearance], className),
        role: "tooltip"
    }), arrowProps && /*#__PURE__*/ React.createElement(FloatingArrow, _object_spread_props(_object_spread({}, arrowProps), {
        iconClassName: classNames("vkuiTooltipBase__arrow", arrowProps.iconClassName),
        Icon: ArrowIcon
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTooltipBase__content",
        style: maxWidth !== null ? {
            maxWidth
        } : undefined
    }, header && /*#__PURE__*/ React.createElement(Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ React.createElement(Subhead, null, text)));
};

//# sourceMappingURL=TooltipBase.js.map