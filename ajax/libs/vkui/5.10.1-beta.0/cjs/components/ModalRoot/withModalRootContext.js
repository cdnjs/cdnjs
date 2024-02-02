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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _ModalRootContext = require("./ModalRootContext");
function withModalRootContext(Component) {
    function WithModalRootContext(props) {
        var updateModalHeight = _react.useContext(_ModalRootContext.ModalRootContext).updateModalHeight;
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), {
            updateModalHeight: updateModalHeight
        }));
    }
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map