"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Caption", {
    enumerable: true,
    get: function() {
        return Caption;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Caption = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, restProps = _objectWithoutProperties(_param, [
        "className",
        "children",
        "weight",
        "level",
        "caps",
        "Component"
    ]);
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)(className, "vkuiCaption", caps && "vkuiCaption--caps", {
            "1": "vkuiCaption--level-1",
            "2": "vkuiCaption--level-2",
            "3": "vkuiCaption--level-3"
        }[level], weight && ({
            "1": "vkuiCaption--weight-1",
            "2": "vkuiCaption--weight-2",
            "3": "vkuiCaption--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Caption.js.map