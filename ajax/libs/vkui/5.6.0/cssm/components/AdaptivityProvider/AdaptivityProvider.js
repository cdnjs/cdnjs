import * as React from 'react';
import { hasMouse as _hasPointer } from '@vkontakte/vkjs';
import { useBridgeAdaptivity } from '../../hooks/useBridgeAdaptivity';
import { BREAKPOINTS, SizeType, ViewHeight, ViewWidth } from '../../lib/adaptivity';
import { AdaptivityContext } from './AdaptivityContext';
/**
 * @see https://vkcom.github.io/VKUI/#/AdaptivityProvider
 */ export const AdaptivityProvider = ({ viewWidth, viewHeight, sizeX, sizeY, hasPointer, hasHover, children })=>{
    const bridge = useBridgeAdaptivity();
    const adaptivity = React.useMemo(()=>calculateAdaptivity({
            viewWidth,
            viewHeight,
            sizeX,
            sizeY,
            hasPointer,
            hasHover
        }, bridge), [
        viewWidth,
        viewHeight,
        sizeX,
        sizeY,
        hasPointer,
        hasHover,
        bridge
    ]);
    return /*#__PURE__*/ React.createElement(AdaptivityContext.Provider, {
        value: adaptivity
    }, children);
};
function calculateAdaptivity({ viewWidth, viewHeight, sizeX, sizeY, hasPointer, hasHover }, bridge) {
    if (bridge.type === 'adaptive') {
        const { viewportWidth, viewportHeight } = bridge;
        if (viewportWidth >= BREAKPOINTS.DESKTOP) {
            viewWidth = ViewWidth.DESKTOP;
        } else if (viewportWidth >= BREAKPOINTS.TABLET) {
            viewWidth = ViewWidth.TABLET;
        } else if (viewportWidth >= BREAKPOINTS.SMALL_TABLET) {
            viewWidth = ViewWidth.SMALL_TABLET;
        } else if (viewportWidth >= BREAKPOINTS.MOBILE) {
            viewWidth = ViewWidth.MOBILE;
        } else {
            viewWidth = ViewWidth.SMALL_MOBILE;
        }
        if (viewportHeight >= BREAKPOINTS.MEDIUM_HEIGHT) {
            viewHeight = ViewHeight.MEDIUM;
        } else if (viewportHeight >= BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT) {
            viewHeight = ViewHeight.SMALL;
        } else {
            viewHeight = ViewHeight.EXTRA_SMALL;
        }
        if (viewWidth <= ViewWidth.MOBILE) {
            sizeX = SizeType.COMPACT;
        } else {
            sizeX = SizeType.REGULAR;
        }
        if (viewWidth >= ViewWidth.SMALL_TABLET && _hasPointer || viewHeight <= ViewHeight.EXTRA_SMALL) {
            sizeY = SizeType.COMPACT;
        } else {
            sizeY = SizeType.REGULAR;
        }
    } else if (bridge.type === 'force_mobile' || bridge.type === 'force_mobile_compact') {
        viewWidth = ViewWidth.MOBILE;
        sizeX = SizeType.COMPACT;
        if (bridge.type === 'force_mobile_compact') {
            sizeY = SizeType.COMPACT;
        } else {
            sizeY = SizeType.REGULAR;
        }
    } else {
        if (sizeX === undefined && viewWidth !== undefined) {
            if (viewWidth <= ViewWidth.MOBILE) {
                sizeX = SizeType.COMPACT;
            } else {
                sizeX = SizeType.REGULAR;
            }
        }
        if (sizeY === undefined && viewWidth !== undefined && viewHeight !== undefined) {
            if (viewWidth >= ViewWidth.SMALL_TABLET && _hasPointer || viewHeight <= ViewHeight.EXTRA_SMALL) {
                sizeY = SizeType.COMPACT;
            } else {
                sizeY = SizeType.REGULAR;
            }
        }
    }
    return {
        viewWidth,
        viewHeight,
        sizeX,
        sizeY,
        hasPointer,
        hasHover
    };
}

//# sourceMappingURL=AdaptivityProvider.js.map