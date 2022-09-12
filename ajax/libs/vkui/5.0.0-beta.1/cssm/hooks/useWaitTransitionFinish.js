import * as React from "react";
import { useDOM } from "../lib/dom";
import { transitionEvent } from "../lib/supportEvents";
export var useWaitTransitionFinish = function useWaitTransitionFinish() {
  var timeoutRef = React.useRef(null);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var waitTransitionFinish = React.useCallback(function (element, eventHandler, durationFallback) {
    if (element) {
      if (!(document !== null && document !== void 0 && document.hidden) && transitionEvent.supported && transitionEvent.name) {
        element.removeEventListener(transitionEvent.name, eventHandler);
        element.addEventListener(transitionEvent.name, eventHandler);
      } else {
        if (timeoutRef !== null && timeoutRef !== void 0 && timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(eventHandler, durationFallback);
      }
    }
  }, [document, timeoutRef]);
  return {
    waitTransitionFinish: waitTransitionFinish
  };
};
//# sourceMappingURL=useWaitTransitionFinish.js.map