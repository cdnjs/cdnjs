"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useResizeTextarea", {
    enumerable: true,
    get: function() {
        return useResizeTextarea;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function useResizeTextarea(onResize, grow) {
    const elementRef = _react.useRef(null);
    const currentScrollHeight = _react.useRef();
    const resizeElement = _react.useCallback((el)=>{
        if (grow && el.offsetParent) {
            el.style.height = '';
            el.style.height = `${el.scrollHeight}px`;
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    }, [
        grow,
        onResize
    ]);
    const resize = _react.useCallback(()=>{
        const el = elementRef.current;
        if (!el) {
            /* istanbul ignore next: нет возможности воспроизвести */ return;
        }
        resizeElement(el);
    }, [
        elementRef,
        resizeElement
    ]);
    return [
        elementRef,
        resize
    ];
}

//# sourceMappingURL=useResizeTextarea.js.map