"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Gradient", {
    enumerable: true,
    get: function() {
        return Gradient;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Gradient = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, children = _param.children, _param_to = _param.to, to = _param_to === void 0 ? "top" : _param_to, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "children",
        "to",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({
        role: "presentation"
    }, restProps), {
        className: (0, _vkjs.classNames)({
            tint: "vkuiGradient--mode-tint",
            black: "vkuiGradient--mode-black",
            white: "vkuiGradient--mode-white"
        }[mode], {
            top: "vkuiGradient--to-top",
            bottom: "vkuiGradient--to-bottom"
        }[to], className)
    }), children);
};

//# sourceMappingURL=Gradient.js.map