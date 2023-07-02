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
    getPreciseKeyboardState: function() {
        return getPreciseKeyboardState;
    },
    useKeyboard: function() {
        return useKeyboard;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("../lib/dom");
var _useGlobalEventListener = require("./useGlobalEventListener");
function getPreciseKeyboardState(window) {
    var innerHeight = window.innerHeight, availHeight = window.screen.availHeight;
    var coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
    return coveredViewportPercentage > 24;
}
var eventOptions = {
    passive: true,
    capture: false
};
function useKeyboard() {
    var _document_activeElement;
    var document = (0, _dom.useDOM)().document;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), isOpened = _React_useState[0], setIsOpened = _React_useState[1];
    var onFocus = _react.useCallback(function(event) {
        var _document_activeElement, _document_activeElement1;
        var isOpened = (event === true || event.type === "focusin") && ((document === null || document === void 0 ? void 0 : (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.tagName) === "INPUT" || (document === null || document === void 0 ? void 0 : (_document_activeElement1 = document.activeElement) === null || _document_activeElement1 === void 0 ? void 0 : _document_activeElement1.tagName) === "TEXTAREA");
        setIsOpened(isOpened);
    }, [
        document === null || document === void 0 ? void 0 : (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.tagName
    ]);
    /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */ _react.useEffect(function() {
        onFocus(true);
    }, [
        onFocus
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "focusout", onFocus, eventOptions);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "focusin", onFocus, eventOptions);
    return {
        isOpened: isOpened
    };
}

//# sourceMappingURL=useKeyboard.js.map