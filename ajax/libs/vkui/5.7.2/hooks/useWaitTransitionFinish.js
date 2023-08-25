import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { useDOM } from "../lib/dom";
import { transitionEvent } from "../lib/supportEvents";
export var useWaitTransitionFinish = function() {
    var timeoutRef = React.useRef(null);
    var document = useDOM().document;
    var detach = React.useRef(noop);
    var remove = React.useCallback(function() {
        detach.current();
        detach.current = noop;
    }, []);
    var waitTransitionFinish = React.useCallback(function(element, eventHandler, durationFallback) {
        if (element) {
            var _document;
            if (!((_document = document) === null || _document === void 0 ? void 0 : _document.hidden) && transitionEvent.supported && transitionEvent.name) {
                remove();
                element.addEventListener(transitionEvent.name, eventHandler);
                detach.current = function() {
                    if (transitionEvent.name) {
                        element.removeEventListener(transitionEvent.name, eventHandler);
                    }
                };
            } else {
                var _timeoutRef;
                if ((_timeoutRef = timeoutRef) === null || _timeoutRef === void 0 ? void 0 : _timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(eventHandler, durationFallback);
            }
        }
    }, [
        document,
        remove,
        timeoutRef
    ]);
    return {
        waitTransitionFinish: waitTransitionFinish
    };
};

//# sourceMappingURL=useWaitTransitionFinish.js.map