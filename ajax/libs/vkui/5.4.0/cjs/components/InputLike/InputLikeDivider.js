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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var InputLikeDivider = function(_param) {
    var children = _param.children, className = _param.className, props = _objectWithoutProperties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("span", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiInputLike__divider", className)
    }, props), children);
};

//# sourceMappingURL=InputLikeDivider.js.map