import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { SimpleCell } from '../SimpleCell/SimpleCell';
/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */ export const CellButton = (_param)=>{
    var { centered = false, mode = 'primary', className } = _param, restProps = _object_without_properties(_param, [
        "centered",
        "mode",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(SimpleCell, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiCellButton", mode === 'danger' && "vkuiCellButton--mode-danger", centered && "vkuiCellButton--centered", className)
    }));
};

//# sourceMappingURL=CellButton.js.map