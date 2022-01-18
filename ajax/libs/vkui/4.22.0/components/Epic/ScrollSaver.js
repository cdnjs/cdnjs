import * as React from 'react';
import { ScrollContext } from "../AppRoot/ScrollContext";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
export var ScrollSaver = function ScrollSaver(_ref) {
  var children = _ref.children,
      initialScroll = _ref.initialScroll,
      saveScroll = _ref.saveScroll;

  var _React$useContext = React.useContext(ScrollContext),
      getScroll = _React$useContext.getScroll,
      scrollTo = _React$useContext.scrollTo;

  useIsomorphicLayoutEffect(function () {
    if (typeof initialScroll === 'number') {
      scrollTo(0, initialScroll);
    }

    return function () {
      return saveScroll(getScroll().y);
    };
  }, []);
  return children;
};
//# sourceMappingURL=ScrollSaver.js.map