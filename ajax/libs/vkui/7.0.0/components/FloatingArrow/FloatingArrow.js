import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { DefaultIcon } from "./DefaultIcon.js";
export const placementClassNames = {
    right: "vkuiFloatingArrow__placementRight",
    bottom: "vkuiFloatingArrow__placementBottom",
    left: "vkuiFloatingArrow__placementLeft"
};
/**
 * Иконка-стрелка для всплывающих окон.
 *
 * @since 7.0.0
 */ export const FloatingArrow = (_param)=>{
    var { offset, isStaticOffset, coords, iconStyle, iconClassName, placement = 'bottom', Icon = DefaultIcon } = _param, restProps = _object_without_properties(_param, [
        "offset",
        "isStaticOffset",
        "coords",
        "iconStyle",
        "iconClassName",
        "placement",
        "Icon"
    ]);
    const [arrowPlacement, arrowStyles] = getArrowPositionData(placement, coords, offset, isStaticOffset);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseStyle: arrowStyles,
        baseClassName: classNames("vkuiFloatingArrow__host", arrowPlacement && placementClassNames[arrowPlacement])
    }, restProps), {
        children: /*#__PURE__*/ _jsx(Icon, {
            className: classNames("vkuiFloatingArrow__in", iconClassName),
            style: iconStyle
        })
    }));
};
function getArrowPositionData(placement, coords = {
    x: 0,
    y: 0
}, offset = 0, isStaticOffset = false) {
    const withOffset = (isVerticalPlacement)=>{
        const parsedCoords = {
            x: coords.x || 0,
            y: coords.y || 0
        };
        if (isVerticalPlacement) {
            return isStaticOffset ? offset : parsedCoords.y + offset;
        } else {
            return isStaticOffset ? offset : parsedCoords.x + offset;
        }
    };
    if (placement.startsWith('top')) {
        const xOffsetProp = getXOffsetProp(placement, isStaticOffset);
        return [
            'bottom',
            {
                top: '100%',
                [xOffsetProp]: withOffset(false)
            }
        ];
    } else if (placement.startsWith('right')) {
        const yOffsetProp = getYOffsetProp(placement, isStaticOffset);
        return [
            'left',
            {
                [yOffsetProp]: withOffset(true),
                left: 0
            }
        ];
    } else if (placement.startsWith('bottom')) {
        const xOffsetProp = getXOffsetProp(placement, isStaticOffset);
        return [
            undefined,
            {
                bottom: '100%',
                [xOffsetProp]: withOffset(false)
            }
        ];
    } else {
        const yOffsetProp = getYOffsetProp(placement, isStaticOffset);
        return [
            'right',
            {
                [yOffsetProp]: withOffset(true),
                right: 0
            }
        ];
    }
}
function getXOffsetProp(placement, isStaticOffset) {
    return placement.endsWith('end') && isStaticOffset ? 'right' : 'left';
}
function getYOffsetProp(placement, isStaticOffset) {
    return placement.endsWith('end') && isStaticOffset ? 'bottom' : 'top';
}

//# sourceMappingURL=FloatingArrow.js.map