import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { DefaultIcon } from '../FloatingArrow/DefaultIcon';
import { FloatingArrow } from '../FloatingArrow/FloatingArrow';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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
    var { appearance = 'accent', arrowProps, ArrowIcon = DefaultIcon, text, header, maxWidth = TOOLTIP_MAX_WIDTH, closeIconLabel = 'Закрыть', onCloseIconClick, className } = _param, restProps = _object_without_properties(_param, [
        "appearance",
        "arrowProps",
        "ArrowIcon",
        "text",
        "header",
        "maxWidth",
        "closeIconLabel",
        "onCloseIconClick",
        "className"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiTooltipBase", appearance !== 'neutral' && stylesAppearance[appearance], className),
        role: "tooltip",
        children: [
            arrowProps && /*#__PURE__*/ _jsx(FloatingArrow, _object_spread_props(_object_spread({}, arrowProps), {
                iconClassName: classNames("vkuiTooltipBase__arrow", arrowProps.iconClassName),
                Icon: ArrowIcon
            })),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiTooltipBase__content",
                style: maxWidth !== null ? {
                    maxWidth
                } : undefined,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        children: [
                            hasReactNode(header) && /*#__PURE__*/ _jsx(Subhead, {
                                weight: "2",
                                children: header
                            }),
                            hasReactNode(text) && /*#__PURE__*/ _jsx(Subhead, {
                                children: text
                            })
                        ]
                    }),
                    typeof onCloseIconClick === 'function' && /*#__PURE__*/ _jsxs(Tappable, {
                        Component: "button",
                        className: "vkuiTooltipBase__closeButton",
                        hoverMode: "opacity",
                        activeMode: "opacity",
                        onClick: onCloseIconClick,
                        children: [
                            /*#__PURE__*/ _jsx(VisuallyHidden, {
                                children: closeIconLabel
                            }),
                            /*#__PURE__*/ _jsx(Icon16Cancel, {
                                display: "block"
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=TooltipBase.js.map