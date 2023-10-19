"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SelectTypography", {
    enumerable: true,
    get: function() {
        return SelectTypography;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _Text = require("../Typography/Text/Text");
var SelectTypography = function(_param) {
    var _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, children = _param.children, restProps = _object_without_properties._(_param, [
        "selectType",
        "children"
    ]);
    return /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread._({
        weight: selectType === "accent" ? "2" : "3"
    }, restProps), children);
};

//# sourceMappingURL=SelectTypography.js.map