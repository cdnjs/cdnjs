import * as React from 'react';
import { Icon16Chevron, Icon24ChevronCompactRight } from '@vkontakte/icons';
const iconSize = {
    s: Icon16Chevron,
    m: Icon24ChevronCompactRight
};
export const Chevron = ({ size = 'm', ...restProps })=>{
    const Icon = iconSize[size];
    return /*#__PURE__*/ React.createElement(Icon, restProps);
};

//# sourceMappingURL=Chevron.js.map