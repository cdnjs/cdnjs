import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup.js";
import { CellButtonGroupSeparator } from "./CellButtonGroupSeparator/CellButtonGroupSeparator.js";
/**
 * @since 7.2.0
 *
 * @see https://vkui.io/components/cell-button-group
 */ export const CellButtonGroup = (props)=>{
    return /*#__PURE__*/ _jsx(ButtonGroup, _object_spread({
        gap: "none",
        stretched: true
    }, props));
};
CellButtonGroup.Separator = CellButtonGroupSeparator;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(CellButtonGroup.Separator, 'CellButtonGroup.Separator');
}

//# sourceMappingURL=CellButtonGroup.js.map