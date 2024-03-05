import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Chevron, Icon24ChevronCompactRight } from '@vkontakte/icons';
const iconSize = {
    s: Icon16Chevron,
    m: Icon24ChevronCompactRight
};
export const Chevron = (_param)=>{
    var { size = 'm' } = _param, restProps = _object_without_properties(_param, [
        "size"
    ]);
    const Icon = iconSize[size];
    return /*#__PURE__*/ React.createElement(Icon, restProps);
};

//# sourceMappingURL=Chevron.js.map