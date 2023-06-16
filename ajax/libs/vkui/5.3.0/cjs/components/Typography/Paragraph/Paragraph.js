"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Paragraph", {
    enumerable: true,
    get: function() {
        return Paragraph;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../../lib/warnOnce");
var warn = (0, _warnOnce.warnOnce)("Paragraph");
var Paragraph = function(_param) {
    var className = _param.className, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, getRootRef = _param.getRootRef, weight = _param.weight, children = _param.children, restProps = _objectWithoutProperties(_param, [
        "className",
        "Component",
        "getRootRef",
        "weight",
        "children"
    ]);
    if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
        warn("getRootRef может использоваться только с элементами DOM", "error");
    }
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)(className, "vkuiParagraph", weight && ({
            "1": "vkuiParagraph--weight-1",
            "2": "vkuiParagraph--weight-2",
            "3": "vkuiParagraph--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Paragraph.js.map