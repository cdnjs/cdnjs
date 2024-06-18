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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _ModalRoot = require("./ModalRoot");
const _ModalRootDesktop = require("./ModalRootDesktop");
const ModalRoot = (props)=>{
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    (0, _ScrollContext.useScrollLock)(!!props.activeModal);
    const RootComponent = isDesktop ? _ModalRootDesktop.ModalRootDesktop : _ModalRoot.ModalRootTouch;
    return /*#__PURE__*/ _react.createElement(RootComponent, props);
};

//# sourceMappingURL=ModalRootAdaptive.js.map