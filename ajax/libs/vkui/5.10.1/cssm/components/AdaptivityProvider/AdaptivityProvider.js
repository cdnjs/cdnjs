import * as React from 'react';
import { hasMouse as _hasPointer } from '@vkontakte/vkjs';
import { useBridgeAdaptivity } from '../../hooks/useBridgeAdaptivity';
import { BREAKPOINTS, getSizeX, isCompactByViewHeight, isCompactByViewWidth, SizeType, ViewHeight, ViewWidth } from '../../lib/adaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { AdaptivityContext } from './AdaptivityContext';
const warn = warnOnce('AdaptivityProvider');
/**
 * @see https://vkcom.github.io/VKUI/#/AdaptivityProvider
 */ export const AdaptivityProvider = ({ viewWidth, viewHeight, sizeX, sizeY, hasPointer, hasHover, children })=>{
    // TODO [>=6]: удалить использование хука (#5049)
    /* eslint-disable @typescript-eslint/naming-convention */ const LEGACY_isPerhapsPropsByBridgeTypeAdaptive = viewWidth !== undefined && viewHeight !== undefined;
    const LEGACY_isPerhapsPropsByBridgeTypeForceMobile = viewWidth !== undefined && sizeX !== undefined && sizeY !== undefined;
    const LEGACY_disableInternalUseBridgeAdaptivity = LEGACY_isPerhapsPropsByBridgeTypeAdaptive || LEGACY_isPerhapsPropsByBridgeTypeForceMobile;
    const LEGACY_bridge = useBridgeAdaptivity(LEGACY_disableInternalUseBridgeAdaptivity);
    /* eslint-enable @typescript-eslint/naming-convention */ if (process.env.NODE_ENV === 'development') {
        // TODO [>=6]: удалить warn
        if (!LEGACY_disableInternalUseBridgeAdaptivity) {
            warn("[@vkontakte/vk-bridge] Интеграция VKUI с @vkontakte/vk-bridge устарела и будет удалена в v6. Используйте хук `useAdaptivity()` из @vkontakte/vk-bridge-react и результат передайте в компонент (см. https://github.com/VKCOM/VKUI/issues/5049)"); // prettier-ignore
        }
    }
    const adaptivity = React.useMemo(()=>calculateAdaptivity({
            viewWidth,
            viewHeight,
            sizeX,
            sizeY,
            hasPointer,
            hasHover
        }, LEGACY_bridge), [
        viewWidth,
        viewHeight,
        sizeX,
        sizeY,
        hasPointer,
        hasHover,
        LEGACY_bridge
    ]);
    return /*#__PURE__*/ React.createElement(AdaptivityContext.Provider, {
        value: adaptivity
    }, children);
};
function calculateAdaptivity({ viewWidth, viewHeight, sizeX, sizeY, hasPointer, hasHover }, LEGACY_bridge) {
    // TODO [>=6]: удалить блок кода c использованием LEGACY_bridge (#5049)
    //  https://github.com/VKCOM/VKUI/blob/v5.5.5/packages/vkui/src/components/AdaptivityProvider/AdaptivityProvider.tsx#L46-L92
    if (LEGACY_bridge.type === 'adaptive') {
        const { viewportWidth, viewportHeight } = LEGACY_bridge;
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
    } else if (LEGACY_bridge.type === 'force_mobile' || LEGACY_bridge.type === 'force_mobile_compact') {
        viewWidth = ViewWidth.MOBILE;
        sizeX = SizeType.COMPACT;
        if (LEGACY_bridge.type === 'force_mobile_compact') {
            sizeY = SizeType.COMPACT;
        } else {
            sizeY = SizeType.REGULAR;
        }
    } else {
        if (sizeX === undefined && viewWidth !== undefined) {
            sizeX = getSizeX(viewWidth);
        }
        if (sizeY === undefined) {
            if (isCompactByViewWidth(viewWidth, hasPointer) || isCompactByViewHeight(viewHeight)) {
                sizeY = SizeType.COMPACT;
            } else if (viewWidth !== undefined || viewHeight !== undefined) {
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