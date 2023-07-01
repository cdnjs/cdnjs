"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScrollSaver", {
    enumerable: true,
    get: function() {
        return ScrollSaver;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _ScrollContext = require("../AppRoot/ScrollContext");
var ScrollSaver = function(param) {
    var children = param.children, initialScroll = param.initialScroll, saveScroll = param.saveScroll;
    var _React_useContext = _react.useContext(_ScrollContext.ScrollContext), getScroll = _React_useContext.getScroll, scrollTo = _React_useContext.scrollTo;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (typeof initialScroll === "number") {
            scrollTo(0, initialScroll);
        }
        return function() {
            return saveScroll(getScroll().y);
        };
    }, []);
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, children);
};

//# sourceMappingURL=ScrollSaver.js.map