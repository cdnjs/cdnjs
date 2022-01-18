"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExternRef = useExternRef;

var React = _interopRequireWildcard(require("react"));

var _utils = require("../lib/utils");

function useExternRef() {
  for (var _len = arguments.length, externRefs = new Array(_len), _key = 0; _key < _len; _key++) {
    externRefs[_key] = arguments[_key];
  }

  var stableRef = React.useRef();
  return React.useMemo(function () {
    return {
      get current() {
        return stableRef.current;
      },

      set current(el) {
        stableRef.current = el;
        externRefs.forEach(function (ref) {
          return (0, _utils.setRef)(el, ref);
        });
      }

    };
  }, externRefs);
}
//# sourceMappingURL=useExternRef.js.map