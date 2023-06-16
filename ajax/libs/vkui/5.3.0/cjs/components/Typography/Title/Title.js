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
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Title = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, Component = _param.Component, restProps = _objectWithoutProperties(_param, [
        "className",
        "children",
        "weight",
        "level",
        "Component"
    ]);
    if (!Component) {
        Component = "h" + level;
    }
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)(className, "vkuiTitle", {
            "1": "vkuiTitle--level-1",
            "2": "vkuiTitle--level-2",
            "3": "vkuiTitle--level-3"
        }[level], weight && ({
            "1": "vkuiTitle--weight-1",
            "2": "vkuiTitle--weight-2",
            "3": "vkuiTitle--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Title.js.map