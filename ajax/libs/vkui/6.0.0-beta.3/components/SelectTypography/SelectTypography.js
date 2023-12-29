import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Text } from '../Typography/Text/Text';
/**
 * @private
 */ export const SelectTypography = (_param)=>{
    var { selectType = 'default', children } = _param, restProps = _object_without_properties(_param, [
        "selectType",
        "children"
    ]);
    return /*#__PURE__*/ React.createElement(Text, _object_spread({
        weight: selectType === 'accent' ? '2' : '3'
    }, restProps), children);
};

//# sourceMappingURL=SelectTypography.js.map