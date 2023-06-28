"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FocusVisible", {
    enumerable: true,
    get: function() {
        return FocusVisible;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var FocusVisible = function(param) {
    var mode = param.mode;
    return /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: (0, _vkjs.classNames)("vkuiFocusVisible", {
            inside: "vkuiFocusVisible--mode-inside",
            outside: "vkuiFocusVisible--mode-outside"
        }[mode])
    });
};

//# sourceMappingURL=FocusVisible.js.map