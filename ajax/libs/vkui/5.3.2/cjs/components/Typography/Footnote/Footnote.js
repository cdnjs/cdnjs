"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Footnote", {
    enumerable: true,
    get: function() {
        return Footnote;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Footnote = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, restProps = _objectWithoutProperties(_param, [
        "className",
        "children",
        "weight",
        "caps",
        "Component"
    ]);
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)(className, "vkuiFootnote", caps && "vkuiFootnote--caps", weight && ({
            "1": "vkuiFootnote--weight-1",
            "2": "vkuiFootnote--weight-2",
            "3": "vkuiFootnote--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Footnote.js.map