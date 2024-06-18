"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Icon12Circle: function() {
        return Icon12Circle;
    },
    Icon12OnlineMobile: function() {
        return Icon12OnlineMobile;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const Icon12Circle = (_param)=>{
    var { width = 12, height = 12 } = _param, restProps = _object_without_properties._(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ _react.createElement(_icons.Icon12Circle, _object_spread_props._(_object_spread._({}, restProps), {
        width: width >= 24 ? 15 : 12,
        height: height >= 24 ? 15 : 12
    }));
};
const Icon12OnlineMobile = (_param)=>{
    var { width = 8, height = 12 } = _param, restProps = _object_without_properties._(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ _react.createElement(_icons.Icon12OnlineMobile, _object_spread_props._(_object_spread._({}, restProps), {
        width: width >= 24 ? 9 : 8,
        height: height >= 24 ? 15 : 12
    }));
};

//# sourceMappingURL=icons.js.map