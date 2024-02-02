"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useFocusWithin", {
    enumerable: true,
    get: function() {
        return useFocusWithin;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("../lib/dom");
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
var _useGlobalEventListener = require("./useGlobalEventListener");
function useFocusWithin(ref) {
    var document = (0, _dom.useDOM)().document;
    var isFocusWithin = function() {
        if (!ref.current || !document) {
            return false;
        }
        return ref.current.contains(document.activeElement);
    };
    var _React_useState = _sliced_to_array._(_react.useState(isFocusWithin), 2), focusWithin = _React_useState[0], setFocusWithin = _React_useState[1];
    var listener = function() {
        var focus = isFocusWithin();
        focus !== focusWithin && setFocusWithin(focus);
    };
    // Проверяем autoFocus
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(listener, []);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "focus", listener, {
        capture: true
    });
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "blur", listener, {
        capture: true
    });
    return focusWithin;
}

//# sourceMappingURL=useFocusWithin.js.map