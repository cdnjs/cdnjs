import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "../Typography/Text/Text.js";
/**
 * @private
 */ export const SelectTypography = ({ selectType = 'default', children, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Text, {
        weight: selectType === 'accent' ? '2' : '3',
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=SelectTypography.js.map