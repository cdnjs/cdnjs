"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalRoot", {
    enumerable: true,
    get: function() {
        return ModalRoot;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _ModalRoot = require("./ModalRoot");
var _ModalRootDesktop = require("./ModalRootDesktop");
var ModalRoot = function(props) {
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    (0, _ScrollContext.useScrollLock)(!!props.activeModal);
    var RootComponent = isDesktop ? _ModalRootDesktop.ModalRootDesktop : _ModalRoot.ModalRootTouch;
    return /*#__PURE__*/ _react.createElement(RootComponent, props);
};

//# sourceMappingURL=ModalRootAdaptive.js.map