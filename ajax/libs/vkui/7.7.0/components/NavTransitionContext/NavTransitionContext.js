'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
const TransitionContext = /*#__PURE__*/ React.createContext({
    entering: false
});
export const useNavTransition = ()=>React.useContext(TransitionContext);
export const NavTransitionProvider = ({ children, entering })=>{
    const parentContext = useNavTransition();
    const contextValue = React.useMemo(()=>({
            entering: parentContext.entering || entering
        }), [
        entering,
        parentContext.entering
    ]);
    return /*#__PURE__*/ _jsx(TransitionContext.Provider, {
        value: contextValue,
        children: children
    });
};

//# sourceMappingURL=NavTransitionContext.js.map