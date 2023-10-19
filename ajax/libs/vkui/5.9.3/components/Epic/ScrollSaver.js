import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { ScrollContext } from "../AppRoot/ScrollContext";
/**
 * @see https://vkcom.github.io/VKUI/#/ScrollSaver
 */ export var ScrollSaver = function(param) {
    var children = param.children, initialScroll = param.initialScroll, saveScroll = param.saveScroll;
    var _React_useContext = React.useContext(ScrollContext), getScroll = _React_useContext.getScroll, scrollTo = _React_useContext.scrollTo;
    useIsomorphicLayoutEffect(function() {
        if (typeof initialScroll === "number") {
            scrollTo(0, initialScroll);
        }
        return function() {
            return saveScroll(getScroll().y);
        };
    }, []);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children);
};

//# sourceMappingURL=ScrollSaver.js.map