import * as React from 'react';
import { transitionEvent } from "../lib/supportEvents";
export var useWaitTransitionFinish = function useWaitTransitionFinish() {
  var timeoutRef = React.useRef(null);

  var waitTransitionFinish = function waitTransitionFinish(element, eventHandler, durationFallback) {
    if (element) {
      if (transitionEvent.supported) {
        element.removeEventListener(transitionEvent.name, eventHandler);
        element.addEventListener(transitionEvent.name, eventHandler);
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
//# sourceMappingURL=useWaitTransitionFinish.js.map