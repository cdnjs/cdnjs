"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GridAvatarBadge", {
    enumerable: true,
    get: function() {
        return GridAvatarBadge;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _imageBase = require("../../ImageBase/ImageBase");
var GridAvatarBadge = function(_param) {
    var className = _param.className, restProps = _objectWithoutProperties(_param, [
        "className"
    ]);
    var size = _react.useContext(_imageBase.ImageBaseContext).size;
    return /*#__PURE__*/ _react.createElement(_imageBase.ImageBase.Badge, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiGridAvatarBadge", size < 96 && "vkuiGridAvatarBadge--shifted", className)
    }));
};

//# sourceMappingURL=GridAvatarBadge.js.map