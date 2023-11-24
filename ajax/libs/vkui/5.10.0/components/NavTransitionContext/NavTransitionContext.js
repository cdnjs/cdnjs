import * as React from "react";
import { useObjectMemo } from "../../hooks/useObjectMemo";
var TransitionContext = /*#__PURE__*/ React.createContext({
    entering: false
});
export var useNavTransition = function() {
    return React.useContext(TransitionContext);
};
export var NavTransitionProvider = function(param) {
    var children = param.children, entering = param.entering;
    var parentContext = useNavTransition();
    var contextValue = useObjectMemo({
        entering: parentContext.entering || entering
    });
    return /*#__PURE__*/ React.createElement(TransitionContext.Provider, {
        value: contextValue
    }, children);
};

//# sourceMappingURL=NavTransitionContext.js.map