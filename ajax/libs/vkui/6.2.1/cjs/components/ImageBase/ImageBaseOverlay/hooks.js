"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useNonInteractiveOverlayProps", {
    enumerable: true,
    get: function() {
        return useNonInteractiveOverlayProps;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useFocusWithin = require("../../../hooks/useFocusWithin");
const _useIsomorphicLayoutEffect = require("../../../lib/useIsomorphicLayoutEffect");
function useNonInteractiveOverlayProps(rootRef) {
    const focusWithin = (0, _useFocusWithin.useFocusWithin)(rootRef);
    const [nonInteractiveFocusShown, setNonInteractiveFocusShown] = _react.useState(false);
    function onClick(event) {
        if (event.detail > 0) {
            // Если мы попали на вложенный в оверлей элемент через focus,
            // то при клике мышкой мы должны начать реагировать на hover-состояние,
            // даже если фокус всё ещё остался на вложенном элементе (был по нему клик)
            setNonInteractiveFocusShown(false);
        }
    }
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        setNonInteractiveFocusShown(focusWithin);
    }, [
        focusWithin
    ]);
    return {
        shown: nonInteractiveFocusShown && focusWithin,
        onClick
    };
}

//# sourceMappingURL=hooks.js.map