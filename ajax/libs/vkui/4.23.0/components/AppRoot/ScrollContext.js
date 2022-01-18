import * as React from 'react';
import { noop } from "../../lib/utils";
import { clamp } from "../../helpers/math";
export var ScrollContext = /*#__PURE__*/React.createContext({
  getScroll: function getScroll() {
    return {
      x: 0,
      y: 0
    };
  },
  scrollTo: noop
});
export var globalScrollController = function globalScrollController(window, document) {
  return {
    getScroll: function getScroll() {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // Some iOS versions do not normalize scroll — do it manually.
      window.scrollTo(x ? clamp(x, 0, document.body.scrollWidth - window.innerWidth) : 0, y ? clamp(y, 0, document.body.scrollHeight - window.innerHeight) : 0);
    }
  };
};
export var elementScrollController = function elementScrollController(elRef) {
  return {
    getScroll: function getScroll() {
      return {
        x: elRef.current.scrollLeft,
        y: elRef.current.scrollTop
      };
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var el = elRef.current; // Some iOS versions do not normalize scroll — do it manually.

      el.scrollTo(x ? clamp(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? clamp(y, 0, el.scrollHeight - el.clientHeight) : 0);
    }
  };
};
//# sourceMappingURL=ScrollContext.js.map