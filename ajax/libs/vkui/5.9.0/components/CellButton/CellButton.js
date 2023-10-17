import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { SimpleCell } from "../SimpleCell/SimpleCell";
/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */ export var CellButton = function(_param) {
    var _param_centered = _param.centered, centered = _param_centered === void 0 ? false : _param_centered, _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, className = _param.className, restProps = _object_without_properties(_param, [
        "centered",
        "mode",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(SimpleCell, _object_spread_props(_object_spread({
        stopPropagation: true
    }, restProps), {
        className: classNames("vkuiCellButton", mode === "danger" && "vkuiCellButton--mode-danger", centered && "vkuiCellButton--centered", className)
    }));
};

//# sourceMappingURL=CellButton.js.map