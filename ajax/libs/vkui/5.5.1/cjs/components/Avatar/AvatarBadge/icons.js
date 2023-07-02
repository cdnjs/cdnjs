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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var Icon12Circle = function(_param) {
    var _param_width = _param.width, width = _param_width === void 0 ? 12 : _param_width, _param_height = _param.height, height = _param_height === void 0 ? 12 : _param_height, restProps = _object_without_properties._(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ _react.createElement(_icons.Icon12Circle, _object_spread_props._(_object_spread._({}, restProps), {
        width: width >= 24 ? 15 : 12,
        height: height >= 24 ? 15 : 12
    }));
};
var Icon12OnlineMobile = function(_param) {
    var _param_width = _param.width, width = _param_width === void 0 ? 8 : _param_width, _param_height = _param.height, height = _param_height === void 0 ? 12 : _param_height, restProps = _object_without_properties._(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ _react.createElement(_icons.Icon12OnlineMobile, _object_spread_props._(_object_spread._({}, restProps), {
        width: width >= 24 ? 9 : 8,
        height: height >= 24 ? 15 : 12
    }));
};

//# sourceMappingURL=icons.js.map