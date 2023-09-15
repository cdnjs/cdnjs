"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Chevron", {
    enumerable: true,
    get: function() {
        return Chevron;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var iconSize = {
    s: _icons.Icon16Chevron,
    m: _icons.Icon24ChevronCompactRight
};
var Chevron = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, restProps = _object_without_properties._(_param, [
        "size"
    ]);
    var Icon = iconSize[size];
    return /*#__PURE__*/ _react.createElement(Icon, restProps);
};

//# sourceMappingURL=Chevron.js.map