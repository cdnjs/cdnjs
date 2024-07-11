import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { getSizeX, isCompactByViewHeight, isCompactByViewWidth } from '../../lib/adaptivity';
import { AdaptivityContext } from './AdaptivityContext';
/**
 * @see https://vkcom.github.io/VKUI/#/AdaptivityProvider
 */ export const AdaptivityProvider = ({ viewWidth, viewHeight, sizeX: sizeXProp, sizeY: sizeYProp, hasPointer, hasHover, children })=>{
    const adaptivity = React.useMemo(()=>{
        const nextProps = {
            viewWidth,
            viewHeight,
            sizeX: sizeXProp,
            sizeY: sizeYProp,
            hasPointer,
            hasHover
        };
        if (sizeXProp === undefined && viewWidth !== undefined) {
            nextProps.sizeX = getSizeX(viewWidth);
        }
        if (sizeYProp === undefined) {
            if (isCompactByViewWidth(viewWidth, hasPointer) || isCompactByViewHeight(viewHeight)) {
                nextProps.sizeY = 'compact';
            } else if (viewWidth !== undefined || viewHeight !== undefined) {
                nextProps.sizeY = 'regular';
            }
        }
        return nextProps;
    }, [
        viewWidth,
        viewHeight,
        sizeXProp,
        sizeYProp,
        hasPointer,
        hasHover
    ]);
    return /*#__PURE__*/ _jsx(AdaptivityContext.Provider, {
        value: adaptivity,
        children: children
    });
};

//# sourceMappingURL=AdaptivityProvider.js.map