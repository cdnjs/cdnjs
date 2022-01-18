"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWaitTransitionFinish = void 0;

var React = _interopRequireWildcard(require("react"));

var _supportEvents = require("../lib/supportEvents");

var useWaitTransitionFinish = function useWaitTransitionFinish() {
  var timeoutRef = React.useRef(null);

  var waitTransitionFinish = function waitTransitionFinish(element, eventHandler, durationFallback) {
    if (element) {
      if (_supportEvents.transitionEvent.supported) {
        element.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
        element.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
      } else {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(eventHandler, durationFallback);
      }
    }
  };

  return {
    waitTransitionFinish: waitTransitionFinish
  };
};

exports.useWaitTransitionFinish = useWaitTransitionFinish;
//# sourceMappingURL=useWaitTransitionFinish.js.map