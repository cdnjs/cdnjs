"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Badge", {
    enumerable: true,
    get: function() {
        return Badge;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Badge = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "new" : _param_mode, className = _param.className, restProps = _object_without_properties._(_param, [
        "mode",
        "className"
    ]);
    return _react.createElement("span", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiBadge", {
            new: "vkuiBadge--mode-new",
            prominent: "vkuiBadge--mode-prominent"
        }[mode], className)
    }, restProps));
};

//# sourceMappingURL=Badge.js.map