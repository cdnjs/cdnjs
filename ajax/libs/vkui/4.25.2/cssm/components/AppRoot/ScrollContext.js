import * as React from "react";
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
      var _elRef$current$scroll, _elRef$current, _elRef$current$scroll2, _elRef$current2;

      return {
        x: (_elRef$current$scroll = (_elRef$current = elRef.current) === null || _elRef$current === void 0 ? void 0 : _elRef$current.scrollLeft) !== null && _elRef$current$scroll !== void 0 ? _elRef$current$scroll : 0,
        y: (_elRef$current$scroll2 = (_elRef$current2 = elRef.current) === null || _elRef$current2 === void 0 ? void 0 : _elRef$current2.scrollTop) !== null && _elRef$current$scroll2 !== void 0 ? _elRef$current$scroll2 : 0
      };
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var el = elRef.current; // Some iOS versions do not normalize scroll — do it manually.

      el === null || el === void 0 ? void 0 : el.scrollTo(x ? clamp(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? clamp(y, 0, el.scrollHeight - el.clientHeight) : 0);
    }
  };
};
//# sourceMappingURL=ScrollContext.js.map