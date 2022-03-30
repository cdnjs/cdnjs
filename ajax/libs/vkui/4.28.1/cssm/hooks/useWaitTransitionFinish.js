import * as React from "react";
import { transitionEvent } from "../lib/supportEvents";
export var useWaitTransitionFinish = function useWaitTransitionFinish() {
  var timeoutRef = React.useRef(null);

  var waitTransitionFinish = function waitTransitionFinish(element, eventHandler, durationFallback) {
    if (element) {
      if (transitionEvent.supported && transitionEvent.name) {
        element.removeEventListener(transitionEvent.name, eventHandler);
        element.addEventListener(transitionEvent.name, eventHandler);
      } else {
        if (timeoutRef !== null && timeoutRef !== void 0 && timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(eventHandler, durationFallback);
      }
    }
  };

  return {
    waitTransitionFinish: waitTransitionFinish
  };
};
//# sourceMappingURL=useWaitTransitionFinish.js.map