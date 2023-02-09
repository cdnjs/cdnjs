import * as React from 'react';
import { useDOM } from '../lib/dom';
import { noop } from '@vkontakte/vkjs';
import { transitionEvent } from '../lib/supportEvents';
export var useWaitTransitionFinish = function useWaitTransitionFinish() {
  var timeoutRef = React.useRef(null);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var detach = React.useRef(noop);
  var remove = React.useCallback(function () {
    detach.current();
    detach.current = noop;
  }, []);
  var waitTransitionFinish = React.useCallback(function (element, eventHandler, durationFallback) {
    if (element) {
      if (!(document !== null && document !== void 0 && document.hidden) && transitionEvent.supported && transitionEvent.name) {
        remove();
        element.addEventListener(transitionEvent.name, eventHandler);
        detach.current = function () {
          if (transitionEvent.name) {
            element.removeEventListener(transitionEvent.name, eventHandler);
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
//# sourceMappingURL=useWaitTransitionFinish.js.map