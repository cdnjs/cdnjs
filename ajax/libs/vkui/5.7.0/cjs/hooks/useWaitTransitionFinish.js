"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useWaitTransitionFinish", {
    enumerable: true,
    get: function() {
        return useWaitTransitionFinish;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("../lib/dom");
var _supportEvents = require("../lib/supportEvents");
var useWaitTransitionFinish = function() {
    var timeoutRef = _react.useRef(null);
    var document = (0, _dom.useDOM)().document;
    var detach = _react.useRef(_vkjs.noop);
    var remove = _react.useCallback(function() {
        detach.current();
        detach.current = _vkjs.noop;
    }, []);
    var waitTransitionFinish = _react.useCallback(function(element, eventHandler, durationFallback) {
        if (element) {
            var _document;
            if (!((_document = document) === null || _document === void 0 ? void 0 : _document.hidden) && _supportEvents.transitionEvent.supported && _supportEvents.transitionEvent.name) {
                remove();
                element.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
                detach.current = function() {
                    if (_supportEvents.transitionEvent.name) {
                        element.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
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