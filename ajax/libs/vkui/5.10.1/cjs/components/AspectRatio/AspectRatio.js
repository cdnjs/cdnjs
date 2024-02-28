"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AspectRatio", {
    enumerable: true,
    get: function() {
        return AspectRatio;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
function AspectRatio(_param) {
    var ratio = _param.ratio, _param_mode = _param.mode, mode = _param_mode === void 0 ? "stretch" : _param_mode, styleProp = _param.style, props = _object_without_properties._(_param, [
        "ratio",
        "mode",
        "style"
    ]);
    var style = _define_property._({}, "--vkui_internal--aspect_ratio", String(ratio));
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiAspectRatio", mode === "stretch" && "vkuiAspectRatio--mode-stretch"),
        style: _object_spread._({}, styleProp, style)
    }, props));
}

//# sourceMappingURL=AspectRatio.js.map