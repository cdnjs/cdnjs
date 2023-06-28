"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Badge", {
    enumerable: true,
    get: function() {
        return Badge;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Badge = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "new" : _param_mode, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "className"
    ]);
    return _react.createElement("span", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiBadge", {
            new: "vkuiBadge--mode-new",
            prominent: "vkuiBadge--mode-prominent"
        }[mode], className)
    }, restProps));
};

//# sourceMappingURL=Badge.js.map