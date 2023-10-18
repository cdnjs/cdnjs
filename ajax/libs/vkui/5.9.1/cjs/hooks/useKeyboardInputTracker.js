"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DISABLE_KEYBOARD_INPUT_EVENT_NAME: function() {
        return DISABLE_KEYBOARD_INPUT_EVENT_NAME;
    },
    ENABLE_KEYBOARD_INPUT_EVENT_NAME: function() {
        return ENABLE_KEYBOARD_INPUT_EVENT_NAME;
    },
    useKeyboardInputTracker: function() {
        return useKeyboardInputTracker;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _accessibility = require("../lib/accessibility");
var _dom = require("../lib/dom");
var _useGlobalEventListener = require("./useGlobalEventListener");
var ENABLE_KEYBOARD_INPUT_EVENT_NAME = "enableKeyboardInput";
var DISABLE_KEYBOARD_INPUT_EVENT_NAME = "disableKeyboardInput";
function useKeyboardInputTracker() {
    var document = (0, _dom.useDOM)().document;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), isKeyboardInputActive = _React_useState[0], toggleKeyboardInput = _React_useState[1];
    var enableKeyboardInput = _react.useCallback(function() {
        toggleKeyboardInput(true);
    }, []);
    var handleKeydown = _react.useCallback(function(e) {
        if ((0, _accessibility.pressedKey)(e) === _accessibility.Keys.TAB) {
            enableKeyboardInput();
        }
    }, [
        enableKeyboardInput
    ]);
    var disableKeyboardInput = _react.useCallback(function() {
        toggleKeyboardInput(false);
    }, []);
    var eventOptions = {
        passive: true,
        capture: true
    };
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "keydown", handleKeydown, eventOptions);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "mousedown", disableKeyboardInput, eventOptions);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "touchstart", disableKeyboardInput, eventOptions);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, ENABLE_KEYBOARD_INPUT_EVENT_NAME, enableKeyboardInput, eventOptions);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, DISABLE_KEYBOARD_INPUT_EVENT_NAME, disableKeyboardInput, eventOptions);
    return isKeyboardInputActive;
}

//# sourceMappingURL=useKeyboardInputTracker.js.map