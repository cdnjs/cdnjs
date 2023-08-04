import * as React from 'react';
import { Text } from '../Typography/Text/Text';
/**
 * @private
 */ export const SelectTypography = ({ selectType = 'default', children, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Text, {
        weight: selectType === 'accent' ? '2' : '3',
        ...restProps
    }, children);
};

//# sourceMappingURL=SelectTypography.js.map