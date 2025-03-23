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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useGlobalEventListener = require("./useGlobalEventListener");
function getPreciseKeyboardState(window) {
    const { innerHeight, screen: { availHeight } } = window;
    const coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
    return coveredViewportPercentage > 24;
}
const eventOptions = {
    passive: true,
    capture: false
};
function useKeyboard() {
    var _document_activeElement;
    const { document } = (0, _dom.useDOM)();
    const [isOpened, setIsOpened] = _react.useState(false);
    const onFocus = _react.useCallback((event)=>{
        var _document_activeElement, _document_activeElement1;
        const isOpened = (event === true || event.type === 'focusin') && ((document === null || document === void 0 ? void 0 : (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.tagName) === 'INPUT' || (document === null || document === void 0 ? void 0 : (_document_activeElement1 = document.activeElement) === null || _document_activeElement1 === void 0 ? void 0 : _document_activeElement1.tagName) === 'TEXTAREA');
        setIsOpened(isOpened);
    }, [
        document === null || document === void 0 ? void 0 : (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.tagName
    ]);
    /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */ _react.useEffect(()=>{
        onFocus(true);
    }, [
        onFocus
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, 'focusout', onFocus, eventOptions);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, 'focusin', onFocus, eventOptions);
    return {
        isOpened
    };
}

//# sourceMappingURL=useKeyboard.js.map