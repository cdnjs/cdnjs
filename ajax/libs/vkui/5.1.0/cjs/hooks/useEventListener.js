"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEventListener = useEventListener;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("../lib/dom");
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useEventListener(event, _cb, _options) {
  var cbRef = React.useRef(_cb);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    cbRef.current = _cb;
  }, [_cb]);
  var cb = React.useCallback(function (e) {
    return cbRef.current && cbRef.current(e);
  }, []);
  var detach = React.useRef(_vkjs.noop);
  var remove = React.useCallback(function () {
    detach.current();
    detach.current = _vkjs.noop;
  }, []);
  var add = React.useCallback(function (el) {
    if (!_dom.canUseDOM) {
      return;
    }
    remove();
    if (!el) {
      return;
    }
    var options = (0, _objectSpread2.default)({}, _options);
    el.addEventListener(event, cb, options);
    detach.current = function () {
      return el.removeEventListener(event, cb, options);
    };
  }, [_options, cb, event, remove]);
  React.useEffect(function () {
    return remove;
  }, [remove]);
  return React.useMemo(function () {
    return {
      add: add,
      remove: remove
    };
  }, [add, remove]);
}
//# sourceMappingURL=useEventListener.js.map