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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _simpleCell = require("../SimpleCell/SimpleCell");
var CellButton = function(_param) {
    var _param_centered = _param.centered, centered = _param_centered === void 0 ? false : _param_centered, _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "centered",
        "mode",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_simpleCell.SimpleCell, _objectSpreadProps(_objectSpread({
        stopPropagation: true
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiCellButton", "vkuiInternalCellButton", mode === "danger" && (0, _vkjs.classNames)("vkuiCellButton--mode-danger", "vkuiInternalCellButton--mode-danger"), centered && "vkuiCellButton--centered", className)
    }));
};

//# sourceMappingURL=CellButton.js.map