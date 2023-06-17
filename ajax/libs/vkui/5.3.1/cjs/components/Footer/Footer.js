"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Footer", {
    enumerable: true,
    get: function() {
        return Footer;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _footnote = require("../Typography/Footnote/Footnote");
var Footer = function(_param) {
    var children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_footnote.Footnote, _objectSpreadProps(_objectSpread({
        Component: "footer"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiFooter", className)
    }), children);
};

//# sourceMappingURL=Footer.js.map