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
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        style: arrowStyles,
        className: classNames(styles['FloatingArrow'], arrowPlacement && placementClassNames[arrowPlacement]),
        ...restProps
    }, /*#__PURE__*/ React.createElement(Icon, {
        className: classNames(styles['FloatingArrow__in'], iconClassName),
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