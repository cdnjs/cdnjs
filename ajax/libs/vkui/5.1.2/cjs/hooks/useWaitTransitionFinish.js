"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWaitTransitionFinish = void 0;
var React = _interopRequireWildcard(require("react"));
var _dom = require("../lib/dom");
var _vkjs = require("@vkontakte/vkjs");
var _supportEvents = require("../lib/supportEvents");
var useWaitTransitionFinish = function useWaitTransitionFinish() {
  var timeoutRef = React.useRef(null);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var detach = React.useRef(_vkjs.noop);
  var remove = React.useCallback(function () {
    detach.current();
    detach.current = _vkjs.noop;
  }, []);
  var waitTransitionFinish = React.useCallback(function (element, eventHandler, durationFallback) {
    if (element) {
      if (!(document !== null && document !== void 0 && document.hidden) && _supportEvents.transitionEvent.supported && _supportEvents.transitionEvent.name) {
        remove();
        element.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
        detach.current = function () {
          if (_supportEvents.transitionEvent.name) {
            element.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
          }
        };
      } else {
        if (timeoutRef !== null && timeoutRef !== void 0 && timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(eventHandler, durationFallback);
      }
    }
  }, [document, remove, timeoutRef]);
  return {
    waitTransitionFinish: waitTransitionFinish
  };
};
exports.useWaitTransitionFinish = useWaitTransitionFinish;
//# sourceMappingURL=useWaitTransitionFinish.js.map