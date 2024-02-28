import * as React from 'react';
import { Icon12Circle as Icon12CircleLib, Icon12OnlineMobile as Icon12OnlineMobileLib } from '@vkontakte/icons';
export const Icon12Circle = ({ width = 12, height = 12, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Icon12CircleLib, {
        ...restProps,
        width: width >= 24 ? 15 : 12,
        height: height >= 24 ? 15 : 12
    });
};
export const Icon12OnlineMobile = ({ width = 8, height = 12, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Icon12OnlineMobileLib, {
        ...restProps,
        width: width >= 24 ? 9 : 8,
        height: height >= 24 ? 15 : 12
    });
};

//# sourceMappingURL=icons.js.map