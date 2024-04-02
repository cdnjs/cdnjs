"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NavTransitionProvider: function() {
        return NavTransitionProvider;
    },
    useNavTransition: function() {
        return useNavTransition;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useObjectMemo = require("../../hooks/useObjectMemo");
const TransitionContext = /*#__PURE__*/ _react.createContext({
    entering: false
});
const useNavTransition = ()=>_react.useContext(TransitionContext);
const NavTransitionProvider = ({ children, entering })=>{
    const parentContext = useNavTransition();
    const contextValue = (0, _useObjectMemo.useObjectMemo)({
        entering: parentContext.entering || entering
    });
    return /*#__PURE__*/ _react.createElement(TransitionContext.Provider, {
        value: contextValue
    }, children);
};

//# sourceMappingURL=NavTransitionContext.js.map