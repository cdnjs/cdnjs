import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DefaultIcon } from './DefaultIcon';
import styles from './PopperArrow.module.css';
const placementClassNames = {
    right: styles['PopperArrow--placement-right'],
    bottom: styles['PopperArrow--placement-bottom'],
    left: styles['PopperArrow--placement-left']
};
export const PopperArrow = ({ coords, arrowClassName, placement, getRootRef, Icon = DefaultIcon })=>{
    const [arrowPlacement, arrowStyles] = getArrowPositionData(placement, coords);
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        style: arrowStyles,
        className: classNames(styles['PopperArrow'], arrowPlacement && placementClassNames[arrowPlacement])
    }, /*#__PURE__*/ React.createElement(Icon, {
        className: classNames(styles['PopperArrow__in'], arrowClassName)
    }));
};
function getArrowPositionData(placement, coords = {
    x: 0,
    y: 0
}) {
    if (placement.startsWith('top')) {
        return [
            'bottom',
            {
                top: '100%',
                left: coords.x
            }
        ];
    } else if (placement.startsWith('right')) {
        return [
            'left',
            {
                top: coords.y,
                left: 0
            }
        ];
    } else if (placement.startsWith('bottom')) {
        return [
            undefined,
            {
                bottom: '100%',
                left: coords.x
            }
        ];
    } else {
        return [
            'right',
            {
                top: coords.y,
                right: 0
            }
        ];
    }
}

//# sourceMappingURL=PopperArrow.js.map