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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var TransitionDirectionContext = /*#__PURE__*/ _react.createContext(undefined);
var NavTransitionDirectionProvider = function(param) {
    var children = param.children, isBackProp = param.isBack;
    var parentIsBack = _react.useContext(TransitionDirectionContext);
    // if local isBack is undefined then transition happend on the parent side (probably Root)
    var isBack = isBackProp !== undefined ? isBackProp : parentIsBack;
    // 'direction' should always represent the direction state of the panel on mount
    // save the on mount value of the panel to the state
    // to make sure we don't trigger new re-render for the panel
    // due to change in the prop passed to provider
    var _React_useState = _sliced_to_array._(_react.useState(isBack), 1), isBackOnMount = _React_useState[0];
    return /*#__PURE__*/ _react.createElement(TransitionDirectionContext.Provider, {
        value: isBackOnMount
    }, children);
};
var useNavDirection = function() {
    var isBack = _react.useContext(TransitionDirectionContext);
    var transitionDirection = isBack === undefined ? undefined : isBack ? "backwards" : "forwards";
    return transitionDirection;
};

//# sourceMappingURL=NavTransitionDirectionContext.js.map