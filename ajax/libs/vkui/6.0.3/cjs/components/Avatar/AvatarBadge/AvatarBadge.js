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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _ImageBase = require("../../ImageBase/ImageBase");
const AvatarBadge = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    const { size } = _react.useContext(_ImageBase.ImageBaseContext);
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase.Badge, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiAvatarBadge", size < 96 && "vkuiAvatarBadge--shifted", className)
    }));
};

//# sourceMappingURL=AvatarBadge.js.map