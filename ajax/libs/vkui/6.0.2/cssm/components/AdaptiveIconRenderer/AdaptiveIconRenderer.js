import * as React from 'react';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
/**
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/AdaptiveIconRenderer
 */ export const AdaptiveIconRenderer = ({ IconCompact, IconRegular })=>{
    const { sizeY } = useAdaptivityConditionalRender();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/ React.createElement(IconCompact, {
        className: sizeY.compact.className
    }), sizeY.regular && /*#__PURE__*/ React.createElement(IconRegular, {
        className: sizeY.regular.className
    }));
};

//# sourceMappingURL=AdaptiveIconRenderer.js.map