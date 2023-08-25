"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InputLikeDivider", {
    enumerable: true,
    get: function() {
        return InputLikeDivider;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var InputLikeDivider = function(_param) {
    var children = _param.children, className = _param.className, props = _object_without_properties._(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("span", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiInputLike__divider", className)
    }, props), children);
};

//# sourceMappingURL=InputLikeDivider.js.map