import * as React from 'react';
import { useObjectMemo } from '../../hooks/useObjectMemo';
const TransitionContext = /*#__PURE__*/ React.createContext({
    entering: false
});
export const useNavTransition = ()=>React.useContext(TransitionContext);
export const NavTransitionProvider = ({ children, entering })=>{
    const parentContext = useNavTransition();
    const contextValue = useObjectMemo({
        entering: parentContext.entering || entering
    });
    return /*#__PURE__*/ React.createElement(TransitionContext.Provider, {
        value: contextValue
    }, children);
};

//# sourceMappingURL=NavTransitionContext.js.map