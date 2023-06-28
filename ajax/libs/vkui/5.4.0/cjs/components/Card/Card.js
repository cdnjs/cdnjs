"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Card", {
    enumerable: true,
    get: function() {
        return Card;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Card = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "children",
        "getRootRef",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiCard", mode === "outline" && "vkuiCard--mode-outline", mode === "shadow" && "vkuiCard--mode-shadow", className)
    }), children);
};

//# sourceMappingURL=Card.js.map