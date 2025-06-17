'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { ScrollContext } from "../AppRoot/ScrollContext.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ScrollSaver
 */ export const ScrollSaver = ({ children, initialScroll, saveScroll })=>{
    const { getScroll, scrollTo } = React.useContext(ScrollContext);
    useIsomorphicLayoutEffect(()=>{
        if (typeof initialScroll === 'number') {
            scrollTo(0, initialScroll);
        }
        return ()=>saveScroll(getScroll().y);
    }, []);
    return /*#__PURE__*/ _jsx(React.Fragment, {
        children: children
    });
};

//# sourceMappingURL=ScrollSaver.js.map