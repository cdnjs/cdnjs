"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelSpinner", {
    enumerable: true,
    get: function() {
        return PanelSpinner;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _Spinner = require("../Spinner/Spinner");
var PanelSpinner = /*#__PURE__*/ _react.memo(function(_param) /*#__PURE__*/ {
    var _param_height = _param.height, height = _param_height === void 0 ? 96 : _param_height, style = _param.style, restProps = _object_without_properties._(_param, [
        "height",
        "style"
    ]);
    return _react.createElement(_Spinner.Spinner, _object_spread_props._(_object_spread._({
        size: "regular"
    }, restProps), {
        style: _object_spread._({
            height: height
        }, style)
    }));
});
PanelSpinner.displayName = "PanelSpinner";

//# sourceMappingURL=PanelSpinner.js.map