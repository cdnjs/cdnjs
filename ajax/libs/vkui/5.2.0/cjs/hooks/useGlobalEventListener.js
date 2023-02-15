"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGlobalEventListener = useGlobalEventListener;
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
var _useEventListener = require("./useEventListener");
function useGlobalEventListener(element, event, cb, options) {
  var listener = (0, _useEventListener.useEventListener)(event, cb, options);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (cb && element) {
      listener.add(element);
    } else {
      listener.remove();
    }
  }, [Boolean(cb), Boolean(element)]);
}
//# sourceMappingURL=useGlobalEventListener.js.map