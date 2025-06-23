import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup.js";
import { CellButtonGroupSeparator } from "./CellButtonGroupSeparator/CellButtonGroupSeparator.js";
/**
 * @since 7.2.0
 *
 * @see https://vkcom.github.io/VKUI/#/CellButtonGroup
 */ export const CellButtonGroup = (props)=>{
    return /*#__PURE__*/ _jsx(ButtonGroup, {
        gap: "none",
        stretched: true,
        ...props
    });
};
CellButtonGroup.displayName = 'CellButtonGroup';
CellButtonGroup.Separator = CellButtonGroupSeparator;
CellButtonGroup.Separator.displayName = 'CellButtonGroup.Separator';

//# sourceMappingURL=CellButtonGroup.js.map