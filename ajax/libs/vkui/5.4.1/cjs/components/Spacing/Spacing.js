"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Spacing", {
    enumerable: true,
    get: function() {
        return Spacing;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Spacing = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? 8 : _param_size, styleProp = _param.style, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "size",
        "style",
        "className"
    ]);
    var style = _objectSpread({
        height: size,
        padding: "".concat(size / 2, "px 0")
    }, styleProp);
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)(className, "vkuiSpacing"),
        style: style
    }));
};

//# sourceMappingURL=Spacing.js.map