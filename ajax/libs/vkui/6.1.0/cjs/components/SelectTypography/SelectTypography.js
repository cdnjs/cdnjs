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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _Text = require("../Typography/Text/Text");
const SelectTypography = (_param)=>{
    var { selectType = 'default', children } = _param, restProps = _object_without_properties._(_param, [
        "selectType",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, _object_spread_props._(_object_spread._({
        weight: selectType === 'accent' ? '2' : '3'
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=SelectTypography.js.map