"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CellButton", {
    enumerable: true,
    get: function() {
        return CellButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _SimpleCell = require("../SimpleCell/SimpleCell");
const CellButton = (_param)=>{
    var { centered = false, mode = 'primary', className } = _param, restProps = _object_without_properties._(_param, [
        "centered",
        "mode",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_SimpleCell.SimpleCell, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiCellButton", mode === 'danger' && "vkuiCellButton--mode-danger", centered && "vkuiCellButton--centered", className)
    }));
};

//# sourceMappingURL=CellButton.js.map