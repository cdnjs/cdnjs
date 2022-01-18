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
    return cb ? listener.add(element) : listener.remove();
  }, [Boolean(cb)]);
}
//# sourceMappingURL=useGlobalEventListener.js.map