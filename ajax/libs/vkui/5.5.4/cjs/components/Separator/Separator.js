"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Separator", {
    enumerable: true,
    get: function() {
        return Separator;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Separator = function(_param) /*#__PURE__*/ {
    var wide = _param.wide, className = _param.className, restProps = _object_without_properties._(_param, [
        "wide",
        "className"
    ]);
    return _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiSeparator", !wide && "vkuiSeparator--padded", className)
    }), /*#__PURE__*/ _react.createElement("hr", {
        className: "vkuiSeparator__in"
    }));
};

//# sourceMappingURL=Separator.js.map