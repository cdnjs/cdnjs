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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _scrollContext = require("../AppRoot/ScrollContext");
var _modalRoot = require("./ModalRoot");
var _modalRootDesktop = require("./ModalRootDesktop");
var ModalRoot = function(props) {
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    (0, _scrollContext.useScrollLock)(!!props.activeModal);
    var RootComponent = isDesktop ? _modalRootDesktop.ModalRootDesktop : _modalRoot.ModalRootTouch;
    return /*#__PURE__*/ _react.createElement(RootComponent, props);
};

//# sourceMappingURL=ModalRootAdaptive.js.map