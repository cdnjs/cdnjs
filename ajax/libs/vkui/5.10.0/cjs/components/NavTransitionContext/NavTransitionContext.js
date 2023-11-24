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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useObjectMemo = require("../../hooks/useObjectMemo");
var TransitionContext = /*#__PURE__*/ _react.createContext({
    entering: false
});
var useNavTransition = function() {
    return _react.useContext(TransitionContext);
};
var NavTransitionProvider = function(param) {
    var children = param.children, entering = param.entering;
    var parentContext = useNavTransition();
    var contextValue = (0, _useObjectMemo.useObjectMemo)({
        entering: parentContext.entering || entering
    });
    return /*#__PURE__*/ _react.createElement(TransitionContext.Provider, {
        value: contextValue
    }, children);
};

//# sourceMappingURL=NavTransitionContext.js.map