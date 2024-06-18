import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DefaultIcon } from './DefaultIcon';
const placementClassNames = {
    right: "vkuiFloatingArrow--placement-right",
    bottom: "vkuiFloatingArrow--placement-bottom",
    left: "vkuiFloatingArrow--placement-left"
};
/**
 * @private
 */ export const FloatingArrow = (_param)=>{
    var { offset, isStaticOffset, coords, iconStyle, iconClassName, placement = 'bottom', getRootRef, Icon = DefaultIcon } = _param, restProps = _object_without_properties(_param, [
        "offset",
        "isStaticOffset",
        "coords",
        "iconStyle",
        "iconClassName",
        "placement",
        "getRootRef",
        "Icon"
    ]);
    const [arrowPlacement, arrowStyles] = getArrowPositionData(placement, coords, offset, isStaticOffset);
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        ref: getRootRef,
        style: arrowStyles,
        className: classNames("vkuiFloatingArrow", arrowPlacement && placementClassNames[arrowPlacement])
    }, restProps), /*#__PURE__*/ React.createElement(Icon, {
        className: classNames("vkuiFloatingArrow__in", iconClassName),
        style: iconStyle
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
        return [
            'bottom',
            {
                top: '100%',
                left: withOffset(false)
            }
        ];
    } else if (placement.startsWith('right')) {
        return [
            'left',
            {
                top: withOffset(true),
                left: 0
            }
        ];
    } else if (placement.startsWith('bottom')) {
        return [
            undefined,
            {
                bottom: '100%',
                left: withOffset(false)
            }
        ];
    } else {
        return [
            'right',
            {
                top: withOffset(true),
                right: 0
            }
        ];
    }
}

//# sourceMappingURL=FloatingArrow.js.map