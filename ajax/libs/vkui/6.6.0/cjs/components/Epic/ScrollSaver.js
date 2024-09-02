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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _ScrollContext = require("../AppRoot/ScrollContext");
const ScrollSaver = ({ children, initialScroll, saveScroll })=>{
    const { getScroll, scrollTo } = _react.useContext(_ScrollContext.ScrollContext);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (typeof initialScroll === 'number') {
            scrollTo(0, initialScroll);
        }
        return ()=>saveScroll(getScroll().y);
    }, []);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Fragment, {
        children: children
    });
};

//# sourceMappingURL=ScrollSaver.js.map