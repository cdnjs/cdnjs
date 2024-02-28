"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AvatarBadge", {
    enumerable: true,
    get: function() {
        return AvatarBadge;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ImageBase = require("../../ImageBase/ImageBase");
var AvatarBadge = function(_param) {
    var className = _param.className, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    var size = _react.useContext(_ImageBase.ImageBaseContext).size;
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase.Badge, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiAvatarBadge", size < 96 && "vkuiAvatarBadge--shifted", className)
    }));
};

//# sourceMappingURL=AvatarBadge.js.map