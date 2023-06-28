"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withContext", {
    enumerable: true,
    get: function() {
        return withContext;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
function withContext(Component, Ctx, prop) {
    var WithContext = function WithContext(props) {
        var context = _react.useContext(Ctx);
        return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, props), _defineProperty({}, prop, context)));
    };
    return WithContext;
}

//# sourceMappingURL=withContext.js.map