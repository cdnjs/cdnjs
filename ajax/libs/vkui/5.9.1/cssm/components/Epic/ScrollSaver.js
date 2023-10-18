import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { ScrollContext } from '../AppRoot/ScrollContext';
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
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children);
};

//# sourceMappingURL=ScrollSaver.js.map