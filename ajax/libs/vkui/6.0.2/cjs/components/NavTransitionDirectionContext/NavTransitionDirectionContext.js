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
    NavTransitionDirectionProvider: function() {
        return NavTransitionDirectionProvider;
    },
    useNavDirection: function() {
        return useNavDirection;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const TransitionDirectionContext = /*#__PURE__*/ _react.createContext(undefined);
const NavTransitionDirectionProvider = ({ children, isBack: isBackProp })=>{
    const parentIsBack = _react.useContext(TransitionDirectionContext);
    // if local isBack is undefined then transition happend on the parent side (probably Root)
    const isBack = isBackProp !== undefined ? isBackProp : parentIsBack;
    // 'direction' should always represent the direction state of the panel on mount
    // save the on mount value of the panel to the state
    // to make sure we don't trigger new re-render for the panel
    // due to change in the prop passed to provider
    const [isBackOnMount] = _react.useState(isBack);
    return /*#__PURE__*/ _react.createElement(TransitionDirectionContext.Provider, {
        value: isBackOnMount
    }, children);
};
const useNavDirection = ()=>{
    const isBack = _react.useContext(TransitionDirectionContext);
    const transitionDirection = isBack === undefined ? undefined : isBack ? 'backwards' : 'forwards';
    return transitionDirection;
};

//# sourceMappingURL=NavTransitionDirectionContext.js.map