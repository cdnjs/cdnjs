"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RadioGroup", {
    enumerable: true,
    get: function() {
        return RadioGroup;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var RadioGroup = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "vertical" : _param_mode, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "children",
        "className"
    ]);
    return _react.createElement("div", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiRadioGroup", "vkuiInternalRadioGroup", mode === "horizontal" && "vkuiRadioGroup--mode-horizontal", className)
    }, restProps), children);
};

//# sourceMappingURL=RadioGroup.js.map