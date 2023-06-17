"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Icon12Circle: function() {
        return Icon12Circle;
    },
    Icon12OnlineMobile: function() {
        return Icon12OnlineMobile;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var Icon12Circle = function(_param) {
    var _param_width = _param.width, width = _param_width === void 0 ? 12 : _param_width, _param_height = _param.height, height = _param_height === void 0 ? 12 : _param_height, restProps = _objectWithoutProperties(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ _react.createElement(_icons.Icon12Circle, _objectSpreadProps(_objectSpread({}, restProps), {
        width: width >= 24 ? 15 : 12,
        height: height >= 24 ? 15 : 12
    }));
};
var Icon12OnlineMobile = function(_param) {
    var _param_width = _param.width, width = _param_width === void 0 ? 8 : _param_width, _param_height = _param.height, height = _param_height === void 0 ? 12 : _param_height, restProps = _objectWithoutProperties(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ _react.createElement(_icons.Icon12OnlineMobile, _objectSpreadProps(_objectSpread({}, restProps), {
        width: width >= 24 ? 9 : 8,
        height: height >= 24 ? 15 : 12
    }));
};

//# sourceMappingURL=icons.js.map