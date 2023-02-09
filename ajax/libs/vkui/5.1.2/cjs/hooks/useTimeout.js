"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimeout = useTimeout;
var React = _interopRequireWildcard(require("react"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
var _dom = require("../lib/dom");
function useTimeout(cb, duration) {
  var options = React.useRef({
    cb: cb,
    duration: duration
  });
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    options.current.cb = cb;
    options.current.duration = duration;
  }, [cb, duration]);
  var timeout = React.useRef();
  var clear = React.useCallback(function () {
    if (_dom.canUseDOM && timeout !== null && timeout !== void 0 && timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);
  var set = React.useCallback(function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options.current.duration;
    clear();
    if (_dom.canUseDOM) {
      timeout.current = setTimeout(function () {
        var cb = options.current.cb;
        typeof cb === 'function' && cb();
      }, duration);
    }
  }, [clear]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    return clear;
  }, []);
  return {
    set: set,
    clear: clear
  };
}
//# sourceMappingURL=useTimeout.js.map