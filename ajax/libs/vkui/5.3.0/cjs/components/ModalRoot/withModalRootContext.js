"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withModalRootContext", {
    enumerable: true,
    get: function() {
        return withModalRootContext;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _modalRootContext = require("./ModalRootContext");
function withModalRootContext(Component) {
    var WithModalRootContext = function WithModalRootContext(props) {
        var updateModalHeight = _react.useContext(_modalRootContext.ModalRootContext).updateModalHeight;
        return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, props), {
            updateModalHeight: updateModalHeight
        }));
    };
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map