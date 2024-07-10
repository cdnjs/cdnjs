import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DefaultIcon } from './DefaultIcon';
import styles from './FloatingArrow.module.css';
const placementClassNames = {
    right: styles['FloatingArrow--placement-right'],
    bottom: styles['FloatingArrow--placement-bottom'],
    left: styles['FloatingArrow--placement-left']
};
/**
 * @private
 */ export const FloatingArrow = ({ offset, isStaticOffset, coords, iconStyle, iconClassName, placement = 'bottom', getRootRef, Icon = DefaultIcon, ...restProps })=>{
    const [arrowPlacement, arrowStyles] = getArrowPositionData(placement, coords, offset, isStaticOffset);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: arrowStyles,
        className: classNames(styles['FloatingArrow'], arrowPlacement && placementClassNames[arrowPlacement]),
        ...restProps,
        children: /*#__PURE__*/ _jsx(Icon, {
            className: classNames(styles['FloatingArrow__in'], iconClassName),
            style: iconStyle
        })
    });
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