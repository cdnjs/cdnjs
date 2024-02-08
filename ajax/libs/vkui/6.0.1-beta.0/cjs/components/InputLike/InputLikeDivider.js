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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const InputLikeDivider = (_param)=>{
    var { children, className } = _param, props = _object_without_properties._(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("span", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiInputLike__divider", className)
    }, props), children);
};

//# sourceMappingURL=InputLikeDivider.js.map