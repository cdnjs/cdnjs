import * as React from 'react';
const TransitionDirectionContext = /*#__PURE__*/ React.createContext(undefined);
export const NavTransitionDirectionProvider = ({ children, isBack: isBackProp })=>{
    const parentIsBack = React.useContext(TransitionDirectionContext);
    // if local isBack is undefined then transition happend on the parent side (probably Root)
    const isBack = isBackProp !== undefined ? isBackProp : parentIsBack;
    // 'direction' should always represent the direction state of the panel on mount
    // save the on mount value of the panel to the state
    // to make sure we don't trigger new re-render for the panel
    // due to change in the prop passed to provider
    const [isBackOnMount] = React.useState(isBack);
    return /*#__PURE__*/ React.createElement(TransitionDirectionContext.Provider, {
        value: isBackOnMount
    }, children);
};
export const useNavDirection = ()=>{
    const isBack = React.useContext(TransitionDirectionContext);
    const transitionDirection = isBack === undefined ? undefined : isBack ? 'backwards' : 'forwards';
    return transitionDirection;
};

//# sourceMappingURL=NavTransitionDirectionContext.js.map