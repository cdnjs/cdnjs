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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var CellButton = function(_param) {
    var _param_centered = _param.centered, centered = _param_centered === void 0 ? false : _param_centered, _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, className = _param.className, restProps = _object_without_properties._(_param, [
        "centered",
        "mode",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_SimpleCell.SimpleCell, _object_spread_props._(_object_spread._({
        stopPropagation: true
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiCellButton", mode === "danger" && "vkuiCellButton--mode-danger", centered && "vkuiCellButton--centered", className)
    }));
};

//# sourceMappingURL=CellButton.js.map