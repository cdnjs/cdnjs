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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _Spinner = require("../Spinner/Spinner");
const PanelSpinner = /*#__PURE__*/ _react.memo((_param)=>{
    var { height = 96, style } = _param, restProps = _object_without_properties._(_param, [
        "height",
        "style"
    ]);
    return /*#__PURE__*/ _react.createElement(_Spinner.Spinner, _object_spread_props._(_object_spread._({
        size: "regular"
    }, restProps), {
        style: _object_spread._({
            height
        }, style)
    }));
});
PanelSpinner.displayName = 'PanelSpinner';

//# sourceMappingURL=PanelSpinner.js.map