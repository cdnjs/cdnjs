"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withInsets", {
    enumerable: true,
    get: function() {
        return withInsets;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _useInsets = require("../hooks/useInsets");
function withInsets(Component) {
    var WithInsets = function WithInsets(props) {
        var insets = (0, _useInsets.useInsets)();
        return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, props), {
            insets: insets
        }));
    };
    return WithInsets;
}

//# sourceMappingURL=withInsets.js.map