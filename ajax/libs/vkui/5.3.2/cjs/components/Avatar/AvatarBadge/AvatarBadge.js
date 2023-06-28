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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _imageBase = require("../../ImageBase/ImageBase");
var AvatarBadge = function(_param) {
    var className = _param.className, restProps = _objectWithoutProperties(_param, [
        "className"
    ]);
    var size = _react.useContext(_imageBase.ImageBaseContext).size;
    return /*#__PURE__*/ _react.createElement(_imageBase.ImageBase.Badge, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiAvatarBadge", size < 96 && "vkuiAvatarBadge--shifted", className)
    }));
};

//# sourceMappingURL=AvatarBadge.js.map