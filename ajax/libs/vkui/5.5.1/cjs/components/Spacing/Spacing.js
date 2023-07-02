"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Spacing", {
    enumerable: true,
    get: function() {
        return Spacing;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Spacing = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? 8 : _param_size, styleProp = _param.style, className = _param.className, restProps = _object_without_properties._(_param, [
        "size",
        "style",
        "className"
    ]);
    var style = _object_spread._({
        height: size,
        padding: "".concat(size / 2, "px 0")
    }, styleProp);
    return /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)(className, "vkuiSpacing"),
        style: style
    }));
};

//# sourceMappingURL=Spacing.js.map