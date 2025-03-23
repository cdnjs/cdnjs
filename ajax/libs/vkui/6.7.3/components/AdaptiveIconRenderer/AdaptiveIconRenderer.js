import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
/**
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/AdaptiveIconRenderer
 */ export const AdaptiveIconRenderer = ({ IconCompact, IconRegular })=>{
    const { sizeY } = useAdaptivityConditionalRender();
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            sizeY.compact && /*#__PURE__*/ _jsx(IconCompact, {
                className: sizeY.compact.className
            }),
            sizeY.regular && /*#__PURE__*/ _jsx(IconRegular, {
                className: sizeY.regular.className
            })
        ]
    });
};

//# sourceMappingURL=AdaptiveIconRenderer.js.map