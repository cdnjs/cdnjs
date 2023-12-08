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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _Text = require("../Typography/Text/Text");
const SelectTypography = (_param)=>{
    var { selectType = 'default', children } = _param, restProps = _object_without_properties._(_param, [
        "selectType",
        "children"
    ]);
    return /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread._({
        weight: selectType === 'accent' ? '2' : '3'
    }, restProps), children);
};

//# sourceMappingURL=SelectTypography.js.map