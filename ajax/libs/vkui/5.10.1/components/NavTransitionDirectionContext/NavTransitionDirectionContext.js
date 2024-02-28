import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
var TransitionDirectionContext = /*#__PURE__*/ React.createContext(undefined);
export var NavTransitionDirectionProvider = function(param) {
    var children = param.children, isBackProp = param.isBack;
    var parentIsBack = React.useContext(TransitionDirectionContext);
    // if local isBack is undefined then transition happend on the parent side (probably Root)
    var isBack = isBackProp !== undefined ? isBackProp : parentIsBack;
    // 'direction' should always represent the direction state of the panel on mount
    // save the on mount value of the panel to the state
    // to make sure we don't trigger new re-render for the panel
    // due to change in the prop passed to provider
    var _React_useState = _sliced_to_array(React.useState(isBack), 1), isBackOnMount = _React_useState[0];
    return /*#__PURE__*/ React.createElement(TransitionDirectionContext.Provider, {
        value: isBackOnMount
    }, children);
};
export var useNavDirection = function() {
    var isBack = React.useContext(TransitionDirectionContext);
    var transitionDirection = isBack === undefined ? undefined : isBack ? "backwards" : "forwards";
    return transitionDirection;
};

//# sourceMappingURL=NavTransitionDirectionContext.js.map