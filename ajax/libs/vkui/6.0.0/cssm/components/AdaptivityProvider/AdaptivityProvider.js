import * as React from 'react';
import { hasMouse as _hasPointer } from '@vkontakte/vkjs';
import { ViewHeight, ViewWidth } from '../../lib/adaptivity';
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
            if (viewWidth <= ViewWidth.MOBILE) {
                nextProps.sizeX = 'compact';
            } else {
                nextProps.sizeX = 'regular';
            }
        }
        if (sizeYProp === undefined && viewWidth !== undefined && viewHeight !== undefined) {
            if (viewWidth >= ViewWidth.SMALL_TABLET && _hasPointer || viewHeight <= ViewHeight.EXTRA_SMALL) {
                nextProps.sizeY = 'compact';
            } else {
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
    return /*#__PURE__*/ React.createElement(AdaptivityContext.Provider, {
        value: adaptivity
    }, children);
};

//# sourceMappingURL=AdaptivityProvider.js.map