"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Title", {
    enumerable: true,
    get: function() {
        return Title;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _typography = require("../Typography");
var Title = function(_param) {
    var className = _param.className, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, Component = _param.Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _objectWithoutProperties(_param, [
        "className",
        "level",
        "Component",
        "normalize"
    ]);
    if (!Component) {
        Component = "h" + level;
    }
    return /*#__PURE__*/ _react.createElement(_typography.Typography, _objectSpread({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, {
            "1": "vkuiTitle--level-1",
            "2": "vkuiTitle--level-2",
            "3": "vkuiTitle--level-3"
        }[level])
    }, restProps));
};

//# sourceMappingURL=Title.js.map