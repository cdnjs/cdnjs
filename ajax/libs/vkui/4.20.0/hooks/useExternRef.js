import * as React from 'react';
import { setRef } from "../lib/utils";
export function useExternRef() {
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
          return setRef(el, ref);
        });
      }

    };
  }, externRefs);
}
//# sourceMappingURL=useExternRef.js.map